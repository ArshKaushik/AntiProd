# AI-Native Design Tools: Competitive Research

**Report scope:** paper.design, people.ai/people.dev, pencil.dev, Magic Patterns, Magic Path, Framer AI, Galileo AI (→ Google Stitch), Uizard (→ Miro), Locofy, Anima — plus the broader new wave (Figma Make/First Draft, Diagram/Genius, v0, Bolt.new, Lovable, Builder.io Fusion, Subframe, Onlook, Tempo, TeleportHQ, Visily, Polymet, Banani, Motiff, and the Krea clarification)
**Date:** June 2026
**Audience:** AntiProd strategy
**Central question:** A new wave of AI-native design tools is generating UI from prompts and turning designs into code. How far do they actually go — and do any of them hold design *memory*, enforce *consistency* across a product, serve *teams on a monorepo*, and *ship a production PR*? Those are the four dimensions AntiProd is trying to own.

---

## Executive Summary

The category is real, it is crowded, and it is moving fast — Lovable at $500M ARR, Framer a $2B unicorn, Google folding Galileo into Stitch and moving Figma's stock ~11% with a *free Labs experiment*. That is the validation signal: the problem AntiProd is chasing is large enough that the best founders and the largest platforms are all running at it. But almost every tool runs at it from the same starting point — **prompt → one-off UI → code** — and the differentiation collapses into four recurring gaps that map exactly onto AntiProd's thesis:

