# AntiProd Research Plan

## Purpose

This research exists to make one strategic decision: is AntiProd's current positioning defensible, and if so, what is the sharpest entry point? If not, what is the right pivot?

The report is primarily for the founding team making product and strategy decisions. It will also inform the investor pitch. It needs to be honest — if the idea has a problem, the research should surface it clearly and point toward a better direction.

---

## What We Are Building

AntiProd is a design OS — a unified environment for designers, design engineers, and product managers — that holds the knowledge, context, and memory of every design decision across a monorepo. It tracks interaction patterns (brand consistency, visual language, UX copy, component decisions) across the entire product, enforces consistency autonomously, and lets AI build and ship production-ready work from a feature brief. The output is not a Figma spec — it is a shipped pull request.

The three layers:
- **Knowledge layer** — living memory of all design decisions across the monorepo
- **Production layer** — design, code, and quality monitoring in one environment
- **Autonomous layer** — analytics feed AI that proposes and ships design improvements

The right analogy: Cursor for the design-to-production workflow.

---

## Competitor Framing Philosophy

A few well-funded competitors in a space is a validation signal — it confirms the problem is real and the market exists. The research should not fear competition; it should identify whether a defensible position exists that competitors don't occupy and can't easily reach in 12–18 months. If many competitors are solving the exact same problem in the exact same way, that's when to rethink. If only a few exist, the question is positioning, not viability.

---

## Research Dimensions (Every Agent Covers These)

1. **What the tool is and who it's for** — target user, use case, positioning
2. **Where the workflow starts and ends** — what it replaces, what it connects to
3. **Core features and differentiators**
4. **What pain points it addresses**
5. **What it explicitly doesn't do — the gaps**
6. **AI role** — generative assistant, autonomous agent, or none
7. **Collaboration model** — async, real-time, handoff-based
8. **Pricing model** — per seat, per project, enterprise tiers
9. **Near-future roadmap signals** — job postings, keynote language, changelog patterns, founder interviews, beta communications (with confidence level: confirmed / inferred / speculative)
10. **User sentiment** — what users praise, what they complain about publicly
11. **Strategic implications for AntiProd** — what this tool's existence means for AntiProd's positioning

---

## Agent Structure

| File | Agent | Scope |
|---|---|---|
| `01-figma.md` | Agent 1 | Figma — the incumbent. Features, Dev Mode, Make, FigJam AI, plugin ecosystem, user complaints, roadmap signals |
| `02-ai-dev-tools.md` | Agent 2 | Cursor, v0, GitHub Copilot, Replit Agent — where AI coding stops at the design boundary |
| `03-ai-design-tools.md` | Agent 3 | paper.dev, people.dev, pencil.dev, Magic Patterns, Magic Path, Framer AI, Galileo AI, Uizard — the new wave |
| `04-pm-project-tracking.md` | Agent 4 | Linear, Jira, Asana, Notion — how design work gets planned, tracked, and where context gets lost |
| `05-design-handoff-docs.md` | Agent 5 | Zeplin, Storybook, Supernova, Zeroheight, Chromatic — the handoff layer and why it's still broken |
| `06-no-code-design-to-production.md` | Agent 6 | Webflow, Framer, Builder.io, Plasmic — designers shipping without engineers |
| `07-graveyard.md` | Agent 7 | InVision, Adobe XD, Abstract, Avocode — what failed, why, and what it means for AntiProd |
| `08-adobe-sketch-interaction.md` | Agent 8 | Adobe (Firefly, Creative Cloud, failed Figma acquisition), Sketch decline, ProtoPie, Rive, Lottie |
| `09-community-job-market.md` | Agent 9 | Twitter/X, Reddit, ProductHunt, UX Tools annual survey, design engineer job postings, which companies have the role |
| `10-content-research.md` | Agent 10 | YouTube transcripts (Sneak Peek, Dive.club), Substack, design engineering blogs, the design engineer role discourse |
| `11-market-pricing-investors.md` | Agent 11 | Market sizing, pricing benchmarks across tools, recent funding rounds, VC writing on design tools |
| `12-synthesis.md` | Agent 12 | Gap map, defensibility analysis, entry point recommendation, pivot options if needed |
| `index.md` | (written after synthesis) | Full combined report — all findings in one narrative |

---

## Three Questions the Synthesis Must Answer

1. **Is AntiProd's position defensible?** Not "does competition exist" but "is there a meaningful gap that current players haven't closed and can't easily close in 12–18 months."
2. **If yes — what is the sharpest entry point?** Which layer (knowledge, production, or autonomous) creates the strongest initial lock-in and the clearest pitch?
3. **If no — what is the pivot?** Specific, well-reasoned alternative directions within the design space that the research actually surfaces, not generic suggestions.

---

## Honest Limitations

- **YouTube videos** cannot be watched directly. Research pulls from auto-generated transcripts where available, published episode summaries, articles referencing specific episodes, and Reddit/Twitter discussions about podcast content.
- **Competitor roadmaps** are often deliberately vague. Job postings and keynote language are more reliable signals than published roadmaps. All roadmap claims are tagged: **[Confirmed]**, **[Inferred]**, or **[Speculative]**.
- **Pricing** changes frequently. All pricing noted at time of research with the caveat that it may have changed.

---

## Effort Levels

- Agents 1–11: Opus 4.8, xhigh effort
- Agent 12 (synthesis): Opus 4.8, max effort
- plan.md and index.md: written directly, no agent needed

---

## Folder Structure

```
research/
├── plan.md                          ← this file
├── index.md                         ← full combined report (written last)
├── 01-figma.md
├── 02-ai-dev-tools.md
├── 03-ai-design-tools.md
├── 04-pm-project-tracking.md
├── 05-design-handoff-docs.md
├── 06-no-code-design-to-production.md
├── 07-graveyard.md
├── 08-adobe-sketch-interaction.md
├── 09-community-job-market.md
├── 10-content-research.md
├── 11-market-pricing-investors.md
└── 12-synthesis.md
```
