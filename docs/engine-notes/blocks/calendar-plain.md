# blocks/calendar-plain.js

The full text of the longer comments in the engine's `blocks/calendar-plain.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The calendar block's plain views: the list, the cards, «Coming up», the agenda and the month the plain design draws, and the phone's stacked agenda, each over the block's ui helpers (makeUi in calendar.js).
Loaded by the block for a calendar that draws one of them (designModules in calendar-load.js), never in the visitor closure.

## `renderPhoneAgenda`

The phone design (calPhoneDesign): one stacked agenda for a design that cannot be read on a phone, drawn in the design's set.
A design that shows a span (a year) lists what is coming, counted by the block's max count, since its whole span is loaded.
