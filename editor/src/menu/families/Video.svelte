<script>
  /* The video block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import SelectRow from '../../lib/rows/SelectRow.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import Capability from '../../lib/rows/Capability.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import { ta } from '$engine/i18n.js';
  import { menu } from '../state.svelte.js';
  import { makeGroupHelpers } from '../groups.js';
  import { ICONS } from '../../lib/icons.js';
  import { VIDEO_ASPECTS, aspectRatio, shapeHeight } from '$engine/push-model.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps, setBlockVideoFile, setBlockVideoPoster, openImageEditor } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();

  const aspectOptions = $derived([['free', ta('opt.videoAspect.free')], ...VIDEO_ASPECTS.map((a) => [a, ta(`opt.videoAspect.${a.replace(':', 'x')}`)])]);
  const aspectValue = $derived(VIDEO_ASPECTS.includes(selectedBlock.props.aspect) ? selectedBlock.props.aspect : 'free');

  /**
   * A shape for the video (keepsShape in push-model.js): the frame keeps its height and takes the width the shape gives it, moving left where the room to its right is too small, and the height then follows that width.
   * Only a shape wider than the whole section is narrowed to it, and loses height with it. «Fill the frame» leaves the frame as it is. One undo step.
   */
  function setAspect(value) {
    ed.mutateBlock(`edit:${selectedBlock.blockId}:aspect`, (b) => {
      if (value === 'free') {
        delete b.props.aspect;
        return;
      }
      b.props.aspect = value;
      const ratio = aspectRatio(value);
      const frame = b.frames?.desktop;
      const designPx = ed.designWidth();
      if (!ratio || !frame || designPx <= 0) return;
      const w = Math.round(((frame.h * ratio) / designPx) * 10000) / 100;
      frame.w = Math.max(1, Math.min(w, 100));
      frame.x = Math.min(frame.x, Math.round((100 - frame.w) * 100) / 100);
      frame.h = shapeHeight(b, designPx);
    });
  }
</script>

