"use client";

import LazyVideo from "../components/LazyVideo";
import TypewriterQuote from "../components/TypewriterQuote";
import { useRef, useEffect, useState } from "react";

const videos = [
  {
    src: "/videos/saylor_apple.mp4",
    title: "Apple & Bitcoin"
  }
];

type TypewriterSection = {
  type: 'typewriter';
  title: string;
};

type VideoSection = {
  type: 'video';
  src: string;
  title: string;
};

type Section = TypewriterSection | VideoSection;

const sections: Section[] = [
  { type: 'typewriter', title: 'Quotes' },
  ...videos.map(video => ({ type: 'video' as const, ...video }))
];

export default function QuotesPage() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current = sectionRefs.current.slice(0, sections.length);
    sections.forEach((_, idx) => {
      if (!sectionRefs.current[idx]) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setActiveIdx(idx);
          }
        },
        { threshold: [0.6] }
      );
      observer.observe(sectionRefs.current[idx]!);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <main style={{ fontFamily: 'var(--font-geist-sans)' }}>
      <div
        style={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          background: 'var(--background)',
        }}
      >
        {sections.map((section, idx) => (
          <section
            key={section.type === 'typewriter' ? 'typewriter' : section.src}
            ref={el => { sectionRefs.current[idx] = el; }}
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              scrollSnapAlign: 'start',
              background: 'var(--background)',
              padding: section.type === 'typewriter' ? '2rem' : 0,
            }}
          >
            {section.type === 'typewriter' ? (
              <TypewriterQuote 
                typingSpeed={40}
                pauseDuration={3000}
              />
            ) : (
              <LazyVideo
                src={section.src}
                title={section.title}
                containerStyle={{ maxWidth: '900px', width: '100%', margin: 0, marginTop: '-10vh' }}
                videoStyle={{ maxHeight: '70vh', width: '100%' }}
                playing={activeIdx === idx}
              />
            )}
          </section>
        ))}
      </div>
    </main>
  );
} 