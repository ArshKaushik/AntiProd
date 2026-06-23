# Competitive Research: Figma

*Section 01 of the AntiProd competitive report. Researched June 2026. Roadmap claims are tagged [Confirmed], [Inferred], or [Speculative].*

---

## TL;DR for AntiProd

Figma is the default design canvas of the industry and, since 2025, an aggressively expanding **design-to-product platform**. It has stopped being "the design tool" and is openly trying to own the entire path from idea to shipped software — Figma Make can now generate working apps from prompts, edit a connected production codebase, and open GitHub pull requests. On paper this overlaps heavily with AntiProd's pitch ("output is a shipped PR, not a Figma spec").

But the overlap is shallower than it looks. Figma's center of gravity is still the **visual canvas and the individual designer**. Its code generation is widely reported as "div soup" — generic markup that ignores the design system, hard-codes values, and has to be rebuilt by engineers. It has no real concept of cross-repo design memory, decision history, or enforced consistency at the org level; it has a fragmented set of new products (Make, Sites, Buzz, Draw, Weave) bolted onto a canvas, not a unified design OS. Its monetization is seat-based and AI-credit-based, which biases it toward keeping humans in the loop on the canvas rather than automating them out of it.

**Where Figma stops and AntiProd starts:** Figma owns the artifact (the design file). AntiProd is betting on owning the *memory and the outcome* (the decision history across a monorepo, enforced consistency, and an AI that ships production code). Figma *can* move toward AntiProd's territory — it has the capital ($68B+ market cap post-IPO), the distribution, and an explicit "Agent Platform" hiring push — but it is structurally anchored to the canvas-and-seat model, and its code-quality reputation is its softest flank.

---

## 1. What Figma is and who it's for

Figma is a browser-based, real-time collaborative interface design tool. It launched in 2016 and won the market on two structural advantages competitors (then Sketch + InVision + Abstract) couldn't match: **multiplayer editing in the browser** (Google-Docs-style live collaboration on a design canvas) and **zero-install, OS-agnostic access**.

**Target users (in order of historical importance):**
- **Product / UX / UI designers** — the core seat.
- **Design engineers and front-end developers** — via Dev Mode (a paid add-on since Jan 2024).
- **Product managers** — increasingly via FigJam (whiteboarding) and now Figma's "idea-to-product" AI pitch.
- **Brand / marketing teams** — the newest target, via Figma Buzz and Figma Draw.

**Positioning shift.** Figma has deliberately repositioned from "design tool" to **"design-to-product platform."** At Config 2025, CEO Dylan Field framed the entire keynote around design as a *differentiator in an AI world* and the goal of helping teams "go from idea to production faster — all in one place." Chief Product Officer Yuhki Yamashita said the aim is to "make it possible for everyone to contribute meaningfully to the design and development process." This is a land-grab: Figma is trying to expand from the designer's seat into adjacent surfaces — web publishing (Sites), brand asset production (Buzz), illustration (Draw), motion (Weave/Modyfi acquisition), and app generation (Make).

**Scale / financial context (important for "can they move into our territory?"):** Figma IPO'd on the NYSE (ticker **FIG**) on 31 July 2025. Priced at $33 (~$19.3B implied valuation), it opened at $85 and closed near $115.50 for a ~$68B market cap — a ~250% first-day pop. FY2025 revenue was ~$1.06B (up ~41% YoY), net dollar retention ~136-139%, with 67 customers paying >$1M ARR. Translation: Figma has near-universal distribution among designers, enormous expansion revenue, and a war chest. It is not a startup AntiProd can out-spend; AntiProd has to out-position it.

---

## 2. Core features

- **Components & variants** — reusable UI elements with variant sets (states, sizes). The backbone of the design-system story.
- **Auto Layout** — flexbox-style responsive layout for frames. Powerful but historically fiddly; long-standing source of friction (see sentiment section).
- **Grid** — new responsive layout primitive announced at **Config 2025 [Confirmed]**; generates CSS in Dev Mode, explicitly to improve handoff.
- **Variables / tokens** — native variables system (color, number, string, boolean) supporting modes (e.g., light/dark, multi-brand). Aligns toward W3C design-token standards. "Extended collections" (Schema 2025) let a base design system be whitelabeled and themed by downstream teams.
- **Prototyping** — clickable, animated prototypes with interactions and transitions. Crucially: prototypes are *fake-data simulations* — no real APIs, auth, or backend.
- **FigJam** — collaborative whiteboard for brainstorming, diagrams, retros. Now AI-enhanced (see §3).
- **Dev Mode** — inspection/handoff workspace for engineers (see §5).
- **Branching / versioning** — branch-and-merge of design files (Organization tier and up), plus full version history. This is design-file version control, *not* code version control.
- **Newer surfaces (Config 2025) [Confirmed]:** Figma Sites (publish live websites), Figma Make (AI app/prototype generation), Figma Buzz (brand asset scaling), Figma Draw (vector illustration).

