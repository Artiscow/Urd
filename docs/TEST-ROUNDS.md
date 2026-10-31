# Test rounds (the checklist for manual testing)

What has been delivered and waits for manual testing, in production or locally. **Items are struck only by whoever tests**; the assistant adds new items when something is delivered, but never removes anything here unless asked. A new delivery gets a «Test batch» section of its own at the top (newest first), and the batches are gathered into the areas below when asked. [BACKLOG.md](BACKLOG.md) owns the tasks; this list owns the testing of what is already delivered. Where something has been removed, it was checked and solved, listed as a known bug, or replaced by a later change (gathered by area on 28 October 2026: items already confirmed by use, repeated in another item or covered by a broader one were removed, and the rest merged).

### Test batch (0.7.10.13-18p): the shop tab in the canvas menu at boot

- [ ] On a site with a products collection and no «List the shop's blocks» setting (the example site with `"shop"` removed from `commerce` in site.json, or a fresh site with a catalogue): reload the admin and press «+ New block» in the first section: the Shop tab stands there, as in the Blocks panel and Ctrl+K
- [ ] Site panel, Shop, Hidden: «+ New block» in the same section without a reload has no Shop tab, a search for «product» in it finds nothing, and a product block added earlier is gone from the slim menu's Recent row; Shown brings all three back

### Test batch (0.7.10.18): pages held after a publish, the text block's room given back, and the caret through a redraw

- [ ] Locally, any page in the admin: the preview draws the page and the console has no «Urd: boot failed»
- [ ] Om oss, the text ending «…Krumpfurt.»: paste a long paragraph at its end; the block grows and the button below moves down with it; select the pasted words and delete them (or Ctrl+Z inside the text): the block returns to its height and the button to its place, and back exactly as before, Publish greys out
- [ ] The same, with a click outside and back in between the paste and the delete: the room is given back; with a block in the section dragged in between: the height stays until the bottom edge is dragged up
- [ ] A long text pasted, then the top bar's undo: the text, its height and the button go back in one step
- [ ] A redraw while typing: type a word into the Om oss text, run in the admin window's console `const old = JSON.parse(localStorage.getItem('urd-draft-om-oss')).sections.find((s) => s.id === 'sec-82c3367e'); setTimeout(() => document.querySelector('iframe').contentWindow.postMessage({ type: 'urd-preview', section: old }, location.origin), 4000);` and type on in the text: when the old copy lands the field keeps every letter typed, the caret stays where it is and the next letters land there
- [ ] On the deployed site: edit two pages, publish, and switch to the other page before the status says live: it shows the edit; a menu label changed and published shows in the preview after a page switch in the same minute

### Test batch (0.7.10.17): the shop's blocks behind a choice, and the date picker

- [ ] Site panel, Shop: «List the shop's blocks» as Shown and Hidden, Shown marked on the example site; the tooltip, the label and both words in bokmål and Turkish
- [ ] Hidden: the Shop group leaves the Blocks panel (a search for «product» finds no block), «+ New block» has no Shop tab, Ctrl+K offers no «Insert Product cards» and no «New section: Products», «Shop …» or «Checkout», and «+ New section» has no Shop category; Shown brings them all back without a reload
- [ ] Hidden, the Shop page: the product cards block renders and opens its menu; the basket and the checkout pages work; the menu's basket tool is unchanged; a publish writes `"shop": false` under `commerce` in `content/site.json` and nothing else changes
- [ ] «Discard drafts» and reload: Shown, from the product catalogue; on a site with no products collection and no setting: Hidden, and Shown there shows the group anyway; Ctrl+Z after a change flips it back
- [ ] Collections, a news entry: the date reads like «19 Jul 2026» in the panel's field look; a click opens a month grid under it with the week in the admin language's order, today framed and the entry's day filled; another day picked moves the entry in the list and on the page; «Today» and «Clear» do what they say
- [ ] The grid on the keyboard: the arrows move a day and a week, PageUp and PageDown a month, Home and End to the week's ends, Enter picks, Escape closes; a click in the preview closes it; an entry low in the panel opens its grid upward
- [ ] A countdown block: «Counting down to» reads date and time together; the grid has Hour and Minute under it, a change in either moves the countdown on the page, and a day picked keeps the time
- [ ] The picker in bokmål and Turkish: month and weekday names, «Today», «Clear», «Hour» and «Minute»; the same in Firefox and Safari, where the grid is placed by measuring

### Test batch (0.7.10.16): the command palette, the drop indicators, the layout help chip and the stacked Properties panel

- [ ] Ctrl+K with the focus in the panels or on the canvas, and Ctrl+Shift+P: the palette opens with Actions, Pages, Panels, Insert a block and New section; the arrows walk it, Enter runs the marked command, Escape and a press outside close it; the field has the focus on opening
- [ ] Type «kak»: «Go to Kaker» alone; Enter switches the page; open the palette again: «Recent» stands first with it; the same for a block inserted, a section added at the foot of the page, a panel opened, a device chosen and Clean view
- [ ] «Publish» stands in the palette only while there is something to publish; «Show the grid» reads «Hide the grid» while it is on, the guide lines likewise
- [ ] Ctrl+K while typing in a text block opens the link editor, not the palette; Ctrl+K in a text field of the panels does nothing; with the link editor or the design picker open, Ctrl+K leaves them as they are
- [ ] The shortcut sheet («?») lists «Command palette» under General with both ways; the palette in bokmål and Turkish: the groups and every command translated
- [ ] Drag a block by its ⠿ handle wholly out of its section over the next one: that section gets a dashed accent frame inside its edge; back into the own section the frame goes; the release clears it and the block lands there; a block still overlapping its own section gets no frame
- [ ] The phone view: drag a block in the flow by its handle; a magenta line across the section shows the row it will land in and moves row by row; on release it is gone and the block sits where the line was; a resize draws no line
- [ ] The element menu's Placement area (the narrow menu, the wide menu's column and the Properties panel): a «?» on the heading opens a card with six lines in the admin's colours; Escape and a press outside close it; the card in bokmål and Turkish
- [ ] The Properties panel on a text block: no tab row; Content, Style and Placement under each other with a heading each in the accent; scroll the panel and the headings stick to the top; «2 groups» beside Style, «3 groups» beside Placement; change a Style setting: «1 changed» joins it; the same in the floating menu switched narrow with the «><» button; the wide menu keeps its three columns
- [ ] The quick tiles in the panel: «Alignment» across the row with Left, Centred and Right at a field's height, «Text box» and «On a phone» side by side under it, «Narrow screen» across; the pins at the right edge; every tile's choice changes the page at once; another block type's tiles pack the same way
- [ ] With the focus in the panel, press 1, 2 and 3: the panel scrolls to the area and the focus lands on its first group head, never on the «?» chip; Urd settings, Element menu: the narrow choice reads «Narrow (areas under each other)»

### Test batch (0.7.10.15): the gradient bar, the opacity per colour and the animations' pace

- [ ] Properties on Kaker's first section, Background, the gradient layer: a bar under Shape with a handle per colour where its row's slider says; drag a handle and the strip, the page and the row follow, and the rows sort into position order on release; a press on the bar adds a colour there in the nearest colour; «+ Add colour» lands in the widest gap; Tab to a handle and the arrow keys move it one step, ten with Shift
- [ ] Two handles dragged to one spot give a hard edge on the page; a row's opacity at 40 lets the layer under show through that colour, 100 is opaque; × stands on the rows from three colours and is gone at two; Ctrl+Z takes a drag back in one step
- [ ] The tooltips on the bar, a handle, the position slider, the opacity field and «+ Add colour», in English, bokmål and Turkish
- [ ] Kaker's gradient and the front page's rolling eight-colour gradient look as before the update in the editor and published, the loop seamless; a gradient of two equal shares before shows 25 % and 75 %
- [ ] «+ New section», Hero: a dark-to-purple gradient, and its card in the gallery drawn in the gradient's first colour; «Hero over a photo»: the veil fades from clear at the top as before
- [ ] Motion on a gradient: «Time per cycle» appears under it with the animation's own pace (Pan 18 s, Pan one way 30 s, Rotate 40 s, Pulse 7 s, Orbit 26 s); 10 s runs the animation faster in the preview and published, the loop still seamless; None hides the slider; under reduced motion nothing moves

### Test batch (0.7.10.14): the menu's second submenu level and the arrow in the pill

- [ ] Butikk › Shop FP › Checkout, on the published page and in the editor: the second panel opens at the first panel's edge with no gap and no overlap, «Checkout» level with «Shop FP», in Card (standard), Flat surface, Pill items and Underline list, and to the left with the menu items on the right
- [ ] Move the pointer slowly from «Shop FP» over to «Checkout», resting on the way: the second panel stays open, and in the editor no «+ New section» button or section toolbar appears over it
- [ ] Pill items: the arrow of «Shop FP» stands inside its pill at the right end, a click on it opens and closes the second level, and a click on the words opens the page; a submenu item with no page of its own is a pill with its arrow inside; the same in the phone menus, with the submenu under the pill
- [ ] Nav panel, Menu items: the field for a new page reads «Title» (bokmål «Tittel», Turkish «Başlık»)

## Releases and the deployed site

- [ ] At the next release: the release Action runs green by itself, urd-template gets the release with its tag, `URD-LICENSE.md` stands at its root, and the License link in its README (English, and the Norwegian and Turkish under `readme/`) opens it
- [ ] A site on the previous release opens Updates and is offered the new one: an update with few files goes through in one start, one with many new pictures shows «Copying files from the template: N of M ...» and goes through without a new start; the site's content, pages and own plugins stay as they were, the Swedish language pack still loads, and `URD-LICENSE.md` is added
- [ ] The Updates panel shows a changed `_headers` as a «change by hand» note with the `media-src 'self' data:` line; once the line is added, an unpublished video background, audio block and video file in the draft play in the deployed admin preview
- [ ] On a released site an engine file is served `immutable`; on the test site deployed from the monorepo it is `no-cache` and answers 304 on a reload, `base.css` and the pictures under `/media/` stay `immutable`, and a missing engine file gives a 404 without the year-long rule
- [ ] After a change to an engine file a plain reload shows it, on the test site and with `python3 dev-server.py` run from the repo root or from `template/`, without emptying the cache
- [ ] History: «Undo the last publish» reverts the last publish; the Update panel lists the files it skips

## Publishing

- [ ] Remove a news collection in Collections and publish: its `.json` and `.xml` are gone from the repo in that commit and the feed answers 404 after the deploy; a news collection changed to a kind without a feed loses its `.xml`; a collection that never had a feed publishes with no deletion
- [ ] With the request for `content/samlinger.json` blocked in the network panel, reload the editor: a toast and the Collections panel say the collections could not be read, a product block offers no «Create product catalog», and a publish of a page writes no collection file, index or deletion; lifted and reloaded, the collections are back
- [ ] After a Publish that changes a collection or a template, «Unpublished» goes off, and the next Publish of a page alone does not rewrite them
- [ ] A page titled «Samlinger» or «Collections» with an unpublished change keeps the change after a reload
- [ ] Remove a plugin and publish, then change another plugin and publish: the second goes through without deleting anything again; remove a plugin, change a file in its folder on GitHub and publish: Publish asks about the conflict and names the file
- [ ] An update or publish error with a long address or a reply from GitHub wraps inside the toast, with its × at the top

**The collection index, after the next update**

- [ ] A new site from the template: Collections shows «Nyheter» and «Produkter» and no «F», and the repo has no `content/collections.json` and no `content/samlinger/f.json`
- [ ] A site whose collections stand in both `content/samlinger.json` and `content/collections.json`: after the update Collections shows them all and the editor shows «Unpublished»; Publish lists them all in `content/samlinger.json` and deletes `content/collections.json`; on a site whose `collections.json` adds nothing, a publish of a page alone deletes it and the commit message names the page
- [ ] On such a site before the first Publish: «F» removed in Collections stays removed after a reload, and Publish deletes `content/samlinger/f.json` and `content/collections.json`; Discard drafts keeps the collections of both files; a collection created in the editor before the update stands beside the published ones, and Publish deletes no collection file
- [ ] Publish, reload at once and publish a page before the deploy finishes: that commit leaves `content/samlinger.json` alone; after the deploy, a collection removed and published does not come back after a reload

