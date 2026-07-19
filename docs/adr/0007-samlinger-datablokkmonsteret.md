# ADR-0007: Samlinger (datablokk-mønsteret)

Dato: 19. juli 2026. Status: vedtatt (v0.6 M2).

## Kontekst

Foreningssider består i stor grad av LISTER av likeartede innslag: nyheter, oppslag, publikasjoner/utgaver, senere arrangementer (kalender-pluginen, M3) og produkter (butikken, v0.7). I v0.5 løses dette med statiske seksjonsmaler der hvert kort er håndplasserte blokker; det er riktig for kuraterte forsider, men feil for løpende innhold: å legge til en nyhet skal være å SKRIVE EN NYHET, ikke å flytte rammer. Kartleggingen av ApeironLF og foreningssidene (18. juli 2026) viste mønsteret tydelig: innslag som data, flere visninger over samme data.

## Beslutning

1. **Samlinger er data i content/.** Én fil per samling, `content/samlinger/<id>.json`: `{ schemaVersion, id, name, kind, entries }`. Innslag har felles feltnavn (`id`, `title`, valgfrie `date`, `text`, `image`, `href`; engelske identifikatorer som resten av datamodellen), så visninger kan gjenbrukes på tvers av kind. `kind` (`news`/`notices`/`publications`/`custom`) styrer kun hvilke felter editoren fremhever. Kontrakten bor i `schema/collection.schema.json` og løftes med samme stegvise migreringsmønster som side- og sitefiler.
2. **Indeksfil, ikke mappelisting.** `content/samlinger.json` lister samlings-idene (samme presedens som `plugins/plugins.json`): statiske hoster kan ikke liste mapper.
3. **Én kjerneblokk rendrer samlinger.** Blokken `samling` (props: `collection`, `view`, `limit`, `newestFirst`) er en vanlig blokk i en vanlig seksjon, med tre innebygde visninger: `cards` (responsivt kortgrid), `list` (rader med dato-badge) og `archive` (år-gruppert). Visningenes INDRE layout er flyt, ikke frames per innslag: blokken er ett frame-element, og mobil-stablingen forblir triviell.
4. **Tittel og innslagstekst er rik tekst.** (Revidert ved M2.5/M2.6, eiers valg 19. juli 2026.) Både `title` og `text` er sikker rik tekst med NØYAKTIG samme besøkende-vern som tekstblokkene (delt stripper i engine/sanitize.js: event-attributter, script/iframe/object/embed og javascript:-lenker fjernes ved rendering), og redigeres med den felles flytende teksteditoren rett i blokken.
5. **Aldri krasj.** Manglende samling, tom samling eller manglende felter gir rolige tomtilstander (instruks i editor-preview, ingenting hos besøkende), samme filosofi som bildeblokkens plassholder.
6. **Utkast som alt annet.** Samlinger redigeres i et eget Samlinger-panel, med draftStore per samling, bilder materialisert ved publisering, og forhåndsvisning fra UTKASTET via broen (med snapshot, jf. DataClone-leksene).

## Konsekvenser

- Kalender-pluginen (M3) gjenbruker visningsformene, men henter innslag fra en FEED i stedet for content/; mønsteret er det samme (innslag → visninger).
- Butikkens produktkatalog (v0.7) blir en samling med flere felter (pris, varianter); skjemaet utvides additivt da.
- «Lagre som mal» (M8) og template-splitten berøres ikke: samlinger er brukerdata under content/** som publiseringsvokteren allerede tillater.
- Visninger leveres av kjernen nå; plugin-leverte visninger er en naturlig senere utvidelse av registermønsteret, men holdes utenfor M2.
