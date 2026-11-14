<script>
  /* The text bar (0.7.3.19): the tools of a text written on the canvas, drawn over the stage instead of in the page, so it is never cut off at the canvas's edge and stands beside the phone, clear of the page, where the stage has room (placeTextBar in menu-place.js).
     The preview keeps the writing (preview-edit.js textCommand): the bar shows what the selection holds as the preview tells it (state/text-bar.svelte.js) and sends each tool back as a command on that selection.
     A press keeps the focus where it is (mousedown is held, but in fields), so the text keeps its caret; the fields and the colour picker take the focus, and the commands work on the selection the preview kept. */
  import { getContext } from 'svelte';
  import { ta, adminLang } from '$engine/i18n.js';
  import { fontChoices } from '$engine/fonts.js';
  import { SIZE_MIN, SIZE_MAX, LINE_HEIGHTS } from '$engine/text-typo.js';
  import { GLYPH_CATEGORIES, readRecentGlyphs, saveRecentGlyph } from '$engine/glyphs.js';
  import Dropdown from './Dropdown.svelte';
  import ColorPicker from './ColorPicker.svelte';
  import { placeTextBar } from './menu-place.js';
  import { textBarState as bar } from '../state/text-bar.svelte.js';
  import { menuMotion, rowMotion } from './motion.svelte.js';

  const ed = getContext('urd-editor');

  const MINUS = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M2.5 6h7"/></svg>';
  const PLUS = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 2.5v7M2.5 6h7"/></svg>';
  const PALETTE = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="9" r="1" fill="currentColor"/><circle cx="15.5" cy="9" r="1" fill="currentColor"/><circle cx="8.5" cy="15" r="1" fill="currentColor"/><path d="M21 12a9 9 0 0 1-9 9c2.5-2 1-4.5 3-5.5s6 .5 6-3.5z"/></svg>';
  const SPACING = '<svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2.5v9M1.2 4.2 3 2.4l1.8 1.8M1.2 9.8 3 11.6l1.8-1.8M7.5 3.5h7.5M7.5 7h7.5M7.5 10.5h7.5"/></svg>';
  const OUTDENT = '<svg width="15" height="13" viewBox="0 0 15 13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 2h12M6.5 6.5h7M1.5 11h12M4.3 4.5 2 6.5l2.3 2"/></svg>';
  const INDENT = '<svg width="15" height="13" viewBox="0 0 15 13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 2h12M6.5 6.5h7M1.5 11h12M2 4.5l2.3 2L2 8.5"/></svg>';
  const QUOTE = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5C3.8 5 2 6.8 2 9s1.8 4 4 4c.3 0 .5 0 .8-.1C6.2 14.8 5 16.4 3.4 17.4l1.2 1.8C8 17 10 13.7 10 10.2 10 7.2 8.3 5 6 5z"/><path d="M17 5c-2.2 0-4 1.8-4 4s1.8 4 4 4c.3 0 .5 0 .8-.1-.6 1.9-1.8 3.5-3.4 4.5l1.2 1.8C19 17 21 13.7 21 10.2 21 7.2 19.3 5 17 5z"/></svg>';
  const GLYPH = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><line x1="9" y1="9.5" x2="9" y2="9.5"/><line x1="15" y1="9.5" x2="15" y2="9.5"/><path d="M8.5 14.5c.8 1.2 2 2 3.5 2s2.7-.8 3.5-2"/></svg>';
  const LINK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"/></svg>';
  const CLEAR = '<svg width="16" height="14" viewBox="0 0 26 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 5h12"/><path d="M11 5L8 19"/><path d="M18 15l6 6"/><path d="M24 15l-6 6"/></svg>';
  /** The alignments' drawings: three lines, the middle one shorter and placed as the words are. */
  const align = (middle) => `<svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M1 2h12M${middle}M1 10h12"/></svg>`;
  const ALIGNS = [
    ['justifyLeft', 'tt.alignLeft', align('1 6h7')],
    ['justifyCenter', 'tt.alignCenter', align('3.5 6h7')],
    ['justifyRight', 'tt.alignRight', align('6 6h7')],
    ['justifyFull', 'tt.alignJustify', align('1 6h12')],
  ];
  const UL = '<svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="1.6" cy="2" r="1" fill="currentColor" stroke="none"/><circle cx="1.6" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="1.6" cy="10" r="1" fill="currentColor" stroke="none"/><path d="M5 2h8M5 6h8M5 10h8"/></svg>';
  /** A capital A drawn as lines, the letter the superscript, subscript and highlight tools mark. */
  const A_PATH = 'M1.5 13.5 5.5 2.5l4 11M3 9.5h5';
  const SUP = `<svg width="16" height="15" viewBox="0 0 16 15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${A_PATH}"/><path d="M11 2.6c.3-.6.9-1 1.6-1 .9 0 1.5.6 1.5 1.3 0 .5-.2.9-.7 1.3L11 6.3h3.2"/></svg>`;
  const SUB = `<svg width="16" height="15" viewBox="0 0 16 15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${A_PATH}"/><path d="M11 9.6c.3-.6.9-1 1.6-1 .9 0 1.5.6 1.5 1.3 0 .5-.2.9-.7 1.3L11 13.3h3.2"/></svg>`;
  const HL_A = `<svg width="11" height="15" viewBox="0 0 11 15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${A_PATH}"/></svg>`;
  const OL = '<svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><g fill="currentColor" stroke="none" font-size="4.6" font-family="system-ui, sans-serif" font-weight="700"><text x="0" y="3.6">1</text><text x="0" y="7.6">2</text><text x="0" y="11.6">3</text></g><path d="M5 2h8M5 6h8M5 10h8"/></svg>';

  const levels = [['p', ta('tt.paragraph')], ['h1', ta('tt.headingN', { n: 1 })], ['h2', ta('tt.headingN', { n: 2 })], ['h3', ta('tt.headingN', { n: 3 })]];
  const fonts = fontChoices(ta, [['', ta('tt.inheritFont')]]);
  const lhFormat = new Intl.NumberFormat(adminLang(), { minimumFractionDigits: 1, maximumFractionDigits: 2 });

  let barEl = $state(null);
  let w = $state(0);
  let h = $state(0);
  /** The sub-row standing open under the bar's rows: the colours, the spacing or the glyphs. */
  let sub = $state(null);
  /** Whether the size field is being typed in, and the size it showed as it took the focus, kept while it is typed in so the selection's size does not write over it. */
  let sizeFocus = $state(false);
  let sizeHeld = $state('');
  let ownColour = $state('#ffffff');
  let ownHighlight = $state('#ffe066');
  let recent = $state(readRecentGlyphs());
  /** Counted up when the window or the stage changes size, or the stage is panned, so the bar's place is reckoned again. */
  let resized = $state(0);

  const sel = $derived(bar.selection);
  const open = $derived(Boolean(bar.blockId && bar.rect && sel && ed.chromeVisible && !ed.looking));
  const swatch = (name) => ed.themeSwatches().find(([token]) => token === name)?.[1] ?? 'transparent';

  /** The bar's place in the window: the block's box from the canvas's px through the canvas's place and zoom, beside the canvas or above the block. */
  const place = $derived.by(() => {
    void resized;
    const frame = ed.iframeEl;
    const wrap = ed.frameWrapEl;
    if (!open || !frame || !wrap) return null;
    const ir = frame.getBoundingClientRect();
    const stage = wrap.getBoundingClientRect();
    const s = ed.scale || 1;
    const r = bar.rect;
    const block = { left: ir.left + s * r.left, top: ir.top + s * r.top, right: ir.left + s * r.right, bottom: ir.top + s * r.bottom };
    const canvas = { left: Math.max(ir.left, stage.left), right: Math.min(ir.right, stage.right) };
    return placeTextBar(block, { w: w || 440, h: h || 120 }, canvas, stage);
  });

  // The text's writing changed: the sub-row closes.
  $effect(() => {
    void bar.blockId;
    sub = null;
  });

  $effect(() => {
    const wrap = ed.frameWrapEl;
    const onMove = () => { resized += 1; };
    window.addEventListener('resize', onMove);
    wrap?.addEventListener('scroll', onMove, { passive: true });
    const ro = wrap ? new ResizeObserver(onMove) : null;
    ro?.observe(wrap);
    return () => {
      window.removeEventListener('resize', onMove);
      wrap?.removeEventListener('scroll', onMove);
      ro?.disconnect();
    };
  });

  // A press in the editor outside the bar and its pickers ends the writing, as a press elsewhere on the canvas does.
  $effect(() => {
    if (!open) return;
    const press = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target || barEl?.contains(target) || target.closest('.dd-pop, .cp-pop, dialog')) return;
      bar.end();
    };
    document.addEventListener('pointerdown', press, true);
    return () => document.removeEventListener('pointerdown', press, true);
  });

  /** A press on the bar keeps the focus where it is, so the text keeps its caret; its fields take it. */
  function keepFocus(event) {
    if (event.target instanceof Element && event.target.closest('input, textarea')) return;
    event.preventDefault();
  }

  const toggle = (name) => { sub = sub === name ? null : name; };
  const pressed = (cmd) => Boolean(sel?.marks?.[cmd]);

  function sizeKey(event) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    bar.run('size', event.currentTarget.value.trim(), true);
  }

  function letterKey(event) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    bar.run('letterSpacing', event.currentTarget.value.trim(), true);
  }

  function glyph(value) {
    bar.run('glyph', value, true);
    saveRecentGlyph(value);
    recent = readRecentGlyphs();
  }
