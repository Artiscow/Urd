<script module>
  /* The place fields' drafts and search status, keyed per block and field, shared by every copy of the menu. */
  let placeDrafts = $state({});
  let placeStatus = $state({});
  let placeBusy = $state(false);
</script>

<script>
  /* The field contract: the settings of a core block in CORE_FIELDS and of a plugin block with `fields`, or the button to a plugin block's own config panel. */
  import Setting from '../../lib/rows/Setting.svelte';
  import { getContext } from 'svelte';
  import SelectRow from '../../lib/rows/SelectRow.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import NumberRow from '../../lib/rows/NumberRow.svelte';
  import ErrorLine from '../../lib/rows/ErrorLine.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import LinkField from '../../lib/LinkField.svelte';
  import { ta, taApiError } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const pluginBlocks = $derived(ed.pluginBlocks);
  const { setBlockProp, setBlockProps } = ed;
  let { area } = $props();

  const clampField = (f, v) => {
    if (!Number.isFinite(v)) v = f.min ?? 0;
    if (f.min != null) v = Math.max(f.min, v);
    if (f.max != null) v = Math.min(f.max, v);
    return v;
  };

  /** The place field writes its text to the field's key and its coordinates to lat and lon: «lat, lon» and links as typed, the rest geocoded. */
  async function searchPlace(f) {
    const blockId = selectedBlock.blockId;
    const k = `${blockId}:${f.key}`;
    const raw = (placeDrafts[k] ?? selectedBlock.props[f.key] ?? '').trim();
    placeStatus[k] = null;
    const coords = raw.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
    if (!raw || coords || /^https?:\/\//i.test(raw)) {
      setBlockProps(f.key, { [f.key]: raw, lat: coords ? Number(coords[1]) : null, lon: coords ? Number(coords[2]) : null });
      return;
    }
    placeBusy = true;
    placeStatus[k] = { text: ta('props.place.searching'), err: false };
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(raw)}`);
      const data = await res.json().catch(() => null);
      // A reply that comes after another block was selected is dropped.
      if (selectedBlock?.blockId !== blockId) return;
      if (res.ok && Number.isFinite(data?.lat)) {
        setBlockProps(f.key, { [f.key]: raw, lat: data.lat, lon: data.lon });
        placeStatus[k] = null;
      } else {
        placeStatus[k] = { text: taApiError(data) ?? ta('props.place.notFound'), err: true };
      }
    } catch {
      placeStatus[k] = { text: ta('props.place.failed'), err: true };
    } finally {
      placeBusy = false;
    }
  }

  /** A field's standard: the value a new block of its type starts with, from the core seed or the plugin's `defaults` where every variant agrees. */
  const standardOf = (f) => {
    if (CORE_FIELDS[selectedBlock.type]) return ed.propStarts(selectedBlock.type, f.key);
    const plugin = pluginBlocks.find((b) => b.type === selectedBlock.type);
    const start = plugin?.defaults?.[f.key];
    const same = (variant) => !(f.key in (variant.props ?? {})) || JSON.stringify(variant.props[f.key]) === JSON.stringify(start);
    return (plugin?.variants ?? []).every(same) ? start : undefined;
  };
  /** Whether a number or a choice holds a value of its own: only against a standard the block's type gives. */
  const ownOf = (f) => {
    const standard = standardOf(f);
    const value = selectedBlock.props[f.key];
    return standard !== undefined && value !== undefined && JSON.stringify(value) !== JSON.stringify(standard);
  };

  /** The settings of the core blocks that use the field contract. */
  const CORE_FIELDS = {
    map: [
      { key: 'location', type: 'place', label: ta('lbl.mapLocation'), hint: ta('tip.map.location'), placeholder: ta('ph.mapLocation') },
      { key: 'zoom', type: 'number', label: ta('lbl.mapZoom'), hint: ta('tip.map.zoom'), min: 1, max: 19 },
    ],
  };
</script>

{#if area === 'content'}
  <!-- The fields' settings, or the button to a plugin block's own config panel in the preview. -->
  {@const pluginFields = CORE_FIELDS[selectedBlock.type] ?? pluginBlocks.find((b) => b.type === selectedBlock.type)?.fields ?? []}
  {#snippet fieldList()}
    {#each pluginFields as f (f.key)}
      {#if f.type === 'place'}
        {@const k = `${selectedBlock.blockId}:${f.key}`}
        <label title={f.hint || f.label}>{f.label}
          <input type="text" placeholder={f.placeholder}
            value={placeDrafts[k] ?? selectedBlock.props[f.key] ?? ''}
            oninput={(e) => { placeDrafts[k] = e.target.value; }}
            onkeydown={(e) => { if (e.key === 'Enter') searchPlace(f); }} /></label>
        <button class="ghost" disabled={placeBusy} onclick={() => searchPlace(f)}>{ta('props.place.search')}</button>
        {#if placeStatus[k]?.err}
          <ErrorLine text={placeStatus[k].text} />
        {:else if placeStatus[k]}
          <span class="field-note" aria-live="polite">{placeStatus[k].text}</span>
        {/if}
      {:else if f.type === 'number'}
        <!-- A number, a switch and a choice go back to the type's standard; what the owner types, a place and a link are plain rows -->
        <Setting pin={selectedBlock.type === 'map' && f.key === 'zoom' ? 'zoom' : null} own={ownOf(f)} reset={() => setBlockProp(f.key, standardOf(f))}>
          <NumberRow label={f.label} title={f.hint || f.label} value={selectedBlock.props[f.key]} min={f.min} max={f.max} step={f.step ?? 1}
            onchange={(v) => setBlockProp(f.key, clampField(f, v))} />
        </Setting>
      {:else if f.type === 'toggle'}
        <!-- A switch without a standard of its own starts off -->
        <Setting own={Boolean(selectedBlock.props[f.key]) !== Boolean(standardOf(f))} reset={() => setBlockProp(f.key, standardOf(f) ?? false)}>
          <SwitchRow label={f.label} title={f.hint || f.label} checked={Boolean(selectedBlock.props[f.key])} onchange={(on) => setBlockProp(f.key, on)} />
        </Setting>
      {:else if f.type === 'link'}
        <!-- The link shape under the field's own key, set through the link editor; null when it is removed -->
        <LinkField label={f.label} title={f.hint || f.label} value={selectedBlock.props[f.key] ?? null}
          onchange={(next) => setBlockProp(f.key, next)} />
      {:else if f.type === 'select'}
        <Setting own={ownOf(f)} reset={() => setBlockProp(f.key, standardOf(f))}>
          <SelectRow label={f.label} title={f.hint || f.label} value={selectedBlock.props[f.key]} options={(f.options ?? []).map((o) => [o.value, o.label])}
            onchange={(v) => setBlockProp(f.key, v)} />
        </Setting>
      {:else}
        <label title={f.hint || f.label}>{f.label}
          <input type="text" placeholder={f.placeholder} value={selectedBlock.props[f.key] ?? ''}
            onchange={(e) => setBlockProp(f.key, e.target.value)} /></label>
      {/if}
    {/each}
  {/snippet}
  {#if selectedBlock.type === 'map'}
    <Fold id="map-place" defaultOpen title={ta('group.place')} value={selectedBlock.props.location || ta('common.none')}>{@render fieldList()}</Fold>
    <!-- Whether the map stands behind a cover until a visitor presses it, or loads with the page -->
    <Setting key="askFirst" own={selectedBlock.props.askFirst === false} reset={() => setBlockProp('askFirst', undefined)}>
      <SwitchRow label={ta('lbl.embedAskFirst')} title={ta('tip.embed.askFirst')} checked={selectedBlock.props.askFirst !== false} onchange={(on) => setBlockProp('askFirst', on)} />
    </Setting>
  {:else if pluginFields.length}
    {@render fieldList()}
  {:else if pluginBlocks.some((b) => b.type === selectedBlock.type)}
    <button class="ghost" title={ta('hint.pluginBlock')}
      onclick={() => ed.bridge?.sendOpenConfig(selectedBlock.blockId)}>{ta('ui.settings')}</button>
  {/if}
{/if}
