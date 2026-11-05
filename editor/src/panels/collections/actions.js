/**
 * What the Collections panel's layouts write through: an entry's fields, link, picture, sizes and colours, its move and removal, and a collection's CSV out and in.
 * Built once per layout from the editor handle (`collectionActions(ed)`), so the drill-in, the two columns and the table change an entry the same way, each change one undo step through `mutateCollection`.
 */
import { ta, adminLang } from '$engine/i18n.js';
import { entriesToCsv, separatorFor } from '$engine/collections-csv.js';
import { stepAmong } from '../../lib/row-drag.js';
import { setLinkOn } from '../../lib/link-edit.js';
import { movable } from '../../lib/collection-layout.js';

export function collectionActions(ed) {
  const { mutateCollection, compressOrTrim } = ed;

  /** One entry of a collection, changed in place. */
  const onEntry = (id, entryId, key, fn) => mutateCollection(id, key, (data) => {
    const entry = data.entries.find((e) => e.id === entryId);
    if (entry) fn(entry, data);
  });

  /** A field; an empty value removes it, except the title, which is never removed. */
  function setEntryField(id, entryId, field, value) {
    onEntry(id, entryId, `edit:collection:${id}:${entryId}:${field}`, (entry) => {
      if (value === '' && field !== 'title') delete entry[field];
      else entry[field] = value;
    });
  }

  /** The entry's link from the link editor (the title links to it). */
  function setEntryLink(id, entryId, link) {
    onEntry(id, entryId, `collection:${id}:${entryId}:link`, (entry) => setLinkOn(entry, link));
  }

  /** The arrows: a step past the next entry that moves, the dated ones keeping their places. */
  function moveEntry(id, entryId, dir) {
    mutateCollection(id, `collection:${id}:move-entry`, (data) => {
      data.entries = stepAmong(data.entries, (en) => movable(data.kind, en), (en) => en.id, entryId, dir);
    });
  }

  function removeEntry(id, entryId) {
    mutateCollection(id, `collection:${id}:remove-entry`, (data) => {
      data.entries = data.entries.filter((e) => e.id !== entryId);
    });
  }

  /** One part of the picture's style from the image editor (fit, shape, zoom, rounding, focus, filters), merged into the entry's own; an empty value removes the part. */
  function setEntryImageStyle(id, entryId, field, value) {
    onEntry(id, entryId, `edit:collection:${id}:${entryId}:imageStyle:${field}`, (entry) => {
      const style = { ...(entry.imageStyle ?? {}) };
      if (value == null || value === '') delete style[field];
      else style[field] = value;
      if (Object.keys(style).length) entry.imageStyle = style;
      else delete entry.imageStyle;
    });
  }

  /** Sizes typed into the add field join the entry's sizes, one or several divided by commas, each once. */
  function addEntrySizes(id, entryId, text) {
    const typed = text.split(',').map((s) => s.trim()).filter(Boolean);
    if (!typed.length) return;
    onEntry(id, entryId, `collection:${id}:${entryId}:sizes`, (entry) => {
      const sizes = Array.isArray(entry.sizes) ? entry.sizes : [];
      entry.sizes = [...sizes, ...typed.filter((t) => !sizes.includes(t))];
    });
  }

  function removeEntrySize(id, entryId, index) {
    onEntry(id, entryId, `collection:${id}:${entryId}:sizes`, (entry) => {
      if (!Array.isArray(entry.sizes)) return;
      entry.sizes = entry.sizes.filter((_, i) => i !== index);
      if (!entry.sizes.length) delete entry.sizes;
    });
  }

  /** A new colour first in the list, named with the seed words the caller selects so typing names it. */
  function addEntryColor(id, entryId) {
    onEntry(id, entryId, `collection:${id}:${entryId}:colors`, (entry) => {
      entry.colors = [{ name: ta('ph.colorName') }, ...(entry.colors ?? [])];
    });
  }

  function setEntryColor(id, entryId, index, field, value) {
    onEntry(id, entryId, `edit:collection:${id}:${entryId}:color:${index}:${field}`, (entry) => {
      const color = entry.colors?.[index];
      if (!color) return;
      // The name can never be emptied (the schema requires it); the image can be removed.
      if (field === 'image' && !value) delete color.image;
      else if (value) color[field] = value;
    });
  }

  async function setEntryColorImage(id, entryId, index, event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file, 'entry');
      setEntryColor(id, entryId, index, 'image', img.dataUrl);
    } catch (err) {
      // A picture that cannot be taken (an animation over the limit) says why, as every upload does.
      ed.setStatus(ed.imageErrorText(err), 'error');
    }
  }

  function removeEntryColor(id, entryId, index) {
    onEntry(id, entryId, `collection:${id}:${entryId}:colors`, (entry) => {
      if (!entry.colors) return;
      entry.colors = entry.colors.filter((_, i) => i !== index);
      if (!entry.colors.length) delete entry.colors;
    });
  }

  /** CSV export: the entries, or only the ones named, are downloaded as <id>.csv with the kind's columns, the admin language's separator and a byte-order mark (engine/collections-csv.js). */
  function exportCollectionCsv(id, onlyIds = null) {
    const data = ed.collectionStores[id]?.data;
    if (!data) return;
    const entries = onlyIds ? data.entries.filter((e) => onlyIds.includes(e.id)) : data.entries;
    const csv = entriesToCsv(entries, ed.siteDraft?.pages ?? [], { kind: data.kind, sep: separatorFor(adminLang()), bom: true });
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /** CSV import: the chosen file is read and checked, and waits for the owner's word in the import preview (state/collections.svelte.js). */
  function importCollectionCsv(id, event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file) ed.startCsvImport(id, file);
  }

  return {
    setEntryField, setEntryLink, moveEntry, removeEntry, setEntryImageStyle,
    addEntrySizes, removeEntrySize, addEntryColor, setEntryColor, setEntryColorImage, removeEntryColor,
    exportCollectionCsv, importCollectionCsv,
  };
}
