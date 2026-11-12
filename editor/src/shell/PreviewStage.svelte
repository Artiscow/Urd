<script>
  /* The preview stage: the iframe with the real page, scaled to the device and the zoom, inside the frame that pans when the page is larger than it. Split out of App.svelte in 0.7.26.5; everything it reads and writes comes through the editor handle.
     The bar at the canvas's right edge is dragged to set any width (ed.setFreeWidth): the width follows the pointer in canvas px with its number beside it and snaps to the devices' widths and the site's phone breakpoint, which a dashed mark shows on the canvas while the drag runs; the arrow keys step it. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import LookBanner from './LookBanner.svelte';
  const ed = getContext('urd-editor');
  let dragging = $state(false);
  /** Where on the handle the pointer took hold, from the canvas's right edge, so the first move does not jump. */
  let grab = 0;
  let stageEl = $state(null);
  const breakpoint = $derived(ed.siteDraft?.breakpoints?.mobile ?? 640);
  function onDown(e) {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging = true;
    grab = stageEl.getBoundingClientRect().right - e.clientX;
  }
  /**
   * The width that puts the canvas's right edge under the pointer, worked out at every move from where the canvas stands and the scale it has then: from its middle while it stands centred in its frame, whose right edge moves half as far as the width grows, else from its left edge.
   * A fit scale follows the width, so the next move reads the scale the last one gave, and the edge settles under the pointer.
   */
  function onMove(e) {
    if (!dragging) return;
    const stage = stageEl.getBoundingClientRect();
    const frame = ed.frameWrapEl?.getBoundingClientRect();
    const scale = ed.scale || 1;
    const edge = e.clientX + grab;
    const centred = Boolean(frame) && stage.width < frame.width - 1;
    const shown = centred ? 2 * (edge - (stage.left + stage.width / 2)) : edge - stage.left;
    ed.setFreeWidth(shown / scale, 8 / scale);
  }
  function onUp(e) {
    if (!dragging) return;
    dragging = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }
  function onKey(e) {
    const step = e.shiftKey ? 50 : 10;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); ed.setFreeWidth(ed.device.width + step); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); ed.setFreeWidth(ed.device.width - step); }
  }
</script>

<div class="frame-wrap" class:mobile={ed.viewMode === 'mobile'} class:pan={ed.canPan} class:fold={ed.targetH > 0} class:looking={Boolean(ed.looking)} bind:this={ed.frameWrapEl}>
  <!-- A saved draft looked at: its banner over the canvas, the canvas framed in amber -->
  <LookBanner />
  <!-- .stage has the SCALED size, so scrolling/centering gets a real
       box (a transformed iframe alone does not expand its parent's scroll). -->
  <div class="stage" class:dragging style="width:{ed.stageW}px; height:{ed.stageH}px" bind:this={stageEl}>
    <iframe
      bind:this={ed.iframeEl}
      title={ta('ui.previewTitle')}
      src={`/?page=${ed.pageId}&preview=1`}
      onload={ed.onIframeLoad}
      style="width:{ed.targetW}px; height:{ed.iframeH}px; transform:scale({ed.scale}); transform-origin:top left"
    ></iframe>
    {#if ed.chromeVisible && !ed.looking}
      <button type="button" class="stage-handle" title={ta('tip.dragWidth')} aria-label={ta('tip.dragWidth')}
        onpointerdown={onDown} onpointermove={onMove} onpointerup={onUp} onpointercancel={onUp} onkeydown={onKey}></button>
      {#if dragging}
        <span class="stage-readout" aria-hidden="true">{ed.device.width} px</span>
        {#if breakpoint * ed.scale < ed.stageW}
          <span class="stage-bp" aria-hidden="true" style="left:{breakpoint * ed.scale}px"><span>{ta('lbl.breakpointMark', { bp: breakpoint })}</span></span>
        {/if}
      {/if}
    {/if}
  </div>
</div>
