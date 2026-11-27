<script>
  /* The section's own settings for the phone: the space around its blocks, readable text, their order, and the layouts of its cells.
     `part` draws one part alone. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { MOBILE_GAP_MAX, mobileGapOf, MOBILE_ROOM_REACH, phoneRoomOf } from '$engine/migrate.js';
  import { PHONE_ORDERS, stackOrder, phoneSetupOf } from '$engine/phone-order.js';
  import { phoneMark, phoneLayouts, phoneLayoutChange, phoneLayoutSketch, phoneSameWidths, PHONE_ROWS, ownLayoutFits } from '$engine/phone-layouts.js';
  import { makeId } from '$engine/sections/presets.js';
  import { rowMotion } from '../lib/motion.svelte.js';
  import IconButton from '../lib/rows/IconButton.svelte';
  import Setting from '../lib/rows/Setting.svelte';
  import SliderRow from '../lib/rows/SliderRow.svelte';
  import SwitchRow from '../lib/rows/SwitchRow.svelte';
  import { ICONS } from '../lib/icons.js';
  const ed = getContext('urd-editor');
  /** @type {{ part?: 'all'|'space'|'order'|'layout' }} */
  let { part = 'all' } = $props();
  const shows = (name) => part === 'all' || part === name;

  /** The space between the section's blocks on the phone: its own, else the site's, else the standard. */
  const phoneGap = $derived(mobileGapOf({ size: { mobileGap: ed.sectionMobileGap ?? undefined } }, ed.siteDraft));
  /** The room above the section's first block and below its last on the phone: its own, else the standard. */
  const phoneRoom = $derived(phoneRoomOf({ size: { mobilePadTop: ed.sectionPhoneRoom.top ?? undefined, mobilePadBottom: ed.sectionPhoneRoom.bottom ?? undefined } }));
  /** The section at work, read again as a new copy after every change, every undo and every page loaded. */
  const section = $derived.by(() => {
    void ed.pageId;
    void ed.edits;
    void ed.restores;
    const found = ed.sections.find((s) => s.id === ed.activeSectionId);
    return found ? { ...found, blocks: found.blocks.slice() } : null;
  });
  const blocks = $derived(section?.blocks ?? []);
  /** Each rule of the phone order drawn as the section's own blocks in that order, with its stacks and exceptions, the first eight. */
  const phoneRules = $derived.by(() => {
    const setup = phoneSetupOf(section);
    return PHONE_ORDERS.map((rule) => [rule, stackOrder(blocks, { ...setup, rule, list: null }).slice(0, 8).map(phoneMark)]);
  });
  /** The presets, the ones that fit first, each drawn small with the section's own blocks in the eight cell columns. */
  const presets = $derived(section ? phoneLayouts(blocks, phoneSetupOf(section), ed.siteDraft?.phoneLayouts).map(({ id, fits, own }) => ({ id, fits, own, sketch: phoneLayoutSketch(section, own ?? id) })) : []);
  const PRESET_KEYS = { 'two-per-line': 'twoPerLine', pairs: 'pairs', alternate: 'alternate', 'wide-two': 'wideTwo', 'big-two': 'bigTwo', 'one-column': 'oneColumn' };
  /** A preset's or an own layout's cells written into the section, as one undo step. */
  function applyPreset(id) {
    const change = phoneLayoutChange(blocks, phoneSetupOf(section), id);
    if (!change) return;
    ed.changeSectionPhone(section.id, change, 'phone-layout');
    // The blocks the preset puts side by side are made the same height, measured in the phone view as part of the preset's step.
    if (ed.viewMode === 'mobile') ed.bridge?.sendPhoneSameHeight(section.id, true);
  }
  /** The composer of an own layout while it stands open: its rows and its name. */
  let composing = $state(null);
  const ROW_KEYS = { full: 'full', two: 'two', 'big-left': 'bigLeft', 'big-right': 'bigRight' };
  /** Each row's shape drawn small: the phone's two columns, the cells the row makes in them. */
  const ROW_PICTURES = {
    full: '<rect x="2" y="4" width="20" height="16" rx="2"/>',
    two: '<rect x="2" y="4" width="9" height="16" rx="2"/><rect x="13" y="4" width="9" height="16" rx="2"/>',
    'big-left': '<rect x="2" y="3" width="9" height="18" rx="2"/><rect x="13" y="3" width="9" height="8" rx="2"/><rect x="13" y="13" width="9" height="8" rx="2"/>',
    'big-right': '<rect x="2" y="3" width="9" height="8" rx="2"/><rect x="2" y="13" width="9" height="8" rx="2"/><rect x="13" y="3" width="9" height="18" rx="2"/>',
  };
  const rowPicture = (row) => `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" fill-opacity="0.35" stroke="currentColor" stroke-width="1.4" aria-hidden="true">${ROW_PICTURES[row]}</svg>`;
  /** The layout being composed, as the model takes it. */
  const draft = $derived(composing ? { id: 'draft', name: composing.name, rows: composing.rows } : null);
  const draftSketch = $derived(section && draft ? phoneLayoutSketch(section, draft, 12) : []);
  /** Whether a layout of the site's own fits this section; «New layout» and the composer's two buttons are greyed where none does. */
  const ownFits = $derived(section ? ownLayoutFits(blocks, phoneSetupOf(section)) : false);
  function compose() {
    composing = composing ? null : { rows: ['full', 'two'], name: '' };
  }
  function setRow(i, row) {
    composing.rows = composing.rows.map((r, k) => (k === i ? row : r));
  }
  /** Uses the layout being composed here, and keeps it for the site where asked; the composer closes. */
  function finish(keep) {
    if (!draft || !section || !ownFits) return;
    if (keep) {
      const layout = { id: makeId('own'), name: composing.name.trim() || ta('phone.ownLayout.unnamed'), rows: [...composing.rows] };
      ed.siteMutate('site-phone-layouts', () => { ed.siteDraft.phoneLayouts = [...(ed.siteDraft.phoneLayouts ?? []), layout]; });
    }
    applyPreset(draft);
    composing = null;
  }
  /** An own layout taken away from the site; the sections it was used on keep their cells. */
  function removeOwn(id) {
    ed.siteMutate('site-phone-layouts', () => {
      const left = (ed.siteDraft.phoneLayouts ?? []).filter((layout) => layout.id !== id);
      if (left.length) ed.siteDraft.phoneLayouts = left; else delete ed.siteDraft.phoneLayouts;
    });
  }
  /** «Same height»: the preview measures the section's lines on the phone, so it acts in the phone view alone. */
  function sameHeight() {
    if (section && ed.viewMode === 'mobile') ed.bridge?.sendPhoneSameHeight(section.id);
  }
  /** «Same width»: each line's cells share its span evenly (phone-layouts.js phoneSameWidths). */
  function sameWidth() {
    const change = section ? phoneSameWidths(section) : null;
    if (change) ed.changeSectionPhone(section.id, change, 'phone-layout');
  }
