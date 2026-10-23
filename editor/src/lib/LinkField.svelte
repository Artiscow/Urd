<script>
  /* A link field (0.7.27.4): shows where a link goes and opens the link editor (LinkDialog.svelte) to change it, so every link in the editor is set the same way.
     `value` is the host's link: a link object, or for a host of the `address` shape (one address) the address itself.
     `scope` says where the host stands: on the page being edited ('page', a block), or on every page ('site': the menu, the footer, the site's links, collection entries), which never reads a spot without a page as this page's (link-edit.js).
     A link to a spot names the spot by its section's number and first words, or its name, read from the page it is on.
     A link whose page or spot is gone, or an address within the site that names no page, shows a warning in place of where it goes (linkProblem). */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { pageSpots, takenAnchors } from '$engine/anchor-model.js';
  import { readLink, linkSummary, linkProblem } from './link-edit.js';
  import { ICONS } from './icons.js';
  const ed = getContext('urd-editor');
  /** label: the field's name ('' draws none, for a field in a row); title: its tooltip; shape, pagesOnly and removable (false for a host that must have a link) as the link editor takes them; onchange(value) with the link written back, or null when it is removed. */
  let { value = null, label = '', title = '', placeholder = '', shape = 'link', scope = 'page', pagesOnly = false, removable = true, onchange } = $props();
  const uid = Math.random().toString(36).slice(2, 8);

  const pages = $derived(ed.siteDraft?.pages ?? []);
  const here = $derived(scope === 'site' ? null : ed.pageId);
  const link = $derived(readLink(value, { pages, here }));
  /** The words for the chosen spot, and the ids in use on the page it is on (null until that page is read). */
  let spotLabel = $state('');
  let spotsTaken = $state(null);

  $effect(() => {
    const { page, target } = link;
    spotLabel = '';
    spotsTaken = null;
    if (!page || !target) return;
    let live = true;
    const entry = pages.find((p) => p.id === page);
    // The page being edited is read again after every saved change (its data is not reactive), so a spot deleted there is seen at once.
    if (page === ed.pageId) void ed.edits;
    const read = page === ed.pageId ? Promise.resolve($state.snapshot(ed.store?.data)) : entry && ed.readPageDraft ? ed.readPageDraft(entry) : Promise.resolve(null);
    read.then((data) => {
      if (!live) return;
      if (data) spotsTaken = takenAnchors(data);
      const spot = pageSpots(data).find((s) => s.id === target || (s.name && s.name === target));
      if (spot) spotLabel = spot.kind === 'section' ? (spot.name ? `#${spot.name}` : ta('link.section', { n: spot.n })) : `#${spot.name}`;
    }).catch(() => {});
    return () => {
      live = false;
    };
  });

  const summary = $derived(linkSummary(link, { pages, spotLabel }));
  const problem = $derived(linkProblem(link, { pages, taken: spotsTaken, reserved: ed.RESERVED_SLUGS }));
  /** What the field says when its link no longer lands. */
  const problemText = $derived(problem === 'page' ? ta('link.missingPage')
    : problem === 'spot' ? ta('link.missingSpot', { page: pages.find((p) => p.id === link.page)?.title ?? link.page })
      : problem === 'address' ? ta('link.missingAddress', { url: link.url }) : '');

  /** Opens the link editor; the field itself is the anchor the editor may stand beside (the admin setting). */
  function open(event) {
    ed.openLink({ value: $state.snapshot(value), shape, pagesOnly, removable, here, anchor: event.currentTarget, apply: (next) => onchange(next) });
  }
</script>

{#if label}
  <div class="field-stack link-field-wrap">
    <span class="mini-label" id="link-label-{uid}" {title}>{label}</span>
    {@render field()}
  </div>
{:else}
  {@render field()}
{/if}

{#snippet field()}
  <button type="button" class="link-field" class:empty={!summary} class:missing={problem} title={problem ? ta('tip.link.missing') : title || ta('tip.link.field')} onclick={open}
    aria-labelledby={label ? `link-label-${uid} link-text-${uid}` : undefined}>
    {#if problem}
      <span class="link-field-icon" aria-hidden="true">{@html ICONS.warn}</span>
    {:else}
      <svg class="link-field-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>
    {/if}
    <span class="link-field-text" id="link-text-{uid}">{problemText || summary || placeholder || ta('link.none')}</span>
  </button>
{/snippet}

<style>
  .link-field {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.45rem;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    padding: 0.4rem 0.55rem;
    font: inherit;
    font-size: 0.85rem;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: rgb(255 255 255 / 6%);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 6px;
  }

  .link-field:hover {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .link-field.empty .link-field-text {
    opacity: 0.6;
  }

  .link-field-icon {
    display: flex;
    flex: none;
    opacity: 0.7;
  }

  .link-field.missing {
    color: #e2b84a;
    border-color: color-mix(in srgb, #e2b84a 60%, transparent);
  }

  .link-field.missing .link-field-icon {
    opacity: 1;
  }

  .link-field-text {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
