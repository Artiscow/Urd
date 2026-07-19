# ADR-0009: Temastyrt UI-regelen (aldri native select i redigerings-UI)

Dato: 19. juli 2026. Status: vedtatt (v0.6 M3, eiers regel).

## Kontekst

Native select-popuper tegnes av nettleseren/OS-et, utenfor sidens renderingsmodell. CSS når den lukkede boksen, men popupen følger widget-temaet: på en mørk side med lys OS-preferanse (eller nettlesere som overstyrer `color-scheme`, f.eks. LibreWolf med resistFingerprinting) blir resultatet lys popup med sidens lyse tekstfarge arvet inn - uleselig. Problemet dukket opp gjentatte ganger (bildeeditoren, kalenderens kildepanel) og kan ikke løses pålitelig med CSS.

## Beslutning

1. **Native `<select>` er forbudt i alt redigerings-UI** (admin-panelene og preview-laget). `color-scheme: dark` er ikke en akseptert løsning; den overstyres av nettlesere.
2. **Felleskomponentene eier formen**:
   - Admin (Svelte): [Dropdown.svelte](../../editor/src/lib/Dropdown.svelte) - `<Dropdown value={…} options={[[verdi, etikett], …]} onchange={(v) => …} />`
   - Lerretet og plugins (vanilla): [engine/dropdown.js](../../template/assets/engine/dropdown.js) - `createDropdown({ value, options, onchange, title })`; stjeler ikke fokus, så tekstmarkeringer overlever valget
   - **Segmentknapper** for små valgsett (2-5 korte etiketter): bildeeditorens mønster (.urd-imged-seg) / kalenderens .urd-kal-seg
3. Andre native kontroller er greie: checkbox/range/number følger `accent-color`/`color-scheme` uten popup-problemet; fil- og fargevelger-DIALOGENE er OS-flater med egne temaer og er ok (men `input type=color` som VELGER er alt erstattet av fargevelgeren).
4. Regelen gjelder kjernen OG plugins; kravet står i plugins/README.md.

## Konsekvenser

- Ingen trenger å vurdere select-styling igjen; nye valgkontroller starter fra felleskomponentene.
- Besøkende-flater berøres ikke (siden selv har ingen select-er; skjema-pluginen i M4 må ta stilling der: besøkende-skjemaer følger BRUKERENS OS-tema og kan bruke native select med color-scheme).
- Sjekkpunkt i testrunder: ingen native select-popup noe sted i editoren.
