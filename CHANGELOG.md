# Endringslogg

Alle vesentlige endringer i Urd dokumenteres i denne filen.

Formatet følger [Keep a Changelog](https://keepachangelog.com/no/1.1.0/),
og prosjektet følger [semantisk versjonering](https://semver.org/lang/no/).

## [Ulansert]

### Lagt til
- Motoren rendrer sider: `render.js` (grid-til-CSS, migrering, plassholdere), blokkene `text`/`button`/`shape`, bakgrunnslagene `color`/`gradient`/`glow`/`grain`, navigasjon fra sideregisteret, plugin-lasting og preview-modus i `urd.js`. Tester i `tests/render.test.mjs`.
- `CONTRIBUTING.md`: bidragsguide for eksterne bidragsytere (fork/gren/PR-flyt).
- Visjons- og arkitekturdokumenter (`docs/`), datamodell-kontrakt (`docs/SKJEMA.md` + `schema/`).
- Repo-skjelett: `template/` (motor-stubber, eksempelinnhold, functions-stubber) og `editor/` (Svelte-skall).
- `template/assets/engine/migrate.js` - stegvis versjonsløfting (kjerne-invarianten), med tester i `tests/`.
- Utviklerdokumentasjon (`docs/UTVIKLING.md`) og løpende oppgaveliste (`docs/BACKLOG.md`).
