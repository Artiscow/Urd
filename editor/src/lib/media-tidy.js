/**
 * The tidy of a site's media/ (the Site panel's «Tidy the media folder»): the files written at the root of media/ before the folders came move into the folder of their kind, and every reference to them in the site's documents follows.
 * The plan is pure: which files move, which documents change, and how many files wait for another press when a batch is full. Publishing carries the moves (the commit's `from` entries, which take the file's blob as it stands) beside the changed documents, so every commit leaves every reference pointing at a file that exists.
 * Pure, node-tested (tests/media-tidy.test.mjs).
 */

import { tidiedMediaPath } from '$engine/imageTools.js';

/** A path at the root of media/ in any text of a document. */
const ROOT_PATH_RE = /\/media\/[a-z0-9][a-z0-9._-]*\.[a-z0-9]+/gi;

/** How many moves one press takes at most, leaving the commit room for the documents and the page copies under its cap of 200 entries. */
export const TIDY_ROOM = 120;

/** The files at the root of media/ among the ones listed (a path with no folder between media/ and the name), each with the folder path it takes; a kind media/ does not hold stays. */
export function rootMediaFiles(files) {
  return (files ?? [])
    .map((f) => (typeof f === 'string' ? f : f?.path))
    .filter((path) => typeof path === 'string' && /^media\/[^/]+$/.test(path))
    .map((path) => ({ from: path, to: tidiedMediaPath(`/${path}`)?.slice(1) ?? null }))
    .filter((move) => move.to);
}

/** A document with every reference to the files named rewritten to their folder paths; null when nothing in it changes. */
function rewritten(doc, byPath) {
  let changed = false;
  const visit = (value) => {
    if (typeof value === 'string') {
      return value.replace(ROOT_PATH_RE, (hit) => {
        const to = byPath.get(hit.toLowerCase());
        if (to) changed = true;
        return to ?? hit;
      });
    }
    if (Array.isArray(value)) return value.map(visit);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, visit(v)]));
    return value;
  };
  const out = visit(doc);
  return changed ? out : null;
}

/** The root files a document refers to, by their lower-cased paths. */
function referenced(doc) {
  const found = new Set();
  const visit = (value) => {
    if (typeof value === 'string') for (const hit of value.matchAll(ROOT_PATH_RE)) found.add(hit[0].toLowerCase());
    else if (Array.isArray(value)) value.forEach(visit);
    else if (value && typeof value === 'object') Object.values(value).forEach(visit);
  };
  visit(doc);
  return found;
}

/**
 * What one press of the tidy does.
 * @param {{site: object, pages?: Array<[string, object]>, collections?: Array<[string, object]>, templates?: Array<[string, object]>}} docs The site's documents as published, each with its id
 * @param {Array<{path: string}|string>} files The files media/ holds, from the listing
 * @param {{room?: number}} [options] How many files one press moves at most
 * @returns {{moves: Array<{from: string, to: string}>, site: object|null, pages: Array<[string, object]>, collections: Array<[string, object]>, templates: Array<[string, object]>, remaining: number}}
 *   The moves of this press, each document that changes with it (null or empty where none does), and how many files wait for another press
 */
export function tidyMedia(docs, files, { room = TIDY_ROOM } = {}) {
  const all = rootMediaFiles(files);
  const moves = all.slice(0, Math.max(0, room));
  const byPath = new Map(moves.map((m) => [`/${m.from}`.toLowerCase(), `/${m.to}`]));
  const list = (entries) => (entries ?? []).map(([id, doc]) => [id, rewritten(doc, byPath)]).filter(([, doc]) => doc);
  return {
    moves,
    site: docs?.site ? rewritten(docs.site, byPath) : null,
    pages: list(docs?.pages),
    collections: list(docs?.collections),
    templates: list(docs?.templates),
    remaining: all.length - moves.length,
  };
}

/** The root files the documents still refer to that the listing does not hold: references nothing can move, named so the owner can see them. */
export function strandedReferences(docs, files) {
  const held = new Set((files ?? []).map((f) => (typeof f === 'string' ? f : f?.path)).filter(Boolean).map((p) => `/${p}`.toLowerCase()));
  const found = new Set();
  for (const doc of [docs?.site, ...(docs?.pages ?? []).map(([, d]) => d), ...(docs?.collections ?? []).map(([, d]) => d), ...(docs?.templates ?? []).map(([, d]) => d)]) {
    for (const path of referenced(doc)) if (!held.has(path)) found.add(path);
  }
  return [...found].sort();
}
