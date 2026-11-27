/**
 * How a new Urd is told in the admin: a dot on the Updates panel or a pill naming the version (`site.admin.updateNotice`); a narrow window falls back to the dot.
 */

/** The notice forms the setting offers. */
export const UPDATE_NOTICES = ['dot', 'pill'];

/**
 * The form to draw now; security headers that can be brought up to date, with no new Urd out, show the dot, as the pill names a version.
 * @param {boolean} available A newer Urd is out
 * @param {string|undefined} pref `site.admin.updateNotice`; anything but `pill` is the dot
 * @param {boolean} narrow The top bar has folded its first cluster
 * @param {boolean} [headers] The site's `_headers` can be brought up to date
 * @returns {'dot'|'pill'|null} null while nothing is out
 */
export function updateNoticeForm(available, pref, narrow, headers = false) {
  if (!available) return headers ? 'dot' : null;
  return pref === 'pill' && !narrow ? 'pill' : 'dot';
}
