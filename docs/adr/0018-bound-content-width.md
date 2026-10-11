# ADR-0018: Bound content width

Date: 10 August 2026. Status: accepted (v0.7, milestone 0.7.2 the width change); the preview consequence amended 16 September 2026 and the scaling consequence 23 September 2026, earlier text in [amended/](amended/0018-bound-content-width-until-2026-10-11.md). What happens to the blocks below the design width is decided in ADR-0024 (the content push); how the editor measures the canvas is described in [ARCHITECTURE.md](../ARCHITECTURE.md).

## Context

Blocks are placed with `left` and `width` as a PERCENTAGE of the section width, and `top` and `height` in PIXELS. The section is always full viewport width, and without a wrapper with a maximum width nothing bounds the content.

That mix produces two symptoms with the same root:

1. **Blocks stretch endlessly with the width.** A text field with `w: 50` is 490 px wide on a small laptop and 1200 px on an ultrawide screen. There is no upper bound, so a line of text can become unreadably long.
2. **The fold mismatch in the preview.** The editor renders the iframe at the admin window's width and scales it down uniformly. Since the layout is not width-invariant, the pixel position of everything below an `85vh` section depends on the width of the admin window, and the fold does not match what a visitor sees.

With a bound content width, `x%` of a FIXED width becomes a fixed pixel count. Both axes are then effectively pixels over the design width, the layout becomes width-invariant, and one change removes both symptoms. It is the Wix model: full-width section background, bound content.

The field study supports the form: full-width background with bound content is the model everywhere.

**The number requires a distinction that is easy to get wrong.** «1440» in design guidance is usually the ARTBOARD, that is the screen one designs on, and the content container inside it is 1140 to 1200. Measured as pure content width, 1200 is the most used value. The builders that have full-bleed sections and bound content, that is the same model as here, sit higher in their own equivalent setting: Squarespace's «Page Width (Max)» is recommended at 1440, and Wix Studio has 1600 as the default. The guidance explains the spread by genre: 960 to 1024 for text-heavy sites, 1280 to 1440 for image- and marketing-driven ones. Urd builds association sites with heroes and images, not documentation.

## Decision

1. **The content is bound by a canvas node per section, `.urd-canvas`, placed inside `.urd-section` after the background layers.** The blocks (or the mobile grid surface, ADR-0019) sit inside it. The width is `min(100% - 2 * margin, design width)` with `margin-inline: auto`.

   `.urd-section` remains full viewport width, and the background layers remain `position: absolute; inset: 0`. Full-width background with bound content therefore costs no `100vw` breakout, no scrollbar skew and no transform.

   The alternative, putting `calc()` into the frame-to-CSS conversion and skipping the node, is rejected: it would have forced the editor to COMPUTE the content width with the same `min()` expression as the CSS instead of MEASURING it, that is building drift between editor and engine into the design. The frame-to-CSS conversion is therefore unchanged.

2. **The canvas is absolutely positioned on desktop, and in the flow only on mobile.** The editor's sticky toolbar is a flow element inside the section, so a canvas in the flow beside it would make the section grow and shrink by the toolbar's height. On mobile the canvas MUST sit in the flow, since the row grid is real document flow and the section height is driven by it.

3. **`.urd-canvas` must NEVER have `transform`, `filter`, `perspective`, `backdrop-filter`, `contain`, `container-type` or `will-change`.** All seven create a containing block for `position: fixed` descendants and would kill pinned and screen-docked blocks.

   The same constraint disqualifies two neighbouring designs: a model where the content is always the design width and is scaled down with `transform` on narrower screens, and container queries placed at canvas level.

4. **The width lives in two places, both additive (ADR-0005).** `site.layout = { contentWidth, gutter }` is the site's design constant, with `contentWidth` as a number in px or the string `"full"`. A number and not a CSS string, because the editor has to do arithmetic on the value for the preview's target width.

   **`gutter` is a PERCENTAGE OF THE VIEWPORT WIDTH (vw), not pixels.** The margin only acts as a floor, that is only on screens where `contentWidth` does not yet bind, and that band lies between the mobile breakpoint and roughly 1640 px. There a fixed margin is the wrong size at both ends: 24 px is fine on a phone, but lets the content almost stick to the edge on a tablet. A relative margin is right across the whole band. The editor shows it as a scale, since the number means nothing to a site owner.

   A consequence that must be stated: with a relative margin the binding limit is not `contentWidth + 2 * gutter`, but `contentWidth / (1 - 2 * gutter/100)`, because the margin grows with the window. With 1440 and 6 % it is 1637, not 1488. That means the default binds exactly at 1920, but not at 1536; there the surface is still bound and does not grow freely, it just does not quite reach 1440. `section.size.maxWidth` is the per-section override and escape hatch for full-width heroes and edge-to-edge dividers.

   **The default is `contentWidth: 1440`, `gutter: 6`.** It binds exactly at the most common desktop resolution (1920x1080) and matches Squarespace's recommendation for the equivalent setting; 1200 would leave 37.5 % of a 1920 screen empty. Text-heavy sites are better served by 1080 or lower, and that is precisely why the width is a setting in the Site panel and not a constant.

