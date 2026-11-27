/**
 * The test update the Updates panel shows on the local server, which has no functions: an update check's answer made from the site's own files.
 */

/** The cases the test update shows: a version update, one whose headers are changed by hand, and the headers alone at the installed version. */
export const TEST_CASES = ['update', 'byHand', 'headers'];

/** This machine's own names, which no published site is served under. */
const LOCAL_NAMES = new Set(['localhost', '127.0.0.1', '[::1]', '::1']);

/**
 * Whether the update check found no function because Urd runs locally: the local server marks its answers, and an older one is known by the name.
 * @param {number} status The check's answer status
 * @param {string|null} mark Its `X-Urd-Local` header
 * @param {string} hostname The admin's own host name
 */
export const runsLocally = (status, mark, hostname) => status === 404 && (Boolean(mark) || LOCAL_NAMES.has(String(hostname).toLowerCase()));

/** The host the test's owner added to the policy, kept by the update. */
const OWN_HOST = 'https://forms.example.org';

/** The rule of the owner's own that the by-hand case holds. */
const OWN_RULE = '  Permissions-Policy: camera=()';

/** The version after one: its last number one higher. */
export function nextVersion(engine) {
  const parts = String(engine ?? '0.0.0').split('.').map((n) => Number.parseInt(n, 10) || 0);
  parts[parts.length - 1] += 1;
  return parts.join('.');
}

/** A text with a line put under its `/*` rule, or at the end where it has none. */
function underAll(text, line) {
  const lines = text.split('\n');
  const at = lines.findIndex((l) => l.trim() === '/*');
  if (at === -1) return `${text.replace(/\n*$/, '\n')}/*\n${line}\n`;
  lines.splice(at + 1, 0, line);
  return lines.join('\n');
}

/** The file a release before had, and the one the update brings: the HTTPS rule is what the update adds. */
function twoReleases(text) {
  const hsts = /^[ \t]+Strict-Transport-Security:.*\n?/im;
  if (hsts.test(text)) return { before: text.replace(hsts, ''), after: text };
  return { before: text, after: underAll(text, '  Strict-Transport-Security: max-age=31536000') };
}

/** A file with the owner's host added to its policy's connections, or as it is where it names none. */
const withOwnHost = (text) => text.replace(/^([ \t]+Content-Security-Policy:[^\n]*?connect-src[^;\n]*)/im, `$1 ${OWN_HOST}`);

/**
 * The test update's answer for a case, made as the update check makes its own.
 * @param {string} kind One of TEST_CASES
 * @param {{engine: string, headers: string, notes: string, name: string, now?: Date}} site The site's engine version and `_headers`, and the note's words
 * @returns {object}
 */
export function testUpdate(kind, { engine, headers, notes, name, now = new Date() }) {
  const next = `v${nextVersion(engine)}`;
  const { before, after } = twoReleases(String(headers ?? ''));
  const release = { name, url: null, date: now.toISOString() };
  const base = { test: true, current: engine, head: 'test', release };
  if (kind === 'headers') {
    return { ...base, target: `v${engine}`, upToDate: true, changes: [], headers: { state: 'unedited', text: after, site: before, from: before, added: [], edit: null } };
  }
  const changes = [
    { path: `assets/engine/${nextVersion(engine)}/boot.js`, action: 'write', atom: true, conflict: null },
    { path: `assets/engine/${engine}/boot.js`, action: 'delete', atom: true, conflict: null },
    { path: 'functions/api/github/update.js', action: 'write', atom: false, conflict: null },
  ];
  const headersOf = kind === 'byHand'
    ? { state: 'edited', text: after, site: underAll(before, OWN_RULE), from: before, added: [], edit: null }
    : withOwnHost(after) === after
      ? { state: 'unedited', text: after, site: before, from: before, added: [], edit: null }
      : { state: 'added', text: withOwnHost(after), site: withOwnHost(before), from: before, added: [`connect-src ${OWN_HOST}`], edit: null };
  return { ...base, target: next, upToDate: false, changes, notes, headers: headersOf };
}
