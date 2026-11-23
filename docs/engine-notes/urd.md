# urd.js

The full text of the longer comments in the engine's `urd.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The Urd engine - entry point.

Run by template/index.html. Creates the global Urd object with the
registries, registers the core types and plugins, finds the right page in
the page register, and renders. All data is version-lifted on load
(migrate.js) - see docs/SCHEMA.md.

In preview mode (?preview=1) the engine additionally listens for
postMessage drafts from the editor and rerenders incrementally.

## `refreshShopGate`

The shop gate for the «+ New block» menu: the preview module reads it from the site's own choice and whether a product catalogue stands among the collection drafts (block-palette.js shopOn, kept out of the visitor closure).

## `Urd › commands`

Commands for the editor's command palette (Ctrl/⌘+K): a plugin defines
`{ label, labelKey?, run }`, the preview reports the list to the editor,
and a chosen command runs here, where the plugin's code lives.

## `registerCore › reserveCoreTypes`

The block and background types are defined as a page asks for them (core-types.js, ADR-0036), and held as the engine's own from the start; the animations are few and every page may use them.

## `registerCore › Urd.blocks.alias('kalender')`

Old plugin contract ids resolve to the renamed ids (ADR-0021): pages
built before the rename still carry the old ones. Map, form and calendar
are core blocks since 0.7.18; a plugin that still defines an old id wins
directly (registry alias semantics).

## `engineVersion`

The engine version, the basis for the plugins' requiresEngine check: the name of the folder this module is served from, which is always urd.json's `engine` (ADR-0013), so it costs no request; urd.json is read only where the module stands elsewhere.
An unreachable manifest yields '0.0.0', which rejects the version requirements instead of loading blindly.

## `followJump`

Follows a jump to the element with this id.
A menu that hides on scroll is held in view while the page moves.
A change of size (the menu shrinking on the way, data blocks still measuring above the spot) puts the spot back below the menu once the page has stood still for a moment; scrolling only postpones a correction that is waiting.
After the first correction, any scroll the follow did not make is the visitor's own and ends it, as do a wheel, a key or a touch, or `ms` passing.
The element is looked up again on every correction, since a render replaces it.

## `jumpTo`

Brings the element with this id to the top of the window at once, below a menu that stays on screen (the scroll-padding in base.css), or `offset` px past it, and follows the jump while the page that has just been drawn settles.

## `spotTop`

The scroll position that brings an element's top right below a menu that stays on screen (the page's scroll-padding-top).
The top is the one the page lays out, without the transforms an entrance animation still holds the element in before it is revealed (offsetTop up the offsetParent chain), so the spot lands where it ends up.

## `wireJumps`

A link to a spot on this page: the browser's own jump does the work, shaped by the scroll-padding and the smooth scrolling in base.css, and the engine follows it.
A link holds a spot's id, so the jump goes to its name when it has one, and the address shows the name; a link that names the page with a different trailing slash would load the page again.
In both cases the fragment is handed to the address, which jumps in place.
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
cross-fade. Without cross-document support the event never fires and the
page navigates normally (end state).

## `resolvePage`

Finds the page for the current URL in the page register.
?page=\<id> overrides (useful locally, where simple file servers do not
route the paths); otherwise location.pathname is matched; the fallback is
the first page in the register. A hidden page is found only in the
preview, where the owner works on it; for a visitor it is not there.

## `loadDrafts`

The drafts this browser's editor keeps, for the draft view and the preview's first paint (drafts.js, loaded for those alone); with `look`, a saved draft the editor handed this tab (receiveLook) stands over this browser's own; a browser whose storage is closed has none.

## `let cleanWatcher`

