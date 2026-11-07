<script>
  /* A button that is its icon alone, in the row kit: a square of the admin's control height (2.2rem), so it lines up with the field or the row beside it.
     `size="sm"` is the square of a tool inside a row (1.5rem), such as a setting's pin or its reset; `quiet` draws it without a frame, faint until the pointer or the keyboard reaches it.
     `label` names the button in its tooltip and to a screen reader; `tip={false}` leaves the tooltip out where hovering the button opens a menu.
     `danger` draws a removal in red, `pressed` makes it a toggle, and `class` adds a name of the caller's own for what only that button needs. */
  let { icon, label, size = 'md', quiet = false, tip = true, danger = false, pressed = undefined, disabled = false, class: own = '', onclick } = $props();
</script>

<button type="button" class="icon-btn {own}" class:ghost={!quiet} class:sm={size === 'sm'} class:quiet class:danger
  title={tip ? label : undefined} aria-label={label} aria-pressed={pressed} {disabled} {onclick}>{@html icon}</button>
