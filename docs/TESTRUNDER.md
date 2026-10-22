# Testrunder (sjekkliste for manuell testing)

Nytt som er levert og venter på manuell testing i produksjon/lokalt. **Punkter strykes kun av den som tester**; assistenten legger til nye punkter når noe leveres, men fjerner aldri noe her. Nye leveranser får en egen «Testrunde-batch»-seksjon øverst (nyeste først); punkter uten batch ligger i restlisten nederst. [BACKLOG.md](BACKLOG.md) eier oppgavene; denne listen eier testingen av det som alt er levert. Om noe er fjernet betyr det at det er sjekket og løst, oppført som en kjent bug, eller erstattet av en senere endring (gjennomgått og samlet 6. oktober 2026: kalenderbatchene er slått sammen til én med ett punkt per design).

### Test batch (0.7.0.61): the section's Properties in groups

- [ ] Select a section's surface and open Properties: six closed groups, Height and grid, Section theme, Link target, Background, Edge shapes and Motion, each with its value beside it (such as «Glow · Grain · Image», «None» or «#priser»); a group left open is open again after a reload
- [ ] Each group's settings work as before: the minimum height and the own grid, the theme cards, «Link name» with its suggestion and the copy button, the edge shapes with their own settings shown only once an edge has a shape, the entrance with its duration, delay and the stagger settings, and the effect on pointer
- [ ] A changed setting shows in its closed group at once: a top edge «Wave» gives «Wave» beside Edge shapes, an entrance gives its name beside Motion, and an own grid adds «Grid 24 px» beside Height and grid
- [ ] Background in Properties, Nav and Footer: each layer shows only its row with the type, the arrows and the cross; its arrow opens and closes its settings; «+ Add layer» adds a layer that arrives open; a layer moved up or down stays open or closed, and removing a layer leaves the others as they were
- [ ] «Link name» on a section without a name offers «Name it «…»» as a small underlined link under the field; pressing it stores the name
- [ ] A block's menu, Placement, Motion: «Animation in» and «On pointer» stand above their dropdowns

### Test batch (0.7.27.4-6): one link editor for every link

- [ ] A button's «Goes to», and its tile in the quick row, open the link window; «Goes to» offers Page, Web address, Email and Phone; searching «kak» shows Kaker, and choosing Kaker lists «A spot on the page»: the top, «Section 1 · …», «Section 2 · Video #video» and the named block; «Use this link» stores it, and the field shows «Kaker › #video»
- [ ] The published button goes to Kaker at the video section, also after Kaker's address is changed in the Pages panel
- [ ] Image: a Phone link (+47 900 00 000) makes the picture call; with a link the «Full screen on click (lightbox)» switch is hidden; a gallery picture gets an Email link with a subject
- [ ] Cart block and the menu's cart: the window shows pages only; the drawer's «Go to checkout» goes there
- [ ] Calendar announcement, Links block, Site panel's links: the same window; a Links block's or a site link's page link is kept as the page's address
- [ ] Nav panel: a menu item, a submenu item, a launcher shortcut and the announcement bar each open the window; an item with a submenu can have no link («No link (only opens the submenu)») and opens its submenu, an item without one offers no «Remove the link»
- [ ] Footer panel: the column links, the bottom line, the link row and the call to action open the window; «Kakevideoen» (typed `/kaker#sec-…`) shows «Kaker › #video» and opens with Kaker and the video section chosen
- [ ] Collections panel: an entry's link opens the window; the published entry title goes there; «Export CSV» writes a page link as the page's address
- [ ] «Open in a new tab» opens the published link in a new tab; «Ask search engines not to follow it» and «Paid or sponsored link» show only for a web address and put rel="nofollow" / rel="sponsored" on it
- [ ] A web address typed as `www.example.org` is stored as `https://www.example.org`; `javascript:…` is refused (the «Use this link» button stays off)
- [ ] Text: select words and press the toolbar's link button or Ctrl+K; the window opens over the editor; choosing «Om oss» makes the words a link that works on the published page and still after Om oss changes address; Ctrl+K on a link edits it; Ctrl+Shift+K takes it away
- [ ] Text: selected `post@apeiron.no` opens on Email with the address filled in, and a selected phone number on Phone
- [ ] Escape, the cross and a click beside the window close it without a change; Enter in a field uses the link
- [ ] A section template with a button linking to its own heading, inserted twice, links each copy to its own heading

### Test batch (0.7.27.1-3): named spots on a page, the jump under the menu, and one link shape

- [ ] Published, a new tab: `/kaker#video`, `/kaker#sec-4c908354`, `/kaker#meld-deg-inn` and `/kaker#blk-b35fc0b9` each land with the spot's top right under the menu once the page has loaded, and the address shows `#video` or `#meld-deg-inn`
- [ ] Menu «Hide, show on scroll up»: the menu stays in view during a jump with the spot under it, and hides again on a scroll down afterwards; «Shrink the menu»: the spot lands right under the shrunk menu
- [ ] A menu that does not stick: the spot lands at the window's top; the side column: at the top, or under a strip fixed across the page
- [ ] With reduced motion in the system settings an in-page link jumps without animation; without it the page scrolls smoothly
- [ ] Phone: the dropdown menu, the full-screen menu and the launcher close when a link on them goes to a spot on the page
- [ ] The back button after a jump returns to where you were; a reload keeps the place you were at; scrolling while a calendar or collection above the spot loads is never undone
- [ ] Editor: a menu or footer link in the preview to another page's spot switches to that page and scrolls to the spot; the attention badge in the top bar still scrolls to its section
- [ ] Section Properties: «Link name» offers a name from the section's first heading; «Priser» typed is stored as `priser`; a name another spot on the page has gives «Another spot on this page has this name» and is not stored; an emptied field removes the name; the section's toolbar shows `#priser`
- [ ] The copy button beside «Link name» copies the whole link (`https://…/kaker#priser`, or the id when there is no name) and the toast shows it
- [ ] A block's menu, Placement, «Link target»: the same field; a named block hidden on phones shows «Hidden on phones: there a link lands on the top of the section», and at phone width a link to it lands on its section
- [ ] Ctrl+C/Ctrl+V and Ctrl+D give a block without the name; a named section saved as a template and inserted on the same page arrives as `priser-2`
- [ ] The example footer: «Bli med» goes to Kaker at «Meld deg inn», also after Kaker's address is changed in the Pages panel; «Kakevideoen» lands on the video section; «Urd på GitHub» opens in a new tab
- [ ] The cart drawer's «Go to checkout» goes to the checkout page, from the menu's cart and from the Cart block; the calendar's announcement link and programme link still go where they point
- [ ] A new page named «Café» gets the address `/cafe`

### Test batch (0.7.24.5.2): the Contact details block in eleven designs, the checkout's seller line, and the design picker for every block

