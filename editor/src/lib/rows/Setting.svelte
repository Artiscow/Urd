<script>
  /* One setting's row in a group (0.7.20.7, proposal M on the Design canvas): the control, with the amber dot and a reset beside it while the setting holds the block's own value, and otherwise, where the family tells what the value falls back to, the inherited value dimmed with its source («From the theme: None», «Default: Off»).
     The group's defaults come through the fold's context (Fold.svelte), so a row needs only its key.
     A setting that can stand in the element menu's Pinned rows carries its `pin`: the pin stands at the row's end, and while the setting is pinned the row is drawn in Pinned at the top instead of here, so it stands once (0.7.30.3, menu/PinScope.svelte tells which are). */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import Pin from '../../menu/Pin.svelte';
  import IconButton from './IconButton.svelte';
  import { pinnedNow } from '../../menu/pinned.js';
  const group = getContext('menu-group');
  const pinned = pinnedNow();
  /** `key` is the prop the row sets; `source` names where the value comes from when the block has none ('theme' or 'default'); `shown` is that value as words; `pin` is the setting's id in the Pinned rows.
      A row outside a fold says itself whether it holds the block's own value (`own`) and how it goes back (`reset`). */
  let { key = null, source = 'default', shown = null, pin = null, own: ownValue = undefined, reset = undefined, children } = $props();
  const own = $derived(ownValue ?? (Boolean(key) && group?.own(key)));
  const away = $derived(pinned.has(pin));
  const RESET_ICON = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 103-6.7"/><path d="M3 4v5h5"/></svg>';
</script>

{#if !away}
  <div class="setting" class:own data-pin={pin ?? undefined}>
    <i class="setting-dot" aria-hidden="true"></i>
    <div class="setting-body">
      {#if pin}
        <div class="pin-line">
          {@render children()}
          <Pin id={pin} />
        </div>
      {:else}
        {@render children()}
      {/if}
      {#if !own && shown !== null && shown !== undefined}
        <span class="setting-source">{ta(source === 'theme' ? 'menu.sourceTheme' : 'menu.sourceDefault', { v: shown })}</span>
      {/if}
    </div>
    {#if own}
      <IconButton size="sm" quiet class="setting-reset" icon={RESET_ICON} label={ta(source === 'theme' ? 'menu.resetTheme' : 'menu.resetSetting')}
        onclick={() => (reset ? reset() : group.resetKey(key))} />
    {/if}
  </div>
{/if}
