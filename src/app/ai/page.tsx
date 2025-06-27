"use client";

import LazyVideo from "../components/LazyVideo";
import { useRef, useEffect, useState } from "react";

const videos = [
  {
    src: "/videos/bitcoin or saylor babay.mp4",
    title: "Bitcoin or Saylor Babay"
  },
  {
    src: "/videos/it's over.mp4",
    title: "It's Over"
  },
  {
    src: "/videos/We're so cooked, chat. This is going to one-shot Facebook Mom turbo normies. They have no idea what's coming. They're about to be gigafried with A5 Wagyu AI slop..mp4",
    title: "We're so cooked"
  },
  {
    src: "/videos/prompt_theory.mp4",
    title: "Prompt Theory"
  },
  {
    src: "/videos/puppramin.mp4",
    title: "Puppramin"
  },
  {
    src: "/videos/This is brilliant. They nailed almost every single influencer archetype. God help us all 💀.mp4",
    title: "Influencer Archetypes"
  },
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

export default function AIPage() {
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
              containerStyle={{ maxWidth: '900px', width: '100%', margin: 0, marginTop: '-10vh' }}
              videoStyle={{ maxHeight: '70vh', width: '100%' }}
              playing={activeIdx === idx}
            />
          </section>
        ))}
      </div>
    </main>
  );
} 