# Developing Urd

**🇬🇧 English** · [🇳🇴 Bokmål](../UTVIKLING.md)

Translation of UTVIKLING.md. Norwegian (bokmål) is canonical and prevails in case of discrepancies.

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
# dev-server.py serves template/ with caching OFF: without it the browser guesses file freshness and the preview's engine files linger even on a hard reload. `cd template && python3 -m http.server` still works, but requires manual cache clearing after engine changes.

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
docs/       Documentation. VISJON (why), ARKITEKTUR (how), SKJEMA (the data contract), VEIKART (phases), BACKLOG (tasks),
            adr/ (decisions with rationale)
schema/     JSON Schema: machine-readable edition of SKJEMA.md
editor/     The Svelte source code for the editor. The only place with npm.
template/   THE WEBSITE. This is what associations clone:
              assets/engine/   handwritten readable engine JS (NEVER compiled)
              admin/assets/    prebuilt editor (committed, from editor/)
              content/         example content (user-owned on cloning)
              functions/       the publishing layer (Cloudflare Pages Functions)
              plugins/         plugin index + example
tests/      node --test tests (for now the migration contract)
```

## Rules that always apply

1. **The four promises in [VISION-en-GB.md](VISION-en-GB.md) are never broken.** If you are in doubt whether a change breaks a promise, raise it before you build.
2. **The engine stays handwritten, readable, dependency-free ES module JS.** No frameworks, no compilation, no npm dependencies in `template/assets/engine/`.
3. **If you change the shape of the props for a block/section/background/animation, you SHALL bump `version` and write a migration** (`migrations[n]` lifts v(n) to v(n+1), pure function, with a test in `tests/`). See [ADR-0005](../adr/0005-versjonering-og-migrering.md).
4. **Schema changes are made in three places in the same commit:** `docs/SKJEMA.md`, `schema/*.schema.json` and the example data in `template/content/`. The examples shall always validate.
5. **Editor changes are built before merge:** `npm run build`, and the updated `template/admin/assets/` is committed together with the source.
6. **Publishing is never allowed to write code.** The path allowlist in `template/functions/_lib/guard.js` (denies `functions/`, `admin/`, `assets/engine/`, and more) is changed only with a very good reason.
7. **Norwegian (bokmål) is canonical in documents and user surfaces; English in code/identifiers** (also in the data contracts: JSON field names, message types and translation keys). Canonical does not mean exclusive: from 0.6.8 the UI texts exist in five languages (ADR-0012) and parts of the documentation are translated under [languages/](.), but the Norwegian text prevails in case of discrepancies. No em dashes in text.

## Common tasks

- **New core block:** create `template/assets/engine/blocks/<name>.js` following the pattern in `text.js` (version, label, defaults, migrations, render), register it in `urd.js` (from v0.2), document the props shape in SKJEMA.md when needed.
- **New background layer:** the same pattern in `template/assets/engine/backgrounds/`.
- **New section preset:** a data factory (`create()` that returns a valid section), no separate code path.
- **Change the data model:** see rules 3 and 4 above.
- **Test the publishing layer locally (from v0.2):** `npx wrangler pages dev template` and set the environment variables from [ADR-0003](../adr/0003-publisering-via-github-oauth-og-pages-functions.md) in a `.dev.vars` file (gitignored).

## Versioning

Urd follows [semantic versioning](https://semver.org/): `MAJOR.MINOR.PATCH`, always three numbers (`0.1.0`, never `0.1`).

- **PATCH** (`0.2.0 → 0.2.1`): bug fixes only, no new functionality.
- **MINOR** (`0.2.1 → 0.3.0`): new functionality. The roadmap phases are minor versions (v0.3 «The canvas» is released as `0.3.0`).
- **MAJOR** (`1.4.2 → 2.0.0`): changes that may require action from those who upgrade. Note: even MAJOR never breaks a built site (promise 2, the migration contract always applies).
- Before `1.0.0` we are in the development phase: `0.x` minors may contain breaking changes.

The source of truth is the `engine` field in `template/urd.json`. The git tag (`v0.2.0`) and the CHANGELOG heading shall always agree with it. `editor/package.json` and plugin manifests are versioned by the same rules (plugins declare engine compatibility via `requiresEngine`).

## Releases (form from v0.2, automated in v0.6)

1. All tests green, example data validates against the schemas.
2. `npm run build` in `editor/`, commit the output.
3. Bump the engine version in `template/urd.json` and update `docs/CHANGELOG.md`.
4. Tag the release (`v0.x.y`).
5. From v0.6: a release Action syncs `template/` to the `urd-template` repo.
