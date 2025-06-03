"use client";

import { useRef, useState, useEffect } from "react";

interface LazyVideoProps {
  src: string;
  title: string;
  containerStyle?: React.CSSProperties;
  videoStyle?: React.CSSProperties;
  playing?: boolean;
}

export default function LazyVideo({ 
  src, 
  title, 
  containerStyle = {},
  videoStyle = {},
  playing = false
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect(); // Stop observing once video should load
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;
    if (videoRef.current) {
      if (playing) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [playing, isIntersecting]);

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  const handleVideoError = () => {
    setHasError(true);
  };

  const defaultContainerStyle = {
    width: '70%',
    maxWidth: '600px',
    margin: '3rem auto 2rem auto', // Increased top margin for better spacing
    ...containerStyle
  };

  const videoContainerStyle = {
    position: 'relative' as const,
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    minHeight: '200px', // Prevent layout shift
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  };

  const defaultVideoStyle = {
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: '8px',
    ...videoStyle
  };

  const placeholderStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    color: '#666',
    fontSize: '1rem',
  };

  return (
    <div style={defaultContainerStyle}>
      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 600, 
        marginBottom: '1.5rem', // Increased bottom margin
        letterSpacing: '-0.02em',
        textAlign: 'left',
        color: 'var(--foreground)',
      }}>
        {title}
      </h2>
      
      <div ref={containerRef} style={videoContainerStyle}>
        {hasError ? (
          <div style={placeholderStyle}>
            <div>❌ Error loading video</div>
            <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              &ldquo;{title}&rdquo; could not be loaded
            </div>
          </div>
        ) : !isIntersecting ? (
          <div style={placeholderStyle}>
            <div>📹 Video loading...</div>
            <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              {title}
            </div>
          </div>
        ) : (
          <>
            {!isLoaded && (
              <div style={{
                ...placeholderStyle,
                position: 'absolute',
                backgroundColor: 'rgba(245, 245, 245, 0.9)',
                width: '100%',
                height: '100%',
                borderRadius: '8px',
              }}>
                <div>⏳ Loading video...</div>
              </div>
            )}
            <video 
              ref={videoRef}
              controls
              preload="metadata"
              style={{
                ...defaultVideoStyle,
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
              aria-label={`Video: ${title}`}
            >
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </>
        )}
      </div>
    </div>
  );
} 