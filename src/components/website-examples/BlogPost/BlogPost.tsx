import Image from 'next/image';
import Link from 'next/link';
import { BlogPost as BlogPostType } from '@/lib/blog';

interface BlogPostProps {
  post: BlogPostType;
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Header */}
      <header className="mb-8">
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-700 text-sm mb-4 inline-block"
        >
          ← Back to Blog
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-gray-600">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>•</span>
          <span>{post.readingTime}</span>
          <span>•</span>
          <span>By {post.author}</span>
        </div>

        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Featured Image */}
      {post.image && (
        <div className="relative h-96 mb-8 rounded-lg overflow-hidden bg-gray-200">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none prose-custom">
        {/* In production, this would be MDX content */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Author Bio */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">About the Author</h3>
        <p className="text-gray-600">
          {post.author} is a developer and writer passionate about web technologies.
        </p>
      </div>

      {/* Share Buttons */}
      <div className="mt-8 flex items-center gap-4">
        <span className="text-sm font-medium">Share this article:</span>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
        >
          Twitter
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-800"
        >
          LinkedIn
        </a>
      </div>
    </article>
  );
}