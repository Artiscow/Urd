# ADR-0016: The panel language and the Content/Style model

Date: 8 August 2026. Status: accepted (v0.6, the panel-language rollout 0.6.6.6).

## Context

Admin's six panels (Pages, Theme, Nav, Footer, Collections, Plugins) plus Properties grew organically, and each panel invented its own recipes for rows, labels, chips and previews. During the rebuild of the Theme panel (0.6.6.5.4) a coherent panel language was piloted: compact control rows, collapsible groups, segment buttons, small uppercase labels, pill chips and live previews. The Updates panel (0.6.10) reused the idiom, but had to copy the CSS recipes because they were not shared classes: three nearly identical row recipes (`.autorow`, `.palhead`, `.update-opt-head`), three nearly identical uppercase labels and two nearly identical chips arose over two rounds. Without a pinned contract the panels drift apart again.

At the same time the field study ([ELEMENTKART.md](../sammenligning/ELEMENTKART.md) parts 1.2 and 9) shows that nearly all modern builders split the inspector into Content vs Style: Gutenberg (Settings/Styles), Elementor (Content/Style/Advanced), Bricks (Content/Style), Carrd (Main/Appearance), GrapesJS (Traits/Style Manager). Urd's Properties panel has no such split today: content fields, appearance, placement and animation stand in one long list.

## Decision

1. **The panel language is a shared contract.** The building blocks live as shared CSS classes in the editor's panel style, and panels compose them instead of writing their own recipes:
   - **Panel heading:** `.panel-strong` for section titles in a panel.
   - **Control row:** `.ctl-row` (flex, label left / control right). Toggle rows use `.gridmenu-snap` (text left, toggle at the far right), value readouts use `.gridmenu-value` (tabular-nums).
   - **Collapsible group:** `<details class="group">` with `.group-items` inside; an open group is marked with an accent border. Section folders without a pill frame use the `.frame-group` variant.
   - **Segment control:** `.seg` with the `.on` state for the active choice (never a native `<select>`, ADR-0009).
   - **Mini label:** `.mini-label` (small uppercase label with letter-spacing) for column and group markers.
   - **Chip:** `.chip` (999px pill in currentColor, muted) with the `.accent` variant for the active/highlighted choice.
   - **Preview surface:** `.sample` (muted surface with a thin border and radius) as the base for live samples.
   - **Empty state and errors:** `.panel-hint` (with the `.place-error` pattern for errors). These are the ONLY legitimate uses; explanatory prose belongs in «?» tooltips or the help chip (the prose rule in [AGENTS.md]).
2. **Live previews.** Settings that change appearance shall show the effect where they are set: a sample on a `.sample` surface (pilot: the palette preview, the typography sample and the corner sample in Theme) or directly in the control itself. A setting the user has to «save and check» is a deviation.
3. **The Content/Style model.** The Properties panel is split into TWO segment tabs at the top: **Content** (what the block says and shows: text and content fields, plugin fields via the field contract, collection binding, media choice) and **Style** (how it looks and moves: colours, background, borders, typography overrides, hover, animation, plus placement/layer/rotation). NO third «Advanced» tab is introduced: Urd does not have the depth (custom CSS, responsive overrides per field, motion conditions) that justifies Elementor's three-way split, and an empty or thin tab is worse than none. The distribution of each individual setting is decided in the rollout round for Properties; the model (two tabs, the definitions above) is pinned here.
4. **The rollout is additive and round by round.** The panels are moved over to the shared classes in the backlog rounds under 0.6.6.6; new panels and new controls SHALL use them from the start. A new class that duplicates a building block with drifted values is a review finding, not a variant.

## Consequences

- The foundation round consolidates the pilot's near-duplicates: `.autorow`/`.palhead`/`.update-opt-head` become `.ctl-row` (plus any context class carrying only margins), `.palname`/`.tpv-cap`/`.update-opt-label` become `.mini-label`, `.stdtag`/`.update-tag` become `.chip`/`.chip.accent`, and the surface recipe in `.typo-sample`/`.form-prev` becomes `.sample`. The values are unified; small pixel deviations between the panels are precisely the drift being removed.
- The panel-hint prose that breaks the prose rule (33 paragraphs, its own backlog item) is migrated to tooltips/the help chip in step with the rollout rounds, panel by panel.
- The Properties tabs require new UI keys in the core languages (nb, en-GB, tr) when they are built (ADR-0012).
- The markup changes live in `editor/src/App.svelte`; each rollout round rebuilds and commits the bundle as usual.

## Addendum: the element menu (3 October 2026, milestone 0.7.20)

The Content/Style split of point 3 held two tabs and put placement, motion and the narrow-screen behaviour at the foot of Style. With the calendar designs the Style tab grew past what one column carries, so the element menu (the floating menu from the gear on a block, and the Properties panel, both drawn by the same snippet) is rebuilt on these decisions:

1. **Three areas.** Content (what the block says and shows), Style (how it looks) and Placement (where it sits and how it behaves there: the narrow-screen fit, motion, pinning, the frame, layer and rotation, visibility). Placement is not an «Advanced» drawer: it holds the same settings for every block, in the same order.
2. **One menu in two widths.** Wide, the three areas stand side by side as columns; narrow, they are three tabs. The admin setting «Element menu» chooses the width a menu opens in (wide unless set otherwise, kept in the browser), and a button in the menu's head switches for the session. The Properties panel in the rail is always narrow. The floating menu never lies over the admin's own panels; where the wide menu does not fit beside them it is narrow whatever is chosen.
3. **Collapsible groups that show their value.** Inside an area the settings stand in `<details class="group">` groups (point 1's building block) whose summary carries the group's current value while closed, so the menu can be read without opening anything. A group stays open or closed as it was left when another block is selected.
4. **A quick row.** The settings used most stand above the areas as a row of their own, with a default set per block type and the owner's own pins on top.
5. **A picker takes the whole menu.** A choice among many drawn options (the calendar's designs) opens over the areas at the menu's full width and returns to them with one button, instead of unfolding inside a column.
6. **Every element menu is built from the same parts.** A block type contributes its Content and Style groups; the frame, the Placement area, the quick row and the search are shared.

The stages are in BACKLOG under 0.7.20.

[AGENTS.md]: ../../AGENTS.md
[ADR-0009]: 0009-themed-ui-rule.md
[ADR-0012]: 0012-multilingual.md
