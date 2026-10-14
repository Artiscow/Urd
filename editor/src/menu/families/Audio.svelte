<script>
  /* The audio block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import { WARN_BYTES } from '$engine/imageTools.js';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setStatus } = ed;
  let { area } = $props();

  /** Audio file to data URL in the draft; publishing writes it to media/.
   *  Audio is not compressed (no canvas path), so the size is warned about. */
  function setAudioFile(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setBlockProp('src', String(reader.result ?? ''));
      if (file.size > WARN_BYTES) {
        setStatus(ta('status.audioLarge', { kb: Math.round(file.size / 1024) }), 'error');
      }
    };
    reader.onerror = () => setStatus(ta('status.imageReadError'), 'error');
    reader.readAsDataURL(file);
  }
</script>

{#if area === 'content'}
  <label class="ghost filepick" title={ta('tip.blocks.audioFile')}>
    {ta('ui.chooseAudio')}
    <input type="file" accept="audio/*" onchange={setAudioFile} />
  </label>
  {#if selectedBlock.props.src}
    <button class="ghost" onclick={() => setBlockProp('src', '')}>{ta('ui.removeAudio')}</button>
  {/if}
  <label>{ta('lbl.audioTitle')}
    <input value={selectedBlock.props.title ?? ''}
      onchange={(e) => setBlockProp('title', e.target.value)} /></label>
  <label class="gridmenu-snap">
    <input type="checkbox" checked={Boolean(selectedBlock.props.loop)}
      onchange={(e) => setBlockProp('loop', e.target.checked)} />
    {ta('lbl.audioLoop')}
  </label>
{/if}
