import React from "react";
import { useNavigate } from "react-router-dom";

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
        <span
          className="text-2xl font-semibold tracking-tight text-black cursor-pointer hover:text-blue-700 transition"
          onClick={() => navigate("/dashboard")}
        >
          CodeRover
        </span>
      </div>
    </header>
  );
};

export default AppHeader;
