# shape-model.js

The full text of the longer comments in the engine's `shape-model.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

A shape: one closed outline in a 100 by 100 box, from a few values or from a list of points (ADR-0035).
The first user is the «Back to top» button (totop.js, `site.layout.toTop.shape`); the model knows nothing of it, so a picture, an icon's background or a button can take the same shape.

A shape is stored one of two ways:
- its values (`SHAPE_BLANK`, each stored only where it differs): the outline (a round one by its squareness, or a polygon by its sides, corners, bulge and turn, either stretched), the edge (waves by their depth, amount, sharpness, style, alternation and swirl), a point drawn out of one side, and a wobble by its seed;
- its points (`points`, each `[x, y, size, style]`): the outline through them, each with a corner of its own, round, cut or scooped. A shape with points is drawn from them, its values kept beside them.
`icon` is where the mark on the shape stands (`[x, y]`); without it the mark stands at the shape's own middle.
Pure and node-tested (tests/shape-model.test.mjs).

## `shapeLimits`

How far the waves, the point and the turn go for a shape as it stands: waves end earlier on a polygon of few sides, the point on deep waves, and a turn at half a side.

## `shapeStored`

A shape as it is stored: only what differs from the blank shape, the points as `[x, y, size, style]` and the mark's place rounded.
An empty object is the circle.

## `shapeOutline`

A shape's outline as points in the 100 by 100 box: from its points where it has them, else from its values.
`margin` keeps the outline that far inside the box, for an outline drawn with a line of its own (the ring).

## `outlineMiddle`

An outline's own middle, by its area: where a mark on the shape stands, lower than the box's middle on a shape with a point at the top.
A drawing whose edge crosses itself has little area of its own to weigh; its middle is the middle of the room it takes, and a middle always stands within that room.

## `shapeToPoints`

A shape's values handed over as points, for shaping by hand: a point on each crest and in each dip of a waved edge (a waved polygon's too), else a polygon's own corners, or eight round points; a point drawn out of a round shape is the first of them, sharper as the point is longer.
