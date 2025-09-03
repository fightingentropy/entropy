"use client";

import Link from "next/link";
import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme/ThemeToggle";

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (target && !menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      const first = itemRefs.current[0];
      first?.focus();
    } else {
      buttonRef.current?.focus();
    }
  }, [isOpen]);

  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
      if (items.length === 0) return;
      const currentIndex = items.findIndex((el) => el === document.activeElement);
      const delta = e.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (currentIndex + delta + items.length) % items.length;
      items[nextIndex]?.focus();
      return;
    }
    if (e.key === 'Tab') {
      const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    }
  };
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <ThemeToggle />
      <div style={{ position: 'relative' }}>
        {/* Hamburger button */}
        <button 
          ref={buttonRef}
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
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls="main-menu"
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setIsOpen(true);
              // focus first item on open via button
              setTimeout(() => itemRefs.current[0]?.focus(), 0);
            }
          }}
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
          <div 
            ref={menuRef}
            id="main-menu"
            role="menu"
            aria-orientation="vertical"
            tabIndex={-1}
            onKeyDown={onMenuKeyDown}
            style={{
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
              prefetch={false}
              role="menuitem"
              ref={(el) => { itemRefs.current[0] = el }}
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
              href="/ai" 
              onClick={closeMenu}
              prefetch={false}
              role="menuitem"
              ref={(el) => { itemRefs.current[1] = el }}
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
              prefetch={false}
              role="menuitem"
              ref={(el) => { itemRefs.current[2] = el }}
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
              prefetch={false}
              role="menuitem"
              ref={(el) => { itemRefs.current[3] = el }}
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
      <style jsx>{`
        button:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
          border-radius: 6px;
        }
        a:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: -2px;
        }
      `}</style>
    </div>
  );
} 