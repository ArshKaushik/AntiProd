# AntiProd

**A design OS to measure and maintain the interaction patterns of a product.**

AntiProd is a unified environment where designers, design engineers, and product managers work together — without switching between Figma, GitHub, Storybook, Jira, and Notion. It holds the knowledge, context, and memory of every design decision across a monorepo, keeps the product consistent, and lets AI handle the implementation work.

---

## The problem

Large design teams produce inconsistent products. Not because designers are careless, but because context is fragmented. A designer working on one part of the product has no easy way to know what patterns, visual language, UX copy conventions, or component decisions another designer made elsewhere. The result is drift — features that feel slightly off-brand, components that diverge, and copy that sounds like it came from different products.

Fixing it today means Figma comments, Slack threads, Notion docs, and long design reviews. AntiProd makes that communication unnecessary.

---

## What AntiProd does

### Holds the design memory of a product

AntiProd maintains a living knowledge base of every interaction pattern across the monorepo — not just component usage, but the full design fingerprint:

- **Brand consistency** — does this screen feel like us?
- **Visual language** — typography, color, spacing, layout decisions
- **UX copy** — does this text sound like the rest of the product?
- **Component decisions** — are we using the right building blocks, consistently?

Any designer opening a branch can immediately see how their work sits against the established patterns — without asking anyone.

### Turns branches into feature cards

Each branch in the monorepo is a feature card. A product manager writes the requirements directly in the card — essentially a lightweight PRD. The AI reads it and builds a first pass: design and production-ready code together. If the AI did a good job, a designer approves and ships. If not, they refine. The branch card is the single source of truth from idea to production.

This collapses what currently lives across three separate tools:
- **PM** writes requirements → inside the branch card, not Notion
- **AI** designs and implements → no manual handoff
- **Designer or engineer** reviews and ships → one click, straight to a PR

### Ships production-ready work

AntiProd's output is not a Figma spec. It is a shipped pull request. Designers and engineers work in the same environment, and design quality, code quality, and production quality are monitored under the same roof.

### Closes the loop with AI

Performance analytics and real-world usage data feed back into AntiProd's AI, which can autonomously propose and implement design improvements — better experiences informed by how people actually use the product. Over time, AntiProd learns the design language of the product and becomes an autonomous collaborator, not just a linter.

---

## Three layers

### Knowledge layer
AntiProd holds the memory of every design decision, interaction pattern, and component across the monorepo. Brand guidelines, visual language, UX copy conventions, and component choices are all stored as living, queryable context — not locked in a Figma file or a Notion doc. Any designer starting a new feature can see what patterns are already established, without asking anyone.

### Production layer
Design, code, and quality exist in the same environment. A designer ships a pull request from AntiProd — the output is never a spec. Design quality, code quality, and production quality are monitored under the same roof, so the gap between "designed" and "shipped" collapses into a single step.

### Autonomous layer
Performance analytics and real-world usage data feed back into AntiProd's AI. The AI understands the design language of the product, can propose improvements grounded in how people actually use it, and can implement those improvements autonomously — closing the loop between production behavior and design decisions. Over time, AntiProd becomes a collaborator, not just a tool.

---

## Design philosophy

AntiProd mirrors how engineering teams already work — monorepo, branches, pull requests — and brings designers natively into that workflow instead of running a parallel process in separate tools. The design team and the engineering team share the same source of truth, the same branch structure, and the same shipping mechanism. Collaboration becomes native rather than bolted on.

Each branch is not just a code artifact. It is the unit of work — holding the product requirement, the design, the implementation, and the deployment record together in one place. A PM writes the idea. The AI builds a first pass. A designer reviews and approves. It ships. No handoffs, no translation between tools, no context lost.

---

## The right analogy

AntiProd is to design engineering what an IDE is to software engineering — a single, opinionated environment where everything related to building a product lives. Designers work here instead of Figma. Engineers work here instead of switching between five tools.

