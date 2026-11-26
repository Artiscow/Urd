# blocks/calendar-retro.js

The full text of the longer comments in the engine's `blocks/calendar-retro.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The calendar block's retro designs (milestone 0.7.19.23): looks from a past of paper, boards and screens, each a renderer over the block's ui helpers (fields, static texts, buttons; see makeUi in calendar.js) with its own rules and colour set in calendar.css under its own class names.
A design's theme words are drawn through ui.tx like any text: the block swaps in the design's own words where it has them (calThemeTexts in calendar-designs.js), and a design that rewrites calendar data asks ui.rewrite first.
Loaded by the block on the first render of a block that uses one of them, never in the visitor closure.

## `addButton`

«Add to calendar» as a button on the event's box: it opens the event's card, where the ways to add it stand (this one event to Google or as a file, or the whole calendar).
Null on a cancelled event, and when the owner left «Add to calendar» out of the card (showAdd).

## `pad`

R1 Tear-off pad: a paper pad under the month's bar, the day huge over its weekday, the next event on the page with its countdown, time and place, excerpt and buttons, and the events after it as dashed rows; the torn pages show as a stack at the bottom edge.
The countdown's words are the design's own («Today in {n} days», the theme word inDays).

## `index`

R2 Index cards: typewritten cards on lined paper, each a little askew, numbered in their head with the category beside, the event as «Date:», «Time:» and «Place:» lines with the sign-up or «Open to everyone» and «Repeats» as lines of the same kind, the excerpt under them, and a stamp across a cancelled event.
The line words and the number are the design's own (the theme words cardNo, colDate, colTime, colPlace, signup, openToAll and recurring).

## `statusOf`

An event's status on the board: the sign-up word with a sign-up to show (amber), else «open to everyone» where the design says it, else nothing; a cancelled event says so in the alert colour.

## `departures`

R3 Departure board: a dark board of split-flap rows under an amber heading and the time it was updated, the columns headed Date, Time, Event, Place and Status, each row the event's start as 04.10 and 18:00, its title and place cut to the flaps and set in capitals by the style sheet, and its status (the sign-up, open to everyone, or cancelled in the alert colour); the first row carries the excerpt. With rewriting off the rows hold the calendar's own text whole, wrapping as it must.
The heading, the status words and the subscribe link are the design's own (the theme words now, signup, openToAll and subscribe).

## `marquee`

R4 Cinema marquee: a cinema's letter board in a red frame between two rows of bulbs, «Now showing» over the next event in large letters with its countdown, the date, time and place on one line beside the sign-up, the excerpt, and «Coming soon» over the events after it as rows of date, title and time.
The heading words and the sign-up are the design's own (the theme words now, later and signup); the capitals are the style sheet's.

## `marqueeRows`

The marquee on a phone: the letter board in its red frame as a list, «Now showing» with the countdown over a row per event (its date and time, title and place, the first with its excerpt and sign-up), and the subscribe link at the foot.

## `rcRows`

The receipt's rows: per event the date, the title and the time in the columns the rows share with the dot leader between them (the calendar's sheets), the place and status under them, and the first event's excerpt under that.

## `rcNextIn`

The days to the next event: the number and the word for days in the receipt's own words («Next in ... 3 days»), the countdown in the neutral ones («Next ... In 3 days»).

## `receipt`

R5 Receipt: a till receipt on paper with a torn bottom edge, in a monospace face: the heading over the period and the venue, the events as rows of date, title, dot leader and time with the place and status under each and the first one's excerpt, the totals (the number of events, the days to the next one and the admission in large type), and the barcode that is the subscribe link over the thanks. In the fold the receipt goes on with the rows alone.
The heading, the totals' words, the sign-up and the subscribe link are the design's own (the theme words program, countLabel, nextShort, signup and subscribe); the period, the venue, the admission and the thanks are content lines the owner can remove. With rewriting on the date is 04.10, the time the start alone, and the title and excerpt are set in capitals and the title cut to its row by the style sheet; off, the rows hold the calendar's own text.

## `seventies`

R6 Seventies poster: a rounded cream poster with a sunrise of arcs at its top, the heading in a rounded face over a spaced line, and a mustard panel holding one cream pill per event (the day over the short month in a round badge, orange, mustard and brown in turn, the title with the time and place under it, the first event's excerpt, and the sign-up at the pill's end), with the subscribe link under the panel.
The heading, the sign-up and the subscribe link are the design's own (the theme words now, signup and subscribe), and the line under the heading is content the owner can rewrite or remove (`period`).
The rest of a folded list is drawn as a panel on a poster of its own, the badges' turn carried on.

## `decoRow`

An Art deco row: the day in gold over its month, the title with its time and place under it, and the countdown at the right; the first row of the list carries the excerpt.

## `deco`

R7 Art deco: a programme in a gold double frame on black, a sunburst over the heading and the season line under it, the events as rows of the day in gold, the title with its time and place, and the countdown, the first with its excerpt; the first event's sign-up and the subscribe links stand at the foot.
The heading and the sign-up are the design's own words (the theme words now and signup), the season line is the shared period text (`period`, content the owner can rewrite or remove), and the capitals are the style sheet's.
The events a list folds away are drawn as rows alone, without the heading and the foot.

## `cards › marquee`

R4 Cinema marquee's own card: a cinema ticket, the date, title and facts on its face and the stub down its right side with the day standing; the bulbs over it and the tear line under it are the calendar sheets'.

## `cards › receipt`

R5 Receipt's own card: the receipt's number over the title (the event's place in the calendar's list, the theme word cardNo), the facts as dot-leader lines with the date first and the category last, named as the receipt's columns, and the thanks at its foot; the torn edge and the capitals are the calendar sheets', the capitals of the calendar's data only with rewriting.

## `cards › seventies`

R6 Seventies poster's own card: a band of stripes across its top with the event's calendar as its label, the row of matches under the band and the halftone strip at the foot drawn by the style sheet.

## `cards › deco`

R7 Art deco's own card: a fan piece in each corner of the gold double frame, a fan of thin rays over the date, and a rule with a diamond under the title; the frame is the calendar sheets'.
