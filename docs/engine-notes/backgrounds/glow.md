# backgrounds/glow.js

The full text of the longer comments in the engine's `backgrounds/glow.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## `glowLayer › render › const x`

Old layers can be missing the fields (lift does not fill in defaults): fall back
to the default values. Without this, position and radius become NaN%, and CSS
discards the whole gradient, giving an invisible layer instead of one with the
default look.
