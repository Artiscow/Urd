# ADR-0019: Synced mobile model per block (the row grid)

Date: 13 August 2026. Status: accepted (v0.7, milestone 0.7.3 the mobile reassessment).

## Context

The mobile layout has until now had two modes per section. `auto` derives everything: the blocks are stacked in one column in document flow, sorted by desktop `y` then `x` (`mobileOrder` overrides the key), and decor blocks are omitted. `manual` is set the moment the user hand-adjusts ONE block in mobile view: then ALL of the section's blocks are materialised with concrete `frames.mobile` measured from the flow, and the section is rendered absolutely.

The materialisation is the model's root problem (observed 17 July 2026): it is all or nothing. After the first adjustment every single block is frozen in measured pixels, and the link to desktop is cut for the whole section. The mobile review (the flag set on desktop changes in manual sections) is a plaster over the cut, not a sync. Four concrete symptoms followed: the review badge did not say what should be done where, decor hiding did not work in manual sections (the materialisation gave the decor blocks a mobile frame), `mobileOrder` had no editor UI, and a new desktop block in a manual section landed at its desktop position, often outside the 390 px screen.

The field study (13 August 2026) is unambiguous. Squarespace Fluid Engine, Wix, Wix Studio and Framer all share the same basic model: one responsive page, desktop-first, mobile derived automatically, and mobile changes as overrides PER ELEMENT that never touch desktop. Untouched elements keep following desktop, new elements flow into the mobile layout, and hiding per device is per element. LAERDOMMER 5.1 (the highest-priority lesson in the comparison) points at precisely the Fluid Engine mechanics: «a separate mobile layout that stays in sync», with `minmax` rows that grow with the content without JS.

## Decision

1. **The mobile override is per block, and the marker is the presence of `frames.mobile`.** The field changes shape from a full frame to a PARTIAL placement `{x?, w?, row?, rows?, z?, rot?}`: `null` means the block follows desktop fully, an object without `row` overrides only the fields that are present (the block still flows), and an object with `row` pins the block. The section modes are retired: `responsive.mobile.mode: "manual"` is read by the migration but never written again.

2. **One mobile render path for all sections: the row grid.** `.urd-canvas` gets an inner grid surface (replacing `.urd-flow`) with `grid-template-columns: 100%` and `grid-auto-rows: minmax(8px, auto)`. The constant `MOBILE_ROW = 8` is exported from `migrate.js` and is a model constant, never tied to `grid.size` (which is a snapping tool for desktop).

   - Flow blocks are auto-placed in stackOrder order (sparse, never dense: dense would have backfilled gaps and broken the reading order). Non-text/non-autoGrow blocks span `ceil((desktop.h + 16) / 8)` rows (the span accommodates the flow spacing of 16 px, so the row tracks are never inflated); text and auto-growing blocks span one row and get their natural height.
   - Pinned blocks get explicit `grid-row: row / span rows`, width `w` % and `margin-left: x` % of the surface, plus `z`/`rot`.
   - The `minmax` rows grow when the content is taller than the span. A row position is thus a position in the COMPOSITION, not a frozen pixel distance: if the content above grows, the block follows. That is the sync.
   - Sparse auto-placement means flow blocks never land on top of pinned bands; overlap is only possible pinned-against-pinned, which is deliberate (`z` applies).
   - The section height on mobile becomes implicit (the end of the last row); the minHeight handling in the mobile branch is dropped. The desktop path is not touched.

3. **The ADR-0001 invariant is held strictly.** The published render is a pure function of stored data, identical in editor and production; row growth is the browser's CSS, not JS repositioning. All DOM measurement (pointer y to row index on drag) lives in `preview-edit.js`, which visitors never load. The two load-bearing functions, `stackOrder` and the new `mobilePlacementToCss`, are pure and tested without DOM.

4. **`hideMobile` is separated from `decor`.** New additive block field `hideMobile` (bool, default false) is filtered in the mobile render path, and since the path is now one, «does not work in manual sections» can no longer occur. `decor` is cleaned down to the animation meaning (omitted from the entrance wave); the exemption from layout switching remains (Change layout never moves decor, section-layouts.js), since both are about decor being ornament around the content and not content. The decor factories in the palette and the presets set both fields.

