<script>
  /**
   * Modern color picker: a saturation/brightness field, a hue slider, a hex
   * field, recent colors and the theme colors as quick picks.
   *
   * The value is EITHER #rrggbb OR a theme color NAME (e.g. 'accent'):
   * picking a theme dot stores the name, so the content is recolored when
   * the theme changes (the engine's resolveColor understands both). The
   * field/hex give a detached hex value.
   *
   * Two branches (ADR-0011 addendum, anchored.js decides): in the top
   * layer, anchored under the swatch's right edge (the card extends left
   * over the panel, never out over the preview) with the browser flipping
   * it away from the viewport edge and light dismiss; otherwise position:
   * fixed (the panels clip absolute content), placed by measuring, closing
   * on a click outside or Escape. Both close on a window blur (a click in
   * the preview iframe never reaches this document).
   */
  import { nativeAnchoring, anchorName, namePane } from '$engine/anchored.js';
  import { ta } from '$engine/i18n.js';

  let { value = '#000000', tokens = [], label = ta('cp.pickColor'), onchange, allowClear = false } = $props();

  const RECENT_KEY = 'urd-recent-colors';
  const SAVED_KEY = 'urd-saved-colors';

  const native = nativeAnchoring();
  const anchor = anchorName('urd-cp');
  const popId = anchor.slice(2);
  let popEl = $state(null);

  /** The display color: a token name is looked up among the theme dots. */
  const displayHex = () => {
    const token = tokens.find(([name]) => name === value);
    return token ? token[1] : value;
  };
  const linkedToken = () => tokens.find(([name]) => name === value)?.[0] ?? null;

  let recent = $state([]);
  let saved = $state([]);
  let openedWith = '';
  let lastPickedHex = '';

  let rootEl = $state(null);
  let open = $state(false);
  let pos = $state({ top: 0, left: 0 });

  // HSV state while the picker is open (a = alpha 0..1)
  let h = $state(0);
  let s = $state(0);
  let v = $state(1);
  let a = $state(1);
  let hexText = $state('#000000');

  function hexToRgb(hex) {
    const m = /^#?([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(String(hex).trim());
    if (!m) return null;
    const n = parseInt(m[1], 16);
    const alpha = m[2] ? parseInt(m[2], 16) / 255 : 1;
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, alpha];
  }

  const rgbToHex = (r, g, b) =>
    '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');

  function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let hue = 0;
    if (d) {
      if (max === r) hue = ((g - b) / d) % 6;
      else if (max === g) hue = (b - r) / d + 2;
      else hue = (r - g) / d + 4;
      hue *= 60;
      if (hue < 0) hue += 360;
    }
    return [hue, max ? d / max : 0, max];
  }

  function hsvToRgb(hue, sat, val) {
    const c = val * sat;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = val - c;
    const [r, g, b] = hue < 60 ? [c, x, 0] : hue < 120 ? [x, c, 0]
      : hue < 180 ? [0, c, x] : hue < 240 ? [0, x, c]
      : hue < 300 ? [x, 0, c] : [c, 0, x];
    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
  }

  function currentHex() {
    return rgbToHex(...hsvToRgb(h, s, v));
  }

  /** Outgoing value: #rrggbb, or #rrggbbaa when an alpha is chosen. */
  function currentColor() {
    const hex = currentHex();
    return a >= 0.995 ? hex : hex + Math.round(a * 255).toString(16).padStart(2, '0');
  }

  function commit() {
    hexText = currentColor();
    lastPickedHex = hexText;
    onchange?.(hexText);
  }

  function setFromHex(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return false;
    [h, s, v] = rgbToHsv(rgb[0], rgb[1], rgb[2]);
    a = rgb[3];
    hexText = currentColor();
    return true;
  }

  /** The state behind the card: the colour it opens on and the stored palettes. */
  function prepare() {
    setFromHex(displayHex()) || setFromHex('#000000');
    openedWith = value;
    lastPickedHex = '';
    try {
      const parsed = JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]');
      recent = Array.isArray(parsed) ? parsed : [];
    } catch {
      recent = [];
    }
    try {
      const parsed = JSON.parse(localStorage.getItem(SAVED_KEY) ?? '[]');
      saved = Array.isArray(parsed) ? parsed : [];
    } catch {
      saved = [];
    }
  }

  /** The popover's toggle event drives the open state in the anchored branch. */
  function onToggle(e) {
    if (e.newState === 'open') {
      prepare();
      namePane(rootEl, true);
      open = true;
    } else if (open) {
      namePane(rootEl, false);
      open = false;
      remember();
    }
  }

  function openPicker() {
    prepare();
    const r = rootEl.getBoundingClientRect();
    const W = 236;
    const H = 380;
    // The popover stays inside the panel's RIGHT EDGE, so it never hangs out
    // over the preview. The panel is narrower than the popover, so the excess
    // width goes to the left (over the tool rail), which is still the
    // editor's own surface.
    const panel = rootEl.closest('.panel-body')?.getBoundingClientRect();
    const rightEdge = panel ? panel.right : window.innerWidth;
    const left = Math.max(8, Math.min(r.right - W, rightEdge - W - 8));
    const top = r.bottom + H + 8 > window.innerHeight ? Math.max(8, r.top - H - 8) : r.bottom + 6;
    pos = { top, left };
    open = true;
  }

  /** Remembers the color as recently used (detached hex picks only). */
  function remember() {
    if (lastPickedHex && lastPickedHex !== openedWith) {
      const next = [lastPickedHex, ...recent.filter((c) => c !== lastPickedHex)].slice(0, 8);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    }
  }

  function close() {
    if (native) {
      // hidePopover fires toggle, which does the bookkeeping.
      popEl?.hidePopover();
      return;
    }
    open = false;
    remember();
  }

  /** Theme dot: store the NAME, so the element follows the theme. */
  function pickToken(name, hex) {
    setFromHex(hex);
    hexText = hex;
    onchange?.(name);
  }

  function svDown(e) {
    const area = e.currentTarget;
    area.setPointerCapture(e.pointerId);
    const apply = (ev) => {
      const r = area.getBoundingClientRect();
      s = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width));
      v = 1 - Math.min(1, Math.max(0, (ev.clientY - r.top) / r.height));
      commit();
    };
    apply(e);
    const move = (ev) => apply(ev);
    const up = () => {
      area.removeEventListener('pointermove', move);
      area.removeEventListener('pointerup', up);
    };
    area.addEventListener('pointermove', move);
    area.addEventListener('pointerup', up);
  }

  function onHexInput(e) {
    if (setFromHex(e.target.value)) commit();
    else hexText = currentHex();
  }

  /** The RGB fields: parity with the canvas color picker. */
  function rgbValue(index) {
    return (hexToRgb(currentHex()) ?? [0, 0, 0])[index];
  }

  function onRgbInput(index, raw) {
    const rgb = hexToRgb(currentHex()) ?? [0, 0, 0];
    rgb[index] = Math.min(255, Math.max(0, Number(raw) || 0));
    [h, s, v] = rgbToHsv(...rgb);
    commit();
  }

  /** Eyedropper (the EyeDropper API): pick a color from anywhere on the screen. */
  const hasEyeDropper = typeof window !== 'undefined' && 'EyeDropper' in window;

  async function pickFromScreen() {
    try {
      const result = await new window.EyeDropper().open();
      if (setFromHex(result.sRGBHex)) commit();
    } catch { /* a cancelled eyedropper is perfectly fine */ }
  }

  function pick(hex) {
    if (setFromHex(hex)) commit();
  }

  /** Saved colors: the owner's fixed palette, sharing storage with the canvas color picker. */
  function addSaved() {
    const color = currentColor();
    if (saved.includes(color)) return;
    saved = [color, ...saved].slice(0, 12);
    localStorage.setItem(SAVED_KEY, JSON.stringify($state.snapshot(saved)));
  }

  function removeSaved(hex) {
    saved = saved.filter((c) => c !== hex);
    localStorage.setItem(SAVED_KEY, JSON.stringify($state.snapshot(saved)));
  }

  // Close ONLY on a click outside or Escape (like most menus). Not on scroll:
  // clicking a field/button inside the floating popover gives it focus, and
  // the browser then scrolls the panel slightly to reveal the element - that
  // scroll must not close the picker (it would otherwise close on every click
  // inside it). A click in the preview iframe never reaches the document's
  // pointerdown; the focus moving there gives a window blur, which must close
  // it too.
  $effect(() => {
    if (!open) return;
    const onBlur = () => close();
    window.addEventListener('blur', onBlur);
    if (native) return () => window.removeEventListener('blur', onBlur);
    const onDown = (e) => {
      if (rootEl && !rootEl.contains(e.target)) close();
    };
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('keydown', onKey, true);
      window.removeEventListener('blur', onBlur);
    };
  });
