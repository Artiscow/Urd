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
  "schemaVersion": 2,
  "site": { "title": "Min forening", "lang": "no", "description": "" },
  "breakpoints": { "mobile": 640 },
  "grid": { "size": 16, "snap": true },
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
    "layout": "right",
    "logo": { "type": "text", "value": "Min forening" },
    "items": [
      { "label": "Hjem", "page": "hjem" },
      { "label": "Om oss", "page": "om-oss",
        "children": [{ "label": "Facebook", "href": "https://facebook.com/minforening" }] }
    ]
  },
  "footer": { "version": 1, "show": true, "text": "© Min forening", "align": "center" }
}
```

- **`site.icon`** (valgfri, additiv fra v0.5): nettstedsikon (favicon) som sti i `media/`; vises i nettleserfaner og bokmerker. Uten ikon brukes Urd-merket fra index.html.
- **`pages`** er sideregisteret. Nav-elementer peker på sider via `page`-id (eller eksterne lenker via `href`). Admin lager/endrer/sletter sider her; motoren ruter fra `path`.
- **`nav.layout`** (valgfri, additiv fra v0.5): menypunktenes plassering (`left`/`center`/`right`, standard right). Logoen står alltid først og er «Hjem»-knappen. **`nav.logo`** har tre typer: `text` (value = tekst), `image` (value = bilde-URL) og `both` (value = tekst, `image` = bilde-URL), pluss valgfrie `size` (bildehøyde px), `order` (`image-first`/`text-first`), `font`, `textSize`, `bold`, `italic` og `radius` for logotekst/-bilde.
- **`nav.sticky`** (valgfri, additiv fra v0.5, standard true): menyen følger med ved scrolling. **`nav.style`** (valgfri, additiv fra v0.5): menyens utseende med `bg` (theme-token eller rå farge), `bgOpacity` (0..1), `blur` og `textColor`; utelatte felt gir standardutseendet.
- **`nav.items[].children`** (valgfri, additiv fra v0.6): undermeny, ETT nivå - hvert barn er `{label, page|href}` og må ha eget mål. Forelderen kan i tillegg til `children` ha eget mål (`page`/`href`): da rendres den som lenke + egen pilknapp (siden er alltid nåbar). Uten eget mål er punktet en ren åpner - hele punktet åpner undermenyen. Undermenyene følger WAI-ARIA-mønsteret «disclosure navigation» (aria-expanded/aria-controls på ekte knapper, aldri role="menu"), og i mobilmenyen (burgeren, styrt av `breakpoints.mobile`) blir de trekkspill.
- **`nav.variant`** (valgfri, additiv fra v0.6, standard `bar`): `floating` gir menyen som løsrevet pille som svever OVER innholdet (verten tas ut av flyten, hero-en starter øverst bak pillen; fixed ved sticky, absolute ellers); `floating-square` er det samme uten avrundede kanter; `side-left`/`side-right` gir fast kolonne langs kanten (body får innholds-padding; på trange vinduer under 900px rendres den som vanlig topplinje med horisontale punkter, og på mobil som topplinje med burger). I kolonnen er undermenyene klikk-styrte trekkspill (hover ville kortet ned kolonnen under pekeren). **`nav.style.glow`** (valgfri, additiv fra v0.6, standard false): glød rundt den flytende menyen. **`nav.style.topGap`** (valgfri, additiv fra v0.6, standard true): luft over den flytende menyen; false legger den helt i toppen. **`nav.style.hover`** (valgfri, additiv fra v0.6, standard `standard`): hover-stil for menylenkene (`underline`/`pill`/`lift-plain` = løft uten glød/`lift` = løft med glød); **`hoverGlow`** (0..1, standard 0.6) styrer glødstyrken for `lift` (gløden ligger bak teksten); **`hoverColor`**/**`hoverTextColor`** (valgfrie, additive fra v0.6) overstyrer effekt- og tekstfargen (theme-token eller rå farge, standard aksent). **`nav.style.size`** (valgfri, additiv fra v0.6, standard `md`): menystørrelse i fire trinn (`sm`/`md`/`lg`/`xl`). **`nav.style.image`** (valgfri, additiv fra v0.6): bakgrunnsbilde i menyen som sti i `media/` (data-URL i utkast); `bg`/`bgOpacity` legger seg som slør over bildet, **`imageOpacity`** (0..1) toner bildet mot bakgrunnsfargen, **`imageY`**/**`imageX`** (0..100) velger utsnittet i høyden/bredden, og **`subImage`** (standard false) bestemmer om bildet også vises i undermenyen og mobilpanelet (standard er kun fargesløret). **`nav.style.subStyle`** (valgfri, additiv fra v0.6, standard `card`): undermenyens design (`flat`/`pills`/`lines`/`flyout`); **`subColumns`** (1-4, standard 1) legger punktene i rutenett. **`nav.style.sideAlign`** (valgfri, additiv fra v0.6, standard `left`): tekstjustering i den sidestilte kolonnen; **`nav.style.width`** (180-400, standard 250) er kolonnens bredde i px (dras i kolonnekanten i editoren). I sidestilt kolonne betyr `nav.layout` vertikal plassering: `right` (standard) = øverst, `center` = midt på, `left` = nederst.
- **`footer`** (valgfri, additiv fra v0.5): delt footer nederst på ALLE sider - `show`, `text` (linjer skilt med linjeskift) og `align`. Utelatt eller skjult = ingen footer; footer-preseten (per-side seksjon) finnes uavhengig av denne.
- **`grid`** er snappeverktøyet (fra site-schemaVersion 2): kvadratiske ruter på `size` px; mindre = tettere/finere plassering. Seksjoner kan overstyre det, og `snap` kan slås av for helt fri plassering. Gridet påvirker aldri lagrede posisjoner.
- **`theme.tokens`** mappes 1:1 til CSS-variabler: `tokens.color.bg` → `--urd-color-bg`. Motorens `theme.js` gjør mappingen; admin redigerer tokens direkte. Fargesettet er `bg`, `surface`, `text`, `accent` og `accent-text` (additivt fra v0.6: tekst oppå aksentflater som primærknapper; uten tokenet brukes `bg` som før).
- **`theme.scheme`** og **`theme.alt`** (valgfrie, additive fra v0.6): lys/mørk-bryteren. `scheme` sier hva hovedtokens er (`light`/`dark`, standard light); `alt.tokens` (samme form som `tokens`, utelatte verdier arver hovedtemaet) gjelder i motsatt modus. Finnes `alt`, viser nav-en en sol/måne-bryter: første besøk følger `prefers-color-scheme`, et aktivt valg huskes i localStorage (`urd-theme-mode`).

## `content/pages/<id>.json`

En side er en vertikal rekke seksjoner.

```json
{
  "schemaVersion": 3,
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
- **`background.layers`** rendres i rekkefølge. Kjernelagtyper: `color`, `gradient` (også animert), `glow`, `image`, `grain` og `bildegalleri` (fra v0.6). Plugins kan definere flere.
- **`bildegalleri`-laget** (hero-galleri) blar gjennom flere bilder med myk krysstoning: `{ "images": [{ "src": "/media/…", "x": 0.5, "y": 0.5 }], "fit": "cover", "interval": 6, "fade": 1.5, "opacity": 1, "blur": 0 }`. `x`/`y` (0..1) er fokuspunkt per bilde, `interval` er sekunder mellom bytter, `fade` er toningens lengde i sekunder. Med ett bilde, eller redusert bevegelse hos den besøkende, vises kun det første bildet statisk.

### Blokk

```json
{
  "id": "blk-a1c9",
  "type": "text",
  "version": 1,
  "props": { "html": "<h1>Velkommen</h1>", "align": "left" },
  "animation": null,
  "frames": {
    "desktop": { "x": 8.33, "y": 48, "w": 50, "h": 32, "z": 1, "rot": 0 },
    "mobile": null
  }
}
```

- **`type`** slår opp i blokkregisteret (`Urd.blocks`). Kjerneblokker: `text`, `image`, `button`, `shape` (streker - horisontale, vertikale og skrå via `rot` - sirkler, rektangler), `video` (YouTube/Vimeo med personvennlig innbygging; CSP-en har et bevisst frame-src-unntak for de to vertene), `icon` (glyf/emoji med størrelse og temafarge), `samling` (se under) og `galleri` (fra v0.6, se under). Plugins kan definere flere.
- **`props`** er typespesifikke og eies av blokkdefinisjonens versjon/migreringer. Additive felt i bruk (eldre data mangler dem og rendres uendret): tekst har `box` (tekstboks-kort), `font` og `size` (egen font/grunnstørrelse per felt); bildeblokken har fokuspunkt `x`/`y` (0..1), de ikke-destruktive justeringene `brightness`/`contrast`/`saturate` (1 = nøytral; 0 i saturate gir gråtone) og `lightbox` (fra v0.6, standard false: klikk åpner bildet i fullskjerm hos besøkende; en `href` vinner over lightboxen); ikon-blokken har `image` (eget opplastet ikon som vises i tegnstørrelsen i stedet for glyfen).
- **`galleri`-blokkens props**: `{ "images": [{ "src": "/media/…", "alt": "…", "href": null, "style": { "fit": "cover", "x": 0.5, "y": 0.5, "zoom": 1, "brightness": 1, "contrast": 1, "saturate": 1 } }], "view": "grid", "columns": 3, "gap": 12, "radius": "md", "lightbox": true, "interval": 5 }`. `view` er `grid` (rutenett), `carousel` (sidescroll) eller `slides` (lysbilde med automatisk fremrykk hvert `interval` sekund; står stille ved redusert bevegelse). `style` per bilde er samme ikke-destruktive vokabular som bildeblokken. `lightbox` åpner bildet i fullskjerm ved klikk hos besøkende; `href` per bilde vinner over lightboxen. Rutenettet vokser automatisk med innholdet (kun høyden meldes, som samling-blokken).
- **`mobileOrder`** (valgfri, additiv fra v0.5): overstyrer blokkens sorteringsnøkkel i auto-avledet mobil-stabling, tolket på samme skala som desktop-y. Seksjonsmalene bruker den til å holde kort samlet (ikon + boks) i stedet for at y-sorteringen splitter kortene i bånd.
- **`frames`** er plassering per breakpoint, i **fysiske enheter** (fra schemaVersion 2): `x`/`w` i prosent av seksjonsbredden (flyter med skjermen), `y`/`h` i px (`y` kan være negativ: blokken henger da over seksjonstoppen, seksjoner klipper aldri), `z` er lagrekkefølge, `rot` er grader. Gridet i site.json er KUN et snappeverktøy ved redigering; å endre det flytter aldri innhold.
- **`frames.mobile: null`** betyr auto-avledet mobil-layout: motoren rendrer blokkene som vanlig dokumentflyt i én kolonne i leserekkefølge (sortert på desktop-`y`, deretter `x`); tekst får naturlig høyde. Et objekt er en manuell overstyring.
- **`decor`** (valgfri, standard false): dekor-blokker (typisk streker/sirkler) utelates fra auto-avledet mobil-layout. Nye formblokker får `decor: true` fra paletten.
- **`animation`** (valgfri): `{ "type": "fade-in", "version": 1, "props": { "duration": 600, "delay": 0 } }` - animasjoner er registertyper med samme migreringskontrakt. Kjernetyper (v0.5): `fade-in`, `slide-up`, `zoom-in` (inngang, spilles ved scroll-inn hos besøkende; editorens preview viser slutt-tilstanden) og `hover-lift`. `prefers-reduced-motion` respekteres. Seksjoner har samme valgfrie `animation`-felt (additivt fra v0.5). Ukjent animasjonstype viser innholdet uanimert - animasjon velter aldri en side.

## `content/samlinger/<id>.json` (samlinger)

Datablokk-mønsteret (ADR-0007): likeartede innslag som DATA, rendret av
samling-blokken med valgbar visning (`cards`/`list`/`archive`). Kontrakten
bor i `schema/collection.schema.json`.

```json
{
  "schemaVersion": 1,
  "id": "nyheter",
  "name": "Nyheter",
  "kind": "news",
  "entries": [
    { "id": "velkommen", "title": "Velkommen", "date": "2026-07-19", "text": "…", "image": "/media/…", "href": "/om-oss" }
  ]
}
```

- **`kind`** (`news`/`notices`/`publications`/`custom`) styrer hvilke felter editoren fremhever; visningene leser de felles feltnavnene.
- Innslagenes `text` er rik tekst med samme besøkende-vern som tekstblokkene (kjørbar kode strippes alltid ved rendering); `title` er alltid ren tekst.
- `content/samlinger.json` er indeksfilen (`{ "version": 1, "samlinger": ["nyheter"] }`): statiske hoster kan ikke liste mapper, samme presedens som plugins.json.
- Samling-blokkens props: `{ collection, view, limit, newestFirst }` (additive). Manglende/tom samling gir rolig tomtilstand i editoren og ingenting hos besøkende.

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

1. `mode: "auto"` - hele mobil-layouten avledes automatisk (flyt-stabling, se over). `attention` er alltid `null`; ingenting kan drifte.
2. `mode: "manual"` - settes idet brukeren håndjusterer minst én mobil-frame i seksjonen. Da **materialiseres** ALLE blokkene i seksjonen med konkrete `frames.mobile` (lest fra flyt-posisjonene i øyeblikket), så manuelle seksjoner aldri har null-blanding (motoren tåler det likevel: null faller tilbake til desktop-framen). Seksjonshøyden på mobil beregnes fra nederste mobil-frame.
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
- **Filnivå:** `schemaVersion` løftes med samme stegvise mønster for strukturelle endringer, implementert i `liftPageFile()`/`liftSiteFile()` i migrate.js. Gjennomførte løft (testet i `tests/page-migration.test.mjs`): sidefiler **v1 → v2** (juli 2026, frames fra grid-enheter til fysiske enheter; omregningen bruker gridet innholdet ble laget mot, så ingenting flytter seg) og **v2 → v3** (seksjonenes grid-overstyringer til kvadratformatet), site.json **v1 → v2** (gridet fra kolonner/radhøyde til kvadratiske ruter). Merk: siden site løftes FØR sidene, tåler v1→v2-sideløftet at kontekst-gridet allerede er på kvadratformat.

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
{ "version": 1, "enabled": ["kalender"] }
```

Hver plugin er en mappe med manifest + ES-modul (kalender-referansepluginen viser hele formen):

```json
// plugins/kalender/plugin.json
{
  "id": "kalender",
  "name": "Kalender",
  "version": "1.0.0",
  "requiresEngine": ">=0.5.0 <1.0.0",
  "entry": "index.js",
  "provides": { "blocks": ["kalender"], "sectionPresets": ["hva-skjer"], "backgrounds": [], "animations": [], "maler": [] }
}
```

```js
// plugins/kalender/index.js
export function register(Urd) {
  Urd.blocks.define('kalender', { version: 2, /* … */ });
  Urd.sections.define('hva-skjer', { label: 'Hva skjer', /* … */ });
}
```

Plugins bruker de **samme** define-API-ene som kjernen og er underlagt samme migreringskontrakt - en plugin-oppdatering kan heller aldri knuse eksisterende innhold. Deaktiveres/mangler en plugin, rendres dens blokker som plassholdere; dataene består.
