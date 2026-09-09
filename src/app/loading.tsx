export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <span className="font-heading text-2xl sm:text-3xl font-light tracking-[0.3em] uppercase text-white animate-pulse">
            RAZZOUK
          </span>
          <div className="w-full h-[1px] bg-neutral-800 mt-2 overflow-hidden">
            <div className="w-1/3 h-full bg-white animate-[shimmer_1.5s_infinite_linear]" />
          </div>
        </div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono">
          LOADING ARCHIVE
        </span>
      </div>
    </div>
  );
}
