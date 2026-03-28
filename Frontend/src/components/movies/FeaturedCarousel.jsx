import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const FeaturedCarousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 768) setItemsPerPage(2);
      else setItemsPerPage(4);
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  if (!movies || movies.length === 0) return null;

  const totalPages = Math.ceil(movies.length / itemsPerPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= totalPages - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages]);

  useEffect(() => {
    if (currentIndex >= totalPages) setCurrentIndex(0);
  }, [totalPages, currentIndex]);

  const currentMovies = movies.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);

  return (
    <div className="mb-12 relative overflow-hidden">
      <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider drop-shadow-md border-l-4 border-brand pl-3">
        Gösterimdekiler
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-500 justify-items-center">
        {currentMovies.map((movie) => (
          <div key={movie.id} className="w-full flex justify-center">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-brand w-8' : 'bg-gray-600 hover:bg-gray-400 w-2'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;