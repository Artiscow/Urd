# Veikart

Rekkefølgen er bevisst: **motor → publiseringsløkke → editor-dybde.** Motoren gjør skjemaet virkelig (skjemafeil er billigst å fikse før editoren avhenger av dem). Publiseringsløkka er den mest risikable *integrasjonen*, men det mest *utprøvde* mønsteret - å lande den tidlig gir et ekte deploy-mål for alt etterpå. Editor-finesse er den lange halen og bygges mot en fungerende rørledning.

## v0.1 - Skjelett *(denne runden)*

Dokumenter (VISJON, ARKITEKTUR, SKJEMA, VEIKART, ADR-er), JSON Schema-kontrakt i `schema/`, repo-skjelett med motor-stubber, eksempelinnhold, editor-skall og functions-stubber. `migrate.js` implementeres for ekte - invarianten først.

**Port:** eksempeldataene validerer mot skjemaene; dokumentene er godkjent av eier.

## v0.2 - «Tynn skive»

Ende-til-ende med minst mulig bredde: motoren rendrer `hjem.json` (én hero-seksjon, tekst- og knappblokk, gradientbakgrunn, kun desktop). Admin laster den ekte siden i iframe, klikk-og-skriv på tekst, utkast i localStorage, «Publiser» committer via functions, Cloudflare Pages serverer.

**Port:** rediger en overskrift i nettleseren på en deployet klon og se den live etter publisering - uten å røre en kodefil.

## v0.3 - Lerretet

- Blokkpalett: tekst, bilde, knapp, former (streker - horisontale, vertikale, skrå via rotasjon - sirkler, rektangler), logo.
- Dra, resize og snap på gridet (konfigurerbar grid-størrelse), z-orden.
- Seksjons-CRUD med «+ Ny seksjon» in-place, seksjonspresets (hero, bilder, footer) - og **bygge egne seksjoner fra tom seksjon**.
- Inkrementell rerender i preview.

## v0.4 - Responsivt, bakgrunn + animasjoner

