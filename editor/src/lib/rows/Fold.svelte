<script>
  /* The fold of the row kit (0.7.30.2): the title, the current value while closed, the controls inside.
     A fold that differs from the defaults is handed its reset, which stands under its controls; what was changed is told in the History panel, not marked on the fold.
     In the search's copy of the element menu a fold opens where it holds a match, and what is kept open stays as it was left (lib/folds.svelte.js, by the surface the fold stands in).
     A fold that is the only one in its area starts open (defaultOpen): the heading is still a menu, but the settings are one step nearer.
     Where the family tells how many settings the fold holds now (`rows`), a fold of none is not drawn and a fold of one is drawn bare, its setting alone with its own reset: a group of one setting is no group.
     A bare fold keeps its markup, so the setting stays where it is when a second one joins; the fold then stands open, with the setting just changed in sight.
     In a panel the fold carries its id as `data-fold`, where the tab's menu finds it (lib/panel-folds.js), and `surface` is the panel's name; `ontoggle(open)` hears it open and close, and `tip` explains on its heading what it holds; `value` is words, or a snippet for a value drawn as a mark (the Legal panel's chips).
     The element menu's folds follow the Urd settings' «Folds» and «Extra settings» (menu/state.svelte.js); the folds of a panel and of the search's copy of the menu, which stand in no area, do not.
     «One at a time» gives the folds of one area a name of their own (MenuArea.svelte), so the browser closes the others as one opens (`details name`, ADR-0011); «All open» opens every fold on its first showing after each choice of it.
     «Extra settings» as a menu hides the fold's setting rows (Setting.svelte) but the first and those with a value of their own, and lists the rest by their words behind a chip in the fold's foot, beside its reset, where the list opens in place under the rows; a row once shown, or once holding a value of its own, stays shown for the session (lib/folds.svelte.js), until the same list takes it away again, its value back to the standard. A row that is no setting row is always shown.
     A small window of one group (`fold:<id>`, lib/only-group.js) shows every row of it, and holds the fold's reset in its head (menu/FloatingMenu.svelte). */
  import { getContext, setContext, tick, untrack } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { folds } from '../folds.svelte.js';
  import { menu } from '../../menu/state.svelte.js';
  import { ICONS } from '../icons.js';
  import { rowMotion } from '../motion.svelte.js';
  /* `group` (groupOf in menu/groups.js) carries the defaults as well as the reset, so the Setting rows inside can offer the way back from the block's own values (0.7.20.7). */
  let { id, title, value, tip = undefined, reset = null, group = null, rows = undefined, defaultOpen = false, surface = 'menu', ontoggle = undefined, children } = $props();
  const folded = $derived(rows === undefined || rows > 1);
  // The area's heading counts its groups (MenuArea); the area also names the group its folds open one at a time in.
  const area = getContext('menu-area');
  /** Whether the element menu's own choices reach this fold: a fold in an area of a menu drawn for a block or a section. */
  const inMenu = $derived(surface === 'menu' && Boolean(area));
  // Before the fold is drawn, so a fold that starts open is drawn open; with «All open» every fold does, again after each choice of it.
  $effect.pre(() => {
    if (defaultOpen) folds.openOnce(surface, id);
    if (inMenu && menu.foldsPref === 'all') folds.openOnce(surface, id, `all-${menu.foldsRound}`);
  });
  // A small window of one group (ElementMenu.svelte `only`, menu/FloatingMenu.svelte) leaves the folds apart, so a group left open in the full menu never closes the one the window opens.
  const onlyPanel = getContext('menu-only');
  const head = getContext('menu-head');
  const small = $derived(Boolean(onlyPanel?.only || head?.only));
  const exclusive = $derived(inMenu && folded && menu.foldsPref === 'one' && !small ? area.group : undefined);

  /* «Extra settings» as a menu, in the full menu only. */
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
        const keep = i === 0 || folds.isShown(surface, id, name);
        el.toggleAttribute(HIDDEN, !keep);
        if (i > 0) (keep ? shown : hidden).push([name, wordsOf(el)]);
      });
      extraRowsNow = { hidden, shown };
    });
    apply();
    // A row that comes or goes, or comes to hold a value of its own (an undo, a paste, the other copy of the menu), is read again; the attribute set here is not watched, so the pass does not call itself.
    const watcher = new MutationObserver(apply);
    watcher.observe(node, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-own'] });
    return () => watcher.disconnect();
  }
  const anyExtra = $derived(extraRowsNow.hidden.length + extraRowsNow.shown.length > 0);

  /* The chip opens its list at a press, and under a mouse as the pointer rests on it or on the list; a pointer that leaves both closes it a moment later.
     A touch is no hover (AGENTS.md, hybrid devices), so only a mouse opens it so. */
  let hoverTimer = null;
  let openedByHover = false;
  function hoverIn(event) {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer);
    if (extraOpen) return;
    hoverTimer = setTimeout(() => { extraOpen = true; openedByHover = true; }, 120);
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

  /** A press on the chip opens the list with the focus on its first row, or brings the focus into a list the pointer opened; a press on a list it opened closes it. */
  async function toggleExtra() {
    clearTimeout(hoverTimer);
    if (extraOpen && !openedByHover) {
      extraOpen = false;
      return;
    }
    extraOpen = true;
    openedByHover = false;
    await tick();
    extraPop?.querySelector('button')?.focus();
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

  /** A row added from the list: shown for the session, the list closed, and the focus on the row's own control. */
  async function reveal(name) {
    folds.show(surface, id, name);
    extraOpen = false;
    revealed += 1;
    await tick();
    const control = settingRow(name)?.querySelector('input, button, [tabindex="0"]');
    (control ?? extraBtn)?.focus();
  }

  /** A row taken away from the list: its value back to the standard, as its own way back does (Setting.svelte), then hidden again, the list closed and the focus on the chip. */
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
  <details class="group menu-group" data-fold={id} name={exclusive} class:bare={!folded} open={!folded || folds.isOpen(surface, id)}
    ontoggle={(e) => {
      if (e.currentTarget.closest('.emenu-search')) return;
      ontoggle?.(e.currentTarget.open);
      if (folded) folds.set(surface, id, e.currentTarget.open);
    }}>
    <summary title={tip}><span class="menu-group-title">{title}</span>{#if typeof value === 'function'}<span class="menu-group-value mark">{@render value()}</span>{:else}<span class="menu-group-value">{value}</span>{/if}</summary>
    <div class="group-items" {@attach extraRows}>
      {@render children()}
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
