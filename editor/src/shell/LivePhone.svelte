<script>
  /* The live phone (0.7.36.1): the page as a phone draws it beside the desktop canvas, following every change after a short pause.
     It stands in one of two forms, switched from its own bar and kept in this browser: a column at the stage's right edge, whose edge is dragged to make it wider, or a phone floating over the canvas wherever it is dragged to, in three sizes.
     With «Scroll together» on, scrolling the canvas scrolls the phone and scrolling the phone scrolls the canvas, each section reaching the top of both together.
     The frame stays the same through the switch, so the page in it is not loaded again.
     It is for looking: a press on a block opens it in the phone view, selected.
     The frame is the real page (`/?preview=1`) in the mobile viewport and Clean view, fed the drafts the canvas is drawn from, as the hidden phone frame of lib/phone-fit.js is; its own listener hears its own frame alone.
     The frame scrolls as a page does. The editor listens in the frame's own document, as it reads the canvas's: a press there acts on nothing on the page and opens the block under it, and the pointer over a block rings it. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { PHONE_FILL_WIDTH } from '../lib/preview-width.js';
  import { ICONS } from '../lib/icons.js';
  import IconButton from '../lib/rows/IconButton.svelte';
  import Dropdown from '../lib/Dropdown.svelte';
  import { scrollMap, mapScroll } from '../lib/scroll-map.js';
  import { dockMotion, menuMotion } from '../lib/motion.svelte.js';
  const ed = getContext('urd-editor');

  /** Changes close together are drawn once. */
  const SETTLE_MS = 300;
  /** The column's width in px: the standard and its bounds. */
  const COLUMN = { width: 320, min: 260, max: 560 };
  /** The floating phone's widths in px, by its size. */
  const FLOAT_W = { s: 180, m: 240, l: 300 };
  /** The room kept round the floating phone, and inside the column. */
  const EDGE = 28;
  const PAD = 18;
  /** Where the form, the column's width, the floating phone's place and size, and scrolling together are kept in this browser. */
  const LOOK_KEY = 'urd-live-phone-look';
  const CORNERS = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

  function readLook() {
    let raw = {};
    try { raw = JSON.parse(localStorage.getItem(LOOK_KEY) ?? '{}') ?? {}; } catch { /* a stored look that cannot be read gives the standard */ }
    return {
      form: raw.form === 'float' ? 'float' : 'column',
      width: Number.isFinite(raw.width) ? Math.min(COLUMN.max, Math.max(COLUMN.min, raw.width)) : COLUMN.width,
      // The floating phone's place: the corner of the stage it stands nearest, and its distance from that corner's two edges, so it keeps its place as the window changes.
      corner: CORNERS.includes(raw.corner) ? raw.corner : 'bottom-right',
      dx: Number.isFinite(raw.dx) && raw.dx >= 0 ? raw.dx : EDGE,
      dy: Number.isFinite(raw.dy) && raw.dy >= 0 ? raw.dy : EDGE,
      size: Object.hasOwn(FLOAT_W, raw.size) ? raw.size : 'm',
      follow: raw.follow === true,
    };
  }

  let look = $state(readLook());

  function setLook(patch) {
    look = { ...look, ...patch };
    try { localStorage.setItem(LOOK_KEY, JSON.stringify(look)); } catch { /* blocked storage: the look lasts the session */ }
  }

  let frame = $state(null);
  let root = $state(null);
  let roomW = $state(0);
  let roomH = $state(0);
  let stageW = $state(0);
  let stageH = $state(0);
  let rootW = $state(0);
  let rootH = $state(0);
  let hoverBox = $state(null);
  let pickedBox = $state(null);
  /** The floating phone's place while it is dragged, in px from the stage's top left; null where it stands in its place. */
  let dragAt = $state(null);
  /** The block under the pointer in the frame, ringed. */
  let hovered = null;
  /** The listeners in the frame's document, set when it is ready. */
  let frameListeners = null;
  let ready = false;
  let timer = null;
  /** The page the frame was last sent. */
  let shownPage = null;
  /** What the frame was last sent, so the site, the collections and the plugins go again only when they changed: each of them draws the whole page anew. */
  let sent = { site: '', collections: '', plugins: '' };

  /** The phone's size: the Phone device's while it is a phone, else the phone's standard width; its height the device's, or the common phone's shape. */
  const phone = $derived.by(() => {
    const device = ed.devices.find((d) => d.id === 'mobile');
    const width = device?.viewport === 'mobile' ? device.width : PHONE_FILL_WIDTH;
    const height = device?.viewport === 'mobile' && device.height ? device.height : Math.round((width * 852) / 393);
    return { width, height };
  });

  const floating = $derived(look.form === 'float');

  /** The phone's scale: as large as the column's room holds the whole phone, or the floating size, smaller where the stage is too short for it. */
  const scale = $derived.by(() => {
    if (floating) {
      const fit = stageH > 0 ? (stageH - 3 * EDGE - 40) / phone.height : Infinity;
      return Math.max(0.1, Math.min(FLOAT_W[look.size] / phone.width, fit));
    }
    if (!(roomW > 0 && roomH > 0)) return 0;
    return Math.max(0.1, Math.min((roomW - 2 * PAD) / phone.width, (roomH - 2 * PAD) / phone.height));
  });

  const phoneBox = $derived({ width: Math.round(phone.width * scale), height: Math.round(phone.height * scale) });

  /** The phone sizes the bar offers: the ones drawn as a phone (a tablet stands above the breakpoint and draws the desktop), each its width with its name under it in the list, so the narrow bar shows it whole; a size of the owner's own chosen in the top bar stands first, as the width it draws. */
  const sizes = $derived.by(() => {
    const presets = ed.PHONE_SIZES.filter((p) => p.width <= (ed.siteDraft?.breakpoints?.mobile ?? 640)).map((p) => [p.id, `${p.width} px`, ta(`lbl.phoneSize.${p.id}`)]);
    return presets.some(([id]) => id === ed.phonePref.size) ? presets : [[ed.phonePref.size, `${phone.width} px`], ...presets];
  });

  /** A size picked here sets the Phone device's size, and leaves a canvas width dragged by hand as it is while the canvas shows the desktop. */
  function pickSize(id) {
    ed.setPhonePref({ size: id }, { keepWidth: ed.deviceId !== 'mobile' });
  }

  // The page the frame starts at; every draw after names its page.
  const src = `/?page=${encodeURIComponent(ed.pageId ?? '')}&preview=1`;

  const post = (msg) => frame?.contentWindow?.postMessage(msg, location.origin);

  /** Sends the frame the drafts the page is drawn from; `first` sends everything and sets the frame up as a phone in Clean view. */
  function feed(first = false) {
    timer = null;
    if (!ready) return;
    const enabled = $state.snapshot(ed.pluginsView)?.enabled ?? [];
    const plugins = JSON.stringify(enabled);
    // A plugin taken away cannot leave a page that has loaded it: the frame loads anew, as the canvas does.
    if (!first && sent.plugins && JSON.parse(sent.plugins).some((id) => !enabled.includes(id))) {
      ready = false;
      frame.src = src;
      return;
    }
    if (first || plugins !== sent.plugins) post({ type: 'urd-plugins', enabled });
    sent.plugins = plugins;
    if (ed.siteDraft) {
      const site = $state.snapshot(ed.siteDraft);
      const key = JSON.stringify(site);
      if (first || key !== sent.site) post({ type: 'urd-site', site });
      sent.site = key;
    }
    const collections = $state.snapshot(ed.collectionsView) ?? {};
    const key = JSON.stringify(collections);
    if (first || key !== sent.collections) post({ type: 'urd-collections', collections });
    sent.collections = key;
    if (first) {
      post({ type: 'urd-viewport', mode: 'mobile' });
      post({ type: 'urd-chrome', visible: false });
    }
    if (ed.store?.data) post({ type: 'urd-preview-full', pageId: ed.pageId, page: $state.snapshot(ed.store.data) });
    // The page is measured again before the next scroll is handed over, and a scroll the redraw makes in the phone is not the owner's.
    mapStale = true;
    phoneQuietUntil = performance.now() + 600;
    // Another page starts at its top, as the canvas does.
    if (ed.pageId !== shownPage) {
      shownPage = ed.pageId;
      frame?.contentWindow?.scrollTo({ top: 0, behavior: 'instant' });
    }
    // The page is drawn anew in the frame's next frames; the ring follows the selected block there.
    setTimeout(placePicked, SETTLE_MS);
  }

  function feedSoon() {
    clearTimeout(timer);
    timer = setTimeout(feed, SETTLE_MS);
  }

  // Every change to the page, the site, the collections or the plugins, an undo, and another page.
  $effect(() => {
    void ed.edits;
    void ed.restores;
    void ed.pageId;
    void ed.pluginsView;
    feedSoon();
  });

  $effect(() => () => clearTimeout(timer));

  function onMessage(event) {
    if (event.origin !== location.origin || !frame || event.source !== frame.contentWindow) return;
    const msg = event.data;
    if (msg?.type === 'urd-ready') {
      ready = true;
      sent = { site: '', collections: '', plugins: '' };
      feed(true);
      listenInFrame();
      quietEmbeds();
    } else if (msg?.type === 'urd-redraw-section') {
      // A block whose phone design changed with its width asks for its section again, as it asks the canvas.
      feedSoon();
    }
  }

  // The light or dark mode changed in the canvas: the frame takes it with the site.
  function onStorage(event) {
    if (event.key !== 'urd-theme-mode') return;
    sent.site = '';
    feedSoon();
  }

  /** A block's place over the phone's screen, at the frame's scale. */
  function boxOf(el) {
    const b = el.getBoundingClientRect();
    return { left: b.left * scale, top: b.top * scale, width: b.width * scale, height: b.height * scale };
  }

  /** The block selected on the canvas, by its id alone: an edit of the block selects it anew without changing it. */
  const selectedId = $derived(ed.selectedBlock?.blockId ?? null);

  /** The ring round the block selected on the canvas, where the phone draws it. */
  function placePicked() {
    const el = selectedId ? frame?.contentDocument?.querySelector(`[data-block-id="${CSS.escape(selectedId)}"]`) : null;
    pickedBox = el ? boxOf(el) : null;
  }

  /** Embedded players and maps take no pointer in the live phone, so a press on one opens its block as any press does. */
  function quietEmbeds() {
    const doc = frame?.contentDocument;
    if (!doc?.head || doc.getElementById('urd-live-phone-quiet')) return;
    const style = doc.createElement('style');
    style.id = 'urd-live-phone-quiet';
    style.textContent = 'iframe, video, audio, object, embed { pointer-events: none !important; }';
    doc.head.appendChild(style);
  }

  function placeHover() {
    hoverBox = hovered?.isConnected ? boxOf(hovered) : null;
  }

  // A block selected on the canvas is brought into the phone's view, at once and as no scroll of the owner's, and ringed.
  $effect(() => {
    const id = selectedId;
    const win = frame?.contentWindow;
    const el = id ? frame?.contentDocument?.querySelector(`[data-block-id="${CSS.escape(id)}"]`) : null;
    // While the two scroll together the phone follows the canvas instead.
    if (el && win && !look.follow) {
      const b = el.getBoundingClientRect();
      if (b.top < 0 || b.bottom > win.innerHeight) {
        phoneQuietUntil = performance.now() + 400;
        win.scrollBy({ top: b.top - win.innerHeight / 3, behavior: 'instant' });
      }
    }
    placePicked();
  });

  // The rings follow a new scale.
  $effect(() => {
    void scale;
    placePicked();
    placeHover();
  });

  /**
   * The editor's listeners in the frame's document, in its window's capture phase, so they come before the page's own.
   * A press acts on nothing on the page (no link followed, no picture opened, no focus taken) and opens the block under it in the phone view, selected; the selection is sent after the view has changed, in the order the preview hears it.
   * The wheel and the scrolling are the frame's own.
   */
  function listenInFrame() {
    frameListeners?.abort();
    frameListeners = new AbortController();
    const win = frame?.contentWindow;
    if (!win) return;
    const signal = frameListeners.signal;
    const stop = (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
    };
    for (const type of ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'dblclick', 'auxclick', 'contextmenu', 'submit']) {
      win.addEventListener(type, stop, { capture: true, signal });
    }
    win.addEventListener('click', (event) => {
      stop(event);
      const id = event.target?.closest?.('[data-block-id]')?.dataset.blockId;
      ed.toPhoneView();
      if (id) setTimeout(() => ed.bridge?.sendSelect(id, true), 0);
    }, { capture: true, signal });
    win.addEventListener('pointermove', (event) => {
      hovered = event.target?.closest?.('[data-block-id]') ?? null;
      placeHover();
    }, { capture: true, passive: true, signal });
    win.document.documentElement.addEventListener('pointerleave', () => {
      hovered = null;
      hoverBox = null;
    }, { signal });
    win.addEventListener('scroll', () => {
      placeHover();
      placePicked();
      scrolled(win);
    }, { passive: true, signal });
  }

  $effect(() => () => frameListeners?.abort());

  // The stage's size, which the floating phone keeps inside.
  $effect(() => {
    const stage = root?.parentElement;
    if (!stage) return;
    const ro = new ResizeObserver(() => {
      stageW = stage.clientWidth;
      stageH = stage.clientHeight;
    });
    ro.observe(stage);
    return () => ro.disconnect();
  });

  /** The column's edge dragged: the column wider towards the canvas, narrower away from it. */
  function widthDown(event) {
    if (event.button !== 0) return;
    event.preventDefault();
    const el = event.currentTarget;
    el.setPointerCapture(event.pointerId);
    const startX = event.clientX;
    const startW = look.width;
    const move = (e) => {
      look = { ...look, width: Math.min(COLUMN.max, Math.max(COLUMN.min, Math.round(startW - (e.clientX - startX)))) };
    };
    const up = () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      setLook({});
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
  }

  function widthKey(event) {
    const step = event.key === 'ArrowLeft' ? 16 : event.key === 'ArrowRight' ? -16 : 0;
    if (!step) return;
    event.preventDefault();
    setLook({ width: Math.min(COLUMN.max, Math.max(COLUMN.min, look.width + step)) });
  }

  /** The floating phone dragged by its bar: it follows the pointer and stays where it is let go, kept by its distance from the stage's nearest corner. */
  function moveDown(event) {
    if (event.button !== 0 || event.target.closest('button')) return;
    const stage = root?.parentElement;
    if (!stage) return;
    event.preventDefault();
    const bar = event.currentTarget;
    bar.setPointerCapture(event.pointerId);
    const s = stage.getBoundingClientRect();
    const r = root.getBoundingClientRect();
    const grab = { x: event.clientX - r.left, y: event.clientY - r.top };
    const move = (e) => {
      dragAt = {
        left: Math.min(s.width - r.width, Math.max(0, e.clientX - s.left - grab.x)),
        top: Math.min(s.height - r.height, Math.max(0, e.clientY - s.top - grab.y)),
      };
    };
    const up = () => {
      bar.removeEventListener('pointermove', move);
      bar.removeEventListener('pointerup', up);
      bar.removeEventListener('pointercancel', up);
      if (dragAt) {
        const right = dragAt.left + r.width / 2 > s.width / 2;
        const bottom = dragAt.top + r.height / 2 > s.height / 2;
        setLook({
          corner: `${bottom ? 'bottom' : 'top'}-${right ? 'right' : 'left'}`,
          dx: Math.round(right ? s.width - dragAt.left - r.width : dragAt.left),
          dy: Math.round(bottom ? s.height - dragAt.top - r.height : dragAt.top),
        });
      }
      dragAt = null;
    };
    bar.addEventListener('pointermove', move);
    bar.addEventListener('pointerup', up);
    bar.addEventListener('pointercancel', up);
  }

  /** Where the floating phone stands: its distance from its corner's edges, kept inside the stage; while dragged, where the pointer has it. */
  const place = $derived.by(() => {
    if (!floating) return {};
    if (dragAt) return { left: `${dragAt.left}px`, top: `${dragAt.top}px` };
    const [v, h] = look.corner.split('-');
    const x = stageW && rootW ? Math.max(0, Math.min(look.dx, stageW - rootW)) : look.dx;
    const y = stageH && rootH ? Math.max(0, Math.min(look.dy, stageH - rootH)) : look.dy;
    return { [h]: `${x}px`, [v]: `${y}px` };
  });

  /* Scrolling together (look.follow): the window the owner scrolls hands its place to the other in the same scroll event, so both move in the same frame.
     The place is read off a map of where each section starts in both pages (lib/scroll-map.js), measured once and again when either page's height changes or a page is drawn anew, so a scroll measures nothing.
     The other window's own scroll that follows is not handed back. */
  const handed = new WeakMap();
  let phoneQuietUntil = 0;
  let map = null;
  let mapStale = true;

  // A page drawn anew, on the canvas or in the phone, is measured again before the next handover.
  // The canvas's redraw moves its scroll for a frame or two, which is not the owner's: the canvas is quiet a moment, and hands its place over once after.
  let canvasQuietUntil = 0;
  let canvasSettle = null;
  $effect(() => {
    void ed.edits;
    void ed.restores;
    void ed.pageId;
    void scale;
    mapStale = true;
    canvasQuietUntil = performance.now() + 300;
    clearTimeout(canvasSettle);
    canvasSettle = setTimeout(() => scrolled(ed.iframeEl?.contentWindow), 320);
  });

  $effect(() => () => clearTimeout(canvasSettle));

  /** Each section's id and where it starts in a window's page, in the page's order. */
  function sectionTops(win) {
    const y = win.scrollY;
    return [...win.document.querySelectorAll('.urd-section[data-section-id]')].map((section) => [section.dataset.sectionId, section.getBoundingClientRect().top + y]);
  }

  const furthest = (win) => Math.max(0, win.document.documentElement.scrollHeight - win.innerHeight);

  /** The map of the two pages as they stand, measured again where it is stale or either page's height has changed. */
  function mapOf(canvas, phoneWin) {
    const heights = `${canvas.document.documentElement.scrollHeight}:${phoneWin.document.documentElement.scrollHeight}:${canvas.innerHeight}:${phoneWin.innerHeight}`;
    if (mapStale || map?.heights !== heights) {
      map = { ...scrollMap(sectionTops(canvas), furthest(canvas), sectionTops(phoneWin), furthest(phoneWin)), heights };
      mapStale = false;
    }
    return map;
  }

  /** A window scrolled: the other one moves to its place at once, unless this scroll is the one handed to it. */
  function scrolled(from) {
    if (!look.follow || !from) return;
    const own = handed.get(from);
    if (own && Math.abs(from.scrollY - own.y) <= 2 && performance.now() - own.at < 400) return;
    const canvas = ed.iframeEl?.contentWindow;
    const phoneWin = frame?.contentWindow;
    if (!canvas || !phoneWin) return;
    if ((from === phoneWin && performance.now() < phoneQuietUntil) || (from === canvas && performance.now() < canvasQuietUntil)) return;
    const target = from === canvas ? phoneWin : canvas;
    try {
      const m = mapOf(canvas, phoneWin);
      const y = from === canvas ? mapScroll(m.xs, m.ys, m.toPhone, from.scrollY) : mapScroll(m.ys, m.xs, m.toCanvas, from.scrollY);
      if (Math.abs(y - target.scrollY) < 0.5) return;
      handed.set(target, { y: Math.round(y), at: performance.now() });
      target.scrollTo({ top: y, behavior: 'instant' });
    } catch { /* a frame between two pages has no page to read yet */ }
  }

  /** The live phone comes and goes as the column at the stage's edge slides, or as a floating panel fades. */
  function liveMotion(node, params) {
    return floating ? menuMotion(node, params) : dockMotion(node, params);
  }

  function toggleFollow() {
    setLook({ follow: !look.follow });
    if (look.follow) scrolled(ed.iframeEl?.contentWindow);
  }

  // The canvas's scrolling, heard while the two scroll together, again after the canvas loads another page.
  $effect(() => {
    const el = ed.iframeEl;
    if (!el || !look.follow) return;
    let listening = null;
    const attach = () => {
      listening?.abort();
      listening = new AbortController();
      const win = el.contentWindow;
      win?.addEventListener('scroll', () => scrolled(win), { passive: true, signal: listening.signal });
    };
    attach();
    el.addEventListener('load', attach);
    return () => {
      listening?.abort();
      el.removeEventListener('load', attach);
    };
  });
