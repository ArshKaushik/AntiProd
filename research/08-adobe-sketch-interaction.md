# Adobe, Sketch, and the Interaction/Animation Tool Layer

*Competitive research for AntiProd — a design OS for design engineers and product designers working in monorepos.*

**Status legend for forward-looking claims:** [Confirmed] = announced/shipped by the vendor; [Inferred] = strongly implied by vendor behavior or market signals; [Speculative] = analyst extrapolation.

---

## Part 1: Adobe's Current Strategy

Adobe remains the 800-pound gorilla of creative software, but its position in *product/UI design* — the segment AntiProd cares about — is weak and getting weaker. The short version: Adobe lost the UI design category to Figma, failed to buy its way back in, killed its own competing product, and has redirected its entire AI and growth narrative toward generative content production for marketing and enterprise rather than collaborative interface design.

### 1.1 The AI push: Adobe Firefly

Firefly is Adobe's family of generative AI models (image, vector, video, audio) and a standalone web app, deeply wired into Creative Cloud. The integrations matter more than the standalone app:

- **Photoshop — Generative Fill / Generative Expand:** text-prompt-driven inpainting and outpainting (e.g., changing aspect ratio while AI fills the new space). This is Firefly's most-used and most-praised integration.
- **Illustrator — Generative Recolor, Generative Shape Fill, Text-to-Vector:** Generative Recolor (first Firefly integration in Illustrator, debuted at MAX London) recolors complex vector art from a text prompt; Text-to-Vector generates editable, downloadable `.svg` scenes/subjects/icons.
- **Firefly app + Premiere:** Firefly Video Model (positioned as the "industry's first commercially safe" AI video model) powers Generate Video and Premiere's Generative Extend.

**Is it genuinely competitive?** Yes on two axes, no on a third:

1. **Commercial safety is Firefly's killer differentiator.** It is the only major image generator trained exclusively on Adobe Stock, openly licensed, and public-domain content, with explicit *enterprise indemnification* against copyright claims. Midjourney, DALL·E, and Stable Diffusion do not offer this. For regulated/brand-conscious enterprises, this is decisive.
2. **Workflow integration** inside Photoshop/Illustrator is best-in-class — the AI lives where the work already happens.
3. **Raw creative quality lags.** Reviewers consistently rate Firefly's aesthetic range below Midjourney v7 and below DALL·E 3 on complex prompt-following. Adobe tuned for safety and realism, so stylized/fantastical output comes out subdued, and prompt flexibility is more limited.

Net: Firefly is a *commercially defensible, integration-led* play, not a quality leader. It is an asset-generation tool, not a design-system or interface tool.

### 1.2 The failed Figma acquisition

In September 2022 Adobe agreed to buy Figma for ~$20B. After ~15 months of EU (European Commission) and UK (CMA) scrutiny — regulators argued the deal would "eliminate competition between two main competitors" in collaborative design — Adobe and Figma **mutually terminated the deal in December 2023**. Adobe paid a **$1B reverse termination fee**.

**What it revealed:** strategic anxiety. Adobe did not have a credible answer to Figma in product/UI design and was willing to pay 20-25x revenue to remove the threat rather than out-build it. The aftermath validated Figma's strength: Figma IPO'd in July 2025, with shares spiking and the company briefly approaching a ~$68B market cap — meaning Adobe would have *overpaid by tens of billions* relative to the standalone value, or conversely missed acquiring an asset that more than tripled. Either reading underscores that Adobe ceded the category.

**What Adobe did since:** it explored partnerships in the design space rather than another build/buy attempt, leaned hard into Firefly/GenStudio for the enterprise content-production narrative, and — critically — gave up on its own Figma competitor (below).

### 1.3 Adobe XD's discontinuation

Adobe XD was Adobe's Figma/Sketch competitor. After the Figma deal collapsed, Adobe placed XD in **maintenance mode (confirmed early 2024)**: no new features, no new standalone sales, and an Adobe spokesperson stating "we have no plans to further invest in it." It lingers for some existing Creative Cloud subscribers but is effectively end-of-life.

