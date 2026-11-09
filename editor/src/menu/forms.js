/**
 * The element menu's choices in Urd settings (ADR-0030's parts of the menu), each list with its default first: the form the menu opens in, how its folds behave, whether every setting is shown, and what stands first in it.
 * Pure, shared by the menu's state, the settings' rows and the admin designs.
 */

/** Beside the block in two columns or one, docked in the panel column in one column or with tabs, or beside the block with tabs. */
export const MENU_FORMS = ['wide', 'narrow', 'docked', 'docked-tabs', 'tabs'];

/** As the owner left them, one open at a time in an area, or all open. */
export const FOLDS_MODES = ['left', 'one', 'all'];

/** Every setting shown, or the first and the changed ones with the rest added from a menu. */
export const EXTRA_MODES = ['shown', 'menu'];

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

/** The Pinned rows, the same rows as tiles, the search field alone, or chips that jump to each area. */
export const SHORTCUTS_MODES = ['pinned', 'tiles', 'search', 'chips'];
