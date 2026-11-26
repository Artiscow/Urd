/**
 * GET and POST /api/github/update: the updater (ADR-0014).
 * GET ?to= checks a template version against the site; POST { to, expect, skip? } commits it.
 */
import { gh, ghGraphql, cleanBase64, commitTree, triggerDeploy } from '../../_lib/github.js';
import { requirePublisher } from '../../_lib/auth.js';
import { isPageIndexCopy } from '../../_lib/guard.js';
import { planUpdate, highestVersionTag, isOlderTag, VERSION_TAG_RE, chunkEntries, blobBatch, travelsAsBlob } from '../../_lib/update-plan.js';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

const decodeBlob = (b64) =>
  new TextDecoder().decode(Uint8Array.from(atob(cleanBase64(b64)), (c) => c.charCodeAt(0)));

/**
 * The user's tree as path -> blob SHA, limited to the site root (GITHUB_ROOT_DIR stripped, so the paths match the template repo's).
 */
function siteTree(tree, rootDir) {
  const prefix = rootDir ? `${rootDir}/` : '';
  const map = {};
  for (const entry of tree) {
    if (entry.type !== 'blob') continue;
    if (prefix && !entry.path.startsWith(prefix)) continue;
    map[entry.path.slice(prefix.length)] = entry.sha;
  }
  return map;
}

function treeAsMap(tree) {
  const map = {};
  for (const entry of tree) {
    if (entry.type === 'blob') map[entry.path] = entry.sha;
  }
  return map;
}

/**
 * Loads the common ground for check and run: the user's HEAD + tree, the installed version, the target version and the template's two trees.
 * Throws with .code.
 */
async function loadState(token, config, toParam) {
  const { repo, branch, rootDir, templateRepo } = config;

  const ref = await gh(token, `/repos/${repo}/git/ref/heads/${branch}`);
  const head = ref.object.sha;
  const rawTree = await gh(token, `/repos/${repo}/git/trees/${head}?recursive=1`);
  if (rawTree.truncated) {
    // A truncated tree would misclassify files outside the slice as "missing locally" and rewrite them without warning: stop safely instead.
    throw Object.assign(
      new Error('The repository tree is too large to compare safely'),
      { code: 'updateFailed', detail: 'the git tree is truncated by GitHub' },
    );
  }
  const userTree = siteTree(rawTree.tree, rootDir);

  if (!userTree['urd.json']) {
    throw Object.assign(new Error('Could not find urd.json in the repository'), { code: 'updateFailed', detail: 'urd.json is missing' });
  }
  const urdBlob = await gh(token, `/repos/${repo}/git/blobs/${userTree['urd.json']}`);
  const engine = JSON.parse(decodeBlob(urdBlob.content)).engine;

  let target = toParam ?? null;
  let templateTags;
  try {
    if (!target) {
      templateTags = await gh(token, `/repos/${templateRepo}/tags?per_page=100`);
      target = highestVersionTag(templateTags.map((t) => t.name));
    }
    if (!target) {
      throw Object.assign(new Error('The template repository has no version tags'), { code: 'updateNoBaseline', tag: '(none)' });
    }
    if (target === `v${engine}`) {
      return { head, engine, target, userTree, upToDate: true };
    }
    // An update only goes forward: a site ahead of every version offered is up to date, and an older version asked for by name is refused.
    if (isOlderTag(target, `v${engine}`)) {
      if (!toParam) return { head, engine, target: `v${engine}`, userTree, upToDate: true };
      throw Object.assign(new Error(`The version ${target} is older than the installed v${engine}`), { code: 'updateOlder', target });
    }

    let baselineTree;
    try {
      baselineTree = await gh(token, `/repos/${templateRepo}/git/trees/v${engine}?recursive=1`);
    } catch (err) {
      if (err.status === 404 || err.status === 422) {
        throw Object.assign(
          new Error(`Could not find the baseline tag v${engine} in the template repository`),
          { code: 'updateNoBaseline', tag: `v${engine}` },
        );
      }
      throw err;
    }
    let targetTree;
    try {
      targetTree = await gh(token, `/repos/${templateRepo}/git/trees/${target}?recursive=1`);
    } catch (err) {
      if (err.status === 404 || err.status === 422) {
        // A well-formed but nonexistent target tag must be diagnosed as exactly that, not as "the template repo is unreachable".
        throw Object.assign(new Error(`The target version ${target} does not exist in the template repository`), { code: 'updateBadTarget', target });
      }
      throw err;
    }
    return {
      head,
      engine,
      target,
      userTree,
      upToDate: false,
      baselineTree: treeAsMap(baselineTree.tree),
      targetTree: treeAsMap(targetTree.tree),
    };
  } catch (err) {
    if (err.code) throw err;
    throw Object.assign(
      new Error(`Could not read the template repository ${templateRepo}: ${err.message}`),
      { code: 'updateTemplateUnreachable', repo: templateRepo, detail: err.message.slice(0, 200) },
    );
  }
}

