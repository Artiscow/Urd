# blocks/stats.js

The full text of the longer comments in the engine's `blocks/stats.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: statistic / key figure. One number with an optional prefix and
suffix and a label below; three blocks side by side give the number trio from
the statistics preset. What it adds over plain text blocks is the count-up
animation on first entrance (IntersectionObserver, one-shot): the number counts
from zero to the final value with the number format preserved. ADR-0011 gating:
without support, with prefers-reduced-motion, and in editing mode the number
stands in its FINAL STATE - the animation is pure decoration and never a
requirement.

## `parseStatValue`

Parses the display value as a number (pure, node-testable): the digits with an
optional decimal separator (comma or period), grouped with spaces or thin
spaces ("4 800", "1 234,5"). Anything else gives null (no animation).

## `statsBlock › render › const fields`

Click-and-type on the value and the label; prefix and suffix live in the panel.
In the phone view the label is written as the phone's own (PHONE\_WORDS, ADR-0033), and the number, the same fact on every screen, is written on the desktop.
Each change hands back the fields as they stand on the page, so one typed earlier is never handed back as it was drawn.
