# backgrounds/video.js

The full text of the longer comments in the engine's `backgrounds/video.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Background layer: video (feature map C6). Self-hosted mp4/webm loop from
media/ (or a data URL for unpublished uploads in a draft; publishing
materializes it into a file, the same flow as the image layer).
Privacy-friendly: the file is git-owned, no third-party hosts.

Playback: autoplay requires muted + playsinline; the loop is paused outside
the viewport via a shared IntersectionObserver (logic, not animation,
ADR-0011). With prefers-reduced-motion video never plays: the poster is
shown as a still image, and without a poster the layer is left out so the
layers below show through - always an end state, never hidden content.

## `const SAFE_VIDEO_RE`

The source goes straight into the video element's src: the same anchored guard
pattern as the image layers (isSafeImage), limited to media/ paths and video data URLs.

## `videoLayer › render › video.preload`

The observer starts playback (never the autoplay attribute), and with
preload=metadata the film itself is loaded only when the section approaches
the viewport - a video below the fold otherwise costs the whole file on load.
