<script>
  /**
   * A choice among a few named values as a segment of buttons (ADR-0009:
   * themed, never a native select). Two or three options sit beside the
   * label on one row; four or more, or long option texts, get the label above
   * in capitals and the segment on its own line, wrapping when the panel is
   * narrow.
   * @type {{ label: string, title?: string, value: string, options: Array<[string, string]>, onchange: (value: string) => void }}
   */
  let { label, title = undefined, value, options, onchange } = $props();
  const stacked = $derived(options.length > 3 || options.reduce((n, [, text]) => n + `${text}`.length, 0) > 20);
  const key = (v) => `${v ?? ''}`;
</script>

<div class="choice" class:stacked {title}>
  <span class="choice-label">{label}</span>
  <div class="choice-seg" role="group" aria-label={label}>
    {#each options as [v, text] (key(v))}
      <button type="button" class:on={key(v) === key(value)} aria-pressed={key(v) === key(value)} onclick={() => onchange(v)}>{text}</button>
    {/each}
  </div>
</div>

<style>
  .choice {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    font-size: 0.85rem;
  }

  .choice.stacked {
    flex-direction: column;
    align-items: stretch;
    gap: 5px;
  }

  .choice.stacked .choice-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 0.6;
  }

  .choice-seg {
    display: inline-flex;
    flex: 0 0 auto;
    border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
    border-radius: 999px;
    overflow: hidden;
  }

  .choice.stacked .choice-seg {
    display: flex;
    flex-wrap: wrap;
    border-radius: 10px;
  }

  .choice-seg button {
    border: 0;
    background: transparent;
    color: inherit;
    font: 600 11px system-ui, sans-serif;
    padding: 5px 11px;
    cursor: pointer;
    white-space: nowrap;
  }

  .choice.stacked .choice-seg button {
    flex: 1 1 auto;
  }

  .choice-seg button.on {
    background: var(--urd-color-accent);
    color: var(--urd-color-bg);
  }

  .choice-seg button:focus-visible {
    outline: 2px solid var(--urd-color-accent);
    outline-offset: -2px;
  }
</style>
