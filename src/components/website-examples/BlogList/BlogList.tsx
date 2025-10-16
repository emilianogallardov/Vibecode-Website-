import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog';

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article
          key={post.slug}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <Link href={`/blog/${post.slug}`}>
            <div className="relative h-48 bg-gray-200">
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </Link>

          <div className="p-6">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>

            <h2 className="text-xl font-semibold mb-2">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {post.title}
              </Link>
            </h2>

            <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">By {post.author}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Read more →
              </Link>
            </div>

            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}