**What it means for designers on Adobe tools:** there is no Adobe-native, modern UI design destination anymore. Adobe is effectively pointing UI/UX work *toward Figma and alternatives* (Penpot, etc.). Designers who stayed on XD have had to migrate, almost always to Figma.

### 1.4 Adobe's current design workflow & "answer to Figma"

Adobe no longer has a direct answer to Figma for collaborative interface design. The practical Adobe UI/UX stack today is: Photoshop/Illustrator (with Firefly) for visual assets and exploration, then **Figma for actual UI design and handoff**. Adobe's strategic answer is to *not compete in the canvas* and instead win the *content-production* layer around it (Firefly, GenStudio, Express). This is a tacit concession of the product-design canvas to Figma.

### 1.5 Adobe Express

Express is Adobe's Canva competitor — template-driven, browser-based, social-graphic/marketing creation with one-tap Firefly features. **Who it's for:** marketers, small businesses, social media managers, and "creators" — *not* product designers or design engineers. It's a downmarket, top-of-funnel play to seed Firefly usage and contest Canva's massive non-designer base. It is irrelevant to AntiProd's user (the design engineer in a monorepo) except as a signal of where Adobe's growth attention is pointed: volume content creation, not interface engineering.

### 1.6 Adobe's enterprise position & the path to product design

Adobe still dominates enterprise *creative* workflows — print, video (Premiere), photography (Photoshop/Lightroom), and increasingly **marketing content at scale** via GenStudio, Firefly Services, Firefly Custom Models, and **Firefly Foundry** (private, brand-tuned models across image/video/audio/vector/3D). GenStudio for Performance Marketing even ships a "Content Production Agent" that turns briefs into channel-specific creative.

**Is there a path from enterprise creative to product design?** In principle yes — Adobe owns the brand, the asset pipeline, and enterprise relationships. In practice, **no near-term path**: Adobe killed its UI tool, ceded the canvas to Figma, and is pouring AI investment into *marketing content production*, which is a different buyer (CMO/marketing ops) and a different artifact (campaign assets, not interactive components in a codebase). The product-design and design-engineering workflow is structurally adjacent to Adobe's strengths but disconnected from its current strategy.

### 1.7 Near-future roadmap signals

- **[Confirmed]** Firefly will keep expanding into video, audio (Generate Soundtrack/Speech), 4MP Image Model, and a *partner-model marketplace* (ElevenLabs, Google, Luma, OpenAI, Runway, Topaz) inside the Firefly app — Adobe is becoming an AI *aggregator/orchestration layer*, not only a model maker.
- **[Confirmed]** Enterprise content at scale (GenStudio, Foundry, Custom Models, agents) is the explicit growth engine.
- **[Inferred]** Adobe will *not* re-enter collaborative UI design head-to-head with Figma; expect partnership/integration over rebuild.
- **[Speculative]** Adobe could acquire or partner into the interaction/motion or design-system tooling layer to reattach to product teams, but there is no public signal of this.

### 1.8 Strategic implications for AntiProd

Adobe is **not a direct competitor to AntiProd today** and is unlikely to become one in the medium term. It abandoned the canvas, has no UI/component/handoff product, and its AI is aimed at marketing content, not at interaction patterns in a monorepo. The realistic Adobe risk vectors:

1. **As an asset supplier upstream** of AntiProd's users (Firefly-generated imagery/vectors flowing into designs) — an integration opportunity, not a threat.
2. **As a future acquirer** trying yet again to buy relevance in product design (it has the cash and the demonstrated willingness). If AntiProd becomes a category-defining design-engineering OS, Adobe is a plausible eventual acquirer.
3. **Indirect:** Adobe's failure is AntiProd's lesson — owning a category requires owning the *collaborative workflow*, not just the best individual tool. Adobe lost precisely because it optimized single-player creative power while Figma optimized multiplayer workflow.

**Recommendation:** treat Adobe as upstream-asset integration + potential acquirer, not as a competitive threat to design for.

---

## Part 2: Sketch and Why Figma Won

The Sketch-to-Figma transition is the single most instructive incumbent-displacement story in the design-tool space, and it should anchor AntiProd's go-to-market thinking.

### 2.1 What Sketch built

