export function BlogListSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <article
          key={i}
          className="group cursor-pointer animate-pulse"
        >
          <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg bg-gray-200" />

          <div className="space-y-3">
            {/* Date skeleton */}
            <div className="h-4 w-24 bg-gray-200 rounded" />

            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 rounded" />
            <div className="h-6 bg-gray-200 rounded w-3/4" />

            {/* Excerpt skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>

            {/* Author and reading time skeleton */}
            <div className="flex items-center gap-4">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}