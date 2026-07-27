# Elementkart: elementer, hvordan de tilbys, og hvordan de bygges

Skrevet 27. juli 2026. Dette er den tredje linsen på feltet. [FUNKSJONSKART.md](FUNKSJONSKART.md) svarer på HVA de andre byggerne har (paritet og hull), [LAERDOMMER.md](LAERDOMMER.md) svarer på HVORDAN de bygger det på arkitektur-nivå. Dette dokumentet kartlegger det fulle settet av elementer og funksjoner, HVORDAN hvert enkelt blir tilbudt til brukeren i grensesnittet, og HVORDAN hvert enkelt bygges teknisk: den moderne, standardbaserte konstruksjonen mot den gamle JS-tunge fella.

Byggemåte-delen er med av en grunn: for en avhengighetsfri vanilla-motor bor de vonde, uløselige buggene i konstruksjonen. Å bygge en karusell, accordion, modal, sticky eller parallaks på gammel måte gir feller som moderne native/CSS-teknikker rett og slett unngår.

**Byggere sett på ved navn:** Webflow, Framer, Wix (klassisk) + Wix Studio, Squarespace (Fluid Engine), WordPress Gutenberg + Full Site Editing, Elementor, Bricks, Carrd, Ghost, Publii, GrapesJS/Silex, samt AI-byggere (Wix, Framer, Hostinger, Durable, GoDaddy, B12, Squarespace Blueprint) i del 2.9.

**Om støtte-tall:** browser-støtte er per tidlig 2026 og skal ALLTID gates med `@supports`/`@media` i en råservert motor. Native og CSS-primitiver legges bak feature-deteksjon slik at nettleseren faller ned til et fungerende grunnlag. Enkelte markedstall (DOM-noder, JS-vekt) er retningsgivende.

---

## 1. Leveringsmønstre: hvordan funksjoner tilbys brukeren

Hvert mønster: hva det er, hvem som viser det godt, og hvor Urd står.

### 1.1 Innsetting (flere parallelle veier)
En «+»-palett med kategorier og søk er universell. Oppå det: slash-kommandoer (Ghost, Gutenberg, Framer), command palette med Cmd+K/E som også konverterer og velger (Webflow Quick Find, Framer, Bricks), drag med to-farge drop-indikatorer (Webflow: oransje forelder + blå posisjon), drop rett i strukturtreet (Bricks, GrapesJS), lim-inn med auto-konvertering (Markdown/HTML til blokker), og AI-generering som en innsettingshandling (Framer W / Cmd+K). Flere veier tjener både nybegynnere og kraftbrukere.

**Urd i dag:** «Blokker»-palett gruppert i kategorier + «+ Ny blokk»-meny ved pekeren + drag fra paletten. Ingen slash, ingen søk i paletten, ingen command palette.

### 1.2 Konfigurasjonsflater (tre sameksisterende lag)
Høyrepanel-inspektør + kontekstuell flytende verktøylinje (skjult til noe er valgt) + inline på lerretet. Nesten alle deler panelet i Innhold vs Stil: Gutenberg (Settings/Styles), Elementor (Content/Style/Advanced), Bricks (Content/Style + en selector-rad for ID vs global klasse), Carrd (Main/Appearance/Settings), GrapesJS (Traits vs Style Manager).

**Urd i dag:** Egenskaper-panel (kontekst) + Office-linjen (flytende, på markering) + inline klikk-og-skriv. Ikke en eksplisitt Innhold/Stil-deling.

### 1.3 Struktur/lag-tre
List View (WP), Navigator (Webflow/Elementor), Structure Panel (Bricks), Layer Manager (GrapesJS) for valg, omrokkering og låsing. Forventet så snart sider blir ikke-trivielle.

**Urd i dag:** ingen; «lagpanel» er en strekk-idé i backloggen.

### 1.4 Globalt design (token-/tema-paneler)
theme.json + Global Styles (WP), Site Settings + ett-klikks Kits (Elementor), Global Classes + Color Manager (Bricks), fargetema per seksjon + font-pakker (Squarespace), color/text styles (Framer), Element Styles (Carrd, enklest). Lys/mørk-moduser og per-breakpoint-verdier skiller de sterke.

**Urd i dag:** Tema-panel med token-swatches, tema-forslag, lys/mørk-avledning; ingen font-pakke-som-ett-valg.

### 1.5 Gjenbruk med synk
Synced vs un-synced patterns (WP), components/symbols med varianter (Framer/Bricks/Silex), Ghost snippets (lagre utvalg, dukker opp i samme innsettingspalett), Carrd Element Styles. Snippets-modellen er den letteste veien: lagre et utvalg, og det dukker opp i akkurat den samme innsettingsmenyen.