Sketch (Mac-only, launched ~2010) **invented the modern UI design tool**. Before Sketch, UI designers used Photoshop (raster-first, ill-suited to interfaces). Sketch delivered: a vector-first canvas built for screens, **reusable symbols/component libraries**, artboards, a lightweight and fast native app, and — crucially — a **thriving third-party plugin ecosystem**. It defined the category's conventions and was the default for a generation of product designers.

### 2.2 Why Figma displaced Sketch — and the single biggest factor

Figma matched Sketch's core design capabilities (initially it was arguably *worse* at raw drawing) but changed the *workflow model*. Contributing factors: cross-platform (browser-based, not Mac-only), no file-versioning/handoff pain, a strong community/template ecosystem, and free-tier accessibility.

**The single biggest factor: browser-based real-time collaboration.** This was the wedge. Sketch's model was single-player: design alone, then *export-and-email/share* a static file. Figma made the artifact a **live URL** that PMs, engineers, researchers, and execs could open, comment on, and inspect with zero install. The value wasn't a better pen tool — it was collapsing the share/handoff loop from a painful export ritual to "here's a link." Multiplayer-by-default beat single-player-with-better-features.

This is the load-bearing insight: **designers (and their organizations) switched for a workflow change, not a feature change.**

### 2.3 What Sketch did in response

Sketch reacted by adding web-based collaboration, a web app for viewing/inspecting, and Teams/Workspace features to close the multiplayer gap.

**Did it work?** Not for reclaiming dominance. The response was real but late and architecturally constrained (the editor stayed Mac-native; the web layer was bolted on rather than the foundation). It stemmed total collapse but did not reverse the share shift. By the time Sketch had a credible collaborative story, Figma owned the network effects, the community libraries, and the org-wide default-tool position.

### 2.4 Sketch today

Sketch is **declining but alive and profitable**. Reported figures: ~1M+ users and a notable enterprise/brand customer list (Netflix, Google, Boeing, Target, Epic Games, Motorola, Porsche cited). But market share is small — by 2023 Figma was cited at ~90% designer usage versus Sketch in the low single digits (~4.5%). Sketch took modest funding (~$20M) after years of profitability and now runs as a *smaller, sustainable business serving a loyal Mac-centric base* rather than a category leader. It is not growing into Figma's territory; it is holding a niche.

### 2.5 Lessons for AntiProd

This is the most important part of the section for AntiProd's strategy:

1. **Workflow beats features.** Designers switch tools when the *collaboration/handoff model* changes, not when a competitor ships a marginally better canvas. Figma's win was distribution and multiplayer, not drawing primitives. AntiProd's wedge must be a *workflow* improvement (the design-engineering / monorepo loop), not just a nicer editor.
2. **Be multiplayer/native to the new substrate from day one.** Sketch lost partly because collaboration was retrofitted onto a single-player native app. For AntiProd, the analogous substrate is the *codebase/monorepo*: being code-native and engineer-native from the start is the equivalent advantage. A retrofit will lose to a tool architected for the new model.
3. **Reach the whole org, not just the designer.** Figma won by making non-designers (PMs, engineers, execs) first-class participants. AntiProd similarly wins by making *design engineers and the build pipeline* first-class, not by being a designer-only island.
4. **Incumbents respond too late and too architecturally constrained.** Figma will eventually try to defend against AntiProd; the Sketch lesson says incumbents bolt on rather than rearchitect. AntiProd should pick a wedge Figma *structurally* cannot match cheaply (deep monorepo/code-truth integration).
5. **A losing incumbent doesn't die — it shrinks to a profitable niche.** Sketch survives. So displacement is about *capturing the growth/default position*, not killing the incumbent.

---

## Part 3: Interaction and Animation Tools

This layer is where designers define the *interaction patterns* AntiProd aims to track. The tools split into two families: **prototyping/interaction-spec tools** (ProtoPie, Principle, Origami) and **production-animation/runtime tools** (Rive, Lottie). The distinction matters because their developer-handoff stories — and therefore their relevance to AntiProd — are completely different.

### 3.1 ProtoPie

