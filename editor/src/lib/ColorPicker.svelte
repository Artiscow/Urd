<script>
  /**
   * Moderne fargevelger: flate for metning/lysstyrke, kulør-glider,
   * hex-felt, nylige farger og temafargene som hurtigvalg.
   *
   * Verdien er ENTEN #rrggbb ELLER et temafarge-NAVN (f.eks. 'accent'):
   * å velge en temaprikk lagrer navnet, så innholdet omfarges når
   * temaet endres (motorens resolveColor forstår begge). Flate/hex gir
   * en frikoblet hex-verdi.
   *
   * Popoveren er position: fixed (panelene klipper absolute innhold),
   * og lukkes ved klikk utenfor eller Escape.
   */
  let { value = '#000000', tokens = [], label = 'Velg farge', onchange } = $props();

  const RECENT_KEY = 'urd-recent-colors';
  const SAVED_KEY = 'urd-saved-colors';

  /** Visningsfargen: token-navn slås opp i temaprikkene. */
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

  // HSV-tilstand mens velgeren er åpen (a = gjennomsiktighet 0..1)
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

  /** Utgående verdi: #rrggbb, eller #rrggbbaa når gjennomsiktighet er valgt. */
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

  function openPicker() {
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
    const r = rootEl.getBoundingClientRect();
    const W = 236;
    const H = 380;
    const left = Math.max(8, Math.min(r.right - W, window.innerWidth - W - 8));
    const top = r.bottom + H + 8 > window.innerHeight ? Math.max(8, r.top - H - 8) : r.bottom + 6;
    pos = { top, left };
    open = true;
  }

  function close() {
    open = false;
    // Husk fargen som nylig brukt (kun frikoblede hex-valg).
    if (lastPickedHex && lastPickedHex !== openedWith) {
      const next = [lastPickedHex, ...recent.filter((c) => c !== lastPickedHex)].slice(0, 8);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    }
  }

  /** Temaprikk: lagre NAVNET, så elementet følger temaet. */
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

  /** RGB-feltene: paritet med lerretets fargevelger. */
  function rgbValue(index) {
    return (hexToRgb(currentHex()) ?? [0, 0, 0])[index];
  }

  function onRgbInput(index, raw) {
    const rgb = hexToRgb(currentHex()) ?? [0, 0, 0];
    rgb[index] = Math.min(255, Math.max(0, Number(raw) || 0));
    [h, s, v] = rgbToHsv(...rgb);
    commit();
  }

  /** Pipette (EyeDropper-API): plukk en farge fra hvor som helst på skjermen. */
  const hasEyeDropper = typeof window !== 'undefined' && 'EyeDropper' in window;

  async function pickFromScreen() {
    try {
      const result = await new window.EyeDropper().open();
      if (setFromHex(result.sRGBHex)) commit();
    } catch { /* avbrutt pipette er helt greit */ }
  }

  function pick(hex) {
    if (setFromHex(hex)) commit();
  }

  /** Lagrede farger: eierens faste palett, delt lager med lerretets fargevelger. */
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

  // Lukk ved klikk utenfor eller Escape (kun mens åpen)
  $effect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootEl && !rootEl.contains(e.target)) close();
    };
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    const onScroll = (e) => {
      if (rootEl && e.target instanceof Node && !rootEl.contains(e.target)) close();
    };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('scroll', onScroll, true);
    };
  });
</script>

<span class="cp" bind:this={rootEl}>
  <button type="button" class="cp-swatch" class:linked={linkedToken()}
    style="background: {displayHex()}" title={linkedToken() ? `${label} (koblet til temafargen «${linkedToken()}»)` : label}
    aria-label={label} onclick={() => (open ? close() : openPicker())}></button>
  {#if open}
    <div class="cp-pop" style="top: {pos.top}px; left: {pos.left}px">
      <div class="cp-sv"
        style="background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl({h}, 100%, 50%)"
        onpointerdown={svDown}>
        <span class="cp-cursor" style="left: {s * 100}%; top: {(1 - v) * 100}%"></span>
      </div>
      <input class="cp-hue" type="range" min="0" max="360" step="1" value={h}
        oninput={(e) => { h = Number(e.target.value); commit(); }} />
      <input class="cp-alpha" type="range" min="0" max="100" step="1" value={Math.round(a * 100)}
        title="Gjennomsiktighet"
        style="background: linear-gradient(to right, transparent, {currentHex()}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px"
        oninput={(e) => { a = Number(e.target.value) / 100; commit(); }} />
      <span class="cp-row">
        <span class="cp-preview" style="background: {hexText}"></span>
        <input class="cp-hex" value={hexText} spellcheck="false" onchange={onHexInput} />
        {#if hasEyeDropper}
          <button type="button" class="cp-eye" title="Pipette: plukk farge fra skjermen" onclick={pickFromScreen}>
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
        <span class="cp-label">Temafarger{#if linkedToken()} - koblet til «{linkedToken()}»{/if}</span>
        <span class="cp-tokens">
          {#each tokens as [name, hex] (name)}
            <button type="button" class="cp-token" class:active={value === name}
              style="background: {hex}" title="Temafarge: {name} (følger temaet)"
              onclick={() => pickToken(name, hex)}></button>
          {/each}
        </span>
      {/if}
      <span class="cp-label cp-label-row">Lagrede
        <button type="button" class="cp-add" title="Lagre gjeldende farge" onclick={addSaved}>+</button>
      </span>
      {#if saved.length}
        <span class="cp-tokens">
          {#each saved as hex (hex)}
            <span class="cp-saved">
              <button type="button" class="cp-token" style="background: {hex}"
                title={hex} onclick={() => pick(hex)}></button>
              <button type="button" class="cp-del" title="Fjern lagret farge"
                onclick={() => removeSaved(hex)}>×</button>
            </span>
          {/each}
        </span>
      {/if}
      {#if recent.length}
        <span class="cp-label">Nylige</span>
        <span class="cp-tokens">
          {#each recent as hex (hex)}
            <button type="button" class="cp-token" style="background: {hex}"
              title={hex} onclick={() => pick(hex)}></button>
          {/each}
        </span>
      {/if}
    </div>
  {/if}
</span>

<style>
  .cp {
    display: inline-flex;
  }

  .cp-swatch {
    width: 3rem;
    height: 2.2rem;
    padding: 0;
    border: 1px solid rgb(255 255 255 / 25%);
    border-radius: 6px;
    cursor: pointer;
  }

  .cp-pop {
    position: fixed;
    z-index: 500;
    width: 236px;
    display: grid;
    gap: 8px;
    padding: 10px;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 10px;
    box-shadow: 0 12px 36px rgb(0 0 0 / 55%);
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

  /* Gjennomsiktighetsglideren: sjakkbrett + fargegradient settes inline (følger fargen) */
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
