# ADR-0014: The updater model v1 - blob-SHA checksum against the baseline tag

Date: 5 August 2026. Status: accepted (v0.6, milestone 0.6.9); decision 6 amended 17 October 2026 (files that cannot travel inline are copied as blobs over as many calls as the cap needs, the commit still one), earlier text in [amended/](amended/0014-updater-model-until-2026-10-17.md). How the endpoint and the commit are built is described in [ARCHITECTURE.md](../ARCHITECTURE.md#the-update-mechanism-adr-0014).

## Context

Promise 2 requires that a cloned site can upgrade Urd safely. The site is born from `urd-template` («Use this template», no shared git history), may be hand-edited, and publishing has a strict path allowlist that must NEVER write code (ADR-0003). The visitors' CSP has `connect-src 'self'`, so admin cannot talk to GitHub directly, and Cloudflare Pages Functions has a subrequest cap (50 on the free plan) that a naive one-blob-per-file commit of ~90 Urd-owned files would have blown through. None of the surveyed builders solve «update the template after the user has edited it» (they own the runtime themselves), so the model is original architecture.

## Decision

1. **A separate endpoint with an inverse guard.** The updater is its own endpoint with the same publisher prologue as publishing, and the guard carries the ownership map that mirrors urd.json: publishing and the updater write disjoint sets of paths, with the slug copies as the only deliberate overlap (the copy-refresh duty, ADR-0013). Every actual file in the template has exactly one ownership class.
2. **Checksum = git blob SHAs, baseline = the tag `v<engine>`.** The user's tree is compared with the template repo's tree at the baseline tag and at the target version (three `git/trees?recursive=1` calls, no content download). The `engine` field in the user's urd.json IS the baseline pointer; the release Action tags the template repo with exactly `v<engine>` per release and never moves a tag. Equal SHA = identical content, so «hand-edited» is decided exactly and cheaply; a separate checksum manifest would have been a second source of truth that could drift.
3. **The plan is a pure function.** `planUpdate(baseline, target, user)` in `_lib/update-plan.js`: changed+untouched is written, changed+edited is flagged `edited`, new+existing is flagged `created`, removed upstream is deleted (an edited deletion is flagged), a missing owned file is restored, and files NOT changed upstream are never touched (local changes persist silently - the Publii semantics). User-owned paths and `_headers` are outside the plan by construction. The engine swap (old versioned folder deleted, new one added) falls out of the generic rules without dedicated code.
4. **The engine atom group cannot be split.** `assets/**` + `admin/**` + `index.html` + the slug copies + `urd.json` are swapped together: the HTML shells point to the versioned folder, the admin bundle bundles engine modules, the shells point into the version, the base.css stamp lives in the shells, and `urd.json.engine` is the folder-name invariant itself (which is why urd.json is also in the group). Only `functions/**` and loose root files can be held back per file; POST validates that `skip` never touches the atom group, and the plan is always recomputed server-side (the client only decides on opt-outs).
5. **`_headers` is NEVER written** (continuing ADR-0006): the check delivers the upstream text and deviation flags, admin shows the diff instruction, and the site owner enters changes by hand. That keeps hand-edited CSP entries (plugin hosts) safe forever.
6. **One atomic commit from inline trees, with the blobs copied first.** The perform step builds the Git tree from inline content and commits once, never one blob per file, so the update lands as one commit or not at all. A file that cannot travel inline (binary, or text too long for the inline fetch) is copied from the template repo into the site's repository as a blob of its own, a batch per call so that each call stays under the subrequest cap; the call answers that it should be repeated, and the editor repeats it until a call that finds few enough of them left copies those and commits. A blob is named by its content, so the tree refers to a copied file by the template's own SHA; a blob no commit refers to changes nothing on the site, so an update stopped half way leaves the site as it was, and the next run goes on from what is copied.
7. **Errors are machine-readable error codes,** and the `URD_TEMPLATE_REPO` env (default `Artiscow/urd-template`) makes upstream replaceable for forks.

## Alternatives rejected

- **PR-based updating (the Decap model):** a draft as branch + PR with Cloudflare preview would have given diff review and preview for free, but requires branch/PR orchestration and a completely different UI flow; stands as a possible v2 AFTER v1.0 (the backlog's PR-per-draft item).
- **A separate checksum manifest at release:** redundant when the git blob SHAs already exist in the trees; a manifest could drift from the files.
- **Reusing the commit endpoint:** the allowlist is test-guarded to reject exactly ownedPaths; opening it would have given a hijacked editor session write access to code.

## Consequences

- The updater assumes that `urd-template` is tagged with the user's CURRENT version; a clone older than the first tagged release gets `updateNoBaseline` and must update manually once.
- New Urd-owned paths must go into urd.json + guard.js (the contract test forces it); new top-level files in the template must be classified (the completeness test forces it).
- Local changes in files that upstream did not touch survive any update silently; a warning only happens when upstream AND local have changed the same file.
