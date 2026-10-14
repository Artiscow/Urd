<script>
  /* The preview stage: the iframe with the real page, scaled to the device and the zoom, inside the frame that pans when the page is larger than it. Split out of App.svelte in 0.7.26.5; everything it reads and writes comes through the editor handle. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
</script>

<div class="frame-wrap" class:mobile={ed.viewMode === 'mobile'} class:pan={ed.canPan} class:fold={ed.targetH > 0} bind:this={ed.frameWrapEl}>
  <!-- .stage has the SCALED size, so scrolling/centering gets a real
       box (a transformed iframe alone does not expand its parent's scroll). -->
  <div class="stage" style="width:{ed.stageW}px; height:{ed.stageH}px">
    <iframe
      bind:this={ed.iframeEl}
      title={ta('ui.previewTitle')}
      src={`/?page=${ed.pageId}&preview=1`}
      onload={ed.onIframeLoad}
      style="width:{ed.targetW}px; height:{ed.iframeH}px; transform:scale({ed.scale}); transform-origin:top left"
    ></iframe>
  </div>
</div>
