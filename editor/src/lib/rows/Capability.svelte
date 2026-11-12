<script>
  /* A capability's card in the element menu (ADR-0031, menu/capabilities.js): drawn while the block uses the capability, while it was added to the block this session, or where the menu draws every capability (menu/CapScope.svelte); otherwise it takes no room, and the add list offers it.
     Its head names it, with the way back, which takes every setting in it to the standard in one undo step and the capability back to the add list; its settings stand under the head as a group's rows, reading the group's standards where they ask by key (`group`).
     A capability that is one switch (`single` in the catalogue) is a card of one line: its drawing, its name, an On/Off chip for the switch, its pin where Pinned can hold it, and the way back.
     The card carries its id as a fold does, so a tool of the block's bar opens it in a small panel (lib/only-group.js).
     Where Urd settings «Extra settings style» asks for folded cards, its name is a button that folds it to one line saying its value (the catalogue's `summary`, else that it is on) and opens it again, kept for the session; a copy that draws every capability (the search, a small panel) never folds, so its settings are always there. */
  import { getContext, setContext, tick, untrack } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS, CAP_ICONS } from '../icons.js';
  import { rowMotion } from '../motion.svelte.js';
  import { historyState } from '../../state/history.svelte.js';
  import { pinnedNow } from '../../menu/pinned.js';
  import Pin from '../../menu/Pin.svelte';
  import { capability, carries } from '../../menu/capabilities.js';
  import { isAdded, keepCapability, dropCapability, isFresh, capabilities, addedAt } from '../../menu/capabilities.svelte.js';
  import { menu } from '../../menu/state.svelte.js';
  import { folds } from '../folds.svelte.js';
  import { followOpen } from '../follow-open.js';
  const ed = getContext('urd-editor');
  const scope = getContext('menu-capabilities');
  const area = getContext('menu-area');
  const pinned = pinnedNow();
  /** `id` names the capability in the catalogue; `group` holds the standards of the settings in it that ask by key (menu/groups.js); `atFoot` marks the card its area draws at its foot. */
  let { id, group = null, atFoot = false, children = undefined } = $props();
  const cap = capability(id);
  const block = $derived(ed.selectedBlock);
  const inUse = $derived(Boolean(block) && cap.inUse(block, ed));
  const kept = $derived(Boolean(block) && isAdded(block.blockId, id));
  const shown = $derived(carries(cap, block, ed) && !(cap.pins.length > 0 && pinned.all(...cap.pins)) && (inUse || kept || Boolean(scope?.forced(id))));
  /** A card the owner added from the add list is drawn at the foot of its area, in the order added (MenuArea.svelte), and draws nothing where the family writes it; a copy that draws every capability keeps the catalogue's order, and a card not shown stands nowhere. */
  const placedAt = $derived(block && !scope?.forced(id) ? addedAt(block.blockId, id) : -1);
  /** A small window of one group (ElementMenu.svelte `only`) draws the card where it stands. */
  const onlyPanel = getContext('menu-only');
  const toFoot = $derived(!atFoot && placedAt >= 0 && shown && Boolean(area?.place) && !onlyPanel?.only);
  $effect(() => {
    if (!toFoot) return;
    area.place(id, { get at() { return placedAt; }, get group() { return group; }, get children() { return children; } });
    return () => area.unplace(id);
  });
  /** The way back stands where the block uses the capability or took it; a copy that draws every capability does not offer it for one the block has not taken. */
  const takeable = $derived(inUse || kept);
  const removable = $derived(!cap.removable || cap.removable(block, ed));
  const title = $derived(ta(`cap.${id}`));
  /** A one-switch capability's switch, as its chip shows it. */
  const switchedOn = $derived(Boolean(cap.single && block && cap.single.value(block, ed)));
  /** Whether the card folds: folded cards chosen, a card with settings under its head, in a copy of the menu that does not draw every capability. */
  const folding = $derived(menu.capAddPref === 'folded' && !cap.single && Boolean(children) && !scope?.forced(id));
  /** A card stands open until the owner folds it; the fold is kept by the capability for the session. */
  const folded = $derived(folding && folds.isOpen('cap-folded', id));
  const summary = $derived(block ? (cap.summary?.(block, ed) || (inUse ? ta('common.on') : ta('menu.standard'))) : '');
  setContext('menu-group', {
    own: (key) => Boolean(group?.own(key)),
    resetKey: (key) => group?.resetKey(key),
  });
  // A capability in use stays on its block for the session, so a way back on its last row does not take the card away with the focus in it.
  $effect(() => {
    if (inUse && block) untrack(() => keepCapability(block.blockId, id));
  });
  $effect(() => {
    if (!shown || toFoot) return;
    area?.register(`cap:${id}`);
    return () => area?.unregister(`cap:${id}`);
  });
  let cardEl = $state(null);
  /** The block the card was just added to, or null: a string, so an edit of the block does not count as a new add. */
  const freshOn = $derived(block && isFresh(block.blockId, id) ? block.blockId : null);
  const fresh = $derived(freshOn !== null);
  // The card just added glows once, comes into view and is followed as it grows (lib/follow-open.js), and its first control takes the focus, once for each add.
  $effect(() => {
    if (!cardEl || !freshOn) return;
    const blockId = freshOn;
    tick().then(() => {
      cardEl?.scrollIntoView({ block: 'nearest' });
      (cardEl?.querySelector('.cap-body :is(input, button, select, textarea, [tabindex="0"])') ?? cardEl?.querySelector('.cap-chip'))?.focus({ preventScroll: true });
      followOpen(cardEl);
    });
    const timer = setTimeout(() => {
      if (isFresh(blockId, id)) capabilities.fresh = null;
    }, 1400);
    return () => clearTimeout(timer);
  });

  /* A small window that holds this card alone has its head where the card's is (menu/FloatingMenu.svelte): the way back stands there while the block uses the capability. */
  const head = getContext('menu-head');
  const headOwner = Symbol('capability');
  $effect(() => {
    if (head?.only !== `fold:${id}`) return;
    const taken = block;
    head.offer(headOwner, inUse && removable ? () => cap.clear(ed, taken) : null);
    return () => head.withdraw(headOwner);
  });

  /** The way back: every setting in the capability at its standard, one undo step, and the focus on the way to add it again. */
  async function takeAway() {
    if (!removable) return;
    const taken = block;
    // Where it is added from, in the copy of the menu the card stands in (the floating menu or the Settings panel), in the form «Extra settings style» chooses: its own chip, else its area's add button, else the head's «+».
    const home = cardEl?.closest('.block-menu, aside.panel') ?? document;
    const area = cardEl?.closest('.emenu-area')?.dataset.area;
    historyState.asOwnStep(() => cap.clear(ed, taken));
    dropCapability(taken.blockId, id);
    await tick();
    const back = home.querySelector(`[data-cap-add="${id}"]`)
      ?? (area ? home.querySelector(`.emenu-area[data-area="${area}"] .cap-add-btn`) : null)
      ?? home.querySelector('.cap-add-head');
    back?.focus();
  }
