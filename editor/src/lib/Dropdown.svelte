<script>
  /**
   * Temastyrt nedtrekk (ADR-0009): native select-popuper tegnes av
   * nettleseren/OS-et og blir uleselige i mørke paneler, så ALLE nedtrekk
   * i admin bruker denne. options er [[verdi, etikett], …]; verdier
   * sammenlignes som strenger, så '' og null kan brukes som «ingen».
   *
   * Popoveren er position: fixed (panelene klipper absolute innhold),
   * og lukkes ved klikk utenfor, Escape eller rulling utenfor.
   */
  let { value = null, options = [], onchange, title = null, disabled = false } = $props();

  let open = $state(false);
  let rootEl = $state(null);
  let pos = $state({ top: 0, left: 0, width: 160 });

  const currentLabel = () =>
    options.find(([v]) => `${v ?? ''}` === `${value ?? ''}`)?.[1] ?? '';

  function toggle() {
    if (disabled) return;
    if (open) {
      open = false;
      return;
    }
    const r = rootEl.getBoundingClientRect();
    const height = Math.min(320, options.length * 32 + 12);
    const width = Math.max(r.width, 160);
    const below = r.bottom + height + 8 <= window.innerHeight;
    pos = {
      top: below ? r.bottom + 4 : Math.max(8, r.top - height - 4),
      left: Math.max(8, Math.min(r.left, window.innerWidth - width - 8)),
      width,
    };
    open = true;
  }

  function pick(v) {
    open = false;
    onchange?.(v);
  }

  $effect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootEl && !rootEl.contains(e.target)) open = false;
    };
    const onKey = (e) => {
      if (e.key === 'Escape') open = false;
    };
    const onScroll = (e) => {
      if (rootEl && e.target instanceof Node && !rootEl.contains(e.target)) open = false;
    };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('scroll', onScroll, true);
    };
  });
</script>

<span class="dd" bind:this={rootEl}>
  <button type="button" class="dd-btn" {title} {disabled} onclick={toggle}>
    <span class="dd-value">{currentLabel()}</span>
    <span class="dd-caret">{open ? '▴' : '▾'}</span>
  </button>
  {#if open}
    <div class="dd-pop" style="top: {pos.top}px; left: {pos.left}px; min-width: {pos.width}px">
      {#each options as [v, label] (`${v ?? ''}`)}
        <button type="button" class="dd-opt" class:valgt={`${v ?? ''}` === `${value ?? ''}`}
          onclick={() => pick(v)}>{label}</button>
      {/each}
    </div>
  {/if}
</span>

<style>
  .dd {
    display: flex;
    min-width: 0;
    flex: 1;
  }

  .dd-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-width: 0;
    min-height: 0;
    font: inherit;
    color: inherit;
    text-align: left;
    background: rgb(255 255 255 / 6%);
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 6px;
    padding: 0.45em 0.6em;
    cursor: pointer;
  }

  .dd-btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .dd-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dd-caret {
    flex: 0 0 auto;
    font-size: 0.75em;
    opacity: 0.65;
  }

  .dd-pop {
    position: fixed;
    z-index: 600;
    max-height: 320px;
    overflow-y: auto;
    display: grid;
    gap: 2px;
    padding: 5px;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 8px;
    box-shadow: 0 12px 36px rgb(0 0 0 / 55%);
  }

  .dd-opt {
    font: inherit;
    color: inherit;
    text-align: left;
    background: transparent;
    border: 0;
    border-radius: 5px;
    padding: 0.4em 0.6em;
    min-height: 0;
    cursor: pointer;
    white-space: nowrap;
  }

  .dd-opt:hover {
    background: rgb(255 255 255 / 10%);
  }

  .dd-opt.valgt {
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 30%, transparent);
  }
</style>
