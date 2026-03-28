import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import MovieList from './components/movies/MovieList';
import LoadingSpinner from './components/ui/LoadingSpinner';
import FeaturedCarousel from './components/movies/FeaturedCarousel';

const mockMovies = [
  { id: 1, title: "Melancholia", director: "Lars von Trier", releaseYear: 2011, imdbRating: 7.1, genre: "Drama", posterUrl: "https://image.tmdb.org/t/p/w500/1k1MUKzDPEs22EEMwQz3E8mWeB.jpg" },
  { id: 2, title: "Dogville", director: "Lars von Trier", releaseYear: 2003, imdbRating: 8.0, genre: "Crime", posterUrl: "https://image.tmdb.org/t/p/w500/8M2ReE2D2W7qO7TnaP91R7u5tCg.jpg" },
  { id: 3, title: "Pulp Fiction", director: "Quentin Tarantino", releaseYear: 1994, imdbRating: 8.9, genre: "Crime", posterUrl: "https://image.tmdb.org/t/p/w500/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg" },
  { id: 4, title: "Nymphomaniac", director: "Lars von Trier", releaseYear: 2013, imdbRating: 6.9, genre: "Drama", posterUrl: "https://image.tmdb.org/t/p/w500/pA7r6H9PqVzH0uI5nQk2B7R5T9b.jpg" },
  { id: 5, title: "Kill Bill: Vol. 1", director: "Quentin Tarantino", releaseYear: 2003, imdbRating: 8.2, genre: "Action", posterUrl: "https://image.tmdb.org/t/p/w500/v7TaX8kXMXs5yFFGR41guUDNcnB.jpg" }
];

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-dark text-white font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto p-8 mt-4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <FeaturedCarousel movies={mockMovies} />
            
            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
              <h3 className="text-xl font-bold text-gray-300 uppercase tracking-wider">Tüm Filmler</h3>
            </div>
            
            <MovieList movies={mockMovies} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;