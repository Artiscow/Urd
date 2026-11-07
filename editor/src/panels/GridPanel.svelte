<script>
  /* The Grid panel: the snapping grid's size and visibility, and how it is drawn (0.7.34), in the row kit (lib/rows/). Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import Choice from '../lib/Choice.svelte';
  import SliderRow from '../lib/rows/SliderRow.svelte';
  import SwitchRow from '../lib/rows/SwitchRow.svelte';
  const ed = getContext('urd-editor');
  const grid = $derived(ed.grid);
  const { setGrid } = ed;
</script>

<div class="panel-body">
  <SliderRow label={ta('lbl.gridSize')} title={ta('tip.gridSize')} value={grid.size} min={4} max={96} step={2} shown={`${grid.size} px`}
    oninput={(v) => setGrid('size', v)} />
  <SwitchRow label={ta('lbl.gridSnap')} title={ta('tip.gridSnap')} checked={grid.snap !== false} onchange={(v) => setGrid('snap', v)} />
  <Choice label={ta('lbl.gridLook')} title={ta('tip.gridLook')} value={ed.gridLook}
    options={[['lines', ta('opt.gridLook.lines')], ['dots', ta('opt.gridLook.dots')], ['drag', ta('opt.gridLook.drag')]]}
    onchange={(v) => ed.setGridLook(v)} />
</div>