- **What it does:** high-fidelity, no-code interactive prototyping using a Trigger/Object/Response model. Spans mobile, web, smartwatch, automotive, and IoT.
- **Who uses it & for what:** UX designers, PMs, and developers at enterprises — Microsoft, Google, Meta, BMW, Mercedes-Benz, Ford, J&J MedTech, Medtronic. Heavy in **automotive and device UX** (ProtoPie Connect drives real hardware — steering wheels, infotainment) and stakeholder validation/user testing before build.
- **Design-to-engineering handoff:** strong *spec* story, weak *output* story. ProtoPie Handoff produces an interactive specification — scrubbable timeline, easing parameters, start/end properties, timings — so developers get a frame-by-frame intended-behavior guide. But the developer **re-implements** from the spec; ProtoPie does not emit production code/runtime. This is the classic prototyping-tool handoff gap: the prototype is documentation, not shippable artifact.
- **AI:** ProtoPie AI (open beta) generates *editable blueprints* (triggers, responses, formulas, conditional logic) rather than finished prototypes — a "hybrid" speed-with-control positioning.
- **Roadmap:** **[Confirmed]** AI-assisted authoring; **[Inferred]** continued enterprise/automotive depth; **[Speculative]** richer handoff/recording fidelity.

### 3.2 Rive

- **What it does:** an interactive animation *engine + editor*. Designers build animations plus the **State Machine** (states, transitions, inputs) and **data binding** (bind animation properties to live numbers/booleans/strings) in one tool.
- **Who uses it & for what:** Spotify, Duolingo, Disney, Google, automakers. Used for interactive mascots, real animated UI, games, and device/vehicle interfaces — anywhere motion is part of the UX *logic*.
- **Design-to-engineering handoff — this is the key one:** Rive's output is a **real runtime artifact**. The `.riv` file is loaded by official runtimes (Web/WASM, iOS, Android, Flutter, Unity, React via `@rive-app/react-canvas`), and developers bind it to app variables/events/state. Reported gains vs. After Effects/Figma/Lottie/CSS pipelines: ~4x faster production, up to ~90% smaller files. **There is no re-implementation gap** — the same file the designer made *runs in production* and reacts to live data. This is the most "design-engineering-native" tool in the set.
- **AI:** less AI-forward than ProtoPie/Lottie; the differentiation is the state machine + data binding, not generative AI.
- **Roadmap:** **[Confirmed]** deeper data binding and runtime breadth; **[Inferred]** positioning Rive as a *Lottie replacement* for interactive UI; **[Speculative]** more app-UI (not just animation) construction inside Rive.

### 3.3 Lottie / LottieFiles

- **What it does:** **Lottie is a JSON-based animation file format**, not primarily a tool — designed so animations ship as easily as static assets. LottieFiles is the surrounding ecosystem: library, web editor (Lottie Creator), Figma plugin, optimizer, hosting/CDN, and team workspace.
- **Who uses it & for what:** effectively ubiquitous for lightweight UI motion — onboarding flows, loading indicators, micro-interactions, animated icons — across web and mobile. 5M+ users, 250k+ companies (Google, Airbnb, Disney, Duolingo, Instacart, etc.). Note a nuance: by export volume SVG still dominates (~60-70%) vs. Lottie (~5-7%), so it's the *standard for animated UI* but a smaller slice of total asset exports.
- **Design-to-engineering handoff:** strongest *format* story in the set. Output formats: Lottie JSON, optimized JSON, dotLottie, optimized dotLottie; handoff via CDN links, runtimes, VS Code integration, Figma Dev Mode embed codes. **The handoff problem is fidelity/QA, not re-implementation:** designers must keep layer names sane, avoid unsupported After Effects effects, and *test on the actual target platform* (iOS/Android/web rendering can diverge). It's a passive-asset format — great for "play this animation," historically weak for interactivity.
- **AI & interactivity (recent, important):** late-2025 **dotLottie state machines** add Rive-style interactive, input/data/trigger-driven animations *without code*, and **Lottie Creator added AI logic generation** (describe the interaction, it builds the state machine). Lottie is moving onto Rive's turf.
- **Roadmap:** **[Confirmed]** dotLottie state machines + AI logic generation; standardization (Linux Foundation member, IANA-registered MIME type/extension); **[Inferred]** open-ecosystem velocity vs. Rive's controlled depth; **[Speculative]** Lottie-as-interactive-runtime maturing.

