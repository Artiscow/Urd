# blocks/collection.js

The full text of the longer comments in the engine's `blocks/collection.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: collection (the data-block pattern, ADR-0007). Renders the entries
of a collection from content/samlinger/ in one of three views: cards (a
responsive grid), list (rows with a date badge) or archive (grouped by year).

The content is structured DATA and renders with textContent, never innerHTML.
Fetching the data is asynchronous: render draws the shell synchronously and
fills it once the collection is loaded; a missing collection gives a calm empty
state, never a crash.

## `editable`

Click-and-type on the title/text right in the block: the change is posted to the editor, which owns the collection draft.
 The title is stored as plain text; the entry text is rich (html: true) and stores safe HTML (ADR-0007).

## `wireImageEdit`

Image editing in the preview: a click asks the admin's image editor (PictureEditor.svelte) to open on the entry's picture, with the picture's box as drawn here. The settings live in entry.imageStyle (additive).

## `textOrPlaceholder`

Entry text: rich (a safe HTML subset, the same sanitizing as text blocks). The urd-text class
 gives the floating text editor for free in preview. Empty fields show as editable placeholders.

## `titleNode`

Title: rich text (a safe HTML subset) with the full text editor in preview (the urd-text class
 gives the floating bar). With a link it renders as an anchor for visitors; in the editor the text is edited.

## `clampLines`

A card's title and text kept to the lines the block sets (`titleLines`, `textLines`, additive from 0.7.9.5), by a class and a custom property that base.css's `.urd-lines` draws with a line clamp. The whole text stays in the page; the collection clamps every view's titles and texts after the view is drawn, and the product block its cards' alone, its quick view showing them whole.

## `applyEntryImageStyle`

An entry's picture with its settings (imageStyle, drawn by picture.js) and its description, and the frame's shape and rounding.
node is the frame (a span with the img inside), or the img alone, whose parent is then its frame.

## `collectionBlock › render › host.setAttribute('aria-busy')`

Busy while the entries are fetched: the block holds its frame's height
on the desktop and the height measured for the phone there (base.css),
and the editor's fit waits for it.
