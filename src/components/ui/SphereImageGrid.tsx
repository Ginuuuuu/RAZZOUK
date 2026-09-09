"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

/**
 * SphereImageGrid - Interactive 3D Image Sphere Component
 *
 * A React TypeScript component that displays images arranged in a 3D sphere layout.
 * Images are distributed using Fibonacci sphere distribution for optimal coverage.
 * Supports drag-to-rotate, momentum physics, auto-rotation, and modal image viewing.
 */

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface SphericalPosition {
  theta: number;  // Azimuth angle in degrees
  phi: number;    // Polar angle in degrees
  radius: number; // Distance from center
}

export interface WorldPosition extends Position3D {
  scale: number;
  zIndex: number;
  isVisible: boolean;
  fadeOpacity: number;
  originalIndex: number;
}

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface SphereImageGridProps {
  images?: ImageData[];
  containerSize?: number;
  sphereRadius?: number;
  dragSensitivity?: number;
  momentumDecay?: number;
  maxRotationSpeed?: number;
  baseImageScale?: number;
  hoverScale?: number;
  perspective?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
}

interface RotationState {
  x: number;
  y: number;
  z: number;
}

interface VelocityState {
  x: number;
  y: number;
}

interface MousePosition {
  x: number;
  y: number;
}

// ==========================================
// CONSTANTS & CONFIGURATION
// ==========================================

const SPHERE_MATH = {
  degreesToRadians: (degrees: number): number => degrees * (Math.PI / 180),
  radiansToDegrees: (radians: number): number => radians * (180 / Math.PI),

  sphericalToCartesian: (radius: number, theta: number, phi: number): Position3D => ({
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta)
  }),

  calculateDistance: (pos: Position3D, center: Position3D = { x: 0, y: 0, z: 0 }): number => {
    const dx = pos.x - center.x;
    const dy = pos.y - center.y;
    const dz = pos.z - center.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  },

  normalizeAngle: (angle: number): number => {
    while (angle > 180) angle -= 360;
    while (angle < -180) angle += 360;
    return angle;
  }
};

// ==========================================
// MAIN COMPONENT
// ==========================================

