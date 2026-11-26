# blocks/text.js

The full text of the longer comments in the engine's `blocks/text.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: text. Rich text (HTML written by the site owner through the editor)
with alignment. The content is the owner's own and is treated as trusted; it is
the same trust model as the owner being able to edit the files in the repo
directly.

## `textBlock › render`

`design` (additive from 0.7.24.2.4): the design the text is drawn in; a text block is plain text, and the terms block (below) a document design (doc-look.js) with its look beside it.

## `textBlock › render › const content`

The text lives in its own inner element: the editing handles that
preview-edit puts on the block must NEVER end up inside the editable
content (or in the stored props.html).

## `textBlock › render › content.className`

The text box variant: the same block, but the content sits in a card
(the theme's surface color, border, radius). Optional field; older data
lacks it and renders without the card.

## `textBlock › render › if (design === 'plain' && (ctx.viewport`

«Force readable text» on the desktop (ADR-0034): the lines of a plain text wrap at a measure, each paragraph by the text's alignment or its own (base.css); the document designs keep their own layout.
A section showing its phone layout on a desktop page (render.js ctx.handoff) keeps it, its row as wide as the desktop's canvas.

## `textBlock › render › if (props.lineHeight`

Optional line and letter spacing per field (additive; empty = inherited).
The line height is unitless (it scales with the font size); the letter
spacing is px and can be negative (tighter than normal).

## `textBlock › render › setRichHtml`

The words, rebuilt from the rich-text allowlist (sanitize.js), the same for every block that draws rich text: nothing executable reaches the page, and the editing handles and buttons an older Urd could leave in a text are left out (stored clean on the next edit).

## `textBlock › render › const prefix`

A document design (doc-look.js) draws the text in a root of its own, with the contents beside it where the design has them; plain text stands alone as it always has.

## `textBlock › render › const phoneView`

Click-and-type: in preview mode (inside the editor's iframe) the text is directly editable, and every change is posted to the editor, which owns the draft.
The block id sits on the block element (set by render.js).
In the phone view the words written are the phone's own (ADR-0033): the edit says so, and the desktop frame is left as it is.
A block whose words the phone cannot keep (PHONE\_WORDS, the terms of sale among them) is not written in the phone view.

## `textBlock › render › addEventListener('input') › const block`

Grow with the content and give the room back: the frame takes the height the words need, never less than it had before the typing began, and the blocks below move by the push rules from where they stood then (ADR-0024 decision 4), posted in the typing's undo step.
The start holds while the section's frames are ones the typing wrote, the last few included, so a redraw a keystroke behind keeps it; any other change starts afresh.
The words are measured with the box at its own height, since the text fills a box taller than them, and converted from the content's zoom (a text set to shrink) to the block's.

## `textBlock › render › addEventListener('input') › if (!phoneView && block?.frames?.desktop`

A text drawn as questions follows its rows as drawn (push-model.js foldsIntoQuestions): the editor fits its frame after the typing, so the typing grows nothing here.
On the phone the words grow the row they stand in, and the desktop frame is not theirs to write.

## `textBlock › render › addEventListener('input') › post`

The section is left alone: a section with a height of its own
lets the text hang past its edge (sections never clip, and the
height is the user's); one without follows its blocks' frames
(writePush in render.js).

## `textBlock › render › (end)`

The height a text needs is measured by the push pass on the desktop (render.js applyPush, which every desktop section has) and by the phone's flow on the phone, so a text whose wrapping changed with the width, the font or the language grows its box there.

## `const termsBlock`

Core block: the terms of sale (0.7.24.8). The owner's own text, written on the page as a text block's is, always drawn in one of the document designs (doc-look.js TERMS\_DESIGNS) with its look; the renderer is the text block's.
