#!/usr/bin/env bun
/**
 * 0x codegen — reads tokens/tokens.json (the single source of truth)
 * and writes the generated artifacts:
 *
 *   assets/tokens.css                     CSS custom properties, dark default + light override
 *   assets/tokens.rgb.css                 RGB channel triplets for Tailwind rgb(var(--h-x) / <alpha-value>)
 *   swift/Sources/Ox/OxColors.swift SwiftUI Color extensions, both themes
 *
 * Never edit the generated files by hand. Edit tokens/tokens.json and run:
 *
 *   bun run tools/build.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(root, "tokens/tokens.json"), "utf8"));

// ---------- helpers ----------

/** Resolve "$other-token" references within one theme. */
const resolve = (theme, value) =>
  value.startsWith("$") ? theme[value.slice(1)] : value;

const hexToRgb = (hex) => {
  const c = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16));
};

const isHex = (v) => /^#[0-9A-Fa-f]{6}$/.test(v);

/** WCAG 2.x relative luminance + contrast ratio. */
const luminance = (hex) => {
  const [r, g, b] = hexToRgb(hex)
    .map((v) => v / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const aaLabel = (r) => {
  if (r >= 7) return "AAA";
  if (r >= 4.5) return "AA";
  if (r >= 3) return "AA large text only";
  return "below AA — decorative use only";
};

/** Tokens annotated with a computed contrast note against a background token. */
const CONTRAST_PAIRS = {
  text: "bg",
  "text-muted": "bg",
  "text-faint": "bg",
  shine: "bg",
  "shine-strong": "bg",
  "shine-bright": "bg",
  "on-shine": "shine",
  "shine-2": "bg",
  "shine-2-strong": "bg",
  "shine-2-bright": "bg",
  "on-shine-2": "shine-2",
  danger: "bg",
  warning: "bg",
  success: "bg",
  "code-string": "bg",
  "code-number": "bg",
  "code-function": "bg",
};

/** Prose notes for tokens without a computed contrast comment, per theme. */
const NOTES = {
  dark: {
    bg: "cool near-black — page ground",
  },
  light: {
    bg: "cool off-white — page ground",
  },
  any: {
    surface: "cards, raised panels",
    "surface-strong": "inputs, wells, lifted surfaces",
    hairline: "borders, rules — hairline only",
    "header-bg": "sticky header with backdrop blur",
    info: "informational — reuses the primary accent by design",
    "code-keyword": "syntax: keywords",
    "code-comment": "syntax: comments",
    "chart-1": "categorical charts — cyan (primary)",
    "chart-2": "categorical charts — fuchsia (secondary)",
    "chart-3": "categorical charts — violet",
    "chart-4": "categorical charts — amber",
    "chart-5": "categorical charts — green",
  },
};

const commentFor = (theme, name, scheme) => {
  const pairBg = CONTRAST_PAIRS[name];
  if (pairBg) {
    const fg = resolve(theme, theme[name]);
    const bg = resolve(theme, theme[pairBg]);
    if (isHex(fg) && isHex(bg)) {
      const r = contrast(fg, bg);
      return `${r.toFixed(1)}:1 on --${pairBg} (${aaLabel(r)})`;
    }
  }
  return NOTES[scheme]?.[name] ?? NOTES.any[name] ?? null;
};

// ---------- assets/tokens.css ----------

const GENERATED_HEADER = `/* ============================================================
   GENERATED FILE — do not edit by hand.
   Source of truth: tokens/tokens.json
   Regenerate with: bun run tools/build.ts
   ============================================================ */`;

const cssColorDecl = (theme, name, scheme) => {
  const raw = theme[name];
  const value = raw.startsWith("$") ? `var(--${raw.slice(1)})` : raw;
  const note = commentFor(theme, name, scheme);
  const pad = " ".repeat(Math.max(1, 20 - name.length));
  return `    --${name}:${pad}${value};${note ? `  /* ${note} */` : ""}`;
};

const cssThemeBlock = (theme, scheme) => {
  const lines = Object.keys(theme).map((name) =>
    cssColorDecl(theme, name, scheme)
  );
  return [`    color-scheme: ${scheme};`, "", ...lines].join("\n");
};

const dark = tokens.color.dark;
const light = tokens.color.light;

const showcaseValue = (theme, name) => {
  const raw = theme[name];
  if (raw.startsWith("$")) return `→ --${raw.slice(1)}`;
  return raw.replace(/\s+/g, "").replace(",0.", ",.");
};

const validateShowcase = () => {
  const index = readFileSync(join(root, "index.html"), "utf8");
  const readme = readFileSync(join(root, "README.md"), "utf8");
  const colorStart = index.indexOf('<section id="color">');
  const colorEnd = index.indexOf('<section id="type">');
  if (colorStart < 0 || colorEnd < 0) {
    throw new Error("index.html is missing the color/type showcase sections");
  }

  const colorSection = index.slice(colorStart, colorEnd);
  const colorCount = Object.keys(dark).length;
  const requiredCopy = [
    `cyan / fuchsia · ${colorCount} tokens · both themes`,
    `${colorCount}/${colorCount} tokens imported, none re-derived`,
    `--text-base · ${tokens.text.base} · capped at --measure`,
  ];

  for (const copy of requiredCopy) {
    if (!index.includes(copy)) {
      throw new Error(`index.html token copy is stale: expected "${copy}"`);
    }
  }

  for (const name of Object.keys(dark)) {
    const darkValue = showcaseValue(dark, name);
    const lightValue = showcaseValue(light, name);
    const expected = darkValue === lightValue
      ? `<div class="hexes"><b>${darkValue}</b></div>`
      : `<div class="hexes"><b>${darkValue}</b> / ${lightValue}</div>`;
    const tokenStart = colorSection.indexOf(`<h3>--${name}</h3>`);
    if (tokenStart < 0 || !colorSection.slice(tokenStart).startsWith(`<h3>--${name}</h3>`)) {
      throw new Error(`index.html is missing the --${name} showcase`);
    }
    const nextPanel = colorSection.indexOf('<div class="panel">', tokenStart);
    const tokenPanel = colorSection.slice(
      tokenStart,
      nextPanel < 0 ? colorSection.length : nextPanel
    );
    if (!tokenPanel.includes(expected)) {
      throw new Error(`index.html value for --${name} is stale: expected "${expected}"`);
    }
  }

  const documentedPalette = [
    "bg",
    "surface",
    "surface-strong",
    "text",
    "text-muted",
    "text-faint",
    "shine",
    "shine-strong",
    "shine-bright",
    "on-shine",
  ];
  for (const name of documentedPalette) {
    const label = name === "shine" ? "`--shine` (primary accent)" : `\`--${name}\``;
    const expected = `| ${label} | \`${dark[name]}\` | \`${light[name]}\` |`;
    if (!readme.includes(expected)) {
      throw new Error(`README.md value for --${name} is stale: expected "${expected}"`);
    }
  }
};

validateShowcase();

const cssShared = () => {
  const lines = [
    "",
    "    /* Type */",
    `    --font-display: ${tokens.font.display};`,
    `    --font-mono: ${tokens.font.mono};`,
    `    --measure: ${tokens.font.measure};`,
    "",
    "    /* Spacing scale — 4px base */",
    ...Object.entries(tokens.space).map(
      ([k, v]) => `    --space-${k}: ${v};`
    ),
    "",
    "    /* Type scale */",
    ...Object.entries(tokens.text).map(
      ([k, v]) => `    --text-${k}: ${v};`
    ),
    "",
    "    /* Layout — full width is the default; text keeps its measure */",
    ...Object.entries(tokens.layout).map(
      ([k, v]) => `    --${k}: ${v};`
    ),
    "",
    "    /* Radius — a single subtle step */",
    `    --radius: ${tokens.radius};`,
  ];
  return lines.join("\n");
};

const tokensCss = `${GENERATED_HEADER}

/* ============================================================
   0x — design tokens
   Cyan primary, fuchsia secondary, on a cool near-black.

   Dark is the DEFAULT theme. Light follows the OS via
   prefers-color-scheme, and either can be forced with
   data-theme="light|dark" on <html> (assets/theme.js writes it).
   Every color token is defined in both modes, so anything built
   on these tokens themes for free.
   ============================================================ */

:root {
${cssThemeBlock(dark, "dark")}
${cssShared()}
}

:root[data-theme="light"] {
${cssThemeBlock(light, "light")}
}

@media (prefers-color-scheme: light) {
    /* :not([data-theme="dark"]) lets a forced-dark override win. */
    :root:not([data-theme="dark"]) {
${cssThemeBlock(light, "light")}
    }
}
`;

writeFileSync(join(root, "assets/tokens.css"), tokensCss);

// ---------- assets/tokens.rgb.css ----------

const rgbThemeBlock = (theme, scheme) => {
  const lines = [`    color-scheme: ${scheme};`, ""];
  for (const name of Object.keys(theme)) {
    const value = resolve(theme, theme[name]);
    if (!isHex(value)) continue; // alpha values can't be channel triplets
    const pad = " ".repeat(Math.max(1, 20 - name.length));
    lines.push(`    --h-${name}:${pad}${hexToRgb(value).join(" ")};`);
  }
  return lines.join("\n");
};

const tokensRgbCss = `${GENERATED_HEADER}

/* ============================================================
   0x — RGB channel triplets for alpha-aware utilities.
   Same colors as tokens.css, exposed as "--h-*: R G B" so
   Tailwind (and friends) can do: rgb(var(--h-shine) / <alpha-value>).

   Example tailwind.config color:
     shine: "rgb(var(--h-shine) / <alpha-value>)"
   ============================================================ */

:root {
${rgbThemeBlock(dark, "dark")}
}

:root[data-theme="light"] {
${rgbThemeBlock(light, "light")}
}

@media (prefers-color-scheme: light) {
    :root:not([data-theme="dark"]) {
${rgbThemeBlock(light, "light")}
    }
}
`;

writeFileSync(join(root, "assets/tokens.rgb.css"), tokensRgbCss);

// ---------- swift/Sources/Ox/OxColors.swift ----------

const camel = (name) =>
  "ox" +
  name
    .split("-")
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join("");

const swiftColor = (theme, name) => {
  const value = resolve(theme, theme[name]);
  if (isHex(value)) {
    const [r, g, b] = hexToRgb(value);
    return `Color(red: ${r}/255, green: ${g}/255, blue: ${b}/255)`;
  }
  const m = value.match(
    /^rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\s*\)$/
  );
  if (!m) throw new Error(`Cannot convert "${name}: ${value}" to Swift`);
  return `Color(red: ${m[1]}/255, green: ${m[2]}/255, blue: ${m[3]}/255, opacity: ${m[4]})`;
};

const swiftBlock = (theme, label, suffix, scheme) =>
  [
    `    // MARK: - ${label}`,
    "",
    ...Object.keys(theme).map((name) => {
      const note = commentFor(theme, name, scheme);
      const doc = `    /// \`--${name}\`${note ? ` — ${note}` : ""}`;
      return `${doc}\n    static let ${camel(name)}${suffix} = ${swiftColor(
        theme,
        name
      )}`;
    }),
  ].join("\n");

const swift = `// ============================================================
// GENERATED FILE — do not edit by hand.
// Source of truth: tokens/tokens.json
// Regenerate with: bun run tools/build.ts
// ============================================================

#if canImport(SwiftUI)
import SwiftUI

/// 0x design tokens — cyan primary, fuchsia secondary, on a cool near-black.
///
/// Dark is the default theme; the unsuffixed values are the dark tokens.
/// Light-theme values carry a \`Light\` suffix. Pick per call site, or
/// resolve against \`@Environment(\\.colorScheme)\`.
public extension Color {
${swiftBlock(dark, "Dark theme (default)", "", "dark")}

${swiftBlock(light, "Light theme", "Light", "light")}
}
#endif
`;

writeFileSync(
  join(root, "swift/Sources/Ox/OxColors.swift"),
  swift
);

console.log("0x: wrote assets/tokens.css");
console.log("0x: wrote assets/tokens.rgb.css");
console.log("0x: wrote swift/Sources/Ox/OxColors.swift");
