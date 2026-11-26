/**
 * The site draft: site.json and its mutators for the nav, footer and theme, the grid, the pages list, the icon, calendars, theme suggestions and backgrounds.
 */
import { colorLayer } from '$engine/backgrounds/color.js';
import { WIDTH_DEFAULT, GUTTER_DEFAULT } from '../lib/content-width.js';
import { folds } from '../lib/folds.svelte.js';
import { togglePinned } from '../lib/command-palette.js';
import { gradientLayer } from '$engine/backgrounds/gradient.js';
import { glowLayer } from '$engine/backgrounds/glow.js';
import { imageLayer } from '$engine/backgrounds/image.js';
import { slideshowLayer } from '$engine/backgrounds/slideshow.js';
import { videoLayer } from '$engine/backgrounds/video.js';
import { patternLayer } from '$engine/backgrounds/pattern.js';
import { grainLayer } from '$engine/backgrounds/grain.js';
import { bindingWidth } from '../lib/content-width.js';
import { copySlug } from '../lib/duplicate.js';
import { pageIdTaken } from '../lib/saved-model.js';
import { frontPageSwap, refusedPageFields as listRefused } from '../lib/page-settings.js';
import { TITLE_FORMATS, titleFormatOf } from '$engine/seo.js';
import { activeTokens } from '$engine/theme.js';
import { ta } from '$engine/i18n.js';
import { slugify } from '$engine/imageTools.js';
import { buildPagePreset } from '$engine/page-presets.js';
import { TOTOP_DESIGNS } from '$engine/totop.js';
import { presetSample, applyPreset } from '$engine/footer-presets.js';
import { clonePageForInsert } from '$engine/templates-model.js';
import { liftPageFile } from '$engine/migrate.js';
import { makeId } from '$engine/sections/presets.js';
import { termsSeed } from '../lib/site-seed.js';
import { setsOf, setsAfter, siteColours } from '../lib/colour-sets.js';
import { sitePictures } from '../lib/colour-ways.js';
import { tick } from 'svelte';
import { historyState } from './history.svelte.js';
import { pageState } from './page.svelte.js';
import { previewState } from './preview.svelte.js';
import { shellState } from './shell.svelte.js';
import { templatesState } from './templates.svelte.js';
import { redirectsState } from './redirects.svelte.js';
import { pageMoved, withRule, withoutFrom } from '../lib/redirects-model.js';
import { readNotLive, stillNotLive } from '../lib/not-live.js';

/** The background layer types in the order they are offered in the panel. */
const BG_TYPES = [
  ['color', colorLayer],
  ['gradient', gradientLayer],
  ['glow', glowLayer],
  ['image', imageLayer],
  ['slideshow', slideshowLayer],
  ['video', videoLayer],
  ['pattern', patternLayer],
  ['grain', grainLayer],
];

const BG_DEFS = Object.fromEntries(BG_TYPES);

let site = $state(null);

/** Mirror of the site draft's grid: square cells, one size */
let grid = $state({ size: 16, snap: true });

/** The window width from which the content reaches the design width, shown under the sample. */
let bindsFrom = $derived(bindingWidth(layoutWidth, layoutGutter));

let siteStore = null;

/**
 * The reactive site draft the panels read and change; `site` is the published state, a publish's baseline for deleted and moved pages.
 */
let siteDraft = $state(null);

/** Links siteDraft and siteStore to the same object (via the Svelte proxy). */
function linkSiteDraft() {
  siteDraft = siteStore.data;
  siteStore.replace(siteDraft);
}

/** The send a panel's change waits for (siteMutate), so a drag sends the site once a frame however often the pointer moves. */
let siteFrame = 0;

/** Whether the next site sent carries the open page too (pushSiteToPreview with `page`). */
let siteWithPage = false;

/**
 * Sends a snapshot of the site draft to the preview, at once or with `soon` in the next frame; `startup` marks the ready send, and `page` sends the open page too.
 * @param {{soon?: boolean, startup?: boolean, page?: boolean}} [options]
 */
function pushSiteToPreview({ soon = false, startup = false, page = false } = {}) {
  if (page) siteWithPage = true;
  const send = (options) => {
    const open = siteWithPage ? pageState.store?.data ?? null : null;
    siteWithPage = false;
    previewState.bridge?.sendSite($state.snapshot(siteDraft), { ...options, page: open });
  };
  if (soon) {
    siteFrame ||= requestAnimationFrame(() => {
      siteFrame = 0;
      send({});
    });
    return;
  }
  if (siteFrame) cancelAnimationFrame(siteFrame);
  siteFrame = 0;
  send({ startup });
}

/** The background contexts of the nav and the footer, read from siteDraft; a section's is its own. */
function navBgMutate(key, fn) {
  siteMutate(key, () => { siteDraft.nav.style ??= {}; fn(siteDraft.nav.style); });
}

const navBgCtx = { mutate: navBgMutate, keyPrefix: 'navbg', keyId: 'nav' };

const footerBgCtx = { mutate: footerMutate, keyPrefix: 'footerbg', keyId: 'footer' };

/** The palette as the canvas actually shows it (active mode, alt merge via the engine). */
const previewPalette = $derived(siteDraft?.theme ? (activeTokens(siteDraft.theme, previewState.previewMode).color ?? {}) : {});

/** The theme colours as quick picks in the colour picker, by token name, in the preview's light or dark mode. */
const themeSwatches = () => Object.entries(previewPalette);

/** The grid controls: a change is stored in the site draft and sent live; the grid only snaps and never moves content. */
function setGrid(field, value) {
  historyState.pushHistory('grid:site');
  grid = { ...grid, [field]: value };
  siteStore.data.grid = { ...siteStore.data.grid, [field]: value };
  siteStore.save();
  historyState.updateDirty();
  pushSiteToPreview();
  // The grid overlay is turned on again after sendSite's redraw, which arrives first.
  if (shellState.gridOn) previewState.bridge?.sendShowGrid(true);
}

