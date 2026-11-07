<script>
  /* The contact block in the element menu: which of the Legal panel's contact details it shows, its design, and the save button and the phone bar.
     The details themselves are typed once in the Legal panel, so the menu points there. */
  import { getContext } from 'svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { CONTACT_PARTS, contactDesign } from '$engine/contact-model.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps } = ed;
  const { groupChanged, groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  /** The look's own choices, each shown where the design has it. */
  const CONTACT_LOOK = { band: true, vcard: false, dock: false };
  let { area } = $props();

  const DEFAULT_PARTS = ['name', 'address', 'phone', 'email'];
  const shown = $derived(new Set(Array.isArray(selectedBlock.props.parts) ? selectedBlock.props.parts : DEFAULT_PARTS));
  const design = $derived(contactDesign(selectedBlock.props.design));

  /** One part on or off; the list is kept in the order the parts stand. */
  function togglePart(part, on) {
    mutateBlock(`edit:${selectedBlock.blockId}:parts`, (b) => {
      const next = new Set(Array.isArray(b.props.parts) ? b.props.parts : DEFAULT_PARTS);
      if (on) next.add(part);
      else next.delete(part);
      b.props.parts = CONTACT_PARTS.filter((p) => next.has(p));
    });
  }

  /** Opens the Legal panel at the contact details. */
  function editDetails() {
    ed.openPanel('legal', { fold: 'who' });
  }
</script>

{#if area === 'content'}
  {#snippet contactParts()}
    <!-- The parts this block shows; what they hold is typed in the Legal panel -->
    {#each CONTACT_PARTS as part (part)}
      <SwitchRow label={ta(`contactPart.${part}`)} title={ta('tip.contact.part')} checked={shown.has(part)} onchange={(on) => togglePart(part, on)} />
    {/each}
    <button class="ghost action" onclick={editDetails}>{ta('ui.editSiteContact')}</button>
    <!-- The map design's map: behind a cover until a visitor presses it, or with the page -->
    {#if design.geo}
      <Setting key="askFirst" shown={ta('common.on')}>
        <SwitchRow label={ta('lbl.embedAskFirst')} title={ta('tip.embed.askFirst')} checked={selectedBlock.props.askFirst !== false} onchange={(on) => setBlockProp('askFirst', on)} />
      </Setting>
    {/if}
  {/snippet}
  <Fold id="contact-parts" defaultOpen title={ta('group.siteContact')} value={String(shown.size)}
    group={groupOf('contact-parts', { parts: DEFAULT_PARTS, askFirst: true })}>{@render contactParts()}</Fold>
{:else if area === 'style'}
  {#snippet contactLook()}
    <!-- The design's own choices, under the design row the menu draws first in Style -->
    {#if design.band}
      <Setting key="band" shown={ta('common.on')}>
        <SwitchRow label={ta('lbl.contactBand')} title={ta('tip.contact.band')} checked={selectedBlock.props.band !== false} onchange={(on) => setBlockProp('band', on)} />
      </Setting>
    {/if}
    {#if design.id !== 'strip'}
      <Setting key="vcard" shown={ta('common.off')}>
        <SwitchRow label={ta('lbl.contactVcard')} title={ta('tip.contact.vcard')} checked={selectedBlock.props.vcard === true} onchange={(on) => setBlockProp('vcard', on)} />
      </Setting>
    {/if}
    <Setting key="dock" shown={ta('common.off')}>
      <SwitchRow label={ta('lbl.contactDock')} title={ta('tip.contact.dock')} checked={selectedBlock.props.dock === true} onchange={(on) => setBlockProp('dock', on)} />
    </Setting>
  {/snippet}
  <Fold id="contact-look" defaultOpen title={ta('group.appearance')} value={groupChanged(CONTACT_LOOK) ? ta('menu.changed', { n: groupChanged(CONTACT_LOOK) }) : ta('menu.standard')}
    rows={1 + (design.band ? 1 : 0) + (design.id !== 'strip' ? 1 : 0)} group={groupOf('contact-look', CONTACT_LOOK)}>{@render contactLook()}</Fold>
{/if}
