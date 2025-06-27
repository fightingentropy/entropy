"use client";

import { useState, useEffect, useCallback } from 'react';
import { typewriterQuotes } from '../../data/typewriter-quotes';

interface TypewriterQuoteProps {
  typingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function TypewriterQuote({ 
  typingSpeed = 50, 
  pauseDuration = 2000,
  className = "" 
}: TypewriterQuoteProps) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentQuote = typewriterQuotes[currentQuoteIndex];

  const getRandomQuoteIndex = useCallback(() => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * typewriterQuotes.length);
    } while (newIndex === currentQuoteIndex && typewriterQuotes.length > 1);
    return newIndex;
  }, [currentQuoteIndex]);

  useEffect(() => {
    if (!currentQuote) return;

    let timeoutId: NodeJS.Timeout;

    if (isTyping && !isDeleting) {
      // Typing forward
      if (displayText.length < currentQuote.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentQuote.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing, pause before deleting
        timeoutId = setTimeout(() => {
          setIsTyping(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else if (isDeleting) {
      // Deleting/backspacing
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, typingSpeed / 2); // Delete faster than typing
      } else {
        // Finished deleting, pause briefly then start new quote
        timeoutId = setTimeout(() => {
          setCurrentQuoteIndex(getRandomQuoteIndex());
          setIsDeleting(false);
          setIsTyping(true);
        }, 500);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, currentQuote, isTyping, isDeleting, typingSpeed, pauseDuration, getRandomQuoteIndex]);

  return (
    <div className={`typewriter-container ${className}`}>
      <p 
        className="typewriter-text"
        style={{
          minHeight: '3em',
          fontSize: 'clamp(1.2rem, 3vw, 2rem)',
          lineHeight: '1.4',
          fontWeight: '300',
          color: 'var(--foreground)',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        {displayText}
        <span 
          className="cursor"
          style={{
            borderRight: '2px solid var(--foreground)',
            animation: 'blink 1s infinite',
            marginLeft: '2px',
          }}
        />
      </p>
      
      <style jsx>{`
        @keyframes blink {
          0%, 50% { border-color: var(--foreground); }
          51%, 100% { border-color: transparent; }
        }
        
        .typewriter-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          margin-top: -15vh;
        }
        
        .typewriter-text {
          font-family: var(--font-geist-mono, monospace);
        }
      `}</style>
    </div>
  );
} 