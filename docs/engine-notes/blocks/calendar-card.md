# blocks/calendar-card.js

The full text of the longer comments in the engine's `blocks/calendar-card.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The calendar block's event card: an event or the announcement in full, in a dialog laid over its calendar (ADR-0011), opened from the block (calendar.js).
Loaded once the page is idle or at the first press that opens a card, never in the visitor closure.

## `dressDialog`

The card wears the card design the block names (calCardDress, written on the block as `data-card-set`, `data-card-classes` and `data-card-colours`): the set it is drawn in, the card classes (`urd-cal-dlg-<design>`, where a design overrides its set's variables for the card, and a lent card design's own), and the owner's colour slots copied from the block when the card is the calendar's own design's or the neutral one, so calendar.css draws it in the right colours although it lies in the page.

## `showEventDialog › const add`

«Add to calendar» opens the ways to do it: this one event (to Google, or as a file for the other calendar apps), or the whole calendar (a subscription, and its iCal address to copy).

## `openCard › for (const other of`

The card lies over its calendar and leaves the page alone (a dialog that is not modal): the page scrolls under it, and Escape or a press anywhere outside it closes it.
One card is open at a time.

## `openCard › document.addEventListener('pointerdown')`

The canvas's colour picker and menus lie outside the card and work on its words; the editor's text bar stands outside the canvas, where this press never reaches.

## `openCard › const clear`

The card is given a place in the part of the page that is in view before it opens, below the room a menu that stays on screen keeps at the top (scroll-padding-top, base.css), so opening it (which moves the focus into it) never scrolls the page.

## `placeOverCalendar`

Lays the card over the calendar it belongs to, centred on the part of the calendar that is in view: at its own width and as tall as its content, so it may reach past the calendar's edges (a card never scrolls inside itself), never wider than the window and never over the navigation bar; a card taller than the window starts under the bar and the page scrolls.
It is placed on the page, so it scrolls away with its calendar, and placed again when the window changes or its own content unfolds.
The card is drawn at the calendar's own zoom (the block's drawn scale, render.js applyZoom), so it follows the size the owner gave the block. Its place is measured where it lands and set right from there (placeAt), so it lands where it should however the browser applies the zoom to its offsets.
The calendar and the rest of the page are left as they are.
