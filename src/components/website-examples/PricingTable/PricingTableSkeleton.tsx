export function PricingTableSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-3 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`relative rounded-2xl border ${
            i === 1 ? 'border-gray-300' : 'border-gray-200'
          } bg-white p-8`}
        >
          {/* Popular badge skeleton */}
          {i === 1 && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="h-6 w-24 bg-gray-200 rounded-full" />
            </div>
          )}

          {/* Plan name skeleton */}
          <div className="mb-4">
            <div className="h-7 w-32 bg-gray-200 rounded" />
          </div>

          {/* Price skeleton */}
          <div className="mb-6">
            <div className="flex items-baseline">
              <div className="h-12 w-20 bg-gray-200 rounded" />
              <div className="ml-2 h-5 w-16 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Description skeleton */}
          <div className="mb-8">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded mt-2 w-5/6" />
          </div>

          {/* Features list skeleton */}
          <ul className="mb-8 space-y-4">
            {[...Array(5)].map((_, j) => (
              <li key={j} className="flex items-start">
                <div className="h-5 w-5 bg-gray-200 rounded-full mr-3 mt-0.5 flex-shrink-0" />
                <div className="h-4 bg-gray-200 rounded flex-1" style={{ width: `${80 - j * 10}%` }} />
              </li>
            ))}
          </ul>

          {/* CTA button skeleton */}
          <div className="h-12 bg-gray-200 rounded-lg" />
        </div>
      ))}
    </div>
  );
}