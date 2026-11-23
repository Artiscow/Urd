# nav.js

The full text of the longer comments in the engine's `nav.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Builds the navigation from site.json - the page register (site.pages) and
the nav data (site.nav). Nothing is hardcoded: nav items with `page` look
up their path in the page register; items with `href` are external links.

Submenus follow the WAI-ARIA "disclosure navigation" pattern (not
menubar): real buttons with aria-expanded/aria-controls, natural Tab
order and no role="menu". An item with both its own target and a submenu
renders as a link plus its own arrow button, so the page stays reachable.
The submenus go three levels deep: a child's own submenu opens beside the panel,
or stands as a headed group under the child when the submenu is laid out
in columns or as the flyout. The mobile menu (the burger) is a non-modal
disclosure of the same list, styled by body.urd-mobile (the breakpoint is
set in urd.js from site.json), or with nav.style.mobileMenu 'sheet' a
full-screen native \<dialog> the list moves into while it is open
(ADR-0011: top layer, focus trap, Escape and the scroll lock come from the
browser). The menu stays off the pages listed in nav.hideOn: gone, or
tucked above the top edge and reached by the pointer at the edge, a faint
ghost there, or a pull tab (nav.hideMode).

## `let navController`

renderNav runs again for every site draft from the editor; the controller
detaches the previous render's listeners (including those on document) so
there is never more than one active set.

## `let readMenu`

The current render's phone menu as the next render finds it: the bar, its full-screen dialog, whether the menu is open, its open submenus and its scroll.
The next render reads it before it clears anything, so a menu open in the editor's preview stays open through a change of a setting.

## `holdNavForJump`

Holds a menu that hides on scroll in view while a jump to a spot on the page runs, so the spot lands under the bar rather than under the gap it leaves; the menu then hides again only after a scroll down from where the jump ended.

## `const narrowMq`

Side column on narrow windows: below 900px the menu renders as a REGULAR
top bar (effective variant bar) with horizontal items; the burger
appears as for the bar variant, at the mobile breakpoint or when the items do not fit the width (content folding). A separate
break edge independent of the mobile breakpoint AND of the editor's
viewport choice, so it also works in the preview's desktop mode.

## `stripElement`

The announcement strip as an element: its words or its link, its colours, and the cross that closes it for the visitor.
A strip closed, here or in a document kept from before (a prerender, the back-forward cache), leaves and calls onGone.

## `renderNav › const keep`

An open full-screen menu stays open through the render: its dialog and the bar holding it are kept and filled with this render's contents.
A dialog that stays open keeps the focus where it is, in the preview in the field the owner is typing in.
It is kept while this render also wants the full-screen menu and the phone state holds: the breakpoint, the preview's phone view, or a bar folded to the burger.

## `renderNav › const tucked`

A page the menu stays off (nav.hideOn): with hideMode hidden the host is hidden with its classes and clearances cleared, so the page starts at the top with nothing parked above it.
The other modes tuck the menu above the top edge as a fixed bar (tuckNav below), where the page starts at the top the same way.

## `renderNav › const isTucked`

Narrow windows: the side variant renders as a regular top bar
(effective variant bar); the breakpoint listener above re-renders on
crossing. At the mobile breakpoint the overrides in nav.style.mobile
replace the desktop values they name (effectiveNav, and navSizeVars for the sizes), so the appearance
is computed from one resolved nav.
A tucked menu is always a plain top bar, out of the flow and without the scroll behaviours and the clear top: the modes below the bar's variant have no meaning above the edge.

## `renderNav › const announce`

The announcement bar (nav.announcement, additive since v0.7): a strip
above the menu inside the host. It follows the menu by default; with
sticky false the host's sticky top is raised by the strip's height
(--urd-announce-h, measured below), so the strip scrolls away and the
menu sticks alone. Hosts out of the flow (floating, overlay) are fixed
and keep the strip with the menu regardless.
A dismissed strip stays away as long as the message is the same
(localStorage keyed by the text). The preview reads and writes the same
key as the published page, so the editor shows what the visitor gets;
the Announcement panel has a control that clears it again.

