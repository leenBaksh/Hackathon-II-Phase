// frontend/src/components/Loading.tsx
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-6 text-lg text-gray-300 font-medium">Loading...</p>
        <p className="text-sm text-gray-400 mt-2">Please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
