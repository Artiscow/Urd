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
     «Extra settings» as a menu hides the fold's setting rows (Setting.svelte) but the first and those with a value of their own, and lists the rest by their words behind a ⋮ at the fold's top; a row once shown, or once holding a value of its own, stays shown for the session (lib/folds.svelte.js). A row that is no setting row is always shown. */
  import { getContext, setContext, tick, untrack } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { folds } from '../folds.svelte.js';
  import { menu } from '../../menu/state.svelte.js';
  import { ICONS } from '../icons.js';
  import { dismiss } from '../dismiss.js';
  import { menuMotion } from '../motion.svelte.js';
  import IconButton from './IconButton.svelte';
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
  const exclusive = $derived(inMenu && folded && menu.foldsPref === 'one' ? area.group : undefined);

  /* «Extra settings» as a menu. */
  const menued = $derived(inMenu && folded && menu.extraPref === 'menu');
  let hiddenRows = $state([]);
  /** Counts the rows shown from the ⋮, so the rows are read again after each. */
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
  function extraRows(node) {
    itemsEl = node;
    const settingRows = () => [...node.children].filter((el) => el.classList.contains('setting'));
    if (!menued) {
      for (const el of node.querySelectorAll(`:scope > [${HIDDEN}]`)) el.removeAttribute(HIDDEN);
      hiddenRows = [];
      return;
    }
    void revealed;
    const apply = () => untrack(() => {
      const list = [];
      settingRows().forEach((el, i) => {
        const name = nameOf(el);
        if (el.querySelector('.setting-reset')) folds.show(surface, id, name);
        const keep = i === 0 || folds.isShown(surface, id, name);
        el.toggleAttribute(HIDDEN, !keep);
        if (!keep) list.push([name, wordsOf(el)]);
      });
      hiddenRows = list;
    });
    apply();
    // A row that comes or goes, or gains its reset, is read again; the attribute set here is not watched, so the pass does not call itself.
    const watcher = new MutationObserver(apply);
    watcher.observe(node, { childList: true, subtree: true });
    return () => watcher.disconnect();
  }

  /** The ⋮ opens its list with the focus on the first row to add. */
  async function toggleExtra() {
    extraOpen = !extraOpen;
    if (!extraOpen) return;
    await tick();
    extraPop?.querySelector('button')?.focus();
  }

  /** The arrow keys move between the rows to add, and Escape closes the list and gives the focus back to the ⋮. */
  function extraKeys(event) {
    const items = [...(extraPop?.querySelectorAll('button') ?? [])];
    const at = items.indexOf(document.activeElement);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      items[(at + (event.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length]?.focus();
    }
  }

  /** A row added from the ⋮: shown for the session, the list closed, and the focus on the row's own control. */
  async function reveal(name) {
    folds.show(surface, id, name);
    extraOpen = false;
    revealed += 1;
    await tick();
    const row = [...(itemsEl?.children ?? [])].find((el) => el.classList.contains('setting') && nameOf(el) === name);
    const control = row?.querySelector('input, button, [tabindex="0"]');
    (control ?? extraBtn)?.focus();
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
      {#if hiddenRows.length}
        <!-- Escape on the ⋮ while its list stands open closes the list, and goes no further -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="menu-extra" onkeydown={(e) => { if (e.key === 'Escape' && extraOpen) { e.stopPropagation(); extraOpen = false; extraBtn?.focus(); } }}>
          <IconButton size="sm" quiet bind:el={extraBtn} icon={ICONS.kebab} label={ta('menu.addSetting')} expanded={extraOpen} onclick={toggleExtra} />
          {#if extraOpen}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="menu-extra-pop" bind:this={extraPop} use:dismiss={{ close: () => (extraOpen = false), opener: extraBtn }} onkeydown={extraKeys} transition:menuMotion>
              {#each hiddenRows as [name, text] (name)}
                <button type="button" class="menu-extra-opt" onclick={() => reveal(name)}>{@html ICONS.plus}<span>{text}</span></button>
              {/each}
            </div>
          {/if}
        </div>
      {/if}
      {@render children()}
      {#if groupReset && folded}
        <button type="button" class="linkish menu-group-reset" onclick={groupReset}>{ta('menu.reset')}</button>
      {/if}
    </div>
  </details>
{/if}
