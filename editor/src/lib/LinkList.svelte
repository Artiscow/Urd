<script>
  /* A list of links with icons (0.7.0.52): the site's links in the Site panel and a links block's own, edited as rows.
     Each row has the icon (the whole icon library through the picker, or an own uploaded image), the label, the address set through the link editor (one address, LinkField's `address` shape), and the row tools.
     The list itself is owned by whoever renders it: every change goes out through the callbacks. */
  import GlyphPicker from './GlyphPicker.svelte';
  import LinkField from './LinkField.svelte';
  import { ta } from '$engine/i18n.js';
  import { ICON_LIBRARY } from '$engine/icons.js';
  import { ICONS } from './icons.js';
  /** scope: where the list stands, as LinkField takes it ('site' for the site's links, 'page' for a links block's own). */
  let { links = [], scope = 'page', onchange, onadd, onremove, onmove } = $props();
</script>

{#each links as link, i (link.id ?? i)}
  <div class="nav-row link-row">
    <span class="nav-line">
      <GlyphPicker iconsOnly value="" icon={link.image ? null : (link.icon || null)} image={link.image || null} label={ta('blocks.icon')}
        onicon={(id) => onchange(i, { icon: id, image: '' })}
        onimage={(dataUrl) => onchange(i, { image: dataUrl, icon: '' })} />
      <input class="nav-target" value={link.label ?? ''} placeholder={link.icon ? ICON_LIBRARY[link.icon]?.label : ta('lbl.linkLabel')} title={ta('tip.link.label')}
        data-link-label={link.id}
        onchange={(e) => onchange(i, { label: e.target.value.trim() })} />
      {#if link.image}
        <button class="ghost row-tool" title={ta('ui.ownIconRemove')} onclick={() => onchange(i, { image: '', icon: 'globe' })}>{@html ICONS.cross}</button>
      {/if}
    </span>
    <span class="nav-line">
      <span class="link-cell"><LinkField shape="address" {scope} value={link.url ?? ''} title={ta('tip.link.url')} onchange={(url) => onchange(i, { url: url ?? '' })} /></span>
      <span class="row-tools">
        <button class="ghost row-tool" title={ta('tip.moveUp')} onclick={() => onmove(i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
        <button class="ghost row-tool" title={ta('tip.moveDown')} onclick={() => onmove(i, 1)} disabled={i === links.length - 1}>{@html ICONS.down}</button>
        <button class="ghost row-tool" title={ta('tip.removeLink')} onclick={() => onremove(i)}>{@html ICONS.cross}</button>
      </span>
    </span>
  </div>
{/each}
<button class="ghost action" onclick={onadd}>{ta('ui.addSiteLink')}</button>

<style>
  .link-cell {
    flex: 1 1 0;
    min-width: 0;
  }
</style>
