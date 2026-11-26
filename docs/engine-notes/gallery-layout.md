# gallery-layout.js

The full text of the longer comments in the engine's `gallery-layout.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Pure logic for the image gallery background layer: the styles a gallery can
take, the motions each style allows, the deterministic layouts (the floating
scatter, the mosaic spans) and the clamps around them. DOM-free, so all of
it is tested with node --test (tests/gallery-layer.test.mjs); the DOM
building lives in backgrounds/slideshow.js.

The layouts are DETERMINISTIC for a seed: the same seed gives the same
scatter in the panel, in the preview and on the published page. The seed
itself is either fixed by the owner (the Shuffle button) or drawn once per
page load, which is what makes «random on every visit» stable while the
page is open. Every throw of the die is a hash of the seed and a field name,
never a random number.

## `const GALLERY_STYLES`

How the pictures are laid out: scattered frames floating over the section,
one picture filling it with a cross-fade to the next, rolling bands, or a
mosaic wall. The letters ApeironLF uses: A band, B mosaic, D floating; its
C, the polaroids, is a LOOK here (below) that any layout can wear.

## `const GALLERY_SHAPES`

The outline of a picture: cut with clip-path or drawn with border-radius,
on the frame's skin and face alike so a framed picture keeps its shape. The
regular shapes are square, the rest keep the frame's own proportion.

## `const GALLERY_LOOKS`

What surrounds a picture: a soft shadow, nothing, a polaroid card, thin or
thick or dark or doubled borders, a glow in the accent colour, a strip of
tape, a pin, a perforated stamp edge, film-strip edges, or a feathered
edge that fades out.

## `const GALLERY_TONES`

The finish on the picture itself: filters, and a tint in the accent colour; a picture's looks (picture.js), so a page drawing pictures alone loads no gallery code for them.

## `const GALLERY_MOTIONS`

How the pictures move. `drift` slides diagonally, `rise` straight up and
down, `kenburns` breathes in, `crossfade` swaps the pictures one frame at a
time, and `bounce` sends each frame across the section and back off the
edges. Not every style can take every motion: a band rolls by itself, and a
filling picture cannot bounce.

## `const FRAME_SIZE`

Frame size in px: the width of a floating frame or a polaroid, the row
height of a band or a mosaic. Each style has its own default, the sizes
ApeironLF's hero gallery uses, and an unset size takes the style's.

## `const LOOK_COLOR`

The colour a look draws with when the owner has not picked one: white
cards and borders, a dark border, and a glow in the accent colour. Looks
that are not in the table have no colour to pick.

## `styleMotion`

The motion a style will actually run: the one asked for when the style can
take it, otherwise the style's own default. So switching style never leaves
a motion behind that the new style has no animation for.

## `frameCount`

How many frames are drawn: the count inside its bounds. With fewer pictures
than that (`available`) the owner chooses: `repeat` pads the frames with the
pictures over again, otherwise the frames stop at the pictures there are,
so a small folder is shown once over. With no pictures at all the count
stands, as example frames.

## `frameColor`

The colour a look draws with: the owner's when one is set (a theme token
or a raw colour, resolved by the layer), otherwise the look's own, and
nothing for a look that has no colour.

## `frameAspect`

The proportion a frame takes for a shape and a look: the regular shapes are
square, the arch stands tall, a polaroid card is taller than its picture,
and everything else keeps ApeironLF's frame.

## `layoutSeed`

The seed a layout is drawn from: the owner's fixed one when it is set, and
otherwise the visit's, so a layer left on «random» scatters afresh on every
page load and holds still while the page is open.

## `photoLayout`

The scatter: one placement per frame, in the order they are drawn.

`x`/`y` are the frame's CENTRE in per cent of the section, `w` its width in
px (the style's size, varied a fifth either way so the set is not uniform),
`rot` its lean in degrees, `phase` a fraction of the cycle (a negative
animation delay, so the frames never move in lockstep) and `heading` a
direction in turns for the motions that travel. `index` points back into the picture list,
so the caller can read that picture's focal point; it is -1 for an empty
frame. An empty picture list still yields placements: the layer draws them
as empty frames while it is being set up.

The frames are laid on a jittered grid rather than on free coordinates, so
they cover the section instead of clumping; the cells are dealt out in a
seeded order, so the ones left empty when there are fewer frames than cells
are never the same corner every time.

## `mosaicSpans`

The mosaic wall: one span per tile on a grid of MOSAIC\_COLS columns, most
tiles one cell, some two wide, some two high, a few both, dealt by the die so
the wall is never the same twice for two seeds. Pure.
