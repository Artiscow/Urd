/**
 * The words of headers-words.js translated for the admin: a descriptor, a list of sources, a change and a kept addition.
 */
import { ta, adminLang } from '$engine/i18n.js';

/**
 * A descriptor's words: a dictionary key with its values, themselves descriptors or plain, or a text as written.
 * @param {{key?: string, vars?: object, text?: string}|null|undefined} words
 * @returns {string}
 */
export function say(words) {
  if (!words) return '';
  if (words.text !== undefined) return words.text;
  const vars = Object.fromEntries(Object.entries(words.vars ?? {}).map(([k, v]) => [k, v && typeof v === 'object' ? say(v) : v]));
  return ta(words.key, vars);
}

/** A list of descriptors joined as the admin's language joins a list. */
export function sayList(items) {
  const parts = items.map(say);
  try {
    return new Intl.ListFormat(adminLang(), { type: 'conjunction' }).format(parts);
  } catch {
    return parts.join(', ');
  }
}

/** A change from headerChanges() in a sentence. */
export function changeText(change) {
  switch (change.kind) {
    case 'removed': return ta('hdr.change.removed', { rule: say(change.words) });
    case 'changed': return ta('hdr.change.changed', { rule: say(change.words) });
    case 'sourcesAdded': return ta('hdr.change.sourcesAdded', { kind: say(change.words), sources: sayList(change.sources) });
    case 'sourcesRemoved': return ta('hdr.change.sourcesRemoved', { kind: say(change.words), sources: sayList(change.sources) });
    case 'kindNew': return ta('hdr.change.kindNew', { kind: say(change.words), sources: sayList(change.sources) });
    case 'kindGone': return ta('hdr.change.kindGone', { kind: say(change.words) });
    default: return say(change.words);
  }
}

/** An addition from keptWords() in a sentence. */
export const keptText = (kept) => (kept.sources ? ta('hdr.kept.sources', { kind: say(kept.words), sources: sayList(kept.sources) }) : say(kept.words));

/**
 * A release's date in the admin's language, or null.
 * @param {string|null|undefined} iso
 */
export function releaseDate(iso) {
  const date = iso ? new Date(iso) : null;
  if (!date || Number.isNaN(date.getTime())) return null;
  try {
    return new Intl.DateTimeFormat(adminLang(), { dateStyle: 'long' }).format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}
