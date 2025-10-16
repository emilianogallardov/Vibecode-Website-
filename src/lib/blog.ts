import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  updatedAt?: string;
  author: string;
  image: string;
  tags: string[];
  readingTime: string;
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // Create directory if it doesn't exist
    await fs.mkdir(POSTS_DIR, { recursive: true });

    const files = await fs.readdir(POSTS_DIR);
    const posts = await Promise.all(
      files
        .filter(file => /\.mdx?$/.test(file))
        .map(async (file) => {
          const filePath = path.join(POSTS_DIR, file);
          const raw = await fs.readFile(filePath, 'utf8');
          const { data, content } = matter(raw);
          const slug = file.replace(/\.mdx?$/, '');

          return {
            slug,
            title: data.title ?? slug,
            excerpt: data.excerpt ?? '',
            content,
            date: data.date ?? new Date().toISOString(),
            author: data.author ?? 'Unknown',
            image: data.image ?? '',
            tags: data.tags ?? [],
            readingTime: readingTime(content).text,
            updatedAt: data.updatedAt,
          };
        })
    );

    return posts.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Try .md first, then .mdx
    let filePath = path.join(POSTS_DIR, `${slug}.md`);
    let raw: string;

    try {
      raw = await fs.readFile(filePath, 'utf8');
    } catch {
      // Fall back to .mdx if .md doesn't exist
      filePath = path.join(POSTS_DIR, `${slug}.mdx`);
      raw = await fs.readFile(filePath, 'utf8');
    }
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      excerpt: data.excerpt ?? '',
      content,
      date: data.date ?? new Date().toISOString(),
      author: data.author ?? 'Unknown',
      image: data.image ?? '',
      tags: data.tags ?? [],
      readingTime: readingTime(content).text,
      updatedAt: data.updatedAt,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}