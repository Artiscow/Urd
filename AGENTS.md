# Urd: veiledning for kodingsagenter

Denne filen lastes automatisk i hver økt (Claude Code laster den via `@`-importen i `CLAUDE.md`; verktøy som følger AGENTS.md-standarden leser den direkte). Den fester de varige reglene og peker til autoritative dokumenter. Les den før du gjør endringer.

## Hva Urd er

Urd er en avhengighetsfri, statisk nettsidebygger der det klonede repoet ER nettsiden, og `/admin` er WYSIWYG-editoren. Motoren er ren, lesbar vanilla-JS (serveres rått, ingen bygging). Editoren er Svelte 5 (runes) og bygges til `template/admin/assets/`. Publisering skjer via GitHub OAuth + Cloudflare Pages Functions. Ved utgivelser synkes `template/` som én squashet commit til malrepoet `urd-template` («Use this template»), og deployede sider henter nye versjoner med Oppdatering-panelet i admin (ADR-0014).

**Totrinns-modellen (ADR-0001):** editoren viser den EKTE siden i en iframe (`?preview=1`) og styrer den via postMessage. Forhåndsvisningen ER produksjon: samme motor, samme render. Editoren eier utkastet; motoren rendrer det. Meldingene (`urd-edit`, `urd-move`, `urd-grow`, `urd-add-block`, ...) er kontrakten mellom dem.

**Når du tar opp arbeid:** les [docs/CHANGELOG.md](docs/CHANGELOG.md) for siste tilstand, [docs/BACKLOG.md](docs/BACKLOG.md) for hva som er neste, og [docs/TESTRUNDER.md](docs/TESTRUNDER.md) for testrunde-sjekklisten. Full orientering: [docs/VEIKART.md](docs/VEIKART.md) (faser og mål), [docs/ARKITEKTUR.md](docs/ARKITEKTUR.md), [docs/SKJEMA.md](docs/SKJEMA.md) (datakontrakten), [docs/UTVIKLING.md](docs/UTVIKLING.md) (tekniske regler), [docs/sammenligning/](docs/sammenligning/) (funksjons-/element-/lærdomskartene mot andre byggere), [CONTRIBUTING.md](CONTRIBUTING.md), og ADR-ene i [docs/adr/](docs/adr/).

## Repo-struktur

- `template/` er den deployerbare siden, synket til `urd-template`-repoet ved utgivelser. `template/assets/engine/<versjon>/` er motoren (vanilla-JS, serveres rått; mappenavnet er ALLTID lik `engine`-feltet i `template/urd.json`, ADR-0013). `template/assets/urd/` er de stabile plugin-API-skallene (re-exports mot gjeldende motorversjon; det eneste plugins får importere). `template/urd.json` er versjons- og eierskapskontrakten (`engine`, `ownedPaths`, `userPaths`). `template/functions/` er Cloudflare Pages Functions, `template/plugins/` er plugins, `template/content/` er brukerdata, `template/readme/` er malens README-oversettelser (roten er engelsk).
- `editor/src/` er Svelte 5-admin. Bygges med `cd editor && npm run build` til `template/admin/assets/editor.js` + `editor.css`. Den committede bundelen MÅ matche kilden (CI sjekker det). Motorimporter går via `$engine`-aliaset (vite.config.js leser mappenavnet fra urd.json).
- `tests/` er `node --test`-tester (motor, vern, kontrakts- og filinvarianter). Motormoduler hentes via `tests/_engine.mjs` (`await engineImport(...)`), aldri med statisk sti. `schema/` er JSON-skjemaene, `scripts/` er release-verktøy (check-release.mjs), `.github/workflows/` er CI + release-synken, `dev-server.py` er den lokale serveren, `docs/` er dokumentasjonen.

## Verifisering: alltid før noe er «ferdig»

Kjør alle tre, og rapporter resultatet ærlig:

