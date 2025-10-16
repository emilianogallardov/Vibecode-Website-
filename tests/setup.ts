import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock fetch for Node.js environment
if (typeof global.fetch === 'undefined') {
  global.fetch = async () => {
    return {
      ok: true,
      json: async () => ({}),
    } as Response;
  };
}

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: (props: any) => {
    return React.createElement('img', props);
  },
}));