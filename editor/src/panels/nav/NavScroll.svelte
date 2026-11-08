<script>
  /* The Nav panel's Scrolling and pages fold: what the bar does as the page scrolls (the bar and the floating forms; the column stands still), then the pages the menu shows on, how it is reached on the others, and the pull tab's own design. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import MarkPicker from '../../lib/MarkPicker.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import SliderRow from '../../lib/rows/SliderRow.svelte';
  import ColourRow from '../../lib/rows/ColourRow.svelte';
  import SubHeading from '../../lib/rows/SubHeading.svelte';
  import { ta } from '$engine/i18n.js';
  import { iconSvg } from '$engine/icons.js';
  import { SHRINK_TO, SHRINK_AT, SHRINK_MS, clampRange } from '../../lib/nav-size.js';
  import { navActions, isSideNav } from './nav-actions.js';
  const ed = getContext('urd-editor');
  const siteDraft = $derived(ed.siteDraft);
  const { compressOrTrim, imageErrorText, setStatus, siteMutate, themeSwatches } = ed;
  const { setNavStyle, launcherImages } = navActions(ed);

  const sideVariant = $derived(isSideNav(siteDraft?.nav));

  /** Per-page visibility: the menu shows on all pages except those in nav.hideOn (the page's settings share it). */
  const toggleNavOnPage = ed.toggleNavOnPage;

  /** Whether any page is without the menu, which is when the way to reach it matters. */
  const navHidesSome = $derived((siteDraft?.nav?.hideOn ?? []).length > 0);

  /** How the menu is reached on an unticked page (nav.hideMode; the page's settings share it). */
  const setNavHideMode = ed.setNavHideMode;

  /** The pull tab's design: the owner's own once any field of nav.tab is set; the choice alone opens the fields. */
  let tabOwnChoice = $state(null);
  const tabOwn = $derived(tabOwnChoice ?? Boolean(siteDraft?.nav?.tab && Object.keys(siteDraft.nav.tab).length));
  function setTabOwn(own) {
    tabOwnChoice = own;
    if (!own) siteMutate('nav', () => { delete siteDraft.nav.tab; });
  }

  /** One field of the pull tab (nav.tab); the object leaves the file when nothing is set. */
  function setNavTab(key, value) {
    siteMutate(`edit:nav-tab-${key}`, () => {
      const tab = { ...(siteDraft.nav.tab ?? {}) };
      if (value === undefined || value === '') delete tab[key]; else tab[key] = value;
      if (Object.keys(tab).length) siteDraft.nav.tab = tab; else delete siteDraft.nav.tab;
    });
  }

  /** The tab's mark from the picker: an image wins, an icon clears it. */
  function setNavTabMark(mark) {
    siteMutate('nav', () => {
      const tab = { ...(siteDraft.nav.tab ?? {}) };
      if (mark.image) tab.image = mark.image; else delete tab.image;
      if (mark.icon) tab.icon = mark.icon; else delete tab.icon;
      if (Object.keys(tab).length) siteDraft.nav.tab = tab; else delete siteDraft.nav.tab;
    });
  }

  async function uploadNavTabImage(file) {
    if (!file) return;
    try {
      const img = await compressOrTrim(file, 'logo');
      siteMutate('nav', () => { siteDraft.nav.tab = { ...(siteDraft.nav.tab ?? {}), image: img.dataUrl }; });
    } catch (err) {
      setStatus(imageErrorText(err, 'status.imageReadErrorSvg'), 'error');
    }
  }

  /** The scroll shrink factor is stored as a fraction; 0.5 is the default and is not stored. */
  function setNavShrinkTo(percent) {
    const factor = clampRange(percent / 100, SHRINK_TO, 0.5);
    setNavStyle('shrinkTo', factor === 0.5 ? undefined : factor);
  }

  /** How far down the shrink starts, and how long it takes; the defaults are never stored, like the other size fields. */
  function setNavShrinkAt(px) {
    const v = clampRange(px, SHRINK_AT, 80);
    setNavStyle('shrinkAt', v === 80 ? undefined : v);
  }

  function setNavShrinkMs(ms) {
    const v = clampRange(ms, SHRINK_MS, 220);
    setNavStyle('shrinkMs', v === 220 ? undefined : v);
  }

  const shrinkPercent = $derived(Math.round((siteDraft.nav.style?.shrinkTo ?? 0.5) * 100));
</script>

