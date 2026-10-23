# Roadmap

**🇬🇧 English** · [🇳🇴 Bokmål](../VEIKART.md)

The canonical text (ADR-0022): on a discrepancy this English text applies. The Norwegian (bokmål) version is [VEIKART.md](../VEIKART.md), and a change is made in both.

The order is deliberate: **engine → publishing loop → editor depth.** The engine makes the schema real (schema errors are cheapest to fix before the editor depends on them). The publishing loop is the riskiest *integration*, but the most *proven* pattern - landing it early gives a real deploy target for everything that follows. Editor refinement is the long tail and is built against a working pipeline.

## v0.1 - Skeleton *(delivered 16 July 2026)*

Documents (VISJON, ARCHITECTURE, SCHEMA, VEIKART, the ADRs), JSON Schema contract in `schema/`, repo skeleton with engine stubs, example content, editor shell and function stubs. `migrate.js` is implemented for real - the invariant first.

**Gate:** the example data validates against the schemas; the documents are approved.

## v0.2 - «Thin slice» *(delivered 16 July 2026)*

End to end with the least possible breadth: the engine renders `hjem.json` (one hero section, text and button block, gradient background, desktop only). Admin loads the real page in an iframe, click-and-type on text, draft in localStorage, «Publish» commits via the functions, Cloudflare Pages serves.

**Gate:** edit a heading in the browser on a deployed clone and see it live after publishing - without touching a code file.

## v0.3 - The canvas *(delivered 17 July 2026)*

- Block palette: text, image, button, shapes (lines - horizontal, vertical, diagonal via rotation - circles, rectangles), logo.
- Drag, resize and snap on the grid (configurable grid size), z-order.
- Section CRUD with «+ New section» in place, section presets (hero, images, footer) - and **building your own sections from an empty section**.
- Incremental rerender in the preview.

## v0.4 - Responsive *(delivered 17 July 2026)*

A dedicated mobile phase: almost purely engine work, independent of the panel UI
that arrives in v0.5. (Background editor and animations have been moved to v0.5:
they ARE panel UI, and shall not be built twice.)

