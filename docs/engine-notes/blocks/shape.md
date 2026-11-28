# blocks/shape.js

The full text of the longer comments in the engine's `blocks/shape.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: shape. Lines and arrows (direction via the frame's rot field),
circles/ellipses, rectangles and triangles. Decorative elements for free
composition. A line and an arrow's shaft are drawn in one of four styles
(`lineStyle`: solid, dashed, dotted or double), as a top border, so solid
draws as the filled bar it always was. A line can carry a `label`, a word
set in the middle of it, and a mark before the word (`icon` from Urd's set,
else `glyph`): the chapter divider. The mark is decoration, hidden from
assistive technology, as the field's dividers keep theirs.

## `shapeBlock › render › const label`

The chapter divider: the line drawn on both sides of a word and a mark.
The two strokes are the element's ::before and ::after (shape.css), drawn
as top borders in the line's style, so the word and the mark sit in the
flow between them and the line keeps its thickness. A double line takes at
least 3 px, the least a double border needs to show its two strokes.
