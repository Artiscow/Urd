/**
 * Which settings stand in the element menu's Pinned rows now, as the rows inside an area read it (PinScope.svelte, 0.7.30.3).
 * A setting row leaves its area while it is pinned (lib/rows/Setting.svelte), and a family leaves out a fold whose every setting is pinned, so no fold stands empty.
 * Call it while a component starts: it reads the scope's context.
 */
import { getContext } from 'svelte';

export function pinnedNow() {
  const away = getContext('menu-pinned');
  /** Whether the setting with this pin id stands in Pinned now; outside a scope, as in the search's copy, none does. */
  const has = (id) => Boolean(id) && Boolean(away?.().has(id));
  return {
    has,
    /** Whether every one of these settings stands in Pinned now. */
    all: (...ids) => ids.every(has),
  };
}
