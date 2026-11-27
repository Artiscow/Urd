<script>
  /**
   * A segment of buttons for a few named values (ADR-0009); many or long options stack under the label, and `fill` spans the row.
   * @type {{ label: string, title?: string, value: string, options: Array<[string, string, string?]>, onchange: (value: string) => void, stack?: boolean, rows?: boolean, fill?: boolean, mark?: import('svelte').Snippet<[string]> }}
   */
  let { label, title = undefined, value, options, onchange, stack = false, rows = false, fill = false, mark = undefined } = $props();
  const lengths = $derived(options.map(([, text]) => `${text}`.length));
  const stacked = $derived(!fill && (stack || rows || options.length > 4 || lengths.reduce((n, l) => n + l, 0) > 14));
  /** Options too long to share a row stand under each other instead of wrapping two and one. */
  const vertical = $derived(!fill && (rows || (stacked && Math.max(0, ...lengths) > 18)));
  const key = (v) => `${v ?? ''}`;
</script>

<div class="choice" class:stacked class:vertical class:fill {title}>
  {#if !fill}<span class="choice-label">{label}</span>{/if}
  <div class="choice-seg" role="group" aria-label={label}>
    {#each options as [v, text, tip] (key(v))}
      <button type="button" class:on={key(v) === key(value)} aria-pressed={key(v) === key(value)} title={tip ?? ''} onclick={() => onchange(v)}>{text}{#if mark}{@render mark(v)}{/if}</button>
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

  .choice.fill,
  .choice.fill .choice-seg {
    display: flex;
    flex: 1;
  }

  .choice.fill .choice-seg button {
    flex: 1;
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
    color: var(--urd-color-accent-text);
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
