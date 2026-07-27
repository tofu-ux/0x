# 0x

An open-source design system: tokens, a component kit, and a theme system —
take the whole thing or just the pieces you need. One default palette, ten
alternate themes, two fonts, and a strict rule about gradients. Dark is the
home theme.

## The default palette — Cyan / Fuchsia

Cyan primary, fuchsia secondary, on a cool near-black.

| Token | Dark (default) | Light |
| --- | --- | --- |
| `--bg` | `#0E1516` | `#F2F7F8` |
| `--surface` | `#141E1F` | `#FCFDFD` |
| `--surface-strong` | `#1F2C2D` | `#E3ECEE` |
| `--text` | `#EBEFEF` | `#182425` |
| `--text-muted` | `#B9C5C6` | `#3A4E50` |
| `--text-faint` | `#91A0A1` | `#587174` |
| `--shine` (primary accent) | `#3FD3E0` | `#0A7480` |
| `--shine-strong` | `#1EADBA` | `#05383E` |
| `--shine-bright` | `#7CE1EA` | `#0FB0C2` |
| `--on-shine` | `#0E1516` | `#F2F7F8` |

Plus a secondary accent (`--shine-2` and its `-strong`/`-bright`/`on-shine-2`
pairs — fuchsia), semantic (`--danger` `--warning` `--success` `--info`),
syntax (`--code-*`), and chart (`--chart-1`…`--chart-5`) colors — all defined
in both themes. Contrast ratios are documented inline in `assets/tokens.css`.

Fonts: **Righteous** (display + headlines) and **IBM Plex Mono** (body, UI, code).

## Ten more themes

Beyond the default, the system ships ten fully worked alternate themes — each
with its own accent pair, background, and headline font, every color checked
against WCAG AA (4.5:1 for text and links, 3:1 minimum for decorative hover
states) in both dark and light:

| Theme | Vibe | Font |
| --- | --- | --- |
| Miami | Magenta & cyan, neon-sign loud | Righteous |
| Neon Arcade | Green & magenta, black-lit cabinet glow | VT323 |
| Coffee Cozy | Warm roast brown, caramel + rose | Pacifico |
| Sunrise | Sky blue & light gold, calm and sunny | Fraunces |
| Starry Night | Midnight blue, gold stars, mystical lavender | Playfair Display |
| Mountain | Slate stone, pine + glacier blue | Archivo Black |
| Spring | Blossom pink primary, fresh green accent | Fredoka |
| Summer | Amber primary, magenta secondary — sun-hot | Monoton |
| Autumn | Brownish-orange primary, gold secondary | Fraunces |
| Winter | Icy blue + silver-white | Space Grotesk |

Browse and preview all ten live at [themes.html](themes.html), or design your
own from scratch at [playground.html](playground.html) — both work entirely
in the browser, no build step, with live contrast numbers as you experiment.

## Install

**CSS**

```css
@import "@tofu-ux/0x/tokens.css";
@import "@tofu-ux/0x/components.css"; /* optional component kit */
```

or

```html
<link rel="stylesheet" href="https://unpkg.com/@tofu-ux/0x/assets/tokens.css" />
```

**npm**

```sh
bun add @tofu-ux/0x
```

**SwiftPM**

```
https://github.com/tofu-ux/0x
```

```swift
import Ox

Color.oxShine
```

The package builds on every supported Swift platform. SwiftUI color conveniences
are available when `SwiftUI` can be imported.

## The adoption pattern

1. `assets/tokens.css` — every token, both themes, dark default.
2. `assets/theme.js` + the three blocks from `assets/theme-toggle.html` —
   the standard sun/moon toggle, no flash, one storage key (`0x-theme`).
3. The fonts link (Righteous + IBM Plex Mono, Google Fonts).
4. Optional: `assets/components.css` — namespaced, zero-dependency UI
   primitives with copy-ready markup in the living showcase.

See [ADOPTION.md](ADOPTION.md) for the consumer contract and
[COMPONENTS.md](COMPONENTS.md) for the component inventory and behavior rules.

## Repo layout

```
tokens/tokens.json      single source of truth — edit this
tools/build.ts          codegen: bun run tools/build.ts
assets/tokens.css       generated — CSS custom properties
assets/tokens.rgb.css   generated — RGB triplets for Tailwind-style alpha
assets/components.css   optional namespaced component primitives
assets/theme.js         theme controller (no dependencies)
assets/theme-toggle.html  copy-paste toggle unit
assets/showcase.js      docs-only copy and dialog behavior
assets/logo-mark.svg    the shiny thing
swift/                  SwiftPM package (generated Color extensions)
index.html              living spec and copy-paste component workbench
themes.html             gallery of the ten alternate themes, live preview
playground.html         build your own theme — color, font, name, contrast
```

`assets/tokens.css`, `assets/tokens.rgb.css`, and
`swift/Sources/Ox/OxColors.swift` are generated from
`tokens/tokens.json`. Never edit them by hand; run `bun run tools/build.ts`.

## Hard rules

- No gradients, anywhere. Ever.
- `--shine` is the primary accent, `--shine-2` the secondary. Two, spent deliberately — not a rainbow.
- Dark is home. Light is a guest.
- Full width is the default. Text keeps its measure (`--measure`, 68ch).
  Header, hero, sections, and footer share one geometry: `--pad` gutters,
  centered at `--page-max` on ultrawide.
- Righteous for voice, IBM Plex Mono for facts.
- Righteous never below 20px — small Righteous loses its personality. Section numbers,
  tags, and meta are facts: IBM Plex Mono 500.
- Nothing under 13px. `--text-sm` is 14px; tags and meta are not exempt.
- Never re-derive tokens. Import them.
- Every color that carries text or sits behind a label meets WCAG AA (4.5:1)
  against its background. Decorative-only tints (hover states, "-bright"
  variants) meet the 3:1 large-text/UI-component floor at minimum.

## License

MIT — see [LICENSE](LICENSE). Righteous and IBM Plex Mono are licensed
under the SIL Open Font License 1.1.
