# Testrunder (sjekkliste for manuell testing)

Nytt som er levert og venter på manuell testing i produksjon/lokalt. **Punkter strykes kun av den som tester**; assistenten legger til nye punkter når noe leveres, men fjerner aldri noe her. Nye leveranser får en egen «Testrunde-batch»-seksjon øverst (nyeste først); punkter uten batch ligger i restlisten nederst. [BACKLOG.md](BACKLOG.md) eier oppgavene; denne listen eier testingen av det som alt er levert. Om noe er fjernet betyr det at det er sjekket og løst eller oppført som en kjent bug.

### Test batch (0.7.20.4): the search in the element menu

- [ ] The calendar's menu from the gear, «clock» in the search field: only «Clock» shows, with «View and count» open; Style and Placement say that nothing matches
- [ ] «colour»: the Colours, Edge stripe and Text fields groups open with what matches; «size»: «Text fields» shows the field picker over «Size (px)»
- [ ] Two words in any order («text colour», «colour text») find the same settings, and a group's name shows the whole group
- [ ] A group opened by hand before the search: after emptying the field it is the only group open, and the narrow menu is on the same tab
- [ ] Esc in the field with words empties it; Esc again closes the menu
- [ ] The narrow menu while searching: the three areas under each other, the quick row gone until the field is empty
- [ ] The search field over the menu in Properties: it narrows that menu only, and selecting another block empties it
- [ ] «switcher», then «Show view switcher» turned on: «The week starts» stays hidden until a word finds it
- [ ] The design picker open, a word typed: the picker closes and the hits show
- [ ] Another block type (a gallery, a form): a word from one of its labels or tooltips finds it

### Test batch (0.7.21.4): the block follows its own width

- [ ] Month with side panel dragged narrower by its corner: the panel goes under the month as the block passes 600 px, while it is dragged
- [ ] A plain month or Week plan dragged below 540 px: the month turns to dots with a day list and Week plan stacks its days; dragged wider, they come back
- [ ] A narrow calendar on a wide page and the same calendar in the mobile view: both show the narrow layout
- [ ] A gallery with four columns (grid, mosaic and polaroid): two columns in a narrow block, four in a wide one, the mosaic a whole wall
- [ ] Product cards with a fixed column count: two columns in a narrow block, one below 320 px
- [ ] An alternating timeline below 480 px: the line along the left edge, the cards under each other
- [ ] A table and a statistic in narrow blocks: tighter cells and a smaller figure, nothing outside the box
- [ ] Bento, Split card, Year wheel and Regular event change by the block's width, also in a wide window
- [ ] The pages on a real phone: calendars, galleries and products look as before
- [ ] No errors in the console while blocks are dragged back and forth

### Test batch (0.7.21.2.2): a drag never stretches a section

- [ ] The front page's top section: its height is the same with the editing chrome on and in Clean view (the collection's «+ Add images» buttons and «Write text …» lines no longer make it taller in the editor)
- [ ] The collection in the top section dragged a little down or sideways: the section's bottom edge stays where it was during the drag and after the release; one Ctrl+Z puts everything back
- [ ] The same collection dragged down until its lower part passes the section's bottom edge: the section keeps its height and the collection lies over the next section, in the editor, in Clean view and on the published page
- [ ] After that first drag, the section's bottom handle can make the section shorter again, and the collection then lies over the edge
- [ ] A click on a block, and a straight pull up or down on the corner of a calendar, collection or FAQ: nothing changes, and Ctrl+Z has nothing new to undo
- [ ] A block with a text right under it that is drawn pushed down (an FAQ or a collection whose content outgrew its frame), dragged sideways: the text stays where it was shown; one Ctrl+Z restores both
- [ ] The same with a set (Shift-click two blocks), dragged by one of its blocks and by the grip on the set's toolbar
- [ ] A block like that dragged into another section: one Ctrl+Z puts it back, with both sections as they were
- [ ] The arrow keys, «Align bottom» and «Distribute» on blocks like these: they line up by the boxes you see, and one Ctrl+Z restores
- [ ] An FAQ near the bottom of a section dragged narrower by its corner: the section grows while you drag, and stays so after the release
- [ ] A collection with image buttons right above a text block, in the editor: the buttons may overlap the text while editing; Clean view shows the page without the overlap
- [ ] Type into an empty «Write text …» field of a collection card, then switch to Clean view: the typed words show
- [ ] An FAQ with an answer open, dragged sideways: the open answer still pushes the blocks below; closed, the FAQ stands at its closed height

### Test batch (0.7.21.2): the height that follows the content

- [ ] A page saved before this version, in the editor and on the published page: every calendar, collection, product card, basket, checkout, countdown, FAQ, form, quote, share, statistic, table, timeline and audio block stands at its content's height with no air under it; the blocks below stay where they were, and nothing is cut off
- [ ] An FAQ switched between cards and list in its menu: the outline follows the content at once, growing and shrinking
- [ ] A calendar changed from a list design to a month design and back: the outline follows each design; the blocks under it move down with the taller design and stay where they are with the shorter one
- [ ] One of these blocks dragged by its lower corner straight down, then straight up: the height stays, a magenta mark with «The height follows the content» shows at its lower edge while the button is held, and nothing changes when it is released
- [ ] The same corner dragged sideways: the block narrows or widens as you drag with its height following the content, and after the release the outline matches the content
- [ ] The pointer over the corner of such a block: a sideways arrow, and the tooltip «Drag to change the width; the height follows the content»; on a text or an image block the diagonal arrow as before
- [ ] A long line typed into an FAQ question or a quote in the preview: the block grows with the words, the caret stays where you type, and the blocks below move down
- [ ] An FAQ answer opened, typed in and closed again: the FAQ goes back to its closed height with no air under it
- [ ] An FAQ on the published page: an opened answer pushes the blocks below down and closing it brings them back; on a phone the FAQ grows with the open answer
- [ ] A collection or product cards in the editor, then in Clean view: in Clean view the outline matches the cards (the editor shows the image buttons and the empty-field placeholders on top)
- [ ] A section with a height of its own and a calendar near its bottom changed to a taller design: the section grows to hold the calendar and the blocks below it
- [ ] Undo right after a change that made a block taller: the setting, the height and the blocks below go back together
- [ ] The audio block with a sound file: the outline is as tall as the player
- [ ] Three statistics in a row as cards: they line up when their figures and labels take the same height (a label on two lines makes its card taller until «stretch» in 0.7.21.3)
- [ ] The basket on a shop page: an open drawer leaves the blocks below where they are
- [ ] A calendar with a real feed: on the published page it holds the frame's height while it loads and stands at the events' height after; in the editor its outline follows the events once the fit has come back
- [ ] The push batch's «drag a calendar taller right after a change of setting» no longer applies: a calendar's height follows its content, and the drag items above replace it

