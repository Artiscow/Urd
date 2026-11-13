<script>
  /* Placement (0.7.26.2): how the block sits on the page and behaves there, and its name for links.
     The height, the size and the narrow-screen fit stand open, and the frame is a group that shows its value while closed; hiding on phones, the pinning, the name for links and the decor are capabilities (ADR-0031), each a card while the block uses it or was given it this session, after the frame. The block's motion stands in Style (MotionFold.svelte).
     The height, the size, the fit and the pinning's settings are setting rows that tell whether the block holds a value of its own, with the way back to the standard (lib/rows/Setting.svelte), and what belongs to each stands in its row; the pinning's switch is its own way back, and hiding on phones and the decor are switches on their cards; the frame's numbers and the name for links are plain rows, since every block has a place of its own and the name's card takes it away only while no link reaches the block by it. */
  import { getContext } from 'svelte';
  import Capability from '../lib/rows/Capability.svelte';
  import Dropdown from '../lib/Dropdown.svelte';
  import Fold from '../lib/rows/Fold.svelte';
  import Setting from '../lib/rows/Setting.svelte';
  import SliderRow from '../lib/rows/SliderRow.svelte';
  import SwitchRow from '../lib/rows/SwitchRow.svelte';
  import Choice from '../lib/Choice.svelte';
  import SelectRow from '../lib/rows/SelectRow.svelte';
  import IconButton from '../lib/rows/IconButton.svelte';
  import FitMin from './FitMin.svelte';
  import SizeBounds from './SizeBounds.svelte';
  import { ta } from '$engine/i18n.js';
  import { FIT_BY_WIDTH, FOLLOWS_CONTENT, SIZE, SIZE_BY_FRAME, blockSize, sizeRange } from '$engine/push-model.js';
  import { DOCK_OPTIONS } from './options.js';
  import AnchorField from '../lib/AnchorField.svelte';
  import { blockWords } from '$engine/anchor-model.js';
  import { stackOrder, phoneSetupOf } from '$engine/phone-order.js';
  import { phonePlaceKeeping, hasPhonePlace, phoneStackOf, flowing } from '$engine/phone-moves.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const sections = $derived(ed.sections);
  const { setBlockAnchor, mutateBlock, setBlockFrame, setBlockFit, setBlockSize, setBlockHeightMode, setBlockHeightAlign, canStretch, designWidth, handleMobileReset, setStickyPhone, setBlockPhonePlace } = ed;
  const RESET_ICON = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 103-6.7"/><path d="M3 4v5h5"/></svg>';

  /** Sets the pinning's own settings; a setting given as undefined goes back to the standard and is removed. */
  function setSticky(patch) {
    mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
      const next = { ...b.sticky, ...patch };
      for (const key of Object.keys(next)) if (next[key] === undefined) delete next[key];
      b.sticky = next;
    });
  }

  /** The selected block's section, read again after every change and every undo, since the page's data is no state of its own: a new copy each time, so its phone order (phone-order.js) follows. */
  const blockSection = $derived.by(() => {
    void ed.edits;
    void ed.restores;
    const found = ed.sections.find((s) => s.id === selectedBlock?.sectionId);
    return found ? { ...found, blocks: found.blocks.slice() } : null;
  });
  const phoneSetup = $derived(blockSection ? phoneSetupOf(blockSection) : null);
  /** The section's flowing blocks in the phone's order: a block placed by hand stands on rows of its own. */
  const phoneFlow = $derived(blockSection ? stackOrder(blockSection.blocks, phoneSetup).filter(flowing) : []);
  /** The stack of the owner's the block stands in (phone-moves.js), or null. */
  const phoneStack = $derived(blockSection ? phoneStackOf(blockSection.blocks, phoneSetup, selectedBlock.blockId) : null);
  /** Whether a place of the block's own counts: not in a custom order, nor for a block inside a stack, which reads where its stack's first block puts it. */
  const phonePlaceCounts = $derived(Boolean(phoneSetup) && !phoneSetup.list && (!phoneStack || phoneStack[0] === selectedBlock.blockId));
  /** The block's exception in the phone order, where it holds: '' where it follows the section's rule. */
  const phoneSide = $derived.by(() => {
    const block = blockSection?.blocks.find((b) => b.id === selectedBlock.blockId);
    if (!block || !hasPhonePlace(block, blockSection.blocks, phoneSetup)) return '';
    return typeof block.phonePlace.before === 'string' ? 'before' : 'after';
  });
  /** The other flowing blocks it can stand before or after, in the phone's order, each named by its kind and its first words; its own stack's are left out. */
  const phoneNeighbours = $derived(phoneFlow.filter((b) => b.id !== selectedBlock.blockId && !phoneStack?.includes(b.id)).map((b) => {
    const words = blockWords(b);
    return [b.id, words ? `${ed.blockLabel(b.type)}: ${words}` : ed.blockLabel(b.type)];
  }));
  /** Before or after: next to the block beside it, so nothing moves where that can be (phonePlaceKeeping), until another block is picked. */
  function pickPhoneSide(side) {
    if (!side) {
      setBlockPhonePlace(null);
      return;
    }
    const place = blockSection ? phonePlaceKeeping(blockSection.blocks, phoneSetup, selectedBlock.blockId, side) : null;
    if (place) setBlockPhonePlace(place);
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
  <Setting pin="size" own={blockSize(selectedBlock) !== 1} reset={() => { setBlockSize(1); ed.endSizeGesture(); }}>
    <SliderRow label={ta('lbl.scale')} title={ta('tip.scale')} min={Math.round(sizeRange(selectedBlock).min * 100)} max={Math.round(sizeRange(selectedBlock).max * 100)} step={Math.round(SIZE.step * 100)}
      value={Math.round(blockSize(selectedBlock) * 100)} shown={`${Math.round(blockSize(selectedBlock) * 100)} %`}
      oninput={(v) => setBlockSize(v / 100)} onchange={ed.endSizeGesture} />
    {#snippet more()}<SizeBounds />{/snippet}
  </Setting>
{/snippet}
{#snippet menuFit()}
  <!-- Below the design width: block-level on every block (ADR-0024); the content wraps, shrinks in proportion, or shrinks as little as it can and wraps, or the frame keeps a floor -->
  <!-- What belongs to the narrow-screen choice stands under it in its row; in Pinned the row brings it along as its `more` (ElementMenu.svelte) -->
  <Setting pin="fit" own={selectedBlock.fit === 'shrink' || selectedBlock.fit === 'both'} reset={() => setBlockFit('wrap')}>
    <Choice stack label={ta('lbl.fit')} title={ta('tip.fit')} value={selectedBlock.fit === 'shrink' || selectedBlock.fit === 'both' ? selectedBlock.fit : 'wrap'}
      options={FIT_BY_WIDTH.has(selectedBlock.type)
        ? [['wrap', ta('quick.fit.fluid')], ['shrink', ta('quick.fit.floor')]]
        : [['wrap', ta('quick.fit.wrap')], ...(designWidth() || selectedBlock.fit === 'shrink' ? [['shrink', ta('quick.fit.shrink')]] : []), ['both', ta('quick.fit.both')]]}
      onchange={(v) => setBlockFit(v)} />
    {#snippet more()}<FitMin />{/snippet}
  </Setting>
{/snippet}
{#snippet menuSticky()}
  <Capability id="sticky">
    <!-- The pinning and what belongs to it, one setting row: the switch is its own way back, and each of its settings is a row of its own with its way back to the standard -->
    <Setting own={Boolean(selectedBlock.sticky)} reset={() => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => { b.sticky = null; })}>
      <SwitchRow label={ta('lbl.sticky')} title={ta('tip.sticky')} checked={Boolean(selectedBlock.sticky)}
        onchange={(on) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
          b.sticky = on ? { offset: 16, until: null } : null;
        })} />
      {#if selectedBlock.sticky}
        <Setting own={(selectedBlock.sticky.mode ?? 'scroll') !== 'scroll'} reset={() => setSticky({ mode: undefined })}>
          <label title={ta('tip.stickyMode')}>{ta('lbl.stickyMode')}
            <Dropdown value={selectedBlock.sticky.mode ?? 'scroll'}
              options={[['scroll', ta('opt.sticky.modeScroll')], ['screen', ta('opt.sticky.modeScreen')]]}
              onchange={(v) => setSticky({ mode: v })} /></label>
        </Setting>
        <!-- Pinning while scrolling on the phone too, directly under the choice it belongs to; a block docked to the screen docks on every screen -->
        {#if (selectedBlock.sticky.mode ?? 'scroll') === 'scroll'}
          <SwitchRow label={ta('lbl.stickyPhone')} title={ta('tip.stickyPhone')} checked={selectedBlock.sticky.phone === true} onchange={(on) => setStickyPhone(on)} />
        {/if}
        <!-- The offset applies only to the edges the block is docked to, so with both axes centred it has no effect and is hidden. -->
        {#if selectedBlock.sticky.mode !== 'screen' || (selectedBlock.sticky.dock ?? 'bottom-right') !== 'middle-center'}
          <Setting own={(selectedBlock.sticky.offset ?? 16) !== 16} reset={() => setSticky({ offset: 16 })}>
            <label title={selectedBlock.sticky.mode === 'screen' ? ta('tip.stickyEdge') : ta('tip.stickyOffset')}>
              {selectedBlock.sticky.mode === 'screen' ? ta('lbl.stickyEdge') : ta('lbl.stickyOffset')}
              <input type="number" min="0" max="400" value={selectedBlock.sticky.offset ?? 16}
                onchange={(e) => setSticky({ offset: Math.max(0, Number(e.target.value) || 0) })} /></label>
          </Setting>
        {/if}
        {#if selectedBlock.sticky.mode === 'screen'}
          <Setting own={(selectedBlock.sticky.dock ?? 'bottom-right') !== 'bottom-right'} reset={() => setSticky({ dock: undefined })}>
            <label title={ta('tip.stickyDock')}>{ta('lbl.stickyDock')}
              <Dropdown value={selectedBlock.sticky.dock ?? 'bottom-right'}
                options={DOCK_OPTIONS.map(([v, key]) => [v, ta(key)])}
                onchange={(v) => setSticky({ dock: v })} /></label>
          </Setting>
        {:else}
          <Setting own={selectedBlock.sticky.until != null} reset={() => setSticky({ until: null })}>
            <label title={ta('tip.stickyUntil')}>{ta('lbl.stickyUntil')}
              <Dropdown value={selectedBlock.sticky.until ?? ''}
                options={stickyUntilOptions()}
                onchange={(v) => setSticky({ until: v || null })} /></label>
          </Setting>
        {/if}
      {/if}
    </Setting>
  </Capability>
{/snippet}
{#snippet menuFrame()}
  <span class="mini-label">{ta('lbl.desktopPlacement')}</span>
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
  <!-- Its place in the phone's order: as the section's rule puts it, or directly before or after a block it names; a block hidden on phones, a block placed by hand, the only flowing block, a block inside a stack, and every block of a custom order have none -->
  {#if !selectedBlock.hideMobile && selectedBlock.mobileRow === null && phonePlaceCounts && phoneNeighbours.length}
    <Setting own={Boolean(phoneSide)} reset={() => setBlockPhonePlace(null)}>
      <Choice stack label={ta('lbl.phoneOrder')} title={ta('tip.phonePlace')} value={phoneSide}
        options={[['', ta('opt.phonePlace.rule')], ['before', ta('opt.phonePlace.before')], ['after', ta('opt.phonePlace.after')]]}
        onchange={(v) => pickPhoneSide(v)} />
      {#if phoneSide}
        <SelectRow label={ta('lbl.phonePlaceOf')} value={selectedBlock.phonePlace[phoneSide]} options={phoneNeighbours}
          onchange={(id) => setBlockPhonePlace({ [phoneSide]: id })} />
      {/if}
    </Setting>
  {/if}
{/snippet}

<!-- The height, the size and the narrow-screen fit stand open; the frame is a group, and the capabilities' cards follow it -->
{#if FOLLOWS_CONTENT.has(selectedBlock.type)}
  <!-- The height (ADR-0025 decision 3): the box is the content's, or the block's own with the content placed in it, which stands in the height's row -->
  <Setting own={selectedBlock.height?.mode === 'own'} reset={() => setBlockHeightMode('content')}>
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
  </Setting>
{/if}
{#if !SIZE_BY_FRAME.has(selectedBlock.type)}
  {@render menuSize()}
{/if}
{@render menuFit()}
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
<!-- The frame's numbers on the desktop and the line of the phone's placement, a group of their own -->
<Fold id="frame" title={ta('group.placement')} value={`${selectedBlock.frame.w} % × ${selectedBlock.frame.h}`}>{@render menuFrame()}</Fold>
<!-- The capabilities of Placement, after its core rows -->
<!-- Hiding on phones and showing at once are one switch each, a card of one line with its chip (menu/capabilities.js `single`) -->
<Capability id="phone" />
<Capability id="phoneOnly" />
{@render menuSticky()}
<Capability id="link-target">{@render menuTarget()}</Capability>
<Capability id="decor" />
