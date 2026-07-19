# ADR-0006: CSP-behovsmodell for plugins

Dato: 19. juli 2026. Status: vedtatt (v0.6 M1).

## Kontekst

Urds CSP i `_headers` er stram med vilje: `connect-src 'self'`, `frame-src` kun med de to personvennlige videovertene. Flere av v0.6-pluginene trenger eksterne kilder: kalender-pluginen henter fra `www.googleapis.com` eller en iCal-URL, kart-pluginen bygger inn en OSM-vert, og fremtidige betalings-plugins vil trenge sine. Samtidig er `_headers` en Urd-eid fil som publiseringsvokteren (guard.js) med vilje nekter å skrive: kunne publiseringen endre headere, kunne en kapret redaktørsesjon fjerne hele CSP-en.

## Beslutning

1. **Manifestet deklarerer behovet.** `plugin.json` får et valgfritt, additivt `csp`-felt: `{ "connectSrc": ["https://…"], "frameSrc": ["https://…"] }`. Verdiene er eksakte opprinnelser (scheme + vert), aldri jokertegn.
2. **`_headers` forblir Urd-eid og uskrivbar for publisering.** Å åpne CSP-endringer via publiseringsflyten er et større hull enn friksjonen det sparer.
3. **Admin viser den eksakte handlingen.** Plugins-panelet leser `csp`-feltet og viser hvilke unntak pluginen trenger, med instruks om å legge dem inn i `_headers` i repoet (en engangsjobb per plugin, gjort der koden bor: i git).
4. **Pluginen skal degradere forståelig.** En plugin hvis fetch blokkeres av CSP skal vise en rolig tomtilstand som forklarer hvilken linje som mangler i `_headers`, aldri en død blokk. (Referanse-pluginene i M3/M4 viser mønsteret.)

## Konsekvenser

- Sikkerhetsmodellen står: ingen kodevei kan utvide CSP; kun eieren, i repoet, med linjen synlig i diffen.
- Friksjonen er bevisst og liten: aktivering av en plugin med eksterne behov er to steg (aktiver i admin, lim inn linjen i _headers), og admin forklarer begge.
- Ved template-splitten (M9) kan oppdateringsmekanismen IKKE overskrive `_headers` i blinde, siden eieren kan ha lagt inn plugin-unntak; dette er allerede fanget av «oppdaterer vs. håndredigerte filer»-punktet (sjekksum-varsel).
