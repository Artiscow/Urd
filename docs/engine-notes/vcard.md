# vcard.js

The full text of the longer comments in the engine's `vcard.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The site's contact details as a vCard 3.0 (RFC 2426), for the contact block's «Add to contacts» button and its QR design.
The card is the organisation's own: its name as FN and ORG with an empty person name, the address, the phone, the email and the site's address.
Pure and DOM-free (tests/vcard.test.mjs); loaded by the block only when a design or the button needs it, so it stays outside the visitor closure.

## `contactVcard`

The vCard for the site, or null when it holds nothing beyond a name.
A file folds its long lines and types its address, phone and email as the work ones; `compact`, for a QR code, keeps the lines whole and leaves the types out, which every reader takes and which makes the code smaller.
