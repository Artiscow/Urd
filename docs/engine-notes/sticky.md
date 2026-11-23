# sticky.js

The full text of the longer comments in the engine's `sticky.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Sticky blocks ("pin on scroll"): the DOM part. The state is computed by
the pure functions in sticky-model.js; here the document is measured and
the mode applied. Pinning is JS-based position:fixed, not CSS sticky:
sticky can never stick out of its own container, and the until model
(stay pinned past the block's own section) needs a free hand.

Two modes: 'scroll' (the default) pins the block at the window top when
it is reached and releases at the limit, while 'screen' docks it at a
fixed point in the window for the whole page. Blocks with the same
sticky-group are pinned as one unit and keep their relative placement,
instead of piling on top of each other.

Pinning is active in the editor preview too, so the toggle does
something visible where it is switched on. The conflict with drag
editing (both write left/top/width on the block) is resolved by the drag
suspending the pinning: preview-edit calls suspendSticky on drag start
and resumeSticky on release, so the block is always edited where it
actually belongs. On the phone, pinning while scrolling is native sticky
positioning in the row grid (render.js stickOnPhone), outside this module.

Pinning is positioning without transitions, so prefers-reduced-motion
needs no special handling.

## `initSticky › document.addEventListener('transitionend`

A shrinking menu (nav.scroll: 'shrink') changes height with a transition.
If scrolling stops mid-transition, the offset below would stay at the
stale menu height until the next scroll; transitionend gives a final
measurement.

## `dockInset`

The menu's own band in the window, which the screen docks keep clear of:
a sticky top bar's clearance (as nav.js measures it, with the page-wide
announcement when the menu is a side column) at the top, and a side
column's width on its side. The menu stands above a docked block, so a
block docked inside the band would be drawn behind it and could not be
taken hold of. Read fresh at every call, since the bar changes height.

## `suspendSticky`

Editing that writes geometry (drag, resize, align/distribute, arrow keys)
is starting: release all pinned blocks back to their true place. Without
this the write would put left/top on top of a frozen block.
opts.keep exempts one element: the dock drag moves the block WHILE it is
pinned, and a release would teleport it out of the grip.

## `release`

Releases the block back to its own values and forgets the stash. The
stash exists ONLY while the block is pinned: then the inline values are
overwritten and the originals must be remembered. When the block stands
free, they are read fresh every time, so a move from arrow keys or
align/distribute (which do not re-render the preview) is never measured
against a stale position.

## `applySticky › const inset`

A sticky menu sits above the pinned block (the nav has a higher z-index,
and raising the block above the menu would put it on top of the
submenus). The block is therefore pinned BELOW the menu: its height is
added to the chosen offset. Only the top bar takes space at the top; a
side menu is a column. If the menu has slid away (scroll behavior
'hide'), the offset is kept anyway: a block hopping up and down in step
with the menu would flicker. The height is the menu's own clearance as
nav.js measures it (--urd-nav-h): an announcement strip that scrolls
away is not part of what stays on screen.
A side column takes no top height itself, but an announcement fixed
across the whole page above it does (--urd-announce-page-h).

## `applySticky › const canvasRect`

Two rects, on purpose (ADR-0018): the block's left/width are
percentages of the CONTENT SURFACE, while the release limit is the
section's top and bottom. Measuring both against the section gives
pinned blocks the wrong width and makes them drift toward the left
edge the moment they pin.

## `applySticky › const canvasTop`

The canvas can be pushed down inside the section (the nav clearance
in the first section under an out-of-flow menu): the block's
style.top is canvas-relative, while the pin and release limits are
computed against the section.

## `applySticky › const boxes`

The members' measurements in px, shared by both modes. left/width are
computed from the canvas rect every time (survives resize); rotation
and height are never touched.

## `applySticky › b.el._urdStickyBase`

Parked overwrites top, so the stash must REMAIN: without it the
next measurement would read the parking height as the block's
natural place. parkY is section-relative; style.top is canvas-relative.

## `applySticky › if (state.y + box.h > sectionRect.height`

Parked beyond its own section (a later release section): the block
lies over the sections below and keeps the pinned stacking, so it
is not painted behind their blocks.
