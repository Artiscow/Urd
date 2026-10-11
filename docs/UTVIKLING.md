# Utvikling av Urd

[🇬🇧 English](languages/DEVELOPMENT-en-GB.md) · **🇳🇴 Bokmål**

Dette dokumentet er for oss som utvikler selve Urd. (Foreninger som *bruker* Urd trenger aldri noe av dette; de kloner malen og redigerer via /admin.)

Den løpende oppgavelisten ligger i [BACKLOG.md](BACKLOG.md). Fasene og målene ligger i [VEIKART.md](VEIKART.md). Skal du bidra med endringer utenfra (fork/PR-flyten), se [CONTRIBUTING.md](../CONTRIBUTING.md).

## Det du trenger

| Verktøy | Til hva | Påkrevd? |
|---|---|---|
| Git | Alt | Ja |
| En teksteditor | Alt | Ja |
| Node.js 18+ (med npm) | Editor-utvikling (Svelte/Vite) og tester | Kun for editor/tester |
| Python 3 (eller annen statisk filserver) | Se nettsiden lokalt | Valgfritt |
| Wrangler (`npx wrangler`) | Teste publiserings-functions lokalt | Fra v0.2 |

Node er det eneste som ikke følger med repoet. Alt annet av kildekode og ferdigbygde filer ligger i git.

## Kom i gang på en ny maskin

```bash
git clone https://github.com/<eier>/Urd.git
cd Urd

# Se nettsiden lokalt (ingen Node nødvendig):
python3 dev-server.py 8000
# åpne http://localhost:8000/admin
# dev-server.py serverer template/ med caching AV: uten den gjetter nettleseren fil-ferskhet og forhåndsvisningens motorfiler blir hengende igjen selv ved hard reload. Selve serveren er template/dev-server.py, som hvert nettsted får med malen (kjøres fra nettstedets mappe der); rotfilen starter den. En vanlig `python3 -m http.server` beholder gamle motorfiler til nettleserens cache tømmes.

# Editor-utvikling (krever Node):
cd editor
npm install          # gjenskaper node_modules fra package.json
npm run dev          # utviklingsserver med hot reload
npm run build        # kompilerer til ../template/admin/assets/

# Tester og skjemavalidering:
node --test tests/*.mjs
cd editor && npm run validate
```

CI (`.github/workflows/tests.yml`) kjører det samme på hver push og PR,
pluss at editoren bygger. CodeQL, Dependabot og dependency review vokter
sikkerhet og avhengigheter.

Første `npm install` lager `package-lock.json`; den skal committes, slik at alle maskiner får identiske avhengighetsversjoner.

## Repo-kart

```
docs/       Dokumentasjon. VISJON (hvorfor), ARCHITECTURE (hvordan), SCHEMA (datakontrakten), VEIKART (faser), BACKLOG (oppgaver),
            adr/ (beslutninger med begrunnelse)
schema/     JSON Schema: maskinlesbar utgave av SCHEMA.md
editor/     Svelte-kildekoden til editoren. Eneste sted med npm.
template/   NETTSIDEN. Synkes til urd-template-repoet ved utgivelser («Use this template»):
              assets/engine/<versjon>/   håndskrevet lesbar motor-JS (ALDRI kompilert; versjonert mappe, ADR-0013)
              assets/urd/      stabile plugin-API-skall (re-exports mot gjeldende motorversjon)
              admin/assets/    ferdigbygd editor (committes, fra editor/)
              content/         eksempelinnhold (brukereid ved kloning)
              functions/       publiseringslaget (Cloudflare Pages Functions)
              plugins/         plugin-indeks + eksempel
tests/      node --test-tester (foreløpig migreringskontrakten)
```

## Regler som alltid gjelder

