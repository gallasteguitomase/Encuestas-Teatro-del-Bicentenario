// src/components/Header.jsx
import logoTeatro from '../assets/logos-tb-10años-gob-min-negro.png';

export function Header({ titulo, subtitulo }) {
  return (
    <header style={styles.header}>
      <img 
        src={logoTeatro} 
        alt="Logo Teatro del Bicentenario" 
        style={styles.logo} 
      />
      <h1 style={styles.titulo}>{titulo}</h1>
      {subtitulo && <p style={styles.subtitulo}>{subtitulo}</p>}
    </header>
  );
}

// Estilos básicos en objeto JavaScript (inline-styles) para empezar simple:
const styles = {
  header: {
    textAlign: 'center',
    padding: '24px 16px',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor: '#ffffff',
    borderRadius: '12px 12px 0 0',
  },
  logo: {
    maxWidth: '280px',
    height: 'auto',
    marginBottom: '16px',
  },
  titulo: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: '#111',
    margin: '4px 0',
  },
  subtitulo: {
    fontSize: '1rem',
    color: '#666',
  }
};