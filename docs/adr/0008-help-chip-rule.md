# ADR-0008: The help chip rule («?» on everything with special functions)

Date: 19 July 2026. Status: accepted (v0.6 M3); the consequence on the card's texts amended 11 September 2026 (translation keys, ADR-0012 and ADR-0022), earlier text in [amended/](amended/0008-help-chip-rule-until-2026-10-11.md). How the chip is attached is described in [ARCHITECTURE.md](../ARCHITECTURE.md) and [template/plugins/README.md](../../template/plugins/README.md).

## Context

Blocks and sections keep gaining functions that are not visible on the surface: the collection block has click-and-type and auto-grow, the calendar block has a source panel, a category convention and registration extraction. The test rounds showed the pattern: the functions are not discovered, or are perceived as bugs («the image editor is no image editor», «⚙ Sources - what is this?»). Tooltips vanish before they are read, and documentation outside the editor is not found in the moment of work.

## Decision

1. **All blocks, sections and elements with SPECIAL functions must have a help chip** in the preview: a «?» that opens a persistent help card where ALL the functions are explained, one line per function. The card stays until you click outside or press Escape, so it can be read in peace. «Special» means: something beyond the move/scale/delete standard all blocks have (dedicated editing surfaces, conventions in the content, panels, automation).
2. **One shared helper owns the form**: [hint.js](../../template/assets/urd/hint.js) (stable plugin API path, ADR-0013). The chip is shown only on hover in the preview, never in Clean view, never for visitors. Nobody makes their own variants.
3. **The rule applies to the core AND plugins alike.** Plugin authors import the same helper through the plugin API and attach it only in the preview. The requirement is stated in plugins/README.md.
4. New blocks with special functions deliver the chip in the same push as the function.

## Consequences

- Functions are documented WHERE they are used; the user guide remains the overview, not the reference for individual blocks.
- Checkpoint in test rounds: do new special functions have a chip? (Belongs in the phase gates' checklists.)
- The help card's texts are short and go through translation keys: one sentence per line; if a line grows longer, the function is probably too complex or the chip is in the wrong place.
