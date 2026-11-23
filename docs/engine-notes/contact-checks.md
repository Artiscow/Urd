# contact-checks.js

The full text of the longer comments in the engine's `contact-checks.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The check digits of organisation and VAT numbers, one function per algorithm, keyed by the names the country profiles use (contact-profiles.js).
Every function takes the normalised number (its separators removed, or the text in single spaces for an id kept raw, and no prefix unless the algorithm needs it) and answers true or false; the profile says whether a false refuses the number or only warns.
The algorithms were verified against real published numbers on 20 October 2026 (tests/contact-checks.test.mjs holds them); where a register publishes no algorithm the profile marks the check as a warning.

## `mod11`

The common mod 11 family: the weighted sum of the digits before the check, r = sum mod 11, check = 11 - r, with the remainders 0 and 1 handled as the register says.
zero: the check for r = 0 ('0' or '1'); one: the check for r = 1 ('0', or null when such a number is never issued.

## `CHECKS › gb-vat`

The United Kingdom: the first seven digits weighted 8 to 2 plus the two check digits, a multiple of 97, or where the first three digits are 100 or more a remainder of 42 (the 9755 series) or 55 (accepted by python-stdnum, unexplained, so a valid number is never refused); a number that does not start with nine digits passes.
