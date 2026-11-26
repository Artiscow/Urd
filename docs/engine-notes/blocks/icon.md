# blocks/icon.js

The full text of the longer comments in the engine's `blocks/icon.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: icon. A glyph/emoji in a chosen size and theme color, for
bullet lists, contact rows and small decorative elements. Emoji carry
their own colors; the theme color applies to text glyphs (★ ✓ → and so on).

## `iconBlock › render › if (isSafeImage(props.image)`

Custom uploaded icon (additive field): the image renders at the glyph size and wins over the glyph until it is removed.
An unsafe source is treated as no source, the same path as an image that fails to load.

## `iconBlock › render › if (typeof props.icon === 'string' &&`

Drawn SVG icon from the library (additive field): sharp at every
size and follows the theme color. An unknown id (data from a newer
Urd) falls back silently to the glyph. The outer element keeps the
.urd-icon centering inside the frame; the inner element carries the size.
