# ADR-0036: Code by what a page holds

Date: 21 November 2026
Status: Accepted. Decided while building BACKLOG 0.7.37.3.4 on 21 November 2026, from finding V1 of the audit of 20 November 2026. It rewrites a consequence of [ADR-0013](0013-immutable-engine-versioning.md), whose deferral of per-page loading it takes up. Amended 23 November 2026 (0.7.37.3.16): a type's own CSS loads with its module (decision 7), earlier text in [amended/](amended/0036-code-by-what-a-page-holds-until-2026-11-23.md). Amended again 23 November 2026 (0.7.38.1): the boot's features load by what the site and page hold (decision 8), earlier text in [amended/](amended/0036-code-by-what-a-page-holds-until-2026-11-23-2.md). Amended a third time 23 November 2026 (0.7.38.2.1): a design's code and CSS load with the design (decision 9, and decision 7's exception for it), earlier text in [amended/](amended/0036-code-by-what-a-page-holds-until-2026-11-23-3.md).

## Context

The engine defined every block and background type as it booted, so the static import closure of `boot.js` held the modules of all 27 block types and 8 background types and the section templates, and every HTML shell preloaded them: 78 modules, about 410 KB of compressed JavaScript, on every page. A page uses a few of those types.

ADR-0013 deferred loading by page, since a shell that differs from page to page breaks two of its rules: the one preload list a test holds equal to the closure, and the copies of `index.html` that must stay byte-identical to the root. A list of a page's modules written into its shell at publishing ([comparison/CODE.md](../comparison/CODE.md#part-6-what-to-take) T34) belongs to the v0.8 baking, which writes pages at publishing anyway.

## Decisions

1. **A page loads the modules of the types it holds.** The engine's block and background types are listed with the module that defines each, as a loader that imports it (`core-types.js`). Before the nav, the page and the footer are drawn, the boot reads the types they hold and loads those modules together, and a newer page file drawn in place does the same.

2. **The shells stay one.** The modules are imported as the boot runs, from the engine's own folder, so no shell names a page's modules: the preload list stays the closure of `boot.js`, the copies stay byte-identical, and the versioned folder and its caching stand as ADR-0013 sets them.

3. **The engine's ids are its own from the start.** Every core id is held as the engine's in the registries before any module defines it, and only the engine defines it. A plugin is refused one whether it registers before or after the module is in, through the staging layer or directly, as it was when the engine defined every type at boot, and a page that uses only core types never waits for the plugins.

4. **The editor's preview loads every type.** The editor offers them all, so the preview loads every core module and the section templates as it boots, before it tells the editor it is ready.

5. **A module that fails is an unknown type.** Its blocks are drawn as the engine draws a type it does not know ([ADR-0005](0005-versioning-and-migration.md)), and the rest of the page as usual.

6. **An old id loads the type it stands for.** A page holding `kalender`, `kart` or `skjema` loads the calendar, the map or the form ([ADR-0021](0021-english-code-text-and-contract-identifiers.md)), and a plugin that still defines such an old id keeps winning for its own data, since an old id is no core id.

7. **A type's own CSS loads with its module.** A block module's own rules stand in a sheet beside it (`blocks/<name>.css`), and a type's loader asks for the sheets of the block modules it draws with in the same wave as the modules, so the page is drawn with them in place; a sheet that serves only designs a block may not draw comes with those designs instead (decision 9). The sheets stand after base.css in the order their rules stood there, whatever order they come in, and a rule stays in base.css where its move would change which of two rules that could set the same property on the same element wins. base.css keeps what every page draws, the rules several types share, and the block rules kept there for their order.

