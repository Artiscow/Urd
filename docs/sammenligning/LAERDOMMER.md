# Lærdommer: hvordan andre bygger, og hva vi kan hente

Skrevet 27. juli 2026. Der [FUNKSJONSKART.md](FUNKSJONSKART.md) svarer på HVA de andre byggerne har (funksjonsparitet, hull, anbefalinger), svarer dette dokumentet på HVORDAN de bygger det: admin-arkitektur og editor-mekanikk, byggemåten for den genererte siden, og publiserings- og deploy-mønstre. Til slutt en prioritert liste over design- og byggemønstre vi kan hente. Funksjonshull (SEO, galleri, RSS osv.) gjentas ikke her; de er kartlagt og prioritert i funksjonskartet.

**Byggere sett på ved navn:** Webflow, Framer, Wix / Wix Studio, Squarespace (Fluid Engine), WordPress Gutenberg/FSE, Elementor, Bricks, Carrd, Ghost, Publii, GrapesJS, Silex, Builder.io, Plasmic, TinaCMS, Decap CMS, Keystatic, Astro. Flere av disse (Builder.io, Tina, Decap, Keystatic, Astro, Plasmic, Bricks) står ikke i funksjonskartet, fordi de er mest interessante nettopp for byggemåten.

**Om kildene:** arkitekturpåstander (Fluid Engines grid, Builders iframe-protokoll, Decaps arbeidsflyt, Astro Studio-nedleggelsen, Publiis git-synk) er fra primær- eller offisiell dokumentasjon, lenket under [Kilder](#kilder). Enkelte markedstall (DOM-node-tall, LCP-spenn) er fra sammenligningsblogger og bør leses som retningsgivende, ikke fasit.

---

## 1. Hvor Urd allerede treffer

Urd har med vilje truffet arkitekturen feltet beveger seg mot. Det er verdt å si høyt før vi ser på hva vi mangler:

- **Preview = produksjon (iframe + postMessage):** samme grunnmodell som Webflow, Builder.io og TinaCMS. Builder.io er praktisk talt en referanseimplementasjon av det Urd allerede gjør ([ADR-0001](../adr/)).
- **Git-som-database + statisk utdata + ingen hostet backend:** Astro la ned sin hostede databasetjeneste (Studio) 1. mars 2025 fordi forretningsmodellen ikke bar, selv om teknikken virket. Urd har kuttet nettopp den kostnaden og nedleggingsrisikoen. Salgsargument, ikke mangel.
- **Ren, avhengighetsfri HTML/JS:** Bricks mot Elementor viser at div-suppe og tunge runtimes koster 2-4x DOM-noder og sekunder på LCP. Urds råserverte motor (ADR-0002) er et klart fortrinn.
- **Disiplin få matcher:** migreringsinvarianten (ADR-0005), hjelpechip (ADR-0008), temastyrt UI (ADR-0009), vis-kun-relevante-kontroller.

Resten av dokumentet handler om mønstrene bak de andre, og hvilke vi kan låne uten å gi opp disse fire.

---

## 2. Admin-siden: editor-arkitektur og mekanikk

### iframe + postMessage med patcher (Builder.io, Tina, Framer)
Builder.io laster din ekte side i en iframe og snakker med den via postMessage: en liten SDK i siden melder kontekst opp, Builder sender JSON ned og sender **patcher** når noe endres, i stedet for å rendre alt på nytt. Tina gjør det samme oppå en git-basert side; Framer la i 2025 til «On-Page Editing» der innhold og CMS-sider redigeres direkte på den rendrede siden.

**For Urd:** dette ER Urds modell. Der Urd i dag rerendrer per seksjon (`urd-preview`), er finere patcher (rør bare den ene blokken/attributten) det naturlige neste steget for snappere redigering av store sider.

### Klikk-og-rediger på ekte side + sidepanel med live preview (Tina, Ghost)
Tina lar redaktøren klikke tekst rett på den levende siden og redigere i et sidepanel med sanntids-forhåndsvisning; innholdet blir liggende som Markdown i git. Ghost bruker slash-kommandoer for å sette inn typede «Cards» midt i prosaen. In-place slår løsrevne skjemaer.

**For Urd:** Urd har allerede in-place klikk-og-skriv og «Office-linjen». Ghosts slash + snippets (se 2-punktet under gjenbruk) er det mest åpenbare løftet på selve tekstflyten.

### Hver kontroll skriver en synlig, ekte CSS-egenskap (Webflow)
Webflows tese er at hver handling mapper 1:1 til en ekte CSS-egenskap: flytt en boks og Webflow skriver `margin`/`padding`, og Style-panelet viser boks-modellen visuelt med dra-håndtak. Det lærer ved å gjøre, og passer «rå filer, ingen magi».

**For Urd:** en styrke å bevare; når nye stilkontroller legges til bør de vise hvilken faktisk egenskap de styrer, ikke skjule den bak et abstrakt navn.

### Komponent = ekte DOM-node + StyleManager som kun viser relevante kontroller (GrapesJS)
GrapesJS (motoren bak Silex) modellerer hvert element som en **ekte DOM-node med en typet modell**, ikke et proprietært objekt, og StyleManager eksponerer CSS som et kuratert sett visuelle kontroller per elementtype.

**For Urd:** komponent-som-DOM-node er allerede Urds render-modell. «Vis kun relevante kontroller» er allerede en regel (se CLAUDE.md); GrapesJS bekrefter mønsteret.

### Admin injisert i selve siden, ikke en egen app (Keystatic)
Keystatic installeres som en pakke og injiserer admin-ruter i ditt eget nettsted, med samme skjema i to kjøremiljøer: lokal modus skriver til disk, GitHub-modus committer via en GitHub App.

**For Urd:** speiler `/admin` som bor i repoet/siden. «Samme skjema, to runtimes» er en god modell for lokal-mot-publisert-paritet.

### Editor-guardrails som gjør fri plassering trygg (Squarespace Fluid Engine)
Fluid Engine gir fri, overlappende plassering, men med rekkverk: du kan ikke krympe en blokk under innholdet sitt, høyde-endringer flytter naboer forutsigbart, og ved drag-start fjernes «rad-strekk» slik at du alltid drar mot et **uniformt** rutenett. «G» slår på rutenett-overlegget; mobil redigeres som egen layout som holder seg synket til desktop.

**For Urd:** dette treffer rett i hybridmodellen (ADR-0001) og mobil-tilsyn. Se mulighet 1 under.

### «Hvilket layout-verktøy?» som innebygd beslutningshjelp (Wix Studio)
Wix Studio har to layoutsystemer (flexbox-stacks og CSS-grid) og en eksplisitt, lærbar modell for når man bruker hva (innholdsmengde, responsiv oppførsel, dynamiske data, justering).

**For Urd:** perfekt match for hjelpechip-regelen (ADR-0008): lever beslutningshjelpen som en «?»-chip, ikke som docs.

### Forhåndsvisnings-lerretet: reflow, skalering eller fast bredde (hvordan de andre viser siden)
Editor-lerretet har en annen proporsjon enn vinduet (paneler tar bredde, topplinja tar høyde), så en fullbredde-side kan ikke både FYLLE lerretet OG vise nøyaktig samme «fold» som en besøkende. Kartlagt fra primærkilder (lest direkte, ikke fra søkesammendrag):

- **Gutenberg/WordPress - iframen ER viewporten (reflow):** canvas er en iframe der `vw`/`vh`/`@media` løses mot lerretet, ikke admin-siden («Now that `100vw` resolves against the *canvas* instead of the admin page, there's no sidebar to subtract», [Gutenberg Times](https://gutenbergtimes.com/the-post-editor-is-going-full-iframe-what-block-developers-need-to-know-before-wordpress-7-1/), [developer.wordpress.org](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-api-versions/block-migration-for-iframe-editor-compatibility/)). `transform: scale()` brukes bare i en egen zoom-ut-modus (50 %, kun desktop) for oversikt ([PR #58202](https://github.com/WordPress/gutenberg/pull/58202)).
- **Shopify - live storefront-iframe:** forhåndsvisningen er en live iframe av butikken; «kollaps sidepanelet for fullbredde» + egne desktop/mobil-knapper ([Shopify Help](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor/features-overview)). Doksiden bekrefter HVA, ikke mekanismen; modellen peker mot reflow til tilgjengelig bredde.
- **Wix - fast design-bredde:** klassisk Wix låser innholdet til 980px uansett nettleserbredde; Wix Studio bruker `px*` relativt til redigeringsstørrelsen + maks-bredde (standard 1600px) med sidemarger på bredere skjermer ([Wix Help](https://support.wix.com/en/article/studio-editor-setting-the-sites-max-width)).
- **Squarespace/Fluid Engine - rutenett-canvas:** 24-kolonners grid (desktop) / 8 (mobil), blokker som grid-koordinater, ren CSS-grid ved kjøring; egne live enhets-visninger for mobil vs. desktop ([Squarespace Help](https://support.squarespace.com/hc/en-us/articles/6421525446541-Edit-your-site-with-Fluid-Engine)).
- **Enkle tutorials (breddedrevet «fyll») = Urds nåværende algoritme, uløst:** Max Schmitt (`scale = container/breakpoint`, `iframeH = container/scale`, top-left, fyller, ingen letterbox, [maxschmitt.me](https://maxschmitt.me/posts/iframe-react-responsive-website-tester)) og baraa.app (`scale = containerWidth/iframeWidth`, [baraa.app](https://www.baraa.app/blog/dynamic-viewports-in-iframes)) HAR fold-avviket, men nevner det ikke.
- **Fast viewport + fit begge akser + letterbox (de som får folden riktig):** mudosdigital (`scale = Math.min(1, wrapperW/width, wrapperH/height)`, iframe i fast bredde OG høyde, letterbox ved avvik, [mudosdigital](https://mudosdigital.com/css-transform-origin-and-scale-with-responsive-preview-containers/)); Chrome DevTools device mode (simulert viewport med definert bredde OG høyde, [developer.chrome.com](https://developer.chrome.com/docs/devtools/device-mode)); Figma bekrefter at en 100vh-seksjon ikke kan stemme både i design og preview ([Figma-forum](https://forum.figma.com/suggest-a-feature-11/viewport-height-option-on-frames-36753)).

**Kjerneinnsikt:** ingen av de fire store rendrer i én bredde og skalerer til en annen for vanlig redigering. De gjør lerretet TIL viewporten (reflow: Gutenberg/Shopify) eller bruker en fast design-bredde (Wix/Squarespace). Skalering brukes bare til bevisst zoom-ut-oversikt.

**For Urd (rot-årsak):** `frameToCss` i `engine/render.js` legger blokker med `left`/`width` i PROSENT av seksjonsbredden, men `top`/`height` i PIKSLER. Layouten er dermed ikke breddeinvariant: ved en annen bredde klemmes alt vannrett mens høyder står fast, altså forvrengning, ikke bare mindre. Derfor ser reflow «annerledes/lavere» ut, og derfor valgte 0.6.6.5.9 uniform `scale` (bevarer proporsjonene) - som igjen gir at admin-forhåndsvisningen avslører seksjonen under (fold-avviket ren visning ikke har, siden den kjører ≈ full vindus-skala). En **fast innholdsbredde** (Wix-modellen) gjør layouten breddeinvariant: da skalerer uniform tapsfritt og folden stemmer, og «blokker strekker seg evig med bredden»-flow-out-bugene forsvinner (samme rot). Ført inn som eget backlog-punkt (v0.7).

---

## 3. Den genererte siden: byggemåte og levering

### Minimal-wrapper HTML og liten JS som målbart fortrinn (Bricks mot Elementor)
Bricks sender semantisk HTML med minimale wrappere og CSS Grid/Flex, med et Vue-basert skript på ~48 KB. Elementor pakket historisk hvert element i flere `div`-er med autogenererte klasser og lente seg på jQuery. Målt: en hero = 23 noder / 4 wrapper-div-er (Elementor) mot 9 noder / 1 wrapper (Bricks); ~2.4x færre noder over et helt nettsted. Retningen er solid selv om tallene er indikative.

**For Urd:** «ingen div-suppe, ingen auto-klasser, liten JS» bør behandles som en kjernefunksjon, ikke bare et renhetsprinsipp. Se mulighet 6 (gjør letheten synlig og målbar).

### Fri layout som er ren CSS ved kjøring (Squarespace Fluid Engine)
Blokker lagres som **grid-koordinater** (start/slutt x,y + z + vertikal justering), ikke piksler. Rader defineres med `grid-template-rows: repeat(var(--num-rows), minmax(var(--row-height), auto))` slik at rader **strekker seg etter innhold** som vokser (tekst som brytes på smal skjerm), uten JS-reposisjonering ved kjøring. Bevisst valg: begrenset rutenett fremfor absolutt posisjonering, for å beholde fri-følelsen og likevel garantere responsiv render uten runtime-JS.

**For Urd:** dette er den enkeltteknikken med høyest passform (statisk, avhengighetsfri, ren CSS). Se mulighet 1.

### Deklarativ responsiv, variant valgt ved navnematch (Framer)
Framer er desktop-først; komponenter har varianter per brekkpunkt, og en variant navngitt for å matche et brekkpunkt velges automatisk. Effekter er laget for å overleve på tvers av brekkpunkter.

**For Urd:** en ren, deklarativ responsivmodell som kan informere mobil-gjennomtenkningen (v0.7) og det åpne «egen mobilversjon?»-spørsmålet.

### theme.json: ett token-lag for hele designet (Gutenberg)
WordPress sentraliserer farger, typografi, avstand og duotone-presets i én `theme.json`. Block Bindings kobler blokk-attributter til datakilder; Interactivity API gir en standard måte å deklarere front-end-interaktivitet på (blokken sier om den er kompatibel).

**For Urd:** Urd har allerede tokens. Å formalisere dem som én dokumentert kontrakt (og åpne for duotone) er et lavthengende, git-vennlig løft. Se mulighet 3.

### Innhold som ordnet JSON og data bakt inn ved publisering (Builder.io, Ghost, Plasmic)
Builder lagrer innhold som en ordnet `blocks`-array rendret av motoren; Ghost bruker et standardisert JSON-dokumentformat som skiller forfatting fra render. Plasmic trekker ut data ved **build-time** og bakar det inn i statisk HTML, så data-drevne sider rendres uten å vente på et kall.

**For Urd:** blocks-som-JSON er allerede Urds modell. Build-time-baking er nøyaktig mønsteret bak den planlagte «bakt HTML ved publisering» (v0.8), og Plasmic viser hvordan data kan føles dynamisk uten en runtime-backend. Se mulighet 8.

### Skjemavalidert innhold i git (Astro Content Collections, Keystatic, Decap)
Astro validerer innholds-samlinger med Zod-skjema; Keystatic og Decap definerer samlinger/felt som skjema i henholdsvis TypeScript og config. Et skjema-avvik fanges før det knuser en bygget side.

**For Urd:** dette er migreringsvern satt i system, og Urd har allerede JSON Schema i `schema/`. Lærdommen er å bruke valideringen aktivt som sikkerhetsnett for kontrakten «aldri knuse en bygget side» (ADR-0005).

---

## 4. Publisering og deploy

### PR-per-utkast som arbeidsflyt (Decap CMS)
Decap kan kjøre en redaksjonell arbeidsflyt der hvert upubliserte innslag blir en **pull request**: utkast, gjennomgang, godkjenning. Publiser = merge.

**For Urd:** dette legger seg naturlig oppå GitHub-OAuth-publiseringen (ADR-0003). Utkast som branch, publiser som merge, gir gjennomgang og godkjenning nesten gratis.

### Forhåndsvisnings-URL per utkast via commit-status (Decap + Cloudflare Pages)
Decap henter deploy-preview-URL-er for uslåtte endringer via commit-statuser fra vertsleddet. Cloudflare Pages lager preview-deploy per branch.

**For Urd:** kombinert med PR-per-utkast gir dette hvert utkast en levende preview-lenke, postet tilbake til PR-en.

### Open authoring (fork + PR) (Decap)
Eksterne bidragsytere redigerer via fork + PR, uten skrivetilgang til repoet.

**For Urd:** trygg fler-bidragsyter-redigering på en statisk/git-side, som støtter v1.0-målet «en forening kan drifte siden uten utvikler».

### Git som synk-ryggrad (Publii)
Publii er den nærmeste filosofiske slektningen: en WordPress-kjent UI som lager statisk utdata. Git-synk-modusen henter innhold fra repoet, lar lokale endringer overstyre, og committer/pusher.

**For Urd:** studer Publiis konflikt-/overstyrings-semantikk som forbilde for Urds git-som-database og konfliktvakt.

### Den strategiske leksa: ingen hostet tjeneste (Astro Studio)
Astro Studio (hostet DB, lansert tidlig 2024) ble lagt ned: ingen nye databaser etter 1. oktober 2024, eksisterende offline etter 1. mars 2025. Grunnen var forretningsmodellen, ikke teknikken.

**For Urd:** dette bekrefter hele Urds tese. Git-som-database + statisk utdata + Cloudflare Pages fjerner nettopp kostnadssenteret som felte Studio. Markedsfør det: «ingenting å legge ned; repoet ditt er siden din.»

---

## 5. Hva vi kan hente (prioritert)

Rangert etter (passform x verdi / innsats). Dette er byggemåte- og design-mønstre, ikke funksjonshull; rene funksjonshull (SEO, galleri, RSS, skjemafelt osv.) er prioritert i [FUNKSJONSKART.md](FUNKSJONSKART.md#anbefalingene-c-funnene-prioritert), og krysshenvises der de møtes.

1. **Fluid-Engine-guardrails i grid og canvas.** `minmax(row-height, auto)`-rader så rader vokser med innhold uten JS ved kjøring; kan ikke krympe en blokk under innholdet; drag mot et uniformt rutenett (fjern rad-strekk ved drag-start); egen mobil-layout som holder seg synket. «G»-overlegget finnes allerede. Kilde: Squarespace. Passform: svært høy (rett i ADR-0001 + mobil-tilsyn). Innsats: middels. Styrker kjerne-canvasen og gjør fri plassering tryggere.
2. **Finere patch-protokoll i preview.** Send målrettede patcher (én blokk/attributt) i stedet for seksjons-rerender ved hver endring. Kilde: Builder.io. Passform: høy (allerede Urds modell). Innsats: middels. Merkes mest på store sider.
3. **Ryddig `theme.json`-token-modell.** Formaliser og dokumenter designtokens som én kontrakt; åpner for duotone-presets (allerede en strekk-idé i backloggen). Kilde: Gutenberg. Passform: høy. Innsats: lav-middels.
4. **Gjenbruk som arkitektur: patterns, symbols og template parts.** Innsettbare ferdig-komponerte blokkgrupper (patterns), en gjenbrukbar gruppe som oppdateres overalt (symbols), og delte header/footer-fragmenter (template parts). Kilde: Gutenberg/Webflow. Bygger på den planlagte «Lagre som mal» (M8) og samling-blokken. Passform: høy. Innsats: middels-høy. Utdyper notatet under C12 i funksjonskartet.
5. **PR-per-utkast + deploy-preview + open authoring.** Utkast som branch, publiser som merge; preview-URL per utkast via Cloudflare Pages + commit-status; bidrag via fork + PR. Kilde: Decap. Passform: høy med GitHub-OAuth + Pages. Innsats: middels-høy. Støtter v1.0-målet og flere bidragsytere.
6. **Gjør motorens letthet synlig og målbar.** Et DOM-node-tall / payload-mål i editoren eller ved «Se siden». Kilde: Bricks-leksa. Passform: høy. Innsats: lav. Bygger tillit og omdømme rundt et fortrinn som i dag er usynlig.
7. **Slash-kommando + snippets i tekst-editoren.** Rask innsetting av blokker og gjenbruk midt i prosaen. Kilde: Ghost. Passform: høy med «Office-linjen». Innsats: middels.
8. **Build-time data-bake for data-drevne sider.** Bak samlingsdata inn i statisk HTML ved publisering, så siden føles dynamisk uten runtime-backend. Kilde: Plasmic. Kobler rett på den planlagte v0.8-bakingen. Passform: middels-høy. Innsats: middels.
9. **Indeks/minne-lag for rask spørring i admin.** Ikke les repoet på hvert tastetrykk når samlinger vokser. Kilde: Tina. Passform: middels (ytelse). Innsats: middels. Kun relevant i skala.
10. **«Hvilket layout-verktøy?»-beslutningshjelp som hjelpechip.** Kilde: Wix Studio. Passform: høy (matcher ADR-0008). Innsats: lav.
11. **Deklarativ per-brekkpunkt-variant ved navnematch.** Informerer mobil-gjennomtenkningen og «egen mobilversjon?»-spørsmålet. Kilde: Framer. Passform: middels-høy. Innsats: høy (rører responsivmodellen).

---

## 6. Hva vi bevisst IKKE bør ta

- **GSAP / tunge animasjonsbibliotek** - avhengighet, bryter ADR-0002. En liten vanilla scroll/appear-primitiv gir nok effekt.
- **Runtime-SDK-levering / dynamisk innhold** (Builder/Tina i dynamisk modus) - bryter statisk utdata. Urd er «bak ved publisering»-halvdelen, og det er enklere.
- **Hostet database/tjeneste** (Astro Studio) - nettopp kostnaden og risikoen Urd unngår.
- **Absolutt fri posisjonering** (klassisk Wix) - deilig, men responsivt skjørt. Urds begrensede rutenett er riktig valg.
- **Klassebasert cascade-styling** (Webflow) - kraftig, men innfører en stylesheet-database-abstraksjon som slår mot «rå filer, ingen bygging». Vurderes, ikke adopteres uten videre.
- **React/RSC-kodekomponenter** (Plasmic) - ta ideene (build-time bake, provider/consumer-data), ikke rammeverket.

---

## Kilder

- **Webflow:** [canvas-oversikt](https://help.webflow.com/hc/en-us/articles/33961319255059-Webflow-canvas-overview), [Interactions](https://webflow.com/feature/interactions-animations), [CMS](https://university.webflow.com/courses/cms-and-dynamic-content).
- **Framer:** [brekkpunkter](https://www.framer.com/blog/responsive-breakpoints/), [CMS Components](https://www.framer.com/updates/cms-components), [On-Page Editing](https://alternativeto.net/news/2025/8/framer-introduces-on-page-editing-for-live-content-updates-and-new-cms-page-creation/).
- **Wix Studio:** [flexbox vs grid](https://support.wix.com/en/article/studio-editor-choosing-between-flexbox-based-and-grid-based-tools), [docking](https://support.wix.com/en/article/studio-editor-working-with-docking-margins-and-padding).
- **Squarespace Fluid Engine:** [Developing Fluid Engine (Squarespace Engineering)](https://engineering.squarespace.com/blog/2022/developing-fluid-engine).
- **Gutenberg/FSE:** [blocks/patterns/FSE-guide](https://wppoland.com/en/gutenberg-blocks-patterns-full-site-editing-guide/), [Block Bindings 6.9](https://make.wordpress.org/core/2025/11/12/block-bindings-improvements-in-wordpress-6-9/), [Interactivity API](https://github.com/WordPress/gutenberg/discussions/55642).
- **Elementor vs Bricks:** [ytelses-benchmark](https://inspiredmonks.com/bricks-builder-vs-elementor-performance-2026/), [sammenligning (Crocoblock)](https://crocoblock.com/blog/bricks-builder-vs-elementor/).
- **Ghost:** [den nye editoren (Lexical, cards)](https://ghost.org/changelog/new-editor/).
- **Publii:** [git-repo-sync](https://getpublii.com/blog/release-044.html), [docs](https://getpublii.com/docs/).
- **GrapesJS / Silex:** [GrapesJS](https://github.com/GrapesJS/grapesjs), [Silex](https://www.silex.me/), [silex-cms](https://github.com/silexlabs/silex-cms).
- **Builder.io:** [How Builder works (teknisk)](https://www.builder.io/c/docs/how-builder-works-technical).
- **Plasmic:** [data i kodekomponenter](https://docs.plasmic.app/learn/data-code-components/), [data queries v2 / RSC](https://plasmic.substack.com/p/data-queries-v2-full-rsc-support).
- **TinaCMS:** [tina.io](https://tina.io/), [Tina vs Decap](https://tina.io/tinacms-netlifycms-comparison).
- **Decap CMS:** [editorial workflows](https://decapcms.org/docs/editorial-workflows/), [deploy preview links](https://decapcms.org/docs/deploy-preview-links/), [open authoring](https://decapcms.org/docs/open-authoring/).
- **Keystatic:** [Keystatic + Astro](https://docs.astro.build/en/guides/cms/keystatic/).
- **Astro:** [Content Layer](https://astro.build/blog/content-layer-deep-dive/), [Goodbye Studio](https://astro.build/blog/goodbye-astro-studio/).
