# calendar-designs.js

The full text of the longer comments in the engine's `calendar-designs.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The calendar block's designs: the pure model behind the Design picker and the Style tab in the Properties panel, and the renderer's look-up.
A design is a look on top of a data view (list, cards, month, agenda or next): it names the colour slots the owner can override, the static texts the owner can rewrite in the preview, and whether its boxes carry an edge stripe.
The owner's choices are additive props on the block (`design`, `colors`, `stripe`, `texts`, `fieldStyle`, `showSignup`, `showMore`, `programHref`, `showOpen`, `options`); a block without them renders the plain design on the theme's colours.
The module is bundled by the editor and loaded by the block on its first render (with ics.js, outside the visitor closure), so it never touches the DOM and never calls ta().

A design is five things, added together: an entry in CAL\_DESIGNS below (its view, the colour slots by section with the plain colours first, the static texts, the stripe and the flags); a renderer exported under the design's id from its blocks/calendar-\<module>.js; its rules in its family's sheet (blocks/calendar-\<module>.css) or, where families share them, calendar.css, under its own class names, that read every slot as `--urd-cal-s-<slot>` with the design's own default; a drawing in calendar-thumb.js; a picture under template/admin/designs/\<id>.webp made by scripts/design-pictures.mjs for the design picker; and the label, slot and section keys in the nb, en-GB and tr admin dictionaries. tests/calendar-designs.test.mjs holds the entries, the renderers, the drawings and the keys against each other; tests/stylesheets.test.mjs holds each family's sheet to its own designs, and the looks are checked by eye.

## `const CAL_TEXTS`

Every word a design draws that is not calendar data, with the site dictionary key it falls back to: the labels and buttons, the words of an event's time and its countdown, the words the block draws around the design, and the texts with a number in them («In {n} days», «{n} events»).
The owner rewrites them by clicking them in the preview; the block stores the HTML under the text's key in `props.texts`, a text with plural forms under the form shown («count.other»), with its numbers kept as `{n}`.
A text with plural forms names its dictionary key without the form (`calendar.count` for `calendar.count.one` and `calendar.count.other`).
`null` marks a text that has no words of its own: the owner writes it, and the editor shows a hint in its place until then (CAL\_HINT\_TEXTS).

## `const CAL_CONTENT_TEXTS`

