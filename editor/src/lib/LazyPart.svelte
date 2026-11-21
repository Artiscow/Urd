<script>
  /**
   * A part of the admin loaded as it is first wanted (lib/parts.svelte.js), drawn with the props given once its code is in.
   * `when` asks for it: a part drawn under a condition of the admin's asks as it is drawn, and a part that opens and closes by its own state (the Drafts window, the setup wizard) asks as it opens or shows and stands drawn from the moment its code is in.
   * The part is drawn as a dynamic component, which draws nothing until its code is in and passes the admin's own block to the part's transitions, so the part opens and closes with its motion.
   * Where its file cannot be had while it is still wanted (an update replaced the admin's files under an open tab, or the connection is down), the status line says so, with a way to reload.
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
