# ADR-0004: Monorepo med template-mappe (v0), template-repo-splitt ved v1

**Status:** vedtatt (juli 2026)

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
