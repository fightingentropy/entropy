import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { formatDate } from './utils';

export const dynamic = 'force-static'; // Ensure static generation

export default async function Home() {
  // Read all markdown files from the posts directory
  const postsDir = path.join(process.cwd(), 'src/app/posts');
  const files = await fs.readdir(postsDir);
  const posts = await Promise.all(
    files.filter(f => f.endsWith('.md')).map(async (filename) => {
      const filePath = path.join(postsDir, filename);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContent);
      return {
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        author: data.author || 'Erlin', // Default to Erlin if not specified
        slug: filename.replace(/\.md$/, ''),
      };
    })
  );
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main style={{
      maxWidth: '680px',
      margin: '0 auto',
      padding: '2rem 1.5rem',
      fontFamily: 'var(--font-geist-sans)',
    }}>
      <div>
        {posts.map((post) => (
          <article key={post.slug} style={{
            borderBottom: '1px solid var(--foreground-alpha)',
            paddingBottom: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2 style={{ 
                fontSize: '1.4rem', 
                fontWeight: 600, 
                letterSpacing: '-0.02em',
                marginBottom: '0.5rem',
                color: 'var(--foreground)',
              }}>
                {post.title}
              </h2>
            </Link>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: 1.5, 
              color: 'var(--foreground)',
              marginBottom: '0.75rem' 
            }}>
              {post.excerpt}
            </p>
            <div style={{ 
              fontSize: '0.9rem', 
              color: 'var(--foreground-secondary)',
            }}>
              <span>{post.author}</span>
              <span style={{ margin: '0 0.5rem' }}>•</span>
              <span>{formatDate(post.date)}</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