export const SphereImageGrid: React.FC<SphereImageGridProps> = ({
  images = [],
  containerSize = 400,
  sphereRadius = 200,
  dragSensitivity = 0.5,
  momentumDecay = 0.95,
  maxRotationSpeed = 5,
  baseImageScale = 0.12,
  hoverScale = 1.2,
  perspective = 1000,
  autoRotate = false,
  autoRotateSpeed = 0.3,
  className = ''
}) => {

  // ==========================================
  // STATE & REFS
  // ==========================================

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [rotation, setRotation] = useState<RotationState>({ x: 15, y: 15, z: 0 });
  const [velocity, setVelocity] = useState<VelocityState>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [imagePositions, setImagePositions] = useState<SphericalPosition[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  // ==========================================
  // COMPUTED VALUES
  // ==========================================

  const actualSphereRadius = sphereRadius || containerSize * 0.5;
  const baseImageSize = containerSize * baseImageScale;

  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================

  const generateSpherePositions = useCallback((): SphericalPosition[] => {
    const positions: SphericalPosition[] = [];
    const imageCount = images.length;
    if (imageCount === 0) return positions;

    // Use standard Fibonacci sphere distribution for uniform coverage
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.39996 rad

    for (let i = 0; i < imageCount; i++) {
      // y ranges smoothly from 1 to -1 for complete spherical coverage
      const y = imageCount > 1 ? 1 - (i / (imageCount - 1)) * 2 : 0;
      const phi = Math.acos(Math.max(-1, Math.min(1, y))) * (180 / Math.PI);
      const theta = ((goldenAngle * i) * (180 / Math.PI)) % 360;

      positions.push({
        theta: theta,
        phi: phi,
        radius: actualSphereRadius
      });
    }

    return positions;
  }, [images.length, actualSphereRadius]);

  const calculateWorldPositions = useCallback((): WorldPosition[] => {
    const positions = imagePositions.map((pos, index) => {
      // Apply rotation using proper 3D rotation matrices
      const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
      const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
      const rotXRad = SPHERE_MATH.degreesToRadians(rotation.x);
      const rotYRad = SPHERE_MATH.degreesToRadians(rotation.y);

      // Initial position on sphere
      let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
      let y = pos.radius * Math.cos(phiRad);
      let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

      // Apply Y-axis rotation (horizontal drag)
      const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
      const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      x = x1;
      z = z1;

      // Apply X-axis rotation (vertical drag)
      const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
      const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
      y = y2;
      z = z2;

      const worldPos: Position3D = { x, y, z };

      // Ensure all employees are visible in orbital 3D depth
      const zRatio = worldPos.z / Math.max(1, actualSphereRadius); // -1 (back) to +1 (front)
      // Front nodes: full opacity (1.0). Back nodes: soft atmospheric opacity (0.42 to 0.95).
      const fadeOpacity = zRatio >= 0 ? 1 : Math.max(0.42, 1 + zRatio * 0.58);
      const isVisible = true; // Keep all employees visible

      // Smooth depth scaling: front items are prominent (~1.18x), back items smaller (~0.76x)
      const depthFactor = (zRatio + 1) / 2; // 0 (back) to 1 (front)
      const scale = 0.76 + depthFactor * 0.42;

      return {
        ...worldPos,
        scale,
        zIndex: Math.round(1000 + worldPos.z),
        isVisible,
        fadeOpacity,
        originalIndex: index
      };
    });

    // Apply gentle collision spacing so nodes don't overlap while maintaining healthy size
    const adjustedPositions = [...positions];

    for (let i = 0; i < adjustedPositions.length; i++) {
      const pos = adjustedPositions[i];
      let adjustedScale = pos.scale;
      const imageSize = baseImageSize * adjustedScale;

      for (let j = 0; j < adjustedPositions.length; j++) {
        if (i === j) continue;
        const other = adjustedPositions[j];

        const otherSize = baseImageSize * other.scale;
        const dx = pos.x - other.x;
        const dy = pos.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (imageSize + otherSize) / 2 + 4;

        if (distance < minDistance && distance > 0) {
          const overlap = minDistance - distance;
          const reductionFactor = Math.max(0.85, 1 - (overlap / minDistance) * 0.15);
          adjustedScale = Math.min(adjustedScale, adjustedScale * reductionFactor);
        }
      }

      adjustedPositions[i] = {
        ...pos,
        scale: Math.max(0.72, adjustedScale)
      };
    }

    return adjustedPositions;
  }, [imagePositions, rotation, actualSphereRadius, baseImageSize]);

  const clampRotationSpeed = useCallback((speed: number): number => {
    return Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, speed));
  }, [maxRotationSpeed]);

  // ==========================================
  // PHYSICS & MOMENTUM
  // ==========================================

  const updateMomentum = useCallback(() => {
    if (isDragging) return;

    setVelocity(prev => {
      const newVelocity = {
        x: prev.x * momentumDecay,
        y: prev.y * momentumDecay
      };

      // Stop animation if velocity is too low and auto-rotate is off
      if (!autoRotate && Math.abs(newVelocity.x) < 0.01 && Math.abs(newVelocity.y) < 0.01) {
        return { x: 0, y: 0 };
      }

      return newVelocity;
    });

    setRotation(prev => {
      let newY = prev.y;

      // Add auto-rotation to Y axis (horizontal rotation)
      if (autoRotate) {
        newY += autoRotateSpeed;
      }

      // Add momentum-based rotation
      newY += clampRotationSpeed(velocity.y);

      return {
        x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(velocity.x)),
        y: SPHERE_MATH.normalizeAngle(newY),
        z: prev.z
      };
    });
  }, [isDragging, momentumDecay, velocity, clampRotationSpeed, autoRotate, autoRotateSpeed]);

  // ==========================================
  // EVENT HANDLERS
  // ==========================================

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;

    const rotationDelta = {
      x: -deltaY * dragSensitivity,
      y: deltaX * dragSensitivity
    };

    setRotation(prev => ({
      x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rotationDelta.x)),
      y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotationDelta.y)),
      z: prev.z
    }));

    // Update velocity for momentum
    setVelocity({
      x: clampRotationSpeed(rotationDelta.x),
      y: clampRotationSpeed(rotationDelta.y)
    });

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, [isDragging, dragSensitivity, clampRotationSpeed]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMousePos.current.x;
    const deltaY = touch.clientY - lastMousePos.current.y;

    const rotationDelta = {
      x: -deltaY * dragSensitivity,
      y: deltaX * dragSensitivity
    };

    setRotation(prev => ({
      x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rotationDelta.x)),
      y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotationDelta.y)),
      z: prev.z
    }));

    setVelocity({
      x: clampRotationSpeed(rotationDelta.x),
      y: clampRotationSpeed(rotationDelta.y)
    });

    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, [isDragging, dragSensitivity, clampRotationSpeed]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ==========================================
  // EFFECTS & LIFECYCLE
  // ==========================================

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setImagePositions(generateSpherePositions());
  }, [generateSpherePositions]);

  useEffect(() => {
    const animate = () => {
      updateMomentum();
      animationFrame.current = requestAnimationFrame(animate);
    };

    if (isMounted) {
      animationFrame.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isMounted, updateMomentum]);

  useEffect(() => {
    if (!isMounted) return;

    // Mouse events
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Touch events
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMounted, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // ==========================================
  // RENDER HELPERS
  // ==========================================

  // Calculate world positions once per render
  const worldPositions = calculateWorldPositions();

  const renderImageNode = useCallback((image: ImageData, index: number) => {
    const position = worldPositions[index];

    if (!position || !position.isVisible) return null;

    const imageSize = baseImageSize * position.scale;
    const isHovered = hoveredIndex === index;
    const finalScale = isHovered ? 1.25 : 1;

    return (
      <div
        key={image.id}
        className="absolute cursor-pointer select-none transition-transform duration-150 ease-out"
        style={{
          width: `${imageSize}px`,
          height: `${imageSize}px`,
          left: `${containerSize/2 + position.x}px`,
          top: `${containerSize/2 + position.y}px`,
          opacity: position.fadeOpacity,
          transform: `translate(-50%, -50%) scale(${finalScale})`,
          zIndex: isHovered ? 9999 : position.zIndex
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => setSelectedImage(image)}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-2 border-white/35 bg-neutral-900 ring-1 ring-white/20 hover:border-white hover:ring-2 hover:ring-[#7F1D2D] transition-all">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover object-top filter grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
            draggable={false}
            loading="eager"
          />
        </div>

        {/* Hover Identifier Pill */}
        {isHovered && image.title && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-black/95 border border-neutral-700 text-[10px] tracking-wider uppercase font-mono text-white whitespace-nowrap pointer-events-none rounded shadow-2xl z-50">
            {image.title}
          </div>
        )}
      </div>
    );
  }, [worldPositions, baseImageSize, containerSize, hoveredIndex]);

  const renderSpotlightModal = () => {
    if (!selectedImage) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        onClick={() => setSelectedImage(null)}
        style={{
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
        <div
          className="bg-neutral-950 text-white border border-neutral-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: 'scaleIn 0.3s ease-out'
          }}
        >
          <div className="relative aspect-square bg-neutral-900">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-cover object-top"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full text-white flex items-center justify-center hover:bg-black/90 border border-white/20 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {(selectedImage.title || selectedImage.description) && (
            <div className="p-6 space-y-2">
              {selectedImage.title && (
                <h3 className="text-lg sm:text-xl font-heading font-light tracking-[0.12em] uppercase text-white">
                  {selectedImage.title}
                </h3>
              )}
              {selectedImage.description && (
                <p className="text-neutral-400 font-body text-xs sm:text-sm tracking-wide leading-relaxed font-light">
                  {selectedImage.description}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==========================================
  // EARLY RETURNS
  // ==========================================

  if (!isMounted) {
    return (
      <div
        className="bg-neutral-950 border border-neutral-900 rounded-2xl animate-pulse flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        <div className="text-neutral-500 font-mono text-xs tracking-widest uppercase">Loading Atelier Sphere...</div>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div
        className="bg-neutral-950 border border-neutral-900 rounded-2xl border-dashed flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        <div className="text-neutral-500 text-center font-body text-xs tracking-wider">
          <p>No images provided</p>
          <p className="text-neutral-600 mt-1">Add images to the images prop</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN RENDER
  // ==========================================

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div
        ref={containerRef}
        className={`relative select-none cursor-grab active:cursor-grabbing ${className}`}
        style={{
          width: containerSize,
          height: containerSize,
          perspective: `${perspective}px`
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="relative w-full h-full" style={{ zIndex: 10 }}>
          {images.map((image, index) => renderImageNode(image, index))}
        </div>
      </div>

      {renderSpotlightModal()}
    </>
  );
};

export default SphereImageGrid;
