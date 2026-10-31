<script>
  /* The Theme panel: the colour tokens in light and dark, the fonts, the corner radius and the ready-made suggestions. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import ColorPicker from '../lib/ColorPicker.svelte';
  import Dropdown from '../lib/Dropdown.svelte';
  import { ta } from '$engine/i18n.js';
  import { FONT_STACKS, fontChoices } from '$engine/fonts.js';
  const ed = getContext('urd-editor');
  const activeThemePreset = $derived(ed.activeThemePreset);
  const siteDraft = $derived(ed.siteDraft);
  const { THEME_PRESETS, applyThemePreset, readableOn, siteMutate, suggestAltColors, themeHex, themeSwatches } = ed;

  /** The Theme panel's derived state (the Colors area). */
  const PALETTE_KEYS = [['bg', ta('palette.bg'), ta('palette.bgShort')], ['surface', ta('palette.surface'), ta('palette.surfaceShort')], ['text', ta('palette.text'), ta('palette.textShort')], ['accent', ta('palette.accent'), ta('palette.accentShort')], ['accent-text', ta('palette.accentText'), ta('palette.accentTextShort')]];

  const dualMode = $derived(!!siteDraft?.theme.alt);

  const altAuto = $derived(siteDraft?.theme.alt?.auto === true);

  const stdMode = $derived(siteDraft?.theme.scheme === 'dark' ? 'dark' : 'light');

  const lightPal = $derived(siteDraft?.theme.tokens.color ?? {});

  const darkPal = $derived({ ...(siteDraft?.theme.tokens.color ?? {}), ...(siteDraft?.theme.alt?.tokens?.color ?? {}) });

  function setColorToken(name, value) {
    siteMutate(`edit:theme-color-${name}`, () => {
      siteDraft.theme.tokens.color[name] = value;
      // An auto-derived dark theme follows the light colors automatically.
      if (siteDraft.theme.alt?.auto) siteDraft.theme.alt.tokens.color = suggestAltColors();
    });
  }

  /** The value a palette cell shows when the token is absent: the text on
      accent is what the browser chooses (black or white against the accent,
      contrast-color() in theme.js), everything else the background. */
  function paletteFallback(key, pal) {
    if (key === 'accent-text') return readableOn(themeHex(pal.accent ?? '#000000', pal));
    return pal.bg;
  }

  /** Auto = no accent-text token in either theme: the browser chooses the text colour. */
  const accentTextAuto = $derived(!siteDraft?.theme?.tokens?.color?.['accent-text'] && !siteDraft?.theme?.alt?.tokens?.color?.['accent-text']);

  function setAccentTextAuto(auto) {
    siteMutate('edit:theme-color-accent-text', () => {
      if (auto) {
        delete siteDraft.theme.tokens.color['accent-text'];
        if (siteDraft.theme.alt?.tokens?.color) delete siteDraft.theme.alt.tokens.color['accent-text'];
      } else {
        siteDraft.theme.tokens.color['accent-text'] = paletteFallback('accent-text', lightPal);
        if (siteDraft.theme.alt?.auto) siteDraft.theme.alt.tokens.color = suggestAltColors();
      }
    });
  }

  function setFontToken(name, value) {
    siteMutate('theme', () => { siteDraft.theme.tokens.font[name] = value; });
  }

  function setRadiusToken(name, value) {
    siteMutate('theme', () => { siteDraft.theme.tokens.radius[name] = value; });
  }

  function setAltColorToken(name, value) {
    siteMutate(`edit:theme-alt-${name}`, () => {
      siteDraft.theme.alt.tokens.color[name] = value;
      // Setting a dark color yourself turns off the auto derivation.
      siteDraft.theme.alt.auto = false;
    });
  }

  function setThemeScheme(value) {
    siteMutate('theme', () => {
      if (value === 'light') delete siteDraft.theme.scheme;
      else siteDraft.theme.scheme = value;
    });
  }

  /** Light and dark mode on/off: creates (auto-derived) or removes the alt theme. */
  function setDualMode(on) {
    siteMutate('theme', () => {
      if (on) siteDraft.theme.alt = { auto: true, tokens: { color: suggestAltColors() } };
      else delete siteDraft.theme.alt;
    });
  }

  /** Dark colors: Auto (derived from the light ones) or Custom (set manually). */
  function setAltAuto(auto) {
    siteMutate('theme', () => {
      siteDraft.theme.alt ??= { tokens: { color: suggestAltColors() } };
      siteDraft.theme.alt.auto = auto;
      if (auto) siteDraft.theme.alt.tokens.color = suggestAltColors();
    });
  }

  /** The font dropdown's options: known stacks + any current custom one, each drawn in its own face. */
  function fontOptions(which) {
    const cur = siteDraft.theme.tokens.font[which];
    return fontChoices(ta, FONT_STACKS.some(([, v]) => v === cur) ? [] : [[cur, ta('opt.customFont'), null, { font: cur }]]);
  }

  /** Corner radius from a slider (px). */
  const radiusNum = (v) => parseInt(v, 10) || 0;

  function setRadiusPx(name, n) { setRadiusToken(name, `${n}px`); }
