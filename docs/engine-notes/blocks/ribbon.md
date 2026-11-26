# blocks/ribbon.js

The full text of the longer comments in the engine's `blocks/ribbon.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: ribbon. A band of words that rolls across the page, the frieze
every builder has and none of them needs a library for. The band is up to
three stripes: a thin one above, the main one, and a thin one below. Each
stripe holds the words, the separator mark over and over, or nothing but
colour, so a plain rule above a rolling line is one block rather than three.

The motion is the background loop layer's idiom (.urd-bg-loop-runner in
base.css): a stripe's track holds its content in two equal periods inside a
clipping row and is translated by half its width, so one period lands
exactly where the previous one started and the loop has no seam. A period
is as many copies as it takes to reach across the band (ribbonPeriods and
syncTrackCopies), and every copy but the first is aria-hidden, so the words
are read once. For `roll` the duration is the measured width of one period
divided by the speed (ribbonDuration), for `sway` the width of the one copy
that drifts out and back, and for `step` the item count times the dwell
(ribbonStepDuration), since a ticker is timed per word and not per pixel,
with keyframes measured per word (stepFrames). A ResizeObserver measures
again when the width changes.

ADR-0011 gating: under prefers-reduced-motion the words stand as a static
row, and while the editing chrome is on the band stands still so the words
can be read and edited. The panel's «Play the motion» (urd-demo-motion) and
Clean view both show the real thing.


## `fitBandReach`

Lays a band out over its reach (ribbonWidth, bandReach): the content
surface or the window's full width, measured from the section and the
canvas, since vw would count the scrollbar too. The block's own box needs
nothing. The ancestors are looked up when called, after the block is in
the page.

## `syncTrackCopies`

The copies of a run that fill a track: two periods of `periods` copies each,
the first copy being the run itself. Without `build` a copy is a clone the
reader never meets (aria-hidden and inert, and stripped of the editing
hooks), so the words are read once. With `build` the caller makes each copy
itself, for content that carries listeners a clone would lose (the
gallery's tiles: their load guard and their click); such a copy answers the
pointer, and is kept out of the reading and tab order instead of inert.

## `stepFrames`

The ticker's own keyframes: one stop per item at the item's measured left
edge, held with a step-end timing, so every jump lands on a word and not on
a fraction of the width. The frames cover one period of `periods` copies
and end a whole period in, where the next copy stands exactly as the first.

## `bandPauseControl`

The band's pause (WCAG 2.2.2: moving content that lasts more than five
seconds needs a pause that stays). A real button with aria-pressed at the
band's right edge in the «button» form; in the «touch» form it is there for
the keyboard only, shown while it has focus, and a touch on the band pauses
it, a later tap on its empty space plays it again. The pointer over the band
and focus inside it hold it for as long as they stay (urd-ribbon-pausable in
base.css). Shared with the gallery's band view; the calendar's Band design
has its own (bandPause in calendar-next.js).

## `buildStripe`

One stripe: a clipping row with a track that holds its content as many
times as the band needs (syncTrackCopies). A `plain` stripe is colour alone
and has no track to measure or move, and a swaying stripe drifts out and
back with its one copy.

## `ribbonBlock › render › const reduced`

The chrome's hold is a CSS rule on the body (preview.css): Clean view never
re-renders, so a class decided here would stick. What is decided here is
only what cannot change without a new render.

## `ribbonBlock › render › requestAnimationFrame`

Everything that has to be measured waits for the frame after the block
has been put in the page: the width of each track, the reach of a
full-width band, and the height the block needs (auto-grow, where the
blocks below are moved by the push pass, ADR-0024).
