export default function AboutPage() {
  return (
    <main style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '4rem 1rem',
      maxWidth: 700,
      margin: '0 auto',
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>About</h1>
      <p style={{ fontSize: '1.3rem', opacity: 0.8, textAlign: 'center', maxWidth: 600, lineHeight: 1.6 }}>
        In a world of constant change, entropy is unavoidable. This blog embraces the chaos, finding clarity in complexity and meaning in disorder. Here, we explore ideas that challenge the expected and celebrate the unpredictable nature of technology, design, and human experience.
      </p>
      <p style={{ marginTop: '2rem', fontSize: '1.2rem', textAlign: 'center' }}>
        Follow me on: <a href="https://x.com/entropyholdings" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', verticalAlign: 'middle', lineHeight: 0 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 120 120" style={{ verticalAlign: 'middle', background: '#1a232a', borderRadius: '6px' }}>
            <rect width="120" height="120" fill="#1a232a"/>
            <path d="M86.5 20H102L73.5 54.2L106 100H80.7L60.7 73.2L37.8 100H22.1L52.1 63.2L21 20H47.1L65.1 44.2L86.5 20ZM82.1 92.2H89.1L45.1 27.2H37.6L82.1 92.2Z" fill="#fff"/>
          </svg>
        </a> &nbsp;|&nbsp; Reach me at: erlin.hx@gmail.com
      </p>
    </main>
  );
} 