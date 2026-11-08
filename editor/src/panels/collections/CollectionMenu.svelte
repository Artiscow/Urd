<script>
  /* A collection's one menu, the ⋮ in its head: rename it, give it another kind where there is one to choose (kindChoices in lib/collection-bulk.js: never for products, else only the kinds its entries fit), and select every entry shown (Ctrl+A).
     Then what acts on the selected entries, greyed while none is selected: set a field on all of them (the fields with what the entries hold now, then one field's value, with the badges the collection already uses to press), move or copy them to another collection (the ones they fit, the others greyed with their reason, or a new one), and export them as CSV.
     Then the collection's CSV out and in, and the removal of the selected entries and of the whole collection, both in red.
     The menu is a card under the ⋮, opened by a press or a mouse's rest on it and closed a moment after the mouse leaves it (unless the focus has gone into it, a name typed), standing to whichever side of the ⋮ the window has room for; the new name takes the card's place, and an item with a submenu (the kind, the fields, the collections to move or copy to) opens it beside the card when the mouse rests on it, or on a press, Enter or the right arrow; a field in the list of fields opens its value beside the list the same way.
     A submenu stays while the pointer crosses to it or a field in it has the focus, and Escape or the left arrow steps back a level; it stands in the top layer, so the panel's scroll never clips it (ADR-0011): a popover placed by CSS anchoring where the browser has it, else measured and placed fixed (anchored.js).
     Every change is one undo step, offered again as «Undo» in the status line (state/collections.svelte.js). */
  import { menuMotion } from '../../lib/motion.svelte.js';
  import { getContext, tick } from 'svelte';
  import { ta, adminLang } from '$engine/i18n.js';
  import { nativeAnchoring, anchorName } from '$engine/anchored.js';
  import { currencyWord } from '$engine/shop.js';
  import { ICONS } from '../../lib/icons.js';
  import IconButton from '../../lib/rows/IconButton.svelte';
  import { dismiss } from '../../lib/dismiss.js';
  import DatePicker from '../../lib/DatePicker.svelte';
  import { kindChoices, entriesFit, settableFields, fieldSummary, valuesInUse } from '../../lib/collection-bulk.js';
  import { collectionActions } from './actions.js';

  const ed = getContext('urd-editor');
  /** ticks: the selected entries; shownIds: the entries the search shows, which «Select all» takes; onticks: sets the selection. */
  let { id, ticks = [], shownIds = [], onticks = null } = $props();
  const act = collectionActions(ed);

  const native = nativeAnchoring();
  /** The anchor each submenu's item gives the submenu, unique to this menu. */
  const anchors = { kind: anchorName('urd-cm'), field: anchorName('urd-cm'), move: anchorName('urd-cm'), copy: anchorName('urd-cm') };
  /** The submenu's width, which the measuring branch places by. */
  const SUB_W = 272;

  let open = $state(false);
  /** The card's side of the ⋮: its right edge under the ⋮'s, or its left edge where there is no room for that (a ⋮ near the panel's left edge). */
  let fromLeft = $state(false);
  let wrapEl = $state(null);
  let page = $state('main');
  let sub = $state(null);
  let name = $state('');
  let opener = $state(null);
  let card = $state(null);
  let subEl = $state(null);
  let subPos = $state({ top: 0, left: 0 });
  let fileEl = $state(null);
  let field = $state(null);
  let value = $state('');
  let newName = $state('');
  const items = {};
  let closeTimer = null;

  const view = $derived(ed.collectionsView[id]);
  const kinds = $derived(kindChoices(view));
  const kindLabel = (kind) => ta(`collectionKind.${kind}`);
  const some = $derived(ticks.length > 0);
  const fields = $derived(settableFields(view?.kind));
  /** The field whose value is being set; none while the submenu lists the fields. */
  const chosenField = $derived(fields.find((f) => f.field === field) ?? null);
  const selected = $derived(view ? view.entries.filter((e) => ticks.includes(e.id)) : []);
  const others = $derived(ed.collectionIds.filter((c) => c !== id).map((c) => {
    const v = ed.collectionsView[c];
    return { id: c, name: v?.name ?? c, kind: v?.kind, ...entriesFit(selected, v?.kind) };
  }));
  /** A count in words, the one-entry form where the dictionary has it. */
  const counted = (key, n, params = {}) => ta(n === 1 ? `${key}.one` : key, { ...params, n: String(n) });
  /** The shop's currency word beside a price. */
  const unit = $derived(currencyWord(ed.siteDraft?.site?.commerce?.currency));
  /** The badges the collection already uses, to press into the value. */
  const inUse = $derived(chosenField?.field === 'badge' ? valuesInUse(view?.entries, 'badge') : []);
  const lower = (f) => ta(f.labelKey).toLocaleLowerCase(adminLang());

  /** A field's value as the menu writes it: a price with the currency word, a date in the admin's language. */
  function shown(f, v) {
    if (f.input === 'number') return `${new Intl.NumberFormat(adminLang()).format(v)} ${unit}`.trim();
    if (f.input === 'date') {
      try { return new Intl.DateTimeFormat(adminLang(), { dateStyle: 'medium' }).format(new Date(`${v}T00:00:00`)); } catch { return String(v); }
    }
    return String(v);
  }

  /** What the selected entries hold in a field, in words (fieldSummary in lib/collection-bulk.js). */
  function summaryText(f) {
    const sum = fieldSummary(selected, f.field);
    if (sum.state === 'none') return ta('collections.noneSet');
    if (sum.state === 'same') return shown(f, sum.values[0]);
    if (sum.state === 'some') return ta('collections.valueOnSome', { value: shown(f, sum.values[0]), set: sum.set, unset: sum.unset });
    return sum.values.length <= 3
      ? new Intl.ListFormat(adminLang(), { type: 'conjunction' }).format(sum.values.map((v) => shown(f, v)))
      : ta('collections.differentValues', { n: sum.values.length });
  }

  /** The anchor each field's row gives its value card, unique to this menu. */
  const fieldAnchors = { badge: anchorName('urd-cm'), price: anchorName('urd-cm'), memberPrice: anchorName('urd-cm'), date: anchorName('urd-cm') };
  const fieldRows = {};
  let fieldEl = $state(null);
  let fieldPos = $state({ top: 0, left: 0 });
  let fieldTimer = null;

  /** A field's value card opened beside the list of fields, or the open one closed; the value starts empty. */
  function setField3(next) {
    if (next === field) return;
    if (!next && native && fieldEl?.matches(':popover-open')) fieldEl.hidePopover();
    field = next;
    value = '';
    if (next) tick().then(placeField);
  }

  /** The value card shown: by the browser against its row, or measured flush against the list, as the list stands against the menu. */
  function placeField() {
    if (!fieldEl || !field) return;
    if (native) {
      if (!fieldEl.matches(':popover-open')) fieldEl.showPopover();
      return;
    }
    const row = fieldRows[field]?.getBoundingClientRect();
    const box = subEl?.getBoundingClientRect();
    if (!row || !box) return;
    const h = fieldEl.offsetHeight;
    const right = box.right - 1 + SUB_W <= window.innerWidth - 8;
    fieldPos = {
      top: Math.max(8, Math.min(row.top - 7, window.innerHeight - h - 8)),
      left: right ? box.right - 1 : Math.max(8, box.left - SUB_W + 1),
    };
  }

  function cancelFieldClose() {
    clearTimeout(fieldTimer);
    fieldTimer = null;
  }

  /** The pointer leaving a field's row or its value card: the card closes after a moment, unless the pointer comes back or its field has the focus. */
  function leaveFieldSoon(event) {
    if (event?.pointerType && event.pointerType !== 'mouse') return;
    cancelFieldClose();
    fieldTimer = setTimeout(() => {
      if (!fieldEl?.contains(document.activeElement)) setField3(null);
    }, 280);
  }

  /** The mouse resting on a field's row opens its value card. */
  function hoverField(event, name) {
    if (event.pointerType !== 'mouse') return;
    cancelFieldClose();
    setField3(name);
  }

  /** A press, Enter or the right arrow on a field's row opens its value card with the focus in its field. */
  function pickField(name) {
    cancelFieldClose();
    setField3(name);
    tick().then(() => fieldEl?.querySelector('input, .dp button, button.cm-chip')?.focus());
  }

  function fieldRowKey(event, name) {
    if (event.key !== 'ArrowRight') return;
    event.preventDefault();
    pickField(name);
  }

  /** Escape, or the left arrow outside a field, steps back from the value card to its row. */
  function fieldKey(event) {
    const inField = event.target instanceof HTMLInputElement;
    if (event.key !== 'Escape' && !(event.key === 'ArrowLeft' && !inField)) return;
    event.preventDefault();
    event.stopPropagation();
    const back = fieldRows[field];
    setField3(null);
    back?.focus();
  }

  $effect(() => {
    const el = fieldEl;
    if (!el) return;
    el.addEventListener('keydown', fieldKey);
    return () => el.removeEventListener('keydown', fieldKey);
  });

  // The measuring branch places the flyouts again as the panel scrolls, so they stay against the card.
  $effect(() => {
    if (native || !sub) return;
    const onScroll = () => { placeSub(); placeField(); };
    document.addEventListener('scroll', onScroll, true);
    return () => document.removeEventListener('scroll', onScroll, true);
  });

  /** The tooltip of an item that needs a selection: its own while entries are selected, else the way to select them. */
  const needs = (key) => ta(some ? key : 'tip.collections.deleteSelectedNone');
  /** What the selection's submenus need: entries selected; the kind needs none. */
  const enabled = (which) => which === 'kind' || some;

  const BACK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
  const CHECK = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>';
  const NEXT = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  const PLUS = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';

  function close() {
    cancelClose();
    clearTimeout(restTimer);
    setSub(null);
    open = false;
    page = 'main';
  }

  /** The card opened on the side of the ⋮ it has room on, inside the panel that would clip it, else the window. */
  function openCard() {
    const r = opener?.getBoundingClientRect();
    const width = Math.min(17 * 16, window.innerWidth * 0.8);
    const edge = opener?.closest('aside.panel')?.getBoundingClientRect().left ?? 0;
    fromLeft = Boolean(r) && r.right - width < edge + 8;
    open = true;
  }

  /** Whether a rest opened the card: the press that often follows keeps it open. */
  let restOpened = false;

  /** A mouse's rest on the ⋮ opens the card after a moment, and the mouse leaving the ⋮ and its card closes it a moment later, as the tabs' menus do; a card the focus has gone into stays until a press outside or Escape. */
  let restTimer = 0;
  function rest(on, event) {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(restTimer);
    restTimer = setTimeout(() => {
      if (on && !open) {
        restOpened = true;
        openCard();
      }
      else if (!on && open && !wrapEl?.contains(document.activeElement)) close();
    }, on ? 180 : 280);
  }
  $effect(() => () => clearTimeout(restTimer));

  /** The new name in the card's place, its field taking the focus. */
  function go(next) {
    setSub(null);
    page = next;
    if (next === 'rename') name = view?.name ?? id;
    tick().then(() => card?.querySelector('input, button:not([disabled]):not(.cm-back)')?.focus());
  }

  /** A submenu opened beside its item, or the open one closed; a field's form and a new collection's name start empty. */
  function setSub(next) {
    if (next === sub) return;
    if (!next && native && subEl?.matches(':popover-open')) subEl.hidePopover();
    sub = next;
    cancelFieldClose();
    field = null;
    value = '';
    if (next === 'move' || next === 'copy') newName = '';
    if (next) tick().then(placeSub);
  }

  /** The submenu shown: by the browser against its item, or measured beside the card, turned to the card's other side where the window has no room. */
  function placeSub() {
    if (!subEl || !sub) return;
    if (native) {
      if (!subEl.matches(':popover-open')) subEl.showPopover();
      return;
    }
    const item = items[sub]?.getBoundingClientRect();
    const box = card?.getBoundingClientRect();
    if (!item || !box) return;
    const h = subEl.offsetHeight;
    // Flush against the card, the two borders on one line, and the submenu's first row level with its item.
    const right = box.right - 1 + SUB_W <= window.innerWidth - 8;
    subPos = {
      top: Math.max(8, Math.min(item.top - 7, window.innerHeight - h - 8)),
      left: right ? box.right - 1 : Math.max(8, box.left - SUB_W + 1),
    };
  }

  function cancelClose() {
    clearTimeout(closeTimer);
    closeTimer = null;
  }

  /** The pointer leaving an item or its submenu: the submenu closes after a moment, unless the pointer comes back or a field in it has the focus. */
  function leaveSoon(event) {
    if (event?.pointerType && event.pointerType !== 'mouse') return;
    cancelClose();
    closeTimer = setTimeout(() => {
      if (!subEl?.contains(document.activeElement)) setSub(null);
    }, 280);
  }

  /** The mouse resting on an item opens its submenu; a tap on a touch screen goes through the press instead. */
  function hoverItem(event, which) {
    if (event.pointerType !== 'mouse' || !enabled(which)) return;
    cancelClose();
    setSub(which);
  }

  /** A press, Enter or the right arrow on an item opens its submenu with the focus in it. */
  function openSub(which) {
    if (!enabled(which)) return;
    cancelClose();
    setSub(which);
    tick().then(() => subEl?.querySelector('input, button:not([disabled]):not([aria-disabled="true"])')?.focus());
  }

  function itemKey(event, which) {
    if (event.key !== 'ArrowRight') return;
    event.preventDefault();
    openSub(which);
  }

  /** Escape, or the left arrow outside a field, steps back from the submenu to its item.
   *  The listener stands on the submenu itself, so it runs before the card's own Escape (lib/dismiss.js), which would close the whole menu: Svelte's event attributes are handled at the root, after the card. */
  function subKey(event) {
    const inField = event.target instanceof HTMLInputElement;
    if (event.key !== 'Escape' && !(event.key === 'ArrowLeft' && !inField)) return;
    event.preventDefault();
    event.stopPropagation();
    const back = items[sub];
    setSub(null);
    back?.focus();
  }

  $effect(() => {
    const el = subEl;
    if (!el) return;
    el.addEventListener('keydown', subKey);
    return () => el.removeEventListener('keydown', subKey);
  });

  function rename() {
    ed.renameCollection(id, name);
    close();
  }

  function selectAll() {
    onticks?.([...new Set([...ticks, ...shownIds])]);
    close();
  }

  function setField(clear) {
    if (ed.setFieldOn(id, ticks, chosenField.field, clear ? '' : String(value).trim())) close();
  }

  function carry(to, copy) {
    if (ed.carryToCollection(id, to, ticks, copy)) {
      if (!copy) onticks?.([]);
      close();
    }
  }

  function carryNew(copy) {
    if (ed.carryToNewCollection(id, newName, ticks, copy)) {
      if (!copy) onticks?.([]);
      close();
    }
  }
