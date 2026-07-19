/**
 * Eksempel-plugin: kalender. Viser plugin-kontrakten (register(Urd) med samme define-API som kjernen).
 * Rendrer foreløpig STATISKE eksempelhendelser, tydelig merket: den feed-baserte kalenderen
 * (iCal/Google Calendar, tre visninger, se BACKLOG M3) erstatter innholdet i v0.6 M3.
 */

const SAMPLE_EVENTS = [
  { day: '11', month: 'aug', title: 'Eksempel: Oppstartskveld', meta: 'Torsdag kl. 19:00 · Klubbhuset' },
  { day: '25', month: 'aug', title: 'Eksempel: Medlemsmøte', meta: 'Torsdag kl. 18:00 · Klubbhuset' },
  { day: '8', month: 'sep', title: 'Eksempel: Høsttur', meta: 'Lørdag kl. 10:00 · Oppmøte ved parkeringen' },
];

/** @param {typeof window.Urd} Urd */
export function register(Urd) {
  Urd.blocks.define('kalender', {
    version: 1,
    label: 'Kalender',
    defaults: () => ({ source: null, view: 'list', limit: 5 }),
    migrations: {},
    render(el, props) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:grid;gap:10px;width:100%;';

      for (const event of SAMPLE_EVENTS.slice(0, props.limit ?? 5)) {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;gap:12px;align-items:center;';

        const badge = document.createElement('div');
        badge.style.cssText = 'flex:0 0 auto;width:52px;text-align:center;padding:6px 0;border:1px solid color-mix(in srgb, var(--urd-color-text) 15%, transparent);border-radius:var(--urd-radius-sm);background:var(--urd-color-surface);';
        const day = document.createElement('strong');
        day.textContent = event.day;
        day.style.cssText = 'display:block;font-size:18px;line-height:1.1;';
        const month = document.createElement('span');
        month.textContent = event.month;
        month.style.cssText = 'font-size:11px;opacity:.7;text-transform:uppercase;';
        badge.append(day, month);

        const info = document.createElement('div');
        const title = document.createElement('strong');
        title.textContent = event.title;
        title.style.display = 'block';
        const meta = document.createElement('span');
        meta.textContent = event.meta;
        meta.style.cssText = 'font-size:0.85em;opacity:.7;';
        info.append(title, meta);

        row.append(badge, info);
        wrap.appendChild(row);
      }

      const note = document.createElement('p');
      note.textContent = 'Eksempeldata fra kalender-pluginen. Ekte kalender med iCal/Google-feed kommer i neste versjon.';
      note.style.cssText = 'font-size:0.75em;opacity:.55;margin-top:4px;';
      wrap.appendChild(note);

      el.appendChild(wrap);
    },
  });
}
