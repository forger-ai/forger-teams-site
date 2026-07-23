import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Worker deployment serves static assets on the Teams custom domain', async () => {
  const config = JSON.parse(await readFile(new URL('../wrangler.jsonc', import.meta.url), 'utf8'));

  assert.equal(config.name, 'forger-teams-site');
  assert.equal(config.main, 'worker/index.ts');
  assert.equal(config.compatibility_date, '2026-07-22');
  assert.deepEqual(config.compatibility_flags, ['nodejs_compat']);
  assert.deepEqual(config.routes, [{ pattern: 'teams.forger.cloud', custom_domain: true }]);
  assert.equal(config.assets.directory, './dist');
  assert.equal(config.assets.binding, 'ASSETS');
  assert.deepEqual(config.assets.run_worker_first, ['/api/*']);
  assert.equal(config.observability.enabled, true);
});

test('Worker routes only the lead endpoint through application code', async () => {
  const entry = await readFile(new URL('../worker/index.ts', import.meta.url), 'utf8');

  assert.match(entry, /url\.pathname === '\/api\/team-demo-requests'/);
  assert.match(entry, /handleTeamDemoRequest\(request\)/);
  assert.match(entry, /env\.ASSETS\.fetch\(request\)/);
  assert.match(entry, /satisfies ExportedHandler<Env>/);
  assert.doesNotMatch(entry, /console\.(?:log|info|warn|error)|passThroughOnException|API_KEY|TOKEN|SECRET/);
});

test('static assets ship browser hardening and immutable hashed-asset caching', async () => {
  const headers = await readFile(new URL('../public/_headers', import.meta.url), 'utf8');

  assert.match(headers, /X-Content-Type-Options: nosniff/);
  assert.match(headers, /Referrer-Policy: strict-origin-when-cross-origin/);
  assert.match(headers, /Permissions-Policy: camera=\(\), geolocation=\(\), microphone=\(\)/);
  assert.match(headers, /Content-Security-Policy: .*frame-ancestors 'none'/);
  assert.match(headers, /\/_astro\/\*[\s\S]*Cache-Control: public, max-age=31536000, immutable/);
});
