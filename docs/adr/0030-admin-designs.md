# ADR-0030: Admin designs

Date: 9 November 2026
Status: Accepted. Builds on the row kit of [ADR-0016](0016-panel-language.md) (0.7.30), which draws every surface from shared parts, so a design can change the frame around the rows without changing the rows. The designs and their parts were chosen on the Admin Designs canvas on 7 November 2026 and named on 8 November 2026 (BACKLOG 0.7.33.1 and 0.7.33.2). Decision 2 amended 11 November 2026 (a part whose default changes has its earlier default read once per browser), earlier text in [amended/](amended/0030-admin-designs-until-2026-11-11.md).

## Context

The admin's choices grew one at a time in Urd settings: how the panels are reached, how the tabs' menus look, where page settings, the import preview and the settings themselves open, the element menu's width, the link editor, the new block menu and the layout picker. Each is kept per browser, stored only where it differs from its default. Admin designs that feel like other builders (an action bar with small panels at the element, a docked panel with tabs, one long column) were chosen on 7 November 2026, and the parts of those feelings are the choices Urd already has, with the element menu's width widened into where the menu opens and how it is laid out, plus five new ones: how folds behave, the bar on the block, how a design is chosen, whether rarely used settings are shown, and what stands first in the menu.

Thirteen separate rows give no way to say «the whole admin like this», and a fourteenth row that names a design would be a third place where the truth can disagree with the parts.

## Decision

1. **A design is a full set of parts, and a part is one of Urd's choices.** `editor/src/lib/admin-designs.js` lists the parts, each with the key it is stored under, its options with the default first, and the row of Urd settings that sets it today; a part with no row yet, or with options its row does not offer yet, names the step that builds what it chooses. Four designs set every part: Floating menu (the default), Small panels, Side panel and One column. A part a design leaves without effect (what it chooses between is not there, as the sidebar's folds outside the sidebar) is written at its default and not weighed.
2. **The parts keep their keys, and a changed default is read once.** Each part is stored where its choice has always been stored, only where it differs from its default; the element menu's form takes the width's key, so a stored «narrow» is the form one column beside the block. An owner with nothing stored stands in the default design, and an owner with stored choices stands in it with those parts changed. Since a key that holds nothing means the default of its time, a part whose default changes has its earlier default read once per browser behind a mark: where the parts read with it make a design other than the default, it is written, so that design reads as it did, and after the mark a key that holds nothing is the new default.
3. **Which design stands is read, never stored.** The design that stands is the one whose weighed parts differ least from the parts, the earlier one on a tie, and the parts that differ from it are listed («Floating menu, changed»). There is no stored design to disagree with the parts.
4. **Choosing a design writes every part at once, and one step takes it back.** The values before the choice are kept and written back by the step's undo; the step lives with the settings window that offers the designs, not in the site's undo history.
5. **A design never touches the owner's taste or the site's own.** The colour theme, the language, the button press, look choices as pictures or words, spell check, moving rows, the panels on a fresh load and the panel to start with stay the owner's own; the update notice and the analytics token stay the site's. None is a part.

## Consequences

- `tests/admin-designs.test.mjs` holds the default design equal to every part's default, each design to the parts' options, a design to read back as itself once written, the values before it to take it back, every part with a row to that row (marked `part` in `lib/settings-model.js`) and every marked row to a part, the existing parts to the keys the state stores them under, and the names to the three core dictionaries.
- The settings window (0.7.33.4 and 0.7.33.5) draws the design first and the parts under it; a part that has no effect while a design stands is hidden there.
- The element menu's forms, the folds, the extra settings and the shortcuts are built (0.7.33.6), the toolbar on the blocks and the sections (0.7.33.7), and how a design is chosen (0.7.33.8), so every part has its row in Urd settings, and the default design is the admin a browser with nothing stored opens with.
- Since the standing design is read from the parts, an owner who changes many parts by hand may see another design named as the nearest; the parts are the truth, and the name follows them.
