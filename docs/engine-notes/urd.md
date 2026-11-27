# urd.js

The full text of the longer comments in the engine's `urd.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The Urd engine - entry point.

Run by boot.js, which the HTML shells (template/index.html and its slug
copies) load. Creates the global Urd object with the registries,
registers the core types and plugins, finds the right page in the page
register, and renders. All data is version-lifted on load
(migrate.js) - see docs/SCHEMA.md.

In preview mode (?preview=1) the engine additionally listens for
postMessage drafts from the editor and rerenders incrementally.

## `refreshShopGate`

The shop gate for the «+ New block» and «+ New section» menus: the preview module reads it from the site's own choice and whether a product catalogue stands among the collection drafts (block-palette.js shopOn, kept out of the visitor closure).

## `Urd › commands`

Commands for the editor's command palette (Ctrl/⌘+K): a plugin defines
`{ label, labelKey?, run }`, the preview reports the list to the editor,
and a chosen command runs here, where the plugin's code lives.

## `registerCore › reserveCoreTypes`

The block and background types are defined as a page asks for them (core-types.js, ADR-0036), and held as the engine's own from the start; the animations are few and every page may use them.

## `registerCore › Urd.blocks.alias('kalender')`

Old plugin contract ids resolve to the renamed ids (ADR-0021): pages
built before the rename still carry the old ones. Map, form and calendar
are core blocks; a plugin that still defines an old id wins directly
(registry alias semantics).

## `engineVersion`

The engine version, the basis for the plugins' requiresEngine check: the name of the folder this module is served from, which is always urd.json's `engine` (ADR-0013), so it costs no request; urd.json is read only where the module stands elsewhere.
An unreachable manifest, or one without `engine`, yields '0.0.0', which rejects every version requirement that asks for more than it instead of loading blindly; a requirement of an upper bound alone (`<`, `<=`) still holds for it.

## `followJump`

Follows a jump to the element with this id.
A menu that hides on scroll is held in view while the page moves.
A change of size (the menu shrinking on the way, data blocks still measuring above the spot) puts the spot back below the menu once the page has stood still for a moment; scrolling only postpones a correction that is waiting.
After the first correction, any scroll the follow did not make is the visitor's own and ends it, as do a wheel, a key, a touch or a press, or `ms` passing.
The element is looked up again on every correction, since a render replaces it.

## `jumpTo`

Brings the element with this id to the top of the window at once, below a menu that stays on screen (the scroll-padding in base.css), or `offset` px past it, and follows the jump while the page that has just been drawn settles.

## `spotTop`

The scroll position that brings an element's top right below a menu that stays on screen (the page's scroll-padding-top).
The top is the one the page lays out, without the transforms an entrance animation still holds the element in before it is revealed (offsetTop up the offsetParent chain), so the spot lands where it ends up.

## `wireJumps`

A link to a spot on this page: the browser's own jump does the work, shaped by the scroll-padding and the smooth scrolling in base.css, and the engine follows it.
A link holds a spot's id, so the jump goes to its name when it has one, and the address shows the name; a link that names the page with a different trailing slash would load the page again.
In both cases the fragment is handed to the address, which jumps in place; where the address holds that fragment already, the engine scrolls to the spot itself.
A plain left click only: a link the page has already handled, one opened in a new tab and a download are left alone.

## `arriveAtSpot`

The arrival jump: the page is drawn after the browser has looked for the address's fragment, so the engine jumps there once the page stands (jumpOnArrival says when).
A prerendered page jumps when it is shown.

## `let arrival`

Cross-document View Transitions (ADR-0011): the arriving page is captured
at its first rendering opportunity, before the engine has fetched its
data and rendered anything. The hold keeps the old page's snapshot on
screen and the empty shell out of sight (the html class, styled in
base.css) until the first render, which ends the transition as a cut. A
page already rendered at arrival (a prerendered document) takes the plain
cross-fade. Without cross-document support the event never fires, or fires
without a transition, and the page navigates normally (end state).

## `resolvePage`

Finds the page for the current URL in the page register.
?page=\<id> overrides (useful locally, where simple file servers do not
route the paths); otherwise location.pathname is matched; the fallback is
the first page in the register, hidden or not. A hidden page is found by
?page= or its path only in the preview, where the owner works on it; for a
visitor only the fallback reaches it, when it stands first.

## `loadDrafts`

The drafts this browser's editor keeps, for the draft view and the preview's first paint (drafts.js, loaded for those alone); with `look`, a saved draft the editor handed this tab (receiveLook) stands over this browser's own; a browser whose storage is closed has none.

