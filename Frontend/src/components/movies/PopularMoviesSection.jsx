import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import LoadingSpinner from '../ui/LoadingSpinner';

const PopularMoviesSection = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        const response = await fetch(`http://localhost:5043/api/Movies/popular?page=${page}`);
        const data = await response.json();
        
        if (page === 1) {
          setMovies(data);
        } else {
          setMovies(prev => [...prev, ...data]);
        }
      } catch (err) {
        console.error("Popüler filmler çekilemedi:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchMovies();
  }, [page]);

  if (loading && page === 1) return <LoadingSpinner />;

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
        <h3 className="text-xl font-bold text-gray-300 uppercase tracking-wider">Popüler Filmler</h3>
      </div>
      
      <MovieList movies={movies} />

      <div className="flex justify-center mt-12 mb-8">
        <button 
          onClick={() => setPage(p => p + 1)} 
          disabled={loadingMore}
          className="bg-[#14181c] hover:bg-brand/20 text-brand border border-brand/50 font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingMore ? (
            <>
              <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
              Yükleniyor...
            </>
          ) : (
            "Daha Fazla Film Yükle"
          )}
        </button>
      </div>
    </div>
  );
};

export default PopularMoviesSection;