- **Consistency is cosmetic, not enforced.** Most tools either generate a generic "AI look" (v0, Lovable, Galileo/Stitch, Uizard, Visily, Polymet) or offer a *seeding* layer — import your tokens, pick a theme, reference a library (Magic Patterns, MagicPath, Framer, Figma Library Import). Seeding is not enforcement. The only tools that *enforce* consistency do it by construction (Subframe — the canvas literally *is* the component library) or by scanning the repo and refusing to hallucinate (Bolt Design System Agents, Builder.io Design System Intelligence). Even those enforce a *current* component set; none enforces a *history of decisions*.
- **Teams are an afterthought; monorepos are unaddressed.** Nearly every tool is solo-first or project-scoped. "Teams" plans mean seats, SSO, and a shared workspace — not a tool that understands a monorepo's package graph, propagates a token change across packages, or knows which squad owns which surface. **Builder.io Fusion is the only product with a genuine team/monorepo story** (Slack/Jira/GitHub integration, works against an existing monorepo, multi-role collaboration). No tool is truly monorepo-native.
- **Shipping mostly stops at code generation.** The design-to-code tools (Locofy, Anima, Subframe, Magic Patterns) push code or sync to a branch, but stop short of a *reviewed* production PR. The app-builders (v0, Bolt, Lovable, Tempo, Builder.io Fusion) go further — v0, Tempo, and Builder.io Fusion open actual PRs; Bolt and Lovable deploy. But "ships" and "ships *production-ready, reviewed, design-consistent*" are different claims, and the security disasters at Lovable (16 vulns in a showcased app; a BOLA bug exposing other users' keys) show how thin the "production-ready" claim is.
- **Knowledge — durable, enforced memory of past design decisions — is the single most unsolved dimension in the entire category.** Almost every tool has, at best, conversational context within a session or a re-derived snapshot of the *current* codebase. **Builder.io Fusion is the only tool making an explicit, enforced "remembers how your team works and improves with each correction" claim.** Google's Stitch `DESIGN.md` and Bolt's Design System Agents are the closest structural alternatives, but both encode the *present* system, not an accumulating decision ledger with rationale.

Two of the tools in the original brief are dead ends and should be noted as such: **people.ai/people.dev is not a design tool at all** (a sales-intelligence company now rebranded "Backstory," plus an unrelated voter-canvassing app), and **Krea is an AI media/image suite, not a UI/UX product-design tool**. Several tools in the brief have already been absorbed by incumbents: **Galileo → Google (Stitch)**, **Uizard → Miro**, **Diagram/Genius → Figma**. That consolidation is itself a strong signal: the platforms believe this layer matters, and they are buying their way in.

**The strategic takeaway for AntiProd:** the white space is not "generate a screen from a prompt" — that is a red ocean with a $500M-ARR leader. The white space is the *intersection* of all four dimensions: a tool that holds the **memory** of every design decision across a **monorepo**, **enforces** that memory as a hard constraint, and **ships a reviewed PR** from a brief. No single competitor occupies that intersection today. The closest — Builder.io Fusion — owns team/monorepo + PR + claimed memory but is enterprise-gated, design-system-snapshot-based rather than decision-history-based, and not designer-first. That is the lane.

---

## The Four Dimensions (definitions used throughout)

1. **CONSISTENCY** — does it maintain design consistency *across a product*, or generate one-off components with no memory of the rest?
2. **TEAM** — built for solo designers, or for design *teams* working on a *monorepo*?
3. **SHIPPING** — does it go from design to a *production-ready PR*, or stop at code generation?
4. **KNOWLEDGE** — does it hold durable memory of *past design decisions* and enforce them going forward?

A master scorecard against these four sits at the end of the report.

---

# Part 1 — The tools named in the brief

## paper.design ("Paper")

> The brief said "paper.dev"; the actual product lives at **paper.design** (tagline: "design, share, ship"). Not Dropbox Paper, paper.js, or the FiftyThree drawing app.

### What it is and who it's for
A **code-native design canvas**: every element you draw is real HTML and CSS (React/Tailwind export), so there is no proprietary file format and no design-to-code translation step. It pairs a Figma-like canvas with GPU shaders, AI image generation, OKLCH/Display-P3 color, and a bidirectional MCP server. Founded 2024 (public alpha early 2025) by **Stephen Haney** (ex co-creator of Radix UI / Modulz), with Vlad Moroz and Ksenia Kondrashova. Skewed hard toward the **solo founder / designer-developer hybrid / small fast-moving team** — explicitly *not* large orgs. A reviewer: *"If you're a 10-person product team with a design system built over years, paper.design is not ready for your workflow."*

### How far it goes
Design + native code-gen ("Copy as React" produces "the exact 1:1 code the designer was looking at"). Shipping is **agent-mediated**: via MCP + an external agent (Claude Code/Cursor) it can convert a design and *commit it to GitHub*, even deploy — but Paper's own docs state there is "no mention of pull request creation or automatic deployment capabilities" built in. The commit/deploy is what the *agent* does, not Paper.

### AI capabilities
The headline is an **MCP server with 24 bidirectional tools** (vs Figma's 3 read-only). Agents read/write the canvas in natural language, pull live data, generate responsive variations, and commit to GitHub. Built-in AI image generation (Flux 2, Nano Banana Pro, Seedream 4.5). Philosophy: AI as a supporting role; core generation is agent-mediated via MCP, requiring external agent setup — not a one-click "generate UI" button.

### Pricing
Free ($0, 100 MCP calls/week); Pro ($20/mo monthly or $16/user/mo annual, 1M MCP calls/week); Organizations (custom, not yet available — SAML/SSO, admin).

### Traction
**$4.2M seed (Feb 2025) led by Accel** with Basecase and angels Guillermo Rauch (Vercel), Des Traynor (Intercom), Adam Wathan (Tailwind), Jordan Singer, Koen Bok. **40,000+ early-access signups.** No clear flagship ProductHunt launch for the core tool; HN presence is near-zero (1–4 points). High anecdotal buzz on X as a "Figma killer" candidate.

### Gaps and roadmap
Open alpha, "not production-ready." No managed design system, **no cross-file memory** (docs are explicit: "Paper lacks built-in cross-file memory or design system management… users must manually ask agents to reference [files]"). Components/themes/tokens-as-a-system are "Coming Soon." [Confirmed roadmap] "Use your code components" (single source of truth), native Tailwind import/export, team/contractor permissions. [Speculative] A persistent design-memory layer — Haney talks about "preserving designer's intent," but no roadmap item commits to it.

### Four dimensions — paper.design
1. **CONSISTENCY — Weak.** No managed design system; "coming soon."
2. **TEAM — Solo/small.** Multiplayer exists; enterprise tier unfinished; not monorepo-scale.
3. **SHIPPING — Commit/deploy via external agent; no native PR.**
4. **KNOWLEDGE — None.** Explicitly no cross-file memory — the clearest gap.

---

## people.ai / people.dev — NOT a design tool

> **Bottom line:** Neither domain is an AI-native design tool. Exclude from the competitive set.

- **people.ai → "Backstory"** (rebranded April 2026): an AI *sales/revenue-intelligence* platform (auto-captures sales activity, unifies with CRM). For CROs/RevOps at enterprises (Cisco, AMD, Zoom). Founded 2016, ~$198M raised, unicorn at ~$1.1B (a16z, ICONIQ, Lightspeed). **Zero design relevance.**
- **people.dev → "People" by Everybody Techworks**: a political *voter-canvassing* mobile app ("Canvassing made simple"), used in a Swing Left pilot. iOS, 5.0 from 3 ratings. **Zero design relevance.**

If a tip suggested "people.dev" is a design tool, it appears mistaken or refers to something not publicly discoverable as of June 2026. (A separate "People Data Labs" data-enrichment API is yet another unrelated "people"-named company.)

---

## pencil.dev ("Pencil")

> **Disambiguation:** "Pencil" is overloaded. The target is **pencil.dev**, founded 2025 by Tom Krcha. It is NOT trypencil.com (a different, older generative-AI *ad-creative* tool acquired by Brandtech in 2023 — all the "$23M ARR / acquired 2023" Crunchbase/Latka figures belong to *that* company), nor the Evolus "Pencil" wireframing tool.

### What it is and who it's for
An **AI-native vector design canvas that lives inside your IDE** (VS Code, Cursor) and as a desktop app. Tagline: *"Design on canvas. Land in code."* Designs are stored as **`.pen` files** (JSON) committed **into your Git repo** alongside source, so they version/branch/merge like code. Explicitly an *"AI designer for every engineer"* — for developers / design engineers / solo founders / heavy Claude Code users; **not** for large collaborative design teams or non-technical stakeholders. Backed by **a16z Speedrun (Cohort 005)**.

### How far it goes
Design → code (React/Next/Vue/Svelte/HTML; Tailwind/CSS Modules/Styled; shadcn/Radix/Chakra/MUI), generated into the repo. **Stops at code generation** — docs describe no PR creation, CI, deploy, or review; you manually commit. No two-way sync (after manual canvas edits you must re-prompt). Like Paper, it does nothing on its own — it depends entirely on an external coding agent.

### AI capabilities
A **local MCP server** lets AI agents (Claude Code primary, plus Cursor/Windsurf/Codex/Gemini/Copilot) read/write the `.pen` canvas. Flagship: **SWARM mode** — up to 6 AI design agents working in parallel on one canvas ("your autonomous design agency"), with moving cursors per agent; a16z's Jon Lai called it *"god mode."* Figma copy-paste import (vectors/text/styles, not images).

### Pricing
**Pencil itself is free** during early access; monetization "planned but unannounced." Real cost is the AI agent (Claude Code from $20/mo plus token usage, reportedly high). No published team/enterprise tiers.

### Traction
**100,000 users** (founder-stated, weeks post-launch). a16z Speedrun-backed; exact check not disclosed. Founder Tom Krcha previously built Around (acq. Miro) and co-founded Alter (acq. Google). HN presence low; buzz on X/LinkedIn.

### Gaps and roadmap
Crashes "relatively common"; no autosave; canvas↔export visual mismatch (4–8px drift); no two-way sync; **no multiplayer** (collaboration is Git branches/PRs only); design-system governance "feels early" vs Figma. [Confirmed] SWARM shipped; comments and shared libraries planned; autosave planned. [Speculative] deeper agent autonomy toward a "self-running design agency." A contrarian designer take circulated: *"Design Files Don't Belong in Git."*

### Four dimensions — pencil.dev
1. **CONSISTENCY — Partial/"early."** Variables/tokens, components, style guides exist; the `.pen` file is the source of truth, but governance-at-scale is immature.
2. **TEAM — Solo/one-person-does-both.** No real-time multiplayer; Git-only collaboration.
3. **SHIPPING — Stops at code gen into the repo;** no PR/deploy.
4. **KNOWLEDGE — Repo-as-memory, no enforcement engine.** "Memory" = `.pen` file + Git + reusable "prompt blocks"; no decision ledger that actively enforces past decisions.

---

## Magic Patterns (magicpatterns.com)

> Frequently confused with the unrelated "Magic Path" (below) and an unrelated "MagicPattern" graphics tool. This is the **YC W23** company by **Alex Danilowicz & Teddy Ni**.

### What it is and who it's for
An *"AI prototype generator for product teams"* — prompt, screenshot, or Figma mockup → production-ready frontend code (React/Tailwind, also Vue/HTML). Explicitly for **product teams of 5–50** (PMs, designers, engineers), *not* solopreneurs (they deliberately turned away agencies/solos because expansion economics depend on teams scaling seats). 1M+ designs generated; 1,500+ teams (Vapi, Lendi, Origami Risk).

### How far it goes
Design → code → multiple exit paths: download, live preview, **two-way GitHub sync** (push/pull to a repo), export to Figma (layered), and **MCP into Cursor/Claude Code**. Frontend-only (no backend). This is closer to "production PR" than most peers but is still a sync-to-repo / IDE-handoff model, not an autonomous "open a reviewed PR" flow.

### AI / consistency
This is its core differentiator: import your *real* components (Figma / Storybook / any website via Chrome extension), reference them in prompts as `@LibraryName/Button`, and the AI "pulls from those real components instead of generating a generic UI." "Presets" lock in brand colors, typography, layout. Explicitly contrasts itself vs v0/Lovable ("generate generic designs").

### Pricing
Free (100 credits/mo); Starter ($20/seat/mo); Business ($100/seat/mo — SSO, 5,000 credits, 10+ users); Enterprise (custom, "design system assistance," SCIM). On-demand $0.02/credit. **SOC 2 Type II + ISO 27001.**

### Traction
**$6M Series A (Nov 2025) led by Standard Capital** (with YC, Essence VC, Pioneer Fund); ~$7.2M total. Notable: **$1M ARR with zero full-time employees** (just the two founders) before raising. ProductHunt "Agent 2.0" launch: 316 upvotes.

### Four dimensions — Magic Patterns
1. **CONSISTENCY — Strong.** `@Library/Component` binds to a real design system; presets enforce brand.
2. **TEAM — Strong/team-first.** Multiplayer, shared workspaces, SSO/SCIM; solos de-prioritized.
3. **SHIPPING — Partial → production-adjacent.** Two-way GitHub sync + MCP handoff; frontend-only; no autonomous reviewed PR.
4. **KNOWLEDGE — Moderate.** Versioned components/presets (publish a new version → see all designs using it) = component/token memory, **not** rationale/decision memory.

---

## Magic Path / MagicPath (magicpath.ai)

> A *different* product from Magic Patterns. Founded by **Pietro Schirano** (ex-Brex design lead, the @skirano AI/design figure) and Jack Beoris. (Ignore the unrelated 126-upvote "MagicPath AI" course tool.)

### What it is and who it's for
An AI-native **infinite-canvas design tool** — "the Cursor moment for design." Talk UI into existence on a canvas, remix variations, export React/TS/Tailwind. v1 audience: founders/PMs/devs (solo-leaning). The **2.0 release (mid-2026)** repositioned it as *"the first professional, AI-native design tool built for teams and enterprise"* with a **multiplayer canvas where humans and AI agents collaborate in real time**.

### How far it goes
Design → code, and (2.0) → repo via **external agents** (Claude Code/Codex/Cursor read the design file, build the codebase, sync back; push designs into a repo as components). React-only export (a noted limitation — no plain HTML/CSS). Shipping is *delegated* to a coding agent you bring; external agent calls billed by your provider, not MagicPath. It does not itself open a production PR.

### AI / consistency
Import Figma variables or pick prebuilt design systems (modeled after OpenAI/Airbnb/Claude) so output inherits tokens; 2.0's parallel agents share a design system. Token/theme-level, not deep component binding. A documented weakness: literal-color bleed ("mentioning teal once resulted in teal appearing almost everywhere").

### Pricing
Free (20 credits/day); Pro (~$21–30/mo, 600+ credits, unlimited agent calls/Figma exports); Teams (custom annual, 1,000 credits/seat, SSO). Unused credits don't roll over.

### Traction
**$6.6M seed (May 2025) led by Khosla Ventures & Abstract** (angels Keith Rabois, Ramtin Naimi), plus a **$2M insider round at a $100M valuation** (~$8.6M total). Heavy organic X/LinkedIn buzz. Design-tool ProductHunt count: not found.

### Gaps and sentiment
Praised as "the first that actually nails the missing loop between design and coding agents." Complaints are well-documented: credits "burn fast," generation slow (~2 min), no progress indicators, **no feedback loop** ("no mechanism to teach the system your preferences, and no adaptation over time"), named agents (Rune/Atlas) are "mostly branding," mobile gen reported broken.

### Four dimensions — MagicPath
1. **CONSISTENCY — Moderate, improving.** Figma vars / prebuilt themes; token-level; literal-color bleed undercuts it in practice.
2. **TEAM — Mixed/transitional.** Solo v1 → multiplayer + Teams in 2.0; team maturity newer/less battle-tested than Magic Patterns.
3. **SHIPPING — Partial (delegated).** Via external agents; React-only.
4. **KNOWLEDGE — Weak.** Explicitly "no adaptation over time"; conversation history can be lost on refresh.

---

## Framer AI

### What it is and who it's for
Framer is a **design-first, no-code website builder that publishes live, hosted production websites**, with generative AI layered aggressively on top since 2023. CEO Koen Bok wants "any company [to] confidently run their entire website on Framer." For **solo designers, freelancers, design-led brands, creators, small marketing teams** building marketing sites/landing pages/portfolios (<50 pages) — explicitly **not** authenticated apps or product UIs in a repo. Customers: Miro, Perplexity, Scale AI; ~40% of a recent YC batch.

### How far it goes
The biggest differentiator vs pure code-gen tools: prompt → **live, hosted, SSR-rendered production site** (CloudFront CDN, sub-second publishes, versioning, rollback, staging, custom domains). **Critical caveat — no real code export / vendor lock-in:** per Framer's own help center, "Framer does not offer HTML exporting… Framer sites are not static and therefore cannot be exported." It "ships," but only to Framer's own hosting — not to a Git repo or PR.

### AI capabilities
~7 AI surfaces: **Agents on canvas (Framer 3.0, ~June 2026)** — agents that design pages, make breakpoints, create components, write code, connect to CMS; **Wireframer** (NL → responsive multi-page wireframe); **Workshop** (AI code-component gen on Claude 4.5, 161K marketplace users); **AI Translate** (one-click localization); **Framer MCP + external agents** (BYO Claude Code/Cursor/Codex via CLI, operating on branches with your own LLM tokens); **Site Review & Fixes** (AI QA). First-party image gen is essentially absent.

### Pricing
Free; Basic $10/mo; Pro $30/mo; Enterprise custom. Editor seats $20/editor/mo; AI Translate ~$20/locale/mo (a recurring complaint). AI credits: full landing page ≈300 credits.

### Traction
**$100M Series D (Aug 2025) at a $2B valuation** (unicorn) led by Meritech & Atomico, with Accel; ~$163M total. ~$50M ARR (doubled YoY), break-even, $100M ARR target for 2026. 500K+ MAU; ~45–55K paying. ProductHunt: Framer 3.0 #1 of day (547 upvotes).

### Sentiment and roadmap
Praise: "gorgeous, animated, responsive output." Complaints: Trustpilot 1.7/5; "AI features performed inconsistently… regularly"; billing surprises; generic output ("visual elevator music"). [Confirmed] Framer 3.0 — Agents-on-canvas, Git-style **Branching**, External Agents via MCP. [Inferred] shift from "Framer-managed AI" toward "your LLM, Framer's canvas." [Speculative] enterprise governance, native code export.

### Four dimensions — Framer AI
1. **CONSISTENCY — Partial.** Consistency comes from Framer's component/token *system*, not the AI (which is brand-blind and "inconsistent").
2. **TEAM — Multiplayer, but for *website* teams.** Real-time co-edit, Git-style branching; not a code-monorepo tool.
3. **SHIPPING — Ships, but to Framer hosting, not a PR.** Hard lock-in, no repo export.
4. **KNOWLEDGE — Shallow.** Live access to current project; no durable design-decision memory.

---

## Galileo AI → Google Stitch

> **Disambiguation:** This is the **UI design tool** (Benard/Zhou, Khosla-backed). NOT the unrelated AI-evaluation platform "Galileo" ($45M Series B, Scale Venture Partners) — do not conflate the funding.

### What Galileo was
A text-to-UI / image-to-UI generator (describe a screen → editable mockups in ~30–60s, Figma export). For founders/non-designers/PMs. Founded late 2022 by **Arnaud Benard** (ex-Google Research) and **Helen Zhou** (ex-Meta/Cruise). ~$4.8M total (**$4.4M seed led by Khosla**, Feb 2024). Viral 2023 demos; public beta hit 100K+ generations in days.

### The Google acquisition (full story)
A **full acquisition with acqui-hire characteristics** (founders moved to Google). Notified to regulators Nov 2024; Turkish Competition Board cleared it May 2025 (4–3, with dissenters arguing "killer acquisition"); announced at Google I/O May 2025 alongside the Stitch launch. **Price undisclosed** (Galileo had raised <$5M). Benard: *"Galileo AI has been acquired by Google… we launched today the next generation of our product, powered by Gemini: Stitch."* [Inferred] motives: narrative/credibility vs Figma+OpenAI; a flagship Gemini multimodal showcase.

### What it became (Google Stitch)
A Google Labs tool: prompt + image inputs → UI designs and frontend code, on Gemini 2.5/3.0. UI-only. Evolution: **May 2025** launch (single-screen, basic export); **March 2026 "Stitch 2.0 / Vibe Design"** (up to 5 interconnected screens, infinite canvas, prototyping, model selection, and a **`DESIGN.md` design-system file**); **May 2026 I/O** (real-time streaming design agent with voice/text course-correction, Google-Docs-style multi-user editing, an Agent Manager logging project evolution).

**Code/shipping:** one-click export to Figma + HTML/CSS; multi-framework export (React/Vue/SwiftUI) is **roadmap, not shipped** as of May 2026. A **Stitch MCP server + SDK** hands off to Claude Code/Cursor and can publish a static site to Netlify — but it does not itself open production PRs.

**Pricing:** **Free** via Google Labs, no paid tier yet (daily complexity-based credits). [Speculative] paid tiers ~Q4 2026 when it exits Labs.

**Market impact:** **Figma stock dropped ~11% over two days** after the March 2026 Stitch 2.0 update — a free Labs experiment moving a public competitor's stock.

### Sentiment and roadmap
Praise: "we crank them out in under a minute"; "generates images first before any code." Complaints: "Cannot shake the AI-looking design"; "my top navigation looked a little different on different pages"; LogRocket — "struggled to meet even the most basic accessibility requirements… more of a sparring partner than an actual replacement for designers." [Confirmed] real-time agent + multiplayer + Agent Manager; **`DESIGN.md` spec open-sourced** for cross-tool portability. [Confirmed-as-roadmap] React/Vue/SwiftUI export; enterprise tier with audit logs + SSO.

### Four dimensions — Galileo / Stitch
1. **CONSISTENCY — Partial, improving.** Multi-screen gen shares a theme; `DESIGN.md` helps; but users report nav drift and no project-level component engine.
2. **TEAM — Was solo; multi-user since May 2026.** Shallow; not monorepo-aware.
3. **SHIPPING — Stops at code/Figma + static publish;** PRs delegated downstream.
4. **KNOWLEDGE — File-based (`DESIGN.md`).** Portable, explicit, enforced-as-constraints — a real step up, but *manual/declarative*, not autonomously learned or rationale-bearing.

---

## Uizard → Miro

### What it is and who it's for
**"Uizard by Miro Labs"** — AI UI/UX tool that creates wireframes, mockups, and clickable prototypes from text, screenshots, or hand-drawn sketches. Born from co-founder **Tony Beltramelli's** 2017 pix2code research; Copenhagen, 2018. Pitch: "you just need an idea." For **founders, PMs, non-designers** doing rapid early-stage prototyping; reviewers say it's "more like an early Canva than a serious design tool," not yet for professional designers.

### How far it goes
Stops at **design + limited component-level code export.** "Handoff Mode" copies React (.jsx) + CSS for *individual components* (Pro) — no full-app export, no deployment, no PRs.

### AI / pricing / traction
**Autodesigner 2.0** (June 2024): text-to-UI multi-screen, Screenshot/Wireframe Scanner, Theme Generator/Brand Kit, AI feedback + Focus Predictor heatmap. Pricing: Free; Pro $12/creator/mo; Business $39/creator/mo; Enterprise. Traction: "2M+ users" (founder claim, unaudited); ~$18.6M raised (Series A $15M led by Insight Partners, 2021); ProductHunt 2021 Golden Kitty for #1 AI/ML Product.

### The Miro acquisition
**Miro acquired Uizard in 2024 (terms undisclosed; ~May 27, 2024).** Miro (70M users) slots Uizard's generative engine into its "AI Innovation Workspace." **The product remains standalone** as "Uizard by Miro Labs" through mid-2026 — no sunset announced — but Miro's 2025 AI launches (AI Canvas, Sidekicks, sketch-to-prototype) reflect Uizard tech migrating onto Miro's canvas. Effectively in maintenance/integration mode.

### Four dimensions — Uizard
1. **CONSISTENCY — Weak/one-off.** Generic, inconsistent across screens; can't propagate across viewports without re-prompting.
2. **TEAM — Solo/small-team.** "Teams" features rated basic; no codebase awareness.
3. **SHIPPING — Stops at design + component code.** No full-app export, deploy, or PR.
4. **KNOWLEDGE — None.** Effectively stateless per generation; "Autodesigner won't follow strict guidelines."

---

## Locofy (locofy.ai)

### What it is and who it's for
A **Figma/Penpot-to-code platform** (React/RN/Next/HTML/Vue/Angular/Flutter). Flagship **Locofy Lightning** = one-click design-to-code. Audience skews to **frontend developers and agencies** plus the designers who hand off. Claims **200,000+ builders across 195 countries.** Surface: Figma plugin (Lightning / newer UIPro), **Locofy Builder** (web app to refine live code with "Agent Mode"), CLI, MCP server, URL import.

### How far it goes / shipping
Further than pure codegen but **stops short of opening a PR:** generate → sync to Builder → refine via Agent Mode → **push directly to a GitHub repo** (new/existing branch) with a **"smart merge"** + conflict-resolution panel. **GitHub sync is gated to Enterprise/legacy annual plans.** Newer MCP/UIPro hands off to Cursor/Windsurf/Claude Code. **Native PR creation: not found** (direct push + smart-merge only).

### Consistency / AI
Real strength: **reuse an existing component library** (import code via CLI/GitHub/Storybook; Locofy auto-maps code components to Figma components, recognizing variants/props), **Figma Variables → CSS Variables** tokens, and **"Auto Components"** (extracts repeated UI into reusable components). The core AI is **LocoAI's "Large Design Models" (LDMs)** — a ~0.5B-parameter unified model (arXiv 2507.16208) that Locofy claims **beats LLMs on node-positioning accuracy, responsiveness, and reproducibility.** Three stages: Design Optimiser → Tagging/feature detection → Auto Components.

### Pricing / traction
Credit ("LDMtoken") system: Free 600 tokens; PAYG $0.40/token; Starter ~$33.30/mo; Pro ~$99.90/mo; Enterprise (GitHub sync). **~$7.3M total** (Seed II $4.25M, May 2023, Northstar Ventures with Accel & Golden Gate). ProductHunt: 1,000+ upvotes, 4.9 stars, 7 awards.

### Gaps
Well-documented code-quality complaints: **"div soup"** (non-semantic HTML), multiple `<h1>` tags / broken heading hierarchy (SEO/a11y), vague CSS class naming, design-to-code drift, slow on large frame sets, weak on complex interactions. Output needs manual cleanup. [Confirmed] MCP/UIPro live; LDM research published. [Speculative] deeper repo/PR automation.

### Four dimensions — Locofy
1. **CONSISTENCY — Moderate-to-strong.** Auto Components + token export + library mapping; but per-screen conversion has no persistent "product memory."
2. **TEAM — Team-capable but project-scoped.** Real-time Builder collab; **not monorepo-native.**
3. **SHIPPING — Partial.** Direct GitHub branch push + smart-merge (Enterprise only); **no reviewable PR.**
4. **KNOWLEDGE — Weak.** Global model, consistency re-derived per conversion via the mapping; no decision ledger.

---

## Anima (animaapp.com)

### What it is and who it's for
A design-to-code platform (founded 2017, Tel Aviv, YC-backed): **Figma / prompt / image → functional, testable applications** (React/HTML, CSS or Tailwind, vanilla or on shadcn/AntD/MUI/Radix). Targets a broad audience ("designers who don't code, developers who won't design, or founders with no time"). **Figma's #1 codegen partner with 1.5M installs.** Three surfaces: the **Figma plugin/Playground** (designer-facing), **Frontier** (developer-facing VSCode agent), and an **API/SDK** for embedding into other agents.

### How far it goes / shipping
Widest range of the design-to-code set, but "ship" is nuanced: **Playground** pushes/commits to GitHub with rollback; **Frontier** does **"Code Injection"** (generates missing components, injects directly into local source files, preserving your conventions) — **explicit PR creation: not found**; the **SDK returns code files, does NOT create PRs.** API-first: **Anima powers Bolt.new** (paste a Figma link → runnable React → Bolt adds Supabase + Netlify deploy), so it reaches deployment *indirectly* through embedding agents, not as a native Anima feature.

### Consistency / AI (Frontier is the strategic center)
Frontier **analyzes the entire local codebase, maps your design system/frameworks/conventions/components, then reuses your existing components** — explicitly a *governance* pitch. Processes/indexes code **locally (no cloud upload)** — a security pitch for enterprise teams. **Smart Code Optimizer** (Oct 2024) adds visual component identification + cleanup. AI agents have "brand context including design files, code, and brand language."

### Pricing / traction
Free; Pro $40/seat/mo; Business from $150/mo; Enterprise from $500/mo (SSO/MFA/SLA). 1.5M Figma installs; Frontier VSCode ~59K installs. Customers (self-reported): Amazon, Samsung, Apple, Disney, Deloitte. **Series A $10M (2021, MizMaa Ventures)** + **IBM Ventures strategic investment (Feb 2026, amount undisclosed)** — earmarked to "deepen integration with enterprise brands, design systems, and legacy front-end code."

### Gaps
Most literal/flat output historically (absolute positioning, flat HTML — "best for prototyping/design validation, not production code"; the older plugin path, which Frontier is designed to fix). Mobile responsiveness pain; steep free-to-paid jump.

### Four dimensions — Anima
1. **CONSISTENCY — Strong (via Frontier).** Maps and reuses your *existing* design system; legacy plugin export is one-off/flat.
2. **TEAM — Strong/enterprise-oriented.** Local codebase indexing, SSO/MFA/SLA, IBM backing; "monorepo" not explicitly named but codebase-aware by design.
3. **SHIPPING — Partial-to-broad, but indirect.** Frontier injects into local files; Playground commits; deployment via embedding agents (Bolt → Netlify); **no native PR.**
4. **KNOWLEDGE — Moderate.** Reads/conforms to the *current* codebase each run (re-derived context); **no persistent enforced decision ledger.**

---

# Part 2 — The broader new wave (the tools that matter most)

> These were surfaced as "any other significant AI design tools." Several are more significant to AntiProd's competitive picture than the smaller tools above, because they go furthest on shipping, consistency, and team — and because two of them (v0, Figma) anchor the adjacent reports `02-ai-dev-tools.md` and `01-figma.md`.

## v0 by Vercel (v0.app)

Vercel's AI app-builder: NL prompts → production-ready React/Next (shadcn/ui + Tailwind). The **Feb 2026 relaunch ("the new v0")** broadened it from UI generation into a full-stack "vibe coding" platform with **Git/PR workflows**, a sandbox runtime, and one-click deploy. **Strongest shipping story in the category:** sandbox imports any GitHub repo, a first-class Git panel creates a branch per chat, commits, **opens PRs**, and deploys on merge. AI: a proprietary **composite model family** over swappable bases (currently Claude Sonnet 4) plus a custom `vercel-autofixer-01` for AST-level repair. **4M+ users; ~$42M standalone ARR (Feb 2025 est);** parent Vercel ~$340M ARR, **$9.3B valuation** ($300M Series F, Sept 2025). Pricing token/credit-based: Free $5/mo, Premium $20, Team $30/user, Business $100/user. Gaps: React/Next + Tailwind only; volatile token costs; post-March-2026 quality-regression complaints; Vercel lock-in.

- **CONSISTENCY — Partial (registry-driven, not enforced).** **TEAM — RBAC/SSO, not monorepo-aware gen.** **SHIPPING — strongest (branch → PR → deploy).** **KNOWLEDGE — weakest (no persistent memory; relies on externally-maintained registry).**

*(v0 is covered in depth in `02-ai-dev-tools.md`; included here for the four-dimension comparison.)*

## Figma — Make / First Draft / Figma AI / Diagram-Genius (the incumbent)

The incumbent's AI story runs through several threads (full treatment in `01-figma.md`):

- **Figma Make** (GA July 2025) — prompt-or-design → interactive high-fidelity prototypes with logic. **Powered by Anthropic Claude** (per Anthropic's case study: Sonnet, Sonnet 4.5, Opus 4.6). Design-system support = **Library Import** (import, not enforcement). Supabase backend.
- **First Draft** — launched as "Make Designs" at Config 2024, **pulled after output too closely resembled existing apps** (a weather prompt produced near-clones of Apple's app; Figma admitted it "didn't vet [the components] carefully enough"), **relaunched as First Draft** Sept 2024 (GPT-4/Titan), then **absorbed into the new "Figma agent"** (beta, May 2026).
- **Strategy:** Config 2025 shipped Make, **Sites**, **Buzz** (brand assets), Draw, Grid; 2026 added the **Figma agent** and **MCP round-trips** with Anthropic (Claude Code) and OpenAI (Codex), including **"Claude Code to Figma"** (Feb 2026).
- **Diagram / Genius** — Jordan Singer's AI-plugin startup (Magician, and the never-shipped **Genius**, an "AI design companion that autocompletes your design using components from your design system"). $3M seed (Ludlow + Figma Ventures). **Acquired by Figma June 21, 2023; terms undisclosed.** Genius's design-system-aware-autocomplete concept is the conceptual ancestor of First Draft.
- **Context:** Adobe's **$20B acquisition collapsed Dec 2023**; Figma **IPO'd July 2025** (+250% day one, ~$58B cap); ~$1.06B revenue 2025. **Anthropic launched Claude Design (Apr 2026)**, a direct prompt-to-design competitor — Figma stock fell ~7% (irony: Figma Make runs *on* Claude).
- **Sentiment:** Make/Sites output "neither accessible, semantic, nor clean," "universally require human review." Works at the "leaf-node level," missing design's "deeper life-cycle." Credit pricing backlash ("thousands of credits = a few dozen prompts").

- **CONSISTENCY — Weak-to-moderate (import/seed, not enforced; Make Designs scandal showed weak control).** **TEAM — strong collaboration, but AI gen is single-file/single-user.** **SHIPPING — stops short of production PRs.** **KNOWLEDGE — largely absent (doesn't train on customer content; session context only).**

## Lovable (lovable.dev)

NL → full-stack web apps — "the world's first AI Fullstack Engineer." For founders/PMs/designers/non-engineers. Grew from open-source GPT Engineer (50K+ stars); commercial launch Nov 2024, #1 on ProductHunt. Prompt → polished code → Supabase backend → deploy (10k+ custom domains, GitHub sync). **Agent Mode (Oct 2025)** searches codebases, inspects logs, builds across files. **Claude Sonnet 4.5 default since Nov 2025.** Pricing credit-based (Free 5/day; Pro ~$25/mo; Business ~$50/mo).

**The standout traction story:** $4M ARR in 4 weeks → $10M in 2 months with 15 people → **$500M annualized revenue confirmed June 2026, 1M new projects/week**; **$330M Series B at $6.6B valuation (Dec 2025).** Output is notably more polished by default ("looks designed rather than generated") but **no design-system ingestion**. **The dominant concern is security:** a Feb 2026 report found a Lovable-showcased app with 16 vulnerabilities (6 critical) exposing 18,697 records; a separate BOLA bug let any free-tier user read others' chats, source, DB credentials, and API keys. *"AI does what you ask. It just never thinks about what you didn't ask."*

- **CONSISTENCY — good defaults, weak enforcement.** **TEAM — team-capable, not monorepo.** **SHIPPING — deploys with backend, but security undercuts "production"; no PR gate.** **KNOWLEDGE — conversational/project memory only.**

## Bolt.new (StackBlitz)

Browser-based AI app builder on WebContainer tech (full Node.js in-browser). Launched Oct 2024. Prompt → code → run → deploy (Netlify; **Bolt Cloud** adds hosting/DB/auth). Anthropic Claude throughout. **Flagship differentiator — Design System Agents (Mar 2026):** ingest components from "your codebase, npm packages, Storybook, component specs, logos, fonts, brand guidelines," then **enforce** real approved components ("not a hallucinated element"), real design tokens ("instead of guessing at hex colors"), and code alignment — admins set an org-wide default. **"The prototype *is* the product."** ~$40M ARR (Mar 2025), **7M+ users**, **$135M raised, ~$700M valuation**; claims 75% of Fortune 500. Gaps: aggressive token burn (cases of 20M+ tokens on a single bug); debugging misreads architectural problems. Pricing: Free; Pro $25/mo; Teams $30/user/mo; Enterprise (~$100K base).

- **CONSISTENCY — strong WITH Design System Agents** (enforces real components/tokens org-wide), weak without. **TEAM — Teams + org design-system defaults; not monorepo-native.** **SHIPPING — furthest toward production (deploy); no explicit PR gate.** **KNOWLEDGE — partial/system-level** (Design System Agents = enforced shared visual memory; no per-project decision memory over time). *This is the closest the market has come to enforced consistency + system knowledge.*

## Builder.io (Visual Copilot + Fusion) — the closest competitor to AntiProd's full thesis

Visual-dev company (founded 2018, Steve Sewell) pivoted into AI design-to-code. Three products: legacy Figma-to-code import; **Visual Copilot** (AI Figma-to-code plugin/CLI — stops at code gen, hands off to Cursor/Windsurf); and **Fusion** (Fusion 1.0, Nov 2025 — "the first AI agent for product, design, and code"). Enterprise-focused.

- **Shipping — Fusion goes to production PRs:** "plugs into your existing codebase and Figma," builds UI live, "instantly create pull requests," and the bot "responds to PR feedback, fixes build failures, addresses review comments," and can be assigned Jira tickets.
- **Consistency — strong, product-wide: Design System Intelligence** (Enterprise-tier) "scans your repository, deeply understands your design system… and trains itself to always generate code that leverages your existing components and tokens."
- **Team/monorepo — the strongest in the category:** Sewell — *"Most AI tools make individual contributors faster but leave teams disconnected. Fusion 1.0… lets PMs, designers, and engineers build together."* Integrates Slack, Jira, Figma, GitHub/GitLab/Azure DevOps/Bitbucket; RBAC; works against existing monorepos.
- **Knowledge — the strongest explicit claim in the category:** Fusion "remembers how your whole team works, learns, and improves," "becoming smarter with each correction and adapting to UX patterns and naming preferences."
- AI: multi-model, default Claude Sonnet 4, plus its open-source **Mitosis** compiler. Pricing: Free; Pro $24/user; Team $40/user; Enterprise custom (Design System Intelligence gated here). **~$37.3M raised** (Series B $20M led by M12/Microsoft, 2024). ProductHunt: Fusion 167 upvotes. Gaps: best features Enterprise-gated; vendor-lock-in reputation from the older CMS product.

- **CONSISTENCY — strong/product-wide (Enterprise-gated).** **TEAM — strongest team/monorepo story.** **SHIPPING — yes, creates/fixes PRs.** **KNOWLEDGE — yes, explicit AI memory + enforced design decisions (strongest in category).**

## Subframe (subframe.com)

"The AI-native design tool built for code." A Figma-like canvas where **layers are real React + Tailwind components** (props/slots/variants) on Radix primitives — not pixel mockups. Output is production React/Tailwind pulled via CLI (`npx @subframe/cli sync`); "you own the code." Strong YC affinity ("20% of YC S24 built MVPs with Subframe"). **Consistency is enforced by construction** — the canvas *is* the component library; editing a token "updates every button, badge… across the entire project," "rebrand in one click." Importing an *existing* design system is gated to enterprise. **You pull code; Subframe does not push PRs** (MCP lets agents read/edit Subframe pages, but no PR creation or writing outside Subframe's ecosystem; one-directional). React + Tailwind only. Pricing: Free; Pro $29/editor/mo; Custom. Funding undisclosed (investor Haystack).

- **CONSISTENCY — strong/product-wide (enforced by construction; tokens cascade).** **TEAM — built for teams, NOT monorepo-aware.** **SHIPPING — stops at code gen / CLI sync (no PRs, no deploy).** **KNOWLEDGE — partial/personalization, project-scoped (no cross-project decision memory).**

## Onlook (onlook.com)

Open-source AI-first visual editor for code — "The Cursor for Designers." Visually build/edit real React (Next.js + Tailwind) on an infinite canvas, writing to source (bi-directional visual↔code sync). Deploys in seconds, custom domains, publish-to-GitHub. Primary gen Claude Sonnet 4 (via OpenRouter; model-agnostic). **~26K GitHub stars** (#1 trending, above DeepSeek); HN Show HN 408 points; **YC W25**; ~$500K seed. Pricing: Free (200 MCP calls/day, self-hostable, Apache 2.0); Teams custom. Gaps: Next.js+React+Tailwind lock-in; "still being developed, be careful for production"; no mobile editor; real-time multi-user "under development."

- **CONSISTENCY — moderate, library-driven (not policy-enforced).** **TEAM — single-user/small-team today.** **SHIPPING — partial (deploy + GitHub publish; governed design→PR is roadmap).** **KNOWLEDGE — weak/none.**

## Tempo / Tempo Labs (tempo.new)

AI-powered **visual IDE for React** — "feels more like Figma than VS Code"; anchors the "design engineering" movement. Founded 2023 Toronto, **YC S23**. **Genuine differentiator: design → code → GitHub PR** (auto-creates branch → commit → PR; "what you see in the editor is what exists in the codebase"); planning-first multi-agent. **Limitation: personal GitHub accounts only — no org/enterprise GitHub, no CI/CD.** Primarily Claude. Pricing prompt-credit based (Free 30 prompts; Pro $30/mo; up to Power $350; some sites cite Agent+ at $4,500/mo — criticized "$30→$4,500 gap"). **$5M Seed (Oct 2025)** — YC, Golden Ventures, Webflow Ventures, General Catalyst. ProductHunt 844 upvotes. Gaps: React/Next-only; personal-GitHub-only weakens team/monorepo; unreliable auth/backend wiring.

- **CONSISTENCY — moderate intent (imports Storybook/MUI/Chakra/Radix), struggles at scale.** **TEAM — marketed for teams, effectively solo (personal-GitHub-only).** **SHIPPING — strongest dimension (real auto-PR), capped by personal-GitHub-only.** **KNOWLEDGE — weak/partial (loses context).**

## Smaller / earlier tools (briefly)

- **TeleportHQ** — low-code AI front-end platform (founded 2017, Romania). Prompts/Figma/images → responsive sites, exportable across 9 frameworks + one-click hosting (no automated PRs). Real token panels, reusable cross-project components. ~$3.67M total (seed 2022). PH 1K+ upvotes. *CONSISTENCY partial · TEAM solo/small · SHIPPING code+hosting, no PR · KNOWLEDGE weak.*
- **Visily** — AI UI tool explicitly **for non-designers** (founded 2021, Atlanta). Wireframes/mockups/prototypes; V4.5 (Mar 2026) added AI Code Gen, but output is a **ZIP + README — no repo, no PR, no deploy, no backend**, capped at 10 screens. Pricing Free / Pro $11 / Business $29. ~$2.27M seed (Floodgate). *CONSISTENCY partial (theme) · TEAM single-user-first · SHIPPING code ZIP only · KNOWLEDGE minimal.*
- **Polymet** — "AI Product Designer" (YC S24). Prompts/images/Figma → React+Tailwind+shadcn "production-ready frontend code"; integrates GitHub/npm/Storybook but **no deploy, no PR.** Claude Sonnet. PH 631 upvotes; ~$2–2.86M pre-seed. *CONSISTENCY weak/partial · TEAM solo+light · SHIPPING code export only · KNOWLEDGE absent.*
- **Banani** — canvas-first AI text-to-UI ("the Canva of product design," Berlin). Stops at handoff — exports to Figma/images/HTML-CSS; 2026 added MCP for agents. No deploy/PR. €850k pre-seed (May 2025); claims "100k+" users; importing a design system is Enterprise-only. *CONSISTENCY partial/one-off · TEAM solo-leaning · SHIPPING handoff/MCP only · KNOWLEDGE weak.*
- **Motiff** — AI UI tool / Figma alternative (AI Layout, text-to-UI with built-in design systems). A **Figma IP settlement (July 2025)** forced it to stop selling outside mainland China — now largely China-restricted.

## Tools that are NOT competitors (clarifications for the record)

- **Krea (krea.ai)** — an **AI creative/media suite** (images/video/3D; a model-aggregation layer behind a real-time canvas; a Midjourney/Runway competitor). **$83M total raised, ~$500M valuation, 30M+ users.** **No layouts, no code, no deployment — not a UI/UX or design-to-production competitor.** Included only because the brief is adjacent to "AI design."
- **Creatie shut down Aug 4, 2025** — it was NOT acquired by Adobe (correction vs a common misconception).
- No ByteDance tie to Motiff was found.

---

# Synthesis — Mapping every tool against AntiProd's four dimensions

## Master scorecard

| Tool | CONSISTENCY | TEAM / monorepo | SHIPPING | KNOWLEDGE (decision memory) | Funding / scale |
|---|---|---|---|---|---|
| **paper.design** | Weak (DS "coming soon") | Solo/small | Commit via agent, no native PR | **None** (explicit) | $4.2M seed (Accel); 40K signups |
| **people.ai/.dev** | N/A — not a design tool | N/A | N/A | N/A | (sales-intel / canvassing app) |
| **pencil.dev** | Partial/"early" | Solo; no multiplayer | Code-gen into repo, no PR | Repo+prompt-blocks, no enforcement | a16z Speedrun; 100K users |
| **Magic Patterns** | **Strong** (`@Library/Component`) | Strong/team-first | 2-way GitHub sync; no autonomous PR | Moderate (versioned components) | $6M Series A; $1M ARR, 0 FTEs |
| **MagicPath** | Moderate (themes; color bleed) | Mixed (solo→2.0 teams) | Delegated to agents; React-only | **Weak** ("no adaptation over time") | $6.6M seed + $2M @ $100M val |
| **Framer AI** | Partial (system, not AI) | Multiplayer (website teams) | Ships to Framer hosting, no repo/PR | Shallow | $2B val; ~$50M ARR |
| **Galileo / Stitch** | Partial (`DESIGN.md`) | Solo → multi-user (2026) | Code/Figma + static publish; no PR | File-based (`DESIGN.md`), declarative | Acquired by Google (undisclosed) |
| **Uizard** | Weak/one-off | Solo/small | Component code only; no deploy/PR | **None** | ~$18.6M; acquired by Miro |
| **Locofy** | Moderate-strong (Auto Components) | Team, not monorepo | GitHub push + smart-merge (Ent); no PR | Weak | ~$7.3M; 200K users |
| **Anima** | **Strong via Frontier** (reuses DS) | Strong/enterprise (local indexing) | Inject/commit; deploy via Bolt; no native PR | Moderate (re-reads codebase) | $10M A + IBM (undisclosed); 1.5M installs |
| **v0 (Vercel)** | Partial (registry) | RBAC, not monorepo | **PR + deploy (strongest)** | **Weakest** | ~$42M ARR; Vercel $9.3B |
| **Figma (Make/AI)** | Weak-moderate (import) | Collab strong; gen single-file | Prototype/site, no PR | Largely absent | Public; ~$1.06B rev |
| **Lovable** | Good default, weak enforce | Team, not monorepo | Deploy (security risk); no PR gate | Conversational only | **$500M ARR; $6.6B val** |
| **Bolt.new** | **Strong w/ DS Agents** | Teams + org defaults; not monorepo | Furthest to prod; no PR gate | Partial/system-level | ~$40M ARR; ~$700M val |
| **Builder.io Fusion** | **Strong (DSI, Ent-gated)** | **Strongest (monorepo, Slack/Jira)** | **Yes — production PRs** | **Yes — explicit, enforced** | ~$37.3M raised |
| **Subframe** | **Strong (by construction)** | Teams, NOT monorepo | Code via CLI; no PR/deploy | Partial (personalization) | Pre-seed (Haystack) |
| **Onlook** | Moderate (library) | Small-team; collab early | Deploy + GitHub publish; PR roadmap | Weak/none | YC W25; ~$500K |
| **Tempo** | Moderate (struggles at scale) | Marketed team, solo in practice | **Real PR (personal GitHub only)** | Weak | $5M seed |
| **TeleportHQ** | Partial | Solo/small | Code + hosting, no PR | Weak | ~$3.67M |
| **Visily** | Partial (theme) | Single-user-first | Code ZIP only | Minimal | ~$2.27M |
| **Polymet** | Weak/partial | Solo + light | Code export only | Absent | ~$2–2.86M |
| **Banani** | Partial (one-off) | Solo-leaning | Handoff/MCP only | Weak | €850k |

## Dimension 1 — The consistency problem

Three behaviors exist in the wild:
1. **Generic one-off generation** (no memory of the rest of the product): v0, Lovable, Galileo/Stitch, Uizard, Visily, Polymet, Banani, Framer's AI. The dominant complaint here is the "AI-generated look" and cross-screen drift ("my top navigation looked a little different on different pages").
2. **Seeded consistency** (import tokens / pick a theme / reference a library — a *soft* suggestion the model may ignore): Magic Patterns, MagicPath, Locofy, Anima (plugin path), Figma Library Import, TeleportHQ.
3. **Enforced consistency** (the system is a hard boundary): **Subframe** (the canvas literally *is* the component library — tokens cascade by construction), **Bolt Design System Agents** and **Builder.io Design System Intelligence** (scan the repo, refuse to hallucinate, use only approved components/tokens), and **Anima Frontier** (maps and reuses the existing codebase's components).

**The gap:** even the enforcement tier enforces a *current snapshot* of the component set. None enforces a *history of decisions with rationale* — "we chose this pattern because of that A/B test; never reintroduce the deprecated one." Consistency today is "use these components"; AntiProd's thesis is "honor every decision ever made." That distinction is unoccupied.

## Dimension 2 — The team / monorepo problem

Nearly the entire field is solo-first or project-scoped. "Teams" almost always means seats + SSO + a shared workspace, not monorepo-awareness. The standouts:
- **Builder.io Fusion** is the only product with a genuine monorepo + multi-role (PM/designer/engineer) + Slack/Jira/Git story — and it's explicitly pitched at the "teams disconnected" problem.
- **Anima Frontier** is codebase-aware (local indexing) and enterprise-oriented, though it doesn't name "monorepo."
- **Magic Patterns** is team-first but frontend-project-scoped.
- Everyone else (Tempo's personal-GitHub-only, Subframe's single-dir, pencil's no-multiplayer, paper's unfinished org tier) is effectively single-workspace.

**The gap:** no tool truly understands a monorepo's package graph — that a token change in `packages/tokens` must propagate to twelve apps, or that squad A owns `apps/checkout` and squad B owns `apps/marketing`. Monorepo-native design is genuinely unaddressed.

## Dimension 3 — The shipping problem

A clear split:
- **Stops at code generation / handoff:** Subframe, Magic Patterns (sync), Pencil, Paper (agent commit), Visily, Polymet, Banani, Uizard, Galileo/Stitch, Figma Make, Anima SDK/Frontier (inject, no PR), Locofy (push, no PR).
- **Opens an actual PR:** **v0**, **Tempo** (personal GitHub only), **Builder.io Fusion** (and its bot responds to review comments / fixes build failures).
- **Deploys a running app:** **Bolt**, **Lovable**, **Framer** (to its own hosting), **v0**.

**The gap:** "ships a PR" and "ships a *reviewed, production-ready, design-consistent* PR" are different. The PR-openers (v0, Tempo) are weakest on consistency/knowledge; the deployers (Lovable) have shipped security disasters. Builder.io Fusion comes closest to "consistent + team + PR," but its memory is a design-system snapshot, not a decision ledger, and it is enterprise-gated and engineering-first rather than designer-first. The fully-integrated "brief → consistent, memory-respecting, reviewed PR" loop is open.

## Dimension 4 — The knowledge problem (the deepest moat)

This is the single most unsolved dimension across all 20+ tools, and the one that most cleanly differentiates AntiProd:
- **None** holds a durable, queryable, *enforced* ledger of past design decisions *with rationale*.
- The best anyone offers: **Builder.io Fusion's** explicit "remembers how your team works and improves with each correction" (the strongest *claim*, but it's pattern/naming adaptation, not a rationale-bearing decision history); **Google Stitch's `DESIGN.md`** (portable, declarative, *manually authored*); **Bolt's Design System Agents** and **Anima Frontier** (which re-read the *present* system, not an accumulating history).
- Everyone else has conversational/session context at best (Lovable, v0, MagicPath — which is explicitly criticized for "no adaptation over time"), or nothing (Uizard, Polymet, paper.design — which *documents* that it has no cross-file memory).

**This is AntiProd's sharpest wedge.** A living memory of every design decision across the monorepo, enforced as a hard constraint and used to drive a shipped PR, is not occupied by any current player and is not on any confirmed competitor roadmap.

## Strategic implications for AntiProd

1. **The category validates the problem and is consolidating around the platforms.** Google bought Galileo, Miro bought Uizard, Figma bought Diagram, Anthropic launched Claude Design and is moving Figma's stock. Competition is a validation signal, not a disqualifier — but it means AntiProd must own a position the platforms can't easily reach, and "generate a screen" is not it.
2. **The fastest-growing tools win on shipping/scale and lose on memory.** Lovable ($500M ARR), v0 (4M users), Bolt (7M users) are all weakest on knowledge/consistency-enforcement. They are racing toward "ship anything fast"; AntiProd should race toward "ship *consistently and accountably*."
3. **The one tool that overlaps AntiProd's full thesis — Builder.io Fusion — is beatable on three fronts:** it is engineering-first (not designer-first), its "memory" is a design-system snapshot rather than a decision history with rationale, and its consistency/knowledge features are Enterprise-gated. AntiProd's differentiation is the *knowledge layer as a first-class, decision-rationale ledger* + a genuine *monorepo* model + a *designer-and-PM-native* surface.
4. **The four-dimension intersection is empty.** No competitor simultaneously (a) holds enforced memory of past design *decisions with rationale*, (b) is monorepo-native, (c) enforces consistency as a hard constraint, and (d) ships a reviewed production PR from a brief. That intersection — not any single dimension — is AntiProd's defensible position.

---

## Sourcing notes and caveats

- All pricing noted at time of research (June 2026) and changes frequently.
- Roadmap claims tagged **[Confirmed]**, **[Inferred]**, or **[Speculative]** inline.
- **Not found / undisclosed:** Galileo, Uizard, and Diagram acquisition prices; Anima's IBM investment amount; Subframe's and Onlook's exact funding; standalone 2026 ARR for v0, Bolt (post-$40M), and Builder.io; native PR creation by Locofy or Anima; explicit monorepo support by Locofy, Anima, or Subframe; any persistent rationale-bearing "design decision memory" feature in *any* product.
- **Disambiguations resolved:** paper.dev → paper.design; people.ai/people.dev → not a design tool (Backstory sales-intel + a canvassing app); pencil.dev → distinct from the ad-creative "Pencil" (trypencil.com, acquired 2023); Magic Patterns ≠ Magic Path; Galileo (UI tool) ≠ Galileo (AI-eval platform); Krea → media tool, not UI/UX.
- Third-party ARR estimates (Sacra, GetLatka/Latka, Tracxn) flagged as estimates inline; founder-stated user counts (Uizard 2M+, pencil 100K, Locofy 200K) noted as unaudited.
