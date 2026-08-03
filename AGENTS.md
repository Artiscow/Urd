# Urd: veiledning for kodingsagenter

Denne filen lastes automatisk i hver økt (Claude Code laster den via `@`-importen i `CLAUDE.md`; verktøy som følger AGENTS.md-standarden leser den direkte). Den fester de varige reglene og peker til autoritative dokumenter. Les den før du gjør endringer.

## Hva Urd er

Urd er en avhengighetsfri, statisk nettsidebygger der det klonede repoet ER nettsiden, og `/admin` er WYSIWYG-editoren. Motoren er ren, lesbar vanilla-JS (serveres rått, ingen bygging). Editoren er Svelte 5 (runes) og bygges til `template/admin/assets/`. Publisering skjer via GitHub OAuth + Cloudflare Pages Functions.

**Totrinns-modellen (ADR-0001):** editoren viser den EKTE siden i en iframe (`?preview=1`) og styrer den via postMessage. Forhåndsvisningen ER produksjon: samme motor, samme render. Editoren eier utkastet; motoren rendrer det. Meldingene (`urd-edit`, `urd-move`, `urd-grow`, `urd-add-block`, ...) er kontrakten mellom dem.

**Når du tar opp arbeid:** les [docs/CHANGELOG.md](docs/CHANGELOG.md) for siste tilstand, [docs/BACKLOG.md](docs/BACKLOG.md) for hva som er neste, og [docs/TESTRUNDER.md](docs/TESTRUNDER.md) for testrunde-sjekklisten. Full orientering: [docs/VEIKART.md](docs/VEIKART.md) (faser og mål), [docs/ARKITEKTUR.md](docs/ARKITEKTUR.md), [docs/UTVIKLING.md](docs/UTVIKLING.md) (tekniske regler), [CONTRIBUTING.md](CONTRIBUTING.md), og ADR-ene i [docs/adr/](docs/adr/).

## Repo-struktur

- `template/` er den deployerbare siden. `template/assets/engine/` er motoren (vanilla-JS, serveres rått). `template/functions/` er Cloudflare Pages Functions. `template/plugins/` er plugins. `template/content/` er brukerdata (sider, samlinger, site.json).
- `editor/src/` er Svelte 5-admin. Bygges med `cd editor && npm run build` til `template/admin/assets/editor.js` + `editor.css`. Den committede bundelen MÅ matche kilden (CI sjekker det).
- `tests/` er `node --test`-tester av rene motorfunksjoner. `schema/` er JSON-skjemaene. `docs/` er dokumentasjonen.

## Verifisering: alltid før noe er «ferdig»

Kjør alle tre, og rapporter resultatet ærlig:

1. Bygg editoren: `cd editor && npm run build`
2. Tester: `node --test tests/*.mjs` (skal være grønne)
3. Skjemavalidering: `cd editor && npm run validate`

Endrer du `editor/src/`, må du bygge på nytt og committe bundelen (ellers feiler CI-ens bygg-samsvar-sjekk). VIKTIG: editoren IMPORTERER OG BUNTER flere motormoduler (se importene i `editor/src/App.svelte` og `GlyphPicker.svelte`: `migrate`, `plugins`, `sections/presets`, `backgrounds/*`, `animations/core`, `theme`, `imageTools`, `fonts`, `place`, `icons`, `glyphs`, `footer-thumb`), så en endring i EN AV DISSE må også gjenbygges og committes - «ingen bygging» gjelder kun motorfiler editoren ikke importerer (f.eks. `render.js`, `nav.js`, `lightbox.js`, de fleste `blocks/*`). Er du usikker: bygg, og `git diff -- template/admin/assets` viser om bundelen ble berørt.

Feiler bygg-samsvar-sjekken i CI med en diff inne i rammeverkskode (Svelte-runtime, ikke app-kode), er det avhengighets-drift: sjekk at `node_modules/svelte/package.json` matcher versjonen i `editor/package-lock.json`, og kjør `rm -rf node_modules && npm ci` + nytt bygg om ikke (sett 22. juli 2026: npm ga 5.56.5 der låsefilen pinnet 5.56.7). Bundle-fiksen må pushes sammen med kilden den er bygget fra.

