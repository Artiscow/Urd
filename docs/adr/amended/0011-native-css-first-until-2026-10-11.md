# ADR-0011: Build components native/CSS-first

Date: 27 July 2026. Status: accepted (v0.6, «Modernise to native/CSS»).

## Context

Urd's engine is dependency-free vanilla JS served raw. Several components were originally built «the old way»: custom JS for state, position and animation (rAF and scroll listeners, manual `aria-expanded`, `max-height`/`scrollHeight` hacking, absolute positioning with z-index wars, custom focus traps and outside-click listeners). These dragged along a whole class of nasty, often unsolvable bugs: jank, teleported elements, stuck hover, overlays trapped in a stacking context, lost focus. The field study in [ELEMENTKART.md](../sammenligning/ELEMENTKART.md) (parts 3, 5b and the table in 6) showed that modern builders avoid precisely these by building on browser primitives, and that the platform in early 2026 has baseline primitives for most of it.

## Decision

1. **Native/CSS-first.** New and rebuilt components use browser primitives rather than custom JS where a primitive exists:
   - Modal/lightbox: `<dialog>` + `showModal()` (top layer, `::backdrop`, focus trap, focus return and inert background for free).
   - Accordion: `<details name>` (exclusive expansion, find-in-page, keyboard/screen reader), smooth height via `::details-content` + `interpolate-size` behind `@supports`.
   - Scroll-linked effects (parallax): `animation-timeline: scroll()/view()` (compositor thread) rather than rAF/scroll listener.
   - Menus: the Popover API where anchoring exists. Nav submenus remain disclosure ([ADR-0010]); they are not moved to the top layer until CSS Anchor Positioning is baseline (otherwise the submenu loses its position under the nav item).
   - Theme: `light-dark()` + `color-scheme` against FOUC (future item).
2. **Gate non-baseline with `@supports`.** Everything that is not baseline in early 2026 (scroll-driven animations, `::details-content`/`interpolate-size`, anchor positioning, `closedby`) is wrapped in `@supports`/feature checks. Never assumed.
3. **The fallback is always safe.** Without support the component either falls back to a JS path (parallax keeps the rAF variant) or shows the element in its END STATE - never hidden, never broken.
4. **Observers are for LOGIC, not animation.** `IntersectionObserver`/`ResizeObserver` remain right for reveal (one-off entrance), impressions, active section and resize measurement. Scroll-*linked* motion belongs to scroll-driven CSS. One-off entrance (fade/slide/zoom, stagger) therefore STAYS on IntersectionObserver: scroll-driven `view()` would reverse on scrolling up, and there is no pure CSS lock to the end state.

## Consequences

- Rebuilding deletes fragile JS and gives better accessibility «for free» (e.g. the lightbox got a focus trap it was missing).
- The invariant holds: the props shape is not changed by a pure render rework, so no migration is needed; if a rebuild changes props, [ADR-0005] applies as usual.
- New engine lessons are pinned in [AGENTS.md]. The rule about `@supports` gating and «fallback = end state» is a fixed checkpoint in the test rounds.
- Where a primitive is not mature enough (native masonry, anchor positioning as core), we deliberately wait; see ELEMENTKART part 8.

## Addendum: the anchoring round (22 September 2026, milestone 0.7.12)

CSS Anchor Positioning is baseline (Chrome 125, Safari 18.2 and Firefox 147 for the core; `position-try-fallbacks` from Safari 26 and Firefox 147), and `contrast-color()` is Baseline Newly available since April 2026 (Chrome 147, Firefox 146, Safari 26). The gate from Decision 1 is therefore open, and the round was run on the editor's floating menus rather than on the nav (the submenus were already placed by CSS; ADR-0010 stands, disclosure and never `role="menu"`):

1. **The editor's floating menus use the Popover API plus anchor positioning, behind a feature check.** `Dropdown.svelte`, `ColorPicker.svelte`, `GlyphPicker.svelte`, the engine's `dropdown.js` and `color-picker.js` open in the top layer (so a panel's overflow never clips them), are placed against their button by `position-anchor` and `position-area`, and are flipped away from the viewport edge by `position-try-fallbacks`; light dismiss owns the outside click and Escape. The measuring JS branch (`position: fixed`, `getBoundingClientRect`, flip and clamp, document listeners) stays as the fallback and is unchanged in behaviour.
2. **The gate is the stricter feature.** `anchored.js` requires the Popover API, `anchor-name` AND `position-try-fallbacks` before the modern branch is taken: anchoring without flipping would let a menu near the bottom of the window run off the screen, so a browser with anchors but no fallbacks (Safari 18.2 to 25) stays on the JS branch. The CSS still nests the two `@supports` blocks as documented, so the declarations are inert where unsupported.
3. **What stays in JS.** A window blur still closes the colour picker in both branches (a click in the preview iframe never reaches the admin document, and light dismiss does not see it). The engine dropdown keeps its focus guard (`mousedown` prevented) so a text selection survives the choice. The admin's top-bar menus (`.tool-pop`, the settings popover) were not touched: the top bar does not scroll, so `position: absolute` was never the problem there.
4. **Text on accent surfaces is chosen by `contrast-color()`** when the theme has no `accent-text` token: `buildThemeCss` writes today's effective value (the background colour) as the fallback in `:root` and, behind `@supports (color: contrast-color(#000))`, lets the browser pick black or white against the accent. An owner-set token is kept as it is. The Theme panel offers «Auto» on that cell, which removes the token. This is the answer to FUNKSJONSKART C15 (the contrast warning that was built and removed in 0.6.6.5.4).

[ADR-0010]: 0010-disclosure-navigation.md
[ADR-0005]: 0005-versioning-and-migration.md
[AGENTS.md]: ../../AGENTS.md
