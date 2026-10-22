/**
 * Publishing: the images and files materialised into media/, the commit, the deploy wait, and the discard of the draft.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { slugify, contentHash, mediaExtension } from '$engine/imageTools.js';
import { ta, taApiError } from '$engine/i18n.js';
import { liftPageFile } from '$engine/migrate.js';
import { buildThemeCss } from '$engine/theme.js';
import { resolveLink } from '$engine/nav-model.js';
import { FEED_KINDS, buildRssXml, buildSitemapXml, buildRobotsTxt } from '$engine/feeds.js';
import { createDraftStore } from '../lib/draftStore.js';
import { publishHeldFiles } from '../lib/file-links.js';
import {
  INDEX_PATH, LEGACY_INDEX_PATH, INDEX_DRAFT_KEY, LEGACY_DELETED_KEY, fetchIndex, indexPending, planIndexPublish,
} from '../lib/collection-index.js';
import { collectionsState } from './collections.svelte.js';
import { historyState } from './history.svelte.js';
import { pageState } from './page.svelte.js';
import { pluginsState } from './plugins.svelte.js';
import { previewState } from './preview.svelte.js';
import { shellState } from './shell.svelte.js';
import { siteState } from './site.svelte.js';
import { templatesState } from './templates.svelte.js';
import { updaterState } from './updater.svelte.js';

/**
 * Turns unpublished images (data URLs in the draft) into files in
 * media/, and switches src to the path. Returns the file list for the
 * commit. The same image content yields the same file name
 * (deterministic hash), so republishing never duplicates files.
 */
/** Turns a data URL in obj[field] into a media file; mutates obj.
 *  Images and audio share the flow; mediaExtension picks the extension. */
function materializeField(obj, field, name, files) {
  const src = obj?.[field];
  if (!src?.startsWith('data:image/') && !src?.startsWith('data:audio/') && !src?.startsWith('data:video/')) return;
  const base64 = src.split(',', 2)[1];
  const path = `media/${slugify(name || 'image')}-${contentHash(base64)}.${mediaExtension(src)}`;
  files.push({ path, content: base64, encoding: 'base64' });
  obj[field] = `/${path}`;
}

/** One collection entry's images: the main image + the product colors' images (kind products); and a PDF its link goes to. */
function materializeEntryImages(entry, files) {
  materializeField(entry, 'image', entry.title, files);
  for (const color of entry.colors ?? []) materializeField(color, 'image', `${entry.title}-${color.name}`, files);
  publishHeldFiles(entry, files);
}

/** The background layers' images (image and slideshow) - shared by section, nav and footer. */
function materializeBackground(background, files) {
  for (const layer of background?.layers ?? []) {
    if (layer.type === 'image') materializeField(layer.props, 'src', 'background', files);
    if (layer.type === 'slideshow') {
      for (const img of layer.props.images ?? []) materializeField(img, 'src', 'background', files);
    }
    if (layer.type === 'video') {
      materializeField(layer.props, 'src', 'video', files);
      materializeField(layer.props, 'poster', 'plakat', files);
    }
  }
}

/** One block's images, and the PDFs its links go to - shared by page publishing and block-group templates. */
function materializeBlockImages(block, files) {
  publishHeldFiles(block.props, files);
  if (block.type === 'image') materializeField(block.props, 'src', block.props.alt, files);
  // The icon block's own uploaded icon is published as a media file the same way.
  if (block.type === 'icon') materializeField(block.props, 'image', 'ikon', files);
  if (block.type === 'gallery') {
    for (const img of block.props.images ?? []) materializeField(img, 'src', img.alt || 'gallery', files);
  }
  if (block.type === 'audio') materializeField(block.props, 'src', block.props.title || 'lyd', files);
  // The video block's own film and its poster (source 'file').
  if (block.type === 'video') {
    materializeField(block.props, 'src', block.props.title || 'video', files);
    materializeField(block.props, 'poster', 'poster', files);
  }
}

/** One section's images (background + blocks) - shared by page publishing and section templates. */
function materializeSection(section, files) {
  // Background images follow the same flow as image blocks.
  materializeBackground(section.background, files);
  for (const block of section.blocks) materializeBlockImages(block, files);
}

