# osm.js

The full text of the longer comments in the engine's `osm.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Pure OSM logic for the map block (no DOM): reading a position the owner
pastes in (coordinates or an OpenStreetMap link), building the embed URL
and the larger-map link. Everything here is unit-tested in node.

Privacy: the map is embedded as a plain OSM iframe (no tracking, no
third-party tiles); Urd's own \_headers opens frame-src for openstreetmap.org.
