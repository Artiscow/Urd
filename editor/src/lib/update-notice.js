/**
 * How a new Urd is told in the admin: a dot on the Updates panel's icon, word or tab, or a pill in the top bar naming the version, chosen for the site in Urd settings (`site.admin.updateNotice`) and shared by everyone who edits it.
 * The pill asks for room, so a narrow window, where the bar's first cluster has folded, falls back to the dot.
 * Pure, node-tested (tests/update-notice.test.mjs).
 */

/** The notice forms the setting offers. */
export const UPDATE_NOTICES = ['dot', 'pill'];

/**
 * The form to draw now.
 * @param {boolean} available A newer Urd is out
 * @param {string|undefined} pref `site.admin.updateNotice`; anything but `pill` is the dot
 * @param {boolean} narrow The top bar has folded its first cluster
 * @returns {'dot'|'pill'|null} null while nothing is out
 */
export function updateNoticeForm(available, pref, narrow) {
  if (!available) return null;
  return pref === 'pill' && !narrow ? 'pill' : 'dot';
}