function materializeImages(page) {
  const files = [];
  // The sharing image (meta.og.image) is materialized like the block images.
  if (page.meta?.og) materializeField(page.meta.og, 'image', 'share', files);
  for (const section of page.sections) materializeSection(section, files);
  return files;
}

/** Logo uploads in the site draft (nav.logo) are materialized the same way. */
function materializeSiteImages(site) {
  const files = [];
  const logo = site.nav?.logo;
  if (logo?.type === 'image') materializeField(logo, 'value', 'logo', files);
  if (logo?.type === 'both') materializeField(logo, 'image', 'logo', files);
  // The legacy single nav background image (back compat) + the layered
  // backgrounds on nav and footer.
  if (site.nav?.style) materializeField(site.nav.style, 'image', 'menu', files);
  materializeBackground(site.nav?.style?.background, files);
  materializeBackground(site.footer?.background, files);
  if (site.footer?.brand) materializeField(site.footer.brand, 'logo', 'footer-logo', files);
  // The site's links' own icons.
  for (const link of Array.isArray(site.site?.links) ? site.site.links : []) materializeField(link, 'image', 'link-icon', files);
  // The launcher's own mark on the button, and one per shortcut.
  if (site.nav?.launcher) {
    materializeField(site.nav.launcher, 'image', 'snarvei', files);
    for (const link of site.nav.launcher.links ?? []) materializeField(link, 'image', 'snarvei', files);
  }
  materializeField(site.site, 'icon', 'ikon', files);
  // The PDFs the menu's, the footer's and the site's links go to.
  publishHeldFiles(site, files);
  return files;
}

// "Discard draft" requires two clicks on TWO different surfaces: the
// first click arms the button, and the confirmation is its own floating
// pill below the top bar. The button keeps its width when armed. A click
// anywhere else, Escape or focus into the preview disarms.
let discardArmed = $state(false);

let discardWrapEl = $state(null);

function requestDiscard() {
  discardArmed = !discardArmed;
}

function confirmDiscard() {
  discardArmed = false;
  try {
    discard();
    shellState.setStatus(ta('ui.discarded'), 'info');
  } catch (err) {
    // A failed discard must never pass silently: the drafts may be half
    // reset, and the owner needs to know that a reload is the way out.
    console.error('Urd: discard failed', err);
    shellState.setStatus(String(err?.message ?? err), 'error');
  }
}

function discard() {
  historyState.pushHistory('discard');
  for (const p of siteState.siteDraft.pages) {
    if (p.id !== pageState.pageId && !pageState.pendingPublished.has(p.id)) localStorage.removeItem(`urd-draft-${p.id}`);
  }
  const freshPage = pageState.store.reset();
  siteState.siteStore.reset();
  if (pluginsState.pluginsStore) {
    pluginsState.pluginsStore.reset();
    pluginsState.syncPluginsView();
  }
  if (collectionsState.collectionsIndexStore) {
    collectionsState.collectionsIndexStore.reset();
    collectionsState.collectionIds = [...(collectionsState.collectionsIndexStore.data.samlinger ?? [])];
    for (const id of Object.keys(collectionsState.collectionStores)) {
      if (collectionsState.collectionIds.includes(id)) collectionsState.collectionStores[id].reset();
      else delete collectionsState.collectionStores[id];
    }
    collectionsState.syncCollectionsView();
  }
  if (templatesState.templatesIndexStore) {
    templatesState.templatesIndexStore.reset();
    templatesState.templateIds = [...(templatesState.templatesIndexStore.data.maler ?? [])];
    // Never-published templates (does-not-exist baseline) vanish with the
    // draft; published ones return to the published state.
    for (const id of Object.keys(templatesState.templateStores)) {
      if (templatesState.templateIds.includes(id)) templatesState.templateStores[id].reset();
      else { localStorage.removeItem(`urd-draft-template-${id}`);
      localStorage.removeItem(`urd-draft-mal-${id}`); delete templatesState.templateStores[id]; }
    }
    templatesState.pushTemplatesToPreview();
  }
  siteState.linkSiteDraft();
  siteState.grid = { snap: true, ...siteState.siteDraft.grid };
  historyState.updateDirty();
  shellState.status = '';
  siteState.pushSiteToPreview();
  // Discarding can remove the page you are on (an unpublished new page).
  if (!siteState.siteDraft.pages.some((p) => p.id === pageState.pageId)) {
    pageState.selectPage(siteState.siteDraft.pages[0].id);
  } else {
    previewState.bridge?.sendPage(pageState.pageId, freshPage);
  }
}

