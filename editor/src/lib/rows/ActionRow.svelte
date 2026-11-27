<script>
  /* A thing's actions as icon buttons, `actions` being { id, icon, label, run, disabled?, arm?, danger? }; one with `arm` acts at its second press. */
  import IconButton from './IconButton.svelte';
  let { actions, label } = $props();
  let armed = $state(null);
  function press(action) {
    if (action.arm && armed !== action.id) {
      armed = action.id;
      return;
    }
    armed = null;
    action.run();
  }
</script>

<div class="row-actions" role="group" aria-label={label} onpointerleave={(e) => { if (e.pointerType === 'mouse') armed = null; }}
  onfocusout={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) armed = null; }}>
  {#each actions as action (action.id)}
    <IconButton icon={action.icon} label={armed === action.id ? action.arm : action.label} danger={action.danger || armed === action.id} class={armed === action.id ? 'armed' : ''}
      disabled={action.disabled} onclick={() => press(action)} />
  {/each}
</div>

<style>
  .row-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
</style>
