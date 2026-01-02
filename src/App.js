import { useState } from 'react';
import './App.css';

function App() {
  const [gif, setGif] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Usando la API pública de Random Dog (completamente gratuita, sin API key)
  const fetchRandomGif = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Random Dog API - retorna una imagen/GIF aleatorio de perros
      const response = await fetch('https://random.dog/woof.json');
      
      if (!response.ok) {
        throw new Error('Error al obtener la imagen');
      }
      
      const data = await response.json();
      
      // La API retorna diferentes formatos, solo aceptamos imágenes y GIFs
      if (data.url.endsWith('.mp4')) {
        // Si es video, hacer otra petición
        return fetchRandomGif();
      }
      
      setGif({
        url: data.url,
        fileSizeBytes: data.fileSizeBytes
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Generador de Imágenes Aleatorias</h1>
        <p className="subtitle">Presiona el botón para obtener una imagen/GIF al azar de perritos 🐶</p>
        
        <button 
          onClick={fetchRandomGif} 
          disabled={loading}
          className="fetch-button"
        >
          {loading ? 'Cargando...' : 'Obtener Imagen Aleatoria'}
        </button>

        {error && (
          <div className="error">
            <p>❌ {error}</p>
          </div>
        )}

        {gif && (
          <div className="gif-container">
            <img 
              src={gif.url} 
              alt="Imagen aleatoria de perrito"
              className="gif-image"
            />
            <p className="gif-title">
              Tamaño: {(gif.fileSizeBytes / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
