# ADR-0019: Synket mobilmodell per blokk (radnettet)

Dato: 13. august 2026. Status: vedtatt (v0.7, milepæl 0.7.3 mobil-revurderingen).

## Kontekst

Mobil-layouten har til nå hatt to modi per seksjon. `auto` avleder alt: blokkene stables i én kolonne i dokumentflyt, sortert på desktop-`y` så `x` (`mobileOrder` overstyrer nøkkelen), og dekor-blokker utelates. `manual` settes i det brukeren håndjusterer ÉN blokk i mobilvisning: da materialiseres ALLE seksjonens blokker med konkrete `frames.mobile` målt fra flyten, og seksjonen rendres absolutt.

Materialiseringen er modellens rot-problem (observert 17. juli 2026): den er alt-eller-ingenting. Etter første grep er hver eneste blokk frosset i målte piksler, og koblingen til desktop er kuttet for hele seksjonen. Mobil-tilsynet (flagget som settes ved desktop-endringer i manuelle seksjoner) er et plaster over kuttet, ikke en synk. Fire konkrete symptomer fulgte: tilsyns-merket sa ikke hva som skulle gjøres hvor, dekor-skjulingen virket ikke i manuelle seksjoner (materialiseringen ga dekor-blokkene en mobil-frame), `mobileOrder` hadde ingen editor-UI, og en ny desktop-blokk i en manuell seksjon landet på desktop-posisjonen sin, ofte utenfor 390 px-skjermen.

Feltstudien (13. august 2026) er entydig. Squarespace Fluid Engine, Wix, Wix Studio og Framer har alle samme grunnmodell: én responsiv side, desktop-først, mobil avledet automatisk, og mobilendringer som overstyringer PER ELEMENT som aldri rører desktop. Urørte elementer fortsetter å følge desktop, nye elementer flyter inn i mobil-layouten, og skjuling per enhet er per element. LAERDOMMER 5.1 (høyest prioritert lærdom i sammenligningen) peker på nettopp Fluid Engine-mekanikken: «egen mobil-layout som holder seg synket», med `minmax`-rader som vokser med innholdet uten JS.

## Beslutning

1. **Mobil-overstyringen er per blokk, og markøren er tilstedeværelsen av `frames.mobile`.** Feltet bytter form fra full frame til PARTIELL plassering `{x?, w?, row?, rows?, z?, rot?}`: `null` betyr at blokken følger desktop fullt ut, et objekt uten `row` overstyrer kun de feltene som står der (blokken flyter fortsatt), og et objekt med `row` pinner blokken. Seksjonsmodiene pensjoneres: `responsive.mobile.mode: "manual"` leses av migreringen men skrives aldri igjen.

2. **Én mobil-rendersti for alle seksjoner: radnettet.** `.urd-canvas` får en indre grid-flate (avløser `.urd-flow`) med `grid-template-columns: 100%` og `grid-auto-rows: minmax(8px, auto)`. Konstanten `MOBILE_ROW = 8` eksporteres fra `migrate.js` og er en modellkonstant, aldri koblet til `grid.size` (som er et snappeverktøy for desktop).

   - Flytblokker auto-plasseres i stackOrder-rekkefølge (sparse, aldri dense: dense ville bakfylt hull og brutt leserekkefølgen). Ikke-tekst/ikke-autoGrow spenner `ceil((desktop.h + 16) / 8)` rader (spennet rommer flyt-luften på 16 px, så radsporene aldri blåses opp); tekst og autovoksende blokker spenner én rad og får naturlig høyde.
   - Pinnede blokker får eksplisitt `grid-row: row / span rows`, bredde `w` % og `margin-left: x` % av flaten, pluss `z`/`rot`.
   - `minmax`-radene vokser når innholdet er høyere enn spennet. En radposisjon er dermed en posisjon i KOMPOSISJONEN, ikke en frossen pikselavstand: vokser innholdet over, følger blokken med. Det er synken.
   - Sparse auto-plassering gjør at flytblokker aldri legger seg oppå pinnede bånd; overlapp er kun mulig pinnet-mot-pinnet, som er bevisst (`z` gjelder).
   - Seksjonshøyden på mobil blir implisitt (siste radslutt); minHeight-styringen i mobilgrenen utgår. Desktopstien røres ikke.

3. **ADR-0001-invarianten holdes strengt.** Publisert render er en ren funksjon av lagrede data, identisk i editor og produksjon; radvekst er nettleserens CSS, ikke JS-reposisjonering. All DOM-måling (peker-y til radindeks ved dra) bor i `preview-edit.js`, som besøkende aldri laster. De to bærende funksjonene, `stackOrder` og nye `mobilePlacementToCss`, er rene og testes uten DOM.

4. **`hideMobile` skilles fra `decor`.** Nytt additivt blokkfelt `hideMobile` (bool, standard false) filtreres i mobil-renderstien, og siden stien nå er én, kan «virker ikke i manuelle seksjoner» ikke lenger oppstå. `decor` renskes til animasjonsbetydningen (utelates fra entré-bølgen); fritaket fra oppsettsbytte består (Bytt oppsett flytter aldri dekor, section-layouts.js), siden begge handler om at dekor er pynt rundt innholdet og ikke innhold. Dekor-fabrikkene i paletten og presetene setter begge feltene.

