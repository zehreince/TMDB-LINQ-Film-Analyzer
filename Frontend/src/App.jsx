import React from 'react';
import MovieList from './components/movies/MovieList';

// Tasarımı test etmek için kullandığımız sahte veri 
const mockMovies = [
  { id: 1, title: "Melancholia", director: "Lars von Trier", releaseYear: 2011, imdbRating: 7.1, genre: "Drama", posterUrl: "https://image.tmdb.org/t/p/w500/1k1MUKzDPEs22EEMwQz3E8mWeB.jpg" },
  { id: 2, title: "Dogville", director: "Lars von Trier", releaseYear: 2003, imdbRating: 8.0, genre: "Crime", posterUrl: "https://image.tmdb.org/t/p/w500/8M2ReE2D2W7qO7TnaP91R7u5tCg.jpg" },
  { id: 3, title: "Pulp Fiction", director: "Quentin Tarantino", releaseYear: 1994, imdbRating: 8.9, genre: "Crime", posterUrl: "https://image.tmdb.org/t/p/w500/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg" },
  { id: 4, title: "Nymphomaniac", director: "Lars von Trier", releaseYear: 2013, imdbRating: 6.9, genre: "Drama", posterUrl: "https://image.tmdb.org/t/p/w500/pA7r6H9PqVzH0uI5nQk2B7R5T9b.jpg" },
  { id: 5, title: "Kill Bill: Vol. 1", director: "Quentin Tarantino", releaseYear: 2003, imdbRating: 8.2, genre: "Action", posterUrl: "https://image.tmdb.org/t/p/w500/v7TaX8kXMXs5yFFGR41guUDNcnB.jpg" }
];

function App() {
  return (
    <div className="min-h-screen bg-dark text-white p-8 font-sans">
      
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black text-brand tracking-widest uppercase drop-shadow-md">
          TMDB Analyzer
        </h1>
        <p className="text-gray-400 mt-2 text-sm tracking-widest uppercase">
          LINQ & React Film Analiz Platformu
        </p>
      </header>

     
      <main className="max-w-7xl mx-auto">
        <MovieList movies={mockMovies} />
      </main>
      
    </div>
  );
}

export default App;