### Test batch (0.7.0.36-0.7.19.17p): what the push review fixed

- [ ] A calendar in the preview: rewrite two of its texts (for example «Upcoming» and «Week» in the view switcher), reload the editor: both rewrites stand
- [ ] An all-day event over two days (for example a Saturday and a Sunday): it shows on both days in Week strip, the month on a phone and the day plan; «Add to calendar» gives the right last day in Google Calendar and in the file
- [ ] With a time zone set for the site and the computer on another zone: an all-day event stands on its own day, and a timed event at the zone's clock
- [ ] Billboard, Split card, Countdown ring and Dark glass with a cancelled next event: only its title is struck; the «Later» rows look as usual
- [ ] Week plan with an event from 22:00 to past midnight: the hours run to 23 and the event is drawn; Day plan the day after shows it in the row above the hours
- [ ] Week plan and Calendar layers: the arrows through the weeks around the end of October keep to whole weeks from the first day
- [ ] The 12-hour clock on Week plan and Day plan: the hour axis reads «1 pm»
- [ ] The site in English: dates read «5 Oct», never «5. Oct»; Dark glass's clock reads «01d 15h 22m»
- [ ] Agenda, dark: pick a calendar in its menu that has nothing coming; the menu stands and another calendar can be picked
- [ ] Timeline: a click on an event's words opens its card; a cancelled event's title is struck
- [ ] Year wheel with a screen reader: the months are buttons that read their name and pressed state
- [ ] A card open in the Clean view while the calendar is drawn again (a setting changed in another tab of the editor, or the window crosses the phone width on the published page): the card closes
- [ ] A calendar whose feed answers with junk on the published page: the quiet empty state, never standing loading bars
- [ ] Clean view, a design with «Address of the whole programme» set to another site: the link opens in a new tab, and the editor's preview stays
- [ ] Editor: change a calendar setting and press Undo once: the setting and the calendar's height go back together; drag a calendar taller right after a change of setting: the height you dragged stays
- [ ] Editor: open the design picker, close the menu with the cross, open the menu again: it shows its areas; choose Week strip, then Plain: the view is List
- [ ] Editor: a new Agenda calendar and a new «Coming up» calendar show no «changed» dot on their view group
- [ ] An own icon from an animated GIF: it becomes a small still icon; a GIF above 4 MB says it is too large
- [ ] A section with the inverse theme and a wave divider at the bottom with the default colour: the divider shows in the page's background colour
- [ ] The calendar guide and the setup guide: with a Proton, Outlook or Nextcloud calendar, adding its host to `ICS_HOSTS` as described makes the calendar show

### Test batch (0.7.19.17): the calendar's designs in the palette, the templates and the translations

- [ ] Blocks panel, Calendar, «Designs» unfolded: 34 thumbnails grouped by view, none running out of the panel
- [ ] A press on a thumbnail (for example «Week strip») and a place in a section: the calendar comes in that design, and its outline fits it
- [ ] The block search: «Week strip» gives «Calendar: Week strip», and it adds the same
- [ ] «+ New block» in a section, Calendar: the list unfolds with the views and the designs, can be scrolled and used though it is long, and a press adds that design with an outline that fits
- [ ] The four new section templates («What is on: cards», «month», «week» and «next»): each gives a heading and a calendar in that view, inside its section
- [ ] Admin in Nynorsk, a calendar's menu: the labels are in Nynorsk and none runs out of its control
- [ ] The site in Swedish (the language pack on): a calendar's buttons, date phrases and plural forms are in Swedish
- [ ] The site in Northern Sami: the calendar's visitor texts are in Sami; read by someone who knows the language, with the wrong ones noted
- [ ] A press on an event with the page scrolled far down: the page stays where it is, and the card opens over its calendar
- [ ] The week of the view switcher, and Week strip, in a calendar about 650 px wide: the time and the title stay inside each event's box
- [ ] Week strip in a calendar narrower than 540 px on a wide screen: the days stand under each other; dragged wider again, the seven columns come back
- [ ] The calendar guide's «Designs» section and the user guide's calendar paragraph read through, in English and Norwegian

### Test batch (0.7.19.16): what the calendar reads from a feed, meeting and sign-up links, and the calendar guide

- [ ] A real feed with an event on «the last Thursday of every month» (made in Outlook or Google Calendar): the occurrences land on the right dates for the coming months
- [ ] A real feed with a yearly event in a given month («the second Sunday of May») and an event with single extra dates: both show on the right dates
- [ ] An event with a Google Meet or Teams meeting added in the calendar app, and no link in its description: the card shows «Join», and the tooltip names the host
- [ ] An event with a Proton Meet, kMeet or Element Call link in its description: the card shows «Join»
- [ ] Site panel, «Own meeting addresses»: a host or a whole pasted address is stored as the host alone, several divided by commas; an event with a link to that host then shows «Join»; emptying the field removes it again
- [ ] «Show «Sign up» buttons» on: a description with «Sign up: https://…» or «Tickets: https://…» gives the button to that address; an event from an event service with its own address gives the button to that page; a description with only a plain link gives no button and the link stays in the text; a picture link or a meeting link never becomes the button
- [ ] «Show «Sign up» buttons» off: no «Sign up» button in the lists or in the card
- [ ] «Sign up» and «Join» show the host they lead to when the pointer rests on them
- [ ] An event whose calendar app stores a point for the place: with OpenStreetMap or Apple Maps as the map service the place opens that point; with the others it opens the search as before
- [ ] An event with a formatted description (from Outlook): the card shows paragraphs, lists, bold and links, and no pictures, colours or forms from the feed
- [ ] A Nextcloud calendar's share link, copied from the share dialog and pasted under Sources as it is: the events show, and «Subscribe» gives an address a calendar app can follow
- [ ] The calendar guide (docs/languages/calendar-guide/, English and Norwegian) read through: the steps for finding the iCal address match Google Calendar, and for each other service that is tried the «Tested» column and the steps are corrected to what was found
- [ ] The links to the calendar guide from the user guide and from the README tables open it

