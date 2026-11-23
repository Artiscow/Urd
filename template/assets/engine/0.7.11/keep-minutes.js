/**
 * How long the engine keeps what it fetches ahead in a visitor's browser, in minutes.
 * The modules that keep it read these numbers, and the privacy page names them from here too (privacy-model.js), so its minutes are the code's; a module of its own, so the boot loads no more than it for them.
 */

/** How long a page fetched ahead of a press on its link is kept (prefetch.js). */
export const PREFETCH_MINUTES = 5;

/** How long a calendar block keeps a feed's events before it fetches them again (blocks/calendar-load.js). */
export const CALENDAR_FEED_MINUTES = 10;
