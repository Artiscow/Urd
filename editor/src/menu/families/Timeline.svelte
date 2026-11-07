<script>
  /* The timeline block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import ColourRow from '../../lib/rows/ColourRow.svelte';
  import ListEditor from '../../lib/rows/ListEditor.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps, themeSwatches } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
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

  /** Moves an event from one place to another, as the list editor's drag and keys do. */
  function moveTlItem(from, to) {
    mutateBlock('tl-item', (b) => { b.props.items.splice(to, 0, ...b.props.items.splice(from, 1)); });
  }
</script>

{#if area === 'content'}
  {#snippet tlEvents()}
  <!-- Each event as its year, its title and its text, each on a line of its own, so the title keeps its width in a narrow menu -->
  <ListEditor items={selectedBlock.props.items ?? []} label={ta('lbl.timelineItems')} key={(item, i) => i}
    onmove={moveTlItem} onremove={removeTlItem} onadd={addTlItem} addLabel={ta('ui.addTlItem')}>
    {#snippet row(item, i)}
      <div class="tl-row">
        <input value={item.year} placeholder={ta('ph.tlYear')} title={ta('tip.timeline.year')} aria-label={ta('tip.timeline.year')}
          onchange={(e) => setTlItem(i, { year: e.target.value })} />
        <input value={item.title} title={ta('tip.timeline.title')} aria-label={ta('tip.timeline.title')}
          onchange={(e) => setTlItem(i, { title: e.target.value })} />
        <input value={item.text} placeholder={ta('ph.tlText')} title={ta('tip.timeline.text')} aria-label={ta('tip.timeline.text')}
          onchange={(e) => setTlItem(i, { text: e.target.value })} />
      </div>
    {/snippet}
  </ListEditor>
  {/snippet}
  <Fold id="tl-events" defaultOpen title={ta('lbl.timelineItems')} value={String(selectedBlock.props.items?.length ?? 0)}>{@render tlEvents()}</Fold>
{:else if area === 'style'}
  {#snippet tlLook()}
    <Setting key="marker">
      <Choice stack label={ta('lbl.timelineMarker')} title={ta('tip.timeline.marker')} value={selectedBlock.props.marker ?? 'filled'}
        options={[['filled', ta('opt.timeline.filled')], ['ring', ta('opt.timeline.ring')]]}
        onchange={(v) => setBlockProp('marker', v)} />
    </Setting>
    <Setting key="accent" source="theme">
      <ColourRow label={ta('lbl.color')} title={ta('tip.timeline.color')} value={selectedBlock.props.accent ?? 'accent'} tokens={themeSwatches()}
        onchange={(v) => setBlockProp('accent', v === 'accent' ? null : v)} />
    </Setting>
  {/snippet}
  <Fold id="tl-look" defaultOpen title={ta('group.appearance')} value={(selectedBlock.props.marker ?? 'filled') === 'ring' ? ta('opt.timeline.ring') : ta('opt.timeline.filled')} group={groupOf('tl-look', { marker: 'filled', accent: null })}>{@render tlLook()}</Fold>
{/if}

<style>
  .tl-row {
    display: grid;
    gap: 4px;
  }
</style>
