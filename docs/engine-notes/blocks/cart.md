# blocks/cart.js

The full text of the longer comments in the engine's `blocks/cart.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: basket (the shop). A button with a count badge that opens a
drawer built on the native `<dialog>`/showModal (ADR-0011: top layer,
::backdrop, focus trap and Escape for free). The basket lives in
localStorage (shop.js); the drawer shows the lines with quantity controls,
the total and an optional link to the checkout page. Badge and drawer both
follow the urd-cart-change event.


## `emptyRow`

«Empty the basket» under the lines. It asks once in its own place, since the visitor cannot take it back:
«Empty it» empties the whole basket (the drawer then shows its empty state, and the focus goes to the
drawer's close button), and «Keep it» puts the button back with the focus on it.

## `cartCheckoutHref`

The checkout page a basket block's drawer links to: the block's own page or path, or else the menu basket's, so a basket dropped on a page leads to the same checkout without a setting of its own.

## `createCartDrawer`

The basket drawer as a reusable factory: the block AND the nav basket
(nav.js) build the same drawer. The caller attaches the dialog to the DOM
and calls open()/refresh().

## `cartBlock › render › let openArmed`

While editing, the drawer opens only when the block was already selected
AT the press (selection happens on pointerdown, before click): the
two-step pattern from the text blocks. The first click selects the
block, the second opens the drawer. In the Clean view, where no press
selects a block, it opens at once, as on the published page.
