# blocks/quote.js

The full text of the longer comments in the engine's `blocks/quote.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: quote/testimonial. Semantic \<figure>/\<blockquote> with the
attribution in \<figcaption>, which the quote preset (two text boxes)
cannot give. Two variants: "large" (a centered spread with a quotation
glyph, bare or set in a card with `card`) and "short" (a testimonial card
with an optional portrait). The quotation glyph is drawn in CSS (::before),
never as content.

In the editor the quote, the name and the role are directly editable
(click and type); the portrait is chosen in the properties panel.
Auto-grow adjusts the display only; the push pass moves the blocks below (ADR-0024).

## `quoteBlock › render › const fields`

Click and type: all three fields are plain text; in the phone view what is written is the phone's own (PHONE\_WORDS, ADR-0033).
Each change hands back the three fields as they stand on the page, so one typed earlier is never handed back as it was drawn.
