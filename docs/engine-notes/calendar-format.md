# calendar-format.js

The full text of the longer comments in the engine's `calendar-format.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

How the calendar block writes times and lays out weeks: the pure rules behind the clock (24 or 12 hours), the first day of the week, an event's end, a span over several days, the days left to an event, a percentage, and the time zone the times are shown in.
The clock is 24 hours unless the block asks for 12 (`clock`), and the site language decides the week unless the block says otherwise (`weekStart`); the site's own time zone, when set, is the zone every visitor sees the times in.
Loaded by the block on its first render, with ics.js and the design model, never in the visitor closure; it never touches the DOM.

## `calWeekStart`

The first day of the week as Date.getDay() counts (0 Sunday, 1 Monday): the block's choice, else the language's (read once per language, since the locale data costs on its first use), else Monday.

## `formatClock`

A time of day as text: «18:00», or on a 12-hour clock as the language writes it («6:00 pm», «6:00 p.m.», «ÖS 6:00»).
The language decides the words for the half of the day and where they stand.

## `daysBetween`

The number of calendar days from one time's day to another's on the local clock: 1 from 23:30 to 01:00 the next night, whatever the hours between, and across a change of clock.

## `timeRange`

The start and the end of a timed event as clock texts.
`to` is null when the feed gave no end or when the end is the start; for an event that ends on a later day it is the end's clock, and the caller writes the day before it.

## `dateTimeAttr`

The `datetime` of a `<time>`: the day («2026-10-05») for a Date, a time in ms or an event, and the moment itself («2026-10-05T16:00:00.000Z») for a timed event when its clock is what is written (`withClock`).
A cancelled event's time is the word «Cancelled», which is no time: null.

## `shiftToZone`

A time moved so the browser's local clock reads what the zone's clock shows at that time.
The views read local hours and dates, so an event shifted this way is drawn in the zone's time whatever zone the visitor is in.
