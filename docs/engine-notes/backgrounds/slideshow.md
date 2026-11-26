# backgrounds/slideshow.js

The full text of the longer comments in the engine's `backgrounds/slideshow.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Background layer: image gallery. One set of pictures, uploaded or read from
a shared folder, drawn in one of four layouts: frames floating over the
section (ApeironLF's hero style D, the default), one picture filling the
section with a cross-fade to the next, rolling bands (style A) or a mosaic
wall (style B). On top of the layout every picture wears a shape (cut with
clip-path), a look (what surrounds it: a shadow, a polaroid card, borders,
tape, a stamp edge and more) and a tone (a filter on the picture itself),
three choices that combine freely. Each layout takes the motions it can
carry: frames drift diagonally or straight up, breathe (Ken Burns),
cross-fade to the next picture one frame at a time, or bounce off the edges;
a filling picture breathes or drifts; a band rolls by itself.

Every picture is three boxes: the box (placed and moved), the skin (the
visible surface, clipped to the shape and carrying the look) and the face
(the picture, clipped to the shape too and carrying the tone). A look that
sets the face in shows the skin around it, so a border follows any shape.

The scatter, the mosaic spans and the order of the pictures are all drawn
from one seed (gallery-layout.js, photo-source.js): the owner's fixed one,
or the visit's, so «random» is new on every page load and still while the
page is open. The motions are CSS animations on the frames; the only script
that runs afterwards is the picture swap at the foot of a fade, and the band
needs no measuring at all since its period is a setting.

With no pictures the layer draws its frames around drawn example pictures,
which base.css shows only inside the editor, so the whole layout can be set
up before the photos arrive.

## `slideshowLayer › migrations › 1`

1 -> 2: the styles, the motions and pictures from a shared folder. The
defaults stand FIRST and the stored props last, for the reason the image
layer's 2 -> 3 step gives: the editor writes into layer props without
lifting them, so a layer still stored as version 1 can already carry a
choice that the lift must not overwrite. A version 1 layer was the
filling cross-fade, so that is the style it keeps, with the interval
and the opacity a version 1 layer had when it stored none.

## `draw › const kept`

The area the pictures may use: the whole section, or the section without
the announcement strip and the menu bar at its top, whose heights nav.js
measures onto the root. The layer's own box is moved down by that much,
so the scatter, the travel and the bounce all work inside the smaller
area and no picture is ever cut at a bar's edge. The offset is CSS, so a
bar that changes height moves the area without a re-render.
The announcement's part is kept out unless the layer says otherwise (the
default is off), the menu's is used unless the layer says otherwise (on).
The menu sits below the strip, so keeping the menu out keeps the strip
out with it, whatever the strip's own switch says.

## `travel (2)`

The travel of a drifting frame, in container units so it spans the section
whatever its size: it starts fully outside one edge and ends fully outside
the opposite one, so the jump back at the end of a cycle is never seen.
A frame's centre sits at x/y per cent of the section, so -x cqw brings it
to the left edge and a further 60 % of its own width takes it out of sight.

## `animate`

Gives a frame its motion. `frame` is the positioned box, `skin` the visible
picture box inside it, `face` the picture: the travel and the fade ride on
the box, the bounce's second axis on the skin, and the breathing on the face,
so no two of them ever share a transform.

## `mountFades`

The cross-fade: every frame fades in and out on its own cycle, spread evenly
around the clock, and at the foot of each cycle, when it is invisible, it
comes back as a new picture, and where `relocate` is given (the floating
layout) in a new place too. The picture is the one that has waited longest
among those no frame is showing, so the whole folder goes round in turn; if
every picture is on show, the one that has waited longest apart from its
own, so a frame never fades back in with what it faded out with unless
there is only one picture.

## `placeFrame`

Puts a frame where a placement says, and remembers where that is. The
centre is held at least half a frame (and a little more, for the lean)
from every edge of the area, so a frame at the rim of the scatter stands
wholly inside the area rather than hanging half over its edge and being cut
there, which would read as a picture behind the menu or past the section.

## `renderFrames › const relocate`

A fresh place for a frame that has faded out: a new throw of the whole
scatter, and of six such throws the one that lands farthest from the
frames still showing, so the frame does not come back on top of one.
