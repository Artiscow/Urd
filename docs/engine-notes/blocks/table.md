# blocks/table.js

The full text of the longer comments in the engine's `blocks/table.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: table (opening hours, price lists). A semantic `<table>` in an
overflow-x wrapper, so wide tables scroll in their own surface instead of
tipping the page over. Cells are edited straight on the canvas (click and
type); rows and columns are added and removed in Properties. The style
choices (header row, striped rows, lines) live in the Style tab.