### 3.4 Principle and Origami Studio (Meta)

- **Principle:** Mac-only animation/interaction-design tool. Still available but *no longer prominent* — increasingly cited as an "alternative" rather than a primary tool. Effectively a legacy player in slow decline; minimal handoff/AI story. Low strategic relevance.
- **Origami Studio (Meta):** free, patch/node-based tool for **high-complexity prototyping**, actively maintained, used internally at Meta for Facebook/Instagram/WhatsApp/Quest. Powerful but steep learning curve and no production-code output — it's an internal-grade exploration/spec tool. Niche outside Meta-style orgs.

### 3.5 The key question: integrate, replace, or ignore?

AntiProd tracks interaction patterns across a product. These tools are where designers *define* those patterns. The right answer differs by family, and the dividing line is **whether the tool's output is shippable code/runtime or just a spec.**

**Verdict: integrate selectively (Rive, Lottie), ignore the rest, replace nothing.**

1. **Integrate with Rive and Lottie — they are the source of truth for interaction/motion that actually ships.** Their outputs (`.riv`, Lottie/dotLottie JSON) are real runtime artifacts that live *in the codebase/monorepo* — exactly AntiProd's domain. A design engineer ships these files; AntiProd should *detect, index, and track* them as first-class interaction patterns (which `.riv`/Lottie assets exist, where they're used, their states/inputs, drift between design and code). This is a natural, high-leverage integration and directly serves the "track interaction patterns" mission. dotLottie/Rive state machines are increasingly the canonical, code-resident definition of an interaction — AntiProd should read them, not recreate them.

