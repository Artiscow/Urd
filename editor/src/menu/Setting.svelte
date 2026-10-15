<script>
  /* One setting's row in a group (0.7.20.7, proposal M on the Design canvas):
     the control, with the amber dot and a reset beside it while the setting
     holds the block's own value, and otherwise, where the family tells what
     the value falls back to, the inherited value dimmed with its source
     («From the theme: None», «Default: Off»). The group's defaults come
     through MenuGroup's context, so a row needs only its key. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  const group = getContext('menu-group');
  /** `key` is the prop the row sets; `source` names where the value comes from when the block has none ('theme' or 'default'); `shown` is that value as words. */
  let { key, source = 'default', shown = null, children } = $props();
  const own = $derived(Boolean(key) && group?.own(key));
  const RESET_ICON = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 103-6.7"/><path d="M3 4v5h5"/></svg>';
</script>

<div class="setting" class:own>
  <i class="setting-dot" aria-hidden="true"></i>
  <div class="setting-body">
    {@render children()}
    {#if !own && shown !== null && shown !== undefined}
      <span class="setting-source">{ta(source === 'theme' ? 'menu.sourceTheme' : 'menu.sourceDefault', { v: shown })}</span>
    {/if}
  </div>
  {#if own}
    <button type="button" class="setting-reset" title={ta(source === 'theme' ? 'menu.resetTheme' : 'menu.resetSetting')} aria-label={ta(source === 'theme' ? 'menu.resetTheme' : 'menu.resetSetting')}
      onclick={() => group.resetKey(key)}>{@html RESET_ICON}</button>
  {/if}
</div>
