# User guide

[Sámegiella](GUIDE-se.md) · **🇬🇧 English** · [🇳🇴 Bokmål](GUIDE-nb.md) · [🇳🇴 Nynorsk](GUIDE-nn.md) · [🇹🇷 Türkçe](GUIDE-tr.md)

Translation of GUIDE-nb.md. Norwegian (bokmål) is canonical and prevails in case of discrepancies. The button and panel names below are the English admin texts; if your admin is set to another language, the names follow that language.

For you who own or edit a site built with Urd. No code, no git knowledge needed: everything happens in the browser on your own site.

> Urd is under development. The guide covers what exists today and is
> extended along the way; a full clean-up is planned towards v0.9.

**Contents:** [Getting started](#getting-started) · [The editor](#the-editor) · [Editing content](#editing-content) · [The Properties panel](#the-properties-panel) · [Sections](#sections) · [Grid (guide lines)](#grid-guide-lines) · [Mobile](#mobile) · [Pages, menu and theme](#pages-menu-and-theme) · [Drafts and publishing](#drafts-and-publishing) · [History and undoing a publish](#history-and-undoing-a-publish) · [The first time](#the-first-time)

## Getting started

1. Go to `/admin` on your site (for example `yoursite.pages.dev/admin`).
2. Log in with your GitHub account (the **Log in with GitHub** button in the top right). You can see and
   try the editor without logging in, but not publish.
3. Everything you change is saved as a **draft** in your browser straight away.
   Nothing becomes visible to visitors until you press **Publish**.

## The editor

The screen has three parts:

- **The top bar**: choose page, switch between desktop and mobile view (the screen and phone icons), and publish.
- **The panel selector on the left**, grouped by workflow: Pages,
  Blocks, Properties and Grid (building the page), Theme, Nav and Footer
  (the site), and History. Click to open a panel; click again
  to close.
- **Admin theme**: the dropdown next to the Urd logo switches the editor's
  own colour theme (seven variants). It never affects your website.
- **The preview**: your real page. What you see is what visitors get.

**Clean view** (top right) hides all the tools so you see the page
completely without editor frames. Click the **Edit** button to come back.

## Editing content

- **Writing text**: click in a text block and type straight into the page.
- **Moving a block**: grab it and drag. The block snaps to
  the guide lines (see Grid below).
- **Resizing**: drag the handle in the corner of the block.
- **The toolbar above the selected block**:
  - ⠿ move (drag)
  - the layer arrows (arrow towards a line, up/down) put the block right in front or at the very back (when blocks overlap).
    NB: while you edit, the block you point at or have selected is
    always shown on top, so the handles can be reached - you see the REAL
    order in Clean view and on the published page
  - the phone icon: mobile visibility (decor), see below
  - × delete the block
- **Rotating**: drag the little ⟳ circle in the block's top right corner
  (snaps to 15° steps; hold Shift for a free angle). An exact number of degrees
  can also be set in Properties.
- **Keyboard on a selected block**: the arrow keys move one grid step
  (Shift = 1 px), Delete deletes, Esc deselects, Ctrl+D duplicates.
- **Snap lines**: when you drag a block near the edge or centre of
  another block, a line appears and the block snaps into place (hold Shift
  for completely free placement).
- **Undo**: Ctrl+Z (and Ctrl+Shift+Z to redo) works on everything: moving,
  size, text, deletion, sections and grid.

### Adding blocks

Open the **Blocks** panel and click the block you want; it is placed in the middle of
the viewport, in the section you last clicked in. The types:

- **Text**: ordinary text straight on the page.
- **Text box**: text in a card with a background colour and rounded corners,
  nice for help texts and information boxes.
- **Button**: a link to another page or an external address.
- **Image**: upload from your machine. The image is compressed automatically.
- **Video**: paste a YouTube or Vimeo link in Properties.
  The embed is privacy-friendly, and the video plays on the published
  page (in the editor a click only selects the block).
- **Collection**: shows the entries from a collection (see the Collections panel)
  as cards, a list or a year-grouped archive.
- **Icon**: a character or an emoji in any size and theme colour.
  In Properties the character button opens a menu with hundreds of characters and
  emojis (with the recently used at the top), and at the bottom of the menu you can
  upload your own icon image that is shown instead of the character.
- **Shapes**: line, arrow, circle, rectangle and triangle for decoration.

In the editor, links and buttons are never triggered when you click them -
the click selects the block. Test the links via **View site ↗**.

### What does the phone icon (decor) mean?

The button shows whether the block comes along to mobile. On mobile the content is stacked
automatically in one column, and there decoration is skipped: a slanted line or arrow
that sits nicely behind the text on desktop is just clutter in the middle of a mobile column.

- Phone = the block is content and is shown on mobile.
- Crossed-out phone (yellow button) = the block is decoration (decor) and is hidden in
  the automatic mobile layout.

Click to switch. New shapes and icons from the Blocks panel start
as decoration (icons from the section templates are content and are shown on mobile). (If you have hand-tuned
the mobile layout in the section, you place everything yourself anyway; then the
flag means nothing there.)

## The Properties panel

Click a block and open **Properties** to fine-tune it with numbers and
choices instead of drag and drop:

- All blocks: exact position and size, layer (what sits
  in front), rotation and mobile visibility (decor).
- Text: alignment and text box on/off. Button: text, where it goes and style.
  Image: change image, description, cropping, rounding and link.
  Shape: type, colour from the theme, thickness and filled/outline.
- If you click in a section (with no block selected) the panel shows the section's
  minimum height, own grid, background and animation.

**Colours**: the colour pickers show your theme colours as dots - if you choose
one of them, the field is LINKED to the theme and follows along when you change the palette
in the Theme panel (linked fields are shown with a ring). If you choose freely in the area
or type a hex or RGB value, the colour is unlinked, and you can
make it transparent with the slider below the hues. Your most recent free
colours are under **Recent**, and with the plus button by **Saved**
you build your own fixed palette (up to 12; × on a dot removes it).

**Images**: in Properties you can set the focus point (which part of the image
is kept when it is cropped) and adjust brightness, contrast and
saturation - without the image file itself being changed.

**Site icon**: in the Theme panel you upload an image and edit it
in the icon editor: drag the image to choose the crop, zoom, adjust
brightness/contrast/saturation or greyscale, and **Apply** makes a square
128px icon that is shown in the browser tab. The pencil button opens the editor
again; the cross button removes the icon (then the Urd mark is used).

**Backgrounds**: a section background is built from layers that can be stacked:
colour, gradient (can be animated), glow, image and grain. Add, remove and
sort layers in the section's Properties; each layer has its own controls.

**Animations**: blocks and sections can slide or fade in when
visitors scroll to them (and «lift on pointer» for a hover effect).
Chosen in Properties. The preview in the editor shows the end state;
the animation itself plays on the published page. Visitors who have
switched off animations in their system (reduced motion) get the content
without animation.

**Formatting text**: click in a text block (or in the title/text of a
collection entry), and the toolbar appears by the selection: text level,
bold, italic, underline, strikethrough, colours and highlighting gathered behind
the palette icon (theme colours, a custom colour with a full colour picker and eyedropper,
highlight with the accent or a custom colour, and remove highlighting: the A with a red line
across), link (its own field in the bar), alignment, lists, quote and clear
formatting. The font and base size for the whole field are set in Properties.
The bar closes when you click anywhere outside the field.

**The «?» help chip**: blocks with special functions (such as Collection and
Calendar) show a «?» in the top left corner when you point at them.
Click it for a help card that explains all the functions; the card stays
until you click somewhere else.

**Editing images**: double-click an image in an image block (or click
a collection image) for the image editor: change/remove the image, drag the focus point
to control the crop, zoom in towards the focus point to crop,
choose the shape of the frame (wide, square, portrait or round), adjust
brightness/contrast/saturation (with a greyscale shortcut and a reset),
fit, rounding, description (read by screen readers and shown when
the image cannot be loaded) and link. While the editor is open a faint
rule-of-thirds grid lies over the image (as in cameras), so you see the centre and
the thirds while you compose. Everything is non-destructive:
the original image is never touched.

## Sections

The page is built from sections stacked on top of each other. Point at the border between two
sections to get **+ New section**: it opens a gallery of ready-made
section templates, grouped with a short description per template. All the templates are
starting points: after insertion you edit the blocks freely as usual,
and the colours follow your theme.

- **Basics**: empty section, hero (left-aligned or centred with
  two buttons), images, contact and a simple footer section.
- **Cards and lists**: feature cards with icons, news cards, events
  with date badges and a sign-up button, team/board, FAQ, step by step,
  lead story (one big story + two small) and products/merch (point
  the **Buy** button at a payment link, for example Vipps, in Properties).
- **Highlight**: CTA banner («Join us»), quote, statistics numbers,
  a greyscale sponsor row and membership with price tiers.

The toolbar in the top right of a section (shown when you point at it):

- **+ card / + row / + person …**: sections made from templates with
  repeating elements (feature cards, news, events, team,
  FAQ, steps, products, statistics, sponsors, images) have their own
  plus button that adds one more element, placed ready in the next
  free slot. The section grows when needed, and Ctrl+Z undoes the whole
  element in one go.
- ↑ / ↓ move the section up or down the page
- ⤓ fit the height to the content
- × delete the section

You can also drag the bottom edge of the section to adjust the height freely, or
drag directly on the **+ New section** button on the border between two sections (a click
still opens the menu; dragging moves the border). Blocks can deliberately hang
over the section edge; nothing is clipped.

## Grid (guide lines)

The **Grid** panel controls the grid that blocks snap to when you drag them.
The grid is shown in the preview for as long as the panel is open.

- **Cell size**: how tight the grid is.
- **Snap to grid**: switch it off to place completely freely. Hold Shift while you
  drag to override the snapping temporarily.
- A section can have its own grid, independent of the rest of the page.

The grid is only an aid while editing: changing it never moves
any content, and visitors never see it.

## Mobile

Visitors on mobile automatically get the content in one column, in natural
reading order. You usually do not have to do anything.

- **The phone icon in the top bar** shows the page as it looks on mobile.
- If you want to fine-tune, drag the blocks in the mobile view: the section then switches
  to **manual mobile layout**, where you place everything yourself. ↺ on the section
  takes it back to the automatic layout.
- **Mobile review**: if you change something on desktop in a section that is
  hand-tuned for mobile, the section is marked yellow and the top bar says so
  («1 section needs mobile review»). That only means: take a look in
  the mobile view and check that everything still looks good, and confirm with ✓.

## Pages, menu and theme

- The **Pages** panel: create a new page (type the name and press Enter),
  give pages a new name or a new address, or delete them with ×. The front page
  cannot be deleted or moved. New pages are added to the menu automatically
  and become visible to visitors only when you publish.
- The **Nav** panel: the menu at the top of the page. Change the text, choose which page
  (or external address) each item goes to, move with ↑/↓, remove with ×.
  The logo can be text, an uploaded image or both (with
  size and order), and always works as a «Home» button.
  The menu items can sit to the right, centred or to the left.
  Under Appearance you control the menu's background colour and opacity (0 =
  a transparent menu over the hero), text colour and «Sticky menu»
  (whether the menu follows along when visitors scroll down).
