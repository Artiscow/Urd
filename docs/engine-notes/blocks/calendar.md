# blocks/calendar.js

The full text of the longer comments in the engine's `blocks/calendar.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: calendar.
A subscribable event calendar built from iCal feeds (Google Calendar, Nextcloud, Outlook and others), following the ApeironLF design requirements.
Fetching ALWAYS goes through the site's own feed proxy (/api/ics): feed hosts send no CORS, and the site's CSP allows connect-src 'self' only.
Locally, without functions, the preview shows demo data and visitors get a quiet empty state.

Views: list (date-badge rows), cards, month, agenda (compact rows under their month) and next (a card for the next one to three events, with more listed under «Later»).
The sources are merged, and the same event from two calendars is shown once.
A source can carry a name and a colour: the name is then the category of everything in that calendar (the chip, and the filter), and the colour tints its chips and date badges.
A view with nothing to show draws a visible empty state, with the owner's own words and icon when set.
Conventions: "Category: Title" gives category chips with a filter, and a signup link in the description becomes a button.

The look is a design (calendar-designs.js): the plain one draws every view on the theme's colours, and every design exposes its colour slots, an optional edge stripe on its boxes, the sign-up and subscribe buttons as switches, and a style per event field, all set in the Style tab.
Every word a design draws that is not the calendar's own (the labels, the buttons, the words of a time and of a countdown, the texts with a number in them) is rewritten by clicking it in the preview, with the text toolbar, and stored as HTML under `texts`.
The parser (ics.js) and the design model are loaded on the first render, never in the visitor closure.
The sources, the view and the count are edited in the Properties panel; the help chip (ADR-0008) explains the conventions.

## `import { t, ta, tp, pluralForm,`

t() for visitor texts (the site language), ta() for the editor chrome (the admin language), dates() for month and weekday names, tp() for plurals; never called at module level.

## `loadOccurrences › all › map › const readied`

Every event remembers the source it came from (expandEvents keeps it on the occurrence): its name and colours, and from the site's registry its words, page, organizer and whether it stands in the filter.

## `loadOccurrences › const placed`

The sources are one calendar to the visitor: an event that stands in two of them is shown once.
With a zone set for the site, every time is moved to that zone's clock; `real` keeps the moment itself for the countdowns.
An all-day event is a date, the same on every clock, and is left as it is.

## `copyLastDrawing`

