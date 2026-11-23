# boot.js

The full text of the longer comments in the engine's `boot.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## `boot({ root:`

The shell loads this module render-blocking, so the engine's page
transition listener is in place before the arriving document's first
rendering opportunity (the arrival hold in urd.js).
