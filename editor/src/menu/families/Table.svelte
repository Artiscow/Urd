<script>
  /* The table block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import Pin from '../Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps } = ed;
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
      <label class="gridmenu-snap" title={ta('tip.table.header')}>
        <input type="checkbox" checked={selectedBlock.props.header !== false}
          onchange={(e) => setBlockProp('header', e.target.checked)} />
        {ta('lbl.tableHeader')}
      </label>
    </Setting>
  {/snippet}
  <MenuGroup id="table-shape" defaultOpen title={ta('group.rowsColumns')} value={shape} group={groupOf('table-shape', { header: true })}>{@render tableShape()}</MenuGroup>
{:else if area === 'style'}
  {#snippet tableLines()}
    <Setting key="lines">
      <div class="pin-line">
        <label title={ta('tip.table.lines')}>{ta('lbl.tableLines')}
          <Dropdown value={selectedBlock.props.lines ?? 'rows'} options={lineOptions()}
            onchange={(v) => setBlockProp('lines', v)} /></label>
        <Pin id="tableLines" />
      </div>
    </Setting>
    <Setting key="striped" shown={ta('common.off')}>
      <label title={ta('tip.table.striped')} class="gridmenu-snap">
        <input type="checkbox" checked={Boolean(selectedBlock.props.striped)}
          onchange={(e) => setBlockProp('striped', e.target.checked)} />
        {ta('lbl.tableStriped')}
      </label>
    </Setting>
  {/snippet}
  <MenuGroup id="table-lines" defaultOpen title={ta('lbl.tableLines')} value={lineOptions().find(([v]) => v === (selectedBlock.props.lines ?? 'rows'))?.[1] ?? ''} group={groupOf('table-lines', { lines: 'rows', striped: false })}>{@render tableLines()}</MenuGroup>
{/if}
