# ics.js

The full text of the longer comments in the engine's `ics.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Dependency-free iCal parser and recurrence expander for the calendar block.
A PURE module (no DOM, no fetch): everything here is unit-testable in node, and blocks/calendar.js handles fetching and rendering.
Loaded dynamically by the block on the first render of a calendar, so it stays outside the visitor closure.

The scope is the practical subset that club calendars use (Google Calendar, Outlook, Nextcloud): VEVENT with DTSTART/DTEND (UTC, TZID or all-day), RRULE with FREQ/INTERVAL/COUNT/UNTIL/BYDAY/BYMONTHDAY/BYMONTH/ BYSETPOS, RDATE, EXDATE and RECURRENCE-ID overrides.
Unknown properties are ignored quietly.

Time zones are resolved with the Intl API (no tables): wall time in the zone is converted to UTC by estimating the offset, which is DST-correct.

## `const WINDOWS_ZONES`

The Windows time-zone names Outlook writes as TZID, each with the IANA zone CLDR names for it (windowsZones, territory 001).
Intl knows the IANA names only, so a Windows name is read through this table; a name not here is read from the feed's VTIMEZONE block.

## `changeAt`

The wall time a VTIMEZONE component's change of clock happens at in a year: its DTSTART's month, day and time, moved by its yearly rule (BYMONTH with a signed BYDAY such as -1SU, or BYMONTHDAY) when it has one.
As a UTC stamp of the wall time, for comparing with another wall time; null when the component has not begun by that year.

## `componentsToUtc`

Wall time under a feed's own VTIMEZONE → UTC ms: the component (standard or daylight) whose latest change of clock stands before the wall time gives the offset.
The changes are compared as wall times, which is how the feed states them.

## `zonedToUtc`

Wall time in an IANA zone → UTC ms.
The offset is estimated with Intl and adjusted once more, which catches DST transitions.
An unknown zone falls back to local time.

## `resolveZone`

Gives a date's parts the zone they are read in: the TZID as Intl knows it (a Windows name through its IANA zone), else the feed's own VTIMEZONE components under `zone`.
A TZID nothing resolves is read as local time.

## `parseDuration`

`DURATION` → the length of an event: `{ days }` for whole days and weeks, else `{ ms }`; null when the value is not a duration.
The form is RFC 5545's: P2D, P1W, PT2H30M, P1DT2H.

## `parseIcs (2)`

Parses a whole iCal text.
The events are RAW events, one per VEVENT with its recurrences not expanded (see expandEvents); the timezone is the feed's own (X-WR-TIMEZONE).

## `parseIcs › case 'ATTACH': {`

The first picture attached by address: its type says it is a picture, or its address ends in a picture file.
A file attached inline, and any other kind of file, is skipped.

## `ruleStarts`

Generates wall-time starts for a rule, from DTSTART onwards (sorted).
`skipTo` (a time) lets a rule without COUNT begin at the period before that time instead of at its start, so a rule that began years ago still reaches the window within the guard.

## `ruleStarts › let year`

The year's days: over the whole year when the rule names weekdays or month days without months,
else in each of the rule's months (or the start's own) the days the rule names.

## `monthDays`

The days of a month a rule names, in order: the nth (or nth from last) weekday of BYDAY, the days of BYMONTHDAY, else the day of the start.
A day the month does not have (the 31st, 29 February) is left out.

## `yearDays`

The days of a year a yearly rule without BYMONTH names, in order (RFC 5545 §3.3.10): BYMONTHDAY in every month, with BYDAY
as a limit; else BYDAY over the whole year, where an ordinal counts from 1 January (-1 the year's last such weekday) and no
ordinal means every such weekday.

## `lengthOf`

The length of an event: whole days for an all-day event (its last day counted from its first; DTEND is the day after the last), else in ms (an hour when the feed gives no end).

## `expandEvents`

Expands raw events into concrete occurrences inside a window.
A RECURRENCE-ID event overrides its base occurrence (of the rule or of an RDATE), EXDATE removes one, and STATUS:CANCELLED marks one `cancelled: true` (the block shows it as cancelled or hides it).
An occurrence of an event with a recurrence rule or extra dates carries `recurring: true`, and one whose event has a DTEND `hasEnd: true`.
The end of an all-day occurrence is the start of its last day.
The result is sorted by start.

## `signupLinkOf`

Where an event is signed up for: the link a line of the description names, else the event's own address (what an event service gives as its page).
A link to a picture or to a video meeting is never the sign-up, and a link that merely stands in the description is not one either.

## `seasonRange`

The twelve months a year view shows: from the first day of `firstMonth` (0 is January) in the season that holds `now`, so with
August at the top a day in March belongs to the season that began the August before.

## `seasonTop`

The month a year design puts at the top, from its `firstMonth` option: a month number as text (0 is January), or `now` for
the month of `today`; January without the option.

## `windowStart`

Where a view's window starts: the season for a year view (the calendar year unless `firstMonth` names another top month), the
month, the week or the day for those views, and six hours back for a list.

## `partsProperty`

Wall-time parts as an iCal date property: a date for an all-day event, a UTC stamp for a UTC time, a wall time with its TZID for an IANA zone, a floating wall time otherwise.
A time under a feed's own VTIMEZONE has no name a calendar app knows, so it is written as the moment in UTC.

## `eventIcs`

One occurrence as an iCal file, for «Add to calendar»: a calendar with the one event, its title, place, description and address.
An occurrence of a repeating event carries its series (`series`: the feed's own start, end or length, rule and excluded dates, in the feed's zone), and the file is that series, so a calendar app imports the whole of it with its count, its end and its clock.

## `eventJsonLd`

One occurrence as a schema.org `Event` for the page's JSON-LD: the name, the start and the end (the days alone for an all-day event, its last day as the end), the place with its address or the meeting link, and whether it is cancelled and held online.
`real` is the true moment of an occurrence whose start is shown on another zone's clock.

## `nextcloudExport`

A Nextcloud calendar's share link as the address of its iCal file.
The link the share dialog gives opens a web page (`/apps/calendar/p/<token>`, or `/embed/` for the embedding link), and the calendar's public address answers with the file only with `?export` behind it; both become `/remote.php/dav/public-calendars/<token>?export`, on a server at the root of its host or in a folder.
Any other address is returned as it is.

## `normalizeSourceUrl`

Normalizes a source the way the owner writes it: webcal:// → https://, https is kept, http is lifted to https, and a bare Google calendar id (someone@gmail.com / ...@group.calendar.google.com) becomes its public ICS address.
An unknown form gives null.

## `sourceEntry`

A source as the block reads it: the address alone, or an object with an address, a name and a colour.
A named calendar is a category of its own (its events wear the name as their chip, whatever their titles say), and a colour tints that calendar's chips and date badges.
Pure.

## `resolveSources`

The block's sources as the calendar reads them: an address of its own (a string or `{ url, name, color }`) as it is, a reference `{ calendar: id }` looked up in the site's registry.
A reference to a calendar that is not there and an entry without an address are dropped, and the same calendar twice is one source.
Pure.

## `dedupeOccurrences`

The same event from two calendars is one event: occurrences that start at the same time under the same title (case and outer spaces aside) are merged into the first of them, which takes over a signup link or a location the later copy has and it lacks.
The order is kept.
