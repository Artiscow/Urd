/**
 * The element menu's choices in Urd settings (ADR-0030's parts of the menu), each list with its default first: the form the menu opens in, how its folds behave, how a look is chosen, whether every setting is shown, and what stands first in it.
 * Pure, shared by the menu's state, the settings' rows and the admin designs.
 */

/** Beside the block in two columns or one, docked in the panel column in one column or with tabs, or beside the block with tabs. */
export const MENU_FORMS = ['wide', 'narrow', 'docked', 'docked-tabs', 'tabs'];

/** As the owner left them, one open at a time in an area, or all open. */
export const FOLDS_MODES = ['left', 'one', 'all'];

/** Every setting shown, or the first and the changed ones with the rest added from a menu. */
export const EXTRA_MODES = ['shown', 'menu'];

/** How a look is chosen in the menus and the panels (lib/rows/LookChoice.svelte): a row naming the design that opens the design picker, or the designs' pictures in place. */
export const DESIGN_CHOICES = ['row', 'inline'];

/** The bar on a block and a section (the engine's preview-edit.js barForm), the default first: every group of the block's menu as a tool (the engine's bar-tools.js), every action, a word with tools that open small panels, or the block's own acts with the rest under ⋮. */
export const TOOLBAR_FORMS = ['groups', 'full', 'panels', 'short'];

/** The bar's looks (preview-edit.js barLook), the default first: glass with the main act in the accent; the accent squares, a dark strip, the tools by area, small captions, glass with a white main act, large and round; and the capsules: dark, white, glass, by area, large, and with soft square corners. */
export const TOOLBAR_LOOKS = ['glass-accent', 'squares', 'strip', 'areas', 'captions', 'glass', 'large', 'capsule', 'white', 'glass-capsule', 'capsule-areas', 'large-capsule', 'soft'];

/** The looks that set the tools apart by area, which hold only for the forms whose tools belong to areas. */
export const AREA_LOOKS = ['areas', 'capsule-areas'];
export const TOOL_FORMS = ['panels', 'groups'];

/** Whether the phone button (shown or hidden on phones) stands on a bar that otherwise leaves it to the right-click menu (every form but the full bar of actions), shown by default. */
export const TOOLBAR_PHONES = ['on', 'off'];

/** How large the bar is drawn (preview-edit.js barSize), regular by default: small, regular, medium and large. */
export const TOOLBAR_SIZES = ['regular', 'small', 'medium', 'large'];

/** Whether the gear stands on a bar whose tools open the settings themselves (the forms of TOOL_FORMS), on by default; the other forms always have it. */
export const TOOLBAR_GEARS = ['on', 'off'];

/** What the bar's design button opens (preview-edit.js openBlockDesign): a small window beside the block with every design's picture, by default, or the full window, the design picker. */
export const TOOLBAR_DESIGNS = ['small', 'full'];

/** How the list from the «+» in the element menu's head shows what a block can take (menu/CapabilityAdd.svelte): one under the other with a line on each, by default, or tiles in two columns. */
export const CAP_LISTS = ['list', 'tiles'];

/** The way to add a capability to a block (ADR-0031, menu/CapabilityAdd.svelte), the default first: a quiet line of names at the foot of each area with the cards folding (A line of names, B3), one «+» in the menu's head (B5), a chip for each at the foot of its area (B1), one add button at the foot of each area (B2), or a drawing for each in its area's heading (B4). */
export const CAP_ADD_FORMS = ['folded', 'head', 'chips', 'button', 'icons'];

/** The forms that open a list of what can be added, which «The add list» shapes. */
export const CAP_ADD_LISTS = ['head', 'button'];

/** What stands first in the element menu, the default first: the search field alone, the Pinned rows, the same rows as tiles, or chips that jump to each area. */
export const SHORTCUTS_MODES = ['search', 'pinned', 'tiles', 'chips'];
