"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  return (
    <div style={{ position: 'relative' }}>
      {/* Hamburger button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '28px',
          width: '36px',
          outline: 'none'
        }}
        aria-label="Toggle navigation menu"
      >
        <span style={{
          display: 'block',
          height: '3px',
          width: '100%',
          background: 'var(--foreground)',
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(45deg) translate(7px, 7px)' : 'none'
        }}></span>
        <span style={{
          display: 'block',
          height: '3px',
          width: '100%',
          background: 'var(--foreground)',
          opacity: isOpen ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}></span>
        <span style={{
          display: 'block',
          height: '3px',
          width: '100%',
          background: 'var(--foreground)',
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none'
        }}></span>
      </button>
      
      {/* Dropdown menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '0.75rem',
          background: 'var(--background)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
          overflow: 'hidden',
          zIndex: 1000,
          minWidth: '180px',
          border: '1px solid var(--foreground-alpha)'
        }}>
          <Link 
            href="/about" 
            onClick={closeMenu}
            style={{
              display: 'block',
              padding: '1.25rem 1.75rem',
              color: 'var(--foreground)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--foreground-alpha)',
              fontSize: '1.1rem'
            }}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            onClick={closeMenu}
            style={{
              display: 'block',
              padding: '1.25rem 1.75rem',
              color: 'var(--foreground)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--foreground-alpha)',
              fontSize: '1.1rem'
            }}
          >
            Contact
          </Link>
          <Link 
            href="/funny" 
            onClick={closeMenu}
            style={{
              display: 'block',
              padding: '1.25rem 1.75rem',
              color: 'var(--foreground)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--foreground-alpha)',
              fontSize: '1.1rem'
            }}
          >
            Funny
          </Link>
          <Link 
            href="/ai" 
            onClick={closeMenu}
            style={{
              display: 'block',
              padding: '1.25rem 1.75rem',
              color: 'var(--foreground)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--foreground-alpha)',
              fontSize: '1.1rem'
            }}
          >
            AI
          </Link>
          <Link 
            href="/tweets" 
            onClick={closeMenu}
            style={{
              display: 'block',
              padding: '1.25rem 1.75rem',
              color: 'var(--foreground)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--foreground-alpha)',
              fontSize: '1.1rem'
            }}
          >
            Tweets
          </Link>
          <Link 
            href="/quotes" 
            onClick={closeMenu}
            style={{
              display: 'block',
              padding: '1.25rem 1.75rem',
              color: 'var(--foreground)',
              textDecoration: 'none',
              fontSize: '1.1rem'
            }}
          >
            Quotes
          </Link>
        </div>
      )}
    </div>
  );
} 