The texts that are content a design ships with rather than words for a thing every calendar has (an announcement, the empty state's pill, the regular event's labels, the period line of the receipt, the seventies poster and Art deco, and the receipt's venue, admission and thanks).
The owner can remove such a line by emptying it in the preview: it is stored as `false`, never drawn for a visitor, and stands as a faint hint in the editor.

## `const CAL_FAMILIES`

The design families the picker groups by (`family` in the list), in the picker's order; the label key is `calendar.family.<id>`.
The stylised families (fairy tale, future, graphic styles, nature, objects) join the list after retro as they are built.

## `calThemeKey`

A design's own theme words (`theme` in the list): the texts the design has words of its own for («Departures» for «Coming up»), each under the dictionary key `calendar.theme.<design>.<text>` (with the plural forms after it, as the common key has them).
The block draws the theme word in the site's own language, else the common word in that language, else the bokmål theme word (themeString in i18n.js), and the owner's rewrite stands over both.
«Word choice: neutral» (the shared option `wordChoice`) swaps every theme word for the common one.

## `calRewrites`

True when a design that rewrites calendar data (`rewrites` in the list: a date as 04.10, a title in capitals in the text itself, a place cut to the row's width, a sentence built around the time and place) may do so: the shared option `rewrite`, on unless the owner switched it off.
Off, the design shows the calendar's own text; a design without `rewrites` never rewrites and reads true.

## `const CAL_PHONE_MODES`

How a design behaves on a phone (`phone` in the list): `fits` reads as it is, `flows` lays its columns under each other in the calendar's sheets, and `switch` cannot be read there and draws a phone design instead (calPhoneView).

## `const CAL_PHONE_DESIGNS`

The phone designs of their own: the lists a block can draw on a phone besides the designs themselves, each in the picker under its family.
`agenda` is the neutral stacked list the block draws itself in its own set (renderPhoneAgenda); the others are renderers of their own a design lends, exported under their id from the module named (blocks/calendar-\<module>.js) and drawn in the set of the design they belong to (`home`). None of them scrolls sideways.
`family` groups them in the picker (the label key `calendar.family.<id>`, the neutral family first); `ownSubscribe` marks one that places the subscribe buttons itself. The label key is `calendar.phone.<id>`, its description `calendar.phone.<id>.about`, the picker's picture admin/designs/phone-\<id>.webp.

## `const PHONE_ANY_VIEWS`

The views a design can stand on and still be drawn on a phone by a block of another view: the ones that list what is coming; a design of a span view (week, month, day, year) needs the block's own window and joins only a block of the same view.

## `calPhoneCandidates`

The phone designs a block can choose from: the neutral list, every design that reads on a phone and fits the block's view (the block's own design among them, under its own name), and the phone designs designs lend; by family afterwards (calPhoneFamilies).
A design that cannot be read on a phone (`phone: 'switch'`) is never among them, so no phone design scrolls sideways.

## `byFamily`

A list of designs by family, in the picker's order: the neutral ones first, the cards several designs share next, then the families as the design picker has them.

## `calPhoneView`

The phone design a block draws on a phone: the owner's choice (`phoneView`) when it is one of the block's candidates, else the design's own default (`phoneDefault`), else the design itself when it reads on a phone and the neutral list when it cannot.
The legacy values read as the design itself: `phoneView: 'self'` and the switch `phoneDesign: false` (a design that cannot be read on a phone then takes its default, since no phone design scrolls sideways).

## `const CAL_CARD_DESIGNS`

The card designs of their own: `neutral` is the plain card of the calendar's own set, in its own colours and without a design's dress; the others are decorators a design lends, exported under `cards` by the module named, run on the card in the set of the design they belong to (`home`).
The label key is `calendar.cardDesign.<id>`, its description `calendar.cardDesign.<id>.about`, the picker's picture admin/designs/card-\<id>.webp.

## `setCards`

The cards of the designs that have no card of their own yet, by colour set: a set that two or more of them share gives one card, named for the set (`set-<set>`, family `sets`); a design alone in its set without a card of its own gives its own entry, which is its set's card.
A design gets a card of its own (`ownCard` in the list) in its design round, and then leaves its set's card.

## `calCardCandidates`

The card designs a block can choose from: the neutral card, the cards several designs share (one per colour set), every design's own card (the block's own design among them under its own name), and the card designs designs lend; by family afterwards (calCardFamilies).
A design with a card of its own carries its module, whose `cards` may dress the card further.

## `calCardDesign`

The card design a block's card wears: the owner's choice (`card`) when it is one in the list, else the design's own default (`cardDefault`), else the design's own card, or its set's card while it has none of its own.
A stored design id whose design shares its set's card reads as that set's card.

## `calCardDress`

