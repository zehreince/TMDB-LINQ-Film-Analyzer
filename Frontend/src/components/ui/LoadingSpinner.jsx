import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-20 space-y-4">
      <div className="w-12 h-12 border-4 border-gray-700 border-t-brand rounded-full animate-spin"></div>
      <p className="text-gray-400 tracking-widest text-sm uppercase animate-pulse">
        Filmler Yükleniyor...
      </p>
    </div>
  );
};

export default LoadingSpinner;