/**
 * Pictures from a shared folder: the address parsing in the engine
 * (photo-source.js) and the guards in the routes that fetch them
 * (functions/_lib/photos.js). The fetching itself is tested in the browser
 * and against the real services in the test rounds; what is tested here is
 * what the site is willing to ask for at all.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
import {
  imageWidth, photoLimit, photoSort, byName, hostAllowed, safeTarget, allowedHosts,
  GOOGLE_ID, SHARE_TOKEN, SHARE_FILE, PUBLIC_HOST, MAX_PHOTOS, IMAGE_WIDTHS,
} from '../template/functions/_lib/photos.js';

const {
  parsePhotoSource, photosApiUrl, folderPhotos, clampFolderMax, folderAddress,
  loadFolderPhotos, peekFolderPhotos, picturesFor, photoWidth, photoSrcAt,
  folderOrder, seededShuffle, orderPhotos,
  PHOTO_PROVIDERS, FOLDER_MAX, FOLDER_POOL, FOLDER_ORDERS, PHOTO_WIDTHS,
} = await engineImport('photo-source.js');
const { slideshowLayer } = await engineImport('backgrounds/slideshow.js');
const { isSafeImage } = await engineImport('nav-model.js');

test('parsePhotoSource: a Google Drive folder, however the link is pasted', () => {
  const id = '1A2b3C4d5E6f7G8h9I0jKlMnOpQ';
  assert.deepEqual(parsePhotoSource(`https://drive.google.com/drive/folders/${id}`), { provider: 'drive', id });
  assert.deepEqual(parsePhotoSource(`https://drive.google.com/drive/folders/${id}?usp=sharing`), { provider: 'drive', id });
  assert.deepEqual(parsePhotoSource(`https://drive.google.com/drive/u/0/folders/${id}`), { provider: 'drive', id });
  assert.deepEqual(parsePhotoSource(`https://drive.google.com/open?id=${id}`), { provider: 'drive', id });
  assert.deepEqual(parsePhotoSource(`  ${id}  `), { provider: 'drive', id }, 'the bare id the Drive interface offers');
});

test('parsePhotoSource: a Google Photos shared album, long link and short', () => {
  assert.deepEqual(parsePhotoSource('https://photos.google.com/share/AF1QipMabcdefgh123'),
    { provider: 'gphotos', id: 'AF1QipMabcdefgh123' });
  assert.deepEqual(parsePhotoSource('https://photos.app.goo.gl/aBcDeF12'),
    { provider: 'gphotos', id: 's:aBcDeF12' });
  // The album key belongs to the address and has to be carried along.
  const keyed = parsePhotoSource('https://photos.google.com/share/AF1QipMabcdefgh123?key=xY12345678abcd');
  assert.equal(keyed.host, 'xY12345678abcd');
});

test('parsePhotoSource: a Nextcloud or ownCloud public share', () => {
  assert.deepEqual(parsePhotoSource('https://sky.example.org/s/abcDEF123456'),
    { provider: 'nextcloud', id: 'abcDEF123456', host: 'sky.example.org' });
  assert.deepEqual(parsePhotoSource('https://sky.example.org/index.php/s/abcDEF123456'),
    { provider: 'nextcloud', id: 'abcDEF123456', host: 'sky.example.org' });
});

test('parsePhotoSource: any other address that answers with a list', () => {
  assert.deepEqual(parsePhotoSource('https://bilder.example.org/album/sommer.json'),
    { provider: 'json', url: 'https://bilder.example.org/album/sommer.json' });
});

test('parsePhotoSource: what is refused', () => {
  for (const bad of [
    '', '   ', null, 42,
    'http://drive.google.com/drive/folders/1A2b3C4d5E6f7G8h9I0jKlMnOpQ',   // not https
    'https://user:pass@sky.example.org/s/abcDEF123456',                     // sign-in in the address
    'https://sky.example.org:8443/s/abcDEF123456',                          // a port
    'https://drive.google.com/drive/folders/../../etc',                     // not an id
    'https://drive.evil.test/drive/folders/1A2b3C4d5E6f7G8h9I0jKlMnOpQ',    // a host that merely looks like it
    'https://127.0.0.1/s/abcDEF123456',                                     // an address literal
    'https://bilder.example.org/album.xml',                                 // not a list we read
    'javascript:alert(1)',
  ]) {
    assert.equal(parsePhotoSource(bad), null, `should be refused: ${String(bad)}`);
  }
});

test('photosApiUrl: the call goes to this site, asks for the pool, and carries only what was parsed', () => {
  const url = photosApiUrl(parsePhotoSource('https://sky.example.org/s/abcDEF123456'), 'newest');
  assert.ok(url.startsWith('/api/photos?'), url);
  const q = new URLSearchParams(url.slice(url.indexOf('?') + 1));
  assert.equal(q.get('p'), 'nextcloud');
  assert.equal(q.get('id'), 'abcDEF123456');
  assert.equal(q.get('host'), 'sky.example.org');
  assert.equal(q.get('sort'), 'newest');
  assert.equal(q.get('max'), String(FOLDER_POOL), 'the pool, whatever is shown');
  // The random draw is the browser's: the proxy is asked for the name order.
  assert.equal(new URLSearchParams(photosApiUrl({ provider: 'drive', id: 'x' }, 'random').split('?')[1]).get('sort'), 'name');
  assert.equal(photosApiUrl(null, 'name'), null);
  assert.equal(photosApiUrl({ provider: 'ftp', id: 'x' }, 'name'), null);
});

test('the order: a seeded draw holds still for one seed and moves for the next', () => {
  assert.deepEqual(FOLDER_ORDERS, ['name', 'newest', 'random']);
  assert.equal(folderOrder('random'), 'random');
  assert.equal(folderOrder('oldest'), 'name');
  assert.equal(folderOrder(undefined), 'name');
  const list = Array.from({ length: 30 }, (_, i) => ({ src: `/api/photo?p=drive&id=pic${i}` }));
  const a = seededShuffle(list, 7);
  const b = seededShuffle(list, 7);
  const c = seededShuffle(list, 8);
  assert.deepEqual(a, b);
  assert.notDeepEqual(a, c);
  assert.notDeepEqual(a, list, 'thirty items do not come back in place');
  assert.deepEqual([...a].sort((x, y) => x.src.localeCompare(y.src)), [...list].sort((x, y) => x.src.localeCompare(y.src)), 'nothing lost, nothing doubled');
  assert.notEqual(a, list, 'a new list, the given one untouched');
  assert.deepEqual(orderPhotos(list, 'name', 7), list);
  assert.deepEqual(orderPhotos(list, 'newest', 7), list, 'the proxy sorted these; they are kept as they came');
  assert.deepEqual(orderPhotos(list, 'random', 7), a);
});

test('the routes: the sort and the natural name order', () => {
  assert.equal(photoSort('newest'), 'newest');
  assert.equal(photoSort('random'), 'name', 'the draw is never the proxy\'s');
  assert.equal(photoSort(null), 'name');
  const names = [{ name: 'bilde 10.jpg' }, { name: 'Bilde 2.jpg' }, { name: 'bilde 1.jpg' }].sort(byName).map((p) => p.name);
  assert.deepEqual(names, ['bilde 1.jpg', 'Bilde 2.jpg', 'bilde 10.jpg']);
  assert.equal(MAX_PHOTOS, FOLDER_POOL, 'the proxy answers with exactly the pool the browser asks for');
});

test('clampFolderMax and folderAddress', () => {
  assert.equal(clampFolderMax(12), 12);
  assert.equal(clampFolderMax(0), FOLDER_MAX.dflt);
  assert.equal(clampFolderMax(500), FOLDER_MAX.max);
  assert.equal(clampFolderMax('mange'), FOLDER_MAX.dflt);
  assert.equal(folderAddress({ source: 'folder', folder: '  x  ' }), 'x');
  assert.equal(folderAddress({ source: 'upload', folder: 'x' }), '');
  assert.equal(folderAddress({}), '');
  assert.deepEqual(PHOTO_PROVIDERS, ['drive', 'gphotos', 'nextcloud', 'json']);
});

test('folderPhotos: only paths this site serves are taken from the answer', () => {
  const data = { photos: [
    { src: '/api/photo?p=drive&id=abc', name: 'sommer.jpg' },
    { src: 'https://lh3.googleusercontent.com/d/abc', name: 'straight from the host' },
    { src: '/media/local.webp' },
    { name: 'no source' },
    { src: '/api/photo?p=g&u=https%3A%2F%2Flh3.googleusercontent.com%2Fpw%2Fx' },
  ] };
  const out = folderPhotos(data, 24);
  assert.deepEqual(out.map((p) => p.src), ['/api/photo?p=drive&id=abc', '/api/photo?p=g&u=https%3A%2F%2Flh3.googleusercontent.com%2Fpw%2Fx']);
  assert.equal(out[0].name, 'sommer.jpg');
  assert.equal(out[1].name, '');
  assert.deepEqual(folderPhotos(null), []);
  assert.equal(folderPhotos({ photos: Array(40).fill({ src: '/api/photo?p=drive&id=abc' }) }, 5).length, 5);
  assert.equal(folderPhotos({ photos: Array(300).fill({ src: '/api/photo?p=drive&id=abc' }) }).length, FOLDER_POOL);
});

test('the width follows the use: the ladder is shared, and a frame asks for its own step', () => {
  // The engine and the routes must agree on the steps, or a layer would ask
  // for a width the route snaps somewhere else.
  assert.deepEqual(PHOTO_WIDTHS, IMAGE_WIDTHS);
  // The first step that is not smaller, so a picture is never scaled up.
  assert.equal(photoWidth(300), 480);
  assert.equal(photoWidth(480), 480);
  assert.equal(photoWidth(500), 800);
  assert.equal(photoWidth(400, 2), 800);
  assert.equal(photoWidth(1440, 2), 2000, 'capped at the top of the ladder');
  assert.equal(photoWidth(1600), 1600);
  assert.equal(photoWidth(0), 480);
  assert.equal(photoWidth('bred', 'skarp'), 480);
  // A frame a quarter of a laptop window wide is a small picture, a hero the whole window.
  assert.equal(photoWidth(1280 * 0.24), 480);
  assert.equal(photoWidth(1280, 1), 1600);
  // Only the site's own route takes a width; everything else is left alone.
  assert.equal(photoSrcAt('/api/photo?p=drive&id=abc', 800), '/api/photo?p=drive&id=abc&w=800');
  assert.equal(photoSrcAt('/api/photo?p=drive&id=abc&w=480', 1600), '/api/photo?p=drive&id=abc&w=1600', 'a width already there is replaced');
  assert.equal(photoSrcAt('/media/own.webp', 800), '/media/own.webp');
  assert.equal(photoSrcAt('data:image/svg+xml,x', 800), 'data:image/svg+xml,x');
  assert.equal(isSafeImage(photoSrcAt('/api/photo?p=g&u=https%3A%2F%2Flh3.googleusercontent.com%2Fpw%2Fx', 1200)), true);
});

test('the pictures pass the shared image guard, which nothing else with a query does', () => {
  assert.equal(isSafeImage('/api/photo?p=drive&id=abc_-123'), true);
  assert.equal(isSafeImage('/api/photo?p=g&u=https%3A%2F%2Flh3.googleusercontent.com%2Fpw%2Fx'), true);
  assert.equal(isSafeImage('/api/other?x=1'), false);
  assert.equal(isSafeImage('/api/photo?x=") ; background:url(evil.test'), false);
  assert.equal(isSafeImage('https://lh3.googleusercontent.com/d/abc'), false);
});

test('the routes: the width ladder and the picture cap', () => {
  assert.equal(imageWidth(1600), 1600);
  assert.equal(imageWidth(1500), 1600);
  assert.equal(imageWidth(10), 480);
  assert.equal(imageWidth(99999), 2000);
  assert.equal(imageWidth('bred'), 1600);
  // The list route builds its paths without a width: absent means full, never
  // the smallest step.
  assert.equal(imageWidth(null), 1600);
  assert.equal(imageWidth(undefined), 1600);
  assert.equal(imageWidth(''), 1600);
  assert.equal(photoLimit(10), 10);
  assert.equal(photoLimit(0), 24);
  assert.equal(photoLimit(9000), MAX_PHOTOS);
});

test('the routes: only the allowlist and the hosts a route chose itself', () => {
  const env = { PHOTO_HOSTS: ' Sky.Example.org , bilder.example.org ' };
  assert.deepEqual([...allowedHosts(env)], ['sky.example.org', 'bilder.example.org']);
  assert.equal(hostAllowed(env, 'SKY.EXAMPLE.ORG'), true);
  assert.equal(hostAllowed(env, 'evil.test'), false);
  assert.equal(hostAllowed({}, 'sky.example.org'), false);
  // Google's hosts are not a standing exception: a route names the one it
  // fetches from, and nothing a caller sends can widen that.
  assert.equal(hostAllowed(env, 'lh3.googleusercontent.com'), false);
  assert.equal(hostAllowed(env, 'www.googleapis.com'), false);
  assert.equal(hostAllowed(env, 'lh3.googleusercontent.com', ['lh3.googleusercontent.com']), true);
});

test('the routes: safeTarget refuses everything that is not a plain https host on the list', () => {
  const env = { PHOTO_HOSTS: 'bilder.example.org' };
  assert.equal(safeTarget('https://bilder.example.org/a.json', env).hostname, 'bilder.example.org');
  assert.equal(safeTarget('http://bilder.example.org/a.json', env), null);
  assert.equal(safeTarget('https://bilder.example.org:8443/a.json', env), null);
  assert.equal(safeTarget('https://u:p@bilder.example.org/a.json', env), null);
  assert.equal(safeTarget('https://192.168.0.5/a.json', env), null);
  assert.equal(safeTarget('https://evil.test/a.json', env), null);
  assert.equal(safeTarget('not a url', env), null);
  // With `only`, the route's own hosts decide and the allowlist is not consulted.
  assert.equal(safeTarget('https://lh3.googleusercontent.com/pw/x', {}, ['lh3.googleusercontent.com']).hostname, 'lh3.googleusercontent.com');
  assert.equal(safeTarget('https://bilder.example.org/a.jpg', env, ['lh3.googleusercontent.com']), null);
  // Without it, Google's hosts are not reachable through the open providers.
  assert.equal(safeTarget('https://www.googleapis.com/drive/v3/files', env), null);
});

test('the routes: the id, token and file shapes', () => {
  assert.equal(GOOGLE_ID.test('1A2b3C4d5E6f7G8h9I0jKlMnOpQ'), true);
  assert.equal(GOOGLE_ID.test('short'), false);
  assert.equal(GOOGLE_ID.test('../../etc/passwd'), false);
  assert.equal(SHARE_TOKEN.test('abcDEF123456'), true);
  assert.equal(SHARE_TOKEN.test('abc/def'), false);
  assert.equal(SHARE_FILE.test('sommer 2026.jpg'), true);
  assert.equal(SHARE_FILE.test('../secret.jpg'), false);
  assert.equal(SHARE_FILE.test('a/b.jpg'), false);
  assert.equal(PUBLIC_HOST.test('sky.example.org'), true);
  assert.equal(PUBLIC_HOST.test('localhost'), false);
  assert.equal(PUBLIC_HOST.test('10.0.0.1'), false);
});

/* ---------- The routes themselves, with the upstream stood in for ---------- */

