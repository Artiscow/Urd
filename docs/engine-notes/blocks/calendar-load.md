# blocks/calendar-load.js

The full text of the longer comments in the engine's `blocks/calendar-load.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

What a calendar loads beyond its own drawing (blocks/calendar.js): its feeds, the parts every calendar draws with, the renderer of each design family, and the readying of all of them before a page is drawn.
Kept apart from calendar.js, with only the boot's own modules imported, so the boot can ready a calendar beside its module (CORE\_BLOCK\_READY in core-types.js), a wave sooner than calendar.js and its own imports come in.
Fetching ALWAYS goes through the site's own feed proxy (/api/ics): feed hosts send no CORS, and the site's CSP allows connect-src 'self' only.

## `const ASKING`

The feeds on their way, by address: a calendar readied before the page is drawn (prepareCalendar) and its drawing, or two calendars of one feed, share one request.

## `const READIED`

The feeds a calendar's readying asked for, by address, each taken once by the first drawing that reads that feed, so the drawing never asks again for one the readying could not keep (a failed request, or a browser that keeps nothing).

## `const DESIGN_MODULES`

The renderer module of each design family, loaded when a calendar draws one (literal paths, so the modules stay out of the visitor closure and the preload list).

## `let partsIn`

The parts once they are in (calendarParts), and the renderer modules loaded, by name: a calendar whose code is all in draws in the task that draws the page (renderCalendar in calendar.js).

## `const calendarParts`

The parser, the design model, the formats and the links every calendar draws with, and the rules every calendar draws with (calendar.css), loaded together, kept once they are in.

## `const designModules`

The renderer modules a calendar draws with, by name in DESIGN\_MODULES: its design's own, the week strip for the view switcher, and its phone's and its card's design where they are a module's own (calPhoneView, calCardDesign); null where there is none.

## `drawsPlain`

Whether a calendar draws with the plain views (calendar-plain.js): a design without a renderer of its own, the switcher's plain month, or on a phone the stacked agenda or a look without a renderer.

## `prepareCalendar`

Readies what a calendar draws with before the page is drawn (prepareBlocks in core-types.js): its parts and its rules, the renderers its settings draw with, and its feeds asked for, which its drawing then takes (fetchSource).
The calendar then stands in its own design from the page's first drawing, its events filling it as they come; the page never waits for a feed.