**Verifiseringens omfang følger diffen** (regel fastsatt 3. august 2026):

- **Mellomcommits underveis** trenger ingen full runde: kjør kun testene som dekker det du rører (f.eks. `node --test tests/guard.test.mjs`), eller ingen. Hele ritualet hører til push-klargjøringen, ikke til hver commit. Hver commit nummereres fortsatt (se Versjonering under Arbeidsflyt).
- **Push med kun docs-endringer (.md):** editor-gjenbygg er unødvendig (markdown kan ikke påvirke bundelen), og det uavhengige review-steget kan erstattes av mekaniske sjekker: tankestrek, sjekkboks-syntaks, lenkemål, versjonsnummer-konsistens, og at ingenting er fjernet fra TESTRUNDER (presedens: 0.6.34). Full testsuite koster sekunder og kan gjerne kjøres, men CI kjører uansett de samme sjekkene etter push. Unntak: rører diffen `docs/SKJEMA.md`, er den aldri docs-only - tre-steder-regelen krever at SKJEMA.md endres i samme commit som `schema/` og eksempeldata, så en ren SKJEMA.md-diff er en halvgjort skjemaendring og skal ha full runde.
- **Push med kode-, skjema- eller innholdsendringer:** full runde som beskrevet over: bygg + alle tester + skjemavalidering + uavhengig review.

CI (GitHub Actions) kjører de samme tre pluss bygg-samsvar-sjekken, og CodeQL skanner ved push. To gjentatte CodeQL-fallgruver: (1) sjekk aldri en URL med en delstreng (`.includes('vert.no')`), parse URL-en og sammenlign verten eksakt; (2) bruk ankrede regex på URL-/data-validering, som CodeQL gjenkjenner som barrierer.

## Ufravikelige regler

- **Invarianten: en Urd-oppdatering skal ALDRI knuse en bygget side.** Endrer du props-formen på en blokk/seksjon/bakgrunn/animasjon: bump `version`, skriv en migrering, legg til test. Se ADR-0005.
- **Alle skjemafelt er additive.** Fjern aldri et felt uten migrering.
- **Skjemaendringer gjøres tre steder i samme commit:** `docs/SKJEMA.md`, `schema/`, og eksempeldata.
- **`_headers` er Urd-eid og skrives aldri av publisering** (ADR-0006). Plugins deklarerer CSP-behov i manifestet; verten legges manuelt inn i `_headers` i repoet.

## Arbeidsflyt