/** A change to the site draft as one undo step, pushed before `fn` runs; `pages` names other pages it writes, and `preview` false leaves the canvas as it stands. */
function siteMutate(key, fn, { pages, preview = true } = {}) {
  historyState.pushHistory(key, pages ? { pages } : undefined);
  fn();
  siteStore.save();
  historyState.updateDirty();
  if (preview) pushSiteToPreview({ soon: true });
}

/**
 * The site's colour sets (theme.colorSets) every colour picker offers: each change one undo step, a typed name one `edit:` step, and the canvas not drawn again.
 */
function changeColourSets(key, change) {
  if (!siteDraft?.theme) return false;
  const now = setsOf(siteDraft.theme);
  const next = setsAfter(now, change);
  if (next === now) return false;
  siteMutate(key, () => {
    if (next.length) siteDraft.theme.colorSets = next;
    else delete siteDraft.theme.colorSets;
  }, { preview: false });
  return true;
}
const addColourSet = (set) => changeColourSets('theme-colour-set-add', { kind: 'add', set });
const renameColourSet = (id, name) => changeColourSets(`edit:theme-colour-set-name:${id}`, { kind: 'rename', id, name });
const addSetColour = (id, code) => changeColourSets('theme-colour-set-colour', { kind: 'addColour', id, code });
const removeSetColour = (id, index) => changeColourSets('theme-colour-set-colour', { kind: 'removeColour', id, index });
const deleteColourSet = (id) => changeColourSets('theme-colour-set-delete', { kind: 'delete', id });

/** The pages' files read for the live set: a page with a draft or a file a publish holds is read each time, a published one fetched once. */
const pagesRead = new Map();
function pageForColours(entry) {
  if (localStorage.getItem(`urd-draft-${entry.id}`) !== null || pageState.held.has(entry.file)) {
    pagesRead.delete(entry.file);
    return pageState.readPageDraft(entry);
  }
  if (!pagesRead.has(entry.file)) pagesRead.set(entry.file, pageState.readPageDraft(entry));
  return pagesRead.get(entry.file);
}

/** The site's settings, the theme left out, and every page's data, for the live set and the set maker's pictures. */
async function readSiteDocs() {
  if (!siteDraft) return [];
  const docs = await Promise.all((siteDraft.pages ?? []).map((entry) => {
    if (entry.id !== pageState.pageId) return Promise.resolve(pageForColours(entry)).catch(() => null);
    // The open page is read from the store; its file, which may change by a publish from it, is read anew once it is left.
    pagesRead.delete(entry.file);
    return $state.snapshot(pageState.store?.data ?? null);
  }));
  const { theme: _theme, ...settings } = $state.snapshot(siteDraft);
  return [settings, ...docs.filter(Boolean)];
}

/** The live set «On this site»: the colours the pages and the site's settings use, the most used first, the theme's own left out (the Theme tab holds them). */
async function readSiteColours() {
  return siteColours(await readSiteDocs());
}

/** The pictures the pages and the site's settings use, the most used first, for the set maker's «From the site's pictures». */
async function readSitePictures() {
  return sitePictures(await readSiteDocs());
}

/** Pins a command into the site's shared shortcuts (site.shortcuts, the command palette's first group), or takes it out; a refused pin changes nothing. */
function toggleShortcut(id) {
  const list = siteDraft.shortcuts ?? [];
  const next = togglePinned(list, id);
  if (next === list) return;
  siteMutate('site-shortcuts', () => {
    if (next.length) siteDraft.shortcuts = next; else delete siteDraft.shortcuts;
  });
}

/** How a new Urd is told in the admin (site.admin.updateNotice): a dot on Updates, or a pill in the top bar; shared by everyone who edits the site. */
function setUpdateNotice(v) {
  siteMutate('site', () => {
    siteDraft.admin = { ...(siteDraft.admin ?? {}), updateNotice: v === 'pill' ? 'pill' : 'dot' };
  });
}

let newPageTitle = $state('');

/* What the next new page starts from: null for a blank page, 'preset:<id>' for a built-in starter pack, else a page template's id. */
let newPageTemplate = $state(null);

/** Mirrors guard.js: directories that can never become pages. */
const RESERVED_SLUGS = ['admin', 'api', 'assets', 'content', 'media', 'plugins', 'functions', 'readme'];

function pageSlugError(slug, ignoreId = null) {
  if (!slug) return ta('error.pageNeedsName');
  if (RESERVED_SLUGS.includes(slug)) return ta('error.reservedName', { slug });
  if (siteDraft.pages.some((p) => p.id !== ignoreId && (p.path === `/${slug}` || p.id === slug))) {
    return ta('error.pageExists');
  }
  return null;
}

/** A new page's slug, its id for good: refused as any address is, and where its draft would share another part's key (pageIdTaken in lib/saved-model.js). */
function newPageError(slug) {
  return pageSlugError(slug) ?? (pageIdTaken(slug) ? ta('error.reservedName', { slug }) : null);
}

/** A page being made: a second press while the first waits for its words does nothing. */
let addingPage = false;

/** A new page from the name typed (newPageTitle) and the template picked; turned down, the reason for its field to show, otherwise null. */
async function addPage() {
  if (addingPage) return null;
  addingPage = true;
  try {
    return await makePage();
  } finally {
    addingPage = false;
  }
}

