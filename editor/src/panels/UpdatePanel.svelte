<script>
  /* The Update panel: the engine version against the template's tag, the changes an update brings, and the update itself. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import { ta, taApiError } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  const ed = getContext('urd-editor');
  const activePanel = $derived(ed.activePanel);
  const auth = $derived(ed.auth);
  const updateError = $derived(ed.updateError);
  const updateInfo = $derived(ed.updateInfo);
  const { askConfirm, loadUpdateCheck, setStatus } = ed;

  function toggleUpdateSkip(path) {
    const next = new Set(ed.updateSkip);
    if (next.has(path)) next.delete(path);
    else next.add(path);
    ed.updateSkip = next;
  }

  async function runUpdate() {
    if (!updateInfo || updateInfo.upToDate || ed.updateBusy) return;
    const skipped = [...ed.updateSkip];
    const applied = updateInfo.changes.filter((c) => !ed.updateSkip.has(c.path));
    const editedAtom = applied.filter((c) => c.atom && c.conflict);
    const ok = await askConfirm({
      title: ta('confirm.update.title'),
      lines: [
        ta('confirm.update.body', {
          target: updateInfo.target,
          writes: applied.filter((c) => c.action === 'write').length,
          deletes: applied.filter((c) => c.action === 'delete').length,
        }),
        ...(editedAtom.length > 0
          ? [ta('confirm.update.warnEdited', { paths: editedAtom.map((c) => c.path).join(', ') })]
          : []),
      ],
      okLabel: ta('confirm.update.ok'),
      cancelLabel: ta('confirm.cancel'),
    });
    if (!ok) return;
    ed.updateBusy = true;
    setStatus(ta('update.running', { target: updateInfo.target }));
    try {
      // The update copies the template's binary files in batches, one call each, and commits in the call that finds few enough of them left (ADR-0014 decision 6).
      // A call that copies nothing new stops the loop, and its words ask for a new start.
      let res;
      let data;
      let copied = -1;
      for (;;) {
        res = await fetch('/api/github/update', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ to: updateInfo.target, expect: updateInfo.head, skip: skipped }),
        });
        data = await res.json().catch(() => null);
        if (data?.code !== 'updateContinue' || !(data.copied > copied)) break;
        copied = data.copied;
        setStatus(ta('update.copying', { copied: data.copied, total: data.total }));
      }
      if (res.ok) {
        setStatus(ta('update.committed', { target: updateInfo.target }), 'ok');
        await awaitUpdateDeploy(updateInfo.target.replace(/^v/, ''));
      } else if (res.status === 409) {
        setStatus(taApiError(data) ?? ta('update.checkFailed'), 'error');
        // Awaited: otherwise ed.updateBusy is cleared during the re-check, and
        // the panel sits blank in a window where an extra check can slip through.
        await loadUpdateCheck();
      } else {
        setStatus(taApiError(data) ?? ta('update.failed'), 'error');
      }
    } catch {
      setStatus(ta('status.publishLayerUnreachable'), 'error');
    }
    ed.updateBusy = false;
  }

  /**
   * After the update commit: poll /urd.json until the engine field reports
   * the target version (the deploy is out), and reload the admin so the
   * new bundle and engine take effect. The drafts are kept: the updater
   * never touches user-owned files, so they are just as valid afterwards.
   */
  async function awaitUpdateDeploy(version) {
    for (let attempt = 0; attempt < 18; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      try {
        const data = await (await fetch('/urd.json', { cache: 'no-store' })).json();
        if (data?.engine === version) {
          setStatus(ta('update.deployed'), 'ok');
          await new Promise((resolve) => setTimeout(resolve, 800));
          location.reload();
          return;
        }
      } catch { /* temporarily down during rollout: keep polling */ }
    }
    setStatus(ta('update.deployTimeout'), 'error');
  }
</script>