**Urd i dag:** seksjonspresets; «Lagre som mal» er planlagt (M8).

### 1.6 Tilstander og interaksjoner
To filosofier: CSS-pseudo-tilstander (Webflow: selector -> states, med arv) mot Framers variants (navngitte visuelle tilstander som dekker hover, scroll og responsiv med automatisk tweening). Framers variant-modell er den mest visuelle og enhetlige.

**Urd i dag:** entré-animasjon og hover som separate additive felt.

### 1.7 Responsiv levering
Breakpoint-switcher + desktop-ned-cascade + per-breakpoint-overrides overalt. Skillefunn: Wix Studios docking-kontroll (visuell anker mot foreldre-kanter), Squarespace' separat redigerbare mobil-layout i Fluid Engine, og Wix Responsive AI (fiks én seksjon om gangen, en avgrenset og tillitsbyggende AI-handling).

**Urd i dag:** to breakpoints, auto-stabling + manuell overstyring + mobil-tilsyn (Urds svar på Wix Studios responsive-skanner).

### 1.8 Seksjon-/mønster-/mal-gallerier
«Add section» åpner et miniatyr-galleri. Squarespace' «View Layouts» bytter hele seksjonens oppsett fra miniatyrer på hover uten å flytte blokker manuelt; Wix Studio har Wireframes og Design Kits; lagrede seksjoner er gjenbruk. Både blank og ferdigdesignet start senker blank-lerret-terskelen.

**Urd i dag:** preset-miniatyrer i «+ Ny seksjon».

### 1.9 AI og veivisere som leveringsmåte
Den dominerende nye formen: prompt til generert flersidig start til fullt redigerbart lerret (Wix, Framer, Hostinger, Durable, GoDaddy, B12, Squarespace Blueprint). Verdt å merke:
- **«Bekreft sidelisten før generering»-gate** (Hostinger) reduserer omarbeid.
- **AI-in-place:** marker tekst -> omskriv/tone; beskriv -> bilde.
- **«Add section (AI)»** dukker gjerne opp på hover mellom seksjoner.
- **Kuratert vs åpen:** Squarespace Blueprint bruker faste merkevare-personligheter og designer-palettes (guardrails gir jevnere resultat for ikke-designere); Wix/Framer/Durable er åpne samtaler.
- **Trend:** stive veivisere (Wix ADI, pensjonert nov. 2024) erstattes av samtale + fullt redigerbart lerret. Ikke bygg en blindvei-generator; alt skal være redigerbart etterpå.

**Urd i dag:** ingen. Krever en ekstern tjeneste, som står i spenn med avhengighetsfri/statisk (se del 7).

### 1.10 Tomtilstander og oppdagbarhet
Tomtilstand som innsettingsprompt («+» på tom linje, tom seksjon som sier «legg til / generer her»), søk i palett, tooltips og onboarding. AI-byggere erstatter det blanke lerretet med en generert start (anti-blank-page).

**Urd i dag:** «+ Ny seksjon»-tomtilstand; hjelpechip (ADR-0008) for funksjoner med spesialoppførsel.

---

## 2. Moderne byggeklosser (implementasjonsteknikk)

For hver: den moderne native/CSS-teknikken, den gamle måten den erstatter, bug-klassen den fjerner. Støtte-tier står i tabellen nederst i delen. Kjerneprinsippet for en råservert motor: **led med det native elementet, legg CSS-forbedringer bak `@supports`, og bruk JavaScript kun til det plattformen fortsatt ikke kan deklarativt.**

### 2.1 Komponenter

**Karusell.** Base: CSS scroll-snap (`scroll-snap-type`, `scroll-snap-align`) gir en avhengighetsfri, GPU-jevn slider som virker overalt. Forbedring: de nye CSS Carousel-primitivene lager ekte, tilgjengelige knapper og prikk-navigasjon fra selve scrolleren, uten markup og uten JS:

```css
.carousel { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scroll-marker-group: after; }
.carousel > li { scroll-snap-align: center; }
.carousel::scroll-button(right) { content: "\2192" / "Neste"; }
.carousel > li::scroll-marker { content: ""; }
.carousel > li::scroll-marker:target-current { background: var(--accent); }
```

Erstatter: Swiper/Slick/Glide eller en egen `translateX()`-motor med rAF, peker-lyttere og manuelt gjenbygde prikker og ARIA. Fjerner: ødelagt tastatur/skjermleser-semantikk, hakkete snapping, prikker som desynkroniserer, layout-thrash fra bredde-måling i en scroll-handler, og bundle-vekt. Under panseret bruker Elementor Swiper (~120KB, dokumentert ~4s mobil-straff fra én enkelt karusell).

