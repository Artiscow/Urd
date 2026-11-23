# theme.js

The full text of the longer comments in the engine's `theme.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Maps theme.tokens from site.json to CSS variables on :root.
tokens.color.bg → --urd-color-bg, tokens.font.heading → --urd-font-heading, etc.

The light/dark toggle: if the theme has an `alt` field, the site exists
in two modes. `theme.scheme` says what the MAIN theme is (light/dark,
default light); alt tokens override the main tokens in the opposite mode.
A first visit follows prefers-color-scheme; an active choice made with
the toggle (in the nav) is remembered in localStorage and wins on the
next visit.

## `activeTokens`

Pure token selection for a mode: the main tokens, overridden group by
group with the alt tokens when the mode is the opposite of the main
theme's scheme. Without an alt theme the main tokens are returned
regardless of mode.

## `wordsVars`

The theme's «Long words» (`theme.words`, ADR-0034) as the CSS variables a text block's words read (base.css): kept whole, the standard, or hyphenated at the page's language and broken where a word still does not fit.
Both ways are written outright, so the draft's choice in the editor's theme style wins over a theme.css published with the other.

## `applyTokens › if (group === 'color'`

Base copy of the color tokens: the sections' role sets reference
these (--urd-base-\*) instead of the live --urd-color-\*, so a role
that swaps bg\<->text does not create a var() cycle (see SECTION\_THEMES).

## `const SAFE_CSS_VALUE`

Anchored allowlist for a CSS token value (a CodeQL-friendly barrier): only
characters that occur in colors/lengths/font stacks. The char class excludes
; { } \< > : @, and url()/comments/expression are rejected explicitly.
Invalid tokens are dropped from the CSS text buildThemeCss writes, so a logged-in publisher cannot inject arbitrary
CSS through the theme (buildThemeCss writes raw text, not via
style.setProperty which rejects silently; the inline tokens of the path without light-dark(), applyTokens, go through style.setProperty unchecked).

## `buildThemeCss`

Builds a static CSS string that sets the theme's tokens, every group, as
single values (the main theme), and the color tokens that differ by mode as
light-dark(light, dark) behind @supports, the single values standing as the fallback for older browsers. Materialized into content/theme.css
at publish time and loaded render-blocking, so the first paint has the
site's actual colors without FOUC. color-scheme follows the OS where a token
differs by mode, else it is locked to the main scheme; a manual
choice overrides via [data-urd-theme] (light-dark() picks its side from
the computed color-scheme). Pure function, reuses activeTokens.

## `buildThemeCss › if (!SAFE_CSS_NAME.test(group)`

A group's and a token's name become part of a property's name in the CSS text, so only letters, digits and dashes pass: anything else could end the rule and write others.

## `buildThemeCss › const hasDual`

Without a token that differs by mode (no dark variant, alt, or one that
changes nothing) the site is one theme: lock color-scheme
to the main scheme, no light-dark() and no [data-urd-theme] rules; the nav's toggle stands wherever alt has tokens (nav.js). With one, color-scheme
follows the OS and light-dark() carries both sets; a manual choice
overrides via [data-urd-theme].

## `buildThemeCss › const hasAccentText`

Text on accent surfaces in a theme with an accent and without an accent-text token: today's effective
value (the background colour) is written out so the section roles never
read an undefined base, and modern browsers let contrast-color() choose
black or white against the accent instead. An owner-set token is kept.

## `applyTheme › const doc`

Modern path: the CSS carries light-dark(). Inject the draft's/site's
tokens as a \<style> (so preview and live changes work), and let a
stored choice override the OS via data-urd-theme. No inline
--urd-color-\* (it would clobber light-dark()).

## `onlyColoursChanged`

Whether a site differs from the one before it in the theme's colours alone: its colour tokens, its dark variant's, its colour sets and its scheme, which the theme's CSS carries to the page by itself (urd.js draws nothing again for such a change, the theme alone).
The dark variant appearing or going is no such change: the nav's light and dark toggle and the privacy page follow it; nor is a site sent unchanged, which is sent to be drawn again.
Compared by a walk that stops at the first difference, so a site holding unpublished pictures is never written out as text.

## `resolveColor`

Resolves a color value from content to CSS. Simple names ('accent', 'bg')
are interpreted as theme tokens and become var(--urd-color-\<name>);
anything else ('#7c5cff', 'rgb(...)') is used raw.

## `const SECTION_THEMES`

Ready-made section themes (role sets): a role overrides the section's
color tokens. The values reference the BASE copies (--urd-base-\*, set by
the theme's CSS from buildThemeCss, or by applyTokens without light-dark()), not the live --urd-color-\*, so a role that swaps bg\<->text
(inverse) does not create a var() cycle, and light/dark follows along by
itself. The blocks inherit the overrides via resolveColor -> var(--urd-color-\*).

## `const SECTION_THEME_LABELS`

Display-name KEYS for the section-theme picker (Standard is "no role"):
 the ta lookup happens at the consumer; this module lives in the visitor
 closure and can never call ta() at module level.

## `applySectionTheme`

Applies (or resets) a section's role set on an element. Removes every
possible role key the role does not set and sets the ones it does, so switching role (or back to Standard) on an
incremental rerender never leaves the previous role's overrides behind.

## `inkOn`

A text colour that reads on a colour the owner picked: dark or light by the colour's brightness, or the theme's own pair for the accent, the text, the background or the surface.
Null when the colour cannot be measured (a colour-mix, a name), and the caller keeps its own.