1. Bygg editoren: `cd editor && npm run build`
2. Tester: `node --test tests/*.mjs` (skal være grønne)
3. Skjemavalidering: `cd editor && npm run validate`

Endrer du `editor/src/`, må du bygge på nytt og committe bundelen (ellers feiler CI-ens bygg-samsvar-sjekk). VIKTIG: editoren IMPORTERER OG BUNTER flere motormoduler (se importene i `editor/src/App.svelte`, `editor/src/main.js` og `editor/src/lib/*.svelte`, finn dem med `grep -rn -F '$engine/' editor/src`: `migrate`, `plugins`, `i18n`, `sections/presets`, `backgrounds/*`, `animations/core`, `theme`, `imageTools`, `fonts`, `place`, `icons`, `glyphs`, `footer-thumb`), så en endring i EN AV DISSE må også gjenbygges og committes - «ingen bygging» gjelder kun motorfiler editoren ikke importerer (f.eks. `render.js`, `nav.js`, `lightbox.js`, de fleste `blocks/*`). Er du usikker: bygg, og `git diff -- template/admin/assets` viser om bundelen ble berørt.

Feiler bygg-samsvar-sjekken i CI med en diff inne i rammeverkskode (Svelte-runtime, ikke app-kode), er det avhengighets-drift: sjekk at `node_modules/svelte/package.json` matcher versjonen i `editor/package-lock.json`, og kjør `rm -rf node_modules && npm ci` + nytt bygg om ikke (historisk hendelse 22. juli 2026: npm ga 5.56.5 der låsefilen pinnet 5.56.7). Bundle-fiksen må pushes sammen med kilden den er bygget fra.

**Verifiseringens omfang følger diffen** (regel fastsatt 3. august 2026):

- **Mellomcommits underveis** trenger ingen full runde: kjør kun testene som dekker det du rører (f.eks. `node --test tests/guard.test.mjs`), eller ingen. Hele ritualet hører til push-klargjøringen, ikke til hver commit. Hver commit nummereres fortsatt (se Versjonering under Arbeidsflyt).
- **Push med kun docs-endringer (.md):** editor-gjenbygg er unødvendig (markdown kan ikke påvirke bundelen), og det uavhengige review-steget kan erstattes av mekaniske sjekker: tankestrek, sjekkboks-syntaks, lenkemål, versjonsnummer-konsistens, og at ingenting er fjernet fra TESTRUNDER (presedens: 0.6.34). Full testsuite koster sekunder og kan gjerne kjøres, men CI kjører uansett de samme sjekkene etter push. Unntak: rører diffen `docs/SKJEMA.md`, er den aldri docs-only - tre-steder-regelen krever at SKJEMA.md endres i samme commit som `schema/` og eksempeldata, så en ren SKJEMA.md-diff er en halvgjort skjemaendring og skal ha full runde.
- **Push med kode-, skjema- eller innholdsendringer:** full runde som beskrevet over: bygg + alle tester + skjemavalidering + uavhengig review.

CI kjører de samme tre pluss bygg-samsvar-sjekken (tests.yml), CodeQL skanner ved push og ukentlig, dependency-review kjører på PR-er, og release.yml synker template/ til malrepoet ved utgivelser, portvoktet av `scripts/check-release.mjs`. To gjentatte CodeQL-fallgruver: (1) sjekk aldri en URL med en delstreng (`.includes('vert.no')`), parse URL-en og sammenlign verten eksakt; (2) bruk ankrede regex på URL-/data-validering, som CodeQL gjenkjenner som barrierer.

**Ved slipp («release») gjelder et fjerde steg:** `node scripts/check-release.mjs v<versjon>` skal være grønn i full modus (tagg == `urd.json.engine` == CHANGELOG-utgivelsesoverskrift == `editor/package.json`, og motormappa finnes) FØR noe tagges.

## Ufravikelige regler

