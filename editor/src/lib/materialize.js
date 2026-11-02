/**
 * The files publishing writes to media/ (publish.svelte.js): an unpublished picture, sound or film held as a data URL in the draft becomes a file in the folder of its kind (imageTools.js mediaPath), and the field takes the file's path.
 * The same content gives the same path (a hash of the content), so a republish never duplicates a file. Every walker changes the document in place and adds the files to the commit's list.
 * Pure, node-tested (tests/materialize.test.mjs).
 */
import { slugify, mediaPath } from '$engine/imageTools.js';
import { publishHeldFiles } from './file-links.js';

/** Turns a data URL in obj[field] into a media file; mutates obj. Pictures, sound and film share the flow. */
export function materializeField(obj, field, name, files) {
  const src = obj?.[field];
  if (!src?.startsWith('data:image/') && !src?.startsWith('data:audio/') && !src?.startsWith('data:video/')) return;
  const base64 = src.split(',', 2)[1];
  const path = mediaPath(slugify(name || 'image'), base64, src);
  files.push({ path, content: base64, encoding: 'base64' });
  obj[field] = `/${path}`;
}

/** One collection entry's images: the main image + the product colors' images (kind products); and a PDF its link goes to. */
export function materializeEntryImages(entry, files) {
  materializeField(entry, 'image', entry.title, files);
  for (const color of entry.colors ?? []) materializeField(color, 'image', `${entry.title}-${color.name}`, files);
  publishHeldFiles(entry, files);
}

/** The background layers' images (image and slideshow) - shared by section, nav and footer. */
export function materializeBackground(background, files) {
  for (const layer of background?.layers ?? []) {
    if (layer.type === 'image') materializeField(layer.props, 'src', 'background', files);
    if (layer.type === 'slideshow') {
      for (const img of layer.props.images ?? []) materializeField(img, 'src', 'background', files);
    }
    if (layer.type === 'video') {
      materializeField(layer.props, 'src', 'video', files);
      materializeField(layer.props, 'poster', 'poster', files);
    }
  }
}

/** One block's images, and the PDFs its links go to - shared by page publishing and block-group templates. */
export function materializeBlockImages(block, files) {
  publishHeldFiles(block.props, files);
  if (block.type === 'image') materializeField(block.props, 'src', block.props.alt, files);
  // The icon block's own uploaded icon is published as a media file the same way.
  if (block.type === 'icon') materializeField(block.props, 'image', 'icon', files);
  if (block.type === 'gallery') {
    for (const img of block.props.images ?? []) materializeField(img, 'src', img.alt || 'gallery', files);
  }
  if (block.type === 'audio') materializeField(block.props, 'src', block.props.title || 'audio', files);
  // The video block's own film and its poster (source 'file').
  if (block.type === 'video') {
    materializeField(block.props, 'src', block.props.title || 'video', files);
    materializeField(block.props, 'poster', 'poster', files);
  }
  // The quote's portrait, and the links block's own icons.
  if (block.type === 'quote') materializeField(block.props, 'image', block.props.attribution || 'portrait', files);
  if (block.type === 'share') {
    for (const link of block.props.links ?? []) materializeField(link, 'image', 'share-icon', files);
  }
}

/** One section's images (background + blocks) - shared by page publishing and section templates. */
export function materializeSection(section, files) {
  // Background images follow the same flow as image blocks.
  materializeBackground(section.background, files);
  for (const block of section.blocks) materializeBlockImages(block, files);
}

export function materializeImages(page) {
  const files = [];
  // The sharing image (meta.og.image) is materialized like the block images.
  if (page.meta?.og) materializeField(page.meta.og, 'image', 'share', files);
  for (const section of page.sections) materializeSection(section, files);
  return files;
}

/** Logo uploads in the site draft (nav.logo) are materialized the same way. */
export function materializeSiteImages(site) {
  const files = [];
  const logo = site.nav?.logo;
  if (logo?.type === 'image') materializeField(logo, 'value', 'logo', files);
  if (logo?.type === 'both') materializeField(logo, 'image', 'logo', files);
  // The legacy single nav background image (back compat) + the layered
  // backgrounds on nav and footer.
  if (site.nav?.style) materializeField(site.nav.style, 'image', 'menu', files);
  materializeBackground(site.nav?.style?.background, files);
  materializeBackground(site.footer?.background, files);
  if (site.footer?.brand) materializeField(site.footer.brand, 'logo', 'footer-logo', files);
  // The site's links' own icons.
  for (const link of Array.isArray(site.site?.links) ? site.site.links : []) materializeField(link, 'image', 'link-icon', files);
  // The launcher's own mark on the button, and one per shortcut; the tab's own mark.
  if (site.nav?.launcher) {
    materializeField(site.nav.launcher, 'image', 'shortcut', files);
    for (const link of site.nav.launcher.links ?? []) materializeField(link, 'image', 'shortcut', files);
  }
  if (site.nav?.tab) materializeField(site.nav.tab, 'image', 'tab', files);
  materializeField(site.site, 'icon', 'icon', files);
  // The PDFs the menu's, the footer's and the site's links go to.
  publishHeldFiles(site, files);
  return files;
}
