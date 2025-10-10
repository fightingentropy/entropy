export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "4rem 1rem",
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <h1
        style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.5rem" }}
      >
        About
      </h1>
      <p
        style={{
          fontSize: "1.3rem",
          opacity: 0.8,
          textAlign: "center",
          maxWidth: 600,
          lineHeight: 1.6,
        }}
      >
        In a world of constant change, entropy is unavoidable. This blog
        embraces the chaos, finding clarity in complexity and meaning in
        disorder. Here, we explore ideas that challenge the expected and
        celebrate the unpredictable nature of technology, design, and human
        experience.
      </p>
      <div
        style={{
          marginTop: "2rem",
          width: "100%",
          maxWidth: 600,
          aspectRatio: "16/9",
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/l0bmJlrhRg4"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "8px" }}
        />
      </div>
      <p style={{ marginTop: "2rem", fontSize: "1.2rem", textAlign: "center" }}>
        Follow me{" "}
        <a
          href="https://x.com/entropyholdings"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3em",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 120 120"
            style={{
              display: "block",
              background: "#1a232a",
              borderRadius: "6px",
              alignSelf: "center",
              flexShrink: 0,
              marginTop: "8px",
            }}
          >
            <rect width="120" height="120" fill="#1a232a" />
            <path
              d="M86.5 20H102L73.5 54.2L106 100H80.7L60.7 73.2L37.8 100H22.1L52.1 63.2L21 20H47.1L65.1 44.2L86.5 20ZM82.1 92.2H89.1L45.1 27.2H37.6L82.1 92.2Z"
              fill="#fff"
            />
          </svg>
        </a>{" "}
        &nbsp;|&nbsp;{" "}
        <a
          href="https://github.com/fightingentropy"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3em",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Github{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 120 120"
            style={{
              display: "block",
              background: "#1a232a",
              borderRadius: "6px",
              alignSelf: "center",
              flexShrink: 0,
            }}
          >
            <rect width="120" height="120" fill="#1a232a" />
            <path
              d="M60 20c-22.1 0-40 17.9-40 40 0 17.7 11.5 32.7 27.4 38 2-.4 2.7-.9 2.7-1.9v-6.6c-11.1 2.4-13.4-5.4-13.4-5.4-1.8-4.6-4.4-5.8-4.4-5.8-3.6-2.5.3-2.4.3-2.4 4 .3 6.1 4.1 6.1 4.1 3.5 6 9.2 4.3 11.4 3.3.4-2.6 1.4-4.3 2.5-5.3-8.7-1-17.8-4.4-17.8-19.4 0-4.3 1.5-7.8 4-10.5-.4-1-1.7-5 .4-10.4 0 0 3.3-1.1 10.8 4 3.1-.9 6.5-1.3 9.8-1.3s6.7.4 9.8 1.3c7.5-5.1 10.8-4 10.8-4 2.1 5.4.8 9.4.4 10.4 2.5 2.7 4 6.2 4 10.5 0 15.1-9.2 18.4-17.9 19.4 1.4 1.2 2.7 3.6 2.7 7.3v10.8c0 1-.7 1.5-2.7 1.9C88.5 92.7 100 77.7 100 60c0-22.1-17.9-40-40-40z"
              fill="#fff"
            />
          </svg>
        </a>
      </p>
    </main>
  );
}