### Test batch (0.7.19.15): finding events in the calendar

- [ ] Element menu, a calendar: «Show place filter», «Show search field» and «Show earlier events» stand under the category filter and are off on a new calendar; «Show earlier events» is hidden for a month, week, day or year design; the group's reset switches all three off
- [ ] «Show search field» on, published: typing a word leaves only the events with it in the title, place or description, whatever the case; two words must both be found; the field keeps its text and the caret while the list changes; a search without matches shows «No events match»; emptying the field brings every event back
- [ ] «Show place filter» on, a feed with two or more venues: a button per venue («All places» first), named by the place up to its first comma; a press narrows the list and the pressed button keeps the focus; with one venue no row is drawn
- [ ] «Show earlier events» on, a feed with events in the last 90 days: «Earlier (n)» under the calendar with the right count, the latest first; a press on a row opens the event's card; nothing that is over stands among the coming events
- [ ] Search, place and category together: each narrows what the others leave, and the «Earlier» fold follows them
- [ ] A feed whose events carry `CATEGORIES` (and whose calendar has no name in Properties): the category chips and the category filter show the feed's categories, and a title with a colon is left whole
- [ ] The three in a list design, a card design and a «Coming up» design, on a phone: the field and the button rows fit the width
- [ ] The sample data in the preview shows one event under «Earlier» when the switch is on

### Test batch (0.7.0.39): the event card leaves the page alone, and the map service

- [ ] Published page: with an event's card open the page scrolls as usual, the scrollbar stays and the background does not move when the card opens or closes
- [ ] The card lies over its calendar and scrolls away with it; scrolled up, it goes under the navigation bar, never over it
- [ ] Escape and the close button close the card and put the focus back on the event; a press anywhere outside the card closes it; a press on another event closes the open card and opens the new one
- [ ] «Add to calendar» unfolded makes the card taller without moving it off its calendar
- [ ] Site panel, «Map service»: the list shows OpenStreetMap, DuckDuckGo Maps, Brave Maps, HERE WeGo, Google Maps, Apple Maps, Norgeskart and FINN kart in that order, each with a note under its name that reads in the list's width; OpenStreetMap is chosen on a site that has never set it
- [ ] With each service chosen and published, the place of an event with a venue's name before its address («Mormors Stue, Nedre Enkeltskillingsveita 2, 7011 Trondheim, Norge») opens that service at the right spot
- [ ] A place that is only a name («The clubhouse») and a place that is an address alone open the service with that text; a place that is a web address still opens that address
- [ ] The notes read in Norwegian, English and Turkish admin

### Test batch (0.7.19.14): the calendar's events as structured data

- [ ] A published page with a calendar that has a real feed: the page source's `<head>` (the live DOM, in the browser's inspector) holds a `script type="application/ld+json"` with the calendar's events beside the site's `Organization`
- [ ] That script pasted into the Schema Markup Validator (validator.schema.org): the events are read without errors, each with a name, a start and a place
- [ ] An event with an end has `endDate`; an all-day event has days without a clock; a cancelled event has `EventCancelled`; an event with a meeting link has a `VirtualLocation`, and with a place beside it `MixedEventAttendanceMode`
- [ ] «Tell search engines about the events» off in the element menu, published: the events script is gone and the `Organization` script stands
- [ ] Moving to another page of the site removes the events script of the page that was left
- [ ] The preview and a calendar with sample data write no events script
- [ ] Second check: Google's Rich Results Test on the published page's address finds the events; warnings for price, ticket link and performer are expected

### Test batch (0.7.19.13): the calendar's dates as time elements, day grids on the keyboard, and a printed list

- [ ] Published page, «Month»: Tab reaches the grid once (today, else the first day); the arrow keys move between the days, Home and End go to the ends of the week, PageUp and PageDown change the month and keep the day, and an arrow past the first or last day changes the month; Tab from a day goes through that day's events and then out of the grid; Enter on an event opens its card
- [ ] The same keys in Overview on cream, Month with side panel (Enter picks the day and the panel follows), Week strip (PageUp and PageDown change the week), the day picker of Day plan (Enter picks the day and the focus stays on it) and Heat map (one tab stop for the whole year, the readout follows the focused day)
- [ ] The months on a phone with a keyboard: the same keys between the day buttons
- [ ] With the editing handles on in the preview the arrow keys do nothing in a day grid; in the Clean view they work
- [ ] A screen reader: a day is read with its date and number of events («Sunday 4 October, 1 event»); a press on an arrow reads the new month, week or day; a press on «Week» or «Month» in the view switcher, or on a category, keeps the focus on the pressed button and reads it as pressed
- [ ] The page source of a published calendar with a real feed: dates and times are `<time datetime>`, with the day for a date and the true moment for a clock time, also with a time zone set for the site; «Cancelled» is not a time
- [ ] Print (or the print preview) of a page with a calendar, in a list design and in a month design: no buttons and no design, the events as a plain list of date, time, title and place; the list does not run over the block below it
- [ ] Every design looks as it did before on screen: no date, time or day number has changed its size, weight, colour or place

### Test batch (0.7.19.12): the calendar's loading state and the seven-column designs on the phone

