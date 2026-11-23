# nav-launcher.js

The full text of the longer comments in the engine's `nav-launcher.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The menu's link launcher (nav.launcher), loaded with its sheet (`nav-launcher.css`) only where the site shows it (features.js): a site with the launcher switched off loads none of its code or rules, and nav.js draws the menu without it.

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

## `launcherRow`

The launcher's shortcuts inside the mobile menu: a section at the foot
of the list (hidden on desktop, where the button carries them), so it
travels into the full-screen sheet with the list. The menu must not grow
without end, so only the first mobileMax stand there; the rest sit in a
native \<details> that opens in place (ADR-0011).
