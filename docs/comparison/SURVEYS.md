# Surveys: the dated studies behind Urd's decisions

These are the surveys the ADRs and milestones cite: the layout, navigation and sizing decisions in [ADR-0018](../adr/0018-bound-content-width.md), [ADR-0019](../adr/0019-synced-mobile-model.md), [ADR-0023](../adr/0023-navigation-bar-sizing.md), [ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md) and [ADR-0025](../adr/0025-the-sizing-model.md), and the element review of milestone 0.7.13 in [BACKLOG.md](../BACKLOG.md). Each survey is kept as written on its date, with its own sources: what the builders did then, the rules drawn from it, and the «What Urd takes» line that records what was decided then. A survey is not rewritten when a builder changes or a decision moves on; the ADR it names holds the decision in force. The current picture of the field is in [FEATURES.md](FEATURES.md), [ELEMENTS.md](ELEMENTS.md), [DESIGN.md](DESIGN.md) and [CODE.md](CODE.md).

| Survey | Date | Decided in |
|---|---|---|
| [The preview canvas](#the-preview-canvas-27-july-2026) | 27 July 2026 | ADR-0018 (0.7.2) |
| [The desktop canvas](#the-desktop-canvas-own-window-or-a-fixed-editing-size-16-september-2026) | 16 September 2026 | ADR-0018 (0.7.2.6 and 0.7.2.7) |
| [The navigation bar](#the-navigation-bar-what-the-builders-offer-for-its-size-16-september-2026) | 16 September 2026 | ADR-0023 (0.7.15) |
| [The element review](#the-element-review-apeironlf-and-the-builders-backgrounds-22-september-2026) | 22 September 2026 | Milestones 0.7.13 and 0.7.16 |
| [Scaling below the design width](#scaling-below-the-design-width-23-september-2026) | 23 September 2026 | ADR-0018, ADR-0024 (0.7.17) |
| [Content that grows must push](#content-that-grows-must-push-23-september-2026) | 23 September 2026 | ADR-0024 (0.7.17.3) |
| [What a drag means](#what-a-drag-means-how-the-builders-size-an-element-3-october-2026) | 3 October 2026 | ADR-0025 (0.7.21) |

## The preview canvas (27 July 2026)

How the others show the page: reflow, scaling or a fixed width. The editor canvas has a different aspect ratio from the window (the panels take width, the top bar takes height), so a full-width page cannot both FILL the canvas AND show exactly the same «fold» as a visitor. Mapped from primary sources (read directly, not from search summaries):

- **Gutenberg/WordPress - the iframe IS the viewport (reflow):** the canvas is an iframe where `vw`/`vh`/`@media` resolve against the canvas, not the admin page («Now that `100vw` resolves against the *canvas* instead of the admin page, there's no sidebar to subtract», [Gutenberg Times](https://gutenbergtimes.com/the-post-editor-is-going-full-iframe-what-block-developers-need-to-know-before-wordpress-7-1/), [developer.wordpress.org](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-api-versions/block-migration-for-iframe-editor-compatibility/)). `transform: scale()` is used only in a separate zoom-out mode (50 %, desktop only) for an overview ([PR #58202](https://github.com/WordPress/gutenberg/pull/58202)).
- **Shopify - a live storefront iframe:** the preview is a live iframe of the store; «collapse the sidebar for full width» + separate desktop/mobile buttons ([Shopify Help](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor/features-overview)). The docs page confirms WHAT, not the mechanism; the model points to reflow to the available width.
- **Wix - a fixed design width:** classic Wix locks the content to 980px whatever the browser width; Wix Studio uses `px*` relative to the editing size + a max width (default 1600px) with side margins on wider screens ([Wix Help](https://support.wix.com/en/article/studio-editor-setting-the-sites-max-width)).
- **Squarespace/Fluid Engine - a grid canvas:** a 24-column grid (desktop) / 8 (mobile), blocks as grid coordinates, pure CSS grid at run time; separate live device views for mobile vs. desktop ([Squarespace Help](https://support.squarespace.com/hc/en-us/articles/6421525446541-Edit-your-site-with-Fluid-Engine)).
- **Simple tutorials (width-driven «fill») = Urd's then-current algorithm, unsolved:** Max Schmitt (`scale = container/breakpoint`, `iframeH = container/scale`, top-left, fills, no letterbox, [maxschmitt.me](https://maxschmitt.me/posts/iframe-react-responsive-website-tester)) and baraa.app (`scale = containerWidth/iframeWidth`, [baraa.app](https://www.baraa.app/blog/dynamic-viewports-in-iframes)) HAVE the fold mismatch, but do not mention it.
- **A fixed viewport + fit on both axes + letterbox (those that get the fold right):** mudosdigital (`scale = Math.min(1, wrapperW/width, wrapperH/height)`, an iframe of fixed width AND height, letterbox on a mismatch, [mudosdigital](https://mudosdigital.com/css-transform-origin-and-scale-with-responsive-preview-containers/)); Chrome DevTools device mode (a simulated viewport with a defined width AND height, [developer.chrome.com](https://developer.chrome.com/docs/devtools/device-mode)); Figma confirms that a 100vh section cannot be right both in the design and in the preview ([Figma forum](https://forum.figma.com/suggest-a-feature-11/viewport-height-option-on-frames-36753)).

**Historical note (the survey of 27 July 2026):** the core insight was that none of the four big builders renders at one width and scales to another for ordinary editing; they make the canvas the viewport (reflow) or use a fixed design width. The root cause on Urd's side was that `frameToCss` in `engine/render.js` put `left`/`width` in percent and `top`/`height` in pixels, so the layout was not width-invariant. The answer became the bound content width in [ADR-0018](../adr/0018-bound-content-width.md) (`.urd-canvas` binds the content to `site.layout.contentWidth`, default 1440, `frameToCss` unchanged). The rest of the question is mapped in the three surveys below: [the desktop canvas](#the-desktop-canvas-own-window-or-a-fixed-editing-size-16-september-2026) (16 September 2026, the [ADR-0018 addendum](../adr/amended/0018-bound-content-width-until-2026-10-11.md#addendum-the-screen-device-follows-the-owners-own-window-or-an-editing-size-16-september-2026) on own window or editing size), [the scaling below the design width](#scaling-below-the-design-width-23-september-2026) (23 September 2026, the [ADR-0018 addendum](../adr/amended/0018-bound-content-width-until-2026-10-11.md#addendum-proportional-scaling-below-the-design-width-with-zoom-23-september-2026) on `zoom` down to a floor) and [content that grows](#content-that-grows-must-push-23-september-2026) (23 September 2026, ADR-0024).

## The desktop canvas: own window or a fixed editing size (16 September 2026)

A second pass over twelve builders, this time on how the DESKTOP canvas gets its width and whether the height (the fold) is ever pinned:

- **Squarespace:** device view toggle (desktop/tablet/mobile); no width control, the live site renders in the admin frame at whatever width is left; the help page says the view is «not 100% accurate for every phone or tablet» ([Device view](https://support.squarespace.com/hc/en-us/articles/206545667-Device-view)).
- **Wix classic:** the page is fixed at 980 px inside the gridlines, no zoom ([Editor gridlines](https://support.wix.com/en/article/wix-editor-working-with-the-editor-gridlines)).
- **Wix Studio:** a user-settable, persisted «Editing Size» per breakpoint, default 1280 px for desktop, plus a site max width (default 1600 px) and +/- zoom ([Setting your editing size](https://support.wix.com/en/article/studio-editor-setting-your-editing-size), [Setting the site's max width](https://support.wix.com/en/article/studio-editor-setting-the-sites-max-width)). Known defect: fit-to-screen sections do not scale with the zoom ([Enhanced zoom request](https://support.wix.com/en/article/studio-editor-request-enhanced-zoom-functionality)).
- **Webflow:** the canvas width derives from the designer's own window minus the panels (the canvas bar shows it), overridable with a Width field and a Scale control ([Canvas settings](https://help.webflow.com/hc/en-us/articles/33961230930579-Canvas-settings)); the canvas HEIGHT is the browser window's, which a wishlist item calls «very inaccurate and misleading» for vh ([WEBFLOW-I-103](https://wishlist.webflow.com/ideas/WEBFLOW-I-103)).
- **Framer:** fixed-width breakpoint frames on an infinite zoomable canvas; the frame width IS the breakpoint's minimum viewport width ([Creating breakpoints](https://www.framer.com/academy/lessons/framer-fundamentals-breakpoints)); a «viewport line» can be resized on the canvas but never affects the published layout.
- **Shopify theme editor:** desktop/mobile/fullscreen toggles, no widths, the preview fills what the sidebars leave ([Theme editor features](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor/features-overview)).
- **Gutenberg:** desktop/tablet (780 px)/mobile (360 px) previews; the resizable editor makes «canvas width in pixels the single source of truth», a real resize with drag handles, not a scale ([PR #75121](https://github.com/WordPress/gutenberg/pull/75121)).
- **Elementor:** desktop >1024, tablet 1024, mobile 767; responsive mode adds drag handles left, right and BOTTOM ([Responsive editing](https://elementor.com/help/responsive-editing/)).
- **Bricks:** W, H and Scale (%) fields next to the breakpoint icons, the only builder with an explicit canvas height ([Responsive editing](https://academy.bricksbuilder.io/article/responsive-editing/)).
- **Carrd:** mobile view is cropped by default, «Switch to Expanded View» uncrops it to the window height, the one builder that ships the crop/fill choice as a toggle ([Using Mobile View](https://carrd.com/docs/building/using-mobile-view)).
- **GrapesJS:** per device `width` (drawn) and `widthMedia` (claimed) are separate, desktop width empty = the panel, `height` unset ([device_manager config](https://raw.githubusercontent.com/GrapesJS/grapesjs/dev/packages/core/src/device_manager/config/config.ts)).
- **Figma Sites:** breakpoints 1280/800/375 on the Figma canvas; the preview window takes an explicit width AND height plus a scale percentage ([Preview a webpage or site](https://help.figma.com/hc/en-us/articles/31242824747287-Preview-a-webpage-or-site)).

**Two rules from the survey:** a fixed canvas width always comes with a zoom control (Wix Studio, Webflow, Bricks, Framer, Figma; Wix classic is the exception and the oldest design), and nobody pins the viewport height to a device or letterboxes; Bricks' H field and Carrd's toggle are the only prior art, Webflow's wishlist the complaint.

**What Urd takes (0.7.2.6 and 0.7.2.7):** the Screen device follows the owner's own browser window width by default (the majority model, measured on the whole window rather than the panel remainder that trips Webflow users, and on the window rather than the monitor, since the published page is compared in that window), an explicit editing size with the existing zoom as the opt-in Wix Studio model, and a height only as part of that editing size. Reference 1920 keeps the earlier fixed canvas. See the [ADR-0018 addendum](../adr/amended/0018-bound-content-width-until-2026-10-11.md#addendum-the-screen-device-follows-the-owners-own-window-or-an-editing-size-16-september-2026) (its decision now stands among the consequences of [ADR-0018](../adr/0018-bound-content-width.md)).

## The navigation bar: what the builders offer for its size (16 September 2026)

A third pass over the builders, this time on what controls the navigation bar's SIZE: its thickness, its width, the logo size, the compact state on scroll and the mobile view, from their own help pages:

- **Squarespace 7.1:** the site header editor has layout presets; width «Full» or «Inset» (the header contents follow the page's content width); a Height slider; an Element spacing slider; Logo height plus a separate Mobile logo height and mobile logo; a mobile view with its own layout, height and width; Fixed position «Basic» (always) or «Scroll back» (appears on scroll up); backgrounds Solid/Gradient/Adaptive (transparent) with blur; drop shadow Soft/Strong with spread, distance and blur; border S/M/L or a custom thickness with position all/top/bottom/top and bottom; menu icon thickness S/M/L ([Building a site header](https://support.squarespace.com/hc/en-us/articles/360000667707-Building-a-site-header), [Big Cat Creative walkthrough](https://www.bigcatcreative.com/blog/header-navigation-squarespace-fluid-engine)).
- **Wix classic:** the header height is a drag handle; scroll effects «Scrolls with site», «Freezes», «Disappears»; the site is 980 px wide ([Customizing your site header](https://support.wix.com/en/article/wix-editor-customizing-your-site-header), [Fixing your menu to the top](https://support.wix.com/en/article/wix-editor-fixing-your-menu-to-the-top-of-your-site)); a header that shrinks on scroll is documented as not possible ([feature request](https://support.wix.com/en/article/wix-editor-request-creating-a-header-that-shrinks-as-you-scroll-down)).
- **Wix Studio:** header height by drag handle or the Inspector's exact width and height, padding per side, stretch to full width or the site max width (default 1600); scroll effects «Scroll with site», «Freeze», «Disappear», «Fade out», advanced position Pinned or Sticky, overlap the next section or not, a top offset, and «Color while scrolling» (the background changes once scrolled) ([Adding header scroll effects](https://support.wix.com/en/article/studio-editor-adding-header-scroll-effects), [Setting the size of your elements](https://support.wix.com/en/article/studio-editor-setting-the-size-of-your-elements), [Setting the site's max width](https://support.wix.com/en/article/studio-editor-setting-the-sites-max-width)).
- **Webflow:** the Navbar has no preset width or height; the height is the content plus the padding set on the navbar or on the nav links, the width 100 % or constrained by a container with auto margins; sticky via the position panel; show and hide on scroll via interactions; the menu button collapses at a chosen breakpoint with easing and duration ([Navbar](https://help.webflow.com/hc/en-us/articles/33961304628627-Navbar), [Navbar menu button](https://help.webflow.com/hc/en-us/articles/33961330610579-Navbar-menu-button), [Show and hide navigation bar on scroll](https://help.webflow.com/hc/en-us/articles/33961261877523-Show-and-hide-navigation-bar-on-scroll)).
- **Shopify (Dawn):** header section `padding_top`/`padding_bottom` 0-36 px in steps of 4 (default 20), `margin_bottom` 0-100, logo position, `menu_type_desktop` dropdown/mega/drawer, `sticky_header_type` none / on-scroll-up / always / always-reduce-logo-size, a separator line toggle; the global `logo_width` 50-300 px in steps of 10 (default 100) and `page_width` 1000-1600 (default 1200) ([header.liquid](https://github.com/Shopify/dawn/blob/main/sections/header.liquid), [settings_schema.json](https://github.com/Shopify/dawn/blob/main/config/settings_schema.json)).
- **Elementor (Menu and Nav Menu widgets):** layout horizontal/vertical/dropdown, align left/center/right/stretch, horizontal and vertical item padding in px or em, space between items, full-width dropdown yes/no, mobile breakpoint mobile/tablet/none, toggle button and its alignment; sticky is a separate section or plugin setting ([Nav Menu widget](https://elementor.com/help/nav-menu-widget-pro/), [Menu widget](https://elementor.com/help/the-menu-widget/)).
- **WordPress block themes:** the header is a Group block: content width, wide or full alignment, padding and block spacing in the layout panel, sticky position on the group ([Change the width of a block](https://wordpress.com/support/wordpress-editor/change-the-width-of-a-block/), [How to create a sticky header](https://fullsiteediting.com/site-creators/how-to-create-a-sticky-header/)).
- **Framer:** the nav is an ordinary layout stack: padding and a fixed or fill width, fixed or sticky position, and scroll variants (a full size and a compact variant switched by a scroll transition) ([DiverseKit sticky header tutorial](https://diversekit.com/blog/framer-sticky-header)).
- **Duda and GoDaddy:** Duda has a sticky toggle plus a separate «Shrinking header» with its own logo size, background colour and spacing ([Headers](https://support.duda.co/hc/en-us/articles/26519231683223-Headers), [Shrink your site header](https://www.duda.co/product-updates/shrink-your-site-header)); GoDaddy has the same «Shrinking header» concept and caps the logo at 104 px ([Add my logo](https://www.godaddy.com/help/add-my-logo-to-my-website-header-24711)).
- **Hostinger:** the header height is the top and bottom padding in the layout settings, a transparent header inherits the section below, sticky settings ([How to style the header section](https://www.hostinger.com/support/10456392-hostinger-website-builder-how-to-style-the-header-section/), [How to edit the header section](https://www.hostinger.com/support/6463972-hostinger-website-builder-how-to-edit-the-header-section/)).
- **Carrd:** no sticky toggle at all, only a CSS snippet ([bitdoze tutorial](https://www.bitdoze.com/add-stickey-header-carrd/)).

**Five rules from the survey:**
1. Thickness is padding everywhere (Webflow, Shopify, Hostinger, Elementor, Framer, Wix Studio's padding); Squarespace's «Height» slider and Wix's drag handle are the same value with a different handle. Nobody sets a fixed bar height that the content must fit into.
2. Width is a two-way choice, full-bleed or bound to the page's content width (Squarespace Full/Inset, WordPress content/wide/full, Wix Studio stretch or max width, Webflow's container), with the background always full-bleed.
3. The logo has its own size and, at Squarespace and in Shopify's reduce-logo mode, a second mobile or compact size.
4. Compact-on-scroll states are configurable in themselves (Duda's shrinking header spacing and logo, Shopify's reduce logo, Framer's compact variant); the transparent-to-solid colour while scrolling is a separate feature (Wix Studio, common at Squarespace and Webflow as custom code).
5. Mobile gets its own thickness and logo size (Squarespace), and the collapse breakpoint is a setting (Elementor, Webflow); Urd already has `breakpoints.mobile`.

**What Urd takes (0.7.15):** thickness is padding: the four presets stay as the quick choice and free px values for the vertical padding and the text size override them. Width is full-bleed or bound to the content width of ADR-0018, with the background always full-bleed, and the floating menu gets a width of its own (a px value or the content width). The logo gets a mobile size, the compact state gets its own shrink factor and an optional logo shrink, and mobile gets its own thickness and text size. Every override is chosen by the engine at render time (`nav.js`), never by CSS class rules. Border and shadow presets are the last stage of the milestone (C18 in [FEATURES.md](FEATURES.md)). See ADR-0023.

## The element review: ApeironLF and the builders' backgrounds (22 September 2026)

The review behind milestone 0.7.13: ApeironLF read from its source, every page and every admin module ([github.com/Apeiron-Linjeforening/ApeironLF](https://github.com/Apeiron-Linjeforening/ApeironLF)), and a search on what the builders offer as section backgrounds, both held against Urd's element list.

**ApeironLF, the site Urd must be able to recreate (the v1.0 gate):**
- Site-wide: a fixed nav that is transparent at the top and gets a dark surface, blur, a gold hairline and tighter padding after 40 px of scrolling; the burger appears only when the links overflow (measured, like Urd's fold); dropdowns, a paper/marine colour toggle stored per visitor, a search button. A full-screen mobile drawer that slides down from the top with collapsible sections, scroll lock, Escape and link click to close. A site search (Cmd/Ctrl+K over a generated index, a vendor library). A text marquee «frise» (a 38 s loop, pause on hover, removed under reduced motion). A subhero on every subpage (seal, back link, title, lead). Reveal animations with stagger, count-up numbers, an FAQ accordion, a «report an error» dialog, a centred footer (name, tagline, link row, social icons, fine print). A `?preview=1` postMessage preview, JSON-LD, sitemap and robots.
- The front page: a hero (wordmark in three parts, eyebrow, tag, lead, two CTAs, bridge links, seal) with a hero gallery in four admin styles: A a rolling band (two looping tracks, lightbox), B a mosaic (a 4-column grid with 2x2 and 2x1 cells), C polaroids (random tilt, framed or clean), D floating photos (random positions, drift, Ken Burns or crossfade), with count, opacity, speed, direction and nav clip; an «Akkurat nå» card (the 1-3 next events merged from three calendars with dedupe, the rest under «Senere», the logo as the empty state); the marquee; a noticeboard teaser; events in list, grid and month views with category filters and subscribe links; a two-column card with an aside; a multi-day programme (week picker, accordion, overview); membership tiers with steps; contact with an FAQ. The section order is dragged in admin.
- The subpages: an about page built from data with an «På denne siden» index and a tone per section (auto, paper, navy, accent, with a rhythm warning); news cards with kicker, place, date, an urgent flag and an archived state; a noticeboard of poster cards with pin, 3:4 image, date, note and accent, archived ones in greyscale; a board page with member cards (portrait, initials, role, tags), role cards and an archive teaser; earlier boards behind period chips (all, the newest two, decades expanding to years); merch with an order band, product cards (colour-linked images, size and colour, member price, badge presets with glow, edge-glow animations) and a cart drawer; a gallery of image marquee, event cards, grid and lightbox fed from Google Drive folders; a publication page with a cover fan, count-up statistics, podcast and film cards and a print/digital toggle; a curriculum with tabs, search, a count and fold-all over course accordions; help with quick-nav cards, collapsible role cards and emergency numbers; a new-student page with numbered steps; awards and honours with year chips and recipient cards.
- Admin: one shell with the unpublished count, undo all, GitHub publish with history and revert, and settings (sidebar or tabs, list plus detail or classic panels, three admin themes, a docked or overlay preview with a device switch); a dashboard with a three-step guide and shared shortcuts stored in git; drafts in localStorage with a baseline, drag sorting, help bubbles, an undo stack, link validation with a page and section picker, images in IndexedDB with an image editor (rotate, flip, zoom, pan, aspect presets, brightness, contrast, saturation, webp with a KB budget per use); 18 modules, one content file each, all with a live preview.

**Backgrounds at the builders (search 22 September 2026):**
- **Wix:** colour, gradient and fluid gradient, image, video with a colour or gradient overlay, pattern overlays; scroll effects parallax, reveal, zoom-in, fade-in and 3D ([Studio section background](https://support.wix.com/en/article/studio-editor-changing-and-customizing-the-background-of-a-section), [scroll effects](https://support.wix.com/en/article/wix-editor-adding-scroll-effects-to-image-backgrounds)).
- **Squarespace 7.1:** image, video, gradient, and «background art»: animated patterns with shapes, sizes, motion and texture in four colours, WebGL only ([Section background art](https://support.squarespace.com/hc/en-us/articles/4424780922509-Section-background-art), [background videos](https://support.squarespace.com/hc/en-us/articles/218562738-Adding-background-videos)).
- **Elementor:** classic, gradient, video (YouTube, Vimeo or self-hosted with start, end and play once), a slideshow with duration, transition and Ken Burns in or out; an overlay gradient with blend modes; shape dividers top and bottom with size, flip, invert and per breakpoint ([background slideshow](https://elementor.com/help/background-slideshow/), [section background video](https://elementor.com/help/section-background-video-options/), [shape divider](https://elementor.com/blog/v130-shape-divider/)).
- **Divi:** colour, a gradient builder, image with parallax and 16 blend modes, mp4/webm video, 24 patterns (flip, rotate, invert, colour) and masks, all layerable ([background options](https://www.elegantthemes.com/documentation/divi/background-options/), [masks and patterns](https://www.elegantthemes.com/blog/theme-releases/background-masks-and-patterns)).
- **Webflow:** colour, gradient, image, video and stacked layers; Lottie and Spline for animated or 3D backgrounds ([Background styles](https://help.webflow.com/hc/en-us/articles/33961278898323-Background-styles)).
- **Framer (marketplace):** WebGL shader backgrounds, grainy mesh gradients (CSS and SVG), particles, animated noise, liquid and halo gradients ([Backgrounds category](https://www.framer.com/marketplace/components/categories/backgrounds/), [Grainy Mesh Gradient](https://www.framer.com/marketplace/components/grainy-mesh-gradient/)).

**Five rules from the survey:**
1. Everyone layers colour, gradient, image and video; Urd has all four plus glow, grain and slideshow.
2. Motion on an image is standard: parallax (Urd has it), Ken Burns (Elementor's slideshow, ApeironLF's hero) and scroll zoom or reveal (Wix).
3. Patterns as a layer (Divi's 24, Wix's overlays, Squarespace's art) are cheap as inline SVG tiles.
4. Shape dividers between sections (Elementor, Divi) are the one section-edge element Urd lacks.
5. WebGL art, Lottie and Spline are dependencies or GPU-only and stay out of scope; Urd's answer is the glow, gradient and grain layers.

**What Urd had on 22 September 2026:** 19 core blocks, 30 core section presets, eight footer designs, seven background layers (colour, gradient, glow, grain, image, slideshow, video), a gallery with grid, carousel and slides, the calendar block's list, cards, month and next views (a plugin block then), count-up statistics and a cart button in the nav; no content marquee, no pattern layer, no section dividers, an embed-only video block, every upload re-encoded to webp, and no archiving.

**What Urd takes (0.7.13 and 0.7.16):** the ApeironLF patterns become the stages of 0.7.13: the nav surface transparent at the top, rounding as a value and the underline seam (0.7.13.3), the full-screen mobile menu as a `<dialog>` (0.7.13.4), the announcement bar and tool placement (0.7.13.5), the link launcher (0.7.13.6), the ribbon block and the image ribbon view (0.7.13.7), background motion and a photos layer for the hero styles (0.7.13.8), mosaic and polaroid gallery views (0.7.13.9), the pattern layer and shape dividers from the survey (0.7.13.10), styled variants of stats, quote, faq and the line shape plus two footers (0.7.13.11), animated images and self-hosted video as content (0.7.13.12), the «Coming up» card (ApeironLF's «Akkurat nå») and a visible empty state in the calendar (0.7.13.13), back to top as an element (0.7.13.14), the nav in the hero (0.7.13.15) and the page index block (0.7.13.16). The calendar block already covers the three event views. Archiving, entry states, collection filters, the people kind and section hide are the milestone 0.7.16 with its own survey and ADR (0.7.16.1). Sorted elsewhere: the accordion view, the auto tone and the badge glow presets to 0.7.9, the admin layout choices to 0.7.10, the programme view, events as a collection kind and the image editor to v0.8; site search stays out of scope (a vendor library), with the catalogue search as the nearest plan.

## Scaling below the design width (23 September 2026)

A fourth pass, on the band between the design width and the phone: what a builder does with a composition laid out at the design width when the window is narrower, and which controls the site owner gets. Urd's desktop layout is absolute frames on a bound canvas (ADR-0018), so the absolute-positioned builders are the closest prior art:

- **Tilda Zero Block:** a 1200 px Grid container centred in a Window container; the artboard setting «Scale Grid Container: Autoscale to Window Width» scales every element attached to the grid proportionally to the window width, positions, sizes and text alike, and the block height follows; elements attached to the Window container keep fixed distances; up to ten breakpoints between 320 and 1920 px with their own layouts. The control is one toggle per block plus per-element grid-or-window attachment and px-or-percent units ([Zero Block responsive design](https://help.tilda.cc/zero/advanced), [Autoscale](https://tilda.cc/en/answers/a/autoscale/), [custom breakpoints](https://blog-en.tilda.cc/custom-breakpoints)).
- **Readymag:** «Scale Layout» scales the whole desktop layout to the screen width, with «Limit scale at» (1024 to 8400 px) as the ceiling; the tablet and mobile layouts are separate and never scaled. Users report that the text scales too and becomes tiny, and ask for fixed or min-max font sizes, which do not exist ([Scale Layout](https://help.readymag.com/hc/en-us/articles/360053256071-Scale-Layout), [forum thread on fixed font size](https://forum.readymag.com/t/fixed-font-size-with-scale-layout-on/2921)).
- **Wix Studio:** a per-element «Responsive behavior»: Scale proportionally (the default, keeps the aspect ratio across screens), Relative width, Fixed, Stretch, Hug, and for text also Wrap (the font size stays, the text wraps) and the fluid unit `px*` («relative to the page's editing size»); text scales in proportion to the screen by default with a «Max-min» font size, and a «Scale properties» toggle in the Inspector; breakpoints at 1001 and 750 px with a downward cascade. Troubleshooting points to docking, Max-min, Stack and the responsive behaviours ([Setting the size of your elements](https://support.wix.com/en/article/studio-editor-setting-the-size-of-your-elements), [Troubleshooting responsiveness issues](https://support.wix.com/en/article/studio-editor-troubleshooting-responsiveness-issues), [Fix text scaling](https://www.wix.com/studio/academy/tutorials/fix-text-scaling)).
- **Squarespace Fluid Engine:** a 24-column grid whose columns scale with the viewport, and rows of `minmax(var(--row-height), auto)` that grow when text wraps and push the rows below down; a separate 8-column mobile grid under 750 px; the fonts in Site Styles scale between a minimum and a maximum with the browser width, controlled by «Scale Text». The known pain is the «tablet spacing problem» between 750 px and the desktop, where intrinsically sized text blocks keep their mobile row count and leave empty space, fixed only with custom CSS ([Developing Fluid Engine](https://engineering.squarespace.com/blog/2022/developing-fluid-engine), [Responsive design](https://support.squarespace.com/hc/en-us/articles/115003287447-Responsive-design), [Scaling fonts](https://support.squarespace.com/hc/en-us/articles/227975587-Scaling-fonts-in-version-7-0), [the tablet spacing problem](https://www.will-myers.com/articles/fixing-the-tablet-spacing-problem-in-squarespace-fluid-engine)).
- **Duda:** text scales with the parent container's width when enabled (desktop 100 %, tablet 85 %, mobile 80 %), inherited from the theme and overridable per widget; a «Responsive Desktop/Tablet» toggle in Site Layout; three breakpoints with inherit and override ([Site Theme](https://support.duda.co/hc/en-us/articles/26519231815063-Site-Theme), [Responsive Layout](https://www.duda.co/product-updates/responsive-layout)).
- **Webflow, Framer, Elementor and Figma Sites** (flow layouts): no proportional scaling; breakpoints with a cascade (Framer 1200/810/390, Elementor tablet 1024 and mobile 767 plus custom ones, Figma Sites a primary and secondary breakpoints with Fill, Fixed and min/max), and fluid typography with `clamp(min, vw + rem, max)` as the recommended practice, with the accessibility note that a `vw` term alone ignores browser zoom ([Framer breakpoints](https://www.framer.com/academy/lessons/framer-fundamentals-breakpoints), [clamp in Webflow](https://www.flowvibe.studio/blog/how-to-use-css-clamp-in-webflow-for-perfect-responsive-typography), [clamp in Elementor](https://www.mcneece.com/2025/03/mastering-global-fonts-in-elementor-the-ultimate-guide-to-fluid-fonts-with-clamp/), [Figma Sites responsive tips](https://help.figma.com/hc/en-us/articles/33257143505175-Tips-for-creating-a-responsive-webpage-in-Figma-Sites)).
- **Hostinger, Canva and Carrd:** Hostinger stretches or shrinks the content per device with a manual mobile view, and its newer Horizons builder offers per-element scale, wrap or fixed; Canva shrinks overlapping elements and separates ungrouped ones on mobile; Carrd sizes everything in rem from one root, so one root change scales the site ([Hostinger responsive design](https://www.hostinger.com/support/6466243-hostinger-website-builder-responsive-web-design-and-image-size/), [Canva mobile view](https://www.canva.com/help/responsive-website-issues/), [Carrd responsive tutorial](https://www.nocodementor.io/tutorials/making-your-carrd-site-responsive)).
- **The platform:** CSS `zoom` is Baseline 2024 (Firefox 126, May 2024); it affects layout, so siblings and the document flow follow (unlike `transform`), and it is not among the properties that create a containing block for fixed descendants. `Element.currentCSSZoom` (baseline since March 2026) gives the effective factor for converting `offset*` values, while `getBoundingClientRect` already includes it; viewport units are not scaled by zoom. WCAG 1.4.4 (text resized to 200 %) and 1.4.10 (reflow at 320 px) hold as long as browser zoom still multiplies in and the phone layout reflows ([MDN: zoom](https://developer.mozilla.org/en-US/docs/Web/CSS/zoom), [MDN: currentCSSZoom](https://developer.mozilla.org/en-US/docs/Web/API/Element/currentCSSZoom), [OddBird: Zoom, zoom, and zoom](https://www.oddbird.net/2024/07/09/zoomies/), [WCAG: Understanding reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).

**Five rules from the survey:**
1. The absolute-positioned builders (Tilda, Readymag, Wix Studio) scale the whole composition proportionally below the design width; the flow builders (Webflow, Framer, Elementor, Figma) use breakpoints plus fluid type. Urd's desktop layout is absolute, so it belongs to the first family.
2. Everyone who scales proportionally scales the text along, and every one of them then needs a floor: Readymag's «Limit scale at», Wix's «Max-min», Duda's 85 and 80 %. Without a floor the text is unreadable at tablet width.
3. The floor is always paired with a hand-off: below it the layout is a different one (Readymag's tablet layout, Wix's next breakpoint, Squarespace's 8-column mobile grid).
4. Squarespace's growing rows are the only model that also solves content-driven overflow at the design width itself; it costs a grid-coordinate frame model, which ADR-0018 already says needs its own ADR.
5. The user control is one global toggle plus one number (Tilda's toggle, Readymag's limit, Wix's min-max); per-element exceptions (Wix Fixed, Tilda's window container) come later and are rarely needed.

**What Urd takes (0.7.17):** the proportional page scaling of the absolute-positioned builders was built as the [ADR-0018 addendum of 23 September 2026](../adr/amended/0018-bound-content-width-until-2026-10-11.md#addendum-proportional-scaling-below-the-design-width-with-zoom-23-september-2026) (CSS `zoom` on the sections between the binding width and a floor, a mode and a smallest scale as the owner's control) and withdrawn the same day after testing: a page that only gets smaller adapts nothing, which is rule 3's cost in practice. Urd keeps the fluid canvas below the binding width and answers the width per block instead: the content push of the second survey below (ADR-0024) and a shrink-instead-of-wrap choice on every block that can wrap (the Framer «Fit Text» model, ADR-0024 decision 6). `transform` stays forbidden on the canvas.

## Content that grows must push (23 September 2026)

The same day's second pass, on the actual symptom: a paragraph that wraps to more lines draws over the button beneath it, because Urd's desktop blocks are absolutely positioned pixel frames that reserve no space in the flow.

- **Squarespace Fluid Engine:** blocks are grid coordinates on a CSS grid with `grid-template-rows: repeat(var(--num-rows), minmax(var(--row-height), auto))`; a row stretches to its content and pushes every row below; the editor removes the row stretch at drag start; no script repositions blocks on the visitor site; a 1000-row limit per section ([Developing Fluid Engine](https://engineering.squarespace.com/blog/2022/developing-fluid-engine), [Edit your site with Fluid Engine](https://support.squarespace.com/hc/en-us/articles/6421525446541-Edit-your-site-with-Fluid-Engine)).
- **Wix Editor (the classic free canvas):** absolute positions plus a published push algorithm: only vertical position and size count; a gap of 70 px or less is preserved (the lower element moves the whole growth), a larger gap stays until it would fall under 10 px; an element whose top is above the grown element's vertical middle is a deliberate overlap and stays; containers expand from the bottom; the move cascades down the chain ([About element size changes and page layout](https://dev.wix.com/docs/develop-websites-sdk/code-your-site/build-a-custom-frontend/page-elements/about-element-size-changes-and-page-layout), [Fixing spacing and alignment issues](https://support.wix.com/en/article/wix-editor-fixing-spacing-and-alignment-issues-on-your-site)).
- **Wix Studio, Framer, Figma Sites, Tilda:** stacks and auto layout, where children are relatively positioned and «Hug» or «fit content» heights push their siblings; absolute positioning is the documented escape hatch that leaves the flow ([Stacking elements](https://support.wix.com/en/article/studio-editor-stacking-elements), [Framer stacks](https://www.framer.com/academy/lessons/framer-fundamentals-stacks-and-relative-positioning), [Figma auto layout](https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout), [Tilda Zero Block](https://help.tilda.cc/zero)).
- **The CSS grid spec:** an item spanning several intrinsic tracks distributes its extra size across them, and several items in the same tracks each contribute, the track taking the largest ([track sizing](https://www.w3.org/TR/css-grid-1/#algo-spanning-items)).

- **Shrink instead of wrap, the owner's other option:** Wix Studio scales text with «Scale proportionally» and a «Max-min» font size that cascades down the breakpoints ([Fix text scaling](https://www.wix.com/studio/academy/tutorials/fix-text-scaling)); Squarespace 7.1 scales the site's font sizes with the browser width with a «Min» tweak per text type ([Scaling fonts](https://support.squarespace.com/hc/en-us/articles/227975587-Scaling-fonts-in-version-7-0)); Framer's «Fit Text» measures the text and renders it as an SVG that fills the container width, with min and max widths, at the price of text animations ([Fit Text](https://www.framer.com/academy/lessons/fit-text)); ApeironLF's heading is a `clamp()` with a `vw` term. The native answer, CSS `text-fit` (css-fonts-5), shrinks or grows text to its container with min and max percentages, but ships only in Chrome 150 ([MDN text-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-fit)).

**Three rules from the survey:** (1) every builder with free placement either lets rows grow (Squarespace) or pushes by rules (Wix); nobody leaves overlap to the owner. (2) Deliberate overlaps are protected by a geometric rule, not a flag. (3) The editor edits the design, not the pushed result. And a fourth: the builders that scale text give the owner a floor (Wix's Max-min, Squarespace's Min); a text that shrinks without one becomes unreadable.

**What Urd takes (0.7.17.3):** the Wix push rules on the existing absolute frames, applied to every block below (ADR-0024). The row grid, which Urd already uses on mobile (ADR-0019), was inventoried for the desktop and not taken: about twenty files, sticky.js reading `style.top`, negative `y` for overhanging blocks, the presets' unaligned frames and `mobileOrder` on the `y` scale; the inventory stands in [ARCHITECTURE.md](../ARCHITECTURE.md#desktop-sizing-the-push-pass-the-fit-and-the-gestures), summarised in ADR-0024, so the decision can be reopened with its price known. A text block can also shrink instead of wrap (`fit: "shrink"` with a floor), the Framer Fit Text model: the text keeps its size until its frame is too narrow for it, then is zoomed only as much as its design height needs, down to the floor.

## What a drag means: how the builders size an element (3 October 2026)

From the test of the calendar designs: an outline that did not follow a change of design, a drag that scaled the text with everything else, and thirteen block types that stand at the top of a frame with air under them.

- **Squarespace Fluid Engine:** every block type is sized either intrinsically (the content decides: text) or extrinsically (the owner decides: image). A text block cannot be dragged smaller than its content; a red bar stops the drag. Image and button have «Fit» (the content keeps its size, with an alignment inside the block) or «Fill» (the content covers the block); image defaults to Fit, button to Fill ([the tablet spacing problem](https://www.will-myers.com/articles/fixing-the-tablet-spacing-problem-in-squarespace-fluid-engine), [Fluid Engine and Classic Editor](https://www.bigcatcreative.com/blog/squarespace-fluid-engine-classic-editor), [editing with Fluid Engine](https://support.squarespace.com/hc/articles/6421525446541)).
- **Figma auto layout and Framer:** three behaviours per axis: fixed, hug or fit content (the content decides) and fill (the content takes the space it is given). Framer recommends fit content for content that varies, such as a CMS list, and warns against a parent that fits its content with a child that fills on the same axis: neither has a size ([Figma auto layout](https://help.figma.com/hc/articles/360040451373), [Framer sizing modes](https://www.framer.com/academy/lessons/sizing-modes), [sizing to fill and fit content](https://www.framer.com/academy/lessons/framer-fundamentals-sizing-to-fill-and-fit-content)).
- **Webflow:** the default height is the content's (`auto`); a minimum height is the safe way to ask for more, a fixed height clips ([height auto](https://webflow.com/glossary/height-auto), [width and height](https://help.webflow.com/article/width-and-height-units)).
- **Wix Studio:** «Scale proportionally» is the default responsive behaviour, with fluid and fixed beside it, and scaled text has a smallest and a largest size. Content that grows pushes what is below. The documented source of unexplained white space is a stored minimum height that the content no longer reaches; a hug height for containers is an open request ([setting the size of your elements](https://support.wix.com/en/article/studio-editor-setting-the-size-of-your-elements), [element size changes and page layout](https://dev.wix.com/docs/develop-websites-sdk/code-your-site/build-a-custom-frontend/page-elements/about-element-size-changes-and-page-layout), [the hug height request](https://support.wix.com/en/article/studio-editor-request-hug-height-responsive-behavior-for-containers-to-fit-child-elements)).
- **Elementor:** a container has a minimum height, and its items an alignment and a stretch, which is how equal cards are made ([container size and behavior](https://elementor.com/help/set-flexbox-container-size-behavior)).
- **CSS:** container queries and container units (`cqw`, with `clamp()`) let a component size itself by the box it stands in, not by the window ([container query units and fluid typography](https://moderncss.dev/container-query-units-and-fluid-typography/), [container queries in action](https://web.dev/articles/baseline-in-action-container-queries)).

**Urd's blocks as measured (preview, default content, a frame of 30 px, of 900 px, and 12 % wide):**

| Block types | Frame too short | Frame too tall |
|---|---|---|
| image, video, icon, shape, button, gallery, ribbon | as short as the frame (video and icon stop near 40 px) | the content fills the frame |
| calendar, collection, product, cart, checkout, countdown, FAQ, form, quote, share, stats, table, timeline | grows to the content | the content stands at the top, air under it |
| text | grows to the words | stays as tall as dragged, the words at the top |
| audio | grows to the player | the player is stretched to the frame |
| map | its own height setting | its own height setting; the frame is ignored |

The width is the same for all: the dragged width in percent of the content surface, the content flowing in it.

**Five rules from the survey:** (1) a drag changes the box, never the content's own size; text size is a setting of the text. (2) Each axis is fixed, follows the content, or is filled by it, and each block type has a default. (3) A block that follows its content cannot be dragged smaller than it, and the drag says so. (4) A stored height the content does not reach is white space nobody can explain, so a taller box is an explicit choice. (5) Scaling everything, text included, is a setting of its own with text bounds.

**What Urd takes (0.7.21):** the dragged width for every block; a height that either follows the content or is the block's own, with a default per block type and a choice per block; the frame of a block that follows its content set by the editor after an edit; and «Size» as the explicit scale (ADR-0025).

## Design from other tools (14 October 2026)

From the question of how an element designed in another tool, with the behaviour built into it, reaches an Urd page. Four passes: what each tool exports for self-hosting, the players' licences, sizes and CSP needs, sandboxed frames on Cloudflare Pages, and design tokens, 9-slice faces, SVG sanitising and pointer effects.

**What the tools export for self-hosting**

| Tool | Export that keeps the design or its motion | Self-hostable |
|---|---|---|
| Figma | Static SVG; Motion (open beta): MP4, WebM, GIF, SVG, Lottie JSON, dotLottie; the LottieFiles plugin: `.lottie` with hover, click and press as state machines; Dev Mode copies CSS (paid seats) | Yes; Figma Sites cannot export code, Figma Make gives a React project, Dev Mode and MCP output is «not production-ready» |
| Penpot | SVG, HTML and CSS from the Code tab (free); design tokens since 2.6, reportedly in the Tokens Studio shape rather than DTCG 2025.10 | Yes; prototypes have no export |
| Framer | None («Framer does not offer HTML export for self-hosting», 15 September 2026); React export through a third-party plugin for React apps only | No |
| Webflow | Code export (HTML, CSS, JS and assets) on Workspace plans; jQuery from Webflow's CDN; DevLink React components with GSAP | Only as a code bundle |
| Claude Design, Bolt, v0, Lovable, Figma Make | A zip of website files, or a React project that needs a build | Only as a code bundle |
| After Effects (Bodymovin), Jitter, Linearity Move, Cavalry, Lottielab, Keyshape, Flow, Phase | Lottie JSON or dotLottie | Yes, with a player |
| Rive | `.riv` (paid plan to export since 20 October 2025); files do not phone home | Yes, with a player |
| SVGator | SVG with CSS only (load and hover), SVG with an inline JS player (click, scroll), Lottie, video | CSS-only yes; the JS player is code |
| Spline | Public URL; «code export» on Pro with the scene on prod.spline.design; a fully offline zip on Enterprise only; glTF/GLB export | GLB yes; the runtime has no licence and its terms forbid redistribution |
| Blender, Cinema 4D | glTF/GLB | Yes, with a player |
| Canva, Motion Canvas, Procreate Dreams | Video or image sequences | Yes, natively |
| Adobe Animate (CreateJS, maintenance mode since February 2026), Tumult Hype, Godot, Unity, p5.js | HTML and JS bundles | Only as a code bundle |

**The players**

| Player | Licence, size | Needs |
|---|---|---|
| lottie-web light 5.13.0 | MIT; 46 KB gz; no WASM | Nothing beyond today's CSP; no expressions, nine SVG effects or the canvas renderer |
| dotlottie-web 0.81.0 | MIT; 33 KB gz plus 496 KB gz WASM | `'wasm-unsafe-eval'`; `setWasmUrl` and `setWorkerUrl` point at own files; state machines attach pointer listeners themselves |
| @rive-app/canvas 2.44 | MIT; 109 KB gz plus 850 KB gz WASM (canvas-lite drops text, layout, audio and scripting) | `'wasm-unsafe-eval'`; `setWasmUrl`, `setWasmFallbackUrl(null)`, `enableRiveAssetCDN: false`; UMD, a classic script; a `.riv` from a newer editor can need a newer runtime |
| @google/model-viewer | Apache 2.0; 2.4 M npm downloads a month; the 73 KB gz figure is the wrapper, three.js is bundled | WebGL; Draco and KTX2 decoders (WASM, from Google's CDN by default, pointable); fetches the file, so a draft `blob:` URL needs `connect-src blob:` |
| @splinetool/runtime 2.0.79 | No licence field and no LICENSE; 580 KB gz standalone; WASM per scene feature | `blob:` workers, Draco from gstatic, fonts and hooks from Spline's hosts |
| Spark (Gaussian splats) | MIT; 1.1 M downloads | Watched, not built |
| Unicorn Studio, Cavalry web player, Spine, Remotion, Motion Canvas | No published licence, or a commercial one; or video anyway | Not taken |

None of the players handles `prefers-reduced-motion` itself; the block pauses them. Animated SVG plays as an image in «secure animated mode» (SMIL and CSS, no scripts, no hover) in Chrome and Firefox, Safari unverified; inline it needs a sanitiser (DOMPurify's `svg` lists as the reference; `<animate>` on `href` is the known vector), and a `<style>` inside an inline SVG applies to the whole document. CSS `border-image` with an SVG is Baseline 9-slice; the SVG needs `viewBox` plus `width`/`height`. CSS cannot read the pointer (csswg-drafts #6733 open; `pointer()` is only an animation timeline). The DTCG format module 2025.10 is the first stable tokens format (28 October 2025); Figma's Variables REST API needs an Enterprise seat, and Tokens Studio writes DTCG only when asked.

**The sandboxed frame on Cloudflare Pages.** Rules in `_headers` apply in file order; two values for one header are joined with a comma, which for a CSP means both are enforced, so a rule after `/*` must first detach the site's policy (`! Content-Security-Policy`) and then set its own. By CSP3 `'self'` is the response URL's origin, so `script-src 'self'` holds in an opaque-origin frame; Safari 26.5 still refuses it there, so the origin is named beside it. An opaque origin has no cookies or storage; `fetch` to the site works through Pages' default `Access-Control-Allow-Origin: *`; `allow-scripts` alone covers canvas, WebGL, pointer events and `requestAnimationFrame`; `prefers-reduced-motion` is visible inside. Urd's guard denies `.html`, `.js`, `.css`, `.wasm`, `.json` and `.zip` under `media/` today, the updater never writes `_headers`, and `dev-server.py` applies no headers, so the CSP cannot be tested locally.

**How the builders take such files.** Webflow has Lottie, Rive and Spline elements; Framer has Rive and LottieFiles plugins and takes Spline through its Embed; Wix's HTML component is a sandboxed frame on a separate Wix domain; Readymag's code widget has an iframe toggle; Tilda's Zero block and Ghost's HTML card run the code on the page. No builder takes an uploaded code bundle and isolates it.

**What Urd takes:** three tracks. (1) Design in, on Urd's own elements (0.7.25): faces by `border-image`, scoped CSS styles, tokens, and the pointer as custom properties. (2) Lottie, Rive and glTF as files in `media/` with vendored MIT players as shipped plugins, on the page, no frame and no CDN (v0.8 Animation files). (3) Exported code in a sandboxed frame with a CSP of its own, the portal, with no promise beyond isolation. Spline's runtime is never vendored. Framer, Figma Sites and Penpot prototypes cannot come at all.

## Sources

Each list is the survey's own sources, as cited in its text, and belongs to the survey dated in its heading. The kind is marked after each link: (primary) vendor, official or standards documentation, (secondary) a third-party blog, tutorial or user forum, (code) read in source.

### Survey 27 July 2026 (the preview canvas)

- [Gutenberg Times: the post editor is going full iframe](https://gutenbergtimes.com/the-post-editor-is-going-full-iframe-what-block-developers-need-to-know-before-wordpress-7-1/) (secondary)
- [WordPress developer docs: block migration for iframe editor compatibility](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-api-versions/block-migration-for-iframe-editor-compatibility/) (primary)
- [Gutenberg PR #58202](https://github.com/WordPress/gutenberg/pull/58202) (code)
- [Shopify theme editor features](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor/features-overview) (primary)
- [Wix Studio setting the site's max width](https://support.wix.com/en/article/studio-editor-setting-the-sites-max-width) (primary)
- [Squarespace: Edit your site with Fluid Engine](https://support.squarespace.com/hc/en-us/articles/6421525446541-Edit-your-site-with-Fluid-Engine) (primary)
- [Max Schmitt: iframe responsive website tester](https://maxschmitt.me/posts/iframe-react-responsive-website-tester) (secondary)
- [baraa.app: dynamic viewports in iframes](https://www.baraa.app/blog/dynamic-viewports-in-iframes) (secondary)
- [mudosdigital: transform-origin and scale with responsive preview containers](https://mudosdigital.com/css-transform-origin-and-scale-with-responsive-preview-containers/) (secondary)
- [Chrome DevTools device mode](https://developer.chrome.com/docs/devtools/device-mode) (primary)
- [Figma forum: viewport height option on frames](https://forum.figma.com/suggest-a-feature-11/viewport-height-option-on-frames-36753) (secondary)

### Survey 16 September 2026 (the desktop canvas)

- [Squarespace device view](https://support.squarespace.com/hc/en-us/articles/206545667-Device-view) (primary)
- [Wix editor gridlines](https://support.wix.com/en/article/wix-editor-working-with-the-editor-gridlines) (primary)
- [Wix Studio editing size](https://support.wix.com/en/article/studio-editor-setting-your-editing-size) (primary)
- [Wix Studio setting the site's max width](https://support.wix.com/en/article/studio-editor-setting-the-sites-max-width) (primary)
- [Wix Studio enhanced zoom request](https://support.wix.com/en/article/studio-editor-request-enhanced-zoom-functionality) (primary)
- [Webflow canvas settings](https://help.webflow.com/hc/en-us/articles/33961230930579-Canvas-settings) (primary)
- [Webflow wishlist WEBFLOW-I-103](https://wishlist.webflow.com/ideas/WEBFLOW-I-103) (primary)
- [Framer breakpoints](https://www.framer.com/academy/lessons/framer-fundamentals-breakpoints) (primary)
- [Shopify theme editor](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor/features-overview) (primary)
- [Gutenberg PR #75121](https://github.com/WordPress/gutenberg/pull/75121) (code)
- [Elementor responsive editing](https://elementor.com/help/responsive-editing/) (primary)
- [Bricks responsive editing](https://academy.bricksbuilder.io/article/responsive-editing/) (primary)
- [Carrd mobile view](https://carrd.com/docs/building/using-mobile-view) (primary)
- [GrapesJS device config](https://raw.githubusercontent.com/GrapesJS/grapesjs/dev/packages/core/src/device_manager/config/config.ts) (code)
- [Figma Sites preview](https://help.figma.com/hc/en-us/articles/31242824747287-Preview-a-webpage-or-site) (primary)

### Survey 16 September 2026 (the navigation bar)

- [Squarespace building a site header](https://support.squarespace.com/hc/en-us/articles/360000667707-Building-a-site-header) (primary)
- [Big Cat Creative Squarespace header walkthrough](https://www.bigcatcreative.com/blog/header-navigation-squarespace-fluid-engine) (secondary)
- [Wix customizing your site header](https://support.wix.com/en/article/wix-editor-customizing-your-site-header) (primary)
- [Wix fixing your menu to the top](https://support.wix.com/en/article/wix-editor-fixing-your-menu-to-the-top-of-your-site) (primary)
- [Wix shrinking header feature request](https://support.wix.com/en/article/wix-editor-request-creating-a-header-that-shrinks-as-you-scroll-down) (primary)
- [Wix Studio header scroll effects](https://support.wix.com/en/article/studio-editor-adding-header-scroll-effects) (primary)
- [Wix Studio setting the size of your elements](https://support.wix.com/en/article/studio-editor-setting-the-size-of-your-elements) (primary)
- [Wix Studio setting the site's max width](https://support.wix.com/en/article/studio-editor-setting-the-sites-max-width) (primary)
- [Webflow Navbar](https://help.webflow.com/hc/en-us/articles/33961304628627-Navbar) (primary)
- [Webflow Navbar menu button](https://help.webflow.com/hc/en-us/articles/33961330610579-Navbar-menu-button) (primary)
- [Webflow show and hide navigation bar on scroll](https://help.webflow.com/hc/en-us/articles/33961261877523-Show-and-hide-navigation-bar-on-scroll) (primary)
- [Shopify Dawn header.liquid](https://github.com/Shopify/dawn/blob/main/sections/header.liquid) (code)
- [Shopify Dawn settings_schema.json](https://github.com/Shopify/dawn/blob/main/config/settings_schema.json) (code)
- [Elementor Nav Menu widget](https://elementor.com/help/nav-menu-widget-pro/) (primary)
- [Elementor Menu widget](https://elementor.com/help/the-menu-widget/) (primary)
- [WordPress change the width of a block](https://wordpress.com/support/wordpress-editor/change-the-width-of-a-block/) (primary)
- [Full Site Editing sticky header](https://fullsiteediting.com/site-creators/how-to-create-a-sticky-header/) (secondary)
- [DiverseKit Framer sticky header](https://diversekit.com/blog/framer-sticky-header) (secondary)
- [Duda headers](https://support.duda.co/hc/en-us/articles/26519231683223-Headers) (primary)
- [Duda shrink your site header](https://www.duda.co/product-updates/shrink-your-site-header) (primary)
- [GoDaddy add my logo](https://www.godaddy.com/help/add-my-logo-to-my-website-header-24711) (primary)
- [Hostinger style the header section](https://www.hostinger.com/support/10456392-hostinger-website-builder-how-to-style-the-header-section/) (primary)
- [Hostinger edit the header section](https://www.hostinger.com/support/6463972-hostinger-website-builder-how-to-edit-the-header-section/) (primary)
- [bitdoze Carrd sticky header](https://www.bitdoze.com/add-stickey-header-carrd/) (secondary)

### Survey 22 September 2026 (the element review)

- [ApeironLF source](https://github.com/Apeiron-Linjeforening/ApeironLF) (code)
- [Wix Studio: changing the background of a section](https://support.wix.com/en/article/studio-editor-changing-and-customizing-the-background-of-a-section) (primary)
- [Wix: scroll effects on image backgrounds](https://support.wix.com/en/article/wix-editor-adding-scroll-effects-to-image-backgrounds) (primary)
- [Squarespace: section background art](https://support.squarespace.com/hc/en-us/articles/4424780922509-Section-background-art) (primary)
- [Squarespace: adding background videos](https://support.squarespace.com/hc/en-us/articles/218562738-Adding-background-videos) (primary)
- [Elementor: background slideshow](https://elementor.com/help/background-slideshow/) (primary)
- [Elementor: section background video](https://elementor.com/help/section-background-video-options/) (primary)
- [Elementor: shape divider](https://elementor.com/blog/v130-shape-divider/) (primary)
- [Divi: background options](https://www.elegantthemes.com/documentation/divi/background-options/) (primary)
- [Divi: background masks and patterns](https://www.elegantthemes.com/blog/theme-releases/background-masks-and-patterns) (primary)
- [Webflow: background styles](https://help.webflow.com/hc/en-us/articles/33961278898323-Background-styles) (primary)
- [Framer marketplace: backgrounds](https://www.framer.com/marketplace/components/categories/backgrounds/) (primary)
- [Framer marketplace: Grainy Mesh Gradient](https://www.framer.com/marketplace/components/grainy-mesh-gradient/) (primary)

### Survey 23 September 2026 (scaling below the design width)

- [Tilda Zero Block responsive design](https://help.tilda.cc/zero/advanced) (primary)
- [Tilda Autoscale](https://tilda.cc/en/answers/a/autoscale/) (primary)
- [Tilda custom breakpoints](https://blog-en.tilda.cc/custom-breakpoints) (primary)
- [Readymag Scale Layout](https://help.readymag.com/hc/en-us/articles/360053256071-Scale-Layout) (primary)
- [Readymag forum: fixed font size with Scale Layout](https://forum.readymag.com/t/fixed-font-size-with-scale-layout-on/2921) (secondary)
- [Wix Studio setting the size of your elements](https://support.wix.com/en/article/studio-editor-setting-the-size-of-your-elements) (primary)
- [Wix Studio troubleshooting responsiveness issues](https://support.wix.com/en/article/studio-editor-troubleshooting-responsiveness-issues) (primary)
- [Wix Studio fix text scaling](https://www.wix.com/studio/academy/tutorials/fix-text-scaling) (primary)
- [Squarespace Engineering: Developing Fluid Engine](https://engineering.squarespace.com/blog/2022/developing-fluid-engine) (primary)
- [Squarespace responsive design](https://support.squarespace.com/hc/en-us/articles/115003287447-Responsive-design) (primary)
- [Squarespace scaling fonts](https://support.squarespace.com/hc/en-us/articles/227975587-Scaling-fonts-in-version-7-0) (primary)
- [Will Myers: the tablet spacing problem](https://www.will-myers.com/articles/fixing-the-tablet-spacing-problem-in-squarespace-fluid-engine) (secondary)
- [Duda Site Theme](https://support.duda.co/hc/en-us/articles/26519231815063-Site-Theme) (primary)
- [Duda Responsive Layout](https://www.duda.co/product-updates/responsive-layout) (primary)
- [Framer breakpoints](https://www.framer.com/academy/lessons/framer-fundamentals-breakpoints) (primary)
- [Flowvibe: clamp in Webflow](https://www.flowvibe.studio/blog/how-to-use-css-clamp-in-webflow-for-perfect-responsive-typography) (secondary)
- [McNeece: clamp in Elementor](https://www.mcneece.com/2025/03/mastering-global-fonts-in-elementor-the-ultimate-guide-to-fluid-fonts-with-clamp/) (secondary)
- [Figma Sites responsive tips](https://help.figma.com/hc/en-us/articles/33257143505175-Tips-for-creating-a-responsive-webpage-in-Figma-Sites) (primary)
- [Hostinger responsive design](https://www.hostinger.com/support/6466243-hostinger-website-builder-responsive-web-design-and-image-size/) (primary)
- [Canva mobile view](https://www.canva.com/help/responsive-website-issues/) (primary)
- [Carrd responsive tutorial](https://www.nocodementor.io/tutorials/making-your-carrd-site-responsive) (secondary)
- [MDN zoom](https://developer.mozilla.org/en-US/docs/Web/CSS/zoom) (primary)
- [MDN currentCSSZoom](https://developer.mozilla.org/en-US/docs/Web/API/Element/currentCSSZoom) (primary)
- [OddBird: Zoom, zoom, and zoom](https://www.oddbird.net/2024/07/09/zoomies/) (secondary)
- [WCAG understanding reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow) (primary)

### Survey 23 September 2026 (content that grows must push)

- [Squarespace Engineering: Developing Fluid Engine](https://engineering.squarespace.com/blog/2022/developing-fluid-engine) (primary)
- [Squarespace: Edit your site with Fluid Engine](https://support.squarespace.com/hc/en-us/articles/6421525446541-Edit-your-site-with-Fluid-Engine) (primary)
- [Wix: About element size changes and page layout](https://dev.wix.com/docs/develop-websites-sdk/code-your-site/build-a-custom-frontend/page-elements/about-element-size-changes-and-page-layout) (primary)
- [Wix: Fixing spacing and alignment issues](https://support.wix.com/en/article/wix-editor-fixing-spacing-and-alignment-issues-on-your-site) (primary)
- [Wix Studio: Stacking elements](https://support.wix.com/en/article/studio-editor-stacking-elements) (primary)
- [Framer stacks](https://www.framer.com/academy/lessons/framer-fundamentals-stacks-and-relative-positioning) (primary)
- [Figma auto layout](https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout) (primary)
- [Tilda Zero Block](https://help.tilda.cc/zero) (primary)
- [CSS grid track sizing](https://www.w3.org/TR/css-grid-1/#algo-spanning-items) (primary)
- [Wix Studio fix text scaling](https://www.wix.com/studio/academy/tutorials/fix-text-scaling) (primary)
- [Squarespace scaling fonts](https://support.squarespace.com/hc/en-us/articles/227975587-Scaling-fonts-in-version-7-0) (primary)
- [Framer Fit Text](https://www.framer.com/academy/lessons/fit-text) (primary)
- [MDN text-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-fit) (primary)

### Survey 3 October 2026 (what a drag means)

- [Will Myers: the tablet spacing problem](https://www.will-myers.com/articles/fixing-the-tablet-spacing-problem-in-squarespace-fluid-engine) (secondary)
- [Big Cat Creative: Fluid Engine and Classic Editor](https://www.bigcatcreative.com/blog/squarespace-fluid-engine-classic-editor) (secondary)
- [Squarespace: editing with Fluid Engine](https://support.squarespace.com/hc/articles/6421525446541) (primary)
- [Figma auto layout](https://help.figma.com/hc/articles/360040451373) (primary)
- [Framer sizing modes](https://www.framer.com/academy/lessons/sizing-modes) (primary)
- [Framer: sizing to fill and fit content](https://www.framer.com/academy/lessons/framer-fundamentals-sizing-to-fill-and-fit-content) (primary)
- [Webflow glossary: height auto](https://webflow.com/glossary/height-auto) (primary)
- [Webflow: width and height units](https://help.webflow.com/article/width-and-height-units) (primary)
- [Wix Studio: setting the size of your elements](https://support.wix.com/en/article/studio-editor-setting-the-size-of-your-elements) (primary)
- [Wix: element size changes and page layout](https://dev.wix.com/docs/develop-websites-sdk/code-your-site/build-a-custom-frontend/page-elements/about-element-size-changes-and-page-layout) (primary)
- [Wix Studio: the hug height request](https://support.wix.com/en/article/studio-editor-request-hug-height-responsive-behavior-for-containers-to-fit-child-elements) (primary)
- [Elementor: flexbox container size](https://elementor.com/help/set-flexbox-container-size-behavior) (primary)
- [Modern CSS: container query units and fluid typography](https://moderncss.dev/container-query-units-and-fluid-typography/) (secondary)
- [web.dev: container queries in action](https://web.dev/articles/baseline-in-action-container-queries) (primary)

### Survey 14 October 2026 (design from other tools)

- [Figma: export animations from Figma](https://help.figma.com/hc/en-us/articles/41307983648407-Export-animations-from-Figma) (primary)
- [Figma: Figma Sites export](https://help.figma.com/hc/en-us/articles/31242845959703) (primary)
- [Figma: Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247) (primary)
- [Figma: export variables](https://help.figma.com/hc/en-us/articles/15343816063383) (primary)
- [Figma REST API: variables](https://developers.figma.com/docs/rest-api/variables/) (primary)
- [LottieFiles plugin for Figma](https://lottiefiles.com/plugins/figma) (primary)
- [Penpot: inspect](https://help.penpot.app/user-guide/inspect/) (primary)
- [Penpot: design tokens](https://help.penpot.app/user-guide/design-tokens/) (primary)
- [Penpot community: the token export is the Tokens Studio format](https://community.penpot.app/t/token-export-is-tokens-studio-format-not-dtcg-2025-10/10544) (secondary)
- [Framer: can I export my website](https://www.framer.com/help/articles/can-i-export-my-website-to-html-and-self-host-it/) (primary)
- [Figment: Webflow code export](https://figment.so/blog/webflow-code-export) (secondary)
- [Webflow DevLink: interactions](https://developers.webflow.com/devlink/docs/component-export/design-guidelines/interactions) (primary)
- [Claude Design: export](https://support.claude.com/en/articles/14604416) (primary)
- [Rive: the $9 plan](https://rive.app/blog/rive-s-new-9-mo-plan) (primary)
- [Rive: canvas vs WebGL](https://rive.app/docs/runtimes/web/canvas-vs-webgl) (primary)
- [Rive: reduced motion](https://rive.app/docs/editor/accessibility/reduced-motion) (primary)
- [rive-wasm licence](https://github.com/rive-app/rive-wasm/blob/master/LICENSE) (code)
- [lottie-web](https://github.com/airbnb/lottie-web) (code)
- [dotlottie-web README](https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@0.81.0/README.md) (primary)
- [dotLottie spec 2.0](https://dotlottie.io/spec/2.0/) (primary)
- [Spline: exporting as code](https://docs.spline.design/exporting-your-scene/web/exporting-as-code.md) (primary)
- [Spline: self-hosted project](https://docs.spline.design/exporting-your-scene/web/exporting-as-self-hosted-project.md) (primary)
- [Spline: glTF/GLB export](https://docs.spline.design/exporting-your-scene/files/exporting-as-gtlf-glb.md) (primary)
- [Spline terms](https://spline.design/terms) (primary)
- [SVGator: export options](https://www.svgator.com/help/export-and-file-formats/what-export-options-are-available) (primary)
- [Jitter: export](https://help.jitter.video/en/articles/5369843-export-your-work) (primary)
- [Cavalry: Lottie export](https://cavalry.studio/docs/user-interface/menus/window-menu/render-manager/lottie-export/) (primary)
- [Cavalry: web player](https://cavalry.studio/docs/web-player/) (primary)
- [Lottielab: file download](https://docs.lottielab.com/export-and-hand-off/file-download) (primary)
- [model-viewer on npm](https://api.npmjs.org/downloads/point/last-month/@google/model-viewer) (primary)
- [Spark](https://registry.npmjs.org/@sparkjsdev/spark/latest) (primary)
- [Adobe Animate in maintenance mode](https://techcrunch.com/2026/02/04/after-backlash-adobe-cancels-adobe-animate-shutdown-and-puts-app-on-maintenance-mode) (secondary)
- [Godot: exporting for the web](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html) (primary)
- [Webflow: Lottie](https://help.webflow.com/hc/en-us/articles/33961351058835) (primary)
- [Framer: Rive plugin](https://www.framer.com/marketplace/plugins/rive/) (primary)
- [Wix: the HTML component](https://dev.wix.com/docs/velo/velo-only-apis/$w/html-component/introduction) (primary)
- [Readymag: custom code](https://help.readymag.com/hc/en-us/articles/360020844171-Adding-custom-code) (primary)
- [Cloudflare Pages: headers](https://developers.cloudflare.com/pages/configuration/headers/) (primary)
- [Cloudflare workers-sdk: the asset server's rules engine](https://github.com/cloudflare/workers-sdk/blob/main/packages/workers-shared/asset-worker/src/utils/rules-engine.ts) (code)
- [CSP3](https://w3c.github.io/webappsec-csp/) (primary)
- [GitLab: Safari and 'self' in sandboxed frames](https://gitlab.com/gitlab-org/gitlab/-/work_items/601981) (secondary)
- [MDN: CSP script-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src) (primary)
- [DTCG format module 2025.10](https://www.designtokens.org/tr/2025.10/format/) (primary)
- [Tokens Studio: token format](https://docs.tokens.studio/manage-settings/token-format) (primary)
- [MDN: border-image](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-image) (primary)
- [W3C: SVG integration](https://www.w3.org/TR/svg-integration/) (primary)
- [PortSwigger: the SVG animate XSS vector](https://portswigger.net/research/svg-animate-xss-vector) (secondary)
- [DOMPurify source](https://github.com/cure53/DOMPurify/tree/main/src) (code)
- [MDN: the Sanitizer API's default configuration](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API/Default_sanitizer_configuration) (primary)
- [csswg-drafts #6733: pointer position in CSS](https://github.com/w3c/csswg-drafts/issues/6733) (primary)