<div class="panel-body">
  {#if ed.updateBusy && !updateInfo}
    <p class="panel-hint">{ta('update.checking')}</p>
  {:else if updateError}
    <p class="panel-hint">{updateError}</p>
    <button class="ghost" onclick={loadUpdateCheck}>{ta('update.retry')}</button>
  {:else if updateInfo}
    <div class="update-versions">
      <span class="update-from">{ta('update.current', { version: updateInfo.current })}</span>
      {#if !updateInfo.upToDate}
        <span class="update-arrow">{@html ICONS.right}</span>
        <span class="badge">{updateInfo.target}</span>
      {/if}
    </div>
    {#if updateInfo.upToDate}
      <p class="panel-hint">{ta('update.upToDate')}</p>
    {:else}
      <p class="update-summary">{ta('update.summary', {
        writes: updateInfo.changes.filter((c) => c.action === 'write').length,
        deletes: updateInfo.changes.filter((c) => c.action === 'delete').length,
      })}</p>
      {#if updateInfo.notes}
        <details class="group">
          <summary>{ta('update.aboutVersion', { target: updateInfo.target })}</summary>
          <div class="group-items">
            <p class="update-notes">{updateInfo.notes}</p>
          </div>
        </details>
      {/if}
      {#if updateInfo.headers?.upstream}
        <details class="group">
          <summary title={ta('update.headersManual')}>
            <span class="update-warn">{@html ICONS.warn}</span> {ta('update.headersTitle')}
          </summary>
          <div class="group-items">
            <pre class="update-headers">{updateInfo.headers.upstream}</pre>
          </div>
        </details>
      {/if}
      <!-- Hand-edited engine files must be seen without a click;
           the rest of the atom group is one combined swap and
           is folded away. -->
      {#each updateInfo.changes.filter((c) => c.atom && c.conflict) as c (c.path)}
        <div class="update-row">
          <span class="update-path" title={c.path}>{c.path}</span>
          <span class="update-flags">
            {#if c.action === 'delete'}<span class="chip">{ta('update.actionDelete')}</span>{/if}
            <span class="update-warn" title={ta(`update.conflict.${c.conflict}`)}>{@html ICONS.warn}</span>
          </span>
        </div>
      {/each}
      <details class="group">
        <summary title={ta('update.atomGroup.title')}>
          {ta('update.atomTitle')} · {updateInfo.changes.filter((c) => c.atom).length}
        </summary>
        <div class="group-items">
          {#each updateInfo.changes.filter((c) => c.atom && !c.conflict) as c (c.path)}
            <div class="update-row">
              <span class="update-path" title={c.path}>{c.path}</span>
              {#if c.action === 'delete'}<span class="chip">{ta('update.actionDelete')}</span>{/if}
            </div>
          {/each}
        </div>
      </details>
      {#if updateInfo.changes.some((c) => !c.atom)}
        <div class="ctl-row update-opt-head">
          <p class="panel-strong">{ta('update.optionalTitle')}</p>
          <span class="mini-label">{ta('update.keepMine')}</span>
        </div>
        {#each updateInfo.changes.filter((c) => !c.atom) as c (c.path)}
          <div class="update-row">
            <span class="update-path" class:skipped={ed.updateSkip.has(c.path)} title={c.path}>{c.path}</span>
            <span class="update-flags">
              {#if c.action === 'delete'}<span class="chip">{ta('update.actionDelete')}</span>{/if}
              {#if c.conflict}<span class="update-warn" title={ta(`update.conflict.${c.conflict}`)}>{@html ICONS.warn}</span>{/if}
              <input type="checkbox" checked={ed.updateSkip.has(c.path)}
                onchange={() => toggleUpdateSkip(c.path)}
                title={ta('update.keepMine.title')} aria-label={ta('update.keepMine')} />
            </span>
          </div>
        {/each}
      {/if}
      <button class="primary update-run" onclick={runUpdate}
        disabled={ed.updateBusy || !auth?.allowed}
        title={auth?.allowed ? ta('update.run.title') : ta('tip.history.needsAccess')}>
        {ta('update.run', { target: updateInfo.target })}
      </button>
    {/if}
  {/if}
</div>
