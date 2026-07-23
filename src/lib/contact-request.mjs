export class ContactRequestError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'ContactRequestError';
    this.code = code;
  }
}

const normalizeText = (value) => String(value ?? '').trim();
const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function submitContactRequest({ payload, fetchImpl = fetch }) {
  const normalized = {
    name: normalizeText(payload.name),
    email: normalizeText(payload.email).toLowerCase(),
    phone: normalizeText(payload.phone),
    company: normalizeText(payload.company),
    message: normalizeText(payload.message),
    locale: normalizeText(payload.locale),
    website: normalizeText(payload.website),
  };

  if (
    !normalized.name ||
    !validEmail(normalized.email) ||
    !normalized.phone ||
    !normalized.company ||
    normalized.message.length < 20 ||
    !['en', 'es'].includes(normalized.locale)
  ) {
    throw new ContactRequestError('invalid_request', 'The contact information is incomplete.');
  }

  let response;
  try {
    response = await fetchImpl('/api/team-demo-requests', {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(normalized),
    });
  } catch (error) {
    throw new ContactRequestError('network_error', error instanceof Error ? error.message : 'Network error');
  }

  if (response.status !== 202) {
    throw new ContactRequestError(response.status === 429 ? 'rate_limited' : 'request_failed', `The request endpoint returned ${response.status}.`);
  }

  return { accepted: true };
}
