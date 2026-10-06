# Testrunder (sjekkliste for manuell testing)

Nytt som er levert og venter på manuell testing i produksjon/lokalt. **Punkter strykes kun av den som tester**; assistenten legger til nye punkter når noe leveres, men fjerner aldri noe her. Nye leveranser får en egen «Testrunde-batch»-seksjon øverst (nyeste først); punkter uten batch ligger i restlisten nederst. [BACKLOG.md](BACKLOG.md) eier oppgavene; denne listen eier testingen av det som alt er levert. Om noe er fjernet betyr det at det er sjekket og løst, oppført som en kjent bug, eller erstattet av en senere endring (gjennomgått og samlet 6. oktober 2026: kalenderbatchene er slått sammen til én med ett punkt per design).

### Test batch (0.7.21.2-0.7.21.4): the height that follows the content, drags and the block's own width (merged 6 October 2026)

**The height that follows the content**

- [ ] A page saved before 0.7.21.2, in the editor and on the published page: every calendar, collection, product card, basket, checkout, countdown, FAQ, form, quote, share, statistic, table, timeline and audio block stands at its content's height with no air under it; the blocks below stay where they were, and nothing is cut off
- [ ] A change of variant or settings (an FAQ between cards and list; a calendar from a list design to a month design and back, its count, view switcher, design settings or «Size»): the outline follows at once, growing and shrinking; the blocks below move down with a taller block and stay with a shorter one; one undo puts the setting, the height and the blocks back together
- [ ] Every calendar design picked one after the other, with sample data and with a real feed: the outline ends where the calendar ends, neither clipping it nor leaving air under it
- [ ] A section with a height of its own and a calendar near its bottom changed to a taller design: the section grows to hold the calendar and the blocks below it
- [ ] A long line typed into an FAQ question or a quote in the preview: the block grows with the words, the caret stays where you type, and the blocks below move down; an FAQ answer opened, typed in and closed again goes back to its closed height with no air under it
- [ ] An FAQ on the published page: an opened answer pushes the blocks below down and closing it brings them back; on a phone the FAQ grows with the open answer
- [ ] A collection or product cards in the editor, then in Clean view: in Clean view the outline matches the cards; in the editor the image buttons and the empty-field placeholders are drawn on top and may overlap the block below
- [ ] The audio block with a sound file: the outline is as tall as the player; the basket on a shop page: an open drawer leaves the blocks below where they are
- [ ] Three statistics in a row as cards: they line up when their figures and labels take the same height (a label on two lines makes its card taller until «stretch» in 0.7.21.3)
- [ ] A calendar with a real feed: on the published page it holds the frame's height while it loads and stands at the events' height after; in the editor its outline follows the events once the fit has come back

**Drags**

- [ ] The lower corner of one of these blocks: a sideways arrow and the tooltip «Drag to change the width; the height follows the content» (a text or an image block keeps the diagonal arrow); a pull straight down or up keeps the height, shows a magenta «The height follows the content» mark while held and changes nothing on release, with nothing new for Ctrl+Z; a pull sideways narrows or widens the block with its height following the content
- [ ] A text or image block resized by the corner: the box follows the pointer in width and height and lands where released
- [ ] The front page's top section: its height is the same with the editing chrome on and in Clean view
- [ ] The collection in the top section dragged a little down or sideways: the section's bottom edge stays where it was during the drag and after the release; one Ctrl+Z puts everything back
- [ ] The same collection dragged until its lower part passes the section's bottom edge: the section keeps its height and the collection lies over the next section, in the editor, in Clean view and on the published page; afterwards the section's bottom handle can make the section shorter again
- [ ] A block with a text right under it that is drawn pushed down (an FAQ or a collection whose content outgrew its frame), dragged sideways: the text stays where it was shown, and one Ctrl+Z restores both; the same with a set (Shift-click two blocks) dragged by one of its blocks and by the grip on the set's toolbar
- [ ] A block like that dragged into another section: one Ctrl+Z puts it back, with both sections as they were
- [ ] The arrow keys, «Align bottom» and «Distribute» on blocks like these: they line up by the boxes you see, and one Ctrl+Z restores
- [ ] An FAQ near the bottom of a section dragged narrower by its corner: the section grows while you drag, and stays so after the release

**The block's own width**

- [ ] A narrow calendar on a wide page and the same calendar in the mobile view: both show the narrow layout; the same block at the same width looks the same in a wide and in a narrow window (the calendar designs that change by width are under each design in the calendar batch)
- [ ] A gallery with four columns (grid, mosaic and polaroid): two columns in a narrow block, four in a wide one, the mosaic a whole wall
- [ ] Product cards with a fixed column count: two columns in a narrow block, one below 320 px
- [ ] An alternating timeline below 480 px: the line along the left edge, the cards under each other
- [ ] A table and a statistic in narrow blocks: tighter cells and a smaller figure, nothing outside the box
- [ ] The pages on a real phone: calendars, galleries and products look as before
- [ ] No errors in the console while blocks are dragged back and forth

### Test batch (0.7.20.1-0.7.20.4): the element menu (merged 6 October 2026)

**The frame**

- [ ] The gear on a block opens the element menu wide: Content, Style and Placement as columns, an area without settings (Style on the map block) taking no column; the button in the menu's head switches to three tabs and back
- [ ] Admin settings, «Element menu»: Narrow makes the menu open with tabs after a reload, Wide with columns; the Properties panel in the rail is always tabs
- [ ] With the Properties panel open, the floating menu never lies over the admin's panels; with the editor window narrowed until the wide menu does not fit beside them, the menu opens narrow
- [ ] Placement on any block: «On narrower screens», «Hide on mobile» and «Pin while scrolling» stand open at the top, «Motion» and «Placement, layer and rotation» are groups showing their value
- [ ] The quick row: «Narrow screen» and «On a phone» on every block, and on a calendar «Design», «Max count» (list, cards and agenda) and «Subscribe button»; each changes the preview at once; «Narrow screen» set to Shrink is still marked in the quick row and under «On narrower screens» after the menu is closed and opened again, and Wrap switches back
- [ ] Calendar, the «Design» row in Style or the quick row: the picker fills the menu with six thumbnails across under the view headings, a click changes the design and the picker stays open, «Back to the menu» returns; the picker open and the menu closed with the cross: the menu opens again on its areas; Week strip chosen, then Plain: the view is List
- [ ] Calendar, the colours in Style: swatches in rows with the name under each, three across in the wide menu and five in the narrow one; the clear button sits on the swatch's corner

**Groups**

- [ ] The calendar's menu with everything closed shows only group rows in Content and Style, each with its value: the number of sources, the view, «Off» or «N on» for the buttons, «Standard» or the owner's words for the empty state, «Standard» or «N of M changed» for the colours
- [ ] A group left open stays open when another block is selected, in the wide menu, the narrow menu and the Properties panel
- [ ] A change inside a group (a colour, a button switched on, a max count other than 6, a size other than 100 %) puts a yellow mark on the group's row and «Reset this group» under its controls; the reset puts the group's settings back, the mark goes, and one undo brings them back
- [ ] «Announcement» appears as a group only on the designs that have an announcement; its switch reads «Show the calendar's announcement», and turning it on or off leaves the strip above the menu as it was (and the strip's own switch leaves the calendar's note)
- [ ] Wide menu: every label with a field or a dropdown stands over its control and none wraps beside it; narrow menu and Properties panel: label and control on one row
- [ ] «Reset the texts» appears under the Content groups only after a text in the block has been rewritten

**The search**

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

### Test batch (0.7.18.4-0.7.19.17p and 0.7.0.39): the calendar (merged 6 October 2026)

One item per design; what every design shares stands once, under «Every design».

**Adding a calendar**

- [ ] Blocks panel, Calendar: the views, and «Designs» unfolded with 34 thumbnails grouped by view, none running out of the panel; a press on one and a place in a section gives that design with an outline that fits; the block search («Week strip» gives «Calendar: Week strip») and «+ New block» in a section (a long list that scrolls) add the same
- [ ] The section templates «What is on» and «What is on: cards», «month», «week» and «next»: each gives a heading and a calendar in that view, inside its section
- [ ] A new calendar from the palette, the block menu or a section template: no category filter, no subscribe buttons and no «Sign up» buttons until they are switched on, and no «changed» dot on its view group (an Agenda or a «Coming up» calendar too); a «Coming up» design chosen on a new calendar shows three events in the card and three under «Later», while a calendar whose counts were set keeps them
- [ ] The two calendars on Hjem render as before; the parser (ics.js) is fetched only on a page with a calendar, after the page has rendered (the Network panel)
- [ ] The help chip on a calendar: its last line says the texts are rewritten by clicking them and that Style sets colours, the stripe and the font per field; Clean view hides the chip
- [ ] A calendar block saved before these stages renders as it did in every design, and a block saved with a design renders the plain list on an older engine

**Sources and what is read from a feed**

- [ ] A source with a name: its events wear the name as their chip and the filter shows it, and a title like «Møte: Årsmøte» stays whole; a source with a colour: chips, date badges and the filter button take it, and cleared they follow the accent; two sources with the same event show it once, keeping a sign-up link or a place found in only one copy
- [ ] «Calendars on the site»: lists the sources of the other calendar blocks, adds one with a click, and says so when there are none
- [ ] A Nextcloud calendar's share link pasted under Sources as it is: the events show, and «Subscribe» gives an address a calendar app can follow
- [ ] With a Proton, Outlook or Nextcloud calendar: adding its host to `ICS_HOSTS` as the calendar guide and the setup guide describe makes the calendar show
- [ ] A real feed with «the last Thursday of every month», «the second Sunday of May» and an event with single extra dates: the occurrences land on the right dates for the coming months
- [ ] A feed whose events carry `CATEGORIES` and whose calendar has no name: the chips and the category filter show the feed's categories, and a title with a colon is left whole
- [ ] A feed that answers with junk, on the published page: the quiet empty state, never standing loading bars
- [ ] Empty state: a block without sources on the published page, and a feed with nothing coming up, show the icon and the line; own words and another icon in Content change it, and None removes the icon

**Times and dates**

- [ ] A real feed: an event from 18:00 to 21:00 reads «18:00-21:00» in every design that shows a time, one with no end reads its start; an all-day event over three days reads «until» its last day; a timed event that ends on a later day reads its start, the last day and the end time
- [ ] An all-day event over two days (a Saturday and a Sunday): it shows on both days in Week strip, the month on a phone and Day plan; «Add to calendar» gives the right last day in Google Calendar and in the file
- [ ] An event cancelled in the calendar app: a struck, dimmed title, «Cancelled» where the time stands and no sign-up, in every design; «Show cancelled events» off removes them from every view
- [ ] «Clock»: 24 h is marked whatever the site language; 12 h writes «6:00 pm-9:00 pm»; «The week starts» is offered on month, week, year and agenda designs, Bento and with the view switcher on: Sunday puts Sunday first and moves the grids, Auto follows the site language
- [ ] Site panel, «Time zone»: Europe/Oslo is accepted, «Mars/Olympus» is refused with «Unknown time zone» and leaves the stored value, an empty field removes it; with the zone set and the computer on another zone, the times stay on the site's clock, an all-day event stays on its own day, a line under the calendar names the zone, and «today» and the countdowns follow the real moment; with the field empty and a feed kept in another zone, the line says the times are in your own zone
- [ ] The site in English: dates read «5 Oct», never «5. Oct»
- [ ] The page source of a published calendar with a real feed: dates and times are `<time datetime>`, the day for a date and the true moment for a clock time, also with a time zone set; «Cancelled» is not a time

**Finding events and the view switcher**

