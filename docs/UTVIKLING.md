# Utvikling av Urd

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
cd template && python3 -m http.server 8000
# åpne http://localhost:8000
# (andre sider lokalt: http://localhost:8000/?page=om-oss)

# Editor-utvikling (krever Node):
cd editor
npm install          # gjenskaper node_modules fra package.json
npm run dev          # utviklingsserver med hot reload
npm run build        # kompilerer til ../template/admin/assets/

# Tester:
node --test tests/
```

Første `npm install` lager `package-lock.json`; den skal committes, slik at alle maskiner får identiske avhengighetsversjoner.

## Repo-kart

```
docs/       Dokumentasjon. VISJON (hvorfor), ARKITEKTUR (hvordan),
            SKJEMA (datakontrakten), VEIKART (faser), BACKLOG (oppgaver),
            adr/ (beslutninger med begrunnelse)
schema/     JSON Schema: maskinlesbar utgave av SKJEMA.md
editor/     Svelte-kildekoden til editoren. Eneste sted med npm.
template/   NETTSIDEN. Dette er det foreninger kloner:
              assets/engine/   håndskrevet lesbar motor-JS (ALDRI kompilert)
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
6. **Publisering får aldri skrive kode.** Sti-allowlisten i `template/functions/_lib/guard.js` (nekt `functions/`, `admin/`, `assets/engine/`, med mer) endres kun med svært god grunn.
7. **Norsk i dokumenter og brukerflater, engelsk i kode/identifikatorer.** Ingen tankestreker i tekst.

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

## Utgivelser (form fra v0.2, automatiseres i v0.6)

1. Alle tester grønne, eksempeldata validerer mot skjemaene.
2. `npm run build` i `editor/`, committ output.
3. Bump motorversjon i `template/urd.json` og oppdater `CHANGELOG.md`.
4. Tagg utgivelsen (`v0.x.y`).
5. Fra v0.6: release-Action synker `template/` til `urd-template`-repoet.
