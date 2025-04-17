import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import Link from 'next/link';
import { formatDate } from '../../utils';

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'src/app/posts');
  const files = await fs.readdir(postsDir);
  // Ensure we only list files, not directories like [slug] itself
  const mdFiles = (await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(postsDir, file);
      try {
        const stat = await fs.stat(filePath);
        return stat.isFile() && file.endsWith('.md') ? file : null;
      } catch {
        return null; // Handle cases where stat fails (e.g., broken symlinks)
      }
    })
  )).filter((file): file is string => file !== null); // Type guard to filter out nulls

  return mdFiles.map(f => ({ slug: f.replace(/\.md$/, '') }));
}

// Cache the post data retrieval function
const getPostData = cache(async (slug: string) => {
  const postPath = path.join(process.cwd(), 'src/app/posts', `${slug}.md`);
  let fileContent;
  try {
    fileContent = await fs.readFile(postPath, 'utf8');
  } catch {
    notFound(); // Trigger 404 if file not found
  }
  const { data, content } = matter(fileContent);
  return { data, content }; // Return raw content
});

export default async function PostPage({ params }: { params: { slug: string } }) {
  // Process the data
  const { data, content } = await getPostData(params.slug);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  // Return JSX
  return (
    <main style={{
      maxWidth: '680px',
      margin: '0 auto',
      padding: '2rem 1.5rem 4rem',
      fontFamily: 'var(--font-geist-sans)',
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link 
          href="/" 
          style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '0.9rem',
            color: 'var(--foreground-secondary)',
            textDecoration: 'none',
            marginBottom: '2rem',
          }}
        >
          ← Back to all posts
        </Link>
      </div>
      
      <article style={{ width: '100%' }}>
        <header style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            color: 'var(--foreground)',
          }}>
            {data.title}
          </h1>
          <div style={{
            fontSize: '0.95rem',
            color: 'var(--foreground-secondary)',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid var(--foreground-alpha)',
            paddingBottom: '1.5rem',
          }}>
            <time dateTime={data.date}>
              {formatDate(data.date)}
            </time>
          </div>
        </header>
        
        <div 
          style={{ 
            fontSize: '1.15rem', 
            lineHeight: 1.7,
            color: 'var(--foreground)',
          }} 
          dangerouslySetInnerHTML={{ __html: contentHtml }} 
          className="prose"
        />
        
        <div style={{ 
          marginTop: '3rem', 
          paddingTop: '2rem',
          borderTop: '1px solid var(--foreground-alpha)',
          fontSize: '0.95rem',
          color: 'var(--foreground-secondary)',
        }}>
          <p>Thanks for reading! Share this post with others who might find it useful.</p>
        </div>
      </article>
    </main>
  );
} 