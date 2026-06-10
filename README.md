# AntiProd

**A visual app builder.** Design and develop applications using a workflow
method: each screen of your app is a **node** on an infinite, Figma-style
canvas. Connect screens with edges to define the flow and functionality between
them.

## Features

- 🖼️ **Infinite canvas** — pan and zoom freely, just like Figma.
- 🧩 **Screen nodes** — every node represents one screen of your app.
- 🔗 **Connectors** — drag between handles to wire screens together and model
  navigation / functionality.
- 🗺️ **Minimap & controls** — quick navigation around large workflows.

Built with [Next.js 16](https://nextjs.org), [React Flow
(`@xyflow/react`)](https://reactflow.dev), TypeScript, and Tailwind CSS v4.

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### How to use the canvas

- **Add a screen** — click **Add screen** in the top-left toolbar.
- **Move screens** — drag a node anywhere on the canvas.
- **Connect screens** — drag from a node's blue handle to another node's handle.
- **Pan** — drag empty canvas space (or use the scroll wheel / trackpad).
- **Zoom** — scroll / pinch, or use the controls in the bottom-left.

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Renders the canvas
│   └── globals.css         # Tailwind v4 + theme tokens
├── components/
│   └── canvas/
│       ├── Canvas.tsx      # React Flow canvas + state (nodes/edges)
│       ├── ScreenNode.tsx  # Custom "screen" node with connection handles
│       └── Toolbar.tsx     # Floating toolbar (add screen, branding)
└── lib/
    └── types.ts            # Shared node/edge types
```

## Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start the dev server (Turbopack)  |
| `npm run build` | Production build                  |
| `npm run start` | Run the production build          |
| `npm run lint`  | Lint with ESLint                  |

## Roadmap ideas

- Inline editing of screen name / contents (double-click).
- Persisting workflows (localStorage → backend).
- Screen templates and a component palette.
- Exporting the workflow as a spec or scaffolded code.