1. **De fire løftene i [VISJON.md](VISJON.md) brytes aldri.** Er du i tvil om en endring bryter et løfte, ta det opp før du bygger.
2. **Motoren forblir håndskrevet, lesbar, avhengighetsfri ES-modul-JS.** Ingen rammeverk, ingen kompilering, ingen npm-avhengigheter i `template/assets/engine/`.
3. **Endrer du formen på props for en blokk/seksjon/bakgrunn/animasjon, SKAL du bumpe `version` og skrive en migrering** (`migrations[n]` løfter v(n) til v(n+1), ren funksjon, med test i `tests/`). Se [ADR-0005](adr/0005-versioning-and-migration.md).
4. **Skjemaendringer gjøres tre steder i samme commit:** `docs/SCHEMA.md`, `schema/*.schema.json` og eksempeldataene i `template/content/`. Eksemplene skal alltid validere.
5. **Editor-endringer bygges før merge:** `npm run build`, og den oppdaterte `template/admin/assets/` committes sammen med kilden.
6. **Publisering får aldri skrive kode.** Sti-allowlisten i `template/functions/_lib/guard.js` (nekt `functions/`, `admin/`, `assets/engine/`, `assets/urd/`, med mer) endres kun med svært god grunn. Oppdatereren har det motsatte domenet (eierskapskartet, ADR-0014); kontraktstester holder guard.js og urd.json i synk.
7. **Engelsk er Urds kanoniske språk, norsk (bokmål) sekundært** (besluttet 11. september 2026, ADR-0022): alt utviklerrettet skrives på engelsk: kode, AGENTS.md, ADR-ene, dokumentene under docs/, nye innslag i CHANGELOG, BACKLOG og TESTRUNDER, og commit-meldinger (eldre innslag står som de er). Dokumenter som ennå ikke er oversatt står på norsk til sin tur, og den engelske teksten gjelder ved avvik. Alt en sideeier eller besøkende kan lese finnes på både engelsk og norsk: README, brukerguiden og oppsettsguiden under docs/languages/, og UI-tekstene (fem språk, ADR-0012, med bokmålsordboken som base). Ingen tankestreker i tekst.

8. **Invariantene som testene holder fast** (de en endring lettest bryter uten å merke det): lerretsinvarianten i ADR-0018 (`.urd-canvas` har aldri `transform`, `filter`, `perspective`, `backdrop-filter`, `contain`, `container-type` eller `will-change`) er en filinvariant-test som leser `base.css`; `stackOrder` og `mobilePlacementToCss` i motoren er rene og testes uten DOM; paritetstesten `tests/i18n.test.mjs` finner locale-mappene (motorens `locales/site/` og `locales/admin/` og hver `plugins/<id>/locales/`) selv, så et nytt språksett eller en språkpakke trenger ingen registrering; kompatibilitetsflaten for plugin-kopier (aliasene, seksjonens rene inline min-height, innholdsgeometrien, de gamle konfigpanel-klassene) er dokumentert i SCHEMA.md og låst av `tests/plugin-compat.test.mjs`; MCP-protokollversjonen er én låst konstant i `template/mcp/` med egen test og en datert kommentar som navngir spesifikasjonsrevisjonen, og `.mcp.json` er klassifisert EKSPLISITT som eksakt sti i `ownedPaths` og `OWNED_PATTERNS`, siden fullstendighetstesten i `tests/guard.test.mjs` filtrerer bort punktfiler og en uklassifisert `.mcp.json` ville latt et hull ingen test melder (`isAllowedPath` avviser både `mcp/**` og `.mcp.json`). MCP-testene ligger i `tests/mcp-*.test.mjs`: dispatcheren som ren funksjon mot faste meldinger, verktøyene mot en midlertidig siderot under `os.tmpdir()` (aldri mot ekte innhold), invarianttestene (ingen npm-import, ingen `fetch` / `node:http` / `node:child_process`, ingen import av `mcp/` utenfra, blokktypene avledet av `blocks/`-mappa lik `define`-kallene i `urd.js`), stivakten testet mot `..`, absolutte stier og punktfiler, pluss én integrasjonstest som starter serveren og gjør `initialize` og `tools/list` over rør; skjemaparitet mot `schema/` ligger i `editor/scripts/validate.mjs`, siden ajv bor i `editor/node_modules`, og CI kjører `npm run validate`.
9. **Norsk-revisjonen** (ADR-0021) kjøres i tre lag, siden et æøå-søk alene overser norsk skrevet uten æøå: (1) æøå, (2) norske småord uten æøå, (3) ASCII-fisert norsk (sok, naar, paa, forst, rekkefolge). Den er ren når ingenting finnes utenfor de tillatte stedene (språkordbøkene, uoversatte dokumenter og logginnslag, nettstedinnhold og bevisst norske testdata). Æøå-restene som er tillatt i kode, hver med sin grunn: språknavnene «bokmål»/«Bokmål» som fagterm i engelske kommentarer (i18n.js, App.svelte) og endonymet 'Norsk bokmål' i språklisten; valutaenheten «øre» i vipps.js (enheten Vipps-API-et tar); slugify-literalene og det bevisste æøå-eksempelet i imageTools.js; V1_REASONS-nøkkelen 'seksjonshøyde' i migrate.js (migreringsdata); regex-en som matcher norske påmeldingsord i kalenderens ics.js (den leser norsk brukerinnhold); de norske `names`-verdiene i lang-sv-manifestet (oversettelsesdata); valutastandarden `'kr'` i butikkblokkene og presetene (brukerdata sideeieren setter); og eksempelstrengen «om 3 døgn» i relativeDays-kommentaren i i18n.js. Et plugin-manifests `name`-felt er den engelske reserven, mens `names.nb` bærer den norske teksten.