- [ ] Published page with a real feed, desktop: while the calendar is fetched the block shows quiet bars at the frame's height, and nothing below it moves when the events arrive; with reduced motion set in the system the bars stand still
- [ ] Published page with a real feed, phone: the bars show while the calendar is fetched; on the second load in the same session (another page and back) the block has the same height before and after the events arrive
- [ ] A screen reader announces «Loading the calendar» while the feed is fetched
- [ ] The preview with a feed shows the bars while it loads, never «No upcoming events» for a moment
- [ ] Week strip on a phone (360 px): the seven days under each other, each event in the full width under its day, today marked, the arrows move through the weeks
- [ ] Week plan on a phone: the days under each other with their events in the order of the clock and all-day events first, no hour grid, «Today» on one line
- [ ] Calendar layers on a phone: each calendar with its events under its name and the day written on each event («Sun 4», a span as «Mon 5 to Wed 7»); the switches hide and show a calendar; the week label wraps instead of running out of the box
- [ ] «Month» and Overview on cream on a phone: every day a button with up to four dots in the calendars' colours; today is picked first; a press on a day lists its events under the grid, a day without events says «Nothing on this day», and a press on a row opens the event's card; the arrows change the month
- [ ] The view switcher on a phone: «Week» and «Month» show the same phone layouts
- [ ] Nothing in the five designs runs out of the block's width at 360 px, with a real feed with long titles

### Test batch (0.7.19.11): the card that opens at a click on a calendar event

- [ ] Published page and Clean view, every design: a click on an event opens its card inside the calendar, the calendar shaded behind it and the rest of the page untouched; the page does not scroll when the card opens or closes; Escape, the close button and a click outside close it, and the focus is back on the event; Tab to an event and Enter opens it too
- [ ] The card is never wider or taller than its calendar (a calendar lower than 300 px lets it reach below itself) and never lies over the navigation bar; more content than fits scrolls inside the card; scrolling the page keeps the card on its calendar
- [ ] With the editing handles on, a click on an event selects the block and opens nothing
- [ ] The card with a real feed: the whole description with clickable links, the picture, «Sign up» when the event has a sign-up link, «Join» when it has a Zoom, Teams, Meet, Whereby, Jitsi or Webex link, and no sign-up or «Add to calendar» on a cancelled event
- [ ] «Add to calendar» unfolds: «This event only» with «Add to Google» (opens Google Calendar with the title, time, place and description filled in) and «Download as a file (.ics)» (opens in Apple Calendar and Outlook with the right time); «The whole calendar» with «Subscribe» and the iCal address, which is selected at a click
- [ ] The card reads in every design: the words, the date line and the button have contrast against the ground, also on Glass, Dark glass, the dark designs and the plain month
- [ ] In the calendar itself, in the Clean view and on the published page: a place opens the map in a new tab (or the address, when the place is one), and an address in a description is a link; with the handles on, a click selects the block
- [ ] An excerpt of a long description ends at a word with «…», and an address near the cut is whole
- [ ] Switching to the Clean view closes the element menu
- [ ] The view switcher's second button reads «Uke»

### Test batch (0.7.19.10): times and status on the calendar

- [ ] With a real feed, an event from 18:00 to 21:00 reads «18:00-21:00» in every design that shows a time, and an event with no end in the feed reads its start only
- [ ] An all-day event over three days reads «until» its last day where the time stands, in the list, card, next and month designs; a timed event that ends on a later day reads its start, the last day and the end time
- [ ] An event cancelled in the calendar app (STATUS:CANCELLED) shows with a struck title, dimmed, «Cancelled» where the time stands and no sign-up button, in every design including the week, day and heat map designs
- [ ] Content, View and count, «Show cancelled events» off removes them from every view; on brings them back
- [ ] «Clock»: 24 h is marked on every calendar whatever the site language; 12 h writes «6:00 pm-9:00 pm»; the hour column of Week plan and Day plan stays 08, 09
- [ ] «The week starts» is offered on month, week, year and agenda designs, Bento and with the view switcher on: Sunday puts Sunday first in the weekday row and moves the grids; Auto follows the site language (Monday for Norwegian and British English)
- [ ] Site panel, «Time zone»: Europe/Oslo is accepted, «Mars/Olympus» is refused with «Unknown time zone» and leaves the stored value; an empty field removes it
- [ ] With the site's zone set and the computer's clock moved to another zone: the calendar's times stay on the site's clock, a line under the calendar names the zone, «today» and the countdowns still follow the real moment; with the field empty and a feed kept in another zone than the computer's, the line says the times are in your own zone
- [ ] Year wheel, «The month at the top of the wheel»: «The current month» puts this month at the top, and next month it has moved by itself

### Test batch (0.7.20.2): the calendar's settings in groups

- [ ] The element menu on a calendar with everything closed shows only group rows in Content and Style, each with its value: the number of sources, the view, «Off» or «N on» for the buttons, «Standard» or the owner's words for the empty state, «Standard» or «N of M changed» for the colours
- [ ] A group left open stays open when another calendar is selected, in the wide menu, the narrow menu and the Properties panel
- [ ] A change inside a group (a colour, a button switched on, a max count other than 6, a size other than 100 %) puts a yellow mark on the group's row and «Reset this group» under its controls; the reset puts the group's settings back, the mark goes, and one undo brings them back
- [ ] «Announcement» appears as a group only on the designs that have an announcement
- [ ] Wide menu: every label with a field or a dropdown stands over its control and none wraps beside it; narrow menu and Properties panel: label and control on one row as before
- [ ] «Reset the texts» appears under the Content groups only after a text in the block has been rewritten

### Test batch (0.7.20.1): the element menu's frame, and the calendar's size and defaults

