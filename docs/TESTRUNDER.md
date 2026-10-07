# Testrunder (sjekkliste for manuell testing)

Nytt som er levert og venter på manuell testing i produksjon/lokalt. **Punkter strykes kun av den som tester**; assistenten legger til nye punkter når noe leveres, men fjerner aldri noe her. Nye leveranser får en egen «Testrunde-batch»-seksjon øverst (nyeste først); punkter uten batch ligger i restlisten nederst. [BACKLOG.md](BACKLOG.md) eier oppgavene; denne listen eier testingen av det som alt er levert. Om noe er fjernet betyr det at det er sjekket og løst, oppført som en kjent bug, eller erstattet av en senere endring (gjennomgått og samlet 6. oktober 2026: kalenderbatchene er slått sammen til én med ett punkt per design).

### Test batch (0.7.0.43): the test site and local server always load the newest engine

- [ ] After this push, empty the cache once in each browser that has visited the test site (urdweb) before: the old engine files were stored for a year and are not asked for again until then
- [ ] Then a change to an engine file pushed to the test site: a plain reload shows it, the page is never blank, and the admin preview runs the new engine without a hard reload
- [ ] The browser's Network tab on the test site: the engine files show `Cache-Control: no-cache` and answer 304 on a reload; `base.css` and the pictures under `/media/` still show `immutable`
- [ ] A missing engine file on the test site (for example `/assets/engine/0.0.0/x.js`): a 404 without the year-long rule, as it answers locally in Wrangler
- [ ] The older item on the deployment of 0.6.9 to urdweb expects `immutable` on an engine file: from this push that holds for released sites (urd-web) only, and the test site shows `no-cache`
- [ ] At the next release: the template repo's `_headers` is unchanged (git blob `a20e6b5…`), a published site's Updates panel shows no `_headers` note, and an engine file on the published site still shows `immutable`

### Test batch (0.7.19.18): all calendar texts follow the site language and can be edited

**The words in the site's language**

- [ ] The site language set to English, every calendar design picked one after the other with sample data: not one Norwegian word without an edit, in the design itself, the switcher's week and month, «Show all» and «Earlier», the printed list and the event card; the sample events are in English too
- [ ] The site language set to Turkish: dates in Turkish order on the cards and in the month heads, the Year wheel's months in capitals with a dotted İ, Dark glass's share written «%45», and with the 12-hour clock the hours as «ÖÖ»/«ÖS»
- [ ] Billboard and Countdown ring with an event one day away: «1 DAY» and «Tomorrow», not «1 days»; an event tomorrow at 01:00 says «Tomorrow», not «Today!»
- [ ] Day plan, Heat map and Month with side panel on a day that is not today: the count of that day, not «N today»; an empty day and an empty month say so in their own words, not «No upcoming events»

**Rewriting and removing words**

- [ ] A text with a number rewritten in the preview (the count in Numbered programme, «In N days»): the number stays and the new words stand after a reload; bold across the words and the number, and a Backspace right after the number, leave the number in place
- [ ] The Regular event's label, «For whom» and the announcement's label emptied in the preview: a faint hint in the editor, nothing in the Clean view, on the published page and on the phone, and the design closes up with no empty box (the Regular event falls to one column without its aside)
- [ ] «Reset the texts» after rewriting and removing words: every word back to the default, the announcement's own heading and text kept
- [ ] A page saved before this version with emptied calendar words: the default words show, no empty lines

**The announcement**

- [ ] The calendar's menu, Content → Announcement: «Heading» and «Text» fill the note in the preview at once, a line break in the text stays, and `<` is written as it is; in the alert band only «Heading» is shown
- [ ] An announcement without words: hints in the editor in the admin language, nothing on the published page
- [ ] Coming up on cream with the announcement as an alert band with an address: pressing its words in the editor puts the caret there and the preview stays on the page; in the Clean view the band follows its link
- [ ] A long announcement text in Noticeboard, Coming up on cream and Regular event: four lines (six in the Regular event) ending in «…» and «Read it all» under them; a short text has no «Read it all»
- [ ] On the published page and in the Clean view: a click on the announcement or «Read it all» opens a card with the label, the heading, the whole text and «Read more» when it has an address, in the note's colours and the heading's font; Tab to the announcement and Enter opens it too, and Escape closes it with the focus back on the announcement
- [ ] In the editor: the first click selects the calendar, a click on the cut text opens the card, the whole text is written there and the note follows at once; «Read it all» is rewritten by clicking it; writing in the text on the note shows all of it while you write
- [ ] The cut and the card in Firefox and in a WebKit browser (GNOME Web or Safari): the same four lines, «…» and «Read it all»

**The event card in the editor**

- [ ] The first press on an event selects the calendar, the next opens its card; «When», «Where» and «Add to calendar» in the card are rewritten by clicking them, and the card stays open while you write; Escape or a press outside closes it
- [ ] The selected calendar cannot be dragged by its events; it drags by the move handle, or by an event before it is selected

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

