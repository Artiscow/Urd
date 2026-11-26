# embed-cover.js

The full text of the longer comments in the engine's `embed-cover.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The cover a third-party frame stands behind until the visitor presses it (0.7.24.1): nothing reaches the provider before the press, since its player stores in the browser as it loads, which needs consent first (ekomloven § 3-15).
A card in the site's own colours: the provider named in a corner, the owner's own image under it where there is one, a play button in the accent, a line saying what loading does, and a box that lets the visitor have that provider's frames load at once on this site from now on, kept in their browser per provider.
The video block, the map block and the contact block's map use it; the choice is stored only when the visitor ticks the box, which is the storage they asked for.

## `const PROVIDERS`

The providers a cover names: the end of the frame's host, the id the visitor's choice is kept under, the name on the cover, and the provider's own privacy terms the privacy page links to. A new provider goes here, in `_headers`' frame-src and in the block that embeds it.

## `coverImageStyle`

Draws the cover's picture with the owner's settings from the image editor (picture.js: the focus point, zoom, turn, look and adjustments), darkened under the cover's words.

## `coverFrame`

A frame behind its cover: the frame at once where the visitor has let its provider load or the owner chose to load it with the page (`ask: false`, the block's `askFirst`), else the cover, which makes the frame on a press.
The editor's preview shows the cover whenever the owner asks first, as a visitor first sees it.

`options`: makeFrame builds the frame when it is wanted, told whether the visitor pressed this cover (a video may start then); image is the owner's own picture for the cover, imageStyle its framing and adjustments (coverImageStyle).

## `coverFrame › addEventListener('click') › const allow`

This cover loads as pressed first, which also stops it hearing its own word to the others.
In the editor's preview the press loads the frame for the owner, and the box keeps nothing: the admin shares the site's origin, so a choice kept there would load the provider at once on the owner's own visits.
