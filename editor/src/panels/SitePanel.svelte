<script>
  /* The Site panel: the site itself (its name, title, description and icon), its language and place, the content width, the calendars, the links and the shop, each a fold of the row kit its tab's menu reaches (lib/panel-folds.js); the contact details stand in the Legal panel.
     A fold of settings says its value while closed and carries its reset (lib/site-groups.js); a fold of a list says how many it holds; the media's tidy stands in the Updates panel. The state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import { WIDTH_MIN, WIDTH_MAX, WIDTH_STEP, WIDTH_DEFAULT, GUTTER_MIN, GUTTER_MAX, GUTTER_STEP, GUTTER_DEFAULT, WIDTH_PRESETS, GUTTER_PRESETS, REF_SCREENS, clampWidth, clampGutter, contentBand, presetOf } from '../lib/content-width.js';
  import Choice from '../lib/Choice.svelte';
  import Fold from '../lib/rows/Fold.svelte';
  import Setting from '../lib/rows/Setting.svelte';
  import SelectRow from '../lib/rows/SelectRow.svelte';
  import SliderRow from '../lib/rows/SliderRow.svelte';
  import SwitchRow from '../lib/rows/SwitchRow.svelte';
  import ColourRow from '../lib/rows/ColourRow.svelte';
  import SubHeading from '../lib/rows/SubHeading.svelte';
  import ErrorLine from '../lib/rows/ErrorLine.svelte';
  import PanelLinkRow from '../lib/rows/PanelLinkRow.svelte';
  import IconButton from '../lib/rows/IconButton.svelte';
  import CardList from '../lib/rows/CardList.svelte';
  import { siteGroup } from '../lib/site-groups.js';
  import { autogrow } from '../lib/autogrow.js';
  import { ta } from '$engine/i18n.js';
  import { zoneValid } from '$engine/calendar-format.js';
  import { MAP_SERVICES, mapService } from '$engine/map-links.js';
  import { meetingHostList } from '$engine/meeting-links.js';
  import { ICONS } from '../lib/icons.js';
  import { groupChip } from '../lib/legal-model.js';
  import { swatchCss } from '../lib/swatch.js';
  const ed = getContext('urd-editor');
  const bindsFrom = $derived(ed.bindsFrom);
  const layoutGutter = $derived(ed.layoutGutter);
  const layoutWidth = $derived(ed.layoutWidth);
  const site = $derived(ed.site);
  const siteDraft = $derived(ed.siteDraft);
  import LinkList from '../lib/LinkList.svelte';
  const { addSiteCalendar, setStatus, siteCalendars, siteLangOptions, siteLangValue, siteMutate, themeSwatches, siteLinks, addSiteLink, removeSiteLink, moveSiteLink, setSiteLink } = ed;
  const S = 'site';

  /* The site icon chosen: the picture is kept as the original (an SVG trimmed to its mark, so the icon is filled by it), and the image editor opens on it; «Done» bakes the icon, which stays raster, since Safari does not use an SVG favicon. */
  async function uploadSiteIcon(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await ed.compressOrTrim(file, 'image');
      ed.openPicture({ kind: 'icon', fresh: true, source: { src: img.dataUrl } });
    } catch (err) {
      setStatus(ed.imageErrorText(err, 'status.imageReadErrorSvg'), 'error');
    }
  }

  /** The image editor on the site icon: from its kept original, or from the icon itself where none is kept. */
  function editSiteIcon() {
    const kept = siteDraft.site.iconSource;
    ed.openPicture({ kind: 'icon', source: kept?.src ? kept : { src: siteDraft.site.icon } });
  }

  /** The site name (site.title): half the tab title (`<page> - <name>`)
   *  and the default text in the menu logo. edit: key so a typing session
   *  becomes one undo step. */
  function setSiteName(value) {
    siteMutate('edit:site-title', () => { siteDraft.site.title = value; });
  }

  /** The site description (site.description): used by search engines and when sharing. One paragraph: a line break, typed or pasted, becomes a space. */
  function setSiteDescription(value) {
    const text = value.replace(/\s*\n\s*/g, ' ');
    siteMutate('edit:site-desc', () => { siteDraft.site.description = text; });
  }

  let widthPreset = $derived(presetOf(layoutWidth));

  let gutterPreset = $derived(GUTTER_PRESETS.find((p) => p.gutter === layoutGutter)?.id ?? null);

  /** The slider needs a number even when the width is set to "full". */
  let widthSlider = $derived(layoutWidth === 'full' ? WIDTH_MAX : clampWidth(layoutWidth));

  /** The sample: one strip per reference screen, with the share and whether the width binds there. */
  let widthBands = $derived(REF_SCREENS.map((screen) => ({
    screen,
    ...contentBand(layoutWidth, layoutGutter, screen),
  })));

  function setLayout(patch, key) {
    siteMutate(key, () => {
      const next = { ...(siteDraft.layout ?? {}), contentWidth: layoutWidth, gutter: layoutGutter, ...patch };
      for (const k of Object.keys(next)) if (next[k] === undefined) delete next[k];
      siteDraft.layout = next;
    });
  }

  const setContentWidth = (w) => setLayout({ contentWidth: w === 'full' ? 'full' : clampWidth(w) }, 'edit:site-width');

  const setContentGutter = (g) => setLayout({ gutter: clampGutter(g) }, 'edit:site-gutter');

  function setSiteLang(v) {
    siteMutate('site', () => { siteDraft.site.lang = v; });
  }

  /** The site's own meeting hosts (site.meetingHosts): stored as clean host names, and as no field when the list is empty. */
  function setSiteMeetingHosts(value) {
    const hosts = meetingHostList(value);
    siteMutate('site', () => {
      if (hosts.length) siteDraft.site.meetingHosts = hosts;
      else delete siteDraft.site.meetingHosts;
    });
  }

  function removeSiteCalendar(i) {
    siteMutate('site', () => {
      if (siteDraft.site.calendars[i]?.id === ed.openSiteCalendar) ed.openSiteCalendar = null;
      siteDraft.site.calendars.splice(i, 1);
      if (!siteDraft.site.calendars.length) delete siteDraft.site.calendars;
    });
  }

  /** Moves a calendar from one place in the list to another, as the card list's drag and keys do. */
  function moveSiteCalendar(from, to) {
    siteMutate('site', () => {
      const list = siteDraft.site.calendars;
      if (from === to || to < 0 || to >= list.length) return;
      list.splice(to, 0, ...list.splice(from, 1));
    });
  }

  /** One field of a calendar: an empty value removes the field, except the address, which stays as an empty string. */
  function setSiteCalendar(i, key, value, keep = false) {
    const clean = String(value ?? '').trim();
    siteMutate(`edit:site-cal-${i}-${key}`, () => {
      const cal = siteDraft.site.calendars[i];
      if (clean || keep) cal[key] = clean;
      else delete cal[key];
    });
  }

  /** A switch that is on unless stored as false. */
  function setSiteCalendarFlag(i, key, on) {
    siteMutate('site', () => {
      const cal = siteDraft.site.calendars[i];
      if (on) delete cal[key];
      else cal[key] = false;
    });
  }

  /** The map service places link to (site.mapService): OpenStreetMap is the default and is stored as no field. */
  function setSiteMapService(id) {
    siteMutate('site', () => {
      if (id && id !== 'osm') siteDraft.site.mapService = id;
      else delete siteDraft.site.mapService;
    });
  }

  /** The shop's currency (site.commerce.currency, ISO 4217): the code the payment layer charges in; empty means NOK. */
  function setSiteCurrency(value) {
    const code = value.trim().toUpperCase();
    ed.siteCurrencyBad = code !== '' && !/^[A-Z]{3}$/.test(code);
    if (ed.siteCurrencyBad) return;
    siteMutate('site', () => {
      if (code) siteDraft.site.commerce = { ...(siteDraft.site.commerce ?? {}), currency: code };
      else if (siteDraft.site.commerce) {
        // The shop's other settings (the block lists, the terms page) stay.
        delete siteDraft.site.commerce.currency;
        if (!Object.keys(siteDraft.site.commerce).length) delete siteDraft.site.commerce;
      }
    });
  }

  /** The groups of settings with a value of their own to go back from: the title's form, the place, the content width and the shop. */
  const identityGroup = () => siteGroup(() => siteDraft.site, siteMutate, 'site-identity', { titleFormat: 'page-site' });
  // A reset takes the field's error line away with the value it was about.
  const regionGroup = () => siteGroup(() => siteDraft.site, (name, change) => { siteMutate(name, change); ed.siteZoneBad = false; }, 'site-region', { timeZone: undefined, mapService: 'osm' });
  const widthGroup = () => siteGroup(() => siteDraft.layout, (name, change) => siteMutate(name, () => {
    change();
    if (siteDraft.layout && !Object.keys(siteDraft.layout).length) delete siteDraft.layout;
  }), 'site-width', { contentWidth: WIDTH_DEFAULT, gutter: GUTTER_DEFAULT });
  const shopGroup = () => siteGroup(() => siteDraft.site.commerce, (name, change) => {
    siteMutate(name, () => {
      change();
      if (siteDraft.site.commerce && !Object.keys(siteDraft.site.commerce).length) delete siteDraft.site.commerce;
    });
    ed.siteCurrencyBad = false;
  }, 'site-shop', { shop: undefined, currency: undefined });

  /** The words for the closed folds. */
  const langName = () => siteLangOptions().find(([code]) => code === siteLangValue())?.[1] ?? siteLangValue();
  const widthValue = () => `${layoutWidth === 'full' ? ta('lbl.width.full') : `${layoutWidth} px`} · ${layoutGutter} vw`;

  /** A calendar's card: its colour, its name and its address. */
  const calendarCard = (cal) => ({ name: cal.name || cal.url || ta('ui.addSiteCalendar'), detail: cal.url || ta('calendar.sourceUrl'), swatch: swatchCss(cal.color) });

  function setSiteTimeZone(value) {
    const zone = value.trim();
    ed.siteZoneBad = zone !== '' && !zoneValid(zone);
    if (ed.siteZoneBad) return;
    siteMutate('site', () => {
      if (zone) siteDraft.site.timeZone = zone;
      else delete siteDraft.site.timeZone;
    });
  }