How the card wears its design: the set it is drawn in, the card classes (`urd-cal-dlg-<design>` for the design whose card it is, and the lent card's own), and whether the owner's colours on the calendar reach it (only when the card is the calendar's own design's, its set's, or the neutral one).

## `const CAL_DESIGNS`

The designs, in the order the picker lists them.
`view: null` follows the block's own view (the plain design draws every view); a design with a view of its own fixes it, and the editor writes that view into the block so an engine without the design still draws the right data.
`module` names the renderer file the block loads for the design (blocks/calendar-\<module>.js, exporting a function under the design's id); the plain design's views live in the block itself.
`ownSubscribe` marks a design that places the subscribe buttons inside its own layout, so the block draws no row under it, `ownFilter` one that draws its own calendar switches instead of the chip row, and `notice` one that can show the announcement note (`props.notice { show, href, as }` with the texts noticeLabel, noticeTitle and noticeText; `noticeBand` marks a design that can draw it as an alert band instead, `as: 'band'`).
`empty: 'ap'` gives the design ApeironLF's empty state (a pill, a dashed box and the subscribe button) in place of the plain one.
`program` marks a design that draws a link to the whole programme when the block has an address for it (`props.programHref`), and `open` one that writes «Open to everyone» on an event without a sign-up (`props.showOpen`).
`theme` lists the texts a design has words of its own for (calThemeKey), and `rewrites` marks a design that rewrites calendar data unless the owner switches it off (calRewrites).
`phoneDefault` names the phone design the block draws on a phone until the owner picks another (CAL\_PHONE\_DESIGNS, calPhoneView), and `cardDefault` the card design its card wears until the owner picks another (CAL\_CARD\_DESIGNS, calCardDesign; the module exports a decorator per card design it lends under `cards`).
`limit` is the number of events a new calendar in the design starts with, and the count it takes when it is chosen while the calendar keeps the count it started with (else six, eight in the agenda).
`ownCard` marks a design whose card has a look of its own from its design round (`urd-cal-dlg-<id>` in calendar.css or its family's sheet, and a decorator under the module's `cards` where the look needs parts of its own); a design without shares its set's card (calCardCandidates).

## `const choice`

The settings that belong to one design each, stored together under the block's `options`.
A `choice` holds one of its values, a `switch` true or false, an `hour` a whole hour from 0 to 24 or nothing (the design then finds the span itself).
`def` is what a block without the option draws.
The label key is `calendar.opt.<key>`, a choice's values `calendar.opt.<key>.<value>`.
`when` names the values of the design's other options the option needs to matter, so the editor shows it only then (calOptionShown).

## `const CAL_SHARED_OPTIONS`

The options every design with the trait has, stored under `options` like the design's own and listed after them (calOptionDefs): the word choice on a design with theme words (`theme`), and the rewriting switch on a design that rewrites calendar data (`rewrites`).

## `const CAL_SETS`

The colour sets: every design belongs to one, and the event card, the switcher's week and month, the finding tools and the phone view are drawn per set in the calendar's sheets (`urd-cal-set-<id>` on the block, ADR-0011).
A design overrides its set by redefining a set variable under its own class (`urd-cal-d-<id>` on the block, `urd-cal-dlg-<id>` on the card).

## `calSwitcherViews`

The designs behind the switcher's Week and Month buttons: the owner's choice (`switcherViews`) when it is one of the designs a button can hold, else the one matching the block's set (the ApeironLF month on the Ap sets, the plain month elsewhere, the week strip for the week).

## `calDescription`

Where the description is drawn: in the event's own row (`rows`) or only in the card that opens at a press (`card`).
Only a design with room in its rows (`excerpt`) draws it there; the legacy per-design option `description: false` reads as `card`.

## `calOptions`

The design's options as the block draws them: every option of the design with the owner's value when it is valid, else the default.
Options that belong to another design are left out.

## `calSwitcher`

True when the block shows the view switcher: the owner has switched it on (`switcher: true`) and the block's view is one that lists what is coming.
The switcher lets a visitor turn the block to the week or the month and back, without changing what is stored.

## `calFolds`

True when the block folds the events beyond its max count under «Show all»: a list view (the plain list and the list designs) with the fold left on (`showMore`, on unless switched off).
The regular-event design lists one event's dates and folds them itself.

## `calProgramHref`

The address of the whole programme, for a design that links to it (`program`): a page of the site, an anchor or a full address, through the shared safe-URL gate.
Null when the block has none, the design draws no such link, or the value is not an address.

## `calNoticeLink`

The link the announcement goes to (`props.notice`, one link: a page, a spot on it, or an address through the shared safe-URL gate, with a new tab and rel words), resolved by resolveLink, or null when it has none or it goes nowhere.

## `calSlotVars`

The CSS variables for the owner's colour overrides: `--urd-cal-s-<slot>` for every slot of the design that holds a valid colour.
The base style reads each slot with the theme's colour as the fallback, so an unset slot follows the theme.

## `calStripe`

The edge stripe on the design's boxes: on or off (the owner's choice, else the design's own), and the stripe's colour as CSS when the owner set one.
Without a colour the stripe takes the event's calendar colour, else the accent.

## `calFieldCss`

Inline style for one event field from the owner's settings: font (a stack from the font list or a plain family name), size in px, bold, italic, underline and colour.
Only the set and valid parts are written, so the design's own styling stays for the rest.

## `calTextValue`

The owner's words for a text: their HTML, `false` for a content line the owner removed (CAL\_CONTENT\_TEXTS), or null when the dictionary's words apply.
A text with plural forms is read from its form's slot first, then from the key alone, where its words stood before the text had forms.

## `calSplitTokens`

A text cut at its placeholders: the plain stretches as strings and each placeholder of `names` as `{name}`.
A placeholder that is not among the names stays part of the text.

## `calHasTextOverrides`

True when the owner has rewritten or removed at least one of the design's texts.
The words of a text without words of its own (the announcement's title and text) are the owner's content, not a rewrite, and never count.

## `calResetTexts`

The texts after «Reset the texts»: the default words everywhere, keeping only the owner's own words in the texts that have none (an announcement is never deleted by a reset); undefined when nothing is kept.
