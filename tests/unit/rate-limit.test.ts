import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the environment to use in-memory rate limiter
vi.stubEnv('UPSTASH_REDIS_REST_URL', '');
vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '');

describe('Rate Limiter', () => {
  let rateLimit: any;

  beforeEach(async () => {
    // Clear the module cache to get fresh instance
    vi.resetModules();
    const module = await import('@/lib/rate-limit');
    rateLimit = module.rateLimit;
  });

  it('should allow requests under the limit', async () => {
    const result = await rateLimit.check('test-ip-1');

    expect(result.success).toBe(true);
    expect(result.remaining).toBeGreaterThanOrEqual(0);
    expect(result.limit).toBeGreaterThan(0);
    expect(result.reset).toBeGreaterThan(Date.now());
  });

  it('should enforce rate limits', async () => {
    const identifier = 'test-ip-2';

    // Make requests up to the limit
    for (let i = 0; i < 5; i++) {
      const result = await rateLimit.check(identifier);
      expect(result.success).toBe(true);
    }

    // Next request should be rate limited
    const blockedResult = await rateLimit.check(identifier);
    expect(blockedResult.success).toBe(false);
    expect(blockedResult.remaining).toBe(0);
  });

  it('should return proper response structure', async () => {
    const result = await rateLimit.check('test-ip-3');

    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('remaining');
    expect(result).toHaveProperty('limit');
    expect(result).toHaveProperty('reset');
    expect(typeof result.success).toBe('boolean');
    expect(typeof result.remaining).toBe('number');
    expect(typeof result.limit).toBe('number');
    expect(typeof result.reset).toBe('number');
  });

  it('should handle different identifiers independently', async () => {
    const result1 = await rateLimit.check('user-1');
    const result2 = await rateLimit.check('user-2');

    expect(result1.success).toBe(true);
    expect(result2.success).toBe(true);
  });
});
