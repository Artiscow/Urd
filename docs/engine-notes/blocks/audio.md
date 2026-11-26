# blocks/audio.js

The full text of the longer comments in the engine's `blocks/audio.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: audio. Native `<audio controls>` with a git-owned file from
media/ (the CSP's default-src 'self' covers playback; no third party, no
tracking). Optional title above the player; preload="metadata" so only the
duration is fetched before playback.
