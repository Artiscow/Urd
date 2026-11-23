# locales/site/nb.js

The full text of the longer comments in the engine's `locales/site/nb.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Visitor-facing strings, Norwegian Bokmål. This is the BASE: every other
language layers on top of it, so a key missing in another language falls
back here. The keys are English identifiers (the data contract rule); the
parity test (tests/i18n.test.mjs) keeps the language files in sync.
The date tables below are the fallback when ICU lacks the language;
normally date names come from Intl (see i18n.js).