- [ ] Blocks panel: «Contact details» adds the block; with no contact details typed the editor says where to type them and the published page shows nothing
- [ ] Content: Name, Address, Phone, Email and Legal line show and hide their parts; «Edit the contact details» opens the Site panel at Contact details
- [ ] The «Contact» section template gives a heading and the block, with no sample address
- [ ] Each of the eleven designs draws the details at desktop width, in the phone view, and in a narrow frame on desktop with its narrow layout: Lines, Icon rows, Card, Three tiles, Fact list, Action buttons, With a map, Contact strip, Poster, By role, With a QR code
- [ ] Phone and email are links that call and write in every design; Directions (Action buttons, With a map) opens the Site panel's map service with the address
- [ ] Contact strip: «Coloured band» shows only for that design; off, the strip stands on the page itself
- [ ] «Add to contacts button» (every design but the strip): the file downloads as `<name>.vcf`, and a phone's contacts app imports the name, the address, the phone and the email
- [ ] With a QR code: a phone camera reads the code as a contact with the same details, on a light and on a dark theme
- [ ] «Call bar on phones»: on a published page at phone width Call, Email and Map stay at the bottom of the screen while scrolling, the page's last line scrolls clear of the bar, two blocks with the option give one bar, and on desktop there is none
- [ ] With a map: no OpenStreetMap request before «Show map» is pressed (DevTools Network), then the map shows the address's point; without a point the published page shows the details alone and the editor says where the point is found
- [ ] Site panel on the published site, signed in: «Find on the map» under the address stores the point and shows «On the map: lat, lon» with a remove button; changing the address removes the point; locally the lookup reports that it could not be reached
- [ ] Site panel, Contact points: «Add a contact point» gives Role, Email, Phone and Note, the remove button is as tall as the field; By role shows a card per point and the site's own phone and email as «General»; a point with only a role is not shown
- [ ] Published: the JSON-LD lists each contact point with a phone or a valid email as a `ContactPoint`
- [ ] Screen reader: the block is read as an address, the QR code as «QR code with the contact details», and the call bar as a navigation named «Contact»
- [ ] Norway: Register offers Frivillighetsregisteret beside Enhetsregisteret and Foretaksregisteret, and the footer's legal line shows it
- [ ] Checkout: under the order buttons stands «Seller:» with the name, the organisation number, the address, the phone and the email; «Show the seller» in its menu hides it; at phone width it wraps cleanly
- [ ] Footer Contact column: the street and the postcode with the town stay together
- [ ] Every block with more than one look has a Design row under Style and a Design tile in the quick row: Contact details, Gallery, Statistic, Collection, Countdown, Ribbon, FAQ, Timeline, Quote, Links, Basket, Button and Shape
- [ ] The picker shows a picture of each design, its search finds a design by name, «In use» marks the current one, the preview shows the block's own content at its real width and is readable, «Use this design» applies and closes, and Escape closes without a change
- [ ] A gallery without pictures and a contact block without details are previewed with sample content; a collection block previews a draft collection
- [ ] A setting pinned to the quick row before (Gallery's View, Button's Style, the Variant of Quote, Statistic, FAQ, Timeline and Links, Collection's and Basket's View) is still pinned and opens the picker
- [ ] Calendar: the design picker, the phone design picker and the card picker open with their pictures, the view filter, «What you can change» and the open card in the card preview; «Choose design …» in the Blocks panel still adds a calendar
- [ ] A plugin block that declares `designs` shows the Design row and the picker, and the picker's preview draws the plugin block
- [ ] The contact designs stand in four families (Lists, Boxes, Actions, Bold), and every design's description reads right in nb, en-GB and tr

### Test batch (0.7.24.5.1): the legal and contact details for any country, and the Site panel tidied

- [ ] Site panel, Contact details: Country offers 57 countries by their names in the admin language and «Other country» last; a new site starts on the country of its language (Norway for bokmål)
- [ ] Norway: 974 760 673 is saved and shown as «974 760 673»; 974 760 674 gives the red note and is not saved; Register and «Registered for VAT» follow
- [ ] Iceland: 540269-6039 (wrong check digit) is saved with the grey note; Germany: Number type offers the five registers, only the chosen one has a field, switching kind clears the number, and «12345 B» typed as a Vereinsregister number becomes «VR 12345 B»; the Register court field and USt-IdNr. appear once their number or tick is there
- [ ] A number in the wrong form (Norway: 12345) gives «The number is not in the form the country writes it», not the check note
- [ ] Picking the same country again keeps the numbers; changing the country clears them; a picked country stays when its last field is emptied; «Other country» shows «The number's name», «Number» and «VAT number»
- [ ] Ctrl+Z takes back a typed contact field in one step
- [ ] Footer: in Minimal, Columns, Chapters, Split, Big CTA, Contact and the plain text footer the bottom line shows «Apeiron Linjeforening · Org.nr. 974 760 673 MVA · Foretaksregisteret», and the address, phone and email show as a Contact column (one centred row in Big CTA and the plain footer); phone and email are links
- [ ] While the Register court or the register is still empty the line reads cleanly: «Vereinsregister: VR 12345 B», «Company No. 07510759»
- [ ] Footer panel, Contact details: «Show the legal line» and «Show the address, phone and email» each hide only their part, show only when there is something to hide, and «Edit the contact details» opens the Site panel with the group open; applying a footer template turns both back on
- [ ] Germany in the footer: «Vereinsregister: Amtsgericht Berlin-Charlottenburg, VR 12345 B» and «USt-IdNr. DE259582878»; Switzerland with HR and VAT: «UID CHE-135.626.465 HR/MWST»; a representative shows last as «Ansvarlig: …» (en-GB «Representative», tr «Temsilci»); «Other country» with a VAT number shows «Mva-nr. …» (en-GB «VAT no.»)
- [ ] Published: `content/site.json` holds the contact group, the live footer matches the preview, and DevTools shows the `application/ld+json` with `legalName`, `iso6523Code` 0192:974760673, `vatID` and the address
- [ ] At phone width the Contact column moves below like the link columns, and the plain footer's contact row wraps
- [ ] Site panel: every field has its label above it at full width and nothing wraps; Description grows downwards with its text and Enter adds no line break, also in Firefox, and keeps the right height after Ctrl+Z
- [ ] A refused number is announced by a screen reader as invalid with its note
- [ ] The checkout block's email field in Properties looks like the other fields, not a grey box

### Test batch (0.7.24.6): the order button and the summary above it

- [ ] Checkout with products in the basket: right above the buttons, after the contact fields, stands the order in one line («2 × …, 1 × …») with the total; the summary at the top is still there
- [ ] The basket emptied in another tab: the line above the buttons goes away, and comes back when a product is added
- [ ] The order button reads «Bekreft kjøp» in bokmål, nynorsk and Sami, «Confirm purchase» in English and «Satın almayı onayla» in Turkish; «Betal med Vipps» is unchanged
- [ ] With a Vipps number set: the payment line stands above the summary, never between the summary and the buttons
- [ ] At phone width: the summary and the buttons stay together, and the two buttons wrap below each other without overlapping
- [ ] The checkout's help chip has the line about why the button text is fixed, in nb, en-GB and tr, and in Swedish with the Swedish pack
- [ ] A site in Swedish (the Swedish pack): the order button reads «Bekräfta köp»
- [ ] With a screen reader (VoiceOver or NVDA), tabbing from the comment field to «Bekreft kjøp» and to «Betal med Vipps» reads the order and the total with each button

### Test batch (0.7.0.60): the collection index and the template's collections