The Clean view's texts: every text the editor lets the owner write in place (contenteditable) is plain text while the Clean view stands, its own kind kept (data-urd-editable) and given back as the editing view returns.
A text drawn while the Clean view stands (a section drawn anew, a calendar's card opened) is made plain as it comes.

## `enablePreview`

Attaches postMessage listening and height reporting in preview mode.
state = { page, site, viewport } is shared with boot, so breakpoint
switches and editor messages always work on the same data.

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

## `enablePreview › addEventListener('message') › if (msg?.startup === true && ((msg.type`

The view, site and page the editor sends as the preview reports ready (marked `startup`) repeat what the preview drew from the same drafts as it booted: one that changes nothing draws nothing again, so the page does not flicker as the editor opens.

## `enablePreview › addEventListener('message') › const samePage`

Same normalization as boot(): a page without sections must give an
empty view, not throw in renderPage (and in findIndex on the next
message). The same page (undo/redo and the like) keeps the scroll
position; a real page switch naturally starts at the top.

## `enablePreview › addEventListener('message') › for (const timer of`

The editor has edited a block whose height follows its content
(ADR-0025) and asks for the height the content needs, so the block's
frame can follow it. A design drawn by a module loaded on demand
draws late and a feed can answer late, so the measure is taken three
times; a block still loading its content is not measured, and a
newer request for the same block replaces the measures still waiting.

## `enablePreview › addEventListener('message') › const host`

The editor has fitted a frame to its content and moved the blocks
below: the new frames are put in place without drawing the section
again, so a caret in the block stays where it is.

## `enablePreview › addEventListener('message') › if (!window.matchMedia('(prefers-reduced`

The ribbons stand still while the editing chrome is on, so the words
can be read and typed. This lets them roll for a few seconds, the way
the entrance animations are played as a demo. Reduced motion is left
alone: there the band never moves.

## `enablePreview › addEventListener('message') › for (const key of ['bg', 'surface',`

The admin color theme: the editor menus in the preview (the block
menu, the section gallery) follow admin, not the page being edited.
The values are set as separate variables; base.css uses them ONLY on
the editor chrome, never on the page's own content.

## `enablePreview › addEventListener('message') › const field`

A style for the whole text from the text's menu: the field takes focus, which brings the text toolbar, and the style is handed to the toolbar as an event on the field (preview-edit.js).

## `enablePreview › addEventListener('message') › const needed`

The editor flagged a section for the phone's review, or cleared it: marked live, and kept in the page the preview holds, so the section drawn again (a switch of view) keeps its mark.

## `enablePreview › addEventListener('message') › jumpTo`

The attention badge in the top bar: scroll to the section that needs review, so the badge points at a place and not just a mode.
The badge also switches the view to the phone, whose layout settles over the next frames (blocks measure their heights), so the jump settles.

## `enablePreview › addEventListener('message') › jumpTo (2)`

A reload of the editor: the canvas comes back to where it was scrolled, as the section at its top and how far past that section's top (the editor's lib/reload-place.js).

## `enablePreview › addEventListener('message') › jumpTo (3)`

A link in the preview to a spot on a page: the editor sends it once the page the link names stands, and the preview jumps there as the published page does on arrival.

## `enablePreview › addEventListener('message') › setCollectionsDraft`

Collection drafts from the editor: used instead of the server files.
Only sections with collection blocks are rerendered: a full
renderPage collapses the document transiently (the data blocks
measure asynchronously), and the browser then clamps the scroll
position to the top.

## `enablePreview › addEventListener('message') › const held`

A block's words written on the page, the desktop's and the phone's own (ADR-0033), as the editor keeps them: put in the page's copy without drawing the block, where the words already stand as typed, so a later drawing reads them.

## `enablePreview › addEventListener('message') › then › blocks.push`

The admin WINDOW's dictionary never has plugin keys: the labels
are resolved HERE (the iframe side, where the plugin dictionary
lives) and sent as finished strings. fromPlugin already carries
the display name (manifest.names).

## `enablePreview › addEventListener('message') › then › push › fields`

The field contract (additive): a def with `fields` gets its
settings rendered directly in the Properties panel instead of
a separate config panel. The labels are resolved here for the
same reason as above.

## `enablePreview › addEventListener('message') › const z`

The canvas is scaled with a transform on the iframe, so EVERYTHING
inside shrinks with the zoom, including the editing handles. They
should however keep the same screen size as the admin panels, so
they are counter-scaled with 1/zoom. Only a CSS variable: no
rerender, and visitors never see it.

## `enablePreview › addEventListener('message') › state.site.theme`

A change of the theme's colours alone (a colour dragged in the Theme panel) is the theme's CSS: nothing is drawn again.
The theme goes into the site the nav holds, so its light and dark toggle reads the new one.

