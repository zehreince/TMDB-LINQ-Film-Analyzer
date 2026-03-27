import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-card border-b border-gray-800 py-4 px-8 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="text-2xl font-black text-brand tracking-widest uppercase cursor-pointer drop-shadow-md">
          TMDB <span className="text-white">Analyzer</span>
        </div>

        <div className="flex gap-8 text-sm font-medium text-gray-400 tracking-wider">
          <a href="#" className="hover:text-brand transition-colors duration-300">FİLMLER</a>
          <a href="#" className="hover:text-brand transition-colors duration-300">İSTATİSTİKLER</a>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;