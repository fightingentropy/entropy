"use client";

import LazyVideo from "../components/LazyVideo";

export default function QuotesPage() {
  return (
    <main style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem 1.5rem',
      fontFamily: 'var(--font-geist-sans)',
    }}>
      <h1 style={{ 
        fontSize: '2rem', 
        fontWeight: 600, 
        marginBottom: '2.5rem',
        letterSpacing: '-0.02em',
        textAlign: 'center',
      }}>
        Michael Saylor Quotes
      </h1>
      
      <LazyVideo 
        src="/saylor_apple.mp4"
        title="Apple & Bitcoin"
        containerStyle={{
          margin: '0 auto',
        }}
      />
    </main>
  );
} 