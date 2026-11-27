/**
 * Publishing (editor/src/state/publish.svelte.js) run in node against a stand-in publishing layer: what a publish commits, what it waits for, and what it leaves standing where the commit is refused.
 * The state modules are compiled through tests/_svelte-loader.mjs, as tests/app-render.test.mjs does, and the deploy wait after a commit is left out.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import './_svelte-loader.mjs';

const memory = new Map();
globalThis.localStorage = { getItem: (k) => memory.get(k) ?? null, setItem: (k, v) => memory.set(k, String(v)), removeItem: (k) => memory.delete(k) };
globalThis.window = globalThis;
globalThis.innerWidth = 1600;
globalThis.innerHeight = 900;
globalThis.matchMedia ??= () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
globalThis.location ??= { search: '', origin: 'http://localhost', href: 'http://localhost/admin/' };
globalThis.navigator ??= { language: 'nb' };
globalThis.document ??= { documentElement: { dataset: {}, style: { setProperty() {} }, classList: { add() {}, remove() {}, toggle() {} } }, addEventListener() {}, removeEventListener() {}, querySelector: () => null, querySelectorAll: () => [] };

const { publishState } = await import('../editor/src/state/publish.svelte.js');
const { siteState } = await import('../editor/src/state/site.svelte.js');
const { pageState } = await import('../editor/src/state/page.svelte.js');
const { shellState } = await import('../editor/src/state/shell.svelte.js');
const { updaterState } = await import('../editor/src/state/updater.svelte.js');
const { pluginsState } = await import('../editor/src/state/plugins.svelte.js');
const { redirectsState } = await import('../editor/src/state/redirects.svelte.js');
const { collectionsState } = await import('../editor/src/state/collections.svelte.js');
const { createDraftStore } = await import('../editor/src/lib/draftStore.js');
const { parseHostFile } = await import('../editor/src/lib/redirects-model.js');
const { liftSiteFile, liftPageFile } = await import('$engine/migrate.js');
const { ta } = await import('$engine/i18n.js');

const editorFile = (path) => readFileSync(new URL(`../editor/src/${path}`, import.meta.url), 'utf8');
const content = (path) => JSON.parse(readFileSync(new URL(`../template/content/${path}`, import.meta.url), 'utf8'));
const clone = (value) => JSON.parse(JSON.stringify(value));

const SITE = liftSiteFile(content('site.json'));
const OM_OSS = liftPageFile(content('pages/om-oss.json'), SITE);
/** A picture not yet published, as an upload leaves it in a draft. */
const PICTURE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGNgYGD4DwABBAEAwS2OUAAAAABJRU5ErkJggg==';

// The wait for the deploy polls the site for minutes; a test has seen the commit by then.
updaterState.awaitPublishDeploy = () => {};
/** The question before a publish where a test expects none: it fails the test with the headings it would have asked. */
const unasked = async ({ sections = [] }) => assert.fail(`publishing asked: ${sections.map((s) => s.heading).join(', ')}`);

/**
 * The stand-in publishing layer: the HEAD the editor loaded on, the root index.html, the repository's `_redirects` and the commit's answer; every other address is not found.
 * @returns {{calls: string[], body: object|null, file(path: string): object|undefined}}
 */
function layer({ commit = 200, head = 'h1', latest = null, redirects } = {}) {
  const seen = {
    calls: [],
    body: null,
    file: (path) => seen.body?.files.find((f) => f.path === path),
  };
  globalThis.fetch = async (url, init = {}) => {
    const path = String(url);
    seen.calls.push(path);
    if (path === '/index.html') return new Response('<!doctype html><title>Site</title>');
    if (path.startsWith('/api/github/latest')) return Response.json(latest ?? { head });
    if (path === '/api/github/redirects') {
      if (redirects === undefined) throw new TypeError('the publishing layer cannot be reached');
      return Response.json({ text: redirects });
    }
    if (path === '/api/github/commit') {
      seen.body = JSON.parse(init.body);
      return Response.json(commit === 200 ? { sha: 'h2' } : { code: 'headMoved' }, { status: commit });
    }
    return new Response('', { status: 404 });
  };
  return seen;
}

/** The editor on the published site, with the site settings' draft and the stored drafts of the pages named; the conflict check's baseline is h1. */
function editing({ published = SITE, draft = published, pages = {} } = {}) {
  memory.clear();
  shellState.askConfirm = unasked;
  pageState.pageId = null;
  pageState.store = null;
  siteState.site = clone(published);
  siteState.siteStore = createDraftStore('urd-draft-site', () => siteState.site);
  siteState.siteStore.replace(clone(draft));
  siteState.siteStore.saveNow();
  siteState.linkSiteDraft();
  for (const [id, doc] of Object.entries(pages)) memory.set(`urd-draft-${id}`, JSON.stringify(doc));
  updaterState.baseSha = 'h1';
}

