<script>
  /**
   * A choice among a few named values as a segment of buttons (ADR-0009: themed, never a native select).
   * Up to four short options sit beside the label on one row; five or more, or longer option texts, get the label above in capitals and the segment on its own line.
   * An option of more than 18 characters puts every option on a row of its own, and so does `rows`.
   * `stack` asks for the label above whatever the options, as a pinnable choice stands.
   * @type {{ label: string, title?: string, value: string, options: Array<[string, string]>, onchange: (value: string) => void, stack?: boolean, rows?: boolean }}
   */
  let { label, title = undefined, value, options, onchange, stack = false, rows = false } = $props();
  const lengths = $derived(options.map(([, text]) => `${text}`.length));
  const stacked = $derived(stack || rows || options.length > 4 || lengths.reduce((n, l) => n + l, 0) > 14);
  /** Options too long to share a row stand under each other instead of wrapping two and one. */
  const vertical = $derived(rows || (stacked && Math.max(0, ...lengths) > 18));
  const key = (v) => `${v ?? ''}`;
</script>

<div class="choice" class:stacked class:vertical {title}>
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
    isolation: isolate;
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
    position: relative;
    border: 0;
    background: transparent;
    color: inherit;
    font: 600 11px system-ui, sans-serif;
    padding: 5px 11px;
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.18s ease, background 0.12s ease, transform 0.05s ease;
  }

  .choice.stacked .choice-seg button {
    flex: 1 1 auto;
  }

  .choice.vertical .choice-seg {
    flex-direction: column;
    flex-wrap: nowrap;
  }

  /* The chosen button's pill is a layer under every button's words, which a new choice slides across (lib/seg-slide.js) */
  .choice-seg button.on {
    color: var(--urd-color-bg);
  }

  .choice-seg button.on::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    background: var(--urd-color-accent);
  }

  .choice-seg button:focus-visible {
    outline: 2px solid var(--urd-color-accent);
    outline-offset: -2px;
  }
</style>
