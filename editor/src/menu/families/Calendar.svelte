<script module>
  /* The calendar block's Style area (calendar-designs.js): the design, its
     colour slots, the edge stripe and a style per event field. Every setting
     is additive, and an emptied object is removed from the props. The field
     picked for styling is kept across blocks and copies of the menu. */
  let calField = $state('title');
</script>

<script>
  /* The calendar block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import Setting from '../../lib/rows/Setting.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import SliderRow from '../../lib/rows/SliderRow.svelte';
  import NumberRow from '../../lib/rows/NumberRow.svelte';
  import ColourRow from '../../lib/rows/ColourRow.svelte';
  import ListEditor from '../../lib/rows/ListEditor.svelte';
  import PictureRow from '../../lib/rows/PictureRow.svelte';
  import LookChoice from '../../lib/rows/LookChoice.svelte';
  import { pictureList, calendarDesignSource } from '../../lib/design-sources.js';
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import Choice from '../../lib/Choice.svelte';
  import ColorPicker from '../../lib/ColorPicker.svelte';
  import MarkPicker from '../../lib/MarkPicker.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import { calDesign, calView, calOptionDefs, calOptions, calOptionShown, calStripe, calHasExcerpt, calDescription, calSwitcherViews, CAL_SWITCH_VIEWS, CAL_SWITCH_WEEKS, CAL_SWITCH_MONTHS, CAL_FIELDS, CAL_SIZE, calHasTextOverrides, calResetTexts, calPhoneView, calPhoneDesignDef, calCardDesign, calCardDesignDef } from '$engine/calendar-designs.js';
  import { iconSvg } from '$engine/icons.js';
  import { fontChoices } from '$engine/fonts.js';
  import { ta, adminLang as currentAdminLang } from '$engine/i18n.js';
  import { swatchCss } from '../../lib/swatch.js';
  import LinkField from '../../lib/LinkField.svelte';
  import { linkOf, setLinkOn } from '../../lib/link-edit.js';
  import { menu } from '../state.svelte.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps, siteCalendars, siteCalendarById, addSiteCalendar, themeSwatches } = ed;
  let { area } = $props();

  /** The heading over each group of designs in the picker: the view the group stands on. */
  const CAL_VIEW_KEYS = { list: 'calendar.viewList', cards: 'calendar.viewCards', month: 'calendar.viewMonth', agenda: 'calendar.viewAgenda', next: 'calendar.viewNext', week: 'calendar.viewWeek', day: 'calendar.viewDay', year: 'calendar.viewYear' };
  /** Writes one of the design's own settings under `options`; the default is stored as nothing. */
  function setCalOption(def, value) {
    const all = { ...(selectedBlock.props.options ?? {}) };
    if (value === def.def || value == null) delete all[def.key];
    else all[def.key] = value;
    setBlockProp('options', Object.keys(all).length ? all : undefined);
  }

  /** The words of a choice option's value: a month name for the year wheel, else the value's own key. */
  function calOptionLabel(def, value) {
    if (def.key === 'firstMonth' && value === 'now') return ta('calendar.opt.firstMonth.now');
    if (def.key === 'firstMonth') return new Intl.DateTimeFormat(currentAdminLang(), { month: 'long' }).format(new Date(2024, Number(value), 1));
    return ta(`${def.labelKey}.${value}`);
  }

  /** The design's colour slots by section, in order; the first section is the plain «Colours» list and gets no heading of its own. */
  function calSlotGroups(def) {
    const groups = [];
    for (const slot of def.slots) {
      const group = groups.find((g) => g.section === slot.section);
      if (group) group.slots.push(slot);
      else groups.push({ section: slot.section, slots: [slot] });
    }
    return groups;
  }
  function calFieldStyleOf() {
    return selectedBlock?.props.fieldStyle?.[calField] ?? {};
  }
  /** The announcement's own words as plain text, for the fields in its group; the preview stores them as HTML. */
  function calNoticeWords(key) {
    const html = selectedBlock.props.texts?.[key];
    if (typeof html !== 'string') return '';
    return new DOMParser().parseFromString(html.replace(/<br\s*\/?>/gi, '\n'), 'text/html').body.textContent.trim();
  }

  /** The announcement's words from its fields: plain text with its line breaks kept; an emptied field leaves the hint in the preview. */
  function setCalNoticeWords(key, value) {
    const words = value.trim();
    const texts = { ...(selectedBlock.props.texts ?? {}) };
    if (words) texts[key] = words.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
    else delete texts[key];
    setBlockProp('texts', Object.keys(texts).length ? texts : undefined);
  }


  function setCalColor(key, value) {
    const colors = { ...(selectedBlock.props.colors ?? {}) };
    if (value) colors[key] = value;
    else delete colors[key];
    setBlockProp('colors', Object.keys(colors).length ? colors : undefined);
  }
  function setCalStripe(patch) {
    const stripe = { ...(selectedBlock.props.stripe ?? {}), ...patch };
    for (const key of Object.keys(stripe)) if (stripe[key] === undefined) delete stripe[key];
    setBlockProp('stripe', Object.keys(stripe).length ? stripe : undefined);
  }
  function setCalField(patch) {
    const all = { ...(selectedBlock.props.fieldStyle ?? {}) };
    const one = { ...(all[calField] ?? {}), ...patch };
    for (const key of Object.keys(one)) if (one[key] === undefined) delete one[key];
    if (Object.keys(one).length) all[calField] = one;
    else delete all[calField];
    setBlockProp('fieldStyle', Object.keys(all).length ? all : undefined);
  }

  /* The calendar block (Content): one source per line. */
  /** A calendar source as the panel edits it: a reference to one of the site's calendars (`{ calendar: id }`, read-only here),
      a bare address that stays a string in the file, or an address with a name or a colour as an object (the engine's resolveSources reads all three). */
  const calSource = (src) => {
    if (src && typeof src === 'object' && 'calendar' in src) return { ref: String(src.calendar ?? ''), url: '', name: '', color: '' };
    if (src && typeof src === 'object') return { ref: '', url: src.url ?? '', name: src.name ?? '', color: src.color ?? '' };
    return { ref: '', url: typeof src === 'string' ? src : '', name: '', color: '' };
  };
  const packCalSource = ({ ref, url, name, color }) => (ref ? { calendar: ref } : name || color ? { url, ...(name ? { name } : {}), ...(color ? { color } : {}) } : url);
  /** The ids of the site's calendars this block shows. */
  const calRefs = () => new Set((selectedBlock.props.sources ?? []).map((src) => calSource(src).ref).filter(Boolean));
  function toggleCalendarRef(id, on) {
    // A snapshot: the entries go back into the page data and on to the preview, where a state proxy cannot be cloned.
    const rest = $state.snapshot(selectedBlock.props.sources ?? []).filter((src) => calSource(src).ref !== id);
    setBlockProp('sources', on ? [...rest, { calendar: id }] : rest);
  }
  /** An own address moved into the site's calendars: the registry gets the row's address, name and colour, and the row becomes a reference.
      Two history entries, the site's and the page's, since the registry and the block are kept apart. */
  function saveCalendarToSite(i) {
    const list = $state.snapshot(selectedBlock.props.sources ?? []);
    const { url, name, color } = calSource(list[i]);
    const id = addSiteCalendar({ url: url.trim(), ...(name ? { name } : {}), ...(color ? { color } : {}) });
    setBlockProp('sources', list.map((src, j) => (j === i ? { calendar: id } : src)));
  }
  function setCalendarSource(i, patch) {
    mutateBlock(`edit:${selectedBlock.blockId}:source${i}`, (b) => {
      const list = [...(b.props.sources ?? [])];
      list[i] = packCalSource({ ...calSource(list[i]), ...patch });
      b.props.sources = list;
    });
  }
  function addCalendarRow() {
    setBlockProp('sources', [...$state.snapshot(selectedBlock.props.sources ?? []), '']);
  }
  function removeCalendarSource(i) {
    setBlockProp('sources', $state.snapshot(selectedBlock.props.sources ?? []).filter((_, j) => j !== i));
  }
  /** Moves a calendar from one place to another, as the list editor's drag and keys do. */
  function moveCalendarSource(from, to) {
    const list = $state.snapshot(selectedBlock.props.sources ?? []);
    list.splice(to, 0, ...list.splice(from, 1));
    setBlockProp('sources', list);
  }

  /**
   * The calendar's groups in the element menu: what each shows while closed,
   * and its reset when it differs from the defaults (null when it does not).
   */
  function calMenu() {
    const p = selectedBlock.props;
    const def = calDesign(p.design);
    const reset = (name, patch) => () => setBlockProps(name, patch);
    // The counts a new calendar starts with: the design's own where it has one (Index cards: four), else eight in the agenda and six elsewhere, and three and three in a «Coming up» design.
    const view = calView(p);
    const limit0 = def.limit ?? (view === 'agenda' ? 8 : 6);
    const count0 = view === 'next' ? 3 : undefined;
    const viewChanged = p.switcher === true || p.switcherViews != null || p.toolsSize != null || p.description != null || p.showMore === false || (p.limit ?? 6) !== limit0 || p.nextCount !== count0 || p.laterCount !== count0 || p.showCancelled === false || p.structuredData === false || p.clock != null || p.weekStart != null;
    const on = [!def.ownFilter && p.showCategories === true, p.showSubscribe !== false, p.showSignup === true, p.showSearch === true, p.showEarlier === true, p.showRecurring === true].filter(Boolean).length;
    const buttonsChanged = on > 0 || p.showAdd === false || Boolean(p.programHref);
    const emptyChanged = Boolean(p.emptyText) || (p.emptyIcon != null && p.emptyIcon !== 'calendar');
    const optCount = calOptionDefs(p.design).filter((d) => p.options?.[d.key] != null).length;
    const colorCount = def.slots.filter((slot) => p.colors?.[slot.key]).length;
    const fieldCount = Object.keys(p.fieldStyle ?? {}).length;
    return {
      sources: String((p.sources ?? []).filter((src) => { const c = calSource(src); return c.ref ? Boolean(siteCalendarById(c.ref)) : c.url.trim(); }).length),
      view: ta(CAL_VIEW_KEYS[calView(p)]),
      viewReset: viewChanged ? reset('cal-view', { switcher: undefined, switcherViews: undefined, toolsSize: undefined, description: undefined, showMore: undefined, limit: limit0, nextCount: count0, laterCount: count0, showCancelled: undefined, structuredData: undefined, clock: undefined, weekStart: undefined }) : null,
      buttons: on ? ta('menu.onCount', { n: on }) : ta('common.off'),
      buttonsReset: buttonsChanged ? reset('cal-buttons', { showCategories: false, showSubscribe: false, showSignup: false, showSearch: undefined, showEarlier: undefined, showRecurring: undefined, showAdd: undefined, programHref: undefined }) : null,
      empty: p.emptyText || ta('menu.standard'),
      emptyReset: emptyChanged ? reset('cal-empty', { emptyText: undefined, emptyIcon: undefined }) : null,
      notice: p.notice?.show === true ? ta('common.on') : ta('common.off'),
      noticeReset: p.notice ? reset('cal-notice', { notice: undefined }) : null,
      opts: optCount ? ta('menu.changed', { n: optCount }) : ta('menu.standard'),
      optsReset: optCount ? reset('cal-opts', { options: undefined }) : null,
      colors: colorCount ? ta('menu.changedOf', { n: colorCount, m: def.slots.length }) : ta('menu.standard'),
      colorsReset: colorCount || p.stripe ? reset('cal-colors', { colors: undefined, stripe: undefined }) : null,
      fields: fieldCount ? ta('menu.changed', { n: fieldCount }) : ta('menu.standard'),
      fieldsReset: fieldCount ? reset('cal-fields', { fieldStyle: undefined }) : null,
    };
  }
