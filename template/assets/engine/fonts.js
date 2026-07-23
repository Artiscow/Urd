/**
 * Delte typografi-konstanter: fontvalgene og størrelsesforvalgene som
 * både admin-panelene og teksteditor-linjens typografirad viser. Kun
 * systemtrygge stacker (Urd laster aldri eksterne fonter, se _headers/CSP).
 */

/** @type {Array<[string, string]>} Visningsnavn + CSS-fontstack. */
export const FONT_STACKS = [
  ['System', 'system-ui, sans-serif'],
  ['Arial', 'Arial, Helvetica, sans-serif'],
  ['Verdana', 'Verdana, Geneva, sans-serif'],
  ['Trebuchet', "'Trebuchet MS', sans-serif"],
  ['Georgia (serif)', "Georgia, 'Times New Roman', serif"],
  ['Palatino (serif)', "'Palatino Linotype', Palatino, serif"],
  ['Courier (skrivemaskin)', "'Courier New', monospace"],
];

/** @type {Array<[string, number]>} Størrelsesforvalg for tekstfelt (px). */
export const TEXT_SIZES = [['S', 14], ['M', 18], ['L', 24], ['XL', 36]];
