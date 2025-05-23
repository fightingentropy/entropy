import LazyVideo from "../components/LazyVideo";

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
      
      <div style={{ marginTop: '2rem', width: '100%', maxWidth: '600px' }}>
        <LazyVideo 
          src="/saylor_baby.mp4"
          title="There is no second best"
          containerStyle={{
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        />
      </div>
    </main>
  );
} 