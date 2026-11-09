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

/** The Pinned rows, the same rows as tiles, the search field alone, or chips that jump to each area. */
export const SHORTCUTS_MODES = ['pinned', 'tiles', 'search', 'chips'];
