<script>
  /* The audio block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import { WARN_BYTES } from '$engine/imageTools.js';
  import Fold from '../../lib/rows/Fold.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps, setStatus } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
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
    <label title={ta('tip.audio.title')}>{ta('lbl.audioTitle')}
      <input value={selectedBlock.props.title ?? ''}
        onchange={(e) => setBlockProp('title', e.target.value)} /></label>
    <Setting key="loop" pin="loop">
      <SwitchRow label={ta('lbl.audioLoop')} title={ta('tip.audio.loop')} checked={Boolean(selectedBlock.props.loop)} onchange={(on) => setBlockProp('loop', on)} />
    </Setting>
  {/snippet}
  <Fold id="audio-file" title={ta('blocks.audio')} value={selectedBlock.props.title || (selectedBlock.props.src ? ta('blocks.audio') : ta('common.none'))}
    group={groupOf('audio-file', { loop: false })}>{@render audioFile()}</Fold>
{/if}
