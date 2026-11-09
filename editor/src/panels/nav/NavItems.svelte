<script>
  /* The Nav panel's menu items: one row per item at every level, closed one line with its name, its link, small marks for what is set and the arrows, open a card with every field; one row is open at a time.
     The rows move by the row kit's drag in its tree form (lib/rows/row-drag.svelte.js): a row is pressed, held and dragged by its head, the top or bottom third of another row places it before or after that row, the middle third takes it in as a child where the menu's depth holds it, and a row's grip column leads it one level out (lib/nav-drop.js).
     Alt and the arrow keys on a row move it among its neighbours, as its arrows do.
     Under the items stand the new item, the new page as an item, and once an item has a submenu, the submenus' look and behaviour. */
  import { getContext } from 'svelte';
  import { cardFold } from '../../lib/motion.svelte.js';
  import { RowDrag, slotOut } from '../../lib/rows/row-drag.svelte.js';
  import { navRowAt as rowAt, navKeyOf as keyOf, navDropAt, navDropOrNull, canonicalDrop, parentKey } from '../../lib/nav-drop.js';
  import Choice from '../../lib/Choice.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import ColourRow from '../../lib/rows/ColourRow.svelte';
  import SubHeading from '../../lib/rows/SubHeading.svelte';
  import IconButton from '../../lib/rows/IconButton.svelte';
  import LinkField from '../../lib/LinkField.svelte';
  import { navActions, isSideNav } from './nav-actions.js';
  import { ta } from '$engine/i18n.js';
  import { NAV_DEPTH } from '$engine/nav-model.js';
  import { ICONS } from '../../lib/icons.js';
  import { linkOf, setLinkOn, linkText } from '../../lib/link-edit.js';
  const ed = getContext('urd-editor');
  const siteDraft = $derived(ed.siteDraft);
  const { addPage, siteMutate, themeSwatches } = ed;
  const { setNavStyle } = navActions(ed);

  /** A row's key is its path ('2', '2.0'); its level is the number of steps under the bar. */
  const navRowAt = (key) => rowAt(siteDraft.nav.items, key);
  const navNode = (key) => navRowAt(key).node;

  /** The item whose card stands open, by its key; one at a time. */
  let navSel = $state('');

  /** The landing place of a dragged row, reckoned on the rows as seen: over a row its thirds decide, between rows or below the last the nearest row by its midpoint, and below everything the end of the top level; each place has one name. */
  function reckon(rows, e, dragKey) {
    const items = siteDraft.nav.items;
    const hit = rows.find((r) => e.clientY >= r.rect.top && e.clientY <= r.rect.bottom);
    let drop = null;
    if (hit) {
      drop = navDropAt(items, dragKey, hit.id, e.clientX - hit.rect.left, (e.clientY - hit.rect.top) / hit.rect.height, NAV_DEPTH);
    } else {
      const next = rows.find((r) => r.rect.top + r.rect.height / 2 > e.clientY);
      const lastTop = [...rows].reverse().find((r) => !r.id.includes('.'));
      if (next) drop = next.id === dragKey ? null : navDropOrNull(items, dragKey, { key: next.id, pos: 'before' }, NAV_DEPTH);
      else if (lastTop) drop = lastTop.id === dragKey ? null : navDropOrNull(items, dragKey, { key: lastTop.id, pos: 'after' }, NAV_DEPTH);
    }
    drop = canonicalDrop(items, drop);
    return drop ? { id: drop.key, pos: drop.pos } : null;
  }

  /** The drop: the dragged row leaves its list and lands before or after the target, or as the target's last child; an emptied submenu leaves the file, and the landed row's new key is given back for its flash. */
  function land(from, at) {
    const src = navRowAt(from);
    const tgt = navRowAt(at.id);
    const moving = src.node;
    siteMutate('nav', () => {
      src.list.splice(src.index, 1);
      if (src.parent && src.list.length === 0) {
        // A pure opener left without children has no target and gets the front page, so the item stays valid (the same rule as removeNavAt).
        delete src.parent.children;
        if (!src.parent.page && !src.parent.href) src.parent.page = siteDraft.pages[0].id;
      }
      if (at.pos === 'into') {
        tgt.node.children ??= [];
        tgt.node.children.push(moving);
      } else {
        const idx = tgt.list.indexOf(tgt.node) + (at.pos === 'after' ? 1 : 0);
        tgt.list.splice(idx, 0, moving);
      }
      // A row that becomes a child needs a target of its own (a pure opener has none).
      if (!moving.page && moving.href == null && !moving.children?.length) moving.page = siteDraft.pages[0].id;
    });
    navSel = '';
    return keyOf(siteDraft.nav.items, moving) ?? undefined;
  }

  /** A dragged item's card: its name and where it leads. */
  const card = (key) => {
    const node = navNode(key);
    return node ? { name: node.label || ta('seed.link'), detail: linkText(linkOf(node), { pages: siteDraft.pages }) } : null;
  };

  const drag = new RowDrag(land, card, { reckon });

  function setNavLabel(key, value) {
    siteMutate(`edit:nav-label-${key}`, () => { navNode(key).label = value; });
  }

  /** An emptied name takes the linked page's title, the link's address, or the seed word, so no item is published without a name (the schema's minLength 1). */
  function fillNavLabel(key) {
    const node = navNode(key);
    if (node?.label?.trim()) return;
    const page = node.page ? siteDraft.pages.find((p) => p.id === node.page) : null;
    siteMutate(`edit:nav-label-fill-${key}`, () => { node.label = page?.title || node.href || ta('seed.link'); });
  }

  /** A row's link at any level, from the link editor; an item with a submenu and no link is the submenu's opener. */
  function setNavLink(key, link) {
    siteMutate('nav', () => setLinkOn(navNode(key), link));
  }

  /** The one-line description under an item at any level; an emptied field leaves the file. */
  function setNavDescription(key, value) {
    siteMutate(`edit:nav-desc-${key}`, () => {
      const node = navNode(key);
      if (value.trim()) node.description = value; else delete node.description;
    });
  }

  /** A top-level item's look (item.look): a button, or plain, which leaves the file. */
  function setNavLook(i, look) {
    siteMutate('nav', () => {
      if (look === 'button') siteDraft.nav.items[i].look = 'button'; else delete siteDraft.nav.items[i].look;
    });
  }

  /** A row stepped one place within its list, at any level; the row flashes where it lands, and a screen reader hears where it went. */
  function moveNavAt(key, dir) {
    const { list, index } = navRowAt(key);
    const to = index + dir;
    if (to < 0 || to >= list.length) return;
    // The open card stays with its item, whose key changes with its place.
    const openNode = navSel ? navNode(navSel) : null;
    siteMutate('nav', () => { [list[index], list[to]] = [list[to], list[index]]; });
    if (openNode) navSel = keyOf(siteDraft.nav.items, openNode) ?? '';
    const up = parentKey(key);
    drag.landed(up === null ? `${to}` : `${up}.${to}`);
  }

  /** A row removed at any level; an emptied submenu leaves the file, and a pure opener left without children gets the front page, so the item stays valid. */
  function removeNavAt(key) {
    siteMutate('nav', () => {
      const { list, index, parent } = navRowAt(key);
      list.splice(index, 1);
      if (parent && list.length === 0) {
        delete parent.children;
        if (!parent.page && !parent.href && !parent.target) parent.page = siteDraft.pages[0].id;
      }
    });
  }

  function addNavItem() {
    siteMutate('nav', () => {
      siteDraft.nav.items.push({ label: ta('seed.link'), page: siteDraft.pages[0].id });
    });
  }

  /** A new item under a row, at any level the menu's depth allows. */
  function addNavChild(key) {
    siteMutate('nav', () => {
      const item = navNode(key);
      item.children ??= [];
      item.children.push({ label: ta('seed.link'), page: siteDraft.pages[0].id });
    });
  }

  /** The title typed for «new page as menu item», and the reason it was turned down, shown as the field's dark red and its tooltip until the next keystroke. */
  let navNewPageTitle = $state('');
  let navNewPageError = $state(null);

  async function addPageAsNavItem() {
    if (!navNewPageTitle.trim()) return;
    ed.newPageTitle = navNewPageTitle;
    ed.newPageTemplate = null;
    // The title stays in the field when the slug is rejected, so it can be corrected rather than typed again.
    navNewPageError = await addPage();
    if (!navNewPageError) navNewPageTitle = '';
  }

  const sideVariant = $derived(isSideNav(siteDraft?.nav));

  /** The submenu designs on offer: the column has no card, flat surface or flyout. */
  const subStyleOptions = $derived(sideVariant
    ? [['card', ta('common.standard')], ['pills', ta('opt.sub.pills')], ['lines', ta('opt.sub.lines')]]
    : [['card', ta('opt.sub.card')], ['flat', ta('opt.sub.flat')], ['pills', ta('opt.sub.pills')], ['lines', ta('opt.sub.lines')], ['flyout', ta('opt.sub.flyout')]]);

  // Drawn tiles for the submenu designs (ADR-0009: drawn SVG, never characters).
  const subSvg = (body) => `<svg width="48" height="34" viewBox="0 0 48 34" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${body}</svg>`;
  const SUB_STYLE_ICONS = {
    'card': subSvg('<path d="M14 1h20" stroke-opacity="0.5"/><rect x="10" y="6" width="28" height="24" rx="3" fill="currentColor" fill-opacity="0.18"/><path d="M15 13h18M15 19h14M15 25h16" stroke-opacity="0.8"/>'),
    'flat': subSvg('<path d="M14 1h20" stroke-opacity="0.5"/><rect x="1" y="6" width="46" height="24" fill="currentColor" fill-opacity="0.12" stroke="none"/><path d="M15 13h18M15 19h14M15 25h16" stroke-opacity="0.8"/>'),
    'pills': subSvg('<path d="M14 1h20" stroke-opacity="0.5"/><rect x="10" y="7" width="28" height="6" rx="3" fill="currentColor" fill-opacity="0.35" stroke="none"/><rect x="10" y="16" width="28" height="6" rx="3" fill="currentColor" fill-opacity="0.2" stroke="none"/><rect x="10" y="25" width="28" height="6" rx="3" fill="currentColor" fill-opacity="0.2" stroke="none"/>'),
    'lines': subSvg('<path d="M14 1h20" stroke-opacity="0.5"/><path d="M12 12h24M12 21h24M12 30h24" stroke-opacity="0.8"/>'),
    'flyout': subSvg('<path d="M14 1h20" stroke-opacity="0.5"/><rect x="1" y="6" width="46" height="24" fill="currentColor" fill-opacity="0.12" stroke="none"/><path d="M6 13h10M6 19h8M22 13h10M22 19h8M38 13h6M38 19h4" stroke-opacity="0.8"/>'),
  };

  /** The marks on a closed row: the button look, a description and a submenu. */
  const PILL_ICON = '<svg width="14" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="8" width="18" height="8" rx="4"/></svg>';
  const DESC_ICON = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h9"/></svg>';
  const CHEV_ICON = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  const GRIP_ICON = '<svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" aria-hidden="true"><circle cx="3" cy="3" r="1.3"/><circle cx="7" cy="3" r="1.3"/><circle cx="3" cy="8" r="1.3"/><circle cx="7" cy="8" r="1.3"/><circle cx="3" cy="13" r="1.3"/><circle cx="7" cy="13" r="1.3"/></svg>';
  const SUB_ICON = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
