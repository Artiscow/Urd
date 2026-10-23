# Settings: what each element offers, read from source

This file answers what an element can be set to: the settings each kind of element offers in eleven open-source builders and block libraries, read in their source code, and where Urd stands on each. Which elements exist across the field is in [ELEMENTS.md](ELEMENTS.md) part 2, whose row numbers the sections below cite; whether Urd has a feature at all is in [FEATURES.md](FEATURES.md), and how the editors are built is in [CODE.md](CODE.md). What a link and an anchor can be in the same projects, and the rules drawn from it, is the survey of 21 October 2026 in [SURVEYS.md](SURVEYS.md#what-a-link-can-point-to-and-what-every-element-carries-21-october-2026). The source marks are explained in [README.md](README.md).

**What was read.** On 21 October 2026 the settings registries of eleven projects were read from shallow clones of their default branches (GenerateBlocks from its wordpress.org build), and nothing was run: the `block.json` attributes and supports of Gutenberg, Kadence Blocks, Spectra, Stackable and GenerateBlocks, the `register_controls()` calls of Elementor's widgets, Webstudio's component metas, GrapesJS's traits and style-manager sectors, Puck's field types, Builder.io's inputs and Plasmic's code-component metas. Each setting was extracted as one record with its element, label, type, options, default, group and source path. Silex and Onlook were read too, but have no settings registry: Silex adds a few traits to GrapesJS, and Onlook edits React and Tailwind code directly.

**Limits.**
- **Labels:** where the editor panels were not parsed (Kadence, Spectra, Stackable and GenerateBlocks keep them in edit files and built bundles), a label is the attribute name made readable, and the device variants of a setting count as one.
- **Plasmic:** its built-in elements (frame, text, image, link) and its style panel are an internal model, not a registry, so only its first-party code components were read; its column says «n/r» where the built-ins would answer.
- **GenerateBlocks:** the version 2 blocks keep every style in one `styles` attribute whose controls live in the built bundle, so their style settings count as one each.
- **Stackable:** a few attribute composers were not resolved (separators, links), so its link settings are under-counted.
- **Counts:** the numbers come from the extracted records and are indicative; a setting missing from the records does not prove that a project lacks it. Rename, lock and reuse, which Elementor, Webstudio and GrapesJS keep in the editor rather than in the registry, were checked in their code.

**Urd's side** was counted from the engine (`template/assets/engine/0.7.7/`) and the editor at commit 979e866 on 21 and 22 October 2026, with the deliveries since then read at commit cac90f9: 0.7.27 (a name on any section or block beside a stable id on every block; one link editor with a page and a spot on it, a web address with nofollow and sponsored, email, phone and a file; a new tab and a download; the link field for plugins) and 0.7.0.61 (the section's Properties in groups).

**The Urd and Where cells** use the words of ELEMENTS.md: Has, Partial, Missing and n/a for Urd's status, and for the place a backlog item («0.7.9», «v0.8 ER-E», «After v1.0: …»), «Watch: <gate>», «Not taken: <reason>», or «-» when Urd has the setting or it does not apply. Every setting Urd lacks has a place or a reason. This file has no ID series of its own: its gaps point to backlog places and to the rows of ELEMENTS.md and FEATURES.md.

## The projects read

The short names follow the builder codes of ELEMENTS.md (WP, EL, WS, KB, SP, ST, GB); GJ, PK, BI and PL are added here. Popularity was read on 21 October 2026: GitHub stars, and active installs on wordpress.org for the WordPress plugins.

