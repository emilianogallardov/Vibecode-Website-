/**
 * Patterns Index
 * 
 * Central export for all reusable patterns.
 * Import from here for cleaner imports in your components.
 * 
 * @example
 * import { useForm, Spinner, ErrorBoundary } from '@/patterns';
 */

export * from './api-client';
export * from './form-handler';
export * from './loading-state';

// Error boundary needs default export
export { ErrorBoundary, useErrorHandler } from './error-boundary';