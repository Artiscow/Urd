/**
 * The owner's templates in content/maler/: their draft stores and the saving and deleting.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { createDraftStore } from '../lib/draftStore.js';
import { TEMPLATE_SCHEMA_VERSION, TEMPLATE_KINDS, templateId } from '$engine/templates-model.js';
import { ta } from '$engine/i18n.js';
import { historyState } from './history.svelte.js';
import { previewState } from './preview.svelte.js';
import { shellState } from './shell.svelte.js';
import { siteState } from './site.svelte.js';

// Same pattern as collections: an index store + one store per template
// file, with a "does not exist" baseline (null) until the first publish.
let templatesIndexStore = null;

let templateStores = {};

/** Published baseline per template id (null = never published): used when undo recreates a deleted template's store. */
let publishedTemplates = {};

/** True only once initTemplates has filled ALL stores; snapshot() includes templates only then. */
let templatesReady = false;

let templateIds = $state([]);

async function initTemplates() {
  let index = { version: 1, maler: [] };
  try {
    index = await (await fetch('/content/maler.json')).json();
  } catch { /* no index is perfectly fine */ }
  templatesIndexStore = createDraftStore('urd-draft-templates', () => index, shellState.draftSaveError, 'urd-draft-maler');
  templateIds = [...(templatesIndexStore.data.maler ?? [])];
  for (const id of templateIds) {
    let published = null;
    try {
      published = await (await fetch(`/content/maler/${id}.json`)).json();
    } catch { /* new, unpublished template */ }
    publishedTemplates[id] = published;
    templateStores[id] = createDraftStore(`urd-draft-template-${id}`, () => published, shellState.draftSaveError, `urd-draft-mal-${id}`);
    // Drafts from a newer editor are discarded (same guard as page/site).
    if ((templateStores[id].data?.schemaVersion ?? 1) > TEMPLATE_SCHEMA_VERSION) templateStores[id].reset();
  }
  templatesReady = true;
  pushTemplatesToPreview();
}

/** Send the template drafts to the preview's My templates tab (plain copies, never $state proxies). */
function pushTemplatesToPreview() {
  const list = templateIds
    .map((id) => (templateStores[id]?.data ? { id, ...JSON.parse(JSON.stringify(templateStores[id].data)) } : null))
    .filter(Boolean)
    .map(({ id, mal, section, blocks, page }) => ({ id, name: mal.name, kind: mal.kind, section, blocks, page }));
  previewState.bridge?.sendTemplates(list);
}

/** "Save as template" from the preview (section/block group); page
 *  templates come editor-internally from the Pages panel via the same core. */
function handleSaveTemplate(msg) {
  const kind = TEMPLATE_KINDS.includes(msg.kind) ? msg.kind : 'section';
  return saveTemplate(kind, msg[kind]);
}

/** Shared template saving: name it, slug to id, save as a draft. */
async function saveTemplate(kind, payload) {
  if (!payload || !templatesIndexStore) return;
  const name = (await shellState.askPrompt({
    title: ta('canvas.templateNamePrompt'),
    placeholder: ta('ph.templateName'),
  }))?.trim();
  if (!name) return;
  const id = templateId(name);
  if (!id) {
    shellState.setStatus(ta('status.invalidName'), 'error');
    return;
  }
  if (templateIds.includes(id)) {
    shellState.setStatus(ta('status.templateExists'), 'error');
    return;
  }
  historyState.pushHistory('templates');
  const fresh = { schemaVersion: TEMPLATE_SCHEMA_VERSION, mal: { name, kind }, [kind]: payload };
  templateStores[id] = createDraftStore(`urd-draft-template-${id}`, () => null, shellState.draftSaveError, `urd-draft-mal-${id}`);
  templateStores[id].replace(fresh);
  templateStores[id].save();
  templatesIndexStore.data.maler = [...templateIds, id];
  templatesIndexStore.save();
  templateIds = [...templateIds, id];
  shellState.setStatus(ta('status.templateSaved', { name }), 'ok');
  historyState.updateDirty();
  pushTemplatesToPreview();
}

/** The delete button in the My templates tab: confirm, remove the file draft and the index entry. */
async function handleDeleteTemplate(msg) {
  const tpl = templateStores[msg.id]?.data?.mal;
  if (!tpl) return;
  const ok = await shellState.askConfirm({ title: ta('confirm.deleteTemplate', { name: tpl.name }) });
  if (!ok) return;
  historyState.pushHistory('templates');
  if (siteState.newPageTemplate === msg.id) siteState.newPageTemplate = null;
  localStorage.removeItem(`urd-draft-template-${msg.id}`);
  localStorage.removeItem(`urd-draft-mal-${msg.id}`);
  delete templateStores[msg.id];
  templatesIndexStore.data.maler = templateIds.filter((x) => x !== msg.id);
  templatesIndexStore.save();
  templateIds = templateIds.filter((x) => x !== msg.id);
  historyState.updateDirty();
  pushTemplatesToPreview();
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const templatesState = {
  get templatesIndexStore() { return templatesIndexStore; },
  set templatesIndexStore(v) { templatesIndexStore = v; },
  get templateStores() { return templateStores; },
  set templateStores(v) { templateStores = v; },
  get publishedTemplates() { return publishedTemplates; },
  set publishedTemplates(v) { publishedTemplates = v; },
  get templatesReady() { return templatesReady; },
  set templatesReady(v) { templatesReady = v; },
  get templateIds() { return templateIds; },
  set templateIds(v) { templateIds = v; },
  initTemplates,
  pushTemplatesToPreview,
  handleSaveTemplate,
  saveTemplate,
  handleDeleteTemplate,
};