- **Invarianten: en Urd-oppdatering skal ALDRI knuse en bygget side.** Endrer du props-formen på en blokk/seksjon/bakgrunn/animasjon: bump `version`, skriv en migrering, legg til test. Se ADR-0005. Før v1 trenger upushede formatendringer ingen migrering, og pre-v1-migreringene er bakt inn (ADR-0005-addendum); fra v1.0 håndheves kontrakten fullt ut.
- **Alle skjemafelt er additive.** Fjern aldri et felt uten migrering.
- **Skjemaendringer gjøres tre steder i samme commit:** `docs/SKJEMA.md`, `schema/`, og eksempeldata.
- **`_headers` er Urd-eid, skrives aldri av publisering** (ADR-0006) **og er PERMANENT unntatt oppdatereren**, som viser diff-instruks i stedet (ADR-0014). Plugins deklarerer CSP-behov i manifestet; verten legges manuelt inn i `_headers` i repoet. `_redirects` er publiserings-generert (bygges i v0.7) og ligger i vokterens DENY til da (ADR-0015).
- **Hver fil i `template/` har nøyaktig ÉN eierskapsklasse** (`ownedPaths`/`userPaths` i urd.json, speilet i guard.js; kontrakts- og fullstendighetstester håndhever). Ny fil = klassifiser den i samme commit; bruk `<mappe>/**`-mønstre så påfyll ikke krever kontraktsendring. Motor-atomgruppen (assets, admin, index.html, slug-kopier, urd.json) kan aldri splittes i oppdateringen.
- **Reserverte slugs vedlikeholdes to steder** (publiserings-vokteren OG editorens RESERVED_SLUGS), og en slug-reservasjon etter v1 krever oppryddingsvei i oppdatereren.

## Arbeidsflyt

