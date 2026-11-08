<script>
  /* A number with a range, in the row kit (0.7.30.2): the label above, and the slider with its value beside it.
     `oninput` follows the drag and `onchange` comes when it settles, each with the number; `shown` writes the value in its unit («24 px»).
     `compact` leaves the words' line out, for a slider whose row already says what it is (a gradient's stop); the label still names it to a screen reader. */
  let { label, title = undefined, value, min, max, step = 1, shown = undefined, oninput = undefined, onchange = undefined, compact = false } = $props();
</script>

<div class="row-slider" {title}>
  {#if !compact}<span class="row-label">{label}</span>{/if}
  <span class="row-slider-line">
    <input type="range" {min} {max} {step} {value} aria-label={label} aria-valuetext={shown}
      oninput={(e) => oninput?.(Number(e.currentTarget.value))}
      onchange={(e) => onchange?.(Number(e.currentTarget.value))} />
    <span class="gridmenu-value" aria-hidden="true">{shown ?? value}</span>
  </span>
</div>

<style>
  .row-slider {
    display: grid;
    gap: 4px;
    font-size: 0.85rem;
  }

  .row-slider-line {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .row-slider-line input {
    flex: 1;
    min-width: 0;
  }

  .row-slider-line .gridmenu-value {
    min-width: 3.2em;
    text-align: right;
  }
</style>
