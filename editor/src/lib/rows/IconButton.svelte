<script>
  /* A button that is its icon alone, in the row kit, named by `label` to a screen reader and in its tooltip; `tip={false}` leaves the tooltip out. */
  let { icon, label, size = 'md', quiet = false, tip = true, danger = false, pressed = undefined, expanded = undefined, disabled = false, class: own = '', onclick, el = $bindable(null) } = $props();
</script>

<button type="button" bind:this={el} class="icon-btn {own}" class:ghost={!quiet} class:sm={size === 'sm'} class:quiet class:danger
  title={tip ? label : undefined} aria-label={label} aria-pressed={pressed} aria-expanded={expanded} {disabled} {onclick}>{@html icon}</button>
