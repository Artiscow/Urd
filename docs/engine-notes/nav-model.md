# nav-model.js

The full text of the longer comments in the engine's `nav-model.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Pure nav logic: classifying menu items, page-register lookups and
appearance computation. No DOM - the module is node-importable and
covered by tests/nav.test.mjs; the DOM building lives in nav.js.

## `const SAFE_IMAGE_RE`

Safe image source: only known image shapes (a base64 data URL for
unpublished uploads, a site-relative path, or the site's own
picture route for a shared folder, which is the one place a query string is
allowed and which never serves anything but an image from a checked host)
are let into img.src and CSS url(); everything else (external hosts,
characters that break url("…")) is ignored. Anchored regex on purpose -
CodeQL recognizes it as a barrier. Shared guard for the favicon, nav logo
and background, footer logo, icon block and the image layer.

## `const SAFE_URL_RE`

Safe link URL for nav/footer links (item.href): only http(s), mailto and
tel, the addresses that leave the site. javascript:/data: and everything else
is rejected, so an untouched href can never become an active URL.
Anchored regex on purpose - CodeQL recognizes it as a barrier. Internal
pages are linked via `page`, or by a site path or a fragment in href, which SAFE\_INTERNAL\_RE below lets through (isSafeHref).

## `const SAFE_INTERNAL_RE`

Safe block href (button/image/collection/gallery): in addition to the
external schemes above, site-internal paths ('/...', never
protocol-relative '//...') and anchors ('#...') are accepted, as the
collection schema documents for entry.href. Backslash is rejected in the
path branch: browsers normalize '\\' to '/' in http(s) URLs, so '/\\evil.no'
would otherwise become protocol-relative anyway. Anchored regex on
purpose - CodeQL recognizes it as a barrier.

## `resolveLink`

Resolves one link, in the shape every host stores beside its own fields (additive from 0.7.27.3): `page` (a page id in the register), `target` (the id of a section or block on that page, or on this page when there is neither `page` nor `href`), `href` (an address: http(s), mailto, tel, or a path or a fragment of the site, through the safe-URL gate), `newTab` (open in a new tab), `rel` (a list of 'nofollow' and 'sponsored', which count only for an http(s) address) and `download` (save the file rather than open it, additive from 0.7.27.9, which counts only for a path on the site).
`page` wins over `href`, so the link follows a change of the page's address, and `target` holds the spot's id, so it follows a rename of the spot; the address shows the spot's name once the visitor has landed (urd.js).
An unknown page or an address that fails the gate gives '#' and the missing flag (the hosts log the warning - this module has no side effects).
`newTab`, `rel` and `download` appear only when set.

## `linkAttrs`

The attributes a resolved link puts on its element: its address, a new tab, the rel words, and `download` for a file to save.
A link that leaves the site (http(s), mailto, tel) gets the host's own words (the menu's noopener, the footer's noopener noreferrer), a new tab gets noopener, and the owner's words come last.

## `resolveItem`

Resolves a menu item against the page register through resolveLink: the item's label with the link's address, its flags, and a new tab and rel words when set.
An unknown page or unsafe href yields '#' with the missing flag.

## `navItems`

Builds the menu model nav.js renders from. Each item gets a `kind`:
'link' (plain link), 'split' (own target plus submenu: link plus arrow
button) or 'toggle' (submenu only: the whole item is the opener). The
submenus go three levels deep (the second additive from 0.7.13.21, the third from 0.7.30.6): a child may carry
children of its own down to the third level, and anything deeper is ignored defensively. Every
item carries its `description` (one line under the label, '' without
one), and a top-level item its `look` ('button' for a call to action
drawn as a button, '' for a plain item).

## `navItems › const hidden`

A hidden page is not on the published site, so no item leads to it: an item to one is left out, or stands as a plain opener while it keeps a submenu of items that still lead somewhere.

## `burgerModel`

The burger as it is drawn (nav.style.burger, additive from 0.7.13.21): the icon id, whether the word stands beside it, and the owner's own word ('' for the translated default, which is nav.js's business).
An unknown icon gives the lines, and so does `none` without the word, so the button never stands empty.

## `announcementHidden`

