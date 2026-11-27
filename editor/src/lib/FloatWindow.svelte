<script>
  /* A window over the canvas: it opens by the tab it came from or where it was dragged, kept inside the editor's window, and its head drags it. */
  import { clampPlace, placeByTab } from './menu-place.js';
  import { menuMotion } from './motion.svelte.js';
  let { label, place = null, anchor = null, width = 380, onmove, onenter = undefined, onleave = undefined, head, children, class: own = '', el = $bindable(null) } = $props();

  let size = $state({ w: width, h: 320 });
  let view = $state({ w: typeof innerWidth === 'number' ? innerWidth : 1280, h: typeof innerHeight === 'number' ? innerHeight : 800 });
  let dragging = $state(false);
  const pos = $derived(place ? clampPlace(place, size, view) : placeByTab(anchor, size, view, { beside: anchor?.beside === true }));

  $effect(() => {
    if (!el) return;
    const observer = new ResizeObserver(() => { size = { w: el.offsetWidth, h: el.offsetHeight }; });
    observer.observe(el);
    return () => observer.disconnect();
  });

  function dragHead(event) {
    if (event.button !== 0 || event.target.closest('button, input, label')) return;
    event.preventDefault();
    const grip = event.currentTarget;
    const start = { x: event.clientX, y: event.clientY, left: pos.left, top: pos.top };
    grip.setPointerCapture(event.pointerId);
    dragging = true;
    const move = (e) => onmove(clampPlace({ left: start.left + (e.clientX - start.x), top: start.top + (e.clientY - start.y) }, size, view));
    const end = () => {
      grip.removeEventListener('pointermove', move);
      grip.removeEventListener('pointerup', end);
      grip.removeEventListener('pointercancel', end);
      dragging = false;
    };
    grip.addEventListener('pointermove', move);
    grip.addEventListener('pointerup', end);
    grip.addEventListener('pointercancel', end);
  }
</script>

<svelte:window onresize={() => { view = { w: innerWidth, h: innerHeight }; }} />

<div class="float-window {own}" class:dragging role="dialog" aria-label={label} bind:this={el} onpointerenter={onenter} onpointerleave={onleave}
  style="left: {pos.left}px; top: {pos.top}px; width: min({width}px, calc(100vw - 16px))" transition:menuMotion>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="float-head" onpointerdown={dragHead}>{@render head()}</div>
  {@render children()}
</div>

<style>
  .float-window {
    position: fixed;
    z-index: 310;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 16px);
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 11px;
    background: var(--urd-color-surface, #151a23);
    box-shadow: 0 18px 40px rgb(0 0 0 / 50%);
    color: var(--urd-color-text, #e7e9ee);
    font-family: var(--urd-font-body, system-ui, -apple-system, "Segoe UI", sans-serif);
  }

  .float-head {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.5rem 0.4rem 0.7rem;
    cursor: grab;
    touch-action: none;
    user-select: none;
  }

  .dragging .float-head {
    cursor: grabbing;
  }
</style>