## `let cleanWatcher`

The Clean view's texts: every text the editor lets the owner write in place (contenteditable) is plain text while the Clean view stands, its own kind kept (data-urd-editable) and given back as the editing view returns.
A text drawn while the Clean view stands (a section drawn anew, a calendar's card opened) is made plain as it comes.

## `enablePreview`

Attaches postMessage listening and height reporting in preview mode.
state = { page, site, engine, viewport } is shared with boot, so view
switches and the other editor messages always work on the same data.
Every message passes the draw queue (preview-queue.js, ADR-0036 decision 4): until every core type, design part and feature is in, a message that draws (a section, a page, the site, the view, the bars' choices) loads what it draws first, and the messages after it wait behind it in the order they came, so a fit is measured on the block as drawn and no block is drawn as an unknown type.
The rest loads in the background once the editor's start is drawn and answered (`urd-startup-done`, which waits in the queue behind the start's own messages, answered with `urd-shown`), so the start's loads, its plugins and language among them, never share the network with every other type; a frame whose editor sends no start (the design picker's, the phone fit's) loads it at an idle time `START_WAIT_MS` after ready. From then on every message is handled as it comes.
The start's answer, `urd-shown` with the round the editor sent, so the editor knows it from an earlier document's, waits for the language the start sent (`langQueue`), and for the plugin list (`pluginsIn`) where the page draws a type only a plugin defines or its language is still to come from a pack, since those draw the page again as they come; a language pack for another language changes nothing drawn, and the canvas does not wait for it (measured 24 November 2026: the template's Swedish pack took about half a second). Then it waits two animation frames, so it goes out once the drawing has been painted, and the editor lifts the canvas's cover on it (lib/CanvasCover.svelte). Pinning is wired as a message is handled (`initSticky` wires once), since a page opened without a pinned block loads its module only as one comes.

## `enablePreview › let langQueue`

Language switches in the preview are serialized: initSiteLocale can wait
on the network (pack languages), and a quick switch back must not be
clobbered by the OLD load finishing last. Each task reads the draft's
language at RUN time, so the last one in the queue always lands on the
current choice; langPending says whether something is in flight, so the
fast path (same language, render synchronously) is never taken while a
load could undo it.

## `enablePreview › const keepScroll`

Preserves the scroll position across a full rerender: the document
 collapses transiently while the data blocks measure asynchronously, and
 the browser otherwise clamps scrollY. Restored after two rAF (after the
 regrow layout).

## `enablePreview › window.addEventListener('storage')`

The bars on the blocks and the sections take the form, the gear, the phone button and the size Urd settings choose, a block's bar its look, what its design button opens and where they stand in the phone view (BAR\_CHOICES in bar-tools.js); a change in the editor, which shares the origin's storage, draws them anew.

## `enablePreview › handle › if (msg?.startup === true && ((msg.type`

The view, site and page the editor sends as the preview reports ready (marked `startup`) repeat what the preview drew from the same drafts as it booted: one that changes nothing draws nothing again, so the page does not flicker as the editor opens.

## `enablePreview › handle › const samePage`

Same normalization as boot(): a page without sections must give an
empty view, not throw in renderPage (and in findIndex on the next
message). The same page (undo/redo and the like) keeps the scroll
position; a real page switch naturally starts at the top.

## `enablePreview › handle › for (const timer of`

The editor has edited a block whose height follows its content
(ADR-0025) and asks for the height the content needs, so the block's
frame can follow it. A design drawn by a module loaded on demand
draws late and a feed can answer late, so the measure is taken three
times; a block still loading its content is not measured, and a
newer request for the same block replaces the measures still waiting.

## `enablePreview › handle › const host`

The editor has fitted a frame to its content and moved the blocks
below: the new frames are put in place without drawing the section
again, so a caret in the block stays where it is.

## `enablePreview › handle › if (!window.matchMedia('(prefers-reduced`

The ribbons stand still while the editing chrome is on, so the words
can be read and typed. This lets them roll for a few seconds, the way
the entrance animations are played as a demo. Reduced motion is left
alone: there the band never moves.

## `enablePreview › handle › for (const key of ['bg', 'surface',`

The admin color theme: the editor menus in the preview (the block
menu, the section gallery) follow admin, not the page being edited.
The values are set as separate variables; ONLY the editor chrome reads
them (preview.css, base.css, the help card in hint.js and the menus in
dropdown.js), never the page's own content.

## `enablePreview › handle › const field`

A style for the whole text from the text's menu: the field takes focus, which brings the text toolbar, and the style is handed to the toolbar as an event on the field (preview-edit.js).

## `enablePreview › handle › const needed`

The editor flagged a section for the phone's review, or cleared it: marked live, and kept in the page the preview holds, so the section drawn again (a switch of view) keeps its mark.

## `enablePreview › handle › jumpTo`

A section the editor brings into view: the attention badge in the top bar (the section that needs review, so the badge points at a place and not just a mode), «Look on the phone» in the phone check, a section picked in the Phone panel, «Go to section» in the command palette, a line of what changed in the Drafts window, and the shop's links to the page that holds a block.
The badge and «Look on the phone» also switch the view to the phone, whose layout settles over the next frames (blocks measure their heights), so the jump settles.

## `enablePreview › handle › jumpTo (2)`

A reload of the editor: the canvas comes back to where it was scrolled, as the section at its top and how far past that section's top (the editor's lib/reload-place.js).

## `enablePreview › handle › jumpTo (3)`

A link in the preview to a spot on a page: the editor sends it once the page the link names stands, and the preview jumps there as the published page does on arrival.

## `enablePreview › handle › feature('collections')?.setCollectionsDr`

Collection drafts from the editor: used instead of the server files.
Only sections with collection blocks are rerendered: a full
renderPage collapses the document transiently (the data blocks
measure asynchronously), and the browser then clamps the scroll
position to the top.

## `enablePreview › handle › const held`

A block's words written on the page, the desktop's and the phone's own (ADR-0033), as the editor keeps them: put in the page's copy without drawing the block, where the words already stand as typed, so a later drawing reads them.

## `enablePreview › handle › then › blocks.push`

The admin WINDOW's dictionary never has plugin keys: the labels
are resolved HERE (the iframe side, where the plugin dictionary
lives) and sent as finished strings. fromPlugin already carries
the display name (manifest.names).

## `enablePreview › handle › then › push › fields`

The field contract (additive): a def with `fields` gets its
settings rendered directly in the Properties panel instead of
a separate config panel. The labels are resolved here for the
same reason as above.

## `enablePreview › handle › const z`

The canvas is scaled with a transform on the iframe, so EVERYTHING
inside shrinks with the zoom, including the editing handles. They
should however keep the same screen size as the admin panels, so
they are counter-scaled with 1/zoom. Only a CSS variable: no
rerender, and visitors never see it.

## `enablePreview › handle › state.site.theme`

A change of the theme's colours alone (a colour dragged in the Theme panel) is the theme's CSS: nothing is drawn again.
The theme goes into the site the nav holds, so its light and dark toggle reads the new one.

## `enablePreview › handle › state.site`

Site draft from the editor (grid, theme, nav): everything that
depends on site.json is rerendered. Same truncation guard as in
boot(): a draft missing these parts must never throw and freeze the
preview.

## `enablePreview › handle › if (langOutOfSync()`

Changed site.lang in the draft: reload the visitor locale BEFORE the
re-render, so the preview is WYSIWYG for the language too (boot read
the site as the preview opened, the published site.json or the kept
draft, and may have a different language). The plugin texts are
layered back on inside syncSiteLocale:
initSiteLocale builds the dictionary from the engine's nb base,
without the plugin keys.

## `askLayerPictures`

An image layer stays hidden until its picture is in (backgrounds/image.js), so a visitor's boot asks for the first section's image layer pictures as soon as the page file is read, beside the page's types, and the layer finds them in the document's image cache. The wait is capped at READY_WAIT_MS, the cap a block's readying has, so a slow picture holds the page no longer than that.

## `boot › wireArrivalHold`

Before the first await: the shell loads boot.js, and this module with it,
render-blocking, so the listener is in place when the arriving
document's pagereveal fires at its first rendering opportunity. Inert in
preview (page switches happen via postMessage, never navigation).

## `boot › const served`

The served text and ETag of site.json and of the page file are kept: a
parked, prerendered or restored page rechecks them against the server
(see recheck below).

## `boot › const editing`

The canvas chrome follows the ADMIN language (two registers, ADR-0012), with the same detection as the editor's main.js (shared localStorage, same origin).
The editing layer and its draw queue (preview-queue.js) are loaded dynamically ONLY in preview - visitors never fetch this code - and must be in place before the page's first render.
The preview's own rules (preview.css) come with it, so the editing chrome is never drawn without them.
All three are asked for as the boot starts, beside the site and the page, since none reads them and the editing layer calls no ta() as it loads.

## `boot › const draftMode`

The draft view (?draft=1, drafts.js): the drafts this browser's editor keeps, drawn as a visitor's page; ?draft=look draws a saved draft the Drafts window opened in a tab of its own.
The preview draws the same drafts from its first paint, the ones the editor holds, so a change not yet published shows at once and is never first drawn as published until the editor's own message arrives.
They are read alongside site.json.

## `boot › document.documentElement.lang`

The visitor language (ADR-0012): site.lang governs the engine's own
texts and date names. Must be loaded BEFORE the first render; the
document's lang attribute is set from the same source (the shells
hardcode "no" as the pre-JS default).

