/**
 * The design picker's pictures: every calendar design drawn by the engine with its sample events, one WebP each under
 * template/admin/designs/<id>.webp (outside admin/assets, which the editor build empties): the block's own box, its width scaled to
 * 1120 px and its height as drawn, cut at 16:9 from the top for a design taller than that, so the picker shows each design in
 * its own proportions on the tile's dark surface rather than at the top of a white page.
 * The phone designs follow (the neutral list, every design that reads on a phone, and the phone designs designs lend, calPhoneCandidates), each
 * drawn at a phone's width as another block's phone view (a design of a span view over a block of that view), under phone-<id>.webp, cut at
 * 4:5 from the top; then the card designs (the neutral card, every design's card, and the card designs designs lend, calCardCandidates), each
 * the card open over a plain list, under card-<id>.webp; then every other block's designs (block-designs.js), each drawn from its sample over the
 * block's defaults in the site's language, under block-<type>-<id>.webp; and the footer's designs (footer-model.js), the site's own
 * footer drawn in each on an empty page, under footer-<id>.webp.
 *
 * Run from the repo root with the local server up (python3 dev-server.py 8123) and a Chromium-family browser on the machine:
 *
 *     node scripts/design-pictures.mjs [--base http://localhost:8123] [--browser brave-browser] [--only table,heatmap,phone-depStrip,card-depHead]
 *
 * The browser is started headless with the DevTools protocol on a free port and closed again; nothing but this script's
 * output changes. Run it again whenever a design changes its look, and commit the pictures with the change
 * (tests/calendar-designs.test.mjs holds that every design has one).
 */
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(name);
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};
const BASE = arg('--base', 'http://localhost:8123');
const BROWSER = arg('--browser', process.env.BROWSER || 'brave-browser');
const ONLY = arg('--only', '').split(',').filter(Boolean);
const OUT = 'template/admin/designs';
const PORT = 9300 + Math.floor(Math.random() * 300);
const WIDTH = 1180;
const PIC_W = 1120;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** A minimal DevTools client over the platform WebSocket. */
function connect(url) {
  const ws = new WebSocket(url);
  const waiters = new Map();
  let id = 0;
  const open = new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve);
    ws.addEventListener('error', reject);
  });
  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && waiters.has(msg.id)) {
      waiters.get(msg.id)(msg);
      waiters.delete(msg.id);
    }
  });
  const send = (method, params = {}) => open.then(() => new Promise((resolve) => {
    const mid = ++id;
    waiters.set(mid, resolve);
    ws.send(JSON.stringify({ id: mid, method, params }));
  }));
  const evaluate = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails));
    return r.result?.result?.value;
  };
  return { send, evaluate, close: () => ws.close() };
}

