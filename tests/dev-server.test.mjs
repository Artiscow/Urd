/**
 * The local test server every site gets (template/dev-server.py), run for real on a folder of its own: it answers this machine's names only, never a path segment that starts with a dot (where .dev.vars and .git/ stand), and listens on the loopback addresses unless --lan shares it.
 * Skipped where python3 is missing.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { request } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const hasPython = spawnSync('python3', ['--version']).status === 0;

/** A port nothing listens on just now. */
const freePort = () => new Promise((resolve) => {
  const probe = createServer().listen(0, '127.0.0.1', () => {
    const { port } = probe.address();
    probe.close(() => resolve(port));
  });
});

/** One GET with a Host header of the test's choosing; resolves with the status, or null where nothing answers at that address. */
const get = (host, port, path, hostHeader) => new Promise((resolve) => {
  const req = request({ host, port, path, headers: { host: hostHeader ?? `localhost:${port}` }, timeout: 3000 }, (res) => {
    res.resume();
    resolve(res.statusCode);
  });
  req.on('error', () => resolve(null));
  req.on('timeout', () => { req.destroy(); resolve(null); });
  req.end();
});

test('the test server: this machine\'s names only, no dot path, and loopback addresses only', { skip: !hasPython && 'python3 is missing' }, async () => {
  const dir = mkdtempSync(join(tmpdir(), 'urd-dev-server-'));
  copyFileSync(new URL('../template/dev-server.py', import.meta.url), join(dir, 'dev-server.py'));
  writeFileSync(join(dir, 'index.html'), '<p>site</p>');
  writeFileSync(join(dir, '.dev.vars'), 'GITHUB_CLIENT_SECRET=not-a-real-one');
  mkdirSync(join(dir, '.git'));
  writeFileSync(join(dir, '.git', 'config'), '[core]');
  const port = await freePort();
  const server = spawn('python3', [join(dir, 'dev-server.py'), String(port)], { stdio: ['ignore', 'pipe', 'pipe'] });
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('the server did not start')), 8000);
      server.stdout.on('data', (chunk) => { if (String(chunk).includes('Urd test server')) { clearTimeout(timer); resolve(); } });
      server.on('exit', (code) => { clearTimeout(timer); reject(new Error(`the server stopped (${code})`)); });
    });
    assert.equal(await get('127.0.0.1', port, '/'), 200);
    assert.equal(await get('127.0.0.1', port, '/', `127.0.0.1:${port}`), 200);
    for (const path of ['/.dev.vars', '/%2Edev.vars', '/.git/config', '/x/../.dev.vars', '/x%2F..%2F.dev.vars', '/.git%2Fconfig']) {
      assert.equal(await get('127.0.0.1', port, path), 404, path);
    }
    for (const host of [`evil.example:${port}`, 'evil.example', `192.168.1.10:${port}`, `localhost.evil.example:${port}`]) {
      assert.equal(await get('127.0.0.1', port, '/', host), 403, `Host «${host}»`);
    }
    const v6 = await get('::1', port, '/', `[::1]:${port}`);
    assert.ok(v6 === 200 || v6 === null, 'the IPv6 loopback answers where the machine has one');
  } finally {
    server.kill();
    rmSync(dir, { recursive: true, force: true });
  }
});

test('the test server binds the loopback addresses by default and every interface only with --lan', () => {
  const src = readFileSync(new URL('../template/dev-server.py', import.meta.url), 'utf8');
  assert.match(src, /ThreadingHTTPServer\(\('127\.0\.0\.1', port\), handler\)/);
  assert.match(src, /LoopbackV6Server\(\('::1', port\), handler\)/);
  assert.match(src, /if lan:\n\s+try:\n\s+servers\.append\(DualStackServer\(\('::', port\), handler\)\)/);
  assert.doesNotMatch(src, /\(\('', port\)/, 'never every interface by default');
});