## `boot › const draftPage`

The page's draft, which the preview and the draft view read where this browser's editor keeps one; without it they fetch the page file as a visitor's page does (pagePromise).
The preview then receives its pages via postMessage.

## `boot › const pagePromise`

Otherwise the page file depends only on the register, so its fetch
starts here and runs alongside the plugin loading instead of after it:
with the engine cached, the serial round trips are what a page switch
costs.

## `boot › const pluginsLoaded`

In preview the EDITOR owns the plugin list (the draft in plugins.json): boot loads nothing,
and the urd-plugins message loads the draft's active plugins so they work before publishing.
For a visitor the plugins load beside the page, and the menu and the page wait for them only when they use a type no core module defines (pageTypes below).

## `boot › const mq`

Responsive: a visitor's viewport follows the screen width (the
editor's preview starts on desktop, whatever the iframe's width). When
the breakpoint is crossed, the page is rerendered in the right mode.
In preview the editor owns the viewport (the urd-viewport message); for
visitors it follows the screen width. Both body classes are set before
the menu renders, so it is built for the right mode and the right
audience from the first paint.

## `boot › const pageLifted`

Version lifting at file level: older page files are lifted to the
current format in memory (disk is written first at the next publish).
If the page file is missing (half-finished deploy, hand-edited
register), an empty page is shown instead of a crash - the page never
dies from bad data.

