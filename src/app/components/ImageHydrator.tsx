"use client";

import { useEffect } from "react";
import Image from "next/image";
import { createRoot } from "react-dom/client";

export default function ImageHydrator() {
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
            <Image
              src={src}
              alt={alt}
              width={800}
              height={600}
              loading="lazy"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
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

        // Replace the placeholder with the optimized image
        const root = createRoot(container);
        root.render(<ImageComponent />);
      }
    });
  }, []);

  return null; // This component doesn't render anything itself
} 