## Vanlige oppgaver

- **Ny kjerneblokk:** lag `template/assets/engine/blocks/<navn>.js` etter mønsteret i `text.js` (version, label, defaults, migrations, render), registrer den i `urd.js` (fra v0.2), dokumenter props-formen i SCHEMA.md ved behov.
- **Nytt bakgrunnslag:** samme mønster i `template/assets/engine/backgrounds/`.
- **Ny seksjonspreset:** en datafabrikk (`create()` som returnerer en gyldig seksjon), ingen egen kodevei.
- **Endre datamodellen:** se regel 3 og 4 over.
- **Sett opp betalingslaget (ADR-0020):** Cloudflare-hemmeligheter, aldri repodata: `VIPPS_CLIENT_ID`, `VIPPS_CLIENT_SECRET`, `VIPPS_SUBSCRIPTION_KEY`, `VIPPS_MSN` og den valgfrie `VIPPS_API_BASE` (testmiljøet er `https://apitest.vipps.no`). Uten dem svarer kassefunksjonen 503 med feilkoden `vippsNotConfigured`; knappen i kasseblokken viser en rolig utilgjengelig-tekst, og skjemakassen virker uendret.
- **Teste publiseringslaget lokalt (fra v0.2):** `npx wrangler pages dev template` og sett miljøvariablene fra [ADR-0003](adr/0003-publishing-via-github-oauth-and-pages-functions.md) i en `.dev.vars`-fil (gitignoreres). Wrangler bruker `_headers`, så motorfilene sjekkes på nytt der som på testsiden.

## Versjonering

