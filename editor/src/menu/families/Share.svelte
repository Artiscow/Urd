<script>
  /* The links block (type id share) in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import ColorPicker from '../../lib/ColorPicker.svelte';
  import LinkList from '../../lib/LinkList.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import DesignRow from '../DesignRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeId } from '$engine/sections/presets.js';
  import { ICON_LIBRARY, iconSvg } from '$engine/icons.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps, themeSwatches, siteLinks } = ed;
  const useSite = $derived(selectedBlock.props.useSite !== false);

  /** A site link shown or left out by this block: the ids left out are kept in `hidden`. */
  function toggleSiteLink(id, on) {
    mutateBlock(`edit:${selectedBlock.blockId}:hidden`, (b) => {
      const set = new Set(Array.isArray(b.props.hidden) ? b.props.hidden : []);
      if (on) set.delete(id);
      else set.add(id);
      b.props.hidden = [...set];
    });
  }

  /** The block's own links, edited as rows; the list is written whole. */
  function ownLinks(fn) {
    mutateBlock(`edit:${selectedBlock.blockId}:links`, (b) => {
      b.props.links ??= [];
      fn(b.props.links);
    });
  }
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
  const variantOptions = () => [['icons', ta('opt.share.icons')], ['labels', ta('opt.share.labels')]];

</script>

{#if area === 'content'}
  {#snippet shareLinks()}
    <!-- The site's links from the Site panel first, then the block's own after them -->
    <Setting key="useSite" shown={ta('common.on')}>
      <label class="gridmenu-snap" title={ta('tip.share.useSite')}>
        <input type="checkbox" checked={useSite}
          onchange={(e) => setBlockProp('useSite', e.target.checked)} />
        {ta('lbl.useSiteLinks')}
      </label>
    </Setting>
    {#if useSite}
      <!-- Each of the site's links can be left out of this block alone (hidden, by id) -->
      {#each siteLinks() as link (link.id)}
        <label title={`${ta('tip.share.pick')}${link.url ? `\n${link.url}` : ''}`} class="gridmenu-snap link-pick">
          <input type="checkbox" checked={!(selectedBlock.props.hidden ?? []).includes(link.id)}
            onchange={(e) => toggleSiteLink(link.id, e.target.checked)} />
          <span class="footer-soc-preview" aria-hidden="true">{#if link.image}<img src={link.image} alt="">{:else}{@html iconSvg(link.icon) || ''}{/if}</span>
          {link.label || ICON_LIBRARY[link.icon]?.label || link.url}
        </label>
      {/each}
      <button class="ghost action" onclick={() => { ed.siteLinksOpen = true; ed.openPanel('site'); }}>{ta('ui.editSiteLinks')}</button>
    {/if}
    <span class="mini-label">{ta('lbl.ownLinks')}</span>
    <LinkList links={selectedBlock.props.links ?? []}
      onchange={(i, patch) => ownLinks((list) => { list[i] = { ...list[i], ...patch }; })}
      onadd={() => ownLinks((list) => list.push({ id: makeId('link'), icon: 'globe', label: '', url: '' }))}
      onremove={(i) => ownLinks((list) => list.splice(i, 1))}
      onmove={(i, dir) => ownLinks((list) => { const j = i + dir; if (j >= 0 && j < list.length) [list[i], list[j]] = [list[j], list[i]]; })} />
  {/snippet}
  <MenuGroup id="share-services" defaultOpen title={ta('group.siteLinks')}
    value={String((useSite ? siteLinks().filter((l) => !(selectedBlock.props.hidden ?? []).includes(l.id)).length : 0) + (selectedBlock.props.links ?? []).length)}
    group={groupOf('share-services', { useSite: true, hidden: [] })}>{@render shareLinks()}</MenuGroup>
{:else if area === 'style'}
  {#snippet shareLook()}
    <Setting key="variant">
      <DesignRow pin="variant" />
    </Setting>
    <Setting key="size" shown="38">
      <label title={ta('tip.share.size')}>{ta('lbl.size')}
        <input type="number" min="24" max="64" value={selectedBlock.props.size ?? 38}
          onchange={(e) => setBlockProp('size', Number(e.target.value) || 38)} /></label>
    </Setting>
    <Setting key="color" source="theme">
      <label title={ta('tip.share.color')}>{ta('lbl.color')}
        <ColorPicker value={selectedBlock.props.color || 'accent'} tokens={themeSwatches()}
          onchange={(v) => setBlockProp('color', v === 'accent' ? '' : v)} /></label>
    </Setting>
  {/snippet}
  <MenuGroup id="share-look" defaultOpen title={ta('group.appearance')} value={variantOptions().find(([v]) => v === (selectedBlock.props.variant ?? 'icons'))?.[1] ?? ''} group={groupOf('share-look', { variant: 'icons', size: 38, color: '' })}>{@render shareLook()}</MenuGroup>
{/if}
