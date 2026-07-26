/**
 * Bildeverktøy for editoren: komprimering til webp i nettleseren før
 * bildet i det hele tatt legges i utkastet (mønster fra ApeironLF).
 * Publiseringen materialiserer data-URL-ene til filer i media/.
 */

const MAX_DIMENSION = 1600;
const TARGET_QUALITY = 0.82;
const FALLBACK_QUALITY = 0.6;
/** Over dette varsles brukeren (git og statiske hoster liker små filer). */
export const WARN_BYTES = 400_000;

/**
 * Komprimerer en bildefil til webp, maks 1600px på lengste side.
 * SVG rasteriseres ikke: vektoren beholdes (etter sanitering), for en logo
 * skal være skarp i alle størrelser. Filnavnet ved publisering får riktig
 * endelse via mediaExtension.
 * @param {File} file
 * @returns {Promise<{dataUrl: string, bytes: number, width: number, height: number}>}
 */
export async function compressToWebp(file, maxDim = MAX_DIMENSION) {
  if (isSvgFile(file)) return svgToDataUrl(await file.text());
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const toBlob = (quality) => new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality));
  let blob = await toBlob(TARGET_QUALITY);
  if (blob.size > WARN_BYTES) blob = await toBlob(FALLBACK_QUALITY);

  const dataUrl = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
  return { dataUrl, bytes: blob.size, width, height };
}

const SVG_MIME = 'image/svg+xml';

function isSvgFile(file) {
  return file.type === SVG_MIME || /\.svg$/i.test(file.name || '');
}

/**
 * Saniterer en SVG og pakker den som en base64 data-URL. Rendring skjer alltid
 * via <img>/CSS (secure static mode, ingen skript), men den publiserte /media-
 * filen kan åpnes direkte, så vi fjerner script/foreignObject, hendelses-
 * attributter (on*) og js:/eksterne href-er som forsvar i dybden.
 * @returns {{dataUrl: string, bytes: number, width: number, height: number}}
 */
export function svgToDataUrl(text) {
  const doc = new DOMParser().parseFromString(text, SVG_MIME);
  const svg = doc.documentElement;
  if (!svg || svg.tagName.toLowerCase() !== 'svg' || doc.querySelector('parsererror')) {
    throw new Error('Ugyldig SVG');
  }
  svg.querySelectorAll('script, foreignObject').forEach((n) => n.remove());
  const scrub = (el) => {
    for (const attr of [...el.attributes]) {
      const name = attr.name.toLowerCase();
      const isHref = name === 'href' || name === 'xlink:href';
      if (name.startsWith('on')) el.removeAttribute(attr.name);
      else if (isHref && !attr.value.trim().startsWith('#')) el.removeAttribute(attr.name);
      else if (/^\s*javascript:/i.test(attr.value)) el.removeAttribute(attr.name);
    }
    for (const child of el.children) scrub(child);
  };
  scrub(svg);

  const clean = new XMLSerializer().serializeToString(svg);
  const bytes = new Blob([clean]).size;
  // encodeURIComponent-omveien lar btoa takle ikke-ASCII (æøå i tittel/desc).
  const dataUrl = `data:${SVG_MIME};base64,${btoa(unescape(encodeURIComponent(clean)))}`;
  const box = svg.getAttribute('viewBox')?.split(/[\s,]+/).map(Number);
  const width = box?.length === 4 ? box[2] : Number.parseFloat(svg.getAttribute('width')) || 0;
  const height = box?.length === 4 ? box[3] : Number.parseFloat(svg.getAttribute('height')) || 0;
  return { dataUrl, bytes, width, height };
}

/** Media-filendelse fra en data-URL: SVG beholder vektoren, resten er webp. */
export function mediaExtension(dataUrl) {
  return /^data:image\/svg\+xml[;,]/.test(dataUrl || '') ? 'svg' : 'webp';
}

/** Filnavn → trygg slug for media/-stier. */
export function slugify(name) {
  return name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replaceAll('æ', 'ae').replaceAll('ø', 'o').replaceAll('å', 'a')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'bilde';
}

/** Kort, deterministisk hash av innholdet (samme bilde → samme filnavn). */
export function contentHash(text) {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) hash = ((hash << 5) + hash + text.charCodeAt(i)) >>> 0;
  return hash.toString(16).padStart(8, '0');
}
