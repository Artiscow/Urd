/**
 * The design picker's pictures: every calendar design drawn by the engine with its sample events, one WebP each under
 * template/admin/designs/<id>.webp (outside admin/assets, which the editor build empties) (16:9 from the design's top, the block's own width scaled to 1120 px).
 *
 * Run from the repo root with the local server up (python3 dev-server.py 8123) and a Chromium-family browser on the machine:
 *
 *     node scripts/design-pictures.mjs [--base http://localhost:8123] [--browser brave-browser] [--only table,heatmap]
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
try {
  let targets = null;
  for (let i = 0; i < 40 && !targets; i++) {
    await wait(500);
    targets = await fetch(`http://127.0.0.1:${PORT}/json/list`).then((r) => r.json()).catch(() => null);
  }
  if (!targets) throw new Error(`the browser did not answer on port ${PORT}`);
  cdp = connect(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await cdp.send('Runtime.enable');
  await cdp.send('Page.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: 1000, deviceScaleFactor: 1, mobile: false });
  await cdp.send('Page.navigate', { url: `${BASE}/?preview=1` });
  await wait(4000);
  const ids = await cdp.evaluate(`(async () => {
    const { engine } = await (await fetch('/urd.json')).json();
    const { CAL_DESIGNS } = await import('/assets/engine/' + engine + '/calendar-designs.js');
    const site = await (await fetch('/content/site.json')).json();
    window.postMessage({ type: 'urd-site', site }, location.origin);
    await new Promise((r) => setTimeout(r, 800));
    return CAL_DESIGNS.map((d) => [d.id, d.view]);
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
    // The block's own width (the page's bound content width), 16:9 from its top.
    const shot = await cdp.send('Page.captureScreenshot', { format: 'webp', quality: 82, captureBeyondViewport: true, clip: { x: box.x, y: box.y, width: box.w, height: Math.round(box.w * 9 / 16), scale: PIC_W / box.w } });
    const data = shot.result?.data;
    if (!data) throw new Error(`${id}: no picture (${JSON.stringify(shot)})`);
    writeFileSync(join(OUT, `${id}.webp`), Buffer.from(data, 'base64'));
    console.log(`${id}: ${box.w}x${box.h} block, picture written`);
  }
} finally {
  cdp?.close();
  browser.kill();
  rmSync(profile, { recursive: true, force: true });
}