5. **The review shrinks to what can actually drift.** The flag is set only on sections that HAVE overrides (at least one block with `frames.mobile != null`). The badge in the top bar jumps to the first review section in mobile view, and the section shows a review card with translated reason and time (`attention.reason`/`since`, which until now were written but never read). Reset exists at two levels: per block (nulls that block's `frames.mobile`) and per section (two-click confirmation; nulls the placements, but keeps `hideMobile` and `mobileOrder`: visibility and order are intent and not drift, and a preset-set order key cannot in any case be distinguished from a user-set one in the data).

6. **Migration, not grandfathering.** `PAGE_SCHEMA_VERSION` 1 to 2. Per block in manual sections: a `frames.mobile` that is byte-identical to the desktop frame (the materialisation fallback, never intentional) is nulled; otherwise `{x, y, w, h}` is converted to `{x, w, row: max(1, round((y - 24) / 8) + 1), rows: max(1, ceil(h / 8))}` (24 is the flow's top padding, which the measurements included). `mode` is set to `auto`, `attention` is preserved. All blocks with `decor: true` get `hideMobile: true`. `attention.reason` tokens are mapped from Norwegian to English (`layout-changed`, `block-edited`, `desktop-changed-after-mobile`, `section-height`, `block-moved`, `block-deleted`, `block-added`) following the rule on English identifiers in data contracts. The quantisation loss of ±8 px vertically is covered by the pre-v1 clause (ADR-0005 addendum; precedent: the gutter migration 2 to 3).

## Alternatives rejected

- **A separate mobile page (separate document / m-dot).** Google advises against separate mobile URLs and recommends responsive design, and with mobile-first indexing it is the mobile version that is indexed for everyone. None of the builders in the comparison have it; it is double maintenance of content. Source: developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing.
- **The Framer model (declarative variants per breakpoint).** LAERDOMMER 5.11 ranks it last of eleven lessons: «Effort: high (touches the responsive model)». It solves style-per-breakpoint, not layout sync, which is Urd's actual problem.
- **Full materialisation with re-derivation in the editor.** The Squarespace model expressed as data: all blocks keep concrete frames, and the editor recomputes the untouched ones on desktop changes. Rejected because the re-derivation requires a hidden flow measuring pass with three bad timings (on every desktop change is expensive, on opening mobile gives stale publishing if the view is never opened, on publishing puts DOM work into the publishing flow), and because measured px heights freeze content that varies (collection/faq for visitors).
- **Mixed flow and absolute in the same section.** Absolute blocks do not reserve space in the flow, so overlap is unavoidable when text grows. The row grid is the repair of this: pinned blocks DO get space reservation via row tracks.
- **A pure Fluid Engine copy with 8 column tracks.** Column tracks give nothing the rows do not: the width does not have the content-growth problem, and `x`/`w` in percentages already flow. The cost would have been coarser horizontal quantisation and recalculation of all stored widths.
- **Tablet breakpoint.** Deliberately deferred (VEIKART); not reopened by this ADR.

## Consequences

- **Old manual sections change appearance on migration.** The row quantisation moves blocks up to 8 px vertically, and decor blocks that were visible in manual sections become hidden (that was the documented intent; the visibility was the materialisation bug). The pre-v1 clause covers the shift, and `template/content` has no manual sections today.
- **The `urd-mobile-manual` message is dropped, and `urd-mobile-auto` is replaced by `urd-mobile-reset {sectionId, blockId?}`.** The contract is internal (both sides live in the same repo and change in the same commit).
- **Arrow-key moving of pinned blocks in mobile view** is deliberately out of scope: considered in the polish (0.7.3.6).
- **`section.responsive.mobile.mode` becomes dead weight in the schema** until a later clean-up after v1; the field stays readable so old files load correctly.
- **Delete/Backspace gets a mobile guard** in `preview-edit.js` (deletion is structural work and belongs to desktop, as at Wix), alongside the delete button already being hidden there.

[ADR-0001]: 0001-hybrid-editor-model.md
[ADR-0005]: 0005-versioning-and-migration.md
[ADR-0018]: 0018-bound-content-width.md
