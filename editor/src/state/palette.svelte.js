/**
 * The command palette (comparison/ELEMENTS.md E1): the commands the editor
 * offers on Ctrl/⌘+K, built from the other state modules when the palette
 * opens: the actions of the top bar, the pages, the panels, every block the
 * Blocks panel adds in one press, the section templates, and the commands
 * plugins register in the preview (Urd.commands), which run there.
 * The list and its ranking are pure (lib/command-palette.js).
 */
import { ta } from '$engine/i18n.js';
import { PALETTE_KINDS, paletteGroupsFor } from '$engine/block-palette.js';
import { registerSectionPresets } from '$engine/sections/presets.js';
import { shellState } from './shell.svelte.js';
import { previewState } from './preview.svelte.js';
import { pageState } from './page.svelte.js';
import { siteState } from './site.svelte.js';
import { blocksState } from './blocks.svelte.js';
import { bridgeState } from './bridge.svelte.js';
import { historyState } from './history.svelte.js';
import { publishState } from './publish.svelte.js';

/** Whether the palette stands open over the editor. */
let paletteOpen = $state(false);

/** The commands plugins registered in the preview, as the preview reported them: `{ id, label }`. */
let pluginCommands = $state([]);

/**
 * Opens the palette. It stays shut while a confirmation or the icon editor is open, and it closes the light menus first, as the shortcut sheet does.
 */
function openPalette() {
  if (shellState.confirmBox || siteState.iconEditorImage) return;
  shellState.settingsOpen = false;
  shellState.toolMenu = null;
  siteState.pageMenuFor = null;
  shellState.shortcutsOpen = false;
  paletteOpen = true;
}

/** The section templates by id, read once from the engine's own list. */
let presetDefs = null;
function sectionPresets() {
  if (!presetDefs) {
    presetDefs = new Map();
    registerSectionPresets({ sections: { define: (id, def) => presetDefs.set(id, def) } });
  }
  return presetDefs;
}

/**
 * The commands as they stand now: each with its id, its group, its label and what it runs.
 * @returns {Array<{ id: string, group: string, label: string, hint?: string, run: () => void }>}
 */
function buildCommands() {
  const list = [];
  const add = (id, group, label, run, hint) => list.push({ id, group, label, run, ...(hint ? { hint } : {}) });

  // The actions of the top bar.
  if (historyState.dirty) add('publish', 'actions', ta('ui.publish'), () => publishState.publish());
  add('undo', 'actions', ta('shortcuts.undo'), () => historyState.undo());
  add('redo', 'actions', ta('shortcuts.redo'), () => historyState.redo());
  add('clean', 'actions', ta('ui.cleanView'), () => previewState.toggleChrome());
  add('grid', 'actions', ta(shellState.gridOn ? 'palette.gridOff' : 'palette.gridOn'), () => shellState.toggleGrid());
  add('guides', 'actions', ta(shellState.guidesOn ? 'palette.guidesOff' : 'palette.guidesOn'), () => shellState.toggleGuides());
  for (const d of previewState.devices) {
    if (d.id !== previewState.deviceId) add(`device:${d.id}`, 'actions', ta('palette.device', { device: ta(`lbl.device.${d.id}`) }), () => { previewState.deviceId = d.id; });
  }
  add('shortcuts', 'actions', ta('shortcuts.title'), () => shellState.openShortcuts());
  add('viewSite', 'actions', ta('ui.viewSite'), () => window.open(pageState.pageEntry()?.path ?? '/', '_blank', 'noopener'));

  // The pages, the current one left out.
  for (const page of siteState.siteDraft?.pages ?? []) {
    if (page.id !== pageState.pageId) add(`page:${page.id}`, 'pages', ta('palette.goPage', { title: page.title }), () => pageState.selectPage(page.id), page.path);
  }

  // The sections of this page, by their place and link name, scrolled to in the preview.
  (pageState.store?.data.sections ?? []).forEach((section, i) => {
    add(`section-go:${section.id}`, 'pages', ta('palette.goSection', { n: i + 1 }), () => previewState.bridge?.sendScrollSection(section.id), section.anchor ? `#${section.anchor}` : '');
  });

  // The panels.
  for (const id of shellState.PANEL_GROUPS.flat()) {
    add(`panel:${id}`, 'panels', ta('palette.openPanel', { panel: shellState.PANEL_LABELS[id] }), () => { shellState.activePanel = id; });
  }

  // The blocks the Blocks panel adds in one press: a kind that asks for a file or opens a picker is left out, and the shop's while the shop is off.
  const shop = blocksState.shopBlocksOn();
  for (const group of paletteGroupsFor(shop)) {
    for (const kind of group.kinds) {
      const def = PALETTE_KINDS[kind];
      if (!def || def.files || def.action) continue;
      add(`block:${kind}`, 'blocks', ta('palette.insertBlock', { block: ta(def.labelKey) }), () => {
        const block = blocksState.buildBlock(kind);
        if (block) blocksState.requestPlacement(block);
      }, ta(group.labelKey));
    }
  }

  // The section templates, added at the foot of the page; a shop template stands here while the shop's blocks do.
  for (const [id, def] of sectionPresets()) {
    if (def.shop && !shop) continue;
    add(`section:${id}`, 'sections', ta('palette.insertSection', { name: def.labelKey ? ta(def.labelKey) : def.label }), () => {
      const sections = pageState.store?.data.sections ?? [];
      bridgeState.handleAddSection({ index: sections.length, section: def.create() });
    }, def.groupKey ? ta(def.groupKey) : def.group);
  }

  // The plugins' commands run in the preview, where they were registered.
  for (const cmd of pluginCommands) {
    add(`plugin:${cmd.id}`, 'plugins', cmd.label, () => previewState.bridge?.sendRunCommand(cmd.id));
  }
  return list;
}

export const paletteState = {
  get paletteOpen() { return paletteOpen; },
  set paletteOpen(v) { paletteOpen = v; },
  openPalette,
  get pluginCommands() { return pluginCommands; },
  set pluginCommands(v) { pluginCommands = Array.isArray(v) ? v.filter((c) => c && typeof c.id === 'string' && typeof c.label === 'string') : []; },
  buildCommands,
};
