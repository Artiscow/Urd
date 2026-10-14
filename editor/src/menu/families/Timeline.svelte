<script>
  /* The timeline block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import ColorPicker from '../../lib/ColorPicker.svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, themeSwatches } = ed;
  let { area } = $props();

  /* The timeline block: the event list is edited here; the texts also directly in the preview. */

  function setTlItem(i, patch) {
    mutateBlock(`edit:${selectedBlock.blockId}:tl${i}`, (b) => {
      b.props.items[i] = { ...b.props.items[i], ...patch };
    });
  }

  function addTlItem() {
    mutateBlock('tl-item', (b) => {
      b.props.items ??= []; b.props.items.push({ year: '', title: ta('seed.timeline.newTitle'), text: '' });
    });
  }

  function removeTlItem(i) {
    mutateBlock('tl-item', (b) => { b.props.items.splice(i, 1); });
  }

  function moveTlItem(i, dir) {
    const j = i + dir;
    mutateBlock('tl-item', (b) => {
      if (j < 0 || j >= b.props.items.length) return;
      [b.props.items[i], b.props.items[j]] = [b.props.items[j], b.props.items[i]];
    });
  }
</script>

{#if area === 'content'}
  <p class="panel-strong">{ta('lbl.timelineItems')}</p>
  {#each selectedBlock.props.items ?? [] as item, i (i)}
    <span class="nav-line">
      <input class="tl-year" value={item.year} placeholder={ta('ph.tlYear')} title={ta('tip.timeline.year')}
        onchange={(e) => setTlItem(i, { year: e.target.value })} />
      <input value={item.title} title={ta('tip.timeline.title')}
        onchange={(e) => setTlItem(i, { title: e.target.value })} />
      <span class="row-tools">
        <button class="ghost row-tool" onclick={() => moveTlItem(i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
        <button class="ghost row-tool" onclick={() => moveTlItem(i, 1)}
          disabled={i === (selectedBlock.props.items?.length ?? 0) - 1}>{@html ICONS.down}</button>
        <button class="ghost row-tool" title={ta('tip.timeline.remove')} onclick={() => removeTlItem(i)}>{@html ICONS.cross}</button>
      </span>
    </span>
    <input value={item.text} placeholder={ta('ph.tlText')} title={ta('tip.timeline.text')}
      onchange={(e) => setTlItem(i, { text: e.target.value })} />
  {/each}
  <button class="ghost action" onclick={addTlItem}>{ta('ui.addTlItem')}</button>
{:else if area === 'style'}
  <label>{ta('lbl.variant')}
    <Dropdown value={selectedBlock.props.variant ?? 'left'}
      options={[['left', ta('opt.timeline.left')], ['alternating', ta('opt.timeline.alternating')]]}
      onchange={(v) => setBlockProp('variant', v)} /></label>
  <label>{ta('lbl.timelineMarker')}
    <Dropdown value={selectedBlock.props.marker ?? 'filled'}
      options={[['filled', ta('opt.timeline.filled')], ['ring', ta('opt.timeline.ring')]]}
      onchange={(v) => setBlockProp('marker', v)} /></label>
  <label>{ta('lbl.color')}
    <ColorPicker value={selectedBlock.props.accent ?? 'accent'} tokens={themeSwatches()}
      onchange={(v) => setBlockProp('accent', v === 'accent' ? null : v)} /></label>
  <hr class="gridmenu-divider" />
{/if}
