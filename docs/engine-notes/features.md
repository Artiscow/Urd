# features.js

The full text of the longer comments in the engine's `features.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The boot's own features, each with the modules it draws with (ADR-0036 decision 8): the basket and the link launcher in the menu, contact details, the footer, the back-to-top button, pinned blocks, animations, section dividers and the collection drafts. A visitor's page loads those its site and page hold, in the waves the boot already has, and the editor's preview loads them all before it tells the editor it is ready.
The loaders name their modules literally, so the modules stay out of the boot's static closure and the shells' preload list, as the type loaders in core-types.js do. The modules that draw a page (render.js, nav.js, footer.js, urd.js) read a feature through `feature` as they draw; a module the editor bundles never imports this one, since its loaders would then be bundled into the admin, so the footer's and the head's contact parts take the contact model as an argument instead, and the back-to-top button's shape path the shape model.

## `const CORE_ANIMATION_IDS`

The core animations' ids, reserved as the engine's own before their module loads, as the core types' are (ADR-0036 decision 3): a page that uses only core animations never waits for the plugins, and no plugin can take one. tests/features.test.mjs holds the list equal to `coreAnimations` in animations/core.js.

## `const CORE_FEATURES`

Each feature's loader resolves to the parts the engine draws it with: a module's own exports, or for a feature drawn with two modules (pinning and its model, the footer and its settling) the parts of both. A loader asks for the modules its own imports beyond the boot in the same wave (`beside` in core-types.js), and tests/visitor-speed.test.mjs holds each one to name them all.

## `feature`

A feature's parts once loaded; null while it is not, or when its module could not be loaded. Every place that draws with a feature reads it here at the time it draws and draws without it on null, as if the feature were not set: no pinning, no animation, no divider shape, no back-to-top button, no basket count, no footer (ADR-0011).

## `loadFeatures`

Loads the features named, or every one with `all`, each once whoever asks: a page's features are asked for as the page file is read, a newer page file's as it is drawn in place. A feature that fails is warned and left out, so the page draws without it. Once the animations are in, the core ones are defined through the definer their reservation handed back.

## `holdsValue`

Whether a value holds anything: a string with characters, a number, true, or a list or object holding one. The contact details count as held where any of their values is, so a site whose contact details are empty or switched off loads no contact model; tests/features.test.mjs checks that such a site's contact parts are empty.

## `siteFeatures`

The features a site holds on a page, known once site.json is read: the basket in the menu (`nav.cart.show`), the link launcher (`nav.launcher.show: true`, as launcherModel in nav-model.js reads it), the contact details, the back-to-top button unless it is switched off (`layout.toTop.show: false`, toTopOf in totop.js) and the shape model for a button with a shape of its own (`layout.toTop.shape`), and the footer where it is shown and not hidden on this page (`footer.show`, `footer.hideOn`, as renderFooter reads them).

## `pageFeatures`

The features a page holds with the site's menu and footer, known once the page file is read: animations wherever an animation, a pointer effect or a section's effect for its blocks is set (pageTypes in plugins.js), pinned blocks wherever a block is pinned, and dividers wherever a section's edge names a shape. Each test is at least as wide as what its feature draws, which tests/features.test.mjs checks against the feature's own functions over the template, the presets and pages made for it.