/**
 * The template repository's release of a version: its name, its page where that is on github.com, and its notes.
 * Null where there is none or it cannot be read.
 * @returns {Promise<{name: string|null, url: string|null, notes: string|null}|null>}
 */
async function releaseOf(token, templateRepo, tag) {
  try {
    const release = await gh(token, `/repos/${templateRepo}/releases/tags/${tag}`);
    let url = null;
    try {
      const page = new URL(release.html_url);
      if (page.protocol === 'https:' && page.host === 'github.com') url = page.href;
    } catch { /* no page to link to */ }
    return {
      name: typeof release.name === 'string' && release.name.trim() ? release.name.trim().slice(0, 200) : null,
      url,
      notes: typeof release.body === 'string' && release.body.trim() ? release.body.slice(0, 20000) : null,
    };
  } catch {
    return null;
  }
}

export async function onRequestGet({ request, env }) {
  const auth = await requirePublisher(request, env);
  if (auth.response) return auth.response;
  const { config, token } = auth;

  const to = new URL(request.url).searchParams.get('to');
  if (to !== null && !VERSION_TAG_RE.test(to)) {
    return json({ error: `Invalid target version '${to}'`, code: 'updateBadTarget', target: to }, 400);
  }

  try {
    const state = await loadState(token, config, to);
    if (state.upToDate) {
      // The installed version's release, named and linked in the panel.
      const installed = await releaseOf(token, config.templateRepo, state.target);
      return json({ current: state.engine, target: state.target, head: state.head, upToDate: true, changes: [], release: installed && { name: installed.name, url: installed.url } });
    }
    const { changes, upToDate } = planUpdate(state.baselineTree, state.targetTree, state.userTree);

    // _headers is never written (ADR-0006): its upstream text is sent where the site's file differs from the target, for the admin to show.
    const headers = {
      changed: state.baselineTree['_headers'] !== state.targetTree['_headers'],
      edited: state.userTree['_headers'] !== state.baselineTree['_headers'],
      upstream: null,
    };
    if (state.targetTree['_headers'] && state.userTree['_headers'] !== state.targetTree['_headers']) {
      const blob = await gh(token, `/repos/${config.templateRepo}/git/blobs/${state.targetTree['_headers']}`);
      headers.upstream = decodeBlob(blob.content);
    }

    // The target's release (optional): its name and page, and its notes.
    const offered = await releaseOf(token, config.templateRepo, state.target);

    return json({ current: state.engine, target: state.target, head: state.head, upToDate, changes, headers, notes: offered?.notes ?? null, release: offered && { name: offered.name, url: offered.url } });
  } catch (err) {
    if (err.code) return json({ error: err.message, code: err.code, tag: err.tag, repo: err.repo, target: err.target, detail: err.detail }, 502);
    console.error('Urd update check:', err.message);
    return json({ error: `The update check failed: ${err.message}`, code: 'updateFailed', detail: err.message.slice(0, 200) }, 502);
  }
}

