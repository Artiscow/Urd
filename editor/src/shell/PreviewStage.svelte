<script>
  /* The preview stage: the iframe with the real page, scaled to the device and the zoom, inside the frame that pans when the page is larger than it. Split out of App.svelte in 0.7.26.5; everything it reads and writes comes through the editor handle.
     The bar at the canvas's right edge is dragged to set any width (ed.setFreeWidth): the width follows the pointer in canvas px with its number beside it and snaps to the devices' widths and the site's phone breakpoint, which a dashed mark shows on the canvas while the drag runs; the arrow keys step it. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import LookBanner from './LookBanner.svelte';
  const ed = getContext('urd-editor');
  let dragging = $state(false);
  let startX = 0;
  let startW = 0;
  /** The scale as the drag began: the fit scale follows the width, so a move is measured against the scale it started at, which keeps the drag linear. */
  let startScale = 1;
  const breakpoint = $derived(ed.siteDraft?.breakpoints?.mobile ?? 640);
  function onDown(e) {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging = true;
    startX = e.clientX;
    startW = ed.device.width;
    startScale = ed.scale || 1;
  }
  function onMove(e) {
    if (!dragging) return;
    ed.setFreeWidth(startW + (e.clientX - startX) / startScale, 8 / startScale);
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
  <div class="stage" class:dragging style="width:{ed.stageW}px; height:{ed.stageH}px">
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
