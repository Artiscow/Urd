<script>
  /* The share block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import ColorPicker from '../../lib/ColorPicker.svelte';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, themeSwatches } = ed;
  let { area } = $props();

  /** The share buttons' services: the choices are stored in a fixed display order. */
  function toggleShareService(service, on) {
    mutateBlock(`edit:${selectedBlock.blockId}:share`, (b) => {
      const order = ['facebook', 'x', 'linkedin', 'whatsapp', 'email', 'copy'];
      const set = new Set(b.props.services ?? []);
      if (on) set.add(service);
      else set.delete(service);
      b.props.services = order.filter((s) => set.has(s));
    });
  }
</script>

{#if area === 'content'}
  {#each [['facebook', 'Facebook'], ['x', 'X'], ['linkedin', 'LinkedIn'], ['whatsapp', 'WhatsApp'], ['email', ta('opt.share.email')], ['copy', ta('opt.share.copy')]] as [service, label] (service)}
    <label class="gridmenu-snap">
      <input type="checkbox" checked={(selectedBlock.props.services ?? []).includes(service)}
        onchange={(e) => toggleShareService(service, e.target.checked)} />
      {label}
    </label>
  {/each}
{:else if area === 'style'}
  <label>{ta('lbl.variant')}
    <Dropdown value={selectedBlock.props.variant ?? 'icons'}
      options={[['icons', ta('opt.share.icons')], ['labels', ta('opt.share.labels')]]}
      onchange={(v) => setBlockProp('variant', v)} /></label>
  <label>{ta('lbl.size')}
    <input type="number" min="24" max="64" value={selectedBlock.props.size ?? 38}
      onchange={(e) => setBlockProp('size', Number(e.target.value) || 38)} /></label>
  <label>{ta('lbl.color')}
    <ColorPicker value={selectedBlock.props.color || 'accent'} tokens={themeSwatches()}
      onchange={(v) => setBlockProp('color', v === 'accent' ? '' : v)} /></label>
  <hr class="gridmenu-divider" />
{/if}
