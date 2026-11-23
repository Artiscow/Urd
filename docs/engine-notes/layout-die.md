# layout-die.js

The full text of the longer comments in the engine's `layout-die.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The seeded die the gallery block's framed views (the mosaic's spans, the polaroids' leans) and the photo layer (gallery-layout.js, the slideshow background's frames) throw: the same seed always gives the same throws, so a layout never jumps on a redraw. It stands apart from gallery-layout.js, so a gallery loads the die without the photo layer's layout.

## `hash32`

djb2, the same hash the media file names use (imageTools.js). Written out here rather than imported: imageTools is outside the visitor import closure, and pulling it in would put the whole image pipeline in every page.

## `roll`

A fraction in [0, 1) from the seed and a field name: one throw of the die.
The djb2 alone is not enough here. Neighbouring keys (`x1`, `x2`) hash to neighbouring numbers, which would give frame after frame almost the same throw and a scatter that reads as a pattern. The avalanche step spreads the bits, so two keys one character apart land nowhere near each other.

## `clamp`

A number inside its bounds, with the default for anything unusable. An absent value (undefined, null or an empty field) is unset, not zero: the panel writes an empty field while the owner is typing, and a spread of zero is a legitimate setting that must not be reachable by accident.

## `frameTilt`

One frame's lean in degrees, inside plus or minus `tilt`: the same throw for the same seed and index, so a frame keeps its lean across renders. The scatter and the gallery block's polaroid view share it. Pure.

## `mosaicSpan`

One tile's span on the mosaic wall: most tiles one cell, some two wide, some two high, a few both. Pure; mosaicSpans (gallery-layout.js) deals a whole wall from it, and the gallery block one span per picture.
