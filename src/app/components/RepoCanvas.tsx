"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

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

// Canvas is always at least viewport-wide; grows so the bar AND every pill fit
// with padding. Pills sit to the right of the bar end (connected back by an
// S-curve), so the canvas is sized from the rightmost pill edge — not just the
// bar — otherwise the last pill overflows the canvas and gets clipped.
function computeLayout(branches: Branch[]) {
  const count = branches.length;
  const viewportWidth = window.innerWidth;
  const barWidth   = computeBarWidth(count);
  // Rightmost content edge relative to barLeft: bar end vs. each pill's right
  // edge at its default (index-based) position, using measured width when known.
  let contentRight = barWidth;
  for (const b of branches) {
    contentRight = Math.max(contentRight, defaultPillPos(b.index).x + b.size.w);
  }
  const canvasWidth = Math.max(viewportWidth, contentRight + 2 * CANVAS_PADDING);
  // Center the bar when it's the only content; once pills push past the bar,
  // pin CANVAS_PADDING to the bar's left and let the canvas grow rightward so
  // the rightmost pill keeps a full CANVAS_PADDING margin on its right.
  const barLeft = Math.max(
    CANVAS_PADDING,
    Math.min((canvasWidth - barWidth) / 2, canvasWidth - contentRight - CANVAS_PADDING),
  );
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
  // id of the just-created branch — drives the auto-scroll target and its
  // temporary glow; cleared after the highlight fades.
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const pillRefs   = useRef<Record<string, HTMLDivElement | null>>({});
  const measuredIds = useRef<Set<string>>(new Set());
  // Clicking a pill opens that branch's build screen.
  const router      = useRouter();

  // Mount flag: defer window-based layout to the client so SSR uses the
  // fallback, and the (initially empty) repo bar still centers once mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // On branch creation: smooth-scroll so the new pill is centered in the
  // viewport, then fade out its glow. Keyed on highlightId only — runs after
  // the new branch has rendered with the recomputed (post-shift) layout.
  useEffect(() => {
    if (!highlightId) return;
    const el = scrollRef.current;
    const b  = branches.find(x => x.id === highlightId);
    if (!el || !b) return;
    const pillCenter = layout.barLeft + b.pos.x + b.size.w / 2;
    const target     = pillCenter - layout.viewportWidth / 2;
    const maxScroll  = layout.canvasWidth - layout.viewportWidth;
    el.scrollTo({ left: Math.max(0, Math.min(target, maxScroll)), behavior: "smooth" });
    const t = setTimeout(() => setHighlightId(null), 1800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally fires only on a new highlight, not on every branches/layout change
  }, [highlightId]);

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

  const createBranch = () => {
    const id = crypto.randomUUID();
    setBranches(prev => [
      ...prev,
      {
        id,
        name:  randomBranchName(),
        index: prev.length,
        pos:   defaultPillPos(prev.length),
        size:  { w: DEFAULT_PILL_W, h: DEFAULT_PILL_H },
      },
    ]);
    // Triggers the scroll-to + glow effect once the new pill has rendered.
    setHighlightId(id);
  };

  // Layout derived each render — only touch window on the client (post-mount),
  // so SSR/first render use the fallback and avoid hydration mismatch.
  const layout = mounted
    ? computeLayout(branches)
    : { barWidth: BASE_BAR_WIDTH, canvasWidth: BASE_BAR_WIDTH + 2 * CANVAS_PADDING, barLeft: CANVAS_PADDING, barTop: 0, viewportWidth: BASE_BAR_WIDTH };

  return (
    // Outer: full-screen, horizontal scroll only.
    <div ref={scrollRef} className="h-screen bg-black overflow-x-auto overflow-y-hidden">
      {/* Canvas: grows wider as the bar grows. */}
      <div
        className="relative h-full bg-black"
        style={{ width: `${layout.canvasWidth}px` }}
      >
        {/* Top navigation bar — full width, fixed 76px height, fixed so it
            stays in view while the canvas scrolls. */}
        <div className="fixed top-0 left-0 right-0 h-[76px] flex items-center justify-end px-5 bg-black z-20">
          <button
            onClick={createBranch}
            className="bg-neutral-900 border border-neutral-800 text-white text-sm font-regular px-[14px] py-[8px] rounded-[8px] shadow-xs cursor-pointer"
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
                stroke="var(--color-neutral-700)"
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
            onClick={() => router.push(`/branch/${b.name}`)}
            className={`absolute bg-neutral-900 flex items-center justify-center px-4 py-2 rounded-full cursor-pointer select-none z-10 transition-all duration-700 ${
              b.id === highlightId
                ? "border border-white/50 shadow-[0_0_18px_3px_rgba(255,255,255,0.22)]"
                : "border border-neutral-800 shadow-none"
            }`}
            style={{
              left: `${layout.barLeft + b.pos.x}px`,
              top:  `${layout.barTop  + b.pos.y}px`,
            }}
          >
            <span className="text-white text-sm font-regular whitespace-nowrap">
              {b.name}
            </span>
          </div>
        ))}

        {/* Repo bar — always shown; width grows, always centered in canvas. */}
        {
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
            <div className="relative w-full h-full bg-neutral-900 border border-neutral-800 rounded-[8px] overflow-hidden">
              {/* Name is clamped to the visible portion of the bar:
                  - natural position: center of bar
                  - right-clamp: sticks near the right viewport edge when bar grows wider
                  - left-clamp:  sticks near the left viewport edge when user scrolls right */}
              <span
                className="absolute top-1/2 text-white text-sm font-regular whitespace-nowrap pointer-events-none"
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
        }
      </div>
    </div>
  );
}
