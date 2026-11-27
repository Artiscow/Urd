<script>
  /* The preview stage: the iframe with the real page, scaled to the device and the zoom, in a frame that pans when the page is larger, with its width handle. */
  import { getContext, untrack } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import LookBanner from './LookBanner.svelte';
  import CanvasCover from '../lib/CanvasCover.svelte';
  const ed = getContext('urd-editor');
  const src = $derived(`/?page=${ed.pageId}&preview=1`);
  // Another page asked for covers the canvas anew, before the frame starts loading it.
  $effect.pre(() => {
    void src;
    untrack(() => ed.coverCanvas());
  });
  let dragging = $state(false);
  /** Where on the handle the pointer took hold, from the canvas's right edge, so the first move does not jump. */
  let grab = 0;
  let stageEl = $state(null);
  const breakpoint = $derived(ed.siteDraft?.breakpoints?.mobile ?? 640);
  /** The width handle stands beside the canvas where the stage leaves room for it, else on the canvas's own edge. */
  const handleOut = $derived((ed.frameW - ed.stageW) / 2 >= 18);
  function onDown(e) {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging = true;
    grab = stageEl.getBoundingClientRect().right - e.clientX;
  }
  /** The width that puts the canvas's right edge under the pointer: from its middle while it stands centred in its frame, else from its left edge. */
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
  /** A press on the stage around the canvas, outside the page and its own scrollbars, lets go of whatever is selected on it. */
  function onStagePress(e) {
    const wrap = e.currentTarget;
    if (e.button !== 0 || (e.target !== wrap && e.target !== stageEl)) return;
    const box = wrap.getBoundingClientRect();
    if (e.clientX >= box.left + wrap.clientLeft + wrap.clientWidth || e.clientY >= box.top + wrap.clientTop + wrap.clientHeight) return;
    ed.clearSelection();
  }
  /** The wheel over the stage scrolls the page in the canvas, unless the stage pans or Ctrl or Cmd asks for the browser's zoom. */
  function onStageWheel(e) {
    if (ed.canPan || e.ctrlKey || e.metaKey) return;
    const win = ed.iframeEl?.contentWindow;
    if (!win) return;
    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? win.innerHeight : 1;
    win.scrollBy({ left: e.deltaX * unit, top: e.deltaY * unit, behavior: 'instant' });
  }
  function onKey(e) {
    const step = e.shiftKey ? 50 : 10;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); ed.setFreeWidth(ed.device.width + step); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); ed.setFreeWidth(ed.device.width - step); }
  }
</script>

<!-- The stage's press is the pointer's way to deselect; the keyboard's is Esc on the canvas. -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="frame-wrap" class:mobile={ed.viewMode === 'mobile'} class:pan={ed.canPan} class:fold={ed.targetH > 0} class:looking={Boolean(ed.looking)} bind:this={ed.frameWrapEl} onpointerdown={onStagePress} onwheel={onStageWheel}>
  <!-- A saved draft looked at: its banner over the canvas, the canvas framed in amber -->
  <LookBanner />
  <!-- .stage has the scaled size, so the frame scrolls and centres a real box. -->
  <div class="stage" class:dragging style="width:{ed.stageW}px; height:{ed.stageH}px; --stage-scale:{ed.scale}" bind:this={stageEl}>
    <iframe
      bind:this={ed.iframeEl}
      title={ta('ui.previewTitle')}
      {src}
      onload={ed.onIframeLoad}
      style="width:{ed.targetW}px; height:{ed.iframeH}px; transform:scale({ed.scale}); transform-origin:top left"
    ></iframe>
    <CanvasCover covered={ed.canvasCovered} step={ed.canvasStep} look={ed.canvasCover} />
    {#if ed.chromeVisible && !ed.looking}
      <button type="button" class="stage-handle" class:out={handleOut} title={ta('tip.dragWidth')} aria-label={ta('tip.dragWidth')}
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