2. **Ignore (don't integrate deeply with) ProtoPie/Principle/Origami.** Their output is a *spec/documentation*, not a shippable artifact, and it does not live in the monorepo. They sit upstream of the build and get re-implemented by hand. Tracking a ProtoPie prototype tells AntiProd about *intent*, but the truth AntiProd cares about lives in the implemented code. At most, treat these as optional upstream references; they are not where the durable interaction pattern lives.

3. **Replace nothing.** Building an animation/state-machine *authoring* engine to compete with Rive would repeat Adobe's mistake (single-tool excellence) and Sketch's mistake (re-fighting an entrenched, network-effected incumbent). AntiProd's advantage is the **monorepo/code-truth layer underneath these tools**, not the authoring canvas on top. The defensible position is to be the system that *understands and tracks the interaction patterns as they exist in code* — including the Rive/Lottie artifacts engineers commit — across the whole product.

**Strategic framing:** the interaction-tool layer is fragmenting into "spec tools" (re-implemented, upstream, not code-resident) and "runtime tools" (Rive/Lottie — code-resident, shippable). AntiProd should anchor to the *code-resident* side, because that is where interaction patterns become ground truth in a monorepo — and that is the one place Figma, Adobe, and the prototyping tools structurally do not own.

---

## Sources

**Adobe — Figma acquisition / aftermath**
- [Figma blog: Figma and Adobe are abandoning our proposed merger](https://www.figma.com/blog/figma-adobe-abandon-proposed-merger/)
- [Adobe newsroom: Adobe and Figma mutually agree to terminate merger](https://news.adobe.com/news/news-details/2023/adobe-and-figma-mutually-agree-to-terminate-merger-agreement)
- [CNBC: Adobe and Figma call off $20 billion merger](https://www.cnbc.com/2023/12/18/adobe-and-figma-call-off-20-billion-merger.html)
- [Bloomberg: Adobe gives up on XD after Figma deal collapse](https://www.bloomberg.com/news/articles/2024-01-30/adobe-gives-up-on-xd-after-figma-deal-collapse)
- [Yahoo Finance: Adobe's failed Figma acquisition cost analysis](https://finance.yahoo.com/news/adobe-failed-acquisition-figma-cost-151035766.html)
- [DesignWhine: Figma IPO analysis](https://www.designwhine.com/figma-ipo/)

**Adobe — Firefly / Express / roadmap**
- [AI Business Weekly: Firefly vs Midjourney vs DALL-E vs Stable Diffusion](https://aibusinessweekly.net/p/ai-image-generators-compared)
- [LumiChats: Best AI image generators 2026](https://lumichats.com/blog/best-ai-image-generators-2026-midjourney-dalle-stable-diffusion-firefly-comparison)
- [Adobe Blog: Firefly expands video and image creation (Mar 2026)](https://blog.adobe.com/en/publish/2026/03/19/adobe-firefly-expands-video-image-creation-with-new-ai-capabilities-custom-models)
- [Adobe newsroom: MAX 2025 Firefly / GenStudio](https://news.adobe.com/news/2025/10/adobe-max-2025-genstudio)
- [Adobe Blog: Introducing vector recoloring with Firefly](https://blog.adobe.com/en/publish/2023/04/24/introducing-vector-recoloring-with-adobe-firefly-1)
- [Adobe helpx: Generate vectors using text prompts](https://helpx.adobe.com/firefly/web/generate-vectors/text-to-vector/generate-vectors-using-text-prompts.html)
- [Paperlike: Adobe Express vs Canva (2025)](https://paperlike.com/blogs/paperlikers-insights/adobe-express-vs-canva)

**Adobe XD discontinuation**
- [Mondo: Adobe XD discontinued — implications](https://mondo.com/insights/adobe-xd-discontinued-implications-for-creatives-employers/)
- [UXness: The phasing out of Adobe XD](https://medium.com/uxness/the-phasing-out-of-adobe-xd-what-you-need-to-know-in-2024-b78ee35caef4)

**Sketch vs Figma**
- [Sketch: Figma to Sketch — reasons to switch](https://www.sketch.com/vs/figma/)
- [IdeaPlan: How Figma won the design tool market](https://www.ideaplan.io/blog/how-figma-won-the-design-tool-market)
- [Utility: Why Figma replaced Sketch](https://utility.agency/resources/what-is-figma-what-are-all-its-features-and-why-did-it-replace-sketch-as-the-leading-design-software-for-ux-ui-designers)
- [Medium: Analysis of the declining popularity of Sketch in favor of Figma](https://medium.com/@romin991/analysis-of-the-declining-popularity-of-sketch-in-favor-of-figma-c914d34e0644)
- [Brett Cooke: Figma didn't kill Sketch](https://www.brettcooke.io/posts/figma-didnt-kill-sketch/)
- [Contrary Research: Figma business breakdown](https://research.contrary.com/company/figma)

**Interaction & animation tools**
- [ProtoPie: AI beta launch](https://www.protopie.io/blog/protopie-ai-beta-launch)
- [ProtoPie: how to shift-left with high-fidelity prototyping](https://www.protopie.io/blog/how-to-shift-left-with-high-fidelity-prototyping)
- [Rive — the interactive experience engine](https://rive.app/)
- [Rive: how state machines work](https://rive.app/blog/how-state-machines-work-in-rive)
- [Rive vs Lottie](https://rive.app/blog/rive-as-a-lottie-alternative)
- [Codrops: integrating Rive into a React project](https://tympanus.net/codrops/2025/05/12/integrating-rive-into-a-react-project-behind-the-scenes-of-valley-adventures/)
- [LottieFiles: what is Lottie](https://lottiefiles.com/what-is-lottie)
- [LottieFiles: handoff & embed](https://help.lottiefiles.com/hc/en-us/articles/8704650653593-Handoff-Embed)
- [LottieFiles or Rive: which fits your needs](https://lottiefiles.com/blog/lottie-animations/lottiefiles-or-rive)
- [SVGator: why users prefer SVG over Lottie](https://www.svgator.com/blog/why-users-prefer-svg-over-lottie/)
- [Lottie Animation Community](https://lottie.github.io/)
- [Origami Studio release notes](https://origami.design/releases/)
- [Slant: Origami vs Principle (2025)](https://www.slant.co/versus/5787/23940/~origami_vs_principle)
- [Hack Design: Origami Studio toolkit](https://www.hackdesign.org/toolkit/origami-studio/)
