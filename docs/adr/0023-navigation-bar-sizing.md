# ADR-0023: Navigation bar sizing

Date: 16 September 2026. Status: accepted (v0.7, milestone 0.7.15).

## Context

The navigation bar's size is set by one control today: the four-step `nav.style.size` enum (sm/md/lg/xl), which the `urd-nav-size-*` classes in `base.css` turn into a vertical padding and a font size in rem. Everything else is fixed in the stylesheet. The side padding is the hard-coded `clamp(1rem, 4vw, 2.5rem)`, repeated in the mobile panel and in the side-to-bar fallback. The floating pill is `min(1100px, 100% - 2rem)`. The gap between the menu items is fixed. The side column width (`nav.style.width`, 180-400) is set by dragging only. The logo height (`nav.logo.size`) is desktop-only, with no mobile value. The compact state on scroll (`.urd-nav-compact`) multiplies the padding by a fixed factor 0.5. And nothing binds the bar to the content width of [ADR-0018]: `--urd-canvas-w` and `--urd-canvas-gutter-desktop` are set on `<html>` by `applySiteLayout` and are readable from the nav host, but the nav never reads them, so the bar is the one surface on the page whose contents do not line up with the content edge.

A survey of ten builders (LAERDOMMER §2, 16 September 2026: Squarespace, Wix classic, Wix Studio, Webflow, Shopify Dawn, Elementor, WordPress block themes, Framer, Duda and GoDaddy, Hostinger, Carrd) gave five rules. Thickness is padding everywhere: Squarespace's Height slider and Wix's drag handle are the same value with a different handle, and nobody fixes a bar height the content must fit into. Width is a two-way choice, full-bleed or bound to the page's content width, with the background always full-bleed (Squarespace Full/Inset, WordPress content/wide/full, Wix Studio stretch or max width, Webflow's container). The logo has its own size and often a second mobile or compact size (Squarespace, Shopify's reduce-logo mode), the compact-on-scroll state is configurable in itself (Duda, Shopify, Framer) while the transparent-to-solid colour while scrolling is a separate feature (Wix Studio), and mobile gets its own thickness and logo size (Squarespace).

## Decision

1. **Thickness is padding.** The four presets stay and set `--urd-nav-size-pad`; free px values (`nav.style.padY` for the vertical padding, `nav.style.textSize` for the menu text) override them through inline custom properties on the nav element (`--urd-nav-pad-y` and an inline `font-size`). The chain in `base.css` is `--urd-nav-base-pad: var(--urd-nav-pad-y, var(--urd-nav-size-pad, 0.9rem))`, so a stored padY wins over the preset and the preset over the fallback. An explicit padY is raw in every variant, while the floating pill's 0.67 factor applies to presets only: the pill overrides `--urd-nav-base-pad`, never the derived `--urd-nav-pad`. With an image logo the bar's floor is 36 px whatever padY says, because the logo's margin calibration contributes a constant; the editor therefore describes thickness as padding, never as bar height.

2. **Width is full-bleed or bound.** `nav.style.inset` binds the bar's contents to the content edge on desktop only: the side padding becomes `max(padX, the desktop gutter, (100% - canvas width) / 2)`, resolved against the body-wide host, the same reference the canvas uses. The background always spans the viewport. `nav.style.padX` sets the side padding directly (and drives the mobile panel and the side-to-bar fallback through the same `--urd-nav-px`), and `nav.style.gap` sets the space between the menu items. The floating menu's width, `nav.style.pillWidth`, is a px value or the string `content` (the content width less the desktop gutters); it is suppressed at the mobile breakpoint, where the pill keeps `100% - 2rem`.

3. **The mobile and compact states carry their own overrides, chosen by `nav.js` at render time.** `nav.style.mobile.padY`, `nav.style.mobile.textSize` and `nav.logo.mobileSize` are picked by the pure `navSizeVars(style, logo, { mobile })` helper in `nav-model.js` and written inline, never by CSS class rules: the `urd-nav-mobile` class is also set by desktop content folding, and a class rule can never beat an inline value. The breakpoint crossing re-renders the nav, and every draft message rebuilds it, so a stale value cannot survive. The compact state gets `nav.style.shrinkTo` (0.3-0.8, default 0.5) and `nav.style.shrinkLogo` (the logo image scales with the padding). The factor lives inline on the nav element as `--urd-nav-shrink-to` while the host carries the state class, so the compact rule targets the nav: `.urd-nav-compact .urd-nav { --urd-nav-shrink: var(--urd-nav-shrink-to, 0.5) }`. The logo height is written as `--urd-logo-base` on the img, and the CSS derives the rendered size from it so the shrink-logo rule can scale it.

4. **Everything is additive with today's look as the default.** Every new field is optional, and an omitted field renders exactly as before: the presets, the fluid side padding, the 1100 px pill, the desktop logo size and the 0.5 shrink are the fallbacks in the CSS. Defaults are never written to the file (`setNavStyle` deletes on undefined, and an emptied `mobile` object is removed), and `nav.version` is untouched. No migration, per the pre-v1 clause of [ADR-0005].

5. **Border and shadow follow as the last stage with the same additive model:** `nav.style.border` (width, side, colour) and `nav.style.shadow` (none/soft/strong) as allowlisted classes (`urd-nav-border-<side>` with the width and colour as variables, `urd-nav-shadow-<strength>`), the border for bar and floating, the shadow for the bar only since the pill has its glow (milestone 0.7.15.7, FUNKSJONSKART C18). The transparent-to-solid colour while scrolling stays a separate item (0.7.13).

## Consequences

- **The four variant-bound fields are shown by the editor only where they apply** (the relevance rule of 23 July 2026): `inset` for the bar variant, `pillWidth` for the floating variants, `width` for the side variant, and `shrinkTo` with `shrinkLogo` only when `nav.scroll` is shrink (the logo shrink only when the logo has an image). Thickness, side padding, item spacing and the mobile group are hidden for the side variant; a preset click clears `padY` and `textSize` in one history step.

- **The side column keeps its own padding** (`1.2rem 1rem`): the column never followed the presets, and `padY` and `padX` do not touch it. Only `size`, `textSize` and `width` apply there.

- **The stamp duty on `base.css`:** the change to the stylesheet requires a new djb2 `?v=` stamp in the root `index.html`, `admin/index.html` and every slug copy, byte-identical to the root (the copy-refresh duty of ADR-0013; the modulepreload test guards it).

- **Tests for the pure helpers:** `navSizeVars` and the two new classes in `navClasses` in `tests/nav.test.mjs` (empty style gives empty vars, clamping at both ends, the mobile picks, the `content` pill width and its suppression on mobile); the editor's `nav-size.js` in `tests/nav-size.test.mjs`, with a parity test binding its bounds to the engine's `NAV_SIZE_BOUNDS` so the two can never drift.

- **The schema in three places in the same commit:** `schema/site.schema.json` (`nav.style` has `additionalProperties: false`, so every key is listed), `docs/SCHEMA.md` and `template/content/site.json` (which carries `nav.logo.mobileSize` so the validation covers a new field).

- **The mobile breakpoint is the one of [ADR-0019]** (`breakpoints.mobile`); the collapse breakpoint as a nav setting of its own is recorded as a proposal, not built here.

[ADR-0005]: 0005-versioning-and-migration.md
[ADR-0018]: 0018-bound-content-width.md
[ADR-0019]: 0019-synced-mobile-model.md
