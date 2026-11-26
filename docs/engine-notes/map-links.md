# map-links.js

The full text of the longer comments in the engine's `map-links.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The link from a place written as text («The hall, Storgata 1, 7011 Trondheim») to a map: the map services a site can choose between (`site.mapService`), and the search each of them is given.
A link only: nothing is loaded from a service until the visitor follows it.
Pure and DOM-free, loaded by the blocks that draw a place and bundled by the editor for the list of services.

## `const SERVICES`

The services in the order they are offered, the default first. The search is appended to `url`, as a query value or, for HERE WeGo, as the last part of the path. `names` marks a service that knows venues by name, so the name is kept in its search.

## `mapQuery`

What a service is asked for.
A service with a register of venues gets the place as it is written.
One that knows addresses only gets it without a venue's name in front of its address («The hall, Storgata 1, 7011 Trondheim» is searched as «Storgata 1, 7011 Trondheim»); a place without a number in it is asked for as it is.
Norgeskart searches Norway alone and finds nothing with the country's name in the search.

## `mapSearchUrl`

The address that opens a place in a map service; an unknown service is OpenStreetMap.
With coordinates (`geo`, a feed's own point for the place) OpenStreetMap and Apple Maps open the point itself, which no search can miss; Google Maps keeps the search by words, where it knows the venue, and takes the point for a place without words.
A service without an address for a point searches by the words, and without words the point opens in OpenStreetMap.
