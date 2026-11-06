<script>
  /* The site's redirects (content/redirects.json, ADR-0015), as a dialog over the admin opened from the Pages panel and Ctrl+K: each rule an old address, where it goes and its kind, permanent (301) or temporary (302).
     A rule that cannot do what it says stands in dark red, one that may not in amber, the reason in the field's tooltip (lib/redirects-model.js redirectIssues); an address typed that cannot be one stays in its field in dark red until it is fixed.
     Rules are added one at a time from the row at the foot, as a pasted list or from a CSV file, and the list leaves as a CSV file; each address field offers the site's places (PlaceField): the pages and the addresses the published site still knows for the old address, the pages and their named spots for the target. A native modal dialog (ADR-0011): Escape and a press on the backdrop close it. */
  import { rowMotion, fadingDialog, dialogOut } from '../lib/motion.svelte.js';
  import { getContext, tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import { HOST_LIMITS, REDIRECT_KINDS, normalizeFrom, normalizeTo, redirectIssues, hostLines, kindOf, parseList, rulesFromCsv, rulesToCsv, mergeRules } from '../lib/redirects-model.js';
  import { pageSpots } from '$engine/anchor-model.js';
  import PlaceField from './PlaceField.svelte';

  const ed = getContext('urd-editor');
  let dialogEl = $state(null);
  let closeEl = $state(null);
  let newFromEl = $state(null);
  let downOnBackdrop = false;

  /** Text typed into a rule's field that cannot be an address, by `<index>:<field>`: it stays in its field in dark red. */
  let typed = $state({});
  /** The new rule at the foot, written once both its addresses are sound. */
  let fresh = $state({ from: '', to: '', status: 301, error: null });
  /** The pasted list, while its box is open. */
  let pasting = $state(false);
  let pasted = $state('');

  /** Every page's named spots, read once the dialog opens: the targets a link can reach inside a page. */
  let spotsByPage = $state(null);

  const rules = $derived(ed.redirectRules);
  const pagePlaces = $derived((ed.siteDraft?.pages ?? []).map((p) => ({ group: ta('redirects.places.pages'), label: p.title || p.id, path: p.path })));
  /** The old address's list: the addresses the published site has that no page has now (a page renamed or deleted since), then the pages. */
  const fromPlaces = $derived.by(() => {
    const now = new Set((ed.siteDraft?.pages ?? []).map((p) => p.path));
    const former = (ed.site?.pages ?? []).filter((p) => p.path !== '/' && !now.has(p.path)).map((p) => ({ group: ta('redirects.places.former'), label: p.title || p.id, path: p.path }));
    return [...former, ...pagePlaces];
  });
  /** The target's list: the pages, then the named spots on them. */
  const toPlaces = $derived.by(() => {
    const spots = [];
    for (const page of ed.siteDraft?.pages ?? []) {
      for (const spot of spotsByPage?.[page.id] ?? []) {
        if (spot.name) spots.push({ group: ta('redirects.places.spots'), label: `${page.title || page.id} · ${spot.words || spot.name}`, path: `${page.path}#${spot.name}` });
      }
    }
    return [...pagePlaces, ...spots];
  });
  const issues = $derived(redirectIssues(rules, ed.siteDraft?.pages ?? []));
  const counts = $derived.by(() => {
    const lines = hostLines(rules);
    return { static: lines.static.length, dynamic: lines.dynamic.length };
  });

  $effect(() => {
    if (ed.redirectsOpen && dialogEl && !dialogEl.open) {
      dialogEl.showModal();
      closeEl?.focus();
    }
  });

  // The pages' spots, each page from its draft or its published file, the open one from the editor's own data.
  $effect(() => {
    if (!ed.redirectsOpen || spotsByPage !== null) return;
    let live = true;
    const pages = ed.siteDraft?.pages ?? [];
    const reads = pages.map((entry) => (entry.id === ed.pageId ? Promise.resolve($state.snapshot(ed.store?.data)) : ed.readPageDraft(entry).catch(() => null)));
    Promise.all(reads).then((read) => {
      if (live) spotsByPage = Object.fromEntries(pages.map((entry, i) => [entry.id, read[i] ? pageSpots(read[i]) : []]));
    });
    return () => {
      live = false;
    };
  });

  function onClosed() {
    typed = {};
    pasting = false;
    spotsByPage = null;
    ed.closeRedirects();
  }

  /** The words for what is wrong with a rule's field, or its own tooltip. */
  function issueText(issue) {
    return ta(`redirect.issue.${issue.key}`, { page: issue.page ?? '' });
  }

  /** A field of a rule written: the old address or the target as it normalises, kept in red where it cannot be one. */
  function setField(i, field, raw) {
    const value = field === 'from' ? normalizeFrom(raw) : normalizeTo(raw);
    const key = `${i}:${field}`;
    if (!value) {
      typed[key] = raw;
      return;
    }
    delete typed[key];
    if (value === rules[i]?.[field]) return;
    ed.mutateRedirects((list) => list.map((r, j) => (j === i ? { ...r, [field]: value } : r)));
  }

  function setKind(i, status) {
    if (kindOf(rules[i]?.status) === status) return;
    ed.mutateRedirects((list) => list.map((r, j) => (j === i ? { ...r, status } : r)));
  }

  function removeRule(i) {
    typed = {};
    ed.mutateRedirects((list) => list.filter((_, j) => j !== i));
  }

  /** The row at the foot: written once both addresses are sound, then emptied for the next. */
  async function addFresh() {
    const from = normalizeFrom(fresh.from);
    const to = normalizeTo(fresh.to);
    if (!fresh.from.trim() && !fresh.to.trim()) return;
    if (!from || !to) {
      fresh.error = !from ? 'from' : 'to';
      return;
    }
    ed.mutateRedirects((list) => mergeRules(list, [{ from, to, status: fresh.status }]).rules);
    fresh = { from: '', to: '', status: 301, error: null };
    await tick();
    newFromEl?.focus();
  }

  function onFreshKey(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFresh();
    }
  }

  /** Rules from a list or a file joined to the list in one undo step, with what came of it said in the status line. */
  function addMany({ rules: incoming, skipped }) {
    if (incoming.length) {
      const merged = mergeRules(rules, incoming);
      ed.mutateRedirects(() => merged.rules);
      ed.setStatus(ta('status.redirectsAdded', { added: merged.added, replaced: merged.replaced }) + (skipped ? ` ${ta('status.redirectsSkipped', { count: skipped })}` : ''));
    } else {
      ed.setStatus(ta('status.redirectsNone'), 'error');
    }
  }

  function addPasted() {
    addMany(parseList(pasted));
    pasted = '';
    pasting = false;
  }

  async function importCsv(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    addMany(rulesFromCsv(await file.text()));
  }

  /** The list as a CSV file, saved by the browser. */
  function exportCsv() {
    const url = URL.createObjectURL(new Blob([rulesToCsv(rules)], { type: 'text/csv;charset=utf-8' }));
    const link = Object.assign(document.createElement('a'), { href: url, download: 'redirects.csv' });
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
</script>

{#if ed.redirectsOpen}
  <dialog class="rd-overlay dx dx-large" bind:this={dialogEl} use:fadingDialog out:dialogOut|global aria-labelledby="rd-title" onclose={onClosed}
    onpointerdown={(e) => (downOnBackdrop = e.target === e.currentTarget)}
    onclick={(e) => downOnBackdrop && e.target === e.currentTarget && dialogEl.close()}>
    <div class="rd-card">
      <div class="rd-head">
        <span class="rd-ico" aria-hidden="true">{@html ICONS.redirect}</span>
        <h2 id="rd-title">{ta('ui.redirects')}</h2>
        <button type="button" class="rd-x" bind:this={closeEl} title={ta('tip.redirects.close')} aria-label={ta('tip.redirects.close')} onclick={() => dialogEl.close()}>{@html ICONS.cross}</button>
      </div>
      <div class="rd-tools">
        <button type="button" class="ghost rd-tool" class:on={pasting} aria-expanded={pasting} title={ta('tip.redirects.paste')} onclick={() => (pasting = !pasting)}>{@html ICONS.paste}<span>{ta('redirects.paste')}</span></button>
        <label class="ghost rd-tool filepick" title={ta('tip.redirects.importCsv')}>
          {@html ICONS.upload}<span>{ta('redirects.importCsv')}</span>
          <input type="file" accept=".csv,text/csv" onchange={importCsv} />
        </label>
        <button type="button" class="ghost rd-tool" disabled={!rules.length} title={ta('tip.redirects.exportCsv')} onclick={exportCsv}>{@html ICONS.download}<span>{ta('redirects.exportCsv')}</span></button>
        <span class="rd-count" class:over={counts.static > HOST_LIMITS.static || counts.dynamic > HOST_LIMITS.dynamic} title={ta('tip.redirects.count')}>
          {ta('redirects.count', { static: counts.static, staticMax: HOST_LIMITS.static.toLocaleString(), dynamic: counts.dynamic, dynamicMax: HOST_LIMITS.dynamic })}
        </span>
      </div>
      {#if pasting}
        <div class="rd-paste" transition:rowMotion>
          <textarea rows="4" bind:value={pasted} placeholder={ta('ph.redirects.paste')} aria-label={ta('redirects.paste')} title={ta('tip.redirects.paste')}></textarea>
          <span class="rd-paste-acts">
            <button type="button" class="ghost" title={ta('tip.redirects.closePaste')} onclick={() => { pasted = ''; pasting = false; }}>{ta('confirm.cancel')}</button>
            <button type="button" class="primary" disabled={!pasted.trim()} title={ta('tip.redirects.addPasted')} onclick={addPasted}>{ta('redirects.addPasted')}</button>
          </span>
        </div>
      {/if}
      <div class="rd-body panel-body">
        <div class="rd-grid" role="table" aria-label={ta('ui.redirects')}>
          <div class="rd-row rd-th" role="row">
            <span role="columnheader">{ta('redirects.col.from')}</span>
            <span aria-hidden="true"></span>
            <span role="columnheader">{ta('redirects.col.to')}</span>
            <span role="columnheader">{ta('redirects.col.kind')}</span>
            <span aria-hidden="true"></span>
          </div>
          {#each rules as rule, i (`${i}:${rule.from}`)}
            {@const issue = issues[i]}
            {@const fromBad = typed[`${i}:from`] !== undefined || (issue && issue.field === 'from' && issue.level === 'error')}
            {@const toBad = typed[`${i}:to`] !== undefined || (issue && issue.field === 'to' && issue.level === 'error')}
            <div class="rd-row" role="row">
              <PlaceField value={typed[`${i}:from`] ?? rule.from} places={fromPlaces} label={ta('redirects.col.from')}
                invalid={fromBad} warn={issue?.level === 'warn' && issue.field === 'from'}
                title={typed[`${i}:from`] !== undefined ? ta('redirect.issue.badFrom') : issue?.field === 'from' ? issueText(issue) : ta('tip.redirects.from')}
                onchange={(text) => setField(i, 'from', text)} onpick={(path) => setField(i, 'from', path)} />
              <span class="rd-arrow" aria-hidden="true">{@html ICONS.right}</span>
              <PlaceField value={typed[`${i}:to`] ?? rule.to} places={toPlaces} label={ta('redirects.col.to')}
                invalid={toBad} warn={issue?.level === 'warn' && issue.field === 'to'}
                title={typed[`${i}:to`] !== undefined ? ta('redirect.issue.badTo') : issue?.field === 'to' ? issueText(issue) : ta('tip.redirects.to')}
                onchange={(text) => setField(i, 'to', text)} onpick={(path) => setField(i, 'to', path)} />
              <span class="rd-kind" role="group" aria-label={ta('redirects.col.kind')}>
                {#each REDIRECT_KINDS as kind (kind)}
                  <button type="button" class:on={kindOf(rule.status) === kind} aria-pressed={kindOf(rule.status) === kind} title={ta(`tip.redirects.kind.${kind}`)} onclick={() => setKind(i, kind)}>{ta(`redirects.kind.${kind}`)}</button>
                {/each}
              </span>
              <button type="button" class="ghost row-tool rd-remove" title={ta('tip.redirects.remove')} aria-label={ta('tip.redirects.remove')} onclick={() => removeRule(i)}>{@html ICONS.cross}</button>
            </div>
          {/each}
          {#if !rules.length}
            <span class="rd-none">{ta('redirects.none')}</span>
          {/if}
          <!-- A new rule: written once both its addresses are sound (Enter, or leaving the row) -->
          <div class="rd-row rd-fresh" role="row">
            <PlaceField bind:inputEl={newFromEl} value={fresh.from} places={fromPlaces} placeholder={ta('ph.redirects.from')} label={ta('redirects.col.from')}
              invalid={fresh.error === 'from'} title={fresh.error === 'from' ? ta('redirect.issue.badFrom') : ta('tip.redirects.from')}
              oninput={(text) => { fresh.from = text; fresh.error = null; }} onkeydown={onFreshKey} onpick={(path) => { fresh.from = path; fresh.error = null; }} />
            <span class="rd-arrow" aria-hidden="true">{@html ICONS.right}</span>
            <PlaceField value={fresh.to} places={toPlaces} placeholder={ta('ph.redirects.to')} label={ta('redirects.col.to')}
              invalid={fresh.error === 'to'} title={fresh.error === 'to' ? ta('redirect.issue.badTo') : ta('tip.redirects.to')}
              oninput={(text) => { fresh.to = text; fresh.error = null; }} onkeydown={onFreshKey} onchange={addFresh}
              onpick={(path) => { fresh.to = path; fresh.error = null; addFresh(); }} />
            <span class="rd-kind" role="group" aria-label={ta('redirects.col.kind')}>
              {#each REDIRECT_KINDS as kind (kind)}
                <button type="button" class:on={fresh.status === kind} aria-pressed={fresh.status === kind} title={ta(`tip.redirects.kind.${kind}`)} onclick={() => (fresh.status = kind)}>{ta(`redirects.kind.${kind}`)}</button>
              {/each}
            </span>
            <button type="button" class="ghost row-tool rd-add" title={ta('tip.redirects.add')} aria-label={ta('tip.redirects.add')} onclick={addFresh}>{@html ICONS.plus}</button>
          </div>
        </div>
      </div>
    </div>
  </dialog>
{/if}

<style>
  .rd-overlay {
    position: fixed;
    inset: 0;
    box-sizing: border-box;
    width: 100vw;
    max-width: none;
    height: 100vh;
    max-height: none;
    margin: 0;
    padding: 1rem;
    color: var(--urd-color-text, #e8eaf0);
    font-family: var(--urd-font-body, system-ui, sans-serif);
    background: transparent;
    border: 0;
  }

  .rd-overlay[open] {
    display: grid;
    place-items: center;
  }

  .rd-overlay::backdrop {
    background: rgb(0 0 0 / 60%);
  }

  .rd-card {
    display: flex;
    flex-direction: column;
    width: min(860px, 100%);
    max-height: min(680px, 100%);
    overflow: hidden;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 14px;
    box-shadow: 0 30px 80px rgb(0 0 0 / 55%);
  }

  .rd-head {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 1rem 1.1rem 0.8rem;
    border-bottom: 1px solid rgb(255 255 255 / 8%);
  }

  .rd-head h2 {
    flex: 1;
    margin: 0;
    font-size: 1rem;
  }

  .rd-ico {
    display: inline-flex;
    opacity: 0.75;
  }

  .rd-x {
    display: grid;
    place-items: center;
    width: 1.9rem;
    height: 1.9rem;
    padding: 0;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 8px;
  }

  .rd-x:hover {
    background: rgb(255 255 255 / 7%);
  }

  .rd-tools {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
    padding: 0.75rem 1.1rem 0.25rem;
  }

  .rd-tool {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.84rem;
  }

  .rd-tool.on {
    border-color: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 60%, transparent);
  }

  /* The host's limits, counted in the lines publishing writes; amber past them */
  .rd-count {
    margin-left: auto;
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    opacity: 0.6;
  }

  .rd-count.over {
    color: #d9b44a;
    opacity: 1;
  }

  /* The pasted list on a faint surface of its own, its two buttons at its right */
  .rd-paste {
    display: grid;
    gap: 0.5rem;
    margin: 0.45rem 1.1rem 0;
    padding: 0.6rem;
    background: rgb(255 255 255 / 4%);
    border: 1px solid rgb(255 255 255 / 10%);
    border-radius: 9px;
  }

  .rd-paste textarea {
    box-sizing: border-box;
    width: 100%;
    min-height: 5.5rem;
    padding: 0.5rem 0.6rem;
    font-family: ui-monospace, monospace;
    font-size: 0.82rem;
    line-height: 1.5;
    color: inherit;
    resize: vertical;
    background: rgb(0 0 0 / 18%);
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 6px;
    outline: none;
  }

  .rd-paste textarea:focus {
    border-color: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 70%, transparent);
  }

  .rd-paste textarea::placeholder {
    opacity: 0.55;
  }

  .rd-paste-acts {
    display: flex;
    justify-content: flex-end;
    gap: 0.4rem;
  }

  .rd-body {
    min-height: 0;
    padding: 0.75rem 1.1rem 1.1rem;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .rd-grid {
    display: grid;
    gap: 0.35rem;
  }

  .rd-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 1rem minmax(0, 1.3fr) auto 1.9rem;
    gap: 0.4rem;
    align-items: center;
  }

  .rd-th {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.6;
  }

  .rd-arrow {
    display: grid;
    place-items: center;
    opacity: 0.5;
  }

  .rd-kind {
    display: inline-grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 7px;
  }

  .rd-kind button {
    height: 2rem;
    padding: 0 0.6rem;
    font: inherit;
    font-size: 0.78rem;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 0;
    border-radius: 0;
    opacity: 0.7;
  }

  .rd-kind button + button {
    border-left: 1px solid rgb(255 255 255 / 16%);
  }

  .rd-kind button.on {
    color: #fff;
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 70%, transparent);
    opacity: 1;
  }

  .rd-none {
    padding: 0.6rem 0.2rem;
    font-size: 0.85rem;
    opacity: 0.6;
  }

  .rd-fresh {
    padding-top: 0.45rem;
    margin-top: 0.2rem;
    border-top: 1px solid rgb(255 255 255 / 8%);
  }
</style>
