# Design Handoff & Documentation Layer — Competitive Research

*Research section for AntiProd competitive report. Focus: the tools that sit between design and engineering, and why this layer remains broken after 10+ years of attempts to fix it.*

---

## Executive summary

The design-to-engineering handoff is one of the most-attacked problems in product tooling, and yet "the handoff is broken" remains the **#1 recurring complaint of design and engineering teams in 2026**. A decade of tools — Zeplin, Storybook, Chromatic, Supernova, Zeroheight, Token Studio, Style Dictionary, Specify — each solved a real slice of the problem, but the slice they each automate sits *downstream of where the divergence actually originates*. The category has not been "solved" because the underlying failure is not primarily a tooling problem. It is a **two-sources-of-truth problem** wrapped in a process problem wrapped in a cultural problem:

- **Two sources of truth.** Designers' truth lives in Figma. Engineers' truth lives in code. Every handoff tool is a *translation layer* between them, and translation layers drift the moment either side changes. No translation tool can prevent drift because neither side owns the other.
- **The spec is incomplete by construction.** Figma files show the happy path. Edge cases, error/empty/loading states, responsive behavior, and interaction logic are decided *during* engineering, not before it. The "handoff" hands off a partial spec and pretends it is complete.
- **It's cultural.** Designers think the mockup is the product; engineers know the product lives in code. The two disciplines have different definitions of "done."

The strategic punchline for AntiProd: the winning move is not a *better bridge* between two sources of truth — it's collapsing them into **one source of truth (the code/PR), with design decisions captured as durable, queryable knowledge, and AI enforcing consistency at the point of code generation.** Every incumbent in this report is structurally a bridge. That is the gap.

---

## The central question, answered up front

> **Why, after 10+ years of handoff tools, is the design-engineering gap still the #1 complaint?**

Synthesizing across every tool and source below, the answer is layered:

