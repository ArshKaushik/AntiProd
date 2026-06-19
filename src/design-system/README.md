# Scale DS

Scale DS is the single source of truth for the product's visual language: colors
today, typography / spacing / components as the system grows.

## Structure

```
design-system/
├── index.css          # single entry — @imports every token layer (wire this into globals.css)
├── tokens/            # primitives: the raw, named values everything else builds on
│   ├── colors.css     # color palette (from Figma), defined via Tailwind v4 @theme
│   ├── typography.css # type scale + font family/weights (from Figma)
│   └── effects.css    # drop shadows + background blurs (from Figma)
└── README.md
```

Planned layers (each is just a new file + one `@import` line in `index.css`):

- `tokens/spacing.css` — spacing scale and border radii
- `components/` — reusable component styles/primitives once patterns are established

### Effects usage

| Figma style          | Class               |
| -------------------- | ------------------- |
| Shadow/xs            | `shadow-xs`         |
| Shadow/md            | `shadow-md`         |
| Shadow/2xl           | `shadow-2xl`        |
| Background blur/md   | `backdrop-blur-md`  |

Shadow steps: `shadow-xs` → `shadow-3xl`. Background-blur steps: `backdrop-blur-sm` (8px), `-md` (16px), `-lg` (24px), `-xl` (40px).

### Typography usage

Size (with its line-height + tracking) and weight are separate tokens — combine them:

| Figma style        | Classes                       |
| ------------------ | ----------------------------- |
| Text sm / Regular  | `text-sm font-regular`        |
| Text md / Semibold | `text-md font-semibold`       |
| Display lg / Bold  | `text-display-lg font-bold`   |

Weight utilities: `font-regular` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700).

## How it's wired

`src/app/globals.css` imports Tailwind, then this system:

```css
@import "tailwindcss";
@import "../design-system/index.css";
```

Tokens are declared with Tailwind v4's `@theme`, so every token is available as
**both** a CSS variable and a utility class:

| Token (`@theme`)          | CSS variable               | Utility classes                          |
| ------------------------- | -------------------------- | ---------------------------------------- |
| `--color-neutral-900`     | `var(--color-neutral-900)` | `bg-neutral-900`, `text-neutral-900`, …  |
| `--color-brand-600`       | `var(--color-brand-600)`   | `bg-brand-600`, `border-brand-600`, …    |

## Conventions

- **No hardcoded colors in app code.** Never write a hex literal (e.g.
  `bg-[#171717]`) in a component. Use a token utility (`bg-neutral-900`) or, for
  SVG attributes / inline styles, the CSS variable (`var(--color-neutral-700)`).
- **Naming** mirrors Figma's `Group/Shade` → `--color-<group>-<shade>`
  (e.g. Figma `Neutral/900` → `--color-neutral-900`).
- **Figma is upstream.** Tokens are transcribed from the Figma library. When the
  Figma palette changes, re-sync `tokens/colors.css` — don't diverge by hand.

## Adding a token layer

1. Create `tokens/<layer>.css` with an `@theme { … }` block.
2. Add `@import "./tokens/<layer>.css";` to `index.css`.
3. Use the generated utilities/variables in components — never raw values.
