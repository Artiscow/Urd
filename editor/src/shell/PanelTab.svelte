<script>
  /* A panel's button with its menu of folds, in every layout that reaches a panel this way (`variant`): a tab in the strip under the top bar and in the panel's own tabs (PanelStrip, PanelNav), a row of the top bar's Site menu in «The page's tabs» (TopBar), an icon of the rail and a word of the sidebar in its flyout form (Rail). One button, which opens the panel on a click.
     A panel with folds (lib/panel-folds.js) has a menu of the folds: a mouse resting on the button, or the down arrow key on a tab and the right arrow key on the others, opens it, and a row opens the panel with that fold alone unfolded, or presses the fold's one button where that is all it holds. The menu stands in the top layer, under a tab and beside the others, so a narrow panel never clips it, and it slides in and out. Beside a rail's icon it is headed by the panel's name, which stands in place of the icon's tooltip and opens the panel.
     The rows are set apart as the Urd settings' «Tab menus» chooses: in short groups under small labels (the default), with a hairline between them, or as a plain list. A row that presses a button carries that button's mark.
     The arrow keys move through the rows, and Escape closes the menu and returns to the tab. Hover counts only for a mouse, so a tap on a touch screen opens the panel, where every fold stands.
     The Legal tab carries an amber dot on its name's corner while something the law asks for is missing, and the same dot on the rows that need looking at (lib/legal-model.js).
     The Collections tab's menu lists the site's collections, kept in step as they come and go, and ends in New collection. A mouse resting on a collection, or the right arrow key, opens a submenu of its entries beside it, ending in New entry; on an entry, a third menu of its common actions (its picture added or edited, the entry duplicated); the left arrow or Escape goes back a level.
     A collection's row opens it in the panel, and an entry's row opens the entry.
     The Drafts tab opens the Drafts window rather than a panel (state/drafts.svelte.js), on a mouse's rest as a tab's menu opens or on a press, and carries its marks (DraftsMarks); it keeps no tooltip, as a button that opens on a rest does not. As a row of the Site menu it opens on a press alone, so a mouse passing down the menu never takes the menu away. */
  import { tabMenuOpen } from './tab-menu-open.svelte.js';
  import { getContext, tick } from 'svelte';
  import { menuMotion } from '../lib/motion.svelte.js';
  import { ta } from '$engine/i18n.js';
  import { panelFolds, foldGroups, collectionMenuRows } from '../lib/panel-folds.js';
  import { menu } from '../menu/state.svelte.js';
  import { sortEntries } from '$engine/collections.js';
  import { collectionActions } from '../panels/collections/actions.js';
  import { groupChip } from '../lib/legal-model.js';
  import { ICONS } from '../lib/icons.js';
  import DraftsMarks from './DraftsMarks.svelte';
  const ed = getContext('urd-editor');
  let { name, variant = 'tab', menus = true } = $props();
  /** The menu stands beside its button (a row, an icon, a word) rather than under it (a tab). */
  const beside = $derived(variant !== 'tab');
  const label = $derived(ed.PANEL_LABELS[name]);
  const updateDot = $derived(name === 'update' && ed.updateNotice === 'dot');
  const legalDot = $derived(name === 'legal' && ed.legal?.dot === true);
  const drafts = $derived(name === 'drafts');
  /** The Drafts tab's name to a screen reader, with what stands here alone and what is new among the saved. */
  const draftsLabel = $derived(drafts ? [
    label,
    ed.draftsWaiting ? ta(ed.draftsWaiting === 1 ? 'save.waiting.one' : 'save.waiting', { n: ed.draftsWaiting }) : '',
    ed.draftsFresh ? ta(ed.draftsFresh === 1 ? 'saved.news.one' : 'saved.news', { n: ed.draftsFresh }) : '',
  ].filter(Boolean).join(', ') : undefined);
  /** The button's own look in each layout: a tab, a row of the Site menu, an icon of the rail, a word of the sidebar. */
  const buttonClass = $derived({ tab: 'panel-tab', row: 'ghost site-row', rail: 'rail-icon', word: 'side-word' }[variant] ?? 'panel-tab');
  /** An icon is named by its label, read out with the amber dot's meaning; the words and the tabs carry their names. */
  const ariaLabel = $derived(drafts ? draftsLabel : variant === 'rail' ? (legalDot ? `${label}, ${ta('legal.dotLabel')}` : label) : undefined);
  /** The tooltip: the update's, else an icon's name where no menu's head names it; none on Drafts, which opens its window on a rest, headed by its name. */
  const titleText = $derived(updateDot ? ta('tip.updateOut', { version: ed.updateTarget }) : drafts ? undefined : variant === 'rail' && !hasMenu ? label : undefined);

  /** The folds the menu lists: those the panel draws now, and a menu only where there is a choice of two or more. */
  const folds = $derived(panelFolds(name, { site: ed.siteDraft, legal: ed.legal, designs: menu.designsPref }));
  /** The Collections tab's rows: the collections with their entries; its menu stands while the collections can be read, with New collection alone where there are none. */
  const collections = $derived(name === 'collections' ? collectionMenuRows(ed.collectionIds, ed.collectionsView, sortEntries) : []);
  const hasMenu = $derived(menus && (name === 'collections' ? !ed.collectionsUnavailable : folds.length > 1));
  const menuId = $derived(`panel-tab-menu-${name}`);
  /** The rows as the «Tab menus» setting sets them apart: in their groups under small labels, or as one run with or without lines. */
  const groups = $derived(ed.tabMenus === 'groups' ? foldGroups(folds) : [{ label: null, folds }]);

  let open = $state(false);
  let wrap = $state(null);
  let tab = $state(null);
  let list = $state(null);
  let pos = $state({ top: 0, left: 0 });
  let timer = null;
  /** Whether a mouse is on the tab or one of its menus, from its own pointer events, since a menu in the top layer does not light its ancestors' :hover in every browser. */
  let hovering = false;
  /** The collection whose entries stand in the submenu beside its row, and the entry whose actions stand in the third menu beside that; each with its place, and the wait before a resting mouse switches it. */
  let sub = $state(null);
  let subEl = $state(null);
  let subPos = $state({ top: 0, left: 0, maxHeight: 320 });
  /** The side of the first menu the entries' submenu stands on, which the actions' menu keeps to, so it never covers the first menu. */
  let subSide = 'right';
  let subTimer = null;
  const subRow = $derived(collections.find((c) => c.id === sub) ?? null);
  let act = $state(null);
  let actEl = $state(null);
  let actPos = $state({ top: 0, left: 0, maxHeight: 320 });
  let actTimer = null;
  const actEntry = $derived(subRow?.entries.find((e) => e.id === act) ?? null);
  /** The file chooser for an entry's first picture, and the entry it is for; it stands outside the menu, so the menu may close while the file is chosen. */
  let fileInput = $state(null);
  let fileFor = null;

  /** Opens or closes after a moment: a mouse passing over the tab opens nothing, and one on its way down into the menu, or leaving it on a slant, does not close it. */
  function soon(next, ms) {
    clearTimeout(timer);
    timer = setTimeout(() => setOpen(next), ms);
  }

  function now(next) {
    clearTimeout(timer);
    setOpen(next);
  }

  /** The menu's place: under a tab, or beside a row, an icon or a word, at its height; held inside the window, a menu beside its button turning to the button's other side where the window has no room. */
  function place() {
    if (!tab) return pos;
    const r = tab.getBoundingClientRect();
    const width = list?.offsetWidth ?? 0;
    const height = list?.offsetHeight ?? 0;
    if (!beside) return { top: r.bottom, left: Math.max(8, Math.min(r.left, window.innerWidth - width - 8)) };
    const left = r.right + 2 + width > window.innerWidth - 8 && r.left - width - 2 >= 8 ? r.left - width - 2 : r.right + 2;
    return { top: Math.max(8, Math.min(r.top - 5, window.innerHeight - height - 8)), left };
  }

  /** This tab, as the one whose menu stands open (tab-menu-open.svelte.js): a symbol, which the shared state keeps as it is. */
  const self = Symbol(name);
  /** Whether the menu closes because another tab's menu took its place: then it is gone at once, with no closing motion beside the new one. */
  let replaced = $state(false);
  // Another tab's menu opening closes this one at once.
  $effect(() => {
    if (open && tabMenuOpen.owner !== self) {
      clearTimeout(timer);
      replaced = true;
      setOpen(false);
    }
  });

  /** The menu opened or closed, placed again once it is drawn and its size is known. */
  async function setOpen(next) {
    if (next && !open) pos = place();
    open = next;
    if (next) {
      tabMenuOpen.owner = self;
      replaced = false;
    }
    else if (tabMenuOpen.owner === self) tabMenuOpen.owner = null;
    if (!next) {
      clearTimeout(subTimer);
      clearTimeout(actTimer);
      sub = null;
      act = null;
      return;
    }
    await tick();
    pos = place();
  }

  $effect(() => () => { clearTimeout(timer); clearTimeout(subTimer); clearTimeout(actTimer); });

  /** A submenu's place beside its row: at the row's height, with the edges of the menu it stands from on either side, as tall as the window allows and scrolling beyond. */
  function besideRow(row, from) {
    const r = row.getBoundingClientRect();
    const m = from.getBoundingClientRect();
    const top = Math.max(8, Math.min(r.top - 5, window.innerHeight - 168));
    return { top, left: m.right + 2, after: m.right + 2, before: m.left - 2, maxHeight: Math.max(160, window.innerHeight - top - 8) };
  }

  /** The side a submenu of this width stands on: the one it prefers where the window has room, else the other, else held inside the window. */
  function sideFor(place, width, prefer) {
    const fitsRight = place.after + width <= window.innerWidth - 8;
    const fitsLeft = place.before - width >= 8;
    const side = prefer === 'left' ? (fitsLeft || !fitsRight ? 'left' : 'right') : (fitsRight || !fitsLeft ? 'right' : 'left');
    return { side, left: side === 'right' ? Math.max(8, Math.min(place.after, window.innerWidth - width - 8)) : Math.max(8, place.before - width) };
  }

  /** The submenu of a collection's entries, beside its row; null closes it. */
  async function showSub(id, row) {
    clearTimeout(subTimer);
    if (!id || !row || !list) {
      sub = null;
      act = null;
      return;
    }
    if (sub !== id) act = null;
    const place = besideRow(row, list);
    subPos = place;
    sub = id;
    await tick();
    const { side, left } = sideFor(place, subEl?.offsetWidth ?? 0, 'right');
    subSide = side;
    subPos = { ...place, left };
  }

  /** The third menu of an entry's actions, beside its row in the entries' submenu and on the same side; null closes it. */
  async function showAct(id, row) {
    clearTimeout(actTimer);
    if (!id || !row || !subEl) {
      act = null;
      return;
    }
    const place = besideRow(row, subEl);
    actPos = { ...place, left: subSide === 'left' ? place.before : place.after };
    act = id;
    await tick();
    const { left } = sideFor(place, actEl?.offsetWidth ?? 0, subSide);
    actPos = { ...place, left };
  }

  /** A mouse resting on a row opens the menu beside it after a moment, so a pointer crossing the rows on its way to that menu does not switch it. */
  function subSoon(id, row, event) {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(subTimer);
    subTimer = setTimeout(() => showSub(id, row), 140);
  }

  function actSoon(id, row, event) {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(actTimer);
    actTimer = setTimeout(() => showAct(id, row), 140);
  }

  // A press outside the tab and its menu closes the menu; a scroll that moves the tab takes the menu along under it, and one that takes the tab out of sight closes it.
  // A menu kept open after a pick (Urd settings «After a pick») stays where it stands while the mouse is on it, as a pick scrolls the panel the tab may stand in.
  $effect(() => {
    if (!open) return;
    const away = (event) => { if (!wrap?.contains(event.target)) now(false); };
    const scrolled = (event) => {
      if (list?.contains(event.target) || subEl?.contains(event.target) || actEl?.contains(event.target) || !tab) return;
      if (ed.tabMenuStay === 'stay' && hovering) return;
      sub = null;
      act = null;
      const r = tab.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) {
        now(false);
        return;
      }
      pos = place();
    };
    window.addEventListener('pointerdown', away, true);
    window.addEventListener('scroll', scrolled, true);
    return () => {
      window.removeEventListener('pointerdown', away, true);
      window.removeEventListener('scroll', scrolled, true);
    };
  });

  /** The menu in the top layer where the browser has it, so nothing around the tab clips or covers it; elsewhere it stands fixed above the page (app.css). */
  function topLayer(node) {
    if (typeof node.showPopover === 'function') node.showPopover();
  }

  /** A row opens the panel at its fold, or presses the fold's one button (`press`); the menu stays open until the mouse leaves it, unless the Urd settings close it at the pick («After a pick»). A row that opens a dialog closes it either way, since the dialog stands over it. */
  function pick(fold) {
    if (ed.tabMenuStay !== 'stay' || fold.press) now(false);
    ed.openPanel(name, { fold: fold.id, press: fold.press === true });
  }

  /** A collection's row opens it in the Collections panel; an entry's row opens the entry there. The menu closes as «After a pick» says. */
  function pickCollection(id) {
    if (ed.tabMenuStay !== 'stay') now(false);
    ed.openCollection(id);
  }

  function pickEntry(collection, entryId) {
    if (ed.tabMenuStay !== 'stay') now(false);
    ed.openEntry({ collection, entryId });
  }

  /** A new entry in a collection, opened in the Collections panel with its title ready to type over, as the panel's own New entry does (addCollectionEntry). */
  function newEntry(collection) {
    if (ed.tabMenuStay !== 'stay') now(false);
    const entryId = ed.addCollectionEntry(collection);
    if (entryId) ed.openEntry({ collection, entryId, select: true });
  }

  /** A copy of an entry under it, opened in the Collections panel with its title ready to type over (duplicateEntries). */
  function duplicateEntry(collection, entryId) {
    if (ed.tabMenuStay !== 'stay') now(false);
    const [copy] = ed.duplicateEntries(collection, [entryId]);
    if (copy) ed.openEntry({ collection, entryId: copy, select: true });
  }

  /** The image editor on an entry's picture; the menu closes, as the editor's dialog stands over it. */
  function editEntryPicture(collection, entryId) {
    now(false);
    ed.openPicture({ kind: 'entry', collection, entryId });
  }

  /** An entry's first picture: the file chooser, then the same checks as every upload, then the image editor on it. */
  function addEntryPicture(collection, entryId) {
    fileFor = { collection, entryId };
    now(false);
    fileInput?.click();
  }

  async function filePicked(event) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    const target = fileFor;
    fileFor = null;
    if (!file || !target) return;
    try {
      const img = await ed.compressOrTrim(file, 'entry');
      collectionActions(ed).setEntryField(target.collection, target.entryId, 'image', img.dataUrl);
      ed.openPicture({ kind: 'entry', collection: target.collection, entryId: target.entryId });
    } catch (err) {
      ed.setStatus(ed.imageErrorText(err), 'error');
    }
  }

  /** The Collections panel at its list, with the caret in the new collection's name (panels/collections/CollectionList.svelte). */
  async function newCollection() {
    now(false);
    ed.panelCollection = null;
    ed.activePanel = 'collections';
    await tick();
    await tick();
    document.querySelector('[data-new-collection]')?.focus();
  }

  /** The down and up arrows open a tab's menu and move through the rows of the menu the focus is in; the right arrow opens the menu beside a row, an icon or a word, on a collection its entries at the first, and on an entry its actions; the left arrow or Escape goes back a level; Escape in the first menu, and the left arrow in a menu beside its button, close it and return to the button. */
  async function keys(event) {
    if (!hasMenu) return;
    const active = document.activeElement;
    const inAct = actEl?.contains(active);
    const inSub = !inAct && subEl?.contains(active);
    if (beside && event.key === 'ArrowRight' && active === tab) {
      event.preventDefault();
      event.stopPropagation();
      if (!open) await setOpen(true);
      clearTimeout(timer);
      await tick();
      list?.querySelector('button')?.focus();
      return;
    }
    if (beside && event.key === 'ArrowLeft' && open && list?.contains(active)) {
      event.preventDefault();
      event.stopPropagation();
      now(false);
      tab?.focus();
      return;
    }
    if ((inAct || inSub) && (event.key === 'ArrowLeft' || event.key === 'Escape')) {
      event.preventDefault();
      event.stopPropagation();
      const back = inAct
        ? subEl?.querySelector(`button[data-entry="${CSS.escape(act)}"]`)
        : list?.querySelector(`button[data-collection="${CSS.escape(sub)}"]`);
      if (inAct) act = null;
      else { sub = null; act = null; }
      back?.focus();
      return;
    }
    if (event.key === 'ArrowRight' && name === 'collections') {
      const collectionRow = active?.closest?.('button[data-collection]');
      const entryRow = active?.closest?.('button[data-entry]');
      if (collectionRow && list?.contains(collectionRow)) {
        event.preventDefault();
        await showSub(collectionRow.dataset.collection, collectionRow);
        await tick();
        subEl?.querySelector('button')?.focus();
      } else if (entryRow && subEl?.contains(entryRow)) {
        event.preventDefault();
        await showAct(entryRow.dataset.entry, entryRow);
        await tick();
        actEl?.querySelector('button')?.focus();
      }
      return;
    }
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      event.stopPropagation();
      now(false);
      tab?.focus();
      return;
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    if (!open && (beside || active !== tab)) return;
    event.preventDefault();
    if (!open) {
      await setOpen(true);
      clearTimeout(timer);
    }
    const rows = [...((inAct ? actEl : inSub ? subEl : list)?.querySelectorAll('button') ?? [])];
    if (!rows.length) return;
    const at = rows.indexOf(active);
    const step = event.key === 'ArrowDown' ? 1 : -1;
    const next = at < 0 ? (step > 0 ? 0 : rows.length - 1) : (at + step + rows.length) % rows.length;
    rows[next].focus();
  }
