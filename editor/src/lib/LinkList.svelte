<script>
  /* A list of links with icons (0.7.0.52): the site's links in the Site panel and a links block's own, edited as rows of the kit's list editor (lib/rows/ListEditor.svelte).
     Each row has the icon (the whole icon library through the picker, or an own uploaded image), the label and the address set through the link editor (one address, LinkField's `address` shape).
     The list itself is owned by whoever renders it: every change goes out through the callbacks. */
  import GlyphPicker from './GlyphPicker.svelte';
  import LinkField from './LinkField.svelte';
  import { ta } from '$engine/i18n.js';
  import { ICON_LIBRARY } from '$engine/icons.js';
  import { ICONS } from './icons.js';
  import ListEditor from './rows/ListEditor.svelte';
  import IconButton from './rows/IconButton.svelte';
  /** scope: where the list stands, as LinkField takes it ('site' for the site's links, 'page' for a links block's own); `onmove(from, to)` gets a row's index before and after a move. */
  let { links = [], scope = 'page', label = '', onchange, onadd, onremove, onmove } = $props();
</script>

<ListEditor items={links} label={label || ta('group.siteLinks')} key={(link, i) => link.id ?? i} {onmove} {onremove} {onadd} addLabel={ta('ui.addSiteLink')}>
  {#snippet row(link, i)}
    <div class="nav-row link-row">
      <span class="nav-line">
        <GlyphPicker iconsOnly value="" icon={link.image ? null : (link.icon || null)} image={link.image || null} label={ta('blocks.icon')}
          onicon={(id) => onchange(i, { icon: id, image: '' })}
          onimage={(dataUrl) => onchange(i, { image: dataUrl, icon: '' })} />
        <input class="nav-target" value={link.label ?? ''} placeholder={link.icon ? ICON_LIBRARY[link.icon]?.label : ta('lbl.linkLabel')} title={ta('tip.link.label')}
          data-link-label={link.id}
          onchange={(e) => onchange(i, { label: e.target.value.trim() })} />
        {#if link.image}
          <IconButton icon={ICONS.cross} label={ta('ui.ownIconRemove')} onclick={() => onchange(i, { image: '', icon: 'globe' })} />
        {/if}
      </span>
      <span class="link-cell"><LinkField shape="address" {scope} value={link.url ?? ''} title={ta('tip.link.url')} onchange={(url) => onchange(i, { url: url ?? '' })} /></span>
    </div>
  {/snippet}
</ListEditor>

<style>
  .link-row {
    min-width: 0;
  }

  .link-cell {
    display: block;
    min-width: 0;
  }
</style>
