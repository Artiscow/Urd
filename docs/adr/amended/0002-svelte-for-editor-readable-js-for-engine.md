# Amendments to ADR-0002: Svelte for the editor, hand-written readable JS for the engine

The earlier wording of [ADR-0002](../0002-svelte-for-editor-readable-js-for-engine.md), newest first. Each section names an amendment and holds the wording it replaced: the whole ADR as it stood, for the amendments made until 27 November 2026, and the decisions that changed, for those made since.

## Until 2026-11-26

The addendum's comment limit amended 26 November 2026 (a JSDoc tag's words count toward it, its type apart, [ADR-0037](../0037-short-comments.md)).

### ADR-0002: Svelte for the editor, hand-written readable JS for the engine

**Status:** accepted (July 2026)

#### Context

Promise 3 (no build process for the website) and promise 1 (you own everything, readable files) must be balanced against the fact that the editor is a large piece of interactive software (free canvas, drag/resize/snap, layer panels, background editor) that is unreasonably expensive to build without a framework.

#### Decision

**Two worlds, each with its own standard:**

1. **The engine** (`template/assets/engine/`) - everything visitors load - is written as hand-written, dependency-free, readable ES-module JavaScript and is never compiled. The editor's preview iframe loads exactly these files.
2. **The editor** (`editor/`) is written in **Svelte 5 + Vite** and is shipped **pre-built** to `template/admin/assets/` (committed, an exception to the usual dist practice). Cloning associations never touch npm; the build step happens with the Urd developers before release.

Svelte over Preact/React: compiled fine-grained reactivity without VDOM diffing suits drag operations at 60 fps, and the output is small, dependency-free static JS - the right shape for «pre-built files in a repo».

#### Consequences

- Associations get zero toolchain and full /admin editing; the promises hold.
- The editor files in cloned repos are compiled (unreadable) code; the readable source lies open in the main Urd repo.
- Preview fidelity is structural: preview and production are the same files.
- Urd releases must always build the editor and commit the output in the same commit as engine changes (enforced by the monorepo, see [ADR-0004](../0004-monorepo-with-template-folder.md)).

#### Addendum, 23 November 2026: the reasoning beside the code

The engine modules a visitor's page loads say what their code does in comments of at most 160 characters of prose, their JSDoc tags whole, and the reasoning behind them stands in `docs/engine-notes/<module>.md` under the name it explains; base.css's stands in `docs/STYLES.md`. The files served are still the files written, never compiled, minified or stripped, and a module's header names its notes. Comments were 49 % of the 217 KB of compressed JavaScript every page loaded (23 November 2026). The notes live in the Urd repository and are not synced to the template repository, as the editor's readable source is not.
