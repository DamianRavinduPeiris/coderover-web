import React from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../dashboard/UserInfo";

const AppHeader: React.FC<{ user?: { name: string; profilePic: string } }> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <header className="border-b border-indigo-200 bg-white/90 sticky top-0 z-30 shadow-md rounded-b-2xl backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        <span
          className="text-3xl font-extrabold tracking-tight text-black cursor-pointer hover:text-white transition-colors drop-shadow-sm"
          onClick={() => navigate("/dashboard")}
        >
          CodeRover
        </span>
        {user && <UserInfo name={user.name} profilePic={user.profilePic} />}
      </div>
    </header>
  );
};

export default AppHeader;