</script>

<span class="cp" bind:this={rootEl}>
  <button type="button" class="cp-swatch" class:linked={linkedToken()} class:cp-empty={allowClear && !value}
    style="background: {value ? displayHex() : 'transparent'}{native ? `; anchor-name: ${anchor}` : ''}" title={linkedToken() ? ta('cp.linkedTitle', { label, token: linkedToken() }) : label}
    popovertarget={native ? popId : undefined}
    aria-label={label} onclick={native ? undefined : () => (open ? close() : openPicker())}></button>
  {#if allowClear && value}
    <button type="button" class="cp-clear" title={ta('cp.clearTitle')}
      aria-label={ta('cp.clear')} onclick={() => onchange?.('')}>×</button>
  {/if}
  <!-- The picker often sits inside a <label>: without preventDefault the browser
       forwards clicks on non-interactive surfaces (the color field, empty space)
       as a click to the label's control = the swatch, which would toggle the
       picker closed. -->
  {#if native}
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div class="cp-pop cp-anchored" id={popId} popover="auto" bind:this={popEl}
      style="position-anchor: {anchor}" ontoggle={onToggle} onclick={(e) => e.preventDefault()}>
      {#if open}
        {@render card()}
      {/if}
    </div>
  {:else if open}
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div class="cp-pop" style="top: {pos.top}px; left: {pos.left}px"
      onclick={(e) => e.preventDefault()}>
      {@render card()}
    </div>
  {/if}
</span>

{#snippet card()}
      <div class="cp-sv"
        style="background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl({h}, 100%, 50%)"
        onpointerdown={svDown}>
        <span class="cp-cursor" style="left: {s * 100}%; top: {(1 - v) * 100}%"></span>
      </div>
      <input class="cp-hue" type="range" min="0" max="360" step="1" value={h}
        oninput={(e) => { h = Number(e.target.value); commit(); }} />
      <input class="cp-alpha" type="range" min="0" max="100" step="1" value={Math.round(a * 100)}
        title={ta('cp.alpha')}
        style="background: linear-gradient(to right, transparent, {currentHex()}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px"
        oninput={(e) => { a = Number(e.target.value) / 100; commit(); }} />
      <span class="cp-row">
        <span class="cp-preview" style="background: {hexText}"></span>
        <input class="cp-hex" value={hexText} spellcheck="false" onchange={onHexInput} />
        {#if hasEyeDropper}
          <button type="button" class="cp-eye" title={ta('cp.eyedropper')} onclick={pickFromScreen}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2l4 4-3 3-4-4 3-3z"/><path d="M15 5L4 16l-1 5 5-1L19 9"/></svg>
          </button>
        {/if}
      </span>
      <span class="cp-row cp-rgb">
        {#each ['R', 'G', 'B'] as channel, i (channel)}
          <input type="number" min="0" max="255" title={channel} value={rgbValue(i)}
            onchange={(e) => onRgbInput(i, e.target.value)} />
        {/each}
      </span>
      {#if tokens.length}
        <span class="cp-label">{ta('cp.themeColors')}{#if linkedToken()} {ta('cp.linkedSuffix', { token: linkedToken() })}{/if}</span>
        <span class="cp-tokens">
          {#each tokens as [name, hex] (name)}
            <button type="button" class="cp-token" class:active={value === name}
              style="background: {hex}" title={ta('cp.tokenTitle', { name })}
              onclick={() => pickToken(name, hex)}></button>
          {/each}
        </span>
      {/if}
      <span class="cp-label cp-label-row">{ta('cp.saved')}
        <button type="button" class="cp-add" title={ta('cp.saveTitle')} onclick={addSaved}>+</button>
      </span>
      {#if saved.length}
        <span class="cp-tokens">
          {#each saved as hex (hex)}
            <span class="cp-saved">
              <button type="button" class="cp-token" style="background: {hex}"
                title={hex} onclick={() => pick(hex)}></button>
              <button type="button" class="cp-del" title={ta('cp.removeSaved')}
                onclick={() => removeSaved(hex)}>×</button>
            </span>
          {/each}
        </span>
      {/if}
      {#if recent.length}
        <span class="cp-label">{ta('common.recent')}</span>
        <span class="cp-tokens">
          {#each recent as hex (hex)}
            <button type="button" class="cp-token" style="background: {hex}"
              title={hex} onclick={() => pick(hex)}></button>
          {/each}
        </span>
      {/if}
{/snippet}

<style>
  .cp {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .cp-swatch {
    width: 3rem;
    height: 2.2rem;
    padding: 0;
    border: 1px solid rgb(255 255 255 / 25%);
    border-radius: 6px;
    cursor: pointer;
  }

  /* Empty (no color chosen): checkerboard + slash, reading as "none". */
  .cp-swatch.cp-empty {
    background:
      linear-gradient(to top right, transparent 46%, rgb(255 255 255 / 45%) 46% 54%, transparent 54%),
      repeating-conic-gradient(rgb(255 255 255 / 12%) 0 25%, transparent 0 50%) 0 0 / 12px 12px !important;
  }

  .cp-clear {
    width: 1.4rem;
    height: 1.4rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    font-size: 15px;
    line-height: 1;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 5px;
    cursor: pointer;
  }

  .cp-clear:hover {
    background: rgb(255 255 255 / 12%);
  }

  .cp-pop {
    position: fixed;
    z-index: 500;
    /* border-box: the width here IS the visible width, the same number the
       placement math in openPicker uses (otherwise the box hangs 20px
       further out than the math thinks) */
    box-sizing: border-box;
    width: 236px;
    display: grid;
    /* minmax(0, 1fr): an implicit grid column is max-content sized, and the
       widest row (the hex field's natural width) would make the column wider
       than the box, so the content would spill out of it. The column must
       never exceed the box width. */
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
    padding: 10px;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 10px;
    box-shadow: 0 12px 36px rgb(0 0 0 / 55%);
  }

  /* The anchored branch: under the swatch, right edges aligned (the card
     extends left over the panel), flipped by the browser when it does not fit. */
  @supports (anchor-name: --a) {
    .cp-anchored {
      inset: auto;
      margin: 6px 0 0;
      top: anchor(bottom);
      /* Right edges aligned with the swatch, kept inside the pane the
         swatch stands in (--urd-pane, named by namePane while open), so
         the card never hangs out over the preview or the tool rail */
      left: clamp(calc(anchor(--urd-pane left, 0px) + 8px), calc(anchor(right) - 236px), calc(anchor(--urd-pane right, 100vw) - 244px));
    }

    .cp-anchored:not(:popover-open) {
      display: none;
    }

    @supports (position-try-fallbacks: flip-block) {
      .cp-anchored {
        position-try-fallbacks: flip-block;
      }
    }
  }

  .cp-sv {
    position: relative;
    height: 130px;
    border-radius: 8px;
    cursor: crosshair;
    touch-action: none;
  }

  .cp-cursor {
    position: absolute;
    width: 12px;
    height: 12px;
    transform: translate(-50%, -50%);
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 60%);
    pointer-events: none;
  }

  .cp-hue {
    appearance: none;
    width: 100%;
    height: 12px;
    border-radius: 999px;
    background: linear-gradient(to right,
      #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
    cursor: pointer;
  }

  .cp-hue::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid rgb(0 0 0 / 40%);
  }

  .cp-hue::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid rgb(0 0 0 / 40%);
  }

  /* The alpha slider: checkerboard + color gradient are set inline (they follow the color) */
  .cp-alpha {
    appearance: none;
    width: 100%;
    height: 12px;
    border-radius: 999px;
    cursor: pointer;
  }

  .cp-alpha::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid rgb(0 0 0 / 40%);
  }

  .cp-alpha::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid rgb(0 0 0 / 40%);
  }

  .cp-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .cp-eye {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    padding: 4px 7px;
    min-height: 0;
  }

  .cp-rgb input {
    flex: 1;
    min-width: 0;
    font: 11px/1.3 ui-monospace, monospace;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 5px;
    padding: 4px 5px;
  }

  .cp-preview {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: 1px solid rgb(255 255 255 / 25%);
    flex-shrink: 0;
  }

  .cp-hex {
    flex: 1;
    min-width: 0;
    font: 500 13px/1.2 ui-monospace, monospace;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    padding: 6px 8px;
    text-transform: lowercase;
  }

  .cp-tokens {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .cp-token {
    width: 22px;
    height: 22px;
    padding: 0;
    border: 1px solid rgb(255 255 255 / 30%);
    border-radius: 50%;
    cursor: pointer;
  }

  .cp-token:hover {
    border-color: #fff;
  }

  .cp-token.active {
    outline: 2px solid #fff;
    outline-offset: 1px;
  }

  .cp-swatch.linked {
    outline: 2px solid rgb(255 255 255 / 45%);
    outline-offset: -3px;
  }

  .cp-label {
    font-size: 11px;
    opacity: 0.6;
  }

  .cp-label-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cp-add {
    width: 18px;
    height: 18px;
    min-height: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: inherit;
    background: rgb(255 255 255 / 8%);
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 5px;
    font-size: 12px;
    line-height: 1;
    cursor: pointer;
  }

  .cp-add:hover {
    background: rgb(255 255 255 / 15%);
  }

  .cp-saved {
    position: relative;
    display: inline-flex;
  }

  .cp-del {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 13px;
    height: 13px;
    min-height: 0;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: #e05252;
    color: #fff;
    font-size: 10px;
    line-height: 1;
    cursor: pointer;
  }

  .cp-saved:hover .cp-del {
    display: flex;
  }
</style>
