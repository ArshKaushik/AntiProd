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
- 🤖 **AI design agent** — click a screen to open a chat panel; describe what you
  want and the agent edits that screen's design in real time.
- 🗺️ **Minimap & controls** — quick navigation around large workflows.

Built with [Next.js 16](https://nextjs.org), [React Flow
(`@xyflow/react`)](https://reactflow.dev), the [Claude
API](https://docs.claude.com), TypeScript, and Tailwind CSS v4.

## Getting Started

Install dependencies:

```bash
npm install
```

Configure the AI design agent — copy the example env file and add your
[Anthropic API key](https://console.anthropic.com/):

```bash
cp .env.local.example .env.local
# then edit .env.local and set ANTHROPIC_API_KEY
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. (The canvas
works without a key; the per-screen AI chat needs `ANTHROPIC_API_KEY`.)

### How to use the canvas

- **Add a screen** — click **Add screen** in the top-left toolbar.
- **Design a screen with AI** — click a screen to open the chat panel, then
  describe what you want (e.g. _"make this a login screen with email and
  password fields and a sign-in button"_). The preview updates in real time.
- **Move screens** — drag a node anywhere on the canvas.
- **Connect screens** — drag from a node's blue handle to another node's handle.
- **Pan** — drag empty canvas space (or use the scroll wheel / trackpad).
- **Zoom** — scroll / pinch, or use the controls in the bottom-left.

## Project structure

```
src/
├── app/
│   ├── api/design/route.ts # AI design agent (Claude API) — edits a screen
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Renders the canvas
│   └── globals.css         # Tailwind v4 + theme tokens
├── components/
│   └── canvas/
│       ├── Canvas.tsx      # React Flow canvas + state (nodes/edges/chat)
│       ├── ScreenNode.tsx  # "Screen" node: renders the live design preview
│       ├── ChatPanel.tsx   # Right-side AI chat for the selected screen
│       └── Toolbar.tsx     # Floating toolbar (add screen, branding)
└── lib/
    └── types.ts            # Shared node/edge/design/chat types
```

## How the AI design agent works

Each screen holds a list of UI elements (`headings`, `text`, `buttons`,
`inputs`, …). When you send a chat command, `POST /api/design` calls Claude
(`claude-opus-4-8`) with a tool, `update_screen_design`, that returns the full
updated element list. The canvas applies it to the node's `data.elements`, which
re-renders the preview instantly. Conversation history is kept per screen.

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