test('a commit refused as another publish came in leaves every draft and the base it was checked against as they stood', async () => {
  const draft = { ...SITE, site: { ...SITE.site, title: 'A new name' } };
  const page = clone(OM_OSS);
  page.sections[0].blocks.find((b) => b.type === 'text').props.text = '<p>New words</p>';
  editing({ draft, pages: { 'om-oss': page } });
  const stored = [...memory];
  let seen = layer({ commit: 409 });
  await publishState.publish();
  assert.ok(seen.file('content/site.json') && seen.file('content/pages/om-oss.json'), 'the commit was asked for with both');
  assert.equal(seen.body.expect, 'h1', 'held to the HEAD the check saw');
  assert.equal(shellState.status, ta('status.publishRace'));
  assert.deepEqual([...memory], stored, 'every stored draft stands');
  assert.equal(updaterState.baseSha, 'h1', 'and so does the base, so a retry checks again');
  assert.equal(siteState.siteStore.hasDraft(), true);
  assert.equal(siteState.siteDraft.site.title, 'A new name');

  // The same publish let through takes the drafts that went and moves the base.
  editing({ draft, pages: { 'om-oss': page } });
  seen = layer();
  await publishState.publish();
  assert.equal(memory.has('urd-draft-site'), false);
  assert.equal(memory.has('urd-draft-om-oss'), false);
  assert.equal(updaterState.baseSha, 'h2');
});

