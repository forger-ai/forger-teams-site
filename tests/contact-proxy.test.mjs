import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { handleTeamDemoRequest } from '../src/lib/team-demo-proxy.mjs';

const makeRequest = (body, init = {}) => new Request('https://teams.forger.cloud/api/team-demo-requests', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(body),
  ...init,
});

const validLead = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  phone: '+1 555 0100',
  company: 'Analytical Engines',
  message: 'Automate monthly operations reporting.',
  locale: 'en',
  website: '',
};

test('proxy validates and translates English leads for the existing backend', async () => {
  let upstream;
  const response = await handleTeamDemoRequest(makeRequest(validLead), async (url, options) => {
    upstream = { url, options };
    return new Response('{"accepted":true}', { status: 202, headers: { 'content-type': 'application/json' } });
  });

  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { accepted: true });
  assert.equal(upstream.url, 'https://platform.forger.cloud/api/team_demo_requests');
  assert.deepEqual(JSON.parse(upstream.options.body), {
    contact_name: 'Ada Lovelace',
    email: 'ada@example.com',
    phone: '+1 555 0100',
    use_case: 'Company: Analytical Engines\n\nAutomate monthly operations reporting.',
    website: '',
    source: 'website_en',
  });
});

test('proxy translates Spanish locale to website_es', async () => {
  let body;
  const response = await handleTeamDemoRequest(makeRequest({ ...validLead, locale: 'es' }), async (_url, options) => {
    body = JSON.parse(options.body);
    return new Response(null, { status: 202 });
  });
  assert.equal(response.status, 202);
  assert.equal(body.source, 'website_es');
});

test('proxy rejects method, media type, malformed JSON, and invalid fields without an upstream call', async () => {
  const invalidRequests = [
    new Request('https://teams.forger.cloud/api/team-demo-requests', { method: 'GET' }),
    new Request('https://teams.forger.cloud/api/team-demo-requests', { method: 'POST', headers: { 'content-type': 'text/plain' }, body: '{}' }),
    new Request('https://teams.forger.cloud/api/team-demo-requests', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{' }),
    makeRequest({ ...validLead, email: 'invalid' }),
    makeRequest({ ...validLead, phone: '' }),
    makeRequest({ ...validLead, company: '' }),
    makeRequest({ ...validLead, message: 'short' }),
    makeRequest({ ...validLead, locale: 'fr' }),
  ];
  const expected = [405, 415, 400, 400, 400, 400, 400, 400];
  let calls = 0;
  for (const [index, request] of invalidRequests.entries()) {
    const response = await handleTeamDemoRequest(request, async () => { calls += 1; });
    assert.equal(response.status, expected[index]);
  }
  assert.equal(calls, 0);
});

test('proxy preserves rate limiting and hides upstream failures', async () => {
  const limited = await handleTeamDemoRequest(makeRequest(validLead), async () => new Response(null, { status: 429 }));
  assert.equal(limited.status, 429);
  assert.deepEqual(await limited.json(), { error: 'rate_limited' });

  const failed = await handleTeamDemoRequest(makeRequest(validLead), async () => new Response('private upstream detail', { status: 500 }));
  assert.equal(failed.status, 502);
  assert.deepEqual(await failed.json(), { error: 'upstream_unavailable' });

  const offline = await handleTeamDemoRequest(makeRequest(validLead), async () => { throw new Error('private network detail'); });
  assert.equal(offline.status, 502);
  assert.deepEqual(await offline.json(), { error: 'upstream_unavailable' });
});

test('Pages Function delegates without secrets or PII logging', () => {
  const entry = readFileSync(new URL('../functions/api/team-demo-requests.ts', import.meta.url), 'utf8');
  const proxy = readFileSync(new URL('../src/lib/team-demo-proxy.mjs', import.meta.url), 'utf8');
  assert.match(entry, /handleTeamDemoRequest\(context\.request\)/);
  assert.doesNotMatch(`${entry}\n${proxy}`, /console\.(?:log|info|warn|error)/);
  assert.doesNotMatch(`${entry}\n${proxy}`, /API_KEY|TOKEN|SECRET/);
});
