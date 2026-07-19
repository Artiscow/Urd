# Arkitektur

Dette dokumentet beskriver hvordan Urd henger sammen. Datamodellen - kontrakten alt bygger på - står i [SKJEMA.md](SKJEMA.md). Begrunnelsene for veivalgene står i [adr/](adr/).

## Systemoversikt

```
BESØKENDE                          REDAKTØR
   │                                  │
   ▼                                  ▼
dinside.no ──────────────────► dinside.no/admin
   │                                  │ GitHub-login (OAuth)
   │  statiske filer:                 ▼
   │  index.html                ferdigbygd editor (Svelte, kompilert)
   │  assets/engine/*  ◄──┐           │
   │  content/**.json     │           │ utkast i localStorage
   │  media/*             │           ▼
   │                      └── iframe-preview: den EKTE siden,
   ▼                          utkast pushes via postMessage
 motoren rendrer siden                │
 fra content/-data                    │ «Publiser»
                                      ▼
                          functions/api/github/* (Pages Functions)
                                      │ én commit via Git Data API
                                      ▼
                                GitHub-repoet  ──►  hosten deployer (~1 min)
```

To verdener, ett repo:

- **Besøkersiden** er rå statikk: `index.html` laster den håndskrevne motoren (`assets/engine/`), som leser `content/site.json` + `content/pages/*.json` og bygger DOM. Ingen byggeprosess, ingen rammeverk.
- **Admin** (`admin/`) er en ferdigbygd Svelte-app som committes som statiske filer. Den redigerer de samme JSON-filene, forhåndsviser dem gjennom den ekte siden i en iframe, og publiserer via serverless-funksjoner.

## Motoren (`template/assets/engine/`)

Håndskrevet, lesbar, avhengighetsfri ES-modul-JavaScript - aldri kompilert ([ADR-0002](adr/0002-svelte-for-editor-lesbar-js-for-motor.md)). Eierskapsløftet gjelder det besøkende laster, og editorens preview-iframe laster nøyaktig disse filene - forhåndsvisningstroskap er dermed strukturell, ikke noe som må vedlikeholdes.

Kjernedeler:

- **`urd.js`** - inngangspunkt. Oppretter `window.Urd` med registrene, laster site + side, kjører migrering og render.
- **`registry.js`** - felles registerfabrikk. Alle utvidbare typer bruker samme mønster:
  ```js
  Urd.blocks.define('text', { version, label, defaults, migrations, render, mount? });
  Urd.sections.definePreset('hero', { label, create });
  Urd.backgrounds.define('gradient', { version, label, defaults, migrations, render });
  Urd.animations.define('fade-in', { version, label, defaults, migrations, apply });
  ```
  Plugins bruker de identiske API-ene - kjernen og plugins er likestilte.
- **`migrate.js`** - stegvis versjonsløfting ved lasting. Den viktigste filen i Urd; se [ADR-0005](adr/0005-versjonering-og-migrering.md). Løfting skjer i minnet - filene på disk skrives først ved neste publisering. Ukjent type → nøytral plassholder, data beholdes urørt.
- **`render.js`** - render-løkke: side → seksjoner → bakgrunnslag + blokker. Oversetter grid-enheter (kolonner/rader) til CSS. Inkrementell: én endret seksjon rerendres alene (brukes av preview).
- **`theme.js`** - mapper `theme.tokens` fra `site.json` til CSS-variabler (`--urd-color-bg`, `--urd-font-heading`, …).
- **`nav.js`** - bygger navigasjon fra sideregisteret i `site.json`. Ingenting hardkodes: nav, ruting og adminpanel-lister deriveres alle fra samme register.

## Editoren (`editor/` → `template/admin/assets/`)

Skrives i Svelte 5 + Vite i Urd-hovedrepoet. Ved utgivelse bygges den til statiske filer i `template/admin/assets/` som **committes** - foreninger som kloner malen får en ferdig editor og rører aldri npm. Kildekoden er åpen her; de kompilerte filene i klonede repoer er produktet av den.

Nøkkelmekanismer (mønstre validert i ApeironLF):

