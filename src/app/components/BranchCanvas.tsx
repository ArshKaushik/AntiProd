"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// ─── Constants ──────────────────────────────────────────────────────────────
const NODE_SIZE  = 266;       // node is a 266×266 frame (Figma)
const NAVBAR_H   = 76;
const MIN_ZOOM   = 0.1;
const MAX_ZOOM   = 4;
const ZOOM_SENS  = 0.02;      // wheel/pinch → zoom factor sensitivity

type Vec  = { x: number; y: number };
type Node = { x: number; y: number; w: number; h: number };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// Shared "button base" for navbar icon buttons (Figma 56:64 / 56:59):
// black surface, subtle xs shadow, 8px padding around a 20px icon.
const ICON_BTN =
  "flex items-center justify-center rounded-[8px] border border-black bg-black p-2 shadow-xs text-neutral-400 transition-colors hover:text-white cursor-pointer";

// Live drag bookkeeping. mode 'pan' moves the canvas; 'node' moves the frame.
// startX/startY are the pointer position at mousedown; orig* is the value being
// dragged at that moment; zoom is captured so node movement tracks the cursor.
type Drag = {
  mode: "pan" | "node";
  startX: number;
  startY: number;
  origX: number;
  origY: number;
  zoom: number;
};

export default function BranchCanvas({ branchName }: { branchName: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [pan, setPan]   = useState<Vec>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [node, setNode] = useState<Node>({ x: 0, y: 0, w: NODE_SIZE, h: NODE_SIZE });
  const [spaceHeld, setSpaceHeld] = useState(false);
  const [panning, setPanning] = useState(false);

  // Latest-value refs so the native wheel listener / global drag listeners read
  // current state without re-binding on every change.
  const panRef   = useRef(pan);   panRef.current   = pan;
  const zoomRef  = useRef(zoom);  zoomRef.current  = zoom;
  const spaceRef = useRef(spaceHeld); spaceRef.current = spaceHeld;
  const dragRef  = useRef<Drag | null>(null);

  // Seed the node left-of-center / slightly low, matching the Figma placement.
  // Done on mount so window access stays client-side (SSR-safe).
  useEffect(() => {
    setMounted(true);
    setNode((n) => ({
      ...n,
      x: window.innerWidth / 2 - 634,
      y: window.innerHeight / 2 - 111,
    }));
  }, []);

  // Zoom (Cmd/Ctrl-scroll & trackpad pinch) + pan (plain scroll/swipe).
  // Native listener with passive:false so we can preventDefault the page scroll.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      // ctrlKey = trackpad pinch (synthesized) or Ctrl-scroll; metaKey = Cmd-scroll on macOS.
      if (e.ctrlKey || e.metaKey) {
        const z = zoomRef.current;
        const p = panRef.current;
        // Canvas point under the cursor — kept fixed across the zoom.
        const px = (cx - p.x) / z;
        const py = (cy - p.y) / z;
        const nz = clamp(z * Math.exp(-e.deltaY * ZOOM_SENS), MIN_ZOOM, MAX_ZOOM);
        const np = { x: cx - px * nz, y: cy - py * nz };
        // Update refs synchronously so back-to-back wheel events (faster than
        // React renders) keep anchoring off the live transform, not a stale one.
        zoomRef.current = nz;
        panRef.current = np;
        setZoom(nz);
        setPan(np);
      } else {
        const p = panRef.current;
        const np = { x: p.x - e.deltaX, y: p.y - e.deltaY };
        panRef.current = np;
        setPan(np);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Space-bar toggles pan mode (Figma-style hold-to-pan).
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setSpaceHeld(true);
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === "Space") setSpaceHeld(false);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Global drag: pan moves 1:1 with the pointer; node moves by pointer delta
  // divided by the captured zoom so it stays under the cursor at any scale.
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const d = dragRef.current;
      if (!d) return;
      if (d.mode === "pan") {
        setPan({ x: d.origX + (e.clientX - d.startX), y: d.origY + (e.clientY - d.startY) });
      } else {
        setNode((n) => ({
          ...n,
          x: d.origX + (e.clientX - d.startX) / d.zoom,
          y: d.origY + (e.clientY - d.startY) / d.zoom,
        }));
      }
    };
    const up = () => {
      dragRef.current = null;
      setPanning(false);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  // Pan starts only when space is held (otherwise a press on empty canvas is a
  // no-op). A press on the node is handled separately and stops propagation.
  const onCanvasMouseDown = (e: React.MouseEvent) => {
    if (!spaceRef.current) return;
    e.preventDefault();
    dragRef.current = {
      mode: "pan",
      startX: e.clientX,
      startY: e.clientY,
      origX: panRef.current.x,
      origY: panRef.current.y,
      zoom: zoomRef.current,
    };
    setPanning(true);
  };

  const onNodeMouseDown = (e: React.MouseEvent) => {
    if (spaceRef.current) return; // space-drag should pan, not grab the node
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = {
      mode: "node",
      startX: e.clientX,
      startY: e.clientY,
      origX: node.x,
      origY: node.y,
      zoom: zoomRef.current,
    };
  };

  const canvasCursor = spaceHeld ? (panning ? "grabbing" : "grab") : "default";

  return (
    <div
      ref={containerRef}
      onMouseDown={onCanvasMouseDown}
      className="relative h-screen w-screen overflow-hidden bg-black"
      style={{ cursor: canvasCursor }}
    >
      {/* Transformed canvas layer — pan + zoom apply here; nodes live inside at
          canvas coordinates. */}
      <div
        className="absolute left-0 top-0"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: "0 0" }}
      >
        {mounted && (
          <div
            onMouseDown={onNodeMouseDown}
            className="absolute flex items-center justify-center rounded-[8px] border border-neutral-800 bg-neutral-900 p-2 cursor-grab active:cursor-grabbing select-none"
            style={{ left: node.x, top: node.y, width: node.w, height: node.h }}
          >
            <p className="text-center text-xs font-regular text-neutral-400">
              Alright, let’s start build!
            </p>
          </div>
        )}
      </div>

      {/* Top navigation bar — fixed, full width, 76px. Branch name left, panel
          icon right (matches Figma). */}
      <nav
        onMouseDown={(e) => e.stopPropagation()}
        className="fixed left-0 right-0 top-0 z-20 flex items-center justify-between bg-black px-3"
        style={{ height: NAVBAR_H }}
      >
        {/* Left: back-to-repository button + branch name */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Back to repository"
            onClick={() => router.push("/")}
            className={ICON_BTN}
          >
            {/* lucide "chevron-left" */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <span className="select-none text-sm font-regular text-white">{branchName}</span>
        </div>

        {/* Right: panel toggle (no action yet — wires to a sidebar later) */}
        <button type="button" aria-label="Toggle panel" className={ICON_BTN}>
          {/* lucide "panel-right" — inline so it isn't tied to a short-lived Figma asset URL */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M15 3v18" />
          </svg>
        </button>
      </nav>
    </div>
  );
}
