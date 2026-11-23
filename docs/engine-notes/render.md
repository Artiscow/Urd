# render.js

The full text of the longer comments in the engine's `render.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The render loop: page → sections → background layers + blocks.

All data is lifted via migrate.lift() before rendering. Unknown types and
render errors yield neutral placeholders (blocks) or are skipped
(background layers are decorative) - the page never crashes on bad data.

Two viewports (opts.viewport):
 - 'desktop': absolute positioning from frames.desktop.
 - 'mobile': the row grid (ADR-0019), one path for all sections.
   Blocks without frames.mobile are auto-placed in reading order (stackOrder in phone-order.js, by the section's rule, its stacks, its blocks' exceptions and its custom order).
   Blocks with row in frames.mobile are pinned to explicit row tracks.
   hideMobile blocks are omitted, text and auto-growing blocks get natural height, and the section height follows from the grid.

## `renderBackgroundLayers`

Draws the background layers (color/gradient/glow/grain/image/pattern/slideshow/video)
into host as `div.urd-bg-layer` elements, bottom-up. Shared by sections
(render.js), nav (nav.js) and footer (footer.js) - the same layer model
everywhere. Each layer is lifted via lift() before render; unknown types
and render errors are skipped with a warning (backgrounds are decorative,
they never topple the page).

## `loadStylesheet`

Adds a stylesheet to the document once, for the code that needs it alone (the preview's rules, a calendar's): resolves when it has loaded or failed, so the caller draws with it in place, to whether it loaded.
A caller whose rules must keep their order among sheets of its own passes `place`, which puts the link there (the calendar's sheets, calendar-load.js); without it the link goes at the end of the head.

## `placeInOrder`

The one way an engine sheet is placed among sheets of its own kind: the block modules' sheets (core-types.js) and the calendar's (calendar-load.js) each keep the order their rules stood in when they were one sheet, whatever order the browser fetches them in, since a rule that meets another at equal specificity wins by its place. A group's first sheet follows `after()` (the block sheets follow base.css, where their rules stood), and without it goes at the head's end.

## `applySiteLayout`

Writes the site's layout tokens on the root element (ADR-0018). The canvas
in every section reads them, so one write governs the whole page.

Lives here rather than in its own module on purpose: new engine modules
are pulled into the static import closure, which the modulepreload test
forces into every HTML shell.

## `applySiteLayout › const gutter`

The gutter is a PERCENTAGE OF THE VIEWPORT WIDTH (vw), not pixels: it only
acts in the band where the width does not bind yet, and there the
breathing room should follow the screen.

## `growSectionTo`

Raises the section's min-height so content down to `bottom` px (in content
surface coordinates) fits. Used by auto-growing blocks. The section is
content-box with the nav clearance as padding (base.css), so both the
computed min-height and `bottom` are pure content heights, and the
inline value stays a plain length (the compatibility surface plugin
copies rely on, see SCHEMA.md).

## `const WIDTH_QUERIES`

Whether the browser answers container queries: a block that follows its own
width (followsWidth) then lays itself out by its box (ADR-0025 decision 7),
and without them by the window, as the page's phone view.

## `drawnWidth`

A block's width across the canvas as drawn, in percent of the canvas: a width floor draws a picture wider than its frame on a narrow canvas (frameToCss), and the push reads the width a visitor sees, never less than the frame's.

## `applyPush`

Measures every block against its frame and moves the blocks below a block
whose content grew (pure rules in push-model.js). The shifts live only on
the elements (style.top and data-urd-shift), never in the frames; the
section grows when the pushed content needs more than its design height,
and returns to it when the growth is gone. A pinned block keeps its stash
up to date instead of its inline top, so a release lands right.

## `applyPush › if (pushSuspended`

While editing has the push suspended, every block stays where the
last pass put it: the drag draws its block with the block's own shift
(pushShiftOf), and the resume pushes again from the new frames.

## `applyPush › const across`

