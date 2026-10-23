<script>
  /* The Site panel: the site's name and description, its icon, the content width, the language, the meeting hosts, the calendars, the links, the contact details, the map service and the time zone. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import ColorPicker from '../lib/ColorPicker.svelte';
  import { WIDTH_MIN, WIDTH_MAX, WIDTH_STEP, GUTTER_MIN, GUTTER_MAX, GUTTER_STEP, WIDTH_PRESETS, GUTTER_PRESETS, REF_SCREENS, clampWidth, clampGutter, contentBand, presetOf } from '../lib/content-width.js';
  import Dropdown from '../lib/Dropdown.svelte';
  import { autogrow } from '../lib/autogrow.js';
  import { ta, taApiError, adminLang } from '$engine/i18n.js';
  import { zoneValid } from '$engine/calendar-format.js';
  import { MAP_SERVICES, mapService } from '$engine/map-links.js';
  import { meetingHostList } from '$engine/meeting-links.js';
  import { normaliseId, validateId, formatId } from '$engine/contact-model.js';
  import { COUNTRY_CODES, profileOf, countryForLanguage } from '$engine/contact-profiles.js';
  import { ICONS } from '../lib/icons.js';
  import { swatchCss } from '../lib/swatch.js';
  const ed = getContext('urd-editor');
  const bindsFrom = $derived(ed.bindsFrom);
  const layoutGutter = $derived(ed.layoutGutter);
  const layoutWidth = $derived(ed.layoutWidth);
  const site = $derived(ed.site);
  const siteDraft = $derived(ed.siteDraft);
  import LinkList from '../lib/LinkList.svelte';
  const { addSiteCalendar, setStatus, siteCalendars, siteLangOptions, siteLangValue, siteMutate, svgAutoTrim, themeSwatches, siteLinks, addSiteLink, removeSiteLink, moveSiteLink, setSiteLink } = ed;

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

  /** The site description (site.description): used by search engines and when sharing. One paragraph: a line break, typed or pasted, becomes a space. */
  function setSiteDescription(value) {
    const text = value.replace(/\s*\n\s*/g, ' ');
    siteMutate('edit:site-desc', () => { siteDraft.site.description = text; });
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

  /** The contact details' country: the stored one, else the site language's suggestion, else «Other». */
  const contactCountry = $derived(siteDraft.site.contact?.country ?? countryForLanguage(siteDraft.site.lang) ?? 'XX');

  const contactProfile = $derived(profileOf(contactCountry));

  /** The countries by their names in the admin language, and «Other» last. */
  const countryOptions = $derived.by(() => {
    let names = null;
    try { names = new Intl.DisplayNames([adminLang()], { type: 'region' }); } catch { /* no names: the codes stand */ }
    const named = COUNTRY_CODES.map((code) => [code, names?.of(code) ?? code]).sort((a, b) => a[1].localeCompare(b[1], adminLang()));
    return [...named, ['XX', ta('site.countryOther')]];
  });

  /** The profile's ids as rows: a plain id, or one choice among alternatives (the German registers, the UK charity registers). */
  const contactRows = $derived.by(() => {
    const rows = [];
    for (const def of contactProfile.ids) {
      if (!def.choice) { rows.push({ def }); continue; }
      if (rows.some((r) => r.choice === def.choice)) continue;
      rows.push({ choice: def.choice, members: contactProfile.ids.filter((d) => d.choice === def.choice) });
    }
    return rows;
  });

  /** The alternative picked in each choice before anything is typed in it. */
  let choicePicked = $state({});

  /** The alternative a choice shows: the one holding a number, else the one picked, else the first. */
  function chosen(row) {
    const ids = siteDraft.site.contact?.ids ?? {};
    return row.members.find((d) => ids[d.key]) ?? row.members.find((d) => d.key === choicePicked[row.choice]) ?? row.members[0];
  }

  /** Picks another alternative: the number, court and register of the others go. */
  function pickChoice(row, key) {
    choicePicked = { ...choicePicked, [row.choice]: key };
    const others = row.members.filter((d) => d.key !== key).map((d) => d.key);
    if (!others.some((k) => siteDraft.site.contact?.ids?.[k])) return;
    idState = {};
    contactMutate('site', (contact) => {
      for (const map of ['ids', 'extras', 'registers']) {
        if (!contact[map]) continue;
        const next = { ...contact[map] };
        for (const k of others) delete next[k];
        contact[map] = next;
      }
    });
  }

  /** The outcome of each number's check as typed: a failed check shows under the field, and a refused number is not stored. */
  let idState = $state({});

  /** Writes the contact details (site.contact) through fn; the country shown is stored with the first field, so a later language change never rereads the numbers under another country, and from then on the group keeps its country when the other fields are emptied. */
  function contactMutate(key, fn) {
    siteMutate(key, () => {
      const contact = { country: contactCountry, ...(siteDraft.site.contact ?? {}) };
      fn(contact);
      for (const k of ['ids', 'extras', 'registers', 'vat', 'address']) {
        if (contact[k] && !Object.keys(contact[k]).length) delete contact[k];
      }
      // A group that already stores its country keeps it; before the first field there is nothing to store.
      if (siteDraft.site.contact?.country || Object.keys(contact).some((k) => k !== 'country')) siteDraft.site.contact = contact;
      else delete siteDraft.site.contact;
    });
  }

  /** A text field of the contact details: an empty value removes the field. */
  function setContact(key, value) {
    const clean = value.trim();
    contactMutate(`edit:site-contact-${key}`, (contact) => {
      if (clean) contact[key] = clean;
      else delete contact[key];
    });
  }

  /** The country: the numbers of the old country go with it, and a chosen country is kept even with nothing else filled. */
  function setContactCountry(code) {
    if (code === siteDraft.site.contact?.country) return;
    idState = {};
    siteMutate('site', () => {
      const contact = { ...(siteDraft.site.contact ?? {}), country: code };
      for (const k of ['ids', 'extras', 'registers', 'label']) delete contact[k];
      if (contact.vat) {
        contact.vat = { ...contact.vat };
        delete contact.vat.number;
        if (!Object.keys(contact.vat).length) delete contact.vat;
      }
      siteDraft.site.contact = contact;
    });
  }

  /** One field of a map under the contact details (ids, extras, registers, address): an empty value removes the field. */
  function setContactMap(map, key, value) {
    contactMutate(`edit:site-contact-${map}-${key}`, (contact) => {
      const next = { ...(contact[map] ?? {}) };
      if (value === '' || value === false || value === undefined) delete next[key];
      else next[key] = value;
      contact[map] = next;
    });
  }

  /** One line of the address; a point found on the map for the old address no longer marks the place, so it goes with the change. */
  function setContactAddress(key, value) {
    contactMutate(`edit:site-contact-address-${key}`, (contact) => {
      const next = { ...(contact.address ?? {}) };
      if (value) next[key] = value;
      else delete next[key];
      contact.address = next;
      delete contact.geo;
    });
    geoStatus = null;
  }

  /** The address as the map lookup gets it: the street, then the postcode and the town. */
  const contactAddressText = $derived([siteDraft.site.contact?.address?.street, [siteDraft.site.contact?.address?.postalCode, siteDraft.site.contact?.address?.city].filter(Boolean).join(' ')].filter(Boolean).join(', '));
  let geoStatus = $state(null);
  let geoBusy = $state(false);

  /** Finds the address on the map through /api/geocode (the published site's function, which needs a signed-in session) and stores the point the contact block's map design shows. */
  async function findContactOnMap() {
    const query = contactAddressText;
    if (!query) return;
    geoBusy = true;
    geoStatus = { text: ta('props.place.searching'), err: false };
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
      const data = await res.json().catch(() => null);
      // An address changed while the lookup ran is not the one the point belongs to.
      if (query !== contactAddressText) {
        geoStatus = null;
        return;
      }
      if (res.ok && Number.isFinite(data?.lat) && Number.isFinite(data?.lon)) {
        const round = (n) => Math.round(n * 1e6) / 1e6;
        contactMutate('edit:site-contact-geo', (contact) => { contact.geo = { lat: round(data.lat), lon: round(data.lon) }; });
        geoStatus = null;
      } else {
        geoStatus = { text: taApiError(data) ?? ta('props.place.notFound'), err: true };
      }
    } catch {
      geoStatus = { text: ta('props.place.failed'), err: true };
    } finally {
      geoBusy = false;
    }
  }

  function clearContactGeo() {
    contactMutate('edit:site-contact-geo', (contact) => { delete contact.geo; });
  }

  /** The contact points by role, as stored. */
  const contactPoints = $derived(Array.isArray(siteDraft.site.contact?.points) ? siteDraft.site.contact.points : []);

  /** Writes the contact points through fn; an empty list removes the field. */
  function pointsMutate(key, fn) {
    contactMutate(key, (contact) => {
      const points = (Array.isArray(contact.points) ? contact.points : []).map((p) => ({ ...p }));
      fn(points);
      if (points.length) contact.points = points;
      else delete contact.points;
    });
  }

  /** One field of a contact point: an empty value removes the field. */
  function setPointField(i, key, value) {
    const clean = value.trim();
    pointsMutate(`edit:site-contact-point-${i}-${key}`, (points) => {
      if (!points[i]) return;
      if (clean) points[i][key] = clean;
      else delete points[i][key];
    });
  }

  /** A number: normalised and checked by its profile; refused when it fails a verified check, saved with a warning when the register publishes no rule. */
  function setContactId(def, value) {
    const clean = normaliseId(def, value);
    const state = validateId(def, clean);
    idState = { ...idState, [def.key]: clean ? state : 'ok' };
    if (state === 'bad' || state === 'form') return;
    setContactMap('ids', def.key, clean);
  }

  /** The VAT status and, for a country with a separate VAT number, the number. */
  function setContactVat(patch) {
    contactMutate('site', (contact) => {
      const next = { ...(contact.vat ?? {}), ...patch };
      if (next.registered !== true) delete next.registered;
      if (!next.number) delete next.number;
      contact.vat = next;
    });
  }

  function setContactVatNumber(value) {
    const def = contactProfile.vat;
    const clean = normaliseId(def, value);
    const state = validateId(def, clean);
    idState = { ...idState, vat: clean ? state : 'ok' };
    if (state === 'bad' || state === 'form') return;
    setContactVat({ number: clean });
  }

  /** The shop's currency (site.commerce.currency, ISO 4217): the code the payment layer charges in; empty means NOK. */
  function setSiteCurrency(value) {
    const code = value.trim().toUpperCase();
    ed.siteCurrencyBad = code !== '' && !/^[A-Z]{3}$/.test(code);
    if (ed.siteCurrencyBad) return;
    siteMutate('site', () => {
      if (code) siteDraft.site.commerce = { ...(siteDraft.site.commerce ?? {}), currency: code };
      else delete siteDraft.site.commerce;
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
  <label class="field-stack" title={ta('tip.site.name')}>{ta('lbl.name')}
    <input value={siteDraft.site.title ?? ''} placeholder={ta('ph.site.name')}
      oninput={(e) => setSiteName(e.target.value)} />
  </label>
  <label class="field-stack" title={ta('tip.site.description')}>{ta('lbl.description')}
    <!-- One paragraph that wraps and grows downwards as it is typed -->
    <textarea class="field-grow" rows="1" value={siteDraft.site.description ?? ''} placeholder={ta('ph.site.description')} use:autogrow={siteDraft.site.description}
      onkeydown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
      oninput={(e) => setSiteDescription(e.target.value)}></textarea>
  </label>
  <label class="field-stack" title={ta('site.langTitle')}>{ta('site.langLabel')}
    <Dropdown value={siteLangValue()} options={siteLangOptions()}
      onchange={(v) => setSiteLang(v)} /></label>
  <!-- The site's time zone: the clock the calendar's times are shown on, for every visitor -->
  <label class="field-stack" title={ta('tip.settings.timeZone')}>{ta('settings.timeZone')}
    <input value={siteDraft.site.timeZone ?? ''} placeholder="Europe/Oslo" spellcheck="false" class:place-error={ed.siteZoneBad}
      onchange={(e) => setSiteTimeZone(e.target.value)} /></label>
  {#if ed.siteZoneBad}
    <p class="panel-hint place-error">{ta('settings.timeZoneBad')}</p>
  {/if}
  <!-- The map service a place links to: each choice says who makes it, where they are from and what it does with a search -->
  <label class="field-stack" title={ta('tip.settings.mapService')}>{ta('settings.mapService')}
    <Dropdown value={mapService(siteDraft)} options={MAP_SERVICES.map((id) => [id, ta(`mapService.${id}`), ta(`mapService.${id}.note`)])}
      onchange={(v) => setSiteMapService(v)} /></label>
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
                        <button class="ghost row-tool" title={ta('tip.moveUp')} onclick={() => moveSiteCalendar(ci, -1)} disabled={ci === 0}>{@html ICONS.up}</button>
                        <button class="ghost row-tool" title={ta('tip.moveDown')} onclick={() => moveSiteCalendar(ci, 1)} disabled={ci === siteCalendars().length - 1}>{@html ICONS.down}</button>
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
      <!-- The site's own video meeting servers: a link to one of them in a calendar event is a meeting link -->
      <label class="field-stack" title={ta('tip.settings.meetingHosts')}>{ta('settings.meetingHosts')}
        <input value={(siteDraft.site.meetingHosts ?? []).join(', ')} placeholder="meet.example.org" spellcheck="false"
          onchange={(e) => setSiteMeetingHosts(e.target.value)} /></label>
    </div>
  </details>

  <!-- The site's links (site.links): the owner's addresses with an icon, drawn by the footer, the menu's tools and the share block -->
  <details class="group" bind:open={() => ed.siteLinksOpen, (v) => (ed.siteLinksOpen = v)}>
    <summary title={ta('tip.site.links')}>{ta('group.siteLinks')}</summary>
    <div class="group-items">
      <LinkList scope="site" links={siteLinks()}
        onchange={(i, patch) => setSiteLink(i, patch)} onadd={() => addSiteLink()}
        onremove={(i) => removeSiteLink(i)} onmove={(i, dir) => moveSiteLink(i, dir)} />
    </div>
  </details>
  <!-- The association's legal and contact details (site.contact): typed once, drawn by the footer and written into the JSON-LD. The country's profile says which numbers there are -->
  <details class="group" bind:open={() => ed.siteContactOpen, (v) => (ed.siteContactOpen = v)}>
    <summary title={ta('tip.site.contact')}>{ta('group.siteContact')}</summary>
    <div class="group-items">
      <label class="field-stack" title={ta('tip.site.country')}>{ta('lbl.country')}
        <Dropdown value={contactCountry} options={countryOptions} onchange={(v) => setContactCountry(v)} /></label>
      <label class="field-stack" title={ta('tip.site.legalName')}>{ta('lbl.legalName')}
        <input value={siteDraft.site.contact?.legalName ?? ''}
          oninput={(e) => setContact('legalName', e.target.value)} /></label>
      {#snippet idField(def)}
        {#if def.status}
          <label class="gridmenu-snap">
            <input type="checkbox" checked={siteDraft.site.contact?.ids?.[def.key] === true}
              onchange={(e) => setContactMap('ids', def.key, e.target.checked)} />
            {def.label}
          </label>
        {:else}
          {#if def.ownLabel}
            <label class="field-stack">{ta('lbl.ownLabel')}
              <input value={siteDraft.site.contact?.label ?? ''} oninput={(e) => setContact('label', e.target.value)} /></label>
          {/if}
          {@const state = idState[def.key] ?? 'ok'}
          <label class="field-stack">{def.ownLabel ? ta('lbl.idNumber') : def.label}
            <input value={formatId(def, siteDraft.site.contact?.ids?.[def.key] ?? '')} spellcheck="false" class:place-error={state === 'bad' || state === 'form'}
              aria-invalid={state === 'bad' || state === 'form'} aria-describedby={state === 'ok' ? undefined : `contact-note-${def.key}`}
              onchange={(e) => setContactId(def, e.target.value)} /></label>
          {#if state !== 'ok'}
            <p id={`contact-note-${def.key}`} class="panel-hint" class:place-error={state !== 'warn'}>{ta(state === 'form' ? 'site.formBad' : state === 'bad' ? 'site.checkBad' : 'site.checkWarn')}</p>
          {/if}
          <!-- What the number is written with, and the register it stands in, only once the number is there -->
          {#if siteDraft.site.contact?.ids?.[def.key]}
            {#if def.extra}
              <label class="field-stack">{ta(`lbl.extra.${def.extra}`)}
                <input value={siteDraft.site.contact?.extras?.[def.key] ?? ''}
                  oninput={(e) => setContactMap('extras', def.key, e.target.value.trim())} /></label>
            {/if}
            {#if def.registers}
              <label class="field-stack" title={ta('tip.site.register')}>{ta('lbl.register')}
                <Dropdown value={siteDraft.site.contact?.registers?.[def.key] ?? ''} options={[['', ta('site.registerNone')], ...def.registers.map((r) => [r, r])]}
                  onchange={(v) => setContactMap('registers', def.key, v)} /></label>
            {/if}
          {/if}
        {/if}
      {/snippet}
      {#each contactRows as row (row.choice ?? row.def.key)}
        {#if row.choice}
          {@const def = chosen(row)}
          <!-- Alternatives an organisation holds one of: the kind is picked, and only its field shows -->
          <label class="field-stack">{ta('lbl.idKind')}
            <Dropdown value={def.key} options={row.members.map((d) => [d.key, d.label])} onchange={(v) => pickChoice(row, v)} /></label>
          {@render idField(def)}
        {:else}
          {@render idField(row.def)}
        {/if}
      {/each}
      {#if contactProfile.vat.kind !== 'none'}
        <label class="gridmenu-snap" title={ta('tip.site.vat')}>
          <input type="checkbox" checked={siteDraft.site.contact?.vat?.registered === true}
            onchange={(e) => setContactVat({ registered: e.target.checked })} />
          {contactProfile.vat.kind === 'status' ? contactProfile.vat.label : ta('lbl.vatRegistered')}
        </label>
        {#if contactProfile.vat.kind === 'separate' && siteDraft.site.contact?.vat?.registered}
          {@const vatState = idState.vat ?? 'ok'}
          <label class="field-stack">{contactProfile.vat.label ?? ta('lbl.vatNumber')}
            <input value={siteDraft.site.contact?.vat?.number ?? ''} spellcheck="false" class:place-error={vatState === 'bad' || vatState === 'form'}
              aria-invalid={vatState === 'bad' || vatState === 'form'} aria-describedby={vatState === 'ok' ? undefined : 'contact-note-vat'}
              onchange={(e) => setContactVatNumber(e.target.value)} /></label>
          {#if vatState !== 'ok'}
            <p id="contact-note-vat" class="panel-hint" class:place-error={vatState !== 'warn'}>{ta(vatState === 'form' ? 'site.formBad' : vatState === 'bad' ? 'site.checkBad' : 'site.checkWarn')}</p>
          {/if}
        {/if}
      {/if}
      <label class="field-stack" title={ta('tip.site.representative')}>{ta('lbl.representative')}
        <input value={siteDraft.site.contact?.representative ?? ''}
          oninput={(e) => setContact('representative', e.target.value)} /></label>
      <label class="field-stack">{ta('lbl.street')}
        <input value={siteDraft.site.contact?.address?.street ?? ''} autocomplete="off"
          oninput={(e) => setContactAddress('street', e.target.value.trim())} /></label>
      <div class="field-pair">
        <label class="field-stack">{ta('lbl.postalCode')}
          <input value={siteDraft.site.contact?.address?.postalCode ?? ''} autocomplete="off"
            oninput={(e) => setContactAddress('postalCode', e.target.value.trim())} /></label>
        <label class="field-stack">{ta('lbl.city')}
          <input value={siteDraft.site.contact?.address?.city ?? ''} autocomplete="off"
            oninput={(e) => setContactAddress('city', e.target.value.trim())} /></label>
      </div>
      {#if contactAddressText}
        <!-- The address's point on the map, which the contact block's map design shows -->
        {#if siteDraft.site.contact?.geo}
          <div class="pin-line">
            <span class="mini-label">{ta('site.onMap', { lat: siteDraft.site.contact.geo.lat, lon: siteDraft.site.contact.geo.lon })}</span>
            <button class="ghost row-tool" title={ta('tip.clearGeo')} onclick={clearContactGeo}>{@html ICONS.cross}</button>
          </div>
        {:else}
          <button class="ghost action" title={ta('tip.site.findOnMap')} disabled={geoBusy} onclick={findContactOnMap}>{ta('ui.findOnMap')}</button>
        {/if}
        {#if geoStatus}
          <p class="panel-hint" class:place-error={geoStatus.err} role="status">{geoStatus.text}</p>
        {/if}
      {/if}
      <label class="field-stack">{ta('lbl.phone')}
        <input type="tel" value={siteDraft.site.contact?.phone ?? ''} autocomplete="off"
          oninput={(e) => setContact('phone', e.target.value)} /></label>
      <label class="field-stack">{ta('lbl.email')}
        <input type="email" value={siteDraft.site.contact?.email ?? ''} autocomplete="off" spellcheck="false"
          oninput={(e) => setContact('email', e.target.value)} /></label>
      <!-- The contact points by role (site.contact.points): the contact block's By role design and the JSON-LD's ContactPoint entries -->
      <p class="panel-strong" title={ta('tip.site.contactPoints')}>{ta('lbl.contactPoints')}</p>
      {#each contactPoints as point, i (i)}
        <div class="contact-point">
          <div class="contact-point-role">
            <label for={`contact-point-${i}`}>{ta('lbl.contactRole')}</label>
            <span class="nav-line">
              <input id={`contact-point-${i}`} value={point.role ?? ''} placeholder={ta('ph.contactRole')} autocomplete="off"
                oninput={(e) => setPointField(i, 'role', e.target.value)} />
              <span class="row-tools">
                <button class="ghost row-tool" title={ta('tip.removeContactPoint')}
                  onclick={() => pointsMutate('site', (points) => points.splice(i, 1))}>{@html ICONS.cross}</button>
              </span>
            </span>
          </div>
          <label class="field-stack">{ta('lbl.email')}
            <input type="email" value={point.email ?? ''} autocomplete="off" spellcheck="false"
              oninput={(e) => setPointField(i, 'email', e.target.value)} /></label>
          <label class="field-stack">{ta('lbl.phone')}
            <input type="tel" value={point.phone ?? ''} autocomplete="off"
              oninput={(e) => setPointField(i, 'phone', e.target.value)} /></label>
          <label class="field-stack">{ta('lbl.contactNote')}
            <input value={point.note ?? ''} placeholder={ta('ph.contactNote')} autocomplete="off"
              oninput={(e) => setPointField(i, 'note', e.target.value)} /></label>
        </div>
      {/each}
      <button class="ghost action" onclick={() => pointsMutate('site', (points) => points.push({}))}>{ta('ui.addContactPoint')}</button>
    </div>
  </details>
  <!-- The shop's settings for the whole site -->
  <details class="group">
    <summary title={ta('tip.site.shop')}>{ta('group.siteShop')}</summary>
    <div class="group-items">
      <!-- The shop's currency: the ISO code the payment layer charges in, and the word the checkout shows with a provider on -->
      <label class="field-stack" title={ta('tip.settings.currency')}>{ta('settings.currency')}
        <input value={siteDraft.site.commerce?.currency ?? ''} placeholder="NOK" maxlength="3" spellcheck="false" class:place-error={ed.siteCurrencyBad}
          onchange={(e) => setSiteCurrency(e.target.value)} /></label>
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
