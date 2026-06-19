# AntiProd — `latest-test` branch

Visual desktop tool for exploring repositories and building apps on a canvas.
This branch contains the foundational UI — a repository canvas, a per-branch
build canvas, and the **Scale DS** design system — built from a Figma spec.

## What's been built

### Repo canvas (`/`)

- **Repo bar** — a horizontally centered bar representing a repository. As
  branches are added the bar grows wider and the canvas becomes horizontally
  scrollable. The repo name stays visible, clamping to the viewport edge as the
  bar grows or the canvas scrolls.
- **Branch pills** — each branch is a pill alternating above/below the bar (even
  indices above, odd below), with two vertical tiers per side so adjacent pills
  never collide. **Clicking a pill opens that branch's build screen.**
- **S-curve connectors** — each pill links to a fixed anchor on the bar via a
  symmetric cubic-bezier SVG curve.
- **Create Branch** — a navbar button spawns a pill with a random
  `adjective/noun-branch` name, then smooth-scrolls to center the new pill and
  briefly highlights it with a soft glow.

### Branch build screen (`/branch/[...name]`)

Reached by clicking a branch pill. A Figma-like canvas where each branch's app
is designed and built (multiple nodes + connector flows are planned).

- **Navbar** — back-to-repository button, the branch name (read from the URL, so
  it survives refresh / is shareable), and a panel-toggle button (placeholder).
- **Canvas** — zoom (Cmd/Ctrl-scroll & trackpad pinch, anchored to the cursor),
  pan (scroll or space-bar + drag), all clamped 0.1×–4×.
- **Node** — a draggable 266×266 frame ("Alright, let's start build!"). Dragging
  is zoom-aware so it tracks the cursor at any scale.

### Scale DS — design system (`src/design-system/`)

The single source of truth for the visual language, transcribed from Figma and
defined with Tailwind v4's `@theme` so every token is both a CSS variable and a
utility class. No hardcoded colors / type / shadows live in components.

- `tokens/colors.css` — full palette (`bg-neutral-900`, `bg-brand-600`, …)
- `tokens/typography.css` — type scale + font family/weights (`text-sm`, `text-display-lg`, `font-semibold`, …)
- `tokens/effects.css` — drop shadows + background blurs (`shadow-xs`, `backdrop-blur-md`, …)

See `src/design-system/README.md` for conventions and how to add token layers.

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4 |
| Language | TypeScript |
| Design system | Scale DS (Tailwind v4 `@theme` tokens) |
| Font | Inter (via `next/font/google`) |
| Design reference | Figma (MVP file) |

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Key files

| File | Responsibility |
|---|---|
| `src/app/components/RepoCanvas.tsx` | Repo canvas: bar geometry, pills, connectors, scroll/glow |
| `src/app/components/BranchCanvas.tsx` | Branch build canvas: zoom/pan, draggable node, navbar |
| `src/app/branch/[...name]/page.tsx` | Catch-all route that opens a branch by name |
| `src/design-system/` | Scale DS design tokens |
