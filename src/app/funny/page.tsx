"use client";

import { useEffect, useRef } from "react";

export default function FunnyPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play the video when the component mounts
  useEffect(() => {
    if (videoRef.current) {
      // We need to catch potential auto-play restrictions errors
      videoRef.current.play().catch(error => {
        console.log("Auto-play prevented:", error);
      });
    }
  }, []);

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
      }}>
        Theo Von Can't Swim
      </h1>
      
      <div style={{
        position: 'relative',
        width: '100%',
        maxHeight: '80vh',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      }}>
        <video 
          ref={videoRef}
          controls
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        >
          <source src="/theo von can't swim.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </main>
  );
} 