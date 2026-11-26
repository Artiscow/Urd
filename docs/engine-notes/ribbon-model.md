# ribbon-model.js

The full text of the longer comments in the engine's `ribbon-model.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Pure logic for the ribbon: the text marquee block and the gallery's ribbon
view share it. DOM-free, so all of it is tested with node --test
(tests/ribbon.test.mjs); the DOM building lives in blocks/ribbon.js and
blocks/gallery.js.

The motion is one period of a doubled track: the items are built twice and
the track is translated by half its width, so the loop has no seam. The
duration is therefore the track's own width divided by the speed, which is
why it has to be computed rather than set.

## `const RIBBON_MOTIONS`

How the band moves: `roll` is the continuous marquee, `sway` drifts back and
forth for a calmer band, `step` advances one item at a time like a ticker,
and `none` leaves the words standing.

## `const RIBBON_WIDTHS`

How far the band reaches: `canvas` the content surface (the default for a
new band or gallery band), `page` the window's full width, and `content`
the block's own box, which bands stored before 0.7.20.5 hold, so they keep
their look.

## `const RIBBON_MAIN_MODES`

What a stripe holds. The main stripe is never absent, so it has no `none`:
`text` is the words, `marks` only the separator over and over (a dotted
rule), and `plain` an empty stripe of colour.

## `const RIBBON_STRIPE_PLACES`

Where the thin stripes sit: `stack` puts them above and below the main one,
which then shares the band's height with them; `edge` lays them on the
band's own top and bottom edges, so the main stripe keeps the full height.

## `ribbonPeriods`

How many copies of the content one period holds. One period must reach
across the band, or the empty rest of the track rolls past; the track holds
two periods, so its half-way point is a whole number of copies and the loop
has no seam. Capped, so a hairline of content in a wide band never builds
hundreds of copies.

## `ribbonDuration`

Seconds for one period, from the measured width of one copy of the track.
The floor keeps a short band from spinning: three short words at full speed
loop several times a second without it.

## `bandReach`

Where a band that reaches past its block is laid out, in px from the
block's own left edge: across the content surface, or across the section,
which spans the window. Null for the block's own box.

## `ribbonStepDuration`

One period for the ticker: every item stands still for its dwell before the
next jump, so the duration follows the COUNT, not the width. A band timed by
width would hold the first word for a third of a long loop and look dead.
