<script>
  /* The timeline block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import ColorPicker from '../../lib/ColorPicker.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import DesignRow from '../DesignRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps, themeSwatches } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
  const variantOptions = () => [['left', ta('opt.timeline.left')], ['alternating', ta('opt.timeline.alternating')]];

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
  {#snippet tlEvents()}
  {#each selectedBlock.props.items ?? [] as item, i (i)}
    <!-- The year with the item's tools on its line, and the title and the text each on a line of their own, so the title keeps its width in a narrow menu -->
    <span class="nav-line">
      <input value={item.year} placeholder={ta('ph.tlYear')} title={ta('tip.timeline.year')}
        onchange={(e) => setTlItem(i, { year: e.target.value })} />
      <span class="row-tools">
        <button class="ghost row-tool" title={ta('tip.moveUp')} onclick={() => moveTlItem(i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
        <button class="ghost row-tool" title={ta('tip.moveDown')} onclick={() => moveTlItem(i, 1)}
          disabled={i === (selectedBlock.props.items?.length ?? 0) - 1}>{@html ICONS.down}</button>
        <button class="ghost row-tool" title={ta('tip.timeline.remove')} onclick={() => removeTlItem(i)}>{@html ICONS.cross}</button>
      </span>
    </span>
    <input value={item.title} title={ta('tip.timeline.title')}
      onchange={(e) => setTlItem(i, { title: e.target.value })} />
    <input value={item.text} placeholder={ta('ph.tlText')} title={ta('tip.timeline.text')}
      onchange={(e) => setTlItem(i, { text: e.target.value })} />
  {/each}
  <button class="ghost action" onclick={addTlItem}>{ta('ui.addTlItem')}</button>
  {/snippet}
  <MenuGroup id="tl-events" defaultOpen title={ta('lbl.timelineItems')} value={String(selectedBlock.props.items?.length ?? 0)}>{@render tlEvents()}</MenuGroup>
{:else if area === 'style'}
  {#snippet tlLook()}
    <Setting key="variant">
      <DesignRow pin="variant" />
    </Setting>
    <Setting key="marker">
      <label>{ta('lbl.timelineMarker')}
        <Dropdown value={selectedBlock.props.marker ?? 'filled'}
          options={[['filled', ta('opt.timeline.filled')], ['ring', ta('opt.timeline.ring')]]}
          onchange={(v) => setBlockProp('marker', v)} /></label>
    </Setting>
    <Setting key="accent" source="theme">
      <label>{ta('lbl.color')}
        <ColorPicker value={selectedBlock.props.accent ?? 'accent'} tokens={themeSwatches()}
          onchange={(v) => setBlockProp('accent', v === 'accent' ? null : v)} /></label>
    </Setting>
  {/snippet}
  <MenuGroup id="tl-look" defaultOpen title={ta('group.appearance')} value={variantOptions().find(([v]) => v === (selectedBlock.props.variant ?? 'left'))?.[1] ?? ''} group={groupOf('tl-look', { variant: 'left', marker: 'filled', accent: null })}>{@render tlLook()}</MenuGroup>
{/if}
