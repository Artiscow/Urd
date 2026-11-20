/**
 * The undo of one publish (api/github/revert.js, ADR-0003), worked out from that publish's own changes: each path it changed goes back to how the commit before it held it, and each path it added goes away.
 * A path the publish did not touch keeps what HEAD holds, so an Urd update, a change by hand or any other commit made since stays as it is.
 * Only paths publishing may write or delete are touched (guard.js), the files of a plugin's folder among them, and only inside the site's folder.
 * A page's copy (`<slug>/index.html`) that comes back is the root index.html HEAD holds, as publishing writes it, so a copy never points at an engine an update has since replaced.
 * Pure, node-tested (tests/revert-plan.test.mjs).
 */
import { isAllowedPath, isDeletablePath, isPluginFile, isPageIndexCopy } from './guard.js';

/**
 * A git tree's entries by path (GET git/trees/<sha>?recursive=1).
 * @param {Array<{path: string, sha: string, mode: string, type: string}>} tree
 * @returns {Map<string, {sha: string, mode: string, type: string}>}
 */
export function treeMap(tree) {
  return new Map((tree ?? []).map((entry) => [entry.path, entry]));
}

/**
 * The tree entries that undo a publish: for each path it changed (a renamed file at both its names), the blob the tree before the publish held, or a deletion where it held none.
 * A page's copy that comes back takes HEAD's root index.html instead.
 * A path whose content now is already what the undo would give, a path the guard does not let publishing write or delete, a path outside the site's folder, and anything but a plain file are left as HEAD holds them.
 * @param {Array<{filename: string, status: string, previous_filename?: string}>} files The publish's changed files, as GitHub lists a commit's
 * @param {Map<string, {sha: string, mode: string, type: string}>} before The tree before the publish, by path (repo paths)
 * @param {Map<string, {sha: string, mode: string, type: string}>} now HEAD's tree, by path
 * @param {string} [rootDir] The site's folder in the repo ('' for the repo's root)
 * @returns {{entries: Array<{path: string, mode: '100644', type: 'blob', sha: string|null}>, skipped: string[]}}
 */
export function revertEntries(files, before, now, rootDir = '') {
  const prefix = rootDir ? `${rootDir.replace(/\/+$/, '')}/` : '';
  const entries = new Map();
  const skipped = [];
  const plain = (entry) => entry?.type === 'blob' && (entry.mode === '100644' || entry.mode === '100755');
  const undo = (path) => {
    if (entries.has(path)) return;
    const own = prefix ? (path.startsWith(prefix) ? path.slice(prefix.length) : null) : path;
    if (own === null || !(isAllowedPath(own) || isDeletablePath(own) || isPluginFile(own))) {
      skipped.push(path);
      return;
    }
    const was = before.get(path);
    const is = now.get(path);
    if ((was && !plain(was)) || (is && !plain(is))) {
      skipped.push(path);
      return;
    }
    const root = now.get(`${prefix}index.html`);
    const target = was ? (isPageIndexCopy(own) && plain(root) ? root.sha : was.sha) : null;
    const current = is?.sha ?? null;
    if (target === current) return;
    entries.set(path, { path, mode: '100644', type: 'blob', sha: target });
  };
  for (const file of files ?? []) {
    if (typeof file?.filename !== 'string') continue;
    if (file.status === 'renamed' && typeof file.previous_filename === 'string') undo(file.previous_filename);
    undo(file.filename);
  }
  return { entries: [...entries.values()], skipped };
}
