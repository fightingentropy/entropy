"use client";

import { useEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";

export default function ImageHydrator() {
  const rootsRef = useRef<Map<Element, Root>>(new Map());
  const processedContainersRef = useRef<Set<Element>>(new Set());

  const hydrateImages = () => {
    // Find all image placeholder containers that haven't been processed yet
    const containers = document.querySelectorAll('.optimized-img-container');
    
    containers.forEach((container) => {
      // Skip if already processed
      if (processedContainersRef.current.has(container)) {
        return;
      }

      const src = container.getAttribute('data-src');
      const alt = container.getAttribute('data-alt') || '';
      
      if (src) {
        // Mark as processed
        processedContainersRef.current.add(container);

        // Create a React component for this image
        const ImageComponent = () => (
          <div style={{
            position: 'relative',
            width: '100%',
            height: 'auto',
            maxWidth: '800px',
            margin: '0 auto',
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
  };

  useEffect(() => {
    // Initial hydration attempt
    hydrateImages();

    // Retry after a short delay in case content wasn't ready
    const retryTimeout = setTimeout(() => {
      hydrateImages();
    }, 100);

    // Watch for DOM changes in case new content is added dynamically
    const observer = new MutationObserver((mutations) => {
      let shouldRetry = false;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            // Check if the added node contains image containers
            if (element.classList?.contains('optimized-img-container') || 
                element.querySelector?.('.optimized-img-container')) {
              shouldRetry = true;
            }
          }
        });
      });
      
      if (shouldRetry) {
        // Small delay to ensure DOM is stable
        setTimeout(hydrateImages, 50);
      }
    });

    // Observe changes to the document body
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup function
    return () => {
      clearTimeout(retryTimeout);
      observer.disconnect();
      
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
        processedContainersRef.current.clear();
      }, 0);
    };
  }, []); // Empty dependency array since we want this to run once on mount

  return null; // This component doesn't render anything itself
} 