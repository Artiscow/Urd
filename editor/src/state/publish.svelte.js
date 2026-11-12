/**
 * Publishing: the images and files materialised into media/ (lib/materialize.js), the commit, the deploy wait, and the discard of the draft.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { ta, taApiError } from '$engine/i18n.js';
import { liftPageFile } from '$engine/migrate.js';
import { buildThemeCss } from '$engine/theme.js';
import { resolveLink } from '$engine/nav-model.js';
import { FEED_KINDS, buildRssXml, buildSitemapXml, buildRobotsTxt } from '$engine/feeds.js';
import { createDraftStore } from '../lib/draftStore.js';
import { materializeField, materializeImages, materializeSiteImages, materializeEntryImages, materializeBackground, materializeSection, materializeBlockImages } from '../lib/materialize.js';
import { tidyMedia as planTidy, rootMediaFiles, tidyRoom } from '../lib/media-tidy.js';
import {
  INDEX_PATH, LEGACY_INDEX_PATH, INDEX_DRAFT_KEY, LEGACY_DELETED_KEY, fetchIndex, indexPending, planIndexPublish,
} from '../lib/collection-index.js';
import { collectionsState } from './collections.svelte.js';
import { historyState } from './history.svelte.js';
import { savedState } from './saved.svelte.js';
import { partName } from '../lib/saved-model.js';
import { pickParts, outSite, keptNotLive } from '../lib/publish-pick.js';
import { readNotLive, stillNotLive, writeNotLive } from '../lib/not-live.js';
import { draftsState } from './drafts.svelte.js';
import { pageState } from './page.svelte.js';
import { pluginsState } from './plugins.svelte.js';
import { previewState } from './preview.svelte.js';
import { shellState } from './shell.svelte.js';
import { siteState } from './site.svelte.js';
import { refusedPageFieldLine } from '../lib/page-settings.js';
import { toHostFile, redirectIssues } from '../lib/redirects-model.js';
import { templatesState } from './templates.svelte.js';
import { redirectsState } from './redirects.svelte.js';
import { updaterState } from './updater.svelte.js';
import { pageFills } from '../lib/fill-in.js';
import { hasSellerDetails } from '../lib/site-seed.js';

/**
 * The tidy of media/ (lib/media-tidy.js): the files at the root of media/ move into the folder of their kind, and the references follow.
 * The listing comes from the publishing layer (/api/github/media); the rewritten documents go into the drafts and the moves ride on the next publish, which commits, adopts and waits for the deploy as it always does.
 */
let mediaFiles = $state(null);

let mediaBusy = $state(false);

/** The moves the next publish carries (the commit's `from` entries), kept with the drafts until that publish is in or the drafts are discarded, so a reload between the tidy and its publish never leaves the rewritten documents without their moves. */
const MOVES_KEY = 'urd-draft-media-moves';

let pendingMoves = $state.raw(readMoves());

function readMoves() {
  try {
    const list = JSON.parse(localStorage.getItem(MOVES_KEY) ?? '[]');
    return Array.isArray(list) ? list.filter((m) => typeof m?.from === 'string' && typeof m?.to === 'string') : [];
  } catch {
    return [];
  }
}

function setMoves(list) {
  pendingMoves = list;
  try {
    if (list.length) localStorage.setItem(MOVES_KEY, JSON.stringify(list));
    else localStorage.removeItem(MOVES_KEY);
  } catch { /* blocked storage: the moves last the session */ }
}

/** How many files stand at the root of media/, by the listing; null before it is read. */
const mediaRootCount = $derived(mediaFiles ? rootMediaFiles(mediaFiles).length : null);

/** Whether the listing GitHub gave was cut short (a repository with more files than the tree call lists), which a tidy cannot work from. */
let mediaTruncated = false;

/** Reads the files media/ holds from the publishing layer; locally, where there is none, the count stays unknown. */
async function loadMediaFiles() {
  try {
    const res = await fetch('/api/github/media', { cache: 'no-store' });
    const data = await res.json().catch(() => null);
    if (res.ok && Array.isArray(data?.files)) {
      mediaFiles = data.files;
      mediaTruncated = data.truncated === true;
    } else if (res.status === 404 && data === null) {
      // A plain 404 is a server without the publishing layer (the local one): the count stays unknown, with no word about it.
    } else {
      shellState.setStatus(taApiError(data) ?? ta('media.listFailed'), 'error');
    }
  } catch {
    shellState.setStatus(ta('status.publishLayerUnreachable'), 'error');
  }
}