**Accordion.** Native `<details>/<summary>` gir knapp-semantikk og tastatur gratis; `name`-attributtet gir eksklusiv (single-open) accordion; animer med `::details-content`:

```html
<details name="faq"><summary>Punkt 1</summary><p>...</p></details>
<details name="faq"><summary>Punkt 2</summary><p>...</p></details>
```

```css
::details-content { height: 0; overflow: clip; transition: height .3s, content-visibility .3s allow-discrete; }
@supports (interpolate-size: allow-keywords) { :root { interpolate-size: allow-keywords; } [open]::details-content { height: auto; } }
```

Erstatter: div + `aria-expanded` togglet av JS som animerer `max-height` mot et gjettet tall eller måler `scrollHeight`. Fjerner: «height:auto animerer ikke»-hacket, `max-height`-overskyting, tilstand-desync, manglende `aria-expanded`, og at Ctrl+F ikke åpner et JS-kollapset panel (native `<details>` deltar i finn-på-siden).

**Faner.** Ingen native element, og ingen ren HTML/CSS-kombinasjon er fullt tilgjengelig. Faner forblir stedet der man implementerer ARIA APG-mønsteret med litt JS: `role="tablist"`/`tab`/`tabpanel`, roving `tabindex` (kun én aktiv fane har `tabindex="0"`), piltaster mellom faner, `hidden` på inaktive paneler. CSS-only-faner (`:checked`/`:target`) duger til lette, ikke-kritiske brytere, men mangler tastatur- og rolle-semantikken.

**Modal og lightbox.** Native `<dialog>` + `.showModal()` gir top-layer (ingen z-index-krig), stylbar `::backdrop`, fokusfelle og fokus-retur, inert bakgrunn og Esc-lukk, alt gratis. En lightbox er bare en bilde-modal; legg scroll-snap-galleriet inni for prev/neste. `closedby="any"` gir deklarativ lett-lukk (klikk på bakteppet):

```html
<dialog id="lb" closedby="any"><img src="full.jpg" alt="..."></dialog>
<button onclick="lb.showModal()">Åpne</button>
```

Erstatter: en `position: fixed` overlay-div, hjemmelaget fokusfelle, manuell `body{overflow:hidden}`, outside-click- og Esc-lyttere, og z-index-eskalering. Fjerner: fokus som rømmer til bakgrunnen, z-index/stacking-kriger, scroll-lekkasje, og lekkede globale lyttere. `closedby` mangler i Safari stabil -> en 4-linjers JS-fallback (lukk når klikkmålet er selve `<dialog>`).

**Popover og meny.** Popover API: sett `popover` på et element og koble en trigger med `popovertarget`. Null JS for åpne/lukke, top-layer, og lett-lukk. `auto` (dropdowns/menyer), `manual` (vedvarende paneler), `hint` (tooltips over en åpen meny).

```html
<button popovertarget="meny">Meny</button>
<div id="meny" popover><a href="/a">Profil</a><a href="/b">Innstillinger</a></div>
```

Erstatter: JS dropdown-widgets med egen åpen-tilstand, outside-click-lytter, Esc-håndtering og z-index-styring. Fjerner den evige outside-click-fella («klikket som åpnet den lukker den straks») og at dropdowns klippes av `overflow: hidden`.

**Tooltip og forankret UI.** CSS Anchor Positioning fester et element til et anker og flipper det for å holde seg på skjermen, i ren CSS kombinert med en popover:

```css
.trigger { anchor-name: --btn; }
.tooltip { position: fixed; position-anchor: --btn; position-area: block-start center; position-try-fallbacks: flip-block; }
```

Erstatter: Popper.js / Floating UI, som leser `getBoundingClientRect()` på hver scroll/resize og skriver inline-transform hver frame. Fjerner scroll/resize-lytter-reflow-loopen og at popovers klippes. IKKE baseline (~82% tidlig 2026) -> gate med `@supports (anchor-name: --x)`, statisk fallback.

**Sticky.** `position: sticky` med en terskel holder elementet i flyt og pinner det under scroll, uten JS. `scroll-state(stuck)` container queries kan restyle en header i det den fester seg. Feller å kode: sticky svikter stille hvis en forfar mellom elementet og scroll-roten har `overflow: hidden|auto|scroll` (bruk `overflow: clip` når du bare vil klippe); det sitter kun innenfor sin containing block. Bruk `position: fixed` for elementer som skal klistres til viewporten (cookie-banner, flytende hjelpeknapp), men merk at en forfar med `transform`/`filter`/`backdrop-filter`/`contain` bryter `fixed` til å bli container-relativ, en vanlig, subtil bug.