- **Beskjeden «commit» avslutter en arbeidsrunde:** da skrives commit-innslaget i CHANGELOG for alt gjort den runden, backlog (og TESTRUNDER ved leveranse) oppdateres, og en nummerert commit-melding foreslås (kun meldingstekst, ingen git-kommandoer). Verifiseringens omfang følger diffen (se Verifisering). **Beskjeden «push» utløser push-klargjøringen:** full verifisering, uavhengig review (eller mekaniske sjekker ved docs-only), gjenbygg om diffen krever det, og p-innslaget i CHANGELOG. Pushing skjer manuelt (GitHub Desktop), aldri fra agenten; ikke commit eller push selv.
- **Beskjeden «release» (eller «push og release») utløser slippritualet I TILLEGG til push-klargjøringen:** motorversjonen bumpes etter UTVIKLING-ritualet (engine-feltet i urd.json, git mv av motormappa til `assets/engine/<ny versjon>/`, re-export-målene i `assets/urd/`-skallene, HTML-skallenes referanser, gjenbygd bundel, CHANGELOG-utgivelsesoverskrift `## [x.y.z]` og editor/package.json), og check-release skal være grønn i FULL modus før commit-meldingen foreslås. Tagging og GitHub-releasen gjøres alltid manuelt av eieren ETTER push (tagg sist, aldri først): en ny tagg alene er aldri en ny versjon, og en feilet release ryddes ved å slette både releasen og taggen før nytt forsøk. Malrepoets tagg er oppdaterens sjekksum-baseline og flyttes ALDRI.
- **Uavhengig gjennomgang før commit-forslaget:** la en frisk agent uten øktens kontekst gjennomgå hele diffen mot reglene i denne filen og ADR-ene, og rett reelle funn. Økta som skrev endringene skal aldri være den eneste som vurderte dem. Deretter foreslås en nummerert commit-melding (kun meldingsteksten, ingen git-kommandoer).
- **Versjonering (commit = kodebygging, push = testleveranse):** commits nummereres stigende; hvert innslag arver nummeret til backlog-punktet arbeidet hører under, pluss ett siffer for rekkefølge; arbeid uten milepæl hører under fasens stående «Løpende»-punkt (0.6.0.x), og flate fasenumre deles ikke lenger ut (konvensjonen er beskrevet i CHANGELOG-ens innledning og gjentas ikke her). Underveis kan det gjøres flere små commits uten full seremoni; verifiseringens omfang følger diffen (se Verifisering). Den siste committen i en push er push-klargjøringen (der skrives p-innslaget; commit-innslag, backlog og TESTRUNDER er alt oppdatert løpende ved hver commit), og pushen arver commit-spennet siden forrige push med p-suffiks: én commit 0.6.0.4 gir 0.6.0.4p, flere commits 0.6.7.2 til 0.6.7.5 gir 0.6.7.2-5p, brukt både i push-klargjøringscommitens meldingstittel og i CHANGELOG. Kortformen brukes kun når første og siste commit deler prefiks; med blandede nummerserier skrives begge numrene fullt ut (0.6.6.5.11-0.6.0.1p). Spennet er entydig i CHANGELOG: det er alle commit-innslagene over forrige p-innslag. Push-innslaget er et eget CHANGELOG-innslag (rett over commit-innslagene) som eier prosessfortellingen: hva som ble verifisert (bygg, tester, validering, review-form), og hvis noe ble rettet: HVA som var galt, hvordan det ble oppdaget og hvordan det ble rettet - detaljert nok til å læres av, aldri bare «funn rettet». Commit-innslagene beskriver hva som ble bygget; hendelsesforløpet fra gjennomgangen står kun i p-innslaget, så de to aldri driver fra hverandre. Fase-slippet døpes til milepælens TREPARTS-nummer (v0.6 endte i 0.6.9; engine-feltet er streng treparts semver), ikke til siste firedelte commit-nummer. Slik bygges et arbeid i nummererte commits og pushes til testing først når helheten er ferdig.
- **Ferdig-kriterier:** nye backlog-milepæler får en «Ferdig når:»-linje med observerbare betingelser, og veikart-faser har en tilsvarende «Port:»-linje. «Fungerer» er ikke et kriterium; skriv hva som kan observeres.
- **Et svar på et spørsmål avslutter turen.** Åpne aldri en valgdialog i samme tur som en forklaring (dialogen gjemmer teksten); still heller oppfølgingsspørsmålet i ren tekst.
- **Slutter brukerens melding med et spørsmål, er turen ren diskusjon** (regel fastsatt 3. august 2026): svar i tekst og gjør ingen endringer, selv om meldingen også inneholder et klarsignal for noe annet. Endringer gjøres først når beskjeden er et rent direktiv uten åpne spørsmål.
- **Regeltekst forhåndsvises** (regel fastsatt 3. august 2026): nye eller endrede regler i denne filen legges frem som utkast i chatten for godkjenning før de skrives inn.

## Skrivestil

- **Aldri tankestrek (em dash) noe sted**: ikke i prosjekttekst, kode, kommentarer, commit-meldinger eller chat-svar. Bruk vanlig bindestrek eller omformuler.
- **Norsk (bokmål) er KANONISK i docs og bruker-UI, ikke enerådende:** UI-tekstene finnes på fem språk (ADR-0012) og deler av dokumentasjonen er oversatt under docs/languages/ (alle språk i familiemappen, også bokmål: SETUP-nb.md, GUIDE-nb.md); bokmålsteksten gjelder ved avvik. Engelske identifikatorer i kode OG datakontrakter (feltnavn, meldingstyper, oversettelsesnøkler), og engelsk for utad-vendte navn: README-rotfilene og GitHub-topics (`urd-template`, `urd-plugin`).
- **Ingen emoji/tegn i editor-UI: kun tegnede SVG-ikoner.** (Tegn/emoji er innhold brukeren kan sette, ikke chrome.)
- **Ingen forklarende prosa i admin-panelene** (regel fastsatt 23. juli 2026): innstillinger forklares i «?»-tooltips (title-attributtet) eller hjelpechipen, aldri som tekstavsnitt (panel-hint o.l.) i panelet. Innstillinger som kun gjelder en variant/et valg skal stå RETT UNDER valget de hører til.
- **Innstillinger vises KUN når de er relevante** (regel fastsatt 23. juli 2026): et valg som ikke har effekt med gjeldende variant/stil skal skjules, ikke stå inert (f.eks. effektfargen kun for hover-stiler med effekt, kolonne-valg kun for sidestilt). Etiketten skal si hva innstillingen faktisk styrer i det valget («Glødfarge» for løft med glød, ikke generisk «Hover-farge»), og valglister filtreres til de variantene som gir mening.
- **Kode-kommentarer brytes ved setningsgrense, aldri midt i en setning.** Match omkringliggende kode i kommentar-tetthet, navngiving og idiom.

