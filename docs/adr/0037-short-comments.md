# ADR-0037: Short comments

Date: 26 November 2026
Status: Accepted. Decided on 26 November 2026 for the URGENT item on comments; it widens to all code a site runs the limit [ADR-0002](0002-svelte-for-editor-readable-js-for-engine.md)'s addendum of 23 November 2026 set for the modules a visitor's page loads, whose notes it keeps.

## Context

The modules a visitor's page loads hold their comments to 160 characters of prose, their reasoning in `docs/engine-notes/`, and the stylesheets a page loads carry one-line labels, their reasoning in `docs/STYLES.md`. The rest of the code had no limit. Measured on 26 November 2026:
- **The share of the code that is comments:** a third of the engine's JavaScript, 38 % of the editor's JavaScript and of the Pages Functions, and 22 % of the editor's Svelte.
- **Comments over 160 characters:** about 2,250, among them 458 in the engine's editing layer, 141 in the engine's stylesheets, 635 in the editor's JavaScript, 488 in its Svelte and app.css, and 127 in the functions.
- **History in comments:** about 180 cite a commit or a release.

A long comment explains why the code came to be so, often as the story of a fix. It is as long as the code it stands over, it is not checked when the code changes, and it goes stale.

## Decisions

1. **The scope is all code a site loads or runs for its admin or its visitors:**
   - the engine and its stylesheets;
   - the HTML shells;
   - the editor's source, which is built into the admin;
   - the Pages Functions.

   Tests and release scripts are outside it.
2. **A comment holds at most 160 characters of words.** A file's header and a JSDoc tag's words count; the tag's type does not.
3. **A comment says what the code does, not why it came to be so.** A constraint a change must keep is held by a test, where breaking it fails. A lasting decision is held by an ADR.
4. **No history in a comment:** no commit or release number, no account of where the code came from, and none of the words that tell what was before («no longer», «previously», «used to», «would otherwise»). The sequence of events is CHANGELOG's.
5. **The code a visitor's page loads keeps its longer reasoning outside the code**, as ADR-0002's addendum decided: an engine module's in `docs/engine-notes/<module>.md`, a stylesheet's in `docs/STYLES.md`. Elsewhere the reasoning that does not fit is not kept.
6. **`tests/comments.test.mjs` holds the rule** for the files it names in its scope, which grows by area as the code is brought within the limit, until it holds every file the rule covers. `tests/engine-notes.test.mjs` and `tests/stylesheets.test.mjs` hold the visitor code.

## Consequences

- A comment is short enough to be read with the code and changed with it.
- A reason that guarded a constraint is moved into a test or an ADR line when its comment is cut, so the constraint is still held.
- The editor's bundle carries no comments, so cutting them changes no byte of it; an unchanged build proves the editor's code untouched. For the engine and the functions, `scripts/engine-notes.mjs same` compares the code before and after.
- Reasoning written only in a comment outside the visitor code is gone from the code once cut; what of it matters stands in a test, an ADR or ARCHITECTURE.md.
