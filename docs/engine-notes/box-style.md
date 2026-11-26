# box-style.js

The full text of the longer comments in the engine's `box-style.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Card styles: shadow, border and glass effect for box surfaces (the text box
and the FAQ cards). A pure function that builds style properties; the DOM
renderers use Object.assign(el.style, boxStyleCss(props.boxStyle)).

All fields are additive, with defaults that give the plain look (the base
style in .urd-text-box), so data without them renders unchanged.


## `boxStyleCss`

The result: style properties (camelCase) to lay ON TOP of the base style. An empty object = the plain base style. border: undefined = the theme's thin border (from the CSS).

## `boxStyleCss › const base`

Frosted glass: a translucent surface color plus a blurred backdrop. When a
block color is set, the glass is tinted with THAT instead of the theme
surface. Without backdrop-filter support the translucent surface remains
(graceful degradation).