const profile = mkdtempSync(join(tmpdir(), 'urd-design-pictures-'));
const browser = spawn(BROWSER, [`--headless=new`, `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--no-first-run', `--window-size=${WIDTH},1000`, 'about:blank'], { stdio: 'ignore' });
let cdp = null;
// A browser that cannot start reports it through the error event, which is awaited below so the profile is cleaned up.
const browserFailed = new Promise((_, reject) => browser.on('error', (error) => reject(new Error(`the browser could not start: ${error.message}`))));
try {
  let targets = null;
  for (let i = 0; i < 40 && !targets; i++) {
    await Promise.race([wait(500), browserFailed]);
    targets = await fetch(`http://127.0.0.1:${PORT}/json/list`).then((r) => r.json()).catch(() => null);
  }
  const page = targets?.find((t) => t.type === 'page');
  if (!page) throw new Error(`the browser did not answer with a page on port ${PORT}`);
  cdp = connect(page.webSocketDebuggerUrl);
  await cdp.send('Runtime.enable');
  await cdp.send('Page.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: 1000, deviceScaleFactor: 1, mobile: false });
  await cdp.send('Page.navigate', { url: `${BASE}/?preview=1` });
  await wait(4000);
  const { ids, phones, cards } = await cdp.evaluate(`(async () => {
    const { engine } = await (await fetch('/urd.json')).json();
    const { CAL_DESIGNS, CAL_PHONE_DESIGNS, calCardCandidates } = await import('/assets/engine/' + engine + '/calendar-designs.js');
    const site = await (await fetch('/content/site.json')).json();
    window.postMessage({ type: 'urd-site', site }, location.origin);
    await new Promise((r) => setTimeout(r, 800));
    // A lent phone design is drawn in the design that lends it, the neutral list in a design that cannot be read on a phone; a design that reads on a phone is drawn as the phone view of a block of its own view in another design.
    const switching = CAL_DESIGNS.find((d) => d.phone === 'switch').id;
    const phones = [
      ...CAL_PHONE_DESIGNS.map((d) => [d.id, d.home ?? switching, null]),
      ...CAL_DESIGNS.filter((d) => d.phone !== 'switch').map((d) => [d.id, d.id === 'plain' ? switching : 'plain', d.view]),
    ];
    // Every card is drawn opened from a plain list: a card design brings its own set, and the neutral one shows the calendar's.
    return { ids: CAL_DESIGNS.map((d) => [d.id, d.view]), phones, cards: calCardCandidates().map((d) => [d.id, 'plain']) };
  })()`);
  mkdirSync(OUT, { recursive: true });
  const chosen = ONLY.length ? ids.filter(([id]) => ONLY.includes(id)) : ids;
  for (const [id, view] of chosen) {
    const box = await cdp.evaluate(`(async () => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const page = await (await fetch('/content/pages/hjem.json')).json();
      const props = { sources: [], limit: 4, view: ${JSON.stringify(view ?? 'list')}${id === 'plain' ? '' : `, design: ${JSON.stringify(id)}`}${view === 'next' ? ', nextCount: 3, laterCount: 3' : ''} };
      page.sections = [{ id: 'pic-sec', version: 1, size: { minHeight: '1400px' }, grid: null, background: { version: 1, layers: [] }, blocks: [
        { id: 'pic-cal', type: 'calendar', version: 1, decor: false, hideMobile: false, animation: null, props, frames: { desktop: { x: 2.5, y: 24, w: 95, h: 600 }, mobile: null } },
      ] }];
      // The site's own header, announcement strip and scroll-top button stay out of the picture.
      if (!document.getElementById('pic-style')) {
        const style = document.createElement('style');
        style.id = 'pic-style';
        style.textContent = '.urd-nav, #urd-announce, .urd-nav-announce, .urd-totop { display: none !important; }';
        document.head.appendChild(style);
      }
      window.postMessage({ type: 'urd-preview-full', page }, location.origin);
      await sleep(2500);
      window.postMessage({ type: 'urd-chrome', visible: false }, location.origin);
      await sleep(400);
      const el = document.querySelector('.urd-block[data-block-id="pic-cal"]');
      el.scrollIntoView({ block: 'start' });
      await sleep(300);
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.left), y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) };
    })()`);
    // The block's own box (the page's bound content width), at most 16:9 from its top.
    const shot = await cdp.send('Page.captureScreenshot', { format: 'webp', quality: 82, captureBeyondViewport: true, clip: { x: box.x, y: box.y, width: box.w, height: Math.min(box.h, Math.round(box.w * 9 / 16)), scale: PIC_W / box.w } });
    const data = shot.result?.data;
    if (!data) throw new Error(`${id}: no picture (${JSON.stringify(shot)})`);
    writeFileSync(join(OUT, `${id}.webp`), Buffer.from(data, 'base64'));
    console.log(`${id}: ${box.w}x${box.h} block, picture written`);
  }
  // The phone designs, at a phone's width.
  const PHONE_W = 390;
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: PHONE_W, height: 1000, deviceScaleFactor: 1, mobile: true });
  const chosenPhones = ONLY.length ? phones.filter(([id]) => ONLY.includes(`phone-${id}`)) : phones;
  for (const [id, home, phoneViewOf] of chosenPhones) {
    const box = await cdp.evaluate(`(async () => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const page = await (await fetch('/content/pages/hjem.json')).json();
      const { engine } = await (await fetch('/urd.json')).json();
      const { calDesign } = await import('/assets/engine/' + engine + '/calendar-designs.js');
      const def = calDesign(${JSON.stringify(home)});
      const view = ${JSON.stringify(phoneViewOf)} ?? def.view ?? 'list';
      const props = { sources: [], limit: 4, view, ...(def.id === 'plain' ? {} : { design: def.id }), ...(view === 'next' ? { nextCount: 3, laterCount: 3 } : {}), phoneView: ${JSON.stringify(id)} };
      page.sections = [{ id: 'pic-sec', version: 1, size: { minHeight: '1400px' }, grid: null, background: { version: 1, layers: [] }, blocks: [
        { id: 'pic-cal', type: 'calendar', version: 1, decor: false, hideMobile: false, animation: null, props, frames: { desktop: { x: 2.5, y: 24, w: 95, h: 600 }, mobile: null } },
      ] }];
      if (!document.getElementById('pic-style')) {
        const style = document.createElement('style');
        style.id = 'pic-style';
        style.textContent = '.urd-nav, #urd-announce, .urd-nav-announce, .urd-totop { display: none !important; }';
        document.head.appendChild(style);
      }
      window.postMessage({ type: 'urd-preview-full', page }, location.origin);
      await sleep(2500);
      window.postMessage({ type: 'urd-chrome', visible: false }, location.origin);
      await sleep(400);
      const el = document.querySelector('.urd-block[data-block-id="pic-cal"]');
      el.scrollIntoView({ block: 'start' });
      await sleep(300);
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.left), y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) };
    })()`);
    const shot = await cdp.send('Page.captureScreenshot', { format: 'webp', quality: 82, captureBeyondViewport: true, clip: { x: box.x, y: box.y, width: box.w, height: Math.min(box.h, Math.round(box.w * 5 / 4)), scale: 2 } });
    const data = shot.result?.data;
    if (!data) throw new Error(`phone-${id}: no picture (${JSON.stringify(shot)})`);
    writeFileSync(join(OUT, `phone-${id}.webp`), Buffer.from(data, 'base64'));
    console.log(`phone-${id}: ${box.w}x${box.h} block in ${home}, picture written`);
  }
  // The card designs: the first event's card, open over the design it belongs with.
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: 1000, deviceScaleFactor: 1, mobile: false });
  const chosenCards = ONLY.length ? cards.filter(([id]) => ONLY.includes(`card-${id}`)) : cards;
  for (const [id, home] of chosenCards) {
    const box = await cdp.evaluate(`(async () => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const page = await (await fetch('/content/pages/hjem.json')).json();
      const { engine } = await (await fetch('/urd.json')).json();
      const { calDesign } = await import('/assets/engine/' + engine + '/calendar-designs.js');
      const def = calDesign(${JSON.stringify(home)});
      const props = { sources: [], limit: 4, showSignup: true, view: def.view ?? 'list', ...(def.id === 'plain' ? {} : { design: def.id }), ...(def.view === 'next' ? { nextCount: 3, laterCount: 3 } : {}), card: ${JSON.stringify(id)} };
      page.sections = [{ id: 'pic-sec', version: 1, size: { minHeight: '1400px' }, grid: null, background: { version: 1, layers: [] }, blocks: [
        { id: 'pic-cal', type: 'calendar', version: 1, decor: false, hideMobile: false, animation: null, props, frames: { desktop: { x: 2.5, y: 24, w: 95, h: 600 }, mobile: null } },
      ] }];
      window.postMessage({ type: 'urd-preview-full', page }, location.origin);
      await sleep(2500);
      window.postMessage({ type: 'urd-chrome', visible: false }, location.origin);
      await sleep(400);
      const el = document.querySelector('.urd-block[data-block-id="pic-cal"]');
      el.scrollIntoView({ block: 'start' });
      await sleep(300);
      el.querySelector('.urd-cal-event')?.click();
      await sleep(700);
      const dialog = document.querySelector('dialog.urd-cal-dialog[open]');
      const r = dialog.getBoundingClientRect();
      return { x: Math.round(r.left) - 12, y: Math.round(r.top + window.scrollY) - 12, w: Math.round(r.width) + 24, h: Math.round(r.height) + 24 };
    })()`);
    const shot = await cdp.send('Page.captureScreenshot', { format: 'webp', quality: 82, captureBeyondViewport: true, clip: { x: box.x, y: box.y, width: box.w, height: Math.min(box.h, Math.round(box.w * 5 / 4)), scale: 2 } });
    const data = shot.result?.data;
    if (!data) throw new Error(`card-${id}: no picture (${JSON.stringify(shot)})`);
    writeFileSync(join(OUT, `card-${id}.webp`), Buffer.from(data, 'base64'));
    console.log(`card-${id}: ${box.w}x${box.h} card over ${home}, picture written`);
    await cdp.evaluate(`document.querySelector('dialog.urd-cal-dialog[open]')?.close(); true`);
  }
  // The other blocks' designs (block-designs.js): each drawn from its sample over the block's defaults, in the site's language, under block-<type>-<id>.webp.
  const blockDesigns = await cdp.evaluate(`(async () => {
    const { engine } = await (await fetch('/urd.json')).json();
    const { BLOCK_DESIGNS } = await import('/assets/engine/' + engine + '/block-designs.js');
    return Object.entries(BLOCK_DESIGNS).flatMap(([type, entry]) => entry.ids.map((id) => [type, id]));
  })()`);
  const chosenBlocks = ONLY.length ? blockDesigns.filter(([type, id]) => ONLY.includes(`block-${type}-${id}`)) : blockDesigns;
  for (const [type, id] of chosenBlocks) {
    const box = await cdp.evaluate(`(async () => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const { engine } = await (await fetch('/urd.json')).json();
      const { BLOCK_DESIGNS, blockDesignSample } = await import('/assets/engine/' + engine + '/block-designs.js');
      const { ta, initAdminLocale } = await import('/assets/engine/' + engine + '/i18n.js');
      const site = await (await fetch('/content/site.json')).json();
      // The seed words in the blocks' defaults follow the site's language, as the rest of the picture does.
      await initAdminLocale(site.site?.lang ?? 'nb');
      const type = ${JSON.stringify(type)};
      const entry = BLOCK_DESIGNS[type];
      const sample = blockDesignSample(type, ta);
      if (sample.contact) site.site.contact = sample.contact;
      window.postMessage({ type: 'urd-site', site }, location.origin);
      await sleep(500);
      const def = window.Urd.blocks.get(type);
      const page = await (await fetch('/content/pages/hjem.json')).json();
      const w = entry.frame.w;
      const props = { ...def.defaults(), ...sample.props, [entry.prop]: ${JSON.stringify(id)} };
      page.sections = [{ id: 'pic-sec', version: 1, size: { minHeight: '900px' }, grid: null, background: { version: 1, layers: [] }, blocks: [
        { id: 'pic-block', type, version: def.version ?? 1, decor: false, hideMobile: false, animation: null, props, frames: { desktop: { x: (100 - w) / 2, y: 40, w, h: entry.frame.h, z: 1, rot: 0 }, mobile: null } },
      ] }];
      if (!document.getElementById('pic-style')) {
        const style = document.createElement('style');
        style.id = 'pic-style';
        style.textContent = '.urd-nav, #urd-announce, .urd-nav-announce, .urd-totop { display: none !important; }';
        document.head.appendChild(style);
      }
      window.postMessage({ type: 'urd-preview-full', page }, location.origin);
      await sleep(2500);
      window.postMessage({ type: 'urd-chrome', visible: false }, location.origin);
      await sleep(400);
      const el = document.querySelector('.urd-block[data-block-id="pic-block"]');
      el.scrollIntoView({ block: 'center' });
      await sleep(300);
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.left), y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) };
    })()`);
    // The block's own box with a margin of the page around it, at least 360 px wide so a small block stands in some room, at most 16:9 from its top.
    const pad = 28;
    const width = Math.max(360, box.w + pad * 2);
    const clip = { x: box.x + box.w / 2 - width / 2, y: box.y - pad, width, height: Math.min(box.h + pad * 2, Math.round(width * 9 / 16)) };
    const shot = await cdp.send('Page.captureScreenshot', { format: 'webp', quality: 82, captureBeyondViewport: true, clip: { ...clip, scale: Math.min(2, PIC_W / width) } });
    const data = shot.result?.data;
    if (!data) throw new Error(`block-${type}-${id}: no picture (${JSON.stringify(shot)})`);
    writeFileSync(join(OUT, `block-${type}-${id}.webp`), Buffer.from(data, 'base64'));
    console.log(`block-${type}-${id}: ${box.w}x${box.h} block, picture written`);
  }
  // The footer's designs (footer-model.js FOOTER_DESIGNS, and the standard footer): the site's own footer drawn in each on an empty page, under footer-<id>.webp.
  const footerDesigns = ['standard', ...await cdp.evaluate(`(async () => {
    const { engine } = await (await fetch('/urd.json')).json();
    return (await import('/assets/engine/' + engine + '/footer-model.js')).FOOTER_DESIGNS;
  })()`)];
  const chosenFooters = ONLY.length ? footerDesigns.filter((id) => ONLY.includes(`footer-${id}`)) : footerDesigns;
  for (const id of chosenFooters) {
    const box = await cdp.evaluate(`(async () => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const site = await (await fetch('/content/site.json')).json();
      const id = ${JSON.stringify(id)};
      site.footer = { ...(site.footer ?? { version: 1 }), show: true };
      delete site.footer.hideOn;
      if (id === 'standard') delete site.footer.design; else site.footer.design = id;
      const page = await (await fetch('/content/pages/hjem.json')).json();
      page.sections = [];
      if (!document.getElementById('pic-style')) {
        const style = document.createElement('style');
        style.id = 'pic-style';
        style.textContent = '.urd-nav, #urd-announce, .urd-nav-announce, .urd-totop { display: none !important; }';
        document.head.appendChild(style);
      }
      window.postMessage({ type: 'urd-site', site }, location.origin);
      await sleep(400);
      window.postMessage({ type: 'urd-preview-full', page }, location.origin);
      await sleep(1500);
      window.postMessage({ type: 'urd-chrome', visible: false }, location.origin);
      await sleep(400);
      const el = document.getElementById('urd-footer');
      el.scrollIntoView({ block: 'center' });
      await sleep(300);
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.left), y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) };
    })()`);
    const clip = { x: box.x, y: box.y, width: box.w, height: Math.min(box.h, Math.round(box.w * 9 / 16)) };
    const shot = await cdp.send('Page.captureScreenshot', { format: 'webp', quality: 82, captureBeyondViewport: true, clip: { ...clip, scale: Math.min(2, PIC_W / box.w) } });
    const data = shot.result?.data;
    if (!data) throw new Error(`footer-${id}: no picture (${JSON.stringify(shot)})`);
    writeFileSync(join(OUT, `footer-${id}.webp`), Buffer.from(data, 'base64'));
    console.log(`footer-${id}: ${box.w}x${box.h} footer, picture written`);
  }
} finally {
  cdp?.close();
  browser.kill();
  // The browser may still be writing its profile as it closes; a folder it holds on to is left to the system's temp cleaning.
  try { rmSync(profile, { recursive: true, force: true }); } catch { /* left behind */ }
}
