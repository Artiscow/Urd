# ADR-0034: Readable text

Date: 14 November 2026
Status: Accepted. Makes the phone's floor for words (0.7.3.14.1, the row grid of [ADR-0019](0019-synced-mobile-model.md)) a setting, and gives the desktop a measure for a text's lines. Chosen in the design pass of BACKLOG 0.7.3.20 on 14 November 2026.

## Context

Words can be drawn too narrow or too wide to read, and a word too long for its line can be cut anywhere. On a phone a text in a quarter of the row is about 80 px wide, some eight letters a line; on the desktop a text across the content width runs to about 150 characters a line, where 45 to 75 is the readable range. Since 0.7.3.14.1 the phone has had a fixed floor: a cell holding words narrower than about 140 px is drawn across the row, in the editor and for visitors alike, and the width handle stops there. The desktop had no measure.

The drops of BACKLOG 0.7.3.21 can give two blocks a quarter each. For pictures that reads well; for words only where the owner lets it. Decided 14 November 2026: a setting for each screen, on by default, and a look that says why a drop is not allowed rather than a long explanation.

What the field does: the editorial grid keeps text at a readable measure of about 68 characters while pictures and bands break out, and a default theme in the comparison sets a content width of 645 px ([comparison/DESIGN.md](../comparison/DESIGN.md#editorial-grid-and-full-bleed)).

## Decision

1. **«Force readable text» is a section setting for each screen, on by default.** The section's `size.readablePhone` and `size.readableDesktop` are stored only as `false`; absent is on, so a page from before reads as it did on the phone.
2. **On the phone it is the floor for words.** A cell holding words narrower than about 140 px at the window's width stands across the row (base.css), the width handle stops at the narrowest width words read well in, and a drop that would squeeze a block with words is not allowed. Off, words take any width in the phone's cells, the floor not drawn for visitors either. Blocks without words (pictures, icons, buttons) take any width either way.
3. **On the desktop it is a measure.** A text block's lines wrap at 75 characters of its own font in its plain design (the document designs and the terms of sale keep their own layout), set on each paragraph so the box and a text box's card keep their frame, each paragraph standing by the text's alignment or its own; its width handle stops at 140 px, or where a narrower text already stands. Characters, not px, since the measure is a count of letters whatever the size. Off, the lines run the box's width.
4. **Long words are kept whole, or hyphenated.** A word too long for its line is kept whole, standing past its box, the standard, or split with a hyphen where the page's language allows and broken where it still does not fit. The site sets it in the theme (`theme.words`), and a text block can have its own (`props.words`). The editor draws it as the published page does: a text being typed in would otherwise let the browser break any word anywhere, without a hyphen.
5. **What is not allowed says so by its look.** While a drop or a handle would make a block with words narrower than the setting allows, the block greys with a small round mark drawing a «T»; the section shows no result, and a release moves nothing. The mark carries no tooltip: the setting's own tooltip says what it does.

## Alternatives rejected

- **A fixed floor, as before:** a block of words in a quarter can be what the owner wants on a phone (a short label, a number), and nothing else in the phone view is fixed against the owner.
- **Quarters for words without a floor, and no setting:** a text of eight letters a line is what most pages would get by accident from a drop.
- **The desktop's measure as a fixed width on the box:** a box narrower than its frame would leave the frame's outline and the card of a text box out of line with the words.

## Consequences

- The data contract gains two booleans on a section's `size` (docs/SCHEMA.md); absence is on, so it needs no migration ([ADR-0005](0005-versioning-and-migration.md)).
- Pages whose texts run longer lines than 75 characters on the desktop get shorter lines after the update, since the desktop's setting is on by default: such a text stands taller, and the blocks under it move down by the push pass ([ADR-0024](0024-content-push-on-the-desktop-canvas.md)). A section that wants its lines as wide as its boxes turns it off.
- The phone's floor is the same as before where the setting is on; a section that turns it off draws its words as narrow as its cells, for visitors too.
- The drops of 0.7.3.21 can give words quarters only where the phone's setting is off, and grey the target where it is on.
- A long word in a narrow box stands whole past it, on published pages as before and now in the editor too, where it used to break without a hyphen; a site or a text that chooses hyphens gets them where the browser has a word list for the page's language, and a break without one elsewhere.