Whether the announcement strip stays off a page (nav.announcement.hideOn, additive from site schemaVersion 6): the page ids the owner listed, apart from the menu's own list.

## `hideMode`

The way the menu is reached on a page listed in nav.hideOn (additive from 0.7.13.21): `hidden` (nothing), `hover` (the pointer at the top edge slides it in), `ghost` (the pointer at the top edge shows it faint, and it turns solid when the pointer rests on it) or `tab` (a pull tab at the top edge at all times).
Touch has no hover, so nav.js draws the tab for `hover` and `ghost` there too.

## `tabModel`

The pull tab as drawn (nav.tab, additive from 0.7.13.21): the owner's own mark (an uploaded image, else an icon id), word and colours, or the default tab (the burger lines on the submenus' default surface) when none is set.
The word and the colours are '' when unset; `custom` says whether any field is set.

## `subGrouped`

Whether the submenu is laid out in columns (nav.style.subColumns above 1) or as the flyout: there the levels below the first stand as headed groups under their items rather than as panels beside them.

## `const TOOL_IDS`

The tools in the cluster, in the order they stand unless the owner says
otherwise. The burger is not among them: it is the mobile menu's opener
and ends the cluster, or begins it where the cluster stands at the start of the bar (nav.style.tools.side).

## `toolOrder`

The cluster's order (nav.style.tools.order, additive since v0.7): the
owner's own order first, then whatever is left in the default order, so a
list that names one tool or an unknown one still yields every tool once.

## `launcherModel`

The link launcher (nav.launcher, additive since v0.7): the shortcuts behind
the launcher button in the tool cluster, and the same shortcuts as a
section inside the mobile menu. null unless the button is shown; every
row is drawn, and a row whose target fails the menu links' guard gets '#'
and the missing flag, so the tile stands and goes nowhere, the way an
unknown page does in the menu. A row's mark is an uploaded image or an id from the
icon library; nav.js draws it, and neither leaves the tile with its label
alone. `view` is the design on the desktop and `mobileView` the one in
the mobile menu (omitted = the same design as the desktop). `title` is
the custom heading, empty without one, and `titleShow` says whether the heading stands; the
translated default word is nav.js's business, not this module's.

## `launcherModel › const links`

Every row the owner has added is drawn: the launcher stands as soon as it
is switched on, and a row whose target is not a usable link gets '#' with
the missing flag, exactly as a menu item pointing at an unknown page does.

## `launcherModel › mobileMax`

How many shortcuts the mobile menu shows before the rest fold into
«show more»: the panel on the desktop simply scrolls, but the mobile
menu is the page's own list and must not grow without end.

## `launcherVars`

The CSS custom properties that size the launcher's panel and tiles: the size's scale, and a px value for each part the owner set on its own (base.css reads them, the scale where a part has none).

## `navScrollState`

Scroll behavior for the menu (nav.scroll, additive since v0.6): pure
state computation, the DOM part lives in nav.js. 'shrink' = compact
after some scrolling; 'hide' = hidden on scroll down, shown on scroll up.
Near the top (below TOP\_ZONE, or for the shrink below its own distance, nav.style.shrinkAt) the menu is always normal and visible.
The state flips on the distance travelled, not on the direction of a
single frame: `anchor` is the turning point the travel is measured from,
and the function returns the next one, so the caller only carries it.
While the menu is visible the anchor follows the page up, and while it is
hidden it follows the page down, so the distance is always measured from
the furthest point in the current direction. `scrolled` says whether the
page has left the top zone, whatever the mode: the transparent-at-top
surface (nav.style.atTop) reads it.
`hold` keeps a hiding menu in view while a jump to a spot on the page runs, so the spot lands under it, and the travel is measured from where the jump ends.

## `navScrollState › const HIDE_TRAVEL`

Asymmetric on purpose. Hiding asks for a deliberate scroll down, so the
menu does not leave at the first notch; showing it again answers a short
scroll up, so it is there the moment it is wanted.

## `scrollClear`

The room a jump to a spot on the page leaves above the spot, so it lands under a menu that stays on screen: a sticky top bar's own height, nothing for a menu that scrolls away with the page, and for the side column only a strip fixed across the page above it. nav.js writes it to `--urd-scroll-clear`, which base.css gives the page as its `scroll-padding-top`.

