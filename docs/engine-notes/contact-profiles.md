# contact-profiles.js

The full text of the longer comments in the engine's `contact-profiles.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

How an organisation identifies itself on its website, per country: the numbers it shows, their form and check (contact-checks.js), the VAT number's relation to them, and the ISO 6523 codes the JSON-LD may carry.
Researched from the registers, tax authorities and laws on 20 October 2026 for 57 countries; a country outside the list uses the generic profile, a free label and number with no check.
The labels are the local abbreviations as sites write them, shown as they are in every language; the panel's field names come from the admin dictionary.

An id: { key, label, regex (on the normalised value), entry? (a register entry: letters and a number, the prefix added when the number is typed alone), check?, warn? (a failed check warns instead of refusing), choice? (ids sharing it are alternatives, of which an organisation holds one), display? (# per character), raw? (free text, only trimmed), prefix? (added when missing), checkWhole? (the check sees the prefix), extra? ('court' | 'city' | 'taxOffice'), line? (tokens {label} {value} {extra} {register}), lineBare? (the line while its court or register is empty), registers? (a choice named beside the number), status? (a tick box with fixed wording), icd?, icdKeep? (the ISO 6523 value keeps the prefix), icdPrefix? (added to it) }.
The VAT entry: { kind: 'none' | 'same' (the id is the VAT number) | 'mark' (a word after the id; withRegister joins it to the register's suffix) | 'wrap' (a prefix and suffix round the id, or its first digits) | 'separate' (its own number) | 'status' (a wording only), of?, mark?, prefix?, suffix?, take?, label?, regex?, check?, warn?, show? (false: the VAT number appears in the data only) }.
