import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatDate } from '../../utils';
import ImageHydrator from '../../components/ImageHydrator';

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

// Function to make links open in new tabs and apply custom styling
function addTargetBlankToLinks(content: string): string {
  return content.replace(
    /<a\s+href="(https?:\/\/[^"]+)">/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" style="font-size: 0.85rem; font-style: italic; text-decoration: none; border-bottom: 1px solid rgba(128, 128, 128, 0.4); padding-bottom: 1px;">'
  );
}

// Function to optimize images in HTML content
function optimizeImages(content: string): string {
  return content.replace(
    /<img\s+src="([^"]+)"\s+alt="([^"]*)"[^>]*>/g,
    (match, src, alt) => {
      // Create a placeholder div that will be hydrated on the client side
      return `<div 
        class="optimized-img-container" 
        data-src="${src}" 
        data-alt="${alt}"
        style="
          width: 100%; 
          max-width: 800px; 
          margin: 1.5rem auto; 
          min-height: 200px; 
          background-color: #f5f5f5; 
          border-radius: 4px; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          color: #666;
          font-size: 0.9rem;
        "
      >
        🖼️ Loading optimized image: ${alt}
      </div>`;
    }
  );
}

// Get post data
async function getPostData(slug: string) {
  const postPath = path.join(process.cwd(), 'src/app/posts', `${slug}.md`);
  
  try {
    const fileContent = await fs.readFile(postPath, 'utf8');
    const { data, content } = matter(fileContent);
    const processedContent = await remark().use(html).process(content);
    let contentHtml = processedContent.toString();
    
    // Add target="_blank" to all external links
    contentHtml = addTargetBlankToLinks(contentHtml);
    
    // Optimize images in the content
    contentHtml = optimizeImages(contentHtml);
    
    return {
      title: data.title,
      date: data.date,
      author: data.author || 'Erlin', // Default to Erlin if not specified
      content: contentHtml,
      private: data.private || false,
    };
  } catch {
    notFound();
  }
}

// The page component
export default async function Page({ params }: { params: { slug: string } }) {
  // Explicit workaround for Next.js dev warning
  const resolvedParams = await Promise.resolve(params);
  const post = await getPostData(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <>
      <ImageHydrator />
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
              {post.private && (
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.9rem',
                  fontWeight: 'normal',
                  color: 'var(--foreground-secondary)',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  marginLeft: '1rem',
                  verticalAlign: 'middle',
                }}>
                  Private
                </span>
              )}
            </h1>
            <div style={{
              fontSize: '0.95rem',
              color: 'var(--foreground-secondary)',
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid var(--foreground-alpha)',
              paddingBottom: '1.5rem',
            }}>
              <span>{post.author}</span>
              <span style={{ margin: '0 0.5rem' }}>•</span>
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
    </>
  );
} 