async function makePage() {
  const title = newPageTitle.trim();
  const template = newPageTemplate;
  // No fallback word: a name without a letter or a digit is turned down.
  const slug = slugify(title, '');
  const err = newPageError(slug);
  if (err) return err;
  // The terms of sale's seed words are read before the page is made (lib/site-seed.js), and the name is checked again after the wait.
  const seed = template === 'preset:terms' ? await termsSeed(siteDraft) : undefined;
  if (seed) {
    const again = newPageError(slug);
    if (again) return again;
  }
  // A starter pack is built fresh; a page template is lifted to the current schema (liftPageFile) and cloned with new ids and the new page's meta.
  const templatePage = template && !template.startsWith('preset:')
    ? templatesState.templateStores[template]?.data?.page : null;
  const fresh = template?.startsWith('preset:')
    ? (buildPagePreset(template.slice(7), { pageId: slug, title, seed }) ?? pageState.blankPage({ id: slug, title }))
    : templatePage
      ? clonePageForInsert(liftPageFile(JSON.parse(JSON.stringify(templatePage)), siteStore.data), makeId, { id: slug, title })
      : pageState.blankPage({ id: slug, title });
  siteMutate('pages', () => {
    siteDraft.pages.push({ id: slug, title, path: `/${slug}`, file: `content/pages/${slug}.json` });
    // New pages go straight into the menu; the Nav panel can remove them.
    siteDraft.nav.items.push({ label: title, page: slug });
    // The footer links the new privacy page where none is chosen, or the chosen one is deleted or hidden.
    if (template === 'preset:privacy' && !siteDraft.pages.some((p) => p.id === siteDraft.footer?.privacyPage && !p.hidden)) {
      siteDraft.footer ??= { version: 1, show: false, text: '', align: 'center' };
      siteDraft.footer.privacyPage = slug;
    }
    // The checkout links the terms of sale once the site has them, in place of a chosen page that is deleted or hidden.
    if (template === 'preset:terms' && !siteDraft.pages.some((p) => p.id === siteDraft.site.commerce?.termsPage && !p.hidden)) {
      siteDraft.site.commerce ??= {};
      siteDraft.site.commerce.termsPage = slug;
    }
  });
  // The page's own draft, ready to publish.
  shellState.writeDraftKey(`urd-draft-${slug}`, JSON.stringify(fresh));
  historyState.updateDirty();
  newPageTitle = '';
  newPageTemplate = null;
  pageState.selectPage(slug);
  return null;
}

/** The page settings' «Save as template»: the page's current data into the template core. */
async function savePageAsTemplate(entry) {
  const data = entry.id === pageState.pageId
    ? JSON.parse(JSON.stringify(pageState.store.data))
    : await pageState.readPageDraft(entry);
  await templatesState.saveTemplate('page', data);
}

/**
 * A page copied as a new draft page under the next free slug, in one undo step with its draft, out of the menu; `source` and `title` give its data and name.
 */
async function duplicatePage(entry, { source = null, title = null } = {}) {
  const from = source ?? (entry.id === pageState.pageId
    ? JSON.parse(JSON.stringify(pageState.store.data))
    : await pageState.readPageDraft(entry));
  const slug = copySlug(entry.id, siteDraft.pages, (candidate) => RESERVED_SLUGS.includes(candidate) || pageIdTaken(candidate));
  const name = title ?? ta('page.copyTitle', { title: entry.title });
  const fresh = clonePageForInsert(from, makeId, { id: slug, title: name });
  siteMutate('pages', () => {
    siteDraft.pages.push({ id: slug, title: name, path: `/${slug}`, file: `content/pages/${slug}.json` });
  }, { pages: [slug] });
  shellState.writeDraftKey(`urd-draft-${slug}`, JSON.stringify(fresh));
  historyState.updateDirty();
  // The page switch clears the status line, so the word about the copy comes after it.
  await pageState.selectPage(slug);
  shellState.setStatus(ta('status.pageDuplicated', { title: name }));
}

/** A page's new name; turned down, the reason for its field to show, otherwise null. */
function renamePage(entry, rawTitle) {
  const title = rawTitle.trim();
  if (!title) return ta('error.pageNeedsName');
  if (title === entry.title) return null;
  const old = entry.title;
  const open = entry.id === pageState.pageId;
  siteMutate('pages', () => {
    entry.title = title;
    // Menu items still carrying the old name follow along.
    for (const item of siteDraft.nav.items) {
      if (item.page === entry.id && item.label === old) item.label = title;
    }
  }, open ? {} : { pages: [entry.id] });
  // The page file's meta.title is kept in step (it drives the tab title).
  if (open) {
    pageState.store.data.meta.title = title;
    pageState.store.save();
    historyState.updateDirty();
    pushSiteToPreview({ soon: true, page: true });
  } else {
    pageState.patchPageDraft(entry, (p) => { p.meta.title = title; });
  }
  return null;
}

/** «Hide from search engines»: the flag on the page's entry in site.json, which the sitemap is filtered by; any page by its id, the open page without one. */
function setPageNoindex(checked, id = pageState.pageId) {
  const entry = siteDraft.pages.find((p) => p.id === id);
  if (!entry) return;
  siteMutate('edit:page-noindex', () => {
    if (checked) entry.noindex = true;
    else delete entry.noindex;
  });
}

/** Per-page visibility of the menu: it shows on all pages except those in nav.hideOn (the Nav panel and the page's settings); the strip has its own list. */
function toggleNavOnPage(pageId, show) {
  siteMutate('nav', () => {
    const hide = new Set(siteDraft.nav.hideOn ?? []);
    if (show) hide.delete(pageId); else hide.add(pageId);
    if (hide.size) siteDraft.nav.hideOn = [...hide]; else delete siteDraft.nav.hideOn;
  });
}

/** Per-page visibility of the announcement strip: it shows on all pages except those in nav.announcement.hideOn. */
function toggleAnnouncementOnPage(pageId, show) {
  if (!siteDraft.nav.announcement) return;
  siteMutate('nav', () => {
    const announcement = siteDraft.nav.announcement;
    const hide = new Set(announcement.hideOn ?? []);
    if (show) hide.delete(pageId); else hide.add(pageId);
    if (hide.size) announcement.hideOn = [...hide]; else delete announcement.hideOn;
  });
}

/** Whether the site's announcement strip is on, which is when its page switches mean anything. */
function announcementOn() {
  const a = siteDraft.nav?.announcement;
  return a?.show === true && typeof a.text === 'string' && a.text.trim() !== '';
}

/** How the menu is reached on a page it stays off (nav.hideMode); hidden leaves the file. */
function setNavHideMode(mode) {
  siteMutate('nav', () => {
    if (mode === 'hidden') delete siteDraft.nav.hideMode; else siteDraft.nav.hideMode = mode;
  });
}