1. **Tooling problem (~30%).** Tokens don't auto-sync to code; Figma components and Storybook components drift; documentation goes stale; no tool *enforces* consistency, they only *display* it.
2. **Process problem (~40%).** "Handoff" is a waterfall gate dressed as agile. A static file is "a dead document the second it's handed off" ([Webdesigner Depot](https://webdesignerdepot.com/the-designer-developer-handoff-is-still-broken-why/)). Governance — ownership, accountability, who fixes drift — is "the hardest layer to build because there's no tool that implements it for you" ([YapLabs](https://yaplabs.com/blog/2025-07-15-rethinking-design-systems/)).
3. **Cultural problem (~30%).** Designers think spatially/visually; engineers think structurally/logically. The hybrid roles that bridge it (UX engineers, design technologists) are "rare, expensive, and overbooked."

Tooling can only ever fix its 30%. That is why the category never closes: each new tool optimizes the translation step while the spec gap and governance gap — the actual sources of rework — remain untouched.

---

## STORYBOOK (deep focus)

### What it is / who it's for
Storybook is the de-facto industry standard for **component documentation and isolated component development** — an open-source workshop where engineers build, view, and test UI components in isolation from the app. Used by virtually every serious design system (it ships with its own design system on GitHub: `storybookjs/design-system`). Audience: front-end engineers and design-system teams.

### The original pitch / problem
Build and document UI components *in isolation*, decoupled from app state and routing, so you can develop every state of every component, catch edge cases, and produce living documentation that doesn't rot the way a static wiki does.

### How it works in practice
Engineers write "stories" — small files declaring a component in a specific state with specific props. Storybook renders these in a browsable catalog. Storybook 9 (released July 2025) folded testing in directly: **Storybook Test** (a Vitest partnership) runs Interaction, Accessibility, and Visual tests across all stories from a test widget with watch mode; the build is 48% leaner; it added Svelte 5 and React Native support and a Vite-powered Next.js plugin ([Storybook 9 blog](https://storybook.js.org/blog/storybook-9/); [InfoQ](https://www.infoq.com/news/2025/07/storybook-v9-released/)).

### What it does well
- **Component isolation** — develop and review every state without spinning up the whole app.
- **Living documentation** that runs the real component (not a screenshot).
- **Testing surface** — interaction/a11y/visual tests in one place as of v9.
- **Huge ecosystem** — addons, framework support, and Chromatic for visual regression.

### Where it breaks down
- **Maintenance burden.** "Maintaining stories for every state a component can be in can be extremely time-consuming as an application grows" ([Lemon.io](https://lemon.io/answers/storybook/what-are-the-disadvantages-of-storybook/)). Stories are *extra code that must be kept in sync with the component* — a second artifact to maintain.
- **Setup & config overhead.** "The abundance of configuration options can make Storybook tough to set up"; upgrades and framework compatibility regularly break configs ([Chak Shun Yu](https://www.chakshunyu.com/blog/practical-overview-storybook/)).
- **Isolation is a double-edged sword.** Components "execute in isolation from the context of the main application, which can lead to differences in styling or functionality once composed" — i.e., a component that looks right in Storybook can render wrong in the real app.
- **It's a dev tool, siloed from design docs.** Historically "many designers avoid using it entirely" ([Supernova](https://www.supernova.io/blog/storybook-for-designers-why-its-more-than-just-a-dev-tool)).

### The Storybook ↔ Figma drift (the core gap)
This is the crux. A Storybook component (code truth) and a Figma component (design truth) are **two separate sources of truth kept in sync by human diligence**. As teams grow, "design and code start drifting apart as each team has different priorities and standards"; maintaining a 1:1 relationship is "resource-intensive and often impractical" ([Anima](https://www.animaapp.com/blog/industry/what-is-the-single-source-of-truth-storybook-or-figma/)). Tools that "link a design tool component to its Storybook story" close the *navigation* loop but not the *consistency* loop — the two artifacts still drift. A growing 2025–2026 camp argues for inverting the flow: build in code/Storybook first, then *generate* the Figma library from code so design reflects production ([YapLabs](https://yaplabs.com/blog/2025-07-15-rethinking-design-systems/); [Medium/Joshua Hall](https://medium.com/design-bootcamp/rethinking-design-systems-when-code-becomes-the-source-of-truth-e535646d01fc)).

### Chromatic's role
Chromatic is the commercial visual-testing + review cloud built by Storybook's maintainers. It snapshots every story and flags unintended visual changes before they ship, adds accessibility/interaction checks, and provides a review workflow. Pricing is **snapshot-volume based: free for open source, ~$149/mo entry paid tier**, scaling $100–$400/mo for small teams and $60K–$180K/yr for enterprise ([Chromatic pricing](https://www.chromatic.com/pricing); [Vendr](https://www.vendr.com/marketplace/chromatic)). Chromatic is how teams *enforce* that Storybook stays visually correct — but it enforces against the *code* baseline, not against Figma. The Figma-to-code gap is still unguarded.

### AI / automation roadmap
Storybook is leaning into agentic dev: **agentic setup** that configures Storybook and writes an initial set of stories; a **Storybook MCP server** giving AI agents ongoing access to component docs, story generation, and tests; and a **Storybook AI addon** that generates stories from React components and answers questions about them ([Storybook AI docs](https://storybook.js.org/docs/ai); [storybook.js.org/ai](https://storybook.js.org/ai)). Direction: Storybook as the *context layer* AI agents read to understand a component library. [Confirmed: MCP server, agentic setup, AI addon shipped. Inferred: deeper auto-story-generation and test-authoring. Speculative: Storybook becoming the canonical runtime "ground truth" that design tools sync *from*.]

### User sentiment
Praise: indispensable for component-driven teams, the testing consolidation in v9 is widely welcomed, ecosystem is unmatched. Complaints: maintenance overhead ("too much work to keep stories current"), brittle upgrades/config, isolation-vs-reality mismatch, overkill for small teams, and designer non-adoption.

### Strategic implications for AntiProd
Storybook is **table stakes and an ally, not a target.** It is where component truth lives in code, and its MCP server is exactly the kind of structured context AntiProd's AI should consume. The opportunity AntiProd should own: **keeping the Storybook component and the Figma component from drifting in the first place** — by making the code/PR the single source and generating/validating design artifacts from it, and by capturing *why* a component looks the way it does (the design decision) as queryable knowledge rather than a story file someone forgot to update.

---

## ZEPLIN (deep focus)

### What it is / who it's for
Zeplin is the **original dedicated design handoff tool** (founded 2014, San Francisco). Designers "publish" finalized designs from Figma/Sketch/Adobe XD into Zeplin, creating a locked, clean, organized space where developers inspect specs, grab measurements, colors, assets, and generated code snippets.

### Why it was the standard before Figma Dev Mode
Before Dev Mode, design files were *editing* environments, not handoff environments. Zeplin gave engineers a **stable, versioned, locked spec** — no risk of inspecting a half-finished frame, clean organization by screen/flow, and auto-generated measurements/specs. For years this was the cleanest way to hand off.

### What happened after Figma Dev Mode
Figma introduced Dev Mode (made paid early 2024) — an inspection panel *inside* the same live file designers work in, showing measurements, resolved token values, and code. This attacked Zeplin's core value directly. The impact was concrete: in **August 2023 Zeplin laid off ~35% of staff (~37 people)**, citing "intensifying competition from collaborative design tools like Figma" and "a reported loss of customers" ([SF Standard](https://sfstandard.com/2023/08/30/san-francisco-software-startup-lays-off-one-third-of-workforce/); [Silicon Valley Journals](https://siliconvalleyjournals.com/san-francisco-software-startup-zeplin-laying-off-one-third-of-employees/)). Headcount fell from ~144 (2023) to ~91 (2026).

### Does Zeplin still have a defensible position?
A narrow one. Zeplin's pitch is now "the no-brainer **alternative** to Dev Mode" ([zeplin.io](https://zeplin.io/why-zeplin/dev-mode-alternative/)). Its defensible niche: teams that want a **formal handoff gate** — "design is locked, now development begins" — where a separate, clean, multi-tool (Figma + Sketch + XD) handoff space is cleaner than Figma's in-file toggle. In mid-2025 Zeplin launched an **official MCP server** to feed AI agents directly from Zeplin projects — a credible bid for relevance in the agentic era ([LogRocket](https://blog.logrocket.com/ux-design/zeplin-design-handoff-figma-dev-mode/)). Reported revenue actually grew ($32.5M in 2023 → $51.9M in 2024 per getLatka), suggesting a profitable retreat into a loyal enterprise base rather than a death spiral. Not acquired as of 2026.

### Pricing / AI / roadmap
Seat-based tiers with a free entry level; enterprise custom. AI: the 2025 MCP server is the headline AI move. Roadmap: [Confirmed] MCP/agent integration; [Inferred] doubling down on the "formal gate" enterprise niche and multi-source (Figma/Sketch/XD) support as its remaining moat; [Speculative] long-term squeeze as Figma's Dev Mode + MCP + Code Connect absorb the handoff workflow entirely.

### Strategic implications for AntiProd
Zeplin is the **cautionary tale of the bridge model**: a clean, beloved translation layer that got structurally squeezed the moment the platform that *owns one source of truth* (Figma) extended into its lane. AntiProd should not build a prettier handoff gate — it should make the gate obsolete by integrating design context directly into the PR.

---

## SUPERNOVA (deep focus)

### What it is / who it's for
Supernova (founded 2016, Prague; YC W19; ~50 employees) is a **design system management platform**: it connects Figma to code, manages tokens, publishes documentation, and automates multi-platform code generation. By 2026 it has rebranded hard around AI: "Design & engineering context, ready for AI agents."

### Original pitch / how it works
The founding pain was the design-to-code handoff: changing a brand color across a codebase "would take months manually" — Supernova automates the cascade ([TechCrunch, Nov 2022](https://techcrunch.com/2022/11/16/supernova-wants-to-make-it-easy-to-transfer-design-changes-to-code-bases)). Workflow: pull styles/variables from Figma (Figma stays authoritative — tokens *cannot* be edited inside Supernova); transform them via "Exporters" + "Pipelines" into production code (CSS/SCSS/JSON, Swift, Android XML, plus React/RN/Flutter/SwiftUI/Compose component code); auto-open PRs across repos when, e.g., a new icon is added; and publish no-code documentation portals (custom domains, embedded tokens/components/Storybook).

### What Supernova does that Figma does NOT
- **Automated multi-platform production code-gen + repo delivery** (auto-PRs across React/iOS/Android repos). Figma's Code Connect maps to *existing* snippets; it doesn't generate/transform/ship code.
- **Rich standalone documentation hubs** (Okta's Odyssey, Firefox's Acorn run on it) far beyond Dev Mode inspect.
- **A centralized AI/MCP context layer** spanning design + code + docs across Cursor/Claude/Copilot/Windsurf.
- **Multi-brand token transformation** into many platform formats from one source.

### Is Supernova solving the right problem?
This is the strategic tension. Figma's Dev Mode, Code Connect, and native Variables increasingly own the handoff Supernova was founded on — and Figma controls the source of truth Supernova depends on, structurally relegating it to a **downstream sync/transform layer.** Supernova's hedge is its 2026 pivot to the **AI-agent context/code-delivery layer** ("your AI agents are only as good as the context you give them"). Smart, defensible-adjacent — but contested by Figma's own MCP, Tokens Studio, Zeroheight, Storybook, and Style Dictionary all crowding in.

### Where it breaks down
Setup "takes days, not hours" (token mapping + exporter config + doc structure, often needing a dedicated expert); the structured editor "adds friction for casual contributors"; no component inspect; publish-to-preview friction; thin docs/community vs Zeroheight; and a pricing cliff. Crucially, code-gen output is "starter code," not finished components.

### Adoption / funding
Growing. Customers: Mozilla, Okta, Paramount, Skyscanner, Air France/KLM, Carlsberg, Kraft Heinz, Medibank, Genesys, Mews, Celonis. Funding: **$4.8M seed (Nov 2022, Wing VC); $9.2M Series A (Sept 2025, Taiwania Capital); ~$22–25M total.** G2 4.5/5 but only ~4 reviews — positive but thinly evidenced.

### Pricing
Free (≤5 seats, 1 design system, limited automation/AI credits); Pro ~$35/full seat/mo; Enterprise custom (SSO, SOC2/ISO, approval workflows, behind-VPN codebase). Critique: free-to-enterprise jump, no real mid-tier.

### Strategic implications for AntiProd
Supernova validates the demand (production code-gen, deep docs, AI context) *and* demonstrates the trap: building on top of Figma as a sync/transform layer leaves you structurally downstream of a platform expanding into your territory. AntiProd's differentiation: own the **code/PR as the source of truth and the knowledge base of decisions**, rather than being a transform layer over Figma's source of truth.

---

## ZEROHEIGHT

### What it is
The leading **design system documentation platform** — a polished, no-code site builder for design system docs that pulls from Figma and Storybook. More mature docs/templates than Supernova; the documentation specialist of the category. Also publishes the influential annual **Design Systems Report**.

### AI features (notable)
Zeroheight has gone deep on AI for 2026: **Build with AI** (generate structured doc drafts), **Improve with AI** (refine), and the **zeroheight Assistant** (surfaces gaps, prioritizes updates). It scans the whole system to flag redundant components and accessibility violations, and — most relevant to the drift problem — **proactively notifies teams when design tokens in Figma deviate from CSS variables in GitHub** ([zeroheight AI](https://zeroheight.com/ai/); [What's New](https://zeroheight.com/whats-new/direct-ai-access-to-your-design-system-documentation/)). It also exposes design system docs directly to AI agents as context.

### Key data point on the real problem
Zeroheight's own Design Systems Report finds that **for the fifth consecutive year, "driving adoption and raising awareness" is the #1 challenge** — "the tools and components exist, but getting people to use them consistently is another matter entirely" ([report.zeroheight.com](https://report.zeroheight.com/)). This is the clearest external confirmation that the bottleneck is *adoption/governance*, not documentation tooling.

### Pricing / sentiment / implications
Seat-based pro tiers + bespoke enterprise (SSO, data residency). Praised for polish; the limitation is that **better documentation does not produce better consistency** — docs are descriptive, not enforcing. For AntiProd: drift *detection* (Zeroheight's token-deviation alert) is one step ahead of the rest, but it still only *notifies*; AntiProd should *prevent and auto-fix* drift in the PR.

---

## THE DESIGN TOKEN INFRASTRUCTURE LAYER

### How tokens are actually managed end-to-end
The real-world pipeline: designer authors variables/tokens in Figma (often via **Tokens Studio** for richer semantics) → tokens exported as JSON (increasingly W3C DTCG format) → committed to Git → **Style Dictionary** transforms JSON into CSS/Sass/JS/iOS/Android → published as an npm package or PR → developers consume. Figma's own design-systems team ships a GitHub Action that auto-PRs Figma Variables → CSS.

### Token Studio (Tokens Studio for Figma + Studio platform)
The dominant Figma token plugin (~345k users), now run by Dutch company HYMA. Lets teams store tokens as JSON with aliasing/theming richer than native Figma variables, and sync to GitHub/GitLab/Azure. HYMA is expanding into a web **Studio platform** (logic-first, branching/versioning, CI/CD-to-code, a node-based **Graph Engine** for generative palettes) and advertises **MCP access on every tier** — positioning tokens as AI-agent context. Pain points (heavy GitHub-issue traffic): performance on large libraries, GitHub/Azure sync failures, oklch bugs, data-loss bugs, confusing UI, and pricing friction. Pricing: no free tier; Starter Plus €17/mo → Essential €169/mo → Org €499/mo → Enterprise custom.

### Style Dictionary
Amazon's open-source (Apache-2.0) build system turning token JSON into platform outputs (~485k weekly npm downloads — the ecosystem standard; v5.5.0, June 2026). Critically, **since Aug 2023 the Tokens Studio team are the primary maintainers** — so the two leading token tools are now under one steward. v4/v5 added ESM, browser support, async hooks, and first-class DTCG support. Pain points: steep learning curve, unclear examples, config complexity, and heavy reliance on third-party packages (SD-Transforms, utils) for common tasks. Code-side only — does nothing for design-side authoring/sync.

### Specify — SHUT DOWN
Specify (specifyapp.com), the VC-funded standalone token *platform* with its own SDTF format and bidirectional "code as source" sync, **sunset on Oct 25, 2024**: "These are some of the hardest words I've had to write as a founder… We're going to sunset Specify" ([Specify blog](https://specifyapp.com/blog/specify-design-token-format)). It is the category's cautionary tale: a well-funded standalone token platform that failed commercially while the open-source layer (Style Dictionary) and the Figma-attached plugin (Tokens Studio) survived. **Lesson for AntiProd: a standalone token-distribution platform is not a venture-scale business on its own.**

### The W3C Design Tokens spec — NOW STABLE (biggest recent development)
On **Oct 28, 2025 the W3C DTCG spec reached its first stable version, 2025.10** — "production-ready," no longer experimental ([W3C announcement](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)). It's a vendor-neutral JSON interchange standard (`$type`/`$value`/`$description`, media type `application/design-tokens+json`) with stable composite types (border, shadow, gradient, typography, transition) and modern color spaces. Supported by 10+ tools/orgs: **Figma (native DTCG import/export — major), Penpot, Sketch, Framer, Tokens Studio, Style Dictionary, Terrazzo, Supernova, Zeroheight, Knapsack.** Contributors from Adobe, Google, Amazon, Microsoft, Meta.

### Why token management is STILL manual and painful
The format-fragmentation excuse is largely gone (DTCG + Figma native support solved interchange). What remains:
1. **Figma variables don't auto-sync to code — someone must own the pipeline,** and in most teams that owner is "whoever notices." Drift is constant.
2. **No governance** → drift; **naming chaos** — Supernova's State of Design Tokens 2024 found most teams invent their own naming with "a significant lack of engineering involvement."
3. **Fragmented tooling** (plugin + Git + Style Dictionary + transforms) that must all be wired correctly.
4. **Buggy sync** (the Tokens Studio GitHub/Azure failures).
5. **Half-adoption** — teams set up Figma variables and export some JSON but never close the loop to production. Token adoption surged (zeroheight: ~56% in 2024 → ~84% in 2025), which *increases* the volume of brittle, manual pipelines.

**The W3C spec standardizes the format — not the pipeline, governance, or naming.** So manual sync, ownership ambiguity, and tooling friction persist even with a stable spec.

---

## Figma's own expansion (the platform threat to all of the above)

Figma is steadily absorbing the handoff layer: **Dev Mode** (inspection inside the live file), **Code Connect** (maps Figma components to real code components in your repo), **native Variables + native DTCG import/export**, and a **Dev Mode MCP server** (remote at mcp.figma.com on all plans; desktop server with selection-based context on Dev/Full seats). This is the structural force squeezing Zeplin, Supernova, and the token tools.

But Figma's MCP/Code Connect approach has hard limits that define the *remaining* opportunity:
- **No visibility into rendered output.** "The AI's process is still a one-way street. It has no visibility into the final rendered output of its own code" — it can't see if a global style overrides its work or if the component renders wrong.
- **Design systems are mapped, not enforced.** Even with Code Connect, "the AI can still creatively generate one-off styles for margins or colors when it encounters something not explicitly in the map."
- **Complex logic is flattened.** Conditional renders/data fetching collapse to a single default state.
- **Rate-limited context.** Starter/View/Collab seats get only ~6 tool calls/month.

([Figma MCP blog](https://www.figma.com/blog/introducing-figma-mcp-server/); [Builder.io](https://www.builder.io/blog/figma-mcp-server); [Design Systems Collective](https://www.designsystemscollective.com/dev-mode-mcp-server-in-figma-step-by-step-with-vs-code-e27c84c6065c).)

So even Figma — the platform owner — gives AI agents *mapping and context* but not **enforcement** and not **verification of rendered output.** That gap is AntiProd's wedge.

---

## Why Handoff Is Still Broken

After ten years and a dozen well-funded tools, the design-engineering gap remains the #1 complaint because **every tool in this category is a translation layer between two sources of truth, and the failures originate above the layer they automate.** Three structural reasons:

**1. There are two sources of truth, and translation always drifts.**
Designers' truth is Figma; engineers' truth is code. Zeplin translates Figma → specs. Style Dictionary translates tokens → platform code. Storybook documents the code side; Zeroheight documents the design side; Supernova syncs between them. *Every one of these is a bridge.* The moment either bank of the river moves, the bridge is wrong — and someone has to notice and fix it by hand. No bridge can prevent drift because no bridge owns both banks. Figma's own Code Connect *maps* components but doesn't *enforce* them; Zeroheight can *detect* token deviation but only *notifies*. Detection and mapping are not prevention. As the Webdesigner Depot piece concludes: "The goal isn't a better bridge — it's no bridge at all."

**2. The spec handed off is incomplete by construction — it's a process failure.**
Figma files show the happy path. Edge cases, error/empty/loading states, responsive behavior, and interaction logic are *decided during engineering*, not captured in the mockup. Every "handoff" therefore transfers a partial spec and pretends it's complete, guaranteeing the rework loop: engineer hits an uncovered case → makes a judgment call → designer reviews the build → files a "that's not what I meant" ticket → rework late in the sprint. "Handoff" is a waterfall gate dressed as agile; a static file is "a dead document the second it's handed off." And **governance — who owns the system, who fixes drift, who enforces adoption — is the layer no tool implements for you.** Zeroheight's report confirms it: for five straight years, *driving adoption and consistency* (not documentation, not tokens) is the #1 design-system challenge.

**3. It's cultural, and tools can't patch culture.**
Designers are trained to think spatially, visually, experientially; engineers structurally, logically, efficiently. Designers think the mockup is the product; engineers know the product lives in code. They hold different definitions of "done." The roles that genuinely bridge this — UX engineers, design technologists — are "rare, expensive, and overbooked." Tooling can shrink the translation friction, but it cannot make two disciplines share one definition of done.

**The net: tooling can only ever fix ~30% of the problem (the translation step). The other ~70% — incomplete specs, governance, and culture — is exactly where the rework originates, and exactly what the entire category has left untouched.** That is why the gap never closes, and why Specify (a standalone bridge) died while only the tools tied to a real source of truth (Figma-attached Tokens Studio, code-side Style Dictionary/Storybook) survived.

---

## Strategic implications for AntiProd (synthesis)

1. **Don't build a better bridge — collapse the two sources of truth into one.** The entire incumbent category is bridges between Figma-truth and code-truth, and bridges drift. AntiProd's thesis — the output is a PR, and the knowledge base is a living record of decisions in the monorepo — makes **code the single source of truth** and treats design as decisions captured against it. That structurally eliminates the drift problem the whole category fights.

2. **Win on enforcement, not display.** Every tool *displays* consistency (Storybook shows components, Zeroheight documents them, Code Connect maps them). None *enforce* it at code-gen time, and even Figma's MCP lets agents "creatively generate one-off styles." AntiProd's AI enforcing consistency at the point of producing the PR is the unguarded gap — including verifying *rendered output*, which Figma's one-way MCP explicitly cannot.

3. **Capture the *why*, not just the *what*.** Stories, tokens, and docs all rot because they record *what* a component is, not *why* it was decided. A living knowledge base of design decisions is the durable artifact that handoff tools never produced — and it's exactly what AI agents need as context. (This is also where Supernova, Zeroheight, Storybook, Tokens Studio, and Figma are all now racing toward MCP — validating that *context for agents* is the new battleground; AntiProd should own the richest, decision-level context.)

4. **Don't be a token-distribution startup.** Specify's death proves a standalone token platform isn't a venture business. Build tokens as a *feature* of the unified design OS, leaning on the now-stable W3C DTCG standard for interchange so AntiProd plays nicely with Figma, Style Dictionary, and the rest rather than reinventing them.

5. **Treat Figma as the platform threat and Storybook as the ally.** Figma is absorbing handoff (Dev Mode, Code Connect, native tokens, MCP) and will squeeze any pure bridge — Zeplin and Supernova are the proof. But Figma stops at *mapping and one-way context*; it does not own the code/PR or enforce/verify there. AntiProd lives where Figma can't follow without becoming a code platform: **inside the monorepo, owning the PR.** Consume Storybook's MCP and Figma's MCP as context inputs; differentiate on enforcement, verification, and durable decision-knowledge.

---

## Sources

- [Webdesigner Depot — The Designer-Developer Handoff Is Still Broken, why?](https://webdesignerdepot.com/the-designer-developer-handoff-is-still-broken-why/)
- [QuestWorks — The Design-Engineering Handoff: Why It Breaks](https://www.questworks.io/blog/design-engineering-handoff)
- [Anima — Figma vs Storybook: single source of truth](https://www.animaapp.com/blog/industry/what-is-the-single-source-of-truth-storybook-or-figma/)
- [YapLabs — When Code Becomes the Source of Truth](https://yaplabs.com/blog/2025-07-15-rethinking-design-systems/)
- [Storybook 9 blog](https://storybook.js.org/blog/storybook-9/) · [InfoQ on v9](https://www.infoq.com/news/2025/07/storybook-v9-released/) · [Storybook AI docs](https://storybook.js.org/docs/ai) · [Storybook for AI](https://storybook.js.org/ai)
- [Lemon.io — Disadvantages of Storybook](https://lemon.io/answers/storybook/what-are-the-disadvantages-of-storybook/) · [Chak Shun Yu — Practical overview before adopting Storybook](https://www.chakshunyu.com/blog/practical-overview-storybook/)
- [Chromatic pricing](https://www.chromatic.com/pricing) · [Vendr — Chromatic pricing](https://www.vendr.com/marketplace/chromatic)
- [LogRocket — Zeplin vs Figma Dev Mode](https://blog.logrocket.com/ux-design/zeplin-design-handoff-figma-dev-mode/) · [Zeplin — Dev Mode alternative](https://zeplin.io/why-zeplin/dev-mode-alternative/) · [SF Standard — Zeplin layoffs](https://sfstandard.com/2023/08/30/san-francisco-software-startup-lays-off-one-third-of-workforce/) · [getLatka — Zeplin revenue](https://getlatka.com/companies/zeplin)
- [TechCrunch — Supernova seed](https://techcrunch.com/2022/11/16/supernova-wants-to-make-it-easy-to-transfer-design-changes-to-code-bases) · [Supernova code automation](https://www.supernova.io/code-automation) · [Supernova 3.0](https://www.supernova.io/blog/introducing-supernova-3-0-where-vibes-meet-professional-product-development) · [Supernova pricing](https://www.supernova.io/pricing) · [Supernova — Storybook for designers](https://www.supernova.io/blog/storybook-for-designers-why-its-more-than-just-a-dev-tool)
- [Zeroheight Design Systems Report](https://report.zeroheight.com/) · [Zeroheight AI](https://zeroheight.com/ai/) · [Zeroheight — Direct AI access](https://zeroheight.com/whats-new/direct-ai-access-to-your-design-system-documentation/) · [Zeroheight pricing](https://zeroheight.com/pricing/)
- [Tokens Studio — Studio platform](https://tokens.studio/studio-platform) · [Tokens Studio pricing](https://tokens.studio/pricing) · [Tokens Studio GitHub plugin](https://github.com/tokens-studio/figma-plugin) · [Figma forum — Tokens Studio bugs](https://forum.figma.com/ask-the-community-7/bugs-within-the-tokens-studio-plugin-34241)
- [Style Dictionary GitHub](https://github.com/style-dictionary/style-dictionary) · [npm](https://www.npmjs.com/package/style-dictionary) · [Tokens Studio — SD v4 plan](https://tokens.studio/blog/style-dictionary-v4-plan)
- [Specify — Saying Goodbye](https://specifyapp.com/blog/specify-design-token-format)
- [W3C — Design Tokens spec reaches first stable version](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/) · [DTCG Format Module](https://www.designtokens.org/tr/drafts/format/)
- [Figma — Introducing the Dev Mode MCP server](https://www.figma.com/blog/introducing-figma-mcp-server/) · [Builder.io — Figma MCP server](https://www.builder.io/blog/figma-mcp-server) · [Figma — Code Connect help](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect)
- [Supernova — State of Design Tokens](https://www.supernova.io/state-of-design-tokens)