</script>

{#snippet subItem(which, label, extra)}
  <!-- An item with a submenu: the mouse resting on it opens it beside the card; greyed, it says how to select instead -->
  <button type="button" class="cm-has-sub" class:cm-sub-on={sub === which} disabled={!enabled(which)} aria-expanded={sub === which}
    title={enabled(which) ? undefined : ta('tip.collections.deleteSelectedNone')} bind:this={items[which]} style="anchor-name: {anchors[which]}"
    onpointerenter={(e) => hoverItem(e, which)} onpointerleave={leaveSoon} onclick={() => openSub(which)} onkeydown={(e) => itemKey(e, which)}>
    <span>{label}</span><span class="cm-val">{extra ?? ''}{@html NEXT}</span></button>
{/snippet}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span class="cm-wrap" bind:this={wrapEl} onpointerenter={(e) => rest(true, e)} onpointerleave={(e) => rest(false, e)}>
  <IconButton icon={ICONS.kebab} label={ta('tip.collections.menu')} tip={false} expanded={open} bind:el={opener}
    onclick={() => { clearTimeout(restTimer); if (open && restOpened) { restOpened = false; return; } restOpened = false; if (open) close(); else openCard(); }} />
  {#if open}
    <div class="cm-card" class:cm-card-left={fromLeft} role="group" aria-label={view?.name ?? id} bind:this={card} use:dismiss={{ close, opener }} transition:menuMotion>
      {#if page === 'main'}
        <button type="button" title={ta('tip.collections.rename')} onpointerenter={leaveSoon} onclick={() => go('rename')}>{ta('ui.rename')}</button>
        {#if kinds.length}{@render subItem('kind', ta('common.type'), kindLabel(view?.kind))}{/if}
        <button type="button" title={ta('tip.collections.tickShown')} onpointerenter={leaveSoon} onclick={selectAll}><span>{ta('ui.selectAllEntries')}</span><kbd>Ctrl A</kbd></button>
        <hr />
        <!-- What acts on the selected entries, greyed while none is selected -->
        {@render subItem('field', ta('ui.setField'))}
        {@render subItem('move', ta('ui.moveToCollection'))}
        {@render subItem('copy', ta('ui.copyToCollection'))}
        <button type="button" disabled={!some} title={needs('tip.collections.exportTicked')} onpointerenter={leaveSoon} onclick={() => { act.exportCollectionCsv(id, ticks); close(); }}>{ta('ui.exportTicked')}</button>
        <hr />
        <button type="button" title={ta('tip.collections.exportCsv')} onpointerenter={leaveSoon} onclick={() => { act.exportCollectionCsv(id); close(); }}>{ta('ui.exportCsv')}</button>
        <!-- The file picker stands hidden; the menu's own item opens it -->
        <button type="button" title={ta('tip.collections.importCsvPreview')} onpointerenter={leaveSoon} onclick={() => fileEl?.click()}>{ta('ui.importCsv')}</button>
        <input class="cm-file-input" type="file" accept=".csv,text/csv" tabindex="-1" aria-hidden="true" bind:this={fileEl}
          onchange={(e) => { act.importCollectionCsv(id, e); close(); }} />
        <hr />
        <button type="button" class="cm-danger" disabled={!some} title={needs('tip.collections.deleteTicked')} onpointerenter={leaveSoon}
          onclick={() => { ed.removeEntries(id, ticks); onticks?.([]); close(); }}>
          <span>{ta('ui.deleteSelected')}</span>{#if some}<span class="cm-val">{ticks.length}</span>{/if}</button>
        <button type="button" class="cm-danger" title={ta('tip.collections.deleteCollection')} onpointerenter={leaveSoon} onclick={() => { close(); ed.removeCollection(id); }}>{ta('ui.deleteCollection')}</button>

        {#if sub}
          <!-- The open submenu beside the card, in the top layer -->
          <div class="cm-sub" transition:menuMotion class:cm-sub-anchored={native} class:cm-sub-fixed={!native} popover={native ? 'manual' : undefined} bind:this={subEl}
            role="group" aria-label={sub === 'kind' ? ta('common.type') : sub === 'field' ? ta('ui.setField') : ta(sub === 'copy' ? 'ui.copyToCollection' : 'ui.moveToCollection')}
            style={native ? `position-anchor: ${anchors[sub]}` : `top: ${subPos.top}px; left: ${subPos.left}px`}
            onpointerenter={cancelClose} onpointerleave={leaveSoon}>
            {#if sub === 'kind'}
              {#each kinds as kind (kind)}
                <button type="button" aria-pressed={view?.kind === kind} onclick={() => { ed.setCollectionKind(id, kind); close(); }}>
                  <span>{kindLabel(kind)}</span>
                  {#if view?.kind === kind}<span class="cm-check" aria-hidden="true">{@html CHECK}</span>{/if}
                </button>
              {/each}
            {:else if sub === 'field'}
              <!-- The fields the collection's kind has, each with what the selected entries hold in it now; the mouse resting on one opens its value beside the list -->
              <span class="cm-head">{counted('collections.setFor', ticks.length)}</span>
              {#each fields as f (f.field)}
                <button type="button" class:cm-sub-on={field === f.field} aria-expanded={field === f.field} bind:this={fieldRows[f.field]} style="anchor-name: {fieldAnchors[f.field]}"
                  onpointerenter={(e) => hoverField(e, f.field)} onpointerleave={leaveFieldSoon} onclick={() => pickField(f.field)} onkeydown={(e) => fieldRowKey(e, f.field)}>
                  <span class="cm-two"><span>{ta(f.labelKey)}</span><span class="cm-why">{summaryText(f)}</span></span>{@html NEXT}</button>
              {/each}
              {#if chosenField}
                <!-- One field's value: what the entries hold now, the new value, the badges in use to press, and the field cleared or set on all of them -->
                <div class="cm-sub" transition:menuMotion class:cm-sub-anchored={native} class:cm-sub-fixed={!native} popover={native ? 'manual' : undefined} bind:this={fieldEl}
                  role="group" aria-label={counted('collections.fieldFor', ticks.length, { field: ta(chosenField.labelKey) })}
                  style={native ? `position-anchor: ${fieldAnchors[chosenField.field]}` : `top: ${fieldPos.top}px; left: ${fieldPos.left}px`}
                  onpointerenter={cancelFieldClose} onpointerleave={leaveFieldSoon}>
                  <span class="cm-title">{counted('collections.fieldFor', ticks.length, { field: ta(chosenField.labelKey) })}</span>
                  <p class="cm-now">{ta('collections.nowHolds', { summary: summaryText(chosenField) })}</p>
                  {#if chosenField.input === 'date'}
                    <DatePicker value={value} title={ta('tip.entry.date')} onchange={(v) => (value = v)} />
                  {:else}
                    <span class="cm-value">
                      <input class="cm-input" type={chosenField.input === 'number' ? 'number' : 'text'} min="0" step="0.01" bind:value
                        aria-label={ta(chosenField.labelKey)} title={ta('tip.collections.setField')}
                        onkeydown={(e) => { if (e.key === 'Enter') { e.preventDefault(); setField(false); } }} />
                      {#if chosenField.input === 'number' && unit}<span class="cm-unit" aria-hidden="true">{unit}</span>{/if}
                    </span>
                  {/if}
                  {#if inUse.length}
                    <span class="cm-chips" role="group" aria-label={ta('collections.inUse')}>
                      {#each inUse as v (v)}
                        <button type="button" class="cm-chip" class:on={value === v} aria-pressed={value === v} title={ta('tip.collections.inUse')} onclick={() => (value = v)}>{v}</button>
                      {/each}
                    </span>
                  {/if}
                  <span class="cm-pair">
                    <button type="button" class="cm-plain cm-clear" disabled={fieldSummary(selected, chosenField.field).state === 'none'} title={ta('tip.collections.clearField')}
                      onclick={() => setField(true)}>{ta('ui.clearField', { field: lower(chosenField) })}</button>
                    <button type="button" class="cm-primary" disabled={String(value).trim() === ''} title={ta('tip.collections.setField')}
                      onclick={() => setField(false)}>{ta('ui.setTheField', { field: lower(chosenField) })}</button>
                  </span>
                </div>
              {/if}
            {:else}
              {@const copy = sub === 'copy'}
              <span class="cm-head">{counted(copy ? 'collections.copyTo' : 'collections.moveTo', ticks.length)}</span>
              {#each others as o (o.id)}
                <!-- A collection the entries do not fit stands greyed, its reason under its name -->
                <button type="button" aria-disabled={!o.fits || undefined} class:cm-off={!o.fits}
                  title={o.fits ? ta(copy ? 'tip.collections.copyTicked' : 'tip.collections.moveTicked') : ta(`collections.reason.${o.reason}`)}
                  onclick={() => { if (o.fits) carry(o.id, copy); }}>
                  <span class="cm-two"><span>{o.name}</span><span class="cm-why">{o.fits ? ta(`collectionKind.${o.kind}`) : `${ta(`collectionKind.${o.kind}`)}: ${ta(`collections.reason.${o.reason}`)}`}</span></span>
                </button>
              {:else}
                <span class="cm-why cm-none">{ta('collections.noOtherCollection')}</span>
              {/each}
              <hr />
              <!-- A new collection of the same kind, named here, takes the entries -->
              <span class="cm-new">
                <span class="cm-new-mark" aria-hidden="true">{@html PLUS}</span>
                <input class="cm-input" type="text" bind:value={newName} placeholder={ta('ph.collections.newFor')} aria-label={ta('lbl.newCollectionName')} title={ta('tip.collections.newFor')}
                  onkeydown={(e) => { if (e.key === 'Enter') { e.preventDefault(); carryNew(copy); } }} />
              </span>
              <button type="button" class="cm-primary" disabled={!newName.trim()} onclick={() => carryNew(copy)}>{ta('ui.createCollection')}</button>
            {/if}
          </div>
        {/if}
      {:else if page === 'rename'}
        <button type="button" class="cm-back" title={ta('ui.back')} onclick={() => go('main')}>{@html BACK}<span>{ta('ui.rename')}</span></button>
        <!-- The name changes alone: the collection's id, its file, its feed and the blocks that show it stay -->
        <input type="text" class="cm-input" bind:value={name} aria-label={ta('lbl.collectionName')} title={ta('tip.collections.rename')}
          onkeydown={(e) => { if (e.key === 'Enter') { e.preventDefault(); rename(); } }} />
        <button type="button" class="cm-primary" disabled={!name.trim()} onclick={rename}>{ta('ui.save')}</button>
      {/if}
    </div>
  {/if}
</span>

<style>
  .cm-wrap {
    position: relative;
    display: inline-flex;
  }

  /* The card under the ⋮, its right edge under the ⋮'s, or its left edge where the ⋮ stands near the panel's left edge, over what follows in the panel */
  .cm-card {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    z-index: 30;
    display: grid;
    gap: 2px;
    width: min(17rem, 80vw);
    padding: 6px;
    font-size: 0.85rem;
    background: var(--urd-color-bg, #0f1218);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 10px;
    box-shadow: 0 14px 40px rgb(0 0 0 / 55%);
  }

  .cm-card.cm-card-left {
    right: auto;
    left: 0;
  }

  /* The submenu beside the card, on the same surface */
  .cm-sub {
    box-sizing: border-box;
    display: grid;
    gap: 2px;
    width: 272px;
    max-height: calc(100vh - 16px);
    padding: 6px;
    overflow-y: auto;
    font-size: 0.85rem;
    color: var(--urd-color-text, #e8eaf0);
    background: var(--urd-color-bg, #0f1218);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 10px;
    box-shadow: 0 14px 40px rgb(0 0 0 / 55%);
  }

  .cm-sub-fixed {
    position: fixed;
    z-index: 100003;
  }

  /* The anchored branch: the submenu flush against the card at the right of its item, the two borders on one line and its first row level with the item, turned to the left or upward by the browser where the window has no room */
  @supports (anchor-name: --a) {
    .cm-sub-anchored {
      inset: auto;
      margin: -7px 0 0 6px;
      position-area: inline-end span-block-end;
    }

    .cm-sub-anchored:not(:popover-open) {
      display: none;
    }

    @supports (position-try-fallbacks: flip-block) {
      .cm-sub-anchored {
        position-try-fallbacks: flip-inline, flip-block, flip-inline flip-block;
      }
    }
  }

  .cm-card > button,
  .cm-sub > button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    min-height: 2rem;
    padding: 0.4rem 0.6rem;
    font: inherit;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: 0;
    border-radius: 6px;
  }

  .cm-card > button:hover:not(:disabled),
  .cm-card > button:focus-visible,
  .cm-card > .cm-sub-on,
  .cm-sub > .cm-sub-on,
  .cm-sub > button:hover:not(:disabled),
  .cm-sub > button:focus-visible {
    background: rgb(255 255 255 / 8%);
    outline: none;
  }

  .cm-file-input {
    display: none;
  }

  .cm-val {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    opacity: 0.7;
  }

  .cm-card kbd {
    font: inherit;
    font-size: 0.72rem;
    opacity: 0.6;
  }

  .cm-card hr {
    width: 100%;
    height: 1px;
    margin: 3px 0;
    border: 0;
    background: rgb(255 255 255 / 10%);
  }

  /* The removals in red, as the selection bar's Delete; what needs a selection greyed while none is selected */
  .cm-card > .cm-danger {
    color: #f08a8a;
  }

  .cm-card > .cm-danger:hover:not(:disabled),
  .cm-card > .cm-danger:focus-visible {
    background: rgb(224 82 82 / 14%);
  }

  .cm-card > button:disabled {
    cursor: default;
    opacity: 0.45;
  }

  .cm-card > .cm-back {
    justify-content: flex-start;
    font-weight: 600;
  }

  .cm-head {
    padding: 0.3rem 0.6rem 0.1rem;
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.6;
  }

  .cm-two {
    display: grid;
    gap: 0.1rem;
    min-width: 0;
  }

  .cm-why {
    font-size: 0.75rem;
    opacity: 0.65;
  }

  .cm-none {
    padding: 0.3rem 0.6rem;
  }

  .cm-off {
    opacity: 0.5;
    cursor: default !important;
  }

  .cm-title {
    padding: 0.4rem 0.6rem 0.1rem;
    font-weight: 600;
  }

  .cm-now {
    margin: 0;
    padding: 0.1rem 0.6rem 0.2rem;
    font-size: 0.75rem;
    opacity: 0.7;
  }

  /* The value field with the currency word inside its right edge */
  .cm-value {
    position: relative;
    display: grid;
    margin: 2px 0.3rem;
  }

  .cm-value .cm-input {
    padding-right: 2.4rem;
  }

  .cm-unit {
    position: absolute;
    top: 50%;
    right: 0.6rem;
    font-size: 0.78rem;
    opacity: 0.6;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .cm-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: 2px 0.4rem;
  }

  .cm-chip {
    padding: 3px 9px;
    font: inherit;
    font-size: 0.75rem;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 999px;
  }

  .cm-chip.on,
  .cm-chip:hover {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 16%, transparent);
  }

  /* Clearing in red, apart from setting */
  .cm-card .cm-clear {
    color: #f08a8a;
    border-color: rgb(224 82 82 / 45%);
  }

  .cm-card .cm-clear:disabled {
    cursor: default;
    opacity: 0.45;
  }

  .cm-input {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    height: 2rem;
    padding: 0 0.5rem;
    font: inherit;
    color: inherit;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 6px;
  }

  .cm-input:focus {
    border-color: var(--urd-color-accent, #7c5cff);
    outline: none;
  }

  .cm-card > .cm-input,
  .cm-sub > :global(.dp) {
    width: auto;
    margin: 2px 0.3rem;
  }

  .cm-sub hr {
    width: 100%;
    height: 1px;
    margin: 3px 0;
    border: 0;
    background: rgb(255 255 255 / 10%);
  }

  .cm-new {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0 0.3rem;
  }

  .cm-new-mark {
    display: inline-flex;
    opacity: 0.7;
  }

  .cm-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
    margin: 2px 0.3rem;
  }

  .cm-plain,
  .cm-card .cm-primary {
    min-height: 2rem;
    padding: 0 0.5rem;
    font: inherit;
    font-size: 0.8rem;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
  }

  .cm-card .cm-primary {
    justify-content: center;
    font-weight: 600;
    color: var(--urd-color-bg, #0f1218);
    background: var(--urd-color-accent, #7c5cff);
    border-color: transparent;
  }

  .cm-card > .cm-primary,
  .cm-sub > .cm-primary {
    margin: 2px 0.3rem;
  }

  .cm-card .cm-primary:disabled {
    cursor: default;
    opacity: 0.45;
  }

  .cm-check {
    display: inline-flex;
    color: var(--urd-color-accent, #7c5cff);
  }
</style>