</script>

{#if open && place}
  <!-- The bar holds the mouse's press so the text keeps its focus; its tools are buttons and fields of their own -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div class="text-bar" role="toolbar" aria-label={ta('tt.toolbar')} tabindex="-1" bind:this={barEl} bind:offsetWidth={w} bind:offsetHeight={h}
    style="left: {place.left}px; top: {place.top}px" onmousedown={keepFocus} transition:menuMotion>
    <div class="tb-row">
      <span class="tb-group">
        <span class="tb-pick"><Dropdown value={sel.level} options={levels} title={ta('tt.level')} onchange={(v) => bar.run('level', v, true)} /></span>
        <span class="tb-pick"><Dropdown value={sel.font} options={fonts} title={ta('tt.fontTitle')} onchange={(v) => bar.run('font', v, true)} /></span>
      </span>
      <span class="tb-group">
        <button type="button" title={ta('tt.sizeMinus')} onclick={() => bar.run('sizeStep', -1, true)}>{@html MINUS}</button>
        <input class="tb-num tb-size" type="number" min={SIZE_MIN} max={SIZE_MAX} step="1" title={ta('tt.sizeTitle')}
          value={sizeFocus ? sizeHeld : (sel.size ?? '')}
          onfocus={() => { sizeHeld = sel.size ?? ''; sizeFocus = true; }} onblur={() => (sizeFocus = false)}
          onchange={(e) => bar.run('size', e.currentTarget.value.trim())} onkeydown={sizeKey} />
        <button type="button" title={ta('tt.sizePlus')} onclick={() => bar.run('sizeStep', 1, true)}>{@html PLUS}</button>
      </span>
    </div>
    <div class="tb-row">
      <span class="tb-group">
        <button type="button" class:on={pressed('bold')} title={ta('tt.bold')} onclick={() => bar.run('mark', 'bold', true)}><b>{ta('format.boldLetter')}</b></button>
        <button type="button" class:on={pressed('italic')} title={ta('tt.italic')} onclick={() => bar.run('mark', 'italic', true)}><i>{ta('format.italicLetter')}</i></button>
        <button type="button" class:on={pressed('underline')} title={ta('tt.underline')} onclick={() => bar.run('mark', 'underline', true)}><u>{ta('format.underlineLetter')}</u></button>
        <button type="button" class:on={pressed('strikeThrough')} title={ta('tt.strike')} onclick={() => bar.run('mark', 'strikeThrough', true)}><s>{ta('format.strikeLetter')}</s></button>
        <button type="button" class:on={pressed('superscript')} title={ta('tt.superscript')} onclick={() => bar.run('mark', 'superscript', true)}>{@html SUP}</button>
        <button type="button" class:on={pressed('subscript')} title={ta('tt.subscript')} onclick={() => bar.run('mark', 'subscript', true)}>{@html SUB}</button>
      </span>
      <span class="tb-group">
        <button type="button" class:on={sub === 'colour'} title={ta('tt.colors')} aria-expanded={sub === 'colour'} onclick={() => toggle('colour')}>{@html PALETTE}</button>
      </span>
      <span class="tb-group">
        {#each ALIGNS as [cmd, key, icon] (cmd)}
          <button type="button" class:on={pressed(cmd)} title={ta(key)} onclick={() => bar.run('mark', cmd, true)}>{@html icon}</button>
        {/each}
        <button type="button" class:on={sub === 'spacing'} title={ta('tt.spacing')} aria-expanded={sub === 'spacing'} onclick={() => toggle('spacing')}>{@html SPACING}</button>
      </span>
    </div>
    <div class="tb-row">
      <span class="tb-group">
        <button type="button" class:on={pressed('insertUnorderedList')} title={ta('tt.ul')} onclick={() => bar.run('mark', 'insertUnorderedList', true)}>{@html UL}</button>
        <button type="button" class:on={pressed('insertOrderedList')} title={ta('tt.ol')} onclick={() => bar.run('mark', 'insertOrderedList', true)}>{@html OL}</button>
        <button type="button" title={ta('tt.outdent')} onclick={() => bar.run('indent', -1, true)}>{@html OUTDENT}</button>
        <button type="button" title={ta('tt.indent')} onclick={() => bar.run('indent', 1, true)}>{@html INDENT}</button>
      </span>
      <span class="tb-group">
        <button type="button" class:on={sel.quote} title={ta('tt.quote')} onclick={() => bar.run('quote', null, true)}>{@html QUOTE}</button>
        <button type="button" class:on={sub === 'glyph'} title={ta('tt.glyphs')} aria-expanded={sub === 'glyph'} onclick={() => toggle('glyph')}>{@html GLYPH}</button>
      </span>
      <span class="tb-group">
        <button type="button" title={ta('tt.link')} disabled={!sel.linkable} onclick={() => bar.run('link')}>{@html LINK}</button>
        <button type="button" title={ta('tt.clearFormat')} onclick={() => bar.run('clear', null, true)}>{@html CLEAR}</button>
      </span>
    </div>
    {#if sub === 'colour'}
      <!-- The theme's text and accent colours keep following the theme in the words; a colour of its own is a fixed one -->
      <div class="tb-sub tb-colours" transition:rowMotion>
        <button type="button" class="tb-swatch" style="background: {swatch('text')}" title={ta('tt.textColorTheme')} onclick={() => bar.run('colour', 'text', true)}></button>
        <button type="button" class="tb-swatch" style="background: {swatch('accent')}" title={ta('tt.accentColorTheme')} onclick={() => bar.run('colour', 'accent', true)}></button>
        <ColorPicker value={ownColour} tokens={ed.themeSwatches()} label={ta('tt.customTextColor')} onchange={(v) => { ownColour = v; bar.run('colour', v); }} />
        <span class="tb-sep" aria-hidden="true"></span>
        <button type="button" title={ta('tt.hlAccent')} onclick={() => bar.run('highlight', 'accent', true)}><span class="tb-hl" style="background: {swatch('accent')}">{@html HL_A}</span></button>
        <ColorPicker value={ownHighlight} tokens={ed.themeSwatches()} label={ta('tt.hlCustom')} onchange={(v) => { ownHighlight = v; bar.run('highlight', v); }} />
        <button type="button" title={ta('tt.hlNone')} onclick={() => bar.run('highlight', '', true)}><span class="tb-hl tb-hl-none">{@html HL_A}</span></button>
      </div>
    {:else if sub === 'spacing'}
      <div class="tb-sub tb-spacing" transition:rowMotion>
        <span class="tb-label">{ta('tt.lineHeight')}</span>
        {#each LINE_HEIGHTS as [value] (value)}
          {@const label = value ? lhFormat.format(Number(value)) : ta('common.inherit')}
          <button type="button" class="tb-lh" title={value ? ta('tt.lineHeightN', { label }) : ta('tt.inheritLh')} onclick={() => bar.run('lineHeight', value, true)}>{label}</button>
        {/each}
        <span class="tb-sep" aria-hidden="true"></span>
        <span class="tb-label">{ta('tt.letterSpacing')}</span>
        <input class="tb-num" type="number" min="-2" max="10" step="0.1" placeholder={ta('common.inherit')} title={ta('tt.letterSpacingTitle')}
          onchange={(e) => bar.run('letterSpacing', e.currentTarget.value.trim())} onkeydown={letterKey} />
      </div>
    {:else if sub === 'glyph'}
      <div class="tb-sub tb-glyphs" transition:rowMotion>
        {#if recent.length}
          <div class="tb-glyphhead">{ta('common.recent')}</div>
          <div class="tb-glyphgrid">
            {#each recent as g, i (`${g}-${i}`)}<button type="button" title={ta('tt.insert')} onclick={() => glyph(g)}>{g}</button>{/each}
          </div>
        {/if}
        {#each GLYPH_CATEGORIES as [name, glyphs] (name)}
          <div class="tb-glyphhead">{ta(name)}</div>
          <div class="tb-glyphgrid">
            {#each glyphs.split(' ') as g, i (`${g}-${i}`)}<button type="button" title={ta('tt.insert')} onclick={() => glyph(g)}>{g}</button>{/each}
          </div>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .text-bar {
    position: fixed;
    z-index: 315;
    display: flex;
    flex-direction: column;
    width: max-content;
    max-width: min(460px, calc(100vw - 16px));
    padding: 4px 6px;
    background: var(--urd-color-surface, #151a23);
    color: var(--urd-color-text, #e8eaf0);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 8px;
    box-shadow: 0 8px 24px rgb(0 0 0 / 45%);
    font: 600 12px/1 system-ui, sans-serif;
  }

  .tb-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
  }

  .tb-row + .tb-row,
  .tb-sub {
    border-top: 1px solid color-mix(in srgb, currentColor 12%, transparent);
    padding-top: 4px;
    margin-top: 4px;
  }

  /* Groups wrap as a whole, never a lone button on its own line, with a divider between */
  .tb-group {
    display: inline-flex;
    align-items: center;
    gap: 2px;
  }

  .tb-group + .tb-group {
    border-left: 1px solid color-mix(in srgb, currentColor 18%, transparent);
    padding-left: 6px;
    margin-left: 2px;
  }

  .text-bar button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 26px;
    height: 26px;
    padding: 0 5px;
    font: inherit;
    color: inherit;
    background: transparent;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
  }

  .text-bar button:hover:not(:disabled) {
    background: color-mix(in srgb, currentColor 12%, transparent);
  }

  .text-bar button:disabled {
    opacity: 0.4;
    cursor: default;
  }

  /* A tool the selection stands in (bold, an alignment, a list) or a sub-row standing open: the admin's accent rings it */
  .text-bar button.on {
    background: color-mix(in srgb, var(--urd-color-accent, #5f6a75) 18%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--urd-color-accent, #5f6a75) 75%, currentColor);
  }

  /* A choice in the bar shows its whole name, never cut short */
  .tb-pick {
    flex: none;
  }

  .tb-pick :global(.dd-btn) {
    width: max-content;
    padding: 0.3em 0.5em;
    font: 600 12px/1.2 system-ui, sans-serif;
  }

  /* The number fields (size, letter spacing): an empty field takes the theme's */
  .tb-num {
    width: 4em;
    padding: 3px 4px;
    font: 400 12px/1.3 system-ui, sans-serif;
    color: inherit;
    background: color-mix(in srgb, currentColor 6%, transparent);
    border: 1px solid color-mix(in srgb, currentColor 20%, transparent);
    border-radius: 5px;
  }

  .tb-size {
    width: 3.2em;
    text-align: center;
    appearance: textfield;
  }

  .tb-size::-webkit-outer-spin-button,
  .tb-size::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }

  .tb-colours,
  .tb-spacing {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 6px;
  }

  .text-bar .tb-swatch {
    width: 20px;
    min-width: 20px;
    height: 20px;
    padding: 0;
    border-radius: 50%;
    border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  }

  .tb-hl {
    display: inline-grid;
    place-items: center;
    padding: 1px 3px;
    border-radius: 3px;
    color: var(--urd-color-accent-text, #fff);
  }

  .tb-hl-none {
    color: inherit;
    border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
    background: linear-gradient(to top right, transparent 44%, #e05252 44% 56%, transparent 56%);
  }

  .tb-sep {
    width: 1px;
    height: 18px;
    background: color-mix(in srgb, currentColor 18%, transparent);
  }

  .tb-label,
  .tb-glyphhead {
    font: 600 10px/1.2 system-ui, sans-serif;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 0.6;
  }

  .text-bar .tb-lh {
    min-width: 0;
    padding: 0 6px;
    font-weight: 400;
  }

  .tb-glyphs {
    max-height: 220px;
    overflow-y: auto;
  }

  .tb-glyphhead {
    padding: 6px 2px 3px;
  }

  .tb-glyphgrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(28px, 1fr));
    gap: 2px;
  }

  .tb-glyphgrid button {
    font-size: 15px;
    font-weight: 400;
  }
</style>
