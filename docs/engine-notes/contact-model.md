# contact-model.js

The full text of the longer comments in the engine's `contact-model.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The association's legal and contact details (site.site.contact, additive from 0.7.24.5): the country, the legal name, the organisation numbers the country's profile knows (contact-profiles.js), the VAT status, the representative, the address with its point on the map, the phone, the email and the contact points by role.
They are typed once in the admin's Legal panel and read by the footer, the contact block and the Organization JSON-LD.
Pure functions with no DOM and no language: the render layer adds the words through t() (ADR-0012), and tests/contact.test.mjs covers them.

## `const CONTACT_DESIGNS`

The contact block's designs, the plain lines first: each id is a class `urd-contact-<id>` in base.css and a label `opt.contact.<id>` in the admin dictionaries.
`points` marks the design that lists the contact points by role, `geo` the one that shows the site's point on a map, and `band` the one that may stand on a coloured band.

## `normaliseId`

The stored form of a value for an id: free text trimmed with single spaces (in a register entry the letters set apart from the number, and the prefix added when the number is typed alone), or the characters of a number uppercased with the separators removed and the prefix in place.

## `legalParts`

The legal line's parts, in order: the legal name, each number as the profile writes it, the VAT number or status, and the representative.
The words a language adds (the representative's title) come from the render layer, so a part names its kind.

## `contactParts`

The address and the ways to reach the association, for the footer.
The address is its lines (the street, then the postcode and the town); a phone or an email gets its link only when it is usable.

## `sellerParts`

The seller as the checkout names it under its order buttons (angrerettloven § 8 d: the name, the address and the contact details before the order): the name, the organisation numbers and the VAT number, the address on one line, the phone and the email.
The name is the legal name, else the site's title; the representative stays in the footer.

## `sellerDetailsText`

The seller's details as one line of text, as the terms of sale write them after the name: the numbers with their labels, the VAT mark and the register, the address, the email and the phone; '' where the site has none.

## `organizationContact`

The legal and contact details as schema.org Organization properties, with every empty field left out.
The contact points by role become ContactPoint entries.
The first number with an ISO 6523 code goes into iso6523Code, the VAT number into vatID, the other numbers into identifier, a status with a schema.org type into nonprofitStatus; a number that fails a refusing check is left out.
