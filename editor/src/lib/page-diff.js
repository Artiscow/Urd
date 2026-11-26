/**
 * The differences between a page's saved draft and this browser's version, by section and block ids, in the saved order; measured heights are left out.
 */
import { blockWords, sectionWords } from '$engine/anchor-model.js';
import { followsContent } from '$engine/push-model.js';

/** The props a block's visible words stand in. */
const TEXT_PROPS = ['html', 'label', 'text', 'quote', 'title', 'heading', 'name', 'caption', 'subtitle', 'description', 'value', 'items', 'rows'];
/** The props a block's pictures and films stand in. */
const PICTURE_PROPS = ['src', 'image', 'images', 'poster', 'url', 'logo', 'photo', 'alt'];

/** A value as text with every object's keys in order, so two equal values read the same however they were written. */
const json = (value) => JSON.stringify(value ?? null, (key, inner) => (inner && typeof inner === 'object' && !Array.isArray(inner)
  ? Object.fromEntries(Object.keys(inner).sort().map((k) => [k, inner[k]]))
  : inner));
const pick = (props, keys) => json(keys.map((key) => props?.[key]));
const omit = (value, keys) => Object.fromEntries(Object.entries(value ?? {}).filter(([key]) => !keys.includes(key)));

/** A block's place and size, the height left out where it follows the content. */
function frameOf(block) {
  const follows = followsContent(block);
  const strip = (frame) => (frame && follows ? omit(frame, ['h']) : frame);
  return json({ desktop: strip(block.frames?.desktop), mobile: strip(block.frames?.mobile) });
}

/** Every block of a page by its id, with the section it stands in. */
function blocksOf(sections) {
  const out = new Map();
  for (const section of sections) for (const block of section.blocks ?? []) out.set(block.id, { block, sectionId: section.id });
  return out;
}

/** The places in a run of numbers that keep their order (the longest rising run), so the rest are the ones that moved. */
function kept(order) {
  const n = order.length;
  const len = new Array(n).fill(1);
  const prev = new Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (order[j] < order[i] && len[j] + 1 > len[i]) {
        len[i] = len[j] + 1;
        prev[i] = j;
      }
    }
  }
  let at = len.indexOf(Math.max(0, ...len));
  const keep = new Set();
  while (at >= 0) {
    keep.add(at);
    at = prev[at];
  }
  return keep;
}

/**
 * The differences between the saved version of a page and this browser's.
 * @param {{sections?: Array<object>}|null} saved
 * @param {{sections?: Array<object>}|null} mine
 * @returns {Array<{kind: string, sectionId: string, blockId?: string, words: string, type?: string, index?: number}>}
 *   `kind`: what changed, as sectionAdded or textChanged; `words`: the part's own words, or ''; `type`: a block's kind; `index`: a section's place, from 0
 */
export function pageDiff(saved, mine) {
  const savedSections = saved?.sections ?? [];
  const mineSections = mine?.sections ?? [];
  const mineById = new Map(mineSections.map((section, i) => [section.id, { section, i }]));
  const savedIds = new Set(savedSections.map((section) => section.id));
  const savedBlocks = blocksOf(savedSections);
  const mineBlocks = blocksOf(mineSections);
  const shared = savedSections.filter((section) => mineById.has(section.id));
  const moved = new Set();
  const stay = kept(shared.map((section) => mineById.get(section.id).i));
  shared.forEach((section, k) => { if (!stay.has(k)) moved.add(section.id); });
  const out = [];
  if (saved && mine && json(omit(saved, ['sections'])) !== json(omit(mine, ['sections']))) out.push({ kind: 'pageSettings', sectionId: savedSections[0]?.id ?? '', words: '' });
  savedSections.forEach((section, index) => {
    const words = sectionWords(section);
    const theirs = mineById.get(section.id)?.section;
    if (!theirs) {
      out.push({ kind: 'sectionAdded', sectionId: section.id, words, index });
      // A block of this browser's moved into the new section is told as moved; the section's own new blocks are its news.
      for (const block of section.blocks ?? []) {
        if (mineBlocks.has(block.id)) out.push({ kind: 'blockMoved', sectionId: section.id, blockId: block.id, words: blockWords(block), type: block.type });
      }
      return;
    }
    if (moved.has(section.id)) out.push({ kind: 'sectionMoved', sectionId: section.id, words, index });
    if (json(omit(section, ['blocks'])) !== json(omit(theirs, ['blocks']))) out.push({ kind: 'sectionSettings', sectionId: section.id, words, index });
    const blocks = [...(section.blocks ?? [])].sort((a, b) => (a.frames?.desktop?.y ?? 0) - (b.frames?.desktop?.y ?? 0));
    for (const block of blocks) {
      const at = { sectionId: section.id, blockId: block.id, words: blockWords(block), type: block.type };
      const other = mineBlocks.get(block.id);
      if (!other) {
        out.push({ kind: 'blockAdded', ...at });
        continue;
      }
      if (other.sectionId !== section.id) out.push({ kind: 'blockMoved', ...at });
      else if (frameOf(block) !== frameOf(other.block)) out.push({ kind: 'blockPlaced', ...at });
      if (pick(block.props, TEXT_PROPS) !== pick(other.block.props, TEXT_PROPS)) out.push({ kind: 'textChanged', ...at });
      if (pick(block.props, PICTURE_PROPS) !== pick(other.block.props, PICTURE_PROPS)) out.push({ kind: 'pictureChanged', ...at });
      const rest = (b) => json({ ...omit(b, ['id', 'frames', 'props', 'mobileHeight']), props: omit(b.props, [...TEXT_PROPS, ...PICTURE_PROPS]) });
      if (rest(block) !== rest(other.block)) out.push({ kind: 'settingsChanged', ...at });
    }
    // A block of this browser's that no saved section holds.
    for (const block of theirs.blocks ?? []) {
      if (!savedBlocks.has(block.id)) out.push({ kind: 'blockRemoved', sectionId: section.id, blockId: block.id, words: blockWords(block), type: block.type });
    }
  });
  mineSections.forEach((section, index) => {
    if (!savedIds.has(section.id)) out.push({ kind: 'sectionRemoved', sectionId: section.id, words: sectionWords(section), index });
  });
  return out;
}
