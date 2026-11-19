# ADR-0035: Shapes

Date: 19 November 2026
Status: Accepted. Chosen in the design pass of BACKLOG 0.7.13.14 on 19 November 2026, from three sketches of a shape gallery and four ways to shape by hand. The first user is the «Back to top» button.

## Context

The «Back to top» button had three outlines of its own (a circle, a rounded square and a ring) and one slider that turned the edge into waves. More shapes were wanted, and ways to shape the button by hand.

The field offers shapes two ways. A large design system ships 35 fixed shapes for its buttons. CSS has corner shapes of its own (`corner-shape`: squircle, bevel, notch), in one browser engine only on 19 November 2026 ([docs/comparison/CODE.md](../comparison/CODE.md)). Neither lets an owner make a shape, and the second cannot be relied on ([ADR-0011](0011-native-css-first-components.md)).

An outline that Urd draws itself, as one SVG path, is the same in every browser, and anything cut to a shape (a picture filling a button) can take the same path as its mask.

## Decisions

1. **A shape is a piece of its own, not the button's.** The engine has one shape model (`shape-model.js`) that knows nothing of what is shaped. The «Back to top» button is its first user (`site.layout.toTop.shape`); a picture, an icon's background or a button can take the same shape later through the same model and the same window.

2. **A shape is one outline in a 100 by 100 box, drawn by Urd.** It is an SVG path wherever it is shown, and the same path is the mask of what is cut to it. No shape depends on a CSS feature that a browser may lack.

3. **A shape is stored one of two ways: its values, or its points.** The values are a round outline or a polygon, with its corners, bulge, turn and stretch, an edge of waves, a point drawn out of one side and a wobble; each is stored only where it differs from the circle. The points are a shape drawn by hand, each point with a corner of its own. A shape with points is drawn from them.

4. **The shipped shapes are sets of values.** A shape Urd ships is a name for a set of the values, so picking one fills the sliders and every shipped shape can be changed. They are picked in the shape window beside the sliders, drawn live from their values, with no picture files.

5. **Shaping by values and drawing by hand are apart.** The shape window has two views. The first holds the shipped shapes and the values' sliders on one screen. «Shape manually» hands the shape over to the second as points, where they are dragged and each corner is set. The handover goes one way: a drawn shape keeps the values it came from beside its points, and taking the drawing away returns to them.

6. **The mark on a shape stands at the shape's own middle.** The middle is the outline's, by its area, so a mark sits lower on a shape with a point at the top. The owner can drag the mark to a place of its own, stored with the shape.

7. **A value's range follows the shape.** Waves end earlier on a polygon of few sides, and a point on deep waves, so the sliders stop before an outline folds over itself.

8. **A site without a shape is drawn as before.** The field is additive. The button's own outlines, with the waves of `waves` and `count`, stand exactly as they were until a shape is written, which then replaces them.

## Consequences

- The shape model is in the visitor's static import closure, as the button is on every page.
- A second user of shapes needs only a `shape` field of its own and a row that opens the window; the model, the window and the masks are shared.
- The shipped shapes are a deviation from the design picker rule (a choice of a look with a picture file and a description for each design): they are drawn from their values where they are picked, so that they can stand beside the sliders that change them.
- The window shows the button's standard arrow as the mark, whatever mark the owner has chosen.