| Project | Short | What was read | Elements | Settings | Popularity | Commit read |
|---|---|---|---|---|---|---|
| [Gutenberg](https://github.com/WordPress/gutenberg) (code) | WP | The block library of 24.3.0-rc.1: each block's `block.json` attributes and supports, and the layout-child settings every block in a flex or grid parent takes | 116 | 3,601 | 11,776 stars; the plugin 400,000+ installs | [168e4f4](https://github.com/WordPress/gutenberg/tree/168e4f4), 21 Oct 2026 |
| [Elementor](https://github.com/elementor/elementor) (code) | EL | The free core 4.4.0: every widget's `register_controls()`, the Advanced tab every element shares, the group controls, and the v4 atomic elements with their style schema | 53 | 1,345 | 7,095 stars; 10 million+ installs | [b4ca769](https://github.com/elementor/elementor/tree/b4ca769), 21 Oct 2026 |
| [Webstudio](https://github.com/webstudio-is/webstudio) (code) | WS | The component metas (`*.ws.ts`) of the React, Radix and animation packages, the HTML and ARIA attributes every instance takes, and the style panel's sections | 105 | 638 | 9,100 stars | [dabaeed](https://github.com/webstudio-is/webstudio/tree/dabaeed), 21 Oct 2026 |
| [GrapesJS](https://github.com/GrapesJS/grapesjs) (code) | GJ | Core 0.23.8: the component types' default traits, the selector and device managers, and the style manager's sectors | 26 | 156 | 26,326 stars | [f47fbde](https://github.com/GrapesJS/grapesjs/tree/f47fbde), 21 Oct 2026 |
| [Puck](https://github.com/puckeditor/puck) (code) | PK | Core 0.23.0: the field types, the component config and the rich-text extensions, and the demo app's components | 11 | 133 | 13,504 stars | [1839d14](https://github.com/puckeditor/puck/tree/1839d14), 21 Oct 2026 |
| [Builder.io](https://github.com/BuilderIO/builder) (code) | BI | The SDKs: the Gen 2 `component-info.ts` inputs, the Gen 1 React inputs, and the fields every block carries; the visual editor is closed source | 26 | 141 | 8,870 stars | [c4497e9](https://github.com/BuilderIO/builder/tree/c4497e9), 20 Oct 2026 |
| [Plasmic](https://github.com/plasmicapp/plasmic) (code) | PL | The first-party code components in `plasmicpkgs` (`CodeComponentMeta`); the wrappers of third-party libraries left out | 21 | 103 | 7,124 stars | [3254a11](https://github.com/plasmicapp/plasmic/tree/3254a11), 21 Oct 2026 |
| [Kadence Blocks](https://github.com/stellarwp/kadence-blocks) (code) | KB | 3.8.0.1: each block's `block.json` attributes and supports | 62 | 2,603 | 325 stars; 600,000+ installs | [a30a69b](https://github.com/stellarwp/kadence-blocks/tree/a30a69b), 19 Oct 2026 |
| [Spectra](https://github.com/brainstormforce/wp-spectra) (code) | SP | 2.20.5: each block's `block.js` and `attributes.js`, and the extension every block gets | 67 | 5,279 | 28 stars; 1 million+ installs | [ea0852c](https://github.com/brainstormforce/wp-spectra/tree/ea0852c), 9 Oct 2026 |
| [Stackable](https://github.com/gambitph/Stackable) (code) | ST | 3.20.3: each block's `block.json`, its supports in `index.js` and its `schema.js`, expanded through the shared block components | 46 | 4,500 | 350 stars; 100,000+ installs | [d207f37](https://github.com/gambitph/Stackable/tree/d207f37), 21 Oct 2026 |
| [GenerateBlocks](https://wordpress.org/plugins/generateblocks/) (code) | GB | 2.5.0 from the wordpress.org build, since the git clone failed: `dist/blocks/*/block.json` and the PHP defaults of the version 1 blocks | 14 | 228 | 200,000+ installs | The 2.5.0 release |

Read without a registry: [Silex](https://github.com/silexlabs/Silex) (code), 3,013 stars, at [1fe592f](https://github.com/silexlabs/Silex/tree/1fe592f) (18 October 2026), and [Onlook](https://github.com/onlook-dev/onlook) (code), 26,971 stars, at [423e2e9](https://github.com/onlook-dev/onlook/tree/423e2e9) (21 July 2026).

Elements are each project's own elements. The settings include the entries every element shares (Elementor's Advanced tab and v4 style schema, Webstudio's attributes and style panel, GrapesJS's style manager, Puck's field types, Builder.io's block fields, Spectra's extension and Gutenberg's layout-child settings: 24 shared entries with 649 settings). In all, 547 elements and 18,727 settings.

## What every element can carry

The settings an element takes whatever it is, one row per capability.

| Mark | Means |
|---|---|
| All | Every element takes it through one shared mechanism: a support every block declares, a shared tab or extension, or a style panel over any CSS property («style» in brackets) |
| Some (n/N) | n of the project's N elements declare it, or the brackets name which |
| None | No element in the records takes it |
| n/r | Not read: Plasmic's built-in elements and style panel are not a registry |
| n/a | Does not apply |

| Capability | WP | EL | WS | GJ | PK | BI | PL | KB | SP | ST | GB | Urd |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| An anchor or HTML id | Some (98/116) | All | All | Some (21/26) | None | All (attribute) | All (attribute) | Some (40/62) | Some (51/67) | All | Some (v1 blocks) | All (0.7.27) |
| A CSS class | Some (109/116) | All | All | All | None | All | n/r | Some (59/62) | Some (60/67) | All | Some (9/14) | None |
| Visibility per device | Some (103/116) | All | All (style) | All (style) | None | All (style) | n/r | All | All | All | Some (9/14) | All blocks, phone only |
| Spacing (margin, padding) | Some (95/116) | All | All | All | Some (demo) | All (style) | n/r | Some (33/62) | Some (42/67) | All | Some (v2 styles) | n/a |
| Border and radius | Some (88/116) | All | All | All | None | All (style) | n/r | Some (24/62) | Some (36/67) | All | Some (v2 styles) | Some |
| Shadow | Some (64/116) | All | All | All | None | All (style) | n/r | Some (13/62) | Some (15/67) | All | Some (v2 styles) | Some |
| Typography | Some (86/116) | Some (every v4 element) | All | All | None | All (style) | n/r | Some (18/62) | Some (35/67) | Some | Some (v2 styles) | Some (text) |
| Background | Some (89/116) | All | All | All | None | All (style) | n/r | Some (25/62) | Some (39/67) | All | Some (v2 styles) | Some (sections) |
| Position or sticky | Some (group) | All (sticky in Pro) | All | All | None | All (style) | n/r | Some (column) | All | All | Some (v2 styles) | All blocks (desktop) |
| A link on the whole element | Some | Some | Some | Some | Some | All | Some | Some (12/62) | Some | Some | Some | Some |
| Motion or entrance animation | None | All | Some (wrappers) | None | None | All | n/r | None | All | All | None | All |
| Z-order | None | All | All | None | None | All (style) | n/r | Some (3/62) | All | All | Some (v2 styles) | All blocks |
| Custom CSS | Some (109/116) | None (Pro) | All (any property) | None | None | None | n/r | All | Some (60/67) | All | Some (9/14) | None |
| Lock | Some (109/116) | None | None | All | None | All | n/r | Some (59/62) | Some (59/67) | All | Some (9/14) | None |
| Rename in the layer list | Some (109/116) | All | All | All | None | All | n/r | Some (61/62) | Some (60/67) | All | Some (9/14) | None |
| Reuse as a pattern | Some (90/116) | Some (sections, containers) | All (Slot) | All (symbols) | None | All (Symbol) | n/r | Some (37/62) | Some (59/67) | Some (42/46) | Some (9/14) | All (as copies) |

The WordPress libraries and Elementor give an element its cross-cutting settings through one shared mechanism (block supports, the Advanced tab, Spectra's extension, Stackable's block components), so a new block gets them all at once, while Webstudio, GrapesJS and Builder.io reach the same breadth through one style panel over any CSS property per breakpoint. Puck and Plasmic leave styling to the developer's components, which is why their columns are thin. Urd carries an anchor, motion, the layer order, pinning and hiding on the phone on every block, but no class, custom CSS, lock or layer name, and its border, shadow and background reach only some blocks; spacing does not apply, since blocks are placed freely.

**Where Urd's gaps go:**
- **A CSS class:** Not taken: the class-based cascade is not adopted (FEATURES.md «Custom classes»).
- **Custom CSS:** v0.8 OL-4, a scoped style per look; site-wide custom CSS stays not taken.
- **Lock and rename:** 0.7.9, the layers panel, with a name per block and a lock field.
- **Visibility:** elements shown only on the phone in 0.7.3; hiding on a tablet Not taken: Urd has two layouts ([ADR-0019](../adr/0019-synced-mobile-model.md)); a hidden section, and a hidden block beside it, in v0.8 AR-5.
- **Pinning on the phone:** 0.7.3, as a choice per block in the row grid.
- **Border, shadow and background on more blocks:** 0.7.9, the box styles of the design gallery and the component tokens.
- **Typography:** a font weight and letter case in 0.7.9.
- **A link on the whole element:** v0.8 ER-G, any block or group of blocks as a link.
- **Reuse:** templates are copies; synced reuse is After v1.0: synced global blocks.
- **Spacing:** n/a: free placement ([ADR-0001](../adr/0001-hybrid-editor-model.md), [ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md)).

## Per element

One section per element kind that Urd has a counterpart for, in the order of the extraction's index. Each lists the settings that at least two projects offer, the projects that offer them, and Urd's status with its backlog place. A setting only one project offers is left out unless the text names it.

### Heading

Urd: the heading levels of the text block (ELEMENTS.md #22).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| Heading level or tag, H1 to H6 | WP, EL, WS, PK, KB, SP, GB | Partial: H1 to H3 in the text toolbar | 0.7.9 (text styles: H4 to H6) |
| Alignment | WP, EL, PK, KB, SP, GB | Has | - |
| Size presets | EL, PK | Has: «Size» on the block, and a px size per selection | - |
| Link colour | WP, EL, KB, SP, GB | Missing | 0.7.9 (link styles) |
| A link on the whole heading, with new tab, nofollow and sponsored | EL, KB | Partial: links on words, through the link editor | v0.8 ER-G (any block as a link) |
| Text shadow | WP, EL, KB, SP | Missing | 0.7.9 (text shadow) |
| Gradient text | KB, SP | Missing | Not taken: low value |
| A highlighted part in its own colour | KB, SP | Has: highlight in the accent or a custom colour | - |
| An icon beside the heading | KB, GB | Missing | Not taken: an icon block placed beside the heading does it |
| A line above or below | SP, ST | Partial: a line block placed above or below | Not taken: as a setting of the heading; a line block does it |

### Text

Urd: the text block (ELEMENTS.md #23 and #24).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| Bold, italic, underline, strike and links in the text | WP, EL, GJ, PK | Has, with superscript, subscript, lists and a quote | - |
| The tag (p, span, div) | EL, WS, ST, GB | Partial: paragraph, H1 to H3, lists and quote | 0.7.9 text styles (H4 to H6); Not taken: span and div |
| Alignment | WP, EL, PK | Has, justify included | - |
| Text and link colour | WP, EL, PK | Partial: a text colour and a highlight per selection; no link colour | 0.7.9 (link styles) |
| Drop cap | WP, EL | Missing | 0.7.9 (a drop cap behind a gate) |
| Columns with a gap | EL, ST | Missing | 0.7.9 (text in columns) |

### Button

Urd: the button block (ELEMENTS.md #153, #154 and #155).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| A link, and a new tab | WP, EL, WS, PK, BI, KB, SP, GB | Has (0.7.27) | - |
| nofollow and sponsored | WP, KB, SP, GB | Has, for a web address (0.7.27) | - |
| Download | WS, KB | Has, for a file (0.7.27.9) | - |
| A style variant (filled, outline, primary, secondary) | WP, EL, PK, GB | Partial: «Filled» and «Outline» | 0.7.9 (component tokens: pill and ghost looks, an own colour) |
| Size presets | EL, KB, SP | Partial: the dragged frame and «Size» | 0.7.9 component tokens |
| An icon before or after the label, or an icon alone | EL, KB, SP, ST, GB | Missing | v0.8 ER-G (an icon in the button block) |
| Hover colours or an effect | EL, KB, SP, ST | Partial: the shared lift | 0.7.9 (button states) |
| A gradient background | WP, KB, SP, GB | Missing | 0.7.9 component tokens |
| Border, radius and shadow | EL, KB, SP, ST | Partial: the theme's small corners | 0.7.9 (component tokens: radius, border width) |
| Width or full width | KB, ST | Has: the dragged width | - |
| An accessible name apart from the label | WS, KB, GB | Missing | v0.8 ER-G (an accessible name in the link editor) |
| An id for the button | EL, ST | Has: a name and a stable id (0.7.27) | - |
| A title or tooltip | WP, KB | Missing | Not taken: a tooltip hides its words from touch and keyboard, so the label says it |
| A group: alignment, gap and stacking on phones | WP, KB, SP, ST | n/a: buttons are placed freely, aligned and distributed on a multi-selection, and stacked by the phone's row grid | - |

### Image

Urd: the image block (ELEMENTS.md #48, #69 and #72).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| Alt text | WP, WS, GJ, BI, KB, SP, ST | Has | - |
| Decorative, with an empty alt | WP, ST | Missing | 0.7.11 (a «decorative» toggle on images) |
| Caption | WP, EL, KB, SP, ST | Missing | v0.8 ER-B (a plain caption beside the caption overlay) |
| A link with target and rel | WP, EL, KB, SP | Has (0.7.27) | - |
| Lightbox | WP, EL, ST | Has | - |
| A title or tooltip | WP, BI, KB, SP | Missing | Not taken: a tooltip hides its words from touch and keyboard; the alt text and a caption say it |
| Size and aspect ratio | WP, EL, WS, BI, KB, ST | Has: the frame | - |
| Fit and focal point | WP, EL, BI, SP, ST, GB | Has: fill or the whole image, focus and zoom | - |
| Image sizes and `srcset` | WP, WS, BI, KB, SP | Missing | v0.8 responsive pictures |
| Lazy or eager loading | BI, KB, SP | Partial: always lazy | 0.7.0 (T44: the first picture of a page eager) |
| Filters | EL, KB, ST | Has: brightness, contrast and saturation | - |
| An overlay, or an effect on hover | EL, KB, SP, ST | Partial: the shared lift | v0.8 ER-B (an overlay colour and a zoom on hover, shown on focus too) |
| A mask or shape | KB, SP, ST | Partial: three corner choices | 0.7.9 (mask shapes on the image block) |
| Border and shadow | EL, KB, SP, ST | Missing | 0.7.9 (box styles on more blocks) |

### Gallery

Urd: the gallery block (ELEMENTS.md #50, #52 and #53).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The layout (grid, masonry, carousel, tiles) | KB, SP | Has: six views (grid, carousel, slideshow, ribbon, mosaic, polaroid) | - |
| Columns | WP, EL, KB, SP | Has: 1 to 6 on the grid views | - |
| Gap | EL, KB, SP | Partial: none on the carousel and the slideshow | v0.8 ER-D (the carousel's gap and tile ratio) |
| Captions | WP, EL, KB, SP | Partial: the polaroid prints the alt text; no caption field | v0.8 ER-B (a caption per picture in every view) |
| A link per image | WP, EL, KB, SP | Has, through the link editor (0.7.27) | - |
| A lightbox with captions, a counter or thumbnails | EL, KB, SP | Partial: arrows, Escape and the alt text | v0.8 ER-B (a counter, thumbnails, swipe and zoom) |
| Crop to one ratio | WP, KB | Partial: grid tiles keep each image's ratio, carousel tiles are 4:3 | v0.8 ER-D (the carousel's tile ratio) |
| Random order | WP, EL | Missing | Watch: a site that asks for a shuffled gallery |
| Image size | WP, EL, KB, SP | Missing | v0.8 responsive pictures |
| Lazy loading | EL, KB, SP | Has | - |
| Autoplay, speed, pause on hover and loop | EL, KB, SP, ST | Partial: the slideshow plays, holds on hover and focus, wraps and has a pause button; autoplay cannot be switched off | 0.7.11 (carousel semantics) |
| Arrows, dots and slides per view | EL, KB, SP, ST | Partial: arrows on both, dots on the slideshow, one slide per view | 0.7.11 (carousel semantics); v0.8 ER-D (dots on the carousel) |
| A slide or fade transition | EL, SP | Partial: fade only | v0.8 ER-D (a slide transition) |

### Video

Urd: the video block (ELEMENTS.md #55 and #57).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| A file or an embed | EL, WS, GJ, KB | Partial: a file, or a YouTube or Vimeo link | Other hosts: No item |
| Autoplay, loop, muted and controls | WP, EL, WS, GJ, BI, PL | Partial: loop, muted and «Start by itself» on a file, with the controls always shown; none on an embed | 0.7.24.1 (the embed's own options); v0.8 ER-B (a controls switch on a file) |
| A poster image | WP, EL, GJ, BI, KB, PL | Partial: on a file only | 0.7.24.1 (an own still on the facade) |
| Plays inline, and preload | WP, EL, WS, BI, PL | Partial: always inline, preload always metadata | Not taken: inline and metadata suit every site |
| Captions | WP, EL, WS | Missing | 0.7.11 (a captions file on a self-hosted video) |
| A privacy mode | EL, WS, KB | Has: youtube-nocookie, and do-not-track on Vimeo | - |
| Loading on a click, behind a preview image | EL, WS, BI | Missing | 0.7.24.1 (click-to-load frames) |
| Start and end time | EL, WS | Missing | 0.7.24.1 (embeds); v0.8 ER-B (a file) |
| Aspect ratio | EL, BI, KB | n/a: the frame is the size | - |
| Opening in a lightbox | EL, KB, ST | Missing | v0.8 ER-B (video in a lightbox) |
| A download button | EL, ST | Missing | Not taken: a link to the file does it (0.7.27.9) |
| An accessible name | KB, ST | Has: «Title (for screen readers)» | - |

### Map

Urd: the map block (ELEMENTS.md #282 to #285).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The place, by address or coordinates | EL, GJ, KB, SP, ST | Has: an address, coordinates or an OpenStreetMap link, with a search | - |
| Zoom | EL, GJ, KB, SP, ST | Has: 1 to 19 | - |
| Height | EL, KB, SP, ST | n/a: the frame is the size | - |
| The map type or style | EL, GJ, KB, SP, ST | Missing | v0.8 ER-G (OpenStreetMap's own layers); own styles: Watch: needs a map library |
| A marker, shown or with its own icon | KB, ST | Partial: one marker at the place | Own markers and several pins: Watch: needs a map library |
| The map's controls (zoom buttons, full screen, dragging) | KB, ST | Missing | Not taken: the OpenStreetMap embed sets its own controls |
| An API key or the embed mode | KB, ST | n/a: OpenStreetMap's own frame needs no key | - |

A directions link on the map block and a list of several places with map links are v0.8 ER-G.

### Form

Urd: the form block (ELEMENTS.md #171 to #199 and #325).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| Field types | WS, BI, KB, SP | Partial: eight types (text, email, phone, multi-line, dropdown, checkbox, radio, date) | v0.8 ER-E (number, URL, time, range and hidden fields) |
| Label, placeholder, required and a default value per field | WS, BI, KB, SP | Partial: label and required | v0.8 ER-E (placeholder, help text, default value, width) |
| Autocomplete tokens | KB, SP | Missing | 0.7.11 (with the form errors) |
| Own error messages | BI, KB | Missing | ER-E |
| A success message, or a redirect after sending | BI, KB, SP | Partial: a success text | v0.8 ER-E (a redirect after sending) |
| Sending to an email address | BI, KB, SP | Has: the mailto mode | - |
| Sending to an address of one's own | WS, BI | Has: a JSON endpoint | - |
| Spam protection | KB, SP | Partial: a honeypot | v0.9 (Turnstile with forms through the site's own function) |
| A consent checkbox with a link | KB, SP | Partial: a checkbox field, with no link in its label | 0.7.24.4 (a consent field with a link to the privacy page) |
| The submit button's text and style | BI, KB, SP | Partial: the text | 0.7.9 (component tokens, with the submit button's width and alignment) |

### Accordion

Urd: the FAQ block (ELEMENTS.md #102 to #104).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| One open at a time, or several | WP, EL, BI, KB, SP, ST | Has | - |
| The first item open, or all closed at the start | WP, EL, WS, KB, SP, ST | Missing | v0.8 ER-A |
| An icon: shown, chosen, and its side | WP, EL, KB, SP | Partial: a fixed chevron | v0.8 ER-A |
| The title's heading level | WP, EL, SP | Missing | v0.8 ER-A |
| FAQPage structured data | EL, KB, SP, ST | Missing | v0.8 baking (JSON-LD) |
| Items in columns | BI, KB, SP | Missing | Not taken: two FAQ blocks side by side do it |
| An open colour for the title and the icon | EL, SP | Missing | 0.7.9 box styles and block designs |

The answers are rich text; other blocks inside an item are in no item.

### Tabs

Urd has no tabs (ELEMENTS.md #105); v0.8 ER-A builds them on the APG tabs pattern with panels that find-in-page can open, vertical tabs included. What at least two projects offer: the orientation, horizontal or vertical (EL, WS, KB, SP, ST); the tab open at the start (WP, WS, BI, KB, SP, ST, PL); the alignment of the tab row (EL, BI, KB, SP, ST); an icon on a tab's label (EL, SP, ST); a style for the active tab (EL, BI, SP, ST); a phone fallback that scrolls the tab row or folds the tabs into an accordion (EL, BI, ST); and a minimum or equal tab height (KB, ST). Only Webstudio offers manual activation, where the arrow keys move focus and Enter opens. The tab open at the start, the icon and the phone fallback are in no item yet.

### Table

Urd: the table block (ELEMENTS.md #40).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| A caption | WP, KB | Missing | v0.8 ER-C (table options) |
| A header row | WP, KB | Has | - |
| Striped rows | WP, KB | Has | - |
| A fixed layout or column widths | WP, KB | Missing | v0.8 ER-C (table options) |

Only Gutenberg has a footer row, and only Kadence a first column as header, column alignment and a maximum height with scrolling; ER-C's table options take all three. Plasmic's rich table is a data grid (rows from data, row selection, density, export), a different element.

### Countdown

Urd: the countdown block (ELEMENTS.md #161).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The end date and time | KB, SP, ST | Has | - |
| A time zone | KB, ST | Missing: the visitor's own time | v0.8 ER-H (the site's time zone) |
| A repeating or evergreen timer | KB, ST | Missing | Not taken: false urgency |
| What happens at the end (a message, hiding, a redirect) | KB, SP, ST | Partial: a text at the end | Hiding: v0.8 ER-H (a date window); a redirect: Not taken (ELEMENTS.md #161) |
| The units shown | KB, SP, ST | Partial: the seconds can be hidden | ER-H |
| Own words for the units | KB, SP, ST | Missing: the site language's words | Not taken: the units follow the site's language |
| A separator between the units | KB, SP | Missing | 0.7.9 box styles and block designs |

### Icon

Urd: the icon block (ELEMENTS.md #67, #68 and #34).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| An icon from a library | WP, EL, KB, SP, ST | Has: 56 drawn icons, characters by category, or an own image | A search in the picker: 0.7.10 |
| Size and colour | EL, KB, SP, ST | Has: 8 to 400 px, a theme or custom colour | - |
| A hover colour | EL, KB, SP, ST | Missing | 0.7.9 box styles and block designs |
| A link, with a target | EL, KB, SP | Missing | v0.8 ER-G (any block as a link) |
| A background shape (circle, square, framed) | EL, KB, SP, ST | Missing | 0.7.9 (icon designs with a badge background) |
| Rotation or flip | WP, EL, SP, ST | Partial: the frame's rotation | Flip: No item |
| An accessible name, or decorative | KB, SP, ST | Partial: always decorative | v0.8 ER-G (an accessible name for an icon made a link) |

A list with an icon per item, stacked or inline, in columns and with dividers, is offered by EL, KB, SP and ST; Urd's lists have plain bullets, and v0.8 ER-D brings icon bullets with their colour, size, inline layout, columns and dividers. An icon box (an icon with a title and a text, the icon beside or above) is offered by EL and ST; Urd composes it from blocks in the feature-card presets.

### Testimonial or quote

Urd: the quote block (ELEMENTS.md #31, #32, #137 and #138).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The quote and who said it | WP, EL, KB, SP | Has: the quote and a name | - |
| A role or company | EL, KB, SP | Has: the role | - |
| A portrait and its position | EL, KB, SP | Partial: a round portrait in the card design | 0.7.9 box styles and block designs |
| A star rating | KB, SP | Missing | Not taken: low value |
| Alignment | WP, EL, SP | Missing | 0.7.9 (the quote's alignment, background and border) |
| A style variant | WP, SP | Has: «Large quote» and «Card with portrait» | - |
| Several quotes in a grid or a carousel, with autoplay | KB, SP | Missing | v0.8 ER-D (a carousel view, with a quote source) |

### Counter or stats

Urd: the stats block (ELEMENTS.md #115, #117 and #122).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The start and end number | EL, KB, SP | Partial: it always counts from 0 | v0.8 ER-C (a start number) |
| Prefix and suffix | EL, KB, SP, ST | Has | - |
| The duration | EL, KB, SP, ST | Missing: 1.2 s | v0.8 ER-C (a count-up duration) |
| A thousands separator and decimals | EL, KB, SP | Has: kept as typed | - |
| A title, its tag and its position | EL, KB, SP | Partial: a label under the number | Not taken: the label's place follows the design |
| An icon above the number, or a shape behind it | SP, ST | Missing | v0.8 ER-C (an icon above the figure) |
| A bar or circle | EL, KB, SP, ST | Missing | v0.8 ER-C (a progress bar and ring) |

### Timeline

Urd: the timeline block (ELEMENTS.md #123). Only Spectra and Stackable have a timeline.

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The line on one side, or alternating | SP, ST | Has: «Line on the left» and «Alternating sides» | - |
| An icon per item, and the dot's size and colour | SP, ST | Partial: a filled dot or a ring, in the accent colour | v0.8 ER-C (an icon or picture per event) |
| The line's colour and thickness | SP, ST | Partial: the colour | 0.7.9 box styles and block designs |
| The gap between items | SP, ST | Missing | 0.7.9 box styles and block designs |

Only Spectra formats a date per item and stacks the line on phones; Urd's year is free text, and the alternating design turns into one line on a narrow block.

### Social or share

Urd: the links block (ELEMENTS.md #142 and #143).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| A list of networks, each with its address | WP, EL, SP | Has: the site's links, registered once, and the block's own | - |
| Brand colours or own colours | WP, EL, SP | Partial: one colour for every icon | 0.7.9 (links designs with brand colours) |
| A background shape (square, rounded, circle, pill) | WP, EL, SP | Missing | 0.7.9 (the same) |
| Size and spacing | WP, EL, SP | Partial: size 24 to 64 px | 0.7.9 (the same) |
| Alignment and layout | EL, SP | Missing | 0.7.9 (the same) |

Sharing the current page (Spectra's social share) was removed from the links block in its version 2, since the share links led nowhere a visitor wants (ELEMENTS.md #143).

### Navigation or menu

Urd: the menu, set in the Nav panel (ELEMENTS.md #80 to #83).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| An item's label and link | WP, KB | Has: a page and a spot on it, a web address, email or phone | - |
| A new tab and rel per item | WP, KB | Has (0.7.27) | - |
| A description or title per item | WP, KB | Has: a one-line description, shown in the submenus and the mobile menus (0.7.13.21) | - |
| Submenus that open on hover or on a click | WP, WS, KB | Has: hover, hover closed by a click, or click only | - |
| More than one submenu level | WP, KB | Has: two levels, the second beside the panel or as a headed group in columns and the flyout (0.7.13.21) | - |
| A phone menu behind a button | WP, PL | Has: a panel below the bar or a full-screen sheet; the button's drawing and word chosen (0.7.13.21) | - |
| The current page marked | WS, KB | Missing | 0.7.11 (the current page marked) |
| The gap between items | KB, PL | Has: the item spacing | - |

Only Kadence offers a highlighted label on an item and a mega menu with media; only Gutenberg sets the overlay's colours and a limit on nesting.

### Header and footer

Urd: the menu and the footer, set once for the site (ELEMENTS.md #11 and #12). Only Kadence ships a header builder in the code read: rows with a layout, a background and a transparent version, a border, a minimum height, a maximum width, and the gap and vertical alignment of their items, with sections and columns placed in them. Gutenberg keeps a header or a footer as a template part with an area and a tag. No setting beyond the shared part itself reaches two projects.

Urd has the menu in six variants, pinned with a shrink or hidden while scrolling down, clear at the top over the first section, with phone overrides, a background stack and tools (the basket, the site's links, the theme button, the launcher); and the footer from ten templates, with link columns, a link row, a bottom line, the legal line, the site's links, a call to action or a newsletter field and a background, hidden per page. A button-styled menu item and the menu kept off chosen pages, hidden or reached by the pointer at the top edge, a ghost there or a pull tab, came with 0.7.13.21. Missing: search in the menu (v0.8 site search, to be weighed); a language switcher (After v1.0: multilingual content); and free content in the footer (After v1.0: synced global blocks, a synced section as the footer).

### Container or section

Urd: the section (ELEMENTS.md #1 and #2).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The HTML tag | WP, EL, WS, KB, SP, GB | Partial: always a section | Watch: a page that needs an aside or an article landmark |
| The content width, boxed or full | EL, BI, KB, SP, ST | Partial: the site's content width; a section's own is stored but has no control | 0.7.10 (a content-width control per section) |
| A minimum height, or the screen's height | WP, EL, KB, SP | Has: any CSS length, and dragged edges | - |
| A flex or grid layout with gaps | EL, PK, KB, SP, GB | n/a: free placement; «Change layout» offers six layouts | - |
| Vertical alignment of the content | WP, EL, KB | n/a: free placement | - |
| A background image, video, gradient and overlay | WP, EL, KB, SP | Has: eight layer types | - |
| A parallax or fixed background | WP, SP | Has: on the image and video layers | - |
| Shape dividers at the top and bottom | EL, KB, SP | Has: five shapes with height, colour, mirror and invert | 0.7.9 (more shapes, and a divider over the content) |
| A link on the whole container | EL, KB, SP | Missing | v0.8 ER-G (a section or a group of blocks as one link) |
| Text and link colours inside | KB, SP | Has: eight section themes | - |

A section carries a name beside its stable id (0.7.27); hiding a section is v0.8 AR-5.

### Columns

Urd has no columns element (ELEMENTS.md #3: n/a): blocks are placed freely on the section's grid, and the phone's row grid stacks them ([ADR-0019](../adr/0019-synced-mobile-model.md)). What the projects offer, and what covers it in Urd: the number of columns and a layout preset (WP, EL, BI, KB, SP, ST), «Change layout» with «Two columns» and the split layouts; a width per column (WP, EL, BI, KB, SP, ST), the dragged «Width %»; the gap (EL, BI, KB, SP, ST), the placement itself; stacking on phones and its order (WP, BI, KB, SP, ST), the row grid and the phone order; vertical alignment (WP, EL, KB, SP), aligning a multi-selection; and a link per column (BI, KB), v0.8 ER-G (a group of blocks as one link).

### Spacer or divider

Urd: the line shape and the chapter divider (ELEMENTS.md #6 and #7).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| A spacer's height | WP, EL, PK, KB, ST | n/a: free placement | - |
| The line style (solid, dashed, dotted, double) | WP, EL, KB, SP | Partial: solid | 0.7.9 (line styles for the line shape) |
| Width, thickness and colour | EL, KB, SP, ST | Partial: four theme colours | 0.7.9 (an own colour) |
| A text or an icon in the line | EL, SP | Partial: a text label | 0.7.9 (an icon in the line) |
| Alignment | EL, KB, SP | n/a: placed freely | - |

### Contact

Urd: the contact details block (ELEMENTS.md #286 and #160). No project read has a contact-details element. The nearest are Elementor's contact buttons, a floating bar whose buttons each pick a platform (phone, email with a subject and a message, WhatsApp, Messenger, SMS, Viber, Waze and more), and the person cards of Spectra and Stackable (a name, a role, a picture and its position, and links to social profiles); Kadence's identity block is the site's logo and title. The one setting two projects share is the person card with social links (SP, ST).

Urd has the contact details block in eleven designs, read from the site's contact settings (address, phone, email, the legal line, a map, a QR code, a vCard, a call bar on phones, directions), and the team preset for people (portrait, name, role and email as text). Missing: social links per person (v0.8 AR-4, the people kind); WhatsApp and SMS in the call bar (v0.8 ER-G); opening hours (v0.8 ER-C); several places (v0.8 ER-G).

### Table of contents

Urd has no table of contents yet (ELEMENTS.md #85 and #87); 0.7.13.16 builds a page index block that lists the page's sections as links, with headings as entries, a sticky placement and the entry in view marked, and the names of 0.7.27 give it stable targets. What at least two projects offer: the heading levels it lists (WP, KB, SP, ST); a numbered or bulleted list (WP, KB, SP, ST); a title (KB, SP, ST); folding, closed at the start (KB, SP); smooth scrolling with an offset (KB, SP, ST); and columns (KB, SP, ST). Urd has the scrolling for every link to a spot: it lands under the menu, smoothly only without reduced motion (0.7.27.1). The list style, the title, folding and columns are in no item. Of the projects read, only Kadence marks the entry in view.

### Menu anchor

Only Elementor has an anchor element, Menu Anchor, with one setting: the id. Its v4 elements and every other project carry the anchor on the element itself (see [What every element can carry](#what-every-element-can-carry)). Urd puts a name on any section or block beside its stable id (0.7.27), so it needs no anchor element (ELEMENTS.md #84).

### Posts or collection

Urd: the collection block (ELEMENTS.md #14, #88, #252 and #254).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The number of items | WP, KB, SP, ST | Has | - |
| The order and what it sorts by | WP, KB, SP, ST | Partial: newest or oldest by date | v0.8 AR-3 (a sort order) |
| A filter by category or tag | WP, KB, SP, ST | Missing | v0.8 AR-3 (collection filters) |
| An offset | KB, SP, ST | Missing | v0.8 AR-3 |
| Columns | KB, SP, ST | Missing: the cards fill the width | v0.8 ER-D (columns per view) |
| Showing or hiding the parts (image, date, author, excerpt, read more) | WP, KB, SP, ST | Missing | v0.8 ER-D (the parts shown per view) |
| The excerpt's length | WP, KB, SP, ST | Missing | ER-D |
| A read-more link | KB, SP, ST | Missing: the title is the link | v0.8 ER-D (the entry's link as a button) |
| The image's size, ratio and position | WP, KB, SP | Partial: an image shape per collection | ER-D; 0.7.9 component tokens (the image ratio) |
| Pagination | WP, SP, GB | Missing | v0.8 ER-D (load more and pagination) |
| An item template built from elements | WP, WS, GJ, GB, PL | Missing: three fixed views | v0.8 entry pages (a card bound to the entry's fields) |

### Product and cart

In the code read, commerce lives outside these projects: the WooCommerce and SureCart blocks were not read. Spectra's SureCart product and checkout blocks carry only the shared WordPress supports, and Stackable's pricing box and price are containers of ordinary blocks, so no product or cart setting reaches two projects.

Urd has product cards over a products collection (columns, a maximum count, a quick view, a badge, a picture on hover, size and colour choices; ELEMENTS.md #206), the basket as a button or an icon with a drawer (#228 to #230), and the checkout block (#232) with its payment settings: Vipps, a card at Vipps or Stripe, PayPal, when Stripe takes the money, and payment instructions with a name and a text (0.7.28). The shop of v1.1 ([ADR-0027](../adr/0027-a-shop-without-a-database.md)) adds variants with their own price, published stock, shipping tables, discount codes and MVA (v1.1 SHOP-2 to SHOP-6).

## Sources

The repositories as read on 21 October 2026, each a shallow clone of the default branch at the commit named, read without running anything. The one-record-per-setting extracts and the extraction scripts were kept outside the repository.

- **[Gutenberg](https://github.com/WordPress/gutenberg/tree/168e4f4) (code), 168e4f4.** Each block's `packages/block-library/src/*/block.json` was read for its attributes and its `supports`, with WordPress's defaults applied where a block leaves a support out (an extra class name, custom CSS, lock, renaming and the per-viewport visibility are on unless a block turns them off, in `packages/block-editor/src/hooks/`). The settings every child of a flex or grid parent takes came from `packages/block-editor/src/hooks/layout-child.tsx`, and the anchor field from `hooks/anchor.tsx`.
- **[Elementor](https://github.com/elementor/elementor/tree/b4ca769) (code), b4ca769.** The `register_controls()` calls in `includes/widgets/`, `includes/elements/` and the modules were parsed as PHP literals, with each control's tab, section, type, options and whether it varies per device. The Advanced tab every element shares came from `includes/widgets/common-base.php` and `includes/base/element-base.php`, the group controls (background, border, typography, flex and grid) from `includes/controls/groups/`, and the v4 atomic elements' style schema from `modules/atomic-widgets/styles/style-schema.php`. Controls marked as Pro promotions were kept and named as such; the Navigator's rename was read in `assets/dev/js/editor/regions/navigator/element.js`.
- **[Webstudio](https://github.com/webstudio-is/webstudio/tree/dabaeed) (code), dabaeed.** The `*.ws.ts` metas in `packages/sdk-components-react`, `-react-radix` and `-animation` were read for each component's props, the attributes every instance takes from `packages/html-data/src/__generated__/`, and the style panel's properties from `apps/builder/app/builder/features/style-panel/sections/`. The instance label that names a layer is in `packages/sdk/src/schema/instances.ts`.
- **[GrapesJS](https://github.com/GrapesJS/grapesjs/tree/f47fbde) (code), f47fbde.** The component types' default traits were read from `packages/core/src/dom_components/model/`, the style manager's sectors from `style_manager/config/config.ts` and its built-in properties from `style_manager/model/PropertyFactory.ts`, and the per-device styling from the selector and device managers. The layer manager's rename and lock (`navigator/`) and the symbols (`dom_components/model/SymbolUtils.ts`) were checked in the code.
- **[Puck](https://github.com/puckeditor/puck/tree/1839d14) (code), 1839d14.** The field types and their options were read from `packages/core/types/Fields.ts`, the component config and its permissions from `types/Config.tsx`, the rich-text extensions from `components/RichTextEditor/extension.ts`, and the demo app's components from `apps/demo/config/blocks/`.
- **[Builder.io](https://github.com/BuilderIO/builder/tree/c4497e9) (code), c4497e9.** The inputs of each built-in block were read from the Gen 2 SDK's `packages/sdks/src/blocks/*/component-info.ts` and the Gen 1 React blocks in `packages/react/src/blocks/`, and the fields every block carries from `packages/sdks/src/types/builder-block.ts`. The visual editor is closed source, so its panels were not read.
- **[Plasmic](https://github.com/plasmicapp/plasmic/tree/3254a11) (code), 3254a11.** The `CodeComponentMeta` literals of the first-party packages in `plasmicpkgs/` (basic components, rich components, nav, tabs, link preview, embed CSS) were read for their props. The built-in elements and the style panel live in `platform/wab` as a model, not a registry, and the wrappers of third-party libraries were left out.
- **[Kadence Blocks](https://github.com/stellarwp/kadence-blocks/tree/a30a69b) (code), a30a69b.** Each block's `block.json` under `src/blocks/` and `includes/blocks/` was read for its attributes and supports, with the device variants of an attribute counted as one; the edit panels in `edit.js` were not parsed, so the labels are the attribute names made readable.
- **[Spectra](https://github.com/brainstormforce/wp-spectra/tree/ea0852c) (code), ea0852c.** Each block's `src/blocks/*/block.js` (`registerBlockType`, its title and supports) and the `attributes.js` beside it were read, with spreads and imports resolved; the extension every block gets (display conditions, per-device hiding, position, z-index and animation) came from `src/blocks/extensions/`. The six post blocks without an `attributes.js` were left out.
- **[Stackable](https://github.com/gambitph/Stackable/tree/d207f37) (code), d207f37.** Each block's name came from its `block.json`, its supports from `src/block/*/index.js`, and its attributes from `src/block/*/schema.js`, expanded through the attribute templates of `src/block-components/`; the separator and link composers could not be resolved.
- **[GenerateBlocks](https://wordpress.org/plugins/generateblocks/) (code), 2.5.0.** The git clone failed, so the wordpress.org build of 2.5.0 was read: the version 2 blocks' `dist/blocks/*/block.json` attributes and supports, and the version 1 blocks' `defaults()` in `includes/blocks/`. The version 2 style controls live in the built bundle and were not parsed.
- **[Silex](https://github.com/silexlabs/Silex/tree/1fe592f) (code), 1fe592f, and [Onlook](https://github.com/onlook-dev/onlook/tree/423e2e9) (code), 423e2e9.** Read for a registry and found without one: Silex registers a container block, a few traits (`editor/grapesjs/img.ts`, `li.ts`, `semantic.ts`) and style sectors on top of GrapesJS, and Onlook edits React and Tailwind code with generic style controls.
- **Popularity:** GitHub's repository counts and wordpress.org's plugin pages, both read on 21 October 2026 ([Gutenberg](https://wordpress.org/plugins/gutenberg/), [Elementor](https://wordpress.org/plugins/elementor/), [Kadence Blocks](https://wordpress.org/plugins/kadence-blocks/), [Spectra](https://wordpress.org/plugins/ultimate-addons-for-gutenberg/), [GenerateBlocks](https://wordpress.org/plugins/generateblocks/), [Stackable](https://wordpress.org/plugins/stackable-ultimate-gutenberg-blocks/)) (primary).
