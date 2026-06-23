# The Design Tools Graveyard: Why They Failed and What It Means for AntiProd

**Report scope:** InVision, Adobe XD, Abstract, Avocode, Sympli, Zeplin, Marvel, Origami Studio, UXPin, and the broader pattern
**Date:** June 2026
**Audience:** AntiProd strategy
**Central question:** Multiple well-funded companies tried to own the design-collaboration / design-to-dev space and lost. Why? Is there a single pattern, and does AntiProd share any of these failure modes?

---

## Executive Summary

The design-tools graveyard is large and well-funded. InVision raised $350M+ and peaked near a $2B valuation before shutting down entirely. Adobe — the most resourced creative-software company on earth — built Adobe XD from scratch, gave it Creative Cloud distribution, and abandoned it. Abstract raised ~$30M to bring Git to design and is fully sunsetting in early 2026. Avocode, Sympli, Zeplin, Marvel, and UXPin are each dead, declining, or relegated to a shrinking niche.

The instinct is to credit a single killer: **Figma**. That is half-true and strategically dangerous to over-index on. The deeper pattern is this: **every one of these tools was a feature, not a platform.** Each occupied one slice of the design workflow — prototyping, handoff, inspection, versioning, collaboration — and depended on living *next to* or *on top of* the tool where the actual design work happened. When Figma collapsed the entire workflow into one web-native, real-time canvas, every single-slice tool became a tab the user could close. Figma didn't beat them on their feature; it made their feature a checkbox inside a larger, stickier surface.

There is a second, subtler pattern that matters even more for AntiProd in 2026: **the moat in design tools is shallow and keeps moving.** Photoshop lost UI design to Sketch. Sketch lost it to Figma. Figma is now under pressure from AI-native tools. Each generation's killer feature becomes the next generation's table stakes. A tool that wins on a single capability is always one platform shift away from irrelevance.

For AntiProd — building a unified design OS where design and engineering converge, with version control via monorepo branches — the relevant lessons are precise:
- **Don't be a feature looking for a platform** (the InVision / Avocode / Zeplin death).
- **Don't depend on a platform that can absorb you** (the Sketch-companion trap that killed InVision's original business and threatens any "layer on top of Figma").
- **Version control for design failed once already** (Abstract) for reasons AntiProd must directly confront, because AntiProd is also selling design + version control.
- **Resources and distribution are not a moat** (Adobe XD proves this definitively).
- **The AI shift is reshuffling the deck right now**, which is both AntiProd's opportunity and its risk.

---

## InVision — the $2B cautionary tale

### What it was
InVision launched in 2011 as a design *collaboration and prototyping* layer. Designers built screens in Sketch or Photoshop, then uploaded them to InVision to create clickable prototypes, gather stakeholder comments, and hand off to developers. It solved a real and painful problem: static design files were terrible for communicating intent, getting feedback, and aligning teams. InVision made designs feel alive and made feedback centralized.

### Why it initially succeeded
- It nailed **collaboration and stakeholder communication** before anyone else — the "job to be done" was helping non-designers understand and react to designs.
- It was **tool-agnostic**: it sat on top of Sketch and Photoshop, so it rode their adoption without competing with them.
- It built a genuine **brand and community** in the design world (the "Design Better" content, Design Disruptors film). It reached unicorn status in 2017, raised over $350M across ~10 rounds, peaked near a **$2B valuation**, and crossed **$100M+ ARR by December 2018** with ~1,200 employees.

### What killed it
This is the most instructive failure in the space, and it was **self-inflicted as much as Figma-inflicted**:

1. **Platform-dependency was an existential flaw from day one.** InVision's whole business sat *on top of* Sketch/Photoshop. Nothing stopped those tools — or a newcomer — from building collaboration natively. That is exactly what happened.

2. **Figma collapsed the workflow.** When Figma made design + prototyping + commenting + handoff happen in one real-time, browser-based, "Google Docs for design" canvas, the entire reason to upload to a separate InVision tool evaporated. The handoff step InVision owned simply ceased to exist as a separate step.

3. **Studio was too late and aimed at the wrong target.** InVision saw the platform risk and tried to build its own editor, **InVision Studio**, to escape dependency on Sketch. But Studio was conceived as a **Sketch competitor**, not a Figma competitor — fighting the last war. Promised for January 2018, it shipped late, suffered performance problems and limited functionality, never got real adoption, and was then **left to rot without meaningful updates for years**.

