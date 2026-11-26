/**
 * The link editor (lib/LinkDialog.svelte): one dialog for every link the editor stores, opened by link fields, the quick row, the panels and the text toolbar.
 */

/**
 * The open request, or null.
 * @type {{value: object|string|null, shape?: 'link'|'address', pagesOnly?: boolean, removable?: boolean, upload?: boolean, here?: string|null, apply: (value: object|string|null) => void} | null}
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