- **Beskjeden «commit» avslutter en arbeidsrunde:** da skrives commit-innslaget i CHANGELOG for alt gjort den runden, backlog (og TESTRUNDER ved leveranse) oppdateres, og en nummerert commit-melding foreslås (kun meldingstekst, ingen git-kommandoer). Verifiseringens omfang følger diffen (se Verifisering). **Beskjeden «push» utløser push-klargjøringen:** full verifisering, uavhengig review (eller mekaniske sjekker ved docs-only), gjenbygg om diffen krever det, og p-innslaget i CHANGELOG. Pushing skjer manuelt (GitHub Desktop), aldri fra agenten; ikke commit eller push selv.
- **Uavhengig gjennomgang før commit-forslaget:** la en frisk agent uten øktens kontekst gjennomgå hele diffen mot reglene i denne filen og ADR-ene, og rett reelle funn. Økta som skrev endringene skal aldri være den eneste som vurderte dem. Deretter foreslås en nummerert commit-melding (kun meldingsteksten, ingen git-kommandoer).
- **Versjonering (commit = kodebygging, push = testleveranse):** commits nummereres stigende; hvert innslag arver nummeret til backlog-punktet arbeidet hører under, pluss ett siffer for rekkefølge; arbeid uten milepæl hører under fasens stående «Løpende»-punkt (0.6.0.x), og flate fasenumre deles ikke lenger ut (konvensjonen er beskrevet i CHANGELOG-ens innledning og gjentas ikke her). Underveis kan det gjøres flere små commits uten full seremoni; verifiseringens omfang følger diffen (se Verifisering). Den siste committen i en push er push-klargjøringen (der skrives p-innslaget; commit-innslag, backlog og TESTRUNDER er alt oppdatert løpende ved hver commit), og pushen arver commit-spennet siden forrige push med p-suffiks: én commit 0.6.0.4 gir 0.6.0.4p, flere commits 0.6.7.2 til 0.6.7.5 gir 0.6.7.2-5p, brukt både i push-klargjøringscommitens meldingstittel og i CHANGELOG. Kortformen brukes kun når første og siste commit deler prefiks; med blandede nummerserier skrives begge numrene fullt ut (0.6.6.5.11-0.6.0.1p). Spennet er entydig i CHANGELOG: det er alle commit-innslagene over forrige p-innslag. Push-innslaget er et eget CHANGELOG-innslag (rett over commit-innslagene) som eier prosessfortellingen: hva som ble verifisert (bygg, tester, validering, review-form), og hvis noe ble rettet: HVA som var galt, hvordan det ble oppdaget og hvordan det ble rettet - detaljert nok til å læres av, aldri bare «funn rettet». Commit-innslagene beskriver hva som ble bygget; hendelsesforløpet fra gjennomgangen står kun i p-innslaget, så de to aldri driver fra hverandre. Fase-slippet døpes fortsatt til siste commit-nummer (v0.5 endte i 0.5.10). Slik bygges et arbeid i nummererte commits og pushes til testing først når helheten er ferdig.
- **Ferdig-kriterier:** nye backlog-milepæler får en «Ferdig når:»-linje med observerbare betingelser, og veikart-faser har en tilsvarende «Port:»-linje. «Fungerer» er ikke et kriterium; skriv hva som kan observeres.
- **Et svar på et spørsmål avslutter turen.** Åpne aldri en valgdialog i samme tur som en forklaring (dialogen gjemmer teksten); still heller oppfølgingsspørsmålet i ren tekst.
- **Slutter brukerens melding med et spørsmål, er turen ren diskusjon** (regel fastsatt 3. august 2026): svar i tekst og gjør ingen endringer, selv om meldingen også inneholder et klarsignal for noe annet. Endringer gjøres først når beskjeden er et rent direktiv uten åpne spørsmål.
- **Regeltekst forhåndsvises** (regel fastsatt 3. august 2026): nye eller endrede regler i denne filen legges frem som utkast i chatten for godkjenning før de skrives inn.

## Skrivestil

- **Aldri tankestrek (em dash) noe sted**: ikke i prosjekttekst, kode, kommentarer, commit-meldinger eller chat-svar. Bruk vanlig bindestrek eller omformuler.
- **Norsk (bokmål) i docs og bruker-UI; engelske identifikatorer i kode OG i datakontrakter** (feltnavn i JSON, meldingstyper).
- **Ingen emoji/tegn i editor-UI: kun tegnede SVG-ikoner.** (Tegn/emoji er innhold brukeren kan sette, ikke chrome.)
- **Ingen forklarende prosa i admin-panelene** (regel fastsatt 23. juli 2026): innstillinger forklares i «?»-tooltips (title-attributtet) eller hjelpechipen, aldri som tekstavsnitt (panel-hint o.l.) i panelet. Innstillinger som kun gjelder en variant/et valg skal stå RETT UNDER valget de hører til.
- **Innstillinger vises KUN når de er relevante** (regel fastsatt 23. juli 2026): et valg som ikke har effekt med gjeldende variant/stil skal skjules, ikke stå inert (f.eks. effektfargen kun for hover-stiler med effekt, kolonne-valg kun for sidestilt). Etiketten skal si hva innstillingen faktisk styrer i det valget («Glødfarge» for løft med glød, ikke generisk «Hover-farge»), og valglister filtreres til de variantene som gir mening.
- **Kode-kommentarer brytes ved setningsgrense, aldri midt i en setning.** Match omkringliggende kode i kommentar-tetthet, navngiving og idiom.

## Motor-lekser (gjentatte fallgruver)

