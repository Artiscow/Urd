<script>
  /* The Grid panel: the snapping grid's size and visibility. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  const grid = $derived(ed.grid);
  const { setGrid } = ed;
</script>

<div class="panel-body">
  <label>
    {ta('lbl.gridSize')}
    <span class="gridmenu-value">{grid.size} px</span>
  </label>
  <input type="range" min="4" max="96" step="2" value={grid.size}
    oninput={(e) => setGrid('size', Number(e.target.value))} />
  <label class="gridmenu-snap">
    <input type="checkbox" checked={grid.snap !== false}
      onchange={(e) => setGrid('snap', e.target.checked)} />
    {ta('lbl.gridSnap')}
  </label>

</div>