## Motor-lekser (gjentatte fallgruver)

- **postMessage: send ALDRI en `$state`-proxy** (gir DataCloneError). Bruk alltid `$state.snapshot(...)`.
- **Id-generering:** `crypto.randomUUID` finnes ikke på usikre opprinnelser (f.eks. `http://0.0.0.0`, den lokale testserveren). Bruk `crypto.getRandomValues` (virker overalt). Se `makeId` i `sections/presets.js`.
- **Temastyrt UI (ADR-0009): aldri native `<select>` i redigerings-UI** (popupen følger OS-temaet og blir uleselig). Bruk `Dropdown.svelte` (admin), `createDropdown` (motorens `dropdown.js` på lerretet, `/assets/urd/dropdown.js` fra plugins), eller segmentknapper.
- **Hjelpechip (ADR-0008): alt med spesialfunksjoner skal ha en «?»-chip** som åpner et vedvarende hjelpekort. Felles hjelper: `attachHint` (motorens `hint.js`; plugins importerer `/assets/urd/hint.js`).
- **Datablokkers autovekst melder KUN høyde** (`urd-grow`), aldri hele framen, ellers teleporteres en dratt blokk tilbake.
- **Seksjoner MÅ ha `id`.** `handleAddSection` tildeler defensivt en om en preset glemmer den.
- **Lokal utvikling må virke** (`python3 dev-server.py` fra repo-roten; `python3 -m http.server` cacher motorfiler og ruter ikke sideregisteret): plugin-utviklere jobber lokalt. Ting som bare virker på den deployede siden (functions) skal degradere pent lokalt.
- **Hover-UI må vaktes mot hybride enheter:** `pointerenter` fyrer også ved trykk på laptop med touchskjerm, så uten `event.pointerType === 'mouse'`-vakt åpner og lukker et hover-element i samme trykk. Se hover-håndteringen i `engine/nav.js`.
- **Motorkomponenter som re-rendres per utkast-melding og setter lyttere på document, må koble fra forrige sett** (ellers stables lytterne for hver editor-endring). Mønsteret: modulnivå-AbortController som abortes øverst i render-funksjonen, og `{ signal }` på alle addEventListener. Se `renderNav` i `engine/nav.js`.
- **Bygg komponenter native/CSS-først (ADR-0011):** bruk nettleser-primitiver framfor egen JS - `<dialog>`/`showModal()` for modal/lightbox, `<details name>` for accordion, `animation-timeline: view()` for scroll-koblede effekter (parallaks), Popover API for menyer der forankring finnes. Gate alt som ikke er baseline med `@supports`/funksjonssjekk; fallback = enten en JS-vei eller elementet i SLUTTILSTAND (aldri skjult). `IntersectionObserver`/`ResizeObserver` er fortsatt riktig for LOGIKK (engangs-avdekking, resize), ikke for scroll-animasjon - engangs-entré blir derfor værende på IntersectionObserver.
- **Plugins importerer KUN `/assets/urd/`-stier** (i18n, hint, dropdown): motoren bor i en versjonert, immutable-cachet mappe som byttes ved hver utgivelse, så en hardkodet versjonert sti knekker ved neste oppdatering. Skall og motor ender på samme modul-URL, så i18n-registrene forblir singletons (ADR-0013).
- **Nye feilkoder i functions krever `api.<kode>`-nøkler i alle fem admin-ordbøker** (kontraktstesten i tests/i18n.test.mjs håndhever). Functions har aldri locale-infrastruktur: engelsk `error`-tekst er fallback, klienten oversetter med `taApiError` og sammenligner ALDRI mot literaler.
- **Nye UI-nøkler går i kjernespråkene nb, en-GB og tr med {var}-paritet** (paritetstesten håndhever full paritet for de tre; nn/se faller tilbake til bokmål og fylles i egne oversettelsesrunder, testen godtar hull men aldri ukjente nøkler). Admin-ordbøkene buntes aldri, så oversettelser krever ikke gjenbygg. `ta()` kalles aldri på modulnivå, og seed-tekst (brukerdata) oversettes ÉN gang ved innsetting, aldri ved rendring (ADR-0012).
- **Nye motormoduler skal holdes UTENFOR den statiske import-lukningen** med mindre hver besøkende trenger dem: modulepreload-testen tvinger hele lukningen inn i HTML-skallene. Sjelden brukt kode hentes dynamisk med absolutt `/assets/urd/`-sti + `/* @vite-ignore */`.
- **Slug-kopiene skal være byte-like rot-index.html** (kopi-oppfriskningsplikten): enhver mekanisme som bytter motorversjon skriver rot + alle kopier i samme commit (ADR-0013; modulepreload-testen vokter).