## `renderNav › const place`

The side column honours the chosen place: the strip in the column
(its top), fixed across the whole page above column and content, or
in the flow above the content beside the column. The other variants,
a menu waiting above the edge among them, carry it inside the host.

## `renderNav › const announceScrolls`

Whether the strip actually scrolls away: the host must be in the flow
and sticky (a fixed host, floating, overlaid or the side column, keeps
the strip; a host that is not sticky scrolls away as a whole).

## `renderNav › mobileMq.addEventListener('change')`

The burger follows the ACTUAL width via its own class on the nav: in
preview the editor's viewport choice owns body.urd-mobile (and with it
the structure tools), but the menu alone must still go mobile when the
window is narrower than the mobile breakpoint. For visitors,
body.urd-mobile is set at the same threshold; the double coverage in
the CSS is harmless.

## `renderNav › host.classList.toggle('urd-nav-sticky')`

Sticky menu (the default): sticky must sit on the HOST (the header
element), not on the nav - a sticky element can never leave its parent,
and the parent here is exactly as tall as the nav.

## `renderNav › const hc`

The variant drives the host and body: floating takes the host out of
the flow (the hero starts behind the pill), the side variant turns the
host into a fixed column and gives body content padding. All classes
are toggled on every render, so a variant switch in the editor never
leaves leftovers.

## `renderNav › let contentFolded`

Whether the bar is folded to the burger by its content, not by the breakpoint (evalFold below). A bar the previous render had folded stays folded until the fold is measured again, so a menu open in it is still the phone's.

## `renderNav › const scrollMode`

Scroll behavior (nav.scroll, additive since v0.6): 'shrink' shrinks the
menu after some scrolling, 'hide' hides it on scroll down and shows it
on scroll up. The state is computed by pure navScrollState; only
meaningful for a sticky top bar (not the side variant, not sticky off).
The behavior runs in every view, the editor's preview included, so the
owner sees what the visitor gets; it is off only while the mobile panel
is open. The editing chrome parks against --urd-nav-h-base rather than
the shrinking height (setNavH below). The listener is rAF-throttled,
passive and aborted with the rest of the render's listeners.

## `renderNav › host.classList.toggle('urd-nav-announce-`

A strip that does not follow the menu out (announcement.followNav false,
the default): the slide moves from the host to the menu, so the strip
keeps its place while the bar passes behind it.

## `renderNav › const clearTop`

Transparent at the top (nav.style.atTop 'clear', additive since v0.7):
the host class comes from hostClasses, the surface appears once the
page has left the top zone (urd-nav-scrolled). Independent of sticky:
a menu that scrolls away is only ever seen in the top zone.

## `renderNav › const surface`

Appearance (nav.style, additive since v0.5): background color with
opacity, blur behind, and its own text color. The background is set as
a CSS var on the nav, while submenus and the mobile panel draw their own surface (subBg below);
without style the CSS default applies.

## `renderNav › const navBg`

Full layer-based background (additive since v0.6, shared with sections
and the footer): a backdrop behind the nav content with the same layer
stack as sections. When present it takes over the surface, and the
plain veil/image path is skipped.

## `renderNav › if (surface.blur === false`

Blur is driven via a custom property (inherits to submenus and the mobile
panel; backdrop-filter itself does not inherit, so inherit in the CSS
would stop at the li).

## `renderNav › const subBg`

The submenu and mobile panel get their own surface: by default only the
color veil, never the background image (subImage turns the image on).
With a layer background, submenu/mobile take the stack's color layers as one veil
(navLayerVeil), or the CSS default without any (the layer
stack applies to the main bar).

## `renderNav › const size`

Size (additive since v0.7, ADR-0023): thickness, side padding, item
gap, text size, pill width and the shrink factor and its duration as
inline custom properties the CSS reads with today's look as the
fallback. The mobile overrides are chosen from the breakpoint here
(pure navSizeVars), and the breakpoint listener above re-renders on
crossing.

## `renderNav › logoImg › img.style.setProperty('--urd-logo-base')`

