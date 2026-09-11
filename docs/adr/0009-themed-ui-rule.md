# ADR-0009: The themed UI rule (never native select in editing UI)

Date: 19 July 2026. Status: accepted (v0.6 M3).

## Context

Native select popups are drawn by the browser/OS, outside the page's rendering model. CSS reaches the closed box, but the popup follows the widget theme: on a dark site with a light OS preference (or browsers that override `color-scheme`, e.g. LibreWolf with resistFingerprinting) the result is a light popup with the site's light text colour inherited into it - unreadable. The problem appeared repeatedly (the image editor, the calendar's source panel) and cannot be solved reliably with CSS.

## Decision

1. **Native `<select>` is forbidden in all editing UI** (the admin panels and the preview layer). `color-scheme: dark` is not an accepted solution; it is overridden by browsers.
2. **The shared components own the form**:
   - Admin (Svelte): [Dropdown.svelte](../../editor/src/lib/Dropdown.svelte) - `<Dropdown value={…} options={[[value, label], …]} onchange={(v) => …} />`
   - The canvas and plugins (vanilla): [dropdown.js](../../template/assets/urd/dropdown.js) (stable plugin API path, ADR-0013) - `createDropdown({ value, options, onchange, title })`; does not steal focus, so text selections survive the choice
   - **Segment buttons** for small option sets (2-5 short labels): the image editor's pattern (.urd-imged-seg) / the calendar's .urd-kal-seg
3. Other native controls are fine: checkbox/range/number follow `accent-color`/`color-scheme` without the popup problem; the file and colour picker DIALOGUES are OS surfaces with their own themes and are ok (but `input type=color` as the PICKER has already been replaced by the colour picker).
4. The rule applies to the core AND plugins; the requirement is stated in plugins/README.md.

## Consequences

- Nobody needs to consider select styling again; new choice controls start from the shared components.
- Visitor surfaces are not affected (the site itself has no selects; the form plugin in M4 must take a position there: visitor forms follow the USER's OS theme and may use native select with color-scheme).
- Checkpoint in test rounds: no native select popup anywhere in the editor.
