<script module>
  /* The field contract (plugin blocks, `fields` in urd-plugin-blocks):
     drafts and search status for place fields, keyed per block+field so a
     block switch shows the selected block's own values. Module state, so
     every copy of the menu shows the same. */
  let placeDrafts = $state({});
  let placeStatus = $state({});
  let placeBusy = $state(false);
</script>

<script>
  /* The field contract (0.7.26.2): the settings of a core block listed in
     CORE_FIELDS and of a plugin block with `fields`, and the button that opens
     a plugin block's own config panel in the preview; and the design contract,
     the design row of a plugin block with `designs`. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Pin from '../Pin.svelte';
  import DesignRow from '../DesignRow.svelte';
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

  /** The place field writes the text to the field's key and coordinates to
   *  lat/lon: "lat, lon" is parsed locally, links are written untouched
   *  (the plugin interprets them at render), everything else is geocoded
   *  via /api/geocode. */
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
      // The selection may have switched block while the search was in
      // flight: then the reply must be discarded, otherwise the coordinates
      // are written to the wrong block's props.
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

  /** The settings of the core blocks that use the field contract. */
  const CORE_FIELDS = {
    map: [
      { key: 'location', type: 'place', label: ta('lbl.mapLocation'), placeholder: ta('ph.mapLocation') },
      { key: 'zoom', type: 'number', label: ta('lbl.mapZoom'), min: 1, max: 19 },
    ],
  };
</script>

{#if area === 'content'}
  <!-- The field contract: core blocks listed in CORE_FIELDS and plugin
       defs with `fields` get their settings rendered here; a plugin
       block without fields gets the button that opens its own config
       panel in the preview (a plugin copy of the former calendar or form). -->
  {@const pluginFields = CORE_FIELDS[selectedBlock.type] ?? pluginBlocks.find((b) => b.type === selectedBlock.type)?.fields ?? []}
  {#snippet fieldList()}
    {#each pluginFields as f (f.key)}
      {#if f.type === 'place'}
        {@const k = `${selectedBlock.blockId}:${f.key}`}
        <label>{f.label}
          <input type="text" placeholder={f.placeholder}
            value={placeDrafts[k] ?? selectedBlock.props[f.key] ?? ''}
            oninput={(e) => { placeDrafts[k] = e.target.value; }}
            onkeydown={(e) => { if (e.key === 'Enter') searchPlace(f); }} /></label>
        <button class="ghost" disabled={placeBusy} onclick={() => searchPlace(f)}>{ta('props.place.search')}</button>
        {#if placeStatus[k]}
          <p class="panel-hint" class:place-error={placeStatus[k].err}>{placeStatus[k].text}</p>
        {/if}
      {:else if f.type === 'number'}
        <div class="pin-line">
          <label>{f.label}
            <input type="number" min={f.min} max={f.max} step={f.step ?? 1}
              value={selectedBlock.props[f.key]}
              onchange={(e) => setBlockProp(f.key, clampField(f, Number(e.target.value)))} /></label>
          {#if selectedBlock.type === 'map' && f.key === 'zoom'}<Pin id="zoom" />{/if}
        </div>
      {:else if f.type === 'toggle'}
        <label class="gridmenu-snap">
          <input type="checkbox" checked={Boolean(selectedBlock.props[f.key])}
            onchange={(e) => setBlockProp(f.key, e.target.checked)} />
          {f.label}
        </label>
      {:else if f.type === 'link'}
        <!-- The link shape under the field's own key, set through the link editor; null when it is removed -->
        <LinkField label={f.label} value={selectedBlock.props[f.key] ?? null}
          onchange={(next) => setBlockProp(f.key, next)} />
      {:else if f.type === 'select'}
        <label>{f.label}
          <Dropdown value={selectedBlock.props[f.key]}
            options={(f.options ?? []).map((o) => [o.value, o.label])}
            onchange={(v) => setBlockProp(f.key, v)} /></label>
      {:else}
        <label>{f.label}
          <input type="text" placeholder={f.placeholder} value={selectedBlock.props[f.key] ?? ''}
            onchange={(e) => setBlockProp(f.key, e.target.value)} /></label>
      {/if}
    {/each}
  {/snippet}
  {#if selectedBlock.type === 'map'}
    <MenuGroup id="map-place" defaultOpen title={ta('group.place')} value={selectedBlock.props.location || ta('common.none')}>{@render fieldList()}</MenuGroup>
  {:else if pluginFields.length}
    {@render fieldList()}
  {:else}
    <button class="ghost" title={ta('hint.pluginBlock')}
      onclick={() => ed.bridge?.sendOpenConfig(selectedBlock.blockId)}>{ta('ui.settings')}</button>
  {/if}
{:else if area === 'style' && pluginBlocks.find((b) => b.type === selectedBlock.type)?.designs}
  <!-- The design contract: a plugin block with designs opens the design picker as the core blocks do -->
  <DesignRow pin="design" />
{/if}