/** Per-page visibility of the footer: it shows on all pages except those in footer.hideOn (the Footer panel and the page's settings). */
function toggleFooterOnPage(pageId, show) {
  footerMutate('footer', (f) => {
    const hide = new Set(f.hideOn ?? []);
    if (show) hide.delete(pageId); else hide.add(pageId);
    if (hide.size) f.hideOn = [...hide]; else delete f.hideOn;
  });
}

/** «Make front page»: the page takes / and the first place, the old front page its own id as its address (frontPageSwap); the menu's links follow. */
function makeFrontPage(id) {
  const chosen = siteDraft.pages.find((p) => p.id === id);
  const swap = frontPageSwap($state.snapshot(siteDraft.pages), id);
  if (!swap || !chosen) return null;
  const oldPath = chosen.path;
  const wasHidden = chosen.hidden === true;
  const published = publishedPathOf(id);
  siteMutate('pages', () => {
    siteDraft.pages = swap.pages;
    // The front page is never hidden.
    const front = siteDraft.pages.find((p) => p.id === id);
    if (front) delete front.hidden;
  });
  // The redirects follow in the same undo step: rules to the chosen page and its published address lead to /, and rules from its hidden path and swap.from go.
  redirectsState.mutateRedirects((rules) => {
    let next = pageMoved(rules, oldPath, '/');
    if (wasHidden) next = withoutFrom(next, oldPath);
    if (swap.from) next = withoutFrom(next, swap.from.path);
    if (published && published !== '/') next = withRule(next, published, '/', 301);
    return next;
  }, { push: false });
  return swap;
}

/** The title format of every page's browser tab and search result (site.titleFormat, seo.js); the default leaves the file. */
function setTitleFormat(value) {
  const format = titleFormatOf(value);
  siteMutate('edit:site-titleFormat', () => {
    if (format === 'page-site') delete siteDraft.site.titleFormat; else siteDraft.site.titleFormat = format;
  });
}

const TITLE_FORMAT_OPTIONS = $derived(TITLE_FORMATS.map((id) => [id, ta(`opt.titleFormat.${id}`)]));

/** How the menu is reached on a page it stays off (nav.hideMode), as the Nav panel and the page's settings offer it. */
const NAV_HIDE_MODE_OPTIONS = $derived(['hidden', 'hover', 'ghost', 'tab'].map((m) => [m, ta(`opt.navHide.${m}`)]));

/** A page's typed name or address by `<page id>:title` or `<page id>:slug`, shared by its fields, with the reason a write refused it; dropped as they close. */
let typedPageFields = $state({});

/** What a page's name or address field shows: the text typed into it, else the page's own. */
function pageFieldValue(entry, field) {
  const typed = typedPageFields[`${entry.id}:${field}`];
  if (typed) return typed.text;
  return field === 'title' ? entry.title : entry.path.slice(1);
}

/** Why the text in a page's name or address field was turned down, or null. */
function pageFieldError(id, field) {
  return typedPageFields[`${id}:${field}`]?.reason ?? null;
}

/** A keystroke in a page's name or address field: every field for it shows the text, and the red goes. */
function typePageField(id, field, text) {
  typedPageFields[`${id}:${field}`] = { text, reason: null };
}

/** A page's name or address field left or Entered: written, the field shows what stands; turned down, the text stays with its reason. */
function commitPageField(entry, field, text) {
  const key = `${entry.id}:${field}`;
  const reason = field === 'title' ? renamePage(entry, text) : setPageSlug(entry, text);
  if (reason) typedPageFields[key] = { text, reason };
  else delete typedPageFields[key];
}

/** The fields refill with what stands: the Pages panel or the page settings closed, or a publish went ahead past them. */
function dropTypedPageFields() {
  if (Object.keys(typedPageFields).length) typedPageFields = {};
}

/** The names and addresses typed but turned down, as publishing asks about them (lib/page-settings.js). */
function refusedPageFields() {
  return listRefused(typedPageFields, siteDraft.pages);
}

/** A page's new address; turned down, the reason for its field to show, otherwise null. */
function setPageSlug(entry, rawSlug) {
  const slug = slugify(rawSlug, '');
  if (entry.path === '/' || `/${slug}` === entry.path) return null;
  const err = slug ? pageSlugError(slug, entry.id) : ta('error.pageNeedsAddress');
  if (err) return err;
  // Only the address changes; the id, and with it the draft key, the file name and the menu's links, stays.
  const oldPath = entry.path;
  const published = publishedPathOf(entry.id);
  siteMutate('pages', () => {
    entry.path = `/${slug}`;
  });
  // The redirects follow in the same undo step: rules to the old address lead to the new, a hidden page's rule moves, and the published address keeps working.
  redirectsState.mutateRedirects((rules) => {
    let next = pageMoved(rules, oldPath, entry.path);
    if (entry.hidden) next = next.map((r) => (r.from === oldPath ? { ...r, from: entry.path } : r));
    // Never from /, which would hide the front page.
    if (published && published !== entry.path && published !== '/') next = withRule(next, published, entry.path, 301);
    return next;
  }, { push: false });
  return null;
}

/** The page's address on the published site, or null where the published site lacks the page or lists it hidden without its file (lib/not-live.js). */
function publishedPathOf(id) {
  if (stillNotLive(readNotLive(), site?.pages ?? []).has(id)) return null;
  return site?.pages?.find((p) => p.id === id)?.path ?? null;
}

/** Whether the address the published site knows for a page still leads to it (the page settings' switch under the address). */
function keepsOldAddress(entry) {
  const published = publishedPathOf(entry.id);
  return !!published && published !== '/' && redirectsState.redirectRules.some((r) => r.from === published);
}

