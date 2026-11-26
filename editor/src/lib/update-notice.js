/**
 * How a new Urd is told in the admin: a dot on the Updates panel or a pill naming the version (`site.admin.updateNotice`); a narrow window falls back to the dot.
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
