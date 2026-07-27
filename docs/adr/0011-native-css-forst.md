# ADR-0011: Bygg komponenter native/CSS-først

Dato: 27. juli 2026. Status: vedtatt (v0.6, «Moderniser til native/CSS»).

## Kontekst

Urds motor er avhengighetsfri vanilla-JS som serveres rått. Flere komponenter ble opprinnelig bygget «på den gamle måten»: egen JS for tilstand, posisjon og animasjon (rAF- og scroll-lyttere, manuell `aria-expanded`, `max-height`/`scrollHeight`-hacking, absolutt posisjonering med z-index-krig, egne fokusfeller og outside-click-lyttere). Disse dro med seg en hel klasse vonde, ofte uløselige bugs: jank, teleporterte elementer, hengende hover, overlegg fanget i en stacking-context, tapt fokus. Feltstudien i [ELEMENTKART.md](../sammenligning/ELEMENTKART.md) (del 3, 5b og 6-tabellen) viste at moderne byggere unngår nettopp disse ved å bygge på nettleser-primitiver, og at plattformen tidlig 2026 har baseline-primitiver for det meste.

## Beslutning

1. **Native/CSS-først.** Nye og ombygde komponenter bruker nettleser-primitiver framfor egen JS der en primitiv finnes:
   - Modal/lightbox: `<dialog>` + `showModal()` (top-layer, `::backdrop`, fokusfelle, fokus-retur og inert bakgrunn gratis).
   - Accordion: `<details name>` (eksklusiv utfolding, finn-på-siden, tastatur/skjermleser), myk høyde via `::details-content` + `interpolate-size` bak `@supports`.
   - Scroll-koblede effekter (parallaks): `animation-timeline: scroll()/view()` (kompositor-tråd) framfor rAF/scroll-lytter.
   - Menyer: Popover API der forankring finnes. Nav-undermenyer forblir disclosure ([ADR-0010]); flyttes ikke til top-layer før CSS Anchor Positioning er baseline (ellers mister undermenyen posisjonen under nav-punktet).
   - Tema: `light-dark()` + `color-scheme` mot FOUC (framtidig punkt).
2. **Gate ikke-baseline med `@supports`.** Alt som ikke er baseline tidlig 2026 (scroll-drevne animasjoner, `::details-content`/`interpolate-size`, anchor positioning, `closedby`) pakkes i `@supports`/funksjonssjekk. Antas aldri.
3. **Fallback er alltid trygg.** Uten støtte faller komponenten enten tilbake til en JS-vei (parallaks beholder rAF-varianten) eller viser elementet i SLUTTILSTAND - aldri skjult, aldri ødelagt.
4. **Observers er for LOGIKK, ikke animasjon.** `IntersectionObserver`/`ResizeObserver` forblir riktig for avdekking (engangs-entré), impresjoner, aktiv-seksjon og resize-måling. Scroll-*koblet* bevegelse hører til scroll-drevet CSS. Engangs-entré (fade/slide/zoom, stagger) blir derfor VÆRENDE på IntersectionObserver: scroll-drevet `view()` ville reversere ved scroll opp, og det finnes ingen ren CSS-lås til sluttilstand.

## Konsekvenser

- Ombygging sletter skjør JS og gir bedre tilgjengelighet «gratis» (f.eks. fikk lightboxen en fokusfelle den manglet).
- Invarianten består: props-formen endres ikke av en ren render-omlegging, så ingen migrering trengs; endrer en ombygging props, gjelder [ADR-0005] som vanlig.
- Nye motor-lekser er festet i [CLAUDE.md]. Regelen om `@supports`-gating og «fallback = sluttilstand» er et fast sjekkpunkt i testrundene.
- Der en primitiv ikke er moden nok (native masonry, anchor positioning som kjerne), venter vi bevisst; se ELEMENTKART del 8.

[ADR-0010]: 0010-disclosure-navigasjon.md
[ADR-0005]: 0005-versjonering-og-migrering.md
[CLAUDE.md]: ../../CLAUDE.md