### 2.2 Layout og responsiv

**Innholdsvoksende rader (Fluid Engine-teknikken).** Fast kolonne-grid + rader som vokser med innhold, ren CSS ved kjøring:

```css
.canvas { display: grid; grid-template-columns: repeat(24, 1fr); grid-auto-rows: minmax(2.5vw, auto); gap: clamp(8px, 1.5vw, 24px); }
.block { grid-column: 3 / span 8; grid-row: 2 / span 3; }
```

`minmax(min, auto)` reserverer en minstehøyde men lar raden vokse i stedet for å overflyte. Squarespace Fluid Engine lagrer blokker som grid-koordinater (ikke piksler) og lar CSS Grid gjøre responsiv plassering, uten JS-reposisjon ved resize. Erstatter JS-layoutmotorer som leser `getBoundingClientRect()` og setter `position:absolute` i piksler.

**Subgrid** (baseline widely available) lar en nestet grid arve foreldrenes spor, så korttitler/-brødtekst/-føtter stiller på linje uten JS «equal height». **Container queries** + `cqi`-enheter (baseline) styrer en komponent etter sin egen container, ikke viewporten, i stedet for JS bredde-vakt. **`clamp()`** gir flytende type/space uten resize-JS eller trappetrinns-media queries. **`:has()`** (baseline) styrer foreldre/tilstand uten JS (`body:has(dialog[open]) { overflow: hidden }`).

**Masonry er IKKE klart.** Native masonry (`display: grid-lanes` / `item-flow` / `flow-tolerance`) er i flyt i CSS-arbeidsgruppen, kun bak flagg/Tech Preview, og syntaksen flyttet så sent som januar 2026. Ikke stol på det ennå; bruk `columns` kun der visuell rekkefølge kan skrambles, ellers et vanlig `auto-fill`-grid, og gate framtidig native masonry bak `@supports`.

### 2.3 Tema uten FOUC

Custom properties for tokens; `@property` gjør dem typet så de kan animeres. `light-dark()` (baseline mai 2024), `color-mix()` og relative farger (nyere, ~87-90%) gir tinter og skygger uten preprosessor. `prefers-color-scheme` + `color-scheme` gjør at native kontroller og scrollbar matcher temaet. Poenget: riktig CSS maler korrekte farger ved FØRSTE paint, så det er ingen tema-flash uten JS. Kun en manuell overstyring trenger et lite blokkerende inline-skript i `<head>` som setter `data-theme` før body males.

```css
:root { color-scheme: light dark; --bg: #fff; --bg: light-dark(#fff, #111); }
:root[data-theme="dark"] { color-scheme: dark; --bg: #111; }
```

Regel: plasser en vanlig fallback-farge FØR `light-dark()`/`oklch()`-linjen, så gamle motorer bruker fallback og nye overstyrer.

### 2.4 Media og ytelse

Native responsive bilder + eksplisitte mål + native lastehint:

```html
<picture>
  <source type="image/avif" srcset="hero-800.avif 800w, hero-1600.avif 1600w" sizes="100vw">
  <source type="image/webp" srcset="hero-800.webp 800w, hero-1600.webp 1600w" sizes="100vw">
  <img src="hero-1600.jpg" width="1600" height="900" fetchpriority="high" decoding="async" alt="...">
</picture>
```

`width`/`height` eller `aspect-ratio` reserverer plass og dreper CLS. `loading=lazy` + `decoding=async` for under folden (men aldri `loading=lazy` på LCP-bildet). `content-visibility: auto` hopper over render av seksjoner utenfor skjermen. `<picture>` degraderer AVIF -> WebP -> JPEG automatisk. Erstatter JS lazy-loadere og JS som målte viewport for å velge bildestørrelse.

### 2.5 Motion

**Scroll-drevne animasjoner** kjører på kompositor-tråden med ~0ms scripting, i stedet for rAF/scroll-listener:

```css
.reveal { animation: fade-in linear both; animation-timeline: view(); animation-range: entry 0% cover 30%; }
@keyframes fade-in { from { opacity:0; translate:0 2rem } to { opacity:1; translate:0 } }
```

Firefox har dette bak flagg tidlig 2026 -> gate med `@supports (animation-timeline: view())`; fallback = elementet står i sluttilstand (aldri skjult). **`@starting-style` + `transition-behavior: allow-discrete`** animerer inn/ut av `display:none` og top-layer i ren CSS (Safari mangler `overlay allow-discrete`, så top-layer-lukk snapper der). **View Transitions API**, spesielt CROSS-DOCUMENT (`@view-transition { navigation: auto }`, null JS), er ideelt for et statisk flersides nettsted. **`scroll-behavior: smooth`** for ankerlenker. **`prefers-reduced-motion`** som vakt over alt dette.

