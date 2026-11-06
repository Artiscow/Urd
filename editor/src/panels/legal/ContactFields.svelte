<script>
  /* The contact details of the site (site.contact), the Legal panel's «Who you are» group: the country, the legal name, the numbers its country's profile asks for, the VAT status, the representative, the address with its point on the map, the phone, the email and the contact points by role. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import { ta, taApiError, adminLang } from '$engine/i18n.js';
  import { normaliseId, validateId, formatId } from '$engine/contact-model.js';
  import { COUNTRY_CODES, profileOf, countryForLanguage } from '$engine/contact-profiles.js';
  import { ICONS } from '../../lib/icons.js';
  const ed = getContext('urd-editor');
  const siteDraft = $derived(ed.siteDraft);
  const { siteMutate } = ed;

  /** The details the law asks for that are still empty (lib/legal-model.js whoMissing): each is marked at its field, so the count on the group's heading points somewhere. */
  let { missing = [] } = $props();
  const need = $derived(Object.fromEntries(['legalName', 'email', 'street', 'city'].map((key) => [key, missing.includes(key)])));

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
    contactMutate('legal', (contact) => {
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
    contactMutate(`edit:legal-contact-${key}`, (contact) => {
      if (clean) contact[key] = clean;
      else delete contact[key];
    });
  }

  /** The country: the numbers of the old country go with it, and a chosen country is kept even with nothing else filled. */
  function setContactCountry(code) {
    if (code === siteDraft.site.contact?.country) return;
    idState = {};
    siteMutate('legal', () => {
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
    contactMutate(`edit:legal-contact-${map}-${key}`, (contact) => {
      const next = { ...(contact[map] ?? {}) };
      if (value === '' || value === false || value === undefined) delete next[key];
      else next[key] = value;
      contact[map] = next;
    });
  }

  /** One line of the address; a point found on the map for the old address no longer marks the place, so it goes with the change. */
  function setContactAddress(key, value) {
    contactMutate(`edit:legal-contact-address-${key}`, (contact) => {
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
        contactMutate('edit:legal-contact-geo', (contact) => { contact.geo = { lat: round(data.lat), lon: round(data.lon) }; });
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
    contactMutate('edit:legal-contact-geo', (contact) => { delete contact.geo; });
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
    pointsMutate(`edit:legal-contact-point-${i}-${key}`, (points) => {
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
    contactMutate('legal', (contact) => {
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
</script>

{#snippet needDot(on)}
  {#if on}<span class="legal-need-dot" title={ta('tip.legal.needed')} aria-hidden="true"></span>{/if}
{/snippet}

  <label class="field-stack" title={ta('tip.site.country')}>{ta('lbl.country')}
    <Dropdown value={contactCountry} options={countryOptions} onchange={(v) => setContactCountry(v)} /></label>
  <label class="field-stack" title={ta('tip.site.legalName')}><span>{ta('lbl.legalName')}{@render needDot(need.legalName)}</span>
    <input value={siteDraft.site.contact?.legalName ?? ''} aria-required="true" class:legal-need={need.legalName}
      oninput={(e) => setContact('legalName', e.target.value)} /></label>
  {#snippet idField(def)}
    {#if def.status}
      <label title={ta('tip.site.idStatus')} class="gridmenu-snap">
        <input type="checkbox" checked={siteDraft.site.contact?.ids?.[def.key] === true}
          onchange={(e) => setContactMap('ids', def.key, e.target.checked)} />
        {def.label}
      </label>
    {:else}
      {#if def.ownLabel}
        <label title={ta('tip.site.ownLabel')} class="field-stack">{ta('lbl.ownLabel')}
          <input value={siteDraft.site.contact?.label ?? ''} oninput={(e) => setContact('label', e.target.value)} /></label>
      {/if}
      {@const state = idState[def.key] ?? 'ok'}
      <label title={ta('tip.site.idNumber')} class="field-stack">{def.ownLabel ? ta('lbl.idNumber') : def.label}
        <input value={formatId(def, siteDraft.site.contact?.ids?.[def.key] ?? '')} spellcheck="false" class:place-error={state === 'bad' || state === 'form'}
          aria-invalid={state === 'bad' || state === 'form'} aria-describedby={state === 'ok' ? undefined : `contact-note-${def.key}`}
          onchange={(e) => setContactId(def, e.target.value)} /></label>
      {#if state !== 'ok'}
        <p id={`contact-note-${def.key}`} class="panel-hint" class:place-error={state !== 'warn'}>{ta(state === 'form' ? 'site.formBad' : state === 'bad' ? 'site.checkBad' : 'site.checkWarn')}</p>
      {/if}
      <!-- What the number is written with, and the register it stands in, only once the number is there -->
      {#if siteDraft.site.contact?.ids?.[def.key]}
        {#if def.extra}
          <label title={ta('tip.site.idExtra')} class="field-stack">{ta(`lbl.extra.${def.extra}`)}
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
      <label title={ta('tip.site.idKind')} class="field-stack">{ta('lbl.idKind')}
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
      <label title={ta('tip.site.vatNumber')} class="field-stack">{contactProfile.vat.label ?? ta('lbl.vatNumber')}
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
  <label title={ta('tip.site.street')} class="field-stack"><span>{ta('lbl.street')}{@render needDot(need.street)}</span>
    <input value={siteDraft.site.contact?.address?.street ?? ''} autocomplete="off" aria-required="true" class:legal-need={need.street}
      oninput={(e) => setContactAddress('street', e.target.value.trim())} /></label>
  <div class="field-pair">
    <label title={ta('tip.site.postalCode')} class="field-stack">{ta('lbl.postalCode')}
      <input value={siteDraft.site.contact?.address?.postalCode ?? ''} autocomplete="off"
        oninput={(e) => setContactAddress('postalCode', e.target.value.trim())} /></label>
    <label title={ta('tip.site.city')} class="field-stack"><span>{ta('lbl.city')}{@render needDot(need.city)}</span>
      <input value={siteDraft.site.contact?.address?.city ?? ''} autocomplete="off" aria-required="true" class:legal-need={need.city}
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
  <label title={ta('tip.site.phone')} class="field-stack">{ta('lbl.phone')}
    <input type="tel" value={siteDraft.site.contact?.phone ?? ''} autocomplete="off"
      oninput={(e) => setContact('phone', e.target.value)} /></label>
  <label title={ta('tip.site.email')} class="field-stack"><span>{ta('lbl.email')}{@render needDot(need.email)}</span>
    <input type="email" value={siteDraft.site.contact?.email ?? ''} autocomplete="off" spellcheck="false" aria-required="true" class:legal-need={need.email}
      oninput={(e) => setContact('email', e.target.value)} /></label>
  <!-- The contact points by role (site.contact.points): the contact block's By role design and the JSON-LD's ContactPoint entries -->
  <p class="panel-strong" title={ta('tip.site.contactPoints')}>{ta('lbl.contactPoints')}</p>
  {#each contactPoints as point, i (i)}
    <div class="contact-point">
      <div class="contact-point-role">
        <label title={ta('tip.contact.role')} for={`contact-point-${i}`}>{ta('lbl.contactRole')}</label>
        <span class="nav-line">
          <input id={`contact-point-${i}`} value={point.role ?? ''} placeholder={ta('ph.contactRole')} autocomplete="off"
            oninput={(e) => setPointField(i, 'role', e.target.value)} />
          <span class="row-tools">
            <button class="ghost row-tool" title={ta('tip.removeContactPoint')}
              onclick={() => pointsMutate('legal', (points) => points.splice(i, 1))}>{@html ICONS.cross}</button>
          </span>
        </span>
      </div>
      <label title={ta('tip.contact.email')} class="field-stack">{ta('lbl.email')}
        <input type="email" value={point.email ?? ''} autocomplete="off" spellcheck="false"
          oninput={(e) => setPointField(i, 'email', e.target.value)} /></label>
      <label title={ta('tip.contact.phone')} class="field-stack">{ta('lbl.phone')}
        <input type="tel" value={point.phone ?? ''} autocomplete="off"
          oninput={(e) => setPointField(i, 'phone', e.target.value)} /></label>
      <label title={ta('tip.contact.note')} class="field-stack">{ta('lbl.contactNote')}
        <input value={point.note ?? ''} placeholder={ta('ph.contactNote')} autocomplete="off"
          oninput={(e) => setPointField(i, 'note', e.target.value)} /></label>
    </div>
  {/each}
  <button class="ghost action" onclick={() => pointsMutate('legal', (points) => points.push({}))}>{ta('ui.addContactPoint')}</button>
