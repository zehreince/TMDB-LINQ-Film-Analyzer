import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <div className="text-center text-gray-500 mt-12 font-medium tracking-wider">Gösterilecek film bulunamadı.</div>;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;