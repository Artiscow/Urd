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
# dev-server.py serverer template/ med caching AV: uten den gjetter nettleseren fil-ferskhet og forhåndsvisningens motorfiler blir hengende igjen selv ved hard reload. `cd template && python3 -m http.server` virker fortsatt, men krever manuell cache-tømming etter motorendringer.

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
docs/       Dokumentasjon. VISJON (hvorfor), ARKITEKTUR (hvordan), SKJEMA (datakontrakten), VEIKART (faser), BACKLOG (oppgaver),
            adr/ (beslutninger med begrunnelse)
schema/     JSON Schema: maskinlesbar utgave av SKJEMA.md
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
3. **Endrer du formen på props for en blokk/seksjon/bakgrunn/animasjon, SKAL du bumpe `version` og skrive en migrering** (`migrations[n]` løfter v(n) til v(n+1), ren funksjon, med test i `tests/`). Se [ADR-0005](adr/0005-versjonering-og-migrering.md).
4. **Skjemaendringer gjøres tre steder i samme commit:** `docs/SKJEMA.md`, `schema/*.schema.json` og eksempeldataene i `template/content/`. Eksemplene skal alltid validere.
5. **Editor-endringer bygges før merge:** `npm run build`, og den oppdaterte `template/admin/assets/` committes sammen med kilden.
6. **Publisering får aldri skrive kode.** Sti-allowlisten i `template/functions/_lib/guard.js` (nekt `functions/`, `admin/`, `assets/engine/`, `assets/urd/`, med mer) endres kun med svært god grunn. Oppdatereren har det motsatte domenet (eierskapskartet, ADR-0014); kontraktstester holder guard.js og urd.json i synk.
7. **Norsk (bokmål) er kanonisk i dokumenter og brukerflater; engelsk i kode/identifikatorer** (også i datakontrakter: JSON-feltnavn, meldingstyper og oversettelsesnøkler). Kanonisk betyr ikke enerådende: fra 0.6.8 finnes UI-tekstene på fem språk (ADR-0012) og deler av dokumentasjonen er oversatt under [languages/](languages/), men den norske teksten gjelder ved avvik. Ingen tankestreker i tekst.

## Vanlige oppgaver

- **Ny kjerneblokk:** lag `template/assets/engine/blocks/<navn>.js` etter mønsteret i `text.js` (version, label, defaults, migrations, render), registrer den i `urd.js` (fra v0.2), dokumenter props-formen i SKJEMA.md ved behov.
- **Nytt bakgrunnslag:** samme mønster i `template/assets/engine/backgrounds/`.
- **Ny seksjonspreset:** en datafabrikk (`create()` som returnerer en gyldig seksjon), ingen egen kodevei.
- **Endre datamodellen:** se regel 3 og 4 over.
- **Teste publiseringslaget lokalt (fra v0.2):** `npx wrangler pages dev template` og sett miljøvariablene fra [ADR-0003](adr/0003-publisering-via-github-oauth-og-pages-functions.md) i en `.dev.vars`-fil (gitignoreres).

## Versjonering

Urd følger [semantisk versjonering](https://semver.org/lang/no/): `MAJOR.MINOR.PATCH`, alltid tre tall (`0.1.0`, aldri `0.1`).

- **PATCH** (`0.2.0 → 0.2.1`): kun feilrettinger, ingen ny funksjonalitet.
- **MINOR** (`0.2.1 → 0.3.0`): ny funksjonalitet. Veikartfasene er minorversjoner (v0.3 «Lerretet» slippes som `0.3.0`).
- **MAJOR** (`1.4.2 → 2.0.0`): endringer som kan kreve handling av de som oppgraderer. Merk: selv MAJOR knuser aldri en bygget side (løfte 2, migreringskontrakten gjelder alltid).
- Før `1.0.0` er vi i utviklingsfase: `0.x`-minorer kan inneholde brytende endringer.

Sannhetskilden er `engine`-feltet i `template/urd.json`. Git-taggen (`v0.2.0`) og CHANGELOG-overskriften skal alltid stemme med den. `editor/package.json` og plugin-manifester versjoneres etter samme regler (plugins deklarerer motorkompatibilitet via `requiresEngine`).

## Utgivelser (automatisert fra 0.6.9)

1. Alle tester grønne, eksempeldata validerer mot skjemaene.
2. Bump motorversjonen: sett `engine` i `template/urd.json`, `git mv` motormappa til `template/assets/engine/<ny versjon>/`, og oppdater re-export-målene i `template/assets/urd/`-skallene pluss referansene i HTML-skallene (rot + slug-kopier). Testene, editor-bygget og valideringen leser mappenavnet fra urd.json og følger automatisk (ADR-0013); modulepreload-testen feiler på alt som henger igjen.
3. `npm run build` i `editor/`, committ output (bundelen bærer motorstien).
4. Oppdater `docs/CHANGELOG.md` (utgivelsesoverskrift `## [x.y.z] - dato`) og `editor/package.json` til samme versjon.
5. Tagg utgivelsen (`v0.x.y`) og publiser en GitHub-release på taggen.
6. Release-Action-en (`.github/workflows/release.yml`) kjører da automatisk: validerer versjonskonsistens (`scripts/check-release.mjs`: engine == tagg == CHANGELOG-overskrift == package.json), kjører testene, og synker innholdet av `template/` til `urd-template`-repoet som ÉN squashet commit («Urd v0.x.y») med samme tagg. Taggen i malrepoet er oppdaterens sjekksum-baseline og flyttes aldri.

Forutsetninger (engangsoppsett, gjøres FØR første utgivelse; før dette finnes verken malrepoet eller «Use this template»-knappen, og lenkene til `urd-template` i dokumentasjonen gir 404):

1. Opprett det offentlige repoet `urd-template` på GitHub (**New repository**). Huk av «Add a README file» så main-grenen finnes fra start (release-Action-en pusher til eksisterende gren; første synk erstatter uansett alt innholdet).
2. Legg inn secreten `URD_TEMPLATE_PAT` i monorepoets Actions-secrets: en fine-grained PAT med contents read/write KUN på malrepoet.
3. Kjør første synk (publiser en release, eller en manuell prerelease-dispatch av Release-workflowen).
4. Merk repoet som mal: **Settings → General → huk av «Template repository»**. Først DA vises «Use this template»-knappen på repo-forsiden (knappen er en egenskap ved et repo merket som mal, aldri ved en mappe). Sett samtidig GitHub-topicen `urd-mal`.

Plugins deles med topicen `urd-plugin`.

**Prerelease-synk (rc):** for å ende-til-ende-teste oppdatereren før et slipp kan Action-en kjøres manuelt (`workflow_dispatch`) mot en rc-tagg med prerelease-flagget satt; da hoppes CHANGELOG-/package.json-sjekkene over. Bruk et eget treparts versjonsnummer for rc-en (semver-parseren i `satisfiesEngine` er streng treparts, så suffikser som `-rc.1` kan ikke stå i engine-feltet).