The height is set via a base variable, not inline height: the CSS
derives the drawn size from it (the scroll shrink can scale it) and
its calibration (a negative block margin scaling with the size) keeps
the bar height constant regardless of image height - the image fills
out, the bar never grows. The mobile size is chosen by navSizeVars.

## `renderNav › const showLogo`

The logo stands in the bar unless the owner takes it out (nav.logo.show false); the bar's other parts keep their places without it.
It goes in before a kept full-screen menu, where a new one would follow it; without one this appends.

## `renderNav › const tools`

The tool cluster at the far right, or at the start with nav.style.tools.side 'start': the launcher, the cart, the
light/dark toggle and the site's links in the owner's own order (nav.style.tools.order), then
the burger, which is the mobile menu's opener and ends the row, or begins it with the cluster at the start outside the side column.
A cluster with nothing but the burger takes no room on desktop (urd-nav-tools-none in base.css).

## `renderNav › const launcher`

The link launcher (nav.launcher): the shortcuts behind a launcher button.
The button is the desktop opener; on mobile the same shortcuts are a
section at the foot of the menu list, which travels into the full-screen
sheet with the list.

## `renderNav › let drawer`

The basket's drawer is the cart block's, loaded with its sheet (cart.css, `loadBlockSheet` in core-types.js) as a nav with a basket is drawn, so a site without one never fetches either; a press before it is in opens it as it comes.

## `renderNav › const burgerLook`

The burger (only visible in mobile view via CSS). With the dropdown it
is a non-modal disclosure of the menu list - no focus trap or scroll
lock, the panel scrolls itself. With the sheet it opens a modal dialog
that the list moves into (and back out of on close), so the same list
with its submenu accordions serves both. The drawing and the word
beside it are the owner's choice (nav.style.burger); a visible word is
the button's name.

## `renderNav › const phoneMenu`

The phone menu's own look: where its text stands, the submenu arrow, and whether the bar keeps its tools beside the full-screen menu (the classes from navClasses carry all three to the CSS).

## `renderNav › if (sheet`

The announcement comes back to the host on close, so the clearance the
guard in setNavH held is measured again. Registered after buildSheet's
own close listener, which is what puts the strip back.

## `renderNav › const isFixed`

Whether an opener stands open with nothing to close it: the column with every submenu open and no arrow, or a headed group; in the phone menu, every submenu open from the start with no arrow (nav.style.mobileSubArrow).

## `renderNav › const markLink`

On a phone with submenus that start closed, a split item's own link opens its submenu, so it carries the opener's state too; elsewhere the link only leads to its page.

## `renderNav › const applyFixed`

A fixed opener leaves the tab order and reads as a heading, not as an expanded button that cannot collapse; the state follows the mobile fold, so it is applied again when the bar folds or unfolds.

## `renderNav › const isColumn`

Hover only opens on devices with a real pointer - touch must never get
hover states that take an extra tap to dismiss. nav.style.subOpen
decides whether hover opens at all and whether leaving closes
(subOpenMode); click always works.
In the side column the submenus are accordions in the flow: there,
hover opens but never closes per item - closing would move the
items under the pointer and cause misclicks. The accordions close
together when the pointer leaves the whole menu, where leaving closes (subOpenMode).

## `renderNav › buildItem › if (subMode === 'collapsed'`

Collapsed submenus on mobile: the whole item opens the submenu
instead of navigating (the menu is for touch, and a tap that
navigates never shows the submenu); the item's own page is the
first submenu entry instead. Expanded submenus are already visible,
so there the item stays a plain link.

## `renderNav › buildItem › let closeTimer`

Real mouse only: on hybrid devices (laptop with touchscreen) a tap
fires both pointerenter and click, and without the guard the
submenu would open on enter and close again on click. The mobile
menu is built for touch: hover never opens or closes there.

## `renderNav › if (launcher`

The launcher's shortcuts inside the mobile menu: a section at the foot
of the list (hidden on desktop, where the button carries them), so it
travels into the full-screen sheet with the list. The menu must not grow
without end, so only the first mobileMax stand there; the rest sit in a
native \<details> that opens in place (ADR-0011).

## `renderNav › list.addEventListener('click')`