---

## 3. AI features — how far does it go?

This is the most strategically important section for AntiProd, because it's where Figma is moving toward AntiProd's territory.

**Figma Make** — the flagship AI product, launched in beta at Config 2025 (May 2025), built on **Anthropic's Claude (3.7 at launch)**. It turns a text prompt *or* an existing Figma design into a working, interactive prototype or web app. The arc of its development is the key signal:

- **May 2025:** prompt-to-prototype / prompt-to-app, but *structurally isolated* from the real software lifecycle — output lived inside Figma.
- **~May 2026 (limited beta) [Confirmed]:** **Figma Make now connects to a real codebase.** Two-way GitHub integration: import an existing Git repo into the Figma desktop app, open the running app inside Make *with real data*, make visual edits (select an element, change properties/layout/color/font, annotate, or describe a change in chat), the agent finds and edits the underlying code, and you can **create a branch and open a pull request without leaving Figma.** Edits flow through standard CI pipelines, security checks, and code review — "built-in governance."
- **Design-system linking [Confirmed]:** Make can link the component codebase to Figma design libraries; using the **Dev Mode MCP server + Code Connect**, agents pull real variables, components, and layout data so generated code reflects the actual design system, not just appearance. Configuration lives in a `.figma/make` folder at the repo root.

**So: can Figma's AI write code? Yes. Can it ship? Yes — it can open a PR into a real repo.** This is the headline that makes Figma look like a direct AntiProd competitor.

**But the reality, per hands-on reviews, is heavily qualified:**
- Generated output frequently **does not use design-system components**, **hard-codes colors**, **overrides system typography**, and writes manual CSS where it shouldn't — "appears acceptable from a distance but problematic from a system perspective" (LogRocket review).
- Code is reported as **"div soup"** — generic `<div>`s with no semantic structure or maintainable organization (UX Collective: *"Figma Make isn't ready for serious dev-handoff… the code output is messy and uses generic elements like div"*).
- **Poor autonomous decision-making:** asked to fix a radio button, Make silently replaced it with a select menu (LogRocket).
- **Scope is small:** reliable only for small sections / roughly one screen at a time, not high-volume multi-screen flows.
- Reviewers' consensus: **a strong starting point, not production-ready** — engineers still take the output, clean it up, and integrate it.

**Other AI features:**
- **FigJam AI** — generate templates/diagrams (flow, Gantt, org charts) from a prompt; auto-sort stickies into themes; summarize sticky clusters; Jambot for ideation. Based on OpenAI models. Bundled free into all paid seats since March 2025.
- **AI image generation / editing**, **auto-suggest** (contextual workflow cues), and **AI-powered search** across the Figma ecosystem (backed by a dedicated Search & Recommendations team — see §11).

**How far does Figma's AI go?** Far enough to generate and ship UI code, but its quality ceiling is low, its scope is narrow, and it has no concept of *persistent cross-project design memory* or *org-wide enforced consistency*. It's a code *generator* bolted onto a canvas, not a *system of record* for design decisions.

---

## 4. Design system capabilities

Figma's design-system story is genuinely strong and is its deepest moat:
- **Component libraries** published org-wide; **team libraries** shared across files.
- **Variables + modes** for theming and multi-brand.
- **Extended collections** (Schema 2025) for whitelabel → themed downstream systems — directly targeting large multi-team / multi-brand orgs.
- **Branching/merging** of design-system files (Org tier+).
- Movement toward **W3C design-token standard** import/export.

**The gaps (where plugins and external tooling live):**
- **Figma variables don't auto-sync to code.** You need a pipeline (Tokens Studio, Style Dictionary, custom CI). This is the structural seam: design tokens and code tokens drift.
- **Token sprawl** — large systems devolve into "a confusing, endless list of variables" with no clear blast-radius visibility for a change.
- **No native enforcement** — Figma can *offer* a library but can't *prevent* a designer from detaching a component, pasting a raw hex, or overriding a token. Consistency is a convention, not a guarantee. (This is precisely the "enforce consistency" gap AntiProd targets.)

