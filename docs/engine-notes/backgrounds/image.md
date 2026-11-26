# backgrounds/image.js

The full text of the longer comments in the engine's `backgrounds/image.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Background layer: image. Shows a file from media/ (or a data URL for
unpublished uploads in a draft; publishing materializes it into a file,
the same flow as the image block).

Position and size are CSS-native via `background-position` and
`background-size` on an inner `.urd-bg-image` element (same model as the
image gallery layer), NOT via transform. Transform is used only for parallax.

Fields (all additive with safe defaults):
- fit: 'cover' (fill+crop), 'custom' (background-size %, width-relative - shrinks
  AND enlarges, is not cropped by the section height), 'contain' (show all), 'repeat'.
- x/y (0..1, 0.5 = centered): focal point via background-position percentages. The
  point stays visible whatever the section format, with no empty space.
- size (fraction, 1 = 100% of the width): only in 'custom' mode.
- look, brightness, contrast, saturate (additive from 0.7.29.4, the image editor): the
  picture's finish as a filter (picture.js), the looks a filter draws alone.
- blur (px): mood background behind text. opacity (0..1). parallax (0..1): the layer
  lags behind on scroll. bleed: let the parallax flow into the neighbouring sections.
- motion ('none' | 'kenburns' | 'drift') with motionSpeed (seconds per cycle): the
  layer moves on its own. It paints on an element inside the parallax carrier, since
  the two would otherwise fight over `transform`.

## `const MAX_SHIFT`

Maximum vertical travel (fraction of the viewport height) a parallax layer gets at
 full strength. Generous, since the free-placement image (scale + position) does not
 HAVE to fill the section: it shifts cleanly with no overscan/zoom, so the movement
 can be large.

## `bgSize`

The background-size value. The free-placement model (`plain`/`tile`) uses a
width-relative SCALE (`{size*100}%`, height = auto keeps the aspect ratio), so the
user sets the size themselves. `cover`/`contain` are kept as keywords (image
gallery layer and backwards compatibility). Pure function (node-tested).

## `bleedClip`

clip-path for a layer from the bleed direction. The sides are ALWAYS clipped at the
edge (no horizontal bleed → no sideways scrolling); top/bottom open on the bleed side
so a parallax layer can flow into the neighbouring section. Pure function (node-tested).

## `parallaxPad`

Vertical overscan (px) for a parallax layer: exactly the travel the layer needs
to shift without revealing its edges. Proportional to the strength, so a low
strength gives minimal enlargement. Capped against the section height. Pure function (node-tested).

## `parallaxOffset`

translateY (px) for a parallax layer: the section center measured against the
viewport center, multiplied by the strength, clamped to [-pad, pad] so it never
shifts outside the overscan. Pure function (node-tested).

## `const parallaxAppliers`

Active parallax layers: ONE module-level scroll/resize listener shifts them via
rAF. Detached layers (after a re-render) are weeded out when apply returns false.

## `mountParallax`

Attaches parallax to the image element: one rAF-driven listener shifts it on
scroll via `translateY`. The overscan (top/bottom) keeps the shift from revealing
the edges; it is at least `blurMargin` (the blur fringe) and grows to the
parallax travel. OFF on mobile and with prefers-reduced-motion (the layer then
stands still, only the blur fringe is kept).
Fill modes (cover/tile) MUST overscan (they fill the section, so a gap at the
edge is unacceptable; overscan costs no zoom on a tile, a little on cover). The
free model (plain/custom/contain) shows the image with space around it, so there NO
overscan is needed: the image shifts cleanly, without zoom, and the whole strength
range is noticeable.

## `mountParallax › if (typeof requestAnimationFrame ===`

`renderBackgroundLayers` puts the layer in the DOM AFTER render(), so the first
apply above runs before the section is measurable (overscan = 0). Run it again
once the layer is connected and measurable, otherwise the image only grows on
the next scroll.

## `supportsScrollTimeline`

Does the browser support scroll-driven animations? Then the compositor drives
the parallax via `animation-timeline: view()` (CSS), and we avoid both the scroll
listener and the rAF pump (mountParallaxCss). Otherwise we fall back to the
rAF-driven mountParallax. Also gated in CSS with `@supports`.

## `const parallaxMeasurers`

CSS parallax: the travel (--urd-px-shift) and the overscan (top/bottom) are set
once and on RESIZE, never on scroll. The shift itself is scrubbed by the view()
timeline in base.css on the compositor thread. A shared resize listener with the
same cleanup as the rAF fallback: detached layers are weeded out when the measure
function returns false.

## `mountParallaxCss`

Attaches CSS parallax to the image element: the travel and the overscan are
computed from the section height and the viewport height (the same parallaxPad
formula as mountParallax), but the shift is scrubbed by `animation-timeline: view()`
in CSS - no scroll listener, no rAF per image. Still on mobile / with reduced
motion (CSS then sets animation:none; here the overscan is held at the blur fringe
so the layer sits cleanly in its end state).

## `imageLayer › migrations › 2`

2 -> 3: motion of its own beside the parallax. The defaults stand FIRST
and the stored props last, because the editor writes into layer props
without lifting them: a layer still stored as version 2 can already
carry a chosen motion, and the lift must not overwrite it.

## `imageLayer › render › const demo`

The source goes straight into CSS url(), so it must pass the same guard as
the nav background (shared isSafeImage). No picture yet means a drawn
example that base.css shows only inside the editor, so the owner can set
size, position and motion before choosing the photo.

## `imageLayer › render › el.style.zIndex`

Bleed DOWN/BOTH: the section below comes later in the DOM and paints its own
background on top of what flows down. Lift the layer to z-index 1 so it paints
OVER the next section's background (but still under its content, which sits at
z>=1 later in the tree). Bleed UP already paints over the previous section (tree order).

## `imageLayer › render › const motion`

Motion and parallax both drive `transform`, so a moving layer paints on
an element of its own inside the parallax carrier. A still layer paints
on the carrier itself.

## `imageLayer › render › paint.style.backgroundPosition`

Placement via background-position. The image is (usually) SMALLER than the
section, so 0/100 % = flush left/right (intuitive), and x/y can go BELOW 0 /
ABOVE 1 to put the subject partly or entirely outside the edge.

## `imageLayer › render › const finish`

Blur: stretch the image a touch past the edge (clipped by the layer) so the
transparent fringe blur() creates ends up outside. No deliberate zoom.
The finish (a look and the adjustments) goes in the same filter, before the blur.

## `imageLayer › render › const probe`

Same load guard as the image block: the layer is kept invisible until the image
has finished loading, so it never appears in stripes.
In a page's first section the picture is the first screen's, so the probe asks for it ahead of the rest, and the background reuses that request.

## `mountLayerParallax`

Hooks parallax onto a layer element (image or video, shared with the video layer):
modern browsers drive it with scroll-driven CSS (compositor thread, no scroll
listener); older ones fall back to the rAF-driven variant.