The pass reads and writes in phases, so the reads of most blocks share one layout rather than one each (a block that follows its content, or holds the editor's own parts, measures with writes of its own): the canvas's width first, before anything is written.

## `applyPush › for (const { el, block, frame } of`

The box follows its content down to the design height and never
below it: taller content grows it, content that fits again (a wider
window, a text set to shrink) gives the design height back. Measured
with the box at the design height, since the content's min-height
follows the box. A block whose height follows its content (ADR-0025)
is drawn at the content's own height, also below the design height,
while the blocks below keep their places, since the push moves blocks
down only.

## `applyPush › it.seen`

The editor's own parts (the adders, the placeholders of empty fields)
are drawn but never push: the growth is the content a visitor sees, so
the editor's section heights are the published page's.

## `applyPush › if (needed !== frame.h`

The drawn box is kept, so a redraw between passes (a drag, the arrow
keys, align) can put it back instead of the design height. The shift
is kept the same way, below.

## `writePush › host.style.minHeight`

The section's own height, the line a block has to stay inside to have a
say in it. A block placed past it lies across the sections below instead
of stretching the one it belongs to; a section with no height of its own
still follows every block. The height is the owner's: in the editor the
growth never raises it, and a block that outgrows it lies over the
section below, where the owner sees it; on the published page the
growth raises it, so a visitor's content never lies over the next
section (ADR-0025 decision 8).

## `writePush › const own`

A section with no height of its own reaches the bottom of its blocks' frames as they stand now, a frame a typed text has written since the section was drawn included; between draws it only grows, so the section a dragged block leaves keeps its height.

## `writePush › if (!skipBox?.has(it.id) && inside(it)`

A block being dragged is drawn where the pointer holds it, but it does
not decide how tall the section is, so the section it is leaving keeps
its height and the drop target stays uncovered.

## `pushPreview`

The push as it will be after a drag ends, drawn live during the drag:
the growth measured by the last pass is kept, the frames of the blocks
being dragged come from `frames` (block id to frame), and every block's
top is written as the pass would write it, so the release changes
nothing the owner has not already seen. A block whose content changes
height under the drag (one that follows its content, dragged narrower)
brings its growth as it is now in `grown`. The blocks being moved are left
out of the section height by default; a resize keeps its block in it, so a
section that follows its blocks follows the resize.

## `updateFrames`

New frames for blocks that are already drawn, put in place without
drawing the section again, so a caret in the block's text stays where it
is (the editor's fit of a frame to its content, ADR-0025). The frames go
into the section the push pass holds, the one the editing layer reads too,
and the pass draws the heights and the places from them.

## `fitContent`

The content's zoom on the desktop: the block's drawn scale (ADR-0025
decision 6, block.size times its type's scale, drawnScale) times its fit
below the design width (ADR-0024, block.fit).
«Shrink» follows the canvas in proportion: the zoom is the canvas width
over the design width, down to the block's floor (block.fitMin, a share
of the design size), so the content keeps its lines and nothing is
measured; under the floor the box is narrower than the content and it
wraps like any other. «Both» zooms only as much as the frame needs and
lets the content wrap: the largest zoom from 1 down to the floor at which
the content fits the design height is found by bisection; content that
fits at full size is left alone, and content that does not fit at the
floor keeps the floor, wraps, and is pushed like any other. A block
without the field (wrap), or of a type that shrinks by its frame instead,
is drawn at its drawn scale alone, so a switch back needs no re-render. The
bisection measures with the box at the design height and the content's
min-height off, since the content otherwise fills the box.

## `canvasRatio`

How much narrower than its design width the block's canvas is: 1 at the
design width and above, and where nothing has a design size (a
full-width section or one whose width is not in px, or a full-width site whose section has no px width, renderSection).

## `applyZoom`

Draws the content at a zoom: everything in it, text included, scales
alike, so the content keeps its lines at any size. A bound the owner
gives the base text stops the size there (sizeRange); the shrink below
the design width multiplies it.

## `stickOnPhone`

Pins a group of blocks on the phone while the page scrolls (`sticky.phone`, 0.7.3.10).
A grid item may stick only inside its own grid area, which in the row grid is the block's own rows, so the blocks stand in a holder over the whole grid instead: a layer as large as the grid, where the holder sticks below the menu (`--urd-scroll-clear`) at the group's offset and lets go where the section ends, natively.
With a release at a later section (`until`) the layer reaches down to that section's foot, over the sections between, so the holder lets go once it has passed.
Each block keeps a slot of its size in the grid, so the blocks around it keep their places, and stands in the holder where its slot stands in the grid (placeStuck), measured again as the blocks or the grid change size.

## `placeStuck`

Brings the blocks pinned on the phone in a holder to their slots: each slot as tall as its block, the holder over the group's slots, and each block where its slot stands (stuckBox in sticky-model.js).
Exported for the editing layer, which moves a slot by the keys.

## `placeStuck › const layer`

A release at a later section: the layer reaches down to that section's foot, watched with the page's sections as they change size, since a section between moves it too.

## `const stickWatch`

The row grids holding blocks pinned on the phone, those blocks, and the sections they are released at with the page that holds the sections: a change of a block's size or of the grid's moves the slots, and a section's the foot the layer reaches, so each holder is placed again in the next frame.

## `zoomOnPhone`

A block's zoom on the phone: its drawn scale (ADR-0025 decision 6), and for a block that shrinks there (shrinksOnPhone in push-model.js) the share that keeps the lines it has at the design width (phoneFitZoom), read again as its width changes (a phone turned, the editor's phone made wider).

## `const phoneFitWatch`

The phone blocks that shrink, each zoomed again in the next frame as its width changes; one observer for every block, and the zoom waits for the frame since it changes the block's height, which a zoom inside the notification would report back to it.

## `contentHeight`

The height the block's content needs, in the block's own px. Measured on
the content children, not on the block, so the editing handles that hang
below the box never count; a zoomed child (a text set to shrink) is
converted from its own zoom to the block's.

## `naturalHeight`

The height a block's content takes when the box leaves it its own, in the
block's px (ADR-0025). The box is set to auto for the measure, so content
that fills its box (a height or a min-height of 100 %) comes back to the
height it needs, and the box gets its height back after. The box's own
height covers content stacked in several children, and each child's scroll
height covers content that overflows it. Demo content is measured too: the
editor fits a frame to what the preview shows.

## `unfoldedHeight`

The height the open `<details>` of a block add beyond their summaries, in
the block's px: an FAQ answer or a calendar's fold that a visitor has
unfolded is view state, never the design.

## `unfoldedHeight › for (const text of`

A text drawn as questions stands in the editor with every part open to be written in (blocks/text.js): what lies between one question's row and the next is an open part, as an unfolded fold's answer is.

## `const EDITOR_ONLY`

The editor's own parts inside a block: the image adders, the «+ Product» card, the placeholders of empty fields and the hints of a calendar's removed or empty lines.
They are drawn in the preview but are never part of the page, so the push and the fit measure a block without them.
preview.css hides the same list under `.urd-fit-measure`, and a test holds the two equal.

## `visitorHeights`

A block's heights as a visitor sees it, without the editor's own parts
(ADR-0025): `natural` with what a visitor has unfolded, the growth the
push answers; and `resting` without it, the height the editor's fit and a
settled gesture write into the frame.

## `drawsAtContent`

Whether a block that follows its content is drawn at it: a block still
loading its content (`aria-busy`) holds the frame's height so the page
does not jump when the content arrives.

## `hugHeight`

The height a block that follows its content is drawn at, or 0 to keep its
frame's: while it is not drawn at its content (drawsAtContent), and when
it has nothing to show, so the box can still be found and selected.

## `syncSectionHeight`

Writes a section's design height for the push pass from the section data:
its own height, or the blocks' extent when it has none, the way
renderSection writes it. Called after frames change without a redraw.

## `wirePush`

Wires the push pass for a freshly rendered desktop section: a first pass
after the blocks' own measurements (they queue their frames before this
one), and a ResizeObserver on every block and its content for fonts,
images, feeds and width changes. The observer runs the pass synchronously:
its notifications are delivered after layout and before paint, so a text
that wrapped at the new width is fitted and pushed before the frame is
drawn. The pass is deterministic, so a second delivery in the same frame
finds the same sizes and the loop ends. Hosts that left the document (a
page switch in the preview) are dropped here with their observers.

