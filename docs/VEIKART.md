# Veikart

Rekkefølgen er bevisst: **motor → publiseringsløkke → editor-dybde.** Motoren gjør skjemaet virkelig (skjemafeil er billigst å fikse før editoren avhenger av dem). Publiseringsløkka er den mest risikable *integrasjonen*, men det mest *utprøvde* mønsteret - å lande den tidlig gir et ekte deploy-mål for alt etterpå. Editor-finesse er den lange halen og bygges mot en fungerende rørledning.

## v0.1 - Skjelett *(levert 16. juli 2026)*

Dokumenter (VISJON, ARKITEKTUR, SKJEMA, VEIKART, ADR-er), JSON Schema-kontrakt i `schema/`, repo-skjelett med motor-stubber, eksempelinnhold, editor-skall og functions-stubber. `migrate.js` implementeres for ekte - invarianten først.

**Port:** eksempeldataene validerer mot skjemaene; dokumentene er godkjent av eier.

## v0.2 - «Tynn skive» *(levert 16. juli 2026)*

Ende-til-ende med minst mulig bredde: motoren rendrer `hjem.json` (én hero-seksjon, tekst- og knappblokk, gradientbakgrunn, kun desktop). Admin laster den ekte siden i iframe, klikk-og-skriv på tekst, utkast i localStorage, «Publiser» committer via functions, Cloudflare Pages serverer.

**Port:** rediger en overskrift i nettleseren på en deployet klon og se den live etter publisering - uten å røre en kodefil.

## v0.3 - Lerretet *(levert 17. juli 2026)*

- Blokkpalett: tekst, bilde, knapp, former (streker - horisontale, vertikale, skrå via rotasjon - sirkler, rektangler), logo.
- Dra, resize og snap på gridet (konfigurerbar grid-størrelse), z-orden.
- Seksjons-CRUD med «+ Ny seksjon» in-place, seksjonspresets (hero, bilder, footer) - og **bygge egne seksjoner fra tom seksjon**.
- Inkrementell rerender i preview.

## v0.4 - Responsivt *(levert 17. juli 2026)*

Rendyrket mobilfase: nesten rent motorarbeid, uavhengig av panel-UI-et
som kommer i v0.5. (Bakgrunnseditor og animasjoner er flyttet til v0.5:
de ER panel-UI, og skal ikke bygges to ganger.)