---

## 5. Developer handoff — Dev Mode specifically

**What Dev Mode does:**
- A dedicated inspection workspace (separate paid seat, ~$35/seat/mo when introduced Jan 2024 — a controversial move).
- Inspect spacing, sizing, colors, typography; copy CSS / Swift / XML; export assets.
- Surface variable/token names and component info.
- **Code Connect** — map a Figma component to its real code component so engineers see the *actual* code snippet, not a Figma-generated guess.
- **Dev Mode MCP server [Confirmed]** — a local service exposing the file's structured contents (node tree, variants, layout constraints, tokens, asset refs) over Model Context Protocol to agentic IDEs (Cursor, VS Code Copilot, Windsurf, Claude Code). This is Figma's big bet on AI-assisted handoff: feeding *structured* design context to a coding agent instead of a screenshot.

**What Dev Mode does NOT do — what engineers still do manually:**
- **Exports only visual properties** — CSS/spacing/color. **No JavaScript, no logic, no state, no interactions.**
- A layer named "Frame 123" becomes a meaningless `<div>`; engineers must **rename, restructure, and add semantic HTML** themselves.
- **Token/variable name mismatches** between Figma and the codebase create manual mapping work; a detached variable shows a raw value, breaking the mapping.
- **Missing specs** — error states, hover states, edge cases, responsive behavior at breakpoints are frequently absent, so engineers **make their own decisions that often diverge from intent.**
- **Code Connect requires real upfront and ongoing effort** — someone must author and maintain the mappings; Schema 2025's new Code Connect UI + AI suggestions reduces but doesn't eliminate this.
- Forrester / Figma's own data cited in reviews: poorly set-up handoff still costs **8-16 hours of engineering time per screen**, and **62% of developers report redoing work due to handoff communication gaps.**

**Bottom line:** Dev Mode improves *inspection and context*, but the *translation from design artifact to maintainable production code is still a human engineering job.* That gap is the entire premise of design-to-code startups — and of AntiProd.

---

## 6. Collaboration model & friction points

Figma's real-time multiplayer canvas is best-in-class for *designer-to-designer* and *designer-to-PM* collaboration (comments, live cursors, shared libraries, FigJam). The friction is at the **designer ↔ engineer boundary:**

- **Mental-model mismatch:** designers think in *screens*; engineers think in *components* (a "User Profile Card" is, to an engineer, an Avatar + Typography + Button variant + Container). Every handoff is a translation.
- **Naming mismatch:** if Figma component names ≠ codebase component names, there's no reliable mapping. Code Connect exists to fix this but must be maintained.
- **Design drift:** the live product slowly diverges from the design files — engineers make undocumented decisions, designers make changes that never reach the repo. *"Design system drift is usually a collaboration problem wearing a tooling costume."*
- **Token drift:** deadline hex-pastes get hard-coded in code; a later brand change misses the local values; nobody owns keeping both environments in sync.
- **No system of record for *why*:** Figma stores *what* the design is, not *why* a decision was made. Decision rationale lives in Slack, comments, docs, and people's heads — exactly the "memory of every design decision" AntiProd wants to own.

---

## 7. Plugin ecosystem (i.e., a map of Figma's gaps)

The most-used plugins reveal what Figma doesn't do natively:
- **Tokens Studio** — multi-file token management and direct sync with code repos. Exists because *Figma variables don't sync to code.*
- **Zeplin / Anima / Locofy / Builder.io** — design-to-code handoff and code export. Exist because *Figma's native code output is incomplete or low-quality.*
- **Magician, UX Pilot, Lummi** — AI content/image/copy generation. Some now overlap with Figma's own AI.
- **ColorWell, Neaticons, contrast/accessibility checkers** — color systems, icon management, a11y.

Each major plugin category is a documented native gap: **code sync, production-quality handoff, accessibility enforcement, advanced token management.** Figma is steadily absorbing some of these (native variables, Dev Mode, Make), which has historically pressured plugin makers — a pattern AntiProd should expect Figma to repeat against any adjacent tool that gains traction.

---

## 8. What Figma explicitly cannot do (hands off to other tools)

