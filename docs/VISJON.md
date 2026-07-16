# Visjon

## Hva er Urd?

Urd er en open source nettsidebygger som utfordrer Squarespace, Wix og verktøy som Publii - med én grunnleggende forskjell: **Urd er både nettsiden og byggeren.**

Du kloner ikke et verktøy som *lager* en nettside. Du kloner nettsiden din, og den har byggeren innebygd. Går du til `dinside.no/admin` og logger inn, står du i full WYSIWYG-redigering av den faktiske siden. Trykker du «Publiser», blir endringene én git-commit, og den statiske hosten serverer den nye siden på under et minutt.

Alt er statisk og git-eid. Standardoppsettet er GitHub + Cloudflare Pages, men enhver statisk host duger.

## De fire løftene

Disse er kontrakter, ikke ambisjoner. Enhver designbeslutning i Urd må holde alle fire.

### 1. Du eier alt
Siden din er et git-repo med lesbare filer: innhold som JSON, motor som håndskrevet JavaScript, bilder som filer. Ingen database, ingen tjeneste som kan legges ned, ingen eksport-funksjon du må stole på - repoet *er* eksporten. Flytt det hvor du vil, når du vil.

### 2. En oppdatering knuser aldri en bygget side
Alt innhold bærer et `version`-felt, og alle blokk-, seksjons- og bakgrunnstyper definerer stegvise migreringer som løfter gammel data fremover ved lasting. En side bygget på Urd v1 overlever en v2-blokk. Ukjent innhold (f.eks. en plugin som mangler) vises som nøytral plassholder - **data droppes aldri**. Se [SKJEMA.md](SKJEMA.md) og [ADR-0005](adr/0005-versjonering-og-migrering.md).

### 3. Nettsiden trenger ingen byggeprosess
Det som ligger i repoet er nøyaktig det nettleseren laster. Ingen npm, ingen CI-bygg, ingen «bygget feilet». Publisering er en commit; servering er filkopiering. (Urd-*utviklerne* bruker byggeverktøy for å lage editoren, men resultatet shippes ferdigbygd - se [ADR-0002](adr/0002-svelte-for-editor-lesbar-js-for-motor.md).)

### 4. WYSIWYG uten kompromiss
Admin viser den ekte siden - samme motor, samme filer som besøkende laster, i en iframe som mottar utkastene dine fortløpende. Forhåndsvisningen kan ikke drifte fra produksjon, fordi den *er* produksjon.

## Hvem er Urd for?

**Primært: ikke-tekniske redaktører i små organisasjoner** - linjeforeninger, idrettslag, småbedrifter, menigheter. Folk som i dag betaler for Squarespace eller er avhengige av «hen som kan data». Etter første oppsett skal en redaktør kunne bygge og vedlikeholde hele siden fra admin, uten å se en kodelinje.

**Sekundært: utviklere** som setter opp siden for noen andre, bygger plugins og maler, eller bidrar til Urd selv.

Erfaringen bak Urd kommer fra nettopp dette: en linjeforeningsside ([ApeironLF](https://github.com/Apeiron-Linjeforening/ApeironLF)) med innebygd git-basert admin, som fungerte - men som tok lang tid å bygge og er vanskelig å gjenta for neste forening. Urd er generaliseringen.

## Hva Urd IKKE er

- **Ingen server.** Urd har ingen backend å drifte. (Publiseringen bruker små serverless-funksjoner hos hosten - de er en del av repoet og krever null drift.)
- **Ingen database.** Alt innhold er filer i git. Historikken din er git-loggen.
- **Ingen abonnement.** Gratis for alltid; hostene som brukes har rause gratisnivåer.
- **Ingen app-plattform.** Urd bygger innholdssider, ikke webapplikasjoner. Dynamikk (kalendere, skjemaer) kommer som plugins med eksterne datakilder - ikke som serverkode i Urd.

## Redigeringsmodellen i korte trekk

En side er en vertikal rekke **seksjoner**. Seksjoner kan opprettes fra **presets** (hero, bildegalleri, footer, …) eller bygges fra tomt lerret, og kan skaleres og flyttes fritt. Inne i hver seksjon plasserer du **blokker** - tekst, bilder, knapper, streker, sirkler, logoer - fritt på et snap-grid du selv styrer, med full kontroll over størrelse, plassering og lag. Bakgrunner er lagstabler: farge/gradient (også animert), glød, bilde, korn.

Fordi friheten er stor, tar Urd ansvar for det Wix-modellen sliter med: når du endrer desktop-layouten i en seksjon der du har håndjustert mobil-layout, flagger Urd seksjonen med «mobil trenger tilsyn» til du har sett over den. Se [SKJEMA.md](SKJEMA.md#mobil-tilsyn).

Egne seksjoner kan lagres som **maler** og deles som **plugins** - plugins kan levere blokker, seksjonspresets, bakgrunner, animasjoner og maler, og er underlagt samme migreringskontrakt som kjernen.
