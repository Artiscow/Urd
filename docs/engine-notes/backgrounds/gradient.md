# backgrounds/gradient.js

The full text of the longer comments in the engine's `backgrounds/gradient.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Background layer: gradient. Linear or radial. The colors are stops: each
color sits at a position along the gradient (at, 0 to 100), with its own
opacity (alpha, 0 to 1, omitted means opaque). Two colors at one position
give a hard color edge. Optional animation per shape.

Version 1 gave each color a share of the space instead, a weight that was
normalized at render time and painted in the middle of its band; the 1 -> 2
migration turns those band centers into positions, so a stored gradient
looks the same.

## `stopPositions`

The stops as the CSS reads them: in position order, each with its color,
position and opacity. A stop stored as a bare color string reads as that
color, a stop without a usable position stands where the list order puts
it (spread evenly), and the order among stops at one position is the list
order, so a hard edge keeps its two colors the way round they were given.

## `widestBand`

The widest color band as a share of the gradient (0..1): each color owns
the stretch from the midpoint to its neighbor on either side, the first
from 0 and the last to 100. The loop's period length reads it.

## `sharesToPositions`

The version 1 shares as positions: the center of each color's band, with
the shares read as weights that need not sum to 100 and a missing or zero
sum giving equal bands. A share of 0 lands the color on its neighbors'
boundary, which is where the hard edge stood.

## `cyclicCycle`

Circular cycle for one-way panning (the rainbow model): the last color
 glides back to the first, so the pattern reads 1 2 3 4 1 2 3 4 - never
 mirrored, and no color is visible twice at the same time (a color shows
 only once unless it has been added twice). The positions are percentages
 of ONE period.

## `loopGeometry`

The loop geometry (pure, node-testable): follows the angle the owner has set.
The period is the gradient line across the surface plus JUST enough for the
hidden part of the cycle to hold the widest color: no color can then be
split across the edges of the visible area (the rule that no color shows
twice), while the colors keep roughly the same size as in the static
gradient (with 7 equal colors the period is only 1/6 longer than the line,
never double). The shift is exactly one period along the axis - the pattern
is then identical at the end of the round, and the loop seamless for ANY
angle (CSS angle: 0 = upwards, 90 = to the right).

## `gradientRender`

Builds the whole render recipe as a pure function (node-testable): the
background CSS, extra style properties (kebab-case, including CSS vars)
and the animation class.

The recipe's `loop` is set only for pan-loop: the gradient is then painted on a runner in px once the surface can be measured (see render), and background is null. `runner` is set for pan/orbit: the gradient is painted on a 200 % runner animated with transform (compositor) instead of background-position (a repaint per frame); background is null there too.

## `gradientRender › return`

The runner is anchored (left/top) so the gradient center (x, y) sits at
the same point on the surface as when unanimated; the path swings the
runner ±2 % of its own size = 4 % of the surface (see urd-bg-orbit).

## `gradientRender › return (2)`

The runner model (see render): the pure recipe is the cycle, the angle
and the widest color band (which drives the period length); the px
measurements are set only once the surface can be measured.

## `const loopAppliers`

The loop runners must be re-measured when the window is resized (px
measurements). ONE module-level listener; detached runners (after a
re-render) are weeded out when apply returns false.

## `gradientLayer › render › el.classList.add('urd-bg-loop-host')`

One-way panning follows the owner's angle: a repeating gradient is
painted on an oversized runner in px, and the runner is shifted exactly
one period along the axis per round - seamless at any angle. The px
measurements require a laid-out surface, hence rAF + resize refresh.

## `gradientLayer › render › el.classList.add('urd-bg-loop-host') (2)`

Pan/orbit: the gradient is painted on a 200 % runner shifted with
transform on the compositor thread instead of background-position (a
repaint of the layer per frame). The host clips the runner, using the
same class as pan-loop.
