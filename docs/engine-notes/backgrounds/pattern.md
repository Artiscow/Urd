# backgrounds/pattern.js

The full text of the longer comments in the engine's `backgrounds/pattern.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Background layer: pattern.
A small drawn tile repeated over the section, in one colour: dots, a grid, stripes and the like, the pattern overlays of the other builders, made here with inline SVG and no image files.

The tile is not painted in its colour.
The layer paints its whole box with the colour (so a theme token follows the theme, which a colour written into an SVG image never could) and the pattern is the MASK that lets it through.
The mask is one SVG as large as the layer, holding the tile as an SVG \<pattern>: the size is the pattern's own cell and the rotation its patternTransform, so a turned pattern needs no oversized, rotated element.
Inverted, the figures are cut out of a full surface instead.

ADR-0011 gating: without mask support the layer would be a flat sheet of colour over the section, so there it draws nothing.

## `patternSvg`

The mask as an SVG document: the tile as a \<pattern> over the whole box, or cut out of it.
Pure, and every value in it comes from the allowlist and the clamps above, never from the stored props as written.
