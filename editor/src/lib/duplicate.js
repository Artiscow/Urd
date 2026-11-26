/**
 * Duplication of a page (the Pages panel's row menu) and of a section in place: copies get fresh ids, and a section's anchor names are made free (claimAnchors).
 */

import { cloneSectionForInsert } from '$engine/templates-model.js';
import { claimAnchors } from '$engine/anchor-model.js';

/**
 * A page copy's slug: the first free number from 2 (`om-oss-2`), a copy's own dropped where its stem is a page; `page-<name>-<n>` where -2 and -3 are reserved.
 * @param {string} id
 * @param {Array<{id: string, path?: string}>} pages
 * @param {(slug: string) => boolean} [reserved]
 */
export function copySlug(id, pages, reserved = () => false) {
  const taken = new Set((pages ?? []).flatMap((p) => [p.id, typeof p.path === 'string' ? p.path.replace(/^\//, '') : null]).filter(Boolean));
  const whole = String(id ?? '') || 'page';
  const stem = whole.replace(/-\d+$/, '');
  let base = stem !== whole && taken.has(stem) ? stem : whole;
  if (reserved(`${base}-2`) && reserved(`${base}-3`)) base = `page-${base}`;
  for (let n = 2; ; n += 1) {
    const slug = `${base}-${n}`;
    if (!taken.has(slug) && !reserved(slug)) return slug;
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
