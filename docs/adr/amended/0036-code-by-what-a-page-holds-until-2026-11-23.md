# ADR-0036: Code by what a page holds

Date: 21 November 2026
Status: Accepted. Decided while building BACKLOG 0.7.37.3.4 on 21 November 2026, from finding V1 of the audit of 20 November 2026. It rewrites a consequence of [ADR-0013](../0013-immutable-engine-versioning.md), whose deferral of per-page loading it takes up.

## Context

The engine defined every block and background type as it booted, so the static import closure of `boot.js` held the modules of all 27 block types and 8 background types and the section templates, and every HTML shell preloaded them: 78 modules, about 410 KB of compressed JavaScript, on every page. A page uses a few of those types.

ADR-0013 deferred loading by page, since a shell that differs from page to page breaks two of its rules: the one preload list a test holds equal to the closure, and the copies of `index.html` that must stay byte-identical to the root. A list of a page's modules written into its shell at publishing ([comparison/CODE.md](../../comparison/CODE.md#part-6-what-to-take) T34) belongs to the v0.8 baking, which writes pages at publishing anyway.

## Decisions

1. **A page loads the modules of the types it holds.** The engine's block and background types are listed with the module that defines each, as a loader that imports it (`core-types.js`). Before the nav, the page and the footer are drawn, the boot reads the types they hold and loads those modules together, and a newer page file drawn in place does the same.

2. **The shells stay one.** The modules are imported as the boot runs, from the engine's own folder, so no shell names a page's modules: the preload list stays the closure of `boot.js`, the copies stay byte-identical, and the versioned folder and its caching stand as ADR-0013 sets them.

3. **The engine's ids are its own from the start.** Every core id is held as the engine's in the registries before any module defines it, and only the engine defines it. A plugin is refused one whether it registers before or after the module is in, through the staging layer or directly, as it was when the engine defined every type at boot, and a page that uses only core types never waits for the plugins.

4. **The editor's preview loads every type.** The editor offers them all, so the preview loads every core module and the section templates as it boots, before it tells the editor it is ready.

5. **A module that fails is an unknown type.** Its blocks are drawn as the engine draws a type it does not know ([ADR-0005](../0005-versioning-and-migration.md)), and the rest of the page as usual.

6. **An old id loads the type it stands for.** A page holding `kalender`, `kart` or `skjema` loads the calendar, the map or the form ([ADR-0021](../0021-english-code-text-and-contract-identifiers.md)), and a plugin that still defines such an old id keeps winning for its own data, since an old id is no core id.

## Consequences

- A page's block modules are asked for once its page file is read, a round trip after the boot's own modules, where they came in the first wave before. The bytes saved outweigh that round trip: measured on the template's pages as a phone slowed four times, 21 November 2026, they fetch 23 to 39 % less JavaScript and show their first content 0.1 to 0.2 s sooner, and sooner still on a slow network.
- A new core type is one entry in `core-types.js`; the palette test reads the core types from there.
- A core block that draws with more than its own module (the calendar's parser, design model, stylesheet and renderers) is readied beside the page's types, and the page waits for it at most half a second (`CORE_BLOCK_READY` in `core-types.js`), so the block stands in its own design in the page's first frame without holding the page on a slow connection.
- Anything that draws blocks outside a page, its nav and its footer must load their types first (`loadCoreTypes`).
- A plugin cannot count on reading a core type's definition (`get`) when it registers or draws: on a visitor's page the engine defines only the types the page holds, while the editor's preview defines them all.
- An open tab whose engine folder an update has deleted (ADR-0013 decision 5) can no longer load a type it did not hold, nor the basket's drawer: such a type is drawn as unknown, and the basket opens the checkout page.
- The nav's basket loads its drawer from the cart block's module as a nav with a basket is drawn.
- Per-page module lists in the shells, which would let a page's modules come in the first wave, stay with the v0.8 baking, which must keep the copy-refresh duty when it writes them.
