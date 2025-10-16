/**
 * Loading State Pattern
 * 
 * Reusable loading components with skeleton screens,
 * spinners, and accessible announcements.
 */

import React from 'react';

/**
 * Spinner Component
 * Simple animated loading spinner
 */
export function Spinner({ 
  size = 'md',
  className = ''
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3'
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div 
        className={`animate-spin rounded-full border-blue-500 border-t-transparent ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

/**
 * Skeleton Component
 * Placeholder for loading content
 */
export function Skeleton({ 
  className = '',
  lines = 1,
  animate = true
}: {
  className?: string;
  lines?: number;
  animate?: boolean;
}) {
  const baseClass = `bg-gray-200 rounded ${animate ? 'animate-pulse' : ''}`;
  
  if (lines === 1) {
    return <div className={`${baseClass} ${className}`} />;
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className={`${baseClass} h-4 ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          } ${className}`} 
        />
      ))}
    </div>
  );
}

/**
 * Card Skeleton
 * Loading placeholder for card content
 */
export function CardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i}
          className="bg-white rounded-lg border p-4 animate-pulse"
        >
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </>
  );
}

/**
 * Loading Overlay
 * Full-screen or container overlay with spinner
 */
export function LoadingOverlay({ 
  show,
  message = 'Loading...'
}: {
  show: boolean;
  message?: string;
}) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
}

/**
 * Loading State Container
 * Wraps content and shows loading/error/empty states
 */
export function LoadingState<T>({ 
  loading,
  error,
  data,
  renderLoading,
  renderError,
  renderEmpty,
  children
}: {
  loading: boolean;
  error: Error | null;
  data: T | null;
  renderLoading?: () => React.ReactNode;
  renderError?: (error: Error) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  children: (data: T) => React.ReactNode;
}) {
  // Loading state
  if (loading) {
    return <>{renderLoading ? renderLoading() : <Spinner size="lg" />}</>;
  }

  // Error state
  if (error) {
    return (
      <>
        {renderError ? (
          renderError(error)
        ) : (
          <div className="text-center py-8">
            <p className="text-red-600">Error: {error.message}</p>
          </div>
        )}
      </>
    );
  }

  // Empty state
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <>
        {renderEmpty ? (
          renderEmpty()
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No data available</p>
          </div>
        )}
      </>
    );
  }

  // Success state with data
  return <>{children(data)}</>;
}

/**
 * Usage Example:
 * 
 * function UserList() {
 *   const { data, loading, error } = useUsers();
 *   
 *   return (
 *     <LoadingState
 *       loading={loading}
 *       error={error}
 *       data={data}
 *       renderLoading={() => <CardSkeleton count={3} />}
 *       renderEmpty={() => <p>No users found</p>}
 *     >
 *       {(users) => (
 *         <div>
 *           {users.map(user => (
 *             <UserCard key={user.id} user={user} />
 *           ))}
 *         </div>
 *       )}
 *     </LoadingState>
 *   );
 * }
 */