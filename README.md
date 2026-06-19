# AntiProd — `latest-test` branch

Visual desktop tool for exploring GitHub repositories. This branch contains the foundational UI canvas built from a Figma spec.

## What's been built

### Repo bar
A horizontally centered bar represents a GitHub repository. As branches are added the bar grows wider, and the canvas becomes horizontally scrollable. The repo name is always visible — it clamps to the right edge of the viewport when the bar grows past the screen width, and to the left edge when the user scrolls right.

### Branch pills
Each branch is rendered as a draggable pill element. Pills alternate above and below the repo bar:
- Even-indexed branches appear **above** the bar
- Odd-indexed branches appear **below** the bar

Within each side, pills alternate between two vertical tiers (`sideIndex % 2`) so adjacent pills are always 376px apart horizontally — wide enough for any branch name, and unaffected by future renames.

Pills can be freely dragged to any position. Their coordinates are stored relative to the bar, so everything moves together when the canvas scrolls.

### S-curve connectors
Each pill is connected to a fixed anchor point on the repo bar via an SVG S-curve (symmetric cubic bezier). The connector always attaches to the **left edge** of the pill and arrives at the bar anchor horizontally, creating a clean S-shape that updates live as pills are dragged.

### Create Branch button
A fixed navbar button spawns new branch pills with random funky names (`adjective/noun-branch`). Branch anchors are evenly spaced along the bar (188px apart per side).

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Language | TypeScript |
| Font | Inter (via `next/font/google`) |
| Design reference | Figma (MVP file) |

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Key file

`src/app/components/RepoCanvas.tsx` — single client component that owns all canvas state: branch positions, drag logic, bar geometry, connector paths, and the scrollable layout.