- Mobile view in the editor, auto-derived stacking, manual mobile frames.
- **The mobile-supervision flag end to end** (rules in [SCHEMA.md](../SCHEMA.md#mobile-review)).
- «Decor» flag on blocks (lines/circles that stack badly in an auto-derived layout).

**Gate:** a page built on desktop looks sensible on mobile without manual
intervention, and the supervision flag catches drift when the mobile layout has been hand-adjusted.

## v0.5 - The panels and the site around the page *(delivered 18 July 2026)*

The editor's UI is reworked FIRST (today's top bar is saturated), and all
the editing surfaces are built on the new layout:

- New editor layout: side panel/icon toolbar, status messages as toast.
- Side panel: create/rename/delete pages from the page register.
- Nav editor and theme token panel (colours, fonts, radii).
- Block editor: props UI per block type - image (alt/fit/radius/link), shapes (fill/colour/thickness), button (target/style), text (alignment, typography). New block types: video/embed and icon.
- Keyboard shortcuts: arrow keys move the selected block, Delete deletes, Esc deselects.
- Section editor with a **full background editor** (layers: colour/gradient/animated, glow, image layer, grain) and **animation settings per block/section** (entry animations, hover; version+migrate contract) - moved from v0.4.
- Conflict warning before publishing («someone else has published since you loaded», via the `latest` endpoint that has been ready since v0.2).
- Setup wizard on first visit (name, colours, logo, GitHub/Cloudflare connection).
- History and undo-publishing UI (`history`/`revert`).

## v0.6 - Ecosystem *(delivered 9 August 2026)*

- Plugin loading in earnest: plugins deliver **their own blocks, section presets, backgrounds, animations and templates** via `register(Urd)`. The calendar plugin as the reference example, with maps and forms as further reference plugins (all three became core blocks in 0.7.18).
- **The archive/data block pattern**: blocks that render collections of entries (news, notices, boards), designed together with the calendar. Calendar-dependent presets: news, notice board, «What's on».
- **«Save as template»**: your own sections/pages are saved in `content/maler/` and can be shared as plugins. GitHub topic convention (`urd-plugin`, `urd-template`) for discoverability.
- `urd-template` repo split + release Action («Use this template»).
- Updater v1 ([ADR-0014](../adr/0014-updater-model.md)): a one-click Urd update from the template repo, where every Urd-owned file is classified by its checksum against the release tag, so a hand-edited file is shown before anything is written; `_headers` is never written and gets diff instructions instead.

The phase was steered as milestones 0.6.1-0.6.9 in [BACKLOG.md](../BACKLOG.md), and grew along the way with an editor and design lift (0.6.6), templates and reuse (0.6.7) and the multilingual framework (0.6.8).

**Gate:** clone the template via «Use this template», build a page in admin, install the calendar plugin, and run the update button: everything survives. *(Passed 9 August 2026.)*

## v0.7 - Polish + shop

- **Shop without a payment gateway as a core feature** (the ApeironLF model, chosen 18 July 2026): product card block with variants, shopping cart (localStorage + drawer), order form to email/optional endpoint, payment via Vipps number instructions. Dependency-free, git-owned catalogue; built on the v0.6 data block pattern. A real payment checkout was moved into the phase as an optional layer on top of the form checkout (9 August 2026; Vipps Checkout, [ADR-0020](../adr/0020-optional-payment-layer-vipps-checkout.md)); the core stays gateway-free. Vipps MobilePay Checkout is discontinued on 30 April 2027 (Kustom took it over), so the optional layer moves to the ePayment API or to Kustom Checkout before then.
- **SEO base package** (from the feature map of 23 July 2026, see [FEATURES.md](../comparison/FEATURES.md)): per-page meta/og fields, sitemap, robots, 404, canonical. Plus RSS for collections, more form field types, video background layer and CSV/table.
- **The architecture clarifications**: the fixed content width ([ADR-0018](../adr/0018-bound-content-width.md)), the synced mobile model ([ADR-0019](../adr/0019-synced-mobile-model.md)), client-side navigation (measured, and closed without a router), the content push on the desktop canvas ([ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md)) and the sizing model for every block ([ADR-0025](../adr/0025-the-sizing-model.md)).
- **The intuitiveness review**: is everything intuitive, is anything cluttered, is anything easy to misunderstand? (The feature comparison against other builders was done on 23 July 2026, refreshed on 11 October 2026 and deepened function by function on 19 October 2026, [FEATURES.md](../comparison/FEATURES.md).)
- **Privacy defaults and redirects** (from the comparison of 11 October 2026): embeds load only on a click, a privacy page is generated from the site settings, consent is asked for only when analytics or embeds need it, 301 redirects are generated at publishing ([ADR-0015](../adr/0015-redirects-ownership.md)), and the order button, the summary above it and the buyer's printable confirmation follow the consumer law (angrerettloven §§ 16 and 18; found 19 and 20 October 2026).

The phase is steered as milestones 0.7.0-0.7.26 in [BACKLOG.md](../BACKLOG.md), split up on 9 August 2026 (the architecture clarifications first, then blocks, shop and visibility, polish towards the end) and grown along the way. Releases carry the phase's minor with a running patch number (0.7.1 to 0.7.7 so far). As of 20 October 2026:

- **Delivered:** 0.7.1 the clean-up round, 0.7.2 the fixed content width, 0.7.4 blocks and form fields, 0.7.5 the shop, 0.7.6 SEO and visibility, 0.7.7 the video background and media limits, 0.7.8 client-side navigation, 0.7.12 the anchoring round, 0.7.14 the English clean-up, 0.7.15 navigation bar sizing, 0.7.17 the width scaling, 0.7.18 map, form, calendar and analytics into the core, 0.7.20 the element menu, 0.7.21 the sizing model for every element, 0.7.26 App.svelte split into functional parts, 0.7.27 named anchors and one link editor.
- **Open:** 0.7.3 the mobile reconsideration, 0.7.9 the design stretch from 0.6.6, 0.7.10 the intuitiveness review and editor polish, 0.7.11 the accessibility round, 0.7.13 the element review, 0.7.19 the calendar designs, 0.7.22 print, 0.7.23 redirects, 0.7.24 privacy defaults.
- **Moved to v0.8 (20 October 2026):** 0.7.16 archiving and person collections (now AR), 0.7.25 own looks from design tools (now OL), and parts of 0.7.3 (the phone side of the canvas, PH), 0.7.11 (the accessibility audit, AU), 0.7.13 (the shortcut's fetched icon) and 0.7.19 (more calendar designs, CD); the mapping stands at the top of BACKLOG.

**Gate:** a test order goes through cart, order form and email on a deployed site; the published site has meta/og fields, sitemap, robots and 404; the intuitiveness review has been carried out and the findings sorted into the backlog; and every milestone above is delivered and has passed its test round, or has been moved to a later phase with the move recorded in the backlog.

## v0.8 - Speed, media and baked pages

Three threads: a performance and size review of the whole product, the media work that makes pictures light and manageable, and pages baked into HTML at publishing, together with the content that needs its own address. (Basic image compression on upload - webp, max 1600 px, size warning - was delivered in v0.3.)

- **Speed for visitors:** measure and lower weight and load time (engine size, critical CSS, caching headers, `content-visibility` for sections below the fold, a Lighthouse budget as a CI check?), and show the engine's lightness measurably; publish-time files for search engines and AI agents (llms.txt, a Markdown twin per page, an owner-chosen Content-Signal line, sitemap `lastmod`), the editor's CSS split out of the visitor's stylesheet, and per-page module lists once pages are baked.
- **Speed in the editor:** profile rendering and rerendering with many sections and blocks, a finer patch protocol in the preview (one block or attribute instead of a section rerender), bundle size and startup time, drag and resize at 60 fps on large pages, and an index layer so admin queries stay fast as collections grow.
- **Media:** responsive pictures (`srcset`, the picture's own ratio, AVIF), a media library panel (from the feature map), an image editor in admin, a longer content hash in media file names, possibly recompressing existing media files, and animation and 3D files (Lottie, Rive, glTF) as local plugins, with a sandboxed portal for exported code.
- **Baked pages:** «baked HTML on publishing» (the SEO/no-JS point from the risk list), with collection data baked in, and entry pages (a permalink per collection entry, from the feature map) and a page per product (linked from the shop's quick view) generated with it.
- **Content:** events as a collection kind (date, time and place, an upcoming filter and a month view), for an association that keeps its programme in Urd rather than in a calendar feed; and the template model: a template or a group of templates exported as a plugin, and whole site templates kept in Urd; and **the Element round**: the missing elements from the comparison of 11 October 2026, each built natively (tabs, popups, file lists and documents, opening hours, charts and progress, carousel views for collections, more form fields with conditions and steps, event registration links, sponsor tiers, donations, breadcrumbs, date windows), with typed custom fields per collection and site search from a publish-time index to be weighed alongside ([ELEMENTS.md](../comparison/ELEMENTS.md)).
- **Archiving, own looks and more calendar designs:** archiving and person collections (entry states, filters, the people kind, section hide); own looks from design tools (decided 14 October 2026: a look made in Figma, Penpot, Illustrator or SVGator becomes the face, the scoped style or the tokens of an Urd element, with the pointer as CSS properties for designs that follow it; code never comes in this way); the calendar's stylised families beyond retro with a card per design and designed sizes; the editor's accessibility audit panel; the phone side of the canvas; and the shortcut's icon fetched from the site it points to.
- **Alongside:** the MCP server's read part ([ADR-0017](../adr/0017-ai-via-local-mcp-server.md)), a dependency-free local process with read tools and `urd_validate`; the updater offering the refreshed shipped plugins as opt-in files; and the plugin guide rewritten in English, with an AGENTS.md for agents that build plugins.

**Gate:** the performance budget (Lighthouse thresholds and weight targets, fixed when the phase starts) has been measured and held on a published example page, and drag/resize holds 60 fps on a large page.

## v0.9 - The dress rehearsal

We use Urd as an outside user, without shortcuts:

- Create a real site (working name: Urd-Design) via the «Use this template» button, in its own repo with its own Cloudflare setup, set up ONLY by following [the setup guide](setup-publication/SETUP-en-GB.md). All friction that is discovered is a finding that shall be fixed.
- Build the site to completion through admin alone.
- Hosting beyond Cloudflare Pages: the site served from any static host (GitHub Pages, Netlify, an own server), with a way for the sign-in and the publishing from `/admin` to work there, and an answer to how such a site gets Urd updates (added 6 October 2026; details in BACKLOG).
- Then release an Urd update that contains a **real block change (v1→v2 with migration)**, and run the update button on the Urd-Design site.

Also in the phase (details in [BACKLOG.md](../BACKLOG.md)): the documentation round (setup guide friction, troubleshooting, the readme structure) and the user guide finished, and the release and updater hardening, both gathered here on 9 August 2026 because they cover the guides and the code the dress rehearsal tries out; the MCP server's write tools (ADR-0017); restoring an earlier publish, or one page, from the History panel; the translation round for nn and se; touch-friendliness for admin and the published page; one editing size per site, shared between editors; the code comments reviewed before outside developers read them; starting a new site from a blank page or a full page template; board handover (a «new board term» checklist: the repo in an association GitHub organisation, two owners with 2FA, the Cloudflare account and the domain on the association); test fixtures per block type and a seeded fuzz test of the push pass; optimistic commits that retry when only other files changed; and, to be weighed, a content-only editing mode and scheduled publishing.

Until v0.6, `template/` was both workshop and demo (urdweb); from v0.6 the template is its own repo, and Urd-Design is the first site that lives as a real user's.

**Gate:** Urd-Design survives the update without loss of content or manual intervention - promise 2 proven in practice, not just in the test suite.

## v1.0 - Usable

An association can clone, set up, build and maintain a site without a developer.

**Gate:** the migration contract has been tested with at least one real v1→v2 block change in the test suite; a pilot site (candidate: recreating ApeironLF with Urd) has been built and is being operated. The pilot presupposes the v0.7 shop (ApeironLF has merch with a cart) and the calendar block (events from a Google Calendar/iCal feed).

## v1.1 - The shop

A shop without a database on top of the payment layer ([ADR-0027](../adr/0027-a-shop-without-a-database.md), decided 19 October 2026 from the survey «What a shop needs» in [SURVEYS.md](../comparison/SURVEYS.md)). The catalogue in git stays the only truth and the site keeps no order store; the phase starts once the payment layer has left Vipps Checkout (BACKLOG URGENT).

- Variants with their own price, SKU and image, and published stock per variant with «sold out»; the payment is reserved at the order and captured when the goods ship, so an oversold order is cancelled with nothing charged.
- Static shipping tables with pickup and a delivery time, and discount codes published only as an HMAC.
- MVA as a seller switch, off by default, and the before price read from the catalogue's git history.
- A notice to the owner from the provider's webhook, the buyer's receipt in the payment app with a printable confirmation, and shop terms with the withdrawal form generated from the shop settings.
- A shop template for association merch; to be weighed, a dated service product as paid registration.

**Gate:** a test order with two variants, a shipping rule and a discount code is paid on a deployed site; the amount charged equals the function's total; a variant published at 0 cannot be ordered; and no order data lands in the repo or in the function's logs.

## After 1.0 (horizon)

Unprioritised, depends on community and needs: import from existing sites,
multilingual CONTENT (nb/nn/en variants of the pages themselves; the UI and the documentation
are multilingual from 0.6.8), more UI languages (French, German, Spanish, Finnish, Danish),
export of a built site, concurrency view in admin, gallery website for templates and
plugins (urd.dev), GitLab/Gitea adapter (publishing and updates for a repo outside GitHub), external media storage (R2),
PR-per-draft/deploy-preview workflow (from [CODE.md](../comparison/CODE.md#part-5-publishing-and-deploy)), synced global blocks (one block used on several pages and edited once),
the owner's own server functions beside Urd's, shop extensions beyond v1.1 (bundles, quantities, pre-orders,
upsells). Details in [BACKLOG.md](../BACKLOG.md).

---

## Traceability: the brainstorm (PLAN.md) → the roadmap

Nothing from the original brainstorm shall be lost:

| Item from PLAN.md | Where it lives |
|---|---|
| WYSIWYG: click and type, hover for drag/delete, «+ New section» in place | v0.2 (click-and-type) + v0.3 |
| Grid-based free placement, resize, configurable grid size | v0.3 (+ `grid` in site.json/section) |
| Lines (horizontal/vertical/diagonal), circles, logos | v0.3 (shape/logo blocks, `rot` in frames) |
| Full background editor: colour/gradient/animated + glow + image layer + grain | v0.5 (the engine has rendered the layers since v0.2) |
| Animations (block/section) | v0.5 + extensible via plugins (v0.6) |
| Panel for the pages + nav editing | v0.5 |
| Detailed editor for section/block/text/images/colours | v0.3-v0.5 |
| Making your own sections | v0.3 (empty section + blocks) |
| Making your own template | v0.6 («Save as template» → `content/maler/`) |
| Plugins in /plugins: templates, animations, backgrounds, sections | v0.6 (plugin API `provides:{blocks, sectionPresets, backgrounds, animations, templates}`) - the contract was already defined in the v0.1 schema |
| Templates for hero, images, calendar, footer | v0.3 (presets) + the calendar (a reference plugin in v0.6, a core block from 0.7.18) |
| An update never breaks a built site (`version` + `migrate`) | v0.1 (migrate.js implemented) + tested in the v1.0 gate |
| Real GitHub OAuth + Cloudflare connection | v0.2 (thin slice) |
| Static + git, publish = commit, optional host | The whole architecture ([ARCHITECTURE.md](../ARCHITECTURE.md)) |

## Risks and open questions

| Topic | Status |
|---|---|
| SEO / visitors without JS (client-side rendering gives an empty shell to simple crawlers) | Accepted in v0; the SEO base package was delivered in 0.7.6, and «baked HTML on publishing» is planned in v0.8 - the editor already renders finished DOM that can be snapshotted |
| Auto-derived mobile layout for decor blocks (lines/circles stack badly) | Delivered in v0.4 («decor» flag); the mobile model as a whole is decided in [ADR-0019](../adr/0019-synced-mobile-model.md) (synced per block, the row grid), with `hideMobile` taking over the mobile hiding |
| Images in git (repo growth, file limits at hosts) | v0: size warnings in the editor; the media library (v0.8) shows sizes and unused files; external storage (e.g. R2) as a plugin question after v1 |
| The updater vs. hand-edited Urd-owned files | Decided in [ADR-0014](../adr/0014-updater-model.md): every Urd-owned file is classified by its checksum against the release tag, a hand-edited file is shown as a conflict before anything is written, and `_headers` is never written |
| Non-GitHub hosts (GitLab/Gitea) | The `functions/_lib` boundary is kept adapter-friendly; out of scope until after v1 (other static hosts for the site itself are planned in v0.9) |
| Number of breakpoints | Two (desktop + mobile) in v1; tablet considered later |
| Third-party services change under the site | Vipps Checkout is discontinued on 30 April 2027. The core stays gateway-free; the optional layer moved to the Vipps MobilePay ePayment API on 23 October 2026 ([ADR-0020](../adr/0020-optional-payment-layer-vipps-checkout.md)), and the shop of v1.1 names what it needs from the layer, not the provider ([ADR-0027](../adr/0027-a-shop-without-a-database.md)) |
