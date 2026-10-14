<script>
  /* The History panel: the published commits and the revert of the last one. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import { ta, taApiError, adminLang as currentAdminLang } from '$engine/i18n.js';
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
        // is the source of truth now.
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
  {#if historyList === null}
    <p class="panel-hint">{ta('hint.history.loading')}</p>
  {:else}
    {#if historyError}
      <p class="panel-hint">{historyError}</p>
    {/if}
    {#if historyList.length > 0}
      <button class="ghost" onclick={revertLast}
        disabled={historyBusy || !auth?.allowed}
        title={auth?.allowed ? ta('tip.history.revert') : ta('tip.history.needsAccess')}>
        {ta('ui.revertLast')}
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