- Mobilvisning i editor, auto-avledet stabling, manuelle mobil-frames.
- **Mobil-tilsyn-flagget ende-til-ende** (regler i [SKJEMA.md](SKJEMA.md#mobil-tilsyn)).
- «Dekor»-flagg på blokker (streker/sirkler som stabler dårlig i auto-avledet layout).

**Port:** en side bygget på desktop ser fornuftig ut på mobil uten manuell
inngripen, og tilsyn-flagget fanger drift når mobil-layout er håndjustert.

## v0.5 - Panelene og nettstedet rundt siden *(levert 18. juli 2026)*

Editorens UI legges om FØRST (dagens topplinje er metta), og alle
redigeringsflatene bygges på den nye layouten:

- Ny editor-layout: sidepanel/ikonverktøylinje, statusmeldinger som toast.
- Sidepanel: opprette/omdøpe/slette sider fra sideregisteret.
- Nav-editor og theme-token-panel (farger, fonter, radier).
- Blokkeditor: props-UI per blokktype - bilde (alt/fit/radius/lenke), former (fyll/farge/tykkelse), knapp (mål/stil), tekst (justering, typografi). Nye blokktyper: video/embed og ikon.
- Tastatursnarveier: piltaster flytter markert blokk, Delete sletter, Esc avmarkerer.
- Seksjonseditor med **full bakgrunnseditor** (lag: farge/gradient/animert, glød, bildelag, korn) og **animasjonsinnstillinger per blokk/seksjon** (inn-animasjoner, hover; version+migrate-kontrakt) - flyttet fra v0.4.
- Konfliktvarsel før publisering («noen andre har publisert siden du lastet», via `latest`-endepunktet som har vært klart siden v0.2).
- Oppsettsveiviser ved første besøk (navn, farger, logo, GitHub/Cloudflare-kobling).
- Historikk- og angre-publisering-UI (`history`/`revert`).

## v0.6 - Økosystem

- Plugin-lasting for alvor: plugins leverer **egne blokker, seksjonspresets, bakgrunner, animasjoner og maler** via `register(Urd)`. Kalender-pluginen som referanseeksempel; kart og skjema som ytterligere referanse-plugins.
- **Arkiv/datablokk-mønsteret**: blokker som rendrer samlinger av innslag (nyheter, oppslag, styrer), designet sammen med kalender-pluginen. Kalender-avhengige presets: nyheter, oppslagstavle, «Hva skjer».
- **«Lagre som mal»**: egne seksjoner/sider lagres i `content/maler/` og kan deles som plugins. GitHub-topic-konvensjon (`urd-plugin`, `urd-mal`) for oppdagbarhet.
- `urd-template`-repo-splitt + release-Action («Use this template»).
- Oppdaterer v1: én-klikks Urd-oppdatering som kun overskriver manifest-stiene i `urd.json`.

## v0.7 - Finpuss + butikk
- **Butikk uten betalingsgateway som kjernefunksjon** (ApeironLF-modellen, valgt 18. juli 2026): produktkort-blokk med varianter, handlekurv (localStorage + skuff), bestillingsskjema til e-post/valgfritt endepunkt, betaling via Vipps-nummer-instruks. Avhengighetsfri, git-eid katalog; bygges på v0.6-datablokk-mønsteret. Detaljer i [BACKLOG.md](BACKLOG.md).
- Sjekke alle funksjoner og se om noe mangler eller ikke fungerer godt.
- Er alt intuitivt?
- Er ting rotete?
- Noe som ikke er lett å forstå eller lett å misforstå? 

## v0.8 - Optimalisering

Ytelses- og størrelsesgjennomgang av hele produktet. (Grunnleggende
bildekomprimering ved opplasting - webp, maks 1600px, størrelsesvarsel -
er levert i v0.3; dette er laget over.)

- Bilder videre: responsive størrelser (`srcset`), AVIF-vurdering, lazy loading, og eventuelt rekomprimering av eksisterende media/-filer.
- Nettsiden/malen: mål og senk vekt og lastetid for besøkende (motorstørrelse, kritisk CSS, caching-headere, Lighthouse-budsjett som CI-sjekk?).
- Motoren: profiler rendering og rerendering ved mange seksjoner/blokker; unngå unødvendige omtegninger i preview.
- Editoren: bundle-størrelse og oppstartstid; dra/resize skal holde 60 fps også på store sider.
- «Bakt HTML ved publisering» (SEO/no-JS-punktet fra risikolisten) hører naturlig hjemme her om den ikke alt er tatt.

## v0.9 - Generalprøven

Vi bruker Urd som en fremmed bruker, uten snarveier:

- Lag en ekte side (arbeidsnavn: Urd-Design) via «Use this template»-knappen, i eget repo med eget Cloudflare-oppsett, satt opp KUN ved å følge OPPSETT-PUBLISERING.md. All friksjon som oppdages er funn som skal fikses.
- Bygg siden ferdig gjennom admin alene.
- Slipp deretter en Urd-oppdatering som inneholder en **ekte blokkendring (v1→v2 med migrering)**, og kjør oppdater-knappen på Urd-Design-siden.

Frem til v0.6 er `template/` både verksted og demo (urdweb); det er greit så lenge eksempelinnholdet holdes presentabelt. Fra v0.6 er malen et eget repo, og Urd-Design blir den første siden som lever som en ekte brukers.

**Port:** Urd-Design overlever oppdateringen uten tap av innhold eller manuell inngripen - løfte 2 bevist i praksis, ikke bare i testsuiten.

## v1.0 - Brukbar

En forening kan klone, sette opp, bygge og vedlikeholde en side uten utvikler.

**Port:** migreringskontrakten er testet med minst én reell v1→v2-blokkendring i testsuiten; en pilotside (kandidat: gjenskape ApeironLF med Urd) er bygget og driftes. Piloten forutsetter v0.7-butikken (ApeironLF har merch med handlekurv) og v0.6-kalenderpluginen (arrangementer fra Google Calendar/iCal-feed).

## Etter 1.0 (horisont)

Uprioritert, avhenger av community og behov: import fra eksisterende sider,
flerspråkstøtte, samtidighetsvisning i admin, galleri-nettsted for maler og
plugins (urd.dev), GitLab/Gitea-adapter, ekstern medialagring (R2) og
butikk/merch-mal. Detaljer i [BACKLOG.md](BACKLOG.md).

---

## Sporbarhet: idemyldringen (PLAN.md) → veikartet

Ingenting fra den opprinnelige idemyldringen skal gå tapt:

| Punkt fra PLAN.md | Hvor det lever |
|---|---|
| WYSIWYG: klikk og skriv, hover for dra/slett, «+ Ny seksjon» in-place | v0.2 (klikk-og-skriv) + v0.3 |
| Grid-basert fri plassering, resize, konfigurerbar grid-størrelse | v0.3 (+ `grid` i site.json/seksjon) |
| Streker (horisontale/vertikale/skrå), sirkler, logoer | v0.3 (shape/logo-blokker, `rot` i frames) |
| Full bakgrunnseditor: farge/gradient/animert + glød + bildelag + korn | v0.5 (motoren rendrer lagene siden v0.2) |
| Animasjoner (blokk/seksjon) | v0.5 + utvidbart via plugins (v0.6) |
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
| Auto-avledet mobil-layout for dekor-blokker (streker/sirkler stabler dårlig) | Designes i v0.4 («dekor»-flagg på blokker) |
| Bilder i git (repo-vekst, filgrenser hos hoster) | v0: størrelsesvarsler i editor; ekstern lagring (f.eks. R2) som plugin-spørsmål mot v1 |
| Oppdaterer vs. håndredigerte Urd-eide filer | Avgjøres før v0.6 - trolig sjekksum-varsel før overskriving |
| Ikke-GitHub-hoster (GitLab/Gitea) | `functions/_lib`-grensen holdes adapter-vennlig; utenfor scope til etter v1 |
| Antall breakpoints | To (desktop + mobil) i v1; nettbrett vurderes senere |
