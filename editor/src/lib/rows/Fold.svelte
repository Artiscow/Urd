<script>
  /* The fold of the row kit (0.7.30.2): the title, the current value while closed, the controls inside.
     A fold that differs from the defaults is handed its reset: it carries a mark, and the reset stands under its controls.
     In the search's copy of the element menu a fold opens where it holds a match, and what is kept open stays as it was left (lib/folds.svelte.js, by the surface the fold stands in).
     A fold that is the only one in its area starts open (defaultOpen): the heading is still a menu, but the settings are one step nearer.
     Where the family tells how many settings the fold holds now (`rows`), a fold of none is not drawn and a fold of one is drawn bare, its setting alone with its own mark and reset: a group of one setting is no group.
     A bare fold keeps its markup, so the setting stays where it is when a second one joins; the fold then stands open, with the setting just changed in sight.
     In a panel the fold carries its id as `data-fold`, where the tab's menu finds it (lib/panel-folds.js), and `surface` is the panel's name; `ontoggle(open)` hears it open and close, and `tip` explains on its heading what it holds; `value` is words, or a snippet for a value drawn as a mark (the Legal panel's chips). */
  import { getContext, setContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { folds } from '../folds.svelte.js';
  /* `group` (groupOf in menu/groups.js) carries the defaults as well as the reset, so the Setting rows inside can mark the block's own values (0.7.20.7). */
  let { id, title, value, tip = undefined, reset = null, group = null, rows = undefined, defaultOpen = false, surface = 'menu', ontoggle = undefined, children } = $props();
  const folded = $derived(rows === undefined || rows > 1);
  // Before the fold is drawn, so a fold that starts open is drawn open.
  $effect.pre(() => {
    if (defaultOpen) folds.openOnce(surface, id);
  });
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
  // The area's heading counts its groups and the changed ones among them (MenuArea).
  const area = getContext('menu-area');
  $effect(() => {
    if (!folded) return;
    area?.register(id, () => Boolean(groupReset));
    return () => area?.unregister(id);
  });
  setContext('menu-group', {
    own: (key) => Boolean(group?.own(key)),
    resetKey: (key) => group?.resetKey(key),
  });
</script>

{#if rows !== 0}
  <details class="group menu-group" data-fold={id} class:bare={!folded} open={!folded || folds.isOpen(surface, id)}
    ontoggle={(e) => {
      if (e.currentTarget.closest('.emenu-search')) return;
      ontoggle?.(e.currentTarget.open);
      if (folded) folds.set(surface, id, e.currentTarget.open);
    }}>
    <summary title={tip}><span class="menu-group-title">{title}{#if groupReset}<i class="menu-group-dot" aria-hidden="true"></i>{/if}</span>{#if typeof value === 'function'}<span class="menu-group-value mark">{@render value()}</span>{:else}<span class="menu-group-value">{value}</span>{/if}</summary>
    <div class="group-items">
      {@render children()}
      {#if groupReset && folded}
        <button type="button" class="linkish menu-group-reset" onclick={groupReset}>{ta('menu.reset')}</button>
      {/if}
    </div>
  </details>
{/if}
