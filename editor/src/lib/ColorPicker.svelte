<script>
  /**
   * The colour picker: Theme, Custom and Palette tabs, the site's colour sets under them.
   * Its value is a hex code or a theme colour's name, which follows the theme.
   */
  import { getContext, tick } from 'svelte';
  import { lingering, menuMotion, rowMotion } from './motion.svelte.js';
  import { nativeAnchoring, anchorName, namePane } from '$engine/anchored.js';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from './icons.js';
  import { colourGrid, GRID_HUES, GRID_STRENGTHS, pickerStart } from './colour-grid.js';
  import { setsOf, newSetId, colourCode, SET_LIMITS } from './colour-sets.js';
  import ColourSetMaker from './ColourSetMaker.svelte';

  /** `newSets` false leaves «+ New set» out: a picker inside the set maker picks from the sets but makes none. */
  let { value = '#000000', tokens = [], label = ta('cp.pickColor'), onchange, allowClear = false, onremove = undefined, newSets = true } = $props();
  const ed = getContext('urd-editor');

  /** The site's sets, the live set gathered at each opening, the set open under the grid (LIVE, a key no set's id can be), and whether it is being changed. */
  const LIVE = ':live';
  const sets = $derived(ed?.siteDraft ? setsOf(ed.siteDraft.theme) : []);
  let onSite = $state([]);
  let openSet = $state(LIVE);
  let changing = $state(false);
  /** The set shown: the one pressed, or the live set where the one pressed has gone (an undo took it away). */
  const opened = $derived(sets.find((set) => set.id === openSet) ?? null);
  const showing = $derived(openSet === null ? null : openSet === LIVE || opened ? openSet : LIVE);
  /** The name typed, held apart from the stored name while it is typed, so the field never jumps under the caret. */
  let nameText = $state('');
  let nameField = $state(null);
  let liveChip = $state(null);
  let pencil = $state(null);
  /** Whether «+» has something to add: a colour the set lacks, and room for it. */
  const canAdd = $derived(Boolean(opened) && opened.colors.length < SET_LIMITS.colours && !opened.colors.some((c) => c.code === colourCode(hexText)));
  function toggleSet(id) {
    openSet = showing === id ? null : id;
    changing = false;
  }
  /** Enter in the name field: the name kept, the field and the bins put away, the focus back on the pencil. */
  async function nameKey(event) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    changing = false;
    await tick();
    pencil?.focus();
  }
  /** The pencil: the name field and the colours' bins, the focus in the name field. */
  async function startChanging(on) {
    changing = on;
    if (!on || !opened) return;
    nameText = opened.name;
    await tick();
    nameField?.focus();
  }
  /** The set maker standing in the palette's place, opened by «+ New set». */
  let making = $state(false);
  /** A set made in the maker: added in one undo step, the maker closed and the set open under the row. */
  function madeSet({ name, colors }) {
    const id = newSetId(sets);
    if (ed?.addColourSet?.({ id, name, colors })) {
      making = false;
      openSet = id;
      changing = false;
    }
  }
  /** The set deleted, the focus on «On this site», which opens. */
  async function deleteSet(set) {
    ed?.deleteColourSet?.(set.id);
    openSet = LIVE;
    changing = false;
    await tick();
    liveChip?.focus();
  }
  /** A colour taken out, the focus left on the set's pencil rather than on nothing. */
  async function takeOut(set, i) {
    ed?.removeSetColour?.(set.id, i);
    await tick();
    pencil?.focus();
  }
  /** The bin on the swatch's corner: the caller's removal, else emptying a colour that may be empty. */
  const remove = $derived(onremove ?? (allowClear && value ? () => onchange?.('') : null));

  const RECENT_KEY = 'urd-recent-colors';
  const SAVED_KEY = 'urd-saved-colors';
  const FORMAT_KEY = 'urd-colour-format';

  /** A theme colour's name in the admin's language, its token where Urd has no words for it. */
  const TOKEN_WORDS = { bg: 'color.bg', surface: 'color.surface', text: 'color.text', accent: 'color.accent', 'accent-text': 'palette.accentText' };
  const tokenName = (name) => (TOKEN_WORDS[name] ? ta(TOKEN_WORDS[name]) : name);

  /** The palette's strength on view, kept in this browser (lib/colour-grid.js). */
  const STRENGTH_KEY = 'urd-colour-strength';
  let strength = $state(GRID_STRENGTHS[0]);
  const grid = $derived(colourGrid(strength));

  /** The tabs, Theme only where the picker has the theme's colours. */
  const tabs = $derived(tokens.length ? ['theme', 'custom', 'palette'] : ['custom', 'palette']);
  let tab = $state('custom');
  /** The tab chosen, kept in this browser, so every picker opens on it where it has that tab (pickerStart). */
  const TAB_KEY = 'urd-colour-tab';
  function setTab(id) {
    tab = id;
    try {
      localStorage.setItem(TAB_KEY, id);
    } catch {
      // Without storage the picker opens on the tab its colour comes from.
    }
  }
  /** The numbers' format on the Custom tab. */
  const FORMATS = ['hex', 'rgb', 'hsl'];
  const CHANNEL_MAX = { rgb: [255, 255, 255], hsl: [360, 100, 100] };
  let format = $state('hex');

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
  /** Whether this picker stands inside another picker's card (the set maker's): its card then stands beside that card, which is named --urd-cp-card for it. */
  const inCard = $derived(Boolean(rootEl?.parentElement?.closest('.cp-pop')));
  let open = $state(false);
  /** The card stays drawn while the closing pop-up fades out (app.css). */
  const drawn = lingering(() => open);
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

  /** Sends the colour on; `reseed` false keeps the HSL numbers as typed (onChannel). */
  function commit(reseed = true) {
    hexText = currentColor();
    lastPickedHex = hexText;
    onchange?.(hexText);
    if (reseed) seedHsl();
  }

  function setFromHex(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return false;
    [h, s, v] = rgbToHsv(rgb[0], rgb[1], rgb[2]);
    a = rgb[3];
    hexText = currentColor();
    return true;
  }

  /** The state behind the card: the colour it opens on, the tab it comes from, and the stored palettes and format. */
  function prepare() {
    setFromHex(displayHex()) || setFromHex('#000000');
    seedHsl();
    changing = false;
    making = false;
    ed?.readSiteColours?.().then((list) => { onSite = list; }).catch(() => { onSite = []; });
    openedWith = value;
    lastPickedHex = '';
    let kept = null;
    let keptTab = null;
    try {
      kept = localStorage.getItem(STRENGTH_KEY);
      keptTab = localStorage.getItem(TAB_KEY);
    } catch {
      // Without storage the palette opens on the standard strength, on the tab the colour comes from.
    }
    const start = pickerStart({ value, kept, linked: Boolean(linkedToken()), themed: tokens.length > 0, keptTab });
    tab = start.tab;
    strength = start.strength;
    aimGrid();
    try {
      const kept = localStorage.getItem(FORMAT_KEY);
      format = FORMATS.includes(kept) ? kept : 'hex';
    } catch {
      format = 'hex';
    }
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

  /** A click on the card that reaches no control of its own goes no further than the card (the comment on the card's markup says why). */
  function keepClick(event) {
    if (!event.target.closest('button, input, textarea, select, a[href]')) event.preventDefault();
  }

  /** The popover's toggle event drives the open state in the anchored branch. */
  function onToggle(e) {
    if (e.newState === 'open') {
      prepare();
      if (!inCard) namePane(rootEl, true);
      open = true;
    } else if (open) {
      if (!inCard) namePane(rootEl, false);
      open = false;
      remember();
    }
  }

  function openPicker() {
    prepare();
    const r = rootEl.getBoundingClientRect();
    const W = 236;
    const H = 380;
    // Inside the panel's right edge, so it never hangs over the preview; the width the panel lacks goes left, over the tool rail.
    const panel = rootEl.closest('.panel-body')?.getBoundingClientRect();
    const rightEdge = panel ? panel.right : window.innerWidth;
    const left = Math.max(8, Math.min(r.right - W, rightEdge - W - 8));
    // Under the swatch where it fits, else moved up as far as it must to stay in the window.
    const top = Math.max(8, Math.min(r.bottom + 6, window.innerHeight - H - 8));
    // A picker inside another's card stands beside that card, its top at the swatch, so the card it changes stays in view.
    const card = inCard ? rootEl.parentElement.closest('.cp-pop').getBoundingClientRect() : null;
    pos = card
      ? { top: Math.max(8, Math.min(r.top, window.innerHeight - H - 8)), left: card.right + 8 + W <= window.innerWidth - 8 ? card.right + 8 : Math.max(8, card.left - W - 8) }
      : { top, left };
    open = true;
  }

  /** The measured card keeps its foot inside the window as it grows (the set maker opening in it), moved up as far as it must. */
  function keepInWindow(node) {
    const ro = new ResizeObserver(() => {
      const room = window.innerHeight - 8 - node.offsetHeight;
      if (pos.top > room) pos = { ...pos, top: Math.max(8, room) };
    });
    ro.observe(node);
    return () => ro.disconnect();
  }

  /** Remembers the color as recently used (detached hex picks only). */
  function remember() {
    if (lastPickedHex && lastPickedHex !== openedWith) {
      const next = [lastPickedHex, ...recent.filter((c) => c !== lastPickedHex)].slice(0, 8);
      keep(RECENT_KEY, next);
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
    else hexText = currentColor();
    // The field shows the colour held, also where the code typed was not one.
    e.target.value = hexText;
  }

  function rgbToHsl(r, g, b) {
    const [hue] = rgbToHsv(r, g, b);
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const light = (max + min) / 2;
    const d = max - min;
    const sat = d ? d / (1 - Math.abs(2 * light - 1)) : 0;
    return [Math.round(hue), Math.round(sat * 100), Math.round(light * 100)];
  }

  /** HSL straight to the field's HSV, so the hue stands also where the colour is a grey. */
  function hslToHsv(hue, sat, light) {
    sat /= 100;
    light /= 100;
    const val = light + sat * Math.min(light, 1 - light);
    return [hue, val ? 2 * (1 - light / val) : 0, val];
  }

  /** The HSL numbers, held apart from the colour while typed, so a hue typed on a grey, black or white is kept; any other control sets them anew. */
  let hsl = $state([0, 0, 0]);
  function seedHsl() {
    const [hue, sat, light] = rgbToHsl(...hsvToRgb(h, s, v));
    hsl = [sat ? hue : Math.round(h), sat, light];
  }

  /** The three numbers of the format shown, RGB or HSL. */
  function channels() {
    return format === 'hsl' ? hsl : hsvToRgb(h, s, v);
  }

  /** A number typed: kept within its range, an empty or broken one leaving the number as it was, and the field showing the number held. */
  function onChannel(index, input) {
    const now = [...channels()];
    const typed = Number(input.value);
    if (input.value.trim() !== '' && Number.isFinite(typed)) {
      now[index] = Math.min(CHANNEL_MAX[format][index], Math.max(0, Math.round(typed)));
      if (format === 'hsl') {
        hsl = now;
        [h, s, v] = hslToHsv(...now);
        commit(false);
      } else {
        [h, s, v] = rgbToHsv(...now);
        commit();
      }
    }
    input.value = String(now[index]);
  }

  function onOpacity(input) {
    const typed = Number(input.value);
    if (input.value.trim() !== '' && Number.isFinite(typed)) {
      a = Math.min(100, Math.max(0, Math.round(typed))) / 100;
      commit();
    }
    input.value = String(Math.round(a * 100));
  }

  /** A list kept in this browser; without storage it holds for this opening only. */
  function keep(key, list) {
    try {
      localStorage.setItem(key, JSON.stringify(list));
    } catch {
      // Blocked site data: the list stands in memory until the picker closes.
    }
  }

  /** The format chosen, kept for the next time the picker opens in this browser. */
  function setFormat(id) {
    format = id;
    try {
      localStorage.setItem(FORMAT_KEY, id);
    } catch {
      // Without storage the format holds for this opening only.
    }
  }

  /** The palette's strength, kept for the next time the picker opens in this browser; a press on a strength and a pick from the grid both keep it. */
  function setStrength(id) {
    if (strength !== id) {
      strength = id;
      aimGrid();
    }
    try {
      localStorage.setItem(STRENGTH_KEY, id);
    } catch {
      // Without storage the strength holds for this opening only.
    }
  }

  /** The grid is one stop for the Tab key, on the colour in use or the first; the arrows move across and down, Home and End along the row. */
  let gridAt = $state(0);
  function aimGrid() {
    gridAt = Math.max(0, colourGrid(strength).flat().findIndex((cell) => cell.code === hexText.toLowerCase()));
  }
  function gridKeys(event) {
    const cols = GRID_HUES.length;
    const total = grid.length * cols;
    const moves = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols };
    const next = event.key in moves ? gridAt + moves[event.key]
      : event.key === 'Home' ? gridAt - (gridAt % cols)
        : event.key === 'End' ? gridAt - (gridAt % cols) + cols - 1 : null;
    if (next === null) return;
    event.preventDefault();
    if (next < 0 || next >= total) return;
    gridAt = next;
    event.currentTarget.querySelectorAll('.cp-cell')[next]?.focus();
  }

  /** The tabs answer the arrow keys, as a tab list does. */
  function tabKeys(event) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const at = tabs.indexOf(tab);
    setTab(tabs[(at + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]);
    event.currentTarget.querySelector(`[data-tab="${tab}"]`)?.focus();
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
    keep(SAVED_KEY, $state.snapshot(saved));
  }

  function removeSaved(hex) {
    saved = saved.filter((c) => c !== hex);
    keep(SAVED_KEY, $state.snapshot(saved));
  }

  // Closes on a click outside, on Escape, and when the focus moves into a frame such as the preview, never on scroll.
  $effect(() => {
    if (!open) return;
    const onBlur = () => setTimeout(() => {
      if (open && document.activeElement instanceof HTMLIFrameElement) close();
    });
    window.addEventListener('blur', onBlur);
    if (native) return () => window.removeEventListener('blur', onBlur);
    const onDown = (e) => {
      if (rootEl && !rootEl.contains(e.target)) close();
    };
    // Escape closes a picker open inside this one's card first, as the top layer does in the anchored branch.
    const onKey = (e) => {
      if (e.key === 'Escape' && !rootEl?.querySelector('.cp-pop .cp-pop')) close();
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
  {#if remove}
    <button type="button" class="cp-remove danger" title={ta('cp.clearTitle')}
      aria-label={ta('cp.clear')} onclick={() => remove()}>{@html ICONS.bin}</button>
  {/if}
  <!-- keepClick cancels a click on the card outside its controls, which a surrounding <label> would pass on to the swatch. -->
  {#if native}
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div class="cp-pop cp-anchored" class:cp-beside={inCard} id={popId} popover="auto" bind:this={popEl}
      style="position-anchor: {anchor}{inCard ? '' : '; anchor-name: --urd-cp-card'}" ontoggle={onToggle} onclick={keepClick}>
      {#if drawn.shown}
        {@render card()}
      {/if}
    </div>
  {:else if open}
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div class="cp-pop" style="top: {pos.top}px; left: {pos.left}px" transition:menuMotion
      onclick={keepClick} {@attach keepInWindow}>
      {@render card()}
    </div>
  {/if}
</span>

{#snippet card()}
      <div class="cp-tabs" role="tablist" aria-label={label} tabindex="-1" onkeydown={tabKeys}>
        {#each tabs as id (id)}
          <button type="button" role="tab" data-tab={id} id="{popId}-tab-{id}" aria-selected={tab === id} aria-controls="{popId}-pane" tabindex={tab === id ? 0 : -1} onclick={() => setTab(id)}>{ta(`cp.tab.${id}`)}</button>
        {/each}
      </div>
      <div class="cp-pane" id="{popId}-pane" role="tabpanel" aria-labelledby="{popId}-tab-{tab}">
        {#if tab === 'theme'}
          <!-- The theme's colours by name: a pick stores the name, so the colour follows the theme -->
          <div class="cp-theme">
            {#each tokens as [name, hex] (name)}
              <button type="button" class="cp-tile" class:active={value === name} aria-pressed={value === name}
                title={ta('cp.tokenTitle', { name: tokenName(name) })} onclick={() => pickToken(name, hex)}>
                <span class="cp-tile-colour" style="background: {hex}"></span>
                <span class="cp-tile-name">{tokenName(name)}</span>
              </button>
            {/each}
          </div>
        {:else if tab === 'custom'}
          <div class="cp-sv"
            style="background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl({h}, 100%, 50%)"
            onpointerdown={svDown}>
            <span class="cp-cursor" style="left: {s * 100}%; top: {(1 - v) * 100}%"></span>
          </div>
          <input class="cp-hue" type="range" min="0" max="360" step="1" value={h} aria-label={ta('cp.hue')}
            oninput={(e) => { h = Number(e.target.value); commit(); }} />
          <input class="cp-alpha" type="range" min="0" max="100" step="1" value={Math.round(a * 100)}
            title={ta('cp.opacity')} aria-label={ta('cp.opacity')}
            style="background: linear-gradient(to right, transparent, {currentHex()}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px"
            oninput={(e) => { a = Number(e.target.value) / 100; commit(); }} />
          <!-- The eyedropper beside the format, then the code or the three numbers in the format chosen, and the opacity -->
          <span class="cp-row">
            {#if hasEyeDropper}
              <button type="button" class="cp-eye" title={ta('cp.eyedropper')} aria-label={ta('cp.eyedropper')} onclick={pickFromScreen}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2l4 4-3 3-4-4 3-3z"/><path d="M15 5L4 16l-1 5 5-1L19 9"/></svg>
              </button>
            {/if}
            <span class="cp-formats" role="group" aria-label={ta('cp.format')}>
              {#each FORMATS as id (id)}
                <button type="button" aria-pressed={format === id} onclick={() => setFormat(id)}>{ta(`cp.format.${id}`)}</button>
              {/each}
            </span>
          </span>
          <span class="cp-row cp-values">
            {#if format === 'hex'}
              <input class="cp-hex" value={hexText} spellcheck="false" aria-label={ta('cp.format.hex')} onchange={onHexInput} />
            {:else}
              {@const letters = ta(`cp.channels.${format}`).split(' ')}
              {@const names = ta(`cp.channelNames.${format}`).split(', ')}
              {#each channels() as n, i (i)}
                <label class="cp-num" title={names[i]}><span aria-hidden="true">{letters[i]}</span>
                  <input type="number" min="0" max={CHANNEL_MAX[format][i]} value={n} aria-label={names[i]} onchange={(e) => onChannel(i, e.currentTarget)} /></label>
              {/each}
            {/if}
            <label class="cp-num cp-opacity" title={ta('cp.opacity')}>
              <input type="number" min="0" max="100" value={Math.round(a * 100)} aria-label={ta('cp.opacity')} onchange={(e) => onOpacity(e.currentTarget)} /><span aria-hidden="true">%</span></label>
          </span>
        {:else}
          {#if making}
            <ColourSetMaker inUse={currentColor()} onmake={madeSet} onclose={() => (making = false)} />
          {:else}
          <!-- The palette: the strength over the grid, the grey and twelve hues across and light to dark down; a pick stores the colour's code -->
          <div class="cp-strengths" role="group" aria-label={ta('cp.strength')}>
            {#each GRID_STRENGTHS as id (id)}
              <button type="button" aria-pressed={strength === id} onclick={() => setStrength(id)}>{ta(`cp.strength.${id}`)}</button>
            {/each}
          </div>
          <!-- The group moves the focus among its cells with the arrows, as the tab list does -->
          <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
          <div class="cp-palette" role="group" aria-label={ta(`cp.strength.${strength}`)} onkeydown={gridKeys}>
            {#each grid as row, step (step)}
              {#each row as cell, col (cell.hue)}
                {@const name = ta('cp.cell', { hue: ta(`cp.hues.${cell.hue}`), step: cell.step, code: cell.code })}
                {@const at = step * row.length + col}
                <button type="button" class="cp-cell" class:active={hexText.toLowerCase() === cell.code} style="background: {cell.code}"
                  title={name} aria-label={name} aria-pressed={hexText.toLowerCase() === cell.code} tabindex={at === gridAt ? 0 : -1}
                  onfocus={() => (gridAt = at)} onclick={() => { setStrength(strength); pick(cell.code); }}></button>
              {/each}
            {/each}
          </div>
          {#if ed?.siteDraft}
            <!-- The site's sets: «On this site» first, the site's own after it, and a new set at the end; the one pressed slides open under the row -->
            <div class="cp-sets" role="group" aria-label={ta('cp.sets')}>
              <button type="button" class="cp-chip" aria-pressed={showing === LIVE} title={ta('tip.cp.onSite')} bind:this={liveChip} onclick={() => toggleSet(LIVE)}>{ta('cp.onSite')}</button>
              {#each sets as set (set.id)}
                <button type="button" class="cp-chip" aria-pressed={showing === set.id} onclick={() => toggleSet(set.id)}>{set.name}</button>
              {/each}
              {#if newSets}
                <button type="button" class="cp-chip cp-chip-add" disabled={sets.length >= SET_LIMITS.sets} onclick={() => (making = true)}>{@html ICONS.plus}<span>{ta('cp.newSet')}</span></button>
              {/if}
            </div>
            {#if showing === LIVE}
              <div class="cp-set-open" transition:rowMotion>
                {#if onSite.length}
                  <div class="cp-set-row">
                    {#each onSite as c (c.code)}
                      <button type="button" class="cp-cell" class:active={hexText.toLowerCase() === c.code} style="background: {c.code}"
                        title={c.code} aria-label={c.code} aria-pressed={hexText.toLowerCase() === c.code} onclick={() => pick(c.code)}></button>
                    {/each}
                  </div>
                {:else}
                  <span class="cp-set-none">{ta('cp.onSiteNone')}</span>
                {/if}
              </div>
            {:else if opened}
              <div class="cp-set-open" transition:rowMotion>
                <div class="cp-set-head">
                  {#if changing}
                    <input class="cp-set-name" bind:this={nameField} value={nameText} aria-label={ta('cp.setName')} maxlength="40"
                      oninput={(e) => { nameText = e.currentTarget.value; ed.renameColourSet(opened.id, nameText); }} onkeydown={nameKey}
                      onchange={() => { nameText = opened.name; }} />
                  {:else}
                    <span class="cp-set-title">{opened.name}</span>
                  {/if}
                  <button type="button" class="cp-tool" bind:this={pencil} aria-pressed={changing} title={ta('cp.changeSet')} aria-label={ta('cp.changeSet')} onclick={() => startChanging(!changing)}>{@html ICONS.pencil}</button>
                  <button type="button" class="cp-tool" disabled={!canAdd} title={ta('cp.addToSet')} aria-label={ta('cp.addToSet')} onclick={() => ed.addSetColour(opened.id, currentColor())}>{@html ICONS.plus}</button>
                  <button type="button" class="cp-tool danger" title={ta('cp.deleteSet', { name: opened.name })} aria-label={ta('cp.deleteSet', { name: opened.name })} onclick={() => deleteSet(opened)}>{@html ICONS.bin}</button>
                </div>
                <div class="cp-set-row">
                  {#each opened.colors as c, i (i)}
                    {@const name = c.name ? `${c.name}: ${c.code}` : c.code}
                    <span class="cp-set-cell">
                      <button type="button" class="cp-cell" class:active={hexText.toLowerCase() === c.code} style="background: {c.code}"
                        title={name} aria-label={name} aria-pressed={hexText.toLowerCase() === c.code} onclick={() => pick(c.code)}></button>
                      {#if changing}
                        <button type="button" class="cp-cell-del danger" title={ta('cp.takeOut', { name: c.name || c.code })} aria-label={ta('cp.takeOut', { name: c.name || c.code })}
                          onclick={() => takeOut(opened, i)}>{@html ICONS.bin}</button>
                      {/if}
                    </span>
                  {/each}
                </div>
              </div>
            {/if}
          {/if}
          {/if}
        {/if}
      </div>
      <div class="cp-sep"></div>
      <span class="cp-label cp-label-row">{ta('cp.saved')}
        <button type="button" class="cp-add" title={ta('cp.saveTitle')} aria-label={ta('cp.saveTitle')} onclick={addSaved}>{@html ICONS.plus}</button>
      </span>
      {#if saved.length}
        <span class="cp-tokens">
          {#each saved as hex (hex)}
            <span class="cp-saved">
              <button type="button" class="cp-token" style="background: {hex}"
                title={hex} aria-label={hex} onclick={() => pick(hex)}></button>
              <button type="button" class="cp-del danger" title={ta('cp.removeSaved')} aria-label={ta('cp.removeSaved')}
                onclick={() => removeSaved(hex)}>{@html ICONS.bin}</button>
            </span>
          {/each}
        </span>
      {/if}
      {#if recent.length}
        <span class="cp-label">{ta('common.recent')}</span>
        <span class="cp-tokens">
          {#each recent as hex (hex)}
            <button type="button" class="cp-token" style="background: {hex}"
              title={hex} aria-label={hex} onclick={() => pick(hex)}></button>
          {/each}
        </span>
      {/if}
{/snippet}

<style>
  .cp {
    position: relative;
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

  /* The colour's removal: the bin on the dark red every removal draws (app.css .icon-btn.danger), small on the swatch's top right corner */
  .cp-remove {
    position: absolute;
    top: -6px;
    right: -6px;
    z-index: 1;
    width: 18px;
    height: 18px;
    min-height: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    line-height: 1;
    color: #ffd4d4;
    background: #5e1c22;
    border: 1px solid #7d2a31;
    border-radius: 50%;
    cursor: pointer;
  }

  .cp-remove:is(:hover, :focus-visible) {
    background: #7a222a;
    border-color: #9a3a42;
  }

  .cp-remove :global(svg) {
    width: 10px;
    height: 10px;
  }

  .cp-pop {
    position: fixed;
    z-index: 500;
    /* The visible width, the number openPicker places it by */
    box-sizing: border-box;
    width: 236px;
    display: grid;
    /* One column never wider than the box */
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
    padding: 10px;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 10px;
    box-shadow: 0 12px 36px rgb(0 0 0 / 55%);
    color: var(--urd-color-text, #e8eaf0);
    /* A site with many sets makes a tall card: it scrolls within the window, never past it */
    max-height: calc(100dvh - 16px);
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  /* The anchored branch: under the swatch, right edges aligned, moved up to the window's foot where it does not fit (--cp-fit, app.css), else above the swatch */
  @supports (anchor-name: --a) {
    .cp-anchored {
      inset: auto;
      margin: 6px 0 0;
      top: anchor(bottom);
      /* Right edges aligned with the swatch, kept inside its pane (--urd-pane, named by namePane while open) */
      left: clamp(calc(anchor(--urd-pane left, 0px) + 8px), calc(anchor(right) - 236px), calc(anchor(--urd-pane right, 100vw) - 244px));
    }

    .cp-anchored:not(:popover-open) {
      display: none;
    }

    /* A picker inside another's card: beside that card, its top at the swatch, kept inside the window (--cp-beside-fit, app.css) */
    .cp-anchored.cp-beside {
      margin: 0 0 0 8px;
      top: anchor(top);
      left: anchor(--urd-cp-card right);
    }

    @supports (position-try-fallbacks: flip-block) {
      .cp-anchored {
        position-try-fallbacks: --cp-fit, flip-block;
      }

      .cp-anchored.cp-beside {
        position-try-fallbacks: --cp-beside-fit, flip-inline, --cp-beside-fit flip-inline;
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

  .cp-values {
    gap: 6px;
  }

  /* The tabs and the format switch: segments of the card's own, the one chosen in the admin's accent */
  .cp-tabs,
  .cp-formats {
    flex: 1;
    min-width: 0;
    display: flex;
    padding: 2px;
    background: rgb(0 0 0 / 22%);
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 8px;
  }

  .cp-tabs button,
  .cp-formats button {
    flex: 1;
    min-width: 0;
    height: 26px;
    padding: 0 6px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: inherit;
    opacity: 0.72;
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
  }

  .cp-formats button {
    height: 24px;
    font-size: 11px;
  }

  .cp-tabs button:hover,
  .cp-formats button:hover {
    opacity: 1;
  }

  .cp-tabs button[aria-selected='true'],
  .cp-formats button[aria-pressed='true'] {
    opacity: 1;
    background: var(--urd-color-accent, #7c5cff);
    color: var(--urd-color-accent-text, #fff);
  }

  .cp-tabs button:focus-visible,
  .cp-formats button:focus-visible,
  .cp-tile:focus-visible,
  .cp-cell:focus-visible,
  .cp-eye:focus-visible {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: 2px;
  }

  .cp-pane {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
  }

  /* Theme: the theme's colours as named tiles, two to a row, the one in use outlined in the accent */
  .cp-theme {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }

  .cp-tile {
    display: grid;
    gap: 5px;
    padding: 5px;
    text-align: left;
    color: inherit;
    font-family: inherit;
    font-size: 12px;
    line-height: 1.25;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 8px;
    cursor: pointer;
  }

  .cp-tile:hover {
    border-color: rgb(255 255 255 / 32%);
  }

  .cp-tile.active {
    border-color: var(--urd-color-accent, #7c5cff);
    box-shadow: inset 0 0 0 1px var(--urd-color-accent, #7c5cff);
  }

  .cp-tile-colour {
    height: 26px;
    border-radius: 5px;
    border: 1px solid rgb(255 255 255 / 18%);
  }

  /* Custom: the eyedropper drawn as the card's other controls, the code or the three numbers, and the opacity */
  .cp-eye {
    flex: none;
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    padding: 0;
    color: inherit;
    background: rgb(0 0 0 / 22%);
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    cursor: pointer;
  }

  .cp-eye:hover {
    border-color: rgb(255 255 255 / 40%);
  }

  .cp-hex {
    flex: 1;
    min-width: 0;
    height: 30px;
    box-sizing: border-box;
    font: 500 13px/1.2 ui-monospace, monospace;
    color: inherit;
    background: rgb(0 0 0 / 22%);
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    padding: 0 8px;
    text-transform: lowercase;
  }

  .cp-num {
    flex: 1;
    min-width: 0;
    height: 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 3px;
    padding: 0 5px;
    background: rgb(0 0 0 / 22%);
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
  }

  .cp-num:focus-within {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .cp-num span {
    flex: none;
    font-family: inherit;
    font-size: 10px;
    font-weight: 600;
    line-height: 1;
    opacity: 0.6;
  }

  .cp-num input {
    flex: 1;
    width: 100%;
    min-width: 0;
    padding: 0;
    font: 12px/1.2 ui-monospace, monospace;
    color: inherit;
    background: transparent;
    border: 0;
    outline: none;
    appearance: textfield;
    -moz-appearance: textfield;
  }

  .cp-num input::-webkit-inner-spin-button,
  .cp-num input::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }

  .cp-opacity {
    flex: 0 0 52px;
  }

  .cp-opacity input {
    text-align: right;
  }

  /* Palette: the strengths in two rows of three, then the grey and twelve hues across, light to dark down, the colour in use outlined */
  .cp-strengths {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    padding: 2px;
    background: rgb(0 0 0 / 22%);
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 8px;
  }

  .cp-strengths button {
    flex: 1 0 30%;
    min-width: 0;
    height: 22px;
    padding: 0 4px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: inherit;
    opacity: 0.72;
    font-family: inherit;
    font-size: 11px;
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
  }

  .cp-strengths button:hover {
    opacity: 1;
  }

  .cp-strengths button[aria-pressed='true'] {
    opacity: 1;
    background: var(--urd-color-accent, #7c5cff);
    color: var(--urd-color-accent-text, #fff);
  }

  .cp-strengths button:focus-visible {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: 2px;
  }

  .cp-palette {
    display: grid;
    grid-template-columns: repeat(13, minmax(0, 1fr));
    gap: 2px;
  }

  .cp-cell {
    aspect-ratio: 1;
    min-width: 0;
    padding: 0;
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 3px;
    cursor: pointer;
  }

  .cp-cell:hover {
    border-color: rgb(255 255 255 / 70%);
  }

  .cp-cell.active {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: 1px;
  }

  /* The site's sets under the grid: a row of chips, the open set's head with its tools, and its colours in the grid's columns */
  .cp-sets {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .cp-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    min-height: 22px;
    padding: 2px 8px;
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 999px;
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: 11px;
    line-height: 1.2;
    text-align: left;
    cursor: pointer;
  }

  .cp-chip:hover {
    border-color: rgb(255 255 255 / 34%);
  }

  .cp-chip[aria-pressed='true'] {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 18%, transparent);
  }

  .cp-chip-add {
    border-style: dashed;
  }

  .cp-chip:disabled,
  .cp-tool:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .cp-set-open {
    display: grid;
    gap: 8px;
  }

  .cp-chip :global(svg) {
    width: 10px;
    height: 10px;
  }

  .cp-chip:focus-visible,
  .cp-tool:focus-visible {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: 2px;
  }

  .cp-set-head {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .cp-set-title {
    flex: 1;
    min-width: 0;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    opacity: 0.7;
    overflow-wrap: anywhere;
  }

  .cp-set-name {
    flex: 1;
    min-width: 0;
    height: 24px;
    box-sizing: border-box;
    padding: 0 6px;
    font: inherit;
    font-size: 12px;
    color: inherit;
    background: rgb(0 0 0 / 22%);
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
  }

  .cp-tool {
    flex: none;
    width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
    padding: 0;
    color: inherit;
    background: rgb(0 0 0 / 22%);
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    cursor: pointer;
  }

  .cp-tool[aria-pressed='true'] {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .cp-tool.danger {
    color: #ffd4d4;
    background: #5e1c22;
    border-color: #7d2a31;
  }

  .cp-tool.danger:is(:hover, :focus-visible) {
    background: #7a222a;
  }

  .cp-tool :global(svg) {
    width: 12px;
    height: 12px;
  }

  .cp-set-row {
    display: grid;
    grid-template-columns: repeat(13, minmax(0, 1fr));
    gap: 2px;
  }

  .cp-set-cell {
    position: relative;
    display: grid;
  }

  /* A colour of a set being changed: the bin on the dark red of every removal, on its corner */
  .cp-cell-del {
    position: absolute;
    top: -5px;
    right: -5px;
    z-index: 1;
    width: 13px;
    height: 13px;
    display: grid;
    place-items: center;
    padding: 0;
    border: 1px solid #7d2a31;
    border-radius: 50%;
    background: #5e1c22;
    color: #ffd4d4;
    cursor: pointer;
  }

  .cp-cell-del:is(:hover, :focus-visible) {
    background: #7a222a;
  }

  .cp-cell-del :global(svg) {
    width: 7px;
    height: 7px;
  }

  .cp-set-none {
    font-size: 11px;
    opacity: 0.6;
  }

  .cp-sep {
    height: 1px;
    background: rgb(255 255 255 / 10%);
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

  /* A saved colour's deletion: the bin on the dark red every deletion draws (app.css .icon-btn.danger), small on the swatch's corner */
  .cp-del {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 16px;
    height: 16px;
    min-height: 0;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid #7d2a31;
    border-radius: 50%;
    background: #5e1c22;
    color: #ffd4d4;
    font-size: 10px;
    line-height: 1;
    cursor: pointer;
  }

  .cp-del:is(:hover, :focus-visible) {
    background: #7a222a;
    border-color: #9a3a42;
  }

  .cp-del :global(svg) {
    width: 9px;
    height: 9px;
  }

  .cp-saved:hover .cp-del {
    display: flex;
  }
</style>
