# lightbox.js

The full text of the longer comments in the engine's `lightbox.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Lightbox: full screen image viewing for visitors (and in the editor's Clean
view). Loaded only via dynamic import on the first click, so a visitor who
never clicks an image never loads it.

Built on the native \<dialog> element (showModal): the top layer removes the
z-index war, ::backdrop gives the dark background, and focus trap, focus
return and an inert background come along for free. Esc closes (native),
the arrow keys step, a background click closes. Body scroll is locked by
body:has(dialog:modal) in base.css, no JS bookkeeping.

## `drawWhole`

A picture's settings in the full view: its look (a duotone's colours too), adjustments, turn and flips follow it (picture.js); the framing (fit, focus point, zoom) does not, since the lightbox shows the whole picture.
A quarter turn lays the picture across, so its largest width and height swap.
