import { ContactSchema, type ApiResponse } from '../src/shared/contracts';

const APP_ORIGIN = (process.env.APP_ORIGIN || 'http://localhost:3000').replace(/\/+$/, '');

function json(body: ApiResponse, status = 200, varyOrigin = false) {
  const headers: Record<string, string> = {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  };
  if (varyOrigin) headers['vary'] = 'origin';
  return new Response(JSON.stringify(body), { status, headers });
}

export default async function handler(req: Request): Promise<Response> {
  // Method check (JSON response)
  if (req.method !== 'POST') {
    return json({ ok: false, code: 'METHOD_NOT_ALLOWED', message: 'Use POST' }, 405);
  }

  // Origin lock (CSRF)
  const origin = (req.headers.get('origin') || '').replace(/\/+$/, '');
  if (origin && origin !== APP_ORIGIN) {
    return json({ ok: false, code: 'FORBIDDEN', message: 'Invalid origin' }, 403, true);
  }

  // Size cap (safe parse)
  const cl = req.headers.get('content-length');
  const len = cl ? Number.parseInt(cl, 10) : 0;
  if (Number.isFinite(len) && len > 10_000) {
    return json({ ok: false, code: 'PAYLOAD_TOO_LARGE', message: 'Request body too large' }, 413);
  }

  // Parse body
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return json({ ok: false, code: 'BAD_REQUEST', message: 'Invalid JSON' }, 400);
  }

  // Validate
  const parsed = ContactSchema.safeParse(data);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Invalid input',
        issues: parsed.error.flatten(),
      },
      422
    );
  }

  const { hp, timestamp } = parsed.data;

  // Honeypot ’ silent success
  if (hp) return json({ ok: true }, 200);

  // Too-fast submission (optional gate)
  if (timestamp && Date.now() - timestamp < 2000) {
    return json({ ok: false, code: 'TOO_FAST', message: 'Please take your time' }, 429);
  }

  // TODO: send email / persist data here
  return json({ ok: true, data: { message: 'Message received' } }, 200);
}