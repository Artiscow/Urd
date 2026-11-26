# blocks/calendar-next.js

The full text of the longer comments in the engine's `blocks/calendar-next.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The calendar block's «Coming up» designs (milestone 0.7.19): nine looks on the next view, each built around the next event (and the ones after it as the block's `nextCount` and `laterCount` say), every one a renderer over the block's ui helpers (fields, static texts, buttons; see makeUi in calendar.js) with its own rules in calendar.css under its own class names.
The announcement (`props.notice` with the texts `noticeLabel`, `noticeTitle` and `noticeText`) is an optional part of the designs that declare `notice`.
Loaded by the block on the first render of a block that uses one of them, never in the visitor closure.

## `everyMinute`

Runs fn now and once a minute while the node stays on the page. A new
timer first stops the ones whose node a redraw has taken off the page, so
a calendar drawn again keeps one timer, not one per drawing.

## `noticeNode`

The announcement note, when the design shows one and the owner has switched it on.
Its title and text are the owner's own words: a note without either is never drawn for a visitor, and stands with its hints in the editor.
A text longer than the note holds opens the announcement in full in a card (`ui.notice`).

## `bandPause`

The band's pause (WCAG 2.2.2: moving content that lasts more than five seconds needs a pause that stays). A real button with
aria-pressed, shown at the band's edge in the «button» form; in the «touch» form it is there for the keyboard only, shown when
it has focus, while a touch on the band pauses it and a tap on its empty space plays it again. A pointer over the band and focus
inside it pause it for as long as they stay (the calendar's sheets).

## `fitReach`

Lays the band over the content surface or the whole page (`reach`, as the ribbon block does with its width, bandReach), measured from the section and the canvas.
The calendar's size zooms its content, so the width and the offset are written in the calendar's own pixels.

## `band › const reach`

The run rolls when it is wider than the band: a second run follows it so the loop has no seam, and the band gets its pause.
The second run opens the cards as the first does, so a press anywhere on the band reaches an event; it is hidden from assistive technology and left out of the tab order, where the first run stands.
With rolling switched off, or with reduced motion, the band stands still and scrolls sideways by hand.
A band that reaches past its block (the content width or the whole page) is laid out before it measures whether it rolls, and again when its section changes width.

## `cards › billboard`

N1 Billboard: the card as a lit billboard on its legs, a pulse before the date and the facts as tiles; the frame, the lamps and the legs are the calendar sheets'.
