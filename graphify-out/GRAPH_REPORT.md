# Graph Report - AntiProd  (2026-06-19)

## Corpus Check
- 17 files · ~5,109 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 109 nodes · 95 edges · 20 communities (10 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `69cc7bbc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_TypeScript Compiler Options|TypeScript Compiler Options]]
- [[_COMMUNITY_Dev Dependencies & Tooling|Dev Dependencies & Tooling]]
- [[_COMMUNITY_App Page & Components|App Page & Components]]
- [[_COMMUNITY_Package & Runtime Deps|Package & Runtime Deps]]
- [[_COMMUNITY_NPM Scripts|NPM Scripts]]
- [[_COMMUNITY_Next.js Agent Instructions|Next.js Agent Instructions]]
- [[_COMMUNITY_App Layout & Metadata|App Layout & Metadata]]
- [[_COMMUNITY_Vercel Deployment|Vercel Deployment]]
- [[_COMMUNITY_TypeScript Config Structure|TypeScript Config Structure]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_File Icon Asset|File Icon Asset]]
- [[_COMMUNITY_Globe Icon Asset|Globe Icon Asset]]
- [[_COMMUNITY_Next.js Logo Asset|Next.js Logo Asset]]
- [[_COMMUNITY_Window Icon Asset|Window Icon Asset]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `AntiProd — `latest-test` branch` - 5 edges
3. `scripts` - 5 edges
4. `Scale DS` - 5 edges
5. `What's been built` - 4 edges
6. `computeLayout()` - 4 edges
7. `Structure` - 3 edges
8. `Agentation Setup` - 3 edges
9. `computeBarWidth()` - 2 edges
10. `defaultPillPos()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (20 total, 10 thin omitted)

### Community 0 - "TypeScript Compiler Options"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 1 - "Dev Dependencies & Tooling"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 2 - "App Page & Components"
Cohesion: 0.19
Nodes (7): ADJECTIVES, Branch, computeBarWidth(), computeLayout(), defaultPillPos(), NOUNS, RepoCanvas()

### Community 3 - "Package & Runtime Deps"
Cohesion: 0.14
Nodes (13): dependencies, agentation, next, react, react-dom, name, private, scripts (+5 more)

### Community 5 - "Next.js Agent Instructions"
Cohesion: 0.67
Nodes (3): Heed Deprecation Notices, Next.js Breaking Changes Warning, Next.js Docs in node_modules

### Community 7 - "Vercel Deployment"
Cohesion: 1.00
Nodes (3): Next.js Deployment Platform, Vercel Logo SVG, Vercel Brand / Company

### Community 8 - "TypeScript Config Structure"
Cohesion: 0.22
Nodes (8): AntiProd — `latest-test` branch, Branch build screen (`/branch/[...name]`), Key files, Repo canvas (`/`), Running locally, Scale DS — design system (`src/design-system/`), Tech stack, What's been built

### Community 16 - "Community 16"
Cohesion: 0.25
Nodes (7): Adding a token layer, Conventions, Effects usage, How it's wired, Scale DS, Structure, Typography usage

### Community 17 - "Community 17"
Cohesion: 0.50
Nodes (3): Agentation Setup, Notes, Steps

### Community 18 - "Community 18"
Cohesion: 0.25
Nodes (3): Drag, Node, Vec

## Knowledge Gaps
- **66 isolated node(s):** `Repo canvas (`/`)`, `Branch build screen (`/branch/[...name]`)`, `Scale DS — design system (`src/design-system/`)`, `Tech stack`, `Running locally` (+61 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Dev Dependencies & Tooling` to `Package & Runtime Deps`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `Repo canvas (`/`)`, `Branch build screen (`/branch/[...name]`)`, `Scale DS — design system (`src/design-system/`)` to the rest of the system?**
  _67 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `TypeScript Compiler Options` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Package & Runtime Deps` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._