- **Real data / backend / auth** — prototypes use fake data; you can upload a static CSV but not connect live APIs, databases, or auth. Real apps need real data to test real flows.
- **Application logic** — no JS/business logic export from Dev Mode; logic, state management, and integration are rebuilt by engineers.
- **Maintainable production code at scale** — Make's output is small-scope and reportedly messy; large multi-screen, system-compliant code generation is not there.
- **Enforced org-wide consistency** — Figma offers libraries; it cannot prevent detaching/overriding. No hard guardrails.
- **Cross-repo / monorepo design memory** — Figma is file-centric. It has no concept of a persistent decision graph spanning an entire codebase.
- **Owning the shipped outcome** — even with Make's PR feature, the *engineering responsibility* for correct, maintainable, integrated code remains outside Figma.

These hand-offs go to: coding agents/IDEs (Cursor, Claude Code, Copilot), design-to-code tools (Anima, Locofy, Builder.io), token pipelines (Tokens Studio, Style Dictionary), and ultimately human engineers.

---

## 9. User sentiment — praise and complaints

**Praise:** real-time multiplayer collaboration; browser-based/no-install; the standard everyone already knows; strong component/variable system; FigJam for cross-functional work. The broad consensus even among critics is that "Figma's utility justifies its price tag."

**Complaints (the louder, more recent the better for AntiProd's framing):**
- **UI3 redesign backlash (2024-25):** intrusive floating panels overlapping the canvas, relocated essential features, more clicks for common actions (clipping, applying auto layout). A visible "shift in online discourse" from universal praise to "critical side-notes."
- **Pricing resentment:** price hikes hit freelancers hardest (a seat per client); **Dev Mode becoming paid (Jan 2024, ~$35/seat/mo)** is a sore point because engineering teams outnumber designers, raising total cost of adoption.
- **Bloat / "becoming Adobe" fear:** the (failed) Adobe acquisition stoked fears Figma would get "bloated and slow." Post-failed-deal, the rapid surface-area expansion (Sites/Make/Buzz/Draw/Weave) feeds a perception that Figma is sprawling rather than deepening.
- **AI/competitive anxiety:** **Penpot** (open-source) jumped to 600K+ users on the Adobe-deal backlash; AI builders like **Vercel v0** and **Framer** let non-designers ship UI without a design tool at all. Pieces with titles like *"The Rise and Possible Fall of Figma"* and *"The Death of Figma and Prototyping in the Age of LLM"* are circulating — sentiment is *unease, not exodus* (Figma still dominates surveys).
- **Handoff frustration (engineers):** the perennial "designs don't translate cleanly to code" complaint persists despite Dev Mode.
- **Make's code quality:** "buggy, clunky," "div soup," makes unrequested changes — see §3.

**Net:** Figma is still loved and dominant, but the moat-feeling has cracked: pricing fatigue, UI backlash, sprawl anxiety, and a real existential question about whether design tools matter when LLMs can generate UI directly. This is the emotional opening AntiProd can speak to.

---

## 10. Pricing

Seat-based, with three seat types (Full, Dev, Collab) and four tiers:

| Tier | Price (billed annually) | What you get |
|---|---|---|
| **Starter (Free)** | $0 | Up to 3 design files + 3 FigJam boards, unlimited viewers. |
| **Professional** | ~$12-16/editor/mo ($15-16 monthly) | Unlimited files, version history, team libraries. |
| **Organization** | ~$45/editor/mo ($55 monthly) | Advanced design systems, **branching/merging**, org-wide libraries, private plugins, centralized admin/billing. |
| **Enterprise** | Custom (~$90/full seat/mo cited) | SSO, SCIM, advanced security, analytics, guest controls, 24/7 support, SLAs. |

- **Seat types:** Full seat (full design + Dev Mode + systems), **Dev seat** (inspection-focused), Collab seat (commenting/basic collab). Viewers are free.
- **Gated behind paid:** unlimited files (Pro+), branching/merging + extended collections + private plugins (Org+), SSO/security/analytics (Enterprise).
- **Figma Make** is for **Full seats on paid plans** (~$16 Pro → ~$90 Enterprise per month range), and AI features increasingly run on a **credit/consumption** model (a growing revenue line per Q1 FY2026 commentary).

**Strategic read:** Figma's economics reward *more human seats on the canvas* and *AI credits consumed inside Figma*. That's a structural reason it will keep humans on the canvas rather than fully automating the path to a PR — a contrast with an outcomes-priced "ship a PR" model.

---

## 11. Near-future roadmap signals (12-18 months)

**[Confirmed]**
- **Figma Make → production codebase loop.** Direct visual editing of a connected repo + branch/PR creation shipped to limited beta (~May 2026). This is the clearest signal of intent to own design→ship.
- **Dev Mode MCP server + Code Connect UI** with AI mapping suggestions — Figma is standardizing on MCP to feed structured design context to coding agents.
- **Platform surface expansion** via acquisitions: **Modyfi** (motion/vector), **Payload** (headless CMS / app framework — notable: this is *backend/app infrastructure*), **Weavy → Figma Weave** (AI image/video/motion). Buying Payload especially suggests ambitions beyond the canvas into app-layer/dev infrastructure.
- **FigJam AI, AI image gen, auto-suggest, AI search** bundled into paid seats.

**[Inferred]** (from job postings — strong signal of build direction)
- **Agent Platform team:** "builds the frameworks and systems powering **agentic AI features** throughout Figma's products." → Figma is building *agents*, not just generators. Expect more autonomous, multi-step AI in Make and across the suite.
- **Modeling Platform team** + dedicated **AI Research team** → in-house model training/eval/serving; less pure dependence on third-party LLMs over time.
- **Search & Recommendations team** → "context-gathering for agents… surfacing content across the Figma ecosystem" with "modern agentic search." → a cross-product context/memory layer is being built (relevant to AntiProd's "design memory" thesis — Figma may be heading there).
- Figma CEO publicly framing AI as *expansionary* ("hiring in response to AI, not cutting"), signaling continued aggressive product velocity.

**[Speculative]**
- Figma likely pushes Make from "one screen, messy code" toward **multi-screen, design-system-compliant, semantic code** — directly attacking the div-soup criticism. If they crack code quality + scope, the overlap with design-to-code/AntiProd narrows fast.
- A **cross-project "design memory"/decision-context layer** could emerge from the Search & Recommendations + Agent Platform work — the area AntiProd considers its differentiator.
- Continued **monetization via AI credits/consumption** rather than pure seats, partially de-risking the seat-fatigue complaint.
- Deeper **Payload integration** could let Figma touch *backend/app logic*, the thing it explicitly cannot do today.

---

## 12. Strategic implications for AntiProd

**Where Figma stops and AntiProd starts:**

1. **Artifact vs. memory.** Figma owns the *design file* — the what. AntiProd's wedge is the *why and the across*: persistent memory of every design decision across a monorepo (brand, visual language, UX copy, component choices). Figma has no system of record for decision rationale or cross-repo consistency; its decision context evaporates into Slack and comments. *This is AntiProd's strongest, most defensible difference today.*

2. **Suggestion vs. enforcement.** Figma can offer a library; it cannot *enforce* consistency (detaching, hex-pasting, overrides are all allowed). AntiProd's "enforce consistency" promise is a category Figma structurally does not occupy.

3. **Generated code vs. shipped, maintainable PR.** Figma Make *can* open a PR, but its code is widely panned as div-soup, off-system, small-scope. AntiProd's "production-ready code from a feature brief" must clear the bar Figma visibly fails: semantic structure, design-system compliance, multi-screen scope, maintainability. **The quality and scope of generated code is the battleground — and currently Figma's softest flank.**

4. **Canvas-centric vs. monorepo-centric.** Figma starts from the visual canvas; AntiProd starts from the codebase/monorepo. Figma is retrofitting code into a canvas product (`.figma/make` config, MCP, Code Connect mappings that someone must maintain). AntiProd can be code-native from day one — no design-file-to-code translation seam.

5. **Designer seat vs. unified team.** Figma's economics reward more human seats and AI credits *on the canvas*. AntiProd's "unified environment for designers, design engineers, and PMs" with a ship-the-PR outcome is a different unit of value (outcomes, not seats).

**Can Figma easily move into AntiProd's territory?**
- **Capability/capital: yes-ish.** Figma has $68B+ valuation, near-universal distribution, an explicit Agent Platform + AI Research + Search/Recommendations build-out, and the Payload acquisition reaching toward app infrastructure. It is the most credible incumbent threat.
- **But there are real structural anchors slowing it:** (a) **code-quality reputation** is poor and hard to fix because the canvas-first data model produces semantically thin output; (b) **seat/credit monetization** biases toward keeping humans on the canvas, not automating to a PR; (c) **product sprawl** (Make/Sites/Buzz/Draw/Weave) is breadth, not the unified, opinionated, memory-backed depth AntiProd is going for; (d) **no decision-memory layer** exists yet — it's at best inferred from job posts, not shipped.

**Recommended posture for AntiProd:**
- **Lead with what Figma cannot do:** cross-repo design memory, enforced consistency, and *maintainable, system-compliant, shippable* code — not "another way to draw screens."
- **Treat Figma as an input, not an enemy.** Interop via the **Dev Mode MCP server + Code Connect** lets AntiProd consume Figma context rather than replace the canvas; designers keep their beloved multiplayer canvas while AntiProd owns the memory + ship layer they currently lack.
- **Watch two signals closely:** (1) Figma Make's code quality/scope improving toward design-system-compliant multi-screen output; (2) any "design memory / agentic context" feature emerging from the Search & Recommendations + Agent Platform teams. Either would directly contest AntiProd's differentiation — the second more than the first.

---

## Sources

- [Config 2025 Launches — Figma Blog](https://www.figma.com/blog/config-2025-press-release/)
- [Are designers the new SWEs? Figma Make's two-way GitHub integration — VentureBeat](https://venturebeat.com/technology/are-designers-the-new-swes-figma-makes-new-two-way-github-integration-turns-designs-into-live-production-code-with-built-in-governance)
- [Figma Make's GitHub Integration Enhances Design Governance — Welcome.AI](https://www.welcome.ai/content/figma-makes-github-integration-enhances-design-governance-for-teams)
- [Figma Make, Now on Your Local Code — Figma Blog](https://www.figma.com/blog/figma-make-now-on-your-local-code/)
- [Make in your local codebase — Figma Help Center](https://help.figma.com/hc/en-us/articles/40775535020695-Make-in-your-local-codebase)
- [I tried Figma Make — what it gets right and what's still broken — LogRocket](https://blog.logrocket.com/ux-design/figma-make-review/)
- [Is Figma Make ready for dev-handoff? — UX Collective](https://uxdesign.cc/is-figma-make-ready-for-dev-handoff-9fe2594630e3)
- [Introducing our Dev Mode MCP server — Figma Blog](https://www.figma.com/blog/introducing-figma-mcp-server/)
- [Guide to Dev Mode — Figma Help Center](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)
- [Figma Dev Mode: Everything Developers Need to Know — Designilo](https://designilo.com/2025/07/08/figma-dev-mode-everything-developers-need-to-know/)
- [Code Connect — Figma Help Center](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect)
- [The Right Code for Your Design System (Code Connect) — Figma Blog](https://www.figma.com/blog/introducing-code-connect/)
- [Schema 2025: Design Systems For A New Era — Figma Blog](https://www.figma.com/blog/schema-2025-design-systems-recap/)
- [Guide to variables in Figma — Figma Help Center](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
- [Figma Design System Drift: Why Components and Code Diverge — Figr](https://figr.design/blog/figma-design-system-drift)
- [The Gap Between Figma and Production — DEV Community](https://dev.to/lewisnewman24/the-gap-between-figma-and-production-why-handoff-fails-and-how-design-systems-fix-it-4ma9)
- [Introducing AI to FigJam — Figma Blog](https://www.figma.com/blog/introducing-ai-to-figjam/)
- [FigJam AI — Figma](https://www.figma.com/figjam/ai/)
- [Plans & Pricing — Figma](https://www.figma.com/pricing/)
- [Figma Pricing Guide — CloudEagle](https://www.cloudeagle.ai/blogs/figma-pricing-guide)
- [The Rise and Possible Fall of Figma — The Cursor Mag](https://thecursormag.substack.com/p/the-fall-of-figma)
- [Adobe Buys Figma for $20B and Pisses Off the Designer Community — Eleken](https://www.eleken.co/blog-posts/adobe-buys-figma)
- [Figma IPO Tops $58 Billion Valuation — The Motley Fool](https://www.fool.com/investing/2025/08/02/figma-ipo-tops-58-billion-valuation-is-it-worth-th/)
- [Figma revenue, valuation & funding — Sacra](https://sacra.com/c/figma/)
- [Figma CEO: We're Hiring in Response to AI, Not Cutting — Entrepreneur](https://www.entrepreneur.com/business-news/figma-ceo-were-hiring-in-response-to-ai-not-cutting/498505)
- [Software Engineer, AI Platforms at Figma — Greenhouse](https://job-boards.greenhouse.io/figma/jobs/5691886004)
- [Prototyping with Figma AI — Builder.io](https://www.builder.io/blog/figma-ai-prototyping)
