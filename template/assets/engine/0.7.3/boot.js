/**
 * Startup for the visitor page. A separate file (not inline in index.html)
 * so Content-Security-Policy can require script-src 'self' with no exceptions.
 */
import { boot } from './urd.js';

// The shell loads this module render-blocking, so the engine's page
// transition listener is in place before the arriving document's first
// rendering opportunity (the arrival hold in urd.js).
boot({
  root: document.getElementById('urd-root'),
  nav: document.getElementById('urd-nav'),
});