- **Utkast:** all redigering skrives fortløpende til `localStorage`. En «baseline» (publisert tilstand) sammenlignes mot utkastet; er de like, fjernes utkastet - slik er «upubliserte endringer»-merket alltid ærlig.
- **Forhåndsvisning:** editoren viser den ekte siden i en iframe med `?preview=1` og pusher utkast via `postMessage`. Motoren lytter og rerendrer inkrementelt.
- **Panelregister:** editorens paneler (sider, nav, tema, …) registreres med samme define-mønster som motoren bruker, slik at plugins kan levere admin-paneler senere.
- **Mobil-tilsyn:** editoren håndhever flagg-reglene i [SKJEMA.md](SKJEMA.md#mobil-tilsyn) - endrer du desktop-layout i en seksjon med manuell mobil-layout, flagges seksjonen til du har sett over mobilvisningen.

## Publiseringsflyten (`template/functions/`)

Cloudflare Pages Functions - små serverless-funksjoner som følger med repoet og krever null drift ([ADR-0003](adr/0003-publisering-via-github-oauth-og-pages-functions.md)). Mønsteret er validert i produksjon i ApeironLF.

| Endepunkt | Rolle |
|---|---|
| `GET /api/github/login` | Starter GitHub OAuth (state-cookie mot CSRF) |
| `GET /api/github/callback` | Bytter kode mot token server-side; token lagres i httpOnly-cookie og når aldri nettleser-JS |
| `GET /api/github/me` | Innloggingsstatus + håndhever `ALLOWED_LOGINS` |
| `POST /api/github/commit` | Kjernen: committer alle endrede filer som ÉN commit via Git Data API |
| `GET /api/github/latest` | HEAD + diff siden baseline-SHA → konfliktdeteksjon («noen andre har publisert») |
| `GET /api/github/history` | Siste commits → grunnlag for angre-publisering |
| `POST /api/github/revert` | Forward-revert: ny commit som peker på forrige tre - historikk slettes aldri |

Sikkerhetslag (forsvar i dybden):

1. **Ingen admin-passord** - å *redigere* lokalt er ufarlig; porten er at bare GitHub-innloggede brukere i `ALLOWED_LOGINS` kan *committe*.
2. **Sti-allowlist i `commit.js`:** publisering kan bare skrive `content/**`, `media/**`, `plugins/plugins.json` og per-side rutingskopier (`<slug>/index.html`, aldri reserverte mapper) - aldri `functions/**`, `.github/**`, `admin/**`, `assets/engine/**`, `urd.json` eller `_headers`. En kapret redaktørsesjon kan altså ikke plante kode.
3. **Konfliktvern i to lag:** editoren sammenligner mot baseline-SHA (`latest?base=`) og varsler ved overlappende filer; commit-endepunktet avviser i tillegg med 409 hvis HEAD flyttet seg etter sjekken (valgfri `expect` i forespørselen). Uten `expect` (eldre klienter, direkte API-bruk) finnes ikke serververnet.

Konfigurasjon er seks miljøvariabler hos hosten: `GITHUB_REPO`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GITHUB_BRANCH`, `GITHUB_SCOPE`, `ALLOWED_LOGINS`.

## Repo-oppsett: monorepo med `template/`

```
Urd/
├── docs/          dokumentasjon (denne mappen)
├── schema/        maskinlesbar datamodell-kontrakt (JSON Schema)
├── editor/        Svelte-kildekode - følger IKKE med klonede sider
└── template/      NETTSIDEN. Deployes som Pages-rot; dette er det foreninger kloner.
```

I tidlig utvikling endres skjema, motor og editor i samme commit, og den bygde editoren i `template/admin/assets/` må alltid matche motoren fra samme commit - derfor ett repo nå ([ADR-0004](adr/0004-monorepo-med-template-mappe.md)). Mot v1 synker en GitHub Action `template/` til et rent `urd-template`-repo med «Use this template»-knapp.

## Oppdateringsmekanismen

`template/urd.json` er manifestet: motorversjon + listen over **Urd-eide stier** (`assets/engine/**`, `admin/**`, `functions/**`, `index.html`, `_headers`, `urd.json`). Den fremtidige oppdatereren (knapp i admin, planlagt v0.6) henter en Urd-utgivelse og lager én commit som overskriver *kun* manifest-stiene - aldri `content/`, `media/` eller `plugins/`. Innhold skrevet på gammelt skjema løftes av migreringskontrakten ved lasting; det er hele poenget med den.

Åpent spørsmål (avgjøres før v0.6): varsling når brukeren har håndredigert Urd-eide filer (sjekksum-sammenligning før overskriving).

## Arv fra ApeironLF - hva som er fikset by design

| Svakhet i ApeironLF | Urd-løsningen |
|---|---|
| Ad-hoc `normalize()` uten formell versjonering | `version` + stegvise `migrations` på alle typer; `schemaVersion` på filnivå |
| Sidekart, nav og panel-liste hardkodet tre steder | Ett sideregister i `site.json`; alt deriveres |
| Theme-tokens finnes som CSS-variabler, men kan ikke redigeres | Tokens er data i `site.json`; admin får token-panel (v0.5) |
| Ingen oppsettsveiviser ved kloning | Veiviser i admin ved første besøk (v0.5) |
| Seksjonstyper er kodeveier | Seksjoner er generiske containere; typer er data-presets |
