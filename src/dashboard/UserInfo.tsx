import React from "react";
import type { UserDTO } from "../types/UserDTO";
import { FolderIcon } from "../components/icons";
import { Briefcase, MapPin, Link as LinkIcon, Users, User as UserIcon, Shield, Zap } from "lucide-react";

interface UserInfoProps {
  user: UserDTO;
  className?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, className }) => {
  return (
    <div className={`rounded-2xl shadow-lg border border-gray-100 bg-white overflow-hidden ${className ?? ''}`} style={{ minWidth: 320 }}>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-20 relative">
        <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2">
          <img
            src={user.profilePicURL}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>
      </div>
      <div className="pt-14 pb-6 px-6 flex flex-col items-center">
        <div className="flex flex-col items-center gap-1 w-full">
          <span className="text-xl font-bold text-gray-900 text-center">{user.name}</span>
          <span className="text-gray-500 text-base text-center">@{user.login}</span>
          {user.siteAdmin && <span className="mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">Admin</span>}
        </div>
        {user.bio && <div className="text-gray-700 mt-2 mb-2 text-sm text-center w-full">{user.bio}</div>}
        <div className="flex flex-col gap-2 w-full mt-2">
          {user.company && <div className="flex items-center gap-2 text-xs text-gray-600"><Briefcase className="w-4 h-4" /> {user.company}</div>}
          {user.location && <div className="flex items-center gap-2 text-xs text-gray-600"><MapPin className="w-4 h-4" /> {user.location}</div>}
          {user.blog && <a href={user.blog} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:underline"><LinkIcon className="w-4 h-4" />{user.blog}</a>}
        </div>
        <div className="grid grid-cols-2 gap-4 w-full mt-6 mb-2">
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-xs text-gray-500"><FolderIcon className="w-4 h-4" />Public Repos</span>
            <span className="font-semibold text-lg text-gray-900">{user.publicRepos ?? 0}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-xs text-gray-500"><FolderIcon className="w-4 h-4 text-yellow-600" />Private Repos</span>
            <span className="font-semibold text-lg text-gray-900">{user.privateRepos ?? 0}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-xs text-gray-500"><Users className="w-4 h-4" />Followers</span>
            <span className="font-semibold text-lg text-gray-900">{user.followers ?? 0}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-xs text-gray-500"><UserIcon className="w-4 h-4" />Following</span>
            <span className="font-semibold text-lg text-gray-900">{user.following ?? 0}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 justify-center w-full">
          {user.accountType && <span className="flex items-center gap-1"><Shield className="w-4 h-4" />Account Status : {user.accountType}</span>}
          {user.planName && <span className="flex items-center gap-1"><Zap className="w-4 h-4" />Plan : {user.planName}</span>}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
