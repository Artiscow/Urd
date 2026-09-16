# ADR-0018: Bound content width

Date: 10 August 2026. Status: accepted (v0.7, milestone 0.7.2 the width change).

## Context

`frameToCss` in `template/assets/engine/<v>/render.js` places blocks with `left` and `width` as a PERCENTAGE of the section width, and `top` and `height` in PIXELS. The section is always full viewport width, and there is no wrapper with a maximum width anywhere in the engine. The only width constraint in the whole engine today is the rich footer (`.urd-footer-wrap`, 1080 px).

That mix produces two symptoms with the same root:

1. **Blocks stretch endlessly with the width.** A text field with `w: 50` is 490 px wide on a small laptop and 1200 px on an ultrawide screen. There is no upper bound, so a line of text can become unreadably long.
2. **The fold mismatch in the preview.** The editor renders the iframe at `window.innerWidth` and scales it down uniformly. Since the layout is not width-invariant, the pixel position of everything below an `85vh` section depends on the width of the admin window, and the fold does not match what a visitor sees.

With a bound content width, `x%` of a FIXED width becomes a fixed pixel count. Both axes are then effectively pixels over the design width, the layout becomes width-invariant, and one change removes both symptoms. It is the Wix model: full-width section background, bound content.

The field study supports the form: full-width background with bound content is the model everywhere.

**The number requires a distinction that is easy to get wrong.** «1440» in design guidance is usually the ARTBOARD, that is the screen one designs on, and the content container inside it is 1140 to 1200. Measured as pure content width, 1200 is the most used value. The builders that have full-bleed sections and bound content, that is the same model as here, sit higher in their own equivalent setting: Squarespace's «Page Width (Max)» is recommended at 1440, and Wix Studio has 1600 as the default. The guidance explains the spread by genre: 960 to 1024 for text-heavy sites, 1280 to 1440 for image- and marketing-driven ones. Urd builds association sites with heroes and images, not documentation.

## Decision

1. **The content is bound by a new node per section, `.urd-canvas`, placed inside `.urd-section` after the background layers.** The blocks (or `.urd-flow` in mobile auto mode) move into it. The width is `min(100% - 2 * margin, design width)` with `margin-inline: auto`.

   `.urd-section` remains full viewport width, and `.urd-bg-layer` remains `position: absolute; inset: 0`. Full-width background with bound content therefore costs no `100vw` breakout, no scrollbar skew and no transform.

   The alternative, putting `calc()` into `frameToCss` and skipping the node, is rejected: it would have forced the editor to COMPUTE the content width with the same `min()` expression as the CSS instead of MEASURING it, that is building drift between editor and engine into the design. It would also have broken `sticky.js`'s `parseFloat(el.style.left)`, which yields NaN on a calc string. `frameToCss` is therefore unchanged.

2. **The canvas is absolutely positioned on desktop, and in the flow only on mobile.** The section's toolbar in the editor is `position: sticky`, that is a flow element, and was the section's ONLY one. If the canvas sat in the flow next to it, the section grew by the toolbar's height every time the pointer hit it and shrank again when it left (found in testing 10 August 2026). On mobile, however, the canvas MUST sit in the flow, since the auto layout is real document flow and the section height is driven by the `.urd-flow` inside.

3. **`.urd-canvas` must NEVER have `transform`, `filter`, `perspective`, `backdrop-filter`, `contain`, `container-type` or `will-change`.** All seven create a containing block for `position: fixed` descendants and would have killed pinned and screen-docked blocks (0.7.1). The rule is enforced by a file-invariant test that reads base.css, not just by a comment.

   The same finding disqualifies two neighbouring designs: a model where the content is always the design width and is scaled down with `transform` on narrower screens, and container queries placed at canvas level.

