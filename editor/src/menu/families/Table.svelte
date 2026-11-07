<script>
  /* The table block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import { pinnedNow } from '../pinned.js';
  import Fold from '../../lib/rows/Fold.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps } = ed;
  /** A fold counts the settings it holds now: one of a single setting is that setting alone. */
  const pinned = pinnedNow();
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();

  /** The grid's shape as the closed group reads it: rows × columns. */
  const shape = $derived.by(() => {
    const rows = Array.isArray(selectedBlock.props.rows) ? selectedBlock.props.rows : [];
    const cols = Math.max(1, ...rows.map((row) => (Array.isArray(row) ? row.length : 1)), 1);
    return `${Math.max(1, rows.length)} × ${cols}`;
  });
  const lineOptions = () => [['rows', ta('opt.table.rows')], ['grid', ta('opt.table.grid')], ['none', ta('common.none')]];

  /** The table's shape: rows/columns are added and removed at the end;
   *  the row set is rectangularized first, so hand-edited data is tolerated. */
  function tableResize(dRows, dCols) {
    mutateBlock(`edit:${selectedBlock.blockId}:table-form`, (b) => {
      let rows = (Array.isArray(b.props.rows) && b.props.rows.length ? b.props.rows : [['']])
        .map((row) => (Array.isArray(row) ? row.map((cell) => String(cell ?? '')) : ['']));
      const cols = Math.max(1, ...rows.map((row) => row.length));
      rows = rows.map((row) => [...row, ...Array(cols - row.length).fill('')]);
      if (dRows > 0) rows.push(Array(cols).fill(''));
      else if (dRows < 0 && rows.length > 1) rows.pop();
      if (dCols > 0) rows = rows.map((row) => [...row, '']);
      else if (dCols < 0 && cols > 1) rows = rows.map((row) => row.slice(0, cols - 1));
      b.props.rows = rows;
    });
  }
</script>

{#if area === 'content'}
  {#snippet tableShape()}
    <!-- The cells are typed directly on the canvas; the menu owns the grid's shape. -->
    <span class="toolbar-row">
      <button class="ghost" onclick={() => tableResize(1, 0)}>{ta('ui.addRow')}</button>
      <button class="ghost" onclick={() => tableResize(-1, 0)}>{ta('ui.removeRow')}</button>
    </span>
    <span class="toolbar-row">
      <button class="ghost" onclick={() => tableResize(0, 1)}>{ta('ui.addColumn')}</button>
      <button class="ghost" onclick={() => tableResize(0, -1)}>{ta('ui.removeColumn')}</button>
    </span>
    <Setting key="header" shown={ta('common.on')}>
      <SwitchRow label={ta('lbl.tableHeader')} title={ta('tip.table.header')} checked={selectedBlock.props.header !== false} onchange={(on) => setBlockProp('header', on)} />
    </Setting>
  {/snippet}
  <Fold id="table-shape" defaultOpen title={ta('group.rowsColumns')} value={shape} group={groupOf('table-shape', { header: true })}>{@render tableShape()}</Fold>
{:else if area === 'style'}
  {#snippet tableLines()}
    <Setting key="lines" pin="tableLines">
      <Choice stack label={ta('lbl.tableLines')} title={ta('tip.table.lines')} value={selectedBlock.props.lines ?? 'rows'} options={lineOptions()}
        onchange={(v) => setBlockProp('lines', v)} />
    </Setting>
    <Setting key="striped" shown={ta('common.off')}>
      <SwitchRow label={ta('lbl.tableStriped')} title={ta('tip.table.striped')} checked={Boolean(selectedBlock.props.striped)} onchange={(on) => setBlockProp('striped', on)} />
    </Setting>
  {/snippet}
  <Fold id="table-lines" defaultOpen rows={1 + pinned.left('tableLines')} title={ta('lbl.tableLines')} value={lineOptions().find(([v]) => v === (selectedBlock.props.lines ?? 'rows'))?.[1] ?? ''} group={groupOf('table-lines', { lines: 'rows', striped: false })}>{@render tableLines()}</Fold>
{/if}
