# photo-source.js

The full text of the longer comments in the engine's `photo-source.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Pictures from a shared folder somewhere else: parsing the address the owner
pastes, and building the calls to the site's own proxy.

Fetching ALWAYS goes through the site's own routes (/api/photos for the
list, /api/photo for the bytes), the calendar block's model: the folder
hosts send no CORS, the site's CSP allows `connect-src 'self'` only, and an
API key must never reach the browser. Serving the pictures from the site's
own origin also keeps `img-src 'self' data:` untouched, so a deployed site
needs no CSP change to use this.

The parsing is pure and node-tested (tests/photo-source.test.mjs). Hosts are
compared exactly against a parsed URL, never with a substring test, and every
id is matched with an anchored regex.

## `const FOLDER_POOL`

How many pictures the folder is asked for, whatever is shown: the pool a
random draw and a newest-first cut are taken from. One size for everyone,
so the edge cache holds one answer per folder rather than one per setting.

## `const FOLDER_ORDERS`

Which pictures are shown: the first by name, the newest first, or a fresh
random draw on every visit. `name` and `newest` are sorted by the proxy;
`random` is drawn here, with one seed per page load, so the proxy's answer
stays cacheable and the set does not reshuffle on every re-render.

## `const PHOTO_WIDTHS`

The widths the byte route serves, the same ladder as functions/\_lib/photos.js
(a test holds the two equal). A layer asks for the step its use needs: a
full-width background the width of the window, a small floating frame the
width of that frame, so a hero is never a blur and a thumbnail never a
download of two thousand pixels.

## `parsePhotoSource`

What the pasted address points at, or null when nothing recognisable does.

Recognised: a Google Drive folder (the sharing link or the bare id), a
Google Photos shared album (the full link and the short one), a Nextcloud or
ownCloud public share, and any https address ending in .json that answers
with a list of pictures.

## `folderPhotos`

The pictures a folder answered with, in the layers' own image shape. The
proxy has already built each `src` as a path on this site, and anything else
is dropped rather than trusted.

## `let visitSeed`

One seed per page load, so the random draw and the random scatter hold
still while the page is open and come out new on the next visit. Shared
with the layer's layout, so the two are one throw.

## `photoWidth`

The ladder step for a picture drawn `cssPx` wide on a screen with `dpr`
device pixels per CSS pixel: the first step that is not smaller, so the
picture is never scaled up, capped at the top of the ladder.

## `const CACHE_TTL (2)`

The preview re-renders on every draft message, so the answer is kept: a
folder that answered for ten minutes, a folder that could not be read for
half a minute (long enough that a slider does not fire a call per tick,
short enough that a share the owner just opened is seen soon). A call that
is still out is kept too, so a render while it is pending joins it rather
than starting another.

## `peekFolderPhotos`

What is already known about a folder, without going out for it. The preview
re-renders on every draft message, so a layer that had to wait for a promise
each time would flash its example pictures on every keystroke.

## `loadFolderPhotos`

The pictures in a shared folder. Never throws: a folder that cannot be read
answers with an empty list and the reason, and the layer keeps its example
pictures. Without functions (local development) that is the quiet path too.

## `picturesFor (2)`

The pictures a layer should draw right now: the folder's, in the order
asked for and cut to `folderMax`, when it has answered; otherwise the
layer's own uploads.

## `drawWithFolder`

Draws a layer now from what is in hand, and again when its folder answers.
The proxy cannot answer in the same tick as render, and renderBackgroundLayers
appends the element after render returns, so the redraw waits for the
element to be connected and gives up quietly when it has been replaced.
