# Urd logo

The mark is the uruz rune (ᚢ) drawn in one stroke, with the wordmark «Urd» beside it. The same geometry is used in the admin header and in the favicon.

## Files

- `urd-mark-<colour>.svg`: the rune alone (transparent background), for where you need the mark itself. The viewBox is tightened around the rune with even space (adjusted 14 August 2026).
- `urd-logo-<colour>.svg`: the full lockup, the rune and the «Urd» wordmark. The rune stands on the wordmark's baseline at cap height, and the viewBox is tightened around the mark (adjusted 14 August 2026).
- `urd-favicon.svg`: the rune in turquoise on a dark rounded tile (the same as the browser tab uses). The rune stands in the tile's optical centre (adjusted 14 August 2026).
- `legacy/`: the files as they looked before the adjustments (the rune optically centred on the em box in the lockup, roomy viewBoxes, the rune low on the favicon tile), kept as a backup.

The wordmark uses a system sans (the `Segoe UI`/`system-ui` stack). If you need the same rendering on every machine, turn the text into a path in a vector tool.

## Palette

Turquoise is the primary colour (well turquoise, after Urðarbrunnr). The others are kept as alternatives. The names are the ones in the file names.

| Name   | Hex       | Use                                         |
|--------|-----------|---------------------------------------------|
| turkis | `#15b39a` | Primary                                     |
| bronse | `#c9a227` | Alternative, warm                           |
| indigo | `#7c5cff` | Alternative, cool                           |
| mono   | `#eaf1ed` | For a dark background (invisible on light)  |

The same values are CSS variables in the editor (`--urd-brand`, `--urd-brand-bronze`, `--urd-brand-indigo`, `--urd-brand-mono`).
