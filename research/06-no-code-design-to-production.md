# No-Code & Design-to-Production Tools — Competitive Research

*Section 6 of the AntiProd competitive research report.*

**Scope:** Tools that promise designers can ship without (or with reduced) engineering — Webflow, Framer, Builder.io, Plasmic, Dora, Wix Studio (formerly Editor X), Squarespace, and the broader design-to-code AI wave. The throughline is the question every one of these tools eventually forces: *why hasn't "designers can ship" replaced the designer-engineer workflow for real production applications?* — and whether AntiProd, by shipping **code PRs into a real monorepo** rather than a hosted site, sidesteps the ceiling or inherits it.

---

## Executive summary

The no-code design-to-production market has bifurcated, and the split is the single most important finding for AntiProd:

1. **Marketing-site builders that gave up on apps** — Webflow, Framer, Wix Studio, Squarespace, Dora. These tools have *won* the brochure/marketing/portfolio web. They are real businesses (Webflow ~$213M ARR / $4B valuation; Framer $2B valuation, ~$50M ARR). But every one of them has, explicitly or implicitly, retreated from the "real web app" promise. The clearest signal in the entire market: **Webflow sunset both its app-logic feature (Logic, disabled June 2025) and its auth/membership feature (User Accounts, sunset January 2026)** — the two features it had built to climb up-market into applications. It chose to be a "Website Experience Platform" instead.

2. **Design-engineer-handoff tools that target the codebase** — Builder.io (especially Fusion 1.0) and Plasmic. These are the *direct* conceptual neighbors of AntiProd. They are betting, like AntiProd, that the output should be **code that lives in your repo**, not a site locked in a hosted platform. Builder.io's Fusion explicitly ships **pull requests to GitHub** using your real design system components. This is the competitive set AntiProd must study most closely — it is both validation of the thesis and the field where AntiProd will actually fight.

