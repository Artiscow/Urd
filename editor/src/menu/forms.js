/**
 * The element menu's and the bars' choices in Urd settings (ADR-0030), each list with its default first.
 * Shared by the menu, the settings and the admin designs.
 */

/** Beside the block in two columns or one, docked in the panel column in one column or with tabs, or beside the block with tabs. */
export const MENU_FORMS = ['wide', 'narrow', 'docked', 'docked-tabs', 'tabs'];

/** As the owner left them, one open at a time in an area, or all open. */
export const FOLDS_MODES = ['left', 'one', 'all'];

/** The first setting and the changed ones with the rest added from a menu, or every setting shown. */
export const EXTRA_MODES = ['menu', 'shown'];

/** How a look is chosen in the menus and the panels (lib/rows/LookChoice.svelte): a row that opens the design picker, or the designs' pictures in place. */
export const DESIGN_CHOICES = ['row', 'inline'];

/** The bar on a block and a section (preview-edit.js barForm): each menu group a tool, every action, tools that open small panels, or the block's acts and ⋮. */
export const TOOLBAR_FORMS = ['groups', 'full', 'panels', 'short'];

/** The bar's looks (preview-edit.js barLook), the default first. */
export const TOOLBAR_LOOKS = ['glass-accent', 'squares', 'strip', 'areas', 'captions', 'glass', 'large', 'capsule', 'white', 'glass-capsule', 'capsule-areas', 'large-capsule', 'soft'];

/** The looks that set the tools apart by area, which hold only for the forms whose tools belong to areas. */
export const AREA_LOOKS = ['areas', 'capsule-areas'];
export const TOOL_FORMS = ['panels', 'groups'];

/** Whether the phone button stands on a bar that otherwise leaves it to the right-click menu (every form but the full bar), shown by default. */
export const TOOLBAR_PHONES = ['on', 'off'];

/** Where the bars on a block and a section stand in the phone view (preview-edit.js phoneBars): on the page by default, beside the phone, or both. */
export const TOOLBAR_PHONE_PLACES = ['canvas', 'beside', 'both'];

/** How large the bar is drawn (preview-edit.js barSize), regular by default: small, regular, medium and large. */
export const TOOLBAR_SIZES = ['regular', 'small', 'medium', 'large'];

/** Whether the gear stands on a bar whose tools open the settings themselves (the forms of TOOL_FORMS), on by default; the other forms always have it. */
export const TOOLBAR_GEARS = ['on', 'off'];

/** What the bar's design button opens (preview-edit.js openBlockDesign): a small window of pictures beside the block by default, or the design picker. */
export const TOOLBAR_DESIGNS = ['small', 'full'];

/** How the list from the «+» in the element menu's head shows what a block can take (menu/CapabilityAdd.svelte): a list by default, or tiles in two columns. */
export const CAP_LISTS = ['list', 'tiles'];

/** The way to add a capability to a block (ADR-0031, menu/CapabilityAdd.svelte), the default first: «A column of names», «+» in the head, chips, buttons or icons. */
export const CAP_ADD_FORMS = ['folded', 'head', 'chips', 'button', 'icons'];

/** The forms that open a list of what can be added, which «The add list» shapes. */
export const CAP_ADD_LISTS = ['head', 'button'];

/** What stands first in the element menu, the default first: the search field alone, the Pinned rows, the same rows as tiles, or chips that jump to each area. */
export const SHORTCUTS_MODES = ['search', 'pinned', 'tiles', 'chips'];
