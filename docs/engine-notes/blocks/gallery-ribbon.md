# blocks/gallery-ribbon.js

The full text of the longer comments in the engine's `blocks/gallery-ribbon.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The gallery block's ribbon view, loaded with the view (`loadRibbonView` in blocks/gallery.js) where a gallery draws the ribbon on either screen, with the ribbon block's band code (blocks/ribbon.js), its model and its sheet; a gallery in another view loads none of them.

## `renderRibbon`

The ribbon view: the tiles roll past in a band, one row or two running against each other. The band fills the block's box (ADR-0025 decision 2), the rows share its height, and a tile is as tall as its row with the image at its own aspect (gallery.css), so the owner sets the height by the frame.
The motion is the ribbon block's (ribbon-model.js and the .urd-ribbon rules in base.css): each row's track holds the tiles in two periods, each as wide as the band needs (syncTrackCopies), and is translated by half its width, so the loop has no seam. It stands still under reduced motion and while the editing chrome is on, and while the pointer or the keyboard holds it, so a tile can be clicked into the lightbox.
The tiles come from the gallery's own factory (`makeTile`), so each carries its load guard and its click into the lightbox.
