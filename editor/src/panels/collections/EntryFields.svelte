<script>
  /* One entry's fields, the same in every layout of the Collections panel: the title, the date, the text and the link, the picture with its alt text, and a product's price, member price, badge, sizes (with their presets), colours and the quantity the buyer types.
     The picture opens the image editor the canvas uses (engine image-editor.js): a new picture, its crop, focus, filters and alt text.
     The layout around it owns the entry's delete and its moves. `data-field` marks the fields a click on a card in the preview asks to focus. */
  import { getContext, tick } from 'svelte';
  import { openImageEditor, closeImageEditor } from '$engine/image-editor.js';
  import { ta } from '$engine/i18n.js';
  import DatePicker from '../../lib/DatePicker.svelte';
  import LinkField from '../../lib/LinkField.svelte';
  import { linkOf } from '../../lib/link-edit.js';
  import { sameColorName } from '../../lib/collection-layout.js';
  import { ICONS } from '../../lib/icons.js';
  import { collectionActions } from './actions.js';
  import SizePresets from './SizePresets.svelte';

  const ed = getContext('urd-editor');
  let { id, entry, kind } = $props();
  const act = collectionActions(ed);
  let root = $state(null);
  let pictureEl = $state(null);

  /** The entry as it stands now in its collection, for the image editor, which reads it after every change. */
  const current = () => ed.collectionsView[id]?.entries.find((e) => e.id === entry.id) ?? entry;

  /** The editor the canvas's pictures use, here writing to the entry: the picture itself, its alt text, and its style part by part. */
  const pictureAdapter = {
    fields: ['image', 'remove', 'alt', 'fit', 'shape', 'zoom', 'radius', 'focus', 'filters'],
    get: (field) => {
      const e = current();
      if (field === 'image') return e.image ?? null;
      if (field === 'alt') return e.imageAlt ?? '';
      return (e.imageStyle ?? {})[field];
    },
    set: (field, value) => {
      if (field === 'image') act.setEntryField(id, entry.id, 'image', value || '');
      else if (field === 'alt') act.setEntryField(id, entry.id, 'imageAlt', String(value ?? '').trim());
      else act.setEntryImageStyle(id, entry.id, field, value);
    },
  };

  function editPicture() {
    if (pictureEl) openImageEditor(pictureEl, pictureAdapter);
  }

  // The image editor belongs to the entry it opened for: it closes when the fields go.
  $effect(() => () => closeImageEditor());

  /** The picture in the panel as the page shows it: its fit, its focus and its filters. */
  function thumbStyle(style) {
    const s = style ?? {};
    const filter = ['brightness', 'contrast', 'saturate'].filter((f) => s[f] != null).map((f) => `${f}(${s[f]})`).join(' ');
    return `object-fit: ${s.fit ?? 'cover'}; object-position: ${(s.x ?? 0.5) * 100}% ${(s.y ?? 0.5) * 100}%;${filter ? ` filter: ${filter};` : ''}`;
  }

  /** The least or the most the buyer may order; an empty field leaves it open, and the other limit follows so the most is never under the least. */
  function setLimit(which, raw) {
    const q = { ...(current().quantity ?? {}) };
    const n = Math.trunc(Number(raw));
    if (raw === '' || !Number.isFinite(n)) delete q[which];
    else q[which] = Math.min(99, Math.max(1, n));
    if (q.min != null && q.max != null && q.min > q.max) {
      if (which === 'min') q.max = q.min;
      else q.min = q.max;
    }
    act.setEntryField(id, entry.id, 'quantity', q);
  }

  /** A new colour, its name field focused with the seed words selected, so typing names it. */
  function addColor() {
    act.addEntryColor(id, entry.id);
    tick().then(() => {
      const field = root?.querySelector('.entry-color input');
      field?.focus();
      field?.select();
    });
  }
</script>