test('the pictures go out as files of their own while the drafts in memory keep them as they were until the commit is in', async () => {
  const page = clone(OM_OSS);
  const image = page.sections[0].blocks.find((b) => b.type === 'image');
  image.props.src = PICTURE;
  const draft = { ...SITE, site: { ...SITE.site, icon: PICTURE } };
  editing({ draft });
  pageState.pageId = 'om-oss';
  pageState.store = createDraftStore('urd-draft-om-oss', () => OM_OSS);
  pageState.store.replace(page);
  pageState.store.saveNow();
  let seen = layer({ commit: 409 });
  await publishState.publish();
  const media = seen.body.files.filter((f) => f.path.startsWith('media/') && f.encoding === 'base64');
  assert.ok(media.length >= 1, 'the picture is a file in the commit');
  const sent = JSON.parse(seen.file('content/pages/om-oss.json').content);
  assert.match(sent.sections[0].blocks.find((b) => b.id === image.id).props.src, /^\/media\//, 'the page that goes names the file');
  assert.match(JSON.parse(seen.file('content/site.json').content).site.icon, /^\/media\//, 'and so do the site settings');
  assert.equal(pageState.store.data.sections[0].blocks.find((b) => b.id === image.id).props.src, PICTURE, 'the open page in memory keeps the picture');
  assert.equal(siteState.siteDraft.site.icon, PICTURE, 'and the site settings');

  // Once the commit is in, the drafts in memory name the files too.
  seen = layer();
  await publishState.publish();
  assert.match(pageState.store.data.sections[0].blocks.find((b) => b.id === image.id).props.src, /^\/media\//);
  assert.match(siteState.siteDraft.site.icon, /^\/media\//);
});

test('two pages that swap their addresses keep both copies: a path the commit writes is never deleted in it', async () => {
  const swapped = { ...SITE, pages: SITE.pages.map((p) => (p.id === 'om-oss' ? { ...p, path: '/kontakt' } : p.id === 'kontakt' ? { ...p, path: '/om-oss' } : p)).filter((p) => p.id !== 'kaker') };
  editing({ draft: swapped });
  const seen = layer({ commit: 409 });
  await publishState.publish();
  for (const path of ['om-oss/index.html', 'kontakt/index.html']) {
    const file = seen.file(path);
    assert.ok(file && !file.delete && typeof file.content === 'string', `${path} is written`);
  }
  assert.equal(seen.file('kaker/index.html')?.delete, true, 'a page taken away loses its copy');
  assert.equal(seen.file('content/pages/kaker.json')?.delete, true, 'and its file');
  const written = new Set(seen.body.files.filter((f) => !f.delete).map((f) => f.path));
  assert.deepEqual(seen.body.files.filter((f) => f.delete && written.has(f.path)), []);
});

test('a new page never goes out without its page file: a blank one is published where its draft is missing', async () => {
  const entry = { id: 'new-page', title: 'New page', path: '/new-page', file: 'content/pages/new-page.json' };
  editing({ draft: { ...SITE, pages: [...SITE.pages, entry] } });
  const seen = layer({ commit: 409 });
  await publishState.publish();
  const file = seen.file('content/pages/new-page.json');
  assert.ok(file && !file.delete, 'the page file goes with its entry');
  const sent = JSON.parse(file.content);
  assert.equal(sent.meta.id, 'new-page');
  assert.ok(Array.isArray(sent.sections) && sent.sections.length >= 1, 'a blank page with a section');
  assert.ok(seen.file('new-page/index.html'), 'beside its address copy');
  assert.ok(JSON.parse(seen.file('content/site.json').content).pages.some((p) => p.id === 'new-page'));
});

test('publishing waits while an update deploys, and after a revert until the admin is loaded again', async () => {
  const draft = { ...SITE, site: { ...SITE.site, title: 'A new name' } };
  for (const [flag, message] of [['updateBusy', 'update.publishBlocked'], ['revertedSinceLoad', 'status.revertReloadBeforePublish']]) {
    editing({ draft });
    const seen = layer();
    updaterState[flag] = true;
    try {
      await publishState.publish();
    } finally {
      updaterState[flag] = false;
    }
    assert.equal(seen.body, null, `${flag}: nothing is committed`);
    assert.deepEqual(seen.calls, [], `${flag}: nothing is read for a commit`);
    assert.equal(shellState.status, ta(message), flag);
    assert.equal(siteState.siteStore.hasDraft(), true, `${flag}: the draft waits`);
  }
  // Only a revert sets the mark, and nothing in the editor clears it: a reload starts the module anew.
  const updater = editorFile('state/updater.svelte.js');
  assert.match(updater, /^let revertedSinceLoad = false;$/m);
  const panel = editorFile('panels/HistoryPanel.svelte');
  assert.match(panel, /if \(res\.ok\) \{[^\n]*\n(?:[^\n]*\n){0,4}?\s*ed\.revertedSinceLoad = true;/, 'set once the revert is in');
  const { readdirSync } = await import('node:fs');
  const sources = readdirSync(new URL('../editor/src/', import.meta.url), { recursive: true }).filter((name) => /\.(js|svelte)$/.test(name));
  for (const name of sources) {
    const text = editorFile(name);
    for (const [, value] of text.matchAll(/revertedSinceLoad = ([^;\n]+)/g)) {
      if (name === 'state/updater.svelte.js') assert.ok(value === 'false' || value === 'v', `${name}: ${value}`);
      else assert.equal(value, 'true', `${name}: only ever set`);
    }
  }
});

test('the conflict check asks the owner where it has no baseline or a cut-off list of changes, and a publish waits for the answer', async () => {
  const mine = [{ path: 'content/site.json', content: '{}' }];
  layer({ head: 'h9' });
  updaterState.baseSha = null;
  let checked = await updaterState.checkConflict(mine);
  assert.equal(checked.head, 'h9', 'HEAD is read for the commit to be held to');
  assert.equal(checked.warning?.heading, ta('confirm.conflictUnknown.title'));

  updaterState.baseSha = 'h1';
  layer({ latest: { head: 'h2', truncated: true, changedFiles: [] } });
  checked = await updaterState.checkConflict(mine);
  assert.equal(checked.head, 'h2');
  assert.equal(checked.warning?.heading, ta('confirm.conflict.title'));
  assert.ok(checked.warning.lines.includes(`• ${ta('confirm.conflict.truncated')}`));

  // A full list that names none of the files is no question.
  layer({ latest: { head: 'h2', changedFiles: ['content/pages/kaker.json'] } });
  assert.deepEqual(await updaterState.checkConflict(mine), { head: 'h2', warning: null });

  editing({ draft: { ...SITE, site: { ...SITE.site, title: 'A new name' } } });
  updaterState.baseSha = null;
  const asked = [];
  shellState.askConfirm = async (question) => { asked.push(question); return false; };
  const seen = layer();
  await publishState.publish();
  assert.equal(seen.body, null, 'nothing is committed without the answer');
  assert.ok(asked[0]?.sections.some((s) => s.heading === ta('confirm.conflictUnknown.title')), 'the question names it');
});

test('`_redirects` is written only once the repository\'s own has been read, and a file written by hand joins the list', async () => {
  // The list is read where the site has none, and the repository's file cannot be reached.
  editing();
  layer();
  await redirectsState.initRedirects();
  assert.equal(redirectsState.hostFileKnown, false);
  const rule = parseHostFile('/old-page /kontakt 301').rules[0];
  redirectsState.mutateRedirects((rules) => [...rules, rule], { push: false });
  const asked = [];
  shellState.askConfirm = async (question) => { asked.push(question); return true; };
  let seen = layer({ commit: 409 });
  await publishState.publish();
  assert.equal(seen.file('_redirects'), undefined, 'no host file over rules not seen');
  assert.equal(seen.file('content/redirects.json'), undefined, 'and the list waits with it');
  assert.ok(asked[0]?.sections.some((s) => s.lines.includes(ta('confirm.redirects.wait'))), 'the owner is told');
  assert.equal(redirectsState.redirectsStore.hasDraft(), true);

  // Readable, the hand-written rules join the list and both go out.
  shellState.askConfirm = async () => true;
  seen = layer({ commit: 409, redirects: '/older /om-oss 301\n' });
  await publishState.publish();
  assert.equal(redirectsState.hostFileKnown, true);
  const host = seen.file('_redirects')?.content ?? '';
  assert.match(host, /^\/older \/om-oss 301$/m, 'the rule written by hand stays');
  assert.match(host, /^\/old-page \/kontakt 301$/m, 'beside the draft\'s own');
  assert.ok(seen.file('content/redirects.json'));
});

test('a removed plugin\'s mark lives in the draft alone: plugins.json goes out without it, its folder is deleted, and the published list never holds it', async () => {
  editing();
  pluginsState.pluginsStore = createDraftStore('urd-draft-plugins', () => ({ version: 1, enabled: ['lang-sv', 'old-pack'] }));
  pluginsState.pluginsStore.replace({ version: 1, enabled: ['lang-sv'], disabled: [], remove: ['old-pack'] });
  pluginsState.pluginsStore.saveNow();
  let seen = layer({ commit: 409 });
  await publishState.publish();
  assert.deepEqual(JSON.parse(seen.file('plugins/plugins.json').content), { version: 1, enabled: ['lang-sv'], disabled: [] });
  assert.equal(seen.file('plugins/old-pack')?.delete, true);
  assert.deepEqual(JSON.parse(memory.get('urd-draft-plugins')).remove, ['old-pack'], 'the draft keeps the mark while it waits');

  seen = layer();
  await publishState.publish();
  assert.equal('remove' in pluginsState.pluginsStore.published(), false, 'the published list the next draft is held to');
  assert.equal('remove' in pluginsState.pluginsStore.data, false);
  assert.equal(pluginsState.pluginsStore.hasDraft(), false);
  pluginsState.pluginsStore = null;
  // The Plugins panel writes the mark into the draft, the store the publish reads.
  const remove = editorFile('state/plugins.svelte.js').split('function removePlugin(id) {')[1].split('\n}\n')[0];
  assert.match(remove, /const d = pluginsStore\.data;[\s\S]*d\.remove = \[/);
});

test('a page or site draft from a newer engine is thrown away for the published file as the editor opens it, and never goes out', async () => {
  const { PAGE_SCHEMA_VERSION } = await import('$engine/migrate.js');
  const published = content('pages/kontakt.json');
  editing({ pages: { kontakt: { ...clone(published), schemaVersion: PAGE_SCHEMA_VERSION + 1, meta: { ...published.meta, title: 'From a newer Urd' } } } });
  globalThis.fetch = async (url) => (String(url) === '/content/pages/kontakt.json' ? Response.json(published) : new Response('', { status: 404 }));
  await pageState.selectPage('kontakt');
  assert.deepEqual(pageState.store.data, liftPageFile(published, SITE), 'the page opens as published');
  assert.equal(pageState.store.hasDraft(), false);
  assert.equal(memory.has('urd-draft-kontakt'), false, 'and the draft is gone');
  const seen = layer({ commit: 409 });
  await publishState.publish();
  assert.ok(seen.body);
  assert.equal(seen.file('content/pages/kontakt.json'), undefined);

  // The site settings' draft the same way, before it is lifted, stored or shown.
  const shell = editorFile('state/shell.svelte.js');
  assert.match(shell, /^import \{[^}]*\bSITE_SCHEMA_VERSION\b[^}]*\} from '\$engine\/migrate\.js';$/m);
  const init = shell.split('async function init() {')[1].split('\n}\n')[0];
  const made = init.indexOf("siteState.siteStore = createDraftStore('urd-draft-site', () => siteState.site, draftSaveError);");
  const guard = init.match(/\n  if \(\(siteState\.siteStore\.data\.schemaVersion \?\? 1\) > SITE_SCHEMA_VERSION\) \{([\s\S]*?)\n  \}\n/);
  assert.ok(made > 0 && guard && init.indexOf(guard[0]) > made, 'checked as the store is made');
  assert.match(guard[1], /\n    siteState\.siteStore\.replace\(\$state\.snapshot\(siteState\.site\)\);$/, 'for the published settings');
  for (const step of ['siteState.siteStore.replace(liftSiteFile(siteState.siteStore.data));', 'siteState.siteStore.save();', 'siteState.linkSiteDraft();']) {
    assert.ok(init.indexOf(step) > init.indexOf(guard[0]), step);
  }
});

test('once a revert is live, the drafts here and the saved drafts are discarded before the admin reloads, and past the deadline nothing is', async () => {
  const panel = editorFile('panels/HistoryPanel.svelte');
  const start = panel.indexOf('\n  async function awaitRevertDeploy(') + 1;
  assert.ok(start > 0, 'awaitRevertDeploy is found');
  const source = panel.slice(start, panel.indexOf('\n  }\n', start) + 4);
  const run = async ({ live }) => {
    const done = [];
    let served = 'before';
    const storage = { 'urd-draft-hjem': '{}', 'urd-draft-site': '{}', 'urd-admin-theme': 'dark' };
    Object.defineProperty(storage, 'removeItem', { value: (key) => { done.push(`remove ${key}`); delete storage[key]; } });
    // Each poll's wait: the deploy goes live during the first where the test says so.
    const wait = (resolve, ms) => {
      if (ms === 10_000 && live) served = 'after';
      resolve();
    };
    const awaitRevertDeploy = new Function('siteDraft', 'fetch', 'setTimeout', 'setStatus', 'ta', 'ed', 'cancelWaitingDrafts', 'localStorage', 'location', `${source}\nreturn awaitRevertDeploy;`)(
      { pages: [{ file: 'content/pages/hjem.json' }] }, async () => new Response(served), wait, (text, kind) => done.push(`status ${kind}`), (key) => key,
      { discardSaved: async () => { await null; done.push('discard saved'); } }, () => done.push('cancel waiting'), storage, { reload: () => done.push('reload') });
    await awaitRevertDeploy();
    return { done, kept: Object.keys(storage) };
  };
  const live = await run({ live: true });
  assert.deepEqual(live.done.filter((step) => step === 'reload'), ['reload'], 'the admin reloads once');
  assert.equal(live.done.at(-1), 'reload', 'and last');
  for (const step of ['discard saved', 'cancel waiting', 'remove urd-draft-hjem', 'remove urd-draft-site']) {
    assert.ok(live.done.includes(step), step);
  }
  assert.deepEqual(live.kept, ['urd-admin-theme'], 'only the drafts go');
  const late = await run({ live: false });
  assert.deepEqual(late.done, ['status error'], 'past the deadline the drafts stay and nothing reloads');
  assert.equal(late.kept.length, 3);
});

// Last: once the index could not be read, the collections stay out of editing and publishing until a reload.
test('while the collections\' index cannot be read, a publish writes and deletes nothing of them', async () => {
  editing();
  globalThis.fetch = async (url) => {
    if (String(url) === '/content/samlinger.json') throw new TypeError('offline');
    return new Response('', { status: 404 });
  };
  await collectionsState.initCollections();
  assert.equal(collectionsState.collectionsUnavailable, true);
  // Stores as a draft left them: a changed collection, an index with a draft and a legacy index.
  const news = createDraftStore('urd-draft-collection-news', () => null);
  news.replace({ schemaVersion: 1, id: 'news', name: 'News', kind: 'news', entries: [] });
  news.saveNow();
  collectionsState.collectionStores = { news };
  collectionsState.collectionsIndexStore = createDraftStore('urd-draft-collections:index', () => ({ version: 1, samlinger: ['old'] }));
  collectionsState.collectionsIndexStore.replace({ version: 1, samlinger: ['news'] });
  collectionsState.collectionsIndexStore.saveNow();
  collectionsState.legacyIndexIds = ['older'];
  const seen = layer({ commit: 409 });
  await publishState.publish();
  assert.ok(seen.body, 'the rest goes');
  assert.deepEqual(seen.body.files.filter((f) => f.path.startsWith('content/samlinger') || f.path === 'content/collections.json'), []);
});
