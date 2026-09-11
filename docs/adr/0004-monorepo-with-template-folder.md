# ADR-0004: Monorepo with a template folder (v0), template-repo split at v1

**Status:** accepted (July 2026); addendum on the completed split (August 2026)

## Context

Urd consists of three parts that must keep in step: the data model contract (`schema/`), the engine (`template/assets/engine/`) and the editor (`editor/` → built to `template/admin/assets/`). At the same time, end users must be able to clone «just the website».

## Decision

**One repo for now.** In early development a schema change alters all three parts in the same commit, and the built editor must always match the engine from the same commit. Two repos would have given cross-version pinning and broken intermediate states before a product exists.

`template/` is the website: deployed by pointing the host's root folder at it. **At v1** a GitHub Action syncs `template/` to a clean `urd-template` repo (clean history, no editor source/docs) with a «Use this template» button.

**Updates** are governed by `template/urd.json`: engine version + a manifest of Urd-owned paths. The future updater overwrites only manifest paths - never `content/`, `media/`, `plugins/`.

## Consequences

- Atomic changes across schema/engine/editor; one clone, one PR.
- v0 users (developers/pilots) clone all of Urd and point the host at `template/` - a little more friction, acceptable before v1.
- The split Action and the updater are separate deliverables in v0.6.

## Addendum: the split completed (0.6.9, August 2026)

- **The release Action exists** (`.github/workflows/release.yml`): on a GitHub release, the contents of `template/` are synced to the `urd-template` repo as ONE squashed commit («Urd vX.Y.Z») and tagged with the version; the tag is the updater's checksum baseline (ADR-0014) and is never moved. Version consistency (urd.json.engine == tag == CHANGELOG heading == editor/package.json) is guarded by `scripts/check-release.mjs`.
- **The monorepo remains the place of development** (the core decision of this ADR stands): users are born from `urd-template` via «Use this template» and update via the «Updates» panel; the monorepo's `template/content/` is curated example content that is seeded into the template.
- **urdweb (the demo site) is split out as a separate repo created FROM the template** after the phase release, as dogfooding of the split itself: demo publishing then never writes into the example content new users get, and the monorepo noise (development commits in the history panel, truncated warnings on large diffs) disappears by itself.
- **The Updates paragraph above is delivered and refined in ADR-0014**: the manifest in urd.json gained `userPaths` in addition to `ownedPaths`, and «overwrites only manifest paths» became blob-SHA classification with per-file choice and a checksum warning for hand-edited files.
