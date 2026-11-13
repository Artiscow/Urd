<script>
  /* The section's own settings for the phone, in the section menu's «Size and grid» and the Phone panel alike: the space between its blocks, its rule for their order, its custom order, and the presets that suggest its layout in the phone's cells.
     Each rule is drawn as the section's own blocks in its order (phone-order.js), with its stacks and exceptions; the rule and the custom order stand for every section, whatever its blocks, and while a custom order holds, the rule places a block the list does not hold yet. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { MOBILE_GAP_MAX, mobileGapOf } from '$engine/migrate.js';
  import { PHONE_ORDERS, stackOrder, phoneSetupOf } from '$engine/phone-order.js';
  import { phoneMark, phoneLayouts, phoneLayoutChange, phoneLayoutSketch } from '$engine/phone-layouts.js';
  import Setting from '../lib/rows/Setting.svelte';
  import SliderRow from '../lib/rows/SliderRow.svelte';
  import SwitchRow from '../lib/rows/SwitchRow.svelte';
  const ed = getContext('urd-editor');

  /** The space between the section's blocks on the phone: its own, else the site's, else the standard. */
  const phoneGap = $derived(mobileGapOf({ size: { mobileGap: ed.sectionMobileGap ?? undefined } }, ed.siteDraft));
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
    if (change) ed.changeSectionPhone(section.id, change, 'phone-layout');
  }
</script>

<!-- The space between the blocks on the phone, its own with the way back to the site's -->
<Setting own={ed.sectionMobileGap !== null} reset={() => ed.setSectionMobileGap(null)}>
  <SliderRow label={ta('lbl.mobileGap')} title={ta('tip.props.mobileGap')} value={phoneGap} min={0} max={MOBILE_GAP_MAX} step={4}
    shown={`${phoneGap} px`} oninput={(v) => ed.setSectionMobileGap(v)} />
</Setting>
<Setting own={ed.sectionPhoneOrder !== 'top'} reset={() => ed.setSectionPhoneOrder('top')}>
  <div class="field-stack" title={ta('tip.phoneOrder')}>{ta('lbl.phoneOrder')}
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
<SwitchRow label={ta('lbl.phoneCustom')} title={ta('tip.phoneCustom')} checked={ed.sectionPhoneCustom} onchange={(on) => ed.setSectionPhoneCustom(on)} />
<!-- The presets: a press fills the cells, a starting point changed freely afterwards; one that does not fit stands greyed -->
<div class="field-stack" title={ta('tip.phoneLayout')}>{ta('lbl.phoneLayout')}
  <div class="po-grid">
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
