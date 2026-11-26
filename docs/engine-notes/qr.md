# qr.js

The full text of the longer comments in the engine's `qr.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

A QR code encoder of Urd's own (ISO/IEC 18004), for the contact block's QR design: text in byte mode (UTF-8), error correction level M by default, the smallest version that holds it, and the mask with the lowest penalty.
Pure and DOM-free (tests/qr.test.mjs): `qrMatrix` gives the modules as rows of booleans (true is dark), `qrSvgPath` one SVG path for the dark ones.
Loaded by the block only for the QR design, so it stays outside the visitor closure.

## `linePenalty`

One row or column's penalty: runs of five or more of one colour, and patterns like a finder's with four light modules on a side (the quiet zone counts as light).

## `qrSvgPath`

The dark modules as one SVG path in module units, each horizontal run one rectangle, for a viewBox of the matrix's size (plus the quiet zone the drawing adds around it).