## The editor

**Keyboard and the shortcut sheet**

- [ ] Select a block and press ?: the Keyboard shortcuts sheet opens with seven groups; Esc, the × and a press outside close it, and the arrow keys then move the block without a click
- [ ] ? in the panels opens the sheet, also right after moving a slider or flipping a toggle; in a text field, a search field or a text on the page it types a ?; with a confirmation box open (deleting a page) it does nothing and Esc answers the box
- [ ] «Keyboard shortcuts» at the foot of Urd settings opens the sheet; a fresh site's setup wizard ends with the name and the colours, has «Keyboard shortcuts» left of Skip, and is as it was when the sheet closes
- [ ] The sheet in Norwegian and Turkish: every row and key name translated; a group heading's tooltip says where its keys work, and «Keep the ratio while resizing» names the blocks it holds for
- [ ] Try a few rows: Ctrl+Shift+↑ puts a block in front, Home and End in the right-click menu jump to its first and last item, Enter in the element menu's search goes to the first setting found; in a text with the toolbar Ctrl+B, Ctrl+I and Ctrl+U set and light bold, italic and underline, and do nothing in an FAQ question or a table cell
- [ ] «All calendar designs …» from the canvas menu, closed with Esc, the × or «Use»: the arrow keys work on the page again without a click
- [ ] The welcome on a fresh clone has the keys line, the search field's «?» text names /, and the user guide (English, bokmål, nynorsk) has the bullets on the area keys

**Urd settings**

- [ ] Four groups (Look and language, Editing, Window, Visitor measurement), every value readable in full, spell check as On/Off, «Editing size» showing its width and height under the Screen choice, the analytics field like the panels' fields; in a short window the card scrolls
- [ ] «Spell check in the texts» Off removes the underlines while writing, On brings them back, the Clean view shows none, the setting survives a reload, and the published page carries no spell-check attribute

**The right-click menu**

- [ ] A right click on a block opens the menu at the pointer, Settings first and Delete last, each item doing what it says; the arrows, Home, End, Escape and Tab behave and a click outside closes it; Shift+F10 and the context-menu key open it for the selected block
- [ ] Copy style and Paste style: a block of the same type takes the look with its words kept, another type only the animation, hover, size, height and fit; Ctrl+Alt+C and Ctrl+Alt+V do the same; Ctrl+Z undoes a paste
- [ ] A right click on a section's empty surface: New block here, Paste, Section settings (Properties on that section, also with another panel open), New section below, the moves, Save as template, and Delete with a second press; Shift+F10 with no block selected opens it for the active section
- [ ] A text being written, the Clean view, the phone view and the section toolbar's buttons keep the browser's own menu
- [ ] No section gets an amber outline; «1 section needs mobile review» in the top bar lands on the flagged section with its card in view in the phone view, also on a long page and at every zoom, and «Reviewed» clears it

**Tooltips, icons and search**

- [ ] Hover the labels in the Site panel's contact details, the Collections panel's entries, the element menu's Placement, an image block's settings and a section background's gradient, glow and pictures, and the up, down and remove buttons in the Footer panel, the Site panel's calendars, the FAQ, form, gallery and timeline lists and a gallery background's images: each has a tooltip in the admin's language, also in bokmål and Turkish; the mark picker's own images show their file name
- [ ] Drawn icons, never characters: the steppers' minus and plus (a text box's border thickness, a background image's size), the close and remove crosses (the colour picker on the canvas, the image editor, the admin's colour picker, the status message), the colour picker's save button and an empty mark picker
- [ ] Admin in English: «kalender» finds Calendar in the Blocks panel and the canvas block menu, «kontakt» the contact sections in «+ New section», «farge» the ribbon's colour settings, «bare tekst» the ribbon design «Text only»; admin in bokmål: «calendar» and «takvim» find «Kalender», and «size» finds the size settings, not «Normal» or «Smal skjerm»
- [ ] A word in the admin's own language comes first; «tid» in an English admin finds Timeline after three letters, and two letters find nothing through other languages; «kalender» pasted as the first search of a session shows Calendar a moment later

**Pages**

- [ ] The Pages panel: no row carries a warning triangle; a page without a description shows a small hollow dot in «Search and sharing» with a tooltip, gone once one is written
- [ ] A new page named «Café» gets the address `/cafe`

## Adding blocks and sections

- [ ] The Blocks panel: seven groups (Text, Pictures and media, Lists and facts, Events and places, Contact and sharing, Shop, Shapes and decor), each kind with its picture; a click adds the block in the view; Image opens the file chooser and adds the picture, «Gallery with images» takes several, and a picture over the size limit warns in the status line
- [ ] «All calendar designs …» in the Blocks panel opens the design picker and a design adds a calendar in it; the block search finds «Calendar», its views and a design by name («Week strip»)
- [ ] «+ New block» on a section: the search on top, the groups at the left and Text's blocks beside them, the groups in the Blocks panel's order, plugin blocks and saved block groups as groups of their own
- [ ] «+ New block» low in the window opens upward, in a short window it shrinks and scrolls inside, near the left edge it opens right of the pointer; Image, «Gallery with images» and «All calendar designs …» land the block in that section at the point double-clicked, and a cancelled file chooser adds nothing
- [ ] With a block selected, open «+ New block», click a group, then press the arrows, Delete and a letter: the arrows walk the menu, the block stays, the letter searches, Enter adds the marked row and Escape closes; double-click a section and type «quo»: the first hit is marked, Enter inserts it, and the arrows walk on from it
- [ ] Urd settings, «New block menu» set to «Slim, recent blocks first»: a slim list with the three blocks added last at the top (a cancelled «All calendar designs …» never among them); a group opens its blocks in a panel beside it on hover or tap, to the left near the window's right edge; set back, the box returns without a reload
- [ ] «+ New section» near the bottom of the view opens upward and stays inside the canvas, near the top downward, and in a short window it is shortened and scrolls; on a light theme the categories, the search text and the card names read light on the dark gallery; Escape after a category click closes it
- [ ] A new Step by step section: the numbers are plain text, the outline lists one heading per step title, and an added step gets a plain number

## The canvas

**Handles, drags and guides**

- [ ] Select an image block: eight handles, each with its direction's cursor; the top edge grows it upward keeping its bottom edge, the left edge leftward keeping its right, a corner both; the handles keep their size at every zoom; an FAQ or a form shows only the left, right and bottom-right handles; the phone view shows the corner alone
- [ ] A block cannot be pulled or dragged above the first section's top (under an overlay menu); a block in a later section can still hang above its section's top
- [ ] A small button over a large text block that stands above it in the layer order: hovering raises the button and a click selects it; Clean view shows the true order
- [ ] Drag a block's ⠿ handle past the bottom or the top of the view and hold: the page scrolls under it, the block stays under the pointer and lands where it is dropped; at the page's end the scroll stops
- [ ] A block dragged near a neighbour's edge or centre shows a line between the two, to the section's midline a line across it; three blocks at equal distances show the bands with the number; over another section the grid shows on every section, and the block moves there on release
- [ ] Shift while moving holds the axis; Ctrl (Cmd on a Mac) places freely without the grid and the lines; at 60 % zoom a snap feels as strong as at 100 %; a section's top or bottom edge or the «+ New section» bar dragged and released leaves the pointer normal, and Ctrl frees the height
- [ ] A block dragged over a section's bottom edge stays in its section and lies over the next one; dragged wholly into the next, it moves there; the same upward
- [ ] A Shift-drag of the corner on an image, a video, a shape and an icon keeps the ratio with the width on the grid; while resizing a text block or an FAQ a readout shows the width in percent and the height in px, and the last value shown is what stands
- [ ] A text block rotated to -15° and 15°: the toolbar stands upright above it, level with its outermost edge and covering none of the text, under it at the very top of the page, and follows the rotation handle
- [ ] The selection outline sits tight against a text box with a background, in the scaled preview and at browser zoom
- [ ] Zoom the canvas to about 50 % and back: the section toolbar's «Change layout» strip and its gallery, the text toolbar's lists and the custom text colour picker keep the admin panels' size on screen, and the strip stands below the section toolbar
- [ ] «Pin to screen»: a block dragged into the menu's band docks under the menu; with a side column the side docks keep clear of it; the middle row is centred in the free area; the same in the phone view
- [ ] A sticky block's «until» choice lists the sections below it
- [ ] No errors in the console while blocks are dragged back and forth

**The height that follows the content, and the block's own height**