**Observers er fortsatt riktig for LOGIKK, ikke animasjon:** `IntersectionObserver` for impresjoner, aktiv-seksjon-uthevning, lazy-instansiering, video play/pause; `ResizeObserver` for canvas-backing-størrelse og JS-diagrammer. Begge unngår scroll/resize-lytter-anti-mønsteret.

### 2.6 Hvordan byggerne konstruerer (under panseret)
- **Squarespace Fluid Engine:** grid-koordinater, ingen JS-reposisjon.
- **Wix Studio:** grid + docking mot foreldre-kanter.
- **Bricks mot Elementor:** ~9 noder/1 wrapper mot ~23/4 for samme hero; div-suppe koster LCP og minne.
- **Framer Motion:** oppdager `ScrollTimeline` og gir animasjonen til kompositor, bruker pooled `IntersectionObserver`, og animerer kun `transform`/`opacity`.
- **Rik tekst:** Ghost (Lexical), ProseMirror og Slate bruker en DOKUMENTMODELL som sannhet og behandler `contenteditable` kun som input/render-flate, fordi rå contenteditable gir inkonsistent DOM på tvers av nettlesere, ødelagt seleksjon/caret, paste-søppel og manglende undo.

### Støtte-tier (tidlig 2026, alltid gated)

| Teknikk | Status | Strategi |
|---|---|---|
| scroll-snap, `<dialog>`/`showModal`/`::backdrop`, `position: sticky`, CSS Grid, flex `gap`, `clamp()`, `:has()`, `aspect-ratio`, `prefers-reduced-motion` | Universell baseline | Bruk direkte |
| Popover API (`auto`/`manual`), `<details name>`, subgrid, container queries, `light-dark()`, `color-mix()`, `@property`, `@starting-style`+`allow-discrete` | Baseline (ny) ~90%+ | Bruk; liten fallback for halen |
| `::details-content`, View Transitions (same-doc + cross-doc), scroll-drevne animasjoner | Bred, men ikke overalt (Firefox/Safari-hull) | Gate med `@supports`; degrader til sluttilstand |
| `::scroll-button`/`::scroll-marker`, `scroll-state()`, anchor positioning, `closedby`, `appearance: base-select`, `interpolate-size` | Kun nyeste (ofte Chromium) | Ren progressiv forbedring |
| Native masonry (`grid-lanes`/`item-flow`) | Flagg/Tech Preview, i flyt | Ikke stole på ennå |

---

## 3. Element-/funksjonskatalog (referanse)

Per kategori, med (a) hvordan det tilbys og (b) slik bygges det moderne. For paritet (hva Urd har mot de andre), se [FUNKSJONSKART.md](FUNKSJONSKART.md).

- **Layout/struktur** (section, container, grid, stack/columns, spacer, divider). Tilbys: droppes fra palett eller strukturtre; container-først-modellen (Elementor/Bricks). Bygges: CSS Grid/Flex + `gap`; `<hr>` for divider; unngå absolutt posisjonering for struktur.
- **Typografi** (heading, rik tekst, liste, sitat, tabell, innholdsfortegnelse). Tilbys: inline + flytende verktøylinje; blokk-konvertering (transform-to). Bygges: semantiske `<h1>`-`<h6>`/`<p>`/`<ul>`; rik tekst med dokumentmodell, ikke rå contenteditable; `<table>` med `overflow-x:auto`-wrapper.
- **Media** (bilde, galleri, video, lyd, ikon, SVG, bakgrunn). Tilbys: opplasting/utforsk-bibliotek; galleri som flere VISNINGER (rutenett/karusell/lysbilde), ikke egne elementer (Squarespace, og Urd gjør dette). Bygges: `<picture>`/`srcset`/`aspect-ratio`; galleri-karusell med scroll-snap; personvern-embed for video.
- **Interaktivt** (knapp, skjema + felttyper, accordion, faner, slider/karusell, modal/popup, tooltip, nedteller, søk, kart, kalender). Tilbys: palett + kontekst-panel; brede skjema-felttype-bibliotek (nedtrekk/avkryssing/radio/dato/fil/steg). Bygges: se del 2.1 (native `<details name>`, `<dialog>`, Popover API, scroll-snap, anchor positioning); skjema med native `required`/`type`/Constraint Validation.
- **Dynamisk** (collection list/repeater/query loop, feltbinding, blogg, RSS, breadcrumbs, paginering). Tilbys: dynamiske data som egne draggbare blokker (Query Loop, Loop Grid) i stedet for skjulte tokens; design ett element som mal, bind til et spørsmål. Bygges: bak data inn i statisk HTML ved publisering (se LAERDOMMER, build-time bake); statisk RSS/sitemap ved publisering.
- **Handel** (produkt, produktliste, kurv, kasse, kjøp-knapp, variant). Tilbys: dedikerte element-sett som dukker opp når butikk er på. Bygges: statisk katalog + kasse-som-skjema (Urds v0.7-modell), gateway utenfor kjernen.
- **Sosial/embed** (sosiale ikoner, feeds, delingsknapper, embed/HTML/kode). Tilbys: ikon-velger, embed-lim. Bygges: tegnede SVG-ikoner; embed sanert (aktivt innhold strippes med vilje; plugin + CSP-opt-in er veien).
- **Navigasjon** (navbar, dropdown, mega meny, footer, site-deler). Tilbys: egne paneler + template parts. Bygges: disclosure-mønster (ADR-0010) eller Popover API + anchor positioning for menyer; ingen `role="menu"`.
- **Dekorativt** (shapes, backgrounds, animasjoner). Tilbys: former som blokker, bakgrunnslag-editor. Bygges: SVG/CSS; scroll-drevne CSS-animasjoner bak `@supports`.