4. **Strategic sprawl instead of focus.** Rather than defending its core, InVision pursued becoming "the Salesforce of the design world" (CEO Clark Valberg, 2019 TechCrunch interview). It launched Boards, Freehand, and **Design System Manager (DSM)** — which users called "half-baked," and which salespeople reportedly couldn't articulate the value of. It bolted on acquisitions (Silver Flows, Muzli, TrackDuck, Wake) that "barely worked" and were never thoughtfully integrated.

5. **Neglected the core product.** While resources went to new bets, the core collaboration product stayed "clunky, slow, and limited." Users famously begged for basic features like folders — which reportedly took *five years* to ship.

6. **Technical debt slowed everything.** An over-ambitious microservices architecture became unsustainable and forced a painful re-consolidation, slowing the company's ability to ship while a young, fast Figma iterated freely.

### Inflection point
**2016–2019.** Figma launched publicly in September 2016; Adobe XD launched March 2016. By 2019, InVision had shifted from "creating its own market" to fighting on multiple fronts at once. That's the moment the company stopped leading and started reacting. Revenue then **fell ~50% to roughly $50M by 2022.**

### Recovery attempts and outcome
- Studio (failed), DSM/Boards/Freehand (failed to anchor the business), multiple acquisitions (poorly integrated).
- **November 2023:** sold Freehand (its visual-collaboration product) to **Miro** — widely read as a liquidation of the remaining valuable asset.
- **January 2024:** announced it would shut down all design-collaboration services by end of 2024. Headcount had already shrunk from 1,200+ to ~600 and then to near zero.
- **Outcome: dead.** A clean tombstone, not a zombie.

### Why $350M couldn't save it
Money bought headcount, acquisitions, and marketing — none of which fixed the core problem: **InVision owned a workflow step that a better-architected competitor deleted.** Capital let InVision *do more things badly* (sprawl) instead of forcing the painful focus that might have produced a real Figma competitor early. Funding is fuel, not direction; pointed at the wrong strategy, it accelerated the crash.

### Lesson for AntiProd
This failure mode is **directly relevant** — AntiProd is also a collaboration/convergence layer. The defenses AntiProd must be able to articulate:
- **Own the surface where work actually happens, not a step beside it.** If AntiProd is where design *and* code converge and live, it isn't a handoff tab someone closes. If it's a layer bolted onto Figma + a repo, it has InVision's disease.
- **Don't build on a platform that can absorb you.** Anything that is "Figma + extras" can be eaten by Figma adding the extra. AntiProd's wedge has to be something the incumbent structurally can't or won't do (deep code/repo integration is plausibly that).
- **Resist sprawl; protect the core.** InVision died launching six mediocre products instead of one great one. AntiProd should ship one thing that is undeniably better than the status quo before fanning out.

---

## Adobe XD — proof that distribution and resources are not a moat

### What it was and why it had every advantage
Adobe XD (launched March 2016) was Adobe's purpose-built UI/UX design and prototyping tool, built largely from scratch to replace the awkward use of Photoshop/Illustrator for interface work. It had everything a startup would kill for: **Adobe's brand, Creative Cloud bundling and distribution, an enormous installed base of creative professionals, and effectively unlimited resources.**

### Why it still lost
- **It was a desktop-first, single-player tool in a world that had moved to real-time, browser-native collaboration.** XD trailed Figma precisely where it mattered: multiplayer editing, instant share-by-link, zero-install collaboration. Designers' own feedback to Adobe centered on the lack of real-time collaborative features.
- **Adobe's strategic answer was to buy the winner, not out-build it.** In September 2022 Adobe agreed to acquire **Figma for $20B** — implicitly conceding XD had lost. From that point, internal investment in XD effectively stopped; Adobe halted individual XD sales and shipped no major updates. XD was abandoned *before* the deal even closed.
- **Then the deal died.** In December 2023, after EU and UK regulators (the European Commission and the CMA) signaled they would block it on competition grounds, Adobe and Figma abandoned the merger. Adobe paid a **$1B termination fee.** With no Figma to fold XD into, Adobe's rationale for XD was gone.

### Inflection point and outcome
**June 2023:** Adobe announced XD's discontinuation as a standalone app; it went into maintenance mode (security/bug fixes only, no new features), individual sales pulled. **Outcome: zombie/discontinued.** Adobe was left having spent years and a $1B breakup fee, with no competitive design tool and its users already gone to Figma.

