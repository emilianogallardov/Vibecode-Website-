import type { Metadata } from 'next';
import { BlogList } from '@/components/website-examples/BlogList/BlogList';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { getAllPosts } from '@/lib/blog';

// Revalidate blog index every hour
export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: 'Blog',
  description: 'Insights, tutorials, and updates from our team',
  path: '/blog',
});

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-gray-600">
          Insights, tutorials, and updates from our team
        </p>
      </div>

      <BlogList posts={posts} />
    </div>
  );
}