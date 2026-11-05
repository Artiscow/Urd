/**
 * The site draft: site.json, its mutators for the nav, the footer and the theme, the grid, the pages list with their slugs and search text, the icon, the calendars, the theme suggestions, and the background contexts.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { colorLayer } from '$engine/backgrounds/color.js';
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
import { frontPageSwap, refusedPageFields as listRefused } from '../lib/page-settings.js';
import { TITLE_FORMATS, titleFormatOf } from '$engine/seo.js';
import { activeTokens } from '$engine/theme.js';
import { ta } from '$engine/i18n.js';
import { slugify } from '$engine/imageTools.js';
import { buildPagePreset } from '$engine/page-presets.js';
import { clonePageForInsert } from '$engine/templates-model.js';
import { liftPageFile } from '$engine/migrate.js';
import { makeId } from '$engine/sections/presets.js';
import { tick } from 'svelte';
import { historyState } from './history.svelte.js';
import { pageState } from './page.svelte.js';
import { previewState } from './preview.svelte.js';
import { shellState } from './shell.svelte.js';
import { templatesState } from './templates.svelte.js';
import { redirectsState } from './redirects.svelte.js';
import { pageMoved, withRule, withoutFrom } from '../lib/redirects-model.js';

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

/** The window width from which the content actually reaches the design
 *  width. Shown under the sample, since it is not "width plus margins"
 *  when the margin is relative. */
let bindsFrom = $derived(bindingWidth(layoutWidth, layoutGutter));

let siteStore = null;

/**
 * Reactive mirror of the site DRAFT (pages, nav, theme): the panels read
 * and mutate this. `site` is the PUBLISHED state and is only used as the
 * diff baseline when publishing (deleted/moved pages).
 */
let siteDraft = $state(null);

/** Links siteDraft and siteStore to the same object (via the Svelte proxy). */
function linkSiteDraft() {
  siteDraft = siteStore.data;
  siteStore.replace(siteDraft);
}

/**
 * The site draft for the preview. ALWAYS through this: siteDraft is a
 * Svelte proxy, and postMessage (structured clone) throws DataCloneError
 * on proxies - $state.snapshot yields a plain object.
 */
function pushSiteToPreview() {
  previewState.bridge?.sendSite($state.snapshot(siteDraft));
}

/* The slideshow layer: the image list is edited like the other
   background layers, but with multi-select upload (the whole batch in
   ONE undo step). */

/** The bg contexts for the three targets (section/nav/footer). The
 *  section uses the sectionBg mirror; nav/footer read reactively from
 *  siteDraft. */
function navBgMutate(key, fn) {
  siteMutate(key, () => { siteDraft.nav.style ??= {}; fn(siteDraft.nav.style); });
}

const navBgCtx = { mutate: navBgMutate, keyPrefix: 'navbg', keyId: 'nav' };

const footerBgCtx = { mutate: footerMutate, keyPrefix: 'footerbg', keyId: 'footer' };

/** The palette as the canvas actually shows it (active mode, alt merge via the engine). */
const previewPalette = $derived(siteDraft?.theme ? (activeTokens(siteDraft.theme, previewState.previewMode).color ?? {}) : {});

/** The theme colors as quick picks in the color picker (the picker
 *  resolves token names itself, so no hexFor conversion is needed).
 *  The samples follow the preview's active light/dark mode. */
const themeSwatches = () => Object.entries(previewPalette);

/** The grid controls: changes are stored in the site draft and pushed
 *  live. The grid is only a snapping tool; changing it never moves content. */
function setGrid(field, value) {
  historyState.pushHistory('grid:site');
  grid = { ...grid, [field]: value };
  siteStore.data.grid = { ...siteStore.data.grid, [field]: value };
  siteStore.save();
  historyState.updateDirty();
  pushSiteToPreview();
  // sendSite rerenders the page; turn the grid overlay back on afterwards
  // (postMessage is ordered, so this arrives after the rerender).
  if (shellState.gridOn) previewState.bridge?.sendShowGrid(true);
}

/**
 * Shared flow for all site changes from the panels (pages, nav, theme):
 * history BEFORE the mutation, then save, mark and push live to the
 * preview. Keys with the edit: prefix are merged in the undo history
 * (bursts of keystrokes/color drags become one undo step).
 */
