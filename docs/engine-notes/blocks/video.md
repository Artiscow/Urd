# blocks/video.js

The full text of the longer comments in the engine's `blocks/video.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: video. Two sources. `embed` (the default): paste a YouTube or
Vimeo link and a privacy-friendly embed is rendered (youtube-nocookie /
dnt=1) behind a cover until the visitor presses it (embed-cover.js), with
the owner's own image (`poster`) on the cover; the CSP in \_headers has a
deliberate frame-src exception for exactly these two hosts, and other
embeds need a plugin and the owner's own CSP choice. `file`: a self-hosted mp4 or webm from media/ in a native
\<video> with the browser's own controls, an optional poster, loop and
muted. It starts by itself only when it is muted, which is the one case
browsers allow, and never under reduced motion. A film can lie under an
overlay in a colour (`overlay`), as a picture can (picture.js).


## `videoPlayback`

How a file video plays, from the props: looping and muted as chosen, and
starting by itself only when it is muted and the visitor has not asked for
reduced motion. Pure.

## `videoBlock › render`

The `props` parameter:
askFirst: false loads an embed with the page instead of behind its cover (additive from 0.7.29.4)
aspect: one of VIDEO\_ASPECTS (push-model.js), the shape the video is drawn at, its height following its width; playOnPress: false keeps a pressed embed from starting by itself;
coverStyle: the cover picture's focus, zoom, adjustments and overlay from the image editor (coverImageStyle in embed-cover.js);
overlay: a colour over an uploaded film at a strength of 0..1, the shape a picture's overlay has (pictureStyle)

## `videoBlock › render › const makeFrame`

The player behind its cover: nothing reaches the provider before the visitor presses (or has let it load at once). The pressed one starts as it loads, unless the owner chose otherwise; one that loads at once never does.
