# Skjema - datamodellen

Dette er Urds viktigste kontrakt. Alt innhold en bruker eier er JSON-filer under `content/`, formet etter dette dokumentet. Maskinlesbare utgaver ligger i [`schema/`](../schema/) og eksempeldata som validerer mot dem ligger i [`template/content/`](../template/content/).

Prinsipper som gjelder overalt:

1. **Alt versjoneres.** Filer har `schemaVersion`; hver seksjon, blokk, bakgrunnslag og animasjon har `version`. Se [migreringskontrakten](#migreringskontrakten).
2. **Data droppes aldri.** Ukjent type (manglende plugin, nyere innhold enn motor) rendres som nøytral plassholder; JSON-en beholdes urørt.
3. **Alt deriveres fra data.** Nav, ruting og adminpaneler bygges fra sideregisteret - ingenting hardkodes.

## `content/site.json`

Nettstedets rot: identitet, sideregister, navigasjon, grid og tema.

```json
{
  "schemaVersion": 1,
  "site": { "title": "Min forening", "lang": "no", "description": "" },
  "breakpoints": { "mobile": 640 },
  "grid": { "columns": 24, "rowHeight": 8, "gap": 0, "snap": true },
  "theme": {
    "version": 1,
    "tokens": {
      "color":  { "bg": "#0b0e14", "surface": "#151a23", "text": "#e8eaf0", "accent": "#7c5cff" },
      "font":   { "heading": "system-ui", "body": "system-ui" },
      "radius": { "sm": "6px", "md": "12px" },
      "space":  { "section": "clamp(3rem, 8vw, 6rem)" }
    }
  },
  "pages": [
    { "id": "hjem",   "title": "Hjem",   "path": "/",       "file": "content/pages/hjem.json" },
    { "id": "om-oss", "title": "Om oss", "path": "/om-oss", "file": "content/pages/om-oss.json" }
  ],
  "nav": {
    "version": 1,
    "logo": { "type": "text", "value": "Min forening" },
    "items": [
      { "label": "Hjem", "page": "hjem" },
      { "label": "Om oss", "page": "om-oss" },
      { "label": "Facebook", "href": "https://facebook.com/minforening" }
    ]
  }
}
```

- **`pages`** er sideregisteret. Nav-elementer peker på sider via `page`-id (eller eksterne lenker via `href`). Admin lager/endrer/sletter sider her; motoren ruter fra `path`.
- **`grid`** er standard-gridet: `columns` kolonner i bredden, rader på `rowHeight` px. Seksjoner kan overstyre det. `snap` kan slås av for helt fri plassering.
- **`theme.tokens`** mappes 1:1 til CSS-variabler: `tokens.color.bg` → `--urd-color-bg`. Motorens `theme.js` gjør mappingen; admin redigerer tokens direkte.

## `content/pages/<id>.json`

En side er en vertikal rekke seksjoner.

```json
{
  "schemaVersion": 1,
  "meta": { "id": "hjem", "title": "Hjem" },
  "sections": [ { …seksjon… }, { …seksjon… } ]
}
```

### Seksjon

En seksjon er alltid den samme generiske containeren - egen størrelse, egen bakgrunnsstabel, valgfritt grid-overstyr, og et fritt lerret av blokker. «Seksjonstyper» finnes ikke som kodeveier: hero, galleri og footer er **presets** (datafabrikker) som produserer en startseksjon du deretter kan endre fritt.

```json
{
  "id": "sec-8f2k",
  "version": 1,
  "preset": "hero",
  "size": { "minHeight": "85vh" },
  "grid": null,
  "background": {
    "version": 1,
    "layers": [
      { "type": "gradient", "version": 1, "props": { "stops": ["#0b0e14", "#1a1030"], "angle": 160, "animate": false } },
      { "type": "glow",     "version": 1, "props": { "x": 0.7, "y": 0.2, "color": "#7c5cff", "radius": 0.5, "opacity": 0.35 } },
      { "type": "grain",    "version": 1, "props": { "opacity": 0.06 } }
    ]
  },
  "blocks": [ { …blokk… } ],
  "responsive": {
    "mobile": { "mode": "auto", "attention": null }
  }
}
```

- **`preset`** er kun opphavsinformasjon («laget fra hero-preseten») - den styrer ingenting etter opprettelse.
- **`grid: null`** betyr «arv nettstedets grid»; et objekt med samme form som `site.json`-gridet overstyrer per seksjon.
- **`background.layers`** rendres i rekkefølge. Kjernelagtyper: `color`, `gradient` (også animert), `glow`, `image`, `grain`. Plugins kan definere flere.

### Blokk

```json
{
  "id": "blk-a1c9",
  "type": "text",
  "version": 1,
  "props": { "html": "<h1>Velkommen</h1>", "align": "left" },
  "animation": null,
  "frames": {
    "desktop": { "x": 2, "y": 6, "w": 12, "h": 4, "z": 1, "rot": 0 },
    "mobile": null
  }
}
```

- **`type`** slår opp i blokkregisteret (`Urd.blocks`). Kjerneblokker: `text`, `image`, `button`, `shape` (streker - horisontale, vertikale og skrå via `rot` - sirkler, rektangler) og `logo`. Plugins kan definere flere.
- **`props`** er typespesifikke og eies av blokkdefinisjonens versjon/migreringer.
- **`frames`** er plassering per breakpoint, i **grid-enheter**: `x`/`w` i kolonner, `y`/`h` i rader, `z` er lagrekkefølge, `rot` er grader.
- **`frames.mobile: null`** betyr auto-avledet mobil-layout: motoren stabler blokkene i én kolonne i leserekkefølge (sortert på desktop-`y`, deretter `x`). Et objekt er en manuell overstyring.
- **`animation`** (valgfri): `{ "type": "fade-in", "version": 1, "props": { … } }` - animasjoner er registertyper med samme migreringskontrakt (fra v0.4).

## Mobil-tilsyn

Den frie plasseringen gjør at desktop- og mobil-layout kan drifte fra hverandre. Urd gjør dette til et eksplisitt, sporbart tilstandsflagg i stedet for en stille feil:

```json
"responsive": {
  "mobile": {
    "mode": "manual",
    "attention": { "needed": true, "reason": "desktop-endret-etter-mobil", "since": "2026-07-16T14:02:00Z" }
  }
}
```

Regler:

1. `mode: "auto"` - hele mobil-layouten avledes automatisk. `attention` er alltid `null`; ingenting kan drifte.
2. `mode: "manual"` - settes idet brukeren håndjusterer minst én mobil-frame i seksjonen.
3. I en `manual`-seksjon setter **enhver** desktop-endring (frame-endring, blokk lagt til/slettet, omorganisering) `attention.needed: true` med en maskinlesbar `reason`.
4. Flagget nullstilles kun ved at brukeren åpner mobilvisningen for seksjonen og bekrefter «Sett som gjennomgått», eller setter seksjonen tilbake til `auto`.
5. Flagget er **data** - det overlever økter, deles mellom redaktører og settes riktig selv om noen håndredigerer JSON.
6. Besøkende-motoren ignorerer flagget fullstendig; siden rendrer alltid noe fornuftig (manuell frame om den finnes, ellers avledet). Flagget er redaksjonell metadata.

Admin viser badge per seksjon og en global teller: «2 seksjoner trenger mobil-tilsyn».

## Migreringskontrakten

Alle registertyper (blokker, seksjoner, bakgrunnslag, animasjoner) definerer:

```js
Urd.blocks.define('text', {
  version: 3,                      // typens nåværende versjon
  label: 'Tekst',
  defaults: () => ({ html: '<p>Ny tekst</p>', align: 'left' }),
  migrations: {
    1: (props) => ({ ...props, align: 'left' }),                          // v1 → v2
    2: (props) => ({ html: props.text ?? props.html, align: props.align }) // v2 → v3
  },
  render(el, props, ctx) { /* bygg DOM */ }
});
```

Lasteregelen (implementert i [`template/assets/engine/migrate.js`](../template/assets/engine/migrate.js)):

```js
while (data.version < def.version) {
  props = def.migrations[data.version](props);
  data.version++;
}
```

- **Stegvis:** hver migrering løfter nøyaktig én versjon. En v1-blokk møter en v4-definisjon → tre rene funksjonskall.
- **I minnet:** lasting muterer aldri repoet. JSON på disk skrives først ved neste publisering (da i løftet form).
- **Rene funksjoner:** migreringer får props inn og gir props ut. Ingen DOM, ingen sideeffekter - de kan enhetstestes trivielt.
- **Manglende migrering eller ukjent type:** plassholder-rendering, original-JSON urørt. Aldri kast, aldri slett.
- **Filnivå:** `schemaVersion` løftes med samme stegvise mønster for strukturelle endringer (f.eks. felt som flytter seg mellom objekter).

Denne kontrakten er grunnen til at en Urd-oppdatering aldri knuser en bygget side - og fra v1.0 skal testsuiten alltid inneholde minst én reell v(n)→v(n+1)-migrering som bevis.

## Maler

En brukerlaget mal er en serialisert seksjon (eller hel side) lagret i `content/maler/<navn>.json` - samme form som over, med et lite metahode:

```json
{ "schemaVersion": 1, "mal": { "name": "Vår hero", "kind": "section" }, "section": { … } }
```

«Lagre som mal» i editoren (v0.6) skriver disse; preset-velgeren viser dem side om side med kjerne-presets. En mal kan pakkes som plugin for deling.

## Plugins

Statiske hoster kan ikke liste mapper, så en indeksfil peker ut aktive plugins:

```json
// plugins/plugins.json
{ "version": 1, "enabled": ["eksempel-kalender"] }
```

Hver plugin er en mappe med manifest + ES-modul:

```json
// plugins/eksempel-kalender/plugin.json
{
  "id": "eksempel-kalender",
  "name": "Kalender",
  "version": "1.0.0",
  "requiresEngine": ">=0.1.0 <1.0.0",
  "entry": "index.js",
  "provides": { "blocks": ["kalender"], "sectionPresets": [], "backgrounds": [], "animations": [], "maler": [] }
}
```

```js
// plugins/eksempel-kalender/index.js
export function register(Urd) {
  Urd.blocks.define('kalender', { version: 1, /* … */ });
}
```

Plugins bruker de **samme** define-API-ene som kjernen og er underlagt samme migreringskontrakt - en plugin-oppdatering kan heller aldri knuse eksisterende innhold. Deaktiveres/mangler en plugin, rendres dens blokker som plassholdere; dataene består.
