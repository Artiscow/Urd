<script>
  /* One setting's row in a group (0.7.20.7, proposal M on the Design canvas): the control, with a reset beside it while the setting holds the block's own value; a value it falls back to is what the control shows, with no words of its own about where it comes from.
     The group's defaults come through the fold's context (Fold.svelte), so a row needs only its key.
     A setting that can stand in the element menu's Pinned rows carries its `pin`: the pin stands at the row's end, and while the setting is pinned the row is drawn in Pinned at the top instead of here, so it stands once (0.7.30.3, menu/PinScope.svelte tells which are).
     What belongs to the setting and shows with some of its values (`more`) stands under the setting's line, in the same row, so it comes and goes with it.
     The way back is an undo step of its own (asOwnStep in state/history.svelte.js), never joined to the change before it. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import Pin from '../../menu/Pin.svelte';
  import IconButton from './IconButton.svelte';
  import { ICONS } from '../icons.js';
  import { pinnedNow } from '../../menu/pinned.js';
  import { historyState } from '../../state/history.svelte.js';
  const group = getContext('menu-group');
  const pinned = pinnedNow();
  /** `key` is the prop the row sets; `source` names where the value comes from when the block has none ('theme' or 'default'), which the reset's words follow; `pin` is the setting's id in the Pinned rows.
      A row outside a fold says itself whether it holds the block's own value (`own`) and how it goes back (`reset`). */
  let { key = null, source = 'default', pin = null, own: ownValue = undefined, reset = undefined, children, more = undefined } = $props();
  const own = $derived(ownValue ?? (Boolean(key) && group?.own(key)));
  const away = $derived(pinned.has(pin));
</script>

{#if !away}
  <div class="setting" data-pin={pin ?? undefined} data-setting={key ?? pin ?? undefined}>
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
    {#if own}
      <IconButton size="sm" quiet class="setting-reset" icon={ICONS.reset} label={ta(source === 'theme' ? 'menu.resetTheme' : 'menu.resetSetting')}
        onclick={() => historyState.asOwnStep(() => (reset ? reset() : group.resetKey(key)))} />
    {/if}
  </div>
{/if}