/** The page settings' switch under the address: the published address kept working, or let go; never / (the old front page's), which would hide the front page. */
function setKeepOldAddress(entry, keep) {
  const published = publishedPathOf(entry.id);
  if (!published || published === entry.path || published === '/') return;
  redirectsState.mutateRedirects((rules) => (keep ? withRule(rules, published, entry.path, 301) : withoutFrom(rules, published)));
}

/** The pages a deleted or hidden page's visitors can be sent to: every shown page but the front page and itself, as [path, title]. */
function destinationsFor(entry) {
  return siteDraft.pages.filter((p) => p.id !== entry.id && p.path !== '/' && !p.hidden).map((p) => [p.path, p.title || p.id]);
}

/**
 * Hides a page from visitors or shows it again (pages[].hidden), in one undo step; hiding a published page asks where its visitors go, as a 302 redirect.
 */
async function setPageHidden(entry, hide) {
  if (!entry || entry.path === '/') return;
  if (!hide) {
    siteMutate('pages', () => { delete entry.hidden; });
    redirectsState.mutateRedirects((rules) => withoutFrom(rules, entry.path), { push: false });
    shellState.setStatus(ta('status.pageShown', { page: entry.title }));
    return;
  }
  let to = null;
  if (publishedPathOf(entry.id)) {
    const answer = await shellState.askDestination({
      title: ta('confirm.hidePage', { page: entry.title }),
      lead: ta('dest.leadHide', { path: entry.path }),
      okLabel: ta('ui.hidePage'),
      options: destinationsFor(entry),
    });
    if (!answer) return;
    to = answer.to;
  }
  siteMutate('pages', () => { entry.hidden = true; });
  redirectsState.mutateRedirects((rules) => (to ? withRule(rules, entry.path, to, 302) : withoutFrom(rules, entry.path)), { push: false });
  shellState.setStatus(ta('status.pageHidden', { page: entry.title }));
}

/** Where a hidden page's address sends its visitors: a path, or null for «not found». */
function hiddenTargetOf(entry) {
  return redirectsState.redirectRules.find((r) => r.from === entry.path)?.to ?? null;
}

/** The hidden page's row in its settings: its visitors sent elsewhere, or to «not found». */
function setHiddenTarget(entry, to) {
  redirectsState.mutateRedirects((rules) => (to ? withRule(rules, entry.path, to, 302) : withoutFrom(rules, entry.path)));
}

/**
 * Deletes a page in one undo step; a published page first asks where its visitors go, as a 301 redirect from its address that the rules to the page follow.
 */
async function deletePage(entry) {
  if (entry.path === '/') return; // the front page can never be deleted
  const published = publishedPathOf(entry.id);
  let to = null;
  if (published) {
    const answer = await shellState.askDestination({
      title: ta('confirm.deletePage', { page: entry.title }),
      lead: ta('dest.leadDelete', { path: published }),
      okLabel: ta('ui.deletePage'),
      options: destinationsFor(entry),
    });
    if (!answer) return;
    to = answer.to;
  }
  const path = entry.path;
  siteMutate('pages', () => {
    // The footer's privacy link goes with its page.
    if (siteDraft.footer?.privacyPage === entry.id) delete siteDraft.footer.privacyPage;
    if (siteDraft.site.commerce?.termsPage === entry.id) delete siteDraft.site.commerce.termsPage;
    siteDraft.pages = siteDraft.pages.filter((p) => p.id !== entry.id);
    // An item with a submenu outlives its page as an opener; submenu items to the page go, and an item left with no target or children goes.
    siteDraft.nav.items = siteDraft.nav.items.filter((i) => i.page !== entry.id || i.children);
    for (const item of siteDraft.nav.items) {
      if (item.page === entry.id) delete item.page;
      if (!item.children) continue;
      item.children = item.children.filter((c) => c.page !== entry.id);
      if (item.children.length === 0) delete item.children;
    }
    siteDraft.nav.items = siteDraft.nav.items.filter((i) => i.page || i.href || i.children);
  });
  redirectsState.mutateRedirects((rules) => {
    let next = withoutFrom(rules, path);
    if (!to) return next;
    next = pageMoved(next, path, to);
    return withRule(next, published, to, 301);
  }, { push: false });
  // The page's own draft is kept: Ctrl+Z restores everything.
  if (entry.id === pageState.pageId) pageState.selectPage(siteDraft.pages[0].id);
  shellState.setStatus(ta('status.pageRemoved'));
}

/**
 * The site icon baked by the image editor, and its kept original with the settings it is baked with, so a new edit starts from it; an empty icon takes both away.
 * @param {string} icon
 * @param {object|null} source
 */
function setSiteIcon(icon, source) {
  siteMutate('edit:site-icon', () => {
    if (icon) siteDraft.site.icon = icon;
    else delete siteDraft.site.icon;
    if (icon && source?.src) siteDraft.site.iconSource = source;
    else delete siteDraft.site.iconSource;
  });
}

/**
 * A logo baked by the image editor with its kept original, for the nav or the footer's brand; an empty logo takes both away and leaves the name in text.
 * @param {'nav'|'footer'} place
 * @param {string} image
 * @param {object|null} source
 */
function setLogoPicture(place, image, source) {
  const kept = image && source?.src ? source : null;
  if (place === 'footer') {
    footerMutate('footer', (f) => {
      if (!image) {
        if (!f.brand) return;
        delete f.brand.logo;
        delete f.brand.logoSource;
        delete f.brand.mode;
        delete f.brand.logoHeight;
        if (!f.brand.title && !f.brand.tagline) delete f.brand;
        return;
      }
      f.brand ??= {};
      f.brand.logo = image;
      if (!f.brand.mode) f.brand.mode = 'both';
      if (kept) f.brand.logoSource = kept;
      else delete f.brand.logoSource;
    });
    return;
  }
  siteMutate('nav', () => {
    const logo = siteDraft.nav.logo;
    // Without a picture the logo is the site's name, as the Nav panel's «Text» leaves it.
    if (!image) {
      if (logo.type === 'image') logo.value = siteDraft.site.title;
      logo.type = 'text';
      delete logo.image;
      delete logo.imageSource;
      return;
    }
    if (logo.type === 'text') logo.type = 'image';
    if (logo.type === 'both') logo.image = image;
    else logo.value = image;
    if (kept) logo.imageSource = kept;
    else delete logo.imageSource;
  });
}

