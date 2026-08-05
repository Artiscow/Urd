# ADR-0004: Monorepo med template-mappe (v0), template-repo-splitt ved v1

**Status:** vedtatt (juli 2026); addendum om gjennomført splitt (august 2026)

## Kontekst

Urd består av tre deler som må holde takt: datamodell-kontrakten (`schema/`), motoren (`template/assets/engine/`) og editoren (`editor/` → bygget til `template/admin/assets/`). Samtidig skal sluttbrukere kunne klone «bare nettsiden».

## Beslutning

**Ett repo nå.** I tidlig utvikling endrer en skjemaendring alle tre delene i samme commit, og den bygde editoren må alltid matche motoren fra samme commit. To repoer ville gitt kryssversjon-pinning og ødelagte mellomtilstander før det finnes et produkt.

`template/` er nettsiden: deployes ved å peke hostens rotmappe dit. **Ved v1** synker en GitHub Action `template/` til et rent `urd-template`-repo (ren historikk, ingen editor-kilde/docs) med «Use this template»-knapp.

**Oppdateringer** styres av `template/urd.json`: motorversjon + manifest over Urd-eide stier. Den fremtidige oppdatereren overskriver kun manifest-stier - aldri `content/`, `media/`, `plugins/`.

## Konsekvenser

- Atomære endringer på tvers av skjema/motor/editor; én klone, én PR.
- v0-brukere (utviklere/piloter) kloner hele Urd og peker hosten på `template/` - litt mer friksjon, akseptabelt før v1.
- Splitt-Action og oppdaterer er egne leveranser i v0.6.

## Addendum: splitten gjennomført (0.6.9, august 2026)

- **Release-Action-en finnes** (`.github/workflows/release.yml`): ved GitHub-release synkes innholdet av `template/` til `urd-template`-repoet som ÉN squashet commit («Urd vX.Y.Z») og tagges med versjonen; taggen er oppdaterens sjekksum-baseline (ADR-0014) og flyttes aldri. Versjonskonsistensen (urd.json.engine == tagg == CHANGELOG-overskrift == editor/package.json) voktes av `scripts/check-release.mjs`.
- **Monorepoet forblir utviklingsstedet** (dette ADR-ets kjernebeslutning står): brukerne fødes fra `urd-template` via «Use this template» og oppdateres via Oppdatering-panelet; monorepoets `template/content/` er kuratert eksempelinnhold som seedes inn i malen.
- **urdweb (demo-siden) skilles ut som eget repo laget FRA malen** etter fase-slippet, som dogfooding av selve splitten: demo-publisering skriver da aldri i eksempelinnholdet nye brukere får, og monorepo-støyen (utviklingscommits i historikk-panelet, truncated-varsler ved store diff-er) forsvinner av seg selv.
- **Oppdaterings-avsnittet over er levert og presisert i ADR-0014**: manifestet i urd.json fikk `userPaths` i tillegg til `ownedPaths`, og «overskriver kun manifest-stier» ble til blob-SHA-klassifisering med per-fil-valg og sjekksum-varsel for håndredigerte filer.
