# blocks/timeline.js

The full text of the longer comments in the engine's `blocks/timeline.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: timeline. A vertical list of events (year/title/text) along a
drawn line with markers - pure CSS (ADR-0011), no JS animation. Two
variants: "left" (line on the left, content on the right) and "alternating"
(line in the middle, cards on alternating sides; needs block width).
Vertical and width invariant, so the v0.7 width work leaves it alone.

In the editor the texts are directly editable (click and type, as in FAQ);
order and count are controlled from the Properties panel. Auto-grow reports
the display only; the push pass moves the blocks below (ADR-0024).
