<script>
  /* A panel's tab, in the strip under the top bar and in the panel's own tabs (PanelStrip, PanelNav): one button, which opens the panel on a click.
     A panel with folds (lib/panel-folds.js) has an arrow close after its name and a menu of the folds: a mouse resting on the tab, or the down arrow key on it, opens the menu, and a row opens the panel with that fold alone unfolded, or presses the fold's one button where that is all it holds. The menu stands in the top layer, placed under the tab, so a narrow panel never clips it, and it slides in and out.
     The rows are set apart as the Urd settings' «Tab menus» chooses: in short groups under small labels (the default), with a hairline between them, or as a plain list. A row that presses a button carries that button's mark.
     The arrow keys move through the rows, and Escape closes the menu and returns to the tab. Hover counts only for a mouse, so a tap on a touch screen opens the panel, where every fold stands.
     The Legal tab carries an amber dot on its name's corner while something the law asks for is missing, and the same dot on the rows that need looking at (lib/legal-model.js). */
  import { getContext, tick } from 'svelte';
  import { menuMotion } from '../lib/motion.svelte.js';
  import { ta } from '$engine/i18n.js';
  import { panelFolds, foldGroups } from '../lib/panel-folds.js';
  import { groupChip } from '../lib/legal-model.js';
  import { ICONS } from '../lib/icons.js';
  const ed = getContext('urd-editor');
  let { name } = $props();

  /** The folds the menu lists: those the panel draws now, and a menu only where there is a choice of two or more. */
  const folds = $derived(panelFolds(name, { site: ed.siteDraft, legal: ed.legal }));
  const hasMenu = $derived(folds.length > 1);
  const menuId = $derived(`panel-tab-menu-${name}`);
  const updateDot = $derived(name === 'update' && ed.updateNotice === 'dot');
  /** The rows as the «Tab menus» setting sets them apart: in their groups under small labels, or as one run with or without lines. */
  const groups = $derived(ed.tabMenus === 'groups' ? foldGroups(folds) : [{ label: null, folds }]);


  let open = $state(false);
  let wrap = $state(null);
  let tab = $state(null);
  let list = $state(null);
  let pos = $state({ top: 0, left: 0 });
  let timer = null;

  /** Opens or closes after a moment: a mouse passing over the tab opens nothing, and one on its way down into the menu, or leaving it on a slant, does not close it. */
  function soon(next, ms) {
    clearTimeout(timer);
    timer = setTimeout(() => setOpen(next), ms);
  }

  function now(next) {
    clearTimeout(timer);
    setOpen(next);
  }

  /** The menu placed under the tab, kept inside the window at its right edge. */
  async function setOpen(next) {
    if (next && !open && tab) {
      const r = tab.getBoundingClientRect();
      pos = { top: r.bottom, left: r.left };
    }
    open = next;
    if (!next) return;
    await tick();
    const width = list?.offsetWidth ?? 0;
    if (pos.left + width > window.innerWidth - 8) pos = { ...pos, left: Math.max(8, window.innerWidth - width - 8) };
  }

  $effect(() => () => clearTimeout(timer));

  // A press outside the tab and its menu closes the menu; a scroll that moves the tab takes the menu along under it, and one that takes the tab out of sight closes it.
  // A menu kept open after a pick (Urd settings «After a pick») stays where it stands while the mouse is on it, as a pick scrolls the panel the tab may stand in.
  $effect(() => {
    if (!open) return;
    const away = (event) => { if (!wrap?.contains(event.target)) now(false); };
    const scrolled = (event) => {
      if (list?.contains(event.target) || !tab) return;
      if (ed.tabMenuStay === 'stay' && wrap?.matches(':hover')) return;
      const r = tab.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) {
        now(false);
        return;
      }
      const width = list?.offsetWidth ?? 0;
      pos = { top: r.bottom, left: Math.max(8, Math.min(r.left, window.innerWidth - width - 8)) };
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

  /** The down and up arrows open the menu and move through its rows; Escape closes it and returns to the tab. */
  async function keys(event) {
    if (!hasMenu) return;
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      event.stopPropagation();
      now(false);
      tab?.focus();
      return;
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    if (!open) {
      await setOpen(true);
      clearTimeout(timer);
    }
    const rows = [...(list?.querySelectorAll('button') ?? [])];
    if (!rows.length) return;
    const at = rows.indexOf(document.activeElement);
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
  {#if name === 'legal' && ed.legal?.dot}<span class="tab-menu-dot" role="img" aria-label={ta('legal.dotLabel')}></span>{/if}
{/snippet}

{#if hasMenu}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <span class="tab-menu" bind:this={wrap}
    onpointerenter={(e) => { if (e.pointerType === 'mouse') soon(true, 180); }}
    onpointerleave={(e) => { if (e.pointerType === 'mouse') soon(false, 280); }}
    onkeydown={keys}
    onfocusout={(e) => { if (!wrap?.contains(e.relatedTarget) && !(ed.tabMenuStay === 'stay' && wrap?.matches(':hover'))) now(false); }}>
    <button type="button" class="panel-tab" class:active={ed.activePanel === name} class:menu-open={open} bind:this={tab}
      aria-pressed={ed.activePanel === name} aria-keyshortcuts="ArrowDown" aria-expanded={open} aria-controls={open ? menuId : undefined}
      onclick={() => { now(false); ed.togglePanel(name); }}><span class="tab-menu-word">{ed.PANEL_LABELS[name]}{@render dots()}</span><span class="tab-menu-caret" aria-hidden="true">{@html ICONS.caret}</span></button>
    {#if open}
      <!-- A press on a row keeps the focus where it is, so a browser that does not focus a pressed button never closes the menu under the click (the focusout above) -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div class="tab-menu-list" class:lines={ed.tabMenus === 'lines'} id={menuId} popover="manual" role="group" aria-label={ta('tip.panelTab.menu', { panel: ed.PANEL_LABELS[name] })}
        style="top: {pos.top}px; left: {pos.left}px" bind:this={list} use:topLayer transition:menuMotion onmousedown={(e) => e.preventDefault()}>
        {#each groups as group, gi (gi)}
          <div class="tab-menu-group" role="group" aria-label={group.label ? ta(group.label) : undefined}>
            {#if group.label}<span class="tab-menu-label" aria-hidden="true">{ta(group.label)}</span>{/if}
            {#each group.folds as fold (fold.id)}
              <!-- A row that presses its fold's one button carries that button's mark -->
              <button type="button" onclick={() => pick(fold)}><span class="tab-menu-name">{ta(fold.key)}</span>{@render mark(fold.id)}{#if fold.icon}<span class="tab-menu-act" role="img" aria-label={ta('tip.panelTab.press')}>{@html ICONS[fold.icon]}</span>{/if}</button>
            {/each}
          </div>
        {/each}
      </div>
    {/if}
  </span>
{:else}
  <button type="button" class="panel-tab" class:active={ed.activePanel === name} aria-pressed={ed.activePanel === name}
    title={updateDot ? ta('tip.updateOut', { version: ed.updateTarget }) : undefined}
    onclick={() => ed.togglePanel(name)}><span class="tab-menu-word">{ed.PANEL_LABELS[name]}{@render dots()}</span>{#if updateDot}<span class="update-dot update-dot-inline" aria-hidden="true"></span>{/if}</button>
{/if}
