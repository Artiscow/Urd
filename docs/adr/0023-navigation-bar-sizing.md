# ADR-0023: Navigation bar sizing

Date: 16 September 2026. Status: accepted (v0.7, milestone 0.7.15); decisions 1 to 5 restated 11 October 2026 with the build mechanics moved to ARCHITECTURE.md (no decision changed), earlier text in [amended/](amended/0023-navigation-bar-sizing-until-2026-10-11.md).

## Context

Before this decision the navigation bar's size was one control, the four-step `nav.style.size` preset (sm/md/lg/xl), which set a vertical padding and a font size; everything else was fixed in the stylesheet. Six things were out of the owner's reach: the side padding was a fixed fluid value, the floating pill had a fixed maximum width, the gap between the menu items was fixed, the side column width (`nav.style.width`) was set by dragging only, the logo height (`nav.logo.size`) was desktop-only with no mobile value, and the compact state on scroll shrank the padding by a fixed factor. And nothing bound the bar to the content width of [ADR-0018], so the bar was the one surface on the page whose contents did not line up with the content edge.

A survey of ten builders (LAERDOMMER §2, 16 September 2026: Squarespace, Wix classic, Wix Studio, Webflow, Shopify Dawn, Elementor, WordPress block themes, Framer, Duda and GoDaddy, Hostinger, Carrd) gave five rules. Thickness is padding everywhere: Squarespace's Height slider and Wix's drag handle are the same value with a different handle, and nobody fixes a bar height the content must fit into. Width is a two-way choice, full-bleed or bound to the page's content width, with the background always full-bleed (Squarespace Full/Inset, WordPress content/wide/full, Wix Studio stretch or max width, Webflow's container). The logo has its own size and often a second mobile or compact size (Squarespace, Shopify's reduce-logo mode), the compact-on-scroll state is configurable in itself (Duda, Shopify, Framer) while the transparent-to-solid colour while scrolling is a separate feature (Wix Studio), and mobile gets its own thickness and logo size (Squarespace).

## Decision

1. **Thickness is padding.** The four presets stay, and free px values (`nav.style.padY` for the vertical padding, `nav.style.textSize` for the menu text) override them. An explicit padY is raw in every variant, while the floating pill's reduction factor applies to presets only. An image logo contributes a floor of its own to the bar's height whatever padY says, so the editor describes thickness as padding, never as bar height.

2. **Width is full-bleed or bound.** `nav.style.inset` binds the bar's contents to the content edge on desktop only, resolved against the same reference the canvas uses; the background always spans the viewport. `nav.style.padX` sets the side padding directly (and drives the mobile panel and the side-to-bar fallback with it), and `nav.style.gap` sets the space between the menu items. The floating menu's width, `nav.style.pillWidth`, is a px value or the string `content` (the content width less the desktop gutters); it is suppressed at the mobile breakpoint, where the pill keeps its fluid width.

3. **The mobile and compact states carry their own overrides, written inline by `nav.js` at render time.** `nav.style.mobile.padY`, `nav.style.mobile.textSize` and `nav.logo.mobileSize` are picked when the nav renders and written as inline values, never by CSS class rules: the mobile class is also set by desktop content folding, and a class rule can never beat an inline value. The breakpoint crossing re-renders the nav, and every draft message rebuilds it, so a stale value cannot survive. The compact state gets `nav.style.shrinkTo` (0.3-0.8, default 0.5) and `nav.style.shrinkLogo` (the logo image scales with the padding).

4. **Everything is additive with the existing look as the default.** Every new field is optional, and an omitted field renders with the default look: the presets, the fluid side padding, the pill's fixed maximum width, the desktop logo size and the 0.5 shrink are the fallbacks. Defaults are never written to the file, and `nav.version` is untouched. No migration, per the pre-v1 clause of [ADR-0005].

5. **Border and shadow use the same additive model:** `nav.style.border` (width, side, colour) and `nav.style.shadow` (none/soft/strong), the border for bar and floating, the shadow for the bar only since the pill has its glow (milestone 0.7.15.7, FUNKSJONSKART C18). The transparent-to-solid colour while scrolling is a separate item (0.7.13).

## Consequences

- **The four variant-bound fields are shown by the editor only where they apply** (the relevance rule of 23 July 2026): `inset` for the bar variant, `pillWidth` for the floating variants, `width` for the side variant, and `shrinkTo` with `shrinkLogo` only when `nav.scroll` is shrink (the logo shrink only when the logo has an image). Thickness, side padding, item spacing and the mobile group are hidden for the side variant; a preset click clears `padY` and `textSize` in one history step.

- **The side column keeps its own padding:** the column never followed the presets, and `padY` and `padX` do not touch it. Only `size`, `textSize` and `width` apply there.

- **A parity test binds the editor's bounds to the engine's,** so the two can never drift.

- **The mobile breakpoint is the one of [ADR-0019]** (`breakpoints.mobile`); the collapse breakpoint as a nav setting of its own is recorded as a proposal, not built here.

[ADR-0005]: 0005-versioning-and-migration.md
[ADR-0018]: 0018-bound-content-width.md
[ADR-0019]: 0019-synced-mobile-model.md
