/**
 * Where the Phone panel's «Blocks in their order» stands (Urd settings «Phone panel»), the first the default: in a column of its own at the stage's right edge, the panel's settings in the panel; first in the panel, above its settings; or in a fold of the panel, under its settings.
 * Pure, node-tested through the admin designs (tests/admin-designs.test.mjs).
 */
export const PHONE_PANEL_LAYOUTS = ['dock', 'top', 'fold'];

/**
 * How the column at the stage's right edge is drawn (Urd settings «Column look», under «Phone panel» while the order stands on the right), the first the default: a table, each section's heading a band from edge to edge with a hairline between two of them and its rows lines; flat, the headings and the rows plain lines with one hairline between sections; or boxes, a framed box for each heading and a filled one for each row.
 */
export const PHONE_COLUMN_LOOKS = ['table', 'flat', 'boxes'];
