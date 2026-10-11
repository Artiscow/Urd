# Architecture

This document describes how Urd fits together. The data model - the contract everything builds on - is in [SCHEMA.md](SCHEMA.md). The reasoning behind the design choices is in [adr/](adr/).

## System overview

```
VISITOR                            EDITOR
   │                                  │
   ▼                                  ▼
yoursite.no ─────────────────► yoursite.no/admin
   │                                  │ GitHub login (OAuth)
   │  static files:                   ▼
   │  index.html                prebuilt editor (Svelte, compiled)
   │  assets/engine/*  ◄──┐           │
   │  content/**.json     │           │ draft in localStorage
   │  media/*             │           ▼
   │                      └── iframe preview: the REAL site,
   ▼                          draft pushed via postMessage
 the engine renders the site          │
 from content/ data                   │ «Publish»
                                      ▼
                          functions/api/github/* (Pages Functions)
                                      │ one commit via Git Data API
                                      ▼
                                GitHub repo  ──►  the host deploys (~1 min)
```

Two worlds, one repo:

- **The visitor site** is raw static files: `index.html` loads the hand-written engine (`assets/engine/`), which reads `content/site.json` + `content/pages/*.json` and builds the DOM. No build process, no framework.
- **Admin** (`admin/`) is a prebuilt Svelte app that is committed as static files. It edits the same JSON files, previews them through the real site in an iframe, and publishes via serverless functions.

## The engine (`template/assets/engine/`)

Hand-written, readable, dependency-free ES module JavaScript - never compiled ([ADR-0002](adr/0002-svelte-for-editor-readable-js-for-engine.md)). The ownership promise applies to what the visitor loads, and the editor's preview iframe loads exactly these files - preview fidelity is therefore structural, not something that has to be maintained.

Core parts:

- **`urd.js`** - entry point. Creates `window.Urd` with the registries, loads site + page, runs migration and render.
- **`registry.js`** - shared registry factory. All extensible types use the same pattern:
  ```js
  Urd.blocks.define('text', { version, label, defaults, migrations, render, mount? });
  Urd.sections.definePreset('hero', { label, create });
  Urd.backgrounds.define('gradient', { version, label, defaults, migrations, render });
  Urd.animations.define('fade-in', { version, label, defaults, migrations, apply });
  ```
  Plugins use the identical APIs - the core and plugins are equals.
- **`migrate.js`** - stepwise version lifting at load time. The most important file in Urd; see [ADR-0005](adr/0005-versioning-and-migration.md). Lifting happens in memory - the files on disk are only written at the next publish. Unknown type → neutral placeholder, data kept untouched.
- **`render.js`** - render loop: page → sections → background layers + blocks. Translates grid units (columns/rows) into CSS. Incremental: a single changed section is re-rendered on its own (used by the preview).
- **`theme.js`** - maps `theme.tokens` from `site.json` to CSS variables (`--urd-color-bg`, `--urd-font-heading`, …).
- **`nav.js`** - builds the navigation from the page registry in `site.json`. Nothing is hard-coded: nav, routing and admin panel lists are all derived from the same registry.

### Desktop sizing: the push pass, the fit and the gestures

The decisions are in [ADR-0024](adr/0024-content-push-on-the-desktop-canvas.md) (content push) and [ADR-0025](adr/0025-the-sizing-model.md) (the sizing model); this is how they are built. The pure parts are in `push-model.js` (`pushLayout`, `fitMoves`, `followsContent`, `heightAlign`, the type sets) and tested in node; the measuring parts are in `render.js` and `preview-edit.js`.

