/**
 * The Legal panel's state (panels/LegalPanel.svelte): the privacy facts of the whole site (privacy-model.js), gathered from the open page and every other page's draft or published file, and the panel's state from them (lib/legal-model.js), read by the panel, the amber dot on its tab and the tab's menu (shell/PanelTab.svelte).
 * Also the folds' open state, kept while other panels are open.
 */
import { privacyModel, cloudflareBeacon } from '$engine/privacy-model.js';
import { legalState } from '../lib/legal-model.js';
import { pageFills } from '../lib/fill-in.js';
import { siteState } from './site.svelte.js';
import { pageState } from './page.svelte.js';
import { historyState } from './history.svelte.js';
import { blocksState } from './blocks.svelte.js';

/** The other pages' files by id, read as the pages come and go and as another page is opened. */
let otherPages = $state({});

/** Whether the published front page carries Cloudflare Web Analytics' beacon, as the site serves it: read once per session, false where it cannot be read (a local server serves no beacon). */
let beacon = $state(false);
let beaconRead = false;


/** The panel's state, after every change to the site or the open page (the open page's data is not reactive; the count of changes is). */
const legal = $derived.by(() => {
  const draft = siteState.siteDraft;
  if (!draft) return null;
  void historyState.edits;
  const here = pageState.pageId;
  const fileOf = (id) => (id === here ? pageState.store?.data : otherPages[id]) ?? null;
  const pages = (draft.pages ?? []).map((entry) => ({ entry, page: fileOf(entry.id) })).filter((p) => p.page);
  const facts = privacyModel(draft, pages);
  const fills = pageFills(fileOf(draft.site?.commerce?.termsPage));
  return legalState({ site: draft, facts, termsOpen: fills.own + fills.contact, shopOn: blocksState.shopBlocksOn(), beacon });
});

/** The published files read for pages without a draft, by file: fetched once, since a page's file on the server changes only by a publish, which writes the pages that had drafts (read from their drafts, then from the held files, until the site serves them). */
const fetched = new Map();

/** Another page's file: its draft, else the file a publish holds, else its published file, fetched once. */
function readOther(entry) {
  if (localStorage.getItem(`urd-draft-${entry.id}`) !== null || pageState.held.has(entry.file)) {
    fetched.delete(entry.file);
    return pageState.readPageDraft(entry);
  }
  if (!fetched.has(entry.file)) fetched.set(entry.file, pageState.readPageDraft(entry));
  return fetched.get(entry.file);
}

/** The front page as the site serves it, its scripts read for Cloudflare's beacon, which Cloudflare adds to the HTML on its way. */
function readBeacon() {
  if (beaconRead) return;
  beaconRead = true;
  fetch('/', { cache: 'no-store' })
    .then((res) => (res.ok ? res.text() : ''))
    .then((html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      beacon = cloudflareBeacon([...doc.querySelectorAll('script[src]')].map((s) => s.getAttribute('src')));
    })
    .catch(() => {});
}

function effects() {
  // The beacon is read once the editor has the site.
  $effect(() => {
    if (siteState.siteDraft) readBeacon();
  });

  // The other pages are read again as pages come and go, as another page is opened (the page left behind is one of them now), and as the drafts are published or discarded.
  $effect(() => {
    const draft = siteState.siteDraft;
    if (!draft) return;
    const here = pageState.pageId;
    void historyState.dirty;
    const entries = (draft.pages ?? []).filter((p) => p.id !== here).map((p) => ({ id: p.id, title: p.title, path: p.path, file: p.file }));
    let live = true;
    Promise.all(entries.map((entry) => Promise.resolve(readOther(entry)).catch(() => null)))
      .then((files) => { if (live) otherPages = Object.fromEntries(entries.map((entry, i) => [entry.id, files[i]])); });
    return () => { live = false; };
  });
}

export const legalPanelState = {
  get legal() { return legal; },
  effects,
};