8. **The boot's features load by what the site and page hold.** The features the boot drew on every page whether it held them or not (the basket in the menu, contact details, the footer, the back-to-top button, pinned blocks, animations, section dividers and the collection drafts) are listed with the modules they draw with in `features.js`, as the types are in `core-types.js`. Those the site holds are asked for as site.json is read, beside the page file, and those the page holds with its types, so no feature adds a wait of its own; the boot imports none of them, and the code that draws a page reads a feature as it draws. A feature that is not held, or whose module fails to load, is drawn as if it were not set ([ADR-0011](0011-native-css-first.md)). The core animations' ids are the engine's from the start, as decision 3 holds the types'; the preview loads every feature, as decision 4 loads every type; and a feature's own rules stand in a sheet beside it by decision 7, placed after base.css and before the block sheets, so their order against both stays as it stood in base.css.

9. **A design's code and CSS load with the design.** Where a block type's module or sheet serves designs a block may not draw (the calendar's design families, the text block's document designs), the design's code and sheet are readied before the page is drawn for the blocks that draw it (`CORE_BLOCK_READY`), so a page loads only the designs it holds and draws them in its first frame. A design that comes later than the page waits for stands in its plain or loading state until it is in, and the preview loads the designs it offers with every type. An engine sheet a design draws with (the documents') stands with the features' after base.css and before the block sheets, in the order its rules stood there.

## Consequences

- A page's block modules are asked for once its page file is read, a round trip after the boot's own modules, where they came in the first wave before. The bytes saved outweigh that round trip: measured on the template's pages as a phone slowed four times, 21 November 2026, they fetch 23 to 39 % less JavaScript and show their first content 0.1 to 0.2 s sooner, and sooner still on a slow network.
- A new core type is one entry in `core-types.js`; the palette test reads the core types from there.
- A core block that draws with more than its own module (the calendar's parser, design model, stylesheet and renderers) is readied beside the page's types, and the page waits for it at most half a second (`CORE_BLOCK_READY` in `core-types.js`), so the block stands in its own design in the page's first frame without holding the page on a slow connection.
- Anything that draws blocks outside a page, its nav and its footer must load their types first (`loadCoreTypes`).
- A plugin cannot count on reading a core type's definition (`get`) when it registers or draws: on a visitor's page the engine defines only the types the page holds, while the editor's preview defines them all.
- A page loads the CSS of the types it holds alone: base.css went from 32.3 to 22.3 KB compressed, each type's sheet coming with its module. The block sheets are cached as the engine is and need no stamp; base.css keeps its stamp.
- A plugin block that drew with a core type's classes finds their rules only on a page that holds that type, or in the editor's preview, which loads every type; it carries the rules it needs in its own sheet.
- An open tab whose engine folder an update has deleted (ADR-0013 decision 5) can no longer load a type it did not hold, nor the basket's drawer: such a type is drawn as unknown, and the basket opens the checkout page.
- The nav's basket loads its drawer from the cart block's module, with its sheet, as a nav with a basket is drawn.
- A page that holds none of the boot's features loads none of their modules: the boot's static closure, which every shell preloads, went from 34 modules and 183 KB of compressed JavaScript to 22 modules and 126 KB. A new boot feature is one entry in `features.js`. The footer's, the back-to-top button's and the menu basket's own rules left base.css for sheets of their own, which went from 21.6 to 18.3 KB compressed (gzip -9, 23 November 2026); the animations' rules stay there, since a reduced-motion rule after them must keep its last word.
- A module the editor bundles never imports `features.js`, since its loaders would then be bundled into the admin: the footer's contact column and legal line and the head's organisation data take the contact model as an argument, and the back-to-top button's own shape the shape model, which the boot passes from the loaded feature and the editor from its own import.
- An open tab whose engine folder an update has deleted can no longer load a feature it did not hold: the page draws without it, as without a feature that is not set.
- Per-page module lists in the shells, which would let a page's modules come in the first wave, stay with the v0.8 baking, which must keep the copy-refresh duty when it writes them.

## Addendum

23 November 2026 (0.7.38.2.4): the menu's link launcher is one of decision 8's features, its code and sheet (`nav-launcher.js`, `nav-launcher.css`) loaded where the site shows it.
