# picture.js

The full text of the longer comments in the engine's `picture.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

One drawing for every picture (0.7.29.1): the settings the image editor
writes, drawn the same wherever a picture stands (the image block, the
gallery's pictures, collection and product cards, the video's cover and
the lightbox). Every setting is drawn by the page and never changes the
file, and an absent setting is neutral, so a picture stored before the
settings existed draws as it always has.

The settings: the focus point (`x`, `y`, 0..1) and `zoom` (1..4) towards
it; the turn: `rotate` in quarter turns, `flipX` and `flipY`, `straighten`
(degrees, -15..15); the `look`, one of the slideshow layer's tones;
`brightness`, `contrast` and `saturate` (0..2) and `blur` (px, 0..20); and
an `overlay` in a site colour (`{ color, strength }`); and with the duotone
look, its two colours (`duotone: { dark, light }`). A block's picture can
also blend with what lies behind the block (`blend`, pictureBlend), at a
strength (`blendStrength`).

## `placeholderPhoto`

A drawn example picture as a data URL: what an image or slideshow background looks like before the owner has picked anything.
Three variants, so a cross-fade and a drift are actually visible while the settings are being tried out, and painted in translucent grey so they read on a light and a dark background alike.
A data URL, which the site's `img-src 'self' data:` already covers.

## `const LOOK_FILTERS`

Each look as a CSS filter, the same values gallery.css gives the slideshow's
tones (`.urd-gallery-tone-*`, a test holds the two equal). Duotone and
vintage add a layer over the picture as well (`.urd-pic-look-*` in base.css).

## `pictureFilter`

The CSS filter for a picture: its look first, then the adjustments in the
order they have always been written, then the blur. `dim` darkens on top
(the video's cover draws its picture at 0.7 so the words on it read).
A duotone given its gradient map (`duotone`, duotoneFilterUrl) maps the
adjusted picture's light to its two colours before the blur; without one
it falls back to the grey of its look. Pure.

## `duotoneTables`

A duotone's gradient map as the three channels' tables: each channel runs
from the dark colour's value at black to the light colour's at white,
whichever is the lighter, so any pair maps the picture's light between
them. Pure.

## `duotoneFilterUrl`

The duotone's SVG filter for a pair of colours, made once per document in
a hidden `#urd-duotones` and shared by every picture with that pair: the
picture's light (its luminance) mapped from the dark colour to the light
one. Returns the CSS `url()` that draws it.

## `colorAt`

A duotone colour as its red, green and blue where it is drawn: a hex
colour as it is, a site colour as the place computes it (a section with
its own colours, the light or dark mode).

## `const duotoneFrames`

The frames drawn with a duotone, drawn again when the page's colours change (the light or dark mode, or the theme's colours themselves), so a site colour follows.

## `watchColours › const theme`

Where the browser has light-dark(), the theme's colours are the text of their own stylesheet (theme.js applyTheme), which a colour changed in the editor rewrites.

## `straightenScale`

How much a picture straightened by `deg` degrees is drawn larger, so its
frame has no empty corners: enough for a frame up to 2.4 times as wide as
it is tall, or as tall as it is wide (21:9 and 9:16 included). Pure.

## `pictureTurn`

The turn as a CSS transform, or null for a picture that is not turned:
the quarter turns and the straightening as one rotation, the flips as a
mirror, and the straightening's scale. `quarter` says the turned picture
lies across its frame, so the drawing swaps its width and height. Pure.

## `drawPicture`

Draws a picture's settings onto its frame and its image: the focus point,
the zoom, the filter, the turn, the look's layer and the overlay. A picture
with no turn keeps the markup it has always had (the image straight in its
frame); a turned one is wrapped in `.urd-pic-turn`, which the turn rotates
and mirrors, and which lies across the frame for a quarter turn.

The `options` parameter: dim: darken on top (the video's cover); ratioFromPicture: the frame takes its height from the picture (a gallery's grid), so a quarter turn gives it the turned picture's ratio
