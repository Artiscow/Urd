# phone-order.js

The full text of the longer comments in the engine's `phone-order.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The order of a section's blocks on the phone, in the row grid (ADR-0019): pure, node-tested (tests/phone-order.test.mjs).
The section's rule (`phoneOrder`) reads its blocks top first, by their top on the desktop (or the key `mobileOrder` a preset gives them), or column by column where blocks stand beside each other on the desktop, the left or the right column first.
A block's exception (`phonePlace`) puts it directly before or after another block, wherever the rule puts that one.
A stack (`phoneStacks`) holds blocks that read as one, standing where the first of them in the rule's order stands, its first block's exception moving it whole; a custom order (`phoneList`) holds the order as listed, over the exceptions, a block missing from it joining after the block before it in the order the rule and the exceptions give.
A block the owner took out of the rule's columns (`phoneLoose`) reads where the rule puts it, on its own: the column it stands in on the desktop no longer holds it.
The editor's moves (the list, the arrows) are reckoned in phone-moves.js.

## `byColumns`

The blocks read column by column: a band holds the blocks whose heights overlap on the desktop, one after another; a column inside a band the blocks whose widths overlap there.
Bands close below each other (PHONE\_JOIN\_GAP) with columns that line up, one to one, stand as one grid, so a card of an icon over a text is one column even where the two do not overlap in height, while two rows of cards, or a zig-zag of text and picture, stay rows.

## `withExceptions`

The rule's order with each exception moved before or after its block.
Blocks placed against the same block keep the rule's order among themselves; a block placed against one that is placed itself follows it there; a ring of exceptions keeps the rule's places.

## `ruleOrder`

The blocks the phone shows in the rule's order, before the exceptions, and the rule's columns.
A block shown on phones only stands nowhere on the desktop, so it shapes no column: it joins the columns' order before the first block whose key is its own or greater.

## `phoneParts`

The phone order and what it is made of: the rule's order, the stacks as units, the exceptions, and the custom order.
Blocks placed by hand (frames.mobile with a row) are included, in the same order: auto-placement skips them, but the DOM order carries the read-aloud order.

## `stackOrder`

The reading order in the row grid: the blocks the phone shows (not hidden there), by the section's rule, its stacks, each block's exception and its custom order.
