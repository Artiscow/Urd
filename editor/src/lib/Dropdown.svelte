<script>
  /**
   * Theme-driven dropdown (ADR-0009): native select popups are drawn by the
   * browser/OS and become unreadable in dark panels, so ALL dropdowns in
   * admin use this one. options is [[value, label], …]; values are
   * compared as strings, so '' and null can be used as "none".
   *
   * Two branches (ADR-0011 addendum, anchored.js decides): with the Popover
   * API and anchor positioning the list opens in the top layer, placed
   * under its button by CSS with the browser flipping it away from the
   * viewport edge, and light dismiss handles the outside click and Escape.
   * Otherwise the list is position: fixed (the panels clip absolute
   * content), placed by measuring, and closes on a click outside or Escape;
   * on a scroll outside it FOLLOWS the anchor instead of closing: clicking a
   * button at the bottom of the panel triggers a focus scroll in the same
   * instant, and a close-on-scroll rule would slam the popup shut before
   * anything could be picked.
   */
  import { nativeAnchoring, anchorName } from '$engine/anchored.js';

  let { value = null, options = [], onchange, title = null, disabled = false, filled = false, compact = false } = $props();

  const native = nativeAnchoring();
  const anchor = anchorName('urd-dd');
  const popId = anchor.slice(2);

  let open = $state(false);
  let rootEl = $state(null);
  let popEl = $state(null);
  let pos = $state({ top: 0, left: 0, width: 160 });

  const currentLabel = () =>
    options.find(([v]) => `${v ?? ''}` === `${value ?? ''}`)?.[1] ?? '';

  function place() {
    const r = rootEl.getBoundingClientRect();
    const height = Math.min(320, options.length * 32 + 12);
    const width = Math.max(r.width, 160);
    const below = r.bottom + height + 8 <= window.innerHeight;
    pos = {
      top: below ? r.bottom + 4 : Math.max(8, r.top - height - 4),
      left: Math.max(8, Math.min(r.left, window.innerWidth - width - 8)),
      width,
    };
  }

  function toggle() {
    if (disabled) return;
    if (open) {
      open = false;
      return;
    }
    place();
    open = true;
  }

  function pick(v) {
    if (native) popEl?.hidePopover();
    open = false;
    onchange?.(v);
  }

  // A click in the preview iframe never reaches this document (light
  // dismiss does not see it either); the focus moving there is a window
  // blur, which closes the list in both branches.
  $effect(() => {
    if (!open) return;
    const onBlur = () => { if (native) popEl?.hidePopover(); else open = false; };
    window.addEventListener('blur', onBlur);
    if (native) return () => window.removeEventListener('blur', onBlur);
    const onDown = (e) => {
      if (rootEl && !rootEl.contains(e.target)) open = false;
    };
    const onKey = (e) => {
      if (e.key === 'Escape') open = false;
    };
    const onScroll = (e) => {
      if (rootEl && e.target instanceof Node && !rootEl.contains(e.target)) place();
    };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('scroll', onScroll, true);
    return () => {
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('scroll', onScroll, true);
    };
  });
</script>

<span class="dd" bind:this={rootEl}>
  {#if native}
    <button type="button" class="dd-btn" class:dd-filled={filled} class:dd-compact={compact} {title} {disabled} popovertarget={popId} style="anchor-name: {anchor}">
      <span class="dd-value">{currentLabel()}</span>
      <span class="dd-caret">{open ? '▴' : '▾'}</span>
    </button>
    <div class="dd-pop dd-anchored" id={popId} popover="auto" bind:this={popEl}
      style="position-anchor: {anchor}" ontoggle={(e) => { open = e.newState === 'open'; }}>
      {#if open}
        {#each options as [v, label] (`${v ?? ''}`)}
          <button type="button" class="dd-opt" class:selected={`${v ?? ''}` === `${value ?? ''}`}
            onclick={() => pick(v)}>{label}</button>
        {/each}
      {/if}
    </div>
  {:else}
    <button type="button" class="dd-btn" class:dd-filled={filled} class:dd-compact={compact} {title} {disabled} onclick={toggle}>
      <span class="dd-value">{currentLabel()}</span>
      <span class="dd-caret">{open ? '▴' : '▾'}</span>
    </button>
    {#if open}
      <div class="dd-pop" style="top: {pos.top}px; left: {pos.left}px; min-width: {pos.width}px">
        {#each options as [v, label] (`${v ?? ''}`)}
          <button type="button" class="dd-opt" class:selected={`${v ?? ''}` === `${value ?? ''}`}
            onclick={() => pick(v)}>{label}</button>
        {/each}
      </div>
    {/if}
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

  /* The filled look (under a stacked label): a tinted field without a frame. */
  .dd-btn.dd-filled {
    background: color-mix(in srgb, currentColor 7%, transparent);
    border-color: transparent;
    min-height: 2.2rem;
  }

  /* The compact look (a target line under a menu item's name): small, frameless text with the caret. */
  .dd-btn.dd-compact {
    background: transparent;
    border-color: transparent;
    padding: 0.1em 0.2em;
    font-size: 0.72rem;
    opacity: 0.75;
    gap: 4px;
  }

  .dd-btn.dd-compact:hover,
  .dd-btn.dd-compact:focus-visible {
    opacity: 1;
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
    color: inherit;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 8px;
    box-shadow: 0 12px 36px rgb(0 0 0 / 55%);
  }

  /* The anchored branch: the popover box is placed against the button by
     CSS (top layer, no z-index), as wide as the button at least. */
  @supports (anchor-name: --a) {
    .dd-anchored {
      inset: auto;
      margin: 4px 0 0;
      position-area: block-end span-inline-end;
      min-width: max(160px, anchor-size(width));
    }

    .dd-anchored:not(:popover-open) {
      display: none;
    }

    @supports (position-try-fallbacks: flip-block) {
      .dd-anchored {
        position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
      }
    }
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

  .dd-opt.selected {
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 30%, transparent);
  }
</style>
