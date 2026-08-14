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
  "layout": { "contentWidth": 1440, "gutter": 6 },
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
  "footer": {
    "version": 1, "show": true, "align": "left",
    "brand": { "title": "Min forening", "tagline": "Et lite fellesskap for store spørsmål." },
    "columns": [
      { "title": "Sider", "links": [{ "label": "Hjem", "page": "hjem" }, { "label": "Om oss", "page": "om-oss" }] }
    ],
    "social": [{ "icon": "facebook", "url": "https://facebook.com/minforening" }],
    "copyright": "© Min forening"
  }
}
```

- **`site.icon`** (valgfri, additiv fra v0.5): nettstedsikon (favicon) som sti i `media/`; vises i nettleserfaner og bokmerker. Uten ikon brukes Urd-merket fra index.html.
- **`site.lang`** (påkrevd; fra v0.6 faktisk i bruk, ADR-0012): besøkende-språket. Styrer motorens egne tekster (knapper, datoer, skjemameldinger via `t()`), Intl-datonavnene og `<html lang>` (settes av boot; skallene hardkoder "no" kun som pre-JS-standard). Anbefalte verdier er de innebygde språkkodene `nb`, `nn`, `en-GB`, `se`, `tr` (velges i Nettsted-panelet), eller koden til en aktivert språkpakke (se `languages` under Plugins); verdien matches via `matchLang` - historisk `no` og andre nb-varianter er bokmål, sør-/lulesamisk faller til nordsamisk. En kode uten treff slås opp blant språkpakkene før den faller til bokmål. Eierens eget INNHOLD oversettes aldri (chrome følger innholdsspråket, ett språk per site). Admin-språket er uavhengig (localStorage `urd-admin-lang`, auto fra enhetsspråket) og lagres aldri i site.json.
- **`pages`** er sideregisteret. Nav-elementer peker på sider via `page`-id (eller lenker via `href`). Admin lager/endrer/sletter sider her; motoren ruter fra `path`.
- **`href` i nav-/footer-lenker** (nav.items, children, footer.columns/baseline/linkRow, footer.cta; utvidet i v0.6): ekstern lenke (`https://`, `http://`, `mailto:`, `tel:`) ELLER site-intern sti/anker via samme vokter som blokk-lenkene (`isSafeHref`): `#seksjons-id` på samme side, `/sti#seksjons-id` fra en annen side. Seksjonene rendres med DOM-id (= seksjonens `id`), så ankrene treffer nativt og ruller mykt (`scroll-behavior: smooth`); ankeret kopieres fra seksjonens Egenskaper i editoren. Interne mål får aldri `rel="noopener"`/ekstern-markering. Alt annet (javascript:, data:, protokoll-relative `//`) avvises til `#`.
- **`nav.layout`** (valgfri, additiv fra v0.5): menypunktenes plassering (`left`/`center`/`right`, standard right). Logoen står alltid først og er «Hjem»-knappen. **`nav.logo`** har tre typer: `text` (value = tekst), `image` (value = bilde-URL) og `both` (value = tekst, `image` = bilde-URL), pluss valgfrie `size` (bildehøyde px), `order` (`image-first`/`text-first`), `font`, `textSize`, `bold`, `italic` og `radius` for logotekst/-bilde.
- **`nav.sticky`** (valgfri, additiv fra v0.5, standard true): menyen følger med ved scrolling. **`nav.scroll`** (valgfri, additiv fra v0.6): scroll-adferd for klistret topplinje - `shrink` krymper menyen etter et stykke scrolling (paddingen halveres via `--urd-nav-shrink`), `hide` skjuler den ved scrolling nedover og viser den igjen ved scrolling oppover (translate på kompositoren; alltid synlig i toppsonen, dirr-vern mot småbevegelser). Utelatt = vanlig. Ignoreres for sidestilt variant og når `sticky` er false; i editorens preview er adferden kun aktiv i Ren visning (som sticky blokker), og den er alltid av mens mobilmenyen er åpen. Ren tilstandslogikk i `navScrollState` (nav-model.js). **`nav.overlay`** (valgfri, additiv fra v0.6, standard false): legg fullbredde-linjen (variant `bar`) oppå toppseksjonen i stedet for i eget bånd over den, så toppseksjonens bakgrunn fyller helt opp og en gjennomsiktig meny avslører hero bak seg. Verten tas ut av flyten (fixed ved sticky, absolute ellers), som floating; toppseksjonen bør ha nok klaring øverst. Gjelder kun `bar` - `floating`/`side-left`/`side-right` ligger allerede utenfor flyten. **`nav.style`** (valgfri, additiv fra v0.5): menyens utseende med `bg` (theme-token eller rå farge), `bgOpacity` (0..1), `blur` og `textColor`; utelatte felt gir standardutseendet.
- **`nav.items[].children`** (valgfri, additiv fra v0.6): undermeny, ETT nivå - hvert barn er `{label, page|href}` og må ha eget mål. Forelderen kan i tillegg til `children` ha eget mål (`page`/`href`): da rendres den som lenke + egen pilknapp (siden er alltid nåbar). Uten eget mål er punktet en ren åpner - hele punktet åpner undermenyen. Undermenyene følger WAI-ARIA-mønsteret «disclosure navigation» (aria-expanded/aria-controls på ekte knapper, aldri role="menu"), og i mobilmenyen (burgeren, styrt av `breakpoints.mobile`) blir de trekkspill.
- **`nav.variant`** (valgfri, additiv fra v0.6, standard `bar`): `floating` gir menyen som løsrevet pille som svever OVER innholdet (verten tas ut av flyten, hero-en starter øverst bak pillen; fixed ved sticky, absolute ellers); `floating-square` er det samme uten avrundede kanter; `floating-tab` er det samme med firkant topp og kun de to nedre hjørnene avrundet (henger ned fra toppen; med `topGap: false` blir det en nedhengende header); `side-left`/`side-right` gir fast kolonne langs kanten (body får innholds-padding; på trange vinduer under 900px rendres den som vanlig topplinje med horisontale punkter, og på mobil som topplinje med burger). I kolonnen er undermenyene trekkspill: hover åpner, men lukker aldri per punkt (det ville kortet ned kolonnen under pekeren); alle lukkes samlet når pekeren forlater menyen, og klikk virker som ellers. **`nav.style.glow`** (valgfri, additiv fra v0.6, standard false): glød rundt den flytende menyen. **`nav.style.topGap`** (valgfri, additiv fra v0.6, standard true): luft over den flytende menyen; false legger den helt i toppen. **`nav.style.hover`** (valgfri, additiv fra v0.6, standard `standard`): hover-stil for menylenkene (`underline`/`pill`/`lift-plain` = løft uten glød/`lift` = løft med glød); **`hoverGlow`** (0..1, standard 0.6) styrer glødstyrken for `lift` (gløden ligger bak teksten); **`hoverColor`**/**`hoverTextColor`** (valgfrie, additive fra v0.6) overstyrer effekt- og tekstfargen (theme-token eller rå farge, standard aksent). **`nav.style.size`** (valgfri, additiv fra v0.6, standard `md`): menystørrelse i fire trinn (`sm`/`md`/`lg`/`xl`). **`nav.style.image`** (valgfri, additiv fra v0.6): bakgrunnsbilde i menyen som sti i `media/` (data-URL i utkast); `bg`/`bgOpacity` legger seg som slør over bildet, **`imageOpacity`** (0..1) toner bildet mot bakgrunnsfargen, **`imageY`**/**`imageX`** (0..100) velger utsnittet i høyden/bredden, og **`subImage`** (standard false) bestemmer om bildet også vises i undermenyen og mobilpanelet (standard er kun fargesløret). **`nav.style.subStyle`** (valgfri, additiv fra v0.6, standard `card`): undermenyens design (`flat`/`pills`/`lines`/`flyout`); **`subPillColor`** (valgfri, additiv fra v0.6) er pille-punktenes farge for `pills` (theme-token eller rå farge, standard er undermenyens flate); **`subColumns`** (1-4, standard 1) legger punktene i rutenett. **`nav.style.sideAlign`** (valgfri, additiv fra v0.6, standard `left`): tekstjustering i den sidestilte kolonnen; **`nav.style.sidePlacement`** (valgfri, additiv fra v0.6, standard `top`): vertikal plassering av menylisten i kolonnen (`top`/`middle`/`bottom`) - eget felt, `nav.layout` gjelder kun topplinjen; **`nav.style.width`** (180-400, standard 250) er kolonnens bredde i px (dras i kolonnekanten i editoren). **`nav.style.background`** (valgfri, additiv fra v0.6): full lagbasert bakgrunn (`{version, layers}`, nøyaktig samme modell som seksjonsbakgrunnen - color/gradient/glow/grain/image/bildegalleri). Når den finnes, tegnes lagene i en backdrop bak menyinnholdet og overtar flaten (nav-elementets egen bakgrunn blir gjennomsiktig; `blur`/frosted-glass virker fortsatt), mens de gamle `bg`/`bgOpacity`/`image`/`imageX/Y`/`imageOpacity`/`subImage`-feltene kun gjelder uten lag (bakoverkompat; editoren tilbyr kun lag-editoren nå). Undermeny og mobilpanel beholder fargesløret (lagstakken gjelder hovedlinjen).
- **`footer`** (valgfri, additiv fra v0.5): delt footer nederst på ALLE sider. Enkel form (fra v0.5): `show`, `text` (linjer skilt med linjeskift) og `align`. Rik form (additiv fra v0.6): `brand` (`{title, tagline}`, tittel faller tilbake til `site.title`), `columns` (`[{title, links: [{label, page|href}]}]` - en kolonne uten gyldige lenker rendres ikke), `social` (`[{icon, url}]` der `icon` er en id fra ikonbiblioteket og `url` må være http/https/mailto/tel), `copyright` (bunnlinje; faller tilbake til `text`) og `bg` (bakgrunnsfarge, theme-token eller rå verdi, standard temaets `surface`; gammel enkel form). **`footer.background`** (valgfri, additiv fra v0.6): full lagbasert bakgrunn (`{version, layers}`, samme modell som seksjons-/nav-bakgrunnen); tegnes i en backdrop bak footer-innholdet og overtar flaten når den finnes, mens `bg` kun gjelder uten lag (bakoverkompat). Er noen av de rike feltene satt, rendres den rike footeren; ellers den gamle, byte-like tekstformen. **`footer.show`** styrer om footeren vises i det hele tatt; **`footer.hideOn`** (valgfri liste av side-id-er, additiv fra v0.6) skjuler den på utvalgte sider - standard (fraværende) er synlig på alle sider. Motoren får gjeldende side-id og skjuler footeren når id-en står i `hideOn`. Utelatt eller skjult = ingen footer. Footeren bygges KUN i Footer-panelet (site.footer), ikke som seksjon: det finnes ingen «Footer»-seksjonspreset lenger, og åtte startoppsett (Minimal/Sentrert/Kolonner/Sitemap/Nyhetsbrev/Stor CTA/Kontakt/Mega) fyller footeren fra en visuell mal-velger. **Rikere bunnlinje (additiv fra v0.6):** `baseline` (`[{label, page|href}]`) er valgfrie lenker til høyre i bunnlinja (copyright/text til venstre); «Enkel tekst» (`text`) er skjult i den rike admin-en men beholdes for gamle ikke-rike footere. **`footer.linkRow`** (`[{label, page|href}]`, additiv fra v0.6) er én sentrert doormat-lenkerad (Sentrert/Stor CTA). **`footer.columnsAlign`** (`left`/`center`) justerer overskriften til en bred (todelt) kolonne. **Kolonner** kan ha `wide: true` (todelt over to spor; ellers auto ved > 6 lenker), og rendres i et rutenett med like brede spor som kollapser responsivt. **`footer.cta`** (additiv fra v0.6) er en handlingsoppfordring: `kind: 'button'` (knapp som lenke, `page|href`) eller `kind: 'newsletter'` (e-postfelt). Nyhetsbrevet sendes til `endpoint` med `fetch` (POST JSON, inline bekreftelse `success`) - ekstern endepunkt-vert krever `connect-src` i `_headers` (ADR-0006, som skjema-pluginen); `recipient` gir mailto-fallback. `cta.big` gir den store sentrerte varianten. Ren logikk i `footer-model.js` og `footer-cta.js`.
- **`layout`** (valgfri, additiv fra v0.7, ADR-0018) binder innholdet til en designbredde: seksjonen er full vindusbredde og eier bakgrunnen, mens blokkene ligger i en sentrert innholdsflate (`.urd-canvas`) på `min(100% - 2*gutter, contentWidth)`. **`contentWidth`** er tall i px (standard 1440) eller `"full"` for ubunden fullbredde (Urds oppførsel før v0.7); tall og ikke CSS-lengde, siden editoren regner forhåndsvisningens målbredde ut fra den. **`gutter`** (standard 6) er minste sidemarg mot vinduskanten, i PROSENT AV VINDUSBREDDEN (vw); den var px til schemaVersion 2. Margen virker som et gulv og har bare effekt på skjermer smalere enn `contentWidth / (1 - 2*gutter/100)`; over den bredden er det `contentWidth` som bestemmer og den ekte margen blir større. Editoren viser den som en skala (Ingen 0, Liten 3, Middels 6, Stor 9) med det rå tallet under Avansert. Bindingen gjelder KUN over `breakpoints.mobile`: under brekkpunktet er margen 0 og flaten 100 %, så lagrede `frames.mobile` beholder betydningen sin. Site-migreringen 1 → 2 fyller feltet inn eksplisitt og 2 → 3 setter margen til standarden, så motoren og editoren aldri kan utlede hver sin verdi. Per seksjon overstyres bredden med `size.maxWidth`.
- **`grid`** er snappeverktøyet: kvadratiske ruter på `size` px; mindre = tettere/finere plassering. Seksjoner kan overstyre det, og `snap` kan slås av for helt fri plassering. Gridet påvirker aldri lagrede posisjoner.
- **`theme.tokens`** mappes 1:1 til CSS-variabler: `tokens.color.bg` → `--urd-color-bg`. Motorens `theme.js` gjør mappingen; admin redigerer tokens direkte. Fargesettet er `bg`, `surface`, `text`, `accent` og `accent-text` (additivt fra v0.6: tekst oppå aksentflater som primærknapper; uten tokenet brukes `bg` som før).
- **`theme.scheme`** og **`theme.alt`** (valgfrie, additive fra v0.6): lys/mørk-bryteren. `scheme` sier hva hovedtokens er (`light`/`dark`, standard light); `alt.tokens` (samme form som `tokens`, utelatte verdier arver hovedtemaet) gjelder i motsatt modus. Finnes `alt`, viser nav-en en sol/måne-bryter: første besøk følger `prefers-color-scheme`, et aktivt valg huskes i localStorage (`urd-theme-mode`). **`alt.auto`** (boolean, additiv fra v0.6): er `true` avledes alt-fargene automatisk fra hovedtemaet (invertert lyshet) og re-avledes når en hovedfarge endres i editoren; `false`/utelatt = eieren styrer alt-fargene selv. Rent visningsflagg for editoren; motoren bryr seg kun om `alt.tokens`.

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
      { "type": "gradient", "version": 1, "props": { "kind": "linear", "stops": [{ "color": "#0b0e14", "share": 50 }, { "color": "#1a1030", "share": 50 }], "angle": 160, "x": 0.5, "y": 0.5, "animation": "none" } },
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
- **`theme`** (valgfri streng, additiv fra v0.6): ferdig seksjonstema (rollesett) som overstyrer temaets fargetokens KUN på denne seksjonen. Verdier: `flate` (`bg` = surface), `aksent` (`bg` = accent, `text` = accent-text, accent↔accent-text byttes så knapp/lenke inverterer), `invers` (`bg` = text, `text` = bg), og fra 0.6.6.4.6 også `dus` (aksenten som svakt pastell-skjær i bg/surface), `dempet` (gråtonet sone med mykere tekst), `dyp` (invers med aksentskjær i bg/surface) og `uthevet` (kun surface tones i aksenten). Fravær = Standard (ingen overstyring). Overstyringene settes som `--urd-color-*` på seksjonens element og refererer BASIS-kopiene `--urd-base-*` (satt av `applyTheme`), aldri de levende `--urd-color-*` - ellers ville invers lage en `var()`-sykel. Fordi de er referanser, følger rollene lys/mørk automatisk. Blokkene arver via `resolveColor` → `var(--urd-color-*)`. Ukjent rolle ignoreres. Definert i `SECTION_THEMES` (`engine/theme.js`).
- **`size.minHeight`** er seksjonens minstehøyde som CSS-lengde (`85vh`, `640px`); uten den brukes blokkenes utstrekning. **`size.maxWidth`** (tatt i bruk i v0.7, ADR-0018) overstyrer nettstedets innholdsbredde for DENNE seksjonen: en CSS-lengde, eller `"full"` for kant-til-kant innhold (helter, skillelinjer). Fravær = arv `site.layout.contentWidth`.
- **`grid: null`** betyr «arv nettstedets grid»; et objekt med samme form som `site.json`-gridet overstyrer per seksjon.
- **`background.layers`** rendres i rekkefølge. Kjernelagtyper: `color`, `gradient` (også animert), `glow`, `image`, `grain` og `bildegalleri` (fra v0.6). Plugins kan definere flere.
- **`image`-laget**: et indre `.urd-bg-image`-element bærer bildet, og posisjon/størrelse styres CSS-native (samme modell som bildegalleri-laget), IKKE via transform. Modellen er FRI PLASSERING (som Figma Crop / Webflow Custom): en skala og en posisjon som virker for alle bilder. **`fit`**: `vanlig` (fri plassering, standard) eller `flislegg` (gjentar bildet som mønster). `cover`/`contain` beholdes som nøkkelord for bakoverkompat og for bildegalleri-laget. **`size`** (brøk, standard 1 = 100 %, klemt til 0.1-4 i editoren, ren `bgSize`) er breddrelativ SKALA: `background-size: {size*100}%` (auto høyde beholder forholdet), så 100 % = like bred som seksjonen. Editorens **Dekk**/**Vis hele**-knapper regner ut skalaen som fyller/viser hele bildet fra bilde- og seksjonsmål. **`x`/`y`** (standard 0.5 = sentrert) er plassering via prosent-`background-position` (ren `bgPosition`) og kan gå UNDER 0 / OVER 1 (editoren: -0.5..1.5) for å legge motivet delvis eller helt utenfor kanten. **Opplastede SVG-er auto-trimmes** (editoren måler motivets omfang via canvas-piksler og strammer `viewBox`, ren `tightSvgViewBox`/`svgViewBox`), så død plass rundt en logo ikke forstyrrer skala/posisjon. **`blur`** (px) gjør bildet uskarpt uten forsettlig forstørring (elementet strekkes kun så vidt utover kanten at blur-randen klippes bort). **`parallax`** (0..1, additivt, standard 0) lar bildet henge etter når man ruller: styrken styrer FARTEN (`parallaxOffset`, `MAX_SHIFT` = 0.4 for kraftig utslag). Den frie modellen (`vanlig`, som viser bildet med luft rundt) forskyves rent med `translateY` UTEN overskann, så parallaksen er zoom-fri og kraftig (større tak i `parallaxPad`). Fyllmodus (`cover`/`flislegg`) MÅ overskanne (gap ved kanten er uakseptabelt; for `cover` gir det en liten zoom, strammere tak). AV på mobil og ved `prefers-reduced-motion`. **`bleed`** (`none`/`up`/`down`/`both`, additiv, standard `none`) lar parallaksen flyte forbi seksjonskanten inn i naboen via retnings-`clip-path` (ren `bleedClip`; sidene alltid klippet så ingen sidescroll). `down`/`both` løfter laget til `z-index: 1` fordi neste seksjon kommer senere i DOM og ellers maler bakgrunnen sin oppå bleeden; laget maler da over naboens BAKGRUNN, men fortsatt under innholdet dens (blokker ligger på z>=1 senere i treet). `up` maler over forrige seksjon via tre-rekkefølgen. Laget klippes ellers til seksjonsboksen. Én passiv scroll-/resize-lytter på modulnivå driver alle parallax-lag via `requestAnimationFrame` (frakoblede lag lukes ut).
- **`gradient`-laget**: `kind` er `linear` (bruker `angle`) eller `radial` (bruker sentrum `x`/`y`, 0..1). `stops` er fargene I REKKEFØLGE langs gradienten, hver med `share` (andel plass, en vekt som normaliseres ved rendering; `share: 0` gir en hard fargekant mot nabofargen). Hver farge males i midten av sitt bånd, og CSS-en strekker første/siste farge ut til kantene. `animation` er `none`, `pan` (frem og tilbake), `pan-loop` (én vei: sirkulær gjentakende gradient der siste farge glir tilbake til første, og som følger `angle`; ren geometri i `loopGeometry`/`loopGradientCss`) eller `rotate` for lineær; `none`, `pulse` (styrken puster) eller `orbit` (sentrum svinger i bane) for radiell; ukjent/feil verdi for formen rendres uanimert. Ren logikk i `gradientRender` (`engine/backgrounds/gradient.js`).
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

- **`type`** slår opp i blokkregisteret (`Urd.blocks`). Kjerneblokker: `text`, `image`, `button`, `shape` (streker - horisontale, vertikale og skrå via `rot` - sirkler, rektangler), `video` (YouTube/Vimeo med personvennlig innbygging; CSP-en har et bevisst frame-src-unntak for de to vertene), `icon` (glyf/emoji med størrelse og temafarge), `samling` (se under), `galleri` (fra v0.6, se under), `faq` (fra v0.6, se under), samt `tidslinje`, `sitat` og `statistikk` (fra v0.6, se under). Plugins kan definere flere.
- **`faq`-blokkens props** (fra v0.6): `{ "items": [{ "q": "Spørsmål?", "a": "<p>Svar (rik tekst)</p>" }], "multi": false, "boxStyle": null }`. Akkordeon etter disclosure-mønsteret (knapp med `aria-expanded`, aldri `role="menu"`): svaret foldes ut ved klikk, `multi` lar flere svar stå åpne samtidig. Blokkens lagrede høyde er alltid den sammenfoldede (autovekst som samling-blokken, kun høyden meldes); utfolding vokser kun visuelt. `boxStyle` er kortstilen (se `boxStyle` under).
- **`tidslinje`-blokkens props** (fra v0.6): `{ "items": [{ "year": "2019", "title": "…", "text": "…" }], "variant": "venstre" | "veksler", "marker": "fylt" | "ring", "accent": null }`. Vertikal hendelsesliste langs en CSS-tegnet linje; `veksler` legger kortene annenhver side av en midtlinje. `accent` er tematoken eller hex (null = temaets aksent). Autovekst som faq (kun høyden meldes). Alle tekstfeltene er ren tekst.
- **`sitat`-blokkens props** (fra v0.6): `{ "text": "…", "attribution": "…", "role": "…", "variant": "stor" | "kort", "image": "", "accent": null }`. Semantisk `figure`/`blockquote` med attribusjon i `figcaption`; `kort` er testimonial-kortet med valgfritt portrett (`image` er sti i `media/`, data-URL i utkast). Anførselsglyfen tegnes i CSS. `accent` som tidslinjen. Autovekst (kun høyden meldes).
- **`statistikk`-blokkens props** (fra v0.6): `{ "value": "4800", "prefix": "", "suffix": "+", "label": "…", "countUp": true }`. Ett nøkkeltall med etikett; `countUp` teller opp fra null ved første entré hos besøkende (engangs-IntersectionObserver) når `value` er et rent tall (mellomrom og desimal tillatt) - ellers, ved redusert bevegelse og i editoren står tallet i sluttilstand (ADR-0011). Autovekst (kun høyden meldes).
- **`boxStyle`** (valgfri, additiv fra v0.6, på tekstboksen og faq-kortene): `{ "bg": "#…" | "<token>", "shadow": "soft" | "strong", "shadowColor": "#…" | "<token>", "border": "none" | { "color": "#…" | "<token>", "width": 1-4 }, "glass": true }`. Alle felt valgfrie; utelatt felt = basisstilen i `.urd-text-box` (temaets flatefarge og tynne kantlinje). `bg` er egen bakgrunnsfarge (blokkfarge; utelatt = temaets flate). `shadowColor` farger skyggen (utelatt = svart med typisk gjennomsiktighet). `glass` gir frostet glass (gjennomskinnelig flate + `backdrop-filter: blur`) og overstyrer `bg`; uten nettleserstøtte står den gjennomskinnelige flaten igjen. Ren logikk i `engine/box-style.js` (`boxStyleCss`).
- **`props`** er typespesifikke og eies av blokkdefinisjonens versjon/migreringer. Additive felt i bruk (eldre data mangler dem og rendres uendret): tekst har `box` (tekstboks-kort), `font` og `size` (egen font/grunnstørrelse per felt) samt `lineHeight` (enhetsløs linjeavstand, skalerer med skriftstørrelsen) og `letterSpacing` (bokstavavstand i px, kan være negativ; 0/utelatt = arv) fra v0.6; bildeblokken har fokuspunkt `x`/`y` (0..1), de ikke-destruktive justeringene `brightness`/`contrast`/`saturate` (1 = nøytral; 0 i saturate gir gråtone) og `lightbox` (fra v0.6, standard false: klikk åpner bildet i fullskjerm hos besøkende; en `href` vinner over lightboxen); ikon-blokken har `image` (eget opplastet ikon som vises i tegnstørrelsen i stedet for glyfen) og `icon` (fra v0.6: id i motorens ikonbibliotek av tegnede SVG-er, `engine/icons.js`; ikonet farges av `color` og vinner over glyfen, `image` vinner over begge, og en ukjent id faller stille tilbake til glyfen); ikon-blokkens `color` kan være et temafarge-token ELLER en egen CSS-farge (hex) - `resolveColor` skiller på formen.
- **`galleri`-blokkens props**: `{ "images": [{ "src": "/media/…", "alt": "…", "href": null, "style": { "fit": "cover", "x": 0.5, "y": 0.5, "zoom": 1, "brightness": 1, "contrast": 1, "saturate": 1 } }], "view": "grid", "columns": 3, "gap": 12, "radius": "md", "lightbox": true, "interval": 5 }`. `view` er `grid` (rutenett), `carousel` (sidescroll) eller `slides` (lysbilde med automatisk fremrykk hvert `interval` sekund; står stille ved redusert bevegelse). `style` per bilde er samme ikke-destruktive vokabular som bildeblokken. `lightbox` åpner bildet i fullskjerm ved klikk hos besøkende; `href` per bilde vinner over lightboxen. Rutenettet vokser automatisk med innholdet (kun høyden meldes, som samling-blokken).
- **`mobileOrder`** (valgfri, additiv fra v0.5): overstyrer blokkens sorteringsnøkkel i mobil-leserekkefølgen, tolket på samme skala som desktop-y. Seksjonsmalene bruker den til å holde kort samlet (ikon + boks) i stedet for at y-sorteringen splitter kortene i bånd.
- **`sticky`** (valgfri, additiv fra v0.6): «fest ved scrolling» - `{ "offset": 16, "until": null }`. Blokken festes `offset` px fra vindustoppen når den scrolles dit, og slipper når egen seksjon er forbi (`until: null`) eller først når seksjonen med id `until` er passert. Er en topplinje klistret, legges menyhøyden automatisk til avstanden, så blokken fester seg under menyen i stedet for bak den. Scroll-festing er kun desktop (radnettet er dokumentflyt); skjermdokking (`mode: 'screen'`) gjelder også mobil, der blokken dokkes mot sin egen målte størrelse. Festingen er JS-styrt (`engine/sticky.js` + rene funksjoner i `sticky-model.js`); i editorens preview er den aktiv også med redigeringshåndtak på, men suspenderes mens en blokk dras eller endrer størrelse. En ukjent/slettet `until`-id degraderer til egen seksjons grense. Tre additive felt fra v0.7:
  - **`mode`** (`scroll`/`screen`, standard `scroll`): `screen` dokker blokken i et fast punkt i vinduet for HELE siden i stedet for å feste den ved vindustoppen når den nås. `until` gjelder ikke i denne modusen.
  - **`dock`** (standard `bottom-right`): ankerpunktet ved `mode: 'screen'`, satt sammen av vertikal og horisontal akse (`top`/`middle`/`bottom` og `left`/`center`/`right`). `offset` er da avstanden fra de kantene blokken dokkes til; senterakser sentreres og ignorerer den. I editoren kan en dokket blokk dras: slippet velger nærmeste ankerpunkt (`nearestDock` i `sticky-model.js`) i stedet for å skrive desktop-framen.
  - **`group`** (seksjons-id-form, standard null): blokker med samme gruppe-id festes og slippes som ÉN enhet og beholder plasseringen seg imellom, i stedet for at alle legger seg oppå hverandre ved vindustoppen. Gruppen måles som sin omsluttende boks (`groupBox`), og det FØRSTE medlemmet i seksjonens blokkrekkefølge styrer `offset`, `until`, `mode` og `dock` for hele gruppen. En gruppe hører til ÉN seksjon (editorens flerutvalg er seksjonsavgrenset); medlemmer lagt til på tvers av seksjoner ved håndredigering måles mot det første medlemmets seksjon.
- **`frames`** er plassering per breakpoint, i **fysiske enheter**: `x`/`w` i prosent av INNHOLDSFLATEN (`.urd-canvas`, altså `site.layout.contentWidth` eller seksjonens `size.maxWidth`; var prosent av hele vindusbredden før v0.7, se ADR-0018), `y`/`h` i px (`y` kan være negativ: blokken henger da over seksjonstoppen, seksjoner klipper aldri), `z` er lagrekkefølge, `rot` er grader. Gridet i site.json er KUN et snappeverktøy ved redigering; å endre det flytter aldri innhold.
- **`frames.mobile`** er mobil-overstyringen PER BLOKK (schemaVersion 2, ADR-0019). `null` betyr at blokken følger desktop: den auto-plasseres i radnettet i leserekkefølge (sortert på desktop-`y`, deretter `x`; `mobileOrder` overstyrer nøkkelen), tekst og autovoksende blokker får naturlig høyde. Et objekt er en PARTIELL plassering `{x?, w?, row?, rows?, z?, rot?}`: kun feltene som står der overstyrer. Uten `row` flyter blokken fortsatt (f.eks. `{"w": 60}` = kun bredden overstyrt); med `row` er den pinnet til eksplisitte radspor. Formen var en full frame `{x, y, w, h}` til schemaVersion 1; migreringen 1 → 2 konverterer.
- **Radnettet** (ADR-0019): på mobil er innholdsflaten et CSS-grid med én kolonne og `minmax(8px, auto)`-rader (`MOBILE_ROW = 8` i `engine/migrate.js`, en modellkonstant uavhengig av `grid.size`). Radene VOKSER når innholdet er høyere enn spennet, så en radposisjon er en posisjon i komposisjonen, ikke en frossen pikselavstand: vokser tekst over en pinnet blokk, følger blokken med. Auto-plasseringen er sparse (aldri dense), så flytende blokker aldri legger seg oppå pinnede bånd; pinnet-mot-pinnet-overlapp er lov (`z` gjelder). Publisert render er en ren funksjon av lagrede data (ADR-0001): radvekst er nettleserens CSS, ingen JS-reposisjonering hos besøkende.
- **`decor`** (valgfri, standard false): dekor-blokker (typisk streker/sirkler) utelates fra entré-animasjonens innholdsbølge (stagger) og fra oppsettsbytte (Bytt oppsett flytter aldri dekor). Fra schemaVersion 2 (ADR-0019) er mobilskjulingen flyttet til `hideMobile`.
- **`hideMobile`** (valgfri, standard false, additiv fra v0.7, ADR-0019): skjul blokken på mobil. Virker i hele mobil-renderstien (også for pinnede blokker). Nye formblokker får `decor: true` og `hideMobile: true` fra paletten; migreringen 1 → 2 setter `hideMobile: true` på alle blokker som hadde `decor: true`.
- **`animation`** (valgfri): `{ "type": "fade-in", "version": 1, "props": { "duration": 600, "delay": 0 } }` - animasjoner er registertyper med samme migreringskontrakt. Kjernetyper (v0.5): `fade-in`, `slide-up`, `zoom-in` (inngang, spilles ved scroll-inn hos besøkende; editorens preview viser slutt-tilstanden) og `hover-lift`. `prefers-reduced-motion` respekteres. Seksjoner har samme valgfrie `animation`-felt (additivt fra v0.5). Ukjent animasjonstype viser innholdet uanimert - animasjon velter aldri en side.
- **`stagger`** (kun seksjonsnivå, additiv fra v0.6) er en GRUPPE-inngangsanimasjon: den animerer ikke seksjonen selv, men slipper seksjonens kort-blokker (`.urd-block` uten egen animasjon; dekor-blokker unntas fra 0.6.6.4.6) inn forskjøvet fra ÉN felles trigger (seksjonens synlighet). `props`: `duration`, `delay` (felles grunnforsinkelse i ms, additiv fra 0.6.6.4.6, fravær = 0), `step` (ms mellom trinn), `effect` (`fade-in`/`slide-up`/`zoom-in`) og `pattern` - `sequence` (ett trinn per kort i rekkefølge), `columns`/`rows` (kort med samme x-/y-posisjon innen en toleranse kommer samtidig, bølgen skyves bortover; ren `staggerColumnDelays`) eller `center` (utover fra midten av rekka; ren `staggerCenterDelays`).
- **`hover`** (valgfri, additiv fra v0.6): pekereffekt i samme form som `animation` (f.eks. `{ "type": "hover-lift", "version": 1, "props": {} }`), på både blokker og seksjoner. Inn-animasjonen og pekereffekten er UAVHENGIGE felt og kan kombineres (`zoom-in` inn + `hover-lift` ved peker). Eldre sider kan ha en pekereffekt lagret i `animation` (feltene var ett til 0.6.30): motoren rendrer begge felt likt, så slike data virker uendret; editoren flytter verdien til `hover` ved neste animasjonsendring.

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

Pinnede blokker følger ikke desktop lenger og kan drifte når desktop endres. Urd gjør dette til et eksplisitt, sporbart tilstandsflagg i stedet for en stille feil:

```json
"responsive": {
  "mobile": {
    "mode": "auto",
    "attention": { "needed": true, "reason": "desktop-changed-after-mobile", "since": "2026-08-13T14:02:00Z" }
  }
}
```

Regler (schemaVersion 2, ADR-0019):

1. Overstyringer bor PER BLOKK i `frames.mobile` (se over). En seksjon uten overstyringer avledes helt på nytt ved hver render; ingenting kan drifte, og `attention` er alltid `null`.
2. I en seksjon MED overstyringer setter enhver desktop-endring (frame-endring, blokk lagt til/slettet, omorganisering) `attention.needed: true` med en maskinlesbar `reason` (engelske tokens: `layout-changed`, `block-edited`, `desktop-changed-after-mobile`, `section-height`, `block-moved`, `block-deleted`, `block-added`).
3. Flagget nullstilles ved at brukeren bekrefter «Sett som gjennomgått» i mobilvisningen, eller ved at seksjonens overstyringer nullstilles (`urd-mobile-reset`).
4. Flagget er **data** - det overlever økter, deles mellom redaktører og settes riktig selv om noen håndredigerer JSON.
5. Besøkende-motoren ignorerer flagget fullstendig; siden rendrer alltid noe fornuftig. Flagget er redaksjonell metadata.
6. `mode` er LEGACY fra schemaVersion 2: `"manual"` leses av migreringen (som konverterer de gamle materialiserte framene) og skrives aldri igjen. Feltet beholdes lesbart så gamle filer lastes riktig.

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

Lasteregelen (implementert i motorens `migrate.js`):

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
- **Filnivå:** `schemaVersion` løftes med samme stegvise mønster for strukturelle endringer, implementert i `liftPageFile()`/`liftSiteFile()` i migrate.js. Migreringstabellene er tomme siden pre-v1-innbakingen ved fase-slippet av v0.6 (utviklingsformatene ble versjon 1 igjen, se ADR-0005-addendumet); fra v1.0 fylles de ved hver strukturelle endring.

Denne kontrakten er grunnen til at en Urd-oppdatering aldri knuser en bygget side - og fra første reelle formatendring etter v1.0 skal testsuiten alltid inneholde minst én reell v(n)→v(n+1)-migrering som bevis (maskineriet selv er dekket av de syntetiske testene i `tests/migrate.test.mjs`).

## Maler

En brukerlaget mal er en serialisert seksjon, blokkgruppe eller side lagret i `content/maler/<id>.json` (id er slug av navnet, samme id-regime som samlinger) - samme form som over, med et lite metahode. Nyttelast-nøkkelen er lik `mal.kind` (`section` | `blocks` | `page`):

```json
{ "schemaVersion": 1, "mal": { "name": "Vår hero", "kind": "section" }, "section": { … } }
{ "schemaVersion": 1, "mal": { "name": "Kort-trio", "kind": "blocks" }, "blocks": [ … ] }
{ "schemaVersion": 1, "mal": { "name": "Kampanjeside", "kind": "page" }, "page": { … } }
```

- **Indeksfilen `content/maler.json`** (`{ "version": 1, "maler": ["<id>", …] }`) lister mal-id-ene, samme presedens som samlinger (ADR-0007): statiske hoster kan ikke liste mapper. Malrepoet skipper tom indeks.
- **Re-id-regelen**: id-ene i malfilen er opphav og lagres urørt; HVER innsetting dypkloner og tildeler nye id-er (seksjon og alle blokker) før noe legges i sidedata, så samme mal kan settes inn flere ganger uten kollisjon. Blokkgrupper lagres med frames som de står; anker-flytting og klem innenfor seksjonen skjer ved innsetting, aldri ved lagring (hjelperne bor i motorens `maler-model.js`). For side-maler (`kind: "page"`) gjelder i tillegg: `meta.id` og `meta.title` settes til den NYE sidens slug og tittel ved innsetting (slugen valideres mot reserverte navn og eksisterende sider, aldri en generert blokk-id), og alle seksjons- og blokk-id-er på tvers av seksjonene re-ides.
- Skjemaet er `schema/mal.schema.json` (gjenbruker page-skjemaets seksjon- og blokkdefinisjoner; `page`-nyttelasten er en hel sidefil); `npm run validate` validerer alle malene i indeksen pluss tre syntetiske caser bygget fra presets.

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
  "names": { "nb": "Kalender", "nn": "Kalender", "en-GB": "Calendar", "se": "Kaleandar", "tr": "Takvim" },
  "locales": true,
  "version": "1.0.0",
  "requiresEngine": ">=0.6.8 <1.0.0",
  "entry": "index.js",
  "provides": { "blocks": ["kalender"], "sectionPresets": ["hva-skjer"], "backgrounds": [], "animations": [], "maler": [] }
}
```

```js
// plugins/kalender/index.js
export function register(Urd) {
  Urd.blocks.define('kalender', { version: 1, /* … */ });
  Urd.sections.define('hva-skjer', { label: 'Hva skjer', /* … */ });
}
```

Valgfrie manifest-felt (alle additive):

- **`csp`** (additivt fra v0.6): eksterne opprinnelser pluginen trenger CSP-unntak for, som `{ "connectSrc": ["https://…"], "frameSrc": ["https://…"] }`. `_headers` endres aldri automatisk (ADR-0006): Plugins-panelet viser eieren nøyaktig hvilke linjer som må inn, og verten legges manuelt i `_headers`.
- **`names`** (additivt fra 0.6.8, ADR-0012): visningsnavn per admin-språk (`{ "nb": "Kalender", "en-GB": "Calendar", … }`). Admin viser `names[admin-språket]` med `name` som fallback; `name` består som obligatorisk basisnavn.
- **`locales`** (additivt fra 0.6.8, ADR-0012): `true` lover `locales/{nb,nn,en-GB,se,tr}.js` (samme form som motorens locale-filer: `export default { lang, strings }`, nøkler prefikset med plugin-id, editor-nøkler under `<id>.edit.*`). Lasteren legger tekstene i besøkende-registret med site-språket (og i preview også i admin-registret med admin-språket) FØR `register()` kjører; nb er basen, manglende språkfil faller stille til nb, og paritetstesten (`tests/i18n.test.mjs`) holder filene i synk.
- **`languages`** (additivt fra 0.6.8.10, ADR-0012): språk pluginen leverer som SPRÅKPAKKE, altså et helt nytt språk for Urd selv (ikke pluginens egne tekster, det er `locales`). Hvert innslag er `{ "code": "sv", "name": "Svenska", "site": true, "admin": false }`: `code` er en BCP 47-kode som IKKE er et av de innebygde (`nb`, `nn`, `en-GB`, `se`, `tr`), `name` er språkets eget navn slik det vises i språkvelgerne, og `site`/`admin` sier hvilke registre pakken dekker (minst ett). Innslagene lover filene `locales/site/<code>.js` og `locales/admin/<code>.js`, som har samme form og nøkler som motorens egne - bokmålsbasen ligger under, så en pakke kan dekke alt eller bare deler.

```json
// plugins/sprak-svensk/plugin.json - en REN språkpakke har ingen kode, og
// derfor verken entry eller provides
{
  "id": "sprak-svensk",
  "name": "Svensk språkpakke",
  "version": "1.0.0",
  "requiresEngine": ">=0.6.8 <1.0.0",
  "languages": [{ "code": "sv", "name": "Svenska", "site": true, "admin": false }]
}
```

`entry` og `provides` er påkrevd for alle andre plugins, men valgfrie når `languages` er oppgitt: en ren språkpakke er bare filer. Et pakkespråk blir tilgjengelig når pakken er AKTIVERT i `plugins.json`; besøkende-velgeren (`site.lang`) følger plugin-utkastet, mens admin-språkvelgeren kun tilbyr pakker som alt er publisert (det er den lista motoren leser ved oppstart).

Plugins bruker de **samme** define-API-ene som kjernen og er underlagt samme migreringskontrakt - en plugin-oppdatering kan heller aldri knuse eksisterende innhold. Deaktiveres/mangler en plugin, rendres dens blokker som plassholdere; dataene består.

**Felt-kontrakten** (additiv fra 0.6.10): en plugin-blokk-def kan ha `fields`, en liste felt som admin rendrer rett i Egenskaper-panelet i stedet for at pluginen bygger et eget config-panel. Hvert felt er `{ key, type, labelKey/label, placeholderKey/placeholder?, min?, max?, step?, options? }`:

- `key` er prop-navnet feltet skriver, `type` er en av `text`, `number` (med `min`/`max`/`step`, verdien klemmes), `toggle` (boolsk), `select` (`options: [{ value, labelKey/label }]`, rendres temastyrt) og `place`.
- `place` er et stedsfelt: teksten skrives til `key`, og koordinater til props `lat`/`lon` (konvensjon). «lat, lon»-par tolkes lokalt, `https?://`-lenker skrives urørt (pluginen tolker dem selv ved rendring), alt annet geokodes via `/api/geocode` med Søk-knappen.
- Etikettene (`labelKey`/`placeholderKey`, med `label`/`placeholder` som fallback) løses på iframe-siden der plugin-ordboka bor, og sendes ferdige i `urd-plugin-blocks`-meldingen, som `label`/`variants`.
- Uten `fields` viser Egenskaper som før en «Innstillinger …»-knapp som åpner pluginens eget config-panel i forhåndsvisningen (`urd-open-block-config`). Kart-pluginen er referansen for felt-kontrakten; kalender og skjema for config-panel-mønsteret.
