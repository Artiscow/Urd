<script>
  /* A number to type or step: the value in its own unit in a small field, with an up and a down arrow beside it.
     The keyboard's up and down arrows step it too (Shift ten steps at once), a held arrow button repeats, and a typed number is taken on Enter or when the field is left, held within its bounds.
     `scale` shows a value in another unit (a brightness of 1.08 as 108 %); every change goes out through `onchange` in the value's own unit. */
  import { ta } from '$engine/i18n.js';
  import { ICONS } from './icons.js';

  let { value, min, max, step = 1, scale = 1, decimals = 0, unit = '', label = '', onchange } = $props();

  let typing = $state(null);

  const round = (v) => Math.round(v * 10 ** decimals) / 10 ** decimals;
  /** The value as the field shows it, in its display unit. */
  const shown = $derived(String(round((Number(value) || 0) * scale)));

  /** A value in the display unit, held within the bounds, out in the value's own unit. */
  function emit(display) {
    const clamped = Math.min(max * scale, Math.max(min * scale, display));
    const next = round(clamped) / scale;
    if (next !== value) onchange?.(next);
  }

  function stepBy(times) {
    emit(round((Number(value) || 0) * scale) + times * step);
  }

  function commitTyped() {
    if (typing === null) return;
    const n = Number(String(typing).replace(',', '.').replace(/[^\d.+-]/g, ''));
    typing = null;
    if (Number.isFinite(n)) emit(n);
  }

  function onKey(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      commitTyped();
      stepBy((event.key === 'ArrowUp' ? 1 : -1) * (event.shiftKey ? 10 : 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      commitTyped();
    }
  }

  /** A held arrow: one step at once, then a step every tenth of a second after a short wait. */
  let repeatTimer = 0;
  function hold(times) {
    stepBy(times);
    let wait = 380;
    const again = () => {
      stepBy(times);
      wait = 90;
      repeatTimer = setTimeout(again, wait);
    };
    repeatTimer = setTimeout(again, wait);
  }
  function release() {
    clearTimeout(repeatTimer);
  }
</script>

<span class="step-field">
  <input type="text" inputmode="decimal" value={typing ?? shown} aria-label={label} title={label}
    oninput={(e) => (typing = e.target.value)} onkeydown={onKey} onblur={commitTyped} />
  {#if unit}<span class="step-unit" aria-hidden="true">{unit}</span>{/if}
  <span class="step-arrows">
    <button type="button" tabindex="-1" title={ta('ui.increase')} aria-label={ta('ui.increase')}
      onpointerdown={(e) => { e.preventDefault(); hold(1); }} onpointerup={release} onpointerleave={release}>{@html ICONS.chevronUp}</button>
    <button type="button" tabindex="-1" title={ta('ui.decrease')} aria-label={ta('ui.decrease')}
      onpointerdown={(e) => { e.preventDefault(); hold(-1); }} onpointerup={release} onpointerleave={release}>{@html ICONS.chevronDown}</button>
  </span>
</span>

<style>
  .step-field {
    display: inline-grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    align-items: center;
    box-sizing: border-box;
    height: 1.9rem;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    overflow: hidden;
  }

  .step-field:focus-within {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .step-field input {
    min-width: 0;
    width: 100%;
    padding: 0 0.1rem 0 0.4rem;
    font: inherit;
    font-variant-numeric: tabular-nums;
    text-align: right;
    color: inherit;
    background: transparent;
    border: 0;
    outline: none;
  }

  .step-unit {
    padding-right: 0.3rem;
    font-size: 0.85em;
    opacity: 0.7;
  }

  .step-arrows {
    display: grid;
    grid-template-rows: 1fr 1fr;
    align-self: stretch;
    border-left: 1px solid rgb(255 255 255 / 14%);
  }

  .step-arrows button {
    display: grid;
    place-items: center;
    width: 1.3rem;
    padding: 0;
    color: inherit;
    background: transparent;
    border: 0;
    border-radius: 0;
    cursor: pointer;
  }

  .step-arrows button:first-child {
    border-bottom: 1px solid rgb(255 255 255 / 14%);
  }

  .step-arrows button:hover {
    background: rgb(255 255 255 / 10%);
  }
</style>
