# Endringslogg

Alle vesentlige endringer i Urd dokumenteres i denne filen.

Formatet følger [Keep a Changelog](https://keepachangelog.com/no/1.1.0/),
og prosjektet følger [semantisk versjonering](https://semver.org/lang/no/).

## [Ulansert]

### Lagt til
- Synlig grid under dra/resize, og grid-kontroller i editoren (kolonner, radhøyde, snap av/på) som redigerer site.json gjennom utkast-og-publiser-flyten. Snap av gir fri plassering i kvarte grid-enheter.
- Lerret-redigering (v0.3-start): dra, resize og slett blokker med grid-snapping direkte i forhåndsvisningen (håndtak på hover), og blokkpalett (+ Tekst / + Knapp / + Form) i editoren. Editeringslaget (`preview-edit.js`) lastes kun i preview-modus og når aldri besøkende.
- Publiseringslaget: GitHub OAuth (login/callback/me) og commit/latest via Git Data API som Cloudflare Pages Functions, med httpOnly-token, ALLOWED_LOGINS og sti-allowlist (enhetstestet). Innloggingsstatus og «Logg inn med GitHub» i editoren. Oppsettguide i `docs/OPPSETT-PUBLISERING.md`.
- Editoren (første versjon): preview-iframe med den ekte siden, klikk-og-skriv på tekstblokker, utkast i localStorage med ærlig «upubliserte endringer»-merke, forkast og publiser (publiseringslaget er fortsatt stubb). Bygges fra `editor/` til `template/admin/assets/`.
- Motoren rendrer sider: `render.js` (grid-til-CSS, migrering, plassholdere), blokkene `text`/`button`/`shape`, bakgrunnslagene `color`/`gradient`/`glow`/`grain`, navigasjon fra sideregisteret, plugin-lasting og preview-modus i `urd.js`. Tester i `tests/render.test.mjs`.
- `CONTRIBUTING.md`: bidragsguide for eksterne bidragsytere (fork/gren/PR-flyt).
- Visjons- og arkitekturdokumenter (`docs/`), datamodell-kontrakt (`docs/SKJEMA.md` + `schema/`).
- Repo-skjelett: `template/` (motor-stubber, eksempelinnhold, functions-stubber) og `editor/` (Svelte-skall).
- `template/assets/engine/migrate.js` - stegvis versjonsløfting (kjerne-invarianten), med tester i `tests/`.
- Utviklerdokumentasjon (`docs/UTVIKLING.md`) og løpende oppgaveliste (`docs/BACKLOG.md`).