5. **The binding applies only above the mobile breakpoint.** Under `body.urd-mobile` the margin is 0 and the canvas is 100 %, so all `frames.mobile` keep exactly their meaning. The mobile model is ADR-0019 and is not touched here.

6. **No grandfathering: everything is converted.** The pre-v1 clause in the ADR-0005 addendum applies, and two layout models are not maintained forever. `SITE_SCHEMA_VERSION` is bumped, and the migration fills in `layout` explicitly on files that lack it, so that the field is always present after loading and editor and engine can never derive different defaults.

## Consequences

- **A clone made from v0.6.11 with its own content will reflow on update.** That is the direct price of decision 6, and it is stated here in plain words instead of being discovered. From v1.0 the same change would have required a real migration path with preserved appearance.

- **The change does NOT give width invariance in general.** In the band between the mobile breakpoint (640) and the binding limit (1637 with the default values), `x`/`w` are still percentages while `y`/`h` are pixels. The change CONFINES that distortion to a finite band instead of an unbounded range, and the ADR must not be read as a claim of invariance below the design width. What happens to the blocks in that band is answered per block by ADR-0024: the content push keeps them apart, and a block can shrink its own content to a floor.

- **Proportional scaling of the whole page below the design width was tried and rejected:** a page that only gets smaller adapts nothing, everything only shrinks. The width problem is answered per block by ADR-0024.

- **Width invariance is not content invariance.** Even at the exact design width, `h` is fixed while the content varies with font loading, the user's font size, browser zoom and language (the five UI languages in ADR-0012; Turkish and Northern Sami text is longer than bokmål). The content-driven half of the overflow is owned by ADR-0024.

- **No migration can rescue stored heights.** A block's wrapped height only exists once something is actually rendered in a browser, and hand-adjusted overlaps, optical adjustments and rotated blocks also change proportions. Content moved to a new design width is therefore checked visually, never converted by formula.

- **The data does not separate full-width INTENT from column width.** `w: 100` can mean «I wanted the whole screen» or «this is the column», and only the site owner knows which. The escape hatch is `section.size.maxWidth: "full"` per section. A per-BLOCK `bleed` field is the long-term solution (Wix has it), but does not belong to this milestone.

- **The preview's Screen device follows the site owner's own window, and the preview always fills the panel.** The fold mismatch has two independent causes: that the layout depends on the admin window's width (which binding the canvas width removes), and that the canvas has a different aspect ratio than a real browser, so that `100vh` resolves against the canvas. Pinning the height as well, that is letterboxing, is never the default: visible bars around the page conflict with the page being shown as it is actually shown, which is the whole point of the Squarespace model; an approximate fold is an invisible cost, bars are a visible one. Of twelve builders surveyed (LAERDOMMER §2), Webflow, Squarespace, Shopify, Gutenberg, Elementor, Carrd and GrapesJS let the desktop canvas follow the editor's own window, Wix Studio, Framer, Figma Sites and Bricks fix the width and always pair it with zoom, and none pins the viewport height to a device. Screen therefore has two modes, chosen per browser: My window (default; the width of the site owner's own browser window in CSS px, the same window the published page is compared in, so a maximised window is the screen and browser zoom is honoured) and Editing size (an explicit width of 640 to 3840 px and an optional height of 480 to 2400 px; only a set height pins both axes, and the surplus below the stage is then the letterbox surface, the opt-in exception). The four fixed devices stay: Reference 1920 is a fixed reference canvas, and Laptop, Tablet and Phone are real widths. The canvas width never follows the side margin: that would make dragging the margin change the zoom and the whole page look larger or smaller; with fixed widths the margin becomes visible where it actually applies, on Laptop and Tablet. Known deviation: the preview hides the page's scrollbar, so browsers with a classic scrollbar lay out about 15 px narrower than the preview.

- **Container queries are closed for the canvas, but not for the blocks.** `container-type: inline-size` implies `contain: layout style inline-size`, and layout containment makes the element the containing block for `position: fixed`. Container queries therefore belong in the block INTERNALS (a collection or a gallery choosing its column count from its own width), never on `.urd-canvas`, and a block with `sticky` must never get `container-type`. This closes ELEMENTKART 5b.9 with a constraint instead of an open wish.

- **Subgrid is not applicable.** The canvas is absolute positioning, so there is no grid to be a sub- of. Subgrid only gets a place of use if the layout actually becomes a grid.

- **The editor measures the canvas, never the section.** Every editing gesture takes its width from the canvas, so a measurement against the section is a defect, not a variant.

[ADR-0005]: 0005-versioning-and-migration.md
[ADR-0011]: 0011-native-css-first.md
[ADR-0012]: 0012-multilingual.md
[ADR-0019]: 0019-synced-mobile-model.md
[ADR-0024]: 0024-content-push-on-the-desktop-canvas.md