- Mobilvisning i editor, auto-avledet stabling, manuelle mobil-frames.
- **Mobil-tilsyn-flagget ende-til-ende** (regler i [SKJEMA.md](SKJEMA.md#mobil-tilsyn)).
- Full bakgrunnseditor: farge/gradient (også animert), glød, bildelag, korn.
- **Animasjonsinnstillinger per blokk/seksjon** (inn-animasjoner, hover) - animasjoner følger samme version+migrate-kontrakt.
- Design av «dekor»-håndtering på mobil (streker/sirkler som stabler dårlig).

## v0.5 - Nettstedet rundt siden

- Sidepanel: opprette/omdøpe/slette sider fra sideregisteret.
- Nav-editor og theme-token-panel (farger, fonter, radier).
- Detaljert per-blokk/seksjon-editor (farger, typografi, avstander).
- Oppsettsveiviser ved første besøk (navn, farger, logo, GitHub/Cloudflare-kobling).
- Historikk- og angre-publisering-UI (`history`/`revert`).

## v0.6 - Økosystem

- Plugin-lasting for alvor: plugins leverer **egne blokker, seksjonspresets, bakgrunner, animasjoner og maler** via `register(Urd)`. Kalender-pluginen som referanseeksempel.
- **«Lagre som mal»**: egne seksjoner/sider lagres i `content/maler/` og kan deles som plugins.
- `urd-template`-repo-splitt + release-Action («Use this template»).
- Oppdaterer v1: én-klikks Urd-oppdatering som kun overskriver manifest-stiene i `urd.json`.

## v0.9 - Generalprøven

Vi bruker Urd som en fremmed bruker, uten snarveier:

- Lag en ekte side (arbeidsnavn: Urd-Design) via «Use this template»-knappen, i eget repo med eget Cloudflare-oppsett, satt opp KUN ved å følge OPPSETT-PUBLISERING.md. All friksjon som oppdages er funn som skal fikses.
- Bygg siden ferdig gjennom admin alene.
- Slipp deretter en Urd-oppdatering som inneholder en **ekte blokkendring (v1→v2 med migrering)**, og kjør oppdater-knappen på Urd-Design-siden.

Frem til v0.6 er `template/` både verksted og demo (urdweb); det er greit så lenge eksempelinnholdet holdes presentabelt. Fra v0.6 er malen et eget repo, og Urd-Design blir den første siden som lever som en ekte brukers.

**Port:** Urd-Design overlever oppdateringen uten tap av innhold eller manuell inngripen - løfte 2 bevist i praksis, ikke bare i testsuiten.

## v1.0 - Brukbar

En forening kan klone, sette opp, bygge og vedlikeholde en side uten utvikler.

**Port:** migreringskontrakten er testet med minst én reell v1→v2-blokkendring i testsuiten; en pilotside (kandidat: gjenskape ApeironLF med Urd) er bygget og driftes.

---

## Sporbarhet: idemyldringen (PLAN.md) → veikartet

Ingenting fra den opprinnelige idemyldringen skal gå tapt:

| Punkt fra PLAN.md | Hvor det lever |
|---|---|
| WYSIWYG: klikk og skriv, hover for dra/slett, «+ Ny seksjon» in-place | v0.2 (klikk-og-skriv) + v0.3 |
| Grid-basert fri plassering, resize, konfigurerbar grid-størrelse | v0.3 (+ `grid` i site.json/seksjon) |
| Streker (horisontale/vertikale/skrå), sirkler, logoer | v0.3 (shape/logo-blokker, `rot` i frames) |
| Full bakgrunnseditor: farge/gradient/animert + glød + bildelag + korn | v0.4 |
| Animasjoner (blokk/seksjon) | v0.4 + utvidbart via plugins (v0.6) |
| Panel for sidene + nav-redigering | v0.5 |
| Detaljert editor for seksjon/blokk/tekst/bilder/farger | v0.3–v0.5 |
| Lage egne seksjoner | v0.3 (tom seksjon + blokker) |
| Lage egen mal | v0.6 («Lagre som mal» → `content/maler/`) |
| Plugins i /plugins: maler, animasjoner, bakgrunner, seksjoner | v0.6 (plugin-API `provides:{blocks, sectionPresets, backgrounds, animations, maler}`) - kontrakten er definert allerede i v0.1-skjemaet |
| Maler for hero, bilder, kalender, footer | v0.3 (presets) + kalender som referanse-plugin (v0.6) |
| Oppdatering knuser aldri bygget side (`version` + `migrate`) | v0.1 (migrate.js implementert) + testet i v1.0-porten |
| Reell GitHub OAuth + Cloudflare-kobling | v0.2 (tynn skive) |
| Statisk + git, publiser = commit, valgfri host | Hele arkitekturen ([ARKITEKTUR.md](ARKITEKTUR.md)) |

## Risikoer og åpne spørsmål

| Tema | Status |
|---|---|
| SEO / besøkende uten JS (klientside-rendering gir tomt skall for enkle crawlere) | Akseptert i v0; «bakt HTML ved publisering» vurderes mot v1 - editoren rendrer allerede ferdig DOM som kan snapshottes |
| Auto-avledet mobil-layout for dekor-blokker (streker/sirkler stabler dårlig) | Designes i v0.4 - trolig et «dekor»-flagg på blokker |
| Bilder i git (repo-vekst, filgrenser hos hoster) | v0: størrelsesvarsler i editor; ekstern lagring (f.eks. R2) som plugin-spørsmål mot v1 |
| Oppdaterer vs. håndredigerte Urd-eide filer | Avgjøres før v0.6 - trolig sjekksum-varsel før overskriving |
| Ikke-GitHub-hoster (GitLab/Gitea) | `functions/_lib`-grensen holdes adapter-vennlig; utenfor scope til etter v1 |
| Antall breakpoints | To (desktop + mobil) i v1; nettbrett vurderes senere |