</script>

<div class="panel-body">
  {#snippet themePreview(pal, cap)}
    <div class="theme-pvw">
      {#if cap}<div class="mini-label tpv-cap">{cap}</div>{/if}
      <div class="tpv-demo" style="--tv-bg:{themeHex(pal.bg, pal)};--tv-surface:{themeHex(pal.surface, pal)};--tv-text:{themeHex(pal.text, pal)};--tv-accent:{themeHex(pal.accent, pal)};--tv-accent-ink:{themeHex(pal['accent-text'] ?? readableOn(themeHex(pal.accent ?? '#000000', pal)), pal)}">
        <div class="tpv-h">{ta('preview.heading')}</div>
        <div class="tpv-card">{ta('preview.cardBody')}</div>
        <div class="tpv-row"><span class="tpv-btn">{ta('preview.button')}</span><span class="tpv-lnk">{ta('preview.link')}</span></div>
      </div>
    </div>
  {/snippet}
  <p class="panel-strong">{ta('lbl.themePresets')}</p>
  <div class="theme-presets">
    {#each THEME_PRESETS as pr (pr.id)}
      <button type="button" class="theme-preset" class:sel={activeThemePreset === pr.id}
        title={`${pr.name} - ${pr.note}`} onclick={() => applyThemePreset(pr)}>
        <span class="tp-band">
          <i style="background:{pr.light.bg}"></i><i style="background:{pr.light.surface}"></i><i style="background:{pr.light.accent}"></i><i style="background:{pr.light.text}"></i>
        </span>
        <small>{pr.name}</small>
      </button>
    {/each}
  </div>
  <p class="panel-strong">{ta('lbl.colors')}</p>
  <label class="gridmenu-snap" title={ta('tip.theme.dualMode')}>
    <input type="checkbox" checked={dualMode}
      onchange={(e) => setDualMode(e.target.checked)} />
    {ta('lbl.dualMode')}
  </label>
  {#if dualMode}
    <div class="ctl-row autorow">
      <span class="autolbl">{ta('lbl.darkColors')}</span>
      <span class="seg">
        <button type="button" class:on={altAuto} title={ta('hint.theme.autoDark')}
          onclick={() => setAltAuto(true)}>{ta('opt.auto')}</button>
        <button type="button" class:on={!altAuto} onclick={() => setAltAuto(false)}>{ta('opt.custom')}</button>
      </span>
    </div>
  {/if}

  <div class="ctl-row palhead">
    {#if dualMode}<span class="mini-label">{ta('lbl.light')}</span>{/if}
    <button type="button" class="chip" class:accent={stdMode === 'light'}
      title={ta('tip.theme.defaultScheme')} onclick={() => setThemeScheme('light')}>{ta('common.standard')}</button>
  </div>
  <div class="palcells">
    {#each PALETTE_KEYS as [key, full, short] (key)}
      <div class="palcol">
        <ColorPicker value={siteDraft.theme.tokens.color[key] ?? paletteFallback(key, lightPal)}
          tokens={themeSwatches()} label={full} onchange={(hex) => setColorToken(key, hex)} />
        <span class="palcap">{short}</span>
        <b class="palhex">{themeHex(siteDraft.theme.tokens.color[key] ?? paletteFallback(key, lightPal), lightPal)}</b>
      </div>
    {/each}
  </div>

  {#if dualMode}
    <div class="ctl-row palhead">
      <span class="mini-label">{ta('lbl.dark')}</span>
      <button type="button" class="chip" class:accent={stdMode === 'dark'}
        title={ta('tip.theme.darkDefault')} onclick={() => setThemeScheme('dark')}>{ta('common.standard')}</button>
    </div>
    <div class="palcells" class:autopal={altAuto}>
      {#each PALETTE_KEYS as [key, full, short] (key)}
        <div class="palcol">
          <ColorPicker value={siteDraft.theme.alt.tokens.color[key] ?? darkPal[key] ?? paletteFallback(key, darkPal)}
            tokens={themeSwatches()} label={ta('theme.darkColorLabel', { name: full })} onchange={(hex) => setAltColorToken(key, hex)} />
          <span class="palcap">{short}</span>
          <b class="palhex">{themeHex(siteDraft.theme.alt.tokens.color[key] ?? darkPal[key] ?? paletteFallback(key, darkPal), darkPal)}</b>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Auto for the text on accent: no token in either mode, the browser
       picks black or white against the accent (contrast-color()). Its own
       row below both palettes, since it applies to light and dark alike. -->
  <div class="ctl-row palauto-row" title={ta('tip.theme.accentTextAuto')}>
    <span class="mini-label ctl-name">{ta('palette.accentText')}</span>
    <button type="button" class="chip palauto" class:accent={accentTextAuto}
      onclick={() => setAccentTextAuto(!accentTextAuto)}>{ta('opt.auto')}</button>
  </div>

  <div class="theme-previews">
    {@render themePreview(lightPal, dualMode ? ta('lbl.light') : '')}
    {#if dualMode}{@render themePreview(darkPal, ta('lbl.dark'))}{/if}
  </div>

  <details class="group">
    <summary>{ta('group.typography')}</summary>
    <div class="group-items">
      <label title={ta('tip.theme.headingFont')}>{ta('lbl.headings')}
        <Dropdown value={siteDraft.theme.tokens.font.heading} options={fontOptions('heading')}
          onchange={(v) => setFontToken('heading', v)} /></label>
      <label title={ta('tip.theme.bodyFont')}>{ta('lbl.bodyText')}
        <Dropdown value={siteDraft.theme.tokens.font.body} options={fontOptions('body')}
          onchange={(v) => setFontToken('body', v)} /></label>
      <div class="sample typo-sample">
        <div class="ts-h" style="font-family:{siteDraft.theme.tokens.font.heading}">{ta('preview.heading')}</div>
        <div class="ts-b" style="font-family:{siteDraft.theme.tokens.font.body}">{ta('preview.bodySample')}</div>
      </div>
    </div>
  </details>

  <details class="group">
    <summary>{ta('group.shape')}</summary>
    <div class="group-items">
      <div class="sample form-prev" style="--r-sm:{siteDraft.theme.tokens.radius.sm};--r-md:{siteDraft.theme.tokens.radius.md}">
        <span class="fp-btn">{ta('preview.button')}</span>
        <span class="fp-card">{ta('preview.card')}</span>
      </div>
      <label title={ta('tip.theme.radiusSm')} class="ctl-row">{ta('lbl.smallCorners')}<span class="gridmenu-value">{siteDraft.theme.tokens.radius.sm}</span></label>
      <input type="range" min="0" max="24" step="1" value={radiusNum(siteDraft.theme.tokens.radius.sm)}
        oninput={(e) => setRadiusPx('sm', Number(e.target.value))} />
      <label title={ta('tip.theme.radiusMd')} class="ctl-row">{ta('lbl.largeCorners')}<span class="gridmenu-value">{siteDraft.theme.tokens.radius.md}</span></label>
      <input type="range" min="0" max="40" step="1" value={radiusNum(siteDraft.theme.tokens.radius.md)}
        oninput={(e) => setRadiusPx('md', Number(e.target.value))} /></div>
  </details>
</div>
