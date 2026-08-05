# ADR-0014: Oppdaterermodellen v1 - blob-SHA-sjekksum mot baseline-tagg

Dato: 5. august 2026. Status: vedtatt (v0.6, milepæl 0.6.9).

## Kontekst

Løfte 2 krever at en klonet side kan oppgradere Urd trygt. Siden er født fra `urd-template` («Use this template», ingen delt git-historikk), kan være håndredigert, og publiseringen har en streng sti-allowlist som ALDRI får skrive kode (ADR-0003). CSP-en hos besøkende har `connect-src 'self'`, så admin kan ikke snakke med GitHub direkte, og Cloudflare Pages Functions har et subrequest-tak (50 på gratisplan) som en naiv én-blob-per-fil-commit av ~90 Urd-eide filer ville sprengt. Ingen av de kartlagte byggerne løser «oppdater malen etter at brukeren har redigert den» (de eier runtimen selv), så modellen er original arkitektur.

## Beslutning

1. **Eget endepunkt med invers vokter.** `functions/api/github/update.js` (GET sjekk, POST utfør) med samme `requirePublisher`-prolog som publiseringen. guard.js får eierskapskartet `OWNED_PATTERNS`/`USER_PATTERNS` (speiler urd.json, kontraktstestet mot den) med `isOwnedPath`/`isUserPath`; publisering og oppdaterer skriver disjunkte sti-mengder, med slug-kopiene som eneste bevisste overlapp (kopi-oppfriskningsplikten, ADR-0013). En fullstendighets-test krever at hver faktiske fil i malen har nøyaktig én eierskapsklasse.
2. **Sjekksum = git blob-SHA-er, baseline = taggen `v<engine>`.** Brukerens tre sammenlignes med malrepoets tre ved baseline-taggen og ved målversjonen (tre `git/trees?recursive=1`-kall, ingen innholdsnedlasting). `engine`-feltet i brukerens urd.json ER baseline-pekeren; release-Action-en tagger malrepoet med nøyaktig `v<engine>` per utgivelse og flytter aldri en tagg. Lik SHA = identisk innhold, så «håndredigert» avgjøres eksakt og billig; et eget sjekksum-manifest ville vært et andre sannhetspunkt som kunne drive.
3. **Planen er en ren funksjon.** `planUpdate(baseline, target, user)` i `_lib/update-plan.js`: endret+urørt skrives, endret+redigert flagges `edited`, ny+eksisterende flagges `created`, fjernet oppstrøms slettes (redigert sletting flagges), manglende eid fil gjenopprettes, og filer oppstrøms IKKE endret røres aldri (lokale endringer består i stillhet - Publii-semantikken). Brukereide stier og `_headers` er utenfor planen per konstruksjon. Motorbytte-swappen (gammel versjonert mappe slettes, ny legges inn) faller ut av de generiske reglene uten egen kode.
4. **Motor-atomgruppen kan ikke splittes.** `assets/**` + `admin/**` + `index.html` + slug-kopiene + `urd.json` byttes samlet: HTML-skallene peker på den versjonerte mappa, admin-bundelen bunter motormoduler, skallene peker inn i versjonen, base.css-stempelet bor i skallene, og `urd.json.engine` er selve mappenavn-invarianten (derfor står også urd.json i gruppen, i motsetning til det tidlige utkastet). Kun `functions/**` og løse rotfiler kan holdes tilbake per fil; POST validerer at `skip` aldri rører atomgruppen, og planen regnes alltid ut på nytt server-side (klienten bestemmer bare bortvalg).
5. **`_headers` skrives ALDRI** (viderefører ADR-0006): sjekken leverer oppstrøms-teksten og avviksflagg, admin viser diff-instruksen, og eieren fører endringer inn for hånd. Det holder CSP-håndredigeringer (plugin-verter) trygge for alltid.
6. **Én atomisk commit via inline-trær.** POST henter alle måltekster i ETT GraphQL-kall (Blob.text via aliaser), bygger Git-treet med inline `content` (aldri én blob-POST per fil), chunket i kjedede `base_tree`-trær ved store mengder, og committer med `expect`-vern (409 når HEAD har flyttet seg). Binære/avkortede blober tar REST-omveien (base64 fra malrepoet rett inn som blob i brukerens repo). Subrequest-budsjettet er ~8 for sjekk og ~11 for utfør, godt under taket.
7. **Feil er maskinlesbare** (`api.update*`-koder i alle fem admin-ordbøkene, håndhevet av i18n-kontraktstesten), og `URD_TEMPLATE_REPO`-env (default `Artiscow/urd-template`) gjør oppstrøms utskiftbart for forks.

## Alternativer forkastet

- **PR-basert oppdatering (Decap-modellen):** utkast som branch + PR med Cloudflare-preview ville gitt diff-review og forhåndsvisning gratis, men krever branch-/PR-orkestrering og en helt annen UI-flyt; står som mulig v2 ETTER v1.0 (backloggens PR-per-utkast-punkt).
- **Eget sjekksum-manifest ved release:** overflødig når git-blob-SHA-ene alt finnes i trærne; et manifest kunne drive fra filene.
- **Gjenbruk av commit-endepunktet:** allowlisten er testvoktet til å avvise nøyaktig ownedPaths; å åpne den ville gitt en kapret redaktørsesjon skrivetilgang til kode.

## Konsekvenser

- Oppdatereren forutsetter at `urd-template` er tagget med brukerens NÅVÆRENDE versjon; en klon eldre enn første taggede utgivelse får `updateNoBaseline` og må oppdatere manuelt én gang.
- Nye Urd-eide stier må inn i urd.json + guard.js (kontraktstesten tvinger det); nye toppnivåfiler i malen må klassifiseres (fullstendighets-testen tvinger det).
- Lokale endringer i filer oppstrøms ikke rørte, overlever enhver oppdatering i stillhet; varsling skjer kun når oppstrøms OG lokalt har endret samme fil.