/** The tidy: the plan from the documents as they stand and the listing, the changed documents written into the drafts, and the moves given to a publish. With changes waiting it runs only where `withChanges` asks for them to be published first (the panel's second press), and only once that publish has gone through, so its own publish carries the moves and the paths it rewrites alone. The button stands busy from the press to the publish's answer. */
async function tidyMedia({ withChanges = false } = {}) {
  if ((historyState.dirty && !withChanges) || mediaBusy) return;
  // The collections' links to the files are rewritten with the move; until every collection has been read, the files stay where they are.
  if (!collectionsState.collectionsReady) {
    shellState.setStatus(ta('media.tidyCollections'), 'error');
    return;
  }
  mediaBusy = true;
  try {
    if (historyState.dirty) {
      await publish();
      // A publish that did not go through has said why, and the tidy waits.
      if (historyState.dirty) return;
    }
    await loadMediaFiles();
    if (!mediaFiles) return;
    if (mediaTruncated) {
      shellState.setStatus(ta('media.listTruncated'), 'error');
      return;
    }
    // The other pages are read first and the open page taken last, so an edit made while they are read is in it.
    const read = new Map();
    for (const entry of siteState.siteDraft.pages) {
      if (entry.id !== pageState.pageId) read.set(entry.id, await pageState.readPageDraft(entry));
    }
    const pages = siteState.siteDraft.pages.map((entry) => [entry.id, entry.id === pageState.pageId ? $state.snapshot(pageState.store.data) : read.get(entry.id)]);
    const docs = {
      site: $state.snapshot(siteState.siteDraft),
      pages,
      collections: Object.entries(collectionsState.collectionStores).map(([id, st]) => [id, $state.snapshot(st.data)]),
      templates: Object.entries(templatesState.templateStores).map(([id, st]) => [id, $state.snapshot(st.data)]),
    };
    // The room the commit has for moves beside the documents and the page copies it carries.
    const room = tidyRoom({ pages: pages.length, collections: docs.collections.length, templates: docs.templates.length });
    if (!room) {
      shellState.setStatus(ta('media.tidyNoRoom'), 'error');
      return;
    }
    const plan = planTidy(docs, mediaFiles, { room });
    if (!plan.moves.length) {
      shellState.setStatus(ta('media.tidyNothing'));
      return;
    }
    // The changed documents into the drafts, which the publish below picks up. A tidy is not undone: the undo list starts anew, since every step before it holds the paths it changes.
    historyState.startAnew();
    if (plan.site) {
      siteState.siteStore.replace(plan.site);
      siteState.siteStore.save();
      siteState.linkSiteDraft();
    }
    for (const [id, doc] of plan.pages) {
      if (id === pageState.pageId) {
        pageState.store.replace(doc);
        pageState.store.save();
      } else {
        shellState.writeDraftKey(`urd-draft-${id}`, JSON.stringify(doc));
      }
    }
    for (const [id, doc] of plan.collections) {
      collectionsState.collectionStores[id]?.replace(doc);
      collectionsState.collectionStores[id]?.save();
    }
    for (const [id, doc] of plan.templates) {
      templatesState.templateStores[id]?.replace(doc);
      templatesState.templateStores[id]?.save();
    }
    if (plan.collections.length) collectionsState.syncCollectionsView();
    if (plan.templates.length) templatesState.pushTemplatesToPreview();
    historyState.updateDirty();
    setMoves(plan.moves);
    await publish();
    if (!pendingMoves.length) {
      shellState.setStatus(plan.remaining ? ta('media.tidyMore', { n: String(plan.moves.length), left: String(plan.remaining) }) : ta('media.tidyDone', { n: String(plan.moves.length) }), 'ok');
      mediaFiles = mediaFiles.map((f) => plan.moves.find((m) => m.from === f.path) ? { ...f, path: plan.moves.find((m) => m.from === f.path).to } : f);
    }
  } finally {
    mediaBusy = false;
  }
}

/**
 * «Discard drafts» as the Publish menu, the History panel and the undo list's foot offer it: the question first, since it takes every unpublished change at once, then the discard, and a message whose action brings the drafts back while the discard is still the last step.
 * @returns {Promise<boolean>} whether the drafts were discarded
 */
