/**
 * How long ago something happened, in the admin's language: minutes under an hour, hours under a day, else days («2 min ago», «3 hr ago», «yesterday», «5 days ago»).
 * Under a minute gives '', and the caller says «now» in its own words.
 * Pure, node-tested (tests/time-ago.test.mjs).
 * @param {number} at The moment, in ms
 * @param {string} lang The admin language; a code Intl rejects falls back to the browser's own
 * @param {number} [now]
 * @returns {string}
 */
export function timeAgo(at, lang, now = Date.now()) {
  const seconds = Math.round((now - (at || now)) / 1000);
  if (seconds < 60) return '';
  let format;
  try {
    format = new Intl.RelativeTimeFormat(lang, { style: 'narrow', numeric: 'auto' });
  } catch {
    format = new Intl.RelativeTimeFormat(undefined, { style: 'narrow', numeric: 'auto' });
  }
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return format.format(-minutes, 'minute');
  const hours = Math.round(minutes / 60);
  if (hours < 24) return format.format(-hours, 'hour');
  return format.format(-Math.round(hours / 24), 'day');
}