## `enablePreview › addEventListener('message') › state.site`

Site draft from the editor (grid, theme, nav): everything that
depends on site.json is rerendered. Same truncation guard as in
boot(): a draft missing these parts must never throw and freeze the
preview.

## `enablePreview › addEventListener('message') › if (langOutOfSync()`

Changed site.lang in the draft: reload the visitor locale BEFORE the
re-render, so the preview is WYSIWYG for the language too (boot read
the published site.json and may have a different language). The
plugin texts are layered back on inside syncSiteLocale:
initSiteLocale builds the dictionary from the engine's nb base,
without the plugin keys.

## `boot › wireArrivalHold`

Before the first await: the shell loads this module render-blocking, so
the listener is in place when the arriving document's pagereveal fires
at its first rendering opportunity. Inert in preview (page switches
happen via postMessage, never navigation).

## `boot › const served`

The raw file is kept as migration context: the v1 page lift needs the
ORIGINAL grid (columns/rowHeight), which the lifted site has lost. The
served text and ETag are kept too: a prerendered or restored page
rechecks them against the server (see recheck below).

## `boot › const editing`

The canvas chrome follows the ADMIN language (two registers, ADR-0012), with the same detection as the editor's main.js (shared localStorage, same origin).
The editing layer is loaded dynamically ONLY in preview - visitors never fetch this code - and must be in place before the first render.
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

A page file parked by the previous page's intent prefetch (prefetch.js) is used as it is and revalidated after the first render.
Visitors only: the preview and the draft view read the page's draft, and the preview then receives its pages via postMessage.

## `boot › const pagePromise`

Otherwise the page file depends only on the register, so its fetch
starts here and runs alongside the plugin loading instead of after it:
with the engine cached, the serial round trips are what a page switch
costs.

## `boot › const pluginsLoaded`

In preview the EDITOR owns the plugin list (the draft in plugins.json): boot loads nothing,
and the urd-plugins message loads the draft's active plugins so they work before publishing.
For a visitor the plugins load beside the page, and the page waits for them only when it uses a type no core module defines (pageTypes below).

## `boot › const mq`

Responsive: the viewport follows the screen width (also in the
editor's preview, where the iframe is narrowed to mobile width). When
the breakpoint is crossed, the page is rerendered in the right mode.
In preview the editor owns the viewport (the urd-viewport message); for
visitors it follows the screen width. Both body classes are set before
the menu renders, so it is built for the right mode and the right
audience from the first paint.

## `boot › if (preview`

The page id is known from the register, so a page the menu stays off (nav.hideOn) starts without it.
The core types the nav draws with are loaded before it is drawn; the preview loads every core type, and the section presets, since the editor offers them all.

## `boot › opts.footer`

The shared footer: its own element right after the main content, created here since index.html is Urd-owned and cannot be changed by publishing.
It joins the document once the page is drawn (below), so it is never shown at the top while the page loads and then pushed down.

## `boot › let page`

Version lifting at file level: older page files are lifted to the
current format in memory (disk is written first at the next publish).
If the page file is missing (half-finished deploy, hand-edited
register), an empty page is shown instead of a crash - the page never
dies from bad data.

## `boot › const readied`

A visitor's page loads the core types it and the footer use (core-types.js), and what its own blocks draw with beyond their module is readied beside them, so a calendar stands in its own design from the first drawing (prepareBlocks).

## `boot › if (!preview`

SEO metadata (description, canonical, og: fields, JSON-LD) is set only
for visitors: the preview address (?preview=1) is never a canonical page.
The owner's own draft view is never counted.

## `boot › const drawFooter`

The footer is rendered now that the page id is known (per-page hideOn visibility): in the preview at once, and for a visitor as it joins the document, so its background layers start in the page.

## `boot › if (preview (2)`

A visitor's footer joins once no block on the page is still fetching its content, so the page's own content never pushes it down; the editor's preview shows it at once.

## `boot › const applyFreshPage`

A newer page file rerenders in place. The scroll position survives
the rerender (the document collapses transiently while the data
blocks measure), and the sticky blocks are re-pinned right away.

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

A prerendered document checks at activation, everything else now.
The draft view never trades its drafts for the server's files: it reads them anew on a return from the back-forward cache.