</script>

{#if shows('space')}
<!-- The space between the blocks on the phone, its own with the way back to the site's -->
<Setting own={ed.sectionMobileGap !== null} reset={() => ed.setSectionMobileGap(null)}>
  <SliderRow label={ta('lbl.mobileGap')} title={ta('tip.props.mobileGap')} value={phoneGap} min={0} max={MOBILE_GAP_MAX} step={4}
    shown={`${phoneGap} px`} oninput={(v) => ed.setSectionMobileGap(v)} />
</Setting>
<!-- The room above the first block and below the last on the phone, each with the way back to the standard; the seams on the canvas drag the same -->
<Setting own={ed.sectionPhoneRoom.top !== null} reset={() => ed.setSectionPhoneRoom('top', null)}>
  <SliderRow label={ta('lbl.phoneRoomTop')} title={ta('tip.phoneRoomTop')} value={phoneRoom.top} min={0} max={Math.max(MOBILE_ROOM_REACH, phoneRoom.top)} step={4}
    shown={`${phoneRoom.top} px`} oninput={(v) => ed.setSectionPhoneRoom('top', v)} />
</Setting>
<Setting own={ed.sectionPhoneRoom.bottom !== null} reset={() => ed.setSectionPhoneRoom('bottom', null)}>
  <SliderRow label={ta('lbl.phoneRoomBottom')} title={ta('tip.phoneRoomBottom')} value={phoneRoom.bottom} min={0} max={Math.max(MOBILE_ROOM_REACH, phoneRoom.bottom)} step={4}
    shown={`${phoneRoom.bottom} px`} oninput={(v) => ed.setSectionPhoneRoom('bottom', v)} />
</Setting>
<!-- «Force readable text» on the phone (ADR-0034): a block with words never narrower than its words read well, and a drop or a handle that would squeeze it greyed -->
<Setting own={!ed.sectionReadable.phone} reset={() => ed.setSectionReadable('phone', true)}>
  <SwitchRow label={ta('lbl.readablePhone')} title={ta('tip.readablePhone')} checked={ed.sectionReadable.phone} onchange={(on) => ed.setSectionReadable('phone', on)} />
</Setting>
{/if}
{#if shows('order')}
<!-- The rule's words stand on its fold's heading where the part is drawn alone -->
<Setting own={ed.sectionPhoneOrder !== 'top'} reset={() => ed.setSectionPhoneOrder('top')}>
  <div class="field-stack" title={ta('tip.phoneOrder')}>{#if part === 'all'}{ta('lbl.phoneOrder')}{/if}
    <div class="po-grid" role="radiogroup" aria-label={ta('lbl.phoneOrder')}>
      {#each phoneRules as [rule, marks] (rule)}
        <button type="button" class="po-card" class:on={ed.sectionPhoneOrder === rule} role="radio" aria-checked={ed.sectionPhoneOrder === rule}
          onclick={() => ed.setSectionPhoneOrder(rule)}>
          <span class="po-strip" aria-hidden="true">{#each marks as mark, i (i)}<i class="po-{mark}"></i>{/each}</span>
          <span class="po-name">{ta(`opt.phoneOrder.${rule}`)}</span>
        </button>
      {/each}
    </div>
  </div>
</Setting>
<SwitchRow label={ta('lbl.phoneFollows')} title={ta('tip.phoneFollows')} checked={ed.sectionPhoneFollows} onchange={(on) => ed.setSectionPhoneFollows(on)} />
{/if}
{#if shows('layout')}
<!-- The presets: a press fills the cells, a starting point changed freely afterwards; one that does not fit stands greyed -->
<div class="field-stack" title={ta('tip.phoneLayout')}>{#if part === 'all'}{ta('lbl.phoneLayout')}{/if}
  <div class="po-grid" role="group" aria-label={ta('lbl.phoneLayout')}>
    {#each presets as preset (preset.id)}
      {#if preset.own}
        <!-- An own layout: its card, and the bin that takes it away from the site -->
        <div class="po-own">
          <button type="button" class="po-card" disabled={!preset.fits} onclick={() => applyPreset(preset.own)}>
            <span class="pl-sketch" aria-hidden="true">
              {#each preset.sketch as cell, i (i)}
                <span style:grid-column="{cell.col} / span {cell.cols}">{#each cell.marks as mark, j (j)}<i class="po-{mark}"></i>{/each}</span>
              {/each}
            </span>
            <span class="po-name">{preset.own.name || ta('phone.ownLayout.unnamed')}</span>
          </button>
          <span class="po-own-bin"><IconButton size="sm" danger icon={ICONS.bin} label={ta('phone.ownLayout.remove', { name: preset.own.name || ta('phone.ownLayout.unnamed') })} onclick={() => removeOwn(preset.own.id)} /></span>
        </div>
      {:else}
        <button type="button" class="po-card" disabled={!preset.fits} onclick={() => applyPreset(preset.id)}>
          <span class="pl-sketch" aria-hidden="true">
            {#each preset.sketch as cell, i (i)}
              <span style:grid-column="{cell.col} / span {cell.cols}">{#each cell.marks as mark, j (j)}<i class="po-{mark}"></i>{/each}</span>
            {/each}
          </span>
          <span class="po-name">{ta(`canvas.phoneLayout.${PRESET_KEYS[preset.id]}`)}</span>
        </button>
      {/if}
    {/each}
    <!-- A layout of the owner's own, composed under the cards -->
    <button type="button" class="po-card po-new" aria-expanded={Boolean(composing)} title={ta('tip.phone.ownLayout.new')} disabled={!ownFits && !composing} onclick={compose}>
      <span class="pl-sketch po-new-mark" aria-hidden="true">{@html ICONS.plus}</span>
      <span class="po-name">{ta('phone.ownLayout.new')}</span>
    </button>
  </div>
</div>
{#if composing}
  <!-- The composer: the section's blocks in the layout as it is drawn, its rows, its name, and its use -->
  <div class="po-compose" transition:rowMotion>
    <span class="pl-sketch po-compose-sketch" aria-hidden="true">
      {#each draftSketch as cell, i (i)}
        <span style:grid-column="{cell.col} / span {cell.cols}">{#each cell.marks as mark, j (j)}<i class="po-{mark}"></i>{/each}</span>
      {/each}
    </span>
    <div class="po-rows">
      {#each composing.rows as row, i (i)}
        <div class="po-row">
          <span class="po-row-n" aria-hidden="true">{i + 1}</span>
          <div class="po-row-shapes" role="radiogroup" aria-label={ta('phone.ownLayout.row', { n: i + 1 })}>
            {#each PHONE_ROWS as shape (shape)}
              <button type="button" role="radio" aria-checked={row === shape} class:on={row === shape} title={ta(`opt.phoneRow.${ROW_KEYS[shape]}`)} aria-label={ta(`opt.phoneRow.${ROW_KEYS[shape]}`)} onclick={() => setRow(i, shape)}>{@html rowPicture(shape)}</button>
            {/each}
          </div>
          <IconButton size="sm" danger icon={ICONS.bin} label={ta('phone.ownLayout.removeRow')} disabled={composing.rows.length < 2} onclick={() => { composing.rows = composing.rows.filter((_, k) => k !== i); }} />
        </div>
      {/each}
      <button type="button" class="ghost action po-add-row" onclick={() => { composing.rows = [...composing.rows, 'two']; }}>{@html ICONS.plus}<span>{ta('phone.ownLayout.addRow')}</span></button>
    </div>
    <input class="po-compose-name" placeholder={ta('phone.ownLayout.unnamed')} aria-label={ta('phone.ownLayout.name')} bind:value={composing.name} />
    <div class="po-compose-act">
      <button type="button" class="po-use" disabled={!ownFits} onclick={() => finish(false)}>{ta('phone.ownLayout.use')}</button>
      <button type="button" class="po-save" disabled={!ownFits} onclick={() => finish(true)}>{ta('phone.ownLayout.keep')}</button>
    </div>
  </div>
{/if}
<!-- The blocks side by side made alike, once, at a press; the heights are measured as the phone shows them, so «Same height» is greyed in the desktop view -->
<div class="po-match">
  <button type="button" disabled={ed.viewMode !== 'mobile'} title={ta(ed.viewMode === 'mobile' ? 'tip.canvas.phoneSameHeight' : 'tip.phoneSameHeightView')} onclick={sameHeight}>{@html ICONS.sameHeight}<span>{ta('canvas.phoneSameHeight')}</span></button>
  <button type="button" title={ta('tip.canvas.phoneSameWidth')} onclick={sameWidth}>{@html ICONS.sameWidth}<span>{ta('canvas.phoneSameWidth')}</span></button>
</div>
{/if}
