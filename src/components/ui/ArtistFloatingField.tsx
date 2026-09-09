"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ArtistFloatingFieldProps {
  images: ImageData[];
  className?: string;
}

interface NodeState {
  id: string;
  image: ImageData;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phaseX: number;
  phaseY: number;
  speed: number;
  isDragging: boolean;
}

export function ArtistFloatingField({ images, className = "" }: ArtistFloatingFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Physics state stored in ref for 60fps performance without React re-render thrashing
  const nodesRef = useRef<NodeState[]>([]);
  const elementsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const animFrameId = useRef<number | null>(null);

  // Dragging interaction refs
  const dragTargetId = useRef<string | null>(null);
  const dragStartPos = useRef<{ x: number; y: number; nodeX: number; nodeY: number }>({ x: 0, y: 0, nodeX: 0, nodeY: 0 });
  const lastPointerPos = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const pointerVelocity = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });
  const isDraggingAny = useRef<boolean>(false);
  const dragDistanceRef = useRef<number>(0);

  // Canvas pan refs (dragging the background)
  const isCanvasPanning = useRef<boolean>(false);
  const canvasPanStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Initialize nodes distributed across the entire full-bleed canvas
  const initNodes = useCallback(() => {
    if (!containerRef.current || images.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width || (typeof window !== "undefined" ? window.innerWidth : 1440);
    const height = rect.height || 880;

    // Node size: smaller, sleek, compact (~68px to 84px on desktop, ~52px to 64px on mobile)
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const baseSize = isMobile ? 54 : isTablet ? 66 : 76;

    const count = images.length;
    // Calculate grid columns and rows to distribute evenly edge-to-edge
    const aspect = width / height;
    const cols = Math.max(isMobile ? 4 : 7, Math.ceil(Math.sqrt(count * aspect * 1.12)));
    const rows = Math.ceil(count / cols);

    const padX = isMobile ? 16 : 48;
    const padY = 32;

    const usableWidth = Math.max(300, width - padX * 2 - baseSize);
    const usableHeight = Math.max(300, height - padY * 2 - baseSize);

    const cellW = usableWidth / Math.max(1, cols - 1);
    const cellH = usableHeight / Math.max(1, rows - 1);

    const newNodes: NodeState[] = images.map((image, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);

      // Jitter within cell to create an organic, relaxed distribution
      const jitterX = (Math.random() - 0.5) * (cellW * 0.45);
      const jitterY = (Math.random() - 0.5) * (cellH * 0.45);

      // Node size with slight variation for visual depth
      const sizeVariation = ((idx % 5) - 2) * (isMobile ? 3 : 5);
      const size = Math.round(baseSize + sizeVariation);

      const x = Math.max(padX, Math.min(width - size - padX, padX + col * cellW + jitterX));
      const y = Math.max(padY, Math.min(height - size - padY, padY + row * cellH + jitterY));

      return {
        id: image.id,
        image,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        size,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        speed: 0.001 + Math.random() * 0.0015,
        isDragging: false,
      };
    });

    nodesRef.current = newNodes;
  }, [images]);

  // Physics animation loop
  useEffect(() => {
    setIsClient(true);
    initNodes();

    let lastTime = performance.now();

    const updatePhysics = (now: number) => {
      const dt = Math.min(32, now - lastTime);
      lastTime = now;

      if (!containerRef.current) {
        animFrameId.current = requestAnimationFrame(updatePhysics);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const nodes = nodesRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const el = elementsRef.current.get(node.id);

        if (node.isDragging) {
          // Being dragged: position already updated directly in pointermove
          if (el) {
            el.style.transform = `translate3d(${node.x}px, ${node.y}px, 0px) scale(1.18)`;
            el.style.zIndex = "999";
          }
          continue;
        }

        // 1. Organic ambient wave drift (gentle floating motion)
        const ambientVx = Math.sin(now * node.speed + node.phaseX) * 0.28;
        const ambientVy = Math.cos(now * node.speed + node.phaseY) * 0.28;

        node.vx += ambientVx * 0.05;
        node.vy += ambientVy * 0.05;

        // 2. Velocity damping (smooth decay toward ambient speed)
        node.vx *= 0.965;
        node.vy *= 0.965;

        // Apply velocities
        node.x += node.vx * (dt / 16);
        node.y += node.vy * (dt / 16);

        // 3. Boundary collision with elastic bounce across full width
        const padX = 20;
        const padY = 16;
        if (node.x < padX) {
          node.x = padX;
          node.vx = Math.abs(node.vx) * 0.75 + 0.2;
        } else if (node.x > width - node.size - padX) {
          node.x = width - node.size - padX;
          node.vx = -Math.abs(node.vx) * 0.75 - 0.2;
        }

        if (node.y < padY) {
          node.y = padY;
          node.vy = Math.abs(node.vy) * 0.75 + 0.2;
        } else if (node.y > height - node.size - padY) {
          node.y = height - node.size - padY;
          node.vy = -Math.abs(node.vy) * 0.75 - 0.2;
        }

        // 4. Soft inter-node collision separation (keeps them from completely overlapping)
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          if (other.isDragging) continue;

          const dx = (other.x + other.size / 2) - (node.x + node.size / 2);
          const dy = (other.y + other.size / 2) - (node.y + node.size / 2);
          const dist = Math.hypot(dx, dy);
          const minDist = (node.size + other.size) / 2 + 6;

          if (dist < minDist && dist > 0.001) {
            const overlap = (minDist - dist) / dist;
            const pushX = dx * overlap * 0.12;
            const pushY = dy * overlap * 0.12;

            node.x -= pushX * 0.5;
            node.y -= pushY * 0.5;
            other.x += pushX * 0.5;
            other.y += pushY * 0.5;

            node.vx -= pushX * 0.04;
            node.vy -= pushY * 0.04;
            other.vx += pushX * 0.04;
            other.vy += pushY * 0.04;
          }
        }

        // Direct DOM update for maximum 60fps / 120fps fluidity
        if (el) {
          el.style.transform = `translate3d(${node.x}px, ${node.y}px, 0px)`;
          el.style.zIndex = "10";
        }
      }

      animFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animFrameId.current = requestAnimationFrame(updatePhysics);

    const handleResize = () => {
      initNodes();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [initNodes]);

  // Pointer event handlers for dragging nodes
  const handlePointerDown = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const node = nodesRef.current.find((n) => n.id === id);
    if (!node) return;

    node.isDragging = true;
    dragTargetId.current = id;
    dragDistanceRef.current = 0;
    isDraggingAny.current = true;

    dragStartPos.current = {
      x: e.clientX,
      y: e.clientY,
      nodeX: node.x,
      nodeY: node.y,
    };

    lastPointerPos.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
    };

    pointerVelocity.current = { vx: 0, vy: 0 };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragTargetId.current) {
      const node = nodesRef.current.find((n) => n.id === dragTargetId.current);
      if (!node || !containerRef.current) return;

      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      dragDistanceRef.current += Math.hypot(e.movementX, e.movementY);

      const rect = containerRef.current.getBoundingClientRect();
      const pad = 16;
      const newX = Math.max(pad, Math.min(rect.width - node.size - pad, dragStartPos.current.nodeX + dx));
      const newY = Math.max(pad, Math.min(rect.height - node.size - pad, dragStartPos.current.nodeY + dy));

      node.x = newX;
      node.y = newY;

      // Track throw velocity
      const now = performance.now();
      const dt = Math.max(1, now - lastPointerPos.current.time);
      pointerVelocity.current = {
        vx: ((e.clientX - lastPointerPos.current.x) / dt) * 16,
        vy: ((e.clientY - lastPointerPos.current.y) / dt) * 16,
      };

      lastPointerPos.current = { x: e.clientX, y: e.clientY, time: now };
      return;
    }

    // Canvas panning (if background drag)
    if (isCanvasPanning.current && containerRef.current) {
      const dx = e.movementX;
      const dy = e.movementY;
      const rect = containerRef.current.getBoundingClientRect();
      const pad = 16;

      // Pan all nodes with the canvas drag
      nodesRef.current.forEach((n) => {
        n.x = Math.max(pad, Math.min(rect.width - n.size - pad, n.x + dx * 0.8));
        n.y = Math.max(pad, Math.min(rect.height - n.size - pad, n.y + dy * 0.8));
        n.vx += dx * 0.12;
        n.vy += dy * 0.12;
      });
    }
  };

  const handlePointerUp = (id: string, image: ImageData) => {
    if (dragTargetId.current === id) {
      const node = nodesRef.current.find((n) => n.id === id);
      if (node) {
        node.isDragging = false;
        // Impart toss velocity clamped to reasonable physics range
        const maxV = 16;
        node.vx = Math.max(-maxV, Math.min(maxV, pointerVelocity.current.vx));
        node.vy = Math.max(-maxV, Math.min(maxV, pointerVelocity.current.vy));
      }

      // If clicked with minimal movement, open modal
      if (dragDistanceRef.current < 6) {
        setSelectedImage(image);
      }

      dragTargetId.current = null;
      isDraggingAny.current = false;
    }
  };

  // Background pointer handlers for canvas drag
  const handleCanvasPointerDown = (e: React.PointerEvent) => {
    isCanvasPanning.current = true;
    canvasPanStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleCanvasPointerUp = () => {
    isCanvasPanning.current = false;
  };

  return (
    <>
      {/* Full-width Edge-to-Edge Interactive Canvas without rectangular outline */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handleCanvasPointerDown}
        onPointerUp={handleCanvasPointerUp}
        className={`relative w-full h-[720px] sm:h-[800px] md:h-[880px] lg:h-[940px] overflow-hidden bg-black select-none cursor-grab active:cursor-grabbing ${className}`}
        style={{ touchAction: "none" }}
      >
        {/* Subtle Ambient Studio Background Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Ambient Glow Gradient across full canvas */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[75%] rounded-full bg-[#7F1D2D]/12 blur-3xl pointer-events-none" />

        {/* Interactive Avatars distributed across rectangular space */}
        {isClient &&
          images.map((img) => (
            <div
              key={img.id}
              ref={(el) => {
                if (el) elementsRef.current.set(img.id, el);
                else elementsRef.current.delete(img.id);
              }}
              onPointerDown={(e) => handlePointerDown(img.id, e)}
              onPointerUp={() => handlePointerUp(img.id, img)}
              onMouseEnter={() => setHoveredId(img.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="absolute top-0 left-0 cursor-grab active:cursor-grabbing group/avatar transition-shadow duration-300"
              style={{
                width: 76,
                height: 76,
                willChange: "transform",
              }}
            >
              {/* Circular Avatar Shell with refined borders & hover glow */}
              <div
                className={`relative w-full h-full rounded-full overflow-hidden border-2 transition-all duration-300 shadow-xl ${
                  hoveredId === img.id
                    ? "border-white ring-4 ring-[#7F1D2D]/80 scale-110 shadow-2xl z-50"
                    : "border-neutral-800/90 bg-neutral-900 ring-1 ring-white/10 hover:border-neutral-500"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  draggable={false}
                  loading="eager"
                  className={`w-full h-full object-cover object-top filter transition-all duration-300 pointer-events-none ${
                    hoveredId === img.id
                      ? "grayscale-0 contrast-105"
                      : "grayscale contrast-125 group-hover/avatar:grayscale-0"
                  }`}
                />
              </div>

              {/* Floating Name & Role Identifier Tag on Hover */}
              {hoveredId === img.id && img.title && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black/95 border border-neutral-700/90 text-[10px] tracking-wider uppercase font-mono text-white whitespace-nowrap pointer-events-none rounded shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7F1D2D]" />
                    <span>{img.title}</span>
                  </div>
                </div>
              )}
            </div>
          ))}

        {/* Subtle Canvas Corner Coordinates Watermark */}
        <div className="absolute bottom-4 left-6 sm:left-10 md:left-14 pointer-events-none text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
          RAZZOUK ATELIER COLLECTIVE · {images.length} ACTIVE RESIDENTS & CRAFTSMEN
        </div>
      </div>

      {/* Profile Detail Spotlight Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-neutral-950 text-white border border-neutral-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square bg-neutral-900">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-cover object-top"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 w-9 h-9 bg-black/70 backdrop-blur-sm rounded-full text-white flex items-center justify-center hover:bg-black border border-white/20 transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {(selectedImage.title || selectedImage.description) && (
              <div className="p-6 space-y-2.5">
                {selectedImage.title && (
                  <h3 className="text-lg sm:text-xl font-heading font-light tracking-[0.14em] uppercase text-white">
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
      )}
    </>
  );
}

export default ArtistFloatingField;
