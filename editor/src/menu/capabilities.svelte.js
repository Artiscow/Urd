/**
 * The capabilities added to each block this session (ADR-0031), kept in the order added.
 * `fresh` names the card just added, which glows once and takes the focus.
 */
import { SvelteSet } from 'svelte/reactivity';

const added = new SvelteSet();
const key = (blockId, id) => `${blockId}:${id}`;

export const capabilities = $state({ fresh: null });
/** The capabilities the owner added from the add list this session, in the order added. */
const placed = $state([]);

/** Whether a capability was added to this block this session. */
export const isAdded = (blockId, id) => added.has(key(blockId, id));

/** Keeps a capability on its block for the session; `fresh` marks it as the one just added. */
export function keepCapability(blockId, id, { fresh = false } = {}) {
  if (!added.has(key(blockId, id))) added.add(key(blockId, id));
  if (fresh) {
    capabilities.fresh = key(blockId, id);
    if (!placed.includes(key(blockId, id))) placed.push(key(blockId, id));
  }
}

/** Takes a capability off its block's session list, so it stands in the add list again. */
export function dropCapability(blockId, id) {
  added.delete(key(blockId, id));
  const at = placed.indexOf(key(blockId, id));
  if (at >= 0) placed.splice(at, 1);
  if (capabilities.fresh === key(blockId, id)) capabilities.fresh = null;
}

/** Whether this card is the one just added. */
export const isFresh = (blockId, id) => capabilities.fresh === key(blockId, id);

/** Where among the capabilities the owner added to this block from the add list this one stands, or -1 for one not added so. */
export function addedAt(blockId, id) {
  return placed.filter((k) => k.startsWith(`${blockId}:`)).indexOf(key(blockId, id));
}
