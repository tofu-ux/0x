// ============================================================
// GENERATED FILE — do not edit by hand.
// Source of truth: tokens/tokens.json
// Regenerate with: bun run tools/build.ts
// ============================================================

#if canImport(SwiftUI)
import SwiftUI

/// 0x design tokens — cyan primary, fuchsia secondary, on a cool near-black.
///
/// Dark is the default theme; the unsuffixed values are the dark tokens.
/// Light-theme values carry a `Light` suffix. Pick per call site, or
/// resolve against `@Environment(\.colorScheme)`.
public extension Color {
    // MARK: - Dark theme (default)

    /// `--bg` — cool near-black — page ground
    static let oxBg = Color(red: 14/255, green: 21/255, blue: 22/255)
    /// `--surface` — cards, raised panels
    static let oxSurface = Color(red: 20/255, green: 30/255, blue: 31/255)
    /// `--surface-strong` — inputs, wells, lifted surfaces
    static let oxSurfaceStrong = Color(red: 31/255, green: 44/255, blue: 45/255)
    /// `--text` — 15.9:1 on --bg (AAA)
    static let oxText = Color(red: 235/255, green: 239/255, blue: 239/255)
    /// `--text-muted` — 10.4:1 on --bg (AAA)
    static let oxTextMuted = Color(red: 185/255, green: 197/255, blue: 198/255)
    /// `--text-faint` — 6.8:1 on --bg (AA)
    static let oxTextFaint = Color(red: 145/255, green: 160/255, blue: 161/255)
    /// `--shine` — 10.2:1 on --bg (AAA)
    static let oxShine = Color(red: 63/255, green: 211/255, blue: 224/255)
    /// `--shine-strong` — 6.8:1 on --bg (AA)
    static let oxShineStrong = Color(red: 30/255, green: 173/255, blue: 186/255)
    /// `--shine-bright` — 12.1:1 on --bg (AAA)
    static let oxShineBright = Color(red: 124/255, green: 225/255, blue: 234/255)
    /// `--on-shine` — 10.2:1 on --shine (AAA)
    static let oxOnShine = Color(red: 14/255, green: 21/255, blue: 22/255)
    /// `--shine-2` — 6.0:1 on --bg (AA)
    static let oxShine2 = Color(red: 232/255, green: 92/255, blue: 199/255)
    /// `--shine-2-strong` — 4.3:1 on --bg (AA large text only)
    static let oxShine2Strong = Color(red: 221/255, green: 31/255, blue: 177/255)
    /// `--shine-2-bright` — 9.2:1 on --bg (AAA)
    static let oxShine2Bright = Color(red: 241/255, green: 155/255, blue: 220/255)
    /// `--on-shine-2` — 6.0:1 on --shine-2 (AA)
    static let oxOnShine2 = Color(red: 14/255, green: 21/255, blue: 22/255)
    /// `--hairline` — borders, rules — hairline only
    static let oxHairline = Color(red: 235/255, green: 239/255, blue: 239/255, opacity: 0.12)
    /// `--header-bg` — sticky header with backdrop blur
    static let oxHeaderBg = Color(red: 14/255, green: 21/255, blue: 22/255, opacity: 0.92)
    /// `--danger` — 7.1:1 on --bg (AAA)
    static let oxDanger = Color(red: 224/255, green: 138/255, blue: 122/255)
    /// `--warning` — 7.2:1 on --bg (AAA)
    static let oxWarning = Color(red: 201/255, green: 154/255, blue: 60/255)
    /// `--success` — 6.7:1 on --bg (AA)
    static let oxSuccess = Color(red: 135/255, green: 165/255, blue: 114/255)
    /// `--info` — informational — reuses the primary accent by design
    static let oxInfo = Color(red: 63/255, green: 211/255, blue: 224/255)
    /// `--code-keyword` — syntax: keywords
    static let oxCodeKeyword = Color(red: 63/255, green: 211/255, blue: 224/255)
    /// `--code-string` — 6.0:1 on --bg (AA)
    static let oxCodeString = Color(red: 232/255, green: 92/255, blue: 199/255)
    /// `--code-number` — 8.8:1 on --bg (AAA)
    static let oxCodeNumber = Color(red: 162/255, green: 183/255, blue: 185/255)
    /// `--code-function` — 10.4:1 on --bg (AAA)
    static let oxCodeFunction = Color(red: 185/255, green: 197/255, blue: 198/255)
    /// `--code-comment` — syntax: comments
    static let oxCodeComment = Color(red: 145/255, green: 160/255, blue: 161/255)
    /// `--chart-1` — categorical charts — cyan (primary)
    static let oxChart1 = Color(red: 63/255, green: 211/255, blue: 224/255)
    /// `--chart-2` — categorical charts — fuchsia (secondary)
    static let oxChart2 = Color(red: 232/255, green: 92/255, blue: 199/255)
    /// `--chart-3` — categorical charts — violet
    static let oxChart3 = Color(red: 167/255, green: 105/255, blue: 211/255)
    /// `--chart-4` — categorical charts — amber
    static let oxChart4 = Color(red: 211/255, green: 149/255, blue: 105/255)
    /// `--chart-5` — categorical charts — green
    static let oxChart5 = Color(red: 114/255, green: 202/255, blue: 151/255)

