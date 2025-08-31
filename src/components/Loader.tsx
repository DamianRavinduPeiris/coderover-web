import React from 'react';

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => (
  <div className="flex-1 flex flex-col items-center justify-center py-20 space-y-4">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mt-20" />
    {text && <p className="text-gray-600 text-sm">{text}</p>}
  </div>
);

export default Loader;
