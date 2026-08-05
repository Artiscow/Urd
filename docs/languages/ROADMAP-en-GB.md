# Roadmap

**🇬🇧 English** · [🇳🇴 Bokmål](../VEIKART.md)

Translation of VEIKART.md. Norwegian (bokmål) is canonical and prevails in case of discrepancies.

The order is deliberate: **engine → publishing loop → editor depth.** The engine makes the schema real (schema errors are cheapest to fix before the editor depends on them). The publishing loop is the riskiest *integration*, but the most *proven* pattern - landing it early gives a real deploy target for everything that follows. Editor refinement is the long tail and is built against a working pipeline.

## v0.1 - Skeleton *(delivered 16 July 2026)*

Documents (VISJON, ARKITEKTUR, SKJEMA, VEIKART, the ADRs), JSON Schema contract in `schema/`, repo skeleton with engine stubs, example content, editor shell and function stubs. `migrate.js` is implemented for real - the invariant first.

**Gate:** the example data validates against the schemas; the documents are approved by the owner.

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
- **The mobile-supervision flag end to end** (rules in [SKJEMA.md](../SKJEMA.md#mobil-tilsyn)).
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

## v0.6 - Ecosystem

- Plugin loading in earnest: plugins deliver **their own blocks, section presets, backgrounds, animations and templates** via `register(Urd)`. The calendar plugin as the reference example; maps and forms as further reference plugins.
- **The archive/data block pattern**: blocks that render collections of entries (news, notices, boards), designed together with the calendar plugin. Calendar-dependent presets: news, notice board, «What's on».
- **«Save as template»**: your own sections/pages are saved in `content/maler/` and can be shared as plugins. GitHub topic convention (`urd-plugin`, `urd-template`) for discoverability.
- `urd-template` repo split + release Action («Use this template»).
- Updater v1: one-click Urd update that only overwrites the manifest paths in `urd.json`.

The phase is steered as milestones 0.6.1-0.6.9 in [BACKLOG.md](../BACKLOG.md), and grew along the way with an editor and design lift (0.6.6), templates and reuse (0.6.7) and the multilingual framework (0.6.8).

**Gate:** clone the template via «Use this template», build a page in admin, install the calendar plugin, and run the update button: everything survives.

## v0.7 - Polish + shop
- **Shop without a payment gateway as a core feature** (the ApeironLF model, chosen 18 July 2026): product card block with variants, shopping cart (localStorage + drawer), order form to email/optional endpoint, payment via Vipps number instructions. Dependency-free, git-owned catalogue; built on the v0.6 data block pattern. Details in [BACKLOG.md](../BACKLOG.md).
- **SEO base package** (from the feature map of 23 July 2026, see [FUNKSJONSKART.md](../sammenligning/FUNKSJONSKART.md)): per-page meta/og fields, sitemap, robots, 404, canonical. Plus RSS for collections, more form field types, video background layer and CSV/table; details in the backlog.
- **Architecture work added to the phase along the way** (details in [BACKLOG.md](../BACKLOG.md)): the mobile reconsideration (a separate mobile model?), fixed content width (its own ADR: makes the layout width-invariant, fixes the fold discrepancy in admin and the flow-out bugs) and client-side navigation.
- Check all features and see whether anything is missing or does not work well. (The feature comparison against other builders was done on 23 July 2026 - FUNKSJONSKART.md; remaining: a separate review of intuitiveness and clutter.)
- Is everything intuitive?
- Are things cluttered?
- Anything that is not easy to understand or easy to misunderstand?

**Gate:** a test order goes through cart, order form and email on a deployed site; the published site has meta/og fields, sitemap, robots and 404; the intuitiveness review has been carried out and the findings sorted into the backlog; the architecture clarifications (mobile, content width, client-side navigation) have landed with an ADR or been explicitly moved.

## v0.8 - Optimisation

Performance and size review of the whole product. (Basic
image compression on upload - webp, max 1600px, size warning -
was delivered in v0.3; this is the layer above.)

- Images onwards: responsive sizes (`srcset`), AVIF assessment, lazy loading, and possibly recompression of existing media/ files.
- The website/template: measure and lower weight and load time for visitors (engine size, critical CSS, caching headers, Lighthouse budget as a CI check?).
- The engine: profile rendering and rerendering with many sections/blocks; avoid unnecessary redraws in the preview.
- The editor: bundle size and startup time; drag/resize shall hold 60 fps on large pages too.
- «Baked HTML on publishing» (the SEO/no-JS point from the risk list) naturally belongs here if it has not already been taken.
- From the feature map (23 July 2026): entry pages (permalink per collection entry, generated on publishing - belongs together with the baking) and a media library panel.
- Modernise to native/CSS (from [ELEMENTKART.md](../sammenligning/ELEMENTKART.md) of 27 July 2026): `<dialog>`/Popover top layer, `<details name>`, scroll-driven animations, `light-dark()` without FOUC and a finer patch protocol. Native/CSS replaces fragile bespoke JS and lowers weight/jank; separate backlog section with details and doc references.

**Gate:** the performance budget (Lighthouse thresholds and weight targets, fixed when the phase starts) has been measured and held on a published example page, and drag/resize holds 60 fps on a large page.

## v0.9 - The dress rehearsal

We use Urd as an outside user, without shortcuts:

- Create a real site (working name: Urd-Design) via the «Use this template» button, in its own repo with its own Cloudflare setup, set up ONLY by following [OPPSETT-PUBLISERING.md](setup-publication/SETUP-en-GB.md). All friction that is discovered is a finding that shall be fixed.
- Build the site to completion through admin alone.
- Then release an Urd update that contains a **real block change (v1→v2 with migration)**, and run the update button on the Urd-Design site.

Up to v0.6, `template/` is both workshop and demo (urdweb); that is fine as long as the example content is kept presentable. From v0.6 the template is its own repo, and Urd-Design becomes the first site that lives as a real user's.

**Gate:** Urd-Design survives the update without loss of content or manual intervention - promise 2 proven in practice, not just in the test suite.

## v1.0 - Usable

An association can clone, set up, build and maintain a site without a developer.

**Gate:** the migration contract has been tested with at least one real v1→v2 block change in the test suite; a pilot site (candidate: recreating ApeironLF with Urd) has been built and is being operated. The pilot presupposes the v0.7 shop (ApeironLF has merch with a cart) and the v0.6 calendar plugin (events from a Google Calendar/iCal feed).

## After 1.0 (horizon)

Unprioritised, depends on community and needs: import from existing sites,
multilingual CONTENT (nb/nn/en variants of the pages themselves; the UI and the documentation
are multilingual from 0.6.8), concurrency view in admin, gallery website for templates and
plugins (urd.dev), GitLab/Gitea adapter, external media storage (R2),
PR-per-draft/deploy-preview workflow (from [LAERDOMMER.md](../sammenligning/LAERDOMMER.md)) and
shop/merch template. Details in [BACKLOG.md](../BACKLOG.md).

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
| Plugins in /plugins: templates, animations, backgrounds, sections | v0.6 (plugin API `provides:{blocks, sectionPresets, backgrounds, animations, maler}`) - the contract was already defined in the v0.1 schema |
| Templates for hero, images, calendar, footer | v0.3 (presets) + calendar as reference plugin (v0.6) |
| An update never breaks a built site (`version` + `migrate`) | v0.1 (migrate.js implemented) + tested in the v1.0 gate |
| Real GitHub OAuth + Cloudflare connection | v0.2 (thin slice) |
| Static + git, publish = commit, optional host | The whole architecture ([ARKITEKTUR.md](../ARKITEKTUR.md)) |

## Risks and open questions

| Topic | Status |
|---|---|
| SEO / visitors without JS (client-side rendering gives an empty shell to simple crawlers) | Accepted in v0; the SEO base package is planned in v0.7 and «baked HTML on publishing» in v0.8 - the editor already renders finished DOM that can be snapshotted |
| Auto-derived mobile layout for decor blocks (lines/circles stack badly) | Delivered in v0.4 («decor» flag); the mobile model as a whole is reconsidered in v0.7 (the backlog's mobile reconsideration) |
| Images in git (repo growth, file limits at hosts) | v0: size warnings in the editor; external storage (e.g. R2) as a plugin question towards v1 |
| The updater vs. hand-edited Urd-owned files | Decided at the 0.6.9 gate - probably a checksum warning before overwriting |
| Non-GitHub hosts (GitLab/Gitea) | The `functions/_lib` boundary is kept adapter-friendly; out of scope until after v1 |
| Number of breakpoints | Two (desktop + mobile) in v1; tablet considered later |