async function askDiscard() {
  // A look at a saved draft ends before the drafts can be discarded.
  if (previewState.looking) return false;
  const saved = savedState.savedCount;
  const lines = [ta('confirm.discardDraftsLine'), ...(saved ? [ta(saved === 1 ? 'confirm.discardSavedLine.one' : 'confirm.discardSavedLine', { n: saved })] : [])];
  const ok = await shellState.askConfirm({ title: ta('confirm.discardDrafts'), lines, okLabel: ta('ui.discard'), danger: true });
  if (!ok || !discardDrafts()) return false;
  // The saved drafts go with this browser's (ADR-0032), and what was kept for later with them; an undo brings back this browser's drafts alone.
  void savedState.discardSaved();
  draftsState.clearLater();
  shellState.setStatus(ta('ui.discarded'), 'info', { label: ta('ui.redoAll'), run: () => { if (historyState.steps.undo[0]?.key === 'discard') historyState.undo(); } });
  return true;
}

/**
 * Throws every draft away, back to the published version, as one undo step.
 * @returns {boolean} whether the drafts were discarded; a failure has said so in the status line
 */
function discardDrafts() {
  try {
    discard();
    shellState.setStatus(ta('ui.discarded'), 'info');
    return true;
  } catch (err) {
    // A failed discard must never pass silently: the drafts may be half
    // reset, and the owner needs to know that a reload is the way out.
    console.error('Urd: discard failed', err);
    shellState.setStatus(String(err?.message ?? err), 'error');
    return false;
  }
}

