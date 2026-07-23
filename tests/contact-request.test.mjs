import assert from 'node:assert/strict';
import { test } from 'node:test';
import { submitContactRequest } from '../src/lib/contact-request.mjs';

const payload = {
  name: ' Ada Lovelace ',
  email: ' ADA@EXAMPLE.COM ',
  phone: ' +1 555 0100 ',
  company: ' Analytical Engines ',
  message: 'Automate monthly operations reporting.',
  locale: 'en',
  website: '',
};

test('browser client posts the normalized lead to the same-origin function', async () => {
  let request;
  const result = await submitContactRequest({
    payload,
    fetchImpl: async (url, options) => {
      request = { url, options };
      return { status: 202 };
    },
  });

  assert.deepEqual(result, { accepted: true });
  assert.equal(request.url, '/api/team-demo-requests');
  assert.equal(request.options.method, 'POST');
  assert.deepEqual(JSON.parse(request.options.body), {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    phone: '+1 555 0100',
    company: 'Analytical Engines',
    message: 'Automate monthly operations reporting.',
    locale: 'en',
    website: '',
  });
});

test('browser client rejects incomplete input before sending', async () => {
  for (const invalid of [{ email: 'invalid' }, { phone: '' }, { company: '' }, { message: 'Too short' }, { locale: 'fr' }]) {
    let called = false;
    await assert.rejects(
      submitContactRequest({ payload: { ...payload, ...invalid }, fetchImpl: async () => { called = true; } }),
      { code: 'invalid_request' },
    );
    assert.equal(called, false);
  }
});

test('browser client maps network, rate-limit, and proxy failures', async () => {
  await assert.rejects(submitContactRequest({ payload, fetchImpl: async () => { throw new Error('offline'); } }), { code: 'network_error' });
  await assert.rejects(submitContactRequest({ payload, fetchImpl: async () => ({ status: 429 }) }), { code: 'rate_limited' });
  await assert.rejects(submitContactRequest({ payload, fetchImpl: async () => ({ status: 502 }) }), { code: 'request_failed' });
});
