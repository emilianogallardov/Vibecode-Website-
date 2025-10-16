/**
 * Verify Cloudflare Turnstile token
 */
export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY not configured');
    return false;
  }

  // Input validation
  if (!token || typeof token !== 'string' || token.length > 2048) {
    console.error('Invalid Turnstile token format');
    return false;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: ip,
      }),
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      console.error('Turnstile API returned error status:', response.status);
      return false;
    }

    const data = await response.json();

    // Verify response structure
    if (typeof data !== 'object' || data === null) {
      console.error('Invalid Turnstile API response format');
      return false;
    }

    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}