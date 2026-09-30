// src/components/FormularioEncuesta.jsx
import { useState } from 'react';
import { RatingScale } from './RatingScale';
import { supabase } from '../lib/supabase';

export function FormularioEncuesta() {
  const [calificacionObra, setCalificacionObra] = useState(0);
  const [calificacionTeatro, setCalificacionTeatro] = useState(0);
  const [comentarios, setComentarios] = useState('');
  
  // Estados para controlar la petición de red (§8.1)
  const [cargando, setCargando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(null);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (calificacionObra === 0) {
      alert('Por favor, seleccioná una calificación para la función.');
      return;
    }

    try {
      setCargando(true);
      setErrorEnvio(null);

      // Enviamos el registro a Supabase
      const { error } = await supabase
        .from('respuestas_encuestas')
        .insert([
          {
            calificacion_obra: calificacionObra,
            calificacion_teatro: calificacionTeatro || null,
            comentarios: comentarios.trim() || null,
          }
        ]);

      if (error) {
        throw error;
      }

      setEnviado(true);
    } catch (err) {
      console.error('Error al guardar en Supabase:', err);
      setErrorEnvio('Hubo un problema al enviar la encuesta. Por favor, intentá nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  if (enviado) {
    return (
      <div style={styles.graciasContainer}>
        <h2 style={styles.graciasTitulo}>¡Muchas gracias! 🎭</h2>
        <p style={styles.graciasTexto}>
          Tu opinión fue registrada en nuestra base de datos y nos ayuda a seguir mejorando la experiencia del Teatro del Bicentenario.
        </p>
        <button 
          onClick={() => {
            setCalificacionObra(0);
            setCalificacionTeatro(0);
            setComentarios('');
            setEnviado(false);
          }}
          style={styles.botonSecundario}
        >
          Enviar otra respuesta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <RatingScale 
        label="1. ¿Cómo calificarías la función / espectáculo de hoy? *" 
        value={calificacionObra} 
        onChange={setCalificacionObra} 
      />

      <RatingScale 
        label="2. ¿Cómo calificarías la atención y las instalaciones del Teatro?" 
        value={calificacionTeatro} 
        onChange={setCalificacionTeatro} 
      />

      <div style={styles.campo}>
        <label style={styles.label}>3. Comentarios o sugerencias (opcional):</label>
        <textarea
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
          placeholder="Dejanos tu mensaje..."
          rows={3}
          style={styles.textarea}
        />
      </div>

      {errorEnvio && (
        <div style={styles.errorBox}>
          {errorEnvio}
        </div>
      )}

      <button 
        type="submit" 
        disabled={cargando}
        style={{
          ...styles.botonSubmit,
          opacity: cargando ? 0.7 : 1,
          cursor: cargando ? 'not-allowed' : 'pointer'
        }}
      >
        {cargando ? 'Enviando respuesta...' : 'Enviar Encuesta'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  campo: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '0.95rem',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#222',
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    resize: 'vertical',
  },
  errorBox: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '10px 14px',
    borderRadius: '6px',
    fontSize: '0.85rem',
    marginBottom: '8px',
  },
  botonSubmit: {
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '14px',
    fontSize: '1rem',
    fontWeight: '700',
    border: 'none',
    borderRadius: '8px',
    marginTop: '8px',
    transition: 'background-color 0.2s ease',
  },
  graciasContainer: {
    padding: '40px 24px',
    textAlign: 'center',
  },
  graciasTitulo: {
    fontSize: '1.5rem',
    marginBottom: '12px',
    color: '#111',
  },
  graciasTexto: {
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '24px',
  },
  botonSecundario: {
    background: 'none',
    border: '1px solid #999',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontFamily: 'inherit',
  }
};