---

## 4. Hva Urd gjør i dag, mot mønstrene og teknikkene

**Leveranse-siden.** Urd treffer allerede flere leveringsmønstre: inline klikk-og-skriv + Office-linjen (1.2), preset-miniatyrer (1.8), token-swatches i Tema-panelet (1.4), tomtilstand + hjelpechip (1.10), temastyrt Dropdown (aldri native select). Tynt i dag: ingen slash/søk-innsetting eller command palette (1.1), ingen Innhold/Stil-splitt (1.2), ingen struktur/lag-tre (1.3), ingen gjenbrukbare grupper (1.5).

**Bygge-siden.** Urd koder allerede flere av de moderne invariantene fra del 2 og 7: `crypto.getRandomValues` (ikke `randomUUID`), AbortController-skopede lyttere som kobles fra ved rerender, autovekst som melder KUN høyde (ingen teleport), ingen native select i temastyrt UI, hover vaktet med `pointerType === 'mouse'`, snapshot før `postMessage`, `IntersectionObserver` for entré, faq som disclosure, og målt runner for sømløs pan-loop-gradient. Mulige flytt til native/CSS: faq -> `<details name>`; egen lightbox -> `<dialog>`; egne menyer -> Popover API; rAF-parallaks -> scroll-drevet CSS bak `@supports`; sticky-JS der `position: sticky` holder.

---

## 5. Hva vi kan hente (prioritert)

