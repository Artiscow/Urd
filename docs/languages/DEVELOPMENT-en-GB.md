# Developing Urd

**🇬🇧 English** · [🇳🇴 Bokmål](../UTVIKLING.md)

The canonical text (ADR-0022): on a discrepancy this English text applies. The Norwegian (bokmål) version is [UTVIKLING.md](../UTVIKLING.md), and a change is made in both.

This document is for those of us who develop Urd itself. (Associations that *use* Urd never need any of this; they clone the template and edit via /admin.)

The running task list is in [BACKLOG.md](../BACKLOG.md) (in Norwegian). The phases and goals are in [ROADMAP-en-GB.md](ROADMAP-en-GB.md). If you want to contribute changes from the outside (the fork/PR flow), see [CONTRIBUTING.md](../../CONTRIBUTING.md) (in Norwegian).

## What you need

| Tool | What for | Required? |
|---|---|---|
| Git | Everything | Yes |
| A text editor | Everything | Yes |
| Node.js 18+ (with npm) | Editor development (Svelte/Vite) and tests | Only for editor/tests |
| Python 3 (or another static file server) | Viewing the website locally | Optional |
| Wrangler (`npx wrangler`) | Testing the publishing functions locally | From v0.2 |

Node is the only thing that does not come with the repo. Everything else in the way of source code and prebuilt files lies in git.

## Getting started on a new machine

```bash
git clone https://github.com/<owner>/Urd.git
cd Urd

# View the website locally (no Node needed):
python3 dev-server.py 8000
# open http://localhost:8000/admin
# dev-server.py serves template/ with caching OFF: without it the browser guesses file freshness and the preview's engine files linger even on a hard reload. The server itself is template/dev-server.py, which every site gets with the template (run from the site's folder there); the root file starts it. A plain `python3 -m http.server` keeps old engine files until the browser's cache is emptied.

# Editor development (requires Node):
cd editor
npm install          # recreates node_modules from package.json
npm run dev          # development server with hot reload
npm run build        # compiles to ../template/admin/assets/

# Tests and schema validation:
node --test tests/*.mjs
cd editor && npm run validate
```

CI (`.github/workflows/tests.yml`) runs the same on every push and PR,
plus the editor build. CodeQL, Dependabot and dependency review guard
security and dependencies.

The first `npm install` creates `package-lock.json`; it is to be committed, so that all machines get identical dependency versions.

## Repo map

```
docs/       Documentation. VISJON (why), ARCHITECTURE (how), SCHEMA (the data contract), VEIKART (phases), BACKLOG (tasks),
            adr/ (decisions with rationale)
schema/     JSON Schema: machine-readable edition of SCHEMA.md
editor/     The Svelte source code for the editor. The only place with npm.
template/   THE WEBSITE. Synced to the urd-template repo at releases («Use this template»):
              assets/engine/<version>/   handwritten readable engine JS (NEVER compiled; versioned directory, ADR-0013)
              assets/urd/      stable plugin API shells (re-exports against the current engine version)
              admin/assets/    prebuilt editor (committed, from editor/)
              content/         example content (user-owned on cloning)
              functions/       the publishing layer (Cloudflare Pages Functions)
              plugins/         plugin index + example
tests/      node --test tests (for now the migration contract)
```

## Rules that always apply