async function publish() {
  if (updaterState.revertedSinceLoad) {
    shellState.setStatus(ta('status.revertReloadBeforePublish'), 'error');
    return;
  }
  if (updaterState.updateBusy) {
    // Publishing writes slug copies from the SERVED root index; in the
    // deploy window after an engine update it still points to the
    // deleted engine directory, and the copies would break all the
    // subpages (ADR-0013).
    shellState.setStatus(ta('update.publishBlocked'), 'error');
    return;
  }
  shellState.setStatus(ta('status.publishing'));
  const files = [];
  const publishedTitles = [];
  const draftKeys = [];
  const newPageIds = [];

  // ALL pages with drafts are published, not just the current one.
  for (const entry of siteState.siteDraft.pages) {
    const key = `urd-draft-${entry.id}`;
    const isNew = pageState.pendingPublished.has(entry.id) || !siteState.site.pages.some((p) => p.id === entry.id);
    let page = null;
    if (entry.id === pageState.pageId && (pageState.store.hasDraft() || isNew)) {
      page = pageState.store.data;
    } else if (entry.id !== pageState.pageId) {
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          page = liftPageFile(JSON.parse(raw), siteState.siteStore.data);
        } catch { /* a corrupt draft is skipped */ }
      }
    }
    // A new page must NEVER be published without a page file (visitors
    // would get a dead address): if the draft is missing, a blank page
    // is published.
    if (!page && isNew) page = pageState.blankPage(entry);
    if (!page) continue;
    // Clone before materializing: the drafts in memory are untouched
    // until the commit actually succeeds (an aborted publish must never
    // leave image references to files that do not exist).
    const out = JSON.parse(JSON.stringify(page));
    // Unpublished images become their own files in media/ in the same commit.
    files.push(...materializeImages(out));
    files.push({ path: entry.file, content: JSON.stringify(out, null, 2) + '\n', encoding: 'utf-8' });
    publishedTitles.push(entry.title);
    // New pages do not exist on the server until the deploy finishes:
    // the draft is kept as the source until then, and cleaned up
    // automatically on the next visit.
    if (isNew) newPageIds.push(entry.id);
    else draftKeys.push(key);
  }

  if (siteState.siteStore.hasDraft()) {
    // Clone here too: logo uploads are materialized without touching the
    // draft in memory until the commit is safely in.
    const siteOut = JSON.parse(JSON.stringify(siteState.siteDraft));
    files.push(...materializeSiteImages(siteOut));
    files.push({ path: 'content/site.json', content: JSON.stringify(siteOut, null, 2) + '\n', encoding: 'utf-8' });
    // Materialize the theme as render-blocking light-dark() CSS
    // (FOUC-free first paint). One file covers all pages; the index.html
    // copies link to it.
    files.push({ path: 'content/theme.css', content: buildThemeCss(siteOut.theme), encoding: 'utf-8' });
    draftKeys.push('urd-draft-site');
    // Name WHAT in the site setup changed (for the history).
    const eq = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
    if (!eq(siteState.site.theme, siteState.siteDraft.theme)) publishedTitles.push(ta('publish.part.theme'));
    if (!eq(siteState.site.nav, siteState.siteDraft.nav)) publishedTitles.push(ta('publish.part.nav'));
    if (!eq(siteState.site.footer, siteState.siteDraft.footer)) publishedTitles.push(ta('publish.part.footer'));
    if (!eq(siteState.site.pages, siteState.siteDraft.pages)) publishedTitles.push(ta('publish.part.pages'));
    if (!eq(siteState.site.grid, siteState.siteDraft.grid)) publishedTitles.push(ta('publish.part.grid'));
    if ((siteState.site.site.icon ?? null) !== (siteState.siteDraft.site.icon ?? null)) publishedTitles.push(ta('publish.part.icon'));
    const { icon: a, ...restA } = siteState.site.site;
    const { icon: b, ...restB } = siteState.siteDraft.site;
    if (!eq(restA, restB)) publishedTitles.push(ta('publish.part.siteInfo'));
  }

  // Collections: changed files, the index file and deletions (diff against the published index); a legacy index file with nothing of its own is deleted with any publish.
  const changedCollections = Object.entries(collectionsState.collectionStores).filter(([, st]) => st.hasDraft());
  if (changedCollections.length || indexPending(collectionsState.collectionsIndexStore?.hasDraft() ?? false, collectionsState.legacyIndexIds) || collectionsState.legacyIndexIds !== null) {
    for (const [id, st] of changedCollections) {
      const out = JSON.parse(JSON.stringify(st.data));
      for (const entry of out.entries) materializeEntryImages(entry, files);
      files.push({ path: `content/samlinger/${id}.json`, content: JSON.stringify(out, null, 2) + '\n', encoding: 'utf-8' });
      // Dated collections get an RSS feed in the same publish (the SEO
      // package): the entries as plain text, the addresses from the
      // origin the admin runs on.
      if (FEED_KINDS.includes(out.kind)) {
        files.push({
          path: `content/samlinger/${id}.xml`,
          content: buildRssXml({
            title: out.name ?? id,
            origin: location.origin,
            path: `/content/samlinger/${id}.xml`,
            // An entry's link as the page draws it (resolveLink): a page, a spot on it or an address; one that goes nowhere gives the feed's own link.
            items: out.entries.map((e) => {
              // A spot without a page belongs to the page the block stands on, which a feed does not know: such an entry links the feed's own address.
              const link = e.page || e.href ? resolveLink(e, siteState.siteDraft.pages ?? []) : null;
              return { id: e.id, title: collectionsState.plainTitle(e.title), text: collectionsState.plainTitle(e.text), date: e.date, href: link && !link.missing ? link.href : undefined };
            }),
          }),
          encoding: 'utf-8',
        });
      }
      draftKeys.push(`urd-draft-collection-${id}`, `urd-draft-samling-${id}`);
    }
    const plan = planIndexPublish({
      ids: collectionsState.collectionIds,
      hasDraft: collectionsState.collectionsIndexStore?.hasDraft() ?? false,
      published: (await fetchIndex(INDEX_PATH))?.samlinger ?? null,
      legacy: collectionsState.legacyIndexIds,
    });
    if (plan.writeIndex) {
      files.push({ path: INDEX_PATH, content: JSON.stringify(collectionsState.collectionsIndexStore.data, null, 2) + '\n', encoding: 'utf-8' });
      draftKeys.push(INDEX_DRAFT_KEY);
    }
    // Collections removed from the index are deleted from the repo; one also created in the same publish keeps the create.
    const created = new Set(files.map((f) => f.path));
    for (const id of plan.deleteIds) {
      const path = `content/samlinger/${id}.json`;
      if (!created.has(path)) files.push({ path, delete: true });
    }
    if (plan.deleteLegacy) files.push({ path: LEGACY_INDEX_PATH, delete: true });
    if (changedCollections.length || plan.writeIndex || plan.deleteIds.length) publishedTitles.push(ta('publish.part.collections'));
  }

  // Template changes are published as content/maler/ files + index, the
  // same pattern as collections; images in the template are materialized
  // to media/.
  const changedTemplates = Object.entries(templatesState.templateStores).filter(([, st]) => st.hasDraft());
  if (changedTemplates.length || templatesState.templatesIndexStore?.hasDraft()) {
    for (const [id, st] of changedTemplates) {
      const out = JSON.parse(JSON.stringify(st.data));
      if (out.section) materializeSection(out.section, files);
      for (const block of out.blocks ?? []) materializeBlockImages(block, files);
      for (const section of out.page?.sections ?? []) materializeSection(section, files);
      files.push({ path: `content/maler/${id}.json`, content: JSON.stringify(out, null, 2) + '\n', encoding: 'utf-8' });
      draftKeys.push(`urd-draft-template-${id}`, `urd-draft-mal-${id}`);
    }
    if (templatesState.templatesIndexStore?.hasDraft()) {
      files.push({ path: 'content/maler.json', content: JSON.stringify(templatesState.templatesIndexStore.data, null, 2) + '\n', encoding: 'utf-8' });
      draftKeys.push('urd-draft-templates', 'urd-draft-maler');
      // Templates removed from the index are deleted from the repo (if
      // the id is also created in the same publish, the create list wins).
      let publishedIndex = { maler: [] };
      try {
        publishedIndex = await (await fetch('/content/maler.json')).json();
      } catch { /* no published index yet */ }
      const created = new Set(files.map((f) => f.path));
      for (const id of publishedIndex.maler ?? []) {
        const path = `content/maler/${id}.json`;
        if (!templatesState.templateIds.includes(id) && !created.has(path)) files.push({ path, delete: true });
      }
    }
    publishedTitles.push(ta('publish.part.templates'));
  }

  // Plugin changes (enabled/disabled/added) are published as plugins.json, and a removed plugin's folder is deleted in the same commit.
  if (pluginsState.pluginsStore?.hasDraft()) {
    const { remove = [], ...index } = $state.snapshot(pluginsState.pluginsStore.data);
    files.push({ path: 'plugins/plugins.json', content: JSON.stringify(index, null, 2) + '\n', encoding: 'utf-8' });
    // A folder name the guard would refuse is left out, so it never stops the rest of the publish.
    for (const id of remove) if (/^[a-z0-9][a-z0-9-]*$/.test(id)) files.push({ path: `plugins/${id}`, delete: true });
    draftKeys.push('urd-draft-plugins');
    publishedTitles.push(ta('publish.part.plugins'));
  }

  // Page routing on all static hosts: every page except the front page
  // gets its own <path>/index.html (a copy of the root index.html; the
  // engine routes on pathname). Generated on every publish - unchanged
  // copies yield identical blobs and thus no diff in the commit.
  try {
    const html = await (await fetch('/index.html')).text();
    for (const p of siteState.siteDraft.pages) {
      if (p.path !== '/') {
        files.push({ path: `${p.path.slice(1)}/index.html`, content: html, encoding: 'utf-8' });
      }
    }
  } catch { /* without the index copies the site still works on SPA hosts */ }

  // The visibility files (the SEO package): sitemap and robots are
  // regenerated on every publish from the origin the admin runs on -
  // unchanged content yields identical blobs and no diff, like the
  // index copies.
  files.push({ path: 'sitemap.xml', content: buildSitemapXml(siteState.siteDraft.pages, location.origin), encoding: 'utf-8' });
  files.push({ path: 'robots.txt', content: buildRobotsTxt(location.origin), encoding: 'utf-8' });

  // Deleted and moved pages: diff against the published site.json. The
  // server silently skips paths already gone from the repo. A path ALSO
  // created in the same commit (two pages swapping addresses) must not
  // be deleted: the last entry with the same path wins in the Git tree,
  // so such a deletion would remove the new copy.
  const created = new Set(files.map((f) => f.path));
  const del = (path) => { if (!created.has(path)) files.push({ path, delete: true }); };
  for (const p of siteState.site.pages) {
    const still = siteState.siteDraft.pages.find((q) => q.id === p.id);
    if (!still) {
      del(p.file);
      if (p.path !== '/') del(`${p.path.slice(1)}/index.html`);
    } else if (still.path !== p.path && p.path !== '/') {
      del(`${p.path.slice(1)}/index.html`);
    }
  }

  // Conflict warning: if someone else has published since we loaded and
  // we touch the same files, the editor must actively choose to publish anyway.
  const conflict = await updaterState.confirmNoConflict(files);
  if (!conflict.ok) {
    shellState.setStatus(ta('status.publishAborted'), 'error');
    return;
  }

  const body = {
    message: ta('publish.commitMessage', { titles: publishedTitles.join(', ') || ta('publish.theSite') }),
    // A file named by its content (a PDF a page and the footer both link to) may be gathered from several drafts: it is sent once, the last copy as git would keep it.
    files: [...new Map(files.map((file) => [file.path, file])).values()],
    // The HEAD the conflict check saw: the server rejects with 409 if
    // someone manages to publish inside the commit window itself.
    ...(conflict.head ? { expect: conflict.head } : {}),
  };
  let res = null;
  try {
    res = await fetch('/api/github/commit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch { /* network errors are handled below */ }

  if (res?.ok) {
    // New HEAD = our commit: the conflict baseline moves forward.
    const { sha } = await res.json().catch(() => ({}));
    if (sha) updaterState.baseSha = sha;
    else updaterState.refreshBaseSha();
    // Mirror the materialization into memory now that the commit is
    // safely in (the same deterministic paths the clones got).
    materializeImages(pageState.store.data);
    materializeSiteImages(siteState.siteDraft);
    // The drafts ARE now the published state; keep the data in memory
    // (the server serves old JSON until the deploy finishes) and remove
    // only the markers.
    for (const key of draftKeys) localStorage.removeItem(key);
    for (const id of newPageIds) pageState.pendingPublished.add(id);
    // Published baseline = the draft: rebuild the store baselines, so
    // "Discard draft" never rolls back past this publish.
    siteState.site = JSON.parse(JSON.stringify(siteState.siteDraft));
    siteState.siteStore = createDraftStore('urd-draft-site', () => siteState.site, shellState.draftSaveError);
    siteState.linkSiteDraft();
    if (pluginsState.pluginsStore) {
      // The published index: the removals are done, and are not carried into the next draft.
      const { remove: _done, ...publishedPlugins } = JSON.parse(JSON.stringify(pluginsState.pluginsStore.data));
      pluginsState.pluginsStore = createDraftStore('urd-draft-plugins', () => publishedPlugins, shellState.draftSaveError);
      pluginsState.syncPluginsView();
    }
    if (collectionsState.collectionsIndexStore) {
      // Mirror the materialization into memory (the same deterministic paths the clones got).
      for (const st of Object.values(collectionsState.collectionStores)) {
        for (const entry of st.data.entries) materializeEntryImages(entry, []);
      }
      const publishedIndex = JSON.parse(JSON.stringify(collectionsState.collectionsIndexStore.data));
      collectionsState.collectionsIndexStore = createDraftStore(INDEX_DRAFT_KEY, () => publishedIndex, shellState.draftSaveError);
      if (files.some((f) => f.path === LEGACY_INDEX_PATH)) {
        collectionsState.legacyIndexIds = null;
        try { localStorage.setItem(LEGACY_DELETED_KEY, '1'); } catch { /* without the marker, a reload before the deploy merges the legacy index again */ }
      }
      collectionsState.publishedCollections = {};
      for (const id of collectionsState.collectionIds) {
        if (!collectionsState.collectionStores[id]) continue;
        const publishedCollection = JSON.parse(JSON.stringify(collectionsState.collectionStores[id].data));
        collectionsState.publishedCollections[id] = publishedCollection;
        collectionsState.collectionStores[id] = createDraftStore(`urd-draft-collection-${id}`, () => publishedCollection, shellState.draftSaveError, `urd-draft-samling-${id}`);
      }
      collectionsState.syncCollectionsView();
    }
    if (templatesState.templatesIndexStore) {
      // Mirror the materialization into memory (the same deterministic paths the clones got).
      for (const st of Object.values(templatesState.templateStores)) {
        if (st.data?.section) materializeSection(st.data.section, []);
        for (const block of st.data?.blocks ?? []) materializeBlockImages(block, []);
        for (const section of st.data?.page?.sections ?? []) materializeSection(section, []);
      }
      const publishedTemplateIndex = JSON.parse(JSON.stringify(templatesState.templatesIndexStore.data));
      templatesState.templatesIndexStore = createDraftStore('urd-draft-templates', () => publishedTemplateIndex, shellState.draftSaveError, 'urd-draft-maler');
      templatesState.publishedTemplates = {};
      for (const id of templatesState.templateIds) {
        if (!templatesState.templateStores[id]) continue;
        const publishedTemplate = JSON.parse(JSON.stringify(templatesState.templateStores[id].data));
        templatesState.publishedTemplates[id] = publishedTemplate;
        templatesState.templateStores[id] = createDraftStore(`urd-draft-template-${id}`, () => publishedTemplate, shellState.draftSaveError, `urd-draft-mal-${id}`);
      }
      templatesState.pushTemplatesToPreview();
    }
    siteState.grid = { snap: true, ...siteState.siteDraft.grid };
    const pageSnap = JSON.parse(JSON.stringify(pageState.store.data));
    pageState.store = createDraftStore(`urd-draft-${pageState.pageId}`, () => pageSnap, shellState.draftSaveError);
    if (pageState.pendingPublished.has(pageState.pageId)) {
      // New page: the draft is the source until the deploy finishes - keep it.
      shellState.writeDraftKey(`urd-draft-${pageState.pageId}`, JSON.stringify(pageSnap));
    }
    historyState.updateDirty();
    // The wait keeps the message up (info never auto-clears) until the
    // site serves the commit or the wait gives up.
    shellState.setStatus(ta('status.published'), 'info');
    updaterState.awaitPublishDeploy(files);
  } else if (res?.status === 401) {
    const data = await res.json().catch(() => null);
    shellState.setStatus(data?.code === 'loginExpired'
      ? ta('status.loginExpired')
      : ta('status.loginRequired', { reason: taApiError(data) ?? ta('status.unknownReason') }), 'error');
    await shellState.checkAuth();
  } else if (res?.status === 403) {
    shellState.setStatus(taApiError(await res.json().catch(() => null)) ?? ta('status.noPublishAccess'), 'error');
  } else if (res?.status === 409) {
    // Someone published inside the commit window itself: the drafts are
    // untouched, and baseSha stands still, so a retry runs the conflict
    // check again and picks up the fresh changes.
    shellState.setStatus(ta('status.publishRace'), 'error');
  } else if (res) {
    shellState.setStatus(taApiError(await res.json().catch(() => null))
      ?? ta('status.publishFailed'), 'error');
  } else {
    shellState.setStatus(ta('status.publishUnavailable'), 'error');
  }
}

/** The effects of this module, run once by the shell at its start. */
export function effects() {

  $effect(() => {
    if (!discardArmed) return;
    // `contains` against the bound shell covers both the button and the
    // pill, also when the hit lands on an SVG node inside them. Same
    // pattern as the settings and the tool menus.
    // The confirmation is taken here, in the capture phase on window,
    // and not left to the pill's own delegated handler: the click then
    // counts whatever else runs on the way down to the pill.
    const disarm = (e) => {
      if (!discardWrapEl?.contains(e.target)) { discardArmed = false; return; }
      if (e.target instanceof Element && e.target.closest('.discard-confirm')) {
        e.preventDefault();
        e.stopPropagation();
        confirmDiscard();
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') discardArmed = false;
    };
    // A click in the preview (the iframe) never reaches this document, but
    // moves focus out of the window - window blur covers that. A blur that
    // arrives while the pointer is held down on the button or the pill is
    // not that click: it would unmount the pill under the pointer before
    // its own click lands, so it is ignored until the pointer is released.
    let held = false;
    const onDown = (e) => { held = !!discardWrapEl?.contains(e.target); };
    const onUp = () => { held = false; };
    const onBlur = () => { if (!held) discardArmed = false; };
    // Outside clicks disarm on click: the confirmation pill is then
    // unmounted only after the click it may have targeted has landed.
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('pointerup', onUp, true);
    window.addEventListener('click', disarm, true);
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('pointerup', onUp, true);
      window.removeEventListener('click', disarm, true);
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('blur', onBlur);
    };
  });
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const publishState = {
  materializeField,
  materializeEntryImages,
  materializeBackground,
  materializeBlockImages,
  materializeSection,
  materializeImages,
  materializeSiteImages,
  get discardArmed() { return discardArmed; },
  set discardArmed(v) { discardArmed = v; },
  get discardWrapEl() { return discardWrapEl; },
  set discardWrapEl(v) { discardWrapEl = v; },
  requestDiscard,
  confirmDiscard,
  discard,
  publish,
  effects,
};