const { onRequestGet: listRoute } = await import('../template/functions/api/photos.js');
const { onRequestGet: byteRoute } = await import('../template/functions/api/photo.js');

const call = (route, url, env = {}, headers = {}) => route({ request: new Request(url, { headers }), env });

/** Stands in for the folder host for one call, and records what was asked. */
async function withUpstream(answer, run) {
  const real = globalThis.fetch;
  const seen = [];
  globalThis.fetch = async (target, init) => {
    seen.push({ url: String(target), method: init?.method ?? 'GET', headers: init?.headers ?? {} });
    return typeof answer === 'function' ? answer(String(target)) : answer;
  };
  try {
    return { result: await run(), seen };
  } finally {
    globalThis.fetch = real;
  }
}

const jsonRes = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

test('the list route: Drive needs the key, and answers with paths on this site', async () => {
  const folder = '1A2b3C4d5E6f7G8h9I0jKlMnOpQ';
  const bare = await call(listRoute, `https://site.test/api/photos?p=drive&id=${folder}&max=5`);
  assert.equal(bare.status, 403);
  assert.equal((await bare.json()).code, 'photoKeyMissing');

  const files = { files: [
    { id: 'AAA111bbb222ccc', name: 'sommer.jpg', imageMediaMetadata: { width: 4000, height: 3000 } },
    { id: 'short', name: 'not an id' },
  ] };
  const { result, seen } = await withUpstream(jsonRes(files), () =>
    call(listRoute, `https://site.test/api/photos?p=drive&id=${folder}&max=5&sort=newest`, { DRIVE_API_KEY: 'k1' }));
  assert.equal(result.status, 200);
  const body = await result.json();
  assert.deepEqual(body.photos.map((p) => p.src), ['/api/photo?p=drive&id=AAA111bbb222ccc']);
  assert.equal(body.photos[0].w, 4000);
  // The key goes to Google, never to the browser, and Drive does the sorting.
  const asked = new URL(seen[0].url);
  assert.equal(asked.origin + asked.pathname, 'https://www.googleapis.com/drive/v3/files');
  assert.equal(asked.searchParams.get('key'), 'k1');
  assert.equal(asked.searchParams.get('orderBy'), 'modifiedTime desc');
  assert.equal(JSON.stringify(body).includes('k1'), false);
  const { seen: byNameSeen } = await withUpstream(jsonRes(files), () =>
    call(listRoute, `https://site.test/api/photos?p=drive&id=${folder}&max=5`, { DRIVE_API_KEY: 'k1' }));
  assert.equal(new URL(byNameSeen[0].url).searchParams.get('orderBy'), 'name_natural');
});