## `wirePush › if (el.dataset.urdHeight === 'content'`

A block that follows its content is watched through its content alone:
the pass writes its box at every change of the content, and a box the
observer watches, resized inside its own callback, would come back as
a notification it cannot deliver in the same frame.

## `suspendPush`

Editing that writes geometry is starting: the push pass stands still, so
every block stays where the owner sees it, pushed or not, and nothing
jumps when a drag begins. The drag draws its own block with the block's
shift on top of the frame (pushShiftOf), and the frame it writes stays
free of the shift. Paired with resumePush, which pushes again from the
new frames.

## `pushDrawnOf`

The height the last push pass drew a block at, or 0 when that was its
frame's: taller when the content grew past the frame, and shorter for a
block that follows its content (ADR-0025). A redraw between passes draws
this instead of the frame's height.

## `resumePush › requestAnimationFrame`

A block with a phone design that a gesture took across its width's line is drawn again once the gesture is over, in the frame after the gesture's own messages (watchPhoneDesign).

## `sectionMinHeight`

The inline min-height of a desktop section: the stored size, or the
blocks' extent when the section has none. Always a plain CSS length,
never a calc(): plugin copies parse it with parseFloat.

## `applyFrameCss › el.style.setProperty('--urd-block-rot')`

The rotation as a custom property too, so the editing chrome can turn
itself back upright. A custom property cannot go through the style map
frameToCss returns, since Object.assign does not reach them.

