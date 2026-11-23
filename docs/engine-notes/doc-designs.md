# doc-designs.js

The full text of the longer comments in the engine's `doc-designs.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The designs a document is drawn in (the privacy page, the terms of sale, a text) and the design a stored value reads as. They stand apart from doc-look.js, which draws the documents, since the boot reads them on every page (render.js asks whether a text is drawn plain, migrate.js lifts the terms of sale into the text block's designs) while only a page that holds a document draws one.

## `const TEXT_DESIGNS`

The designs a text is drawn in: plain text, the way every text block is drawn, and the document designs the terms of sale take. A text block from before page v8 that stood in a document design is a terms block (migrate.js liftTermsBlocks).