test('the list route: an unknown address, and a host waiting for the allowlist', async () => {
  const bad = await call(listRoute, 'https://site.test/api/photos?p=drive&id=../etc');
  assert.equal(bad.status, 400);
  assert.equal((await bad.json()).code, 'photoFolderUnknown');

  const unknown = await call(listRoute, 'https://site.test/api/photos?p=sftp&id=abcdefghijkl');
  assert.equal((await unknown.json()).code, 'photoFolderUnknown');

  const share = await call(listRoute, 'https://site.test/api/photos?p=nextcloud&host=sky.example.org&id=abcDEF123456');
  assert.equal(share.status, 403);
  assert.equal((await share.json()).code, 'photoHostNotAllowed');
});

test('the list route: a Nextcloud share is listed over WebDAV, pictures only', async () => {
  const xml = `<?xml version="1.0"?><d:multistatus xmlns:d="DAV:">
    <d:response><d:href>/public.php/webdav/</d:href></d:response>
    <d:response><d:href>/public.php/webdav/sommer%202026.jpg</d:href><d:propstat><d:prop><d:getlastmodified>Mon, 01 Jun 2026 10:00:00 GMT</d:getlastmodified></d:prop></d:propstat></d:response>
    <d:response><d:href>/public.php/webdav/notat.txt</d:href></d:response>
    <d:response><d:href>/public.php/webdav/host.png</d:href><d:propstat><d:prop><d:getlastmodified>Tue, 01 Sep 2026 10:00:00 GMT</d:getlastmodified></d:prop></d:propstat></d:response>
    <d:response><d:href>/public.php/webdav/bilde%2010.jpg</d:href><d:propstat><d:prop><d:getlastmodified>Wed, 01 Jul 2026 10:00:00 GMT</d:getlastmodified></d:prop></d:propstat></d:response>
  </d:multistatus>`;
  const env = { PHOTO_HOSTS: 'sky.example.org' };
  const { result, seen } = await withUpstream(new Response(xml, { status: 207 }), () =>
    call(listRoute, 'https://site.test/api/photos?p=nextcloud&host=sky.example.org&id=abcDEF123456&max=9', env));
  const body = await result.json();
  assert.deepEqual(body.photos.map((p) => p.name), ['bilde 10.jpg', 'host.png', 'sommer 2026.jpg'], 'by natural name');
  assert.ok(body.photos[0].src.startsWith('/api/photo?p=nextcloud&host=sky.example.org&id=abcDEF123456&file='));
  assert.equal(seen[0].method, 'PROPFIND');
  assert.equal(seen[0].url, 'https://sky.example.org/public.php/webdav/');
  const { result: newest } = await withUpstream(new Response(xml, { status: 207 }), () =>
    call(listRoute, 'https://site.test/api/photos?p=nextcloud&host=sky.example.org&id=abcDEF123456&sort=newest', env));
  assert.deepEqual((await newest.json()).photos.map((p) => p.name), ['host.png', 'bilde 10.jpg', 'sommer 2026.jpg'], 'newest first');
});

