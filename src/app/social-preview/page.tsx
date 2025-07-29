export default function SocialPreviewPage() {
  return (
    <main style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'var(--font-geist-sans)',
      background: 'var(--background)',
      color: 'var(--foreground)',
      minHeight: '100vh',
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 700, 
        marginBottom: '1rem',
        textAlign: 'center' 
      }}>
        Social Media Cards Preview
      </h1>
      
      <p style={{ 
        textAlign: 'center', 
        color: 'var(--foreground-secondary)',
        marginBottom: '3rem' 
      }}>
        Preview of Instagram cards for "The Jackpot Age" blog post
      </p>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          fontSize: '1.75rem', 
          fontWeight: 600, 
          marginBottom: '2rem' 
        }}>
          Instagram Stories (9:16)
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ textAlign: 'center' }}>
              <img 
                src={`/social-cards/jackpot-age-story-${i}.png`}
                alt={`Instagram Story Card ${i}`}
                style={{
                  width: '100%',
                  maxWidth: '200px',
                  height: 'auto',
                  borderRadius: '8px',
                  border: '1px solid var(--foreground-alpha)',
                }}
              />
              <p style={{ 
                marginTop: '0.5rem', 
                fontSize: '0.9rem',
                color: 'var(--foreground-secondary)' 
              }}>
                Story Card {i}
              </p>
            </div>
          ))}
        </div>
        
        <p style={{ 
          fontSize: '0.9rem',
          color: 'var(--foreground-secondary)',
          fontStyle: 'italic' 
        }}>
          Upload these to Instagram Stories with link stickers pointing to your blog post
        </p>
      </section>

      <section>
        <h2 style={{ 
          fontSize: '1.75rem', 
          fontWeight: 600, 
          marginBottom: '2rem' 
        }}>
          Instagram Feed Post (1:1)
        </h2>
        
        <div style={{ 
          textAlign: 'center',
          marginBottom: '2rem' 
        }}>
          <img 
            src="/social-cards/jackpot-age-post.png"
            alt="Instagram Post Card"
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
              borderRadius: '8px',
              border: '1px solid var(--foreground-alpha)',
            }}
          />
          <p style={{ 
            marginTop: '0.5rem', 
            fontSize: '0.9rem',
            color: 'var(--foreground-secondary)' 
          }}>
            Main Feed Post
          </p>
        </div>
        
        <p style={{ 
          fontSize: '0.9rem',
          color: 'var(--foreground-secondary)',
          fontStyle: 'italic' 
        }}>
          Use this for your main Instagram feed post with your blog link in the caption
        </p>
      </section>

      <div style={{
        marginTop: '4rem',
        padding: '2rem',
        backgroundColor: 'var(--background-secondary)',
        borderRadius: '8px',
        textAlign: 'center',
      }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 600, 
          marginBottom: '1rem' 
        }}>
          Next Steps
        </h3>
        <p style={{ 
          fontSize: '0.95rem',
          color: 'var(--foreground-secondary)',
          marginBottom: '1rem' 
        }}>
          1. Download the cards you want to use<br/>
          2. Upload to Instagram with your blog link<br/>
          3. Your blog post now has rich Open Graph previews when shared
        </p>
        <a 
          href="/posts/jackpot-age"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--accent)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 500,
          }}
        >
          View Blog Post
        </a>
      </div>
    </main>
  );
} 