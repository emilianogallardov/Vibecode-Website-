import { headers } from 'next/headers';
import { Analytics } from './Analytics';
import { CookieConsent } from './CookieConsent';

export async function AnalyticsLoader() {
  // Get nonce from headers set by middleware
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') || undefined;

  return (
    <>
      <Analytics nonce={nonce} />
      <CookieConsent />
    </>
  );
}