Fills a calendar drawn again with a copy of its last drawing, where its settings are the same, out of reach until its own drawing replaces it, so a redraw (its section's, the editor's drafts arriving, the phone's width crossed) never leaves it blank.
A copy of the drawing that waits keeps its words hidden (`data-cal-copy="wait"`).

## `paintColor (2)`

A node in a calendar's own colour, so its chip, badge and stripe follow the calendar, with the text colour that reads on it.
The registry's extra colours, when set, replace the derived ones: the text on the colour, the event's box and the chip.

## `imageUrl`

The event's picture through the site's own picture route (the CSP allows pictures from the site itself only, and the route checks the host against the picture allowlist); null when the event has none.

## `makeUi`

The helpers a draw hands its view.
`field` builds an element for an event field (title, date, time, place, description, category, number) carrying the owner's style for that field; `meta` is the date, time and place line as such fields.
`tx` is a word the design draws (a label, a button's words, the words of a time or a countdown, a text with a number in it) that the owner rewrites by clicking it in the preview, where the text toolbar attaches to it as to a text block; `retx` draws it again with new values (a ticking countdown); `line` and `group` hold the content a design ships with (CAL\_CONTENT\_TEXTS), which the owner can remove.
`notice` makes the announcement's box: its text stops after a few lines, and a text that does not fit opens the announcement in full in a card.
`signup` is the sign-up button when the block shows them; `recurring` is the mark on an event that repeats, `program` the link to the whole programme when the block has an address for it, and `openToAll` the words on an event without a sign-up.
`time`, `timeText` and `countdown` are nodes with the words in them; `timeString` and `metaString` are the same as plain text, for a tooltip or a screen reader.
`dayMonth`, `dateLine`, `weekdayDay`, `monthYear`, `monthRange` and `percent` write dates and shares in the order and form of the site's language.
`filter` is the category filter for a design that draws its own, and `offset`, `total` and `rest` tell a list design where in the whole list its rows stand when the block folds the rest.
`opt` holds the design's own settings (calOptions), and `descriptionIn` says whether a design with room draws the description in its rows or leaves it to the card (calDescription).
Every edit posts the whole props with the text under its slot in `texts`, so the editor's draft stays the owner of the words.

## `makeUi › let wordsDesign`

The texts the design has words of its own for, while the owner keeps its word choice (calThemeTexts); a design drawn as the phone view brings its own (withDesign).
The event's card is the block's, not the design's: the texts drawn inside plainWords take the common words, and keep them when painted again.

## `makeUi › const defaultWords`

The dictionary's words for a text in the site language, with its placeholders left in: the design's own words where it has them (themeString), else the common ones.

## `makeUi › const line`

A content line (CAL\_CONTENT\_TEXTS) in its box: the box with the words in it, or for a visitor null when the owner removed the line or it has no words.
In the editor an empty line stays as a faint hint, marked `urd-cal-gone` so the Clean view and the fit leave it out.
`carry` marks a line whose words make the group around it worth drawing.

## `makeUi › const notice`

The announcement's box, built from its lines: null for a visitor when none of its own words is left (`group`).
Its text stops after the design's number of lines, and a text that does not fit gets «Read it all» and opens the announcement in full in a card, as an event does.
With the editing handles on, a press on the cut text of the selected calendar opens the card, where the whole text is written; the other words are written where they stand.

## `makeUi › const time`

The event's time as it is written: «18:00-21:00» with its end, «all day», «until 6 Oct» for a span of days, and «Cancelled» for a cancelled event.
The clock is 24 hours unless the block is set to 12; the words are texts the owner rewrites.

## `makeUi › const editLink`

A link around words the owner rewrites: with the editing handles on, a press goes into the words and the link is never followed or dragged; in the Clean view it works as published.

## `makeUi › const tint`

The event's box: tinted by its calendar, and opening the event in full at a click or Enter.
A click on a link, a button or a text being edited is left to that element.
With the editing handles on in the preview, the first press selects the calendar and a press on an event of the selected calendar opens its card, where the card's words are rewritten too.
A box that holds the rows of other events (a «Coming up» card) passes its event's own words as `mark`, so a cancellation strikes them alone.

## `excerptOf`

The first line of a description with words in it, as plain text when the feed writes it as rich text, cut at a word boundary near `max` and never inside an address.

## `emptyNode (2)`

The empty state: an icon and a line of text, in every view.
The words are the owner's (props.emptyText) or the translated default; the icon is an id from the icon library (props.emptyIcon), the calendar when none is set and nothing at all for 'none'.

## `emptyApNode`

ApeironLF's empty state, for the designs that declare it: a pill with a kicker and a heading, the owner's line and icon in a dashed box, and the subscribe buttons under it.

## `foldNode`

The fold for the events beyond the max count: a native details element whose summary counts them, with the same design drawing the rest inside it, so the whole list is in the page.

## `searchField`

The search field: one node for the life of the block, so the words and the caret stay while the calendar is redrawn under it.
On a phone the field is folded behind a button with the search icon, and opens when the button is pressed; it stays open while it holds words.

## `dayGrid`

A day grid as one tab stop, called after every paint of the grid.
The arrow keys move between the days (up and down to the day above and below on the screen), Home and End to the ends of the row, and PageUp and PageDown to the span before and after (`page`, the design's own move through its weeks or months); an arrow past the first or the last day pages too.
Tab from a day goes through that day's events and out of the grid.
The tab stop starts on the day `current` matches, else the first.

## `writeEventData (2)`

The events a published calendar shows, written into \<head> as JSON-LD (schema.org `Event`), one script per block.
It carries the mark seo.js clears at every page render, so a page left takes its events with it.

## `phoneDays`

The days of a month as the phone draws them: every day a button with its number and a dot per event, and the picked day's events listed in the panel under the grid.
Today is picked first, else the month's first day with an event.
The day buttons are appended to the grid after its lead cells.

## `loadingNode`

The loading state: quiet bars at the height the calendar will have, with the word for a screen reader.
The height the session saw is the closest; without it the phone takes the height the editor measured there (`--urd-loading-h`, base.css).

## `renderCalendar › const ready`

A calendar whose code is all in (readied before the page was drawn, prepareCalendar in calendar-load.js) is drawn as the page's drawing ends, in the same task, so it stands with the page from its first frame; its drawing takes the feeds its readying asked for (takeReadied).

## `renderCalendar › const early`

Otherwise the feeds are asked for as soon as the parser is in, beside the other modules, so the events arrive with the code that draws them; the drawing takes these requests (loadOccurrences), and a copy drawn only to be measured asks for none.

## `drawCalendar › const phoneView`

The phone design (calPhoneView) and the card design (calCardDesign) the block wears, each as a class of its own; the card's dress is written for the card (dressDialog).

## `drawCalendar › const ruler`

A calendar narrower than NARROW\_PX draws its narrow layouts: the designs
with seven columns lay their days under each other, and the months show
dots that open the day. Where container queries exist the calendar asks
its own width (ADR-0025), so a calendar in a narrow column of a wide page
is narrow too and a drag passes through both layouts; else the window
decides, as the page's phone view.
The width counts as the content has it: the block's drawn scale zooms the content (render.js applyZoom) and the frame follows the size, so a calendar drawn smaller has the room it had and keeps its layout.

## `drawCalendar › let frame`

The ruler hears the width alone, and the calendar is drawn again in the
next frame rather than inside the observer, where a change of its height
would come back to the push pass as a notification it cannot deliver.

## `drawCalendar › draw › const shownDesign`

The calendar filter, when the owner switched it on; a design with switches of its own (ownFilter), the block's or the one behind the switcher's button, draws no chip row.

## `drawCalendar › draw › const chosen`

The design behind the button (calSwitcherViews) is drawn in a box of its own that carries its class and its options, so its style sheet rules and settings apply inside the block's own set.

## `drawCalendar › draw › const look`

On a phone another design, or a phone design a design lends, is drawn in a box of its own that carries that design's set, its class (for a design drawn as itself) and its options, with its words.
The owner's colours on this calendar belong to its own design: the box clears them, so the other design is drawn in its own.

## `drawCalendar › const key`

In the editor the example events stand in for the calendar's own while no calendar is connected that answers: by the choice made for the session on its bar's button (preview-edit.js), else while it has no sources or none of its feeds can be fetched, so its design can be seen and set; the reason a feed failed is kept for the button's tooltip.
Visitors see the calendar's own events, or its quiet empty state.

## `drawCalendar › settle › el.dispatchEvent`

The bar's button reads what the calendar now shows (preview-edit.js exampleButton), and a new calendar's fit measures it now that it stands (urd-drawn, add-fit.js).

## `drawCalendar › const weekFrom`

The switcher needs the week and the month from their start, whichever is the earlier.
The week begins on the day the site's language starts it on, which can be the day before Monday.

## `drawCalendar › if (!ctx.measure && !('calCopy' in`

While the feeds are on the way the calendar stands in its own design, drawn with the sample events, their words and pictures hidden under a loading note, so the calendar is seen at once and its events fill it as they come.
It waits a frame, so a feed already at hand (the session's copy) is drawn without it; a copy drawn only to be measured goes without it, and so does a calendar whose rules did not load, which could not hide the words.
It stands at the height the loading state kept, the sample drawn into it, so nothing around the calendar moves until its events are in.
A calendar showing its last drawing keeps it until its own is in.