test('the list route: a JSON list may only point at hosts that are allowed', async () => {
  const answer = jsonRes({ photos: [
    { src: 'https://bilder.example.org/a.jpg', name: 'a' },
    'https://bilder.example.org/b.jpg',
    'https://evil.test/c.jpg',
  ] });
  const { result } = await withUpstream(answer, () =>
    call(listRoute, 'https://site.test/api/photos?p=json&url=https%3A%2F%2Fbilder.example.org%2Falbum.json',
      { PHOTO_HOSTS: 'bilder.example.org' }));
  const body = await result.json();
  assert.equal(body.photos.length, 2, 'the picture on a host outside the list is dropped');
  assert.ok(body.photos.every((p) => p.src.startsWith('/api/photo?p=u&u=https%3A%2F%2Fbilder.example.org')));
});

test('the byte route: a Drive picture is fetched at a capped width, as an image', async () => {
  const png = new Response(new Uint8Array([1, 2, 3]), { status: 200, headers: { 'content-type': 'image/png' } });
  const { result, seen } = await withUpstream(png, () =>
    call(byteRoute, 'https://site.test/api/photo?p=drive&id=AAA111bbb222ccc&w=1500'));
  assert.equal(result.status, 200);
  assert.equal(result.headers.get('content-type'), 'image/png');
  assert.equal(result.headers.get('x-content-type-options'), 'nosniff');
  assert.match(result.headers.get('cache-control'), /s-maxage=/);
  assert.equal(seen[0].url, 'https://lh3.googleusercontent.com/d/AAA111bbb222ccc=w1600');
});