### Lesson for AntiProd
The brutal one: **a giant's distribution and money do not guarantee victory in design tools.** Adobe had the best possible distribution and still couldn't dislodge Figma, because the product paradigm (real-time, web-native, collaboration-first) mattered more than reach. For AntiProd this cuts two ways:
- *Encouraging:* Incumbents (including Figma itself, and Adobe) can be beaten on paradigm. Being late and well-funded is not enough; being *structurally different* is what wins.
- *Cautionary:* AntiProd cannot win merely by being "Figma-adjacent with better handoff." That's an XD-style trailing-feature play. The convergence of design and engineering must be a *new paradigm*, not a faster horse.

---

## Abstract — why "Git for design" failed (the one AntiProd must study hardest)

### What it was
Abstract launched in 2017 as **version control for design** — explicitly "Git for designers." It wrapped Sketch files in a branching/merging/commit model: designers worked on branches, committed changes, opened the design equivalent of pull requests, and merged into a main line, with full version history and visual diffs. It raised roughly **$30M**, signed up thousands of companies, and had real early traction with design-ops-mature orgs (Wayfair, Cisco, DocuSign, Microsoft, Zendesk).

### Why it initially succeeded
It named and solved a genuine pain: design files were a mess of `final_v3_FINAL.sketch` chaos with no history, no safe experimentation, and no merge story. For large, sophisticated design teams, structured versioning was real value.

### What killed it
1. **It was a layer on top of Sketch — the InVision disease again.** Abstract's entire value depended on Sketch files. When the design world migrated off Sketch to Figma, Abstract's substrate disappeared. Abstract scrambled to add Adobe XD support, but XD was itself dying.
2. **Figma made versioning a built-in feature.** Figma's cloud-native model gave automatic version history, named versions, and branching *inside the canvas* — no separate tool, no commit ceremony. Abstract's core feature became a free checkbox in the tool everyone already used.
3. **The Git mental model was too heavy for most designers.** Branch/commit/merge is natural to engineers and alien to most designers. The ceremony Abstract imposed was friction that only design-ops-heavy enterprises tolerated; the broad market never wanted it. Version control for design failed not just because Figma absorbed it, but because **most designers didn't want explicit version control at all** — they wanted *not to think about it*, which cloud autosave + named versions delivered.

### Inflection point, recovery, outcome
- **2021:** Abstract restructured hard, laid off much of its staff, and retrenched toward enterprise design-ops as Figma's ascent gutted the Sketch ecosystem it depended on.
- **January 2022:** Adobe acquired Abstract's *Notebooks* product (documentation/review), not the company — a partial asset sale, the InVision-Freehand pattern again.
- **November 2025:** Abstract announced it would **fully sunset on January 31, 2026**, with data export through April 30, 2026.
- **Outcome: dead** (long zombie tail from 2021 to 2026).

### Lesson for AntiProd — read this twice
**AntiProd is also selling design + version control (via monorepo branches). Abstract is the ghost AntiProd most resembles, so this failure mode applies and must be addressed head-on.** The three things AntiProd must get right where Abstract got them wrong:

1. **Don't sit on a substrate you don't control.** Abstract versioned *someone else's files* (Sketch's). AntiProd's branches must be over a surface AntiProd owns end-to-end (the monorepo and the design state that lives in it), so no platform migration can pull the rug out.

2. **Make version control invisible, not ceremonial.** Abstract lost because explicit branch/commit/merge was friction most designers rejected; Figma won versioning by making it disappear. AntiProd's advantage is that its version control is *the same Git the engineers already use* — but that only helps designers if AntiProd hides the ceremony for them. If AntiProd makes designers learn Git, it inherits Abstract's adoption ceiling. The model should be: engineers see branches and PRs; designers see "versions" and "proposals" — same underlying truth, no Git literacy required.

3. **Version control alone is not a business — it's a feature of the platform.** Abstract was *only* versioning, so when versioning got commoditized it had nothing left. AntiProd's versioning must be a property of a converged design+code OS, not the product itself. The defensibility comes from the convergence (design and code on one branch model), not from "we do design versioning."

---

## Avocode — the handoff/inspection tool that got absorbed and shut down

### What it was
Avocode was a **design-inspection and developer-handoff** tool: developers could open and inspect designs from Sketch, Photoshop, XD, Illustrator, and Figma — extracting specs, measurements, assets, and code snippets — without owning the source design apps. It added version history and visual diffing.

