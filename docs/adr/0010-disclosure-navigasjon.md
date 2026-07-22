# ADR-0010: Nav-undermenyer følger disclosure-mønsteret (aldri role="menu")

Dato: 22. juli 2026. Status: vedtatt (v0.6 M5, eiers valg).

## Kontekst

M5 ga nav-en dropdown-undermenyer, og WAI-ARIA har to etablerte mønstre å velge mellom. Menubar-mønsteret (`role="menubar"`/`role="menu"`, piltast-navigasjon, roving tabindex) er laget for applikasjonsmenyer à la skrivebordsprogrammer og er dokumentert feil for nettstedsnavigasjon: skjermlesere bytter modus, forventer app-oppførsel og kunngjør menyer misvisende. Disclosure-mønsteret (vanlige lenker pluss knapper som viser/skjuler) er WAI-ARIA-gruppens egen anbefaling for nettstedsnav. I tillegg måtte et klassisk tilgjengelighetsdilemma avgjøres: hva skjer når et menypunkt både har egen side og undermeny (hover åpner, men hva gjør klikk?).

## Beslutning

1. **Disclosure navigation, aldri menubar**: undermenyer i nav-en (og fremtidig meny-UI mot besøkende) bygges som `<nav>` med vanlige lenker og ekte `<button>`-åpnere med `aria-expanded`/`aria-controls`. `role="menu"`, `role="menuitem"` og roving tabindex er forbudt i nettstedsnav.
2. **Punkt med eget mål OG undermeny rendres som lenke pluss egen pilknapp** (eiers valg 22. juli 2026): siden er alltid nåbar med klikk/Enter, pilen åpner undermenyen. Punkt uten eget mål er én knapp der hele punktet er åpneren. Modellen heter `kind: link/split/toggle` i [nav-model.js](../../template/assets/engine/nav-model.js).
3. **Interaksjonskontrakten**: hover åpner kun for ekte mus (`pointerType === 'mouse'`, vaktet av `(hover: hover) and (pointer: fine)`), klikk toggler, kun én undermeny åpen, Escape lukker og refokuserer åpneren, fokus ut av punktet lukker, klikk utenfor lukker alt. Naturlig Tab-rekkefølge, ingen fokusfelle.
4. **Ett nivå**: undermenyer kan ikke ha undermenyer (barnebarn ignoreres defensivt i motoren, skjemaet tillater dem ikke).
5. **Mobilmenyen er samme disclosure**: burgeren er en knapp med `aria-expanded` som viser samme liste som kolonnepanel; undermenyene blir trekkspill. Ikke-modal: ingen scroll-lås, panelet scroller selv.

## Konsekvenser

- Fremtidig meny-arbeid (M6-ikoner, footer-lenker, mega-meny-ønsker) starter fra disclosure-kontrakten; ingen skal «oppgradere» til menubar-mønsteret.
- Skjermlesere leser nav-en som vanlig lenkeliste med til/fra-knapper, som er forventningen på nettsteder.
- Sjekkpunkt i testrunder: Tab gjennom hele menyen uten å sette seg fast, Escape lander på åpneren, og hover-åpning skjer aldri på touch.
