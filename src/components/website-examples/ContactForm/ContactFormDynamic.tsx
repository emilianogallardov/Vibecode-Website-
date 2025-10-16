'use client';

import dynamic from 'next/dynamic';

// Dynamically import Turnstile to reduce initial bundle size
const Turnstile = dynamic(
  () => import('@marsidev/react-turnstile').then(mod => mod.Turnstile),
  {
    loading: () => (
      <div className="flex justify-center p-4">
        <div className="animate-pulse bg-gray-200 h-16 w-64 rounded"></div>
      </div>
    ),
    ssr: false,
  }
);

// Re-export for use in ContactForm
export { Turnstile };