test('the byte route: what it refuses', async () => {
  const bad = await call(byteRoute, 'https://site.test/api/photo?p=drive&id=../etc');
  assert.equal((await bad.json()).code, 'photoBadAddress');

  const host = await call(byteRoute, 'https://site.test/api/photo?p=g&u=https%3A%2F%2Fevil.test%2Fa.jpg');
  assert.equal((await host.json()).code, 'photoBadAddress');

  const { result } = await withUpstream(new Response('<html>', { status: 200, headers: { 'content-type': 'text/html' } }), () =>
    call(byteRoute, 'https://site.test/api/photo?p=drive&id=AAA111bbb222ccc'));
  assert.equal(result.status, 502);
  assert.equal((await result.json()).code, 'photoNotImage');

  const big = new Response(new Uint8Array([1]), { status: 200, headers: { 'content-type': 'image/png', 'content-length': '99000000' } });
  const { result: tooBig } = await withUpstream(big, () =>
    call(byteRoute, 'https://site.test/api/photo?p=drive&id=AAA111bbb222ccc'));
  assert.equal((await tooBig.json()).code, 'photoTooLarge');
});

test('the routes: another site cannot serve its pictures through this one', async () => {
  const url = 'https://site.test/api/photo?p=drive&id=AAA111bbb222ccc';
  const cross = await call(byteRoute, url, {}, { 'sec-fetch-site': 'cross-site' });
  assert.equal(cross.status, 403);
  assert.equal((await cross.json()).code, 'photoCrossSite');
  const list = await call(listRoute, 'https://site.test/api/photos?p=drive&id=AAA111bbb222ccc', {}, { 'sec-fetch-site': 'cross-site' });
  assert.equal((await list.json()).code, 'photoCrossSite');
  // The site's own pages, and a browser without the header, go through to
  // the next check (here the missing key).
  const own = await call(listRoute, 'https://site.test/api/photos?p=drive&id=AAA111bbb222ccc', {}, { 'sec-fetch-site': 'same-origin' });
  assert.equal((await own.json()).code, 'photoKeyMissing');
});

