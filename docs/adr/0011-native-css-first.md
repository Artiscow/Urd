# ADR-0011: Build components native/CSS-first

Date: 27 July 2026. Status: accepted (v0.6, «Modernise to native/CSS»); decisions 1 and 2 amended 22 September 2026 (CSS anchor positioning and `contrast-color()` baseline), earlier text in [amended/](amended/0011-native-css-first-until-2026-10-11.md). How the components are built is described in [ARCHITECTURE.md](../ARCHITECTURE.md).

## Context

Urd's engine is dependency-free vanilla JS served raw. Components built «the old way» use custom JS for state, position and animation (rAF and scroll listeners, manual `aria-expanded`, `max-height`/`scrollHeight` hacking, absolute positioning with z-index wars, custom focus traps and outside-click listeners). That drags along a whole class of nasty, often unsolvable bugs: jank, teleported elements, stuck hover, overlays trapped in a stacking context, lost focus. The field study (now [CODE.md](../comparison/CODE.md), Parts 4 and 6, with the table «Old way, bug, modern fix») showed that modern builders avoid precisely these by building on browser primitives, and that the platform has baseline primitives for most of it.

## Decision

1. **Native/CSS-first.** New and rebuilt components use browser primitives rather than custom JS where a primitive exists:
   - Modal/lightbox: `<dialog>` + `showModal()` (top layer, `::backdrop`, focus trap, focus return and inert background for free).
   - Accordion: `<details name>` (exclusive expansion, find-in-page, keyboard/screen reader), with smooth height behind a feature check.
   - Scroll-linked effects (parallax): scroll-driven CSS animation (compositor thread) rather than rAF/scroll listener.
   - Floating menus (the editor's dropdowns and pickers): the Popover API with CSS anchor positioning behind a feature check, so the menu opens in the top layer where a panel's overflow never clips it, is placed against its button and flipped away from the viewport edge by the browser, and light dismiss owns the outside click and Escape. The measuring JS path (fixed position, flip and clamp, document listeners) is the fallback. Nav submenus remain disclosure ([ADR-0010]) and are placed by CSS.
   - Text on accent surfaces is chosen by `contrast-color()`, letting the browser pick black or white against the accent, unless the owner sets the theme's `accent-text` token; an owner-set token is kept as it is.
   - Theme: `light-dark()` + `color-scheme` against FOUC.
2. **Gate non-baseline with `@supports` and feature checks.** Everything that is not baseline is wrapped; never assumed. The gate is the stricter feature a component needs: for floating menus it is `position-try-fallbacks`, because anchoring without flipping would let a menu near the bottom of the window run off the screen, so a browser with anchors but no fallbacks stays on the JS path.
3. **The fallback is always safe.** Without support the component either falls back to a JS path (parallax keeps the rAF variant) or shows the element in its END STATE - never hidden, never broken.
4. **Observers are for LOGIC, not animation.** `IntersectionObserver`/`ResizeObserver` remain right for reveal (one-off entrance), impressions, active section and resize measurement. Scroll-*linked* motion belongs to scroll-driven CSS. One-off entrance (fade/slide/zoom, stagger) therefore STAYS on IntersectionObserver: scroll-driven `view()` would reverse on scrolling up, and there is no pure CSS lock to the end state.

## Consequences

- Building on primitives deletes fragile JS and gives better accessibility «for free» (the dialog's focus trap and focus return, the popover's light dismiss).
- The invariant holds: the props shape is not changed by a pure render rework, so no migration is needed; if a rebuild changes props, [ADR-0005] applies as usual.
- New engine lessons are pinned in [AGENTS.md]. The rule about `@supports` gating and «fallback = end state» is a fixed checkpoint in the test rounds.
- Where a primitive is not mature enough (native masonry), we deliberately wait; see [CODE.md](../comparison/CODE.md#not-ready-or-deliberately-not-taken), «Not ready, or deliberately not taken».

[ADR-0010]: 0010-disclosure-navigation.md
[ADR-0005]: 0005-versioning-and-migration.md
[AGENTS.md]: ../../AGENTS.md