</script>

<!-- A Legal fold that needs looking at carries the tab's amber dot; its state in words, read out, stands on the panel's heading -->
{#snippet mark(fold)}
  {#if name === 'legal' && ed.legal}
    {@const c = groupChip(fold, ed.legal)}
    {#if c.tone === 'warn'}<span class="tab-menu-mark" role="img" aria-label={ta(c.key, { n: c.n })}></span>{/if}
  {/if}
{/snippet}

{#snippet dots()}
  {#if legalDot}<span class="tab-menu-dot" role="img" aria-label={ta('legal.dotLabel')}></span>{/if}
{/snippet}

<!-- The button's face in each layout: a tab's word with its arrow, an icon with its dots at the corner, a row's or a word's name with its arrow toward the menu beside it -->
{#snippet face()}
  {#if drafts}
    {#if variant === 'rail'}{@html ICONS.panel_drafts}<DraftsMarks corner />{:else if variant === 'tab'}<span class="tab-menu-word">{label}<DraftsMarks /></span>{:else}<span class="tab-menu-name">{label}</span><DraftsMarks />{/if}
  {:else if variant === 'rail'}
    {@html ICONS[`panel_${name}`]}{#if updateDot}<span class="update-dot" aria-hidden="true"></span>{/if}{#if legalDot}<span class="update-dot legal-dot" aria-hidden="true"></span>{/if}
  {:else if variant === 'tab'}
    <span class="tab-menu-word">{label}{@render dots()}</span>{#if hasMenu}<span class="tab-menu-caret" aria-hidden="true">{@html ICONS.caret}</span>{/if}{#if updateDot}<span class="update-dot update-dot-inline" aria-hidden="true"></span>{/if}
  {:else}
    <span class="tab-menu-name">{label}</span>{#if updateDot}<span class="update-dot update-dot-inline" aria-hidden="true"></span>{/if}{#if legalDot}<span class="update-dot update-dot-inline legal-dot" role="img" aria-label={ta('legal.dotLabel')}></span>{/if}{#if hasMenu}<span class="tab-menu-more" aria-hidden="true">{@html ICONS.chevronRight}</span>{/if}
  {/if}
{/snippet}

{#if hasMenu}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <span class="tab-menu tab-menu-is-{variant}" bind:this={wrap}
    onpointerenter={(e) => { if (e.pointerType === 'mouse') { hovering = true; soon(true, variant === 'row' ? 140 : 180); } }}
    onpointerleave={(e) => { if (e.pointerType === 'mouse') { hovering = false; soon(false, 280); } }}
    onkeydown={keys}
    onfocusout={(e) => { if (!wrap?.contains(e.relatedTarget) && !(ed.tabMenuStay === 'stay' && hovering)) now(false); }}>
    <button type="button" class={buttonClass} class:active={ed.activePanel === name} class:menu-open={open} bind:this={tab} aria-label={ariaLabel} title={titleText}
      aria-pressed={ed.activePanel === name} aria-keyshortcuts={beside ? 'ArrowRight' : 'ArrowDown'} aria-expanded={open} aria-controls={open ? menuId : undefined}
      onclick={() => { now(false); ed.togglePanel(name); }}>{@render face()}</button>
    {#if open}
      <!-- A press on a row keeps the focus where it is, so a browser that does not focus a pressed button never closes the menu under the click (the focusout above) -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div class="tab-menu-list" class:lines={ed.tabMenus === 'lines'} id={menuId} popover="manual" role="group" aria-label={name === 'collections' ? ed.PANEL_LABELS[name] : ta('tip.panelTab.menu', { panel: ed.PANEL_LABELS[name] })}
        style="top: {pos.top}px; left: {pos.left}px; max-height: calc(100vh - {pos.top}px - 8px)" bind:this={list} use:topLayer transition:menuMotion={{ duration: replaced ? 0 : undefined }} onmousedown={(e) => e.preventDefault()}>
        {#if variant === 'rail'}
          <!-- Beside an icon, the panel's name heads the menu in the tooltip's place, and opens the panel -->
          <button type="button" class="tab-menu-head" onclick={() => { now(false); ed.togglePanel(name); }}>{label}</button>
        {/if}
        {#if name === 'collections'}
          {#each collections as c (c.id)}
            <!-- A collection carries the arrow of the submenu its row opens beside it: its entries, and New entry -->
            <button type="button" class="tab-menu-row" data-collection={c.id} class:sub-open={sub === c.id}
              aria-expanded={sub === c.id} aria-controls={sub === c.id ? `${menuId}-entries` : undefined} aria-keyshortcuts="ArrowRight"
              onpointerenter={(e) => subSoon(c.id, e.currentTarget, e)} onclick={() => pickCollection(c.id)}><span class="tab-menu-name">{c.name}</span><span class="tab-menu-more" aria-hidden="true">{@html ICONS.chevronRight}</span></button>
          {/each}
          <button type="button" class="tab-menu-new" onpointerenter={(e) => subSoon(null, null, e)} onclick={newCollection}>{@html ICONS.plus}<span class="tab-menu-name">{ta('ui.newCollection')}</span></button>
        {:else}
          {#each groups as group, gi (gi)}
            <div class="tab-menu-group" role="group" aria-label={group.label ? ta(group.label) : undefined}>
              {#if group.label}<span class="tab-menu-label" aria-hidden="true">{ta(group.label)}</span>{/if}
              {#each group.folds as fold (fold.id)}
                <!-- A row that presses its fold's one button carries that button's mark -->
                <button type="button" class="tab-menu-row" onclick={() => pick(fold)}><span class="tab-menu-name">{ta(fold.key)}</span>{@render mark(fold.id)}{#if fold.icon}<span class="tab-menu-act" role="img" aria-label={ta('tip.panelTab.press')}>{@html ICONS[fold.icon]}</span>{/if}</button>
              {/each}
            </div>
          {/each}
        {/if}
      </div>
      {#if subRow}
        <!-- The submenu of a collection's entries, in the top layer beside its row; the mouse on it keeps it -->
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <div class="tab-menu-list tab-menu-sub" class:lines={ed.tabMenus === 'lines'} id={`${menuId}-entries`} popover="manual" role="group" aria-label={subRow.name}
          style="top: {subPos.top}px; left: {subPos.left}px; max-height: {subPos.maxHeight}px" bind:this={subEl} use:topLayer transition:menuMotion
          onpointerenter={() => clearTimeout(subTimer)} onpointerleave={(e) => { if (e.pointerType === 'mouse') clearTimeout(actTimer); }} onmousedown={(e) => e.preventDefault()}>
          <!-- The entries scroll where the window is too short for them, New entry standing in view under them -->
          <div class="tab-menu-scroll">
            {#each subRow.entries as entry (entry.id)}
              <!-- An entry's row opens it, and carries the arrow of its actions' menu beside it -->
              <button type="button" class="tab-menu-row" data-entry={entry.id} class:sub-open={act === entry.id}
                aria-expanded={act === entry.id} aria-controls={act === entry.id ? `${menuId}-actions` : undefined} aria-keyshortcuts="ArrowRight"
                onpointerenter={(e) => actSoon(entry.id, e.currentTarget, e)} onclick={() => pickEntry(subRow.id, entry.id)}><span class="tab-menu-name">{ed.plainTitle(entry.title) || ta('csv.noTitle')}</span><span class="tab-menu-more" aria-hidden="true">{@html ICONS.chevronRight}</span></button>
            {/each}
          </div>
          <button type="button" class="tab-menu-new" onpointerenter={(e) => actSoon(null, null, e)} onclick={() => newEntry(subRow.id)}>{@html ICONS.plus}<span class="tab-menu-name">{ta('tabMenu.newEntry')}</span></button>
        </div>
      {/if}
      {#if subRow && actEntry}
        <!-- The third menu: an entry's common actions, beside its row -->
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <div class="tab-menu-list tab-menu-sub" class:lines={ed.tabMenus === 'lines'} id={`${menuId}-actions`} popover="manual" role="group" aria-label={ed.plainTitle(actEntry.title) || ta('csv.noTitle')}
          style="top: {actPos.top}px; left: {actPos.left}px; max-height: {actPos.maxHeight}px" bind:this={actEl} use:topLayer transition:menuMotion
          onpointerenter={() => { clearTimeout(actTimer); clearTimeout(subTimer); }} onmousedown={(e) => e.preventDefault()}>
          {#if actEntry.image}
            <button type="button" class="tab-menu-row" onclick={() => editEntryPicture(subRow.id, actEntry.id)}>{@html ICONS.image}<span class="tab-menu-name">{ta('tabMenu.editImage')}</span></button>
          {:else}
            <button type="button" class="tab-menu-row" onclick={() => addEntryPicture(subRow.id, actEntry.id)}>{@html ICONS.image}<span class="tab-menu-name">{ta('ui.addImage')}</span></button>
          {/if}
          <button type="button" class="tab-menu-row" onclick={() => duplicateEntry(subRow.id, actEntry.id)}>{@html ICONS.copy}<span class="tab-menu-name">{ta('tabMenu.duplicate')}</span></button>
        </div>
      {/if}
    {/if}
    {#if name === 'collections'}<input type="file" accept="image/*" hidden bind:this={fileInput} onchange={filePicked} />{/if}
  </span>
{:else if drafts}
  <button type="button" class={buttonClass} class:active={ed.draftsOpen} aria-expanded={ed.draftsOpen} aria-label={ariaLabel} data-drafts-tab data-beside={beside ? '' : undefined}
    onpointerenter={variant === 'row' ? undefined : (e) => ed.restOnDraftsTab(true, e, e.currentTarget, beside)} onpointerleave={variant === 'row' ? undefined : (e) => ed.restOnDraftsTab(false, e)}
    onclick={(e) => ed.toggleDrafts(e.currentTarget, beside)}>{@render face()}</button>
{:else}
  <button type="button" class={buttonClass} class:active={ed.activePanel === name} aria-pressed={ed.activePanel === name} aria-label={ariaLabel} title={titleText}
    onclick={() => ed.togglePanel(name)}>{@render face()}</button>
{/if}
