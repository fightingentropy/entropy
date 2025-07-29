"use client";

import { useEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";

export default function ImageHydrator() {
  const rootsRef = useRef<Map<Element, Root>>(new Map());

  useEffect(() => {
    // Find all image placeholder containers
    const containers = document.querySelectorAll('.optimized-img-container');
    
    containers.forEach((container) => {
      const src = container.getAttribute('data-src');
      const alt = container.getAttribute('data-alt') || '';
      
      if (src) {
        // Create a React component for this image
        const ImageComponent = () => (
          <div style={{
            position: 'relative',
            width: '100%',
            height: 'auto',
            maxWidth: '800px',
            margin: '1.5rem auto',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <img
              src={src}
              alt={alt}
              loading="lazy"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                border: 'none',
                outline: 'none',
              }}
              onError={(e) => {
                const target = e.target as HTMLElement;
                if (target.parentElement) {
                  target.parentElement.innerHTML = `
                    <div style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      min-height: 200px;
                      color: #666;
                      font-size: 0.9rem;
                      background-color: #f9f9f9;
                      border: 1px dashed #ddd;
                      border-radius: 4px;
                    ">
                      ❌ Error loading image: ${alt}
                    </div>
                  `;
                }
              }}
            />
          </div>
        );

        // Check if we already have a root for this container
        let root = rootsRef.current.get(container);
        if (!root) {
          root = createRoot(container);
          rootsRef.current.set(container, root);
        }
        
        root.render(<ImageComponent />);
      }
    });

    // Cleanup function to unmount roots when component unmounts
    return () => {
      // Use setTimeout to defer unmounting until after the current render cycle
      setTimeout(() => {
        rootsRef.current.forEach((root) => {
          try {
            root.unmount();
          } catch (error) {
            // Ignore unmount errors that might occur during cleanup
            console.warn('Error unmounting image root:', error);
          }
        });
        rootsRef.current.clear();
      }, 0);
    };
  }, []);

  return null; // This component doesn't render anything itself
} 