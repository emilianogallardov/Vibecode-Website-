import { describe, it, expect } from 'vitest';
import healthHandler from '../../api/health';

describe('Health Check', () => {
  it('health endpoint handler returns ok status', () => {
    // Test the actual health handler
    const response = healthHandler();
    
    // Verify response is a Response object
    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(200);
    
    // Headers should be set correctly
    expect(response.headers.get('content-type')).toBe('application/json; charset=utf-8');
    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it('health endpoint returns valid JSON with ok flag', async () => {
    const response = healthHandler();
    const data = await response.json();
    
    expect(data.ok).toBe(true);
    expect(data.ts).toBeDefined();
    expect(typeof data.ts).toBe('number');
  });

  it('application configuration is valid', () => {
    // Check that required configuration exists
    expect(process.env.NODE_ENV).toBeDefined();
  });
});