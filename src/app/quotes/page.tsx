"use client";

import { useRef } from "react";

export default function QuotesPage() {
  const saylorAppleVideoRef = useRef<HTMLVideoElement>(null);

  const videoContainerStyle = {
    position: 'relative' as const,
    width: '70%',
    maxWidth: '600px',
    margin: '2rem auto',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  };

  const videoStyle = {
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: '8px',
  };

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
        Michael Saylor Quotes
      </h1>
      
      {/* Saylor Apple Video */}
      <div style={videoContainerStyle}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 600, 
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
        }}>
          Apple & Bitcoin
        </h2>
        <video 
          ref={saylorAppleVideoRef}
          controls
          style={videoStyle}
        >
          <source src="/saylor_apple.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </main>
  );
} 