<script>
  /* Placement (0.7.26.2): how the block sits on the page and behaves there, and its name for links.
     The height, the narrow-screen fit, the phone switch and the pinning stand open; the link target and the frame are groups that show their value while closed. The block's motion stands in Style (MotionFold.svelte). */
  import { getContext } from 'svelte';
  import Dropdown from '../lib/Dropdown.svelte';
  import Fold from '../lib/rows/Fold.svelte';
  import Setting from '../lib/rows/Setting.svelte';
  import SliderRow from '../lib/rows/SliderRow.svelte';
  import SwitchRow from '../lib/rows/SwitchRow.svelte';
  import Choice from '../lib/Choice.svelte';
  import IconButton from '../lib/rows/IconButton.svelte';
  import ActionRow from '../lib/rows/ActionRow.svelte';
  import { ICONS } from '../lib/icons.js';
  import FitMin from './FitMin.svelte';
  import { pinnedNow } from './pinned.js';
  import { ta } from '$engine/i18n.js';
  import { FIT_BY_WIDTH, FOLLOWS_CONTENT, SIZE, SIZE_BY_FRAME, SIZE_TEXT, baseTextPx, blockSize, sizeBounds, sizeRange } from '$engine/push-model.js';
  import { DOCK_OPTIONS } from './options.js';
  import AnchorField from '../lib/AnchorField.svelte';
  import { blockWords } from '$engine/anchor-model.js';
  const ed = getContext('urd-editor');
  /** Which settings stand in Pinned now: what belongs to one of them goes with it. */
  const pinned = pinnedNow();
  const selectedBlock = $derived(ed.selectedBlock);
  const viewMode = $derived(ed.viewMode);
  const sections = $derived(ed.sections);
  const { setBlockAnchor, mutateBlock, setBlockFrame, setBlockFit, setBlockSize, setBlockSizeBound, setBlockHeightMode, setBlockHeightAlign, canStretch, setBlockHideMobile, setBlockDecor, designWidth, handleMobileReset } = ed;
  const RESET_ICON = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 103-6.7"/><path d="M3 4v5h5"/></svg>';

  /** The "let go" options for sticky: only the sections AFTER the block's
   *  own (pinning backwards makes no sense; settings are shown only when
   *  relevant). */
  function stickyUntilOptions() {
    const idx = sections.findIndex((s) => s.id === selectedBlock?.sectionId);
    // A block whose section is not found offers its own section only.
    if (idx < 0) return [['', ta('opt.sticky.ownSection')]];
    return [
      ['', ta('opt.sticky.ownSection')],
      ...sections.slice(idx + 1).map((s, i) => [s.id, ta('opt.sticky.atSection', { n: idx + 2 + i })]),
    ];
  }
</script>