- **The push pass** (`applyPush` in render.js) runs for every desktop section one animation frame after the blocks' own measurements, and again on every `ResizeObserver` notification from a block or its content, deduplicated to one pass per frame per section. For each block it writes the frame's height, applies the shrink (`fitContent`), measures the height the content needs, and asks `pushLayout` for the shifts; the shifts are written as `style.top` and `data-urd-shift`, the drawn height as `data-urd-drawn`. A block that follows its content (`data-urd-height="content"`) is measured by `hugHeight`: its natural height when it is drawn at its content, or 0 to keep the frame while it is still loading (`aria-busy`). Such a block is observed through its content children alone, since a box the observer watches and the pass resizes in its own callback would come back as a notification it cannot deliver in the same frame.
- **Editor-only parts never push.** The image adders, the «+ Product» card, the placeholders of empty fields and the calendar's notes about removed lines are drawn in the preview but are not on the page; `EDITOR_ONLY` in render.js lists them, base.css hides the same list under `.urd-fit-measure`, and a test holds the two equal. The pass draws a block with them but measures its growth as a visitor sees it (`asVisitor`, `visitorHeights`), so the editor's section heights are the published page's.
- **The section line.** `writePush` sets the section's inline min-height from `data-urd-min-height` (the section's own height, or the blocks' extent when it has none) and counts a block towards the section only while its design bottom is inside that height. In the preview (`_urdPushPreview`, set by `wirePush`) a section with a height of its own is never raised by growth; on the published page it is raised to the pushed bottom plus `PUSH_SECTION_PAD`. A section without a height of its own follows every block in both.
- **The fit.** After an edit of a block that follows its content, the editor (`fitBlockSoon` in App.svelte, debounced per block with a sequence number so only the latest answer counts) posts `urd-fit-block`; the preview measures the block at rest as a visitor sees it, three times to catch a design drawn by a module loaded on demand or a feed answering late, and answers with `urd-grow` carrying `fit: true`. The editor writes the height into `frames.desktop.h`, moves the blocks below by `fitMoves` (the push rules applied to the growth, so the data takes over what the pass drew) and sends `urd-frames`; the preview puts the frames into the section the pass holds (`updateFrames`) without drawing it again, so a caret in the block's text survives a fit that follows typing. The measure leaves out the unfolded part of open `<details>` (`unfoldedHeight`): an FAQ answer or a calendar fold a visitor opened is view state.
- **The gestures.** At the first move of a drag, a resize, an arrow key, align or distribute, `settleFrames` in preview-edit.js settles the frames of the blocks under the gesture to the boxes the pass draws for them (a block that follows its content takes its resting height, any other block its growth) and moves the blocks below by `fitMovesAll`, writing into the section the pass and the editing layer hold; the settled frames go to the editor as `urd-move` messages in the gesture's undo step (`postSettled`), and a gesture that changes nothing calls the settle's `undo`. While a gesture runs the pass is suspended (`suspendPush`/`resumePush`) and `pushPreview` draws the push as it will be on release from the frames under the pointer; the blocks being moved are left out of the section height, a resize keeps its block in it. The lower handle of a block that follows its content changes the width only, and a pull up or down shows the stop bar (`.urd-edit-stop`) at the content's edge; a fit that lands during the drag (`urd-frames` into the same block) wins over the height the drag began with. A block given its own height (`height.mode: "own"`) is no longer `followsContent`, so every path above treats it as a box.
- **The content in a box with its own height.** `heightAlign` reads the block's `height.align`, render.js writes it as `data-urd-align` on the block in both the desktop and the mobile branch, and base.css lays such a block out as a grid of one row: the content keeps its own height and moves to the middle or the bottom, or takes the row with stretch, which each type's own layout then fills (the figure centred, the countdown's units grown, a quote's card filled, the plain list and card calendar views spreading their rows and cards under the finding tools and over the subscribe row, with the calendar root as a flex column for that case). The editing handles and badges are absolutely placed and stay out of the row.
- **The block's own width.** The blocks with columns, cards or a layout that changes when the box is narrow (`FOLLOWS_WIDTH`) are marked `data-urd-width="own"` and are size containers named `urd-block` in base.css; other blocks are not, since a container box would hold a fixed-position descendant, which a plugin block may have. A rule that asks the block's width is a container query, and the window's media query it replaces stays beside it behind `@supports not (container-type: inline-size)` with the same declarations; a test holds the two equal. The calendar's narrow layouts are a different DOM (dots that open the day, stacked days) and are chosen in script by the block's width, read from a zero-height ruler beside the calendar so the pass's changes to the block's height never reach the observer. Galleries and product cards write a wide and a narrow column count and let the container query pick.
- **The map.** The map's box is its frame: `.urd-map` is a grid of the iframe row and the «Larger map» line, and the iframe fills what the frame leaves. The height setting it had until page schemaVersion 4 is lifted into the frame by `liftMapHeights` in migrate.js (the page migration 4 → 5, and template insertion), which gives the frame the height the map showed and moves the blocks below as a fit would.

## The editor (`editor/` → `template/admin/assets/`)

Written in Svelte 5 + Vite in the main Urd repo. At release it is built to static files in `template/admin/assets/` which are **committed** - associations that clone the template get a ready-made editor and never touch npm. The source code is open here; the compiled files in cloned repos are its product.

Key mechanisms (patterns validated in ApeironLF):

