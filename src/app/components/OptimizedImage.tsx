"use client";

import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  width = 800, 
  height = 600,
  className = "",
  priority = false 
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div 
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: 'auto',
        maxWidth: width,
        margin: '1.5rem auto',
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: isLoading ? '#f5f5f5' : 'transparent',
        transition: 'background-color 0.3s ease',
      }}
    >
      {hasError ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          color: '#666',
          fontSize: '0.9rem',
          backgroundColor: '#f9f9f9',
          border: '1px dashed #ddd',
        }}>
          ❌ Error loading image: {alt}
        </div>
      ) : (
        <>
          {isLoading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f5f5',
              zIndex: 1,
            }}>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>
                🖼️ Loading image...
              </div>
            </div>
          )}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.3s ease',
            }}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
          />
        </>
      )}
    </div>
  );
} 