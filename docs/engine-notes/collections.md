# collections.js

The full text of the longer comments in the engine's `collections.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Collections (the data block pattern, ADR-0007): data fetching and pure helpers.
The helpers are DOM-free and tested in tests/collections.test.mjs; the
collection block (blocks/collection.js) uses them.

## `sortEntries`

Sorts entries: newest date first (or oldest when newestFirst is false).
Entries without a date keep their relative order and end up last.
Never mutates the input.

## `groupByYear`

Groups entries by year (from the date), newest year first; entries without a
date end up last in the group with year null. The entries within each group
are sorted newest first.

## `dateBadge`

Date badge parts from an ISO date: {day: '19', month: 'jul', year: '2026'}.
The month name follows the visitor language (Intl via i18n.js, nb without init).
An invalid or missing date gives null (the view drops the badge).

## `getCollection`

Fetches a collection: the draft from the editor wins (preview), otherwise the
server file. null for a missing or invalid file - the block shows its empty
state, never a crash.
