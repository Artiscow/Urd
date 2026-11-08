<script>
  /* The Nav panel's Layout and size fold: the menu's form as drawn tiles, the floating form's width, rounding, glow and air above it, where the items stand, the bar over the top section and inside the content width, the column's alignment and width, and the size: a step for the padding and the text, then the values that replace the step's parts. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import SliderRow from '../../lib/rows/SliderRow.svelte';
  import NumberRow from '../../lib/rows/NumberRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { PAD_Y, TEXT_SIZE, PAD_X, GAP, PILL_WIDTH, COL_WIDTH, RADIUS, SIZE_IDS, clampRange, effectivePadY, effectiveTextSize, sizePresetOf } from '../../lib/nav-size.js';
  import { navActions, isSideNav, isFloatingNav } from './nav-actions.js';
  const ed = getContext('urd-editor');
  const siteDraft = $derived(ed.siteDraft);
  const { siteMutate } = ed;
  const { setNavStyle } = navActions(ed);

  // The menu's forms drawn as tiles (ADR-0009: drawn SVG, never characters).
  const navSvg = (body) => `<svg width="40" height="26" viewBox="0 0 40 26" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${body}</svg>`;
  const NAV_VARIANT_ICONS = {
    'bar': navSvg('<rect x="1" y="1" width="38" height="7" rx="1"/><rect x="1" y="11" width="38" height="14" rx="1" stroke-opacity="0.35"/>'),
    'floating': navSvg('<rect x="5" y="2" width="30" height="7" rx="3.5"/><rect x="1" y="11" width="38" height="14" rx="1" stroke-opacity="0.35"/>'),
    'floating-square': navSvg('<rect x="5" y="2" width="30" height="7"/><rect x="1" y="11" width="38" height="14" rx="1" stroke-opacity="0.35"/>'),
    'floating-tab': navSvg('<path d="M5 1h30v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><rect x="1" y="11" width="38" height="14" rx="1" stroke-opacity="0.35"/>'),
    'side-left': navSvg('<rect x="1" y="1" width="9" height="24" rx="1"/><rect x="13" y="1" width="26" height="24" rx="1" stroke-opacity="0.35"/>'),
    'side-right': navSvg('<rect x="30" y="1" width="9" height="24" rx="1"/><rect x="1" y="1" width="26" height="24" rx="1" stroke-opacity="0.35"/>'),
  };

  /** Side-by-side and floating show their own options. */
  const sideVariant = $derived(isSideNav(siteDraft?.nav));
  const floatingVariant = $derived(isFloatingNav(siteDraft?.nav));

  /** The highlighted size step (null while a free value overrides it) and the values the sliders start at: what the bar actually renders. */
  const navSizePreset = $derived(sizePresetOf(siteDraft?.nav?.style));
  const navPadY = $derived(effectivePadY(siteDraft?.nav?.style, siteDraft?.nav?.variant));
  const navTextSize = $derived(effectiveTextSize(siteDraft?.nav?.style));

  /** A size step: md is the default and is not stored; the free values it replaces are removed in the same history step. */
  function setNavSizePreset(id) {
    siteMutate('nav', () => {
      siteDraft.nav.style ??= {};
      if (id === 'md') delete siteDraft.nav.style.size;
      else siteDraft.nav.style.size = id;
      delete siteDraft.nav.style.padY;
      delete siteDraft.nav.style.textSize;
    });
  }

  /** A number field for a nav size value: empty (or garbage) removes the field, anything else is clamped; the field then shows what was stored. */
  function onNavSizeInput(e, key, range) {
    const raw = e.target.value;
    setNavStyle(key, raw === '' ? undefined : clampRange(raw, range, undefined));
    e.target.value = siteDraft.nav.style?.[key] ?? '';
  }

  /** The number beside a size slider: empty restores the step; the field then shows what the bar renders. */
  function onNavSizeField(e, key, range) {
    const raw = e.target.value;
    setNavStyle(key, raw === '' ? undefined : clampRange(raw, range, undefined));
    e.target.value = key === 'padY' ? navPadY : navTextSize;
  }

  function setNavLayout(value) {
    siteMutate('nav', () => { siteDraft.nav.layout = value; });
  }

  /** Variant (additive): the default (bar) is not stored in the file. The three floating forms are presets of the corner rounding, so a switch clears a rounding value entered for the previous form. */
  function setNavVariant(value) {
    if ((siteDraft.nav.variant ?? 'bar') === value) return;
    siteMutate('nav', () => {
      if (value === 'bar') delete siteDraft.nav.variant;
      else siteDraft.nav.variant = value;
      if (siteDraft.nav.style) delete siteDraft.nav.style.radius;
    });
  }

  /** Glow around the floating pill: off is the default and is not stored in the file. */
  function setNavGlow(on) {
    siteMutate('nav', () => {
      siteDraft.nav.style ??= {};
      if (on) siteDraft.nav.style.glow = true;
      else delete siteDraft.nav.style.glow;
    });
  }

  /** Air above the pill: on is the default and is not stored in the file. */
  function setNavTopGap(on) {
    siteMutate('nav', () => {
      siteDraft.nav.style ??= {};
      if (on) delete siteDraft.nav.style.topGap;
      else siteDraft.nav.style.topGap = false;
    });
  }
