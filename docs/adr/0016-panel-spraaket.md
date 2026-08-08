# ADR-0016: Panel-språket og Innhold/Stil-modellen

Dato: 8. august 2026. Status: vedtatt (v0.6, panel-språk-utrullingen 0.6.6.6).

## Kontekst

Adminens seks paneler (Sider, Tema, Nav, Footer, Samlinger, Plugins) pluss Egenskaper vokste organisk, og hvert panel fant opp sine egne oppskrifter for rader, etiketter, chips og forhåndsvisninger. Ved ombyggingen av Tema-panelet (0.6.6.5.4) ble et sammenhengende panelspråk pilotert: kompakte kontroll-rader, sammenleggbare grupper, segmentknapper, små versal-etiketter, pille-chips og levende forhåndsvisninger. Oppdaterings-panelet (0.6.10) gjenbrukte idiomet, men måtte kopiere CSS-oppskriftene fordi de ikke var delte klasser: tre nesten like rad-oppskrifter (`.autorow`, `.palhead`, `.update-opt-head`), tre nesten like versal-etiketter og to nesten like chips oppsto på to runder. Uten en festet kontrakt drifter panelene fra hverandre igjen.

Samtidig viser feltstudien ([ELEMENTKART.md](../sammenligning/ELEMENTKART.md) del 1.2 og 9) at nesten alle moderne byggere deler inspektøren i Innhold vs Stil: Gutenberg (Settings/Styles), Elementor (Content/Style/Advanced), Bricks (Content/Style), Carrd (Main/Appearance), GrapesJS (Traits/Style Manager). Urds Egenskaper-panel har i dag ingen slik deling: innholdsfelt, utseende, plassering og animasjon står i én lang liste.

## Beslutning

1. **Panel-språket er en delt kontrakt.** Byggeklossene bor som delte CSS-klasser i editorens panelstil, og paneler komponerer dem i stedet for å skrive egne oppskrifter:
   - **Panel-overskrift:** `.panel-strong` for seksjonstitler i et panel.
   - **Kontroll-rad:** `.ctl-row` (flex, etikett venstre / kontroll høyre). Bryterrader bruker `.gridmenu-snap` (tekst venstre, bryter ytterst høyre), verdi-utlesning bruker `.gridmenu-value` (tabular-nums).
   - **Sammenleggbar gruppe:** `<details class="group">` med `.group-items` inni; åpen gruppe markeres med aksentkant. Seksjonsfoldere uten pille-ramme bruker `.frame-group`-varianten.
   - **Segmentkontroll:** `.seg` med `.on`-tilstand for det aktive valget (aldri native `<select>`, ADR-0009).
   - **Mini-etikett:** `.mini-label` (liten versal-etikett med letter-spacing) for kolonne- og gruppemerker.
   - **Chip:** `.chip` (999px-pille i currentColor, dempet) med `.accent`-variant for aktivt/fremhevet valg.
   - **Forhåndsvisningsflate:** `.sample` (dempet flate med tynn kant og radius) som underlag for levende prøver.
   - **Tomtilstand og feil:** `.panel-hint` (med `.place-error`-mønsteret for feil). Dette er de ENESTE legitime brukene; forklarende prosa hører i «?»-tooltips eller hjelpechipen (prosa-regelen i [AGENTS.md]).
2. **Levende forhåndsvisninger.** Innstillinger som endrer utseende skal vise effekten der de stilles: en prøve på en `.sample`-flate (pilot: palett-forhåndsvisningen, typografi-prøven og hjørneprøven i Tema) eller direkte i selve kontrollen. En innstilling brukeren må «lagre og se etter» er et avvik.
3. **Innhold/Stil-modellen.** Egenskaper-panelet deles i TO segmentfaner øverst: **Innhold** (hva blokken sier og viser: tekst- og innholdsfelt, plugin-felter via felt-kontrakten, samlingskobling, medievalg) og **Stil** (hvordan den ser ut og beveger seg: farger, bakgrunn, kanter, typografi-overstyringer, hover, animasjon, pluss plassering/lag/rotasjon). Det innføres INGEN tredje «Avansert»-fane: Urd har ikke dybden (egendefinert CSS, responsive overstyringer per felt, motion-betingelser) som begrunner Elementors tredeling, og en tom eller tynn fane er verre enn ingen. Fordelingen av hver enkelt innstilling avgjøres i utrullingsrunden for Egenskaper; modellen (to faner, definisjonene over) er festet her.
4. **Utrullingen er additiv og rund-for-runde.** Panelene flyttes over på de delte klassene i backlog-rundene under 0.6.6.6; nye paneler og nye kontroller SKAL bruke dem fra start. En ny klasse som dupliserer en byggekloss med driftede verdier er et review-funn, ikke en variant.

## Konsekvenser

- Fundament-runden konsoliderer pilotens nær-duplikater: `.autorow`/`.palhead`/`.update-opt-head` blir `.ctl-row` (pluss eventuell kontekstklasse som kun bærer marger), `.palname`/`.tpv-cap`/`.update-opt-label` blir `.mini-label`, `.stdtag`/`.update-tag` blir `.chip`/`.chip.accent`, og flate-oppskriften i `.typo-sample`/`.form-prev` blir `.sample`. Verdiene forenes; små pikselavvik mellom panelene er nettopp driften som fjernes.
- Panel-hint-prosaen som bryter prosa-regelen (33 avsnitt, eget backlog-punkt) migreres til tooltips/hjelpechip i takt med utrullingsrundene, panel for panel.
- Egenskaper-fanene krever nye UI-nøkler i kjernespråkene (nb, en-GB, tr) når de bygges (ADR-0012).
- Markup-endringene bor i `editor/src/App.svelte`; hver utrullingsrunde gjenbygger og committer bundelen som vanlig.

[AGENTS.md]: ../../AGENTS.md
[ADR-0009]: 0009-temastyrt-ui-regelen.md
[ADR-0012]: 0012-flerspraak.md
