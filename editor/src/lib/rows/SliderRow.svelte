<script>
  /* A number with a range in the row kit: the label, the slider and its value, on one line when `inline`; `compact` keeps the label for a screen reader alone. */
  let { label, title = undefined, value, min, max, step = 1, shown = undefined, oninput = undefined, onchange = undefined, compact = false, inline = false } = $props();
  /** The inline slider's fill, as the share of the track the value stands at. */
  const fill = $derived.by(() => {
    const at = max > min ? ((value - min) / (max - min)) * 100 : 0;
    const from = min < 0 ? Math.min(50, at) : 0, to = min < 0 ? Math.max(50, at) : at;
    return `linear-gradient(to right, var(--slider-rest) 0 ${from}%, var(--slider-fill) ${from}% ${to}%, var(--slider-rest) ${to}% 100%)`;
  });
</script>

<div class="row-slider" class:inline {title}>
  {#if !compact}<span class="row-label">{label}</span>{/if}
  <span class="row-slider-line">
    <input type="range" {min} {max} {step} {value} aria-label={label} aria-valuetext={shown} class:two-way={inline && min < 0} style:--fill={inline ? fill : undefined}
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

  .row-slider.inline {
    --slider-fill: var(--urd-color-accent, #7c5cff);
    --slider-rest: color-mix(in srgb, currentColor 30%, transparent);
    grid-template-columns: var(--row-name, 6.4em) minmax(0, 1fr);
    align-items: center;
    gap: 10px;
    min-height: 26px;
  }

  .row-slider.inline .gridmenu-value {
    min-width: 2.9em;
    white-space: nowrap;
  }

  .row-slider.inline input {
    appearance: none;
    height: 18px;
    margin: 0;
    padding: 0;
    background: transparent;
    border: 0;
    cursor: pointer;
  }

  .row-slider.inline input.two-way {
    background: linear-gradient(color-mix(in srgb, currentColor 55%, transparent), color-mix(in srgb, currentColor 55%, transparent)) center / 1px 12px no-repeat;
  }

  .row-slider.inline input::-webkit-slider-runnable-track {
    height: 4px;
    background: var(--fill);
    border-radius: 4px;
  }

  .row-slider.inline input::-moz-range-track {
    height: 4px;
    background: var(--fill);
    border-radius: 4px;
  }

  .row-slider.inline input::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    margin-top: -6px;
    background: var(--slider-fill);
    border: 0;
    border-radius: 50%;
  }

  .row-slider.inline input::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: var(--slider-fill);
    border: 0;
    border-radius: 50%;
  }

  .row-slider.inline input:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
    border-radius: 6px;
  }
</style>
