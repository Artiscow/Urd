/**
 * The link editor (lib/LinkDialog.svelte): one dialog for every link the editor stores, opened by a link field (lib/LinkField.svelte), the quick row, the panels and the text toolbar.
 * A request names the link to start from, how the host keeps it, whether it takes pages only, and what applies the result.
 */

/**
 * The open request, or null.
 * @type {{value: object|string|null, shape?: 'link'|'address', pagesOnly?: boolean, removable?: boolean, here?: string|null, apply: (value: object|string|null) => void} | null}
 */
let linkRequest = $state.raw(null);

/** Opens the link editor; `apply` receives the link written back, or null when it is removed. */
function openLink(request) {
  linkRequest = request;
}

function closeLink() {
  linkRequest = null;
}

export const linkState = {
  get linkRequest() { return linkRequest; },
  openLink,
  closeLink,
};