The closest parallel is Cursor: an AI-native environment that made software engineers dramatically more productive by collapsing the gap between thinking and shipping. AntiProd does the same for the design-to-production workflow — but for the people building the product experience, not just the underlying code.

---

## What's been built (`latest-test` branch)

### Repo canvas (`/`)

The visual foundation: a monorepo represented as a canvas where branches are cards connected to the repo bar.

- **Repo bar** — a centered bar representing the repository. Grows wider as branches are added; the canvas becomes horizontally scrollable. The repo name clamps to the viewport edge as the bar grows or the canvas scrolls.
- **Branch pills** — each branch is a pill alternating above/below the bar (even indices above, odd below), with two vertical tiers per side so adjacent pills never collide. Clicking a pill opens that branch's build screen.
- **S-curve connectors** — each pill connects to its own unique anchor point on the bar edge (directly above/below the pill's horizontal center), via a symmetric cubic-bezier SVG curve. Connectors recompute live on resize and zoom.
- **Create Branch** — spawns a pill with a random `adjective/noun-branch` name, smooth-scrolls to center it, and briefly highlights it.

### Branch build screen (`/branch/[...name]`)

Reached by clicking a branch pill. A Figma-like canvas where a branch's design and code are built.

- **Navbar** — back-to-repository button, branch name (read from URL, survives refresh, shareable), and a panel-toggle button (placeholder).
- **Canvas** — zoom (Cmd/Ctrl-scroll & trackpad pinch, cursor-anchored), pan (scroll or space-bar + drag), clamped 0.1×–4×.
- **Node** — a draggable 266×266 frame. Dragging is zoom-aware at any scale.

### Scale DS — design system (`src/design-system/`)

The visual language of the product, transcribed from Figma and defined with Tailwind v4's `@theme`. Every token is both a CSS variable and a utility class. No hardcoded colors, type, or shadows live in components.

- `tokens/colors.css` — full palette (`bg-neutral-900`, `bg-brand-600`, …)
- `tokens/typography.css` — type scale + font family/weights (`text-sm`, `text-display-lg`, …)
- `tokens/effects.css` — drop shadows + background blurs (`shadow-xs`, `backdrop-blur-md`, …)

See `src/design-system/README.md` for conventions.

---

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

---

## Key files

| File | Responsibility |
|---|---|
| `src/app/components/RepoCanvas.tsx` | Repo canvas: bar geometry, pills, connectors, scroll/glow |
| `src/app/components/BranchCanvas.tsx` | Branch build canvas: zoom/pan, draggable node, navbar |
| `src/app/branch/[...name]/page.tsx` | Catch-all route that opens a branch by name |
| `src/design-system/` | Scale DS design tokens |

---

## Developer tooling & skills

This repo is set up for AI-assisted development (Claude Code). The relevant pieces are committed so the whole team gets the same setup:

| What | Where | Purpose |
|---|---|---|
| **Skills lockfile** | `skills-lock.json` | Pins the project's agent skills by source + hash (like `package-lock.json`). Currently pins **agentation**. Installed skill files (`.agents/`, `.claude/skills/`) are not committed — regenerated from this lockfile. |
| **graphify** | `graphify-out/` | A persistent knowledge graph of the codebase. Query with `graphify query "<question>"`, `graphify path "<A>" "<B>"`, `graphify explain "<concept>"`, and refresh after code changes with `graphify update .`. Open `graphify-out/graph.html` to browse visually. |
| **agentation** | rendered in `layout.tsx` (dev only) | In-app visual feedback toolbar — drop annotations on the running app and the agent reads them over MCP. |
| **Project hooks** | `.claude/settings.json` | Shared Claude Code hooks that enforce graph-first exploration. |
| **Agent instructions** | `CLAUDE.md`, `AGENTS.md` | Conventions the AI follows — graphify rules and the note that this Next.js version has breaking changes (check `node_modules/next/dist/docs/` before coding). |

> **New teammates:** after `npm install`, install the pinned skills from `skills-lock.json` via your Claude Code skills tooling so `agentation` and the graph workflow work the same as everyone else's.
