"use client";

import { useState, useRef, useEffect } from "react";

type Branch = {
  id: string;
  name: string;
  index: number;
  // pos is relative to (barLeft, barTop) — when the bar shifts, pills shift with it
  pos: { x: number; y: number };
  size: { w: number; h: number };
};

// ─── Layout constants (all x offsets relative to barLeft, from Figma spec) ──
const CANVAS_PADDING  = 170;   // min px of space on each side of the bar
const ABOVE_ANCHOR_X  = 46;    // first above-branch anchor from barLeft
const BELOW_ANCHOR_X  = 158;   // first below-branch anchor from barLeft
const ABOVE_PILL_X    = 158;   // first above-branch pill left from barLeft
const BELOW_PILL_X    = 270;   // first below-branch pill left from barLeft
const BRANCH_STEP     = 188;   // horizontal step between same-side branches
const ABOVE_PILL_Y    = -146;  // pill top relative to barTop (above bar, tier 0)
const BELOW_PILL_Y    = 164;   // pill top relative to barTop (= BAR_HEIGHT + 116, tier 0)
const TIER_STEP       = 52;    // vertical offset per tier (pill height 36 + gap 16)
const BAR_HEIGHT      = 48;
const BASE_BAR_WIDTH  = 1100;
const DEFAULT_PILL_H  = 36;
const DEFAULT_PILL_W  = 162;

const ADJECTIVES = [
  "turbo", "funky", "cosmic", "neon", "hyper", "blazing", "electric",
  "sonic", "radical", "fuzzy", "sneaky", "chunky", "spicy", "gnarly",
  "wacky", "zippy", "glitchy", "cursed", "feral", "chaotic",
];
const NOUNS = [
  "panda", "goat", "rocket", "dragon", "phoenix", "wizard", "ninja",
  "llama", "narwhal", "walrus", "badger", "corgi", "capybara", "axolotl",
  "platypus", "quokka", "raccoon", "sloth", "lemur", "pangolin",
];

function randomBranchName() {
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  return `${pick(ADJECTIVES)}/${pick(NOUNS)}-branch`;
}

// Bar grows right so every anchor has at least 80 px of bar to its right.
function computeBarWidth(count: number): number {
  const aboveCount = Math.ceil(count / 2);
  const belowCount = Math.floor(count / 2);
  const rightmostAbove = aboveCount > 0 ? ABOVE_ANCHOR_X + (aboveCount - 1) * BRANCH_STEP : 0;
  const rightmostBelow = belowCount > 0 ? BELOW_ANCHOR_X + (belowCount - 1) * BRANCH_STEP : 0;
  return Math.max(BASE_BAR_WIDTH, Math.max(rightmostAbove, rightmostBelow) + 80);
}

// Canvas is always at least viewport-wide; grows when bar needs more room.
function computeLayout(count: number) {
  const viewportWidth = window.innerWidth;
  const barWidth   = computeBarWidth(count);
  const canvasWidth = Math.max(viewportWidth, barWidth + 2 * CANVAS_PADDING);
  const barLeft    = (canvasWidth - barWidth) / 2;
  const barTop     = window.innerHeight / 2 - BAR_HEIGHT / 2;
  return { barWidth, canvasWidth, barLeft, barTop, viewportWidth };
}

// Default pill position, relative to (barLeft, barTop).
// Tier alternates by within-side index (0, 1, 0, 1…) so adjacent same-side
// pills are horizontally 2×BRANCH_STEP apart — wide enough for any name.
// Tier is index-based, not name-based, so renaming never invalidates positions.
function defaultPillPos(index: number): { x: number; y: number } {
  if (index % 2 === 0) {
    const si   = index / 2;
    const tier = si % 2;
    return { x: ABOVE_PILL_X + si * BRANCH_STEP, y: ABOVE_PILL_Y - tier * TIER_STEP };
  }
  const si   = (index - 1) / 2;
  const tier = si % 2;
  return { x: BELOW_PILL_X + si * BRANCH_STEP, y: BELOW_PILL_Y + tier * TIER_STEP };
}

