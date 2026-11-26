/**
 * The files publishing writes to media/: a picture, sound or film held as a data URL becomes a file named by its content's hash, and the field takes its path.
 */
import { slugify, mediaPath, svgProblem, svgDataText } from '$engine/imageTools.js';
import { publishHeldFiles } from './file-links.js';

/**
 * Turns a base64 data URL in obj[field] into a media file, in place; an SVG that can run something (svgProblem) is never written, and stays a data address.
 */
export function materializeField(obj, field, name, files) {
  const src = obj?.[field];
  if (!/^data:(?:image|audio|video)\/[^;,]+(?:;[^;,]*)*;base64,/.test(src ?? '')) return;
  if (src.startsWith('data:image/svg+xml') && svgProblem(svgDataText(src) ?? '') !== null) return;
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
  // The video block's own film (source 'file') and its poster, which is also an embed's cover picture.
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
  // The sharing image (meta.og.image) is materialized like the block images, and its kept original beside it.
  if (page.meta?.og) materializeField(page.meta.og, 'image', 'share', files);
  if (page.meta?.og?.imageSource) materializeField(page.meta.og.imageSource, 'src', 'share-original', files);
  for (const section of page.sections) materializeSection(section, files);
  return files;
}

/** Logo uploads in the site draft (nav.logo) are materialized the same way. */
export function materializeSiteImages(site) {
  const files = [];
  const logo = site.nav?.logo;
  if (logo?.type === 'image') materializeField(logo, 'value', 'logo', files);
  if (logo?.type === 'both') materializeField(logo, 'image', 'logo', files);
  if (logo?.imageSource) materializeField(logo.imageSource, 'src', 'logo-original', files);
  // The nav's own background image, and the layered backgrounds of the nav and the footer.
  if (site.nav?.style) materializeField(site.nav.style, 'image', 'menu', files);
  materializeBackground(site.nav?.style?.background, files);
  materializeBackground(site.footer?.background, files);
  if (site.footer?.brand) materializeField(site.footer.brand, 'logo', 'footer-logo', files);
  if (site.footer?.brand?.logoSource) materializeField(site.footer.brand.logoSource, 'src', 'footer-logo-original', files);
  // The site's links' own icons.
  for (const link of Array.isArray(site.site?.links) ? site.site.links : []) materializeField(link, 'image', 'link-icon', files);
  // The launcher's own mark on the button, and one per shortcut; the tab's own mark.
  if (site.nav?.launcher) {
    materializeField(site.nav.launcher, 'image', 'shortcut', files);
    for (const link of site.nav.launcher.links ?? []) materializeField(link, 'image', 'shortcut', files);
  }
  if (site.nav?.tab) materializeField(site.nav.tab, 'image', 'tab', files);
  materializeField(site.site, 'icon', 'icon', files);
  // The «Back to top» button's own picture in place of its arrow.
  if (site.layout?.toTop) materializeField(site.layout.toTop, 'image', 'totop-icon', files);
  if (site.site?.iconSource) materializeField(site.site.iconSource, 'src', 'icon-original', files);
  // The PDFs the menu's, the footer's and the site's links go to.
  publishHeldFiles(site, files);
  return files;
}
