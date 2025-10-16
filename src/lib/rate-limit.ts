import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// In-memory rate limiter for development
class InMemoryRateLimit {
  private requests: Map<string, number[]> = new Map();

  async check(identifier: string, options?: { limit?: number; window?: string }) {
    const now = Date.now();

    // Parse limit and window from options
    const limit = options?.limit || 5;
    const window = options?.window ? this.parseWindow(options.window) : 3600000; // Default 1 hour

    const requests = this.requests.get(identifier) || [];

    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < window);

    if (validRequests.length >= limit) {
      return {
        success: false,
        remaining: 0,
        limit,
        reset: Math.min(...validRequests) + window,
      };
    }

    // Add new request
    validRequests.push(now);
    this.requests.set(identifier, validRequests);

    return {
      success: true,
      remaining: limit - validRequests.length,
      limit,
      reset: now + window,
    };
  }

  private parseWindow(window: string): number {
    // Parse window string like "1h", "30m", "1d"
    const match = window.match(/^(\d+)\s*(s|m|h|d)$/);
    if (!match) return 3600000; // Default 1 hour

    const value = parseInt(match[1]);
    const unit = match[2];

    const multipliers: Record<string, number> = {
      's': 1000,
      'm': 60 * 1000,
      'h': 60 * 60 * 1000,
      'd': 24 * 60 * 60 * 1000,
    };

    return value * (multipliers[unit] || 3600000);
  }

  async limitRequests(identifier: string) {
    return this.check(identifier);
  }
}

// Rate limiter interface for type safety
interface RateLimiter {
  check(identifier: string, options?: { limit?: number; window?: string }): Promise<{
    success: boolean;
    remaining: number;
    limit: number;
    reset: number;
  }>;
}

// Create rate limiter with fallback
let rateLimit: RateLimiter;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const upstashLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests per hour
      analytics: true,
      prefix: 'contact-form',
    });

    // Create typed wrapper for Upstash Ratelimit
    rateLimit = {
      async check(identifier: string, options?: { limit?: number; window?: string }) {
        const { success, limit: limitValue, reset, remaining } = await upstashLimiter.limit(identifier);
        return { success, remaining, limit: limitValue, reset };
      }
    };
  } catch (error) {
    console.warn('Failed to initialize Upstash rate limiter, using in-memory fallback');
    rateLimit = new InMemoryRateLimit();
  }
} else {
  console.info('Upstash credentials not found, using in-memory rate limiter for development');
  rateLimit = new InMemoryRateLimit();
}

export { rateLimit };