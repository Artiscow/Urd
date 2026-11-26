# blocks/shape.js

The full text of the longer comments in the engine's `blocks/shape.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: shape. Lines and arrows (direction via the frame's rot field),
circles/ellipses, rectangles and triangles. Decorative elements for free
composition. A line can carry a `label`: a word set in the middle of it,
the chapter divider.

## `shapeBlock › render › const label`

The chapter divider: the line drawn on both sides of a word. The two
strokes are the element's ::before and ::after (shape.css), so the word
sits in the flow between them and the line keeps its thickness.
