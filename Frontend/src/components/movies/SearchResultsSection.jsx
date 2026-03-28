import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import LoadingSpinner from '../ui/LoadingSpinner';

const SearchResultsSection = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        const response = await fetch(`http://localhost:5043/api/Movies/search?query=${query}&page=${page}`);
        const data = await response.json();
        
        if (page === 1) {
          setMovies(data);
        } else {
          setMovies(prev => [...prev, ...data]);
        }
      } catch (err) {
        console.error("Arama sonuçları çekilemedi:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchSearchResults();
  }, [query, page]);

  if (loading && page === 1) return <LoadingSpinner />;

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
        <h3 className="text-xl font-bold text-gray-300 uppercase tracking-wider">
          "{query}" için Arama Sonuçları
        </h3>
      </div>
      
      {movies.length > 0 ? (
        <>
          <MovieList movies={movies} />
          <div className="flex justify-center mt-12 mb-8">
            <button 
              onClick={() => setPage(p => p + 1)} 
              disabled={loadingMore}
              className="bg-[#14181c] hover:bg-green-500/20 text-green-500 border border-green-500/50 font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? "Yükleniyor..." : "Daha Fazla Sonuç Yükle"}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400 mt-12 py-12 bg-[#14181c] rounded-lg">
          Aradığınız kritere uygun film bulunamadı. Lütfen başka bir kelime deneyin.
        </div>
      )}
    </div>
  );
};

export default SearchResultsSection;