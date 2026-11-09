<script>
  /* A thing's actions in a row, in the row kit (0.7.30.6): each an icon button with its name in its tooltip.
     An action with `arm` acts at its second press, as the canvas's deletions do: bright red in between, named by `arm`, and disarmed when a mouse or the focus leaves the row (a touch lifts before its click, so a lifted finger never disarms what it is about to press).
     A deletion (`danger`) stands in the dark red of every deletion in the admin (app.css).
     `actions` are { id, icon, label, run, disabled?, arm?, danger? }; `label` names the row for a screen reader. */
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
