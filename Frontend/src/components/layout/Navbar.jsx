import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-card border-b border-gray-800 py-4 px-8 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="text-2xl font-black text-brand tracking-widest uppercase cursor-pointer drop-shadow-md whitespace-nowrap">
          TMDB <span className="text-white">Analyzer</span>
        </div>

        <div className="w-full max-w-md relative">
          <input 
            type="text" 
            placeholder="Film, yönetmen veya oyuncu ara..." 
            className="w-full bg-[#14181c] border border-gray-700 text-sm text-white rounded-full px-4 py-2 focus:outline-none focus:border-brand transition-colors placeholder-gray-500"
          />
          <span className="absolute right-3 top-2 text-gray-500">🔍</span>
        </div>

        <div className="flex gap-8 text-sm font-medium text-gray-400 tracking-wider whitespace-nowrap">
          <a href="#" className="hover:text-brand transition-colors duration-300">FİLMLER</a>
          <a href="#" className="hover:text-brand transition-colors duration-300">İSTATİSTİKLER</a>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;