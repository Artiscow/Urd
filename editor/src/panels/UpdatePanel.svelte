<script>
  /* The Update panel: the engine version against the template's tag, the changes an update brings, the update itself, and the tidy that moves the media files at the root of media/ into their folders. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import { ta, taApiError } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import Fold from '../lib/rows/Fold.svelte';
  import SubHeading from '../lib/rows/SubHeading.svelte';
  import EmptyState from '../lib/rows/EmptyState.svelte';
  import ErrorLine from '../lib/rows/ErrorLine.svelte';
  const ed = getContext('urd-editor');
  const activePanel = $derived(ed.activePanel);
  const auth = $derived(ed.auth);
  const updateError = $derived(ed.updateError);
  const updateInfo = $derived(ed.updateInfo);
  const { askConfirm, loadUpdateCheck, setStatus } = ed;
  /** While changes wait to be published, the tidy acts at its second press: the first says why in the status line and names what the second does, which publishes them and then tidies; a mouse or the focus leaving the button disarms it and clears the line. */
  let tidyArmed = $state(false);
  function disarmTidy() {
    if (!tidyArmed) return;
    tidyArmed = false;
    setStatus('');
  }
  function pressTidy() {
    const n = ed.unpublished.length;
    if (ed.dirty && !tidyArmed) {
      tidyArmed = true;
      setStatus(ta(n === 1 ? 'media.tidyWaiting.one' : 'media.tidyWaiting', { n }));
      return;
    }
    tidyArmed = false;
    ed.tidyMedia({ withChanges: ed.dirty });
  }
  $effect(() => {
    if (!ed.dirty) tidyArmed = false;
  });
  /** The media files are listed once as the panel opens for an owner who may publish, so the Media group stands only while files wait at the root of media/. */
  let mediaAsked = false;
  $effect(() => {
    if (mediaAsked || ed.mediaRootCount !== null || !ed.auth?.allowed) return;
    mediaAsked = true;
    ed.loadMediaFiles();
  });

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
        // Awaited, so the panel stays busy until the fresh check has answered.
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
  {#if ed.updateChecking && !updateInfo}
    <EmptyState text={ta('update.checking')} />
  {:else if updateError}
    <ErrorLine text={updateError} />
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
      <EmptyState text={ta('update.upToDate')} />
    {:else}
      <p class="update-summary">{ta('update.summary', {
        writes: updateInfo.changes.filter((c) => c.action === 'write').length,
        deletes: updateInfo.changes.filter((c) => c.action === 'delete').length,
      })}</p>
      {#if updateInfo.notes}
        <Fold id="notes" surface="update" title={ta('update.aboutVersion', { target: updateInfo.target })}>
          <p class="update-notes">{updateInfo.notes}</p>
        </Fold>
      {/if}
      {#if updateInfo.headers?.upstream}
        <!-- The template's _headers, which the update never writes (ADR-0014): marked as a warning while closed -->
        <Fold id="headers" surface="update" title={ta('update.headersTitle')} tip={ta('update.headersManual')}>
          {#snippet value()}<span class="update-warn">{@html ICONS.warn}</span>{/snippet}
          <pre class="update-headers">{updateInfo.headers.upstream}</pre>
        </Fold>
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
      <Fold id="engine" surface="update" title={ta('update.atomTitle')} tip={ta('update.atomGroup.title')} value={String(updateInfo.changes.filter((c) => c.atom).length)}>
        {#each updateInfo.changes.filter((c) => c.atom && !c.conflict) as c (c.path)}
          <div class="update-row">
            <span class="update-path" title={c.path}>{c.path}</span>
            {#if c.action === 'delete'}<span class="chip">{ta('update.actionDelete')}</span>{/if}
          </div>
        {/each}
      </Fold>
      {#if updateInfo.changes.some((c) => !c.atom)}
        <div class="ctl-row update-opt-head">
          <SubHeading text={ta('update.optionalTitle')} />
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
  <!-- The site's media files: how many still stand at the root of media/, and the tidy that moves them into the folders of their kind (lib/media-tidy.js), for the sites made before the folders; the group stands only while there is something to tidy -->
  {#if ed.mediaRootCount}
  <Fold id="media" surface="update" title={ta('group.siteMedia')} tip={ta('tip.site.media')} value={ta('site.mediaRootShort', { n: ed.mediaRootCount })}>
    <div class="ctl-row" title={ta('tip.site.mediaRoot')}>
      <span>{ta('lbl.mediaRoot')}</span>
      <span class="gridmenu-value">{ed.mediaRootCount}</span>
    </div>
    <button class="ghost action tidy-media" class:armed={tidyArmed} disabled={ed.mediaBusy || ed.updateBusy || !ed.auth?.allowed}
      title={ed.dirty ? ta('tip.media.tidyDirty') : ta('tip.media.tidy')} onclick={pressTidy}
      onpointerleave={(e) => { if (e.pointerType === 'mouse') disarmTidy(); }} onblur={disarmTidy}
      >{tidyArmed ? ta(ed.unpublished.length === 1 ? 'ui.tidyMediaWith.one' : 'ui.tidyMediaWith', { n: ed.unpublished.length }) : ta('ui.tidyMedia')}</button>
  </Fold>
  {/if}
</div>

<style>
  /* The tidy waiting for its second press stands in the accent, which names what it will do */
  .tidy-media.armed {
    color: var(--urd-color-accent, #7c5cff);
    border-color: var(--urd-color-accent, #7c5cff);
  }
</style>
