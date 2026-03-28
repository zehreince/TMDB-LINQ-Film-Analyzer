import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import MovieList from './components/movies/MovieList';
import LoadingSpinner from './components/ui/LoadingSpinner';
import FeaturedCarousel from './components/movies/FeaturedCarousel';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5043/api/Movies/popular')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Veri çekme hatası:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto p-8 mt-4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <FeaturedCarousel movies={movies} />
            
            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
              <h3 className="text-xl font-bold text-gray-300 uppercase tracking-wider">Tüm Filmler</h3>
            </div>
            
            <MovieList movies={movies} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;