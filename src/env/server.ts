import { z } from 'zod';

const ServerSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  // Email configuration
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),
  CONTACT_EMAIL: z.string().email().optional(),

  // Turnstile (CAPTCHA)
  TURNSTILE_SECRET_KEY: z.string().optional(),

  // Rate limiting (Upstash Redis)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // Error tracking
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
});

// Parse and validate environment variables
const parsed = ServerSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(parsed.error.flatten().fieldErrors, null, 2)
  );
  // Only throw in production, warn in development
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Invalid environment variables');
  }
}

export const env = parsed.success ? parsed.data : ({} as z.infer<typeof ServerSchema>);

// Helper exports
export const isDev = env.NODE_ENV === 'development';
export const isProd = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

// Feature flags based on environment
export const features = {
  email: Boolean(env.RESEND_API_KEY && env.EMAIL_FROM),
  captcha: Boolean(env.TURNSTILE_SECRET_KEY),
  rateLimit: Boolean(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN),
  errorTracking: Boolean(env.SENTRY_DSN),
};