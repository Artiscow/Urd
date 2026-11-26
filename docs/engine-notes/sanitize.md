# sanitize.js

The full text of the longer comments in the engine's `sanitize.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## `const RICH_TEXT`

The HTML a rich text may hold (SCHEMA.md «Rich text»): the one allowlist the drawing of a text and a paste into one share.
`elements` names each element kept and the attributes it may carry beside the `shared` ones; `styles` the properties a `style` attribute keeps, and `pasted` those a paste keeps with a value of its own, the others only as one of the theme's (`var(--urd-…)`), so pasted words follow the site's fonts, sizes and colours; `dropped` the elements left out with everything in them.
Any other element gives way to its content, so its words stay.

## `richStyle`

A `style` attribute kept to the properties of RICH\_TEXT.styles with plain values; empty when none is left.
From a paste only RICH\_TEXT.pasted keep a value of their own, and the others one of the theme's.

## `buildRich`

A rich text rebuilt from the allowlist (RICH\_TEXT): the children of `source`, a parsed tree that is never drawn, become new elements made with `doc`, each with only its allowed attributes and only after their values pass their checks.
An element of another namespace (an SVG's or MathML's) is left out with its content, and so is one in `dropClasses`, the editing handles older texts can hold.
With the page register a link to a page or a spot on it (data-urd-page, data-urd-target, written by the link editor) gets the address the page has now, so a change of the page's address never breaks it; a link that opens a new tab never reaches back to the page (noopener).

## `richFragment`

A rich text as the page draws it (text blocks, FAQ answers, collection and product titles and text, the calendar's own words): parsed in an inert document, where nothing in it loads or runs, and rebuilt from the allowlist (buildRich).

## `pasteCommand`

What a paste or a drop into an editable text inserts, or null to leave it to the browser: a field that is not rich (`plaintext-only`) and a paste with no HTML are left alone, a plain paste (Ctrl+Shift+V) inserts the words, and HTML goes in cleaned (cleanRichHtml), or as its words where nothing of it is left.

## `safeHtmlFragment`

HTML from a source nobody on the site wrote (a calendar feed), as a fragment built from an allowlist: paragraphs, line breaks, lists, bold, italic, underline, quotes and links to http, https and mailto addresses, with no attribute carried over.
A heading becomes a bold paragraph, any other wrapper gives way to its content, and scripts, styles, forms, pictures and embedded content are left out with everything in them.
The markup is parsed in an inert document, so nothing in it loads or runs.

## `plainText`

Plain text from rich text (cart lines, emptiness checks, panel summaries): the markup is parsed in an inert document and the text content read out, so no tag remnants can survive the way they can with a regex pass.

## `plainLines`

The lines of a text that may be written as rich text, such as a feed's event description: markup (a tag or an entity) is parsed in an inert document, a line break and the end of a block become new lines, and the text content is read out.
Text without markup comes back as it is.
