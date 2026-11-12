# ADR-0031: Capabilities in the element menu

Date: 9 November 2026
Status: Accepted. Builds on the setting rows of the row kit ([ADR-0016](0016-panel-language.md), 0.7.33.10), which let every row tell whether the block holds a value of its own, and on the admin designs of [ADR-0030](0030-admin-designs.md), whose parts the way to add becomes one of. Chosen on the Design canvas «Adding a Setting» on 9 November 2026 (BACKLOG 0.7.33.11), and planned in a plan round the same day (BACKLOG 0.7.33.12). Decision 5 and the consequence on the other families amended 11 November 2026 (folded cards, «Minimal», the default way to add; the other families' groups sorted into capabilities and folds), earlier text in [amended/](amended/0031-capabilities-in-the-element-menu-until-2026-11-11.md).

## Context

A block's menu draws every group it can have, used or not: a text block shows its motion, its box, its pinning while scrolling, its name for links and its decor, though most text blocks use none of them. «Extra settings: Added from a menu» hides rows inside a group behind a ⋮, but it saves no room for a group of two, and it costs a click and a line where it does.

The field was surveyed on 9 November 2026 (comparison/SURVEYS.md «Adding a setting»). Unity and Blender add capabilities as cards from a list, Webflow, Elementor 4, Figma and Plasmic add an effect with a «+» on its heading, and WordPress keeps a ⋮ in the panel's heading. Capabilities as cards were chosen, since they take the least room, in five forms of the way to add.

## Decision

1. **A capability is a group of settings a block can carry but does not use, and it takes no room until it is added.** The capabilities stand in one pure catalogue, `editor/src/menu/capabilities.js`. Each entry says:
   - its area;
   - the Pinned rows that hold its settings;
   - the block types and the view that carry it;
   - when the block uses it;
   - what adding it sets (a switch-like capability is switched on);
   - how it is taken back.

   The catalogue is read wherever the menu is drawn, including where effects do not run. The shared capabilities stand on every block: the motion, the box (where the block has one), pinning while scrolling, hiding on phones, the name for links and the decor. A block's own capabilities are listed with its family.
2. **A capability in use always stands as a card, and one added this session stands on its block until the admin is loaded again.** «In use» is read from the block, so it holds after a reload; «added» is kept for the session per block and is never stored.
3. **A card holds every setting of its capability and a way back; what the capability does is told where it is added.** A capability that is one switch is a card of one line, with an On/Off chip for the switch. The way back takes every setting to the standard in one undo step, and the capability back to where it is added from. A capability whose settings all stand in Pinned is neither a card nor offered, since Pinned holds it. The name for links is taken away only while no link on the page, in the menu or in the footer reaches the block by it.
4. **What reads every capability draws every card.** The search's copy of the menu draws them all, so a setting is found where it stands. A tool on the block's bar opens its capability whether the block uses it or not, and a change made there puts the capability in use.
5. **The way to add is a part of the admin designs.** It comes in five forms, folded cards (the default, named «Minimal»: a quiet line of names at the foot of each area, the cards folding to one line at their name), the menu's head, chips at the foot of each area, one add button per area, and icons in the area's heading, chosen in Urd settings («Extra settings style»). The list the «+» opens is a list by default, each capability with its drawing and a line on what it does and what the block has already dimmed at its foot, or tiles in two columns («The add list», chosen on the Design canvas «Capability Cards» on 9 November 2026).
6. **«Extra settings» stays for the groups that are not capabilities.** A card shows all its settings.

## Consequences

- `tests/capabilities.test.mjs` holds each capability's way back to taking it out of use, adding a switch-like one to putting it in use, the name for links to its links, and every capability's words to the three core dictionaries.
- `tests/menu-render.test.mjs` holds a card to standing while its capability is in use or added, in the search's copy and in its tool's panel, and nowhere else. `tests/bar-tools.test.mjs` lets a tool open a capability's card as it opens a fold.
- The history joins the changes of one step of its own into one undo step (`lib/history-model.js`), so a way back that clears several settings is undone at once.
- A family that moves a group into a capability takes the group's settings out of the reset and the count of the group it left.
- The image's and the calendar's own capabilities stand with the shared ones; a block's own capability whose card a tool of its bar opens keeps the id of the fold it was, so the tool finds it. Of the other families' groups, sorted on 11 November 2026, the button's colours and the ribbon's stripes are capabilities, and so are the calendar's text fields and, since 12 November 2026, an uploaded film's playback, a group that starts with nothing on; every other group stands as a fold, a block's content and its look being its core, and a group that is on from the start (the checkout's seller) staying a fold.
