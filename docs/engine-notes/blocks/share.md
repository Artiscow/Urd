# blocks/share.js

The full text of the longer comments in the engine's `blocks/share.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: a row of links with icons (type id `share`, the share buttons
it was until 0.7.0.52). The site's links from the Site panel, with the
block's own after them, each an ordinary `<a>` with the link's name, drawn
with the icon library's SVGs or the owner's own image. Nothing is loaded
from anywhere (never a vendor SDK).

## `shareBlock › migrations › 1`

1 -> 2: the share buttons (services for the page's address) became the
links row. A block that showed the site's links keeps them, one that
held its own list keeps that; the share services are dropped, since the
block no longer shares a page.
