# Urd: veiledning for Claude Code

Denne filen lastes automatisk i hver økt. Den fester de varige reglene og peker til autoritative dokumenter. Les den før du gjør endringer.

## Hva Urd er

Urd er en avhengighetsfri, statisk nettsidebygger der det klonede repoet ER nettsiden, og `/admin` er WYSIWYG-editoren. Motoren er ren, lesbar vanilla-JS (serveres rått, ingen bygging). Editoren er Svelte 5 (runes) og bygges til `template/admin/assets/`. Publisering skjer via GitHub OAuth + Cloudflare Pages Functions.

Full orientering: [docs/VEIKART.md](docs/VEIKART.md) (faser og mål), [docs/ARKITEKTUR.md](docs/ARKITEKTUR.md), [docs/UTVIKLING.md](docs/UTVIKLING.md) (tekniske regler), [CONTRIBUTING.md](CONTRIBUTING.md), og ADR-ene i [docs/adr/](docs/adr/).

## Repo-struktur

- `template/` er den deployerbare siden. `template/assets/engine/` er motoren (vanilla-JS, serveres rått). `template/functions/` er Cloudflare Pages Functions. `template/plugins/` er plugins. `template/content/` er brukerdata (sider, samlinger, site.json).
- `editor/src/` er Svelte 5-admin. Bygges med `cd editor && npm run build` til `template/admin/assets/editor.js` + `editor.css`. Den committede bundelen MÅ matche kilden (CI sjekker det).
- `tests/` er `node --test`-tester av rene motorfunksjoner. `schema/` er JSON-skjemaene. `docs/` er dokumentasjonen.

## Verifisering: alltid før noe er «ferdig»

Kjør alle tre, og rapporter resultatet ærlig:

1. Bygg editoren: `cd editor && npm run build`
2. Tester: `node --test tests/*.mjs` (skal være grønne)
3. Skjemavalidering: `cd editor && npm run validate`

Endrer du `editor/src/`, må du bygge på nytt og committe bundelen (ellers feiler CI-ens bygg-samsvar-sjekk). Rene motorfiler (`template/assets/engine/`) trenger ingen bygging.

## Ufravikelige regler

- **Invarianten: en Urd-oppdatering skal ALDRI knuse en bygget side.** Endrer du props-formen på en blokk/seksjon/bakgrunn/animasjon: bump `version`, skriv en migrering, legg til test. Se ADR-0005.
- **Alle skjemafelt er additive.** Fjern aldri et felt uten migrering.
- **Skjemaendringer gjøres tre steder i samme commit:** `docs/SKJEMA.md`, `schema/`, og eksempeldata.
- **`_headers` er Urd-eid og skrives aldri av publisering** (ADR-0006). Plugins deklarerer CSP-behov i manifestet; eieren legger verten i `_headers` i repoet.

## Arbeidsflyt

- **Vent med CHANGELOG, backlog og commit-forslag til eieren sier «push».** Eieren pusher selv. Når de sier push: oppdater CHANGELOG og backlog, gjenbygg editoren, kjør verifiseringen, og foreslå en nummerert commit-melding. Ikke commit eller push selv.
- **Versjonering:** pushes nummereres 0.x.y stigende. Fase-slippet døpes til siste push-nummer (v0.5 endte i 0.5.10). Hvert push-nummer er et eget CHANGELOG-innslag.
- **Svar på spørsmål i tekst FØR du åpner en valgdialog.** Forklaringer skal ikke gjemmes bak dialoger.

## Skrivestil

- **Aldri tankestrek (em dash) noe sted** i prosjekttekst, kode, kommentarer eller commit-meldinger. Bruk vanlig bindestrek eller omformuler.
- **Norsk (bokmål) i docs og bruker-UI; engelske identifikatorer i kode OG i datakontrakter** (feltnavn i JSON, meldingstyper).
- **Ingen emoji/tegn i editor-UI: kun tegnede SVG-ikoner.** (Tegn/emoji er innhold brukeren kan sette, ikke chrome.)
- **Kode-kommentarer brytes ved setningsgrense, aldri midt i en setning.** Match omkringliggende kode i kommentar-tetthet, navngiving og idiom.

## Motor-lekser (gjentatte fallgruver)

- **postMessage: send ALDRI en `$state`-proxy** (gir DataCloneError). Bruk alltid `$state.snapshot(...)`.
- **Id-generering:** `crypto.randomUUID` finnes ikke på usikre opprinnelser (f.eks. `http://0.0.0.0`, den lokale testserveren). Bruk `crypto.getRandomValues` (virker overalt). Se `makeId` i `sections/presets.js`.
- **Temastyrt UI (ADR-0009): aldri native `<select>` i redigerings-UI** (popupen følger OS-temaet og blir uleselig). Bruk `Dropdown.svelte` (admin) eller `createDropdown` (`engine/dropdown.js`, lerret), eller segmentknapper.
- **Hjelpechip (ADR-0008): alt med spesialfunksjoner skal ha en «?»-chip** som åpner et vedvarende hjelpekort. Felles hjelper: `engine/hint.js` (`attachHint`).
- **Datablokkers autovekst melder KUN høyde** (`urd-grow`), aldri hele framen, ellers teleporteres en dratt blokk tilbake.
- **Seksjoner MÅ ha `id`.** `handleAddSection` tildeler defensivt en om en preset glemmer den.
- **Lokal utvikling må virke** (`python3 -m http.server` fra `template/`): plugin-utviklere jobber lokalt. Ting som bare virker på den deployede siden (functions) skal degradere pent lokalt.

## Plugins

Referanse-pluginene i `template/plugins/` (kalender, skjema, kart) viser mønsteret: manifest med `provides`, blokk med `version`/`migrations`, seksjonspreset (med `id`), egen CSS via ÉN style-tag, redigering i preview via `urd-edit`, hjelpechip, temastyrte nedtrekk, og ren logikk i egen modul med `node --test`-tester. Se `template/plugins/README.md`.

## ADR-er

Les og følg dem; skriv en ny ADR når du tar en beslutning med varige konsekvenser. Gjeldende: 0001 hybrid editormodell, 0002 Svelte for editor / lesbar JS for motor, 0003 publisering via GitHub OAuth + Pages Functions, 0004 monorepo med template-mappe, 0005 versjonering og migrering, 0006 plugin-CSP-behovsmodell, 0007 samlinger (datablokk-mønsteret), 0008 hjelpechip-regelen, 0009 temastyrt UI-regelen.

## Testrunder-seksjonen i backloggen

`docs/BACKLOG.md` har en «Testrunder»-seksjon: eierens sjekkliste over levert arbeid som venter på testing. **Legg til nye punkter når du leverer noe, men fjern aldri noe der; kun eieren stryker.**

## Kjøre verktøy

Kjør node/npm slik miljøet ditt krever. På den opprinnelige utviklingsmaskinen kjøres host-kommandoer via `flatpak-spawn --host` (Flatpak-sandkasse); på en vanlig maskin kjører du dem direkte.