## `frameToCss`

Translates a frame to CSS positioning.
Pure function (no DOM), tested in tests/render.test.mjs.

Frames are in PHYSICAL units: x/w as a percentage of the
canvas width (flows with the screen below the design width), y/h in px. The grid is only a
snapping tool while editing and never affects placement.

## `frameToCss › const width`

A width floor (an image, video, shape or icon block set to shrink, fitFloorPx in push-model.js): the
frame never gets narrower than the floor, and is capped at the canvas's
right edge so it never overhangs into the gutter.

## `autoGrows`

Whether a block's height on the phone follows its content in the row grid: text and the terms of sale always, and a type that says so with `autoGrow` on its definition, either a flag or a function of the block's props (a gallery grows in its grid views and keeps its frame's height as a ribbon).

## `measuredText`

Whether a block's words are measured by the desktop's «Force readable text» (ADR-0034 decision 3): a text block in its plain design, whose width handle stops at the readable floor and whose section shows its phone layout under the width it would fall under it (phoneHandoff).

## `watchHandoff`

Watches the window width under which a section shows its phone layout, so it is drawn again as the window crosses it; a section drawn anew drops its earlier watch, and one no longer on the page drops its own.

## `phoneCellCss`

The place in the row grid of what stands in cells: a cell of flowing blocks (render.js wraps the blocks one after another in the same cells in one, so they stand under each other and the next block in other cells shares their line), or a block pinned in cells.
Its grid columns, and its inner edges half the space between blocks in, so two cells side by side stand that space apart while the outer edges line up with a block across the full row.
The grid's first line is the row's outer edge (base.css), so cell column c starts at line c + 1.

## `mobilePlacementToCss`

Translates a mobile placement to CSS for the row grid (ADR-0019).
Pure function (no DOM), tested in tests/render.test.mjs.

`placement` is the block's frames.mobile: null means the block follows
desktop entirely, an object without `row` overrides only the fields it
contains (the block still flows), and an object with `row` pins the block
to explicit row tracks. The rows are minmax(MOBILE\_ROW, auto) and grow
with the content, so a row position is a position in the composition, not
a frozen pixel distance.
A placement with cells (`col` and `cols`, phoneCells) stands in those of
the eight cell columns: pinned, as a grid item of its own (phoneCellCss);
flowing, in its cell's whole width, the cell placed by render.js. A block
whose size is its frame keeps its desktop shape there, its height
following its width.
A flowing block's own height on the phone (`height`) takes the desktop
height's place: a least height for a block that grows with its content,
and the whole height for any other, a picture or a film then filling it.

## `mobilePlacementToCss › const rows`

Pinned: explicit row tracks. Without rows the span is derived from
the desktop height. Height is not set: the element stretches to its
tracks (grid stretch), and when the content grows, the tracks grow too.

## `mobilePlacementToCss › if (cells`

Flowing: auto-placed. Partial overrides apply only to the fields
actually present in the placement. A block in cells stands in its cell's whole width (phoneCellCss places the cell).

## `mobilePlacementToCss › const own`

The block's own height on the phone (`height`) stands in the desktop height's place: a block that grows with its content stands at least that tall, any other that tall.

## `mobilePlacementToCss › const shape`

A block whose size is its frame, in cells narrower than the row: its desktop shape, the height following the cells' width and the row growing to it, until it has a height of its own, which the picture then fills.

## `mobilePlacementToCss › if (own`

Its content's height, or at least its own height on the phone, the content growing it past; a picture or a film with a shape takes its own height whole, and fills it.

## `mobilePlacementToCss › const gap`

A fixed height, the span holding the block and the gap under it (margin-bottom, `--urd-mobile-gap` in base.css).
The span holds the standard gap at most: a larger gap grows the row tracks, as a text block's margin does, so a block placed by hand below keeps its distance and no flowing block jumps past it.

## `anchorTargets`

The spots of a section a link can land on, beyond the section's own id: the section's name, each drawn block's name, and the ids and names of the blocks hidden on the screen (on a phone those hidden there, on the desktop those shown on phones only), which land on the section's top instead.
Each spot names the section or block it stands for (`of`).
Names that do not follow the naming rule are left out.

## `placeSpot`

Draws a spot a link can land on as a zero-size marker at the top of `host`; a name records the section or block it names (data-spot), so urd.js can show the name in the address.
An id already on the page is left where it is, so the first spot to claim a name keeps it.

## `sideColumn`

The width a side menu's column takes beside the page, in px: the body's room for it (base.css `urd-side-left`, `urd-side-right`), as nav.js sets it; 0 without one.

## `renderSection › const ctx`

`handoff`: a section showing its phone layout on a desktop page keeps the desktop's measure on its texts (blocks/text.js), its row being as wide as the desktop's canvas.

## `renderSection › if (typeof section.id === 'string' &&`

The DOM id makes the section a spot a link lands on by its id (#\<section-id>); a name, when it has one, is a marker drawn further down.
The jump itself is shaped by base.css and followed by urd.js.

## `renderSection › renderBackgroundLayers`

The pictures of a section below the first wait until it comes near, as a visitor's page arrives; a later drawing (a breakpoint, a newer page file) draws them at once.

## `renderSection › const canvas`

The content surface (ADR-0018): the section is full window width and owns
the background, the canvas binds the content to the design width and
centers it. Block x/w are percentages OF THIS, not of the window, so the
layout stops growing with the screen. The width is set in CSS (base.css),
not here, so the editor can MEASURE it instead of computing it.

## `renderSection › const secWidth`

Per-section override: 'full' unbinds the content from the design width, inside the site's side margin (heroes, dividers), and a CSS length gives this section a width of its own.

## `renderSection › const siteW`

The width the canvas has at the design width, for the proportional
shrink (fitContent): the site's content width, or the section's own px
width when that is narrower or the site is full width; none on a full-width section, a full-width site whose section has no px width, or a
section width that is not in px, where nothing has a design size. The
editor's designWidth() computes the same.

## `renderSection › const flow`

The mobile row grid (ADR-0019): one path for all sections. Untouched
blocks are auto-placed in reading order, pinned ones get explicit
row tracks, and the minmax rows let the content grow without JS.

## `renderSection › const leads`

The blocks pinned on the phone while the page scrolls, by their pinning group (each alone without one), the group's first block in the section's order speaking for it as on the desktop (stickyLeads).

## `renderSection › const own`

A flowing block in cells stands in a cell with the blocks before it in the same cells, or opens one; a block pinned on the phone while the page scrolls is a grid item of its own, through its slot.

## `renderSection › const placing`

Auto-growing blocks (text and the terms of sale, and every type whose def.autoGrow says so,
plugin blocks with content of their own among them) get natural height: a
fixed desktop height would clip taller mobile content.
A block in cells keeps its desktop shape there where its size is its frame, and a cell holding words narrower than they read well stands across the row (the floor in base.css).

## `renderSection › const phone`

A block with a phone design stands in the flow before it is drawn, so its own width says whether it draws that design (renderBlock), and its layout follows the design it draws.

## `renderSection › if (drawsWords(drawn, Urd)`

Words in cells: the cell, the block pinned in cells, or the slot of a block pinned while the page scrolls, stands across the row where too narrow (the floor in base.css).

## `renderSection › const loadingH`

A block that fetches its content stands at the height the editor measured at the phone width while it loads (0.7.21.7, base.css).
The reserve stands inside the content, which the block's drawn scale zooms, so it is written in the content's own px; a block that shrinks on the phone writes it again at its zoom (fitOnPhone).

## `renderSection › if (block.sticky && typeof`

Screen docking applies on mobile too: sticky.js docks the block against its own measured size.
Pinning while scrolling is the row grid's own on the phone (stickOnPhone), so it is not marked here.

## `renderSection › if (pinned && !el.style.height`

A block placed by hand stretches to its rows in the grid, which grow with its content; in the holder it takes their height itself, and more where its content needs it (placeStuck).

## `renderSection › const phone (2)`

A block with a phone design stands on the canvas before it is drawn, so its own width says whether it draws that design (renderBlock), and its layout follows the design it draws.

## `renderSection › if (followsContent(drawn)`

The push pass draws this block at its content's height (ADR-0025),
and the editing layer stops a drag of its height at the content. A
block with its own height places its content in the box (base.css),
and a block with columns or cards lays itself out by its own width.

## `renderSection › if (block.sticky && typeof (2)`

Sticky ("pin on scroll", additive field): only marking here; the
pinning itself is done by sticky.js on scroll. The mobile branch
above marks screen docking only (scroll pinning on the phone is the
row grid's own, stickOnPhone).

## `renderSection › host.style.minHeight`

The section height belongs to the user: blocks may deliberately hang
past the edge (sections never clip). Without a set height, the
blocks' extent is used. The nav clearance is the section's padding
(base.css), so the content surface keeps this height when pushed down.

## `renderSection › renderAnimation`

Optional section animation (additive field). The entrance animation
(animation) and the pointer effect (hover, additive field) are
independent and can be combined.

## `renderBlock › const phoneProps`

A block with a phone design draws it while it is narrow (measured by the section's layout, which places the block first), and is drawn again when it crosses the line (watchPhoneDesign).
On the phone the block reads its own words where it has some (phoneProps, ADR-0033), in the desktop's place, lifted by its migrations as its props are.

## `renderBlock › const isPointer`

Entrance animation and pointer effect are independent fields and
can be combined; the pointer effect is the block's own, else the one
its section gives every element (pointerEffectOf). Cardwise blocks
(animPerCard) spread the fields onto their cards themselves via
renderCardAnimations once the cards are fetched; the marker is set
synchronously here: the section stagger picks its targets in the
same task, before the cards and their classes exist.

## `isNarrowBlock`

Whether a block is narrow (NARROW\_PX): its own width as its content has it (the block's drawn scale zooms the content, so a block drawn smaller has the room it had; a block set to shrink has, on the desktop, its width at the design width), read once it stands in a laid-out page; a block not yet laid out counts as narrow on a phone's page.
A block narrow before counts as wide again only 16 px past the line.

## `const phoneWatch`

The blocks drawn in a phone design or watched for one, each with what it is drawn again from; one observer for every block, which hears the width and draws again in the next frame.

## `redrawForWidth`

A watched block drawn again when its width has crossed the line.
In the editor's preview the editor is asked for the section (urd-redraw-section), since what the owner has typed since the section was drawn lives in the editor's draft; on the published page the block's content is made anew in the other design, its layout marks follow it, the editing handles are kept, and the content push is told of the new content.

## `renderCardAnimations`

Cardwise animation for blocks with the animPerCard flag: the block's
animation and hover fields are spread onto the cards instead of the
block element. The cards only exist after data fetching, so the block
calls this itself once they are built; without cards the block can pass
itself as the only target, so the fields never sit dead. The registry is
read from window.Urd (set by urd.js before the first render; a direct
import would create a cycle).

## `renderAnimation`

Optional animation on a block/section. An unknown or failing animation
shows the content unanimated - animation is decor and never topples the
page. The apply parameter lets the cardwise path share the lifting and
guarding here.
