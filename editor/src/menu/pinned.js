/**
 * Which settings stand in the element menu's Pinned rows now, read inside an area (PinScope.svelte).
 * Call it as a component starts: it reads the scope's context.
 */
import { getContext } from 'svelte';

export function pinnedNow() {
  const away = getContext('menu-pinned');
  const pinsShown = getContext('menu-pins-shown');
  /** Whether the setting with this pin id stands in Pinned now; outside a scope, as in the search's copy, none does. */
  const has = (id) => Boolean(id) && Boolean(away?.().has(id));
  return {
    has,
    /** Whether every one of these settings stands in Pinned now. */
    all: (...ids) => ids.every(has),
    /** Whether the pins stand beside the settings: not where the menu draws no Pinned rows. */
    pins: () => (pinsShown ? pinsShown() : true),
    /** How many of these settings stand in their area now, not in Pinned: a fold's count of rows (lib/rows/Fold.svelte). */
    left: (...ids) => ids.filter((id) => !has(id)).length,
  };
}
