# gallery-model.js

The full text of the longer comments in the engine's `gallery-model.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Pure logic for the gallery block, the lightbox and the image gallery
background layer: index stepping, autoplay conditions, column maths, and the
mosaic spans and polaroid leans of the block's two framed views (dealt by
the same die as the background layer's, layout-die.js).
DOM-free, so all of it is tested with node --test (tests/gallery.test.mjs);
the DOM rendering is tested manually.

## `packWall`

One packing of the spans: first-fit, row by row, then the cells left empty
are given to a neighbour. A hole takes the tile above when that tile stands
exactly over the run of empty cells, otherwise the tile on its left or
right when the cells beside that tile are empty for its whole height.

## `mosaicWall`

The mosaic wall with every tile in its place: the spans from tileSpans are
packed (packWall), and the wall is a full rectangle whatever the count. A
hole no neighbour can take is rare; then the last tile that is larger than
one cell is dealt as a single cell and the wall is packed again, which ends
at the latest with a wall of single cells, where the last row always fills.
The block draws from these positions rather than leaving the packing to
the browser, so the wall is the same everywhere and can be tested.

## `slidesRun`

Whether the slideshow's timer may advance right now: it needs the autoplay
at all, and neither a stop the visitor made (the pause button or a step by
hand, which lasts) nor a hold (the pointer over the show or focus inside it,
which lasts as long as it stays).
