# Schema - the data model

This is Urd's most important contract. All content a user owns is JSON files under `content/`, shaped according to this document. Machine-readable versions live in [`schema/`](../schema/) and example data that validates against them lives in [`template/content/`](../template/content/).

Principles that apply everywhere:

1. **Everything is versioned.** Files have `schemaVersion`; every section, block, background layer and animation has `version`. See [the migration contract](#the-migration-contract).
2. **Data is never dropped.** An unknown type (missing plugin, content newer than the engine) is rendered as a neutral placeholder; the JSON is kept untouched.
3. **Everything is derived from data.** Nav, routing and admin panels are built from the page registry - nothing is hard-coded.

## `content/site.json`

The site's root: identity, page registry, navigation, grid and theme.

```json
{
  "schemaVersion": 4,
  "site": { "title": "Min forening", "lang": "no", "description": "" },
  "breakpoints": { "mobile": 640 },
  "layout": { "contentWidth": 1440, "gutter": 6 },
  "grid": { "size": 16, "snap": true },
  "theme": {
    "version": 1,
    "tokens": {
      "color":  { "bg": "#0b0e14", "surface": "#151a23", "text": "#e8eaf0", "accent": "#7c5cff" },
      "font":   { "heading": "system-ui", "body": "system-ui" },
      "radius": { "sm": "6px", "md": "12px" },
      "space":  { "section": "clamp(3rem, 8vw, 6rem)" }
    }
  },
  "pages": [
    { "id": "hjem",   "title": "Hjem",   "path": "/",       "file": "content/pages/hjem.json" },
    { "id": "om-oss", "title": "Om oss", "path": "/om-oss", "file": "content/pages/om-oss.json" }
  ],
  "nav": {
    "version": 1,
    "layout": "right",
    "logo": { "type": "text", "value": "Min forening" },
    "style": { "size": "md", "padY": 12, "inset": true, "border": { "side": "bottom" }, "shadow": "soft" },
    "items": [
      { "label": "Hjem", "page": "hjem" },
      { "label": "Om oss", "page": "om-oss",
        "children": [{ "label": "Facebook", "href": "https://facebook.com/minforening" }] }
    ]
  },
  "footer": {
    "version": 1, "show": true, "align": "left",
    "brand": { "title": "Min forening", "tagline": "Et lite fellesskap for store spørsmål." },
    "columns": [
      { "title": "Sider", "links": [{ "label": "Hjem", "page": "hjem" }, { "label": "Om oss", "page": "om-oss" }] }
    ],
    "social": [{ "icon": "facebook", "url": "https://facebook.com/minforening" }],
    "copyright": "© Min forening"
  }
}
```

- **`site.icon`** (optional, additive from v0.5): the site icon (favicon) as a path in `media/`; shown in browser tabs and bookmarks. Without an icon, the Urd mark from index.html is used.
- **`site.lang`** (required; actually in use from v0.6, ADR-0012): the visitor language. Controls the engine's own texts (buttons, dates, form messages via `t()`), the Intl date names and `<html lang>` (set by boot; the shells hard-code "no" only as the pre-JS default). Recommended values are the built-in language codes `nb`, `nn`, `en-GB`, `se`, `tr` (chosen in the Site panel), or the code of an enabled language pack (see `languages` under Plugins); the value is matched via `matchLang` - historical `no` and other nb variants are bokmål, Southern/Lule Sami fall back to Northern Sami. A code without a match is looked up among the language packs before it falls back to bokmål. The site owner's own CONTENT is never translated (chrome follows the content language, one language per site). The admin language is independent (localStorage `urd-admin-lang`, auto from the device language) and is never stored in site.json.
- **`pages`** is the page registry. Nav items point to pages via `page` id (or link via `href`). Admin creates/changes/deletes pages here; the engine routes from `path`.
- **`href` in nav/footer links** (nav.items, children, footer.columns/baseline/linkRow, footer.cta; extended in v0.6): an external link (`https://`, `http://`, `mailto:`, `tel:`) OR a site-internal path/anchor via the same guard as the block links (`isSafeHref`): `#seksjons-id` on the same page, `/sti#seksjons-id` from another page. Sections are rendered with a DOM id (= the section's `id`), so the anchors hit natively and scroll smoothly (`scroll-behavior: smooth`); the anchor is copied from the section's Properties in the editor. Internal targets never get `rel="noopener"`/external marking. Everything else (javascript:, data:, protocol-relative `//`) is rejected to `#`.
- **`nav.layout`** (optional, additive from v0.5): the placement of the menu items (`left`/`center`/`right`, default right). The logo always comes first and is the «Home» button. **`nav.logo`** has three types: `text` (value = text), `image` (value = image URL) and `both` (value = text, `image` = image URL), plus optional `size` (image height px), `mobileSize` (additive from v0.7: the image height at the mobile breakpoint, omitted = `size`), `order` (`image-first`/`text-first`), `font`, `textSize`, `bold`, `italic` and `radius` for the logo text/image.
- **`nav.sticky`** (optional, additive from v0.5, default true): the menu follows along when scrolling. **`nav.scroll`** (optional, additive from v0.6): scroll behaviour for the sticky top bar - `shrink` shrinks the menu after some scrolling (the padding is halved via `--urd-nav-shrink`), `hide` hides it when scrolling down and shows it again when scrolling up (translate on the compositor; always visible in the top zone, jitter guard against small movements). Omitted = normal. Ignored for the side variant and when `sticky` is false; in the editor's preview the behaviour is only active in Clean view (like sticky blocks), and it is always off while the mobile menu is open. Pure state logic in `navScrollState` (nav-model.js). **`nav.style.atTop`** (optional, additive from v0.7): `clear` draws the menu without surface, blur, border or shadow while the page is in the top zone; they appear once scrolled (`urd-nav-scrolled` on the host from the same state logic, independent of `nav.scroll` and of `sticky`). Bar and floating only, ignored for the side column; pairs naturally with `overlay`. **`nav.overlay`** (optional, additive from v0.6, default false): lay the full-width bar (variant `bar`) on top of the top section instead of in its own band above it, so the top section's background fills all the way up and a transparent menu reveals the hero behind it. The host is taken out of the flow (fixed when sticky, absolute otherwise), like floating; the top section should have enough clearance at the top. Applies only to `bar` - `floating`/`side-left`/`side-right` already sit outside the flow. **`nav.style`** (optional, additive from v0.5): the menu's appearance with `bg` (theme token or raw colour), `bgOpacity` (0..1), `blur` and `textColor`; omitted fields give the default appearance. **`nav.cart`** (optional, additive from v0.7, the shop): `{ "show": false, "href": "", "currency": "kr" }` - a basket button with a count badge in the tool cluster that opens the same basket drawer as the cart block (shared factory `createCartDrawer` in blocks/cart.js); `href` is the checkout page's path for the drawer's «Go to checkout» link. Omitted = no basket in the menu.
- **`nav.items[].children`** (optional, additive from v0.6): submenu, ONE level - each child is `{label, page|href}` and must have its own target. In addition to `children`, the parent can have its own target (`page`/`href`): it is then rendered as a link + a separate arrow button (the page is always reachable). Without its own target, the item is a pure opener - the whole item opens the submenu. The submenus follow the WAI-ARIA «disclosure navigation» pattern (aria-expanded/aria-controls on real buttons, never role="menu"), and in the mobile menu (the burger, controlled by `breakpoints.mobile`) they become accordions.
- **`nav.variant`** (optional, additive from v0.6, default `bar`): `floating` gives the menu as a detached pill that floats ABOVE the content (the host is taken out of the flow, the hero starts at the top behind the pill; fixed when sticky, absolute otherwise); `floating-square` is the same without rounded corners; `floating-tab` is the same with a square top and only the two lower corners rounded (hangs down from the top; with `topGap: false` it becomes a hanging header); `side-left`/`side-right` give a fixed column along the edge (body gets content padding; on narrow windows below 900px it is rendered as a normal top bar with horizontal items, and on mobile as a top bar with a burger). In the column the submenus are accordions: hover opens, but never closes per item (that would shorten the column under the pointer); all are closed together when the pointer leaves the menu, and click works as usual. **`nav.style.radius`** (optional, additive from v0.7, 0-64 px): the floating menu's corner rounding as a value; omitted = the variant's preset (pill 999, square 0, tab the theme's medium radius), so the three variants stay presets. **`nav.style.glow`** (optional, additive from v0.6, default false): a glow around the floating menu. **`nav.style.topGap`** (optional, additive from v0.6, default true): air above the floating menu; false puts it right at the top. **`nav.style.hover`** (optional, additive from v0.6, default `standard`): hover style for the menu links (`underline`/`pill`/`lift-plain` = lift without glow/`lift` = lift with glow); **`hoverGlow`** (0..1, default 0.6) controls the glow strength for `lift` (the glow sits behind the text); **`hoverColor`**/**`hoverTextColor`** (optional, additive from v0.6) override the effect and text colour (theme token or raw colour, default accent). **`nav.style.size`** (optional, additive from v0.6, default `md`): menu size in four steps (`sm`/`md`/`lg`/`xl`), each a padding and a text size. **The size fields** (optional, additive from v0.7, [ADR-0023](adr/0023-navigation-bar-sizing.md); omitted = today's look): **`padY`** (0-64 px) is the thickness, the vertical padding, and overrides the preset's padding; it is drawn as set in every variant, while the floating menu's 0.67 factor applies to presets only (with an image logo the bar never gets thinner than 36 px, the constant the logo's margin calibration contributes). **`textSize`** (12-28 px) overrides the preset's text size (the logo text follows unless `logo.textSize` is set). **`padX`** (0-80 px) is the side padding, also for the mobile panel and the side-to-bar fallback (omitted = `clamp(1rem, 4vw, 2.5rem)`). **`gap`** (0-64 px) is the space between the menu items. **`inset`** (default false, variant `bar` only) lines the bar's contents up with the content edge (`max(padX, gutter, (100% - contentWidth) / 2)`, desktop only) while the background keeps the full width. **`pillWidth`** (480-1920 px or the string `content`, floating variants only) is the floating menu's maximum width (omitted = 1100; `content` = the site's content width; ignored at the mobile breakpoint, where the pill keeps the full width minus its air). **`shrinkTo`** (0.3-0.8, default 0.5) is the padding factor in the compact state when `nav.scroll` is `shrink`, and **`shrinkLogo`** (default false) makes the logo image shrink with it. **`mobile`** (`{padY?, textSize?}`) overrides thickness and text size at the mobile breakpoint (omitted fields = same as desktop); the engine chooses the mobile values at render time, never through a CSS class, since the burger state is also set by content folding on desktop. The side column ignores `padY`, `padX`, `gap`, `inset` and `pillWidth` (its padding is its own; `width` below is its size). **`nav.style.border`** (optional, additive from v0.7): `{side, width?, color?}` draws a border on the bar, `side` = `bottom`/`top`/`both`/`all`, `width` 1-8 px (default 1), `color` a theme token or raw colour (omitted = a hairline in the text colour); bar and floating variants. **`nav.style.shadow`** (optional, additive from v0.7): `soft`/`strong` drop shadow under the top bar (omitted = none); variant `bar` only, the floating menu has `glow`. **`nav.style.image`** (optional, additive from v0.6): a background image in the menu as a path in `media/` (data URL in the draft); `bg`/`bgOpacity` sit as a veil over the image, **`imageOpacity`** (0..1) fades the image towards the background colour, **`imageY`**/**`imageX`** (0..100) choose the crop vertically/horizontally, and **`subImage`** (default false) decides whether the image is also shown in the submenu and the mobile panel (the default is only the colour veil). **`nav.style.subStyle`** (optional, additive from v0.6, default `card`): the submenu's design (`flat`/`pills`/`lines`/`flyout`); **`subPillColor`** (optional, additive from v0.6) is the colour of the pill items for `pills` (theme token or raw colour, default is the submenu's surface); **`subColumns`** (1-4, default 1) lays the items out in a grid; **`subOpen`** (optional, additive from v0.7, default `hover`) decides how the submenus open on a mouse device: `hover` = the pointer opens and closes them, `stay` = the pointer opens them and only a click, another item or a click outside closes them, `click` = only a click opens and closes them (touch always uses click; pure logic in `subOpenMode`, nav-model.js). **`nav.style.sideAlign`** (optional, additive from v0.6, default `left`): text alignment in the side column; **`nav.style.sidePlacement`** (optional, additive from v0.6, default `top`): vertical placement of the menu list in the column (`top`/`middle`/`bottom`) - a separate field, `nav.layout` applies only to the top bar; **`nav.style.width`** (180-400, default 250) is the column's width in px (dragged at the column edge in the editor). **`nav.style.background`** (optional, additive from v0.6): a full layer-based background (`{version, layers}`, exactly the same model as the section background - color/gradient/glow/grain/image/slideshow). When it exists, the layers are drawn in a backdrop behind the menu content and take over the surface (the nav element's own background becomes transparent; `blur`/frosted glass still works), while the old `bg`/`bgOpacity`/`image`/`imageX/Y`/`imageOpacity`/`subImage` fields apply only without layers (backwards compatibility; the editor now offers only the layer editor). The submenu and the mobile panel keep the colour veil (the layer stack applies to the main bar).
- **`footer`** (optional, additive from v0.5): a shared footer at the bottom of ALL pages. Simple form (from v0.5): `show`, `text` (lines separated by line breaks) and `align`. Rich form (additive from v0.6): `brand` (`{title, tagline}`, the title falls back to `site.title`), `columns` (`[{title, links: [{label, page|href}]}]` - a column without valid links is not rendered), `social` (`[{icon, url}]` where `icon` is an id from the icon library and `url` must be http/https/mailto/tel), `copyright` (bottom line; falls back to `text`) and `bg` (background colour, theme token or raw value, default the theme's `surface`; old simple form). **`footer.background`** (optional, additive from v0.6): a full layer-based background (`{version, layers}`, the same model as the section/nav background); drawn in a backdrop behind the footer content and takes over the surface when it exists, while `bg` applies only without layers (backwards compatibility). If any of the rich fields is set, the rich footer is rendered; otherwise the old, byte-identical text form. **`footer.show`** controls whether the footer is shown at all; **`footer.hideOn`** (optional list of page ids, additive from v0.6) hides it on selected pages - the default (absent) is visible on all pages. The engine receives the current page id and hides the footer when the id is in `hideOn`. Omitted or hidden = no footer. The footer is built ONLY in the Footer panel (site.footer), not as a section: there is no «Footer» section preset any more, and eight starter layouts (Minimal/Centred/Columns/Sitemap/Newsletter/Big CTA/Contact/Mega) fill the footer from a visual template picker. **Richer bottom line (additive from v0.6):** `baseline` (`[{label, page|href}]`) is optional links on the right of the bottom line (copyright/text on the left); «Simple text» (`text`) is hidden in the rich admin but kept for old non-rich footers. **`footer.linkRow`** (`[{label, page|href}]`, additive from v0.6) is one centred doormat link row (Centred/Big CTA). **`footer.columnsAlign`** (`left`/`center`) aligns the heading of a wide (two-part) column. **Columns** can have `wide: true` (two-part across two tracks; otherwise auto at > 6 links), and are rendered in a grid with equal-width tracks that collapses responsively. **`footer.cta`** (additive from v0.6) is a call to action: `kind: 'button'` (a button as a link, `page|href`) or `kind: 'newsletter'` (an email field). The newsletter is sent to `endpoint` with `fetch` (POST JSON, inline confirmation `success`) - an external endpoint host requires `connect-src` in `_headers` (ADR-0006, like the form plugin); `recipient` gives a mailto fallback. `cta.big` gives the big centred variant. Pure logic in `footer-model.js` and `footer-cta.js`.
- **`layout`** (optional, additive from v0.7, ADR-0018) binds the content to a design width: the section is full window width and owns the background, while the blocks sit in a centred content surface (`.urd-canvas`) at `min(100% - 2*gutter, contentWidth)`. **`contentWidth`** is a number in px (default 1440) or `"full"` for unbound full width (Urd's behaviour before v0.7); a number and not a CSS length, since the editor computes the preview's target width from it. **`gutter`** (default 6) is the minimum side margin against the window edge, as a PERCENTAGE OF THE WINDOW WIDTH (vw); it was px until schemaVersion 2. The margin acts as a floor and only has an effect on screens narrower than `contentWidth / (1 - 2*gutter/100)`; above that width it is `contentWidth` that decides and the actual margin becomes larger. The editor shows it as a scale (None 0, Small 3, Medium 6, Large 9) with the raw number under Advanced. The binding applies ONLY above `breakpoints.mobile`: below the breakpoint the margin is 0 and the surface 100 %, so stored `frames.mobile` keep their meaning. The site migration 1 → 2 fills the field in explicitly and 2 → 3 sets the margin to the default, so the engine and the editor can never derive their own separate values. Per section, the width is overridden with `size.maxWidth`.
- **`grid`** is the snapping tool: square cells of `size` px; smaller = denser/finer placement. Sections can override it, and `snap` can be switched off for completely free placement. The grid never affects stored positions.
- **`theme.tokens`** map 1:1 to CSS variables: `tokens.color.bg` → `--urd-color-bg`. The engine's `theme.js` does the mapping; admin edits the tokens directly. The colour set is `bg`, `surface`, `text`, `accent` and `accent-text` (additive from v0.6: text on top of accent surfaces such as primary buttons; without the token, `bg` is used as before).
- **`theme.scheme`** and **`theme.alt`** (optional, additive from v0.6): the light/dark switch. `scheme` says what the main tokens are (`light`/`dark`, default light); `alt.tokens` (the same shape as `tokens`, omitted values inherit the main theme) apply in the opposite mode. If `alt` exists, the nav shows a sun/moon switch: the first visit follows `prefers-color-scheme`, an active choice is remembered in localStorage (`urd-theme-mode`). **`alt.auto`** (boolean, additive from v0.6): if `true`, the alt colours are derived automatically from the main theme (inverted lightness) and re-derived when a main colour changes in the editor; `false`/omitted = the site owner controls the alt colours. A pure display flag for the editor; the engine only cares about `alt.tokens`.

## `content/pages/<id>.json`

A page is a vertical sequence of sections.

```json
{
  "schemaVersion": 1,
  "meta": { "id": "hjem", "title": "Hjem" },
  "sections": [ { …seksjon… }, { …seksjon… } ]
}
```

**The SEO fields on `meta`** (additive from v0.7, set in the Pages panel for the open page): `description` (the meta description, also the og:description fallback) and `og` = `{ "title", "description", "image" }` (the Open Graph sharing fields; omitted fields fall back to the page title, the description and the site icon, and `og.image` is materialised to `media/` at publishing like other images). The engine sets the tags in the document head for visitors (`engine/seo.js`): meta description, canonical (origin + path), the og fields, the X card tag (`twitter:card`, the rest is read from the og fields) and JSON-LD (`Organization` from the Site panel's name/description/icon). The preview never gets the tags (`?preview=1` is not a canonical page). The page registry's entry in site.json additionally has the additive flag `noindex` («Hide from search engines» in the same panel group): the page gets robots-noindex without canonical and is left out of sitemap.xml; the flag lives in the registry, not the page file, so publishing can filter the sitemap without loading all the pages.

**Publishing-generated visibility files** (`engine/feeds.js`, the same pattern as theme.css): every publish writes `sitemap.xml` (all pages in the registry) and `robots.txt` (everything open except `/admin/`, with a sitemap pointer) from the origin admin runs on; dated collections (kind `news`, `notices`, `publications`) get an RSS feed at `content/samlinger/<id>.xml` when they are published. The 404 page is Urd-owned and static (`404.html`, self-contained with the theme colours) and is served by the host for unknown paths.

### Section

A section is always the same generic container - its own size, its own background stack, an optional grid override, and a free canvas of blocks. «Section types» do not exist as code paths: hero, gallery and footer are **presets** (data factories) that produce a starting section you can then change freely.

```json
{
  "id": "sec-8f2k",
  "version": 1,
  "preset": "hero",
  "size": { "minHeight": "85vh" },
  "grid": null,
  "background": {
    "version": 1,
    "layers": [
      { "type": "gradient", "version": 1, "props": { "kind": "linear", "stops": [{ "color": "#0b0e14", "share": 50 }, { "color": "#1a1030", "share": 50 }], "angle": 160, "x": 0.5, "y": 0.5, "animation": "none" } },
      { "type": "glow",     "version": 1, "props": { "x": 0.7, "y": 0.2, "color": "#7c5cff", "radius": 0.5, "opacity": 0.35 } },
      { "type": "grain",    "version": 1, "props": { "opacity": 0.06 } }
    ]
  },
  "blocks": [ { …blokk… } ],
  "responsive": {
    "mobile": { "mode": "auto", "attention": null }
  }
}
```

- **`preset`** is only provenance information («created from the hero preset») - it controls nothing after creation.
- **`theme`** (optional string, additive from v0.6): a ready-made section theme (role set) that overrides the theme's colour tokens ONLY on this section. Values: `surface` (`bg` = surface), `accent` (`bg` = accent, `text` = accent-text, accent↔accent-text are swapped so button/link invert), `inverse` (`bg` = text, `text` = bg), and from 0.6.6.4.6 also `soft` (the accent as a faint pastel tint in bg/surface), `muted` (a grey-toned zone with softer text), `deep` (inverse with an accent tint in bg/surface) and `highlighted` (only surface is tinted in the accent). The role values were Norwegian (flate/aksent/invers/dus/dempet/dyp/uthevet) until schemaVersion 2; the page migration 2 → 3 lifts them (ADR-0021). Absence = Standard (no override). The overrides are set as `--urd-color-*` on the section's element and refer to the BASE copies `--urd-base-*` (set by `applyTheme`), never the live `--urd-color-*` - otherwise inverse would create a `var()` cycle. Because they are references, the roles follow light/dark automatically. The blocks inherit via `resolveColor` → `var(--urd-color-*)`. An unknown role is ignored. Defined in `SECTION_THEMES` (`engine/theme.js`).
- **`size.minHeight`** is the section's minimum height as a CSS length (`85vh`, `640px`); without it, the blocks' extent is used. **`size.maxWidth`** (taken into use in v0.7, ADR-0018) overrides the site's content width for THIS section: a CSS length, or `"full"` for edge-to-edge content (heroes, dividers). Absence = inherit `site.layout.contentWidth`.
- **`grid: null`** means «inherit the site's grid»; an object with the same shape as the `site.json` grid overrides per section.
- **`background.layers`** are rendered in order. Core layer types: `color`, `gradient` (also animated), `glow`, `image`, `grain`, `slideshow` (from v0.6) and `video` (from v0.7). Plugins can define more.
- **The `image` layer**: an inner `.urd-bg-image` element carries the image, and position/size are controlled CSS-natively (the same model as the slideshow layer), NOT via transform. The model is FREE PLACEMENT (like Figma Crop / Webflow Custom): a scale and a position that work for all images. **`fit`**: `plain` (free placement, default) or `tile` (repeats the image as a pattern); `custom` sets its own scale. The old Norwegian values (`vanlig`, `flislegg`, `egen`) are lifted by the layer's 1 -> 2 migration (ADR-0021). `cover`/`contain` are kept as keywords for backwards compatibility and for the slideshow layer. **`size`** (a fraction, default 1 = 100 %, clamped to 0.1-4 in the editor, pure `bgSize`) is a width-relative SCALE: `background-size: {size*100}%` (auto height keeps the ratio), so 100 % = as wide as the section. The editor's **Cover**/**Show all** buttons compute the scale that fills/shows the whole image from the image and section dimensions. **`x`/`y`** (default 0.5 = centred) is placement via percentage `background-position` (pure `bgPosition`) and can go BELOW 0 / ABOVE 1 (editor: -0.5..1.5) to place the subject partly or entirely outside the edge. **Uploaded SVGs are auto-trimmed** (the editor measures the subject's extent via canvas pixels and tightens the `viewBox`, pure `tightSvgViewBox`/`svgViewBox`), so dead space around a logo does not disturb scale/position. **`blur`** (px) blurs the image without deliberate enlargement (the element is stretched only just enough beyond the edge that the blur fringe is clipped away). **`parallax`** (0..1, additive, default 0) lets the image lag behind when scrolling: the strength controls the SPEED (`parallaxOffset`, `MAX_SHIFT` = 0.4 for a strong effect). The free model (`plain`, which shows the image with air around it) is shifted purely with `translateY` WITHOUT overscan, so the parallax is zoom-free and strong (a larger ceiling in `parallaxPad`). Fill modes (`cover`/`tile`) MUST overscan (a gap at the edge is unacceptable; for `cover` it gives a slight zoom, a tighter ceiling). OFF on mobile and with `prefers-reduced-motion`. **`bleed`** (`none`/`up`/`down`/`both`, additive, default `none`) lets the parallax flow past the section edge into the neighbour via a directional `clip-path` (pure `bleedClip`; the sides are always clipped so there is no horizontal scroll). `down`/`both` lift the layer to `z-index: 1` because the next section comes later in the DOM and would otherwise paint its background over the bleed; the layer then paints over the neighbour's BACKGROUND, but still under its content (blocks sit at z>=1 later in the tree). `up` paints over the previous section via the tree order. Otherwise the layer is clipped to the section box. One passive scroll/resize listener at module level drives all parallax layers via `requestAnimationFrame` (detached layers are weeded out).
- **The `gradient` layer**: `kind` is `linear` (uses `angle`) or `radial` (uses the centre `x`/`y`, 0..1). `stops` are the colours IN ORDER along the gradient, each with `share` (its share of the space, a weight that is normalised at rendering; `share: 0` gives a hard colour edge against the neighbouring colour). Each colour is painted in the middle of its band, and the CSS stretches the first/last colour out to the edges. `animation` is `none`, `pan` (back and forth), `pan-loop` (one way: a circular repeating gradient where the last colour slides back to the first, and which follows `angle`; pure geometry in `loopGeometry`/`loopGradientCss`) or `rotate` for linear; `none`, `pulse` (the strength breathes) or `orbit` (the centre swings in an orbit) for radial; an unknown/wrong value for the shape is rendered unanimated. Pure logic in `gradientRender` (`engine/backgrounds/gradient.js`).
- **The `slideshow` layer** (hero gallery) cycles through several images with a soft cross-fade: `{ "images": [{ "src": "/media/…", "x": 0.5, "y": 0.5 }], "fit": "cover", "interval": 6, "fade": 1.5, "opacity": 1, "blur": 0 }`. `x`/`y` (0..1) is the focus point per image, `interval` is the seconds between changes, `fade` is the length of the fade in seconds. With one image, or reduced motion on the visitor's side, only the first image is shown statically.
- **The `video` layer** (from v0.7, feature map C6): `{ "src": "/media/….mp4", "poster": "/media/….webp", "fit": "cover", "x": 0.5, "y": 0.5, "opacity": 1, "parallax": 0 }`. A self-hosted mp4/webm loop, git-owned like the images (data URL in the draft, materialised to `media/` at publishing); `poster` is an optional still image. Playback: a muted loop (`muted`/`playsinline`) that is STARTED by a shared IntersectionObserver and paused outside the viewport; `preload="metadata"` means the film is fetched only when the section approaches. `fit`/`x`/`y` control the crop via `object-fit`/`object-position`. `parallax` (0..1) uses the image layer's shared machinery (scroll-driven CSS with an rAF fallback). With `prefers-reduced-motion` video is never played: the poster is shown as a still image, and without a poster the layer is left out so the layers beneath show through. The source is guard-validated (anchored regex: only `/media/*.mp4|webm` and video data URLs).
- **The media limits** (set together, 0.7.7, the constants in `engine/imageTools.js`): images are compressed in the browser to webp (max 1600 px longest side) with a warning above 400 kB (`WARN_BYTES`); audio is published unchanged with the same warning limit; video is warned about above 4 MB (`VIDEO_WARN_BYTES`, the base64 draft can burst the localStorage quota, in which case the draft exists only in memory until publishing) and rejected outright above 15 MB (`VIDEO_MAX_BYTES`, well below Cloudflare Pages' file limit of 25 MiB). The publishing guard's media extensions mirror the media types (image + audio + mp4/webm).

### Block

```json
{
  "id": "blk-a1c9",
  "type": "text",
  "version": 1,
  "props": { "html": "<h1>Velkommen</h1>", "align": "left" },
  "animation": null,
  "frames": {
    "desktop": { "x": 8.33, "y": 48, "w": 50, "h": 32, "z": 1, "rot": 0 },
    "mobile": null
  }
}
```

- **`type`** looks up in the block registry (`Urd.blocks`). Core blocks: `text`, `image`, `button`, `shape` (lines - horizontal, vertical and slanted via `rot` - circles, rectangles), `video` (YouTube/Vimeo with privacy-friendly embedding; the CSP has a deliberate frame-src exception for the two hosts), `icon` (glyph/emoji with size and theme colour), `collection` (see below), `gallery` (from v0.6, see below), `faq` (from v0.6, see below), `timeline`, `quote` and `stats` (from v0.6, see below), as well as `table`, `share`, `countdown`, `audio`, `product`, `cart` and `checkout` (from v0.7, see below) and `map` (from v0.7.4, moved in from the reference plugin in 0.7.18.2, see below). Plugins can define more.
- **The `faq` block's props** (from v0.6): `{ "items": [{ "q": "Spørsmål?", "a": "<p>Svar (rik tekst)</p>" }], "multi": false, "boxStyle": null }`. An accordion following the disclosure pattern (a button with `aria-expanded`, never `role="menu"`): the answer unfolds on click, `multi` lets several answers stay open at once. The block's stored height is always the collapsed one (auto-grow like the collection block, only the height is reported); unfolding grows only visually. `boxStyle` is the card style (see `boxStyle` below).
- **The `timeline` block's props** (from v0.6): `{ "items": [{ "year": "2019", "title": "…", "text": "…" }], "variant": "left" | "alternating", "marker": "filled" | "ring", "accent": null }`. A vertical list of events along a CSS-drawn line; `alternating` puts the cards on alternate sides of a centre line. `accent` is a theme token or hex (null = the theme's accent). Auto-grow like faq (only the height is reported). All the text fields are plain text.
- **The `quote` block's props** (from v0.6): `{ "text": "…", "attribution": "…", "role": "…", "variant": "large" | "short", "image": "", "accent": null }`. A semantic `figure`/`blockquote` with the attribution in `figcaption`; `short` is the testimonial card with an optional portrait (`image` is a path in `media/`, data URL in the draft). The quotation glyph is drawn in CSS. `accent` as for the timeline. Auto-grow (only the height is reported).
- **The `stats` block's props** (from v0.6): `{ "value": "4800", "prefix": "", "suffix": "+", "label": "…", "countUp": true }`. One key figure with a label; `countUp` counts up from zero on first entry for visitors (a one-off IntersectionObserver) when `value` is a plain number (spaces and decimals allowed) - otherwise, with reduced motion and in the editor the figure stands in its end state (ADR-0011). Auto-grow (only the height is reported).
- **The `table` block's props** (from v0.7): `{ "header": true, "striped": false, "lines": "rows" | "grid" | "none", "rows": [["Dag", "Åpent", "Merknad"], ["Mandag", "10-16", ""]] }`. A semantic `<table>` in an overflow-x wrapper (wide tables scroll in their own surface). `rows` are the rows as plain text strings; the first row is drawn as a header row when `header` is true. The cells are edited on the canvas, rows/columns in Properties. Auto-grow (only the height is reported).
- **The `share` block's props** (from v0.7): `{ "services": ["facebook", "x", "linkedin", "whatsapp", "email", "copy"], "variant": "icons" | "labels", "size": 38, "color": "" }`. Static sharing links without tracking (never a provider SDK): the address being shared is read on click. `copy` uses the Clipboard API and is shown only where the API exists. `color` is a theme token or hex (empty = accent). The icons are the icon library's drawn SVGs.
- **The `countdown` block's props** (from v0.7): `{ "target": "2026-12-24T18:00", "doneText": "…", "variant": "boxes" | "plain", "showSeconds": true }`. Counts down to `target` (datetime-local form, local time); a passed target shows `doneText`. The unit words are separate translation keys instead of `Intl.RelativeTimeFormat` (Northern Sami is missing in ICU). The ticking is setInterval logic, not animation (ADR-0011).
- **The `map` block's props** (core from 0.7.18.2; the same shape as the former map plugin, and the legacy id `kart` resolves to it): `{ "location": "", "zoom": 15, "height": 320 }` plus `lat`/`lon` written by the address search in admin (`/api/geocode`). `location` is an address, coordinates («59.913, 10.739») or an OSM link, parsed at render (`osm.js`) when `lat`/`lon` are missing; the block embeds OpenStreetMap's own iframe (frame-src is open for the host in Urd's `_headers`). The `find-us` section preset (legacy id `finn-oss`) is a title and a map.
- **The `audio` block's props** (from v0.7): `{ "src": "/media/…", "title": "", "loop": false }`. A native `<audio controls preload="metadata">` with a git-owned file (data URL in the draft, written to `media/` at publishing like the images); the CSP's `default-src 'self'` covers playback. `title` is shown above the player and can be written on the canvas.
- **The `product` block's props** (from v0.7, the shop): `{ "collection": "produkter", "limit": 0, "columns": 0, "currency": "kr" }`. Renders the entries in a product collection (`kind: "products"`, see collections below) as cards with image, badge, price/member price, size and colour choices and «Add to basket». A colour choice with its own image swaps the card's image. `limit`/`columns` 0 = all/automatic; `currency` is the word after the price. The buy button writes to the basket (`engine/shop.js`, the localStorage key `urd-cart`, the event `urd-cart-change`). For visitors, a click on the image/title opens a quick view: the product details in a native `<dialog>` (ADR-0011) with a slideshow (main image + colour images), the full text, variant choice and buy button; the price row is shown only when `price` is set. In the editor, click owns editing, and a «+ Product» card last in the grid reports `urd-collection-add {collection}` to the editor, which adds a new product to the collection. Auto-grow (only the height is reported, like collection). The block's `animation`/`hover` fields are played per card (the def flag `animPerCard`): the entrance is played per card with a staggered start from the block's visibility, and the pointer effect lifts card by card.
- **The `cart` block's props** (from v0.7, the shop): `{ "variant": "button" | "icon", "href": "", "currency": "kr" }`. A button with a count badge that opens a basket drawer built on a native `<dialog>`/showModal (ADR-0011); the drawer shows the lines with quantity controls, the total and, when `href` is set, a «Go to checkout» link to the checkout page. The basket lives with the visitor (localStorage): no account, no tracking, no network calls.
- **The `checkout` block's props** (from v0.7, the shop): `{ "recipient": "", "endpoint": "", "vipps": "", "currency": "kr", "vippsCheckout": false }`. `vippsCheckout` (additive, [ADR-0020](adr/0020-optional-payment-layer-vipps-checkout.md)) shows a «Pay with Vipps» button: the basket is POSTed to the site's own function `/api/vipps/checkout`, which recomputes the total from the git-owned catalogue (never the client's figures) and redirects to Vipps Checkout; the return to the checkout page with `?ordered=1` gives a receipt and empties the basket. Requires the Cloudflare secrets `VIPPS_CLIENT_ID`/`VIPPS_CLIENT_SECRET`/`VIPPS_SUBSCRIPTION_KEY`/`VIPPS_MSN`; without them the button degrades gracefully, and the form checkout remains the default. An order form without a payment gateway: the order summary is read from the basket, the contact fields (name, email, phone, comment) are validated, and the order is sent as an email draft to `recipient` (mailto, zero setup) or as JSON to `endpoint` (POST; an external host requires `connect-src` in `_headers`, ADR-0006 - the same flow as the form plugin and the footer newsletter). The endpoint wins when both are set; a confirmed endpoint response empties the basket, while mailto keeps it (the draft can be cancelled). A honeypot field against bots (filled in = silently discarded). `vipps` is shown as a payment instruction below the form. Pure order logic in `engine/shop.js` (`orderLines`, `buildOrderBody`, `buildOrderMailto`, `buildOrderPayload`).
- **`boxStyle`** (optional, additive from v0.6, on the text box and the faq cards): `{ "bg": "#…" | "<token>", "shadow": "soft" | "strong", "shadowColor": "#…" | "<token>", "border": "none" | { "color": "#…" | "<token>", "width": 1-4 }, "glass": true }`. All fields are optional; an omitted field = the base style in `.urd-text-box` (the theme's surface colour and thin border). `bg` is a separate background colour (block colour; omitted = the theme's surface). `shadowColor` colours the shadow (omitted = black with typical transparency). `glass` gives frosted glass (a translucent surface + `backdrop-filter: blur`) and overrides `bg`; without browser support, the translucent surface remains. Pure logic in `engine/box-style.js` (`boxStyleCss`).
- **`props`** are type-specific and owned by the block definition's version/migrations. Additive fields in use (older data lack them and are rendered unchanged): text has `box` (text box card), `font` and `size` (own font/base size per field) as well as `lineHeight` (unitless line spacing, scales with the font size) and `letterSpacing` (letter spacing in px, can be negative; 0/omitted = inherit) from v0.6, the image block has the focus point `x`/`y` (0..1), the non-destructive adjustments `brightness`/`contrast`/`saturate` (1 = neutral; 0 in saturate gives greyscale) and `lightbox` (from v0.6, default false: click opens the image in full screen for visitors; an `href` wins over the lightbox); the icon block has `image` (its own uploaded icon shown at the glyph size instead of the glyph) and `icon` (from v0.6: an id in the engine's icon library of drawn SVGs, `engine/icons.js`; the icon is coloured by `color` and wins over the glyph, `image` wins over both, and an unknown id falls back silently to the glyph); the icon block's `color` can be a theme colour token OR a custom CSS colour (hex) - `resolveColor` distinguishes by the form.
- **The `gallery` block's props**: `{ "images": [{ "src": "/media/…", "alt": "…", "href": null, "style": { "fit": "cover", "x": 0.5, "y": 0.5, "zoom": 1, "brightness": 1, "contrast": 1, "saturate": 1 } }], "view": "grid", "columns": 3, "gap": 12, "radius": "md", "lightbox": true, "interval": 5 }`. `view` is `grid` (grid), `carousel` (horizontal scroll) or `slides` (slideshow with automatic advance every `interval` seconds; stands still with reduced motion). `style` per image is the same non-destructive vocabulary as the image block. `lightbox` opens the image in full screen on click for visitors; `href` per image wins over the lightbox. The grid grows automatically with the content (only the height is reported, like the collection block).
- **`mobileOrder`** (optional, additive from v0.5): overrides the block's sort key in the mobile reading order, interpreted on the same scale as desktop y. The section templates use it to keep cards together (icon + box) instead of the y sort splitting the cards into bands.
- **`fit`** and **`fitMin`** (optional, additive from v0.7.3, ADR-0024, on any block): `fit: "shrink"` makes the content shrink instead of wrap when the frame is too narrow for it at full size: the push pass zooms the content only as much as the design height needs, down to `fitMin` (0.01-1, a share of the design size, default 0.6), and past the floor the content wraps and the blocks below are pushed. Omitted = wrap and push. For the blocks whose content cannot wrap (image, video, shape, icon; `FIT_BY_WIDTH` in push-model.js) the same fields are a floor on the frame's width instead: the frame follows the canvas in percent as always, but never gets narrower than `fitMin` times its design width (`fitFloorPx`, capped at the canvas's right edge; no floor when `layout.contentWidth` is `full`). Desktop only; the mobile row grid wraps naturally. The whole content is zoomed, so inline sizes follow.
- **`sticky`** (optional, additive from v0.6): «Pin while scrolling» - `{ "offset": 16, "until": null }`. The block is pinned `offset` px from the window top when it is scrolled there, and released when its own section has passed (`until: null`) or only when the section with id `until` has passed. If a top bar is sticky, the menu height is added to the distance automatically, so the block pins beneath the menu instead of behind it. Scroll pinning is desktop only (the row grid is document flow); screen docking (`mode: 'screen'`) also applies on mobile, where the block is docked against its own measured size. The pinning is JS-controlled (`engine/sticky.js` + pure functions in `sticky-model.js`); in the editor's preview it is active also with editing handles on, but is suspended while a block is dragged or resized. An unknown/deleted `until` id degrades to its own section's boundary. Three additive fields from v0.7:
  - **`mode`** (`scroll`/`screen`, default `scroll`): `screen` docks the block at a fixed point in the window for the WHOLE page instead of pinning it at the window top when it is reached. `until` does not apply in this mode.
  - **`dock`** (default `bottom-right`): the anchor point with `mode: 'screen'`, composed of a vertical and a horizontal axis (`top`/`middle`/`bottom` and `left`/`center`/`right`). `offset` is then the distance from the edges the block is docked to; centre axes are centred and ignore it. In the editor, a docked block can be dragged: the drop picks the nearest anchor point (`nearestDock` in `sticky-model.js`) instead of writing the desktop frame.
  - **`group`** (section-id form, default null): blocks with the same group id are pinned and released as ONE unit and keep their placement relative to each other, instead of all piling on top of each other at the window top. The group is measured as its bounding box (`groupBox`), and the FIRST member in the section's block order controls `offset`, `until`, `mode` and `dock` for the whole group. A group belongs to ONE section (the editor's multi-select is section-bound); members added across sections by hand-editing are measured against the first member's section.
- **`frames`** is placement per breakpoint, in **physical units**: `x`/`w` as a percentage of the CONTENT SURFACE (`.urd-canvas`, that is `site.layout.contentWidth` or the section's `size.maxWidth`; it was a percentage of the whole window width before v0.7, see ADR-0018), `y`/`h` in px (`y` can be negative: the block then hangs above the section top, sections never clip; on the rendered desktop page the engine moves the blocks below a block whose content grew taller than its frame, by the gap rules of ADR-0024, without touching the stored frames), `z` is the layer order, `rot` is degrees. The grid in site.json is ONLY a snapping tool during editing; changing it never moves content.
- **`frames.mobile`** is the mobile override PER BLOCK (schemaVersion 2, ADR-0019). `null` means the block follows desktop: it is auto-placed in the row grid in reading order (sorted by desktop `y`, then `x`; `mobileOrder` overrides the key), text and auto-growing blocks get their natural height. An object is a PARTIAL placement `{x?, w?, row?, rows?, z?, rot?}`: only the fields present override. Without `row` the block still flows (e.g. `{"w": 60}` = only the width overridden); with `row` it is pinned to explicit row tracks. The shape was a full frame `{x, y, w, h}` until schemaVersion 1; the 1 → 2 migration converts.
- **The row grid** (ADR-0019): on mobile the content surface is a CSS grid with one column and `minmax(8px, auto)` rows (`MOBILE_ROW = 8` in `engine/migrate.js`, a model constant independent of `grid.size`). The rows GROW when the content is taller than the span, so a row position is a position in the composition, not a frozen pixel distance: if text above a pinned block grows, the block follows. The auto-placement is sparse (never dense), so flowing blocks never land on top of pinned bands; pinned-on-pinned overlap is allowed (`z` applies). The published render is a pure function of the stored data (ADR-0001): row growth is the browser's CSS, no JS repositioning for visitors.
- **`decor`** (optional, default false): decor blocks (typically lines/circles) are left out of the entrance animation's content wave (stagger) and of layout switching (Change layout never moves decor). From schemaVersion 2 (ADR-0019) the mobile hiding has moved to `hideMobile`.
- **`hideMobile`** (optional, default false, additive from v0.7, ADR-0019): hide the block on mobile. Works throughout the mobile render path (also for pinned blocks). New shape blocks get `decor: true` and `hideMobile: true` from the palette; the 1 → 2 migration sets `hideMobile: true` on all blocks that had `decor: true`.
- **`animation`** (optional): `{ "type": "fade-in", "version": 1, "props": { "duration": 600, "delay": 0 } }` - animations are registry types with the same migration contract. Core types (v0.5): `fade-in`, `slide-up`, `zoom-in` (entrance, played on scroll-in for visitors; the editor's preview shows the end state) and `hover-lift`. `prefers-reduced-motion` is respected. Sections have the same optional `animation` field (additive from v0.5). An unknown animation type shows the content unanimated - animation never topples a page.
- **`stagger`** (section level only, additive from v0.6) is a GROUP entrance animation: it does not animate the section itself, but lets the section's card blocks (`.urd-block` without their own animation; decor blocks are excluded from 0.6.6.4.6) in staggered from ONE shared trigger (the section's visibility). `props`: `duration`, `delay` (shared base delay in ms, additive from 0.6.6.4.6, absence = 0), `step` (ms between steps), `effect` (`fade-in`/`slide-up`/`zoom-in`) and `pattern` - `sequence` (one step per card in order), `columns`/`rows` (cards with the same x/y position within a tolerance come together, the wave is pushed along; pure `staggerColumnDelays`) or `center` (outwards from the middle of the row; pure `staggerCenterDelays`).
- **`hover`** (optional, additive from v0.6): a pointer effect in the same form as `animation` (e.g. `{ "type": "hover-lift", "version": 1, "props": {} }`), on both blocks and sections. The entrance animation and the pointer effect are INDEPENDENT fields and can be combined (`zoom-in` in + `hover-lift` on pointer). Older pages can have a pointer effect stored in `animation` (the fields were one until 0.6.30): the engine renders both fields the same way, so such data works unchanged; the editor moves the value to `hover` at the next animation change.

## `content/samlinger/<id>.json` (collections)

The data block pattern (ADR-0007): similar entries as DATA, rendered by
the collection block with a selectable view (`cards`/`list`/`archive`). The contract
lives in `schema/collection.schema.json`.

```json
{
  "schemaVersion": 1,
  "id": "nyheter",
  "name": "Nyheter",
  "kind": "news",
  "entries": [
    { "id": "velkommen", "title": "Velkommen", "date": "2026-07-19", "text": "…", "image": "/media/…", "href": "/om-oss" }
  ]
}
```

- **`kind`** (`news`/`notices`/`publications`/`products`/`custom`) controls which fields the editor highlights; the views read the shared field names.
- **The product fields** (kind `products`, additive from v0.7, read by the product block): `price` (a number, the currency word is set on the block), `memberPrice` (optional discounted price), `badge` (a short label on the card), `sizes` (a list of size names, shown as choice chips) and `colors` (`[{name, image?}]`; a colour choice with its own image swaps the card's image). The catalogue is git-owned like other collections (ADR-0007).
- The entries' `text` is rich text with the same visitor protection as the text blocks (executable code is always stripped at rendering); `title` is always plain text.
- `content/samlinger.json` is the index file (`{ "version": 1, "samlinger": ["nyheter"] }`): static hosts cannot list folders, the same precedent as plugins.json.
- **CSV import/export** (from v0.7, feature map C12): the Collections panel exports the entries as CSV and imports a CSV file that REPLACES the entries (the first row is the column names; the list fields `sizes`/`colors` are separated with `|`, colour images do not come along). Pure logic in `engine/collections-csv.js`, which only the editor bundles - visitors never load it.
- The collection block's props: `{ collection, view, limit, newestFirst }` (additive). A missing/empty collection gives a calm empty state in the editor and nothing for visitors.

## Mobile review

Pinned blocks no longer follow desktop and can drift when desktop changes. Urd makes this an explicit, traceable state flag instead of a silent error:

```json
"responsive": {
  "mobile": {
    "mode": "auto",
    "attention": { "needed": true, "reason": "desktop-changed-after-mobile", "since": "2026-08-13T14:02:00Z" }
  }
}
```

Rules (schemaVersion 2, ADR-0019):

1. Overrides live PER BLOCK in `frames.mobile` (see above). A section without overrides is derived completely afresh at every render; nothing can drift, and `attention` is always `null`.
2. In a section WITH overrides, any desktop change (frame change, block added/deleted, reorganisation) sets `attention.needed: true` with a machine-readable `reason` (English tokens: `layout-changed`, `block-edited`, `desktop-changed-after-mobile`, `section-height`, `block-moved`, `block-deleted`, `block-added`).
3. The flag is reset by the user confirming «Mark as reviewed» in the mobile view, or by the section's overrides being reset (`urd-mobile-reset`).
4. The flag is **data** - it survives sessions, is shared between editors and is set correctly even if someone hand-edits the JSON.
5. The visitor engine ignores the flag completely; the page always renders something sensible. The flag is editorial metadata.
6. `mode` is LEGACY from schemaVersion 2: `"manual"` is read by the migration (which converts the old materialised frames) and is never written again. The field is kept readable so old files load correctly.

Admin shows a badge per section and a global counter: «2 sections need mobile review».

## The migration contract

All registry types (blocks, sections, background layers, animations) define:

```js
Urd.blocks.define('text', {
  version: 3,                      // the type's current version
  label: 'Text',
  defaults: () => ({ html: '<p>New text</p>', align: 'left' }),
  migrations: {
    1: (props) => ({ ...props, align: 'left' }),                          // v1 → v2
    2: (props) => ({ html: props.text ?? props.html, align: props.align }) // v2 → v3
  },
  render(el, props, ctx) { /* build DOM */ }
});
```

The loading rule (implemented in the engine's `migrate.js`):

```js
while (data.version < def.version) {
  props = def.migrations[data.version](props);
  data.version++;
}
```

- **Stepwise:** each migration lifts exactly one version. A v1 block meets a v4 definition → three pure function calls.
- **In memory:** loading never mutates the repo. The JSON on disk is written only at the next publish (then in lifted form).
- **Pure functions:** migrations take props in and give props out. No DOM, no side effects - they can be unit-tested trivially.
- **Missing migration or unknown type:** placeholder rendering, the original JSON untouched. Never throw, never delete.
- **File level:** `schemaVersion` is lifted with the same stepwise pattern for structural changes, implemented in `liftPageFile()`/`liftSiteFile()` in migrate.js. The page table has the steps 1 → 2 (the mobile model, ADR-0019), 2 → 3 (contract tokens to English, ADR-0021) and 3 → 4 (the core preset ids, ADR-0021); template payloads are lifted correspondingly on insertion via `liftContractTokens` (templates-model.js), since they are inserted outside the page lift.

This contract is the reason an Urd update never breaks a built site - and from the first real format change after v1.0 the test suite must always contain at least one real v(n)→v(n+1) migration as proof (the machinery itself is covered by the synthetic tests in `tests/migrate.test.mjs`).

## Templates

A user-made template is a serialised section, block group or page stored in `content/maler/<id>.json` (the id is a slug of the name, the same id regime as collections) - the same form as above, with a small meta header. The payload key equals `mal.kind` (`section` | `blocks` | `page`):

```json
{ "schemaVersion": 1, "mal": { "name": "Vår hero", "kind": "section" }, "section": { … } }
{ "schemaVersion": 1, "mal": { "name": "Kort-trio", "kind": "blocks" }, "blocks": [ … ] }
{ "schemaVersion": 1, "mal": { "name": "Kampanjeside", "kind": "page" }, "page": { … } }
```

- **The index file `content/maler.json`** (`{ "version": 1, "maler": ["<id>", …] }`) lists the template ids, the same precedent as collections (ADR-0007): static hosts cannot list folders. The template repo ships an empty index.
- **The re-id rule**: the ids in the template file are provenance and are stored untouched; EVERY insertion deep-clones and assigns new ids (the section and all blocks) before anything is put into the page data, so the same template can be inserted several times without collision. Block groups are stored with their frames as they stand; anchor shifting and clamping within the section happen on insertion, never on saving (the helpers live in the engine's `templates-model.js`). For page templates (`kind: "page"`) additionally: `meta.id` and `meta.title` are set to the NEW page's slug and title on insertion (the slug is validated against reserved names and existing pages, never a generated block id), and all section and block ids across the sections are re-id'd.
- The schema is `schema/mal.schema.json` (reuses the page schema's section and block definitions; the `page` payload is a whole page file); `npm run validate` validates all the templates in the index plus three synthetic cases built from presets.

«Save as template» in the editor (v0.6) writes these; the preset picker shows them side by side with the core presets. A template can be packaged as a plugin for sharing.

## Plugins

Static hosts cannot list folders, so an index file points out the enabled plugins:

```json
// plugins/plugins.json
{ "version": 1, "enabled": ["calendar"] }
```

Each plugin is a folder with a manifest + ES module (the calendar reference plugin shows the whole form):

```json
// plugins/calendar/plugin.json
{
  "id": "calendar",
  "name": "Kalender",
  "names": { "nb": "Kalender", "nn": "Kalender", "en-GB": "Calendar", "se": "Kaleandar", "tr": "Takvim" },
  "locales": true,
  "version": "1.0.0",
  "requiresEngine": ">=0.6.8 <1.0.0",
  "entry": "index.js",
  "provides": { "blocks": ["calendar"], "sectionPresets": ["whats-on"], "backgrounds": [], "animations": [], "templates": [] }
}
```

```js
// plugins/calendar/index.js
export function register(Urd) {
  Urd.blocks.define('calendar', { version: 1, /* … */ });
  Urd.sections.define('whats-on', { label: 'Hva skjer', /* … */ });
}
```

The provides key `templates` was called `maler` before ADR-0021; the old name is still read (dual-read in plugins.js), and old plugins that register via `Urd.maler` hit the same registry as `Urd.templates`. The engine aliases the old reference plugin ids (the blocks kalender/kart/skjema → calendar/map/form, the presets hva-skjer/finn-oss/kontaktskjema → whats-on/find-us/contact-form), so pages built before the rename work with both old and manually updated plugin folders.

### The compatibility surface for plugin copies

`plugins/**` are user paths (urd.json `userPaths`) that the updater never touches, so a site keeps running the plugin folders it was created with, also the reference plugins copied from the 0.6.11 template, against every later engine. The engine therefore keeps these points stable; `tests/plugin-compat.test.mjs` pins them:

- **The section's inline `min-height` is a plain CSS length** (`size.minHeight`, or `<lowest block edge>px` when the section has none): plugin auto-grow reads it with `parseFloat` and writes `${bottom}px` back. The nav clearance is the section's padding (`.urd-section` is `content-box`, base.css), so an overwritten min-height never loses the clearance.
- **Block geometry is content geometry:** a block's `offsetTop`/`offsetLeft` are relative to `.urd-canvas`, and `el.closest('.urd-section')` is the section the block grows.
- **The config panel classes** `.urd-kal-config`, `.urd-skjema-config` and `.urd-kart-config` (the old reference names) are guarded in the preview alongside `.urd-cal-config` and `.urd-form-config`, so clicks inside a panel never start a block drag.
- **The registry aliases:** `Urd.maler` for `Urd.templates`, `provides.maler` for `provides.templates`, and the block and preset id aliases listed above.

Optional manifest fields (all additive):

- **`csp`** (additive from v0.6): external origins the plugin needs CSP exceptions for, as `{ "connectSrc": ["https://…"], "frameSrc": ["https://…"] }`. `_headers` is never changed automatically (ADR-0006): the Plugins panel shows the site owner exactly which lines must go in, and the host is added manually to `_headers`.
- **`names`** (additive from 0.6.8, ADR-0012): display name per admin language (`{ "nb": "Kalender", "en-GB": "Calendar", … }`). Admin shows `names[admin language]` with `name` as fallback; `name` remains the mandatory base name.
- **`locales`** (additive from 0.6.8, ADR-0012): `true` promises `locales/{nb,nn,en-GB,se,tr}.js` (the same form as the engine's locale files: `export default { lang, strings }`, keys prefixed with the plugin id, editor keys under `<id>.edit.*`). The loader puts the texts into the visitor registry with the site language (and in preview also into the admin registry with the admin language) BEFORE `register()` runs; nb is the base, a missing language file falls back silently to nb, and the parity test (`tests/i18n.test.mjs`) keeps the files in sync.
- **`languages`** (additive from 0.6.8.10, ADR-0012): languages the plugin delivers as a LANGUAGE PACK, that is an entirely new language for Urd itself (not the plugin's own texts, that is `locales`). Each entry is `{ "code": "sv", "name": "Svenska", "site": true, "admin": false }`: `code` is a BCP 47 code that is NOT one of the built-in ones (`nb`, `nn`, `en-GB`, `se`, `tr`), `name` is the language's own name as shown in the language pickers, and `site`/`admin` say which registries the pack covers (at least one). The entries promise the files `locales/site/<code>.js` and `locales/admin/<code>.js`, which have the same form and keys as the engine's own - the bokmål base sits underneath, so a pack can cover everything or only parts.

```json
// plugins/lang-sv/plugin.json - a PURE language pack has no code, and
// therefore neither entry nor provides
{
  "id": "lang-sv",
  "name": "Swedish language pack",
  "version": "1.0.0",
  "requiresEngine": ">=0.6.8 <1.0.0",
  "languages": [{ "code": "sv", "name": "Svenska", "site": true, "admin": true }]
}
```

`entry` and `provides` are required for all other plugins, but optional when `languages` is given: a pure language pack is just files. A pack language becomes available when the pack is ENABLED in `plugins.json`; the visitor picker (`site.lang`) follows the plugin draft, while the admin language picker offers only packs that are already published (that is the list the engine reads at startup).

Plugins use the **same** define APIs as the core and are subject to the same migration contract - a plugin update can never break existing content either. If a plugin is disabled/missing, its blocks are rendered as placeholders; the data remains.

**The field contract** (additive from 0.6.10): a plugin block def can have `fields`, a list of fields that admin renders directly in the Properties panel instead of the plugin building its own config panel. Each field is `{ key, type, labelKey/label, placeholderKey/placeholder?, min?, max?, step?, options? }`:

- `key` is the prop name the field writes, `type` is one of `text`, `number` (with `min`/`max`/`step`, the value is clamped), `toggle` (boolean), `select` (`options: [{ value, labelKey/label }]`, rendered themed) and `place`.
- `place` is a place field: the text is written to `key`, and coordinates to the props `lat`/`lon` (convention). «lat, lon» pairs are interpreted locally, `https?://` links are written untouched (the plugin interprets them itself at rendering), everything else is geocoded via `/api/geocode` with the Search button.
- The labels (`labelKey`/`placeholderKey`, with `label`/`placeholder` as fallback) are resolved on the iframe side where the plugin dictionary lives, and are sent ready-made in the `urd-plugin-blocks` message, as `label`/`variants`.
- Without `fields`, Properties shows as before a «Settings …» button that opens the plugin's own config panel in the preview (`urd-open-block-config`). The map plugin is the reference for the field contract; calendar and form for the config panel pattern.