</script>

<svelte:window onmessage={onMessage} onstorage={onStorage} />

<aside bind:this={root} bind:clientWidth={rootW} bind:clientHeight={rootH} class="live-phone" class:floating class:docked={!floating} aria-label={ta('lbl.view.livePhone')} transition:liveMotion
  style:width={floating ? null : `${look.width}px`}
  style:left={place.left ?? null} style:right={place.right ?? null} style:top={place.top ?? null} style:bottom={place.bottom ?? null}
  data-side={floating ? look.corner.split('-')[1] : null}>
  {#if floating}
    <!-- The bar it is dragged by: its size, back into the column, and closed -->
    <div class="lp-bar lp-grip" onpointerdown={moveDown} role="toolbar" tabindex="-1" aria-label={ta('lbl.view.livePhone')}>
      <span class="lp-handle" title={ta('tip.livePhoneMove')} aria-hidden="true">{@html ICONS.grip}</span>
      <span class="lp-seg" role="group" aria-label={ta('lbl.livePhoneSize')}>
        {#each Object.keys(FLOAT_W) as id (id)}
          <button type="button" class:on={look.size === id} aria-pressed={look.size === id} aria-label={ta(`tip.livePhoneSize.${id}`)} title={ta(`tip.livePhoneSize.${id}`)}
            onclick={() => setLook({ size: id })}>{ta(`opt.livePhoneSize.${id}`)}</button>
        {/each}
      </span>
      <span class="lp-grow"></span>
      <IconButton icon={ICONS.scrollTogether} label={ta('ui.livePhoneFollow')} pressed={look.follow} quiet size="sm" onclick={toggleFollow} />
      <IconButton icon={ICONS.liveDock} label={ta('ui.livePhoneDock')} quiet size="sm" onclick={() => setLook({ form: 'column' })} />
      <IconButton icon={ICONS.cross} label={ta('ui.livePhoneOff')} quiet size="sm" onclick={ed.toggleLivePhone} />
    </div>
  {:else}
    <!-- The column's edge, dragged or moved by the arrow keys to make it wider -->
    <button type="button" class="lp-edge" aria-label={ta('tip.livePhoneWidth')} title={ta('tip.livePhoneWidth')} onpointerdown={widthDown} onkeydown={widthKey}></button>
    <!-- The bar: the phone's size, the phone view, floating over the canvas, and closed -->
    <div class="lp-bar">
      <Dropdown compact fit value={ed.phonePref.size} options={sizes} title={ta('tip.livePhoneSize')} onchange={pickSize} />
      <span class="lp-grow"></span>
      <button type="button" class="ghost lp-edit" onclick={ed.toPhoneView}>{ta('ui.livePhoneEdit')}</button>
      <IconButton icon={ICONS.scrollTogether} label={ta('ui.livePhoneFollow')} pressed={look.follow} quiet size="sm" onclick={toggleFollow} />
      <IconButton icon={ICONS.liveFloat} label={ta('ui.livePhoneFloat')} quiet size="sm" onclick={() => setLook({ form: 'float' })} />
      <IconButton icon={ICONS.cross} label={ta('ui.livePhoneOff')} quiet size="sm" onclick={ed.toggleLivePhone} />
    </div>
  {/if}
  <div class="lp-room" bind:clientWidth={roomW} bind:clientHeight={roomH}>
    <div class="lp-phone" style:width="{phoneBox.width}px" style:height="{phoneBox.height}px" style:--lp-scale={scale}>
      <iframe bind:this={frame} {src} title={ta('livePhone.frame')} tabindex="-1" aria-hidden="true"
        style:width="{phone.width}px" style:height="{phone.height}px" style:transform="scale({scale})"></iframe>
      <!-- The rings round the block under the pointer and the block selected on the canvas, over the frame and taking no pointer -->
      <div class="lp-rings" aria-hidden="true">
        {#if pickedBox}<span class="lp-ring picked" style:left="{pickedBox.left}px" style:top="{pickedBox.top}px" style:width="{pickedBox.width}px" style:height="{pickedBox.height}px"></span>{/if}
        {#if hoverBox}<span class="lp-ring" style:left="{hoverBox.left}px" style:top="{hoverBox.top}px" style:width="{hoverBox.width}px" style:height="{hoverBox.height}px"></span>{/if}
      </div>
    </div>
  </div>
</aside>

<style>
  /* The column on the panel's surface at the stage's right edge, the phone standing whole on the canvas's dotted ground in it */
  .live-phone.docked {
    position: relative;
    display: flex;
    flex: none;
    flex-direction: column;
    background: var(--urd-color-surface, #151a23);
    border-left: 1px solid rgb(255 255 255 / 8%);
  }

  /* The canvas's own ground (app.css .frame-wrap), in the admin's theme */
  .docked .lp-room {
    flex: 1;
    min-height: 0;
    display: grid;
    place-items: center;
    background-color: color-mix(in srgb, var(--urd-color-bg, #0f1419) 70%, black);
    background-image: radial-gradient(color-mix(in srgb, var(--urd-color-text, #e8eaf0) 9%, transparent) 1px, transparent 1.4px);
    background-size: 16px 16px;
  }

  /* The edge the column is made wider by */
  .lp-edge {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -4px;
    z-index: 2;
    width: 8px;
    padding: 0;
    cursor: ew-resize;
    background: transparent;
    border: 0;
    touch-action: none;
    user-select: none;
  }

  .lp-edge:hover,
  .lp-edge:focus-visible {
    background: color-mix(in srgb, var(--urd-color-accent, #2bbfa5) 45%, transparent);
    outline: none;
  }

  .lp-bar {
    display: flex;
    flex: none;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.5rem;
    font-size: 0.82rem;
    border-bottom: 1px solid rgb(255 255 255 / 8%);
  }

  .lp-grow {
    flex: 1;
  }

  .lp-edit {
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
    white-space: nowrap;
  }

  /* The floating phone over the canvas, in its corner or where it is dragged */
  .live-phone.floating {
    position: absolute;
    z-index: 30;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: flex-end;
  }

  .live-phone.floating[data-side='left'] {
    align-items: flex-start;
  }

  /* The bar it is dragged by, as wide as the phone, its grip at the start */
  .lp-grip {
    align-self: stretch;
    gap: 0.25rem;
    touch-action: none;
    user-select: none;
    padding: 0.2rem 0.3rem 0.2rem 0.4rem;
    cursor: grab;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 10%);
    border-radius: 999px;
    box-shadow: 0 4px 14px rgb(0 0 0 / 35%);
  }

  .lp-grip:active {
    cursor: grabbing;
  }

  .lp-handle {
    display: inline-flex;
    padding: 0 0.15rem;
    opacity: 0.6;
  }

  .lp-seg {
    display: inline-flex;
    overflow: hidden;
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 6px;
  }

  .lp-seg button {
    min-width: 1.6rem;
    padding: 0.1rem 0.4rem;
    font-size: 0.75rem;
    color: inherit;
    background: transparent;
    border: 0;
    cursor: pointer;
  }

  .lp-seg button.on {
    color: var(--urd-color-accent, #2bbfa5);
    background: color-mix(in srgb, var(--urd-color-accent, #2bbfa5) 22%, transparent);
  }

  /* The phone in its bezel, as the phone view draws it, the page scaled into it from its top left corner */
  .lp-phone {
    --phone-bezel: color-mix(in srgb, var(--urd-color-surface, #151a23) 85%, black);
    position: relative;
    overflow: hidden;
    border-radius: calc(44px * var(--lp-scale, 1));
    box-shadow:
      0 0 0 calc(10px * var(--lp-scale, 1)) var(--phone-bezel),
      0 0 0 calc(10px * var(--lp-scale, 1) + 1px) color-mix(in srgb, var(--urd-color-text, #e8eaf0) 14%, transparent),
      0 14px 34px rgb(0 0 0 / 45%);
  }

  .floating .lp-phone {
    margin: calc(12px * var(--lp-scale, 1));
  }

  /* No ground of the frame's own (the admin gives its iframes a white one), so no light line shows at the edge */
  .lp-phone iframe {
    display: block;
    border: 0;
    background: transparent;
    transform-origin: 0 0;
  }

  .lp-rings {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .lp-ring {
    position: absolute;
    pointer-events: none;
    border-radius: 3px;
    box-shadow: 0 0 0 1px var(--urd-color-accent, #2bbfa5);
  }

  .lp-ring.picked {
    box-shadow: 0 0 0 2px var(--urd-color-accent, #2bbfa5);
  }
</style>
