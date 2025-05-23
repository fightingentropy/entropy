"use client";

import LazyVideo from "../components/LazyVideo";

export default function FunnyPage() {
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
        marginBottom: '1.5rem',
        letterSpacing: '-0.02em',
        textAlign: 'center',
      }}>
        Theo Von Highlights
      </h1>
      
      <LazyVideo 
        src="/theo von can't swim.mp4"
        title="Turn off: Can't Swim"
      />
      
      <LazyVideo 
        src="/theo von chinese.mp4"
        title="Chinese"
      />
      
      <LazyVideo 
        src="/theo von koreans.mp4"
        title="Koreans"
      />
      
      <LazyVideo 
        src="/Scam Yong Un.mp4"
        title="Scam Yong Un"
      />
    </main>
  );
} 