## `boot › loadCoreTypes`

The preview loads as a visitor's page does: the core types its menu, its footer and the open page draw with as soon as each is known, the site's and the page's features, and, with the editing layer, its section presets.
Every other type, design part and feature comes in the background once it has reported ready (enablePreview), so the canvas stands as soon as the open page's own code is in.

## `boot › const pageReady`

The page's types, what its blocks draw with beyond their module (prepareBlocks, so a calendar stands in its own design from the first drawing) and the first section's image layer pictures are asked for as soon as the page file is read, beside the menu's types (in the preview, which does not wait for pictures, the footer's feature and the section presets too); the menu, «Back to top» and the page are drawn in one task once all of them are in, so they stand in one frame.

## `boot › opts.footer`

The shared footer: its own element right after the main content, created here since index.html is Urd-owned and cannot be changed by publishing.
It joins the document once the page is drawn (below), so it is never shown at the top while the page loads and then pushed down.

## `boot › if (!preview`

SEO metadata (description, canonical, og: fields, JSON-LD) is set
outside the preview, the draft view included: the preview address
(?preview=1) is never a canonical page.
The owner's own draft view is not counted, except in a browser whose
storage is closed, where no drafts are read (loadDrafts).

## `boot › const drawFooter`

The footer is rendered now that the page id is known (per-page hideOn visibility): in the preview at once, and for a visitor as it joins the document, so its background layers start in the page.

## `boot › if (preview`

A visitor's footer joins once no block on the page is still fetching its content, or after FOOTER\_WAIT\_MS (whenSettled), so the page's own content never pushes it down within that time; the editor's preview shows it at once.

## `boot › const applyFreshPage`

A newer page file rerenders in place. The scroll position survives
the rerender (the document collapses transiently while the data
blocks measure), and the sticky blocks are re-pinned with it, two
frames after the drawing.

## `boot › applyFreshPage › const freshReadied`

A page published since with a type of its own waits for its module, and for the plugins where it uses a plugin's type, as the first drawing does; until then the page shown stays the one a redraw draws.

## `boot › let checking`

The page shown may predate the site as published: a parked copy, a
prerendered document, or one restored from the back-forward cache.
One check at a time against the server: a changed site.json (the
register, nav, theme, layout or language) reloads, a changed page
file rerenders, a current copy leaves the page be. Errors are
swallowed: the page never dies from a failed check.

## `boot › if (drafts`

A parked page checks now, a prerendered document at activation and one restored from the back-forward cache as it is shown; a page whose file was fetched as it loaded does not check.
The draft view never trades its drafts for the server's files: it reads them anew on a return from the back-forward cache.
