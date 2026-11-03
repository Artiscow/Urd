/**
 * Duplication of a page (the Pages panel's row menu) and of a section in place (the section's toolbar and right-click menu).
 * The copies take the re-id of template insertion (templates-model.js), so a copy never shares an id with its original; a section's anchor names are made free on the page (anchor-model.js claimAnchors).
 * Pure, node-tested (tests/duplicate.test.mjs).
 */

import { cloneSectionForInsert } from '$engine/templates-model.js';
import { claimAnchors } from '$engine/anchor-model.js';

/** The slug of a page's copy: the original's with the first free running number from 2 (`om-oss-2`, then `om-oss-3`); a copy's own number is replaced, so the copy of `om-oss-2` is `om-oss-3`, while `top-10` with no `top` beside it keeps its name whole. */
export function copySlug(id, pages) {
  const taken = new Set((pages ?? []).flatMap((p) => [p.id, typeof p.path === 'string' ? p.path.replace(/^\//, '') : null]).filter(Boolean));
  const whole = String(id ?? '') || 'page';
  const stem = whole.replace(/-\d+$/, '');
  const base = stem !== whole && taken.has(stem) ? stem : whole;
  for (let n = 2; ; n += 1) {
    const slug = `${base}-${n}`;
    if (!taken.has(slug)) return slug;
  }
}

/**
 * A section's copy, ready to land directly below the original.
 * @param {{sections?: Array<object>}} page The page as it is (not mutated)
 * @param {string} sectionId The section to copy
 * @param {(prefix: string) => string} makeId The id factory
 * @returns {{index: number, section: object}|null} Where the copy goes and the copy itself; null when the page has no such section
 */
export function duplicatedSection(page, sectionId, makeId) {
  const sections = page?.sections ?? [];
  const index = sections.findIndex((s) => s.id === sectionId);
  if (index < 0) return null;
  const section = cloneSectionForInsert(JSON.parse(JSON.stringify(sections[index])), makeId);
  claimAnchors([section], page);
  return { index: index + 1, section };
}
