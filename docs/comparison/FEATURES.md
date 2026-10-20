# Features: Urd against the other website builders

This file answers three questions: what the other website builders offer, what Urd has, and where the gaps are. Part 1 goes through the field in 17 categories and ends with the recommendations. [Part 2](#part-2-the-function-catalogue) holds the full function catalogue: every site, business, editor and design function found, with its builders, its sources, Urd's status and where it goes.

The field was surveyed on 11 October 2026. The survey covered:

- **Hosted builders:** Framer, Webflow, Wix (Editor, Studio and Harmony), Squarespace, WordPress 7.0 and 7.1 (with WordPress.com and Jetpack), Shopify, Figma Sites, Ghost, Duda, Carrd, Tilda, Canva, Readymag, Hostinger, GoDaddy, Jimdo, Square Online and Weebly, Webnode, Strikingly, Notion Sites, Super, Durable, Zoho Sites and Webstudio.
- **WordPress builders:** Elementor 4, Bricks 2, Breakdance 3, Divi 5 and Oxygen 6.
- **Vibe-coding tools:** Lovable, Replit, Bolt and v0.
- **Club platforms:** Spond Club, Rubic, StyreWeb, Checkin, Hoopla, TicketCo and WildApricot.
- **Open-source student association sites:** Abakus, Online, echo, Samfundet, Hackerspace NTNU and Nabla, with ApeironLF as the reference site.
- **Measured output:** 30 live pages from 15 builders, with urdweb.pages.dev as the baseline.

The source marks, the ID scheme and the status words are explained in [README.md](README.md). A few facts are kept from the surveys of July and August 2026 although their source was not recorded; they carry «(earlier survey, no URL)» and count as unverified until rechecked. Facts the July 2026 map marked as verified were cross-checked against vendor documentation by three independent checkers, but their URLs were not recorded; they carry «(earlier survey, verified July 2026, no URL)». [BACKLOG.md](../BACKLOG.md) owns delivery status: a recommendation here says only where the work belongs. How features are offered in the editor, and the element catalogue, are in [ELEMENTS.md](ELEMENTS.md). What modern sites look like is in [DESIGN.md](DESIGN.md), and how the builders are built is in [CODE.md](CODE.md).

## Part 1. The field, category by category

### 1. Text editing

**The field (October 2026).**
- **The toolbar.** Squarespace, Wix and Gutenberg put font, size and colour per selection in the text toolbar. Gutenberg adds line height, letter spacing, small caps and a drop cap per block (earlier survey, no URL). Ghost and Blogger are Markdown- or flow-oriented, with simpler toolbars (earlier survey, no URL).
- **Text styles.** Framer builds typography on named text styles: one style holds font, size, weight, line height and colour. It can override size, line height, letter spacing and paragraph spacing per breakpoint, and a change reaches every text that uses the style. Framer also has text balance, truncation, selection colour, link styles, variable fonts and OpenType features ([framer.com/features/design](https://framer.com/features/design/), primary).
- **Keyboard.** Squarespace has H1 to H4 and P1 to P3 shortcuts, alignment shortcuts, indent, paste as plain text (Cmd+Shift+V) and special characters ([Squarespace keyboard shortcuts, 5 Nov 2025](https://support.squarespace.com/hc/en-us/articles/214491097), primary). WordPress has heading shortcuts, Ctrl+K for a link, `[[` for internal-link autocomplete and letter-case controls ([WordPress block editor shortcuts, updated 14 Sep 2026](https://wordpress.org/documentation/article/keyboard-shortcuts-block-editor/), primary).
- **Styling extras.**
  - WordPress 7.1 added text shadow, and hover, focus and active states for buttons and blocks ([WordPress 7.1 field guide, 5 Aug 2026](https://make.wordpress.org/core/2026/08/05/wordpress-7-1-field-guide/), primary).
  - Divi 5 has a drop cap, text columns, text stroke, gradient or image text fill and variable fonts ([Divi version log, 28 Sep 2026](https://help.elegantthemes.com/en/articles/9973580), primary).
- **Link types.** Email and phone links are standard link types at Framer, Carrd, WordPress and Figma Sites (sources in [Part 2](#part-2-the-function-catalogue)).
- **Paste.** Bricks 2.3 turns pasted HTML and CSS into native elements ([Bricks 2.3, 18 Mar 2026](https://bricksbuilder.io/release/bricks-2-3/), primary). Carrd accepts Markdown formatting in text ([carrd.com/docs/building](https://carrd.com/docs/building), primary).
- **AI writing** (write, shorten, change tone) is in nearly every hosted editor; see [16. AI and agents](#16-ai-and-agents).

**Urd today.**
- **Click and write on the canvas.** A floating toolbar sits on the selection (code: `preview-edit.js`). It offers:
  - paragraph and headings H1 to H3
  - bold, italic, underline, strikethrough, subscript and superscript
  - theme colours and a custom colour with a pipette, plus highlight
  - links: external, internal and mailto
  - alignment (left, centre, right, justify), bulleted and numbered lists, indent and outdent, quote
  - clear formatting, and special characters
  - a typography row: font (seven system stacks, code: `fonts.js`), size per selection from 8 to 120 px on a Word-style ladder, line height and letter spacing (code: `text-typo.js`)
- **Per field:** font and base size in Properties (S, M, L, XL or free px).
- **Safe output.** Rich text is cleaned at render: event attributes, `javascript:` links and script, iframe, object and embed elements are stripped (code: `sanitize.js`, `stripActiveContent`), and the link field refuses `javascript:`, `data:` and `vbscript:`. Only HTML from a calendar feed is rebuilt from a fixed allowlist, with links limited to `http:`, `https:` and `mailto:` (`safeHtmlFragment`).
- **Content that grows.** A block whose text grows pushes the blocks below it ([ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md)). Below the design width a block wraps, shrinks in proportion, or shrinks and wraps, and «Size» scales a whole block with bounds on its text ([ADR-0025](../adr/0025-the-sizing-model.md)).
- Dynamic text (CMS merge fields) belongs to the collection views; see [8. CMS, collections and blogs](#8-cms-collections-and-blogs).

**Gaps.**
- **C27** Text shortcuts (headings, alignment, Ctrl+K for a link, paste as plain text) and `tel:` links.
- **C28** A paste pipeline: Word, Docs and Slack cleaned, a pasted URL becoming a link, pasted Markdown becoming formatting.
- **C29** Styling extras: text shadow, selection colour, letter case, link styles for hover and the current page, a drop cap, and `text-wrap: balance` and `pretty`.
- **C30** Find and replace across the site.
- **C124** One link editor for every link.
- Framer's responsive text styles have no item of their own: Urd's answer is the theme fonts plus a size per field, and the type scale in the design presets (C35).
- Line height and letter spacing are closed (C1).

### 2. The element library

**The field (October 2026).**
- **Squarespace** has 35 to 45 block types, from text, Markdown and quote to products, donations, menus, reservations and embeds (earlier survey, no URL; the exact count was not verified).
  - Its gallery and summary blocks have four views each: carousel, grid, slideshow and stack, or carousel, grid, list and wall. So a carousel is a view, not an element of its own (earlier survey, no URL).
  - It recommends at most 60 blocks per page (earlier survey, no URL).
  - The basic code block, the CSS editor and the embed block are on every plan; the advanced code block and code injection need Core or higher ([squarespace.com/pricing](https://www.squarespace.com/pricing), primary).
- **Across the field,** the October enumeration found 313 elements at 39 builders, from vendor element lists, source and developer docs. The full catalogue, each element's native build and the missing elements ranked are in [ELEMENTS.md](ELEMENTS.md).

**Urd today.**
- **23 block types:** audio, button, calendar, cart, checkout, collection, countdown, faq, form, gallery, icon, image, map, product, quote, ribbon, shape, share (shown as the links block), stats, table, text, timeline and video.
- **39 section presets,** 38 plus blank.
- **Views and designs:**
  - the gallery has six views (grid, carousel, slides, ribbon, mosaic, polaroid) and a lightbox on `<dialog>`
  - the calendar has 41 designs and eight views, with a phone design and a pop-up design chosen per calendar
- **Plugins.** The plugin layer takes third-party blocks and section presets. The template ships one plugin, the Swedish language pack lang-sv, so the «Plugins» group in the block palette stays empty until a third-party plugin fills it.

**Gaps.**
- The missing elements are ranked with E-IDs in [ELEMENTS.md](ELEMENTS.md). This file gives a C-ID only where an element is also a site function: form logic (C55), the scroll-scrubbed entrance (C70), date windows (C98) and the association functions (C109 to C112).
- Two are not taken in the core: social feeds (they need an API token, which a static site cannot keep) and a custom HTML or iframe block. Urd's sanitizer strips active content by design; the route for such a block is a plugin with a CSP opt-in ([ADR-0006](../adr/0006-plugin-csp-needs-model.md)).
- **C119** A QR code per page, downloaded from the Pages panel.
- Closed here: C2, C8, C9, C10, C19 and C22.

### 3. Design and layout tools

**The field (October 2026).**
- **Webflow is still the benchmark for styling.**
  - The Style panel covers layout, spacing, size, position, typography, backgrounds, borders, effects and custom properties.
  - It styles states (none, hover, pressed, focused, visited) and uses classes with combo classes and a visible cascade ([developers.webflow.com, the style object](https://developers.webflow.com/reference/the-style-object), primary).
  - It has four preset breakpoints plus three larger ones (1280, 1440, 1920), cascading both ways from desktop. Styles change per breakpoint; the element order never does ([help.webflow.com, breakpoints](https://help.webflow.com/hc/en-us/articles/33961300305811), primary, search extract).
  - Variable modes cover light/dark, brand and seasonal themes ([webflow.com/updates/variable-modes](https://webflow.com/updates/variable-modes), primary).
  - Function variables accept `clamp()`, `calc()`, `min()`, `max()` and `color-mix()` ([help.webflow.com, functions in variables](https://help.webflow.com/hc/en-us/articles/41843932314259-Use-functions-in-variable-values), primary).
  - The breakpoint canvas (2 Sep 2026) shows every breakpoint side by side ([we-r.co](https://www.we-r.co/en/blog/nouveautes-designer-webflow-conf-2026), secondary).
  - Arrow keys move between canvas elements since 25 Aug 2026 ([releases.sh](https://releases.sh/webflow/webflow-product-updates.md), secondary, mirrors the vendor feed).
- **Command palettes are standard:**
  - WordPress 7.0 Ctrl+K anywhere in the admin (20 May 2026, [wordpress.org/news](https://wordpress.org/news/?p=20583), primary)
  - Framer Quick Actions ([framer.com/updates/quick-actions](https://www.framer.com/updates/quick-actions), primary)
  - Webflow Quick Find ([Webflow University](https://university.webflow.com/lesson/keyboard-shortcuts), primary)
  - Bricks 2.0 command palette and Element Manager (16 Jul 2025, [bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-0/), primary)
  - Divi 5 Command Center with chained commands ([help.elegantthemes.com](https://help.elegantthemes.com/en/articles/13741079), primary)
- **Layers panels:**
  - Squarespace Finish Layer (16 Apr 2026) brought a Layers panel with z-axis control, «Stacks» for grouping, right-click menus, keyboard shortcuts, per-device overrides and block hiding ([squarespace.com/blog](https://www.squarespace.com/blog/finish-layer-website-design-tools), primary).
  - Wix Studio's Layers panel renames, hides in the editor, locks and reorders ([support.wix.com](https://support.wix.com/en/article/studio-editor-working-with-layers), primary).
  - GrapesJS, the framework behind Silex, has block, style, layer and asset managers and a device preview in its core (earlier survey, no URL), and one sorter serves the canvas, the layers panel and the Style Manager ([GrapesJS `utils/sorter`](https://github.com/GrapesJS/grapesjs/tree/dev/packages/core/src/utils/sorter), code).
- **Canvas functions:**
  - The Wix Editor aligns, distributes and matches size, rotates in 15° steps, drags along one axis, duplicates by dragging and has rulers ([support.wix.com](https://support.wix.com/en/article/keyboard-shortcuts-for-the-editor), primary).
  - Wix Studio shows distances on Alt+hover ([support.wix.com](https://support.wix.com/en/article/studio-editor-keyboard-shortcuts), primary).
  - WordPress has a zoom-out view for moving patterns around ([wordpress.org, site editor](https://wordpress.org/documentation/article/site-editor/), primary).
  - Squarespace moves and resizes blocks with the keyboard ([Squarespace keyboard shortcuts](https://support.squarespace.com/hc/en-us/articles/214491097), primary).
- **Responsive models:**
  - Wix Studio has custom breakpoints that cascade from large to small, plus «Responsive AI» that groups elements into a stack or grid ([support.wix.com](https://support.wix.com/en/article/studio-editor-building-a-responsive-site), primary).
  - Wix Studio also has a built-in scanner that finds responsive design issues (earlier survey, no URL).
  - Wix Harmony adapts the desktop design automatically, with mobile-only elements and a Hidden-on-mobile tab ([support.wix.com](https://support.wix.com/en/article/wix-harmony-editor-adjusting-your-site-for-mobile), primary).
  - WordPress 7.0 shows or hides blocks per viewport, and 7.1 styles per device through `@mobile` and `@tablet` keys ([developer.wordpress.org, Aug 2026](https://developer.wordpress.org/news/2026/08/whats-new-for-developers-august-2026/), primary).
  - Squarespace's Fluid Engine snaps to its grid and got Mobile Overrides on 27 May 2026 ([squarespace.com/blog](https://www.squarespace.com/blog/product-updates-may-2026), primary).
- **Design-system tools:**
  - Tilda Styles (2025) set typography, buttons and the palette site-wide ([blog-en.tilda.cc](https://blog-en.tilda.cc/2025-in-review), primary).
  - Bricks 2.2's Style Manager has typography and spacing scales, a fluid typography generator, and a hover preview of colours, classes and variables ([Bricks 2.2, 10 Feb 2026](https://bricksbuilder.io/release/bricks-2-2/), primary).
  - WordPress has a Style Book and style revisions ([wordpress.org, styles](https://wordpress.org/documentation/article/styles-overview/), primary).
  - Elementor 4.3 sets default styles for every HTML tag ([Elementor 4.3 beta](https://github.com/orgs/elementor/discussions/37152), primary).
  - Squarespace Finish Layer added font upload ([squarespace.com/blog](https://www.squarespace.com/blog/finish-layer-website-design-tools), primary). Bricks has a Font Manager that hosts Google Fonts locally ([Bricks 2.0](https://bricksbuilder.io/release/bricks-2-0/), primary).
- **Components:**
  - WordPress 7.0 patterns default to content-only editing and can be detached ([gutenbergtimes](https://gutenbergtimes.com/wordpress-7-0-source-of-truth/), secondary).
  - Bricks 2.0 has nested components with property types ([bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-0/), primary).
  - Wix Studio shares design libraries and saved sections across a workspace ([support.wix.com](https://support.wix.com/en/article/studio-editor-creating-and-managing-design-libraries), primary).
  - Webflow components have slots and slot restrictions (28 Aug 2026), and «style props» are announced ([we-r.co](https://www.we-r.co/en/blog/nouveautes-designer-webflow-conf-2026), secondary).
- **Element switches.** Bricks 2.0's Element Manager switches elements on or off for the whole site ([bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-0/), primary).

**Urd today.**
- **The canvas.**
  - Sections with free placement of blocks (absolute frames) on a snap grid that each section can override, with layers (z) and rotation.
  - Smart guides, guides and a grid overlay; equal gaps are snapped and shown, the snap distance holds at every zoom, and guides reach across sections.
  - Multi-select with copy and paste, align and distribute.
  - Arrow keys move by the grid step (Shift moves 1 px); Ctrl+D duplicates; undo and redo on Ctrl+Z and Ctrl+Shift+Z or Ctrl+Y, across pages. The History panel lists publishes and can undo the last one. Blocks and sections have right-click menus; Ctrl+Alt+C and Ctrl+Alt+V copy and paste a style; Ctrl+Shift+Up and Down change the stacking order; Shift holds a move to one axis.
  - Sticky blocks, box styles (background, shadow, border, glass), section themes and a gradient editor.
- **Width and sizing.**
  - Content is bound to a content width, 1440 px by default ([ADR-0018](../adr/0018-bound-content-width.md)).
  - A block whose content grows pushes the blocks below ([ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md)).
  - Each block has a height that follows its content or is its own; below the design width it wraps, shrinks in proportion, or shrinks and wraps; and «Size» scales it with bounds on its text ([ADR-0025](../adr/0025-the-sizing-model.md)).
- **Mobile.** A synced row grid with per-block overrides ([ADR-0019](../adr/0019-synced-mobile-model.md)), hide on mobile, and a mobile review for sections with overrides, Urd's counterpart to Wix Studio's responsive scanner.
- **Preview.** Four devices (Screen, laptop 1280, tablet 810, phone 390) and Clean view.
- **The editor.**
  - 12 panels, with Content, Style and Placement tabs ([ADR-0016](../adr/0016-panel-language.md)).
  - An element menu with search, groups in every block, a quick row with pins, marks on own values with a reset per setting, keys 1, 2 and 3 for its areas and / for its search, placed beside the block and dragged by its head.
  - «/» opens the block menu on the canvas.
  - «Save as template» and «Change layout».
- **The theme.**
  - Tokens for background, surface, text, accent and accent text; heading and body font stacks; radius; section space.
  - Light and dark through `light-dark()` and `theme.alt`, and theme suggestions.
  - `contrast-color()` for text on the accent.
  - System font stacks only, so the site loads no font files.
- **Compared with the field.** Urd's synced mobile model sits between Webflow's seven cascading breakpoints and Squarespace's grid with its late mobile overrides.

**Gaps.**
- **C31** A command palette and a keyboard-shortcut cheat sheet.
- **C32** The canvas functions the field has:
  - marquee select and select all; Tab to the next block
  - match size; resize by keyboard
  - Alt+drag to duplicate, distance indicators
  - a zoom-out overview, and shortcuts to insert
  - The nudge convention is weighed with it: the field moves 1 px per arrow key and 10 px with Shift.
- **C33** A layers panel with rename, lock and hide.
- **C34** Synced components (symbols). Templates and block groups are inserted as independent copies today.
- **C35** Design presets and design-system tools (the set is in [DESIGN.md](DESIGN.md)).
- **C36** More fonts, self-hosted font upload included.
- **C37** Elements shown only on the phone.
- **C38** Desktop and phone canvases side by side.
- **C39** An element manager that hides unused block types.
- **C40** Page duplication.
- **C41** Classes and custom CSS per element.
- **C122** A phone text size per block.
- **C123** Sections duplicated, cut and pasted; blocks cut and pasted across pages.
- Custom breakpoints are not taken; see the tablet note under [Notes](#notes).
- Closed here: C26.

### 4. Media

**The field (October 2026).**
- **Galleries and backgrounds.** Galleries with a lightbox are standard everywhere ([ELEMENTS.md](ELEMENTS.md)). Video backgrounds are at Wix and Squarespace (earlier survey, no URL). Wix Studio adds WebGL effects on media backgrounds ([support.wix.com](https://support.wix.com/en/article/studio-editor-about-animations), primary).
- **Media libraries** are standard at every large builder (earlier survey, no URL).
  - Bricks 2.4 has a media manager with bulk actions and metadata ([Bricks 2.4, 16 Sep 2026](https://bricksbuilder.io/release/bricks-2-4/), primary).
  - Duda has an Alt Text Manager that lists images and suggests alt text with AI ([duda.co/features/seo-tools](https://duda.co/features/seo-tools), primary; [duda.co/accessibility](https://www.duda.co/accessibility), primary).
  - Webflow's Audit panel audits the asset library ([webflow.com/updates](https://webflow.com/updates/find-and-fix-accessibility-issues-with-new-audit-panel), primary).
- **Image pipelines.**
  - Webflow converts uploads to AVIF ([webflow.com/updates](https://webflow.com/updates/avif-image-support-conversion-tool), primary). It makes responsive variants from 500 to 3200 px, though AVIF is reportedly not in the `srcset` pipeline ([momenticmarketing](https://momenticmarketing.com/blog/webflow-image-optimization), secondary).
  - Webflow CMS images were capped at 4 MB, with video only as an external URL (earlier survey, verified July 2026, no URL).
  - WordPress 7.1 processes media in the browser (HEIC, Ultra HDR, GIF to video) and has a media editor modal with crop, rotate and flip ([Roadmap to 7.1](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/), primary).
  - Silex and 11ty need manual plugin setup for responsive images (earlier survey, no URL).
- **What the published pages ship** (measured, 11 Oct 2026):
  - WordPress and Squarespace put `srcset` with `sizes="auto, ..."` on lazy images.
  - Framer and Hostinger serve AVIF by content negotiation.
  - Horizon, WordPress, Webstudio and Astro give every image `width` and `height`.
  - Horizon, Squarespace, WordPress and Astro load the hero eagerly at `fetchpriority=high`.
- **JPEG XL** is in all three engines from 13 Oct 2026, when Firefox 158 turns it on ([Firefox 158](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/158), primary; details in [CODE.md](CODE.md)).
- **AI and stock media.**
  - Wix offers AI image creation, a background remover and upscaling ([wix.com/features/main](https://www.wix.com/features/main), primary).
  - Figma Sites generates and edits images, removes backgrounds and enhances resolution ([help.figma.com, AI tools](https://help.figma.com/hc/en-us/articles/31433998164375), primary).
  - Duda has stock images from Unsplash, GIPHY and Shutterstock ([duda.co/features/design-power](https://duda.co/features/design-power), primary).

**Urd today.**
- **Editing.** A shared image editor: focus point, zoom, shape, filters and grid. An icon editor.
- **Upload.**
  - Images are compressed to WebP at upload; animated GIF, WebP and APNG are kept as they are.
  - Media is git-owned, with a content hash in the file name.
  - Limits: images and audio warn above 400 kB; video warns at 4 MB and is refused at 15 MB.
- **Video.** The video block takes a YouTube or Vimeo link, or a file with a poster, loop and muted.
- **Backgrounds.**
  - Eight background layer types: colour, gradient, glow, grain, image (parallax, Ken Burns, drift, blur), image gallery, video and pattern.
  - The image gallery layer has four layouts (floating, fill, band, mosaic), 15 shapes, 13 frames, 12 tones and five motions (code: `gallery-layout.js`), and can take its pictures from a shared folder at Google Drive, Google Photos or Nextcloud, through the site's own routes.
  - Section shape dividers: wave, tilt, curve, triangle and zigzag.
- **What the demo ships** (measured, 11 Oct 2026): every image is `loading=lazy` (the hero too), with no `width`, `height` or `srcset`.

**Gaps.**
- **C11** A media library panel (open).
- **C42** A list of the images that lack alt text, edited in one view.
- **C43** Responsive pictures.
- **C44** An image editor with crop, rotate and flip.
- **C45** Duotone, blend modes and a palette from an image.
- **C46** AI image tools and stock media.
- Closed here: C6.

### 5. Navigation, header and footer

**The field (October 2026).**
- **Mega menus.** Squarespace (premium) and Wix have multi-column dropdowns (earlier survey, no URL). Elementor, Breakdance and Bricks offer them as elements ([ELEMENTS.md](ELEMENTS.md)).
- **Scroll behaviour.** A header that shrinks or hides on scroll, or turns from transparent to solid, is standard at Squarespace, Webflow and Framer (earlier survey, no URL). Duda has a shrinking header ([duda.co/features/design-power](https://duda.co/features/design-power), primary).
- **Bars.** Squarespace has an announcement bar and a mobile information bar on Core and up ([squarespace.com/pricing](https://www.squarespace.com/pricing), primary). Shopify Horizon ships a header-announcements section ([github.com/Shopify/horizon](https://github.com/Shopify/horizon), code).
- **Breadcrumbs and menus.**
  - WordPress 7.0 added a Breadcrumbs block and a menu overlay ([gutenbergtimes](https://gutenbergtimes.com/wordpress-7-0-source-of-truth/), secondary).
  - Notion Sites has a navigation bar with search and breadcrumbs on paid plans ([notion.com/product/sites](https://www.notion.com/product/sites), primary).
  - Canva builds the navigation menu from the page titles ([canva.com/help](https://www.canva.com/help/navigation-canva-websites/), primary, search extract).
- **Light and dark.** A light/dark toggle on the published site was still an open request at Wix Studio in July 2026 (earlier survey, no URL).

**Urd today.**
- **Six nav variants:** bar, floating pill, floating square, floating tab, side left and side right.
- **Menus.**
  - Dropdown submenus at one level, as an ARIA disclosure ([ADR-0010](../adr/0010-disclosure-navigation.md)).
  - A full-screen mobile menu as a `<dialog>` with its own surface and submenu choices.
- **On the bar.**
  - A light/dark toggle.
  - The logo as text, image or both.
  - Background colour or image.
  - Five hover styles: standard, underline, pill, and lift with or without glow.
  - Sticky, or laid over the first section so a transparent bar shows the hero behind it; the floating menu's corner rounding as a value.
  - A tool cluster, and a link launcher.
- **Scroll.** Shrink or hide on scroll; a transparent surface at the top that fills on scroll.
- **Announcement bar** above the menu, fixed or rolling, which the visitor can dismiss.
- **Size controls** ([ADR-0023](../adr/0023-navigation-bar-sizing.md)): thickness and text size, side padding, item spacing, alignment to the content width, the width of a floating menu, a column width for the side variant, a compact state with logo shrink, separate phone sizes, and border and shadow presets for the bar.
- **The footer** has a brand (text, image or both), link columns, the site's links (registered once in the Site panel and drawn by the footer, the menu's tools and the links block), a baseline and a CTA (button or newsletter). It comes in 10 layouts, all in the template picker: 8 arrangements plus the chapters and split designs (`footer.design`).

**Gaps.**
- Mega menu: see [Notes](#notes).
- Breadcrumbs, back to top, an HTML sitemap and a page index are elements; see [ELEMENTS.md](ELEMENTS.md).
- The org.nr. in the footer is C89; a language switcher comes with multilingual content (C63).
- **C116** Contact details and opening hours in the site settings.
- Closed here: C7, C18, C21 and C23.

### 6. SEO and AI search

**The field (October 2026).**
- **The standard package** at every large builder: per-page title and description, an Open Graph image and an X card, an automatic sitemap, robots control, canonical, and 301 redirects with a UI.
  - **Wix:** an editable robots.txt; structured data, including custom markup for dynamic pages; server-side rendering; patterned meta tags; a URL Redirect Manager with bulk 301; an SEO checklist and SEO Assistant ([wix.com/seo](https://www.wix.com/seo), primary).
  - **Squarespace:** an SEO checklist; automatic structured data (BlogPosting, Event, LocalBusiness, Organization, Product, WebSite); a fixed robots.txt with a «Block known AI crawlers» toggle; Search Console verification ([support.squarespace.com, SEO](https://support.squarespace.com/hc/en-us/articles/206744067-What-Squarespace-does-for-SEO), primary). Its URL mappings do 301 and 302 ([URL mappings](https://support.squarespace.com/hc/en-us/articles/205815308-URL-mappings), primary).
  - **Framer:** robots access, JSON-LD, noindex, optimisation warnings, traffic-aware pre-rendering, well-known files and llms.txt ([framer.com/help/seo](https://www.framer.com/help/seo/), primary). Redirects need Pro ([framer.com/pricing](https://www.framer.com/pricing), primary).
  - **Webflow:**
    - CMS fields can be bound into each page's SEO, Open Graph and RSS settings (earlier survey, verified July 2026, no URL).
    - Its Audit panel flags missing meta titles, descriptions and schema ([webflow.com/updates/ai-seo-aeo](https://webflow.com/updates/ai-seo-aeo), primary via search excerpt).
    - Sitemaps gained `lastmod` on 20 Aug 2026 ([releases.sh](https://releases.sh/webflow/webflow-product-updates.md), secondary, mirrors the vendor feed).
    - MCP v1.0.1 manages 301 redirects, robots.txt and `.well-known` files ([developers.webflow.com, 17 Jan 2026](https://developers.webflow.com/home/changelog/2026/1/17), primary).
  - **Carrd** keeps redirects for Pro Plus at $49 a year ([carrd.com/pro](https://carrd.com/pro), primary).
  - **Publii,** a static builder like Urd, has the full package (earlier survey, no URL).
- **Files for AI agents.**
  - **Ghost** (16 Jul 2026) has a setting that writes `/llms.txt` and `/llms-full.txt` and serves Markdown when `.md` is added to a post URL. It is off by default for existing sites ([ghost.org/changelog/geo](https://ghost.org/changelog/geo/), primary).
  - **Webflow's** «Markdown for agents» (2 Apr 2026) converts HTML to Markdown for LLM requests through Cloudflare, on Enterprise only ([help.webflow.com](https://help.webflow.com/hc/en-us/articles/50435871026195-Markdown-for-AI-agents), primary).
  - **Cloudflare** offers the same at zone level for `Accept: text/markdown` requests ([developers.cloudflare.com, 12 Feb 2026](https://developers.cloudflare.com/changelog/2026-02-12-markdown-for-agents), primary). Its Content Signals Policy adds `Content-Signal` lines (search, ai-input, ai-train) to robots.txt ([blog.cloudflare.com](https://blog.cloudflare.com/content-signals-policy/), primary).
  - **Wix** generates llms.txt for upgraded sites with a custom domain ([wix.com/seo](https://www.wix.com/seo), primary).
- **What the published pages carry** (measured, 11 Oct 2026):
  - Framer answers `?md` and `Accept: text/markdown` with a Markdown page and links its llms.txt with `rel=describedby`.
  - WordPress links a Markdown alternate (`?output_format=md`).
  - Wix's generated llms.txt advertises a per-site MCP endpoint.
  - framer.com and webflow.com carry a `Content-Signal` line in their own robots.txt, but no builder documents a Content-Signal setting for its customers' sites ([Part 2](#part-2-the-function-catalogue)).
  - Squarespace lists 29 AI user agents in robots.txt under the same rules as everyone else.
- **AI visibility tracking** is a paid feature at Wix (AI Visibility Overview, [Wix press release](https://www.wix.com/press-room/home/post/wix-launches-ai-visibility-overview-with-full-generative-engine-optimization-support-for-ai-powered), primary), Squarespace (AIO Scanner, [Refresh 2025](https://www.squarespace.com/blog/squarespace-refresh-2025-product-releases), primary) and Webflow (AEO, Enterprise, [webflow.com/updates](https://webflow.com/updates/introducing-webflow-aeo-for-enterprise), primary via search excerpt).
- **Speed** (measured, 11 Oct 2026):
  - Astro, the Twenty Twenty-Five demo and Carrd ship their content in the HTML with almost no JavaScript.
  - Framer, Wix and Squarespace ship 0.3 to 1.2 MB of compressed JavaScript per page.
  - Webflow, Webstudio, Shopify and ApeironLF send 103 Early Hints; ApeironLF runs on the same host as Urd.
  - Wix's Site Speed dashboard shows real-visitor LCP, INP and CLS once a site has 10 sessions in 7 days ([support.wix.com](https://support.wix.com/en/article/understanding-your-site-speed-dashboard), primary).
  - WordPress turned on Speculation Rules by default in 6.8 and moves to «moderate» eagerness in 7.1 ([make.wordpress.org](https://make.wordpress.org/core/2025/03/06/speculative-loading-in-6-8/), primary). Browser support is in [CODE.md](CODE.md).
- **Redirect limits.** Cloudflare Pages Free allows 2,000 static and 100 dynamic redirects per project ([developers.cloudflare.com, Pages limits](https://developers.cloudflare.com/pages/platform/limits/), primary).

**Urd today.**
- **Per page:** a meta description and Open Graph fields (title, description, image) in the Pages panel, a noindex flag, and a marker on pages without a description.
- **At boot,** `seo.js` sets the description, canonical, the Open Graph fields with a fallback ladder, the X card and JSON-LD `Organization`. The calendar adds JSON-LD `Event`.
- **At publish,** Urd writes `sitemap.xml`, `robots.txt` and an RSS feed for each dated collection.
- **Also:** a document title per page, `html lang`, a noindex on admin, an Urd-owned static 404 page, and Speculation Rules sent as an HTTP header (prefetch and prerender, moderate).
- **Measured on the demo** (11 Oct 2026):
  - The HTML shell is 6.9 KB with no text until JavaScript runs, so crawlers and link previews that run no JavaScript see nothing.
  - All 64 engine modules are preloaded on every page: 769 KB raw, 262 KB gzip.
  - `base.css` is 354 KB raw (72 KB gzip), and about a tenth of its rules are editor or preview styles.
  - No 103 Early Hints were seen.
  - robots.txt has four lines and no AI lines; the sitemap has no `lastmod`; there is no llms.txt.
- **The `<noscript>` line** in the eight HTML shells is a Norwegian literal, whatever the site's language (code: `template/index.html:100`).

**Gaps.**
- **C13** Redirects (open).
- **C47** Baked HTML with the metadata and JSON-LD in it.
- **C48** Publish-time files for search engines and AI agents. Answering `Accept: text/markdown` would need a function; C48 covers static files only.
- **C49** Speed work on the visitor's stylesheet and headers.
- **C50** The page weight shown in the editor.
- **C51** Custom JSON-LD.
- **C52** Instant indexing (IndexNow).
- **C53** AI visibility tracking and SEO assistants.
- **C118** A site-wide «keep out of search engines» switch.
- Closed here: C3 and C54.

### 7. Forms and data

**The field (October 2026).**
- **Field libraries.** Field libraries with dropdowns, checkboxes, radios, dates and file upload are standard. Submissions are stored in the builder's dashboard with an email notification (earlier survey, no URL).
  - **Wix Forms** has contact fields (name, birthday, address, company, VAT ID), number, link, file upload, signature, star rating, image choice, a tag picker, date and time, and payment fields. Form rules make fields conditional, and forms can have several steps ([support.wix.com, form fields](https://support.wix.com/en/article/wix-forms-managing-your-form-fields), primary). File upload, signature and payment fields need Core or higher ([stylefactoryproductions, 11 Aug 2026](https://www.stylefactoryproductions.com/blog/wix-pricing), secondary).
  - **Squarespace** has 20 field types, among them address, website, number, time, currency, hidden, a 5-point survey and file upload (10 MB). It also has follow-up questions (conditional logic) and reCAPTCHA on by default. Entries go to Contacts, email, Google Sheets, Zapier or Mailchimp ([support.squarespace.com, form fields](https://support.squarespace.com/hc/en-us/articles/205814018-Form-fields-explained), primary).
  - **Framer's** native forms have text, text area, email, number, phone, URL, date, time, checkbox, radio and select. They send to email, Google Sheets or a webhook, have spam protection and rate limiting, and redirect, show an overlay or update on submit ([framer.com/help, form fields](https://www.framer.com/help/articles/add-different-field-types-to-native-form/), primary).
  - **Jetpack** has 18 field types, among them a slider, rating, file upload, hidden and a terms-consent field. It also has multiple steps, conditional logic, response storage and notifications ([jetpack.com](https://jetpack.com/support/jetpack-blocks/contact-form/), primary).
  - **Tilda** adds quizzes with branching, polls, a price calculator and multi-step forms ([tilda.cc/en/features](https://tilda.cc/en/features/), primary).
- **Spam.**
  - Webflow offers reCAPTCHA, Cloudflare Turnstile, a honeypot and spam filtering, with rate limiting and IP reputation since March 2026 ([help.webflow.com, spam prevention](https://help.webflow.com/hc/en-us/articles/34277758554771), primary, search extract).
  - Webflow Conf 2025 added per-form notification preferences and a spam inbox ([community.webflow.com](https://community.webflow.com/updates/post/webflow-conf-2025-recap-everything-we-announced-7cOUvmz6EGiMlL4), primary).
- **Plan gates.** Form file upload sits in Webflow's Premium plan ([brixtemplates](https://brixtemplates.com/blog/webflow-may-2026-pricing-changes-explained), secondary). Carrd needs Pro Standard ($19 a year) for forms and Pro Plus ($49) for advanced forms ([carrd.com/pro](https://carrd.com/pro), primary).
- **Processors.** A form endpoint provider is a data processor under GDPR art. 28, so an agreement is needed; see [13. Privacy and compliance](#13-privacy-and-compliance).

**Urd today.**
- **The form block** has the fields text, email, phone, textarea, select, checkbox, radio and date, with required fields, validation and a honeypot.
- **Delivery.** It sends by mailto or to an external endpoint, and the endpoint mode can post to any webhook.
- **The checkout** has its own fixed fields (name, email, phone, comment), the same two send modes (mailto or an endpoint) and its own honeypot (code: `blocks/checkout.js:76`).

**Gaps.**
- **C55** More field types, conditional fields, multiple steps and a redirect after sending.
- **C56** Spam protection through the site's own function.
- **C57** Submission storage, file upload, and payment and booking fields.
- **C58** Recipes for sending forms on to other services.
- The consent field, the newsletter preset and the mailto warning are under privacy (C88).
- Closed here: C5.

### 8. CMS, collections and blogs

**The field (October 2026).**
- **Webflow CMS**
  - 16 field types, among them references and multi-references ([developers.webflow.com, field types](https://developers.webflow.com/data/reference/cms/collection-fields/create), primary).
  - Item pages generated from one template per collection (earlier survey, verified July 2026, no URL).
  - Since 9 Apr 2025, 40 collection lists per page and 10 nested lists of up to 100 items each, three levels deep ([webflow.com/blog](https://webflow.com/blog/next-gen-cms-all-customers), primary).
  - The Premium plan of 13 May 2026 holds 20,000 items in 40 collections ([brixtemplates](https://brixtemplates.com/blog/webflow-may-2026-pricing-changes-explained), secondary).
- **Wix CMS**
  - About two dozen field types: address, array, audio, boolean, colour, date, date and time, document, email, image, media gallery, number, object, rich content, rich text, single and multi-reference, tags, text, time, URL and video ([dev.wix.com, data types](https://dev.wix.com/docs/api-reference/business-solutions/cms/data-types-in-wix-data), primary).
  - Dynamic pages with field variables in the slug, a scheduled status switch, CSV import and export, and role-based collection permissions (earlier survey, verified July 2026, no URL).
  - In 2026: item-page design variants (1 Jun), localised slugs (22 Jul), and CMS drafts with change requests (13 Aug) ([wix.com/updates](https://www.wix.com/updates?page=2), primary).
  - Wix Harmony supports neither CMS nor Multilingual yet ([support.wix.com](https://support.wix.com/en/article/about-the-new-wix-harmony-editor), primary).
- **Framer CMS**
  - Typed fields, Markdown import and export, editing on the live site, and a CMS agent ([framer.com/developers/cms](https://www.framer.com/developers/cms), primary).
  - Visitor filters with nine control types, and conditional detail pages (earlier survey, verified July 2026, no URL).
  - CMS 3.0 added inline table editing and bulk actions ([framer.com/updates/cms-3.0](https://framer.com/updates/cms-3.0), primary).
  - The List Field (8 Sep 2026) adds repeating groups ([framer.com/updates](https://www.framer.com/updates), primary).
- **Figma Sites CMS** (public beta, 20 Nov 2025) has collections, CMS pages, lists and CSV import ([help.figma.com](https://help.figma.com/hc/en-us/articles/36392861675287-Figma-Sites-collection-Introduction-to-Figma-Sites-CMS), primary).
- **Ghost**
  - Ghost 6.0 brought native search, edit history and internal linking ([ghost.org/changelog/6](https://ghost.org/changelog/6/), primary).
  - It has scheduled publishing and newsletters, and since 27 May 2026 threaded comments with votes and pins ([ghost.org/changelog](https://ghost.org/changelog/), primary).
- **Blogs and search.**
  - Blogs have categories, tags, several writers and scheduled posts at Wix ([wix.com/features/main](https://www.wix.com/features/main), primary). Tilda's feeds add a per-feed sitemap and a time-zone setting ([tilda.cc/en/features](https://tilda.cc/en/features/), primary).
  - Site search is on Framer Pro ([framer.com/pricing](https://www.framer.com/pricing), primary), native in Ghost 6 ([ghost.org/changelog/6](https://ghost.org/changelog/6/), primary), and at Squarespace, Wix and Webnode ([Part 2](#part-2-the-function-catalogue)).
- **Multilingual content.**
  - Wix Multilingual covers 130+ languages with auto-translation ([support.wix.com](https://support.wix.com/en/article/wix-multilingual-auto-translating-your-site), primary).
  - Framer Localization auto-translates the canvas and the CMS, translates page paths, picks the locale automatically and writes hreflang ([framer.com/updates/auto-translate](https://framer.com/updates/auto-translate), primary), at $20 per locale ([framer.com/pricing](https://www.framer.com/pricing), primary).
  - Webflow Localize costs $9 to $29 per locale per month ([flowninja](https://www.flowninja.com/blog/webflow-localization), secondary).
- **Import.** WordPress imports from Blogger, LiveJournal, Movable Type, TypePad and Tumblr ([wordpress.org/about/features](https://wordpress.org/about/features/), primary). Duda imports content ([duda.co/pricing](https://www.duda.co/pricing), primary).

**Urd today.**
- **Collections:**
  - five kinds: news, notices, publications, products and custom
  - three views: cards, list and archive
  - rich fields and inline editing
  - git-owned data, with no artificial cap (git is the limit)
- **Editing safety:** drafts across pages, history and undo, and a conflict warning.
- **Data in and out:** CSV import and export, and RSS for dated collections.
- **Events:** the calendar block covers them from ICS feeds.
- **Languages:**
  - Visitor and admin texts in nb, nn, en-GB, se and tr ([ADR-0012](../adr/0012-multilingual.md)), with bokmål as the fallback.
  - New languages come as language-pack plugins (lang-sv).
  - The content has one language per site.

**Gaps.**
- **C4b** Entry pages (open). Authors come with them.
- **C24** Archiving and entry states (open).
- **C25** Collection filters (open). Categories and tags come with them.
- **C59** Typed custom fields per collection.
- **C60** Events as a collection kind.
- **C61** Site search.
- **C62** Markdown import and export.
- **C63** Multilingual content.
- **C64** Import from an existing site.
- **C117** A featured flag and an excerpt on entries.
- **C120** A podcast feed.
- **C128** Previous and next between entry pages.
- Scheduled publishing is under [15. Collaboration, publishing and handover](#15-collaboration-publishing-and-handover).
- Closed here: C4 and C12.

### 9. Shop and payments

**The field (October 2026).**
- **Shopify is the benchmark.**
  - Unlimited products, Markets, Shopify Payments with Klarna and MobilePay, and point of sale ([shopify.com/pricing](https://www.shopify.com/pricing), primary).
  - Agentic Storefronts in ChatGPT, Copilot, Perplexity and Gemini, the Universal Commerce Protocol and a Checkout MCP ([shopify.com/news](https://www.shopify.com/news/winter-26-edition-agentic-storefronts), primary).
- **Wix** has inventory, variants, digital goods, subscriptions, abandoned-cart recovery, 80+ gateways, coupons and POS ([wix.com/ecommerce/features](https://www.wix.com/ecommerce/features), primary). Payments and e-commerce start on Core at $29 a month ([stylefactoryproductions, 11 Aug 2026](https://www.stylefactoryproductions.com/blog/wix-pricing), secondary). Wix takes no transaction fee of its own (earlier survey, no URL).
- **Squarespace**
  - Charges a 2% store fee on Basic and none on Core and Advanced.
  - Has abandoned-cart recovery, a mini cart, express checkout, checkout on the site's own domain, product status labels and pay links on every plan.
  - Keeps a reserved cart with a timer for Advanced ([squarespace.com/pricing](https://www.squarespace.com/pricing), primary).
- **Webflow Ecommerce** has a 2% fee on the lowest store plan and no native abandoned-cart recovery ([webnomads, 7 Jul 2026](https://www.webnomads.com/resources/webflow-pricing), secondary). Its 2026 status is contradictory in the sources (unverified).
- **Framer** has no native shop: stores rely on Shopify plugins ([swell.is](https://www.swell.is/content/best-framer-ecommerce-plugins), secondary).
- **Webflow memberships and subscriptions.** Webflow removed User Accounts on 29 Jan 2026, and store subscriptions went with them ([help.webflow.com](https://help.webflow.com/hc/en-us/articles/36046006227731), primary).
- **Ghost** takes no fee of its own on paid subscriptions and tips ([ghost.org/pricing](https://ghost.org/pricing/), primary).
- **Vipps.**
  - Vipps MobilePay has sold Checkout to Kustom: «Vipps MobilePay Checkout is discontinued on April 30, 2027». Vipps stays available as a payment method inside Kustom Checkout ([kustom.co FAQ, read 11 Oct 2026](https://www.kustom.co/kustom-vipps-faq), primary; [Checkout API](https://developer.vippsmobilepay.com/docs/APIs/checkout-api/) and [technical updates 2026-06](https://developer.vippsmobilepay.com/docs/technical-updates/2026-06/), primary).
  - Current prices: payment links 2.49% + 1 NOK, donations 1.99% + 1 NOK, recurring payments 2.99% + 1 NOK, Vippskassa 1.75% ([vippsmobilepay.com/nb-NO/pricing](https://vippsmobilepay.com/nb-NO/pricing), primary).
  - The Get paid app is included in a Vippsnummer ([vippsmobilepay.com/nb-NO/get-paid](https://vippsmobilepay.com/nb-NO/get-paid), primary).
- **Shopping feeds.** Squarespace (Google Shopping on Core), Wix (Google Merchant Center), Shopify and Webnode (price-comparison feeds) have them ([Part 2](#part-2-the-function-catalogue)).

**Urd today.**
- **The catalogue** is a collection: price, member price, badge, and sizes and colours with their own image.
- **Products** show as cards with variant chips and a quick view in a `<dialog>`.
- **The cart** is a block and an icon in the nav, kept in localStorage, with a drawer on `<dialog>`.
- **The checkout** is an order form (mailto or endpoint) with a Vipps number as an instruction, and a receipt at `?ordered=1`. The core has no payment gateway.
- **Optional payment layer:** Vipps Checkout through the site's own function ([ADR-0020](../adr/0020-optional-payment-layer-vipps-checkout.md)). `template/functions/api/vipps/checkout.js:64` calls `checkout/v3/session` (code), the API that ends on 30 April 2027.
- **Presets:** the shop section presets (products, shop, shop hero, shop categories, shop trust, shop showcase, checkout) and the page starter packs Shop, Shop front and Checkout.
- **Compared with Framer,** which has no shop at all, Urd's form checkout already does more.

**Gaps.**
- **C65** Moving the optional payment layer off Vipps Checkout before 30 April 2027.
- **C66** Product pages.
- **C67** Shop extensions.
- **C68** Commerce at gateway scale.
- **C69** A static product feed.
- **C129** Variants with their own price and stock, and sold out.
- **C130** Static shipping tables with pickup.
- **C131** Discount codes.
- **C132** MVA as a seller switch, and the before price.
- **C133** The owner's notice and the buyer's confirmation.
- **C134** Shop terms and the withdrawal form.
- **C136** Reserve at payment, capture on shipping, and a test mode.
- **C137** A buy-now button.
- **C138** Order export (not taken).
- **C139** Paid registration as a dated product (to be weighed).
- Donations are under associations (C111). The org.nr. rule for shops and the lottery rule are under [13. Privacy and compliance](#13-privacy-and-compliance).
- Closed here: C135.

### 10. Motion and effects

**The field (October 2026).**
- **Webflow Interactions** run on GSAP.
  - They have triggers, timelines, SplitText and ScrollTrigger, and control per breakpoint, reduced-motion settings, page scoping and when the animation code loads ([webflow.com/updates](https://webflow.com/updates/more-control-over-interactions-with-gsap), primary).
  - GSAP became free, SplitText included, on 30 Apr 2025 ([webflow.com/blog](https://webflow.com/blog/gsap-becomes-free), primary).
  - Popovers built on the Popover API and anchor positioning were announced in Sep 2026 ([we-r.co](https://www.we-r.co/en/blog/nouveautes-designer-webflow-conf-2026), secondary).
- **Framer** has appear, hover, press, drag, loop and scroll animations, scroll transforms, text effects by character, word or line, and custom cursors ([framer.com/features/design](https://framer.com/features/design/), primary). It added shaders on 24 Mar 2026 ([creativeainews](https://www.creativeainews.com/blog/framer-shaders-animated-web-design/), secondary). A site-wide setting turns parallax, transforms and animations off for reduced-motion users ([framer.com/help](https://www.framer.com/help/articles/guide-to-web-accessibility-in-framer), primary).
- **Squarespace Finish Layer** has block animations on scroll, hover, click and cursor, and transforms; a 3D mode is announced ([squarespace.com/blog](https://www.squarespace.com/blog/finish-layer-website-design-tools), primary). It needs a 7.1 site with Fluid Engine ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/47427542388621), primary).
- **Wix**
  - Wix Studio has entrance, scroll, loop, hover, click and mouse effects, WebGL effects on media backgrounds and Spline embeds ([support.wix.com](https://support.wix.com/en/article/studio-editor-about-animations), primary).
  - Wix open-sourced `@wix/interact` (MIT): triggers and effects as declarative JSON on WAAPI and ViewTimeline ([github.com/wix/interact](https://github.com/wix/interact), primary).
- **Others.**
  - Webstudio uses native CSS scroll-driven animations with a polyfill fallback ([webstudio.is/blog](https://webstudio.is/blog/native-scroll-driven-animations), primary).
  - Elementor 4 Pro Interactions trigger on load, scroll into view, while scrolling, hover and click, per breakpoint ([elementor.com/blog, 15 Apr 2026](https://elementor.com/blog/editor-40-atomic-forms-pro-interactions/), primary).
  - Readymag has four trigger types and a Lottie widget ([blog.readymag.com](https://blog.readymag.com/recap-2025/), primary).
  - WordPress 7.1 ships View Transitions as a feature plugin ([Roadmap to 7.1](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/), primary).
- **What the published pages do** (measured, 11 Oct 2026):
  - Framer renders entrance-animated elements at `opacity:0.001` until its JavaScript runs, Figma Sites at `opacity:0`, and Webflow hides them with `visibility:hidden` until its runtime class arrives.
  - Webstudio keeps its animations in pure CSS inside `prefers-reduced-motion: no-preference`.
  - Shopify Horizon uses `@starting-style` and the most complete cross-document View Transitions measured.

**Urd today.**
- **Entrance:** fade in, slide up and zoom in, with duration and delay; stagger for card groups.
- **Hover:** hover lift.
- **Backgrounds:**
  - parallax (scroll-driven CSS behind `@supports`, with a requestAnimationFrame fallback) and an animated gradient
  - Ken Burns and drift on the image layer, and five motions on the image gallery layer
- **Ribbon:** a ribbon block and a ribbon gallery view, with a pause button that stays, as on the gallery band and the slideshow.
- **Pages:** cross-document View Transitions.
- **Reduced motion** is respected everywhere, and plugins can add motion.

**Gaps.**
- **C70** A scroll-scrubbed entrance as a choice of its own.
- **C71** Mouse effects, keyframe timelines, shaders, Lottie and 3D.
- **C125** A site-wide motion default.
- Animated headlines and a count-up timer are elements ([ELEMENTS.md](ELEMENTS.md)).
- Click-opened popups come with the ER-A disclosure stage ([ELEMENTS.md](ELEMENTS.md)).
- A motion intensity setting is in the design presets (C35), and a site-wide pause is C79.
- The hidden start state of entrance animations moves under a JavaScript class with the baking (C47).
- Closed here: C7b and C20.

### 11. Templates

**The field (October 2026).**
- **Squarespace**
  - About 200 templates (earlier survey, no URL).
  - Site Themes bundle a palette, a font pairing, a button style and an animation package, and a Layout Switcher swaps layouts ([searchenginejournal](https://www.searchenginejournal.com/squarespace-rolls-out-new-ai-tools-for-seo-and-design/557220/), secondary).
  - Blueprint AI generates a start ([Refresh 2025](https://www.squarespace.com/blog/squarespace-refresh-2025-product-releases), primary).
- **Galleries and ecosystems.** Every large builder has template switching and a gallery. Publii has a theme library of its own, and GrapesJS and Silex get templates through plugins (earlier survey, no URL).
- **Twenty Twenty-Five** keeps the design system as data: theme.json with 36 style variations, 98 patterns, 8 templates and 7 template parts ([github.com/WordPress/twentytwentyfive](https://github.com/WordPress/twentytwentyfive), code).
- **Export and sharing.**
  - WordPress exports a theme as a zip ([wordpress.org, site editor](https://wordpress.org/documentation/article/site-editor/), primary).
  - Bricks 2.4 transfers global data as a ZIP ([Bricks 2.4](https://bricksbuilder.io/release/bricks-2-4/), primary), and Bricks has wireframes and design sets ([Bricks 2.0](https://bricksbuilder.io/release/bricks-2-0/), primary).
  - Wix Studio shares design libraries across a workspace ([support.wix.com](https://support.wix.com/en/article/studio-editor-creating-and-managing-design-libraries), primary).

**Urd today.**
- **Presets:** 39 section presets with thumbnails, and «Change layout».
- **Starter packs:** eight page starter packs: landing, about, contact, portfolio, event, shop, shop front and checkout (code: `page-presets.js`).
- **Your own templates.**
  - «Save as template» works for sections, block groups and pages. It saves to `content/maler/`, and every insert is an independent copy.
  - Templates can also ship as plugins.
  - The block picker has search.
- **The template repo** is the starting point («Use this template»). Shared templates and plugins are found by the GitHub topics `urd-template` and `urd-plugin`.

**Gaps.**
- **C72** Exporting templates, and whole-site templates.
- **C73** Wireframes.
- **C74** A gallery site for community templates and plugins.
- **C126** Start over.

### 12. Accessibility

**The field (October 2026).**
- **Audit tooling at the builders.**
  - **Webflow's Audit panel** started with missing alt text, empty links and skipped heading levels. It now runs sitewide and per page, audits the asset library, shows outstanding items in the Publish menu and lets items be ignored ([webflow.com/updates](https://webflow.com/updates/find-and-fix-accessibility-issues-with-new-audit-panel), primary). Webflow's colour picker shows the contrast ratio against AA and AAA ([webflow.com/updates](https://webflow.com/updates/check-text-accessibility-with-built-in-color-contrast-ratio-tool), primary), and it has a Vision preview ([Part 2](#part-2-the-function-catalogue)).
  - **Wix's Accessibility Wizard** scans the site and lists detected issues and manual tasks (contrast, headings, alt text, navigation). Wix disclaims any compliance guarantee ([support.wix.com](https://support.wix.com/en/article/accessibility-about-the-accessibility-wizard-in-the-studio-editor), primary).
  - **Elementor Ally** (Nov 2025) runs 180+ WCAG 2.1 AA checks with AI fix suggestions ([TechRadar](https://www.techradar.com/pro/website-building/elementor-just-made-it-easier-to-improve-website-accessibility), secondary; [wordpress.org/plugins/pojo-accessibility](https://wordpress.org/plugins/pojo-accessibility/), primary).
  - **Framer** has an accessibility panel with semantic tags, alt text and the reduced-motion setting ([framer.com/help](https://www.framer.com/help/articles/guide-to-web-accessibility-in-framer), primary).
  - **Duda** has a contrast checker and AI alt text, and leaves WCAG scanning to UserWay or AudioEye ([duda.co/accessibility](https://www.duda.co/accessibility), primary).
  - **Squarespace** has no native auditor: its SEO Scanner flags missing alt text ([Refresh 2025](https://www.squarespace.com/blog/squarespace-refresh-2025-product-releases), primary).
  - **WordPress 7.1** added accessible tooltips and toggletips, and a «decorative» toggle on images ([developer.wordpress.org, Aug 2026](https://developer.wordpress.org/news/2026/08/whats-new-for-developers-august-2026/), primary).
- **The published output** (measured, 11 Oct 2026).
  - Skip links are at Squarespace, Horizon, Dawn, WordPress, Bricks, Astro, red.org and webflow.com, and missing at Wix and Urd.
  - Figma Sites has no content headings, 87 `div role=link` and 165 of 168 images with empty `alt`. It is also criticised for accessibility attributes that do not reach the live page ([uxdesign.cc](https://uxdesign.cc/figma-sites-when-accessibility-is-an-afterthought-070ba3b41553), secondary).
  - Framer and Wix duplicate their h1 through breakpoint variants. Hostinger's sample page and 404media have no h1.
- **Keyboard-operable editors.** WordPress, Squarespace, Figma Sites, Bricks and Webflow can be run from the keyboard: region navigation, Tab through panels, and box select ([Part 2](#part-2-the-function-catalogue)).
- **The Norwegian rules.**
  - **The law.** Likestillings- og diskrimineringsloven § 18 requires universal design of ICT main solutions unless it is an «uforholdsmessig stor byrde» ([lovdata](https://lovdata.no/lov/2017-06-16-51/§18), primary, not fetchable; wording via [Bergen kommune](https://www.bergen.kommune.no/hvaskjer/tema/universell-utforming-av-ikt/lovverk-og-styrende-dokumenter-), secondary). The detail is in «forskrift om universell utforming av IKT-løsninger» ([lovdata](https://lovdata.no/dokument/SF/forskrift/2013-06-21-732), primary, not fetchable).
  - **Associations are covered.** «Både private og offentlige virksomheter, lag og organisasjoner må følge regelverket» ([uutilsynet.no](https://www.uutilsynet.no/regelverk/regelverk-og-krav/746), primary). The rules apply to a main solution aimed at users in Norway that supports the organisation's ordinary functions, login-protected and member-only solutions included ([uutilsynet.no, updated 10 Jun 2026](https://www.uutilsynet.no/regelverk/kva-seier-forskrifta/153), primary).
  - **The level.** The private sector, associations included, must meet WCAG 2.0 A and AA: 35 success criteria, since audio description and live captions are exempt. Captions for prerecorded video and alternatives for prerecorded audio are therefore among the 35 (inferred: WCAG 2.0 has 38 criteria at A and AA, and the exempt ones are 1.2.3, 1.2.4 and 1.2.5). The public sector meets WCAG 2.1 through EN 301 549, which adds 12 criteria (same source).
  - **Exceptions:** documents published before 1 Feb 2022, live content, maps when the essential information is available elsewhere, archives not updated after 1 Feb 2022, and third-party content outside the organisation's control ([uutilsynet.no, updated 27 Mar 2025](https://www.uutilsynet.no/regelverk/unntakene-fra-universell-utforming-av-ikt/2248), primary). So minutes and annual reports uploaded as PDFs after 1 Feb 2022 must be accessible themselves.
  - **WCAG 2.2** «er ikke en del av regelverket nå, og dette endrer seg ikke på kort sikt» ([uutilsynet.no, 8 Nov 2023](https://www.uutilsynet.no/fremtidig-regelverk/status-nyere-versjoner-av-wcag/1868), primary).
  - **The EAA** is not in Norwegian law: «EAA er ikkje teke inn i EØS-avtalen enno og derfor heller ikkje gjennomført i norsk rett» ([uutilsynet.no, updated 1 Oct 2025](https://www.uutilsynet.no/tilgjengelighetsdirektivet-eaa/eus-tilgjengelegheitsdirektiv-eaa/268), primary). In the EU it has applied to consumer products and services since 28 Jun 2025 ([iubenda](https://www.iubenda.com/en/help/179096/-eaa-compliance), secondary); the passes disagree on whether microenterprises are exempt for services (iubenda) or only for product duties (the associations pass, from uutilsynet.no), so the exemption is unverified. A Norwegian seller into the EU must still comply. A secondary site that claims Norway enacted the EAA in 2024 contradicts the regulator and is disregarded.
  - **The tilgjengelighetserklæring** is a public-sector duty only, made on uustatus.no ([uutilsynet.no, updated 25 Mar 2026](https://www.uutilsynet.no/webdirektivet-wad/krav-om-tilgjengelegheitserklaering/267), primary). The Web Accessibility Directive has applied in Norway since 1 Feb 2023 and is the basis of the public-sector rules ([uutilsynet.no](https://www.uutilsynet.no/regelverk/regelverk-og-krav/746), primary).

**Urd today.**
- **The published site.**
  - The nav follows the disclosure pattern with `aria-expanded` ([ADR-0010](../adr/0010-disclosure-navigation.md)), and the full-screen mobile menu, the lightbox, the quick view and the cart drawer use `<dialog>`.
  - Reduced motion is respected, and the ribbon, the gallery band and the slideshow have a pause button that stays.
  - `base.css` has 24 `:focus-visible` rules (measured).
  - The page has a `lang` attribute and one DOM for every width, so nothing is duplicated per breakpoint.
  - With «Text on accent» on Auto, the accent text comes from `contrast-color()` behind `@supports`, with the background colour as fallback (code: `theme.js`); a set «Text on accent» colour is used as it is.
- **Missing on the published site:** a skip link (measured), a «decorative» choice on images, and captions for a self-hosted video (`blocks/video.js` writes no `<track>`, code).
- **The editor** is not accessible yet (code, 11 Oct 2026).
  - The Svelte files hold 380 `<label>` tags and not one `for` attribute.
  - There are four `:focus-visible` rules.
  - Controls built as button components inside a `<label>` get no reliable accessible name.
  - The canvas has keyboard moves, the right-click menu opens from the keyboard (Shift+F10 or the ContextMenu key), and 1, 2 and 3 reach the element menu's areas; there is no keyboard path between panels, blocks and the toolbar.
- **Quality tooling:** only the marker on pages without a meta description.

**Gaps.**
- **C17** Accessibility in the editor (open).
- **C75** An audit panel.
- **C76** AA and AAA contrast in the colour picker.
- **C77** A «decorative» toggle on images.
- **C78** A skip link.
- **C79** A site-wide pause for motion.
- **C80** Keyboard navigation between the regions of the editor.
- **C81** Captions for self-hosted video and transcripts for audio.
- **C82** A vision simulation.
- **C83** A voluntary «Tilgjengelighet» page.
- Closed here: C15.

### 13. Privacy and compliance

**The field (October 2026).**
- **GDPR and member data.**
  - Datatilsynet uses a member association as its worked example. Names are necessary for the membership contract; extras such as a postcode may rest on legitimate interest. Consent cannot be swapped for another basis afterwards ([datatilsynet.no, updated 17 Mar 2026](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/behandlingsgrunnlag/), primary).
  - Associations with political, religious, philosophical or trade-union aims may process their members' special-category data under GDPR art. 9(2)(d), but may not disclose it outside the association without consent ([eur-lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj), primary).
  - Every association is covered, registered or not; voluntary work brings no exemption ([legiscope](https://www.legiscope.com/blog/personvern-frivillige-foreninger.html), secondary).
  - A child can consent to information-society services from 13 (personopplysningsloven § 5, [lovdata](https://lovdata.no/lov/2018-06-15-38/§5), primary, not fetchable).
  - **The privacy notice** must give: contact details; the categories and sources of data; the purposes and the legal basis for each; retention; recipients; transfers to third countries; the rights (access, rectification, erasure, restriction, portability, objection, withdrawal of consent); the right to complain to Datatilsynet; and any automated decisions ([datatilsynet.no, updated 28 Mar 2025](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/informasjon-og-apenhet/hva-skal-virksomheten-gi-informasjon-om/), primary).
  - **Form endpoints.** A form endpoint provider is a data processor, so it needs a GDPR art. 28 agreement, and a provider outside the EEA raises the transfer rules of chapter V ([eur-lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj), primary).
- **Photos of people.**
  - Portraits need consent before they are shared. Situation pictures from events of general interest, such as concerts, sports and parades, may as a rule be published without consent if they are harmless. Children need a guardian's consent ([datatilsynet.no, updated 16 Sep 2025](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/deling-av-bilder/), primary).
  - Åndsverkloven § 104 protects the portrait right for the subject's life plus 15 years (same source).
  - Abakus stores photo consent per semester and per channel, website or social media ([lego `users/models.py`](https://raw.githubusercontent.com/webkom/lego/master/lego/apps/users/models.py), code).
- **Cookies and similar storage: ekomloven § 3-15, in force from 1 Jan 2025** ([lovdata](https://lovdata.no/lov/2024-12-13-76/§3-15), primary, not fetchable).
  - Storing or reading information on the visitor's device needs prior consent that is valid under GDPR. That covers cookies, local storage, pixels and fingerprinting.
  - Refusing must be as easy as accepting.
  - There are only two exceptions: pure transmission, or what is strictly necessary for a service the visitor asked for. Nkom's examples are login, shopping carts, language choice and security ([nkom.no, updated 16 May 2025](https://www.nkom.no/internett/informasjonskapsler-cookies), primary).
  - Datatilsynet judges the consent; Nkom judges the technical scope ([datatilsynet.no, updated 3 Apr 2025](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/bruk-av-informasjonskapsler-og-andre-sporingsteknologier/), primary).
- **What § 3-15 means for analytics beacons and embeds.**
  - **Analytics.** Analytics falls under GDPR anyway, since IP addresses are personal data ([datatilsynet.no, updated 23 Apr 2025](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/rad-for-analyse-og-sporing-pa-nettsted/), primary). The EDPB's Guidelines 2/2023 (adopted 16 Oct 2024) read «access» in ePrivacy art. 5(3), which § 3-15 implements, to include making the device send information, for example through JavaScript or a pixel ([edpb.europa.eu](https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-22023-technical-scope-art-53-eprivacy-directive_en), primary). Cloudflare Web Analytics uses no cookies, no localStorage and no fingerprinting, but it does use a JavaScript beacon ([cloudflare.com/web-analytics](https://www.cloudflare.com/web-analytics/), primary). No Norwegian ruling on beacon analytics was found; the careful reading is that a beacon may fall under § 3-15.
  - **Embeds.** YouTube's privacy-enhanced mode only promises that views will not personalise YouTube or its ads ([support.google.com](https://support.google.com/youtube/answer/171780), primary). Independent tests report localStorage and IndexedDB writes by youtube-nocookie on page load, and cookies once the video plays ([axbom.com](https://axbom.com/embed-youtube-videos-without-cookies/), [consently.net](https://consently.net/blog/is-youtube-embed-gdpr-compliant), secondary). Whether the OpenStreetMap embed stores anything was not verified.
- **Consent tooling at the builders.**
  - Framer: a cookie banner component on Google Consent Mode v2 ([framer.com/learn](https://www.framer.com/learn/cookie-banner/), primary).
  - Wix: Usercentrics, which blocks non-essential scripts until consent ([support.wix.com](https://support.wix.com/en/article/about-privacy-cookies), primary).
  - Squarespace: a cookie banner on Core and up ([squarespace.com/pricing](https://www.squarespace.com/pricing), primary).
  - Webnode: a default cookie bar, terms and privacy templates, and GDPR-friendly forms ([webnode.com/features](https://www.webnode.com/features/), primary).
  - Jimdo: a legal text generator ([jimdo.com](https://www.jimdo.com/website/website-builder/), primary).
  - StyreWeb: a privacy and GDPR module for clubs ([styreweb.com](https://www.styreweb.com/), primary).
- **Marketing: markedsføringsloven § 15** ([lovdata](https://lovdata.no/lov/2009-01-09-2/§15), primary, not fetchable).
  - «Det er forbudt å sende reklame på e-post til personer som ikke er eksisterende kunder eller har takket ja til å motta slik markedsføring». The existing-customer exception covers only comparable products, and every message needs an unsubscribe option ([forbrukertilsynet.no, 19 Oct 2023](https://www.forbrukertilsynet.no/vi-jobber-med/telefonsalg-uonsket-reklame/sporsmal-svar-telefonsalg-uonsket-reklame), primary).
  - The ban applies to marketing «i næringsvirksomhet». Member information to members, such as a notice of the annual meeting or event news, is not commercial marketing. Merch sales, paid tickets, lotteries and sponsor offers sent to non-members need prior consent ([fundraisingnorge.no](https://fundraisingnorge.no/wiki/veileder-for-sms-epost-og-digitale-kanaler/), secondary).
- **The org.nr.: ehandelsloven § 8.**
  - Ehandelsloven § 8 requires an information-society service, such as a web shop, to make its name, address, email, the register it is in and its org.nr. «lett tilgjengelig» ([lovdata](https://lovdata.no/lov/2003-05-23-35/§8), primary, not fetchable).
  - Foretaksregisterloven § 10-2 requires the same of every foretak in Foretaksregisteret ([lovdata](https://lovdata.no/lov/1985-06-21-78/§10-2), primary, not fetchable).
  - An association without business activity is registered only in Enhetsregisteret, so the footer line is not strictly required for an information site. It is required in practice once there is a shop, and the org.nr. is needed for Grasrotandelen and Norid anyway.
  - Online shows its org.nr. on its about page ([online.ntnu.no](https://online.ntnu.no/om-linjeforeningen), primary).
- **Grasrotandelen.**
  - A player chooses a recipient, which gets 7% of the stake on lottery and Tipping games and 14% on some others ([norsk-tipping.no/grasrotandelen](https://www.norsk-tipping.no/grasrotandelen), primary).
  - Recipients are approved through Frivillighetsregisteret. An association may use web banners, Norsk Tipping's material and a statistics widget, but may not buy advertising space only to recruit grasrot donors. Payouts come three times a year once 300 kr has accrued ([norsk-tipping.no, for lag og foreninger](https://www.norsk-tipping.no/grasrotandelen/for-lag-og-foreninger), primary).
- **Lotteries.**
  - Without a permit, a lottery may turn over up to 200,000 kr gross per calendar year, must have a non-profit purpose and must be local or regional.
  - Digital platforms may not conduct the lottery, but «Du kan likevel bruke Vipps som betalingsløsning, eller sosiale medier for å informere om lotteriet» ([lottstift.no, updated 27 Jul 2026](https://lottstift.no/for-frivilligheten/lotteri-som-ikke-krever-tillatelse/), primary).
  - A private member's proposal of June 2026 asks to allow digital small lotteries ([stortinget.no](https://stortinget.no/no/Saker-og-publikasjoner/Publikasjoner/Representantforslag/2025-2026/dok8-202526-316s/), primary).
- **Copyright.**
  - Music in a video needs the performance right from TONO, the synchronisation right from the publisher and the recording right from the record company ([en.tono.no](https://en.tono.no/customers/online/), primary).
  - Kopinor's agreements do not cover publishing on the open web ([kopinor.no](https://www.kopinor.no/artikler/dette-er-kopinor/), primary).
- **Keeping documents.**
  - Bokføringsloven § 13 keeps primary documentation, annual accounts and annual reports for 5 years where the association must keep accounts ([lovdata](https://lovdata.no/lov/2004-11-19-73/§13), primary, not fetchable).
  - Vedtekter registered with Brønnøysund are public and must hold no personal data ([brreg.no](https://www.brreg.no/?p=3680), primary, search snippet).
- **Transport security** (measured, 11 Oct 2026). HSTS is near-universal among the builders measured: Framer, Hostinger and Webstudio send it with preload, and Squarespace for 180 days. ApeironLF sets it in `_headers` on the same host as Urd.

**Urd today.**
- **Defaults.**
  - No tracking and no third parties by default (measured). Analytics is optional: the site setting turns on Cloudflare Web Analytics, which is cookieless (`site.analytics.token`), and its two hosts are fixed in `_headers`.
  - The cart lives in localStorage, which fits Nkom's shopping-cart exception.
  - Urd keeps no member data: there is no server-side form storage.
  - The script CSP is the strictest measured: no `unsafe-inline`, and no outside script host except Cloudflare's analytics (measured).
- **What is missing.**
  - The video block inserts the youtube-nocookie or Vimeo `dnt=1` iframe at once, lazily loaded but with no click to load (code: `blocks/video.js:143`).
  - Forms send by mailto, which puts personal data in individual board members' inboxes.
  - There is no privacy page, no org.nr. field, and no HSTS header (measured).
  - The map block embeds OpenStreetMap's iframe at once (lazily), also with no click to load (code: `blocks/map.js:88`).
- **The editor bridge.** The preview's message listener checks `event.origin` and `event.source` (code: `urd.js:265` in the engine), like the editor side (code: `editor/src/lib/previewBridge.js:73`).
- **Correction:** «no tracking means no cookie banner» holds only while analytics and embeds are off. With the analytics beacon on, the answer is uncertain under the EDPB reading. An embed that writes local storage on page load needs consent.

**Gaps.**
- **C84** Click-to-load facades for video and other third-party frames.
- **C85** A privacy page generated from the site settings.
- **C86** Analytics disclosed when it is on, and consent asked only when analytics or embeds need it.
- **C87** Credit and consent fields on images, and a removal-request link.
- **C88** A mailto warning, and a newsletter sign-up preset with split consent.
- **C89** An org.nr. field shown in the footer.
- **C90** HSTS.
- Closed here: C91.
- The shop has no raffle product type, and it stays that way: the lottery rule forbids running the draw on a digital platform. The music-clearance rule belongs in the user guide.

### 14. Analytics and testing

**The field (October 2026).**
- **Built-in traffic analytics** is at nearly every hosted builder: Wix, Squarespace, Framer, WordPress.com, Webnode, Tilda, Jimdo, Strikingly, Carrd, Durable, Ghost, Square Online and Canva ([Part 2](#part-2-the-function-catalogue)). Ghost 6 has cookie-free native analytics ([ghost.org/changelog/6](https://ghost.org/changelog/6/), primary). Squarespace keeps advanced analytics for Core and up ([squarespace.com/pricing](https://www.squarespace.com/pricing), primary).
- **Framer.** Analytics history is kept 30 days on Free and Basic, 90 days on Pro, and without limit on Enterprise ([framer.com/pricing](https://www.framer.com/pricing), primary). The Convert add-on sells funnels, A/B tests with up to five variants, and triggers that show banners by referrer, change messages on set dates or show overlays by scroll depth, at $50 per 500,000 events ([framer.com/convert](https://www.framer.com/convert/), primary).
- **Webflow.**
  - Analyze has clickmaps, scrollmaps and goals and is cookieless, from $9; Optimize has A/B tests and personalisation, from $299 ([webnomads, 7 Jul 2026](https://www.webnomads.com/resources/webflow-pricing), secondary).
  - Analyze groups visits referred from ChatGPT, Claude, Gemini, Perplexity and Copilot ([webflow.com/updates](https://www.webflow.com/updates/goals-and-ai-traffic-insights), primary). Site Goals (21 Aug 2026) set «north-star» metrics ([webflow.com/updates](https://webflow.com/updates/site-goals-analyze-optimize), primary).
- **Testing changes before they go live.** Shopify's SimGym simulates AI shoppers to test theme changes ([shopify.com/news](https://www.shopify.com/news/winter-26-edition-merchant), primary). Rollouts publish a theme or checkout to a share of visitors, or A/B test two of them ([cake.agency](https://www.cake.agency/blog/shopify-spring-editions-2026), secondary).
- **Personalisation.** Duda's rules switch content by time, device, location, visit count and language ([support.duda.co](https://support.duda.co/hc/en-us/articles/26519232141207-Personalization-Rules), primary).
- **Third-party tags.** Google Analytics, Tag Manager and the Meta Pixel can be added at Wix, Framer, Webnode, Tilda, Notion Sites, Figma Sites, Hostinger and WordPress ([Part 2](#part-2-the-function-catalogue)). On a Carrd Pro site measured, user-added Stripe, Meta Pixel, Hotjar, Clarity and Google Analytics dominate the page weight (measured, 11 Oct 2026).

**Urd today.**
- **Analytics** is optional and cookieless (Cloudflare Web Analytics), and the Cloudflare dashboard shows visits and Core Web Vitals.
- **Not there:** A/B tests, funnels and personalisation.
- **Testing.** The engine's `node --test` suite covers the engine, the publishing guard, the contracts and the file invariants. The invariant it protects is that an Urd update never breaks a built site ([ADR-0005](../adr/0005-versioning-and-migration.md)).

**Gaps.**
- **C92** A/B tests, funnels, heatmaps and personalisation.
- **C93** Third-party tags (Google Analytics, Tag Manager, Meta Pixel, Hotjar).
- **C94** Test fixtures per block type and migration, and a seeded fuzz test.
- **C121** Analytics beyond the host's dashboard (not taken).
- Telling visitors about the analytics is C86. Core Web Vitals in the Cloudflare dashboard are a documentation recipe (C58). Date windows are C98.
- Closed here: C14.

### 15. Collaboration, publishing and handover

**The field (October 2026).**
- **Branching and staging.**
  - Framer 3.0 has git-style branches; agents work on isolated copies, and nothing goes live until a merge ([framer.com/help, branches](https://www.framer.com/help/articles/how-to-use-branches-in-framer/), primary). Staging, branch previews and roles are Pro features ([framer.com/pricing](https://www.framer.com/pricing), primary).
  - Webflow's page branching, design approvals and branch staging are Enterprise-only ([help.webflow.com](https://help.webflow.com/hc/en-us/articles/33961355506195), primary). Webflow has four separate ways to publish: the whole site, one page, one CMS item, or a branch merge ([brixtemplates](https://brixtemplates.com/blog/how-webflow-publishing-works-pages-cms-items-and-staging), secondary).
  - Wix added CMS drafts with change requests on 13 Aug 2026 ([wix.com/updates](https://www.wix.com/updates), primary).
  - Source by Webflow (2 Sep 2026, limited preview) is a governed workspace for teams that explicitly do not want git, branches and pull requests ([webflow.com/blog](https://webflow.com/blog/introducing-source-by-webflow), primary).
- **Revisions and comments.**
  - WordPress 7.0 has visual revisions with colour-coded inline diffs, a timeline slider and a mini-map ([gutenbergtimes](https://gutenbergtimes.com/wordpress-7-0-source-of-truth/), secondary). 7.1 adds revision sparklines and shareable revision URLs ([Roadmap to 7.1](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/), primary).
  - WordPress 6.9 added Notes on blocks with replies, mentions and resolve ([wpbeginner](https://www.wpbeginner.com/news/whats-new-in-wordpress-6-9/), secondary). 7.1 adds reactions, rich text and «apply suggestions» ([Roadmap to 7.1](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/), primary).
  - Webflow lets outside reviewers comment through comment-only links ([community.webflow.com](https://community.webflow.com/updates/post/webflow-conf-2025-recap-everything-we-announced-7cOUvmz6EGiMlL4), primary).
- **Real-time co-editing.** Webflow has it «even on the same page» (same source), and Wix Harmony shows live presence ([support.wix.com](https://support.wix.com/en/article/introducing-the-wix-harmony-editor), primary). WordPress pulled real-time collaboration from 7.0 on 8 May 2026 ([DreamHost](https://www.dreamhost.com/blog/wordpress-7-0/), secondary). It is still off in 7.1 ([developer.wordpress.org](https://developer.wordpress.org/news/2026/08/whats-new-for-developers-august-2026/), primary), because it needs WebSockets, which shared hosting rarely offers ([Seravo](https://seravo.com/en/wordpress-7-0-real-time-collaboration-ai/), secondary).
- **Roles and content-only editing.**
  - Wix has 27 named roles, custom roles and access scoped to a business location ([support.wix.com, roles](https://support.wix.com/en/article/roles-permissions-overview), primary).
  - Webflow has Owner, Admin, Site manager, Designer, Marketer, Content editor, Reviewer and Guest ([help.webflow.com, roles](https://help.webflow.com/hc/en-us/articles/41015530193811), primary, search extract).
  - WordPress 7.0 patterns default to content-only editing ([gutenbergtimes](https://gutenbergtimes.com/wordpress-7-0-source-of-truth/), secondary).
  - Framer sells content-editor seats at $10 a month ([framer.com/blog](https://www.framer.com/blog/ai-credits-simpler-plans-and-lower-prices/), primary). Wix Studio has client kits and a content mode ([wix.com/studio/features](https://www.wix.com/studio/features), primary).
- **Scheduled publishing.**
  - WordPress, Ghost, Webnode, Tilda and the Wix blog schedule posts ([Part 2](#part-2-the-function-catalogue)).
  - Wix CMS switches an item's status on a schedule (earlier survey, verified July 2026, no URL).
  - Framer's Convert triggers change messages on set dates ([framer.com/convert](https://www.framer.com/convert/), primary).
- **Single-page publishing.** Zoho Sites publishes single pages ([zoho.com/sites/pricing](https://www.zoho.com/sites/pricing.html), primary), and so does Webflow (above).
- **Costs and lock-in.**
  - A Framer user was charged $30 a month after inviting one editor ([siter.io](https://siter.io/framer-pricing), secondary).
  - Webflow users reported «320% bill increases» when bandwidth caps hit ([nocode.tech](https://www.nocode.tech/article/webflows-new-pricing-just-went-live-and-reddit-is-in-meltdown-heres-what-youll-actually-pay), secondary).
  - Wix «does not support the exporting of files… to an external destination or host» ([support.wix.com](https://support.wix.com/en/article/exporting-or-embedding-your-wix-site-elsewhere), primary).
- **Board handover** is the main operational risk for an association site.
  - **Checklists.** Handover checklists say to change «disponent og tilgang til nettbank» and to hand over the logins for social media and websites ([Sanitetskvinnene's checklist](https://sanitetskvinnene.no/sites/default/files/2023-12/Sjekkliste_for_overlapp_avtroppende_og_nytt_styre_i_en_lokalforening%20%281%29.pdf), primary to that organisation, read from a search snippet).
  - **GitHub.**
    - A free organisation has unlimited public and private repositories and collaborators ([docs.github.com, plans](https://docs.github.com/en/get-started/learning-about-github/githubs-plans), primary). Protected branches and required reviewers on a private repo need Team, but a public site repo gets them free (same source).
    - The owner role «should be limited, but to no less than two people» ([docs.github.com, roles](https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization), primary).
    - An organisation can require 2FA: members without it lose access, and outside collaborators are removed ([docs.github.com, 2FA](https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-two-factor-authentication-for-your-organization/requiring-two-factor-authentication-in-your-organization), primary).
    - The audit log covers 180 days ([docs.github.com, audit log](https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/reviewing-the-audit-log-for-your-organization), primary).
    - GitHub for Nonprofits excludes academic organisations, so student associations are likely outside it, while sports clubs and choirs may qualify ([docs.github.com](https://docs.github.com/en/nonprofit/quickstart), primary).
  - **Cloudflare.**
    - Pages Free gives 500 builds a month, 20,000 files, 25 MiB per file and 100 custom domains per project ([developers.cloudflare.com, Pages limits](https://developers.cloudflare.com/pages/platform/limits/), primary). Static requests are free and unlimited, and Functions count against the free 100,000 Workers requests a day ([developers.cloudflare.com, Functions pricing](https://developers.cloudflare.com/pages/functions/pricing/), primary).
    - A Free account has one Super Administrator and unlimited Administrators, who cannot manage billing or members ([developers.cloudflare.com](https://developers.cloudflare.com/fundamentals/get-started/setup/account-setup/manage-account-members), secondary, search snippet). So the Super Administrator should be an association mailbox, not a person.
    - Uninstalling Cloudflare's GitHub app stops new builds, and «a GitHub account should only point to one Cloudflare account» ([developers.cloudflare.com](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/), primary). That is one more reason for the repo to live in an association organisation.
  - **Norid.**
    - An organisation needs an org.nr. in Enhetsregisteret and a Norwegian postal address; a private person over 18 can also hold a domain ([norid.no](https://www.norid.no/no/nytt-domenenavn/hvem-kan-ha-domene/), primary). A forening, lag or innretning (FLI) is an eligible organisation form ([norid.no, appendix E](https://www.norid.no/en/om-domenenavn/regelverk-for-no/vedlegg-e/), primary).
    - A holder deleted from Enhetsregisteret loses its domains, and a holder change needs the new holder to qualify ([norid.no, rules](https://www.norid.no/en/om-domenenavn/regelverk-for-no/), primary). A domain registered privately by a board member is therefore a handover risk.
  - **Brønnøysund.** Since 28 Jan 2025 an association needs an org.nr. before it can register in Frivillighetsregisteret ([brreg.no](https://www.brreg.no/hvordan-kan-vi-hjelpe-deg/vare-skjema/veiledning-til-samordnet-registermelding-forenklet-skjema-for-foreninger/), primary, search snippet).
  - **Platform models.** NIF grants editing rights through official roles in Min idrett ([idrettsforbundet.no](https://www.idrettsforbundet.no/digital/), primary), and Spond Club gives each member roles and permissions ([spond.com](https://www.spond.com/en-us/news-and-blog/simplifying-member-registration-with-spond/), primary). The lesson: access should follow the elected role, not the person.

**Urd today.**
- **Who can edit:** GitHub users with write access to the repo who are also listed in `ALLOWED_LOGINS`, which every publishing endpoint checks; one publish is one commit through GitHub OAuth and Pages Functions ([ADR-0003](../adr/0003-publishing-via-github-oauth-and-pages-functions.md)).
- **Drafts and history.** Drafts span pages and are kept in the browser. A conflict warning protects them, and the publish history has «undo the last publish».
- **Git** is the audit log, the backup and the export. Updates arrive through the updater ([ADR-0014](../adr/0014-updater-model.md)).
- **Not there:** roles in the UI, comments, branches or staging beyond the admin preview, and scheduled publishing.

**Gaps.**
- **C95** Board handover.
- **C96** A content-only editing mode.
- **C97** Scheduled publishing.
- **C98** Date windows on blocks and the announcement bar.
- **C99** A pull request per draft, with a preview URL.
- **C100** Seeing who else is editing.
- **C101** Optimistic commits.
- **C102** Notes on blocks.
- **C103** A visual revision diff.
- **C104** Publishing a single page.
- **C105** Editing from a phone.
- **C115** Role email addresses that follow the board.
- **C127** A content check outside the editor.
- Page duplication is C40.

### 16. AI and agents

**The field (October 2026).** Two forms of AI meet in the builders. Generators turn a prompt into a first site that is then edited by hand. MCP servers and agents let an AI client read and change a site; that form became table stakes during 2026.
- **MCP is everywhere.**
  - **Framer 3.0** (16 Jun 2026): agents generate pages, manage the CMS, write SEO metadata and audit broken links and accessibility. External agents (Claude Code, Cursor, Codex, Gemini CLI, Windsurf) connect over MCP on the user's own model subscription and land their changes on automatically created branches ([creativeainews](https://www.creativeainews.com/articles/framer-3-agents-explained-2026/), secondary; [framer.com/blog](https://www.framer.com/blog/ai-credits-simpler-plans-and-lower-prices/), primary). Skills (22 Sep 2026) save design-system, writing and CMS instructions for reuse ([framer.com/updates](https://www.framer.com/updates), primary).
  - **Webflow's MCP server** went from 46 tools to 19 in v1.0.1 (17 Jan 2026), then to 30+ tools in v1.3 (21 May 2026), covering components, props, variants, branches and comments ([developers.webflow.com](https://developers.webflow.com/home/changelog/2026/5/21), primary). «Generate Agent Instructions» drafts brand, design-system, asset and CMS guidelines from the site (2 Sep 2026, [releases.sh](https://releases.sh/webflow/overview), secondary).
  - **WordPress 7.0** has a provider-agnostic AI Client, a Connectors screen and the Abilities API ([wordpress.org/news](https://wordpress.org/news/?p=20583), primary). The official MCP Adapter turns Abilities into MCP tools ([developer.wordpress.org](https://developer.wordpress.org/news/2026/02/from-abilities-to-ai-agents-introducing-the-wordpress-mcp-adapter/), primary). WordPress.com's MCP gained write access on 20 Mar 2026, with 19 operations, drafts by default, an activity log and opt-in per site and per capability ([TechCrunch](https://www.techcrunch.com/2026/03/20/wordpress-com-now-lets-ai-agents-write-and-publish-posts-and-more/), secondary).
  - **Wix MCP** searches docs, generates code, calls REST and creates, updates and publishes sites ([dev.wix.com](https://dev.wix.com/docs/api-reference/articles/ai-tools/wix-mcp/about-the-wix-mcp), primary). Critics call it «a documentation index plus a generic REST proxy» ([scalekit](https://www.scalekit.com/blog/wix-mcp-vs-api), secondary).
  - **Others.**
    - Duda opened MCP to all accounts on 8 Jul 2025 ([duda.co](https://www.duda.co/product-updates/join-the-mcp-beta-put-your-favorite-ai-assistant-to-work-for-you-in-duda), primary).
    - Hostinger ([hostinger.com/blog](https://www.hostinger.com/blog/?p=9775), primary) and Webnode ([webnode.com/features](https://www.webnode.com/features/), primary) run MCP servers.
    - Breakdance 3.0 has a setup wizard that connects an AI agent ([breakdance.com/releases](https://breakdance.com/releases/), primary).
    - Elementor's MCP is reported to save its output as drafts ([theplusaddons](https://theplusaddons.com/blog/what-is-the-elementor-mcp/), secondary, unverified).
    - Shopify has a Checkout MCP ([shopify.com/news](https://www.shopify.com/news/winter-26-edition-agentic-storefronts), primary).
    - The headless CMSes Sanity, Contentful, Storyblok, Strapi and Payload shipped MCP servers in 2026 (earlier survey, no URL).
  - **Agents write to drafts or branches by default** at Framer and WordPress.com, and reportedly at Elementor (unverified) (sources above).
- **Generators and vibe-coding.**
  - Onboarding is prompt-first at Wix Harmony, Squarespace Blueprint, Webflow, Hostinger, Durable and GoDaddy Airo ([Part 2](#part-2-the-function-catalogue)); B12 has one too (earlier survey, no URL). How generators are delivered in the editor is in [ELEMENTS.md](ELEMENTS.md#ai-and-wizards-as-delivery).
  - The vibe-coding tools Lovable ([lovable.dev](https://lovable.dev/blog/product-updates), primary), Replit Agent 4 ([docs.replit.com](https://docs.replit.com/updates/2026/03/13/changelog.md), primary), Bolt and v0 build apps from prompts.
  - The traditional builders answer with prompts plus visual edits: Wix Harmony, Framer agents, Duda Vibe, Canva Code, Tilda Vibe Block and Webflow AI code components.
  - Agent output tends towards generic designs and struggles with responsive navigation ([creativeainews](https://www.creativeainews.com/articles/framer-3-agents-explained-2026/), secondary).
- **Files for AI agents.** llms.txt, Markdown twins and Content-Signal are spreading; see [6. SEO and AI search](#6-seo-and-ai-search). Wix sites advertise a per-site MCP endpoint in their llms.txt, and Shopify Horizon publishes `rel=ucp`, `/agents.md` and an llms.txt (measured, 11 Oct 2026).
- **WebMCP** is a W3C Community Group proposal from Google and Microsoft.
  - Chrome 146 shipped an early preview behind a flag in Feb 2026, with a declarative form API that uses `toolname` and `tooldescription` attributes ([similarweb](https://aisearch.similarweb.com/blog/webmcp/), secondary).
  - Wix's WebMCP app registers site tools for agents in the visitor's browser: search the catalogue, build a cart, open checkout ([dev.wix.com](https://dev.wix.com/docs/develop-websites/articles/get-started/ai-agents/about-the-wix-web-mcp), primary).
  - The API is still moving: Wix's docs use `document.modelContext` while others say `navigator.modelContext`.

**Urd today.**
- **No AI, LLM or MCP code** is in the repo.
- **The plan** ([ADR-0017](../adr/0017-ai-via-local-mcp-server.md)) is a local, dependency-free MCP server in the cloned repo: a read part in v0.8 and a write part in v0.9. The site owner's own agent client connects to it; Urd sends nothing anywhere and stores no key.
- **A structural advantage:** the content already is git-owned JSON with schemas, so an agent needs no API key, hosted endpoint or session to work with it.

**Gaps.**
- **C16** The MCP server (open).
- **C106** Agent writes reviewed before they are published, typed abilities, and agent instructions returned by a read tool.
- **C107** WebMCP.
- **C108** Generators and AI inside the editor.
- llms.txt and Markdown twins are C48.

### 17. Associations

**The field (October 2026).**
- **The open-source student association sites.**
  - **Abakus (NTNU)** runs lego, a Django REST backend, and lego-webapp ([webkom/lego apps](https://github.com/webkom/lego/tree/master/lego/apps), code).
    - Its apps include events, job listings, meetings, companies, gallery, podcasts, quotes, surveys and search.
    - Event registration uses pools opened by class year, penalties and Stripe payments. Three or more penalties put a member straight on the waiting list; one penalty delays registration by 3 hours and two by 12 hours ([events `models.py`](https://raw.githubusercontent.com/webkom/lego/master/lego/apps/events/models.py), code).
    - `MembershipHistory` keeps the board history ([users `models.py`](https://raw.githubusercontent.com/webkom/lego/master/lego/apps/users/models.py), code).
  - **Online (NTNU)** archived onlineweb4 on 1 Oct 2025 and moved to monoweb ([github.com/dotkom/monoweb](https://github.com/dotkom/monoweb), code).
    - Its routes include arrangementer, bedrifter, fadderukene, for-bedrifter, interessegrupper, karriere and Offline (the magazine).
    - Attendance pools have year criteria; marks («prikker») have a weight and a duration; payments go through Stripe ([`schema.prisma`](https://raw.githubusercontent.com/dotkom/monoweb/main/packages/db/prisma/schema.prisma), code).
    - Its about page shows the committees, the contact details and the org.nr. ([online.ntnu.no](https://online.ntnu.no/om-linjeforeningen), primary).
  - **echo (UiB)** runs Next.js 16, a Go backend and Sanity ([echo-web-mono](https://github.com/echo-webkom/echo-web-mono), code).
    - Happenings have registration windows, spots by class year and an external link.
    - Meeting minutes are a required PDF, marked «Allmøte» or «Styremøte».
    - Five or more prikker give a three-month ban, and prikker expire after ten months.
    - The feedback form is anonymous by default.
    - echo's GitHub organisation keeps its vedtekter and guidelines as git repositories ([github.com/echo-uib](https://github.com/echo-uib), primary).
  - **Samfundet (Trondheim), Samfundet4** has events, its own ticketing, recruitment, venues with opening hours and closed periods, menus, table reservations, and a «Saksdokument» archive with the categories `FS_REFERAT`, `STYRET`, `RADET` and `ARSBERETNINGER` («Årsberetninger, regnskap og budsjettkunngjøringer»). Its ticket types are `INCLUDED`, `FREE`, `BILLIG` (paid), `REGISTRATION` and `CUSTOM` ([Samfundet4 `model_choices.py`](https://github.com/Samfundet/Samfundet4/blob/master/backend/samfundet/models/model_choices.py), code).
  - **Hackerspace NTNU** has about, rules, news, quotes, members, reservations, storage lending and a shift schedule ([website-next](https://github.com/hackerspace-ntnu/website-next), code).
  - **Nabla (NTNU)** has meeting records, the Nabladet archive, exchange reports, a podcast, jobs, company presentations and a shop ([nablaweb](https://github.com/Nabla-NTNU/nablaweb), code).
  - **ApeironLF,** the reference site, is static HTML on Cloudflare Pages with no build step. It has news, a board and a board archive, Google Calendar events, a Google Drive gallery, merch, a glossary and distinctions ([ApeironLF](https://github.com/Apeiron-Linjeforening/ApeironLF), code).
  - **The pattern.** On a server, the large sites build three things: registration with pools by class year, penalty systems, and paid registration. The rest of their content is static-shaped: articles, companies and sponsors with a «for bedrifter» page, job listings, interest groups and committees, minutes and saksdokumenter, magazine archives, quotes, galleries, board history, opening hours, and about, privacy and cookie pages. Urd can match that static layer and link out for registration.
- **Club platforms.**

| Platform | What it sells | Price as found |
|---|---|---|
| Spond Club | Registration forms with automatic approval, roles and permissions, payments, and a club website with news, pages, file downloads and embedded registration forms ([spond.com](https://www.spond.com/en-us/news-and-blog/simplifying-member-registration-with-spond/), [help.spond.com](https://help.spond.com/en/articles/165270-overview-club-website), primary) | No licence fee found; 2.99% + 2 NOK of the invoiced amount, plus 27 NOK per NIF membership fee ([help.spond.com](https://help.spond.com/club/en/articles/58192-what-is-the-transaction-fee-in-spond-club), primary) |
| Rubic | Member register, «kontingent» (membership fees) with invoices and reminders, Vipps, activities, SMS and email, «dugnad» (volunteer work), accounting and an app; no website module ([rubic.no](https://www.rubic.no/), primary) | Rubic Medlem from 700 kr a month, Sport from 600 and Arrangør from 550, excluding VAT, on a 12-month licence; payments 2.5% + 2 kr (same source) |
| StyreWeb | Member register, finances, events with tickets, a website with a board overview, digital sign-up and an activity calendar, archive, newsletter, shop, fundraising and privacy support; 41,000+ customers claimed ([styreweb.com](https://www.styreweb.com/), primary) | 30-day trial; the price calculator showed no figures ([pris.styreweb.com](https://pris.styreweb.com/priskalkulator), primary) |
| Checkin | Registration and tickets, QR check-in, automated waiting lists, email and SMS, Vipps, card and invoice ([checkinevent.com](https://www.checkinevent.com/no/priser), primary) | 10 kr per ticket, free events included; paid events add a 2% service fee and a 2.5% transaction fee; reduced rates for non-profits (same source) |
| Hoopla | Ticketing for festivals and culture ([hoopla.no](https://www.hoopla.no/), primary) | Organiser prices not reachable |
| WildApricot | Website builder, member database, events with registration forms, payments and invoicing, donations and a store ([wildapricot.com/pricing](https://www.wildapricot.com/pricing), primary) | From US$66 a month for 100 contacts. Reviewers report frequent price increases and steep jumps between tiers ([getapp.com](https://www.getapp.com/customer-management-software/a/wild-apricot/reviews/), secondary) |

- **NIF** runs its own systems for sports clubs: Min idrett, KlubbAdmin and «Idrettens betalingsløsning». KlubbAdmin is free, and a club must keep an electronic member list in an NIF-approved system to get grants ([idrettsforbundet.no](https://www.idrettsforbundet.no/digital/), primary).
- **TicketCo** charges about 5 to 5.5% plus a fixed fee per ticket. That is a UK figure from a competitor's comparison ([tickts.co.uk](https://tickts.co.uk/tickts-vs-ticketco), secondary and biased).

**Urd today.**
- **Content.** Collections for news, notices and publications, with a publication-archive preset for a magazine archive.
- **Events.** The calendar block reads ICS feeds and has a sign-up link per event, a category filter, search and subscribe links.
- **Presets for associations:** sponsors (a greyscale logo row with links), membership (price tiers with benefits and a Vipps line), team, noticeboard, events and «Find us», a contact form, and a shop with member prices.
- **What Urd links out to:** registration and tickets (Checkin, Hoopla, Spond or Google Forms through the event's sign-up link), membership registers (Spond Club, StyreWeb, Rubic, KlubbAdmin) and payments (a Vipps number or a payment link).
- **Not there:** a document archive, a people kind with board periods, and opening hours with «open now» (a plain table of hours is the table block).

**Gaps.**
- **C24** Archiving and entry states, which includes the board per period (open).
- **C109** A document archive.
- **C110** Event registration links.
- **C111** The association elements.
- **C112** Opening hours.
- **C113** Registration with pools and penalties, member registers, kontingent and ticketing.
- **C114** Association presets not yet placed.

## Recommendations

The C-IDs below are the ones named in Part 1. C1 to C26, C4b and C7b keep their numbers and meanings; the new ones start at C27. [BACKLOG.md](../BACKLOG.md) owns the delivery of everything marked Taken.

### Open

| ID | What | Who does it (with source) | Fit for Urd | Status |
|---|---|---|---|---|
| C4b | Entry pages: a permalink page per collection entry, generated at publish, with an author field | Webflow CMS template pages (earlier survey, verified July 2026, no URL); Wix item-page variants ([wix.com/updates](https://www.wix.com/updates?page=2), primary); Framer detail pages ([framer.com/developers/cms](https://www.framer.com/developers/cms), primary) | Makes sense only with baked HTML (C47) | Taken: v0.8 entry pages |
| C11 | Media library panel: an overview of `media/`, unused files and sizes | Bricks 2.4 media manager ([bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-4/), primary); standard at every large builder (earlier survey, no URL) | File handling is invisible today; the library also shows whether the repo's size calls for external storage (Cloudflare R2 as a plugin, After v1.0) | Taken: v0.8 media library |
| C13 | Redirects: `_redirects` generated at publish over a host-neutral data layer, listed in the Pages panel, offered on a slug change ([ADR-0015](../adr/0015-redirects-ownership.md)) | Wix bulk 301 ([wix.com/seo](https://www.wix.com/seo), primary); Squarespace URL mappings ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/205815308-URL-mappings), primary); Framer on Pro ([framer.com/pricing](https://www.framer.com/pricing), primary); Carrd on Pro Plus ([carrd.com/pro](https://carrd.com/pro), primary) | Paywalled elsewhere; Pages Free allows 2,000 static redirects | Taken: 0.7.23 Redirects |
| C16 | MCP server: local and dependency-free, so the site owner's own agent client can read and edit the content | Webflow MCP v1.3 ([developers.webflow.com](https://developers.webflow.com/home/changelog/2026/5/21), primary); WordPress MCP Adapter ([developer.wordpress.org](https://developer.wordpress.org/news/2026/02/from-abilities-to-ai-agents-introducing-the-wordpress-mcp-adapter/), primary); Wix MCP ([dev.wix.com](https://dev.wix.com/docs/api-reference/articles/ai-tools/wix-mcp/about-the-wix-mcp), primary) | Git-owned JSON with schemas makes it cheaper for Urd than for a hosted CMS ([ADR-0017](../adr/0017-ai-via-local-mcp-server.md)) | Taken: v0.8 MCP read, v0.9 MCP write |
| C17 | Accessibility in the editor: `id` and `for` on labels, accessible names on button-based controls, visible focus, a keyboard path | WordPress, Squarespace, Figma Sites, Bricks and Webflow have keyboard-operable editors ([Part 2](#part-2-the-function-catalogue)) | The output is strong and the editor is not; the editors are volunteers too | Taken: 0.7.11 Accessibility round |
| C24 | Archiving and entry states: one-action archive and restore, `archived` and `archivedAt`, kicker and urgent on news, section hide, a people kind with boards per period, and draft, hidden and scheduled products | ApeironLF archives posters, news and boards ([ApeironLF](https://github.com/Apeiron-Linjeforening/ApeironLF), code); Abakus keeps board history ([lego `users/models.py`](https://raw.githubusercontent.com/webkom/lego/master/lego/apps/users/models.py), code) | A site owner without a developer needs it in one action; entry states cross the migration contract ([ADR-0005](../adr/0005-versioning-and-migration.md)) | Taken: v0.8 Archiving and person collections (AR) |
| C25 | Collection filters: chips by year, period or category, tabs, a client-side search field, on product collections too (categories and tags) | ApeironLF period chips and search ([ApeironLF](https://github.com/Apeiron-Linjeforening/ApeironLF), code); Framer visitor filters (earlier survey, verified July 2026, no URL) | No library needed | Taken: v0.8 AR-3 collection filters |
| C27 | Text shortcuts (headings, alignment, Ctrl+K for a link, paste as plain text with Ctrl+Shift+V) and `tel:` links | Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/214491097), primary); WordPress ([wordpress.org](https://wordpress.org/documentation/article/keyboard-shortcuts-block-editor/), primary) | Small additions to the existing toolbar; `tel:` needs the sanitizer's scheme list | Taken: 0.7.10 Intuitiveness review and editor polish |
| C28 | A paste pipeline: Word, Docs and Slack cleaned, a pasted URL becomes a link, pasted Markdown becomes formatting, plain-text single-line fields | Bricks 2.3 ([bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-3/), primary); Carrd Markdown ([carrd.com/docs/building](https://carrd.com/docs/building), primary) | One allowed-HTML schema shared with the sanitizer ([CODE.md](CODE.md)) | Taken: 0.7.10 Intuitiveness review and editor polish |
| C29 | Text styling extras: text shadow, selection colour, letter case, link styles for hover and the current page, a drop cap behind a gate, `text-wrap: balance` and `pretty` | WordPress 7.1 ([field guide](https://make.wordpress.org/core/2026/08/05/wordpress-7-1-field-guide/), primary); Framer ([framer.com/features/design](https://framer.com/features/design/), primary); Divi 5 ([version log](https://help.elegantthemes.com/en/articles/9973580), primary) | CSS only; `initial-letter` is not Baseline | Taken: 0.7.9 Design stretch |
| C30 | Find and replace across the site | Bricks has it only in code fields ([Part 2](#part-2-the-function-catalogue)) | Cheap over JSON, but no builder offers it for content | Watch: no builder offers it for site content |
| C31 | A command palette (insert by name, jump to a page or section, recent commands, commands registered by plugins) and a keyboard-shortcut cheat sheet on Shift+/ | WordPress 7.0 ([wordpress.org/news](https://wordpress.org/news/?p=20583), primary); Framer ([quick actions](https://www.framer.com/updates/quick-actions), primary); Webflow ([Webflow University](https://university.webflow.com/lesson/keyboard-shortcuts), primary); Bricks 2.0 ([bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-0/), primary) | Standard in 2026; the element menu's search is half of it | Taken: 0.7.10 Intuitiveness review and editor polish |
| C32 | Canvas functions: marquee select and select all; Tab to the next block; paste styles only, animation included; match size; resize with Ctrl+arrows; Shift locks the axis; Alt+drag duplicates; distances on Alt+hover; snapping that scales with zoom, toggles with Ctrl or Cmd and snaps to equal gaps; 1 px and 5 px nudges; a zoom-out overview for moving sections; shortcuts to insert before or after and to add a page or section. The nudge convention is weighed with them | Wix Editor ([support.wix.com](https://support.wix.com/en/article/keyboard-shortcuts-for-the-editor), primary); Wix Studio ([support.wix.com](https://support.wix.com/en/article/studio-editor-keyboard-shortcuts), primary); WordPress zoom-out view ([wordpress.org](https://wordpress.org/documentation/article/site-editor/), primary) | Fits the absolute frames directly | Taken: 0.7.10 Intuitiveness review and editor polish; delivered in part: styles pasted with the animation (0.7.20.8), the axis lock, snapping that scales with zoom, the Ctrl or Cmd toggle and equal-gap snapping (0.7.26.3) |
| C33 | A layers panel: the blocks of a section in z-order, rename, drag to reorder, lock and hide | Squarespace Finish Layer ([squarespace.com/blog](https://www.squarespace.com/blog/finish-layer-website-design-tools), primary); Wix Studio ([support.wix.com](https://support.wix.com/en/article/studio-editor-working-with-layers), primary) | Overlapping free-placed blocks need it; its keyboard tree is C80 | Taken: 0.7.9 Design stretch |
| C34 | Synced global blocks `{ref, overrides}` with detach | WordPress 7.0 synced patterns ([gutenbergtimes](https://gutenbergtimes.com/wordpress-7-0-source-of-truth/), secondary); Bricks 2.0 components ([bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-0/), primary); Wix Studio design libraries ([support.wix.com](https://support.wix.com/en/article/studio-editor-creating-and-managing-design-libraries), primary) | Crosses the migration contract; templates as copies cover most needs today | Taken: After v1.0 synced global blocks |
| C35 | Design presets and tools: a fluid type scale with a rem term, an OKLCH theme from one colour, a radius scale with a gated `corner-shape` enhancement and plain `border-radius` as the end state (D20), a spacing scale, motion intensity, a glass level for nav pills only, a neo-brutalist theme, a mesh gradient; bento, sticky split, stacked cards and editorial-width presets; a style book page; button states in the design gallery; «use this block's style as the site default»; a hover preview of fonts and colours; brand or seasonal modes in «save your own theme», with theme export | Webflow variable modes and function variables ([variable modes](https://webflow.com/updates/variable-modes), [functions](https://help.webflow.com/hc/en-us/articles/41843932314259-Use-functions-in-variable-values), primary); Bricks 2.2 Style Manager ([bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-2/), primary); WordPress Style Book ([wordpress.org](https://wordpress.org/documentation/article/styles-overview/), primary); Tilda Styles ([blog-en.tilda.cc](https://blog-en.tilda.cc/2025-in-review), primary) | Plain CSS custom properties; the set is in [DESIGN.md](DESIGN.md) | Taken: 0.7.9 Design stretch |
| C36 | More fonts, including self-hosted uploads: variable woff2 with subsets, at most one preload, `font-src 'self'` | Squarespace Finish Layer ([squarespace.com/blog](https://www.squarespace.com/blog/finish-layer-website-design-tools), primary); Bricks Font Manager ([bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-0/), primary); Twenty Twenty-Five ([github.com/WordPress/twentytwentyfive](https://github.com/WordPress/twentytwentyfive), code) | Keeps the CSP and privacy; zero font bytes today is a measured lead to protect | Taken: 0.7.9 Design stretch |
| C37 | Elements shown only on the phone, the counterpart to hide on mobile | Wix Harmony ([support.wix.com](https://support.wix.com/en/article/wix-harmony-editor-adjusting-your-site-for-mobile), primary); WordPress 7.0 visibility per viewport ([gutenbergtimes](https://gutenbergtimes.com/wordpress-7-0-source-of-truth/), secondary); Squarespace Finish Layer ([squarespace.com/blog](https://www.squarespace.com/blog/finish-layer-website-design-tools), primary) | Fits the synced row grid ([ADR-0019](../adr/0019-synced-mobile-model.md)) | Taken: 0.7.3 mobile rethink |
| C38 | Desktop and phone canvases side by side | Webflow breakpoint canvas, 2 Sep 2026 ([we-r.co](https://www.we-r.co/en/blog/nouveautes-designer-webflow-conf-2026), secondary) | Two iframes on the same postMessage bridge | Taken: v0.8 PH-1 the phone side of the canvas, to be weighed once the row grid stands |
| C39 | An element manager that hides unused block types, widened from the «shop is on» gating | Bricks 2.0 Element Manager ([bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-0/), primary) | A smaller palette for a club that needs no shop | Taken: 0.7.10 Intuitiveness review and editor polish |
| C40 | Page duplication in the Pages panel | Wix ([wix.com/features/main](https://www.wix.com/features/main), primary); Webstudio ([Part 2](#part-2-the-function-catalogue)) | Cheap: a page is a JSON file | Taken: 0.7.10 Intuitiveness review and editor polish |
| C41 | Classes and custom CSS per element or site-wide, custom attributes, class managers | Webflow ([developers.webflow.com](https://developers.webflow.com/reference/the-style-object), primary); Elementor 4 ([v4 FAQ](https://elementor.com/products/website-builder/v4-faq/), primary); Bricks ([bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-0/), primary) | The content holds no CSS, and a class-based cascade is not adopted ([CODE.md](CODE.md)); a look copied from a design tool becomes a scoped style in the theme | Taken in part: a scoped style per look in v0.8 OL-4; site-wide CSS and classes stay not taken |
| C42 | A list of the images that lack alt text, edited in one view | Duda Alt Text Manager ([duda.co/features/seo-tools](https://duda.co/features/seo-tools), primary); Webflow's Audit panel over the asset library ([webflow.com/updates](https://webflow.com/updates/find-and-fix-accessibility-issues-with-new-audit-panel), primary) | A scan of the JSON | Taken: v0.8 AU-1 the audit panel's alt-text list |
| C43 | Responsive pictures: 2 to 4 widths in AVIF and WebP made at upload, `width` and `height` recorded at upload, the first image eager at `fetchpriority=high`, `sizes="auto"`; JPEG XL noted for later | WordPress, Squarespace, Shopify Horizon and Astro (measured, 11 Oct 2026); Webflow AVIF ([webflow.com/updates](https://webflow.com/updates/avif-image-support-conversion-tool), primary) | Pages has no resizing on the fly, so the variants are made at upload | Taken: v0.8 responsive pictures |
| C44 | An image editor with crop and aspect presets, rotate and flip | WordPress 7.1 media editor ([Roadmap to 7.1](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/), primary); Duda photo editor ([Part 2](#part-2-the-function-catalogue)) | Extends the shared image editor | Taken: v0.8 image editor |
| C45 | Duotone and blend modes on images, and a palette suggested from an image | Framer blend modes ([framer.com/features/design](https://framer.com/features/design/), primary); Divi 5 colour harmony generators ([version log](https://help.elegantthemes.com/en/articles/9973580), primary) | CSS filters and blend modes | Taken: 0.7.9 Design stretch |
| C46 | AI image tools and stock media: AI alt text, generation, background removal, upscaling, stock libraries | Wix ([wix.com/features/main](https://www.wix.com/features/main), primary); Figma Sites ([help.figma.com](https://help.figma.com/hc/en-us/articles/31433998164375), primary); Duda ([duda.co/accessibility](https://www.duda.co/accessibility), primary) | Third-party and AI services | Not taken: third party or AI; the site owner's own agent through MCP ([ADR-0017](../adr/0017-ai-via-local-mcp-server.md)) |
| C47 | Baked HTML: content, meta, Open Graph and JSON-LD (BlogPosting, Product, WebSite, BreadcrumbList, FAQPage) in the served HTML; `color-scheme` and theme-color meta; an RSS alternate link; per-page module lists; `rel=expect` instead of a render-blocking `boot.js`; the animation hidden state only under a JavaScript class; declarative event delegation in the Horizon style | Astro, Twenty Twenty-Five, Carrd and Shopify Horizon (measured, 11 Oct 2026); Squarespace automatic structured data ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/206744067-What-Squarespace-does-for-SEO), primary) | The largest measured gap; ADR-0013's modulepreload test changes with it | Taken: v0.8 baking |
| C48 | Publish-time files: llms.txt, a Markdown twin per page (`rel=alternate`), a Content-Signal line and an AI-crawler choice set by the site owner, sitemap `lastmod` and image entries, a Search Console verification field | Ghost ([ghost.org/changelog/geo](https://ghost.org/changelog/geo/), primary); Cloudflare Content Signals ([blog.cloudflare.com](https://blog.cloudflare.com/content-signals-policy/), primary); Squarespace AI-crawler toggle ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/206744067-What-Squarespace-does-for-SEO), primary); Framer, WordPress, Webstudio and Hostinger (measured, 11 Oct 2026) | Static files; Webflow keeps Markdown for agents on Enterprise | Taken: v0.8 publish-time files |
| C49 | Speed: the editor and preview CSS split out of `base.css`, `@layer`, a short `Link` header so that Early Hints are sent | Shopify Horizon's single stylesheet; Early Hints at Webflow, Webstudio, Shopify and ApeironLF (measured, 11 Oct 2026) | About a tenth of `base.css` serves only the editor; existing sites add any `_headers` line by hand from the updater's diff instruction (ADR-0014) | Taken: v0.8 speed |
| C50 | The page weight shown in the editor (DOM nodes, payload), with optimisation warnings | Framer optimisation warnings ([framer.com/help/seo](https://www.framer.com/help/seo/), primary); Wix Site Speed ([support.wix.com](https://support.wix.com/en/article/understanding-your-site-speed-dashboard), primary) | Makes a measured lead visible | Taken: v0.8 «show the engine's lightness» |
| C51 | Custom JSON-LD and a schema generator | Framer, Zoho Sites, Wix dynamic pages ([Part 2](#part-2-the-function-catalogue)) | The automatic types come first | Watch: after the automatic types in C47 |
| C52 | Instant indexing (IndexNow) | Wix ([wix.com/seo](https://www.wix.com/seo), primary) | Needs a ping from a function at publish | Watch: a ping from the publishing function |
| C53 | AI visibility tracking, SEO assistants, keyword research, Search Console dashboards, Google Business Profile, review requests | Wix ([press release](https://www.wix.com/press-room/home/post/wix-launches-ai-visibility-overview-with-full-generative-engine-optimization-support-for-ai-powered), primary); Squarespace AIO Scanner ([Refresh 2025](https://www.squarespace.com/blog/squarespace-refresh-2025-product-releases), primary); Durable ([durable.com/pricing](https://durable.com/pricing), primary) | Needs a server or a third party | Not taken: server or third party; the site owner's own agent does the writing through MCP |
| C55 | Forms: number, URL and time fields, a checkbox group, a range, a hidden field and a section break; conditional fields; multiple steps; a redirect after sending | Framer ([framer.com/help](https://www.framer.com/help/articles/add-different-field-types-to-native-form/), primary); Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/205814018-Form-fields-explained), primary); Jetpack ([jetpack.com](https://jetpack.com/support/jetpack-blocks/contact-form/), primary); Wix ([support.wix.com](https://support.wix.com/en/article/wix-forms-managing-your-form-fields), primary) | Client-side extensions of the form block | Taken: v0.8 Element round, ER-E |
| C56 | Spam protection with Cloudflare Turnstile and rate limiting, once forms post through the site's own function | Webflow ([help.webflow.com](https://help.webflow.com/hc/en-us/articles/34277758554771), primary, search extract); Framer ([framer.com/help](https://www.framer.com/help/articles/add-different-field-types-to-native-form/), primary) | Turnstile is Cloudflare's own; reCAPTCHA is not taken (Google) | Taken: v0.9 forms through the site's own function |
| C57 | Submission storage and an inbox, file upload, signature, payment and booking fields | Wix ([support.wix.com](https://support.wix.com/en/article/wix-forms-managing-your-form-fields), primary); Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/205814018-Form-fields-explained), primary); Jetpack ([jetpack.com](https://jetpack.com/support/jetpack-blocks/contact-form/), primary) | Needs storage on a server | Not taken: needs a server; an endpoint provider has them |
| C58 | Documentation recipes: forms to a webhook (Zapier, Make, n8n, Google Apps Script), RSS to a newsletter through a provider, Core Web Vitals in the Cloudflare dashboard, Cloudflare Access for password pages and a members' page (a path such as `/medlem` behind an Access login, the rule covering the page's content file too, since the engine fetches the page as JSON, and the allowed addresses kept in Cloudflare and never in git), www and HTTPS redirects on the host | Squarespace forms to Google Sheets and Zapier ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/205814018-Form-fields-explained), primary); Framer webhooks ([framer.com/help](https://www.framer.com/help/articles/add-different-field-types-to-native-form/), primary); Ghost with Zapier and n8n ([ghost.org/pricing](https://ghost.org/pricing/), primary) | Documentation only; the endpoint mode already posts to any webhook | Taken: v0.9 documentation round |
| C59 | Typed custom fields per collection: boolean, time, colour, multi-image, video, audio, file, email, phone, address, tags, option, reference, multi-reference | Webflow ([developers.webflow.com](https://developers.webflow.com/data/reference/cms/collection-fields/create), primary); Wix ([dev.wix.com](https://dev.wix.com/docs/api-reference/business-solutions/cms/data-types-in-wix-data), primary); Framer ([framer.com/developers/cms](https://www.framer.com/developers/cms), primary) | Crosses the schema in three places; comes with events as a kind (C60) | Taken: v0.8 typed custom fields (to be weighed) |
| C60 | Events as a collection kind: date, time and place fields, an upcoming filter, a month view in the collection block | Squarespace event collections ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/208216828-Collection-pages), primary); Wix Events ([wix.com/features/main](https://www.wix.com/features/main), primary) | For associations that keep events in the site rather than in an ICS feed | Taken: v0.8 events as a collection kind |
| C61 | Site search from a JSON index written at publish, with no library | Ghost ([ghost.org/changelog/6](https://ghost.org/changelog/6/), primary); Framer Pro ([framer.com/pricing](https://www.framer.com/pricing), primary); the Abakus search app ([lego apps](https://github.com/webkom/lego/tree/master/lego/apps), code) | Static; revisits «out of scope» from the element review | Taken: v0.8 site search (to be weighed) |
| C62 | Markdown import and export of collections | Framer ([framer.com/developers/cms](https://www.framer.com/developers/cms), primary) | CSV covers bulk moves today | Watch: CSV covers bulk moves today |
| C63 | Multilingual content: pages per language, translated slugs, hreflang, a language switcher, right-to-left | Wix ([support.wix.com](https://support.wix.com/en/article/wix-multilingual-auto-translating-your-site), primary); Framer ([framer.com/updates/auto-translate](https://framer.com/updates/auto-translate), primary); Webflow Localize ([flowninja](https://www.flowninja.com/blog/webflow-localization), secondary) | Rivals charge per locale; the migration contract lets it come later, and the site owner's own agent can translate | Taken: After v1.0 multilingual content |
| C64 | Import from an existing site | WordPress importers ([wordpress.org/about/features](https://wordpress.org/about/features/), primary); Duda ([duda.co/pricing](https://www.duda.co/pricing), primary); Webnode AI migration ([webnode.com/features](https://www.webnode.com/features/), primary) | The v1.0 pilot is rebuilt by hand first | Taken: After v1.0 import |
| C65 | Move the optional payment layer off Vipps Checkout v3, to the ePayment API (Vipps only) or to Kustom Checkout, with ADR-0020 amended and `checkout/v3/session` gone | Kustom ([kustom.co FAQ](https://www.kustom.co/kustom-vipps-faq), primary); Vipps MobilePay ([Checkout API](https://developer.vippsmobilepay.com/docs/APIs/checkout-api/), primary) | Checkout is discontinued on 30 April 2027; the core stays gateway-free | Taken: URGENT: Vipps migration |
| C66 | Product pages: one URL per product, linked from the quick view and listed in the sitemap | Shopify ([shopify.com/pricing](https://www.shopify.com/pricing), primary); Webflow product and category pages (earlier survey, no URL) | Generated at publish with the entry pages (C4b) | Taken: v0.8 product pages |
| C67 | Shop extensions: a price per variant, stock, back-in-stock alerts, bundles, upsells, minimum and maximum quantities | Wix ([wix.com/ecommerce/features](https://www.wix.com/ecommerce/features), primary); WordPress.com Commerce ([wordpress.com/pricing](https://wordpress.com/pricing/), primary) | Wix parity, not an association need | Taken: v1.1 the shop (a price and stock per variant, C129); After v1.0 shop extensions (back-in-stock alerts, bundles, upsells, quantities) |
| C68 | Commerce at gateway scale: gateways besides the optional payment layer, subscriptions, gift cards, automatic tax, live shipping rates, customer accounts, point of sale (codes and the VAT display moved to v1.1 the shop, C131 and C132) | Shopify ([shopify.com/pricing](https://www.shopify.com/pricing), primary); Squarespace ([squarespace.com/pricing](https://www.squarespace.com/pricing), primary); Wix ([wix.com/ecommerce/features](https://www.wix.com/ecommerce/features), primary) | Needs a server and a gateway | Not taken: a gateway-free core ([ADR-0020](../adr/0020-optional-payment-layer-vipps-checkout.md)); orders arrive by email or through Vipps |
| C69 | A static product feed for Google Shopping | Squarespace on Core ([squarespace.com/pricing](https://www.squarespace.com/pricing), primary); Wix Google Merchant Center ([wix.com/ecommerce/features](https://www.wix.com/ecommerce/features), primary) | A feed file can be written at publish | Watch: a static product feed is possible |
| C70 | A scroll-scrubbed entrance as a choice of its own | Webflow ScrollTrigger ([webflow.com/updates](https://webflow.com/updates/more-control-over-interactions-with-gsap), primary); Webstudio ([webstudio.is/blog](https://webstudio.is/blog/native-scroll-driven-animations), primary); Elementor 4 ([elementor.com/blog](https://elementor.com/blog/editor-40-atomic-forms-pro-interactions/), primary) | `animation-timeline: view()` behind `@supports`, with the end state as the fallback ([ADR-0011](../adr/0011-native-css-first.md)) | Taken: v0.8 Element round, ER-H |
| C71 | Mouse and cursor effects, keyframe timelines, shaders and WebGL, Lottie, 3D | Framer ([framer.com/features/design](https://framer.com/features/design/), primary); Wix Studio ([support.wix.com](https://support.wix.com/en/article/studio-editor-about-animations), primary); Readymag Lottie ([blog.readymag.com](https://blog.readymag.com/recap-2025/), primary) | Lottie, Rive and 3D as data files with vendored MIT players; the pointer as custom properties; keyframe timelines, shaders and cursor effects add complexity for the audience | Taken in part: Lottie and 3D in v0.8 Animation files, the pointer in v0.8 OL-1; cursor effects, keyframe timelines and shaders stay not taken |
| C72 | The template model: export a template or a group of templates as a plugin; whole-site templates and examples kept in Urd | WordPress theme export ([wordpress.org](https://wordpress.org/documentation/article/site-editor/), primary); Bricks 2.4 ZIP transfer ([bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-4/), primary); Squarespace Site Themes ([searchenginejournal](https://www.searchenginejournal.com/squarespace-rolls-out-new-ai-tools-for-seo-and-design/557220/), secondary) | Keeps the site owner's repo small | Taken: v0.8 template model |
| C73 | Wireframes: grey presets for laying out a page | Bricks wireframes and design sets ([bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-0/), primary) | Cheap as presets | Watch: grey presets |
| C74 | A gallery site for community templates and plugins | Template galleries at every large builder (earlier survey, no URL) | Needs a community first | Taken: After v1.0 gallery site |
| C75 | An audit panel: alt text, empty links, heading order and outline, contrast, `lang`, labels, a warning on PDF upload, broken internal links and SEO checks, with the count shown in the publish dialog | Webflow ([webflow.com/updates](https://webflow.com/updates/find-and-fix-accessibility-issues-with-new-audit-panel), primary); Wix ([support.wix.com](https://support.wix.com/en/article/accessibility-about-the-accessibility-wizard-in-the-studio-editor), primary); Elementor Ally ([wordpress.org/plugins](https://wordpress.org/plugins/pojo-accessibility/), primary) | Runs over the JSON and the preview DOM; the legal floor is WCAG 2.0 AA | Taken: v0.8 AU-1 the accessibility audit panel |
| C76 | AA and AAA contrast in the colour picker | Webflow ([webflow.com/updates](https://webflow.com/updates/check-text-accessibility-with-built-in-color-contrast-ratio-tool), primary); Duda ([duda.co/accessibility](https://www.duda.co/accessibility), primary) | Client-side maths | Taken: 0.7.11 Accessibility round |
| C77 | A «decorative» toggle on images | WordPress 7.1 ([developer.wordpress.org](https://developer.wordpress.org/news/2026/08/whats-new-for-developers-august-2026/), primary) | Writes an empty `alt` on purpose | Taken: 0.7.11 Accessibility round |
| C78 | A skip link in the HTML shells | Squarespace, Shopify Horizon, WordPress, Bricks, Astro and webflow.com (measured, 11 Oct 2026) | One link, written into the root shell and its byte-identical copies ([ADR-0013](../adr/0013-immutable-engine-versioning.md)) | Taken: 0.7.11 Accessibility round |
| C79 | A site-wide pause for motion (WCAG 2.2.2) | Framer's site-wide reduced-motion setting ([framer.com/help](https://www.framer.com/help/articles/guide-to-web-accessibility-in-framer), primary); no builder offers a pause as an element | Complements `prefers-reduced-motion` | Taken: 0.7.11 Accessibility round |
| C80 | Keyboard navigation in the editor: layers as a roving-tabindex tree, Alt+F10 into the toolbar, focus sentinels around the iframe, F6 and Ctrl+` between regions, Tab between blocks | WordPress, Squarespace, Figma Sites, Bricks and Webflow ([Part 2](#part-2-the-function-catalogue)) | Part of the editor's accessibility (C17) | Taken: 0.7.11 Accessibility round |
| C81 | Captions (a WebVTT `<track>`) for self-hosted video, and a transcript for audio | Captions for prerecorded media are not among the criteria exempt for the private sector ([uutilsynet.no](https://www.uutilsynet.no/regelverk/kva-seier-forskrifta/153), primary) | `blocks/video.js` writes no track today (code) | Taken: 0.7.11 Accessibility round |
| C82 | A vision simulation | Webflow Vision preview ([Part 2](#part-2-the-function-catalogue)) | A CSS filter over the preview | Taken: v0.8 AU-2 the vision simulation, to be weighed after the audit panel |
| C83 | A voluntary «Tilgjengelighet» page | Not required of associations: the tilgjengelighetserklæring is a public-sector duty ([uutilsynet.no](https://www.uutilsynet.no/webdirektivet-wad/krav-om-tilgjengelegheitserklaering/267), primary) | A ready answer if Uutilsynet asks | Taken: 0.7.24.2 (to be weighed with the privacy page generator) |
| C84 | Click-to-load facades for video and other third-party frames, and one click-to-load frame for allowlisted hosts such as Spotify and SoundCloud | No builder measured does it by default; the rule is ekomloven § 3-15 ([nkom.no](https://www.nkom.no/internett/informasjonskapsler-cookies), primary), and youtube-nocookie writes local storage on load ([axbom.com](https://axbom.com/embed-youtube-videos-without-cookies/), secondary) | No third-party frame before a click | Taken: 0.7.24 Privacy defaults |
| C85 | A «Personvern» page generated from the site settings: forms and their recipients, checkout, analytics, embeds, the host and the GDPR art. 13 list; a terms page template for the shop | Datatilsynet's list ([datatilsynet.no](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/informasjon-og-apenhet/hva-skal-virksomheten-gi-informasjon-om/), primary); Webnode privacy and terms templates ([webnode.com/features](https://www.webnode.com/features/), primary); Jimdo legal text generator ([jimdo.com](https://www.jimdo.com/website/website-builder/), primary) | Static, built from what the settings switch on | Taken: 0.7.24 Privacy defaults; the shop terms page is generated in v1.1 the shop (C134) |
| C86 | Analytics disclosed on the privacy page when it is on; consent asked only when analytics or embeds need it; the docs and the user guide no longer claim that a banner is never needed | Framer cookie banner ([framer.com/learn](https://www.framer.com/learn/cookie-banner/), primary); Wix with Usercentrics ([support.wix.com](https://support.wix.com/en/article/about-privacy-cookies), primary); the EDPB reading of beacons ([edpb.europa.eu](https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-22023-technical-scope-art-53-eprivacy-directive_en), primary) | Keeps the no-banner default honest | Taken: 0.7.24 Privacy defaults |
| C87 | Credit and consent fields on images (portrait or situation picture) and a removal-request link | Datatilsynet on photos ([datatilsynet.no](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/deling-av-bilder/), primary); Abakus photo consent ([lego `users/models.py`](https://raw.githubusercontent.com/webkom/lego/master/lego/apps/users/models.py), code) | Fields in the image props | Taken: 0.7.24 Privacy defaults |
| C88 | Forms: a mailto warning that recommends a shared association mailbox, and a newsletter sign-up preset with an unticked consent split between member information and offers | Markedsføringsloven § 15 ([forbrukertilsynet.no](https://www.forbrukertilsynet.no/vi-jobber-med/telefonsalg-uonsket-reklame/sporsmal-svar-telefonsalg-uonsket-reklame), primary); Jetpack terms-consent field ([jetpack.com](https://jetpack.com/support/jetpack-blocks/contact-form/), primary); Squarespace email opt-in ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/205814018-Form-fields-explained), primary) | Urd sends no email; the newsletter provider does | Taken: 0.7.24 Privacy defaults |
| C89 | An org.nr. field in the site settings, shown in the footer | Online ([online.ntnu.no](https://online.ntnu.no/om-linjeforeningen), primary); required with a shop by ehandelsloven § 8 ([lovdata](https://lovdata.no/lov/2003-05-23-35/§8), primary, not fetchable) | One field | Taken: 0.7.24 Privacy defaults |
| C90 | HSTS in `_headers` (max-age only) | Framer, Hostinger, Webstudio and Squarespace; ApeironLF on the same host (measured, 11 Oct 2026) | One header in the Urd-owned `_headers` ([ADR-0006](../adr/0006-plugin-csp-needs-model.md)); existing sites add it by hand from the updater's diff instruction ([ADR-0014](../adr/0014-updater-model.md)) | Taken: 0.7.0 (two measured findings that need no baking) |
| C92 | A/B tests, funnels, heatmaps, clickmaps, goals and personalisation | Framer Convert ([framer.com/convert](https://www.framer.com/convert/), primary); Webflow Optimize and Analyze ([webnomads](https://www.webnomads.com/resources/webflow-pricing), secondary); Duda rules ([support.duda.co](https://support.duda.co/hc/en-us/articles/26519232141207-Personalization-Rules), primary) | Needs server state, and Webflow dropping User Accounts shows the upkeep cost | Not taken: needs server state |
| C93 | Third-party tags: Google Analytics, Tag Manager, Meta Pixel, Hotjar | Wix, Framer, Webnode and Tilda ([Part 2](#part-2-the-function-catalogue)) | Breaks the strict CSP and needs consent | Not taken in the core: a plugin with a CSP opt-in and consent |
| C94 | A fixture trio per block type and migration, and a seeded fuzz test of the push pass and the mobile sync | Shopify SimGym tests theme changes before they go live ([shopify.com/news](https://www.shopify.com/news/winter-26-edition-merchant), primary) | Guards the invariant that an update never breaks a built site ([ADR-0005](../adr/0005-versioning-and-migration.md)) | Taken: v0.9 testing |
| C95 | Board handover: a «Ny styreperiode» checklist in admin and in the setup guide (the repo in an association GitHub organisation with at least two owners and 2FA, the Cloudflare Super Administrator on an association mailbox, the domain on the org.nr. with Norid, `ALLOWED_LOGINS` updated in the Pages settings for the new board, the form recipients reviewed) | GitHub ([docs.github.com](https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization), primary); Cloudflare ([developers.cloudflare.com](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/), primary); Norid ([norid.no](https://www.norid.no/en/om-domenenavn/regelverk-for-no/vedlegg-e/), primary); NIF roles in Min idrett ([idrettsforbundet.no](https://www.idrettsforbundet.no/digital/), primary) | The main operational risk for an association | Taken: v0.9 board handover |
| C96 | A content-only editing mode | WordPress 7.0 ([gutenbergtimes](https://gutenbergtimes.com/wordpress-7-0-source-of-truth/), secondary); Webflow Marketer role ([help.webflow.com](https://help.webflow.com/hc/en-us/articles/41015530193811), primary, search extract); Framer content-editor seats ([framer.com/blog](https://www.framer.com/blog/ai-credits-simpler-plans-and-lower-prices/), primary) | GitHub permissions plus a UI flag | Taken: v0.9 content-only editing mode (to be weighed) |
| C97 | Scheduled publishing: date windows in the browser (C98), or a scheduled GitHub Action, which needs drafts kept in git (the PR-per-draft model, C99) | WordPress, Ghost and Webnode ([Part 2](#part-2-the-function-catalogue)) | A static host cannot switch by itself | Taken: v0.9 scheduled publishing (to be weighed) |
| C98 | Date windows (show from, show until) on blocks and the announcement bar | Framer Convert triggers ([framer.com/convert](https://www.framer.com/convert/), primary) | Checked in the browser; also settles the Suggestions item about timed messages | Taken: 0.7.13.18 (the announcement bar); v0.8 Element round, ER-H (blocks) |
| C99 | A pull request per draft, with a preview URL; publish as a merge | Framer branches on Pro ([framer.com/help](https://www.framer.com/help/articles/how-to-use-branches-in-framer/), primary); Webflow branching on Enterprise ([help.webflow.com](https://help.webflow.com/hc/en-us/articles/33961355506195), primary); Wix change requests ([wix.com/updates](https://www.wix.com/updates), primary) | Git and Pages are already there, and the rivals paywall it | Taken: After v1.0 PR per draft |
| C100 | Seeing who else is editing (a concurrency view), short of real-time co-editing | Webflow ([community.webflow.com](https://community.webflow.com/updates/post/webflow-conf-2025-recap-everything-we-announced-7cOUvmz6EGiMlL4), primary); Wix Harmony ([support.wix.com](https://support.wix.com/en/article/introducing-the-wix-harmony-editor), primary) | Needs real-time infrastructure; WordPress pulled it from 7.0 | Taken: After v1.0 concurrency view |
| C101 | Optimistic commits with `expectedHeadOid`, retried automatically when only other files changed | Keystatic ([`updating.tsx`](https://github.com/Thinkmill/keystatic/blob/main/packages/keystatic/src/app/updating.tsx), code) | Fewer false conflict warnings | Taken: v0.9 hardening |
| C102 | Notes on blocks, with replies and mentions | WordPress 6.9 ([wpbeginner](https://www.wpbeginner.com/news/whats-new-in-wordpress-6-9/), secondary); Webflow comment-only links ([community.webflow.com](https://community.webflow.com/updates/post/webflow-conf-2025-recap-everything-we-announced-7cOUvmz6EGiMlL4), primary) | Notes could live in the draft | Watch: notes could be stored in the draft |
| C103 | A visual revision diff | WordPress 7.0 ([gutenbergtimes](https://gutenbergtimes.com/wordpress-7-0-source-of-truth/), secondary) | Git holds every version; a rendered diff needs two previews | Watch: a rendered diff of two versions |
| C104 | Publishing a single page | Webflow ([brixtemplates](https://brixtemplates.com/blog/how-webflow-publishing-works-pages-cms-items-and-staging), secondary); Zoho Sites ([zoho.com/sites/pricing](https://www.zoho.com/sites/pricing.html), primary) | Publishing sends the whole draft today | Watch: publishing sends the whole draft |
| C105 | Editing from a phone | Webnode, Jimdo and Shopify ([Part 2](#part-2-the-function-catalogue)) | A round once the feature set is complete | Taken: v0.9 touch friendliness |
| C106 | Agent writes that the site owner reviews before publishing (the field writes to drafts or branches; Urd's server writes files and does no git operations, ADR-0017 decision 2), typed abilities over the schema instead of raw file edits, a switch per capability, and agent instructions built from the theme tokens and returned by a read tool | Framer branches ([framer.com/help](https://www.framer.com/help/articles/how-to-use-branches-in-framer/), primary); WordPress.com drafts by default ([TechCrunch](https://www.techcrunch.com/2026/03/20/wordpress-com-now-lets-ai-agents-write-and-publish-posts-and-more/), secondary); WordPress Abilities and the MCP Adapter ([developer.wordpress.org](https://developer.wordpress.org/news/2026/02/from-abilities-to-ai-agents-introducing-the-wordpress-mcp-adapter/), primary); Webflow agent instructions ([releases.sh](https://releases.sh/webflow/overview), secondary) | Keeps the live site safe and avoids the «generic REST proxy» pattern | Taken: v0.8 MCP read, v0.9 MCP write |
| C107 | WebMCP | Wix WebMCP app ([dev.wix.com](https://dev.wix.com/docs/develop-websites/articles/get-started/ai-agents/about-the-wix-web-mcp), primary); Chrome 146 preview ([similarweb](https://aisearch.similarweb.com/blog/webmcp/), secondary) | Progressive enhancement, but the API is still moving | Watch: W3C draft, Chrome behind a flag |
| C108 | Generators and AI inside the editor: whole sites or pages from a prompt, AI text, images, logos and forms, AI credits, visitor chat | Wix Harmony, Framer agents, Squarespace Blueprint and Duda ([Part 2](#part-2-the-function-catalogue)) | Hosted AI with keys and credits | Not taken: [ADR-0017](../adr/0017-ai-via-local-mcp-server.md), the site owner's own agent through MCP |
| C109 | A document archive: a file list (type, size, date) with a documents collection kind (vedtekter, protokoller, årsberetning, by category and year) and a PDF view; a warning against personal data in minutes | Samfundet ([`model_choices.py`](https://github.com/Samfundet/Samfundet4/blob/master/backend/samfundet/models/model_choices.py), code); echo meeting minutes ([meeting-minute schema](https://raw.githubusercontent.com/echo-webkom/echo-web-mono/main/apps/cms/schemas/meeting-minute.tsx), code); Nabla ([nablaweb](https://github.com/Nabla-NTNU/nablaweb), code); StyreWeb archive ([styreweb.com](https://www.styreweb.com/), primary) | Git gives a permanent, dated archive; PDFs uploaded after 1 Feb 2022 must be accessible (C75 warns) | Taken: v0.8 Element round, ER-B |
| C110 | Event registration links: a registration mode per event (none, free, form, external ticket, included), ticket status and «add to calendar», linking out to Checkin, Hoopla, Spond or Google Forms | Samfundet ticket types ([`model_choices.py`](https://github.com/Samfundet/Samfundet4/blob/master/backend/samfundet/models/model_choices.py), code); echo's external link ([happening schema](https://raw.githubusercontent.com/echo-webkom/echo-web-mono/main/apps/cms/schemas/happening.tsx), code); Checkin ([checkinevent.com](https://www.checkinevent.com/no/priser), primary) | No attendee data in git | Taken: v0.8 Element round, ER-F; «add to calendar» per event delivered 0.7.19.11 |
| C111 | Association elements: sponsor tiers, job and recruitment entries with a deadline, a directory preset for groups and committees, membership sign-up handed off to Spond, StyreWeb or Rubic, a donation with set amounts and a Vipps number, a Grasrotandelen block | Online ([monoweb](https://github.com/dotkom/monoweb), code); Abakus ([lego apps](https://github.com/webkom/lego/tree/master/lego/apps), code); Spond Club ([spond.com](https://www.spond.com/en-us/news-and-blog/simplifying-member-registration-with-spond/), primary); Squarespace donations ([squarespace.com/pricing](https://www.squarespace.com/pricing), primary); Norsk Tipping ([norsk-tipping.no](https://www.norsk-tipping.no/grasrotandelen/for-lag-og-foreninger), primary) | Static elements with link-outs; their E-IDs are in [ELEMENTS.md](ELEMENTS.md) | Taken: v0.8 Element round, ER-F |
| C112 | Opening hours with «open now», closed periods and `OpeningHoursSpecification` | Samfundet venues and closed periods ([`general.py`](https://github.com/Samfundet/Samfundet4/blob/master/backend/samfundet/models/general.py), code) | A date check in the browser | Taken: v0.8 Element round, ER-C |
| C113 | Registration with pools and penalties, paid registration, member registers, kontingent, ticketing, SMS | Abakus, Online and echo (code, see [17. Associations](#17-associations)); Spond Club, Rubic, StyreWeb and Checkin (primary, same section) | Needs a server, and member data never goes in git (GDPR) | Not taken: needs a server; link out instead |
| C114 | Association presets not yet placed: an annual-meeting page (innkalling, saksliste, sakspapirer, protokoll and a countdown), a fadderuke programme, company presentations linked to a company entry, an anonymous feedback form through an endpoint that logs no IP addresses, a contact form with a choice of recipient, a «For bedrifter» page, class-year tags on events | Online ([monoweb](https://github.com/dotkom/monoweb), code); echo's feedback form ([echo-web-mono](https://github.com/echo-webkom/echo-web-mono), code); Abakus recipient groups ([lego `contact/send.py`](https://raw.githubusercontent.com/webkom/lego/master/lego/apps/contact/send.py), code) | Static presets, except the feedback endpoint | Watch: weighed with ER-F |
| C115 | Role email addresses on the association's domain (styret@, leder@), forwarded to the current holders through Cloudflare Email Routing and changed at each board handover | Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/19000909092237-Email-forwarding-with-a-Squarespace-domain), primary); Shopify ([help.shopify.com](https://help.shopify.com/en/manual/domains/email-forwarding-and-hosting), primary) | Free at the DNS host; mail follows the role, as access does | Taken: v0.9 board handover (docs) |
| C116 | Contact details (address, phone, email) and opening hours in the site settings, drawn by the footer and a contact preset and written into the Organization JSON-LD | Squarespace Business Information ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/212872328-Business-Information-settings), primary) | Additive site fields beside the organisation numbers of the site's country, from one profile per country ([survey of 20 October 2026](SURVEYS.md#how-an-organisation-names-itself-numbers-registers-and-the-law-in-57-countries-20-october-2026)); typed once, used everywhere | Taken: the contact details in 0.7.24 Privacy defaults (0.7.24.5); the opening hours in v0.8 ER-C with C112 |
| C117 | A featured flag and an excerpt on collection entries: featured entries first or alone in a view, the excerpt on cards | Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/205813998-Featured-blog-posts), primary); Shopify ([help.shopify.com](https://help.shopify.com/en/manual/online-store/blogs/writing-blogs/working-with-blog-posts), primary) | Additive entry fields beside `kicker` and `urgent` | Taken: v0.8 AR-2 the entry model, to be weighed |
| C118 | A site-wide «keep out of search engines» switch while the site is built: Disallow in robots.txt, noindex on every page, a mark in the top bar while it is on | Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/21829426828045-Hiding-your-site-from-search-results), primary); Shopify ([help.shopify.com](https://help.shopify.com/en/manual/online-store/themes/password-page), primary) | robots.txt and noindex are written at publishing already | Taken: v0.8 publish-time files |
| C119 | A QR code per page as an SVG download in the Pages panel, from an encoder of Urd's own | Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/34989402663565-Creating-QR-codes), primary); Carrd ([Part 2](#1-pages-and-site-structure)) | Admin-only, pure and testable, no dependency; posters point to sign-up and event pages | Taken: v0.8 Element round, ER-G |
| C120 | A podcast feed: entries with an audio file published as RSS with an enclosure per episode | Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/205814338-Podcasting-with-Squarespace-overview), primary) | The RSS writer exists; entries lack an audio field | Taken: v0.8 typed custom fields, to be weighed (an audio field) |
| C121 | Analytics beyond the host's dashboard: a real-time view, traffic alerts, a per-visit log with IP addresses, feed subscriber estimates | Squarespace and Shopify ([Part 2](#10-analytics-and-optimisation)) | Needs server state, and the per-visit log stores personal data | Not taken: needs server state |
| C122 | A phone text size or «Size» per block, so a heading set for the desktop can be smaller on the phone without the fit choices | Squarespace Mobile Overrides ([squarespace.com/blog](https://www.squarespace.com/blog/product-updates-may-2026), primary); per-breakpoint overrides at Webflow, Framer, Wix Studio, Elementor and Bricks ([Part 2](#7-responsive)) | An additive field in the phone override that `frames.mobile` already is (ADR-0019); the mobile model stays two layouts | Taken: v0.8 PH-2 the phone text size, weighed against ADR-0019 |
| C123 | Sections duplicated, cut, copied and pasted; blocks cut with Ctrl+X; blocks pasted on another page | Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/206543627-Duplicating-pages-and-content), primary); Shopify ([help.shopify.com](https://help.shopify.com/en/manual/online-store/themes/theme-structure/sections-and-blocks), primary); cut and paste at Webflow, Wix Studio, WordPress, Elementor and Bricks ([Part 2](#1-canvas-and-selection)) | Editor work only: the re-id of template insertion gives a copy fresh ids, and the clipboard has to outlive a page switch; page duplication is C40 | Taken: 0.7.10 Intuitiveness review and editor polish |
| C124 | One link editor for every link: a page and section picker with search, email, phone, a file from `media/` and «open in a new tab», used by the text toolbar, buttons, images, the nav and the announcement bar | Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/206543827-Creating-text-links), primary); link types at Framer, Carrd and Figma Sites ([Part 2](#10-text-editing)) | The button has a page picker and text links are typed URLs today; `isSafeHref` stays the gate | Taken: 0.7.10 Intuitiveness review and editor polish |
| C125 | A site-wide motion default: one entrance style and speed that every block and section uses unless it sets its own, with «none» as a choice | Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/360040839591-Site-wide-animations), primary); Shopify reveal on scroll as a theme setting ([help.shopify.com](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor/theme-settings), primary) | A theme field read when a block has no animation of its own; the first half of the motion intensity setting ([DESIGN.md](DESIGN.md#open) D24); reduced motion still wins | Taken: 0.7.9 design stretch |
| C126 | Start over: reset the theme to the template's values, or clear the content and keep the theme, from the admin | Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/205815378-Redesign-or-restart-your-site), primary) | A publish of known files; git keeps the old state | Taken: v0.9 blank start |
| C127 | A content check outside the editor: the site's content files against Urd's schemas, and a plugin's manifest and engine range, run before a push | Shopify Theme Check ([shopify.dev](https://shopify.dev/docs/storefronts/themes/tools/theme-check), primary) | One dependency-free node script in the template, with an ownership class in `urd.json` | Watch: the first outside plugin author, or a site edited mostly through git |
| C128 | Previous and next links between entry pages in the collection's order, so a course or a guide in steps reads as a sequence, with an optional «done» mark kept in the visitor's own browser | Squarespace course pages ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/16096751630221-Course-pages), primary); Wix programmes and Tilda courses ([Part 2](#7-bookings-events-restaurants-hotels-and-courses)) | Static and open: the order is the collection's and the mark is per browser; gated lessons, quizzes and drip release stay not taken | Taken: v0.8 entry pages |
| C129 | Variants with their own price, sale price, SKU, published stock and image; a variant at zero shown as sold out and not addable; an optional «few left» label; sold-out products optionally hidden | Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/206540687-Add-product-variants), primary; [sold out](https://support.squarespace.com/hc/en-us/articles/206540657-Sold-out-products), primary); Shopify ([help.shopify.com](https://help.shopify.com/en/manual/products/variants/add-variants), primary; [inventory states](https://help.shopify.com/en/manual/inventory-and-locations/fundamentals/inventory-states), primary); Wix, Webflow, WooCommerce, Hostinger, Square Online and Strikingly on their entry plans ([SURVEYS.md](SURVEYS.md#what-a-shop-needs-how-the-builders-sell-19-october-2026)) | Data in the git catalogue that the function already prices from; stock is as fresh as the last publish, and an oversold order is a cancelled reservation ([ADR-0027](../adr/0027-a-shop-without-a-database.md)) | Taken: v1.1 the shop (SHOP-2, SHOP-3) |
| C130 | Static shipping tables: a flat price, weight bands, free over an amount, pickup at an address and a flat pickup-point option, each with a delivery time, shown before the order button | Squarespace ([flat rate](https://support.squarespace.com/hc/en-us/articles/206994337-Set-up-Flat-Rate-shipping-fees), [pickup](https://support.squarespace.com/hc/en-us/articles/207100347-Add-local-pickup-and-delivery-to-your-online-store), primary); Shopify ([rates](https://help.shopify.com/en/manual/fulfillment/setup/shipping-rates/setting-up-shipping-rates), [pickup](https://help.shopify.com/en/manual/fulfillment/setup/delivery-methods/pickup-in-store), [transit time](https://help.shopify.com/en/manual/fulfillment/setup/shipping-rates/transit-time), primary); Wix, Webflow, Hostinger, GoDaddy and Square Online ([SURVEYS.md](SURVEYS.md#what-a-shop-needs-how-the-builders-sell-19-october-2026)) | A static table the function recomputes and a payment provider's fixed shipping options can take; a chosen pickup point needs the carrier's API and is not taken | Taken: v1.1 the shop (SHOP-4) |
| C131 | Discount codes for a percentage, a fixed amount or free shipping, with a validity window and a scope, checked by the shop function when the buyer enters it and again when the payment is created, and published only as an HMAC | Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/205811178-Create-discounts), primary); Shopify ([codes](https://help.shopify.com/en/manual/discounts/discount-methods/discount-codes), [free shipping](https://help.shopify.com/en/manual/discounts/discount-types/free-shipping), primary); Wix, Webflow, WooCommerce, Hostinger, Strikingly, Tilda and StyreWeb ([SURVEYS.md](SURVEYS.md#what-a-shop-needs-how-the-builders-sell-19-october-2026)) | Applied before the payment is created and checked again by the function; `content/` is served, so a code never stands in clear text; use limits need a counter and are not taken | Taken: v1.1 the shop (SHOP-5) |
| C132 | MVA as a seller switch, off by default, with «inkl. mva» and VAT per receipt line only when it is on; a sale price beside the old price with the lowest price of the previous 30 days | Squarespace ([VAT](https://support.squarespace.com/hc/en-us/articles/215074868-Collecting-VAT-or-GST), [sale prices](https://support.squarespace.com/hc/en-us/articles/206540707-Put-your-products-on-sale), primary); Shopify ([taxes](https://help.shopify.com/en/manual/taxes/include-exclude-taxes), [sale pricing](https://help.shopify.com/en/manual/products/details/product-pricing/sale-pricing), primary) | A seller not registered for MVA may not show VAT (merverdiavgiftsloven § 15-11); the before price (prisopplysningsforskriften § 9a) is read from the catalogue's git history | Taken: v1.1 the shop (SHOP-6) |
| C133 | A notice to the owner for every paid order, the order lines as a receipt in the buyer's payment app, and a printable confirmation page with the withdrawal form | Shopify ([staff](https://help.shopify.com/en/manual/fulfillment/setup/notifications/staff-notifications), [customer](https://help.shopify.com/en/manual/fulfillment/setup/notifications/customer-notifications) notifications, primary); Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/206541027-How-customers-buy-your-products), primary); every entry plan in the survey ([SURVEYS.md](SURVEYS.md#what-a-shop-needs-how-the-builders-sell-19-october-2026)) | The webhook carries the order, and the function forwards it without storing it; email needs a Worker and the domain's DNS at Cloudflare, and email to the buyer a paid plan, so the buyer's confirmation is the provider's receipt and the page | Taken: v1.1 the shop (SHOP-7); the printable confirmation comes earlier, in 0.7.24.7 |
| C134 | Shop terms generated from the shop settings, with the standard withdrawal form, a withdrawal form that reaches the owner, and a per-product note where the withdrawal right does not apply | Shopify ([policies](https://help.shopify.com/en/manual/checkout-settings/refund-privacy-tos), [self-serve returns](https://help.shopify.com/en/manual/fulfillment/managing-orders/returns/self-serve-returns), [disclosures](https://help.shopify.com/en/manual/products/product-disclosures), primary); legal templates at Jimdo, Webnode and Squarespace ([Part 2](#12-privacy-legal-and-security)) | The content is fixed by angrerettloven § 8 and ehandelsloven § 8, so it is settings, not product data; the form can grow into the online withdrawal function of LOV-2026-06-19-34 | Taken: v1.1 the shop (SHOP-8) |
| C136 | The payment reserved when the buyer pays and captured when the goods are ready, and a documented test mode | Shopify ([capture](https://help.shopify.com/en/manual/fulfillment/managing-orders/payments/capturing-payments), [test orders](https://help.shopify.com/en/manual/checkout-settings/test-orders), primary); Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/205811368-Run-test-orders), primary) | Vipps ePayment allows capture only when the goods are ready, within 180 days in Norway; the setup guide does not yet cover the payment layer | Taken: URGENT: Vipps migration |
| C137 | A buy-now button on a single product that puts it in the basket and opens the checkout | Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/206540817-Skip-cart-page), primary); Shopify ([help.shopify.com](https://help.shopify.com/en/manual/online-store/dynamic-checkout), primary) | A choice on the product block over the existing basket and checkout | Taken: v0.8 Element round, ER-D |
| C138 | Order and accounting export | Squarespace ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/206540677-Export-Commerce-orders), primary); Shopify ([help.shopify.com](https://help.shopify.com/en/manual/fulfillment/managing-orders/exporting-orders), primary) | Urd keeps no order store; the payment provider's settlement reports and the owner notices serve the accounts | Not taken: no order store; the provider's reports |
| C139 | Paid registration as a dated service product: a course, camp or dinner sold like a product, places as published stock per variant, no shipping, payment reserved at checkout and captured when the place is confirmed, the withdrawal exception for a leisure service on a fixed date stated on the product | Squarespace service products ([support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/206540867-Service-products), primary); WildApricot event payments ([wildapricot.com/pricing](https://www.wildapricot.com/pricing), primary); the link-out baseline of C110 | Fits a small registration that fills slowly and that the organiser confirms place by place; not a ticket rush, a waiting list or check-in; participant answers such as allergies never pass through the function | Taken: v1.1 the shop, to be weighed |

### Closed

| ID | What | Status |
|---|---|---|
| C1 | Line height and letter spacing per text field | Delivered 0.6.6.2 |
| C2 | A gallery block with grid, carousel and slideshow views, and a lightbox | Delivered 0.6.6.1 |
| C3 | The SEO base: per-page description and Open Graph fields, `sitemap.xml` and `robots.txt` at publish, a 404 page, canonical | Delivered 0.7.6 |
| C4 | An RSS feed for dated collections, written at publish | Delivered 0.7.6 |
| C5 | More form field types: select, checkbox, radio, date | Delivered 0.7.4 |
| C6 | A video background layer (a self-hosted mp4 or webm loop) | Delivered 0.7.7 |
| C7 | Nav scroll behaviour: shrink or hide on scroll down, show on scroll up | Delivered 0.6.6.5.12 |
| C7b | A parallax background layer and a stagger animation for card groups | Delivered 0.6.6.4 |
| C8 | A table block | Delivered 0.7.4 |
| C9 | Share buttons and a countdown | Delivered 0.7.4; the share buttons were removed again in 0.7.20.5.3, the countdown stands |
| C10 | An audio block | Delivered 0.7.4 |
| C12 | CSV import and export for collections | Delivered 0.7.5.1 |
| C14 | Privacy-friendly analytics: a site setting for cookieless Cloudflare Web Analytics, the two hosts fixed in `_headers` | Delivered 0.7.6 and 0.7.18.5 |
| C15 | A contrast warning in the Theme panel | Delivered 0.7.12 (`contrast-color()` on the accent surfaces keeps the text readable without a warning); the contrast readout in the picker is C76 |
| C18 | Border and shadow presets for the nav bar | Delivered 0.7.15 |
| C19 | Ribbons: a text marquee block and an image ribbon view | Delivered 0.7.13.7 |
| C20 | Background motion, a photos layer, a pattern layer and shape dividers | Delivered 0.7.13.8 to 0.7.13.10 |
| C21 | An announcement bar and a link launcher | Delivered 0.7.13.5 and 0.7.13.6 |
| C22 | Animated images and self-hosted video as content | Delivered 0.7.13.12 |
| C23 | A full-screen mobile menu and the transparent-to-solid nav | Delivered 0.7.13.3 and 0.7.13.4 |
| C26 | Content that grows pushes the blocks below, and blocks shrink instead of wrapping | Delivered 0.7.17.2 |
| C54 | The `<noscript>` line in the HTML shells in English | Delivered 0.7.0.51 |
| C91 | The preview's message listener also checks `event.source === window.parent` | Delivered 0.7.0.51 |
| C135 | The order button says the order carries an obligation to pay, with the order lines and the total directly above it | Delivered 0.7.24.6 |

### Notes

- **Synced symbols.** Templates and block groups are inserted as independent copies. Synced global blocks are C34, after v1.0.
- **Mega menu.** It is considered only when a real site documents the need. One submenu level has covered the sites seen so far.
- **Scheduled publishing.** A static host cannot switch content on a timer by itself. The nearest answers are date windows checked in the browser (C98) and a GitHub Action that merges a scheduled draft (C97).
- **Tablet breakpoint.** It is deliberately deferred: Urd keeps two breakpoints ([ADR-0019](../adr/0019-synced-mobile-model.md)), where Webflow's seven cascading ones are the opposite model.
  - Between the content width and the mobile breakpoint the canvas is fluid.
  - The push pass keeps blocks apart ([ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md)), and each block can shrink its content to a floor ([ADR-0025](../adr/0025-the-sizing-model.md)).
  - A proportional page zoom is not taken: a page that only gets smaller adapts nothing ([ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md) decision 5, [SURVEYS.md](SURVEYS.md#scaling-below-the-design-width-23-september-2026)).

### Former numbers

The C-numbers C1 to C26, with C4b and C7b, are unchanged. The old FUNKSJONSKART categories map to the new ones as follows:

| Old category (FUNKSJONSKART) | New category |
|---|---|
| 1 Teksteditor | [1. Text editing](#1-text-editing) |
| 2 Elementbiblioteket | [2. The element library](#2-the-element-library) |
| 3 Design- og layoutverktøy | [3. Design and layout tools](#3-design-and-layout-tools) |
| 4 Media | [4. Media](#4-media) |
| 5 Nav, header og footer | [5. Navigation, header and footer](#5-navigation-header-and-footer) |
| 6 SEO og metadata | [6. SEO and AI search](#6-seo-and-ai-search) |
| 7 Skjemaer og data | [7. Forms and data](#7-forms-and-data) |
| 8 Blogg, CMS og samlinger | [8. CMS, collections and blogs](#8-cms-collections-and-blogs) |
| 9 Butikk | [9. Shop and payments](#9-shop-and-payments) |
| 10 Animasjoner og effekter | [10. Motion and effects](#10-motion-and-effects) |
| 11 Maler | [11. Templates](#11-templates) |
| 12 Diverse: flerspråk, tilgjengelighet, analytics | Languages in [8. CMS, collections and blogs](#8-cms-collections-and-blogs); [12. Accessibility](#12-accessibility); [13. Privacy and compliance](#13-privacy-and-compliance); [14. Analytics and testing](#14-analytics-and-testing) |
| 13 AI og agentverktøy | [16. AI and agents](#16-ai-and-agents) |
| Classes A, B, C, D | «Urd today» paragraphs; Taken; the Open table; Not taken |

---

## Part 2. The function catalogue

This part lists every function the October 2026 enumeration found, one row per function, with Urd's status and the place each function goes. Two enumerations ran on 11 October 2026:

- **Site and business functions:** about 534 distinct functions at 26 builders and club platforms, read from their plan comparison tables, feature pages and help indexes. The enumeration's master table has 602 numbered rows, because the collection and form field types are listed one per row. A row that repeats another row or records «none found» is a note under its table, and the six rows that only list app-market categories are merged into one.
- **Editor and design functions:** about 340 functions at 24 builders, read from help centres, keyboard-shortcut pages and changelogs. The full shortcut sets are in [ELEMENTS.md](ELEMENTS.md).
- **The deepening of 19 October 2026:** the builders whose source lists below carry that date were read again function by function, from their whole help-centre trees, plan tables and release notes from January 2025 to October 2026, and about 1,000 functions were matched to the rows: codes were added where a row lacked them, and 53 site rows and 8 editor rows were added for functions no row covered. The sources per builder name what was read.

A builder code appears only where a page the enumeration could reach documents the function. A missing code does not prove that the builder lacks the function, and the thinly documented builders are under-counted (see the caveats under [Sources for the catalogue](#sources-for-the-catalogue)). Urd's status and placement come from the backlog sorting decided 11 October 2026, checked against the engine as counted that day; the rows the deepening touched, and the rows changed by deliveries since, were checked again against engine 0.7.7 on 19 October 2026.

**Builder codes, site and business functions:**

| Code | Builder | Code | Builder |
|---|---|---|---|
| WX | Wix (Editor, Studio, Harmony and the Wix apps) | SQ | Squarespace (with Acuity Scheduling and Email Campaigns) |
| WF | Webflow | FR | Framer |
| WP | WordPress.com, WordPress core and Jetpack | SH | Shopify |
| GH | Ghost | DU | Duda |
| HO | Hostinger | GD | GoDaddy (Airo) |
| JI | Jimdo | SO | Square Online and Weebly |
| WN | Webnode | ST | Strikingly |
| CA | Carrd | TI | Tilda |
| FI | Figma Sites | CV | Canva Websites |
| NO | Notion Sites | SU | Super (Notion-based sites) |
| DR | Durable | ZO | Zoho Sites |
| WA | WildApricot | SP | Spond Club |
| SW | StyreWeb | RU | Rubic (club administration; no website module found) |

**Builder codes, editor and design functions:**

| Code | Builder | Code | Builder |
|---|---|---|---|
| WF | Webflow | FR | Framer |
| WE | Wix Editor (classic) | WS | Wix Studio |
| WH | Wix Harmony | SQ | Squarespace (Fluid Engine and Finish Layer) |
| WP | WordPress Site Editor 7.0/7.1 | EL | Elementor (with V4 «Atomic») |
| BR | Bricks 2.x | BD | Breakdance (2.x and 3.0) |
| DV | Divi 5 | OX | Oxygen 6 |
| FS | Figma Sites | TI | Tilda (with Zero Block) |
| RM | Readymag | CA | Carrd |
| DU | Duda | HO | Hostinger Website Builder |
| SH | Shopify theme editor (Horizon) | WT | Webstudio |
| CV | Canva websites | JI | Jimdo |
| WN | Webnode | ST | Strikingly |

The two catalogues keep the codes their enumerations used. Figma Sites is FI in the site catalogue and FS in the editor catalogue. Wix is one code (WX) in the site catalogue and three (WE, WS, WH) in the editor catalogue. WP and SH name the whole platform in the site catalogue and only the editor in the editor catalogue.

**The «Server» column** (site catalogue only) is the enumeration's judgement, not a vendor statement:
- **yes:** the function needs a server: a database, logins, payments, sending email or SMS, or scheduled jobs.
- **edge:** it needs a host or CDN setting (redirects, headers, geo rules), but no application backend.
- **no:** it can be produced at build time or in the browser.
- **-:** a plan cap or quota, where the question does not apply.

**The «Urd» column** (status on 11 October 2026, or on 19 October 2026 for the rows checked again that day):
- **Has:** in Urd today.
- **Partial:** part of it is there; the cell names that part.
- **Planned:** a backlog item already describes it.
- **Missing:** not in Urd.
- **n/a:** does not apply to Urd's model; the cell gives the reason.

**The «Where» column:**
- A place in [BACKLOG.md](../BACKLOG.md) or the [roadmap](../languages/ROADMAP-en-GB.md):
  - 0.7 milestones: 0.7.3 mobile rethink, 0.7.9 design stretch, 0.7.10 intuitiveness review and editor polish, 0.7.11 accessibility round, 0.7.20 element menu, 0.7.21 sizing model, 0.7.23 Redirects, 0.7.24 Privacy defaults, and sub-items such as 0.7.3.5.
  - URGENT: Vipps migration (Vipps Checkout ends 30 April 2027; see [Commerce](#6-commerce)).
  - v1.1 the shop: the phase after v1.0 that [ADR-0027](../adr/0027-a-shop-without-a-database.md) decides (variants, published stock, shipping tables, codes, MVA, notices, terms).
  - v0.8 items: baking, entry pages, product pages, responsive pictures, media library, image editor, speed, publish-time files, MCP, events as a collection kind, typed custom fields and site search (both to be weighed), the template model, Animation files, archiving and person collections (AR-1 to AR-5: AR-2 the entry model, AR-3 collection filters, AR-4 the people kind, AR-5 section and page hide), own looks from design tools (OL-1 to OL-5: OL-1 the pointer as custom properties, OL-2 the inline SVG sanitiser, OL-3 faces, OL-4 scoped styles, OL-5 the tokens importer), more calendar designs (CD-1 to CD-6), the accessibility audit in the editor (AU-1 the audit panel, AU-2 the vision simulation), the phone side of the canvas (PH-1 desktop and phone side by side, PH-2 the phone text size), and the Element round in stages ER-A Disclosure and overlays, ER-B Media and files, ER-C Data display, ER-D Collections and carousels, ER-E Forms, ER-F Associations and conversion, ER-G Navigation and utility, ER-H Motion and time.
  - v0.9 items: board handover, content-only editing mode and scheduled publishing (both to be weighed), hardening, touch friendliness, the documentation round.
  - After v1.0: synced global blocks, PR per draft, the concurrency view, multilingual content, import, shop extensions beyond v1.1.
- **Watch:** looked at again when the gate or reason in the cell changes.
- **Not taken:** with the reason.
- **Docs:** handled by the user guide or the setup guide.
- **-:** nothing to do.

The ADRs behind the «Where» column: [ADR-0009](../adr/0009-themed-ui-rule.md) (the themed UI rule), [ADR-0015](../adr/0015-redirects-ownership.md) (redirects ownership), [ADR-0017](../adr/0017-ai-via-local-mcp-server.md) (AI through a local MCP server), [ADR-0018](../adr/0018-bound-content-width.md) (bound content width), [ADR-0019](../adr/0019-synced-mobile-model.md) (the synced mobile model) and [ADR-0020](../adr/0020-optional-payment-layer-vipps-checkout.md) (the optional Vipps payment layer), and [ADR-0027](../adr/0027-a-shop-without-a-database.md) (the shop of v1.1).

### Site and business functions

#### 1. Pages and site structure

| Function | Builders | What it covers | Server | Urd | Where |
|---|---|---|---|---|---|
| Page limits per plan | FR, WF, ST, ZO, DU, WP (unlimited) | Plan caps on static pages | no | n/a: no plans or caps; pages are files in the repo | - |
| Layout or static pages | SQ, all | Free-form content pages | no | Has | - |
| Collection page types | SQ | Blog, Course, Calendar, Portfolio, Store, Videos, Album, Gallery | no (yes for store and courses) | Partial: collections render on pages | v0.8 entry pages |
| CMS template or dynamic item pages | WX, WF, FR, DU, FI, ZO, SH (metaobject pages) | One template rendered per collection item | no | Partial: collections render on pages | v0.8 entry pages |
| Conditional CMS detail layouts | FR | Show or hide sections by field values | no | Partial: collections render on pages | v0.8 entry pages |
| Related-collection lists on detail pages | FR | A second collection shown on an item page | no | Partial: collections render on pages | v0.8 entry pages |
| Reuse a page design with another collection | FR | Duplicate a CMS page and rebind its source | no | Partial: collections render on pages | v0.8 entry pages |
| Landing page builder | WX | Standalone campaign pages | no | Has | - |
| Page and section templates | DU (2-5 custom templates), WX, SH (metaobjects) | Reusable page or section blueprints | no | Has: page, section and group templates | - |
| Page duplication | WX, DU, SQ | Copy a page | no | Missing | 0.7.10 |
| Hidden or not-linked pages | SQ, SU | Public but not in the navigation | no | Has | - |
| Enable or disable pages | SQ, SH | Take a page offline | no | Missing | v0.8 AR-5: section hide, extended to whole pages |
| Set homepage | SQ | Choose the root page | no | Has | - |
| Draft pages and single-page publish | ZO, WP | Unpublished pages; publish one page at a time | no | Partial: drafts across pages; publishing sends the whole draft | Watch |
| Password-protected site or pages | FR, SQ, CA, FI, CV, SU, TI, ST, WF (Growth workspace), SH (private mode) | Shared password gate | yes | Missing | Not taken: Cloudflare Access, a recipe in the v0.9 documentation round |
| IP-restricted access | TI, SQ (SSO, Enterprise) | Allowlist by IP address, or sign-in through an identity provider (Okta, Entra ID, Google) | edge | Missing | Not taken: Cloudflare Access, a recipe in the v0.9 documentation round |
| Members-only pages | WX, SQ, DU, ST, TI, GH, WP | Login or plan-gated pages | yes | Missing | Not taken: Cloudflare Access, a recipe in the v0.9 documentation round |
| Custom 404 page | WX, SQ, DU, ZO, TI, SH | Branded not-found page | no | Partial: Urd's own static page, which the site owner cannot edit | ER-G: editable 404 text |
| URL redirects (301 and 302) | WX, SQ, FR, WF, WN, ZO, TI, CA, WP, SU, SH | Old-path to new-path rules | edge | Missing | 0.7.23 Redirects |
| Bulk redirect import | WX, SQ (a text list), SH (CSV) | Upload many 301s at once | edge | Missing | 0.7.23 Redirects |
| Custom URL slugs | WX, SQ, WN, TI, FI | Editable paths | no | Has | - |
| Site search | WX, FR, WF, WP, WN, SU, NO, ZO, SH (Search & Discovery), SQ | Search box over pages and CMS | yes (or a prebuilt client index) | Partial: calendar search | v0.8 AR-3 collection filters; v0.8 site search, to be weighed |
| Search tuning | SH (Search & Discovery), SQ | Typo tolerance, search syntax, synonyms and boosted results | no | Missing | v0.8 site search, to be weighed (C61) |
| Automatic XML sitemap | WX, SQ, FR, WF, WN, ZO, TI, DR, SH | sitemap.xml generated | no | Has | v0.8 publish-time files: `lastmod` and image entries |
| Navigation menus (multiple) | WX, ZO, SP, NO, SQ, SH | Menu builder with drop-down folders and link items, plan-capped on ZO | no | Has: one menu, one submenu level | - |
| Deeper submenu levels | SH (three levels) | Items nested two levels below the top item, drawn as drop-downs or a mega menu | no | Partial: one submenu level, with card, flat, pills, lines and flyout styles and columns | - |
| Breadcrumbs and search in the nav bar | NO | Navigation bar options | no | Missing | ER-G: breadcrumbs; search as for site search |
| Anchor links | WX, SQ | Jump to a section | no | Has | - |
| Lightbox pop-ups and overlays | WX, FR | Modal content | no | Partial: gallery lightbox, product quick view | ER-A |
| Mobile information bar | SQ (Core+) | Sticky contact or address bar on mobile | no | Partial: announcement bar, docked block | - |
| Business contact details and hours | SQ | Phone, email, address and opening hours kept once, used by the mobile information bar and the LocalBusiness data | no | Partial: the legal name, the organisation numbers of the site's country, the address, phone and email kept once in the site settings, drawn by every footer and written into the Organization JSON-LD (0.7.24.5.1); no hours | 0.7.24.5: the Contact details block; ER-C: opening hours |
| Announcement bar | SQ (Core+) | Site-wide banner | no | Has | - |
| Multi-site under one domain | FR | Rewrite rules combining projects | edge | n/a | v0.9: «any static host» covers sub-paths |
| Sub-path or subdirectory hosting | SU (Custom), GH (+$50) | Serve the site at /blog or /docs | edge | n/a | v0.9: «any static host» covers sub-paths |
| Reverse-proxy self-hosting | FR | Cloudflare or NGINX in front | edge | n/a | v0.9: «any static host» covers sub-paths |
| Static file hosting | FR (Pro: 50 files), CA (Plus), SQ (20 MB per file), SH | Upload PDFs and other files | no | Partial: files placed in `media/` through git; no upload in admin | ER-B: file list |
| Well-known files | FR, WF (Premium), SQ (ads.txt) | `/.well-known/*` verification files and root text files such as ads.txt | no | Partial: the repo can hold them, with no UI | - |
| Favicon and site icon | DU, WN, TI, ZO, NO, CA, FI, SH, SQ | Browser icon | no | Has | - |
| Site QR codes | CA, SQ | QR code linking to the site | no | Missing | ER-G: an encoder of Urd's own (C119) |
| File download area | SP | Files for viewing or downloading | no | Missing | ER-B: file list |
| Smart categories (auto-filled pages) | SP | Pages filled from club data | yes | n/a: generated from a member register Urd does not hold | - |
| Board and contact overview page | SW | Generated from the member register | yes | n/a: generated from a member register Urd does not hold | - |
| Activity or events calendar on the site | SW, WX | Calendar fed from events data | yes | Has: calendar block | - |
| Infinite scroll and load more | FR | Progressive list loading | no | Missing | ER-D |

#### 2. SEO and AI search

The SEO services marked «Not taken» need a third party or a server. The MCP server lets the site owner's own agent do the writing instead ([ADR-0017](../adr/0017-ai-via-local-mcp-server.md)).

| Function | Builders | What it covers | Server | Urd | Where |
|---|---|---|---|---|---|
| Meta title and description | WX, SQ, FR, WF, WN, TI, DR, CA, FI, SH | Per-page metadata | no | Has | - |
| Patterned or default meta templates | WX, FR, SQ (title formats) | Metadata from CMS fields | no | Missing | v0.8 entry and product pages |
| Open Graph and social share images | WX, TI, CA, FI, FR, SQ, SH | og:image and og:title | no | Has | - |
| Canonical tags | WX, FR, CA | rel=canonical, custom per site | no | Has | - |
| robots.txt (automatic or editable) | WX, FR, TI, DR, SQ (fixed, with a site-wide crawler block), SH (editable template) | Crawler rules | no | Has: generated, not editable | v0.8 publish-time files: Content-Signal line and AI-crawler choice |
| Per-page noindex | FR, TI, SQ, SH | Exclude a page from search | no | Has | - |
| Block known AI crawlers | SQ | A toggle adds exclusions to robots.txt | no | Missing | v0.8 publish-time files: AI-crawler choice |
| Structured data (automatic) | SQ (BlogPosting, Event, LocalBusiness, Organization, Product, WebSite), WX, DR | JSON-LD output | no | Partial: Organization and Event | v0.8 baking: BlogPosting, Product, WebSite, BreadcrumbList |
| Custom JSON-LD and schema generator | FR, ZO, WX (dynamic pages) | Hand-written or generated schema | no | Missing | Watch |
| SEO checklist or wizard | WX, SQ, TI | Guided setup | no | Partial: a marker on pages without a description | v0.8 AU-1 audit panel, which also covers SEO checks |
| SEO assistant | WX, TI, HO (AI), SQ (AI Site Scanner, announced) | In-dashboard suggestions | no (yes if AI) | Missing | Not taken: third party or server |
| Keyword research | WX (Semrush), DR, SQ (search keyword analysis) | Keyword data | yes | Missing | Not taken: third party or server |
| Google Search Console connection and verification | WX, SQ, FR, WN, TI, JI, ZO, SH | Ownership verification; SQ also verifies Bing Webmaster Tools | no | Missing | v0.8 publish-time files: a verification field |
| SEO dashboard with Search Console data | WX, SQ | Search performance inside the dashboard | yes | Missing | Not taken: third party or server |
| Instant or fast indexing | WX | Push URLs to Google | yes | Missing | Watch (IndexNow) |
| Bot log reports | WX | Crawler hits per page | yes | Missing | Not taken: third party or server |
| Site inspection tool | WX | Index status per URL | yes | Missing | Not taken: third party or server |
| Lumar and Semrush integrations | WX | Third-party SEO tools | yes | Missing | Not taken: third party or server |
| SEO APIs | WX | Programmatic SEO settings | yes | Missing | Not taken: third party or server |
| Server-side rendering | WX | HTML rendered for crawlers | no (static equivalent) | Missing | v0.8 baking |
| Traffic-aware pre-rendering | FR | Builds large sites by traffic priority | edge | Missing | v0.8 baking |
| Image optimisation (resize, WebP, lazy load) | WX, FR, TI, DU, SQ | Automatic image processing | no | Partial: WebP at upload | v0.8 responsive pictures |
| Font and video optimisation | FR | Delivery optimisations | no | Has: system fonts, media limits | - |
| Third-party script optimisation | FR | Defers scripts for Core Web Vitals | no | Has: no third parties by default | - |
| Optimisation warnings and linting | FR | Project-level warnings | no | Missing | v0.8 «show the engine's lightness» |
| AMP pages | WX (blog), TI | Accelerated mobile pages | no | Missing | Not taken: obsolete |
| Heading tag control | TI, DR, SQ | H1-H3 configuration | no | Has | - |
| Image alt text | WN, TI, WP, WF, SQ | Alt attributes | no | Has | - |
| Site name shown in Google | FR | WebSite name markup | no | Partial: og:site_name and the Organization name | v0.8 baking: WebSite JSON-LD |
| Hreflang (automatic) | FR, WF, SH | Language alternates | no | n/a until there is multilingual content | After v1.0: multilingual content |
| Per-locale sitemaps | WF, SH | One sitemap per locale | no | n/a until there is multilingual content | After v1.0: multilingual content |
| llms.txt | WX (automatic on upgraded sites), FR, DR (Launch+), SQ (editable), SH (with llms-full.txt and agents.md) | Markdown index for LLMs | no | Missing | v0.8 publish-time files |
| Markdown for AI agents | WF (Enterprise, Cloudflare) | HTML converted to Markdown on agent requests | edge | Missing | v0.8 publish-time files: a Markdown twin per page |
| AI visibility tracking | WX, SQ (AI credits), WF (AEO), DU, DR | Brand mentions in ChatGPT, Gemini and others; competitor benchmarks | yes | Missing | Not taken: third party or server |
| AEO and GEO optimisation agents | WF (Enterprise Analyze), DU, DR | AI rewrites content to be cited | yes | Missing | Not taken: third party or server |
| Facts and answers for AI agents | SH (Knowledge Base) | Store facts and answers to common questions handed to AI shopping agents, not shown on the site | yes | Missing | Not taken as a service: the site's own pages, the FAQ block and llms.txt (v0.8 publish-time files) serve agents |
| AI-generated meta tags | WX, HO, SQ (SEO Report) | An LLM writes metadata | yes | Missing | Not taken: third party or server |
| Google Business Profile | WX, DR, JI | Local listing management | yes | Missing | Not taken: third party or server |
| Directory listings and NAP consistency | DR | Syncs name, address and phone to directories | yes | Missing | Not taken: third party or server |
| Review requests by email | DR | Asks customers for Google reviews | yes | Missing | Not taken: third party or server |
| Shopping feeds | SQ (Core+), WX, SH, WN | Google Merchant and price-comparison feeds | yes | Missing | Watch: a static product feed is possible |
| Mirror, HTTPS and www redirects | TI, SQ, SH | Host canonicalisation: one primary domain, the others redirected to it | edge | Has: host-level on Cloudflare | Docs (v0.9 documentation round) |
| Product SEO | WN, WX | Product meta fields | no | Missing | v0.8 product pages |

Note: **Content-Signal in robots.txt** was searched for and no builder documents it; only Cloudflare's own policy turned up. Urd: Missing. Where: v0.8 publish-time files (a Content-Signal line the site owner chooses).

#### 3. Content and CMS

Urd has no user-defined fields: each collection kind shares a fixed set of field names. The typed field rows below that are «Missing» belong to one v0.8 item, to be weighed: typed custom fields per collection, arriving with events as a collection kind.

| Function | Builders | What it covers | Server | Urd | Where |
|---|---|---|---|---|---|
| Collections | WX, WF, FR, FI, ZO, DU, NO, SU, SH (metaobjects) | Structured content types | no (if built statically) | Has | - |
| Collection and item limits | FR, WF, ZO | Plan caps | - | n/a: no plans or caps | - |
| Field: plain text | WX, WF, FR, FI | Short text | no | Has | - |
| Field: rich text or formatted text | WX, WF, FR, FI | HTML content | no | Has | - |
| Field: rich content (structured document) | WX | Ricos rich-content object | no | Has: rich text | - |
| Field: number | WX, WF, FR | Numeric value | no | Has | - |
| Field: boolean, switch or toggle | WX, WF, FR | True or false | no | Missing | v0.8 typed custom fields, to be weighed |
| Field: date | WX, FR, FI | Date value | no | Has | - |
| Field: date and time | WX, WF | Timestamp | no | Partial: date only | v0.8 typed custom fields, to be weighed |
| Field: time | WX | Time of day | no | Missing | v0.8 typed custom fields, to be weighed |
| Field: colour | WX, WF, FR | Hex or RGBA | no | Missing | v0.8 typed custom fields, to be weighed |
| Field: image | WX, WF, FR, FI | Single image | no | Has | - |
| Field: media image with alt text | WX | Image object | no | Has: image with alt text | - |
| Field: multi-image or gallery | WX, WF, FR (array) | Image list | no | Missing | v0.8 typed custom fields, to be weighed |
| Field: video or video link | WX, WF | Video URL | no | Missing | v0.8 typed custom fields, to be weighed |
| Field: audio | WX | Audio file | no | Missing | v0.8 typed custom fields, to be weighed |
| Field: document or file | WX, WF, FR | File asset | no | Missing | v0.8 typed custom fields, to be weighed |
| Field: URL or link | WX, WF, FR, FI | Link | no | Has | - |
| Field: email | WX, WF | Email address | no | Missing | v0.8 typed custom fields, to be weighed |
| Field: phone | WF | Phone number | no | Missing | v0.8 typed custom fields, to be weighed |
| Field: address (with geo) | WX | Structured address with latitude and longitude | no | Missing | v0.8 typed custom fields, to be weighed |
| Field: tags | WX | String array | no | Missing | v0.8 typed custom fields, to be weighed |
| Field: option or enum | WF, FR | Fixed choices | no | Missing | v0.8 typed custom fields, to be weighed |
| Field: single reference | WX, WF, FR | Link to another item | no | Missing | v0.8 typed custom fields, to be weighed |
| Field: multi-reference | WX, WF, FR | Links to many items | no | Missing | v0.8 typed custom fields, to be weighed |
| Field: array and object | WX | Raw JSON values | no | Missing | v0.8 typed custom fields, to be weighed |
| Field: title and slug | FI | Required identity fields | no | Partial: items have titles; item slugs arrive with entry pages | v0.8 entry pages |
| Dynamic filters | FR | Visitor-side filtering | no | Planned | v0.8 AR-3 collection filters |
| Limit and sort visible items | FR | List controls | no | Has | - |
| Markdown import and export | FR | Bulk content in Markdown | no | Partial: CSV import and export | Watch |
| On-page editing of the live site | FR, WF | Edit from the published site | yes | Has: the admin edits the real page | - |
| Collection backups and restore | WX | Weekly automatic, manual, restore | yes | Has: git keeps the history | - |
| Restore deleted collection | WX | Undo a delete | yes | Has: git keeps the history | - |
| External database connection | WX, DU (connected data) | Bring your own data source | yes | Missing | Not taken |
| CMS and data APIs | WX, WF, FR (plugin API), GH (Content and Admin APIs) | CRUD over content | yes | Missing | v0.8/v0.9 MCP (ADR-0017) |
| Webhooks | GH (Publisher+), WX, FR (forms), TI | Event push to external URLs | yes | n/a: GitHub sends its own | - |
| Scheduled publishing of content | WP, WX, TI, WN, SH | Publish at a set time | yes (scheduled job) | Missing | v0.9 scheduled publishing, to be weighed: date windows in the browser, or a GitHub Action |
| Revisions or time machine | WP | Post history | yes | Has: git keeps the history | - |
| RSS or Atom from a database | SU, GH, WP | Feed generation | no | Has: RSS for dated collections | - |
| Localised CMS content | WF, FR | Per-locale field values | no | Missing | After v1.0: multilingual content |
| Collection content search | ZO | Search within collections | yes | Planned | v0.8 AR-3 collection filters |
| Content import from an existing site | DU, WN (AI migration), WP (importers), SQ, SH (Store Migration app) | Migration tools | yes | Missing | After v1.0: import |
| CMS agent | FR | AI organises and updates content | yes | Missing | v0.8/v0.9 MCP (ADR-0017) |
| Notion as CMS | NO, SU | Notion pages and databases rendered as a site | yes | Missing | Not taken |
| Metafields | SH | Custom fields on products, orders, customers | no | Missing | Not taken |
| FAQ app | WX | Question-and-answer collection | no | Has: FAQ block | - |
| Portfolio collections and projects | WX, SQ | Project items, with a page per project | no | Partial: a custom collection shown as cards; projects have no pages of their own | v0.8 entry pages |
| Semantic search API | WX, SH (storefront semantic search) | Vector search tool | yes | Missing | Not taken |
| Rich-text video embeds | FR | Video inside formatted text | no | Partial: a video block, not inside the text | - |

#### 4. Blog

Urd's blog is the news collection. The functions that need a server are not taken; a newsletter provider can read the RSS feed instead (a recipe for the v0.9 documentation round).

| Function | Builders | What it covers | Server | Urd | Where |
|---|---|---|---|---|---|
| Blog | WX, SQ, WP, GH, WN, TI (Feeds), SO, ST, DU, SH | Posts with list and detail pages | no | Partial: the news collection; posts have no pages of their own | v0.8 entry pages |
| Categories and tags | WX, WN, TI, WP, SQ, SH | Taxonomies | no | Missing | v0.8 AR-3 collection filters |
| Post thumbnails | WN, SQ, SH | Featured images | no | Has | - |
| Post excerpts and metadata in lists | SQ, SH | An excerpt per post, and the date, author, tags and categories on list cards with a read-more link; author and tag filters on SQ | no | Partial: an entry's date, text and link show on the cards; no separate excerpt, author or tags | v0.8 AR-2: the excerpt, to be weighed (C117); authors with the v0.8 entry pages (C4b); tags with v0.8 AR-3 collection filters |
| Featured posts | SQ | A post marked as featured, and lists that show only the featured ones | no | Missing | v0.8 AR-2: a featured flag beside `kicker` and `urgent`, to be weighed |
| Multiple authors and blog roles | WX (Editor, Writer, Guest Writer), WP, SQ, SH | Author permissions, and bylines with a bio | yes | Missing | v0.8 entry pages: an author field |
| Comments and moderation | WX, WP, GH, SQ (moderator role), TI (Disqus), SH | Visitor comments | yes | Missing | Not taken: server |
| Likes | WX | Post reactions | yes | Missing | Not taken: server |
| Scheduled posts | WX, WN, TI, WP, SQ, SH | Future publish date | yes | Missing | v0.9 scheduled publishing, to be weighed |
| Post stats | WX | Views per post | yes | Missing | Not taken: server |
| Paid or members-only posts | WX, GH, WP, SQ | Gate posts by plan | yes | Missing | Not taken: server |
| Email newsletter from posts | GH, WP, SQ | Send a post by email | yes | Missing | Not taken: server |
| Multiple newsletters | GH (1 / 3 / 10), SQ (up to 20 lists) | Separate lists | yes | Missing | Not taken: server |
| Newsletter segmentation | GH | Send to segments | yes | Missing | Not taken: server |
| Custom newsletter template | GH, SQ | Branded email design | yes | Missing | Not taken: server |
| Edit links after sending | GH | Rewrite tracked links | yes | Missing | Not taken: server |
| Custom sending domain | GH (Publisher+), SQ | DKIM and SPF on the site's own domain | yes | Missing | Not taken: server |
| Dedicated sending IP | GH (Custom) | Deliverability | yes | Missing | Not taken: server |
| Blog AMP | WX, TI, SQ (retired 2025) | AMP versions of posts | no | Missing | Not taken: obsolete |
| Blog RSS | GH, WP, SU, SQ, SH (Atom) | Feed | no | Has | - |
| Podcast feed | SQ | Audio posts become episodes in an iTunes-compatible RSS feed | no | Missing | v0.8 typed custom fields, to be weighed: an audio field written as the feed's enclosure |
| Per-feed sitemap | TI | Sitemap per blog | no | n/a until posts have pages of their own | v0.8 entry pages |
| Recent-posts layouts | WN | Post list widgets | no | Has | - |
| AI blog writing | WX, DR, WN | An LLM drafts posts | yes | Missing | Not taken: server |
| Social-web distribution | GH | Federated publishing | yes | Missing | Not taken: server |
| Discovery network | GH (Explore) | Directory of publications | yes | Missing | Not taken: server |
| Cross-site recommendations | GH | Recommend other publications | yes | Missing | Not taken: server |
| Share posts to social media | SP, WP (auto-share), SQ | Post to networks | yes | Missing | Not taken: server |
| Publishing to news apps | SQ (Apple News) | Posts cross-published to a news channel after approval | yes | Missing | Not taken: server |
| Blog time-zone setting | TI | Publication time zone | no | Has | - |
| Product cards and downloadable files in posts | GH | Editor cards | no | Partial: product blocks on the page; no file cards | ER-B |

#### 5. Forms

Urd's form block sends by mailto or to an endpoint the site owner chooses (a form service or a webhook). Fields and functions that store, process or take payment need a server and are not taken in the core. Registration and membership sign-up are handed off to the club platforms.

| Function | Builders | What it covers | Server | Urd | Where |
|---|---|---|---|---|---|
| Form builder | WX, SQ, FR, WP, WF, TI, CA, WN, JI, ST, SO, ZO, DU, HO, SH (Shopify Forms) | Form blocks | yes (submission endpoint) | Has: mailto or an endpoint | - |
| Field: short text | WX, SQ, FR, WP, SH | Single line | - | Has | - |
| Field: long text or text area | WX, SQ, FR, WP, SH | Multi-line | - | Has | - |
| Field: name (first and last) | WX, SQ, WP | Name inputs | - | Missing | Not taken: low value |
| Field: email | WX, SQ, FR, WP, SH | Validated email | - | Has | - |
| Field: phone | WX, SQ, FR, WP, SH | Phone, with a country restriction on WX | - | Has | - |
| Field: number | WX, SQ, FR, WP, SH | Numeric | - | Missing | ER-E |
| Field: URL or website | WX, SQ, FR, WP | Link | - | Missing | ER-E |
| Field: date | WX, SQ, FR, WP, SH | Date | - | Has | - |
| Field: date picker | WX | Calendar picker | - | Has: the date field opens the browser's date picker | - |
| Field: date and time | WX | Timestamp | - | Missing | ER-E, with the time field |
| Field: time | WX, SQ, FR, WP | Time | - | Missing | ER-E |
| Field: birthdate | WX | Mapped to a contact | - | Missing | Not taken: low value |
| Field: single-line address | WX | Address text | - | Missing | Not taken: low value |
| Field: multi-line or structured address | WX, SQ | Country-aware parts | - | Missing | Not taken: low value |
| Field: company | WX | Contact field | - | Missing | Not taken: low value |
| Field: position or job title | WX | Contact field | - | Missing | Not taken: low value |
| Field: tax or VAT ID | WX | Contact field | - | Missing | Not taken: low value |
| Field: single checkbox | WX, FR | On/off, consent | - | Has | - |
| Field: subscribe or marketing opt-in | WX, SQ, SH | Email consent | - | Missing | 0.7.24: newsletter sign-up preset with an unticked consent |
| Field: single choice or radio | WX, SQ, FR, WP, SH | One of many | - | Has | - |
| Field: multi choice or checkbox group | WX, SQ, WP, SH | Many of many | - | Missing | ER-E |
| Field: image choice | WX | Picture options | - | Missing | Not taken: low value |
| Field: dropdown or select | WX, SQ, FR, WP, TI, SH | Menu | - | Has | - |
| Field: tag picker | WX | Tag chips | - | Missing | Not taken: low value |
| Field: rating | WX, WP (stars or hearts), TI | Star scale | - | Missing | Not taken: low value |
| Field: Likert survey | SQ | 5-point agreement scale | - | Missing | Not taken: low value |
| Field: slider | WP | Range | - | Missing | ER-E |
| Field: currency amount | SQ | Money input | - | Missing | Not taken: low value |
| Field: hidden | SQ, WP | Tracking values | - | Missing | ER-E (cheap) |
| Field: social handle | SQ (Twitter) | @handle | - | Missing | Not taken: low value |
| Field: password | SQ | Masked text | - | Missing | Not taken: low value |
| Field: line or section break | SQ | Visual separator | - | Missing | ER-E (cheap) |
| Field: rich content or custom HTML | WX, WP | Display-only content | - | Missing | Not taken: a text block beside the form serves |
| Field: file upload | WX (Core+), SQ (10 MB), WP, TI, WF (Premium/Business), SU, SH (20 MB) | File attachments | yes | Missing | Not taken: server |
| Field: signature | WX (Core+) | Drawn signature stored as an image | yes | Missing | Not taken: server |
| Field: product selection (pay) | WX | Pick items to buy | yes | Missing | Not taken: server |
| Field: fixed-price payment | WX | Pay a set amount | yes | Missing | Not taken: server |
| Field: custom-price payment | WX | The payer enters the amount | yes | Missing | Not taken: server |
| Field: donation amounts | WX | Suggested amounts | yes | Missing | Not taken as a form field (a server is needed to take the payment); the ER-F donation block shows amounts and a Vipps number instead |
| Field: appointment | WX | Book a slot in the form | yes | Missing | Not taken: server |
| Field: service picker (single or multi) | WX | Choose services | yes | Missing | Not taken: server |
| Field: calendar booking in the form | TI | Interactive calendar | yes | Missing | Not taken: server |
| Field: terms consent | WP | Accept terms | - | Missing | 0.7.24 Privacy defaults |
| Price calculator form | TI | Computed totals | no | Missing | Not taken |
| Quizzes, polls and voting | TI | Branching quizzes and votes | yes | Missing | Not taken |
| Conditional logic | WX (rules), SQ (follow-up questions), WP, TI | Show or hide fields | no | Missing | ER-E |
| Multi-step forms | WX, WP, TI | Paged forms | no | Missing | ER-E |
| Validation and required fields | WX, FR | Format checks | no | Has | - |
| Plan caps on fields, steps, rules, forms and submissions | WX, ZO, WF, CA, DU (unlimited) | Quotas | yes | n/a: no plans or caps | - |
| Email notifications | FR, WP, SQ | Notify the site owner | yes | Partial: mailto sends straight to the recipient | - |
| Submissions inbox | WP (Responses), WX (Inbox), ST, SQ (Contacts) | View entries | yes | Missing | Not taken: an endpoint provider has one |
| Submissions to Google Sheets | SQ, FR | Append rows | yes | Partial: endpoint mode can post to any webhook | Docs: recipes (v0.9 documentation round) |
| Submissions to a webhook | FR, TI | POST the data out | yes | Partial: endpoint mode can post to any webhook | Docs: recipes (v0.9 documentation round) |
| Submissions to Zapier or Mailchimp | SQ (Zapier on Core+), TI, CA | Automation | yes | Partial: endpoint mode can post to any webhook | Docs: recipes (v0.9 documentation round) |
| Submissions to 20+ services | TI, CA | Trello, Slack, Notion, Telegram, Salesforce, Monday, Zoho CRM and others | yes | Partial: endpoint mode can post to any webhook | Docs: recipes (v0.9 documentation round) |
| Auto-create a CRM contact | WX, SQ, TI | Contact mapping | yes | Missing | Not taken: server |
| reCAPTCHA | SQ (default), WF | Google challenge | yes | Missing | Not taken: Google |
| Cloudflare Turnstile | WF | Invisible challenge | yes | Partial: honeypot | v0.9: forms through the site's own function |
| Honeypot field | WF | Hidden trap field | yes | Has | - |
| Spam filtering and rate limiting | FR, WF, WN, WP (Akismet), SH (hCaptcha) | Server-side spam checks | yes | Partial: honeypot | v0.9: forms through the site's own function |
| Captcha API | WX | Programmatic captcha | yes | Missing | Not taken: server |
| Redirect or overlay after submit | FR, WP, SH | Success behaviour | no | Partial: success text | ER-E |
| Push notification on a new response | WP | Mobile push | yes | Missing | Not taken: an endpoint provider has it |
| Form conversion analytics | SQ (Core+), FR | Conversion per form | yes | Missing | Not taken: an endpoint provider has it |
| GDPR-friendly forms | WN | Consent handling | yes | Missing | 0.7.24 Privacy defaults |
| AI form generation | WP | Describe a form and AI builds it | yes | Missing | Not taken |
| File storage to Dropbox or Google Drive | TI | Upload destination | yes | Missing | Not taken: server |
| Third-party form embeds | FR (HubSpot, Marketo, Typeform, Formspark) | Embedded forms | no | Missing | 0.7.24: allowlisted click-to-load frames |
| Advanced forms tier | CA (Pro Plus) | Extended form options | yes | Missing | Not taken |
| Course or registration forms on the site | SP | Embedded club sign-up | yes | Missing | ER-F: hand-off to Spond, StyreWeb, Rubic, Checkin or Hoopla |
| Digital membership sign-up | SW, SP | A join form writes to the register | yes | Missing | ER-F: hand-off to Spond, StyreWeb, Rubic, Checkin or Hoopla |
| Payment within registration | SP, WA | Pay while registering | yes | Missing | ER-F: hand-off to Spond, StyreWeb, Rubic, Checkin or Hoopla |

#### 6. Commerce

Urd's shop is a gateway-free core ([ADR-0020](../adr/0020-optional-payment-layer-vipps-checkout.md)): orders arrive by email or through the optional Vipps layer. «Not taken: gateway-free core» below refers to that decision. The Vipps layer calls Vipps Checkout, which Kustom states is discontinued on 30 April 2027 ([kustom.co FAQ](https://www.kustom.co/kustom-vipps-faq), read 11 October 2026, primary), so it must move first (URGENT: Vipps migration).

| Function | Builders | What it covers | Server | Urd | Where |
|---|---|---|---|---|---|
| Online store and cart | WX (Core+), SQ, WF, SH, WP, HO, GD, JI, SO, WN, ST, TI, WA, SW | Catalogue, cart, checkout | yes | Has | URGENT: Vipps migration |
| Product-count limits | WF (500 / 5,000 / 15,000), ST (1 / 300 / 500), JI (about 100), WX (50,000) | Plan caps | - | n/a: no plans or caps | - |
| Unlimited products | SQ, SH, GD, WP | No cap | - | Has: no cap | - |
| Product variants | WX, WN, SH, SQ | Option choices such as size and colour | yes | Has: size and colour choices, and a colour with its own image | - |
| Price, stock, weight and image per variant | SQ, SH | Each variant combination with its own price, sale price, stock, weight and image; up to 250 (SQ) or 2,048 (SH) variants | no | Partial: a colour can carry its own image; one price per product; no stock or weight | v1.1 the shop (variants with price, SKU, availability and image) |
| SKU and barcodes | SQ, SH | An SKU per variant, GTIN or MPN, and barcodes for scanning | no | Missing | v1.1 the shop (an SKU per variant) |
| Item modifiers | SO, SQ | Add-on choices; a form of questions when a product is added to the cart | yes | Missing | After v1.0: shop extensions |
| Product add-ons | WP | Paid extras | yes | Missing | After v1.0: shop extensions |
| Kits and bundles | WP, SH | Assembled products | yes | Missing | After v1.0: shop extensions |
| Min/max quantities | WP, SQ (Core+), SH | Purchase limits per product or cart; a minimum or maximum order value | yes | Missing | After v1.0: shop extensions |
| Digital downloads | WX, SQ, ST, WF | Delivery after payment | yes | Missing | Not taken: gateway-free core |
| Service products | WF, SQ | Sell services | yes | Missing | Not taken: gateway-free core |
| Product subscriptions | WX, SQ, WF (Stripe), SO (Plus), SH | Recurring orders | yes | Missing | Not taken: gateway-free core |
| Payment plans, instalments, BNPL | SQ (Core+), SH, WX | Klarna, Afterpay, Shop Pay Installments | yes | Missing | Not taken: gateway-free core |
| Inventory management | WX, SQ, SH, WP, HO | Stock tracking per variant | yes | Missing | v1.1 the shop (published stock per variant) |
| Multi-location inventory | SH (10 / 200 locations) | Per-location stock | yes | Missing | Not taken: gateway-free core |
| Low-stock alerts and demand forecasting | SH | Inventory intelligence | yes | Missing | Not taken: gateway-free core |
| Transfers and purchase orders | SH | Stock operations | yes | Missing | Not taken: gateway-free core |
| Back-in-stock notifications | WX (10 per month on Core, unlimited on Business+), WP, SQ (Core+) | Email when restocked | yes | Missing | After v1.0: shop extensions |
| Product status labels | SQ | Limited availability, out of stock | no | Has: badge | - |
| Product availability display | WN, SQ, SH | Stock state; sold out blocks the purchase; a low-stock label; sold-out products hidden | yes | Partial: the badge can show it | v1.1 the shop (sold out from the published stock) |
| Pre-orders and backorders | SH | Selling when out of stock or before release, with full, partial or no payment up front | yes | Missing | After v1.0: shop extensions (reserve at order, capture on shipping) |
| Product import and export (CSV) | WX, WN, SQ, SH | Bulk catalogue | yes | Has | - |
| Import from other shop platforms | SQ, SH | Products moved in from Etsy, Shopify, Big Cartel, WooCommerce, Square and others by CSV or account connection | yes | Partial: CSV import of a product collection in Urd's own columns | After v1.0: import |
| Product status and visibility | SQ, SH | Draft, hidden or unlisted, scheduled and archived products | no | Missing | v0.8 AR: entry states |
| Product reviews | WX (Business+), SQ, SH (apps) | Ratings | yes | Missing | Not taken: server |
| Recommendations and upsells | SH, WP, SQ | Cross-sell | yes | Missing | v0.8 product pages (recommendations); After v1.0: shop extensions (upsells) |
| Brands | WP, SH | Shop by brand or vendor | no | Missing | After v1.0: shop extensions |
| Price per unit | TI, SH | Unit pricing | no | Missing | After v1.0: shop extensions |
| Sale price beside the regular price | SQ, SH | A sale or compare-at price per product or variant, the old price struck through and a Sale badge | no | Partial: a «Sale» badge and a member price; no reduced price beside the old one | v1.1 the shop (with the before price (førpris), prisopplysningsforskriften § 9a) |
| Product video and 3D | SH | Rich media | no | Partial: a video block beside the product; the product gallery holds images only | - |
| Product notices and disclosures | SH | Safety, legal and regulatory notices per product, shown on the product and in the cart | no | Partial: the product text can carry a notice | v1.1 the shop (a note that the withdrawal right does not apply, angrerettloven § 22) |
| Product QR codes and barcode labels | SH | Retail labels | no | Missing | Watch |
| Product search and filtering | WN, SH, SQ | Catalogue search, filters and search boosts | yes | Planned | v0.8 AR-3 collection filters |
| Product categories, tags and collections | SQ, SH | Categories as store navigation (three levels on SQ), tags, product types and a standard taxonomy, manual or rule-based collections | no | Partial: several product collections and the shop categories preset; no tags or rule-based collections | v0.8 AR-3 collection filters |
| AI product descriptions | WX | LLM copy | yes | Missing | Not taken: the site owner's own agent through MCP (ADR-0017) |
| Price recommendations and price tests | SH | AI markdown and markup tips from sales data, and A/B price tests | yes | Missing | Not taken: needs sales data on a server |
| Discounts, coupons, promo codes | WX, SQ (Core+), SH, WN, ST, TI, WF, RU | Code-based discounts: percentage or fixed, on products, categories or the order, within a validity window | yes | Missing | v1.1 the shop (codes without use limits) |
| Bulk or dynamic discounts | WP, TI, SQ (Core+), SH | Discount by quantity or cost, buy X get Y, automatic discounts without a code | yes | Missing | Not taken: gateway-free core |
| Free-shipping vouchers | WN, SQ (Core+), SH | Shipping discount | yes | Missing | v1.1 the shop |
| Gift cards | WX, SQ, SH, SO | Stored value, sold or issued by hand; store credit | yes | Missing | Not taken: gateway-free core |
| Express checkout and digital wallets | WX, SQ, SH | Saved details | yes | Partial: express Vipps; no other wallets | URGENT: Vipps migration |
| Mini cart | SQ, SH | Slide-out cart, cart page or pop-up | no | Has: cart drawer | - |
| Buy now: straight to checkout | SQ, SH | A purchase button that skips the cart, for single-product shops | no | Missing | ER-D: one featured product (a buy-now button) |
| Cart and checkout links | SH | Links that open the cart or checkout with chosen products, quantities, a discount code and prefilled details | edge | Missing | After v1.0: shop extensions |
| Checkout on the site's own domain | SQ | Branded checkout | yes | Partial: the order form is on the site; the Vipps payment is on Vipps's hosted page ([ADR-0020](../adr/0020-optional-payment-layer-vipps-checkout.md)) | URGENT: Vipps migration |
| Customisable checkout | WX, WF, WN, SH (full on Plus), SQ | Checkout fields, order-level questions, address autocomplete and branding | yes | Partial: the checkout block is an order form | - |
| Order review and the order button | SH | A review step before the purchase where the law asks for it, and the wording of the button that places the order | yes | Has: the order in one line and the total right above the buttons, which read «Confirm purchase» and «Pay with Vipps» (0.7.24.6) | - |
| Release-based selling, reserved cart and timer | SQ (timer on Advanced), SH (Plus) | Drops and limited launches | yes | Missing | Not taken: gateway-free core |
| Checkout bot protection | SH (Plus) | CAPTCHA checkpoints that stop bots completing checkouts, also during timed launches | yes | Partial: a honeypot field in the checkout form | - |
| Abandoned cart recovery | WX (Core+), SQ, SH | Reminder emails | yes | Missing | Not taken: gateway-free core |
| Customer accounts | SQ, WX, SO, SH | Order history, reorder, balances, saved cards, social or single sign-on | yes | Missing | Not taken: gateway-free core |
| Age verification | SO | Age gate and checkout check | yes | Missing | Not taken: gateway-free core |
| Multi-currency and currency converter | WX, WN, SH, SQ | Local prices | yes | Missing | Not taken: gateway-free core |
| Selling abroad: markets, duties and cross-border tax | SH | Markets per region with their own catalogues and prices, duties and import taxes at checkout, HS codes and country of origin, DDP labels, EU VAT schemes, a merchant of record | yes | Missing | Not taken: an association shop sells in Norway in NOK |
| Local payment methods | SH, SQ | Region-specific methods such as iDEAL | yes | Partial: Vipps | URGENT: Vipps migration |
| Native payment processing | WX, SQ, SH, SO | Built-in processor | yes | Partial: the optional Vipps layer through the site's own function | URGENT: Vipps migration |
| Test orders and test mode | SQ, SH | Checkout in a test mode with test cards or a test gateway | yes | Partial: `VIPPS_API_BASE` points the Vipps layer at the Vipps test environment | Docs: the setup guide (the Vipps test keys) |
| Authorise now, capture later | SH | Capture at checkout, at fulfilment or by hand; partial capture | yes | Partial: the Vipps layer only creates the payment; capture and refunds are done at Vipps | URGENT: Vipps migration (reserve at payment, capture on shipping) |
| Gateway breadth | WX (80+), HO (100+), TI (50+), SH | Many processors | yes | Missing | Not taken: gateway-free core |
| Stripe and PayPal | WF, ST, TI, SQ, SH | Gateways | yes | Missing | Not taken: gateway-free core |
| Apple Pay and Google Pay | WF, SQ, SH | Wallets | yes | Missing | Not taken: gateway-free core |
| ACH bank payments | SQ | Bank debit (ACH in the US, SEPA in euros) | yes | Missing | Not taken: gateway-free core |
| Vipps | RU | Norwegian mobile payment | yes | Has: the optional Vipps Checkout layer | URGENT: Vipps migration |
| Manual payment methods | SH | Bank transfer, cash on delivery or a custom method with instructions shown after checkout; the order is marked paid by hand | yes | Partial: a Vipps number shown as the payment instruction; no other method to choose | - |
| Stablecoin (USDC) | SH | Crypto payment | yes | Missing | Not taken: gateway-free core |
| Transaction fees by plan | SQ, WP, ST, WF, GD (0%), JI (none), SH | Platform fee | - | Has: no platform fee | - |
| Fraud analysis | SH | Order risk scoring | yes | Missing | Not taken: gateway-free core |
| Refunds and chargeback tools | WX, SH, SQ | Disputes | yes | Missing | Not taken: gateway-free core |
| Payout schedule | WX, SH | Settlement timing | yes | Missing | Not taken: gateway-free core |
| Tips | SH, SQ (Acuity) | Gratuity | yes | Missing | Not taken: gateway-free core |
| Split and partial payments | SH | Multiple tenders, deposits and payment terms | yes | Missing | Not taken: gateway-free core |
| Pay links and QR payments | SQ, GD, JI, SQ (Acuity) | Request payment by link | yes | Partial: a Vipps number as an instruction | - |
| Invoices | WX, SQ, WN, WA, GD (US), SW, RU | Billing documents | yes | Missing | Not taken: gateway-free core |
| eFaktura (e-invoice) | RU | Norwegian electronic invoice | yes | Missing | Not taken: gateway-free core |
| Automatic receipts | WA, SH | Payment receipts and order confirmations to the buyer by email or SMS | yes | Missing | v1.1 the shop (the order lines as a receipt in the Vipps app; buyer email is not taken) |
| Order confirmation page | SQ, SH | The page after checkout with the order details and next steps | no | Partial: a thank-you line after the Vipps payment (`?ordered=1`); no order details | 0.7.24.7: a printable confirmation with the order lines and the withdrawal form; v1.1 the shop for the rest |
| Order notifications to the owner | SH | New order, return request and dispute emails to the owner or staff, and a daily or weekly summary | yes | Partial: a mailto order arrives as an email; the Vipps layer sends no notice | v1.1 the shop (a webhook notice to the owner) |
| Automatic payment reminders | RU | Dunning | yes | Missing | Not taken: gateway-free core |
| Price quotes | WX, SQ | Quotes, proposals and contracts for clients | yes | Missing | Not taken: gateway-free core |
| Automated sales tax | WX (Business+), SQ (Core+), WF, GD, SH | Tax calculation | yes | Missing | Not taken: gateway-free core |
| TaxJar integration | SQ, SH | Tax service (TaxJar, Avalara, Vertex) | yes | Missing | Not taken in the core: plugins or link-out |
| Custom tax rates | WX, SQ, SH | Manual rates by country or region, with overrides and exemptions | yes | Missing | v1.1 the shop (the MVA rate per product for a registered seller) |
| Prices including VAT and VAT on receipts | SQ, SH | Tax included in the shown price or added at checkout, tax per item and the VAT number on the receipt or a VAT invoice, tax on shipping | no | Partial: prices are total prices, with no VAT shown | v1.1 the shop (MVA display, a seller switch that is off by default) |
| Shipping rules (flat, weight) | SQ, WX, SH | Rate tables: flat, by weight or by order amount, per zone or per product profile | yes | Missing | v1.1 the shop (flat, weight bands, free over an amount, pickup) |
| Real-time carrier rates | SQ (Core+), SO (Premium), SH | Live quotes | yes | Missing | Not taken: gateway-free core |
| Delivery times and dates | SH | Transit time on a shipping option, delivery date estimates at checkout and in the confirmation, delivery badges | no | Missing | v1.1 the shop (a delivery time per shipping option; angrerettloven § 8 g) |
| Shipping labels | SQ (Core+), WF (via software), SH | Print labels, with insurance, claims and carrier pickups | yes | Missing | Not taken: gateway-free core |
| Discounted shipping rates | WX | Negotiated rates | yes | Missing | Not taken: gateway-free core |
| Shipment tracking | WN, SQ, SH | Tracking numbers and an order status page | yes | Missing | Not taken: gateway-free core |
| Packing slips and order printouts | SQ, SH | Packing slips, pick lists and invoices printed from the order, with editable templates | yes | Missing | v1.1 the shop (a printable order confirmation with the withdrawal form for the parcel) |
| Local delivery, pickup, curbside | WX, SO, SH, SQ | Fulfilment options | yes | Partial: the comment field in the checkout form can ask for it | v1.1 the shop (pickup as a shipping option) |
| Ship from store, buy online and pick up in store | SH | Omnichannel | yes | Partial: the comment field in the checkout form can ask for pickup | v1.1 the shop (pickup as a shipping option) |
| Pickup points and parcel lockers | SH | The buyer picks a carrier pickup point or parcel locker at checkout | yes | Missing | v1.1 the shop (a flat «to a pickup point» option; picking the point needs the carrier's API and is not taken) |
| Freight pricing | WN | Freight cost rules | yes | Missing | Not taken: gateway-free core |
| Carrier integrations | WP, SQ (FedEx, UPS, USPS) | Carrier APIs | yes | Missing | Not taken: gateway-free core |
| Carbon-neutral shipping | SH | Shipping emissions offset, paid by the merchant or opted into by the buyer | yes | Missing | Not taken: a third-party service |
| Order management | WX, SH, WN, SQ | Order list and status, notes, cancellation and fulfilment | yes | Missing | Not taken: gateway-free core |
| Manual and draft orders | WN, SH | Orders created in the admin | yes | Missing | Not taken: gateway-free core |
| Edit existing orders | WN, SH | Change orders | yes | Missing | Not taken: gateway-free core |
| Returns and exchanges | SH | Returns and exchanges, return rules and return labels | yes | Missing | Not taken: gateway-free core |
| Shop terms, returns and withdrawal page | SH | Refund, shipping and terms pages generated from the store settings and linked at checkout | no | Missing | v1.1 the shop (terms and the withdrawal form, angrerettloven § 8) |
| Online withdrawal and cancellation requests | SH | The buyer asks to cancel or return from an order page, within the return rules; the owner approves | yes | Missing | v1.1 the shop (a withdrawal form to the owner; the «angre avtalen» function of angrerettloven § 20 a when in force) |
| Customisable transactional emails | WN, WF (unbranded on Plus), SH | Order emails | yes | Missing | Not taken: gateway-free core |
| Order webhooks | SH | Order events pushed as JSON to a URL the owner chooses | yes | Partial: the checkout's endpoint mode posts each order as JSON to a URL the owner sets | - |
| Store staff accounts | WF (3 / 10 / 15), SH (5 / 15 / unlimited) | Staff seats | yes | Missing | Not taken: gateway-free core |
| Sales and custom reports | WX (Elite), SH (200+), SO (Premium), TI (ABC/XYZ) | Commerce analytics, product insights, inventory and finance reports | yes | Missing | Not taken: gateway-free core |
| Order and accounting export | SQ, SH | Orders, line items, taxes and payouts exported as CSV or a workbook, to Google Sheets, or in a tax authority's format | yes | Missing | Not taken: no order store; the payment provider's reports serve the accounts |
| Social and marketplace selling | WX, SH (the Shop app, TikTok, Facebook and Instagram), SQ | Facebook, Instagram, TikTok, marketplaces, and the platform's own shopping app | yes | Missing | Watch: a static product feed |
| Shoppable social posts | GD (Commerce) | Tag products in posts | yes | Missing | Watch: a static product feed |
| Google Shopping | SQ (Core+), WX | Product listings | yes | Missing | Watch: a static product feed |
| Sell in AI chats | SH (Agentic Storefronts) | ChatGPT, Copilot, Perplexity, Gemini; agent catalogue, cart and checkout protocols | yes | Missing | Not taken: gateway-free core (agentic commerce) |
| B2B catalogues | SH | Wholesale companies, catalogues and prices, quantity rules, volume prices, payment terms | yes | Missing | Not taken: gateway-free core |
| Dropshipping | WX (25 / 250 / unlimited), SH (apps) | Supplier fulfilment | yes | Missing | Not taken: gateway-free core |
| Print on demand | WX, SQ (Printful), HO | Custom merchandise | yes | Missing | Not taken: gateway-free core |
| Sourcing network | SH (Collective) | Sell other brands' products | yes | Missing | Not taken: gateway-free core |
| Fulfilment and warehousing apps | WX, SH | 3PL | yes | Missing | Not taken: gateway-free core |
| Point of sale | WX (Mobile POS), SQ, SH, SO | In-person sales | yes | Missing | Not taken: gateway-free core |
| Owner mobile app | WX, WA (admin app) | Manage orders and inventory on a phone | yes | Missing | Not taken: gateway-free core |
| Expansion stores | SH (Plus, up to 9) | Extra storefronts | yes | Missing | Not taken: gateway-free core |
| Headless storefronts | SH (Hydrogen, Oxygen) | Custom front end; the store's products and checkout embedded in other sites | yes | Missing | Not taken: gateway-free core |
| Checkout functions and extensibility | SH (Plus) | Custom logic | yes | Missing | Not taken: gateway-free core |
| Commerce APIs | SQ (Core+), SH, WX | Programmatic store | yes | Missing | Not taken: gateway-free core |
| Business finance (balance, capital, bill pay) | SH, WX (Capital API), SQ | Banking-like services | yes | Missing | Not taken: gateway-free core |
| Auto-release unpaid reservations | TI | Free up held stock | yes | Missing | Not taken: gateway-free core |
| Sell or rent video content | WX | Video on demand | yes | Missing | Not taken: gateway-free core |
| Donations | SQ, WP, WX, GH (tips), SW (Innsamling) | Donate buttons and campaigns | yes | Partial: a Vipps number as an instruction | ER-F: amounts and a Vipps number |
| Recurring donations and donor self-service | WX, SQ | The donor manages their own plan | yes | Missing | Not taken: link out to Spond, Rubic or StyreWeb |
| Crowdfunding | WX (app category) | Campaigns | yes | Missing | Not taken: link out to Spond, Rubic or StyreWeb |
| Membership and training fees | RU | Club fee collection | yes | Missing | Not taken: link out to Spond, Rubic or StyreWeb |

#### 7. Bookings, events, restaurants, hotels and courses

Urd's calendar block covers the event listing. Booking, ticketing and registration need a server, so they link out: Calendly or Acuity for appointments, Checkin, Hoopla or Spond for events.

| Function | Builders | What it covers | Server | Urd | Where |
|---|---|---|---|---|---|
| Appointment booking | WX, SQ (Acuity), HO, GD (Commerce), JI, WN, DR | Self-scheduling, recurring bookings, waitlists | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Classes and courses booking | WX, SQ | Group sessions and class series | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Group class size limits | SQ | Capacity | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Staff scheduling and availability | WX, SQ (1 / 6 / 36 calendars) | Staff calendars | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Resources | WX, SQ | Rooms and equipment | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Multi-location | WX, SQ | Locations | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Google and iCal sync | WX, SQ, DR | Two-way calendar sync | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Video conferencing links | WX (Zoom), SQ (Meet, Zoom, GoToMeeting) | Online sessions | yes | Partial: «Join» links on calendar events | Not taken for bookings: link out (Calendly / Acuity) |
| Email and SMS reminders | WX, SQ | Booking notifications | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Intake forms | SQ, DR, WX | Pre-booking questions | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Deposits | SQ, GD | Partial prepayment | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Packages, memberships, free trials | WX, SQ | Prepaid sessions | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Add-ons and upsells | WX, SQ | Extras per booking | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Cancellation and no-show policies | WX, SQ | Fees and rules | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Attendance tracking | WX, RU | Check attendance | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Charge saved or manual cards | WX, SQ | Card on file | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Bookings cart | WX | Several services in one checkout | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Time-zone detection and conversion | SQ, WX | Client time zones | no | Has: calendar block | - |
| HIPAA compliance | WX, SQ (BAA) | Health data | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Paid bookings | DR, SQ | Charge at booking | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Rentals | WX (API) | Rentable items | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Book buttons on Google and social profiles | SQ | Reserve with Google, Book Now on Facebook and Instagram | yes | Missing | Not taken: link out (Calendly / Acuity) |
| Event pages kept in the site | SQ | Event entries with a page each, list or month view | no | Partial: the calendar block lists events from an iCal feed, each with a pop-up; no event entries or pages | v0.8 events as a collection kind |
| Events: RSVP and ticketed | WX, SQ (Tock) | Event sign-up | yes | Partial: a sign-up link per event | ER-F: registration mode (link-out), ticket status |
| Ticket types and tiers | WX | Pricing tiers | yes | Partial: a sign-up link per event | ER-F: registration mode (link-out), ticket status |
| Seating maps and table charts | WX | Assigned seating | yes | Missing | Not taken: link out (Checkin, Hoopla, Spond) |
| Event registration forms | WX, WA, SQ | Custom questions | yes | Partial: a sign-up link per event, which can lead to a form block (mailto or endpoint) | ER-F: registration mode (link-out), ticket status |
| Guest list and invitations | WX | Attendee management | yes | Missing | Not taken: link out (Checkin, Hoopla, Spond) |
| Event check-in | WX (Assist Check-Ins role), RU (access control) | Door scanning | yes | Missing | Not taken: link out (Checkin, Hoopla, Spond) |
| Online events | WX | Virtual events | yes | Missing | Not taken: link out (Checkin, Hoopla, Spond) |
| Event reminders and confirmations | WA, WX | Automated email | yes | Missing | Not taken: link out (Checkin, Hoopla, Spond) |
| Event payments | WA, GD, SQ | Paid registration | yes | Partial: a registration can be sold as a product in the shop (Vipps or an order by email), with no count of places | v1.1 the shop, to be weighed (C139); link out to Checkin, Hoopla or Spond meanwhile |
| Event analytics | WX | Sales and attendance | yes | Missing | Not taken: link out (Checkin, Hoopla, Spond) |
| Ticketing | RU | Tickets | yes | Missing | Not taken: link out (Checkin, Hoopla, Spond) |
| Accreditation | RU | Credentials | yes | Missing | Not taken: link out (Checkin, Hoopla, Spond) |
| Volunteer coordination | RU | Shifts and volunteers | yes | Missing | Not taken: link out (Checkin, Hoopla, Spond) |
| Activity registration («påmelding») | RU, SP, SW | Club activity sign-up | yes | Partial: a sign-up link per event | ER-F: registration mode (link-out to Checkin, Hoopla, Spond) |
| Restaurant online ordering | WX (commission-free), SO | Orders for pickup or delivery | yes | Missing | Not taken |
| Digital menus | WX, SQ (Menu block) | Menu display | no | Partial: table | ER-C: price list |
| Table reservations | WX, SQ (OpenTable block) | Book a table | yes | Missing | Not taken |
| Future orders | WX | Order ahead | yes | Missing | Not taken |
| Catering | WX | Catering orders | yes | Missing | Not taken |
| Restaurant POS integration | WX | Sync orders | yes | Missing | Not taken |
| ChowNow | SQ (Core+) | Ordering partner | yes | Missing | Not taken |
| QR self-serve ordering | SO (Plus) | Table QR ordering | yes | Missing | Not taken |
| Hotel room types and availability calendar | WX | Room inventory | yes | Missing | Not taken |
| Advanced room pricing | WX | Rate rules | yes | Missing | Not taken |
| External booking channels | WX | Channel sync | yes | Missing | Not taken |
| Front desk and property management | WX | Hotel operations | yes | Missing | Not taken |
| Online programmes and courses | WX, SQ, TI | Step-by-step content | yes | Missing | Not taken |
| Content drip | WX | Timed release | yes | Missing | Not taken |
| Quizzes in courses | WX | Assessments | yes | Missing | Not taken |
| Homework review and tutors | TI | Assignments | yes | Missing | Not taken |
| Course export (IMS CC) | TI | LMS export | no | Missing | Not taken |
| Student and programme analytics | WX, TI | Progress | yes | Missing | Not taken |
| Participant groups and rewards | WX | Cohorts and badges | yes | Missing | Not taken |

#### 8. Members and community

Member data never goes in git (GDPR), so the member functions are not taken; the site links out to the club platforms (Spond, StyreWeb, Rubic) instead.

| Function | Builders | What it covers | Server | Urd | Where |
|---|---|---|---|---|---|
| Member accounts (sign-up and login) | WX, SQ, GH, DU, ST, TI, WA, SO, SP, RU | Visitor accounts | yes | Missing | Not taken: server; link out |
| Google and Okta login | DU, SH, SQ (Premium, Enterprise) | Social or SSO login | yes | Missing | Docs: Cloudflare Access recipe (v0.9 documentation round) |
| Member register or database | WA, SW, RU, SP, SQ | Member records | yes | Missing | Not taken: server; link out |
| Member profiles (self-update) | WA | Profile editing | yes | Missing | Not taken: server; link out |
| Member-to-member connections | WA | Directory and networking | yes | Missing | Not taken: server; link out |
| Pricing plans and tiers | WX, SQ, GH (3 / 10 / unlimited), ST (VIP) | Paid access levels | yes | Missing | Not taken: server; link out |
| Paywalls and gated content | WX, SQ, GH, WP, DU, ST, TI | Restrict content | yes | Missing | Not taken: server; link out |
| Special offers | GH (15 / 50 / unlimited) | Discounted tiers | yes | Missing | Not taken: server; link out |
| Member tagging | GH, SQ | Labels | yes | Missing | Not taken: server; link out |
| Member import and export | GH, TI (CSV), SQ (export) | Bulk move | yes | Missing | Not taken: server; link out |
| Group page access and auto-expiry | TI | Time-limited access | yes | Missing | Not taken: server; link out |
| Custom sign-up and login pages | TI | Branded authentication pages | yes | Missing | Not taken: server; link out |
| Membership renewal | SP | Re-registration flow | yes | Missing | Not taken: server; link out |
| Join by paying | SP | Payment creates a membership | yes | Missing | Not taken: server; link out |
| Forum | WX | Discussion board | yes | Missing | Not taken: server; link out |
| Groups | WX | Communities with feed, privacy, questions | yes | Missing | Not taken: server; link out |
| Live chat | WX, ST | Visitor chat | yes | Missing | Not taken: server; link out |
| Comments | GH, WP, WX | Discussion | yes | Missing | Not taken: server; link out |
| Loyalty programme | WX (Core+), SO | Points and rewards | yes | Missing | Not taken: server; link out |
| Referral programme | WX, GH | Referral rewards | yes | Missing | Not taken: server; link out |
| Benefit programmes | WX (API) | Credit pools and balances | yes | Missing | Not taken: server; link out |
| Roles in the organisation («verv») | RU | Club positions | yes | Planned | v0.8 AR-4: people kind with a role |
| Team rooms and communication | RU | Team spaces | yes | Missing | Not taken |
| Intranet | SW (Gnist) | Members-only portal | yes | Missing | Not taken |
| Member mobile app | WA, RU (Connect), WX (Spaces) | App for members | yes | Missing | Not taken: server; link out |
| Customer portal | ZO (Advanced) | Portal users | yes | Missing | Not taken: server; link out |
| Personalised member emails | TI | Triggered on member actions | yes | Missing | Not taken: server; link out |
| Copy protection | TI | Disable copying | no | Missing | Not taken: harms accessibility |
| App user authentication | DU (Vibe) | Authentication for generated apps | yes | Missing | Not taken: server; link out |
| Member file sharing | WX (File Share) | Shared files | yes | Missing | Not taken: server; link out |
| Members manage recurring plans | WX | Self-service subscriptions | yes | Missing | Not taken: server; link out |

#### 9. Marketing

Campaign tools need a server or a third party and are not taken. What Urd offers is the capture side: forms, the footer newsletter and, in 0.7.24, a newsletter sign-up preset.

| Function | Builders | What it covers | Server | Urd | Where |
|---|---|---|---|---|---|
| Email campaigns | WX, SQ, SH (Messaging), HO (Reach), GD, WP, TI, SO, ST, SW, WA, RU | Newsletters and blasts | yes | Missing | Not taken: server or third party |
| Email send quotas | SQ (500-500,000), GD (100 / 25k / 100k), WX (plans) | Plan limits | - | n/a: Urd sends no email | - |
| Marketing automations | WX, SQ, SH, WP (Commerce) | Triggered journeys | yes | Missing | Not taken: server or third party |
| Pre-built automations | SQ | Welcome, discount, cart recovery | yes | Missing | Not taken: server or third party |
| Segmentation | SQ, SH, GH, RU | Audience groups | yes | Missing | Not taken: server or third party |
| CRM and contacts | WX, SQ, TI, DR, WA, SH | Contact database | yes | Missing | Not taken: server or third party |
| Sales pipeline (kanban) | TI | Funnel stages | yes | Missing | Not taken: server or third party |
| Lead capture | SQ, SH | Newsletter blocks and forms, with double opt-in on SQ | yes | Partial: forms, footer newsletter | 0.7.24: newsletter sign-up preset |
| Promotional pop-ups | SQ (Core+), WX | Pop-up offers | no (yes for capture) | Missing | ER-A: a popup opened by a click; no timed or exit-intent pop-ups |
| Social posting and scheduling | WX, WP, GD | Post to networks | yes | Missing | Not taken: server or third party |
| Ads (Google, Meta) | WX, SQ (Core+), GD (Premium+), HO, WP (credits), SH (Audiences, Shop Campaigns) | Campaign management | yes | Missing | Not taken: server or third party |
| Monetisation ads | WP (WordAds), WN (AdSense), GH (ad networks) | Display ads | no | Missing | Not taken: server or third party |
| Affiliate links | WX, SH (Collabs) | Affiliate tracking | no | Missing | Not taken: server or third party |
| SMS campaigns | SH, SO (500 / 2,500 texts), RU, SW, SQ (US only) | Text marketing, and WhatsApp on SH | yes | Missing | Not taken: server or third party |
| Push notifications | RU | App push | yes | Missing | Not taken: server or third party |
| Chat widget | WX, ST, SH, FR (Intercom), TI (JivoChat) | On-site chat | yes | Missing | Not taken: server or third party |
| Unified inbox | WX | Chat, forms, Facebook and Instagram in one place | yes | Missing | Not taken: server or third party |
| Saved replies and spam folder | WX | Inbox tools | yes | Missing | Not taken: server or third party |
| AI email copy | WX, SQ | An LLM writes emails | yes | Missing | Not taken: server or third party |
| AI social captions | WX, DR | An LLM writes posts | yes | Missing | Not taken: server or third party |
| Logo maker | WX, HO, ST, SQ | Brand assets | yes | Missing | Not taken: server or third party |
| Social graphics from the site's own media | SQ (Marketing Kit, iOS, which replaced Video Studio) | Social-media images and videos made from the site's pictures and products | yes | Missing | Not taken: server or third party |
| Link-in-bio page | SQ (Bio Sites, from the Unfold app; Pro retired February 2025) | A one-page profile of links for a social-media bio, on an address of its own | no | Has: the link launcher and the links block | - |
| Instagram or social feed | WX, ST, SQ | Embedded feed | yes | Missing | Not taken: server or third party |
| Marketing agent | WX (Kleo), WX Bookings, SH (Campaign Autopilot) | AI marketer | yes | Missing | Not taken: server or third party |
| Paid newsletters | SQ, GH | Subscription newsletters | yes | Missing | Not taken: server or third party |
| Benchmarks | WX, SH (retired 2026) | Compare with peers | yes | Missing | Not taken: server or third party |
| Automated client reports | WX (Studio) | Scheduled reports | yes | Missing | Not taken: server or third party |
| Review reply (AI) | DR | Respond to Google reviews | yes | Missing | Not taken: server or third party |
| Business recap (AI) | DR | Summaries | yes | Missing | Not taken: server or third party |
| Social proof widgets | WX (app category) | Notifications | yes | Missing | Not taken: server or third party |
| Geo- or URL-targeted landing pages | TI | Personalised pages | edge or no | Missing | Not taken: server or third party |

#### 10. Analytics and optimisation

Urd's analytics is optional Cloudflare Web Analytics: cookieless, switched on with `site.analytics.token`. Third-party tags are not taken in the core; a plugin can add them with a CSP opt-in and consent.

| Function | Builders | What it covers | Server | Urd | Where |
|---|---|---|---|---|---|
| Built-in traffic analytics | WX, SQ, FR, WP, WN, TI, JI, ST, CA, DR, GH, SO, CV, SH | Visits, sources, pages | yes | Has (optional, Cloudflare) | 0.7.24: disclosed in the privacy page |
| Analytics history retention | FR (30 / 90 days / unlimited) | Data window | yes | n/a: Cloudflare's dashboard sets it | - |
| Real-time activity view | SH (Live View) | Visitors, carts and orders right now, on a map | yes | Missing | Not taken |
| Traffic alerts | SQ (Core+) | Spikes and dips marked against the previous 28 days, with push notices | yes | Missing | Not taken |
| Per-visit activity log | SQ | Every visit of the last seven days with referrer, location, browser and IP address | yes | Missing | Not taken: Urd's analytics stays cookieless and aggregated |
| RSS subscriber estimates | SQ | Estimated subscribers per feed | yes | Missing | Not taken |
| Ecommerce analytics | SQ (Core+), WX, SH, TI, SO | Sales reports | yes | Missing | Not taken |
| Custom reports | WX (Elite), SH | Report builder | yes | Missing | Not taken |
| Clickmaps | WF (Analyze) | Click overlay, no recordings | yes | Missing | Not taken |
| Scrollmaps and fold lines | WF (Analyze) | Scroll depth | yes | Missing | Not taken |
| Goals | WF (Analyze) | Conversion goals | yes | Missing | Not taken |
| Funnels | FR (Convert), SQ (Core+) | Step conversion | yes | Missing | Not taken |
| A/B tests | FR (up to 5 variants), WF (Optimize) | Variant testing | yes (edge assignment) | Missing | Not taken |
| Personalisation | WF (Optimize), DU (rules), TI | Content per segment | edge or yes | Missing | Not taken |
| Dynamic triggers | FR | Overlays and variants by condition | no | Missing (a Suggestions item) | 0.7.13.18: a date window on the announcement bar; ER-H: date windows on blocks |
| Core Web Vitals monitoring | FR, SH | Real-user performance | yes | Partial: the Cloudflare dashboard shows it | Docs (v0.9 documentation round) |
| UTM builder | TI, SQ, SH | Campaign links | no | Missing | Not taken |
| Engagement (time and scroll) | TI | Engagement rates | yes | Missing | Not taken |
| Event tracking | WX, FR, TI | Custom events | yes | Missing | Not taken |
| Google Analytics, GTM, Meta Pixel | WX, FR, WN, TI, NO, FI, HO, WP, SQ, SH | Third-party tags | no | Missing | Not taken in the core: a plugin with a CSP opt-in and consent |
| Meta Conversions API | TI | Server-side pixel | yes | Missing | Not taken |
| Cookieless analytics | WF (Analyze) | No banner needed | yes | Has (optional, Cloudflare) | 0.7.24: disclosed in the privacy page |
| AI referral tracking | WX (AI Visibility) | AI-driven traffic | yes | Missing | Not taken |
| Form and button conversion insights | SQ (Core+) | Conversion per element | yes | Missing | Not taken |
| Signup attribution and email analytics | GH, SQ | Source of signups | yes | Missing | Not taken |
| Lead analytics | TI | Lead journey | yes | Missing | Not taken |
| Search keyword analytics | SQ, SH | Internal search terms | yes | Missing | Not taken |
| Bookings, events and restaurant analytics | WX | Vertical dashboards | yes | Missing | Not taken |
| Heatmaps via integration | FR (Hotjar) | Third-party tool | no | Missing | Not taken in the core: a plugin with a CSP opt-in and consent |
| White-label analytics | DU | Client-branded stats | yes | Missing | Not taken |
| Uptime monitor | WP (Business+) | Downtime alerts | yes | Missing | Not taken |

#### 11. Internationalisation

Urd has one content language per site, with visitor and admin texts in five languages plus language packs (the Swedish pack is a plugin). Multilingual content is an After v1.0 item; until then the MCP agent can translate.

| Function | Builders | What it covers | Server | Urd | Where |
|---|---|---|---|---|---|
| Multilingual sites | WX, FR, WF, DU, WN, SU (Pro), GH, SH, TI, SQ (Weglot) | Locale versions | no | Missing | After v1.0: multilingual content |
| Machine or AI translation | WX (130+ languages, word credits), FR (Auto Translate), WF, SQ (Weglot), SH | Auto-translate content | yes (at edit time) | Missing | After v1.0: multilingual content |
| Translation manager | WX, SH (Translate & Adapt) | Review translations | yes | Missing | After v1.0: multilingual content |
| Translation tone («AI Style») | FR | Voice for translations | yes | Missing | After v1.0: multilingual content |
| Localised slugs | FR, WF, SH | Translated paths | no | Missing | After v1.0: multilingual content |
| Automatic locale redirect | FR, WF (Advanced), TI, SH | Browser language or geo | edge | Missing | After v1.0: multilingual content |
| Right-to-left support | FR, SH (Horizon) | Arabic and Hebrew layouts | no | Missing | After v1.0, together with multilingual content |
| Language attribute | FR | `lang` per page | no | Has | - |
| Site language and region | SQ (13 languages, Norwegian among them) | One language for the built-in visitor texts and the date, time and currency formats; country, time zone and units | no | Has: the site language sets the visitor texts, `<html lang>` and the Intl formats; a time zone per site | - |
| Exclude items per locale | FR | Hide content in some locales | no | Missing | After v1.0: multilingual content |
| Asset localisation | WF (Advanced), SH | Swap images and alt text per locale | no | Missing | After v1.0: multilingual content |
| Multi-currency | WX, WN, SH | Local prices | yes | n/a | - |
| Local domains | SH | Domain per market | edge | n/a | - |
| Duties and taxes | SH | Cross-border | yes | n/a | - |
| Translate store and chat | WX | App strings | no | Has: visitor texts in five languages plus language packs | - |
| Edit the built-in visitor texts | SH | Reword fixed strings such as cart labels, the sold-out text and form messages | no | Partial: the form's labels and success text, the countdown's done text and the calendar's words are edited in place; the other visitor texts come from the built-in dictionaries | - |
| Language-aware personalisation | DU, SH (per market) | Rules per language | no | n/a | - |

Note: the enumeration lists **hreflang** a second time in this area; it appears once, under [SEO and AI search](#2-seo-and-ai-search).

#### 12. Privacy, legal and security

The consent and privacy-page items belong to 0.7.24 Privacy defaults, where a cookie banner is built only when analytics or embeds need one. Most host-level security is Cloudflare's and is described in the docs.

| Function | Builders | What it covers | Server | Urd | Where |
|---|---|---|---|---|---|
| Cookie banner | WX (Usercentrics), SQ, FR, WN, SH | Consent UI | no | Missing | 0.7.24, only when analytics or embeds need it |
| Script blocking until consent | WX, FR (via GTM), SQ, SH | Prior consent | no | Missing | 0.7.24, only when analytics or embeds need it |
| Google Consent Mode v2 | WX, FR, SQ | Consent signals to Google tags | no | Missing | 0.7.24, only when analytics or embeds need it |
| Personal data export and erase | WP (core), SH | GDPR requests | yes | n/a: no personal data is stored | - |
| Opt-out of data sale or sharing | SH | A page where visitors opt out of data sale, sharing and targeted ads; honours Global Privacy Control | edge | n/a: Urd sells and shares no visitor data | - |
| GDPR or privacy module | SW («Personvern»), WX (guide), SQ (guide) | Compliance tools | yes | Missing | 0.7.24: a privacy page generated from site settings, and a terms page template |
| Legal text generators and templates | JI, WN, SQ (Legal Assistant, beta), SH (automated privacy policy) | Privacy and terms | no | Missing | 0.7.24: a privacy page generated from site settings, and a terms page template |
| Accessibility wizard and tools | WX, DU (AudioEye, UserWay), FR (a11y attributes) | Audits and fixes | no | Missing (editor) | 0.7.11 |
| Accessible output by default | SQ | Focus outline, a skip link on Tab, semantic headings, a pause on animated backgrounds, and guidance for an accessibility statement | no | Partial: reduced motion, disclosure navigation, native dialogs and pause buttons on moving bands; no skip link | 0.7.11: a skip link (C78); 0.7.24.2: an accessibility page, to be weighed |
| SSL | all | HTTPS | edge | Has | - |
| HSTS with preload, TLS 1.2 | FR, SQ | Transport security | edge | Missing: HSTS | 0.7.0: HSTS in `_headers` (max-age only) |
| Custom SSL certificate | GH (Business add-on), WF (Enterprise) | Own certificate | edge | Has: Cloudflare | Docs |
| DDoS protection | FR, WP, TI | Attack mitigation | edge | Has: Cloudflare | Docs |
| Web application firewall | WP (Business+) | WAF | edge | Has: Cloudflare | Docs |
| Firewall rules (country and path) | FR (Advanced Hosting, Enterprise) | Block or redirect | edge | Has: Cloudflare | Docs |
| Bot protection | SH (Plus) | Checkout bots | edge | Has: Cloudflare | Docs |
| Malware detection and upload scanning | WP, WN | Malware checks | yes | n/a | - |
| Content Security Policy and custom headers | FR, SQ (clickjacking toggle) | Security headers, clickjacking protection | edge | Has: a strict CSP that blocks everything not declared | - |
| DNSSEC | FR, SQ | DNS integrity | edge | Has: Cloudflare | Docs |
| Owner 2FA | WX (app, SMS, authenticator, email), SQ (passkeys, authenticator, SMS), GH (2FA, device verification), SH (required for all on Plus) | Account security | yes | Partial: through GitHub | v0.9 board handover: 2FA required in the organisation |
| SSO | FR, GH, DU, SU, WF (Enterprise or Custom), SQ (Enterprise), SH (Plus) | SAML or OIDC | yes | n/a | - |
| Roles and permissions | WX, WF, FR, SQ, WP, DU, SH, TI, WN | Role-based access | yes | Partial: GitHub repo permissions | v0.9 content-only editing mode, to be weighed |
| Custom roles and user groups | WX, SH (user groups on Plus) | Granular roles | yes | Partial: GitHub repo permissions | v0.9 content-only editing mode, to be weighed |
| Audit log and site activity log | WF (Enterprise), WP (Business+), SQ (account activity), SH | Who changed what | yes | Has: git history | - |
| Backups and restore | WX, WP (real-time), GH, WN, FR (revert), SQ (30-day trash) | Recovery | yes | Has: git | - |
| Disaster recovery and failover | WX (Studio), WP | High availability | yes | Has: git plus Pages | - |
| Data export (site or code) | CA, TI, WF, DU, GD, SQ (WordPress XML) | Take the data out | no | Has: the repo is the data | - |
| Uptime commitments and SLA | WX (99.98%), FR (99.99%), SH (99.9%), GH (99.9% SLA on Custom) | Availability | - | n/a | - |
| Compliance certifications | FR (ISO 27001, SOC 2 Type 2) | Audits | - | n/a | - |
| Sanctions-based country restrictions | FR | Legal geo-blocking | edge | n/a | - |
| WHOIS privacy | CV, WN, SQ, SH | Registrar privacy | no | n/a | - |
| Transaction fraud screening | SH | Payment risk | yes | Missing | Not taken: gateway-free core (ADR-0020) |
| Isolated infrastructure | WP | Per-site isolation | - | n/a | - |

#### 13. Hosting and domains

| Function | Builders | What it covers | Server | Urd | Where |
|---|---|---|---|---|---|
| Custom domain connection | all paid | DNS to the site | edge | Has | - |
| Built-in subdomain | SQ, SH | A free address on the platform's own domain (squarespace.com, myshopify.com) | edge | Has: the `pages.dev` address Cloudflare Pages gives every project | - |
| Free domain for one year | WX, SQ, WP, GH, DU, HO, ST, WN, DR | Bundled domain | - | n/a: the domain is bought separately | Docs: Norid on the org.nr. (v0.9 board handover) |
| Domain registration and purchase | WX, SQ (no .no), CV, DR, JI, WN, SH (no .no) | Registrar | yes | n/a | Docs: Norid on the org.nr. (v0.9 board handover) |
| Domain transfer | WX, SQ, SH | Move a domain in | yes | n/a | Docs: Norid on the org.nr. (v0.9 board handover) |
| DNS management and automatic configuration | WN, DU, SQ | DNS records and domain forwarding | edge | n/a | Docs: Norid on the org.nr. (v0.9 board handover) |
| Email hosting | SQ (Google Workspace, Core+; Titan), WX, WP, HO, GD, WN, JI, SH (Google Workspace) | Mailboxes | yes | n/a | Docs: Norid on the org.nr. (v0.9 board handover) |
| Email forwarding on the domain | SQ (100 aliases), SH | Addresses on the site's domain forwarded to existing inboxes | yes | n/a: set at the domain's DNS host; Cloudflare Email Routing is free | Docs: role addresses through Cloudflare Email Routing (v0.9 board handover) |
| Global CDN | FR (20 / 300+ locations), WX, WP, GH, SH (300 points of presence), TI | Edge caching | edge | Has | - |
| Bandwidth and storage quotas | FR, WF, ST, ZO, WX, WP, SQ (unlimited) | Plan limits | - | Has: media limits; Cloudflare free tier | Docs |
| Staging environment | FR (Pro), WP (Business+), WF, DU (safe testing) | Pre-production | yes | Partial: the admin preview | After v1.0: PR per draft with preview URLs |
| Branching | FR, WF (Enterprise or Team), WX (API) | Parallel edits | yes | Partial: the admin preview | After v1.0: PR per draft with preview URLs |
| Version history and revert | FR, WX, WP | Roll back | yes | Has: publish history and «undo the last publish» | - |
| Manual publishing control | SU (Pro), ZO | Publish when ready | no | Has: the publish button | - |
| Site duplication | WX, SQ | Copy a whole site | yes | Has: «Use this template» | - |
| Site or project transfer | CA, FR, WX | Hand over ownership | yes | Partial: GitHub repo transfer | v0.9 board handover |
| Multi-site management | WX (Studio), DU, WP (centralised), SH (expansion stores) | Fleet management | yes | n/a | - |
| Code export | WF (workspace Core+), TI (Business), DU (Agency), GD (React/TS), CA (download) | Leave the platform | no | Has: everything is code | - |
| Static HTML export | TI | Archive download | no | Partial: the site is static files, but the text renders only when JS runs | v0.8 baking |
| Video hosting quotas | SQ (30 min / 5 h / unlimited), WP (VideoPress 250 GB) | Video storage | yes | Has: media limits; Cloudflare free tier | Docs |
| Code injection and custom code | SQ (Core+), FR, CA, TI, ZO, SU, WN | Header and footer scripts | no | Missing | Not taken for head and footer scripts; a code bundle goes in the portal, v0.8 Animation files |
| SFTP, SSH, WP-CLI, Git deploys | WP (Business+), SQ (7.0 developer mode) | Developer access | yes | Has: Git deploys | - |
| Automatic platform updates | WP, GH, SQ (7.0 to 7.1 update tool) | Managed updates | yes | Partial: the updater, started by the site owner in admin; `_headers` changes by hand ([ADR-0014](../adr/0014-updater-model.md)) | - |
| App backend or full-stack hosting | WX (Velo, HTTP functions, secrets), DU (Vibe), GD (Airo), WF (secondary) | Server code | yes | Has: Pages Functions | - |
| Headless and APIs | SH, WX | Decoupled front end | yes | n/a | - |
| Branding removal | all paid | White-label | no | Has: no branding | - |

#### 14. Collaboration and operations

| Function | Builders | What it covers | Server | Urd | Where |
|---|---|---|---|---|---|
| Team role sets | WX (27 named roles), WF (Owner, Admin, Site manager, Designer, Marketer, Content editor, Reviewer, Guest), SQ (Owner, Administrator, Website Editor, Store Manager, Billing, Comment Moderator), WP (Administrator, Editor, Author, Contributor, Subscriber), WN (Administrators, Editors) | Predefined roles | yes | Partial: GitHub roles and branch protection | v0.9 board handover (docs) |
| Seat types | WF (Full, Limited, Free), FR (editor, content editor, viewer) | Billing seats | yes | Partial: GitHub roles plus `ALLOWED_LOGINS` | v0.9 board handover (docs) |
| Contributor limits | SQ (2 / unlimited), GH (1 / 3 / 15), WX, SH (5 / 15 / unlimited) | Plan caps | - | Has: GitHub collaborators, with no cap from Urd | - |
| Guest access for agencies | WF, SH (collaborators) | External designers | yes | Has: GitHub collaborators listed in `ALLOWED_LOGINS` | - |
| Comments on the site or canvas | WX (Studio), DU (up to 100 clients), TI, WF (Reviewer), FR (viewers) | Review comments | yes | Missing | Watch: block notes ([WordPress 6.9](https://www.wpbeginner.com/news/whats-new-in-wordpress-6-9/), secondary) could be stored in the draft |
| Approvals | WF (approve page branches), SH (POS manager approvals) | Sign-off | yes | Missing | After v1.0: PR per draft |
| Publishing permissions | WF (Growth) | Who may publish | yes | Partial: `ALLOWED_LOGINS`, checked by every publishing endpoint ([ADR-0003](../adr/0003-publishing-via-github-oauth-and-pages-functions.md)) | v0.9 board handover (docs) |
| Client billing | DU | The agency bills the client | yes | n/a | - |
| Client accounts and permissions | DU | Client logins | yes | n/a | - |
| White-label platform | DU (custom domain, email, CSS), GH | Agency branding | yes | n/a | - |
| Client kits, content mode, handoff | WX (Studio), SQ (Website Editor role) | Safe client editing | yes | Missing | v0.9 content-only editing mode, to be weighed |
| Client content collection | DU | Gather client assets | yes | n/a | - |
| Workspaces, organisations, folders | FR (Enterprise), WX (Studio), SH | Hierarchy | yes | n/a | - |
| Real-time co-editing | FR, WX (Studio) | Concurrent editing | yes | Missing | After v1.0: concurrency view |
| Shared libraries and assets | WF (Core), DU | Reuse across sites | yes | Partial: templates as plugins | After v1.0: synced global blocks |
| Location-scoped access | WX | Per-business-location permissions | yes | n/a | - |
| Ownership transfer | FR, CA, WX, SH | Change owner | yes | Partial: GitHub repo transfer | v0.9 board handover |
| Enterprise true-up billing | FR | Usage reconciliation | yes | n/a | - |

#### 15. Integrations and app markets

Services that need their own account or script are not taken in the core; a plugin (with its CSP needs in the manifest) or a link out covers them.

| Function | Builders | What it covers | Server | Urd | Where |
|---|---|---|---|---|---|
| App market, extensions or plugin directory | WX, SQ, WF, FR, SH, WP | Third-party apps, extensions or plugins per platform (categories in the note below) | - | Has: the plugin API for blocks and language packs, GitHub topic `urd-plugin` | After v1.0: gallery site |
| Theme or template marketplace | SH (Theme Store, free and paid) | Whole-site designs to try, buy and install | - | Partial: one template and eight page starter packs; templates shared as plugins | v0.8 template model; After v1.0: gallery site |
| Zapier, Make, n8n | SQ (Core+), GH (Publisher+), DU, CA, SH (Flow) | Automation platforms | yes | Partial: the form endpoint | Docs: recipes (v0.9 documentation round) |
| Slack | GH, TI | Notifications | yes | Missing | Not taken in the core: plugins or link-out |
| Mailchimp, SendGrid, UniSender | SQ, FR, TI | Email providers | yes | Missing | Not taken in the core: plugins or link-out |
| HubSpot, Salesforce, Zoho CRM, Monday | FR, TI | CRM | yes | Missing | Not taken in the core: plugins or link-out |
| Intercom, JivoChat, Chatra | FR, TI | Chat | no (vendor-hosted) | Missing | Not taken in the core: plugins or link-out |
| Typeform, Formspark, Clay | FR, TI | Forms and enrichment | yes | Missing | Not taken in the core: plugins or link-out |
| Hotjar, Trustpilot, Loom | FR | Widgets | no | Missing | Not taken in the core: plugins or link-out |
| Stripe, PayPal, Square, Klarna | many | Payments | yes | Missing | Not taken: gateway-free core (ADR-0020) |
| Printful, TaxJar, Shippo | SQ | Commerce services | yes | Missing | Not taken in the core: plugins or link-out |
| Calendar and video (Google, iCal, Zoom, Meet) | WX, SQ | Scheduling | yes | Has: calendar feeds, video meeting links | - |
| Google Workspace | SQ, WX, SH | Email and productivity | yes | Missing | Not taken in the core: plugins or link-out |
| Lightroom plugin | WX | Photo sync | yes | Missing | Not taken in the core: plugins or link-out |
| Disqus and comment services | TI | Comments | no | Missing | Not taken in the core: plugins or link-out |
| Sports federation integration (NIF/FIKS) | RU | Federation data | yes | Missing | Not taken in the core: plugins or link-out |
| WordPress plugin bridge | TI, WA | Embed in WordPress | no | Missing | Not taken in the core: plugins or link-out |
| Public APIs (site and admin) | WX, SQ, SH, GH, WF, DU, TI, WA | Developer access | yes | Missing | v0.8/v0.9 MCP |
| Expert or partner directory | SQ (Marketplace), SH (Partner Directory) | Designers and developers listed for hire by the platform | - | n/a: no hiring directory; what others share is found through the `urd-template` and `urd-plugin` topics | - |

Note: the enumeration lists the six app markets in rows of their own, with only their category names. The categories, as each vendor names them:
- **WX App Market:** Marketing, Sell Online, Services & Events, Media & Content, Design Elements, Communication.
- **SQ Extensions:** Shipping & fulfillment, Finance, Inventory & products, Sales & marketing.
- **WF Apps:** AI, Analytics, Asset Management, Automation, Compliance, Ecommerce, Forms and Surveys, Icons, Localization, Marketing, Scheduling, SEO, User Management, Utilities.
- **FR Plugins:** AI, CMS, Code, Ecommerce, Integrations, Libraries, Localization, Media, SEO, Styles, Utilities.
- **SH App Store:** Sales channels, Finding products, Selling products, Orders and shipping, Store design, Marketing and conversion, Store management.
- **WP plugin directory:** Featured, Beta, Popular, Block-Enabled.

#### 16. AI outside the editor

Urd's AI route is the site owner's own agent through a local MCP server ([ADR-0017](../adr/0017-ai-via-local-mcp-server.md)): read access in v0.8, write access in v0.9 through typed abilities; the server writes files and does no git operations, so the site owner reviews and publishes (ADR-0017 decision 2). Built-in AI services are not taken.

| Function | Builders | What it covers | Server | Urd | Where |
|---|---|---|---|---|---|
| AI site generation | WX (Harmony), FR, DU, HO, GD (Airo), WN, ST, DR, WP, SH, NO, ZO | Prompt to site | yes | Missing | Not taken: ADR-0017 |
| AI credits per plan | SQ, FR, WF, ZO, DU, DR, HO | Metered AI usage | yes | Missing | Not taken: ADR-0017 |
| Business agents in the dashboard | WX (Kleo, Omni, Juno, Aria), SH (Sidekick), DU, FR, WP, HO, SQ (Beacon AI, announced) | Agents act on the site | yes | Missing | Not taken: ADR-0017 |
| Visitor-facing AI chat | WX (AI Site Chat, Smart Chat), DR (AI chat reply), SH (Inbox agent) | On-site assistant | yes | Missing | Not taken: ADR-0017 |
| AI lead replies | DR | Replies to leads | yes | Missing | Not taken: ADR-0017 |
| AI inbox replies | WX | Suggested responses | yes | Missing | Not taken: ADR-0017 |
| AI images (generate and edit) | WX (creator, background remover, upscale, extend), DR | Media tools | yes | Missing | Not taken: ADR-0017 |
| AI deep research and keyword research | DR | Research tasks | yes | Missing | Not taken: ADR-0017 |
| AI text in fields, blocks and pages | TI, NO, SQ (FAQ Composer, announced) | Copy generation | yes | Missing | Not taken: ADR-0017 |
| AI test shoppers | SH (SimGym, beta) | AI shoppers browse the live and a draft theme and report on add-to-cart rates | yes | Missing | Not taken: ADR-0017 |
| MCP server (official) | WX, WF, DU, WN, SH (Checkout MCP, Storefront MCP) | Remote AI agent access to sites | yes | Planned (a local server) | v0.8 MCP read, v0.9 MCP write (ADR-0017) |
| External agents and IDE access | FR (Claude Code, Codex, Cursor) | Agents edit projects | yes | Planned | v0.8 MCP read, v0.9 MCP write (ADR-0017) |
| MCP via a third party only | SQ (viaSocket) | Unofficial connector | yes | Planned | v0.8 MCP read, v0.9 MCP write (ADR-0017) |
| Agentic commerce protocol | SH (UCP, Agentic Storefronts) | Agents shop and check out | yes | Missing | Not taken |

Note: **WebMCP** (in-page tools for agents; a W3C draft; the API surface is still moving between `document.modelContext` and `navigator.modelContext`). The site-functions enumeration found no builder that documents native support; its only find was a Netlify and OpenAI WebMCP challenge. The hosted-builders pass of the same day did find a Wix WebMCP app ([dev.wix.com](https://dev.wix.com/docs/develop-websites/articles/get-started/ai-agents/about-the-wix-web-mcp), primary). Urd: Missing. Where: Watch: W3C draft, Chrome behind a flag.

### Editor and design functions

The enumeration's master table has 340 rows in 14 areas; two of them only point to another row and are notes under their tables. The shortcut keys in «How it works» are the vendors' own (⌘ on a Mac is Ctrl on Windows); the full shortcut sets are in [ELEMENTS.md](ELEMENTS.md).

#### 1. Canvas and selection

| Function | Builders | How it works | Urd | Where |
|---|---|---|---|---|
| Multi-select | WE, WH, RM, WP, WT, SQ, BR, FS | Shift/⌘-click, or select all; Bricks bulk-edits multiple elements | Has | - |
| Box or marquee selection by keyboard | FS | Option/Ctrl+Space box-selection tool | Missing | 0.7.10 |
| Select all | WH, SQ, WP, TI, WT | Ctrl/⌘+A; in WP a repeat press selects the parent | Missing | 0.7.10 |
| Select parent or child | WF, WS, WH, BR, BD, WE, RM, FS, DV | Arrows, Enter/Shift+Enter, Ctrl+click, Shift+Esc, breadcrumbs | n/a: flat blocks in sections | - |
| Select the next or previous sibling | WF, WH, WE, SQ, FR, BR, WT, SH | Tab/Shift+Tab, arrow keys, Cycle Selection | Missing | 0.7.10 (Tab also in 0.7.11) |
| Deselect or abort | WF, WS, WH, WP, BD, BR, WT | Esc (double Esc in WP) | Has | - |
| Lock element | WS, TI, WP, SH | Lock icon in Layers, L key, Lock in List View | Missing | 0.7.9 layers panel |
| Hide element in the editor | WS, FR, BR, DV, WP, SH, TI | Eye icon or `⌘;`; BR also hides on the live site | Partial: hide on mobile | 0.7.9 layers panel; v0.8 AR-5 section hide |
| Group or ungroup | WH, WP, SQ, DV, TI, RM | Ctrl+G; Stacks (SQ); Module Groups (DV); nested groups (TI) | Partial: sticky group, block groups as templates | Watch |
| Wrap in a container or stack | WS, BR, FR | Alt+C, ⌘⇧P, Shift+A (wraps in a Stack) | n/a: flat blocks in sections | - |
| Unwrap or remove the wrapper | WS, FR, BR | Alt+Shift+C, ⌘⌫, context-menu Unwrap | n/a: flat blocks in sections | - |
| Duplicate | WF, WS, WE, WH, SQ, WP, EL, BR, BD, DV, CA, DU, TI, WT, HO, ST, WN, SH | Ctrl/⌘+D (WP ⇧⌘D) or right-click | Partial: Ctrl+D duplicates a block or a set; no section or page duplication | 0.7.10: page and section duplication |
| Copy, cut and paste elements | WF, WS, WE, WH, SQ, WP, EL, BR, BD, DV, CA, DU, TI, WT, HO, RM, SH | Clipboard shortcuts and context menus | Partial: copy and paste of a block or a set within a page; no cut, and no paste on another page | 0.7.10 canvas functions |
| Copy and paste styles only | WP, EL, DV, OX, BR, RM | Paste Style ⌘⇧V; copy/paste design ⌥⌘C/V; BR also per breakpoint; RM pastes animation settings | Has (0.7.20.8): Ctrl+Alt+C and V, the look without the content, the animation included; the same type takes it whole, another the shared fields | - |
| Cross-tool or cross-site paste | FS, WT, BR, TI | Figma↔Sites; paste Webflow/HTML/Tailwind/MD/SVG; HTML/CSS to Bricks; Figma into Zero Block | Missing | 0.7.10 paste pipeline (HTML, markdown); Figma is not taken |
| Align | WE, FS, TI, FR, SQ | Align icon or toolbar; align to the container or to each other | Has | - |
| Distribute evenly | WE | Horizontal or vertical axis | Has | - |
| Match size | WE | Matches the selected elements' width or height | Missing | 0.7.10 canvas functions (C32) |
| Z-order (front, back, forward, backward) | WE, WS, WH, HO, DU, SQ, FR, TI | Ctrl(+Shift)+↑/↓, Shift+↑/↓, Ctrl+[, z-index | Has | - |
| Nudge with the arrows (1 / 10 px) | WS, WE, WH, SQ, TI | Arrows; Shift ×10 | Has: the grid step, and 1 px with Shift | 0.7.10: weigh the convention |
| Keyboard resize | SQ, RM, WH, FS | ⌘+arrows; ⌘⇧ symmetric; Alt+arrows | Missing | 0.7.10 canvas functions (C32) |
| Resize modifiers | WS, FR, FS, SQ | Shift proportional, Alt from the centre, ignore constraints, lock aspect ratio | Partial: Shift keeps the aspect ratio on image, video, shape and icon (0.7.21.6); Ctrl or Cmd frees a drag or resize from the grid and guides (0.7.26.3); no resize from the centre | - |
| Disable auto-docking while dragging | WS | Ctrl+drag or resize | n/a | - |
| Rotate in increments | WE, WH, FS | Shift = 15°; Alt+arrows 1°/15° | Has: 15° steps, and 1° with Shift | - |
| Axis-constrained drag | WS, WE, WH | Shift+drag | Has: Shift holds a move to one axis (0.7.26.3) | - |
| Duplicate-and-drag | WF, WS, WE, WH, TI | Option/Alt+drag | Missing | 0.7.10 canvas functions (C32) |
| Snapping | HO, DU, FR, SQ | Snap to grid; Flex snapping; stacks snap | Has: snap grid, smart guides and equal gaps (0.7.26.3) | - |
| Distance indicators | WS, WH | Hold Alt while hovering | Partial: equal gaps are drawn as bands with the gap size while dragging (0.7.26.3); no distances on Alt+hover | 0.7.10 canvas functions (C32) |
| Rulers | WE | Shift+R | Missing | Watch |
| Guides | WE, TI, RM, WF | Draggable guides; ⌘H/⌘⇧H; guide overlay | Has | - |
| Grid overlay | SQ, TI, WE, FS, EL, BR, RM | G key; layout grids; Grid Outline aid | Has | - |
| X-ray, outline or wireframe view | WF, DV | X-ray Shift+⌘X; Wireframe view; X-Ray mode | Missing | Watch |
| Zoom in, out and to 100% | WS, WH, DV, RM, FS, WP | Ctrl/⌘ ± and Ctrl+0 | Has: zoom in the preview | - |
| Zoom to fit or to the selection | FR, WH, BD | ⌘1 / ⌘2; Shift+1; scale-to-fit | Partial: fit and stepped zoom; no zoom to the selection | - |
| Zoom-out page overview | WP, SH (beta) | Ctrl+Shift+0 condensed section view | Missing | 0.7.10: reorder sections from above |
| Pan the canvas by keyboard | FS | Arrows with nothing selected | n/a | - |
| Switch breakpoint or device view | WF, WE, WH, CA, EL, BR, BD, WT, TI, FR, DV, SQ, SH | Number keys, Ctrl+J, Ctrl+B, ⌘⌥R | Has: 4 preview devices | - |
| Side-by-side breakpoints canvas | WF, FS | Breakpoint canvas; breakpoints as frames with cross-breakpoint edits | Missing | 0.7.3, to be weighed: two iframes on the same bridge |
| Preview mode | WF, WS, WE, WH, BR, TI, DU, WT, FS, SQ, WP, CA, SH, FR | Dedicated preview shortcut or toggle | Has: Clean view | - |
| Inline preview on the canvas | FS | Shift+Space beside the design | n/a | - |
| Preview resizing and device sizes | FS, WH, SH, FR, WP | Drag width, snap to breakpoint, slider, preview width | Partial: 4 devices | 0.7.10: the «real phone sizes» item |
| Hide UI, distraction-free, spotlight | WE, TI, WT, WP, WF, WS, EL | Shift+F, `⌘\`, Distraction Free, Spotlight, focus mode | Has: Clean view | - |
| Movable panels, toolbar or workspaces | BR, CA, SQ, DV, WP | Toolbar on any side; move the UI; draggable panels; workspaces | Partial: the floating element menu is dragged by its head, keeps its place for the session and can be put back beside the block (0.7.20.6); panels, rail and toolbar are fixed; no workspaces | - |
| Dark editor UI | DV, WF, FR | Builder light/dark setting | Has: themed admin (ADR-0009) | - |
| Right-click context menu | SQ, SH, WH, HO, BR, OX, DV | Contextual actions | Has (0.7.20.8): the block's and the section's menus at the pointer, from the keyboard too | - |

#### 2. Insertion

| Function | Builders | How it works | Urd | Where |
|---|---|---|---|---|
| Add or insert panel | WF, WH, WE, BD, BR, WT, TI, CA, FS, HO, RM, SQ, WP, SH | Element or block library panel with a shortcut | Has | - |
| Search in the inserter | WP, FS, WF, SQ, SH | Search box; Quick find | Has: block search | - |
| Command palette | WF, FR, WP, BR, DV, DU, WT, EL, SQ | ⌘K / ⌘E; Finder; panel search | Planned | 0.7.10 |
| Insert from the command palette | FR, BR, DV, WP | Quick insert of components; DV chains commands (>, *, ^) | Planned | 0.7.10 |
| Slash command | WP | «/» changes the block type | Has: «/» opens the block menu on the canvas | - |
| Insert before or after by shortcut | WP, BR, DV, WH, WE, OX | Ctrl+Alt+T/Y; R+1-4; Alt+Shift+S; type an HTML tag | Partial | 0.7.10 |
| Section and layout libraries | WF, WS, WH, SQ, DU, HO, WN, ST, CA, TI, FS, WP, EL, BR, BD, OX, FR, RM, SH | Pre-designed sections, patterns, templates, presets | Has: 39 section presets | - |
| Layout switcher | SQ | Suggested rearrangements of a section's blocks; one click applies one, undo reverts it | Has: «Change layout» offers six layouts on a section with at least two movable blocks | - |
| Wireframes | BR | Wireframe library (2.1/2.2) | Missing | Watch: grey presets |
| Design sets or kits | BR, BD, OX, SQ | Install pages, templates and components as sets | Partial: page starter packs | v0.8 template model |
| Saved reusable assets | WS, RM, DV, FS, SQ | Save sections or pages; Preset Manager; libraries | Has: «Save as template» (My templates) | - |
| Paste HTML/CSS as native elements | BR, WT, BD | Converter to elements, classes and variables | Missing | 0.7.10 paste |
| Figma import | WS, TI, FS | Figma plugin; copy-paste | Missing | Not taken as an import; Figma arrives as SVG, CSS and tokens (v0.8 OL own looks) or Lottie (v0.8 Animation files) |
| Markdown input | WT, CA, EL | Paste markdown; markdown formatting; markdown rendering (alpha) | Missing | 0.7.10 paste |
| AI section generation | WH, DU, WN, HO | A prompt creates a section | Missing | Not taken: MCP is the way (ADR-0017) |
| AI element, block or widget generator | WH, DU, SH, WF, FS, FR, TI | Generated custom element (code-backed) | Missing | Not taken: MCP is the way (ADR-0017) |
| Embeds | FS, CA, WF, WN | Embed element or iframe | Partial: video, map | 0.7.24: allowlisted click-to-load frames |
| Icon insertion from a library | RM, BR, WP, WN, FR | Noun Project; Icon Manager; Icon block; vector sets | Has: icon block and icon library | - |
| Keep the add panel open | WE | Ctrl+click in Add Elements | Partial | - |
| Hover-to-preview in the picker | SH | Block picker preview | Partial: thumbnails | - |
| Add page or section shortcut | WH, WE, BR, DV | Alt+Shift+P/S; Alt+N/B; Pages panel | Partial | 0.7.10 |

#### 3. Structure

| Function | Builders | How it works | Urd | Where |
|---|---|---|---|---|
| Navigator, layers or list view | WF, WS, WE, WH, SQ, WP, EL, BR, OX, DV, FS, WT, FR, SH | Tree panel of the page | Planned | 0.7.9 layers panel |
| Rename layers | WS, WP, BR, OX, WT, SH | Double-click or ⌘E; custom names | Planned | 0.7.9 layers panel |
| Drag reorder in the tree | WS, WP, DV, SQ, WE, SH | Drag in the panel | Planned | 0.7.9 layers panel |
| Reorder by keyboard | WF, WP, WT, TI, SQ | `[` and `]`; Ctrl+Shift+Alt+T/Y; Ctrl+arrows | Partial: sections up and down; on the phone, up and down buttons in the block toolbar (0.7.3); no keys | 0.7.3.6: keys for the phone order |
| Move out of or into a parent by keyboard | WF, WT | ⌘⇧↑/↓; Ctrl+←/→ | n/a | - |
| Collapse or expand the tree | WP, WT, WF, SH | Arrows; Alt+L; ⌥-click; collapsed by default | n/a | - |
| Selection breadcrumbs | WP, DV | Block breadcrumbs; jump to the parent | n/a | - |
| Status icons in the tree | OX, WP | Conditions, animations, interactions; lock, hidden, synced | Planned | 0.7.9 layers panel |
| Document outline or heading structure | WP | Outline tab (words, reading time, headings) | Missing | v0.8 AU-1 audit panel |
| Page blocks map | TI | ⌘L | Missing | Watch |
| Section isolation | CA, WP | Section View; Spotlight | Missing | Watch |
| Pages panel management | WF, WH, WE, BR, WT, FS, DV, WN, WP, SQ | Add, organise, copy, duplicate, hide pages | Has; page duplication is missing | 0.7.10 (page duplication) |
| Element Manager (disable elements) | BR | Removes unused elements from the UI | Partial: the shop blocks are gated by «shop is on» | 0.7.10: the gating item, widened into an element manager |
| Orphaned-element scanner | BR | Finds disconnected elements | n/a | - |
| Keyboard region navigation | WP, FS, BR, SH | Ctrl+backtick; Alt+F10; F6; ⌥T | Missing | 0.7.11 |

#### 4. Inspector and styling

Urd places blocks freely on a grid, so the flex, grid and selector controls of the class-based builders do not apply. Site-wide custom CSS and classes are not taken: the content files hold no CSS, and the class-based cascade was not adopted (see [CODE.md](CODE.md)); a look copied from a design tool becomes a scoped style in the theme (v0.8 OL-4).

| Function | Builders | How it works | Urd | Where |
|---|---|---|---|---|
| Content and style tabs | EL, TI, WF, WT, WP, BR, SQ | Separate panels or tabs with shortcuts | Has: Content/Style tabs | - |
| Flexbox layout controls | EL, DV, BR, WS, DU, FR, FS, WT | Direction, align, wrap, gap; stacks or auto layout | n/a: free placement | - |
| CSS Grid editor | BR, DV, EL, WS, DU, WT, OX, FR | Visual tracks, fr, spans, placement, masonry or bento | n/a: free placement | - |
| Spacing with linked sides or presets | WP, WF, WT, OX, BR | Link toggle; Shift/⌘-drag; preset slider; Apply All / Opposite | n/a: free placement | - |
| Sizing with min/max, fit or fill | FR, WS, WP, DV, FS | Fill/Fit/Fixed; min width; clamp; text min/max | Partial: three fit choices below the design width (wrap, shrink in proportion, shrink and wrap), a height that follows the content or is the block's own, and «Size» per block with smallest and largest text bounds (0.7.21); no min or max width | - |
| Position (relative, absolute, fixed, sticky) | FS, FR, DU, WS, RM, OX, EL | Position menu; pinned; sticky | Has: sticky, docked to the screen | - |
| Docking or constraints | WS, FS | Dock margins (px\*); constraints to the parent | n/a: frames are bound to the content width (ADR-0018) | - |
| Typography controls | WP, DV, FR, SQ, BR | Family, size, weight, spacing, case, decoration, orientation | Has: font, size, line height, letter spacing | - |
| Text shadow | WP | 7.1 block support | Missing | 0.7.9 |
| Backgrounds (colour, gradient, image) | WP, DU, TI, WN, ST, DV, FR, SQ | Gradient plus image; overlays; text fill | Has | - |
| Borders and radius | WP, TI, FS, FR | Linked or unlinked sides and corners; squircle | Has | - |
| Shadows | WP, TI, EL | Presets; variables in box-shadow | Has | - |
| Effects, filters, blend modes, masks | FR, FS, DV, WP, EL, SQ | Blur, backdrop filter, duotone, blend modes, masks | Partial: image filters, glass, image shapes | 0.7.9: duotone and blend modes on images |
| Transforms 2D and 3D | FR, SQ, BR, WT | Rotate, scale, skew, opacity, perspective, scale3d | Partial: rotation, and «Size» scales a whole block from 0.4 to 2 (0.7.21.5); no skew, perspective or 3D | - |
| Transitions | WT, FR | CSS transitions; motion matching | n/a: free placement | - |
| Custom cursor | FR, FS | An image or element as the cursor | Missing | Not taken: low value |
| Overflow or clip | FR, FS | Overflow: Clip; clip content | n/a: free placement | - |
| Pointer events or user-select | FR | Disable per layer | n/a: free placement | - |
| Opacity by number keys | TI, RM | 0-9 or 0-10 keys | Missing | Not taken: low value |
| Custom CSS per element or block | WP, BD, CA, WS, BR, WF, DU, WT, SH | Block CSS; Advanced > Custom CSS; custom CSS properties | Missing | v0.8 OL-4: a scoped style per look, pasted whole; the content files still hold no CSS |
| Site-wide custom CSS | WP, WS, BR, SQ, WF, SH | Additional CSS; global.css; theme stylesheet | Missing | Not taken: no CSS in the content |
| Custom attributes | WF, CA, DV, OX, WT | Name/value pairs in settings | Missing | Not taken: no CSS in the content |
| Custom IDs or anchors | CA, WP, DV, SQ | Fixed IDs; HTML anchor | Has: section ids | - |
| Custom classes | CA, WT, WS, OX | Add class names to elements | Missing | Not taken: class-based cascade not adopted |
| Interactive states | WF, EL, WP, WT, OX, BR, FR, FS | Hover, focus, active, pressed, visited; custom states | Partial: nav hover styles, hover lift | 0.7.9: button states in the design gallery |
| Pseudo-elements | WT, WF, BR, OX | ::before, ::after, ::marker and others | n/a: free placement | - |
| Child or sub-selector styling | BR, OX, WS | Selector UI and Detector; nested selectors; semantic part classes | n/a: free placement | - |
| Classes and combo or global classes | WF, EL, BR, OX, WT, WS | Reusable class stacks | Missing | Not taken: class-based cascade not adopted |
| Class manager or unused-style cleanup | WF, EL, BR, OX | Organise, rename, prioritise; remove unused | Missing | Not taken: class-based cascade not adopted |
| Inheritance indicators | BR, OX, TI, WT | Coloured indicators; inherited placeholders; computed values | Has (0.7.20.7): the amber dot and a reset on every setting a block made its own, the inherited value with its source under the control | - |
| Reset style | WT, WP, DV, BR | Alt+click; Clear; reset across breakpoints | Has | - |
| Style presets | DV, BD, OX, WP, CA, SQ | Element and option-group presets; button presets; Element Styles | Partial: box styles | 0.7.9 design gallery |
| Apply an instance's style globally | WP, DV | Apply Globally; convert to variable | Missing | 0.7.9: «use this block's style as the site default» |
| Per-breakpoint overrides | WF, FR, WS, EL, BR, DV, TI, FS, WP, SQ, DU, WT, OX | Edit at a breakpoint and override inherited values | Partial: placement, order and visibility of each block on the phone (ADR-0019), and the menu's own phone overrides; no style override per block | v0.8 PH-2: a phone text size per block, to be weighed |
| Per-device visibility | WP, SQ, CA, WH, ST | Hide per device or browser width | Partial: hide on the phone; no hide on the desktop only | 0.7.3: mobile-only elements |
| Hover preview of tokens or fonts | BR, WP | Hover to preview a colour, class, variable or font | Missing | 0.7.9 |
| Inspector property search | BR, BD | ⌘⇧F; F | Has: property search in the element menu | - |
| Pin control groups | BR | Keep groups at the top | Partial: a pin puts a single setting into the quick row at the top of the element menu, kept per block type, with a reset (0.7.20.3); whole groups are not pinned | - |
| Collapse inspector sections | WF | Option+S | Has: collapsed folds | - |
| Conditional settings | SH | A setting shows only when its condition holds (`visible_if` in the theme's schema) | Has: a setting with no effect for the chosen variant is hidden in the element menu | - |
| Value nudging in inputs | WT | ⇧/⌥ arrows ±10 / ±0.1 | Missing | Not taken: low value |
| Advanced units | DV, WP, WS, OX | rem, vw, clamp, px\* scale unit; default unit preference | Partial: theme space | 0.7.9 fluid type |
| Relative HSL colours | DV | Shades derived from a base colour | Partial: hex and pipette | 0.7.9 OKLCH theme |
| Colour picker formats | WP, BR, FR, SQ | HEX/RGB/HSL; P3 | Partial: hex, RGB and an HSV field with alpha, and the pipette; no HSL entry or P3 | 0.7.9 OKLCH theme |
| Semantic HTML tags | DV, EL, FR, RM, WS | Set nav, main, header, h1/h2 tags | Has in text (h1-h6); the section tag is fixed | - |
| Custom HTML wrappers | DV | HTML Before / After | n/a: free placement | - |
| Text selection colour | FR | Highlight colour | Missing | 0.7.9 |
| Link styles with hover and current | FR, RM, WP, DU | Default link states; current page | Missing | 0.7.9 |

#### 5. Design system

| Function | Builders | How it works | Urd | Where |
|---|---|---|---|---|
| Colour palette or swatches | WP, SQ, HO, WN, WH, TI, DU, ST, JI, EL, BR, DV, FS, WS, SH | Site-wide palette | Has | - |
| Variables or CSS variables | WF, EL, BR, BD, OX, DV, WT, FS | Typed tokens (colour, size, font and others) | Has: theme tokens | - |
| Variable modes (light, dark, brand) | WF, BR, FR, FS, WT, SQ, SH | Modes; dark variants; colour-scheme media condition; section themes | Has: light and dark, and seven section themes; brand or seasonal modes are missing | 0.7.9 «save your own theme» |
| Light/dark toggle element | BR | Toggle-Mode element | Has: the light/dark toggle in the nav | - |
| Colour generators | BR, DV, SQ | Shades, harmonies, scales | Partial: theme suggestions | 0.7.9: palette from an image |
| Typography styles | FR, FS, WP, RM, SQ, TI, EL, BR, WS | Text styles, presets, classes | Partial: two font stacks and S/M/L/XL | 0.7.9: the font items and a type scale |
| Fluid type | WP, BR, WS, DV | Min/max fluid values; generator; clamp | Partial: two font stacks and S/M/L/XL | 0.7.9: fluid type scale |
| Google Fonts or local hosting | FS, BR, DV, WP, SQ, SH | Font library; Font Manager | Missing: system font stacks only | 0.7.9: the font items |
| Font upload | SQ, FR, ST, TI, RM, WP | Upload custom font files | Missing: system font stacks only | 0.7.9: the font items |
| Variable fonts or OpenType | FR, DV, SQ | Axes; ligatures | Missing: system font stacks only | 0.7.9: the font items |
| Spacing scales or presets | WP, BR, DV, WT, SH | Preset sliders; scales | Partial: section spacing token | 0.7.9: spacing scale |
| Shadow presets | WP | Natural / Crisp / Sharp / Soft | Has | - |
| Style guide or style book | WP, BR | Style Book; Style Manager | Missing | 0.7.9: style-book page |
| Default HTML-tag styles | EL, WF, BR, WP, SQ | Default Styles; global tag styles; Theme Styles; per-block styles | Partial: theme | - |
| Theme presets or style variations | WP, SQ, SH, BR, TI | Variations; site styles; Horizon presets | Has: six theme presets | - |
| Import or export of a design system | EL, BR, OX, DV, WP, SH | Classes and variables export; ZIP; framework importer; theme export | Missing | 0.7.9 theme export; v0.8 template model |
| Shared libraries across sites | WF, WS, FS, BR, SQ (Enterprise) | Libraries; design libraries; import from another site | Missing | 0.7.9 theme export; v0.8 template model |
| Sync new tokens to legacy globals | EL | V4 variables → V3 globals | n/a | - |
| Style revisions or history | WP, BD | Style revisions; preset history | Has: history and undo | - |
| Brand or AI design instructions | WF, FR, SH, SQ | Agent Instructions; Skills | Missing | v0.8 MCP: agent instructions returned by a read tool, built from the theme tokens |

#### 6. Components

Urd's templates are independent copies, and plugin blocks are its code components. Synced components, with overrides and detach, are an After v1.0 item: synced global blocks `{ref, overrides}`.

| Function | Builders | How it works | Urd | Where |
|---|---|---|---|---|
| Components or symbols | WF, FR, EL, BR, OX, FS, DU, WP, SQ (Enterprise) | Reusable synced elements (patterns in WP) | Partial: templates as independent copies | After v1.0: synced global blocks |
| Global sections or widgets | RM, WP, DV, WT, SH (section groups) | Global widgets; template parts; Canvases; Slot pages | Has: nav and footer at site level | - |
| Variants | WF, FR, FS, BR | Variant prop; style variants | Partial: templates as independent copies | After v1.0: synced global blocks |
| Props or properties | WF, FR, BR, EL, OX | Exposed fields with groups and defaults | Partial: templates as independent copies | After v1.0: synced global blocks |
| Style props | WF | Limited colour and size choices (Conf 2026, per the noqode.fr recap, secondary) | Partial: templates as independent copies | After v1.0: synced global blocks |
| Slots and slot rules | WF, BR, WT, SH (theme blocks) | Placeholders; allowed components; default slots | Partial: templates as independent copies | After v1.0: synced global blocks |
| Nested components and prop binding | BR | Child props bound to the parent | Partial: templates as independent copies | After v1.0: synced global blocks |
| Instance overrides | EL, FR, OX, WP | Per-instance content | Partial: templates as independent copies | After v1.0: synced global blocks |
| Detach or unlink | FR, EL, WP | Break the link to the main component | Partial: templates as independent copies | After v1.0: synced global blocks |
| Inline component editing | OX, BR | Edit in the page; off-page preview | Partial: templates as independent copies | After v1.0: synced global blocks |
| Component manager or usage | BR | Usage locations; variant reorder | Partial: templates as independent copies | After v1.0: synced global blocks |
| Components in CMS rich text | WF | Per-item prop configuration | Partial: templates as independent copies | After v1.0: synced global blocks |
| Restrict components by role | WF | Hide from the Marketer role | Partial: templates as independent copies | After v1.0: synced global blocks |
| Component sharing or marketplace | FR, WT, FS, WS | Share; marketplace; libraries; Blocks apps | Partial: templates as independent copies | After v1.0: synced global blocks |
| Code components | WF, FR, FS, DU, SH, OX | React, Liquid or custom elements on the canvas | Has: plugin blocks | - |
| Components as CMS-editor blocks | BR | Bricks components in Gutenberg | n/a | - |
| Component-level effects | FR | Reusable effects inside components | n/a | - |
| Update library components | FR | Pull component updates | n/a | - |

#### 7. Responsive

Urd has two layouts by decision ([ADR-0019](../adr/0019-synced-mobile-model.md)): the desktop canvas and a synced mobile row grid with overrides per block. A proportional page zoom is not taken ([ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md) decision 5); «fit: shrink» per block remains.

| Function | Builders | How it works | Urd | Where |
|---|---|---|---|---|
| Custom breakpoints | WF (7), FS, WS, EL, DV (7), TI, WT, BR, WP | Add or edit widths; WP configurable viewports | Missing | Not taken: two breakpoints by decision (ADR-0019) |
| Cascade direction | WF, WS, WH, FR, FS, WT | Desktop-down; WF larger cascade up; WT min- or max-width choice | Missing | Not taken: two breakpoints by decision (ADR-0019) |
| Non-width media conditions | WT | Colour scheme, motion, orientation, pointer | Missing | Not taken: two breakpoints by decision (ADR-0019) |
| Auto layout or stacks | FR, FS, TI, WS, SQ, DU | Content-driven layout | Missing | Not taken: two breakpoints by decision (ADR-0019) |
| Scale-proportionally behaviours | WS, TI | Scale, Fixed; auto-scaling | Partial: «Shrink the content» zooms a block in proportion below the design width, and «Size» zooms a block at any width (0.7.21.5) | Not taken: a page-wide proportional zoom (ADR-0024 decision 5) |
| Mobile-only elements | WH, ST, SQ | Add in the mobile view; mobile overrides | Missing | 0.7.3 |
| Single-column mobile conversion | RM, CA | Single column; cropped or expanded views | Has: the synced row grid | - |
| Responsive AI fix | WS, WH, FR, FS | One-click responsive; Fix layout; agent | Missing | Not taken |
| Min/max sizes | FR, WS, WP | Constraints per element | Partial: the shrink floor, and smallest and largest text bounds under «Size» (0.7.21.5); no min or max width or height | - |
| Mobile reorder | SQ, HO, WH | Alt+arrows; manual sort | Has: up and down buttons in the phone toolbar (0.7.3); no keys | 0.7.3.6: keys for the phone order |
| Per-breakpoint variable values | OX | Variable value per breakpoint | n/a | - |
| Responsive offcanvas | BR | Direction per breakpoint | n/a | - |
| Masonry or bento | FR | Layout presets | Partial: masonry as the gallery's mosaic view; no bento | 0.7.9 bento preset |
| Separate mobile editing | HO, WE, WH, CA, SQ | Independent mobile layout | Has: mobile overrides and mobile review | - |

#### 8. Interactions and motion

Motion that needs a library, the GPU or more complexity than the audience can use is not taken: WebGL cursor effects, dragging, keyboard triggers, timelines, variables, spin, conditional interactions, an easing editor and shaders. Lottie comes as a local plugin (v0.8 Animation files), and styles and layers that follow the pointer come with v0.8 OL-1.

| Function | Builders | How it works | Urd | Where |
|---|---|---|---|---|
| Entrance or appear | WS, FR, EL, OX, DV, SQ, CA, TI, RM, WH, HO, ST, FS, BD, CV, WF | On load or in view | Has: fade-in, slide-up, zoom-in | - |
| Scroll-linked (scrub, transform) | WS, FR, FS, EL, TI, WT, OX, WF, RM, SQ | Progress tied to scroll | Missing | ER-H: the scroll-scrubbed entrance as a choice of its own |
| Parallax | FR, FS, BR, DU, WN, ST, TI, OX, RM | Speed or background parallax | Has | - |
| Hover effects | WS, FR, FS, TI, RM, SQ, CV, BD, OX, EL, WF, SH | Hover trigger | Has: hover lift | - |
| Click or press | WS, FR, FS, TI, RM, SQ, EL, BD, OX, WF | Click trigger | Partial: lightbox | ER-A: popup |
| Loop | WS, FR, TI, RM, SQ | Continuous animation | Has: ribbon, animated gradient | - |
| Mouse or cursor effects | EL, FS, FR, WS, SQ | Mouse track, 3D tilt, mouse parallax, WebGL | Planned: a style or a background layer that follows the pointer | v0.8 OL-1: the pointer as custom properties; WebGL not taken |
| Draggable | FR, FS | Visitor drag | Missing | Not taken: library, GPU or complexity |
| Keyboard-triggered | BD, OX | Key up/down or keypress | Missing | Not taken: library, GPU or complexity |
| Interaction actions | BD, OX, FS, WF | Show or hide, classes, attributes, variables, scroll to | Missing | ER-A, as far as popups and tabs go |
| Timeline or keyframes | WF, TI, OX | Horizontal timeline; step-by-step; sequences (Figma Motion belongs to Figma Design) | Missing | Not taken: library, GPU or complexity |
| Text split animation | WF, FR, WT, FS | SplitText; by character, word or line; typewriter, scramble | Missing | ER-H: animated headline |
| Stagger | WF, WT, OX | Cascaded children | Has: stagger for card groups | - |
| Marquee or ticker | FR, FS | Infinite scroll strip | Has: ribbon | - |
| Lightbox | FS, WP, SQ | Overlay or gallery lightbox | Has | - |
| Sticky | FR, FS, EL, OX, SQ | Pin within the scroll | Has | - |
| Shrinking header | DU | The header changes on scroll | Has: scroll shrink in the nav | - |
| Lottie | DV | Lottie module | Missing | v0.8 Animation files |
| Reduced motion | FR, WT | Setting or media condition | Has | - |
| Component state interactions | FR, FS | Variant change on a trigger | n/a | - |
| Copy animation settings | RM | ⇧⌘C/V | Has (0.7.20.8): part of the copied style | - |
| Preview or run animations in the editor | CA, OX | Alt+P; Run Interactions | Partial: motion demo | - |
| Interaction reuse | WF, FR | Reusable interactions; effects on components | n/a | - |
| Video plays in view | FR, WT | Video animation | Has | - |
| Shaders or WebGL | FR, WS, SQ | Shader effects; WebGL backgrounds | Missing | Not taken: library, GPU or complexity |
| Animation presets | RM, WS, SQ, OX | Ready-made animations | Has | - |
| Site-wide animation setting | SQ, SH | One entrance style and speed for every block (SQ); reveal on scroll and a card hover effect as theme settings (SH) | Missing: entrance and hover are set per block and per section | 0.7.9: the motion intensity setting |
| Scroll points | CA | Scroll anchors | Has: section anchors | - |
| Per-breakpoint interactions | EL, BR | Breakpoint controls; viewport visibility % | Partial: decor, hide on mobile | - |
| Triggers and event variables | FR | Trigger events into variables | Missing | Not taken: library, GPU or complexity |
| Spin effect | FS | Rotation loop | Missing | Not taken: library, GPU or complexity |
| Conditional interactions | FS | Boolean expressions; set variable | Missing | Not taken: library, GPU or complexity |
| Easing editor | WF | Advanced easing | Missing | Not taken: library, GPU or complexity |
| Animate variables | WF, BD | Tween or set CSS variables | Missing | Not taken: library, GPU or complexity |

#### 9. Media in the editor

| Function | Builders | How it works | Urd | Where |
|---|---|---|---|---|
| Crop, rotate, flip | WP, DU, RM, SQ | Media editor modal; photo editor; crop and round | Partial: zoom toward a focal point, shapes and radius, brightness, contrast and saturation, all non-destructive; no free crop, rotate or flip | v0.8 image editor |
| Focal point | SQ, SH | A point on the image that every responsive crop keeps in view | Has: on image blocks, gallery images, collection entries and the image layer | - |
| Alt-text field | TI, WS, FR, WP, CA, DU, SQ | Per-image alt text | Has | - |
| AI alt text | DU, WP | Generate per image or site-wide | Missing | Not taken: third party or AI (MCP) |
| Alt Text Manager (bulk) | DU | All images in one view | Missing | v0.8 AU-1 audit panel: the images without alt text in one list, edited in place |
| AI image generation or editing | WS, WH, FS, HO, WP, SH, DV, WN, SQ | Prompt-based images and edits | Missing | Not taken: third party or AI (MCP) |
| Background removal | FS, SH, SQ | Isolate the subject or change the background | Missing | Not taken: third party or AI (MCP) |
| Upscale | FS | Resolution enhancement | Missing | Not taken: third party or AI (MCP) |
| Video settings | EL, BR, FR, FS, RM, DU, CA, TI | Autoplay, loop, start/end, object-fit | Has: loop, muted, poster | - |
| Background video | EL, DU, WN, SQ | Video behind content | Has | - |
| SVG styling or animation | BR, FR, WT | SVG per breakpoint; SVG animations; paste SVG | Partial | - |
| Vector drawing or booleans | FR, FS | Pen, paths, booleans | Missing | Not taken: third party or AI (MCP) |
| Icon libraries or managers | RM, BR, WP, WN, DV | Noun Project; Icon Manager; Icon block | Has: icon library and icon editor | - |
| Asset or media manager | WF, WH, BR, WT, SQ | Assets panel; Media Manager; bulk and metadata (BR) | Missing | v0.8 media library |
| Stock media | RM, DU, WN, WH, SQ, SH | Unsplash, GIPHY, Shutterstock | Missing | Not taken: third party or AI (MCP) |
| Image optimisation | DU, SQ | Auto resize per device | Partial: WebP and size limits at upload; no sizes per device | v0.8 responsive pictures |
| Image metadata import | SQ | EXIF and IPTC titles, captions and tags read at upload | Missing: the upload re-encodes a still picture as WebP, which drops its metadata, GPS position included | Not taken: low value |
| Export layers | FR | Elements to an image or SVG | Missing | Not taken: third party or AI (MCP) |
| File or PDF element | BR | PDF preview | Missing | ER-B |
| Gallery or slider settings | TI, DU, BR, WP, SQ | Autoplay, zoom, load more, lightbox | Has: six gallery views with a lightbox | - |
| Decorative image toggle | WP | Marks an image as decorative | Missing | 0.7.11 |
| External-URL images | EL | Image from a URL | Missing | Not taken: images live in the repo, and the CSP allows images from the site itself only |
| Cloud upload | DU | Dropbox and others | Partial: the image gallery layer reads shared folders at Google Drive, Google Photos or Nextcloud | - |
| Colour overlays on media | DU | Overlay on an image or video | Partial | - |

Note: the enumeration's last AI row («AI image tasks in the editor») points back to AI image generation above and is not repeated under [AI in the editor](#14-ai-in-the-editor).

#### 10. Text editing

| Function | Builders | How it works | Urd | Where |
|---|---|---|---|---|
| Inline on-canvas text editing | EL, SH, WP, DV | Click to type; contextual toolbar | Has: click-and-write with a floating text toolbar | - |
| Bold, italic, underline | WS, WE, WH, SQ, WP | ⌘B / I / U | Has | - |
| Heading or paragraph shortcuts | SQ, WP | ⌘⌥0-6; Shift+Alt+1-6 | Missing | 0.7.10 |
| Text alignment shortcuts | SQ | ⇧⌘L / E / R | Missing | 0.7.10 |
| Lists and indent | SQ | Tab / ⌘] | Has: lists | - |
| Paste as plain text | SQ | ⌘⇧V | Missing | 0.7.10 |
| Inline code | WP, SQ | Ctrl+Alt+X | Missing | Not taken: audience |
| Insert or remove a link | WP, SQ | ⌘K; ⌘⇧K | Partial: links from the text toolbar; no Ctrl+K | 0.7.10: link with Ctrl+K |
| Internal-link autocomplete | WP, SQ | `[[` | Partial: page picker | - |
| Link types (page, anchor, email, phone) | FR, CA, WP, FS, SQ | Email and phone links; URL types; page jumps | Partial: external, internal and mailto; no tel: | 0.7.10: tel: links |
| Dynamic text or variables | CA, WT, BR, OX, DV, WP | {{var}}; expression editor; bindings | n/a | - |
| Rich-text modal | BD, DU, SH | ⌘E modal; rich text | n/a | - |
| Text balance or truncation | FR | Line-break balancing; ellipsis | Missing | 0.7.9: `text-wrap` |
| Drop cap, columns, stroke | DV | Body-text styling | Missing | 0.7.9: drop cap behind a gate (`initial-letter` is not Baseline) |
| Letter case or text transform | WP, SQ | Case controls | Missing | 0.7.9 |
| Special characters | SQ | Character insertion | Has: GlyphPicker | - |
| Markdown formatting | CA | Markdown syntax | Missing | 0.7.10 paste |
| AI write, rewrite, tone | WS, WH, SQ, FS, DU, HO, TI, WN, DV, WP, SH | Generate, simplify, shorten, change tone | Missing | Not taken: MCP |
| Find and replace in code | BR, SH | Search and replace in the code control | Missing | Watch: find and replace across the site |

#### 11. Editing workflow

| Function | Builders | How it works | Urd | Where |
|---|---|---|---|---|
| Undo and redo | all with published shortcuts | ⌘Z / ⌘⇧Z | Has | - |
| History panel | EL, BR, FR, BD | Actions or revisions list | Has | - |
| Autosave | FR, WE | Auto-save; toggle (WE) | Has: drafts kept in the browser | - |
| Snapshots or backups | WF, DU, WN, SH | Save snapshot; site backup | Has: git | - |
| Version history or restore | FR, FS, WP, EL, BD, SH (beta) | Version history; rollback; revisions | Has: publish history and «undo the last publish» | - |
| Visual revision diff | WP | Green and red changes | Missing | Watch |
| Shareable revision links | WP | Link to a revision | Missing | Watch, with the visual revision diff |
| Canvas comments or notes | WF, FR, WS, FS, EL, WP, DU | Pinned feedback | Missing | Watch |
| @mentions | WP | Notes with mentions and email | Missing | Watch |
| Real-time co-editing or presence | WF, FR, WS, WH | Multiplayer cursors | Missing | After v1.0: concurrency view |
| Agent presence | WF | Agent cursor on the canvas | n/a | - |
| Editor roles or permissions | WF, FR, WS, WT, BR, WN, SH | Role-scoped UI; share-link levels | Partial: GitHub | v0.9 board handover |
| Content-only edit mode | WF, WT, FR | Edit mode; Content mode; on-page editing | Missing | v0.9 content-only editing mode, to be weighed |
| Page-level permissions | WS | Restrict pages | Missing | Not taken |
| Branching or staging | WF, FR, SH | Branch, stage, merge; staging URLs | Missing | After v1.0: PR per draft |
| Review or approval | WF, FR, SQ (Enterprise) | Request review; sign-off | Missing | After v1.0: PR per draft |
| CMS draft publishing flow | WS, WE | Drafts with side-by-side compare | Partial: drafts across pages; no side-by-side compare | Watch, with the visual revision diff |
| Publish or quick publish | WS, CA, FR, FS, WN, SH | Shortcut publish; unpublish | Has: publish | - |
| Selective save | WP | Choose the entities to save | Missing | Watch |
| Save draft | DV, WP | ⌘⇧S draft | Has: drafts across pages | - |
| Preview or share links | FR, WT, WP, SQ (Enterprise), SH | Branch preview; share links | Missing | After v1.0: PR per draft |
| Password protection | CV | Website password | Missing | Not taken: Cloudflare Access, a recipe in the v0.9 documentation round |
| Private editing or under construction | JI | Edit in private | Missing | Watch |
| Shortcut cheat-sheet panel | WF, FR, WS, WH, WP, EL, BD, DV, WT, SH, FS, TI, RM, WE | In-app list | Missing | 0.7.10 |
| Instant page switching | BR | No builder reload | Has | - |
| Theme or site export | WP, WT, BR, SH | Zip; self-host or CLI; transfer ZIP | Has: the repo | - |
| Reset or restart the site | SQ | Reset the site styles to the template's defaults; clear the content and keep the styles | Missing | v0.9: a blank start for new sites |
| Edit from mobile devices | WN, JI, SH, SQ | Phone editing; app | Partial | v0.9 touch friendliness |
| Page settings shortcut | EL, DV, WT | ⌘⇧Y; O; ⌥-click | Partial: page settings in the Pages panel, with no shortcut | 0.7.10: command palette |
| Site settings shortcut | EL, FS | ⌘K; website settings | Has: site settings behind the gear | - |
| Editor preferences | EL, WP, OX | Preferences panel | Has: admin language and admin theme, kept per browser | - |
| Exit builder shortcut | EL, DV | Esc; ⌘E | Has: «See the site» | - |
| Multiple AI conversations | DU | Switch threads | n/a | - |
| Persistent admin bar | WP | 7.1 | n/a | - |
| Changelog of merges | FR | Merge log | Has: publish history | - |

#### 12. Accessibility and quality tools

The legal floor for associations is «forskrift om universell utforming av IKT-løsninger», which «lag og organisasjoner» must follow: WCAG 2.0 levels A and AA, 35 success criteria ([Uutilsynet](https://www.uutilsynet.no/regelverk/regelverk-og-krav/746), primary). The audit panel (v0.8 AU-1) checks the site against it and shows its count in the publish dialog.

| Function | Builders | How it works | Urd | Where |
|---|---|---|---|---|
| Accessibility audit | WF, WS, WE | Audit panel; Accessibility Wizard | Missing | v0.8 AU-1 audit panel |
| Contrast checker | WF, WS | In the colour picker; wizard | Missing | 0.7.11: AA/AAA contrast in the colour picker |
| Vision simulation | WF | Vision preview | Missing | v0.8 AU-2 vision simulation, to be weighed after the audit panel |
| Heading-structure view or check | WP, WS, WF | Outline; wizard; skipped-heading check | Missing | v0.8 AU-1 audit panel |
| Missing-alt detection | WF, WS, DU | Audit, wizard, SEO overview | Missing | v0.8 AU-1 audit panel |
| Duplicate-ID check or prevention | WF, EL | Audit check; duplication fix | n/a: ids are generated | - |
| Non-descriptive link check | WF, FR | Audit; guidance | Missing | v0.8 AU-1 audit panel |
| SEO audit or checklist | DU, HO, FS | SEO Audit; AI SEO; settings | Partial: a marker on pages without a description | v0.8 AU-1 audit panel |
| Broken-link check | DU | SEO Overview | Missing | v0.8 AU-1 audit panel (internal links) |
| Performance monitoring | FR, SH | Core Web Vitals | Missing | v0.8 «show the engine's lightness» |
| ARIA labels | FR, DV, BR | ARIA attributes | Has: ARIA on the output | - |
| Tab-order customisation | FR | Keyboard order | n/a: the reading order follows `y` | 0.7.11 checks it |
| Keyboard-operable editor | WP, SQ, FS, BR, WF | Region navigation; Tab through panels; box select | Missing | 0.7.11 |
| Form accessibility | EL | Autocomplete; message semantics | Partial | 0.7.11 |
| AI SEO or visibility audit | DU, SH | Copilot audits; an AI check of the store's setup before launch (SH) | Missing | Not taken |

Note: the enumeration lists **reduced-motion support** (FR, WT) here as well, pointing back to Reduced motion under [Interactions and motion](#8-interactions-and-motion). Urd: Has.

#### 13. Developer features

Head, page and element code, and JavaScript triggers, are not taken in the core: they would break the strict CSP and get past the sanitizer. A plugin is the route for code.

| Function | Builders | How it works | Urd | Where |
|---|---|---|---|---|
| Site-wide head and body code | WF, SQ, RM, CA, WN, FR, SH | Code injection | Missing | Not taken for head and body scripts; a code bundle goes in the portal, v0.8 Animation files |
| Per-page code | WF | Page head or before the body end | Missing | Not taken in the core: plugin route |
| Per-element code embed | WF, RM, CA, WP, DU, TI, SQ | Embed or HTML element | Missing | Not taken in the core: plugin route |
| Code components | WF, FR, FS, WS, DU, SH, OX | React, Velo, Liquid, Twig | Has: plugin blocks | - |
| Code overrides | FR | Functions that modify layers | Missing | Not taken in the core: plugin route |
| React export | WF | DevLink | n/a: the repo is the code | - |
| Plugin or extension SDK | WF, FR, WP, WS, OX, DU, SH (app blocks and app embeds) | Designer API; Plugin API; Abilities and commands | Has: the define API | - |
| Built-in IDE or dev mode | WS, DU, WP, SH | Wix IDE and GitHub; Dev Mode; code editor | n/a: the repo is the code | - |
| Two-way Git sync | SH | A theme connected to a GitHub branch: a push updates the theme, and a save in the admin commits back | Has: the site is the repo; every publish is a commit, and a push to the repo goes live (ADR-0003, ADR-0004) | - |
| Command line and theme tooling | SH | A CLI with a local preview, live reload, push and pull; a theme linter in CI and code editors; an editor extension, documentation comments, a formatter and a render profiler | Partial: every site has a local server (`dev-server.py`); the content's JSON schemas and their validation live in Urd's own repo, not in a site | - |
| Pro code editor (Emmet, lint) | BD, OX, BR, SH | CodeMirror 6 | n/a: the repo is the code | - |
| JS event triggers | CA, OX | Run JS on events | Missing | Not taken in the core: plugin route |
| Dynamic data or loops | WF, FR, BR, OX, DV, EL, WP, WT, FS, DU, SH | CMS, queries, bindings | Has: collections | - |
| Conditional visibility | OX | Role or field conditions | Missing | ER-H: date windows |
| Custom element builder | OX | Element Studio | Has: the same define API | - |
| CSS framework import | BR | Extract classes and variables | n/a: the repo is the code | - |
| Bidirectional CSS and controls | BR | CSS Sync | n/a: the repo is the code | - |
| PHP-only blocks or patterns | WP | 7.0 | n/a: the repo is the code | - |
| Register custom commands | WP | Command Palette API | Missing | 0.7.10, with the command palette |
| MCP or external agents | WF, FR, EL, BD, OX, BR, WT, DU, WN, WP, SQ, SH | Agent connectors | Planned | v0.8/v0.9 MCP |

#### 14. AI in the editor

Urd's AI route is the site owner's own agent, with their own model, through the MCP server ([ADR-0017](../adr/0017-ai-via-local-mcp-server.md)): the server writes files that the site owner reviews and publishes, and a read tool returns agent instructions, built from the theme tokens, that tell the agent how the site is built. Built-in generation is not taken.

| Function | Builders | How it works | Urd | Where |
|---|---|---|---|---|
| Generate a full site | FR, WH, DU, HO, SQ, WN, JI, DV, SH, ST | Prompt or brief to a site or theme | Missing | Not taken: ADR-0017 |
| Generate a page | HO, DV, WH | Prompt to a page | Missing | Not taken: ADR-0017 |
| Layout variations | FR | Alternative compositions | Missing | Not taken: ADR-0017 |
| Translate | FS, WF | Rewrite-translate; agentic Localize | Planned: through the site owner's agent | v0.8/v0.9 MCP |
| Translation exclusions or memory | WF | Exclusion rules | Missing | After v1.0: multilingual content |
| SEO metadata or titles | HO, WP, JI, DU | AI SEO; titles and excerpts | Planned: through the site owner's agent | v0.8/v0.9 MCP |
| Conversational agent | WF, FR, WH, DU, EL, DV, SH, TI, SQ (beta) | Assistant, Agent, Aria, Copilot, Angie, Sidekick | Planned: the site owner's own agent | v0.8/v0.9 MCP |
| Plan mode | DU | Plan before execution | n/a | Not taken: ADR-0017 |
| AI code generation | WF, FR, FS, WS, DU, SH | Code components, layers or blocks | Missing | Not taken: ADR-0017 |
| AI CMS content | FR, EL | CMS agent; Loops and dynamic tags | Planned: through the site owner's agent | v0.8/v0.9 MCP |
| Reusable AI skills or instructions | FR, WF, SH | Skills; Agent Instructions | Planned | v0.8 MCP: agent instructions returned by a read tool, built from the theme tokens |
| Manual edits without AI credits | TI, DU | Editing panel; credit-free edits | n/a: no AI credits | - |
| Disable AI for the organisation | FR | Enterprise toggle | n/a: no built-in AI | - |
| Model selection | FR | Choose the agent's model | n/a: the site owner's agent brings its own model | Not taken: ADR-0017 |
| Agent auto-branching | FR | Agents work in branches | Planned: the MCP server will write files the site owner reviews; it does no git operations (ADR-0017) | v0.9 MCP write |
| AI logo | HO | Logo maker | Missing | Not taken: ADR-0017 |
| AI forms | JI | AI-drafted smart forms | Missing | Not taken: ADR-0017 |
| AI design-system build | EL, BR | Angie classes and variables; AI client | Missing | Not taken: ADR-0017 |

### Sources for the catalogue

Every source was read on 11 October 2026, except those a builder's list marks as read on 19 October 2026. The links are copied from the two enumeration reports; a date in brackets is the page's own date where it shows one. (primary) is the vendor's or regulator's own page, (secondary) a third party, and (extract) a vendor page read through a search engine's extract because the page itself would not load. In the editor list, «…/» stands for the path of the link before it, as the enumeration wrote it.

**Caveats, site and business functions:**
- The official plan tables could not be read by machine for Wix (wix.com/plans), Webflow (pricing), Jimdo, Tilda and Webnode. For Webflow and Wix, plan gating comes from dated third-party pages, and those disagree with each other.
- Webflow's official site was unreachable (a header-overflow error); its help-centre and update pages are known only from search snippets.
- Canva's help centre and GoDaddy's builder page returned 403, so those two rest on search snippets only.
- Rubic lists no website module; it is included as a baseline for club administration.
- Not found at any builder: native WebMCP support and Content-Signal support in robots.txt (but see the WebMCP note under [AI outside the editor](#16-ai-outside-the-editor)).
- Not checked in this pass, so unverified rather than missing: maintenance or coming-soon mode, reading time, related posts, waitlists.

**Caveats, editor and design functions:**
- Several official help centres would not load directly: Webflow (the help centre, webflow.com and its changelog), Canva, Jimdo, Strikingly, Duda's shortcut page and Webnode's help pages. Their content comes from search-engine extracts of the vendors' own pages, marked (extract).
- Some Webflow release items come from changelog mirrors (releasebot.io, releases.sh), and the Webflow Conf 2026 items from a third-party recap (noqode.fr), because webflow.com/blog/2026-builder-keynote would not load.
- Squarespace AI text (write, simplify, shorten, lengthen) was documented only on third-party sites on 11 October 2026; Squarespace's own help page documents it since ([Using Squarespace AI](https://support.squarespace.com/hc/en-us/articles/16282290976013-Using-Squarespace-AI), primary, read 19 October 2026).
- The Figma Config 2026 features (the Figma Motion timeline, shader fills, generative plugins, agent skills and connectors) belong to Figma Design; whether Sites gets them is not stated.
- Canva's shortcut page exists, but its text could not be retrieved (403).
- Wix Studio 2 (Plan Mode, design tokens, AI Skills) was covered only by third-party sites and is left out.
- Readymag has no official 2026 editor changelog; its sources date from 2018 to 2023.
- The Breakdance and Oxygen shortcut pages returned 404 and were read through extracts; Framer's shortcut page rendered only in part.
- The builders whose source lists carry 19 October 2026 were read in full that day, so they carry more codes than the builders read on 11 October; a count of codes per builder does not compare the builders.
- A builder code means the function is documented in what could be reached. The thinly documented builders (Jimdo, Webnode, Strikingly, Canva, Readymag, Hostinger) are almost certainly under-counted.

**Site and business functions, per builder:**
- **Wix (WX):** product pages [features/main](https://www.wix.com/features/main), [ecommerce/features](https://www.wix.com/ecommerce/features), [seo](https://www.wix.com/seo), [scheduling-software](https://www.wix.com/scheduling-software), [studio/features](https://www.wix.com/studio/features), [studio/agencies](https://www.wix.com/studio/agencies) (primary); support articles [roles](https://support.wix.com/en/article/roles-permissions-overview), [form fields](https://support.wix.com/en/article/wix-forms-managing-your-form-fields), [Multilingual auto-translate](https://support.wix.com/en/article/wix-multilingual-auto-translating-your-site), [Privacy & Cookies](https://support.wix.com/en/article/about-privacy-cookies), [2-step verification](https://support.wix.com/en/article/using-2-step-verification-for-your-wix-account), [Inbox](https://support.wix.com/en/article/wix-inbox-an-overview), [Groups](https://support.wix.com/en/article/wix-groups-about-groups), [Referral](https://support.wix.com/en/article/wix-referral-program-adding-and-setting-up-your-referral-program), [Donations](https://wix.com/app-market/web-solution/donations) (primary); developer docs [data types](https://dev.wix.com/docs/api-reference/business-solutions/cms/data-types-in-wix-data), [form fields API](https://dev.wix.com/docs/api-reference/crm/forms/form-schemas/about-form-fields), [API index](https://dev.wix.com/docs/api-reference.md), [Wix MCP](https://dev.wix.com/docs/api-reference/articles/ai-tools/wix-mcp/about-the-wix-mcp) (primary); [App Market](https://www.wix.com/app-market) (primary); [AI Visibility press release](https://www.nasdaq.com/press-release/wix-launches-ai-visibility-overview-full-generative-engine-optimization-support-ai) (primary, the vendor's press release); plan gating from [stylefactoryproductions](https://www.stylefactoryproductions.com/blog/wix-pricing) (secondary, 11 August 2026) and [wix.com/blog/wix-premium-plans](https://www.wix.com/blog/wix-premium-plans) (primary).
- **Squarespace (SQ):** product pages [pricing](https://www.squarespace.com/pricing), [ai-visibility](https://www.squarespace.com/ai-visibility), [July 2026 updates](https://www.squarespace.com/blog/product-updates-july-2026), [scheduling](https://www.squarespace.com/scheduling), [email-marketing](https://www.squarespace.com/email-marketing), [membership sites](https://www.squarespace.com/ecommerce/membership-sites), [ecommerce-website](https://www.squarespace.com/ecommerce-website) (primary); help centre [form fields](https://support.squarespace.com/hc/en-us/articles/205814018-Form-fields-explained), [SEO](https://support.squarespace.com/hc/en-us/articles/206744067-What-Squarespace-does-for-SEO), [AI exclusion](https://support.squarespace.com/hc/en-us/articles/360022347072-Request-that-AI-models-exclude-your-site), [cookie banner](https://support.squarespace.com/hc/en-us/articles/206545727-Adding-a-cookie-banner), [2FA](https://support.squarespace.com/hc/en-us/articles/360000044827-Protect-your-account-with-two-factor-authentication), [URL mappings](https://support.squarespace.com/hc/en-us/articles/205815308-URL-mappings), [collection pages](https://support.squarespace.com/hc/en-us/articles/208216828-Collection-pages), [Not linked pages](https://support.squarespace.com/hc/en-us/articles/360025899552-The-Not-Linked-section), [404](https://support.squarespace.com/hc/en-us/articles/205814478-Creating-a-custom-404-page), [Member Sites](https://support.squarespace.com/hc/en-us/articles/360050832631-Member-Sites) (primary); roles from [stitchflow](https://www.stitchflow.com/user-management/squarespace/manual) (secondary); and, read 19 October 2026, the whole help centre ([support.squarespace.com/hc/en-us](https://support.squarespace.com/hc/en-us): every category with its section and article lists), the [pricing](https://www.squarespace.com/pricing) table in NOK, [Refresh 2025](https://www.squarespace.com/refresh), the monthly [product updates](https://www.squarespace.com/blog/category/product-updates) from January 2025 to September 2026 and [Bio Sites](https://biosites.com/) (primary), and the Acuity help centre ([help.acuityscheduling.com](https://help.acuityscheduling.com/hc/en-us), extract: it returned 403).
- **Webflow (WF):** reachable official pages [Data API field types](https://developers.webflow.com/data/reference/cms/collection-fields/create) and [app listing categories](https://developers.webflow.com/apps/docs/marketplace/listing-your-app) (primary); help-centre and update pages known only from search snippets: [roles](https://help.webflow.com/hc/en-us/articles/41015530193811), [Site Activity log](https://help.webflow.com/hc/en-us/articles/33961371582995), [spam prevention](https://help.webflow.com/hc/en-us/articles/34277758554771), [Markdown for AI agents](https://help.webflow.com/hc/en-us/articles/50435871026195-Markdown-for-AI-agents), [User Accounts sunset](https://help.webflow.com/hc/en-us/articles/36046006227731), [Analyze clickmaps](https://help.webflow.com/hc/en-us/articles/47484368911635), [AEO update](https://webflow.com/updates/now-available-webflow-aeo) (primary, extract); plans from [webnomads](https://www.webnomads.com/resources/webflow-pricing) (secondary, 7 July 2026), [brixtemplates](https://brixtemplates.com/blog/webflow-may-2026-pricing-changes-explained) (secondary, May 2026) and [creativecorner](https://www.creativecorner.studio/blog/webflow-pricing-overview) (secondary, updated 7 October 2026), which conflict: creativecorner still lists the CMS and Business plans. Form rate limiting and IP reputation (March 2026), the MCP server and the Claude connector, and the app backend rest on secondary sources.
- **Framer (FR):** product pages [pricing](https://www.framer.com/pricing), [features](https://www.framer.com/features/), [convert](https://www.framer.com/convert/), [security](https://www.framer.com/security/), [plugins](https://www.framer.com/marketplace/plugins/), [forms update](https://www.framer.com/updates/forms) (20 June 2024), [cookie banner](https://www.framer.com/updates/cookie-banner-component), [July 2026 update](https://www.framer.com/updates/july-update-2026); help centre [help index](https://www.framer.com/help/) and the categories [security](https://www.framer.com/help/security/), [SEO](https://www.framer.com/help/seo/), [publishing](https://www.framer.com/help/publishing/), [CMS](https://www.framer.com/help/cms/), [localization](https://www.framer.com/help/localization/), [enterprise](https://www.framer.com/help/enterprise/), [integrations](https://www.framer.com/help/integrations/), [account](https://www.framer.com/help/account/); articles [firewall](https://www.framer.com/help/articles/how-to-use-firewall/), [form fields](https://www.framer.com/help/articles/add-different-field-types-to-native-form/); developers [CMS field types](https://www.framer.com/developers/cms) (all primary).
- **WordPress.com, core and Jetpack (WP):** [wordpress.com/pricing](https://wordpress.com/pricing/), [wordpress.org features](https://wordpress.org/about/features/), [plugin directory](https://wordpress.org/plugins/), [Jetpack form block](https://jetpack.com/support/jetpack-blocks/contact-form/), [WP privacy tools](https://wordpress.org/documentation/article/wordpress-privacy/) (primary).
- **Shopify (SH):** [pricing](https://www.shopify.com/pricing), [POS features](https://www.shopify.com/features), [online store](https://www.shopify.com/online), [App Store categories](https://apps.shopify.com/categories), [Agentic Storefronts](https://www.shopify.com/news/winter-26-edition-agentic-storefronts) (primary); and, read 19 October 2026, the whole manual ([help.shopify.com/en/manual](https://help.shopify.com/en/manual): every section with its article lists), the [pricing](https://www.shopify.com/pricing) table in NOK (the label rows from the [Canadian table](https://www.shopify.com/ca/pricing)), [shopify.dev](https://shopify.dev/docs) for the APIs, themes and agents, the [App Store](https://apps.shopify.com/) listings of Shopify's own apps, the Editions [Winter '25](https://www.shopify.com/editions/winter2025), [Summer '25](https://www.shopify.com/editions/summer2025), [Winter '26](https://www.shopify.com/editions/winter2026) and [Spring '26](https://www.shopify.com/editions/spring2026), and the [changelog](https://changelog.shopify.com/) to October 2026 (primary).
- **Ghost (GH):** [features](https://ghost.org/features/), [pricing](https://ghost.org/pricing/) (primary).
- **Duda (DU):** [pricing](https://www.duda.co/pricing), [features](https://www.duda.co/features), [personalization](https://support.duda.co/hc/en-us/articles/26519232141207-Personalization-Rules), [membership](https://www.duda.co/features/membership-sites), [accessibility](https://support.duda.co/hc/en-us/articles/26519471603607-Accessibility-at-Duda) (primary).
- **Hostinger (HO):** [website-builder](https://www.hostinger.com/website-builder) (primary).
- **GoDaddy (GD):** [GoDaddy website builder](https://www.godaddy.com/websites/website-builder?cvosrc=assets.wsb_badge.wsb_badge), [Airo AI Builder features](https://airo-builder.godaddy.com/discover/features) (primary, from search snippets only: the page returned 403).
- **Jimdo (JI):** [website-builder page](https://www.jimdo.com/website/website-builder/) (primary; the pricing table was not machine-readable).
- **Square Online and Weebly (SO):** [plans](https://squareup.com/us/en/online-store/plans), [weebly.com/features](https://www.weebly.com/features) (primary).
- **Webnode (WN):** [features](https://www.webnode.com/features/) (primary).
- **Strikingly (ST):** [pricing](https://www.strikingly.com/s/pricing), [features](https://www.strikingly.com/s/features) (primary).
- **Carrd (CA):** [carrd.com/pro](https://carrd.com/pro) (primary).
- **Tilda (TI):** [features](https://tilda.cc/en/features/) (primary); the [pricing compare table](https://tilda.cc/pricing-compare/) was not machine-readable, so the plan split (Personal has every feature; Business adds code export and 5 sites) comes from a search summary.
- **Figma Sites (FI):** [figma.com/sites](https://www.figma.com/sites/), [publish help](https://help.figma.com/hc/en-us/articles/35895970131479-Figma-Sites-collection-Publish-your-Figma-site), [CMS guide](https://help.figma.com/hc/en-us/articles/35995403973783-Guide-to-Figma-Sites-CMS) (primary).
- **Canva Websites (CV):** [website settings help](https://www.canva.com/help/website-settings/), [publishing help](https://www.canva.com/help/publishing-canva-websites/) (primary, from search snippets only: the help centre returned 403).
- **Notion Sites (NO):** [notion.com/product/sites](https://www.notion.com/product/sites) (primary).
- **Super (SU):** [super.so/pricing](https://super.so/pricing) (primary).
- **Durable (DR):** [durable.com/pricing](https://durable.com/pricing) (primary).
- **Zoho Sites (ZO):** [pricing](https://www.zoho.com/sites/pricing.html) (primary).
- **WildApricot (WA):** [features](https://www.wildapricot.com/features) (primary).
- **Spond Club (SP):** [club-website](https://www.spond.com/club-website/), [help collection](https://help.spond.com/club/en/collections/240125-club-website), [subscription payments](https://help.spond.com/en/articles/25738-spond-club-how-to-set-up-subscription-payments), [membership renewal](https://help.spond.com/en/articles/162557-spond-club-how-to-use-membership-renewal) (primary).
- **StyreWeb (SW):** [styreweb.com](https://www.styreweb.com/), [hjemmeside](https://www.styreweb.com/hjemmeside) (primary).
- **Rubic (RU):** [rubic.no](https://www.rubic.no/) (primary; no website module found).

**Editor and design functions, per builder:**
- **Webflow (WF):** [Keyboard shortcuts](https://help.webflow.com/hc/en-us/articles/33961359609875) (extract); [university.webflow.com/glossary/keyboard-shortcuts](https://university.webflow.com/glossary/keyboard-shortcuts); [Breakpoints overview](https://help.webflow.com/hc/en-us/articles/33961300305811) (extract); [Audit panel](https://help.webflow.com/hc/en-us/articles/33961313088531) (extract); [States](https://help.webflow.com/hc/en-us/articles/33961301727251) (extract); [developers.webflow.com/reference/the-style-object](https://developers.webflow.com/reference/the-style-object); [Component variants](https://help.webflow.com/hc/en-us/articles/51307110086547); [developers.webflow.com/designer/reference/variable-modes](https://developers.webflow.com/designer/reference/variable-modes); [Page branching](https://help.webflow.com/hc/en-us/articles/33961355506195); [Collaborate](https://help.webflow.com/hc/en-us/articles/33961260491795); [help.webflow.com/lesson/find-and-clean-styles](https://help.webflow.com/lesson/find-and-clean-styles); [Custom CSS properties](https://help.webflow.com/hc/en-us/articles/33961265610259); [Custom attributes](https://help.webflow.com/hc/en-us/articles/33961389460115); GSAP interactions [42832297904019](https://help.webflow.com/hc/en-us/articles/42832297904019) and [42861691922963](https://help.webflow.com/hc/en-us/articles/42861691922963); [Quick find](https://help.webflow.com/hc/en-us/articles/33961382093587) (all primary); changelog mirrors [releases.sh/webflow/webflow-product-updates](https://releases.sh/webflow/webflow-product-updates) and [releasebot.io/updates/webflow](https://releasebot.io/updates/webflow) (secondary, August to 9 October 2026); Conf 2026 (2-3 September 2026) from [noqode.fr/en/blog/webflow-conf-2026](https://noqode.fr/en/blog/webflow-conf-2026) (secondary; webflow.com/blog/2026-builder-keynote would not load).
- **Framer (FR):** [framer.com/features/design/](https://framer.com/features/design/), /features/effects/, /features/collaborate/; [framer.com/updates](https://framer.com/updates) (to 1 October 2026); [framer.com/shortcuts](https://framer.com/shortcuts) (rendered in part); [framer.com/academy/lessons/8-framer-shortcuts-to-learn](https://framer.com/academy/lessons/8-framer-shortcuts-to-learn) (8 October 2026); [framer.com/academy/lessons/framer-animations-overview](https://framer.com/academy/lessons/framer-animations-overview) (8 October 2026); [framer.com/academy/lessons/component-variants-in-framer](https://framer.com/academy/lessons/component-variants-in-framer) and …/component-variables-in-framer; [framer.com/academy/lessons/framer-fundamentals-breakpoints](https://framer.com/academy/lessons/framer-fundamentals-breakpoints); [framer.com/help/canvas/](https://framer.com/help/canvas/), /help/accessibility/, /help/ai/ (article indexes); [framer.com/help/articles/how-to-use-agents/](https://framer.com/help/articles/how-to-use-agents/) (8 October 2026); [framer.com/updates/quick-insert](https://framer.com/updates/quick-insert) (2022); [framer.com/developers/overrides-introduction](https://framer.com/developers/overrides-introduction) (all primary).
- **Wix Studio (WS):** [support.wix.com/en/article/studio-editor-keyboard-shortcuts](https://support.wix.com/en/article/studio-editor-keyboard-shortcuts); …/wix-studio-about-the-studio-editor; …/studio-editor-building-a-responsive-site; …/studio-editor-about-animations; …/studio-editor-about-css-editing; …/studio-editor-collaborating-on-a-site; …/studio-editor-working-with-layers; …/studio-editor-creating-and-managing-design-libraries; …/accessibility-about-the-accessibility-wizard-in-the-studio-editor; …/studio-editor-using-the-ai-text-creator; [wix.com/studio/features](https://wix.com/studio/features); [dev.wix.com/docs/develop-websites/articles/coding-with-wix-studio/wix-studio-working-with-the-code-panel](https://dev.wix.com/docs/develop-websites/articles/coding-with-wix-studio/wix-studio-working-with-the-code-panel); [wix.com/updates](https://wix.com/updates) (August 2026) (all primary).
- **Wix Editor (WE):** [support.wix.com/en/article/keyboard-shortcuts-for-the-editor](https://support.wix.com/en/article/keyboard-shortcuts-for-the-editor); …/wix-editor-aligning-distributing-and-matching-the-size-of-multiple-elements; …/wix-editor-using-the-editor-toolbar-to-adjust-elements; …/wix-editor-using-the-layers-panel; …/accessibility-using-the-accessibility-wizard (all primary).
- **Wix Harmony (WH):** [support.wix.com/en/article/wix-harmony-editor-keyboard-shortcuts](https://support.wix.com/en/article/wix-harmony-editor-keyboard-shortcuts) (January 2026); …/introducing-the-wix-harmony-editor; …/wix-harmony-editor-about-the-ai-tools (27-28 January 2026); …/wix-harmony-editor-adjusting-your-site-for-mobile; …/wix-harmony-editor-working-with-the-layers-panel; [globenewswire.com/news-release/2026/01/21/3222826](https://globenewswire.com/news-release/2026/01/21/3222826) (press release) (all primary).
- **Squarespace (SQ):** [support.squarespace.com/hc/en-us/articles/214491097](https://support.squarespace.com/hc/en-us/articles/214491097) (Keyboard shortcuts, 5 November 2025); …/6421525446541 (Fluid Engine, 16 July 2026); …/47427542388621 (Finish Layer, 16 July 2026); [squarespace.com/blog/finish-layer-website-design-tools](https://squarespace.com/blog/finish-layer-website-design-tools) (16 April 2026); [squarespace.com/blog/product-updates-may-2026](https://squarespace.com/blog/product-updates-may-2026); [squarespace.com/design-intelligence](https://squarespace.com/design-intelligence); [support.squarespace.com/hc/en-us/articles/205815928](https://support.squarespace.com/hc/en-us/articles/205815928) (custom code); …/226420067 (special characters) (all primary); and, read 19 October 2026, the help-centre sections on pages, blocks, design, Fluid Engine and Finish Layer, templates and custom code ([support.squarespace.com/hc/en-us](https://support.squarespace.com/hc/en-us)) with the monthly product updates to September 2026 (primary).
- **WordPress Site Editor (WP):** [wordpress.org/documentation/article/keyboard-shortcuts-block-editor/](https://wordpress.org/documentation/article/keyboard-shortcuts-block-editor/) (updated 14 September 2026); …/site-editor/ (14 September 2026); …/styles-overview/ (19 August 2026); …/list-view/ (9 September 2026); …/site-editor-command-palette/ (23 August 2026); [wordpress.org/news/2026/05/wordpress-7-0-armstrong/](https://wordpress.org/news/2026/05/wordpress-7-0-armstrong/); [make.wordpress.org/core/2026/08/05/wordpress-7-1-field-guide/](https://make.wordpress.org/core/2026/08/05/wordpress-7-1-field-guide/); [make.wordpress.org/core/2026/04/22/roster-of-design-tools-per-block-wordpress-7-0/](https://make.wordpress.org/core/2026/04/22/roster-of-design-tools-per-block-wordpress-7-0/) (primary); [wpbeginner.com/news/whats-new-in-wordpress-7-1-features-screenshots/](https://wpbeginner.com/news/whats-new-in-wordpress-7-1-features-screenshots/) (secondary; the 7.1 release date and summary).
- **Elementor (EL):** [elementor.com/help/hotkeys/](https://elementor.com/help/hotkeys/) (read through elementor.com/help/wp-json/wp/v2/posts/284, modified 2 September 2025); [elementor.com/blog/editor-40-atomic-forms-pro-interactions/](https://elementor.com/blog/editor-40-atomic-forms-pro-interactions/) (15 April 2026); [github.com/orgs/elementor/discussions/35165](https://github.com/orgs/elementor/discussions/35165) (4.0 beta, 16 March 2026); …/35846 (4.1, 13 May 2026); [developers.elementor.com/elementor-editor-4-2-developers-update/](https://developers.elementor.com/elementor-editor-4-2-developers-update/) (24 June 2026); [github.com/orgs/elementor/discussions/37152](https://github.com/orgs/elementor/discussions/37152) (4.3 beta, 1 September 2026; release 22 September 2026); [elementor.com/help/motion-effects/](https://elementor.com/help/motion-effects/); [elementor.com/help/?p=26640](https://elementor.com/help/?p=26640) (custom breakpoints); [elementor.com/products/website-builder/v4-faq/](https://elementor.com/products/website-builder/v4-faq/) (all primary).
- **Bricks (BR):** [academy.bricksbuilder.io/article/keyboard-shortcuts/](https://academy.bricksbuilder.io/article/keyboard-shortcuts/); [bricksbuilder.io/release/bricks-2-0/](https://bricksbuilder.io/release/bricks-2-0/) (16 July 2025); …/bricks-2-1/ (9 October 2025); …/bricks-2-2/ (10 February 2026); …/bricks-2-3/ (18 March 2026); …/bricks-2-4/ (16 September 2026) (all primary).
- **Breakdance (BD):** [breakdance.com/documentation/builder/workflow/keyboard-shortcuts/](https://breakdance.com/documentation/builder/workflow/keyboard-shortcuts/) (extract; the direct page returned 404); [breakdance.com/meet-breakdance-2-6/](https://breakdance.com/meet-breakdance-2-6/) (November 2025); [breakdance.com/meet-breakdance-3-0/](https://breakdance.com/meet-breakdance-3-0/); [breakdance.com/releases/](https://breakdance.com/releases/) (all primary).
- **Divi 5 (DV):** [help.elegantthemes.com/en/articles/12992094](https://help.elegantthemes.com/en/articles/12992094) (shortcuts, 3 December 2025); …/13741079 (Command Center); [elegantthemes.com/blog/divi-resources/how-to-get-started-with-divi-5](https://elegantthemes.com/blog/divi-resources/how-to-get-started-with-divi-5) (27 February 2026); [help.elegantthemes.com/en/articles/9973580](https://help.elegantthemes.com/en/articles/9973580) (version log to 5.14, 28 September 2026) (all primary).
- **Oxygen 6 (OX):** [oxygenbuilder.com/oxygen-6-is-now-available/](https://oxygenbuilder.com/oxygen-6-is-now-available/) (24 February 2026); [oxygenbuilder.com/oxygen-6-2-is-now-available/](https://oxygenbuilder.com/oxygen-6-2-is-now-available/) (release candidate, 30 September 2026); shortcuts from a search extract of [oxygenbuilder.com/documentation/builder/workflow/keyboard-shortcuts/](https://oxygenbuilder.com/documentation/builder/workflow/keyboard-shortcuts/) (extract; the direct fetch returned 404) (all primary).
- **Figma Sites (FS):** [help.figma.com/hc/en-us/categories/31823555275671-Figma-Sites](https://help.figma.com/hc/en-us/categories/31823555275671-Figma-Sites); …/articles/31230436657815 (Explore); …/31242787286935 (design tools); …/31242843431575 (interactions); …/31433998164375 (AI tools); …/31242797809815 (breakpoints); …/31242774629655 (position); …/31242824747287 (preview); …/360040328653 (keyboard use); [figma.com/blog/config-2026-recap/](https://figma.com/blog/config-2026-recap/) (all primary).
- **Tilda (TI):** [blog-en.tilda.cc/tpost/f5romae4h1-tilda-shortcuts-cheat-sheet](https://blog-en.tilda.cc/tpost/f5romae4h1-tilda-shortcuts-cheat-sheet) (5 June 2025); [help.tilda.cc/zero](https://help.tilda.cc/zero); [help.tilda.cc/zero/advanced-animation](https://help.tilda.cc/zero/advanced-animation); [help.tilda.cc/zero-trigger-animation](https://help.tilda.cc/zero-trigger-animation); [blog-en.tilda.cc/tpost/ft6eigl8g1-tilda-year-in-review](https://blog-en.tilda.cc/tpost/ft6eigl8g1-tilda-year-in-review) (18 December 2025); [newsletter-en.tilda.cc/october-2024](https://newsletter-en.tilda.cc/october-2024) (all primary).
- **Readymag (RM):** [blog.readymag.com/12-time-savers-to-speed-up-your-workflow-in-readymag-b524df588574/](https://blog.readymag.com/12-time-savers-to-speed-up-your-workflow-in-readymag-b524df588574/) (2019); [blog.readymag.com/recent-readymag-updates-you-might-have-missed-5e9c1c41e45e/](https://blog.readymag.com/recent-readymag-updates-you-might-have-missed-5e9c1c41e45e/) (2020); [forum.readymag.com/t/introducing-readymag-editor-3-0/403](https://forum.readymag.com/t/introducing-readymag-editor-3-0/403) (2022); [forum.readymag.com/t/introducing-readymag-presets/1491](https://forum.readymag.com/t/introducing-readymag-presets/1491) (2023); [readymag.com/readymag/product-updates/oct18-2018](https://readymag.com/readymag/product-updates/oct18-2018); [blog.readymag.com/the-ultimate-guide-to-mobile-projects-in-readymag-58bd2525032c/](https://blog.readymag.com/the-ultimate-guide-to-mobile-projects-in-readymag-58bd2525032c/) (all primary).
- **Carrd (CA):** [carrd.com/docs/building/keyboard-shortcuts](https://carrd.com/docs/building/keyboard-shortcuts); …/basics; …/using-element-styles; …/using-variables; …/using-advanced-settings; …/using-section-view; [carrd.com/docs/building](https://carrd.com/docs/building) (index) (all primary).
- **Duda (DU):** [support.duda.co/hc/en-us/articles/26519260000279](https://support.duda.co/hc/en-us/articles/26519260000279) (Keyboard shortcuts, extract; the page returned 403); [duda.co/product-updates](https://duda.co/product-updates) (to 9 October 2026); [duda.co/product-updates/introducing-editor-2-0-design-with-more-flexibility-precision-performance](https://duda.co/product-updates/introducing-editor-2-0-design-with-more-flexibility-precision-performance) (18 September 2024); [duda.co/features/design-power](https://duda.co/features/design-power); [duda.co/product-updates/duda-monthly-wrap-up-april-2026](https://duda.co/product-updates/duda-monthly-wrap-up-april-2026); [duda.co/product-updates/from-prompt-to-published-meet-copilot-in-editor-2-0](https://duda.co/product-updates/from-prompt-to-published-meet-copilot-in-editor-2-0); [duda.co/features/seo-tools](https://duda.co/features/seo-tools) (all primary).
- **Hostinger (HO):** [hostinger.com/website-builder](https://hostinger.com/website-builder); [support.hostinger.com/en/articles/6463669-website-builder-how-to-organize-and-layer-website-elements](https://support.hostinger.com/en/articles/6463669-website-builder-how-to-organize-and-layer-website-elements); …/6618106-hostinger-website-builder-how-to-customize-the-website-s-style; [hostinger.com/support/6475658-website-builder-how-to-edit-the-mobile-version-of-a-website](https://hostinger.com/support/6475658-website-builder-how-to-edit-the-mobile-version-of-a-website) (all primary).
- **Shopify theme editor (SH):** [help.shopify.com/en/manual/productivity-tools/keyboard-shortcuts](https://help.shopify.com/en/manual/productivity-tools/keyboard-shortcuts); [changelog.shopify.com/posts/additional-keyboard-shortcuts-for-the-theme-editor](https://changelog.shopify.com/posts/additional-keyboard-shortcuts-for-the-theme-editor) (15 March 2024); [shopify.com/editions/summer2025](https://shopify.com/editions/summer2025); [shopify.com/news/summer-25-edition-design](https://shopify.com/news/summer-25-edition-design) (23 May 2025); [shopify.com/editions/winter2026](https://shopify.com/editions/winter2026); [help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor) (all primary); and, read 19 October 2026, the theme sections of the manual ([help.shopify.com/en/manual/online-store/themes](https://help.shopify.com/en/manual/online-store/themes)), the theme architecture and tools on [shopify.dev](https://shopify.dev/docs/storefronts/themes), the manual's [AI-powered tools](https://help.shopify.com/en/manual/ai-powered-tools) and [Launch Check](https://help.shopify.com/en/manual/intro-to-shopify/launch-check) articles, and the [Horizon listing](https://themes.shopify.com/themes/horizon) in the Theme Store (primary); Shopify publishes no list of Horizon's sections, so the element rows rest on the articles that name them.
- **Webstudio (WT):** [docs.webstudio.is/university/foundations/shortcuts](https://docs.webstudio.is/university/foundations/shortcuts); …/states-and-selectors; …/breakpoints.md; …/animations.md; …/copy-paste.md; …/share-links.md; …/reusability.md; [docs.webstudio.is/university/webstudio-ai.md](https://docs.webstudio.is/university/webstudio-ai.md); [docs.webstudio.is/llms.txt](https://docs.webstudio.is/llms.txt) (all primary).
- **Canva websites (CV):** [canva.com/help/designing-websites/](https://canva.com/help/designing-websites/); [canva.com/help/website-settings/](https://canva.com/help/website-settings/); [canva.com/help/navigation-canva-websites/](https://canva.com/help/navigation-canva-websites/); [canva.com/help/animate-designs/](https://canva.com/help/animate-designs/); [canva.com/help/keyboard-shortcuts/](https://canva.com/help/keyboard-shortcuts/) (all primary, extract).
- **Jimdo (JI):** [jimdo.com](https://jimdo.com); [help.jimdo.com/hc/en-us/articles/115005538666](https://help.jimdo.com/hc/en-us/articles/115005538666); …/360000779286; …/115005528346; …/115005522223 (all primary, extract).
- **Webnode (WN):** [webnode.com/support/basic-editor-control/](https://webnode.com/support/basic-editor-control/) (about December 2024); [webnode.com/features/](https://webnode.com/features/); [webnode.com/support/editor-and-content-faq/](https://webnode.com/support/editor-and-content-faq/) (all primary).
- **Strikingly (ST):** [support.strikingly.com/hc/en-us/articles/360000010502](https://support.strikingly.com/hc/en-us/articles/360000010502); …/115000130021; …/115000096702; …/215046457; …/360000311741; [strikingly.com/content/blog/show-hide-mobile-view/](https://strikingly.com/content/blog/show-hide-mobile-view/) (all primary, extract).

**Other sources cited in this part:**
- Vipps Checkout ends 30 April 2027: [kustom.co FAQ](https://www.kustom.co/kustom-vipps-faq) (primary, read 11 October 2026).
- The Wix WebMCP app: [dev.wix.com](https://dev.wix.com/docs/develop-websites/articles/get-started/ai-agents/about-the-wix-web-mcp) (primary), from the hosted-builders pass of 11 October 2026.
- WordPress 6.9 block notes: [wpbeginner](https://www.wpbeginner.com/news/whats-new-in-wordpress-6-9/) (secondary).
- Universal design duties for associations: [Uutilsynet](https://www.uutilsynet.no/regelverk/regelverk-og-krav/746) (primary).
