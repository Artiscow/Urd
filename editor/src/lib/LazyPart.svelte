<script>
  /**
   * A part of the admin loaded as `when` first asks for it (lib/parts.svelte.js), drawn with the props given once its code is in.
   */
  import { untrack } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { partsState } from './parts.svelte.js';
  import { shellState } from '../state/shell.svelte.js';

  let { name, when = true, ...rest } = $props();

  $effect(() => {
    if (!when) return;
    let wanted = true;
    untrack(() => partsState.load(name)).catch(() => {
      if (wanted) shellState.setStatus(ta('status.partUnavailable'), 'error', { label: ta('ui.reload'), run: () => location.reload() });
    });
    return () => {
      wanted = false;
    };
  });
  const Part = $derived(partsState.loaded[name]);
</script>

<Part {...rest} />
