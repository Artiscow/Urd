/**
 * The sign and the words of each kind of part the drafts are kept in (lib/saved-model.js names them): a page and a collection go by their own names, the others by the words here.
 */
import { ICONS } from './icons.js';

export const PART_KINDS = {
  page: { icon: ICONS.panel_pages, word: 'unpublished.page' },
  site: { icon: ICONS.panel_site, name: 'unpublished.site' },
  collections: { icon: ICONS.panel_collections, name: 'unpublished.collections' },
  collection: { icon: ICONS.panel_collections, word: 'unpublished.collection' },
  templates: { icon: ICONS.panel_blocks, name: 'canvas.tabMyTemplates' },
  plugins: { icon: ICONS.panel_plugins, name: 'panel.plugins' },
  redirects: { icon: ICONS.redirect, name: 'ui.redirects' },
};
