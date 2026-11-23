# push-model.js

The full text of the longer comments in the engine's `push-model.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Content push on the desktop canvas (ADR-0024). Blocks are placed
absolutely with pixel frames, so a block whose content grows taller than
its frame (wrapped text, a longer feed) would draw over the blocks
beneath. This model moves the blocks below instead, with the rules the
Wix Editor publishes for its free canvas: a gap of PUSH\_GAP\_MAX px or less
is preserved, a larger gap stays until it would fall under PUSH\_GAP\_MIN px,
a block whose top sits above the grown block's vertical middle is a
deliberate overlap and stays, and a move cascades to the blocks below the
moved block. Every block below that shares some of the grown block's width
moves, not only the nearest one; a block beside it, in another column,
keeps its place.

Pure: render.js measures the growth and writes the shifts; nothing here
touches the DOM or the stored frames.

## `const FOLLOWS_CONTENT`

The block types whose height follows their content (ADR-0025): the box is
drawn at the content's height, also when that is less than the frame, and
the editor fits the frame to the content after an edit of the block. Every
other type keeps the height of its frame, unless the block keeps a shape or
folds into questions (followsContent), and text is at least as tall as
its words.

## `const VIDEO_ASPECTS`

The shapes a video can be given, width:height: widescreen first (YouTube's own), then classic, square, vertical (Shorts and reels), cinema and portrait. Without one the video fills its frame.

## `keepsShape`

Whether a block keeps a shape (ADR-0025): a video given one, or an image
block with a picture given one, is drawn at that shape at its own width,
so its height follows its width.

## `shapeHeight`

The frame height of a block that keeps a shape, for a content surface of
the given width: its width there over the shape. The editor fits the frame
with it at the design width, which the preview's own surface need not have.

## `followsContent`

Whether a block's height follows its content (ADR-0025): one of the types
above, unless the block has been given its own height (`height.mode` 'own'), or
a block that keeps a shape or folds into questions (foldsIntoQuestions).

## `foldsIntoQuestions`

The terms of sale drawn as questions (doc-look.js), or a text block in that design (one from before page v8): its rows fold out for a visitor, the first open, so its height is the rows' as they first stand, and an open part is view state, as an FAQ's answer is.

## `const PHONE_DESIGNS`

The blocks with a phone design: the design a block draws while it is narrow (`phoneDesign`, additive), by the prop its design is kept in, the way the calendar has its phone view.
Narrow is the width the block's content has (render.js isNarrowBlock: its own width over its drawn scale, or on the desktop, for a block set to shrink, its width at the design width), on a phone or in a narrow column of a wide page alike (ADR-0025): below NARROW\_PX it draws its phone design, and it is drawn again when it crosses the line (render.js), back to wide only 16 px past it.

## `drawnBlock`

A block as it is drawn at its width: with its phone design in its design's place while narrow, so the rules that read the design (the height following the content, the growth in the phone's flow) read the one drawn.

## `forcesReadable`

Whether a section forces readable text on a screen (ADR-0034, «Force readable text»): on the phone a block with words is never drawn narrower than its words read well (the floor in base.css), and on the desktop a text's lines wrap at a measure. On unless the section's `size.readablePhone` or `size.readableDesktop` is false.

## `const READABLE_PX`

The narrowest a block with words reads well at, in px (ADR-0034): the phone's floor for words in cells (base.css), the stop of a text's width handle on the desktop, and the line under which a section shows its phone layout (phoneHandoff).

## `phoneHandoff`

The widest window at which a section shows its phone layout above the phone breakpoint, since a text in it would stand narrower than READABLE\_PX on the desktop canvas (ADR-0034); 0 where none would.
The texts are those the desktop's «Force readable text» measures and stops at the floor (render.js: a text block in its plain design); a short word on a button, a basket or a statistic reads well narrower, and a block that redraws itself by its width has a narrow design of its own.
The canvas is the window less the side margin on each side, up to its bound (base.css): the section's own px width, else the site's content width, none where either is full width. A text stands at its share of it and so falls under the floor below a window width of its own; the section takes the widest of its texts'.
A text already narrower than the floor at the design width, the canvas on a 1440 px screen, is the owner's choice and does not count, nor does one hidden on the desktop.
A text that shrinks below the design width instead of wrapping (ADR-0024 decision 6) keeps its lines down to its smallest scale (`fitMin`), so it falls under the floor only where its box is narrower than the floor at that scale; without a design size (a full-width canvas) it wraps as any other.
The page's scrollbar, where it takes room (`scrollbar-gutter: stable` in base.css), narrows the canvas by its width while the media query reads the window with it, and a side menu's column (`side-left`, `side-right`) by its own, at every window width and at the design width alike.
None where the section's desktop «Force readable text» is off, where its own width is in another unit than px (no width to reckon with), or where the width lies at or under the phone breakpoint, where the whole page shows its phone layout already.

## `const PHONE_WORDS`

The props that hold a block's words, by its type: the words the phone can have of its own (`phoneProps`, additive, ADR-0033), written in the phone view and drawn at phone width in the desktop's place: a text's words, a quote's with its name and role, a statistic's label, an audio player's title and a countdown's words for when the time is up.
A list of words (questions, events, rows) is not among them: its items would have to be matched one by one, and one added on the desktop would not reach the phone's copy. Nor is a statistic's number, which is the same fact on every screen.

## `phoneWordsChange`

The phone's own words after typing in the phone view: the typed words that differ from the desktop's, the rest left as they were; null where none differs, the block then reading the desktop's words again.

## `const FETCHES_CONTENT`

The block types that follow their content and fetch it (a feed, a
collection), so their height on the phone is unknown until the content is
drawn. The editor measures each at the phone width after an edit and
stores it as `mobileHeight` (0.7.21.7); the loading state stands at it on
the phone, so the first load of a session does not jump.

