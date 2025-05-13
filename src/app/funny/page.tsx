"use client";

import { useRef } from "react";

export default function FunnyPage() {
  const swimVideoRef = useRef<HTMLVideoElement>(null);
  const chineseVideoRef = useRef<HTMLVideoElement>(null);
  const koreansVideoRef = useRef<HTMLVideoElement>(null);

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
        Theo Von Highlights
      </h1>
      
      {/* First video - Can't Swim */}
      <div style={videoContainerStyle}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 600, 
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
        }}>
          Turn off: Can't Swim
        </h2>
        <video 
          ref={swimVideoRef}
          controls
          style={videoStyle}
        >
          <source src="/theo von can't swim.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Second video - Chinese */}
      <div style={videoContainerStyle}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 600, 
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
        }}>
          Chinese
        </h2>
        <video 
          ref={chineseVideoRef}
          controls
          style={videoStyle}
        >
          <source src="/theo von chinese.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Third video - Koreans */}
      <div style={videoContainerStyle}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 600, 
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
        }}>
          Koreans
        </h2>
        <video 
          ref={koreansVideoRef}
          controls
          style={videoStyle}
        >
          <source src="/theo von koreans.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </main>
  );
} 