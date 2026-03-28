import React, { useState, useEffect } from 'react';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 3) {
        onSearch(searchTerm);
      } else if (searchTerm.length === 0) {
        onSearch(""); 
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  return (
    <header className="py-6 flex flex-col items-center gap-6 border-b border-gray-800">
      <h1 className="text-3xl font-black tracking-widest text-white">
        <span className="text-brand text-green-500">TMDB</span> ANALYZER
      </h1>
      
      <div className="relative w-full max-w-2xl px-4">
        <input
          type="text"
          placeholder="Film, yönetmen veya oyuncu ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#14181c] border border-gray-700 rounded-full py-3 px-6 text-gray-300 focus:outline-none focus:border-green-500 transition-colors"
        />
        <span className="absolute right-8 top-3 text-xl">🔍</span>
      </div>

      <nav className="flex gap-8 text-gray-400 font-semibold tracking-wider">
        <a href="#" className="hover:text-white transition-colors">FİLMLER</a>
        <a href="#" className="hover:text-white transition-colors">İSTATİSTİKLER</a>
      </nav>
    </header>
  );
};

export default Navbar;