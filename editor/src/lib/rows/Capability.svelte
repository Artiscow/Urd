<script>
  /* A capability's card in the element menu (ADR-0031, menu/capabilities.js): drawn while the block uses the capability, while it was added to the block this session, or where the menu draws every capability (menu/CapScope.svelte); otherwise it takes no room, and the add list offers it.
     Its head names it, with the way back, which takes every setting in it to the standard in one undo step and the capability back to the add list; its settings stand under the head as a group's rows, reading the group's standards where they ask by key (`group`).
     A capability that is one switch (`single` in the catalogue) is a card of one line: its drawing, its name, an On/Off chip for the switch, its pin where Pinned can hold it, and the way back.
     The card carries its id as a fold does, so a tool of the block's bar opens it in a small panel (lib/only-group.js). */
  import { getContext, setContext, tick, untrack } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS, CAP_ICONS } from '../icons.js';
  import { rowMotion } from '../motion.svelte.js';
  import { historyState } from '../../state/history.svelte.js';
  import { pinnedNow } from '../../menu/pinned.js';
  import Pin from '../../menu/Pin.svelte';
  import { capability, carries } from '../../menu/capabilities.js';
  import { isAdded, keepCapability, dropCapability, isFresh, capabilities } from '../../menu/capabilities.svelte.js';
  const ed = getContext('urd-editor');
  const scope = getContext('menu-capabilities');
  const area = getContext('menu-area');
  const pinned = pinnedNow();
  /** `id` names the capability in the catalogue; `group` holds the standards of the settings in it that ask by key (menu/groups.js). */
  let { id, group = null, children = undefined } = $props();
  const cap = capability(id);
  const block = $derived(ed.selectedBlock);
  const inUse = $derived(Boolean(block) && cap.inUse(block, ed));
  const kept = $derived(Boolean(block) && isAdded(block.blockId, id));
  const shown = $derived(carries(cap, block, ed) && !(cap.pins.length > 0 && pinned.all(...cap.pins)) && (inUse || kept || Boolean(scope?.forced(id))));
  /** The way back stands where the block uses the capability or took it; a copy that draws every capability does not offer it for one the block has not taken. */
  const takeable = $derived(inUse || kept);
  const removable = $derived(!cap.removable || cap.removable(block, ed));
  const title = $derived(ta(`cap.${id}`));
  /** A one-switch capability's switch, as its chip shows it. */
  const switchedOn = $derived(Boolean(cap.single && block && cap.single.value(block, ed)));
  setContext('menu-group', {
    own: (key) => Boolean(group?.own(key)),
    resetKey: (key) => group?.resetKey(key),
  });
  // A capability in use stays on its block for the session, so a way back on its last row does not take the card away with the focus in it.
  $effect(() => {
    if (inUse && block) untrack(() => keepCapability(block.blockId, id));
  });
  $effect(() => {
    if (!shown) return;
    area?.register(`cap:${id}`);
    return () => area?.unregister(`cap:${id}`);
  });
  let cardEl = $state(null);
  const fresh = $derived(Boolean(block) && isFresh(block.blockId, id));
  // The card just added glows once, and its first control takes the focus.
  $effect(() => {
    if (!cardEl || !fresh) return;
    const blockId = block.blockId;
    tick().then(() => {
      cardEl?.scrollIntoView({ block: 'nearest' });
      (cardEl?.querySelector('.cap-body :is(input, button, select, textarea, [tabindex="0"])') ?? cardEl?.querySelector('.cap-chip'))?.focus();
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

{#if shown}
  <div class="cap-card" class:fresh class:cap-single={Boolean(cap.single)} role="group" data-fold={id} data-cap={id} aria-label={title} bind:this={cardEl} transition:rowMotion>
    <header class="cap-head">
      <span class="cap-icon" aria-hidden="true">{@html CAP_ICONS[cap.icon] ?? ''}</span>
      <span class="cap-title">{title}</span>
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
    {#if children && !cap.single}<div class="group-items cap-body">{@render children()}</div>{/if}
  </div>
{/if}
