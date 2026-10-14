<script>
  /* The collection block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const collectionIds = $derived(ed.collectionIds);
  const collectionsView = $derived(ed.collectionsView);
  const { setBlockProp } = ed;
  let { area } = $props();
</script>

{#if area === 'content'}
  <label title={ta('tip.collection.source')}>{ta('blocks.collection')}
    <Dropdown value={selectedBlock.props.collection ?? ''}
      options={[['', ta('common.choose')], ...collectionIds.map((id) => [id, collectionsView[id]?.name ?? id])]}
      onchange={(v) => setBlockProp('collection', v || null)} /></label>
  <label title={ta('tip.collection.limit')}>{ta('lbl.maxCount')}
    <input type="number" min="0" max="100" value={selectedBlock.props.limit ?? 6}
      onchange={(e) => setBlockProp('limit', Number(e.target.value))} /></label>
  <label class="gridmenu-snap">
    <input type="checkbox" checked={selectedBlock.props.newestFirst !== false}
      onchange={(e) => setBlockProp('newestFirst', e.target.checked)} />
    {ta('lbl.newestFirst')}
  </label>
{:else if area === 'style'}
  <label>{ta('lbl.view')}
    <Dropdown value={selectedBlock.props.view ?? 'cards'}
      options={[['cards', ta('opt.collectionView.cards')], ['list', ta('opt.collectionView.list')], ['archive', ta('opt.collectionView.archive')]]}
      onchange={(v) => setBlockProp('view', v)} /></label>
  <hr class="gridmenu-divider" />
{/if}
