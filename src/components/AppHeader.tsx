import React from "react";
import { useNavigate } from "react-router-dom";
import type { UserDTO } from "../types/UserDTO";

const AppHeader: React.FC<{ user?: UserDTO }> = ({ user }) => {
  const navigate = useNavigate();
  console.log(user);
  return (
    <header className="border-b border-indigo-200 bg-white/90 sticky top-0 z-30 shadow-md rounded-b-2xl backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <button
            className="text-3xl font-extrabold tracking-tight text-black cursor-pointer bg-transparent border-none p-0 m-0"
            onClick={() => navigate("/dashboard")}
            type="button"
            style={{ outline: 'none' }}
          >
            CodeRover
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
