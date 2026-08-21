/**
 * Ren skjemalogikk for skjema-pluginen (ingen DOM, ingen fetch): validering,
 * honeypot, mailto-bygging og payload-forming. Alt her enhetstestes i node;
 * index.js står for rendering og innsending.
 *
 * Besøkende-input håndteres ALDRI som HTML: verdiene URL-encodes for mailto
 * og sendes som JSON til et valgfritt endepunkt. Honeypot er et skjult felt
 * bots fyller ut; er det utfylt, er innsendingen forkastet.
 */

/** Praktisk e-postsjekk (ikke RFC-fullstendig, men fanger vanlige feil). */
export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? '').trim());
}

/**
 * Honeypot: bots fyller ut alle felt, også det skjulte. Er honeypot-feltet
 * utfylt, behandles innsendingen som spam.
 * @param {string} honeypotValue
 * @returns {boolean} true = spam (skal forkastes)
 */
export function isSpam(honeypotValue) {
  return String(honeypotValue ?? '').trim() !== '';
}

/** Gyldig kalenderdato på ISO-form (YYYY-MM-DD), slik `<input type="date">` gir. */
export function isIsoDate(value) {
  const text = String(value ?? '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return false;
  const [y, m, d] = text.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

/**
 * Validerer innsamlede verdier mot feltdefinisjonene.
 * Avkryssing bærer boolsk verdi (påkrevd = må være krysset av); nedtrekk og
 * radio med `options` godtar kun verdier fra listen (vern mot tuklede
 * innsendinger til endepunkt-modus); dato må være gyldig ISO-dato.
 * @param {Array<{id, label, type, required, options?: string[]}>} fields
 * @param {Record<string,string|boolean>} values
 * @param {{required?: string, email?: string, choice?: string, date?: string}} [messages] Meldingsmaler ({label} byttes inn)
 * @returns {{ ok: boolean, errors: Record<string,string> }}
 */
export function validate(fields, values, messages = {}) {
  // Meldingsmalene kan overstyres (index.js sender besøkende-språkets
  // tekster via t()); standardene er bokmål så node-testene er selvbærende.
  const requiredMsg = messages.required ?? '{label} må fylles ut';
  const emailMsg = messages.email ?? 'Skriv en gyldig e-postadresse';
  const choiceMsg = messages.choice ?? 'Velg et av alternativene';
  const dateMsg = messages.date ?? 'Skriv en gyldig dato';
  const errors = {};
  for (const field of fields) {
    // Boolsk før strengtvang: String(false) er en ikke-tom streng og ville
    // sluppet en påkrevd, avkrysset-fri boks gjennom.
    if (field.type === 'checkbox') {
      if (field.required && values[field.id] !== true) {
        errors[field.id] = requiredMsg.replaceAll('{label}', field.label);
      }
      continue;
    }
    const value = String(values[field.id] ?? '').trim();
    if (field.required && !value) {
      errors[field.id] = requiredMsg.replaceAll('{label}', field.label);
      continue;
    }
    if (!value) continue;
    if (field.type === 'email' && !isEmail(value)) {
      errors[field.id] = emailMsg;
    } else if ((field.type === 'select' || field.type === 'radio')
      && Array.isArray(field.options) && !field.options.includes(value)) {
      errors[field.id] = choiceMsg;
    } else if (field.type === 'date' && !isIsoDate(value)) {
      errors[field.id] = dateMsg;
    }
  }
  return { ok: Object.keys(errors).length === 0, errors };
}

/** «Felt: verdi»-linjer, én per felt med verdi (ren tekst, til e-postkropp).
 *  Avkrysset boks blir ja-ordet (opts.yes); en tom boks utelates som andre
 *  tomme felt. */
function bodyLines(fields, values, opts = {}) {
  const yes = opts.yes ?? 'Ja';
  return fields
    .map((field) => {
      const raw = values[field.id];
      const value = field.type === 'checkbox' ? (raw === true ? yes : '') : String(raw ?? '').trim();
      return [field.label, value];
    })
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
}

/**
 * Bygger en mailto-URL med emne og kropp fra feltene (alt URL-encodet).
 * @param {string} recipient mottakeradresse
 * @param {string} subject
 * @param {Array} fields
 * @param {Record<string,string|boolean>} values
 * @param {{yes?: string}} [opts] ja-ordet for avkryssingsfelt (besøkende-språket)
 * @returns {string|null} null hvis mottakeren mangler
 */
export function buildMailto(recipient, subject, fields, values, opts = {}) {
  const to = String(recipient ?? '').trim();
  if (!to) return null;
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  const body = bodyLines(fields, values, opts);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return query ? `mailto:${to}?${query}` : `mailto:${to}`;
}

/**
 * Payload til et eksternt endepunkt: feltverdiene pluss avsenderkontekst.
 * Honeypot utelates bevisst (den er kun en klientvakt). Avkryssingsfelt
 * sendes som ekte boolsk, resten som trimmede strenger.
 * @returns {Record<string, string|boolean>}
 */
export function buildPayload(fields, values, extra = {}) {
  const out = { ...extra };
  for (const field of fields) {
    out[field.id] = field.type === 'checkbox'
      ? values[field.id] === true
      : String(values[field.id] ?? '').trim();
  }
  return out;
}

/** Endepunktets opprinnelse (til CSP-instruksen ved blokkert innsending). */
export function endpointOrigin(url) {
  try {
    return new URL(String(url).trim()).origin;
  } catch {
    return null;
  }
}
