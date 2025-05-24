"use client";

import LazyVideo from "../components/LazyVideo";

export default function AIPage() {
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
        AI Moments
      </h1>
      
      <LazyVideo 
        src="/We're so cooked, chat. This is going to one-shot Facebook Mom turbo normies. They have no idea what's coming. They're about to be gigafried with A5 Wagyu AI slop..mp4"
        title="We're so cooked"
        containerStyle={{ maxWidth: '900px', width: '100%', margin: '3rem auto 2rem auto' }}
      />
    </main>
  );
} 