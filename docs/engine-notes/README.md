# The engine's notes

The engine modules a visitor's page loads to draw keep short comments: each says in one or two lines what the code does, at most 160 characters of prose, a JSDoc tag's words counted and its type apart ([ADR-0037](../adr/0037-short-comments.md)).
The full text of a longer comment stands here, one file per module by its path in the engine folder (`render.md` for `render.js`), under the name it explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before.
`scripts/engine-notes.mjs` writes a module's notes from its committed text and proves the short versions leave the code unchanged and the notes whole; `tests/engine-notes.test.mjs` holds the limit, and `tests/comments.test.mjs` a tag's words.
