# prefetch.js

The full text of the longer comments in the engine's `prefetch.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Page prefetch on intent: when a visitor hovers, presses or focuses an
internal link, the target's page file is fetched and parked in
sessionStorage, so the boot on the next page reads it without a round
trip and only revalidates in the background. The page files are served
with max-age=0, so the browser's own cache would still cost a 304 round
trip per navigation; the parked copy is what removes that hop.

Pure functions (link resolution, the parked store, revalidation) are
separated from the DOM wiring so they are contract-tested in node. Inert
in the editor preview, where page switches happen via postMessage.

## `internalPageFor`

The page-register entry a link points to, or null when the link is not a
plain internal page link: another origin, a query string, a path outside
the register, or the current page itself (an in-page hash included).

## `readPrefetched`

Takes a parked page file out of the store (consumed once). Returns the
parsed page, the raw text and the ETag it was fetched with, or null when
nothing fresh is parked for that file.

## `revalidateFile`

Revalidates a served JSON file against the copy a page was rendered from
(a parked copy, or the boot fetch of a prerendered or restored page).
Resolves to the fresh page with its text and ETag when the server has a
different version, or null when the copy was current (304, same ETag, or
identical text). Without an ETag the request is unconditional and the
text comparison decides.

## `wirePrefetch`

Attaches the intent listeners: hover (mouse), press (touch and pen, which
fire before the click) and keyboard focus on any internal page link. Each
page file is prefetched at most once per MAX\_AGE\_MS window.
