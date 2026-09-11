# ADR-0021: Engelsk kodetekst og kontraktsidentifikatorer

Dato: 30. august 2026
Status: Vedtatt

## Kontekst

Kodebasen var norskspråklig i alle lag: ~5 450 norske kommentarlinjer, ~380 norske strenglinjer utenfor ordbøkene, 477 norske testbeskrivelser, og en blandet identifikator-flora der 11 blokktyper, bakgrunnslaget `bildegalleri` og 26 seksjonspreset-ider var norske verdier persistert i brukerdata. Prosjektets egen linje (engelske identifikatorer i datakontrakter, jf. `V1_REASONS`-migreringen og icons.js-kontrakten) var ujevnt anvendt. Før v1 er siste sjanse til å rette kontraktsverdiene med innbakte migreringer (ADR-0005-addendum); etter v1 ville hvert navn vært fryst.

## Beslutning

All tekst i kode skrives på engelsk: kommentarer, strenger, feil- og konsollmeldinger, testnavn, identifikatorer og datakontrakt-verdier. Regelen står i AGENTS.md (Skrivestil). Norsk består kun i språkordbøkene (locales), dokumentasjonen (docs/, CHANGELOG, commit-meldinger), nettstedsinnhold (content/, seed-tekster, 404-siden og noscript-linjene som sidetekst på malens språk) og testdata som med hensikt er norsk innhold.

### Navnekartet

- Blokktyper (migreres): samling->collection, galleri->gallery, tidslinje->timeline, sitat->quote, statistikk->stats, tabell->table, deling->share, nedteller->countdown, produkt->product, handlekurv->cart, kasse->checkout. Bakgrunnslag: bildegalleri->slideshow.
- Seksjonsroller (migreres, funnet under gjennomføringen): flate->surface, aksent->accent, invers->inverse, dus->soft, dempet->muted, dyp->deep, uthevet->highlighted.
- Admin-temaenes ider (kun persistert i nettleserens localStorage under `urd-admin-theme`, aldri i repoet): lilla->purple, bronn->well, gull->gold, graa->grey, nordlys->aurora, skumring->dusk, glo->ember, med migrate-on-read i editoren som for utkastnøklene. Funnet i sluttauditen; nettstedstemaene lagrer tokens, ikke preset-ider, og trenger ingen migrering.
- Norske prop-enumverdier (migreres via definisjonenes egne migreringer, ADR-0005): timeline.variant venstre->left/veksler->alternating, timeline.marker fylt->filled, quote.variant stor->large/kort->short, og bakgrunnslaget image.fit vanlig->plain/flislegg->tile/egen->custom. Den opprinnelige skanningen dekket kun blokkdefinisjonene og overså bakgrunnslagene; fit-verdiene ble funnet i sluttauditen og migreres av imageLayer 1 -> 2.
- Preset-ider (migreres): tom->blank, bilder->images, galleri->gallery, kontakt->contact, hero-sentrert->hero-centered, funksjonskort->feature-cards, funksjonskort-enkel->feature-cards-simple, nyheter->news, nyheter-samling->news-collection, oppslagstavle->noticeboard, publikasjonsarkiv->publication-archive, arrangementer->events, tidslinje->timeline, steg->steps, hovedoppslag->lead-story, produkter->products, butikk->shop, butikk-hero->shop-hero, butikk-kategorier->shop-categories, butikk-tillit->shop-trust, butikk-utstilling->shop-showcase, kasse->checkout, sitat->quote, statistikk->stats, sponsorer->sponsors, medlemskap->membership.
- Plugin-eide tokens (aliases, migreres aldri): blokkene kalender->calendar, kart->map, skjema->form; presetene hva-skjer->whats-on, finn-oss->find-us, kontaktskjema->contact-form; plugin-idene kalender->calendar, kart->map, skjema->form, sprak-svensk->lang-sv. Manifest-feltet provides.maler->provides.templates og API-objektet Urd.maler->Urd.templates, begge med varig bakoverkompatibilitet.
- Motorfilnavn, testfilnavn, JS-identifikatorer, i18n-nøkkelnavn og CSS-klasser renames tilsvarende (koordinerte endringer, ingen migrering).

