# ADR-0016: The panel language and the element menu

Date: 8 August 2026. Status: accepted (v0.6, the panel-language rollout 0.6.6.6); decision 3 amended 3 October 2026, earlier text in [amended/](0016-panel-language-until-2026-10-11.md). The class contract behind the building blocks is described in [ARCHITECTURE.md](../../ARCHITECTURE.md#the-editor-editor--templateadminassets).

## Context

Admin's panels (Pages, Theme, Nav, Footer, Collections, Plugins, Updates) plus Properties grew organically, and each panel invented its own recipes for rows, labels, chips and previews. The rebuild of the Theme panel piloted a coherent panel language: compact control rows, collapsible groups, segment buttons, small uppercase labels, pill chips and live previews. The Updates panel reused the idiom, but had to copy the recipes because they were not shared classes. Without a pinned contract the panels drift apart again.

At the same time the field study ([ELEMENTS.md](../../comparison/ELEMENTS.md), part 1, configuration surfaces) shows that nearly all modern builders split the inspector into Content vs Style: Gutenberg (Settings/Styles), Elementor (Content/Style/Advanced), Bricks (Content/Style), Carrd (Main/Appearance), GrapesJS (Traits/Style Manager). Without such a split, content fields, appearance, placement and animation stand in one long list.

## Decision

1. **The panel language is a shared contract.** The building blocks are shared classes in the editor's panel style (panel heading, control row, collapsible group, segment control, mini label, chip, preview surface, empty state), and panels compose them instead of writing their own recipes. A segment control, never a native `<select>` (ADR-0009). The empty state and the error message are the ONLY legitimate uses of a prose surface in a panel; explanatory prose belongs in «?» tooltips or the help chip (the prose rule in [AGENTS.md]).
2. **Live previews.** Settings that change appearance shall show the effect where they are set: a sample on a preview surface (the palette preview, the typography sample and the corner sample in Theme) or directly in the control itself. A setting the user has to «save and check» is a deviation.
3. **The element menu: Content, Style and Placement.** Two areas alone leave placement, motion and the narrow-screen behaviour at the foot of Style, and a block type with many drawn options (the calendar designs) grows Style past what one column carries. The element menu (the floating menu from the gear on a block, and the Properties panel, both drawn by the same snippet) is therefore built on these decisions:
   - **Three areas.** Content (what the block says and shows: text and content fields, plugin fields via the field contract, collection binding, media choice), Style (how it looks: colours, background, borders, typography overrides, hover) and Placement (where it sits and how it behaves there: the narrow-screen fit, motion, pinning, the frame, layer and rotation, visibility). Placement is not an «Advanced» drawer: it holds the same settings for every block, in the same order. No «Advanced» area exists: Urd does not have the depth (custom CSS, responsive overrides per field, motion conditions) that justifies Elementor's three-way split, and an empty or thin area is worse than none.
   - **One menu in two widths.** Wide, the three areas stand side by side as columns; narrow, they are three tabs. The admin setting «Element menu» chooses the width a menu opens in (wide unless set otherwise, kept in the browser), and a button in the menu's head switches for the session. The Properties panel in the rail is always narrow. The floating menu never lies over the admin's own panels; where the wide menu does not fit beside them it is narrow whatever is chosen.
   - **Collapsible groups that show their value.** Inside an area the settings stand in collapsible groups (decision 1's building block) whose summary carries the group's current value while closed, so the menu can be read without opening anything. A group stays open or closed as it was left when another block is selected.
   - **A quick row.** The settings used most stand above the areas as a row of their own, with a default set per block type and the site owner's own pins on top.
   - **A picker takes the whole menu.** A choice among many drawn options (the calendar's designs) opens over the areas at the menu's full width and returns to them with one button, instead of unfolding inside a column.
   - **Every element menu is built from the same parts.** A block type contributes its Content and Style groups; the frame, the Placement area, the quick row and the search are shared.
4. **The rollout is additive.** Panels are moved over to the shared classes panel by panel, and new panels and new controls use them from the start. A new class that duplicates a building block with drifted values is a review finding, not a variant.

## Consequences

- The shared classes carry one set of values; small pixel deviations between the panels are precisely the drift the contract removes.
- The element menu's areas, groups and settings require UI keys in the core languages (nb, en-GB, tr) (ADR-0012).

[AGENTS.md]: ../../../AGENTS.md
[ADR-0009]: ../0009-themed-ui-rule.md
[ADR-0012]: ../0012-multilingual.md
