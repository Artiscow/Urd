<script>
  /* On and off, in the row kit (0.7.30.2): the words on the left and the switch at the row's right edge.
     The checkbox carries role="switch", so a screen reader names it a switch, as the admin draws every checkbox but the lists' tick boxes (app.css). */
  let { label, title = undefined, checked, onchange, disabled = false } = $props();
</script>

<label class="gridmenu-snap row-switch" class:muted={disabled} {title}>
  <input type="checkbox" role="switch" {checked} {disabled} onchange={(e) => onchange(e.currentTarget.checked)} />
  {label}
</label>
