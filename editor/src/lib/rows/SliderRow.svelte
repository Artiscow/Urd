<script>
  /* A number with a range, in the row kit (0.7.30.2): the label above, and the slider with its value beside it.
     `oninput` follows the drag and `onchange` comes when it settles, each with the number; `shown` writes the value in its unit («24 px»). */
  let { label, title = undefined, value, min, max, step = 1, shown = undefined, oninput = undefined, onchange = undefined } = $props();
</script>

<div class="row-slider" {title}>
  <span class="row-label">{label}</span>
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