/** Visitor measurement (site.analytics), published with the site; an empty token removes the field. */
function setAnalyticsToken(value) {
  const token = String(value ?? '').trim();
  siteMutate('edit:site-analytics', () => {
    if (token) siteDraft.analytics = { token };
    else delete siteDraft.analytics;
  });
}

/** The content width (site.layout.contentWidth, ADR-0018) the blocks' percentages are measured against; its model is lib/content-width.js. */
let layoutWidth = $derived(siteDraft?.layout?.contentWidth ?? WIDTH_DEFAULT);

/** The side margin in percent of the window width (vw), not px. */
let layoutGutter = $derived(siteDraft?.layout?.gutter ?? GUTTER_DEFAULT);

/** The visitor language (site.lang, ADR-0012): the legacy 'no' shows as bokmål, and a value outside the list stands as its own option at the top. */
function siteLangValue() {
  const cur = siteDraft.site.lang ?? 'no';
  return cur === 'no' ? 'nb' : cur;
}

function siteLangOptions() {
  const cur = siteLangValue();
  const options = shellState.sortLangs([...shellState.LANG_OPTIONS, ...shellState.sitePackLangs()]);
  const known = options.some(([code]) => code === cur);
  return [...(known ? [] : [[cur, cur]]), ...options];
}

/** The id of the site's calendar (site.calendars) whose card stands open in the Site panel; one at a time. */
let openSiteCalendar = $state(null);

/** The calendar whose name field gets the caret once its row stands open: the one just added. */
let focusSiteCalendar = $state(null);

const siteCalendars = () => siteDraft?.site?.calendars ?? [];

const siteCalendarById = (id) => siteCalendars().find((cal) => cal.id === id) ?? null;

/** The site's links (site.links, links-model.js): the owner's addresses with an icon, read by the footer, the menu's tools and the share block. */
const siteLinks = () => siteDraft?.site?.links ?? [];

/** The link whose label gets the caret once its row is drawn: the one just added. */
let focusSiteLink = $state(null);

/* The Site panel's folds open through lib/folds.svelte.js, read and set by the handle's siteCalendarsOpen, siteLinksOpen and siteShopOpen. */

/** Set by the shop's «Shop currency» link: the Site panel brings the currency field into view and focuses it, then clears it. */
let focusShopCurrency = $state(false);


function addSiteLink() {
  const link = { id: makeId('link'), icon: 'globe', label: '', url: '' };
  siteMutate('site', () => {
    siteDraft.site.links ??= [];
    siteDraft.site.links.push(link);
  });
  focusSiteLink = link.id;
  return link.id;
}

function removeSiteLink(i) {
  siteMutate('site', () => {
    siteDraft.site.links.splice(i, 1);
    if (!siteDraft.site.links.length) delete siteDraft.site.links;
  });
}

/** Moves a link from one place in the list to another, as the list editor's drag and keys do. */
function moveSiteLink(from, to) {
  siteMutate('site', () => {
    const list = siteDraft.site.links;
    if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) return;
    list.splice(to, 0, ...list.splice(from, 1));
  });
}

/** Writes the fields of `patch` onto a link; an empty value removes the field, except the address, which stays as a string. */
function setSiteLink(i, patch) {
  siteMutate(`edit:site-link-${i}`, () => {
    const link = siteDraft.site.links[i];
    for (const [key, value] of Object.entries(patch)) {
      if (value || key === 'url') link[key] = value;
      else delete link[key];
    }
  });
}

/** Adds a calendar and returns its id; `seed` carries an address, a name and a colour from a block's row. */
function addSiteCalendar(seed = {}) {
  const cal = { id: makeId('cal'), url: '', ...seed };
  // The list is read back after `??=`: the expression's own value is the raw array, which the draft's $state proxy does not see.
  siteMutate('site', () => {
    siteDraft.site.calendars ??= [];
    siteDraft.site.calendars.unshift(cal);
  });
  openSiteCalendar = cal.id;
  focusSiteCalendar = cal.id;
  folds.set('site', 'calendars', true);
  return cal.id;
}

/** The site's time zone (site.timeZone): stored only when Intl knows the name; an empty field removes it. */
let siteZoneBad = $state(false);
/** Whether the shop currency typed last is not a three-letter code (the Site panel marks the field). */
let siteCurrencyBad = $state(false);

// The Urd mark admin/index.html shows, for the admin tab of a site without an icon.
const URD_MARK_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

// The icon addresses let into the admin tab, as an anchored pattern: a base64 data:image, or a path on the site.
const SAFE_ICON_RE = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;

/* The link launcher (nav.launcher): the shortcuts behind its button. */

function clearLauncherImage(i) {
  siteMutate('nav', () => {
    if (i === null) delete siteDraft.nav.launcher.image;
    else delete siteDraft.nav.launcher.links[i].image;
  });
}

function footerMutate(key, fn) {
  siteMutate(key, () => {
    siteDraft.footer ??= { version: 1, show: false, text: '', align: 'center' };
    fn(siteDraft.footer);
  });
}

/** The «Back to top» button's design (site.layout.toTop.design, totop.js), in one undo step; the standard design is stored as nothing. */
function setToTopDesign(id) {
  if (!TOTOP_DESIGNS.includes(id)) return;
  siteMutate('site-totop', () => {
    const layout = (siteDraft.layout ??= {});
    const top = { ...(layout.toTop ?? {}) };
    if (id === TOTOP_DESIGNS[0]) delete top.design;
    else top.design = id;
    if (Object.keys(top).length) layout.toTop = top;
    else delete layout.toTop;
  });
}

