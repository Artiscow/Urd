# shop.js

The full text of the longer comments in the engine's `shop.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The shop (the ADR-0007 pattern applied to commerce): pure basket logic and
localStorage persistence. The basket is a flat list of lines {key, id,
title, price, qty, variant?, image?, min?, max?}; key identifies product plus variant
choice, so the same product in two sizes is two lines, and min and max are the
product's quantity limits, held per line. The pure helpers
never mutate their input and are tested in tests/shop.test.mjs; the
blocks (blocks/product.js, blocks/cart.js and blocks/checkout.js) and the menu's cart button do the rendering.

The core is gateway free: the basket lives with the visitor (localStorage),
and the checkout sends the order as JSON to the block's endpoint or as a mail draft (the optional payment layer, ADR-0028, adds the providers). No network calls here.

## `quantityLimits`

A product's quantity limits where the buyer types the quantity (its `quantity`): the least and the most, each from 1 to 99 and either left open,
the most never under the least; null for a product whose card adds one at a time.

## `cartRelimit`

The basket with the limits the checkout's function answered with (`orderQuantity`): each line of a product and variant named there takes those limits, its quantity held within them.

## `cartDrop`

The basket without the lines the checkout answered with (`orderChoice`): a line whose size or colour no longer fits its product goes, so the buyer adds it again with a choice.

## `cartReprice`

The basket with the prices the checkout answered with (`orderPrices`): each line the answer names takes the catalogue's price now, so the total the buyer sees is the one that will be charged.

## `formatPrice`

Price display: whole numbers without decimals, otherwise two decimals with
a comma, plus the currency word ("350 kr", "49,50 kr"). Deliberately
without Intl: the format is deterministic in the node tests and identical
for every visitor.

## `paymentsOf`

The checkout block's payment settings in their full shape (block version 2, ADR-0028), with every field present and every unknown value folded to its default; an instruction row without a label and a text is kept, since the editor shows it while it is typed.

## `orderRecord`

The record of an order the buyer placed, the data the printable
confirmation is drawn from (angrerettloven § 18: a confirmation on a
durable medium): the lines with their prices, the total, the currency, the
buyer's contact details, how it is paid, the provider's reference, and
when. Every field is plain data, so the record can be kept and read back.

## `buildOrderBody`

The email body for an order: the order lines, the total line and the
contact fields. fields is {label: value} with the labels in the visitor's
language (i18n at the caller); empty fields are left out.

## `buildOrderPayload`

Payload for an optional endpoint: the contact fields plus the order lines
as data, their total, and the way to pay the buyer chose among the block's instructions
(`payment`, additive from 0.7.28.4) when there is one.

## `onCartChange`

Basket listener for the blocks and the menu's cart button: calls handler on urd-cart-change and on
a storage change from another tab that touches the basket (its key, or the whole storage cleared). A re-render gives a new block element, and
the listeners of detached elements are swept at the next registration, so
listeners never stack up per draft message (the same lesson as renderNav).
