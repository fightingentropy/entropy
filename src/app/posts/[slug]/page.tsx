import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatDate } from '../../utils';
import { Metadata } from 'next';

// Generate the static paths
export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'src/app/posts');
  const files = await fs.readdir(postsDir);

  // Include both .md and .mdx posts to ease migration to MDX
  const postFiles = files.filter(
    (file) => /\.mdx?$/.test(file) && !file.startsWith('.')
  );

  // Read all posts in parallel and exclude those marked as private
  const params = await Promise.all(
    postFiles.map(async (file) => {
      try {
        const fullPath = path.join(postsDir, file);
        const fileContent = await fs.readFile(fullPath, 'utf8');
        const { data } = matter(fileContent);
        if (data.private) {
          return null; // Skip private posts
        }
        return { slug: file.replace(/\.mdx?$/, '') };
      } catch {
        return null; // In case of any read/parse error just skip
      }
    })
  );

  // Filter out nulls (private or errored posts)
  return params.filter(Boolean) as Array<{ slug: string }>;
}

// Function to make links open in new tabs and apply custom styling
function addTargetBlankToLinks(content: string): string {
  return content.replace(
    /<a\s+href="(https?:\/\/[^"]+)">/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" style="font-size: 0.85rem; font-style: italic; text-decoration: none; border-bottom: 1px solid rgba(128, 128, 128, 0.4); padding-bottom: 1px;">'
  );
}

// Function to style images in HTML content
function styleImages(content: string): string {
  return content.replace(
    /<img\s+src="([^"]+)"(?:\s+alt="([^"]*)")?[^>]*>/g,
    (match, src, alt = '') => {
      return `<img 
        src="${src}" 
        alt="${alt}"
        loading="lazy"
        style="
          width: 100%; 
          max-width: 800px; 
          height: auto;
          margin: 0 auto; 
          border-radius: 4px; 
          display: block;
        "
      />`;
    }
  );
}

// Get post data
async function getPostData(slug: string) {
  // Prefer `.mdx`, fallback to legacy `.md`
  const mdxPath = path.join(process.cwd(), 'src/app/posts', `${slug}.mdx`);
  const mdPath = path.join(process.cwd(), 'src/app/posts', `${slug}.md`);

  let fileContent: string | null = null;

  try {
    fileContent = await fs.readFile(mdxPath, 'utf8');
  } catch {
    try {
      fileContent = await fs.readFile(mdPath, 'utf8');
    } catch {
      notFound();
    }
  }

  try {
    if (fileContent === null) {
      notFound();
    }
    const { data, content } = matter(fileContent!);

    // Immediately hide private posts from being rendered
    if (data.private) {
      notFound();
    }
    // Allow raw HTML inside markdown/MDX without sanitizing so that authors can embed HTML freely.
    const processedContent = await remark()
      .use(remarkGfm) // GitHub-flavoured markdown (tables, strikethrough, etc.)
      .use(html, { allowDangerousHtml: true })
      .process(content);
    let contentHtml = processedContent.toString();
    
    // Add target="_blank" to all external links
    contentHtml = addTargetBlankToLinks(contentHtml);
    
    // Style images in the content
    contentHtml = styleImages(contentHtml);
    
    return {
      title: data.title,
      date: data.date,
      author: data.author || 'Erlin', // Default to Erlin if not specified
      content: contentHtml,
      private: data.private || false,
      excerpt: data.excerpt || `Read ${data.title} on Entropy blog`,
    };
  } catch {
    notFound();
  }
}

// Generate metadata for Open Graph sharing
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://entropy-blog.vercel.app';
  
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `${baseUrl}/posts/${slug}`,
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}&excerpt=${encodeURIComponent(post.excerpt)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`${baseUrl}/api/og?title=${encodeURIComponent(post.title)}&excerpt=${encodeURIComponent(post.excerpt)}`],
    },
  };
}

// The page component
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostData(resolvedParams.slug);
  
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
            fontSize: '1rem', // slightly smaller for comfortable reading
            lineHeight: 1.65,
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