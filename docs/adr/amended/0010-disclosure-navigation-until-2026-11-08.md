# ADR-0010: Nav submenus follow the disclosure pattern (never role="menu")

Date: 22 July 2026. Status: accepted (v0.6 M5).

## Context

M5 gave the nav dropdown submenus, and WAI-ARIA has two established patterns to choose between. The menubar pattern (`role="menubar"`/`role="menu"`, arrow-key navigation, roving tabindex) is made for application menus à la desktop programs and is documented as wrong for website navigation: screen readers switch mode, expect app behaviour and announce menus misleadingly. The disclosure pattern (ordinary links plus buttons that show/hide) is the WAI-ARIA group's own recommendation for website nav. In addition, a classic accessibility dilemma had to be settled: what happens when a menu item has both its own page and a submenu (hover opens, but what does click do?).

## Decision

1. **Disclosure navigation, never menubar**: submenus in the nav (and future visitor-facing menu UI) are built as `<nav>` with ordinary links and real `<button>` openers with `aria-expanded`/`aria-controls`. `role="menu"`, `role="menuitem"` and roving tabindex are forbidden in website nav.
2. **An item with its own target AND a submenu is rendered as a link plus a separate arrow button** (chosen 22 July 2026): the page is always reachable by click/Enter, the arrow opens the submenu. An item without its own target is one button where the whole item is the opener. The model is called `kind: link/split/toggle` in `nav-model.js` in the engine.
3. **The interaction contract**: hover opens only for a real mouse (`pointerType === 'mouse'`, guarded by `(hover: hover) and (pointer: fine)`), click toggles, only one submenu open at a time, Escape closes and refocuses the opener, focus leaving the item closes, click outside closes everything. Natural Tab order, no focus trap.
4. **One level**: submenus cannot have submenus (grandchildren are ignored defensively in the engine, the schema does not allow them).
5. **The mobile menu is the same disclosure**: the burger is a button with `aria-expanded` that shows the same list as a column panel; the submenus become accordions. Non-modal: no scroll lock, the panel scrolls itself.

## Consequences

- Future menu work (M6 icons, footer links, mega-menu wishes) starts from the disclosure contract; nobody should «upgrade» to the menubar pattern.
- Screen readers read the nav as an ordinary link list with toggle buttons, which is the expectation on websites.
- Checkpoint in test rounds: Tab through the whole menu without getting stuck, Escape lands on the opener, and hover opening never happens on touch.
