# Adopting 0x

Three required pieces make any site or page on-brand with working dark + light mode.
Don't re-derive tokens or hand-roll a theme toggle — import these.

## 1. Tokens

Import `assets/tokens.css` once, globally. Dark is the default theme; light
follows the OS via `prefers-color-scheme`, and `data-theme="light|dark"` on
`<html>` forces a mode. Build everything on the variables — never hardcode hex.

```html
<link rel="stylesheet" href="tokens.css" />
```

Use them like:

```css
body   { background: var(--bg); color: var(--text); }
a      { color: var(--shine); }
.card  { background: var(--surface); border: 1px solid var(--hairline); border-radius: var(--radius); }
.error { color: var(--danger); }
```

Key tokens: `--bg` `--surface` `--surface-strong` · `--text` `--text-muted`
`--text-faint` · `--shine` (primary accent) `--shine-strong` `--shine-bright`
`--on-shine` · `--shine-2` (secondary accent) `--shine-2-strong` `--shine-2-bright`
`--on-shine-2` · `--hairline` `--header-bg` · `--danger` `--warning` `--success`
`--info` · `--font-display` `--font-mono` `--measure` · `--space-1`…`--space-9`
· `--text-sm`…`--text-3xl` · `--pad` `--page-max` · `--radius`.

For code and data: `--code-keyword/string/number/function/comment` (syntax
highlighting — map your highlighter's classes onto these) and
`--chart-1`…`--chart-5` (categorical charts). Both defined in dark and light.

For Tailwind and other alpha-aware utilities, `assets/tokens.rgb.css` exposes
the same colors as channel triplets (`--h-shine: 63 211 224`) for
`rgb(var(--h-shine) / <alpha-value>)`.

## 2. Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Righteous&display=swap" rel="stylesheet" />
```

Righteous for display and headlines, IBM Plex Mono for body, UI, and code at
weights 400/500/600. Both are OFL-licensed (free for commercial use).

Layout is full-width by default: chrome and grids run edge to edge with
`--pad` (fluid side padding) as the gutter, and `--page-max` (1600px) caps
inner content on ultrawide. Running text always keeps its `--measure` (68ch).

## 3. Theme toggle

Copy the three blocks from `assets/theme-toggle.html` (pre-paint snippet in
`<head>`, the button in your header, the styles) and load `assets/theme.js`
with `defer`. You get the standard sun/moon button — moon in dark, sun in
light — with no flash and correct ARIA. One storage key everywhere:
`0x-theme`. **Never ship a "THEME" text button.**

```html
<script defer src="theme.js"></script>
```

## The logo

`assets/logo-mark.svg` is the shiny thing: a diamond with a punched-out
glint. It uses `fill="currentColor"` — set `color: var(--shine)` where the
accent is wanted. `assets/favicon.svg` is the same mark on a dark field.

## Optional component kit

Import `assets/components.css` after the tokens for the namespaced `h-`
component primitives:

```css
@import "@tofu-ux/0x/tokens.css";
@import "@tofu-ux/0x/components.css";
```

The kit adds actions, fields, choice controls, feedback, navigation, cards,
data display, loading states, disclosure, and dialog styling. It has no
JavaScript dependency and does not reset global elements. Copy the semantic
markup from the component workbench in `index.html`; see
`COMPONENTS.md` for the inventory and accessibility contract.

## Hard rules

- No gradients, anywhere. Ever.
- `--shine` is the primary accent, `--shine-2` the secondary. Two, spent deliberately.
- Dark is home. Light is a guest — supported, never the default.
- Full width is the default. Text keeps its measure.
- Righteous for voice, IBM Plex Mono for facts.
- Never re-derive tokens. Import them. The source of truth is
  `tokens/tokens.json`; everything else is generated from it.
