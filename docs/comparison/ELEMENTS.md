# Elements: what the builders offer, and how they offer it

This file answers two questions. Part 1 is how features are offered in an editor: the delivery patterns the builders use for insertion, configuration, structure, design, reuse, review and quality, and the keyboard-shortcut sets of 19 builders next to Urd's own. [Part 2](#part-2-the-element-catalogue) is which elements exist across the field: the catalogue, with the builders that have each element, Urd's status and where it goes.

Two neighbouring questions live elsewhere. How each element is built natively (the native element, the gate, the old way it replaces and the bug that goes with it) is in [CODE.md](CODE.md) part 4. Whether Urd has a feature at all, with the full catalogue of editor and design functions, is in [FEATURES.md](FEATURES.md). The source marks, the dates, the builder list and the ID scheme are in [README.md](README.md).

Part 1 was researched on 11 October 2026 from the help centres, shortcut pages and changelogs of 24 builders, the hosted builders' 2025-2026 releases, and the source code of the open-source editors. Some help centres would not load directly (Webflow, Duda, Breakdance, Oxygen, Canva); their pages were read through search-engine extracts and are marked «search extract». Urd's side is counted from the engine (`template/assets/engine/0.7.4/`) and the editor (`editor/src/`) on the same day. Recommendations carry E-IDs and one status word each, and are collected under [Recommendations](#recommendations).

## Part 1. Delivery patterns: how features are offered

Each pattern below has three parts: what it is, who does it well (with sources), and where Urd stands today. A summary table closes the part.

Across the builders' element lists, five models of offering elements recur:

| Model | Who shows it | Source |
|---|---|---|
| A categorised insert panel: drag, click to place, or drag into the navigator | Webflow, Wix, Elementor | [Webflow University](https://university.webflow.com/course-lesson/build-structure-review-elements) (primary), [Wix Studio: adding elements](https://support.wix.com/en/article/studio-editor-adding-elements-4240855) (primary) |
| Keyboard-first insertion: «/» on an empty line, ⌘K by name, typed element trees | Gutenberg, Notion and Ghost («/»); Framer (⌘K); Bricks (Emmet-like trees in the command palette) | [Ghost cards](https://ghost.org/help/cards/) (primary), [Notion](https://www.notion.com/help/writing-and-editing-basics) (primary), [Framer quick insert](https://www.framer.com/updates/quick-insert) (primary, 2022), [Bricks command palette](https://academy.bricksbuilder.io/builder/interface/command-palette/) (primary) |
| Section and pattern libraries above the element level | Framer Sections, Wix Design Kits and Wireframes, Relume, Tailwind Plus | [Framer sections](https://www.framer.com/updates/sections) (primary), [Wix Studio: adding elements](https://support.wix.com/en/article/studio-editor-adding-elements-4240855) (primary), [Relume](https://www.relume.ai/components) (primary), [Tailwind Plus marketing](https://tailwindcss.com/plus/ui-blocks/marketing) (primary) |
| Nested, composable elements instead of monolithic preset widgets | Elementor's atomic Tabs (3.34) and Accordion (4.3), Bricks «(Nestable)» variants, Gutenberg's Accordion heading/item/panel | [Elementor 3.34](https://elementor.com/blog/elementor-334-v4-atomic-tabs-entrance-interactions/) (primary), [Elementor 4.3](https://theplusaddons.com/blog/elementor-4-3-update.md) (secondary), [Bricks builder](https://academy.bricksbuilder.io/builder/) (primary), [WordPress core blocks](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/) (primary) |
| Grouping by purpose rather than by element kind | Shopify Horizon (Content, Media, Products, Promotions); Wix app categories such as Events and Donations | [GemPages on Horizon](https://gempages.net/blogs/shopify/shopify-horizon-themes) (secondary), [Wix Studio: adding elements](https://support.wix.com/en/article/studio-editor-adding-elements-4240855) (primary) |

Urd uses the first three. The fourth belongs to nested-flow builders: Urd's blocks are flat in sections ([ADR-0001](../adr/0001-hybrid-editor-model.md), [ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md)), and its composite blocks (faq, timeline, calendar) carry their parts as items. The fifth is partly there: the block menus nest the variants of one block (the calendar's views, the gallery, the shapes) under one entry, and the section gallery has a category sidebar.

### Insertion

**What it is.** The ways a new element reaches the page. A «+» palette with categories and search is universal. On top of it come slash commands, command palettes that insert as well as navigate, drag with drop indicators, drop into the structure tree, paste that converts foreign content into native blocks, and AI generation as an insertion action. Several parallel paths serve both the beginner and the power user.

**Who does it well**
- **Command palettes have become standard in 2025-2026:**
  - WordPress 7.0 (20 May 2026): a ⌘K/Ctrl+K command palette from anywhere in the admin [wordpress.org/news](https://wordpress.org/news/?p=20583) (primary). 7.1 groups the palette into recent, suggested and matching commands [Roadmap to 7.1](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/) (primary), [command palette docs](https://wordpress.org/documentation/article/site-editor-command-palette/) (primary, 23 Aug 2026). Plugins register their own commands through the Command Palette API.
  - Framer Quick Actions (⌘K): navigates pages, jumps to components, inserts a component by name and publishes [framer.com/updates/quick-actions](https://www.framer.com/updates/quick-actions) (primary).
  - Webflow Quick Find (⌘E or ⌘K): searches, inserts elements, jumps to pages and CMS items, and creates pages [Webflow University](https://university.webflow.com/lesson/keyboard-shortcuts) (primary), [Quick find](https://help.webflow.com/hc/en-us/articles/33961382093587-Quick-find) (primary).
  - Bricks 2.0 (16 Jul 2025): command palette (⌘K) that also inserts element trees [bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-0/) (primary).
  - Divi 5 Command Center (⌘K) with chained commands [help.elegantthemes.com](https://help.elegantthemes.com/en/articles/13741079) (primary). Duda Quick Access (Ctrl+K), Webstudio (⌘K) and Elementor's Finder (Ctrl+E) do the same job (see the shortcut sets below).
- **Slash commands:** «/» changes the block type in WordPress [keyboard shortcuts](https://wordpress.org/documentation/article/keyboard-shortcuts-block-editor/) (primary, 14 Sep 2026); Ghost and Notion open their card and block menus the same way [Ghost cards](https://ghost.org/help/cards/) (primary), [Notion](https://www.notion.com/help/writing-and-editing-basics) (primary).
- **Drag with clear drop indicators:** Webflow draws a two-colour target, orange for the parent and blue for the position [Webflow: Add panel](https://help.webflow.com/hc/en-us/articles/33961270096659-The-Add-panel) (primary). Webstudio's rule is «You can drop anywhere… There will never be an error state», with about 5 px edge detection and a placement line [dnd README](https://github.com/webstudio-is/webstudio/blob/main/packages/design-system/src/components/primitives/dnd/README.md) (code). Craft.js splits each child at its midpoint into before and after [findPosition.ts](https://github.com/prevwong/craft.js/blob/main/packages/core/src/events/findPosition.ts) (code), and Sanity shows a zoomed-out minimap for long drags [visual-editing ui](https://github.com/sanity-io/visual-editing/tree/main/packages/visual-editing/src/ui) (code).
- **Drop into the structure tree:** Webflow, Wix and Elementor accept drags into the navigator ([Webflow University](https://university.webflow.com/course-lesson/build-structure-review-elements) (primary)); GrapesJS runs one sorter for the canvas, the layers panel and the style lists [utils/sorter](https://github.com/GrapesJS/grapesjs/tree/dev/packages/core/src/utils/sorter) (code).
- **Paste that converts:**
  - Bricks 2.3 (18 Mar 2026) pastes HTML and CSS and converts them to native elements, classes and variables [bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-3/) (primary).
  - Webstudio pastes CSS, HTML with CSS, Tailwind HTML, Markdown, Webflow content, SVG and images [Webstudio docs index](https://docs.webstudio.is/llms.txt) (primary).
  - Gutenberg runs pasted content through a chain of small DOM filters (Word lists, Google Docs ids, Slack paragraphs, non-breaking spaces, a Markdown converter) and then through one declarative allowed-HTML schema [paste-handler.ts](https://github.com/WordPress/gutenberg/blob/trunk/packages/blocks/src/api/raw-handling/paste-handler.ts), [phrasing-content.ts](https://github.com/WordPress/gutenberg/blob/trunk/packages/dom/src/phrasing-content.ts) (code).
  - Ghost's editor turns a pasted bare URL into a link, bookmark or embed [KoenigBehaviourPlugin.tsx](https://github.com/TryGhost/Koenig/blob/main/packages/koenig-lexical/src/plugins/KoenigBehaviourPlugin.tsx) (code).
  - Figma Sites copies and pastes with Figma Design, and Tilda takes Figma pastes into the Zero Block [Figma Sites help](https://help.figma.com/hc/en-us/categories/31823555275671-Figma-Sites) (primary), [Tilda newsletter](https://newsletter-en.tilda.cc/december-2025) (primary).
- **AI as an insertion action:** Wix Harmony's «Generate with AI» for sections and its AI element generator [Harmony AI tools](https://support.wix.com/en/article/wix-harmony-editor-about-the-ai-tools) (primary, 27-28 Jan 2026); Duda's AI-generated sections [duda.co/product-updates](https://www.duda.co/product-updates) (primary); Shopify Sidekick generating blocks for any theme [shopify.com/news](https://www.shopify.com/news/winter-26-edition-merchant) (primary); Webflow's AI code components [webflow.com/blog](https://webflow.com/blog/ai-code-components) (primary).

**Urd today.** Three manual paths, each with a search (`palette-search.js`):
- the «Blocks» panel: a click places the block in the middle of the view, in the last clicked section, and the calendar, gallery and shape variants are nested;
- the «+ New block» menu in a section, or at the pointer;
- «/» on the canvas, which opens «+ New block» with the search focused; the arrows walk the menu, and Enter inserts the walked row or the first hit (`preview-edit.js`). Slash inside a text block is not built.

A block is moved between sections by dragging it on the canvas; nothing is dragged in from a panel.

Saved block groups and templates appear in the same menus under «My templates». There is no command palette (E1), no paste conversion (pasted HTML in a text block is only cleaned by the engine's sanitiser, `sanitize.js`, at render; E3), and no AI insertion: AI goes through the local MCP server instead (ADR-0017, E18, E19).

### Configuration surfaces

**What it is.** Three surfaces coexist: a side inspector, a contextual floating toolbar that stays hidden until something is selected, and inline editing on the canvas. Nearly every builder splits the inspector into what an element says and how it looks.

**Who does it well**
- **Content versus style:**
  - WordPress: Settings and Styles in the block sidebar [Styles overview](https://wordpress.org/documentation/article/styles-overview/) (primary, 19 Aug 2026).
  - Elementor: Content, Style and Advanced tabs [developers.elementor.com](https://developers.elementor.com/docs/editor/elementor-tabs/) (primary). The V4 atomic editor has one Style tab where every property can be set per device [Elementor 4.0](https://elementor.com/blog/editor-40-atomic-forms-pro-interactions/) (primary, 15 Apr 2026).
  - Bricks: Content and Style, plus a selector row that chooses between the element's ID and a global class [interface tour](https://academy.bricksbuilder.io/getting-started/interface-tour/) (primary).
  - Webflow: Style, Settings and Interactions tabs on the keys S, D and H [keyboard shortcuts](https://help.webflow.com/hc/en-us/articles/33961359609875) (primary, search extract).
  - Tilda: separate settings (⇧S) and content (⇧C) panels [Tilda cheat sheet](https://blog-en.tilda.cc/tpost/f5romae4h1-tilda-shortcuts-cheat-sheet) (primary, 5 Jun 2025). Webstudio: Style (s) and Settings (d) [Webstudio shortcuts](https://docs.webstudio.is/university/foundations/shortcuts) (primary).
  - GrapesJS: Traits versus the Style Manager [GrapesJS modules](https://grapesjs.com/docs/modules/Blocks.html) (primary).
  - Carrd: Main, Appearance and Settings (earlier maps, no URL).
- **Contextual surfaces for beginners:** Wix Harmony's «dynamic action bar» shows only the tools relevant to the selected element, plus an «Ask AI» entry [introducing Harmony](https://support.wix.com/en/article/introducing-the-wix-harmony-editor) (primary, Jan 2026). Shopify's theme editor has a simplified sidebar with conditional settings and sections collapsed by default [theme editor](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor) (primary). Wix Studio docks an Inspector panel beside the canvas [Wix Studio: Inspector](https://support.wix.com/en/article/studio-editor-using-the-inspector-panel) (primary).
- **Inspector aids:**
  - property search: Bricks (⌘⇧F) and Breakdance (F) [Bricks shortcuts](https://academy.bricksbuilder.io/article/keyboard-shortcuts/) (primary), [Breakdance shortcuts](https://breakdance.com/documentation/builder/workflow/keyboard-shortcuts/) (primary, search extract);
  - pinned control groups, Bricks 2.3 [bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-3/) (primary, 18 Mar 2026);
  - inherited-value indicators: Oxygen 6 shows inherited values as placeholders [oxygenbuilder.com](https://oxygenbuilder.com/oxygen-6-is-now-available/) (primary, 24 Feb 2026), Tilda's Zero Block marks changed against inherited values per breakpoint [help.tilda.cc](https://help.tilda.cc/zero) (primary), and WordPress 7.1 adds inherited-style indicators [Roadmap to 7.1](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/) (primary);
  - movable toolbar and panels with saved workspace profiles, Bricks 2.4 [bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-4/) (primary, 16 Sep 2026); draggable panels and right-click menus, Squarespace Finish Layer [squarespace.com/blog](https://www.squarespace.com/blog/finish-layer-website-design-tools) (primary, 16 Apr 2026).

**Urd today.** The Properties panel and the floating element menu from the gear on a block are drawn by the same snippet ([ADR-0016](../adr/0016-panel-language.md)):
- three areas, Content, Style and Placement, wide as three columns or narrow as three tabs (the admin setting «Element menu» chooses the width);
- collapsible groups that show their value while closed, a quick row of the most used settings, and a search;
- Placement holds the same settings for every block in the same order, and there is no «Advanced» drawer.

Every block has its groups (0.7.20.5), the quick row has pins (0.7.20.3), the menu stands beside the block and is dragged by its head (0.7.20.6), own values are marked with a reset per setting (0.7.20.7), blocks and sections have right-click menus and a style clipboard (0.7.20.8), and 1, 2 and 3 reach the menu's areas (0.7.20.9).

On the canvas, text is edited by clicking and writing. A floating text toolbar appears on a selection, with headings, B/I/U/S, colours, highlight, links (external, internal, mailto), alignment, lists and quote. Explanations live in «?» tooltips and the help chip, never in panel prose ([ADR-0008](../adr/0008-help-chip-rule.md)), and every choice list is a themed dropdown or segment buttons ([ADR-0009](../adr/0009-themed-ui-rule.md)).

### Structure and layers

**What it is.** A tree of the page for selection, reordering, locking, hiding and naming. It is expected once pages stop being trivial. On a free canvas it is also the only reliable way to reach a block that lies under another.

**Who does it well**
- **WordPress List View:** select, multi-select and drag; copy, cut and duplicate; add before or after; add a note; copy and paste styles; group; lock; rename; hide; create a pattern; collapse. Its Outline tab shows word count, reading time and the heading structure [List View](https://wordpress.org/documentation/article/list-view/) (primary, 9 Sep 2026).
- **Squarespace Finish Layer:** a Layers panel for z-order and overlap, and «Stacks» that group blocks [squarespace.com/blog](https://www.squarespace.com/blog/finish-layer-website-design-tools) (primary, 16 Apr 2026).
- **Wix Studio Layers panel:** rename, hide in the editor, lock, drag to reorder [working with layers](https://support.wix.com/en/article/studio-editor-working-with-layers) (primary).
- **Webflow Navigator:** arrow keys select parent, child and sibling [keyboard shortcuts](https://help.webflow.com/hc/en-us/articles/33961359609875) (primary, search extract), and arrow-key selection on the canvas came to Build mode on 25 Aug 2026 [releases.sh](https://releases.sh/webflow/webflow-product-updates.md) (secondary, mirrors the vendor feed).
- **Webstudio Navigator:** multi-select, range selection, keyboard reordering with indent and outdent, rename [Webstudio shortcuts](https://docs.webstudio.is/university/foundations/shortcuts) (primary).
- **Elementor Navigator, Bricks Structure panel, GrapesJS Layer Manager:** the same tree for selection, reordering and locking [Bricks interface tour](https://academy.bricksbuilder.io/getting-started/interface-tour/) (primary), [GrapesJS modules](https://grapesjs.com/docs/modules/Blocks.html) (primary).
- **Accessible trees in code:** Gutenberg's List View is a TreeGrid with roving tabindex, and each row carries its level, position and set size [list-view](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/list-view/index.jsx), [tree-grid](https://github.com/WordPress/gutenberg/blob/trunk/packages/components/src/tree-grid/index.tsx) (code). Webstudio's tree handles all four arrow keys with roving tabindex, `aria-selected` and `aria-current` [tree.tsx](https://github.com/webstudio-is/webstudio/blob/main/packages/design-system/src/components/tree.tsx) (code).
- **Overviews:** WordPress's Zoom-out view (Ctrl+Shift+0) condenses the page into sections that can be moved [keyboard shortcuts](https://wordpress.org/documentation/article/keyboard-shortcuts-block-editor/) (primary); Tilda has a blocks map (⌘L) [Tilda cheat sheet](https://blog-en.tilda.cc/tpost/f5romae4h1-tilda-shortcuts-cheat-sheet) (primary); Carrd has a Section View [Carrd docs](https://carrd.com/docs/building/using-section-view) (primary).

**Urd today.** There is no tree. What exists instead:
- sections move up and down from the section toolbar;
- blocks change z-order with «Bring forwards» and «Send backwards» in the block toolbar, «To the front» and «To the back» in the right-click menu, Ctrl+Shift+Up and Down, and the layer number in Placement;
- the Pages panel switches page without reloading the editor.

A smaller block that lies over a larger one cannot be selected today, because hover picks the larger one first (a BACKLOG 0.7.10 finding). The layers panel answers that (E6). The phone order has up and down buttons (0.7.3); keys for it are 0.7.3.6.

### Global design

**What it is.** Tokens and themes edited once and applied everywhere: palette, type, spacing, radius and shadows, with modes beyond light and dark, a style book that shows every element styled at once, and libraries shared across sites. What separates the strong builders is modes beyond light and dark, values per breakpoint, and a hover preview before a choice is committed.

**Who does it well**
- **WordPress Global Styles:** style variations, plus colour and typography variations; element colours for links (with hover), headings and buttons; font-size presets with fluid minimum and maximum; shadow presets; the Style Book; style revisions; and «Apply Globally» from a single block [Styles overview](https://wordpress.org/documentation/article/styles-overview/) (primary, 19 Aug 2026).
- **Webflow Variables:**
  - variable modes for light, dark, brand and seasonal themes [webflow.com/updates/variable-modes](https://webflow.com/updates/variable-modes) (primary);
  - function variables with `clamp()`, `calc()`, `min()`, `max()` and `color-mix()` as values [help.webflow.com](https://help.webflow.com/hc/en-us/articles/41843932314259-Use-functions-in-variable-values) (primary);
  - global tag styles shared through libraries (9 Oct 2026) [releases.sh](https://releases.sh/webflow/webflow-product-updates.md) (secondary, mirrors the vendor feed);
  - a contrast ratio with AA, AAA and Fail curves in the colour picker [webflow.com/updates](https://webflow.com/updates/check-text-accessibility-with-built-in-color-contrast-ratio-tool) (primary).
- **Squarespace:** Site Themes bundle a palette, a font pairing, a button style and an animation package, and a Layout Switcher swaps layouts [Search Engine Journal](https://www.searchenginejournal.com/squarespace-rolls-out-new-ai-tools-for-seo-and-design/557220/) (secondary). Font file uploads came with Finish Layer [squarespace.com/blog](https://www.squarespace.com/blog/finish-layer-website-design-tools) (primary, 16 Apr 2026).
- **Bricks Style Manager** (2.2, 10 Feb 2026): theme styles, classes, variables, palettes, typography and spacing scales, a fluid type generator, and a hover preview of colours, classes and variables before they are applied. The Color Manager has dark-mode variants, shades and harmonies [bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-2/) (primary).
- **Wix:** Wix Studio design libraries carry one colour and type set plus saved sections across a workspace [design libraries](https://support.wix.com/en/article/studio-editor-creating-and-managing-design-libraries) (primary). Wix Harmony has a Brand panel for palettes and fonts [introducing Harmony](https://support.wix.com/en/article/introducing-the-wix-harmony-editor) (primary).
- **Others:**
  - Divi 5: Design Variables, Color Harmony and Color Scale generators, and preset managers [version log](https://help.elegantthemes.com/en/articles/9973580) (primary, to 5.14, 28 Sep 2026).
  - Tilda Styles (2025): central typography, buttons and palette that propagate site-wide [blog-en.tilda.cc](https://blog-en.tilda.cc/2025-in-review) (primary).
  - Carrd Element Styles: shared linked styles, the simplest model [Carrd docs](https://carrd.com/docs/building/using-element-styles) (primary).
  - Duda's Text widget has a contrast checker [duda.co/accessibility](https://www.duda.co/accessibility) (primary).
  - Elementor: Site Settings with one-click Kits; Squarespace: a colour theme per section; Framer: colour and text styles (earlier maps, no URL).

**Urd today.** The Theme panel edits tokens as swatches: bg, surface, text, accent and «Text on accent»; heading and body font stacks; radius; and section space. They are written to `content/theme.css`.
- Light and dark come from `light-dark()` and `theme.alt`, and «Theme suggestions» offers ready palettes.
- «Text on accent» can be «Auto», where the browser picks black or white through `contrast-color()`.
- A «Section theme» gives one section a colour role (Accent, Surface, Inverse, Soft, Muted) that follows light and dark.
- Fonts are system font stacks only, with no font files.

Missing: font packs and palette themes as one choice (E10); a style book, a hover preview, «use this block's style as the site default», a spacing scale, and modes beyond light and dark through «save your own theme» with export (E11). A contrast grade in the colour picker belongs to the accessibility round (E27).

### Reuse with sync

**What it is.** Saving something once and using it again. The axis is synced reuse (one source, edited once, changed everywhere) against unsynced reuse (an independent copy). The lightest form is the snippet: save a selection, and it appears in the very same insertion menu.

**Who does it well**
- **WordPress patterns:** synced and unsynced patterns [synced patterns](https://gutenberg.10up.com/reference/Patterns/synced-patterns/) (secondary). In 7.0 patterns default to content-only editing and can be detached, and overrides work for any block attribute that supports Block Bindings [Gutenberg Times](https://gutenbergtimes.com/wordpress-7-0-source-of-truth/) (secondary). In code, a synced pattern is `core/block` with a `ref` and a `content` object of overrides keyed by the inner block's `metadata.name`, so only named blocks can be overridden [block.json](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/block/block.json), [pattern-overrides.js](https://github.com/WordPress/gutenberg/blob/trunk/packages/editor/src/bindings/pattern-overrides.js) (code).
- **Webflow components:** props with groups and defaults, style variants, slots with restrictions and default slots, components in CMS rich text, and components hidden from the Marketer role [component variants](https://help.webflow.com/hc/en-us/articles/51307110086547) (primary), [releases.sh](https://releases.sh/webflow/webflow-product-updates.md) (secondary). Conditional logic in slots can set variants, text, attributes and images [webflow.com/updates](https://webflow.com/updates/control-content-with-conditional-logic) (primary).
- **Framer:** components with variants and variables, smart components, unlinking [component variants](https://framer.com/academy/lessons/component-variants-in-framer) (primary).
- **Bricks 2.2:** components with properties, slots and style variants; nested components; the Component Manager (2.4) shows usage and imports from another site [bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-2/) (primary).
- **Elementor Pro components:** global sync, per-instance overrides, exposed properties and detach [Elementor 4.0](https://elementor.com/blog/editor-40-atomic-forms-pro-interactions/) (primary).
- **Ghost snippets:** a saved selection appears in the same card menu [ghost.org/help/snippets](https://ghost.org/help/snippets/) (primary).
- **GrapesJS symbols:** the main component keeps its instances, each instance keeps a reference and per-property overrides, and «detach» turns an instance into a copy [Component.ts](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/dom_components/model/Component.ts), [SymbolUtils.ts](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/dom_components/model/SymbolUtils.ts) (code).
- **Silex:** symbols reused across pages, on the GrapesJS engine [Silex hands-on](https://www.opensourceforu.com/2026/02/a-hands-on-guide-to-silex-building-static-sites-visually/) (secondary, Feb 2026).

**Urd today.**
- 39 section presets.
- «Save as template» saves a section, a group of blocks or a page. Each appears under «My templates» in the menus it was made for, which is the snippets model, and every insert is an independent copy, never a synced symbol.
- Nav and footer live at site level, so they behave as global sections.
- Plugin blocks are Urd's code components (the define API).

Synced global blocks as `{ref, overrides}` with detach, where only named fields can be overridden, are E12.

### States and interactions

**What it is.** How a builder lets a site owner style hover, focus and pressed states, and set motion. There are two philosophies:
- CSS pseudo-states per selector, as in Webflow, where a selector gets states that inherit;
- named visual variants, as in Framer, which cover hover, press, scroll and breakpoints with automatic tweening. Framer's variant model is the most visual and unified of the two.

A third is newer: triggers and effects stored as declarative data.

**Who does it well**
- **Webflow:** states None, Hover, Pressed, Focused and Visited; the Designer API also exposes `focus-visible`, `focus-within`, `nth-child`, `::before` and `::after` [States](https://help.webflow.com/hc/en-us/articles/33961301727251) (primary, search extract), [the style object](https://developers.webflow.com/reference/the-style-object) (primary). Interactions with GSAP gained per-breakpoint control, reduced-motion settings and control over when animation code loads [webflow.com/updates](https://webflow.com/updates/more-control-over-interactions-with-gsap) (primary).
- **Framer:** variant interactions on click, mouse enter and mouse leave, with appear, hover, press, drag, loop and scroll effects [component variants](https://framer.com/academy/lessons/component-variants-in-framer) (primary), [animations overview](https://framer.com/academy/lessons/framer-animations-overview) (primary, 8 Oct 2026).
- **WordPress 7.1:** hover, focus and active styling for Buttons and Navigation Links [developer.wordpress.org](https://developer.wordpress.org/news/2026/08/whats-new-for-developers-august-2026/) (primary).
- **Elementor V4:** hover, focus and active states per element. Pro Interactions have the triggers page load, scroll into view, while scrolling, hover and click, set per breakpoint [Elementor 4.0](https://elementor.com/blog/editor-40-atomic-forms-pro-interactions/) (primary, 15 Apr 2026).
- **Squarespace Finish Layer:** block animations triggered by scroll, hover, click and cursor, plus transforms [squarespace.com/blog](https://www.squarespace.com/blog/finish-layer-website-design-tools) (primary).
- **Wix @wix/interact** (MIT): a declarative JSON of triggers (viewEnter, viewProgress, hover, click, pointerMove, interest, activate) and effects, run on WAAPI and ViewTimeline [github.com/wix/interact](https://github.com/wix/interact) (primary).
- **Readymag:** copy and paste of animation settings (⇧⌘C/V) [blog.readymag.com](https://blog.readymag.com/12-time-savers-to-speed-up-your-workflow-in-readymag-b524df588574/) (primary, 2019).

**Urd today.** Motion and hover are separate, additive fields on each block:
- entrance (fade-in, slide-up, zoom-in), with stagger for card groups;
- hover lift, and the nav's own hover styles;
- parallax (scroll-driven CSS behind `@supports`, with a rAF fallback) and an animated gradient;
- reduced motion respected throughout.

There is no state editor and no click trigger. Where the rest goes:
- button states (hover, focus, active) in the 0.7.9 design gallery (E13);
- copying animation together with styles (the style clipboard carries it, 0.7.20.8);
- a click-opened popup in the Element round, ER-A;
- text animation in ER-H.

Timelines, cursor effects and shaders are not taken ([FEATURES.md](FEATURES.md)).

### Responsive delivery

**What it is.** How a site owner sees and adjusts the page at other widths: a breakpoint switcher, a cascade from one width to the others, overrides per breakpoint, and lately both widths side by side.

**Who does it well**
- **Webflow:** four preset breakpoints plus 1280, 1440 and 1920, cascading both ways from desktop [Breakpoints overview](https://help.webflow.com/hc/en-us/articles/33961300305811) (primary, search extract). The breakpoint canvas (2 Sep 2026) shows every breakpoint side by side, or focuses on one [we-r.co](https://www.we-r.co/en/blog/nouveautes-designer-webflow-conf-2026) (secondary).
- **Figma Sites:** Desktop 1280, Tablet 800 and Mobile 375 plus custom widths, with bulk editing across breakpoints [breakpoints](https://help.figma.com/hc/en-us/articles/31242797809815) (primary).
- **Wix Studio:**
  - custom breakpoints whose changes flow from large screens down, never up;
  - docking that anchors an element visually to its parent's edges [docking](https://support.wix.com/en/article/studio-editor-working-with-docking-margins-and-padding) (primary);
  - «Responsive AI», which groups elements and applies a stack or grid in one click, per section or for mobile only. It is a bounded AI action that builds trust [building a responsive site](https://support.wix.com/en/article/studio-editor-building-a-responsive-site) (primary).
- **Wix Harmony:** desktop changes flow down to mobile; there are mobile-only elements, a Hidden-on-mobile tab, per-mobile resize and reposition, and a preview slider [adjusting your site for mobile](https://support.wix.com/en/article/wix-harmony-editor-adjusting-your-site-for-mobile) (primary).
- **Squarespace Fluid Engine:** a separately editable mobile layout that stays synced with desktop, and a key that hides a block at the current width [Fluid Engine](https://support.squarespace.com/hc/en-us/articles/6421525446541) (primary, 16 Jul 2026). Mobile overrides came on 27 May 2026 [product updates](https://squarespace.com/blog/product-updates-may-2026) (primary).
- **WordPress:** 7.0 shows or hides blocks per device [Gutenberg Times](https://gutenbergtimes.com/wordpress-7-0-source-of-truth/) (secondary); 7.1 adds per-device styles through `@mobile` and `@tablet` keys in theme.json with configurable viewports [developer.wordpress.org](https://developer.wordpress.org/news/2026/08/whats-new-for-developers-august-2026/) (primary).
- **Framer:** the primary breakpoint flows down, and tablet and phone become overrides [breakpoints](https://framer.com/academy/lessons/framer-fundamentals-breakpoints) (primary).

**Urd today.** Two breakpoints, by decision.
- **Desktop:**
  - a bound content width (default 1440) with full-width section backgrounds ([ADR-0018](../adr/0018-bound-content-width.md));
  - free placement on a snap grid, and a push pass that moves the blocks below a block whose content grows ([ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md));
  - per block, a height that follows the content or is the block's own, three fit choices below the design width (wrap, shrink in proportion, shrink and wrap) and «Size» with bounds on its text ([ADR-0025](../adr/0025-the-sizing-model.md)).
- **Mobile:** a synced row grid with per-block overrides ([ADR-0019](../adr/0019-synced-mobile-model.md)) and hide on mobile. Mobile review flags each section whose desktop changed after its mobile layout was tuned, until the site owner marks it reviewed.
- **Preview:** four devices (Screen, laptop 1280, tablet 810, phone 390) and «Clean view», which shows the page as a visitor sees it.

Open: elements shown only on the phone (E15), keyboard order on mobile (0.7.3.6), desktop and phone side by side (E14), and real phone sizes in the preview (0.7.10). Custom breakpoints (ADR-0019) and a responsive AI fix (E16) are not taken.

### Section and template galleries

**What it is.** «Add section» opens a gallery of thumbnails. A saved section is reuse. The strongest builders let a section change its whole layout from thumbnails without moving blocks by hand. Both a blank and a designed start lower the blank-canvas threshold.

**Who does it well**
- **Squarespace:** the Layout Switcher swaps a section's layout while the content stays [Search Engine Journal](https://www.searchenginejournal.com/squarespace-rolls-out-new-ai-tools-for-seo-and-design/557220/) (secondary).
- **Wix:** Wix Studio's Add panel has Quick Add, Design Kits, Sections and Wireframes [adding elements](https://support.wix.com/en/article/studio-editor-adding-elements-4240855) (primary). Wix Harmony has «Change Layout» with grid layouts for sections [introducing Harmony](https://support.wix.com/en/article/introducing-the-wix-harmony-editor) (primary).
- **Framer:** pre-made Sections in the Insert menu [framer.com/updates/sections](https://www.framer.com/updates/sections) (primary), the Insert panel [Insert panel](https://www.framer.com/academy/lessons/framer-fundamentals-the-insert-panel) (primary) and the Wireframer [Wireframer](https://www.framer.com/academy/lessons/wireframer) (primary).
- **WordPress:** the inserter's tabs for blocks, patterns, media and synced patterns [Site Editor](https://wordpress.org/documentation/article/site-editor/) (primary, 14 Sep 2026).
- **Bricks and Breakdance:** wireframes and design sets that install pages, templates and components as one set [bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-1/) (primary), [Breakdance shortcuts](https://breakdance.com/documentation/builder/workflow/keyboard-shortcuts/) (primary, search extract).
- **Shopify:** the block picker has categories and hover-to-preview [theme editor](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor) (primary).
- **Libraries outside the builders:** Relume groups 1k+ components by purpose (event headers, team, timeline, logo, stats) [relume.ai](https://www.relume.ai/components) (primary); Tailwind Plus Marketing has hero 12, feature 20, CTA 11 and pricing 14 among its sets [tailwindcss.com](https://tailwindcss.com/plus/ui-blocks/marketing) (primary).

**Urd today.**
- «+ New section» opens the 39 presets (38 plus blank) as thumbnails with a category sidebar, and «My templates» sits in the same gallery.
- «Change layout» in the section toolbar re-places the blocks of a section from layout thumbnails; the blocks are kept, and only placement changes.
- There are 8 built-in page templates, 5 general and 3 for the shop (`page-presets.js`).
- The footer has 10 layouts in its template picker, two of them the chapters and split designs.

Open: whole-site templates (design kits) are v0.8 (E17); grey wireframe presets are watched (FEATURES.md); a hover preview in the picker is partial (thumbnails only).

### AI and wizards as delivery

**What it is.** The dominant new form: a prompt gives a generated multi-page start, which then opens as a fully editable canvas. Rigid step-by-step wizards have given way to a conversation plus visual edits. Everything a generator makes must stay editable afterwards; a dead-end generator is the pattern to avoid. Wix retired its ADI wizard in November 2024 (earlier maps, no URL); B12 and Durable are generators of the same kind.

**Who does it well**
- **Agents in the builder:**
  - Framer 3.0 (16 Jun 2026): agents generate pages, redesign from screenshots, manage the CMS, write copy and SEO metadata, and audit broken links and accessibility [MarTech Series](https://martechseries.com/content/content-marketing/website-analytics/framer-launches-ai-agents/) (secondary), [framer.com/blog](https://www.framer.com/blog/ai-credits-simpler-plans-and-lower-prices/) (primary).
  - Wix Harmony's Aria agent (21 Jan 2026), with «Ask AI» quick prompts such as «Generate new design» and «Fix layout» [introducing Harmony](https://support.wix.com/en/article/introducing-the-wix-harmony-editor) (primary).
  - Duda's Copilot in Editor 2.0 (26 Aug 2026), with a plan mode [duda.co](https://duda.co/product-updates/from-prompt-to-published-meet-copilot-in-editor-2-0) (primary). Divi 5.12 AI Agents (4 Sep 2026) [elegantthemes.com](https://www.elegantthemes.com/blog/divi-resources/divi-5-12-release-notes) (primary).
- **Confirm before generating:** a plan mode shows what will be built before anything is made: Duda Copilot (above); Elementor's Angie agent is reported to plan first and to save its output as drafts [The Plus Addons](https://theplusaddons.com/blog/what-is-the-elementor-mcp/) (secondary, unverified).
- **AI in place:** select text, then rewrite it, change its tone or length; describe a picture to get one (Wix Harmony «Ask AI», Duda's AI Content Assistant, Figma Sites' rewrite, translate and shorten) [Harmony AI tools](https://support.wix.com/en/article/wix-harmony-editor-about-the-ai-tools) (primary), [duda.co/product-updates](https://www.duda.co/product-updates) (primary), [Figma Sites AI tools](https://help.figma.com/hc/en-us/articles/31433998164375) (primary).
- **Confirm the page list:** Hostinger confirms the page list before it generates, which cuts rework (earlier maps, no URL).
- **Curated against open:** Squarespace Blueprint starts from fixed brand personalities and designer palettes, guardrails that give non-designers a more even result [Blueprint](https://www.squarespace.com/blog/starting-a-website-with-squarespace-blueprint) (primary). Wix, Framer and Duda run open conversations.
- **AI between sections:** an «Add section (AI)» entry often appears on hover between sections (earlier maps, no URL).
- **Agents outside the builder, through MCP:**
  - Framer 3.0 lets external agents (Claude Code, Cursor, Codex, Gemini CLI) connect through MCP on the user's own model subscription, and their changes land on auto-created branches [Creative AI News](https://www.creativeainews.com/articles/framer-3-agents-explained-2026/) (secondary), [Framer branches](https://www.framer.com/help/articles/how-to-use-branches-in-framer/) (primary).
  - Webflow MCP v1.3 (21 May 2026) has 30+ tools, covering components, props, variants, branches and comments [developers.webflow.com](https://developers.webflow.com/home/changelog/2026/5/21) (primary).
  - WordPress's official MCP Adapter turns Abilities into MCP tools [developer.wordpress.org](https://developer.wordpress.org/news/2026/02/from-abilities-to-ai-agents-introducing-the-wordpress-mcp-adapter/) (primary). WordPress.com's MCP gained write access on 20 Mar 2026, with drafts by default and per-capability opt-in [TechCrunch](https://www.techcrunch.com/2026/03/20/wordpress-com-now-lets-ai-agents-write-and-publish-posts-and-more/) (secondary).
  - Wix [Wix MCP](https://dev.wix.com/docs/api-reference/articles/ai-tools/wix-mcp/about-the-wix-mcp) (primary), Duda (2 Oct 2026) [duda.co/product-updates](https://www.duda.co/product-updates) (primary) and Hostinger [hostinger.com/blog](https://www.hostinger.com/blog/?p=9775) (primary) ship MCP servers too. Breakdance 3.0 RC has a setup wizard that ends in a connected AI agent [breakdance.com/releases](https://breakdance.com/releases/) (primary).
- **Reusable instructions:** Framer Skills (22 Sep 2026) [framer.com/updates](https://www.framer.com/updates) (primary); Webflow's «Generate Agent Instructions» drafts brand, design-system, asset and CMS guidelines from the site [releases.sh](https://releases.sh/webflow/overview) (secondary); Shopify Sidekick Skills [shopify.com/news](https://www.shopify.com/news/winter-26-edition-merchant) (primary).

The common answer to vibe-coding tools is a hybrid of prompt plus visual edits, and agents that work only on branches or drafts (Framer, WordPress.com, Elementor).

**Urd today.** There is no generator and no AI in the editor.
- **A first-visit setup wizard** («Welcome to Urd!») asks for the site's name, accent colour and background colour and writes them into the draft. It shows only on a fresh clone, triggered by `site.setup` in the template (`editor/src/App.svelte`).
- **A designed start:** the 8 page templates and 39 section presets.
- **The AI route is [ADR-0017](../adr/0017-ai-via-local-mcp-server.md):**
  - a local, dependency-free MCP server in the cloned repo (`template/mcp/`), used by the site owner's own agent client;
  - it writes content only, through the engine's own factories and the publishing guard, and never shapes data itself;
  - it makes no network calls and no git operations;
  - the read half is built in v0.8 and the write half in v0.9.

ADR-0017 records that Sanity, Contentful, Storyblok, Strapi and Payload all shipped MCP servers in 2026; that is the form AI now takes in a CMS, not the wizard. The comparison adds three things for the MCP milestones: typed abilities over the schema, agent instructions built from the theme tokens and returned by a read tool, and writes that land as uncommitted files for the site owner to review, commit and publish (E19; ADR-0017 decisions 2 and 4).

### Empty states and discoverability

**What it is.** How an editor shows what is possible without a manual:
- an empty state that is itself an insertion prompt;
- search in the palette, tooltips and onboarding;
- a designed or generated start instead of a blank canvas;
- shortcut cheat sheets;
- removing what a site does not use.

**Who does it well**
- **A start instead of a blank page:** onboarding has become prompt-first. Squarespace Blueprint AI templates [Refresh 2025](https://www.squarespace.com/blog/squarespace-refresh-2025-product-releases) (primary); Webflow's redesigned AI site builder with multi-page generation [eightfold.io](https://www.eightfold.io/blog/webflow-updates-for-2026) (secondary); Wix Harmony's template- or AI-first start [about Harmony](https://support.wix.com/en/article/about-the-new-wix-harmony-editor) (primary).
- **Designed empty states:** the research found no vendor documentation of designed empty states inside an editor (unverified either way). The component libraries ship them as a pattern of their own: Untitled UI «Empty States», shadcn/ui «Empty», HyperUI «Empty Content» [Untitled UI](https://www.untitledui.com/react/components) (primary), [shadcn/ui](https://ui.shadcn.com/docs/components) (primary), [HyperUI](https://www.hyperui.dev/) (primary). Elementor's Atomic Loops have an empty state for a loop with no items [Elementor 4.0](https://elementor.com/blog/editor-40-atomic-forms-pro-interactions/) (primary).
- **Fewer choices:** Bricks 2.0's Element Manager switches elements on or off globally [bricksbuilder.io](https://bricksbuilder.io/release/bricks-2-0/) (primary).
- **Decision help:** Wix Studio documents when to use its flexbox-based and its grid-based layout tools, by content amount, responsive behaviour, dynamic data and alignment [choosing between flexbox and grid](https://support.wix.com/en/article/studio-editor-choosing-between-flexbox-based-and-grid-based-tools) (primary).
- **Cheat sheets:** 14 of the 24 builders show their shortcuts in the editor itself, for example Webflow on Shift+/, WordPress on Shift+Alt+H and Wix Studio on Ctrl+/ (see the shortcut sets below).
- **Pickers that teach:** the Wix Editor keeps the Add Elements panel open on Ctrl+click [Wix Editor shortcuts](https://support.wix.com/en/article/keyboard-shortcuts-for-the-editor) (primary), and Shopify's block picker previews a block on hover [theme editor](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor) (primary).

**Urd today.**
- «+ New section» is the empty state, and «+ New block» sits in every section.
- Everything with special behaviour has a «?» help chip ([ADR-0008](../adr/0008-help-chip-rule.md)), and settings are explained in «?» tooltips.
- The setup wizard runs on a fresh clone, and mobile review flags sections that need a look.

Missing: preset suggestions in an empty section or on an empty page (E20), a «which layout tool?» chip (E5), a cheat sheet (E21), and an element manager that hides unused block types (E4).

### Comments, notes and review

**What it is.** Feedback attached to the page itself, review before publishing, and a readable history of what changed.

**Who does it well**
- **WordPress Notes:** notes on individual blocks with replies, mentions and resolve came in 6.9 (2 Dec 2025) [WPBeginner](https://www.wpbeginner.com/news/whats-new-in-wordpress-6-9/) (secondary). 7.0 added a suggestions mode and email notifications [Gutenberg Times](https://gutenbergtimes.com/wordpress-7-0-source-of-truth/) (secondary), and 7.1 adds emoji reactions, rich text and «apply suggestions» [Roadmap to 7.1](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/) (primary).
- **Visual revisions:** WordPress 7.0 shows colour-coded inline diffs with a timeline slider and a mini-map [Gutenberg Times](https://gutenbergtimes.com/wordpress-7-0-source-of-truth/) (secondary), and 7.1 adds shareable revision URLs [Roadmap to 7.1](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/) (primary).
- **Canvas comments:**
  - Webflow's «comment-only links» let outside reviewers comment without an account (Conf 2025) [community.webflow.com](https://community.webflow.com/updates/post/webflow-conf-2025-recap-everything-we-announced-7cOUvmz6EGiMlL4) (primary).
  - Framer's canvas comments on the key C [framer.com/features/collaborate](https://framer.com/features/collaborate/) (primary), Wix Studio's comments panel [collaborating](https://support.wix.com/en/article/studio-editor-collaborating-on-a-site) (primary), Figma Sites' comments [Figma Sites help](https://help.figma.com/hc/en-us/categories/31823555275671-Figma-Sites) (primary), and Elementor's Notes on Shift+C [Elementor hotkeys](https://elementor.com/help/hotkeys/) (primary).
- **Review before publishing:**
  - Framer 3.0 has git-style branches with preview and merge (a Pro feature) [Framer branches](https://www.framer.com/help/articles/how-to-use-branches-in-framer/) (primary).
  - Webflow's page branching, approvals and branch staging are Enterprise-only [help.webflow.com](https://help.webflow.com/hc/en-us/articles/33961355506195) (primary).
  - Wix has CMS drafts plus change requests (13 Aug 2026) [wix.com/updates](https://www.wix.com/updates) (primary).
- **Real-time co-editing:** Webflow [community.webflow.com](https://community.webflow.com/updates/post/webflow-conf-2025-recap-everything-we-announced-7cOUvmz6EGiMlL4) (primary) and Wix Harmony [introducing Harmony](https://support.wix.com/en/article/introducing-the-wix-harmony-editor) (primary) have it. WordPress pulled it from 7.0 on 8 May 2026 [DreamHost](https://www.dreamhost.com/blog/wordpress-7-0/) (secondary), and it is still off in 7.1 [developer.wordpress.org](https://developer.wordpress.org/news/2026/08/whats-new-for-developers-august-2026/) (primary).

**Urd today.**
- Drafts across pages are kept in the browser, with undo and redo on Ctrl+Z and Ctrl+Shift+Z or Ctrl+Y.
- Publishing warns «Someone else has published» when files the draft would overwrite changed since the page was loaded.
- The History panel lists recent publishes, and «Undo the publish» makes a new commit that restores the state before the last one; nothing is deleted.

There are no comments, no visual diff and no review step. The review step belongs to the git model: a draft as a branch and publishing as a merge, with a Cloudflare Pages preview per draft (E25). Comments (E22) and a visual diff (E23) are watched. A content-only mode (E24) is weighed for the board handover in v0.9.

### Editing the live page

**What it is.** Editing on the real page, not a mock-up of it.

**Who does it well**
- **Framer On-Page Editing** (6 Aug 2025): editors change text and images, adjust component variables and create CMS pages directly on the live site. Editable elements get blue outlines, and changes notify collaborators for review before publishing [framer.com/updates/on-page-editing](https://framer.com/updates/on-page-editing) (primary).
- **Webflow:** separate Design, Build and Edit modes [Collaborate](https://help.webflow.com/hc/en-us/articles/33961260491795) (primary, search extract).
- **Webstudio:** a Content mode, and share links at four levels (View, Content, Build, Admin) [Webstudio docs index](https://docs.webstudio.is/llms.txt) (primary).
- **Shopify:** one-click text editing in the theme editor's live storefront preview [theme editor](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor) (primary).

**Urd today.** This is Urd's model. The editor shows the real site in an iframe (`?preview=1`) and drives it with postMessage: same engine, same render as production ([ADR-0001](../adr/0001-hybrid-editor-model.md)). Text is written where it stands on the page, and «Clean view» hides the editing chrome. The published site has no edit entry point of its own: an editor opens `/admin`, and publishing goes through GitHub sign-in ([ADR-0003](../adr/0003-publishing-via-github-oauth-and-pages-functions.md)). What Framer adds on top, a limited editor role and review before publishing, is E24 and E25.

### Quality panels

**What it is.** Accessibility and SEO checks offered as a panel in the editor, with the count of open issues where the site owner publishes.

**Who does it well**
- **Webflow Audit panel:** it started with missing alt text, empty links and skipped heading levels. It now runs sitewide and per page, audits the asset library, shows outstanding audits in the Publish dropdown, and lets items be ignored [webflow.com/updates](https://webflow.com/updates/find-and-fix-accessibility-issues-with-new-audit-panel) (primary). The colour picker shows the contrast ratio with AA and AAA curves [webflow.com/updates](https://webflow.com/updates/check-text-accessibility-with-built-in-color-contrast-ratio-tool) (primary).
- **Wix Accessibility Wizard** (Editor and Studio): it scans, then lists «Detected issues» and «Manual tasks» (contrast, headings, alt text, navigation). Wix disclaims any compliance guarantee [support.wix.com](https://support.wix.com/en/article/accessibility-about-the-accessibility-wizard-in-the-studio-editor) (primary).
- **Elementor Ally** (Nov 2025): a «remediation engine» with AI fix suggestions and 180+ WCAG 2.1 AA checks [TechRadar](https://www.techradar.com/pro/website-building/elementor-just-made-it-easier-to-improve-website-accessibility) (secondary), [wordpress.org plugin](https://wordpress.org/plugins/pojo-accessibility/) (primary).
- **Duda:** an SEO Overview and Audit (alt text, broken links, metadata, schema) and an Alt Text Manager that shows every image in one view [duda.co/features/seo-tools](https://duda.co/features/seo-tools) (primary). WCAG scanning is left to third parties [duda.co/accessibility](https://www.duda.co/accessibility) (primary).
- **Framer:** an accessibility panel with semantic tags, alt text and a site-wide reduced-motion setting [Framer accessibility guide](https://www.framer.com/help/articles/guide-to-web-accessibility-in-framer) (primary).
- **WordPress 7.1:** a «decorative» toggle on images [developer.wordpress.org](https://developer.wordpress.org/news/2026/08/whats-new-for-developers-august-2026/) (primary).
- **The counter-example:** Figma Sites is criticised for «a sea of `<div>`» output and no pre-publish warnings [UX Collective](https://uxdesign.cc/figma-sites-when-accessibility-is-an-afterthought-070ba3b41553) (secondary).

**Urd today.** There is no audit. The output side is good: the nav follows the disclosure pattern ([ADR-0010](../adr/0010-disclosure-navigation.md)), reduced motion is respected throughout, and pages carry their own meta description and OG fields. The editor itself is not yet keyboard-operable (BACKLOG 0.7.11). The legal floor applies to associations: forskrift om universell utforming av IKT requires WCAG 2.0 A and AA (35 criteria) of private organisations, «lag og organisasjoner» included [Uutilsynet](https://www.uutilsynet.no/regelverk/regelverk-og-krav/746) (primary). PDFs uploaded after 1 February 2022 must themselves be accessible [Uutilsynet: exceptions](https://www.uutilsynet.no/regelverk/unntakene-fra-universell-utforming-av-ikt/2248) (primary, updated 27 March 2025). The audit panel (E26), contrast and decorative images (E27), and the list of images without alt text (E28) answer this.

### Urd against the delivery patterns

Urd covers most of the delivery patterns. The remaining gaps are the command palette, the structure tree, and the review and quality surfaces.

| Pattern | Urd has | Open |
|---|---|---|
| [Insertion](#insertion) | Blocks panel with search, «+ New block» at the pointer, «/» on the canvas, «My templates» in the same menus | Command palette (E1), drop indicators (E2), paste pipeline (E3), element manager (E4) |
| [Configuration surfaces](#configuration-surfaces) | Element menu with Content, Style and Placement in two widths, groups, a quick row with pins, marks on own values with a reset per setting, and search; the menu beside the block, dragged by its head; right-click menus and the style clipboard; floating text toolbar; click-and-write; themed dropdowns; help chips | Layout decision chip (E5) |
| [Structure and layers](#structure-and-layers) | Sections up and down (also from the right-click menu), z-order buttons, Ctrl+Shift+Up and Down and the right-click menu, the Pages panel | Layers panel (E6), zoom-out overview (E7), page duplication (E8), region navigation (E9) |
| [Global design](#global-design) | Theme tokens, light and dark, theme suggestions, section themes, «Text on accent» Auto | Font packs and palette themes (E10), style book and modes (E11) |
| [Reuse with sync](#reuse-with-sync) | Presets, «Save as template» for sections, block groups and pages, global nav and footer, plugin blocks | Synced global blocks (E12) |
| [States and interactions](#states-and-interactions) | Entrance, stagger, hover lift, parallax, animated gradient, reduced motion | Button states (E13) |
| [Responsive delivery](#responsive-delivery) | Bound width, push pass, sizing model, synced mobile row grid, hide on mobile, mobile review, 4 devices, Clean view | Side by side (E14), phone-only elements (E15) |
| [Section and template galleries](#section-and-template-galleries) | 39 presets with a category sidebar, «Change layout», 8 page templates, 10 footer layouts | Whole-site templates (E17) |
| [AI and wizards as delivery](#ai-and-wizards-as-delivery) | Setup wizard; the MCP route decided | MCP server (E19) |
| [Empty states and discoverability](#empty-states-and-discoverability) | «+ New section» empty state, help chips, tooltips | Richer empty states (E20), cheat sheet (E21) |
| [Comments, notes and review](#comments-notes-and-review) | Drafts in the browser, the publish conflict warning, the History panel of publishes with «Undo the publish» | Comments (E22), visual diff (E23), content-only mode (E24), PR per draft (E25) |
| [Editing the live page](#editing-the-live-page) | The real page in the editor (ADR-0001) | Nothing beyond E24 and E25 |
| [Quality panels](#quality-panels) | Accessible output | Audit panel (E26), contrast and decorative (E27), alt-text list (E28) |

## Keyboard shortcuts across the field

Urd's own set comes first, read from the code. Then come the sets of 19 builders as each vendor publishes them, and last what most of them agree on. Keys are written the way each vendor writes them: ⌘ is Cmd (Ctrl on Windows), ⌥ is Option (Alt), ⇧ is Shift. Canva has an official shortcut page, but its text could not be retrieved (403) [Canva](https://canva.com/help/keyboard-shortcuts/) (primary, search extract).

### Urd's own set

Read from `template/assets/engine/0.7.4/preview-edit.js` and `editor/src/App.svelte` on 11 October 2026, and from `template/assets/engine/0.7.7/preview-edit.js` and `editor/src/menu/state.svelte.js` on 19 October 2026 (code). Ctrl means Ctrl or Cmd. The structural keys act on the desktop view only.

| Action | Keys | Notes |
|---|---|---|
| Undo / redo | Ctrl+Z; Ctrl+Shift+Z or Ctrl+Y | In the canvas and the panels; a free-text field keeps the browser's own text undo |
| Copy / paste blocks | Ctrl+C, Ctrl+V | Paste needs no selection: it lands in the active section |
| Duplicate | Ctrl+D | Also from the panels, except in a text field |
| Delete | Delete or Backspace | The whole selection when several blocks are selected |
| Move | Arrows by one grid step; Shift+arrows 1 px | A burst of presses is one undo step |
| Block menu | / | Opens «+ New block» with the search focused, at the pointer when it is over the section; arrows walk the menu, Enter inserts |
| Deselect, close a menu | Escape | |
| Multi-select | Shift+click; drag on empty section surface for a marquee | The marquee stays within the section it started in |
| Free placement during a drag or resize | Hold Ctrl/⌘ | Snapping and smart guides are off while Ctrl/⌘ is held; Shift holds a move to one axis (0.7.10, 14 October 2026) |
| Rotate | 15° steps by default; Shift gives 1° | |
| Section height | Drag the section boundary; Shift gives a free height | |
| Right-click menu | Right click on a block or a section's surface; the ContextMenu key or Shift+F10 | From the keyboard it opens on the selected block |
| Copy and paste a style | Ctrl+Alt+C, Ctrl+Alt+V | The animation travels with the style |
| To the front, to the back | Ctrl+Shift+Up, Ctrl+Shift+Down | Also in the right-click menu |
| Element menu areas | 1, 2, 3 for Content, Style and Placement; / to the menu's search | Also on the canvas with a block selected; Escape empties the search, then closes |
| Resize keeping the ratio | Shift while resizing | Image, video, shape and icon |

Not in Urd: cut (Ctrl+X), select all, Tab to the next block, keys for the device views, a key for publishing, text shortcuts of Urd's own (heading levels, alignment, link), and a list of the shortcuts in the editor (E21).

### The builders' sets

**Webflow** [keyboard shortcuts](https://help.webflow.com/hc/en-us/articles/33961359609875) (primary, search extract), [glossary](https://university.webflow.com/glossary/keyboard-shortcuts) (primary)
- Cheat sheet and saving: cheat sheet Shift+/ · snapshot Shift+Cmd+S · Delete or Backspace deletes · Esc deselects.
- View: preview Shift+Cmd+P · guide overlay Shift+Cmd+G · X-ray Shift+Cmd+X.
- Left toolbar panels: Add A · Pages P · Navigator Z · Properties K (when editing a main component) · Components Shift+A · Assets J · Option-click a section to expand or collapse all.
- Right-hand tabs: Style S · Settings D · Interactions H.
- Style panel: focus mode Option+Shift+S · expand or collapse sections Option+S · Shift-drag sets all four sides of margin or padding · Cmd-drag sets opposite sides.
- Clipboard: Cmd+C / X / V · duplicate Cmd+D or Option+drag.
- Device views: desktop 1 · tablet 2 · mobile landscape 3 · mobile portrait 4.
- Find: Quick Find Cmd+E or Cmd+K.
- Selection: parent or child Up/Down · sibling Left/Right.
- Moving: before or after a sibling [ and ] · before or after the parent Cmd+Shift+Up/Down.

**Framer** (the full list is in the app under Help > Keyboard Shortcuts) [framer.com/shortcuts](https://framer.com/shortcuts) (primary, partly rendered), [8 shortcuts](https://framer.com/academy/lessons/8-framer-shortcuts-to-learn) (primary, 8 Oct 2026)
- Quick Actions ⌘K · Library ⌘/ · publish ⇧⌘P · Frame F · Stack S · create component ⌥⌘K · add Frame ⌘⏎ · add Stack ⌥⌘⏎ · remove wrapper ⌘⌫ · zoom to fit ⌘1 · zoom to selection ⌘2 · auto-size text or wrap layers in a Stack ⇧A · toggle visibility ⌘; · ignore constraints while resizing ⌘+drag · move a layer through a crowd ⌥⌘+drag.
- Preview: highlights ⌘⇧H · refresh ⌘R · inspect ⌘I · responsive Z · next breakpoint Ctrl+.
- Selection: cycle selection Tab. Bring to front, send to back, alignment and bold, italic and underline are listed, but their keys did not render.

**Wix Studio** [studio editor keyboard shortcuts](https://support.wix.com/en/article/studio-editor-keyboard-shortcuts) (primary)
- Basics: undo Ctrl+Z · redo Ctrl+Y or Cmd+Shift+Z · preview Ctrl+Alt+P · save Ctrl+S · publish Ctrl+Shift+P.
- Elements: cut / copy / paste Ctrl+X / C / V · duplicate Ctrl+D or Alt+drag · delete Del or Backspace · select a child Ctrl+click · place in a container Alt+C · remove the container Alt+Shift+C · stack the selection Alt+S.
- Z-order: bring to front and move forward Ctrl+↑ · send to back and move backward Ctrl+↓ (the page lists the same keys for each pair).
- Moving and resizing: nudge 1 px arrows · nudge 10 px Shift+arrows · deselect Esc · disable auto-docking Ctrl+drag or resize · proportional resize Shift+resize · resize from the centre Alt+resize · straight-line drag Shift+drag · duplicate in a straight line Alt+Shift+drag · show distances Alt+hover.
- View: zoom Ctrl+= / Ctrl+- · 100% Ctrl+0 · side panels Ctrl+. · Inspector Ctrl+I · Layers Ctrl+L · code panel Ctrl+Alt+Z · shortcuts panel Ctrl+/.
- Text: bold Ctrl+B · italic Ctrl+I · underline Ctrl+U.

**Wix Harmony** [Harmony keyboard shortcuts](https://support.wix.com/en/article/wix-harmony-editor-keyboard-shortcuts) (primary, Jan 2026)
- Basics: save Ctrl+S · preview Ctrl+P · mobile or desktop Ctrl+J · undo / redo Ctrl+Z / Y · zoom Ctrl+- / Ctrl++ / Ctrl+0 · fit the page Shift+1.
- Panels: Aria Ctrl+/ · right-click menu Ctrl+Alt+C · element panel Space · shortcuts Ctrl+Alt+K · Add Elements Ctrl+Alt+A · Media Manager Ctrl+Alt+M · close Esc · help Shift+/ · Pages Ctrl+Alt+P · new page Alt+Shift+P · new section Alt+Shift+S.
- Text: B / I / U · select all Ctrl+A.
- Elements: cut, copy, paste, duplicate and delete · backward or forward Ctrl+↓/↑ · back or front Ctrl+Shift+↓/↑ · nudge 1 or 10 px · duplicate Alt+drag.
- Selection: Esc · distances Alt+hover · next or previous sibling Tab / Shift+Tab · multi-select Shift+click · select all Ctrl+A · children or parent Enter / Shift+Enter.
- Transform and grouping: rotate in 15° steps Shift+rotate · axis lock Shift+drag · group / ungroup Ctrl+G / Ctrl+Shift+G · height ±1/10 Alt(+Shift)+↑/↓ · width ±1/10 Alt(+Shift)+←/→ · rotation ±1°/15° Alt(+Shift)+↑/↓ (as published; the height and rotation keys coincide).

**Wix Editor** (classic) [keyboard shortcuts](https://support.wix.com/en/article/keyboard-shortcuts-for-the-editor) (primary)
- Elements: cut / copy / paste / duplicate Ctrl+X / C / V / D · delete · backward or forward Ctrl+↓/↑ · back or front Ctrl+Shift+↓/↑ · nudge arrows and Shift+arrows.
- Selection: next or previous element Ctrl+Shift+M / Ctrl+M · direct select Ctrl+click · multi-select Shift+click · navigate Shift+Tab.
- Transform: rotate 15° Shift+rotate · axis lock Shift+drag · duplicate by dragging Alt+drag · cancel a drag Esc.
- Undo, save and view: undo / redo Ctrl+Z / Y · save Ctrl+S · preview Ctrl+P · hide the editor controls Shift+F · mobile or desktop Ctrl+J · rulers Shift+R · autosave on or off Ctrl+Alt+A · toolbar Shift+T.
- Panels and adding: Pages / · the shortcuts article ? · add a page Alt+N · add a section Alt+B · the element's main panel Enter · panels Shift+1/2/3 · add an element and keep the panel open Ctrl+click.
- Text: Ctrl+B / U / I.

**Squarespace** [keyboard shortcuts](https://support.squarespace.com/hc/en-us/articles/214491097) (primary, 5 Nov 2025)
- General: full preview Esc · panel search / or ? · Tab, Shift+Tab, Space, Enter and Esc move through the panels.
- Fluid Engine blocks: select a block Tab / Shift+Tab · select all ⌘A · delete Delete · move arrows · resize ⌘+arrows · symmetric resize ⌘⇧+arrows · forward or back ⇧↑/↓ · up or down on mobile ⌥↑/↓ · duplicate ⌘D · copy / paste ⌘C / V · hide the block at the current width ⌘⇧H · grid G.
- Text styles: P3 ⌘⌥0 · P2 ⌘⌥1 · P1 ⌘⌥2 · H4 ⌘⌥3 · H3 ⌘⌥4 · H2 ⌘⌥5 · H1 ⌘⌥6.
- Text formatting: link ⌘K · B / I / U · align ⇧⌘L / E / R.
- Text editing: undo ⌘Z · redo ⌘Y or ⌘⇧Z · paste as plain text ⌘⇧V · indent ⌘] / ⌘[ · list indent Tab / Shift+Tab.
- Collections: add an item Space.

**WordPress block and Site Editor** [keyboard shortcuts](https://wordpress.org/documentation/article/keyboard-shortcuts-block-editor/) (primary, updated 14 Sep 2026). Windows keys first, Mac after the slash.
- Global: visual or code editor Ctrl+Shift+Alt+M / ⇧⌥⌘M · fullscreen Ctrl+Shift+Alt+F / ⇧⌥⌘F · List View Shift+Alt+O / ⌃⌥O · settings sidebar Ctrl+Shift+, / ⇧⌘, · next region Ctrl+` or Shift+Alt+N / ⌃` or ⌃⌥N · previous region Ctrl+Shift+` or Shift+Alt+P / ⌃⇧` or ⌃⌥P · nearest toolbar Alt+F10 / ⌥F10 · save Ctrl+S / ⌘S · undo Ctrl+Z / ⌘Z · redo Ctrl+Shift+Z or Ctrl+Y / ⇧⌘Z · zoom-out view Ctrl+Shift+0 / ⇧⌘0 · shortcut list Shift+Alt+H / ⌃⌥H.
- Selection: select all, pressed again to select the parent, Ctrl+A / ⌘A · clear Esc · unselect Esc twice.
- Blocks: duplicate Ctrl+Shift+D / ⇧⌘D · remove Shift+Alt+Z / ⌃⌥Z · insert before Ctrl+Alt+T / ⌥⌘T · insert after Ctrl+Alt+Y / ⌥⌘Y · remove several Del · move up Ctrl+Shift+Alt+T / ⇧⌥⌘T · move down Ctrl+Shift+Alt+Y / ⇧⌥⌘Y · group Ctrl+G / ⌘G · change the block type / · paste styles Ctrl+Alt+V / ⌘⌥V · internal-link autocomplete [[.
- Text: bold, italic, underline Ctrl/⌘+B / I / U · link Ctrl+K · remove the link Ctrl+Shift+K · inline code Ctrl+Alt+X.
- Transform: heading level 1-6 Shift+Alt+1-6 / ⌘⌥1-6 · heading to paragraph Shift+Alt+0.
- List View: collapse all others Alt+L / ⌥L.
- Command palette: Ctrl+K / ⌘K.

**Elementor** [hotkeys](https://elementor.com/help/hotkeys/) (primary, modified 2 Sep 2025)
- Actions: undo Ctrl/Cmd+Z · redo Ctrl/Cmd+Shift+Z · copy C · paste V · paste style Ctrl/Cmd+Shift+V · delete Del · duplicate Ctrl/Cmd+D · save Ctrl/Cmd+S.
- Panels: Finder Ctrl/Cmd+E · show or hide the panel Ctrl/Cmd+P · Site Settings Ctrl/Cmd+K · Structure Ctrl/Cmd+I · Page Settings Ctrl/Cmd+Shift+Y · History Ctrl/Cmd+Shift+H · User Preferences Ctrl/Cmd+Shift+U.
- Go to: responsive mode Ctrl/Cmd+Shift+M · Template Library Ctrl/Cmd+Shift+L · Notes Shift+C · keyboard shortcuts Ctrl/Cmd+? · quit to the dashboard Esc.

**Figma Sites** (Figma publishes no complete list; the panel in the app opens with Ctrl+Shift+?) [keyboard use](https://help.figma.com/hc/en-us/articles/360040328653) (primary)
- Inline preview Shift+Space · full-screen preview Cmd+Opt+Return / Ctrl+Alt+Enter · keyboard box selection Option+Space / Ctrl+Space · zoom Cmd/Ctrl + / - · focus the toolbar F6 (Ctrl+F6 on Windows) · pan with the arrows when nothing is selected (Shift for larger steps) · resize the selection Cmd/Ctrl+arrows · move through child layers Tab / Shift+Tab · proportional preview resize Shift+drag. Figma's help search also cites Quick Actions on Cmd/Ctrl+/.

**Bricks** [keyboard shortcuts](https://academy.bricksbuilder.io/article/keyboard-shortcuts/) (primary)
- Panels and modes: command palette ⌘/Ctrl+K · Style Manager ⌘. · Builder Browser ⌘⇧. · preview ⌘P · responsive modes ⌘B · history ⌘⇧H · view on the front end ⌘⇧V · components / structure / elements panels ⌘⇧C / X / E.
- Saving: save ⌘S · force save ⌘⇧S.
- Clipboard and history: copy / paste ⌘C / V · undo / redo ⌘Z / ⌘⇧Z.
- Elements: insert outside the current parent, hold ⌘ · duplicate ⌘⇧D · delete ⌘Del · wrap ⌘⇧P · templates ⌘⇧L.
- Navigation: next, previous, first child or parent ⌘⇧+↓/↑/→/←.
- Control panel: Quick Access group ⌘⌥+number · Style Manager tabs 1-8 · setting search ⌘⇧F · classes UI ⌘Enter · spacing modifier, hold Shift.
- Other: close Esc · focus the toolbar ⌥T.

**Breakdance** [keyboard shortcuts](https://breakdance.com/documentation/builder/workflow/keyboard-shortcuts/) (primary, search extract; the page itself returned 404)
- Panels and modals: add panel ⌘A · design sets ⌘B · rich-text modal ⌘E (Rich Text element only) · help ⌘? or ⌘⇧/.
- Editing: save ⌘S · undo / redo ⌘Z / ⌘⇧Z · copy / paste / cut / duplicate ⌘C / V / X / D · deactivate or close Esc · delete Backspace or Delete · go to the parent ⇧Esc.
- View: next breakpoint ⌘⌥R · scale to fit or actual size ⌘⇧S.
- Jump keys: Custom CSS «C S S» · class area «C L A» · property search F.

**Divi 5** [shortcuts](https://help.elegantthemes.com/en/articles/12992094) (primary, 3 Dec 2025)
- Page: save ⌘S · save a draft ⌘⇧S · undo ⌘Z · redo Ctrl+Y / ⌘⇧Z · exit ⌘E · zoom ⌘+ / ⌘- · page settings O · portability P · shortcut helper ? (or Shift+?).
- Modules: copy / cut / paste ⌘C / X / V · copy the design ⌥⌘C · paste the design ⌥⌘V · duplicate ⌘⇧D · delete ⌘⌫.
- Layout: add a row R+1-4 · full-width row R+F · add a section S+1 · column structure C+1-4.
- Other: leave inline editing Esc · Command Center ⌘K.

**Oxygen 6** (partial) [keyboard shortcuts](https://oxygenbuilder.com/documentation/builder/workflow/keyboard-shortcuts/) (primary, search extract; the page itself returned 404)
- Structure panel ⌘⇧E · Variables panel ⌘⇧V · Selectors panel ⌘⇧G.

**Tilda** [shortcuts cheat sheet](https://blog-en.tilda.cc/tpost/f5romae4h1-tilda-shortcuts-cheat-sheet) (primary, 5 Jun 2025)
- Page editor: UI ⌘P · preview ⌘⇧P · undo / redo ⌘Z / ⌘⇧Z · grid G · blocks map ⌘L.
- Blocks: copy / cut / paste / duplicate ⌘C / X / V / D · move ⇧↑/↓ · hide ⇧H · delete ⇧⌫.
- Panels: settings ⇧S · content ⇧C · library ⇧A · generate text ⇧G · save ⌘S · save and close ⌘⇧S · panel ⌘/.
- Zero Block: screen type ⌘1-5 · grid G · settings Tab · hide the controls F · opacity 0-9 · lock L · select all ⌘A · move ⇧+arrows · delete Backspace · horizontal guide ⌘H · vertical guide ⌘⇧H.

**Readymag** (partial) [12 time-savers](https://blog.readymag.com/12-time-savers-to-speed-up-your-workflow-in-readymag-b524df588574/) (primary, 2019)
- Selection and clipboard: select within a group ⌘-click · cut / paste ⌘X / V.
- Resize and zoom: resize ⌘+arrows (×10 with Shift) · transparency 0-10 · zoom ⌘+ / ⌘- · copy or paste animation settings ⇧⌘C / V.
- Other: bind widgets while dragging V/F · widgets panel W.

**Carrd** [keyboard shortcuts](https://carrd.com/docs/building/keyboard-shortcuts) (primary)
- Editing: copy / cut / paste / clone Ctrl+C / X / V / D · delete Del · undo / redo Ctrl+Z / Ctrl+Shift+Z.
- Publishing: quick publish Ctrl+S · publish Ctrl+Shift+S.
- Views and panels: view the site Alt+V · preview animations Alt+P · desktop / mobile cropped / mobile expanded Alt+1 / 2 / 3 · elements Alt+E · sections Alt+S · move the interface Alt+← / →.

**Duda** [keyboard shortcuts](https://support.duda.co/hc/en-us/articles/26519260000279) (primary, search extract; the page returned 403)
- Editor: preview Ctrl+Alt+P · Dev Mode Ctrl+Alt+C · original site Ctrl+O · copy / paste Ctrl+C / V · undo / redo Ctrl+Z / Y · backup Ctrl+S · Quick Access Ctrl+K.
- Flex sections: duplicate Ctrl+D · redo Shift+Ctrl+Z · move backward Ctrl+[.

**Shopify theme editor** (the full list is in the app on Ctrl/⌘+/) [keyboard shortcuts](https://help.shopify.com/en/manual/productivity-tools/keyboard-shortcuts) (primary), [additional theme editor shortcuts](https://changelog.shopify.com/posts/additional-keyboard-shortcuts-for-the-theme-editor) (primary, 15 Mar 2024)
- Undo Ctrl+Z · redo Ctrl+Y · save Ctrl+S (⌘⇧S on Mac) · preview inspector Ctrl+Shift+` · Sidekick Ctrl+. · hide or show sections and blocks Ctrl+Shift+H.

**Webstudio** [shortcuts](https://docs.webstudio.is/university/foundations/shortcuts) (primary)
- General: undo / redo ⌘Z / ⌘⇧Z · Esc · commands ⌘K · hide the UI ⌘\ · help ⌘/.
- Navigator editing: copy / cut / paste / duplicate ⌘C / X / V / D · Navigator z · Add a · edit a component Enter · rename ⌘E.
- Navigator tree and selection: expand / collapse → / ← · expand all ⌥-click · toggle the selection ⌘-click · range ⇧-click · extend ⇧↑/↓ · select siblings ⌘A.
- Navigator moving: move Ctrl+↑/↓ · outdent Ctrl+← · indent Ctrl+→.
- Pages panel: copy / paste / duplicate / delete ⌘C / V / D / Backspace.
- Style panel: open s · Style Sources ⌘Enter · reset ⌥-click · reset all sides ⇧⌥-click · all sides ⇧drag or ⇧Enter · two sides ⌥drag or ⌥Enter · ±10 ⇧↑/↓ · ±0.1 ⌥↑/↓ · computed variable value, hold ⌥.
- Settings: open d.
- Modes and top bar: design ⌘⇧D · content ⌘⇧C · preview ⌘⇧P · page settings ⌥-click a page · breakpoints by number keys.

### What the sets agree on

The conventions below recur across the 19 sets. A site owner who has used one builder will try them first in Urd.

| Convention | Builders that use it | Urd |
|---|---|---|
| Ctrl/⌘+Z undo; Ctrl/⌘+Shift+Z or Ctrl+Y redo | All with a published list | Same |
| Ctrl/⌘+C, X, V | All with a published list | C and V; no cut |
| Ctrl/⌘+D duplicate | Webflow, Wix Studio, Wix Editor, Squarespace, Elementor, Breakdance, Carrd, Duda, Tilda, Webstudio; WordPress, Bricks and Divi use Ctrl/⌘+Shift+D | Same (Ctrl+D) |
| Delete or Backspace deletes | Nearly all | Same |
| Esc deselects or closes | Webflow, Wix Studio, Wix Harmony, WordPress, Bricks, Breakdance, Webstudio | Same |
| Ctrl/⌘+K opens a command palette or quick find | WordPress, Framer, Webflow, Bricks, Divi, Duda, Webstudio (Elementor uses Ctrl+E for its Finder and Ctrl+K for Site Settings) | None (E1) |
| Ctrl/⌘+K makes a link inside text | WordPress, Squarespace; WordPress resolves the clash with the palette by context | None (E33) |
| Arrows nudge 1 px, Shift+arrows 10 px | Wix Studio, Wix Harmony, Wix Editor; Excalidraw in code uses 1 and 5 px [constants.ts](https://github.com/excalidraw/excalidraw/blob/master/packages/common/src/constants.ts) (code) | Grid step, and 1 px with Shift (E32) |
| Ctrl/⌘+arrows resize | Squarespace, Readymag, Figma Sites (Wix Harmony uses Alt+arrows) | None (E30) |
| Alt/Option+drag duplicates | Webflow, Wix Studio, Wix Harmony, Wix Editor | None (E30) |
| Shift+drag locks the axis | Wix Studio, Wix Harmony, Wix Editor | The same since 14 October 2026; free placement moved to Ctrl/⌘ (E31) |
| Shift while rotating gives 15° steps | Wix Harmony, Wix Editor, Figma Sites | 15° steps by default, Shift gives 1° |
| Ctrl/⌘+G groups | Wix Harmony, WordPress | None (grouping is watched, FEATURES.md) |
| Ctrl/⌘+A selects all | Squarespace, WordPress (again for the parent), Wix Harmony, Tilda, Webstudio (siblings) | None (E30) |
| Tab / Shift+Tab to the next or previous element | Wix Harmony, Squarespace, Framer, Figma Sites | None (E30, E9) |
| A shortcut list on Shift+/ or ? | Webflow Shift+/, Wix Harmony Shift+/ (help), Wix Editor ?, Divi ?, Breakdance ⌘⇧/, Elementor Ctrl+?, Figma Ctrl+Shift+?; Wix Studio and Shopify Ctrl+/, Webstudio ⌘/, WordPress Shift+Alt+H | None (E21) |
| Ctrl/⌘ +, - and 0 zoom | Wix Studio, Wix Harmony, Divi, Readymag, Figma Sites | A zoom control in the preview, with Fit; no keys |
| Number keys or Ctrl+J switch the device view | Webflow 1-4, Carrd Alt+1-3, Tilda ⌘1-5, Webstudio, Wix Ctrl+J | None |
| Ctrl/⌘+S saves or publishes | Wix, WordPress, Elementor, Bricks, Breakdance, Divi, Tilda, Carrd, Duda, Shopify | None: drafts save themselves in the browser, and publishing is a button |
| Region keys: F6 or Ctrl+`, Alt+F10 into the toolbar | WordPress, Figma Sites (F6), Bricks (⌥T) | None (E9) |
| Single letters without a modifier open panels | Webflow (A, P, Z, J, S, D, H), Webstudio, Tilda (G), Squarespace (G), Divi (O and P, and R, S or C with a number), Breakdance (F) | «/», and 1, 2 and 3 for the element menu's areas |

Pasting styles is where the keys split the field most: Elementor uses Ctrl/⌘+Shift+V for paste style, Squarespace uses the same key for paste as plain text, WordPress and Urd use Ctrl+Alt+V for paste styles, and Divi uses ⌥⌘V for paste design.

**How Urd differs.** Three of Urd's conventions run against the field:
- **The nudge.** An arrow moves a block by one grid step, and Shift+arrow by 1 px. The field moves 1 px per press and 10 px with Shift; Excalidraw moves 1 and 5. Urd's step suits a snap grid, but a site owner coming from Wix will expect the opposite. E32 weighs it.
- **Shift while dragging.** Urd follows the field since 14 October 2026: Shift locks the axis, and Ctrl/⌘ turns snapping and smart guides off, as Excalidraw and tldraw do [snapping.ts](https://github.com/excalidraw/excalidraw/blob/master/packages/excalidraw/snapping.ts), [SnapManager.ts](https://github.com/tldraw/tldraw/blob/main/packages/editor/src/lib/editor/managers/SnapManager/SnapManager.ts) (code). Moving free placement to Ctrl/⌘ (E31) frees Shift for the axis lock (E30).
- **Rotation.** Urd snaps to 15° by default with Shift for free degrees; Wix does the reverse.

The «/» key matches Gutenberg, Notion and Ghost, but opens the block menu rather than changing the block type.

## Recommendations

These are delivery recommendations: how Urd should offer what it has. They follow the order of the patterns in Part 1, then the editor mechanics behind the shortcut sets. Missing elements are ranked in Part 2, feature gaps in [FEATURES.md](FEATURES.md), and build techniques in [CODE.md](CODE.md). The milestone names are those of [BACKLOG.md](../BACKLOG.md).

### Open

| ID | What | Who does it (with source) | Fit for Urd | Status |
|---|---|---|---|---|
| E1 | **Command palette** on Ctrl/⌘+K: insert a block or preset by name, jump to a page, section or panel, run actions, with recent and suggested commands; plugins can register commands. Inside a text field, Ctrl/⌘+K stays the link key | WordPress 7.0/7.1 [wordpress.org/news](https://wordpress.org/news/?p=20583) (primary), [command palette](https://wordpress.org/documentation/article/site-editor-command-palette/) (primary); Framer [Quick Actions](https://www.framer.com/updates/quick-actions) (primary); Webflow [Quick find](https://help.webflow.com/hc/en-us/articles/33961382093587-Quick-find) (primary); Bricks 2.0 [release](https://bricksbuilder.io/release/bricks-2-0/) (primary); Divi 5 [Command Center](https://help.elegantthemes.com/en/articles/13741079) (primary) | Medium-high: for the regular editor, built on `palette-search.js`; a themed dialog (ADR-0009), keyboard-first | Taken: 0.7.10 Intuitiveness and editor polish |
| E2 | **Clearer drop indicators:** the target section and position drawn while dragging a block between sections, and a placement line in the mobile row grid that never shows an error state | Webflow two-colour indicator [Add panel](https://help.webflow.com/hc/en-us/articles/33961270096659-The-Add-panel) (primary); Webstudio [dnd README](https://github.com/webstudio-is/webstudio/blob/main/packages/design-system/src/components/primitives/dnd/README.md) (code) | Medium-high, low-medium effort; the desktop frames have no parent to show, so the gain is the section target and the mobile line | Taken: 0.7.10 Intuitiveness and editor polish |
| E3 | **Paste pipeline:** one allowed-HTML schema shared by the sanitiser and the paste cleaner; filters for Word, Google Docs and Slack; a pasted URL becomes a link; pasted Markdown becomes formatting; `plaintext-only` single-line fields. Figma import is not taken (Figma arrives as SVG, CSS and tokens in v0.8 OL own looks, or as Lottie in v0.8 Animation files) | Gutenberg [paste-handler.ts](https://github.com/WordPress/gutenberg/blob/trunk/packages/blocks/src/api/raw-handling/paste-handler.ts), [phrasing-content.ts](https://github.com/WordPress/gutenberg/blob/trunk/packages/dom/src/phrasing-content.ts) (code); Ghost [KoenigBehaviourPlugin.tsx](https://github.com/TryGhost/Koenig/blob/main/packages/koenig-lexical/src/plugins/KoenigBehaviourPlugin.tsx) (code); Puck [InlineTextField](https://github.com/puckeditor/puck/blob/main/packages/core/components/InlineTextField/index.tsx) (code); Webstudio [docs index](https://docs.webstudio.is/llms.txt) (primary) | High: no library, and one schema replaces two lists; the mechanics are in CODE.md | Taken: 0.7.10 Intuitiveness and editor polish |
| E4 | **Element manager:** hide the block types a site does not use, widening the «shop is on» gating of the commerce blocks | Bricks 2.0 Element Manager [release](https://bricksbuilder.io/release/bricks-2-0/) (primary) | High: a shorter palette for a small club; the commerce blocks are the first case | Taken: 0.7.10 Intuitiveness and editor polish |
| E5 | **«Which layout tool?» as a help chip:** when to use a preset, free placement, a height that follows the content, «fit: shrink», pinning or a mobile override | Wix Studio [flexbox or grid](https://support.wix.com/en/article/studio-editor-choosing-between-flexbox-based-and-grid-based-tools) (primary) | High, low effort: the help-chip rule ([ADR-0008](../adr/0008-help-chip-rule.md)) | Taken: 0.7.10 Intuitiveness and editor polish |
| E6 | **Layers panel:** the blocks of a section as a list, with select, rename, reorder (z), lock and hide in the editor; as a roving-tabindex tree for the keyboard | Squarespace Finish Layer [blog](https://www.squarespace.com/blog/finish-layer-website-design-tools) (primary); Wix Studio [layers](https://support.wix.com/en/article/studio-editor-working-with-layers) (primary); WordPress [List View](https://wordpress.org/documentation/article/list-view/) (primary); Gutenberg [tree-grid](https://github.com/WordPress/gutenberg/blob/trunk/packages/components/src/tree-grid/index.tsx) (code) | High: the only sure way to reach a block under another on a free canvas | Taken: 0.7.9 Design stretch (the keyboard tree: 0.7.11 Accessibility round) |
| E7 | **Zoom-out overview:** the page shown small, with sections moved from above | WordPress zoom-out view Ctrl+Shift+0 [shortcuts](https://wordpress.org/documentation/article/keyboard-shortcuts-block-editor/) (primary); Tilda blocks map ⌘L [cheat sheet](https://blog-en.tilda.cc/tpost/f5romae4h1-tilda-shortcuts-cheat-sheet) (primary) | Medium: long pages, such as an event archive | Taken: 0.7.10 Intuitiveness and editor polish |
| E8 | **Page duplication** in the Pages panel | Webstudio Pages panel [shortcuts](https://docs.webstudio.is/university/foundations/shortcuts) (primary); the Pages panels of Webflow, Wix, Bricks and Divi | High, low effort: a copy of the page JSON with new ids and a free slug | Taken: 0.7.10 Intuitiveness and editor polish |
| E9 | **Region navigation by keyboard:** F6 and Ctrl+` between the panels and the canvas, Alt+F10 into the floating toolbar and Escape back, focus sentinels around the iframe, and Tab between blocks | WordPress [shortcuts](https://wordpress.org/documentation/article/keyboard-shortcuts-block-editor/) (primary); Gutenberg [navigable-toolbar](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/navigable-toolbar/index.jsx) (code); Figma Sites F6 [keyboard use](https://help.figma.com/hc/en-us/articles/360040328653) (primary); Bricks ⌥T [shortcuts](https://academy.bricksbuilder.io/article/keyboard-shortcuts/) (primary) | High: the editor has no keyboard route between its regions today (BACKLOG 0.7.11) | Taken: 0.7.11 Accessibility round |
| E10 | **Curated design tokens as one choice:** font packs and palette themes picked as a whole | Squarespace Site Themes [Search Engine Journal](https://www.searchenginejournal.com/squarespace-rolls-out-new-ai-tools-for-seo-and-design/557220/) (secondary); WordPress style variations [Styles overview](https://wordpress.org/documentation/article/styles-overview/) (primary) | High, low-medium effort: the tokens are already one file, `content/theme.css` | Taken: 0.7.9 Design stretch |
| E11 | **Style book and design-system aids:** a style-book page, hover preview of fonts and colours, «use this block's style as the site default», a spacing scale, and brand or seasonal modes beyond light and dark as part of «save your own theme», with theme export | WordPress Style Book and Apply Globally [Styles overview](https://wordpress.org/documentation/article/styles-overview/) (primary); Bricks hover preview and scales [2.2](https://bricksbuilder.io/release/bricks-2-2/) (primary); Webflow [variable modes](https://webflow.com/updates/variable-modes) (primary) | Medium-high: a club's welcome-week («fadderuke») or jubilee look as a mode, not a new theme | Taken: 0.7.9 Design stretch |
| E12 | **Synced global blocks** `{ref, overrides}` with detach, where only named fields can be overridden: one footer card, contact card or sponsor strip used on several pages | GrapesJS [SymbolUtils.ts](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/dom_components/model/SymbolUtils.ts) (code); Gutenberg [pattern-overrides.js](https://github.com/WordPress/gutenberg/blob/trunk/packages/editor/src/bindings/pattern-overrides.js) (code); Webflow [components](https://help.webflow.com/hc/en-us/articles/51307110086547) (primary) | High, but it crosses the migration contract ([ADR-0005](../adr/0005-versioning-and-migration.md)) | Taken: After v1.0 synced global blocks |
| E13 | **Button states** (hover, focus, active) as part of the design gallery | WordPress 7.1 [developer.wordpress.org](https://developer.wordpress.org/news/2026/08/whats-new-for-developers-august-2026/) (primary); Elementor V4 [4.0](https://elementor.com/blog/editor-40-atomic-forms-pro-interactions/) (primary); Webflow [States](https://help.webflow.com/hc/en-us/articles/33961301727251) (primary, search extract) | Medium: CSS only, offered as designs rather than a state editor | Taken: 0.7.9 Design stretch |
| E14 | **Desktop and phone side by side** on one canvas | Webflow breakpoint canvas [we-r.co](https://www.we-r.co/en/blog/nouveautes-designer-webflow-conf-2026) (secondary); Figma Sites [breakpoints](https://help.figma.com/hc/en-us/articles/31242797809815) (primary) | Medium: two iframes on one postMessage bridge double the render cost | Taken: v0.8 PH-1 the phone side of the canvas, to be weighed once the row grid stands |
| E15 | **Elements shown only on the phone,** the counterpart of hide on mobile | Wix Harmony [mobile](https://support.wix.com/en/article/wix-harmony-editor-adjusting-your-site-for-mobile) (primary); Squarespace [mobile overrides](https://squarespace.com/blog/product-updates-may-2026) (primary) | High: the row grid already carries per-block overrides | Taken: 0.7.3 mobile rethink |
| E16 | **Responsive AI fix:** one click that rearranges a section for mobile | Wix Studio [Responsive AI](https://support.wix.com/en/article/studio-editor-building-a-responsive-site) (primary); Wix Harmony «Fix layout» [introducing Harmony](https://support.wix.com/en/article/introducing-the-wix-harmony-editor) (primary) | Low: the row grid follows the desktop by rule (ADR-0019), and mobile review flags drift | Not taken: AI goes through the local MCP server ([ADR-0017](../adr/0017-ai-via-local-mcp-server.md)); an in-editor fix would need the admin-assistant ADR that ADR-0017 leaves open |
| E17 | **Whole-site templates (design kits):** a set of pages, theme and presets installed together | Wix Studio Design Kits [adding elements](https://support.wix.com/en/article/studio-editor-adding-elements-4240855) (primary); Bricks design sets [2.1](https://bricksbuilder.io/release/bricks-2-1/) (primary) | Medium: Urd has page templates as starter packs | Taken: v0.8 whole-site templates (the template model) |
| E18 | **AI generator in the editor** for a site, page, section or block | Wix Harmony [AI tools](https://support.wix.com/en/article/wix-harmony-editor-about-the-ai-tools) (primary); Duda [Copilot](https://duda.co/product-updates/from-prompt-to-published-meet-copilot-in-editor-2-0) (primary); Divi 5.12 [release notes](https://www.elegantthemes.com/blog/divi-resources/divi-5-12-release-notes) (primary) | Low: it needs an external service and a key in the core | Not taken: no generator; AI goes through the local MCP server ([ADR-0017](../adr/0017-ai-via-local-mcp-server.md)) |
| E19 | **The local MCP server as Urd's AI delivery:** typed abilities over the schema, writes that land as uncommitted files for the site owner to review, commit and publish (ADR-0017), and agent instructions built from the theme tokens and returned by a read tool | Framer 3.0 external agents on branches [Framer branches](https://www.framer.com/help/articles/how-to-use-branches-in-framer/) (primary); Webflow MCP v1.3 [changelog](https://developers.webflow.com/home/changelog/2026/5/21) (primary); WordPress MCP Adapter [developer.wordpress.org](https://developer.wordpress.org/news/2026/02/from-abilities-to-ai-agents-introducing-the-wordpress-mcp-adapter/) (primary); WordPress.com drafts by default [TechCrunch](https://www.techcrunch.com/2026/03/20/wordpress-com-now-lets-ai-agents-write-and-publish-posts-and-more/) (secondary) | High: the repo is the site, content is JSON with schemas, and `guard.js` is already the permission model (ADR-0017) | Taken: v0.8 MCP read, v0.9 MCP write |
| E20 | **Richer empty states:** preset suggestions in an empty section and on an empty page | Wix Harmony template- or AI-first start [about Harmony](https://support.wix.com/en/article/about-the-new-wix-harmony-editor) (primary); empty-state components in [Untitled UI](https://www.untitledui.com/react/components) and [shadcn/ui](https://ui.shadcn.com/docs/components) (primary) | High, low effort: the presets and thumbnails exist | Taken: 0.7.10 Intuitiveness and editor polish |
| E21 | **Shortcut cheat sheet** on Shift+/ and from the help chip, listing Urd's keys | Webflow Shift+/ [shortcuts](https://help.webflow.com/hc/en-us/articles/33961359609875) (primary, search extract); WordPress Shift+Alt+H [shortcuts](https://wordpress.org/documentation/article/keyboard-shortcuts-block-editor/) (primary); Wix Studio Ctrl+/ [shortcuts](https://support.wix.com/en/article/studio-editor-keyboard-shortcuts) (primary); 14 of the 24 builders in all | High, low effort: today the keys are found only by accident | Taken: 0.7.10 Intuitiveness and editor polish |
| E22 | **Comments and notes on blocks,** with mentions | WordPress Notes [WPBeginner](https://www.wpbeginner.com/news/whats-new-in-wordpress-6-9/) (secondary), [Roadmap to 7.1](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/) (primary); Webflow comment-only links [Conf 2025](https://community.webflow.com/updates/post/webflow-conf-2025-recap-everything-we-announced-7cOUvmz6EGiMlL4) (primary) | Medium for a board with several editors; it needs stored threads beyond the browser drafts | Watch: After v1.0 PR per draft (review comments on the pull request) |
| E23 | **Visual revision diff:** what a publish changed, shown on the page | WordPress 7.0 [Gutenberg Times](https://gutenbergtimes.com/wordpress-7-0-source-of-truth/) (secondary); 7.1 shareable revision URLs [Roadmap to 7.1](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/) (primary) | Medium: git holds every publish, and «Undo the publish» exists | Watch: After v1.0 PR per draft (a diff per draft) |
| E24 | **Content-only editing mode:** text and pictures editable, layout locked | WordPress 7.0 content-only patterns [Gutenberg Times](https://gutenbergtimes.com/wordpress-7-0-source-of-truth/) (secondary); Webflow Marketer role [releases.sh](https://releases.sh/webflow/webflow-product-updates.md) (secondary); Framer content-editor seats [framer.com/blog](https://www.framer.com/blog/ai-credits-simpler-plans-and-lower-prices/) (primary); Framer On-Page Editing [updates](https://framer.com/updates/on-page-editing) (primary) | Medium-high: protects the design when the board changes every year | Taken: v0.9 content-only editing mode (to be weighed) |
| E25 | **Draft branches with preview links and review:** a draft as a branch, publishing as a merge, a Cloudflare Pages preview per draft | Framer 3.0 branches (Pro) [Framer branches](https://www.framer.com/help/articles/how-to-use-branches-in-framer/) (primary); Webflow page branching, Enterprise-only [help.webflow.com](https://help.webflow.com/hc/en-us/articles/33961355506195) (primary); Wix change requests [wix.com/updates](https://www.wix.com/updates) (primary) | High: git and Pages previews are already there, and rivals put this behind their top plans | Taken: After v1.0 PR per draft |
| E26 | **Audit panel,** with the count of open issues in the publish dialog: alt text, empty links, heading order and the heading outline, contrast, `lang`, form labels, broken internal links, and a warning when a PDF is uploaded | Webflow Audit panel [webflow.com/updates](https://webflow.com/updates/find-and-fix-accessibility-issues-with-new-audit-panel) (primary); Wix Accessibility Wizard [support.wix.com](https://support.wix.com/en/article/accessibility-about-the-accessibility-wizard-in-the-studio-editor) (primary); Elementor Ally [TechRadar](https://www.techradar.com/pro/website-building/elementor-just-made-it-easier-to-improve-website-accessibility) (secondary); Duda SEO Overview [seo tools](https://duda.co/features/seo-tools) (primary) | High: it runs over the JSON and the preview DOM, and associations are covered by forskrift om universell utforming av IKT [Uutilsynet](https://www.uutilsynet.no/regelverk/regelverk-og-krav/746) (primary) | Taken: v0.8 AU-1 the accessibility audit panel |
| E27 | **Checks at the point of choice:** an AA/AAA contrast grade in the colour picker, and a «decorative» toggle on images | Webflow contrast [webflow.com/updates](https://webflow.com/updates/check-text-accessibility-with-built-in-color-contrast-ratio-tool) (primary); Duda [accessibility](https://www.duda.co/accessibility) (primary); WordPress 7.1 decorative toggle [developer.wordpress.org](https://developer.wordpress.org/news/2026/08/whats-new-for-developers-august-2026/) (primary) | High: pure client-side maths and one flag | Taken: 0.7.11 Accessibility round |
| E28 | **One view of the images without alt text,** edited in place | Duda Alt Text Manager [seo tools](https://duda.co/features/seo-tools) (primary) | High: belongs where the images are listed | Taken: v0.8 AU-1 the audit panel's alt-text list |
| E29 | **Undo quality:** selection and caret stored with each entry and restored; typing, slider and drag changes coalesced; redo kept on selection-only changes; no-op entries dropped; Escape mid-drag bails without a redo entry | Gutenberg [actions.js](https://github.com/WordPress/gutenberg/blob/trunk/packages/editor/src/store/actions.js) (code); Plasmic [undo-log.ts](https://github.com/plasmicapp/plasmic/blob/master/platform/wab/src/wab/client/undo-log.ts) (code); Craft.js [History.ts](https://github.com/prevwong/craft.js/blob/main/packages/utils/src/History.ts) (code); Excalidraw [history.ts](https://github.com/excalidraw/excalidraw/blob/master/packages/excalidraw/history.ts) (code); tldraw [HistoryManager.ts](https://github.com/tldraw/tldraw/blob/main/packages/editor/src/lib/editor/managers/HistoryManager/HistoryManager.ts) (code) | High: Urd's undo replaces the whole draft (`draftStore.js:74`), so these are cheap wins on the same snapshot model; the mechanics are in CODE.md | Taken: 0.7.10 Intuitiveness and editor polish |
| E30 | **Canvas functions:** select all; Tab to the next block; copy and paste styles only, animation included; match size; resize by keyboard (Ctrl+arrows); Shift to lock the axis while dragging; Alt+drag to duplicate; distances on Alt+hover; shortcuts to insert before or after and to add a page or a section | Wix Studio [shortcuts](https://support.wix.com/en/article/studio-editor-keyboard-shortcuts) (primary); Wix Harmony [shortcuts](https://support.wix.com/en/article/wix-harmony-editor-keyboard-shortcuts) (primary); Squarespace [shortcuts](https://support.squarespace.com/hc/en-us/articles/214491097) (primary); WordPress [shortcuts](https://wordpress.org/documentation/article/keyboard-shortcuts-block-editor/) (primary); Wix Editor match size [keyboard shortcuts](https://support.wix.com/en/article/keyboard-shortcuts-for-the-editor) (primary) | High: these are the field's habits; the Shift change depends on E31 | Taken: 0.7.10 Intuitiveness and editor polish; delivered in part: styles pasted with the animation (0.7.20.8) and Shift to lock the axis (0.7.26.3) |
| E32 | **The nudge convention, weighed:** the field moves 1 px per arrow and 10 px with Shift (Excalidraw 1 and 5); Urd moves one grid step, and 1 px with Shift | Wix Studio [shortcuts](https://support.wix.com/en/article/studio-editor-keyboard-shortcuts) (primary); Excalidraw [constants.ts](https://github.com/excalidraw/excalidraw/blob/master/packages/common/src/constants.ts) (code) | Medium: the grid step suits the snap grid, the field's habit suits newcomers | Taken: 0.7.10 Intuitiveness and editor polish (weighed there) |
| E33 | **Text shortcuts:** heading levels, alignment, paste as plain text (Ctrl+Shift+V), a link on Ctrl+K, and `tel:` links | Squarespace [shortcuts](https://support.squarespace.com/hc/en-us/articles/214491097) (primary, 5 Nov 2025); WordPress [shortcuts](https://wordpress.org/documentation/article/keyboard-shortcuts-block-editor/) (primary) | High, low effort: the floating text toolbar already has every action | Taken: 0.7.10 Intuitiveness and editor polish |
| E38 | **Own looks on Urd's elements:** an exported SVG or image as a 9-slice face with state files, CSS copied from the design tool kept whole as a scoped style, and the pointer as custom properties, all on Urd's own blocks | Figma Dev Mode [help.figma.com](https://help.figma.com/hc/en-us/articles/15023124644247) (primary); Penpot Inspect [help.penpot.app](https://help.penpot.app/user-guide/inspect/) (primary); SVGator export [svgator.com](https://www.svgator.com/help/export-and-file-formats/what-export-options-are-available) (primary) | High: CSS, SVG and images the browser renders itself, no runtime | Taken: v0.8 OL-3 faces |
| E39 | **The Animation block:** Lottie, dotLottie, Rive and glTF files from `media/` played by vendored MIT players as shipped plugins, on the page, with a still frame under reduced motion and the site-wide pause | Webflow Lottie [help.webflow.com](https://help.webflow.com/hc/en-us/articles/33961351058835) (primary); Framer Rive plugin [framer.com](https://www.framer.com/marketplace/plugins/rive/) (primary); lottie-web [github.com](https://github.com/airbnb/lottie-web) (code); dotlottie-web [README](https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@0.81.0/README.md) (primary); rive-wasm [LICENSE](https://github.com/rive-app/rive-wasm/blob/master/LICENSE) (code) | Medium: the players are data-driven and MIT; the WASM ones need `'wasm-unsafe-eval'` | Taken: v0.8 Animation files |
| E40 | **The tokens importer:** a DTCG, Tokens Studio or Figma token file mapped onto the theme's tokens in a mapping step | DTCG 2025.10 [designtokens.org](https://www.designtokens.org/tr/2025.10/format/) (primary); Penpot tokens [help.penpot.app](https://help.penpot.app/user-guide/design-tokens/) (primary); Figma variables export [help.figma.com](https://help.figma.com/hc/en-us/articles/15343816063383) (primary) | High: JSON read in the editor | Taken: v0.8 OL-5 the tokens importer |
| E41 | **Page link card:** a card that links to another page of the site with its title, description and social image, read from the page registry and the page's meta | Squarespace [page link blocks](https://support.squarespace.com/hc/en-us/articles/206544037-Add-links-to-other-pages-of-your-site) (primary); Ghost and Notion bookmark cards for outside links (#274) | High: nothing is fetched, the registry and `meta.og` are in the repo | Taken: ER-G, with the link preview card |
| E42 | **Hidden field filled from the page address:** a form field the visitor does not see, filled from the query (`?kilde=plakat`), so a sign-up says which poster, QR code or newsletter brought it | Squarespace [form fields](https://support.squarespace.com/hc/en-us/articles/205814018-Form-fields-explained) (primary) | High: a few lines of `URLSearchParams` in the form block, sent in mailto and endpoint mode, named on the privacy page | Taken: ER-E |

### Closed

| ID | What | Who does it (with source) | Fit for Urd | Status |
|---|---|---|---|---|
| E31 | **Snapping rework:** a snap threshold scaled by the preview zoom, Ctrl/⌘ to toggle snapping during a drag (in place of Shift), and equal-gap snapping between blocks | Excalidraw [snapping.ts](https://github.com/excalidraw/excalidraw/blob/master/packages/excalidraw/snapping.ts) (code); tldraw [SnapManager.ts](https://github.com/tldraw/tldraw/blob/main/packages/editor/src/lib/editor/managers/SnapManager/SnapManager.ts), [BoundsSnaps.ts](https://github.com/tldraw/tldraw/blob/main/packages/editor/src/lib/editor/managers/SnapManager/BoundsSnaps.ts) (code) | High: Urd's frames are free-canvas territory, like tldraw and Excalidraw | Delivered 0.7.26.3 |
| E34 | Content/Style split of the inspector, with the panel language rolled out | Elementor [tabs](https://developers.elementor.com/docs/editor/elementor-tabs/) (primary); Bricks [interface tour](https://academy.bricksbuilder.io/getting-started/interface-tour/) (primary) | Very high ([ADR-0016](../adr/0016-panel-language.md)) | Delivered 0.6.6.6.2 |
| E35 | Slash command and a searchable insert palette | Ghost [cards](https://ghost.org/help/cards/) (primary); WordPress [shortcuts](https://wordpress.org/documentation/article/keyboard-shortcuts-block-editor/) (primary) | High | Delivered 0.6.7.6 (search) and 0.6.7.7 (slash on the canvas) |
| E36 | Reusable block groups, the snippets model | Ghost [snippets](https://ghost.org/help/snippets/) (primary) | High | Delivered 0.6.7.5 |
| E37 | Section gallery with «Change layout» | Squarespace Layout Switcher [Search Engine Journal](https://www.searchenginejournal.com/squarespace-rolls-out-new-ai-tools-for-seo-and-design/557220/) (secondary) | High | Delivered 0.6.7.9 |

### Former numbers

The old Norwegian map ELEMENTKART.md is replaced by this file and CODE.md. Its numbers, as CHANGELOG, BACKLOG and the ADRs cite them, map as follows. Its other parts (2, 3, the rest of 4, 5b, 6 and 7) are mapped where their content went: Part 2 of this file and CODE.md.

| Former number | Now |
|---|---|
| ELEMENTKART 5a.1 Innhold/Stil-splitt | E34 |
| ELEMENTKART 5a.2 Slash-kommando + søkbar palett | E35 |
| ELEMENTKART 5a.3 Gjenbrukbare grupper | E36 |
| ELEMENTKART 5a.4 Seksjons-galleri med «bytt oppsett» | E37 |
| ELEMENTKART 5a.5 Struktur/lag-tre | E6 |
| ELEMENTKART 5a.6 Tydeligere drop-target | E2 |
| ELEMENTKART 5a.7 Kuraterte designtokens som ett valg | E10 |
| ELEMENTKART 5a.8 Command palette | E1 |
| ELEMENTKART 5a.9 Rikere tomtilstander | E20 |
| ELEMENTKART 5a.10 AI-veiviser | E18 (the generator, not taken) and E19 (the MCP route) |
| LAERDOMMER 5.10 «Hvilket layout-verktøy?»-hjelpechip (cited in BACKLOG 0.7.10 as «5a.10 / LAERDOMMER 5.10») | [CODE.md](CODE.md#former-numbers) T55, the canonical mapping; the same help chip is E5 here |
| ELEMENTKART part 1 Leveringsmønstre | [Part 1](#part-1-delivery-patterns-how-features-are-offered) |
| ELEMENTKART 1.1 Innsetting | [Insertion](#insertion) |
| ELEMENTKART 1.2 Konfigurasjonsflater (also cited by ADR-0016 as «parts 1.2 and 9»; part 9 never existed) | [Configuration surfaces](#configuration-surfaces) |
| ELEMENTKART 1.3 Struktur/lag-tre | [Structure and layers](#structure-and-layers) |
| ELEMENTKART 1.4 Globalt design | [Global design](#global-design) |
| ELEMENTKART 1.5 Gjenbruk med synk | [Reuse with sync](#reuse-with-sync) |
| ELEMENTKART 1.6 Tilstander og interaksjoner | [States and interactions](#states-and-interactions) |
| ELEMENTKART 1.7 Responsiv levering | [Responsive delivery](#responsive-delivery) |
| ELEMENTKART 1.8 Seksjon-/mønster-/mal-gallerier | [Section and template galleries](#section-and-template-galleries) |
| ELEMENTKART 1.9 AI og veivisere som leveringsmåte | [AI and wizards as delivery](#ai-and-wizards-as-delivery) |
| ELEMENTKART 1.10 Tomtilstander og oppdagbarhet | [Empty states and discoverability](#empty-states-and-discoverability) |
| ELEMENTKART part 3 («Element-/funksjonskatalog») | [Part 2](#part-2-the-element-catalogue) |
| ELEMENTKART part 4, first paragraph (Leveranse-siden) | [Urd against the delivery patterns](#urd-against-the-delivery-patterns) |

---

## Part 2. The element catalogue

This part lists every element the field offers, and where Urd stands on each. The enumeration of 11 October 2026 found **313 elements at 39 builders**, taken from each vendor's own element list, source code, wordpress.org readme or developer docs, and deduplicated across them. The main component and section libraries (Relume, Tailwind Plus, shadcn/ui, Flowbite, Untitled UI, daisyUI and others) were read alongside them, for the native build and for the elements no builder lists.

- **Rows 1-313** keep the numbers of the enumeration, in its groups A to Q. No rows are merged here: the WordPress and WooCommerce rows stand one by one.
- **Rows 314-315** are the accessibility helpers that no builder offers as an element (group R).
- **Rows 316-324** are elements found outside the builders' lists, in association sites and component libraries.
- **Rows 325 and up** were added on 19 October 2026, each in its group, for elements the deepened enumeration found that no earlier row covers.

Every builder code below resolves to that builder's own list in [Sources for the catalogue](#sources-for-the-catalogue), with the date and the kind of source.

**Builder codes**

| Code | Builder | Code | Builder |
|---|---|---|---|
| EL | Elementor (Free and Pro) | WH | Wix Harmony |
| EL4 | Elementor V4 Atomic | WF | Webflow |
| BD | Breakdance | FR | Framer |
| BR | Bricks 2 | FS | Figma Sites |
| DV | Divi 5 | TL | Tilda |
| OX | Oxygen 6 | RM | Readymag |
| BB | Beaver Builder | CA | Carrd |
| WP | Gutenberg core blocks (WordPress) | DU | Duda |
| KB | Kadence Blocks | HO | Hostinger |
| SP | Spectra | GD | GoDaddy Websites + Marketing |
| OT | Otter | JI | Jimdo |
| GB | GenerateBlocks | WE | Weebly / Square Online |
| ST | Stackable | WN | Webnode |
| SQ | Squarespace 7.1 | SK | Strikingly |
| WX | Wix Editor, Wix Studio and the Wix apps | S1 | SITE123 |
| ZS | Zoho Sites | MB | Mobirise |
| NP | Nicepage | DO | Dorik |
| UM | Umso | WS | Webstudio |
| SH | Shopify Horizon (theme) | GH | Ghost |
| NO | Notion | CV | Canva websites |

EL and EL4 are one builder, so the 40 codes cover 39 builders. «all» in the Builders column is the enumeration's own word, used for four elements (heading, image, video, button). WN is listed for completeness but appears in no row of the enumeration.

**The Urd column** says where Urd stands, counted from the engine (`template/assets/engine/0.7.4`) on 11 October 2026, and from `template/assets/engine/0.7.7` on 19 October 2026 for the rows checked again that day:

| Word | Meaning |
|---|---|
| Has | Urd has it, with the detail after the colon |
| Partial | Urd covers part of it |
| Planned | an existing backlog item builds it |
| Missing | Urd does not have it |
| n/a | the element belongs to another builder model: nested flow layout, WordPress or WooCommerce internals, accounts |

**The Where column** names the place in [BACKLOG](../BACKLOG.md) the element goes, in the shared vocabulary: the 0.7.x items (`0.7.9` design stretch, `0.7.10` editor polish, `0.7.11` accessibility round, `0.7.13.14` back to top, `0.7.13.16` page index, `0.7.20` element menu, `0.7.23 Redirects`, `0.7.24 Privacy defaults`), `v1.1 the shop` ([ADR-0027](../adr/0027-a-shop-without-a-database.md)), `URGENT: Vipps migration`, the v0.8 items (baking, entry pages, product pages, responsive pictures, media library, site search to be weighed, `v0.8 AR-3` collection filters, `v0.8 AR-4` people kind, `v0.8 OL` own looks, `v0.8 AU-1` the audit panel, `v0.8 PH-1` the phone side of the canvas), v0.9 and After v1.0. **Not taken** carries its reason and **Watch** its gate. «-» means nothing to do: Urd has it, or it does not apply.

Most missing elements that are taken go to the v0.8 milestone **Element round**, in eight stages:

| Stage | Covers |
|---|---|
| ER-A Disclosure and overlays | tabs, content toggle, popup block with a drawer variant and popup links, tooltip, «show more» |
| ER-B Media and files | video in a lightbox, image hotspots, before/after, text mask, caption overlay, file list with a documents collection kind and a PDF view |
| ER-C Data display | progress bar and ring, charts, opening hours, price list, reading progress |
| ER-D Collections and carousels | carousel view for collections, load more and pagination, icon bullets, category chips on the gallery, one featured product |
| ER-E Forms | number, URL and time fields, checkbox group, range, hidden field, section break, conditional fields, multi-step, redirect after sending |
| ER-F Associations and conversion | event registration mode with ticket status, sponsor tiers, donation, membership hand-off, key-facts box, callout, job listings, directory preset, Grasrotandelen |
| ER-G Navigation and utility | breadcrumbs, HTML sitemap, any block as a link, several locations, link preview card, copy button, editable 404 text |
| ER-H Motion and time | animated headline with a pause, count-up timer, date windows on blocks |

**The Native build and pitfalls column** gives the native element or CSS technique, the [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern where one exists, and the pitfall in a few words. It follows the element research of 11 October 2026, with browser support taken from the platform pass where the two differ; the support table with Baseline dates and sources is in [CODE.md](CODE.md) part 4, and the facts used here are listed with their sources at the end of [Sources for the catalogue](#sources-for-the-catalogue). Anything not Baseline is gated the Urd way ([ADR-0011](../adr/0011-native-css-first.md)): `@supports` or a feature check, with the element in its end state as the fallback. «-» means there is nothing to build natively (WordPress internals, third-party services).

### A. Layout and structure

**Offered:** dropped from a palette or a structure tree, in the container-first model of Elementor and Bricks. **Built:** CSS grid or flex with `gap`, `<hr>` for a divider, and no absolute positioning for document structure; Urd's free placement on the desktop is the deliberate exception ([ADR-0001](../adr/0001-hybrid-editor-model.md), [ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md)).

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|1|Section (Strip (WX), Row Layout (KB), Section (GB/ST/CA))|BR BD DV KB SP OT WF WX DO CA SH BB WE SQ|full width, background, shape dividers, height|`<section>` with a heading, CSS grid or flex inside. Pitfall: wrapper bloat|Has: backgrounds, dividers, size|-|
|2|Container / Div block (Container, Div, Div Block, Flexbox, Block, Box, Element, Group)|EL EL4 BR BD OX GB SP WF WS BB OT WX ZS NP DO WP SH|flex/grid, tag, link wrapper|`<div>` or the fitting semantic tag, flex or grid with `gap`. Pitfall: wrapper bloat|n/a: free placement replaces nesting (ADR-0001, 0024)|-|
|3|Columns / Row (Columns, Column, Row, Inner Section, Advanced Columns)|WP BD DV KB ST EL JI WE CA DO|count, gap, stacking|CSS grid with `gap`; stacking by container query|n/a: free placement plus the mobile row grid|-|
|4|Grid (CSS grid) (Grid, Grid element, Layout tools grid)|EL4 BD WF NP WX GB|templates, cell span|`grid-template-areas` or spans plus container queries. Pitfall: `grid-auto-flow: dense` changes the visual order but not the DOM order, which breaks WCAG 1.3.2 and 2.4.3|n/a: the section's snap grid|-|
|5|Stack / auto-layout (Quick Stack, VFlex/HFlex, Stack, Stacks)|WF WX SQ|direction, wrap|flex with `gap` and `flex-wrap`|n/a: the push pass (ADR-0024)|-|
|6|Spacer (Spacer/Divider, vertical spacing)|EL WP ST KB SQ WE ZS JI SH|height per breakpoint|margin or `gap`, not an empty element|n/a: free placement|-|
|7|Divider / separator (Separator, Line, Horizontal Line)|EL WP BB DV BR ST SP SQ DU ZS WE DO JI GH NO SH WS|style, width, icon|`<hr>`; a purely decorative line is hidden from assistive technology|Has: line shape, line with a label|-|
|8|Reusable template / global block (Template, Global Block, Pattern, Template Part, Component, Canvas Portal, WordPress Patterns)|EL BR BD WP OX DV BB WF|synced or detached|a reference plus overrides, expanded into each page at publish|Partial: templates are copies|After v1.0: synced global blocks `{ref, overrides}`|
|9|Slot (Slot, Head Slot)|BR WF WS|component placeholder|-|n/a|Together with #8|
|10|Hero (Hero, Flex Hero, Intros, Cover, Image banner, Main Banner)|SH ST DV EL FS WF UM MB TL WE|image/video background, CTA|the first `<section>` with the page's `<h1>`; the hero image eager with `fetchpriority=high`. Pitfall: a lazy hero image (Urd today, measured; 0.7.0, T44)|Has: 4 hero presets|-|
|11|Header builder (Header Builder, Site Header, Header & Navigation, header)|BD GB KB SH FS SQ|sticky, transparent|`<header>` with `<nav>`, `position: sticky`; «stuck» styling with `scroll-state()` is Chrome-only, so behind a gate|Has: nav panel with 6 variants|-|
|12|Footer (Footer, footer-utilities)|SH WF MB FS TL SQ|columns, legal links|`<footer>` landmark with `<nav>` link groups|Has: 10 designs|-|
|13|Sidebar / widget area (Sidebar, Widgets, Widget, WordPress (widgets))|EL BR DV BB BD OX|WordPress sidebar|-|n/a (WordPress)|-|
|14|Repeater (Repeater, Grid Repeater, Repeater Field)|WX NP KB BD OX SQ|static or dynamic items|a list (`<ul>` of `<li>` or `<article>`) rendered from data, baked into the HTML at publish|Has: collections, «+ card» items|-|
|15|Link wrapper (Wrapper Link, Container Link, Link Block)|BD OX WF|whole-box link|one `<a>` around the content, or one link stretched over the box. Pitfall: links or buttons nested inside a link|Partial: only image, button and text take links|ER-G: any block as a link|
|16|Card (Card, product/collection card)|HO ST SH|image + text + CTA|`<article>` with a heading and one primary link|Has: card presets, text box, collection cards|-|
|17|Pre-designed section / wireframe (Sections, Wireframes, Design Kits, kit widgets (Contact, CTA, Zigzag))|WX EL FS SQ SH|AI/kit presets|-|Has: 39 presets, «Change layout»|-|
|18|Page break / more (Page Break, More)|WP|pagination inside posts|-|n/a|-|
|19|Horizontal scroller (Horizontal Scroller)|ST|snap scroll|`overflow-x: auto` with `scroll-snap-type`; `::scroll-button()` and `::scroll-marker` are Chrome-only, so arrows and dots need a JS fallback|Partial: gallery carousel|ER-D: carousel view for collections|
|20|Split content (Split Content)|KB|media + text halves|two grid columns that stack by container query|Has: presets, free placement|-|
|21|Media & text (Media & Text, Image Text, Text with Photo)|WP ZS JI|image side, ratio|as #20, with `aspect-ratio` on the media|Has: presets|-|

### B. Text and typography

**Offered:** inline editing with a floating toolbar, and block conversion («transform to»). **Built:** semantic `<h1>`-`<h6>`, `<p>` and `<ul>`; rich text from a document model, not raw `contenteditable`; `<table>` inside an `overflow-x: auto` wrapper.

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|22|Heading (Heading, Title, Advanced Heading, Titles)|all|H1-H6, link, icon (BD)|`<h1>`-`<h6>` in order, without skipped levels; `text-wrap: balance`|Has|-|
|23|Text / paragraph (Text Editor, Paragraph, Text, Text Basic, Advanced Text)|EL EL4 WP BR BD OX SQ HO GB WF WS ZS DO NO SH|typography, columns|`<p>`; `text-wrap: pretty`|Has|-|
|24|Rich text (Rich Text, Rich Text Editor, Rich Text Element)|BR BD OX WF BB DO|WYSIWYG, TinyMCE|semantic markup from a document model, sanitised on save|Has|-|
|25|Subtitle / dual heading (Subtitle, Dual Heading)|ST BD|two-tone heading|one heading with a `<span>` for the second tone, not two headings|Has: inline formatting|-|
|26|Animated headline (Animated Headline, Animated Heading, Animated Typing, Text Animation, Text effects, shimmering text)|EL BD BR WS WX HO SQ|typing, rotate, highlight, hand-drawn highlight in the text toolbar (SQ)|stacked spans animated with `@keyframes`; the full sentence once as visually hidden text, the animated copies `aria-hidden`. Pitfalls: `aria-live` churn; WCAG 2.2.2 applies when it runs longer than 5 s|Missing|ER-H, with a pause (WCAG 2.2.2)|
|27|Text path (Text Path)|EL|curved SVG text|SVG `<textPath>`|Missing|Not taken: low value|
|28|Marquee / running text (Text Marquee, Running text, Scrolling block, marquee, Ticker)|WX WH HO SQ SH FR|speed, direction, pause on hover|the duplicated track `aria-hidden` and `inert`; a pause control; static under reduced motion (WCAG 2.2.2)|Has: ribbon block (pauses on hover and on keyboard focus, and on a phone tap only through emulated `:hover`; a pause button, or a tap on a phone, that stays (0.7.0.51); stands still under reduced motion)|-|
|29|Text mask (Text mask)|WX|image/video inside text|`background-clip: text` over the image; the text stays real text|Missing|ER-B: `background-clip: text`|
|30|Collapsible text / show more (Collapsible text, Show More, Expand/Show More)|WX WH KB ST|line clamp|`<details>`, or a line clamp plus a button with `aria-expanded`. Pitfall: collapsed text that find-in-page cannot reach; `hidden="until-found"` keeps it findable|Missing|ER-A: `<details>` read-more|
|31|Blockquote (Quote, Blockquote)|WP EL BD SP ST SQ WF WS NO|citation, style|`<figure>` with `<blockquote>` and a `<figcaption>` for the source|Has: quote|-|
|32|Pullquote (Pullquote)|WP|emphasised quote|as #31, set larger|Has: quote, large|-|
|33|List (List, List Item, Basic List, bulleted/numbered/to-do)|WP BR BB DO WF NO DU|ordered/unordered|`<ul>` or `<ol>`|Has: text lists|-|
|34|Icon list / checklist (Icon List, Checkmark List)|EL BR DV KB ST SP OT BD|icon per item, links|`<ul>` with the icon as `::marker` or a decorative SVG; the meaning stays in the text|Partial: plain bullets|ER-D: icon bullets|
|35|Code display (Code, Preformatted, Code Highlight, Code Text)|WP EL WS NO|syntax highlighting|`<pre><code>`|Missing|Not taken: audience|
|36|Markdown (Markdown, Markdown Embed)|SQ GH WS CA|footnotes (GH)|converted to HTML when saved or pasted|Missing|0.7.10: markdown in the paste pipeline instead|
|37|Poetry / verse (Poetry)|WP|whitespace kept|`white-space: pre-line`|Has: line breaks in text|-|
|38|Math (Math, Math equation)|WP NO|LaTeX|MathML|Missing|Not taken: audience|
|39|Footnotes (Footnotes)|WP GH|auto-numbered|`<sup>` links to an `<ol>` with links back|Missing|Not taken: low value|
|40|Table (Table, Table Element, Tables)|WP KB ZS DO NP CA WX JI|header row, striped|`<table>` with `<caption>` and `scope`, inside an `overflow-x: auto` wrapper; sortable headers need `aria-sort` and buttons|Has|-|
|41|Alert / callout / notice (Alert, Inline Notice, Notification, Callout)|EL BR SP ST GH NO BB|type, dismissible|`<aside>` or `role="note"`; `role="alert"` only for content injected live. Pitfall: meaning carried by colour alone (WCAG 1.4.1)|Partial: text box style|ER-F: callout variant (info, warning)|
|42|Text link (Text Link, Link, Links, Content link)|BR BD OX WF WS DO RM SQ OT|inline anchor|`<a href>` with link text that makes sense on its own|Has|-|
|43|Inline text / span (Inline Text, inline-text)|WS SH|inline styling|`<span>` or `<mark>`|Has|-|
|44|Jumbo / display text (jumbo-text)|SH|viewport-scaled text|`clamp()` with a rem term, so zoom still works (WCAG 1.4.4); `text-fit` is Chrome-only and has no CSS fallback|Has: size, «fit: shrink»|`text-fit` stays on the watch list|
|45|Read more (Read More, More)|EL WP|link to full post|`<a>` whose text names the entry, not a bare «Read more»|Partial|v0.8 entry pages|
|46|Classic editor block (Classic)|WP|legacy TinyMCE|-|n/a|-|
|47|Header card (Header)|GH|full-width text banner|a section with a heading|Has: text box, section|-|

### C. Media

**Offered:** an upload or explore library, and the gallery as several views of one element (grid, carousel, slides) rather than separate elements, as Squarespace does and Urd does with six views. **Built:** `<picture>`, `srcset` and `aspect-ratio`; a gallery carousel on scroll-snap; a privacy embed for video.

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|48|Image (Image, Photo, Picture, Advanced Image)|all|link, lightbox, caption, hover|`<img>` with `alt`, `width` and `height`, `srcset` and `sizes`; the first image eager with `fetchpriority=high`. Pitfall: every image lazy and none with `width`/`height` (Urd today, measured; the eager first image in 0.7.0, the sizes in v0.8 responsive pictures)|Has: focus, filters, shapes, lightbox|-|
|49|Image box / info card (Image Box, Image Heading Text)|EL ST BD ZS|image + heading + text|`<article>` or `<figure>` with a heading|Has: presets|-|
|50|Gallery (Basic Gallery, Gallery, Image Gallery, Photo Gallery, Advanced Gallery, Pro Gallery, Imagely Gallery)|EL WP BR DV BB KB SP SQ WX HO JI DO NP GH TL CA DU WE RM SH|grid/masonry, lightbox, collage (SH)|a list of images, the lightbox on `<dialog>`; masonry with `display: grid-lanes` ships in Safari 26.4 only, so an ordinary grid is the fallback|Has: 6 views and a lightbox|-|
|51|Portfolio (Portfolio, Filterable Portfolio, Projects gallery)|EL DV WX|filter by category|a row of checkbox or radio chips inside `<search>`; `:has()` can filter a small set in CSS alone|Partial|ER-D: category chips on the gallery (shared with v0.8 AR-3 collection filters)|
|52|Image carousel (Image Carousel, Image Slider, Slider Gallery, Carousel, Media Carousel)|EL OT DO DU WX NP BR ST FR|autoplay, arrows, dots|a scroll-snap track; `::scroll-button()` and `::scroll-marker` are Chrome-only, so the controls need a JS fallback; APG Carousel (a rotation control, `aria-roledescription="carousel"`, slide labels). Pitfall: auto-forwarding hurts comprehension (NN/g); Baymard asks for 5-7 s, pause on hover, a permanent stop after interaction and no autorotation on mobile|Has|-|
|53|Slider / slideshow (Slides, Slider, Slideshow, Content Slider, Advanced Slider, Basic Slider, Media Sliders, layered-slideshow)|EL DV BR BD BB KB SP OT DO WX FR SH RM CA WE SK MB NP SQ|any content per slide, Swiper|as #52, with any content in a slide|Partial: images only|ER-D: carousel view for collections|
|54|Nested carousel (Carousel (nested), Group Carousel, Slider (Nestable))|EL EL4 DV BR|any elements per slide|as #52|Missing|ER-D (same as #53)|
|55|Video (Video, HTML5 Video, YouTube, Vimeo, Self-hosted Video)|all|autoplay, poster, controls|`<video>` with `<track kind="captions">`; YouTube and Vimeo behind a click-to-load facade. Pitfalls in Urd today: the embed iframe is created at once (lazily) with no click to load (`blocks/video.js:143`; 0.7.24 Privacy defaults), and the file video has no captions track|Has: embed and file|-|
|56|Video playlist (Video Playlist)|EL|chapters, tabs|-|Missing|Not taken: low value|
|57|Video popup / lightbox (Video Popup, Lightbox)|KB ST WF NP|modal player|`<dialog>` with the player loaded when it opens; focus returns to the trigger on close|Missing|ER-B|
|58|Video slider (Video Slider, Facebook Videos)|DV BD|thumbnails|-|Missing|Not taken: low value|
|59|Background video (Background Video, Vimeo Background Video, Video Backgrounds, Video Box)|EL4 WF WS SK WX MB SQ|muted loop|`<video muted loop playsinline>` with a poster; a pause control when it runs longer than 5 s (WCAG 2.2.2); the poster alone under reduced motion|Has: video layer|-|
|60|Video mask / transparent video (Video Mask, Transparent Video)|WX|shape mask|-|Missing|Not taken: low value|
|61|Audio (Audio, Music)|EL WP DV BB BR SQ GH ZS CA NP NO RM WX|player, playlist|`<audio controls>` with a transcript|Has|-|
|62|Audio playlist (Playlist, Playlist track)|WP|track list|-|Missing|Watch: a publications collection covers podcasts|
|63|Lottie (Lottie, Lottie Animation, Animation, DotLottie)|EL DV KB OT BD SP WF WX RM FR|loop, scroll-sync, hover|a vendored MIT player on the page (lottie-web light, or dotlottie-web for state machines); SVG with CSS animation for the simple cases|Missing|Taken: v0.8 Animation files (the `lottie` and `dotlottie` plugins)|
|64|Rive animation (Rive)|WX|state machines|a vendored MIT player on the page (@rive-app/canvas), the WASM same-site|Missing|Taken: v0.8 Animation files (the `rive` plugin)|
|65|3D / Spline (Spline, 3D models)|WF RM|interactive 3D|glTF/GLB through model-viewer (Apache 2.0), decoders same-site; Spline's runtime never vendored|Missing|Taken: v0.8 Animation files (the `model` plugin; a Spline scene as GLB, or the owner's export in the portal)|
|66|SVG (SVG, SVG Icon)|EL4 BR DV OX|inline SVG|inline SVG, sanitised; `aria-hidden` when decorative, `role="img"` with a title when it carries meaning|Partial: icons and shapes|-|
|67|Icon (Icon, Icons)|EL BR BD DV BB KB ST SP OT WP ZS DU SH RM WH|library, link|drawn SVG, `aria-hidden` beside text; an icon-only link or button needs an accessible name|Has: a drawn icon library; no link on the icon block (the links block draws icon links)|-|
|68|Icon box / blurb (Icon Box, Blurb, Info Box, Icon Label, Icon with Text, Icon Heading Text, Callout)|EL BR BD DV KB SP ST DO ZS BB|icon position|`<article>` with a heading; the icon decorative|Has: presets|-|
|69|Image hover card / overlay (Image Hover Card, Image Overlay, Hover box)|BD KB WX NP|reveal on hover|a caption over the image shown on `:hover` and `:focus-within`, and always shown on touch. Pitfall: content reachable only by hover|Partial: hover lift|ER-B: caption overlay that also opens on focus|
|70|Image zoom (Image with Zoom)|BD|magnifier|-|Missing|Not taken: the lightbox covers it|
|71|Image accordion (Image Accordion)|BD|expanding panels|-|Missing|Not taken: low value|
|72|Masker (Masker)|BD|shape mask|`clip-path` (`shape()` is Baseline since February 2026) or `mask-image`|Has: image shapes|-|
|73|Scrolling image (Scrolling Image)|BD|long screenshot scroll|-|Missing|Not taken: low value|
|74|Cover (Cover)|WP TL SQ|overlay, focal point|`object-fit: cover` with `object-position` at the focal point; a veil keeps the text contrast (WCAG 1.4.3)|Has: hero, image layer|-|
|75|File / download (File, File Download)|WP GH JI|button, embed PDF|`<a href download>` with the type and size visible («PDF, 240 kB») and the date in `<time>`; any preview behind a click|Missing|ER-B: file list showing type, size and date|
|76|GIF (GIF)|GH|search|`<img>` with `alt`; a pause control when it runs longer than 5 s (WCAG 2.2.2)|Has: animated images (no GIF search)|-|
|77|Flickr (Flickr)|SQ JI|photostream|-|Missing|Not taken: third party|
|78|Shots (Shots)|RM|-|-|n/a|-|
|79|Media with content (media-with-content)|SH|media + text section|as #20|Has: presets|-|

### D. Navigation

**Offered:** panels of their own and template parts. **Built:** the disclosure pattern ([ADR-0010](../adr/0010-disclosure-navigation.md)) or the Popover API with anchor positioning for menus; never `role="menu"`.

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|80|Navigation menu (Menu, Nav Menu, WordPress Menu, WP Menu, Navigation, Navbar, Menus, Navigation Menu)|EL BR BD DV BB WP KB GB WX WF WS DO SH CV TL FS SQ|mobile toggle, overlay|`<nav>` with a list; submenus as APG disclosure navigation (a button with `aria-expanded`), never `role="menu"`; the mobile menu as the same disclosure panel ([ADR-0010](../adr/0010-disclosure-navigation.md)) or a full-screen `<dialog>` sheet|Has|-|
|81|Mega menu (Menu (mega), Menu Builder, Nav (Nestable))|EL BD BR SH|nested content|disclosure navigation opening a panel, placed with the Popover API and anchor positioning (the core ships in all three engines since Firefox 147)|Partial: submenus in columns and a flyout style; no pictures or blocks in the panel|Not taken for pictures or blocks in the panel until a real site needs one|
|82|Menu link / submenu (Navigation Link, Submenu, Home Link, Page List)|WP KB|-|`aria-current="page"` on the link to the current page|Partial: one level, with no `aria-current` on the current page|0.7.11: the current page marked|
|83|Dropdown (Dropdown, Dropdown Menus)|BR DV WF S1|hover/click|opens on click; hover only behind a `pointerType === 'mouse'` guard; Escape closes and returns focus|Has|-|
|84|Anchor / scroll point (Menu Anchor, Scroll Points, Anchor)|EL CA WX|offset|an `id` on the target with `scroll-margin-top` for a fixed header; smooth scroll only under `prefers-reduced-motion: no-preference`|Has: section ids|-|
|85|In-page navigation (In-page navigation)|WX|scroll-spy|`<nav aria-label>` with an `<ol>` of anchor links; scroll-spy from a small IntersectionObserver setting `aria-current`|Planned|0.7.13.16 page index|
|86|Breadcrumbs (Breadcrumbs)|EL BR DV WP BD WX NO|separator, schema|APG Breadcrumb: `<nav aria-label="Breadcrumb">` with an `<ol>` and `aria-current="page"` on the last item|Missing|ER-G, with the v0.8 entry pages|
|87|Table of contents (Table of Contents, Post Table of Contents)|EL BR DV KB SP ST WP BD NO|heading levels, sticky|`<nav aria-label="On this page">` with an `<ol>` of anchor links; scroll-spy from an IntersectionObserver. Pitfall: duplicate or unstable ids|Planned|0.7.13.16|
|88|Pagination (Pagination, Page Numbers, Next/Previous Page, Pagination Bar, Products Pagination)|WP BR DV GB WF WX ST|numbers, prev/next|`<nav aria-label="Pagination">` with `aria-current="page"` and `rel=prev`/`rel=next` links|Partial: limit, archive view|ER-D, with the entry pages|
|89|Load more (Load More)|ST|AJAX|a `<button>` that reveals the next batch, with the new count announced through `role="status"`|Missing|ER-D|
|90|Post navigation (Post Navigation, Adjacent Posts, Post Navigation Link)|EL BR BD WP BB|prev/next post|`<nav>` with `rel=prev`/`rel=next` links naming the entries|Missing|v0.8 entry pages|
|91|Search form (Search Form, Search, WP Search, Global Search, Search bar)|EL WP BR BD DV BB KB SP WF WX HO DO SQ FR SH|icon, full-screen|the `<search>` landmark (widely available) around a form; on a static site, a JSON index written at publish and filtered in the browser|Partial: calendar search|v0.8 AR-3 (collections); v0.8 site search, to be weighed|
|92|Live search (Search (live results), Live Search, predictive-search)|EL OT SH SQ|AJAX results|as #91, with the result count in `role="status"`|Missing|Same as #91|
|93|Language / locale switcher (Locales list, Locale Selector, Language element, language selector)|WF FR NP WX UM SH|flags, dropdown|`<nav>` of links with `lang` and `hreflang`, each language named in itself («English», «Norsk»); `<link rel=alternate hreflang>` in the head. Pitfall: flags stand for countries, not languages|Missing|After v1.0, with multilingual content|
|94|Site logo (Site Logo, Logo)|EL WP BR WX SH|retina, link|`<a href="/">` around an `<img>` whose `alt` is the name; `light-dark()` for images (Baseline September 2026) swaps a logo per colour scheme|Has|-|
|95|Site title / tagline (Site Title, Site Tagline)|EL WP|-|text in the header, not an `<h1>` on every page|Has|-|
|96|Page / archive / query title (Page Title, Archive Title, Query Title)|EL WP BD|dynamic|the page's `<h1>`|Has: static|-|
|97|Back to top (Back to Top, Move to Top Button)|BR BD NP DO|appear on scroll|`<a href="#top">`, smooth only under `prefers-reduced-motion: no-preference`; revealed by a scroll-driven animation (Chrome and Safari; Firefox Nightly only, so shown statically there)|Partial: a fixed «↑» button on every page after 400 px of scrolling (`urd.js:138`), with no settings|0.7.13.14 (the element with settings)|
|98|Off-canvas panel (Off-Canvas, Offcanvas, Sheet, Overlay Panels)|EL BR WS GB|side, trigger|`<dialog>` or `[popover]` sliding in with `@starting-style` and `transition-behavior: allow-discrete`; `inert` on the page behind|Partial: mobile menu, cart drawer|ER-A: drawer variant of the popup block|
|99|Sitemap (Sitemap)|EL|post types|a nested `<ul>` built from the page registry at publish|Missing|ER-G: built from the page registry|
|100|Navigation overlay close (Navigation Overlay Close)|WP|accessible close button|a real `<button>` with an accessible name; `<dialog>` also closes on Escape|Has: in the dialogs|-|
|101|Collection links (collection-links)|SH|-|`<nav>` or `<ul>` of links|Has: link launcher, footer columns|-|

### E. Interactive and disclosure

**Offered:** a palette plus a context panel. **Built:** native `<details name>`, `<dialog>`, the Popover API, scroll-snap and anchor positioning.

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|102|Accordion (Accordion, Nested Accordion, Accordion (Nestable), Advanced Accordion, Accordions)|EL EL4 WP BR BD DV BB KB SP OT ST GB SQ ZS NP DO WS SH DU MB|single/multi open, icons|`<details name>` for an exclusive group; animated with `::details-content` (Baseline September 2025) plus `interpolate-size` (Chrome only, behind a gate); APG Accordion. NN/g: accordions suit pages where readers need only a few sections|Has: FAQ block|-|
|103|FAQ (schema) (FAQ, FAQ Element)|SP BD NP MB EL4 SH|FAQPage schema|as #102, with FAQPage JSON-LD in the baked HTML|Partial: no FAQPage JSON-LD|v0.8 baking (JSON-LD)|
|104|Toggle / details (Toggle, Details, Toggle list, Collapsible)|EL DV BR GH NO WP WS|-|one `<details>`; APG Disclosure|Has: FAQ with one item|-|
|105|Tabs (Tabs, Nested Tabs, Tabs (Nestable), Advanced Tabs, Tab)|EL EL4 WP BR BD DV BB KB SP OT ST GB WX ZS NP DO WS DU|horizontal/vertical|no native tab element: APG Tabs (`role=tablist/tab/tabpanel`, roving tabindex, arrow keys, automatic or manual activation); inactive panels `hidden="until-found"` so find-in-page and `#fragment` links reach them (plain `hidden` where unsupported); `<details name>` as the no-JS fallback. Pitfall: radio or `:target` CSS hacks break semantics and history|Missing|ER-A: APG tabs whose panels use `hidden="until-found"`|
|106|Content toggle (Content Toggle)|BD|switch between two contents|two tabs as in #105, or a `<button aria-pressed>`|Missing|ER-A, together with tabs|
|107|Modal / popup (Popup, Modal, Modal Popup, Dialog, Popups, Pop-up, Promotion Popups)|EL BD BB KB SP OT WX TL NP DO DU WS S1 SQ SH|triggers, exit intent|`<dialog>` with `showModal()`, opened declaratively by invoker commands (`<button commandfor command="show-modal">`, Baseline December 2025); light dismiss with `closedby="any"` (Chrome and Firefox, Safari Technology Preview only, so a JS path); APG Dialog (Modal). Pitfalls: timed or exit-intent popups; focus must return to the trigger; scroll locked with `body:has(dialog:modal)`|Partial: lightbox, quick view|ER-A: popup block opened by a click (invoker commands), never on exit-intent|
|108|Tooltip (Tooltip)|DV BD TL WS|hover/click|`popover="hint"` (Chrome and Firefox, Safari Technology Preview only, so behind a gate) placed by anchor positioning; `interestfor` is Chrome-only; APG Tooltip. Pitfalls: interactive content inside a tooltip; a tooltip that does not work on touch|Missing|ER-A: `popover="hint"` behind a gate|
|109|Popover (Popover)|WS|anchored panel|the Popover API (Baseline January 2025) with anchor positioning and explicit anchor names|Has: the engine's own menus|-|
|110|Hotspot (Hotspot, product-hotspots)|EL RM SH|pins on image|absolutely placed `<button>`s opening `[popover]` panels, anchor positioning as an enhancement. Pitfall: tiny targets; WCAG 2.5.8 sets 24 by 24 px|Missing|ER-B|
|111|Flip box (Flip Box)|EL OT|3D flip|Pitfall: content shown only on hover is unreachable on touch and by keyboard|Missing|Not taken: content shown only on hover fails touch and keyboard|
|112|Before/after comparison (Before/After Image, Image Comparison, comparison-slider)|DV BD SH|horizontal/vertical|two stacked images and a labelled `<input type=range>` driving `clip-path: inset(0 calc(100% - var(--p)) 0 0)`|Missing|ER-B: range input plus `clip-path`|
|113|Hover box (Hover boxes)|WX|two states|Pitfall: hover only|Missing|Not taken: hover only|
|114|Hover slider (Hover Slider)|NP|-|Pitfall: hover only|Missing|Not taken|

### F. Data display

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|115|Counter (Counter, Number Counter, Count Up, Simple Counter)|EL BR DV BB KB ST SP BD NP MB|prefix/suffix, duration|the final number in the markup, the count-up as decoration so screen readers hear the final value; no count under reduced motion|Has: stats with count-up|-|
|116|Circle counter (Circle Counter, Progress Circle, Counter Circle)|DV OT BD ST DO|percentage|`<meter>` drawn as a ring with `conic-gradient`; the number printed as text|Missing|ER-C: `<meter>` plus `conic-gradient`|
|117|Progress bar (Progress Bar, Bar Counters, Progress Blocks, Basic Bar)|EL BR KB OT ST BD DO DV WX MB|striped, animated|`<meter>` for a measured value (APG Meter), `<progress>` for task progress; the number always printed as text|Missing|ER-C|
|118|Reading progress (Progress Tracker, Post Reading Progress Bar)|EL BR|top bar|a fixed bar scaled by `animation-timeline: scroll(root)` (Chrome and Safari; Firefox Nightly only), left out where unsupported|Missing|ER-C: scroll timeline, behind a gate|
|119|Reading time (Time to Read, Post Reading Time)|WP BR|-|computed at publish|Missing|v0.8 entry pages|
|120|Pie chart (Pie Chart)|BR|-|as #121|Missing|ER-C: charts|
|121|Chart (Chart, Canva Code charts)|DV SQ CV|bar/line/pie|inline SVG drawn at publish, or CSS-grid bars, always with the data table kept|Missing|ER-C: SVG drawn from a table, with the table kept|
|122|Stats grid / number box (Stats Grid, Number Box, Features Metrics)|BD ST WF|-|a `<dl>` or a list, the numbers as text|Has: stats variants|-|
|123|Timeline (Timeline, Content Timeline, Post Timeline, Timelines)|DV SP ST OT MB|vertical, alternating|`<ol>` with `<time>`; the line is decoration|Has|-|
|124|Pricing table (Price Table, Pricing Tables, Pricing Table, Pricing Box, Price, Pricing Plans)|EL BR DV BD ST WF TL MB|featured badge, toggles|a grid of `<article>`s (heading, price, a `<ul>` of benefits, a CTA); the highlighted tier carries a text label («Most popular»); a feature comparison goes in a real `<table>`|Has: membership preset (no monthly/yearly switch)|Not taken: the switch is low value|
|125|Price list / menu (Price List, Restaurant Menu, Menu (SQ), price list)|EL SP DU SQ S1 GD|dotted leaders|a `<dl>` or a table, with dotted leaders from a flex filler|Partial: table|ER-C|
|126|Comparison table (Pricing Comparison, Review Comparison Table)|WF OT|-|`<table>` with `scope`; ticks and crosses also as text|Has: table|-|
|127|Business hours (Business Hours)|BD OT DU|open now|a `<table>` or `<dl>` with `<time>`, plus schema.org OpeningHoursSpecification; «open now» needs a few lines of JS in Europe/Oslo time and must handle exceptions (holidays, exam periods)|Missing|ER-C: «open now», closed periods, OpeningHoursSpecification|
|128|Rating display (Star Rating, Rating, Ratings Display)|EL BR BD BB SP WX|stars, schema|the value as text («4 of 5»), the stars decorative|Missing|Not taken: low value|
|129|Feature list / grid (Feature, Feature Grid, Features List/Table, Features)|ST WF TL MB SH|-|a `<ul>` of `<article>`s with headings|Has: feature card presets|-|
|130|Steps / how it works (How It Works)|TL|-|`<ol>` with CSS counters; `aria-current="step"` when used in a flow|Has: steps preset|-|
|131|Calendar display (Calendar, Calendars, Calendar Element)|WP SQ WX NO NP|month view|a month grid as a `<table>` with `<time>`; the first weekday from `Intl.Locale` week info (Baseline July 2026); recurrence with `Temporal` where present (Chrome and Firefox), Urd's own RRULE code otherwise|Has: calendar block with 8 views|-|
|132|Database view (Table, Board, Calendar, Gallery, List)|NO|filters/sorts|-|Partial: collection views|-|
|133|Timetable / schedule (Timetable, Schedule Events)|TL NP|-|`<table>` with row and column headers and `<time>`|Has: calendar week and agenda views|-|
|134|Airtable table (Airtable Table)|DO|live data|-|Missing|Not taken: third party|
|135|Index / tile and link (Index, Tile and Link)|TL|-|`<nav>` or `<ul>` of link cards|Has: link launcher, cards|-|
|136|Query results summary (Query Results Summary, Query Total, Products Total Results)|BR WP|«x of y results»|text in `role="status"` that follows the filter|Missing|v0.8 AR-3 filters|

### G. Social and proof

**Offered:** an icon picker and a pasted embed. **Built:** drawn SVG icons; embeds sanitised, with active content stripped on purpose; a plugin with a CSP opt-in is the way to more ([ADR-0006](../adr/0006-plugin-csp-needs-model.md)).

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|137|Testimonial (Testimonial, Testimonials, Simple/Fancy Testimonial, Reviews (TL))|EL DV BR BB KB SP ST BD TL MB SH|avatar, rating|`<figure>` with `<blockquote>` and `<figcaption>`|Has: quote, short variant|-|
|138|Testimonial carousel (Testimonial Carousel, Testimonial Slider)|EL DO WF|-|as #52|Missing|ER-D: carousel view|
|139|Reviews (third-party) (Reviews, Yelp Reviews, Review, Product Review, review)|EL DU SP OT SH S1|schema|-|Missing|Not taken: third party|
|140|Team member (Person, Team Members, Team)|DV BR SP ST TL WF|social links|a `<ul>` of `<article>`s: `<img alt="">` (the name is already text), `<h3>`, role and a `mailto:` link; a «vacant» state|Has: team preset|v0.8 AR-4 people kind|
|141|Logo list / partners (Logo List, Partners, Logos)|BD TL WF SH|carousel/grid|a `<ul>` of linked logos with the sponsor's name as `alt`, `flex-wrap`, equal optical size from `max-block-size` and `aspect-ratio`; a scrolling row duplicates the list with `aria-hidden` and `inert`, has a pause control and stands still under reduced motion|Has: sponsors preset, gallery ribbon|ER-F: sponsor tiers|
|142|Social icons / follow (Social Icons, Social Media Follow, Social Bar, Social links)|EL WP DV BD HO WX DO NP SH SQ WH|brand colours|drawn SVG icons inside links with accessible names|Has (0.7.20.5.3): the site's links, registered once in the Site panel with a library icon or an own image, drawn by the footer, the menu's tools and the links block|-|
|143|Share buttons (Share Buttons, Social Sharing, Social Share (Buttons), Social Buttons, Sharing Icons, Share)|EL BR BD SP ST OT DU WX JI WH SQ|networks, counts, save button on images (SQ)|plain share links with no SDK; «copy link» through the Clipboard API|Missing: had them v0.7 to 0.7.20.5.2; removed 15 October 2026, since the share links led nowhere a visitor wants, and the block became the row of the site's links (#142)|-|
|144|Instagram feed (Instagram Feed, Instagram)|DV BR SP HO SQ RM SK|grid/carousel|needs an API token a static site cannot hold; a manual gallery plus a profile link instead|Missing|Not taken: needs an API token, which a static site cannot keep|
|145|Facebook embeds (Facebook Button/Comments/Embed/Page, Facebook Page Plugin/Post/Like/Share, Facebook)|EL BR BD WF DU|-|needs Facebook's SDK, which tracks|Missing|Not taken: SDK and tracking|
|146|X / Twitter embeds (Twitter Button, Embed Tweet, Timeline, Twitter Feed, X Follow)|BD WF DU WX SK|-|-|Missing|Not taken|
|147|YouTube subscribe (YouTube Subscribe button)|WX|-|an ordinary link|Missing|Not taken: an ordinary link button does it|
|148|Social feed (aggregated) (Social Feed, Social Widgets)|SK DU|-|-|Missing|Not taken|
|149|Third-party comments (Disqus Comments, Facebook Comments)|DU EL BD|-|-|Missing|Not taken|
|150|Link in bio (Link in Bio (Minimalist + 6 Pro), Bio Sites)|EL SQ|-|a `<ul>` of large links|Has: link launcher|-|
|151|Follow on Shop (follow-on-shop)|SH|-|-|n/a|-|
|152|Bandsintown (Bandsintown)|SQ|tour dates|-|n/a: the calendar covers it|-|

### H. CTA and conversion

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|153|Button (Button, Advanced Button, Regular Button)|all|icon, size, hover|`<a>` for navigation, `<button>` for actions; a target of at least 24 by 24 px (WCAG 2.5.8); `text-box` trim for optical centring (Baseline August 2026)|Has|-|
|154|Button group (Buttons, Button Group)|WP BB OT SP|-|flex with `gap` and wrapping|Has: free placement|-|
|155|Icon button (Icon Button)|ST|-|`<button>` with an accessible name|Partial: the links block draws icon-only links with an accessible name; the icon block has no link and the button block has no icon|ER-G: an icon in the button block|
|156|Call to action (Call to Action, CTA)|EL DV BB SP ST GH|box, ribbon|a section with a heading and one primary action|Has: CTA preset|-|
|157|Marketing button (Marketing Button)|SP|headline + sub|-|Missing|Not taken: low value|
|158|Promo / banner (Promos, Main Banner)|WX WE SH|-|-|Has: sections, announcement bar|-|
|159|Notification / announcement bar (Notification Bar, Floating Bars, header-announcements)|BD EL SH SQ|sticky, dismiss|a region above the nav with a real close `<button>`; a rolling bar needs a pause (WCAG 2.2.2)|Has|-|
|160|Floating contact button (Floating Buttons, Chat button, Click To Call, Click To Email)|EL WX DU SQ|WhatsApp, multi-link, phone-only bottom bar (SQ)|`tel:` and `mailto:` links in a fixed element that never covers content|Has: a block docked to the screen|-|
|161|Countdown (Countdown, Countdown Timer, Timer)|EL BR DV BB KB SP OT ST BD NP DO CA MB|evergreen, expiry action|the target in `<time datetime>`; no `aria-live` on the ticking digits|Has|-|
|162|Count-up timer (Countup Timer)|NP|-|as #161, counting from a past date|Missing|ER-H|
|163|Newsletter / email opt-in (Email Optin, Subscribe Form, Newsletter, Subscription Form, Email signup, Signup card, Sign Up Forms)|DV BB SQ HO DO SH GH SP WH SK ZS WF|ESP integration|a `<form>` posting to the provider's endpoint, with an explicit, unticked consent («markedsføringsloven» § 15) and, as good practice, double opt-in|Partial: footer newsletter CTA, form|0.7.24: preset with a split consent|
|164|Coupons (Coupons)|DU S1 SK|-|needs validation on a server|Missing|Not taken: needs server validation|
|165|Payment button (PayPal Button, Stripe Button, Payment Button, Pay button, PayPal, Stripe Checkout)|EL DV DO WX DU OT|one-off/recurring|a link to the provider's hosted payment page|Partial: checkout, Vipps|URGENT: Vipps migration|
|166|Donation (Donation, Donations, Donation form)|SQ WX WE|-|amount chips (radio inputs styled as chips), a link out to the payment page and a `<meter>` for the goal|Partial: Vipps line in the membership preset|ER-F: donation with set amounts|
|167|Cookie consent banner (Cookie Banner, Cookie Consent, cookie solution)|FR S1 UM SQ|Google Consent Mode (FR)|not needed without non-essential storage; a click-to-load facade on each embed is the better pattern («ekomloven» § 3-15)|Missing|0.7.24, only when analytics or embeds need consent|
|168|Public preview / paywall marker (Public preview)|GH|free/paid cut-off|needs a server|Missing|Not taken: server|
|169|Email-only content (Email content)|GH|newsletter-only|-|n/a|-|
|170|Popup link (popup-link)|SH|opens modal|a `<button commandfor>` that opens a `<dialog>` (see #107)|Missing|ER-A, together with the popup block|

### I. Forms and inputs

**Offered:** broad libraries of field types (drop-down, checkbox, radio, date, file, steps). **Built:** native `required`, `type` and constraint validation.

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|171|Form (builder) (Form, Atomic Form, Form Builder, Contact Form, Advanced Form, Forms, Form Block, Custom Form, Online form, Canva Forms, Webhook Form, contact-form)|EL EL4 BR BD DV BB KB SP OT WF FR WX SQ HO DO NP TL RM CA ZS WE JI S1 CV WS DU SH|actions, webhooks, email, redirect after sending (SQ)|constraint validation, `autocomplete` tokens, `<fieldset>` and `<legend>` for groups, `:user-invalid` for styling (widely available); the result announced. Pitfall in Urd today: the status line (`blocks/form.js:126`) has no `role="status"`, so the success message is not announced|Has|-|
|172|Multi-step form (Multi-Step Contact Form)|NP|progress|one `<form>` with a `<fieldset>` per step and the step as text («Step 2 of 3»)|Missing|ER-E|
|173|Text input (Text Input, Input, Text)|WF WX WS FR RM SQ|placeholder, required|`<input>` with a visible `<label>`; a placeholder is not a label|Has|-|
|174|Email input (Email)|FR RM SQ|validation|`type="email"` with `autocomplete="email"`|Has|-|
|175|Number input (Number)|FR RM SQ|min/max|`type="number"` with `min`, `max` and `step`|Missing|ER-E|
|176|Phone input (Phone)|FR SQ|-|`type="tel"` with `autocomplete="tel"`|Has|-|
|177|URL input (URL)|FR SQ|-|`type="url"`|Missing|ER-E|
|178|Date picker (Date, Date Picker, Filter Datepicker)|FR WX BR SQ|range|`type="date"`|Has|-|
|179|Time picker (Time, Time Picker)|FR WX SQ|-|`type="time"`|Missing|ER-E|
|180|Textarea (Textarea, Text Area, Text Box)|WF FR WS WX SQ|rows|`<textarea>` with `field-sizing: content` (Baseline June 2026) instead of JS autosize|Has|-|
|181|Rich-text input (Rich Text (input))|WX|formatting|-|Missing|Not taken|
|182|Checkbox (Checkbox, Filter Checkbox)|WF FR WS WX RM BR|-|`<input type="checkbox">` with its label|Has|-|
|183|Multi-checkbox (Multi-Checkboxes)|WX SQ|-|checkboxes in a `<fieldset>` with a `<legend>`|Partial|ER-E|
|184|Radio buttons (Radio, Radio Group, Radio Button(s), Filter Radio)|WF FR WS WX BR SQ|-|radios in a `<fieldset>` with a `<legend>`|Has|-|
|185|Select / dropdown (Select, Dropdown, Filter Select)|WF FR WS WX RM BR SQ|multi-select|a native `<select>`, styled with `appearance: base-select` where supported (Chrome and Safari 27; Firefox behind prefs) and plain native otherwise; the editor's own UI keeps the themed dropdown ([ADR-0009](../adr/0009-themed-ui-rule.md))|Has|-|
|186|Selection tags (Selection Tags)|WX|chips|checkboxes styled as chips|Missing|Not taken: low value|
|187|Slider input (Slider)|WX|step|`<input type="range">` with the value shown|Missing|ER-E|
|188|Range slider (Range Slider, Filter Range)|WX BR|min/max|two range inputs; there is no native two-thumb range|Missing|ER-E|
|189|Switch (Switch)|WX WS|-|a checkbox with `role="switch"`|Missing|Not taken: a checkbox covers it|
|190|File upload (File Upload, Upload Button, file)|WF WX RM DU SQ|types, size|`<input type="file" accept>`, and storage on a server|Missing|Not taken: needs storage; an endpoint provider can do it|
|191|Rating input (Ratings Input, Contact Form Rating)|WX NP SQ|-|radios in a `<fieldset>`|Missing|Not taken: low value|
|192|Address input (Address Input)|WX SQ|autocomplete|address `autocomplete` tokens; a place lookup needs a third-party service|Missing|Not taken: third-party service|
|193|Signature input (Signature Input)|WX|-|-|Missing|Not taken|
|194|reCAPTCHA (reCAPTCHA, Google ReCAPTCHA)|WF WX NP SP SQ|v2/v3|a honeypot first; Turnstile verified on the server|Partial: honeypot|v0.9: Turnstile, once forms go through the site's own function|
|195|Label (Label)|WF WS|-|`<label for>`|Has|-|
|196|Submit button (Form Button, contact-form-submit-button, Filter Submit)|WF SH BR|-|`<button type="submit">`|Has|-|
|197|Terms checkbox (Accept Terms Checkbox)|NP|-|an unticked, required checkbox with a link to the policy|Missing|0.7.24|
|198|Calculated field (Calculation Formulas)|NP|-|`<output>`|Missing|Not taken|
|199|Conditional logic (Show Or Hide Field Condition, Conditional Form Emails)|NP OX SQ|-|hidden fields also `disabled`, so they are neither validated nor sent|Missing|ER-E|
|325|Hidden field (Hidden)|SQ|filled from the page address (campaign tracking)|`<input type="hidden">` filled from `URLSearchParams`; the visitor can see and change it, so it is never trusted, and what it tracks belongs in the privacy page|Missing|ER-E|
|200|Login form (Login, Login Form, LogIn, Login/out, Account Form Login, Checkout Login)|EL DV BB BD WF WP BR SP|redirect|needs a server|Missing|Not taken: server, out of scope|
|201|Registration form (Register Form, SignUp, Account Form Register)|BD WF BR SP|-|needs a server|Missing|Not taken: server, out of scope|
|202|Password reset (Forgot Password Form, ResetPassword, UpdatePassword, Lost/Reset Password)|BD WF BR|-|needs a server|Missing|Not taken: server, out of scope|
|203|Faceted filter (Taxonomy Filter, Post Filter, Post Filter Items, Filter elements, Shop Filters, Products Filter, filters)|EL DV BR BD SH|AJAX|`<search>` holding checkbox or radio chips; `:has()` can filter a small set in CSS alone|Planned|v0.8 AR-3 collection filters|
|204|Active filters (Filter Active Filters)|BR|chips|removable chips as `<button>`s that name the filter|Planned|v0.8 AR-3 collection filters|
|205|Third-party form styler (Contact Form 7 Styler, Gravity Form, CF7/GF Designer)|DV SP|-|-|n/a|-|

### J. Commerce

**Offered:** dedicated element sets that appear when the shop is switched on. **Built:** a static catalogue plus checkout as a form (Urd's model), with the payment gateway outside the core.

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|206|Product grid (Products, Archive Products, Product List, Grid Product Gallery, Featured Items, featured-collection, product-list)|EL BR BD DV WX WE SH SQ|filters, columns|a `<ul>` of product `<article>`s|Has|-|
|207|Product carousel (Slider Product Gallery, Product Carousel, Carousel Product)|WX KB NP|-|as #52|Planned|0.7.13 (the LTT gaps)|
|208|Single product widget (Product Widget, Product, featured-product)|WX SQ BD SH GH|-|-|Partial|ER-D: the product block limited to one entry|
|209|Product template builder (Product Builder)|BD SQ SH|-|-|Partial: card and quick view|v0.8 product permalinks|
|210|Product title (Product Title)|EL BR DV SH|-|the product page's `<h1>`|Partial: card and quick view|v0.8 product permalinks|
|211|Product images (Product Images, Product Gallery, product-media-gallery)|EL BR DV BD SH|zoom, thumbnails|the gallery and lightbox (#50)|Partial: card and quick view|v0.8 product permalinks|
|212|Product price (Product Price, price)|EL BR DV BD SH|sale price|the price as text with the currency; a reduced price shows both prices in text, not only a strike-through|Partial: price and member price; no reduced price beside the old one|v1.1 the shop (sale price with the before price (førpris))|
|213|Add to cart (Add To Cart, Custom Add To Cart, Add to Cart Button, «Add to bag», add-to-cart, buy-buttons)|EL BR DV WX WF OT HO SH|quantity, variations|a `<button>`, with the new cart count announced through `role="status"`|Partial: the add is shown on the button for a moment and not announced|0.7.11: announcements in the basket|
|214|Express checkout (accelerated-checkout, Quick Checkout Actions, PayPal Checkout Button)|SH WF|Apple/Google Pay|the provider's hosted flow|Partial: Vipps|URGENT: Vipps migration|
|215|Variant picker / swatches (variant-picker, swatches)|SH|buttons/dropdown|radios in a `<fieldset>` styled as chips, the colour also named in text|Partial: size and colour chips as `aria-pressed` buttons, not radios|0.7.11: variant choices as form controls|
|216|Quantity selector (quantity)|SH|-|`<input type="number">` with labelled minus and plus buttons|Partial: in the cart drawer, a count between the buttons, not a number field|0.7.11: the quantity as a form control|
|217|Product rating (Product Rating)|EL BR DV BD|-|-|Missing|Not taken: server|
|218|Stock / inventory (Product Stock, product-inventory)|EL BR DV SH|low-stock note, pickup availability|-|Partial: the badge can say «sold out» by hand|v1.1 the shop (published stock per variant)|
|219|Product meta / SKU (Product Meta, sku)|EL BR DV BD SH|categories, tags|-|Missing|v1.1 the shop (an SKU per variant)|
|220|Product description (Short Description, Product Description, Product Content)|EL BR DV SH|-|rich text (#24)|Has|-|
|221|Product tabs / additional info (Product Data Tabs, Additional Information, Product Tabs, Product Information)|EL BR DV SH|disclosures|APG Tabs or `<details>` (#105, #104)|Partial: card and quick view|v0.8 product permalinks|
|222|Product reviews (Product Reviews)|BR DV S1|-|-|Missing|Not taken: server|
|223|Related products / recommendations (Product Related, Related Products, Best Sellers, product-recommendations)|EL BR DV BD WX SH|-|-|Partial: card and quick view|v0.8 product permalinks|
|224|Upsells / cross-sells (Upsells, Product Up/Cross-sells, Product Upsell, Cross Sells, Upsell Products)|EL BR DV BD SH|-|-|Missing|After v1.0 shop extensions|
|225|Product categories / collections (Product Categories, collection-list, collection-card, Featured Categories)|EL SH WE|-|link cards|Has: shop categories preset|-|
|226|Shop archive title/description (Archive Title, Archive Description, Products Archive Description)|EL BR|-|-|n/a (WooCommerce internals)|-|
|227|Sort / order (Products Orderby)|BR|-|a labelled native `<select>`|Missing|v0.8 AR-3 collection filters|
|228|Mini cart / cart icon (Menu Cart, Mini Cart, Cart Icon, Cart, cart-drawer)|EL BR BD WX WF SH SQ|drawer|a `<button>` whose name includes the count; the drawer on `<dialog>`|Partial: cart in the nav and a drawer on `<dialog>`; the button's name leaves out the count and the drawer has no name|0.7.11: names in the basket|
|229|Cart contents (Cart, Cart Items, Cart v2, Cart Page, Cart Contents, Cart Products, main-cart)|EL BR BD DV SH|-|a table or list, with changes announced|Has|-|
|230|Cart totals (Cart Totals, Cart Collaterals)|BD DV BR|-|`<output>` or plain text|Has|-|
|231|Coupon / discount field (Cart Coupon, Checkout Coupon, Discounts)|BR WF SH|-|a text field; the checkout asks the shop function whether the code holds, and the payment function checks it again|Missing|v1.1 the shop|
|232|Checkout (Checkout, Checkout Page, Checkout Billing/Shipping/Payment/Information/Details, Checkout Form, Checkout v2)|EL BR BD DV WF|multi-step|checkout as a form; the gateway outside the core|Has: form checkout, Vipps|0.7.24: the order button text (angrerettloven § 16)|
|233|Order confirmation (Purchase Summary, Checkout Thankyou, Order Confirmation)|EL BR WF|-|-|Partial: a thank-you line after the Vipps payment (`?ordered=1`); no order details|0.7.24.7: a printable confirmation with the order lines and the withdrawal form; v1.1 the shop for the rest|
|234|My account (My Account, Account Page (+ orders, downloads, addresses, payment methods), User Account)|EL BR BD WF|-|needs a server|Missing|Not taken: server|
|235|Order tracking (Order Tracking Page)|BD|-|needs a server|Missing|Not taken: server|
|236|Store notices (WooCommerce Notices, Notice)|EL BR DV|-|-|n/a|-|
|237|Currency converter (Currency Converter)|WX|-|-|Missing|Not taken|
|238|Payment icons (payment-icons)|SH|-|decorative SVG, with the methods also named in text|Partial: shop trust preset|-|
|239|Wishlist (Store Wishlist)|S1|-|`localStorage`|Missing|Watch: localStorage would work, but low value|
|240|Quick order list (quick-order-list)|SH|B2B|-|n/a|-|
|241|Digital downloads (Downloads, Digital Goods)|WF SK|-|needs a server|Missing|Not taken: server|
|242|Store hook / fragment (Template Hook, Dynamic Fragment, WooCommerce Pages)|BR EL|-|-|n/a|-|
|243|External commerce module (BigCommerce, North Commerce, WooCommerce)|BB SH|-|-|n/a|-|
|326|Product quick view (Quick view, Quick add, quick buy)|SQ SH|options and add to cart in the dialog|`<dialog>` with `showModal()`, a link to the full product page, focus back on the card when it closes|Has: a quick view in a native `<dialog>` with gallery, variants and buy button|-|
|327|Recently viewed products (Recently viewed)|SH|-|a list kept in `localStorage`, shown as a row of product cards|Missing|Watch: localStorage would work, but low value|

### K. Booking, events and services

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|244|Booking / scheduling (Scheduling (Acuity), Bookings calendar, Online Scheduling, Appointment Booking, Schedule Booking, Online appointments)|SQ WX DU NP S1 GD|-|needs a server; a link out to the booking service|Missing|Not taken: server. Link out instead (events already carry a sign-up link)|
|245|Service list (Service List, Services)|WX TL|categories|a `<ul>` of cards|Has: cards, custom collection, button|-|
|246|Book button (Book button)|WX|-|a link to the booking service|Has: cards, custom collection, button|-|
|247|Event list / calendar (Event List (list/grid/calendar), Single Event, Events)|WX S1 WE NP|RSVP/tickets|a list with `<time>` and Event JSON-LD; a static `.ics` per event (RFC 5545) plus a Google Calendar template link; ticket status as text, never colour alone|Has: calendar block with 41 designs (40 plus the plain one), a phone design and a pop-up design per calendar, 8 views, and «Add to calendar» per event. RSVP and tickets Partial: a sign-up link per event|ER-F: registration mode, ticket status|
|248|Restaurant ordering (Online Orders)|WX|pickup/delivery|needs a server|Missing|Not taken: server. Link out instead|
|249|Table reservations (Reservations (Tock), OpenTable, OpenTable Reservations, Table Reservations, Restaurant Reservations)|SQ DU WX S1|-|needs a server|Missing|Not taken: server. Link out instead|
|250|Real-estate listings (real-estate listings)|GD|-|-|n/a|-|
|251|Wedding registry (Zola)|SQ|-|-|n/a|-|

### L. Blog, CMS and dynamic

**Offered:** dynamic data as draggable blocks of their own (Query Loop, Loop Grid) rather than hidden tokens: one element designed as the template and bound to a query. **Built:** data baked into static HTML at publish (v0.8 baking); RSS and the sitemap written at publish.

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|252|Posts grid / list (Posts, Archive Posts, Blog, Latest Posts, Post List, Post Grid, featured-blog-posts)|EL BR DV BB KB SP ST WP BD OT WX SH|card skins|a `<ul>` of `<article>`s with `<time>`, baked into the HTML at publish|Has: collection views|-|
|253|Posts carousel (Post Carousel, Post Slider, Posts Carousel/Slider, Post Grid/Carousel, Blog Posts Carousel)|DV BB SP KB NP|-|as #52|Missing|ER-D: carousel view|
|254|Query loop / loop builder (Query Loop, Post Template, Loop Grid, Loop Carousel, Collection Loop, Query, Looper, Loop Item, Loop, Post Loop Builder, Advanced Query Loop, Loop Builder, Collection List, Collection, CMS lists)|WP EL EL4 BR BB BD OX GB KB SP WF WS FS|any post type, custom template|one card designed as the template and bound to a query, as a block of its own|Partial: fixed card designs|0.7.9: more collection view designs|
|255|Term loop (Term Loop Builder, Terms Query, Term Template)|BD OX WP|-|-|n/a|-|
|256|No results (No Results)|WP GB|-|a calm empty state in text|Has|-|
|257|Post title (Post Title, Title)|EL BR DV BD WP BB|-|the entry page's `<h1>`|Partial: cards|v0.8 entry pages|
|258|Post content (Post Content, Content, page-content)|EL BR DV BD WP SH|-|`<article>`|Partial: cards|v0.8 entry pages|
|259|Post excerpt (Post Excerpt, Excerpt)|EL BR BD WP|length|-|Partial: cards|v0.8 entry pages|
|260|Featured image (Featured Image, Post Featured Image)|EL BD WP BB|-|-|Partial: cards|v0.8 entry pages|
|261|Post meta (Post Info, Meta Data, Post Meta, Date, Post Terms)|EL BR BD WP BB|date, author, terms|`<time datetime>`|Partial: cards|v0.8 entry pages|
|262|Author box (Author Box, Author, Author Name, Author Biography)|EL BR BD WP|-|-|Partial: cards|v0.8 entry pages|
|263|Comments (Post Comments, Comments, Comments List, Comment Form + WP comment sub-blocks, Comment System)|EL BR DV BD WP BB S1 SH|threading|needs a server|Missing|Not taken: server|
|264|Related posts (Related Posts)|BR|-|-|Partial: cards|v0.8 entry pages|
|265|Archives (Archives, Archive Menu, Archive)|WP WX SQ|-|entries grouped under year headings|Has: archive view|-|
|266|Category / term list (Terms List, Taxonomy List, Taxonomy, Category Menu, Term Name/Description/Count)|WP SP BR WX|-|a list of filter links or chips|Missing|v0.8 AR-3 collection filters|
|267|Tag cloud (Tag Cloud)|WP SQ WX|-|a plain list; size alone carries no meaning|Missing|v0.8 AR-3 collection filters|
|268|RSS (RSS, RSS Feed, RSS Button)|WP SQ DU WX S1|-|RSS written at publish; an outside feed read through a proxy|Has: RSS for dated collections. Reading an outside feed Missing|Watch: an outside feed could go through the same proxy as /api/ics|
|269|Latest comments (Latest Comments)|WP|-|needs comments, so a server|Missing|Not taken: server|
|270|Collection summary (Summary)|SQ|carousel/list/grid|-|Partial: cards, list and archive views with a limit; no carousel, wall or category filter|ER-D: carousel view; v0.8 AR-3 filters|
|271|Dynamic HTML / list (Dynamic HTML, Dynamic List)|KB|-|-|n/a|-|
|272|Repeater field (ACF/Meta Box) (Repeater Field, ACF Blocks)|BD OX BB|-|-|Has: collection fields, FAQ items|-|
|273|Template content area (Template Content Area)|BD OX|-|-|n/a|-|
|274|Bookmark / link preview (Bookmark, Web bookmark)|GH NO SQ|internal page card (SQ)|OpenGraph data fetched at publish, rendered as a card `<a>`|Missing|ER-G: OpenGraph data fetched at publish|
|275|Forum widget (Recent Posts (Forum))|WX|-|needs a server|Missing|Not taken: server|
|276|Content embed / block (Content Embed, Content Block)|WS|headless CMS|-|n/a: content lives in the repo as JSON|-|

### M. Members and accounts

Webflow disabled User Accounts on all sites on 29 January 2026 (Webflow help, read through search results). Every element here needs a server, which Urd does not have.

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|277|Login bar / account menu (Login Bar, Login/out, Log Out/Log In button, Customer account component)|WX WP WF SH|avatar menu|needs a server|Missing|Not taken: server|
|278|Members area / profile (Members area, User Account, Account Page)|WX WF BR|-|needs a server|Missing|Not taken: server|
|279|Pricing plans (membership) (Plan List, Membership, User Account Subscription List, Pricing Plan)|WX SK WE WF SQ|-|the tiers of #124, with the sign-up handed to the association's register|Partial: membership preset|ER-F: sign-up handed off to Spond, StyreWeb or Rubic|
|280|Members-only content / password (Members-Only Content, Public preview, Password Protection)|SK GH S1|-|access control at the host|Missing|Not taken: Cloudflare Access instead, a recipe in the v0.9 documentation round|
|281|Avatar (Avatar)|WP|-|-|n/a: no user accounts|-|

### N. Maps, location and contact

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|282|Map (Google Maps, Map, Maps, Google Map, MapWidget)|EL EL4 BR DV KB SP OT ST BD WX SQ HO ZS NP RM JI WE WF DU MB FS|marker, style|`<address>` with an «Open in OpenStreetMap / Google Maps» link, and the map as a static image or a click-to-load iframe. Urd embeds OpenStreetMap's own iframe at once; 0.7.24 asks that no third-party frame loads before a click|Has: OpenStreetMap|-|
|283|Leaflet / OSM map (Map (Leaflet), map)|BR EL4|no API key|-|Has: OpenStreetMap's own iframe, with no API key and no library|-|
|284|Map connector (Map Connector)|BR|query-driven markers|needs a map library|Missing|Watch: needs a map library|
|285|Multi-location (Multi-Location)|DU|-|a list of `<address>`es, each with map links|Missing|ER-G: places with map links|
|286|Contact section (Contact, Contacts, contact section)|EL GD TL|-|`<address>` with `tel:` and `mailto:` links|Has: presets|-|
|287|Chat (Chat, Live Chat)|WX SK|-|a third-party script|Missing|Not taken: third party|

### O. Embeds and integrations

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|288|HTML / custom code (HTML, Custom HTML, Code, Code Block, HTML Code, HtmlEmbed, HTML Embed, Embed code, Widget/HTML, Custom Code, custom-liquid)|EL BR BD OX DV BB WP SQ WF WS TL HO DU GH JI WX DO SH CA|-|Urd's sanitizer strips active content on purpose, and the strict CSP blocks inline script|Missing|Not taken in the core (the sanitizer). A plugin with a CSP opt-in is the way|
|289|PHP / JS / CSS code (PHP Code, JavaScript Code, CSS Code, Custom CSS)|OX EL|server-side (OX)|-|n/a|-|
|290|Shortcode (Shortcode, Container Shortcode, Shortcode Wrapper)|EL BR BD OX WP|-|-|n/a|-|
|291|oEmbed / URL embed (Embed, oEmbed, Embeds)|WP OX GH SQ NO CV FR FS|providers|a click-to-load facade per allowlisted host, the host named in the CSP|Partial: YouTube, Vimeo|0.7.24: one click-to-load frame for allowlisted hosts|
|292|Iframe (IFRAMEs, Iframe, embed a site)|CA DO WX|-|`<iframe loading="lazy" title>`; blocked by the CSP's `frame-src` unless the host is allowed|Missing|Taken: v0.8 Animation files, the portal (a sandboxed frame with its own CSP)|
|293|Third-party widget (Widgets, Widget, WordPress)|CA BD OX EL|-|-|n/a: WordPress widget slots; a third-party embed is #288 or #291|-|
|294|SoundCloud (SoundCloud)|EL SQ GD|-|as #291|Missing (the embed family is Partial: YouTube and Vimeo only)|0.7.24: one click-to-load frame for allowlisted hosts|
|295|PDF viewer (PDF viewer)|GD|-|an `<iframe>` or `<object>` behind a click, always with a download link|Missing|ER-B, together with the file list|
|296|JSON-LD / head (JSON-LD, Head Slot)|WS|SEO|JSON-LD in the baked HTML|Has: automatic|-|
|297|XML node (XML Node)|WS|feeds/sitemaps|-|n/a: Urd writes sitemap.xml and RSS itself at publish|-|
|298|AI code element (Code layers, Canva Code element, AI Element Generator, AI widget builder)|FS CV WH DU|prompt-built|-|Missing|Not taken: MCP is the way ([ADR-0017](../adr/0017-ai-via-local-mcp-server.md))|
|299|AI writing block (AI Block (Spectra/ZipAI), AI Block (Otter))|SP OT|-|-|Missing|Not taken: MCP is the way (ADR-0017)|

### P. Decorative and motion

**Offered:** shapes as blocks and a background-layer editor. **Built:** SVG and CSS; scroll-driven CSS animations behind `@supports`.

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|300|Shape (Shape, Shapes, Graphics)|SQ HO GB WX WH TL RM FR|fill, stroke|inline SVG or CSS, hidden from assistive technology|Has|-|
|301|Vector art / illustration (Vector art, Vector Illustration, Vector)|WX KB TL|-|inline SVG|Partial: icons|-|
|302|Section shape divider (Section Shape Dividers, shapes)|BD EL SQ|wave, tilt|`clip-path` with `shape()` (Baseline February 2026) or inline SVG|Has|-|
|303|Fancy divider (Fancy Divider)|BD|-|as #7|Has|-|
|304|Animation group (Animation Group, Stagger Animation, Video Animation)|WS|scroll-driven|`animation-timeline: view()` behind `@supports` (Chrome and Safari), IntersectionObserver for a one-off reveal; stagger from `sibling-index()` (Baseline August 2026); everything off under reduced motion|Has|-|
|305|Parallax (Parallax, Parallax Scrolling)|MB|-|scroll-driven CSS behind `@supports` with a `requestAnimationFrame` fallback; off under reduced motion|Has|-|
|306|Stickers (stickers)|WH|-|decorative images or SVG|Partial: icons and shapes|-|
|307|Text effects (Text effects)|WX|-|as #26|Missing|ER-H, with #26|

### Q. Utility

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|308|Dark-mode toggle (Toggle - Mode)|BR|light/dark|`color-scheme` with `light-dark()`, a `<button aria-pressed>`, and the choice applied before first paint so nothing flashes|Has|-|
|309|Coming soon / under construction (Coming Soon mode, Under Construction page)|SP S1|-|-|Missing|Watch: low value|
|310|Footer copyright / policy links (footer-copyright, footer-policy-list)|SH|-|text and links in the `<footer>`|Has|-|
|311|Time / date output (Time)|WS|-|`<time datetime>` formatted with `Intl.DateTimeFormat`|Partial: dates in collections, the calendar and the countdown; no free-standing date element|-|
|312|Template button (Template button)|NO|-|-|n/a|-|
|313|Sub-page (Page)|NO|-|-|n/a: pages are made in the pages panel|-|

### R. Accessibility helpers

No builder offers accessibility as an element category of its own. The only dedicated items the enumeration found are Gutenberg's Navigation Overlay Close (#100) and Webstudio's Radix primitives, which are WAI-ARIA by default. Wix withdrew the Bookings Staff widget for accessibility reasons, and Figma Sites has an accessibility help article that covers settings, not elements. Skip links, a screen-reader-text element and a reduced-motion toggle appear in no official list. The two helpers Urd tracks as elements:

| # | Element (other names) | Builders | Variants | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|---|
|314|Skip link|none|-|`<a href="#main">` first in the body, visible on focus, with landmarks per APG|Missing|0.7.11|
|315|Site-wide pause for motion|none|-|one control that pauses marquees, auto-carousels and video backgrounds (WCAG 2.2.2), on top of the `prefers-reduced-motion` defaults (WCAG 2.3.3)|Missing|0.7.11 (WCAG 2.2.2)|

The element research also lists focus-visible tokens, targets of at least 24 px (WCAG 2.5.8), `lang` on mixed-language passages, captions and transcripts, alt-text prompts in the editor and an accessibility-statement link in the footer (UCL has one). These are settings and checks rather than elements; [FEATURES.md](FEATURES.md) and the 0.7.11 accessibility round own them. Urd's motion already respects `prefers-reduced-motion`.

### Elements found outside the builders' lists

These nine come from the association pass and the component libraries rather than from any builder's element list. The enumeration looked for a QR code and a copy button in every builder list and found neither; it found no print button, particles or custom cursor either (print styles are 0.7.22, and the element research counts particles and cursor effects as fads to skip).

| # | Element | Seen at | Native build and pitfalls | Urd | Where |
|---|---|---|---|---|---|
|316|«Add to calendar» per event|UCL and Samfundet event pages ([studentsunionucl.org](https://studentsunionucl.org/), [samfundet.no](https://www.samfundet.no/), observed 11 October 2026); no builder surveyed ships it as a core element|a static `.ics` per event ([RFC 5545](https://www.rfc-editor.org/rfc/rfc5545)) plus a Google Calendar template link|Has: a Google Calendar link and a per-event `.ics` in the event's pop-up (0.7.19.11)|-|
|317|Key-facts box (`<dl>`)|Tailwind Plus and Relume description lists ([Tailwind Plus](https://tailwindcss.com/plus/ui-blocks/marketing), [Relume](https://www.relume.ai/components), primary); Webflow names a «TL;DR experience» among its 2026 trends ([summary](https://www.plushcap.com/content/webflow/blog/webflow-8-web-design-trends-to-watch-in-2026), secondary, of Webflow's post of 23 December 2025)|a `<dl>` at the top of an event or news entry: where, when, price, age limit, accessibility|Missing|ER-F|
|318|Org.nr. in the footer|Online (NTNU) shows it on its about page ([online.ntnu.no](https://online.ntnu.no/om-linjeforeningen), primary); «ehandelsloven» § 8 requires the org.nr. to be easy to find once there is a shop ([lovdata](https://lovdata.no/lov/2003-05-23-35/§8), primary, not fetchable; [Stortinget](https://www.stortinget.no/no/Saker-og-publikasjoner/Publikasjoner/Innstillinger/Odelstinget/2002-2003/inno-200203-075/8/), secondary)|a field in site settings, shown as text in the footer by default once filled|Missing|0.7.24|
|319|Grasrotandelen block|Norsk Tipping's material for associations ([Grasrotandelen](https://www.norsk-tipping.no/grasrotandelen), [the page for associations](https://www.norsk-tipping.no/grasrotandelen/for-lag-og-foreninger), primary)|the org.nr. and a link, built from Norsk Tipping's download material. Pitfall: associations may not buy advertising only to recruit Grasrot donors, so the block never boosts itself|Missing|ER-F|
|320|Document archive («vedtekter», «protokoller», «årsberetning»)|Samfundet's `Saksdokument` categories ([model_choices.py](https://github.com/Samfundet/Samfundet4/blob/master/backend/samfundet/models/model_choices.py), code), echo's meeting minutes with a required PDF ([meeting-minute.tsx](https://raw.githubusercontent.com/echo-webkom/echo-web-mono/main/apps/cms/schemas/meeting-minute.tsx), code), Nabla's meeting records ([nablaweb](https://github.com/Nabla-NTNU/nablaweb), code)|a file list (#75) over a documents collection, by category and year. Pitfall: personal data in published protocols|Partial: the publications kind with the archive view (year headings, a link per entry)|ER-B: file list plus a documents collection kind|
|321|Job and recruitment listings with a deadline|Abakus `joblistings` ([lego apps](https://github.com/webkom/lego/tree/master/lego/apps), code), Online `JobListing` ([schema.prisma](https://raw.githubusercontent.com/dotkom/monoweb/main/packages/db/prisma/schema.prisma), code), echo `job-ad` ([schemas](https://github.com/echo-webkom/echo-web-mono/tree/main/apps/cms/schemas), code); Relume career sections and Untitled UI Careers ([Untitled UI](https://www.untitledui.com/react/components), primary); Samfundet has «Opptak» in its main navigation|a collection with the deadline in `<time>`, hidden after expiry at publish or by a date check in the browser|Missing|ER-F|
|322|Directory of interest groups or committees|Abakus `interest-groups` ([lego-webapp pages](https://github.com/webkom/lego-webapp/tree/master/lego-webapp/pages), code), Online `grupper` and `interessegrupper` ([monoweb routes](https://github.com/dotkom/monoweb/tree/main/apps/web/src/app/(web)), code), echo `student-group` (schemas above, code), UCL's groups directory filtered by category with «Start a group» ([studentsunionucl.org](https://studentsunionucl.org/), observed)|a collection with filters and A-Z letter anchors|Partial: custom collection|ER-F: preset|
|323|QR code|Flowbite QR Code ([Flowbite](https://flowbite.com/docs/getting-started/introduction/), primary) and Untitled UI QR Codes; in no builder's list|an SVG generated at publish; staying library-free needs an encoder of Urd's own|Missing|ER-G: an encoder of Urd's own (C119 in FEATURES.md)|
|324|Copy to clipboard|Flowbite Clipboard; in no builder's list|`navigator.clipboard.writeText()` ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)) with a `role="status"` confirmation|Missing: «Copy link» went with the share buttons (0.7.20.5.3)|ER-G: copy button, for example for a Vipps or account number|

### Missing elements ranked for associations

The element research ranked what Urd lacks by value to clubs and associations. Checked against the engine on 11 October 2026, Urd already has four of the entries it counted as missing, partial or planned: the team preset (portraits with name, role and email), the sponsors preset (a greyscale logo row with links), the membership preset (price tiers with benefits and a Vipps line) and the steps preset (three numbered cards). Urd also has an events preset (three rows with a date badge and a sign-up button) and an Urd-owned 404 page, which the research did not count. The rows below say so where they apply, and keep the research's order and value so the gaps around them stay visible. Builder sources are in [Sources for the catalogue](#sources-for-the-catalogue).

| Rank | Element | Value | Who has it | Native build | Urd today | Where |
|---|---|---|---|---|---|---|
|1|People / board cards|very high|Divi Person, Bricks Team Members, Spectra Team, Tailwind Plus and Relume team sections|a `<ul>` of `<article>`s: image, `<h3>`, role, `mailto:`|Has: the team preset (the research listed it as planned). Boards kept per period are planned|v0.8 AR-4 people kind|
|2|Membership tiers / pricing cards|very high|Elementor Price Table, Divi Pricing Tables, Bricks Pricing Tables, Tailwind Plus Pricing|a grid of `<article>`s plus a real comparison `<table>`|Has: the membership preset (the research listed it as missing). No monthly/yearly switch|ER-F: sign-up handed off to Spond, StyreWeb or Rubic|
|3|«Add to calendar» and ticket/RSVP status on events|high|UCL and Samfundet; Squarespace Reservations|a static `.ics` per event (RFC 5545) plus a text badge|Partial: the calendar block (41 designs, 8 views, subscribe links, «Add to calendar» per event, a sign-up link per event) and the events preset; no ticket status|ER-F|
|4|Sponsor / partner logo cloud with an optional pausable marquee|high|Tailwind Plus Logo Clouds, Relume logo sections, Once UI LogoCloud|a `<ul>` grid; a duplicated `aria-hidden` track; a still fallback under reduced motion|Has: the sponsors preset and the gallery ribbon (the research listed it as missing). The gallery ribbon has a pause button that stays (0.7.0.51); tiers are missing|ER-F: sponsor tiers|
|5|Opening hours with «open now»|high for venues and offices|Duda Business Hours, Otter Business Hours|`<table>` and `<time>`, a few lines of JS, schema.org OpeningHoursSpecification|Missing|ER-C|
|6|Document / file list for minutes, statutes and budgets|high|Gutenberg File, Ghost File, Jimdo File Download|`<a download>` with type, size and `<time>`|Partial: the publications kind with the archive view; no file list|ER-B|
|7|Page index / table of contents|high for statutes and handbooks|Gutenberg, Elementor, Divi, Kadence|`<nav>` with an `<ol>`, plus an IntersectionObserver|Planned|0.7.13.16|
|8|Collection filters and site search|medium-high|Bricks filters, Divi Post Filter, Squarespace Search|`<search>`, chips, a JSON index|Partial: search and a category filter in the calendar; collection filters planned|v0.8 AR-3; v0.8 site search, to be weighed|
|9|Language switcher (Norwegian and English)|medium-high|Wix Multilingual, Webflow Localization|`<nav>` links with `hreflang` and `lang`|Missing|After v1.0, with multilingual content|
|10|Newsletter sign-up preset|medium-high|Squarespace Newsletter, Ghost Signup, Divi Email Optin|a form posting to the provider, plus a consent line|Partial: the footer's newsletter CTA and the form block|0.7.24: preset with a split consent|
|11|Donation / goal meter|medium-high|Squarespace Donation, Wix Donations, Duda PayPal|radio chips, a link out and a `<meter>`|Partial: the Vipps line in the membership preset|ER-F: donation; ER-C: goal meter|
|12|Recruitment / open-roles collection with deadlines|medium-high|Relume careers, Untitled UI Careers; Samfundet «Opptak»|a collection preset with `<time>`|Missing|ER-F|
|13|Key-facts / practical-info box|medium-high for events|Tailwind Plus and Relume description lists|`<dl>`|Missing|ER-F|
|14|Steps («how to join»)|medium|daisyUI Steps, Flowbite Stepper|`<ol>` with counters|Has: the steps preset (the research listed it as partial)|-|
|15|General tabs block|medium|Gutenberg Tabs, Elementor Atomic Tabs, Bricks|APG Tabs with JS|Missing|ER-A|
|16|Price list / bar menu|medium|Elementor Price List, Squarespace Menu, Duda Restaurant Menu|`<dl>` with dotted leaders|Partial: table|ER-C|
|17|Directory with A-Z|medium|UCL groups directory, Framer's Neighborly template|collection, filters and letter anchors|Partial: custom collection|ER-F: preset; v0.8 AR-3 filters|
|18|Modal / popup|medium, used with care|Elementor Popup, Kadence Modal, Otter Popup|`<dialog>`, invoker commands, `closedby`|Partial: lightbox, quick view|ER-A|
|19|Progress / goal bar|medium|Elementor, Divi, Bricks|`<progress>` or `<meter>`|Missing|ER-C|
|20|Callout / notice block|medium|Ghost Callout, Notion Callout, Spectra Inline Notice|`<aside role=note>`|Partial: text box style|ER-F|
|21|Back to top and reading progress|low-medium|Bricks|an anchor plus a scroll timeline|Partial (a fixed back-to-top button; the element with settings is planned); reading progress Missing|0.7.13.14; ER-C|
|22|Breadcrumbs|low-medium|WordPress 7.0, Divi, Bricks|APG Breadcrumb|Missing|ER-G, with the v0.8 entry pages|
|23|Prev/next and pagination for news|low-medium|Gutenberg, Bricks|`<nav aria-label>`|Partial: a limit and the archive view; no prev/next|v0.8 entry pages; ER-D|
|24|Embeds (Spotify, SoundCloud, an Instagram post) with click-to-load|low-medium|Squarespace, Ghost|a privacy facade|Partial: YouTube and Vimeo only, and their iframe loads at once rather than behind a facade, as the research assumed|0.7.24|
|25|Link preview / bookmark card|low-medium|Ghost Bookmark, Squarespace Content Link|OpenGraph read at publish|Missing|ER-G|
|26|Charts|low-medium|Squarespace Chart, Divi Chart|SVG drawn at publish, plus the table|Missing|ER-C|
|27|Copy to clipboard|low-medium|Flowbite|the Clipboard API|Missing: the share block's «copy» went with the share buttons (0.7.20.5.3)|ER-G|
|28|QR code|low-medium|Flowbite, Untitled UI|SVG generated at publish|Missing|ER-G: an encoder of Urd's own (C119 in FEATURES.md)|
|29|Before/after|low|Divi, Aceternity UI Compare|a range input plus `clip-path`|Missing|ER-B|
|30|Image hotspots|low|Elementor Hotspot|buttons plus popovers|Missing|ER-B|
|31|Rotating headline|low|Elementor, Bricks, daisyUI Text Rotate|keyframes plus the full text hidden for screen readers|Missing|ER-H|
|32|Custom HTML escape hatch|low, but an escape valve|nearly every builder|a sandboxed frame with a CSP of its own|Missing|Taken: v0.8 Animation files, the portal|

The research also asked for a few things to be checked in Urd. The answers, from the engine on 11 October 2026:

- **Calendar:** 34 designs (33 plus the plain one) and 8 views; the research counted 33.
- **404 page:** Urd ships an Urd-owned static `404.html` with the theme colours, which the site owner cannot edit. Editable 404 text is in ER-G.
- **Event detail pages:** none yet; an entry gets its own page with the v0.8 entry pages.
- **Table sorting:** the table block writes header cells with `scope="col"` and has no sorting.
- **Form feedback:** the form's status line (`blocks/form.js:126`) has no `role="status"`, so a screen reader does not hear the success message. Not yet in the backlog.
- **Self-hosted video captions:** the file variant of the video block writes `<video>` with no `<track>`. Not yet in the backlog.

### Sources for the catalogue

Every page was read on 11 October 2026; where a page shows its own date, that date is given. Marks: (primary) the vendor's own page, documentation, law or standard; (secondary) a blog, review or other third party; (code) read in the source code.

**Builder lists, by code**

| Code | Builder | What the list holds | Sources |
|---|---|---|---|
| EL | Elementor Free and Pro | 35 free source files (about 30 widgets); the nested, floating and link-in-bio widgets; Pro's 57 widgets on Essential and 85 on Advanced and up; the Pro WooCommerce widgets; extra names in the help index | [widget source](https://github.com/elementor/elementor/tree/main/includes/widgets) (code), [modules](https://github.com/elementor/elementor/tree/main/modules) (code), [3.23 post](https://elementor.com/blog/elementor-323-ajax-search-floating-buttons-link-in-bio/) (primary), [Pro](https://elementor.com/pro/) (primary), [help index](https://elementor.com/help/simple-widgets) (primary) |
| EL4 | Elementor V4 Atomic | 21 atomic elements from the source folders | [atomic elements](https://github.com/elementor/elementor/tree/main/modules/atomic-widgets/elements) (code), [4.3 update](https://theplusaddons.com/blog/elementor-4-3-update.md) (secondary, 29 Sep 2026) |
| BD | Breakdance | claims «130+» (one search result says 145 built-in); the list comes from a 2024 review plus names confirmed later | [review](https://www.wppagebuilders.com/breakdance-review/) (secondary, 25 Jan 2024), [Respira 6.3.0](https://www.respira.press/releases/6.3.0) (secondary, Apr 2026: 84 registered elements in 7 categories in its test install), search results from breakdance.com/features/elements/ (primary, read through search results) |
| BR | Bricks 2 | 135 elements | [elements list](https://academy.bricksbuilder.io/article/elements-list/) (primary) |
| DV | Divi 5 | 65 modules plus 25 WooCommerce modules | [modules](https://help.elegantthemes.com/en/collections/10650978-divi-5-modules) (primary), [ecommerce](https://www.elegantthemes.com/ecommerce/) (primary) |
| OX | Oxygen 6 | 21 native elements, plus the Breakdance element and form add-ons | [elements reference](https://oxygenbuilder.com/documentation/elements-reference/basic/text/) (primary), [Oxygen 6.1](https://oxygenbuilder.com/oxygen-6-1-is-now-available/) (primary, 4 May 2026) |
| BB | Beaver Builder | the docs say 48 modules and name 41, plus the Themer modules | [modules](https://docs.wpbeaverbuilder.com/beaver-builder/layouts/modules/) (primary), [Themer](https://docs.wpbeaverbuilder.com/beaver-themer/getting-started/i-installed-beaver-themer-now-what) (primary) |
| WP | Gutenberg core blocks | 116 entries in the current reference, deprecated ones included; some may still be experimental or plugin-only depending on WordPress 7.0 or 7.1 | [core blocks](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/) (primary) |
| KB | Kadence Blocks | v3.7.12.1 (updated 6 Oct 2026): 23 free blocks, four more listed, and the Pro blocks | [wordpress.org](https://wordpress.org/plugins/kadence-blocks/) (primary), [Liquid Web](https://www.liquidweb.com/software/kadence/blocks/) (primary) |
| SP | Spectra | Legacy 2.20.x; the new v3 «Spectra Blocks» could not be listed | [wordpress.org](https://wordpress.org/plugins/ultimate-addons-for-gutenberg/) (primary), [block source](https://github.com/brainstormforce/wp-spectra/tree/master/src/blocks) (code) |
| OT | Otter | v3.2.7 (updated 29 Sep 2026), claims «26+ blocks» | [wordpress.org](https://wordpress.org/plugins/otter-blocks/) (primary) |
| GB | GenerateBlocks | v2.4.1, free and Pro | [wordpress.org](https://wordpress.org/plugins/generateblocks/) (primary), [blocks](https://generatepress.com/blocks/) (primary) |
| ST | Stackable | v3.20.2: 42 free blocks and 2 Premium | [wordpress.org](https://wordpress.org/plugins/stackable-ultimate-gutenberg-blocks/) (primary) |
| SQ | Squarespace 7.1 | 37 block types, Accordion and Stacks; on 19 October 2026 every block article in the help centre, with the retired ones marked | [blocks](https://support.squarespace.com/hc/en-us/articles/206543757) (primary, updated 16 Jul 2026), [Accordion](https://support.squarespace.com/hc/en-us/articles/4411581892749-Accordion-blocks) (primary), [Stacks](https://support.squarespace.com/hc/en-us/articles/46663474488205-Create-multi-block-layouts-with-Stacks) (primary), [the Blocks section](https://support.squarespace.com/hc/en-us/sections/200810067) (primary, read 19 Oct 2026) |
| WX | Wix Editor, Wix Studio and the Wix apps | the Editor's Add Elements panel with 21 input elements, the Studio Add panel, and the app widgets (Stores, Blog, Events, Bookings, Forum, Members, Pricing Plans, Restaurants, Portfolio, Donations) | [Editor elements](https://support.wix.com/en/article/wix-editor-elements-available-in-the-editor) (primary, 21 Jan 2025), [input elements](https://support.wix.com/en/article/about-user-input-elements) (primary), [Studio](https://support.wix.com/en/article/studio-editor-adding-elements-4240855) (primary); the support.wix.com app articles «wix-stores-adding-store-elements», «wix-blog-enhancing-your-blog-with-free-add-ons», «wix-events-changing-the-event-list-layout», «wix-bookings-setting-up-your-service-list», «wix-forum-adding-a-recent-posts-element», «site-members-adding-a-members-area-login-bar», «pricing-plans-displaying-plans-on-multiple-site-pages», «wix-restaurants-an-overview» and «wix-donations-adding-and-setting-up-wix-donations» (primary) |
| WH | Wix Harmony | 12 panels plus the AI Element Generator | [adding elements](https://support.wix.com/en/article/wix-harmony-editor-adding-elements) (primary) |
| WF | Webflow | element presets from the Designer API, plus layout presets | [element presets](https://developers.webflow.com/designer/reference/element-presets) (primary); help.webflow.com «Locales list and locale data» and «Webflow User Accounts overview» (primary, read through search results) |
| FR | Framer | the Insert menu, the built-in components and the form inputs; marketplace components are community-made, not built in | [Insert menu](https://www.framer.com/dictionary/insert-menu) (primary), [Carousel and Ticker](https://www.framer.com/updates/carousel-and-ticker) (primary), [Forms](https://www.framer.com/updates/forms) (primary, 20 Jun 2024); framer.com/updates/cookie-banner-component and localization-update (primary, read through search results) |
| FS | Figma Sites | block categories, CMS lists and pages, code layers; no built-in accordion or tabs | [help article](https://help.figma.com/hc/en-us/articles/31242773374615) (primary), [help article](https://help.figma.com/hc/en-us/articles/35895705647127) (primary), [accessibility help](https://help.figma.com/hc/en-us/articles/31242789265431) (primary) |
| TL | Tilda | block library categories and Zero Block elements | [overview](https://tilda.cc/lp/overview/) (primary); blog-en.tilda.cc and newsletter-en.tilda.cc/november-2025 (primary) |
| RM | Readymag | widgets and form field types | [help category](https://help.readymag.com/hc/en-us/categories/7778542446619) (primary, read through search results), [widgets post](https://blog.readymag.com/more-secret-widgets-instagram-embedding-3d-models-video-player-5aa65671a8f/) (primary) |
| CA | Carrd | a review counts 16 elements | [docs](https://carrd.com/docs/building) (primary), [review](https://kripeshadwani.com/carrd-review/) (secondary) |
| DU | Duda | 26 widgets on the page, plus a few named elsewhere | [site widgets](http://www.duda.co/features/site-widgets) (primary); duda.co/product-updates (primary) |
| HO | Hostinger | 16 elements | [elements](https://www.hostinger.com/support/6435894-website-builder-website-elements) (primary, modified 25 Sep 2026) |
| GD | GoDaddy Websites + Marketing | partial: the help article names examples only; up to 20 sections a page | [add a section](https://www.godaddy.com/help/add-a-section-20119) (primary) |
| JI | Jimdo Creator | partial | [elements](https://help.jimdo.com/hc/en-us/sections/115001583426-Elements) (primary, titles read through search results), [Engadget](https://www.engadget.com/2013-08-30-friday-favorite-jimdo.html) (secondary, 30 Aug 2013) |
| WE | Weebly / Square Online | partial | [Square article 7329](https://squareup.com/help/ca/article/7329) (primary), [svenskadomaner.se](https://svenskadomaner.se/en/support/2213) (secondary), [Square article 6860](https://squareup.com/help/article/6860) (primary) |
| WN | Webnode | partial | webnode.helpjuice.com (primary, read through search results) |
| SK | Strikingly | partial | [features](https://www.strikingly.com/s/features) (primary) |
| S1 | SITE123 | modules and features | [features](https://www.site123.com/features) (primary) |
| ZS | Zoho Sites | elements | [elements](https://help.zoho.com/portal/en/kb/zohosites/help-guide/edit-website/elements) (primary) |
| MB | Mobirise | 18 block categories plus other block types | [blocks](https://mobirise.com/blocks/) (primary) |
| NP | Nicepage | elements and contact-form options | [elements](https://nicepage.com/features/c/web-page-elements) (primary) |
| DO | Dorik | 36 help articles | [help](https://help.dorik.com/en/category/components-elements-cio786/) (primary), [elements](https://dorik.com/feature/elements) (primary) |
| UM | Umso | partial: no public block list | [umso.com](https://www.umso.com/) (primary), [review](https://www.itechguides.com/best/landing-page-builders/umso/) (secondary) |
| WS | Webstudio | core components and Radix components | [core components](https://docs.webstudio.is/university/core-components) (primary), [Radix](https://docs.webstudio.is/university/radix) (primary) |
| SH | Shopify Horizon | sections and blocks from the theme's source folders; on 19 October 2026 the sections and blocks named in the manual's theme articles and the Theme Store listing | [sections](https://github.com/Shopify/horizon/tree/main/sections) (code), [blocks](https://github.com/Shopify/horizon/tree/main/blocks) (code); [theme articles](https://help.shopify.com/en/manual/online-store/themes) and the [Horizon listing](https://themes.shopify.com/themes/horizon) (primary, read 19 Oct 2026) |
| GH | Ghost | 20 cards | [cards](https://ghost.org/help/cards/) (primary) |
| NO | Notion | content block types | [types of content blocks](https://www.notion.com/help/guides/types-of-content-blocks) (primary) |
| CV | Canva websites | elements and Canva Code | [website settings](https://www.canva.com/help/website-settings/) (primary), [Canva Code](https://www.canva.com/help/canva-code/) (primary) |

**Builder pages cited in the ranked list**

- Elementor Hotspot: [elementor.com](https://elementor.com/help/hotspot-widget-pro/) (primary). Elementor Atomic Tabs: [3.34 post](https://elementor.com/blog/elementor-334-v4-atomic-tabs-entrance-interactions/) (primary).
- WordPress 7.0 Breadcrumbs: [Yoast](https://yoast.com/wordpress-7-0/) (secondary).
- Squarespace blocks (Newsletter, Donation, Chart, Menu, Search, Content Link, Reservations): [support.squarespace.com](https://support.squarespace.com/hc/en-us/articles/206543757-Adding-content-with-blocks) (primary).
- Otter (Business Hours, Popup): [themeisle.com](https://themeisle.com/plugins/otter-blocks/) (primary).
- Webflow Localization: [webflow.tenten.co](https://webflow.tenten.co/en/insert-elements-section/) (secondary).
- Framer's Neighborly template: [framer.com](https://www.framer.com/marketplace/templates/neighborly/) (primary).

**Component and section libraries**

[Relume](https://www.relume.ai/components), [Tailwind Plus marketing blocks](https://tailwindcss.com/plus/ui-blocks/marketing), [shadcn/ui](https://ui.shadcn.com/docs/components), [Flowbite](https://flowbite.com/docs/getting-started/introduction/), [Untitled UI](https://www.untitledui.com/react/components), [daisyUI](https://daisyui.com/components/), [Aceternity UI](https://ui.aceternity.com/components) and [Once UI](https://once-ui.com/) (all primary).

**Association sites and Norwegian rules**

- Example sites, observed 11 October 2026: [samfundet.no](https://www.samfundet.no/), [studentsunionucl.org](https://studentsunionucl.org/) (primary).
- Online's about page with the org.nr.: [online.ntnu.no](https://online.ntnu.no/om-linjeforeningen) (primary).
- Source code of the student association sites (code): Abakus [lego apps](https://github.com/webkom/lego/tree/master/lego/apps) and [lego-webapp pages](https://github.com/webkom/lego-webapp/tree/master/lego-webapp/pages); Online [monoweb routes](https://github.com/dotkom/monoweb/tree/main/apps/web/src/app/(web)) and [schema.prisma](https://raw.githubusercontent.com/dotkom/monoweb/main/packages/db/prisma/schema.prisma); echo [CMS schemas](https://github.com/echo-webkom/echo-web-mono/tree/main/apps/cms/schemas) and [meeting-minute.tsx](https://raw.githubusercontent.com/echo-webkom/echo-web-mono/main/apps/cms/schemas/meeting-minute.tsx); Samfundet [model_choices.py](https://github.com/Samfundet/Samfundet4/blob/master/backend/samfundet/models/model_choices.py); Nabla [nablaweb](https://github.com/Nabla-NTNU/nablaweb).
- «Ehandelsloven» § 8: [lovdata](https://lovdata.no/lov/2003-05-23-35/§8) (primary, not fetchable; lovdata refused automated requests), [Stortinget](https://www.stortinget.no/no/Saker-og-publikasjoner/Publikasjoner/Innstillinger/Odelstinget/2002-2003/inno-200203-075/8/) (secondary).
- Grasrotandelen: [norsk-tipping.no/grasrotandelen](https://www.norsk-tipping.no/grasrotandelen) and [the page for associations](https://www.norsk-tipping.no/grasrotandelen/for-lag-og-foreninger) (primary).
- «Ekomloven» § 3-15 on cookies and other storage (from 1 January 2025): [lovdata](https://lovdata.no/lov/2024-12-13-76/§3-15) (primary, not fetchable), [Nkom](https://www.nkom.no/internett/informasjonskapsler-cookies) (primary, updated 16 May 2025).
- «Markedsføringsloven» § 15 on consent for e-mail marketing: [lovdata](https://lovdata.no/lov/2009-01-09-2/§15) (primary, not fetchable), [Forbrukertilsynet](https://www.forbrukertilsynet.no/vi-jobber-med/telefonsalg-uonsket-reklame/sporsmal-svar-telefonsalg-uonsket-reklame) (primary, 19 October 2023).

**Usability, accessibility and standards**

- [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) and [disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) (primary).
- WCAG 2.2 Understanding: [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), [2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html), [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html), [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) (primary).
- NN/g: [auto-forwarding carousels](https://www.nngroup.com/articles/auto-forwarding/), [accordions on desktop](https://www.nngroup.com/articles/accordions-on-desktop/) (primary, research). Baymard: [homepage carousels](https://baymard.com/blog/homepage-carousel) (primary, research).
- MDN: [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details), [dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog), [search](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/search), [meter](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meter), [track](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/track), [Clipboard.writeText()](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText) (primary).
- [Google: localized versions and hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions), [schema.org OpeningHoursSpecification](https://schema.org/OpeningHoursSpecification), [RFC 5545](https://www.rfc-editor.org/rfc/rfc5545) (primary).
- Webflow's 2026 trends: [plushcap summary](https://www.plushcap.com/content/webflow/blog/webflow-8-web-design-trends-to-watch-in-2026) (secondary, of webflow.com/blog/web-design-trends-2026, 23 Dec 2025).

**Platform facts used in the native-build column** (from the platform pass, Chrome 155, Firefox 157 and Safari 27; «-» not supported, «TP» Safari Technology Preview only; the full table is in [CODE.md](CODE.md) part 4)

| Feature | Chrome | Firefox | Safari | Baseline | Source |
|---|---|---|---|---|---|
| `<details name>` | 120 | 130 | 17.2 | Newly, Sep 2024 | [webstatus](https://webstatus.dev/features/details-name) |
| `::details-content` | 131 | 143 | 18.4 | Newly, 16 Sep 2025 | [webstatus](https://webstatus.dev/features/details-content) |
| `interpolate-size` | 129 | - | TP 254 | Limited | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/interpolate-size.json) |
| `hidden="until-found"` | 102 | 148 | 26.2 (does not scroll to the match) | Limited per web-features, though all three ship it | [bcd](https://github.com/mdn/browser-compat-data/blob/main/html/global_attributes.json) |
| Popover API | 114 | 125 | 17 | Newly, 27 Jan 2025 | [webstatus](https://webstatus.dev/features/popover) |
| Invoker commands (`command`, `commandfor`) | 135 | 144 | 26.2 | Newly, 12 Dec 2025 | [webstatus](https://webstatus.dev/features/invoker-commands) |
| `<dialog closedby>` | 134 | 141 | TP | Limited | [bcd](https://github.com/mdn/browser-compat-data/blob/main/html/elements/dialog.json) |
| `popover="hint"` | 151 | 153 | TP | Limited | [Firefox 149](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/149), [Chrome 150](https://developer.chrome.com/release-notes/150) |
| Interest invokers (`interestfor`) | 142 | - | - | Limited | [webstatus](https://webstatus.dev/features/interest-invokers) |
| Anchor positioning (core) | 125 | 147 | 26 | core Baseline January 2026 (web.dev); web-features now says limited because of 2026 sub-features | [web.dev](https://web.dev/blog/web-platform-01-2026), [webstatus](https://webstatus.dev/features/anchor-positioning) |
| `@starting-style` | 117 | 129 | 17.5 | Newly, 6 Aug 2024 | [webstatus](https://webstatus.dev/features/starting-style) |
| `transition-behavior: allow-discrete` | 117 | 129 | 17.4 | Newly, 6 Aug 2024 | [webstatus](https://webstatus.dev/features/transition-behavior) |
| `::scroll-marker`, `::scroll-button()` | 135 | - | - | Limited | [webstatus](https://webstatus.dev/features/scroll-markers), [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/selectors/scroll-button.json) |
| `scroll-state()` container queries | 133 | - | - | Limited | [webstatus](https://webstatus.dev/features/container-scroll-state-queries) |
| Scroll-driven animations | 115 | Nightly only | 26 | Limited | [webstatus](https://webstatus.dev/features/scroll-driven-animations) |
| `display: grid-lanes` | flag | Nightly pref | 26.4 | Limited | [WebKit](https://webkit.org/blog/17758/when-will-css-grid-lanes-arrive-how-long-until-we-can-use-it/) |
| Customizable select (`appearance: base-select`) | 135 | flag only | 27 (drop-down only) | Limited (2 engines) | [webstatus](https://webstatus.dev/features/customizable-select) |
| `field-sizing: content` | 123 | 152 | 26.2 | Newly, 16 Jun 2026 | [webstatus](https://webstatus.dev/features/field-sizing) |
| `text-box` | 133 | 154 | 18.2 | Newly, 18 Aug 2026 | [web.dev](https://web.dev/blog/web-platform-08-2026) |
| `text-fit` | 150 | - | - | Limited | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/text-fit.json) |
| `shape()` | 135 | 148 | 18.4 | Newly, 24 Feb 2026 | [webstatus](https://webstatus.dev/features/shape-function) |
| `sibling-index()` | 138 | 154 | 26.2 | Newly, 18 Aug 2026 | [webstatus](https://webstatus.dev/features/sibling-count) |
| `light-dark()` for images | 150 | 150 | 27 | Newly, 14 Sep 2026 | [webstatus](https://webstatus.dev/features/light-dark-image) |
| `<search>` | 118 | 118 | 17 | Widely, Apr 2026 | [webstatus](https://webstatus.dev/features/search) |
| `inert` | 102 | 112 | 15.5 | Widely, Oct 2025 | [webstatus](https://webstatus.dev/features/inert) |
| `:user-valid` / `:user-invalid` | 119 | 88 | 16.5 | Widely, May 2026 | [webstatus](https://webstatus.dev/features/user-pseudos) |
| `Intl.Locale` week info | 130 | 153 | 17 | Newly, 21 Jul 2026 | [webstatus](https://webstatus.dev/features/intl-locale-info) |
| `Temporal` | 144 | 139 | TP | Limited | [bcd](https://github.com/mdn/browser-compat-data/blob/main/javascript/builtins/Temporal.json) |

**Caveats**

- About 26 builders have a complete or near-complete list from a vendor page, GitHub source, wordpress.org readme or developer docs. Ten have only partial lists (GoDaddy, Jimdo, Weebly / Square Online, Webnode, Strikingly, Umso and others), and for Breakdance the best full list is a 2024 review.
- Several vendor sites refused automated reading: the Breakdance and Oxygen docs (404), Webflow help (403), Readymag help (403), Strikingly (403), Jimdo help (403), Webnode (402) and the Spectra Blocks v3 page on wordpress.org (429). For those the names come from search-result text of the vendor's own pages or from a third-party page, and the table above says which.
- Elementor's help centre would not return a complete widget index, so some free and Pro names come from a secondary source.
- Gutenberg's reference mixes stable, experimental and deprecated blocks; whether a block ships depends on WordPress 7.0 or 7.1 and the Gutenberg plugin.
- Framer's accordions, countdowns, tabs, sliders and step forms exist only in the community marketplace, not as built-in components. Figma Sites has no built-in accordion or tabs; they are built by hand or as code layers.
- Wix can no longer add the Bookings Staff widget, which it withdrew for accessibility reasons, and Webflow disabled User Accounts on all sites on 29 January 2026; the rows keep both because the lists name them.
- One Jimdo source dates from 2013.
- The element research marked its own builder statuses for Urd from a brief; this catalogue replaces them with the engine count of 11 October 2026, and its browser support with the platform pass.
