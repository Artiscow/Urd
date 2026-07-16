# ADR-0001: Hybrid editormodell - seksjoner med fritt lerret inni

**Status:** vedtatt (juli 2026)

## Kontekst

To etablerte redigeringsparadigmer sto mot hverandre: rent seksjonsbasert (velg seksjonstype, fyll ut felter - trygt, men begrenset) og helt fri canvas à la Wix/Figma (full frihet, men responsivitet blir et mareritt og datamigrering skjør). Visjonen krever «full kontroll over alt på siden», samtidig som løfte 2 (en oppdatering knuser aldri en bygget side) krever en migrerbar datamodell.

## Beslutning

En side er en vertikal rekke **seksjoner**; inne i hver seksjon plasseres **blokker fritt på et snap-grid** (konfigurerbart, kan slås av). Seksjoner kan skaleres/flyttes fritt og opprettes fra presets eller tomt lerret - presets er datafabrikker, ikke kodeveier; etter opprettelse er alle seksjoner likestilte generiske containere.

Fordi friheten gjør at desktop- og mobil-layout kan drifte, er **mobil-tilsyn-flagget** en del av beslutningen: manuelt overstyrte mobil-layouts flagges ved desktop-endringer til brukeren har sett over dem (regler i [SKJEMA.md](../SKJEMA.md#mobil-tilsyn)).

## Konsekvenser

- ~90 % av friheten til fri canvas, med en datamodell som fortsatt er seksjonsvis migrerbar og rerendrbar.
- Responsivitet løses per seksjon: auto-avledet stabling som standard, manuelle mobil-frames som overstyring, flagg ved drift.
- Editoren må håndtere to koordinatverdener (seksjonsrekkefølge + grid-frames) - mer kompleks enn ren seksjonsmodell, vesentlig enklere enn helside-canvas.
