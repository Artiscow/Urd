# blocks/calendar-more.js

The full text of the longer comments in the engine's `blocks/calendar-more.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The calendar block's ApeironLF set and the dark mobile agenda (milestone 0.7.19): the «Coming up» card on cream (with the announcement as a section or as an alert band), the same on navy with the next events as cards, the recurring event with its facts and the fold of all its dates, and an agenda on a dark ground with a week strip.
Each is a renderer over the block's ui helpers (fields, static texts, buttons; see makeUi in calendar.js) with its own rules in calendar-more.css (or calendar.css, where families share them) under its own class names.
Loaded by the block on the first render of a block that uses one of them, never in the visitor closure.

## `filterMenu`

The calendar chip of the dark agenda: a button naming the calendar shown, opening a menu of the named calendars (the Popover API, ADR-0011).
Without popovers the calendars stand as a row of chips.
Null with fewer than two calendars.
