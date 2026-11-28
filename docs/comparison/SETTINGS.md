# Settings: what each element offers, read from source

This file answers what an element can be set to: the settings each kind of element offers in eleven open-source builders and block libraries, read in their source code, and where Urd stands on each. Which elements exist across the field is in [ELEMENTS.md](ELEMENTS.md) part 2, whose row numbers the sections below cite; whether Urd has a feature at all is in [FEATURES.md](FEATURES.md), and how the editors are built is in [CODE.md](CODE.md). What a link and an anchor can be in the same projects, and the rules drawn from it, is the survey of 21 October 2026 in [SURVEYS.md](SURVEYS.md#what-a-link-can-point-to-and-what-every-element-carries-21-october-2026). The source marks are explained in [README.md](README.md).

**What was read.** On 21 October 2026 the settings registries of eleven projects were read from shallow clones of their default branches (GenerateBlocks from its wordpress.org build), and nothing was run: the `block.json` attributes and supports of Gutenberg, Kadence Blocks, Spectra, Stackable and GenerateBlocks, the `register_controls()` calls of Elementor's widgets, Webstudio's component metas, GrapesJS's traits and style-manager sectors, Puck's field types, Builder.io's inputs and Plasmic's code-component metas. Each setting was extracted as one record with its element, label, type, options, default, group and source path. Silex and Onlook were read too, but have no settings registry: Silex adds a few traits to GrapesJS, and Onlook edits React and Tailwind code directly. From 28 November 2026 the file also takes the options two builders' help centres document, SQ and SH, from their records of 19 October 2026 (primary), and the settings seen in the editors walked through that day (walked through): WP 7.1.5, EL 4.4.2 (the classic widgets), KB 3.9.2, SP 2.20.7, ST 3.20.3, GB 2.5.1, the GrapesJS demo 0.22.2 and the Puck demo.

**Limits.**
- **Labels:** where the editor panels were not parsed (Kadence, Spectra, Stackable and GenerateBlocks keep them in edit files and built bundles), a label is the attribute name made readable, and the device variants of a setting count as one.
- **Plasmic:** its built-in elements (frame, text, image, link) and its style panel are an internal model, not a registry, so only its first-party code components were read; its column says «n/r» where the built-ins would answer.
- **GenerateBlocks:** the version 2 blocks keep every style in one `styles` attribute whose controls live in the built bundle, so their style settings count as one each.
- **Stackable:** a few attribute composers were not resolved (separators, links), so its link settings are under-counted.
- **Counts:** the numbers come from the extracted records and are indicative; a setting missing from the records does not prove that a project lacks it. Rename, lock and reuse, which Elementor, Webstudio and GrapesJS keep in the editor rather than in the registry, were checked in their code.
- **Values:** each section ends with a «Values» paragraph: the options the projects offer for its main settings, the defaults they ship from the lowest to the highest, and which projects vary a setting per device, read from the records. No extractor captured a minimum, a maximum or a step, so no paragraph gives the range a value can take, and a project that keeps its options in code the records did not reach is named as such.

**Urd's side** was counted from the engine (`template/assets/engine/0.7.7/`) and the editor at commit 979e866 on 21 and 22 October 2026, with the deliveries since then read at commit cac90f9: 0.7.27 (a name on any section or block beside a stable id on every block; one link editor with a page and a spot on it, a web address with nofollow and sponsored, email, phone and a file; a new tab and a download; the link field for plugins) and 0.7.0.61 (the section's Properties in groups). On 28 November 2026 the Urd cells were checked again against engine 0.7.12 (`template/assets/engine/0.7.12/`), the editor and CHANGELOG.

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
| Visibility per device | Some (103/116) | All | All (style) | All (style) | None | All (style) | n/r | All | All | All | Some (9/14) | All blocks, hidden on phones or shown only there |
| Spacing (margin, padding) | Some (95/116) | All | All | All | Some (demo) | All (style) | n/r | Some (33/62) | Some (42/67) | All | Some (v2 styles) | Some: a section's space as the pill on its seam, the nav bar's four padding steps |
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
| Custom HTML attributes | None | Some (every v4 element; Pro elsewhere) | All | None | None | All | n/r | None | None | All | Some (8/14) | None |
| Display conditions (signed in, role, date) | None | None (Pro) | All (Show, bound to data) | None | None | All (bindings) | Some (1/21) | Some (2/62) | All | All | None | None |
| A transform (rotate, scale, skew, flip) | None | All | All | All | None | All (style) | n/r | None | None | All | Some (v2 styles) | All blocks: rotation and «Size» |
| Filters and blend modes | Some (9/116, duotone) | Some (8/53; every v4 element) | All | None | None | All (style) | n/r | Some (4/62) | Some (1/67) | All (blend) | Some (v2 styles) | Some (pictures) |
| Opacity of the whole element | Some (1/116) | Some (every v4 element) | All (any property) | All | None | All (style) | n/r | None | None | All | Some (v2 styles) | None |
| Hover and state styles, with a transition | Some (7.1 button) | All | All | All | None | All (hover animations) | n/r | Some (20/62) | Some (36/67) | All | Some (v2 styles) | All blocks («Lift on pointer») |
| Overflow | None | Some (2/53; every v4 element) | All | All | None | All (style) | n/r | Some (2/62) | Some (1/67) | All | Some (v2 styles) | n/a |
| A mask | None | All | All (any property) | None | None | All (style) | n/r | Some (2/62) | Some (1/67) | None | None | None |
| A saved style or preset reused on other blocks | Some (8/116, and a theme's styles) | Some (v4 classes) | All (tokens) | All (classes) | None | None | n/r | All (presets) | All (Global Block Styles) | All (Block Style) | None (Pro) | None |
| Values per device | Some (7.1 styles) | All (some controls) | All (style) | All (style) | None | All (style) | n/r | Some (37/62) | Some (50/67) | All (some controls) | Some (v2 styles) | All blocks: placement, height, «Size», order, hiding, words |

**Values.** The records hold few option lists for the shared settings and no ranges. Visibility is all, mobile, tablet or desktop in WP, a switch per breakpoint in EL, and desktop, tablet and mobile in ST. Position is default, absolute or fixed in EL's Advanced tab and static, relative, absolute, fixed or sticky in its v4 style, static by default in GJ; SP sticks to the top with an offset of 0. An entrance is slow, normal or fast with a delay in ms in EL, 400 ms with no delay and ease in SP, and a page load, a scroll into view or a hover in BI. A lock is move, remove or edit in WP. Display conditions are sign-in, role, browser, system and weekday in SP, and sign-in and role on KB's row. Overflow is visible, hidden or auto in EL v4, with scroll in GJ, visible by default; GJ's opacity starts at 1, its transition at 2 s on the width with ease (linear, ease, ease-in, ease-out or ease-in-out), and its states are hover, active and every second element. EL's mask is fit (the default), fill or custom, in nine positions or a custom one (the centre by default), with six repeats from none, its shapes listed in code; its v4 blend modes are sixteen. Saved looks: WP's block styles are fill or outline on the button, default, wide or dots on the separator, default, logos only or pill on the social links, and default or rounded on the image; KB's button presets are Default, Outline, Theme Base and Theme Outline (walked through). Per device: EL, KB, SP and ST on the controls that carry a device mark, never the colour (walked through); GB through a scope of all screens, tablet and mobile, or mobile, written as a media query (walked through); WS (Base, 991, 767 and 479), GJ (desktop, tablet, mobile landscape and mobile portrait) and BI (large, medium, small and extra small) any style per breakpoint; WP 7.1 typography, background, dimensions and border; PK none. Kadence, Spectra, Stackable and GenerateBlocks keep their option lists in edit code the records did not reach.

The WordPress libraries and Elementor give an element its cross-cutting settings through one shared mechanism (block supports, the Advanced tab, Spectra's extension, Stackable's block components), so a new block gets them all at once, while Webstudio, GrapesJS and Builder.io reach the same breadth through one style panel over any CSS property per breakpoint. Puck and Plasmic leave styling to the developer's components, which is why their columns are thin. The rows from custom HTML attributes on were added from the same records on 28 November 2026; Kadence's presets, Spectra's Global Block Styles, WordPress 7.1's responsive styles and button state, and GenerateBlocks' hover selector and device scope were seen in the editors walked through that day (walked through). Urd carries an anchor, motion with «Lift on pointer», rotation and «Size», the layer order, pinning, and its own placement, height, size, order, hiding and words on the phone on every block, but no class, custom CSS, attributes, lock, layer name, opacity or saved style, and its border, shadow, background and filters reach only some blocks; a block needs no margin, since blocks are placed freely, and a section's space is the pill on its seam.

**Where Urd's gaps go:**
- **A CSS class:** Not taken: the class-based cascade is not adopted (FEATURES.md «Custom classes»).
- **Custom CSS:** v0.8 OL-4, a scoped style per look; site-wide custom CSS stays not taken.
- **Lock and rename:** 0.7.42, the layers panel, with a name per block and a lock field.
- **Visibility:** elements shown only on the phone (Delivered 0.7.3.8); hiding on a tablet Not taken: Urd has two layouts ([ADR-0019](../adr/0019-synced-mobile-model.md)); a hidden section, and a hidden block beside it, in v0.8 AR-5.
- **Pinning on the phone:** as a choice per block in the row grid, with the desktop's release (Delivered 0.7.3.10).
- **Border, shadow and background on more blocks:** v0.8 ER-I, the box styles of the design gallery, and v0.8 DS-3, the component tokens.
- **Typography:** a font weight in v0.8 FO-4, and letter case with the text styles in v0.8 DS-2.
- **A link on the whole element:** v0.8 ER-G, any block or group of blocks as a link.
- **Reuse:** templates are copies; synced reuse is After v1.0: synced global blocks.
- **Spacing:** a block's margin n/a: free placement ([ADR-0001](../adr/0001-hybrid-editor-model.md), [ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md)); padding inside a section or a box, as named steps with linked sides drawn on the canvas while they are set: 0.7.10 design round (ELEMENTS.md E51).
- **Custom HTML attributes:** Not taken: no CSS in the content (FEATURES.md «Custom attributes»).
- **Display conditions:** a date window on a block (show from, show until) in v0.8 ER-H; by sign-in or role Not taken: server, as for member accounts (FEATURES.md «Member accounts (sign-up and login)»).
- **A transform:** rotation, and «Size» from 0.4 to 2 (0.7.21.5), on every block; skew, flip, perspective and 3D Not taken: low value (FEATURES.md «Transforms 2D and 3D»).
- **Filters and blend modes:** on pictures, four filters and twelve looks with a duotone (0.7.29.1-3) and sixteen blend modes (0.7.9.4); on other blocks through a scoped style, v0.8 OL-4.
- **Opacity:** 0.7.42, the layers panel, with an opacity per block.
- **Hover and state styles:** «Lift on pointer» on any block or section, the button's own fill under the pointer (0.7.0.84) and the menu's hover styles; focus, pressed and visited styles in 0.7.40; scale beside lift, and a motion intensity, in v0.8 DS-5; a hover kept in a style's state slot in v0.8 OL-4.
- **Overflow:** n/a: a block grows with its content, so nothing overflows it ([ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md)).
- **A mask:** mask shapes on the image block in v0.8 BE-2, and a text mask in v0.8 ER-B; the «Image gallery» background already cuts its pictures to one of fifteen shapes, and the «Back to top» button takes a shape ([ADR-0035](../adr/0035-shapes.md)).
- **A saved style:** Copy style and Paste style carry a look from one block to another (0.7.20.8); a block's style as the site default in v0.8 DS-4, and named styles that another block can pick in v0.8 OL-4.
- **Values per device:** the phone's own placement, height, «Size», order, hiding and words on every block ([ADR-0019](../adr/0019-synced-mobile-model.md), [ADR-0033](../adr/0033-words-of-its-own-on-the-phone.md)), with the nav bar's and a section's own values on the phone; other styles per screen Not taken ([ADR-0019](../adr/0019-synced-mobile-model.md)); a mark on what holds a value of the phone's own: 0.7.10 design round (ELEMENTS.md E52).

## Per element

One section per element kind that Urd has a counterpart for, in the order of the extraction's index. Each lists the settings that at least two projects offer, the projects that offer them, and Urd's status with its backlog place. A setting only one project offers is left out unless the text names it.

### Heading

Urd: the heading levels of the text block (ELEMENTS.md #22).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| Heading level or tag, H1 to H6 | WP, EL, WS, PK, KB, SP, ST, GB, SQ, SH | Has: a paragraph and H1 to H6 in the text toolbar (0.7.9.5) | - |
| Alignment | WP, EL, PK, KB, SP, ST, GB | Has | - |
| Size presets | WP, EL, PK, SH | Partial: «Size» on the block, with a size of the phone's own (0.7.36.2), «Size for the whole text» and a px size per selection; no named steps | v0.8 DS-2 (text styles, a size from the type scale) |
| Link colour, and its colour on hover | WP, EL, KB, SP, GB | Missing | v0.8 DS-2 (link styles in text, hover) |
| A link on the whole heading, with new tab, nofollow and sponsored | EL, KB | Partial: links on words, through the link editor | v0.8 ER-G (any block as a link) |
| Text shadow | WP, EL, KB, SP, ST | Missing | v0.8 DS-2 (text shadow) |
| Gradient text | KB, SP, ST | Missing | v0.8 BE-4 (a gradient fill on a heading's text) |
| A highlighted part in its own colour | KB, SP, GB | Has: highlight in the accent or a custom colour | - |
| An icon beside the heading | KB, GB | Missing | Not taken: an icon block placed beside the heading does it |
| A line above or below | SP, ST | Partial: a line block placed above or below | Not taken: as a setting of the heading; a line block does it |
| A named style apart from the level (Display, Subtitle, Annotation) | WP | Missing | v0.8 DS-2 (text styles picked as a look apart from the heading level) |
| A text stroke (outline) | EL, SQ | Missing | v0.8 BE-6 (a text stroke on the text block) |

**Values.** The level runs h1 to h6 everywhere, with h2 as the default in WP, EL, KB, SP and GB; EL adds div, span and p, SQ offers H1 to H4, and KB and SP keep an HTML tag or a wrapper apart from the level (KB «heading», SP a div). The named sizes are EL's default, small, medium, large, XL and XXL (default «default»), PK's XXXL to XS (default M) and WP's S, M, L, XL and XXL from the theme (walked through), and WP 7.1 gives a heading the styles Default, Display, Subtitle and Annotation (walked through). Alignment is start, centre, end or justify in EL and left, centre or right in PK (default left). The highlight starts at #f76a0c in KB and white on #007cba in SP; SP's line under the heading starts 12 % wide, 2 px thick and #0170b9, and ST draws a line above and one below. SP adds a description under the heading (below it by default), and EL alone blends the heading's text with one of 16 modes. Per device: the alignment and the size in EL, KB, SP, ST and GB; the colour only through GB's scope switch and WP 7.1's «Responsive styles», never in EL, KB, SP or ST (walked through).

### Text

Urd: the text block (ELEMENTS.md #23 and #24).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| Bold, italic, underline, strike and links in the text | WP, EL, WS, GJ, PK, SQ, SH | Has, with superscript, subscript, lists and a quote | - |
| The tag (p, span, div) | EL, WS, ST, GB | Partial: paragraph, H1 to H6 (0.7.9.5), lists and quote; no span or div | Not taken: span and div |
| Alignment | WP, EL, PK, SQ, SH | Has, justify included | - |
| Text and link colour | WP, EL, PK, SQ, SH | Partial: a text colour and a highlight per selection; no link colour | v0.8 DS-2 (link styles) |
| Drop cap | WP, EL | Missing | v0.8 DS-2 (a drop cap behind a gate) |
| Columns with a gap | EL, ST | Has: two to four columns with a gap on a plain text, fewer where the box is narrow (0.7.9.5) | - |
| Bulleted and numbered lists | WP, WS, SQ, SH | Has: both in the text toolbar, with indent | - |
| Size presets | WP, PK, SQ | Partial: «Size» on the block, «Size for the whole text» and a px size per selection; no named steps | v0.8 DS-2 (text styles, a size from the type scale) |
| Text direction, left to right or right to left | WP, WS | Missing | After v1.0: multilingual content (right-to-left, `dir` per block) |

**Values.** EL's text takes 1 to 10 columns with a gap, both per device, where Urd's plain text takes two to four (0.7.9.5). The tag is p or span on EL's v4 paragraph, and GB's text takes p, span, div, h1 to h6, a, button, figcaption or li. PK's text has the sizes S and M (default M) and the colours Default and Muted, and SQ sets Paragraph 1 to 3 beside H1 to H4. WP alone gives a numbered list a start number, a reversed order and a numbering type (Urd's sanitiser keeps `start`, `reversed` and `type`, with no control for them) and a paragraph the direction ltr or rtl. EL's drop cap has the views default, stacked and framed, a size of 5 and a space of 10, and SQ's highlight tool has 11 hand-drawn styles with a draw or fade animation (ELEMENTS.md #26). Per device: EL's alignment, columns, gap and paragraph spacing.

### Button

Urd: the button block (ELEMENTS.md #153, #154 and #155).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| A link, and a new tab | WP, EL, WS, GJ, PK, BI, KB, SP, GB, SQ, SH | Has (0.7.27) | - |
| nofollow and sponsored | WP, KB, SP, GB | Has, for a web address (0.7.27) | - |
| Download | WS, KB | Has, for a file (0.7.27.9) | - |
| A style variant (filled, outline, ghost, plain or a text link) | WP, EL, PK, KB, SP, ST, SQ | Partial: «Filled (accent colour)» and «Outline», each in colours of the owner's own (0.7.0.84); no pill, ghost, plain or text-link look | v0.8 DS-3 (component tokens: pill and ghost looks beside the text-link style) |
| Size presets | EL, KB, SP, SQ | Partial: the dragged frame and «Size» | v0.8 DS-3 (size presets for the button) |
| An icon before or after the label, or an icon alone | EL, KB, SP, ST, GB | Missing | v0.8 ER-G (an icon in the button block) |
| Hover colours or an effect | EL, KB, SP, ST, GB | Partial: the shared lift and an own fill under the pointer (0.7.0.84); no colour of its own for the words or the outline under the pointer | v0.8 DS-3 (component tokens); 0.7.40 (focus and pressed styles) |
| A gradient background | WP, KB, SP, GB | Missing | v0.8 BE-4 (gradient fills) |
| Border, radius and shadow | WP, EL, KB, SP, ST, SQ | Partial: the theme's small corners and an own outline colour (0.7.0.84); no radius, border width or shadow of its own | v0.8 DS-3 (component tokens: radius, border width); v0.8 ER-I (box styles: a shadow) |
| Width or full width | WP, KB, ST, GB, SQ | Has: the dragged width | - |
| An accessible name apart from the label | WS, KB, GB | Missing | v0.8 ER-G (an accessible name in the link editor) |
| An id for the button | EL, ST | Has: a name and a stable id (0.7.27) | - |
| A title or tooltip | WP, KB | Missing | Not taken: a tooltip hides its words from touch and keyboard, so the label says it |
| A group: alignment, gap and stacking on phones | WP, EL, KB, SP, ST, GB, SQ | n/a: buttons are placed freely, aligned and distributed on a multi-selection, and stacked by the phone's row grid | - |
| A link, or a button for an action | WP, EL, KB | Partial: the button block is always a link; the form's send button and the basket are buttons | v0.8 ER-A (a popup opened by a click, through invoker commands) |
| A link that opens in a lightbox | KB, ST | Missing | v0.8 ER-B (video in a lightbox) |

**Values.** The looks are WP's Fill and Outline (default Fill), EL's Type Default, Info, Success, Warning and Danger, PK's primary and secondary (default primary), KB's presets Default, Outline, Theme Base and Theme Outline, SP's eight unnamed picture presets over a primary or secondary type, ST's Default, Ghost, Plain and Link (the KB, SP and ST looks walked through), and SQ's Primary, Secondary and Tertiary, each with a shape (square, rounded, pill or custom), an outline thickness and a padding of S, M, L or custom; GB's free version 2 button has none (walked through), its legacy version 1 button a variant role. EL's sizes are built in code the records did not reach (default sm), KB's size preset starts at standard and SP's size at default. ST's hover effect starts at Darken, with Lift and Scale beside it (walked through), and EL picks a hover animation. The element is a or button in WP (default a), button on EL's v4 button, and a link with a button role as a switch in KB. The icon stands after the label in SP and on the right in KB by default. Per device: EL (alignment, border, radius), KB (width, gap, radius), SP (size, gap, alignment), ST (width, minimum height, radius) and GB (alignment, stacking, filling the width).

### Image

Urd: the image block (ELEMENTS.md #48, #69 and #72).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| Alt text | WP, WS, GJ, BI, KB, SP, ST, SQ, SH | Has | - |
| Decorative, with an empty alt | WP, ST | Missing | 0.7.40 (a «decorative» toggle on images) |
| Caption | WP, EL, KB, SP, ST, SQ | Missing | v0.8 ER-B (a plain caption beside the caption overlay) |
| A link with target and rel | WP, EL, KB, SP, GB, SQ, SH | Has (0.7.27) | - |
| Lightbox | WP, EL, ST, SQ | Has | - |
| A title or tooltip | WP, BI, KB, SP | Missing | Not taken: a tooltip hides its words from touch and keyboard; the alt text and a caption say it |
| Size and aspect ratio | WP, EL, WS, BI, KB, SP, ST, GB, SQ | Has: the frame, or a shape the height follows (free, the picture's own, 1:1, 4:3, 3:2, 16:9, 9:16 and 4:5; Delivered 0.7.29.1-3) | - |
| Fit and focal point | WP, EL, BI, KB, SP, ST, GB, SQ, SH | Has: fill or the whole image, the frame dragged over the picture and zoom | - |
| Image sizes and `srcset` | WP, WS, BI, KB, SP, ST, GB | Missing | v0.8 responsive pictures |
| Lazy or eager loading | BI, KB, SP | Partial: by place, the first image block of a page's first section eager and every other lazy (0.7.37.3.2), with no setting of the owner's | - (T44 delivered 0.7.37.3.2; an owner's own setting is in no milestone) |
| Filters | WP, EL, KB, ST, SQ | Has: brightness, contrast, saturation and blur, and twelve looks with a two-colour duotone (Delivered 0.7.29.1-3) | - |
| An overlay, or an effect on hover | EL, KB, SP, ST | Partial: an overlay colour with its strength (Delivered 0.7.29.1-3) and the shared lift; no overlay or zoom on hover | v0.8 ER-B (an overlay colour and a zoom on hover, shown on focus too) |
| A mask or shape, or rounded corners | WP, KB, SP, ST, SQ | Partial: three corner choices | v0.8 BE-2 (mask shapes on the image block) |
| Border and shadow | EL, KB, SP, ST, SH | Missing | v0.8 ER-I (box styles on more blocks) |
| Alignment | EL, KB, SP, GB | n/a: the frame is placed freely | - |
| A heading or words laid over the picture, always or on hover | SP, SQ, SH | Partial: a text block placed over the picture; nothing shown on hover or focus | v0.8 ER-B (a caption overlay that also opens on focus) |

**Values.** EL's fit is default, fill, cover, contain or scale-down and its position one of nine points (default centre centre), both per device, and BI's position takes nine points (default centre) with an aspect ratio that starts at 0.7041. EL's link goes to none, the media file or a custom address, its caption to none, the attachment's or a custom one, and its lightbox to default, yes or no; WP's styles are default and rounded. KB's overlay starts at 30 % and SP's at 20 %, and KB and ST give the overlay a blend mode, where Urd blends the picture itself with what lies behind it (sixteen modes with a strength, 0.7.9.4). SP shows its caption on hover by default and its hover effect starts static; KB's filter starts at none. BI loads lazily by default and has a high-priority switch, and KB and SP each have a switch that turns lazy loading off. WS alone sets an optimisation and a quality, where Urd compresses every upload to WebP in the browser. Per device: EL (width, height, fit, position, alignment), KB (maximum width), SP (width, height, size, fit, alignment), ST (aspect ratio, focal point, fit, width, height) and GB (width, height, fit).

### Gallery

Urd: the gallery block (ELEMENTS.md #50, #52 and #53).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The layout (grid, masonry, carousel, slideshow, tiles) | KB, SP, SQ, SH | Has: six views (grid, carousel, slideshow, ribbon, mosaic, polaroid) | - |
| Columns | WP, EL, KB, SP | Has: 1 to 6 on the grid views | - |
| Gap | EL, KB, SP | Partial: none on the carousel and the slideshow | v0.8 ER-D (the carousel's gap and tile ratio) |
| Captions | WP, EL, KB, SP, SQ | Partial: the polaroid prints the alt text; no caption field | v0.8 ER-B (a caption per picture in every view) |
| A link per image | WP, EL, KB, SP, SQ | Has, through the link editor (0.7.27) | - |
| A lightbox with captions, a counter or thumbnails | EL, KB, SP, SQ | Partial: arrows, Escape and the alt text | v0.8 ER-B (a counter, thumbnails, swipe and zoom) |
| Crop to one ratio | WP, KB, SP | Partial: square tiles on the grid and the polaroid and 4:3 on the carousel, each picture framed in the image editor; no ratio to choose | v0.8 ER-D (the carousel's tile ratio) |
| Random order | WP, EL | Missing | Watch: a site that asks for a shuffled gallery |
| Image size | WP, EL, KB, SP | Missing | v0.8 responsive pictures |
| Lazy loading | EL, KB, SP | Has | - |
| Autoplay, speed, pause on hover and loop | EL, KB, SP, ST, SH | Partial: the slideshow plays, holds on hover and focus, wraps and has a pause button; autoplay cannot be switched off | 0.7.40 (carousel semantics) |
| Arrows, dots and slides per view | EL, KB, SP, ST, SH | Partial: arrows on both, dots on the slideshow, one slide per view | 0.7.40 (carousel semantics); v0.8 ER-D (dots on the carousel) |
| A slide or fade transition | EL, SP | Partial: fade only | v0.8 ER-D (a slide transition) |
| A focal point per picture | SQ | Has: each picture framed in the image editor (0.7.29.1-3) | - |

**Values.** SQ's gallery sections lay out as Grid: Simple, Masonry or Strips and Slideshow: Full, Simple or Reel, its gallery blocks as Carousel, Grid, Slideshow or Stack, with up to 250 pictures; KB's type starts at masonry and SP's layout at grid. Columns start at 3 in SP (per device) and in KB, which sets six breakpoints (3, 3, 3, 2, 1, 1), and at 4 in EL from a list built in code the records did not reach. KB crops to a ratio that starts at 3:2 landscape, WP crops by default with the aspect ratio auto, and EL's carousel stretches its pictures or not (default not). Autoplay waits 5 s in EL, 7 s in KB, 2 s in SP's carousel and 3 s in its slider, with a transition of 500 ms in EL and SP's carousel, 800 ms in SP's slider and 400 ms in KB; EL's effect is slide or fade (default slide), KB's slide type starts at fade and SP's slider at slide. EL's navigation is arrows and dots, arrows, dots or none (default both), and its caption the title, the caption or the description. KB shows captions at the bottom on hover, SP as an overlay on hover, SQ on hover in its slideshows. SP adds «Load More Images» after 9 pictures and a zoom under the pointer, KB a filter on every picture and a pause button, EL a right-to-left direction, and ST names its arrows and slides for screen readers. Per device: EL (slides shown and scrolled, alignment), KB (columns), SP (columns, gap, image size).

### Video

Urd: the video block (ELEMENTS.md #55 and #57).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| A file or an embed | EL, WS, GJ, KB, SQ, SH | Partial: a file, or a YouTube or Vimeo link | Other hosts: 0.7.24.1 (the embed block for other providers) |
| Autoplay, loop, muted and controls | WP, EL, WS, GJ, BI, PL, KB, ST, SQ, SH | Partial: loop, muted and «Start by itself» on a file, with the controls always shown; on an embed, «Start playing when pressed» (0.7.24.1.1), no loop, muted or controls yet | 0.7.24.1 (the embed's own options); v0.8 ER-B (a controls switch on a file) |
| A poster image | WP, EL, GJ, BI, KB, PL, SQ, SH | Has: on a file, and on an embed as its cover's picture, framed and adjusted in the image editor (Delivered 0.7.24.1.1) | - |
| Plays inline, and preload | WP, EL, WS, BI, PL | Partial: always inline, preload always metadata | Not taken: inline and metadata suit every site |
| Captions | WP, EL, WS | Missing | 0.7.40 (a captions file on a self-hosted video) |
| A privacy mode | EL, WS, GJ, KB | Has: youtube-nocookie, and do-not-track on Vimeo | - |
| Loading on a click, behind a preview image | EL, WS, BI | Has: every embed behind a cover in the site's colours or the owner's own picture, the choice remembered per provider (Delivered 0.7.24.1.1), and «Ask before loading» to load it with the page instead (Delivered 0.7.29.4) | - |
| Start and end time | EL, WS | Missing | 0.7.24.1 (embeds); v0.8 ER-B (a file) |
| Aspect ratio | EL, BI, KB, SQ | Has: 16:9, 4:3, 1:1, 9:16, 21:9 and 4:5, the block's height following its width at the shape, or the frame as it is (Delivered 0.7.24.1.1) | - |
| Opening in a lightbox | EL, KB, ST | Missing | v0.8 ER-B (video in a lightbox) |
| A download button | EL, ST | Missing | Not taken: a link to the file does it (0.7.27.9) |
| An accessible name | KB, ST | Has: «Title (for screen readers)» | - |
| Full screen | WS, ST | Has: allowed on the embed's player and on the file's controls | - |
| A fit for a file in its box | BI | Missing | v0.8 ER-B (a fit choice on a file) |

**Values.** EL's source is YouTube, Vimeo, Dailymotion, VideoPress or a file (default YouTube), and GJ's provider HTML5, YouTube, YouTube with no cookie or Vimeo. EL's aspect ratio is 16:9, 21:9, 4:3, 3:2, 1:1 or 9:16 (default 16:9), and SQ's is automatic or chosen, upright included. Preload is metadata, auto or none, metadata by default in WP, EL and BI. The controls are on by default in WP, EL and PL and off in BI, whose film also starts by itself, muted and looping, and fills its box (contain, cover, fill or auto, default cover) at one of nine positions; SQ offers the controls All, Minimal or None. EL's suggested videos come from the video's channel or any video. WS's Vimeo player picks a quality from auto to 4K and loads lazily by default, and WS also sets Vimeo's picture-in-picture, speed and keyboard and YouTube's language and playlist; ST writes the video's name, description and upload date as structured data. Per device: only EL's play icon size and KB's media and its ratio.

### Map

Urd: the map block (ELEMENTS.md #282 to #285).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The place, by address or coordinates | EL, GJ, KB, SP, ST, SQ | Has: an address, coordinates or an OpenStreetMap link, with a search | - |
| Zoom | EL, GJ, KB, SP, ST | Has: 1 to 19 | - |
| Height | EL, KB, SP, ST, SQ | n/a: the frame is the size | - |
| The map type or style | EL, GJ, KB, SP, ST, SQ | Missing | v0.8 ER-G (OpenStreetMap's own layers); own styles: Watch: needs a map library |
| A marker, shown or with its own icon | KB, ST, SQ | Partial: one marker at the place | Own markers and several pins: Watch: needs a map library |
| The map's controls (zoom buttons, full screen, dragging) | KB, ST, SQ | Missing | Not taken: the OpenStreetMap embed sets its own controls |
| An API key or the embed mode | KB, ST | n/a: OpenStreetMap's own frame needs no key | - |

**Values.** The zoom starts at 10 in EL, 11 in KB and 12 in SP (Urd 15), and the height at 450 px in KB and 300 px in SP. The map type is roadmap or satellite in GJ and KB, SP has a satellite switch, and KB adds a filter (standard, grayscale, invert, saturate or sepia, at 50 by default) as EL does with its CSS filters; SQ's styles are Original, Grayscale, Satellite, Dark, Light and more, with the labels, the terrain and the controls switched one by one. KB embeds the map or loads Google's script (default embed), and ST's zoom, map type, Street View and full-screen buttons and its dragging all start on. SP sets the map's language (default en), and KB takes a Snazzy Maps style. Per device: the height in EL, KB, SP and ST, and KB's width.

A directions link on the map block and a list of several places with map links are v0.8 ER-G.

### Form

Urd: the form block (ELEMENTS.md #171 to #199 and #325).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| Field types | WS, BI, KB, SP, SQ, SH | Partial: eight types (text, email, phone, multi-line, dropdown, checkbox, radio, date) | v0.8 ER-E (number, URL and time fields, a range, a hidden field, a group of checkboxes and a section break) |
| Label, placeholder, help text, required and a default value per field | WS, BI, KB, SP | Partial: label and required | v0.8 ER-E (placeholder, help text, default value) |
| Autocomplete tokens | WS, KB, SP | Missing | 0.7.40 (with the form errors) |
| Own error messages | BI, KB, SP | Missing: fixed messages in the visitor's language | v0.8 ER-E (an own error message per field) |
| A success message, or a redirect after sending | WS, BI, KB, SP, SQ, SH | Partial: a success text after a send to an endpoint | v0.8 ER-E (a redirect after sending) |
| Sending to an email address | BI, KB, SP, SQ, SH | Partial: the mailto mode opens a draft to the recipient, with a subject, that the visitor sends from their own mail program; no notice sent by the site | v0.9 (forms through the site's own function, with a notice email to the owner) |
| Sending to an address of one's own | WS, BI | Partial: a JSON post to an endpoint the owner sets; no plain form post | 0.7.24.4 (a plain form post to an email service's form address) |
| Spam protection | KB, SP, SQ, SH | Partial: a honeypot | v0.9 (Turnstile with forms through the site's own function); reCAPTCHA: Not taken: Google (FEATURES.md «reCAPTCHA») |
| A consent checkbox with a link | KB, SP, SQ, SH | Partial: a checkbox field, with no link in its label | 0.7.24.4 (a consent field with a link to the privacy page) |
| The submit button's text and style | BI, KB, SP, SQ | Partial: the text | v0.8 DS-3 (component tokens, with the submit button's width and alignment) |
| A label hidden, or a name for screen readers apart from it | WS, KB, SP | Missing: every field shows its label, which names it | v0.8 ER-E (a label hidden visually but kept for screen readers) |
| A width per field (full or half) | KB | Missing: every field spans the form | v0.8 ER-E (a width, full or half) |
| Rows on the multi-line field | KB, SP | Partial: four rows, fixed | v0.8 ER-E (a rows setting, growing with its text) |
| A list of choices, with one chosen at the start | WS, BI, KB, SP | Partial: the choices of a dropdown or radios typed as one list; none chosen at the start | v0.8 ER-E (a default value per field) |
| Radios and checkboxes in a row or stacked | WS, KB | Missing: stacked | v0.8 ER-E (an inline or stacked layout for radios and checkbox groups) |
| Several choices in one field (a checkbox group or a multi-select) | KB, SP, SQ, SH | Missing: single checkboxes | v0.8 ER-E (a group of checkboxes); a multi-select dropdown: Not taken: a checkbox group covers it (ELEMENTS.md #185) |
| A number field with a least, a most and decimals | BI, KB, SQ, SH | Missing | v0.8 ER-E (a minimum, a maximum and a step on the number field) |
| An earliest and a latest date | SP | Missing | v0.8 ER-E (an earliest and latest date on the date field) |
| A pattern and a country code on the phone field | SP | Missing | v0.8 ER-E (a pattern per field, and a country code on the phone field with a default country) |
| A field filled from the page address | KB, SQ | Missing | v0.8 ER-E (a hidden field filled from the page address) |
| Fields shown by an earlier answer | SQ | Missing | v0.8 ER-E (conditional fields) |
| File upload: several files, a limit on their number and size | BI, KB, SQ, SH | Missing | Not taken: needs storage; an endpoint provider can do it (ELEMENTS.md #190) |
| The fields' look (boxed or underlined, shape, fill, border) | KB, SP, SQ | Missing: one look from the theme | v0.8 ER-E (the form's designs in the design picker); v0.8 DS-3 (input tokens: radius, border width, colours) |
| The form in a pop-up | SQ, SH | Missing | v0.8 ER-A (a popup block holding a form, opened by a click); opening by itself: Not taken: an overlay the visitor did not ask for (FEATURES.md «Promotional pop-ups») |
| Stored entries with a CSV export | SQ, SH | Missing | Not taken: an endpoint provider has one (FEATURES.md «Submissions inbox») |

**Values.** Field types: BI's input takes 18 HTML types (text, number, email, url, checkbox, radio, range, date, datetime-local, search, tel, time, file, month, week, password, color, hidden); KB has 14 field blocks (text, email, telephone, textarea, select, checkbox, radio, date, time, number, file, hidden, accept, captcha) and SP 12 (name, email, phone, textarea, select, checkbox, radio, date, toggle, url, hidden, accept); SQ lists 20 types, and SH's form app has text, multi-line, dropdown, radio, multiple choice, date, number and file fields beside email and phone. The multi-line field opens at 3 rows (KB) or 4 (SP, Urd). A file field takes 5 files of 10 MB (KB's defaults, SQ's limit) or 20 MB (SH). SP's placeholders and autocomplete tokens come per field type (name, email, tel-national, bday, url, off), and its phone field holds a pattern and the code +44 by default. The submit button says «Submit» (SP), «Click me» (BI) or «Send» (Urd). BI posts JSON, multipart or URL-encoded data (JSON by default); KB emails the owner with a subject, a sender, a reply-to the email field, cc and bcc, and SP to an address with cc, bcc and the subject «Form Submission». KB's honeypot is on by default, beside reCAPTCHA on its first form block (v3 by default) and a captcha block for reCAPTCHA (v2 by default), hCaptcha or Turnstile; SP's reCAPTCHA defaults to v2. SQ recommends at most 30 fields and SH allows 25 forms of 31 fields; neither sends the visitor a confirmation (SQ says so), an auto-reply stays not taken in Urd (FEATURES.md «Email notifications»), and SH delivers suspected spam with a [SPAM] prefix. Per device: KB (each field's width, the submit button's width and alignment) and SP (the gaps, the alignment). KB's and SP's style and layout lists live in edit code the records did not reach.

### Accordion

Urd: the FAQ block (ELEMENTS.md #102 to #104).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| One open at a time, or several | WP, EL, BI, KB, SP, ST, SQ | Has | - |
| The first item open, or all closed at the start | WP, EL, WS, KB, SP, ST, SQ | Missing | v0.8 ER-A |
| An icon: shown, chosen, and its side | WP, EL, KB, SP, SQ | Partial: a fixed chevron | v0.8 ER-A |
| The title's heading level | WP, EL, SP | Missing | v0.8 ER-A |
| FAQPage structured data | EL, KB, SP, ST | Missing | v0.8 baking (JSON-LD) |
| Items in columns | BI, KB, SP | Missing | Not taken: two FAQ blocks side by side do it |
| An open colour for the title and the icon | EL, KB, SP | Missing | 0.7.9.7 (Small settings) |
| A divider between the items | SP, SQ | Has: the «List» design, bare rows with a rule between them | - |
| A background, a border and rounded corners on the items | KB, SP, SQ | Partial: the «Cards» design takes a background, a border and a shadow; no corners of its own | v0.8 ER-I (box styles on more blocks: background, border, radius, shadow) |

**Values.** The open state: WP an item open by default (off) and «Autoclose» (off), and its details block takes a name that groups separate toggles so one opens at a time; EL «Default State» first expanded or all collapsed (first expanded) and «Max Items Expanded» one or multiple (one); KB the open pane (the first) and «Start collapsed» (off); SP the first item expanded (on) and the others closed (on); ST «Start open» and «Only one panel open»; SQ the first item expanded and several open allowed, each a switch. The icon: WP shown (on), left or right (right); EL a plus and a minus, left or right; KB «basic» on the right, its other styles kept in code; SP a plus and a minus, 12 px per device; SQ an arrow or a plus with its size, thickness and place. The title's tag: WP H3; EL H1 to H6 or a div (div); SP a span. Columns: SP 2, 2 and 1 on the desktop, a tablet and a phone; BI a grid at a row width of 25 %; KB a column layout per device. EL opens an item in 400 ms. The title's alignment: KB left; EL start, centre, end or stretch per device; SQ an alignment of its own. The gap: EL per device; SP 10 px per device; SQ a row padding. Per device: EL (the title's place, the gaps, the icon's size), KB (borders, columns), SP (gaps, the icon's size, columns).

The answers are rich text; other blocks inside an item are in no item.

### Tabs

Urd has no tabs (ELEMENTS.md #105); v0.8 ER-A builds them on the APG tabs pattern with panels that find-in-page can open, vertical tabs included.

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The orientation: the tabs above the panel, or beside it | EL, WS, KB, SP, ST | Missing | v0.8 ER-A (tabs, vertical tabs included) |

**Values.** The orientation: EL horizontal or vertical (horizontal), its nested tabs in four directions (above, below, or at either side) per device; WS horizontal or vertical; KB a layout per device (tabs), its choices kept in code; SP a style per device (hstyle1 on the desktop, vstyle6 on a tablet, stack1 on a phone); ST horizontal or vertical. The tab open at the start: WP index 0; BI 1; KB 1, and a start tab per device; SP 0; ST and PL a tab named by its key («tab1» in PL). The tab row's alignment: WP left, centre, right, space between or stretch; BI centre, space between, space around, left or right; EL start, centre, end or stretch per device; KB left; SP left, its titles centred; ST per device. The tabs' width: EL a navigation width in %; KB a tab width of 4 on the desktop; ST a width per device, or full width (off). An icon on a tab: EL with its own icon when active; KB beside the title or alone, on the right; SP on the left at 16 px per device (off); ST shown (off). The active tab: EL a background, a border and a shadow; BI a background of its own; KB a title colour, background and border; SP a background and a text colour; ST a background, border, padding and size of its own. The phone: EL a horizontal scroll (off) from a chosen breakpoint (mobile); ST «Scrollable on mobile» (on); SP the stacked style. Height: KB a minimum per device; ST a minimum per device and equal tab heights (off). Gaps: EL per device; KB 10 on the desktop; ST per device. Transition: EL a duration; ST an effect. Only WS lets the arrow keys move focus without opening a tab (automatic or manual activation) and loops focus round the row; PL mounts the panels one at a time or all at once. Per device: EL, KB, SP and ST.

### Table

Urd: the table block (ELEMENTS.md #40).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| A caption | WP, KB | Missing | v0.8 ER-C (table options) |
| A header row | WP, KB | Has | - |
| Striped rows | WP, KB | Has | - |
| A fixed layout or column widths | WP, KB | Missing | v0.8 ER-C (table options) |
| The text alignment in the cells | WP, KB | Missing | v0.8 ER-C (column alignment) |
| Lines between the rows or round every cell | KB | Has: «Lines»: «Row lines», «Grid» or «None» | - |
| A wide table scrolling sideways | KB | Has: a wide table scrolls in its own surface | - |

**Values.** WP: a style, regular or stripes (regular), a fixed layout (on), a caption, a header, a body and a footer section, and a text alignment. KB: a caption (off) aligned centre; the first row and the first column as headers (both off); even and odd row colours (off) with hover colours; a text alignment (left) and a header alignment (centre) per device; a maximum height and width; horizontal scrolling (off); a row height per device; borders per device, or on rows only (off); cell padding in named steps (xxs). Per device: KB (alignments, row height, borders).

Only Gutenberg has a footer row, and only Kadence a first column as header; ER-C's table options take both. Plasmic's rich table is a data grid (rows from data, row selection, density, export), a different element.

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
| A separator between the units | KB, SP | Missing | 0.7.9.7 (Small settings) |
| A box round each unit | SP, ST | Has: the «Boxes» design, or «Plain» without boxes | - |

**Values.** The kind: KB a date (default), an evergreen timer of hours and minutes that resets after 30, or a repeat (off) with a daily frequency; SP a date (default); ST a due date (default) or a restart interval. The units: KB days, hours, minutes and seconds, each on; SP the same four, each on; ST the same four, each on, with two digits kept or not. The words: SP DAYS, HOURS, MINUTES and SECONDS, shown (on); ST Days, Hours, Minutes and Seconds; KB empty until set, with a word before and after the timer. The separator: SP on, a colon by default; KB a divider (off). At the end: KB none (default) or a redirect; SP the timer stays at zero (default), a redirect among its other choices; ST a message. The box: SP square (on), transparent by default, with a width per device, and the units in a column per device; ST a box (off) with a gap. The alignment: KB per device; SP centre per device; ST per device. Only KB adds a pause button (off) at the top right, and only SP sets how a screen reader hears the ticking (off). Per device: SP (alignment, box width and direction), ST (alignment, gaps), KB (alignment).

### Icon

Urd: the icon block (ELEMENTS.md #67).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| An icon from a library | WP, EL, KB, SP, ST | Has: 56 drawn icons, characters by category or an own image, with a search in every admin language (0.7.10.6) | - |
| Size and colour | EL, KB, SP, ST | Has: 8 to 400 px, a theme or custom colour | - |
| A hover colour | EL, KB, SP, ST | Missing | 0.7.9.7 (small settings: an icon's colour on hover) |
| A link, with a target | EL, KB, SP | Missing | v0.8 ER-G (any block as a link) |
| A background shape (circle, square, framed) | EL, KB, SP, ST | Missing | v0.8 ER-I (icon designs with a badge background) |
| Rotation | WP, EL, SP, ST | Has: the frame's rotation | - |
| An accessible name, or decorative | KB, SP, ST | Partial: always decorative | v0.8 ER-G (an accessible name for an icon made a link) |
| Alignment | EL, KB, SP | n/a: the icon stands centred in its frame, which is placed freely | - |

**Values.** EL's view is default, stacked or framed (default default) with the shape square, rounded or circle (default circle), and its alignment start, centre or end (default centre). The size starts at 50 px in KB and 40 px in SP, SP's colour at #333 and its rotation at 0, and SP has an accessibility mode with a description, where ST takes an aria label. WP alone flips an icon horizontally or vertically. KB sets several icons in a row in one block, and gives each a tooltip. Per device: EL (size, rotation, alignment), KB (size), SP (size, alignment) and ST (size).

A list with an icon per item has a section of its own, «Icon list», and an icon with a title and a text another, «Icon or info box», both below.

### Testimonial or quote

Urd: the quote block (ELEMENTS.md #31, #32, #137 and #138).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The quote and who said it | WP, EL, KB, SP, SQ | Has: the quote and a name | - |
| A role or company | EL, KB, SP | Has: the role | - |
| A portrait and its position | EL, KB, SP | Partial: a round portrait in the card design, framed, turned and finished in the image editor (0.7.29.4); no position choice | 0.7.9.7 (small settings: the portrait's place in the card) |
| A star rating | KB, SP | Missing | Not taken: low value |
| Alignment | WP, EL, KB, SP, ST | Missing | 0.7.9.7 (small settings: the quote's text alignment) |
| A style variant | WP, KB, SP | Has: «Large quote» and «Card with portrait» | - |
| Several quotes in a grid or a carousel, with autoplay | KB, SP | Missing | v0.8 ER-D (a carousel view, with a quote source) |
| The card's background, border or picture | KB, SP, ST, SQ | Partial: «As a card» on the theme's surface with a line in the accent colour | v0.8 ER-I (the quote card's background and border) |

**Values.** EL puts the portrait aside or on top (default aside) and SP's testimonial below by default, the quote block's author picture on the left; EL aligns start, centre or end (default centre, per device) and SP's quote starts on the left. KB's testimonials start at the style basic in a grid of one column at each of six breakpoints, with a carousel waiting 7 s and a 400 ms transition, a rating of 5 and a quote icon of 50 px; SP's carousel plays by itself every 2 s with arrows and dots, one column on every device, stacking on tablets and below by default, with equal heights as a switch. WP's quote styles are default and plain. SP's quote shows a Tweet link by default (Not taken in Urd, ELEMENTS.md #31). Per device: EL (alignment), KB (columns), SP (columns, spacing) and ST (the container's width).

### Counter or stats

Urd: the stats block (ELEMENTS.md #115, #117 and #122).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The start and end number | EL, KB, SP | Partial: it always counts from 0 | v0.8 ER-C (a start number) |
| Prefix and suffix | EL, KB, SP, ST | Has | - |
| The duration | EL, KB, SP, ST | Missing: 1.2 s | v0.8 ER-C (a count-up duration) |
| A thousands separator and decimals | EL, KB, SP | Has: kept as typed | - |
| A title, its tag and its position | EL, KB, SP, ST | Partial: a label under the number | Not taken: the label's place follows the design |
| An icon above the number, or a shape behind it | SP, ST | Missing | v0.8 ER-C (an icon above the figure) |
| A bar or circle | EL, KB, SP, ST | Missing | v0.8 ER-C (a progress bar and ring) |
| The number's colour and size | EL, KB, SP, ST | Missing | v0.8 ER-C (the figure's colour and size) |

**Values.** The count runs from 0 to 100 in EL and KB and from 0 to 80 of 100 in SP, over 2 s in EL, 2.5 s in KB and 1.5 s in SP (Urd 1.2 s). EL's thousands separator is default, dot, space, underline or apostrophe, SP's starts as a comma, and KB keeps 2 decimals by default. EL's title tag is h1 to h6, div, span or p (default div), placed before, after, at the start or at the end. KB's bar is a line, a circle, a semicircle or a line mask (5 stars by default), easing in, out, in and out or linear (default in and out), and fills only once in view; SP's layout starts as a number, with a circle (230 px, a stroke of 8) and a bar beside it; EL's progress bar takes the types default, info, success, warning and danger. Per device: EL (the title's position and alignment, the number's alignment), KB (the title's and the number's alignment), SP (alignment, icon size) and ST (bar thickness, text alignment).

### Timeline

Urd: the timeline block (ELEMENTS.md #123). Only Spectra and Stackable have a timeline.

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The line on one side, or alternating | SP, ST | Has: «Line on the left» and «Alternating sides» | - |
| An icon per item, and the dot's size and colour | SP, ST | Partial: a filled dot or a ring, in the accent colour | v0.8 ER-C (an icon or picture per event) |
| The line's colour and thickness | SP, ST | Partial: the colour | 0.7.9.7 (Small settings) |
| The gap between items | SP, ST | Missing | 0.7.9.7 (Small settings) |

**Values.** SP: the line in the centre per device, 3 px wide in #eee with a fill colour (#0693e3) and its icon's colours on focus; an icon per event (calendar-days, 12 px per device) in a connector 35 px wide per device; gaps of 10 px across and 15 px down per device; a date in «F j, Y»; the titles as H4; the events stacked from tablet width; and a timeline drawn from posts (6 posts, an excerpt of 15 words). ST: the line's position, thickness, offset and gap, a dot's size and rounding, an accent colour and a background colour.

Only Spectra formats a date per item and stacks the line on phones; Urd's year is free text, and the alternating design turns into one line on a narrow block.

### Social or share

Urd: the links block (ELEMENTS.md #142 and #143).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| A list of networks, each with its address | WP, EL, SP, SQ, SH | Has: the site's links, registered once, and the block's own | - |
| Brand colours or own colours | WP, EL, SP, SQ | Partial: one colour for every icon | v0.8 ER-I (links designs with brand colours) |
| A background shape (square, rounded, circle, pill) | WP, EL, SP, SQ | Missing | v0.8 ER-I (the same) |
| Size and spacing | WP, EL, SP, SQ | Partial: size 24 to 64 px | v0.8 ER-I (the same) |
| Alignment and layout | WP, EL, SP, SQ | Missing | v0.8 ER-I (the same) |
| The name beside each icon | WP | Has: the «Icon and name» design | - |

**Values.** WP's styles are default, logos only and pill shape; EL's shape is square, rounded or circle (default rounded), its colour Official Color or a custom one per icon, and its columns run from auto to 6 (per device); SQ draws no border, a square, a circle or a rounded square in Knockout, Outline or Solid with a thickness, in sizes XS to XL. SP's icons start at 30 px with a gap of 10, and EL's spacing at 5. WP shows the names and opens a new tab only when asked (both off by default). SP's share block lies horizontally by default and takes a picture in place of an icon. Per device: EL (size, spacing, columns, alignment) and SP (size, gap, alignment).

Sharing the current page (Spectra's social share) was removed from the links block in its version 2, since the share links led nowhere a visitor wants (ELEMENTS.md #143).

### Navigation or menu

Urd: the menu, set in the Nav panel (ELEMENTS.md #80 to #83).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| An item's label and link | WP, KB, SQ, SH | Partial: a page and a spot on it, a web address, email, phone or a file (0.7.27); no link to one collection entry | v0.8 entry pages |
| A new tab and rel per item | WP, KB | Has (0.7.27) | - |
| A description or title per item | WP, KB | Has: a one-line description, shown in the submenus and the mobile menus (0.7.13.21) | - |
| Submenus that open on hover or on a click | WP, WS, KB, SQ | Has: hover, hover closed by a click, or click only | - |
| More than one submenu level | WP, KB, SH | Has: three levels under the bar (0.7.30.6), the second beside the panel or as a headed group in columns and the flyout (0.7.13.21) | - |
| A phone menu behind a button | WP, KB, SQ, PL | Has: a panel below the bar or a full-screen sheet; the button's drawing and word chosen (0.7.13.21); the items' alignment, the submenu arrow, and the bar alone beside the sheet with its tools in the sheet's foot (0.7.13.17) | - |
| The current page marked | WS, KB, SQ | Missing | 0.7.40 (the current page marked) |
| The gap between items | KB, SQ, PL | Has: the item spacing | - |
| The submenu arrow: shown, and its look | WP, KB, SQ | Partial: an arrow on every item with a submenu, shown or hidden in the phone menu (0.7.13.17); no look of its own | 0.7.41.19 (an image as the submenu arrow, with an open animation) |
| A mega menu: a wide panel with columns, pictures and icons | KB, SH | Partial: submenus in one to four columns and a full-width flyout, the second level as headed columns (0.7.13.21); no pictures or icons in the panel | Not taken: pictures or blocks in the panel until a real site needs one (ELEMENTS.md #81) |

**Values.** Submenus: WP open on hover, on a click or always (hover), with an arrow (on), nested up to 5 levels; KB opened by a click (off), a mega menu (off) 400 px wide per device with a picture or an icon per item, and a highlighted label; SQ on hover, one level, the dropdown icon's style, size, thickness, spacing and roundness set for the whole site, a fixed arrow on phones; SH two levels under the top item, drawn as dropdowns or a mega menu with columns and promotional pictures; WS a delay before a submenu opens, and a shorter one when the pointer moves between items. The phone menu: WP an overlay on phones (default), its button the «handle» drawing (on), its close button an icon, a word or both (icon); KB an off-canvas panel sliding from the left per device, 400 px wide per device, its button's icon 25 px per device with lines of 2 px, and a close icon of the same size; SQ the menu folding behind an icon whose style and thickness are set, when the links do not fit; PL a breakpoint of its own. Link kinds: SQ a web address, a file, email, phone, or a collection filtered by a category or a tag; SH the home page, search, collections, products, pages, blogs, posts, policies, the customer's account pages, web addresses and email. Per device: KB (its link colours, dropdowns, mega menu and off-canvas panel); none in WP, WS or PL.

Only Kadence offers a highlighted label on an item; only Gutenberg sets the overlay's colours and a limit on nesting.

### Header and footer

Urd: the menu and the footer, set once for the site (ELEMENTS.md #11 and #12). Only Kadence ships a header builder in the code read: rows with a layout, a background and a transparent version, a border, a minimum height, a maximum width, and the gap and vertical alignment of their items, with sections and columns placed in them. Gutenberg keeps a header or a footer as a template part with an area and a tag. SQ and SH set their headers and footers as their help centres describe them (read on 19 October 2026).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| A layout: where the logo, the menu and the tools stand, set apart for the phone | KB, SQ | Has: six variants (a bar, three floating shapes, a side column on the left or the right) with «Menu placement», and the phone's own layout and logo place | - |
| A sticky header: always, on scrolling up, or not at all | KB, SQ, SH | Has: «Sticky menu», and «On scrolling» as «Always show», «Shrink the menu» or «Hide, show on scroll up» | - |
| A header laid over the first section, transparent until the page scrolls | KB, SQ | Has: «Place the menu on top of the top section» and «Transparent at the top of the page», for the whole site | - |
| The header's height and width, full or inset | KB, SQ | Has: four size steps with «Thickness» and «Side padding», «Align to content width», and the phone's own values | - |
| A background: a colour, a gradient or a picture | KB, SQ, SH | Has: the sections' background layers behind the menu | - |
| A border and a shadow | KB, SQ | Has: «Border» at the bottom, the top, both or all sides, with its width and colour, and «Shadow» soft or strong | - |
| A button in the header | KB, SQ | Has: a menu item «Shown as» «Button», in the accent colour (0.7.13.21) | - |
| A cart in the header with its count, and its icon | SQ, SH | Partial: the basket in the tool cluster with its count, in one drawing | v0.8 ER-D (an icon choice for the basket button: cart, basket or bag) |
| Social links in the header | SQ | Has: «The site's links» as icons in the tool cluster | - |
| Search in the header | SH | Missing | v0.8 site search (to be weighed) |
| A language switcher | SQ, SH | Missing | After v1.0: multilingual content |
| An account or sign-in link | SQ, SH | Missing | Not taken: server; link out (FEATURES.md «Member accounts (sign-up and login)») |
| The header or the footer kept off chosen pages | SQ | Has: the menu kept off chosen pages, hidden or reached by the pointer at the top edge, a ghost there or a pull tab (0.7.13.21); the footer hidden per page | - |
| An announcement bar above the header | SQ, SH | Partial: one message with a link, closed by the visitor, following the menu or scrolling away, kept off chosen pages (0.7.13.5); no bold, italic or links in the words, and one message | 0.7.41.18 (Announcement content: bold, italic and links, several messages that rotate) |
| A footer built from sections and blocks | WP, SQ | Partial: ten footer templates with link columns, a link row, a bottom line, the legal line, the site's links, a call to action or a newsletter field and a background | After v1.0: synced global blocks (a synced section as the footer) |
| Menus, a newsletter field and social links in the footer | SQ, SH | Has: link columns, a link row, a newsletter field and the site's links | - |

**Values.** KB: each row's layout, background and transparent background, border and rounding, padding, margin, minimum height and maximum width per device, and its items' gap (xs) and vertical alignment per device; a logo, link colours and button colours of their own for the sticky and the transparent header. WP: a template part's area and tag. SQ: a layout, a height and a full or inset width, set apart for the desktop and the phone; a fixed header, «Basic» or «Scroll back»; a solid, gradient or adaptive background; a drop shadow and a border; a button in the primary, secondary or tertiary style, an account login, social links with their icon style and colour, a cart, and a language switch; the cart as a cart, a basket or a bag, or up to 10 characters of text, with its size, border and count; the header and the footer hidden on chosen pages; the footer made of block sections; the announcement bar with bold, italic and links, the whole bar a link, closed by the visitor, on every page but cover pages. SH: a logo width, the menu as dropdowns or a mega menu, search, an account icon, a cart icon with a bubble, country or region and language selectors, sticky always or on scrolling up, and a colour scheme; the announcement bar with up to 12 messages stepped by arrows or rotating, a separator line and social icons; the footer with menus, an email sign-up, social icons, payment icons and policy links. Per device: KB (most row settings); SQ (layout, height and width).

The menu's own settings (its items, submenus and phone menu) are in Navigation or menu above. Only SH puts payment icons in the footer, and only Kadence gives the sticky and the transparent header a logo and colours of their own.

### Container or section

Urd: the section (ELEMENTS.md #1 and #2).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The HTML tag | WP, EL, WS, KB, SP, GB | Partial: always a section | Watch: a page that needs an aside or an article landmark |
| The content width, boxed or full | EL, BI, KB, SP, ST, SQ | Has: the site's content width, and a section's own in Properties: the site's, full, or a width in px (0.7.10.20) | - |
| A minimum height, or the screen's height | WP, EL, KB, SP, SQ | Has: any CSS length, and dragged edges | - |
| A flex or grid layout with gaps | WP, EL, PK, KB, SP, GB, SQ | n/a: free placement; «Change layout» offers six layouts | - |
| Vertical alignment of the content | WP, EL, KB, SP, SQ | n/a: free placement | - |
| A background image, video, gradient and overlay | WP, EL, KB, SP, SQ | Has: eight layer types | - |
| A parallax or fixed background | WP, KB, SP, SQ | Has: on the image and video layers | - |
| Shape dividers at the top and bottom, laid over the content, with a line along the edge | EL, KB, SP, SQ | Partial: five shapes with height, colour, mirror and invert; none over the content, and no line along the edge | v0.8 BE-3 (more shapes, a divider over the content, and a line style for its edge) |
| A link on the whole container | EL, KB, SP | Missing | v0.8 ER-G (a section or a group of blocks as one link) |
| Text and link colours inside, or a colour theme per section | WP, EL, KB, SP, SQ, SH | Has: eight section themes | - |
| Padding inside the section, with linked sides and named steps | WP, EL, KB, SP, ST, GB, GJ, PK | Missing: «Minimum height» and the pill on the seam set the room; no padding | 0.7.10 design round (ELEMENTS.md E51) |
| A play and pause button on a background video | EL, KB | Missing: the video plays while the section is in view, and stands on its poster under reduced motion | 0.7.40 (a site-wide pause for motion) |

**Values.** The tag: WP's group and cover a div by default; EL's v4 containers and WS a list of landmarks (div, header, section, article, aside, footer, main, nav and more); GB sixteen tags; KB a div; SP a div, its section block a section. The content width: EL boxed or full (boxed); BI 1,200 px; SP full with a wide inner width, its section block boxed at 900 px with an inner width of 1,140 px; SQ a content width on classic sections. The height: EL default, fit to screen or a minimum (400 px, per device); KB 0 px per device; SQ «Fill Screen». The padding (the panels walked through on 28 November 2026): WP named steps linked by axis, drawn as a blue overlay while dragged; EL four linked sides per device under Advanced; KB named steps from SM to XXL per device (SM at the top and the bottom by default), drawn as a green band; SP four sides linked by default per device (20 px on its section block); ST named steps for all sides with a switch for each side, drawn as a green band; GB «Link all sides»; GJ four sides in px, %, em, rem, vh or vw; PK a vertical padding of 0 to 160 px in steps of 8; SH a space between sections for the whole site, up to 100 px. The shape dividers: EL its shapes kept in code, a width in % and a height per device, flip, invert and «Bring to Front»; KB none by default, white, 100 px high and 100 % wide per device; SP none, #333, 100 % wide, a height per device, the bottom one inverted by default, and the content above the shape (off); SQ at the bottom only, its shapes picked or shuffled, and a line along the edge, solid, dotted or none, S, M, L or a custom thickness. The background video: EL a source with a start and an end time, autoplay, mute and loop (on) and controls (on); KB a local file, YouTube or Vimeo, looped and muted, with buttons (off); SP a fallback picture and an overlay; SQ an upload of up to 60 seconds or a YouTube or Vimeo link, a playback speed and a fallback picture on phones. Overflow: EL default, hidden or auto; SP visible. Per device: EL, KB and SP vary nearly every layout setting, ST its padding, SQ the grid's row count.

A section carries a name beside its stable id (0.7.27); hiding a section is v0.8 AR-5.

### Columns

Urd has no columns element (ELEMENTS.md #3: n/a): blocks are placed freely on the section's grid, and the phone's row grid stacks them ([ADR-0019](../adr/0019-synced-mobile-model.md)); each row names what covers the setting in Urd.

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The number of columns and a layout preset | WP, EL, BI, KB, SP, ST | n/a: «Change layout» offers «Two columns» and the split layouts | - |
| A width per column | WP, EL, BI, KB, SP, ST | n/a: the dragged «Width %» | - |
| The gap between columns and rows | EL, BI, KB, SP, ST, GB | n/a: the placement itself, and on phones «Space between blocks on the phone» per section with a site default (Delivered 0.7.3.7) | - |
| Stacking on phones, and its order | WP, BI, KB, SP, ST | n/a: the row grid and the phone order | - |
| Vertical alignment | WP, EL, KB, SP, ST, GB | n/a: aligning a multi-selection | - |
| A background or an overlay per column | EL, KB, SP | n/a: a shape block placed behind the blocks | - |
| A link on a whole column | BI, KB | Missing | v0.8 ER-G (a group of blocks as one link) |

**Values.** The count: SP 2; KB about twenty layout pictures on a new row (walked through on 28 November 2026); ST seven ratio pictures on a new columns block. Stacking: WP on phones (on); BI at tablet width, on phones or never (tablet), reversed when stacked (off); SP on phones, reversed per device; KB an order per device. The gap: BI 20 px; SP 10 px; KB a gutter and a row gap per device; ST a column and a row gap per device; GB a horizontal and a vertical gap per device. Vertical alignment: WP top, centre, bottom, stretch or space between; EL default, top, middle, bottom, or three ways of spreading. Only Kadence makes a column sticky, with an offset per device, which «Pin while scrolling» with «Distance from the top» does for any block in Urd; Spectra's columns block also carries the section's shape dividers.

### Spacer or divider

Urd: the «Space» block, the line shape and the chapter divider (ELEMENTS.md #6 and #7).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| A spacer's height | WP, EL, PK, KB, ST | Has: the «Space» block's frame, with a height of its own on the phone (Delivered 0.7.3.26.2) | Blocks panel |
| The line style: WP's default, wide or dots, and a style solid by default with a drawn pattern's size (EL, KB, SP) | WP, EL, KB, SP | Partial: solid | 0.7.9 (line styles for the line shape) |
| Width, thickness and colour, or a gradient (WP) | WP, EL, KB, SP, ST | Partial: four theme colours | 0.7.9 (an own colour) |
| A text or an icon in the line, with its tag, its place along the line and its gap | EL, SP | Partial: a text label | 0.7.9 (an icon in the line) |
| Alignment | WP, EL, KB, SP | n/a: placed freely | - |

**Values.** The spacer's height: WP 100 px, the same on every device, with a width for a spacer across; EL 50 px per device, in px, em, rem or vh; KB 60 px per device; PK 24 px, vertical, horizontal or both; ST per device; SQ's spacer block only in its classic editor. The line: WP's styles default, wide or dots (default), with a colour or a gradient and an opacity; EL a style kept in code (divider.php), solid by default, a weight of 1 for the plain styles and a size and an amount of 20 for the drawn patterns, 100 % wide per device, #000, a gap of 15 per device; KB the divider on by default, a style (solid, no list in the records), an opacity of 100, #eee, 80 % wide and 1 px thick per device, and a pattern's rotation of 40, stroke width of 4 and gap of 5; SP a style (solid, no list), 100 % wide and 3 px thick per device, a pattern size of 5 per device, #333; ST a colour, a height and a width per device; SQ's line block in the section theme's line colour at a fixed thickness. The text or icon: EL «Divider» in a span, placed left, centre or right with a gap per device, or a star icon in a default, stacked or framed view with its size and rotation per device; SP «Divider» as an H4, or a circle-check icon 30 px wide per device, with a gap of 15 per device. Alignment: WP centre, wide or full; EL, KB and SP per device.

### Contact

Urd: the contact details block (ELEMENTS.md #286 and #160). No project read has a contact-details element. The nearest are Elementor's contact buttons, a floating bar whose buttons each pick a platform (phone, email with a subject and a message, WhatsApp, Messenger, SMS, Viber, Waze and more), and the person cards of Spectra and Stackable (a name, a role, a picture and its position, and links to social profiles); Kadence's identity block is the site's logo and title. The help-centre records add SQ's contact bar on phones (email, call, map and opening hours, from the business details) and SH's brand block in the footer.

Urd has the contact details block in eleven designs, read from the site's contact settings (address, phone, email, the legal line, a map, a QR code, a vCard, a call bar on phones, directions), and the team preset for people (portrait, name, role and email as text). Missing: social links per person (v0.8 AR-4, the people kind); WhatsApp and SMS in the call bar (v0.8 ER-G); opening hours (v0.8 ER-C); several places (v0.8 ER-G).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| Contact actions: call, email, map, WhatsApp and SMS | EL, SQ | Partial: call, email and directions in the buttons design and the call bar on phones; no WhatsApp or SMS | v0.8 ER-G (WhatsApp and SMS actions in the call bar) |
| A bar docked to the bottom on phones | EL, SQ | Has: «Call bar on phones» with call, email and map, one per page (0.7.24.5.2) | - |
| A floating button that opens a short list of contact links | EL | Missing | v0.8 ER-G (a docked button that opens a short list of contact links) |
| Opening hours with an open-now status | SQ | Missing | v0.8 ER-C (opening hours in the site settings, with an «open now» status) |
| A person card: portrait, name, role, text and social links | SP, ST | Partial: the team preset with a portrait, a name, a role and an email as text; no social links per person | v0.8 AR-4 (the people kind, with social links per person) |
| The portrait's place and shape (above or beside, square or round) | SP | Partial: the portrait is an image block placed freely, with three corner choices; no round crop | v0.8 BE-2 (mask shapes on the image block) |
| The site's logo, name and tagline together | KB, SH | Has: the menu's logo and name, and the footer's brand as text, a logo or both, with a tagline | - |

**Values.** EL's contact buttons pick a platform from a list built in code (phone, email with a subject and a message, WhatsApp, Messenger, SMS, Viber, Waze and more), in three sizes (small, medium, large), with corners round, rounded (the default) or sharp, a 12-hour clock (the default) or a 24-hour one in the chat bubble, a place across (start, centre, end) and up or down (top, middle, bottom; bottom by default) with offsets, full width on phones by default, and open and close animations at three speeds. SP's person card puts the picture above by default (a thumbnail, 100 px wide), titles the name as h3, links Twitter, Facebook, LinkedIn and Pinterest, and stacks from tablet width; KB's identity block sets the logo left of the title by default, the title shown and the tagline hidden. SQ's bar holds email, call, map and hours, light or dark, on phones only, hidden while the page scrolls. Per device: EL (the offsets, the box's width, the animations) and SP (the picture's width, the gaps).

### Table of contents

Urd: the contents of one text or of the privacy page in their «Contents at the side» design (0.7.24.2.4, `buildContents` in doc-look.js): the second-level headings as entries, a sticky list on the left or the right, the entry in view marked, folded into one row on a phone. A whole page's index is not there yet (ELEMENTS.md #85 and #87); 0.7.41.16 builds a page index block that lists the page's sections and their H2 and H3 headings as links, with a sticky placement and the entry in view marked, and the names of 0.7.27 give it stable targets.

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The heading levels it lists | WP, KB, SP, ST | Partial: a text's second-level headings | 0.7.41.16 (Page index block: the sections, and the H2 and H3 headings when chosen) |
| Smooth scrolling with an offset | KB, SP, ST | Has: every link to a spot lands under the menu, smoothly only without reduced motion (0.7.27.1) | - |

**Values.** The levels: WP up to a maximum level; KB H1 to H6, each on; SP all six on; ST H2 to H6 on and H1 off. The list: WP numbered (on); KB a disc, with a link style (underline); SP a disc marker, or no bullets (off); ST numbered or not, with a list type and an indent. The title: KB «Table of Contents», shown (on); SP «Table Of Contents»; ST shown (on). Folding: KB a toggle (off) closed at the start (off) with an arrow; SP collapsible (off), closed at the start (off), with an angle-down icon, and nested entries that fold to a depth of 5 (off). Scrolling: KB smooth (off) with an offset of 40 and the entry in view marked (off); SP smooth (on) with an offset of 30 px; ST smooth, with an offset per device. Columns: KB 1; SP 1 per device; ST per device with a gap. A line between the entries: SP none (1 px, 15 px apart per device, when set). Per device: SP (width, columns, the line's gap), ST (columns, gaps, the offset), KB (the title's padding, the width).

Of the projects read, only Kadence marks the entry in view; Urd's document contents do too.

### Menu anchor

Only Elementor has an anchor element, Menu Anchor, with one setting: the id. Its v4 elements and every other project carry the anchor on the element itself (see [What every element can carry](#what-every-element-can-carry)). Urd puts a name on any section or block beside its stable id (0.7.27), so it needs no anchor element (ELEMENTS.md #84).

### Posts or collection

Urd: the collection block (ELEMENTS.md #14, #88, #252 and #254).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| The number of items | WP, KB, SP, ST, SQ | Has: up to 100, or all | - |
| The order and what it sorts by | WP, KB, SP, ST | Partial: newest or oldest by date | v0.8 AR-3 (a sort order) |
| A filter by category, tag or author | WP, KB, SP, ST, SQ | Missing: entries have no category or tags | v0.8 AR-2 (a category and tags on entries); v0.8 AR-3 (collection filters, by author and tag too) |
| An offset | WP, KB, SP, ST | Missing | v0.8 AR-3 (an offset that skips the first entries) |
| Columns | KB, SP, ST | Missing: the cards fill the width | v0.8 ER-D (columns per view) |
| Showing or hiding the parts (image, date, author, excerpt, read more) | WP, KB, SP, ST, SQ, SH | Missing | v0.8 ER-D (the parts shown per view) |
| The excerpt's length | WP, KB, SP, ST | Partial: «Text lines» keeps a card's text to its lines, ending in an ellipsis (0.7.9.5); no length in words | ER-D |
| A read-more link | KB, SP, ST, SQ | Missing: the title is the link | v0.8 ER-D (the entry's link as a button) |
| The image's size, ratio and position | WP, KB, SP, ST, SQ | Partial: a frame shape, rounding and focal point per entry, set in the image editor; none for the view | v0.8 ER-D (the picture's size and place on a card); v0.8 DS-3 (the cards' image ratio) |
| Pagination, with previous and next links and the page numbers around the current one | WP, SP, GB, SQ, SH | Missing | v0.8 ER-D (pagination as a named navigation with the current page marked) |
| An item template built from elements | WP, WS, GJ, GB, PL | Missing: three fixed views | v0.8 entry pages (a card bound to the entry's fields) |
| Which collection or post type it lists | WP, WS, PL, KB, SP, ST, GB, SQ | Has: a collection | - |
| The layout (grid, list, masonry, side by side, carousel) | PL, SP, SQ, SH | Partial: cards, a list and an archive by year | v0.8 ER-D (one layout per view: grid, carousel or editorial, and a wall layout) |
| A carousel's autoplay, speed, arrows and dots | SP, SQ, SH | Missing | v0.8 ER-D (a carousel view with autoplay, a pause, dots and looping) |
| Load more, or infinite scroll | SP, SH | Missing | v0.8 ER-D (load more, and infinite scroll as a third choice) |
| Featured or sticky entries first | WP, KB, SQ | Missing | v0.8 AR-2 (a featured flag, to be weighed) |
| A message when there is nothing to show | WP, SP, GB, SH | Missing: an empty collection shows visitors nothing | v0.8 AR-3 (an editable message when a collection or its filters show no entries) |
| Equal card heights in a row | SP | Partial: the cards of a row stand at one height; their title, date and text do not line up across it | v0.8 ER-D (the cards' rows lined up with subgrid) |
| A separator in the meta line | KB, SP, ST | n/a: a card's meta line is its date alone | - |
| Leaving out the entry being read | SP, ST | Missing: no entry has a page of its own | v0.8 entry pages (a related list on each entry page) |

**Values.** The number shown defaults to 5 (WP's latest posts) or 6 (KB, SP, ST, Urd), and SQ shows 1 to 20 posts a page. WP, KB, SP and ST sort newest first by date by default. The excerpt runs 55 words (WP), 40 (KB) or 15 (SP). Columns default to 3 (KB, SP), SP's stepping to 2 on tablets and 1 on phones, and ST's vary per device with no default in the records; Urd's cards fill the width at about 220 px each. The picture: WP's a thumbnail aligned left, centre or right; KB's beside the text at 2:3; SP's large and on top; ST's full size. Pagination shows 2 page numbers on each side of the current one (WP) or 3 (GB); GB moves between pages with a reload or in place, SP's pagination runs by script, and SP's masonry loads more with a «Load More» button. KB divides the meta line with a dot and the categories with a vertical line, SP its terms with a comma. SP's carousel plays by itself every 2,000 ms with a 500 ms slide, arrows and dots; its grid gives the cards one height and titles them as h4 by default, and says «No post found!» when empty. SQ lays a blog out as Basic grid, Masonry, Single column, Side by side or Alternating side by side, and a summary as Carousel, Grid, List or Wall, with text sizes S to XL. Per device: KB, SP and ST (the columns, the gaps, the picture's ratio).

### Product and cart

Urd: the product block, the basket and the checkout (ELEMENTS.md #206, #208, #212 to #219 and #228 to #232). In the code read, commerce lives outside these projects: the WooCommerce and SureCart blocks were not read. Spectra's SureCart product and checkout blocks carry only the shared WordPress supports, and Stackable's pricing box and price are containers of ordinary blocks, so no product or cart setting reaches two of the eleven projects. The rows come from the help-centre records of 19 October 2026 (SQ, SH).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| Options the owner names, each variant with its own price, picture and stock | SQ, SH | Partial: sizes and colours, a colour with its own picture; one price per product | v1.1 SHOP-2 (variants with their own price, SKU and image, and options the owner names); v1.1 SHOP-3 (stock per variant) |
| The choices as buttons, a dropdown or swatches | SQ, SH | Partial: size and colour chips as buttons, a colour's picture shown while the pointer rests on its chip | 0.7.40 (variant choices as radios, a dropdown for an option with many values, and colour swatches with the colour named) |
| Sold out per variant, its label, or the product hidden | SQ, SH | Partial: the badge can say «sold out», typed by hand | v1.1 SHOP-3 (sold out from the published stock, said in text, and sold-out products hidden) |
| A low-stock label below a threshold | SQ, SH | Missing | v1.1 SHOP-3 (a «few left» label below a threshold) |
| A «from» price when the variants' prices differ | SQ | Missing: one price per product | v1.1 SHOP-6 («from» the lowest price) |
| A sale price beside the old one, with a sale badge | SQ, SH | Partial: a member price beside the price, and a badge typed by hand | v1.1 SHOP-6 (the sale price first and the old price struck through, both named in text) |
| The parts a card shows (picture, title, price, text, choices, buy button, quick view) | SQ, SH | Missing: a card shows what its entry holds | v0.8 ER-D (the parts shown on product cards) |
| The picture's ratio, shape and focal point | SQ, SH | Partial: a frame shape, rounding and focal point per product, set in the image editor; none for the block | v0.8 ER-D (the picture's aspect ratio on product cards); v0.8 DS-3 (the cards' image ratio) |
| A grid with columns, or a carousel | SQ, SH | Partial: a grid of 1 to 6 columns, or as many as fit; no carousel | v0.8 ER-D (a carousel view for products) |
| Sale and sold-out badges, their place, shape and colour | SQ, SH | Partial: one badge per product, typed by hand, over the picture | v0.8 DS-3 (badge tokens: radius, position, sale and sold-out colours) |
| A quick view, with a link to the product's own page | SQ, SH | Partial: a quick view in a dialog with the pictures, the text and the choices; no product page to link to | v0.8 product permalinks («See the product page» in the quick view) |
| Zoom on the product's pictures | SQ, SH | Missing | v0.8 product permalinks (a closer view, by zoom or the lightbox) |
| A quantity field beside the buy button | SQ, SH | Partial: a quantity field on a product with limits (0.7.10.26), else one at a time | v0.8 ER-D (a quantity field beside the buy button and in the quick view) |
| A most per order | SQ, SH | Has: a least and a most per basket line, 1 to 99, held by the payment (0.7.10.26) | - |
| What follows an add: a notice or the basket drawer opening | SQ, SH | Partial: «Added to basket!» on the button for a moment | v0.8 ER-D (a notice on the page or the basket drawer opening) |
| Straight to the checkout, past the basket | SQ, SH | Missing | v0.8 ER-D (straight to the checkout after an add, and a buy-now choice on one featured product) |
| Express pay buttons beside the buy button | SH | Missing | Not taken: the payment starts from the checkout (ELEMENTS.md #214) |
| The basket's button: a cart, basket or bag icon, or words, with its count | SQ | Partial: «Button with text» or «Icon only», with the count as a badge | v0.8 ER-D (an icon choice for the basket button: cart, basket or bag) |
| A note from the buyer, or questions of the owner's own | SQ, SH | Partial: a comment field in the checkout | v1.1 SHOP-4 (a few order questions the owner adds) |
| A discount code field in the basket or the checkout | SQ, SH | Missing | v1.1 SHOP-5 (a code field in the checkout and in the basket drawer) |
| A way on from an empty basket | SQ, SH | Partial: «Your basket is empty.» in words | v0.8 ER-D (an empty basket linking to a page the owner picks) |
| Questions asked when a product is added (an engraving, a name on a shirt) | SQ | Missing | After v1.0: shop extensions (item modifiers) |
| The currency and how prices are written | SQ, SH | Partial: a currency word per block, «kr» by default | v1.1 SHOP-6 (one currency for the site, prices in the site language's format) |

**Values.** SQ takes up to 6 options and 250 variants a product, SH 3 options and 2,048 variants; SQ's choices are buttons or a dropdown, SH's pills, dropdowns or colour and image swatches. SQ's sold-out label is the owner's own words («Class Full»), its dropdown adds «(Sold out)» and its buttons dim; SH hides sold-out products through a collection rule. SH's cart opens as a drawer, a page or a pop-up notice, with a note field and chosen products in an empty drawer; SQ confirms an add with the mini cart's badge and View cart and Checkout, or «Added!» on the button alone, and its cart page links «Continue Shopping» to a chosen page and holds up to 500 items. SQ's header basket is a cart, basket or bag icon or up to 10 characters of text, its count with an optional 0; SH caps each item in the cart, at 50 by default for a store under 250 sales. SQ's store page shows 200 products a view, its columns, spacing and picture ratio set per page, and its product page has four layouts (Simple, Wrap, Half, Full). Urd: 1 to 6 columns or as many as fit, up to 100 products or all, a least and a most per basket line from 1 to 99, and the currency word «kr» by default. The records name no setting per device beyond SQ's phone settings on its single-product block.

Urd has product cards over a products collection (columns, a maximum count, a quick view, a badge, a picture on hover, size and colour choices; ELEMENTS.md #206), the basket as a button or an icon with a drawer (#228 to #230), and the checkout block (#232) with its payment settings: Vipps, a card at Vipps or Stripe, PayPal, when Stripe takes the money, and payment instructions with a name and a text (0.7.28). The shop of v1.1 ([ADR-0027](../adr/0027-a-shop-without-a-database.md)) adds variants with their own price, published stock, shipping tables, discount codes and MVA (v1.1 SHOP-2 to SHOP-6).

### Icon list

Urd: the text block's lists, with plain bullets or numbers and links inside items (ELEMENTS.md #34).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| An icon per item, or one for the whole list | EL, KB, SP, ST | Missing: plain bullets or numbers | v0.8 ER-D (lists with icon bullets) |
| The icon's colour and size | EL, KB, SP, ST | Missing | v0.8 ER-D (the icon's colour and size) |
| Stacked or inline | EL, SP | Missing | v0.8 ER-D (an inline layout) |
| Columns with a gap | KB, ST | Partial: a list in a text set in columns flows over them (0.7.9.5) | v0.8 ER-D (columns for icon lists) |
| Dividers between items | EL, ST | Missing | v0.8 ER-D (dividers) |
| A link per item | EL, KB, SP | Has: links inside items, through the link editor (0.7.27) | - |
| Numbered items and nesting | KB, ST | Has: numbered lists and indent in the text toolbar | - |
| Alignment | EL, KB, SP, ST | Has: the text's alignment | - |
| A colour for linked items on hover | EL, KB, SP | Missing | v0.8 DS-2 (link styles in text, hover) |

**Values.** EL lays a list out traditional or inline (default traditional), with dividers solid, double, dotted or dashed (1 px and #ddd by default); SP's layout starts vertical. The icon starts at 14 px in EL and 16 px in SP and stands at the item's middle in KB and SP; EL starts with a check, KB with a check in a circle and SP with an arrow in a circle. KB keeps 10 between icon and text and 5 between items in one column. Per device: EL (icon size, alignment, space between items), KB (columns, gaps), SP (icon size, gap, layout) and ST (columns, column gap, icon size, row gap).

### Icon or info box

Urd: the feature-card presets, an icon block above a text box with a lift, and the card presets of blocks (ELEMENTS.md #68, #49, #16 and #129).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| An icon or a picture, above or beside the text | EL, KB, SP, ST, PK | Has: an icon or an image block placed freely beside the text box, with its own place in the phone's order | - |
| A title with its level, and a text | EL, KB, SP, ST, PK | Has: the text box's heading and words | - |
| A link on the whole box | EL, KB, SP | Missing: a link on the button or on words | v0.8 ER-G (a group of blocks as one link) |
| A «Learn more» link or button | KB, SP | Has: a button block in the card | - |
| A shape behind the icon (stacked, framed, circle or square) | EL, KB, SP, ST | Missing | v0.8 ER-I (icon designs with a badge background) |
| A surface under the whole box: background, border and shadow | KB, SP, ST, PK | Partial: the text box's colour, border, shadow and glass under the words, with the icon above it | v0.8 ER-I (a box surface under an image and its text as one card) |
| Alignment of the content | EL, KB, SP, ST | Has: the text box's alignment | - |

**Values.** EL's icon stands on top by default, or at the start, the end or the bottom, and its picture box's image on top, left or right (default top), both per device; KB's media starts on top and is an icon, a picture or a number; SP's starts above the title. EL's title tag is h1 to h6, div, span or p (default h3), SP's h3 and KB's level 2; SP adds a prefix above the title (h3), a separator line and a call to action («Read More», none by default). EL's icon view is default, stacked or framed with the shape square, rounded or circle (default circle), and SP's icon shape starts at circle. KB links the whole box or only its «Learn More». PK's card is card or flat (default flat). Per device: EL (positions, alignment, spacing), KB (alignment, maximum width), SP (alignment, icon size, image width) and ST (the container's width and alignment).

### Audio

Urd: the audio block, the browser's own player for an uploaded file with a title and a loop (ELEMENTS.md #61 and #62).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| A file, or a link or embed from another host | WP, EL, SQ | Partial: an uploaded file only | 0.7.24.1 (one click-to-load frame for other providers, SoundCloud among them) |
| A title or caption | WP | Has: a title over the player, written on the page | - |
| A download link | EL, SQ | Missing | Not taken: a link to the file does it (0.7.27.9) |
| A playlist with a track list | WP | Missing | Watch: a publications collection covers podcasts (ELEMENTS.md #62) |

**Values.** WP's audio takes autoplay, loop and preload, where Urd loops on a switch and always preloads the metadata, as on the video. EL's audio is a SoundCloud link whose player switches the buy, like, download and share buttons, the artwork, the comments, the play counts and the user name on or off (all on by default) and colours its controls; SQ takes an .mp3 or .m4a of up to 160 MB, or a link, in a Minimal player, light or dark, or a Classic one, with Apple Podcasts metadata. WP's playlist orders its tracks ascending and shows the track list, pictures, artists, numbers and lengths by default, with a waveform drawn as bars, mirror, line, blocks, dots or a seek bar. Nothing is set per device.

### Alert or notice

Urd: a text box with an icon block beside it makes a note (ELEMENTS.md #41, Partial); v0.8 ER-F adds callout types (info, success, warning, danger), each with its colours and icon, and a dismiss the browser remembers.

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| A type that sets the colours and the icon (info, success, warning, danger) | EL, WS, ST | Missing | v0.8 ER-F (callout types) |
| A title and a text | EL, SP | Has: a text box with a heading and its words | - |
| Colours of its own | EL, SP | Partial: the text box's background, border and shadow | v0.8 ER-F (each callout type with its colours) |
| A close button, remembered after closing | EL, SP, ST | Missing | v0.8 ER-F (a dismiss the browser remembers, as the announcement bar's does) |

**Values.** EL: info, success, warning or danger (info), a title and a text, a dismiss icon (shown), a background colour and a side border's colour and width. WS: note, tip, important, warning or caution (note). SP: a title as an H4 and a text, a notice colour (#FFD54F), a layout (modern), a highlight 10 px wide, a dismiss remembered for 1 day when cookies are on (off), aligned left. ST: a type kept in code, dismissible (on), the close button's size and colour. Per device: SP (padding, the icon's size).

### Modal or popup

Urd: no popup of the owner's own content (ELEMENTS.md #107, Partial: the lightbox, the product quick view and the calendar's event card open on `<dialog>`), no tooltip (#108) and no popover the owner places (#109); v0.8 ER-A builds a popup block opened by a click, with a drawer variant and popup links, an anchored variant beside its button, and a tooltip behind a gate.

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| Opened by a button, a link, an icon or a picture | SP, WS | Missing | v0.8 ER-A (a popup block opened by a click, and popup links) |
| Opened by itself: after a time, a scroll or a number of page views, on chosen pages and devices, shown again after a while | SQ, SH | Missing | Not taken: the popup never opens on a timer or on leaving the page (ELEMENTS.md #107, BACKLOG ER-A) |
| A layout: a centred box, the full page or a corner | SQ, SH, SP | Missing | v0.8 ER-A (the popup's layouts: a centred box, full page, a corner) |
| A backdrop, closed by Escape, a click on it or a close button | SP, WS | Missing | v0.8 ER-A (closed with Escape and a backdrop click, focus returned) |
| A sign-up form or buttons inside | SQ, SH | Missing | v0.8 ER-A (a newsletter form inside the popup) |
| Anchored beside its button: the side and the alignment | WS | Missing | v0.8 ER-A (an anchored variant that opens beside its button) |
| A tooltip on hover and focus | WS | Missing | v0.8 ER-A (a tooltip, `popover="hint"` behind a gate) |

**Values.** SP's modal: opened by a button (default), a text, an icon or a picture; 600 by 350 px per device, at most 90 vh high; an appear effect; Escape on and a backdrop click off; the close icon at the top right, 25 px. SP's popup builder: 700 px wide per device, a position across and down, an overlay (on) that stops the page behind, dismissable (on), Escape and a backdrop click on, and the content pushed (on). SQ: one pop-up at a time, part or all of the page, with or without a picture or a slideshow; a newsletter sign-up or up to two buttons and a message after sending; shown after a time or a scroll depth on the first page or chosen pages, again after a day up to never, hidden after a sign-up, on phones or not. SH: floating with a position, or an overlay; by device, by page type, and on the first to the third page view, at once or delayed; several at a time. WS: a popover's and a tooltip's side (top, right, bottom or left), alignment (centre, start or end) and offset (4 px), kept in view; a tooltip's delay; a dialog's title from H1 to H6 (H2). Per device: SP (size, position).

### Show more

Urd: no «show more» yet (ELEMENTS.md #30, Missing); v0.8 ER-A builds it on `<details>`.

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| Content folded away behind «Show more», opened in place | KB, ST | Missing | v0.8 ER-A («show more» on `<details>`) |

**Values.** KB: «show more» and «show less» (on), open at the start per device (off), a folded height of 250 px per device, and a fade over the cut (off), 50 px high. ST builds it from inner text and button blocks, so its words and look are those blocks' own; its own records hold only the shared layout settings.

### Call to action or hero

Urd: the «CTA banner» and the hero section templates («Hero», «Hero, centred», «Hero over a photo», «Hero with floating photos»), text and button blocks placed freely on the section's background (ELEMENTS.md #156 and #10).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| A heading, a text and one or two buttons | SP, ST, SH | Has: the templates' text and button blocks, two buttons in «Hero, centred» | - |
| A background picture with an overlay, and the height | ST, SH | Has: the section's background layers, a colour layer laid over the picture, and «Minimum height» | - |
| The text beside the buttons or above them, stacked on phones | SP, ST | n/a: the blocks are placed freely, and the phone's row grid stacks them | - |

**Values.** SP: a title as an H3 and a text, aligned left per device; a button («Read More», primary) with an arrow icon, a second button (off); the button in the middle beside the text, 70 % and 30 % of the width per device, stacked from tablet width, the buttons 15 px apart per device; a link in a new tab (off). ST: the call to action and the hero built from inner blocks, aligned per device. SH: the image banner's height (adapting to the picture), the text's place and the opacity of the box behind it, and a colour scheme; the hero with media and nested text and button blocks.

### Newsletter sign-up

Urd: the footer's newsletter sign-up, and a form block sent by mailto or to an endpoint (ELEMENTS.md #163). Of the eleven projects only Kadence's form sends to a mail service; the other sources are the help-centre records (SQ, SH).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| An email field, with a first and last name to add | KB, SQ, SH | Partial: the footer's sign-up takes an email; a form block takes any fields | 0.7.24.4 (a newsletter sign-up preset) |
| A heading and a text above the field | SQ, SH | Has: a heading and a line under it in the footer's sign-up; on a page, text beside a form block | - |
| Where the address goes: the builder's own list, a mail service, a sheet | KB, SQ, SH | Partial: an endpoint the owner sets, or an email by mailto | 0.7.24.4 (a plain form post to the email service's form address: Mailchimp, Brevo, Buttondown); a list kept by the site: Not taken: needs a server (FEATURES.md «Lead capture») |
| A message after signing up, or a redirect | SQ, SH | Partial: a success text | v0.8 ER-E (a redirect after sending) |
| A confirmation email (double opt-in) or a captcha | KB, SQ, SH | Partial: a honeypot | v0.9 (Turnstile, the footer newsletter's too); double opt-in: Not taken: the mail service does it (FEATURES.md «Lead capture») |
| An unticked consent to marketing, with a small print | SQ, SH | Missing | 0.7.24.4 (an unticked consent split into member information and offers, with a link to the privacy page) |
| The layout (stacked, side by side, full width) | SQ, SH | Partial: the field and its button in a row that wraps when narrow, or «Large centred» in the footer | v0.8 ER-E (the form's designs in the design picker) |
| The sign-up in a pop-up, opened by a click or by itself | SQ, SH | Missing | v0.8 ER-A (a corner popup holding a newsletter form, opened by a click); opening by itself: Not taken: an overlay the visitor did not ask for (FEATURES.md «Promotional pop-ups») |

**Values.** SQ's sign-up adds a first and last name, each optional and requirable, a title, a description and a disclaimer; lays out as Stack or Float; ends with a message (HTML allowed) or a redirect; and needs reCAPTCHA, a confirmation email or both when it keeps the addresses itself, in up to 20 lists. SH's sign-up section holds one heading, one paragraph and one email form, with a colour scheme and a full-width choice, and its pop-up floats in a corner or covers the page, shown on all devices, the computer or the phone, on chosen page types, at once, after a delay or on the first to third page view, with a discount as a reward if the owner wants. KB's form sends to MailerLite groups or FluentCRM lists and tags, double opt-in off by default. Urd's footer sign-up has a heading, a line, the button's words («Sign up» by default), an endpoint or a mailto recipient, a success text and «Large centred». The records name no setting per device.

### Search

Urd: a search field in the calendar block over its events (ELEMENTS.md #91 and #92); a search over the site is v0.8 site search, to be weighed.

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| A search over the whole site | WP, KB, SP, SQ, SH | Partial: a search field in the calendar block over its events | v0.8 site search, to be weighed |
| What it searches: everything, or one kind (posts, products, events) | WP, KB, SQ, SH | Partial: the calendar's titles, places and descriptions | v0.8 site search (results grouped by kind: pages, entries, products); v0.8 AR-3 (a search field on the collection views) |
| A button: words or an icon, its side, or none | WP, KB, SP | Missing: the calendar's field filters as it is typed in | v0.8 site search (named clear and submit buttons) |
| An icon that opens the field, or a search over the whole screen | KB, SQ, SH | Partial: the calendar's field folds behind an icon on phones | v0.8 site search (the field or an icon in the menu bar, the icon opening the field or a full-screen search) |
| Results while typing | SQ, SH | Partial: the calendar's events filter as the visitor types, the count read out | v0.8 site search (results while typing, the count announced once) |
| A results page with filters, sorting and pages | SQ, SH | Missing | v0.8 site search (a link to all results); v0.8 AR-3 (filters and sorting) |
| Typo tolerance, synonyms and results pinned to a term | SH | Missing | v0.8 site search (typo-tolerant matching, a synonym list, pinned results) |
| The field's width | WP, KB, SP | n/a: a block's frame is its width | - |

**Values.** WP's button stands outside the field by default (its other places live in edit code the records did not reach), as words unless an icon is chosen, with the label shown; KB's search stands in place («standard», its other style in edit code) with no button, the button on the right when shown, a search and a close icon, and can search products only; SP lays out a field and a button by default, the placeholder «Type & Hit Enter», the button an icon or the word «Search», the field 100 % wide and the button 60 px. SQ's search block searches the whole site or one blog, events, gallery or store page, with a drop-down of live results and the /search page every site has; SH suggests 10 results by default, puts sold-out products last and searches in 33 languages. Urd's calendar field says «Search the events» and reads out the count of matches. Per device: KB (the field's width, the close icon's size).

### Filters

Urd: the calendar block's filter chips (ELEMENTS.md #203, #204, #227 and #265 to #267); filters on collections and products are v0.8 AR-3.

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| Filtering by category or tag | WP, SP, SQ, SH | Partial: the calendar's chips, one per calendar or title prefix; none on collections or products | v0.8 AR-2 (a category and tags on entries and products); v0.8 AR-3 (collection filters) |
| The values as links or chips | WP, SP, SQ, SH | Partial: chips in the calendar | v0.8 AR-3 (checkboxes drawn as chips, in a row or a side column) |
| A count beside each value | WP, SP, SQ | Missing | v0.8 AR-3 (a category list with counts) |
| Nested categories, or the top level only | WP, SP, SQ | Missing | v0.8 AR-3 (nested categories, up to three levels, as shop navigation) |
| Facets on products: price, availability, options, tags | SQ, SH | Missing | v0.8 AR-3 (facets for a price range, availability, size and colour; filters by tag) |
| A sort choice for the visitor | SH | Missing | v0.8 AR-3 (sort keys: newest, oldest, title, price both ways) |
| A filtered view at an address of its own | WP, SQ | Missing | v0.8 AR-3 (a filter set from the page address) |
| A tag cloud | WP, SQ | Missing | v0.8 AR-3 (a tag cloud sized by count, with the count as text) |
| An archive by month or year, with counts | WP, SQ | Partial: the collection's archive view by year | v0.8 AR-3 (month grouping, and a list of periods with their counts) |

**Values.** WP's category list is links by default (or a dropdown), flat, without counts, children shown, empty categories hidden and its label shown; its tag cloud shows 45 tags in a default or outlined style, counts off; its archives group by month; its term query lists 10 by name, ascending; a term count sits in round brackets by default (none, round, square, curly, angle). SP's taxonomy list is a grid of 3 columns (2 on tablets, 1 on phones) or a list with disc bullets, counts shown, empty terms hidden and no hierarchy. SQ keeps up to 1,000 categories in three levels as store navigation at the top or the side, as a dropdown, a sub-menu or buttons, and up to 10 tag filters of 50 tags on stores of 200 products or fewer; SH has up to 25 filters drawn as lists, swatches or pictures, joined by «and» across filters and «or» within one, and none on collections over 5,000 products. Per device: SP (the columns, the gaps).

### Price list

Urd: none of its own; the table block stands in (ELEMENTS.md #125). Of the eleven projects only Spectra has one, its restaurant menu; SQ's restaurant menu block is the other source.

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| Items with a title, a description and a price | SP, SQ | Partial: the table block's text cells | v0.8 ER-C (a price list with a description line per item and the price aligned right) |
| Sections under headings | SQ | Missing | v0.8 ER-C (sections under headings) |
| A picture per item, its side and size | SP | Missing | v0.8 ER-C (a picture per item) |
| A line between items, or dotted leaders to the price | SP | Partial: the table block's row lines | v0.8 ER-C (dotted leaders) |
| Columns | SP | n/a: blocks are placed freely, so two lists stand side by side | - |

**Values.** SP's list has 2 columns (2 on tablets, 1 on phones) with 10 px gaps and stacks from tablet width; a dashed line, 100 % wide and 1 px thick, runs between items, and each item's title is an h4; a picture sits left, aligned to the top, medium, 100 px wide; a new item says «Menu Item» at «$9». SQ writes its menus in a text format of its own for sections, items, prices and descriptions, with several menus as tabs in one block. Per device: SP (the gaps, the line's width, the picture's width).

### Calendar

Urd: the calendar block over public iCal feeds, in 41 designs (ELEMENTS.md #131 and #316).

| Setting | Offered by | Urd | Where |
|---|---|---|---|
| A list or a month grid | WP, SQ | Has: 41 designs over eight views: list, cards, month, agenda, next, week, day and year | - |
| Arrows between months | SQ | Has: arrows through the months, a year back and 400 days ahead | - |
| Past events shown | SQ | Has: «Show earlier events», the last 90 days folded under «Earlier», at most 50 | - |
| An event's start and end, timed or all day | SQ | Has: from the feed, all-day events included, in the site's time zone; a feed's Windows zone names read (0.7.0.64) | - |
| A place, with a map | SQ | Partial: the place links to the map service the site chose; no map with the event | Not taken: a feed's place carries no coordinates (BACKLOG «Known Limitations») |
| Categories and tags, filtered | SQ | Has: «Show calendar filter», a chip per calendar or per title prefix | - |
| A featured event | SQ | Missing: a feed has no featured mark | v0.8 events as a collection kind, with AR-2's featured flag (to be weighed) |
| Add to calendar: Google and iCal | SQ | Has: a Google Calendar link and a downloaded .ics per event, a repeating event as its series (0.7.19.11, 0.7.0.64) | - |
| An event's details from the grid | SQ | Has: a press opens the event in a pop-up with its description | - |
| A narrow calendar | SQ | Has: a design of its own on a phone (0.7.19.21) | - |
| A month grid of the site's own entries | WP, SQ | Missing: the calendar shows feeds | v0.8 events as a collection kind (event entries in a month view) |

**Values.** WP's calendar takes a month and a year, the current month when neither is set. SQ lays events out as a list or a month grid, with times in 5-minute steps, the end required and no all-day events; it shows up to 30 past events, 250 upcoming and 350 in a month, up to two years ahead, and has no recurring events, sign-up or booking; its month block shows titles alone under 300 px. Urd: eight views in 41 designs; 1 to 3 events in the «next» card and 0 to 10 under «Later»; a maximum count, with the rest folded under «Show all» when chosen; the week from Monday, Sunday or the site language («Auto»); a 24-hour clock or a 12-hour one; repeating events read from the feed; and feeds kept 10 minutes in the visitor's browser. Per device: SQ's month block narrows to titles, and Urd draws a design of its own on a phone.

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
- **The help-centre records of SQ and SH, 19 October 2026 (primary).** The two builders' help centres were read article by article into 1,009 records, one per function, each with the options its article documents, the article's URL and the date read; from 28 November 2026 those options are taken here beside the source code as the builders' own documentation. The records and the decisions made on them were kept outside the repository.
- **The walkthroughs of 28 November 2026 (walked through).** WordPress 7.1.5 with Twenty Twenty-Five, Elementor 4.4.2 (its classic widgets), Kadence Blocks 3.9.2, Spectra 2.20.7, Stackable 3.20.3 and GenerateBlocks 2.5.1 ran in WordPress Playground, and the GrapesJS 0.22.2 webpage demo and the Puck demo in the browser, all without an account or a licence: a heading, a button and a section were selected, given a colour, another look and padding, and set at phone size, with each step's panel recorded. The steps, screenshots and accessibility trees were kept outside the repository.
