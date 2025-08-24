'use client';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
      fontFamily: 'var(--font-sans)',
      borderTop: '1px solid rgba(0,0,0,0.1)',
      padding: '16px 0',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <div style={{ marginBottom: '8px', fontWeight: 600 }}>
        Alexis Portillo
      </div>
      <div style={{ fontSize: '0.875rem', color: 'var(--foreground)' }}>
        © {new Date().getFullYear()} Todos los derechos reservados.
      </div>
      <div style={{ marginTop: '8px', fontSize: '0.875rem' }}>
        <a href="/contacto" style={{ color: 'var(--corporate-red-dark)', marginRight: '12px', textDecoration: 'none' }}>
          Contacto
        </a>
        <a href="/privacidad" style={{ color: 'var(--corporate-red-dark)', textDecoration: 'none' }}>
          Política de privacidad
        </a>
      </div>
    </footer>
  );
}
