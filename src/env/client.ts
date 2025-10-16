import { z } from 'zod';

const ClientSchema = z.object({
  // Public environment variables (NEXT_PUBLIC_*)
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_GA_ID: z.string().regex(/^G-[A-Z0-9]+$/).optional(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
});

// Parse and validate client environment variables
const parsed = ClientSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
});

if (!parsed.success) {
  console.error(
    '❌ Invalid client environment variables:',
    JSON.stringify(parsed.error.flatten().fieldErrors, null, 2)
  );
  // Only throw in production
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Invalid client environment variables');
  }
}

export const publicEnv = parsed.success
  ? parsed.data
  : {
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
      NEXT_PUBLIC_GA_ID: undefined,
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: undefined,
    };

// Helper exports
export const siteUrl = publicEnv.NEXT_PUBLIC_SITE_URL;
export const gaId = publicEnv.NEXT_PUBLIC_GA_ID;
export const turnstileSiteKey = publicEnv.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Feature flags
export const features = {
  analytics: Boolean(gaId),
  captcha: Boolean(turnstileSiteKey),
};