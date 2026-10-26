<script>
  /* The video block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import Pin from '../Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { menu } from '../state.svelte.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps, setBlockVideoFile, setBlockVideoPoster } = ed;
  const { groupChanged, groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
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
    {:else}
      <label class="ghost filepick" title={ta('tip.video.file')}>
        {selectedBlock.props.src ? ta('ui.changeVideo') : ta('ui.chooseVideo')}
        <input type="file" accept="video/mp4,video/webm" onchange={setBlockVideoFile} />
      </label>
      <label class="ghost filepick" title={ta('tip.bg.poster')}>
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
  {#snippet videoA11y()}
    <label title={ta('tip.video.title')}>{ta('lbl.videoTitle')}
      <input value={selectedBlock.props.title ?? ''}
        onchange={(e) => setBlockProp('title', e.target.value)} /></label>
  {/snippet}
  <MenuGroup id="video-source" title={ta('lbl.videoSource')} value={vsource === 'file' ? ta('opt.videoSource.file') : ta('opt.videoSource.embed')}>{@render videoSource()}</MenuGroup>
  {#if vsource === 'file'}
    {@const playOn = [selectedBlock.props.loop === true, selectedBlock.props.muted === true, selectedBlock.props.autoplay === true].filter(Boolean).length}
    <MenuGroup id="video-play" title={ta('group.playback')} value={playOn ? ta('menu.onCount', { n: playOn }) : ta('common.off')} group={groupOf('video-play', { loop: false, muted: false, autoplay: false })}>{@render videoPlay()}</MenuGroup>
  {/if}
  <MenuGroup id="video-a11y" title={ta('group.accessibility')} value={selectedBlock.props.title || ta('menu.noTitle')}>{@render videoA11y()}</MenuGroup>
{/if}
