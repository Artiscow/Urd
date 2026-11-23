# base.css, rule by rule

base.css (`template/assets/styles/base.css`) is loaded by every page, so it carries one-line labels and not prose. Why each rule is as it is stands here, in the file's order, under the selector the note comes before; a label in base.css leads to its note, found under its selector. A note on a single declaration names the property after the selector.

### `:root`

The :root below is Urd's DEFAULT theme as a safe fallback (single values). The site's OWN colors come from content/theme.css (materialized at publish time, loaded right after this file) and the `<style>` injected by theme.js; both win.

### `@supports (color: light-dark(#000, #fff)) { :root`

The default theme follows OS lightness where light-dark() is supported (Baseline 2024), which keeps the first paint from flashing a palette the site does not use. color-scheme makes browser chrome (scrollbar, form fields) match; a manual choice overrides via data-urd-theme (set by theme-init.js before paint). The site's own theme.css wins.

### `html : background`

The canvas background (behind body): on displays with fractional scaling 100vh rounds off and leaves a sub-pixel strip at the bottom where this layer shows. With surface the strip matches the footer and the panels, so it does not read as a dark line.

### `.urd-section`

Section container: the positioning context for block frames. NEVER clips content: blocks may deliberately overhang the section boundary, and the editor and the published page must look identical. The content box carries the design height (the inline min-height render.js writes is a plain length, part of the compatibility surface plugin copies read and overwrite, see SCHEMA.md), and the padding carries the nav clearance (--urd-section-clear, set only on the first section under a menu outside the flow), so the surface keeps its height and the background fills all the way up behind the menu.

### `body:not(.urd-mobile) .urd-section:not(.urd-handoff)`

The content surface (ADR-0018): the section is full window width and owns the background, while the canvas binds the content to the design width and centers it. Block x/w are percentages OF THIS, so the layout stops growing with the screen. The gutter applies only above the mobile breakpoint, so every stored frames.mobile keeps its meaning (the mobile model is its own milestone).

WARNING: this rule must NEVER get transform, filter, perspective, backdrop-filter, contain, container-type or will-change. All seven create a containing block for position: fixed, and would break pinned and viewport-docked blocks (sticky.js). Enforced by tests/canvas.test.mjs.

### `.urd-canvas : position`

ABSOLUTE, not in flow: the section's height is its design height (the inline min-height), and the section toolbar in the editor, sticky and therefore in flow, takes no room in it either (see .urd-section-toolbar). Safe for pinned blocks: only transform, filter and containment create a containing block for fixed, not position. The nav clearance is the section's padding (see .urd-section); the canvas starts below it.

### `body.urd-mobile .urd-canvas, .urd-section.urd-handoff > .urd-canvas`

Mobile auto layout is real document flow, and there the canvas MUST be in flow: the section height is `auto` and driven by .urd-flow inside. The nav clearance is the section's padding on both viewports. A section that shows its phone layout on a desktop page, since its words would be too narrow there (render.js urd-handoff, ADR-0034), is drawn the same way.

### `#urd-nav.urd-nav-float + #urd-root > .urd-section:first-of-type, #urd-nav.urd-nav-overlay + #urd-root > .urd-section:first-of-type`

Nav clearance: a floating or overlay menu sits outside the flow and would otherwise cover the content at the top of the page. The first section gets the clearance variable set to the measured menu height (--urd-nav-h is written by nav.js); the canvas rules above translate it. Menus in flow (sticky/column) need no clearance.

### `html`

Rotated and overhanging blocks must not cause horizontal scrolling. The gutter for the vertical scrollbar is always reserved, so a page that does not scroll has the same width as one that does: the menu and the centred content then sit at the same place on every page (and the page transition below has nothing to morph).

### `.urd-bg-layer`

The background layer fills the section and sits behind the blocks

### `.urd-divider`

Section shape dividers (section.divider): a drawn edge at the top or the bottom of a section, over its background and under its content. The outline is drawn for the bottom edge and turned upside down for the top; it reaches one pixel past the section, so no hairline of the background shows at the seam. On a phone it stands at three fifths of its height.

### `.urd-nav-bg, .urd-footer-bg`

Layered background for nav and footer (shared with sections): a backdrop container behind the content. z-index -1 puts the layers behind the nav/footer content but in front of the element's own surface; overflow clips image layers to the (rounded) edges. The host (.urd-nav / .urd-footer) is a stacking context.

### `html`

