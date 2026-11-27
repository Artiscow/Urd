# sheets.js

The full text of the longer comments in the engine's `sheets.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The engine's sheets that a page adds as it needs them: the preview's rules, each block type's and each feature's own, and the calendar's. They stand in a module of their own, outside render.js, so the type and feature loaders (core-types.js, features.js) place sheets without importing the render loop, which reads the features.

## `loadStylesheet`

Adds a stylesheet to the document once, for the code that needs it alone (the preview's rules, a calendar's): resolves when it has loaded or failed, so the caller draws with it in place, to whether it loaded.
A caller whose rules must keep their order among sheets of its own passes `place`, which puts the link there (the calendar's sheets, calendar-load.js); without it the link goes at the end of the head.

## `placeInOrder`

The one way an engine sheet is placed among sheets of its own kind: the block modules' sheets (core-types.js), the engine's own (`ENGINE_SHEETS`) and the calendar's (calendar-load.js) each keep the order their rules stood in when they were one sheet, whatever order the browser fetches them in, since a rule that meets another at equal specificity wins by its place. A group's first sheet follows `after()` (the engine and block sheets follow base.css, where their rules stood), and without it goes at the head's end.

## `const baseSheet`

The base sheet's link, found by its address as every shell names it: the engine and block sheets are placed after it, where their rules stood in base.css.

## `const ENGINE_SHEETS`

The engine's own sheets beside the modules that draw with them, in the order their rules stood in base.css: the menu's launcher and basket, the footer, the documents and the back-to-top button. The features load theirs (features.js), and the text, terms and privacy blocks the documents' (`loadDocs` in blocks/text.js, the privacy block's loader in core-types.js).

## `const afterEngineSheets`

The last engine sheet, else the base sheet: the block sheets follow it, so the engine sheets' rules stand before the block sheets' as they did in base.css, whichever comes first. A rule of an engine sheet that met a block sheet's at equal specificity keeps the order it had.