5. **Tilsynet krymper til det som faktisk kan drifte.** Flagget settes kun på seksjoner som HAR overstyringer (minst én blokk med `frames.mobile != null`). Merket i topplinja hopper til første tilsynsseksjon i mobilvisning, og seksjonen viser et tilsynskort med oversatt årsak og tid (`attention.reason`/`since`, som til nå ble skrevet men aldri lest). Tilbakestilling finnes i to nivåer: per blokk (nuller den blokkens `frames.mobile`) og per seksjon (to-klikks bekreftelse; nuller plasseringene, men beholder `hideMobile` og `mobileOrder`: synlighet og rekkefølge er intensjon og ikke drift, og en preset-satt rekkefølgenøkkel kan uansett ikke skilles fra en bruker-satt i dataene).

6. **Migrering, ikke grandfather.** `PAGE_SCHEMA_VERSION` 1 til 2. Per blokk i manuelle seksjoner: en `frames.mobile` som er byte-lik desktop-framen (materialiserings-fallbacken, aldri intensjonell) nulles; ellers konverteres `{x, y, w, h}` til `{x, w, row: max(1, round((y - 24) / 8) + 1), rows: max(1, ceil(h / 8))}` (24 er flytens topp-padding, som målingene inkluderte). `mode` settes til `auto`, `attention` bevares. Alle blokker med `decor: true` får `hideMobile: true`. `attention.reason`-tokens mappes fra norsk til engelsk (`layout-changed`, `block-edited`, `desktop-changed-after-mobile`, `section-height`, `block-moved`, `block-deleted`, `block-added`) etter regelen om engelske identifikatorer i datakontrakter. Kvantiseringstapet på ±8 px vertikalt dekkes av pre-v1-klausulen (ADR-0005-addendum; presedens: gutter-migreringen 2 til 3).

## Avviste alternativer

- **Egen mobilside (eget dokument / m-dot).** Google fraråder separate mobil-URL-er og anbefaler responsivt design, og med mobile-first-indeksering er det mobilversjonen som indekseres for alle. Ingen av byggerne i sammenligningen har det; det er dobbelt vedlikehold av innhold. Kilde: developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing.
- **Framer-modellen (deklarative varianter per brekkpunkt).** LAERDOMMER 5.11 rangerer den sist av elleve lærdommer: «Innsats: høy (rører responsivmodellen)». Den løser stil-per-brekkpunkt, ikke layout-synk, som er Urds faktiske problem.
- **Full materialisering med re-avledning i editoren.** Squarespace-modellen uttrykt som data: alle blokker beholder konkrete frames, og editoren regner ut de urørte på nytt ved desktop-endringer. Forkastet fordi re-avledningen krever et skjult flyt-målepass med tre dårlige tidspunkter (hver desktop-endring er dyrt, ved mobil-åpning gir stale publisering om visningen aldri åpnes, ved publisering legger DOM-arbeid i publiseringsflyten), og fordi målte px-høyder fryser innhold som varierer (samling/faq hos besøkende).
- **Blandet flyt og absolutt i samme seksjon.** Absolutte blokker reserverer ikke plass i flyten, så overlapp er uunngåelig når tekst vokser. Radnettet er reparasjonen av dette: pinnede blokker FÅR plassreservasjon via radspor.
- **Ren Fluid Engine-kopi med 8 kolonnespor.** Kolonnespor gir ingenting radene ikke gir: bredden har ikke innholdsvekst-problemet, og `x`/`w` i prosent flyter allerede. Kostnaden ville vært grovere horisontal kvantisering og omregning av alle lagrede bredder.
- **Nettbrett-brekkpunkt.** Bevisst utsatt (VEIKART); gjenåpnes ikke av denne ADR-en.

## Konsekvenser

- **Gamle manuelle seksjoner endrer utseende ved migrering.** Radkvantiseringen flytter blokker inntil 8 px vertikalt, og dekor-blokker som var synlige i manuelle seksjoner blir skjult (det dokumenterte intensjonen; synligheten var materialiserings-bugen). Pre-v1-klausulen dekker skiftet, og `template/content` har ingen manuelle seksjoner i dag.
- **`urd-mobile-manual`-meldingen utgår, og `urd-mobile-auto` erstattes av `urd-mobile-reset {sectionId, blockId?}`.** Kontrakten er intern (begge sider ligger i samme repo og endres i samme commit).
- **Piltast-flytting av pinnede blokker i mobilvisning** er bevisst utenfor: vurderes i finpussen (0.7.3.6).
- **`section.responsive.mobile.mode` blir død vekt i skjemaet** til en senere opprydding etter v1; feltet beholdes lesbart så gamle filer lastes riktig.
- **Delete/Backspace får mobil-vakt** i `preview-edit.js` (sletting er strukturarbeid og hører til desktop, som hos Wix), sammen med at slett-knappen alt er skjult der.

[ADR-0001]: 0001-hybrid-editormodell.md
[ADR-0005]: 0005-versjonering-og-migrering.md
[ADR-0018]: 0018-bundet-innholdsbredde.md