The strategic punchline: the marketing-site builders prove a *market* (designers desperately want to ship) but also prove a *ceiling* (they can't do real apps and have stopped trying). The handoff tools prove the *thesis* (code-in-repo is the right output) but haven't yet proven they can produce code an engineering team will actually accept and maintain. AntiProd's wedge — code PRs to a production monorepo for professional design-engineering teams — is on the right side of the bifurcation, but it lands squarely in Builder/Plasmic territory, not in the open field.

---

## Tool-by-tool analysis

### Webflow — the established player that retreated from apps

**What it is / who it's for.** The most mature visual web builder. Pixel-perfect design control over HTML/CSS/JS, a CMS, hosting, e-commerce, and a growing enterprise motion. Primary buyers: marketing teams, agencies, and increasingly enterprise brand/web teams (Dell, Zendesk, Mural). ~300K customers, 200K+ businesses.

**How far it goes.** Design + hosting + CMS + e-commerce + an app marketplace + a REST/Data API + custom code embeds. It is a complete *publishing* platform for content/marketing sites. It is **not** a backend or application framework: no server-side scripts, no edge functions, no middleware, no custom server rules beyond basic 301s. For real apps teams pair Webflow with Xano, Firebase, Memberstack, or a separate codebase.

**Design-system support.** Strong for a visual tool — reusable Components, variables/tokens, style classes, and (newer) **Code Components**: React components authored outside Webflow and imported via **DevLink**. Teams can maintain a design system, and DevLink lets engineers own a component registry that designers consume.

**The "real app" ceiling — and the smoking gun.** Webflow built two features to climb into applications and then *killed both*:
- **Logic** (event-driven automations: form triggers, branching, HTTP requests, CMS updates) — shipped in beta through 2023–24, **disabled on all sites June 27, 2025**.
- **User Accounts / Memberships** (gated content, auth) — **sunset January 29, 2026**.

Webflow's own stated reason: a "strategic decision… in favor of our vetted app partners" as it refocuses as a **Website Experience Platform (WXP)**. It pushed users to Zapier/Make (automation) and Memberstack/Outseta (membership). This is the most decisive datapoint in the section: **the category leader tried to become an app platform and explicitly chose not to.** Other ceilings: CMS scale (Premium caps ~20,000 items / 40 collections; large directories/marketplaces need Enterprise or the external Data API), shared-hosting performance limits (no fine-grained CDN/cache/DB control), and no relational data of real depth.

**Developer handoff.** Better than its reputation. **DevLink** syncs React components between codebase and Webflow via CLI/CI; Code Components add interactive features Webflow natives can't (calculators, charts, 3D configurators, live data). Custom code embeds require a paid plan. But the model is "engineers feed components *into* Webflow," not "engineers take Webflow's output and own it in their repo." It remains a *hosted* environment — closer to a managed garden with developer gates than a true walled garden, but the site of record is Webflow, not git.

**AI features.** AI Site Builder, AI Assistant, and sitewide AEO (answer-engine optimization) audits. Launched relatively late (early 2025) versus competitors. Functionally: generate/scaffold pages and optimize content — productivity, not capability expansion.

**Pricing / business model.** Post-May-2026 simplification: Starter (free), Basic $15/mo, Premium $25/mo (folds old CMS + Business tiers; 20K CMS items / 40 collections), Team $2,500/mo (10 seats, 100 collections, localization, AEO, workflows, annual), Enterprise custom. E-commerce from $29/mo + 2% transaction fee. ~$213M revenue in 2024 (+66% YoY), $4B valuation, ~$335M raised, ~1,300 employees, with **layoffs reported May 2026** — a sign the growth story is being recalibrated.

**Sentiment.** Loved by agencies and marketing teams for design control and CMS-driven content sites; the consensus advice is literally *"Webflow first, custom later."* Teams hit the ceiling on relational/multi-dimensional data, large catalogs, performance tuning, and any logged-in application surface — and migrate to custom code. The sunsets pushed membership/automation builders off the platform entirely.

**Roadmap.** WXP positioning, AEO/agentic-web framing, deeper enterprise. **[Confirmed]** Logic/User Accounts sunset; AEO tooling. **[Inferred]** Continued retreat from app features toward content/marketing + AI optimization. **[Speculative]** A deeper DevLink-as-handoff story to capture some of the design-engineering workflow Builder is chasing.

---

### Framer — the design tool that hosts, going after Figma

**What it is / who it's for.** A Figma-like canvas that *also publishes live sites*. Aimed at designers, founders, marketers, freelancers shipping marketing sites, landing pages, and portfolios — fast, animated, responsive, prompt-to-published. Positioned by CEO Koen Bok explicitly as letting "designers publish websites without needing costly developers," a simpler alternative to Figma **and** Squarespace.

**How far it goes.** Design + hosting + CMS + animation/interaction + AI generation. Excellent at motion (scroll/hover/transition micro-interactions). **Not for apps:** "If you're building a SaaS product, an app or a dashboard, Framer is the wrong fit — the canvas, CMS and component system are for website designs, not UI flows."

**Design-system support.** Component-based with shared styles; comfortable for designers because it mirrors Figma. Weaker as a rigorous engineering design system than Webflow's DevLink/Code Components path.

**The "real app" ceiling.** Sharper than Webflow's. Framer CMS: no API access to your own content (it only renders inside Framer pages), limited field types, item caps on lower tiers, no CMS version history, no CMS permissions, weak multilingual. No relational depth, no backend, no transactional logic. The accepted enterprise pattern is telling: **Framer powers the marketing site while Next.js/Remix runs the logged-in app**, with shared nav faking a single product.

**Developer handoff.** The weakest of the serious tools. There's a Framer MCP plugin and custom code components, but the value proposition is "you don't need engineers," so the handoff/extension story is thin. Content is locked to Framer (no CMS API). This is closer to a walled garden than Webflow.

**AI features.** The most aggressive AI surface area in the marketing-site group: **Wireframer** (prompt → multi-page responsive wireframe with copy in ~30–60s — a starting point, not a finished site), **Workshop** (AI-generated interactive components / "vibe-coding," on Claude 4.5 since Sept 2025), AI Translate, Auto Rename, AI Plugins, MCP, and a Claude & Codex beta (May 2026). AI is on every plan including Free — a deliberate top-of-funnel land grab.

**Pricing / business model.** Free; Basic ~$10/mo; Pro ~$30/mo (staging, rollback, roles, relational CMS, locales); Scale ~$100/mo; Enterprise custom (SSO, up to 100K CMS items). ~$50M ARR (2025), projecting ~$100M in 2026, **$2B valuation on a $100M Series D (Aug 2025, Meritech + Atomico)**. Claims 40% of the latest YC batch uses it.

**Sentiment.** Designers love the Figma-native feel and speed-to-beautiful-published-site. The "Framer as Figma replacement" thesis is *partially* real — for the publishing/marketing-site slice it's happening, and the funding reflects investor belief. But it is replacing Figma's *website-publishing* use, not Figma's role as the design surface for product/app UI. Framer hits the app ceiling immediately and openly tells users to go elsewhere for apps.

**Roadmap.** **[Confirmed]** Expanding AI (Workshop/Wireframer/MCP/Codex beta), enterprise CMS scale. **[Inferred]** Doubling down on AI-prompt-to-marketing-site as the wedge; chasing Figma's website segment, not its product-design segment. **[Speculative]** Some agentic code-export motion to court developers — but it cuts against the "no engineers" positioning.

---

### Builder.io — the design-engineer handoff play (AntiProd's closest neighbor)

**What it is / who it's for.** A visual development platform combining **AI design-to-code**, a **Visual Editor (v3)**, and a **Visual CMS**, API-first, aimed explicitly at **enterprise teams** and the **designer-engineer handoff**. The pitch: design and code are two views of the same source of truth, "no handoffs to clean up later."

**How far it goes.** This is the key differentiator from Webflow/Framer: Builder targets **your existing codebase and design system**, not a hosted destination. The Visual Editor pulls context from your repo and component registry so anyone — designer, PM, marketer — produces output that is on-brand and **production-ready code**. It registers your real components as the building blocks.

**Design-system support.** Strong and codebase-native: developers own/maintain the component registry; designers compose with the actual registered components; AI assembles layouts from *your* design system ("create a testimonial section with three cards" → built from your components). Granular RBAC splits dev (registry), designer (layout), writer (copy), PM (publish/experiment).

**The "real app" ceiling — and where it just moves the gap.** Builder gets closest to dissolving the handoff, but the honest read from reviews and testing: AI tools (Builder Visual Copilot/Fusion, Bolt, v0) handle multi-page layouts and component composition well, **but complex business logic and advanced functionality still require manual development.** Builder *narrows* the design-engineering gap for UI assembly and content; it doesn't eliminate the need for engineers on logic, state, data, and architecture. It moves the gap downstream rather than closing it — which is precisely the gap AntiProd must reckon with too.

**Developer handoff / integration — the headline.** **Fusion 1.0 (Nov 2025): "the first AI agent that connects product, design, and code in a single workflow,"** integrating with **Slack, Jira, Figma, and GitHub**. Its context engine understands your APIs, data sources, and design systems and **ships pull requests to GitHub**; `@builder-bot` responds to PR feedback and fixes build failures. Builder claims Fusion has turned 10M+ designs/PRDs into production features at large companies. **This is the most direct precedent for AntiProd's "output is a shipped PR to a monorepo" thesis — it is both proof the thesis is fundable/real and the competitor most likely to be in the room.**

**AI features.** Visual Copilot (Figma → code), Generative UI (NL → full UIs built from your design system), and Fusion (agentic, end-to-end, PR-shipping). Framed as "design and code are different views of the same truth" rather than one-shot translation.

**Pricing / business model.** API-first SaaS with enterprise tiers and seat/usage components (enterprise-quoted). Funding is comparatively modest: ~$37M total, including a **$20M round led by M12 (Microsoft's venture fund), April 2024** — notably smaller than Framer's war chest, a relevant competitive nuance.

**Sentiment.** Enterprise design/eng leaders cite collapsing months-long handoffs into instant builds. Skeptics note AI-generated code still needs engineering review for anything beyond UI assembly, and that "production-ready" is doing heavy lifting. Builder is the most credible enterprise handoff story and the clearest validation — and threat — for AntiProd.

**Roadmap.** **[Confirmed]** Fusion 1.0 GA; Slack/Jira/Figma/GitHub integration; agentic PR workflow. **[Inferred]** Deeper agentic autonomy, more of the SDLC inside one agent, learning team conventions over time. **[Speculative]** Direct collision with AntiProd as both converge on "design intent → reviewed PR in your repo."

---

### Plasmic — the developer-respecting visual builder

**What it is / who it's for.** Open-source visual builder for React that **integrates with your existing codebase** — "never confined to a walled garden." Founded 2019 (Yang Zhang). Pitched to developers, agencies, and freelancers; increasingly to teams building **apps, internal tools, client portals, and user-facing products**, not just marketing pages.

**How far it goes / what it does differently.** Plasmic's distinction is philosophical: it is **less a page builder and more design-system composition.** You register your own arbitrary React components as building blocks; non-developers assemble pages from them; you can **generate production-ready React/Next.js code into your codebase** and bring your own data sources, deployment, and design system. It deliberately keeps engineers in control of the primitives and lets the visual layer be optional rather than total.

**Design-system support.** Among the best for engineering rigor — it *assumes* a curated component library and shines when one exists. The tradeoff: it's less magical for teams without a mature design system, since there's less pre-built scaffolding than Webflow/Framer.

**The ceiling.** Plasmic raises the ceiling for *UI/app composition* by leaning on real code components, but the same fundamental boundary applies — heavy business logic, complex state, and backend architecture live in code the engineers write. Plasmic's answer is to be the visual layer *over* that code rather than to replace it.

**Developer handoff / integration.** The strongest "not a walled garden" story by design — open source, codebase integration, code-component registration, code generation, even a 2025 Cursor-integration livestream. Engineers can fully extend and own the output.

**AI features.** Less marketed than Builder/Framer; Plasmic has positioned around *using AI with no-code tools* and pairing with code-AI (Cursor) rather than a flagship agent. This is a relative weakness in the current AI-arms-race narrative.

**Pricing / business model.** Open-core + hosted tiers. Funding is the cautionary note: largely a **Seed-stage company (last documented round ~May 2021; investors include Tiny and Olima Ventures)** with no major recent raise surfacing — i.e., the most aligned philosophy (code-in-your-repo, design-system-first) with the **least capital** behind it. Relevant for AntiProd: the thesis is right but under-resourced here, leaving room.

**Sentiment.** Beloved by technical teams who already have a design system and want a visual layer without lock-in. Less suited to non-technical solo users wanting templates-and-go. The clearest "developer-friendly" reputation in the group.

**Roadmap.** **[Confirmed]** Codebase/Cursor integration, app + internal-tools positioning. **[Inferred]** Deeper code-AI pairing. **[Speculative]** Acquisition target or capital constraint given the funding gap.

---

### Wix Studio (← Editor X), Squarespace, Dora — the rest of the field

- **Wix Studio / Editor X.** Wix **fully retired Editor X** (its agency/pro-tier, CSS-Grid, breakpoint, real-time-collab product): auto-migration announced Oct 2023, new-site creation closed April 2024, transition completed Jan 2025. Editor X's capabilities (CSS Grid, custom breakpoints, collaboration) carried into **Wix Studio**, now Wix's agency/enterprise brand. The lesson for AntiProd mirrors Webflow's: even a well-funded incumbent **consolidated rather than expanded** its pro/app ambitions, folding a separate advanced product back into the mothership. Wix Studio competes with Webflow/Framer on agency marketing sites, with Wix's broader template/app ecosystem behind it — still a site builder, not an app platform.

- **Squarespace.** The template-first, all-in-one site/commerce builder for SMBs, creators, and brochure sites. Lowest ceiling of the group, highest ease. Not a design-system or handoff tool; relevant only as the low end of the market Framer explicitly named as a target to disrupt.

- **Dora (dora.run).** The newest/most experimental: **AI-generated 3D-animated websites from a prompt**, generating each site from scratch (custom copy, layouts, visuals) rather than swapping into templates. Alpha 2.0, free access, paid plans ~$14–$25/mo. Differentiator is *visual ambition* (3D, animation) beyond Framer/Wix. Strategically it's a reminder that the *generative* frontier keeps advancing on the **output-as-hosted-site** side — but it's firmly a marketing/showcase tool, no app or handoff story.

---

## Cross-cutting patterns

1. **Everyone won marketing sites; everyone abandoned or never attempted apps.** Webflow killed Logic + User Accounts. Framer openly says "wrong fit" for apps. Wix folded Editor X. The market has *converged on the conclusion that visual no-code tops out at content/marketing/brochure sites.*
2. **The output format predicts the ceiling.** Tools whose output is a **hosted site** (Webflow/Framer/Wix/Squarespace/Dora) hit a hard wall at application logic, relational data, auth, and backend. Tools whose output is **code in your repo** (Builder Fusion, Plasmic) push the wall back but inherit a softer version of it (business logic still needs engineers).
3. **AI universally raised productivity, not the ceiling.** Wireframer/Workshop, Webflow AI, Generative UI all *accelerate building the buildable*. None made the previously-unbuildable buildable. Builder's Fusion is the most ambitious because it targets the **workflow** (PRs, Jira, build fixes), not just generation.
4. **Capital is concentrated on the side that abandoned apps.** Framer ($2B) and Webflow ($4B) are richly funded marketing-site companies. The code-output, handoff-focused players nearest AntiProd's thesis are *less* capitalized (Builder ~$37M; Plasmic seed-stage). The most strategically-aligned space is the *least* crowded by capital.

---

## The No-Code Ceiling and What It Means for AntiProd

**What the ceiling actually is.** Across a decade, "designers can ship" has reliably delivered for *content surfaces* and reliably failed for *applications*. The fundamental reason is the **ease-of-use ↔ control tradeoff**: a visual abstraction that's simple enough for a designer necessarily hides the very things real apps require — arbitrary business logic, complex/edge-case state, relational data at scale, auth, performance/infra control, and integration with existing systems. The Hacker News "racing bike on a paved road" metaphor captures it: visual tools are faster *on the path the abstraction paves* and stop dead the moment you must cut a new path. Webflow validated this with money on the line — it *built* the off-road features (Logic, Memberships) and **chose to remove them** rather than maintain a half-app platform. That is the strongest possible evidence that the ceiling is structural, not a temporary tooling gap.

A second, subtler ceiling is **lock-in / non-ownership**. Hosted-site tools make the platform the source of truth. Framer's CMS can't even be queried by API; your content can only render on Framer pages. For a *professional engineering organization with a production codebase*, output that isn't ownable, diffable, reviewable, and runnable in their own environment is a non-starter regardless of how good the visual editor is.

**Does AntiProd face the same ceiling?** AntiProd makes a different bet on *both* axes:
- **Output = a PR to a real monorepo, not a hosted site.** This is the right side of the bifurcation. It sidesteps the **lock-in ceiling** entirely: the artifact is code the team already owns, reviews, and ships through its existing pipeline. It also sidesteps the *infra* ceiling — the app runs on the team's stack (auth, data, performance, backend all live in code, untouched by AntiProd's abstraction). Webflow's, Framer's, and Wix's hardest walls (no backend, no real auth, no relational data, no infra control, no ownership) **do not apply**, because AntiProd doesn't try to *be* the runtime — it produces source that the team's runtime executes.
- **The logic ceiling is softened, not eliminated.** Builder's Fusion is the proof point and the warning: even when output is a PR, AI/visual tooling produces excellent **UI and composition** but complex business logic still requires engineering judgment. AntiProd's positioning — **design engineers** working *with* designers, output reviewed as a PR — is actually the correct response to this. AntiProd is not promising "designers ship without engineers" (the broken promise); it's promising "designers and design engineers ship *together*, and the artifact is a reviewable PR." That keeps the human in the loop exactly where the ceiling demands one.

**The honest competitive risk.** Sidestepping the *hosted-site* ceiling lands AntiProd directly in the **Builder.io / Plasmic** arena — the code-output, handoff-focused space. Builder's Fusion already ships PRs from Figma/Jira/Slack into GitHub using a team's real design system, with an agent that fixes its own build failures. So AntiProd is *not* entering an empty market by going to code; it's entering the most credible, most enterprise-validated, and least-template-y part of it. AntiProd's defensibility must come from being **better at the production-engineering reality** than Builder/Plasmic: matching the existing monorepo's conventions, design system, lint/test/CI gates, and review culture so completely that the PR is *mergeable as-is by a senior engineer's standard* — not "AI-generated and needs cleanup." The tools that retreated (Webflow/Framer) are *not* AntiProd's competition; they're its proof that the destination-site model is exhausted. The tools to beat are the ones that already agreed code-in-repo is the answer.

**Strategic takeaways for AntiProd:**
1. **Use Webflow's sunsets as the headline narrative.** "The category leader built app features and killed them; visual destination-builders have conceded they can't do real apps" is a clean, evidence-backed origin story for why a *code-output* OS is needed.
2. **Position against Builder/Plasmic, not Webflow/Framer.** The marketing-site giants are adjacent, not competitive. The real fight is "who produces the most *mergeable*, design-system-faithful PR." Win on production-engineering fidelity and review-readiness.
3. **Don't repeat the broken promise.** "Designers ship *without* engineers" is the dead thesis. AntiProd's "designers + design engineers ship together, output = reviewed PR" is the live one — keep the human-in-the-loop framing front and center; it's the correct answer to the logic ceiling, not a weakness.
4. **Make ownership/no-lock-in a first-class selling point.** Framer-can't-even-API-its-own-CMS is the contrast. AntiProd's artifact lives in the customer's repo, in their language, on their stack — the opposite of a walled garden.
5. **Watch the capital asymmetry.** The aligned thesis (code output) is *under-capitalized* (Builder ~$37M, Plasmic seed) while the abandoned thesis (hosted sites) is *over-capitalized* (Framer $2B, Webflow $4B). That's an opening — but also a signal that incumbents could pivot capital toward code-output if the model proves out, so speed and depth in production fidelity matter.

---

## Sources

- [Webflow Limitations: What It Can't Do — Karpi Studio](https://www.karpi.studio/blog/what-webflow-cannot-do)
- [10 Webflow disadvantages as you scale — Contentstack](https://www.contentstack.com/cms-guides/10-webflow-disadvantages-you-can-t-ignore-as-your-business-scales)
- [Feature sunsets/deprecations — Webflow Help Center](https://help.webflow.com/hc/en-us/articles/36046081578515-Feature-sunsets-deprecations)
- [Logic sunset — Webflow Help Center](https://help.webflow.com/hc/en-us/articles/36045959707667-Logic-sunset)
- [User Accounts sunset — Webflow Help Center](https://help.webflow.com/hc/en-us/articles/36046006227731-User-Accounts-sunset)
- [Why is Webflow Deprecating Memberships — Sygnal](https://www.sygnal.com/blog/why-is-webflow-deprecating-memberships)
- [Why Webflow Killed Logic in 2025 — Pravin Kumar](https://www.pravinkumar.co/blog/webflow-logic-discontinued-2025-automation-alternatives-2026)
- [Connect your codebase to Webflow with DevLink](https://webflow.com/feature/devlink)
- [DevLink Reference — Webflow Developer Docs](https://developers.webflow.com/devlink/reference/overview)
- [Code components — Webflow Developer Docs](https://developers.webflow.com/code-components/introduction)
- [Webflow Revenue 2024: $212.5M ARR, $4B Valuation — GetLatka](https://getlatka.com/companies/webflow.com)
- [9 Webflow Statistics (2025) — TapTwice Digital](https://taptwicedigital.com/stats/webflow)
- [Updated pricing and simplified plans for May 2026 — Webflow Help Center](https://help.webflow.com/hc/en-us/articles/51059955082387-Updated-pricing-and-simplified-plans-for-May-2026)
- [Plans & pricing — Webflow](https://webflow.com/pricing)
- [Webflow vs Custom Development — Stan Vision](https://www.stan.vision/journal/webflow-vs-custom-development-pros-and-cons)
- [Webflow vs Custom Code: Hidden Costs at Scale — AlterSquare/Medium](https://altersquare.medium.com/webflow-vs-custom-code-the-hidden-costs-that-show-up-at-scale-da3e5aa48e51)
- [Framer vs Webflow — Zapier](https://zapier.com/blog/framer-vs-webflow/)
- [Framer vs Webflow in 2025 — Toools.design](https://www.toools.design/blog-posts/webflow-vs-framer-in-2025-an-honest-in-depth-comparison)
- [Framer AI Features in 2026: Workshop, MCP — Oma-Kase](https://www.oma-kase.com/blog/framer-ai-features)
- [Framer AI — official](https://www.framer.com/ai/)
- [Framer Releases Wireframer, Workshop, Vectors 2.0 — AIbase](https://www.aibase.com/news/18288)
- [Framer Limitations / CMS — Goodspeed Studio](https://goodspeed.studio/blog/framers-cms-features-manage-content-without-developer)
- [Limits of Framer CMS — Framerbite](https://framerbite.com/blog/limits-of-framer-cms)
- [Framer for Enterprise Websites in 2026 — Oma-Kase](https://www.oma-kase.com/blog/framer-for-big-enterprise-websites-in-2026)
- [Framer Pricing — official](https://www.framer.com/pricing)
- [Figma-Killer Framer Valued at $2B — Gizmodo](https://gizmodo.com/framer-figma-killer-2000649692)
- [Framer Raises $100M at $2B Valuation — Crunchbase News](https://news.crunchbase.com/venture/figma-competitor-framer-becomes-unicorn/)
- [Framer $100M Series D — SiliconANGLE](https://siliconangle.com/2025/08/28/professional-website-design-platform-framer-raises-100m-2b-valuation/)
- [Builder.io — official](https://www.builder.io/)
- [Builder.io Launches Fusion 1.0 — Builder.io News](https://www.builder.io/news/fusion)
- [Builder.io Launches Fusion 1.0 — PR Newswire/Yahoo Finance](https://finance.yahoo.com/news/builder-io-launches-fusion-1-110000288.html)
- [Visual Editor 3.0 — Builder.io Blog](https://www.builder.io/blog/builder-visual-editor-v3)
- [Beyond Headless CMS: Visual Development — Builder.io Blog](https://www.builder.io/blog/headless-cms-path-forward)
- [AI Revolutionizes CMS: Generative UI — Builder.io Blog](https://www.builder.io/blog/ai-driven-evolution-cms)
- [Builder.io Overview in 2026 — UI Bakery](https://uibakery.io/blog/builder-io-overview)
- [Builder — Funding Profile — Tracxn](https://tracxn.com/d/companies/builder/__zMk_yU3jacqgr1EizCSxRt5LPyjSjapmfvi9jqYABvk)
- [Plasmic — official](https://www.plasmic.app/)
- [Plasmic for developers — official](https://www.plasmic.app/developers)
- [Plasmic GitHub](https://github.com/plasmicapp/plasmic)
- [Plasmic vs Builder.io — Subframe](https://www.subframe.com/tips/plasmic-vs-builderio)
- [Evaluating Builder vs Plasmic — Ersin Akinci/Medium](https://ersin-akinci.medium.com/evaluating-builder-vs-plasmic-two-no-code-tools-for-building-websites-d8ddd92bf13e)
- [Plasmic — Funding & Investors — Tracxn](https://tracxn.com/d/companies/plasmic/__QaKkw4g7sKpcxo6g3Mhaay89khPJA1R-6pYUKaYnAe8/funding-and-investors)
- [Wix Editor X Switch to Wix Studio — Davydov Consulting](https://www.davydovconsulting.com/post/wix-editor-x-switch-to-wix-studio-in-late-2023)
- [Wix Studio FAQs: Migrating from Editor X — Wix Help Center](https://support.wix.com/en/article/wix-studio-faqs-migrating-from-editor-x-to-the-studio-editor)
- [Dora — official](https://www.dora.run/)
- [Dora AI Website Builder Review 2026 — ToolJunction](https://www.tooljunction.io/ai-tools/dora)
- [Why Codeless Software Is Doomed to Fail — Hacker News](https://news.ycombinator.com/item?id=20037962)
- [The "No Code" Delusion — Hacker News](https://news.ycombinator.com/item?id=22033827)
- [Will low/no-code tools disrupt development? — Stack Overflow Blog](https://stackoverflow.blog/2022/08/10/will-low-and-no-code-tools-ever-truly-disrupt-tech-development/)
- [AI in Frontend: Testing v0, Builder.io — JavaScript in Plain English](https://javascript.plainenglish.io/ai-in-frontend-development-lessons-from-testing-modern-design-to-code-tools-like-v0-builder-io-8869855bd6e4)
