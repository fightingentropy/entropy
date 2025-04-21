import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import NavMenu from "./components/NavMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
      </body>
    </html>
  );
}
