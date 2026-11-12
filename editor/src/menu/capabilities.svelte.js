/**
 * The capabilities added to a block this session (ADR-0031): a card added from the add list stands on its block until the admin is loaded again, even before it holds a value; one in use stands anyway (menu/capabilities.js).
 * `fresh` names the card just added, which glows once and takes the focus (lib/rows/Capability.svelte).
 * The cards the owner added from the add list are also kept in the order added, so they stand at the foot of their area in that order (addedAt).
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
