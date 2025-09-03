import type { MetadataRoute } from 'next';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://entropy-blog.vercel.app';

  // Static routes
  const routes = ['', '/about', '/ai', '/tweets', '/quotes'].map((route) => ({
    url: `${baseUrl}${route || '/'}`,
    lastModified: new Date(),
  }));

  // Blog posts from src/app/posts (exclude private)
  const postsDir = path.join(process.cwd(), 'src/app/posts');
  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const files = await fs.readdir(postsDir);
    const mdFiles = files.filter((f) => /\.mdx?$/.test(f) && !f.startsWith('.'));

    const entries = await Promise.all(
      mdFiles.map(async (filename) => {
        try {
          const filePath = path.join(postsDir, filename);
          const fileContent = await fs.readFile(filePath, 'utf8');
          const { data } = matter(fileContent);
          if (data.private) return null;
          const slug = filename.replace(/\.mdx?$/, '');
          return {
            url: `${baseUrl}/posts/${slug}`,
            lastModified: data.date ? new Date(data.date) : new Date(),
          } as const;
        } catch {
          return null;
        }
      })
    );
    postEntries = entries.filter(Boolean) as MetadataRoute.Sitemap;
  } catch {
    postEntries = [];
  }

  return [...routes, ...postEntries];
}


