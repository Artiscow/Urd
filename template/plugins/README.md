# Plugins

En Urd-plugin er en mappe her med et manifest (`plugin.json`) og en ES-modul
(`index.js`) som eksporterer `register(Urd)`. Plugins bruker de samme
define-API-ene som kjernen (blokker, seksjonspresets, bakgrunner, animasjoner,
maler) og er underlagt samme migreringskontrakt: en plugin-oppdatering kan
aldri knuse eksisterende innhold.

Aktive plugins listes i [`plugins.json`](plugins.json) (statiske hoster kan
ikke liste mapper, derfor en indeksfil). Admin håndterer listen for deg:
Plugins-panelet viser mappene her automatisk (via publiseringslaget, eller
sist kjente liste), og av/på-valget publiseres som en vanlig endring.

## Utvikle en plugin lokalt

1. Start en lokal server fra `template/` (f.eks. `python3 -m http.server`)
   og åpne `http://localhost:8000/admin/`.
2. Legg mappen din her (`plugins/<din-id>/` med `plugin.json` + `index.js`).
3. Aktiver den i Plugins-panelet (skriv mappenavnet hvis panelet ikke kan
   liste mapper lokalt). Forhåndsvisningen laster pluginen fra UTKASTET,
   så du ser blokkene dine live uten å publisere.
4. Manifestfeil, motorversjonskrav og provides-avvik logges i nettleser-
   konsollen og vises i panelet.

Manifestkrav: `requiresEngine` (semver-intervall mot motorversjonen i
urd.json), `provides` (hva pluginen definerer), og valgfritt `csp`
(eksterne opprinnelser pluginen trenger; se ADR-0006 - `_headers` endres
aldri automatisk, admin viser eieren hva som må legges inn).

Se [`eksempel-kalender/`](eksempel-kalender/) for formen, og
[docs/SKJEMA.md](../../docs/SKJEMA.md#plugins) for kontrakten.