test('the list route: the album key rides along to Google Photos', async () => {
  const page = new Response('<html>https://lh3.googleusercontent.com/pw/AAAAAAAAAAAAAAAAAAAAAAAA1</html>',
    { status: 200, headers: { 'content-type': 'text/html' } });
  Object.defineProperty(page, 'url', { value: 'https://photos.google.com/share/AF1QipMabcdefgh123' });
  const { result, seen } = await withUpstream(page, () =>
    call(listRoute, 'https://site.test/api/photos?p=gphotos&id=AF1QipMabcdefgh123&host=xY12345678abcd'));
  assert.equal(seen[0].url, 'https://photos.google.com/share/AF1QipMabcdefgh123?key=xY12345678abcd');
  const body = await result.json();
  assert.equal(body.photos.length, 1);
  assert.ok(body.photos[0].src.startsWith('/api/photo?p=g&u=https%3A%2F%2Flh3.googleusercontent.com%2Fpw%2F'));
});

test('the byte route: a JSON list picture may not reach a Google host through the open provider', async () => {
  const res = await call(byteRoute, 'https://site.test/api/photo?p=u&u=https%3A%2F%2Fwww.googleapis.com%2Fx', { PHOTO_HOSTS: 'bilder.example.org' });
  assert.equal(res.status, 403);
  assert.equal((await res.json()).code, 'photoHostNotAllowed');
});

