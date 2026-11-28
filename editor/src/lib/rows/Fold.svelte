<script>
  /* The row kit's fold: title, value while closed, controls and reset; given `rows`, a fold of one setting is drawn bare, of none not at all. */
  import { getContext, setContext, tick, untrack } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { folds } from '../folds.svelte.js';
  import { menu } from '../../menu/state.svelte.js';
  import { ICONS } from '../icons.js';
  import { rowMotion } from '../motion.svelte.js';
  import { followOpen } from '../follow-open.js';
  import { SvelteMap } from 'svelte/reactivity';
  import Setting from './Setting.svelte';
  /* `group` (groupOf in menu/groups.js) carries the defaults and the reset, for the Setting rows inside. */
  let { id, title, value, tip = undefined, reset = null, group = null, rows = undefined, defaultOpen = false, surface = 'menu', ontoggle = undefined, children } = $props();
  const folded = $derived(rows === undefined || rows > 1);
  // The area's heading counts its groups (MenuArea); the area also names the group its folds open one at a time in.
  const area = getContext('menu-area');
  /** Whether the element menu's own choices reach this fold: a fold in an area of a menu drawn for a block or a section. */
  const inMenu = $derived(surface === 'menu' && Boolean(area));
  // Before the fold is drawn, so a fold that starts open is drawn open; with «All open» every fold does, again after each choice of it.
  $effect.pre(() => {
    if (defaultOpen) folds.openOnce(surface, id);
    if (inMenu && menu.foldsPref === 'all') folds.openOnce(surface, id, 'all');
  });
  // A small window of one group (menu/FloatingMenu.svelte) keeps its fold apart from the full menu's one-at-a-time group.
  const onlyPanel = getContext('menu-only');
  const head = getContext('menu-head');
  const small = $derived(Boolean(onlyPanel?.only || head?.only));
  /** The group the fold opens one at a time in, kept as `data-fold-group` while «Expand all» lifts the name (folds.spread). */
  const oneGroup = $derived(inMenu && folded && menu.foldsPref === 'one' && !small ? area.group : undefined);
  const exclusive = $derived(folds.spread ? undefined : oneGroup);

  /* «Settings in a group» on «Added as needed», in the full menu only. */
  const menued = $derived(inMenu && folded && menu.extraPref === 'menu' && !small);
  /** The fold's setting rows but its first, which always stands: those hidden, to add, and those shown, to take away. */
  let extraRowsNow = $state({ hidden: [], shown: [] });
  /** Counts the rows added and taken away, so the rows are read again after each. */
  let revealed = $state(0);
  let extraOpen = $state(false);
  let extraBtn = $state(null);
  let extraPop = $state(null);
  let itemsEl = null;
  const HIDDEN = 'data-extra-hidden';
  /** A setting row's name: its key or pin where it has one, else its words. */
  const nameOf = (el) => el.dataset.setting || wordsOf(el);
  /** A row's words: its label where it has one, else its first line. */
  const wordsOf = (el) => (el.querySelector('.choice-label, label, .row-label, .menu-group-title, legend')?.textContent ?? el.textContent).trim().split('\n')[0].trim().slice(0, 60);
  const settingRow = (name) => [...(itemsEl?.children ?? [])].find((el) => el.classList.contains('setting') && nameOf(el) === name);
  function extraRows(node) {
    itemsEl = node;
    const settingRows = () => [...node.children].filter((el) => el.classList.contains('setting'));
    if (!menued) {
      for (const el of node.querySelectorAll(`:scope > [${HIDDEN}]`)) el.removeAttribute(HIDDEN);
      extraRowsNow = { hidden: [], shown: [] };
      return;
    }
    void revealed;
    const apply = () => untrack(() => {
      const hidden = [];
      const shown = [];
      settingRows().forEach((el, i) => {
        const name = nameOf(el);
        if (el.matches('[data-own]') || el.querySelector('[data-own]')) folds.show(surface, id, name);
        const stands = i === 0;
        const keep = stands || folds.isShown(surface, id, name);
        el.toggleAttribute(HIDDEN, !keep);
        if (!stands) (keep ? shown : hidden).push([name, wordsOf(el)]);
      });
      extraRowsNow = { hidden, shown };
    });
    apply();
    // A row that comes, goes or comes to hold a value of its own is read again; the attribute this pass sets is not watched.
    const watcher = new MutationObserver(apply);
    watcher.observe(node, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-own'] });
    return () => watcher.disconnect();
  }
  const anyExtra = $derived(extraRowsNow.hidden.length + extraRowsNow.shown.length > 0);

  /** The rows the owner added from the list, by name in the order added, and each one's props as the row hands them over to be drawn at the foot (Setting.svelte). */
  const placedNames = $derived.by(() => {
    void revealed;
    return menued ? folds.addedIn(surface, id) : [];
  });
  const placedRows = new SvelteMap();
  setContext('fold-rows', {
    placedAt: (name) => placedNames.indexOf(name),
    place: (name, row) => placedRows.set(name, row),
    unplace: (name) => placedRows.delete(name),
    nameOf,
  });

  /* The chip opens its list at a press, or as a mouse rests on it or on the list; a pointer that leaves both closes it a moment later. */
  let hoverTimer = null;
  let openedByHover = false;
  // A timer still running as the fold goes away does nothing.
  $effect(() => () => clearTimeout(hoverTimer));
  function hoverIn(event) {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer);
    if (extraOpen) return;
    hoverTimer = setTimeout(() => {
      extraOpen = true;
      openedByHover = true;
      tick().then(() => followOpen(extraPop?.closest('.menu-group-foot')));
    }, 120);
  }
  function hoverOut(event) {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer);
    if (!openedByHover) return;
    hoverTimer = setTimeout(() => {
      if (extraPop?.contains(document.activeElement)) return;
      extraOpen = false;
      openedByHover = false;
    }, 250);
  }

  /** A press on the chip opens the list with the focus on its first row, or brings the focus into a list a mouse opened; a second press closes it. */
  async function toggleExtra() {
    clearTimeout(hoverTimer);
    if (extraOpen && !openedByHover) {
      extraOpen = false;
      return;
    }
    extraOpen = true;
    openedByHover = false;
    await tick();
    extraPop?.querySelector('button')?.focus({ preventScroll: true });
    followOpen(extraPop?.closest('.menu-group-foot'));
  }

  /** The arrow keys move between the rows to add and take away, and Escape closes the list and gives the focus back to the chip. */
  function extraKeys(event) {
    const items = [...(extraPop?.querySelectorAll('button') ?? [])];
    const at = items.indexOf(document.activeElement);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      items[(at + (event.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length]?.focus();
    }
  }

  /** A row added from the list: shown for the session at the foot of the fold, the list closed, and the focus on the row's own control. */
  async function reveal(name) {
    folds.show(surface, id, name, { added: true });
    extraOpen = false;
    revealed += 1;
    // The row moves to the foot as its place there is read, then takes the focus.
    await tick();
    await tick();
    const control = settingRow(name)?.querySelector('input, button, [tabindex="0"]');
    (control ?? extraBtn)?.focus();
  }

  /** A row taken away from the list: its value back to the standard, then hidden again, the list closed and the focus on the chip. */
  async function takeAway(name) {
    const row = settingRow(name);
    if (row?.matches('[data-own]')) {
      row.dispatchEvent(new CustomEvent('setting-back'));
      await tick();
    }
    folds.hide(surface, id, name);
    extraOpen = false;
    revealed += 1;
    await tick();
    extraBtn?.focus();
  }
  // A fold that was bare and gains a second setting opens where it stands.
  let wasBare = false;
  $effect.pre(() => {
    if (!folded) wasBare = true;
    else if (wasBare) {
      wasBare = false;
      folds.set(surface, id, true);
    }
  });
  const groupReset = $derived(group ? group.reset : reset);
  /** Whether the small window's head holds this fold's way back. */
  const inHead = $derived(head?.only === `fold:${id}`);
  const headOwner = Symbol('fold');
  $effect(() => {
    if (!inHead) return;
    head.offer(headOwner, folded ? groupReset : null);
    return () => head.withdraw(headOwner);
  });
  const footReset = $derived(Boolean(groupReset) && folded && !inHead);
  $effect(() => {
    if (!folded) return;
    area?.register(id);
    return () => area?.unregister(id);
  });
  setContext('menu-group', {
    own: (key) => Boolean(group?.own(key)),
    resetKey: (key) => group?.resetKey(key),
  });
</script>

{#if rows !== 0}
  <details class="group menu-group" data-fold={id} data-fold-group={oneGroup} name={exclusive} class:bare={!folded} open={!folded || folds.isOpen(surface, id)}
    ontoggle={(e) => {
      if (e.currentTarget.closest('.emenu-search')) return;
      ontoggle?.(e.currentTarget.open);
      if (folded) folds.set(surface, id, e.currentTarget.open);
    }}>
    <!-- A fold the owner opens by its heading is followed into view as it opens (lib/follow-open.js); one opened by «All open» or a tool of the bar is not -->
    <summary title={tip} onclick={(e) => { const fold = e.currentTarget.parentElement; if (!fold.open && !fold.closest('.emenu-search')) followOpen(fold); }}><span class="menu-group-title">{title}</span>{#if typeof value === 'function'}<span class="menu-group-value mark">{@render value()}</span>{:else}<span class="menu-group-value">{value}</span>{/if}</summary>
    <div class="group-items" {@attach extraRows}>
      {@render children()}
      {#each placedNames as name (name)}
        {@const row = placedRows.get(name)}
        {#if row}<Setting key={row.key} source={row.source} pin={row.pin} own={row.own} reset={row.reset} more={row.more} children={row.children} atFoot />{/if}
      {/each}
      {#if anyExtra || footReset}
        <!-- The fold's foot: the settings to add and take away, and the way back for the whole group; Escape in the list closes it, and goes no further -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="menu-group-foot" onkeydown={(e) => { if (e.key === 'Escape' && extraOpen) { e.stopPropagation(); extraOpen = false; openedByHover = false; extraBtn?.focus(); } }}>
          <div class="menu-group-foot-line">
            {#if anyExtra}
              {@const adds = extraRowsNow.hidden.length > 0}
              <button type="button" class="menu-extra" bind:this={extraBtn} aria-expanded={extraOpen} onclick={toggleExtra} onpointerenter={hoverIn} onpointerleave={hoverOut}>{@html adds ? ICONS.plus : ICONS.minus}<span>{ta(adds ? 'menu.addSetting' : 'menu.removeSetting')}</span></button>
            {/if}
            {#if footReset}
              <button type="button" class="linkish menu-group-reset" onclick={groupReset}>{ta('menu.reset')}</button>
            {/if}
          </div>
          {#if extraOpen && anyExtra}
            <!-- The rows to add, then those added, which a press takes away again -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="menu-extra-list" bind:this={extraPop} onkeydown={extraKeys} onpointerenter={hoverIn} onpointerleave={hoverOut} transition:rowMotion>
              {#if extraRowsNow.hidden.length}
                <div class="menu-extra-part" role="group" aria-label={ta('menu.addSetting')}>
                  {#each extraRowsNow.hidden as [name, text] (name)}
                    <button type="button" class="menu-extra-opt" onclick={() => reveal(name)}>{@html ICONS.plus}<span>{text}</span></button>
                  {/each}
                </div>
              {/if}
              {#if extraRowsNow.shown.length}
                <div class="menu-extra-part" role="group" aria-label={ta('menu.removeSetting')}>
                  {#each extraRowsNow.shown as [name, text] (name)}
                    <button type="button" class="menu-extra-opt taken" onclick={() => takeAway(name)}>{@html ICONS.minus}<span>{text}</span></button>
                  {/each}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </details>
{/if}