## Plugins

Referanse-pluginene i `template/plugins/` (kalender, skjema, kart, og språkpakken sprak-svensk) viser mønsteret: manifest med `provides` (valgfritt for rene språkpakker med `languages`-feltet), blokk med `version`/`migrations`, seksjonspreset (med `id`), egen CSS via ÉN style-tag, redigering i preview via `urd-edit`, hjelpechip, temastyrte nedtrekk, importer kun fra `/assets/urd/`, flerspråk via `locales`/`names`-feltene, og ren logikk i egen modul med `node --test`-tester. Deles i eget repo med GitHub-topicen `urd-plugin`. Se `template/plugins/README.md`.

## ADR-er

Les og følg dem; skriv en ny ADR når du tar en beslutning med varige konsekvenser. Gjeldende: 0001 hybrid editormodell, 0002 Svelte for editor / lesbar JS for motor, 0003 publisering via GitHub OAuth + Pages Functions, 0004 monorepo med template-mappe, 0005 versjonering og migrering, 0006 plugin-CSP-behovsmodell, 0007 samlinger (datablokk-mønsteret), 0008 hjelpechip-regelen, 0009 temastyrt UI-regelen, 0010 disclosure-navigasjon i nav (aldri role="menu"), 0011 native/CSS-først for komponenter, 0012 flerspråk via ES-modul-locales og native Intl, 0013 immutable motorversjonering og kopi-oppfriskningsplikten, 0014 oppdaterermodellen (blob-SHA-sjekksum mot baseline-tagg), 0015 redirects-eierskap, 0016 panel-språket og Innhold/Stil-modellen. ADR-0004 og 0005 har addenda (splitten gjennomført; pre-v1-innbakingen).

## Testrundene (docs/TESTRUNDER.md)

`docs/TESTRUNDER.md` er sjekklisten over levert arbeid som venter på manuell testing (flyttet ut av backloggen 22. juli 2026). Ved levering: legg en ny «Testrunde-batch (0.6.9.x)»-seksjon øverst der (batcher kan slås sammen på eierens beskjed). **Legg til nye punkter når du leverer noe, men fjern aldri noe der; punkter strykes kun av den som tester.**

## Kjøre verktøy

Kjør node/npm slik miljøet ditt krever. På den opprinnelige utviklingsmaskinen kjøres host-kommandoer via `flatpak-spawn --host` (Flatpak-sandkasse); på en vanlig maskin kjører du dem direkte.
