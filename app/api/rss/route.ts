import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';
import { generateRSSFeed } from '@/lib/rss';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const posts = await getAllPosts();
    const rssFeed = generateRSSFeed(posts);

    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('RSS feed generation error:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}