<script>
  /* The Nav panel's Mobile fold, in two parts: the bar on a phone, where every choice starts on «same as on the desktop» and only then writes a value of its own, and the menu the burger opens, with the burger's drawing and word and the full-screen menu's own contents and surface.
     The floating and column fields have no counterpart here: the phone is a bar with a burger, where they do nothing. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import SelectRow from '../../lib/rows/SelectRow.svelte';
  import SliderRow from '../../lib/rows/SliderRow.svelte';
  import NumberRow from '../../lib/rows/NumberRow.svelte';
  import ColourRow from '../../lib/rows/ColourRow.svelte';
  import SubHeading from '../../lib/rows/SubHeading.svelte';
  import { ta } from '$engine/i18n.js';
  import { burgerModel, BURGER_ICONS } from '$engine/nav-model.js';
  import { PAD_Y, TEXT_SIZE, SIZE_IDS, clampRange } from '../../lib/nav-size.js';
  import { navActions, isSideNav, isFloatingNav } from './nav-actions.js';
  const ed = getContext('urd-editor');
  const siteDraft = $derived(ed.siteDraft);
  const { siteMutate, themeSwatches } = ed;
  const { setNavStyle } = navActions(ed);

  const sideVariant = $derived(isSideNav(siteDraft?.nav));
  const floatingVariant = $derived(isFloatingNav(siteDraft?.nav));

  // The burger's drawings, as nav.js draws them; «none» is a bare frame.
  const burgerSvg = (body) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">${body}</svg>`;
  const BURGER_TILE_ICONS = {
    lines: burgerSvg('<path d="M4 6h16M4 12h16M4 18h16"/>'),
    handle: burgerSvg('<path d="M4 9h16M4 15h16"/>'),
    dots: burgerSvg('<g fill="currentColor" stroke="none"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></g>'),
    grid: burgerSvg('<g fill="currentColor" stroke="none"><circle cx="6" cy="6" r="1.6"/><circle cx="12" cy="6" r="1.6"/><circle cx="18" cy="6" r="1.6"/><circle cx="6" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18" cy="12" r="1.6"/><circle cx="6" cy="18" r="1.6"/><circle cx="12" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/></g>'),
    none: burgerSvg('<rect x="4" y="4" width="16" height="16" rx="3" stroke-opacity="0.35"/>'),
  };
  /** The burger as the engine will draw it; the bare «none» tile is offered only beside the word. */
  const burgerLook = $derived(burgerModel(siteDraft?.nav?.style ?? {}));
  const burgerOptions = $derived(BURGER_ICONS.filter((id) => id !== 'none' || burgerLook.showLabel).map((id) => [id, ta(`opt.burger.${id}`)]));

  /** One field of nav.style.burger; the object leaves the file when nothing is set. */
  function setNavBurger(key, value) {
    siteMutate(`edit:nav-burger-${key}`, () => {
      siteDraft.nav.style ??= {};
      const burger = { ...(siteDraft.nav.style.burger ?? {}) };
      if (value === undefined) delete burger[key];
      else burger[key] = value;
      if (Object.keys(burger).length) siteDraft.nav.style.burger = burger;
      else delete siteDraft.nav.style.burger;
    });
  }

  /** The mobile overrides (nav.style.mobile): an emptied object is removed. */
  function setNavMobile(key, value) {
    siteMutate(`edit:nav-mobile-${key}`, () => {
      siteDraft.nav.style ??= {};
      const mobile = { ...(siteDraft.nav.style.mobile ?? {}) };
      if (value === undefined) delete mobile[key];
      else mobile[key] = value;
      if (Object.keys(mobile).length) siteDraft.nav.style.mobile = mobile;
      else delete siteDraft.nav.style.mobile;
    });
  }

  /** The three-state mobile switches: '' is «same as desktop», the other two write the boolean the phone should use. */
  const navMobileFlag = (key) => {
    const v = siteDraft?.nav?.style?.mobile?.[key];
    return v === undefined ? '' : (v ? 'on' : 'off');
  };

  const setNavMobileFlag = (key, v) => setNavMobile(key, v === '' ? undefined : v === 'on');

  /** The phone's border: '' is «same as desktop», none removes it there. */
  const setNavMobileBorder = (side) => setNavMobile('border', side ? { ...(siteDraft.nav.style?.mobile?.border ?? {}), side } : undefined);

  /** The phone's border width: 1 is the default and is not stored. */
  function setNavMobileBorderWidth(value) {
    const w = clampRange(value, { min: 1, max: 8 }, 1);
    const border = { ...siteDraft.nav.style.mobile.border };
    if (w === 1) delete border.width; else border.width = w;
    setNavMobile('border', border);
  }

  /** The number of a mobile size: empty restores the desktop value. */
  function onNavMobileField(e, key, range) {
    const raw = e.target.value;
    setNavMobile(key, raw === '' ? undefined : clampRange(raw, range, undefined));
    e.target.value = siteDraft.nav.style?.mobile?.[key] ?? '';
  }

  /** The sheet's own surface (nav.style.sheet): an emptied object is removed. */
  function setNavSheet(key, value) {
    siteMutate(`edit:nav-sheet-${key}`, () => {
      siteDraft.nav.style ??= {};
      const sheet = { ...(siteDraft.nav.style.sheet ?? {}) };
      if (value === undefined) delete sheet[key];
      else sheet[key] = value;
      if (Object.keys(sheet).length) siteDraft.nav.style.sheet = sheet;
      else delete siteDraft.nav.style.sheet;
    });
  }

  const sameOnOff = $derived([['', ta('lbl.navSameAsDesktop')], ['on', ta('common.on')], ['off', ta('common.off')]]);
  const sheetOpacity = $derived(Math.round((siteDraft.nav.style?.sheet?.bgOpacity ?? 0.85) * 100));
