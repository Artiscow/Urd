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

The engine lives in a versioned folder, `template/assets/engine/<version>/`, where the folder name is always equal to the `engine` field in urd.json (test-enforced). This makes the whole import graph addressable per version (relative ES imports inherit no `?v=` query), so `_headers` can give `/assets/engine/*` immutable caching with a version-neutral rule that never needs changing. The stable plugin API lives in `template/assets/urd/`: shell modules (i18n, hint, dropdown and others) that re-export from the current version and are revalidated normally - plugins never hard-code the versioned path. Any mechanism that switches the engine version (phase releases, the updater) writes the root index.html and all `<slug>/index.html` copies in the same commit (the copy-refresh duty).

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