- **Site icon**: at the bottom of the Theme panel you upload the icon that
  is shown in the browser tab and bookmarks (a square image is recommended).
- The **Collections** panel: lists of entries (news, notices, publications)
  that live as data and are shown by Collection blocks. Create a collection, write
  entries (title, date, text, image, link), and put a Collection block on
  the page (or use the section templates «News (collection)», «Noticeboard» and
  «Publication archive»). Adding a news item is then to WRITE an entry -
  all the views follow automatically. The block's Properties choose
  collection, view (cards/list/archive per year), count and sorting.
- The **Plugins** panel: extensions that give Urd new blocks and section templates.
  The panel shows the plugins in the repo's plugins/ folder; switch them off and on with
  the toggle, and publish as usual. Active plugins work immediately in
  the preview (visitors get them after publishing), and the plugin's
  blocks appear in the **+ New block** menu in the sections.

  The Calendar plugin is included: add a Calendar block (or
  the section template «What is on»), click «⚙ Sources» on the block and paste
  the calendar's iCal address or Google calendar id. Choose the view (List,
  Cards, Month or «Next») and the count. Titles of the
  form «Category: Title» give filterable category chips, a
  sign-up link in the description becomes a **Sign up** button, and
  the **Subscribe** button lets visitors follow the calendar in their own app.

  The Form plugin gives a Form block (and a «Contact form» template): click
  «⚙ Form» to set the recipient, fields and send mode. By default
  the form opens the visitor's email client with a ready-made email (no
  setup). If you would rather send to your own endpoint (Apps Script or
  a function of your own), choose «External endpoint» and paste the address; then you must
  open connect-src for that host in _headers (the block explains
  the line). The fields can be added, changed and removed.

  The Map plugin gives a Map block (and a «Find us» template): click «⚙ Location» and
  type an address (e.g. «1 High Street, Anytown»), coordinates (such as
  «59.913, 10.739») or paste an OpenStreetMap link, and set the zoom and
  height. The address search looks up the place via OpenStreetMap when you click
  **Apply**. The map is OpenStreetMap's own embed without tracking, and Urd's
  standard _headers allows it, so it works out of the box. (On another
  host «frame-src https://www.openstreetmap.org» must be in _headers;
  the block says so if the map is blocked.)
