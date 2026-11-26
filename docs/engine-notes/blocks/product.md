# blocks/product.js

The full text of the longer comments in the engine's `blocks/product.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: product cards (the shop, the data-block pattern in ADR-0007).
Renders the entries of a product collection (kind "products") as cards with
image, badge, price (and an optional member price), size and color choices,
the quantity the buyer types where the product has one, and an add-to-cart button. A color choice with its own image swaps the card
image. The catalog is git-owned data; the cart lives with the visitor (shop.js).

For visitors, clicking the image or title opens a quick view: the product
details in a native \<dialog> (ADR-0011) with an image gallery, full text,
variant choices and a buy button - the product page without a page change.
In the editor clicks belong to editing: a
"+ Product" card at the end of the grid adds a new product to the collection
(urd-collection-add), a click on a card of the selected block opens its
product in the Collections panel (urd-open-entry), and a block with no
catalogue offers «Choose the catalogue» (urd-block-menu at its Catalogue
group).

The content is structured DATA: title and text are rich text through the same
sanitizing as the collection block, everything else renders with textContent.

## `choiceRow`

A row of choice chips (the sizes, the colours). A chip is its own choice by its place in the row, so two choices
that read the same stay two: the picture, the pressed chip and the preview follow the chip, never its words.

## `choiceRow › forEach › if (onPreview`

A mouse resting on a choice previews it (a colour's picture), and leaving gives the chosen one back.
The pointerType guard keeps a tap on a touch screen from previewing and choosing in one press.

## `holdBuy`

The buy button of a product that greys it out until its choices are made (its disableUntilChosen): unavailable
with the missing choice in its tooltip, and available again once none is open. aria-disabled rather than
disabled, so the keyboard and a screen reader still reach the button and hear why it waits.

## `choicesMade`

Whether every choice the product asks for is made (its own requireSize and requireColor, for the
options it has). An open one is asked for under its row, and the first takes the focus.

## `quantityRow`

The quantity the buyer types, for a product that has limits (its `quantity`, shop.js quantityLimits): «Quantity» with minus and plus around a number
field held between the least and the most, the limits told beside it, and the line's sum under it once more than one is chosen.
The steps use the basket's own buttons (blocks/cart.js), so the two read alike.

## `buyButton`

The buy button, with an «added» receipt on the press. getChoice gives the chosen size's words and the chosen colour ({name, image}) or null;
ready says whether the choices the product asks for are made, and asks for the open ones when not.
A product with quantity limits puts the quantity typed (getQty) in the basket, with the limits on its line; any other puts one.
A button held by holdBuy does nothing.

## `openQuickView`

Quick view (visitors only): the product details in a native \<dialog> with a
gallery (main image plus color images), rich text and its own variant choices.
Built on first open and reused.

## `renderCard › if (!preview`

Quick view for visitors: the image and the title open the detail view.
In the editor clicks belong to editing (click-and-type), so nothing is wired
there - nor in the mobile view (the preview flag, never editable).

## `wireEntryOpening`

The editor's way from a card to its entry: once the block is selected alone, a click on a card part that is not written on the card itself (the price, the badge, the choices, the picture, the card around them) opens the product's entry in the Collections panel (urd-open-entry), with the price, the badge or the sizes focused, and else the title.
The title and the text keep click-and-type, the buy button keeps filling the basket, and a Shift-click, a selected set and the Clean view open nothing.

## `productBlock › render › host.setAttribute('aria-busy')`

Busy while the entries are fetched: the block holds its frame's height
on the desktop and the height measured for the phone there (base.css),
and the editor's fit waits for it.
