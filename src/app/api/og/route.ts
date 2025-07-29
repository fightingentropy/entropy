import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Entropy Blog';
  const excerpt = searchParams.get('excerpt') || 'Exploring ideas in technology and design';

  // For now, return a simple SVG-based image
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0a0a"/>
          <stop offset="100%" style="stop-color:#171717"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      
      <!-- Title -->
      <text x="60" y="180" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="#ededed" text-anchor="start">
        ${title.length > 30 ? title.substring(0, 30) + '...' : title}
      </text>
      
      <!-- Excerpt -->
      <text x="60" y="280" font-family="Arial, sans-serif" font-size="32" fill="#a0a0a0" text-anchor="start">
        ${excerpt.length > 80 ? excerpt.substring(0, 80) + '...' : excerpt}
      </text>
      
      <!-- Site name -->
      <text x="60" y="550" font-family="Arial, sans-serif" font-size="24" fill="#666" text-anchor="start">
        entropy-blog.vercel.app
      </text>
      
      <!-- Decorative element -->
      <circle cx="1000" cy="315" r="200" fill="#0070f3" opacity="0.1"/>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
} 