- [ ] A new site from the template: Collections shows «Nyheter» and «Produkter» and no «F», and the repo has no `content/collections.json` and no `content/samlinger/f.json`
- [ ] A site whose collections are listed only in `content/samlinger.json`: after the update, Collections shows them all
- [ ] A site with a `content/collections.json` (made from the template since 28 September 2026, or with a collection created in the editor since 0.7.14.5): after the update, Collections shows the collections of both files and the editor shows «Unpublished»; after Publish, `content/samlinger.json` lists them all and `content/collections.json` is gone from the repo
- [ ] On such a site before the first Publish: remove «F» in Collections and reload; «F» stays removed. Then Publish: `content/samlinger/f.json` and `content/collections.json` are gone from the repo, and «F» does not come back after a reload
- [ ] On such a site: Publish, reload at once and publish a change to a page before the deploy finishes; that commit leaves `content/samlinger.json` alone
- [ ] On the same site before Publish: Discard drafts keeps every collection of both files in Collections
- [ ] A collection created in the editor but not published before the update: after the update, Collections shows it beside the published ones, and Publish deletes no collection file in the repo
- [ ] After that publish and the deploy: a collection removed in Collections and published is gone from the repo and does not come back after a reload
- [ ] A product collection created in the editor and published: a product in it is paid for through the Vipps layer on a deployed site
- [ ] After a Publish that changes a collection or a template, «Unpublished» goes off, and the next Publish of a page alone does not rewrite that collection or template
- [ ] A page titled «Samlinger» or «Collections» with an unpublished change keeps the change after a reload

### Test batch (0.7.0.59): the width scaling in the three engines (the follow-up of 0.7.17.4)

- [ ] The lightbox at 1280 and 1024 px window width opens, fits the window and closes in Chromium, Firefox and Safari.
- [ ] A parallax background at 1280 and 1024 px moves without a gap at the section edges in Chromium, Firefox and Safari.
- [ ] The text toolbar at 1280 and 1024 px stands above or below the text it edits, never off the canvas, in Chromium, Firefox and Safari.

### Test batch (0.7.0.55-56p): release 0.7.7

