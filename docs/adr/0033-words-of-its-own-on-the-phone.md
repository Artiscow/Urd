# ADR-0033: Words of its own on the phone

Date: 13 November 2026
Status: Accepted. Extends the synced mobile model ([ADR-0019](0019-synced-mobile-model.md)), whose per-block override held the placement only, with the words a block says on the phone. Chosen in the design pass of BACKLOG 0.7.3.16 on 13 November 2026.

## Context

In the phone view no block's words could be written: the blocks turned their editable fields off there, since the phone view was for the layout, and the text block's typing writes the desktop frame from the height its words need ([ADR-0025](0025-the-sizing-model.md) decision 5). A short phone often wants fewer words than a wide screen (a headline that fits on one line, a paragraph that can go), and it was decided on 13 November 2026 that a text edited in the phone view is the phone's own.

What the field does: no builder in the comparison lets the words differ per device. The mobile overrides and breakpoints of SQ, FR, WH and WF override the layout and the style, and the content stays shared (comparison/ELEMENTS.md, the responsive delivery). A builder that draws each breakpoint's markup as a hidden copy leaves duplicated headings for readers and search engines (comparison/CODE.md, accessibility row 17). ADR-0019 rejected a separate mobile page for its double maintenance of the content.

A published page draws one DOM for the width it is opened at: it chooses the desktop or the phone by the site's breakpoint and draws the page again when the width crosses it.

## Decision

1. **A block's words can be the phone's own, per block, for the props that hold words.** They are kept in an additive field beside `props`, `phoneProps`, keyed as `props` are, holding only the words that differ from the desktop's. Which props hold words is a registry per block type (`PHONE_WORDS`): the text block's text first, then the single text fields of other blocks. A list of words (questions, events, rows) is not among them, since its items would have to be matched one by one and an item added on the desktop would not reach the phone's copy, the double maintenance ADR-0019 rejected; collection and product words are the collection's, shared by every page.
2. **Writing in the phone view writes the phone's words.** The typing says it is the phone's, and the editor keeps only the typed words that differ from the desktop's; words typed back to the desktop's are the desktop's again. The desktop's props and frame are never written from the phone view. A text's style is the design's and reaches both texts.
3. **The phone draws its words in the desktop's place, in the editor and on the published page alike.** The words are merged in where a block is drawn, in the phone's viewport only, so the page holds one copy of its words at any width ([ADR-0001](0001-hybrid-editor-model.md), the preview is production).
4. **The phone's words are marked and have their own way back.** A block with them carries a mark in the phone view, «Words on the phone» in its Placement says whether they are the desktop's or its own, and the Phone panel's row has a round mark; each way back gives the block the desktop's words in one undo step. The resets of the phone's placement keep them, since they are content the owner wrote, as hiding a block on phones is intent.
5. **A block with the phone's words counts as overridden for the mobile review** (ADR-0019 decision 5): an edit of its desktop words flags its section, so the owner sees that the phone's copy may need the same change.

## Alternatives rejected

- **Words per device as a second copy of the block**, one shown and one hidden by width: two blocks to keep in step, and the hidden copy stays in the page for readers and search engines.
- **Every block's words at once, lists included:** an item added, removed or moved on the desktop would leave the phone's list behind, with nothing to tell which of its items is which.
- **Writing in the phone view writes the shared words:** a typo fixed on the phone would be fixed everywhere, but the phone could never say less than the desktop, which is what the phone view is for.

## Consequences

- The data contract gains `phoneProps` on a block (docs/SCHEMA.md); older data lacks it and is drawn as before, so it needs no migration ([ADR-0005](0005-versioning-and-migration.md)). A block migration that reshapes a word prop reaches `phoneProps` in the same step.
- A page's words can differ by width, so a page opened at phone width says what the owner wrote for the phone; the desktop's words are what a reader without the page's script, or a page baked at the desktop width, reads.
- The text editor's tools (the text toolbar, links, the caret after an undo) work in the phone view, since the text is written in place there.
- The mobile review flags more sections than before: those whose blocks have the phone's words, as well as those with blocks placed by hand.
