import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { markdownToHtml } from '@/lib/markdown';
import { StructuredData } from '@/components/patterns/seo/StructuredData';

// Revalidate blog posts every hour
export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    image: post.image,
    publishedTime: post.date,
    authors: [post.author],
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Convert markdown to HTML
  const htmlContent = await markdownToHtml(post.content);

  const articleData = {
    title: post.title,
    description: post.excerpt,
    author: post.author,
    datePublished: post.date,
    dateModified: post.updatedAt,
    image: post.image,
    url: `/blog/${slug}`,
  };

  return (
    <>
      <StructuredData type="article" data={articleData} />
      <StructuredData
        type="breadcrumb"
        data={{
          items: [
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: post.title, url: `/blog/${slug}` },
          ]
        }}
      />
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
              <span>•</span>
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
          </header>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </article>
    </>
  );
}