- [ ] Content: «Show place filter», «Show search field» and «Show earlier events» stand under the category filter and are off on a new calendar; «Show earlier events» is hidden for a month, week, day or year design; the group's reset switches all three off
- [ ] «Show search field» on, published: a word leaves only the events with it in the title, place or description, whatever the case; two words must both be found; the field keeps its text and the caret while the list changes; no match shows «No events match»; emptying the field brings every event back
- [ ] «Show place filter» on, a feed with two or more venues: a button per venue («All places» first), named up to the place's first comma; a press narrows the list and keeps the focus; with one venue no row is drawn
- [ ] «Show earlier events» on, a feed with events in the last 90 days: «Earlier (n)» under the calendar with the right count, the latest first, a press on a row opens the card; nothing that is over stands among the coming events; the sample data shows one event under «Earlier»
- [ ] Search, place and category together: each narrows what the others leave, and the «Earlier» fold follows them; the field and the button rows fit the width on a phone in a list, a card and a «Coming up» design
- [ ] «Show view switcher» on a list, cards, agenda or next calendar: «Upcoming», «Week» («Uke» in Norwegian) and «Month» at the top, «Upcoming» pressed; Week and Month show the week strip and the month with their arrows, including this week's and this month's earlier events; the published page starts on «Upcoming» every time
- [ ] The switcher is not offered for a month, week, day or year design, and a block that had it on and is given such a design shows no buttons; its words are rewritten by clicking them (a click on the word edits, on the button's edge it switches); in the switcher's week, about 650 px wide, the time and the title stay inside each event's box

**The event card**

- [ ] Published page and Clean view, every design: a click on an event, or Tab to it and Enter, opens its card over its calendar with the calendar shaded; the page does not scroll when the card opens or closes, also with the page scrolled far down; the page scrolls as usual while the card is open, the scrollbar stays, and the card scrolls away with its calendar, under the navigation bar
- [ ] Escape, the close button and a press outside close the card with the focus back on the event; a press on another event closes the open card and opens the new one; a card open while the calendar is drawn again (a setting changed, or the window crossing the phone width) closes
- [ ] The card is never wider or taller than its calendar (a calendar lower than 300 px lets it reach below itself); more content scrolls inside the card; with the editing handles on, a click on an event selects the block and opens nothing; switching to Clean view closes the element menu
- [ ] The card with a real feed: the whole description with clickable links (a formatted description from Outlook with paragraphs, lists, bold and links, and no pictures, colours or forms from the feed), the picture, and no sign-up or «Add to calendar» on a cancelled event
- [ ] «Join» for a meeting link from Zoom, Teams, Meet, Whereby, Jitsi, Webex, Proton Meet, kMeet or Element Call, also for a Meet or Teams meeting added in the calendar app with no link in the description; Site panel, «Own meeting addresses»: a host or a pasted address is stored as the host alone, several divided by commas, and an event with a link to it shows «Join»
- [ ] «Show «Sign up» buttons» on: «Sign up: https://…» or «Tickets: https://…» in a description gives the button to that address, an event service's own address gives it to that page, a plain link gives no button and stays in the text, and a picture or meeting link never becomes the button; «Sign up» and «Join» show their host as their tooltip
- [ ] «Add to calendar» unfolds without moving the card off its calendar: «Add to Google» opens Google Calendar filled in, «Download as a file (.ics)» opens in Apple Calendar and Outlook with the right time, and «Subscribe» with the iCal address, selected at a click
- [ ] The card's words, date line and button have contrast against the ground in every design, also on Glass, Dark glass, the dark designs and the plain month
- [ ] In the calendar itself, in Clean view and on the published page: a place opens the map in a new tab (an address when the place is one), an address in a description is a link, and an excerpt of a long description ends at a word with «…» and keeps an address near the cut whole; in Clean view «Address of the whole programme» set to another site opens in a new tab and the preview stays

**Places and the map service**

- [ ] Site panel, «Map service»: OpenStreetMap, DuckDuckGo Maps, Brave Maps, HERE WeGo, Google Maps, Apple Maps, Norgeskart and FINN kart in that order, each with a note that reads in the list's width, in Norwegian, English and Turkish admin; OpenStreetMap on a site that has never set it
- [ ] With each service chosen and published, a place with a venue's name before its address («Mormors Stue, Nedre Enkeltskillingsveita 2, 7011 Trondheim, Norge») opens the service at the right spot; a name alone and an address alone open it with that text, and a web address still opens that address
- [ ] An event whose calendar app stores a point for the place: OpenStreetMap and Apple Maps open that point, the others the search; an event with a point and no place in words gets «Show on the map» in its card

**Search engines**

- [ ] A published page with a real feed: the live `<head>` holds a `script type="application/ld+json"` with the events beside the site's `Organization`, and the Schema Markup Validator reads them without errors, each with a name, a start and a place; `endDate`, all-day dates, `EventCancelled`, `VirtualLocation` and `MixedEventAttendanceMode` where they apply
- [ ] «Tell search engines about the events» off: the events script is gone and `Organization` stands; another page of the site removes the script of the page left; the preview and sample data write none
- [ ] Google's Rich Results Test on the published page finds the events; warnings for price, ticket link and performer are expected

**Loading, keyboard, screen reader and print**

- [ ] Published page with a real feed: quiet bars while the calendar is fetched (still with reduced motion), at the frame's height on a desktop with nothing below moving when the events arrive; on a phone the second load in a session has the same height before and after; a screen reader announces «Loading the calendar»; the preview with a feed shows the bars, never «No upcoming events» for a moment
- [ ] A day grid on the keyboard (the plain month, Overview on cream, Month with side panel, Week strip, Day plan's day picker, Heat map, the months on a phone): one tab stop, the arrow keys between days, Home and End to the ends of the week, PageUp and PageDown to the month or week before and after, Tab through the day's events and out, Enter on an event opens its card; with the editing handles on the arrow keys do nothing there
- [ ] A screen reader: a day reads its date and number of events («Sunday 4 October, 1 event»), an arrow press reads the new month, week or day, the arrows are named for the previous and next month in the site's language, and a press on «Week», «Month» or a category keeps the focus on the pressed button and reads it as pressed
- [ ] Nothing in any design runs out of the block at 360 px with a real feed with long titles

**Every design**

- [ ] Every design in turn, sample data in the preview and a real feed on the published page: it draws, «View» stands in Content only on Plain, and the month, week, day and year designs also show the earlier events of their span; the colour slots follow the design's own colours when empty and a dark theme stays readable; «Edge stripe on the boxes» adds the stripe to its rows, cards, tiles, day columns or plan blocks in the event's calendar colour, «Stripe colour» overrides it and off removes it
- [ ] Style, «Text fields»: Title with font, size, Bold or Normal, italic, underline and colour changes every title and nothing else; the same for Date, Time, Place, Description, Category and Large numerals
- [ ] The words of a design («Next event», «Later», «All», «Sign up», «Subscribe», «Programme», «Today», the units): a click in the preview opens the text toolbar, bold or a colour applies, and the words survive a reload and a publish; two texts rewritten in one calendar both stand after a reload; «Reset the texts» puts the defaults back
- [ ] «Show «Sign up» buttons» off removes the buttons in every design
- [ ] Style, «Size»: 60 % draws the whole calendar smaller, text included, 150 % larger, and the outline follows; a drag afterwards leaves the percentage where it was
- [ ] Style, «Settings for the design»: a group only on the designs that have settings, holding only that design's; each change shows at once and survives a reload and a publish

**The designs, one item each**

- [ ] Plain, List: more events than the max count give «Show all N (M more)» under the rows, which opens the rest in the same design without a reload; «Fold the rest under «Show all»» (on the list designs only) off removes the fold; the same fold in Timeline, Table, Programme booklet, Numbered programme, List on navy and Glass
- [ ] Plain, Cards and Agenda: the cards fill the width; Agenda's rows stand under their month with the day number and weekday, and the max count counts like the list
- [ ] Plain, Month: chips per day and the keyboard grid; below 540 px wide (a narrow block, also while dragged, or a phone) every day is a button with up to four dots in the calendars' colours, today picked first, a press lists the day's events under the grid («Nothing on this day» when empty) and the arrows change the month
- [ ] Plain, Next: «Events in the card» 1, 2 and 3 hold that many in full under «Next event» (one) or «Coming up» (more); «Under «Later»» 0 to 10 lists one-line rows below
- [ ] Timeline: the date on one line to the left, a rail with a dot per event (the first in the accent, the rest in Dots), the sign-up as a filled button, the chip under the title; a click on an event's words opens its card, and a cancelled event's title is struck
- [ ] Table: the header row in its colours, every other row tinted, «all day» for an all-day event, the sign-up at the right end; «Show the Time column», «Show the Place column» and «Striped rows» off remove each; a narrow block scrolls the table sideways; folded rows may stand slightly off the columns above
- [ ] Programme booklet: the paper with a shadow, «Programme» and the month span, a column per month that wraps to one in a narrow block, the day in the accent, the description's first line; «Show the description» off removes it
- [ ] Numbered programme: 01, 02, 03 in Numerals, «3 events» at the top right, the sign-up or the chip in the right column, a rule between rows; the fold counts on (03, 04 …) of the whole list; «Count 01, 02, 03» off counts 1, 2, 3, also through the fold
- [ ] List on navy: navy rows, the day in gold and the month in capitals, the category outlined, the place underlined in gold, the title in the heading font, the filter chips and subscribe buttons in the row colour; a weekly event wears «Repeats» (rewritable, coloured by «Repeats mark») and a single one does not; the view switcher, search field and the switcher's month read light on dark
- [ ] Glass: three blobs behind frosted cards (Colour blob 1 to 3, The glass, Glass edge); transparent by default, so a section picture or gradient shows through, and a «Ground» colour makes it solid; the filter chips, subscribe button and view switcher in glass
- [ ] Poster wall: the first poster twice as large in Poster 1, the next two in Poster 2 and 3, the fourth plain, then again; category and place in capitals at the top, the day huge, title and time at the foot; «Columns» 2, 3 and 4 fix the count and Auto fills; «Address of the whole programme» adds a last dashed tile; two columns on a phone
- [ ] Tickets: the stub in the Stub colour (the calendar's colour when it has one) with day, month and time, a dashed tear, place · category under the title, the sign-up at the right end; without a sign-up «Open to everyone» (rewritable; «Show «Open to everyone»» off removes it); the programme address as a foot link
- [ ] Day carousel: the cards scroll sideways and snap, the two arrows move one card, the first card in The first card colours with the sign-up on it; a dot per card follows the scroll (arrows, touch, wheel) and a click on a dot scrolls to its card; no dots with one card
- [ ] Picture cards: a picture attached to the event in the calendar app, or a picture link in its description, shows in the band when its host stands in PHOTO_HOSTS, otherwise the Without a picture colour (locally plain); the date badge and the chip on the band; «Columns» 2 to 4 or Auto
- [ ] Grid on cream: cream cards with a navy head, the day in gold, the category as a gold pill, the place underlined in gold; Header row, Card, Text and Gold recolour them; «Repeats» on a weekly event
- [ ] Bento: the hero tile with the «Next» pill and «In N days» (the next event's picture fills it with the words readable), two small tiles, the current month with today ringed and the event days in Soft accent, «This month», the subscribe tile with a source, wide rows for the rest and no subscribe row under the block; two columns in a narrow block, also in a wide window
- [ ] Billboard: the pulse beside «Coming up», three tiles counting days, hours and minutes that move on after a minute, the sign-up as a full-width bar, «Then:» with the later events, the subscribe link and the programme address at the foot; a cancelled next event: only its title is struck
- [ ] Stacked cards: with «Events in the card» 3, three cards with the front one readable, «Browse the cards» turns the next to the front, «3 next» at the top right, the later rows under
- [ ] Noticeboard: the next event on a pinned yellow note; «Show announcement» adds a blue note with rewritable label, heading and text, its link gives «Read more»; «Later» on the strip
- [ ] Split card: the weekday, the huge day and the month on the panel in the calendar's colour, the chip, title, first line and sign-up beside it, «Later» under; «Show the description» off removes it; the panel stacks above the words in a narrow block and on a phone; a cancelled next event: only its title is struck
- [ ] Band: the tag at the left, the next events in one line with dots between; with more than fit the band rolls, pauses under the pointer and stands still with reduced motion; «Roll when the band is too narrow» off: it stands still and scrolls sideways by hand
- [ ] One line: the first rows marked «Coming up» with the accent dot and stripe, the rest «Later», «In N days» at the right and the sign-up as a button
- [ ] Countdown ring: the ring fills over the last two weeks, the middle counts days and on the last day hours, two later rows with dots under a rule; a cancelled next event: only its title is struck
- [ ] Dark glass: a blurred, half transparent dark ground the section shows through («Ground» makes it solid), the countdown in monospace («01d 15h 22m» on an English site), «Until the start» with the percentage and the bar, the sign-up and subscribe buttons side by side, «Then» in a glass box, Colour blob 1 and 2; a cancelled next event: only its title is struck
- [ ] Coming up bento: the hero tile in the calendar's colour with «Coming up» and «In N days», a date tile per later event (the third dark), the link tile with the count, the subscribe link and the programme address; no subscribe row under the block; «Events in the card» 3 with one later event gives three day tiles beside the first
- [ ] Week strip: the current week with today framed, «Week N» and the span, the arrows a week at a time, a pill per event; in a block about 650 px wide the time and title stay inside each box; below 540 px (a narrow block, also while dragged, or a phone) the days stand under each other with today marked, and dragged wider the seven columns come back
- [ ] Week plan: the hours from the earliest event (at most 08) to past the latest (at least 18), today tinted, an all-day row, timed events as blocks with their length; «First hour» 6 and «Last hour» 22 give 06 to 21, empty gives 08 to 17, an event at 23:00 still shows with the last hour 20; «Tint the weekend»; an event from 22:00 past midnight is drawn with the hours to 23; the 12-hour clock writes «1 pm» on the axis and 24 h keeps 08, 09; the arrows around the end of October keep whole weeks; below 540 px the days stand under each other with their events in clock order, all-day first, «Today» on one line
- [ ] Calendar layers: a row per named calendar with a switch in the head that hides and shows it, a bar per event across its days, today tinted, no chip row and «Show category filter» hidden; the arrows around the end of October keep whole weeks; on a phone each calendar with its events under its name and the day written on each («Sun 4», «Mon 5 to Wed 7»), the week label wrapping
- [ ] Month with side panel: at most two chips per day and «+N», today ringed, a click or Enter on a day shows its events in the panel, a grey day of the next month moves the month, the legend lists the calendars; «Side of the panel» Right, Left and Under; the panel goes under the month when the block is narrower than 600 px (while it is dragged) and on a phone, whatever is chosen
- [ ] Overview on cream: the month on cream with a gold rule, gold arrows, today in a gold circle, pills with a gold line and the time in dark gold; below 540 px the dots and the day list of the plain month
- [ ] Day plan: today with «Today» and «N today», the week strip picks another day (Enter picks it and keeps the focus), the now line and the past hours shaded on today only; «First hour» and «Last hour»; an event past midnight shows in the row above the hours on the next day; the 12-hour axis reads «1 pm»
- [ ] Year wheel: twelve arcs, past months in Past, this month in the accent, a dot per event, the year and the count in the middle, a click or Enter on an arc lists the month to the right; «The month at the top of the wheel» August puts August at the top with the dots following, «The current month» moves by itself next month; a screen reader reads the months as buttons with their name and pressed state; the layout changes by the block's width, also in a wide window
- [ ] Heat map: twelve small months, days shaded None, Few, More and Many, today ringed, a day pointed at or focused reads its events under the grid; one tab stop for the whole year
- [ ] Coming up on cream: the navy head with the gold dot, the next event with the navy date badge and «In N days», «Later» on a gold rail, an arrow on an event with an address; the announcement as Section (at the foot) or Alert band (under the head, with its colours); «Panel text» colours the words under «Later» without the card's titles, and «Text» the other way round
- [ ] Coming up on navy: with «Events in the card» 2 or 3, the first on a cream card with the chip outlined, the place underlined and «Read more» with an address, the others as navy cards with a gold edge, «2 next» at the top right, «Later» as lines
- [ ] Regular event: the next event's title large in red, the first paragraph of its description, When, Where and For whom («Open to everyone» rewritable), «All dates» folding out every coming date with the same title (Max count caps them, no fold with one date); the announcement aside to the right, under the card in a narrow block and on a phone
- [ ] Agenda, dark: the month, this week's days with today in the accent and dots under days with events, a card per event with the time to the left and a stripe in the calendar's colour, «Today» before today's date; with two or more named calendars a chip beside the month opens «All» and the calendars, a choice filters and names it, Escape or a press outside closes, also in Clean view and published; a calendar with nothing coming leaves the menu standing; the shared parts read light on dark
- [ ] The ApeironLF designs with nothing coming up: the pill «Dates · Dates to come» (rewritable), the dashed box with the own line and icon from Content, the subscribe button in gold, readable on a light and a dark page

**Languages and guides**

- [ ] Admin in Nynorsk, a calendar's menu: the labels are in Nynorsk and none runs out of its control
- [ ] The site in English, Turkish and Swedish (the language pack on): the calendar's buttons, dates, «Today», «Tomorrow», «In N days» and plural forms read in that language
- [ ] The site in Northern Sami: the calendar's visitor texts read by someone who knows the language, with the wrong ones noted
- [ ] The calendar guide (English and Norwegian) read through: the steps for the iCal address match Google Calendar, and for each other service tried the «Tested» column and the steps are corrected; its «Designs» section and the user guide's calendar paragraph read well; the links from the user guide and the README tables open it

### Test batch (0.7.0.36-0.7.19.17p): what the push review fixed outside the calendar

- [ ] An own icon from an animated GIF: it becomes a small still icon; a GIF above 4 MB says it is too large
- [ ] A section with the inverse theme and a wave divider at the bottom with the default colour: the divider shows in the page's background colour

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

### Testrunde-batch (0.7.0.16-35p): the picture routes and the review fixes

- [ ] Deployed site, a Nextcloud share or a picture list holding an SVG file: the gallery skips it, and opening its `/api/photo?...` address answers «did not answer with a picture»
- [ ] Deployed site, a picture from a folder opened directly in a tab: it shows as a picture, with `content-security-policy` and `cross-origin-resource-policy` on the answer (the network tab)
- [ ] Deployed site, the same folder picture loaded twice a minute apart: the second answer comes from the edge cache (`cf-cache-status: HIT`)
- [ ] A folder address on a host missing from PHOTO_HOSTS: the readout names the host, not «{host}»
- [ ] A gallery layer made before 0.7.13.8: the panel shows Fyller bakgrunnen with fit, interval and fade, as the preview draws it
- [ ] Bilder fra Delt mappe with a Google Photos album: Rekkefølge offers Som i albumet and Tilfeldig only
- [ ] Gallery block, view Rullende bånd, in a narrow block with two pictures: the band stays inside the block, every copy shows its pictures, a click on any tile opens the lightbox, and Tab reaches each picture once
- [ ] Reload admin with Historikk or Oppdatering as the last open panel: the panel shows its list, not a loading line
- [ ] Nav panel, Mobil fold: no «content width» choice; «over the top section» only for the bar; a mobile border with its own width and colour draws with those on a phone; verktøy Venstre on mobile alone puts the burger leftmost there
- [ ] Hover style Pille with a submenu: the highlight in the submenu stays inside the card
- [ ] A text block whose words are taller than its frame, resized by the corner: the box follows the pointer and does not snap back on release
- [ ] Block menu opened low on a short screen: the search field stays on screen and the menu scrolls
- [ ] Menu items: drag a row and release beside the list (inside admin): it lands where the clone stood; Escape cancels
- [ ] Gjennomsiktig øverst with Krymp, reduced motion on: nothing animates
- [ ] Ribbon motion Sving with two short words: the words sit centred and sway both ways

### Testrunde-batch (0.7.0.35): the pre-push check of the 0.7.13 stages

- [ ] Side column with Undermenyer Åpne fra start and no arrow: a click in the page content leaves every submenu open, and Tab skips the item headings
- [ ] Full-screen menu with Tema and Handlekurv in the menu: the cart drawer opened from inside the menu scrolls on a phone, and after closing the menu the tools stand in the same order as before
- [ ] Full-screen menu, Uskarp bakgrunn on while the bar's blur is off: the menu is blurred
- [ ] Gjennomsiktig øverst together with Krymp ved rulling: the padding animates on scroll, and on a phone the bar draws its surface as soon as the menu opens at the top
- [ ] Menu items: drag the only child out of a parent that has no page of its own: the parent gets the front page and the file publishes; press Escape during a drag: nothing moves
- [ ] Announcement that scrolls away (Fest to menu off) with a pinned block: the block pins right under the menu, without a gap
- [ ] Side column with the announcement over the whole page: the section toolbar and a pinned block sit below the strip
- [ ] Tools at the start: the burger stands leftmost on a phone; with every tool off, the logo sits flush at the edge on desktop
- [ ] Launcher: a heading with «<» or «&» in it reads as typed; the settings appear only when the launcher is on, and changing a design with it off does not switch it on
- [ ] Launcher, Images tab, Upload: pick a file through the system dialog and the mark shows on the tile and the button
- [ ] Launcher in a browser without anchor positioning: a click on the panel's heading or padding leaves it open
- [ ] A shortcut with an empty target is marked red in the panel and dimmed in the menu
- [ ] Ribbon with size Ekstra stor in a low frame, and with thick stripes above and below: the block grows so the words show whole
- [ ] Ribbon with two short words in a wide band: the words repeat across the whole band with no empty stretch, in Clean view and on the published page; the gallery's ribbon view the same with two pictures
- [ ] Ribbon motion Ticker: every jump lands at the start of a word, Retning Høyre too
- [ ] Ribbon with Hovedstripe Merker and an empty word list: the marks roll
- [ ] Ribbon motion Sving: the words appear once
- [ ] Gallery ribbon: Tab reaches each picture once
- [ ] Nynorsk site: «Snarvegar», «Vis fleire», «Vis færre» in the mobile menu

### Testrunde-batch (0.7.13.8): background motion, the image gallery layer and shared folders

- [ ] An existing section with an image background: the page still draws it after the update, and the console holds no «missing-migration»
- [ ] Image layer, Bevegelse Sakte innzooming and Sakte forskyvning: the picture moves, together with Parallakse when that is on, and stands still with reduced motion on
- [ ] Set a motion on an image layer, reload admin: the choice is still there and still runs
- [ ] Add Bildegalleri with nothing in it: example pictures are drawn in every Stil, hidden in Ren visning and absent on the published page
- [ ] Stil Svevende bilder: the frames are small (about 110-170 px), scattered over the whole section, and differently scattered on the next visit; Plassering Fast with Stokk om keeps one scatter
- [ ] Stil Fyller bakgrunnen: the cross-fade as before, with Sekunder per bilde and Overgang
- [ ] Stil Rullende bånd: two rows rolling against each other, in admin too; Rader 1, Retning and Tid per runde
- [ ] Stil Mosaikk: a wall of four columns with wide and tall tiles, two columns on a phone
- [ ] Form: circle, star, heart, arch and the rest cut the picture, and the frame follows the shape; Avrunding shows only for rectangle and square
- [ ] Ramme: polaroid, thin and wide and dark and double borders, glow, tape, pin, stamp, film strip, soft edge; Rammefarge with a theme colour and an own one, and the clear button back to the frame's own
- [ ] Tone: black and white, sepia, vintage, duotone in the accent colour and the rest, on the fill style too
- [ ] Bevegelse on floating frames: Diagonal drift and Rett opp travel across without a visible jump, Sakte zoom breathes the whole polaroid, Sprett mellom kantene bounces off all four edges
- [ ] Krysstoning: a frame fades out and comes back in a new place with a new picture, never the one it left with, and never one another frame shows; the whole folder goes round
- [ ] Tid per runde at 0,5 s and at 90 s, and Sekunder per bilde the same
- [ ] Antall bilder 20 with a folder of six: six frames with Vis bare dem som finnes, twenty with Gjenta bildene
- [ ] Bilder bak menylinja off: no frame touches the menu band, in any motion; on: the frames use the whole section
- [ ] Bilder bak kunngjøringen: greyed while the menu switch is off, and switching it on switches the menu on with it; off (the default) keeps every frame below the strip
- [ ] A system with reduced motion on: no frame moves, no picture swaps
- [ ] Bilder fra Delt mappe with a Google Drive folder on the deployed site with DRIVE_API_KEY set: Sjekk mappa reports the count, the pictures appear, a picture added to the folder appears within ten minutes
- [ ] The same without DRIVE_API_KEY: the readout names the variable, the layer keeps its example pictures
- [ ] A Google Photos shared album, long link and short: the pictures appear without any key
- [ ] A Nextcloud share with the host in PHOTO_HOSTS, and one without: pictures, and the readout naming the variable
- [ ] Rekkefølge: Etter navn gives the first by file name, Nyeste først the last changed, Tilfeldig a different set on the next visit and the same set on a re-render
- [ ] Junk in Mappeadresse: the field turns red and Sjekk mappa is disabled; a pasted folder link clears both
- [ ] A folder picture in a small frame is a small download, in a full-width background a large one (the network panel)
- [ ] Presets Hero over bilde and Hero med flytende bilder: they insert, their cards show the layout, and the text reads over the veil in a light and a dark theme
- [ ] The guide «Pictures from a shared folder» from the README, in English and Norwegian: every step can be followed

### Testrunde-batch (0.7.13.7): the ribbon

- [ ] Insert Bånd from Blocks: the words stand still on the canvas and can be typed straight in the band; the list in Properties follows
- [ ] Press «Spill av bevegelsen»: the band rolls for six seconds and stops again
- [ ] Clean view: the band rolls at once, without the block being touched, and stands still again on the way back
- [ ] The published page: the band rolls from the first paint
- [ ] The four motions: Ruller goes on without a visible seam, Vugger drifts out and back, Hopper moves one word at a time with a readable pause, Står stille centres the words with no copy
- [ ] Tid per ord with the ticker: the jump follows the seconds set
- [ ] Hold the pointer over a rolling band: it stops, and it starts again when the pointer leaves. Tab into it: the same
- [ ] Hele sidebredden: the band reaches both window edges, also after the window is resized, and no horizontal scrollbar appears
- [ ] Innholdsbredde: the band lines up with the rest of the content
- [ ] Stripe over and Stripe under, each of them as Ordene, Bare skilletegn and Bare farge, with their own colours
- [ ] Kantstriper against Over og under: on the edges the main stripe keeps the full height and the words stay clear of the rules
- [ ] Tjukkelse: the thin stripes and the text in them follow the value
- [ ] Hovedstripe as Bare farge with stripes above and below: an empty band with two rules, no words
- [ ] Konturskrift: the words are drawn as an outline in the text colour, not invisible, and Halvfet and Store bokstaver work with it
- [ ] Helling, avstand and the four sizes on a band that is rolling
- [ ] A system with reduced motion on: the band stands still with every word readable, in Clean view too
- [ ] Gallery with view Bånd: the images roll, a tile opens the lightbox, and hovering stops the band
- [ ] The gallery band with two rows: the second runs the other way, and the band height applies to both
- [ ] Mobile: the band and the gallery band behave, and Skjul på mobil takes them away
- [ ] The block on a published page in a light and a dark theme

### Testrunde-batch (0.7.13.6): the link launcher

- [ ] Nav panel, Tools: switch Shortcuts on and add a shortcut with a name and an address. The button stands in the menu beside the cart, and the panel opens under it with the tile in it
- [ ] Switch it off again: both the button and the section in the mobile menu are gone, and the shortcuts are still there when it is switched back on
- [ ] A shortcut with a target that is not an address, a path or an anchor: the field is marked red in the panel, and the tile is drawn dimmed in the menu without going anywhere
- [ ] The three designs on the desktop: Grid gives three columns, List one row per shortcut, Image cards two columns
- [ ] Design on mobile set to something else than the desktop: the phone shows that design and the desktop keeps its own
- [ ] Twelve shortcuts on a phone: the first six stand open and the rest are behind «Vis flere», which opens them in place and closes again
- [ ] The heading: switch it off and it is gone in both the panel and the mobile menu; write your own text and it stands there instead of «Snarveier»
- [ ] The mark picker from the tile in an open row and from «Bytt merke»: both open the same menu, choosing an icon keeps it open, and Escape or a click outside closes it
- [ ] Upload an image as a mark: it shows in the tile and in the menu, and the same image can be chosen again from the Images tab on another shortcut
- [ ] Publish with an uploaded mark: the image lands in media/ and the published menu shows it
- [ ] The launcher button's own mark: nine dots by default, a chosen icon at the same size as the cart's, and an own image in its place
- [ ] Tools order: move a tool with the arrows in its header, and the menu's buttons follow the panel
- [ ] The light/dark button: switch it off in Tools and it leaves the menu; a site whose theme has no alt counterpart shows no such card at all
- [ ] The full-screen mobile menu with the launcher on: the shortcuts follow the list into the sheet and back out again on close
- [ ] The side column variant: the launcher button sits in the cluster and the panel opens without running off the screen

### Testrunde-batch (0.7.0.33): the help card

- [ ] Open a «?» card at 100 percent zoom, then at 50 and 25: the card and its text keep the same size on screen, the same as the admin panels
- [ ] At 25 percent zoom: the card still lies inside the preview and is not cut off at the right edge
- [ ] Switch the admin theme in the top bar: the card takes the new surface and text colour, like the rail beside it
- [ ] A chip near the bottom of the screen: the card opens above the chip and stays inside the view
- [ ] Open the preview address directly, outside admin (`?preview=1`): the card looks as it did before

### Testrunde-batch (0.7.0.32): the drawn carets and the block menu's keyboard

- [ ] Open «+ Nytt element»: the Former fold shows a drawn arrow, and it turns over when the fold opens and back when it closes
- [ ] A plugin block with variants: its fold behaves the same way
- [ ] A dropdown on the canvas (the text toolbar) and one in an admin panel: both show a drawn arrow, and the admin one turns over while the menu is open
- [ ] Search «former» in the block menu: all five shapes come up. Search «strek»: «Strek» is the first hit
- [ ] Open the menu and press the down arrow without typing: a row is marked, and up, down, left and right move it through both columns
- [ ] Walk to the Former fold and press Enter: the fold opens, and the next step down lands inside it
- [ ] Type in the field and use the arrows: the marking moves through the hits, and Enter inserts the marked one
- [ ] Type and press Enter without using the arrows: the first hit is inserted, as before
- [ ] Left and right while typing, before any arrow walk has started: the cursor moves in the text, so a typing mistake can be corrected

### Testrunde-batch (0.7.0.31): the block toolbar's buttons

- [ ] Click a button in a section's toolbar: Properties switches to that section, as it does when you click its surface
- [ ] A link in the content whose label is an icon alone: clicking it in the preview selects the block and does not navigate the preview away
- [ ] Press and hold on a button and drag a little before releasing: the block does not follow the pointer

### Testrunde-batch (0.7.0.30): the pill highlight

- [ ] Switch the hover style between «Understrek» and «Pille» on a top bar: the menu items stay exactly where they are, only the highlight changes
- [ ] Hover an item with the pill style at the default spacing: the pill reaches halfway to its neighbours and never touches the neighbouring text
- [ ] Set a large item spacing and hover again: the pill keeps its own size and does not grow with the spacing
- [ ] Set a very small item spacing: two pills meet but never overlap
- [ ] The pill style in the side column and in the mobile menu: unchanged from before

### Testrunde-batch (0.7.0.29): the mobile setup in the panel

- [ ] Nav panel, Mobil fold: size, placement, tools, content width, overlay and border all read «Som PC» on a site that has never set them
- [ ] Set each one in turn and switch to the Phone view: only that one changes, and the desktop view is untouched
- [ ] Set the border to «Nederst» on mobile: the width and colour row appears, and both apply on the phone only
- [ ] Set the border to «Ingen» on a site with a desktop border: the phone has none, the desktop keeps its
- [ ] Set a value and then put it back to «Som PC»: the field disappears from the data, and the phone follows the desktop again
- [ ] A floating or side variant: the fold offers no pill width, rounding, glow or column settings, since the phone is a bar with a burger

### Testrunde-batch (0.7.0.28): the mobile menu's own setup

- [ ] The demo site in the Phone view: the menu uses the small size and draws no border, while the desktop view keeps the large size and its bottom border
- [ ] A site with no mobile overrides at all: the phone looks exactly as it did before this change
- [ ] Cross the breakpoint back and forth in the editor: the menu switches between the two sets with no leftovers
- [ ] A desktop window narrow enough for the items to fold to the burger: the DESKTOP settings still apply there, since that is not the mobile breakpoint

### Testrunde-batch (0.7.0.27): the announcement in the full-screen menu

- [ ] Mobile with the full-screen menu and an announcement, «Kunngjøring i menyen» on: open the menu and the strip is at the top of it, full width, above the cross
- [ ] Cross the strip out from inside the menu: it goes, and it is still gone when the menu closes
- [ ] Close the menu without dismissing: the strip is back above the bar, and the first section starts in the same place as before
- [ ] With the setting off: the strip stays behind the menu, as before
- [ ] The checkbox is hidden when the announcement is off

### Testrunde-batch (0.7.0.26): the scroll shrink

- [ ] A sticky bar with «Krymp ved rulling»: scrolling down tightens the padding, the menu text and the spacing between the items, and the logo when its own switch is on
- [ ] Judge the text: it tightens at half the padding's rate, so «Krymp til 50 %» halves the thickness while the text loses a quarter. Say if it should follow the full factor instead
- [ ] «Krymper etter»: set it to 300 px and check that the menu keeps its full size until you are that far down
- [ ] «Krympetid»: 0 gives an instant change, 1200 a slow one; the system setting for reduced motion switches the animation off regardless
- [ ] A menu at each of the four sizes, unshrunk: it looks exactly as before this change
- [ ] A menu with an explicit text size: it still wins over the size preset, and shrinks from there

### Testrunde-batch (0.7.0.25): the hide travel and the rename

- [ ] A sticky bar with «Skjul ved rulling»: a short scroll down leaves the menu in place, and it goes away once you have scrolled a screenful of a few lines
- [ ] With the menu gone, far down the page: a short scroll up brings it straight back, without having to go up to the top
- [ ] Scroll down and up in small movements around one point: the menu does not flicker
- [ ] The setting in Oppførsel reads «Gjennomsiktig på toppen av siden», and still draws the bar without surface until the page is scrolled
- [ ] The same in English and Turkish, and in a site using the Swedish pack

### Testrunde-batch (0.7.0.24): the floating panels

- [ ] Open the image editor and scroll a little: it stays open and keeps its place beside the image, with the crop grid on the image
- [ ] Keep scrolling until the image leaves the screen: the editor closes
- [ ] Double-click near the bottom of the preview: the menu opens upwards and stays inside the screen; near the top it still opens downwards
- [ ] Open the Shapes fold in a menu that opened upwards: it still fits, and the menu scrolls if it cannot
- [ ] A click outside and Escape still close both the image editor and the block menu

### Testrunde-batch (0.7.0.23): the upright chrome and the guides

- [ ] Rotate a block: the toolbar, the drag grip, the resize corner, the rotate handle and the pin badges all stay upright while the block turns
- [ ] Rotate a block with a help chip (a gallery, a collection): the chip is left of the rotate handle, opens its card on a click, and neither covers the handle nor is covered by it
- [ ] The same at a strong preview zoom out: the chip keeps the same size as the other handles
- [ ] The guide button: the dashed lines are clearly visible at both a zoomed-in and a zoomed-out preview
- [ ] Drag a block near another: the magenta snap lines read clearly against both a light and a dark section

### Testrunde-batch (0.7.0.22): the section height and the rotated block

- [ ] A block dragged past the bottom edge of the last section above the footer: it lies across the boundary and the section keeps its height; a block whose content is taller than its frame, left inside the section: the section still makes room for it and the blocks below still move
- [ ] Rotate a block, then drag it: it follows the pointer from the first movement with no sideways jump, and lands where it is dropped
- [ ] Rotate a block and drop it in another section: it lands at the height it was dropped at, not higher up
- [ ] A block with taller content, moved with the arrow keys and with align: its box keeps its size throughout

### Testrunde-batch (0.7.0.12): the canvas

- [ ] Drag a section's bottom edge 100 px, then move a block in it: the section keeps the new height; the same after the top edge and after «Tilpass høyde»
- [ ] Hover slowly across the boundary between two sections at 60 to 100 % preview zoom: the dashed line and the «+ Ny seksjon» chip appear and stay still, no blinking
- [ ] Click into a text block: the text toolbar sits above the block's own toolbar with a small gap, at 50, 80 and 100 % zoom; near the top of the page both still fit below the menu
- [ ] Pin on scroll with «Slipp taket» at a later section on a page with three or more sections: the block stays pinned through the sections between, rests at the chosen section's bottom edge in front of that section's blocks, and scrolls away with it; at the last section it stays pinned to the end of the page
- [ ] A section with «Løft ved hover» holding a pinned block: hovering the section does not lift it and the block stays pinned

### Testrunde-batch (0.7.0.11): the nav and the announcement

- [ ] Page switch on the published site: the old page stays on screen until the new one is rendered, then a cut; the menu never disappears or moves; a prerendered page (link hovered first) cross-fades; the first section's top clearance is right from the first frame; Firefox navigates at once without errors, and with reduced motion the switch is a plain cut

### Testrunde-batch (0.7.18.6): the plugin folders gone, the docs corrected

- [ ] `npm run validate` validates every `plugins/*/plugin.json` it finds (drop a copy of lang-sv as `plugins/lang-xx/` locally and see it listed), and `plugins/README.md` reads as the contract with the language pack as the example and the core blocks as the pattern
- [ ] The user guide (nb, nn, en-GB), the template READMEs and the docs no longer call calendar, form, map or analytics plugins

### Testrunde-batch (0.7.18.5): analytics as a site setting

- [ ] The gear: «Besøksmåling» with the token field sits under the Screen setting; a pasted token is in the unpublished changes, Publiser writes it to site.json, and on the published page the head has a `script[data-cf-beacon]` loading from static.cloudflareinsights.com with no CSP report; the editor's preview never has it
- [ ] Clearing the field removes `analytics` from site.json and the beacon from the published page after the next publish
- [ ] The Plugins panel lists only lang-sv; a site whose own plugins.json still lists «analytics» logs one warning and measures nothing until the token is moved into the gear

### Testrunde-batch (0.7.18.3): the form block in the core

- [ ] Blocks panel: «Skjema» sits among the core blocks (after Kart), the search finds it, and «+ Ny blokk» in the preview lists it; a new form block comes with Navn, E-post and Melding in the admin language
- [ ] The element menu on a form block: send mode, recipient and subject or endpoint, the field list with types, required and options, button text and confirmation; each change shows in the preview at once
- [ ] In the preview a filled form validates without sending (the preview message); on the published page mailto opens the email client with the fields in the body, and endpoint mode posts JSON (and explains the connect-src line when blocked)
- [ ] The help chip sits at the top right of the block; Ren visning hides it
- [ ] «+ Ny seksjon»: «Kontaktskjema» is in Kort og lister with the core presets

### Testrunde-batch (0.7.18.2): the map block in the core

- [ ] Blocks panel: «Kart» sits among the core blocks (after Ikon), the search finds it, and «+ Ny blokk» in the preview lists it; no «Plugins» group appears for it; the Hjem page's existing map renders exactly as before the move
- [ ] The element menu: Sted with «Søk» (an address on the published site, coordinates or an OSM link locally), Zoom 1-19 and Høyde 120-900 update the map at once; a block without a place shows the placeholder in the editor and nothing for visitors
- [ ] The help chip on the map block lists the five lines; a host that blocks openstreetmap.org shows the frame-src line in the editor and a link for visitors
- [ ] «+ Ny seksjon»: «Finn oss» is in Kort og lister with the core presets (not in a Plugins group); it inserts a title and a map
- [ ] A site that still lists «map» in its own plugins.json just logs a warning and renders the core block

### Testrunde-batch (0.7.18.1): the Swedish language pack in admin

- [ ] Admin settings (the gear), Språk: «Svenska» is listed; choosing it turns the whole admin Swedish (panels, tooltips, the block palette, status messages, the seed texts of new blocks and sections), and the choice is remembered in the browser; a key without a Swedish text (none known) falls back to bokmål, never blank
- [ ] Site panel, Språk på nettsiden: «Svenska» is still listed, and the published page and the preview show Swedish visitor texts when chosen

### Testrunde-batch (0.7.13.3): the nav surface

- [ ] Nav panel, Behaviour: «Gjennomsiktig øverst» (shown for bar and floating, never for the side column): in Clean view and on the published page the menu has no surface, blur, border or shadow while the page is at the top, and they fade in after about 80 px of scrolling and fade out again at the top; with a layer background on the nav the layers are hidden at the top too; while editing (chrome on) the surface is always drawn
- [ ] «Gjennomsiktig øverst» together with «Legg menyen oppå toppseksjonen» and a hero with an image: the hero shows through the menu at the top, the menu gets its surface once scrolled; with sticky off the menu simply scrolls away transparent
- [ ] «Gjennomsiktig øverst» with nav.scroll shrink and with hide: the compact state and the hide state still work, and the surface follows the same top zone as before
- [ ] Nav panel, Layout, floating variants: «Avrunding (px)» empty shows the variant's preset (pill, square, tab), a value 0-64 rounds all three (the tab keeps its square top), the field clamps 200 to 64, and clearing it restores the preset; hidden for bar and side
- [ ] Hover style Understrek: hovering a menu item draws the underline from the left with no visible jump between the end of the animation and the resting line (compare at 100 % and 200 % zoom); with reduced motion the line appears at once
- [ ] Site panel, Theme panel and Nav panel changes update the preview at once (the site-draft rerender; a regression in 0.7.17.2 threw before the nav was rendered)
- [ ] The three labels and tooltips in nb, en-GB and tr

### Testrunde-batch (0.7.17.2-3): scaling below the content width, and the content push

- [ ] The demo pages at 1440, 1280, 1024 and 820 px in Chromium and Firefox: no text over another block, and below the content width the canvas is fluid with nothing zoomed as a whole
- [ ] «Ved smalere skjerm: Krymp innholdet» with «Minste skala» is in Placement in the element menu of every block except image, video, shape and icon (stats, quote, FAQ, table, collection, product, button, countdown, plugin blocks): at a narrow window the block's content keeps its size until it no longer fits the design height, then shrinks only as much as needed down to the floor, and wraps and pushes past it; «Bryt innholdet» restores the size at once
- [ ] Image, video, shape and icon blocks: the row reads «Ved smalere skjerm: Følg bredden / Behold en minste størrelse» with «Minste skala»; with 60 % on an image at a narrow window the image stops shrinking at 60 % of its design width, is capped at the canvas's right edge (never overhangs into the gutter), and the blocks around it are unaffected; with «Full» content width the floor does nothing; the first image on Om oss ships with the floor in the example data
- [ ] The Hjem page's paragraph «Urd er under oppbygging ...» ships with «Krymp innholdet» 60 % in the example data: at 700 px it shrinks and the «Les mer» button stays in place; a text block that had the old text-level setting in a local draft must be set again
- [ ] The Hjem page at about 1070 px window width: «Gjerne følg prosjektet på vår Github side!» wraps to two lines and the «Les mer» button sits below the text, not under it; widen the window and the button returns to its design place
- [ ] A badge or a title deliberately placed over an image (its top above the image's middle) stays where it is when the image's neighbour text grows
- [ ] A pinned block (scroll pinning) and a docked block after a push and under zoom at 1280 px: they pin and release where they stand
- [ ] The nav: a wide window shows the items; narrowing the window folds them to the burger only when they reach the tools; 640 px gives the burger
- [ ] Browser zoom to 200 % still enlarges the text, and a text made longer in the editor at the design width pushes the block below
- [ ] The published page equals the preview at the Laptop and Tablet devices
- [ ] The Screen choice (own window or an editing size with width and height) sits in the admin settings behind the gear, not under the Screen button in the toolbar; a click on Screen only selects the device, and the choice is remembered in the browser
- [ ] The device strip has four devices (Screen, Laptop, Tablet, Phone); Reference 1920 is gone
- [ ] Screen with a browser window narrower than 640 px shows the stacked mobile layout, as the published page does in that window
- [ ] Type more text into a text block at the design width until the box grows: the blocks below move down with it, one undo step restores both; a feed block with more entries than its box moves the blocks below on the published page without changing the draft
- [ ] A text block with «Krymp innholdet» 60 % at 700 px: the heading shrinks with the width instead of wrapping and the button below stays in place; the mobile view wraps regardless
- [ ] The shrink starts only when needed: a text with room to spare in its frame keeps its size as the window narrows until the frame is too narrow for it at full size, then it gets smaller step by step so it still fits the design height, and never under «Minste skala» (a share of the DESIGN size: 40 % of a 16 px text is 6.4 px, whatever the page scale); typing into a shrunk text re-fits it
- [ ] Narrowing the window slowly with a shrunk text never shows a flicker: the text is never drawn wrapped and then unwrapped at a step, it just gets smaller; widening it again brings the size back the same way, and the console shows no ResizeObserver loop message
- [ ] Narrow the window so a paragraph wraps and pushes, then widen it again: the box and the blocks below return to the design; a FAQ answer opened on the published page pushes the blocks below and closing it brings them back

### Testrunde-batch (0.7.3): the release

- [ ] Updates panel on a site created from the template (urd-web): 0.7.3 is offered, the update applies, and the site renders with engine 0.7.3 (all pages, the admin, the slug copies)
- [ ] Nav panel: set a bottom border on the bar, switch to a side variant: the column shows no border; switch back: the border is there again
- [ ] Nav panel, Size with Phone selected, then Variant to side-left: the Text size row shows and edits the desktop value; back to bar: the Phone view is where it was
- [ ] Engine colour picker (a form plugin field or a block colour on the canvas) with the Brønn theme: all theme dots are shown and pick their colour

### Testrunde-batch (0.7.12): the anchoring round and the local test round after it

- [ ] A modern browser (Chrome 125+, Firefox 147+, Safari 26+): a Nav panel dropdown opens as a popover under its button, flips above near the bottom edge, closes on Escape, a click outside, a click in the preview and a scroll; the chosen value is applied
- [ ] The same in an older browser (Safari 18-25, Firefox 132-146): the menus behave as before 0.7.12 (measured placement, same closing)
- [ ] Colour picker in the Nav panel: the card opens under the swatch, stays inside the panel for the middle theme cells in the Theme panel, closes on a click in the preview; the picked colour is applied live
- [ ] Glyph picker on an icon block: opens as a popover, a chosen character or icon is applied, and reopening shows the chosen icon and character first under Recent
- [ ] Text toolbar with the Brønn theme: Text colour gives white, Accent gives the accent, both follow a light/dark switch; the custom colour card opens above the toolbar, and dragging the hue slider keeps both the toolbar and the card in place
- [ ] Engine dropdown (form plugin field type) opens as a popover and applies the choice; Clean view hides an open editor dropdown
- [ ] Theme panel: the Auto row under both palettes; Auto on gives black or white on accent buttons on the page in both modes, Auto off restores the cells' own colours; the accent-text cells show a hex code
- [ ] Nav with blur: the submenu and the open mobile panel blur the page behind them, not the bar
- [ ] Opening any panel opens no group by itself; the Site panel's Advanced gutter fold opens only with a custom gutter value
- [ ] Group folds: the chevron points right while closed and turns down on open; the panel head's fold toggle expands all, flips, and collapses all; the toggle in Appearance acts on its six sub-folds only and follows folds opened by hand
- [ ] The panel's fold toggle stays in place when a group opens and the scrollbar appears (thin gutter always reserved)
- [ ] Nav panel, Submenu group: «Opens» is shown only when the menu has submenus; On hover opens and closes with the pointer, On hover closed by click keeps the submenu open until a click, another item or a click outside, On click only ignores the pointer; on a touch device all three open on tap
- [ ] The new labels read correctly in nb, en-GB and tr, and no row shows a raw key

### Testrunde-batch (0.7.15.2): the Nav panel's Appearance folds

Supersedes the panel placement described in the 0.7.15 items below (the controls are the same, now grouped); nothing is removed.

- [ ] Nav panel, Appearance open: six folds Layout, Size, Frame, Behaviour, Colours, Background, all closed until opened; each fold opens and closes on its heading
- [ ] Layout: switching the variant swaps only the rows under it (floating: menu width, glow, space above; bar: overlay, align to content width; side: text alignment, column width), and the placement row stays
- [ ] Size on Screen: the number beside Thickness follows the slider and vice versa; typing 30 sets 30 px, emptying the field returns to the preset's value and the preset lights up again
- [ ] Size on Phone: the sliders show the desktop values until a mobile value is set; dragging Thickness writes only the mobile override (the Screen view is unchanged); emptying the number (placeholder «Same») removes the override; side padding and item spacing are hidden on Phone
- [ ] The side variant hides the Screen | Phone switch, Thickness and the pair, and keeps the presets and Text size
- [ ] Frame: choosing a border side reveals width and colour on one row; None hides them again; Shadow shows for the bar only
- [ ] The fold names, «Same» and «Auto» read correctly in nb, en-GB and tr, and no row shows a raw key

### Testrunde-batch (0.7.15): navigation bar sizing

- [ ] Nav panel, variant bar: the Size row shows four segment buttons with the current step highlighted; the Thickness and Text size sliders start at the step's values (14 px and 16 px on Medium); dragging a slider un-highlights every step, and clicking a step resets both sliders
- [ ] Thickness 0 with an image logo: the bar stops at the logo row (about 36 px) and never gets thinner; thickness 64 gives a tall bar with the logo centred
- [ ] Thickness on the floating pill: the slider starts at the step's value scaled down (about 10 px on Medium); a typed 30 renders 30 px in the pill and the same 30 px after switching to the bar
- [ ] Text size 24: the menu items grow, the logo text follows, a logo with its own text size does not
- [ ] Side padding 0 and 80, item spacing 0 and 64: the bar, the open mobile panel and the side-to-bar fallback below 900 px all follow the side padding; the item spacing changes only the horizontal list
- [ ] Align to content width on a site with content width 1200 in a wide window: the logo and the first item stand exactly on the content edge of a section below (compare with a text block at the left edge); in the Mobile device the bar keeps its normal padding
- [ ] Floating menu width «Content width»: the pill is as wide as the content band at 1920, 1536 and 1366 px windows; «Custom» empty gives today's 1100 px, 600 gives a narrow pill; in the Mobile device the pill fills the width as before
- [ ] Side variant: the Column width field shows 250, typing 300 widens the column and the drag handle agrees; dragging updates the field; 100 and 999 snap to 180 and 400; Thickness, side padding, item spacing, inset, menu width, border, shadow and the Mobile group are hidden
- [ ] On scroll Shrink: «Shrink to» 30 % gives a much thinner bar after scrolling, 80 % almost none; with an image logo «Shrink the logo too» scales the image with the bar and back, with a transition; without an image the checkbox is hidden
- [ ] Mobile group: thickness 4 and text size 14 apply in the Mobile device and on a phone, not on desktop; a narrow desktop window whose items fold into the burger keeps the desktop values; emptying both fields removes the group's data (localStorage draft shows no `mobile` key)
- [ ] Logo height on mobile 20: the logo image is 20 px in the Mobile device and unchanged on desktop; empty = same as desktop
- [ ] Border Bottom, width 3, colour accent: a 3 px accent line under the bar; Top and bottom, All sides and None behave; on the pill the border follows the rounding; width 0 and 99 snap to 1 and 8
- [ ] Shadow Soft and Strong under the bar; the Shadow row is hidden on the floating variants (glow instead) and on the side variant
- [ ] Publish with thickness 24, inset on and border bottom: the published page equals clean view in the same window, and the site.json in the repo carries only the fields that were set (no defaults written)
- [ ] The example site (`mobileSize` 26) shows the logo at 30 px on desktop and 26 px in the Mobile device
- [ ] Labels and tooltips for every new row read correctly in nb, en-GB and tr

### Testrunde-batch (0.7.2.7): the Screen device follows the browser window

- [ ] Clean view on Screen (My window) in a browser window narrower than the monitor: the preview stands 1:1 with the published page opened in the same window (the content band and the text at the same size and position, apart from the page's scrollbar width)
- [ ] Resize the browser window: the preview follows the new width at once; the Screen tooltip shows the window width
- [ ] Maximise the window: the preview equals the published page maximised

### Testrunde-batch (0.7.2.6): the Screen device follows your own screen, or an editing size

- [ ] Editing size without a height: the canvas stands at the typed width, the panel is filled, no bar below the stage
- [ ] Editing size with height 900: the stage ends at the fold, the surface below it is dark, the page scrolls inside the iframe, no second scrollbar in fit mode; manual zoom past the surface still pans
- [ ] Type 100 and 9999 in W, then 300 and 5000 in H: the fields snap to 640, 3840, 480 and 2400; an empty or 0 height fills the panel again
- [ ] Reload: mode, W and H persist; another browser starts on My window
- [ ] Laptop, Tablet and Phone are unchanged, with no bar below the stage
- [ ] A site with content width Full previews at your own screen width
- [ ] The W and H fields are hidden on My window; the device labels, the segment and the tooltips read correctly in nb, en-GB and tr

### Testrunde-batch (0.7.8.2): fresh content after a publish

- [ ] Chromium: on the published site hover a nav link for a second (prerender), publish a change to that page from the admin in another tab, wait for Live, then click the link: the new content shows without a manual reload (Network panel: a 200 on the page file at activation)
- [ ] Any browser: on the published site, navigate to an external site and press Back after a publish of that page: the page updates
- [ ] Rename a menu item and publish, then activate a prerendered page or come back through Back: the page reloads with the new menu
- [ ] The admin preview iframe makes no page-file recheck requests (Network panel filtered on content/)
- [ ] Two publishes in a row: only the last one reports Live or the timeout

### Testrunde-batch (0.7.8): boot in one wave and intent prefetch

- [ ] Visitor page in Firefox or Safari with the Network panel open: click an internal link; the request waterfall shows plugins.json, the three manifests and page.json starting together instead of one after the other, and the page renders as before (plugins, nav, footer, sticky)
- [ ] Hover a nav link and wait a moment before clicking: page.json is fetched at the hover, and the boot after the click does not fetch it again until the background revalidation (a 304 on Cloudflare); the page shows the same content
- [ ] Publish a change to a page, then on the published site hover its link on another page and click within a few seconds: the new content shows (either directly or after the background revalidation rerenders)
- [ ] Touch device: press an internal link; the page switch works and the target page renders correctly
- [ ] Editor preview (?preview=1): page switches in the editor behave as before and no page.json prefetch appears in the Network panel from the iframe
- [ ] Private window or a browser with storage blocked: navigation works, no console errors from prefetch

### Testrunde-batch (0.7.14.2-18): the English clean-up, all stages merged 15 September 2026

**0.7.14.18: Siste ekstra sjekk**

- [ ] Delingsblokken hos besøkende viser «Kopier lenke» og «Del på e-post» (ikke nøkkelnavn) på nb og de andre sidespråkene
- [ ] Ny kontaktseksjon og nye footer-presets får e-post- og telefonlenker fra seed.email/seed.phone på admin-språket (nb: post@dinforening.no, +47 22 00 00 00; en-GB: post@yourclub.org, +44 20 0000 0000), og tel:-lenken er uten mellomrom
- [ ] Tekstverktøylinjas linjehøyde-knapper viser 1,0 / 1,15 / 1,5 / 2,0 i nb og 1.0 / 1.15 / 1.5 / 2.0 i en-GB, med «Arv» som første valg på nb

**0.7.14.17: Sluttauditen**

- [ ] Egenskaper-overskriften viser oversatt blokknavn (ikke rå id) for galleri, samling, tidslinje, sitat, statistikk, tabell, deling, nedteller, produkt, handlekurv og kasse
- [ ] Samlingsblokkens tomtilstander (ingen samling valgt, ukjent samling, tom samling), «+ Legg til bilder»-knappen og «Uten dato»-overskriften er på admin-språket; bildeeditorens «Ingen bilde ennå» vises for tom miniatyr
- [ ] Publisering med admin på bokmål skriver commit-meldingen på norsk, f.eks. «Oppdater Hjem, menyen via Urd-admin»; en publisering uten titler gir «nettstedet»
- [ ] Vipps (testavtale, deployet): returen fra betaling lander på ?ordered=1 og kvitteringen vises; en betaling startet før oppdateringen som returnerer med ?bestilt=1 gir ingen kvittering (kjent kant)
- [ ] Nye bakgrunnsbilder lagres som media/background-<hash>, menybilder som media/menu-<hash>; nye samlingsinnslag får id entry-...

**0.7.14.9: Resterende strenger**

- [ ] Preset-galleriet og blokkmenyene viser riktige (norske) etiketter og hint i nb; kalender-, kart- og skjemapresetene ligger i Kort og lister-gruppen i ALLE språk
- [ ] Chrome-tekstene er oversatt: tom bilde-/galleriblokk på lerretet, «Skriv tekst»-placeholder, videoskjoldets tooltip, kolonnebredde-gripen i sidestilt nav (nb/en-GB/tr)
- [ ] Kontaktskjemaets valideringsmeldinger hos besøkende er fortsatt på sidespråket
- [ ] Lokal server starter med engelske meldinger; en ugyldig SVG-opplasting avvises fortsatt pent

**0.7.14.8: Ikonetikettene**

- [ ] Glyf-/ikonvelgeren viser norske tooltips på ikonene i nb (som før), engelske i en-GB og tyrkiske i tr
- [ ] Footer-panelets sosial-ikon-nedtrekk viser oversatte navn; publisert footer har aria-labels på ikonlenkene

**0.7.14.7: CSS-klassene**

- [ ] Visuell gjennomgang av alle blokktyper på lerret og publisert i BEGGE moduser: produktkort med hover-bildebytte, kurvskuff, kasse, galleri (grid/karusell/slides + lightbox), samlingsvisningene, sitat (stort/kort med portrett), tidslinje (venstre/vekslende), tabell, nedteller, deling, statistikk - alt ser ut som før klasse-renamet
- [ ] Kortvis-animasjonen på produktblokken spiller fortsatt (urd-anim-cardwise-markøren)
- [ ] Videobakgrunnens plakat ved redusert bevegelse og nav-krympingen ved scrolling virker (variabel-renames)
- [ ] 404-siden ser riktig ut (`.code`-klassen)
- [ ] En side med egendefinert CSS mot gamle klassenavn dokumenteres som kjent brudd (CHANGELOG-notatet), ikke som bug

**0.7.14.6: Identifikatorene, nøkkelrommene og utkastnøklene**

- [ ] UTKAST-MIGRERING: med et upublisert samlings-/mal-utkast fra FØR denne versjonen i nettleseren: åpne admin - utkastet overlever (vises med endringsmerke), og gamle urd-draft-samling*/-mal*-nøkler er borte fra localStorage
- [ ] Kurvskuff, kasse og nedteller viser riktige tekster hos besøkende i alle fem språk (site-gruppene shop./share./countdown.)
- [ ] Egenskaper-panelene for tidslinje, sitat, tabell, nedteller, deling og handlekurv viser riktige etiketter/valg i nb, en-GB og tr; hjelpechipene («?») åpner med riktig innhold
- [ ] Footer-malvelgeren viser alle åtte oppsettene med riktige navn og bygger riktig footer
- [ ] Mine maler-fanen i «+ Ny seksjon» viser mal-utkastene (urd-templates-meldingen) og innsetting virker

**0.7.14.5: Motorfil-renames**

- [ ] Butikkflyten ende til ende etter filflyttingen: produktkort, kurvskuff, kasse og nav-kurv virker (shop.js/cart.js/checkout.js)
- [ ] Galleri med lightbox, samlingsblokk, maler-innsetting og CSV-eksport/-import virker (gallery-model/collections/collections-csv/templates-model)

**0.7.14.4: Plugin-laget med aliaser**

- [ ] En side bygget før renamet (blokktype kalender/kart/skjema, preset hva-skjer) rendrer med kjerneblokkene; Hva skjer-, Finn oss- og Kontaktskjema-presetene står i seksjonsgalleriet med riktige navn

**0.7.14.3: Preset-idene til engelsk med migrering**

- [ ] En side lagret før renamet (med f.eks. butikk-, steg- og hovedoppslag-seksjoner) beholder «+ kort/rad»-adderknappen i seksjonsverktøylinjen etter innlasting (preset-oppslaget virker via migreringen)
- [ ] «+ Ny seksjon»-galleriet viser alle gruppene med riktige etiketter og miniatyrer; Butikk-gruppen heter fortsatt Butikk i nb (nøkkelen er presetGroup.shop)
- [ ] «Ny side fra mal» viser alle åtte startpakkene med riktige navn i nb/en-GB/tr, og alle bygger gyldige sider
- [ ] En gammel lagret mal med norsk preset-id på seksjonen settes inn og beholder adder-knappen
- [ ] Ukjent side-adresse viser fortsatt tom side uten konsollfeil (fallback-oppføringen)

**0.7.14.2: Kontrakt-tokens til engelsk med migrering**

Kjernen i testen er invarianten: en side bygget FØR renamet skal se identisk ut etter.

- [ ] MIGRERING: en side lagret før denne versjonen (v2, gjerne med butikk-, samlings-, galleri-, tidslinje- og sitatblokker, seksjonsroller og bildegalleri-lag) åpner identisk i editoren og hos besøkende; publisering skriver den løftede formen (schemaVersion 3, engelske tokens) uten visuell endring
- [ ] Gamle localStorage-utkast (fra før renamet) lastes og rendres riktig
- [ ] En lagret mal (seksjon/blokkgruppe) fra før renamet settes inn med riktige blokker; en side-mal likeså
- [ ] TIDSLINJE/SITAT: variantvalgene i Egenskaper (venstre/vekslende linje, stort/kort sitat) og markørvalget virker; gamle blokker med norske verdier viser samme variant som før
- [ ] SEKSJONSROLLER: rollevelgeren viser alle sju rollene med riktige farger i begge moduser; gamle sider med norske roller beholder fargene
- [ ] Kalender-, kart- og skjemablokkene er uendret på gamle og nye sider
- [ ] i18n: blokk-etikettene, rollene og variantvalgene har riktige tekster i nb, en-GB og tr

### Testrunde-batch (0.7.7): Video-bakgrunnslag og mediegrensene

Laget og grensene kan testes lokalt; materialiseringen ved publisering trenger en deployet side.

- [ ] VIDEOLAG: nytt lag av typen Video i Egenskaper-bakgrunnen: velg mp4/webm-fil, laget vises og spiller på lerretet; plakatbilde, utsnitt (cover/contain med x/y), dekkevne og parallax med styrke virker
- [ ] Avspilling: videoen spiller kun mens seksjonen er i viewporten (pauser utenfor); en side med videolag under folden laster ikke filen ved sidelast (nettverkspanelet viser kun metadata før scroll)
- [ ] Redusert bevegelse (OS-innstilling): plakaten vises som stillbilde med samme utsnitt; uten plakat vises lagene under, aldri et tomt hull
- [ ] GRENSER: video over 4 MB gir varsel men beholdes, over 15 MB avvises med beskjed; en fil som ikke er mp4/webm avvises med formatmelding
- [ ] Publisering (deployet): videoens data-URL materialiseres til media/ (plakaten også) og den publiserte siden spiller videoen; lydblokkens mp3 publiseres nå uten avvisning fra vokteren
- [ ] Parallax: dybdevirkningen på videolaget matcher bildelagets; mobilvisning og redusert bevegelse holder laget i ro
- [ ] i18n: en-GB og tr for videolagets etiketter, filvalgene og statusmeldingene

### Testrunde-batch (0.7.6): SEO- og synlighetspakken

Head-taggene og markøren kan testes lokalt; de publiserings-genererte filene (sitemap/robots/RSS) og 404-siden trenger en deployet side.

- [ ] SØK OG DELING: gruppen i Sider-panelet viser den åpne sidens navn; beskrivelse, delingstittel/-beskrivelse og delingsbilde lagres i utkastet og publiseres; view-source på publisert side viser description, canonical, og:-taggene, twitter:card og JSON-LD (aldri i preview-iframen)
- [ ] Fallback-trappa: en side uten egne felt får og:description fra nettstedsbeskrivelsen og og:image fra nettstedsikonet; deling av en side i sosiale medier viser riktig kort
- [ ] Delingsbildet materialiseres til media/ ved publisering (data-URL forsvinner fra sidefila)
- [ ] SKJUL FRA SØK: avkryssingen gir robots-noindex uten canonical på den publiserte siden, siden utelates fra sitemap.xml, og varselmarkøren vises ikke for skjulte sider
- [ ] MARKØREN: sider uten beskrivelse viser gult varselikon i Sider-panelet (også nye sider); den forsvinner i det beskrivelsen skrives og kommer tilbake når den tømmes
- [ ] SITEMAP/ROBOTS: publisering skriver sitemap.xml med alle synlige sider (absolutte adresser) og robots.txt med Disallow: /admin/ og sitemap-peker; ny publisering uten endringer gir ingen diff i filene
- [ ] RSS: endre nyhets-samlingen og publiser - content/samlinger/nyheter.xml finnes med innslag, pubDate og escapede titler; produktkatalogen får aldri feed
- [ ] 404: en ukjent adresse på deployet side viser 404-siden med temafargene og forsidelenke (status 404); lokalt degraderer det pent
- [ ] i18n: en-GB og tr for Søk og deling-feltene, avkryssingen og markør-tooltipen

### Testrunde-batch (0.7.5.3): Kortvis animasjon og nav-kurvens klaring

- [ ] KORTVIS: produktblokk med Ton inn/Gli opp hos besøkende: kortene spiller enkeltvis med forskjøvet start når blokken scrolles inn, ikke blokken som helhet; med Løft ved peker løfter hvert kort seg individuelt, umiddelbart også langt ut i rekka, og tilbakeløftet henger ikke
- [ ] Editor-demo: å velge animasjon på produktblokken spiller kortbølgen på lerretet; en produktblokk uten katalog (eller med tom) toner fortsatt blokk-elementet, valget er aldri stumt
- [ ] Seksjon med stagger som også har en produktblokk med egen animasjon/hover: blokken dobbelt-animeres ikke (kun kortene spiller)
- [ ] Redusert bevegelse (OS-innstilling): kortene vises straks uten animasjon
- [ ] NAV-KURV: luft mellom kurvknappen og lys/mørk-bryteren (badgen berører ikke bryteren); uten alt-tema står kurven kant i kant med klyngens kant; mobilmenyen og sidefelt-nav ser riktig ut

### Testrunde-batch (0.7.0.3): Tag-stripping-fiksen og avhengighetsbumpene

- [ ] Et produkt med formatert tittel (fet/kursiv) viser ren tekst i kurvlinjen (skuffen og kassen) og i Samlinger-panelets sammendragslinje; å tømme tittelen på lerretet beholder fortsatt den gamle

### Testrunde-batch (0.7.5.2): Betalingslaget, butikkdesignet og testfunn-fiksene

Betalingslaget trenger en deployet side med Vipps-testavtale (MT-miljøet, VIPPS_API_BASE=https://apitest.vipps.no); resten kan testes lokalt.

- [ ] VIPPS: uten hemmeligheter i Cloudflare viser «Betal med Vipps» en rolig utilgjengelig-tekst (503), og skjema-kassen virker uendret; lokalt (ingen functions) det samme
- [ ] Vipps med testavtale (deployet): knappen redirecter til Vipps Checkout med riktig sum (regnet server-side); en tuklet payload (ukjent produkt-id, negativt antall) avvises; retur til kassesiden med ?ordered=1 viser kvittering, tømmer kurven, og en oppfrisking etterpå tømmer IKKE en ny kurv
- [ ] Kasse-Egenskaper: Vipps Checkout-avkryssingen viser/skjuler knappen; tooltip forklarer Cloudflare-oppsettet
- [ ] FARGEPRØVER: med OS i mørk modus viser Egenskaper-prøvene alt-paletten; klikk på månebryteren i forhåndsvisningen flipper prøvene og seksjonstema-prøvene live; en side med scheme: dark viser riktig palett i lys modus
- [ ] HANDLEKURV-BLOKK: første klikk på kurvpillen velger blokken (ingen skuff), flate-dra flytter den, andre klikk åpner skuffen; hos besøkende åpner første klikk som før; gamle sider med kurven på y=28 kan fortsatt velges og flyttes
- [ ] SCROLL-RO: scroll til produktbåndet og rediger tittel/pris/nytt produkt i Samlinger-panelet - siden står i ro; tema-endringer og angre på samme side beholder også posisjonen
- [ ] BUTIKK-GRUPPEN: + Ny seksjon viser Butikk-gruppen med butikk, butikk-hero, butikk-kategorier, butikk-tillit, butikk-utstilling og kasse; miniatyrene toner dus/dempet/dyp-båndene ulikt bg-bånd
- [ ] Rollebåndene (dus/dempet/dyp) leses riktig i BEGGE moduser på lerretet og publisert; «+ kategori» og «+ kort» fyller neste ledige rute
- [ ] Startpakkene: «Ny side fra mal» viser Butikk (redesignet med hero) og Butikkforside; begge bygger gyldige sider med fungerende produktbånd, og det er luft mellom kurvpillen og produktkortene
- [ ] HOVER-BYTTE: produktkort med fargebilde viser neste bilde ved hover (ikke på touch); et valgt fargevalg med eget bilde vinner over hover; kort uten fargebilder er uendret
- [ ] NAV-KURV: «Handlekurv i menyen» i Nav-panelet viser kurvknapp med badge i verktøy-klyngen; badgen teller med produktkortenes kjøp og på tvers av faner; skuffen åpner/lukker og «Til kassen» følger kasseside-valget; mobilmenyen viser også kurven
- [ ] i18n: en-GB og tr for de nye preset-etikettene, Nav-panelets kurvvalg og Vipps-tekstene

### Testrunde-batch (0.7.5.1): Butikken

Produktkatalog, tre nye blokker, butikk-/kasse-sider, quick view, katalogflyt og CSV. Kurv/quick view kan testes lokalt; mailto/endepunkt-bestilling trenger en deployet side.

- [ ] KATALOG: Samlinger-panelet kan opprette en samling av typen Produkter; produktfeltene (pris, medlemspris, badge, størrelser, farger med bilde) vises KUN for produktsamlinger; dato- og lenkefeltene vises IKKE for produkter; sammendragslinjen viser tittel · pris
- [ ] PRODUKTKORT: blokken viser eksempelkatalogen med badge, pris («Medlem: …» når satt), størrelseschips og fargechips; fargevalg med eget bilde bytter kortbildet; «Legg i handlekurv» gir Lagt i kurven-kvittering og teller opp kurv-badgen
- [ ] Nytt produkt uten pris viser ingen prisrad («0 kr» skal aldri stå der); prisen dukker opp når den settes i panelet
- [ ] KATALOGFLYT: «+ Produkt»-kortet sist i rutenettet legger et nytt produkt bakerst (ett Ctrl+Z fjerner det); adderen står også på tom katalog; ingen adder når Maks antall er nådd, i Ren visning, hos besøkende eller i mobilvisning
- [ ] Egenskaper på produktkort-blokken: «+ Nytt produkt» legger til; «Rediger produktkatalogen» åpner Samlinger-panelet med katalogen aktiv; uten noen produktsamling vises «+ Opprett produktkatalog», som oppretter «Produkter», binder blokken og angres i ETT steg
- [ ] QUICK VIEW (Ren visning/deployet): klikk på kortets bilde eller tittel åpner produktdialogen med bildegalleri (miniatyrer bytter hovedbilde), full tekst, variantvalg og kjøp; Escape og backdrop-klikk lukker; Enter/mellomrom på fokusert kort åpner; i redigeringsmodus åpner klikk ALDRI dialogen (klikk-og-skriv eier klikket)
- [ ] HANDLEKURV: knappen viser antall-badge (skjult på 0), skuffen åpner med linjer, +/−-styring, fjerning, sum og «Til kassen»-lenken når kasseside er valgt; skuffen er ALDRI synlig før klikk; endring i en annen fane oppdaterer badgen
- [ ] KASSE (deployet for full flyt): sammendraget følger kurven live; navn + gyldig e-post kreves; mailto åpner utkast med ordrelinjer, sum og kontaktfelt (kurven består); endepunkt-modus sender JSON og tømmer kurven ved OK-svar; honeypot-utfylling gir stille «sendt»; Vipps-instruksen vises når nummer er satt
- [ ] BUTIKK-SIDER: «Ny side fra mal» viser startpakkene Butikk og Kasse; begge bygger gyldige sider, og handlekurvens Kasseside-valg + skuffens «Til kassen» navigerer til kassesiden
- [ ] Butikk-seksjonspresetet: kort med kant leses på både lyst og mørkt tema; badge ligger over bildehjørnet med bilde og som statisk chip uten; miniatyrene i «+ Ny seksjon» og «+ Ny blokk» tegner produkt/handlekurv/kasse gjenkjennelig
- [ ] CSV: Eksporter laster ned katalogen (regneark-vennlig, størrelser/farger med |); Importer erstatter innslagene, tåler komma-desimal, hopper over rader uten tittel, og angre gjenoppretter; datoløst produkt runde-tripper
- [ ] Mobil/publisert: produktkort, kurvskuff og kasse har naturlig høyde i mobil-radnettet; ingen vannrett scrolling; en side UTEN butikk-blokker er upåvirket (ingen kurv-lyttere/CSS-effekter)
- [ ] i18n: bytt admin-språk til en-GB og tr - blokk-etiketter, Egenskaper-knapper, hint-chips og tomtilstander er oversatt; besøkende-side på en-GB/tr viser kurv/kasse/quick view-tekster oversatt

### Testrunde-batch (0.7.4): Blokk- og feltrunden

Fire nye kjerneblokker og fire nye skjema-felttyper. Alt kan testes lokalt, men mailto/endepunkt og deling trenger en deployet side for full flyt.

- [ ] SKJEMA: legg til felt av hver ny type (nedtrekk, avkryssing, radiovalg, dato) i felt-editoren; nedtrekk/radio får alternativlinjen (kommaseparert), og typebytte bort fra dem fjerner linjen
- [ ] Besøkende-skjemaet: nedtrekk viser «Velg …» først og følger OS-temaet i popupen; radiogruppen har gruppeetikett; avkryssing står FØR etiketten; dato bruker nettleserens datovelger
- [ ] Validering: påkrevd avkryssing må krysses av, påkrevd nedtrekk/radio må ha valg, ugyldig dato avvises; feilmeldingene står ved feltet på sidens språk
- [ ] Innsending (deployet): mailto-kroppen skriver «Felt: Ja» for avkrysset boks og utelater en tom; endepunkt-payloaden har ekte boolsk for avkryssing
- [ ] TABELL: sett inn fra begge blokkmenyene; skriv i cellene på lerretet; + / - rad og kolonne i Egenskaper virker og bevarer innholdet; overskriftsrad, striper og linjevalg (rader/rutenett/ingen) tegner riktig
- [ ] Tabell bredere enn blokken ruller sidelengs i egen flate (også publisert og på mobil), uten at siden får vannrett scrolling
- [ ] DELING: knappene åpner riktig delings-URL med SIDENS adresse (test fra en underside); e-post åpner e-postklienten; «Kopier lenke» kopierer og viser Kopiert-kvittering; ingen tredjeparts-forespørsler i nettverksfanen
- [ ] Deling-stil: ikoner/ikon+navn-variantene, størrelse og farge (tema-token og egen) virker
- [ ] NEDTELLER: teller riktig mot målet og tikker hvert sekund; «Vis sekunder» av skjuler boksen; passert mål viser ferdig-teksten, som kan skrives på lerretet
- [ ] Nedteller-enhetene (dager/timer/minutter/sekunder) følger sidens språk i Ren visning og publisert
- [ ] AUDIO: velg en lydfil i Egenskaper (data-URL i utkast), spilleren virker i preview; publisering skriver fila til media/ med riktig filendelse og spilleren virker deployet (CSP)
- [ ] Audio: stor fil gir størrelsesvarsel; «Fjern lydfil» tilbake til plassholderen; tittel over spilleren kan skrives på lerretet
- [ ] Mobil: alle fire blokkene får naturlig høyde i radnettet (ingen klipping eller overlapp); deling-knappene og nedteller-boksene radbryter pent på 390 px
- [ ] Miniatyrene: de fire nye blokkene tegnes gjenkjennelig i seksjons- og sidemaler-kortene
- [ ] Verktøylinje-vippen: dra en blokk helt øverst på siden eller rett under den klistrede menyen: blokkverktøylinja legger seg UNDER blokken med én gang (uten omlasting), og vanlige blokker beholder linja over
- [ ] Autovekst etter klaringsrettelsen: en seksjon med faq/samling/skjema vokser fortsatt riktig når innholdet vokser, og første seksjon under flytende meny BEHOLDER nav-klaringen når autovekst-blokker justerer seg

### Testrunde-batch (0.7.0.2): Bug-runden - nav-klaring, chrome, dokking, malbilder og logo

Alle femten punktene fra Bugs-lista. Det viktigste er nav-klaringen (endrer hvordan første seksjon rendres under flytende meny, på alle eksisterende sider) og dokk-draget.

- [ ] NAV-KLARING desktop: med flytende/overlay-meny (demosidene bruker floating-square) starter innholdet i første seksjon UNDER menyen, mens seksjonsbakgrunnen fortsatt fyller helt opp bak den. Sjekk Hjem-siden: hero-teksten skal ikke lenger ligge under menyen
- [ ] Nav-klaring mobil: samme i mobilvisning og i Ren visning i smalt vindu; første seksjons innhold starter under menyen
- [ ] Nav-klaring publisert: en deployet side viser det samme som previewen (klaringen er motor-CSS, ikke editor-chrome)
- [ ] Med meny I flyten (sticky vanlig bar, ikke floating/overlay) er ingenting endret: ingen ekstra luft øverst
- [ ] Se over alle fire demosidene etter klaringen: toppseksjonene har fått innholdet skjøvet ned med menyhøyden, og noen kan trenge en visuell justering
- [ ] Høyde-drag (bunn og topp) på FØRSTE seksjon under flytende meny: draget treffer der pekeren er, høyden i panelet/dataene er innholdshøyden (uten klaringen), og ingenting «kryper» ved gjentatte drag
- [ ] Fest ved scrolling på en blokk i første seksjon under flytende meny: fester og slipper på riktig sted (kanvas-forskyvningen er regnet inn)
- [ ] NETTBRETT-FOLDING: gjør vinduet gradvis smalere med mange/lange menypunkter: punktene brytes ALDRI inne i etiketten; i stedet folder menyen til burger når det blir for trangt, og folder ut igjen når det blir plass (uten flimring på grensen)
- [ ] Mobilmeny-gapet: åpne burgeren med flytende pille (alle tre variantene: pille, firkant, tab): panelet ligger kant i kant med pillen som én flate, pillens nedre hjørner flater ut mens panelet er åpent
- [ ] Øverste «+ Ny seksjon»: hover øverst i første seksjon: chipen vises UNDER menyen, har samme størrelse som de andre ny-seksjon-chipene på alle zoomnivåer, og kan faktisk klikkes
- [ ] Seksjonsverktøylinja og «+ Ny blokk»: i øverste seksjon overlapper de ikke lenger, på 100 % og på nedskalert lerret; verktøylinja parkerer under menyen ved scrolling i høye seksjoner
- [ ] ⠿-håndtaket: hele håndtaket (og resten av blokkverktøylinja) kan treffes også når blokken står nær seksjonstoppen; seksjonslinje-draget virker fortsatt når pekeren IKKE kommer fra en blokk
- [ ] Fest-ved-scroll-nålen: samme skjermstørrelse på alle zoomnivåer, og den blokkerer ikke lenger klikk i blokkens øvre venstre hjørne
- [ ] DOKK-DRAG: en blokk med «Til skjermen»-dokking dras med ⠿ eller flaten: den følger pekeren, og slippet dokker den til nærmeste av de ni ankerpunktene. Egenskaper-panelets dokkvalg viser det nye punktet, angre virker, og desktop-posisjonen (bytt til vanlig festing og se) er urørt
- [ ] Dokk-drag på en dokk-GRUPPE (flerutvalg festet som gruppe): hele gruppen følger med til det nye ankerpunktet
- [ ] MOBIL-DOKKING: en skjermdokket blokk vises dokket i mobilvisning og på publisert mobil; scroll-festing (vanlig modus) er fortsatt uvirksom på mobil. Nålen vises på mobil kun for skjermdokkede
- [ ] Forkast utkast: klyngen glir ut med rask fade mot høyre før plassen kollapser; med prefers-reduced-motion er det rent klipp. Publisering gir samme utgang
- [ ] MALBILDENE (Sider-panelet): Landingsside-kortet viser overskriftsspor i alle båndene, Kontakt/Arrangement viser trekkspillrader for faq, Portefølje viser TOMME bildefliser (stiplet), kort-flatene vises, innholdet står innrykket fra kanten, og fargene følger sidens tema (teal på demosiden, ikke lilla)
- [ ] Egne sidemaler (Mine maler) tegnes med samme forbedringer
- [ ] LOGO: nav-logoen har runen på grunnlinja i versalhøyde med tett beskåret flate (lik luft venstre/høyre); juster logostørrelsen i Nav-panelet om merket nå står for stort
- [ ] Admin-skinnen nederst: runen står på grunnlinja til «Urd»-ordet
- [ ] Favicon i nettleserfanen og footer-logoen: runen står i optisk senter av flaten
- [ ] Regresjon: smart guides, marquee, flerutvalg-dra og blokk-dra i vanlige seksjoner virker som før (stripene slipper kun klikk når en blokk er hovret/markert)

### Testrunde-batch (0.7.3): Synket mobilmodell per blokk (radnettet)

Mobilmodellen er lagt om ([ADR-0019](adr/0019-synced-mobile-model.md)): materialiseringen alt-eller-ingenting per seksjon er borte, mobil-overstyringer er per blokk, og mobil rendres i ett radnett for alle seksjoner. Punktene om materialisering i eldre batcher beskriver den gamle modellen.

- [ ] MOBILVISNING SER UT SOM FØR på de fire demosidene: én kolonne i leserekkefølge, tekst med naturlig høyde, former/pynt skjult. Ingen av demosidene har overstyringer, så dette er ren regresjonssjekk
- [ ] Ren visning i et smalt nettleservindu (under 640 px) viser det samme som editorens mobilvisning
- [ ] PINNING: dra en blokk i ⠿ i mobilvisning. KUN den blokken pinnes (nål-merke oppe til venstre); resten av seksjonen fortsetter å flyte rundt den. Slipp og se at blokken står der du slapp den
- [ ] Dra en blokk på tvers og se at flytende blokker aldri legger seg OPPÅ den pinnede: de hopper nedenfor båndet dens
- [ ] Resize i mobilvisning pinner også, og ny bredde/høyde står seg etter rerender (bytt seksjon og tilbake)
- [ ] SYNKEN: pin én blokk i en seksjon, bytt til desktop og flytt en ANNEN blokk. Tilbake i mobilvisning skal den andre blokken ha flyttet seg med (den følger desktop), mens den pinnede står
- [ ] Ny blokk lagt til på desktop i en seksjon med pinninger: den flyter inn i mobil-rekkefølgen sin (etter desktop-y), aldri utenfor 390 px-skjermen
- [ ] Tekstvekst: gjør en tekstblokk lengre og se i mobilvisning at raden vokser og at en pinnet blokk under flytter seg MED (radposisjonen er i komposisjonen, ikke frossen)
- [ ] TILSYNET: med en pinnet blokk i seksjonen, endre noe på desktop. Merket i topplinja teller opp; klikk på det skal bytte til mobilvisning OG rulle til seksjonen, som viser et kort med HVA som skjedde og NÅR (relativ tid)
- [ ] «✓ Gjennomgått» på kortet fjerner både kortet og telleren i topplinja
- [ ] En seksjon UTEN overstyringer skal aldri få tilsynsflagg uansett hva du gjør på desktop
- [ ] ↺ på en pinnet blokk (blokkverktøylinja) nuller KUN den blokken tilbake til flyt; ↺ i seksjonsverktøylinja krever to klikk («Sikker?», rød) og nuller hele seksjonen, men beholder skjult-på-mobil-valgene
- [ ] Angre (Ctrl+Z) etter pinning, etter per-blokk-↺ og etter seksjons-↺ gjenoppretter riktig
- [ ] SKJUL PÅ MOBIL: telefon-togglen på blokkverktøylinja (desktop) skjuler blokken på mobil, også om den er pinnet. Avkryssingen «Skjul på mobil» i Egenskaper/Plassering gjør det samme; «Dekor» er nå KUN entré-bølgen
- [ ] Skjulte blokker: seksjonens mobilverktøylinje viser «N skjult»-chipen; klikk åpner lista, og øye-knappen henter blokken tilbake
- [ ] REKKEFØLGE: pil opp/ned på en flytende blokk i mobilvisning flytter den i leserekkefølgen; håndbygde kort kan holdes samlet. Pinnede blokker har ikke piler
- [ ] Delete/Backspace i mobilvisning sletter INGENTING (verken enkeltblokk eller utvalg); i desktopvisning virker de som før
- [ ] Entré-animasjonen med stagger: dekor-blokker venter fortsatt ikke på tur i innholdsbølgen (decor-flagget virker som før)
- [ ] GAMMELT INNHOLD: en side laget FØR omleggingen med en håndjustert mobil-seksjon (mode manual) åpnes uten feil: blokkene står omtrent der de ble satt (±8 px loddrett), dekor-blokkene er skjult, og publisering skriver schemaVersion 2
- [ ] Publisert mobil er lik editorens mobilvisning på en deployet side
- [ ] Bytt admin-språk til engelsk og tyrkisk og sjekk tilsynskortet, chipen, pilene og de nye tooltipene

### Testrunde-batch (0.7.2): Breddegrepet, bundet innholdsbredde

Layouten er lagt om, så denne batchen er bredere enn vanlig. Det viktigste er de to første punktene: ser presetene riktige ut, og virker lerretet fortsatt som før.

- [ ] VISUELT, det eneste ingen test kan avgjøre: sett inn ALLE 24 seksjonspresetene på en tom side og se over hver enkelt ved 1440 px. Se særlig etter tekst som ligger for trangt, kort som er blitt smalere enn innholdet, og elementer som var ment å gå kant til kant
- [ ] De fem startpakkene (Ny side-galleriet) ser riktige ut; de komponerer de samme presetene, så feil her skal være arvet ovenfra
- [ ] De fire demosidene (Hjem, Om oss, Kaker, Kontakt) ser riktige ut i Ren visning på en bred skjerm: innholdet står i en sentrert kolonne, mens seksjonsbakgrunnene fortsatt går HELT ut til kantene
- [ ] Lerretet: dra en blokk, endre størrelse fra nedre høyre hjørne, flytt med piltaster (også med Shift), dra et flerutvalg, og dra i seksjonens topp- og bunnkant. Alt skal treffe der pekeren er, uten forskyvning mot venstre eller høyre
- [ ] Marquee (dra et utvalgsrektangel i tom seksjonsflate): rektangelet følger pekeren, og blokkene det dekker blir markert (ikke naboene ved siden av)
- [ ] Rutenettet (Vis grid) og de smarte hjelpelinjene ligger på innholdsflaten, ikke forskjøvet ut i margen; midtlinja treffer midten av innholdet
- [ ] Fest ved scrolling: en festet blokk beholder sin bredde og venstrekant i det den fester seg (skal IKKE hoppe mot venstre skjermkant). Test både vanlig festing, gruppefesting og «Til skjermen»-dokking
- [ ] Folden: lag en seksjon med minstehøyde `85vh` og en seksjon under. Seksjonen under skal IKKE være synlig før du scroller, og det skal stemme med hva en ekte nettleser viser ved 1637 px bredde
- [x] Sett `"maxWidth": "full"` på én seksjon i en sidefil (håndredigert) og se at kun den seksjonen går kant til kant
- [ ] Tekstblokker: åpne en side med mye tekst i en smal blokk og se at rammen vokser av seg selv ved rendring, ikke bare når du skriver. Rammen skal ALDRI krympe av seg selv
- [ ] Mobilvisning er uendret: auto-stabling ser ut som før
- [ ] Publiser og sjekk den deployede siden: samme utseende som i Ren visning, og `site.json` har fått `schemaVersion: 2` med `layout`-feltet

### Testrunde-batch (0.7.2.5): Topplinja folder seg, og bekreftelsen flyttet ut av knappen

Forkast-knappen vokser ikke når den væpnes, og andre klikk skjer på en egen pille.

- [ ] TOPPLINJA HOLDER ÉN HØYDE: dra admin-vinduet sakte fra bredt til smalt og se at linja aldri brytes til to rader. Merk at nettleserzoom teller: på 125 % er et 1920 px vindu 1536 px for foldingen
- [ ] Trinnene kommer i denne rekkefølgen når vinduet smalner: «Forkast utkast» mister teksten og blir sirkelen, ENHET/ZOOM/VIS forsvinner, «Ren visning» og «Se siden» blir rene ikoner og GitHub-brukeren viker, Vis-klyngen blir meny, Enhet-klyngen blir meny og «Upublisert» blir «!», Zoom-klyngen blir meny
- [ ] Ingenting overlapper på noen bredde. Sjekk særlig at «!» og forkast-sirkelen ikke legger seg oppå verktøyknappene, og at «Publiser» aldri havner utenfor vinduskanten
- [ ] En foldet klynge viser sin egen verdi på knappen: enhetsikonet for valgt enhet, zoom-prosenten som tall, og rutenett-ikonet markert når rutenett eller hjelpelinjer står på
- [ ] Menyene åpnes og lukkes med klikk utenfor og med Escape. Zoom-menyen skal bli stående åpen mens du klikker minus og pluss flere ganger
- [ ] Zoom-knappen endrer ikke bredde når tallet går fra to til tre sifre (20 % til 100 %), så naboknappene står stille
- [ ] Gjør vinduet bredt igjen og se at klyngene folder seg ut i motsatt rekkefølge, og at en åpen meny ikke blir hengende
- [ ] FORKAST, FØRSTE KLIKK: knappen skifter til fylt rød, men endrer IKKE bredde. En pille med «Sikker?» dukker opp rett under topplinja, sentrert under knappen, med frostet bakgrunn
- [ ] FORKAST, ANDRE KLIKK: ett klikk på «Sikker?»-pilla skal forkaste. Den skal ALDRI kreve to klikk
- [ ] «Sikker?»-pilla er dempet med rød kant og rød tekst i hvile, og blir tydelig fylt rød med hvit tekst når pekeren er over den
- [ ] Den runde forkast-knappen skal også skifte farge under pekeren, både i hvile og når den er væpnet
- [ ] Klikk et annet sted eller trykk Escape mens pilla er framme: den skal forsvinne uten å forkaste noe. Test begge
- [ ] Gjør vinduet så smalt det går og gjenta hele forkast-flyten: pilla skal fortsatt være synlig og klikkbar, og «Publiser» skal stå i ro; «Se siden» blir ikke tom når den folder til rent ikon
- [ ] Bytt admin-språk til engelsk og tyrkisk og sjekk menyradene i de tre foldede klyngene, samt at foldingen skjer tidsnok på tyrkisk (som har de lengste tekstene)

### Testrunde-batch (0.7.2.4): Opprydding i topplinja og sideskinnen

- [ ] Bytt admin-språk til engelsk og tyrkisk og sjekk alle seks nye etikettene

### Testrunde-batch (0.7.2.3): Rutenett, hjelpelinjer og størrelsen på redigeringshåndtakene

- [ ] Seksjonsgalleriet («+ Ny seksjon» klikket) er nå i admin-størrelse og ikke krympet med lerretet. Sjekk på 50 % og 150 %
- [ ] Drastrimlene i seksjonens topp- og bunnkant er like lette å treffe uansett zoom
- [ ] OMRISSET LIGGER PÅ RUTENE: slå på rutenettet, dra en blokk så den snapper, og se at den blå rammen rundt blokken følger rutelinjene. Den lå før 2 px utenfor og kunne derfor aldri treffe
- [ ] Rutenettets linjer er skarpe og synlige på alle zoomnivåer, ikke bleke og uskarpe. Selve rutestørrelsen skal fortsatt følge zoomen, altså bli mindre når du zoomer ut
- [ ] Hjelpelinjene er tydeligere enn før og synlige mot både lyse og mørke seksjoner
- [ ] Bytt admin-språk til engelsk og tyrkisk og sjekk hjelpeteksten på den nye rutenett-knappen
- [ ] «+ Ny blokk» og seksjonens verktøylinje overlapper ikke lenger i øvre høyre hjørne. Sjekk på 50 %, 74 % og 150 % zoom, siden det var avstanden som ikke skalerte med

### Testrunde-batch (0.7.2.2): Innholdsbredde-innstillingen og enhetsbryteren

Standarden ble korrigert fra 1200 til 1440 etter ny research, og sidemargen byttet fra piksler til prosent av vindusbredden. Letterboksen er fjernet igjen: siden skal vises slik den faktisk vises.

- [ ] Nettsted-panelet: Innholdsbredde har en levende prøve med tre striper (1920, 1536, 1366). Endre bredden og se at stripene og margtallene følger med med én gang
- [ ] Prøven forteller sannheten: ved 1440 skal 1920 og 1536 vise en tydelig stripe med marg, mens 1366 vises DEMPET (bredden binder ikke der). Ved 1600 skal 1536 bli dempet
- [ ] Hurtigvalgene Kompakt, Standard, Bred og Full markerer riktig knapp, og Standard er valgt fra start på et nytt nettsted
- [ ] Skyveknappen for bredde går 960 til 1920 i trinn på 20, og forsvinner når Full er valgt (den har ingen effekt der)
- [ ] Sidemargen vises som fire trinn (Ingen, Liten, Middels, Stor) med Middels valgt fra start; Ingen gir innhold helt ut til kanten på smale skjermer
- [ ] Under Avansert ligger det rå vw-tallet med skyveknapp 0 til 12. Hjelpeteksten forklarer hva vw betyr med konkrete tall
- [ ] Marg-kolonnen viser tall der bredden binder og bindestrek der den ikke gjør det
- [ ] MARGEN FØLGER SKJERMEN: gjør nettleservinduet smalere i Ren visning og se at luften i kantene krymper proporsjonalt, ikke står fast. Over cirka 1640 px skal margen derimot vokse, fordi det da er innholdsbredden som bestemmer
- [ ] INGEN BARER: lerretet fyller panelet i alle fire enheter og i Ren visning, uten striper på sidene. Sjekk særlig med sidemarg satt til Ingen, som var verst før
- [ ] HERO VOKSER IKKE PÅ HOVER: før vokste seksjonen med verktøylinjens høyde når pekeren traff den, og krympet igjen når den forlot. Beveg pekeren inn og ut av toppseksjonen på Hjem og se at ingenting flytter seg
- [ ] Under prøven står «Bredden slår inn fra N px vindusbredde». Sjekk at tallet endrer seg både når du endrer bredden og når du endrer margen (1440 med Middels skal gi 1637)
- [ ] HÅNDTAKENE HOLDER ADMIN-STØRRELSE: zoom inn og ut med minus og pluss, og se at «+ Ny seksjon», «+ Ny blokk», seksjonsverktøylinja, blokkens resize- og roterhåndtak, tekst-verktøylinja og flerutvalgs-linja beholder samme størrelse som knappene i admin-panelene. Sjekk på 30 %, 100 % og 300 %
- [ ] Håndtakene sitter der de skal ved alle zoomnivåer: resize-håndtaket i nedre høyre hjørne av blokken, roter-håndtaket i øvre høyre, «+ Ny blokk» øverst til høyre i seksjonen. De skal ikke drive vekk fra ankeret sitt når du zoomer
- [ ] Rutenettet, marquee-rektangelet og de smarte hjelpelinjene skal derimot IKKE holde konstant størrelse: de måler sidens egen geometri og skal følge zoomen som resten av siden
- [ ] «Se siden» og den publiserte siden skal derimot ha helt vanlig scrollbar: skjulingen gjelder KUN forhåndsvisningen
- [ ] INGEN PUMPING: åpne og lukk admin-panelene og dra vindusstørrelsen sakte fram og tilbake. Siden skal ikke veksle mellom to størrelser eller blafre; den skal skalere jevnt
- [ ] Zoom manuelt til 200 eller 300 % med pluss-knappen: DA skal du kunne dra lerretet sidelengs for å nå resten. Trykk Tilpass, og panoreringen skal forsvinne igjen
- [ ] Hjelpeteksten på hver av de fire enhetsknappene viser målene, og hver gir riktig lerretsstørrelse
- [ ] Nettbrett og Bærbar skal fortsatt være SKRIVEBORDSvisning i motoren: blokkene ligger absolutt plassert, Egenskaper viser plasseringsfeltene, og Fest ved scrolling kan settes. Kun Telefon skal gi mobilvisning
- [ ] Mobil-tilsyn-merket øverst hopper fortsatt til telefonvisning når du klikker det
- [ ] Zoom-kontrollen (Tilpass, minus, prosent, pluss) virker uendret i alle fire enheter
- [ ] Bytt språk i admin til engelsk og tyrkisk og sjekk de nye tekstene: Innholdsbredde, hurtigvalgene, Bredde, Sidemarg, Skjerm/Marg-etikettene under prøven, og hjelpeteksten på hver av de fire enhetsknappene

### Testrunde-batch (0.7.1): Oppryddingsrunden og sticky-utvidelsene

- [ ] Sticky: sett «Fest ved scrolling» på en blokk i en seksjon som er høyere enn blokken, og se i Ren visning at blokken fester seg SYNLIG under den klistrede menyen (før la den seg bak menyen); demoen er «Les mer»-knappen på Om oss
- [ ] Sticky med krympende meny (Nav-panelet, «Ved scrolling» = krymp): stopp scrollingen midt i krympingen og se at avstanden justerer seg når menyen er ferdig krympet, ikke først ved neste scroll
- [ ] Sticky med sidestilt meny og med «Ved scrolling» = skjul: avstanden er uendret i begge (kolonnen tar ikke plass i toppen; en utglidd meny beholder avstanden med vilje)
- [ ] Hjelpetekstene på Fest ved scrolling og avstanden nevner at seksjonen må være høyere enn blokken, og at menyhøyden legges til automatisk (nb, engelsk, tyrkisk, nynorsk)
- [ ] Bekreftelsesdialogen (f.eks. «Lagre som mal» eller «Slett mal»): Escape avbryter, klikk på det mørke bakteppet avbryter, og klikket treffer ikke knapper i panelet under; Enter i navnefeltet lagrer fortsatt; marker tekst i navnefeltet og slipp musa utenfor dialogen (skal IKKE lukke)
- [ ] Escape med både dialog og blokkmeny åpen lukker kun dialogen
- [ ] Angre-publisering og Oppdatering-panelets sjekk fungerer som før (CSRF-vernet er lagt om til Sec-Fetch-Site); test i minst to nettlesere, gjerne en personvern-orientert
- [ ] En feilet innlogging gir «GitHub avviste innloggingen», aldri en rå serverfeil
- [ ] Nav-logo, footer-logo, ikonblokk med eget bilde, bildelag og bildegalleri-lag viser bildene som før, både i editor og publisert
- [ ] Seksjon med glød-lag som ble laget før radius/plassering fantes: laget vises (var usynlig)
- [ ] Festing virker nå i vanlig redigeringsvisning: sett «Fest ved scrolling» på en blokk og scroll i editoren; blokken fester seg uten at du må bytte til Ren visning
- [ ] Blokker med festing har en nål i hjørnet i redigering, med hjelpetekst ved peker; nålen er borte i Ren visning og på publisert side
- [ ] Ta tak i en festet blokk: den faller tilbake til sin ekte plass mens du drar, og fester seg igjen når du slipper
- [ ] Flytt en festet blokk med piltastene, og med juster/fordel fra flerutvalgs-linja: blokken skal IKKE hoppe tilbake til den gamle plassen ved neste scroll
- [ ] Dra et flerutvalg med festede blokker fra håndtaket i flerutvalgs-linja: ingen hopp, og festingen tas opp igjen ved slipp
- [ ] Marker to eller flere blokker og trykk «Fest gruppen»: de festes samlet og beholder avstanden seg imellom i stedet for å legge seg oppå hverandre; demoen er intro-teksten og «Les mer» på Om oss
- [ ] Gruppen slipper samlet ved seksjonens slutt, og blokker som med vilje overlapper beholder rekkefølgen sin foran/bak mens gruppen er festet
- [ ] Trykk «Fest gruppen» igjen: festingen fjernes fra alle de valgte blokkene, og ett angre-steg gjenoppretter den
- [ ] Fest til skjermen: sett Festemåte til «Til skjermen» på en blokk, velg plassering og se at den står i det punktet hele siden gjennom; demoen er «Til toppen»-knappen på Om oss
- [ ] Ved «Til skjermen» vises Plassering i vinduet i stedet for Slipp taket; velger du «Midt i vinduet» skjules avstandsfeltet (det har ingen effekt der)
- [ ] Publisert side: både gruppefestingen og den skjermdokkede knappen oppfører seg som i Ren visning; mobilvisningen har ingen festing i det hele tatt
- [ ] Gjør en side med festede blokker mindre i vindusbredden: festede blokker og grupper følger seksjonsbredden, og dokkede blokker holder seg innenfor vinduet

### Testrunde-batch (0.6.6.4.6): Nye rollesett og stagger-finpussen

- [ ] Seksjonstema i Egenskaper er et prøve-rutenett med åtte kort tegnet i sidens egne temafarger; prøvene endres når temaet endres; valgt kort markeres og Standard nullstiller
- [ ] De fire nye rollesettene (Dus, Dempet, Dyp, Uthevede kort) ser riktige ut i både lys og mørk modus, med lesbar tekst og synlige kort; aksentknapper beholder originalfargen
- [ ] Stagger: korteffekten (ton inn/gli opp/zoom) kan velges og demo-spilles i previewen ved hver endring (effekt, trinn, mønster, forsinkelse)
- [ ] Mønstrene Kolonnevis/Radvis klynger kort som er nesten på linje; Fra midten bølger utover fra midtkortet; dekor-blokker står stille
- [ ] Blokkens Animasjon inn-nedtrekk tilbyr ikke Stagger (kun seksjonens)
- [ ] Publisert side: stagger spiller ved første entré, står stille ved prefers-reduced-motion

### Testrunde-batch (0.6.7.13): Nytt + Ny seksjon-galleri (G2 + F2)

- [ ] Galleriet åpnes med kategorifelt (Alle, Grunnleggende, Kort og lister, Fremheving, Plugins, Mine maler) og søkefeltet fokusert; nederste seksjonsgrense åpner fortsatt oppover
- [ ] Kategoriene: Alle viser gruppene med klistrede overskrifter; et kategorivalg viser kun sine kort uten overskrift; valget huskes til neste åpning i samme økt; Plugins-kategorien finnes kun med aktive plugin-presets/-maler
- [ ] Søket treffer på tvers av presets, plugin-presets og egne maler uansett valgt kategori; Enter setter inn første treff; Escape lukker; tomtreff-linjen vises
- [ ] Fargene: hver kategori har sin egen tone (prikk, overskrift, kortkant, aktivt valg, søketreffenes kort); bytt admin-tema og se at hele paletten følger med; grå-temaet gir dempede men skilbare toner
- [ ] Hint vises som tooltip ved pek på kortene; Mine maler har tomtilstand, kryss-sletting og re-id-innsetting som før
- [ ] Ingen chip-stil (stiplet ellipse/forskyvning) på noen knapp i galleriet
- [ ] Markøren langs venstre kant av valgt seksjon er borte; palett-innsetting havner fortsatt i sist klikkede seksjon, og Ren visning er uendret

### Testrunde-batch (0.6.7.12): Innebygde side-maler (startpakkene)

- [ ] «Ny side fra mal»-rutenettet viser Innebygde-gruppen (Tom side + fem startpakker med miniatyrer) også uten egne side-maler; Mine maler-gruppen kommer under når egne maler finnes (merk: rutenettet forsvinner ikke lenger når siste egne mal slettes, det var 0.6.7.10-atferden)
- [ ] Opprett en side fra hver startpakke: riktige seksjoner i riktig rekkefølge, redigerbar som vanlig, og Om oss inneholder tidslinje-blokken
- [ ] Tidslinje-presetet ligger i + Ny seksjon under Kort og lister
- [ ] Statistikk-presetet gir tre statistikk-blokker (tell-opp hos besøkende); «+ tall» legger til en fjerde
- [ ] To sider fra samme startpakke deler ingen id-er (rediger den ene, den andre står urørt)

### Testrunde-batch (0.6.7.11): Tidslinje-, sitat- og statistikk-blokkene

- [ ] De tre blokkene kan settes inn fra Blokker-panelet, panelsøket OG lerret-menyen (+ Ny blokk/dobbeltklikk/slash); FAQ står i hovedlisten i lerret-menyen, ikke under Plugin-blokker
- [ ] Tidslinjen: klikk-og-skriv på år/tittel/tekst; hendelser kan legges til/flyttes/fjernes i Egenskaper; variantene venstre/veksler og markørene fylt/ring; aksentfargen følger valgt farge
- [ ] Sitatet: variantene stor/kort; portrettvalg (og fjern-knapp) vises kun for kort-varianten; portrettet publiseres som media/-fil
- [ ] Statistikken: tell-opp hos besøkende (publisert side) ved første entré, med bevart tallform (mellomrom/desimal); står stille ved prefers-reduced-motion og i editoren; hjelpechipen forklarer
- [ ] Faq- og sitat-presetene i + Ny seksjon gir blokkene (ikke tekstbokser); eldre sider med den gamle faq-preset-formen rendres uendret
- [ ] Bytt oppsett behandler de nye blokkene som tekst (splitt-variantene legger dem i tekstkolonnen)
- [ ] Mobil: alle tre vokser naturlig i stablingen (ingen klipt tekst ved mer innhold enn desktophøyden)

### Testrunde-batch (0.6.7.10): Side-maler

- [ ] Kebab-menyen på en side-rad: «Lagre som mal» og «Slett siden» (forsiden mangler slett); lukkes ved klikk utenfor og Escape
- [ ] Lagre en side som mal (både den aktive og en annen side): navnedialog, statusmelding, og rutenettet «Ny side fra mal» dukker opp under + Opprett side
- [ ] Rutenettet: Tom side + malene med miniatyrer som ligner sidene; valgt kort huskes til neste opprettelse; kryss sletter malen (med bekreftelse)
- [ ] Opprett side fra mal: nytt navn/slug, alle seksjoner og blokker med, redigerbar som vanlig; å sette inn fra samme mal to ganger gir ingen id-kollisjoner (rediger den ene, den andre står urørt)
- [ ] Ctrl+Z etter mal-lagring og etter side-opprettelse ruller tilbake som ett steg per handling
- [ ] Publisering av en side-mal (mot urd-web): filen har kind page, bilder i sidens seksjoner materialiseres til media/

### Testrunde-batch (0.6.7.9): Bytt oppsett og Urd.maler-fundamentet

- [ ] Layout-knappen vises i seksjonsverktøylinjen kun for seksjoner med minst to bevegelige blokker (ikke for tomme/en-blokks seksjoner eller rene dekor-seksjoner)
- [ ] Stripen: klistret rett under verktøylinjen gjennom hele seksjonen, ligger over den flytende nav-en, viser riktige varianter (splitt/hero kun med tekst OG media) med miniatyrer som ligner seksjonen
- [ ] Bytte flytter blokkene uten å endre innhold/høyder; dekor og former står urørt; ETT Ctrl+Z ruller hele byttet tilbake; alt er redigerbart etterpå
- [ ] Bytte på en seksjon med en pinnet blokk på mobil flagger mobil-tilsynet
- [ ] Urd-innstillingene (tannhjulet): «Bytt oppsett-velgeren» bytter til galleri-meny-formen uten omlasting; menyen har tittel, lukkeknapp og samme kort; valget huskes per nettleser
- [ ] Velgeren lukkes ved valg, nytt knappeklikk, klikk utenfor og Escape (begge formene)

### Testrunde-batch (0.6.7.5): Blokkgruppe som gjenbrukbar

- [ ] Publisering av en blokkgruppe-mal (mot urd-web): filen har kind blocks, bilder i gruppen materialiseres til media/

### Testrunde-batch (0.6.7.4): Publisering av maler (mot urd-web)

- [ ] Lagre en mal og publiser: commiten inneholder content/maler/<id>.json og oppdatert content/maler.json; «Upubliserte endringer»-merket forsvinner, og malen består i Mine maler etter reload
- [ ] En mal med opplastet bilde publiseres med bildet som media/-fil (ingen base64 i malfilen); miniatyren i Mine maler virker etter reload fra publisert fil
- [ ] Slett en publisert mal og publiser: filen slettes fra repoet, indeksen krymper; en ny mal med samme navn i samme publisering overlever (create-vernet)
- [ ] Ctrl+Z rett etter publisering ruller mal-endringen tilbake som utkast mot NY publisert baseline (angre gjenskaper det publiserte innholdet, ikke gammel tilstand)

### Testrunde-batch (0.6.7.1): Middels-reviewrunden

- [ ] Mobilvisning: en side med faq/galleri/samling/kalender/skjema/kart med MER innhold enn desktophøyden viser alt uten at innholdet flyter over blokken under (naturlig høyde i stabling)

### Testrunde-batch (0.6.6.6.4): Sider/Samlinger/Plugins-prosa og undermeny-fiksene

- [ ] Panel-titlene Sider, Samlinger og Plugins viser intro-forklaringen som tooltip ved hover på tittelen; ingen prosaavsnitt øverst i de tre panelene
- [ ] Opprett side-knappen forklarer auto-meny-adferden i tooltip; «Funnet i repoets plugins/-mappe:» står som fet etikett over funn-listen
- [ ] Plugins-panelets tomtilstander og varsler er uendret (ingen plugins, ingen nye funnet, ødelagt plugin, motorkrav, CSP)
- [ ] Undermenyen følger barens tone når nav-en har lag-bakgrunn (fargelag flates til slør); med kun bilde-/gradientlag gjelder standard-sløret som før
- [ ] Nedtrekket har ingen lys glorie i mørkt tema (kort, piller, utfall og mobilpanel); i lyst tema ser skyggene ut som før
- [ ] Innstillinger-panelet ser uendret ut (kun revidert)

### Testrunde-batch (0.6.6.6.3): Nav/Footer-prosa og uskarphet-fiksen

- [ ] Nav-panelet: tooltips på Logo-gruppens summary (Hjem-knapp-forklaringen) og Meny-punkter-summaryen (undermeny-forklaringen); ingen prosaavsnitt igjen i panelet, og tallfeltene for logobilde (høyde/avrunding) forklarer seg selv via egne tooltips
- [ ] Footer-panelet ser og virker uendret ut (ingen endringer gjort)
- [ ] Uskarphet bak menyen virker igjen i alle nav-varianter (bar, flytende, flytende firkant/tab, sidestilt) og i undermeny/mobilpanel; av/på-bryteren i Nav-panelet har umiddelbar effekt begge veier
- [ ] Etter neste oppdatering av urd-web: uskarpheten virker også der (fiksen ligger i base.css + urd.js, begge i motor-atomgruppen)

### Testrunde-batch (0.6.9.x): splitt, oppdaterer og fase-slipp (samlet og slått sammen 5. august 2026)

**README-ene, docs-strukturen og designrunden (0.6.9.10)**

- [ ] Etter neste synk: malrepo-forsiden viser engelsk README med logo, flagg-linje og hurtiglenker; bokmål/tyrkisk i readme/-mappen leses godt med virkende lenker
- [ ] Rot-READMEens badges er levende på GitHub (Tester grønn, release-versjonen vises) på alle fem språk
- [ ] Guidenes innholdsfortegnelse: klikk gjennom ankrene på GitHub i alle fem språk; særlig de tyrkiske «İçeriği düzenleme» og «İlk kez» (İ-slugging med U+0307)
- [ ] Ny side med slug «readme» avvises i editoren med reservert-navn-meldingen (ikke server-feil ved publisering)
- [ ] Oppsettsguidene har Forutsetninger øverst i alle fem språk, og gamle stier (docs/OPPSETT-PUBLISERING.md, docs/BRUKERVEILEDNING.md) er borte uten døde lenker i repoet

- [ ] Lokalt (dev-server.py): alle sider laster uten 404 i konsoll/nettverksfane (motoren fra /assets/engine/0.6.10/), språkpakken virker i preview via /assets/urd/-skallene, admin-språkbytte virker (ordbøkene kjøretids-lastes via skallene), og Oppdatering-panelet degraderer pent til utilgjengelig-melding uten functions
- [ ] Pre-v1-innbakingen: eksempelsidene rendrer identisk som før (gradienter, bilde-bakgrunner med parallaks, kalender-blokken på Hjem) uten plassholder-advarsler i konsollen, og gradient-editoren redigerer farger/andeler/animasjon og publiserer rent
- [ ] Nytt innhold: opprett en side og sett inn en ny kalender-blokk fra velgeren; begge virker og publiseres
- [ ] Release-flyten: tagg `v0.6.9` og publiser GitHub-releasen; Action-en kjører grønt (check-release i full modus, tester, synk) og seeder urd-template med ÉN commit «Urd v0.6.9» pluss taggen. En rc-dispatch med prerelease-flagget seeder tilsvarende for oppdaterer-testing, omkjøring er ufarlig (uendret innhold/eksisterende tagg flyttes aldri), og en dispatch mot tagg som ikke matcher urd.json.engine stoppes i versjonskonsistens-steget før noe pushes
- [ ] Deployen av 0.6.9 på urdweb: siden virker som før; undersidene har render-blokkerende tema og blinkefritt lys/mørk-valg ved direkte innlasting; svar-headerne viser `immutable` på en motorfil og på base.css, men IKKE på /assets/urd/i18n.js; en publisering skriver slug-kopier med de versjonerte stiene (vis kildekode på en underside); og Oppdatering-panelet melder «kjører nyeste» mot malrepoet
- [ ] Klon-flyten: følg OPPSETT-PUBLISERING fra «0. Lag nettsidens repo» til deployet side mot en ekte klon, uten monorepo-kunnskap; hvert steg stemmer med det GitHub/Cloudflare faktisk viser
- [ ] Oppsettsveiviseren på fersk klon: vises i admin utløst av setup-signalet alene; fullføring + publisering fjerner `setup`-feltet fra site.json og veiviseren vises aldri igjen; avvisning (lukk uten å fullføre) holder den borte i samme nettleser mens feltet består i repoet til noen fullfører
- [ ] `_headers`-avvik: instruksen med oppstrøms tekst vises i markerbar blokk (i både sjekk-svaret og panelet), filen står ALDRI i endringslisten og er urørt i repoet etter oppdateringen
- [ ] Selve oppdateringen (rc til rc i testklonen): bekreftelsesdialogen viser målversjon, antall og overskrivings-varsel for håndredigerte motorfiler; utføringen gir ÉN commit (ny motormappe inn, gammel ut, slug-kopier byte-like ny rot-index.html, urd.json-engine bumpet); deploy-pollingen laster admin på nytt av seg selv når /urd.json melder ny versjon, upubliserte utkast består, og publisering i deploy-vinduet sperres i samme fane
- [ ] Feilveiene: utdatert expect (push noe annet først) gir updateRace uten at noe skrives; klon uten baseline-tagg får updateNoBaseline oversatt på admin-språket; utilgjengelig malrepo gir oversatt feil med fungerende «Prøv igjen»; og uten publiseringstilgang (utenfor ALLOWED_LOGINS) er Oppdater-knappen deaktivert med forklarende tooltip

### Testrunde-batch (0.6.0.10): API-feil på admin-språket, motor-stempel og CSS-rydding

- [ ] API-feil oversettes: sett admin-språket til English (UK), logg ut i en annen fane og prøv å publisere - feilmeldingen kommer på engelsk (kode-oppslag), ikke som norsk backend-tekst
- [ ] Utløpt innlogging: med utløpt/ugyldig token gir publisering «sign in again»-varianten (koden `loginExpired`), ikke den generiske «must sign in»-meldingen med rå årsak
- [ ] Kart-søket i preview: søk på tøys (under 3 tegn og et sted som ikke finnes) med admin på et annet språk - «skriv en adresse»- og «fant ikke stedet»-meldingene følger admin-språket
- [ ] Kalender-feed-feil: pek en kalenderkilde på en ikke-godkjent vert - feilen i blokken viser vertsnavnet interpolert, på admin-språket

### Testrunde-batch (0.6.8.10): språkpakke-plugins

- [ ] Aktivering: åpne Plugins-panelet - «Svensk språkpakke» står der (deaktivert), viser «Språkpakke: Svenska» og ingen versjonsadvarsel. Slå den på og publiser
- [ ] Besøkende-språket: Nettsted > Språk viser nå Svenska alfabetisk mellom Norsk nynorsk og Türkçe. Velg det, og se i forhåndsvisningen at meny, «Till toppen», lysboks, galleri og nyhetsbrev-skjemaet er svenske MENS admin fortsatt er på ditt eget språk
- [ ] Publisert side: last den ekte siden med site.lang = sv - samme svenske chrome, og `<html lang="sv">` i kilden. Datobadger og kalender-månedsnavn er svenske via Intl (ikke oversatt i pakken)
- [ ] Deaktivering: slå pakken av igjen mens site.lang fortsatt er sv - siden faller til bokmål uten å kræsje, og velgeren beholder «sv» som eget alternativ så verdien ikke går tapt
- [ ] Utkast vs. publisert: slå pakken på UTEN å publisere - språket skal være valgbart i Nettsted-panelet og virke i forhåndsvisningen (utkastlista), men admin-språkvelgeren venter til det er publisert
- [ ] Lag din egen: følg «Språkpakker»-avsnittet i template/plugins/README.md og lag en pakke for et språk med admin-dekning (kopier locales/admin/nb.js, oversett noen nøkler) - de uoversatte nøklene skal vises på bokmål, ikke som nøkkelnavn
- [ ] Ingen ekstra last for innebygde språk: med site.lang = nb/en-GB skal nettverksfanen ikke vise language-packs.js i det hele tatt

### Testrunde-batch (0.6.8.9): dokumentasjonen på fem språk

- [ ] GitHub-visningen: åpne repoet på github.com - READMEen vises på engelsk med logo, språklinje og uttale-avsnittet; klikk gjennom alle fire språklenker og tilbake igjen (GitHub gjengir relative lenker riktig)
- [ ] Lenkelinjene: fra hvert dokument, klikk hvert språk - ingen 404, og gjeldende språk er uthevet uten lenke. Sjekk også de to-språks-linjene (utvikling, veikart, visjon)
- [ ] Brukerveiledningen mot ekte admin: sett admin til English (UK) og følg den engelske veiledningen - knappe- og panelnavnene i teksten skal matche det som faktisk står på skjermen. Gjenta stikkprøve på tyrkisk
- [ ] Oppsettsguiden: følg den engelske utgaven mot et ekte Cloudflare/GitHub-oppsett - menyvalgene står på engelsk (som i dashbordet), og feilsøkingstabellens symptomer matcher Urds faktiske meldinger
- [ ] Uttale-avsnittet: leser det naturlig for en engelsktalende, og stemmer *weird*-etymologien? (Samme på tyrkisk)
- [ ] Samisk gjennomgang: be gjerne en med nordsamisk som morsmål se over README-se.md, GUIDE-se.md og SETUP-se.md (alle er merket som maskinutkast)
- [ ] CONTRIBUTING: følg «Bidra med språk»-oppskriften som om du var en ny bidragsyter - er stegene nok til å legge inn en rettelse og verifisere den med paritetstesten?

### Testrunde-batch (0.6.8.8): plugin-locales (skjema, kart)

- [ ] Besøkende-språket: sett site.lang til en-GB og se på en side med skjema og kart - skjemaets valideringsmeldinger og «Send» og kartets «View larger map» følger språket
- [ ] Språkbytte i preview: bytt Nettsted > Språk - skjema- og karttekstene hos besøkende i previewen bytter MED, ingen norske rester; hjelpechipene følger ADMIN-språket
- [ ] Skjema-seed: sett inn Kontaktskjema-preset med admin på engelsk - feltene heter Name/Email/Message (seed); publisert skjema validerer og sender som før
- [ ] Gamle manifester: en plugin UTEN locales/names-feltene lastes som før (bakoverkompatibelt)

### Testrunde-batch (0.6.8.7): seed-innhold på admin-språket

- [ ] Engelsk seed: med admin på English (UK), sett inn en Hero-, kort- og team-preset pluss tekst/knapp/FAQ-blokker - alt innsatt INNHOLD (overskrifter, brødtekst, «Read more»-knappen, FAQ-spørsmålene) er engelsk, og preset-galleriets etiketter/grupper/hint følger språket
- [ ] Footer-maler: velg «Newsletter»- og «Big CTA»-malen på engelsk - kolonnetitler, taglines, «Privacy», CTA-feltene og «Made with Urd» settes inn på engelsk
- [ ] Innsatt innhold FRYSES: bytt admin-språk etter innsetting - det alt innsatte innholdet beholder språket sitt (det er brukerdata nå), kun chromen bytter
- [ ] Norsk uendret: på bokmål settes alt inn ordrett som før
- [ ] Publisert side: seedene vises hos besøkende nøyaktig som de ble satt inn (ingen nøkler, ingen oversettelse ved rendering)
- [ ] Gruppering intakt: preset-galleriet har samme grupper og rekkefølge som før, plugin-presets samlet sist

### Testrunde-batch (0.6.8.6): canvas-chromen (verktøylinjer, hjelpekort, bildeeditor)

- [ ] Engelsk canvas-runde: med admin på English (UK), åpne preview-chromen - blokkpaletten (+ Ny blokk), preset-galleriet (+ Ny seksjon), tekst-verktøylinjens titler (pek på knappene; B/I-bokstavene), seksjonshøyde-håndtakene, multimarkeringslinjen («2 selected»), blokk-verktøylinjen og dobbeltklikk-menyen skal være engelske
- [ ] Hjelpechipene: åpne «?» på FAQ-, galleri- og samlingsblokken - kortets tittel («Slik virker …»-mønsteret) og innholdslinjene følger admin-språket; ved FØRSTE sidelast skal chipene aldri vise rå nøkler (adminLocaleReady-vinduet)
- [ ] Bildeeditoren: alle etiketter og segmentvalg følger språket; «Bytt bilde»/«Velg bilde»-ternæren riktig
- [ ] Delte kart: font-navnene, seksjonstema-valgene (Flate/Aksent/Invers), ikon-/tegnkategoriene i velgerne, bakgrunnslag-typene og animasjonsvalgene følger admin-språket i BÅDE panelene og canvas-menyene
- [ ] Besøkende upåvirket: hos besøkende (og i Ren visning uten chrome) finnes ingen spor av admin-språket; footer-sosiallenkenes aria-labels er fortsatt merkenavn 
- [ ] Norsk uendret: hele canvas-chromen ordrett som før på bokmål

### Testrunde-batch (0.6.8.5): admin-strenger B (tooltips, placeholders, panel-tekster)

- [ ] Full engelsk-runde: bytt admin-språk til English (UK) og gå gjennom ALLE paneler - gruppetitler, knapper, hint-avsnitt, placeholders og tooltips (hold pekeren over «?»-felter og knapper) skal være engelske; norsk skal ikke skinne gjennom noe sted i chromen
- [ ] Norsk uendret: med bokmål skal hele admin se ordrett ut som før
- [ ] Fargevelgeren: «koblet til temafargen»-tittelen (pek på en swatch koblet til token) interpolerer riktig på valgt språk; Fjern fargen-knappen likeså
- [ ] Bildeeditoren og tegnvelgeren: etiketter (Zoom/Lysstyrke/Kontrast/Metning, Nullstill/Bruk) følger språket
- [ ] Fet/kursiv-knappene i logo-innstillingene viser B/I på engelsk, K/I på tyrkisk, F/K på norsk

### Testrunde-batch (0.6.8.4): admin-strenger A (meldinger, dialoger, nedtrekk)

- [ ] Bytt admin-språk til English (UK): statuslinja (Angret/Undone, Publiserer…/Publishing…), publiseringsdialogene (konflikt/angre), alle nedtrekksvalg (nav-varianter, hover-stiler, galleri-visninger, footer-maler, temaforslag) og Egenskapers «Text block»-overskrift følger språket
- [ ] Norsk uendret: med bokmål skal alt se ordrett ut som før (nb-basen speiler de gamle tekstene)
- [ ] Parameteriserte meldinger: last opp et stort bilde ({kb}-melding) og en bunke der noen feiler ({n}-meldinger) - tallene settes inn riktig på alle språk
- [ ] Angre-dialogen: commit-meldingen («…») vises fortsatt ordrett i dialogen (brukerdata oversettes aldri)
- [ ] Stikkprøve nynorsk/samisk/tyrkisk: panelnavn + noen nedtrekk; samisk er maskinutkast (innholdsfeil meldes som funn, ikke stryk)

### Testrunde-batch (0.6.8.2-3): panel-refaktoren og språkvelgerne

- [ ] Auto-språk: uten lagret valg skal admin følge nettleser-/OS-språket (norsk maskin = bokmål; sett nettleseren til et ustøttet språk, f.eks. tysk = engelsk)
- [ ] Språkvelgeren under tannhjulet: velg hvert av språkene - admin laster på nytt på det språket; «Automatisk» går tilbake til enhetsspråket; valget overlever ny fane/omstart i samme nettleser
- [ ] Nettsted > Språk på nettsiden: bytt til f.eks. English (UK) - previewen bytter besøkende-chrome UMIDDELBART (footer-knapper, til-toppen) uten omlasting; «Upubliserte endringer» vises; publiser og sjekk at den publiserte siden følger valget
- [ ] Håndredigert lang-verdi utenfor lista (f.eks. «de» i site.json): panelet viser den som eget alternativ øverst og ødelegger ingenting
- [ ] Historikk-datoene formateres etter admin-språket

### Testrunde-batch (0.6.0.6): gradient pan/orbit på kompositoren (transform-løpere)

- [ ] Pan (lineær gradient, «Panorer»): sett animasjonen på et gradientlag - glidningen skal se identisk ut som før (diagonal drift frem og tilbake over 18 s), uten hakking, og gradienten skal fylle seksjonen uten synlige kanter eller hvite striper i noen vindusstørrelse
- [ ] Orbit (radiell gradient, «Bane»): sentrum skal stå der det er satt (Sentrum X/Y) og banen svinge rundt det som før (26 s); prøv også et sentrum utenfor midten (f.eks. X 70 %, Y 20 %)
- [ ] Redusert bevegelse: pan viser stille utsnitt som før; orbit skal nå vise det KORREKTE forankrede sentrumet (før viste den feil hjørne av lerretet)
- [ ] Pulse/Rotate/Panorer én vei: uendret adferd (kun pan/orbit er bygget om)
- [ ] I editor-preview: gradientlag med pan/orbit redigeres og forhåndsvises som før (bytt animasjon frem og tilbake, ingen etterlatte løpere eller doble lag)

### Testrunde-batch (0.6.0.5): View Transitions mellom sider, native scrollås og myk ankerscroll

- [ ] Redusert bevegelse: ankerlenker og «Til toppen» hopper direkte
- [ ] Preview i admin: sidebytter i editoren skal være som før (ingen overgang, ingen visuelle artefakter fra view-transition-navnene)
- [ ] Scrollås: åpne lysboksen (bilde/galleri) - bakgrunnen kan ikke scrolles; lukk (Esc, kryss, bakgrunnsklikk) - scrollen er fri igjen med bevart posisjon. Prøv også re-åpning rett etter lukking
- [ ] Myk ankerscroll: en blokk-lenke til `#anker` og «Til toppen»-pilen ruller mykt hos besøkende
- [ ] Seksjonsdrag i admin: dra en seksjons topphåndtak (høyde ovenfra) - innholdet under skal stå visuelt stille som før, ingen myk/drivende scroll-kompensasjon

### Testrunde-batch (0.6.35): Høy-fiksene fra kodegjennomgangen (browser-røyk; maskinen manglet headless Chromium)

- [ ] Blokk-lenker: sett en `javascript:alert(1)`-href på knapp, bilde, samlingsinnslag og galleri-bilde (håndredigert utkast/JSON) - hos besøkende skal knappen være død ('#'), bildet uten lenke-innpakning, samlingstittelen uten lenke og galleri-flisen uten lenke (lightbox tar over der den er på); trygge https-/mailto-lenker OG interne stier/anker (`/om-oss`, `#kontakt`) virker som før
- [ ] Angre samlinger: rediger et innslag (både i panelet og klikk-og-skriv i preview) - Ctrl+Z angrer selve samlingsendringen, aldri en urelatert side-/site-endring; slett en samling og Ctrl+Z bringer den tilbake med innholdet; opprett en samling og Ctrl+Z fjerner den igjen
- [ ] Angre plugins: skru en plugin av/på og Ctrl+Z - previewen laster på nytt med forrige liste; vanlig angring av sideinnhold skal ALDRI utløse preview-reload
- [ ] Kvotevarsel: fyll utkastet med store bilder til localStorage sprenges (eller senk kvoten midlertidig i devtools) - rød feilmelding i statuslinja i stedet for stille tap; publisering frigjør plassen

### Testrunde-batch (0.6.6.5.2): footer-overhaling, delt bakgrunnslag for nav, Urd-logo

Footer-overhalingen (26. juli). Bygg footeren i admin (Footer-panelet) og sjekk på siden:
- [ ] Handlingsoppfordring (CTA): knapp-varianten lenker til side/URL/mailto og virker uten server; nyhetsbrev-varianten validerer e-post og viser inline bekreftelse (mot et ekte endepunkt) eller åpner mailto som fallback uten endepunkt; en stor sentrert CTA-variant finnes. NB: nyhetsbrev mot ekstern vert krever `connect-src` i `_headers`

### Testrunde-batch (0.6.14): kart-forbedringer

- [ ] Kartet vises nå ut av boksen på den publiserte siden (OSM er lagt i Urds _headers frame-src); ingen manuell CSP-jobb lenger. Bekreft at kartet faktisk viser etter publisering + deploy
- [ ] CSP-vokter-fiks: hvis kartet likevel blokkeres (annen host) får besøkende en «Åpne kartet på OpenStreetMap»-lenke i stedet for et brukket bilde; editoren får instruksen. (Rettet også en variabel-skygging fra 0.6.12 som ville kastet feil her)