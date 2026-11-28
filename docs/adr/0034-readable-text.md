# ADR-0034: Readable text

Date: 14 November 2026
Status: Accepted. Makes the phone's floor for words (0.7.3.14.1, the row grid of [ADR-0019](0019-synced-mobile-model.md)) a setting, and gives the desktop a measure for a text's lines. Chosen in the design pass of BACKLOG 0.7.3.20 on 14 November 2026; decision 3 amended 19 November 2026 (the desktop's setting also hands a section to its phone layout under the window width where its text would stand narrower than the floor, weighed in BACKLOG 0.7.3.29 on 18 November 2026), earlier text in [amended/](amended/0034-readable-text.md).

## Context

Words can be drawn too narrow or too wide to read, and a word too long for its line can be cut anywhere. On a phone a text in a quarter of the row is about 80 px wide, some eight letters a line; on the desktop a text across the content width runs to about 150 characters a line, where 45 to 75 is the readable range. Since 0.7.3.14.1 the phone has had a fixed floor: a cell holding words narrower than about 140 px is drawn across the row, in the editor and for visitors alike, and the width handle stops there. The desktop had no measure.

The drops of BACKLOG 0.7.3.21 can give two blocks a quarter each. For pictures that reads well; for words only where the owner lets it. Decided 14 November 2026: a setting for each screen, on by default, and a look that says why a drop is not allowed rather than a long explanation.

Below the design width the desktop canvas narrows with the window ([ADR-0018](0018-bound-content-width.md)), and a text keeps its size ([ADR-0024](0024-content-push-on-the-desktop-canvas.md) decision 5), so a narrow column of words can fall under the floor on a tablet or a narrow window without anyone dragging it. The builders that shrink a layout pair a floor with a hand-off to another layout, always for the whole page ([comparison/SURVEYS.md](../comparison/SURVEYS.md#scaling-below-the-design-width-23-september-2026)); a section of a page reads on its own, and only the sections whose words would be too narrow need the phone's layout.

What the field does: the editorial grid keeps text at a readable measure of about 68 characters while pictures and bands break out, and a default theme in the comparison sets a content width of 645 px ([comparison/DESIGN.md](../comparison/DESIGN.md#editorial-grid-and-full-bleed)).

## Decision

1. **«Force readable text» is a section setting for each screen, on by default.** The section's `size.readablePhone` and `size.readableDesktop` are stored only as `false`; absent is on, so a page from before reads as it did on the phone.
2. **On the phone it is the floor for words.** A cell holding words narrower than about 140 px at the window's width stands across the row (base.css), the width handle stops at the narrowest width words read well in, and a drop that would squeeze a block with words is not allowed. Off, words take any width in the phone's cells, the floor not drawn for visitors either. Blocks without words (pictures, icons, buttons) take any width either way.
3. **On the desktop it is a measure.** A text block's lines wrap at 75 characters of its own font in its plain design (the document designs and the terms of sale keep their own layout), set on each paragraph so the box and a text box's card keep their frame, each paragraph standing by the text's alignment or its own; its width handle stops at 140 px, or where a narrower text already stands. Characters, not px, since the measure is a count of letters whatever the size. Under the window width where such a text would stand narrower than 140 px on the canvas, the section shows its phone layout, its texts keeping the measure, while the rest of the page and the navigation bar keep the desktop's; a text already narrower at the design width (the canvas on a 1440 px screen) is the owner's choice and does not count, a text that shrinks instead of wrapping counts only where its box is narrower than the floor at its smallest scale, and a short word on a button, a basket or a statistic reads well narrower. In the editor's desktop view at such a width the section is shown as visitors see it and is not edited there: its bar says so and opens it in the phone view. Off, the lines run the box's width and the section keeps its desktop layout.
4. **Long words are kept whole, or hyphenated.** A word too long for its line is kept whole, standing past its box, the standard, or split with a hyphen where the page's language allows and broken where it still does not fit. The site sets it in the theme (`theme.words`), and a text block can have its own (`props.words`). The editor draws it as the published page does: a text being typed in would otherwise let the browser break any word anywhere, without a hyphen.
5. **What is not allowed says so by its look, and the editor says why.** While a drag or a handle would make a block with words narrower than the setting allows, the block being dragged greys; the section shows no result, a release moves nothing, and the editor's notice line names the setting that stops it, for as long as the block is greyed.

## Alternatives rejected

- **One width for the whole page («Phone layout below», the site's `breakpoints.mobile`):** what the field does, but every section switches with it, those that read well too, and the owner has to know to set it.
- **A floor on the text's box on the desktop:** a block cannot take more width without covering its neighbours, since the push moves blocks down and never sideways, and container queries stay off the canvas ([ADR-0018](0018-bound-content-width.md)).
- **Editing a section in its phone layout from the desktop view:** one view would then edit the desktop layout for some sections and the phone layout for others.
- **A fixed floor, as before:** a block of words in a quarter can be what the owner wants on a phone (a short label, a number), and nothing else in the phone view is fixed against the owner.
- **Quarters for words without a floor, and no setting:** a text of eight letters a line is what most pages would get by accident from a drop.
- **The desktop's measure as a fixed width on the box:** a box narrower than its frame would leave the frame's outline and the card of a text box out of line with the words.

## Consequences

- A section can show its phone layout on a desktop page, under a window width its narrowest text sets; the navigation bar follows the page's breakpoint alone ([ADR-0024](0024-content-push-on-the-desktop-canvas.md) decision 5, amended the same day). The published page watches one media query for each such section and draws only that section again as the window crosses it.
- The data contract gains two booleans on a section's `size` (docs/SCHEMA.md); absence is on, so it needs no migration ([ADR-0005](0005-versioning-and-migration.md)).
- Pages whose texts run longer lines than 75 characters on the desktop get shorter lines after the update, since the desktop's setting is on by default: such a text stands taller, and the blocks under it move down by the push pass ([ADR-0024](0024-content-push-on-the-desktop-canvas.md)). A section that wants its lines as wide as its boxes turns it off.
- The phone's floor is the same as before where the setting is on; a section that turns it off draws its words as narrow as its cells, for visitors too.
- The drops of 0.7.3.21 can give words quarters only where the phone's setting is off, and grey the target where it is on.
- A long word in a narrow box stands whole past it, on published pages as before and now in the editor too, where it used to break without a hyphen; a site or a text that chooses hyphens gets them where the browser has a word list for the page's language, and a break without one elsewhere.

## Addendum (20 November 2026)

A section that shows its phone layout on the desktop (decision 3) is drawn as the phone draws it: its order, cells and stacks, the phone's own words of [ADR-0033](0033-words-of-its-own-on-the-phone.md), the blocks shown on phones only and not those hidden there, and the phone's choice of entrance; only its texts' measure is the desktop's. A phone layout has no place for a block hidden on phones, and its cells are set for the phone's words, so the section is the phone's whole. This names what decision 3's «phone layout» holds and changes no decision. The side column of a side menu narrows the canvas as the side margin does, so it counts in the width where the section turns.
