# animations/core.js

The full text of the longer comments in the engine's `animations/core.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core animations. Registry types with the same version+migrate contract as
blocks and background layers (docs/SCHEMA.md): an Urd update can change an
animation's props safely via migrations.

The entrance animations (fade-in, slide-up, zoom-in) play when the element
scrolls into view for visitors (IntersectionObserver). In the editor preview
the END state is shown: editing must not trigger endless playback.
prefers-reduced-motion is respected (the CSS in base.css zeroes it out too).

All the CSS lives in base.css (.urd-anim-\*): the definitions here only set
classes and duration/delay as CSS variables.

## `coreAnimations › stagger`

Stagger is a GROUP entrance animation (section level only): it does not
animate the section itself, but releases the section's card blocks staggered
from ONE shared trigger. pattern: 'sequence' (one step per card), 'columns'/
'rows' (cards on the same x/y arrive together, the wave moves sideways) or
'center' (outwards from the middle of the row). delay is a shared base delay
(additive since v0.6; older data lacks the field and reads as 0).

## `pointerEffectOf`

The pointer effect a block plays: its own, else the one its section gives
every element in it (`blocksHover`, additive from 0.7.0.87), which a decor
block never takes (decor is ornament, as the stagger leaves it out). A
block with an effect of its own, in `hover` or in `animation` as older
pages store it, keeps its own. `hover: false` (additive from 0.7.0.88) is
a block's «None» where its section gives one: no effect at all, not even
the section's. Pure function (node-tested).

## `entranceOf`

The animation a block plays on this screen from its `animation` field: its own, except an entrance switched off on the phone (`entranceMobile: false`, additive from 0.7.3.8), which leaves the block standing in its end state at phone width.
A pointer effect an older page keeps in `animation` is no entrance and stays. Pure function (node-tested).

## `staggerColumnDelays`

Delays (ms) for column/row stagger: positions are clustered with a tolerance
(cards that are almost aligned count as the same column/row), and the wave moves
along by ascending position. Pure function (node-tested).

## `staggerCenterDelays`

Delays (ms) for the "from the center" stagger: the middle card (or the middle
pair for an even count) is released first, then the row waves outwards
symmetrically. Index-based (the order of the cards in the section). Pure function
(node-tested).

## `releaseGroup`

Shared release for group entrances (stagger and per-card): in the preview and
with reduced motion the end state is shown at once; otherwise the targets are
released together the first time the host is visible.

## `entranceObserver`

The entrance animation plays when the element becomes visible - also when it is
already visible at load (it then fades/slides in just after the page appears, as
"Fade in" should). The IntersectionObserver callback runs only after the start
state (opacity 0 from CSS) has been painted, so the transition plays cleanly.
Elements scrolled to later play when they enter the viewport.
(In the editor preview the END state is shown immediately - see applyAnimation
- so the observer is only active for visitors and on the published page.)

## `entranceObserver › const tall`

Elements much taller than the viewport (tall sections) never reach a 15 % visible ratio.
They trigger instead once the visible part covers more than half the viewport, so the content is not left at opacity 0 forever.

## `applyStagger`

Stagger (group): find the section's card blocks (those without their own
animation), give them an entrance effect + a staggered delay by pattern, and
release them together from the section's visibility. In preview/reduced-motion
the end state is shown at once.

## `applyStagger › const targets`

The card blocks: every .urd-block in the section without an entrance of its
own (render.js marks those `data-urd-entrance`); a pointer effect is no
entrance, so a block that lifts on pointer still comes in with the wave.
Decor blocks are excluded (as in the mobile stacking): they are ornament
and must not delay the content wave, nor must a space, which draws nothing.

## `applyAnimation`

Hooks an (already version-lifted) animation onto an element.
Note: blocks with rotation have an inline transform that beats the transform of
the animation classes - only the opacity part then plays.

## `applyCardAnimation`

Per-card animation (blocks with the animPerCard flag): the block's entrance
animation plays per card with an index-staggered delay from ONE shared trigger
(the block's visibility), like stagger; pointer effects are applied to each card.
In preview/reduced-motion the end state is shown at once.

## `applyCardAnimation › for (const card of cards) {`

After the entrance the delay is cleared: the combination rule for entrance +
pointer effect (base.css) reuses the variable in the transition, and the lift
back must not inherit the card's staggered start.
