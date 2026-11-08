<script>
  /* The Nav panel's Colours and frame fold: the hover style as samples of a menu word, its glow and colour, the text colours and the blur, the bar's background layers, its border and its shadow. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import SliderRow from '../../lib/rows/SliderRow.svelte';
  import NumberRow from '../../lib/rows/NumberRow.svelte';
  import ColourRow from '../../lib/rows/ColourRow.svelte';
  import SubHeading from '../../lib/rows/SubHeading.svelte';
  import BackgroundEditor from '../../section/BackgroundEditor.svelte';
  import { ta } from '$engine/i18n.js';
  import { clampRange } from '../../lib/nav-size.js';
  import { navActions, isSideNav, isFloatingNav } from './nav-actions.js';
  const ed = getContext('urd-editor');
  const siteDraft = $derived(ed.siteDraft);
  const { navBgCtx, siteMutate, themeSwatches } = ed;
  const { setNavStyle } = navActions(ed);

  const sideVariant = $derived(isSideNav(siteDraft?.nav));
  const floatingVariant = $derived(isFloatingNav(siteDraft?.nav));

  // The border's sides drawn as tiles (ADR-0009: drawn SVG, never characters).
  const navSvg = (body) => `<svg width="40" height="26" viewBox="0 0 40 26" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${body}</svg>`;
  const NAV_BORDER_ICONS = {
    '': navSvg('<rect x="1" y="4" width="38" height="18" rx="1" stroke-opacity="0.35"/>'),
    'bottom': navSvg('<rect x="1" y="4" width="38" height="18" rx="1" stroke-opacity="0.35"/><path d="M1 22h38" stroke-width="2.5"/>'),
    'top': navSvg('<rect x="1" y="4" width="38" height="18" rx="1" stroke-opacity="0.35"/><path d="M1 4h38" stroke-width="2.5"/>'),
    'both': navSvg('<rect x="1" y="4" width="38" height="18" rx="1" stroke-opacity="0.35"/><path d="M1 4h38M1 22h38" stroke-width="2.5"/>'),
    'all': navSvg('<rect x="1" y="4" width="38" height="18" rx="1" stroke-width="2.5"/>'),
  };

  /** Hover style (additive): the default is not stored in the file. */
  function setNavHover(value) {
    siteMutate('nav', () => {
      siteDraft.nav.style ??= {};
      if (value === 'standard') delete siteDraft.nav.style.hover;
      else siteDraft.nav.style.hover = value;
    });
  }

  /** The border's width: 1 is the default and is not stored. */
  function setBorderWidth(value) {
    const w = clampRange(value, { min: 1, max: 8 }, 1);
    const border = { ...siteDraft.nav.style.border };
    if (w === 1) delete border.width; else border.width = w;
    setNavStyle('border', border);
  }

  /** The effect colour on hover: only where the style has an effect, with a label saying what the colour actually controls in the chosen style. */
  const HOVER_COLOR_LABELS = {
    underline: ['hoverColor.underline.label', 'hoverColor.underline.title'],
    pill: ['hoverColor.pill.label', 'hoverColor.pill.title'],
    lift: ['hoverColor.lift.label', 'hoverColor.lift.title'],
  };
  const hoverColorLabel = $derived(HOVER_COLOR_LABELS[siteDraft?.nav?.style?.hover]?.map((key) => ta(key)) ?? null);
</script>