## `const ANCHOR_NAME_RE`

A name an owner gives a section or a block, so a link can point at it (`/kaker#priser`): lower-case letters, digits and inner hyphens, at most 40 characters, never one of the prefixes the engine's own ids use.
Anchored regex on purpose - CodeQL recognizes it as a barrier.

## `hashTarget`

The element id a URL fragment names: `#priser` gives `priser`, and a percent-encoded fragment is decoded the way the browser reads it.
An empty fragment names nothing.

## `samePageHash`

A link to a spot on the page the visitor is on: the same origin and query, and the same path with or without a trailing slash, since the site serves a page at both.
`inPlace` says whether the browser follows it without loading the page again, which it does only when the path is written exactly as the address bar has it.
Anything else gives null.

## `jumpOnArrival`

Whether the engine jumps to the address's fragment once the page has rendered.
The page is drawn after the browser has looked for the spot, so a visit with a fragment jumps there.
A return through the history and a reload keep the place the browser restores, and so does a page that has already left the top.

## `effectiveNav`

The nav as it applies at the current breakpoint (additive since v0.7):
the keys present in nav.style.mobile among size, inset, tools and border replace the desktop values they
name, its layout and overlay replace the nav's own, and nothing else changes. Everything downstream (navClasses,
hostClasses, navSizeVars) then reads one resolved nav; navClasses and navSizeVars are also told the breakpoint,
for the phone's own classes and the sizes nav.style.mobile and nav.logo set there.

The choice is made here rather than with a CSS class for the reason
ADR-0023 gives: urd-nav-mobile is also set by desktop content folding, so
a class can never be the source of truth for what applies. `layout` and
`overlay` sit in the same bag although they are not style fields, since
nav.style.mobile is where the mobile overrides live.

## `subOpenMode`

How the submenus open on a mouse device: hover opens and closes them
(`hover`, the default), hover opens them and only a click, another item
or a click outside closes them (`stay`), or the pointer does nothing and
only a click opens and closes them (`click`). Touch never gets hover in
any mode. Pure function; an unknown value reads as the default.

## `mobileMenuMode`

How the burger opens the menu (nav.style.mobileMenu, additive since v0.7):
`dropdown` is the panel below the bar, `sheet` the full-screen dialog.
Anything else falls back to the dropdown.

## `mobileSubMode`

How submenus start in the mobile menu (nav.style.mobileSubs, additive
since v0.7): `collapsed` (a tap anywhere on the item opens it, the item
never navigates, and its own page is listed first in the submenu) or
`expanded` (every submenu open from the start, the item is a plain link).
Anything else falls back to collapsed.

## `phoneMenuModel`

The phone menu's own look (additive from 0.7.13.17): where its items' text stands in both phone menus (nav.style.mobileAlign), whether a submenu shows its arrow there (nav.style.mobileSubArrow), and whether the bar keeps its tools beside the full-screen menu (nav.style.sheetBarTools).
Unknown values fall back to the defaults: the text on the left, the arrow shown, and the tools in the bar.

## `sheetMotion`

Where the full-screen sheet comes from when it opens: a slide from one of
the four edges, a fade, or none (it simply appears). Anything else gives
the slide from the top.

## `navClasses`

The CSS classes on the nav element. Variant (floating pill) and hover
style (additive since v0.6) yield extra classes only when they deviate
from the default, so existing sites render unchanged.
`mobile` says the mobile breakpoint matches: only then do the phone's own classes join, the logo's place in the bar and how a link answers a touch (nav.style.mobile.logo and .press, additive from 0.7.3.25).

## `navClasses › const isBar`

Inset (additive since v0.7, ADR-0023, the default since schemaVersion 4):
the bar's contents line up with the content edge while the background
keeps the full width. Only the top bar can be inset; the pill has its
own width and the column none.

## `navClasses › const isSide`

Border and shadow (additive since v0.7): the side the border sits on
and the shadow strength are allowlisted classes; the border's width and
colour are variables set by nav.js. The column draws no border, and the
pill has its glow instead of a shadow.

## `navClasses › if (['left',`

