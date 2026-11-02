<script>
  /* A collection's own tools as icons, their names in the tooltips: the CSV out and in, and the collection's removal (undone with Ctrl+Z). */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';
  import { collectionActions } from './actions.js';

  const ed = getContext('urd-editor');
  let { id } = $props();
  const act = collectionActions(ed);
</script>

<span class="row-tools">
  <button class="ghost row-tool" title={`${ta('ui.exportCsv')}: ${ta('tip.collections.exportCsv')}`} aria-label={ta('ui.exportCsv')}
    onclick={() => act.exportCollectionCsv(id)}>{@html ICONS.download}</button>
  <label class="ghost row-tool filepick" title={`${ta('ui.importCsv')}: ${ta('tip.collections.importCsv')}`} aria-label={ta('ui.importCsv')}>
    {@html ICONS.upload}
    <input type="file" accept=".csv,text/csv" onchange={(e) => act.importCollectionCsv(id, e)} />
  </label>
  <button class="ghost row-tool" title={ta('tip.collections.deleteCollection')} aria-label={ta('tip.collections.deleteCollection')}
    onclick={() => ed.removeCollection(id)}>{@html ICONS.cross}</button>
</span>