/** A change to the site draft as one undo step; `pages` names other pages whose drafts the change writes as well, so the step holds them (history.svelte.js pushHistory). */
function siteMutate(key, fn, { pages } = {}) {
  historyState.pushHistory(key, pages ? { pages } : undefined);
  fn();
  siteStore.save();
  historyState.updateDirty();
  pushSiteToPreview();
}

/** Pins a command into the site's shared shortcuts, or takes it out (site.shortcuts, the command palette's first group for everyone who edits the site); a pin the list cannot take (lib/command-palette.js togglePinned) changes nothing. */
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

/* "New page from template": the grid below the create field picks what
   the next new page starts from; null is a blank page, a 'preset:<id>'
   is a built-in starter pack, anything else is a user page template. */
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

/** A new page from the name typed (newPageTitle) and the template picked; turned down, the reason for its field to show, otherwise null. */
function addPage() {
  const title = newPageTitle.trim();
  // No fallback word: a name without a letter or a digit is turned down.
  const slug = slugify(title, '');
  const err = pageSlugError(slug);
  if (err) return err;
  // Starter packs are built fresh (create() yields new ids and
  // translated seeds); user templates store origin ids, so the clone
  // re-ids everything and sets meta to the new page (the re-id rule in
  // SCHEMA.md). The liftPageFile wash makes templates stored under older
  // schema versions safe.
  const templatePage = newPageTemplate && !newPageTemplate.startsWith('preset:')
    ? templatesState.templateStores[newPageTemplate]?.data?.page : null;
  const fresh = newPageTemplate?.startsWith('preset:')
    ? (buildPagePreset(newPageTemplate.slice(7), { pageId: slug, title }) ?? pageState.blankPage({ id: slug, title }))
    : templatePage
      ? clonePageForInsert(liftPageFile(JSON.parse(JSON.stringify(templatePage)), siteStore.data), makeId, { id: slug, title })
      : pageState.blankPage({ id: slug, title });
  siteMutate('pages', () => {
    siteDraft.pages.push({ id: slug, title, path: `/${slug}`, file: `content/pages/${slug}.json` });
    // New pages go straight into the menu; the Nav panel can remove them.
    siteDraft.nav.items.push({ label: title, page: slug });
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

/** The page settings' «Duplicate the page»: the page as it stands, under a copy's title and the next free slug, opened as a draft; the copy stays out of the menu until the Nav panel adds it. */
async function duplicatePage(entry) {
  const source = entry.id === pageState.pageId
    ? JSON.parse(JSON.stringify(pageState.store.data))
    : await pageState.readPageDraft(entry);
  const slug = copySlug(entry.id, siteDraft.pages);
  const title = ta('page.copyTitle', { title: entry.title });
  const fresh = clonePageForInsert(source, makeId, { id: slug, title });
  siteMutate('pages', () => {
    siteDraft.pages.push({ id: slug, title, path: `/${slug}`, file: `content/pages/${slug}.json` });
  });
  shellState.writeDraftKey(`urd-draft-${slug}`, JSON.stringify(fresh));
  historyState.updateDirty();
  // The page switch clears the status line, so the word about the copy comes after it.
  await pageState.selectPage(slug);
  shellState.setStatus(ta('status.pageDuplicated', { title }));
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
    previewState.bridge?.sendPage(pageState.pageId, pageState.store.data);
  } else {
    pageState.patchPageDraft(entry, (p) => { p.meta.title = title; });
  }
  return null;
}

/** Hide from search engines: the flag lives in the PAGE REGISTRY
 *  (site.json), so publishing can filter the sitemap without loading all
 *  the page files. Any page by its id; the open page without one. */
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

/** Per-page visibility of the announcement strip: it shows on all pages except those in nav.announcement.hideOn (the Nav panel's Announcement group and the page's settings). */
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

/** «Make front page»: the page takes / and the first place, the old front page its own id as its address (lib/page-settings.js frontPageSwap); the menu's links point at the pages and follow. */
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
  // In the same undo step the redirects follow: the rules that led to the chosen page lead to /, a hidden page's own rule goes with its hiding, its published address is sent to /, and a rule from the old front page's new address goes.
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

/** A page's name or address as it is typed, by `<page id>:title` or `<page id>:slug`, shared by every field that shows it (the Pages panel's row and the page settings): the text, and the reason once the write turned it down. Dropped as the Pages panel or the page settings close, so the fields show what stands again. */
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
  // Only the address changes; the id (and thus the draft key and file
  // name) remains, so internal references (nav) never break. Publishing
  // cleans the old address's index.html via the diff against the
  // published site.json.
  const oldPath = entry.path;
  const published = publishedPathOf(entry.id);
  siteMutate('pages', () => {
    entry.path = `/${slug}`;
  });
  // In the same undo step, the redirects follow the page: the rules that led to the old address lead to the new one, a hidden page's own rule moves with it, and the address the published site knows keeps working (on by default; the page settings' switch takes it away).
  redirectsState.mutateRedirects((rules) => {
    let next = pageMoved(rules, oldPath, entry.path);
    if (entry.hidden) next = next.map((r) => (r.from === oldPath ? { ...r, from: entry.path } : r));
    // Never from /, which would hide the front page.
    if (published && published !== entry.path && published !== '/') next = withRule(next, published, entry.path, 301);
    return next;
  }, { push: false });
  return null;
}

/** The address a page has on the published site, or null for a page the published site does not have; a page hidden there has one too, answering with its redirect. */
function publishedPathOf(id) {
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
 * Hides a page from visitors, or shows it again (pages[].hidden): a hidden page stays in the admin, but publishing leaves it out of the nav, the sitemap and its address.
 * Hiding a page the published site shows asks where its visitors go; the answer is a temporary (302) redirect from its address, which showing the page again takes away. All in one undo step.
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
 * Deletes a page; one the published site shows asks first where its visitors go, and the answer is a permanent redirect from its address, the rules that led to the page following it. One undo step.
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
    siteDraft.pages = siteDraft.pages.filter((p) => p.id !== entry.id);
    // Items with a submenu survive their own page being deleted: the
    // target is removed and the item becomes a pure opener, so the
    // children (which can point to living pages) do not vanish silently.
    // Submenu items that pointed to the page are cleaned up; items left
    // with neither target nor children are removed entirely.
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
 * The site icon (favicon) and its kept original: the icon baked by the image editor (a small WebP, materialized on publish) and the original with the settings it is baked with, so a new edit starts from the original. An empty icon takes both away.
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
 * A logo baked by the image editor, with its kept original: the nav's (in `value` for an image logo, `image` beside the text, and an image logo when it was text alone) or the footer's brand (`logo`, shown with the title when no mode was chosen). An empty logo takes both away and leaves the name in text, as the panels' own remove does.
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

/** Visitor measurement (site.analytics): a site value published with the
 *  site, edited behind the gear; an empty token removes the field. */
function setAnalyticsToken(value) {
  const token = String(value ?? '').trim();
  siteMutate('edit:site-analytics', () => {
    if (token) siteDraft.analytics = { token };
    else delete siteDraft.analytics;
  });
}

/** The content width (site.layout.contentWidth, ADR-0018): the design
 *  width the blocks' percentages are measured against. The model
 *  (limits, quick picks, reference screens, band calculation) lives as
 *  pure functions in lib/content-width.js, so the sample computes on
 *  the same thing the engine does. */
let layoutWidth = $derived(siteDraft?.layout?.contentWidth ?? 1440);

/** The side margin in percent of the window width (vw), not px. */
let layoutGutter = $derived(siteDraft?.layout?.gutter ?? 6);

/** The visitor language (site.lang, ADR-0012): the legacy value 'no' is
 *  shown as Bokmål; a hand-edited value outside the list is preserved as
 *  its own option at the top so opening the panel breaks nothing. */
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

/** The site's calendars (site.calendars): registered once with their settings, and picked by the calendar blocks as references. */
let siteCalendarsOpen = $state(false);

/** The id of the calendar whose row stands open in the Site panel; one at a time. */
let openSiteCalendar = $state(null);

/** A calendar's colour as CSS for a swatch: a hex value as it is, a theme token through its variable, none as the accent the engine falls back to. */
/** The calendar whose name field gets the caret once its row stands open: the one just added. */
let focusSiteCalendar = $state(null);

const siteCalendars = () => siteDraft?.site?.calendars ?? [];

const siteCalendarById = (id) => siteCalendars().find((cal) => cal.id === id) ?? null;

/** The site's links (site.links, links-model.js): the owner's addresses with an icon, read by the footer, the menu's tools and the share block. */
const siteLinks = () => siteDraft?.site?.links ?? [];

/** The link whose label gets the caret once its row is drawn: the one just added. */
let focusSiteLink = $state(null);

/** Whether the Site panel's Links group stands open; the buttons that lead there open it. */
let siteLinksOpen = $state(false);

let siteMediaOpen = $state(false);
/** The Shop group of the Site panel, opened from the shop's blocks (the shop currency). */
let siteShopOpen = $state(false);
/** Set by the shop's «Shop currency» link: the Site panel brings the currency field into view and focuses it, then clears it. */
let focusShopCurrency = $state(false);

/** Whether the Site panel's contact details group is open; the Footer panel opens it with «Edit contact details». */
let siteContactOpen = $state(false);

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

function moveSiteLink(i, dir) {
  const j = i + dir;
  siteMutate('site', () => {
    const list = siteDraft.site.links;
    if (j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
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
  siteCalendarsOpen = true;
  return cal.id;
}

/** The site's time zone (site.timeZone): stored only when Intl knows the name; an empty field removes it. */
let siteZoneBad = $state(false);
/** Whether the shop currency typed last is not a three-letter code (the Site panel marks the field). */
let siteCurrencyBad = $state(false);

// The admin tab shows the site icon when it exists, otherwise the Urd
// mark (same SVG as in admin/index.html; it cannot be read from the
// link element, because favicon-boot.js may already have swapped it).
// Only known icon shapes are let through (data:image or a site-relative
// path), so draft data can never become an active URL.
const URD_MARK_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

// Anchored regex instead of startsWith: CodeQL recognizes RegExp.test as
// a barrier, so the alerts on this flow are closed.
const SAFE_ICON_RE = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;

/* The link launcher (nav.launcher): the shortcuts behind the launcher
 * button. The last removed shortcut takes the object with it, so a site
 * without a launcher carries no field. */

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

/* Rich footer (additive): brand, columns, social links, bottom line and
 * background. Mirrors the nav handlers, but through footerMutate. */

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

/** Inverts the lightness of a #rrggbb color (HSL: L -> 1-L); anything
 *  else passes untouched. Used as a SUGGESTION for the alt theme - the
 *  owner adjusts it afterwards. */
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

/* Ready-made theme suggestions: fill all color tokens + light/dark in
   one click, then the owner fine-tunes freely (a starting point, like
   the section themes). Fonts/radii are untouched. Natt is dark-first
   (scheme dark); the rest are light with a dark alt. */
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

  $effect(() => {
    const id = focusSiteCalendar;
    if (!id) return;
    focusSiteCalendar = null;
    tick().then(() => document.querySelector(`[data-cal-name="${id}"]`)?.focus());
  });

  $effect(() => {
    if (!focusShopCurrency) return;
    focusShopCurrency = false;
    tick().then(() => {
      const field = document.querySelector('[data-field="shop-currency"]');
      field?.scrollIntoView({ block: 'nearest' });
      field?.focus({ preventScroll: true });
    });
  });

  $effect(() => {
    const id = focusSiteLink;
    if (!id) return;
    focusSiteLink = null;
    tick().then(() => document.querySelector(`[data-link-label="${id}"]`)?.focus());
  });

  $effect(() => {
    // Until the draft is loaded, favicon-boot.js controls the tab;
    // touching it here would make the icon flash.
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
  get siteCalendarsOpen() { return siteCalendarsOpen; },
  set siteCalendarsOpen(v) { siteCalendarsOpen = v; },
  get siteShopOpen() { return siteShopOpen; },
  set siteShopOpen(v) { siteShopOpen = v; },
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
  get siteLinksOpen() { return siteLinksOpen; },
  set siteLinksOpen(v) { siteLinksOpen = v; },
  get siteMediaOpen() { return siteMediaOpen; },
  set siteMediaOpen(v) { siteMediaOpen = v; },
  get siteContactOpen() { return siteContactOpen; },
  set siteContactOpen(v) { siteContactOpen = v; },
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