A link in the dropdown panel or an open submenu closes them, so a link to a spot on this page, which never leaves the page, shows the spot rather than the menu.
A link whose own handler cancelled it (the item that opens its submenu on a phone) leaves them open.
The sheet closes on its own.

## `renderNav › if (was?.open && isMobileState()`

The phone menu comes back as the previous render left it, where the phone state still holds: open, with the same submenus open and the same scroll.
A kept full-screen menu was never closed and takes this render's contents; where the phone state no longer holds, it closes.

## `renderNav › const idOf`

The submenus that were open open again; where every submenu stood open from the start before the change and still does, one closed by hand stays closed (subsAfterRender). A fixed one stays open.

## `renderNav › setNavH (2)`

The measured menu height as a CSS var on the root element: the nav
clearance in base.css (menu out of the flow) and the chrome parking in
preview read it. The distance is measured from the host's top to the
nav's bottom edge (offsetTop includes the pill's top gap and a sticky
announcement); an announcement that scrolls away is left out, since the
menu alone is what stays. The column variant takes no top height but a strip fixed across the whole page (pageH below).
--urd-nav-h-base holds the unshrunk height: the editing chrome parks
against that one, so the section handles stand still while the scroll
shrink runs under them.

## `renderNav › setNavH › if (sheet?.dialog.open`

While the full-screen menu is open the strip has moved into it and the
host is short; the page behind keeps the clearance it had before the
menu opened, and the close puts it back.

## `renderNav › setNavH › const pageH`

A strip fixed across the whole page: the column starts and the body
is padded below it (base.css reads the variable on the root), and it
is the column's only top clearance.

## `renderNav › setNavH › document.documentElement.style.setProper`

The two heights on the root as well, for a background that keeps its
pictures out from under the strip or the menu: the strip's own, and
the menu's own below it. A strip inside the column or beside the
content stands over no section, so the root reads it as nothing.

## `renderNav › setScrollClear`

The room a jump to a spot leaves above it, which base.css gives the page as scroll-padding-top.
Unlike --urd-nav-h-base it follows the scroll shrink, so a spot reached mid-page lands right under the compact menu.

## `renderNav › let foldNeeds`

Content-aware folding: menu items never wrap (nowrap in base.css), so
when the items no longer fit in the width, the whole list folds to the
burger via the same class as the mobile breakpoint. The unfolded full
width is remembered (foldNeeds), because after folding the list is
hidden and cannot be measured: unfolding happens only once the bar is
wider than the need, and then measures again in case the need has grown.

## `renderNav › const navRo`

A ResizeObserver on the nav (not the host: a host out of the flow has
no height of its own to observe) catches window width, font loading and
scroll shrink; it always delivers a first measurement on observe.

## `renderNav › if (isSide &&`

The side column's width is adjusted by dragging its inner edge (preview
only, like section heights). Live update via the CSS var; on release
the width is reported to the editor, which owns the draft (urd-nav-width).

## `renderNav › const tuck`

A tucked menu (nav.hideMode on a page in nav.hideOn) stands above the
top edge and comes in by the pointer at the edge, a ghost there, or the
pull tab; keyboard focus inside brings it in whatever the mode.

## `renderNav › nav.addEventListener('keydown')`

Escape closes the nearest open layer and returns focus to the button
that opened it, so keyboard users land where they were. An open
accordion inside the sheet closes alone: the cancelled keydown keeps
the dialog's own Escape handling from closing the sheet as well.

## `tuckNav`

The menu above the top edge of a page it is kept off (nav.hideMode): the
host is fixed and translated out of view (base.css), and the mode decides
what brings it in. `hover`: the pointer within TUCK\_EDGE of the top, and
it leaves TUCK\_LEAVE after the pointer has left the bar. `ghost`: the
pointer at the edge shows the bar faint (urd-nav-peek), and it turns
solid once the pointer has rested on it for GHOST\_SETTLE or clicked it.
`tab`: a pull tab hangs below the edge at all times and toggles the bar;
the pointer entering the tab brings it in too. Touch has no hover, so
the tab is drawn for every mode there (ADR-0011: the menu stays
reachable). Focus inside the bar brings it in in every mode, and focus
leaving it lets it go.