</script>

{#if area === 'content'}
  <!-- The calendar's content as groups, each showing its value while closed and a reset when it differs from the defaults -->
  {@const cm = calMenu()}
  {#snippet calSources()}
  <!-- One row per calendar: one of the site's calendars (read-only here, edited in the Site panel), or an address of
       its own with a name and a colour. A named calendar is a category in the filter, whatever its events' titles say -->
  <ListEditor items={selectedBlock.props.sources ?? []} label={ta('calendar.sources')} key={(src, i) => i}
    onmove={moveCalendarSource} onremove={removeCalendarSource} onadd={addCalendarRow} addLabel={ta('ui.addCalendar')}>
    {#snippet row(src, i)}
      {@const cal = calSource(src)}
      {#if cal.ref}
        {@const reg = siteCalendarById(cal.ref)}
        <span class="toolbar-row">
          <span class="cal-ref-swatch" style:background={swatchCss(reg?.color)} aria-hidden="true"></span>
          <span class="tb-grow cal-ref-name" class:muted={!reg}>{reg ? (reg.name || reg.url) : ta('calendar.refMissing')}</span>
        </span>
      {:else}
        <div class="cal-source">
          <input value={cal.url} placeholder={ta('calendar.sourcesPh')} spellcheck="false"
            title={ta('calendar.sourceUrl')} aria-label={ta('calendar.sourceUrl')} onchange={(e) => setCalendarSource(i, { url: e.target.value.trim() })} />
          <span class="toolbar-row">
            <input class="tb-grow" value={cal.name} placeholder={ta('calendar.sourceName')} title={ta('tip.calendar.sourceName')} aria-label={ta('tip.calendar.sourceName')}
              onchange={(e) => setCalendarSource(i, { name: e.target.value.trim() })} />
            <ColorPicker value={cal.color || 'accent'} tokens={themeSwatches()} allowClear
              label={ta('tip.calendar.sourceColor')} onchange={(hex) => setCalendarSource(i, { color: hex ?? '' })} />
          </span>
          <button type="button" class="ghost action" title={ta('tip.calendar.saveToSite')} disabled={!cal.url.trim()}
            onclick={() => saveCalendarToSite(i)}>{ta('calendar.saveToSite')}</button>
        </div>
      {/if}
    {/snippet}
  </ListEditor>
  <!-- The site's calendars: the ticked ones are shown by this block -->
  <span class="mini-label" title={ta('tip.calendar.siteSources')}>{ta('calendar.siteSources')}</span>
  {#each siteCalendars() as reg (reg.id)}
    <SwitchRow label={reg.name || reg.url} title={`${ta('tip.calendar.useSource')}${reg.url ? `\n${reg.url}` : ''}`} checked={calRefs().has(reg.id)} onchange={(on) => toggleCalendarRef(reg.id, on)} />
  {/each}
  {#if !siteCalendars().length}
    <span class="gridmenu-value">{ta('calendar.siteSourcesNone')}</span>
  {/if}
  <button type="button" class="linkish" onclick={() => ed.openPanel('site', { calendars: true })}>{ta('calendar.editSiteCalendars')}</button>
  {/snippet}
  {#snippet calViewGroup()}
  <!-- A design with a view of its own (Style) fixes the view -->
  {#if !calDesign(selectedBlock.props.design).view}
    <label title={ta('tip.calendar.view')}>{ta('lbl.view')}
      <Dropdown value={selectedBlock.props.view ?? 'list'}
        options={[['list', ta('calendar.viewList')], ['cards', ta('calendar.viewCards')], ['month', ta('calendar.viewMonth')], ['agenda', ta('calendar.viewAgenda')], ['next', ta('calendar.viewNext')]]}
        onchange={(v) => setBlockProp('view', v)} /></label>
  {/if}
  <!-- The view switcher, for the views that list what is coming: the visitor can turn the block to the week or the month -->
  {#if CAL_SWITCH_VIEWS.includes(calView(selectedBlock.props))}
    <SwitchRow label={ta('calendar.switcher')} title={ta('tip.calendar.switcher')} checked={selectedBlock.props.switcher === true} onchange={(on) => setBlockProp('switcher', on || undefined)} />
    {#if selectedBlock.props.switcher === true}
      <!-- The designs behind the switcher's Week and Month buttons, directly under the switch they belong to -->
      {@const sw = calSwitcherViews(selectedBlock.props)}
      <div class="ctl-row" title={ta('tip.calendar.switchWeek')}>
        <span class="mini-label ctl-name">{ta('calendar.switchWeek')}</span>
        <Dropdown value={sw.week} options={CAL_SWITCH_WEEKS.map((id) => [id, ta(`calendar.design.${id}`)])}
          onchange={(v) => setBlockProp('switcherViews', { ...(selectedBlock.props.switcherViews ?? {}), week: v })} />
      </div>
      <div class="ctl-row" title={ta('tip.calendar.switchMonth')}>
        <span class="mini-label ctl-name">{ta('calendar.switchMonth')}</span>
        <Dropdown value={sw.month} options={CAL_SWITCH_MONTHS.map((id) => [id, id === 'month' ? ta('calendar.viewMonth') : ta(`calendar.design.${id}`)])}
          onchange={(v) => setBlockProp('switcherViews', { ...(selectedBlock.props.switcherViews ?? {}), month: v })} />
      </div>
    {/if}
    <Choice label={ta('calendar.toolsSize')} title={ta('tip.calendar.toolsSize')} value={['s', 'l'].includes(selectedBlock.props.toolsSize) ? selectedBlock.props.toolsSize : 'm'}
      options={[['s', ta('calendar.toolsSize.s')], ['m', ta('calendar.toolsSize.m')], ['l', ta('calendar.toolsSize.l')]]}
      onchange={(v) => setBlockProp('toolsSize', v === 'm' ? undefined : v)} />
  {/if}
  <!-- Where the description stands, on the designs with room for it in their rows -->
  {#if calHasExcerpt(selectedBlock.props)}
    <Choice label={ta('calendar.opt.description')} title={ta('tip.calendar.opt.description')} value={calDescription(selectedBlock.props)}
      options={[['rows', ta('calendar.descriptionRows')], ['card', ta('calendar.descriptionCard')]]}
      onchange={(v) => setBlockProp('description', v === 'rows' ? undefined : v)} />
  {/if}
  {#if ['list', 'cards', 'agenda'].includes(selectedBlock.props.view ?? 'list')}
    <Setting pin="limit">
      <NumberRow label={ta('lbl.maxCount')} title={ta('tip.collection.limit')} value={selectedBlock.props.limit ?? 6} min={1} max={50} onchange={(v) => setBlockProp('limit', v)} />
    </Setting>
    <!-- A list folds the events beyond the max count; the regular-event design folds its own dates -->
    {#if calView(selectedBlock.props) === 'list' && calDesign(selectedBlock.props.design).module !== 'more'}
      <SwitchRow label={ta('calendar.showMore')} title={ta('tip.calendar.showMore')} checked={selectedBlock.props.showMore !== false} onchange={(on) => setBlockProp('showMore', on ? undefined : false)} />
    {/if}
  {/if}
  <!-- Cancelled events, the clock (24 hours unless set to 12) and the week (the site language's unless set here) -->
  <SwitchRow label={ta('calendar.showCancelled')} title={ta('tip.calendar.showCancelled')} checked={selectedBlock.props.showCancelled !== false} onchange={(on) => setBlockProp('showCancelled', on ? undefined : false)} />
  <SwitchRow label={ta('calendar.structuredData')} title={ta('tip.calendar.structuredData')} checked={selectedBlock.props.structuredData !== false} onchange={(on) => setBlockProp('structuredData', on ? undefined : false)} />
  <Choice label={ta('calendar.clock')} title={ta('tip.calendar.clock')} value={selectedBlock.props.clock === '12' ? '12' : '24'}
    options={[['24', ta('calendar.clock.24')], ['12', ta('calendar.clock.12')]]}
    onchange={(v) => setBlockProp('clock', v === '12' ? '12' : undefined)} />
  {#if ['month', 'week', 'year', 'agenda'].includes(calView(selectedBlock.props)) || selectedBlock.props.design === 'bento' || selectedBlock.props.switcher === true}
    <Choice label={ta('calendar.weekStart')} title={ta('tip.calendar.weekStart')} value={['mon', 'sun'].includes(selectedBlock.props.weekStart) ? selectedBlock.props.weekStart : 'auto'}
      options={[['auto', ta('calendar.weekStart.auto')], ['mon', ta('calendar.weekStart.mon')], ['sun', ta('calendar.weekStart.sun')]]}
      onchange={(v) => setBlockProp('weekStart', v === 'auto' ? undefined : v)} />
  {/if}
  {#if selectedBlock.props.view === 'next'}
    <!-- The card: how many events in full, and how many more as lines under «Later» -->
    <Choice label={ta('calendar.nextCount')} title={ta('tip.calendar.nextCount')} value={String(Math.min(3, Math.max(1, Number(selectedBlock.props.nextCount) || 1)))}
      options={[['1', '1'], ['2', '2'], ['3', '3']]}
      onchange={(v) => setBlockProp('nextCount', Number(v))} />
    <SliderRow label={ta('calendar.laterCount')} title={ta('tip.calendar.laterCount')} value={selectedBlock.props.laterCount ?? 0} min={0} max={10} step={1}
      shown={String(selectedBlock.props.laterCount ?? 0)} oninput={(v) => setBlockProp('laterCount', v)} />
  {/if}
  {/snippet}
  {#snippet calButtons()}
  <!-- A design with calendar switches of its own has no chip row to switch -->
  {#if !calDesign(selectedBlock.props.design).ownFilter}
    <SwitchRow label={ta('calendar.showCategories')} title={ta('tip.calendar.showCategories')} checked={selectedBlock.props.showCategories === true} onchange={(on) => setBlockProp('showCategories', on)} />
  {/if}
  <!-- What a visitor finds events with: a search field, and the events that are over -->
  <SwitchRow label={ta('calendar.showSearch')} title={ta('tip.calendar.showSearch')} checked={selectedBlock.props.showSearch === true} onchange={(on) => setBlockProp('showSearch', on ? true : undefined)} />
  {#if !['month', 'week', 'day', 'year'].includes(calView(selectedBlock.props))}
    <SwitchRow label={ta('calendar.showEarlier')} title={ta('tip.calendar.showEarlier')} checked={selectedBlock.props.showEarlier === true} onchange={(on) => setBlockProp('showEarlier', on ? true : undefined)} />
  {/if}
  <Setting pin="subscribe">
    <SwitchRow label={ta('calendar.showSubscribe')} title={ta('tip.calendar.subscribe')} checked={selectedBlock.props.showSubscribe !== false} onchange={(on) => setBlockProp('showSubscribe', on)} />
  </Setting>
  <SwitchRow label={ta('calendar.showSignup')} title={ta('tip.calendar.signup')} checked={selectedBlock.props.showSignup === true} onchange={(on) => setBlockProp('showSignup', on)} />
  <SwitchRow label={ta('calendar.showAdd')} title={ta('tip.calendar.showAdd')} checked={selectedBlock.props.showAdd !== false} onchange={(on) => setBlockProp('showAdd', on ? undefined : false)} />
  <SwitchRow label={ta('calendar.showRecurring')} title={ta('tip.calendar.showRecurring')} checked={selectedBlock.props.showRecurring === true} onchange={(on) => setBlockProp('showRecurring', on ? true : undefined)} />
  {#if calDesign(selectedBlock.props.design).program}
    <label title={ta('tip.calendar.programHref')}>{ta('calendar.programHref')}
      <input value={selectedBlock.props.programHref ?? ''} placeholder="/program" spellcheck="false"
        onchange={(e) => setBlockProp('programHref', e.target.value.trim() || undefined)} /></label>
  {/if}
  {/snippet}
  {#snippet calEmpty()}
  <!-- The empty state: the owner's own words and icon; empty and unset give the defaults -->
  <label title={ta('tip.calendar.emptyText')}>{ta('calendar.emptyText')}
    <input value={selectedBlock.props.emptyText ?? ''} placeholder={ta('calendar.emptyPh')}
      onchange={(e) => setBlockProp('emptyText', e.target.value.trim() || undefined)} /></label>
  <label title={ta('tip.calendar.emptyIcon')}>{ta('calendar.emptyIcon')}
    <MarkPicker iconsOnly icon={selectedBlock.props.emptyIcon === 'none' ? '' : (selectedBlock.props.emptyIcon ?? 'calendar')}
      klass="lbtn-mark" label={ta('tip.calendar.emptyIcon')}
      onpick={(mark) => setBlockProp('emptyIcon', mark.icon || 'none')}>
      {#if selectedBlock.props.emptyIcon !== 'none'}{@html iconSvg(selectedBlock.props.emptyIcon ?? 'calendar') || iconSvg('calendar')}{/if}
    </MarkPicker></label>
  {/snippet}
  {#snippet calNotice()}
  <!-- The announcement note, on the designs that have one: a switch and the link it leads to -->
  {#if calDesign(selectedBlock.props.design).notice}
    <SwitchRow label={ta('calendar.showNotice')} title={ta('tip.calendar.showNotice')} checked={selectedBlock.props.notice?.show === true} onchange={(on) => setBlockProp('notice', { ...(selectedBlock.props.notice ?? {}), show: on })} />
    {#if selectedBlock.props.notice?.show === true}
      <!-- A design that can draw the announcement as an alert band offers the choice -->
      {#if calDesign(selectedBlock.props.design).noticeBand}
        <Choice label={ta('calendar.noticeAs')} title={ta('tip.calendar.noticeAs')} value={selectedBlock.props.notice?.as === 'band' ? 'band' : 'note'}
          options={[['note', ta('calendar.noticeAsNote')], ['band', ta('calendar.noticeAsBand')]]}
          onchange={(v) => setBlockProp('notice', { ...(selectedBlock.props.notice ?? {}), as: v === 'band' ? 'band' : undefined })} />
      {/if}
      <!-- The announcement's own words, also written by clicking them in the preview; the band shows the heading alone -->
      <label title={ta('tip.calendar.noticeHeading')}>{ta('calendar.noticeHeading')}
        <input value={calNoticeWords('noticeTitle')} placeholder={ta('calendar.noticeTitleHint')}
          onchange={(e) => setCalNoticeWords('noticeTitle', e.target.value)} /></label>
      {#if selectedBlock.props.notice?.as !== 'band' || !calDesign(selectedBlock.props.design).noticeBand}
        <label class="field-stack" title={ta('tip.calendar.noticeBody')}>{ta('calendar.noticeBody')}
          <textarea rows="3" value={calNoticeWords('noticeText')}
            onchange={(e) => setCalNoticeWords('noticeText', e.target.value)}></textarea></label>
      {/if}
      <LinkField label={ta('calendar.noticeHref')} title={ta('tip.calendar.noticeHref')} value={linkOf(selectedBlock.props.notice)}
        onchange={(link) => ed.mutateBlock(`link:${selectedBlock.blockId}:notice`, (b) => {
          b.props.notice = { ...(b.props.notice ?? {}) };
          setLinkOn(b.props.notice, link);
        })} />
    {/if}
  {/if}
  {/snippet}
  <Fold id="cal-sources" title={ta('calendar.sources')} value={cm.sources}>{@render calSources()}</Fold>
  <Fold id="cal-view" title={ta('calendar.group.view')} value={cm.view} reset={cm.viewReset}>{@render calViewGroup()}</Fold>
  <Fold id="cal-buttons" title={ta('calendar.group.buttons')} value={cm.buttons} reset={cm.buttonsReset}>{@render calButtons()}</Fold>
  <Fold id="cal-empty" title={ta('calendar.group.empty')} value={cm.empty} reset={cm.emptyReset}>{@render calEmpty()}</Fold>
  {#if calDesign(selectedBlock.props.design).notice}
    <Fold id="cal-notice" title={ta('calendar.group.notice')} value={cm.notice} reset={cm.noticeReset}>{@render calNotice()}</Fold>
  {/if}
  <!-- The design's words are rewritten by clicking them in the preview; this puts the defaults back and the removed lines too, keeping the announcement's own words -->
  {#if calHasTextOverrides(calDesign(selectedBlock.props.design), selectedBlock.props.texts)}
    <button type="button" class="ghost action" title={ta('tip.calendar.resetTexts')} onclick={() => setBlockProp('texts', calResetTexts(selectedBlock.props.texts))}>{ta('calendar.resetTexts')}</button>
  {/if}
{:else if area === 'style'}
  {@const calDef = calDesign(selectedBlock.props.design)}
  <!-- The design, first in Style as every block's design: a row naming it that opens the picker over the whole menu, or its pictures in place, as «Designs» asks -->
  <Setting pin="design">
    <LookChoice label={ta('calendar.design')} value={ta(calDef.labelKey)} title={ta('tip.calendar.design')} current={calDef.id}
      designs={() => pictureList(calendarDesignSource({}))} onpick={(id) => ed.setCalendarDesign(id)} onopen={ed.openDesignPicker} />
  </Setting>
  <!-- The phone design: what the calendar draws on a phone, the design's own default until the owner picks another -->
  <Setting pin="phoneView">
    <PictureRow label={ta('calendar.phoneView')} value={ta(calPhoneDesignDef(calPhoneView(selectedBlock.props), selectedBlock.props).labelKey)} title={ta('tip.calendar.phoneView')} onclick={ed.openPhonePicker} />
  </Setting>
  <!-- The card design: how the card that opens at a press looks, the design's own default until the owner picks another -->
  <Setting pin="card">
    <PictureRow label={ta('calendar.card')} value={ta(calCardDesignDef(calCardDesign(selectedBlock.props)).labelKey)} title={ta('tip.calendar.card')} onclick={ed.openCardPicker} />
  </Setting>
  {@const cm = calMenu()}
  {#snippet calOpts()}
  <!-- The design's own settings, directly under the design they belong to -->
  {#if calOptionDefs(selectedBlock.props.design).length}
    {@const calOpt = calOptions(selectedBlock.props)}
    {#each calOptionDefs(selectedBlock.props.design).filter((def) => calOptionShown(def, calOpt)) as def (def.key)}
      {#if def.kind === 'switch'}
        <SwitchRow label={ta(def.labelKey)} title={def.tipKey ? ta(def.tipKey) : undefined} checked={calOpt[def.key]} onchange={(on) => setCalOption(def, on)} />
      {:else if def.kind === 'hour'}
        <label title={ta('tip.calendar.opt.hours')}>{ta(def.labelKey)}
          <input type="number" min="0" max="24" value={calOpt[def.key] ?? ''} placeholder={ta('calendar.opt.columns.auto')}
            onchange={(e) => setCalOption(def, e.target.value === '' ? null : Math.max(0, Math.min(24, Math.round(Number(e.target.value)) || 0)))} /></label>
      {:else if def.values.length > 4}
        <div class="ctl-row">
          <span class="mini-label ctl-name">{ta(def.labelKey)}</span>
          <Dropdown value={calOpt[def.key]} options={def.values.map((v) => [v, calOptionLabel(def, v)])} onchange={(v) => setCalOption(def, v)} />
        </div>
      {:else}
        <Choice label={ta(def.labelKey)} title={def.tipKey ? ta(def.tipKey) : undefined} value={calOpt[def.key]} options={def.values.map((v) => [v, calOptionLabel(def, v)])} onchange={(v) => setCalOption(def, v)} />
      {/if}
    {/each}
  {/if}
  {/snippet}
  {#snippet calColours()}
  <!-- The design's colour slots: empty follows the theme -->
  {#each calSlotGroups(calDef) as group, gi (group.section)}
    {#if gi > 0}
      <span class="mini-label">{ta(`calendar.section.${group.section}`)}</span>
    {/if}
    <!-- The swatches in rows, each with its name under it -->
    <div class="cal-slots">
      {#each group.slots as slot (slot.key)}
        <div class="cal-slot" title={ta('tip.calendar.slot')}>
          <ColorPicker value={selectedBlock.props.colors?.[slot.key] ?? ''} tokens={themeSwatches()} allowClear
            label={ta(slot.labelKey)} onchange={(v) => setCalColor(slot.key, v || '')} />
          <span class="mini-label">{ta(slot.labelKey)}</span>
        </div>
      {/each}
    </div>
  {/each}
  {/snippet}
  {#snippet calStripeGroup()}
  <!-- The edge stripe on the boxes, with its colour directly under its switch -->
  <SwitchRow label={ta('calendar.stripe')} title={ta('tip.calendar.stripe')} checked={calStripe(calDef, selectedBlock.props.stripe).show} onchange={(on) => setCalStripe({ show: on })} />
  {#if calStripe(calDef, selectedBlock.props.stripe).show}
    <ColourRow label={ta('calendar.stripeColor')} title={ta('tip.calendar.stripeColor')} value={selectedBlock.props.stripe?.color ?? ''} tokens={themeSwatches()} allowClear
      onchange={(v) => setCalStripe({ color: v || undefined })} />
  {/if}
  {/snippet}
  {#snippet calFields()}
  <!-- A style per event field: pick the field, then its font, size, weight, italic, underline and colour -->
  <Dropdown value={calField} options={CAL_FIELDS.map((f) => [f, ta(`calendar.field.${f}`)])} onchange={(v) => (calField = v)} />
  <label title={ta('tip.calendar.fieldFont')}>{ta('calendar.fieldFont')}
    <Dropdown value={calFieldStyleOf().font ?? ''}
      options={fontChoices(ta, [['', ta('common.inherit')]])}
      onchange={(v) => setCalField({ font: v || undefined })} /></label>
  <label title={ta('tip.calendar.fieldSize')}>{ta('calendar.fieldSize')}
    <input type="number" min={CAL_SIZE.min} max={CAL_SIZE.max} value={calFieldStyleOf().size ?? ''} placeholder={ta('common.inherit')}
      onchange={(e) => setCalField({ size: e.target.value === '' ? undefined : Math.max(CAL_SIZE.min, Math.min(CAL_SIZE.max, Number(e.target.value) || CAL_SIZE.min)) })} /></label>
  <Choice label={ta('calendar.fieldWeight')} value={calFieldStyleOf().bold === true ? 'bold' : calFieldStyleOf().bold === false ? 'normal' : ''}
    options={[['', ta('common.inherit')], ['bold', ta('format.bold')], ['normal', ta('calendar.fieldNormal')]]}
    onchange={(v) => setCalField({ bold: v === 'bold' ? true : v === 'normal' ? false : undefined })} />
  <span class="toolbar-row">
    <button type="button" class="tbtn" title={ta('format.italic')} class:active={calFieldStyleOf().italic === true}
      onclick={() => setCalField({ italic: calFieldStyleOf().italic ? undefined : true })}><i>{ta('format.italicLetter')}</i></button>
    <button type="button" class="tbtn" title={ta('calendar.fieldUnderline')} class:active={calFieldStyleOf().underline === true}
      onclick={() => setCalField({ underline: calFieldStyleOf().underline ? undefined : true })}><u>{ta('format.underlineLetter')}</u></button>
    <ColorPicker value={calFieldStyleOf().color ?? ''} tokens={themeSwatches()} allowClear
      label={ta('calendar.fieldColor')} onchange={(v) => setCalField({ color: v || undefined })} />
  </span>
  {/snippet}
  {#if calOptionDefs(selectedBlock.props.design).some((def) => calOptionShown(def, calOptions(selectedBlock.props)))}
    <Fold id="cal-opts" title={ta('calendar.section.options')} value={cm.opts} reset={cm.optsReset}>{@render calOpts()}</Fold>
  {/if}
  <!-- The design's colours and the edge stripe on its boxes, one group of the calendar's colours -->
  <Fold id="cal-colors" title={ta('calendar.colors')} value={cm.colors} reset={cm.colorsReset}>{@render calColours()}{@render calStripeGroup()}</Fold>
  <Fold id="cal-fields" title={ta('calendar.fieldStyle')} value={cm.fields} reset={cm.fieldsReset}>{@render calFields()}</Fold>
{/if}

<style>
  .cal-source {
    display: grid;
    gap: 4px;
    min-width: 0;
  }
</style>
