"use client";

import LazyVideo from "../components/LazyVideo";
import { useRef, useEffect, useState } from "react";

const videos = [
  {
    src: "/videos/theo von can't swim.mp4",
    title: "Turn off: Can't Swim"
  },
  {
    src: "/videos/theo von chinese.mp4",
    title: "Chinese"
  },
  {
    src: "/videos/theo von koreans.mp4",
    title: "Koreans"
  },
  {
    src: "/videos/Scam Yong Un.mp4",
    title: "Scam Yong Un"
  }
];

export default function FunnyPage() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current = sectionRefs.current.slice(0, videos.length);
    videos.forEach((_, idx) => {
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
        {videos.map((video, idx) => (
          <section
            key={video.src}
            ref={el => { sectionRefs.current[idx] = el; }}
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              scrollSnapAlign: 'start',
              background: 'var(--background)',
              padding: 0,
            }}
          >
            <LazyVideo
              src={video.src}
              title={video.title}
              containerStyle={{ maxWidth: '900px', width: '100%', margin: 0 }}
              videoStyle={{ maxHeight: '70vh', width: '100%' }}
              playing={activeIdx === idx}
            />
          </section>
        ))}
      </div>
    </main>
  );
} 