### Migreringsmodellen

- Kjernetokens løftes med to stegvise sidemigreringer etter `V1_REASONS`-presedensen: `pageMigrations[2]` (blokktyper og lagtyper, PAGE_SCHEMA_VERSION 3) og `pageMigrations[3]` (preset-ider, PAGE_SCHEMA_VERSION 4). Migreringene er innbakte pre-v1 (ADR-0005-addendum). Mal-payloader løftes ved innsetting via samme sti som mobilløftingen.
- Plugin-eide tokens migreres ALDRI i sidedata: `plugins/**` er userPaths, så gamle plugin-mapper i brukerrepoer registrerer gamle ider for alltid, og migrert data ville miste treffet. I stedet får registrene (registry.js) aliasstøtte: motoren registrerer gammel->ny, så gammel data treffer ny plugin via alias, mens gammel plugin fortsatt treffer direkte.
- localStorage-utkastnøkler med norske segmenter migreres ved lesing (les gammel nøkkel når ny mangler, skriv ny, slett gammel), så ingen nettleser-utkast går tapt.

### Bevisste avgrensninger

- Lagringsstier i brukerrepoer beholdes: `content/samlinger/`, `content/samlinger.json`, `content/maler/`, `content/maler.json`, wrapper-nøklene `index.samlinger`/`index.maler` og sideslugs. Filene er brukerdata (userPaths) som oppdatereren aldri rører, RSS-adressene `content/samlinger/<id>.xml` ligger alt i abonnenters lesere, og deployede Vipps-funksjoner leser gammel sti og nøkkel. En dual-read-fallback ville kostet en permanent ekstra 404-sonde per besøk uten brukersynlig gevinst. Revurderes ved v0.8-bakingen, der publiseringsutdata uansett regenereres.
- CSS-klassene er runtime-genererte og aldri persistert, så de renames uten migrering. Egendefinert CSS som sikter på gamle klassenavn (urd-handlekurv-*, urd-produkt-* osv.) må oppdateres av sideeieren; bruddet bokføres i CHANGELOG.

## Konsekvenser

- Migrerings- og aliastester vokter kontrakten: full løfting av alle gamle tokens, idempotens, og plugin-matrisen (gammel data mot gammel og ny plugin).
- i18n-nøkkel-renames må treffe alle fem admin-ordbøker og site-ordbøkene i samme commit som konsumentene (paritetstesten avviser ukjente nøkler).
- Sluttkriteriet er observerbart: en repo-vid norsk-audit (æøå-grep pluss stopwordliste) er ren utenfor de fire tillatte stedene. Auditen MÅ kjøres i tre lag, siden æøå-grepet alene har vist seg utilstrekkelig: (1) æøå, (2) norske stoppord uten æøå, (3) ASCII-fisert norsk (sok, naar, paa, forst, rekkefolge). Lag 2 avdekket blocks/shape.js, som var norsk i sin helhet uten et eneste æøå og derfor usynlig i hver filtelling underveis.
- Bevisste æøå-rester i kode etter auditen, alle verifisert: språknavnene «bokmål»/«Bokmål» som fagterm i engelske kommentarer (i18n.js, App.svelte) og endonymet 'Norsk bokmål' i språklisten; valutaenheten «øre» i vipps.js (enheten Vipps-API-et faktisk tar); slugify-literalene og det bevisste æøå-eksempelet i imageTools.js; V1_REASONS-nøkkelen 'seksjonshøyde' i migrate.js (migreringsdata); regexen som matcher norske påmeldingsord i kalenderpluginens ics.js (den leser norsk brukerinnhold); og de norske `names`-verdiene i lang-sv-manifestet (oversettelsesdata). Plugin-manifestenes `name`-felt er fallback og ble gjort engelsk, mens `names.nb` bærer den norske teksten.
- Fremtidig kode skrives engelsk fra start; en norsk literal i kode er en feil, ikke en stilsak.
