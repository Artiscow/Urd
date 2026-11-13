<script>
  /* The Phone panel (0.7.3.13): what is set for the phone in the section at work, gathered in one place; each setting stands in the section's or the block's menu too.
     The section is the one at work on the canvas; where none is, as the panel opens or another page loads, the topmost one mostly in view, else the first. Another is picked at the top, which brings it into view.
     Under the section's own rows (PhoneSectionRows) stand its blocks in the order they read on the phone: a block alone, or a stack of blocks that read as one, the owner's own or a column the rule reads whole (phone-moves.js phoneTree).
     The rows move by the row kit's drag in its tree form, one level deep (lib/nav-drop.js): before or after a row, into a stack, or onto a block alone, which makes a stack of the two; a stack's block leads out of it from the room left of it, and the room under the last row lands a row last. Alt and the arrow keys move the row the focus is in, as the drag would. A row under the pointer lights its blocks on the canvas, and a press selects its block there.
     A block placed by its own exception carries a chip that gives it back to the section's order, and the owner's stack one that takes it apart.
     Under the order stand the blocks pinned to rows of their own, each with its way back into the order, and the blocks hidden on phones, each with its way back. */
  import { getContext, onMount, tick, untrack } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { blockWords, sectionWords } from '$engine/anchor-model.js';
  import { phoneSetupOf, stackOrder } from '$engine/phone-order.js';
  import { phoneTree, phoneLand, hasPhonePlace, flowing } from '$engine/phone-moves.js';
  import { phoneCells } from '$engine/migrate.js';
  import { navDropAt, navDropOrNull, canonicalDrop } from '../lib/nav-drop.js';
  import { RowDrag, slotOut } from '../lib/rows/row-drag.svelte.js';
  import { phoneMark } from '../lib/phone-marks.js';
  import { ICONS, CAP_ICONS } from '../lib/icons.js';
  import PhoneSectionRows from '../section/PhoneSectionRows.svelte';
  import SelectRow from '../lib/rows/SelectRow.svelte';
  import SubHeading from '../lib/rows/SubHeading.svelte';
  import IconButton from '../lib/rows/IconButton.svelte';
  import EmptyState from '../lib/rows/EmptyState.svelte';
  const ed = getContext('urd-editor');

  /** The levels the list holds: a stack's blocks, never a stack inside a stack. */
  const DEPTH = 1;

  /** The open page's sections, read again after every change, every undo and every page loaded, since the page's data is no state of its own. */
  const sections = $derived.by(() => {
    void ed.pageId;
    void ed.edits;
    void ed.restores;
    return ed.sections.slice();
  });
  /** The section at work, a new copy each time, so what is reckoned from it follows. */
  const section = $derived.by(() => {
    const found = sections.find((s) => s.id === ed.activeSectionId);
    return found ? { ...found, blocks: found.blocks.slice() } : null;
  });
  const setup = $derived(section ? phoneSetupOf(section) : null);
  const tree = $derived(section ? phoneTree(section.blocks, setup) : []);
  /** Each block's place on the phone, the number it wears on the canvas. */
  const numbers = $derived(new Map(section ? stackOrder(section.blocks, setup).map((b, i) => [b.id, i + 1]) : []));
  const byId = $derived(new Map((section?.blocks ?? []).map((b) => [b.id, b])));
  /** The list's rows: each node of the tree, and under a stack its blocks, keyed by their path. */
  const rows = $derived(tree.flatMap((node, i) => (node.children
    ? [{ key: `${i}`, level: 0, node, ids: node.children.map((c) => c.id) },
      ...node.children.map((c, j) => ({ key: `${i}.${j}`, level: 1, id: c.id, ids: [c.id], kind: node.kind, first: j === 0, last: j === node.children.length - 1 }))]
    : [{ key: `${i}`, level: 0, id: node.id, ids: [node.id] }])));
  const pinned = $derived((section?.blocks ?? []).filter((b) => !b.hideMobile && !flowing(b)));
  const hidden = $derived((section?.blocks ?? []).filter((b) => b.hideMobile));
  const sectionOptions = $derived(sections.map((s, i) => {
    const words = sectionWords(s);
    return [s.id, words ? `${ta('diff.section', { n: i + 1 })}: ${words}` : ta('diff.section', { n: i + 1 })];
  }));

  /** A block's name: its kind and its first words. */
  function nameOf(block) {
    const words = blockWords(block);
    return words ? `${ed.blockLabel(block.type)}: ${words}` : ed.blockLabel(block.type);
  }
  /** A block's width on the phone where it stands in cells (migrate.js phoneCells), as «Width on the phone» names it, else null. */
  function cellsMark(block) {
    const cells = phoneCells(block?.frames?.mobile);
    if (!cells) return null;
    return [2, 4, 6].includes(cells.cols) ? ta(`opt.phoneWidth.${cells.cols}`) : `${cells.cols}/8`;
  }
  /** A stack's name: its first block with words, else its first block's kind. */
  function stackName(ids) {
    const blocks = ids.map((id) => byId.get(id)).filter(Boolean);
    const worded = blocks.find((b) => blockWords(b));
    return worded ? blockWords(worded) : ed.blockLabel(blocks[0]?.type ?? '');
  }

  /** The section at work, and the canvas showing it: a pick here makes it the canvas's chosen section and brings it into view. */
  function pickSection(id, reveal = true) {
    ed.onSelectSection({ sectionId: id });
    ed.bridge?.sendActiveSection(id);
    if (reveal) ed.bridge?.sendScrollSection(id);
  }

  /** The topmost section on the canvas showing at least half of itself, or half the canvas where it is taller. */
  function sectionInView() {
    try {
      const win = ed.iframeEl?.contentWindow;
      const hosts = [...(win?.document.querySelectorAll('.urd-section[data-section-id]') ?? [])];
      const high = win.innerHeight;
      const host = hosts.find((h) => {
        const r = h.getBoundingClientRect();
        return Math.min(r.bottom, high) - Math.max(r.top, 0) >= Math.min(r.height, high) / 2;
      });
      return host?.dataset.sectionId ?? null;
    } catch {
      return null;
    }
  }

  // A section stands in the panel whenever the page has one: where none is at work, as the panel opens or another page loads, the one in view on this page, else the first.
  $effect(() => {
    if (section || !sections.length) return;
    const ids = sections.map((s) => s.id);
    untrack(() => {
      const seen = sectionInView();
      pickSection(ids.includes(seen) ? seen : ids[0], false);
    });
  });

  // The panel shows the phone.
  onMount(() => {
    if (ed.viewMode !== 'mobile') ed.deviceId = 'mobile';
    return () => ed.bridge?.sendLight([]);
  });

  /** While a whole stack moves, its first block: the landed row is the stack's own. */
  let stackHead = null;

  /** A change from the list written into the section, as one undo step, and the key the moved row stands at after it. */
  function write(change, movedId) {
    if (!change || !section) return undefined;
    ed.changeSectionPhone(section.id, change, 'phone-order');
    const stored = ed.sections.find((s) => s.id === section.id);
    const next = stored ? phoneTree(stored.blocks, phoneSetupOf(stored)) : [];
    for (let i = 0; i < next.length; i += 1) {
      const node = next[i];
      if (!node.children) {
        if (node.id === movedId) return `${i}`;
        continue;
      }
      const j = node.children.findIndex((c) => c.id === movedId);
      if (j >= 0) return movedId === stackHead ? `${i}` : `${i}.${j}`;
    }
    return undefined;
  }

  /** The landing place of a dragged row, reckoned on the rows as seen, as the Nav panel's tree reckons it: over a row its thirds decide, and the room left of a stack's block is the way out of the stack, its grip column being where a drag usually starts; between rows or below the last the nearest row by its midpoint; each place has one name. */
  function reckon(list, e, dragKey) {
    const hit = list.find((r) => e.clientY >= r.rect.top && e.clientY <= r.rect.bottom);
    let drop = null;
    if (hit) {
      drop = navDropAt(tree, dragKey, hit.id, e.clientX - hit.rect.left, (e.clientY - hit.rect.top) / hit.rect.height, DEPTH, 0);
    } else {
      const next = list.find((r) => r.rect.top + r.rect.height / 2 > e.clientY);
      const lastTop = [...list].reverse().find((r) => !r.id.includes('.'));
      if (next) drop = next.id === dragKey ? null : navDropOrNull(tree, dragKey, { key: next.id, pos: 'before' }, DEPTH);
      else if (lastTop) drop = lastTop.id === dragKey ? null : navDropOrNull(tree, dragKey, { key: lastTop.id, pos: 'after' }, DEPTH);
    }
    drop = canonicalDrop(tree, drop);
    return drop ? { id: drop.key, pos: drop.pos } : null;
  }

  /** A row landed: the move settled into the section's data (phone-moves.js phoneLand). */
  function land(from, at) {
    const row = rows.find((r) => r.key === from);
    if (!row || !section) return undefined;
    stackHead = row.node ? row.ids[0] : null;
    const key = write(phoneLand(section.blocks, setup, from, { key: at.id, pos: at.pos }), row.ids[0]);
    stackHead = null;
    return key;
  }

  /** A dragged row's card: its name and its place, or a stack's name and its count. */
  function card(key) {
    const row = rows.find((r) => r.key === key);
    if (!row) return null;
    if (row.node) return { name: stackName(row.ids), detail: ta('phone.blocks', { n: row.ids.length }), icon: ICONS.stack };
    const block = byId.get(row.id);
    return block ? { name: nameOf(block), detail: String(numbers.get(row.id) ?? '') } : null;
  }

  const drag = new RowDrag(land, card, { reckon });

  /** Alt and an arrow: the row moves one place among its neighbours, as the drag would land it, and keeps the focus; a stack's first or last block steps out of it. Enter selects the row's block on the canvas, as a press does. */
  async function moveKeys(e, row) {
    if (e.key === 'Enter' && e.target === e.currentTarget) {
      ed.bridge?.sendSelect(row.ids[0], true);
      return;
    }
    if (!e.altKey || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
    e.preventDefault();
    const dir = e.key === 'ArrowUp' ? -1 : 1;
    const pos = dir < 0 ? 'before' : 'after';
    const [i, j] = row.key.split('.').map(Number);
    let drop = null;
    if (j === undefined) {
      if (tree[i + dir]) drop = { key: `${i + dir}`, pos };
    } else {
      drop = tree[i].children[j + dir] ? { key: `${i}.${j + dir}`, pos } : { key: `${i}`, pos };
    }
    if (!drop || !section) return;
    stackHead = row.node ? row.ids[0] : null;
    const key = write(phoneLand(section.blocks, setup, row.key, drop), row.ids[0]);
    stackHead = null;
    if (!key) return;
    await tick();
    document.querySelector(`.pp-list > [data-drag-id="${CSS.escape(key)}"]`)?.focus();
    drag.landed(key);
  }

  /** A block's own place taken away: it reads where the section's order puts it. */
  function backToRule(id) {
    if (section) ed.changeSectionPhone(section.id, { places: { [id]: null } }, 'phone-order');
  }

  /** The owner's stack taken apart: its blocks read where the section's order puts them, its first block keeping its place. */
  function takeApart(ids) {
    if (section) ed.changeSectionPhone(section.id, { places: {}, stacks: setup.stacks.filter((stack) => !ids.every((id) => stack.includes(id))) }, 'phone-order');
  }

  /** A press on a row selects its block on the canvas, or a stack's first block. */
  function pick(e, row) {
    if (e.target instanceof Element && e.target.closest('button')) return;
    ed.bridge?.sendSelect(row.ids[0], true);
  }

  /** The blocks a row stands for lit on the canvas while the mouse is on it. */
  function light(e, row) {
    if (e.pointerType === 'mouse') ed.bridge?.sendLight(row.ids);
  }

  const GRIP = '<svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" aria-hidden="true"><circle cx="3" cy="3" r="1.3"/><circle cx="7" cy="3" r="1.3"/><circle cx="3" cy="8" r="1.3"/><circle cx="7" cy="8" r="1.3"/><circle cx="3" cy="13" r="1.3"/><circle cx="7" cy="13" r="1.3"/></svg>';
</script>

<!-- The slot where a dragged row lands, set in to the level it would stand at -->
{#snippet slot(level)}<div class="row-drag-slot" style:margin-left="{level * 1.3}rem" {@attach drag.slot} out:slotOut></div>{/snippet}

<!-- A block's small picture: a mark of its kind -->
{#snippet mark(block)}<span class="pp-mark" aria-hidden="true"><i class="po-{phoneMark(block)}"></i></span>{/snippet}

{#snippet row(r)}
  {@const block = r.id ? byId.get(r.id) : null}
  <!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions, a11y_click_events_have_key_events -->
  <div class="pp-row" class:pp-stack-head={Boolean(r.node)} class:pp-member={r.level === 1} class:pp-member-last={r.last}
    role="listitem" tabindex="0" data-drag-id={r.key} data-row-level={r.level} aria-keyshortcuts="Alt+ArrowUp Alt+ArrowDown"
    class:drop-target={drag.drop?.id === r.key && drag.drop.pos === 'into'}
    {@attach drag.handle(r.key)} onkeydown={(e) => moveKeys(e, r)} onclick={(e) => pick(e, r)} onpointerenter={(e) => light(e, r)}>
    <span class="pp-grip" aria-hidden="true">{@html GRIP}</span>
    {#if r.node}
      <span class="pp-mark pp-stack-icon" title={r.node.kind === 'column' ? ta('tip.phone.column') : undefined}>{@html ICONS.stack}</span>
      <span class="pp-name">{stackName(r.ids)}<span class="sr-only">, {ta('phone.blocks', { n: r.ids.length })}</span></span>
      {#if cellsMark(byId.get(r.ids[0]))}<span class="pp-cells" title={ta('lbl.phoneWidth')}>{cellsMark(byId.get(r.ids[0]))}</span>{/if}
      {#if !setup.list && hasPhonePlace(byId.get(r.ids[0]), section.blocks, setup)}
        <button type="button" class="pp-chip pp-chip-own" title={ta('tip.phone.placed')} onclick={() => backToRule(r.ids[0])}>{ta('phone.placed')}{@html ICONS.reset}</button>
      {/if}
      {#if r.node.kind === 'stack'}
        <button type="button" class="pp-chip" title={ta('tip.phone.stack')} onclick={() => takeApart(r.ids)}>{ta('phone.stack')}{@html ICONS.reset}</button>
      {/if}
    {:else if block}
      {@render mark(block)}
      <span class="pp-num">{numbers.get(r.id)}</span>
      <span class="pp-name">{nameOf(block)}</span>
      {#if r.level === 0 && cellsMark(block)}<span class="pp-cells" title={ta('lbl.phoneWidth')}>{cellsMark(block)}</span>{/if}
      {#if block.hideDesktop}<span class="pp-flag" role="img" title={ta('cap.phoneOnly')} aria-label={ta('cap.phoneOnly')}>{@html CAP_ICONS.phoneOnly}</span>{/if}
      <!-- A block alone, or a block of a column the rule reads whole, can hold a place of its own; a block of the owner's stack reads where its stack does -->
      {#if (r.level === 0 || r.kind === 'column') && !setup.list && hasPhonePlace(block, section.blocks, setup)}
        <button type="button" class="pp-chip pp-chip-own" title={ta('tip.phone.placed')} onclick={() => backToRule(r.id)}>{ta('phone.placed')}{@html ICONS.reset}</button>
      {/if}
    {/if}
  </div>
{/snippet}

<div class="panel-body">
  {#if !sections.length}
    <EmptyState text={ta('phone.noSection')} />
  {:else if section}
    {#if sections.length > 1}
      <SelectRow label={ta('lbl.section')} value={section.id} options={sectionOptions} onchange={(id) => pickSection(id)} />
    {/if}
    <PhoneSectionRows />

    {#if rows.length}
      <SubHeading text={ta('lbl.phoneBlocks')} />
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="pp-list pp-order" role="list" aria-label={ta('lbl.phoneBlocks')} {@attach drag.list} onpointerleave={() => ed.bridge?.sendLight([])}>
        {#each rows as r, n (r.node ? r.node.id : r.id)}
          {#if (r.level === 0 && n === 0 || r.first) && drag.at(r.key, 'before')}{@render slot(r.level)}{/if}
          {@render row(r)}
          {#if r.level === 1 ? drag.at(r.key, 'after') : !r.node && (drag.at(r.key, 'after') || drag.at(r.key, 'into'))}{@render slot(drag.drop?.pos === 'into' ? r.level + 1 : r.level)}{/if}
          {#if r.last && (drag.at(r.key.split('.')[0], 'after') || drag.at(r.key.split('.')[0], 'into'))}{@render slot(drag.drop?.pos === 'into' ? 1 : 0)}{/if}
        {/each}
      </div>
    {:else}
      <EmptyState text={ta('phone.noBlocks')} />
    {/if}

    {#if pinned.length}
      <SubHeading text={ta('lbl.phonePinned')} />
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="pp-list" role="list" aria-label={ta('lbl.phonePinned')} onpointerleave={() => ed.bridge?.sendLight([])}>
        {#each pinned as block (block.id)}
          <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
          <div class="pp-row pp-still" role="listitem" onclick={(e) => pick(e, { ids: [block.id] })} onpointerenter={(e) => light(e, { ids: [block.id] })}>
            {@render mark(block)}
            <span class="pp-num">{numbers.get(block.id)}</span>
            <span class="pp-name">{nameOf(block)}</span>
            <IconButton size="sm" quiet icon={ICONS.reset} label={ta('menu.resetPhone')} onclick={() => ed.handleMobileReset({ sectionId: section.id, blockId: block.id })} />
          </div>
        {/each}
      </div>
    {/if}

    {#if hidden.length}
      <SubHeading text={ta('lbl.phoneHidden')} />
      <div class="pp-list" role="list" aria-label={ta('lbl.phoneHidden')}>
        {#each hidden as block (block.id)}
          <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
          <div class="pp-row pp-still" role="listitem" onclick={(e) => pick(e, { ids: [block.id] })}>
            {@render mark(block)}
            <span class="pp-name">{nameOf(block)}</span>
            <IconButton size="sm" quiet icon={ICONS.eye} label={ta('tip.phone.show')} onclick={() => ed.handleBlockFlag({ sectionId: section.id, blockId: block.id, hideMobile: false })} />
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</div>
