# blocks/calendar-time.js

The full text of the longer comments in the engine's `blocks/calendar-time.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The calendar block's month, week, day and year designs (milestone 0.7.19): eight looks that each show a span of time rather than a count of events, every one a renderer over the block's ui helpers (fields, static texts, buttons; see makeUi in calendar.js) with its own rules in calendar.css under its own class names.
The data is `ui.all`, the whole filtered window the block loaded for the view (ics.js windowStart), so a design can move through its weeks or months on its own.
Loaded by the block on the first render of a block that uses one of them, never in the visitor closure.

## `hourSpan`

The hours a plan shows: from the earliest event (at most 8) to past the latest (at least 18).
The owner's own first and last hour replace the 8 and the 18; an event outside them still widens the span.

## `yearWheel`

08 Year wheel: twelve months on a ring, a dot per event, the past months dimmed and the current one in the accent; a list for the picked month, its first events shown and the rest behind «Show all».

## `yearWheel › const firstMonth`

The month at the top of the wheel is the owner's choice, and the wheel reads the season that starts there and holds today:
with August at the top, August this year to July next year. A month's place is counted from the top.
