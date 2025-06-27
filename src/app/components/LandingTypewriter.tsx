"use client";

import TypewriterQuote from './TypewriterQuote';

export default function LandingTypewriter() {
  return (
    <section style={{
      minHeight: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1rem',
      background: 'var(--background)',
    }}>
      <TypewriterQuote 
        typingSpeed={35}
        pauseDuration={3500}
      />
    </section>
  );
} 