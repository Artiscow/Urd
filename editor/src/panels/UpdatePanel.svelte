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
  import ReadingWindow from '../lib/ReadingWindow.svelte';
  import Choice from '../lib/Choice.svelte';
  import { TEST_CASES } from '../lib/test-update.js';
  import HeadersWindow from './update/HeadersWindow.svelte';
  import { releaseLabel, parseNotes, plainText } from '../lib/release-notes.js';
  import { headerChanges, keptWords, handEdits } from '../lib/headers-words.js';
  import { changeText, releaseDate } from '../lib/headers-text.js';
  import { keptAfter, pressedWith } from '../lib/update-keep.js';
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
  /** What the headers window reads: the check's, or the template's text alone, which an updater without the plan sends. */
  const headersView = $derived(headers?.state ? headers : headersByHand ? { state: 'edited', text: headersByHand, added: [] } : null);
  /** The check sent the site's file and the release it came from, so the headers read in words. */
  const headersWorded = $derived(typeof headers?.site === 'string' && typeof headers?.from === 'string');
  /** The card's lines: what changes, and how many of the owner's additions are kept; by hand, what the new file brings. */
  const headersSummary = $derived(!headersWorded ? [] : headersWritten ? headerChanges(headers.site, headers.text) : headersByHand ? headerChanges(headers.from, headers.text) : []);
  /** The by-hand card stands only where there is something to do: edits to make, a site without the file, or a file that cannot be read in words. */
  const handNeeded = $derived(Boolean(headersByHand) && (!headersWorded || handEdits(headers.from, headers.text, headers.site).length > 0));
  const keptCount = $derived(headersWritten ? keptWords(headers.added).length : 0);
  /** The update's buttons answer a publisher, or anyone in the test update the local server shows. */
  const mayUpdate = $derived(Boolean(auth?.allowed || updateInfo?.test));
  /** The window open over the editor: the release notes or the security headers. */
  let reading = $state(null);
  /** The notes' first paragraph, the card's short version of them. */
  const excerpt = $derived.by(() => {
    const para = parseNotes(updateInfo?.notes ?? '').find((block) => block.kind === 'para');
    return para ? plainText(para.inline) : '';
  });
  const released = $derived(releaseDate(updateInfo?.release?.date));
  const ADDS = new Set(['added', 'sourcesAdded']);
  const TAKES = new Set(['removed', 'sourcesRemoved']);

  /** «Keep mine» pressed: a file is kept back with the files that need it, and let through with those it needs (update-keep.js). */
  function toggleUpdateSkip(path) {
    ed.updateSkip = keptAfter(ed.updateSkip, updateInfo?.changes ?? [], path);
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
    if (updateInfo.test) {
      setStatus(ta('update.test.wrote'), 'ok');
      return;
    }
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
    if (updateInfo.test) {
      setStatus(ta('update.test.wrote'), 'ok');
      return;
    }
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
    {#if updateInfo.test}
      <!-- The test update on the local server, and the case it shows -->
      <Choice label={ta('update.test.case')} title={ta('update.test.tip')} value={ed.updateTestCase}
        options={TEST_CASES.map((kind) => [kind, ta(`update.test.case.${kind}`)])} onchange={(kind) => ed.setUpdateTestCase(kind)} />
    {/if}
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
    <!-- A file's path, free to break after each slash -->
    {#snippet pathText(path)}{#each path.split('/') as part, i (i)}{#if i}/<wbr />{/if}{part}{/each}{/snippet}
    <!-- A headers card's lines: the first two changes in words, how many more, and how many of the owner's additions are kept -->
    {#snippet headersLines()}
      {#if headersSummary.length || keptCount}
        <ul class="update-said">
          {#each headersSummary.slice(0, 2) as change, i (i)}
            <li><span class="update-said-mark" class:update-said-add={ADDS.has(change.kind)} aria-hidden="true">{@html ADDS.has(change.kind) ? ICONS.plus : TAKES.has(change.kind) ? ICONS.minus : ICONS.pencil}</span><span>{changeText(change)}</span></li>
          {/each}
          {#if headersSummary.length > 2}<li class="update-said-more">{ta('update.headersMore', { n: headersSummary.length - 2 })}</li>{/if}
          {#if keptCount}
            <li><span class="update-said-mark update-said-kept" aria-hidden="true">{@html ICONS.check}</span><span>{ta(keptCount === 1 ? 'update.headersKeptCount.one' : 'update.headersKeptCount', { n: keptCount })}</span></li>
          {/if}
        </ul>
      {/if}
    {/snippet}
    <!-- The security headers the update writes: the first changes in words, what of the owner's is kept, and the window that reads them all -->
    {#snippet headersCard(withKeep)}
      <div class="update-headers-card">
        <div class="update-row">
          <span class="update-name" class:skipped={withKeep && ed.updateSkip.has('_headers')}>{ta('update.headersTitle')}</span>
          {#if withKeep}
            <span class="update-flags">
              <input type="checkbox" checked={ed.updateSkip.has('_headers')}
                onchange={() => toggleUpdateSkip('_headers')}
                title={ta('update.keepMine.title')} aria-label={ta('update.keepMine')} />
            </span>
          {/if}
        </div>
        {@render headersLines()}
        <button type="button" class="ghost update-read" onclick={() => (reading = 'headers')}>{@html ICONS.expand}{ta('update.seeChanges')}</button>
        {#if !withKeep}
          <button class="primary update-run" onclick={runHeaders}
            disabled={ed.updateBusy || !mayUpdate}
            title={mayUpdate ? undefined : ta('tip.history.needsAccess')}>{ta('update.headersRun')}</button>
        {/if}
      </div>
    {/snippet}
    {#if updateInfo.upToDate}
      <EmptyState text={ta('update.upToDate')} />
      <!-- The latest Urd with the site's _headers behind its version's: offered on its own -->
      {#if headersWritten}{@render headersCard(false)}{/if}
    {:else}
      <p class="update-summary">{ta('update.summary', {
        writes: updateInfo.changes.filter((c) => c.action === 'write').length + (headersWritten ? 1 : 0),
        deletes: updateInfo.changes.filter((c) => c.action === 'delete').length,
      })}</p>
      {#if updateInfo.notes}
        <!-- The release's notes: their first paragraph, and the window that reads them whole -->
        <section class="update-notes-card">
          <SubHeading text={ta('update.whatsNew')} />
          {#if excerpt}<p class="update-excerpt">{excerpt}</p>{/if}
          <button type="button" class="ghost update-read" onclick={() => (reading = 'notes')}>{@html ICONS.book}{ta('update.readNotes')}</button>
        </section>
      {/if}
      {#if handNeeded}
        <!-- The security headers the owner changes by hand, as their file has rules of its own: what the new file brings, and the window with the steps -->
        <div class="update-headers-card update-headers-hand">
          <div class="update-row">
            <span class="update-name">{ta('update.headersTitle')}</span>
            <span class="update-warn" role="img" aria-label={ta(headers?.site === null ? 'update.headersMissingShort' : 'update.headersByHandShort')} title={ta(headers?.site === null ? 'update.headersMissingShort' : 'update.headersByHandShort')}>{@html ICONS.warn}</span>
          </div>
          {@render headersLines()}
          <button type="button" class="ghost update-read" onclick={() => (reading = 'headers')}>{@html ICONS.expand}{ta('update.seeByHand')}</button>
        </div>
      {/if}
      <!-- Hand-edited engine files stand in view; the rest of the atom group is one swap, folded away. -->
      {#each updateInfo.changes.filter((c) => c.atom && c.conflict) as c (c.path)}
        <div class="update-row">
          <span class="update-path">{@render pathText(c.path)}</span>
          <span class="update-flags">
            {#if c.action === 'delete'}<span class="chip">{ta('update.actionDelete')}</span>{/if}
            <span class="update-warn" title={ta(`update.conflict.${c.conflict}`)}>{@html ICONS.warn}</span>
          </span>
        </div>
      {/each}
      <Fold id="engine" surface="update" title={ta('update.atomTitle')} tip={ta('update.atomGroup.title')} value={String(updateInfo.changes.filter((c) => c.atom).length)}>
        {#each updateInfo.changes.filter((c) => c.atom && !c.conflict) as c (c.path)}
          <div class="update-row">
            <span class="update-path">{@render pathText(c.path)}</span>
            {#if c.action === 'delete'}<span class="chip">{ta('update.actionDelete')}</span>{/if}
          </div>
        {/each}
      </Fold>
      <!-- The update itself under the engine files, above the optional files, which may run long -->
      <button class="primary update-run" onclick={runUpdate}
        disabled={ed.updateBusy || !mayUpdate}
        title={mayUpdate ? ta('update.run.title') : ta('tip.history.needsAccess')}>
        {ta('update.run', { target: updateInfo.target })}
      </button>
      {#if headersWritten || updateInfo.changes.some((c) => !c.atom)}
        <div class="ctl-row update-opt-head">
          <SubHeading text={ta('update.optionalTitle')} />
          <span class="mini-label">{ta('update.keepMine')}</span>
        </div>
        <!-- The site's _headers, written by the update as the owner never edited it or only added to it: first among the optional files -->
        {#if headersWritten}{@render headersCard(true)}{/if}
        {#each updateInfo.changes.filter((c) => !c.atom) as c (c.path)}
          {@const also = pressedWith(ed.updateSkip, updateInfo.changes, c.path)}
          <div class="update-row">
            <span class="update-path" class:skipped={ed.updateSkip.has(c.path)}>{@render pathText(c.path)}</span>
            <span class="update-flags">
              {#if c.action === 'delete'}<span class="chip">{ta('update.actionDelete')}</span>{/if}
              {#if c.conflict}<span class="update-warn" title={ta(`update.conflict.${c.conflict}`)}>{@html ICONS.warn}</span>{/if}
              <input type="checkbox" checked={ed.updateSkip.has(c.path)}
                onchange={() => toggleUpdateSkip(c.path)}
                title={also.length ? ta(ed.updateSkip.has(c.path) ? 'update.keepMine.tiedIn' : 'update.keepMine.tied', { files: also.join(', ') }) : ta('update.keepMine.title')} aria-label={ta('update.keepMine')} />
            </span>
          </div>
        {/each}
      {/if}
    {/if}
  {/if}
  {#if reading === 'notes' && updateInfo?.notes}
    <ReadingWindow title={releaseLabel(updateInfo.release?.name, updateInfo.target)} onclose={() => (reading = null)}>
      {#snippet lead()}
        {#if released}<span>{ta('update.notes.released', { date: released })}</span>{/if}
        {#if updateInfo.release?.url}<a class="update-github" href={updateInfo.release.url} target="_blank" rel="noopener noreferrer">{ta('update.notes.onGitHub')}{@html ICONS.external}</a>{/if}
      {/snippet}
      <ReleaseNotes text={updateInfo.notes} large />
      {#snippet foot(close)}
        <button type="button" class="ghost" onclick={() => close()}>{ta('ui.close')}</button>
        {#if !updateInfo.upToDate}
          <button type="button" class="primary" disabled={ed.updateBusy || !mayUpdate} title={mayUpdate ? undefined : ta('tip.history.needsAccess')} onclick={() => close(runUpdate)}>{ta('update.run', { target: updateInfo.target })}</button>
        {/if}
      {/snippet}
    </ReadingWindow>
  {/if}
  {#if reading === 'headers' && headersView}
    <HeadersWindow headers={headersView} onclose={() => (reading = null)}
      primary={!headersWritten ? null : updateInfo.upToDate
        ? { label: ta('update.headersRun'), run: runHeaders, disabled: ed.updateBusy || !mayUpdate, title: mayUpdate ? undefined : ta('tip.history.needsAccess') }
        : { label: ta('update.run', { target: updateInfo.target }), run: runUpdate, disabled: ed.updateBusy || !mayUpdate, title: mayUpdate ? undefined : ta('tip.history.needsAccess') }} />
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