- [ ] A change of variant or settings (an FAQ between cards and list, a calendar's design, count, switcher or «Size»): the outline follows at once, the blocks below move with it, and one undo puts the setting, the height and the blocks back
- [ ] Every calendar design in turn, with sample data and with a real feed: the outline ends where the calendar ends; a section with its own height and a calendar near its bottom changed to a taller design grows to hold it
- [ ] A long line typed into an FAQ question or a quote: the block grows, the caret stays, the blocks below move down; an FAQ answer opened, typed in and closed goes back to its closed height; on the published page an opened answer pushes the blocks below and closing brings them back, also on a phone
- [ ] The lower corner of a block whose height follows its content: a sideways arrow and the tooltip; a pull straight down or up shows the magenta «The height follows the content» mark and changes nothing; sideways it narrows or widens the block with the height following; a text or an image block follows the pointer in both directions
- [ ] The front page's top section is as tall with the editing chrome as in Clean view; its collection dragged a little keeps the section's bottom edge; dragged past it, the section keeps its height and the collection lies over the next section, in the editor, in Clean view and published; the bottom handle can make the section shorter again
- [ ] A block with a block drawn pushed down under it, dragged sideways: the lower one stays where it was shown and one Ctrl+Z restores both, also for a Shift-click set dragged by a block or by its toolbar grip and for a drag into another section; the arrow keys, «Align bottom» and «Distribute» line up by the boxes you see
- [ ] An FAQ near a section's bottom dragged narrower: the section grows during the drag and stays so
- [ ] «Height» at the top of Placement on blocks that follow their content (FAQ, stats, table, calendar), not on image, text and button: «Own height» keeps the box with a free lower handle and «Content in the box» Top, Middle and Bottom; «Stretch» on stats, countdown, quote and the calendar's list and card designs fills the box (never on a «Coming up» design); back to «Follows the content» the frame fits again; the choices undo and survive a reload
- [ ] The map on Hjem fills its frame with «Larger map» under it, on desktop and in the mobile view, and its frame resizes it; a new map from the palette and from the «Find us» preset fills its box
- [ ] A block whose content grows past a section with its own height lies over the next section in the editor; on the published page the section grows; a section without its own height grows in both
- [ ] A calendar, collection or product block published and opened on a phone in a new private window stands at its final height while it loads, and nothing below jumps; a design or count change in the desktop view carries to the phone height without a drag; on desktop a collection holds its frame while loading; a collection with no entries leaves no space under its empty state
- [ ] Collection and product cards in Clean view: the outline matches the cards; the audio block's outline is as tall as the player; an open basket drawer leaves the blocks below in place

**«Size» and narrow screens**

- [ ] «Size» (40 to 200 %) in Placement on a text, an FAQ, a collection and a calendar, not on image, video, shape, icon and map: at 150 % and 70 % the box and the text scale with the same line breaks and the blocks below move; «Smallest text» and «Largest text» hold the text while the rest scales, stand empty showing the current size while a size is set, and a value typed moves the slider; a drag of the outline keeps the percentage; the slider undoes as one step
- [ ] Under 100 %: a stylised calendar (Departure board, Tear-off pad) keeps its desktop design, as do Bento, Split card, Month with side panel, Year wheel and the ApeironLF designs; a product list and a table keep their columns, a gallery its columns, an alternating timeline its sides, and a statistic's figure shrinks with its label; dragged narrow at 100 % they take their narrow layout
- [ ] Published, on desktop and a phone, a sized block is the size the preview showed; in a window narrower than the content width «Shrink the content» keeps its line breaks down to its smallest scale, «Shrink and wrap the content» shrinks and wraps, «Wrap the content» wraps at its size, a block at 150 % shrinks from 150 %, and nothing flickers
- [ ] A square shape with «Size px» 300 takes 300 px at the content width and keeps its ratio, and a line with «Length» 500 takes 500 px; the tooltips on «Size» and «On narrower screens» read as plain words
- [ ] A narrow calendar on a wide page looks as in the mobile view; a gallery with four columns takes two in a narrow block, product cards with a fixed count two (one below 320 px), an alternating timeline below 480 px runs along the left line, and a table and a statistic in a narrow block tighten with nothing outside the box

**The phone view**

- [ ] A section with a block moved on the phone: one click on the section's reset brings the block back in sync with desktop, and Ctrl+Z brings the move back; Placement reads «As on desktop: in the reading order» for a flowing block and «pinned to row N» with the dot for a dragged one, and «Back to the reading order» lets it flow
- [ ] A pinned FAQ dragged by its corner up or down keeps its height with the stop bar shown; sideways it changes width and the readout follows

## The element menu

**The frame**

- [ ] The gear opens the menu wide: Content, Style and Placement as columns, an area without settings taking none; the head's button switches to tabs and back; Urd settings «Element menu» Narrow opens with tabs after a reload; the Properties panel is always tabs; with Properties open the floating menu never lies over the panels, and opens narrow when the wide one does not fit
- [ ] The floating menu opens beside the block (right, else left, else below, never over the block) at every zoom and in the device views; its head drags it within the window and off the panels (the search field, the width button and the cross are not drags); the next block's menu opens where it was left until «Back beside the block»; a reload starts beside the block
- [ ] Placement on any block: «On narrower screens», «Hide on mobile» and «Pin while scrolling» open at the top, «Motion» and «Placement, layer and rotation» as groups with their value
- [ ] The quick row: «Narrow screen» and «On a phone» on every block, Design and its counts on a calendar; a choice there shows in the preview at once and stays marked after the menu is closed and opened; the pin beside a setting adds it to the row, filled, for every block of that type and after a reload; the pin on a tile takes it out; «Reset the quick row» shows only while the row differs; a calendar's row changed leaves an image's row alone
- [ ] Wide menu: each label with its pin at the end of its line and the control under it ending level with the controls around it (a text's alignment, «On narrower screens», the product cards' Columns, a button's «Goes to», a video's source, an icon's size and colour, a shape's colour and thickness, a table's lines, a form's sending mode, an image's fit and corners, a gallery's columns, the max count of a collection and a calendar, a map's zoom); the calendar's Design, Design on a phone and Pop-up rows keep their pins inside the row border, and a click on the pin pins without opening the picker; a ribbon's «Motion» over its dropdown
- [ ] The choice pill slides to the new choice in the quick tiles, the Content, Style and Placement tabs and a choice inside a group; with reduced motion it moves at once
- [ ] The narrow menu («><»): quick tiles two to a row with every label on one line, a tile of three choices on the whole row, the calendar's fourth tile on a second row at half width; the tab's area a card with spaced groups; labels over their controls, «Edit the text» across, «Inherit from theme» in full; the same in the Properties panel; with the focus on a group's head, 2, 3 and 1 switch the tab and keep the focus on it

**Groups and marks**

- [ ] The calendar's menu with everything closed shows group rows with their values; a group left open stays open for the next block in every menu form; a block whose area holds one group opens it at the first showing, and a group closed by hand stays closed for the session
- [ ] A setting at its default shows no dot, switches and numbers a dimmed «Default: …» line; a changed setting gets the amber dot and its reset, its group a dot and «Reset this group»; the row's reset puts that one back, the group's all of them, and one undo brings them back; colour settings that fall back to the theme say «Back to the theme's»; the rows look alike in the narrow and wide menu, Properties, the floating menu and the search's copy
- [ ] Table, quote, statistic, FAQ, timeline, form, collection, product, cart, checkout, Links, countdown, audio and map: every setting stands in a group with the right closed value, the pins reach the quick row, and no divider line ends a Style area
- [ ] A second click on a selected table cell, a statistic's number or label, a quote and a timeline's year, title or text puts the caret there with the text cursor; the first click still selects and drags
- [ ] «Reset the texts» shows under Content only after a text in the block was rewritten
- [ ] The calendar's colours in Style as swatches in rows with the name under each, three across wide and five narrow, the clear button on the swatch's corner

**The search and the keys**

- [ ] The calendar's menu, «clock»: only «Clock» with «View and count» open, Style and Placement saying nothing matches; «colour» opens Colours, Edge stripe and Text fields; «size» shows «Text fields» with the field picker; two words in any order find the same; a group's name shows the whole group; a gallery or a form is found by a word from its labels or tooltips
- [ ] Esc empties the field, a second Esc closes the menu; emptying the field brings back the groups and the tab as they were left; the narrow menu shows the three areas under each other while searching; the search over the menu in Properties narrows that menu alone, and another block empties it; a setting hidden by its switch («The week starts») stays hidden until a word finds it; a word typed closes the design picker
- [ ] A block selected on the canvas: 1, 2 and 3 open Content, Style and Placement in Properties or switch the floating menu's area; the arrows, Delete and Shift+F10 work right after the click with no focus ring on the block; a second click gives the caret
- [ ] The floating menu opens with the focus in its search: typing searches, 1, 2 and 3 in the empty field choose the area and a digit is typed when the field holds words, / goes to the menu's own field; in the wide menu an area key scrolls its column into view and focuses its first head; a digit in a number field or in text switches nothing; no key caps anywhere, the dimmed / hidden while the field holds words

## The design picker

- [ ] Every block with more than one look has a Design row under Style and a Design tile in the quick row (Contact details, Gallery, Statistic, Collection, Countdown, Ribbon, FAQ, Timeline, Quote, Links, Basket, Button, Shape and Calendar); a setting pinned to the quick row before (Gallery's View, Button's Style, the Variant of Quote, Statistic, FAQ, Timeline and Links, Collection's and Basket's View) is still pinned and opens the picker
- [ ] The picker: a picture of each design in its own proportions on the dark tile; the search finds a design by name and says when none matches; «In use» marks the current one; the preview shows the block's own content at its real width, with sample content for a gallery without pictures, a contact block without details and a calendar without a feed (a calendar with a feed shows its own events), and a draft collection for a collection block; «Use this design» applies and closes, Escape closes without a change, and the editor's own preview is untouched by the picker's
- [ ] A click outside the card closes the picker; a click inside it, or a drag from inside out, keeps it open; opened from the floating menu, its cross, a tile press and Escape leave the menu open
- [ ] Calendar: the design, the phone design and the card pickers with their pictures, the view filter (Month: Plain, Month with side panel, Overview on cream), and «About the design» and «What you can change» (Colours, Text and Options, a row left out when empty) reading right in nb, en-GB and tr; the open card in the card preview
- [ ] The contact designs stand in four families (Lists, Boxes, Actions, Bold), and every design's description reads right in nb, en-GB and tr

## Sections

- [ ] Properties for a section: six closed groups (Height and grid, Section theme, Link target, Background, Edge shapes, Motion) with their values («Glow · Grain · Image», «None», «#priser»); a group left open is open after a reload, and a change shows in its closed group at once («Wave», an entrance's name, «Grid 24 px»)
- [ ] Background in Properties, Nav and Footer: each layer a row with its type, arrows and cross, and its arrow opens its settings; «+ Add layer» arrives open; a moved layer keeps open or closed; removing one leaves the others as they were
- [ ] Pattern layer: dots over the section; each of the eight patterns draws without a seam; with a theme colour it follows a palette change and the light and dark button without a reload, an own colour stays; Size, Strength and Angle grow, fade and turn it, still covering the section at 45 degrees; Invert fills the surface with the pattern cut out; also as a layer on the menu and the footer
- [ ] Edge shapes: each of the five shapes as Bottom edge at the section's foot in the chosen colour, over the background and under the blocks, and upside down as Top edge, both on one section; Height, Mirror and Invert follow and show only once an edge has a shape, and None removes it
- [ ] A divider in the next section's colour shows no hairline at the seam at 100 % and at a fractional zoom; on a phone it is lower and spans the width; blocks at the foot of a section with a divider can be clicked and dragged; a section with the inverse theme and a default-coloured wave at the bottom shows it in the page's background colour
- [ ] The Kaker page has a wave at the first section's foot, the Kontakt page a faint dot pattern; a section preset's thumbnail with a pattern layer draws without it and without an error

## Links and spots on a page

**The link editor**

- [ ] A button's «Goes to» and its quick tile open the link window: Page, Web address, Email, Phone and File as a radio list on the left (the arrow keys move between them), the right side holding only the chosen kind's fields, the box as tall as the fields; «kak» finds Kaker, and Kaker lists «A spot on the page» (the top, «Section 1 · …», «Section 2 · Video #video» and the named block); «Use this link» stores it and the field shows «Kaker › #video»
- [ ] «Open link in new tab» in the header opens the published link in a new tab and is greyed with a tooltip for Email and Phone; «Ask search engines not to follow it» and «Paid or sponsored link» show only for a web address and set rel="nofollow" or rel="sponsored"; `www.example.org` is stored as `https://www.example.org`, and `javascript:…` is refused; Escape, the cross and a click beside close without a change, and Enter uses the link
- [ ] Urd settings, Link editor «Beside the field»: a small box under the field (above it when the field stands low) with one search over pages and spots («sec 2» finds every page's second section) and the chosen page's spots under the results; Escape, a click outside and a click in the preview close it with the focus back on the field; Ctrl+K in text and the block menu's row still open the window
- [ ] Every link field opens the same window: an image (a Phone link makes it call, and a link hides «Full screen on click»), a gallery picture (an Email link with a subject), the cart block and the menu's cart (pages only), the calendar's announcement, the Links block and the Site panel's links (a page link kept as the page's address), a menu item, a submenu item, a launcher shortcut and the announcement bar, the footer's column links, bottom line, link row and call to action, and a collection entry (whose published title goes there, and «Export CSV» writes the page's address)
- [ ] A menu item with a submenu can have no link («No link (only opens the submenu)») and opens its submenu; an item without a submenu offers no «Remove the link»
- [ ] Text: select words and press the link button or Ctrl+K: choosing «Om oss» makes a link that still works after Om oss changes address; Ctrl+K on a link edits it, Ctrl+Shift+K removes it; selected `post@apeiron.no` opens on Email with the address filled in, a selected phone number on Phone
- [ ] Published, the button to Kaker's video section and the example footer's «Bli med» to «Meld deg inn» still land after Kaker's address is changed in the Pages panel; «Kakevideoen» (typed `/kaker#sec-…`) shows «Kaker › #video» and opens with both chosen; «Urd på GitHub» opens in a new tab
- [ ] The cart drawer's «Go to checkout» goes to the checkout page from the menu's cart and the Cart block, and in the editor switches to that page; the calendar's announcement and programme links go where they point

**Spots on a page**

- [ ] Published in a new tab, `/kaker#video`, `/kaker#sec-4c908354`, `/kaker#meld-deg-inn` and `/kaker#blk-b35fc0b9` land with the spot right under the menu once the page has loaded, the address showing the name; with «Hide, show on scroll up» the menu stays in view during the jump and hides on a scroll down after; with «Shrink the menu» the spot lands under the shrunk menu; a menu that does not stick puts it at the window's top, the side column at the top or under a strip fixed across the page
- [ ] With reduced motion an in-page link jumps without animation; the phone's dropdown, full-screen menu and launcher close when a link on them goes to a spot on the page; the back button returns to where you were, a reload keeps the place, and scrolling while a calendar or collection above the spot loads is never undone
- [ ] Editor: a menu or footer link in the preview to another page's spot switches to that page and scrolls to the spot
- [ ] Section Properties, «Link name»: offers a name from the first heading as a small underlined «Name it «…»» link; «Priser» is stored as `priser`; a name another spot on the page has is refused with «Another spot on this page has this name»; emptying it removes the name; the section's toolbar shows `#priser`; the copy button copies the whole link (or the id without a name) and the toast shows it
- [ ] A block's Placement, «Link target»: the same field; a named block hidden on phones shows the dotted «Hide on mobile» mark with its tooltip, and at phone width a link to it lands on its section; Ctrl+C/Ctrl+V and Ctrl+D give a block without the name; a named section saved as a template and inserted on the same page arrives as `priser-2`, and a template with a button to its own heading inserted twice links each copy to its own heading
- [ ] A footer link to a spot on Kaker, then that section deleted: «Kaker › the spot is gone» in amber with a warning sign; a menu item to a deleted page shows «The page is gone»; a site link `/gammel-side` shows «No page at /gammel-side»; links to `/media/` files, to `/admin` and `/kaker?ref=nyhetsbrev` show no warning
- [ ] Kaker's video section, Link target: «Links here» lists the footer's «Kakevideoen» and any button to it, and a link added or removed (also in a text on the page) shows at once; a button's entry selects it, a menu or footer entry opens its panel
- [ ] Footer panel, Columns and Link row: each link's name and its up, down and remove buttons on one line as tall as the name, the link field under them; Site panel, Links: the icon and the name, then the link field; the words in every link field start at the left

**Links to files**

- [ ] «Goes to», File: the site's files in `media/` that are not pictures; «Upload a PDF» lists it first with «Not published yet»; an HTML file renamed .pdf or a PDF over 15 MB is refused with a message, one over 4 MB taken with a warning; a 5 MB PDF on a page with no other change shows the storage message and keeps «Unpublished» on, and Publish writes the page and the PDF
- [ ] Published with «Download instead of opening»: the repo gets `media/<name>-<hash>.pdf`, the field shows that name, and the button saves the file (two buttons to one PDF give one file); without it the PDF opens in the browser, with «Open in a new tab» in a new tab; the footer's call to action and the example footer's «Last ned logoen» save their files; hovering a link to a PDF fetches nothing ahead
- [ ] Text, Ctrl+K, File: the published files and no «Upload a PDF»; «Download instead of opening» makes the words save the file

## Navigation

**The Nav panel**

- [ ] The Nav panel closed: Menu items, Logo, Layout and size, Colours and frame, Mobile, Scrolling and pages, Tools and Announcement, none with a fold inside; a setting changed in each survives a reload, and «Discard drafts» takes it back; scrolled with several groups open after a few segment clicks, nothing is drawn twice
- [ ] Menu items: a closed row shows the name, the link's words and marks for a button look, a description and a submenu; a click opens the card with a slide, one at a time; the arrows move the row; the head drags a top-level or submenu row, dimmed in place with a clone where it lands; a second-level row has no grip and orders by its arrows; a long name and its link read well side by side, and the arrows show on hover, after Tab and always on a touch screen
- [ ] Empty a menu item's name and click elsewhere: it becomes the linked page's title, also on a submenu item
- [ ] With a submenu in the menu, the Submenu part shows Design, «Opens» one option to a row, the pill colour (Pill items only) and Columns 1 to 4; without one the part is gone
- [ ] Layout and size: the six menu forms, then Thickness, Text size, Side padding and Item spacing at once, the side column hiding thickness, padding and spacing; Colours and frame: with «Transparent at the top of the page» on, «Shown once the page scrolls» stands under Background, and an uploaded background picture shows once the page is scrolled; the side column hides the note and Frame
- [ ] Mobile: «The bar» with Thickness, Text size, Size, Border, Menu placement, Tool buttons and the two Same/On/Off choices, then «The menu» with the burgers four to a row and the full-screen menu's switches and surface; «Align to content width» Off draws the phone bar to the window edge while desktop keeps its own
- [ ] The burger tiles (three lines, two lines, three dots, nine dots) redraw the burger; «Show the word beside the drawing» adds «Menu» in the site's language and offers a fifth tile «No drawing»; an own word replaces it and a screen reader reads it
- [ ] Scrolling and pages: the «When scrolling» card, then the pages two to a row with a long title cut with «…»; the side column shows the pages alone
- [ ] Tools: the link launcher as a card with «Show in the menu» first and its settings once it is on; the links tool off by default, and on it shows the site's links as icons in the cluster and in the mobile sheet with their names; the cart's currency word shows after the prices in the menu's cart drawer
- [ ] The launcher with a long shortcut name: the panel keeps its width; «Long names» «Cut with …» ends it with «…» shown whole on hover, «Onto more lines» folds it, also in the list and image card designs and the mobile menu; Size from Small to Extra large scales the panel, the icons and the names together; Panel width, Icon size and Text size change their part alone, an emptied field follows the size again, and a very small panel keeps its icons inside the tiles
- [ ] «Show the strip again», with the Nav panel opened before the preview has loaded or after a preview reload, brings a dismissed announcement back

**The menu on the page**

- [ ] A top-level item with Look set to Button is an accent pill in the bar and a centred full-width row in both mobile menus and the column, under every hover style; a submenu item's description is a second line in the submenu and the mobile menus, never in the bar
- [ ] An item under a submenu item: on desktop with card, flat, pills or lines and one column it opens beside the panel on the outer side by hover and by click; Tab to the arrows and Enter opens, Escape closes the inner level and then the outer, and closing the outer closes the inner; with Submenu columns 2 or the flyout, the item with items is a bold heading with its entries under it, open, its arrow gone and skipped by Tab, and a description under it wraps in its column
- [ ] Phone width: with «Closed» submenus a tap on the parent opens its list with the parent's own page first and a tap on the item with items opens the nested list, the outer staying open; with «Open from the start» every level is open; in the panel, the full-screen sheet and the side column
- [ ] «Show nav on pages»: an unticked page has no menu or strip and starts at the top, redrawn at once when switching pages; «On the pages without it» offers Hidden, Pointer at the top (the bar slides in at the top edge and leaves shortly after), Ghost at the top (faint at the edge, solid once the pointer rests on it or clicks it) and Pull tab (a click opens and closes the bar, hovering the tab opens it, Escape and a click outside close it); Tab into the bar brings it in; a phone shows the tab for Pointer and Ghost too
- [ ] Pull tab, Own design: an icon or an uploaded image, a word and the two colours on the published tab; Default draws the burger lines in the menu's surface; the example site's checkout page has no menu and a pull tab, the other pages unchanged; a menu without the new fields renders as before (one-level submenus, the three-line burger, the menu on every page)

## Footer

- [ ] Footer panel, Design: the row shows the current design, and «Choose design» opens the picker with Standard, Chapters and Split, each with a picture and a description; the preview shows the site's own footer without the menu (a sample brand and two columns of the site's pages when it has none, never written into the footer); «Use this design» keeps every column, link and text, and Standard clears it again
- [ ] Chapters: the brand on its own row, the columns numbered 01, 02, 03 under a rule each, two columns on a phone; Split: the brand with its button on a tinted half and the columns in the other, the brand on top on a phone; both in a dark theme and with a footer background layer
- [ ] In Minimal, Columns, Chapters, Split, Big CTA, Contact and the plain text footer: the bottom line shows the legal line, and the address, phone and email show as a Contact column (one centred row in Big CTA and the plain footer) with phone and email as links and the street kept with the postcode and town; at phone width the Contact column moves below like the link columns and the plain footer's row wraps
- [ ] Footer panel, Contact details: «Show the legal line» and «Show the address, phone and email» each hide only their part and show only when there is something to hide, and «Edit the contact details» opens the Site panel with the group open; applying a footer template turns both back on
- [ ] The site's links row in the footer with the names spoken; «Show the site's links» in the Footer panel takes it out

## The Site panel and contact details

- [ ] The Site panel: the name, the description, the language, the time zone and the map service at the top, Shop currency in the Shop group, the own meeting addresses at the foot of Calendars; every field's label above it at full width with nothing wrapping; Description grows with its text, Enter adds no line break (also in Firefox), and it keeps its height after Ctrl+Z
- [ ] Site panel, Links: a link with a library icon and one with an own uploaded image, with and without a label, moved and removed; «+ New link» puts the caret in the label; a site from before keeps its old footer links as site links with the brand names
- [ ] An own icon from an animated GIF becomes a small still icon; a GIF over 4 MB is too large
- [ ] Contact details, Country: 57 countries named in the admin language and «Other country» last; a new site starts on its language's country (Norway for bokmål); picking the same country keeps the numbers and another clears them, a picked country stays when its last field is emptied; «Other country» shows «The number's name», «Number» and «VAT number»; Ctrl+Z takes back a typed field in one step
- [ ] Norway: 974 760 673 is shown as «974 760 673»; 974 760 674 is refused with the red note, announced as invalid by a screen reader; 12345 gives «The number is not in the form the country writes it»; Register offers Enhetsregisteret, Foretaksregisteret and Frivillighetsregisteret, and «Registered for VAT» follows; Iceland 540269-6039 is saved with the grey note; Germany: Number type offers five registers, only the chosen one has a field, switching clears it, «12345 B» as a Vereinsregister number becomes «VR 12345 B», and the Register court and USt-IdNr. appear once needed
- [ ] The legal line in the footer: «Apeiron Linjeforening · Org.nr. 974 760 673 MVA · Foretaksregisteret»; Germany «Vereinsregister: Amtsgericht Berlin-Charlottenburg, VR 12345 B» and «USt-IdNr. DE259582878»; Switzerland with HR and VAT «UID CHE-135.626.465 HR/MWST»; a representative last («Representative» in en-GB, «Temsilci» in tr); «Other country» with a VAT number «Mva-nr. …» («VAT no.» in en-GB); with an empty court or register the line still reads cleanly («Vereinsregister: VR 12345 B», «Company No. 07510759»)
- [ ] Published: `content/site.json` holds the contact group, the live footer matches the preview, and the `application/ld+json` has `legalName`, `iso6523Code` 0192:974760673, `vatID`, the address and a `ContactPoint` for each contact point with a phone or a valid email
- [ ] On the published site, signed in: «Find on the map» under the address stores the point and shows «On the map: lat, lon» with a remove button, and a changed address removes the point; locally the lookup says it could not be reached
- [ ] Contact points: «Add a contact point» gives Role, Email, Phone and Note, with a remove button as tall as the field

## Text, pictures and media

- [ ] A text block's Content: «Edit the text» opens the words with the text toolbar while the menu steps aside; a font for the whole text applies to every word and «Inherit from theme» takes it back; a size typed applies to every word and an empty field gives the theme's size back; the toolbar's own font and size still apply to a selection alone
- [ ] Published: an image with «Full screen on click» is reached with Tab with a visible focus ring, named by its alt text and «Show the picture full screen» as a button, and opened by Enter and Space; a picture with a link keeps the link and no lightbox; in the editor it is not in the Tab order
- [ ] An animated GIF, WebP and APNG uploaded as an image, in a gallery, as a background and as a quote portrait move in the preview and on the published page, ending in .gif, .webp and .png in media/; a still PNG, JPG and WebP become webp; an animation of 1 to 4 MB is kept with a status line about its size, one over 4 MB refused with the size and the limit, in the panel and in the image editor
- [ ] Video block, Source File, an mp4: the film with the browser's controls, a click selects it in the editor and plays it in Clean view; a poster stands until play; Loop loops it; Muted with «Start by itself» starts silently on the published page and waits for play with reduced motion; with Muted off «Start by itself» is gone and the film waits
- [ ] A video file over 15 MB is refused, one over 4 MB warns, and a .mov or .avi is refused with the format message; published, the file and its poster land in media/ and play from there; a YouTube or Vimeo link block still embeds with Source Link; an empty or unrecognised address shows a hint in the editor and nothing on the published page, and a file video without a film shows nothing
- [ ] Gallery, View Mosaic with about nine pictures: a wall without holes at 2, 3, 4 and 6 columns and two on a phone; Row height from 80 to 400 follows, with the block growing; Shuffle (also in the scatter view) makes another wall that survives a reload and a publish
- [ ] Gallery, View Polaroid: white cards with a wider foot, each leaning its own way; Lean 0 stands them straight and hides Shuffle; Frame colour with a theme or an own colour, and the clear button back to white; «Image text on the card» shows the description; published, a card straightens and lifts under the mouse, and a click opens the lightbox or follows its link
- [ ] Both gallery views: a click on a tile with the chrome on opens the image editor, and Rounding and the gap apply; a gallery block and an image gallery background in Mosaic on one page keep their own row heights and gaps
- [ ] A ribbon and a gallery in band view: «Content width» spans the content, «The whole page width» runs from edge to edge, «Own width» keeps the block's box, following a resized window and a «Size» under 100 %; a new ribbon starts at «Content width»; dragging a gallery band's height changes the band and its pictures while held, «Band height» moves the block's edge, and a phone keeps the desktop height; a page made before looks as it did
- [ ] The pause button at the band's right edge pauses and plays a ribbon, a gallery band and the calendar's Band design («Pause the band», «Play the band» in the site's language) and survives an edit of the words; with «Pause» set to «Touch» or «Pointer and touch» it hides until it gets keyboard focus, a touch on the band pauses it and a tap on empty space plays again; a gallery's slides show the button at the foot, a step on an arrow or a dot stops the advance for good, and the pointer over the show holds it; with reduced motion nothing moves and no button is drawn

## Other blocks

- [ ] Statistic designs Plain, Card and Band (the band in the accent with readable text), three in a row with one design standing as one strip, and an older statistic still counting up; Quote «As a card» with an accent line on top, not offered for the short design; FAQ List as bare rows with rules opening as before, its «Card style» settings hidden until Card; a line with «Text on the line» in the middle in the line's colour and thickness, gone when emptied, not offered for an arrow, also rotated and on a phone
- [ ] A timeline's events in the menu: the year with its up, down and remove buttons on one line, the title across under it and the text under that, each landing in the timeline
- [ ] A shape's «Filled» on a circle or rectangle follows the colour, and unticked the stroke and thickness return; a line and an arrow offer no «Filled», a filled circle no «Thickness»; a shape filled before keeps its colour
- [ ] A form in mailto mode says after sending that the mail program has opened the message (nb, en-GB, tr); in endpoint mode the receipt text or «sent» shows, and its field shows only in that mode; a new form has the field ids `name`, `email` and `message`, and an endpoint gets both `page` and `side`; an older form keeps its ids
- [ ] The map block's help chip names the zoom on its third line, in nb, nn, en-GB, se and tr
- [ ] The Links block from the Blocks panel shows the site's links at once, its tooltip describing a row of links; the site's links first, each switchable off for the block, then its own list with the icon library and an own image; a page link, an external one in a new tab and a mailto, followed with one click in Clean view and by the second click while editing; «Edit the site's links» opens the Site panel at Links; a page with the old share buttons shows the site's links; publishing writes own icons to media/
- [ ] An icon block's glyph picker, and a mark picker's Icons tab: typing goes to the search at once; «hjerte» in an English admin gives the heart icon and the hearts, «pil» the arrows, an emptied field the categories; the first hit is marked, the arrows move the mark by cell and row, Enter chooses and closes, and with an empty field Down starts at the chosen glyph

**Contact details**

- [ ] Blocks panel, «Contact details»: with no details typed the editor says where to type them and the published page shows nothing; Name, Address, Phone, Email and Legal line show and hide their parts; «Edit the contact details» opens the Site panel at Contact details; the «Contact» section template gives a heading and the block with no sample address
- [ ] Each of the eleven designs (Lines, Icon rows, Card, Three tiles, Fact list, Action buttons, With a map, Contact strip, Poster, By role, With a QR code) at desktop width, in the phone view and in a narrow frame: phone and email call and write, and Directions (Action buttons, With a map) opens the map service with the address; «Coloured band» shows only on Contact strip
- [ ] «Add to contacts button» downloads `<name>.vcf`, which a phone's contacts app imports; the QR code reads as a contact on a light and a dark theme; with the phone switched off neither carries the number, and with Address off «With a map» draws no map point
- [ ] «Call bar on phones»: Call, Email and Map stay at the bottom while scrolling with the page's last line clear of them, two blocks give one bar, and desktop has none; With a map: no OpenStreetMap request before «Show map» (DevTools Network), then the point; without a point the published page shows the details alone and the editor says where the point is found
- [ ] By role: a card per contact point and the site's phone and email as «General»; a point with only a role is not shown
- [ ] A screen reader reads the block as an address, the QR code as «QR code with the contact details», and the call bar as a navigation named «Contact»

## Collections

- [ ] The Collections panel: News and Products as rows with their kind and count; a click opens a collection with a grow and closes it with a shrink, and two can stand open together; no line at the left edge anywhere (the panel selector, the Pages panel, the rows)
- [ ] Entries as cards like the Nav panel's items: the grip, the title and the date or price, the arrows on hover, after Tab reaches the row's chevron, and always on a touch screen; an entry opens with a grow
- [ ] Drag a product by its head: a dashed clone shows where it lands, any part of the dragged box over another row is enough, Escape cancels, one Ctrl+Z puts it back, and the new order shows on the Shop page
- [ ] News: dated entries newest first with no grip or arrows (the tooltip says why); a new entry gets today's date and lands first; an undated entry moves among the undated ones
- [ ] An open product: the picture at 112 px with «Change image» and «Remove image» and the «Alt text» field, which matches the image editor's on the canvas both ways; Price, Member price and Badge on one grid; the sizes as chips, several added at once divided by commas with Enter and each taken away with its ×; the colours across the card, each with its picture button
- [ ] «+ Colour» at the top adds a colour first in the list with its name selected; a name another colour has too is framed in amber with a warning sign and a tooltip
- [ ] «Export CSV» and the import back keep a collection's entries
- [ ] Select a product cards block and click a card's price: the Collections panel opens on that product with the price focused; the badge, a size chip and the picture open the same entry; the title still takes typing and the buy button still fills the basket; on an unselected block the first click only selects

## The shop

- [ ] Product cards: title, text, price, chips and «Add to basket» at one height across a row; a card without colours leaves that row empty; a card's red request line never stretches another card's chips; the «+ Product» card stretches nothing; the cards never run into the section below
- [ ] A product with a picture and a badge: the badge just inside the picture's top left corner
- [ ] A product card under the mouse keeps its picture; a mouse resting on a colour chip with a picture shows it, and leaving gives the chosen one back; a tap on a phone chooses without a preview; two colours with the same name each show their own picture and are pressed on their own
- [ ] «A size must be chosen» under Sizes and «A colour must be chosen» under Colours, each only while the product has them; «Grey out «Add to basket» until chosen» indented under the first requirement that is on
- [ ] Shop page, a product that requires a size: «Add to basket» without one adds nothing, frames the sizes in red with «Choose a size» and puts the focus on the first size; with «Grey out» on, the button is greyed with the missing choice in its tooltip until it is chosen; the quick view behaves the same
- [ ] Shop page: each card's title is an h3 in the outline whose words are a button looking like the heading; a screen reader names the picture and that button «Se Sjokoladekake»; the quick view opens by click, Enter and Space, with a focus ring on both
- [ ] Product cards: Columns and Max count stand empty with «Auto» and «All» (also the Columns quick tile and the Grid group's value), 3 gives three columns, emptied back to «Auto», 0 or 9 give «Auto» or 6; a collection list's Max count shows 6, and emptied it reads «All» and shows every entry
- [ ] The product cards block's menu: «+ New product» and «Edit the product catalogue» stacked, each on one line, the second opening Collections with the catalogue open, also after it was folded; the Shop group's «Go to the checkout page» switches to the page with the checkout (or scrolls to it on the same page), and «Shop currency» opens the Site panel's Shop group with the field focused; with no catalogue the canvas says so, and «Choose the catalogue» opens the Catalogue group
- [ ] The checkout block's Shop group: «Edit the product catalogue», «Go to the shop page» and «Shop currency», each going where it says; on a site without product cards «Go to the shop page» says no page has them yet
- [ ] The basket drawer (the menu's basket and the basket block): «Empty the basket» under the lines asks «Empty the whole basket?»; «Keep it» keeps everything with the focus back on the button, «Empty it» shows the empty state, sets the count to 0 and puts the focus on the close button
- [ ] With something in the basket, the floating basket's «Til kassen» goes where the menu's basket goes, or to the basket block's own checkout page, which its Checkout group names
- [ ] Checkout with products: the order in one line with the total right above the buttons, after the contact fields, with the summary still at the top; emptied in another tab the line goes, and comes back with a product; a payment line stands above the summary, never between it and the buttons; at phone width the summary and the buttons stay together and wrap without overlapping
- [ ] The order button reads «Bekreft kjøp» in bokmål, nynorsk and Sami, «Confirm purchase» in English, «Satın almayı onayla» in Turkish and «Bekräfta köp» with the Swedish pack; the help chip says why its text is fixed, in nb, en-GB, tr and sv; a screen reader reads the order and the total with each button
- [ ] Under the order buttons «Seller:» with the name, organisation number, address, phone and email; «Show the seller» in the menu hides it; at phone width it wraps cleanly

**The order confirmation**

- [ ] An order through the endpoint and one through the email draft: «Ordrebekreftelse» above the form with the date, the lines and the total, the buyer, the chosen payment instruction, the seller's details, the right-of-withdrawal note and the standard withdrawal form with the seller and the order date filled in; after a Vipps, card or PayPal payment it names the payment («Betalt med Vipps») and the reference
- [ ] «Skriv ut» prints the confirmation alone, black on white, without the menu, form or button, and the page is as before afterwards; a refresh keeps it, a new order replaces it, a new tab shows none; the email draft ends with a «Selger» line; on an English site the heading reads «Order confirmation» and the form uses the directive's English words

## Payments

**For every provider**

- [ ] A site made before the payments setting: the checkout renders its Vipps button and number line as before, and the Payment group shows Vipps on with the number as the first instruction
- [ ] Site panel, Shop currency: DKK or EUR shows kr or € on the checkout and the basket while a provider is on; a value that is not three letters marks the field; empty is NOK
- [ ] Element menu, Payment: the «Pay with Vipps» button, Card payment (Off, Card page at Vipps, Stripe) and «Pay with PayPal» under it; Take the money shows only with Stripe, its tooltip saying PayPal takes the money at the order; the Vipps tooltip names the setup guide and the capture in the portal; the quick tile toggles Vipps, and a pinned PayPal joins the quick row
- [ ] The checkout's menu wide: two columns, «Pay with Vipps» on one line beside its toggle, the card choice on one row, the Payment group's title, its orange mark and its value apart, Endpoint (URL) lined up with Recipient email and Currency word, «Reset this group» at the left; the toggles end at the right edge with their pins left of them; narrow: Vipps, Narrow screen and On a phone in one row with nothing cut off; in Placement «Hide on mobile» and «Pin while scrolling» line up
- [ ] Payment instructions: three (Vipps with a number, Bank with an account, one with a text only) give «Betaling» with three radios above the summary, none chosen; «Bekreft kjøp» without a choice asks «Velg hvordan du vil betale.» and sends nothing; chosen, the email draft has a «Betaling» line and the status repeats it, and an endpoint gets `payment` with the name and the text; a single instruction stands as a line; the group's closed value counts them while no provider is on; at phone width the radios wrap within the block
- [ ] Every provider on a deployed site with test keys: «Bekreft kjøp», «Betal med Vipps», «Betal med kort» and «Betal med PayPal» in that order; each opens its provider with the catalogue's total in the shop currency, and each return empties the basket and thanks the buyer only after that provider confirms
- [ ] Without a provider's secrets its button answers «Betaling er ikke satt opp for denne siden ennå», on a host without functions as well, while the other buttons and «Bekreft kjøp» work; in the editor a click on a pay button says the provider is set up, set up on test keys, not set up (naming the setup guide), or that the functions do not answer locally, and «Bekreft kjøp» says orders are sent from the published page only
- [ ] The published checkout with test keys shows the dashed «Test mode» line naming those providers; with live keys no line
- [ ] «Test the payment» under the providers, with an empty basket: a new tab opens the checkout with the pay buttons as set in the editor, the amber mark saying the changes show in this browser only, and the first published product in the basket, the status line saying what was done; `/checkout/?draft=1` in another browser or after «Discard drafts» shows the published page; a blocked pop-up is reported in the status line; on the deployed site with test keys each pay button reaches its provider's test page, the return lands on the draft view and empties the basket, and «Cancel» comes back with the basket kept
- [ ] The checkout page opened with `?ordered=1`, or with someone else's return address, leaves the basket, shows no message and drops the parameter; a basket edited in storage with a variant the product does not have («XL · Lilla») is refused with the could-not-send message, while a real variant pays and shows on the receipt
- [ ] A paid return whose function fails at first (`/api/pay/vipps/session` blocked once in the network panel): the address keeps `?ordered=…`, the page asks again within seconds and empties the basket once answered; a reload while open asks once more; locally without functions a return leaves the basket and shows no error

**Vipps**

- [ ] With the test sales unit's keys and `VIPPS_API_BASE=https://apitest.vipps.no` (setup guide section 5): «Pay with Vipps» opens the Vipps MT app (a phone) or the number dialog (a desktop); the test user shares name, email and phone and approves; back on the checkout the basket is empty and the buyer is thanked by name, and a reload shows no second message
- [ ] In the Vipps portal: reserved, not captured, with the order lines and the contact fields in the description, the receipt with the lines in the test app, and the capture goes through; a seller with «Registered for VAT» pays without the receipt in the app
- [ ] A payment aborted in the app keeps the basket, shows no thank-you and drops `?ordered=`; with the contact fields empty Vipps still pays, while «Bekreft kjøp» still asks for the name and the email
- [ ] The webhook registered with `VIPPS_WEBHOOK_SECRET`: the deliveries get 200 in the portal's log, and a POST to `/api/pay/vipps/webhook` without the headers gets 401
- [ ] «Card page at Vipps» with production keys: «Pay with card» opens Vipps's card page with the total, and the return empties the basket (a production check with a small amount, refunded in the portal)
- [ ] A product collection created in the editor and published is paid for through Vipps on a deployed site

**Stripe**

- [ ] A sandbox restricted key (Checkout Sessions Write, Payment Intents Read) in `STRIPE_SECRET_KEY` and Card payment set to Stripe (setup guide, section 5): the key's request log shows no refused call, and «Pay with card» opens Stripe's page with the lines and the total in the shop currency, in the site's language; Apple Pay or Google Pay switched on in the dashboard shows on a device that has it
- [ ] The card 4242 4242 4242 4242: the basket empties and the buyer is thanked by the name typed on Stripe's page; the payment is Uncaptured with «When I ship» (Capture in the dashboard goes through) and Succeeded with «At the order»; 4000 0000 0000 9995 declines; «Back» returns with the basket kept and no thank-you
- [ ] The webhook destination with `checkout.session.completed` and `STRIPE_WEBHOOK_SECRET`: the deliveries stand as delivered (200), and a POST without the signature gets 401

**PayPal**

- [ ] With the sandbox app's keys and `PAYPAL_API_BASE=https://api-m.sandbox.paypal.com` (setup guide, section 5): «Pay with PayPal» opens PayPal with the order's lines, the total in the shop currency and the site's name; with the personal sandbox account the basket empties and the buyer is thanked by name, the business account shows the payment completed, and the address drops `token` and `PayerID`; a refresh right after captures nothing twice; «Cancel» returns with the basket kept and no thank-you
- [ ] Shop currency ISK: «Pay with PayPal» answers with the unavailable text and nothing is created at PayPal
- [ ] The webhook with `PAYMENT.CAPTURE.COMPLETED` and `PAYPAL_WEBHOOK_ID`: the deliveries stand as delivered in the app's events, and a POST without PayPal's headers gets 401

## The calendar

**Adding a calendar**

- [ ] The section templates «What is on», «What is on: cards», «month», «week» and «next» each give a heading and a calendar in that view, inside the section
- [ ] A new calendar from the palette, the block menu or a section template: no category filter, subscribe or «Sign up» buttons until switched on, and no «changed» dot on its view group; a «Coming up» design chosen on it shows three events in the card and three under «Later», while a calendar whose counts were set keeps them; a new Index cards calendar shows four, one at six switched to Index cards shows four, one at five keeps five
- [ ] The parser (ics.js) is fetched only on a page with a calendar, after the page has rendered (the Network panel); the help chip's last line says the texts are rewritten by clicking them and that Style sets the colours, the stripe and the font per field, and Clean view hides the chip
- [ ] A calendar without sources grows with its sample data in the preview and pushes the blocks below; the published page shows the empty state

**The site's calendars**

- [ ] Site panel, Calendars, with the example «Apeiron»: «New calendar» adds a row with the caret in its name in one press, also on a site without calendars; the head folds and opens it with a slide and a turning chevron, one row at a time, and the panel never jumps; an unnamed calendar keeps its row's width with the address cut with «…»
- [ ] The open row: Basics (name, address, description), Colours (the main colour and three extra swatches on one line) and Shown to visitors (web page, organiser, the two switches); remove and move work; after a reload the stored calendar holds only the fields set
- [ ] A calendar block's Sources: the home page's reference as a read-only row with «Apeiron»; the site's calendars as checkboxes; «Add calendar» with an address and «Save in the site's calendars» moves it to the Site panel; «Edit the site's calendars» opens the Site panel at the group; a reference to a removed calendar says so in the editor and shows the sample data with a note
- [ ] On a real feed, a named source (an own address with a name and a colour, or a registry calendar) gives its events the name as chip and the colour on the chip, the date and the edge stripe; «In the calendar filter» off gives no chip and leaves it out of the chip row and the side panel's key; «Can be subscribed to» off leaves it out of the subscribe row and the card's links; the extra colours colour the event boxes, the chips and the filter button, and the text on the main colour
- [ ] An event from a registry calendar with an organiser, a description and a web page: «Organiser» as a fact, the description under the event's own, «More about <name>» opening the page, and the JSON-LD's organiser with that page as its url

**Sources and what is read from a feed**

- [ ] A source with a name: its events wear the name as their chip and the filter shows it, and a title like «Møte: Årsmøte» stays whole; a source with a colour: chips, date badges and the filter button take it, and cleared they follow the accent; two sources with the same event show it once, keeping a sign-up link or a place found in only one copy
- [ ] «Calendars on the site» lists the sources of the other calendar blocks and adds one with a click, and says so when there are none
- [ ] A Nextcloud share link pasted as it is shows the events, and «Subscribe» gives an address a calendar app can follow; a Proton, Outlook or Nextcloud host added to `ICS_HOSTS` as the calendar guide and the setup guide describe makes its calendar show
- [ ] A real feed with «the last Thursday of every month», «the second Sunday of May», single extra dates, a fortnightly event on Sunday and another weekday, a «last Friday of the year» and a «Friday the 13th»: every occurrence lands where Google Calendar shows it
- [ ] An Outlook feed with `TZID=W. Europe Standard Time` shows each event at its local time for a visitor in Oslo and one in London (the site's zone off), in summer and winter; a zone given only in a `VTIMEZONE` block follows the block's offsets on both sides of the clock change
- [ ] `DTSTART` with `DURATION:PT2H30M` ends two and a half hours later; an all-day `DURATION:P2D` spans two days; «Add to calendar» on a weekly event gives a file that Google Calendar, Apple Calendar and Thunderbird import as the weekly series, a single event one date
- [ ] A feed whose events carry `CATEGORIES` and whose calendar has no name: the chips and the category filter show the feed's categories, and a title with a colon is left whole; a Google calendar with formatted descriptions shows the words without tags in the excerpt
- [ ] A month, week or day design with a feed that has events in earlier months: the back arrows show them, in the preview and published, a year back
- [ ] A feed that answers with junk: the quiet empty state on the published page, never standing loading bars; a block without sources published, and a feed with nothing coming up, show the icon and the line; own words and another icon in Content change it, and None removes the icon

**Times and dates**

- [ ] A real feed: an event from 18:00 to 21:00 reads «18:00-21:00» in every design that shows a time, one with no end its start; an all-day event over three days reads «until» its last day; a timed event ending on a later day reads its start, the last day and the end time
- [ ] An all-day event over a Saturday and a Sunday shows on both days in Week strip, the month on a phone and Day plan; «Add to calendar» gives the right last day in Google Calendar and in the file
- [ ] An event cancelled in the calendar app: a struck, dimmed title, «Cancelled» where the time stands and no sign-up, in every design; «Show cancelled events» off removes them everywhere
- [ ] «Clock» 24 h is marked whatever the site language, 12 h writes «6:00 pm-9:00 pm»; «The week starts» on month, week, year and agenda designs, Bento and with the view switcher: Sunday puts Sunday first and moves the grids, Auto follows the site language
- [ ] Site panel, «Time zone»: Europe/Oslo is accepted, «Mars/Olympus» refused with «Unknown time zone», an empty field removes it; with the zone set and the computer in another zone, the times stay on the site's clock, an all-day event on its day, a line under the calendar names the zone, and «today» and the countdowns follow the real moment; with no zone and a feed in another zone, the line says the times are in your own zone
- [ ] The site in English: dates read «5 Oct», never «5. Oct»; the page source of a published calendar has its dates and times as `<time datetime>`, the day for a date and the true moment for a clock time, also with a time zone, and «Cancelled» is not a time

**Finding events and the view switcher**

- [ ] Content: «Show place filter», «Show search field» and «Show earlier events» under the category filter, off on a new calendar, «Show earlier events» hidden for a month, week, day or year design, and the group's reset switching all three off; the calendar filter is off on a new calendar and shows the calendars' names when on
- [ ] «Show search field» on, published: a word leaves only the events with it in the title, place or description, whatever the case; two words must both be found; the field keeps its text and caret while the list changes; no match shows «No events match»; emptying it brings every event back
- [ ] «Show place filter» on with two or more venues: a button per venue («All places» first) named up to the place's first comma, narrowing the list and keeping the focus; one venue draws no row
- [ ] «Show earlier events» on with events in the last 90 days: «Earlier (n)» with the right count, the latest first, a press on a row opening the card, and nothing that is over among the coming events; the sample data shows one under «Earlier»
- [ ] Search, place and category together each narrow what the others leave, and «Earlier» follows them; the field and button rows fit the width on a phone in a list, a card and a «Coming up» design; on a phone the switcher and a search button share a row, the button opens the field, which stays open while it holds words, and the chips scroll sideways
- [ ] «Show view switcher» on a list, cards, agenda or next calendar: «Upcoming», «Week» and «Month» at the top, «Upcoming» pressed; Week and Month show the week strip and the month with their arrows, including this week's and this month's earlier events, in the design's colours on a dark design; the published page starts on «Upcoming»; Week design and Month design appear only with the switcher on, and the ApeironLF month is the default on the Ap designs
- [ ] The switcher is not offered for a month, week, day or year design, and a block that had it on shows no buttons with such a design; its words are rewritten by clicking them (a click on the word edits, on the button's edge it switches); in the switcher's week about 650 px wide, the time and title stay inside each event's box
- [ ] The tools' size setting changes the switcher's buttons, the chips, the search field and the week's and month's arrows together; the selected chip is visible on Overview on cream, List on navy and the poster designs, and the tools stand on their own ground on the navy, board, dark glass and cork sets
- [ ] The edge stripe on a calendar with Week plan behind the Week button: off gives no edge, on the calendar's colour, an own colour that colour; Month with side panel behind the Month button shows the key only with the calendar filter on, the sample calendars in three colours

**The event card**

- [ ] Published and in Clean view, every design: a click on an event, or Tab and Enter, opens its card over the calendar with the calendar shaded; the page does not scroll when it opens or closes, also scrolled far down; the page scrolls as usual while it is open, and the card scrolls away with its calendar under the navigation bar
- [ ] Escape, the close button and a press outside close it with the focus back on the event; another event closes it and opens its own; a card open while the calendar is drawn again closes
- [ ] The card is never wider or taller than its calendar (a calendar under 300 px lets it reach below), and more content scrolls inside it; with the editing handles on, a click on an event selects the block, and switching to Clean view closes the element menu
- [ ] The card in each design takes the design's set: ground, ink, accent, radius and type (cream and navy on the Ap designs, a pinned note on Noticeboard, a hard-shadowed square on the posters, glass on the glass designs, the theme's colours on the plain designs), and its words, date line and button have contrast in every design
- [ ] With a real feed: the whole description with clickable links (an Outlook description with paragraphs, lists, bold and links, without pictures, colours or forms), the picture, and no sign-up or «Add to calendar» on a cancelled event
- [ ] «Join» for a meeting link from Zoom, Teams, Meet, Whereby, Jitsi, Webex, Proton Meet, kMeet or Element Call, also for a Meet or Teams meeting with no link in the description; «Own meeting addresses» in the Site panel stores a host or a pasted address as the host, several divided by commas, and a link to it shows «Join»
- [ ] «Show «Sign up» buttons» on: «Sign up: https://…» or «Tickets: https://…» in a description gives the button to that address, an event service's own address to that page, a plain link no button, and a picture or meeting link never becomes it; «Sign up» and «Join» show their host as their tooltip; off, no design shows a sign-up button
- [ ] «Add to calendar» unfolds without moving the card off its calendar: «Add to Google» opens Google Calendar filled in, «Download as a file (.ics)» opens in Apple Calendar and Outlook at the right time, and «Subscribe» shows the iCal address, selected at a click; «Show «Add to calendar»» off removes the fold and its subscribe links, and the Buttons group counts and resets it; «Show subscribe button» off leaves no subscription anywhere
- [ ] In the calendar, in Clean view and published: a place opens the map in a new tab, an address in a description is a link, and an excerpt ends at a word with «…» keeping an address near the cut whole; «Address of the whole programme» to another site opens in a new tab in Clean view
- [ ] The editor: the first press on an event selects the calendar, the next opens its card; «When», «Where» and «Add to calendar» in the card are rewritten by clicking them, and it stays open while you write; Escape or a press outside closes it; a selected calendar drags by its move handle, not by its events

**Places and the map service**

- [ ] Site panel, «Map service»: OpenStreetMap, DuckDuckGo Maps, Brave Maps, HERE WeGo, Google Maps, Apple Maps, Norgeskart and FINN kart in that order, each with a note that reads in the list's width in a Norwegian, English and Turkish admin; OpenStreetMap on a site that never set it
- [ ] With each service published, a place with a venue's name before its address («Mormors Stue, Nedre Enkeltskillingsveita 2, 7011 Trondheim, Norge») opens the right spot; a name alone and an address alone open it with that text, and a web address opens that address
- [ ] An event whose calendar app stores a point: OpenStreetMap and Apple Maps open the point, the others the search; with a point and no place in words the card has «Show on the map»

**Search engines**

- [ ] A published page with a real feed: the live `<head>` holds a `script type="application/ld+json"` with the events beside the site's `Organization`, and the Schema Markup Validator reads them without errors, each with a name, a start and a place, plus `endDate`, all-day dates, `EventCancelled`, `VirtualLocation` and `MixedEventAttendanceMode` where they apply; Google's Rich Results Test finds them (warnings for price, ticket link and performer are expected)
- [ ] «Tell search engines about the events» off: the events script is gone and `Organization` stands; another page removes the script of the page left; the preview and sample data write none

**Loading, keyboard, screen reader and print**

- [ ] Published with a real feed: quiet bars while the calendar is fetched (also with reduced motion) at the frame's height, nothing below moving when the events arrive; a screen reader announces «Loading the calendar»; the preview with a feed shows the bars, never «No upcoming events» for a moment
- [ ] A day grid on the keyboard (the plain month, Overview on cream, Month with side panel, Week strip, Day plan's day picker, Heat map, the months on a phone): one tab stop, the arrows between days, Home and End to the week's ends, PageUp and PageDown to the month or week before and after, Tab through the day's events and out, Enter opening a card; with the editing handles on the arrows do nothing there
- [ ] A screen reader: a day reads its date and count («Sunday 4 October, 1 event»), an arrow reads the new month, week or day, the arrows are named for the previous and next month in the site's language, and «Week», «Month» or a category keep the focus on the pressed button, read as pressed
- [ ] At 360 px with a real feed of long titles and places, nothing in any design runs out of the block or makes the page scroll sideways: List on navy puts its sign-up on its own line, Coming up on navy the date above the text, Regular event and Billboard set their titles smaller, Poster wall shows one column, a very long word breaks inside the block, and the search field is never wider than the block

**The words of the calendar**

- [ ] The site in English, every design with sample data: not one Norwegian word without an edit, in the design, the switcher's week and month, «Show all» and «Earlier», the printed list and the card, and the sample events in English too
- [ ] The site in Turkish: dates in Turkish order on the cards and month heads, the Year wheel's months in capitals with a dotted İ, Dark glass's share written «%45», and the 12-hour clock as «ÖÖ»/«ÖS»
- [ ] Billboard and Countdown ring one day away: «1 DAY» and «Tomorrow»; an event tomorrow at 01:00 says «Tomorrow», not «Today!»; Day plan, Heat map and Month with side panel on another day than today count that day, and an empty day or month says so in its own words
- [ ] The words of a design («Next event», «Later», «All», «Sign up», «Subscribe», «Programme», «Today», the units) are rewritten by a click in the preview with bold or a colour, and survive a reload and a publish; a number inside a rewritten text («In N days») stays, also with bold across it and a Backspace after it; «Reset the texts» puts every word back and keeps the announcement's own heading and text
- [ ] A label, «For whom» or the announcement's label emptied: a faint hint in the editor, nothing in Clean view, published or on a phone, and the design closes up (the Regular event falls to one column); a page saved with emptied words shows the default words
- [ ] The calendar's row for the event's card reads «Pop-up», its picker «Choose the pop-up design»; «Departure board, screen» is described in English in en-GB and in Norwegian in nb; «Show open to everyone» is gone from Buttons and filter, a calendar that had it off still shows no «Open to everyone», and the reset leaves it off
- [ ] «Repeats» shows on no event by default; «Mark repeating events» shows it in List on navy, Grid on cream, Index cards, Receipt and the pop-up

**The announcement**

- [ ] Content → Announcement: «Heading» and «Text» fill the note in the preview at once, a line break stays and `<` is written as it is; the alert band shows «Heading» alone; without words, hints in the editor and nothing published
- [ ] Coming up on cream with the announcement as an alert band with an address: a press on its words in the editor puts the caret there and stays on the page; in Clean view it follows its link
- [ ] A long text in Noticeboard, Coming up on cream and Regular event: four lines (six in Regular event) ending in «…» and «Read it all», the same in Firefox and a WebKit browser; a short text has none
- [ ] Published and in Clean view a click on the announcement or «Read it all» opens a card with the label, the heading, the whole text and «Read more» with an address, in the note's colours and heading font; Tab and Enter open it, Escape closes it with the focus back; in the editor the first click selects, a click on the cut text opens the card where the whole text is written, «Read it all» is rewritten by clicking it, and the note shows all of its text while you write

**Every design**

- [ ] Every design in turn, sample data in the preview and a real feed published: it draws, «View» stands in Content only on Plain, the month, week, day and year designs also show the earlier events of their span; the colour slots follow the design's own colours when empty and a dark theme stays readable; «Edge stripe on the boxes» adds the stripe in the event's calendar colour, «Stripe colour» overrides it and off removes it
- [ ] Style, «Text fields»: Title with font, size, Bold or Normal, italic, underline and colour changes every title and nothing else; the same for Date, Time, Place, Description, Category and Large numerals
- [ ] Style, «Settings for the design»: a group only on the designs that have settings, holding only that design's; each change shows at once and survives a reload and a publish
- [ ] «Show all N (M more)» in the editor: the press that selects the block leaves it, the next opens it and puts the caret in the words, later presses edit them, and a press after leaving the words closes it; in Clean view one press toggles it
- [ ] The description setting (Content): shown on Programme booklet, Split card, Regular event and the plain cards only; «Only in the card» removes the excerpt from the rows while the card keeps the whole description; an older booklet or split card with the description off in Style reads as «Only in the card»
- [ ] The phone design: «Design on a phone» and «The card» under Design, each opening the picker on its list with the calendar's choice «In use», both also in the quick row; the phone list holds «Plain list» under Neutral, every design that reads on a phone and the board's «two flap rows» and «flap strip», never Departure board, Table or Heat map, and no entry scrolls sideways; a phone design from another design keeps its own colours on a phone while desktop shows the calendar's design
- [ ] Table and Heat map on a phone or narrower than 540 px show the stacked list with «Upcoming», a row per event and «Show all N», in the design's colours; the Heat map's list holds what is coming by the max count; Table with the switcher on shows its own week and month phone layouts
- [ ] The card list: «Plain card» under Neutral, the shared cards under «Shared by several designs» (a search on a design's name finds its set's card), the own cards and the board's three; a card from another design opens in that design's look, as tall as its content without a scrollbar and following the block's size (130 % opens at 130 %)
- [ ] The seven own cards as drawn: Tickets (a stub with the day, a tear-off line with notches), Poster wall (a taped poster, the day large), Programme booklet (staples and «Programme»), Billboard (a framed board with lamps and legs, facts as tiles), Noticeboard (a pinned note, the day on a second note), Glass (a frosted plate, the calendar blurred behind) and Dark glass (edge-lit smoked glass)

**The designs, one item each**

- [ ] Plain, List: more events than the max count give «Show all N (M more)», which opens the rest in the same design; «Fold the rest under «Show all»» off removes the fold; the same fold in Timeline, Table, Programme booklet, Numbered programme, List on navy and Glass
- [ ] Plain, Cards and Agenda: the cards fill the width; Agenda's rows stand under their month with the day number and weekday, and the max count counts like the list
- [ ] Plain, Month: chips per day and the keyboard grid; below 540 px every day is a button with up to four dots in the calendars' colours, today picked first, a press lists the day's events under the grid («Nothing on this day» when empty) and the arrows change the month
- [ ] Plain, Next: «Events in the card» 1, 2 and 3 hold that many under «Next event» or «Coming up»; «Under «Later»» 0 to 10 lists one-line rows below
- [ ] Timeline: the date on one line at the left, a rail with a dot per event, the sign-up as a filled button, the chip under the title; a click on an event's words opens its card, and a cancelled title is struck
- [ ] Table: the header row in its colours, every other row tinted, «all day» for an all-day event, the sign-up at the right end; «Show the Time column», «Show the Place column» and «Striped rows» off remove each; a narrow block scrolls it sideways
- [ ] Programme booklet: the paper with a shadow, «Programme» and the month span, a column per month that wraps to one in a narrow block, the day in the accent and the description's first line; «Show the description» off removes it
- [ ] Numbered programme: 01, 02, 03 in Numerals, «3 events» at the top right, the sign-up or the chip in the right column; the fold counts on (03, 04 …); «Count 01, 02, 03» off counts 1, 2, 3, also through the fold
- [ ] List on navy: navy rows, the day in gold and the month in capitals, the category outlined, the place underlined in gold, the title in the heading font, the chips and subscribe buttons in the row colour; the view switcher, search field and the switcher's month read light on dark
- [ ] Glass: three blobs behind frosted cards (Colour blob 1 to 3, The glass, Glass edge), transparent so a section picture or gradient shows through, and «Ground» makes it solid; the chips, subscribe button and switcher in glass
- [ ] Poster wall: the first poster twice as large in Poster 1, the next two in Poster 2 and 3, the fourth plain, then again; category and place in capitals at the top, the day huge, title and time at the foot; «Columns» 2, 3 and 4 fix the count and Auto fills; «Address of the whole programme» adds a last dashed tile; one column on a phone, the first poster no wider than it, the same for Picture cards
- [ ] Tickets: the stub in the Stub colour with day, month and time, a dashed tear, place · category under the title, the sign-up at the right end; without a sign-up «Open to everyone» (rewritable, and «Show «Open to everyone»» off removes it); the programme address as a foot link
- [ ] Day carousel: the cards scroll sideways and snap, the two arrows move one card, the first card in The first card colours with the sign-up on it; a dot per card follows the scroll and a click on a dot scrolls to it; no dots with one card
- [ ] Picture cards: a picture attached to the event or linked in its description shows in the band when its host is in PHOTO_HOSTS, otherwise the Without a picture colour; the date badge and chip on the band; «Columns» 2 to 4 or Auto
- [ ] Grid on cream: cream cards with a navy head, the day in gold, the category as a gold pill, the place underlined in gold; Header row, Card, Text and Gold recolour them
- [ ] Bento: the hero tile with the «Next» pill and «In N days» (the next event's picture filling it, the words readable), two small tiles, the current month with today ringed and the event days in Soft accent, the subscribe tile with a source, wide rows for the rest, and no subscribe row under the block; two columns in a narrow block, also in a wide window
- [ ] Billboard: the pulse beside «Coming up», three tiles counting days, hours and minutes that move on each minute (also after many edits in a row, with the editor as quick as before), the sign-up as a full-width bar, «Then:» with the later events, and the subscribe link and programme address at the foot; a cancelled next event has only its title struck
- [ ] Stacked cards: with «Events in the card» 3, three cards with the front one readable, «Browse the cards» turns the next to the front, «3 next» at the top right, the later rows under
- [ ] Noticeboard: the next event on a pinned yellow note; «Show announcement» adds a blue note with a rewritable label, heading and text, and «Read more» with a link; «Later» on the strip
- [ ] Split card: the weekday, the huge day and the month on the panel in the calendar's colour, the chip, title, first line and sign-up beside it, «Later» under; «Show the description» off removes it; the panel stacks above the words in a narrow block and on a phone
- [ ] Band: the tag at the left, the next events in one line with dots between; with more than fit the band rolls and pauses under the pointer, and «Roll when the band is too narrow» off stands it still to scroll by hand; a press anywhere along it opens the event's pop-up; «Width» «Own width», «Content width» or «The whole page width», following a resized window and a «Size» under 100 %
- [ ] One line: the first rows marked «Coming up» with the accent dot and stripe, the rest «Later», «In N days» at the right and the sign-up as a button; emptying one of its words leaves the rest of the list in place
- [ ] Countdown ring: the ring fills over the last two weeks, the middle counts days and on the last day hours, two later rows with dots under a rule
- [ ] Dark glass: a blurred, half transparent dark ground («Ground» makes it solid), the countdown in monospace («01d 15h 22m» on an English site), «Until the start» with the percentage and the bar, the sign-up and subscribe buttons side by side, «Then» in a glass box, Colour blob 1 and 2
- [ ] Coming up bento: the hero tile in the calendar's colour with «Coming up» and «In N days», a date tile per later event (the third dark), the link tile with the count, the subscribe link and the programme address; no subscribe row under the block; «Events in the card» 3 with one later event gives three day tiles beside the first
- [ ] Week strip: the current week with today framed, «Week N» and the span, the arrows a week at a time, a pill per event; at about 650 px the time and title stay inside each box; below 540 px the days stand under each other with today marked, and dragged wider the seven columns come back
- [ ] Week plan: the hours from the earliest event (at most 08) to past the latest (at least 18), today tinted, an all-day row, timed events as blocks of their length; «First hour» 6 and «Last hour» 22 give 06 to 21, empty gives 08 to 17, an event at 23:00 still shows with the last hour 20; «Tint the weekend»; an event from 22:00 past midnight is drawn to 23; the 12-hour clock writes «1 pm» on the axis; the arrows around the end of October keep whole weeks; below 540 px the days stand under each other in clock order, all-day first
- [ ] Calendar layers: a row per named calendar with a switch that hides and shows it, a bar per event across its days, today tinted, no chip row and «Show category filter» hidden; on a phone each calendar with its events under its name and the day written on each («Sun 4», «Mon 5 to Wed 7»)
- [ ] Month with side panel: at most two chips per day and «+N», today ringed, a click or Enter on a day shows its events in the panel, a grey day of the next month moves the month, the legend lists the calendars; «Side of the panel» Right, Left and Under; the panel goes under below 600 px (also while dragged) and on a phone
- [ ] Overview on cream: the month on cream with a gold rule, gold arrows, today in a gold circle, pills with a gold line and the time in dark gold; below 540 px the dots and the day list of the plain month
- [ ] Day plan: today with «Today» and «N today», the week strip picks another day (Enter keeps the focus), the now line and the shaded past hours on today only; «First hour» and «Last hour»; an event past midnight shows in the row above the hours on the next day; the 12-hour axis reads «1 pm»
- [ ] Year wheel: twelve arcs, past months in Past, this month in the accent, a dot per event, the year and the count in the middle; a click, press or Enter on a month's arc or name lists its events beside the wheel (in Clean view at once, in the editor after the first press has selected the calendar), every month name whole and the wheel still when the list changes height; «The month at the top of the wheel» August reads «2026/27» with August to July holding this season and only its passed months dimmed, January «2026»; «The current month» moves by itself; a screen reader reads the months as buttons with their pressed state
- [ ] Heat map: twelve small months, days shaded None, Few, More and Many, today ringed, a day pointed at or focused reads its events under the grid; one tab stop for the year
- [ ] Coming up on cream: the navy head with the gold dot, the next event with the navy date badge and «In N days», «Later» on a gold rail, an arrow on an event with an address; the announcement as Section (at the foot) or Alert band (under the head); «Panel text» and «Text» colour their parts alone
- [ ] Coming up on navy: with «Events in the card» 2 or 3, the first on a cream card with the chip outlined, the place underlined and «Read more» with an address, the others as navy cards with a gold edge, «2 next» at the top right, «Later» as lines
- [ ] Regular event: the next event's title large in red, the first paragraph of its description, When, Where and For whom («Open to everyone» rewritable), «All dates» folding out every coming date with the same title (Max count caps them, no fold with one date); the announcement aside to the right, under the card in a narrow block and on a phone
- [ ] Agenda, dark: the month, this week's days with today in the accent and dots under days with events, a card per event with the time at the left and a stripe in the calendar's colour, «Today» before today's date; with two or more named calendars a chip beside the month opens «All» and the calendars, a choice filters and names it, Escape or a press outside closes it, also in Clean view and published
- [ ] The ApeironLF designs with nothing coming up: the pill «Dates · Dates to come» (rewritable), the dashed box with the own line and icon from Content, the subscribe button in gold, readable on a light and a dark page
- [ ] Tear-off pad (Retro): the month bar, the huge day and weekday, the next event with its countdown, time and place, excerpt and «Read more», the sign-up and «Add to calendar», and the later events as dashed rows, a cancelled one struck; on a phone it fits its width and a long later title keeps whole with the time under it
- [ ] Tear-off pad's card: the perforation along the top and the date as the red bar with the close cross; «Today in {n} days» two or more days away, «In {n} days» with «Word choice: Neutral»; nynorsk and Northern Sami sites show the common word in their language; no rewriting switch, the colour slots paper, head, ink, rule and edge, and the empty state, the switcher's week and month and the finding tools in the pad's colours
- [ ] Index cards (Retro): typewritten cards on lined paper, each a little askew, «Card no. 01» … with the category in the head and the writing on the lines; «Date:», «Time:» (left out when cancelled) and «Place:», «Sign-up: yes, see link» or «Sign-up: not needed», «Repeats: yes», the excerpt with «Read more», and a rotated «Cancelled» stamp; «Columns» two to four, one on a phone; a long calendar name runs on under the red rule with the title a line lower
- [ ] Index cards' card: the punched hole at the top, the date over the red rule, the facts on the lines and the common words on its button and labels; «Word choice: Neutral» gives «No. 01», «Date», «Time», «Place», «Sign up», «Open to everyone» and «Repeats»
- [ ] Departure board (Retro): an amber heading with «Updated», the heads Date, Time, Event, Place and Status over split-flap rows, every letter in the middle of its flap also at 50 % and 150 %; the status «Enrol» in amber, «Open» or «Cancelled»; the first row carries the excerpt; «Rewrite calendar data» off shows the calendar's own words whole in columns; «Word choice: Neutral» gives «Coming up», «Sign up» and «Open to everyone»
- [ ] A row's card opens centred over the part of the calendar in view at its own width, past the calendar's edges when it must be, never scrolling inside itself, also at 50 % and 150 % and with the calendar partly scrolled out
- [ ] Cinema marquee (Retro): a red frame with lit bulbs around a letter board; «★ Now showing ★» with the day word over the next title, its date, time and place, the excerpt with «Read more», and «Coming soon» with the names starting on one line; at 100 % its rows the size of the departure board's flaps; «Word choice: Neutral» gives the common words; on a phone or in a narrow frame «Cinema marquee, rows», also offered as a phone design; its card a ticket with bulbs and a stub
- [ ] Receipt (Retro): a till receipt with a torn bottom edge, «* PROGRAMME *», «AUTUMN 2026» and the place, a row per event with a dot leader to the time, the place and status under it, the totals, «ADMISSION FREE», the barcode with «Subscribe: scan or tap here» and «Thank you for coming!»; titles start and times end on one line, a long title cut with an ellipsis; its card «Receipt no. 001» with dot-leader lines and «Sign up» in ink
- [ ] Seventies poster (Retro): the sunrise, «What's on?» and «October and November», the events as pills with round date badges in turn orange, mustard and brown, «Join in» on a sign-up and «Follow the calendar, far out»; its card a band of stripes with a row of matches
- [ ] Art deco (Retro): the gold double frame on black, the sunburst, «PROGRAMME» and «◆ THE 2026 SEASON ◆», rows of the day in gold, the title with time and place and the countdown at the right, the sign-up and subscribe links at the foot; its card a fan in each corner, rays over the date and a rule with a diamond
- [ ] Receipt, Seventies poster and Art deco: the period line is rewritten by clicking it, emptied it is gone published and a faint hint in the editor, and it stays when the calendar changes between the three; «Word choice: Neutral» gives the common words; at 100 % their type is the size of the others', at 50 % half as tall with the same lines; on a phone none scrolls sideways; the picker's pictures show each in its own look

**Languages and guides**

- [ ] Admin in nynorsk, a calendar's menu: the labels in nynorsk, none running out of its control
- [ ] The site in English, Turkish and Swedish (the language pack on): the buttons, dates, «Today», «Tomorrow», «In N days» and plural forms read in that language
- [ ] The site in Northern Sami: the calendar's visitor texts read by someone who knows the language, with the wrong ones noted
- [ ] The calendar guide (English and Norwegian) read through: the steps for the iCal address match Google Calendar, and for each other service tried the «Tested» column and the steps are corrected; its «Designs» section and the user guide's calendar paragraph read well, and the links from the user guide and the README tables open it

## Plugins

- [ ] The Plugins panel: a plugin switched off and on, one added from the found list and one by id, and the CSP warning against the live headers; with no new plugin folder «No new plugins in plugins/» with the explanation in its tooltip
- [ ] × on «Swedish language pack» takes it out of the list, it does not come back under «Found» after a reload, and after publishing `plugins/lang-sv` is gone from the repo; taken back into the list before publishing, the folder stays
- [ ] A plugin block that declares `designs` shows the Design row and the picker, and the picker's preview draws the plugin block
- [ ] A plugin block with `fields: [{ key: 'more', type: 'link', label: 'More' }]` (the example in template/plugins/README.md): its menu shows «More» with the link field, and Om oss with a spot chosen there gives a published link to `/om-oss#…`, also after Om oss changes address

## Browsers and the page without scripts

- [ ] In Chromium, Firefox and Safari at 1280 and 1024 px window width: the lightbox opens, fits the window and closes; a parallax background moves without a gap at the section edges; the text toolbar stands above or below its text, never off the canvas
- [ ] In Firefox and Safari: the canvas zoom check under The canvas (the section toolbar's strip and the text toolbar's lists keep their size), and a published PDF opened from a link in the browser's own viewer, under the site's `Content-Security-Policy`
- [ ] A page without JavaScript shows the English noscript line