### Why it failed
- **Pure single-slice handoff tool.** Its only job was the design→dev inspection step. The moment Figma added inspect/handoff (and later **Dev Mode** in 2023) inside the canvas, the standalone inspector lost its reason to exist.
- **It depended on importing other tools' files** — again, no owned substrate.

### Outcome
The team was absorbed into **Ceros** (an interactive-content company — *not* GitLab; the brief's "GitLab" attribution is incorrect, though the takeaway is the same), and **all Avocode products were sunset on October 1, 2023.** Outcome: **dead via acqui-hire.** The product had no independent future because its single feature had been swallowed by the platform.

### Lesson for AntiProd
The cleanest illustration of "**a handoff tool is a feature, not a company.**" AntiProd must not position itself as "better handoff." Handoff is the step Figma already absorbed and AI tools are now automating. AntiProd's claim has to be that it *eliminates* the handoff gap by keeping design and code on one model — not that it makes the handoff document prettier.

---

## Zeplin, Sympli, Marvel, Origami, UXPin — the supporting cast

**Zeplin** — design-to-dev handoff, specs, and style guides, generated from Sketch/Figma exports. Beloved by engineering teams for purpose-built, deep handoff. Its problem: **Figma Dev Mode (2023) put handoff inside the tool designers already use**, with no export step and live updates. For teams on Figma, Dev Mode is a "side-grade" that wins on *zero friction* rather than feature superiority. Zeplin survives as a shrinking, handoff-only niche — the textbook **zombie**: alive, but boxed into a slice that the platform is steadily reclaiming.

**Sympli** — design collaboration, version control, and handoff (Sketch/XD/Figma). Same single-slice exposure as Zeplin and Avocode. **Sympli Handoff and Versions shut down December 31, 2024** after ~10 years. Outcome: **dead.** Same cause: the slice it owned got absorbed into the canvas.

**Marvel** — early, friendly prototyping/handoff tool that won on simplicity for non-experts and education. Never built a defensible moat; users report years of stagnation with little new shipped, and the Android app was discontinued. Outcome: **declining zombie**, surviving on a low-end/education niche Figma doesn't prioritize.

**Origami Studio** — Facebook's free, powerful interaction/prototyping tool (still maintained internally, e.g. Origami Studio 3). It's genuinely capable but has a **steep learning curve and a narrow use case** (high-fidelity interaction prototyping). Outcome: **permanent niche** — never intended as a business, never broke out, proving that *power without accessibility* caps adoption.

**UXPin (Merge)** — the most conceptually adjacent to AntiProd: UXPin Merge lets designers build prototypes from **real React/Storybook code components**, so the prototype *is* the code. This is a real attempt at design/code convergence. Yet it has stayed a small niche (a fraction of Figma's user base; tiny review counts by comparison). Why: **steep learning curve, heavy setup, and a target audience limited to engineering-driven teams with mature design systems.** Outcome: **stagnant niche.** The cautionary note for AntiProd is sharp — *convergence of design and code is not automatically a winning product.* UXPin proves the idea can be right and the adoption still fail if the on-ramp is too steep and the audience too narrow.

---

## Pattern Recognition: Why Design Tools Die

Looking across all of them, the failures rhyme. There are **four recurring death mechanisms**:

### 1. The "feature, not a platform" trap
InVision, Avocode, Zeplin, Sympli, Marvel, and Abstract each owned **one step** of the workflow: prototyping, inspection, handoff, versioning, collaboration. A single-step tool is only defensible while that step is a separate, painful step. Figma's core innovation was **collapsing the workflow** — design, prototype, comment, version, hand off, inspect, all in one real-time canvas. Once the steps merged, every between-the-steps tool became an unnecessary tab. *The boundary between tools is exactly where these companies built their businesses, and Figma erased the boundaries.*

### 2. The substrate-dependency trap
Almost every dead tool sat **on top of someone else's files** — Sketch, Photoshop, XD, or Figma. InVision rode Sketch; Abstract versioned Sketch; Avocode/Zeplin/Sympli inspected exported files. This created two fatal exposures: (a) the substrate could build your feature natively (and did), and (b) when the substrate itself got replaced (Sketch → Figma), your business migrated out from under you. **You cannot build a durable company on a platform that can absorb your feature or be replaced beneath you.**

### 3. The moving-moat / commoditization trap
The design-tool moat is **shallow and keeps sliding**. Photoshop → Sketch → Figma → (now) AI-native tools. Each generation's killer feature becomes the next generation's free baseline. Real-time collaboration, version history, handoff, and prototyping were all once differentiators; all are now table stakes. A tool that wins on *a feature* is always one paradigm shift from obsolescence. The winners win on a **new paradigm** (web-native + real-time, in Figma's case), not a better feature.

### 4. The wrong-war / wrong-user / sprawl trap
InVision built Studio to beat *Sketch* while the war had moved to *Figma*. Abstract and UXPin imposed an engineer's mental model (branches; code components) on designers who didn't want it. InVision sprawled into six products and starved its core. Adobe tried to buy its way out instead of out-building. The common thread: **misreading where the puck was going, who the user actually is, and what they actually want.**

**The meta-truth about this market:** Design tools are **hard to build** (real-time, performant, cross-platform canvases are genuinely difficult — InVision's microservices mess and Studio's perf problems show it), **hard to distribute** (Adobe had the best distribution on earth and still lost — distribution doesn't beat paradigm), and **hard to defend** (the moat is shallow and the workflow keeps re-collapsing into whatever owns the canvas). Winning requires owning the *whole* surface where work happens, with a paradigm the incumbent structurally can't copy — and even then, the next platform shift (today: AI) can reset the board. That last point is live right now: a growing segment of designers is questioning Figma itself, with only ~33% of Figma's user base being designers (≈30% developers, ≈37% other roles) — and that non-designer base becomes a *liability* the moment those people can get an AI agent to design for them. **The same collapse Figma performed on InVision is the collapse AI may perform on Figma.** That window is AntiProd's opening — and its warning.

---

## How AntiProd Avoids These Failure Modes

Honest assessment, failure mode by failure mode:

**vs. "feature, not a platform" (InVision/Avocode/Zeplin/Sympli):**
AntiProd is, by design, a *converged OS* rather than a between-the-steps tool — that's the right instinct. But the risk is real: if AntiProd ships as "Figma + a nicer handoff to a repo," it *is* a between-the-steps tool and dies the same death. **The defense:** AntiProd must own the surface where design and code actually live together, so there is no separate step to absorb. The convergence has to be the product, not a bridge between two products someone else owns.

**vs. substrate dependency (the trap that killed nearly everyone):**
This is AntiProd's single most important strategic decision. If AntiProd renders/edits design *on top of* Figma files or *on top of* a repo it merely reads, it has Abstract's and InVision's fatal exposure — Figma can absorb the feature, or migration can pull the substrate away. **The defense:** AntiProd must own its substrate — the converged design+code state in the monorepo — end to end. The branch model and the design state should be AntiProd's own ground truth, not a layer reflecting someone else's files. If any part of AntiProd is "a layer on Figma," that part is a future tombstone.

**vs. "Git for design" / version-control-for-design (Abstract — the closest analog):**
This is where AntiProd most resembles a dead company, so be blunt. Abstract died because (a) it versioned someone else's files, (b) explicit branch/commit/merge ceremony was friction most designers rejected, and (c) versioning alone was a commoditizable feature. **AntiProd's defenses must be:** version control as an *invisible property* of the OS, not a ceremony — engineers see branches/PRs, designers see "versions/proposals," same Git truth underneath, zero Git literacy required of designers. And crucially, versioning must be a *consequence* of the converged model (design and code on one branch), never the headline product. If AntiProd makes designers learn Git, it inherits Abstract's adoption ceiling exactly.

**vs. distribution-and-money-aren't-enough (Adobe XD):**
AntiProd will never out-distribute Adobe or Figma, and XD proves distribution wouldn't save it anyway. **The defense is paradigm, not reach:** win because design-and-engineering-converged-on-one-model is a genuinely new way of working that the incumbents *structurally cannot copy* without dismantling their own model (Figma's whole architecture separates design from code; a real merge is hard for them to retrofit). AntiProd's bet must be paradigm-level, not feature-level.

**vs. wrong-war / steep on-ramp (Studio, UXPin):**
UXPin is the warning that *even the right idea (design = code) fails if the on-ramp is too steep and the audience too narrow.* **The defense:** AntiProd must make the converged model usable by ordinary designers, not only engineering-driven teams with mature design systems. The convergence has to *reduce* friction for designers (autosave-grade ease, no Git ceremony), not add it. If AntiProd is only adoptable by elite design-ops orgs, it has UXPin's ceiling.

**vs. the moving moat / AI reset (the live threat to Figma itself):**
The shallow, sliding moat is the permanent condition of this market — there is no escaping it, only riding it. **The defense is to be the paradigm shift, not its victim.** AI is collapsing design and code generation right now; the tools that own *only* the canvas (Figma) are exposed exactly as InVision was. AntiProd's converged design+code+version-control model is plausibly *more* AI-native than a pure canvas, because AI agents work in code and branches. AntiProd's durability comes from owning *design memory and design-as-constraint over a versioned code substrate* — the thing AI codegen tools (per the parallel AI-dev-tools research) conspicuously lack. That is the lane the graveyard leaves open: not a better canvas, not a better handoff, but the converged, versioned, design-aware substrate that neither the dead tools nor today's AI tools own.

**The one-sentence summary for the investor who asks "why won't you fail like InVision?":** *InVision and the rest died because they owned a step beside the work, on a substrate they didn't control, defending a feature that got commoditized — AntiProd is built to own the converged surface where the work itself happens, on a substrate it controls, defending a paradigm (design and code on one versioned model) the incumbents structurally cannot copy.* The honest caveat: that's only true if AntiProd actually owns its substrate and hides the version-control ceremony from designers. If it ships as a layer on Figma with visible Git, it has every disease in this graveyard.

---

## Sources

- [What actually popped InVision's billion-dollar bubble — Visor](https://www.visor.us/blog/what-popped-invisions-billion-dollar-bubble/)
- [Lessons from InVision's $2B failure — Failory](https://newsletter.failory.com/p/lessons-from-invision-s-2b-failure)
- [InVision, former UX trailblazer, is shutting down in the era of Figma — Fast Company](https://www.fastcompany.com/91006037/invision-former-ux-trailblazer-ending-services-figma-adobe)
- [Why InVision Stopped and Figma Thrived — We Are Founders](https://www.wearefounders.uk/why-invision-stopped-and-figma-thrived-why-funding-doesnt-guarantee-success/)
- [What Happened to InVision & Why Did It Fail? — Sunset](https://www.sunsethq.com/blog/why-did-invision-fail)
- [InVision is shutting down — LogRocket](https://blog.logrocket.com/ux-design/invision-shutting-down/)
- [Adobe XD Discontinued: 2026 Status & Alternatives — Mapsoft](https://mapsoft.com/posts/adobe-xd-end-of-life.html)
- [The Phasing Out of Adobe XD — UXness / Medium](https://medium.com/uxness/the-phasing-out-of-adobe-xd-what-you-need-to-know-in-2024-b78ee35caef4)
- [What happened to Adobe XD and InVision — Tinkso](https://tinkso.com/blog/what-happened-to-adobe-xd-and-invision-the-death-of-prototyping-software)
- [Abstract will officially sunset — Sketch Community Forum](https://forum.sketch.com/t/abstract-will-officially-sunset/5901)
- [Adobe Completes Acquisition of Abstract's Notebooks — Adobe Blog](https://blog.adobe.com/en/publish/2022/01/10/adobe-acquires-abstracts-notebooks)
- [Abstract — Version control for Sketch](https://www.goabstract.com/)
- [Farewell to Avocode Products — Avocode/Ceros](https://avocode.com/design-hand-off)
- [Using Zeplin for design handoff vs Figma Dev Mode — LogRocket](https://blog.logrocket.com/ux-design/zeplin-design-handoff-figma-dev-mode/)
- [Sympli — Design Collaboration, Version Control & Handoff](https://sympli.io/)
- [Top 6 Figma Competitors that Product Teams Use — UXPin](https://www.uxpin.com/studio/blog/figma-competitors/)
- [UXPin Merge — Design with React components](https://www.uxpin.com/merge)
- [Origami Studio 3 — Facebook/Meta Engineering](https://tech.facebook.com/engineering/2020/9/origami-studio-3-makes-app-design-easier-than-ever/)
- [The Top 10 Alternatives to Marvel App — Piktochart](https://piktochart.com/tips/marvel-app-alternatives)
- [The Figma Crisis of 2026: Why Designers Are Quietly Switching — Medium](https://medium.com/@srivatsmutalik909/the-figma-crisis-of-2026-why-designers-are-quietly-switching-tools-276644a28cdd)
- [Figma's woes compound with Claude Design — Martin Alderson](https://martinalderson.com/posts/figmas-woes-compound-with-claude-design/)