1. **The four promises in [VISION-en-GB.md](VISION-en-GB.md) are never broken.** If you are in doubt whether a change breaks a promise, raise it before you build.
2. **The engine stays handwritten, readable, dependency-free ES module JS.** No frameworks, no compilation, no npm dependencies in `template/assets/engine/`.
3. **If you change the shape of the props for a block/section/background/animation, you SHALL bump `version` and write a migration** (`migrations[n]` lifts v(n) to v(n+1), pure function, with a test in `tests/`). See [ADR-0005](../adr/0005-versioning-and-migration.md).
4. **Schema changes are made in three places in the same commit:** `docs/SCHEMA.md`, `schema/*.schema.json` and the example data in `template/content/`. The examples shall always validate.
5. **Editor changes are built before merge:** `npm run build`, and the updated `template/admin/assets/` is committed together with the source.
6. **Publishing is never allowed to write code.** The path allowlist in `template/functions/_lib/guard.js` (denies `functions/`, `admin/`, `assets/engine/`, `assets/urd/`, and more) is changed only with a very good reason. The updater has the opposite domain (the ownership map, ADR-0014); contract tests keep guard.js and urd.json in sync.
7. **English is the canonical language of Urd, Norwegian (bokmål) the secondary** (decided 11 September 2026, ADR-0022): everything developer-facing is written in English: code, AGENTS.md, the ADRs, the documents under docs/, new entries in CHANGELOG, BACKLOG and TESTRUNDER, and commit messages (older entries stay as written). Documents not yet translated stay in Norwegian until their turn, and the English text applies on discrepancy. Everything a site owner or visitor may read is available in both English and Norwegian: the README, the user guide and the setup guide under docs/languages/, and the UI texts (five languages, ADR-0012, with the bokmål dictionary as the base). No em dashes in text.

8. **The invariants pinned by tests** (the ones a change most easily breaks without noticing): the canvas invariant of ADR-0018 (`.urd-canvas` never has `transform`, `filter`, `perspective`, `backdrop-filter`, `contain`, `container-type` or `will-change`) is a file-invariant test that reads `base.css`; `stackOrder` and `mobilePlacementToCss` in the engine are pure and tested without a DOM; the parity test `tests/i18n.test.mjs` finds the locale directories (the engine's `locales/site/` and `locales/admin/` and every `plugins/<id>/locales/`) by itself, so a new locale set or language pack needs no registration; the compatibility surface for plugin copies (the aliases, the section's plain inline min-height, content geometry, the old config panel classes) is documented in SCHEMA.md and pinned by `tests/plugin-compat.test.mjs`; the MCP protocol version is one pinned constant in `template/mcp/` with its own test and a dated comment naming the specification revision, and `.mcp.json` is classified EXPLICITLY as an exact path in `ownedPaths` and `OWNED_PATTERNS`, since the completeness test in `tests/guard.test.mjs` filters out dotfiles and an unclassified `.mcp.json` would leave a hole no test reports (`isAllowedPath` rejects both `mcp/**` and `.mcp.json`). The MCP tests live in `tests/mcp-*.test.mjs`: the dispatcher as a pure function against fixture messages, the tools against a temporary site root under `os.tmpdir()` (never against real content), the invariant tests (no npm import, no `fetch` / `node:http` / `node:child_process`, no import of `mcp/` from outside, the block types derived from the `blocks/` folder equal to the `define` calls in `urd.js`), the path guard tested against `..`, absolute paths and dotfiles, plus one integration test that spawns the server and does `initialize` and `tools/list` over pipes; schema parity against `schema/` sits in `editor/scripts/validate.mjs`, since ajv lives in `editor/node_modules`, and CI runs `npm run validate`.
9. **The Norwegian audit** (ADR-0021) is run in three layers, since an æøå grep alone misses Norwegian written without æøå: (1) æøå, (2) Norwegian stop words without æøå, (3) ASCII-fied Norwegian (sok, naar, paa, forst, rekkefolge). It is clean when nothing is found outside the permitted places (the language dictionaries, untranslated documents and log entries, site content and deliberately Norwegian test data). The æøå remainders allowed in code, each with its reason: the language names «bokmål»/«Bokmål» as a technical term in English comments (i18n.js, App.svelte) and the endonym 'Norsk bokmål' in the language list; the currency unit «øre» in vipps.js (the unit the Vipps API takes); the slugify literals and the deliberate æøå example in imageTools.js; the V1_REASONS key 'seksjonshøyde' in migrate.js (migration data); the regex matching Norwegian sign-up words in the calendar's ics.js (it reads Norwegian user content); the Norwegian `names` values in the lang-sv manifest (translation data); the currency default `'kr'` in the shop blocks and the presets (user data the site owner sets); and the example string «om 3 døgn» in the relativeDays comment in i18n.js. A plugin manifest's `name` field is the English fallback, while `names.nb` carries the Norwegian text.

