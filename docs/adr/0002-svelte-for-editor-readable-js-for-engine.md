# ADR-0002: Svelte for the editor, hand-written readable JS for the engine

**Status:** accepted (July 2026)

## Context

Promise 3 (no build process for the website) and promise 1 (you own everything, readable files) must be balanced against the fact that the editor is a large piece of interactive software (free canvas, drag/resize/snap, layer panels, background editor) that is unreasonably expensive to build without a framework.

## Decision

**Two worlds, each with its own standard:**

1. **The engine** (`template/assets/engine/`) - everything visitors load - is written as hand-written, dependency-free, readable ES-module JavaScript and is never compiled. The editor's preview iframe loads exactly these files.
2. **The editor** (`editor/`) is written in **Svelte 5 + Vite** and is shipped **pre-built** to `template/admin/assets/` (committed, an exception to the usual dist practice). Cloning associations never touch npm; the build step happens with the Urd developers before release.

Svelte over Preact/React: compiled fine-grained reactivity without VDOM diffing suits drag operations at 60 fps, and the output is small, dependency-free static JS - the right shape for «pre-built files in a repo».

## Consequences

- Associations get zero toolchain and full /admin editing; the promises hold.
- The editor files in cloned repos are compiled (unreadable) code; the readable source lies open in the main Urd repo.
- Preview fidelity is structural: preview and production are the same files.
- Urd releases must always build the editor and commit the output in the same commit as engine changes (enforced by the monorepo, see [ADR-0004](0004-monorepo-with-template-folder.md)).
