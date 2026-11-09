<script>
  /* The links block (type id share) in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import NumberRow from '../../lib/rows/NumberRow.svelte';
  import ColourRow from '../../lib/rows/ColourRow.svelte';
  import SubHeading from '../../lib/rows/SubHeading.svelte';
  import LinkList from '../../lib/LinkList.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
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

</script>

{#if area === 'content'}
  {#snippet shareLinks()}
    <!-- The site's links from the Site panel first, in the row of the switch that shows them, each one's own switch showing it again; then the block's own after them -->
    <Setting own={!useSite || siteLinks().some((link) => (selectedBlock.props.hidden ?? []).includes(link.id))} reset={() => setBlockProps('useSite', { useSite: true, hidden: [] })}>
      <SwitchRow label={ta('lbl.useSiteLinks')} title={ta('tip.share.useSite')} checked={useSite} onchange={(on) => setBlockProp('useSite', on)} />
      {#if useSite}
        <!-- Each of the site's links can be left out of this block alone (hidden, by id) -->
        {#each siteLinks() as link (link.id)}
          <SwitchRow label={link.label || ICON_LIBRARY[link.icon]?.label || link.url} title={`${ta('tip.share.pick')}${link.url ? `\n${link.url}` : ''}`}
            checked={!(selectedBlock.props.hidden ?? []).includes(link.id)} onchange={(on) => toggleSiteLink(link.id, on)}>
            {#snippet lead()}<span class="footer-soc-preview" aria-hidden="true">{#if link.image}<img src={link.image} alt="">{:else}{@html iconSvg(link.icon) || ''}{/if}</span>{/snippet}
          </SwitchRow>
        {/each}
        <button class="ghost action" onclick={() => { ed.siteLinksOpen = true; ed.openPanel('site'); }}>{ta('ui.editSiteLinks')}</button>
      {/if}
    </Setting>
    <SubHeading text={ta('lbl.ownLinks')} />
    <LinkList label={ta('lbl.ownLinks')} links={selectedBlock.props.links ?? []}
      onchange={(i, patch) => ownLinks((list) => { list[i] = { ...list[i], ...patch }; })}
      onadd={() => ownLinks((list) => list.push({ id: makeId('link'), icon: 'globe', label: '', url: '' }))}
      onremove={(i) => ownLinks((list) => list.splice(i, 1))}
      onmove={(from, to) => ownLinks((list) => list.splice(to, 0, ...list.splice(from, 1)))} />
  {/snippet}
  <Fold id="share-services" defaultOpen title={ta('group.siteLinks')}
    value={String((useSite ? siteLinks().filter((l) => !(selectedBlock.props.hidden ?? []).includes(l.id)).length : 0) + (selectedBlock.props.links ?? []).length)}
    group={groupOf('share-services', { useSite: true, hidden: [] })}>{@render shareLinks()}</Fold>
{:else if area === 'style'}
  {#snippet shareLook()}
    <Setting key="size">
      <NumberRow label={ta('lbl.size')} title={ta('tip.share.size')} value={selectedBlock.props.size ?? 38} min={24} max={64} unit="px" onchange={(v) => setBlockProp('size', v)} />
    </Setting>
    <Setting key="color" source="theme">
      <ColourRow label={ta('lbl.color')} title={ta('tip.share.color')} value={selectedBlock.props.color || 'accent'} tokens={themeSwatches()}
        onchange={(v) => setBlockProp('color', v === 'accent' ? '' : v)} />
    </Setting>
  {/snippet}
  <Fold id="share-look" defaultOpen title={ta('group.appearance')} value={`${selectedBlock.props.size ?? 38} px`} group={groupOf('share-look', { size: 38, color: '' })}>{@render shareLook()}</Fold>
{/if}
