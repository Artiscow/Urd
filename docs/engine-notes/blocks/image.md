# blocks/image.js

The full text of the longer comments in the engine's `blocks/image.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: image. Shows a file from media/ (or a data URL for uploads
that are still unpublished in the draft). With href the image becomes a
link, which also covers logo use.

The image sits in a frame (.urd-image-frame) that clips: rounding is
therefore ALWAYS visible (also with "show the whole image"/contain), and
zoom crops in towards the focal point. The picture's settings are drawn by
picture.js, the same drawing every picture on the site uses.


## `imageBlock › defaults › x`

Additive fields: focal point (0..1), zoom (1 = none) and non-destructive
CSS adjustments (1 = neutral). lightbox opens the image full screen when a
visitor clicks it (absent = false, so old data needs no migration).

## `imageBlock › render`

`aspect`: one of IMAGE\_ASPECTS (push-model.js) from the image editor, the frame's shape with its height following its width; `blend`: one of PICTURE\_BLENDS (picture.js), how the block blends with what lies behind it; `blendStrength`: 0..1, how strongly (absent = whole).

## `imageBlock › render › if (ctx?.first && !ctx.preview &&`

Content images are fetched only as they approach the viewport: that spares images below the fold on heavy pages.
The first image block a page's first section draws is the first screen's picture, so it is fetched at once and ahead of the rest (`fetchpriority`), never lazily; one picture alone takes the high priority.
loading, decoding and the priority are set before src, or the browser may already have begun fetching.

## `imageBlock › render › if (!img.complete`

Large images decode strip by strip while they load (which looks like a
gradual wipe from the top): keep the image invisible until it is
COMPLETE, then show it whole at once. Cached images are untouched.

## `imageBlock › render › const ratio`

A shape from the image editor: the frame is that shape at the block's width (keepsShape in push-model.js), or the picture's own shape, which the picture gives it.

## `imageBlock › render › if (props.lightbox && !linked`

Full screen on click: always for visitors when the field is on; in preview
only in clean view (otherwise editing owns the click). A link wins.
For visitors the frame is a button for the keyboard too, named by the picture's alt text: reached with Tab, opened with Enter or Space.
