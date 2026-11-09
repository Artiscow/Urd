<script>
  /* One setting's row in a group (0.7.20.7, proposal M on the Design canvas): the control, with a reset beside it while the setting holds the block's own value; a value it falls back to is what the control shows, with no words of its own about where it comes from.
     A row whose control is a switch (SwitchRow) has no reset: the switch is its own way back. The row still says it holds a value of its own (`data-own`), where «Extra settings» reads it (Fold.svelte).
     The group's defaults come through the fold's context (Fold.svelte), so a row needs only its key.
     A setting that can stand in the element menu's Pinned rows carries its `pin`: the pin stands at the row's end, and while the setting is pinned the row is drawn in Pinned at the top instead of here, so it stands once (0.7.30.3, menu/PinScope.svelte tells which are).
     A small window that holds this setting alone (`look:<pin>`, lib/only-group.js) has the reset in its head instead (menu/FloatingMenu.svelte).
     What belongs to the setting and shows with some of its values (`more`) stands under the setting's line, in the same row, so it comes and goes with it.
     The way back is an undo step of its own (asOwnStep in state/history.svelte.js), never joined to the change before it. */
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
  /** `key` is the prop the row sets; `source` names where the value comes from when the block has none ('theme' or 'default'), which the reset's words follow; `pin` is the setting's id in the Pinned rows.
      A row outside a fold says itself whether it holds the block's own value (`own`) and how it goes back (`reset`). */
  let { key = null, source = 'default', pin = null, own: ownValue = undefined, reset = undefined, children, more = undefined } = $props();
  const own = $derived(ownValue ?? (Boolean(key) && group?.own(key)));
  const away = $derived(pinned.has(pin));
  /* A switch in the row tells it so as it is drawn, before the reset is (SwitchRow.svelte); a row's controls are the same for as long as it stands. */
  const row = { switch: false };
  setContext('setting-row', { switched: () => { row.switch = true; } });
  const goBack = () => (reset ? reset() : group.resetKey(key));
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

{#if !away}
  <div class="setting" data-pin={pin ?? undefined} data-setting={key ?? pin ?? undefined} data-own={own ? '' : undefined} {@attach backOnAsk}>
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
    {#if own && !row.switch && !inHead}
      <IconButton size="sm" quiet class="setting-reset" icon={ICONS.reset} label={ta(source === 'theme' ? 'menu.resetTheme' : 'menu.resetSetting')}
        onclick={() => historyState.asOwnStep(goBack)} />
    {/if}
  </div>
{/if}