{#if area === 'content'}
  {@const vsource = selectedBlock.props.source === 'file' ? 'file' : 'embed'}
  {@const askFirst = selectedBlock.props.askFirst !== false}
  <!-- The source is what the video is, a link or a file of its own, so it has no way back -->
  <Setting pin="videoSource">
    <Choice stack label={ta('lbl.videoSource')} value={vsource}
      options={[['embed', ta('opt.videoSource.embed')], ['file', ta('opt.videoSource.file')]]}
      onchange={(v) => setBlockProp('source', v)} />
  </Setting>
  {#snippet videoWhat()}
    {#if vsource === 'embed'}
      <label title={ta('hint.video')}>{ta('lbl.videoUrl')}
        <input value={selectedBlock.props.url ?? ''} placeholder={ta('ph.videoUrl')}
          onchange={(e) => setBlockProp('url', e.target.value)} /></label>
    {:else}
      <label class="ghost action filepick" title={ta('tip.video.file')}>
        {selectedBlock.props.src ? ta('ui.changeVideo') : ta('ui.chooseVideo')}
        <input type="file" accept="video/mp4,video/webm" onchange={setBlockVideoFile} />
      </label>
      <label class="ghost action filepick" title={ta('tip.bg.poster')}>
        {selectedBlock.props.poster ? ta('ui.changeImage') : ta('ui.choosePoster')}
        <input type="file" accept="image/*" onchange={setBlockVideoPoster} />
      </label>
    {/if}
    <label title={ta('tip.video.title')}>{ta('lbl.videoTitle')}
      <input value={selectedBlock.props.title ?? ''}
        onchange={(e) => setBlockProp('title', e.target.value)} /></label>
  {/snippet}
  {#snippet videoPlay()}
    {#if vsource === 'embed'}
      <!-- Whether the video stands behind a cover until a visitor presses play, or loads with the page; the cover and the press stand in its row -->
      <Setting key="askFirst">
        <SwitchRow label={ta('lbl.embedAskFirst')} title={ta('tip.embed.askFirst')} checked={askFirst} onchange={(on) => setBlockProp('askFirst', on)} />
        {#if askFirst}
          <!-- The cover's own picture; once chosen it is framed, adjusted, swapped or removed in the image editor -->
          {#if selectedBlock.props.poster}
            <button type="button" class="ghost action" title={ta('tip.video.coverEdit')} onclick={openImageEditor}>{ta('ui.editCover')}</button>
            <button type="button" class="ghost action danger" title={ta('tip.video.coverRemove')} onclick={() => ed.mutateBlock(`edit:${selectedBlock.blockId}`, (b) => { b.props.poster = ''; delete b.props.coverStyle; })}>{@html ICONS.bin} {ta('ui.removeCover')}</button>
          {:else}
            <label class="ghost action filepick" title={ta('tip.video.cover')}>
              {ta('ui.chooseCover')}
              <input type="file" accept="image/*" onchange={setBlockVideoPoster} />
            </label>
          {/if}
          <!-- Whether the press on the cover also starts the video -->
          <Setting key="playOnPress">
            <SwitchRow label={ta('lbl.videoPlayOnPress')} title={ta('tip.video.playOnPress')} checked={selectedBlock.props.playOnPress !== false} onchange={(on) => setBlockProp('playOnPress', on)} />
          </Setting>
        {/if}
      </Setting>
    {:else}
      <Setting key="loop">
        <SwitchRow label={ta('lbl.videoLoop')} title={ta('tip.video.loop')} checked={selectedBlock.props.loop === true} onchange={(on) => setBlockProp('loop', on)} />
      </Setting>
      <!-- Unmuting takes the self-start with it: only a muted film may start by itself, so the self-start stands in the muting's row and its way back goes with it -->
      <Setting key="muted" reset={() => setBlockProps('muted', { muted: false, autoplay: false })}>
        <SwitchRow label={ta('lbl.videoMuted')} title={ta('tip.video.muted')} checked={selectedBlock.props.muted === true}
          onchange={(on) => setBlockProps('muted', on ? { muted: true } : { muted: false, autoplay: false })} />
        {#if selectedBlock.props.muted === true}
          <Setting key="autoplay">
            <SwitchRow label={ta('lbl.videoAutoplay')} title={ta('tip.video.autoplay')} checked={selectedBlock.props.autoplay === true} onchange={(on) => setBlockProp('autoplay', on)} />
          </Setting>
        {/if}
      </Setting>
    {/if}
  {/snippet}
  {@const playDefaults = vsource === 'embed' ? { askFirst: true, playOnPress: true } : { loop: false, muted: false, autoplay: false }}
  {@const playOn = [askFirst, askFirst && selectedBlock.props.playOnPress !== false].filter(Boolean).length}
  <Fold id="video-what" title={ta('blocks.video')} value={vsource === 'embed' ? selectedBlock.props.url || ta('common.none') : selectedBlock.props.title || ta('blocks.video')}>{@render videoWhat()}</Fold>
  {#if vsource === 'embed'}
    <!-- An embed asks first from the start, so its playback stands as a section -->
    <Fold id="video-play" title={ta('group.playback')} value={playOn ? ta('menu.onCount', { n: playOn }) : ta('common.off')}
      rows={askFirst ? 2 : 1} group={groupOf('video-play', playDefaults)}>{@render videoPlay()}</Fold>
  {:else}
    <!-- An uploaded film's playback starts off: an extra, added from the list or standing while a switch is on -->
    <Capability id="video-play" group={groupOf('video-play', playDefaults)}>{@render videoPlay()}</Capability>
  {/if}
{:else if area === 'style'}
  <Setting own={aspectValue !== 'free'} reset={() => setAspect('free')}>
    <SelectRow label={ta('lbl.videoAspect')} title={ta('tip.video.aspect')} value={aspectValue} options={aspectOptions} onchange={setAspect} />
  </Setting>
{/if}
