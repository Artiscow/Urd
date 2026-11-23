# migrate.js

The full text of the longer comments in the engine's `migrate.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Stepwise version lifting - Urd's core invariant (see docs/adr/0005).

All data (blocks, background layers, animations, sections) carries
`version`, and every type definition states `version` + `migrations`
where migrations[n] lifts exactly v(n) → v(n+1) as a pure function
(props in, props out).

Lifting happens in memory at load time - the files on disk are written
only at the next publish. On an unknown type or a missing migration,
data is NEVER dropped: the entry is marked as a placeholder and the
original is kept.

## `lift › const from`

A missing/invalid version (hand-edited or truncated data) is treated
as v1, never as current: without this the while loop skips all the
migrations (undefined \< n is false) and the old format is read as new.

## `liftPhoneWords`

A block's own words on the phone (ADR-0033) lifted with the block: the desktop's props with the phone's words written in go through the block's migrations, and the word props that then differ from the lifted desktop props are the phone's.
So a migration that reshapes a word prop reaches `phoneProps` in the same step, and the stored phoneProps are written lifted at the next publish as the props are.

## `const MOBILE_ROW`

The row height of the mobile row grid (ADR-0019), in px. A model
constant on par with the breakpoint: never tied to grid.size, which is a
snapping tool for desktop.

## `const PHONE_COLUMNS`

The cell columns of the phone's row grid (ADR-0019): eight between the row's outer edges, which stand where a block across the full row stands (base.css .urd-flow).

## `phoneHeight`

A flowing block's own height on the phone (`height`, ADR-0019), in px, in the desktop height's place; null where it has none, and for a block pinned to rows, whose height is its rows.

## `mobileGapOf`

The space between the blocks that flow in a section's row grid on the phone, in px: the section's own (`size.mobileGap`), else the site's (`layout.mobileGap`), else MOBILE\_GAP, within 0 to MOBILE\_GAP\_MAX.
Pure function, tested.

## `const MOBILE_ROOM`

The room above a section's first block and below its last on the phone, in px: the standard, which a section's `size.mobilePadTop` and `size.mobilePadBottom` replace.

## `phoneRoomOf`

The room above a section's first block and below its last on the phone, in px: the section's own (`size.mobilePadTop`, `size.mobilePadBottom`, additive from 0.7.3.26), else MOBILE\_ROOM, never under 0.
Pure function, tested.

## `const V1_FLOW_PAD (2)`

The flow's top padding in the old mobile format: materialization
 measured y from the top of the surface, that is including the padding,
 so it is subtracted before the row index is computed.

## `liftMobileFrame`

Lifts a block's frames.mobile from the v1 shape (a full frame
{x, y, w, h}) to the row-grid placement (ADR-0019). A placement already
in the new shape (without y/h) is returned untouched, and a byte-equal
copy of the desktop frame yields null: that was materialization's
fallback for blocks outside the flow, never a hand-placed position.
Used by the page migration AND by template insertion
(templates-model.js), which inserts stored payloads outside the page lift.

## `const V2_BLOCK_TYPES`

Core block types were Norwegian before v3; data contracts use English
identifiers (ADR-0021). Plugin-owned types (kalender, kart, skjema) are
deliberately absent: old plugin folders in user repos keep defining the
old ids forever, so those are resolved through registry aliases instead.

## `const V3_PRESET_IDS`

Core section preset ids renamed in v4 (ADR-0021). Plugin preset ids
(hva-skjer, finn-oss, kontaktskjema) are deliberately absent; they resolve
through registry aliases like the plugin block types.

## `liftContractTokens`

Renames contract tokens (block types, background layer types and section
theme roles) in place. Accepts a section-like object ({blocks, background,
theme}) or a bare block array. Used by pageMigrations[2] and by template
insertion (templates-model), which inserts stored payloads outside the
page lift.

## `liftTermsBlocks`

The text blocks drawn in a document design become the terms of sale (0.7.24.8): from page v8 the document designs are the terms block's, and a text block is plain text.
The words, the design and its look stay as they were. A phone design the block's type no longer has is dropped: a text block has no designs, and plain text is none of the terms block's, so the phone draws the block's own design.
Accepts a section-like object or a bare block array; used by pageMigrations[7] and by template insertion (templates-model), which inserts stored payloads outside the page lift.

