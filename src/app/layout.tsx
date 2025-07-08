import type { Metadata } from "next";
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

// Client-side URL cleaner component
function URLCleaner() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            if (typeof window !== 'undefined' && window.location.search) {
              const url = new URL(window.location.href);
              const trackingParams = ['fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'msclkid'];
              let cleaned = false;
              
              trackingParams.forEach(param => {
                if (url.searchParams.has(param)) {
                  url.searchParams.delete(param);
                  cleaned = true;
                }
              });
              
              if (cleaned) {
                window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
              }
            }
          })();
        `
      }}
    />
  );
}

export const metadata: Metadata = {
  title: "Entropy",
  description: "A minimalist blog exploring ideas in technology and design",
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
