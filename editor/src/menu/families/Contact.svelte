<script>
  /* The contact block in the element menu: which of the Site panel's contact details it shows, its design, and the save button and the phone bar.
     The details themselves are typed once in the Site panel, so the menu points there. */
  import { getContext } from 'svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import DesignRow from '../DesignRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { CONTACT_PARTS, contactDesign } from '$engine/contact-model.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
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

  /** Opens the Site panel at the contact details. */
  function editDetails() {
    ed.siteContactOpen = true;
    ed.openPanel('site');
  }
</script>

{#if area === 'content'}
  {#snippet contactParts()}
    <!-- The parts this block shows; what they hold is typed in the Site panel -->
    {#each CONTACT_PARTS as part (part)}
      <label title={ta('tip.contact.part')} class="gridmenu-snap">
        <input type="checkbox" checked={shown.has(part)}
          onchange={(e) => togglePart(part, e.target.checked)} />
        {ta(`contactPart.${part}`)}
      </label>
    {/each}
    <button class="ghost action" onclick={editDetails}>{ta('ui.editSiteContact')}</button>
  {/snippet}
  <MenuGroup id="contact-parts" defaultOpen title={ta('group.siteContact')} value={String(shown.size)}
    group={groupOf('contact-parts', { parts: DEFAULT_PARTS })}>{@render contactParts()}</MenuGroup>
{:else if area === 'style'}
  {#snippet contactLook()}
    <Setting key="design">
      <DesignRow pin="design" />
    </Setting>
    <!-- The design's own choice sits directly under it -->
    {#if design.band}
      <label class="gridmenu-snap" title={ta('tip.contact.band')}>
        <input type="checkbox" checked={selectedBlock.props.band !== false}
          onchange={(e) => setBlockProp('band', e.target.checked)} />
        {ta('lbl.contactBand')}
      </label>
    {/if}
    {#if design.geo || design.points}
      <button class="ghost action" onclick={editDetails}>{ta('ui.editSiteContact')}</button>
    {/if}
    {#if design.id !== 'strip'}
      <label class="gridmenu-snap" title={ta('tip.contact.vcard')}>
        <input type="checkbox" checked={selectedBlock.props.vcard === true}
          onchange={(e) => setBlockProp('vcard', e.target.checked)} />
        {ta('lbl.contactVcard')}
      </label>
    {/if}
    <label class="gridmenu-snap" title={ta('tip.contact.dock')}>
      <input type="checkbox" checked={selectedBlock.props.dock === true}
        onchange={(e) => setBlockProp('dock', e.target.checked)} />
      {ta('lbl.contactDock')}
    </label>
  {/snippet}
  <MenuGroup id="contact-look" defaultOpen title={ta('group.appearance')} value={ta(`opt.contact.${design.id}`)}
    group={groupOf('contact-look', { design: 'lines', band: true, vcard: false, dock: false })}>{@render contactLook()}</MenuGroup>
{/if}
