# blocks/faq.js

The full text of the longer comments in the engine's `blocks/faq.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: FAQ accordion. Built on the native \<details name> element: the
answer unfolds on a click on the question row (summary), the browser owns the
open/closed state and the keyboard and screen reader semantics, and `name`
gives exclusive unfolding (one open answer at a time) without JS. Find-in-page
opens a match automatically. Soft unfolding via ::details-content where the
browser supports it (faq.css, behind @supports); otherwise the answer unfolds
instantly.

For visitors a click anywhere on the summary row opens it. In the editor the
texts are directly editable, so there a click on the question text places the
caret; only the arrow icon unfolds.

Open and closed answers are view state, never content: the editor fits the
block's frame to the collapsed height (the fit leaves open details out,
render.js), and an unfolded answer grows the display only, the push pass
moving the blocks below (ADR-0024, ADR-0025).

## `groupName`

The group name for the FAQ elements (pure, node-testable). Without `multi` all
the questions in the block share one name, which gives native exclusive
unfolding (one open answer at a time); with `multi` the name is empty so
several can stay open. The name is bound to the block id so two FAQ blocks on
the same page do not switch each other off.

## `faqBlock › render › forEach › chevron.addEventListener('pointerdown')`

Without the stop, pointerdown would bubble to the block's drag and
selection listeners. Only bubbling is stopped, not the default action,
so the native toggle (click) still fires.

## `faqBlock › render › Promise.all([import('../hint.js'),`

The help chip (ADR-0008): the block has special functions and explains itself.
adminLocaleReady: the first render can happen before boot has loaded the dictionary.