function discard() {
  // The other pages' drafts go too, so the step holds them, and an undo of the discard writes them back.
  const others = siteState.siteDraft.pages
    .filter((p) => p.id !== pageState.pageId && !pageState.pendingPublished.has(p.id) && localStorage.getItem(`urd-draft-${p.id}`) !== null)
    .map((p) => p.id);
  historyState.pushHistory('discard', { pages: others });
  // A tidy's moves go with the documents it rewrote.
  setMoves([]);
  for (const id of others) localStorage.removeItem(`urd-draft-${id}`);
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
  redirectsState.discardRedirects();
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

/**
 * The pages and collections whose own file is not live yet: a page the published site does not list, or lists only as left behind hidden (lib/not-live.js), and a new collection; a page committed and waiting for its deploy is live.
 * @returns {{pages: string[], collections: string[]}}
 */
function notLiveNow() {
  const kept = stillNotLive(readNotLive(), siteState.site?.pages ?? []);
  return {
    pages: (siteState.siteDraft?.pages ?? []).map((p) => p.id)
      .filter((id) => !pageState.pendingPublished.has(id) && (kept.has(id) || !siteState.site?.pages?.some((p) => p.id === id))),
    collections: collectionsState.collectionIds.filter((id) => !collectionsState.publishedCollections[id]),
  };
}

/** What Publish sends: the parts ticked with the parts they cannot go without, why a part unticked goes anyway, and the parts kept for later (lib/publish-pick.js); the media tidy's moves waiting take every part. */
const pick = $derived(pickParts({
  waiting: historyState.unpublished.map(partName),
  later: draftsState.draftsLater,
  notLive: notLiveNow(),
  movesPending: pendingMoves.length > 0,
}));

/** Publish as the top bar, the palette and the Drafts window offer it: the parts ticked, or every part where none is kept for later. */
function publishTicked() {
  if (!pick.kept.length) return publish();
  if (pick.going.size) return publish({ parts: pick.going });
}

/**
 * Publishes the parts waiting, every one of them or those named in `parts` (lib/publish-pick.js pickParts, with their ties): the files of the parts that go, the site settings with a page not live yet that stays behind marked hidden, the collections' list without a new collection that stays behind; the parts left behind keep their drafts, and those that stand in this browser alone are saved to the drafts branch.
 * @param {{parts?: Set<string>|null}} [opts]
 */
async function publish({ parts = null } = {}) {
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
  // What goes: a part named, or every part; the pages and collections not live yet that stay behind, and the parts that wait still.
  const want = (name) => !parts || parts.has(name);
  const left = parts ? keptNotLive(parts, notLiveNow()) : { pages: [], collections: [] };
  const notLiveIds = stillNotLive(readNotLive(), siteState.site.pages);
  const keptParts = parts ? historyState.unpublished.map(partName).filter((name) => !parts.has(name)) : [];
  // The saved copies this publish makes stale, read while the drafts still stand: those of the parts that go.
  const staleSaves = savedState.staleOnPublish().filter((name) => want(name));
  const files = [];
  const publishedTitles = [];
  const draftKeys = [];
  const newPageIds = [];
  // The pages going out with parts of a template still to fill in (lib/fill-in.js), for the warnings below.
  const unfilled = [];
  // The committed files the editor reads in place of the server's until the deploy serves them.
  const committed = [];

  /** The pages whose file this publish sends. */
  const sentPages = new Set();
  // Every page with a draft that goes, not just the open one; a page committed and waiting for its deploy is sent again.
  for (const entry of siteState.siteDraft.pages) {
    if (!want(`page-${entry.id}`) && !pageState.pendingPublished.has(entry.id)) continue;
    const key = `urd-draft-${entry.id}`;
    // Not live: committed and waiting for its deploy, marked as gone out hidden before its file, or not on the live site at all.
    const marked = notLiveIds.has(entry.id) && !pageState.pendingPublished.has(entry.id);
    const isNew = pageState.pendingPublished.has(entry.id) || marked || !siteState.site.pages.some((p) => p.id === entry.id);
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
    // A page marked as gone out hidden, whose draft this browser no longer holds (published from another browser, or discarded), cannot go: its entry stays hidden, and its mark stands.
    if (!page && marked) {
      if (!left.pages.includes(entry.id)) left.pages.push(entry.id);
      continue;
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
    sentPages.add(entry.id);
    publishedTitles.push(entry.title);
    const open = entry.hidden ? null : pageFills(out);
    if (open && open.own + open.contact) unfilled.push({ title: entry.title, ...open });
    // New pages do not exist on the server until the deploy finishes:
    // the draft is kept as the source until then, and cleaned up
    // automatically on the next visit.
    if (isNew) newPageIds.push(entry.id);
    else {
      draftKeys.push(key);
      committed.push([entry.file, out]);
    }
  }

  // The site settings as they go out: the draft, with each page not live yet that stays behind marked hidden; they go with a page whose entry went out hidden before its file, to show it.
  const siteGoes = want('site') || [...sentPages].some((id) => notLiveIds.has(id));
  let siteOut = null;
  if (siteGoes && siteState.siteStore.hasDraft()) {
    // Clone here too: logo uploads are materialized without touching the
    // draft in memory until the commit is safely in.
    siteOut = outSite(JSON.parse(JSON.stringify(siteState.siteDraft)), left.pages);
    files.push(...materializeSiteImages(siteOut));
    files.push({ path: 'content/site.json', content: JSON.stringify(siteOut, null, 2) + '\n', encoding: 'utf-8' });
    committed.push(['content/site.json', siteOut]);
    // Materialize the theme as render-blocking light-dark() CSS
    // (FOUC-free first paint). One file covers all pages; the index.html
    // copies link to it.
    files.push({ path: 'content/theme.css', content: buildThemeCss(siteOut.theme), encoding: 'utf-8' });
    draftKeys.push('urd-draft-site');
    // Name WHAT in the site setup changed (for the history).
    const eq = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
    if (!eq(siteState.site.theme, siteOut.theme)) publishedTitles.push(ta('publish.part.theme'));
    if (!eq(siteState.site.nav, siteOut.nav)) publishedTitles.push(ta('publish.part.nav'));
    if (!eq(siteState.site.footer, siteOut.footer)) publishedTitles.push(ta('publish.part.footer'));
    if (!eq(siteState.site.pages, siteOut.pages)) publishedTitles.push(ta('publish.part.pages'));
    if (!eq(siteState.site.grid, siteOut.grid)) publishedTitles.push(ta('publish.part.grid'));
    if ((siteState.site.site.icon ?? null) !== (siteOut.site.icon ?? null)) publishedTitles.push(ta('publish.part.icon'));
    const { icon: a, ...restA } = siteState.site.site;
    const { icon: b, ...restB } = siteOut.site;
    if (!eq(restA, restB)) publishedTitles.push(ta('publish.part.siteInfo'));
  }

  // The site the commit stands on: the settings as they go out, else as the draft holds them, else, where they stay behind, as they are live; the page copies, the sitemap, the deletes, the feeds' links and the redirects' checks follow it.
  const siteGoing = siteOut ?? (siteGoes ? siteState.siteDraft : siteState.site);

  // Collections: changed files, the index file and deletions (diff against the published index); a legacy index file with nothing of its own is deleted with any publish.
  // While the index could not be read, nothing of the collections is written or deleted, since the editor does not know what is published.
  const changedCollections = collectionsState.collectionsUnavailable ? [] : Object.entries(collectionsState.collectionStores).filter(([id, st]) => st.hasDraft() && want(`collection-${id}`));
  // The collections' list, its deletes and the legacy index go with the list's own part.
  const indexGoes = want('collections');
  let indexOut = null;
  if (!collectionsState.collectionsUnavailable && (changedCollections.length || (indexGoes && (indexPending(collectionsState.collectionsIndexStore?.hasDraft() ?? false, collectionsState.legacyIndexIds) || collectionsState.legacyIndexIds !== null)))) {
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
              const link = e.page || e.href ? resolveLink(e, siteGoing.pages ?? []) : null;
              return { id: e.id, title: collectionsState.plainTitle(e.title), text: collectionsState.plainTitle(e.text), date: e.date, href: link && !link.missing ? link.href : undefined };
            }),
          }),
          encoding: 'utf-8',
        });
      } else if (FEED_KINDS.includes(collectionsState.publishedCollections[id]?.kind)) {
        // A collection changed to a kind without a feed loses the feed it had.
        files.push({ path: `content/samlinger/${id}.xml`, delete: true });
      }
      draftKeys.push(`urd-draft-collection-${id}`, `urd-draft-samling-${id}`);
    }
    const plan = planIndexPublish({
      ids: collectionsState.collectionIds,
      hasDraft: collectionsState.collectionsIndexStore?.hasDraft() ?? false,
      published: (await fetchIndex(INDEX_PATH))?.samlinger ?? null,
      legacy: collectionsState.legacyIndexIds,
    });
    if (indexGoes && plan.writeIndex) {
      // The list as it goes out: without a new collection that stays behind.
      indexOut = JSON.parse(JSON.stringify(collectionsState.collectionsIndexStore.data));
      indexOut.samlinger = (indexOut.samlinger ?? []).filter((id) => !left.collections.includes(id));
      files.push({ path: INDEX_PATH, content: JSON.stringify(indexOut, null, 2) + '\n', encoding: 'utf-8' });
      draftKeys.push(INDEX_DRAFT_KEY);
    }
    // Collections removed from the index are deleted from the repo with their feeds; one also created in the same publish keeps the create.
    const created = new Set(files.map((f) => f.path));
    for (const id of indexGoes ? plan.deleteIds : []) {
      for (const path of [`content/samlinger/${id}.json`, `content/samlinger/${id}.xml`]) {
        if (!created.has(path)) files.push({ path, delete: true });
      }
    }
    if (indexGoes && plan.deleteLegacy) files.push({ path: LEGACY_INDEX_PATH, delete: true });
    if (changedCollections.length || indexOut || (indexGoes && plan.deleteIds.length)) publishedTitles.push(ta('publish.part.collections'));
  }

  // Template changes are published as content/maler/ files + index, the
  // same pattern as collections; images in the template are materialized
  // to media/.
  const templatesGo = want('templates');
  const changedTemplates = templatesGo ? Object.entries(templatesState.templateStores).filter(([, st]) => st.hasDraft()) : [];
  if (templatesGo && (changedTemplates.length || templatesState.templatesIndexStore?.hasDraft())) {
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
  if (want('plugins') && pluginsState.pluginsStore?.hasDraft()) {
    const { remove = [], ...index } = $state.snapshot(pluginsState.pluginsStore.data);
    files.push({ path: 'plugins/plugins.json', content: JSON.stringify(index, null, 2) + '\n', encoding: 'utf-8' });
    // A folder name the guard would refuse is left out, so it never stops the rest of the publish.
    for (const id of remove) if (/^[a-z0-9][a-z0-9-]*$/.test(id)) files.push({ path: `plugins/${id}`, delete: true });
    draftKeys.push('urd-draft-plugins');
    publishedTitles.push(ta('publish.part.plugins'));
  }

  // The redirects (ADR-0015): the list, and the host's file written from it. A `_redirects` in the repository that has not been looked at yet is read first, so one written by hand joins the list instead of being written over; where it cannot be read, the list waits as a draft and the owner is told.
  let redirectsWait = false;
  if (want('redirects') && redirectsState.redirectsStore?.hasDraft()) {
    if (await redirectsState.ensureHostFileKnown()) {
      const list = { version: 1, rules: $state.snapshot(redirectsState.redirectsDraft.rules) };
      files.push({ path: 'content/redirects.json', content: JSON.stringify(list, null, 2) + '\n', encoding: 'utf-8' });
      files.push({ path: '_redirects', content: toHostFile(list.rules), encoding: 'utf-8' });
      draftKeys.push('urd-draft-redirects');
      publishedTitles.push(ta('publish.part.redirects'));
    } else {
      redirectsWait = true;
    }
  }

  // Page routing on all static hosts: every page except the front page
  // gets its own <path>/index.html (a copy of the root index.html; the
  // engine routes on pathname). Generated on every publish - unchanged
  // copies yield identical blobs and thus no diff in the commit.
  try {
    const html = await (await fetch('/index.html')).text();
    for (const p of siteGoing.pages) {
      // A hidden page has no address of its own on the published site (its redirect or «not found» answers there).
      if (p.path !== '/' && !p.hidden) {
        files.push({ path: `${p.path.slice(1)}/index.html`, content: html, encoding: 'utf-8' });
      }
    }
  } catch { /* without the index copies the site still works on SPA hosts */ }

  // The visibility files (the SEO package): sitemap and robots are
  // regenerated on every publish from the origin the admin runs on -
  // unchanged content yields identical blobs and no diff, like the
  // index copies.
  files.push({ path: 'sitemap.xml', content: buildSitemapXml(siteGoing.pages, location.origin), encoding: 'utf-8' });
  files.push({ path: 'robots.txt', content: buildRobotsTxt(location.origin), encoding: 'utf-8' });

  // Deleted and moved pages: diff against the published site.json. The
  // server silently skips paths already gone from the repo. A path ALSO
  // created in the same commit (two pages swapping addresses) must not
  // be deleted: the last entry with the same path wins in the Git tree,
  // so such a deletion would remove the new copy.
  // The media files the tidy moves (lib/media-tidy.js), each from its root path to its folder; the bytes stay in the repository.
  // They wait only with every part going (lib/publish-pick.js), since the drafts already name the files where they move to.
  for (const move of pendingMoves) files.push({ path: move.to, from: move.from });

  const created = new Set(files.map((f) => f.path));
  const del = (path) => { if (!created.has(path)) files.push({ path, delete: true }); };
  for (const p of siteState.site.pages) {
    const still = siteGoing.pages.find((q) => q.id === p.id);
    if (!still) {
      del(p.file);
      if (p.path !== '/') del(`${p.path.slice(1)}/index.html`);
    } else if (still.path !== p.path && p.path !== '/') {
      del(`${p.path.slice(1)}/index.html`);
    }
    // A page hidden since: its address copy goes, so the host answers with its redirect or «not found».
    if (still?.hidden && still.path !== '/') del(`${still.path.slice(1)}/index.html`);
  }

  // The warnings before the commit, asked as one question with a section each: a page name or address typed but turned down (it never reached the draft, so the page goes out with what stands), a page with parts of its template still to fill in, and someone else's publish since we loaded touching the same files. The editor must actively choose to publish anyway.
  const warnings = [];
  // A page name or address turned down belongs to the site settings, and is told where they go.
  const refused = siteGoes ? siteState.refusedPageFields() : [];
  if (refused.length) {
    warnings.push({
      heading: ta('confirm.pageFields.title'),
      lines: refused.map((f) => { const { key, vars } = refusedPageFieldLine(f); return ta(key, vars); }),
    });
  }
  // Rules that cannot do what they say: one that hides a shown page, a circle, or one left out of the file as unsound.
  const ruleIssues = redirectIssues(redirectsState.redirectRules, siteGoing.pages);
  const badRules = redirectsState.redirectRules.map((rule, i) => ({ rule, issue: ruleIssues[i] })).filter((r) => r.issue?.level === 'error');
  // Lines of a `_redirects` written by hand that the list cannot hold go as publishing first writes the file.
  const unkept = files.some((f) => f.path === '_redirects') ? redirectsState.unkeptLines : 0;
  if (badRules.length || redirectsWait || unkept) {
    warnings.push({
      heading: ta('confirm.redirects.title'),
      lines: [
        ...badRules.map(({ rule, issue }) => ta('confirm.redirects.line', { from: rule.from, issue: ta(`redirect.issue.${issue.key}`, { page: issue.page ?? '' }) })),
        ...(unkept ? [ta('confirm.redirects.unkept', { count: unkept })] : []),
        ...(redirectsWait ? [ta('confirm.redirects.wait')] : []),
      ],
    });
  }
  // A page made from a template with parts in [brackets] not yet filled in: the parts by page, and the seller's details, which the Legal panel's contact details hold or still lack.
  if (unfilled.length) {
    const haveDetails = hasSellerDetails(siteState.siteDraft);
    warnings.push({
      heading: ta('confirm.fills.title'),
      lines: unfilled.flatMap((page) => [
        ...(page.own ? [ta('confirm.fills.line', { page: page.title, count: page.own })] : []),
        ...(page.contact ? [ta(haveDetails ? 'confirm.fills.contactCopy' : 'confirm.fills.contactMissing', { page: page.title })] : []),
      ]),
    });
  }
  const conflict = await updaterState.checkConflict(files);
  if (conflict.warning) warnings.push(conflict.warning);
  if (warnings.length) {
    const ok = await shellState.askConfirm({ title: ta('confirm.beforePublish'), sections: warnings, okLabel: ta('confirm.publishAnyway') });
    if (!ok) {
      // The advice to reload belongs to someone else's publish; a page field alone is fixed where it stands.
      shellState.setStatus(ta(conflict.warning ? 'status.publishAborted' : 'status.publishCancelled'), 'error');
      return;
    }
  }
  if (refused.length) siteState.dropTypedPageFields();

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
    setMoves([]);
    // Mirror the materialization into memory now that the commit is
    // safely in (the same deterministic paths the clones got), for the parts that went.
    if (sentPages.has(pageState.pageId)) materializeImages(pageState.store.data);
    // The drafts ARE now the published state; keep the data in memory
    // (the server serves old JSON until the deploy finishes) and remove
    // only the markers.
    for (const key of draftKeys) localStorage.removeItem(key);
    for (const id of newPageIds) pageState.pendingPublished.add(id);
    // Published baseline = what went out: rebuild the baselines of the stores that went, so
    // "Discard draft" never rolls back past this publish; a store kept back keeps its own.
    if (siteOut) {
      materializeSiteImages(siteState.siteDraft);
      // The draft keeps a page left behind shown, and stands as a draft where it differs from the settings as they went out.
      const draft = JSON.parse(JSON.stringify(siteState.siteDraft));
      siteState.site = siteOut;
      siteState.siteStore = createDraftStore('urd-draft-site', () => siteState.site, shellState.draftSaveError);
      siteState.siteStore.replace(draft);
      siteState.siteStore.save();
      siteState.linkSiteDraft();
    }
    if (files.some((f) => f.path === 'content/redirects.json')) redirectsState.adoptPublished();
    if (pluginsState.pluginsStore && want('plugins')) {
      // The published index: the removals are done, and are not carried into the next draft.
      const { remove: _done, ...publishedPlugins } = JSON.parse(JSON.stringify(pluginsState.pluginsStore.data));
      pluginsState.pluginsStore = createDraftStore('urd-draft-plugins', () => publishedPlugins, shellState.draftSaveError);
      pluginsState.syncPluginsView();
    }
    if (collectionsState.collectionsIndexStore) {
      // Mirror the materialization into memory (the same deterministic paths the clones got).
      for (const [, st] of changedCollections) {
        for (const entry of st.data.entries) materializeEntryImages(entry, []);
      }
      if (indexGoes) {
        // The list as it went out; the draft keeps a collection left behind.
        const draftIndex = JSON.parse(JSON.stringify(collectionsState.collectionsIndexStore.data));
        const publishedIndex = indexOut ?? draftIndex;
        collectionsState.collectionsIndexStore = createDraftStore(INDEX_DRAFT_KEY, () => publishedIndex, shellState.draftSaveError);
        collectionsState.collectionsIndexStore.replace(draftIndex);
        collectionsState.collectionsIndexStore.save();
      }
      if (files.some((f) => f.path === LEGACY_INDEX_PATH)) {
        collectionsState.legacyIndexIds = null;
        try { localStorage.setItem(LEGACY_DELETED_KEY, '1'); } catch { /* without the marker, a reload before the deploy merges the legacy index again */ }
      }
      // The collections that went are published as they stand; with the list, one taken off it is gone.
      const published = Object.fromEntries(Object.entries(collectionsState.publishedCollections)
        .filter(([id]) => !indexGoes || collectionsState.collectionIds.includes(id)));
      for (const id of parts ? changedCollections.map(([id]) => id) : collectionsState.collectionIds) {
        if (!collectionsState.collectionStores[id]) continue;
        const publishedCollection = JSON.parse(JSON.stringify(collectionsState.collectionStores[id].data));
        published[id] = publishedCollection;
        collectionsState.collectionStores[id] = createDraftStore(`urd-draft-collection-${id}`, () => publishedCollection, shellState.draftSaveError, `urd-draft-samling-${id}`);
      }
      collectionsState.publishedCollections = published;
      collectionsState.syncCollectionsView();
    }
    if (templatesState.templatesIndexStore && templatesGo) {
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
    if (sentPages.has(pageState.pageId)) {
      const pageSnap = JSON.parse(JSON.stringify(pageState.store.data));
      pageState.store = createDraftStore(`urd-draft-${pageState.pageId}`, () => pageSnap, shellState.draftSaveError);
      if (pageState.pendingPublished.has(pageState.pageId)) {
        // New page: the draft is the source until the deploy finishes - keep it.
        shellState.writeDraftKey(`urd-draft-${pageState.pageId}`, JSON.stringify(pageSnap));
      }
    }
    // A page whose file went is live; one not live yet left behind while the site settings went out stands hidden in them, and is marked not live until its file goes.
    const notLive = new Set([...notLiveIds].filter((id) => !sentPages.has(id) && siteState.siteDraft.pages.some((p) => p.id === id)));
    if (siteOut) for (const id of left.pages) notLive.add(id);
    writeNotLive(notLive);
    historyState.markPublished(parts ? [...parts, ...(siteOut ? ['site'] : [])] : null);
    historyState.updateDirty();
    void (async () => {
      await savedState.afterPublish(staleSaves);
      // The parts left behind that stand in this browser alone are saved, so they wait on the drafts branch as the rest goes live.
      if (keptParts.length && savedState.savedAvailable) await savedState.saveDrafts({ names: keptParts, device: draftsState.browserName, quiet: true, auto: true });
    })();
    // After every draft went out, nothing is kept for later; after the ticked ones, those still waiting stay unticked.
    if (parts) draftsState.keepLaterOf(keptParts);
    else draftsState.clearLater();
    const wave = pageState.held.hold(committed);
    // The wait keeps the message up (info never auto-clears) until the
    // site serves the commit or the wait gives up.
    shellState.setStatus(ta('status.published'), 'info');
    updaterState.awaitPublishDeploy(files, () => pageState.held.release(wave));
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
    const data = await res.json().catch(() => null);
    // The files the moves name are not at the root any more (a publish whose answer was lost has moved them): the moves are dropped, and the documents, which already point at the folders, go with the next publish.
    if (data?.code === 'moveMissing') setMoves([]);
    shellState.setStatus(taApiError(data) ?? ta('status.publishFailed'), 'error');
  } else {
    shellState.setStatus(ta('status.publishUnavailable'), 'error');
  }
}

/** What the other parts read and write through. */
export const publishState = {
  materializeField,
  materializeEntryImages,
  materializeBackground,
  materializeBlockImages,
  materializeSection,
  materializeImages,
  materializeSiteImages,
  askDiscard,
  discardDrafts,
  discard,
  publish,
  publishTicked,
  /** The parts Publish sends, by name, with the reason a part unticked goes anyway, and the parts kept for later. */
  get publishGoing() { return pick.going; },
  get publishForced() { return pick.forced; },
  get publishKept() { return pick.kept; },
  get mediaRootCount() { return mediaRootCount; },
  get mediaBusy() { return mediaBusy; },
  loadMediaFiles,
  tidyMedia,
};