- [ ] After the tag v0.7.7 and the GitHub release: the release Action runs green by itself, and the template repo gets «Urd v0.7.7» with the tag
- [ ] urd-web on v0.7.6 is offered v0.7.7 and updates
- [ ] The next release with more than three numbers (e.g. v0.7.7.1): its release Action runs green, and a site on v0.7.7 is offered it in Updates
- [ ] The Swedish language pack still loads after the update (Swedish in the site's language list)
- [ ] A calendar with «Open to everyone» off: the reset under Buttons and filter leaves it off
- [ ] Remove a plugin and publish, then change another plugin and publish again: the second publish goes through without deleting anything again
- [ ] Remove a plugin in the editor, then change a file in its folder on GitHub before publishing: Publish asks about the conflict and names that file

### Test batch (0.7.0.55): the bug list

- [ ] One line: emptying one of its words leaves the rest of the list in place; in Plain, Tickets and the ApeironLF designs the announcement and the empty state look as before
- [ ] An update or publish error with a long address or a reply from GitHub wraps inside the toast, and its × stays at the top
- [ ] Plugins: × on «Swedish language pack» takes it out of the list, it does not come back under «Found» after a reload, and after publishing the folder plugins/lang-sv is gone from the repo; taken back into the list before publishing, the folder stays
- [ ] Calendar band: a press anywhere along the rolling band opens the event's pop-up, also on the right half
- [ ] Calendar band, «Width»: «Own width» keeps the block's box, «Content width» spans the page's content, «The whole page width» runs from edge to edge; it follows a resized window and a «Size» under 100 %
- [ ] «Show subscribe button» off: no subscription anywhere, also under «Add to calendar» in the pop-up
- [ ] The calendar's row for the event's card reads «Pop-up», and the picker «Choose the pop-up design»; «Departure board, screen» is described in English in en-GB and in Norwegian in nb
- [ ] «Show open to everyone» is no longer in Buttons and filter; a calendar that had it off still shows no «Open to everyone»
- [ ] A new Index cards calendar shows four events; a calendar at six switched to Index cards shows four, one at five keeps five
- [ ] Site → Calendars: a calendar without a name keeps its row's width, its address cut with «…»
- [ ] Index cards with a long calendar name: the name runs on under the red rule and the title stands a line lower, clear of it; with a short name the card is as before
- [ ] A Google calendar with formatted descriptions (bold, line breaks, links): the excerpt shows the words without tags
- [ ] «Repeats» shows on no event by default; «Mark repeating events» shows it in List on navy, Grid on cream, Index cards, Receipt and the pop-up

### Test batch (0.7.0.54p): release 0.7.6

- [ ] After the tag v0.7.6 and the GitHub release: the release Action runs green by itself (the editor's dependencies installed before the tests), and the template repo gets «Urd v0.7.6» with the tag v0.7.6 and the engine under `assets/engine/0.7.6/` alone
- [ ] A site on v0.7.5 is offered v0.7.6 and updates in one start

### Test batch (0.7.0.54): the update in batches

- [ ] urd-web (v0.7.4) with update.js, update-plan.js and github.js copied into its functions/: each start of the update shows «Copied N of 107 files from the template. Start the update again to continue.», N growing by 18; the last start commits, the site deploys v0.7.5, and its pages, content and plugins are as before
- [ ] After that update, the design picker shows its pictures, and Updates shows the site on v0.7.5 with the `_headers` note
- [ ] A site on a version with this fix, updating to a release with many new pictures: the Updates panel shows «Copying files from the template: N of M ...» and goes through without a new start
- [ ] An update with only a few new binary files goes through in one start, as before

### Test batch (0.7.0.53p): release 0.7.5

- [ ] After the tag v0.7.5 and the GitHub release: the release Action runs green, and the template repo gets one commit «Urd v0.7.5» with the tag v0.7.5 and the engine under `assets/engine/0.7.5/` alone
- [ ] A site on v0.7.4 opens Updates and is offered v0.7.5; the update leaves its content, its pages and its own plugins as they were, and the published site loads the new engine (no 404 in the network panel)
- [ ] The Updates panel shows the template's new `_headers` as a «change by hand» note with the `media-src 'self' data:` line (this replaces the expectation in an earlier batch that the `_headers` is unchanged at the next release); after the line is added, an unpublished video or audio file in the draft plays in the deployed site's admin preview
- [ ] An engine file on the published site is served with `immutable`, and the admin and the pages work after a hard reload

### Test batch (0.7.19.23.5): Receipt, Seventies poster and Art deco

- [ ] «Receipt» in the picker's Retro family: a till receipt with a torn bottom edge, «* PROGRAMME *», «AUTUMN 2026» and «THE CLUBHOUSE, 2 LOWER STREET», a row per event of date, title, a dot leader and the time with the place and status under it, the totals, «ADMISSION FREE», the barcode with «Subscribe: scan or tap here» (with «Subscribe» on) and «Thank you for coming!»
- [ ] Kvittering: the titles start on one line and the times end on one line whatever their widths; a long title is cut with an ellipsis; «Rewrite calendar data» off shows the calendar's own date, title and time
- [ ] Kvittering's card: «Receipt no. 001» over the title, dot-leader lines Dato, Tid, Sted and Kategori, «Sign up» in ink and a torn bottom edge, without a scrollbar inside it
- [ ] «Seventies poster»: the sunrise, «What's on?» and «October and November», the events as pills with a round date badge in turn orange, mustard and brown, «Join in» on an event with a sign-up and «Follow the calendar, far out» with «Subscribe» on; the pills' titles start on one line
- [ ] Syttitallsplakat's card: a band of stripes with the event's calendar on it and a row of matches under it
- [ ] «Art deco»: the gold double frame on black, the sunburst, «PROGRAMME» and «◆ THE 2026 SEASON ◆», rows of the day in gold, the title with its time and place, and the countdown at the right; the foot with the sign-up and the subscribe links
- [ ] Art deco's card: a fan in each corner, rays over the date and a rule with a diamond under the title
- [ ] In all three the period line («Autumn 2026», «October and November», «The 2026 season») is rewritten by clicking it; emptied it is gone on the published page and a faint hint in the editor; a rewritten period stays when the calendar changes between the three designs
- [ ] «Word choice: Neutral» gives the common words in all three, with «The 2026 season» as the period
- [ ] At 100 % the three have type the size of the other designs'; at 50 % they are half as tall with the same lines; on a phone none of them scrolls sideways, and each shows as itself
- [ ] The pictures in the picker (the design, the phone and the card) show each of the three in its own look

### Test batch (0.7.0.52): gallery, timeline and stat under «Size», and the timeline item's title

- [ ] A Galleri with «Grid» and «Columns» 3, just wide enough for three columns: «Size» at 80 % and 50 % keeps three columns, only smaller; dragged narrow at 100 % it still takes two columns. The same for the mosaic and the polaroids
- [ ] A Tidslinje with «Alternating sides», just wide enough to alternate: at 80 % and 50 % the cards still alternate; dragged narrow at 100 % they still line up along the left line
- [ ] A Statistikk card just wide enough for its large figure: at 80 % the figure shrinks as much as its label; dragged very narrow at 100 % the figure still gets smaller
- [ ] A Statistikk card or band with its own height fills its block; a plain one placed in the middle or stretched stands in the middle
- [ ] A gallery's lightbox, carousel, slideshow and band work as before
- [ ] A Tidslinje's events in the element menu: the year with the up, down and remove buttons on one line, the title in full width under it and the text under that; an edit in each field lands in the timeline

### Test batch (0.7.19.23.4): Cinema marquee, «Size» that scales everything alike, and three calendar fixes

- [ ] «Cinema marquee» in the picker's Retro family: a red frame with lit bulbs above and below a letter board; «★ Now showing ★» with the day word («Tomorrow») over the next event's title, a line with its date, time and place, the excerpt with «Read more», and «Coming soon» with rows of date, name and time
- [ ] The names under «Coming soon» start on one line under each other, whatever the widths of the dates
- [ ] At 100 % the marquee sits at the size of the other designs: its rows the size of the departure board's flaps, the board about as tall as the departure board in the same frame
- [ ] «Word choice: Neutral» gives the common words in place of «Now showing», «Coming soon» and «Tickets»; the words are rewritten by clicking them
- [ ] On a phone, or in a frame too narrow for the board, the marquee shows «Cinema marquee, rows»: the board as a list in its red frame with the subscribe link at the foot; it is offered under «Design on a phone»
- [ ] The marquee's card: a ticket with bulbs along its top edge and a stub with the day and short month, with «Sign up» in the common words
- [ ] Departure board: every letter stands in the middle of its flap, also at 50 % and 150 %
- [ ] A row's card opens centred over the part of the calendar in view, at its own width, past the calendar's edges when it must be, never scrolling inside itself; also at 50 % and 150 %, and with the calendar partly scrolled out of view
- [ ] A stylised calendar (Avgangstavle, Avrivningsblokk) keeps its desktop design at 80, 60 and 50 %; it shows its phone design only where its frame is narrow at 100 %
- [ ] «Size» on a calendar, a text and an FAQ: the slider goes from 40 to 200 %, and everything scales alike; at 50 % the block is half as wide and half as tall with the same lines, nothing wraps anew
- [ ] «Smallest text» and «Largest text» stand empty while a size is set and show the text's size now (7 at 50 % on a calendar); 12 typed in moves a calendar at 50 % to 90 % with its frame and the blocks below; emptied again, the slider reaches 40 %
- [ ] A calendar at 100 % has smaller text than before (14 px), in the same frame; a calendar that showed its phone design in a narrow frame may now show its desktop design
- [ ] Under 100 %, Bento, Delt kort, Måned med sidepanel, Årshjul and the ApeironLF designs keep their wide layout, and a product list and a table keep their columns
- [ ] Pages saved before with a size on a calendar (the front page's at 95 %) open with the calendar at its size and its frame where it was

### Test batch (0.7.19.23.3): Departure board, the phone and card designs per calendar, and seven own cards

- [ ] «Departure board» in the picker's Retro family: an amber heading with «Updated», the heads Date, Time, Event, Place and Status over split-flap rows; the date 04.10, the start time, the title and place cut to the flaps, the status «Enrol» in amber, «Open», or «Cancelled» in the cancelled colour; the first row carries the excerpt; «Subscribe to the board» and «Press a row for details» under it
- [ ] «Rewrite calendar data» off shows the calendar's own date, time, title and place whole, without flaps, in columns under the heads; «Word choice: Neutral» gives «Coming up», «Sign up» and «Open to everyone»; the words are rewritten by clicking them
- [ ] Style has «Design on a phone» and «The card» under Design, each opening the picker on its list with the calendar's choice marked «In use»; the floating menu's quick row offers both
- [ ] The phone list: «Plain list» under Nøytral, every design that reads on a phone (the calendar's own under its own name), the board's «two flap rows» and «flap strip»; never Avgangstavle, Tabell or Varmekart; no entry scrolls sideways in the preview or on a phone; a month or week design shows only on a calendar of that view
- [ ] A phone design from another design keeps its own colours on a phone, whatever colours the calendar has; on a desktop the calendar shows its own design
- [ ] The card list: «Plain card» under Nøytral, the shared cards under «Shared by several designs» (Tema with its designs named, ApeironLF krem and marine, Bento; a search on a design's name finds its set's card), the own cards, Nummerert program and Agenda, mørk, and the board's three cards; a card from another design opens in that design's look
- [ ] The seven own cards open as drawn on the canvas: Billetter (stub with the day, tear-off line with notches), Plakatvegg (taped poster, the day large), Programhefte (staples and «Programme»), Reklametavle (framed board with lamps and legs, facts as tiles), Oppslagstavle (pinned note, the day on a second note), Glass (frosted plate, the calendar behind blurred) and Mørkt glass (edge-lit smoked glass)
- [ ] Every card is as tall as its content without a scrollbar inside it, and follows the block's size: a calendar at 130 % opens its card at 130 %
- [ ] Under every preview: «About the design» with a sentence about the marked entry, and «What you can change» with Colours, Text and Options, a row left out when it has nothing; the sentences read right in nb, en-GB and tr
- [ ] The picker opened from the floating menu: its cross, a press on a tile and Escape close the picker and leave the menu open

### Test batch (0.7.19.23.2): Index cards

- [ ] «Index cards» in the picker's Retro family with its picture; chosen, the block draws typewritten cards on lined paper, each a little askew, numbered «Card no. 01», «02» … with the category in the head, and the writing sits on the lines
- [ ] Each card reads «Date:», «Time:» (left out of a cancelled event) and «Place:» lines, «Sign-up: yes, see link» as the sign-up link (with sign-up buttons on) or «Sign-up: not needed» (unless «Open to everyone» is off), «Repeats: yes» on a repeating event, the excerpt with «Read more», and a rotated «Cancelled» stamp across a cancelled card with its title struck
- [ ] «Word choice: Neutral» gives «No. 01», «Date», «Time», «Place», «Sign up», «Open to everyone» and «Repeats»; the «Columns» option sets two, three or four columns; on a phone the cards flow into one column
- [ ] A press on a card opens the event card with the punched hole at the top, the date as the head over the red rule, the facts on the lines, and the common words on its button and labels («Sign up», «When», «Where»), never the design's line words

### Test batch (0.7.19.23.1): the stylised designs' foundation and Tear-off pad

- [ ] The design picker has a «Retro» family with «Tear-off pad» and its picture; chosen, the block draws the pad: the month bar, the huge day and weekday, the next event with its countdown, time and place, excerpt and «Read more», the sign-up (with sign-up buttons on) and «Add to calendar», and the later events as dashed rows, a cancelled one struck
- [ ] «Add to calendar» opens the event's card dressed as a pad page (the perforation along the top, the date as the red bar with the close cross on it), with the add-to-calendar choices inside
- [ ] With the next event two or more days away the countdown reads «Today in {n} days» (English: «Today in {n} days»); in Style → Designets innstillinger, «Word choice: Neutral» gives «In {n} days»; clicking the words in the preview still rewrites them, and the «?» text on the choice reads right
- [ ] A site in nynorsk or Northern Sami shows the common word in that language, never bokmål's theme word; a bokmål site shows the theme word
- [ ] No rewriting switch on the pad (it never rewrites); the Style area's colour slots are paper, head, ink, rule and edge, and the empty state, the switcher's week and month and the finding tools take the pad's colours
- [ ] On a phone the pad fits its width, and a later row with a long title keeps the title whole with the time under it

### Test batch (0.7.20.9): keys for the menu's areas

- [ ] A block selected on the canvas: 1, 2 and 3 open Properties on Content, Style and Placement, or switch the floating menu's area when it is open; the arrows, Delete and Shift+F10 work right after the click, with no focus ring on the block; a second click still gives the caret, and the arrows then move the caret
- [ ] The floating menu opens with the focus in its search field: typing searches at once; 1, 2 and 3 in the empty field choose the area without being typed; with words in the field a digit is typed; / in the panel and the floating menu goes to that menu's own field; Esc empties the field, the next Esc closes
- [ ] In the wide menu an area key scrolls the column into view and focuses its first head or button; in the narrow one the tab switches; a digit in a number field or in editable text switches nothing
- [ ] No key caps anywhere: the tabs and the close cross as before, the dimmed / at the search field's end hidden while it holds words
- [ ] The welcome on a fresh clone has the keys line; the search field's «?» text names /; the user guide (English, bokmål, nynorsk) has the two new bullets; nb, en-GB and tr read right, nn and se fall back
- [ ] «Section settings» in a section's right-click menu opens the Properties panel on that section, also with another panel open

### Test batch (0.7.20.8): the right-click menu

- [ ] A right click on a block opens the menu at the pointer with Settings first and Delete last; every item does what it says (Settings opens the element menu, Duplicate, To the front and To the back, Hide and Show on mobile, Save as template, Delete); the arrows, Home, End, Escape and Tab behave; a click outside closes it; Shift+F10 and the context-menu key open it for the selected block
- [ ] Copy style on one block and Paste style on another of the same type gives the look with the words kept; on a block of another type only the animation, hover, size, height and fit come across; Ctrl+Alt+C and Ctrl+Alt+V do the same without the menu; Ctrl+Z undoes a paste
- [ ] A right click on a section's empty surface opens the section's menu: New block here opens the chooser at the point, Paste pastes the copied blocks, Section settings shows the section in Properties, New section below opens the preset choices, the moves move, Save as template saves, Delete asks for a second press; Shift+F10 with no block selected opens it for the active section
- [ ] A right click in text you are typing in keeps the browser's own menu; the Clean view and the phone view show the browser's menu everywhere; the section toolbar's buttons keep theirs
- [ ] No section ever gets an amber outline; the review flag shows only as the badge in the top bar and the card in the phone view
- [ ] «1 section needs mobile review» in the top bar lands on the flagged section with its card in view in the phone view, also on a long page and at every zoom; «Reviewed» clears the badge

### Test batch (0.7.20.7): marks on own values

- [ ] In every group of every block type: a setting at its default shows no dot; under switches and numbers a dimmed «Default: …» line; a changed setting gets the amber dot and the reset at the right, the group its dot; the row's reset puts that one setting back and leaves the others; the group's reset still puts all back
- [ ] Colour settings that fall back to the theme (the quote's and the timeline's colour, the share block's colour, the box styles) say «Back to the theme's» on their reset
- [ ] The phone view, Placement: «Place on the phone» reads «As on desktop: in the reading order» for a flowing block; a block dragged to a row reads «pinned to row N» with the dot, and «Back to the reading order» lets it flow again
- [ ] Narrow and wide menu, the Properties panel and the floating menu, and the search's copy of the areas all draw the rows the same

### Test batch (0.7.20.6): the floating menu's place

- [ ] The gear opens the floating menu beside the block: to the right, to the left when the right has no room, below when neither side is free, and never over the block; narrow and wide, at every zoom and in the device views
- [ ] The head drags the menu (grip, grab cursor), the menu stops at the window's edges and never over the admin's panels, a press on the search field, the width button or the close cross in the head is not a drag
- [ ] The place is kept: the next block's menu opens where the last one was left, until «Back beside the block» (shown only after a move) puts it beside the block, and the button then goes away; a reload starts beside the block again

### Test batch (0.7.20.5.3): the last families in groups, and the site's links

- [ ] Table, quote, statistic, FAQ, timeline, form, collection, product, cart, checkout, share (now Links), countdown, audio and map: every setting stands in a group on the Design canvas's map, the closed value reads right, the dot and «Reset this group» appear and work, the pins put the mapped settings in the quick row, and no divider line ends a Style area
- [ ] A block whose area holds one group (statistic, table, timeline, button, icon, and the Content of quote, FAQ, shape, gallery, collection, cart, share, countdown, map) opens that group at the first showing; a group closed by hand stays closed for the session
- [ ] A second click on a selected table cell, a statistic's number or label, a quote and a timeline's year, title or text puts the caret there, and the pointer shows the text cursor over all of them; the first click still selects and drags
- [ ] Site panel, Links: a link with a library icon and one with an own uploaded image, with and without a label, moved and removed; «+ New link» puts the caret in the label; the footer draws the row with the names spoken, and «Show the site's links» in the Footer panel takes it out; a site from before the lift keeps its old footer links as site links with the brand names
- [ ] Nav panel, tools: the links tool off by default, on shows the links as icons in the cluster and in the mobile sheet with their names, moved with the arrows
- [ ] The Links block: the site's links first, each of them switchable off for that block alone, then the block's own list with the whole icon library and an own image; a link to a page of the site, an external one (new tab) and a mailto; followed by one click in the Clean view and by the second click when editing, never by the click that selects; «Edit the site's links» opens the Site panel with the Links group open; a page stored with the old share buttons shows the site's links; publishing writes own icons to media/
- [ ] The three new backlog items read right: the themed date and time picker under 0.7.10, and «Reactions on elements» under v0.8

### Test batch (0.7.0.51): the bug list

- [ ] A ribbon block on a published page: the pause button at the band's right edge pauses and plays it (the label reads «Pause the band» / «Play the band» in the site's language), the state survives an edit of the words, and with «Pause» set to «Touch» the button is invisible until it gets keyboard focus, a touch on the band pauses it and a tap on its empty space plays it again
- [ ] A gallery in band view: the same button and the same touch form; a gallery in slides view: the pause button at the foot, a step on an arrow or a dot stops the advance for good, the button plays it again, and the pointer over the show holds it
- [ ] With reduced motion on, no pause button is drawn (nothing moves)
- [ ] «Pin to screen»: a block dragged into the menu's band docks in the top row under the menu, never behind it; with a side column the left or right docks keep clear of the column; the middle row is centred in the free area; the phone view the same
- [ ] A block in the first section cannot be dragged above the canvas top (under an overlay menu); a block in a later section still can hang above its section's top
- [ ] Site panel, a site without calendars: one press of «New calendar» adds the row with the caret in its name; the first item added to an empty ribbon, form, timeline or FAQ shows at once
- [ ] A page without JavaScript shows the English noscript line

### Test batch (0.7.0.49): the scatter seed

- [ ] A gallery in scatter or mosaic view: «Shuffle» gives a different layout each press, and the kept layout survives a reload and a publish

### Test batch (0.7.26.5): the shell's parts and the state modules

- [ ] Admin loads with the panel remembered from last time, and with none; on a fresh clone the setup wizard comes up, and its name and colours land in the site
- [ ] The rail opens every panel, the gear opens the settings popover, and the admin theme and language chosen there hold after a reload
- [ ] The top bar: the page name, the view, device and zoom clusters, the fold steps when the window narrows, the guides and the grid, Clean view and back with the panel's scroll kept
- [ ] The draft status: Discard arms, Escape disarms, the confirmation discards and the status says so; Publish on the deployed site
- [ ] Undo and redo across the page, the site, the collections, the templates and the plugins, with the keys and the buttons
- [ ] An image background's «Cover» and «Show all», which measure the section box in an effect; the page kebab menu closing on an outside click; a new site calendar taking the focus
- [ ] The Blocks panel's seeds and names, the animation choices in Placement and in a section, the theme suggestions and the admin theme list read from the dictionary, in every admin language
- [ ] A block selected in the preview shows the element menu in Properties; the gear opens the floating menu; a drag, a resize and a delete reach the draft
- [ ] Push preparation 0.7.20.3-0.7.26.5p: «Update» in the Update panel runs with files skipped; a sticky block's «until» choice lists the sections below it; the Nav panel opened before the preview has loaded, and after a preview reload, still reaches the preview («Show the strip again» brings a dismissed announcement back)

### Test batch (0.7.26.4): the content and system panels as components, and the drag over a section edge

- [ ] Properties for a section: the height, the grid, the theme, the anchor, background layers of every type with the focal point, the sizes and the gradient stops, the dividers and the animation; then a selected block shows the element menu as before
- [ ] The nav background and the footer background, drawn by the same editor
- [ ] Blocks: a block of each kind, an image and a gallery with pictures, a calendar from the design picker, a plugin block and a saved template, and the panel's search
- [ ] Collections: a new collection, new entries, a product's images, sizes and colours, and CSV out and in
- [ ] Plugins: one switched off and on, one added from the found list and one by id, and the CSP warning against the live headers
- [ ] History with the revert of the last publish, and the Update panel with an update available, its skipped files and the update itself
- [ ] A block dragged down over the section's bottom edge stays in its section and lies over the one below; dragged wholly into the section below, it moves there; the same upward

### Test batch (0.7.26.3): the site panels as components, and the guides rework

- [ ] Pages: a new page from a template, the kebab menu (rename, slug, delete, save as template), the search text and the sharing image, and the warning on a page without a description
- [ ] Nav: the menu rows dragged up, down and in under each other, «new page as a menu item», the logo and its type, the variant, the sizes, the mobile settings, the launcher, the announcement and the nav background
- [ ] Site: the name, the icon through the icon editor, the content width with its sample, the language, the calendars with an open row and the focus on a new one, the map service and the time zone
- [ ] Theme: the colours in light and dark, the suggestions, the fonts and the corners; Grid: the size and the snapping; Footer: the templates, the columns, the links, the social icons and the background
- [ ] «Rediger nettstedets kalendere» in a calendar block's Kilder group opens the Site panel with the calendars unfolded
- [ ] A block dragged near a neighbour's edge or centre shows a line between the two; dragged to the section's midline, a line across the section
- [ ] Three blocks in a row with equal distances show the bands with the number when the third stands right; the bands and lines are gone when the drag ends
- [ ] A block dragged over another section: the grid on every section, and lines from the section it is over; released there, it moves there
- [ ] Shift while moving holds the axis; Ctrl (Cmd on a Mac) places freely without the grid and the lines; at 60 % zoom a snap feels as strong as at 100 %
- [ ] The top edge of a section dragged and released leaves the pointer normal; the same for the bottom edge and the «+ Ny seksjon» bar, where Ctrl frees the height

### Test batch (0.7.26.2): the element menu as components, the global stylesheet and the design pictures

- [ ] Every block type's menu, in the Properties panel and in the floating menu, shows the same groups, quick row and pins as before, and every control writes to the block
- [ ] The pin looks as before (the icon alone, dimmed until reached), and the close and width buttons in the floating menu's head are the same size
- [ ] A calendar whose sources include one of the site's calendars opens its menu, and «Rediger kalendere» opens the Site panel at the calendars; a product block's «Rediger katalog» opens the Collections panel
- [ ] The menu's search in both places, Escape in it, the width button, the setting in the gear, and groups and the tab remembered across blocks
- [ ] The design tile in a calendar's quick row starts its words at the left and ends them with «…»
- [ ] The colour picker, the dropdowns, the icon and mark pickers, the design picker and the icon editor look as before, their checkboxes included
- [ ] The top bar, the rail, every panel and the preview stage look as before, since the whole stylesheet moved
- [ ] The design picker shows each design in its own proportions, centred on the dark tile, with no white below a short design

### Test batch (0.7.20.5.2): the gallery and the ribbon in groups, a band's reach and the gallery band's height

- [ ] A gallery's menu has «Bilder» in Content and «Visning», «Rulling» and «Bildene» in Style; «Rulling» shows only in the ribbon view
- [ ] A ribbon's menu has «Ord i båndet» and «Skilletegn» in Content and «Rulling», «Striper», «Form og bredde», «Tekst» and «Farger» in Style; no card is called «Bevegelse»
- [ ] A new ribbon starts at «Innholdsbredde» and spans the content surface; «Hele sidebredden» reaches the window's edges, and «Egen bredde» keeps the band in the block's box
- [ ] A gallery in the ribbon view offers the same three reaches under «Visning», and they work the same way
- [ ] Dragging a gallery band's height changes the band and its pictures while the drag is held, in all three reaches; «Høyde på båndet» moves the block's edge, and two rows share the height
- [ ] On a phone a gallery band keeps the height it has on the desktop
- [ ] A page with a ribbon and a gallery band made before this change looks as it did, on the desktop and on a phone

### Test batch (0.7.20.5.1): the element menu in groups for the first two families

- [ ] An image's menu has «Bilde» and «Lenke og klikk» in Content and «Utsnitt», «Filtre» and «Hjørner» in Style; the crop choice reads «Tilpasning»; moving the focus gives «Utsnitt» the dot and «1 endret», and its reset brings the defaults back; «Åpne bildeeditoren» opens the editor on the canvas
- [ ] A text block, a button, a video (as a link and as a file), an icon and a shape show their groups as on the group map, each with its value while closed and a reset only when changed; no divider line ends their Style areas
- [ ] Each of these block types starts its quick row with its own settings (for example «Justering» and «Tekstboks» on a text, «Størrelse px» and «Farge» on an icon), and a dropdown and a colour picker work in the quick row
- [ ] A background image layer's fit choice reads «Tilpasning»; in nynorsk the narrow-screen setting reads its own words, not «Tilpassing»

### Test batch (0.7.20.3): pins in the quick row

- [ ] In a text block's element menu, the pin beside «Størrelse» puts it at the end of the quick row and turns filled; another text block shows it too, and it is still there after a reload
- [ ] The pin on the «Smal skjerm» tile takes it out of the row and the pin beside the setting in Placement turns empty; pressing that pin brings the tile back to its own place
- [ ] «Tilbakestill hurtigraden» shows only while the row differs from the defaults, and brings the defaults back
- [ ] On a calendar, taking «Design» out and pinning «Skjul på mobil» leaves an image block's row as it was
- [ ] The pin is a small icon without a frame, dimmed until the pointer or the keyboard reaches it, with a visible focus ring; in the calendar's Style area «Design» and its value stand side by side without overlapping, in both widths

### Test batch (0.7.21.7): the phone height of a block that fetches its content

- [ ] On the home page, change the calendar's design, publish, and open the published page on a phone in a new private window: the calendar stands at its final height while it loads and the page below does not jump (a small difference is expected if the feed changed since the edit)
- [ ] Change the calendar's design or the number of events in the desktop view and publish again: the phone height follows without any drag
- [ ] The same for a collection block and a product block on a phone: no jump when the entries arrive, and a collection with no entries leaves no empty space under its empty state
- [ ] On the desktop a collection and a product block hold their frame's height while the entries load, and then follow the content as before
- [ ] A page saved before this change loads as it did, on the desktop and on a phone

### Test batch (0.7.21.6): drags that show their result

- [ ] A Shift-drag of the resize corner on an image, a video, a shape and an icon keeps the ratio, with the width snapping to the grid; without Shift the height is free as before; the handle's tooltip says Shift keeps the ratio
- [ ] While resizing a text block and a FAQ, a readout under the block shows the width in percent and the height in px as they change, and what stands on release is the last value shown
- [ ] In the mobile view, a pinned FAQ dragged up or down by its corner keeps its height with the stop bar shown; dragged sideways it changes width and the readout follows
- [ ] A text block rotated to -15° and to 15°: the toolbar stands upright above the block, left-aligned with its outermost edge, and covers none of the text; on a rotated block at the very top of the page it stands under; it follows while the rotation handle is dragged

### Test batch (0.7.21.5): «Size» for every block and the three fit choices

- [ ] A text block, a FAQ and a collection show «Size» (40 to 200 %) in the element menu's Placement area, right above «On narrower screens»; an image, a video, a shape, an icon and a map show none
- [ ] The slider at 150 % and at 70 % on a text block: the box and the text scale together with the same line breaks as at 100 %, the blocks below move down and nothing overlaps; on a FAQ the frame is fitted to the scaled content; the menu keeps its height when the two text fields appear
- [ ] «Smallest text» 16 on a text block at 40 %: the text stops at 16 px while the box and the spacing keep shrinking; «Largest text» 24 at 200 %: the text stops at 24 px while the rest grows
- [ ] A drag of the outline (width and height) on a block at 150 % leaves the slider at 150 %; the slider dragged back and forth undoes as one step with Ctrl+Z; back at 100 % the two text fields disappear
- [ ] The home page's calendar, stored at 0.7 before the change, looks as before, shows 70 % in Placement and has no size left in the Style tab
- [ ] On the published page, on the desktop and on a phone, a sized block is the size the preview showed
- [ ] On the published page in a window narrower than the content width: a text block set to «Shrink the content» gets smaller with the same line breaks all the way down to its smallest scale; «Shrink and wrap the content» gets smaller and wraps; «Wrap the content» keeps its text size and wraps; a block at 150 % with shrink shrinks from 150 % down, never jumping to 100 % first, and no block flickers between wrapped and unwrapped
- [ ] A square shape with «Size px» set to 300 takes 300 px of width at the content width and keeps its ratio; a line with «Length» 500 takes 500 px; the tooltips on «Size» and «On narrower screens» read as plain words

### Test batch (0.7.0.45): the bug round

- [ ] On the deployed test site: a video background layer, an audio block and a video block with an unpublished file (added in the editor, not yet published) play in the preview (this replaces the expectation in batch 0.7.13.12 that they are blocked until published); after the next release, a site updated from the template gets the `media-src` line as a «change by hand» note
- [ ] A calendar fed by a Google Calendar with a fortnightly event on Sunday and another weekday shows the same dates as Google Calendar; a «last Friday of the year» event and a «Friday the 13th» event show where Google shows them
- [ ] A «Coming up» design with a countdown (Billboard, Ring, Dark glass) edited many times in a row: the countdown keeps ticking each minute and the editor stays as quick as before
- [ ] The Year wheel with August at the top: the middle reads «2026/27», August to July hold this season's events, and only the months of the season that have passed are dimmed; with January at the top it reads «2026» as before
- [ ] The Year wheel: a press on a month's ring or its name shows that month's events beside the wheel, in the Clean view at once and in the editor after the first press has selected the calendar; every month name stands whole, also at the sides; the wheel stays put when the list beside it changes height
- [ ] On a phone (or a block narrower than 540 px), with long titles and places: List on navy puts its sign-up on its own line, Coming up on navy puts the date above the text, Regular event and Billboard set their titles smaller, Poster wall shows one column, and no page scrolls sideways; a very long word breaks inside the block; the search field is never wider than the block
- [ ] The Band design: «Pause» shows under «Roll» only while «Roll» is on; «Pause button» draws a round button at the band's edge that pauses and plays, and the pause stays after a search; «Pointer and touch» draws no button, a touch on the band pauses it, a tap on an event still opens it, a tap on empty space plays again, and Tab into the band shows the button; with reduced motion the band stands still and scrolls sideways
- [ ] `python3 dev-server.py` from the repo root, and from `template/`, serves the site; after a change to an engine file a plain reload of admin shows it, without emptying the cache

### Test batch (0.7.21.3): the block's own height, the map in its frame, and the section line

- [ ] The map on Hjem fills its frame with the «Larger map» line under it, on the desktop and in the mobile view; dragging the frame taller and shorter resizes the map; its Properties no longer have «Height (pixels)»; a new map from the palette and from the «Find us» preset fills its box from the start
- [ ] A block that follows its content (FAQ, stats, table, calendar) shows «Height» at the top of the Placement area with «Follows the content» chosen; image, text and button do not show it
- [ ] «Own height»: the box keeps its height, the lower handle resizes freely without the stop bar, and «Content in the box» appears under it with Top, Middle and Bottom, each placing the content in a box dragged taller than it
- [ ] «Stretch» stands as the fourth choice on stats, countdown and quote (the card or the units fill the box) and on the calendar in the Plain and Cards designs (the rows or cards spread, the subscribe row at the bottom); a «Coming up» design offers no Stretch
- [ ] Back to «Follows the content»: the frame shrinks or grows to the content again and the stop bar with its label returns; undo of each choice works; the choices survive a save and a reload
- [ ] A map saved before today looks as tall as before after loading (the page migration), and a page saved today loads unchanged
- [ ] A block whose content grows past the bottom of a section with its own height (a calendar made narrower until its phone layout, more FAQ items, a longer feed) lies over the section below in the editor and the section keeps its height; on the published page the section grows instead; a section with no height of its own grows in both
- [ ] The selection outline sits tight against a text box with a background, with no light line between them on any side, in the editor's scaled preview and at browser zoom

### Test batch (0.7.19.29): the site's calendars

- [ ] The Site panel has the group «Calendars» with the example calendar «Apeiron»; «New calendar» at the top adds a row that opens with the caret in its name; pressing the head folds it together and opens it again with a smooth slide and a turning chevron, one row open at a time, and the panel never jumps while a row opens or closes
- [ ] In the open row: Basics (name, address, description), Colours (main colour and the three extra swatches on one line) and Shown to visitors (web page, organiser, the two switches); «Remove calendar» removes the row; move up and down reorders; after a reload the row persists and the stored calendar holds only the fields set (the switches only when off)
- [ ] A calendar block's Sources: the home page's calendar shows its reference as a read-only row with «Apeiron»; the site's calendars stand as a checkbox list and ticking one adds it, unticking removes it; «Add calendar» plus an address plus «Save in the site's calendars» moves the address to the Site panel and the row becomes read-only; «Edit the site's calendars» opens the Site panel with the group open
- [ ] On a real feed: a named source (an own address with a name and a colour, or a registry calendar) gives its events the name as chip and the colour on the chip, the date and the edge stripe; this did not work before this push
- [ ] Registry switches on a real feed: «In the calendar filter» off gives the calendar's events no chip and leaves it out of the chip row and the side panel's key; «Can be subscribed to» off leaves it out of the subscribe row and the card's «whole calendar» links while the other calendar keeps its button
- [ ] The card of an event from a registry calendar with an organiser, a description and a web page: «Organiser» as a fact, the description under the event's own, and «More about <name>» opening the page; the published page's JSON-LD carries the organiser with that page as its url
- [ ] Extra colours on a registry calendar: a box background colours the event boxes in the week plan and the lists, a chip colour the chips and the filter button, a text colour the text on the main colour
- [ ] A block whose reference points at a calendar removed from the registry: the editor row says so, and the preview shows the sample data with the note about the missing calendar
- [ ] The editor's own preview is untouched by the picker's iframe (no block moves or selections from it) after the bridge's source check

### Test batch (0.7.19.22): the design picker

- [ ] «Choose design …» in the Calendar group of the Blocks panel opens the picker centred over the editor: 34 designs with pictures in three families (Plain and modern, Coming up, ApeironLF), a search field focused, «34 designs» counted, and «Add calendar» adds a calendar in the marked design and closes it
- [ ] The Design row in a selected calendar's block menu (and the quick row's Design) opens the same picker with the block's design marked «Chosen»; «Use this design» changes the block's design and closes
- [ ] The view filter narrows the list (Month: Plain, Month with side panel, Overview on cream), the search narrows by name in the admin language, and «No design matches» shows for a word with no hit
- [ ] The preview on the right draws the marked design live with sample events in the site's own theme and language, sized to the calendar alone (no header, footer or empty ground), and changes within a moment of a click; double-clicking a tile applies it
- [ ] Escape and the cross close the picker without changing anything; the editor's own preview is untouched by the picker's (no block moves or selections from it)
- [ ] The pictures are the designs as the engine draws them with sample data (no site header over them); a missing picture would show the old schematic thumbnail in its place

### Test batch (0.7.19.21): the phone design, and «Add to calendar» switchable

- [ ] Table and Heatmap on a phone (or dragged narrower than 540 px in the editor): the design is replaced by a stacked list with «Upcoming», a row per event (date · time, title, place, the sign-up button when the sign-up buttons are on) and «Show all N» for the rest; the list takes the design's colours (try Table with own colour slots)
- [ ] Content on a Table or Heatmap calendar shows «Phone design», ticked; unticked, the phone shows the table or the year grid as before. The switch is absent on every other design
- [ ] Heatmap on a phone with the phone design: the list holds what is coming, counted by the max count, not the whole year
- [ ] Table on a phone with the switcher on: Upcoming shows the phone design, Week and Month show their own phone layouts, and the edge stripe setting colours the rows' edges
- [ ] Poster wall and Picture cards on a phone: one column, the first poster no wider than the column, whatever the columns option says
- [ ] «Show «Add to calendar»» under Content, ticked by default: unticked, the event's card has no «Add to calendar» fold (and no subscribe links in it); the subscribe row under the calendar is unchanged. The Buttons group in the block menu counts the change and resets it

### Test batch (0.7.19.19-20): the card, the switcher's views and the finding tools per design set

- [ ] The event card opened in each of the 34 designs: its ground, ink, accent, radius and type follow the design's set (cream and navy on the Ap designs, a pinned note on Noticeboard, a hard-shadowed square on the poster designs, glass on the two glass designs, the theme's colours on the plain designs), and the text reads on every one
- [ ] The switcher's Week and Month on a dark design (Liste på marine, Dark glass, Billboard): the week strip and the month are drawn in the design's colours, not the theme's
- [ ] Content → the switcher toggle: Week design and Month design appear only with the switcher on; Week plan, Layers, Month with side panel and Oversikt på krem behind the buttons are drawn in the block's set, and the ApeironLF month is the default on the Ap designs
- [ ] The tools' size setting: small and large change the switcher's buttons, the chips, the search field and the week's and month's arrows together
- [ ] The calendar filter is off on a new calendar and on an older calendar without the key; switched on it shows the calendars' names (the sources' names, else the «Category: Title» words); no place filter exists, and an older calendar with the place filter stored shows none
- [ ] On a phone (or a narrow preview) the switcher and a search button stand on one row; the button opens the search field, which stays open while it holds words; the chips scroll sideways
- [ ] A calendar without sources in the preview: the block grows with its sample data and pushes the blocks below, and the published page shows the empty state
- [ ] The edge stripe setting on a calendar with Week plan behind the Week button: off gives the plan's boxes no edge, on gives them the calendar's colour, and an own colour gives that colour; Week plan and Day plan alone keep their edge by default
- [ ] Month with side panel behind the Month button: the key of the calendars is shown only with the calendar filter on, and the sample calendars (Møte, Sosialt, Tur) stand in three colours in the month's pills and the key
- [ ] «Show all N (M more)» in the editor: the press that selects the block leaves it, the next press opens it and puts the caret in the words, the presses after that edit the words, and a press after leaving the words closes it; in the Clean view one press toggles it
- [ ] The description setting (Content): shown on Programme booklet, Split card, Regular event and the plain cards only; «Only in the card» removes the excerpt from the rows and the pressed card still holds the whole description; an older Programme booklet or Split card with the description switched off in Style reads as «Only in the card»
- [ ] The selected chip is visible on Oversikt på krem, Liste på marine and the poster designs; the tools stand on their own ground on the navy, board, dark glass and cork sets

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

