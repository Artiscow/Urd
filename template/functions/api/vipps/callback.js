/**
 * Vipps-callback (ADR-0020): kvitterer mottak av betalingsoppdateringer.
 * Siden er statisk og har ingen ordredatabase; ordrene leses i
 * Vipps-portalen, så callbacken lagrer ingenting.
 */
export async function onRequestPost() {
  return new Response(null, { status: 200 });
}