## `mobileLoadingHeight`

The height in px the loading state of a block stands at on the phone: the
stored `mobileHeight` of a block that fetches its content, else 0 (its
loading state's own height).

## `const STRETCHES`

The block types that can use the height of a box taller than their content
(ADR-0025 decision 3, «stretch»): the figure and the countdown's units fill
the box, and a quote's card does. The calendar stretches too, by design:
the list and card views spread their rows and cards (blocks/calendar.css).

## `heightAlign`

How a block with its own height places its content in the box (ADR-0025
decision 3): `top` (the default, also for a block that follows its
content), `middle`, `bottom` or `stretch`.

## `const FOLLOWS_WIDTH`

The block types that lay themselves out by their own width (ADR-0025
decision 7): the ones with columns, cards or a layout that changes when the
box is narrow. Their box is a size container (`urd-block` in base.css), so
a drag narrower shows the narrow layout while it is dragged, and a block in
a narrow column of a wide page uses its narrow layout as on a phone.

## `const FIT_BY_WIDTH`

The block types whose content cannot wrap: their frame already follows
the canvas in percent, so their shrink is a floor on the frame's width
(fitFloorPx) instead of a zoom of the content. The editor reads this
list for its option labels.

## `const SIZE_BY_FRAME`

The block types whose size is their frame: a picture, a video, a shape, an
icon, a map and a space are as large as the box the owner dragged, so a
scale of their content would only crop or blur it, or have nothing to
scale. Every other type takes «Size».

## `const TYPE_SCALE`

The scale a type's content is drawn at when its size is 1 (ADR-0025
decision 6): the calendar's designs at a dense 14 px base for the page's
16 px, the base of dense widgets. Every other type is drawn as it is.

## `blockSize`

A block's size as a factor (ADR-0025 decision 6): the owner's `size`
held inside the sizes the block may take (sizeRange), 1 where it has none above 0. The frame-sized
types are always 1.

## `phoneSized`

A block as the phone draws it (ADR-0025 decision 6, ADR-0019 decision 1): with the phone's own size (`phoneSize`) in place of the desktop's, where it has one inside SIZE.
Without one, and for the frame-sized types, the block itself, so the phone follows the desktop's size.
The bounds of its base text (sizeMin, sizeMax) bound the phone's size as they bound the desktop's (blockSize).

## `phoneFrame`

The desktop frame as the phone takes its height from it (ADR-0019 decision 1): a block drawn at a size of the phone's own stands in a box whose height is scaled by that size against the desktop's, as the desktop's size scales the frame.
A block the phone draws at the desktop's size has the frame itself.

## `sizeRange`

The sizes a block may take (ADR-0025 decision 6): inside SIZE, and where
the owner bounds its base text (sizeBounds), only as far as the base text
stays inside, in whole steps. The size scales everything alike, so these
are where the slider stops. Size 1 is always inside, so a block whose text
is already past a bound keeps its size as drawn.

## `sizeBounds`

The smallest and largest size in px the owner lets the base text of a
sized block take (block.sizeMin, block.sizeMax), inside SIZE\_TEXT and
never crossed: a largest size under the smallest is raised to it. A bound
not set is null, and the text follows the size.

## `fitFloorPx`

The smallest width in px a block set to shrink may take, for the types in FIT\_BY\_WIDTH: its share of its section's design width times the floor.
0 (no floor) for every other block, for a block without a desktop width (`frames.desktop.w`), and where the section has no design width (a full-width site or section), where nothing has a design size.

## `shrinksOnPhone`

Whether a block shrinks on a phone (0.7.3.9): one set to «shrink», but not the types that shrink by their frame (FIT\_BY\_WIDTH) and not the calendar, which draws its phone view there (calPhoneView in calendar-designs.js).
«Both» wraps on the phone, since it fits a design height the row grid has not.

## `phoneFitZoom`

The share a block that shrinks on a phone is drawn at there (shrinksOnPhone), which its drawn scale multiplies: its width in the row grid over its width at the design width, so its content keeps the lines it has there, never above 1 and never under its floor (fitMin).
1 for every other block, and where nothing has a design width (a full-width site or section).

## `const PUSH_ACROSS_MIN`

How much of the width two blocks must share, in percent of the section, for one to push the other: frames that only touch, or overlap by a rounding, stand side by side.

## `sharesWidth`

Whether block b stands under block a's width, so a's growth reaches it (ADR-0024 decision 1): a block beside the grown one, in another column, keeps its place.
An item without a width (`x` and `w` in percent) is taken to span the section.

## `fitMoves`

A frame fitted to its content is an edit of the design (ADR-0025 decision
5), so the data takes over what the push pass drew before the fit: a
taller frame moves the blocks below by the push rules, exactly as far as
the pass had shifted them. A shorter frame moves nothing, since the push
moves blocks down only. A section's own height is never written by a fit:
it is the owner's, and a block moved past it lies over the section below.

## `fitMovesAll`

The same for several frames at once (the blocks under one gesture, settled
to the boxes the push pass draws for them): each block's growth counts as
the pass counted it, so the moves are the ones the pass drew with all of
them grown. A block takes its width as drawn where one is given, as the
pass does for a picture a width floor draws wider than its frame on a
narrow canvas; without one, the frame's width stands.

## `typedFrames`

The frames typing gives a section (ADR-0024 decision 4): the text block takes the height its words need, rounded up to the grid step, never less than it had before the typing began, and the blocks below stand where the push rules move them from where they stood then.
Measured from the frames before the typing, not from the last keystroke's, so words deleted give back the room they took and the blocks below return with them.