- The **Footer** panel: the footer text shown at the bottom of all pages.
  Switch it on, write the lines (one per line) and choose the alignment - it
  is edited in one place and applies to the whole site.
- The **Theme** panel: the colours and fonts the whole site builds on. If you change
  the accent colour, buttons, links and highlights follow along everywhere.

## Drafts and publishing

- Everything you do is saved as a draft in your browser, also across pages.
  «Unpublished changes» in the top bar shows that you have something unpublished.
- **Publish** puts all the drafts out on the site. It takes about one
  minute before the changes are visible to visitors.
- **Discard drafts** deletes the drafts and takes you back to the site as
  it is published. The button asks «Sure?» (red) before it does it; click
  once more to discard, or anywhere else to cancel.
- **View site ↗** opens the published page in a new tab.

Publishing requires that your GitHub user has been given access by
the site owner (see [the setup guide](../setup-publication/SETUP-en-GB.md)).

If several of you are editing, the editor says so if someone else has
published changes in the same parts since you loaded the page, and lets you
choose whether to publish anyway or look at the changes first.

## History and undoing a publish

The **History** panel shows the most recent publishes: what was changed,
by whom and when. **↩ Undo last publish** rolls the site back to how
it was before the previous publish. The undo is itself a publish, so
nothing is deleted from the history, and you can undo the undo. After an
undo you reload admin (after ~1 minute) before you edit
further; the editor says so.

(Ctrl+Z undoes drafts in the browser BEFORE you publish; the History panel
undoes what is already published.)

## The first time

If you open admin on a completely fresh site, you get a short wizard: the site's
name and two colours. Everything it sets can be changed later in the Theme and
Nav panels.