    // MARK: - Light theme

    /// `--bg` — cool off-white — page ground
    static let oxBgLight = Color(red: 242/255, green: 247/255, blue: 248/255)
    /// `--surface` — cards, raised panels
    static let oxSurfaceLight = Color(red: 252/255, green: 253/255, blue: 253/255)
    /// `--surface-strong` — inputs, wells, lifted surfaces
    static let oxSurfaceStrongLight = Color(red: 227/255, green: 236/255, blue: 238/255)
    /// `--text` — 14.7:1 on --bg (AAA)
    static let oxTextLight = Color(red: 24/255, green: 36/255, blue: 37/255)
    /// `--text-muted` — 8.1:1 on --bg (AAA)
    static let oxTextMutedLight = Color(red: 58/255, green: 78/255, blue: 80/255)
    /// `--text-faint` — 4.8:1 on --bg (AA)
    static let oxTextFaintLight = Color(red: 88/255, green: 113/255, blue: 116/255)
    /// `--shine` — 5.1:1 on --bg (AA)
    static let oxShineLight = Color(red: 10/255, green: 116/255, blue: 128/255)
    /// `--shine-strong` — 11.8:1 on --bg (AAA)
    static let oxShineStrongLight = Color(red: 5/255, green: 56/255, blue: 62/255)
    /// `--shine-bright` — 2.4:1 on --bg (below AA — decorative use only)
    static let oxShineBrightLight = Color(red: 15/255, green: 176/255, blue: 194/255)
    /// `--on-shine` — 5.1:1 on --shine (AA)
    static let oxOnShineLight = Color(red: 242/255, green: 247/255, blue: 248/255)
    /// `--shine-2` — 6.7:1 on --bg (AA)
    static let oxShine2Light = Color(red: 150/255, green: 33/255, blue: 138/255)
    /// `--shine-2-strong` — 11.6:1 on --bg (AAA)
    static let oxShine2StrongLight = Color(red: 91/255, green: 20/255, blue: 84/255)
    /// `--shine-2-bright` — 4.0:1 on --bg (AA large text only)
    static let oxShine2BrightLight = Color(red: 209/255, green: 46/255, blue: 192/255)
    /// `--on-shine-2` — 6.7:1 on --shine-2 (AA)
    static let oxOnShine2Light = Color(red: 242/255, green: 247/255, blue: 248/255)
    /// `--hairline` — borders, rules — hairline only
    static let oxHairlineLight = Color(red: 24/255, green: 36/255, blue: 37/255, opacity: 0.12)
    /// `--header-bg` — sticky header with backdrop blur
    static let oxHeaderBgLight = Color(red: 242/255, green: 247/255, blue: 248/255, opacity: 0.92)
    /// `--danger` — 8.6:1 on --bg (AAA)
    static let oxDangerLight = Color(red: 132/255, green: 36/255, blue: 30/255)
    /// `--warning` — 5.5:1 on --bg (AA)
    static let oxWarningLight = Color(red: 138/255, green: 90/255, blue: 0/255)
    /// `--success` — 5.8:1 on --bg (AA)
    static let oxSuccessLight = Color(red: 63/255, green: 107/255, blue: 51/255)
    /// `--info` — informational — reuses the primary accent by design
    static let oxInfoLight = Color(red: 10/255, green: 116/255, blue: 128/255)
    /// `--code-keyword` — syntax: keywords
    static let oxCodeKeywordLight = Color(red: 10/255, green: 116/255, blue: 128/255)
    /// `--code-string` — 6.7:1 on --bg (AA)
    static let oxCodeStringLight = Color(red: 150/255, green: 33/255, blue: 138/255)
    /// `--code-number` — 5.7:1 on --bg (AA)
    static let oxCodeNumberLight = Color(red: 73/255, green: 102/255, blue: 105/255)
    /// `--code-function` — 8.1:1 on --bg (AAA)
    static let oxCodeFunctionLight = Color(red: 58/255, green: 78/255, blue: 80/255)
    /// `--code-comment` — syntax: comments
    static let oxCodeCommentLight = Color(red: 88/255, green: 113/255, blue: 116/255)
    /// `--chart-1` — categorical charts — cyan (primary)
    static let oxChart1Light = Color(red: 10/255, green: 116/255, blue: 128/255)
    /// `--chart-2` — categorical charts — fuchsia (secondary)
    static let oxChart2Light = Color(red: 150/255, green: 33/255, blue: 138/255)
    /// `--chart-3` — categorical charts — violet
    static let oxChart3Light = Color(red: 108/255, green: 44/255, blue: 150/255)
    /// `--chart-4` — categorical charts — amber
    static let oxChart4Light = Color(red: 150/255, green: 90/255, blue: 44/255)
    /// `--chart-5` — categorical charts — green
    static let oxChart5Light = Color(red: 53/255, green: 141/255, blue: 91/255)
}
#endif