Rangert etter (passform x verdi / innsats). Rene funksjonshull (SEO, galleri, RSS osv.) er prioritert i [FUNKSJONSKART.md](FUNKSJONSKART.md#anbefalingene-c-funnene-prioritert); dette er leverings- og byggemåte-grep.

### 5a. Leverings-grep (grensesnitt/UX)
1. **Innhold/Stil-splitt + panelspråk-utrulling** (backlog-punkt F/M6). Svært høy passform. Middels innsats.
2. **Slash-kommando + søkbar innsettingspalett.** Høy passform med Office-linjen. Middels.
3. **Gjenbrukbare grupper (snippets-modellen).** Høy. Middels. Bygger på M8 «Lagre som mal».
4. **Seksjons-galleri med «bytt oppsett».** Høy. Middels.
5. **Struktur/lag-tre.** Høy. Middels.
6. **Tydeligere drop-target (to-farge-indikator).** Middels-høy. Lav-middels.
7. **Kuraterte designtokens som ett valg** (font-pakker + palett-temaer). Høy. Lav-middels.
8. **Command palette (Cmd+K).** Middels-høy (kraftbrukere). Middels.
9. **Rikere tomtilstander** (preset-forslag i tom seksjon/side). Høy. Lav.
10. **AI-veiviser (opt-in, horisont).** Lav uten videre (krever ekstern tjeneste, mot avhengighetsfri). Høy. Kun som valgfritt tillegg via endepunkt.

### 5b. Byggemåte-grep (native/CSS som sletter skjør JS)
1. **Native top-layer for overlegg:** `<dialog>`/`showModal()` for lightbox/modal, Popover API for menyer. Fjerner z-index-krig, fokusfeller og outside-click-lyttere. Svært høy passform (Urd er vanilla). Middels.
2. **`<details name>` for accordion/faq** (eksklusiv, finn-på-siden, null JS). Høy. Lav-middels.
3. **CSS scroll-snap** (+ CSS carousel-primitiver bak `@supports`) for galleri-karusell. Høy. Middels.
4. **Scroll-drevne CSS-animasjoner** for entré/parallaks bak `@supports` (fallback = sluttilstand), i stedet for rAF/scroll-listener. Høy. Middels.
5. **`light-dark()` + `color-scheme`** (+ inline `<head>`-tema-skript for manuell overstyring) for tema uten FOUC. Middels-høy. Lav-middels.
6. **`aspect-ratio` + `srcset`/`<picture>`/AVIF/`content-visibility`** (kobler til planlagt v0.8 responsive bilder). Høy. Middels.
7. **Minimal-wrapper markup + per-side betinget lasting** av komponent-CSS/JS (kun der komponenten er på siden). Høy. Middels.
8. **Cross-document View Transitions** (ren CSS) for side-overganger på det statiske nettstedet. Middels. Lav-middels.
9. **Container queries + subgrid + `:has()`** der Urd i dag ville trengt JS eller media queries. Middels-høy. Middels.

---

## 6. Gammel måte -> bug -> moderne fiks

«Urd»-kolonnen: har = allerede kodet, kode = verdt å kode/flytte.

| Gammel måte | Bug den gir | Moderne fiks | Urd |
|---|---|---|---|
| scroll/resize-lyttere som gjør layout; ikke-passive touch/wheel | jank; blokkert scroll; hundrevis av reflows/sek | `{passive:true}`; IntersectionObserver/ResizeObserver; scroll-drevet CSS | delvis |
| absolutt posisjonering + eskalerende z-index | z-index-krig; overlegg fanget i en stacking-context | grid/flex for layout; top-layer via `<dialog>`/Popover | kode |
| rerender som river innerHTML og re-fester lyttere | stablede lyttere; elementer teleporterer; tapt fokus/scroll | reconciliation med stabile id-er; AbortController; meld kun høyde | har (delvis) |
| native `<select>` i temastyrt UI | uleselig OS-chrome; brutt mørkt tema | Popover/anchor eller `appearance: base-select` | har |
| `:hover`/`mouseover` for interaktiv UI | hengende hover på touch/hybrid | `@media (hover:hover)` + `pointerType==='mouse'` | har |
| `crypto.randomUUID()` for id-er | undefined/kast på usikker opprinnelse | `crypto.getRandomValues()` | har |
| tema/størrelse via JS etter last; bilder uten mål | FOUC/tema-flash; CLS-layout-hopp | inline `<head>`-skript; `color-scheme`; `aspect-ratio` | kode |
| `postMessage` av proxy/reaktivt state | DataCloneError | snapshot til rene data før sending | har |
| div-suppe (mange wrappere/auto-klasser) | stor DOM; dårlig LCP/minne | minimal-wrapper markup + per-side betinget asset-lasting | har (delvis) |
| animere `top/left/width/background-position` | repaint-jank | animer kun `transform`/`opacity` | kode |
| rå contenteditable som sannhet | inkonsistent DOM, seleksjon, paste, undo | dokumentmodell som sannhet, DOM avledet | kode (framtidig rik-tekst) |

Flere av disse er allerede Urds motor-lekser (se CLAUDE.md). De som er markert «kode» er kandidater til å kodes inn som invarianter eller ADR senere.

---

## 7. Ikke klart, eller bevisst ikke tatt

- **Native masonry** (`grid-lanes`/`item-flow`) - i flyt, kun flagg/Tech Preview; ikke stole på.
- **Anchor positioning, scroll-drevne animasjoner, `closedby`, `interpolate-size`** - gates alltid med `@supports`, aldri antatt.
- **Ekstern AI-tjeneste som kjerneavhengighet** - mot avhengighetsfri/statisk; AI-veiviser kun som opt-in-tillegg via et endepunkt.
- **Absolutt fri posisjonering** (klassisk Wix) - responsivt skjørt.
- **Klassebasert cascade-styling som kjerne** (Webflow/Bricks) - stylesheet-database-abstraksjon mot «rå filer, ingen bygging»; vurderes, ikke uten videre.
- **Tunge marketplace-runtimes** (Framer/Elementor-økosystem) - Urds plugin-modell med CSP-opt-in er veien.

---

## Kilder

**Plattform-primitiver:**
- Karusell/CSS: [Chrome: Carousels with CSS](https://developer.chrome.com/blog/carousels-with-css), [MDN ::scroll-marker](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-marker), [Chrome: scroll-state()](https://developer.chrome.com/blog/css-scroll-state-queries)
- Accordion: [Chrome: Styling details](https://developer.chrome.com/blog/styling-details), [MDN details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details)
- Faner: [W3C APG: Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- Dialog/popover: [MDN dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog), [web.dev: Popover API](https://web.dev/blog/popover-api), [LogRocket: popover vs dialog](https://blog.logrocket.com/comparing-popover-api-dialog-element/)
- Anchor positioning: [web.dev: Anchor positioning](https://web.dev/learn/css/anchor-positioning), [caniuse](https://caniuse.com/css-anchor-positioning)
- Sticky: [Polypane: sticky failure modes](https://polypane.app/blog/getting-stuck-all-the-ways-position-sticky-can-fail/)
- Layout/tema: [MDN CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout), [web.dev: subgrid](https://web.dev/articles/css-subgrid), [MDN container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries), [MDN light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark), [MDN :has()](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)
- Masonry-status: [WebKit: CSS Grid Lanes](https://webkit.org/blog/17660/introducing-css-grid-lanes/), [Chrome: masonry update](https://developer.chrome.com/blog/masonry-update)
- Media/motion: [MDN picture](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture), [web.dev: optimize CLS](https://web.dev/articles/optimize-cls), [MDN scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations), [Chrome: performant parallax](https://developer.chrome.com/blog/performant-parallaxing), [MDN View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)

**Byggerne og fellene:**
- [Squarespace Engineering: Fluid Engine](https://engineering.squarespace.com/blog/2022/developing-fluid-engine)
- [Wix Studio: advanced CSS grid](https://support.wix.com/en/article/studio-editor-working-with-an-advanced-css-grid), [docking](https://support.wix.com/en/article/studio-editor-working-with-docking-margins-and-padding)
- [Bricks vs Elementor (ytelse)](https://inspiredmonks.com/bricks-builder-vs-elementor-performance-2026/)
- [Elementor: Swiper-historikk](https://developers.elementor.com/elementor-2-7-moving-sliders-from-slick-to-swiper/), [3.26-oppdatering](https://developers.elementor.com/elementor-3-26-developers-update/)
- [Framer Motion / scroll](https://motion.dev/docs/react-scroll-animations)
- [Ghost: den nye editoren (Lexical)](https://ghost.org/changelog/new-editor/), [ProseMirror model](https://github.com/ProseMirror/prosemirror-model), [CKEditor: contenteditable](https://ckeditor.com/blog/ContentEditable-The-Good-the-Bad-and-the-Ugly/)
- [Passive listeners](https://developer.chrome.com/docs/lighthouse/best-practices/uses-passive-event-listeners), [AbortController for lyttere](https://css-tricks.com/using-abortcontroller-as-an-alternative-for-removing-event-listeners/), [crypto.randomUUID (usikker opprinnelse)](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID), [customizable select](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select), [excessive DOM size](https://developer.chrome.com/docs/lighthouse/performance/dom-size)

**Leverings-UX (byggernes grensesnitt):**
- [Webflow: Add panel](https://help.webflow.com/hc/en-us/articles/33961270096659-The-Add-panel), [Quick find](https://help.webflow.com/hc/en-us/articles/33961382093587-Quick-find)
- [Framer: Insert panel](https://www.framer.com/academy/lessons/framer-fundamentals-the-insert-panel), [Wireframer](https://www.framer.com/academy/lessons/wireframer)
- [Wix Studio: Inspector](https://support.wix.com/en/article/studio-editor-using-the-inspector-panel), [Wix: Add Elements](https://support.wix.com/en/article/wix-editor-elements-available-in-the-editor)
- [Squarespace: blokker](https://support.squarespace.com/hc/en-us/articles/206543757-Adding-content-with-blocks), [Blueprint AI](https://www.squarespace.com/blog/starting-a-website-with-squarespace-blueprint)
- [Gutenberg: kjerneblokker](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/), [synced patterns](https://gutenberg.10up.com/reference/Patterns/synced-patterns/)
- [Elementor: paneler/faner](https://developers.elementor.com/docs/editor/elementor-tabs/), [Bricks: interface](https://academy.bricksbuilder.io/getting-started/interface-tour/), [Carrd: element styles](https://carrd.co/docs/building/using-element-styles)
- [Ghost: cards](https://ghost.org/help/cards/), [snippets](https://ghost.org/help/snippets/), [Publii: block editor](https://getpublii.com/docs/the-block-editor.html)
- [GrapesJS: moduler](https://grapesjs.com/docs/modules/Blocks.html), [Silex hands-on](https://www.opensourceforu.com/2026/02/a-hands-on-guide-to-silex-building-static-sites-visually/)
