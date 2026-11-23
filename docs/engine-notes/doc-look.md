# doc-look.js

The full text of the longer comments in the engine's `doc-look.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Documents: the designs a long text is drawn in (the privacy page, blocks/privacy.js, and the terms of sale, the terms block in blocks/text.js) and the look the owner sets on them.
A design is the layout (a long read, contents at the side, the main points at a glance, questions that fold out, the privacy page's ledger as a table or as cards, numbered clauses); the look is the accent, the headings' colour, the cards' colour, the corners and the fonts, written as CSS custom properties base.css draws with, and the lines between the parts, which a data attribute takes away (applyDocLook).
The stored text is never restructured: a design's parts, contents and numbers are drawn from the text's own headings, so a text keeps its words whatever design it is shown in.
Pure helpers beside the DOM ones; tests/doc-look.test.mjs holds the pure ones.

## `const TEXT_DESIGNS`

The designs a text is drawn in: plain text, the way every text block is drawn, and the document designs the terms of sale take. A text block from before page v8 that stood in a document design is a terms block (migrate.js liftTermsBlocks).

## `docLookSettings`

Which look settings a design draws, so the menu shows only those (the rest would change nothing).
Every document design has an accent, a heading colour and a heading font; the privacy page has its text font too, and its choices card in every design.
The lines are the accent rule over each part (the long read, the contents, the main points, the ledger) or the line between the questions; numbered clauses have none.
Cards are the main points, the phone's contents row, the ledger's rows on a phone and the privacy page's choices; a text's withdrawal form (`data-urd-form`) is a card in every document design.
The side the contents stand on belongs to the contents design alone; the placement in the block to the privacy page in every design, and to a text with contents.

## `applyDocLook`

Writes a document's design and look onto its root: the design as `data-design`, the lines taken away as `data-rules="off"`, the contents on the right as `data-side="right"`, the document centred in its block as `data-align="center"`, which it is unless set to the left, and which base.css draws for the privacy page and for a document with contents (with the contents, the text centred in the block and the contents in a column beside it, in a block wide enough), the look as custom properties.

## `buildContents`

The contents of a document, from its headings: a list beside the text, and the same list folded into one row for a narrow block (base.css shows one or the other by the document's own width).
Each heading gets an id the list links to, so a link is a plain jump the page's own scrolling shapes; the part the reader is in is marked as they scroll.

## `watchCurrent`

Marks the part the reader is in: the last heading that has reached the upper third of the window, the first while none has.
An IntersectionObserver for the logic (ADR-0011); without one the list stands without a mark.

## `foldParts`

The parts of a text drawn as questions that fold out, for a visitor: each `h2` and what follows it, up to the next `h2`, in a \<details> that opens one at a time, the first open.
Only on the published page: in the editor the text is typed into, so every part stands open there and the stored text keeps its own shape.

## `addFormPrint`

A print button under each withdrawal form in a text (`data-urd-form`), which prints the form alone (base.css, html.urd-print-form).
Only on the published page, so the stored text never holds a button.
