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
 * @param {File} file
 * @returns {Promise<{dataUrl: string, bytes: number, width: number, height: number}>}
 */
export async function compressToWebp(file, maxDim = MAX_DIMENSION) {
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
