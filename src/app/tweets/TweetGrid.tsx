"use client";
import { Tweet } from "react-tweet";

export default function TweetGrid({ tweets }: { tweets: { id: string }[] }) {
  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1.2rem",
        justifyItems: "center",
        alignItems: "start",
        padding: "1.5rem 0",
      }}
    >
      {tweets.map((tweet) => (
        <div
          key={tweet.id}
          style={{
            width: "100%",
            maxWidth: 410,
            minWidth: 320,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Tweet id={tweet.id} />
        </div>
      ))}
      <style jsx>{`
        @media (max-width: 1000px) {
          div[style*='grid'] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 700px) {
          div[style*='grid'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
} 