- **Draft:** all editing is written continuously to `localStorage`. A «baseline» (the published state) is compared against the draft; if they are equal, the draft is removed - this keeps the «unpublished changes» marker always honest.
- **Preview:** the editor shows the real site in an iframe with `?preview=1` and pushes the draft via `postMessage`. The engine listens and re-renders incrementally.
- **Panel registry:** the editor's panels (pages, nav, theme, …) are registered with the same define pattern the engine uses, so that plugins can provide admin panels later.
- **Mobile review:** the editor enforces the flag rules in [SCHEMA.md](SCHEMA.md#mobile-review) - if you change the desktop layout in a section with a manual mobile layout, the section is flagged until you have looked over the mobile view.

## The publishing flow (`template/functions/`)

Cloudflare Pages Functions - small serverless functions that ship with the repo and require zero operations ([ADR-0003](adr/0003-publishing-via-github-oauth-and-pages-functions.md)). The pattern is validated in production in ApeironLF.

| Endpoint | Role |
|---|---|
| `GET /api/github/login` | Starts GitHub OAuth (state cookie against CSRF) |
| `GET /api/github/callback` | Exchanges the code for a token server-side; the token is stored in an httpOnly cookie and never reaches browser JS |
| `GET /api/github/me` | Login status + enforces `ALLOWED_LOGINS` |
| `POST /api/github/commit` | The core: commits all changed files as ONE commit via the Git Data API |
| `GET /api/github/latest` | HEAD + diff since the baseline SHA → conflict detection («Someone else has published») |
| `GET /api/github/history` | Latest commits → basis for undoing a publish |
| `POST /api/github/revert` | Forward revert: a new commit pointing at the previous tree - history is never deleted |

Security layers (defence in depth):

1. **No admin password** - *editing* locally is harmless; the gate is that only GitHub-logged-in users in `ALLOWED_LOGINS` can *commit*.
2. **Path allowlist in `commit.js`:** publishing can only write `content/**`, `media/**`, `plugins/plugins.json` and per-page routing copies (`<slug>/index.html`, never reserved folders) - never `functions/**`, `.github/**`, `admin/**`, `assets/engine/**`, `urd.json` or `_headers`. A hijacked editor session therefore cannot plant code.
3. **Conflict guard in two layers:** the editor compares against the baseline SHA (`latest?base=`) and warns on overlapping files; the commit endpoint additionally rejects with 409 if HEAD has moved since the check (optional `expect` in the request). Without `expect` (older clients, direct API use) the server-side guard does not exist.

Configuration is six environment variables at the host: `GITHUB_REPO`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GITHUB_BRANCH`, `GITHUB_SCOPE`, `ALLOWED_LOGINS`.

## Repo layout: monorepo with `template/`

```
Urd/
├── docs/          documentation (this folder)
├── schema/        machine-readable data model contract (JSON Schema)
├── editor/        Svelte source code - does NOT ship with cloned sites
└── template/      THE SITE. Deployed as the Pages root; this is what associations clone.
```

In early development the schema, engine and editor change in the same commit, and the built editor in `template/admin/assets/` must always match the engine from the same commit - hence one repo for now ([ADR-0004](adr/0004-monorepo-with-template-folder.md)). At every release the release Action (`.github/workflows/release.yml`) syncs the contents of `template/` to the clean `urd-template` repo («Use this template») as one squashed commit, tagged with the version.

## Engine versioning (ADR-0013)

The engine lives in a versioned folder, `template/assets/engine/<version>/`, where the folder name is always equal to the `engine` field in urd.json (test-enforced). This makes the whole import graph addressable per version (relative ES imports inherit no `?v=` query), so the template's `_headers` can give `/assets/engine/*` immutable caching with a version-neutral rule that never needs changing. The monorepo's `template/_headers` revalidates the engine instead (`no-cache`), since its files change between releases under the same folder, and the release sync writes the template's rule (`scripts/release-headers.mjs`, ADR-0013 addendum). The stable plugin API lives in `template/assets/urd/`: shell modules (i18n, hint, dropdown and others) that re-export from the current version and are revalidated normally - plugins never hard-code the versioned path. Any mechanism that switches the engine version (phase releases, the updater) writes the root index.html and all `<slug>/index.html` copies in the same commit (the copy-refresh duty).

## The update mechanism (ADR-0014)

`template/urd.json` is the manifest: engine version + the ownership map (`ownedPaths` for Urd-owned paths, `userPaths` for `content/**`, `media/**`, `plugins/**`). The Updates panel in admin checks against the `urd-template` repo via `/api/github/update`: the user's git tree is compared with the template's tree at the BASELINE (the tag `v<engine>` for the version the site is running) and at the target version, using pure blob-SHA comparisons - an equal SHA is identical content, so «hand-edited» is decided without loading a single file. Execution writes the Urd-owned files as ONE atomic commit (inline trees, expect guard): the engine atom group is always switched as a whole, optional files (functions, loose root files) can be held back per file, `_headers` is never written (a diff instruction instead, cf. ADR-0006), and user-owned paths are never touched. Content written on an old schema is lifted by the migration contract at load time; that is the whole point of it.

## Inheritance from ApeironLF - what is fixed by design

| Weakness in ApeironLF | The Urd solution |
|---|---|
| Ad-hoc `normalize()` without formal versioning | `version` + stepwise `migrations` on all types; `schemaVersion` at file level |
| Sitemap, nav and panel list hard-coded in three places | One page registry in `site.json`; everything is derived |
| Theme tokens exist as CSS variables but cannot be edited | Tokens are data in `site.json`; admin gets a token panel (v0.5) |
| No setup wizard on cloning | Wizard in admin on first visit (v0.5) |
| Section types are code paths | Sections are generic containers; types are data presets |