/** A preset of the footer (footer-presets.js), one undo step: its look and the parts it shows, the footer's own content kept in each part it shows. */
function applyFooterPreset(id) {
  footerMutate('footer-preset', (f) => {
    const next = applyPreset($state.snapshot(f), presetSample(id, { ta, pages: siteDraft.pages ?? [], privacyPage: f.privacyPage ?? null }));
    for (const key of Object.keys(f)) delete f[key];
    Object.assign(f, next);
  });
}

function moveNavItemTo(from, to) {
  const items = siteDraft.nav.items;
  if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) return;
  siteMutate('nav', () => { const [it] = items.splice(from, 1); items.splice(to, 0, it); });
}

function moveNavChildTo(i, from, to) {
  const children = siteDraft.nav.items[i].children;
  if (from === to || from < 0 || to < 0 || from >= children.length || to >= children.length) return;
  siteMutate('nav', () => { const [it] = children.splice(from, 1); children.splice(to, 0, it); });
}

/** Inverts the lightness of a #rrggbb colour (HSL, L becomes 1 - L) for the alt theme's suggestion; anything else passes as it is. */
function invertLightness(hex) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex ?? '');
  if (!m) return hex;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
  }
  const li = 1 - l;
  const c = (1 - Math.abs(2 * li - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const mm = li - c / 2;
  const [rr, gg, bb] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x]
    : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  const toHex = (v) => Math.round((v + mm) * 255).toString(16).padStart(2, '0');
  return `#${toHex(rr)}${toHex(gg)}${toHex(bb)}`;
}

function suggestAltColors() {
  return Object.fromEntries(
    Object.entries(siteDraft.theme.tokens.color).map(([name, value]) => [name, invertLightness(value)]),
  );
}

function createAltTheme() {
  siteMutate('theme', () => {
    siteDraft.theme.alt = { tokens: { color: suggestAltColors() } };
  });
}

function reSuggestAltTheme() {
  siteMutate('theme', () => {
    siteDraft.theme.alt.tokens.color = suggestAltColors();
  });
}

function removeAltTheme() {
  siteMutate('theme', () => { delete siteDraft.theme.alt; });
}

/** Resolves a token value to hex for preview (token names are looked up in the palette). */
const themeHex = (v, pal) => (v && pal && pal[v]) ? pal[v] : v;

/* Ready-made theme suggestions: every colour token in light and dark at one click, fonts and radii untouched; Night is dark first, the rest light with a dark alt. */
const THEME_PRESET_KEYS = ['bg', 'surface', 'text', 'accent', 'accent-text'];

const THEME_PRESETS = $derived([
  { id: 'well', name: ta('themePreset.well.name'), note: ta('themePreset.well.note'),
    light: { bg: '#f6faf8', surface: '#ffffff', text: '#16211d', accent: '#15b39a', 'accent-text': '#04241d' },
    dark: { bg: '#0e1512', surface: '#17211d', text: '#eaf1ed', accent: '#22c3a8', 'accent-text': '#04241d' } },
  { id: 'stone', name: ta('themePreset.stone.name'), note: ta('themePreset.stone.note'),
    light: { bg: '#f4f2ed', surface: '#ffffff', text: '#262019', accent: '#8a5a41', 'accent-text': '#ffffff' },
    dark: { bg: '#17130e', surface: '#221c15', text: '#efe8dd', accent: '#c0906f', 'accent-text': '#1a1109' } },
  { id: 'plum', name: ta('themePreset.plum.name'), note: ta('themePreset.plum.note'),
    light: { bg: '#faf5ff', surface: '#ffffff', text: '#2a1546', accent: '#7c3aed', 'accent-text': '#ffffff' },
    dark: { bg: '#140f20', surface: '#1f1733', text: '#ece5f8', accent: '#a97cf6', 'accent-text': '#170a2c' } },
  { id: 'rose', name: ta('themePreset.rose.name'), note: ta('themePreset.rose.note'),
    light: { bg: '#faf5f6', surface: '#ffffff', text: '#241a1d', accent: '#b04a63', 'accent-text': '#ffffff' },
    dark: { bg: '#171015', surface: '#22181c', text: '#f1e6ea', accent: '#d98098', 'accent-text': '#2a0f18' } },
  { id: 'ocean', name: ta('themePreset.ocean.name'), note: ta('themePreset.ocean.note'),
    light: { bg: '#f1f6fb', surface: '#ffffff', text: '#13202b', accent: '#1a6fa8', 'accent-text': '#ffffff' },
    dark: { bg: '#0a1420', surface: '#12202f', text: '#e2edf5', accent: '#47a6df', 'accent-text': '#06131f' } },
  { id: 'night', name: ta('themePreset.night.name'), note: ta('themePreset.night.note'), scheme: 'dark',
    light: { bg: '#f5f6fb', surface: '#ffffff', text: '#171a2b', accent: '#4f5ed6', 'accent-text': '#ffffff' },
    dark: { bg: '#0d0f1a', surface: '#171b2e', text: '#e7e9f5', accent: '#8091ff', 'accent-text': '#0a0c18' } },
]);

/** Apply a theme suggestion: main mode + alt mode are filled from the palette. */
function applyThemePreset(pr) {
  siteMutate('theme', () => {
    const dark = pr.scheme === 'dark';
    const main = dark ? pr.dark : pr.light;
    const other = dark ? pr.light : pr.dark;
    for (const k of THEME_PRESET_KEYS) siteDraft.theme.tokens.color[k] = main[k];
    if (dark) siteDraft.theme.scheme = 'dark'; else delete siteDraft.theme.scheme;
    siteDraft.theme.alt = { tokens: { color: { ...other } } };
  });
}

/** Which suggestion matches the current palette (for highlighting); null once the owner has fine-tuned. */
const activeThemePreset = $derived.by(() => {
  if (!siteDraft) return null;
  const cur = siteDraft.theme.tokens.color;
  const alt = siteDraft.theme.alt?.tokens?.color ?? {};
  const dark = siteDraft.theme.scheme === 'dark';
  return THEME_PRESETS.find((pr) => {
    const main = dark ? pr.dark : pr.light;
    const other = dark ? pr.light : pr.dark;
    return THEME_PRESET_KEYS.every((k) => cur[k] === main[k] && alt[k] === other[k]);
  })?.id ?? null;
});

