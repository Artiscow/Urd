<script>
  /* Placement (0.7.26.2): how the block sits on the page and behaves there, and its name for links.
     The height, the narrow-screen fit, the phone switch and the pinning stand open; the link target, motion and the frame are groups that show their value while closed. */
  import { getContext } from 'svelte';
  import Dropdown from '../lib/Dropdown.svelte';
  import MenuGroup from './MenuGroup.svelte';
  import Pin from './Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { FIT_BY_WIDTH, FOLLOWS_CONTENT, SIZE, SIZE_BY_FRAME, SIZE_TEXT, baseTextPx, blockSize, sizeBounds, sizeRange } from '$engine/push-model.js';
  import { DOCK_OPTIONS } from './options.js';
  import AnchorField from '../lib/AnchorField.svelte';
  import { blockWords } from '$engine/anchor-model.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const viewMode = $derived(ed.viewMode);
  const sections = $derived(ed.sections);
  const { setBlockAnchor, mutateBlock, setBlockFrame, setBlockFit, setBlockFitMin, setBlockSize, setBlockSizeBound, setBlockHeightMode, setBlockHeightAlign, canStretch, setBlockHideMobile, setBlockDecor, setBlockAnimation, setBlockHover, setBlockAnimProp, isEntrance, blockEntranceOptions, hoverOptions, designWidth, handleMobileReset } = ed;
  const RESET_ICON = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 103-6.7"/><path d="M3 4v5h5"/></svg>';

  /** What a closed group shows: how the block fits a narrower screen, and its motion. */
  function menuFitValue() {
    const byWidth = FIT_BY_WIDTH.has(selectedBlock.type);
    if (selectedBlock.fit === 'shrink') return byWidth ? ta('opt.fit.floor') : ta('opt.fit.shrink');
    if (selectedBlock.fit === 'both') return ta('opt.fit.both');
    return byWidth ? ta('opt.fit.fluid') : ta('opt.fit.wrap');
  }
  function menuMotionValue() {
    const id = isEntrance(selectedBlock.animation) ? selectedBlock.animation.type : selectedBlock.hover?.type;
    const hit = id ? [...blockEntranceOptions(), ...hoverOptions()].find(([v]) => v === id) : null;
    return hit ? hit[1] : ta('common.none');
  }

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
  <div class="ctl-row" title={ta('tip.scale')}>
    <span class="mini-label">{ta('lbl.scale')}</span>
    <input type="range" min={Math.round(sizeRange(selectedBlock).min * 100)} max={Math.round(sizeRange(selectedBlock).max * 100)} step={Math.round(SIZE.step * 100)} value={Math.round(blockSize(selectedBlock) * 100)}
      aria-label={ta('lbl.scale')} oninput={(e) => setBlockSize(e.target.valueAsNumber / 100)} onchange={ed.endSizeGesture} />
    <span class="gridmenu-value">{Math.round(blockSize(selectedBlock) * 100)} %</span>
    <Pin id="size" />
  </div>
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
  <div class="pin-line">
    <label title={ta('tip.fit')}>{ta('lbl.fit')}
      <Dropdown value={selectedBlock.fit ?? 'wrap'}
        options={FIT_BY_WIDTH.has(selectedBlock.type)
          ? [['wrap', ta('opt.fit.fluid')], ['shrink', ta('opt.fit.floor')]]
          : [['wrap', ta('opt.fit.wrap')], ...(designWidth() || selectedBlock.fit === 'shrink' ? [['shrink', ta('opt.fit.shrink')]] : []), ['both', ta('opt.fit.both')]]}
        onchange={(v) => setBlockFit(v)} /></label>
    <Pin id="fit" />
  </div>
  {#if selectedBlock.fit}
    <div class="ctl-row" title={ta('tip.fitMin')}>
      <span class="mini-label">{ta('lbl.fitMin')}</span>
      <input type="range" min="1" max="100" step="1"
        value={Math.round((selectedBlock.fitMin ?? 0.6) * 100)}
        oninput={(e) => setBlockFitMin(e.target.valueAsNumber / 100)} />
      <span class="gridmenu-value">{Math.round((selectedBlock.fitMin ?? 0.6) * 100)} %</span>
    </div>
  {/if}
{/snippet}
{#snippet menuMotion()}
  <label title={ta('tip.props.blockAnim')}>{ta('lbl.animIn')}
    <Dropdown value={isEntrance(selectedBlock.animation) ? selectedBlock.animation.type : ''}
      options={blockEntranceOptions()}
      onchange={(v) => setBlockAnimation(v || null)} /></label>
  {#if isEntrance(selectedBlock.animation)}
    <label>{ta('lbl.durationMs')}
      <input type="number" min="100" max="4000" step="100"
        value={selectedBlock.animation.props.duration}
        onchange={(e) => setBlockAnimProp('duration', Number(e.target.value))} /></label>
    <label>{ta('lbl.delayMs')}
      <input type="number" min="0" max="4000" step="100"
        value={selectedBlock.animation.props.delay}
        onchange={(e) => setBlockAnimProp('delay', Number(e.target.value))} /></label>
  {/if}
  <label title={ta('tip.props.blockHover')}>{ta('lbl.onHover')}
    <Dropdown value={selectedBlock.hover?.type ?? (selectedBlock.animation && !isEntrance(selectedBlock.animation) ? selectedBlock.animation.type : '')}
      options={hoverOptions()}
      onchange={(v) => setBlockHover(v || null)} /></label>
{/snippet}
{#snippet menuSticky()}
  {#if viewMode === 'desktop'}
    <label class="gridmenu-snap" title={ta('tip.sticky')}>
      <input type="checkbox" checked={Boolean(selectedBlock.sticky)}
        onchange={(e) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
          b.sticky = e.target.checked ? { offset: 16, until: null } : null;
        })} />
      {ta('lbl.sticky')}
    </label>
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
          <label>{ta('frame.x')}<input type="number" step="0.5" value={selectedBlock.frame.x}
            onchange={(e) => setBlockFrame('x', Number(e.target.value))} /></label>
          <label>{ta('frame.y')}<input type="number" step="1" value={selectedBlock.frame.y}
            onchange={(e) => setBlockFrame('y', Number(e.target.value))} /></label>
          <label>{ta('frame.w')}<input type="number" step="0.5" min="1" value={selectedBlock.frame.w}
            onchange={(e) => setBlockFrame('w', Number(e.target.value))} /></label>
          <label>{ta('frame.h')}<input type="number" step="1" min="1" value={selectedBlock.frame.h}
            onchange={(e) => setBlockFrame('h', Number(e.target.value))} /></label>
          <label title={ta('tip.frameZ')}>
            {ta('frame.z')}<input type="number" step="1" value={selectedBlock.frame.z ?? 1}
            onchange={(e) => setBlockFrame('z', Number(e.target.value))} /></label>
          <label>{ta('frame.rot')}<input type="number" step="1" value={selectedBlock.frame.rot ?? 0}
            onchange={(e) => setBlockFrame('rot', Number(e.target.value))} /></label>
        </div>
      {:else}
        <!-- The phone: a block flows in the reading order as on desktop, or holds its own place in the row grid (ADR-0019) -->
        {@const pinned = selectedBlock.mobileRow !== null}
        <div class="setting" class:own={pinned}>
          <i class="setting-dot" aria-hidden="true"></i>
          <div class="setting-body">
            <span class="mini-label">{ta('lbl.phonePlacement')}</span>
            <span class="setting-source">{pinned ? ta('menu.phoneRow', { n: selectedBlock.mobileRow + 1 }) : ta('menu.followsDesktop', { v: ta('menu.phoneFlow') })}</span>
          </div>
          {#if pinned}
            <button type="button" class="setting-reset" title={ta('menu.resetPhone')} aria-label={ta('menu.resetPhone')}
              onclick={() => handleMobileReset({ sectionId: selectedBlock.sectionId, blockId: selectedBlock.blockId })}>{@html RESET_ICON}</button>
          {/if}
        </div>
      {/if}
      <label class="gridmenu-snap" title={ta('tip.decor')}>
        <input type="checkbox" checked={selectedBlock.decor}
          onchange={(e) => setBlockDecor(e.target.checked)} />
        {ta('lbl.decor')}
      </label>
{/snippet}

<!-- The height, the narrow-screen fit, the phone switch and the pinning stand open; the link target, motion and the frame are groups -->
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
<div class="pin-line">
  <label class="gridmenu-snap" title={ta('tip.hideMobile')}>
    <input type="checkbox" checked={selectedBlock.hideMobile}
      onchange={(e) => setBlockHideMobile(e.target.checked)} />
    {ta('lbl.hideMobile')}
  </label>
  <Pin id="phone" />
</div>
{@render menuSticky()}
{#snippet menuTarget()}
  <!-- The block's name for links, typed or suggested from its own words -->
  {#key selectedBlock.blockId}
    <AnchorField value={selectedBlock.anchor} own={selectedBlock.blockId} taken={() => ed.anchorsTaken(selectedBlock.blockId)}
      words={blockWords(selectedBlock)} path={ed.pageEntry()?.path ?? '/'} onchange={(name) => setBlockAnchor(name)} />
  {/key}
  {#if selectedBlock.anchor && selectedBlock.hideMobile}
    <p class="panel-hint">{ta('menu.anchorHiddenMobile')}</p>
  {/if}
{/snippet}
<MenuGroup id="link-target" title={ta('group.linkTarget')} value={selectedBlock.anchor ? `#${selectedBlock.anchor}` : ''}>{@render menuTarget()}</MenuGroup>
<MenuGroup id="motion" title={ta('group.motion')} value={menuMotionValue()}>{@render menuMotion()}</MenuGroup>
<MenuGroup id="frame" title={ta('group.placement')} value={viewMode === 'desktop' ? `${selectedBlock.frame.w} % × ${selectedBlock.frame.h}` : ''}>{@render menuFrame()}</MenuGroup>