- [ ] The gear on a block opens the element menu wide: Content, Style and Placement as columns, an area without settings (Style on the map block) taking no column; the button in the menu's head switches to three tabs and back
- [ ] Admin settings, «Element menu»: Narrow makes the menu open with tabs after a reload, Wide with columns; the Properties panel in the rail is always tabs
- [ ] With the Properties panel open, the floating menu never lies over the admin's panels; with the editor window narrowed until the wide menu does not fit beside them, the menu opens narrow
- [ ] Placement on any block: «On narrower screens», «Hide on mobile» and «Pin while scrolling» stand open at the top, «Motion» and «Placement, layer and rotation» are groups showing their value, and a group left open stays open on the next block
- [ ] The quick row at the top of the menu: «Narrow screen» and «On a phone» on every block, and on a calendar «Design», «Max count» (list, cards and agenda) and «Subscribe button»; each changes the preview at once
- [ ] «Narrow screen»: Shrink, close the menu, open it again: Shrink is still marked, in the quick row and under «On narrower screens»; Wrap switches back
- [ ] Calendar, the «Design» row in Style or the quick row: the picker fills the menu with six thumbnails across under the view headings, a click changes the design and the picker stays open, «Back to the menu» returns
- [ ] Calendar, the colours in Style: swatches in rows with the name under each, three across in the wide menu and five in the narrow one; the clear button sits on the swatch's corner
- [ ] A new calendar from the block palette, from the block menu and from a section preset: no category filter, no subscribe buttons and no «Sign up» buttons until they are switched on
- [ ] Glass and Dark glass on a section with a picture or a gradient: the section shows through the design; a colour in «Ground» makes it solid
- [ ] Every calendar design, picked one after the other with sample data and with a real feed: the outline ends where the calendar ends, neither clipping it nor leaving air under it
- [ ] Changing a calendar's count, view switcher, design settings or «Size»: the outline follows the new height
- [ ] Dragging a calendar's outline: narrower and wider reflow it while dragging with the text at the same size; shorter than the content, the outline comes back to the content on release; taller, it stays as dragged
- [ ] Style, «Size» on a calendar: 60 % draws the whole calendar smaller, text included, 150 % larger, and the outline follows; a drag afterwards leaves the percentage where it was
- [ ] A «Coming up» design chosen on a new calendar shows three events in the card and three under «Later»; a calendar whose counts were already set keeps them
- [ ] Coming up on cream: «Panel text» colours the words under «Later» without touching the titles on the card, and «Text» the other way round
- [ ] Content on a design with an announcement: the switch reads «Show the calendar's announcement»; turning it on or off leaves the strip above the menu as it was, and the strip's own switch leaves the calendar's note as it was

### Test batch (0.7.19.9): settings per calendar design

- [ ] Style tab on a calendar: «Settings for the design» stands under the design picker only on Month with side panel, Week plan, Day plan, Table, Poster wall, Picture cards, Year wheel, Numbered programme, Programme booklet, Split card and Band, and holds only that design's settings; every change shows in the preview at once and survives a reload and a publish
- [ ] Month with side panel, «Side of the panel»: Right, Left and Under move the panel; on a phone the panel stands under the month whatever is chosen
- [ ] Week plan and Day plan: «First hour» 6 and «Last hour» 22 give a plan from 06 to 21, empty fields give 08 to 17 again, and an event at 23:00 still shows with the last hour set to 20; «Tint the weekend» shades Saturday and Sunday
- [ ] Table: «Show the Time column» and «Show the Place column» off remove the column with its heading; «Striped rows» off leaves every row plain
- [ ] Poster wall and Picture cards, «Columns»: 2, 3 and 4 fix the count on a desktop, Auto fills the width as before, and a phone keeps its own layout
- [ ] Year wheel, «The month at the top of the wheel»: with August chosen, August stands at the top, the dots follow their months and a click on a month still lists that month
- [ ] Numbered programme, «Count 01, 02, 03» off counts 1, 2, 3, also through the fold
- [ ] Programme booklet and Split card with a real feed with descriptions: «Show the description» off removes it
- [ ] Band, «Roll when the band is too narrow» off: the band stands still and scrolls sideways by hand when the events are wider than it
- [ ] Coming up bento with «Events in the card» at 3 and one later event: three day tiles beside the first event; with 1 and 0 the block is as before
- [ ] A calendar block saved before this change renders unchanged in every design

### Test batch (0.7.19.8): the parts of the calendar artboards left out

- [ ] A list calendar (the plain list, Timeline, Table, Programme booklet, Numbered programme, List on navy, Glass) with more events than the max count: «Show all N (M more)» under the rows opens the rest in the same design without a reload; Numbered programme counts on (03, 04 ...) and its count is of the whole list; Table's folded rows may stand slightly off the columns above
- [ ] Content, «Fold the rest under «Show all»» stands under the max count on list designs only; off removes the fold, and a block saved before the change shows the fold
- [ ] With a real feed: a weekly event wears «Repeats» in List on navy and Grid on cream and a single event does not; the word is rewritten by clicking it, and «Repeats mark» in the Style tab's colours changes its colour
- [ ] Content, «Address of the whole programme» is offered on Poster wall, Tickets, Billboard and Coming up bento only; with /program filled in Poster wall has a last dashed tile, Tickets and Billboard a foot link and Coming up bento a link in its tile, all leading there on the published page; emptied, they are gone
- [ ] Tickets: an event without a sign-up shows «Open to everyone» at the right end, one with a sign-up shows the button; «Show «Open to everyone»» off removes the words; the words are rewritten by clicking them
- [ ] Day carousel: a dot per card under the cards, the long dot follows the scroll (arrows, touch, wheel) and a click on a dot scrolls to its card; with one card there are no dots
- [ ] Agenda, dark with two or more named calendars: a chip beside the month opens a menu under it with «All» and the calendars, a choice filters the cards and the chip names it, a click outside or Escape closes the menu; with one calendar there is no chip; the menu is also there in the Clean view and on the published page
- [ ] Bento with a real feed whose next event has a picture (an attachment or a picture link on an allowed host): the picture fills the hero tile and the words stay readable; without a picture the tile is as before

### Testrunde-batch (0.7.19.7): the view switcher and the design picker

