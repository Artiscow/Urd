# links-model.js

The full text of the longer comments in the engine's `links-model.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The site's links (site.links, from 0.7.0.52): the owner's own addresses
with an icon, registered once in the admin's Site panel and drawn by the
footer, the menu's tools and the links block. Pure and node-tested; the
DOM is built where each is drawn.

## `linkEntry`

One link, validated: an icon from the library or an own image, a label
and a safe address (http(s), mailto, tel, or a path or anchor of the site,
the block href's rule). Null when it cannot be drawn. The label falls back to
the icon's brand name, then to the address, so every link has an
accessible name.

## `blockLinks`

The links a links block draws: the site's (unless the block leaves them
all out with `useSite: false`, or some of them by id in `hidden`) followed
by the block's own, so an extra link that belongs to one block alone never
shuts the site's out.

## `linkIconHtml`

The link's picture as markup: the library's drawn SVG, or the own image
(a safe source, quoted for the attribute) with an empty alt, since the
link carries the name.

## `liftFooterSocial`

The site migration 4 -> 5: the footer's social links (footer.social, the
icon and the address) become the site's links with the icon's brand name
as the label, and the footer field is dropped. Pure: the file is cloned.
