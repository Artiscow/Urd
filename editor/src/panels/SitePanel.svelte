<script>
  /* The Site panel: the site's name and description, its icon, the content width, the language, the meeting hosts, the calendars, the map service and the time zone. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import ColorPicker from '../lib/ColorPicker.svelte';
  import { WIDTH_MIN, WIDTH_MAX, WIDTH_STEP, GUTTER_MIN, GUTTER_MAX, GUTTER_STEP, WIDTH_PRESETS, GUTTER_PRESETS, REF_SCREENS, clampWidth, clampGutter, contentBand, presetOf } from '../lib/content-width.js';
  import Dropdown from '../lib/Dropdown.svelte';
  import { ta } from '$engine/i18n.js';
  import { zoneValid } from '$engine/calendar-format.js';
  import { MAP_SERVICES, mapService } from '$engine/map-links.js';
  import { meetingHostList } from '$engine/meeting-links.js';
  import { ICONS } from '../lib/icons.js';
  import { swatchCss } from '../lib/swatch.js';
  const ed = getContext('urd-editor');
  const bindsFrom = $derived(ed.bindsFrom);
  const layoutGutter = $derived(ed.layoutGutter);
  const layoutWidth = $derived(ed.layoutWidth);
  const site = $derived(ed.site);
  const siteDraft = $derived(ed.siteDraft);
  const { addSiteCalendar, setStatus, siteCalendars, siteLangOptions, siteLangValue, siteMutate, svgAutoTrim, themeSwatches } = ed;

  async function uploadSiteIcon(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const isSvg = file.type === 'image/svg+xml' || /\.svg$/i.test(file.name || '');
    if (isSvg) {
      // The SVG is auto-trimmed (viewBox tightened to the subject) BEFORE
      // the icon editor, so the rasterized favicon is filled tightly by
      // the mark. The favicon stays raster: universal support (Safari does
      // not use SVG favicons).
      try {
        const img = await svgAutoTrim(file);
        ed.iconEditorImage = img.dataUrl;
      } catch {
        setStatus(ta('status.imageReadErrorSvg'), 'error');
      }
      return;
    }
    // Read the raw file at full resolution, so the editor has something to crop and zoom in.
    const reader = new FileReader();
    reader.onload = () => { ed.iconEditorImage = String(reader.result); };
    reader.onerror = () => setStatus(ta('status.imageReadError'), 'error');
    reader.readAsDataURL(file);
  }

  function removeSiteIcon() {
    siteMutate('edit:site-icon', () => { delete siteDraft.site.icon; });
  }

  /** The site name (site.title): half the tab title (`<page> - <name>`)
   *  and the default text in the menu logo. edit: key so a typing session
   *  becomes one undo step. */
  function setSiteName(value) {
    siteMutate('edit:site-title', () => { siteDraft.site.title = value; });
  }

  /** The site description (site.description): used by search engines and when sharing. */
  function setSiteDescription(value) {
    siteMutate('edit:site-desc', () => { siteDraft.site.description = value; });
  }

  let widthPreset = $derived(presetOf(layoutWidth));

  let gutterPreset = $derived(GUTTER_PRESETS.find((p) => p.gutter === layoutGutter)?.id ?? null);

  /** A hand-edited margin outside the scale would be invisible in the
   *  normal view, so Advanced starts open when the value matches no step. */
  let gutterAdvanced = $state(false);

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

  function moveSiteCalendar(i, dir) {
    siteMutate('site', () => {
      const list = siteDraft.site.calendars;
      const j = i + dir;
      if (j < 0 || j >= list.length) return;
      [list[i], list[j]] = [list[j], list[i]];
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
  <label title={ta('tip.site.name')}>{ta('lbl.name')}
    <input value={siteDraft.site.title ?? ''} placeholder={ta('ph.site.name')}
      oninput={(e) => setSiteName(e.target.value)} />
  </label>
  <label title={ta('tip.site.description')}>{ta('lbl.description')}
    <input value={siteDraft.site.description ?? ''} placeholder={ta('ph.site.description')}
      oninput={(e) => setSiteDescription(e.target.value)} />
  </label>
  <label title={ta('site.langTitle')}>{ta('site.langLabel')}
    <Dropdown value={siteLangValue()} options={siteLangOptions()}
      onchange={(v) => setSiteLang(v)} /></label>
  <!-- The site's time zone: the clock the calendar's times are shown on, for every visitor -->
  <label title={ta('tip.settings.timeZone')}>{ta('settings.timeZone')}
    <input value={siteDraft.site.timeZone ?? ''} placeholder="Europe/Oslo" spellcheck="false" class:place-error={ed.siteZoneBad}
      onchange={(e) => setSiteTimeZone(e.target.value)} /></label>
  {#if ed.siteZoneBad}
    <p class="panel-hint place-error">{ta('settings.timeZoneBad')}</p>
  {/if}
  <!-- The map service a place links to: each choice says who makes it, where they are from and what it does with a search -->
  <label title={ta('tip.settings.mapService')}>{ta('settings.mapService')}
    <Dropdown value={mapService(siteDraft)} options={MAP_SERVICES.map((id) => [id, ta(`mapService.${id}`), ta(`mapService.${id}.note`)])}
      onchange={(v) => setSiteMapService(v)} /></label>
  <!-- The site's own video meeting servers: a link to one of them in a calendar event is a meeting link -->
  <label title={ta('tip.settings.meetingHosts')}>{ta('settings.meetingHosts')}
    <input value={(siteDraft.site.meetingHosts ?? []).join(', ')} placeholder="meet.example.org" spellcheck="false"
      onchange={(e) => setSiteMeetingHosts(e.target.value)} /></label>
  <!-- The site's calendars (site.calendars): registered once with their settings, picked by the calendar blocks as references.
       A list of closed rows (the colour, the name, the address) with one row open at a time; the new calendar opens with the caret in its name -->
  <details class="group" bind:open={() => ed.siteCalendarsOpen, (v) => (ed.siteCalendarsOpen = v)}>
    <summary title={ta('tip.site.calendars')}>{ta('group.siteCalendars')}</summary>
    <div class="group-items">
      <button type="button" class="site-cal-add" onclick={() => addSiteCalendar()}>{@html ICONS.plus} {ta('ui.addSiteCalendar')}</button>
      {#if siteCalendars().length}
        <div class="site-cal-list">
          {#each siteCalendars() as cal, ci (cal.id)}
            {@const open = ed.openSiteCalendar === cal.id}
            <div class="site-cal-row" class:open>
              <!-- The head opens and closes the row; the body slides between its two heights -->
              <button type="button" class="site-cal-head" aria-expanded={open} onclick={() => (ed.openSiteCalendar = open ? null : cal.id)}>
                <span class="site-cal-dot" style:background={swatchCss(cal.color)} aria-hidden="true"></span>
                <span class="site-cal-text">
                  <span class="site-cal-name">{cal.name || cal.url || ta('ui.addSiteCalendar')}</span>
                  <span class="site-cal-addr">{cal.url || ta('calendar.sourceUrl')}</span>
                </span>
                <span class="site-cal-chev" aria-hidden="true">{@html ICONS.down}</span>
              </button>
              <div class="site-cal-body" inert={!open}>
                <div class="site-cal-clip">
                  <div class="site-cal-fields">
                    <span class="mini-label site-cal-section">{ta('group.siteCalBasics')}</span>
                    <label class="site-cal-field">{ta('lbl.name')}
                      <input value={cal.name ?? ''} placeholder={ta('calendar.sourceName')} title={ta('tip.calendar.sourceName')} data-cal-name={cal.id}
                        onchange={(e) => setSiteCalendar(ci, 'name', e.target.value)} /></label>
                    <label class="site-cal-field">{ta('calendar.sourceUrl')}
                      <input value={cal.url} placeholder={ta('calendar.sourcesPh')} spellcheck="false"
                        onchange={(e) => setSiteCalendar(ci, 'url', e.target.value, true)} /></label>
                    <label class="site-cal-field" title={ta('tip.siteCal.description')}>{ta('siteCal.description')}
                      <input value={cal.description ?? ''}
                        onchange={(e) => setSiteCalendar(ci, 'description', e.target.value)} /></label>
                    <span class="mini-label site-cal-section">{ta('group.siteCalColors')}</span>
                    <!-- The main colour and the three that replace what it derives (empty = derived), four swatches on one row -->
                    <div class="site-cal-colors">
                      <span class="site-cal-color" title={ta('tip.calendar.sourceColor')}>
                        <ColorPicker value={cal.color || 'accent'} tokens={themeSwatches()} label={ta('siteCal.colorMain')}
                          onchange={(hex) => setSiteCalendar(ci, 'color', hex ?? '')} />
                        <span>{ta('siteCal.colorMain')}</span>
                      </span>
                      {#each [['colorText', 'siteCal.colorText'], ['colorBox', 'siteCal.colorBox'], ['colorChip', 'siteCal.colorChip']] as [key, labelKey] (key)}
                        <span class="site-cal-color" title={ta(`tip.${labelKey}`)}>
                          <ColorPicker value={cal[key] || ''} tokens={themeSwatches()} allowClear label={ta(labelKey)}
                            onchange={(hex) => setSiteCalendar(ci, key, hex ?? '')} />
                          <span>{ta(labelKey)}</span>
                        </span>
                      {/each}
                    </div>
                    <span class="mini-label site-cal-section">{ta('group.siteCalVisitors')}</span>
                    <label class="site-cal-field" title={ta('tip.siteCal.link')}>{ta('siteCal.link')}
                      <input value={cal.link ?? ''} placeholder="https://" spellcheck="false"
                        onchange={(e) => setSiteCalendar(ci, 'link', e.target.value)} /></label>
                    <label class="site-cal-field" title={ta('tip.siteCal.organizer')}>{ta('siteCal.organizer')}
                      <input value={cal.organizer ?? ''}
                        onchange={(e) => setSiteCalendar(ci, 'organizer', e.target.value)} /></label>
                    <label class="gridmenu-snap" title={ta('tip.siteCal.subscribable')}>
                      <input type="checkbox" checked={cal.subscribable !== false}
                        onchange={(e) => setSiteCalendarFlag(ci, 'subscribable', e.target.checked)} />
                      {ta('siteCal.subscribable')}
                    </label>
                    <label class="gridmenu-snap" title={ta('tip.siteCal.inFilter')}>
                      <input type="checkbox" checked={cal.inFilter !== false}
                        onchange={(e) => setSiteCalendarFlag(ci, 'inFilter', e.target.checked)} />
                      {ta('siteCal.inFilter')}
                    </label>
                    <div class="site-cal-foot">
                      <span class="row-tools">
                        <button class="ghost row-tool" onclick={() => moveSiteCalendar(ci, -1)} disabled={ci === 0}>{@html ICONS.up}</button>
                        <button class="ghost row-tool" onclick={() => moveSiteCalendar(ci, 1)} disabled={ci === siteCalendars().length - 1}>{@html ICONS.down}</button>
                      </span>
                      <button type="button" class="site-cal-remove" title={ta('tip.site.removeCalendar')} onclick={() => removeSiteCalendar(ci)}>{ta('siteCal.remove')}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </details>
  <hr class="gridmenu-divider" />
  <p class="panel-strong" title={ta('tip.site.contentWidth')}>{ta('lbl.contentWidth')}</p>
  <!-- Live sample: one strip per common screen width, so it is
       visible WHERE the width binds and where it goes fluid. -->
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
  <div class="seg cw-seg">
    {#each WIDTH_PRESETS as p (p.id)}
      <button class:on={widthPreset === p.id}
        onclick={() => setContentWidth(p.width)}>{ta(`lbl.width.${p.id}`)}</button>
    {/each}
  </div>
  {#if layoutWidth !== 'full'}
    <div class="ctl-row" title={ta('tip.site.contentWidthFree')}>
      <span class="mini-label">{ta('lbl.widthFree')}</span>
      <input type="range" min={WIDTH_MIN} max={WIDTH_MAX} step={WIDTH_STEP}
        value={widthSlider}
        oninput={(e) => setContentWidth(e.target.valueAsNumber)} />
      <span class="gridmenu-value">{widthSlider} px</span>
    </div>
  {/if}
  <p class="mini-label" title={ta('tip.site.gutter')}>{ta('lbl.gutter')}</p>
  <div class="seg cw-seg">
    {#each GUTTER_PRESETS as p (p.id)}
      <button class:on={gutterPreset === p.id}
        onclick={() => setContentGutter(p.gutter)}>{ta(`lbl.gutter.${p.id}`)}</button>
    {/each}
  </div>
  <details class="group" open={gutterPreset === null || gutterAdvanced}
    ontoggle={(e) => (gutterAdvanced = e.currentTarget.open)}>
    <summary>{ta('group.advanced')}</summary>
    <div class="group-items">
      <div class="ctl-row" title={ta('tip.site.gutterVw')}>
        <span class="mini-label">{ta('lbl.gutterVw')}</span>
        <input type="range" min={GUTTER_MIN} max={GUTTER_MAX} step={GUTTER_STEP}
          value={layoutGutter}
          oninput={(e) => setContentGutter(e.target.valueAsNumber)} />
        <span class="gridmenu-value">{layoutGutter} vw</span>
      </div>
    </div>
  </details>
  <hr class="gridmenu-divider" />
  <label>{ta('lbl.siteIcon')}
    {#if siteDraft.site.icon}
      <img class="site-icon-preview" src={siteDraft.site.icon} alt={ta('lbl.siteIcon')} />
    {/if}
  </label>
  <span class="toolbar-row">
    <label class="ghost filepick tb-grow" title={ta('tip.site.icon')}>
      {siteDraft.site.icon ? ta('ui.changeIcon') : ta('ui.chooseIcon')}
      <input type="file" accept="image/*" onchange={uploadSiteIcon} />
    </label>
    {#if siteDraft.site.icon}
      <button class="ghost row-tool" title={ta('tip.site.editIcon')}
        onclick={() => (ed.iconEditorImage = siteDraft.site.icon)}>{@html ICONS.pencil ?? '✎'}</button>
      <button class="ghost row-tool" title={ta('tip.site.removeIcon')}
        onclick={removeSiteIcon}>{@html ICONS.cross}</button>
    {/if}
  </span>
</div>
