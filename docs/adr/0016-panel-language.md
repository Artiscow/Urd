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

[AGENTS.md]: ../../AGENTS.md
[ADR-0009]: 0009-themed-ui-rule.md
[ADR-0012]: 0012-multilingual.md