</script>

{#if shown && !toFoot}
  <div class="cap-card" class:fresh class:cap-single={Boolean(cap.single)} role="group" data-fold={id} data-cap={id} aria-label={title} bind:this={cardEl} transition:rowMotion>
    <header class="cap-head">
      {#if folding}
        <!-- The name folds the card to its line and opens it again, saying its value while folded -->
        <button type="button" class="cap-fold" aria-expanded={!folded} onclick={() => folds.set('cap-folded', id, !folded)}>
          <span class="cap-icon" aria-hidden="true">{@html CAP_ICONS[cap.icon] ?? ''}</span>
          <span class="cap-title">{title}</span>
          {#if folded}<span class="cap-value">{summary}</span>{/if}
          <span class="cap-caret" aria-hidden="true">{@html ICONS.caret}</span>
        </button>
      {:else}
        <span class="cap-icon" aria-hidden="true">{@html CAP_ICONS[cap.icon] ?? ''}</span>
        <span class="cap-title">{title}</span>
      {/if}
      {#if cap.single}
        <button type="button" class="cap-chip" role="switch" aria-checked={switchedOn} aria-label={title} title={ta(`cap.about.${id}`)}
          onclick={() => cap.single.set(ed, !switchedOn)}>{switchedOn ? ta('common.on') : ta('common.off')}</button>
        {#if cap.pins.length && pinned.pins()}<Pin id={cap.pins[0]} />{/if}
      {/if}
      {#if takeable}
        <!-- Greyed, not disabled, so its words still tell why it cannot take the name away -->
        <button type="button" class="icon-btn sm ghost danger cap-remove" aria-disabled={removable ? undefined : 'true'}
          title={removable ? ta('cap.remove', { name: title }) : ta('cap.linked')} aria-label={removable ? ta('cap.remove', { name: title }) : ta('cap.linked')}
          onclick={takeAway}>{@html ICONS.bin}</button>
      {/if}
    </header>
    {#if children && !cap.single && !folded}<div class="group-items cap-body" transition:rowMotion>{@render children()}</div>{/if}
  </div>
{/if}