// Anchor on the bar, relative to (barLeft, barTop).
function anchorRelPos(index: number): { x: number; y: number } {
  if (index % 2 === 0) {
    return { x: ABOVE_ANCHOR_X + (index / 2) * BRANCH_STEP, y: 0 };
  }
  return { x: BELOW_ANCHOR_X + ((index - 1) / 2) * BRANCH_STEP, y: BAR_HEIGHT };
}

// S-curve: cp1 and cp2 share the horizontal midpoint so the curve exits
// horizontally from the pill and arrives horizontally at the anchor, with a
// smooth S-shaped inflection between them.
function buildPath(sx: number, sy: number, ex: number, ey: number): string {
  const midX = (sx + ex) / 2;
  return `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ey}, ${ex} ${ey}`;
}

export default function RepoCanvas() {
  const scrollRef  = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [branches, setBranches] = useState<Branch[]>([]);
  const pillRefs   = useRef<Record<string, HTMLDivElement | null>>({});
  const measuredIds = useRef<Set<string>>(new Set());
  const draggingId  = useRef<string | null>(null);
  // dragOffset stores (clientX + scrollLeft − pos.x) and (clientY − pos.y)
  // — barLeft/barTop are NOT baked in, so rendering with current barLeft/barTop
  //   automatically keeps pills in their bar-relative positions.
  const dragOffset  = useRef({ x: 0, y: 0 });

  // Seed first branch.
  useEffect(() => {
    setBranches([{
      id:    "initial",
      name:  "claude/corgi-branch",
      index: 0,
      pos:   defaultPillPos(0),
      size:  { w: DEFAULT_PILL_W, h: DEFAULT_PILL_H },
    }]);
  }, []);

  // Re-compute layout on resize.
  useEffect(() => {
    const onResize = () => setBranches(prev => [...prev]);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Track horizontal scroll so the repo name stays in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrollX(el.scrollLeft);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Measure newly rendered pills once.
  useEffect(() => {
    const updates: Record<string, { w: number; h: number }> = {};
    for (const b of branches) {
      if (measuredIds.current.has(b.id)) continue;
      const el = pillRefs.current[b.id];
      if (!el) continue;
      const { width, height } = el.getBoundingClientRect();
      if (width > 0) {
        measuredIds.current.add(b.id);
        updates[b.id] = { w: width, h: height };
      }
    }
    if (Object.keys(updates).length > 0) {
      setBranches(prev => prev.map(b => updates[b.id] ? { ...b, size: updates[b.id] } : b));
    }
  }, [branches]);

  // Global drag listeners.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingId.current) return;
      const id = draggingId.current;
      const scrollLeft = scrollRef.current?.scrollLeft ?? 0;
      // newRelX/Y are bar-relative — barLeft is added at render time.
      const newRelX = e.clientX + scrollLeft - dragOffset.current.x;
      const newRelY = e.clientY             - dragOffset.current.y;
      setBranches(prev =>
        prev.map(b => b.id === id ? { ...b, pos: { x: newRelX, y: newRelY } } : b)
      );
    };
    const onUp = () => { draggingId.current = null; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",  onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",  onUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent, b: Branch) => {
    e.preventDefault();
    const scrollLeft = scrollRef.current?.scrollLeft ?? 0;
    draggingId.current = b.id;
    dragOffset.current = {
      x: e.clientX + scrollLeft - b.pos.x,
      y: e.clientY             - b.pos.y,
    };
  };

  const createBranch = () => {
    setBranches(prev => [
      ...prev,
      {
        id:    crypto.randomUUID(),
        name:  randomBranchName(),
        index: prev.length,
        pos:   defaultPillPos(prev.length),
        size:  { w: DEFAULT_PILL_W, h: DEFAULT_PILL_H },
      },
    ]);
  };

  // Layout derived each render — branches are empty on SSR, so window access is safe.
  const layout = branches.length > 0
    ? computeLayout(branches.length)
    : { barWidth: BASE_BAR_WIDTH, canvasWidth: BASE_BAR_WIDTH + 2 * CANVAS_PADDING, barLeft: CANVAS_PADDING, barTop: 0, viewportWidth: BASE_BAR_WIDTH };

  return (
    // Outer: full-screen, horizontal scroll only.
    <div ref={scrollRef} className="h-screen bg-black overflow-x-auto overflow-y-hidden">
      {/* Canvas: grows wider as the bar grows. */}
      <div
        className="relative h-full bg-black"
        style={{ width: `${layout.canvasWidth}px` }}
      >
        {/* Navbar — fixed so it stays in view while scrolling. */}
        <div className="fixed top-0 right-0 p-5 z-20">
          <button
            onClick={createBranch}
            className="bg-[#171717] border border-[#262626] text-white text-[14px] font-normal leading-5 px-[14px] py-[8px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] cursor-pointer"
          >
            Create Branch
          </button>
        </div>

        {/* S-curve connectors. */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={layout.canvasWidth}
          height="100%"
        >
          {branches.map(b => {
            const anchor = anchorRelPos(b.index);
            const sx = layout.barLeft + b.pos.x;
            const sy = layout.barTop  + b.pos.y + b.size.h / 2;
            const ex = layout.barLeft + anchor.x;
            const ey = layout.barTop  + anchor.y;
            return (
              <path
                key={b.id}
                d={buildPath(sx, sy, ex, ey)}
                stroke="#404040"
                strokeWidth="1"
                fill="none"
              />
            );
          })}
        </svg>

        {/* Branch pills. */}
        {branches.map(b => (
          <div
            key={b.id}
            ref={el => { pillRefs.current[b.id] = el; }}
            onMouseDown={e => handleMouseDown(e, b)}
            className="absolute bg-[#171717] border border-[#262626] flex items-center justify-center px-4 py-2 rounded-full cursor-grab active:cursor-grabbing select-none z-10"
            style={{
              left: `${layout.barLeft + b.pos.x}px`,
              top:  `${layout.barTop  + b.pos.y}px`,
            }}
          >
            <span className="text-white text-[14px] font-normal leading-5 whitespace-nowrap">
              {b.name}
            </span>
          </div>
        ))}

        {/* Repo bar — width grows, always centered in canvas. */}
        {branches.length > 0 && (
          // Outer div: absolute placement within the canvas.
          <div
            className="absolute"
            style={{
              left:   `${layout.barLeft}px`,
              top:    `${layout.barTop}px`,
              width:  `${layout.barWidth}px`,
              height: `${BAR_HEIGHT}px`,
            }}
          >
            {/* Inner div: relative containing block for the name span + visual styling. */}
            <div className="relative w-full h-full bg-[#171717] border border-[#262626] rounded-[8px] overflow-hidden">
              {/* Name is clamped to the visible portion of the bar:
                  - natural position: center of bar
                  - right-clamp: sticks near the right viewport edge when bar grows wider
                  - left-clamp:  sticks near the left viewport edge when user scrolls right */}
              <span
                className="absolute top-1/2 text-white text-[14px] font-normal leading-5 whitespace-nowrap pointer-events-none"
                style={{
                  left: (() => {
                    const PAD = 72;
                    const visLeft  = Math.max(scrollX - layout.barLeft, 0);
                    const visRight = Math.min(scrollX + layout.viewportWidth - layout.barLeft, layout.barWidth);
                    return `${Math.max(visLeft + PAD, Math.min(visRight - PAD, layout.barWidth / 2))}px`;
                  })(),
                  transform: "translate(-50%, -50%)",
                }}
              >
                AntiProd
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
