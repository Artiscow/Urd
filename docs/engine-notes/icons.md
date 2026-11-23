# icons.js

The full text of the longer comments in the engine's `icons.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The icon library: drawn SVG icons (social media, communication, symbols,
arrows) that the icon block can show instead of a glyph.
The icons are hand-drawn paths on a 24x24 grid, colored with currentColor
and scale crisply at every size (unlike emoji, which have fixed colors and
vary between platforms).

The ids are data contract (stored in props.icon) and are therefore English;
the labels are looked up via labelKey (icon.\*) with an English fallback
(ADR-0021). An unknown id must never topple anything: iconSvg returns null,
and the icon block falls back to the glyph.

## `const ICON_CATEGORIES (2)`

The category names are KEYS (looked up with ta() by the consumer; the module
sits in the visitor closure and can never call ta() at module level). The
ICON\_LIBRARY labels are brand names used in visitor aria-labels and are never
translated.

## `iconSvg`

Builds the complete SVG string for an icon, or null for an unknown id.
The size is set by the parent (width/height 100 %); the color is inherited
via currentColor.
