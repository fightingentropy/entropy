import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
import Link from "next/link";
import NavMenu from "./components/NavMenu";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';

// Client-side URL cleaner using Next Script
function URLCleaner() {
  return (
    <Script id="url-cleaner" strategy="afterInteractive">
      {`
        (function() {
          try {
            if (typeof window !== 'undefined' && window.location.search) {
              var url = new URL(window.location.href);
              var trackingParams = ['fbclid','utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','msclkid'];
              var cleaned = false;
              for (var i = 0; i < trackingParams.length; i++) {
                var p = trackingParams[i];
                if (url.searchParams.has(p)) {
                  url.searchParams.delete(p);
                  cleaned = true;
                }
              }
              if (cleaned) {
                window.history.replaceState({}, document.title, url.pathname + (url.search ? ('?' + url.searchParams.toString()) : '') + url.hash);
              }
            }
          } catch (e) {}
        })();
      `}
    </Script>
  );
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://entropy-blog.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Entropy",
    template: "%s | Entropy",
  },
  description: "A minimalist blog exploring ideas in technology and design",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "Entropy",
    url: baseUrl,
    type: 'website',
    title: "Entropy",
    description: "A minimalist blog exploring ideas in technology and design",
  },
  twitter: {
    card: 'summary_large_image',
    site: '@entropyholdings',
    creator: '@entropyholdings',
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#f9f9f9' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <URLCleaner />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <nav style={{
            width: '100%',
            maxWidth: 900,
            margin: '0 auto',
            padding: '2rem 1rem 1.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <Link href="/" style={{ 
              fontWeight: 700, 
              fontSize: '1.3rem', 
              letterSpacing: '-0.02em', 
              color: 'var(--foreground)',
              textDecoration: 'none'
            }}>
              Entropy
            </Link>
            <NavMenu />
          </nav>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
