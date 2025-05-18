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
      
      <div style={{ marginTop: '3rem', width: '100%', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'center' }}>There is no second best</h2>
        <div style={{ width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
          <video
            controls
            width="100%"
            style={{ borderRadius: '8px' }}
          >
            <source src="/saylor_baby.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </main>
  );
} 