{#if !sideVariant}
  <SubHeading text={ta('group.navScrolling')} />
  <Setting key="sticky">
    <SwitchRow label={ta('lbl.navSticky')} title={ta('tip.nav.sticky')} checked={siteDraft.nav.sticky !== false}
      onchange={(on) => siteMutate('nav', () => { siteDraft.nav.sticky = on; })} />
  </Setting>
  {#if siteDraft.nav.sticky !== false}
    <Setting key="scroll">
      <Choice label={ta('lbl.navScroll')} title={ta('tip.nav.scroll')} value={siteDraft.nav.scroll ?? 'none'}
        options={[['none', ta('opt.scroll.none')], ['shrink', ta('opt.scroll.shrink')], ['hide', ta('opt.scroll.hide')]]}
        onchange={(v) => siteMutate('nav', () => {
          if (v === 'none') delete siteDraft.nav.scroll; else siteDraft.nav.scroll = v;
        })} />
    </Setting>
    {#if siteDraft.nav.scroll === 'shrink'}
      <!-- The compact state: how much of the thickness remains, where and how fast it shrinks, and whether the logo image follows -->
      <Setting key="shrinkTo">
        <SliderRow label={ta('lbl.navShrinkTo')} title={ta('tip.nav.shrinkTo')} value={shrinkPercent} min={30} max={80} step={5}
          shown={`${shrinkPercent}%`} oninput={(v) => setNavShrinkTo(v)} />
      </Setting>
      <Setting key="shrinkAt">
        <SliderRow label={ta('lbl.navShrinkAt')} title={ta('tip.nav.shrinkAt')} value={siteDraft.nav.style?.shrinkAt ?? 80} min={0} max={400} step={10}
          shown={`${siteDraft.nav.style?.shrinkAt ?? 80} px`} oninput={(v) => setNavShrinkAt(v)} />
      </Setting>
      <Setting key="shrinkMs">
        <SliderRow label={ta('lbl.navShrinkMs')} title={ta('tip.nav.shrinkMs')} value={siteDraft.nav.style?.shrinkMs ?? 220} min={0} max={1200} step={20}
          shown={`${siteDraft.nav.style?.shrinkMs ?? 220} ms`} oninput={(v) => setNavShrinkMs(v)} />
      </Setting>
      {#if (siteDraft.nav.logo?.type ?? 'text') !== 'text'}
        <Setting key="shrinkLogo">
          <SwitchRow label={ta('lbl.navShrinkLogo')} title={ta('tip.nav.shrinkLogo')} checked={siteDraft.nav.style?.shrinkLogo === true}
            onchange={(on) => setNavStyle('shrinkLogo', on ? true : undefined)} />
        </Setting>
      {/if}
    {/if}
  {/if}
  <!-- Transparent at the top: the surface appears once the page is scrolled -->
  <Setting key="atTop">
    <SwitchRow label={ta('lbl.navAtTop')} title={ta('tip.nav.atTop')} checked={siteDraft.nav.style?.atTop === 'clear'}
      onchange={(on) => setNavStyle('atTop', on ? 'clear' : undefined)} />
  </Setting>
{/if}
<SubHeading text={ta('group.showNavOnPages')} title={ta('tip.nav.hideMode')} />
<!-- Two pages to a row, so a site with many pages keeps a short list -->
<Setting key="hideOn">
  <div class="page-switches">
    {#each siteDraft.pages ?? [] as pg (pg.id)}
      <SwitchRow label={pg.title || pg.id} title={ta('tip.nav.hideOnPage')} checked={!(siteDraft.nav.hideOn ?? []).includes(pg.id)}
        onchange={(on) => toggleNavOnPage(pg.id, on)} />
    {/each}
  </div>
</Setting>
<!-- How the menu is reached on the unticked pages, and the pull tab's design once a reveal is chosen -->
{#if navHidesSome}
  <Setting key="hideMode">
    <Choice label={ta('lbl.navHideMode')} title={ta('tip.nav.hideMode')} value={siteDraft.nav.hideMode ?? 'hidden'}
      options={ed.NAV_HIDE_MODE_OPTIONS}
      onchange={setNavHideMode} />
  </Setting>
  {#if (siteDraft.nav.hideMode ?? 'hidden') !== 'hidden'}
    <Choice label={ta('lbl.navTab')} title={ta('tip.nav.tabDesign')} value={tabOwn ? 'own' : 'default'}
      options={[['default', ta('opt.navTab.default')], ['own', ta('opt.navTab.own')]]}
      onchange={(v) => setTabOwn(v === 'own')} />
    {#if tabOwn}
      <div class="lrow-fields">
        <span class="lrow-actions">
          <MarkPicker icon={siteDraft.nav.tab?.icon ?? ''} image={siteDraft.nav.tab?.image ?? ''} images={[...launcherImages(), siteDraft.nav.tab?.image].filter(Boolean)}
            klass="linkish" label={ta('tip.nav.tabMark')}
            onpick={setNavTabMark} onfile={uploadNavTabImage}>
            {ta('mp.changeMark')}
          </MarkPicker>
          {#if siteDraft.nav.tab?.image}
            <img class="tab-mark-preview" src={siteDraft.nav.tab.image} alt="" />
          {:else if siteDraft.nav.tab?.icon}
            <span class="tab-mark-preview">{@html iconSvg(siteDraft.nav.tab.icon) || ''}</span>
          {/if}
        </span>
        <input class="field-filled" value={siteDraft.nav.tab?.label ?? ''} placeholder={ta('ph.nav.burgerLabel')} title={ta('tip.nav.tabLabel')}
          onchange={(e) => setNavTab('label', e.target.value.trim())} />
        <ColourRow label={ta('lbl.colour')} title={ta('tip.nav.tabColor')} value={siteDraft.nav.tab?.color ?? 'surface'} tokens={themeSwatches()}
          onchange={(hex) => setNavTab('color', hex)} />
        <ColourRow label={ta('lbl.textColor')} title={ta('tip.nav.tabTextColor')} value={siteDraft.nav.tab?.textColor ?? 'text'} tokens={themeSwatches()}
          onchange={(hex) => setNavTab('textColor', hex)} />
      </div>
    {/if}
  {/if}
{/if}
