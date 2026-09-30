import { FormularioEncuesta } from './components/FormularioEncuesta';
import {Header} from './components/Header';
function App() {
  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <Header 
          titulo="Encuesta de Satisfacción" 
          subtitulo="Tu opinión nos ayuda a mejorar la experiencia en cada función" 
        />
        
        {/* Aquí iremos agregando las preguntas y campos en el siguiente paso */}
      <FormularioEncuesta/>
      </div>
    </main>
  );
}
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '520px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
  }
};
export default App;