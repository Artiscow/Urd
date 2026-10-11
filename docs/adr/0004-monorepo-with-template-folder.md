# ADR-0004: Monorepo with a template folder, and a template repo synced from it

**Status:** accepted (July 2026); the decision on the split amended August 2026 (the split carried out at the 0.6 phase release), earlier text in [amended/](amended/0004-monorepo-with-template-folder-until-2026-10-11.md). How a release is run is described in [DEVELOPMENT-en-GB.md](../languages/DEVELOPMENT-en-GB.md#releases-automated-from-069).

## Context

Urd consists of three parts that must keep in step: the data model contract (`schema/`), the engine (`template/assets/engine/`) and the editor (`editor/` → built to `template/admin/assets/`). At the same time, end users must be able to clone «just the website».

## Decision

**One repo for development.** A schema change alters all three parts in the same commit, and the built editor must always match the engine from the same commit. Two repos would have given cross-version pinning and broken intermediate states.

`template/` is the website: deployed by pointing the host's root folder at it. **A release syncs `template/` to a clean `urd-template` repo** (clean history, no editor source or docs) with a «Use this template» button; the split was carried out at the 0.6 phase release (0.6.9). Users are born from `urd-template` and never clone the monorepo; the monorepo's `template/content/` is curated example content that is seeded into the template. The release tag in the template repo is the updater's checksum baseline and is never moved.

**Updates** are governed by `template/urd.json`: the engine version and the ownership map of Urd-owned and user-owned paths. The update mechanism is ADR-0014.

## Consequences

- Atomic changes across schema/engine/editor; one clone, one PR.
- The monorepo remains the place of development; the template repo is a release product and is never edited directly.
- Sites other than the template itself, demo sites included, are created from the template like any user's site, so their publishing never writes into the example content new users get.
