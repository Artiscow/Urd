# ADR-0025: The sizing model: the dragged width, and a height that follows the content or is the block's own

Date: 3 October 2026. Status: accepted (v0.7, milestone 0.7.21); decisions 4, 5 and 8 amended 4 and 11 October 2026, earlier text in [amended/](amended/0025-the-sizing-model-until-2026-10-11.md); decision 6 amended 17 October 2026 (the size scales everything alike, the text bounds are the owner's choice, and a type may have a scale of its own), earlier text in [amended/](amended/0025-the-sizing-model-until-2026-10-17.md); decision 2 amended 21 October 2026 (the contact block follows its content), earlier text in [amended/](amended/0025-the-sizing-model-until-2026-10-21.md). How the decisions are built is described in [ARCHITECTURE.md](../ARCHITECTURE.md#desktop-sizing-the-push-pass-the-fit-and-the-gestures); the fields are in [SCHEMA.md](../SCHEMA.md).

## Context

A desktop block is an absolutely placed frame: `x` and `w` in percent of the content surface, `y` and `h` in pixels (ADR-0018). ADR-0024 settled what happens when the content is taller than the frame: the box grows on display and the blocks below are pushed. It did not settle the other direction, nor what a drag of the outline means.

The test of the calendar designs on 3 October 2026 showed the gap: a change of design left the outline at the old height, so one design was clipped by its frame and the next stood in a frame with air under it.

The survey of the same day ([SURVEYS.md](../comparison/SURVEYS.md#what-a-drag-means-how-the-builders-size-an-element-3-october-2026), «What a drag means») measured every block type in the preview in a frame that was too short, too tall and narrow, and found three behaviours that nobody had chosen:

- **The box decides and the content fills it:** image, video, icon, shape, button, gallery and ribbon.
- **The content decides and stands at the top of whatever box it is given:** calendar, collection, product, cart, checkout, countdown, FAQ, form, quote, share, stats, table and timeline. A frame taller than the content shows as an outline with air in it.
- **Text:** at least as tall as its words, and as tall as it is dragged beyond that.

Two block types fell outside: the audio block stretched its player to the frame, and the map ignored the frame's height and used a height setting of its own.

The builders agree on the model, under different names. Squarespace Fluid Engine sizes each block type either intrinsically (the content decides, text) or extrinsically (the owner decides, image), and gives image and button a «Fit» or «Fill» choice with an alignment inside the box. Figma and Framer name three behaviours per axis: fixed, hug (fit content) and fill; Framer recommends fit content for everything whose content varies. Webflow's default height is the content's, and a minimum height is the safe way to ask for more. Wix Studio's documented source of unexplained white space is a stored minimum height that the content no longer reaches. In every one of them a drag changes the box; the content flows in it; text size is a setting of the text; and scaling everything proportionally is an explicit choice with a smallest and a largest text size.

## Decision

1. **The width of a block is the width it was dragged to.** No block takes its width from its content. The content flows in the width it is given.

2. **The height has two behaviours, and each block type has one as its default.**
   - **Own height:** the frame decides and the content fills it. Default for image, video, icon, shape, button, gallery, ribbon and map. The map's own height setting goes, and the frame takes over, with a migration that keeps the height a stored map shows (ADR-0005).
   - **Follows the content:** the outline is the content. Default for calendar, collection, product, cart, checkout, contact, countdown, FAQ, form, quote, share, stats, table, timeline and audio (`FOLLOWS_CONTENT` in push-model.js).
   - **Text** keeps what it has: never shorter than its words, and as tall as it is dragged, since a text block can be a card with a background.

3. **The owner can choose per block, as one additive field.** On a block whose type follows its content by default, `height: { mode: "own", align? }` gives it its own height: the block takes the dragged height, the editor fits it no more, and the content stands in the box at the top, in the middle, at the bottom or stretched. Stretch is offered only where the type can use the height: the figure, the countdown and the quote, and the calendar in its plain list and card views, where the rows and cards spread. A block is one or the other, never both on the same axis.

4. **A block that follows its content cannot be dragged in height.** The drag stops where the content ends and shows a mark while it is held. A height that arises by accident becomes white space nobody can explain; the owner who wants a taller block chooses «Own height», and then the drag works.

5. **The frame of a block that follows its content is the content's height at the design width, and the editor sets it.** After an edit of the block (its design, its variant, its settings, its width) the editor asks the preview for the height the content needs and writes it into `frames.desktop.h`: an edit of the block is an edit of the design (ADR-0024 decision 2). A measurement on the published page is never written anywhere. The fit measures the block at rest as a visitor sees it. A taller fit moves the blocks below in the data, exactly as far as the push pass already drew them, so nothing jumps; a shorter fit moves nothing, since the push moves blocks down only. On display, a block that follows its content is drawn at its content's height, also when that is less than the frame, so a feed with fewer entries leaves no empty box.

6. **Scaling the whole block, text included, is a setting of its own and no drag touches it.** «Size» is the owner's choice and always applies: it draws everything in the block alike, as a picture, so the content keeps its lines at any size. The owner may give the base text a smallest and a largest size, and the size then stops where the text meets one; without them the size spans its whole range. A type may be drawn at a scale of its own at 100 %: the calendar is a dense widget and draws its designs at a 14 px base for the page's 16 px, the base dense widgets use (the survey of 17 October 2026 in [SURVEYS.md](../comparison/SURVEYS.md)). `fit: "shrink"` (ADR-0024 decision 6) is the automatic answer below the design width. They multiply, and the element menu shows them together.

7. **What is shown during a drag is what is stored on release.** A block adapts to its own width, so the narrow layout shows while the block is dragged narrow, and a drag never ends in a size other than the one the owner saw.

8. **A gesture places the box the owner sees, and a section's own height is the owner's.** A gesture (a drag, a resize, an arrow key, align or distribute) starts from the boxes the owner sees: the growth the push pass drew is settled into the frames in the gesture's undo step, and only growth is settled; a block drawn shorter than its frame keeps it until an edit fits it. A gesture never raises a section with a height of its own: a block counts towards such a section only while its box is inside it, and a block placed or grown past the edge lies over the section below. Nothing the owner does in the editor raises a section with a height of its own: not a fit, not a settle, not a gesture, and not the push pass in the preview. The pass raises it only on the published page, where the visitor's content has to fit. A section with no height of its own follows its blocks everywhere, growth included, and the mobile row grid follows the content (ADR-0019).

## Consequences

- The lower drag handle on a block that follows its content changes the width only, until the block is given its own height. The handle says why.
- The block types that follow their content show no outline with air in it; whether each of them can stretch is decided block by block, and for the calendar design by design.
- The preview shows the design the owner drew and the published page what the visitor needs: a block whose content outgrows a section with a height of its own lies over the section below in the editor, where the owner decides between a taller section, a smaller block and the overlap, while visitors see the section grown.
- The editor's section heights are the published page's: the editor's own parts may overlap the block below while editing, since they never push.
- A per-axis choice for the width (a block as wide as its content) stays outside: no block needs it today.
