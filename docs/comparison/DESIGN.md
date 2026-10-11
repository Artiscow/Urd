# Design: what modern sites look like, and how to build it

This file answers one question: what do well-made websites look like in 2025-2026, and which of those patterns should an Urd site be able to wear? For each pattern it says what it is, who shows it, how to build it natively, what it costs in accessibility and speed, whether it lasts, and where Urd stands. It ends with the design presets and settings Urd should support, as D-IDs.

Surveyed 11 October 2026. The method, the source marks and the ID scheme are in [README.md](README.md). The elements themselves (tabs, carousels, logo walls, people cards and the rest) are in [ELEMENTS.md](ELEMENTS.md). Browser support for every feature named here is in [CODE.md](CODE.md); where a version is quoted below it follows that table, with Chrome 155, Firefox 157 and Safari 27 current on the day.

**How each pattern is written up.**
- **What** it is.
- **Examples**, each with a source.
- **Build**: a short native snippet, gated the way [ADR-0011](../adr/0011-native-css-first.md) asks: the plain end state first, the enhancement behind `@supports` or a media query.
- **Cost** in accessibility and performance.
- **Lasting or fad.**
- **Urd today**, from the engine as counted on 11 October 2026 (engine 0.7.4), with a pointer to the D-ID.

**The floor.** Associations and voluntary organisations are covered by forskrift om universell utforming av IKT ([Uutilsynet](https://www.uutilsynet.no/regelverk/regelverk-og-krav/746), primary). A private-sector site must meet WCAG 2.0 A and AA, 35 success criteria ([Uutilsynet](https://www.uutilsynet.no/regelverk/kva-seier-forskrifta/153), updated 10 June 2026, primary). WCAG 2.2 is not part of the Norwegian rules ([Uutilsynet](https://www.uutilsynet.no/fremtidig-regelverk/status-nyere-versjoner-av-wcag/1868), 8 November 2023, primary). Criteria from WCAG 2.1 and 2.2 cited below are good practice above that floor, and the text says which is which.

---

## The award landscape

**Awwwards 2025** ([winners](https://www.awwwards.com/annual-awards/winners), primary):
- Site of the Year and Users' Choice (596 votes): Lando Norris by OFF+BRAND. It has cursor-reactive blob overlays on the hero, neon accents taken from the helmet, and a modular «On Track / Off Track» split ([Awwwards](https://www.awwwards.com/sites/lando-norris), primary; [DesignRush](https://designrush.com/best-designs/websites/lando-norris-website-design), secondary).
- Developer Site of the Year: Messenger by abeto, a WebGL planet.
- E-commerce: Scout Motors. Agency: Immersive Garden. Studio: Malvah.

**Awwwards 2026.**
- Sites of the Month ([Awwwards](https://www.awwwards.com/websites/sites_of_the_month/), primary): Bruno Simon's portfolio (January), Shopify's «Renaissance Edition» (February), Lusion's Oryzo AI (April), Bürocratik's Floema (May) and Why Zero (September).
- The Sites of the Day from 2 to 11 October 2026 are almost all portfolios, luxury goods or 3D, and every one also won a Developer Award ([Awwwards](https://www.awwwards.com/websites/sites_of_the_day/), primary).

**Galleries.**
- Siteinspire's largest categories include «Typographic» (2,105 sites), beside «Minimal» and «Grid Layout» style filters ([Siteinspire](https://www.siteinspire.com/), primary).
- One Page Love holds 9,164 sites ([One Page Love](https://onepagelove.com/), primary).
- godly.website now redirects to recent.design ([godly.website](https://godly.website/), primary, observed 11 October 2026).
- No 2025 Website of the Year data was found for CSS Design Awards or FWA.

**Trend lists.**
- Figma's 2026 list puts 3D and WebGL first. It also names bold typography, vibrant palettes, dark mode as standard, neumorphism, neo-brutalism, and collage, scrapbook and retro ([Figma](https://www.figma.com/resource-library/web-design-trends/), primary).
- Webflow's 2026 list names dynamic text treatments, full colour systems instead of a single accent, bento grids and a «TL;DR experience» ([Plushcap's summary of Webflow's post of 23 December 2025](https://www.plushcap.com/content/webflow/blog/webflow-8-web-design-trends-to-watch-in-2026), secondary).

**What the look costs.** The showcase pages measured on 11 October 2026 carry their motion in runtimes (measured):

| Page | Builder | Runtime | JavaScript (gzip) |
|---|---|---|---|
| www.framer.com | Framer | React, Framer Motion | 1,165 KB |
| red.org | Framer | React, Motion, GSAP, Lenis | 546 KB |
| webflow.com | Webflow | jQuery, GSAP 3.15, Swiper, three.js | 408 KB |
| truus.co | Webflow | jQuery, GSAP with ScrollTrigger, Flickity | 222 KB |
| urdweb.pages.dev | Urd | the engine's own modules, all preloaded | 262 KB |
| astro.build | Astro | none hydrated on the page | 3.8 KB |

**The lesson for associations.** Award winners are WebGL-heavy brand sites built by studios. A club site borrows their typography, their layout rhythm and their restraint, not their runtimes: a strong type pairing, generous space, one accent used with intent, real photographs, and motion the visitor can stop. Everything in the recommendations below can be built with CSS and the engine's own small modules.

---

## Layout

**How layout works in Urd.**
- On the desktop, blocks sit in absolute frames on a free canvas, inside a content width bound to 1440 px by default, while section backgrounds run the full width ([ADR-0018](../adr/0018-bound-content-width.md)).
- A push pass moves the blocks below a block whose content grows ([ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md)).
- On the phone, a synced one-column row grid stacks the blocks in reading order ([ADR-0019](../adr/0019-synced-mobile-model.md)).

So a page-layout pattern becomes a section preset of placed blocks on the desktop, and the row grid stacks it on the phone. The CSS-grid builds below apply inside a block, such as a collection view or the gallery. Container queries belong in block internals only: never on the canvas, and never on a block with sticky, because `container-type` makes the element the containing block for `position: fixed` (ADR-0018).

### Bento grid
- **What.** Modular cards of different sizes in one grid, some spanning two columns or two rows.
- **Examples.**
  - Tailwind Plus has 3 bento sections ([Tailwind Plus](https://tailwindcss.com/plus/ui-blocks/marketing), primary) and shadcnblocks 53 ([shadcnblocks](https://www.shadcnblocks.com/), primary).
  - Magic UI and Aceternity ship bento components ([Magic UI](https://magicui.design/docs/components), [Aceternity](https://ui.aceternity.com/components), primary).
  - Framer added bento grid layouts in March 2026 ([Framer updates](https://www.framer.com/updates), primary). Bento is on Webflow's 2026 list (above).
- **Build** (inside a block):
  ```css
  .bento{container-type:inline-size}
  .bento>ul{display:grid;gap:1rem;grid-template-columns:repeat(auto-fill,minmax(min(100%,15rem),1fr))}
  @container (width>48rem){.wide{grid-column:span 2}.tall{grid-row:span 2}}
  ```
- **Cost.** Text can overflow equal-height cards. `grid-auto-flow: dense` reorders the picture but not the DOM, which breaks meaningful sequence and focus order (WCAG 1.3.2 and 2.4.3, both level A since 2.0) ([W3C: focus order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html), primary). Avoid `dense`.
- **Lasting or fad.** Lasting as a component, fading as a whole-page style.
- **Urd today.** No bento section preset. The calendar block has bento designs, among them «Coming up bento» (code: `calendar-designs.js`). See D1.

### Editorial grid and full bleed
- **What.** Named grid lines give a content width, a wider «popout» width and the full width, so text keeps a readable measure while pictures and bands break out.
- **Examples.**
  - Josh W. Comeau's full-bleed layout ([joshwcomeau.com](https://www.joshwcomeau.com/css/full-bleed/), secondary).
  - WordPress's Twenty Twenty-Five sets a content width of 645 px and a wide width of 1340 px in theme.json ([twentytwentyfive](https://github.com/WordPress/twentytwentyfive), code).
- **Build:**
  ```css
  .page{display:grid;grid-template-columns:[full-start] minmax(1rem,1fr) [content-start] min(68ch,100% - 2rem) [content-end] minmax(1rem,1fr) [full-end]}
  .page>*{grid-column:content}.page>.bleed{grid-column:full}
  ```
- **Cost.** None to speak of.
- **Lasting or fad.** Lasting.
- **Urd today.**
  - The canvas binds content to the design width, with section backgrounds at full width (ADR-0018).
  - The ribbon block can already reach the window's edges: `width: 'page'` measures the section rather than using `100vw` (code: `blocks/ribbon.js`).
  - There is no shared per-block width choice. See D2.

### Asymmetric and overlapping layouts
- **What.** Pictures and text that overlap or sit off the grid on purpose.
- **Examples.**
  - Breakdance 2.4 shipped «Overlapped Images» on 9 June 2025 ([Breakdance](https://breakdance.com/breakdance-2-4/), primary).
  - Squarespace image blocks offer card, collage, overlap, poster and stack layouts ([Squarespace](https://support.squarespace.com/hc/en-us/articles/206543757-Adding-content-with-blocks), primary).
- **Build.** Grid areas that overlap, plus `z-index`.
- **Cost.** The layout must reflow at 320 px wide (WCAG 1.4.10, level AA from 2.1) ([W3C: reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), primary).
- **Lasting or fad.** Lasting in moderation.
- **Urd today.** Free placement with layers (z) already gives overlap on the desktop, and the phone's row grid stacks the blocks in reading order. Nothing to add.

### Sticky split screen
- **What.** A picture holds still while the text beside it scrolls past. It suits history and «about» pages.
- **Examples.** Aceternity's Sticky Scroll Reveal ([Aceternity](https://ui.aceternity.com/components), primary).
- **Build:**
  ```css
  .split{display:grid;grid-template-columns:1fr 1fr;align-items:start}
  .split>.media{position:sticky;top:0;block-size:100svh}
  @media (width<48rem){.split{grid-template-columns:1fr}.split>.media{position:static;block-size:auto}}
  ```
- **Cost.** Little. It unpins on the phone, and the reading order is the text's.
- **Lasting or fad.** Lasting.
- **Urd today.** Blocks can already pin while scrolling, dock to the screen and pin as a group (code: `sticky.js`), but no preset puts that to this use. See D3.

### Stacked cards on scroll
- **What.** Cards that pin one after another at growing offsets, so they pile up as the visitor scrolls.
- **Examples.** Aceternity's Card Stack ([Aceternity](https://ui.aceternity.com/components), primary).
- **Build:**
  ```css
  .stack>li{position:sticky;top:5rem;top:calc(5rem + (sibling-index() - 1) * 1rem)}
  ```
  `sibling-index()` became Baseline on 18 August 2026 ([webstatus](https://webstatus.dev/features/sibling-count), primary). Where it is missing, the second declaration is dropped and the cards pin at one offset.
- **Cost.** Cheap and accessible, because it is native scrolling.
- **Lasting or fad.** Trendy, but it does no harm.
- **Urd today.** Sticky groups exist. The calendar's «Stacked cards» design is a stack the visitor clicks through, not one that piles up on scroll (code). See D4.

### Horizontal scroll, and why scrolljacking fails
- **What.** A section whose content moves sideways while the visitor scrolls down: a pinned track moved by a view timeline.
- **Build** (as the field does it; Chrome and Safari only):
  ```css
  .h{view-timeline:--h block;block-size:300vh}
  .h>.track{position:sticky;top:0;display:flex;inline-size:max-content}
  @supports (animation-timeline:view()){@media (prefers-reduced-motion:no-preference){
   .h>.track{animation:x linear both;animation-timeline:--h;animation-range:contain}}}
  @keyframes x{to{translate:calc(-100% + 100vw) 0}}
  ```
- **Cost.**
  - NN/g finds that scrolljacking disorients. Its advice: keep it below the fold, leave it off on mobile, and never change the scroll direction ([NN/g](https://www.nngroup.com/articles/scrolljacking-101/), primary).
  - Scroll-driven animations are in Firefox Nightly only ([CODE.md](CODE.md)).
- **Lasting or fad.** Mostly a fad.
- **The better default** is a native sideways row: `overflow-x: auto` with scroll snap, which the visitor scrolls by choice. `::scroll-marker` dots and `::scroll-button()` arrows turn it into a carousel without script, but only in Chrome (135); Firefox and Safari have neither, so they stay an enhancement ([Chrome](https://developer.chrome.com/blog/carousels-with-css), primary).
- **Urd today.** The gallery's carousel view is a scroll-snap track (code). Collections have no sideways row. See D5; scrolljacking is D42.

### Full-bleed media heroes
- **What.** A photograph or video across the whole first screen, with the headline on it.
- **Examples.** Everywhere. Squarespace adds background image animations ([Applet Studio](https://www.applet.studio/blog/new-squarespace-features), secondary).
- **Build.** The hero image loads eager with `fetchpriority="high"` and with its `width` and `height`. A scrim sits under the text.
- **Cost.**
  - The hero is usually the page's Largest Contentful Paint. Horizon, Squarespace, WordPress and Astro load it eager with `fetchpriority="high"` (measured). Urd lazy-loads every image, the hero too, with no `width` or `height` (measured on urdweb.pages.dev). The fix belongs to responsive pictures in v0.8 ([CODE.md](CODE.md)).
  - Text on a photograph must still meet 4.5:1 (WCAG 1.4.3), which is what the scrim is for.
- **Lasting or fad.** Lasting.
- **Urd today.** The hero-image and hero-photos presets. Background layers stack, so a colour layer over the image layer is the scrim.

### Sticky headers that react to scroll
- **What.** A header that shrinks, that hides on the way down and returns on the way up, or that turns from transparent to solid.
- **Build** (Chrome only, with a sentinel fallback):
  ```css
  .u-header{position:sticky;inset-block-start:0}
  .u-header.is-stuck>.u-header__bar{background:var(--u-surface);box-shadow:0 1px 0 var(--u-line)}
  @supports (container-type:scroll-state){
   .u-header{container-type:scroll-state}
   @container scroll-state(stuck:top){.u-header>.u-header__bar{background:var(--u-surface);box-shadow:0 1px 0 var(--u-line)}}}
  ```
  Where `scroll-state` is missing, an IntersectionObserver sentinel toggles `.is-stuck`. `scroll-state()` is in Chrome only (133; `scrolled` from 144) ([Chrome](https://developer.chrome.com/blog/css-scroll-state-queries), primary).
- **Cost.** A header that hides must come back on scroll up and when focus moves into it.
- **Lasting or fad.** Lasting.
- **Urd today.** The nav shrinks or hides on scroll, and it can start transparent at the top and fill on scroll, through the engine's own scroll pass (code: `nav-model.js`). These are D49 and D50. `scroll-state()` would only replace that script, so it waits for Firefox and Safari (D6, T75).

### Carousels and accordions: what the research says
- **Auto-advancing carousels.**
  - NN/g found that auto-forwarding carousels hurt comprehension ([NN/g](https://www.nngroup.com/articles/auto-forwarding/), primary).
  - Baymard recommends 5-7 s intervals, a pause on hover, a permanent stop after any interaction and no auto-rotation on mobile, and notes that a static section often does as well ([Baymard](https://baymard.com/blog/homepage-carousel), primary).
  - WCAG 2.2.2 Pause, Stop, Hide (level A): moving content that starts by itself and lasts more than five seconds needs a way to pause or stop it ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), primary). The criterion has been in WCAG since 2.0, so it is inside the Norwegian floor.
- **Accordions.** Use them when readers need only a few sections; avoid them when most of the content is needed ([NN/g](https://www.nngroup.com/articles/accordions-on-desktop/), primary).
- **Urd today.**
  - The gallery's slides view advances every 5 s by default and stands still under reduced motion. A manual step restarts the timer rather than stopping it, and there is no pause button (code: `blocks/gallery.js`).
  - The ribbon block and the gallery's ribbon view pause under the pointer and while keyboard focus is inside them (`:focus-within`, `styles/base.css`); a tap on a phone stops them only because the browser emulates `:hover`, which is not specified behaviour and lets go at the next tap elsewhere. There is no control that pauses them and stays, and a hold that lasts only while the pointer or focus is there is not a pause in WCAG's sense. The calendar's Band design has a «Pause» option with a button (code).
  - The FAQ is built on `<details name>` (code).
  - See D25.

---

## Typography

**Urd's measured advantage: zero font bytes.** Urd uses system font stacks only, seven of them: system-ui, Arial, Verdana, Trebuchet MS, Georgia, Palatino and Courier New (code: `fonts.js`, «Urd never loads external fonts»). They feed the heading and body tokens. That means no font download and no third-party request, the best score in the measured set (measured). The rest of the field:
- www.framer.com declares 378 `@font-face` rules (measured).
- A Carrd Pro site embeds 208 Google Fonts faces (measured, newsletteros.com).
- Figma Sites uses `font-display: block`, which hides text while the font loads (measured).
- Bricks and Elementor preload the same font twice (measured).

**Good practice where a custom font is used** (measured and code):
- self-hosted variable woff2 with unicode-range subsets;
- one or two preloads with `crossorigin` (Astro, WordPress), at `fetchpriority="low"` (Horizon);
- `font-display: swap` or `fallback` (Twenty Twenty-Five);
- fonts declared as data (Twenty Twenty-Five's theme.json).

Hostinger proxies Google Fonts through its own origin, so no request reaches Google (measured, millawkids.com).

**The font items in 0.7.9 keep that score** (D10, D11):
- System stacks stay the default.
- A chosen font is a self-hosted file under `font-src 'self'`, never a third-party request.
- The site's own fonts can come from a folder in the repo.

### Serif revival and the pushback against generic sans
- **What.** Editorial serifs and characterful faces are back, with optical sizes; neo-grotesques are displacing geometric sans ([Creative Boom](https://www.creativeboom.com/features/font-trends-2025/), secondary; [Made Good Designs](https://madegooddesigns.com/trending-fonts/), secondary). Tiempos is cited as the dominant digital serif (Made Good Designs). The common pairings are a serif display face with a neutral grotesk for text, or a grotesk with a mono for a «technical» voice.
- **Build.** Two tokens, heading and body. `font-size-adjust` (Baseline since July 2024, [CODE.md](CODE.md)) keeps the x-height steady when a fallback face stands in.
- **Cost.** None with system faces; one file per face otherwise.
- **Lasting or fad.** Lasting.
- **Urd today.** Heading and body font tokens. Georgia and Palatino are the serif stacks and Courier New the mono (code). No pairing is offered as one choice. See D10.

### Variable fonts
- **What.** One file carries every weight, and often width and optical size.
- **Examples.**
  - Variable fonts are now the default (Creative Boom, Made Good Designs, above).
  - Framer and Divi 5.8.1 expose variable font axes ([Framer](https://www.framer.com/features/design/), primary; [Divi version log](https://help.elegantthemes.com/en/articles/9973580), primary).
  - Twenty Twenty-Five ships Manrope as one variable file for weights 200-800 ([twentytwentyfive](https://github.com/WordPress/twentytwentyfive), code).
- **Build.** `@font-face{font-weight:100 900}` and `font-optical-sizing:auto`. The `font-width` property became Baseline in September 2026 ([web.dev](https://web.dev/blog/web-platform-09-2026), primary).
- **Cost.** One file instead of several, but still a download.
- **Lasting or fad.** Lasting.
- **Urd today.** No font files (system stacks). See D11.

### Oversized display type
- **What.** Headlines set very large, often edge to edge. Figma lists «bold typography» for 2026 (above).
- **Build.** A fluid size with a rem term, so browser zoom still works ([Utopia](https://utopia.fyi/), secondary), and `text-box` trimming so the type aligns optically:
  ```css
  .poster h1{font-size:clamp(2.5rem,1.5rem + 5vw,7rem);text-box:trim-both cap alphabetic}
  ```
  - `text-box` ships in Chrome 133, Firefox 154 and Safari 18.2, and became Baseline on 18 August 2026 ([web.dev](https://web.dev/blog/web-platform-08-2026), primary). Where it is missing, the line keeps its normal leading.
  - `progress()` (Baseline 1 September 2026) can drive the same size from a container's width ([CODE.md](CODE.md)).
  - `text-fit`, a headline that fills its box, is in Chrome 150 only and has no CSS fallback ([MDN data](https://github.com/mdn/browser-compat-data/blob/main/css/properties/text-fit.json), primary).
- **Cost.** A size in `vw` alone breaks text zoom (WCAG 1.4.4 Resize text, level AA since 2.0) ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), primary).
- **Lasting or fad.** Lasting.
- **Urd today.** Text sizes are set in px on a selection, 8 to 120 px on a ladder (code: `text-typo.js`), and the theme offers fixed S/M/L/XL steps. Nothing is fluid. See D7, D9 and D14.

### Balanced and pretty wrapping
- **What.** Headings wrap into lines of even length; body text avoids a lone last word.
- **Examples.** Framer exposes text balance ([Framer](https://www.framer.com/features/design/), primary).
- **Build:**
  ```css
  h1,h2,h3{text-wrap:balance} p{text-wrap:pretty}
  ```
  `balance` is Baseline since May 2024. `pretty` ships in Chrome 117 and Safari 26 but not in Firefox, which ignores it harmlessly ([MDN data](https://github.com/mdn/browser-compat-data/blob/main/css/properties/text-wrap.json), primary).
- **Cost.** None.
- **Lasting or fad.** Lasting.
- **Urd today.** `balance` on the large quote and the big footer CTA heading only (code: `styles/base.css`). See D8.

### Kinetic text
- **What.** Words that type, rotate, scramble or reveal one by one.
- **Examples.**
  - Webflow names «dynamic text treatments» a 2026 trend (above).
  - Magic UI has Text Reveal and Aceternity has Text Generate ([Magic UI](https://magicui.design/docs/components), [Aceternity](https://ui.aceternity.com/components), primary).
  - GSAP's SplitText, free since 30 April 2025, was rewritten with screen-reader support ([Webflow](https://webflow.com/blog/gsap-becomes-free), primary).
- **Build.**
  - A per-word reveal uses `animation-timeline: view()` behind `@supports`.
  - A rotating headline is stacked spans with `@keyframes`. The whole sentence is given once as visually hidden text, and the animated copies are `aria-hidden`.
- **Cost.** Assistive technology reads split words one by one unless the real text stays intact. A loop longer than five seconds needs a pause (WCAG 2.2.2).
- **Lasting or fad.** Moderately faddish.
- **Urd today.** None. The animated headline with a pause is in the Element round, stage ER-H ([ELEMENTS.md](ELEMENTS.md)).

### Text details: drop caps, shadows, selection, case and links
- **Examples.**
  - Divi 5.8.1 has a drop cap ([Divi version log](https://help.elegantthemes.com/en/articles/9973580), primary).
  - WordPress 7.1 adds text shadow ([WordPress 7.1 field guide](https://make.wordpress.org/core/2026/08/05/wordpress-7-1-field-guide/), primary).
  - WordPress styles links with a hover colour ([Styles overview](https://wordpress.org/documentation/article/styles-overview/), primary).
  - Framer sets a selection colour and link styles ([Framer](https://www.framer.com/features/design/), primary).
  - Squarespace's Finish Layer gives uploaded fonts letter spacing and text transform ([Squarespace](https://www.squarespace.com/blog/finish-layer-website-design-tools), 16 April 2026, primary).
- **Build.**
  - `::selection`, `text-shadow`, `text-transform`, `letter-spacing`, `a:hover` and `a[aria-current="page"]` are all plain CSS.
  - A drop cap needs `initial-letter`. It is in Chrome 110, prefixed in Safari, and behind a pref in Firefox ([MDN data](https://github.com/mdn/browser-compat-data/blob/main/css/properties/initial-letter.json), primary). Gate it with `@supports`; the end state is an ordinary first letter.
- **Cost.** Shadows and selection colours must keep the text's contrast.
- **Lasting or fad.** Lasting.
- **Urd today.** A text-shadow glow on the nav's hover styles only (code). No selection colour, letter case or link style setting. See D12 and D13.

---

## Colour

### OKLCH and relative colours
- **What.** A perceptually even colour space, so a whole palette can be derived from one brand hue in even steps ([Evil Martians](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl), secondary).
- **Examples.**
  - Divi derives shades with relative HSL colours, and has Color Harmony and Color Scale generators ([Divi 5](https://www.elegantthemes.com/blog/divi-resources/how-to-get-started-with-divi-5), primary; [Divi version log](https://help.elegantthemes.com/en/articles/9973580), primary).
  - Webflow accepts `color-mix()` and `clamp()` as variable values ([Webflow](https://help.webflow.com/hc/en-us/articles/41843932314259-Use-functions-in-variable-values), primary).
  - Framer has P3 colours ([Framer](https://framer.com/updates/design-pages), primary).
- **Build.** A custom property never falls back on its own, so the hex palette comes first and the derived one sits behind `@supports`:
  ```css
  :root{color-scheme:light dark;--brand:#3d5ccc;--brand-soft:#e9edfb;--surface:#fbfbfd}
  @supports (color:oklch(from red l c h)){:root{
   --brand:oklch(55% .17 265);
   --brand-soft:oklch(from var(--brand) 95% calc(c*.25) h);
   --surface:light-dark(oklch(99% .004 265),oklch(19% .02 265))}}
  @media (color-gamut:p3){@supports (color:oklch(0% 0 0)){:root{--brand:oklch(55% .22 265)}}}
  .on-brand{color:#fff}
  @supports (color:contrast-color(red)){.on-brand{color:contrast-color(var(--brand))}}
  ```
  - Relative colour syntax is Baseline since September 2024 ([webstatus](https://webstatus.dev/features/relative-color), primary).
  - `contrast-color()` is Baseline since 10 April 2026 (Chrome 147, Firefox 146, Safari 26), and it returns only black or white ([web.dev](https://web.dev/blog/web-platform-04-2026), primary).
  - `light-dark()` accepts images since September 2026, so a logo can follow the colour scheme ([CODE.md](CODE.md)).
- **Cost.** Low. A generated palette must still pass the contrast check.
- **Lasting or fad.** Lasting.
- **Urd today.**
  - Hex tokens (background, surface, text, accent, accent text) written to `content/theme.css`.
  - base.css uses `color-mix()` 193 times, and `light-dark()` appears 14 times across base.css (5) and the generated `content/theme.css` (9) (measured).
  - With «Text on accent» on Auto, `contrast-color()` sets the text on the accent behind `@supports` (code: `theme.js`).
  - Theme suggestions, and a dark palette that the Theme panel can derive from the light one (code: `theme.js` and the editor).
  - OKLCH appears only in the editor's own category colours (code).
  - See D15 and D16.

### Dark mode
- **What.** A dark palette beside the light one.
- **Research.** NN/g found that light mode performs better for users with normal vision ([NN/g](https://www.nngroup.com/articles/dark-mode/), primary). Figma treats dark mode as standard for 2026 (above). So: follow the system preference by default, and offer a toggle.
- **Lasting or fad.** Lasting.
- **Urd today.** Light and dark through `light-dark()` and an alternative palette. A first visit follows `prefers-color-scheme`; the toggle in the nav overrides it, and the visitor's choice is remembered in localStorage (code: `theme.js`). This is D53.

### Expressive colour systems
- **What.** Saturated, full colour systems instead of one accent: Figma's «vibrant palettes» and Webflow's «full colour systems» (above).
- **Research.** Material 3 Expressive uses colour, shape, size, motion and containment to make the key actions stand out. Google reports users finding key elements up to 4 times faster in expressive layouts, and up to 87% preference among 18-24-year-olds ([Google Design](https://design.google/library/expressive-material-design-google-research), primary).
- **Build.** The same token set at two intensities:
  - calm: one accent, quiet surfaces and small radii;
  - expressive: a second and a third colour, larger shapes, bolder type and livelier motion.
- **Cost.** Every combination must pass the contrast check.
- **Lasting or fad.** Lasting, and close to a student audience.
- **Urd today.** Seven section colour roles (Surface, Accent, Inverse, Soft, Muted, Deep, Highlighted cards) and theme suggestions (code: `theme.js` for the roles, `editor/src/App.svelte` for the suggestions), but no intensity setting. See D18. The auto tone that alternates sections for rhythm is D19.

### Gradients, mesh and grain
- **What.** Soft colour fields: grain laid over a gradient with SVG `feTurbulence` ([CSS-Tricks](https://css-tricks.com/grainy-gradients/), secondary); a mesh gradient made of several `radial-gradient` layers interpolated `in oklch`.
- **Examples.** Framer's marketplace sells grainy mesh gradients, and Wix offers a fluid gradient (see Backgrounds).
- **Cost.** Low. An animated gradient moves on `transform`, not on `background-position`, which is how Urd's does it (code: `backgrounds/gradient.js`).
- **Lasting or fad.** Moderately lasting.
- **Urd today.** A gradient layer (animated as pan, pan loop, rotate, pulse or orbit), and glow and grain layers. No mesh. See D29.

### Duotone
- **What.** A photograph in two colours, usually the brand colour and a dark. It makes a set of amateur photographs look like one series, which suits a club archive.
- **Examples.**
  - Divi offers 16 blend modes on background images ([Divi](https://www.elegantthemes.com/documentation/divi/background-options/), primary).
  - Framer offers blend modes and filters ([Framer](https://www.framer.com/features/design/), primary).
- **Build.** SVG `feColorMatrix`, or a greyscale picture under the brand colour with `mix-blend-mode`.
- **Lasting or fad.** Lasting as a tool.
- **Urd today.**
  - The gallery and the image gallery layer have twelve tones. One of them is a duotone in the accent colour: the picture in greyscale with the accent laid over it in `mix-blend-mode: color` (code: `gallery-layout.js`, `styles/base.css`).
  - The image block has brightness, contrast and saturation only (code: `blocks/image.js`).
  - See D30.

### P3
OKLCH reaches the P3 gamut directly, and `@media (color-gamut: p3)` can raise the chroma on wide-gamut screens. The cost is low. It is part of D15.

### Contrast rules
- WCAG 1.4.3 asks for 4.5:1 for body text and 3:1 for large text, at level AA since 2.0, so it is inside the Norwegian floor ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), primary).
- Webflow's colour picker shows the ratio against AA and AAA ([Webflow](https://webflow.com/updates/check-text-accessibility-with-built-in-color-contrast-ratio-tool), primary), and Duda's text widget has a checker ([Duda](https://www.duda.co/accessibility), primary).
- In Urd the check belongs to the accessibility round 0.7.11: AA and AAA in the colour picker, and contrast in the audit panel ([FEATURES.md](FEATURES.md)). Every colour preset here (D15 to D19, D22 and D23) must pass it in both light and dark.
- Urd's own calendar designs Glass and Dark glass read at about 4:1 for body text by default, under the floor; they are listed under 0.7.19.28 in [BACKLOG](../BACKLOG.md).

---

## Surfaces

### Glass and Liquid Glass
- **What.** A translucent surface that blurs, and in Apple's version refracts, what lies behind it.
- **Examples.** Apple introduced Liquid Glass in June 2025 across iOS 26 and macOS Tahoe ([Apple](https://www.apple.com/uk/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design), primary). Divi 5.11.1 added a backdrop filter ([Divi version log](https://help.elegantthemes.com/en/articles/9973580), primary), and Framer has background blur ([Framer](https://www.framer.com/features/design/), primary).
- **Research.**
  - NN/g (Budiu, 10 October 2025) reports legibility failures, cramped targets, an unpredictable interface and decorative motion: «Motion for motion's sake is not usability» ([NN/g](https://www.nngroup.com/articles/liquid-glass/), primary).
  - NN/g's earlier glassmorphism guidance: guarantee contrast, use a heavy blur, and let users reduce transparency ([NN/g](https://www.nngroup.com/articles/glassmorphism/), primary).
  - Real refraction on the web needs an SVG `feDisplacementMap` inside `backdrop-filter`. That works in Chromium only and is CPU-heavy on large areas ([LogRocket](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/), secondary).
- **Build** (frosted, not refracting):
  ```css
  .glass{background:rgb(255 255 255/.85)}
  @supports (backdrop-filter:blur(1px)){.glass{background:rgb(255 255 255/.45);backdrop-filter:blur(16px) saturate(1.4)}}
  @media (prefers-reduced-transparency:reduce){.glass{background:Canvas;backdrop-filter:none}}
  ```
  `prefers-reduced-transparency` is in Chrome only ([CODE.md](CODE.md)), so the solid base must already be legible.
- **Cost.**
  - Contrast changes with whatever is behind the glass.
  - A blur over a large area costs frames.
  - In Urd, `backdrop-filter` must never sit on `.urd-canvas`, where it would break pinned blocks (ADR-0018).
- **Lasting or fad.** A fad at full strength; lasting as subtle frosted chrome on bars and pills.
- **Urd today.** A «glass» box style on blocks and a blur switch on the nav surface (code: `box-style.js`, `nav-model.js`), with no reduced-transparency fallback. See D22; full refraction is D43.

### Radius scales and corner shapes
- **What.** A small set of named radii instead of one, and corners that are more than circular arcs.
- **Examples.**
  - Material 3 Expressive has 10 corner-radius values and 35 shapes ([Android Authority](https://www.androidauthority.com/google-material-3-expressive-features-changes-availability-supported-devices-3556392/), secondary).
  - WordPress 7.1 adds radius tokens ([Roadmap to 7.1](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/), primary).
  - Framer offers squircle corners ([Framer](https://www.framer.com/features/design/), primary).
- **Build:**
  ```css
  .card{border-radius:24px}
  @supports (corner-shape:squircle){.card{border-radius:32px;corner-shape:squircle}}
  ```
  `corner-shape` and `superellipse()` are in Chrome 139 only. Firefox has them behind a pref in Nightly and Safari in Technology Preview ([MDN data](https://github.com/mdn/browser-compat-data/blob/main/css/properties/corner-shape.json), primary; [Smashing Magazine](https://www.smashingmagazine.com/2026/03/beyond-border-radius-css-corner-shape-property-ui/), March 2026, secondary). The end state is a plain `border-radius`.
- **Cost.** None.
- **Lasting or fad.** Lasting.
- **Urd today.** Two radius tokens in the theme (small and large corners), plus radius steps inside some components such as the gallery (code). See D20.

### Soft shadows, hairlines and style presets
- **What.** Layered soft shadows and hairline borders are the quiet default of 2025-2026. Builders sell them as presets, together with the states of a button.
- **Examples.**
  - WordPress ships shadow presets (Natural, Crisp, Sharp, Soft) ([Styles overview](https://wordpress.org/documentation/article/styles-overview/), primary), and 7.1 adds hover, focus and active states for buttons ([WordPress 7.1 field guide](https://make.wordpress.org/core/2026/08/05/wordpress-7-1-field-guide/), primary).
  - Divi has element and option-group presets ([Divi](https://www.elegantthemes.com/blog/theme-releases/preset-based-design), primary).
  - Elementor 4 styles hover, focus and active per element ([Essential Addons](https://essential-addons.com/elementor-version-4-the-atomic-editor/), secondary).
  - Tilda Styles set typography, buttons and palette in one place ([Tilda](https://blog-en.tilda.cc/2025-in-review), primary).
- **Build.** A few shadow tokens, with `:hover`, `:focus-visible` and `:active` styles drawn from the same tokens.
- **Cost.** Focus must stay visible. Urd's base.css has 24 `:focus-visible` rules (measured).
- **Lasting or fad.** Lasting.
- **Urd today.** Box styles (background, shadow, border, glass), nav hover styles and the hover lift (code). There is no shadow scale, and no button states in a gallery. See D21.

### Neo-brutalism, and neumorphism
- **What.** Neo-brutalism means hard borders, offset solid shadows and flat saturated colour. Neumorphism means soft extruded surfaces in the same colour as the page. Figma's 2026 list names both (above).
- **Examples.** HyperUI ships a whole neo-brutalism set ([HyperUI](https://www.hyperui.dev/), primary).
- **Cost.** Neo-brutalism costs nothing and keeps strong contrast. Neumorphism draws its edges with faint shadows alone, which works against the contrast the presets must pass.
- **Lasting or fad.** Neo-brutalism suits student culture; offer it as a theme, not as a default. Neumorphism is not taken.
- **Urd today.** Neither. See D23 and D48.

---

## Motion

### How the builders apply entrance animations (measured)

| Builder | How the entrance runs | What a visitor sees before or without the script |
|---|---|---|
| Framer | Spring parameters in an inline `framer/appear` script; elements are rendered at `opacity: 0.001`, and a 10.9 KB inline animator runs before hydration and checks reduced motion | The hero headline is invisible until JavaScript runs |
| Figma Sites | Elements are rendered at `opacity: 0; transform: translateY(50px)`, and a motion runtime reveals them | Hidden content |
| Webflow (IX3) | GSAP 3.15 with ScrollTrigger. CSS hides animated elements with `visibility: hidden !important` from the moment a first script marks the page `w-mod-js` until the runtime adds `w-mod-ix3`. Reduced-motion rules are rare: 7 on webflow.com, 0-1 on truus.co and www.osmo.supply | Hidden content while the runtime loads, or for good if it fails; a page with no JavaScript at all shows it (inferred from the selector) |
| Wix Studio | The runtime animates the elements marked `data-motion-part` | Depends on the runtime |
| Squarespace | `data-animation-role` hooks and global animation classes, driven by the site bundle (inferred) | Not measured |
| Webstudio | Pure CSS: view and scroll timelines inside `@media (prefers-reduced-motion: no-preference)` | The content, unanimated |
| Shopify Horizon | `@starting-style` (17 rules), one `animation-timeline`, 20 reduced-motion blocks | The content |
| Shopify Dawn | `--animation-order` with scroll-trigger classes; 68 `motion-reduce` classes | Not measured |
| Urd | Classes plus an IntersectionObserver (`animations/core.js`), with reduced motion respected; parallax in CSS behind `@supports` | Nothing without JavaScript today, since the whole page renders in the browser |

**The rule: content is never hidden until a script runs.** A hidden start state in the served HTML delays the main paint, and it leaves the content invisible when JavaScript is slow or fails.
- Webstudio and Horizon show the safe way: the start state lives in CSS that only applies when motion is allowed.
- Once Urd bakes its pages (v0.8), the hidden state applies only under a class the engine sets, for example `html.urd-js .urd-anim-fade-in{opacity:0}`. A visitor without JavaScript, or before it runs, then sees the content ([CODE.md](CODE.md)).
- The hidden-until-JS pattern is D47 (not taken).

### Scroll-driven reveals
- **What.** Content that fades or moves in as it enters the viewport.
- **Examples.**
  - Elementor's «while scrolling» trigger ([Elementor](https://elementor.com/blog/editor-40-atomic-forms-pro-interactions/), 15 April 2026, primary).
  - Framer's scroll transform ([Framer](https://www.framer.com/academy/lessons/framer-animations-overview), primary).
  - Wix's scroll effects, among them zoom-in and reveal on image backgrounds ([Wix](https://support.wix.com/en/article/wix-editor-adding-scroll-effects-to-image-backgrounds), primary).
  - Webstudio's native scroll-driven animations ([Webstudio](https://webstudio.is/blog/native-scroll-driven-animations), primary).
- **Build:**
  ```css
  @keyframes u-reveal{from{opacity:0;translate:0 2rem}}
  @media (prefers-reduced-motion:no-preference){
   @supports (animation-timeline:view()){
    .u-reveal{animation:u-reveal linear both;animation-timeline:view();animation-range:entry 0% entry 60%}}}
  ```
  Where `view()` is missing, the existing IntersectionObserver path runs. If neither runs, the element is simply visible.
- **Support.** Chrome 115 and Safari 26; Firefox Nightly only. It is an Interop 2026 focus area ([webstatus](https://webstatus.dev/features/scroll-driven-animations), primary; [web.dev](https://web.dev/blog/interop-2026), primary).
- **A catch.** `view()` scrubs: it plays backwards when the visitor scrolls up, and there is no pure CSS lock to the end state. That is why a one-off entrance stays on IntersectionObserver in Urd ([ADR-0011](../adr/0011-native-css-first.md)). A one-shot reveal in CSS needs scroll-triggered animations (`animation-trigger`), which are in Chrome 146 only ([CODE.md](CODE.md)). The scrubbed reveal is an effect of its own: an entrance tied to scroll progress, or a zoom on a background picture.
- **Lasting or fad.** Lasting.
- **Urd today.** Parallax on `view()` behind `@supports`, with a script fallback. Entrances run on IntersectionObserver. See D26.

### View transitions between pages
- **What.** A soft cross-fade or morph between two pages of a multi-page site, with no single-page app behind it.
- **Build:**
  ```css
  @media (prefers-reduced-motion:no-preference){@view-transition{navigation:auto}}
  ```
  Cross-document transitions ship in Chrome 126 and Safari 18.2, and in Firefox only in Nightly. Same-document transitions and `view-transition-class` are Baseline since October 2025, and transition types since January 2026 ([CODE.md](CODE.md)).
- **Best measured: Shopify Horizon** (code and measured). It:
  - gates the at-rule on reduced motion;
  - holds the page with `<link rel="expect" href="#MainContent" blocking="render">`, and drops the hold on the first page of a visit, on reload, on low-power devices and after 1.8 s;
  - sets transition types in `pageswap`, and skips the transition on `pointerdown` or `keydown`;
  - turns transitions off in in-app WebViews.
- **Others.** Wix names groups (`header-group`, `footer-group`) for its in-app navigation (measured). WordPress 7.1 ships View Transitions as a feature plugin ([Roadmap to 7.1](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/), primary).
- **Lasting or fad.** Lasting.
- **Urd today.**
  - `@view-transition { navigation: auto }`, with the animations switched off under reduced motion, though the at-rule itself is not gated (measured). This is D51.
  - The `rel=expect` hold belongs to the v0.8 baking ([CODE.md](CODE.md)).
  - Named morphs from a card to its own page need the entry pages of v0.8 first. See D27.

### Micro-interactions and spring motion
- **What.** Small responses to a pointer, a press or a state change, often on a spring curve.
- **Examples.**
  - Material 3 Expressive builds spring motion into 21+ components (Android Authority, above).
  - Elementor 3.34 exposes entrance presets (fade, slide, scale) with a direction, a duration of 0.1-3 s and a delay of 0-2 s ([Elementor](https://elementor.com/blog/elementor-334-v4-atomic-tabs-entrance-interactions/), primary).
- **Build.** `linear()` writes a spring as an easing curve, with no script ([Chrome](https://developer.chrome.com/docs/css-ui/css-linear-easing-function), primary). Use easing tokens such as `--ease-spring`, with a plain `ease-out` declared first.
- **Lasting or fad.** Lasting.
- **Urd today.** Three entrances (fade in, slide up, zoom in), a hover lift, and a stagger with sequence, column, row and centre patterns, all on fixed easing (code: `animations/core.js`). One intensity setting (off, subtle, expressive) could scale distance, duration and spring, and add a blur-in entrance. See D24.

### Marquee with a pause
- **What.** A strip of words or logos that rolls by itself.
- **Examples.**
  - Framer Ticker ([Framer](https://www.framer.com/updates/carousel-and-ticker), primary).
  - Squarespace Scrolling block ([Squarespace](https://support.squarespace.com/hc/en-us/articles/206543757-Adding-content-with-blocks), primary).
  - Hostinger Running text ([Hostinger](https://www.hostinger.com/support/6435894-website-builder-website-elements/), primary).
  - Wix Text Marquee ([Wix](https://support.wix.com/en/article/wix-editor-elements-available-in-the-editor), primary).
  - Shopify Horizon `_marquee` ([Mintlify](https://mintlify.wiki/Shopify/horizon/architecture/theme-blocks), secondary) and Magic UI Marquee ([Magic UI](https://magicui.design/docs/components), primary).
- **Build.**
  - The track holds the content twice, and the copy is `aria-hidden`. The track moves by half its width.
  - Add a pause button, and show a static row under reduced motion.
- **Cost.** WCAG 2.2.2 (level A, inside the Norwegian floor). A pause on hover alone does not count.
- **Lasting or fad.** Lasting for sponsors and news tickers.
- **Urd today.** The ribbon block (roll, sway, ticker) and the gallery's ribbon view. Both stand still under reduced motion and pause under the pointer or keyboard focus; a tap on a phone stops them only because the browser emulates `:hover`, which is not specified behaviour and lets go at the next tap elsewhere, and nothing pauses them for good (code). The calendar's Band design has a pause button (code). See D25.

### Parallax, with restraint
- **What.** A background that moves slower than the page.
- **Research.** A study found that parallax adds «fun» but does not improve the overall experience ([Web Designer Depot](https://webdesignerdepot.com/how-scrolljacking-breaks-ux-fundamentals/), secondary). Keep it subtle and decorative.
- **Urd today.** Parallax on the image layer, in scroll-driven CSS with a script fallback, respecting reduced motion. This is D52.

### Cursor effects
- **Examples.**
  - The blob overlays on the Lando Norris site (above).
  - Aceternity Following Pointer and Magic UI Smooth Cursor ([Aceternity](https://ui.aceternity.com/components), [Magic UI](https://magicui.design/docs/components), primary).
  - Figma Sites' cursor effect and mouse parallax ([Figma](https://help.figma.com/hc/en-us/articles/31242843431575), primary).
- **Verdict.** Invisible on touch, and a fad. Not taken (D41).

### Reduced motion
- **The criterion.** WCAG 2.3.3 Animation from Interactions (level AAA, from 2.1) asks that motion triggered by interaction can be turned off ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html), primary). It sits above the Norwegian floor, but `prefers-reduced-motion` is cheap, and Urd treats it as a rule (ADR-0011).
- **The builders.**
  - Framer has a site-wide setting that turns off parallax, transforms and animations for reduced-motion visitors ([Framer](https://www.framer.com/help/articles/guide-to-web-accessibility-in-framer), primary).
  - Webflow's GSAP interactions gained reduced-motion settings ([Webflow](https://webflow.com/updates/more-control-over-interactions-with-gsap), primary), yet the measured Webflow sites carry few reduced-motion rules (measured).
- **Urd today.** base.css has 16 reduced-motion blocks (measured). The entrances, parallax, ribbons, slideshows and animated gradients all stand still under reduce.

---

## Backgrounds

**What the builders layer** (survey of 22 September 2026, kept in [SURVEYS.md](SURVEYS.md)):
- **Wix:** colour; gradient and fluid gradient; image; video with a colour or gradient overlay; pattern overlays. Scroll effects: parallax, reveal, zoom-in, fade-in and 3D ([Studio section background](https://support.wix.com/en/article/studio-editor-changing-and-customizing-the-background-of-a-section), [scroll effects](https://support.wix.com/en/article/wix-editor-adding-scroll-effects-to-image-backgrounds), primary).
- **Squarespace 7.1:** image, video and gradient, and «background art»: animated patterns with shapes, sizes, motion and texture in four colours, WebGL only ([Section background art](https://support.squarespace.com/hc/en-us/articles/4424780922509-Section-background-art), [background videos](https://support.squarespace.com/hc/en-us/articles/218562738-Adding-background-videos), primary).
- **Elementor:**
  - classic, gradient and video (YouTube, Vimeo or self-hosted, with start, end and play once);
  - a slideshow with duration, transition and Ken Burns in or out;
  - an overlay gradient with blend modes;
  - shape dividers at the top and bottom, with size, flip and invert, per breakpoint.

  Sources: [background slideshow](https://elementor.com/help/background-slideshow/), [section background video](https://elementor.com/help/section-background-video-options/), [shape divider](https://elementor.com/blog/v130-shape-divider/) (primary).
- **Divi:** colour; a gradient builder; image with parallax and 16 blend modes; mp4/webm video; 24 patterns (flip, rotate, invert, colour) and masks. All of them can be layered ([background options](https://www.elegantthemes.com/documentation/divi/background-options/), [masks and patterns](https://www.elegantthemes.com/blog/theme-releases/background-masks-and-patterns), primary).
- **Webflow:** colour, gradient, image, video and stacked layers, with Lottie and Spline for animated or 3D backgrounds ([Background styles](https://help.webflow.com/hc/en-us/articles/33961278898323-Background-styles), primary).
- **Framer (marketplace):** WebGL shader backgrounds, grainy mesh gradients (CSS and SVG), particles, animated noise, and liquid and halo gradients ([Backgrounds category](https://www.framer.com/marketplace/components/categories/backgrounds/), [Grainy Mesh Gradient](https://www.framer.com/marketplace/components/grainy-mesh-gradient/), primary).

**Since then:**
- Framer shipped shaders (24 March 2026), mouse-tracking shaders (17 July 2026) and video shaders (11 August 2026) ([Creative AI News](https://www.creativeainews.com/blog/framer-shaders-animated-web-design/), secondary; [Releasebot](https://releasebot.io/updates/framer), secondary).
- Wix Studio offers WebGL effects on media backgrounds, and Spline embeds ([Wix](https://support.wix.com/en/article/studio-editor-about-animations), primary).
- Elementor 4.3 added a Background Video container on 22 September 2026 ([The Plus Addons](https://theplusaddons.com/blog/elementor-4-3-update.md), secondary).

**Five rules from the survey:**
1. Everyone layers colour, gradient, image and video. Urd has all four, plus glow, grain and a slideshow.
2. Motion on an image is standard: parallax, Ken Burns (Elementor's slideshow, ApeironLF's hero) and a scroll zoom or reveal (Wix).
3. Patterns as a layer (Divi's 24, Wix's overlays, Squarespace's art) are cheap as inline SVG tiles.
4. Shape dividers between sections (Elementor, Divi) are the section-edge element of the field.
5. WebGL art, Lottie and Spline are dependencies or GPU-only, and stay out. Urd's answer is the glow, gradient and grain layers.

**Urd's eight layer types** (counted 11 October 2026). The layers stack in a section, and the section can also carry shape dividers: wave, tilt, curve, triangle or zigzag, with flip and invert.

| Layer | What it does in Urd |
|---|---|
| Colour | A flat token or custom colour |
| Gradient | Linear or radial, animated as pan, pan loop, rotate, pulse or orbit; the pans and the orbit move on `transform`, rotate turns the angle through a custom property, and pulse breathes the opacity |
| Glow | Soft light fields |
| Grain | Noise texture over the layers below |
| Image | With parallax, Ken Burns, drift or blur |
| Image gallery | A slideshow in four layouts, with pictures from shared folders at Google Drive, Google Photos or Nextcloud |
| Video | Background video |
| Pattern | Drawn SVG tiles used as a CSS mask, so the colour follows the theme |

**Against the field.**
- Urd layers everything the builders layer except WebGL art, Lottie and Spline, which stay out (D40, D44).
- Two things are missing: a mesh gradient (D29), and a scroll zoom on the image layer (D26).
- Two Baseline features can simplify what exists ([CODE.md](CODE.md)): `shape()` (24 February 2026) can draw the dividers without SVG, and `light-dark()` for images lets a background picture follow the colour scheme.

---

## Imagery

### Authentic photography
- **What the best do.** Nonprofit leaders win on authentic stories and real project photographs: charity: water shows GPS-tagged wells, and Giving Kitchen leans on emotional authenticity ([Azuro Digital](https://azurodigital.com/nonprofit-website-examples/), secondary).
- **For a club** that means real members at real events.
- **The rules for photographs of people** ([Datatilsynet](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/deling-av-bilder/), updated 16 September 2025, primary):
  - portraits («portrettbilder») need consent before they are shared;
  - harmless situation pictures («situasjonsbilder») from events of general interest may, as a main rule, be published without consent;
  - children need a guardian's consent.
- **A model to copy.** Abakus stores photo consent per semester and per channel, website or social media ([lego users model](https://raw.githubusercontent.com/webkom/lego/master/lego/apps/users/models.py), code).
- **In Urd.** Credit and consent fields on images belong to 0.7.24 Privacy defaults ([FEATURES.md](FEATURES.md)).
- **Lasting or fad.** Lasting.
- **Urd today.** Focus point, zoom, filters and shapes on images, and an alt text field.

### AI imagery
- **Research.** NN/g (21 August 2026; 77 participants, 6 page variants) found that unlabelled AI images did not reduce trust, but ratings dropped when users suspected AI. What mattered was «believable interactions, appropriate representation». The article notes that the EU AI Act's labelling duty may change this ([NN/g](https://www.nngroup.com/articles/ai-generated-images/), primary).
- **For clubs.** Use real members. Where an AI picture is used, say so in a field beside the credit. See D31.

### Illustration
Kiva uses an illustration-driven identity (Azuro Digital, above). It lasts. Urd has an icon library and SVG shapes, so there is nothing to add.

### 3D
3D is Figma's first trend for 2026 (above), and The Ocean Cleanup uses 3D visualisations (Azuro Digital, above). It is heavy, and not suited to a dependency-free engine. Not taken (D40).

### Collage, scrapbook and retro
On Figma's 2026 list (above). It suits student culture, and rotated frames are enough to build it. Urd's polaroid and mosaic gallery views (D60) and the gallery looks (tape, pin, stamp, film strip; D59) already do it (code).

### Duotone and treatment
Covered under [Colour](#duotone). See D30.

---

## Patterns from association, club and event sites

### What the leading sites show (observed 11 October 2026)
- **samfundet.no** ([Samfundet](https://www.samfundet.no/), primary):
  - The top navigation is Events, Information, Venues and Recruitment.
  - Event cards show the type, the venue and a ticket-status badge («Få billetter igjen»).
  - A collapsible «open now» status, with hours per venue.
  - Separate «Medlem» and «Intern» entries, an English toggle, and sponsor and festival logos in the footer.
- **abakus.no** ([Abakus](https://abakus.no/), primary):
  - Events are split by audience: «Bedpres og kurs» versus «Sosialt».
  - Pinned articles, a student-magazine cover archive, and «useful links» cards.
- **studentsunionucl.org** ([UCL](https://studentsunionucl.org/), primary):
  - «What's On» with an availability state («Nearly sold out»).
  - A groups directory filtered by category, with «Start a group».
  - Officer cards with photos, an elections banner, and an accessibility statement in the footer.
- **cus.org**, the Cambridge Union ([Cambridge Union](https://cus.org/), primary):
  - The Termcard, a recurring programme document.
  - Membership as social proof (over 37,000 members) and a heritage claim (1815).
  - A speaker photo grid, venue hire and a partner logo wall.
- **oyafestivalen.no** ([Øya](https://oyafestivalen.no/), primary):
  - A hero that carries the dates and a ticket call to action.
  - Tagged news cards and a chronological stream of artist releases.
  - A newsletter band, and sustainability badges.

### Nonprofits and the Framer templates
- **Nonprofits** ([Azuro Digital](https://azurodigital.com/nonprofit-website-examples/), secondary):
  - charity: water: transparency and tracking.
  - Girls Who Code: navigation by persona.
  - Kiva: gamified engagement.
  - Malala Fund: a direct donation funnel.
- **Framer's nonprofit and club templates** Neighborly and Charion ([Neighborly](https://www.framer.com/marketplace/templates/neighborly/), [Charion](https://www.framer.com/community/marketplace/templates/charion/), primary):
  - a join form that routes by interest;
  - a directory;
  - a Donate page with set amounts;
  - event listings and impact statistics;
  - a volunteer sign-up.

### What the Norwegian student sites show (read from their source)
The big linjeforeninger build registration with pools by class year, penalty points and paid sign-up on a server. Urd links out for those ([FEATURES.md](FEATURES.md)). The rest of their content is static-shaped, and it shows what a club site's design must carry:
- **Events by type and audience.**
  - Abakus's event types include company presentation, course, party, social and gala ([lego events constants](https://raw.githubusercontent.com/webkom/lego/master/lego/apps/events/constants.py), code).
  - echo's `happeningType` is bedpres, event or external ([echo happening schema](https://raw.githubusercontent.com/echo-webkom/echo-web-mono/main/apps/cms/schemas/happening.tsx), code).
- **Pinned items.** echo pins at most four happenings (same schema).
- **Ticket status as a label.** Samfundet's ticket types are INCLUDED, FREE, BILLIG (paid), REGISTRATION and CUSTOM ([Samfundet4 model choices](https://github.com/Samfundet/Samfundet4/blob/master/backend/samfundet/models/model_choices.py), code). The site shows them as badges on the event cards (observed). See D32.
- **Documents by category.**
  - Samfundet's «Saksdokument» categories are `FS_REFERAT`, `STYRET`, `RADET` and `ARSBERETNINGER`, the last of them «Årsberetninger, regnskap og budsjettkunngjøringer» (same file).
  - echo's meeting minutes carry «Allmøte» or «Styremøte» and a required PDF ([echo meeting-minute schema](https://raw.githubusercontent.com/echo-webkom/echo-web-mono/main/apps/cms/schemas/meeting-minute.tsx), code).
  - The element is a file list ([ELEMENTS.md](ELEMENTS.md)).
- **Board history.** Abakus keeps it as `MembershipHistory` with start and end dates (lego users model, above).
- **Venues.** Samfundet models venues with opening hours and closed periods ([Samfundet4 general models](https://github.com/Samfundet/Samfundet4/blob/master/backend/samfundet/models/general.py), code).
- **Company relations.** «For bedrifter» pages, company pages and job listings at Online, Abakus and echo ([monoweb routes](https://github.com/dotkom/monoweb/tree/main/apps/web/src/app/%28web%29), [lego-webapp pages](https://github.com/webkom/lego-webapp/tree/master/lego-webapp/pages), code).
- **The legal name.** Online's about page shows the org.nr. ([Online](https://online.ntnu.no/om-linjeforeningen), primary).

**ApeironLF**, the site Urd must be able to recreate for the v1.0 gate ([ApeironLF](https://github.com/Apeiron-Linjeforening/ApeironLF), code; the full review is in [SURVEYS.md](SURVEYS.md)):
- A fixed nav that is transparent at the top and gains a dark surface, a blur, a gold hairline and tighter padding after 40 px of scrolling.
- A hero gallery in four styles.
- Section tones (auto, paper, navy, accent) with a rhythm warning.
- A subhero on every subpage, and noticeboard poster cards at 3:4.
- Board pages with period chips.

Urd covers the nav surface, the hero gallery styles and the noticeboard. The auto tone is D19.

### A club home page
The pattern of Samfundet, UCL, Cambridge Union, Øya and the Framer templates, from the top of the page down, with where each part stands in Urd:

| # | Section | Seen at | Urd |
|---|---|---|---|
| 1 | A short nav named by task (Events, About, Join, Contact), with a language toggle where the members need one | Samfundet (English toggle), UCL | Nav in 6 variants. One content language per site; multilingual content comes after v1.0 |
| 2 | A hero with the next date or the term's headline, and one main action (join, tickets) | Øya | Hero presets; the poster hero is D9 |
| 3 | Coming up: the next events with type, venue, a status badge and «add to calendar» | Samfundet, UCL, Øya | The calendar's «Coming up» designs; status badges are D32; the registration mode and «add to calendar» are in ER-F |
| 4 | Open now, and the practical facts | Samfundet | Opening hours in ER-C; a key-facts box in ER-F |
| 5 | Join: tiers with benefits, and the steps to join | Cambridge Union, the Framer templates | Membership and steps presets; the sign-up hand-off is in ER-F |
| 6 | News and notices, pinned first, tagged | Abakus, Øya | News-collection and noticeboard presets |
| 7 | People: the board with roles and contacts, and earlier boards | UCL, Abakus | Team preset; the people kind is 0.7.16.4 |
| 8 | A directory of groups and committees | UCL | A directory preset in ER-F; collection filters in 0.7.16.3 |
| 9 | Sponsors and partners, by tier | Samfundet, Cambridge Union | Sponsors preset; tiers in ER-F |
| 10 | A newsletter band | Øya | A newsletter sign-up with a split consent in 0.7.24 |
| 11 | Documents («vedtekter», minutes, annual reports) | Samfundet, echo | The file list and documents kind in ER-B |
| 12 | A footer with the legal name, org.nr., address, contact, social links and an accessibility statement link | Online, UCL | Footer in 10 layouts; the org.nr. field is in 0.7.24 |

**What the design asks for** is little:
- one type pairing;
- one accent, with section tones for rhythm;
- real photographs;
- status written in words, never in colour alone;
- motion only on a sponsor strip, and one that can be paused.

As a page starter, it is D33.

---

## Recommendations

The status words and the ID scheme are explained in [README.md](README.md). Every preset that sets colours must pass the contrast check of 0.7.11 in light and in dark, and every motion preset must stand still under reduced motion.

### Open

| ID | What | Who does it (with source) | Fit for Urd | Status |
|---|---|---|---|---|
| D1 | Bento section preset: cards of different sizes placed on the canvas, plus bento spans in a collection view that collapse by container query and keep source order (no `dense`) | Framer bento layouts, March 2026 ([updates](https://www.framer.com/updates)); Tailwind Plus ([3 sections](https://tailwindcss.com/plus/ui-blocks/marketing)); shadcnblocks ([53 blocks](https://www.shadcnblocks.com/)) (primary) | High. Placed blocks on the desktop, stacked by the row grid on the phone; container queries inside the block only (ADR-0018) | Taken: 0.7.9 |
| D2 | Editorial widths per block: content, popout and full bleed | Josh W. Comeau ([full bleed](https://www.joshwcomeau.com/css/full-bleed/), secondary); Twenty Twenty-Five content and wide widths ([theme](https://github.com/WordPress/twentytwentyfive), code) | High. Extends the ribbon's `width: 'page'` to every block on the bound canvas (ADR-0018) | Taken: 0.7.9 |
| D3 | Sticky split-screen section preset: a picture pinned beside scrolling text, unpinned on the phone | Aceternity Sticky Scroll Reveal ([components](https://ui.aceternity.com/components), primary) | High. Built on the existing sticky model; suits history and «about» pages | Taken: 0.7.9 |
| D4 | Stacked cards on scroll: cards pinned at growing offsets | Aceternity Card Stack ([components](https://ui.aceternity.com/components), primary) | Medium. Sticky groups exist; `sibling-index()` gives the offset with no inline index | Taken: 0.7.9 |
| D5 | A sideways snap row for events, people and posts, with no scrolljacking; `::scroll-marker` dots only as a Chrome enhancement | Framer Carousel and Ticker ([update](https://www.framer.com/updates/carousel-and-ticker)); Squarespace Summary carousel ([blocks](https://support.squarespace.com/hc/en-us/articles/206543757-Adding-content-with-blocks)) (primary) | High. The gallery's scroll-snap track carried over to collections | Taken: v0.8 Element round, ER-D |
| D6 | `scroll-state(stuck: top)` for the nav's stuck and scrolled states, in place of the engine's scroll pass | Chrome 133 ([Chrome](https://developer.chrome.com/blog/css-scroll-state-queries), primary) | Low until then: it only removes script that works everywhere (ADR-0011) | Watch: `scroll-state()` in Firefox and Safari (T75) |
| D7 | Fluid type scale with a rem term (`clamp()`), in place of the fixed S/M/L/XL steps | Twenty Twenty-Five `typography.fluid` ([theme](https://github.com/WordPress/twentytwentyfive), code); Webflow `clamp()` variables ([help](https://help.webflow.com/hc/en-us/articles/41843932314259-Use-functions-in-variable-values)); Bricks fluid typography generator ([2.2](https://bricksbuilder.io/release/bricks-2-2/)) (primary) | High. One token family, and browser zoom keeps working (WCAG 1.4.4) | Taken: 0.7.9 |
| D8 | `text-wrap: balance` on headings and `pretty` on body text, site-wide | Framer text balance ([features](https://www.framer.com/features/design/), primary) | High. Two lines of CSS; `pretty` is ignored where missing | Taken: 0.7.9 |
| D9 | Poster hero: oversized fluid display type with `text-box` trim | Figma «bold typography» ([trends](https://www.figma.com/resource-library/web-design-trends/)); Siteinspire «Typographic» ([gallery](https://www.siteinspire.com/)) (primary) | High. A hero preset on D7; `text-box` is Baseline | Taken: 0.7.9 |
| D10 | Curated type pairings as one choice (serif display with grotesk text; grotesk with mono), with `font-size-adjust` for the fallbacks | Squarespace Site Themes ([SEJ](https://www.searchenginejournal.com/squarespace-rolls-out-new-ai-tools-for-seo-and-design/557220/), secondary); Wix Harmony Brand panel ([Wix](https://support.wix.com/en/article/introducing-the-wix-harmony-editor)); Tilda Styles ([Tilda](https://blog-en.tilda.cc/2025-in-review)) (primary) | High. Works with the system stacks today and with D11 later | Taken: 0.7.9 |
| D11 | Self-hosted fonts: a larger choice, and the site's own font files from a folder in the repo; variable woff2 with subsets, at most one preload, `font-src 'self'`, with the system stacks as the default | Squarespace Finish Layer font upload ([blog](https://www.squarespace.com/blog/finish-layer-website-design-tools)); Bricks Font Manager with local Google Fonts ([2.0](https://bricksbuilder.io/release/bricks-2-0/)) (primary); Twenty Twenty-Five `fontFace` ([theme](https://github.com/WordPress/twentytwentyfive), code); Hostinger's same-origin font proxy (measured) | High, as long as the zero-byte default stays | Taken: 0.7.9 |
| D12 | Text details: text shadow, selection colour, letter case and spacing, and link styles (hover and current page) | WordPress 7.1 text shadow ([field guide](https://make.wordpress.org/core/2026/08/05/wordpress-7-1-field-guide/)); Framer selection colour and link styles ([features](https://www.framer.com/features/design/)); Squarespace letter spacing and transform ([blog](https://www.squarespace.com/blog/finish-layer-website-design-tools)) (primary) | High. Plain CSS properties in the Style tab | Taken: 0.7.9 |
| D13 | Drop cap behind an `initial-letter` gate; the end state is an ordinary first letter | Divi 5.8.1 ([version log](https://help.elegantthemes.com/en/articles/9973580), primary) | Medium. Chrome and prefixed Safari only ([MDN data](https://github.com/mdn/browser-compat-data/blob/main/css/properties/initial-letter.json)) | Taken: 0.7.9 |
| D14 | `text-fit` for a headline that fills its box | Chrome 150 only ([MDN data](https://github.com/mdn/browser-compat-data/blob/main/css/properties/text-fit.json), primary) | Low: no CSS fallback, and D9 gives the look | Watch: `text-fit` in a second engine |
| D15 | OKLCH theme from one colour: relative-colour tints and shades, `light-dark()` surfaces, `contrast-color()` behind `@supports` with a fallback, and a P3 boost | Divi relative colours ([Divi 5](https://www.elegantthemes.com/blog/divi-resources/how-to-get-started-with-divi-5)); Webflow `color-mix()` variables ([help](https://help.webflow.com/hc/en-us/articles/41843932314259-Use-functions-in-variable-values)); Framer P3 ([design pages](https://framer.com/updates/design-pages)) (primary) | High. The theme already uses `color-mix()`, `light-dark()` and `contrast-color()` | Taken: 0.7.9 |
| D16 | Palette from an image: a theme suggested from an uploaded picture | Divi Color Harmony and Color Scale generators ([version log](https://help.elegantthemes.com/en/articles/9973580), primary) | Medium. Client-side maths that feeds D15 | Taken: 0.7.9 |
| D17 | Brand or seasonal modes beyond light and dark (a «fadderuke» or jubilee theme), as part of «save your own theme», with theme export | Webflow variable modes ([update](https://webflow.com/updates/variable-modes)); WordPress style variations and theme export ([Site Editor](https://wordpress.org/documentation/article/site-editor/)) (primary); Twenty Twenty-Five's 36 style variations ([theme](https://github.com/WordPress/twentytwentyfive), code) | High. Scoped custom properties over the same tokens | Taken: 0.7.9 |
| D18 | «Calm» and «expressive» theme intensity: emphasis by colour, shape, size and motion | Material 3 Expressive ([Google Design](https://design.google/library/expressive-material-design-google-research), primary) | High for a student audience; one switch over the tokens | Taken: 0.7.9 |
| D19 | An «auto» section tone that alternates light and dark from the previous section, with a clash warning, and a per-page default colour mode | ApeironLF's section tones ([repo](https://github.com/Apeiron-Linjeforening/ApeironLF), code) | High. Builds on the section colour roles (D55) | Taken: 0.7.9 |
| D20 | Radius scale with a `corner-shape: squircle` enhancement; plain `border-radius` as the end state | WordPress 7.1 radius tokens ([roadmap](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/)); Framer squircles ([features](https://www.framer.com/features/design/)) (primary); Material 3 Expressive radii ([Android Authority](https://www.androidauthority.com/google-material-3-expressive-features-changes-availability-supported-devices-3556392/), secondary) | High. `corner-shape` is Chrome only ([MDN data](https://github.com/mdn/browser-compat-data/blob/main/css/properties/corner-shape.json)) | Taken: 0.7.9 |
| D21 | Design gallery: box and shape styles, layered soft shadows and hairlines, shadow presets, and button states (hover, focus, active) | WordPress shadow presets ([Styles overview](https://wordpress.org/documentation/article/styles-overview/)) and 7.1 button states ([field guide](https://make.wordpress.org/core/2026/08/05/wordpress-7-1-field-guide/)); Divi presets ([preset-based design](https://www.elegantthemes.com/blog/theme-releases/preset-based-design)); Tilda Styles ([Tilda](https://blog-en.tilda.cc/2025-in-review)) (primary) | High. Extends the box styles | Taken: 0.7.9 |
| D22 | Glass level (off, subtle) for nav pills and bars only, with a solid base and `prefers-reduced-transparency` | Apple Liquid Glass ([Apple](https://www.apple.com/uk/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design)); Divi backdrop filter ([version log](https://help.elegantthemes.com/en/articles/9973580)) (primary); NN/g glassmorphism guidance ([NN/g](https://www.nngroup.com/articles/glassmorphism/), primary) | Medium. Never on `.urd-canvas` (ADR-0018); the solid base must pass contrast on its own | Taken: 0.7.9 |
| D23 | Neo-brutalist theme: hard borders, offset solid shadows, flat colour | HyperUI ([set](https://www.hyperui.dev/)); Figma 2026 list ([trends](https://www.figma.com/resource-library/web-design-trends/)) (primary) | High for student culture; costs nothing; a theme, not a default | Taken: 0.7.9 |
| D24 | Motion intensity (off, subtle, expressive) with `linear()` spring easings, scaling distance, duration and hover lift, plus a blur-in entrance | Elementor 3.34 entrance presets ([Elementor](https://elementor.com/blog/elementor-334-v4-atomic-tabs-entrance-interactions/)); Framer's site-wide reduced-motion setting ([Framer](https://www.framer.com/help/articles/guide-to-web-accessibility-in-framer)); `linear()` ([Chrome](https://developer.chrome.com/docs/css-ui/css-linear-easing-function)) (primary) | High. One setting over the existing animation registry | Taken: 0.7.9 |
| D25 | A pause for every strip that moves by itself: a pause button on the ribbon block and the gallery's ribbon view, and a slides view that stops for good after the visitor's first step, with auto-advance off on the phone | WCAG 2.2.2 ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), primary); Baymard ([carousels](https://baymard.com/blog/homepage-carousel)) and NN/g ([auto-forwarding](https://www.nngroup.com/articles/auto-forwarding/)) (primary) | Required: level A, inside the Norwegian floor. The calendar's Band design already has the control (0.7.0.45), built without relying on emulated hover | Taken: Bugs (the Band pause model) |
| D26 | Scroll-scrubbed effects as a choice of their own: an entrance tied to scroll progress, and a scroll zoom on the image layer; `view()` behind `@supports`, with a static end state | Wix scroll effects ([Wix](https://support.wix.com/en/article/wix-editor-adding-scroll-effects-to-image-backgrounds)); Framer scroll transform ([Framer](https://www.framer.com/academy/lessons/framer-animations-overview)); Webstudio ([blog](https://webstudio.is/blog/native-scroll-driven-animations)) (primary) | Medium. The same mechanism as the parallax; one-off entrances stay on IntersectionObserver (ADR-0011) | Taken: v0.8 Element round, ER-H |
| D27 | Named view-transition morphs from a card to its own page, with the at-rule gated on reduced motion | Shopify Horizon ([source](https://github.com/Shopify/horizon), code); Wix named groups (measured); WordPress 7.1 feature plugin ([roadmap](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/), primary) | Medium. Needs entry pages; harmless where cross-document transitions are missing | Taken: v0.8 entry pages |
| D28 | Badge and edge-glow animation presets on product cards (aurora, ember, neon, rainbow; soft and bold) | ApeironLF ([repo](https://github.com/Apeiron-Linjeforening/ApeironLF), code) | Medium. Still under reduced motion | Taken: 0.7.9 |
| D29 | Mesh gradient: stacked radial gradients interpolated `in oklch`, beside the glow and grain layers | Framer Grainy Mesh Gradient ([marketplace](https://www.framer.com/marketplace/components/grainy-mesh-gradient/)); Wix fluid gradient ([section background](https://support.wix.com/en/article/studio-editor-changing-and-customizing-the-background-of-a-section)) (primary) | High. CSS only | Taken: 0.7.9 |
| D30 | Duotone and blend modes on the image block (the gallery already has a duotone tone) | Divi blend modes ([background options](https://www.elegantthemes.com/documentation/divi/background-options/)); Framer blend modes and filters ([features](https://www.framer.com/features/design/)) (primary) | High. Unifies amateur photographs; the gallery's CSS can be shared | Taken: 0.7.9 |
| D31 | An AI-image disclosure field and a real-photo prompt beside the image credit and consent fields | NN/g on AI images ([NN/g](https://www.nngroup.com/articles/ai-generated-images/), primary); Datatilsynet on photographs ([Datatilsynet](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/deling-av-bilder/), primary) | Medium. A field and a caption | Taken: 0.7.24 Privacy defaults |
| D32 | Shared status-badge styles for events, products and roles (sold out, few left, free, members only, deadline), always in words as well as colour | UCL «Nearly sold out» ([UCL](https://studentsunionucl.org/)) and Samfundet ticket badges ([Samfundet](https://www.samfundet.no/)) (primary, observed); Samfundet4 ticket types ([model choices](https://github.com/Samfundet/Samfundet4/blob/master/backend/samfundet/models/model_choices.py), code); daisyUI Badge and Status ([daisyUI](https://daisyui.com/components/), primary) | High. One style set over the product badge and the ticket status | Taken: v0.8 Element round, ER-F |
| D33 | A club home page starter: the next events with status, open now, joining with tiers, board cards, a sponsor wall, a newsletter band and a documents link | [Samfundet](https://www.samfundet.no/), [UCL](https://studentsunionucl.org/), [Cambridge Union](https://cus.org/) and [Øya](https://oyafestivalen.no/) (primary, observed); Framer Neighborly and Charion ([Neighborly](https://www.framer.com/marketplace/templates/neighborly/), [Charion](https://www.framer.com/community/marketplace/templates/charion/), primary) | High. Assembled from presets and the Element round | Taken: v0.8 Element round, ER-F |
| D34 | One documented token contract for the whole design (colours, type scale, spacing scale, radius scale, shadows, motion) that every preset above writes into; DTCG-like names make the export portable | Twenty Twenty-Five theme.json ([theme](https://github.com/WordPress/twentytwentyfive), code); Webflow variables with modes ([update](https://webflow.com/updates/variable-modes), primary); Penpot token types ([token.cljc](https://github.com/penpot/penpot/blob/develop/common/src/app/common/types/token.cljc), code) | High. The base for D7, D15, D17, D20, D21, D24 and D35 | Taken: 0.7.9 |
| D35 | Spacing scale: fluid steps for section and block spacing | Twenty Twenty-Five spacing with `clamp()` ([theme](https://github.com/WordPress/twentytwentyfive), code); Bricks spacing scales ([2.2](https://bricksbuilder.io/release/bricks-2-2/)); Divi Design Variables ([Divi](https://www.elegantthemes.com/blog/theme-releases/design-variables?id=34628)) (primary) | High. Replaces the single section-space token | Taken: 0.7.9 |
| D36 | «Use this block's style as the site default» | WordPress «Apply Globally» ([Styles overview](https://wordpress.org/documentation/article/styles-overview/)); Divi «convert to variable» ([version log](https://help.elegantthemes.com/en/articles/9973580)) (primary) | High. Writes a block's style into the token contract | Taken: 0.7.9 |
| D37 | Hover preview of fonts and colours in the pickers | Bricks Style Manager ([2.2](https://bricksbuilder.io/release/bricks-2-2/)); WordPress ([Styles overview](https://wordpress.org/documentation/article/styles-overview/)) (primary) | High. The preview already applies tokens live | Taken: 0.7.9 |
| D38 | A style-book page: every token, text style and block style on one page against the theme | WordPress Style Book ([Styles overview](https://wordpress.org/documentation/article/styles-overview/)); Bricks Style Manager ([2.2](https://bricksbuilder.io/release/bricks-2-2/)) (primary) | Medium. A generated page in the editor's preview | Taken: 0.7.9 |
| D39 | Lock and hide in the layers panel | Squarespace Finish Layer layers and block hiding ([blog](https://www.squarespace.com/blog/finish-layer-website-design-tools)); Wix Studio layers with lock and hide ([Wix](https://support.wix.com/en/article/studio-editor-working-with-layers)); WordPress List View ([List View](https://wordpress.org/documentation/article/list-view/)) (primary) | High. Overlapping blocks on the free canvas need it | Taken: 0.7.9 |

### Not taken

| ID | What | Who does it (with source) | Fit for Urd | Status |
|---|---|---|---|---|
| D40 | WebGL, shader and 3D art: backgrounds, scenes and Spline | Framer shaders ([Creative AI News](https://www.creativeainews.com/blog/framer-shaders-animated-web-design/), secondary); Squarespace background art ([help](https://support.squarespace.com/hc/en-us/articles/4424780922509-Section-background-art)); Wix WebGL effects ([Wix](https://support.wix.com/en/article/studio-editor-about-animations)); Webflow Spline ([Background styles](https://help.webflow.com/hc/en-us/articles/33961278898323-Background-styles)) (primary) | Low | Not taken: GPU-only or a runtime library (ADR-0002); glow, gradient, mesh and grain give the look |
| D41 | Cursor and mouse effects, and custom cursors | Lando Norris ([Awwwards](https://www.awwwards.com/sites/lando-norris)); Aceternity ([components](https://ui.aceternity.com/components)); Magic UI ([components](https://magicui.design/docs/components)); Figma Sites ([help](https://help.figma.com/hc/en-us/articles/31242843431575)) (primary) | Low | Not taken: invisible on touch, decoration only |
| D42 | Scrolljacking: pinned sections that move sideways or take over the scroll | Award and agency sites; NN/g ([scrolljacking](https://www.nngroup.com/articles/scrolljacking-101/), primary) | Low | Not taken: it disorients; D5 gives a sideways row the visitor controls |
| D43 | Full Liquid Glass refraction (`feDisplacementMap` inside `backdrop-filter`) | Apple ([newsroom](https://www.apple.com/uk/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design), primary); LogRocket ([recipe](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/), secondary) | Low | Not taken: Chromium only, CPU-heavy, and the legibility failures NN/g reports; D22 instead |
| D44 | Lottie and Rive animations | Divi ([modules](https://help.elegantthemes.com/en/collections/10650978-divi-5-modules)); Webflow ([elements](https://university.webflow.com/course-lesson/build-structure-review-elements)); Wix Studio ([Add panel](https://support.wix.com/en/article/studio-editor-adding-elements-4240855)) (primary) | Low | Not taken: a runtime library; SVG with CSS animation instead |
| D45 | Interaction timelines and keyframe editors, easing editors, triggers and variables, draggable, spin and conditional interactions | Webflow GSAP interactions ([update](https://webflow.com/updates/more-control-over-interactions-with-gsap)); Figma Sites interactions ([help](https://help.figma.com/hc/en-us/articles/31242843431575)) (primary) | Low | Not taken: a library, or too much complexity for the audience |
| D46 | Effect backgrounds and cards: aurora, beams, spotlight, particles, confetti, 3D hover cards | Aceternity ([components](https://ui.aceternity.com/components)); Magic UI ([components](https://magicui.design/docs/components)); daisyUI Hover 3D ([daisyUI](https://daisyui.com/components/)); Once UI ([Once UI](https://once-ui.com/)) (primary) | Low | Not taken: fads |
| D47 | Entrance animations that hide content until a runtime runs | Framer `opacity: 0.001`, Figma Sites `opacity: 0`, Webflow `visibility: hidden` until `w-mod-ix3` (measured) | Low | Not taken: it hides content when the script is slow or fails; the hidden state applies only under a class the engine sets (v0.8 baking, [CODE.md](CODE.md)) |
| D48 | Neumorphism | Figma 2026 list ([trends](https://www.figma.com/resource-library/web-design-trends/), primary) | Low | Not taken: edges drawn by faint shadows alone work against the contrast the presets must pass |

### Closed

| ID | What | Status |
|---|---|---|
| D49 | A nav that shrinks or hides on scroll | Delivered 0.6.6.5.12 |
| D50 | A nav surface that is transparent at the top and fills on scroll | Delivered 0.7.13.3 |
| D51 | Cross-document view transitions | Delivered 0.6.0.5 |
| D52 | Parallax on scroll-driven CSS behind `@supports`, with a script fallback | Delivered 0.6.6.5.7 |
| D53 | Light and dark from the first paint (`light-dark()`, `color-scheme`), with the visitor's toggle | Delivered 0.6.6.5.11 |
| D54 | `contrast-color()` for text on the accent | Delivered 0.7.12 |
| D55 | Section colour roles (Surface, Accent, Inverse, Soft, Muted, Deep, Highlighted cards) and one-click theme suggestions | Delivered 0.6.6.5.4 and 0.6.6.4.6 |
| D56 | Stagger for card groups | Delivered 0.6.6.5.4 |
| D57 | Marquee: the ribbon block and the gallery's ribbon view | Delivered 0.7.13.7 |
| D58 | Image motion (Ken Burns, drift) and the image gallery layer | Delivered 0.7.13.8 |
| D59 | Gallery looks and tones, with a duotone in the accent colour | Delivered 0.7.13.8 |
| D60 | Collage: the mosaic and polaroid gallery views | Delivered 0.7.13.9 |
| D61 | The pattern layer and section shape dividers | Delivered 0.7.13.10 |
| D62 | A layout switcher («Change layout») | Delivered 0.6.7.9 |

### Former numbers

| Former number | Meaning | Now |
|---|---|---|
| ELEMENTKART 5a.7 | Curated design tokens as one choice: font packs and palette themes | [ELEMENTS.md](ELEMENTS.md#open) E10; the design side is D10 (type pairings) and D55 (palettes) here |
| LAERDOMMER 5.3 | A tidy theme.json-style token model as one contract | [CODE.md](CODE.md#former-numbers) T26, the canonical mapping; the design side is D34 here |

---

## Sources

Read or measured on 11 October 2026 unless a date says otherwise.

### Awards, galleries and trend lists
- Awwwards: [annual winners 2025](https://www.awwwards.com/annual-awards/winners), [Sites of the Month](https://www.awwwards.com/websites/sites_of_the_month/), [Sites of the Day](https://www.awwwards.com/websites/sites_of_the_day/), [Lando Norris](https://www.awwwards.com/sites/lando-norris) (primary)
- [DesignRush: the Lando Norris site](https://designrush.com/best-designs/websites/lando-norris-website-design) (secondary)
- [Siteinspire](https://www.siteinspire.com/) (primary)
- [One Page Love](https://onepagelove.com/) (primary)
- [godly.website](https://godly.website/), which redirects to recent.design (primary, observed 11 October 2026)
- [Figma: web design trends 2026](https://www.figma.com/resource-library/web-design-trends/) (primary)
- [Plushcap: Webflow's 8 web design trends for 2026](https://www.plushcap.com/content/webflow/blog/webflow-8-web-design-trends-to-watch-in-2026), summarising Webflow's post of 23 December 2025 (secondary)

### Usability research
- NN/g (primary):
  - [Liquid Glass](https://www.nngroup.com/articles/liquid-glass/) (Budiu, 10 October 2025)
  - [AI-generated images](https://www.nngroup.com/articles/ai-generated-images/) (21 August 2026)
  - [Glassmorphism](https://www.nngroup.com/articles/glassmorphism/)
  - [Dark mode](https://www.nngroup.com/articles/dark-mode/)
  - [Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)
  - [Auto-forwarding carousels](https://www.nngroup.com/articles/auto-forwarding/)
  - [Accordions on desktop](https://www.nngroup.com/articles/accordions-on-desktop/)
- [Baymard: homepage carousels](https://baymard.com/blog/homepage-carousel) (primary)
- [Google Design: Expressive Material Design research](https://design.google/library/expressive-material-design-google-research) (primary)
- [Web Designer Depot: how scrolljacking breaks UX fundamentals](https://webdesignerdepot.com/how-scrolljacking-breaks-ux-fundamentals/) (secondary)

### Standards and law
- W3C, Understanding WCAG 2.2 (primary):
  - [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
  - [2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
  - [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html)
  - [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
  - [1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)
  - [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- Uutilsynet (primary):
  - [Regelverk og krav](https://www.uutilsynet.no/regelverk/regelverk-og-krav/746)
  - [Kva seier forskrifta](https://www.uutilsynet.no/regelverk/kva-seier-forskrifta/153) (updated 10 June 2026)
  - [Status for newer versions of WCAG](https://www.uutilsynet.no/fremtidig-regelverk/status-nyere-versjoner-av-wcag/1868) (8 November 2023)
- [Datatilsynet: sharing pictures](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/deling-av-bilder/) (updated 16 September 2025, primary)

### Platform
- web.dev (primary): [New to the web platform, April 2026](https://web.dev/blog/web-platform-04-2026), [August 2026](https://web.dev/blog/web-platform-08-2026), [September 2026](https://web.dev/blog/web-platform-09-2026); [Interop 2026](https://web.dev/blog/interop-2026)
- webstatus.dev (primary): [relative colour](https://webstatus.dev/features/relative-color), [scroll-driven animations](https://webstatus.dev/features/scroll-driven-animations), [`sibling-index()` and `sibling-count()`](https://webstatus.dev/features/sibling-count)
- MDN browser-compat-data (primary): [`text-wrap`](https://github.com/mdn/browser-compat-data/blob/main/css/properties/text-wrap.json), [`initial-letter`](https://github.com/mdn/browser-compat-data/blob/main/css/properties/initial-letter.json), [`text-fit`](https://github.com/mdn/browser-compat-data/blob/main/css/properties/text-fit.json), [`corner-shape`](https://github.com/mdn/browser-compat-data/blob/main/css/properties/corner-shape.json)
- Chrome for Developers (primary): [carousels with CSS](https://developer.chrome.com/blog/carousels-with-css), [scroll-state queries](https://developer.chrome.com/blog/css-scroll-state-queries), [the `linear()` easing function](https://developer.chrome.com/docs/css-ui/css-linear-easing-function)
- The full support table, with every version quoted here: [CODE.md](CODE.md)

### Builders and libraries (vendor pages, primary)
- **Apple:** [Liquid Glass announcement](https://www.apple.com/uk/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design) (June 2025)
- **Framer:**
  - [updates](https://www.framer.com/updates) (to 1 October 2026), [Carousel and Ticker](https://www.framer.com/updates/carousel-and-ticker), [Design Pages](https://framer.com/updates/design-pages)
  - [design features](https://www.framer.com/features/design/), [animations overview](https://www.framer.com/academy/lessons/framer-animations-overview), [accessibility guide](https://www.framer.com/help/articles/guide-to-web-accessibility-in-framer)
  - marketplace: [Backgrounds](https://www.framer.com/marketplace/components/categories/backgrounds/), [Grainy Mesh Gradient](https://www.framer.com/marketplace/components/grainy-mesh-gradient/), [Neighborly](https://www.framer.com/marketplace/templates/neighborly/), [Charion](https://www.framer.com/community/marketplace/templates/charion/)
- **Webflow:**
  - [variable modes](https://webflow.com/updates/variable-modes), [functions in variable values](https://help.webflow.com/hc/en-us/articles/41843932314259-Use-functions-in-variable-values), [Background styles](https://help.webflow.com/hc/en-us/articles/33961278898323-Background-styles)
  - [GSAP becomes free](https://webflow.com/blog/gsap-becomes-free) (30 April 2025), [interactions with GSAP](https://webflow.com/updates/more-control-over-interactions-with-gsap), [contrast ratio tool](https://webflow.com/updates/check-text-accessibility-with-built-in-color-contrast-ratio-tool), [elements](https://university.webflow.com/course-lesson/build-structure-review-elements)
- **Wix:**
  - Studio: [section background](https://support.wix.com/en/article/studio-editor-changing-and-customizing-the-background-of-a-section), [animations](https://support.wix.com/en/article/studio-editor-about-animations), [layers](https://support.wix.com/en/article/studio-editor-working-with-layers), [adding elements](https://support.wix.com/en/article/studio-editor-adding-elements-4240855)
  - Editor: [scroll effects](https://support.wix.com/en/article/wix-editor-adding-scroll-effects-to-image-backgrounds), [elements](https://support.wix.com/en/article/wix-editor-elements-available-in-the-editor)
  - [Wix Harmony](https://support.wix.com/en/article/introducing-the-wix-harmony-editor) (January 2026)
- **Squarespace:** [Finish Layer](https://www.squarespace.com/blog/finish-layer-website-design-tools) (16 April 2026), [blocks](https://support.squarespace.com/hc/en-us/articles/206543757-Adding-content-with-blocks), [section background art](https://support.squarespace.com/hc/en-us/articles/4424780922509-Section-background-art), [background videos](https://support.squarespace.com/hc/en-us/articles/218562738-Adding-background-videos)
- **WordPress:** [Roadmap to 7.1](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/) (19 June 2026), [7.1 field guide](https://make.wordpress.org/core/2026/08/05/wordpress-7-1-field-guide/) (5 August 2026), [Styles overview](https://wordpress.org/documentation/article/styles-overview/), [Site Editor](https://wordpress.org/documentation/article/site-editor/), [List View](https://wordpress.org/documentation/article/list-view/)
- **Elementor:**
  - [3.34: Atomic Tabs and Entrance Interactions](https://elementor.com/blog/elementor-334-v4-atomic-tabs-entrance-interactions/), [4.0: Atomic Forms and Pro Interactions](https://elementor.com/blog/editor-40-atomic-forms-pro-interactions/) (15 April 2026)
  - [background slideshow](https://elementor.com/help/background-slideshow/), [section background video](https://elementor.com/help/section-background-video-options/), [shape divider](https://elementor.com/blog/v130-shape-divider/)
- **Divi:**
  - [version log](https://help.elegantthemes.com/en/articles/9973580) (to 5.14, 28 September 2026), [getting started with Divi 5](https://www.elegantthemes.com/blog/divi-resources/how-to-get-started-with-divi-5) (27 February 2026)
  - [Design Variables](https://www.elegantthemes.com/blog/theme-releases/design-variables?id=34628) (3 April 2025), [preset-based design](https://www.elegantthemes.com/blog/theme-releases/preset-based-design)
  - [background options](https://www.elegantthemes.com/documentation/divi/background-options/), [masks and patterns](https://www.elegantthemes.com/blog/theme-releases/background-masks-and-patterns), [Divi 5 modules](https://help.elegantthemes.com/en/collections/10650978-divi-5-modules)
- **Bricks:** [2.0](https://bricksbuilder.io/release/bricks-2-0/) (16 July 2025), [2.2](https://bricksbuilder.io/release/bricks-2-2/) (10 February 2026)
- **Breakdance:** [2.4](https://breakdance.com/breakdance-2-4/) (9 June 2025)
- **Tilda:** [2025 in review](https://blog-en.tilda.cc/2025-in-review)
- **Hostinger:** [website elements](https://www.hostinger.com/support/6435894-website-builder-website-elements/)
- **Duda:** [accessibility](https://www.duda.co/accessibility)
- **Figma Sites:** [interactions](https://help.figma.com/hc/en-us/articles/31242843431575)
- **Webstudio:** [native scroll-driven animations](https://webstudio.is/blog/native-scroll-driven-animations)
- **Component libraries:** [Tailwind Plus marketing blocks](https://tailwindcss.com/plus/ui-blocks/marketing), [shadcnblocks](https://www.shadcnblocks.com/), [Aceternity UI](https://ui.aceternity.com/components), [Magic UI](https://magicui.design/docs/components), [daisyUI](https://daisyui.com/components/), [HyperUI](https://www.hyperui.dev/), [Once UI](https://once-ui.com/)

### Design references and press (secondary)
- [Josh W. Comeau: full-bleed layout](https://www.joshwcomeau.com/css/full-bleed/)
- [Utopia: fluid type](https://utopia.fyi/)
- [Evil Martians: OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- [CSS-Tricks: grainy gradients](https://css-tricks.com/grainy-gradients/)
- [LogRocket: Liquid Glass with CSS and SVG](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/)
- [Smashing Magazine: beyond border-radius](https://www.smashingmagazine.com/2026/03/beyond-border-radius-css-corner-shape-property-ui/) (March 2026)
- [Creative Boom: font trends 2025](https://www.creativeboom.com/features/font-trends-2025/)
- [Made Good Designs: trending fonts](https://madegooddesigns.com/trending-fonts/)
- [Android Authority: Material 3 Expressive](https://www.androidauthority.com/google-material-3-expressive-features-changes-availability-supported-devices-3556392/)
- [Azuro Digital: nonprofit website examples](https://azurodigital.com/nonprofit-website-examples/)
- [Applet Studio: new Squarespace features](https://www.applet.studio/blog/new-squarespace-features)
- [Search Engine Journal: Squarespace AI tools for SEO and design](https://www.searchenginejournal.com/squarespace-rolls-out-new-ai-tools-for-seo-and-design/557220/)
- [Essential Addons: Elementor 4, the atomic editor](https://essential-addons.com/elementor-version-4-the-atomic-editor/)
- [The Plus Addons: Elementor 4.3](https://theplusaddons.com/blog/elementor-4-3-update.md)
- [Creative AI News: Framer shaders](https://www.creativeainews.com/blog/framer-shaders-animated-web-design/)
- [Releasebot: Framer updates](https://releasebot.io/updates/framer)
- [Mintlify: Shopify Horizon theme blocks](https://mintlify.wiki/Shopify/horizon/architecture/theme-blocks)

### Example sites (primary, observed 11 October 2026)
- [samfundet.no](https://www.samfundet.no/)
- [abakus.no](https://abakus.no/)
- [studentsunionucl.org](https://studentsunionucl.org/)
- [cus.org](https://cus.org/)
- [oyafestivalen.no](https://oyafestivalen.no/)
- [online.ntnu.no: om linjeforeningen](https://online.ntnu.no/om-linjeforeningen)

### Source code (code)
- [Shopify Horizon](https://github.com/Shopify/horizon) (main branch)
- [WordPress Twenty Twenty-Five](https://github.com/WordPress/twentytwentyfive) (trunk)
- [Penpot token types](https://github.com/penpot/penpot/blob/develop/common/src/app/common/types/token.cljc)
- Samfundet4: [model choices](https://github.com/Samfundet/Samfundet4/blob/master/backend/samfundet/models/model_choices.py), [general models](https://github.com/Samfundet/Samfundet4/blob/master/backend/samfundet/models/general.py)
- Abakus: [lego events constants](https://raw.githubusercontent.com/webkom/lego/master/lego/apps/events/constants.py), [lego users model](https://raw.githubusercontent.com/webkom/lego/master/lego/apps/users/models.py), [lego-webapp pages](https://github.com/webkom/lego-webapp/tree/master/lego-webapp/pages)
- Online: [monoweb routes](https://github.com/dotkom/monoweb/tree/main/apps/web/src/app/%28web%29)
- echo: [happening schema](https://raw.githubusercontent.com/echo-webkom/echo-web-mono/main/apps/cms/schemas/happening.tsx), [meeting-minute schema](https://raw.githubusercontent.com/echo-webkom/echo-web-mono/main/apps/cms/schemas/meeting-minute.tsx)
- [ApeironLF](https://github.com/Apeiron-Linjeforening/ApeironLF)
- Urd's own engine, `template/assets/engine/0.7.4/` (read 11 October 2026): `fonts.js`, `theme.js`, `text-typo.js`, `animations/core.js`, `nav-model.js`, `box-style.js`, `sticky.js`, `gallery-layout.js`, `calendar-designs.js`, `blocks/image.js`, `blocks/gallery.js`, `blocks/ribbon.js`, `backgrounds/gradient.js`, and `template/assets/styles/base.css`

### Measured on 11 October 2026 (measured)
- Urd: [urdweb.pages.dev](https://urdweb.pages.dev/)
- Framer: [www.framer.com](https://www.framer.com/), [red.org](https://red.org/)
- Webflow: [webflow.com](https://webflow.com/), [truus.co](https://truus.co/), [www.osmo.supply](https://www.osmo.supply/)
- Wix Studio: [www.jwaylon.com](https://www.jwaylon.com/), [www.wix.com/studio](https://www.wix.com/studio)
- Squarespace 7.1: [adri-fluid-demo.squarespace.com](https://adri-fluid-demo.squarespace.com/), [bailard-fluid-demo.squarespace.com](https://bailard-fluid-demo.squarespace.com/)
- Carrd Pro: [newsletteros.com](https://newsletteros.com/)
- Webstudio: [webstudio.is](https://webstudio.is/)
- Figma Sites: [simple-grill-28884515.figma.site](https://simple-grill-28884515.figma.site/)
- Hostinger: [millawkids.com](https://millawkids.com/)
- Shopify: [theme-horizon-demo.myshopify.com](https://theme-horizon-demo.myshopify.com/), [theme-dawn-demo.myshopify.com](https://theme-dawn-demo.myshopify.com/)
- WordPress: [wordpress.org/news](https://wordpress.org/news/), [wp-themes.com/twentytwentyfive](https://wp-themes.com/twentytwentyfive/)
- Elementor: [elementor.com](https://elementor.com/)
- Bricks: [bricksbuilder.io](https://bricksbuilder.io/)
- Astro: [astro.build](https://astro.build/)