## `tuckNav › let tab`

The pull tab: the owner's own mark, word and colours, or the burger
lines on the submenus' default surface. Drawn for the tab mode, and on a device
without hover for the other modes as well.

## `tuckNav › host.addEventListener('keydown')`

Keyboard: focus inside brings the bar in, focus leaving lets it go, and
Escape puts it away from the tab as well as from the bar (the bar's own
Escape handling, which closes an open submenu first, has cancelled the key then).

## `buildSheet`

The full-screen mobile menu: a native \<dialog> inside the nav with a close
button, that the menu list moves into on open and back to its place before
the tool cluster on close (the list keeps its id, so the burger's
aria-controls stays valid). With `logo` the logo moves along into the
head, with `withTheme` and `withCart` the theme button and the cart move
into a foot, and with `barTools` false the theme button, the cart and the
site's links all do, since the bar shows none of them on the phone; all
return to the bar on close, in their original order. A link click and a
backdrop click close it; Escape, the focus trap, the focus return to the
burger and the scroll lock (body:has(dialog:modal) in base.css) are
native. `motion` is the allowlisted entrance from sheetMotion, drawn by
base.css. `surface` is the sheet's own surface (nav.style.sheet through
navSurface); without choices the sheet follows the bar's veil and blur.
`labels` shows the tool buttons' text beside the icons in the foot.
`kept` is the previous render's dialog, still open: it is emptied and
built again in place and never leaves the page, so it stays open and the
focus stays where it is; `fill()` then moves this render's parts into it
where `show()` would also open it.

## `buildSheet › dialog.addEventListener('click')`

Light dismiss: a click on the ::backdrop hits the dialog element itself.
A link click closes too, unless the link's own handler cancelled it (an
item with a submenu opens it instead of navigating).

## `buildSheet › let touchLock`

Touch scrolling stays inside the sheet: the page behind ignores the
overflow lock on some touch browsers, so a touch move outside the
sheet's own scroll area is cancelled while the sheet is open. The
listener lives only while the sheet is open (it must be non-passive,
which costs every scroll it is attached for), and a dialog opened on
top of the sheet, the cart drawer, scrolls on its own.

## `buildSheet › let announceHome`

Where the announcement came from, so it goes back there on close. The
strip is read through a getter: the cross inside the sheet removes it,
and a removed strip must not be put back.

## `buildSheet › addEventListener('close') › const lost`

A dialog kept through a render was opened by a burger that render replaced, so the browser had nowhere to return the focus, which is left in the closed dialog or on the page: this burger takes it, while the page has the focus.

## `launcherTiles`

The launcher's shortcuts as one list of tiles. The markup is the same for
all three designs (`view`: grid, list or cover) - the class on the list
decides the shape, so the desktop panel and the mobile section can carry
different designs from the same builder. A tile's mark is the uploaded
image when there is one, otherwise the drawn icon, and a tile with
neither stands with its label alone.
A name too long for its tile is cut with an ellipsis, the whole name then in the tile's tooltip, or folded onto more lines (`longNames`).

## `buildLauncher`

The link launcher's opener (nav.launcher): a button in the tool
cluster (the owner's mark, a chosen icon or the drawn grid) with the link grid under it. With the Popover API and anchor
positioning the grid opens in the top layer, placed by CSS under the
button with the browser flipping it away from the viewport edge;
otherwise it is the submenu's disclosure pattern, a box positioned
against the wrapper inside the nav (ADR-0011). The gate is the stricter
feature, the same one the editor's floating menus use (anchored.js): a
popover's containing block is the viewport, so without anchoring there is
nothing to place the grid against, and anchoring without fallbacks would
let it run off a narrow screen. That module belongs to the editor layer
and stays out of the visitor's import closure, so the check stands here.

## `buildLauncher › let pressing`

Tabbing out of the grid closes it - focus must never leave an open
layer behind. A press on the grid's own padding or heading moves focus
to the body without leaving the grid, so a press inside is let through.
