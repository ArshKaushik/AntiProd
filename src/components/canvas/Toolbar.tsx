"use client";

/** Floating toolbar pinned to the top-left of the canvas. */
export function Toolbar({ onAddScreen }: { onAddScreen: () => void }) {
  return (
    <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/90 px-3 py-2 shadow-sm backdrop-blur">
      <span className="select-none text-sm font-bold tracking-tight text-zinc-900">
        Anti<span className="text-blue-600">Prod</span>
      </span>
      <span className="h-5 w-px bg-zinc-200" />
      <button
        onClick={onAddScreen}
        className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add screen
      </button>
    </div>
  );
}
