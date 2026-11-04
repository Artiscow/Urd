<script>
  /* The video block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import Pin from '../Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { menu } from '../state.svelte.js';
  import { makeGroupHelpers } from '../groups.js';
  import { VIDEO_ASPECTS, aspectRatio, shapeHeight } from '$engine/push-model.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps, setBlockVideoFile, setBlockVideoPoster, openImageEditor } = ed;
  const { groupChanged, groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
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
  {#snippet videoSource()}
    <div class="pin-line">
      <Choice stack label={ta('lbl.videoSource')} value={vsource}
        options={[['embed', ta('opt.videoSource.embed')], ['file', ta('opt.videoSource.file')]]}
        onchange={(v) => setBlockProp('source', v)} />
      <Pin id="videoSource" />
    </div>
    {#if vsource === 'embed'}
      <label title={ta('hint.video')}>{ta('lbl.videoUrl')}</label>
      <input value={selectedBlock.props.url ?? ''} placeholder={ta('ph.videoUrl')}
        onchange={(e) => setBlockProp('url', e.target.value)} />
      <!-- The cover's own picture: the video stands behind the cover until a visitor presses play; once chosen it is framed, adjusted, swapped or removed in the image editor -->
      {#if selectedBlock.props.poster}
        <button type="button" class="ghost action" title={ta('tip.video.coverEdit')} onclick={openImageEditor}>{ta('ui.editCover')}</button>
      {:else}
        <label class="ghost action filepick" title={ta('tip.video.cover')}>
          {ta('ui.chooseCover')}
          <input type="file" accept="image/*" onchange={setBlockVideoPoster} />
        </label>
      {/if}
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
  {/snippet}
  {#snippet videoPlay()}
    <Setting key="loop" shown={ta('common.off')}>
      <label title={ta('tip.video.loop')} class="gridmenu-snap">
        <input type="checkbox" checked={selectedBlock.props.loop === true}
          onchange={(e) => setBlockProp('loop', e.target.checked)} />
        {ta('lbl.videoLoop')}
      </label>
    </Setting>
    <!-- Unmuting takes the self-start with it: only a muted film may start by itself -->
    <Setting key="muted" shown={ta('common.off')}>
      <label title={ta('tip.video.muted')} class="gridmenu-snap">
        <input type="checkbox" checked={selectedBlock.props.muted === true}
          onchange={(e) => setBlockProps('muted', e.target.checked ? { muted: true } : { muted: false, autoplay: false })} />
        {ta('lbl.videoMuted')}
      </label>
    </Setting>
    {#if selectedBlock.props.muted === true}
      <Setting key="autoplay" shown={ta('common.off')}>
        <label class="gridmenu-snap" title={ta('tip.video.autoplay')}>
          <input type="checkbox" checked={selectedBlock.props.autoplay === true}
            onchange={(e) => setBlockProp('autoplay', e.target.checked)} />
          {ta('lbl.videoAutoplay')}
        </label>
      </Setting>
    {/if}
  {/snippet}
  {@render videoSource()}
  {#if vsource === 'file'}
    {@const playOn = [selectedBlock.props.loop === true, selectedBlock.props.muted === true, selectedBlock.props.autoplay === true].filter(Boolean).length}
    <MenuGroup id="video-play" title={ta('group.playback')} value={playOn ? ta('menu.onCount', { n: playOn }) : ta('common.off')} group={groupOf('video-play', { loop: false, muted: false, autoplay: false })}>{@render videoPlay()}</MenuGroup>
  {:else}
    <!-- An embedded video: whether the press on its cover also starts it -->
    <label title={ta('tip.video.playOnPress')} class="gridmenu-snap">
      <input type="checkbox" checked={selectedBlock.props.playOnPress !== false}
        onchange={(e) => setBlockProp('playOnPress', e.target.checked)} />
      {ta('lbl.videoPlayOnPress')}
    </label>
  {/if}
  <label title={ta('tip.video.title')}>{ta('lbl.videoTitle')}
    <input value={selectedBlock.props.title ?? ''}
      onchange={(e) => setBlockProp('title', e.target.value)} /></label>
{:else if area === 'style'}
  <label title={ta('tip.video.aspect')}>{ta('lbl.videoAspect')}
    <Dropdown value={aspectValue} options={aspectOptions} onchange={setAspect} /></label>
{/if}
