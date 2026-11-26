# sticky-model.js

The full text of the longer comments in the engine's `sticky-model.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Pure state logic for sticky blocks ("pin on scroll"): given the scroll
position and document measurements, decides whether the block stays in
its normal absolute position (static), pins at the window top (fixed)
or parks at the release limit (parked). The DOM work lives in
sticky.js; this module is DOM-free and contract-tested in
tests/sticky.test.mjs.

Pinning is positioning, not animation (no transitions), so
prefers-reduced-motion needs no special handling here.

## `groupBox`

Bounding box for a group of pinned blocks. The group pins and releases
as ONE unit, and each member keeps its place inside the box, instead of
all of them piling up at the window top.

## `dockPosition`

Screen docking ("pin to screen"): the box is placed at one of nine anchor
points in the window and stays there regardless of scrolling. The margin
applies only to the edges the box docks to; center axes are centered and
ignore it.

The window's inset is the menu's own band, a sticky top bar's height or a side column's width; the docks lie inside it, so a docked box is never drawn behind the menu.

## `nearestDock`

The nearest dock point for a box dropped in the window: the center point
decides in a three-way grid (left/center/right x top/middle/bottom).
The keys match the schema's dock enum (the middle row is 'middle').
Pure function, tested in tests/sticky.test.mjs.

## `pinsOnPhone`

Whether a block pins on the phone (`sticky.phone`, additive from 0.7.3.10): pinned while the page scrolls, with a numeric `offset`, and chosen for the phone too, where it stays in view below the menu until its own section, or the section `until` names, scrolls past.
A block docked to the screen docks on every screen without it.

## `stuckBox`

The holder of a group pinned on the phone (render.js placeStuck): it spans the group's slots in the row grid, from the highest top to the lowest foot, and each block stands at its slot's distance below the holder's top, so the group keeps its placement as it does on the desktop (groupBox).

## `stickyLeads`

The `sticky` that speaks for each pinning group on the phone: the group's first block in the section's own order, as on the desktop, among the blocks the phone shows; a block without a group speaks for itself.
