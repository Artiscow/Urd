# totop.js

The full text of the longer comments in the engine's `totop.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The site's «Back to top» button (0.7.13.14): an element of the site, set in the Site panel's «Back to top» button fold and stored in `site.layout.toTop`, with nothing stored for the standard, so a site that sets nothing shows the round button it always had.
The settings are read by toTopOf, a shaped design's outline is the owner's shape (shape-model.js) or the design's own drawn by toTopShape (toTopOutline, pure, node-tested), and renderToTop draws or updates the one button the page has (urd.js, at the start and as the editor sends the site).
The button scrolls to the page's top, smoothly only where motion is welcome; it shows after the scrolling the owner chose, and its look is set by classes and custom properties that base.css reads (.urd-totop).

## `const TOTOP_HOVERS`

How the words alone answer the mouse, as the menu's links do (nav.style.hover), the first the standard: the colour, an underline, a pill, a lift, or a lift with a glow.

## `toTopShapeOf`

The shape a shaped design shows, as a shape's values: the owner's own, or without one the nearest to what the design draws by itself (the circle, the rounded square, and the waves of `waves` and `count`), which the shape window starts from.

## `toTopOutline`

A shaped design's outline as an SVG path in the 100 by 100 box, and where its mark stands in it: the owner's shape where there is one, the mark at the shape's own middle or where the owner put it; else the design's own outline, the mark in the box's middle.
`whole` is the outline a picture filling the whole button is cut to, the ring's reaching the box's edge as the circle's does.

## `toTopClip`

The outline the mark of a shaped design is cut to, as a CSS image of the shape in a 100 by 100 box (base.css draws it a little smaller, so the button keeps its edge); none for the pill and the words alone.
A picture that fills the whole button is cut to the whole box's outline, the ring's included, so it covers the ring's line.

## `markOf`

The button's mark: its own picture, drawn icon or character, or the arrow.
A picture that fails to load gives way to what would stand without it, on the button's own shape where the picture filled it.

## `toTopShape`

The outline of a shaped design in a 100 by 100 box, as an SVG path: a circle or a rounded square, its edge turned into waves by `waves` (0 to 100).
The waves grow deeper as the slider is dragged, and their crests narrow from round swells to points, so the far end of the slider draws a star; `count` waves stand round the edge, one crest pointing up.
The circle and the square fill the box, as the round button always has; the ring stands a little inside it, so its line is drawn whole. A smooth edge is drawn exactly (arcs for the circle, a rounded rectangle for the square).
