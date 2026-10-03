# ADR-0025: The sizing model: the dragged width, and a height that follows the content or is the block's own

Date: 3 October 2026. Status: accepted (v0.7, milestone 0.7.21 stage 1).

## Context

A desktop block is an absolutely placed frame: `x` and `w` in percent of the content surface, `y` and `h` in pixels (ADR-0018). ADR-0024 settled what happens when the content is taller than the frame: the box grows on display and the blocks below are pushed. It did not settle the other direction, nor what a drag of the outline means.

The test of the calendar designs on 3 October 2026 showed the gap. A change of design left the outline at the old height, so one design was clipped by its frame and the next stood in a frame with air under it; a first answer scaled the whole calendar, text included, when its outline was dragged, which no owner expects; and a calendar could not be made smaller by its outline at all.

The survey of the same day (LAERDOMMER §2, «What a drag means») measured every block type in the preview in a frame that was too short, too tall and narrow, and found three behaviours that nobody had chosen:

- **The box decides and the content fills it:** image, video, icon, shape, button, gallery and ribbon.
- **The content decides and stands at the top of whatever box it is given:** calendar, collection, product, cart, checkout, countdown, FAQ, form, quote, share, stats, table and timeline. A frame taller than the content shows as an outline with air in it. This is thirteen block types, not the calendar alone.
- **Text:** at least as tall as its words, and as tall as it is dragged beyond that.

Two block types fell outside: the audio block stretches its player to the frame, and the map ignores the frame's height and uses a height setting of its own.

The builders agree on the model, under different names. Squarespace Fluid Engine sizes each block type either intrinsically (the content decides, text) or extrinsically (the owner decides, image), and gives image and button a «Fit» or «Fill» choice with an alignment inside the box. Figma and Framer name three behaviours per axis: fixed, hug (fit content) and fill; Framer recommends fit content for everything whose content varies and warns that a parent that hugs and a child that fills on the same axis leave neither with a size. Webflow's default height is the content's, and a minimum height is the safe way to ask for more. Wix Studio's documented source of unexplained white space is a stored minimum height that the content no longer reaches. In every one of them a drag changes the box; the content flows in it; text size is a setting of the text; and scaling everything proportionally is an explicit choice with a smallest and a largest text size.

## Decision

1. **The width of a block is the width it was dragged to.** No block takes its width from its content. The content flows in the width it is given.

2. **The height has two behaviours, and each block type has one as its default.**
   - **Own height:** the frame decides and the content fills it. Default for image, video, icon, shape, button, gallery, ribbon and map. The map's own height setting goes, and the frame takes over.
   - **Follows the content:** the outline is the content. Default for calendar, collection, product, cart, checkout, countdown, FAQ, form, quote, share, stats, table, timeline and audio.
   - **Text** keeps what it has: never shorter than its words, and as tall as it is dragged, since a text block can be a card with a background.

3. **The owner can choose per block.** The Placement area of the element menu offers «Follow the content» or «Own height» on a block whose type allows both. With its own height the block gets an alignment of the content inside the box (top, middle, bottom), and «stretch» on the block types that can use the height. A block is one or the other, never both on the same axis.

4. **A block that follows its content cannot be dragged in height.** The drag stops where the content ends and shows a mark while it is held, instead of being accepted and undone. A height that arises by accident becomes white space nobody can explain; the owner who wants a taller block chooses «Own height», and then the drag works.

5. **The frame of a block that follows its content is the content's height at the design width, and the editor sets it.** After an edit of the block (its design, its variant, its settings, its width) the editor asks the preview for the height the content needs and writes it into `frames.desktop.h`. This amends ADR-0024 decision 2 in one respect: an edit of the block is an edit of the design, so the design height changes with it. A measurement on the published page is still never written anywhere. On display, a block that follows its content is drawn at its content's height, also when that is less than the frame, so a feed with fewer entries leaves no empty box; the blocks below keep their design positions, since the push pass moves blocks down only.

6. **Scaling the whole block, text included, is a setting of its own and no drag touches it.** «Size» is the owner's choice and always applies, with a smallest and a largest text size it never passes. `fit: "shrink"` (ADR-0024 decision 6) is the automatic answer below the design width. They multiply, and the element menu shows them together.

7. **What is shown during a drag is what is stored on release.** A block adapts to its own width (container queries, gated with `@supports`, ADR-0011), so the narrow layout shows while the block is dragged narrow; and a drag never ends in a size other than the one the owner saw.

## Consequences

- The lower drag handle on a block that follows its content changes the width only, until the block is given its own height. The handle shows why.
- Thirteen block types stop showing an outline with air in it; whether each of them can «stretch» is decided block by block, and for the calendar design by design.
- The calendar's first answer (0.7.20.1) is the model's first implementation and stays: the frame fitted after a change of design or settings, a drag that keeps the box, and «Size». Its `growOnly` after a drag is replaced by decision 4 when the stop at the content is built.
- `urd-grow` gains a second sender: besides plugin copies, the preview answers the editor's `urd-fit-block` with it. The editor redraws the section at the new height.
- The map's height setting needs a migration to the frame (ADR-0005): a stored map keeps the height it shows.
- The mobile view already follows the content (the row grid, ADR-0019); the model adds nothing there except the same alignment and stretch where a block has its own height.
- A per-axis choice for the width (a block as wide as its content) stays outside: no block needs it today.

The stages are in BACKLOG under 0.7.21.