4. **The width lives in two places, both additive (ADR-0005).** `site.layout = { contentWidth, gutter }` is the site's design constant, with `contentWidth` as a number in px or the string `"full"`. A number and not a CSS string, because the editor has to do arithmetic on the value for the preview's target width.

   **`gutter` is a PERCENTAGE OF THE VIEWPORT WIDTH (vw), not pixels** (changed 10 August 2026, schemaVersion 2 → 3). The margin only acts as a floor, that is only on screens where `contentWidth` does not yet bind, and that band lies between the mobile breakpoint and roughly 1640 px. There a fixed margin is the wrong size at both ends: 24 px is fine on a phone, but lets the content almost stick to the edge on a tablet. A relative margin is right across the whole band. The editor shows it as a scale (None, Small, Medium, Large) with the raw vw number under Advanced, since the number means nothing to a site owner.

   A consequence that must be stated: with a relative margin the binding limit is not `contentWidth + 2 * gutter`, but `contentWidth / (1 - 2 * gutter/100)`, because the margin grows with the window. With 1440 and 6 % it is 1637, not 1488. That means the default binds exactly at 1920, but no longer at 1536; there the surface is still bound and does not grow freely, it just does not quite reach 1440. Pure function `bindingWidth` in `editor/src/lib/content-width.js`, with test. `section.size.maxWidth` is the per-section override and escape hatch for full-width heroes and edge-to-edge dividers. The field already existed in `schema/page.schema.json`, was never read by the engine and was not documented; it is taken into use and documented in the same commit.

   **The default is `contentWidth: 1440`, `gutter: 6`.** It binds exactly at the most common desktop resolution (1920x1080) and matches Squarespace's recommendation for the equivalent setting. The value was first set to 1200, which left 37.5 % of a 1920 screen empty; it was corrected on 10 August 2026. Text-heavy sites are better served by 1080 or lower, and that is precisely why the width is a setting and not a constant.

   The width is editable in the Site panel: four quick choices, free adjustment from 960 to 1920, a separate control for the side margin, and a live sample against three real screen widths showing where the width binds.

5. **The binding applies only above the mobile breakpoint.** Under `body.urd-mobile` the margin is 0 and the canvas is 100 %, so all existing `frames.mobile` keep exactly their meaning. The mobile model is milestone 0.7.3 and is not touched here.

6. **No grandfathering: everything is converted now.** No real sites have been built with Urd yet, so the pre-v1 clause in the ADR-0005 addendum applies, and we avoid maintaining two layout models forever. `SITE_SCHEMA_VERSION` is bumped, and the migration fills in `layout` explicitly on files that lack it, so that the field is always present after loading and editor and engine can never derive different defaults.

## Consequences

- **A clone made from v0.6.11 with its own content will reflow on update.** That is the direct price of point 6, and it is stated here in plain words instead of being discovered. From v1.0 the same change would have required a real migration path with preserved appearance.

- **The change does NOT give width invariance in general.** In the band between the mobile breakpoint (640) and the binding limit (1637 with the default values), `x`/`w` are still percentages while `y`/`h` are pixels, that is exactly today's distortion. The change CONFINES it to a finite band instead of an unbounded range. The real fix is either a tablet breakpoint (0.7.3) or Wix Studio's model where both axes are multiplied by the same factor, which presupposes that the typography scales along. The ADR must not be read as a claim of invariance below the design width.

- **Width invariance is not content invariance.** Even at the exact design width, `h` is fixed while the content varies with font loading, the user's font size, browser zoom and language (the five UI languages in ADR-0012; Turkish and Northern Sami text is longer than bokmål). The content-driven half of the overflow is only solved by the `minmax(height, auto)` row model from LAERDOMMER 5.1, which is the next step and requires its own ADR because frames then go from percentages and pixels to grid coordinates.

- **The text block must get a render-time safety net before the conversion.** `blocks/text.js` today grows only inside its `input` listener, that is only while someone is actually typing, and only in preview desktop. The six data blocks (stats, quote, timeline, gallery, faq, collection), by contrast, measure at render in a `requestAnimationFrame` and correct themselves both in preview and for visitors. The text block gets the same pattern. Caveat: the net prevents the text from spilling out of its own box, not the box from overlapping the block below, since the positioning is absolute.

- **No migration can rescue stored heights.** A text field with `w: 50` was 960 px wide at a 1920 px window and becomes 588 px at a 1200 px design width; the text wraps more and needs more height, but the wrapped height only exists once something is actually rendered in a browser. Hand-adjusted overlaps, optical adjustments and rotated blocks also change proportions. The demo content, the 24 section presets, the five starter packs (which compose the same presets) and the plugin presets are therefore converted by hand and checked visually.

