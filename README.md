# AntiProd

**The design-engineer canvas — self-hosted, on your own model, inside your firewall.**

AntiProd is a nonlinear, bird's-eye canvas for design engineers. Generate a
screen as a node, fork it into as many variants as you want, lay them side by
side, iterate freely, and converge on one — then generate **front-end code on
demand**, only for the screen you've chosen.

Its defining property: **zero data egress.** AntiProd is built to run entirely
inside the customer's own infrastructure, against their own or chosen model.
Nothing leaves the network.

> _Stitch for design engineers — except it runs inside your firewall, on your
> own model, and your code never leaves the building._

## The core loop

1. **Generate** a screen from a prompt — it appears as a node on the canvas.
2. **Fork** it into variants; tweak each by prompt. Variants persist side by
   side — nothing is overwritten.
3. **Zoom out** for the bird's-eye view; arrange, compare, and connect screens
   with navigation edges.
4. **Converge** on the screen you want.
5. **Generate code** for that one node, on request — front-end code only.

## Features (v1)

- 🖼️ **Infinite, zoomable canvas** of screen-nodes — create, fork, arrange,
  connect, compare side by side.
- 🤖 **Prompt-driven design** — describe a screen (or an edit) and the design
  agent rewrites the node's elements live.
- 🌿 **Nonlinear iteration** — fork any node into a persistent variant; the
  original is never overwritten.
- 💻 **Code-on-demand** — compile a single chosen node into a React + Tailwind
  component, with copy / download.
- 🔌 **Configurable model layer** — point AntiProd at your own endpoint
  (Azure / Bedrock / Anthropic / self-hosted). Never a hardcoded provider or key.
- 🔒 **Zero egress** — no outbound calls, no telemetry, no data retention beyond
  your deployment.

## Current development status

The design agent currently runs on a **local mock generator** (`src/lib/generator.ts`)
— template + heuristic based, fully offline — so the entire front end is
workable **without any API key or network access**. The `/api/design` route is
the seam where a configurable model endpoint will later be proxied; the rest of
the app only depends on its request/response shape. Code generation
(`src/lib/codegen.ts`) is a real, deterministic local transform.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No API key needed — the
mock generator runs locally.

### Using the canvas

- **Generate a screen** — type a prompt in the top bar (e.g. _"a login screen
  with SSO"_) and hit **Generate**, or **+** for a blank screen.
- **Edit a screen** — click a node to open the chat panel; describe changes
  (_"add an email and password field"_, _"add a primary 'Sign in' button"_).
- **Fork a variant** — use the node toolbar or the panel's **Fork** button.
- **Generate code** — node toolbar **Code** action → React + Tailwind, copy or
  download as `.tsx`.
- **Connect screens** — drag between the blue handles to add navigation edges.
- **Configure the model** — the endpoint chip (top-right) opens model settings.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React Flow (`@xyflow/react`)](https://reactflow.dev) — the node canvas
- [shadcn/ui](https://ui.shadcn.com) (Base UI primitives) + Tailwind CSS v4
- TypeScript

Self-hostable and endpoint-configurable by design — the two hard requirements
from the brief.

## Project structure

```
src/
├── app/
│   ├── api/design/route.ts     # Design-generation seam (local mock today)
│   ├── layout.tsx              # Root layout, providers (tooltip, toaster)
│   ├── page.tsx                # Renders the canvas
│   └── globals.css             # Tailwind v4 + shadcn theme tokens
├── components/
│   ├── canvas/
│   │   ├── Canvas.tsx           # Orchestrates nodes, edges, chat, dialogs
│   │   ├── TopBar.tsx           # Brand, generate-a-screen prompt, model chip
│   │   ├── ScreenNode.tsx       # Screen node + live preview + node toolbar
│   │   ├── ChatPanel.tsx        # Per-screen AI chat (edit / fork / code)
│   │   ├── CodeDialog.tsx       # Generated React+Tailwind, copy / download
│   │   ├── ModelSettings.tsx    # Configurable endpoint sheet (localStorage)
│   │   └── canvas-context.tsx   # Node → canvas action wiring
│   └── ui/                      # shadcn components
└── lib/
    ├── generator.ts            # Local design generator (templates + edits)
    ├── codegen.ts              # Design → React + Tailwind compiler
    └── types.ts                # Shared types
```

## Not in v1 (deliberately)

Full-stack / backend generation, deep multiplayer, analytics / testing / PM
layers, and enterprise hardening (SSO, SOC 2, FedRAMP) beyond what a single
design-partner deployment needs. v1 exists to answer two questions: do design
engineers open it a second time, and does security let it stay.

## Next milestone

Wire the `/api/design` seam to live inference against the configured endpoint —
keeping the zero-egress guarantee — so prompts hit the customer's own model
instead of the local mock.