</script>

<div class="panel-body">
  <!-- The site itself: its name, how a tab's title is formed, the description search engines and shares show, and its icon; the contact details are set in the Legal panel -->
  <Fold id="identity" surface={S} title={ta('group.siteIdentity')} value={siteDraft.site.title || ta('common.none')} group={identityGroup()}>
    <label class="field-stack" title={ta('tip.site.name')}>{ta('lbl.name')}
      <input value={siteDraft.site.title ?? ''} placeholder={ta('ph.site.name')}
        oninput={(e) => setSiteName(e.target.value)} />
    </label>
    <Setting key="titleFormat">
      <Choice label={ta('lbl.titleFormat')} title={ta('tip.site.titleFormat')} value={siteDraft.site.titleFormat ?? 'page-site'}
        options={ed.TITLE_FORMAT_OPTIONS} onchange={ed.setTitleFormat} />
    </Setting>
    <label class="field-stack" title={ta('tip.site.description')}>{ta('lbl.description')}
      <!-- One paragraph that wraps and grows downwards as it is typed -->
      <textarea class="field-grow" rows="1" value={siteDraft.site.description ?? ''} placeholder={ta('ph.site.description')} use:autogrow={siteDraft.site.description}
        onkeydown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
        oninput={(e) => setSiteDescription(e.target.value)}></textarea>
    </label>
    <div class="site-icon-row" title={ta('tip.site.icon')}>
      <span>{ta('lbl.siteIcon')}</span>
      <span class="toolbar-row">
        {#if siteDraft.site.icon}
          <img class="site-icon-preview" src={siteDraft.site.icon} alt={ta('lbl.siteIcon')} />
        {/if}
        <label class="ghost filepick tb-grow" title={ta('tip.site.icon')}>
          {siteDraft.site.icon ? ta('ui.changeIcon') : ta('ui.chooseIcon')}
          <input type="file" accept="image/*" onchange={uploadSiteIcon} />
        </label>
        {#if siteDraft.site.icon}
          <IconButton icon={ICONS.pencil} label={ta('tip.site.editIcon')} onclick={editSiteIcon} />
          <IconButton icon={ICONS.bin} danger label={ta('tip.site.removeIcon')} onclick={() => ed.setSiteIcon('', null)} />
        {/if}
      </span>
    </div>
    <!-- The contact details live in the Legal panel: the legal name and what is still to fill in show here, and the row opens the panel at «Who you are» -->
    <PanelLinkRow label={ta('group.siteContact')} to={ta('panel.legal')} title={ta('tip.legal.goto')} onclick={() => ed.openPanel('legal', { fold: 'who' })}>
      {#snippet value()}
        {#if siteDraft.site.contact?.legalName}<span>{siteDraft.site.contact.legalName}</span>{/if}
        {#if ed.legal?.who.missing.length}
          {@const c = groupChip('who', ed.legal)}
          <span class="legal-chip warn">{ta(c.key, { n: c.n })}</span>
        {/if}
      {/snippet}
    </PanelLinkRow>
  </Fold>

  <!-- The site's language, the clock its calendars show times on, and the map service a place links to -->
  <Fold id="region" surface={S} title={ta('group.siteRegion')} value={langName()} group={regionGroup()}>
    <SelectRow label={ta('site.langLabel')} title={ta('site.langTitle')} value={siteLangValue()} options={siteLangOptions()}
      onchange={(v) => setSiteLang(v)} />
    <Setting key="timeZone">
      <label class="field-stack" title={ta('tip.settings.timeZone')}>{ta('settings.timeZone')}
        <input value={siteDraft.site.timeZone ?? ''} placeholder="Europe/Oslo" spellcheck="false" class:place-error={ed.siteZoneBad}
          onchange={(e) => setSiteTimeZone(e.target.value)} /></label>
    </Setting>
    {#if ed.siteZoneBad}<ErrorLine text={ta('settings.timeZoneBad')} />{/if}
    <!-- Each map service says who makes it, where they are from and what it does with a search -->
    <Setting key="mapService">
      <SelectRow label={ta('settings.mapService')} title={ta('tip.settings.mapService')} value={mapService(siteDraft)}
        options={MAP_SERVICES.map((id) => [id, ta(`mapService.${id}`), ta(`mapService.${id}.note`)])}
        onchange={(v) => setSiteMapService(v)} />
    </Setting>
  </Fold>

  <!-- The width the content keeps on a wide screen, and the margin at its sides; the sample shows, for three common screens, where the width binds and where the content runs fluid -->
  <Fold id="width" surface={S} title={ta('lbl.contentWidth')} tip={ta('tip.site.contentWidth')} value={widthValue()} group={widthGroup()}>
    <div class="sample cw-sample">
      {#each widthBands as band (band.screen)}
        <div class="cw-row">
          <span class="mini-label cw-screen">{band.screen}</span>
          <span class="cw-bar" class:fluid={!band.bound}>
            <span class="cw-fill" style="width:{band.pct}%"></span>
          </span>
          <span class="gridmenu-value cw-margin">{band.bound ? `${band.margin}` : '-'}</span>
        </div>
      {/each}
      <div class="cw-legend">
        <span class="mini-label">{ta('lbl.screenPx')}</span>
        <span class="mini-label">{ta('lbl.marginPx')}</span>
      </div>
      {#if layoutWidth !== 'full'}
        <div class="mini-label cw-binds">{ta('lbl.bindsFrom', { n: bindsFrom })}</div>
      {/if}
    </div>
    <Setting key="contentWidth">
      <Choice label={ta('lbl.contentWidth')} title={ta('tip.site.contentWidth')} value={widthPreset}
        options={WIDTH_PRESETS.map((p) => [p.id, ta(`lbl.width.${p.id}`)])}
        onchange={(id) => setContentWidth(WIDTH_PRESETS.find((p) => p.id === id).width)} />
      {#if layoutWidth !== 'full'}
        <SliderRow label={ta('lbl.widthFree')} title={ta('tip.site.contentWidthFree')} value={widthSlider} min={WIDTH_MIN} max={WIDTH_MAX} step={WIDTH_STEP}
          shown={`${widthSlider} px`} oninput={(v) => setContentWidth(v)} />
      {/if}
    </Setting>
    <Setting key="gutter">
      <Choice label={ta('lbl.gutter')} title={ta('tip.site.gutter')} value={gutterPreset}
        options={GUTTER_PRESETS.map((p) => [p.id, ta(`lbl.gutter.${p.id}`)])}
        onchange={(id) => setContentGutter(GUTTER_PRESETS.find((p) => p.id === id).gutter)} />
      <SliderRow label={ta('lbl.gutterVw')} title={ta('tip.site.gutterVw')} value={layoutGutter} min={GUTTER_MIN} max={GUTTER_MAX} step={GUTTER_STEP}
        shown={`${layoutGutter} vw`} oninput={(v) => setContentGutter(v)} />
    </Setting>
  </Fold>

  <!-- The site's calendars (site.calendars): registered once with their settings, picked by the calendar blocks as references.
       Cards like the Nav tab's items, one open at a time; the new calendar opens with the caret in its name -->
  <Fold id="calendars" surface={S} title={ta('group.siteCalendars')} tip={ta('tip.site.calendars')} value={siteCalendars().length ? `${siteCalendars().length}` : ta('common.none')}>
    <button type="button" class="ghost action" onclick={() => addSiteCalendar()}>{@html ICONS.plus}{ta('ui.addSiteCalendar')}</button>
    {#if siteCalendars().length}
      <CardList items={siteCalendars()} label={ta('group.siteCalendars')} key={(cal) => cal.id} card={calendarCard}
        isOpen={(i) => ed.openSiteCalendar === siteCalendars()[i]?.id}
        ontoggle={(i) => { const id = siteCalendars()[i]?.id; ed.openSiteCalendar = ed.openSiteCalendar === id ? null : id; }}
        onmove={moveSiteCalendar} onremove={removeSiteCalendar} removeLabel={ta('tip.site.removeCalendar')}>
        {#snippet body(cal, ci)}
          <SubHeading text={ta('group.siteCalBasics')} />
          <label title={ta('tip.calendar.sourceName')} class="field-stack">{ta('lbl.name')}
            <input value={cal.name ?? ''} placeholder={ta('calendar.sourceName')} data-cal-name={cal.id}
              onchange={(e) => setSiteCalendar(ci, 'name', e.target.value)} /></label>
          <label title={ta('tip.siteCal.url')} class="field-stack">{ta('calendar.sourceUrl')}
            <input value={cal.url} placeholder={ta('calendar.sourcesPh')} spellcheck="false"
              onchange={(e) => setSiteCalendar(ci, 'url', e.target.value, true)} /></label>
          <label class="field-stack" title={ta('tip.siteCal.description')}>{ta('siteCal.description')}
            <input value={cal.description ?? ''}
              onchange={(e) => setSiteCalendar(ci, 'description', e.target.value)} /></label>
          <SubHeading text={ta('group.siteCalColors')} />
          <!-- The main colour, and the three that replace what it derives (empty = derived) -->
          <ColourRow label={ta('siteCal.colorMain')} title={ta('tip.calendar.sourceColor')} value={cal.color || 'accent'} tokens={themeSwatches()}
            onchange={(hex) => setSiteCalendar(ci, 'color', hex ?? '')} />
          {#each [['colorText', 'siteCal.colorText'], ['colorBox', 'siteCal.colorBox'], ['colorChip', 'siteCal.colorChip']] as [key, labelKey] (key)}
            <ColourRow label={ta(labelKey)} title={ta(`tip.${labelKey}`)} value={cal[key] || ''} tokens={themeSwatches()} allowClear
              onchange={(hex) => setSiteCalendar(ci, key, hex ?? '')} />
          {/each}
          <SubHeading text={ta('group.siteCalVisitors')} />
          <label class="field-stack" title={ta('tip.siteCal.link')}>{ta('siteCal.link')}
            <input value={cal.link ?? ''} placeholder="https://" spellcheck="false"
              onchange={(e) => setSiteCalendar(ci, 'link', e.target.value)} /></label>
          <label class="field-stack" title={ta('tip.siteCal.organizer')}>{ta('siteCal.organizer')}
            <input value={cal.organizer ?? ''}
              onchange={(e) => setSiteCalendar(ci, 'organizer', e.target.value)} /></label>
          <SwitchRow label={ta('siteCal.subscribable')} title={ta('tip.siteCal.subscribable')} checked={cal.subscribable !== false}
            onchange={(on) => setSiteCalendarFlag(ci, 'subscribable', on)} />
          <SwitchRow label={ta('siteCal.inFilter')} title={ta('tip.siteCal.inFilter')} checked={cal.inFilter !== false}
            onchange={(on) => setSiteCalendarFlag(ci, 'inFilter', on)} />
        {/snippet}
      </CardList>
    {/if}
    <!-- The site's own video meeting servers: a link to one of them in a calendar event is a meeting link -->
    <label class="field-stack" title={ta('tip.settings.meetingHosts')}>{ta('settings.meetingHosts')}
      <input value={(siteDraft.site.meetingHosts ?? []).join(', ')} placeholder="meet.example.org" spellcheck="false"
        onchange={(e) => setSiteMeetingHosts(e.target.value)} /></label>
  </Fold>

  <!-- The site's links (site.links): the owner's addresses with an icon, drawn by the footer, the menu's tools and the share block -->
  <Fold id="links" surface={S} title={ta('group.siteLinks')} tip={ta('tip.site.links')} value={siteLinks().length ? `${siteLinks().length}` : ta('common.none')}>
    <LinkList scope="site" links={siteLinks()}
      onchange={(i, patch) => setSiteLink(i, patch)} onadd={() => addSiteLink()}
      onremove={(i) => removeSiteLink(i)} onmove={(from, to) => moveSiteLink(from, to)} />
  </Fold>

  <!-- The shop's settings for the whole site -->
  <Fold id="shop" surface={S} title={ta('group.siteShop')} tip={ta('tip.site.shop')} value={`${ed.shopBlocksOn() ? ta('opt.shopBlocks.shown') : ta('opt.shopBlocks.hidden')} · ${siteDraft.site.commerce?.currency || 'NOK'}`} group={shopGroup()}>
    <!-- The shop's blocks in the block lists (block-palette.js shopOn): the site's own choice, else shown while a product catalogue exists. A choice of Shown or Hidden, never a switch, so it cannot read as the shop itself going off -->
    <Setting key="shop">
      <Choice label={ta('settings.shopOn')} title={ta('tip.settings.shopOn')} value={ed.shopBlocksOn() ? 'shown' : 'hidden'}
        options={[['shown', ta('opt.shopBlocks.shown')], ['hidden', ta('opt.shopBlocks.hidden')]]}
        onchange={(v) => siteMutate('site', () => { siteDraft.site.commerce = { ...(siteDraft.site.commerce ?? {}), shop: v === 'shown' }; })} />
    </Setting>
    <!-- The shop's currency: the ISO code the payment layer charges in, and the word the checkout shows with a provider on -->
    <Setting key="currency">
      <label class="field-stack" title={ta('tip.settings.currency')}>{ta('settings.currency')}
        <input value={siteDraft.site.commerce?.currency ?? ''} placeholder="NOK" maxlength="3" spellcheck="false" class:place-error={ed.siteCurrencyBad} data-field="shop-currency"
          onchange={(e) => setSiteCurrency(e.target.value)} /></label>
    </Setting>
    <!-- The terms of sale the checkout links are chosen in the Legal panel: the page chosen shows here while the panel shows its Terms of sale, and the row opens the panel there -->
    {#if ed.legal?.terms.shown}
      <PanelLinkRow label={ta('settings.termsPage')} to={ta('panel.legal')} title={ta('tip.legal.goto')} onclick={() => ed.openPanel('legal', { fold: 'terms' })}>
        {#snippet value()}<span>{(siteDraft.pages ?? []).find((p) => p.id === siteDraft.site.commerce?.termsPage)?.title ?? ta('common.none')}</span>{/snippet}
      </PanelLinkRow>
    {/if}
  </Fold>
</div>