- **The data does not separate full-width INTENT from column width.** `w: 100` can mean «I wanted the whole screen» or «this is the column», and only the site owner knows which. The escape hatch is `section.size.maxWidth: "full"` per section. A per-BLOCK `bleed` field is the long-term solution (Wix has it), but does not belong to this milestone.

- **The preview is pinned to four real devices, and always fills the panel.** The fold mismatch has two independent causes: that the layout depends on the admin window's width (which this ADR removes by pinning the canvas width), and that the canvas has a different aspect ratio than a real browser, so that `100vh` resolves against the canvas. The second half was attempted by pinning the height as well, that is letterboxing, and that is **rejected** (test finding 10 August 2026): visible bars around the page conflict with the page being shown as it is actually shown, which is the whole point of the Squarespace model. An approximate fold is an invisible cost; bars are a visible one. The fill choice from 0.6.6.5.9 therefore stands unchanged.

  The desktop canvas is a FIXED reference screen at 1920, not the binding width. The binding width was tried and rejected in the same test round: it makes the canvas width depend on the side margin, so dragging the margin changed the zoom and made the whole page look larger or smaller, and the narrowest setting gave the most letterboxing. With a fixed reference the margin becomes visible where it actually applies, that is on Laptop and Tablet.

- **Container queries are closed for the canvas, but not for the blocks.** `container-type: inline-size` implies `contain: layout style inline-size`, and layout containment makes the element the containing block for `position: fixed`. Container queries therefore belong in the block INTERNALS (a `samling` or a `galleri` choosing its column count from its own width), never on `.urd-canvas`, and a block with `sticky` must never get `container-type`. This closes ELEMENTKART 5b.9 with a constraint instead of an open wish; the place of use belongs to 0.7.4 and 0.7.9.

- **Subgrid is not applicable.** The canvas is absolute positioning, so there is no grid to be a sub- of. Subgrid only gets a place of use if the layout actually becomes a grid.

- **The editor's measuring sites must be rebased from the section to the canvas.** `preview-edit.js` today measures `host.clientWidth` on `.urd-section` in roughly fifteen places (drag, resize, arrow keys, marquee, group drag, grid overlay, block menu, materialisation of mobile frames). `sticky.js` derives the block's left edge and width from the section rect, but the release limit from the section's top and bottom; the two must be split into separate variables. A shared `canvasOf` helper makes all the sites look alike, so that a forgotten measurement is mechanically searchable.

## Addendum: the Screen device follows the owner's own screen, or an editing size (16 September 2026)

The fixed 1920 px reference canvas did not match what the site owner sees: on a 1536 px laptop the published page shows the content band at 88 % of the window while the preview showed it at 75 %. A survey of twelve builders (LAERDOMMER §2, 16 September 2026) found that Webflow, Squarespace, Shopify, Gutenberg, Elementor, Carrd and GrapesJS let the desktop canvas follow the editor's own window, that Wix Studio, Framer, Figma Sites and Bricks fix the width and always pair it with zoom, and that no builder pins the viewport height to a device: Bricks' H field and Carrd's cropped/expanded toggle are the only prior art. Screen therefore has two modes, chosen per browser (localStorage `urd-admin-screen`, lib/own-screen.js): My screen (default; the own screen width in CSS px, the panel filled like every other device) and Editing size (an explicit width of 640 to 3840 px and an optional height of 480 to 2400 px; only a set height pins both axes, and the surplus below the stage is then the letterbox surface, the opt-in exception to the rejection of 10 August above). Reference 1920 keeps the earlier canvas; Laptop, Tablet and Phone are unchanged, and the width still never follows the side margin. Known deviation: the preview hides the page's scrollbar, so browsers with a classic scrollbar lay out about 15 px narrower than the preview.

[ADR-0005]: 0005-versioning-and-migration.md
[ADR-0011]: 0011-native-css-first.md
[ADR-0012]: 0012-multilingual.md
