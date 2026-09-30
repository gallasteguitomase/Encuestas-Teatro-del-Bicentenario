// src/components/RatingScale.jsx

export function RatingScale({ label, value, onChange }) {
  const opciones = [1, 2, 3, 4, 5];

  return (
    <div style={styles.container}>
      <label style={styles.label}>{label}</label>
      <div style={styles.buttonGroup}>
        {opciones.map((num) => {
          const estaSeleccionado = value === num;
          return (
            <button
              key={num}
              type="button"
              onClick={() => onChange(num)}
              style={{
                ...styles.button,
                backgroundColor: estaSeleccionado ? '#000000' : '#ffffff',
                color: estaSeleccionado ? '#ffffff' : '#333333',
                borderColor: estaSeleccionado ? '#000000' : '#cccccc',
              }}
            >
              {num}
            </button>
          );
        })}
      </div>
      <div style={styles.leyendas}>
        <span>1: Muy malo</span>
        <span>5: Excelente</span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '0.95rem',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#222',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: '12px 0',
    fontSize: '1rem',
    fontWeight: '600',
    border: '1px solid #ccc',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  leyendas: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.75rem',
    color: '#777',
    marginTop: '6px',
  }
};