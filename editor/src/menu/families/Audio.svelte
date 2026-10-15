<script>
  /* The audio block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import { WARN_BYTES } from '$engine/imageTools.js';
  import MenuGroup from '../MenuGroup.svelte';
  import Pin from '../Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps, setStatus } = ed;
  const { groupReset } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
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
  {#snippet audioFile()}
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
  {/snippet}
  {#snippet audioPlayback()}
    <div class="pin-line">
      <label class="gridmenu-snap">
        <input type="checkbox" checked={Boolean(selectedBlock.props.loop)}
          onchange={(e) => setBlockProp('loop', e.target.checked)} />
        {ta('lbl.audioLoop')}
      </label>
      <Pin id="loop" />
    </div>
  {/snippet}
  <MenuGroup id="audio-file" title={ta('group.audioFile')} value={selectedBlock.props.title || (selectedBlock.props.src ? ta('blocks.audio') : ta('common.none'))}>{@render audioFile()}</MenuGroup>
  <MenuGroup id="audio-playback" title={ta('group.playback')} value={selectedBlock.props.loop ? ta('lbl.audioLoop') : ta('menu.standard')} reset={groupReset('audio-playback', { loop: false })}>{@render audioPlayback()}</MenuGroup>
{/if}
