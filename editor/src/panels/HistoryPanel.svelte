<script>
  /* The History panel: what waits to be published («Not published yet», with «Discard drafts»), then the published commits and the revert of the last one. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import { ta, taApiError, adminLang as currentAdminLang } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import EmptyState from '../lib/rows/EmptyState.svelte';
  import ErrorLine from '../lib/rows/ErrorLine.svelte';
  import Fold from '../lib/rows/Fold.svelte';
  import SubHeading from '../lib/rows/SubHeading.svelte';
  import UnpublishedRows from '../lib/UnpublishedRows.svelte';
  const ed = getContext('urd-editor');
  const activePanel = $derived(ed.activePanel);
  const auth = $derived(ed.auth);
  const historyError = $derived(ed.historyError);
  const historyList = $derived(ed.historyList);
  const siteDraft = $derived(ed.siteDraft);
  const { askConfirm, loadHistory, refreshBaseSha, setStatus } = ed;

  let historyBusy = $state(false);

  // The history dates follow the admin language (Intl has all the
  // built-ins). A language-pack language can be a code Intl rejects: then
  // we fall back to the browser's own format instead of taking down the panel.
  const historyDate = (() => {
    const opts = { dateStyle: 'short', timeStyle: 'short' };
    try {
      return new Intl.DateTimeFormat(currentAdminLang(), opts);
    } catch {
      return new Intl.DateTimeFormat(undefined, opts);
    }
  })();

  async function revertLast() {
    const last = historyList?.[0];
    if (!last || historyBusy) return;
    const ok = await askConfirm({
      title: ta('confirm.revert.title'),
      lines: [
        `«${last.message}»`,
        ta('confirm.revert.body'),
        ...(ed.savedCount ? [ta(ed.savedCount === 1 ? 'confirm.discardSavedLine.one' : 'confirm.discardSavedLine', { n: ed.savedCount })] : []),
      ],
      okLabel: ta('confirm.revert.ok'),
      cancelLabel: ta('confirm.cancel'),
    });
    if (!ok) return;
    historyBusy = true;
    setStatus(ta('status.reverting'));
    try {
      const res = await fetch('/api/github/revert', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ expect: last.sha }),
      });
      if (res.ok) {
        const { sha } = await res.json().catch(() => ({}));
        if (sha) ed.baseSha = sha;
        else refreshBaseSha();
        ed.revertedSinceLoad = true;
        setStatus(ta('status.revertDone'), 'ok');
        awaitRevertDeploy();
      } else if (res.status === 409) {
        setStatus(ta('status.revertConflict'), 'error');
      } else {
        setStatus(taApiError(await res.json().catch(() => null)) ?? ta('status.revertFailed'), 'error');
      }
    } catch {
      setStatus(ta('status.publishLayerUnreachable'), 'error');
    }
    historyBusy = false;
    loadHistory();
  }

  /**
   * After a revert: poll the served content files until the deploy is
   * actually out, discard the drafts (the server is now the source of
   * truth) and reload the admin automatically - instead of asking the
   * owner to reload. If none of the files change within the deadline
   * (slow rollout, or a publish that only touched files we do not poll),
   * the current block and message are kept.
   */
  async function awaitRevertDeploy() {
    const paths = ['/content/site.json', ...siteDraft.pages.map((p) => `/${p.file}`)];
    const snap = async () => {
      const out = {};
      for (const path of paths) {
        try {
          out[path] = await (await fetch(path, { cache: 'no-store' })).text();
        } catch {
          out[path] = null;
        }
      }
      return out;
    };
    const before = await snap();
    for (let attempt = 0; attempt < 18; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      const now = await snap();
      if (paths.some((path) => now[path] !== null && before[path] !== null && now[path] !== before[path])) {
        setStatus(ta('status.revertDeployed'), 'ok');
        // The drafts describe the state from BEFORE the revert; the server
        // is the source of truth now. The saved drafts go with them (ADR-0032).
        await ed.discardSaved();
        for (const key of Object.keys(localStorage).filter((k) => k.startsWith('urd-draft-'))) {
          localStorage.removeItem(key);
        }
        await new Promise((resolve) => setTimeout(resolve, 800));
        location.reload();
        return;
      }
    }
    setStatus(ta('status.revertDeployTimeout'), 'error');
  }
</script>

<div class="panel-body">
  <!-- What a publish will write, above what has been published: the same rows as the Publish menu's, each leading to its change, and the discard as red words at the foot -->
  {#if ed.savedRows.length}
    <Fold id="unpublished" surface="history" title={ta('history.unpublished')} tip={ta('tip.history.unpublished')} value={String(ed.savedRows.length)} defaultOpen>
      <UnpublishedRows parts={ed.savedRows} steps={ed.steps.undo} publishedAt={ed.publishedAtOf} onpick={(part) => ed.goToUnpublished(part)}
        bands={ed.savedAvailable} onuse={(part) => ed.useSaved(part.part)} whenSaved={ed.whenSaved}
        later={ed.draftsLater} forced={ed.publishForced} ontick={ed.toggleLater} />
      <button type="button" class="ghost action discard-drafts" title={ta('tip.discard')} onclick={() => ed.askDiscard()}>{@html ICONS.restore}{ta('ui.discard')}</button>
    </Fold>
    <SubHeading text={ta('history.published')} />
  {/if}
  {#if historyList === null}
    <EmptyState text={ta('hint.history.loading')} />
  {:else}
    {#if historyError}
      <ErrorLine text={historyError} />
    {/if}
    {#if historyList.length > 0}
      <button class="ghost revert-last" onclick={revertLast}
        disabled={historyBusy || !auth?.allowed}
        title={auth?.allowed ? ta('tip.history.revert') : ta('tip.history.needsAccess')}>
        {@html ICONS.undo}{ta('ui.revertLast')}
      </button>
      {#each historyList as c, i (c.sha)}
        <div class="history-row" class:head={i === 0}>
          <span class="history-msg" title={c.sha}>{c.message}</span>
          <span class="history-meta">
            {c.author}{c.date ? ` · ${historyDate.format(new Date(c.date))}` : ''}
          </span>
        </div>
      {/each}
    {/if}
  {/if}
</div>

<style>
  /* Undoing a publish takes the live site back, so it stands in the panels' dark red */
  .panel-body .ghost.revert-last {
    gap: 0.45rem;
    border-color: #b23b3b;
    background: rgb(150 35 35 / 30%);
    color: #f2b8b3;
  }

  .panel-body .ghost.revert-last:hover:not(:disabled) {
    background: rgb(150 35 35 / 48%);
  }

  /* Discarding the drafts takes every unpublished change, so it stands under the rows in the panels' dark red, the revert's look */
  .panel-body .ghost.discard-drafts {
    margin-top: 0.3rem;
    gap: 0.4rem;
    border-color: #b23b3b;
    background: rgb(150 35 35 / 30%);
    color: #f2b8b3;
  }

  .panel-body .ghost.discard-drafts:hover:not(:disabled) {
    background: rgb(150 35 35 / 48%);
  }
</style>
