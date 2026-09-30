# Pictures from a shared folder

[Norsk (bokmål)](PHOTOS-nb.md)

The **Image gallery** background layer, in every one of its styles (floating
pictures, fill, rolling bands, mosaic and polaroids), can take its pictures
from a folder you share somewhere else, instead of from uploads. The site reads the folder every time the page is shown, so a picture
you add to the folder appears on the site by itself, and nothing is stored in
the site's own files.

## Why a shared folder rather than uploads

Uploading is the simplest way to put a picture on the site, and for a logo or
a single hero photo it is the right one. A shared folder pays off when the
pictures are many, change often, or come from more than one person:

- **The pictures update themselves.** Drop a photo in the folder and it is on
  the site the next time the page is shown, with no editing session and no
  publish. Remove it from the folder and it is gone.
- **Others can add pictures without touching the site.** Anyone you give
  access to the folder can fill it: the club's photographer, a colleague, a
  phone that backs up straight into the folder. Nobody needs the editor.
- **The site stays small.** An uploaded picture is stored in the site's own
  repository, and every upload stays in its history for good, even after the
  picture is deleted from the page. A folder source stores nothing there, so a
  site with hundreds of event photos does not grow with every one of them,
  and publishing stays quick.
- **Your archive stays where it is.** The folder is the original; the site
  only shows it. Reorganise, rename or move on to a new folder without
  touching the site's files.

Two things a shared folder is not:

- **It is not faster for the visitor.** An uploaded picture is compressed by
  the editor and served as a static file straight from the host's network,
  which is as fast as a picture gets. A folder picture is fetched through the
  site from the folder host the first time it is asked for and cached after
  that, so the first visit after the cache runs out is slower, not faster.
- **It is not private.** The folder has to be shared with anyone who has the
  link, and the pictures are shown to anyone who visits the page.

Four kinds of folder work:

| Folder | What you need |
|---|---|
| A Google Drive folder | An API key in Cloudflare (once) and a folder shared with anyone who has the link |
| A Google Photos album | A shared album link, nothing else |
| A Nextcloud or ownCloud share | The share link, and the host added in Cloudflare |
| Any other list | An address ending in `.json` that answers with a list of pictures, and its hosts added in Cloudflare |

The Cloudflare variables are set in the same place as the publishing
variables, and every change to them needs a new deploy. Both are described in
[the setup guide](../setup-publication/SETUP-en-GB.md) (the variables are
items 10 and 11 there).

## Google Drive

This is the folder kind that needs a key, because Google only lists a folder
for a caller that identifies itself. The key never reaches the browser: the
site's own function on the server uses it, and the visitor's page only ever
sees pictures served by the site.

1. **Share the folder.** In Google Drive, right-click the folder, choose
   *Share*, and under *General access* pick *Anyone with the link* as
   *Viewer*. Copy the link. Only pictures directly in the folder are shown;
   subfolders are not read.
2. **Create an API key.** Go to [console.cloud.google.com](https://console.cloud.google.com),
   sign in and create a project (or pick one you already have). Then:
   - *APIs & Services* → *Library*: search for *Google Drive API* and enable it.
   - *APIs & Services* → *Credentials* → *Create credentials* → *API key*.
     Copy the key.
   - Recommended: edit the key, and under *API restrictions* choose
     *Restrict key* and tick only *Google Drive API*. Leave *Application
     restrictions* on *None*: the calls come from Cloudflare's servers, not
     from a browser, so a referrer restriction would block them.

   A key of this kind can only read what is shared publicly. It cannot see
   your private files, which is exactly the point.
3. **Put the key in Cloudflare.** In the Pages project: *Settings* →
   *Environment variables* → *Add*. Type **Secret**, name `DRIVE_API_KEY`,
   value the key. Then deploy again (an empty commit is enough, see the setup
   guide).
4. **Paste the link in the editor.** Select the section, open *Background*,
   and in the layer set *Pictures from* to *Shared folder*. Paste the folder
   link in *Folder address*, choose the *Order* and set *Take up to*, then
   press *Check the folder*. The bare folder id from the address bar works too.

## Google Photos

1. Open the album in Google Photos, press *Share* and create a link.
2. Paste the link as the *Folder address*. Both the long link
   (`photos.google.com/share/...`) and the short one (`photos.app.goo.gl/...`)
   work; the long one is the safest to keep, since Google has said short links
   may stop working in time.

No key is needed. The album has to be shared with a link; an album shared only
with named people cannot be read.

## Nextcloud or ownCloud

1. In Nextcloud, open the folder's sharing panel and create a *Share link*.
   The link looks like `https://sky.example.org/s/AbCdEfGh1234`. A share
   with a password cannot be read, since the site reads it anonymously.
2. In Cloudflare, add the host to the variable `PHOTO_HOSTS` (type Text):
   `sky.example.org`. Several hosts are separated by commas. Deploy again.
3. Paste the share link as the *Folder address*.

## Any other list

For a service the three kinds above do not cover, the site can read a list
you host yourself: an https address ending in `.json` that answers with

```json
{ "photos": [
  { "src": "https://bilder.example.org/sommer/01.jpg", "name": "Opening day" },
  { "src": "https://bilder.example.org/sommer/02.jpg" }
] }
```

A plain list of addresses works too. Every host in play, the list's own and
the pictures', must be in `PHOTO_HOSTS`, or the pictures are left out.

## What the messages mean

*Check the folder* reads the folder the same way the page does and tells you
what it found.

| Message | What to do |
|---|---|
| Urd does not recognise that folder address | The link is not one of the four kinds. Copy the sharing link again from the service itself. |
| Google Drive is not set up: DRIVE_API_KEY is missing | Add the variable in Cloudflare and deploy again. |
| The shared folder answered 403 or 404 | The folder is not shared with anyone who has the link, or the key is not allowed to use the Drive API. |
| The picture host «…» is not allowed | Add the host to `PHOTO_HOSTS` and deploy again. |
| The folder holds no pictures | Only pictures directly in the folder count; subfolders are not read. |
| Could not read the shared folder | On a site run locally, without Cloudflare, the folder cannot be read at all; the layer shows example pictures instead. On the deployed site, the folder host did not answer. |

## Good to know

- **Everything in the folder is public.** Put only pictures in it that may be
  shown to anyone.
- **The site fetches the pictures itself**, through its own address, never
  straight from Google or Nextcloud. That is why no key reaches the browser and
  why the site's security rules need no change.
- **The size follows the use.** A small floating frame asks for a small
  picture, a full-width background for a large one, so a phone never downloads
  more than it shows.
- **New pictures show within about ten minutes.** The list is kept for a
  short while so a busy page does not read the folder on every visit. A
  picture that is replaced under the same name can take up to a day to change.
- **Which pictures are shown** is the *Order*: *By name* takes the first
  ones sorted by file name, *Newest first* the most recently changed, and
  *Random* draws a fresh set on every visit. *Take up to* (1-60) sets how
  many are shown; the draw and the cut are made from the first 200 pictures
  in the folder.
- **While the site runs locally** (development, without Cloudflare) the layer
  shows drawn example pictures in the editor, so the layout can be set up all
  the same.
