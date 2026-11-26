# blocks/map.js

The full text of the longer comments in the engine's `blocks/map.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: map. Privacy-friendly OpenStreetMap embedding: the owner
types an address (looked up through /api/geocode in admin), coordinates
or an OSM link, and the block embeds OSM's official iframe (no tracking,
no third-party tiles). The settings live in the Properties panel; the
help chip explains them (ADR-0008). Urd's own \_headers allows the host;
on a host that blocks it the block says which frame-src line is missing.

## `watchCspBlock`

Catches a CSP violation on the iframe (a host without OpenStreetMap in
frame-src) and replaces the broken iframe with something calm: the
missing line in the editor, a link that opens the map for visitors.
Urd's own \_headers allows OSM, so this normally never fires.
The contact block's map design watches its frame with it too.

## `mapBlock › render`

`askFirst`: false loads the map with the page instead of behind its cover (additive from 0.7.29.4). `lat`/`lon` are written by the address search in admin; `location` is parsed at render when they are missing (coordinates or an OSM link).