The phone's own placement (nav.style.mobile.layout): its links wait behind the burger, so it places the burger and its buttons, right after the logo or in the middle of the room beside it; at the edge, the default, it needs no class.

## `navClasses › const phoneMenu`

The phone menu's look (additive from 0.7.13.17): set at every width, since the preview's phone view is not the breakpoint; the CSS reads them only in the phone state.

## `announcementModel`

The announcement bar above the menu (nav.announcement, additive since
v0.7): null unless `show` is true and there is text, otherwise the
finished values. The link is a page from the register (`page`) or a
free `href` through the same guard as menu links; `sticky` defaults to
true (the bar follows the menu), false lets it scroll away while the menu
stays; `dismiss` (default true) adds a cross for the visitor. `bg` and `color` are
resolved theme tokens or raw colours, empty when the CSS defaults (the
accent and its text colour) apply. A page listed in the strip's own
hideOn gets null.

## `announcementModel › place`

Where the strip sits with a side column (nav.js honours it for the
side variants only): in the column, above the whole page, or above
the content beside the column.

## `const NAV_PRESSES`

How a link of the menu can answer a touch on the phone (nav.style.mobile.press): a fill in the hover colour around the link, a line under the link, or the link drawn a little smaller.

## `navSizeVars`

The inline size values for the nav element (ADR-0023): custom properties
the CSS reads with today's look as the fallback, the menu font size and
the logo image height. The mobile overrides (nav.style.mobile and
nav.logo.mobileSize) are chosen here from the breakpoint state at render
time: the burger class is also set by content folding on desktop, and a
class rule can never beat an inline value, so the choice belongs in JS.
An empty style yields empty vars.

## `hostClasses`

Classes for the HOST (the header element) and body, derived from the
variant: floating takes the host out of the flow; the side variant turns
it into a fixed column and gives body content padding on the same side.
The transparent-at-top surface (nav.style.atTop 'clear', additive from
v0.7) is a host class for the bar and the floating menu, never the
column: the CSS hides the surface until the host also carries
urd-nav-scrolled, which nav.js toggles from the scroll state.

## `navSurface`

Computes the appearance overrides from nav.style: `bg` is the finished
background value for --urd-nav-bg (submenus and the mobile panel take
theirs from navSubSurface), `blur: false` turns the blur off, `color` is the text color.
With `image` (additive since v0.6) the background becomes the image
with the color/opacity as a veil on top. An empty object = the CSS
defaults apply.

## `navSurface › const color`

The veil is repeated as a gradient layer over the image; without
explicit choices the default surface is used (surface at 85 %), so
the text always has a background to sit on.

## `navSurface › const strength`

Image strength (0..1, default 1): a weaker image is toned toward the
background color with its own layer under the veil - CSS cannot set
opacity on a single background layer.

## `navSurface › const x`

Crop position (0..100, default 50 centered): the height is what
matters in the low wide bar, the width in the tall narrow side
column - both are exposed, so the choice works in every variant.

## `navSubSurface`

The background for the submenu and the mobile panel (--urd-nav-sub-bg):
by default ONLY the veil, never the background image - the image comes
along only when the owner turns on nav.style.subImage. Undefined = the
CSS default applies.

## `navLayerVeil`

Flattens the layer stack's COLOR layers into one veil for the submenu
and the mobile panel, so the dropdown follows the bar's tone when the
nav has a layer background. Image and gradient layers are kept out, the
same principle as subImage: the submenu never gets the image. Layers are
drawn in list order (first at the back), so each color layer is mixed
over the previous ones. Null = no color layers, the CSS default applies.

## `keepsSheet`

Whether an open full-screen phone menu is kept through a render (renderNav): it was open, its bar still stands in the host, this render wants the full-screen menu too, and the phone state holds (the breakpoint, the preview's phone view, or a bar folded to the burger).
A kept menu is never closed and takes the new render's contents, so the owner setting it in the preview sees it change in place.

## `subsAfterRender`

The submenus the phone menu sets again after a render, as `[id, open]`: those open before open again, and where every submenu stood open from the start before the change and still does, one closed by hand stays closed.
A submenu that stands open for good is not among `ids`, nor is one this render does not hold.
