# ADR-0002: Svelte for editoren, håndskrevet lesbar JS for motoren

**Status:** vedtatt (juli 2026)

## Kontekst

Løfte 3 (ingen byggeprosess for nettsiden) og løfte 1 (du eier alt, lesbare filer) må balanseres mot at editoren er et stort stykke interaktiv programvare (fri canvas, dra/resize/snap, lag-paneler, bakgrunnseditor) som er urimelig dyr å bygge uten rammeverk.

## Beslutning

**To verdener med hver sin standard:**

1. **Motoren** (`template/assets/engine/`) - alt besøkende laster - skrives som håndskrevet, avhengighetsfri, lesbar ES-modul-JavaScript og kompileres aldri. Editorens preview-iframe laster nøyaktig disse filene.
2. **Editoren** (`editor/`) skrives i **Svelte 5 + Vite** og shippes **ferdigbygd** til `template/admin/assets/` (committes, unntak fra vanlig dist-praksis). Klonende foreninger rører aldri npm; byggesteget skjer hos Urd-utviklerne før utgivelse.

Svelte fremfor Preact/React: kompilert finmasket reaktivitet uten VDOM-diffing passer dra-operasjoner på 60 fps, og output er liten, avhengighetsfri statisk JS - riktig form for «ferdigbygde filer i et repo».

## Konsekvenser

- Foreninger får null verktøykjede og full /admin-redigering; løftene holdes.
- Editor-filene i klonede repoer er kompilert (uleselig) kode; den lesbare kilden ligger åpent i Urd-hovedrepoet.
- Preview-troskap er strukturell: preview og produksjon er samme filer.
- Urd-utgivelser må alltid bygge editoren og committe output i samme commit som motorendringer (håndheves av monorepo, se [ADR-0004](0004-monorepo-med-template-mappe.md)).
