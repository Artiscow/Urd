# ADR-0008: Hjelpechip-regelen («?» på alt med spesialfunksjoner)

Dato: 19. juli 2026. Status: vedtatt (v0.6 M3, eiers regel).

## Kontekst

Blokker og seksjoner får stadig flere funksjoner som ikke synes på overflaten: samling-blokken har klikk-og-skriv og autovekst, kalenderblokken har kildepanel, kategori-konvensjon og påmeldings-uttrekk. Testrundene viste mønsteret: eieren oppdager ikke funksjonene, eller oppfatter dem som feil («bildeeditoren er ingen bildeeditor», «⚙ Kilder - hva er dette?»). Tooltips forsvinner før de er lest, og dokumentasjon utenfor editoren blir ikke funnet i arbeidsøyeblikket.

## Beslutning

1. **Alle blokker, seksjoner og elementer med SPESIELLE funksjoner skal ha en hjelpechip** i forhåndsvisningen: en «?» som åpner et vedvarende hjelpekort der ALLE funksjonene er forklart, én linje per funksjon. Kortet blir stående til man klikker utenfor eller trykker Escape, så det kan leses i ro. «Spesiell» betyr: noe utover flytt/skaler/slett-standarden alle blokker har (egne redigeringsflater, konvensjoner i innholdet, paneler, automatikk).
2. **Én felles hjelper eier formen**: `attachHint(host, { title, lines })` i [engine/hint.js](../../template/assets/engine/hint.js), med stil i base.css (chip vises ved pek på blokken, aldri i Ren visning, aldri hos besøkende). Ingen lager egne varianter.
3. **Regelen gjelder kjernen OG plugins likt.** Plugin-forfattere importerer samme hjelper (`import { attachHint } from '/assets/engine/hint.js'`) og kaller den kun når `ctx.preview` er sann. Kravet står i plugins/README.md.
4. Første etterlevelse: samling-blokken og kalenderblokken. Nye blokker med spesialfunksjoner skal levere chipen i samme push som funksjonen.

## Konsekvenser

- Funksjoner er dokumentert DER de brukes; brukerveiledningen forblir oversikten, ikke oppslagsverket for enkeltblokker.
- Sjekkpunkt i testrunder: har nye spesialfunksjoner chip? (Hører hjemme i fasegatenes sjekklister.)
- Hjelpekortets tekster er norske og korte; blir en linje lengre enn én setning, er funksjonen sannsynligvis for kompleks eller chipen feil sted.
