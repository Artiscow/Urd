# blocks/contact.js

The full text of the longer comments in the engine's `blocks/contact.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: the association's contact details (type id `contact`, 0.7.24.5).
It draws what the Legal panel holds under Who you are (site.contact, contact-model.js), so a changed phone number shows on every page at once.
The details are an \<address> in one of the designs of CONTACT\_DESIGNS: the plain lines, icon rows, a card, three tiles, a fact list, action buttons, beside a map that loads on a tap, a strip, a poster, the contact points by role, or beside a QR code that saves the contact.
Two options work with the designs: a button that saves the details as a contact card (vCard), and a bar docked to the bottom of a phone's screen with the call, email and map actions.
Each design has its narrow layout in contact.css by the block's own width (a container query), so a phone and a narrow frame both get it.

## `contactBlockModel`

The block's content from the site's details: the name (the legal name, else the site's title), the address lines, the phone and email links and the legal line's parts, each only when the block shows it and the site has it; the contact points by role and the point on the map, which the roles and map designs draw.
The site's title stands in for the name only beside another detail, so a site without contact details shows nothing.
Pure; the render draws it.

## `drawMap`

Beside a map: the details with a directions link, and OpenStreetMap's map behind a cover that loads it only on a tap, or with the page where the owner chose so (`askFirst: false`).

## `dockBar`

The bar docked to the bottom of a phone's screen: call, email and the map, each when the site has it.
It is a manual popover, so the top layer places it over the page whatever the block's ancestors are transformed by; without the Popover API it stays fixed by its rules in contact.css.
One bar per page: a block whose bar finds another one open leaves its own out.
