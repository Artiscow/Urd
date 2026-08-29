/**
 * CSV-import/-eksport for samlinger (funksjonskartet C12): ren logikk uten
 * DOM, testet i tests/butikk.test.mjs-naboen tests/samlinger-csv.test.mjs.
 * Modulen importeres KUN av editoren (bundles der) og holdes bevisst
 * utenfor besøkende-lukningen: besøkende trenger den aldri.
 *
 * Formatet er RFC 4180-aktig: komma-skilt, felt med komma/anførselstegn/
 * linjeskift pakkes i anførselstegn ("" er escapet anførselstegn). Første
 * rad er kolonnenavnene. Listefeltene sizes og colors skilles med «|»;
 * fargebilder følger ikke med i CSV (settes i panelet).
 */

/** Kolonnene i eksport-rekkefølge. image er sti i media/ og runde-tripper. */
const COLUMNS = ['id', 'title', 'date', 'text', 'href', 'image', 'price', 'memberPrice', 'badge', 'sizes', 'colors'];

function csvField(value) {
  const text = String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

/** Ett innslags celleverdi for en kolonne (lister og tall blir tekst). */
function cellFor(entry, column) {
  if (column === 'sizes') return (entry.sizes ?? []).join('|');
  if (column === 'colors') return (entry.colors ?? []).map((c) => c.name).join('|');
  return entry[column] ?? '';
}

/** Samlingens innslag som CSV-tekst (header + én rad per innslag). */
export function entriesToCsv(entries) {
  const rows = [COLUMNS.join(',')];
  for (const entry of entries ?? []) {
    rows.push(COLUMNS.map((column) => csvField(cellFor(entry, column))).join(','));
  }
  return rows.join('\n') + '\n';
}

/** Rå CSV-tekst → rader av celler (håndterer anførselstegn og linjeskift i felt). */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  const src = String(text ?? '');
  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') { cell += '"'; i += 1; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ',') {
      row.push(cell);
      cell = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += ch;
    }
  }
  if (cell !== '' || row.length) {
    row.push(cell);
    rows.push(row);
  }
  // Helt tomme rader (doble linjeskift, avsluttende linje) forkastes.
  return rows.filter((r) => r.some((c) => c.trim() !== ''));
}

const splitList = (value) => String(value ?? '').split('|').map((s) => s.trim()).filter(Boolean);

/**
 * CSV-tekst → innslag. Kolonnenavnene i første rad styrer tolkningen
 * (rekkefølgen er fri, ukjente kolonner ignoreres); rader uten tittel
 * hoppes over. id kan stå tom - kalleren tildeler da en ny.
 * @returns {{entries: object[], skipped: number}|null} null uten header/rader
 */
export function csvToEntries(text) {
  const rows = parseCsv(text);
  if (rows.length < 2) return null;
  const header = rows[0].map((name) => name.trim());
  if (!header.includes('title')) return null;
  const entries = [];
  let skipped = 0;
  for (const row of rows.slice(1)) {
    const raw = {};
    header.forEach((name, i) => { raw[name] = row[i] ?? ''; });
    const title = String(raw.title ?? '').trim();
    if (!title) { skipped += 1; continue; }
    const entry = { id: String(raw.id ?? '').trim(), title };
    for (const field of ['date', 'text', 'href', 'image', 'badge']) {
      const value = String(raw[field] ?? '').trim();
      if (value) entry[field] = value;
    }
    for (const field of ['price', 'memberPrice']) {
      const value = String(raw[field] ?? '').trim();
      if (value === '') continue;
      // Komma-desimal fra regneark godtas; ugyldige tall hopper over feltet.
      const n = Number(value.replace(',', '.'));
      if (Number.isFinite(n) && n >= 0) entry[field] = n;
    }
    const sizes = splitList(raw.sizes);
    if (sizes.length) entry.sizes = sizes;
    const colors = splitList(raw.colors);
    if (colors.length) entry.colors = colors.map((name) => ({ name }));
    entries.push(entry);
  }
  return { entries, skipped };
}