/** The effects of this module, run once by the shell at its start. */
export function effects() {

  // The Site panel's fields asked for are focused once the panel is drawn (shellState.panelDrawn), its code loaded on demand.
  $effect(() => {
    const id = focusSiteCalendar;
    if (!id || !shellState.panelDrawn) return;
    focusSiteCalendar = null;
    tick().then(() => document.querySelector(`[data-cal-name="${id}"]`)?.focus());
  });

  $effect(() => {
    if (!focusShopCurrency || !shellState.panelDrawn) return;
    focusShopCurrency = false;
    tick().then(() => {
      const field = document.querySelector('[data-field="shop-currency"]');
      field?.scrollIntoView({ block: 'nearest' });
      field?.focus({ preventScroll: true });
    });
  });

  $effect(() => {
    const id = focusSiteLink;
    if (!id || !shellState.panelDrawn) return;
    focusSiteLink = null;
    tick().then(() => document.querySelector(`[data-link-label="${id}"]`)?.focus());
  });

  $effect(() => {
    // Until the draft is loaded, favicon-boot.js sets the tab's icon.
    if (!siteDraft?.site) return;
    const href = siteDraft.site.icon;
    const link = document.querySelector('link[rel="icon"]');
    if (!link) return;
    if (typeof href !== 'string' || !href) {
      link.href = URD_MARK_ICON;
      return;
    }
    if (!SAFE_ICON_RE.test(href)) return;
    link.href = href;
  });
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const siteState = {
  BG_TYPES,
  BG_DEFS,
  get site() { return site; },
  set site(v) { site = v; },
  get grid() { return grid; },
  set grid(v) { grid = v; },
  get bindsFrom() { return bindsFrom; },
  set bindsFrom(v) { bindsFrom = v; },
  get siteStore() { return siteStore; },
  set siteStore(v) { siteStore = v; },
  get siteDraft() { return siteDraft; },
  set siteDraft(v) { siteDraft = v; },
  linkSiteDraft,
  pushSiteToPreview,
  navBgMutate,
  navBgCtx,
  footerBgCtx,
  get previewPalette() { return previewPalette; },
  themeSwatches,
  setGrid,
  siteMutate,
  addColourSet,
  renameColourSet,
  addSetColour,
  removeSetColour,
  deleteColourSet,
  readSiteColours,
  readSitePictures,
  toggleShortcut,
  setUpdateNotice,
  get newPageTitle() { return newPageTitle; },
  set newPageTitle(v) { newPageTitle = v; },
  get newPageTemplate() { return newPageTemplate; },
  set newPageTemplate(v) { newPageTemplate = v; },
  RESERVED_SLUGS,
  pageSlugError,
  addPage,
  savePageAsTemplate,
  duplicatePage,
  renamePage,
  setPageNoindex,
  toggleNavOnPage,
  toggleAnnouncementOnPage,
  announcementOn,
  setNavHideMode,
  toggleFooterOnPage,
  makeFrontPage,
  setTitleFormat,
  get TITLE_FORMAT_OPTIONS() { return TITLE_FORMAT_OPTIONS; },
  get NAV_HIDE_MODE_OPTIONS() { return NAV_HIDE_MODE_OPTIONS; },
  setPageSlug,
  keepsOldAddress,
  setKeepOldAddress,
  setPageHidden,
  hiddenTargetOf,
  setHiddenTarget,
  publishedPathOf,
  pageFieldValue,
  pageFieldError,
  typePageField,
  commitPageField,
  dropTypedPageFields,
  refusedPageFields,
  deletePage,
  setSiteIcon,
  setLogoPicture,
  setAnalyticsToken,
  get layoutWidth() { return layoutWidth; },
  set layoutWidth(v) { layoutWidth = v; },
  get layoutGutter() { return layoutGutter; },
  set layoutGutter(v) { layoutGutter = v; },
  siteLangValue,
  siteLangOptions,
  get siteCalendarsOpen() { return folds.isOpen('site', 'calendars'); },
  set siteCalendarsOpen(v) { folds.set('site', 'calendars', v); },
  get siteShopOpen() { return folds.isOpen('site', 'shop'); },
  set siteShopOpen(v) { folds.set('site', 'shop', v); },
  get focusShopCurrency() { return focusShopCurrency; },
  set focusShopCurrency(v) { focusShopCurrency = v; },
  get openSiteCalendar() { return openSiteCalendar; },
  set openSiteCalendar(v) { openSiteCalendar = v; },
  get focusSiteCalendar() { return focusSiteCalendar; },
  set focusSiteCalendar(v) { focusSiteCalendar = v; },
  siteLinks,
  addSiteLink,
  removeSiteLink,
  moveSiteLink,
  setSiteLink,
  get focusSiteLink() { return focusSiteLink; },
  set focusSiteLink(v) { focusSiteLink = v; },
  get siteLinksOpen() { return folds.isOpen('site', 'links'); },
  set siteLinksOpen(v) { folds.set('site', 'links', v); },
  siteCalendars,
  siteCalendarById,
  addSiteCalendar,
  get siteZoneBad() { return siteZoneBad; },
  set siteZoneBad(v) { siteZoneBad = v; },
  get siteCurrencyBad() { return siteCurrencyBad; },
  set siteCurrencyBad(v) { siteCurrencyBad = v; },
  URD_MARK_ICON,
  SAFE_ICON_RE,
  clearLauncherImage,
  footerMutate,
  applyFooterPreset,
  setToTopDesign,
  moveNavItemTo,
  moveNavChildTo,
  invertLightness,
  suggestAltColors,
  createAltTheme,
  reSuggestAltTheme,
  removeAltTheme,
  themeHex,
  THEME_PRESET_KEYS,
  get THEME_PRESETS() { return THEME_PRESETS; },
  applyThemePreset,
  get activeThemePreset() { return activeThemePreset; },
  effects,
};
