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
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '0.5rem' }}>Follow my trading experiments:</p>
        <a 
          href="https://app.hyperliquid.xyz/vaults/0x3bba58870898540593bf0e15ff456a84f9482457" 
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: '#222',
            color: '#fff',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
        >
          View HyperLiquid Vault
        </a>
      </div>
    </main>
  );
} 