{#snippet menuSize()}
  <!-- The block's size (ADR-0025 decision 6): the whole block, text included, drawn smaller or larger; no drag changes it, and the slider ends where the base text meets a bound the owner set -->
  <Setting pin="size">
    <SliderRow label={ta('lbl.scale')} title={ta('tip.scale')} min={Math.round(sizeRange(selectedBlock).min * 100)} max={Math.round(sizeRange(selectedBlock).max * 100)} step={Math.round(SIZE.step * 100)}
      value={Math.round(blockSize(selectedBlock) * 100)} shown={`${Math.round(blockSize(selectedBlock) * 100)} %`}
      oninput={(v) => setBlockSize(v / 100)} onchange={ed.endSizeGesture} />
  </Setting>
  {#if blockSize(selectedBlock) !== 1}
    <!-- The bounds the owner may give the base text, where the slider then ends, shown only while a size is set, side by side so the menu keeps its height; empty, each shows the base text's size now -->
    <div class="frame-grid">
      <label title={ta('tip.scaleMin')}>{ta('lbl.scaleMin')}<input type="number" min={SIZE_TEXT.min} max={SIZE_TEXT.max} value={sizeBounds(selectedBlock).min ?? ''}
        placeholder={String(Math.round(baseTextPx(selectedBlock) * blockSize(selectedBlock)))} onchange={(e) => setBlockSizeBound('sizeMin', e.target.value)} /></label>
      <label title={ta('tip.scaleMax')}>{ta('lbl.scaleMax')}<input type="number" min={SIZE_TEXT.min} max={SIZE_TEXT.max} value={sizeBounds(selectedBlock).max ?? ''}
        placeholder={String(Math.round(baseTextPx(selectedBlock) * blockSize(selectedBlock)))} onchange={(e) => setBlockSizeBound('sizeMax', e.target.value)} /></label>
    </div>
  {/if}
{/snippet}
{#snippet menuFit()}
  <!-- Below the design width: block-level on every block (ADR-0024); the content wraps, shrinks in proportion, or shrinks as little as it can and wraps, or the frame keeps a floor -->
  <Setting pin="fit">
    <Choice stack label={ta('lbl.fit')} title={ta('tip.fit')} value={selectedBlock.fit === 'shrink' || selectedBlock.fit === 'both' ? selectedBlock.fit : 'wrap'}
      options={FIT_BY_WIDTH.has(selectedBlock.type)
        ? [['wrap', ta('quick.fit.fluid')], ['shrink', ta('quick.fit.floor')]]
        : [['wrap', ta('quick.fit.wrap')], ...(designWidth() || selectedBlock.fit === 'shrink' ? [['shrink', ta('quick.fit.shrink')]] : []), ['both', ta('quick.fit.both')]]}
      onchange={(v) => setBlockFit(v)} />
  </Setting>
  <!-- What belongs to the narrow-screen choice goes with it into Pinned -->
  {#if !pinned.has('fit')}<FitMin />{/if}
{/snippet}
{#snippet menuSticky()}
  {#if viewMode === 'desktop'}
    <SwitchRow label={ta('lbl.sticky')} title={ta('tip.sticky')} checked={Boolean(selectedBlock.sticky)}
      onchange={(on) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
        b.sticky = on ? { offset: 16, until: null } : null;
      })} />
    {#if selectedBlock.sticky}
      <label title={ta('tip.stickyMode')}>{ta('lbl.stickyMode')}
        <Dropdown value={selectedBlock.sticky.mode ?? 'scroll'}
          options={[['scroll', ta('opt.sticky.modeScroll')], ['screen', ta('opt.sticky.modeScreen')]]}
          onchange={(v) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
            b.sticky = { ...b.sticky, mode: v };
          })} /></label>
      <!-- The offset applies only to edges the block is actually docked
           to: with both axes centered it has no effect and is hidden. -->
      {#if selectedBlock.sticky.mode !== 'screen' || (selectedBlock.sticky.dock ?? 'bottom-right') !== 'middle-center'}
        <label title={selectedBlock.sticky.mode === 'screen' ? ta('tip.stickyEdge') : ta('tip.stickyOffset')}>
          {selectedBlock.sticky.mode === 'screen' ? ta('lbl.stickyEdge') : ta('lbl.stickyOffset')}
          <input type="number" min="0" max="400" value={selectedBlock.sticky.offset ?? 16}
            onchange={(e) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
              b.sticky = { ...b.sticky, offset: Math.max(0, Number(e.target.value) || 0) };
            })} /></label>
      {/if}
      {#if selectedBlock.sticky.mode === 'screen'}
        <label title={ta('tip.stickyDock')}>{ta('lbl.stickyDock')}
          <Dropdown value={selectedBlock.sticky.dock ?? 'bottom-right'}
            options={DOCK_OPTIONS.map(([v, key]) => [v, ta(key)])}
            onchange={(v) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
              b.sticky = { ...b.sticky, dock: v };
            })} /></label>
      {:else}
        <label title={ta('tip.stickyUntil')}>{ta('lbl.stickyUntil')}
          <Dropdown value={selectedBlock.sticky.until ?? ''}
            options={stickyUntilOptions()}
            onchange={(v) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
              b.sticky = { ...b.sticky, until: v || null };
            })} /></label>
      {/if}
    {/if}
  {/if}
{/snippet}
{#snippet menuFrame()}
      {#if viewMode === 'desktop'}
        <div class="frame-grid">
          <label title={ta('tip.frame.x')}>{ta('frame.x')}<input type="number" step="0.5" value={selectedBlock.frame.x}
            onchange={(e) => setBlockFrame('x', Number(e.target.value))} /></label>
          <label title={ta('tip.frame.y')}>{ta('frame.y')}<input type="number" step="1" value={selectedBlock.frame.y}
            onchange={(e) => setBlockFrame('y', Number(e.target.value))} /></label>
          <label title={ta('tip.frame.w')}>{ta('frame.w')}<input type="number" step="0.5" min="1" value={selectedBlock.frame.w}
            onchange={(e) => setBlockFrame('w', Number(e.target.value))} /></label>
          <label title={ta('tip.frame.h')}>{ta('frame.h')}<input type="number" step="1" min="1" value={selectedBlock.frame.h}
            onchange={(e) => setBlockFrame('h', Number(e.target.value))} /></label>
          <label title={ta('tip.frameZ')}>
            {ta('frame.z')}<input type="number" step="1" value={selectedBlock.frame.z ?? 1}
            onchange={(e) => setBlockFrame('z', Number(e.target.value))} /></label>
          <label title={ta('tip.frame.rot')}>{ta('frame.rot')}<input type="number" step="1" value={selectedBlock.frame.rot ?? 0}
            onchange={(e) => setBlockFrame('rot', Number(e.target.value))} /></label>
        </div>
      {:else}
        <!-- The phone: a block flows in the reading order as on desktop, or holds its own place in the row grid (ADR-0019) -->
        {@const held = selectedBlock.mobileRow !== null}
        <div class="setting">
          <div class="setting-body">
            <span class="mini-label">{ta('lbl.phonePlacement')}</span>
            <span class="setting-source">{held ? ta('menu.phoneRow', { n: selectedBlock.mobileRow + 1 }) : ta('menu.followsDesktop', { v: ta('menu.phoneFlow') })}</span>
          </div>
          {#if held}
            <IconButton size="sm" quiet class="setting-reset" icon={RESET_ICON} label={ta('menu.resetPhone')}
              onclick={() => handleMobileReset({ sectionId: selectedBlock.sectionId, blockId: selectedBlock.blockId })} />
          {/if}
        </div>
      {/if}
      <SwitchRow label={ta('lbl.decor')} title={ta('tip.decor')} checked={Boolean(selectedBlock.decor)} onchange={(on) => setBlockDecor(on)} />
{/snippet}

<!-- The height, the narrow-screen fit, the phone switch and the pinning stand open; the link target and the frame are groups -->
{#if FOLLOWS_CONTENT.has(selectedBlock.type)}
  <!-- The height (ADR-0025 decision 3): the box is the content's, or the block's own with the content placed in it -->
  <label title={ta('tip.height')}>{ta('lbl.height')}
    <Dropdown value={selectedBlock.height?.mode === 'own' ? 'own' : 'content'}
      options={[['content', ta('opt.height.content')], ['own', ta('opt.height.own')]]}
      onchange={(v) => setBlockHeightMode(v)} /></label>
  {#if selectedBlock.height?.mode === 'own'}
    {@const align = ['middle', 'bottom', 'stretch'].includes(selectedBlock.height.align) ? selectedBlock.height.align : 'top'}
    <label title={ta('tip.heightAlign')}>{ta('lbl.heightAlign')}
      <Dropdown value={align}
        options={[['top', ta('opt.heightAlign.top')], ['middle', ta('opt.heightAlign.middle')], ['bottom', ta('opt.heightAlign.bottom')],
          ...(canStretch() || align === 'stretch' ? [['stretch', ta('opt.heightAlign.stretch')]] : [])]}
        onchange={(v) => setBlockHeightAlign(v)} /></label>
  {/if}
{/if}
{#if !SIZE_BY_FRAME.has(selectedBlock.type)}
  {@render menuSize()}
{/if}
{@render menuFit()}
<Setting pin="phone">
  <SwitchRow label={ta('lbl.hideMobile')} title={ta('tip.hideMobile')} checked={Boolean(selectedBlock.hideMobile)} onchange={(on) => setBlockHideMobile(on)} />
</Setting>
{@render menuSticky()}
{#snippet menuTarget()}
  <!-- The block's name for links, typed or suggested from its own words -->
  {#key selectedBlock.blockId}
    <AnchorField value={selectedBlock.anchor} own={selectedBlock.blockId} taken={() => ed.anchorsTaken(selectedBlock.blockId)}
      words={blockWords(selectedBlock)} path={ed.pageEntry()?.path ?? '/'} onchange={(name) => setBlockAnchor(name)} />
  {/key}
  {#if selectedBlock.anchor && selectedBlock.hideMobile}
    <span class="field-note" title={ta('menu.anchorHiddenMobile')}><i class="note-dot"></i>{ta('lbl.hideMobile')}</span>
  {/if}
{/snippet}
<!-- The block's name for links is one setting, so it stands alone -->
<Fold id="link-target" rows={1} title={ta('group.linkTarget')} value={selectedBlock.anchor ? `#${selectedBlock.anchor}` : ''}>{@render menuTarget()}</Fold>
<Fold id="frame" title={ta('group.placement')} value={viewMode === 'desktop' ? `${selectedBlock.frame.w} % × ${selectedBlock.frame.h}` : ''}>{@render menuFrame()}</Fold>
<!-- The block's actions, as on its bar and in its right-click menu: the layer order only on the desktop, where the blocks overlap -->
<ActionRow label={ta('canvas.ctx.label')} actions={[
  { id: 'duplicate', icon: ICONS.copy, label: ta('canvas.ctx.duplicate'), run: () => ed.bridge?.sendDuplicate() },
  ...(viewMode === 'desktop' ? [
    { id: 'front', icon: ICONS.up, label: ta('canvas.ctx.toFront'), run: () => ed.setBlockLayer(1) },
    { id: 'back', icon: ICONS.down, label: ta('canvas.ctx.toBack'), run: () => ed.setBlockLayer(-1) },
  ] : []),
  { id: 'delete', icon: ICONS.cross, label: ta('canvas.ctx.delete'), arm: ta('canvas.ctx.pressAgain'),
    run: () => ed.handleDelete({ sectionId: selectedBlock.sectionId, blockId: selectedBlock.blockId }) },
]} />