{#snippet holdSwitch()}
  <!-- How «Add to basket» waits for the required choices: greyed and unpressable until they are made, or (off) asking for them when pressed -->
  <label class="gridmenu-snap entry-require entry-require-sub" title={ta('tip.entry.disableUntilChosen')}>
    <input type="checkbox" checked={entry.disableUntilChosen === true}
      onchange={(e) => act.setEntryField(id, entry.id, 'disableUntilChosen', e.target.checked || '')} />
    {ta('lbl.disableUntilChosen')}
  </label>
{/snippet}

<div class="entry-body coll-entry" data-entry-id={entry.id} bind:this={root}>
  <label class="field-stack" title={ta('lbl.title')}>{ta('lbl.title')}
    <input value={entry.title} data-field="title"
      onchange={(e) => act.setEntryField(id, entry.id, 'title', e.target.value || ta('ui.untitled'))} /></label>
  {#if kind !== 'products'}
    <div class="entry-fields">
      <span class="nav-body-label">{ta('lbl.date')}</span>
      <DatePicker value={entry.date ?? ''} title={ta('tip.entry.date')} onchange={(v) => act.setEntryField(id, entry.id, 'date', v)} />
    </div>
  {/if}
  <textarea rows="4" placeholder={ta('ph.collections.text')} title={ta('lbl.text')} data-field="text"
    value={entry.text ?? ''}
    onchange={(e) => act.setEntryField(id, entry.id, 'text', e.target.value)}></textarea>
  {#if kind !== 'products'}
    <LinkField scope="site" label={ta('lbl.link')} value={linkOf(entry)} placeholder={ta('ph.collections.href')}
      onchange={(link) => act.setEntryLink(id, entry.id, link)} />
  {/if}
  <!-- The picture large enough to tell what it shows, drawn as the page draws it; it opens the image editor, and so does the button beside it -->
  <div class="entry-image" class:empty={!entry.image}>
    {#if entry.image}
      <button type="button" class="entry-image-edit" bind:this={pictureEl} title={ta('tip.entry.editPicture')} aria-label={ta('tip.entry.editPicture')} onclick={editPicture}>
        <img class="entry-image-thumb" src={entry.image} alt="" style={thumbStyle(entry.imageStyle)} /></button>
      <span class="entry-image-actions">
        <button type="button" class="ghost" title={ta('tip.entry.editPicture')} onclick={editPicture}>{ta('ui.editPicture')}</button>
      </span>
    {:else}
      <span class="entry-image-actions">
        <button type="button" class="ghost" bind:this={pictureEl} title={ta('tip.entry.image')} onclick={editPicture}>{ta('ui.addImage')}</button>
      </span>
    {/if}
  </div>
  {#if entry.image}
    <!-- The picture's alt text, the same the image editor on the canvas shows -->
    <label title={ta('tip.image.alt')} class="field-stack">{ta('lbl.altText')}
      <input value={entry.imageAlt ?? ''} placeholder={ta('ph.altText')}
        onchange={(e) => act.setEntryField(id, entry.id, 'imageAlt', e.target.value.trim())} /></label>
  {/if}
  {#if kind === 'products'}
    <!-- The product fields (the shop) on one grid, the names in a column of their own: price, member price and badge, then the sizes and the colours -->
    <div class="entry-fields">
      <span class="nav-body-label" title={ta('tip.entry.price')}>{ta('lbl.price')}</span>
      <input type="number" min="0" step="0.01" value={entry.price ?? ''} data-field="price" title={ta('tip.entry.price')}
        onchange={(e) => act.setEntryField(id, entry.id, 'price', e.target.value === '' ? '' : Number(e.target.value))} />
      <span class="nav-body-label" title={ta('tip.entry.memberPrice')}>{ta('lbl.memberPrice')}</span>
      <input type="number" min="0" step="0.01" value={entry.memberPrice ?? ''} title={ta('tip.entry.memberPrice')}
        onchange={(e) => act.setEntryField(id, entry.id, 'memberPrice', e.target.value === '' ? '' : Number(e.target.value))} />
      <span class="nav-body-label" title={ta('tip.entry.badge')}>{ta('lbl.productBadge')}</span>
      <input value={entry.badge ?? ''} data-field="badge" title={ta('tip.entry.badge')}
        onchange={(e) => act.setEntryField(id, entry.id, 'badge', e.target.value)} />
    </div>
    <!-- The sizes as chips, each read whole and taken away on its own, and a field that adds one or several divided by commas -->
    <SizePresets {id} {entry} label={ta('lbl.sizes')} tip={ta('tip.entry.sizes')} />
    {#if entry.sizes?.length}
      <!-- This product's buyer must choose a size before «Add to basket» -->
      <label class="gridmenu-snap entry-require" title={ta('tip.entry.requireSize')}>
        <input type="checkbox" checked={entry.requireSize === true}
          onchange={(e) => act.setEntryField(id, entry.id, 'requireSize', e.target.checked || '')} />
        {ta('lbl.requireSize')}
      </label>
      {#if entry.requireSize === true}{@render holdSwitch()}{/if}
    {/if}
    <div class="entry-chips">
      {#each entry.sizes ?? [] as size, si (si)}
        <span class="entry-chip">{size}<button type="button" class="entry-chip-x" title={ta('tip.entry.removeSize')} aria-label={ta('tip.entry.removeSize')}
          onclick={() => act.removeEntrySize(id, entry.id, si)}>{@html ICONS.cross}</button></span>
      {/each}
      <input class="entry-chip-add" placeholder={ta('ph.addSize')} title={ta('tip.entry.sizes')} data-field="sizes"
        onkeydown={(e) => { if (e.key === 'Enter') { e.preventDefault(); act.addEntrySizes(id, entry.id, e.currentTarget.value); e.currentTarget.value = ''; } }}
        onchange={(e) => { act.addEntrySizes(id, entry.id, e.currentTarget.value); e.currentTarget.value = ''; }} />
    </div>
    <!-- The colours: the switch and «+ Colour» first, then the colours, a new one at the top; each with its name, its picture and its removal -->
    <span class="nav-body-label entry-part" title={ta('tip.entry.colors')}>{ta('lbl.colors')}</span>
    {#if entry.colors?.some((c) => c?.name)}
      <!-- This product's buyer must choose a colour before «Add to basket» -->
      <label class="gridmenu-snap entry-require" title={ta('tip.entry.requireColor')}>
        <input type="checkbox" checked={entry.requireColor === true}
          onchange={(e) => act.setEntryField(id, entry.id, 'requireColor', e.target.checked || '')} />
        {ta('lbl.requireColor')}
      </label>
      <!-- The one grey-out switch stands under the first requirement that is on: here when the size asks for nothing -->
      {#if entry.requireColor === true && !(entry.sizes?.length && entry.requireSize === true)}{@render holdSwitch()}{/if}
    {/if}
    <button class="ghost action entry-add-color" title={ta('tip.entry.colors')} data-field="colors" onclick={addColor}>{ta('ui.addColor')}</button>
    {#each entry.colors ?? [] as color, ci (ci)}
      {@const twice = sameColorName(entry.colors, ci)}
      <!-- A name another colour has too is marked: the page keeps the two apart, but a buyer reads the same words and the order names the colour by them -->
      <span class="entry-color" class:twice>
        <input value={color.name} placeholder={ta('ph.colorName')} title={twice ? ta('tip.entry.colorTwice') : ta('tip.entry.colors')}
          aria-invalid={twice || undefined}
          onchange={(e) => act.setEntryColor(id, entry.id, ci, 'name', e.target.value)} />
        {#if twice}<span class="entry-color-warn" title={ta('tip.entry.colorTwice')} role="img" aria-label={ta('tip.entry.colorTwice')}>{@html ICONS.warn}</span>{/if}
        <label title={color.image ? ta('ui.changeImage') : ta('tip.entry.colorImage')} class="ghost row-tool filepick entry-color-pick" aria-label={color.image ? ta('ui.changeImage') : ta('ui.addImage')}>
          {#if color.image}<img class="entry-color-thumb" src={color.image} alt="" />{:else}{@html ICONS.image}{/if}
          <input type="file" accept="image/*" onchange={(e) => act.setEntryColorImage(id, entry.id, ci, e)} />
        </label>
        <button class="ghost row-tool" title={ta('tip.entry.removeColor')} onclick={() => act.removeEntryColor(id, entry.id, ci)}>{@html ICONS.cross}</button>
      </span>
    {/each}
    <!-- The quantity the buyer types: off unless turned on; its least and most stand only while it is on, and each may stay empty -->
    <span class="nav-body-label entry-part" title={ta('tip.entry.quantity')}>{ta('lbl.quantity')}</span>
    <label class="gridmenu-snap entry-require" title={ta('tip.entry.quantity')}>
      <input type="checkbox" data-field="quantity" checked={Boolean(entry.quantity)}
        onchange={(e) => act.setEntryField(id, entry.id, 'quantity', e.target.checked ? {} : '')} />
      {ta('lbl.buyerQuantity')}
    </label>
    {#if entry.quantity}
      <div class="entry-fields entry-qty">
        <span class="nav-body-label" title={ta('tip.entry.qtyMin')}>{ta('lbl.qtyMin')}</span>
        <input type="number" min="1" max="99" step="1" value={entry.quantity.min ?? ''} placeholder={ta('ph.qtyNoMin')} title={ta('tip.entry.qtyMin')}
          onchange={(e) => setLimit('min', e.target.value)} />
        <span class="nav-body-label" title={ta('tip.entry.qtyMax')}>{ta('lbl.qtyMax')}</span>
        <input type="number" min="1" max="99" step="1" value={entry.quantity.max ?? ''} placeholder={ta('ph.qtyNoMax')} title={ta('tip.entry.qtyMax')}
          onchange={(e) => setLimit('max', e.target.value)} />
      </div>
    {/if}
  {/if}
</div>

<style>
  .entry-image-edit {
    display: block;
    padding: 0;
    cursor: pointer;
    background: none;
    border: 0;
    border-radius: 6px;
  }

  .entry-image-edit:focus-visible {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: 2px;
  }

  .entry-qty {
    padding-left: 0.9rem;
  }
</style>
