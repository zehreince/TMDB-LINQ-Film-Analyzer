import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import FeaturedCarousel from './components/movies/FeaturedCarousel';
import PopularMoviesSection from './components/movies/PopularMoviesSection';
import SearchResultsSection from './components/movies/SearchResultsSection';

function App() {
  const [carouselMovies, setCarouselMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCarouselMovies = async () => {
      try {
        const response = await fetch('http://localhost:5043/api/Movies/now-playing');
        const data = await response.json();
        setCarouselMovies(data.slice(0, 10));
      } catch (err) {
        console.error("Vizyon filmleri çekilemedi:", err);
      }
    };
    fetchCarouselMovies();
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white font-sans">
      <Navbar onSearch={setSearchQuery} />

      <main className="max-w-7xl mx-auto p-8 mt-4">
        {searchQuery.length >= 3 ? (
          <SearchResultsSection query={searchQuery} />
        ) : (
          <>
            {carouselMovies.length > 0 && <FeaturedCarousel movies={carouselMovies} />}
            <PopularMoviesSection />
          </>
        )}
      </main>
    </div>
  );
}

export default App;