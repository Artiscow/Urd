<script>
  /* The Legal tab of the strip under the top bar (PanelStrip, «top-tabs»), with its menu: one button, which opens the panel on a click as any tab does; a mouse resting on it opens a menu of the panel's groups with their states, which slides in and out, and a row opens the panel at its group.
     From the keyboard the down and up arrows on the tab open the menu at its first or last row and move through the rows, and Escape closes it and returns to the tab. Hover counts only for a mouse, so a tap on a touch screen opens the panel, where every group stands. */
  import { getContext, tick } from 'svelte';
  import { menuMotion } from '../lib/motion.svelte.js';
  import { ta } from '$engine/i18n.js';
  import { LEGAL_GROUPS, groupChip } from '../lib/legal-model.js';
  import { ICONS } from '../lib/icons.js';
  const ed = getContext('urd-editor');

  let open = $state(false);
  let wrap = $state(null);
  let tab = $state(null);
  let timer = null;

  /** The rows: the panel's groups, Terms of sale only where the panel shows it. */
  const groups = $derived(LEGAL_GROUPS.filter((g) => g !== 'terms' || ed.legal?.terms.shown));

  /** Opens or closes after a moment: a mouse passing over the tab opens nothing, and one on its way down into the menu, or leaving it on a slant, does not close it. */
  function soon(next, ms) {
    clearTimeout(timer);
    timer = setTimeout(() => { open = next; }, ms);
  }

  function now(next) {
    clearTimeout(timer);
    open = next;
  }

  $effect(() => () => clearTimeout(timer));

  // A press outside the tab and its menu closes the menu.
  $effect(() => {
    if (!open) return;
    const away = (event) => { if (!wrap?.contains(event.target)) now(false); };
    window.addEventListener('pointerdown', away, true);
    return () => window.removeEventListener('pointerdown', away, true);
  });

  function pick(group) {
    now(false);
    ed.openPanel('legal', { legal: group });
  }

  /** The down and up arrows open the menu and move through its rows; Escape closes it and returns to the tab. */
  async function keys(event) {
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
      now(true);
      await tick();
    }
    const rows = [...(wrap?.querySelectorAll('.legal-menu button') ?? [])];
    if (!rows.length) return;
    const at = rows.indexOf(document.activeElement);
    const step = event.key === 'ArrowDown' ? 1 : -1;
    const next = at < 0 ? (step > 0 ? 0 : rows.length - 1) : (at + step + rows.length) % rows.length;
    rows[next].focus();
  }
</script>

{#snippet chip(group)}
  {@const c = groupChip(group, ed.legal)}
  <span class="legal-chip" class:warn={c.tone === 'warn'}>{#if c.tone === 'ok'}{@html ICONS.check}{/if}{ta(c.key, { n: c.n })}</span>
{/snippet}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span class="legal-tab" bind:this={wrap}
  onpointerenter={(e) => { if (e.pointerType === 'mouse') soon(true, 180); }}
  onpointerleave={(e) => { if (e.pointerType === 'mouse') soon(false, 280); }}
  onkeydown={keys}
  onfocusout={(e) => { if (!wrap?.contains(e.relatedTarget)) now(false); }}>
  <button type="button" class="panel-tab" class:active={ed.activePanel === 'legal'} class:menu-open={open} bind:this={tab}
    aria-pressed={ed.activePanel === 'legal'} aria-keyshortcuts="ArrowDown" aria-expanded={open} aria-controls={open ? 'legal-strip-menu' : undefined}
    onclick={() => { now(false); ed.togglePanel('legal'); }}>{ed.PANEL_LABELS.legal}{#if ed.legal?.dot}<span class="update-dot update-dot-inline legal-dot" role="img" aria-label={ta('legal.dotLabel')}></span>{/if}<span class="legal-tab-caret" aria-hidden="true">{@html ICONS.caret}</span></button>
  {#if open && ed.legal}
    <!-- A press on a row keeps the focus where it is, so a browser that does not focus a pressed button never closes the menu under the click (the focusout above) -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div class="legal-menu" id="legal-strip-menu" role="group" aria-label={ta('tip.legal.menu')} transition:menuMotion onmousedown={(e) => e.preventDefault()}>
      {#each groups as group (group)}
        <button type="button" onclick={() => pick(group)}><span class="legal-menu-name">{ta(`legal.group.${group}`)}</span>{@render chip(group)}</button>
      {/each}
    </div>
  {/if}
</span>
