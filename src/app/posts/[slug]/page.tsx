import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatDate } from '../../utils';

// Generate the static paths
export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'src/app/posts');
  const files = await fs.readdir(postsDir);
  
  const mdFiles = files.filter(file => 
    file.endsWith('.md') && 
    !file.startsWith('.')
  );
  
  return mdFiles.map(file => ({
    slug: file.replace(/\.md$/, '')
  }));
}

// Get post data
async function getPostData(slug: string) {
  const postPath = path.join(process.cwd(), 'src/app/posts', `${slug}.md`);
  
  try {
    const fileContent = await fs.readFile(postPath, 'utf8');
    const { data, content } = matter(fileContent);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();
    
    return {
      title: data.title,
      date: data.date,
      content: contentHtml
    };
  } catch (error) {
    notFound();
  }
}

// The page component
export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);
  
  if (!post) {
    notFound();
  }
  
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
            {post.title}
          </h1>
          <div style={{
            fontSize: '0.95rem',
            color: 'var(--foreground-secondary)',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid var(--foreground-alpha)',
            paddingBottom: '1.5rem',
          }}>
            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
          </div>
        </header>
        
        <div 
          style={{ 
            fontSize: '1.15rem', 
            lineHeight: 1.7,
            color: 'var(--foreground)',
          }} 
          dangerouslySetInnerHTML={{ __html: post.content }} 
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