</script>

<!-- The six menu forms as drawn tiles -->
<Setting key="variant">
  <div class="ctl-field" title={ta('tip.nav.variant')}>
    <span class="mini-label">{ta('lbl.navVariant')}</span>
    <div class="tile-grid cols-3" role="group" aria-label={ta('lbl.navVariant')}>
      {#each [['bar', ta('opt.navVariant.bar')], ['floating', ta('opt.navVariant.floating')], ['floating-square', ta('opt.navVariant.floatingSquare')], ['floating-tab', ta('opt.navVariant.floatingTab')], ['side-left', ta('opt.navVariant.sideLeft')], ['side-right', ta('opt.navVariant.sideRight')]] as [v, text] (v)}
        <button type="button" class="tile" class:on={(siteDraft.nav.variant ?? 'bar') === v} aria-pressed={(siteDraft.nav.variant ?? 'bar') === v}
          onclick={() => setNavVariant(v)}>{@html NAV_VARIANT_ICONS[v]}<span>{text}</span></button>
      {/each}
    </div>
  </div>
</Setting>
{#if floatingVariant}
  <!-- The floating menu's maximum width: the content width, or a px value (empty = 1100) -->
  <Setting key="pillWidth">
    <Choice label={ta('lbl.navPillWidth')} title={ta('tip.nav.pillWidth')} value={siteDraft.nav.style?.pillWidth === 'content' ? 'content' : 'custom'}
      options={[['content', ta('opt.pillWidth.content')], ['custom', ta('opt.pillWidth.custom')]]}
      onchange={(v) => setNavStyle('pillWidth', v === 'content' ? 'content' : undefined)} />
  </Setting>
  {#if siteDraft.nav.style?.pillWidth !== 'content'}
    <span class="toolbar-row" title={ta('tip.nav.pillWidthPx')}>
      <span class="mini-label tb-grow">{ta('lbl.navPillWidthPx')}</span>
      <input type="number" class="tb-num" min={PILL_WIDTH.min} max={PILL_WIDTH.max} step={PILL_WIDTH.step} placeholder="1100"
        value={typeof siteDraft.nav.style?.pillWidth === 'number' ? siteDraft.nav.style.pillWidth : ''}
        onchange={(e) => onNavSizeInput(e, 'pillWidth', PILL_WIDTH)} />
    </span>
  {/if}
  <!-- The corner rounding as a value; empty = the variant's preset -->
  <Setting key="radius">
    <span class="toolbar-row" title={ta('tip.nav.radius')}>
      <span class="mini-label tb-grow">{ta('lbl.navRadius')}</span>
      <input type="number" class="tb-num" min={RADIUS.min} max={RADIUS.max} step={RADIUS.step}
        placeholder={siteDraft.nav.variant === 'floating-square' ? '0' : ''}
        value={typeof siteDraft.nav.style?.radius === 'number' ? siteDraft.nav.style.radius : ''}
        onchange={(e) => onNavSizeInput(e, 'radius', RADIUS)} />
    </span>
  </Setting>
{/if}
{#if sideVariant}
  <Setting key="sidePlacement">
    <Choice label={ta('lbl.navPlacement')} value={siteDraft.nav.style?.sidePlacement ?? 'top'}
      options={[['top', ta('opt.place.top')], ['middle', ta('opt.place.middle')], ['bottom', ta('opt.place.bottom')]]}
      onchange={(v) => setNavStyle('sidePlacement', v === 'top' ? undefined : v)} />
  </Setting>
{:else}
  <!-- Left means after the logo (the tip says so); the short words keep the segment on one row -->
  <Setting key="layout">
    <Choice label={ta('lbl.navPlacement')} title={ta('opt.layout.leftAfterLogo')} value={siteDraft.nav.layout ?? 'right'}
      options={[['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
      onchange={(v) => setNavLayout(v)} />
  </Setting>
{/if}
{#if floatingVariant}
  <Setting key="glow">
    <SwitchRow label={ta('lbl.navGlow')} title={ta('tip.nav.glow')} checked={siteDraft.nav.style?.glow === true} onchange={(on) => setNavGlow(on)} />
  </Setting>
  <Setting key="topGap">
    <SwitchRow label={ta('lbl.navTopGap')} title={ta('tip.nav.topGap')} checked={siteDraft.nav.style?.topGap !== false} onchange={(on) => setNavTopGap(on)} />
  </Setting>
{/if}
{#if !floatingVariant && !sideVariant}
  <Setting key="overlay">
    <SwitchRow label={ta('lbl.navOverlay')} title={ta('tip.nav.overlay')} checked={siteDraft.nav.overlay === true}
      onchange={(on) => siteMutate('nav', () => { if (on) siteDraft.nav.overlay = true; else delete siteDraft.nav.overlay; })} />
  </Setting>
  <Setting key="inset">
    <SwitchRow label={ta('lbl.navInset')} title={ta('tip.nav.inset')} checked={siteDraft.nav.style?.inset !== false}
      onchange={(on) => setNavStyle('inset', on ? undefined : false)} />
  </Setting>
{/if}
{#if sideVariant}
  <Setting key="sideAlign">
    <Choice label={ta('lbl.textAlign')} title={ta('tip.nav.sideAlign')} value={siteDraft.nav.style?.sideAlign ?? 'left'}
      options={[['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
      onchange={(v) => setNavStyle('sideAlign', v === 'left' ? undefined : v)} />
  </Setting>
  <!-- The column width as a number, next to the drag at the column edge (250 = the default, not stored) -->
  <Setting key="width">
    <NumberRow label={ta('lbl.navColWidth')} title={ta('tip.nav.colWidth')} value={siteDraft.nav.style?.width ?? 250} min={COL_WIDTH.min} max={COL_WIDTH.max} unit="px"
      onchange={(v) => {
        const w = clampRange(v, COL_WIDTH, 250);
        setNavStyle('width', w === 250 ? undefined : w);
      }} />
  </Setting>
{/if}
<!-- The four steps, then the free values that replace the step's parts: the sliders start where the bar renders, and the number beside each is typed.
     The column has its own padding, so it shows no thickness, side padding or item spacing. The phone's own values stand in the Mobile fold. -->
<Setting key="size">
  <Choice stack label={ta('lbl.size')} title={ta('tip.nav.sizePreset')} value={navSizePreset}
    options={SIZE_IDS.map((id) => [id, ta(`opt.size.${id}`)])}
    onchange={(id) => setNavSizePreset(id)} />
</Setting>
{#if !sideVariant}
  <Setting key="padY">
    {@render exact(ta('lbl.navThickness'), ta('tip.nav.thickness'), navPadY, PAD_Y, 'padY')}
  </Setting>
{/if}
<Setting key="textSize">
  {@render exact(ta('lbl.navTextSize'), ta('tip.nav.menuTextSize'), navTextSize, TEXT_SIZE, 'textSize')}
</Setting>
{#if !sideVariant}
  <div class="ctl-pair">
    <div class="ctl-field" title={ta('tip.nav.padX')}>
      <span class="mini-label">{ta('lbl.navPadX')}</span>
      <input type="number" class="tb-num" min={PAD_X.min} max={PAD_X.max} placeholder={ta('common.auto')}
        value={siteDraft.nav.style?.padX ?? ''}
        onchange={(e) => onNavSizeInput(e, 'padX', PAD_X)} />
    </div>
    <div class="ctl-field" title={ta('tip.nav.gap')}>
      <span class="mini-label">{ta('lbl.navGap')}</span>
      <input type="number" class="tb-num" min={GAP.min} max={GAP.max} placeholder={ta('common.auto')}
        value={siteDraft.nav.style?.gap ?? ''}
        onchange={(e) => onNavSizeInput(e, 'gap', GAP)} />
    </div>
  </div>
{/if}

<!-- A size slider with the number typed beside it, where the slider's own words would stand, so the value shows once -->
{#snippet exact(label, tip, value, range, key)}
  <div class="slider-exact">
    <SliderRow {label} title={tip} {value} min={range.min} max={range.max} step={range.step} shown={`${value} px`}
      oninput={(v) => setNavStyle(key, v)} />
    <input type="number" class="tb-num" min={range.min} max={range.max} {value} title={tip} aria-label={label}
      onchange={(e) => onNavSizeField(e, key, range)} />
  </div>
{/snippet}

<style>
  .slider-exact {
    display: flex;
    align-items: flex-end;
    gap: 0.6rem;
  }

  .slider-exact > :global(.row-slider) {
    flex: 1;
    min-width: 0;
  }

  .slider-exact :global(.row-slider-line .gridmenu-value) {
    display: none;
  }

  .slider-exact .tb-num {
    flex: none;
    width: 3.4rem;
    padding: 0 0.3em;
    text-align: center;
  }
</style>
