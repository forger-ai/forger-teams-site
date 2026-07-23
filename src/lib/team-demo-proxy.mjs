const UPSTREAM_URL = 'https://platform.forger.cloud/api/team_demo_requests';
const MAX_BODY_LENGTH = 16_000;
const jsonHeaders = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' };
const respond = (body, status, extraHeaders = {}) => new Response(JSON.stringify(body), { status, headers: { ...jsonHeaders, ...extraHeaders } });
const inline = (value) => String(value ?? '').trim().replace(/\s+/g, ' ');
const messageText = (value) => String(value ?? '').trim();
const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateLead = (input) => {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const lead = {
    name: inline(input.name),
    email: inline(input.email).toLowerCase(),
    phone: inline(input.phone),
    company: inline(input.company),
    message: messageText(input.message),
    locale: inline(input.locale),
    website: inline(input.website),
  };
  if (
    !lead.name || lead.name.length > 120 ||
    !validEmail(lead.email) || lead.email.length > 254 ||
    !lead.phone || lead.phone.length > 40 ||
    !lead.company || lead.company.length > 160 ||
    lead.message.length < 20 || lead.message.length > 2_000 ||
    !['en', 'es'].includes(lead.locale)
  ) return null;
  return lead;
};

export async function handleTeamDemoRequest(request, fetchImpl = fetch) {
  if (request.method !== 'POST') return respond({ error: 'method_not_allowed' }, 405, { allow: 'POST' });
  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) return respond({ error: 'unsupported_media_type' }, 415);

  let rawBody;
  try {
    rawBody = await request.text();
  } catch {
    return respond({ error: 'invalid_request' }, 400);
  }
  if (rawBody.length > MAX_BODY_LENGTH) return respond({ error: 'payload_too_large' }, 413);

  let input;
  try {
    input = JSON.parse(rawBody);
  } catch {
    return respond({ error: 'invalid_json' }, 400);
  }

  if (input && typeof input === 'object' && inline(input.website)) return respond({ accepted: true }, 202);
  const lead = validateLead(input);
  if (!lead) return respond({ error: 'invalid_request' }, 400);

  const upstreamPayload = {
    contact_name: lead.name,
    email: lead.email,
    phone: lead.phone,
    use_case: `Company: ${lead.company}\n\n${lead.message}`,
    website: '',
    source: lead.locale === 'es' ? 'website_es' : 'website_en',
  };

  let upstream;
  try {
    upstream = await fetchImpl(UPSTREAM_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(upstreamPayload),
    });
  } catch {
    return respond({ error: 'upstream_unavailable' }, 502);
  }

  if (upstream.status === 202) return respond({ accepted: true }, 202);
  if (upstream.status === 429) return respond({ error: 'rate_limited' }, 429);
  return respond({ error: 'upstream_unavailable' }, 502);
}
