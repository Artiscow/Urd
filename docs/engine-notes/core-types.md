# core-types.js

The full text of the longer comments in the engine's `core-types.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The engine's own block and background types, each with the module that defines it (ADR-0036): a visitor's page loads the modules of the types it, its nav and its footer use, and the editor's preview loads them all.
The loaders name their modules literally, so the modules stay out of the boot's static closure and the shells' preload list, and are fetched from the versioned engine folder as they are asked for (ADR-0013).

## `const withSheets`

A type is defined once its module and the sheets of the block modules it draws with are in (ADR-0036 decision 7), so the page that waits for its types is drawn with their rules in place, and a block module two types draw with (the image in the gallery, the timeline in the quote) brings its sheet with either. The sheets are fetched in the wave the modules are, so they cost no round trip of their own. Each is placed after base.css and the engine sheets (`afterEngineSheets` in sheets.js) in the order `BLOCK_SHEETS` keeps, the order their rules stood in base.css (`placeInOrder` in sheets.js), since a rule that meets another at equal specificity wins by its place; base.css's link is found by its address, as the shells all name it. An engine sheet a type draws with (the documents' `doc-look.css`, which the privacy block draws with) is named by its file and placed with the engine's own (`loadEngineSheet` in sheets.js). A sheet that fails resolves as not loaded, and its type draws without it, as a type whose module fails is drawn as unknown.

## `const beside`

A type's module asked for beside the modules it imports, directly or through others, that the boot does not load, in one wave: the browser shares a request already on its way, so no module waits for the module that imports it to arrive first.
tests/visitor-speed.test.mjs holds every type's loader to name them all.

## `const CORE_BLOCK_READY`

The core block types readied before a page is drawn, each with what readies a block of it (prepareBlocks): the calendar's, asked for in one wave with the parser, the design model, the formats and the links it draws with (calendarParts in blocks/calendar-load.js), beside the calendar's own module; and a text or terms block's document design, which draws with doc-look.js, its sheet and the text block's (`prepareText`, `prepareTerms` and `loadDocs` in blocks/text.js), while plain text readies nothing.
Each gives what takes a block's props and the page's context once its own module is in; the parts asked for beside it come in on their own.

## `const CORE_BLOCK_PARTS`

The parts of the core blocks' designs the preview loads with every type (`loadCoreTypes` with `all`, ADR-0036 decisions 4 and 9): the editor offers every design, so a document design added on the canvas draws its look at once rather than as its code comes. The calendar's design families are not among them: a calendar draws its loading state until its family's renderer is in, in the preview as on a visitor's page.

## `loadCoreTypes`

Loads and defines the core types a page uses (pageTypes in plugins.js), an old id's type among them, or every core type with `all`; a type already defined is left as it is.

## `const READY_WAIT_MS`

How long a page waits for its blocks' readying at most: as long as a calendar's loading bars wait before they show (base.css), so on a slow connection the page is drawn and the calendar comes in as its code does.

## `prepareBlocks`

Readies what the engine's own blocks on a page draw with beyond their module, before the page is drawn (CORE\_BLOCK\_READY: a calendar's parts, its designs, and its feeds asked for), so such a block stands in its own design from the page's first drawing.
It runs beside the page's types (loadCoreTypes) and settles once its blocks are readied or after `wait`, whichever comes first.
Only a core id is readied, never an old one, which a plugin may still define and draw (ADR-0021); a block hidden on the visitor's screen is left until it shows, and a block whose readying fails is drawn as it is without it.

## `reserveCoreTypes`

Holds every core block and background id as the engine's own in the registries, before any module has defined it: a plugin may then never take one, however its loading and the page's interleave, and the engine defines them through the definers the registries hand back.
