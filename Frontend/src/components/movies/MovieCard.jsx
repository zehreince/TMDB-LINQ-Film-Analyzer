import React from 'react';

const MovieCard = ({ movie }) => {
  return (
   
    <div className="group relative w-full sm:w-48 md:w-56 cursor-pointer rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand/20 bg-card">
      
     
      <div className="aspect-[2/3] w-full bg-gray-800">
        <img
          src={movie.posterUrl || "https://via.placeholder.com/400x600?text=Afiş+Yok"}
          alt={movie.title}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
        
       
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90"></div>
      </div>

     
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
     
        <h3 className="text-lg font-bold text-white truncate drop-shadow-md">
          {movie.title}
        </h3>
        
        <div className="flex justify-between items-center mt-2 text-sm text-gray-300 font-medium">
          <span>{movie.releaseYear}</span>
          
          <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-md backdrop-blur-sm border border-white/10">
            <span className="text-brand text-xs">★</span>
            <span>{movie.imdbRating?.toFixed(1) || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;