## `storedSize`

A block's stored size as the steps up to page v7 read it: inside SIZE,
else 1, and always 1 for the frame-sized types. The steps keep their
own reading, apart from blockSize, so they lift data the same way
whatever the bounds a block's text gives its size today.

## `liftCalendarScale`

The calendar's own size (`props.scale`, 0.7.20.1 to 0.7.21.4) becomes the
block-level `size` every block type takes (ADR-0025 decision 6), inside
its bounds; a size of 1 leaves no field.
Used by the page migration AND by template insertion (templates-model.js),
which inserts stored payloads outside the page lift.

## `liftMapHeights`

Lifts the map blocks of one section from the height setting the map had
before page v5 (`props.height`, the iframe's own height) to the frame
(ADR-0025 decision 2: the map's box decides, and the iframe fills it). The
frame takes the height the map showed, the iframe with the line under it or
the frame when that was taller, and the blocks below follow as for a fit
(fitMoves), so nothing moves on screen. The legacy id `kart` resolves to
the map block and is lifted the same way.
Used by the page migration AND by template insertion (templates-model.js),
which inserts stored payloads outside the page lift.

## `liftGalleryBands`

Lifts the gallery blocks of one section from the band height the ribbon
view had before page v7 (`props.bandHeight`, 80-400 px a row, 160 when
absent) to the frame (ADR-0025 decision 2: the gallery's box decides, and
the band fills it). The frame takes the height the band showed, its rows
and the gap between them at the block's size: a shorter frame grows to it
and the blocks below follow as for a fit (fitMoves), and a taller one
shrinks to it and moves nothing, so the band keeps its look. Every view
drops the field.
Used by the page migration AND by template insertion (templates-model.js),
which inserts stored payloads outside the page lift. A payload of unknown
age is lifted only where it carries the field; `old` lifts every ribbon
gallery, for data known to be from before page v7.

## `pageMigrations › 1`

1 -> 2 (synced mobile model, ADR-0019): frames.mobile changes shape
from a full frame {x,y,w,h} to a partial row-grid placement
{x,w,row,rows}, the section mode 'manual' is retired, and decor blocks
get the new hideMobile field that takes over mobile hiding. Pre-v1 the
visual change (row quantization ±8 px) is accepted (ADR-0005).

## `pageMigrations › 3`

3 -> 4 (ADR-0021): core section preset ids renamed. liftContractTokens
covers presets too, so a v2 page gets them in the first step and this
step is its no-op second pass; pages written at exactly v3 need it.

## `siteMigrations › 1`

1 -> 2 (bound content width, ADR-0018): the content is bound by a
design width instead of following the window width. The default is
written in explicitly instead of being derived at read time, so the
engine and the editor can never arrive at different values. Pre-v1 the
visual change is accepted (ADR-0005).

## `siteMigrations › 2`

2 -> 3: the page gutter changed from pixels to a PERCENTAGE OF THE
WINDOW WIDTH. The old value cannot be converted meaningfully (24 px is
not a fixed share of anything), so all are set to the default. Pre-v1
the small visual change is accepted (ADR-0005).

## `siteMigrations › 3`

3 -> 4: nav.style.inset (the bar's contents line up with the content
edge) became the default. As with the bound content width the old
default is written in explicitly, so a site built before the change
keeps the menu it was built with. Sites that set the field keep it.

## `siteMigrations › 5`

5 -> 6: the announcement strip got a page list of its own
(nav.announcement.hideOn), and nav.hideOn keeps the menu alone off its
pages. Where the menu was hidden outright the strip went with it, so
the menu's list is copied into the strip's; a menu reached from the
edge carried the strip inside it and still does.

## `liftAnnouncementHideOn`

The site migration 5 -> 6: where the menu is hidden outright (hideMode hidden, the default), its pages are pages the strip stays off too, as before the strip had a list of its own; a menu reached from the edge keeps carrying the strip.

## `liftPageFile`

Lifts a page file to the current schemaVersion. Stepwise and never
destructive: if a migration step is missing (or the file is NEWER than
the engine), it is returned untouched instead of being misread.