</script>

<SubHeading text={ta('lbl.navPhoneBar')} />
<div class="ctl-pair">
  {#if !sideVariant}
    <div class="ctl-field" title={ta('tip.nav.thickness')}>
      <span class="mini-label">{ta('lbl.navThickness')}</span>
      <input type="number" class="tb-num" min={PAD_Y.min} max={PAD_Y.max}
        placeholder={ta('lbl.navSameAsDesktop')}
        value={siteDraft.nav.style?.mobile?.padY ?? ''}
        onchange={(e) => onNavMobileField(e, 'padY', PAD_Y)} />
    </div>
  {/if}
  <div class="ctl-field" title={ta('tip.nav.menuTextSize')}>
    <span class="mini-label">{ta('lbl.navTextSize')}</span>
    <input type="number" class="tb-num" min={TEXT_SIZE.min} max={TEXT_SIZE.max}
      placeholder={ta('lbl.navSameAsDesktop')}
      value={siteDraft.nav.style?.mobile?.textSize ?? ''}
      onchange={(e) => onNavMobileField(e, 'textSize', TEXT_SIZE)} />
  </div>
</div>
<Setting key="size">
  <SelectRow label={ta('lbl.size')} title={ta('tip.nav.mobileSize')} value={siteDraft.nav.style?.mobile?.size ?? ''}
    options={[['', ta('lbl.navSameAsDesktop')], ...SIZE_IDS.map((id) => [id, ta(`opt.size.${id}`)])]}
    onchange={(v) => setNavMobile('size', v || undefined)} />
</Setting>
<Setting key="border">
  <SelectRow label={ta('lbl.navBorder')} title={ta('tip.nav.mobileBorder')} value={siteDraft.nav.style?.mobile?.border?.side ?? ''}
    options={[['', ta('lbl.navSameAsDesktop')], ['none', ta('common.none')], ['bottom', ta('opt.navBorder.bottom')], ['top', ta('opt.navBorder.top')], ['both', ta('opt.navBorder.both')], ['all', ta('opt.navBorder.all')]]}
    onchange={(v) => setNavMobileBorder(v)} />
</Setting>
<!-- Width and colour only where the phone draws a border of its own -->
{#if siteDraft.nav.style?.mobile?.border?.side && siteDraft.nav.style.mobile.border.side !== 'none'}
  <NumberRow label={ta('lbl.navBorderWidth')} title={ta('tip.nav.borderWidth')} value={siteDraft.nav.style.mobile.border.width ?? 1} min={1} max={8} unit="px"
    onchange={(v) => setNavMobileBorderWidth(v)} />
  <ColourRow label={ta('lbl.navBorderColor')} title={ta('tip.nav.borderColorPick')} value={siteDraft.nav.style.mobile.border.color ?? 'text'} tokens={themeSwatches()}
    onchange={(hex) => setNavMobile('border', { ...siteDraft.nav.style.mobile.border, color: hex })} />
{/if}
<Setting key="layout">
  <Choice label={ta('lbl.navPlacement')} title={ta('tip.nav.mobileLayout')} value={siteDraft.nav.style?.mobile?.layout ?? ''}
    options={[['', ta('lbl.navSameAsDesktop')], ['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
    onchange={(v) => setNavMobile('layout', v || undefined)} />
</Setting>
<Setting key="tools">
  <Choice label={ta('lbl.navToolButtons')} title={ta('tip.nav.mobileTools')} value={siteDraft.nav.style?.mobile?.tools?.side ?? ''}
    options={[['', ta('lbl.navSameAsDesktop')], ['start', ta('common.left')], ['end', ta('common.right')]]}
    onchange={(v) => setNavMobile('tools', v ? { side: v } : undefined)} />
</Setting>
<!-- Over the top section and the content width: the bar only, the floating forms and the column are out of the flow already -->
{#if !floatingVariant && !sideVariant}
  <Setting key="overlay">
    <Choice label={ta('lbl.navOverlay')} title={ta('tip.nav.mobileOverlay')} value={navMobileFlag('overlay')}
      options={sameOnOff} onchange={(v) => setNavMobileFlag('overlay', v)} />
  </Setting>
  <Setting key="inset">
    <Choice label={ta('lbl.navInset')} title={ta('tip.nav.inset')} value={navMobileFlag('inset')}
      options={sameOnOff} onchange={(v) => setNavMobileFlag('inset', v)} />
  </Setting>
{/if}
<SubHeading text={ta('lbl.navPhoneMenu')} />
<Setting key="mobileMenu">
  <Choice label={ta('lbl.mobileMenu')} title={ta('tip.nav.mobileMenu')} value={siteDraft.nav.style?.mobileMenu ?? 'dropdown'}
    options={[['dropdown', ta('opt.mobileMenu.dropdown')], ['sheet', ta('opt.mobileMenu.sheet')]]}
    onchange={(v) => setNavStyle('mobileMenu', v === 'dropdown' ? undefined : v)} />
</Setting>
{#if siteDraft.nav.style?.mobileMenu === 'sheet'}
  <Setting key="sheetMotion">
    <SelectRow label={ta('lbl.sheetMotion')} title={ta('tip.nav.sheetMotion')} value={siteDraft.nav.style?.sheetMotion ?? 'top'}
      options={['top', 'bottom', 'left', 'right', 'fade', 'none'].map((m) => [m, ta(`opt.sheetMotion.${m}`)])}
      onchange={(v) => setNavStyle('sheetMotion', v === 'top' ? undefined : v)} />
  </Setting>
{/if}
<!-- The burger's drawing and the word beside it; the bare tile only once the word is on -->
<Setting key="icon">
  <div class="ctl-field" title={ta('tip.nav.burgerIcon')}>
    <span class="mini-label">{ta('lbl.burgerIcon')}</span>
    <div class="tile-grid" class:cols-5={burgerLook.showLabel} class:cols-4={!burgerLook.showLabel} role="group" aria-label={ta('lbl.burgerIcon')}>
      {#each burgerOptions as [v, text] (v)}
        <button type="button" class="tile" class:on={burgerLook.icon === v} aria-pressed={burgerLook.icon === v}
          onclick={() => setNavBurger('icon', v === 'lines' ? undefined : v)}>{@html BURGER_TILE_ICONS[v]}<span>{text}</span></button>
      {/each}
    </div>
  </div>
</Setting>
<Setting key="showLabel">
  <SwitchRow label={ta('lbl.burgerLabel')} title={ta('tip.nav.burgerLabel')} checked={burgerLook.showLabel}
    onchange={(on) => setNavBurger('showLabel', on ? true : undefined)} />
</Setting>
{#if burgerLook.showLabel}
  <input placeholder={ta('ph.nav.burgerLabel')} title={ta('tip.nav.burgerText')}
    value={siteDraft.nav.style?.burger?.label ?? ''}
    oninput={(e) => setNavBurger('label', e.target.value.trim() ? e.target.value : undefined)} />
{/if}
{#if siteDraft.nav.style?.mobileMenu === 'sheet'}
  <Setting key="sheetLogo">
    <SwitchRow label={ta('lbl.sheetLogo')} title={ta('tip.nav.sheetLogo')} checked={siteDraft.nav.style?.sheetLogo === true}
      onchange={(on) => setNavStyle('sheetLogo', on ? true : undefined)} />
  </Setting>
  {#if siteDraft.theme?.alt?.tokens && siteDraft.nav.style?.tools?.theme !== false}
    <Setting key="sheetTheme">
      <SwitchRow label={ta('lbl.sheetTheme')} title={ta('tip.nav.sheetTheme')} checked={siteDraft.nav.style?.sheetTheme === true}
        onchange={(on) => setNavStyle('sheetTheme', on ? true : undefined)} />
    </Setting>
  {/if}
  {#if siteDraft.nav.cart?.show}
    <Setting key="sheetCart">
      <SwitchRow label={ta('lbl.sheetCart')} title={ta('tip.nav.sheetCart')} checked={siteDraft.nav.style?.sheetCart === true}
        onchange={(on) => setNavStyle('sheetCart', on ? true : undefined)} />
    </Setting>
  {/if}
  <!-- Only with a strip to move: without it the setting does nothing -->
  {#if siteDraft.nav.announcement?.show}
    <Setting key="sheetAnnounce">
      <SwitchRow label={ta('lbl.sheetAnnounce')} title={ta('tip.nav.sheetAnnounce')} checked={siteDraft.nav.style?.sheetAnnounce === true}
        onchange={(on) => setNavStyle('sheetAnnounce', on ? true : undefined)} />
    </Setting>
  {/if}
  {#if siteDraft.nav.style?.sheetTheme || siteDraft.nav.style?.sheetCart}
    <Setting key="sheetToolLabels">
      <SwitchRow label={ta('lbl.sheetToolLabels')} title={ta('tip.nav.sheetToolLabels')} checked={siteDraft.nav.style?.sheetToolLabels === true}
        onchange={(on) => setNavStyle('sheetToolLabels', on ? true : undefined)} />
    </Setting>
  {/if}
  <!-- The menu's own surface: colour, opacity and text colour; the blur as a switch -->
  <Setting key="bg">
    <ColourRow label={ta('lbl.background')} title={ta('tip.nav.sheetBg')} value={siteDraft.nav.style?.sheet?.bg ?? 'surface'} tokens={themeSwatches()}
      onchange={(hex) => setNavSheet('bg', hex)} />
  </Setting>
  <Setting key="bgOpacity">
    <SliderRow label={ta('lbl.sheetOpacity')} title={ta('tip.nav.sheetOpacity')} value={sheetOpacity} min={0} max={100} step={1}
      shown={`${sheetOpacity}%`} oninput={(v) => setNavSheet('bgOpacity', v / 100)} />
  </Setting>
  <Setting key="blur">
    <SwitchRow label={ta('lbl.sheetBlur')} title={ta('tip.nav.sheetBlur')} checked={siteDraft.nav.style?.sheet?.blur ?? siteDraft.nav.style?.blur !== false}
      onchange={(on) => setNavSheet('blur', on)} />
  </Setting>
  <Setting key="textColor">
    <ColourRow label={ta('lbl.textColor')} title={ta('tip.nav.sheetTextColorPick')} value={siteDraft.nav.style?.sheet?.textColor ?? siteDraft.nav.style?.textColor ?? 'text'} tokens={themeSwatches()}
      onchange={(hex) => setNavSheet('textColor', hex)} />
  </Setting>
{/if}
{#if siteDraft.nav.items?.some((item) => item.children?.length)}
  <Setting key="mobileSubs">
    <Choice label={ta('lbl.mobileSubs')} title={ta('tip.nav.mobileSubs')} value={siteDraft.nav.style?.mobileSubs ?? 'collapsed'}
      options={[['collapsed', ta('opt.mobileSubs.collapsed')], ['expanded', ta('opt.mobileSubs.expanded')]]}
      onchange={(v) => setNavStyle('mobileSubs', v === 'collapsed' ? undefined : v)} />
  </Setting>
{/if}
