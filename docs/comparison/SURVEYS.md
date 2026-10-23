# Surveys: the dated studies behind Urd's decisions

These are the surveys the ADRs and milestones cite: the layout, navigation and sizing decisions in [ADR-0018](../adr/0018-bound-content-width.md), [ADR-0019](../adr/0019-synced-mobile-model.md), [ADR-0023](../adr/0023-navigation-bar-sizing.md), [ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md) and [ADR-0025](../adr/0025-the-sizing-model.md), the shop of [ADR-0027](../adr/0027-a-shop-without-a-database.md), and the element review of milestone 0.7.13 in [BACKLOG.md](../BACKLOG.md). Each survey is kept as written on its date, with its own sources: what the builders did then, the rules drawn from it, and the «What Urd takes» line that records what was decided then. A survey is not rewritten when a builder changes or a decision moves on; the ADR it names holds the decision in force. The current picture of the field is in [FEATURES.md](FEATURES.md), [ELEMENTS.md](ELEMENTS.md), [DESIGN.md](DESIGN.md) and [CODE.md](CODE.md).

| Survey | Date | Decided in |
|---|---|---|
| [The preview canvas](#the-preview-canvas-27-july-2026) | 27 July 2026 | ADR-0018 (0.7.2) |
| [The desktop canvas](#the-desktop-canvas-own-window-or-a-fixed-editing-size-16-september-2026) | 16 September 2026 | ADR-0018 (0.7.2.6 and 0.7.2.7) |
| [The navigation bar](#the-navigation-bar-what-the-builders-offer-for-its-size-16-september-2026) | 16 September 2026 | ADR-0023 (0.7.15) |
| [The element review](#the-element-review-apeironlf-and-the-builders-backgrounds-22-september-2026) | 22 September 2026 | Milestones 0.7.13 and 0.7.16 |
| [Scaling below the design width](#scaling-below-the-design-width-23-september-2026) | 23 September 2026 | ADR-0018, ADR-0024 (0.7.17) |
| [Content that grows must push](#content-that-grows-must-push-23-september-2026) | 23 September 2026 | ADR-0024 (0.7.17.3) |
| [What a drag means](#what-a-drag-means-how-the-builders-size-an-element-3-october-2026) | 3 October 2026 | ADR-0025 (0.7.21) |
| [Default sizes](#default-sizes-what-100--is-17-october-2026) | 17 October 2026 | ADR-0025 decision 6 (0.7.19.23.4) |
| [What a shop needs](#what-a-shop-needs-how-the-builders-sell-19-october-2026) | 19 October 2026 | ADR-0027 (v1.1) |
| [How an organisation names itself](#how-an-organisation-names-itself-numbers-registers-and-the-law-in-57-countries-20-october-2026) | 20 October 2026 | Milestone 0.7.24 (0.7.24.5) |
| [What a link can point to](#what-a-link-can-point-to-and-what-every-element-carries-21-october-2026) | 21 October 2026 | Milestone 0.7.27 |

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

## Default sizes: what 100 % is (17 October 2026)

From the test of «Size» on the calendars: 100 % read as far too large, and the smallest size the slider then allowed, 75 %, as still large. The survey asks what the field draws at its default size.

**What 100 % means.** Every builder that documents a scale treats 100 % as the size as designed, never as a px value: Wix Studio's «Scale proportionally» (the default for new elements, with a smallest and a largest text size), Shopify Dawn's body and heading scales (100 to 130 % and 100 to 150 %, 100 % the floor) and The Events Calendar's font-size scale from its 16 px base ([Wix Studio: scaling text proportionally](https://support.wix.com/en/article/setting-text-to-scale-proportionally), [Dawn's settings schema](https://raw.githubusercontent.com/Shopify/dawn/main/config/settings_schema.json), [The Events Calendar: fonts](https://docs.nexcess.com/software/the-events-calendar/customize-fonts/)).

**Text sizes on a page today:**

| Text | px | Who |
|---|---|---|
| Body | 16 | The browser default; Material Body Large, Tailwind `text-base`, USWDS; 73 % of 518 design systems |
| Dense body | 14 | Fluent 2 Body 1, Atlassian Body M, Carbon productive, Webflow's default, the Google Calendar embed |
| Meta (time, place, captions) | 12 to 14 | Material Body Small 12, Tailwind `text-sm` and `text-xs`, Fluent Caption 12 |
| The floor | 11 | Material Label Small, Apple Caption 2, Polaris `bodyXs`; nothing in the field goes lower |

**Calendar widgets at their default size:**

| Widget | Title | Meta | Rows | Source |
|---|---|---|---|---|
| Google Calendar embed | about 14 (agenda, read from its stylesheet), 12 (month chips) | 11 to 14 | 32 px agenda rows | [embedding a calendar](https://support.google.com/calendar/answer/41207) |
| The Events Calendar | 24 (list, 16 under 768 px) | 14 (12 narrow) | 48 and 40 px margins per event | [typography variables](https://raw.githubusercontent.com/the-events-calendar/tribe-common-styles/master/variables/_typography.pcss) |
| EventON | 24 | 12 | at least 63 px, 20 px padding | [EventON styles](https://plugins.svn.wordpress.org/eventon-lite/trunk/assets/css/eventon_styles.css) |
| Modern Events Calendar | 29 | 11 to 12 | 25 px between cards | [MEC styles](https://plugins.svn.wordpress.org/modern-events-calendar-lite/trunk/assets/css/frontend.css) |

None of them is compact by default: a dense layout is a choice (Google Calendar's Compact density, Timely's Compact Agenda) or the narrow fallback.

**Urd at 100 % (measured in base.css):** the base text is the page's 16 px, the titles 22 to 26 px in most designs (Glass 25.6, Tear-off pad 22.4, Departure board 24), the meta text 0.78 to 0.85 of the base (12.5 to 13.6 px), with display type beyond that (the cinema marquee's title 42 to 83 px, the tear-off pad's day number 150 px). At 50 % the base is 8 px and the meta text 6 to 7 px, under every floor in the field.

**What Urd takes (17 October 2026):** 100 % stays the size as designed, and «Size» scales everything alike over its whole range with no default floor; the text bounds are the owner's choice. The calendar, a dense widget, draws its designs at a 14 px base for the page's 16 px (`TYPE_SCALE`), the base of the dense systems above, which keeps its meta text at the floor (ADR-0025 decision 6). Compact designed sizes per design are milestone 0.7.19.32.

## What a shop needs: how the builders sell (19 October 2026)

A pass on what the builders' entry plans that sell include, read from their own pricing, feature and help pages, held against the payment API that replaces Vipps Checkout, the Norwegian rules for an association that sells to consumers, and the host's free plan. The question was which shop functions Urd can take without a database, and which it must leave to a platform.

**The builders' entry plans that sell:**
- **Shopify Basic (NOK 389 a month):** variants, stock, flat, amount and weight rates with pickup, codes and automatic discounts, tax per market (Norway through Basic Tax), gift cards, customer accounts, abandoned carts, notices to the owner and the buyer, and refunds; low-stock alerts, downloads, subscriptions and reviews through Shopify's own apps ([pricing](https://www.shopify.com/pricing), [variants](https://help.shopify.com/en/manual/products/variants), [discounts](https://help.shopify.com/en/manual/discounts), [taxes](https://help.shopify.com/en/manual/taxes)).
- **Squarespace Basic (NOK 249 a month, a 2 % fee):** variants, stock, flat and weight shipping by zone with pickup, digital products, gift cards, customer accounts, abandoned carts, notices, refunds and reviews; codes, automatic discounts, low-stock alerts and carrier rates from Core; VAT as a manual rate with «Include in price» ([pricing](https://www.squarespace.com/pricing), [variants](https://support.squarespace.com/hc/en-us/articles/206540687-Adding-product-variants), [inventory](https://support.squarespace.com/hc/en-us/articles/205811228-Managing-inventory), [VAT](https://support.squarespace.com/hc/en-us/articles/215074868-Collecting-VAT-or-GST)).
- **Wix Core and Business:** variants, stock, flat, weight, price and quantity shipping with pickup, codes, automatic discounts, tax included in the price (automatic tax on Business), digital products, gift cards, abandoned carts, notices, refunds, reviews and subscriptions; the plan split of the last four could not be read ([plans](https://www.wix.com/plans), [store features](https://support.wix.com/en/article/wix-stores-an-overview-of-store-features)).
- **Webflow Ecommerce Standard (a 2 % fee):** variants, stock, zone tables by price, quantity or weight, codes with a minimum, automatic tax for the US, Canada, the EU and Australia but a manual rate for Norway, and downloads; user accounts and subscriptions were retired on 29 January 2026 ([pricing](https://webflow.com/pricing), [taxes](https://help.webflow.com/hc/en-us/articles/33961409897747-Configure-taxes-on-Ecommerce-orders), [sunset](https://help.webflow.com/hc/en-us/articles/36046006227731-User-Accounts-sunset)).
- **The small-shop platforms:** Big Cartel gates stock and codes behind Platinum and keeps tax manual outside the US ([pricing](https://www.bigcartel.com/pricing)); Ecwid has no free plan any more and gates stock, codes and digital goods behind Venture ([pricing](https://www.ecwid.com/pricing)); Square Online's free plan has variants, shipping tables, pickup and codes, while its pages disagree on stock ([plans](https://squareup.com/us/en/online-store/plans)).
- **The other builders:** WooCommerce on WordPress.com, Hostinger, GoDaddy, Strikingly and Tilda have variants, stock, flat shipping and codes on the entry shop plan, while Jimdo and Webnode put variants and codes on a higher plan; weight tables, gift cards, accounts and reviews are gates or add-ons throughout ([WooCommerce](https://woocommerce.com/document/variable-product/), [Hostinger](https://www.hostinger.com/ecommerce), [GoDaddy](https://www.godaddy.com/help/add-product-options-in-my-online-store-20054), [Jimdo](https://www.jimdo.com/pricing/onlineshop/), [Webnode](https://www.webnode.com/e-commerce-pricing/), [Strikingly](https://www.strikingly.com/s/pricing), [Tilda](https://help.tilda.cc/online-store/catalog)). Carrd sells only through Stripe, PayPal or Gumroad widgets, and Ghost sells memberships, not products ([Carrd](https://carrd.com/docs/forms/setting-up-payments), [Ghost](https://ghost.org/help/selling-courses/)).
- **The club platforms:** WildApricot's store has variants without a price of their own, stock and named flat shipping ([online store](https://gethelp.wildapricot.com/en/articles/1570-online-store)); StyreWeb's member shop takes Vipps and codes ([nettbutikk](https://www.styreweb.com/nettbutikk-i-styreweb/)); Rubic has no web shop, only a kiosk on site ([moduler](https://rubic.no/moduler)).

**The payment layer:**
- **Vipps MobilePay ePayment:** a web redirect; the amount is reserved and may be captured only when the goods are ready to ship, within 180 days in Norway; partial capture, cancel and refund; profile sharing gives the name, email, phone and address; Express lets the buyer choose among fixed shipping options in the app, where only the shipping cost may change; receipts with order lines through the Order Management API; webhooks signed with HMAC ([how it works](https://developer.vippsmobilepay.com/docs/APIs/epayment-api/how-it-works/online/), [reserve and capture](https://developer.vippsmobilepay.com/docs/knowledge-base/reserve-and-capture/), [Express](https://developer.vippsmobilepay.com/docs/APIs/epayment-api/api-guide/features/express/), [order management](https://developer.vippsmobilepay.com/docs/APIs/order-management-api/), [webhooks](https://developer.vippsmobilepay.com/docs/APIs/webhooks-api/api-guide/)). The list price for online payment is 2.99 % + 1 NOK ([priser](https://vippsmobilepay.com/no/priser)).
- **Kustom Checkout:** an embedded frame by default (its hosts in the CSP), a hosted payment page as the redirect alternative, authorisations of about 28 days, no public prices, and onboarding by invitation ([how it works](https://docs.kustom.co/checkout/how-it-works/), [hosted page](https://docs.kustom.co/checkout/surfaces/hosted-payment-page/), [FAQ](https://www.kustom.co/kustom-vipps-faq)).

**The rules and the host:**
- **Norwegian rules:** prices to consumers include MVA and every charge, and the shipping is shown before the order ([prisopplysningsforskriften](https://lovdata.no/dokument/SF/forskrift/2012-11-14-1066)); the paying button must say that the order binds the buyer to pay, and a confirmation on a durable medium is owed by delivery at the latest ([angrerettloven § 16](https://lovdata.no/lov/2014-06-20-27/§16), [§ 18](https://lovdata.no/lov/2014-06-20-27/§18)); the seller's information includes the organisation number ([ehandelsloven § 8](https://lovdata.no/lov/2003-05-23-35/§8)); a seller not registered for MVA may not write «inkl. mva» ([merverdiavgiftsloven § 15-11](https://lovdata.no/lov/2009-06-19-58/§15-11)), and charitable and public-benefit organisations register at 140 000 NOK ([Skatteetaten](https://www.skatteetaten.no/bedrift-og-organisasjon/rapportering-og-bransjer/bransjer-med-egne-regler/frivillige-og-ideelle-organisasjoner/mva-for-veldedige-og-allmennyttige-organisasjoner/)); a reduced price shows the lowest price of the previous 30 days ([§ 9a](https://lovdata.no/forskrift/2012-11-14-1066/§9a)); an online withdrawal function comes with an amendment whose start date was not found ([LOV-2026-06-19-34](https://lovdata.no/dokument/LTI/lov/2026-06-19-34)).
- **The host:** a Pages Function cannot hold the email binding; sending needs a Worker and the domain's DNS at Cloudflare; mail to the owner's verified address is free, while mail to a buyer needs a paid plan; the free plan allows 500 builds a month ([email service](https://developers.cloudflare.com/email-service/), [bindings](https://developers.cloudflare.com/pages/functions/bindings/), [limits](https://developers.cloudflare.com/pages/platform/limits/)).

**Five rules from the survey:**
1. The entry plan that sells always has variants with their own price, stock that stops a sale, flat or weight shipping with pickup, discount codes, a notice to the owner, a confirmation to the buyer and refunds; gift cards, abandoned-cart emails, reviews, subscriptions and customer accounts are plan gates or add-ons.
2. Every one of them keeps the orders in a database; the one that does not (Carrd) hands the whole sale to Stripe, PayPal or Gumroad.
3. Only Shopify names automatic tax for Norway; the rest leave Norway to a manual rate, so a fixed MVA setting is the field's practice, not a shortcut.
4. The payment API can carry the shop's state: the reservation holds the goods, the capture is the shipment, a cancel answers an oversold item, and Express takes the shipping table.
5. The law fixes the checkout's last screen (the button, with the total and the shipping right above it) and the information the shop must give, so those belong in settings and generated pages, not in each product.

**What Urd takes (v1.1):** [ADR-0027](../adr/0027-a-shop-without-a-database.md), a shop without a database: variants with their own price, SKU, availability and image; published availability per variant with reserve-then-capture; static shipping tables with pickup; codes published as an HMAC; MVA as a seller switch, off by default; the law's information in the site and shop settings, with the terms page generated from them; notices from the provider's webhook without storage; and the before price from the catalogue's history. Accounts, subscriptions, gift cards, markets, point of sale, abandoned carts, reviews, B2B, downloads and refunds through Urd are not taken. The order button of today's checkout is fixed earlier, in 0.7.24.6.

## How an organisation names itself: numbers, registers and the law in 57 countries (20 October 2026)

A pass on how an association, a club or a small business identifies itself on its website in the Nordic countries, the rest of Europe including the transcontinental states, the United States, Canada, Mexico, Taiwan, Japan, South Korea and Australia. Read from the registers, the tax authorities, the laws and the ISO 6523 code list, with every check digit run on real published numbers: the registers' and tax authorities' own, listed companies' and charities', several against a whole open register (379 999 Estonian codes, 455 268 Latvian numbers, 1 416 996 Slovak tax numbers). The question was what one site setting must hold so that any of these associations can show what its law asks for.

**What the numbers are:**
- **One number or several:** Norway, Denmark, Finland, the Baltic states and most of Central Europe show one national number. The United Kingdom shows a company number, a charity number for England and Wales, Scotland or Northern Ireland and a VAT number; Germany a register entry with its court (Vereinsregister, Handelsregister and three more) and a VAT number; France a SIREN, an RNA number for associations and an RCS entry with its city; South Korea a business or non-profit number, a corporate number and a mail-order report number; Canada a business number and a charity registration number.
- **What travels with a number:** the register court in Germany, Austria, Belgium, Czechia and Croatia, the RCS city in France, the tax office in Greece and Türkiye, the register's name in Norway and the United Kingdom.
- **Statuses rather than numbers:** the United States' 501(c)(3) sentence, Australia's «Registered charity», Mexico's «Donataria autorizada» and France's «reconnue d'utilité publique».

**What the checks are:**
- **A published algorithm:** Norway, Finland, Croatia, Serbia, Luxembourg, Japan, Australia and Romania's trade register state theirs in law or regulation.
- **An algorithm no register publishes, but every real number keeps:** most of the rest, among them the UK and Irish VAT numbers, the Swiss UID (its standard is repealed), Mexico's RFC and Canada's business number.
- **A check the registers no longer keep:** Iceland issues numbers that fail theirs since 18 February 2026; older Slovenian, Slovak, Ukrainian and Austrian numbers fail theirs; Montenegro's 2026 rulebook names a rule its existing numbers do not follow. A check there may warn, never refuse.
- **No check at all:** UK company and charity numbers, Irish company and charity numbers, the French RNA, the Austrian ZVR, the Dutch KVK number, the Greek ΓΕΜΗ number and the US EIN (only its prefix).
- **A rule that changed:** Taiwan's unified business number moved from mod 10 to mod 5 in 2023; 399 of 400 companies registered in October 2026 fail the old rule.

**What the VAT number is:**
- **The number itself:** Türkiye, Russia, Serbia, Mexico, Taiwan, South Korea and others use the national number for VAT.
- **The number with a mark or a wrapping:** Norway's «974 760 673 MVA», Switzerland's «CHE-… MWST», Sweden's «SE…01», Belgium's «BE…», Hungary's «HU» with the first eight digits.
- **A separate number:** Germany, Austria, the United Kingdom, Ireland, the Netherlands, Luxembourg, Estonia, Lithuania, Malta, Cyprus, Japan's «T» number and Canada's «RT» account.
- **None:** the United States; Australia shows «GST registered» beside the ABN.

**What the law asks a website to show:**
- **The EU and EEA:** article 5 of Directive 2000/31/EC as each country wrote it, with name, address, email, the register and number and the VAT number. Several countries reach further: Norway's enhetsregisterloven § 7-2 (in force 1 January 2026) asks every registered unit, associations included, for its name and number on its website; Austria's MedienG § 25 asks every Verein for a small disclosure; Belgium's company code covers the VZW; Italy wants the partita IVA on the home page; Greece wants the ΓΕΜΗ number on company sites.
- **Elsewhere:** Türkiye's 2022 e-commerce regulation asks for a contact section reachable from the home page; South Korea's e-commerce act asks for the trade name, the representative's name, the address, the business number and the mail-order report number; Japan's 特定商取引法 asks the same when selling; the United States, Canada and Australia have no general website rule, and charities show their numbers by custom or for donations.
- **The representative:** Germany (the Vorstand), South Korea (대표자), France (the directeur de la publication) and Türkiye ask for a person's name.

**What the data may say:** schema.org's `iso6523Code` writes a number as its ISO 6523 code and the number (`0192:974760673`), and can express most identifiers that way, but only 24 of the countries have a national scheme in the ISO 6523 list (Norway 0192, Sweden 0007, Denmark 0184, Belgium 0208, Japan 0188, Australia 0151 and others); the 99xx codes Peppol uses for VAT numbers are electronic-address codes, not ISO 6523, and never belong in `iso6523Code`.

**Five rules from the survey:**
1. A site setting holds a list of numbers, not one: the country decides which exist.
2. A number may carry a court, a city, a tax office or a register's name, and the country writes its line its own way.
3. A check refuses only where it is verified and the register keeps it; where the register publishes no rule, or issues numbers that fail it, the check warns.
4. The VAT number comes from the country's rule: the number itself, the number marked or wrapped, a number of its own, a status, or nothing.
5. The JSON-LD writes an ISO 6523 code only where the list has one; the other numbers go into `identifier` and the VAT number into `vatID`.

**What Urd takes (0.7.24.5):** one profile per country in `contact-profiles.js`, with the numbers, their forms, their checks (`contact-checks.js`, each verified on real numbers in its test), what travels with them and how the VAT number is formed; a generic profile for any other country, with a free label and number; a representative's name; and two footer switches, the legal line and the contact details, both on by default. Opening hours stay with ER-C ([FEATURES.md](FEATURES.md#open) C112, C116).

## What a link can point to, and what every element carries (21 October 2026)

From the question whether a link can point at a spot on a page. In Urd a link reached a section only by its random id, copied by hand from Properties; blocks had no id, nothing jumped to the spot after the page was drawn, and about fifteen link fields kept three data shapes. Two passes read the source code of the open-source builders: what a link and an anchor can be in Gutenberg, Elementor, Kadence Blocks, Spectra, Stackable and GenerateBlocks, and in Webstudio, GrapesJS, Puck, Plasmic, Builder.io, Silex and Onlook; and the settings every element offers in eleven of them, now in [SETTINGS.md](SETTINGS.md).

**Anchors:**
- **On the element, not a widget:** Gutenberg turns its «HTML anchor» on for 98 of 116 core blocks and writes it as the block's id; Stackable has one on all 46 blocks and Spectra on most; Elementor has a «CSS ID» on every element and an ID on its v4 elements, and its Menu Anchor widget is the older pattern. Webstudio and GrapesJS give every instance an id, Builder.io only as a custom attribute, Puck none.
- **Checked little:** most only turn spaces and «#» into «-», and Gutenberg never checks that an anchor is unique. GrapesJS rolls a taken id back without a word and numbers clones (`id-2`), Elementor's v4 elements clear the id on a duplicate, and Webstudio finds duplicates only in a later audit.
- **From the headings:** Gutenberg and Stackable store a slug of the heading text in the content and stop following the text once the owner edits it; Kadence and Spectra make the ids in the browser at runtime, and Spectra's are random for a repeated heading, so a link to them breaks on reload.

**Links:**
- **Kinds:** Webstudio's link control has five modes, URL, Page with a section on it, Email with a subject, Phone and Attachment; Silex has URL, Email and Page; Gutenberg sorts what is typed into a link, mailto, tel or a fragment; Plasmic, GrapesJS and Builder.io take one field, and Puck has no link field.
- **A spot on a page:** only Webstudio lists the ids on the chosen page, and only it stores a jump as a reference (`{pageId, instanceId}`) whose hash is resolved at render, so a renamed anchor never breaks a link. Everywhere else the owner types `#name`, and nothing checks that it exists.
- **Options:** a new tab everywhere, with `noopener` added by Gutenberg, Kadence and GenerateBlocks and left out by Elementor's classic link control and Builder.io (Webstudio warns about it in an audit); nofollow in the WordPress projects, sponsored in Kadence and GenerateBlocks, download in Kadence, and no `ugc` anywhere. Silex rewrites links when a page is renamed and flags links to a deleted one.

**The jump:**
- **The offset under a sticky header** is a number the owner types: Kadence's and Spectra's tables of contents scroll by script with an offset (40 and 30 px by default), Stackable writes the number into `scroll-padding-top` per breakpoint, and Elementor's v4 elements take a `scroll-margin-top` each; only Kadence's navigation can take the live height of the header row.
- **Smooth scrolling:** only Elementor keeps `scroll-behavior: smooth` behind `prefers-reduced-motion: no-preference`.
- **Hidden targets:** Gutenberg's accordion opens the panel that holds `:target`, and Stackable and Spectra open an item whose id is in the address.

**What every element carries:** the WordPress libraries give their blocks an anchor, a class, visibility per device, custom CSS, lock, rename and reuse through the block supports, and Stackable spacing, border, shadow and background through its shared block components; Elementor gives every element an id, a class, hiding per device, spacing, border, shadow, background, position and z-index through its Advanced tab; Webstudio, GrapesJS and Builder.io reach the styles through a style panel over any CSS property; and Elementor, Spectra and Stackable add an entrance animation to every element ([SETTINGS.md](SETTINGS.md#what-every-element-can-carry)).

**Five rules from the survey:**
1. A name belongs on any section or block, slugged, unique on the page and cleared on a duplicate, while the stored target is the element's stable id, so a rename never breaks a link.
2. One link editor serves every link field: a page and a spot on it chosen from the anchors that exist, a web address, email, phone and a file.
3. The offset under a sticky header is CSS, `scroll-padding-top` taken from the menu's own height, not arithmetic in a click handler, so a link from another page, the history and a page without script land right too.
4. Smooth scrolling only without reduced motion.
5. A link whose page or spot is gone says so in its field.

**What Urd takes (0.7.27):** a name on any section or block beside a stable id on every block, the id kept as the stored target; one link editor with a page and a spot on it, a web address with nofollow and sponsored, email, phone and a file from `media/`, a new tab and a download; the offset under the menu through `scroll-padding-top` from its height; smooth scrolling only without reduced motion; and a warning in a field whose page or spot is gone. The cross-cutting settings Urd still lacks go to their places: a lock and a layer name in the 0.7.9 layers panel, box styles on more blocks in 0.7.9, elements shown only on the phone in 0.7.3, a hidden section or block in v0.8 AR-5, a scoped style per look in v0.8 OL-4, and any block or group of blocks as a link in v0.8 ER-G; a CSS class is not taken, since the class-based cascade is not adopted.

## What a payment provider gives the optional layer (23 October 2026)

A pass on the payment providers that fit Urd's optional layer (a function on the site, the provider's own page, the secrets at the host, no change to the CSP), read from each provider's own developer and help pages and held against the shop rules of 19 October and the countries of 20 October. The question was which providers to add beside Vipps MobilePay, and what each asks of the site owner.

**The providers read:**
- **Vipps MobilePay ePayment:** the Vipps and MobilePay apps in Norway, Denmark and Finland on the same servers, and a card page in Norway that the test environment lacks; a reservation of 180 days in Norway and 14 in Denmark and Finland, captured in the portal; no Apple Pay or Google Pay ([servers](https://developer.vippsmobilepay.com/docs/knowledge-base/servers/), [reserve and capture](https://developer.vippsmobilepay.com/docs/knowledge-base/reserve-and-capture/), [portal](https://developer.vippsmobilepay.com/docs/knowledge-base/portal/)).
- **Stripe Checkout:** card, and Apple Pay and Google Pay that work on the hosted page «with no additional configuration», with Klarna, Link and the local methods switched on in the dashboard; a hold of 7 days on cards and 28 on Klarna, captured in the dashboard; sandboxes with test cards, and restricted keys recommended over the full secret key ([Apple Pay](https://docs.stripe.com/apple-pay?platform=web), [holds](https://docs.stripe.com/payments/place-a-hold-on-a-payment-method), [keys](https://docs.stripe.com/keys)).
- **PayPal:** the PayPal account, and a card without one where PayPal offers it, in 25 currencies with HUF, JPY and TWD in whole units; an authorisation valid 29 days but honoured for 3, captured later through the merchant's own server code; a sandbox with buyer accounts, and live credentials for a verified Business account ([authorisation](https://developer.paypal.com/docs/checkout/standard/customize/authorization/), [currencies](https://developer.paypal.com/api/rest/reference/currency-codes/), [production](https://developer.paypal.com/api/rest/production)).
- **Not fitting:** Kustom Checkout (a frame by default, its hosted page by invitation), Swish (a certificate per merchant, held by a server), and Apple Pay or Google Pay as buttons of their own (a gateway's page gives them).

**Four rules from the survey:**
1. A hosted page per provider keeps the CSP as it is, and the card, the wallets and the local methods come with the provider's page, so the site adds providers, never methods.
2. The provider's hold decides whether the money may wait: where the hold outlasts the shipping and the seller can capture in the provider's portal, it waits; where it does not (PayPal's 3 days), it is taken at the order.
3. The return confirms only what is confirmed at once; a payment that settles over days needs the provider's later event.
4. The currency is the site's, since every provider charges in the catalogue's currency, and some take only some currencies or whole units.

**What Urd takes (23 October 2026):** milestone 0.7.28 and [ADR-0028](../adr/0028-payment-providers-in-the-optional-layer.md): Vipps MobilePay with its card page, Stripe Checkout and PayPal per checkout block, the site's currency, when Stripe takes the money, and the payment instructions as a choice.

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

### Survey 17 October 2026 (default sizes)

- [MDN: font-size](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size) (primary)
- [Nicolas Hoizey: users do change font size](https://nicolas-hoizey.com/2018/06/users-do-change-font-size.html) (secondary)
- [Lazyweb: the base font size of 518 design systems](https://www.lazyweb.com/research/what-base-font-size-do-products-use.md) (secondary)
- [Flutter: Material 3 TextTheme](https://api.flutter.dev/flutter/material/TextTheme-class.html) (primary)
- [Apple Human Interface Guidelines: typography](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/typography.json) (primary)
- [Fluent 2: typography](https://fluent2.microsoft.design/typography) (primary)
- [Carbon: type sets](https://carbondesignsystem.com/elements/typography/type-sets/) (primary)
- [Atlassian: typography](https://atlassian.design/foundations/typography) (primary)
- [Polaris size tokens](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-tokens/src/size.ts) (code)
- [USWDS: font size tokens](https://designsystem.digital.gov/design-tokens/typesetting/font-size/) (primary)
- [Tailwind: font size](https://tailwindcss.com/docs/font-size) (primary)
- [Wix Studio: scaling text proportionally](https://support.wix.com/en/article/setting-text-to-scale-proportionally) (primary)
- [Shopify Dawn: settings schema](https://raw.githubusercontent.com/Shopify/dawn/main/config/settings_schema.json) (code)
- [Google Calendar: embed a calendar](https://support.google.com/calendar/answer/41207) (primary)
- [Google Workspace Updates: Calendar density options](https://workspaceupdates.googleblog.com/2026/07/updated-options-to-better-view-google-Calendar-on-large-monitors.html) (primary)
- [The Events Calendar: typography variables](https://raw.githubusercontent.com/the-events-calendar/tribe-common-styles/master/variables/_typography.pcss) (code)
- [The Events Calendar: customising fonts](https://docs.nexcess.com/software/the-events-calendar/customize-fonts/) (secondary)
- [EventON Lite styles](https://plugins.svn.wordpress.org/eventon-lite/trunk/assets/css/eventon_styles.css) (code)
- [Modern Events Calendar Lite styles](https://plugins.svn.wordpress.org/modern-events-calendar-lite/trunk/assets/css/frontend.css) (code)
- [Timely: embedding the calendar](https://help.time.ly/how-to-embed-your-calendar/) (primary)

### Survey 19 October 2026 (what a shop needs)

- [Shopify: pricing](https://www.shopify.com/pricing) (primary)
- [Shopify: variants](https://help.shopify.com/en/manual/products/variants) (primary)
- [Shopify: discounts](https://help.shopify.com/en/manual/discounts) (primary)
- [Shopify: taxes](https://help.shopify.com/en/manual/taxes) (primary)
- [Squarespace: pricing](https://www.squarespace.com/pricing) (primary)
- [Squarespace: variants](https://support.squarespace.com/hc/en-us/articles/206540687-Adding-product-variants) (primary)
- [Squarespace: inventory](https://support.squarespace.com/hc/en-us/articles/205811228-Managing-inventory) (primary)
- [Squarespace: VAT](https://support.squarespace.com/hc/en-us/articles/215074868-Collecting-VAT-or-GST) (primary)
- [Wix: plans](https://www.wix.com/plans) (primary)
- [Wix: store features](https://support.wix.com/en/article/wix-stores-an-overview-of-store-features) (primary)
- [Webflow: pricing](https://webflow.com/pricing) (primary)
- [Webflow: taxes](https://help.webflow.com/hc/en-us/articles/33961409897747-Configure-taxes-on-Ecommerce-orders) (primary)
- [Webflow: sunset](https://help.webflow.com/hc/en-us/articles/36046006227731-User-Accounts-sunset) (primary)
- [Big Cartel: pricing](https://www.bigcartel.com/pricing) (primary)
- [Ecwid: pricing](https://www.ecwid.com/pricing) (primary)
- [Square Online: plans](https://squareup.com/us/en/online-store/plans) (primary)
- [WooCommerce](https://woocommerce.com/document/variable-product/) (primary)
- [Hostinger](https://www.hostinger.com/ecommerce) (primary)
- [GoDaddy](https://www.godaddy.com/help/add-product-options-in-my-online-store-20054) (primary)
- [Jimdo](https://www.jimdo.com/pricing/onlineshop/) (primary)
- [Webnode](https://www.webnode.com/e-commerce-pricing/) (primary)
- [Strikingly](https://www.strikingly.com/s/pricing) (primary)
- [Tilda](https://help.tilda.cc/online-store/catalog) (primary)
- [Carrd](https://carrd.com/docs/forms/setting-up-payments) (primary)
- [Ghost](https://ghost.org/help/selling-courses/) (primary)
- [WildApricot: online store](https://gethelp.wildapricot.com/en/articles/1570-online-store) (primary)
- [StyreWeb: nettbutikk](https://www.styreweb.com/nettbutikk-i-styreweb/) (primary)
- [Rubic: moduler](https://rubic.no/moduler) (primary)
- [Vipps MobilePay: how it works](https://developer.vippsmobilepay.com/docs/APIs/epayment-api/how-it-works/online/) (primary)
- [Vipps MobilePay: reserve and capture](https://developer.vippsmobilepay.com/docs/knowledge-base/reserve-and-capture/) (primary)
- [Vipps MobilePay: Express](https://developer.vippsmobilepay.com/docs/APIs/epayment-api/api-guide/features/express/) (primary)
- [Vipps MobilePay: order management](https://developer.vippsmobilepay.com/docs/APIs/order-management-api/) (primary)
- [Vipps MobilePay: webhooks](https://developer.vippsmobilepay.com/docs/APIs/webhooks-api/api-guide/) (primary)
- [Vipps MobilePay: priser](https://vippsmobilepay.com/no/priser) (primary)
- [Kustom: how it works](https://docs.kustom.co/checkout/how-it-works/) (primary)
- [Kustom: hosted page](https://docs.kustom.co/checkout/surfaces/hosted-payment-page/) (primary)
- [Kustom: FAQ](https://www.kustom.co/kustom-vipps-faq) (primary)
- [Lovdata: prisopplysningsforskriften](https://lovdata.no/dokument/SF/forskrift/2012-11-14-1066) (primary)
- [Lovdata: angrerettloven § 16](https://lovdata.no/lov/2014-06-20-27/§16) (primary)
- [Lovdata: § 18](https://lovdata.no/lov/2014-06-20-27/§18) (primary)
- [Lovdata: ehandelsloven § 8](https://lovdata.no/lov/2003-05-23-35/§8) (primary)
- [Lovdata: merverdiavgiftsloven § 15-11](https://lovdata.no/lov/2009-06-19-58/§15-11) (primary)
- [Skatteetaten](https://www.skatteetaten.no/bedrift-og-organisasjon/rapportering-og-bransjer/bransjer-med-egne-regler/frivillige-og-ideelle-organisasjoner/mva-for-veldedige-og-allmennyttige-organisasjoner/) (primary)
- [Lovdata: § 9a](https://lovdata.no/forskrift/2012-11-14-1066/§9a) (primary)
- [Lovdata: LOV-2026-06-19-34](https://lovdata.no/dokument/LTI/lov/2026-06-19-34) (primary)
- [Cloudflare: email service](https://developers.cloudflare.com/email-service/) (primary)
- [Cloudflare: bindings](https://developers.cloudflare.com/pages/functions/bindings/) (primary)
- [Cloudflare: limits](https://developers.cloudflare.com/pages/platform/limits/) (primary)

### Survey 20 October 2026 (how an organisation names itself)

- [Peppol BIS Billing 3.0: the ISO 6523 ICD list](https://docs.peppol.eu/poacc/billing/3.0/codelist/ICD/) (primary)
- [Peppol: the electronic address schemes](https://docs.peppol.eu/poacc/billing/3.0/codelist/eas/) (primary)
- [Peppol: participant identifier schemes v9.7](https://docs.peppol.eu/edelivery/codelists/) (primary)
- [schema.org: Organization](https://schema.org/Organization) (primary)
- [EU: VIES VAT number validation](https://ec.europa.eu/taxation_customs/vies/) (primary)
- [GLEIF: the LEI records API](https://api.gleif.org/api/v1/lei-records) (secondary)
- [Lovdata: ehandelsloven](https://lovdata.no/dokument/NL/lov/2003-05-23-35) (primary)
- [Lovdata: enhetsregisterloven 2025](https://lovdata.no/dokument/NL/lov/2025-06-20-105) (primary)
- [Brønnøysundregistrene: organisasjonsnummeret](https://www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/organisasjonsnummeret/) (primary)
- [Riksdagen: lag 2002:562](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2002562-om-elektronisk-handel-och-andra_sfs-2002-562/) (primary)
- [Retsinformation: e-handelsloven](https://www.retsinformation.dk/eli/lta/2002/227) (primary)
- [Finlex: laki 917/2014](https://opendata.finlex.fi/finlex/avoindata/v1/akn/fi/act/statute/2014/917/fin@) (primary)
- [Finlex: laki 244/2001](https://opendata.finlex.fi/finlex/avoindata/v1/akn/fi/act/statute/2001/244/fin@) (primary)
- [Neytendastofa: rafræn viðskipti](https://www.neytendastofa.is/neytendarettur/rafraen-vidskipti/) (primary)
- [Riigi Teataja: ISTS](https://www.riigiteataja.ee/akt/ISTS) (primary)
- [TTJA: e-kaubandus](https://ttja.ee/ariklient/ettevotlus/tarbijakaitsenouded-tegevusalale/e-kaubandus) (primary)
- [Likumi.lv: Informācijas sabiedrības pakalpojumu likums](https://likumi.lv/ta/id/96619-informacijas-sabiedribas-pakalpojumu-likums) (primary)
- [legislation.gov.uk: SI 2015/17 part 6](https://www.legislation.gov.uk/uksi/2015/17/part/6) (primary)
- [legislation.gov.uk: SI 2009/1804 reg. 14](https://www.legislation.gov.uk/uksi/2009/1804/regulation/14) (primary)
- [Irish Statute Book: Companies Act 2014 s.151](https://www.irishstatutebook.ie/eli/2014/act/38/section/151/enacted/en/html) (primary)
- [Service-Public: mentions obligatoires](https://entreprendre.service-public.gouv.fr/vosdroits/F37351) (primary)
- [recherche-entreprises.api.gouv.fr](https://recherche-entreprises.api.gouv.fr/) (primary)
- [LégiMonaco: loi n° 1.383](https://legimonaco.mc/tnc/loi/2011/08-02-1.383/) (primary)
- [BOPA: llei 20/2014](https://documents.bopa.ad/bopa-documents/026065/html/lo26065006.html) (primary)
- [Justel: WVV/CSA](https://www.ejustice.just.fgov.be/eli/wet/2019/03/23/2019A40586/justel) (primary)
- [KBO Public Search](https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html) (primary)
- [wetten.overheid.nl: Handelsregisterwet 2007](https://wetten.overheid.nl/BWBR0021777/2025-07-16) (primary)
- [Legilux: loi du 14 août 2000](https://legilux.public.lu/eli/etat/leg/loi/2000/08/14/n8/consolide/20260510) (primary)
- [gesetze-im-internet.de: § 5 DDG](https://www.gesetze-im-internet.de/ddg/__5.html) (primary)
- [RIS: § 5 ECG](https://ogd.ris.bka.gv.at/Dokumente/Bundesnormen/NOR40025801/NOR40025801.html) (primary)
- [Fedlex: UWG](https://www.fedlex.admin.ch/eli/cc/1988/223_223_223/de) (primary)
- [uid.admin.ch: the UID register](https://www.uid.admin.ch/) (primary)
- [gesetze.li: ECG](https://www.gesetze.li/konso/2003.133) (primary)
- [BOE: Ley 34/2002](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) (primary)
- [WIPO Lex: Decreto-Lei n.º 7/2004](https://wipolex-res.wipo.int/edocs/lexdocs/laws/pt/pt/pt064pt.pdf) (primary)
- [Normattiva: D.Lgs. 70/2003 art. 7](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2003-04-09;70~art7) (primary)
- [legislation.mt: Cap. 426](https://legislation.mt/eli/cap/426/eng/pdf) (primary)
- [taxheaven: Π.Δ. 131/2003 art. 4](https://www.taxheaven.gr/law/%CE%A0.%CE%94.131/2003/arthro/4) (secondary)
- [Diavgeia: organisations open data](https://diavgeia.gov.gr/opendata/organizations.json) (primary)
- [Cyprus Consumer Protection Service: e-commerce](https://katanalotis.org.cy/nomothesia/ilektroniko-eborio/) (primary)
- [Mevzuat: kanun 6563](https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6563.pdf) (primary)
- [Mevzuat: the 2022 e-commerce regulation](https://www.mevzuat.gov.tr/MevzuatMetin/yonetmelik/7.5.39927.pdf) (primary)
- [zakon.hr: Zakon o elektroničkoj trgovini](https://www.zakon.hr/z/199/zakon-o-elektronickoj-trgovini) (secondary)
- [FURS: the register of legal-entity taxpayers](https://www.fu.gov.si/fileadmin/prenosi/DURS_zavezanci_PO.zip) (primary)
- [Sejm: ustawa o świadczeniu usług drogą elektroniczną](https://api.sejm.gov.pl/eli/acts/DU/2024/1513/text.pdf) (primary)
- [e-Sbírka: zákon 89/2012](https://e-sbirka.gov.cz/sb/2012/89) (primary)
- [Slov-Lex: zákon 22/2004](https://static.slov-lex.sk/static/SK/ZZ/2004/22/20250628.html) (primary)
- [Financial Administration of Slovakia: the DIČ list](https://report.financnasprava.sk/ds_dsrdp.zip) (primary)
- [Nemzeti Jogszabálytár: 2001. évi CVIII. törvény](https://njt.jog.gov.hu/jogszabaly/2001-108-00-00) (primary)
- [legislatie.just.ro: Legea 365/2002](https://legislatie.just.ro/Public/DetaliiDocumentAfis/77218) (primary)
- [ANAF: the VAT payer API](https://webservicesp.anaf.ro/api/PlatitorTvaRest/v9/tva) (primary)
- [lex.bg: Закон за електронната търговия](https://lex.bg/laws/ldoc/2135530547) (secondary)
- [Paragraf: Zakon o elektronskoj trgovini (RS)](https://www.paragraf.rs/propisi/zakon_o_elektronskoj_trgovini.html) (secondary)
- [Paragraf: Zakon o zaštiti potrošača (BiH)](https://www.paragraf.ba/propisi/bih/zakon-o-zastiti-potrosaca-u-bosni-i-hercegovini.html) (secondary)
- [Službeni list CG: Zakon o elektronskoj trgovini](https://www.sluzbenilist.me/propisi/301040/download) (primary)
- [UJP: the register of legal entities](https://www.ujp.gov.mk/mk/prebaruvanje_pravni_lica/prikazi?edb=4030000404218) (primary)
- [Tatime: ligji 9920/2008](https://tatime.gov.al/wp-content/uploads/2026/10/Ligj-Nr-9920-Dt-2008.05.19-perditesuar-1.pdf) (primary)
- [Gazeta Zyrtare: ligji 04/L-094](https://gzk.rks-gov.net/ActDetail.aspx?ActID=2811) (primary)
- [dataset.gov.md: the company register](https://dataset.gov.md/dataset/a1f38191-f35c-4180-8d80-297851a08f60) (primary)
- [Rada: Закон «Про електронну комерцію»](https://zakon.rada.gov.ua/laws/show/675-19) (primary)
- [FAOLEX: закон 90-З](https://faolex.fao.org/docs/pdf/blr112499.pdf) (secondary)
- [nalog.gov.ru: open data](https://www.nalog.gov.ru/opendata/) (primary)
- [ConsultantPlus: 149-ФЗ](https://www.consultant.ru/document/cons_doc_LAW_61798/) (secondary)
- [Matsne: the law on electronic commerce](https://matsne.gov.ge/en/document/view/5825902?publication=0) (primary)
- [ARLIS: the law on consumer rights protection](https://www.arlis.am/hy/acts/226867/latest) (primary)
- [WIPO Lex: the Azerbaijani law on electronic commerce](https://www.wipo.int/wipolex/en/legislation/details/9209) (primary)
- [IRS: Publication 557](https://www.irs.gov/pub/irs-pdf/p557.pdf) (primary)
- [Florida Statutes: s. 496.411](https://www.flsenate.gov/Laws/Statutes/2025/496.411) (primary)
- [CRA: official donation receipts](https://www.canada.ca/en/revenue-agency/services/charities-giving/charities/operating-a-registered-charity/issuing-receipts/what-information-must-on-official-donation-receipt-a-registered-charity.html) (primary)
- [Justice Laws: Canada Business Corporations Act](https://laws-lois.justice.gc.ca/eng/acts/c-44/page-2.html) (primary)
- [Profeco: LFPC](https://www.profeco.gob.mx/juridico/pdf/l_lfpc_ultimo_camDip.pdf) (primary)
- [SAT: the article 69-B list](http://omawww.sat.gob.mx/cifras_sat/Documents/Listado_Completo_69-B.csv) (primary)
- [Wikisource: 消費者保護法](https://zh.wikisource.org/wiki/消費者保護法_(民國104年)) (secondary)
- [GCIS: the company register API](https://data.gcis.nat.gov.tw/) (primary)
- [e-Gov: 特定商取引に関する法律](https://laws.e-gov.go.jp/law/351AC0000000057) (primary)
- [NTA: the corporate number site](https://www.houjin-bangou.nta.go.jp/) (primary)
- [NTA: the invoice registration diff files](https://www.invoice-kohyo.nta.go.jp/download/sabun) (primary)
- [law.go.kr: 전자상거래법](https://www.law.go.kr/법령/전자상거래등에서의소비자보호에관한법률) (primary)
- [DART](https://dart.fss.or.kr/) (primary)
- [ABR: ABN lookup](https://abr.business.gov.au/) (primary)
- [ASIC: the Australian company number](https://www.asic.gov.au/for-business-and-companies/companies/register-a-company/australian-company-number-acn/) (primary)
- [python-stdnum](https://github.com/arthurdejong/python-stdnum) (code)

### Survey 21 October 2026 (links, anchors and settings)

- [Gutenberg: the anchor support](https://github.com/WordPress/gutenberg/blob/168e4f4/packages/block-editor/src/hooks/anchor.tsx) (code)
- [Gutenberg: heading anchors from the text](https://github.com/WordPress/gutenberg/blob/168e4f4/packages/block-library/src/heading/autogenerate-anchors.js) (code)
- [Gutenberg: LinkControl](https://github.com/WordPress/gutenberg/tree/168e4f4/packages/block-editor/src/components/link-control) (code)
- [Gutenberg: the accordion's script](https://github.com/WordPress/gutenberg/blob/168e4f4/packages/block-library/src/accordion/view.js) (code)
- [Gutenberg: the block library](https://github.com/WordPress/gutenberg/tree/168e4f4/packages/block-library/src) (code)
- [Elementor: the Advanced tab every widget shares](https://github.com/elementor/elementor/blob/b4ca769/includes/widgets/common-base.php) (code)
- [Elementor: the Menu Anchor widget](https://github.com/elementor/elementor/blob/b4ca769/includes/widgets/menu-anchor.php) (code)
- [Elementor: smooth scrolling under reduced motion](https://github.com/elementor/elementor/blob/b4ca769/assets/dev/scss/frontend/_smooth-scroll.scss) (code)
- [Elementor: the scroll margin under a sticky element](https://github.com/elementor/elementor/blob/b4ca769/assets/dev/js/frontend/utils/anchor-scroll-margin.js) (code)
- [Elementor: the URL control](https://github.com/elementor/elementor/blob/b4ca769/includes/controls/url.php) (code)
- [Kadence Blocks: the table of contents](https://github.com/stellarwp/kadence-blocks/blob/a30a69b/src/assets/js/kb-table-of-contents.js) (code)
- [Kadence Blocks: the navigation's offset and scroll spy](https://github.com/stellarwp/kadence-blocks/blob/a30a69b/src/assets/js/kb-navigation-block.js) (code)
- [Kadence Blocks: the button's link settings](https://github.com/stellarwp/kadence-blocks/blob/a30a69b/src/blocks/singlebtn/block.json) (code)
- [Spectra: the table of contents](https://github.com/brainstormforce/wp-spectra/blob/ea0852c/assets/js/table-of-contents.js) (code)
- [Spectra: the link control](https://github.com/brainstormforce/wp-spectra/blob/ea0852c/src/components/link-control/index.js) (code)
- [Stackable: the table of contents' anchors](https://github.com/gambitph/Stackable/blob/d207f37/src/block/table-of-contents/autogenerate-anchors.js) (code)
- [Stackable: the offset as CSS](https://github.com/gambitph/Stackable/blob/d207f37/src/block/table-of-contents/style.js) (code)
- [GenerateBlocks 2.5.0, the wordpress.org build](https://wordpress.org/plugins/generateblocks/) (code)
- [Webstudio: the URL control](https://github.com/webstudio-is/webstudio/blob/dabaeed/apps/builder/app/builder/features/settings-panel/controls/url.tsx) (code)
- [Webstudio: links resolved at render](https://github.com/webstudio-is/webstudio/blob/dabaeed/packages/react-sdk/src/props.ts) (code)
- [Webstudio: the project audit](https://github.com/webstudio-is/webstudio/blob/dabaeed/packages/project-build/src/runtime/audit.ts) (code)
- [GrapesJS: the component model](https://github.com/GrapesJS/grapesjs/blob/f47fbde/packages/core/src/dom_components/model/Component.ts) (code)
- [GrapesJS: the link component](https://github.com/GrapesJS/grapesjs/blob/f47fbde/packages/core/src/dom_components/model/ComponentLink.ts) (code)
- [Puck: the field types](https://github.com/puckeditor/puck/blob/1839d14/packages/core/types/Fields.ts) (code)
- [Plasmic: the href editor](https://github.com/plasmicapp/plasmic/blob/3254a11/platform/wab/src/wab/client/components/sidebar-tabs/ComponentProps/HrefEditor.tsx) (code)
- [Builder.io: the block renderer](https://github.com/BuilderIO/builder/blob/c4497e9/packages/sdks/src/components/block/block.lite.tsx) (code)
- [Builder.io: the React router](https://github.com/BuilderIO/builder/blob/c4497e9/packages/react/src/blocks/Router.tsx) (code)
- [Silex: internal links](https://github.com/silexlabs/Silex/blob/1fe592f/editor/grapesjs/internal-links.ts) (code)
- [Onlook: the editor's element ids](https://github.com/onlook-dev/onlook/blob/423e2e9/packages/constants/src/editor.ts) (code)
- The settings catalogues of the eleven projects, with the commits read: [SETTINGS.md](SETTINGS.md#sources) (code)

### Survey 23 October 2026 (payment providers)

- [Vipps MobilePay: servers](https://developer.vippsmobilepay.com/docs/knowledge-base/servers/) (primary)
- [Vipps MobilePay: reserve and capture](https://developer.vippsmobilepay.com/docs/knowledge-base/reserve-and-capture/) (primary)
- [Vipps MobilePay: the business portal](https://developer.vippsmobilepay.com/docs/knowledge-base/portal/) (primary)
- [Vipps MobilePay: freestanding card payments](https://developer.vippsmobilepay.com/docs/APIs/epayment-api/api-guide/features/freestanding-card-payments) (primary)
- [Stripe: Apple Pay on the web](https://docs.stripe.com/apple-pay?platform=web) (primary)
- [Stripe: place a hold on a payment method](https://docs.stripe.com/payments/place-a-hold-on-a-payment-method) (primary)
- [Stripe: API keys](https://docs.stripe.com/keys) (primary)
- [Stripe: webhooks](https://docs.stripe.com/webhooks) (primary)
- [Stripe: pricing in Norway](https://stripe.com/en-no/pricing) (primary)
- [PayPal: authorize a payment and capture funds later](https://developer.paypal.com/docs/checkout/standard/customize/authorization/) (primary)
- [PayPal: currency codes](https://developer.paypal.com/api/rest/reference/currency-codes/) (primary)
- [PayPal: move your app to production](https://developer.paypal.com/api/rest/production) (primary)
- [PayPal: merchant fees in Norway](https://www.paypal.com/no/webapps/mpp/merchant-fees) (primary)
- [Kustom: supported methods](https://docs.kustom.co/checkout/surfaces/supported-methods) (primary)