/* ---------- The engine's loader: one call in flight, failures kept briefly ---------- */

test('loadFolderPhotos: renders while a call is out join it, and a failure is not kept for long', async () => {
  const address = 'https://drive.google.com/drive/folders/1A2b3C4d5E6f7G8h9I0jKlMnOpQ';
  let calls = 0;
  let answer = () => jsonRes({ error: 'no key', code: 'photoKeyMissing' }, 403);
  const real = globalThis.fetch;
  globalThis.fetch = async () => { calls++; return answer(); };
  try {
    // Three renders before the first answer: one call.
    const [a, b, c] = await Promise.all([loadFolderPhotos(address, 'name'), loadFolderPhotos(address, 'name'), loadFolderPhotos(address, 'name')]);
    assert.equal(calls, 1);
    assert.equal(a.code, 'photoKeyMissing');
    assert.equal(a, b);
    assert.equal(b, c);
    // The failure is kept, so the next render does not go out again.
    assert.equal(peekFolderPhotos(address, 'name')?.code, 'photoKeyMissing');
    await loadFolderPhotos(address, 'name');
    assert.equal(calls, 1);
    // The panel's Check button goes out whatever is kept, and a good answer
    // replaces the failure.
    const pool = Array.from({ length: 40 }, (_, i) => ({ src: `/api/photo?p=drive&id=pic${String(i).padStart(3, '0')}`, name: `pic${i}` }));
    answer = () => jsonRes({ photos: pool });
    const forced = await loadFolderPhotos(address, 'name', { force: true });
    assert.equal(calls, 2);
    assert.equal(forced.photos.length, 40, 'the whole pool is kept');
    assert.equal(peekFolderPhotos(address, 'name').photos.length, 40);
    // The layer cuts the pool to its own count, in the order asked for.
    const shown = picturesFor({ source: 'folder', folder: address, order: 'name', folderMax: 5, images: [{ src: '/media/own.webp' }] });
    assert.deepEqual(shown.map((p) => p.src), pool.slice(0, 5).map((p) => p.src));
    const drawn = picturesFor({ source: 'folder', folder: address, order: 'random', folderMax: 5 });
    assert.equal(drawn.length, 5);
    assert.notDeepEqual(drawn.map((p) => p.src), pool.slice(0, 5).map((p) => p.src), 'a draw, not the first five');
    assert.deepEqual(picturesFor({ source: 'folder', folder: address, order: 'random', folderMax: 5 }), drawn, 'the same draw while the page is open');
    assert.deepEqual(picturesFor({ source: 'upload', folder: address, images: [{ src: '/media/own.webp' }] }).map((p) => p.src),
      ['/media/own.webp']);
  } finally {
    globalThis.fetch = real;
  }
});

test('the slideshow layer 1 -> 2: the motion and folder fields are added without overwriting a choice', () => {
  assert.equal(slideshowLayer.version, 2);
  const lift = slideshowLayer.migrations[1];
  const plain = lift({ images: [{ src: '/media/a.webp' }], interval: 8 });
  assert.equal(plain.motion, 'none');
  assert.equal(plain.source, 'upload');
  assert.equal(plain.folder, '');
  assert.equal(plain.order, 'random');
  assert.equal(plain.folderMax, FOLDER_MAX.dflt);
  assert.equal(plain.interval, 8, 'the other props survive the lift');
  // A layer still stored as version 1 can already carry a choice the editor wrote.
  const chosen = lift({ motion: 'drift', source: 'folder', folder: 'https://photos.app.goo.gl/aBcDeF12' });
  assert.equal(chosen.motion, 'drift');
  assert.equal(chosen.source, 'folder');
  assert.equal(chosen.folder, 'https://photos.app.goo.gl/aBcDeF12');
  assert.deepEqual(slideshowLayer.defaults().source, 'upload');
});
