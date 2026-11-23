# divider-model.js

The full text of the longer comments in the engine's `divider-model.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Section shape dividers (section.divider, additive from v0.7): a drawn edge at the top or the bottom of a section, in the colour of whatever the section meets there, so the two do not part on a straight line.
Pure and DOM-free: renderSection draws from these, the editor's panel reads the lists, and node tests them (tests/divider.test.mjs).

## `dividerPath`

The filled outline of a BOTTOM divider in a 1200 x 120 box: the colour stands at the foot and rises into the section.
A top divider is the same outline turned upside down (base.css).
Pure.

## `sectionDivider`

One edge's divider as the renderer draws it, or null for none: the shape from the allowlist, the height inside its bounds, the colour as stored (the page background when none is set), the mirror flag and the invert flag.
Pure.

## `dividerSvg`

The divider as an SVG document, stretched to the section's width by its viewBox.
Inverted, the colour fills what the outline left open, turned upside down so it still stands on the foot: a peak becomes a notch, a hollow curve a bulging one.
Pure; the path data comes from dividerPath and nothing in the markup from the stored props as written.
