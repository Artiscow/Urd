<script>
  /* One setting's row in a group: the control, and a reset beside it while the setting holds a value of its own (`data-own`).
     A pinned setting is drawn in Pinned. */
  import { getContext, setContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import Pin from '../../menu/Pin.svelte';
  import IconButton from './IconButton.svelte';
  import { ICONS } from '../icons.js';
  import { pinnedNow } from '../../menu/pinned.js';
  import { historyState } from '../../state/history.svelte.js';
  const group = getContext('menu-group');
  const head = getContext('menu-head');
  const pinned = pinnedNow();
  /** `key` is the prop set, `source` where a missing value comes from, `pin` the id in Pinned; a row outside a fold gives its own `own` and `reset`. */
  let { key = null, source = 'default', pin = null, own: ownValue = undefined, reset = undefined, children, more = undefined, atFoot = false } = $props();
  const foldRows = getContext('fold-rows');
  /** The row's name in its fold's list, read once the row is drawn among the fold's own rows; null for a row drawn elsewhere. */
  let name = $state(null);
  const toFoot = $derived(!atFoot && name !== null && foldRows.placedAt(name) >= 0);
  $effect(() => {
    if (!toFoot) return;
    const held = name;
    foldRows.place(held, {
      get key() { return key; }, get source() { return source; }, get pin() { return pin; }, get own() { return ownValue; },
      get reset() { return reset; }, get more() { return more; }, get children() { return children; },
    });
    return () => foldRows.unplace(held);
  });
  /** Reads the row's name where it stands among its fold's rows. */
  function named(node) {
    if (atFoot || name !== null || !foldRows || !node.parentElement?.classList.contains('group-items')) return;
    name = foldRows.nameOf(node);
  }
  const own = $derived(ownValue ?? (Boolean(key) && group?.own(key)));
  const away = $derived(pinned.has(pin));
  /* A switch or a colour in the row tells it so as it is drawn, before the reset is, and the row then draws no reset of its own. */
  const row = { switch: false, colour: false };
  const goBack = () => (reset ? reset() : group.resetKey(key));
  setContext('setting-row', {
    switched: () => { row.switch = true; },
    coloured: () => { row.colour = true; },
    own: () => own,
    back: () => historyState.asOwnStep(goBack),
  });
  /** Whether the small window's head holds this row's way back. */
  const inHead = $derived(Boolean(pin) && head?.only === `look:${pin}`);
  const headOwner = Symbol('setting');
  $effect(() => {
    if (!inHead) return;
    head.offer(headOwner, own ? goBack : null);
    return () => head.withdraw(headOwner);
  });
  /** A fold that takes this row away from its list asks for the row's way back first (Fold.svelte), an undo step of its own. */
  function backOnAsk(node) {
    const back = () => { if (own) historyState.asOwnStep(goBack); };
    node.addEventListener('setting-back', back);
    return () => node.removeEventListener('setting-back', back);
  }
</script>

{#if !away && !toFoot}
  <div class="setting" data-pin={pin ?? undefined} data-setting={key ?? pin ?? undefined} data-own={own ? '' : undefined} {@attach backOnAsk} {@attach named}>
    <div class="setting-body">
      {#if pin && pinned.pins()}
        <div class="pin-line">
          {@render children()}
          <Pin id={pin} />
        </div>
      {:else}
        {@render children()}
      {/if}
      {#if more}{@render more()}{/if}
    </div>
    {#if own && !row.switch && !row.colour && !inHead}
      <IconButton size="sm" quiet class="setting-reset" icon={ICONS.reset} label={ta(source === 'theme' ? 'menu.resetTheme' : 'menu.resetSetting')}
        onclick={() => historyState.asOwnStep(goBack)} />
    {/if}
  </div>
{/if}
