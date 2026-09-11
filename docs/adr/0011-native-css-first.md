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

[ADR-0010]: 0010-disclosure-navigation.md
[ADR-0005]: 0005-versioning-and-migration.md
[AGENTS.md]: ../../AGENTS.md
