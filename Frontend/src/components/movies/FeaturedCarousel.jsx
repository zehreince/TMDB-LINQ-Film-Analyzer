import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const FeaturedCarousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!movies || movies.length === 0) return null;

  const itemsPerPage = 4;
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const currentMovies = movies.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);

  return (
    <div className="mb-12 relative">
      <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider drop-shadow-md border-l-4 border-brand pl-3">
        Ana Akım Filmler
      </h2>
      
      <div className="flex gap-6 justify-center transition-all duration-500 ease-in-out">
        {currentMovies.map((movie) => (
          <div key={movie.id} className="w-full sm:w-1/2 md:w-1/4">
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