export async function onRequestPost({ request, env }) {
  const auth = await requirePublisher(request, env);
  if (auth.response) return auth.response;
  const { config, token } = auth;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON in the request', code: 'badJson' }, 400);
  }
  const { to, expect, skip } = body ?? {};
  if (typeof to !== 'string' || !VERSION_TAG_RE.test(to)) {
    return json({ error: `Invalid target version '${to}'`, code: 'updateBadTarget', target: String(to) }, 400);
  }
  if (typeof expect !== 'string' || !expect) {
    return json({ error: 'expect must be a commit sha', code: 'badExpect' }, 400);
  }
  if (skip !== undefined && (!Array.isArray(skip) || skip.length > 500 || skip.some((p) => typeof p !== 'string'))) {
    // api.updateFailed interpolates detail, so the text is right for THIS caller (api.badFiles describes the commit endpoint).
    return json({ error: 'skip must be a list of paths', code: 'updateFailed', detail: 'skip must be a list of paths (max 500)' }, 400);
  }

  try {
    const state = await loadState(token, config, to);
    if (state.head !== expect) {
      return json({ error: 'The repository changed after the update check', code: 'updateRace' }, 409);
    }
    if (state.upToDate) {
      return json({ current: state.engine, target: state.target, upToDate: true });
    }

    // The plan is recomputed server-side; the client may only opt out of files OUTSIDE the engine atom group (ADR-0014).
    const plan = planUpdate(state.baselineTree, state.targetTree, state.userTree);
    const planned = new Map(plan.changes.map((c) => [c.path, c]));
    for (const path of skip ?? []) {
      const change = planned.get(path);
      if (!change || change.atom) {
        return json({ error: `The file '${path}' cannot be held back from the update`, code: 'updateBadSkip', path }, 400);
      }
      planned.delete(path);
    }

    const writes = [...planned.values()].filter((c) => c.action === 'write');
    const deletes = [...planned.values()].filter((c) => c.action === 'delete');

    // The copy refresh duty (ADR-0013): each <slug>/index.html whose blob differs from the target's root index.html is written, unless the plan already holds it.
    const rootIndexSha = state.targetTree['index.html'];
    const copyPaths = Object.keys(state.userTree)
      .filter((p) => isPageIndexCopy(p) && state.userTree[p] !== rootIndexSha && !planned.has(p));
    const needsRootText = copyPaths.length > 0 && !writes.some((c) => c.path === 'index.html');

    // Files that cannot travel inline are copied as blobs, BLOB_BATCH per call; the call that finds at most BLOB_ROOM missing copies those and commits (ADR-0014).
    const fetchPaths = [...writes.map((c) => c.path), ...(needsRootText ? ['index.html'] : [])];
    const [owner, name] = config.templateRepo.split('/');
    const [siteOwner, siteName] = config.repo.split('/');
    let blobPaths = [];
    if (fetchPaths.length > 0) {
      const kinds = fetchPaths.map((p, i) =>
        `f${i}: object(expression: ${JSON.stringify(`${to}:${p}`)}) { ... on Blob { isBinary isTruncated } }`);
      const held = fetchPaths.map((p, i) => `h${i}: object(oid: ${JSON.stringify(state.targetTree[p])}) { oid }`);
      const meta = await ghGraphql(token,
        `{ template: repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(name)}) { ${kinds.join(' ')} } `
        + `site: repository(owner: ${JSON.stringify(siteOwner)}, name: ${JSON.stringify(siteName)}) { ${held.join(' ')} } }`,
        1, { partial: true });
      blobPaths = fetchPaths.filter((p, i) => travelsAsBlob(meta?.template?.[`f${i}`]));
      const present = new Set(fetchPaths.filter((p, i) => meta?.site?.[`h${i}`]));
      const { batch, copied, total, commit } = blobBatch(blobPaths, present);
      for (const path of batch) {
        const raw = await gh(token, `/repos/${config.templateRepo}/git/blobs/${state.targetTree[path]}`);
        await gh(token, `/repos/${config.repo}/git/blobs`, {
          method: 'POST',
          body: JSON.stringify({ content: cleanBase64(raw.content), encoding: 'base64' }),
        });
      }
      if (!commit) {
        // Not a 2xx, so an admin without the continue step shows this text as an error rather than taking it for the commit.
        return json({
          error: `Copied ${copied} of ${total} files from the template. Start the update again to continue.`,
          code: 'updateContinue',
          copied,
          total,
        }, 429);
      }
    }

    // ONE GraphQL call fetches the texts that travel inline.
    const textPaths = fetchPaths.filter((p) => !blobPaths.includes(p));
    const texts = {};
    if (textPaths.length > 0) {
      const fields = textPaths.map((p, i) =>
        `f${i}: object(expression: ${JSON.stringify(`${to}:${p}`)}) { ... on Blob { text } }`);
      const data = await ghGraphql(token, `{ repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(name)}) { ${fields.join(' ')} } }`);
      for (let i = 0; i < textPaths.length; i++) {
        const text = data.repository[`f${i}`]?.text;
        if (typeof text !== 'string') throw new Error(`The template has no text for ${textPaths[i]}`);
        texts[textPaths[i]] = text;
      }
    }
    const blobEntries = Object.fromEntries(blobPaths.map((p) => [p, state.targetTree[p]]));

    const prefix = config.rootDir ? `${config.rootDir}/` : '';
    const entries = [
      ...writes.map((c) => (blobEntries[c.path] !== undefined
        ? { path: `${prefix}${c.path}`, sha: blobEntries[c.path] }
        : { path: `${prefix}${c.path}`, content: texts[c.path] })),
      ...copyPaths.map((p) => (blobEntries['index.html'] !== undefined
        ? { path: `${prefix}${p}`, sha: blobEntries['index.html'] }
        : { path: `${prefix}${p}`, content: texts['index.html'] })),
      ...deletes.map((c) => ({ path: `${prefix}${c.path}`, sha: null })),
    ];

    const { sha } = await commitTree(token, config, {
      message: `Update Urd to ${to} via admin`,
      entries,
      expect,
    }, chunkEntries);
    await triggerDeploy(env);
    return json({ sha, current: state.engine, target: to, written: writes.length + copyPaths.length, deleted: deletes.length });
  } catch (err) {
    if (err.status === 409 || (err.status === 422 && /fast.?forward/i.test(err.message))) {
      return json({ error: 'The repository changed while the update was running', code: 'updateRace' }, 409);
    }
    if (err.code) return json({ error: err.message, code: err.code, tag: err.tag, repo: err.repo, target: err.target, detail: err.detail }, 502);
    console.error('Urd update:', err.message);
    return json({ error: `The update failed: ${err.message}`, code: 'updateFailed', detail: err.message.slice(0, 200) }, 502);
  }
}