<!-- The hover styles as samples of a menu word drawn with each style -->
<Setting key="hover">
  <div class="ctl-field">
    <span class="mini-label">{ta('lbl.navHover')}</span>
    <div class="tile-grid cols-5" role="group" aria-label={ta('lbl.navHover')}>
      {#each [['standard', ta('opt.hover.standard')], ['underline', ta('opt.hover.underline')], ['pill', ta('opt.hover.pill')], ['lift-plain', ta('opt.hover.liftPlain')], ['lift', ta('opt.hover.lift')]] as [v, text] (v)}
        <button type="button" class="tile" class:on={(siteDraft.nav.style?.hover ?? 'standard') === v} aria-pressed={(siteDraft.nav.style?.hover ?? 'standard') === v}
          onclick={() => setNavHover(v)}><span class="hover-sample hover-{v}">{ta('seed.home')}</span><span>{text}</span></button>
      {/each}
    </div>
  </div>
</Setting>
{#if siteDraft.nav.style?.hover === 'lift'}
  <Setting key="hoverGlow">
    <SliderRow label={ta('lbl.glowStrength')} title={ta('tip.nav.hoverGlow')} value={siteDraft.nav.style?.hoverGlow ?? 0.6} min={0.1} max={1} step={0.01}
      shown={`${Math.round((siteDraft.nav.style?.hoverGlow ?? 0.6) * 100)}%`} oninput={(v) => setNavStyle('hoverGlow', v)} />
  </Setting>
{/if}
{#if hoverColorLabel}
  <Setting key="hoverColor">
    <ColourRow label={hoverColorLabel[0]} title={hoverColorLabel[1]} value={siteDraft.nav.style?.hoverColor ?? 'accent'} tokens={themeSwatches()}
      onchange={(hex) => setNavStyle('hoverColor', hex)} />
  </Setting>
{/if}
<Setting key="hoverTextColor">
  <ColourRow label={ta('lbl.hoverTextColor')} title={ta('tip.nav.hoverTextColor')} value={siteDraft.nav.style?.hoverTextColor ?? 'accent'} tokens={themeSwatches()}
    onchange={(hex) => setNavStyle('hoverTextColor', hex)} />
</Setting>
<Setting key="textColor">
  <ColourRow label={ta('lbl.textColor')} title={ta('tip.nav.textColorPick')} value={siteDraft.nav.style?.textColor ?? 'text'} tokens={themeSwatches()}
    onchange={(hex) => setNavStyle('textColor', hex)} />
</Setting>
<Setting key="blur">
  <SwitchRow label={ta('lbl.navBlur')} title={ta('tip.nav.blur')} checked={siteDraft.nav.style?.blur !== false} onchange={(on) => setNavStyle('blur', on)} />
</Setting>
<SubHeading text={ta('lbl.background')} />
{#if siteDraft.nav.style?.atTop === 'clear' && !sideVariant}
  <span class="field-note" title={ta('tip.nav.bgAtTop')}><i class="note-dot"></i>{ta('lbl.navBgOnScroll')}</span>
{/if}
<BackgroundEditor bg={navBgCtx} layers={siteDraft.nav?.style?.background?.layers ?? []} />
{#if !sideVariant}
  <SubHeading text={ta('group.navFrame')} />
  <!-- Border on the bar: the side as drawn tiles, then its width and colour once a side is chosen -->
  <Setting key="border">
    <div class="ctl-field" title={ta('tip.nav.border')}>
      <span class="mini-label">{ta('lbl.navBorder')}</span>
      <div class="tile-grid cols-5" role="group" aria-label={ta('lbl.navBorder')}>
        {#each [['', ta('common.none')], ['bottom', ta('opt.navBorder.bottom')], ['top', ta('opt.navBorder.top')], ['both', ta('opt.navBorder.both')], ['all', ta('opt.navBorder.all')]] as [v, text] (v)}
          <button type="button" class="tile" class:on={(siteDraft.nav.style?.border?.side ?? '') === v} aria-pressed={(siteDraft.nav.style?.border?.side ?? '') === v}
            onclick={() => setNavStyle('border', v ? { ...(siteDraft.nav.style?.border ?? {}), side: v } : undefined)}>{@html NAV_BORDER_ICONS[v]}<span>{text}</span></button>
        {/each}
      </div>
    </div>
  </Setting>
  {#if siteDraft.nav.style?.border?.side}
    <NumberRow label={ta('lbl.navBorderWidth')} title={ta('tip.nav.borderWidth')} value={siteDraft.nav.style.border.width ?? 1} min={1} max={8} unit="px"
      onchange={(v) => setBorderWidth(v)} />
    <ColourRow label={ta('lbl.navBorderColor')} title={ta('tip.nav.borderColorPick')} value={siteDraft.nav.style.border.color ?? 'text'} tokens={themeSwatches()}
      onchange={(hex) => setNavStyle('border', { ...siteDraft.nav.style.border, color: hex })} />
  {/if}
{/if}
{#if !floatingVariant && !sideVariant}
  <Setting key="shadow">
    <Choice label={ta('lbl.navShadow')} title={ta('tip.nav.shadow')} value={siteDraft.nav.style?.shadow ?? ''}
      options={[['', ta('common.none')], ['soft', ta('opt.navShadow.soft')], ['strong', ta('opt.navShadow.strong')]]}
      onchange={(v) => setNavStyle('shadow', v || undefined)} />
  </Setting>
{/if}
