<script>
  /* The Update panel: the engine version against the template's tag, the changes an update brings, the update itself, and the tidy of media/. */
  import { getContext } from 'svelte';
  import { ta, taApiError } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import Fold from '../lib/rows/Fold.svelte';
  import SubHeading from '../lib/rows/SubHeading.svelte';
  import EmptyState from '../lib/rows/EmptyState.svelte';
  import ErrorLine from '../lib/rows/ErrorLine.svelte';
  import ReleaseNotes from '../lib/ReleaseNotes.svelte';
  import { releaseLabel } from '../lib/release-notes.js';
  const ed = getContext('urd-editor');
  const activePanel = $derived(ed.activePanel);
  const auth = $derived(ed.auth);
  const updateError = $derived(ed.updateError);
  const updateInfo = $derived(ed.updateInfo);
  const { askConfirm, loadUpdateCheck, setStatus } = ed;
  /** While changes wait to be published, the tidy acts at its second press, which publishes them and then tidies; a mouse or the focus leaving disarms it. */
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

  /** The site's `_headers` as the check reports it; an updater without a plan for it sends the template's text alone, to copy by hand. */
  const headers = $derived(updateInfo?.headers ?? null);
  /** The update writes the site's `_headers`, as the owner never edited it or only added to its rules. */
  const headersWritten = $derived(['unedited', 'added'].includes(headers?.state));
  /** The template's `_headers` to copy by hand, where the update leaves the site's file as it is. */
  const headersByHand = $derived(headersWritten ? null : headers?.state ? (headers.state === 'edited' ? headers.text : null) : headers?.upstream ?? null);

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
    const withHeaders = headersWritten && !ed.updateSkip.has('_headers');
    const ok = await askConfirm({
      title: ta('confirm.update.title'),
      lines: [
        ta('confirm.update.body', {
          target: updateInfo.target,
          writes: applied.filter((c) => c.action === 'write').length + (withHeaders ? 1 : 0),
          deletes: applied.filter((c) => c.action === 'delete').length,
        }),
        ...(withHeaders ? [ta(headers.added?.length ? 'confirm.update.headersKept' : 'confirm.update.headers')] : []),
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
      // A due sign-in is renewed first; then binary files are copied in batches, one call each, until a call commits or copies nothing.
      await ed.renewIfDue();
      let res;
      let data;
      let copied = -1;
      for (;;) {
        res = await fetch('/api/github/update', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ to: updateInfo.target, expect: updateInfo.head, skip: skipped, ...(withHeaders ? { headers: headers.text } : {}) }),
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

  /** The site's `_headers` alone brought up to the installed version's, with the hosts the owner added kept; the check runs again after it. */
  async function runHeaders() {
    if (!updateInfo?.upToDate || !headersWritten || ed.updateBusy) return;
    const ok = await askConfirm({
      title: ta('confirm.headers.title'),
      lines: [ta(headers.added?.length ? 'confirm.headers.bodyKept' : 'confirm.headers.body', { target: updateInfo.target })],
      okLabel: ta('confirm.headers.ok'),
      cancelLabel: ta('confirm.cancel'),
    });
    if (!ok) return;
    ed.updateBusy = true;
    setStatus(ta('update.headersRunning'));
    let check = false;
    try {
      await ed.renewIfDue();
      const res = await fetch('/api/github/update', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ to: updateInfo.target, expect: updateInfo.head, headers: headers.text }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok) setStatus(ta(data?.sha ? 'update.headersDone' : 'update.upToDate'), 'ok');
      else setStatus(taApiError(data) ?? ta('update.failed'), 'error');
      check = res.ok || res.status === 409;
    } catch {
      setStatus(ta('status.publishLayerUnreachable'), 'error');
    }
    ed.updateBusy = false;
    if (check) await loadUpdateCheck();
  }

  /**
   * After the update commit: polls /urd.json until the engine field reports the target version, then reloads the admin, the drafts kept.
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
    <!-- The release on offer, or the one installed: its name and version, a link to its page on GitHub where the check found one -->
    {#if updateInfo.release?.url}
      <a class="update-release" href={updateInfo.release.url} target="_blank" rel="noopener noreferrer" title={ta('update.releaseOnGitHub')}>
        <span>{releaseLabel(updateInfo.release.name, updateInfo.target)}</span>{@html ICONS.external}
      </a>
    {:else if updateInfo.release?.name}
      <p class="update-release">{releaseLabel(updateInfo.release.name, updateInfo.target)}</p>
    {/if}
    <!-- The site's new _headers: what of the owner's own it keeps, and the whole file folded away -->
    {#snippet headersFile()}
      {#if headers.added?.length}
        <SubHeading text={ta('update.headersKept')} />
        <ul class="update-kept">{#each headers.added as line (line)}<li><code>{line}</code></li>{/each}</ul>
      {/if}
      <Fold id="headers-file" surface="update" title={ta('update.headersFile')} tip={ta('update.headersAuto')}>
        <pre class="update-headers">{headers.text}</pre>
      </Fold>
    {/snippet}
    {#if updateInfo.upToDate}
      <EmptyState text={ta('update.upToDate')} />
      {#if headersWritten}
        <!-- The latest Urd with the site's _headers behind its version's: offered on its own, marked -->
        <div class="update-headers-card">
          <SubHeading text={ta('update.headersTitle')} />
          {@render headersFile()}
          <button class="primary update-run" onclick={runHeaders}
            disabled={ed.updateBusy || !auth?.allowed}
            title={auth?.allowed ? undefined : ta('tip.history.needsAccess')}>{ta('update.headersRun')}</button>
        </div>
      {/if}
    {:else}
      <p class="update-summary">{ta('update.summary', {
        writes: updateInfo.changes.filter((c) => c.action === 'write').length + (headersWritten ? 1 : 0),
        deletes: updateInfo.changes.filter((c) => c.action === 'delete').length,
      })}</p>
      {#if updateInfo.notes}
        <!-- The release's notes, written in Markdown on GitHub, drawn with their headings, lists and folds -->
        <Fold id="notes" surface="update" title={ta('update.aboutVersion', { target: updateInfo.target })}>
          <ReleaseNotes text={updateInfo.notes} />
        </Fold>
      {/if}
      {#if headersByHand}
        <!-- The template's _headers where the owner changed the site's beyond adding to its rules, to copy by hand: marked as a warning while closed -->
        <Fold id="headers" surface="update" title={ta('update.headersTitle')} tip={ta('update.headersByHand')}>
          {#snippet value()}<span class="update-warn">{@html ICONS.warn}</span>{/snippet}
          <pre class="update-headers">{headersByHand}</pre>
        </Fold>
      {/if}
      <!-- Hand-edited engine files stand in view; the rest of the atom group is one swap, folded away. -->
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
      {#if headersWritten || updateInfo.changes.some((c) => !c.atom)}
        <div class="ctl-row update-opt-head">
          <SubHeading text={ta('update.optionalTitle')} />
          <span class="mini-label">{ta('update.keepMine')}</span>
        </div>
        {#if headersWritten}
          <!-- The site's _headers, written by the update as the owner never edited it or only added to it: first among the optional files, marked -->
          <div class="update-headers-card">
            <div class="update-row">
              <span class="update-name" class:skipped={ed.updateSkip.has('_headers')}>{ta('update.headersTitle')}</span>
              <span class="update-flags">
                <input type="checkbox" checked={ed.updateSkip.has('_headers')}
                  onchange={() => toggleUpdateSkip('_headers')}
                  title={ta('update.keepMine.title')} aria-label={ta('update.keepMine')} />
              </span>
            </div>
            {@render headersFile()}
          </div>
        {/if}
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
  <!-- The media files at the root of media/, and the tidy that moves them into the folders of their kind, while there is something to tidy -->
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
