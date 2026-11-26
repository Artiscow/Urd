# blocks/countdown.js

The full text of the longer comments in the engine's `blocks/countdown.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: a countdown towards a point in time (typically an event). Four
unit boxes (days/hours/minutes/seconds) ticking with setInterval; the ticking
is logic, not animation (ADR-0011), so reduced motion needs no special
handling. A target in the past shows the done text. The unit words are their
own keys instead of Intl.RelativeTimeFormat (Northern Sami is missing from ICU
and would fall back to a bare number).
