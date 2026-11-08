/* Which tab's menu of folds stands open (shell/PanelTab.svelte): one at a time, so a menu opening on the next tab closes the one before it at once, rather than after the wait that lets a mouse leave a menu on a slant. */
export const tabMenuOpen = $state({ owner: null });