Urd følger [semantisk versjonering](https://semver.org/lang/no/): `MAJOR.MINOR.PATCH`, alltid tre tall (`0.1.0`, aldri `0.1`).

- **PATCH** (`0.2.0 → 0.2.1`): kun feilrettinger, ingen ny funksjonalitet.
- **MINOR** (`0.2.1 → 0.3.0`): ny funksjonalitet. Veikartfasene er minorversjoner, og utgivelsene i en fase bærer fasens minor med løpende patch-nummer (0.7.1, 0.7.2 ...), uavhengig av milepælsnumrene i backloggen; fase-slippet ved gaten er det siste av dem (besluttet 15. september 2026).
- **MAJOR** (`1.4.2 → 2.0.0`): endringer som kan kreve handling av de som oppgraderer. Merk: selv MAJOR knuser aldri en bygget side (løfte 2, migreringskontrakten gjelder alltid).
- Før `1.0.0` er vi i utviklingsfase: `0.x`-minorer kan inneholde brytende endringer.

Sannhetskilden er `engine`-feltet i `template/urd.json`. Git-taggen (`v0.2.0`) og CHANGELOG-overskriften skal alltid stemme med den. `editor/package.json` og plugin-manifester versjoneres etter samme regler (plugins deklarerer motorkompatibilitet via `requiresEngine`).

## Utgivelser (automatisert fra 0.6.9)

1. Alle tester grønne, eksempeldata validerer mot skjemaene.
2. Bump motorversjonen: sett `engine` i `template/urd.json`, `git mv` motormappa til `template/assets/engine/<ny versjon>/`, og oppdater re-export-målene i `template/assets/urd/`-skallene pluss referansene i HTML-skallene (rot + slug-kopier). Testene, editor-bygget og valideringen leser mappenavnet fra urd.json og følger automatisk (`tests/_engine.mjs` løser motormoduler fra det, vite-aliaset `$engine` i `editor/vite.config.js` peker på det, og `editor/scripts/validate.mjs` leser det; ADR-0013). Modulepreload-testen feiler på alt som henger igjen: den krever at mappa urd.json navngir finnes og er den eneste under `assets/engine/`, at hvert HTML-skall refererer til den, at re-export-målene i `assets/urd/`-skallene stemmer, og at slug-kopiene er byte-like rot-index.html. Editor-bundelen bundler motormoduler (bundlerens kildekommentarer bærer den versjonerte stien), så et motorbump trenger alltid en nybygd og committet bundel (steg 3).
3. `npm run build` i `editor/`, committ output (bundelen bærer motorstien).
4. Oppdater `docs/CHANGELOG.md` (utgivelsesoverskrift `## [x.y.z] - dato`) og `editor/package.json` til samme versjon.
5. Tagg utgivelsen (`v0.x.y`) og publiser en GitHub-release på taggen.
6. Release-Action-en (`.github/workflows/release.yml`) kjører da automatisk: validerer versjonskonsistens (`scripts/check-release.mjs`: engine == tagg == CHANGELOG-overskrift == package.json), kjører testene, og synker innholdet av `template/` til `urd-template`-repoet som ÉN squashet commit («Urd v0.x.y») med samme tagg. I kopien bytter `scripts/release-headers.mjs` motorregelen i `_headers` til malens (lagres for alltid): hovedrepoets egen regel lar nettleseren sjekke motorfilene på nytt, siden de endres mellom utgivelser under samme mappe (ADR-0013 vedtak 2); hovedrepoets `template/_headers` har `Cache-Control: no-cache` for `/assets/engine/*`, så testsiden og en lokal `wrangler pages dev` sjekker motoren på nytt, og `dev-server.py` cacher aldri. Byttet kjører etter kopien av `template/` og før commiten, og stopper kjøringen om ikke kopiens motorregel er den immutable. En manuell kjøring av Action-en startes med workflowen fra `main`; `check-release.mjs` godtar bare workflowen fra `main` eller fra den synkede taggen, siden en eldre workflow ville hoppet over byttet. `tests/release-headers.test.mjs` låser skriptets resultat til malens utgitte blob, fordi oppdatereren viser en «endre for hånd»-merknad når en sides `_headers` avviker fra malens i målversjonen, så en endring av malens tekst når hver side som aldri redigerte fila. Taggen i malrepoet er oppdaterens sjekksum-baseline og flyttes aldri.

Forutsetninger (engangsoppsett, gjøres FØR første utgivelse; før dette finnes verken malrepoet eller «Use this template»-knappen, og lenkene til `urd-template` i dokumentasjonen gir 404):

1. Opprett det offentlige repoet `urd-template` på GitHub (**New repository**). Huk av «Add a README file» så main-grenen finnes fra start (release-Action-en pusher til eksisterende gren; første synk erstatter uansett alt innholdet).
2. Lag tokenet: din GitHub-profil → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**, med Repository access = «Only select repositories» → `urd-template`, og Permissions → Contents = Read and write. Kopier token-strengen (vises kun én gang).
3. Legg tokenet inn som secret I MONOREPOET (repoet `Urd`, der release-workflowen kjører - IKKE i malrepoet, som ikke trenger noen secrets): `Urd` → **Settings → Secrets and variables → Actions → New repository secret**, Name `URD_TEMPLATE_PAT`, Secret = token-strengen. Navnet står i workflowen og dokumentasjonen; selve strengen skal aldri inn i noen fil.
4. Kjør første synk (publiser en release, eller en manuell prerelease-dispatch av Release-workflowen).
5. Merk repoet som mal: **Settings → General → huk av «Template repository»**. Først DA vises «Use this template»-knappen på repo-forsiden (knappen er en egenskap ved et repo merket som mal, aldri ved en mappe). Sett samtidig GitHub-topicen `urd-template` (eierbeslutning 5. august 2026: engelsk er standarden for topics).

Plugins deles med topicen `urd-plugin`.

**Prerelease-synk (rc):** for å ende-til-ende-teste oppdatereren før et slipp kan Action-en kjøres manuelt (`workflow_dispatch`) mot en rc-tagg med prerelease-flagget satt; da hoppes CHANGELOG-/package.json-sjekkene over. Bruk et eget treparts versjonsnummer for rc-en (semver-parseren i `satisfiesEngine` er streng treparts, så suffikser som `-rc.1` kan ikke stå i engine-feltet).
