# meeting-links.js

The full text of the longer comments in the engine's `meeting-links.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Which address leads to a video meeting: the services known by their host, and the hosts a site adds for a server of its own (`site.meetingHosts`, for Jitsi, Nextcloud Talk, BigBlueButton and the like, which have no host in common).
A host is always compared exactly, or as a subdomain of a listed host, never by a substring.
Pure and DOM-free; ics.js builds on it, and the editor bundles it for the list a site stores.

## `meetingHostList`

A site's own meeting hosts as a clean list: each entry a host name («meet.example.org»), read from a host or a whole address, in lower case, without repeats.
Anything that is not a host with a dot in it is left out.
