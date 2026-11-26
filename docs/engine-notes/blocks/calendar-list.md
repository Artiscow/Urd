# blocks/calendar-list.js

The full text of the longer comments in the engine's `blocks/calendar-list.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The calendar block's list designs (milestone 0.7.19): six looks on the list view, each a renderer over the block's ui helpers (fields, static texts, buttons; see makeUi in calendar.js) with its own rules in calendar-list.css (or calendar.css, where families share them) under its own class names.
The data is the limited, filtered list the block hands every view.
Loaded by the block on the first render of a block that uses one of them, never in the visitor closure.