</script>

<!-- The slot where a dragged row lands, set in to the level it would stand at -->
{#snippet slot(level)}<div class="row-drag-slot" style:margin-left="{level * 1.3}rem" {@attach drag.slot} out:slotOut></div>{/snippet}

<!-- One row per item at every level: closed it is one line, open a card with every field -->
{#snippet navCard(node, key, level, index, count)}
  {@const open = navSel === key}
  <div class="nav-item" class:child={level === 1} class:grand={level === 2} class:great={level === 3} class:open
    data-key={key} data-drag-id={key} data-row-level={level}
    class:drop-target={drag.drop?.id === key && drag.drop.pos === 'into'}>
    <!-- The head is the handle: the fields sit in the body, so a drag never fights a text selection -->
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div class="nav-head" title={ta('tip.nav.dragItem')} {@attach drag.handle(key)}
      onclick={(e) => { e.stopPropagation(); navSel = open ? '' : key; }}
      onkeydown={(e) => { if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) { e.preventDefault(); moveNavAt(key, e.key === 'ArrowUp' ? -1 : 1); } }}>
      <span class="nav-grip">{@html GRIP_ICON}</span>
      <span class="nav-head-name">{node.label || ta('seed.link')}</span>
      <span class="nav-head-link">{linkText(linkOf(node), { pages: siteDraft.pages }) || (node.children?.length ? ta('opt.noLink') : '')}</span>
      {#if node.look === 'button'}<span class="nav-head-mark" title={ta('opt.navLook.button')}>{@html PILL_ICON}</span>{/if}
      {#if node.description}<span class="nav-head-mark" title={node.description}>{@html DESC_ICON}</span>{/if}
      {#if node.children?.length}<span class="nav-item-sub" title={ta('tip.nav.hasSubmenu')}>{@html SUB_ICON}</span>{/if}
      <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
      <span class="nav-head-tools" onclick={(e) => e.stopPropagation()}>
        <button class="ghost nav-act" title={ta('tip.moveUp')} aria-keyshortcuts="Alt+ArrowUp" disabled={index === 0} onclick={() => moveNavAt(key, -1)}>{@html ICONS.up}</button>
        <button class="ghost nav-act" title={ta('tip.moveDown')} aria-keyshortcuts="Alt+ArrowDown" disabled={index === count - 1} onclick={() => moveNavAt(key, 1)}>{@html ICONS.down}</button>
      </span>
      <button class="ghost nav-act nav-chev" aria-expanded={open} title={ta('tip.nav.openItem')} aria-label={ta('tip.nav.openItem')}>{@html CHEV_ICON}</button>
    </div>
    {#if open}
      <!-- The fold grows from nothing as the card opens and shrinks back as it closes (cardFold) -->
      <div class="nav-fold" transition:cardFold>
      <div class="nav-body">
        <span class="nav-body-label">{ta('lbl.name')}</span>
        <input class="field-filled" value={node.label} title={level === 0 ? ta('tip.nav.itemLabel') : ta('tip.nav.childLabel')}
          oninput={(e) => setNavLabel(key, e.target.value)} onblur={() => fillNavLabel(key)} />
        <span class="nav-body-label">{ta('lbl.link')}</span>
        <!-- An item with items under it may have no link and is then their opener -->
        <LinkField scope="site" value={linkOf(node)} title={ta('tip.linkTarget')} removable={Boolean(node.children?.length)}
          placeholder={node.children?.length ? ta('opt.noLink') : ''}
          onchange={(link) => setNavLink(key, link)} />
        <span class="nav-body-label">{ta('ph.nav.itemDescription')}</span>
        <input class="field-filled" value={node.description ?? ''} placeholder={ta('ph.nav.itemDescription')} title={ta('tip.nav.itemDescription')}
          oninput={(e) => setNavDescription(key, e.target.value)} />
        {#if level === 0}
          <div class="nav-body-wide">
            <Choice label={ta('lbl.navItemLook')} title={ta('tip.nav.itemButton')} value={node.look === 'button' ? 'button' : 'plain'}
              options={[['plain', ta('opt.navLook.plain')], ['button', ta('opt.navLook.button')]]}
              onchange={(v) => setNavLook(Number(key), v)} />
          </div>
        {/if}
        <div class="nav-body-actions">
          {#if level < NAV_DEPTH}
            <button class="ghost action" onclick={() => addNavChild(key)}>{level === 0 ? ta('ui.addMenuChild') : ta('ui.addMenuGrandchild')}</button>
          {/if}
          <span class="nav-body-spacer"></span>
          <IconButton icon={ICONS.cross} danger label={level === 0 ? ta('tip.nav.removeItem') : ta('tip.nav.removeChild')}
            onclick={() => { navSel = ''; removeNavAt(key); }} />
        </div>
      </div>
      </div>
    {/if}
  </div>
{/snippet}

<!-- The rows of one list and, under each, the rows of its submenu; one slot per place: before the first row, or after a row and its submenu, set in a level while the row takes the dragged row in -->
{#snippet navRows(items, above, level)}
  {#each items as node, index (node)}
    {@const key = above === null ? `${index}` : `${above}.${index}`}
    {#if index === 0 && drag.at(key, 'before')}{@render slot(level)}{/if}
    {@render navCard(node, key, level, index, items.length)}
    {#if node.children?.length}{@render navRows(node.children, key, level + 1)}{/if}
    {#if drag.at(key, 'after') || drag.at(key, 'into')}{@render slot(drag.drop?.pos === 'into' ? level + 1 : level)}{/if}
  {/each}
{/snippet}

<div class="nav-list" role="list" aria-label={ta('group.menuItems')} {@attach drag.list}>
  {@render navRows(siteDraft.nav.items, null, 0)}
</div>
<button class="ghost action" onclick={addNavItem}>{ta('ui.addMenuItem')}</button>
<!-- A new blank page that goes straight into the menu -->
<span class="toolbar-row" title={ta('tip.nav.newPageAsItem')}>
  <input class="tb-grow" placeholder={ta('ph.nav.newPageTitle')} bind:value={() => navNewPageTitle, (v) => { navNewPageTitle = v; navNewPageError = null; }}
    title={navNewPageError ?? undefined} aria-invalid={navNewPageError ? 'true' : undefined}
    onkeydown={(e) => { if (e.key === 'Enter') addPageAsNavItem(); }} />
  <button class="ghost action" disabled={!navNewPageTitle.trim()} onclick={addPageAsNavItem}>{ta('ui.newPageAsItem')}</button>
</span>
<!-- The submenus' look and behaviour, once an item has a submenu; in the side variant the submenus are accordions in the column, so the card frame, flat surface and flyout make no sense there -->
{#if siteDraft.nav.items?.some((item) => item.children?.length)}
  <SubHeading text={ta('group.submenu')} />
  <!-- The designs as small drawings of the submenu hanging under its item -->
  <Setting key="subStyle">
    <div class="ctl-field">
      <span class="mini-label">{ta('lbl.design')}</span>
      <div class="tile-grid" class:cols-5={!sideVariant} class:cols-3={sideVariant} role="group" aria-label={ta('lbl.design')}>
        {#each subStyleOptions as [v, text] (v)}
          <button type="button" class="tile" class:on={(siteDraft.nav.style?.subStyle ?? 'card') === v} aria-pressed={(siteDraft.nav.style?.subStyle ?? 'card') === v}
            onclick={() => setNavStyle('subStyle', v === 'card' ? undefined : v)}>{@html SUB_STYLE_ICONS[v]}<span>{text}</span></button>
        {/each}
      </div>
    </div>
  </Setting>
  {#if sideVariant}
    <!-- The column: accordions, or every submenu open from the start (then the arrow is a choice of its own, off by default) -->
    <Setting key="sideSubs">
      <Choice label={ta('lbl.sideSubs')} title={ta('tip.nav.sideSubs')} value={siteDraft.nav.style?.sideSubs ?? 'collapsed'}
        options={[['collapsed', ta('opt.mobileSubs.collapsed')], ['expanded', ta('opt.mobileSubs.expanded')]]}
        onchange={(v) => setNavStyle('sideSubs', v === 'collapsed' ? undefined : v)} />
    </Setting>
    {#if siteDraft.nav.style?.sideSubs === 'expanded'}
      <Setting key="sideSubArrow">
        <SwitchRow label={ta('lbl.sideSubArrow')} title={ta('tip.nav.sideSubArrow')} checked={siteDraft.nav.style?.sideSubArrow === true}
          onchange={(on) => setNavStyle('sideSubArrow', on ? true : undefined)} />
      </Setting>
    {/if}
  {/if}
  {#if !sideVariant || siteDraft.nav.style?.sideSubs !== 'expanded'}
    <Setting key="subOpen">
      <Choice label={ta('lbl.subOpen')} title={ta('tip.nav.subOpen')} value={siteDraft.nav.style?.subOpen ?? 'hover'}
        options={[['hover', ta('opt.subOpen.hover')], ['stay', ta('opt.subOpen.stay')], ['click', ta('opt.subOpen.click')]]}
        onchange={(v) => setNavStyle('subOpen', v === 'hover' ? undefined : v)} />
    </Setting>
  {/if}
  {#if siteDraft.nav.style?.subStyle === 'pills'}
    <Setting key="subPillColor">
      <ColourRow label={ta('lbl.subPillColor')} title={ta('tip.nav.subPillColor')} value={siteDraft.nav.style?.subPillColor ?? 'surface'} tokens={themeSwatches()}
        onchange={(hex) => setNavStyle('subPillColor', hex)} />
    </Setting>
  {/if}
  <Setting key="subColumns">
    <Choice label={ta('lbl.columns')} title={ta('tip.nav.subColumns')} value={String(siteDraft.nav.style?.subColumns ?? 1)}
      options={[['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']]}
      onchange={(v) => setNavStyle('subColumns', Number(v) > 1 ? Number(v) : undefined)} />
  </Setting>
{/if}