## Common tasks

- **New core block:** create `template/assets/engine/blocks/<name>.js` following the pattern in `text.js` (version, label, defaults, migrations, render), register it in `urd.js` (from v0.2), document the props shape in SCHEMA.md when needed.
- **New background layer:** the same pattern in `template/assets/engine/backgrounds/`.
- **New section preset:** a data factory (`create()` that returns a valid section), no separate code path.
- **Change the data model:** see rules 3 and 4 above.
- **Configure the payment layer (ADR-0020):** Cloudflare secrets, never repo data: `VIPPS_CLIENT_ID`, `VIPPS_CLIENT_SECRET`, `VIPPS_SUBSCRIPTION_KEY`, `VIPPS_MSN`, the optional `VIPPS_API_BASE` (the test environment is `https://apitest.vipps.no`) and the optional `VIPPS_WEBHOOK_SECRET` (the secret a webhook registration answers with; without it `/api/pay/vipps/webhook` takes nothing). Without the four the checkout function responds 503 with the error code `vippsNotConfigured`; the button in the checkout block shows a calm unavailable text, and the form checkout works unchanged. Stripe (ADR-0028) takes `STRIPE_SECRET_KEY` and the optional `STRIPE_WEBHOOK_SECRET` (the event destination's signing secret); without the key its endpoints answer 503 with `payNotConfigured`, and the shared error codes `payUnreachable`, `payUpstreamStatus` and `payUnexpected` carry the provider's name. PayPal (ADR-0028) takes `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET`, the optional `PAYPAL_WEBHOOK_ID` (the webhook's id in the PayPal app) and the optional `PAYPAL_API_BASE` (the sandbox is `https://api-m.sandbox.paypal.com`); a shop currency PayPal cannot take answers 400 with `payCurrency`. The setup guide walks a site owner through the keys and a test payment per provider ([SETUP-en-GB.md](setup-publication/SETUP-en-GB.md)).
- **Test the publishing layer locally (from v0.2):** `npx wrangler pages dev template` and set the environment variables from [ADR-0003](../adr/0003-publishing-via-github-oauth-and-pages-functions.md) in a `.dev.vars` file (gitignored). Wrangler applies `_headers`, so the engine files are revalidated there as on the test site.

## Versioning

Urd's versions build on [semantic versioning](https://semver.org/): `MAJOR.MINOR.PATCH`, always at least three numbers (`0.1.0`, never `0.1`), and a release may carry more after them, typically three to six in all. Anything with a letter or a suffix (`0.7.6b`, `0.7.6-rc.1`) is not a version, and the updater never offers such a tag.

- **PATCH** (`0.2.0 → 0.2.1`): bug fixes only, no new functionality.
- **More numbers** (`0.7.6 → 0.7.6.1 → 0.7.6.1.1`): a release between two patch numbers. Versions are compared number by number, a missing number counting as 0, so `0.7.6 < 0.7.6.1 < 0.7.6.1.1 < 0.7.6.2 < 0.7.7`. No number has a leading zero, and the last one after the third is never 0 (`0.7.6.0` would rank equal to `0.7.6`).
- **MINOR** (`0.2.1 → 0.3.0`): new functionality. The roadmap phases are minor versions, and the releases in a phase carry the phase's minor with a running patch number (0.7.1, 0.7.2 ...), independent of the milestone numbers in the backlog; the phase release at the gate is the last of them (decided 15 September 2026).
- **MAJOR** (`1.4.2 → 2.0.0`): changes that may require action from those who upgrade. Note: even MAJOR never breaks a built site (promise 2, the migration contract always applies).
- Before `1.0.0` we are in the development phase: `0.x` minors may contain breaking changes.

The source of truth is the `engine` field in `template/urd.json`. The git tag (`v0.2.0`) and the CHANGELOG heading shall always agree with it. `editor/package.json` carries the engine's version. A plugin's own `version` keeps three numbers (the manifest schema), and its `requiresEngine` may name a version with more, which engines from 0.7.7 read; an older engine skips such a plugin.

## Releases (automated from 0.6.9)

1. All tests green, example data validates against the schemas.
2. Bump the engine version: set `engine` in `template/urd.json`, `git mv` the engine directory to `template/assets/engine/<new version>/`, and update the re-export targets in the `template/assets/urd/` shells plus the references in the HTML shells (the root and the slug copies). The tests, the editor build and the validation read the directory name from urd.json and follow by themselves (`tests/_engine.mjs` resolves engine modules from it, the vite alias `$engine` in `editor/vite.config.js` points at it, and `editor/scripts/validate.mjs` reads it; ADR-0013). The modulepreload test fails on anything left behind: it requires that the directory named in urd.json exists and is the only one under `assets/engine/`, that every HTML shell references it, that the re-export targets in the `assets/urd/` shells match, and that the slug copies are byte-identical to the root index.html. The editor bundle bundles engine modules (the bundler's source comments carry the versioned path), so an engine bump always needs a rebuilt and committed bundle (step 3).
3. `npm run build` in `editor/`, commit the output (the bundle carries the engine path).
4. Update `docs/CHANGELOG.md` (the release heading `## [x.y.z] - date`) and `editor/package.json` to the same version.
5. Tag the release (`v0.x.y`) and publish a GitHub release on the tag.
6. The release Action (`.github/workflows/release.yml`) then runs by itself: it validates the version consistency (`scripts/check-release.mjs`: engine == tag == CHANGELOG heading == package.json), runs the tests, and syncs the content of `template/` to the `urd-template` repo as ONE squashed commit («Urd v0.x.y») with the same tag. In the copy, `scripts/release-headers.mjs` swaps the engine rule of `_headers` to the template's (cached forever): the monorepo's own rule revalidates the engine, whose files change between releases under the same directory (ADR-0013 decision 2); the monorepo's `template/_headers` carries `Cache-Control: no-cache` for `/assets/engine/*`, so the test site and a local `wrangler pages dev` revalidate the engine, and `dev-server.py` never caches. The swap runs after the copy of `template/` and before the commit, and stops the run unless the copy's engine rule is the immutable one. A manual run of the Action is started with the workflow from `main`; `check-release.mjs` accepts only the workflow of `main` or of the synced tag, since an older workflow would skip the swap. `tests/release-headers.test.mjs` pins the script's result to the template's released blob, because the updater shows a «change by hand» note when a site's `_headers` differs from the template's at the target version, so a change of the template's text reaches every site that never edited the file. The tag in the template repo is the updater's checksum baseline and is never moved.

Prerequisites (a one-time setup, done BEFORE the first release; until then neither the template repo nor the «Use this template» button exists, and the links to `urd-template` in the documentation give 404):

1. Create the public repo `urd-template` on GitHub (**New repository**). Tick «Add a README file» so the main branch exists from the start (the release Action pushes to an existing branch; the first sync replaces all the content anyway).
2. Create the token: your GitHub profile → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**, with Repository access = «Only select repositories» → `urd-template`, and Permissions → Contents = Read and write. Copy the token string (it is shown once only).
3. Add the token as a secret IN THE MONOREPO (the repo `Urd`, where the release workflow runs, NOT in the template repo, which needs no secrets): `Urd` → **Settings → Secrets and variables → Actions → New repository secret**, Name `URD_TEMPLATE_PAT`, Secret = the token string. The name stands in the workflow and the documentation; the string itself must never go into any file.
4. Run the first sync (publish a release, or a manual prerelease dispatch of the Release workflow).
5. Mark the repo as a template: **Settings → General → tick «Template repository»**. Only THEN does the «Use this template» button show on the repo's front page (the button is a property of a repo marked as a template, never of a folder). Set the GitHub topic `urd-template` at the same time (decided 5 August 2026: English is the standard for topics).

Plugins are shared with the topic `urd-plugin`.

**Prerelease sync (rc):** to test the updater end to end before a release, the Action can be run by hand (`workflow_dispatch`) against an rc tag with the prerelease flag set; the CHANGELOG and package.json checks are then skipped. Use a version number of its own for the rc (the engine field takes numbers only, so suffixes like `-rc.1` cannot stand there).