- **postMessage: send ALDRI en `$state`-proxy** (gir DataCloneError). Bruk alltid `$state.snapshot(...)`.
- **Id-generering:** `crypto.randomUUID` finnes ikke på usikre opprinnelser (f.eks. `http://0.0.0.0`, den lokale testserveren). Bruk `crypto.getRandomValues` (virker overalt). Se `makeId` i `sections/presets.js`.
- **Temastyrt UI (ADR-0009): aldri native `<select>` i redigerings-UI** (popupen følger OS-temaet og blir uleselig). Bruk `Dropdown.svelte` (admin) eller `createDropdown` (`engine/dropdown.js`, lerret), eller segmentknapper.
- **Hjelpechip (ADR-0008): alt med spesialfunksjoner skal ha en «?»-chip** som åpner et vedvarende hjelpekort. Felles hjelper: `engine/hint.js` (`attachHint`).
- **Datablokkers autovekst melder KUN høyde** (`urd-grow`), aldri hele framen, ellers teleporteres en dratt blokk tilbake.
- **Seksjoner MÅ ha `id`.** `handleAddSection` tildeler defensivt en om en preset glemmer den.
- **Lokal utvikling må virke** (`python3 -m http.server` fra `template/`): plugin-utviklere jobber lokalt. Ting som bare virker på den deployede siden (functions) skal degradere pent lokalt.
- **Hover-UI må vaktes mot hybride enheter:** `pointerenter` fyrer også ved trykk på laptop med touchskjerm, så uten `event.pointerType === 'mouse'`-vakt åpner og lukker et hover-element i samme trykk. Se hover-håndteringen i `engine/nav.js`.
- **Motorkomponenter som re-rendres per utkast-melding og setter lyttere på document, må koble fra forrige sett** (ellers stables lytterne for hver editor-endring). Mønsteret: modulnivå-AbortController som abortes øverst i render-funksjonen, og `{ signal }` på alle addEventListener. Se `renderNav` i `engine/nav.js`.
- **Bygg komponenter native/CSS-først (ADR-0011):** bruk nettleser-primitiver framfor egen JS - `<dialog>`/`showModal()` for modal/lightbox, `<details name>` for accordion, `animation-timeline: view()` for scroll-koblede effekter (parallaks), Popover API for menyer der forankring finnes. Gate alt som ikke er baseline med `@supports`/funksjonssjekk; fallback = enten en JS-vei eller elementet i SLUTTILSTAND (aldri skjult). `IntersectionObserver`/`ResizeObserver` er fortsatt riktig for LOGIKK (engangs-avdekking, resize), ikke for scroll-animasjon - engangs-entré blir derfor værende på IntersectionObserver.

## Plugins

Referanse-pluginene i `template/plugins/` (kalender, skjema, kart) viser mønsteret: manifest med `provides`, blokk med `version`/`migrations`, seksjonspreset (med `id`), egen CSS via ÉN style-tag, redigering i preview via `urd-edit`, hjelpechip, temastyrte nedtrekk, og ren logikk i egen modul med `node --test`-tester. Se `template/plugins/README.md`.

## ADR-er

Les og følg dem; skriv en ny ADR når du tar en beslutning med varige konsekvenser. Gjeldende: 0001 hybrid editormodell, 0002 Svelte for editor / lesbar JS for motor, 0003 publisering via GitHub OAuth + Pages Functions, 0004 monorepo med template-mappe, 0005 versjonering og migrering, 0006 plugin-CSP-behovsmodell, 0007 samlinger (datablokk-mønsteret), 0008 hjelpechip-regelen, 0009 temastyrt UI-regelen, 0010 disclosure-navigasjon i nav (aldri role="menu"), 0011 native/CSS-først for komponenter.

## Testrundene (docs/TESTRUNDER.md)

`docs/TESTRUNDER.md` er sjekklisten over levert arbeid som venter på manuell testing (flyttet ut av backloggen 22. juli 2026). Ved levering: legg en ny «Testrunde-batch (0.6.x)»-seksjon øverst der. **Legg til nye punkter når du leverer noe, men fjern aldri noe der; punkter strykes kun manuelt av den som tester.**

## Kjøre verktøy

Kjør node/npm slik miljøet ditt krever. På den opprinnelige utviklingsmaskinen kjøres host-kommandoer via `flatpak-spawn --host` (Flatpak-sandkasse); på en vanlig maskin kjører du dem direkte.
