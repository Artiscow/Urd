/**
 * What waits to be published, one part for each thing a publish would write, as the History panel's «Not published yet» lists it.
 * Pure, node-tested.
 */
import { stepKind } from './history-model.js';

/**
 * @typedef {{ kind: 'page'|'site'|'collections'|'collection'|'templates'|'plugins'|'redirects', id?: string, name?: string }} UnpublishedPart
 */

/**
 * The parts with a draft, in the order a reader looks for them: the pages, the site, the collections, then the rest.
 * @param {{
 *   pages?: Array<{ id: string, title?: string }>,
 *   pageDraft: (id: string) => boolean,
 *   site?: boolean,
 *   collectionsIndex?: boolean,
 *   collections?: Array<{ id: string, name?: string, draft: boolean }>,
 *   templates?: boolean,
 *   plugins?: boolean,
 *   redirects?: boolean,
 * }} state What has a draft: each page by its id, the site file, the list of collections and each collection, the templates, the plugins and the redirects
 * @returns {UnpublishedPart[]}
 */
export function unpublishedParts(state) {
  const parts = [];
  for (const page of state.pages ?? []) {
    if (state.pageDraft(page.id)) parts.push({ kind: 'page', id: page.id, name: page.title || page.id });
  }
  if (state.site) parts.push({ kind: 'site' });
  if (state.collectionsIndex) parts.push({ kind: 'collections' });
  for (const collection of state.collections ?? []) {
    if (collection.draft) parts.push({ kind: 'collection', id: collection.id, name: collection.name || collection.id });
  }
  if (state.templates) parts.push({ kind: 'templates' });
  if (state.plugins) parts.push({ kind: 'plugins' });
  if (state.redirects) parts.push({ kind: 'redirects' });
  return parts;
}

/** The step kinds of the site file; a page's search visibility is the site file's too. */
const SITE_KINDS = new Set(['pages', 'nav', 'footer', 'theme', 'legal', 'site']);
const siteStep = (step, name) => SITE_KINDS.has(name) || step.key === 'edit:page-noindex';

/**
 * The steps made on a part since the last publish, newest first: a page's own, the site file's, or by kind.
 * Each collection shows every collection step.
 * @param {UnpublishedPart} part
 * @param {Array<{ key: string, at: number, pageId: string|null, pages?: string[], typed: boolean }>} steps The undo steps, newest first (historyState.steps.undo)
 * @param {number} publishedAt When the last publish was made, in ms; 0 for none known
 * @returns {Array<{ key: string, at: number, pageId: string|null, typed: boolean, labelKey: string, icon: string }>}
 */
export function stepsForPart(part, steps, publishedAt = 0) {
  const out = [];
  for (const step of steps) {
    if (step.at && step.at <= publishedAt) break;
    const kind = stepKind(step.key, { typed: step.typed });
    const name = kind.labelKey.slice('history.step.'.length);
    const onPage = step.pages?.length ? step.pages.includes(part.id) : step.pageId === part.id;
    const mine = part.kind === 'page' ? kind.onPage && !siteStep(step, name) && onPage
      : part.kind === 'site' ? siteStep(step, name)
      : part.kind === 'collections' || part.kind === 'collection' ? name === 'collections'
      : name === part.kind;
    if (mine) out.push({ ...step, labelKey: kind.labelKey, icon: kind.icon });
  }
  return out;
}
