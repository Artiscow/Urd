/**
 * A page's own settings (panels/pages/*): which page they are open for, each page's meta fields as the settings show them, and the writes to any page, open on the canvas or not.
 * The open page is written through its store; another page through its draft (pageState.patchPageDraft), so the settings reach every page without switching the canvas.
 */
import { ta } from '$engine/i18n.js';
import { pageTitle } from '$engine/seo.js';
import { metaOf, withMeta } from '../lib/page-settings.js';
import { historyState } from './history.svelte.js';
import { mediaState } from './media.svelte.js';
import { pageState } from './page.svelte.js';
import { previewState } from './preview.svelte.js';
import { shellState } from './shell.svelte.js';
import { siteState } from './site.svelte.js';

/** The page whose settings are open, by id; null while none is. */
let pageSettingsFor = $state(null);

/** Each page's meta fields as read for the settings, by page id (lib/page-settings.js metaOf). */
let pageMetas = $state({});

/** The registry entry of a page. */
const entryOf = (id) => siteState.siteDraft.pages.find((p) => p.id === id) ?? null;

/** The page's file as it stands: the store for the open page, the draft or the published file for another. */
async function pageDocOf(id) {
  const entry = entryOf(id);
  if (!entry) return null;
  return id === pageState.pageId ? pageState.store.data : pageState.readPageDraft(entry);
}

/** The meta fields of one page read into the settings. */
async function loadPageMeta(id) {
  const doc = await pageDocOf(id);
  if (doc) pageMetas[id] = metaOf(doc);
}

/** Every page's meta fields, for the table. */
async function loadAllPageMetas() {
  await Promise.all(siteState.siteDraft.pages.map((p) => loadPageMeta(p.id)));
}

/** The settings opened for a page, where the chosen layout shows them: the step in an open Pages panel, the table with the editing chrome shown. The page's fields are read; the table reads every page's once, as it opens. */
async function openPageSettings(id) {
  const opening = pageSettingsFor === null;
  pageSettingsFor = id;
  if (shellState.pageSettingsPref === 'step') {
    shellState.activePanel = 'pages';
    shellState.panelFolded = false;
  }
  if (shellState.pageSettingsPref === 'table') {
    if (!previewState.chromeVisible) previewState.toggleChrome();
    if (opening) await loadAllPageMetas();
    return;
  }
  await loadPageMeta(id);
}

function closePageSettings() {
  pageSettingsFor = null;
}

/** One meta field of a page written: the open page's store, else the page's draft; the settings' copy follows at once. */
async function setPageMeta(id, field, rawValue) {
  const value = String(rawValue ?? '').trim();
  const entry = entryOf(id);
  if (!entry) return;
  if (id === pageState.pageId) {
    withMeta(pageState.store.data, field, value);
    pageState.store.save();
    historyState.updateDirty();
    // The preview's tab title follows the search title.
    previewState.bridge?.sendPage(pageState.pageId, pageState.store.data);
  } else {
    await pageState.patchPageDraft(entry, (p) => withMeta(p, field, value));
  }
  pageMetas[id] = { ...(pageMetas[id] ?? metaOf(null)), [field]: value };
}

/** The sharing image of a page: compressed like other images and materialised to media/ on publish. */
async function uploadPageOgImage(id, event) {
  const file = event.target.files?.[0];
  event.target.value = '';
  if (!file) return;
  try {
    const img = await mediaState.compressOrTrim(file);
    await setPageMeta(id, 'ogImage', img.dataUrl);
  } catch (err) {
    shellState.setStatus(mediaState.imageErrorText(err), 'error');
  }
}

/** The title the browser tab and search results get for a page, from the site's format and the page's search title or name (seo.js pageTitle). */
function pageTitleOf(id) {
  const entry = entryOf(id);
  if (!entry) return '';
  const meta = pageMetas[id] ?? metaOf(null);
  return pageTitle(siteState.siteDraft, { meta: { title: entry.title, searchTitle: meta.searchTitle } }, entry);
}

/** The status line after another page became the front page. */
function frontPageStatus(entry, from) {
  shellState.setStatus(from
    ? ta('status.frontPageSet', { title: entry.title, old: from.path })
    : ta('status.frontPageSetAlone', { title: entry.title }), 'ok');
}

/** What the panels read and write through. */
export const pageSettingsState = {
  get pageSettingsFor() { return pageSettingsFor; },
  get pageMetas() { return pageMetas; },
  openPageSettings,
  closePageSettings,
  loadPageMeta,
  loadAllPageMetas,
  setPageMeta,
  uploadPageOgImage,
  pageTitleOf,
  frontPageStatus,
};
