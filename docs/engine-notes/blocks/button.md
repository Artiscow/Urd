# blocks/button.js

The full text of the longer comments in the engine's `blocks/button.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: button.
One link (resolveLink in nav-model.js): a page in the page registry (page), a spot on it (target), or an address (href), with a new tab and rel words; page is looked up in ctx.site.pages at render time.

## `buttonBlock › render › const own`

The owner's colours over the design's, each a theme name or an own colour: the fill, the words, the outline and the fill under the pointer. One left empty follows the design and the theme.
