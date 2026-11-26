# blocks/calendar-cards.js

The full text of the longer comments in the engine's `blocks/calendar-cards.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The calendar block's card designs (milestone 0.7.19): six looks on the cards view, each a renderer over the block's ui helpers (fields, static texts, buttons; see makeUi in calendar.js) with its own rules in calendar-cards.css (or calendar.css, where families share them) under its own class names.
Loaded by the block on the first render of a block that uses one of them, never in the visitor closure.