- [ ] Content, «Show view switcher» on a list, cards, agenda or next calendar (any design): three buttons at the top of the block, «Upcoming» pressed; «Week» shows the week strip with its arrows, «Month» the month with its arrows, «Upcoming» the block's own design again; the published page starts on «Upcoming» every time
- [ ] The switcher with a real feed: the week and the month show this week's and this month's earlier events too, while the block's own design shows only what is coming
- [ ] «Show view switcher» is not offered for a month, week, day or year design, and a block that had it on and is given such a design shows no buttons
- [ ] The three button words are rewritten by clicking them in the preview (a click on the word edits, a click on the button's edge switches), and «Reset the texts» puts them back; on the Glass design the buttons stand in glass
- [ ] Style tab, the fold «Design: <name>»: opens to a thumbnail per design in two columns under the headings List, Cards, Month, Agenda, Next, Week, Day and Year, with Plain alone at the top; the chosen design has the accent frame; a click changes the design in the preview at once and the fold's name with it
- [ ] The help chip on a calendar block: the card's last line says the texts are rewritten by clicking them and that the Style tab sets colours, the stripe and the font per field

### Testrunde-batch (0.7.19.6): the ApeironLF set and the dark agenda

- [ ] Style tab, Design: Coming up on cream, Coming up on navy, Regular event and Agenda, dark draw the demo data in the preview and a real feed on the published page
- [ ] Coming up on cream: the navy head with the gold dot, the next event with the navy date badge and the «In N days» pill, «Later» on a gold rail; an event with a URL in the calendar (or a sign-up link) gets an arrow that opens it, one without gets none
- [ ] Coming up on cream, Show announcement: «The announcement as» Section puts it as a section at the foot with label, heading and text; Alert band puts a red band under the head with the heading alone and a warning icon; with a link the band and the arrow follow it; Alert band and Alert text recolour the band
- [ ] Coming up on navy: with Events in the card 2 or 3, the first on a cream card with the chip outlined, the place underlined and «Read more» when the event has an address, the others as navy cards with a gold edge, «2 next» at the top right, «Later» as lines
- [ ] Regular event: the next event's title large in red, the first paragraph of its description, When, Where and For whom («Open to everyone» is rewritten by clicking it), «All dates» folds out every coming date with the same title (Max count caps them); with one date there is no fold; Show announcement adds the aside to the right, under the card on a phone
- [ ] Agenda, dark: the month, this week's days with today in the accent and a dot under days with events, a card per event with the time to the left and a stripe in the calendar's colour, «Today» before today's date; Edge stripe off removes the stripes
- [ ] An ApeironLF design (the six of them) on a calendar with nothing coming up: the pill «Dates · Dates to come», the dashed box with the own line and icon from Content, the subscribe button in gold; the pill's two texts are rewritten by clicking them; the text is readable on a light and a dark page
- [ ] Picture cards with an event that has a picture ATTACHED in the calendar (not only a link in the description): the picture shows when its host stands in PHOTO_HOSTS

### Testrunde-batch (0.7.19.5): «Coming up» designs on the calendar

- [ ] Style tab, Design: Billboard, Stacked cards, Noticeboard, Split card, Band, One line, Countdown ring, Dark glass and Coming up bento draw the demo data in the preview and a real feed on the published page; Content shows Events in the card and Under «Later» for them
- [ ] Billboard: the pulse beside «Coming up», the three tiles count days, hours and minutes and move on after a minute, the sign-up as a full-width bar, «Then:» listing the later events, the subscribe link at the foot; Background, Text, Label, Pulse and the tile and button colours recolour it
- [ ] Stacked cards: with Events in the card 3, three cards stacked with the front one readable; «Browse the cards» turns the next card to the front; «3 next» at the top right; the later rows under
- [ ] Noticeboard: the next event on a pinned yellow note, «Show announcement» adds a blue note whose label, heading and text are rewritten by clicking them in the preview, Link from the announcement gives «Read more» its address, «Later» on the strip
- [ ] Split card: the weekday, the huge day and the month on the panel in the calendar's colour (The date panel otherwise), the chip, the title, the first line of the description and the sign-up to the right, «Later» under; the panel stacks above the words on a phone
- [ ] Band: the tag at the left, the next events in one line with dots between; with more than fit the band rolls, pauses under the pointer and stands still with reduced motion
- [ ] One line: the first rows (Events in the card) marked «Coming up» with the accent dot and stripe, the rest «Later», «In N days» at the right and the sign-up as a button
- [ ] Countdown ring: the ring fills over the last two weeks before the event, the middle counts days and on the last day hours, the two later rows with dots under a rule
- [ ] Dark glass: the countdown in monospace, «Until the start» with the percentage and the bar, the sign-up and the subscribe button side by side, «Then» in a glass box; Colour blob 1 and 2 recolour the blobs
- [ ] Coming up bento: the hero tile in the calendar's colour with «Coming up» and «In N days», a date tile per later event (the third dark), the link tile with the count and the subscribe link; no subscribe row under the block
- [ ] Every next design: the texts («Coming up», «Later», «Then», the units, the buttons) are rewritten by clicking them, the colour slots follow the design when empty, Edge stripe adds the stripe, and Show «Sign up» buttons off removes the buttons

### Testrunde-batch (0.7.19.4): month, week, day and year designs on the calendar

- [ ] Style tab, Design: Week strip, Week plan, Calendar layers, Month with side panel, Overview on cream, Day plan, Year wheel and Heat map draw the demo data in the preview and a real feed on the published page; Content shows no View for them
- [ ] Week strip: the current week with today framed in the accent, «Week N» and the span above, the arrows move a week at a time, a pill per event in the calendar's colour (Pill and Pill text otherwise)
- [ ] Week plan: the hours from the earliest event (at most 08) to past the latest (at least 18), today's column tinted and its number ringed, an all-day event in the row above, a timed one as a block in its hour with its length; «Today» returns to this week
- [ ] Calendar layers: one row per named calendar (or «Arrangementer»), a switch per calendar in the head that hides and shows its row, a bar per event spanning its days, today's column tinted; the chip row is not drawn and Content hides «Show category filter»
- [ ] Month with side panel: the month with at most two chips per day and «+N», today ringed, a click on a day shows its events in the panel, a click on a grey day from the next month moves the month, the panel's legend lists the calendars with their colours; the panel moves under the month on a phone
- [ ] Overview on cream: the month on cream with a gold rule at the top, the arrows outlined in gold, today in a gold circle, the pills with a gold line and the time in dark gold
- [ ] Day plan: today with «Today» above the date and «N today» at the right, the week strip picks another day, the now line in the current hour and the past hours shaded on today only
- [ ] Year wheel: twelve arcs, the months before this one in Past, this month in the accent, a dot per event (Later dots for those gone), the year and the count in the middle, a click or Enter on an arc lists that month's events to the right
- [ ] Heat map: twelve small months, every day shaded by its count (None, Few, More, Many), today ringed, pointing at or focusing a day reads its events out under the grid
- [ ] A calendar with sources: the month, week, day and year designs show events earlier in their span than now (this month's past events in the month designs, this year's in the year designs)
- [ ] Every time design: the colour slots follow the design when empty, Edge stripe adds the stripe to the day columns, plan blocks and cards, the field styles change the right pieces, and the texts («Today», «Year wheel», «The whole year», the legend) are rewritten by clicking them

### Testrunde-batch (0.7.19.3): six card designs on the calendar

- [ ] Style tab, Design: Poster wall, Tickets, Day carousel, Picture cards, Grid on cream and Bento draw the demo data in the preview and a real feed on the published page
- [ ] Poster wall: the first poster twice as large in Poster 1, the next two in Poster 2 and 3, the fourth plain, then the three colours again; category and place in capitals at the top, the day huge, the title and time at the foot; two columns on a phone
- [ ] Tickets: the stub in the Stub colour (the calendar's colour when the source has one) with the day, the month and the time, a dashed tear between stub and body, place · category under the title, the sign-up as a button at the right end
- [ ] Day carousel: the cards scroll sideways and snap, the two arrows move one card, the first card in the The first card colours, the sign-up as a button on it and the chip on the others
- [ ] Picture cards: an event with a picture attached in the calendar, or a picture link in its description, shows it in the band when the picture host stands in PHOTO_HOSTS; without, the band is the Without a picture colour; the date badge and the chip sit on the band; locally the band stays plain
- [ ] Grid on cream: cream cards with a navy head, the day in gold, the category as a gold pill, the place underlined in gold; Header row, Card, Text and Gold recolour them
- [ ] Bento: the hero tile for the next event with the «Next» pill and «In N days», two small tiles, the current month with today ringed, the next event's day in the accent and the other event days in Soft accent, «This month» counting this month's events, the subscribe tile when the block has a source, wide rows for the rest; no subscribe row under the block; two columns on a phone
- [ ] Every card design: the colour slots follow the design when empty, Edge stripe on the boxes adds the stripe to every card and tile, the field styles change the right pieces, and the texts («Next», «This month», «All», the buttons) are rewritten by clicking them

### Testrunde-batch (0.7.19.2): six list designs on the calendar

- [ ] Style tab, Design: the dropdown lists Plain, Timeline, Table, Programme booklet, Numbered programme, List on navy and Glass; each draws the demo data in the preview and a real feed on the published page, and Content's View disappears while a design other than Plain is chosen
- [ ] Timeline: the date on one line to the left, a rail with a dot per event (the first in the accent, the rest in Dots), the sign-up as a filled button, the chip under the title
- [ ] Table: the header row in Header row and Header text colours, every other row in Every other row, «all day» for an all-day event, the sign-up at the right end; a narrow block scrolls the table sideways instead of breaking it
- [ ] Programme booklet: the paper in Surface with a shadow, «Programme» and the month span in the heading, one column per month that wraps to one column in a narrow block, the day in the accent, the description's first line under the title
- [ ] Numbered programme: 01, 02, 03 in the Numerals colour, «3 events» at the top right, the sign-up or the chip in the right column, a rule between the rows
- [ ] List on navy: navy rows with the day in gold and the month in capitals, the category outlined, the place underlined in gold, the title in the heading font; the filter chips and the subscribe buttons follow the row colour
- [ ] Glass: three blobs behind frosted cards, Colour blob 1 to 3 recolour them, The glass and Glass edge change the cards, the filter chips and the subscribe button take the glass too
- [ ] Every design: the colour slots in Style follow the design's own colours when empty and the theme's dark mode stays readable; Edge stripe on the boxes adds the stripe to the rows, cards or table cells; Text fields Title, Date, Time, Place, Category and Large numerals change the right pieces
- [ ] Every design: click «Date», «Programme», «All» or «Sign up» in the preview and rewrite it; the words survive a reload and «Reset the texts» puts them back
- [ ] A block saved with a design renders the plain list on an older engine (the view is written along with the design)

### Testrunde-batch (0.7.19.1): the calendar card, named sources and the design foundation

- [ ] Calendar with two sources holding the same event: it shows once in every view; a signup link or a location present in only one copy is kept
- [ ] Next view, Events in the card 1, 2 and 3: the card holds that many in full, the heading reads «Next event» for one and «Coming up» for more; Under «Later» 0 to 10 lists that many one-line rows below
- [ ] A source with a name: its events wear the name as their chip and the filter shows the name; the title stays whole even when it reads «Møte: Årsmøte»
- [ ] A source with a colour: its chips, date badges and filter button take the colour; cleared, they follow the accent again
- [ ] «Calendars on the site»: lists the sources of the other calendar blocks (this page and the others), adds one with a click, and says so when there are none
- [ ] Agenda view: rows under their month with the day number and weekday, the limit counts like the list
- [ ] Empty state: a block without sources on the published page, and a feed with nothing coming up, show the icon and the line; own words and another icon in Content change it; None removes the icon
- [ ] Style tab, Colours: Accent, Surface, Lines and Chips set each surface; emptied, the theme's colours return; a dark theme follows along
- [ ] Style tab, Edge stripe on the boxes: a stripe along the left edge of every row, card, next row and agenda row in the event's calendar colour (else the accent); Stripe colour overrides it; off, no stripe
- [ ] Style tab, Text fields: pick Title and set font, size, Bold or Normal, italic, underline and colour: every title in the view changes, nothing else; the same for Date, Time, Place, Description (cards), Category (chips) and Large numerals (the badge's day number)
- [ ] Click «Next event», «Later», «All», «Sign up» or «Subscribe» in the preview: the text toolbar appears, bold or a colour applies, the words survive a reload and a publish; «Reset the texts» appears in Content and puts the defaults back
- [ ] Content, Show «Sign up» buttons off: the buttons disappear in every view
- [ ] A calendar block saved before this round renders as before, and its view can still be changed in Content

### Testrunde-batch (0.7.13.12): animated images and the video block's file source

- [ ] Upload an animated GIF as an image block: it moves in the preview and on the published page, and the file in media/ ends in .gif
- [ ] The same with an animated WebP and an APNG (.webp and .png in media/)
- [ ] A still PNG, JPG and WebP: compressed to webp as before
- [ ] An animated GIF in a gallery, as a background image and as a quote portrait: it moves in each
- [ ] An animation between 1 and 4 MB: kept, with a status line about its size; above 4 MB: refused with the size and the limit, in the panel and in the preview's image editor
- [ ] Video block, Kilde Fil, choose an mp4: the film shows with the browser's controls; in the editor a click selects the block, in Clean view it plays
- [ ] Video file with a poster: the poster stands until play; Gjenta loops it
- [ ] Uten lyd on, then Start av seg selv: on the published page the film starts by itself, silent; with reduced motion on it waits for play
- [ ] Uten lyd off: Start av seg selv disappears and the film does not start by itself
- [ ] A video file above 15 MB is refused, one above 4 MB warns; a .mov or .avi is refused with the format message
- [ ] Publish a page with a video file and a poster: both land in media/, and the page plays the file from there
- [ ] A video block made before this stage (a YouTube or Vimeo link) still embeds, and Kilde shows Lenke
- [ ] Deployed site: an unpublished video file in the preview (the known `media-src` gap in BACKLOG: expected blocked until published)

### Testrunde-batch (0.7.13.11): styled variants and two footers

- [ ] Statistikk, Variant Ren, Kort and Bånd: bare as before, in a card, and on a band in the accent colour with readable text; three in a row with the same variant stand as one strip
- [ ] A statistic made before this stage looks as it did, and still counts up for visitors
- [ ] Sitat, variant Stort, Som kort: the quote stands in a card with an accent line at the top; the switch is not shown for the short variant
- [ ] FAQ, Variant Liste: bare rows with a rule between them, opening and closing as before; Kort is the look an existing FAQ keeps
- [ ] FAQ Liste: the Kortstil settings are hidden; back on Kort they return with their values
- [ ] Linje with Tekst på linjen: the word stands in the middle with the line on both sides, in the line's colour and thickness; emptied, the plain line returns; the field is not shown for an arrow
- [ ] A labelled line rotated, and on a phone
- [ ] Footer panel, the template picker: ten cards, Kapitler and Delt with their own drawings
- [ ] Footer Kapitler: the brand on its own row, the columns numbered 01, 02, 03 under a rule each; on a phone two columns
- [ ] Footer Delt: the brand with its button on a tinted half, the columns in the other half; on a phone the brand panel on top
- [ ] Pick Kapitler, then Kolonner: the numbering is gone (the design is cleared)
- [ ] Both designs in a dark theme and with a footer background layer

### Testrunde-batch (0.7.13.10): the pattern layer and section edge shapes

- [ ] Section background, add layer Mønster: dots over the section; each of the eight patterns draws, and tiles meet without a seam
- [ ] Mønster with a theme colour: it follows a palette change and the light/dark button without a reload; an own colour stays
- [ ] Mønster Størrelse, Styrke and Vinkel: the tile grows, fades and turns; at 45 degrees the pattern still covers the whole section
- [ ] Mønster Inverter: the colour fills the surface and the pattern is cut out of it
- [ ] Mønster as a layer on the menu and on the footer
- [ ] Section, Kantformer, Nedre kant with each of the five shapes: a drawn edge at the section's foot, in the chosen colour, over the background and under the blocks
- [ ] Øvre kant: the same shapes turned upside down at the top; both edges on one section
- [ ] Kantformer Høyde, Speilvend and Inverter: the edge follows; the settings appear only when the edge has a shape, and Ingen removes it
- [ ] A divider in the colour of the next section: no hairline of the first section's background at the seam, at 100 % zoom and at a fractional zoom in the preview
- [ ] A divider on a phone: lower than on desktop, across the full width
- [ ] Blocks at the foot of a section with a divider can still be clicked and dragged
- [ ] The Kaker page: a wave at the foot of the first section; the Kontakt page: a faint dot pattern
- [ ] A section preset's thumbnail card with a pattern layer in it draws without the pattern and without an error

### Testrunde-batch (0.7.13.9): gallery views mosaic and polaroid

- [ ] Gallery block, Visning Mosaikk with nine or so pictures: a wall of tiles in mixed sizes with no hole in it, for 2, 3, 4 and 6 columns alike
- [ ] Mosaikk, Radhøyde from 80 to 400: the rows follow, and the block grows with the wall
- [ ] Mosaikk, Stokk om: another wall from the same pictures; reload admin and the wall is the one that was left
- [ ] Mosaikk on a phone: two columns, still without a hole
- [ ] Visning Polaroid: every picture in a white card with a wider foot, each leaning its own way; Helning 0 stands them straight and hides Stokk om
- [ ] Polaroid, Stokk om: new leans; Rammefarge with a theme colour and an own one, and the clear button back to white
- [ ] Polaroid, Bildetekst på kortet: the image's description stands in the foot, and a picture without one keeps the bare foot
- [ ] Polaroid in Clean view and on the published page: a card straightens and lifts under the mouse, a click opens the lightbox, and a picture with a link follows the link
- [ ] Both views: a click on a tile with the chrome on opens the image editor; Avrunding and Mellomrom apply
- [ ] An image gallery background layer with Stil Mosaikk on the same page as a gallery block in Mosaikk: each keeps its own row height and gap