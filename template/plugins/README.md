# Plugins

En Urd-plugin er en mappe her med et manifest (`plugin.json`) og en ES-modul
(`index.js`) som eksporterer `register(Urd)`. Plugins bruker de samme
define-API-ene som kjernen (blokker, seksjonspresets, bakgrunner, animasjoner,
maler) og er underlagt samme migreringskontrakt: en plugin-oppdatering kan
aldri knuse eksisterende innhold.

Aktive plugins listes i [`plugins.json`](plugins.json) (statiske hoster kan
ikke liste mapper, derfor en indeksfil). Fra v0.6 håndterer admin denne
listen for deg.

Se [`eksempel-kalender/`](eksempel-kalender/) for formen, og
[docs/SKJEMA.md](../../docs/SKJEMA.md#plugins) for kontrakten.
