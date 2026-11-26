# blocks/gallery.js

The full text of the longer comments in the engine's `blocks/gallery.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: gallery. One block with six views (the
view is a prop, not separate block types): grid, carousel (side scrolling with
snap), slides (one image at a time with automatic advance), ribbon (a rolling
band), mosaic (a wall of tiles in varied spans) and polaroid (framed cards
with a lean).

The images live in props.images with the same non-destructive style vocabulary
as the image block (style: fit/x/y/zoom/filters); the tiles render with the
shared applyImageStyle. For visitors a click opens the lightbox (props.lightbox);
in preview a click opens the image editor, and in Clean view the lightbox, so
the owner gets to try it before publishing. A link (href) always wins over the
lightbox.

The slide timer is the engine's first setInterval: it cleans itself up when the
host disappears from the DOM (re-render churn), stands still under reduced
motion, in hidden tabs, and in preview with the editing chrome on.

## `makeTile`

One tile: a clipping frame plus an img with the shared image style. The element
 is chosen by what the click should do: link (a), clickable (button) or pure decoration (span).

## `columnCounts`

The column counts of the grid views, wide and narrow: a narrow block (its
own width, ADR-0025) takes the narrow count through a container query in
gallery.css. Without container queries the wide count is the window's, as the
page's phone view.

## `tilesIn`

The element a grid view lays its tiles out in, inside the gallery: the
gallery itself is the width the narrow rules ask (gallery.css), so the
columns follow the width the content is laid out in under a size.

## `renderMosaic`

The mosaic view: the grid's wall with tiles in varied spans, dealt by the
seed and placed by the pure mosaicWall, so the same pictures always build
the same wall and the panel's Shuffle builds another. The rows have one
height, and the wall is a full rectangle whatever the number of pictures.

## `renderPolaroid`

The polaroid view: every picture set in a card with a wider foot, leaning
by its own throw of the seed (polaroidTilts). With `captions` the image
text is written in the foot. The card straightens under a real pointer
(gallery.css), and the tile inside keeps its click.

## `galleryBlock › render › if (GRID_VIEWS.includes(view) &&`

Auto-grow for the views that are grids of tiles: the height follows the
number of images, so the frame follows the content (the same pattern as
the collection block). The measurement has to wait until the block is in
the DOM: render is called before appendChild.