Slim scrollbar in the theme colors (matches the editor's, and looks better than the browser default on dark pages)

### `.urd-block`

Blocks are positioned absolutely by render.js (frameToCss)

### `.urd-block[data-urd-width="own"]`

A block with columns or cards lays itself out by its own width (ADR-0025 decision 7; FOLLOWS_WIDTH in push-model.js): its box is the size container urd-block, so a rule for its columns, spacing or pictures asks the block and not the window, a drag narrower shows the narrow layout while it is dragged, and a narrow column of a wide page gets the layout a phone gets. A rule that asks it keeps the window's media query as its twin for a browser without container queries, behind @supports not. Only these block types are containers: like the canvas (see .urd-canvas), a container box would hold a fixed-position descendant, which a plugin block may have.

### `.urd-block[data-urd-width="own"] > :is(.urd-cal, .urd-product, .urd-table, .urd-gallery-grid, .urd-gallery-wall, .urd-gallery-cards, .urd-timeline-box, .urd-stats-box)`

A block drawn at a zoom (its size or its shrink, render.js applyZoom) is laid out in its content's own pixels. The content root of the calendar, the product, the table, the gallery's grid views, the timeline and the stat is the urd-block container itself, so the rules for their columns and cards, which all style elements inside the root, ask the width the content is laid out in, and the layout stays the same at any size. Container units inside them read the same width.

### `.urd-block[data-urd-align="middle"], .urd-block[data-urd-align="bottom"], .urd-block[data-urd-align="stretch"]`

A block with its own height places its content in the box (ADR-0025 decision 3; heightAlign in push-model.js): at the top by default, in the middle, at the bottom, or stretched over the whole box. The box is a grid of one row for the content, so the content keeps its own height and only moves, and stretch gives it the row's height, which the block's own layout then fills. The editing handles and badges are absolutely placed and stay out of the row.

### `.urd-block[data-urd-phone-h]`

A block with a height of its own on the phone (frames.mobile.height, render.js data-urd-phone-h) stands at least that tall, and its content fills the box, so a text's card is as tall as the block: the same grid of one row.

### `.urd-block-ruler`

A block's ruler (blocks/calendar.js): no height and the block's full width, so a ResizeObserver on it hears the width alone and a layout chosen in script by the block's width follows a drag, while the push pass changes the block's height freely.

### `.urd-flow`

The mobile row grid (ADR-0019): 8 px rows that grow with the content (minmax), and eight cell columns between two outer tracks of 5 %, so the cells span the 90 % a block across the row stands in. Untouched blocks are auto-placed in reading order (sparse: they always jump BELOW pinned bands, never into gaps above, and a block in cells shares a line with the one before it where its columns lie to the right of that one's), and pinned blocks get explicit row tracks from render.js. No gap: the row tracks are the coordinate system, so the air under each flow block lives in its margin-bottom, `--urd-mobile-gap` from render.js (the section's own, the site's or 16 px), and the row span holds it; between blocks side by side it lives in their inner margins (render.js phoneCellCss). The row height 8 mirrors MOBILE_ROW in migrate.js, the cell columns PHONE_COLUMNS there.

### `.urd-cell`

A cell of flowing blocks on the phone (render.js): one grid item in its cell columns, its blocks under each other in its whole width

### `.urd-flow > .urd-block, .urd-flow > .urd-stick-slot`

Every block, and the slot a block pinned on the phone leaves, stands across the full row, unless it holds cells (render.js sets its grid-column)

### `.urd-flow:not([data-urd-free-words]) > .urd-cell-words[data-cols="1"]`

A cell holding words too narrow to read well stands across the row as a block without cells does: narrower than about 140 px, reckoned as its cells' share of the row's 90 % at the window's width less half the standard space between blocks (render.js marks it urd-cell-words with its span: a cell of flowing blocks, a block pinned in cells, or the slot of a block pinned while the page scrolls). Important, since its cells stand in its own style. A section with «Force readable text» off on the phone (render.js data-urd-free-words, ADR-0034) has no floor.

### `.urd-block-flow`

Flow block: 90 % width, centered; render.js overrides width and margin for partial placements. position: relative (with no offsets) takes part in the grid as static, and at the same time anchors the editing layer's absolute children (toolbar, resize handles, words mark) to the BLOCK rather than to the flow surface.

### `.urd-block-pinned`

Pinned block: row track and width are set by render.js. No margin: a margin outside the tracks would inflate the rows and shift the coordinate system.

### `.urd-stick-slot`

Blocks pinned on the phone while the page scrolls (render.js stickOnPhone, sticky.phone): a slot of each block's size keeps its place in the row grid, and the blocks stand in a holder in a layer as large as the grid, or reaching down to the section they are released at, where the holder sticks below the menu at the group's offset and lets go at the layer's foot. The layer stands at the desktop pinning's level (FIXED_Z in sticky.js), above the content of the sections it passes and below the menu. The layer and the holder take no pointer; the blocks in them do.

### `.urd-stick > .urd-block`

Each block where its slot stands (render.js placeStuck): its width and its share from the left as in the grid, a block that flows centred

### `.urd-text ul, .urd-text ol`

Content inside text blocks: lists, quotes and links from the formatting bar (the global reset otherwise zeroes list indentation)

### `.urd-text[data-urd-text]`

Long words in a text block's words (ADR-0034, blocks/text.js data-urd-text): kept whole, the standard, or hyphenated at the page's language and broken where a word still does not fit, as the theme's «Long words» says (theme.js wordsVars) or the block's own. The rule holds in the editor as on the published page, in the place of the browser's own breaking for a text being typed in.

### `.urd-text-box`

Text box: a text block with its content in a card (props.box on the text block). Follows the theme's surface color and radius.

### `.urd-text-box : border`

The theme's thin border: visible enough to read as an edge. "Custom color" in the card style overrides it.

### `.urd-text[data-urd-measure] > *`

«Force readable text» on the desktop (ADR-0034, blocks/text.js data-urd-measure): a text's lines wrap at 75 characters of its own font, each paragraph standing by the text's alignment, so the box and a text box's card keep their frame.

### `.urd-text[data-urd-measure] > :is([style*="text-align: center"], [align="center"])`

A paragraph aligned by itself (the text bar writes its alignment on it) stands by its own alignment within the box

### `@container urd-block (max-width: 420px) { .urd-table-table th, .urd-table-table td`

A narrow block (its own width, see urd-block): tighter cells, so more of the table is seen before it scrolls sideways.

### `.urd-audio audio : color-scheme`

The player chrome follows the user's OS theme, like the date picker in the form.

### `.urd-cover`

The cover a third-party frame stands behind until the visitor presses it (embed-cover.js): a card in the site's own colours with the provider named in a corner, the play button in the accent, a line on what loading does and the box that remembers the choice; the owner's own image under it, darkened a little so the words read.

### `.urd-cover : container`

The cover fills the box it is given and never grows it: its own size decides what it has room for (the queries below)

### `.urd-cover-frame`

The owner's picture under the cover's words, in a frame of its own that clips it (picture.js draws its settings)

### `.urd-cover-play`

The button stands above the words and the box, which come before it in the reading order (embed-cover.js)

### `.urd-cover-play : z-index`

Drawn above the cover's picture frame: `order` sets the painting order as well as the place

### `@container urd-cover (max-height: 13em) or (max-width: 15em) { .urd-cover-note`

A small cover keeps the button whole: the line goes first, then the box, then the provider's corner; the button still names the provider and is described by the line

### `.urd-cover.urd-cover-pic`

On the owner's own image the words are light, with a shadow to read on any picture

### `.urd-cal[aria-busy="true"]`

The loading state: quiet bars at the block's height until the calendar's code is in and draws its own design (blocks/calendar.js), shown only once that takes half a second, and the word for a screen reader.

### `.urd-cal-loading : min-height`

On the phone a calendar stands at the height the editor measured there (--urd-loading-h, render.js), unless the session has seen it drawn on this device (the inline min-height, blocks/calendar.js).

### `@supports (grid-template-rows: subgrid) { .urd-product-cardlist > .urd-product-card`

The cards share their rows across the list (subgrid): the picture, the words, the price, the sizes, the colours and the buy button stand at one height in every card of a row, and a card with no sizes or colours leaves that row empty rather than stretching what it has. The badge shares the title's row, above the title's words, or stands over the picture. The picture's row exists only while a card in the list has a picture (urd-product-pictures, product.js). A browser without subgrid shows each card as its own column.

### `@supports (grid-template-rows: subgrid) { .urd-product-cardlist > .urd-product-card > *`

One column: the badge and the title share a row, and neither may open a second column

### `@supports (grid-template-rows: subgrid) { .urd-product-cardlist > :not(.urd-product-card)`

Anything else in the list (the editor's «+ Product» card) spans the cards' rows, so its own height never stretches one of them

### `@supports (grid-template-rows: subgrid) { .urd-product-cardlist > .urd-product-card > .urd-product-badge`

The children take their rows by what they are, so a missing part leaves its row to the others

### `@supports (grid-template-rows: subgrid) { .urd-product-cardlist.urd-product-pictures > .urd-product-card > .urd-product-badge-over`

Positioned in the picture's grid area, so its offsets count from the picture's corner: 8 px, where the card's padding and the 22 px of .urd-product-badge-over meet

### `.urd-product-buy.urd-product-buy-wait`

A buy button waiting for its product's choices (disableUntilChosen, product.js holdBuy): greyed and inert until they are made

### `.urd-cart-dialog[open]`

display is set ONLY in the open state: a display value on the dialog itself would override the browser's dialog:not([open]) { display: none } and show the drawer permanently.

### `.urd-draft-view`

The draft view's mark (?draft=1): the owner's unpublished changes are on the page, in this browser only.

### `@media print { html.urd-print-order body > :not(:has(.urd-checkout-confirmation)), html.urd-print-order #urd-root > :not(:has(.urd-checkout-confirmation)), html.urd-print-order .urd-section:has(.urd-checkout-confirmation) > :not(:has(.urd-checkout-confirmation)), html.urd-print-order .urd-canvas:has(.urd-checkout-confirmation) > :not(:has(.urd-checkout-confirmation)), html.urd-print-order .urd-checkout > :not(.urd-checkout-confirmation)`

Printing an order: the confirmation alone, at the top of the sheet, in black on white. Everything beside the confirmation's own ancestors is left out, and those ancestors are taken out of the canvas's absolute layout, so the confirmation stands at the top of the first sheet at the sheet's width.

### The help chip (no rule here: engine/hint.js)

The help chip (ADR-0008) styles itself: engine/hint.js injects its own style tag, so the chip can never end up unstyled with an outdated base.css.

### `.urd-anim-fade-in, .urd-anim-slide-up, .urd-anim-zoom-in`

Animations (Urd.animations). Entrance animations start invisible and slide in when .urd-anim-in is set (IntersectionObserver in animations/ core.js). Duration and delay are set as CSS variables per element. Blocks with rotation carry an inline transform that wins: there only the opacity part plays, deliberately.

### `.urd-section.urd-anim-hover-lift:has(.urd-sticky-able):hover`

A section that holds a pinned block does not lift: a transformed section is the containing block of its fixed children, so the pin would follow the section instead of the window (sticky.js stands still under a transform).

### `.urd-anim-fade-in.urd-anim-hover-lift`

Combination: a block with BOTH an entrance animation AND "Lift on hover". Without this the hover-lift rule (later in the CSS) overrides the entrance transition, so opacity and shape jump instead of fading or sliding in. Here the transition covers both the entrance (duration, delay) and hover (box-shadow). Fade-in does not use transform for the entrance, so there the hover lift is snappy (0.2s); slide and zoom share the entrance duration.

### `.urd-anim-slide-up.urd-anim-hover-lift:hover, .urd-anim-zoom-in.urd-anim-hover-lift:hover`

On hover a fast transform applies, so the lift starts immediately even when the entrance delay variable sits on the element (a briefly offset start); the entrance itself rarely hits an element that is already under the pointer.

### `@media (prefers-reduced-motion: reduce) { .urd-gallery-slide, .urd-bg-slide`

Gallery and background cross-fades: the JS refuses to play anything automatically under reduced motion; this also removes the fade itself when paging manually in the slideshow view.

### `.urd-collection[aria-busy="true"], .urd-product[aria-busy="true"]`

The collection block (ADR-0007): three views over structured entries. The inner layout is flow and grid, never frames per entry.

### `.urd-collection[aria-busy="true"], .urd-product[aria-busy="true"]`

A collection or product block is busy while it fetches its entries; on the phone it stands at the height the editor measured there (--urd-loading-h, render.js), so the page below does not jump.

### `.urd-collection-imgwrap`

The image wrapper: the frame owns shape and rounding, and clips the zoom crop

### `:where(.urd-pic-turned, .urd-pic-look-vintage, .urd-pic-overlaid)`

A picture's settings beyond the focus point, zoom and adjustments (picture.js). The turn (quarter turns, flips, straightening) is drawn on a wrapper around the image, so the zoom keeps its focal point inside it; a quarter turn lays the wrapper across its frame, which is then a size container for it. The vintage look's vignette and the overlay are drawn over the picture inside its frame, which isolates them; the duotone is a filter on the picture (an SVG gradient map, picture.js). The frame is placed for its layers only where it has no place of its own (:where), so a frame laid over its box (the embed cover's) stays where it is.

### `.urd-pic-turned.urd-pic-turned > .urd-pic-turn > img`

Over the views' own image sizes (a ribbon's image is as wide as it is), so the turned image fills its wrapper

### `.urd-pic-look-vintage::before`

The vintage tone's vignette, as the slideshow lays it over its pictures

### `.urd-lightbox-able`

Image block with a lightbox: a zoom cursor for visitors and in Clean view; with chrome on, editing owns the click, so the cursor is neutral there.

### `.urd-gallery`

The gallery block: three views (grid/carousel/slideshow) over the same image list. The tiles are clipping frames (like .urd-image-frame); clickable tiles are button/a without any button styling of their own.

### `.urd-gallery-cards > .urd-gallery-tiles`

Polaroid: each picture set in a card with a wider foot, leaning by its own throw of the seed (--urd-card-tilt from the block). The card is white with dark ink until the owner picks a colour (--urd-polaroid-color); then the words take the section's text colour. The grid's own padding gives the leaning corners room inside the block.

### `.urd-ribbon-stripe : overflow`

clip rather than hidden: a clipped flex item keeps its content as its smallest height, so the words are never squeezed to nothing. The width is the band's, never the track's.

### `@supports (mask-image: linear-gradient(90deg, transparent, black)) { .urd-ribbon-fade`

The soft edges: the words are not cut off with a hard line. The mask is gated, since without it the band simply keeps its straight edges.

### `.urd-ribbon-motion-step .urd-ribbon-track`

Step: the same period in as many jumps as there are items, each landing on a word (the block measures the stops into keyframes of its own and sets a step-end timing; the duration is the dwell per item). The roll stands in until the first measurement.

### `.urd-ribbon-motion-none .urd-ribbon-track`

Still: the words stand as one centred row, and there is no copy to hide.

### `.urd-ribbon-pausable:hover .urd-ribbon-track, .urd-ribbon-pausable:focus-within .urd-ribbon-track`

The pointer and the keyboard both hold the band, so a word can be read.

### `.urd-ribbon, .urd-gallery-ribbon`

The pause that stays (bandPauseControl in blocks/ribbon.js): the class on the band's box holds every track in it, and the button stands at the box's right edge in the band's own ink. In the touch form the button is drawn only while it has focus, which only the keyboard can give a one-pixel button; a touch on the band pauses it there.

### `.urd-ribbon-still .urd-ribbon-track`

Still: nothing to move, or reduced motion. The words then stand as a row that is clipped at the edge, never hidden.

### `.urd-ribbon-wide`

A band that reaches past its block, across the content surface or the window (fitBandReach in blocks/ribbon.js): the block measures the canvas or the section and sets the width and the offset, since vw would count the scrollbar as well.

### `html:has(dialog:modal), body:has(dialog:modal)`

Scroll lock while a modal dialog is open (the lightbox today, and any future showModal surface automatically): native :has()/:modal instead of JS bookkeeping of body.style.overflow. Without :has support (outside the baseline tail) only the lock is missing; the dialog itself still works.

### `.urd-lightbox`

Lightbox (engine/lightbox.js): full-screen viewing for visitors and in Clean view. Dark whatever the theme is: it is a photo viewing room, not a themed surface.

### `.urd-lightbox`

Native `<dialog>` (showModal): top layer, so no z-index is needed. The UA styles for margin/border/padding/max are zeroed; the dark background is ::backdrop. display is gated on [open] so it never shows between appendChild and showModal.

### `.urd-lightbox-img.urd-lightbox-across`

A picture given a quarter turn lies across the view, so its largest width and height swap

### `.urd-placeholder`

Placeholder for unknown types: neutral, never destructive

### `.urd-nav`

Navigation

### `.urd-nav : --urd-nav-base-pad`

The base padding: an explicit thickness (--urd-nav-pad-y, inline from nav.js, ADR-0023) wins over the size preset (--urd-nav-size-pad from urd-nav-size-*); the pill scales only the preset, so size and variant compose. --urd-nav-shrink is the scroll shrink (set on the nav by the host's compact state): factor 1 when not shrunk.

### `.urd-nav : --urd-nav-px`

The side padding: an explicit value (--urd-nav-pad-x, inline) or the fluid clamp. The mobile panel and the side-to-bar fallback read the same variable, and the inset rule below raises it to the content edge.

### `.urd-nav : --urd-nav-font`

The text size the same way: an explicit value (--urd-nav-text-size, inline from nav.js) wins over the size preset, and the scroll shrink scales whichever applies. Text and item spacing tighten at half the padding's rate: the padding can halve without harm, while the same factor on the text would leave it unreadable.

### `.urd-nav : background`

Background and blur live in variables (set by nav.js from nav.style): submenus and the mobile panel reuse the same surface as the menu itself. Blur has to go through a custom property because backdrop-filter does not inherit.

### `.urd-nav : position`

Anchor point for the mobile panel, and its own stacking context so dropdowns and the panel sit above following content even when the menu is not sticky

### `.urd-nav::before`

The blur is drawn by a pseudo-element behind the content, not by the nav itself: an element with backdrop-filter is the backdrop root for its descendants, so a submenu inside a blurred nav would only ever see the bar, never the page behind it. The pseudo sits below the layer backdrop (.urd-nav-bg) in paint order, so the layers are drawn over the blur.

### `.urd-nav-side-host .urd-nav::before`

The column scrolls its own content, so the blur stays on the column itself.

### `.urd-nav-sticky`

Sticky menu: sticky lives on the host (the header element), which may leave its place in the flow - the nav itself may not (see nav.js)

### `.urd-nav-sticky : z-index`

Above the content: it should slide under the menu, not through it

### `.urd-nav-announce`

The announcement bar (nav.announcement): a strip above the menu inside the host, on the accent by default (colours set inline by nav.js from the fields). With sticky false the host sticks only once the strip has scrolled past: its sticky top is raised by the measured strip height.

### `.urd-nav-announce : z-index`

Above the bar in every context (the preview lifts the bar to 100001): the bar's top pixel and a logo that grows out of the bar never paint over the strip.

### `.urd-nav-announce : padding`

One pixel under the bar's top edge, so a fractional zoom in the editor's preview leaves no hairline seam between the two surfaces.

### `.urd-nav-announce-close`

The visitor's cross (announcement.dismiss): at the right edge, the text keeps its centre.

### `.urd-nav-announce:has(.urd-nav-announce-close)`

Room for the cross on both sides, so the text stays centred and never runs under it on a narrow screen.

### `.urd-nav-sticky.urd-nav-announce-scroll:not(.urd-nav-float, .urd-nav-overlay, .urd-nav-side-host)`

Only a host in the flow: a fixed host (floating, overlay, the side column) never scrolls, so it keeps the strip.

### `.urd-nav-float .urd-nav-announce`

The strip spans the full width above the floating pill, which is centred inside the same host.

### `.urd-nav-scroll`

Scroll behavior (nav.scroll, the state classes are set by nav.js from pure navScrollState): 'hide' slides the host out past the top with translate (compositor, never top/margin), 'shrink' shrinks the padding via the --urd-nav-shrink factor (a one-off transition, not scroll driven). The transitions live on the mode class, so menus without scroll behavior never get a transition.

### `.urd-nav-hidden : translate`

Extra clearance so the shadow and glow follow it out of view

### `.urd-nav-announce-keep.urd-nav-hidden`

nav.announcement.followNav false (the default): the strip stays put while the menu slides out. The slide moves to the menu, which travels its own height plus the strip's, so it clears the strip it passes behind. The band the host still occupies takes no pointer events, so the page under it stays reachable; the strip itself takes them back.

### `.urd-nav-compact .urd-nav`

The compact factor lives on the nav (the host carries the state class): nav.style.shrinkTo sets --urd-nav-shrink-to inline on the nav, and the logo image reads --urd-nav-shrink from there.

### `.urd-nav-logo img : --urd-logo-size`

The drawn size derives from the base (--urd-logo-base, inline from nav.js), so the scroll shrink below can scale it.

### `.urd-nav-logo img : margin-block`

Large logos grow OUT of the bar (into the padding and the content below), not the bar itself - the menu height is not driven by the image. The margin scales with the image height, so the contribution to the bar height is constant at any size (the fixed part is calibrated against the 2rem logo).

### `.urd-nav-shrink-logo .urd-nav-logo img`

The logo image follows the scroll shrink (nav.style.shrinkLogo): the same factor as the padding, 1 outside the compact state.

### `.urd-nav-list : align-self`

The list spans the inner height of the bar and centers the items itself: items with a submenu can then stretch to full height, so the submenu's top: 100 % lands EXACTLY on the bottom of the bar (never on top of it, even when the tool cluster is taller than the text items)

### `.urd-nav-list : gap`

The item spacing (nav.style.gap, inline from nav.js); the mobile panel and the column list keep their own gap.

### `body:not(.urd-mobile) .urd-nav:not(.urd-nav-mobile) .urd-nav-list a, body:not(.urd-mobile) .urd-nav:not(.urd-nav-mobile) .urd-nav-toggle span`

Horizontal menu items never wrap inside the label: when space runs short, nav.js folds the whole list into the burger (content-aware folding) instead of letting long items break across several lines. The mobile panel (a column) keeps normal wrapping - there the rows are full width.

### `.urd-nav-center .urd-nav-list`

Placement of the menu items (nav.layout): the logo always comes first. right is the default, achieved with space-between.

### `.urd-nav-list a:hover, .urd-nav-list a:focus-visible`

The hover text color can be overridden (nav.style.hoverTextColor); the default is the accent color

### `.urd-nav a:focus-visible, .urd-nav button:focus-visible`

Visible keyboard focus on everything interactive in the menu

### `.urd-nav-tools`

The tool cluster at the far right: light/dark toggle and burger. An empty cluster (no alternate theme, desktop) is hidden entirely, so the menu list still ends flush with the edge.

### `body:not(.urd-mobile) .urd-nav:not(.urd-nav-mobile) .urd-nav-tools-none`

A cluster with nothing but the burger takes no room on desktop, where the burger is hidden (the class comes from nav.js: the burger is always there, so :empty never matches)

### `.urd-nav-right .urd-nav-list`

With the tool cluster after the list, placement has to be driven by auto margins, not space-between (three children would be spread evenly apart)

### `body.urd-mobile .urd-nav-no-logo:not(.urd-nav-tools-start) .urd-nav-tools, .urd-nav-mobile.urd-nav-no-logo:not(.urd-nav-tools-start) .urd-nav-tools`

A bar without its logo (nav.logo.show false): on the phone, where the list has left the row, the burger keeps its outer edge

### `.urd-nav-tools-start .urd-nav-tools`

The tool cluster at the start (nav.style.tools.side): before the logo, so the burger sits on the left on mobile; the auto margin then belongs on the list

### `.urd-nav-launcher-wrap`

The link launcher (nav.launcher): a grid button first in the cluster with the links as a grid of tiles under it. The wrapper is the positioning context for the disclosure branch; the popover branch is placed against the button's anchor name and lives in the top layer, so it needs no positioned ancestor.

### `.urd-nav-launcher-btn svg`

The icons from the library are drawn at 100 % of their parent (icons.js), so the button sets the size the same way the cart does.

### `.urd-nav-launcher`

The panel takes the submenu's surface, so the launcher reads as part of the menu rather than as a page element. Any number of shortcuts is allowed, so the panel scrolls rather than growing past the viewport. Its width, the marks and the names follow the size's scale (--urd-launcher-s), or each its own px value (--urd-launcher-w, -icon, -text; launcherVars in nav-model.js).

### `.urd-nav-launcher-btn-img`

The owner's own mark on the button, in place of the nine dots.

### `.urd-nav-launcher-wrap.open .urd-nav-launcher`

The disclosure branch: a box under the button, inside the nav.

### `.urd-nav-tools-start .urd-nav-launcher-wrap.open .urd-nav-launcher, .urd-nav-side-host-left .urd-nav-launcher-wrap.open .urd-nav-launcher`

A cluster at the start, and the left column: the grid opens to the right.

### `@supports (anchor-name: --a) { .urd-nav-launcher[popover]`

The popover branch: the top layer, placed under the button by the anchor and flipped away from the viewport edge by the browser.

### `.urd-nav-launcher-grid`

The three designs (nav.launcher.view, and mobileView in the mobile menu) share one markup: the class on the list decides the shape, so the desktop panel and the mobile section can stand in different designs at once.

### `.urd-nav-launcher-missing`

A shortcut whose target is not a usable link: the tile stands, dimmed, so the owner sees the row is unfinished rather than losing it.

### `.urd-nav-launcher-name`

A name never sets the panel's or a column's width: it takes the width its tile has (contain: inline-size), and a name too long for it is cut with an ellipsis or folded onto more lines (nav.launcher.longNames). The grid's name stretches across its tile, the list's fills the row beside the mark, and the cover's spans its card already.

### `.urd-nav-launcher-view-grid`

Grid: three columns of tiles, the mark on a soft plate over the label.

### `.urd-nav-launcher-view-list`

List: one row per shortcut, the full name beside a small mark.

### `.urd-nav-launcher-view-cover`

Cover: two columns of cards where the image fills the tile and the name lies on a scrim along the bottom. A shortcut without an image keeps its drawn mark in the middle of the card.

### `.urd-nav-launcher-view-cover .urd-nav-launcher-link:not(.urd-nav-launcher-photo) .urd-nav-launcher-name`

Without an image there is no photo for white text to sit on.

### `.urd-nav-launcher-title`

The title above the grid in the mobile menu; the button's own label is its accessible name instead.

### `.urd-nav-theme`

The light/dark toggle (shown only when the theme has an alternate counterpart)

### `.urd-nav-cart`

The cart in the menu (nav.cart): the same expression as the theme toggle, with a count badge at the top right.

### `.urd-nav-cart + .urd-nav-theme, .urd-nav-cart + .urd-nav-launcher-wrap, .urd-nav-cart + .urd-nav-burger`

The clearance towards the next tool sits on the neighbor: the badge hangs outside the button, and a cart last in the cluster should sit flush.

### `.urd-nav-burger`

The burger (the mobile menu opener): hidden on desktop, shown via body.urd-mobile

### `.urd-nav-has-sub`

Submenus (disclosure): the item is a link plus a caret button (split) or a single button with title plus caret (toggle); the caret flips when the menu is open

### `.urd-nav-has-sub : align-self`

Full bar height (see .urd-nav-list): the submenu is anchored to the item's bottom edge, and that edge has to be the bottom of the bar

### `.urd-nav-sub : top`

Anchored BELOW the bar, not directly below the menu item: the item is centered in the bar, so top: 100% alone would land inside it (over the nav text)

### `.urd-nav-sub : --urd-nav-sub-pad-y`

The padding as two variables, so the second level can stand clear of the panel (below)

### `.urd-nav-sub : background`

Its own surface variable: by default only the color veil, never the background image (nav.style.subImage turns the image on; nav.js sets the variable)

### `.urd-nav-sub : backdrop-filter`

The variable inherits from the nav, also when nav.style turns the blur off

### `.urd-nav-sub : box-shadow`

The shadow must only fall downwards: the card sits flush with the bottom of the bar, and a blur without negative spread would bleed upwards and lay a dark band across the bar. Always black-based: a text-colored shadow becomes a bright halo in a dark theme, and the dropdown should match the bar, which has none.

### `.urd-nav-right .urd-nav-sub`

With the menu items on the right, the submenu has to stay inside the edge

### `.urd-nav-sub-flat .urd-nav-sub`

Submenu design (nav.style.subStyle): the default is the card above (card); the variant class sits on the nav element. The column count (--urd-nav-sub-cols) is set by nav.js and works in every variant.

### `.urd-nav-sub-pills .urd-nav-sub a, .urd-nav-sub-pills .urd-nav-sub .urd-nav-toggle : background`

Its own pill color (nav.style.subPillColor) with the submenu surface as the default; the shadow falls downwards only (see the card above)

### `.urd-nav-sub-pills .urd-nav-sub .urd-nav-toggle`

An opener without a page of its own is the pill itself, its arrow at the end

### `.urd-nav-sub-pills .urd-nav-sub .urd-nav-has-sub`

A row with its own submenu keeps its arrow inside the pill: the link and the caret share one grid cell, the caret at the pill's end over the link's wider right padding. A submenu that stands in the flow (the phone menus, the column) is placed in the row under it by itself; one that opens beside the panel keeps no grid line, so it is placed from the row.

### `.urd-nav-sub-flyout .urd-nav-has-sub`

Flyout: the submenu spans the full menu width. The item stops being the anchor (position: static), so the nav itself (position: relative) becomes the container, and top: 100% lands right below the bar.

### `.urd-nav-sub-flyout .urd-nav-sub : box-shadow`

The shadow must only fall downwards: negative spread keeps the blur from bleeding upwards and laying a dark band across the bar itself

### `body.urd-mobile .urd-nav-list, .urd-nav-mobile .urd-nav-list`

Mobile menu: the burger replaces the list; an open list becomes a column panel below the menu with its own surface (--urd-nav-sub-bg, without the background image), and the submenus become static accordions instead of floating boxes. (A side column in narrow windows needs no rules of its own: nav.js renders it as an ordinary top bar - effective variant bar - below 900px.) The twin selectors .urd-nav-mobile (a class on the nav, set by nav.js from the ACTUAL width) give the burger in the preview's desktop mode too, where body.urd-mobile is owned by the editor's viewport choice - always keep them together in the same rule block.

### `body.urd-mobile .urd-nav-list a, .urd-nav-mobile .urd-nav-list a : border-radius`

The hover pill's 999px radius must not apply to full-width mobile rows

### `body:not(.urd-mobile) .urd-nav:not(.urd-nav-mobile) .urd-nav-sub-self`

With collapsed submenus an item opens its submenu on mobile instead of navigating, so its own page sits first in the submenu there; on desktop the item is the link, and the entry is hidden.

### `body.urd-mobile .urd-nav-malign-center .urd-nav-list a:not(.urd-nav-launcher-link), body.urd-mobile .urd-nav-malign-center .urd-nav-toggle, .urd-nav-mobile.urd-nav-malign-center .urd-nav-list a:not(.urd-nav-launcher-link), .urd-nav-mobile.urd-nav-malign-center .urd-nav-toggle`

Text alignment of the items in both phone menus (nav.style.mobileAlign). The arrow follows it as in the side column: on the left of right-aligned text, and at the edge beside centred text, so it never pushes the words off the middle. The submenus give up their indent from the left, and the launcher's tiles keep the design of their own.

### `body.urd-mobile .urd-nav-malign-center .urd-nav-desc, .urd-nav-mobile.urd-nav-malign-center .urd-nav-desc`

An item's description is a box of its own width (max-width in the menu item options below), so the box moves with the text, not only the text.

### `body.urd-mobile .urd-nav-msub-arrow-off .urd-nav-has-sub > .urd-nav-caret, body.urd-mobile .urd-nav-msub-arrow-off .urd-nav-has-sub > .urd-nav-toggle svg, .urd-nav-mobile.urd-nav-msub-arrow-off .urd-nav-has-sub > .urd-nav-caret, .urd-nav-mobile.urd-nav-msub-arrow-off .urd-nav-has-sub > .urd-nav-toggle svg`

No arrow on a submenu in the phone menus (nav.style.mobileSubArrow false): a closed submenu opens from its item, and an opener whose submenu stands open from the start reads as a heading (nav.js marks it aria-disabled).

### `body.urd-mobile .urd-nav-sheet-bar-bare > .urd-nav-tools > :is(.urd-nav-theme, .urd-nav-cart, .urd-nav-links), .urd-nav-mobile.urd-nav-sheet-bar-bare > .urd-nav-tools > :is(.urd-nav-theme, .urd-nav-cart, .urd-nav-links)`

The bar alone beside the full-screen menu (nav.style.sheetBarTools false): the theme button, the cart and the site's links leave the phone's bar and stand in the menu's foot, which nav.js moves them into while it is open.

### `.urd-nav-launcher-row`

The link launcher in the mobile menu: the grid is a section at the foot of the list, since the mobile view hides the cluster's button along with the rest of the desktop menu. The section travels into the full-screen sheet with the list.

### `body.urd-mobile .urd-nav-list .urd-nav-launcher-link, .urd-nav-mobile .urd-nav-list .urd-nav-launcher-link`

The tiles keep their own shape: the mobile rows turn every menu link into a full-width block, which would flatten the designs.

### `.urd-nav-launcher-more`

Any number of shortcuts is allowed, and the mobile menu is the page's own list: the first mobileMax stand open and the rest are a native fold that opens in place, so the menu never runs away in length.

### `.urd-nav-sheet`

Full-screen mobile menu (nav.style.mobileMenu sheet): a native `<dialog>` in the top layer that the menu list moves into while it is open (nav.js). It covers the whole viewport, so the panel rules above never apply; the mobile row and accordion rules still do, since the dialog sits inside the nav. The UA's dialog colours are replaced by the sheet's own surface (nav.style.sheet, set inline by nav.js) or else the nav's veil, blur and text colour, and display is gated on [open] so the closed dialog stays hidden.

### `.urd-nav-sheet > .urd-nav-announce`

The announcement moved into the full-screen menu (nav.style.sheetAnnounce): a full-width band above the head, as it is above the bar.

### `.urd-nav-sheet::backdrop`

The sheet itself covers the page, so the backdrop adds nothing.

### `.urd-nav-sheet-from-bottom[open]`

The entrance (nav.style.sheetMotion): a slide from one of the four edges, a fade, or none.

### `.urd-nav-sheet-head`

The head holds the logo (when it moves along) on the left and the cross on the right; the foot holds the theme and cart buttons as labelled outlines.

### `.urd-nav-tool-label`

The tool labels exist for the sheet's foot only, and only as an option (nav.style.sheetToolLabels); the bar and the plain foot show the icons.

### `.urd-nav-sheet-body : overscroll-behavior`

Touch scrolling never chains to the page behind the open sheet.

### `.urd-nav-sheet[open] .urd-nav-list`

[open] lifts the specificity above the twin rules that hide the list on mobile. The list centres itself in the remaining height with auto margins, so a long menu still scrolls from its top.

### `.urd-nav-float`

Floating variant (nav.variant): a detached pill with air towards the edges. The host (header) is still sticky at full width; the pill is centered inside it and therefore sticks with air above it.

### `.urd-nav-float`

The host leaves the flow when the pill floats: the content starts at the top and the pill hovers over the hero. Sticky gives fixed (it follows on scroll), otherwise absolute (it stays behind at the top). pointer-events pass through the strips beside the pill, so the content behind can be clicked.

### `.urd-nav-overlay`

Overlay (nav.overlay, variant bar only): the full-width bar leaves the flow and is laid over the top section, so the top section's background fills all the way up and a transparent menu reveals the hero behind it. Sticky becomes fixed, like float.

### `.urd-nav-var-floating : --urd-nav-base-pad`

Padding through the base variable, not padding-block: the logo image's negative margin trick is calibrated against --urd-nav-pad and has to follow it. The pill scales the size preset down, so the size choice composes; an explicit thickness is drawn as set. The width is nav.style.pillWidth (inline from nav.js) or 1100px, the rounding nav.style.radius (inline from nav.js) or the variant's preset.

### `.urd-nav-var-floating.urd-nav-square`

The square variant (nav.variant floating-square): the pill without rounding

### `.urd-nav-var-floating.urd-nav-tab`

The tab variant (nav.variant floating-tab): a square top, only the two lower corners rounded - it hangs down from the top. Inherits the air above and the side margin from the base; with topGap: false (urd-nav-flush) it becomes a hanging header.

### `.urd-nav-clear .urd-nav`

Transparent at the top (nav.style.atTop 'clear'): until the page has left the top zone the menu draws no surface, blur, border or shadow, and the layer backdrop is hidden; they appear with urd-nav-scrolled (nav.js). The rules set the properties themselves, not the variables, since nav.js writes the surface variables inline.

### `.urd-nav-clear.urd-nav-scroll .urd-nav`

With the scroll shrink the surface fade joins the shrink's own transition (the two rules have the same specificity, and the later one wins whole)

### `.urd-nav-glow`

Glow around the pill: opt-in (off by default)

### `.urd-nav-var-floating.urd-nav-flush`

Without air above: the pill sits right at the top (nav.style.topGap: false)

### `.urd-nav-size-sm`

Four sizes (nav.style.size): md is the default and needs no class. The preset padding also drives the logo calibration and the submenu anchor, so everything follows the size; an explicit thickness or text size (inline from nav.js) overrides the preset.

### `.urd-nav-border-bottom, .urd-nav-border-top, .urd-nav-border-both, .urd-nav-border-all`

Border (nav.style.border): the side is the class, the width and colour are variables from nav.js; the default is a hairline in the text colour.

### `.urd-nav-shadow-soft`

Shadow (nav.style.shadow) under the top bar; the pill has its glow instead.

### `body:not(.urd-mobile) .urd-nav-inset`

Inset (nav.style.inset, ADR-0023): the bar's contents line up with the content edge of the sections (the same rule as .urd-canvas: the larger of the gutter and the margin the design width leaves), while the bar's background keeps the full width. Desktop only, like the canvas gutter.

### `.urd-nav-side-host`

Side menu (nav.variant side-left/side-right): a fixed column along the edge; body gets content padding on the same side (urd-side-*). Sticky is irrelevant here - the column is always fixed.

### `.urd-nav-side-host : top`

Below an announcement fixed across the whole page (place 'page').

### `.urd-nav-side-host : display`

A column: the announcement strip takes its own height at the top and the menu fills the rest, so the tools at the menu's foot stay on screen.

### `.urd-nav-side-host : width`

The width is driven by nav.style.width through the variable (set by nav.js on body, so the content padding below reads the same value)

### `.urd-announce-page`

The announcement placed across the whole page (nav.announcement.place 'page', side variants): a fixed strip above column and content, both of which start below it by its measured height.

### `.urd-announce-content`

Placed above the content beside the column ('content'): in the flow, inside the body's side padding, scrolling with the page.

### `.urd-nav-side-host .urd-nav-list`

Column direction: the auto margins from the top-bar layout are reset

### `.urd-nav-side-host .urd-nav .urd-nav-list a`

Extra specificity on purpose: the column row has to win over the hover styles' display and padding (they come later in the file)

### `.urd-nav-side-host .urd-nav-tools`

The tool cluster (toggle) at the bottom of the column, or at its top with tools.side start; tools.align sets the row's alignment.

### `.urd-nav-side-host.urd-nav-tools-align-spread .urd-nav-tools:has(> :nth-child(2):last-child)`

Spread with a single tool: centred, since there is nothing to spread

### `.urd-nav-side-host.urd-nav-side-subs-open:not(.urd-nav-side-sub-arrow) .urd-nav-has-sub > .urd-nav-caret, .urd-nav-side-host.urd-nav-side-subs-open:not(.urd-nav-side-sub-arrow) .urd-nav-has-sub > .urd-nav-toggle svg`

Submenus open from the start (sideSubs expanded): without the arrow the caret and the opener's chevron are gone and the opener reads as a heading.

### `.urd-nav-side-host .urd-nav-has-sub`

Submenus become accordions in the column (as in the mobile panel)

### `.urd-nav-side-host .urd-nav-logo img`

The logo image's negative margin trick applies to the top bar, not the column

### `.urd-nav-side-host .urd-nav-splace-middle .urd-nav-list`

Vertical placement in the column (nav.style.sidePlacement): the default is the top, independent of nav.layout (a top-bar concept). The auto margins distribute the remaining space; the tool cluster drops its auto margin so the list is in charge.

### `.urd-nav-side-host .urd-nav-sub-pills .urd-nav-sub a`

Pill items and the underline list apply to the column accordion too; the column row's radius and padding (the extra specific rule above) have to be overridden here, later in the file with the same specificity

### `.urd-nav-side-host .urd-nav-salign-center .urd-nav-list a, .urd-nav-side-host .urd-nav-salign-center .urd-nav-toggle`

Text alignment of the items in the column (nav.style.sideAlign)

### `.urd-nav-side-host .urd-nav-salign-center .urd-nav-desc`

An item's description is a box of its own width, so it moves with the text.

### `.urd-nav-side-host .urd-nav-salign-right .urd-nav-has-sub > .urd-nav-caret`

The submenu caret follows the text alignment in the column: right-aligned text puts the caret on the LEFT side; centered text is centered without the caret pushing it (the caret is placed absolutely at the edge).

### `body.urd-mobile .urd-nav-side-host`

On mobile a side menu falls back to the top bar with a burger: the column becomes an ordinary sticky top bar and the body padding is removed. (Narrow windows below 900px are handled in nav.js: effective variant bar, no rules of their own.)

### `body.urd-mobile .urd-nav-var-floating.urd-nav-open .urd-nav-list, .urd-nav-mobile.urd-nav-var-floating.urd-nav-open .urd-nav-list`

The mobile panel hangs flush below the pill as one continuous surface: only the lower corners are rounded, and the pill flattens its lower corners while the panel is open (longhands, so the top shape of each variant survives).

### `.urd-nav-logo-center > .urd-nav-logo`

The logo in the phone's bar (nav.style.mobile.logo; the classes come from navClasses at the mobile breakpoint only): in the middle of the bar, or out of it. A logo in the middle stands out of the row, so the tool cluster keeps its outer edge as in a bar without a logo, and its picture needs no margin to keep the bar's height. In the full-screen menu's head the logo stands as always.

### `body.urd-mobile .urd-nav:not(.urd-nav-tools-start) > .urd-nav-tools, .urd-nav-mobile:not(.urd-nav-tools-start) > .urd-nav-tools`

On the phone the links wait behind the burger, so the burger and its buttons stand at the bar's edge, as the desktop keeps its buttons, whatever the desktop's placement; the phone's own placement (nav.style.mobile.layout, urd-nav-mplace-* from navClasses at the breakpoint) puts them right after the logo (at the bar's start where no logo stands in the row) or in the middle of the room beside it. A centred logo keeps them off the middle, and buttons before the logo keep their own place.

### `.urd-nav.urd-nav-press-tint .urd-nav-list a, .urd-nav.urd-nav-press-underline .urd-nav-list a, .urd-nav.urd-nav-press-shrink .urd-nav-list a`

How a link of the menu answers a touch on the phone (nav.style.mobile.press; the class comes from navClasses at the mobile breakpoint only): drawn at once while the link is pressed and let go of slowly, so a short tap is seen; the nav's own class in each selector puts the answer's timing over a hover style's.

### `.urd-nav.urd-nav-press-tint .urd-nav-list a:active`

The tint reaches a little past the link's own box on every side, drawn by its shadow, so it is seen around the words and moves nothing

### `.urd-nav-hover-underline .urd-nav-list a`

Hover styles for the menu links (nav.style.hover). The default is the accent color shift above; the classes below add more. Everything applies to :focus-visible too, so the keyboard gets the same feedback.

### `.urd-nav-hover-underline .urd-nav-list a::after : clip-path`

Revealed with clip-path rather than a scale transform: the line is laid out at its final size, so the animation's end frame equals the resting line.

### `body:not(.urd-mobile) :not(.urd-nav-side-host) > .urd-nav-hover-pill:not(.urd-nav-mobile) .urd-nav-list > li > a`

A horizontal menu draws the pill AROUND the item instead of adding it between them: the negative margin gives back what the padding takes, so the items sit exactly where they do in every other hover style. The padding is capped at half the item spacing, so a pill reaches at most the midpoint between two items and two of them can never overlap. Top-level items only: a submenu's links are stacked inside their own card. The column and the two mobile menus stack the items, where neither applies.

### `.urd-nav-hover-lift .urd-nav-list a:hover, .urd-nav-hover-lift .urd-nav-list a:focus-visible`

The glow is a text-shadow BEHIND the characters; the strength is driven by nav.style.hoverGlow (nav.js sets the variable as a finished percentage)

### `.urd-nav-hover-lift-plain .urd-nav-list a:hover, .urd-nav-hover-lift-plain .urd-nav-list a:focus-visible`

"Lift": the lift only, no glow

### `.urd-nav-label, .urd-nav-desc`

Menu item options (0.7.13.21). The description is a second line under the label; the bar hides it on its own row, where a two-line item would grow the bar, and the submenus, the column and the mobile menus show it.

### `.urd-nav .urd-nav-list .urd-nav-btn > a`

A call to action drawn as a button (item.look button): the accent surface with its text colour, kept on hover, whatever the hover style. The selectors carry the nav class so they outrank the row rules of the column and the mobile menus above.

### `.urd-nav-burger`

The burger's word beside its drawing (nav.style.burger)

### `.urd-nav-sub .urd-nav-has-sub`

The second submenu level: a child's own submenu opens beside the panel, on the outer side, and stacks as an accordion in the column and the mobile menus like the first level. It is placed past the panel's padding, so it starts at the panel's outer edge, neither over the panel nor apart from it, with its first entry level with the row that opened it. The two panels touch: a gap between them would put the pointer on the page on its way across, which leaves the menu.

### `.urd-nav-sub .urd-nav-has-sub::after`

The row reaches across the panel's padding to the second level with an invisible bridge: the pointer on its way over stays inside the row, so a slow move never counts as leaving it and never closes the second level.

### `body.urd-mobile .urd-nav-sub .urd-nav-has-sub::after, .urd-nav-mobile .urd-nav-sub .urd-nav-has-sub::after, .urd-nav-side-host .urd-nav-sub .urd-nav-has-sub::after, .urd-nav-sub-grouped .urd-nav-sub .urd-nav-has-sub::after`

Where the second level stands in the flow (the phone menus, the column, a headed group) there is nothing to bridge, and the strip would reach past the menu's edge over the page.

### `body:not(.urd-mobile) :not(.urd-nav-side-host) > .urd-nav-sub-grouped:not(.urd-nav-mobile) .urd-nav-sub .urd-nav-has-sub`

In a column layout or the flyout the second level stands as a headed group: the child is the heading (its link, or its opener without the chevron) and its submenu is a list in the flow under it. nav.js keeps these open and takes the opener out of the tab order.

### `body:not(.urd-mobile) :not(.urd-nav-side-host) > .urd-nav-sub-grouped:not(.urd-nav-mobile) .urd-nav-list > li > .urd-nav-sub`

Room for a heading with a description in every column (the flyout has the full width anyway)

### `.urd-nav-tuck`

A menu tucked above the top edge (nav.hideMode on a page in nav.hideOn): fixed and translated out of view; the pointer at the edge, the ghost or the pull tab bring it in (nav.js). The page keeps no clearance for it.

### `.urd-nav-tab`

The pull tab hangs below the host's bottom edge, so it stays in view while the bar is tucked and sits under the bar once it is in. The default is the burger lines in the submenu's surface; the owner's own colours come as variables from nav.js.

### `#urd-footer .urd-footer`

Shared footer (site.footer): shown on every page when show is on

### `#urd-footer .urd-footer : position`

Its own stacking context so a layered background (.urd-footer-bg, z-index -1) sits behind the content but in front of the footer's own surface.

### `#urd-footer .urd-footer-empty`

Turned on but empty footer: a visible, completely empty surface (surface background), no text. It fills as soon as something is entered in the Footer panel.

### `#urd-footer .urd-footer-rich`

Rich footer: brand, columns, social links and bottom line. The #urd-footer prefix is required to beat the base rule (#urd-footer .urd-footer, id+class) which otherwise keeps display: grid and makes the footer a single column.

### `.urd-footer-top`

Brand + link columns in ONE grid: equally wide columns (1fr), equal gap, always on one row. --n = the number of tracks (a wide column counts as two). Collapses responsively to 2 and 1 column. Centered/doormat/Large CTA use a flex column.

### `.urd-footer-col-wide`

Wide column: spans two tracks, the links split into two sub-columns.

### `.urd-footer-design-chapters .urd-footer-top`

The chapters design (footer.design): the brand on a row of its own, then the link columns as numbered chapters, each under a rule.

### `.urd-footer-design-split .urd-footer-top`

The split design: the brand takes half the width on a panel tinted with the accent, the link columns share the other half.

### `.urd-footer-cols-center .urd-footer-col-wide h4`

"Centered" column alignment: the wide column's heading is centered.

### `.urd-footer-brand-id`

The brand: text, a logo (image) or both (logo + text side by side).

### `.urd-nav-links`

The site's links as a tool in the menu's cluster (nav.js): the same box as the theme button, one per link, the label spoken and shown in the sheet.

### `.urd-footer-baseline-text`

The bottom line: text on the left, optional links on the right.

### `.urd-footer-privacy`

The privacy page's link in the simple footer (footer.privacyPage): one small line under the legal line

### `#urd-footer address`

The site's contact details (site.site.contact) as an `<address>`, without the italic browsers give it: lines in the contact column, one wrapping row in the plain and the large CTA builds.

### `.urd-doc`

Documents (doc-look.js): a long text in one of its designs, the privacy page (blocks/privacy.js) and a text block's document designs (blocks/text.js). The root's own width picks the narrow layout (a container query), so a phone and a narrow block both get it. The look comes as custom properties the owner sets (the accent, the headings' and the cards' colours, the corners, the fonts), each falling back to the theme; data-rules="off" takes the lines between the parts away.

### `.urd-text-doc .urd-text > h1`

A text in a document design: room above each heading and between the paragraphs, the text's own sizes kept.

### `.urd-doc:not([data-rules="off"]):is([data-design="long"], [data-design="contents"], [data-design="glance"], [data-design="ledger"], [data-design="ledger-cards"]) :is(.urd-text > h2, .urd-doc-part > h2)`

The lines between the parts: a short rule in the accent over each part's heading, in the long read, the contents, the main points and the ledgers.

### `.urd-text-doc [data-urd-form]`

A withdrawal form in a text (data-urd-form, the terms of sale): a card with a dashed edge, set apart to be filled in or printed.

### `.urd-doc-cols`

Contents beside: the parts listed in a column that follows the reader down, the part they are in marked; a narrow document folds the list into one row above the text.

### `.urd-doc[data-align="center"] .urd-doc-cols`

The text centred: it stands in the middle column and the list at the block's outer edge, an empty column of the list's width on the other side, so a block as wide as the page centres its text on the page.

### `.urd-doc-glance, .urd-text-doc[data-design="glance"] .urd-text > ul:not(h2 ~ ul, ul ~ ul)`

The main points at a glance: cards above the page, a marker in the accent beside each label. In a text they are its first list before the first heading, each item a bold label over its words.

### `@container urd-doc (min-width: 560px) { .urd-text-doc[data-design="glance"] .urd-text > ul:not(h2 ~ ul, ul ~ ul):has(> li:nth-child(3):last-child)`

The cards fill their rows: two by two, three or four across where the document is wide enough for them, one under the other in a very narrow one.

### `.urd-doc-fact > b::before, .urd-text-doc[data-design="glance"] .urd-text > ul:not(h2 ~ ul, ul ~ ul) > li > strong:first-child::before`

The marker's foot stands on the label's baseline and its height is about the capitals', so it centres on the uppercase label in any font.

### `.urd-doc[data-design="questions"] :is(.urd-doc-part, .urd-text > h2)`

Questions: each part a row that folds out, a line between the rows (data-rules="off" takes the lines away). For a visitor each is a `<details>`; in the editor the text is typed into, so its headings are drawn as open rows.

### `.urd-doc .urd-doc-part > summary`

The row's room is the heading's own (in its own size), so a row is as tall in the editor, where the heading is the row, as on the page.

### `.urd-doc[data-design="questions"] .urd-text > h2`

In the editor a question's row is its heading itself, a plain block so its formatted words keep their spaces, the chevron at its right.

### `.urd-doc-ledger-wrap`

The ledgers: what is collected, why, who gets it and how long, at the text's own width and with the same look on a phone. The table puts it in three columns, who gets it under the why in a quieter line; the cards give each kind its own card, the names beside their lines.

### `@container urd-doc (max-width: 480px) { .urd-doc-ledger`

A narrow document keeps the table, a little tighter.

### `@media print { html.urd-print-form body > :not(:has([data-urd-printing])), html.urd-print-form #urd-root > :not(:has([data-urd-printing])), html.urd-print-form .urd-section:has([data-urd-printing]) > :not(:has([data-urd-printing])), html.urd-print-form .urd-canvas:has([data-urd-printing]) > :not(:has([data-urd-printing])), html.urd-print-form :is(.urd-doc, .urd-doc-cols, .urd-doc-body, .urd-text, .urd-doc-answer):has([data-urd-printing]) > :not([data-urd-printing], :has([data-urd-printing])), html.urd-print-form details.urd-doc-part:has([data-urd-printing]) > summary`

A withdrawal form printed alone (doc-look.js addFormPrint): everything else on the page is left out of the print.

### `@media print { html.urd-print-form :is(.urd-section, .urd-canvas, .urd-block, .urd-doc, .urd-text):has([data-urd-printing])`

The blocks and sections carry their sizes inline (render.js frameToCss), so the print's reset has to outweigh them, or the form prints with the section's height of blank paper after it.

### `@container urd-doc (min-width: 641px) { .urd-privacy .urd-doc-cols`

Beside its contents the privacy page keeps its text at its measure, on either side; a narrow page has the one column every document has.

### `@container urd-doc (min-width: 641px) and (max-width: 940px) { .urd-doc[data-align="center"] .urd-doc-cols`

Contents and text centred between them need room for both columns and the text: a document narrower than that stands beside its list, centred again once the block is wide enough.

### `.urd-footer-linkrow`

The doormat link row (Centered / Large CTA): one centered row of links.

### `.urd-footer-cta`

Call to action (CTA): heading + subtext + button or newsletter.

### `.urd-footer-bigcta`

Large centered CTA (the Large CTA template).

### `.urd-footer-nl`

Newsletter form.

### `.urd-footer-hp`

Honeypot: completely hidden from humans, visible to bots.

### `.urd-bg-pan-runner, .urd-bg-orbit-runner`

Animated gradient background (pan/orbit): the gradient is painted on a 200 % runner (gradient.js) that is offset with transform on the compositor thread, never background-position (a repaint of the layer per frame). The host clips (urd-bg-loop-host). The translate % is of the runner itself, so -50 % is one whole surface width or height.

### `.urd-bg-pan-runner`

Every gradient animation reads its time per round from --urd-grad-time, set inline on the layer from its speed field (gradientRender); the fallback is the animation's own pace.

### `.urd-bg-loop-host`

One-way panning: a circular repeating gradient (the last color slides back into the first) on an oversized runner that is offset by exactly one period along the gradient axis per cycle (px measurements from loopGeometry in gradient.js) - seamless for any angle the owner sets. The host clips, so the runner never sticks out of the section.

### `.urd-bg-rotate`

Rotation: the angle spins through the registered --urd-grad-spin (CSS.registerProperty in gradient.js); without support it stands still

### `.urd-bg-pulse`

Pulsing (radial): the strength breathes around the layer's own opacity; the 0/100 % frames inherit the inline value, so the breath always starts there

### `.urd-bg-orbit-runner`

Orbit (radial): the runner is anchored (inline left/top from gradient.js) so the center of the gradient stays in place, and the orbit swings it ±2 % of its own size (= 4 % of the surface)

### `.urd-bg-motion`

Motion on an image layer (image.js, slideshow.js): the layer moves on its own, beside the parallax. Ken Burns creeps in on a slowly wandering origin, drift slides the picture behind a baseline zoom that keeps the edges covered. The duration is written inline from motionSpeed.

### `.urd-gallery-frame`

The image gallery layer's frame styles (backgrounds/slideshow.js). A frame is three boxes: the positioned box (left/top, centred with the standalone `translate`, leaned with `rotate`, carrying the travel and the fade), the skin (the visible picture box: clipping, rounding, shadow, the bounce's second axis) and the face (the picture, carrying the breathing). No two motions share a transform.

### `.urd-gallery-skin`

The skin and the face both take the shape (a clip-path, or a rounding for the shapes that are drawn with one), so a look that sets the face in shows the skin around it in the same shape. The host writes --urd-frame-radius from the rounding setting; a shape that is not a rectangle overrides it.

### `.urd-bg-demo, .urd-gallery-frame-empty`

Example pictures: a background layer with nothing picked yet still shows what it does, but only while the editing chrome is on. Clean view hides them with the rest of the chrome, and the published page never draws them. The gate is CSS rather than a decision at render time, because Clean view only toggles a body class.

### `@supports (animation-timeline: view()) { .urd-bg-image.urd-parallax-css, .urd-bg-video.urd-parallax-css`

Parallax for the image background layer: scroll-driven CSS on the compositor thread, in place of the rAF/scroll listener in backgrounds/image.js. The travel is set as --urd-px-shift (px) by mountParallaxCss (at setup and on resize, not on scroll); the view() timeline scrubs translateY from -shift (the layer enters from below) to +shift (the layer leaves the top), zero at the center. Gated with @supports; without support JS wires up the rAF-driven variant instead. Still (end state) on mobile and under reduced motion.

### `@view-transition`

Page transitions (ADR-0011): cross-document View Transitions give a soft cross-fade between the pages of the published site. The gate is the at-rule itself: engines without support ignore it and navigate plainly (end state). The editor's preview navigates the same way when it switches page, so the transition runs there too. The menu and the footer carry no name of their own: a named element is a backdrop root, which turns off the menu's backdrop-filter (the blur behind the nav), and the whole page moving as one never lets the menu morph between two boxes.

### `html.urd-arriving::view-transition-old(root)`

The arriving page is rendered by the engine once its data has loaded, so at the transition's capture it is still the empty shell. Until the page stands, the old page's snapshot stays on screen and the new one is kept out of sight; the engine then ends the transition as a cut (the arrival hold in urd.js). A page that is ready at arrival (prerendered) gets the plain cross-fade. The five seconds are a ceiling for a page whose data never arrives.

### `@media (prefers-reduced-motion: reduce) { ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*)`

Reduced motion: the transition is kept (navigation is just as fast), but every animation inside it is turned off, so the switch is a clean cut.

### `@media (prefers-reduced-motion: no-preference) { html`

Smooth anchor scrolling (block links to #anchor and the "Back to top" arrow): native scroll-behavior instead of a JS animation. Programmatic scrolls that have to be immediate (the drag compensation in preview-edit.js) say behavior: 'instant' explicitly and are left alone.

### `html`

A jump to a spot on the page (a link's fragment, the arrival jump in urd.js, and focus moving down the page) stops below a menu that stays on screen. nav.js writes the room from the menu's own height (scrollClear in nav-model.js).

### `.urd-anchor`

A named spot (render.js placeSpot): a zero-size marker at the top of its section or block, which a link's fragment lands on and which moves with the block.

### `.urd-totop`

The site's «Back to top» button (totop.js renderToTop, site.layout.toTop): fixed in the window's corner, or by the content's edge on a wide screen, on the right or the left; its height by its size, the phone's own where it has one (--urd-totop-h, --urd-totop-h-phone); its background, ring, arrow and words by the design or the owner's colours (--urd-totop-bg, -ring, -arrow, -words). A shaped design draws its outline as an SVG behind the arrow (.urd-totop-shape), so its waves follow the shape editor. It shows after the scrolling chosen (.visible).

### `body.urd-side-left:not(.urd-mobile) .urd-totop`

A menu in a column at the page's side takes its width from the page on the desktop: the button stands beside it, as the content does

### `body:not(.urd-mobile) .urd-totop.urd-totop-content`

By the content: at the content's edge on a wide screen, as the canvas reckons it (the larger of the gutter and the margin the design width leaves beside a side menu's column), in the corner where the window is narrower

### `.urd-totop.visible`

Shown, it takes the pointer and the keyboard; hidden, it is out of the tab order too

### `body.urd-mobile .urd-totop.urd-totop-nophone`

Hidden on phones where the owner asks

### `.urd-totop-label`

The arrow and the words in their label, each in its own colour, the design's where the owner sets none

### `.urd-totop-mark`

The mark's size follows the owner's icon size (--urd-totop-mark-scale), the arrow, a character and a picture alike

### `.urd-totop-glyph`

The button's own mark in place of the arrow (site.layout.toTop): a character at the arrow's size, or a picture as tall as the arrow and a little more, keeping its shape

### `.urd-totop-shape`

The shaped designs: the outline fills the button's square in the background colour

### `.urd-totop-circle, .urd-totop-square, .urd-totop-ring`

The shaped designs are as wide as they are high; the circle and the ring are round to the pointer and to the focus ring, the square soft-cornered

### `.urd-totop-circle .urd-totop-mark, .urd-totop-square .urd-totop-mark, .urd-totop-ring .urd-totop-mark`

On a shaped design the mark stands at the shape's own middle or where the owner put it (--urd-totop-mark-x, -y, a share of the button from its middle, totop.js toTopOutline)

### `.urd-totop-circle .urd-totop-label, .urd-totop-square .urd-totop-label, .urd-totop-ring .urd-totop-label`

On a shaped design the mark stands inside the button: its label covers the button and is cut to the outline drawn a little smaller (--urd-totop-clip, totop.js toTopClip), so a mark grown large fills the shape and the button keeps its edge. A picture set to fill the whole button is cut to the outline itself and is the button, the shape not drawn under it. Without masks the mark stands uncut.

### `.urd-totop.urd-totop-ring`

The ring: an outline in the ring's colour over a faint background of its own, the arrow in the ring's colour

### `.urd-totop.urd-totop-pill`

The pill: the arrow and the words on a round-ended background, a mark grown large cut at its edge

### `.urd-totop.urd-totop-words`

The words alone: the arrow and the words in the text's colour on no background, their label over a line of the owner's choosing

### `.urd-totop-line-double .urd-totop-label`

A double line needs three px to draw both of its lines

### `.urd-totop-hover-underline .urd-totop-label::after`

The words alone answer the mouse as the menu's links do (nav.style.hover): the colour, an underline that draws itself, a pill, a lift, or a lift with a glow, in the effect's colour; the keyboard gets the same, and a touch screen, whose hover stays after a tap, gets none

### `body.urd-mobile .urd-totop[class*="urd-totop-press-"]:active`

And a touch on a phone as the menu's links answer it (nav.style.mobile.press): drawn at once while pressed and let go of slowly, so a short tap is seen

# blocks/stats.css, rule by rule

### `.urd-block[data-urd-align="stretch"] > .urd-stats-box > .urd-stats`

What stretch gives each block type that can use the height (STRETCHES in push-model.js, and the calendar by design): the figure stands in the middle of its box, the countdown's units grow with the box and keep their digits in the middle, a quote's text stands in the middle of its card, and the plain list and card calendar views spread their rows and cards over the height left under the finding tools and over the subscribe row.

### `.urd-stats`

The stat: one key figure with a label. Tabular nums so the count-up animation does not jump in width along the way.

### `.urd-stats-box`

The figure stands in a box of its own, the width its narrow rules ask (see urd-block).

### `.urd-stats-box:has(> .urd-stats-cards, > .urd-stats-band)`

The figure's two dressed variants (stats.variant): a card on the surface colour, and a band of the accent colour with the accent's own text colour. Both fill the block's box, which follows the content (ADR-0025), so three in a row line up as one strip when their figures and labels take the same height.

### `@container urd-block (max-width: 220px) { .urd-stat-number`

A very narrow block (its own width, see urd-block): a smaller figure and less padding, so a long number stays inside the box.

# blocks/countdown.css, rule by rule

### `.urd-countdown`

The countdown: unit boxes with tabular nums, so the ticking never jumps in width.

# blocks/quote.css, rule by rule

### `.urd-quote`

The quote: a semantic figure/blockquote. The glyph is drawn in ::before.

### `.urd-quote-portrait`

The portrait's round frame clips its picture, which the image editor's settings place, turn and finish (picture.js)

### `.urd-quote-card`

The large quote in a card (quote.card): the spread set on the surface colour under a rule in the accent.

# blocks/faq.css, rule by rule

### `.urd-faq`

The FAQ accordion: question cards (sharing the .urd-text-box base style) where the answer unfolds with the ::details-content height transition below.

### `.urd-faq-item`

Each question is a native `<details>`.

### `.urd-faq-head`

`<summary>`: hide the default triangle (flex removes it in Chromium; list-style and the webkit marker cover the rest).

### `.urd-faq-list`

The list variant (faq.variant): bare rows with a rule between them, not cards.

### `@supports (interpolate-size: allow-keywords) { .urd-faq`

Soft unfolding where the browser supports ::details-content + interpolate-size (Chromium early 2026): the answer slides open and closed in height. Without support native `<details>` reveals the answer instantly. The content-visibility transition (allow-discrete) keeps the content visible through the collapse.

# blocks/shape.css, rule by rule

### `.urd-shape-chapter`

The chapter divider (a line shape with a label): the word in the middle and the line on both sides of it, at the line's own thickness.

# blocks/timeline.css, rule by rule

### `.urd-timeline`

The timeline: events along a drawn line, pure CSS. The accent follows the theme, but can be overridden per block (--urd-timeline-accent).

### `.urd-timeline-left`

The left variant: the line along the left edge, the content indented.

### `.urd-timeline-ring .urd-timeline-item::before`

The ring marker: an open circle on the line instead of a filled dot.

### `.urd-timeline-alternating::before`

The alternating variant: the line down the middle, cards on alternating sides.

### `@container urd-block (max-width: 480px) { .urd-timeline-alternating`

A narrow block (its own width, see urd-block) has no room for two columns of cards: the alternating variant lays its line along the left edge, with every card under the one before it.

# blocks/table.css, rule by rule

### `.urd-table`

The table: a semantic table in an overflow wrapper, so wide tables scroll in their own surface instead of breaking the page layout.

# blocks/share.css, rule by rule

### `.urd-share`

Share buttons: plain links with drawn icons, no tracking.

### `.urd-share-empty`

Nothing to draw yet: the editor's own line where the row would be (the published page draws nothing).

### `.urd-share-name`

Icons only by default; the name variant turns the buttons into pills.

# blocks/audio.css, rule by rule

### `.urd-audio`

The audio block: a native player with an optional title above.

# blocks/map.css, rule by rule

### `.urd-map`

The map block: OpenStreetMap's own iframe with a "larger map" link; the empty state and the CSP note share one dashed box.

### `.urd-map`

The map's box is its frame (ADR-0025 decision 2): the iframe takes the height left over the «Larger map» line.

# blocks/form.css, rule by rule

### `.urd-form`

The form block: the visitor form.

### `.urd-form-select, .urd-form-input[type="date"]`

Native select and date input for visitors (ADR-0009 covers editing UI only): color-scheme lets the popup and the date picker follow the user's OS theme.

# blocks/product.css, rule by rule

### `.urd-product-cardlist`

The shop: product cards from a product collection. The card list is a responsive grid; the block can lock the column count in Style.

### `.urd-product-cardlist.urd-product-cols`

The owner's own column count (product.columns), which a narrow block (its own width, see urd-block) holds to two and then one.

### `.urd-product-card : border`

A thin border, so the card reads even where surface is nearly the background color.

### `.urd-product-badge-over`

With an image the badge is placed over the image's top left corner; without an image it sits as a static chip above the title (never on top of text).

### `.urd-product-options : align-items`

The chips keep their own height where the shared row is taller (another card's request for a choice)

### `.urd-product-options.urd-product-missing .urd-product-chip`

A choice the product asks for (its requireSize, requireColor) and the buyer left open at «Add to basket»: the chips' frames in the form error's colour, and the words under them (product.js markNeed).

### `.urd-product-buyrow`

The quantity the buyer types (product.js quantityRow) stands with the buy button in one row of the card: its name, the basket's steps around the number, the limits beside it and the line's sum under it.

### `.urd-product-opener`

Quick view (visitors only): the product details in a native `<dialog>`. display is set ONLY in the open state, otherwise the built-in dialog:not([open]) { display: none } would be overridden.

### `.urd-product-titlebtn`

The opener inside the title: a button that looks like the heading's words.

# blocks/cart.css, rule by rule

### `.urd-cart-button`

The cart: a button with a count badge; the drawer is a native `<dialog>` anchored to the right edge (ADR-0011).

### `.urd-cart-dialog : margin`

A drawer along the right edge: the dialog's default centering is overridden.

### `.urd-cart-emptyrow`

«Empty the basket» under the lines: a quiet text button that asks once in its own place (cart.js emptyRow)

# blocks/checkout.css, rule by rule

### `.urd-checkout`

Checkout: order summary + order form (mailto/endpoint, ADR-0006).

### `.urd-checkout-hp`

Honeypot: moved out of view, never display:none (bots check for that).

### `.urd-checkout-paychoice`

The buyer's choice among the payment instructions: the form block's radio rows, each way to pay with its instruction under its name.

### `.urd-checkout-recap`

The summary right above the order buttons (angrerettloven § 16): the order in one line and the total.

### `.urd-checkout-vippspay`

Pay with Vipps (ADR-0020): the brand color, independent of the theme.

### `.urd-checkout-confirmation`

The printable order confirmation: a card above the form with the lines, the buyer, the seller and the withdrawal form; printed alone.

### `.urd-checkout-testmode`

The line a checkout shows while a provider runs on its test keys: a note in a dashed box, never mistaken for the order.

### `.urd-checkout-seller`

The seller under the order buttons (angrerettloven § 8 d): one small wrapping row.

### `.urd-checkout-terms`

The shop's terms of sale under the seller, in the same small type.

# blocks/video.css, rule by rule

### `.urd-video-ratio`

The video block: a placeholder without a URL, and a click shield while editing (a click should select the block, not start the player)

### `.urd-video-ratio`

A video given a shape: that shape at the block's width, and the block's height follows it (keepsShape in push-model.js)

### `.urd-video-file`

The self-hosted film: it fills the block's frame and keeps its own format inside it.

### `.urd-video-shield`

In the editor's desktop view a press on the video selects the block: the shield stands above the player and above the cover's button, which is lifted over its own picture

# blocks/icon.css, rule by rule

### `.urd-icon`

The icon block: the glyph is centered in the frame

# blocks/image.css, rule by rule

### `.urd-image-empty`

Empty image block: a placeholder in the editor only

### `.urd-image-frame`

The image frame: clips the image, so rounding shows whatever the fit is and zoom crops cleanly towards the focal point.

### `.urd-image-frame.urd-image-shaped`

An image given a shape in the image editor: the frame is that shape at the block's width, and the block's height follows it (keepsShape in push-model.js)

### `.urd-block[data-urd-phone-h] > .urd-image-frame.urd-image-shaped, .urd-block[data-urd-phone-h] > a > .urd-image-frame.urd-image-shaped`

A picture or a film with a shape given a height of its own on the phone (frames.mobile.height, render.js) fills that box around its focus point instead of keeping its shape

### `.urd-image-frame.urd-image-own:not(.urd-pic-turned) img`

The picture's own shape: the picture gives the frame its height (a turned one gives it its ratio, picture.js)

# blocks/gallery.css, rule by rule

### `.urd-gallery-grid, .urd-gallery-wall, .urd-gallery-cards`

The grid views (grid, mosaic, polaroid) lay their tiles out in .urd-gallery-tiles inside the gallery, which is the width their narrow rules ask (see urd-block).

### `.urd-gallery-wall > .urd-gallery-tiles`

Mosaic (the gallery block's view; the background layer's mosaic has its own rules under .urd-gallery-mosaic): the grid's wall with rows of one height and tiles in varied spans. Every tile's place is set by the block (mosaicWall in gallery-model.js), so the wall is a full rectangle.

### `@container urd-block (max-width: 540px) { .urd-gallery-tiles`

A narrow gallery (the block's own width, see urd-block): the grid, the mosaic and the polaroids take the narrow column count the block writes (--urd-gallery-cols-narrow, at most two), and the mosaic its narrow wall. Without container queries the block writes the window's count instead.

### `.urd-gallery-card-plain`

The foot: bare on a card without words, otherwise the image text

### `@media (hover: hover) and (pointer: fine) { .urd-gallery-card`

Under a real pointer the card straightens and lifts, so the picture can be looked at; a touch never gets a hover state that sticks.

### `.urd-gallery-track`

Carousel: horizontal scroll with snap; the arrows scroll one viewport-width step.

### `.urd-gallery-slides`

Slideshow: stacked slides, only .on is visible (and clickable).

### `.urd-gallery-pause`

The slideshow's pause (renderSlides in blocks/gallery.js): the arrows' round button, at the foot beside the dots.

### `.urd-gallery-ribbon`

The gallery's ribbon view: the same motion with the tiles as the items. The band fills the block's box (ADR-0025 decision 2) and its rows share the height, so a drag of the frame sets it. The height reaches the tiles through the stripe, the track and the run, since a tile takes its width from its height and the image keeps its aspect. Size containment keeps the images' own height out of the box's, so a box with no height of its own (a row track on the phone) is never stretched by a large picture.

### `.urd-bg-slideshow`

The image gallery background layer: two stacked images that cross-fade.

### `.urd-bg-slideshow : container-type`

The frames' travel is written in container units, so the section's own size is the unit whatever the window does.

### `.urd-gallery-shape-circle`

The shapes. The regular ones are cut, the organic ones are rounded.

### `.urd-gallery-look-shadow .urd-gallery-box`

The looks: what surrounds the picture. A shadow has to be a drop-shadow on the box, since a box-shadow is cut away with the shape.

### `.urd-gallery-look-polaroid .urd-gallery-box`

A polaroid: a white card with the picture set in and a wider foot; the card stays a card whatever shape the picture is cut to.

### `.urd-gallery-look-border .urd-gallery-skin`

The bordered looks draw with the frame colour the layer sets (--urd-frame-color: the owner's pick, or the look's own).

### `.urd-gallery-look-tape .urd-gallery-box::before, .urd-gallery-look-pin .urd-gallery-box::before`

Tape and a pin sit on the box, above the skin, and lean a touch.

### `.urd-gallery-look-stamp .urd-gallery-skin`

A stamp: perforated teeth around a white paper edge.

### `.urd-gallery-look-film .urd-gallery-skin`

Film: a dark strip with sprocket holes along the top and bottom.

### `.urd-gallery-look-soft .urd-gallery-face`

A soft edge: the picture fades out towards its rim.

### `.urd-gallery-tone-mono .urd-gallery-face, .urd-gallery-tone-mono .urd-bg-slide`

The tones: a finish on the picture itself, on the fill's slides too.

### `.urd-gallery-tone-duotone .urd-gallery-face, .urd-gallery-tone-duotone .urd-bg-slide`

Duotone: the picture in grey, tinted with the accent colour.

### `.urd-gallery-travel`

Travel: from outside one edge to outside the opposite one, in container units set by the layer (--tx0/--ty0 to --tx1/--ty1), so the jump back is never seen.

### `.urd-gallery-kenburns`

Breathing: grows a little and back. On the floating layout it rides on the whole frame, so a card breathes as one thing; on a mosaic tile, on the face.

### `.urd-gallery-fade`

The cross-fade: in, a long stand, and out, with the swap at the foot where the frame is invisible.

### `.urd-gallery-bounce-x`

The bounce: across on the box, up and down on the skin, two periods.

### `.urd-gallery-band`

The band: rows of tiles rolling on the ribbon's track, centred in the section.

### `.urd-gallery-band .urd-ribbon-track, .urd-gallery-band .urd-ribbon-run`

The height has to reach the tiles through the track and the run, since a tile takes its width from its height.

### `.urd-gallery-mosaic`

The mosaic: a wall of four columns, two on a phone, some tiles two wide or two high, clipped by the layer at the section's foot.

# blocks/ribbon.css, rule by rule

### `.urd-ribbon`

RIBBON (the ribbon block and the gallery's ribbon view). The band is a column of stripes: a thin one above, the main one, a thin one below. Each stripe clips, and its track holds the content in two equal periods, so translating by -50 % of the track lands one period on where the previous one started: a loop without a seam. The duration is measured (ribbon-model.js: the width of one period divided by the speed, or the item count times the dwell for the ticker) and arrives as --urd-ribbon-ms. Everything that moves stands still under reduced motion (the shared switch further down) and while the editing chrome is on (.urd-ribbon-still from the block). The band fills the frame and grows past it with the words, so the block's auto-grow sees the height the text needs.

### `.urd-ribbon-main`

The main stripe takes what is left; the thin ones keep their thickness.

### `.urd-ribbon-solid`

A stripe of colour alone: the rule above or below the words. The colour is the stripe's own (the block sets it), so currentColor paints it.

### `.urd-ribbon-edges`

On the edges: the thin stripes lie on the band's own top and bottom instead of taking a share of its height, and the main stripe keeps clear of them.

### `.urd-ribbon-motion-sway`

Sway: the band drifts out and back instead of rolling on, for a few words that should move without ever leaving.

### `.urd-ribbon-motion-sway`

The swaying track is one copy, centred in the band and drifting as far to one side as to the other.

### `.urd-ribbon-thin`

A thin stripe sets its own scale from its thickness, so the marks and any words in it fit the rule they live in.

### `@supports (-webkit-text-stroke: 1px red) { .urd-ribbon-outline .urd-ribbon-item`

Outlined words: the classic frieze look. The stroke takes the resolved text colour from the block (--urd-ribbon-ink), never currentColor, since the fill is transparent and currentColor follows it. Gated: without the stroke the words are invisible rather than outlined.

# blocks/text.css, rule by rule

### `.urd-text-doc[data-design="clauses"] .urd-text`

Numbered clauses: each part numbered in a badge in the accent, and its paragraphs numbered under it (7.1, 7.2), as a contract sets them; a withdrawal form inside is left unnumbered.

### `.urd-text-doc[data-design="clauses"] .urd-text > h2::before`

The clause's number stands before the heading's words as an inline badge, so the words keep their own spacing.

# blocks/privacy.css, rule by rule

### `.urd-privacy`

The privacy block (blocks/privacy.js): the site's privacy page, written from its settings, in its document design: a long read in a comfortable measure, the lists with room, and the visitor's own choices in a card with the press that takes a choice back.

### `.urd-privacy[data-align="center"]:not([data-design="contents"])`

The privacy page centred in its block, as it stands unless the owner sets it to the left: its column stands in the middle of the block (the contents design centres its text between the list and the block's other edge instead).

# blocks/contact.css, rule by rule

### `.urd-contact`

The contact block (blocks/contact.js): the site's contact details in one of its designs, an `<address>` whose own width picks each design's narrow layout (a container query), so a phone and a narrow frame both get it. Links keep the text colour, labels and actions take the accent.

### `.urd-contact-icons .urd-contact-in`

Icon rows: each detail after its icon in a circle tinted with the accent.

### `.urd-contact-card .urd-contact-in`

The card: the details on the theme's surface, two columns that stack when the card is narrow, the legal line along the bottom.

### `.urd-contact-tiles .urd-contact-in`

Three tiles: visit, call and write, side by side while each has room and stacked when not.

### `.urd-contact-facts .urd-contact-in`

The fact list: a named row for each detail between thin rules.

### `.urd-contact-actions`

Action buttons, and the save button every design but the strip can carry: round buttons, the first action filled with the accent.

### `.urd-contact-map .urd-contact-in`

Beside a map: the details and OpenStreetMap's map behind a cover that loads it on a tap, stacked when the block is narrow.

### `.urd-contact-mapbox > .urd-cover`

The site's cover over the contact map: it fills the box and leaves the box's own grid behind it

### `.urd-contact-strip .urd-contact-in`

The strip: the name and every detail on one row, on a band in the theme's text colour unless the band is off; one per line when narrow.

### `.urd-contact-poster .urd-contact-in`

The poster: the email and the phone in large type on the accent colour, the address and the legal line small below.

### `.urd-contact-roles .urd-contact-in`

By role: a card for each contact point, a divided list when narrow.

### `.urd-contact-qr .urd-contact-in`

Beside a QR code: the code on white with its caption, beside the details; under them in a row of its own when narrow.

### `.urd-contact-dock`

The bar docked to the bottom of a phone's screen (the dock option): call, email and the map, the first filled. It is a manual popover in the top layer, and these rules place it whether the Popover API is there or not; the page keeps room for it below its last line.

### `.urd-contact-dock[popover]:not(:popover-open)`

Until it stands in the top layer the bar is hidden where the Popover API exists; without the API the selector is unknown, the rule drops, and the bar stands fixed by the rule above.

# blocks/button.css, rule by rule

### `.urd-button`

Buttons

### `.urd-button-primary`

The owner's colours (button.js) stand in --urd-btn-*: the fill, the words, the outline and the fill under the pointer; one not set falls back to the design's colour from the theme

### `.urd-button-primary : color`

Text on accent: without the token the background color is used, so palettes that do not define it render unchanged

### `.urd-button-primary.urd-button-own-border`

A filled button has a line only where the owner gives it one, so a button without one keeps every pixel of its room for its words

### `.urd-button.urd-button-own-hover:hover`

A fill of the owner's own under the pointer takes the place of the design's lightening
