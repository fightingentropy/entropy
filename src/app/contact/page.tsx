export default function ContactPage() {
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
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Contact</h1>
      <p style={{ fontSize: '1.3rem', opacity: 0.8, textAlign: 'center', maxWidth: 500 }}>
        You can reach me at <a href="mailto:erlin.hx@gmail.com" style={{ color: 'var(--accent)' }}>erlin.hx@gmail.com</a>.
      </p>
    </main>
  );
} 