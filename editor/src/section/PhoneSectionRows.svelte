<script>
  /* The section's own settings for the phone, in the section menu's «Size and grid» and the Phone panel alike: the space between its blocks, the room above and below them, «Force readable text» on the phone, its rule for their order, its custom order, and the presets that suggest its layout in the phone's cells.
     Each rule is drawn as the section's own blocks in its order (phone-order.js), with its stacks and exceptions; the rule and the custom order stand for every section, whatever its blocks, and while a custom order holds, the rule places a block the list does not hold yet.
     `part` draws one part alone, in a fold of the Phone panel that carries its name: the space and the text, the order, or the presets.
     Under the presets stand «Same height» and «Same width», which make the blocks side by side on each line alike at a press; a preset makes them the same height too, in the phone view, where their heights are measured. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { MOBILE_GAP_MAX, mobileGapOf, MOBILE_ROOM_REACH, phoneRoomOf } from '$engine/migrate.js';
  import { PHONE_ORDERS, stackOrder, phoneSetupOf } from '$engine/phone-order.js';
  import { phoneMark, phoneLayouts, phoneLayoutChange, phoneLayoutSketch, phoneSameWidths } from '$engine/phone-layouts.js';
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
  /** The section at work, read again after every change, every undo and every page loaded, since the page's data is no state of its own: a new copy each time, so what is reckoned from it follows. */
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
  /** The presets (phone-layouts.js), the ones that fit first, each drawn small with the section's own blocks in the eight cell columns; a press fills the cells as a starting point, one undo step. */
  const presets = $derived(section ? phoneLayouts(blocks, phoneSetupOf(section)).map(({ id, fits }) => ({ id, fits, sketch: phoneLayoutSketch(section, id) })) : []);
  const PRESET_KEYS = { 'two-per-line': 'twoPerLine', pairs: 'pairs', alternate: 'alternate', 'wide-two': 'wideTwo', 'big-two': 'bigTwo', 'one-column': 'oneColumn' };
  function applyPreset(id) {
    const change = phoneLayoutChange(blocks, phoneSetupOf(section), id);
    if (!change) return;
    ed.changeSectionPhone(section.id, change, 'phone-layout');
    // The blocks the preset puts side by side are made the same height, measured in the phone view as part of the preset's step.
    if (ed.viewMode === 'mobile') ed.bridge?.sendPhoneSameHeight(section.id, true);
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
      <button type="button" class="po-card" disabled={!preset.fits} onclick={() => applyPreset(preset.id)}>
        <span class="pl-sketch" aria-hidden="true">
          {#each preset.sketch as cell, i (i)}
            <span style:grid-column="{cell.col} / span {cell.cols}">{#each cell.marks as mark, j (j)}<i class="po-{mark}"></i>{/each}</span>
          {/each}
        </span>
        <span class="po-name">{ta(`canvas.phoneLayout.${PRESET_KEYS[preset.id]}`)}</span>
      </button>
    {/each}
  </div>
</div>
<!-- The blocks side by side made alike, once, at a press; the heights are measured as the phone shows them, so «Same height» is greyed in the desktop view -->
<div class="po-match">
  <button type="button" disabled={ed.viewMode !== 'mobile'} title={ta(ed.viewMode === 'mobile' ? 'tip.canvas.phoneSameHeight' : 'tip.phoneSameHeightView')} onclick={sameHeight}>{@html ICONS.sameHeight}<span>{ta('canvas.phoneSameHeight')}</span></button>
  <button type="button" title={ta('tip.canvas.phoneSameWidth')} onclick={sameWidth}>{@html ICONS.sameWidth}<span>{ta('canvas.phoneSameWidth')}</span></button>
</div>
{/if}
