/**
 * Motorsti-oppslag for testene (ADR-0013): motoren bor i en versjonert
 * mappe der navnet alltid er lik engine-feltet i template/urd.json, så
 * testene følger fase-slippets omdøping automatisk. Statisk import kan
 * ikke interpolere stier; derfor henter testfilene motormoduler med
 * `await engineImport('...')` i stedet.
 */
import { readFileSync } from 'node:fs';

export const ENGINE_VERSION = JSON.parse(
  readFileSync(new URL('../template/urd.json', import.meta.url), 'utf-8'),
).engine;

export const ENGINE_DIR = new URL(`../template/assets/engine/${ENGINE_VERSION}/`, import.meta.url);

/** @param {string} relativePath Motorrelativ sti, f.eks. 'backgrounds/gradient.js' */
export function engineImport(relativePath) {
  return import(new URL(relativePath, ENGINE_DIR).href);
}
