import React from "react";

const AppHeader: React.FC = () => (
  <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
      <span className="text-2xl font-semibold tracking-tight text-black">CodeRover</span>
    </div>
  </header>
);

export default AppHeader;
