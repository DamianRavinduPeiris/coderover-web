import React from "react";

interface UserInfoProps {
  name: string;
  profilePic: string;
  className?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, profilePic, className }) => {
  return (
    <div className={`flex items-center gap-3 ${className || ''}`}>
      <span className="font-semibold text-base mr-2">{name}</span>
      <img
        src={profilePic}
        alt="Profile"
        className="w-10 h-10 rounded-full border border-gray-200 object-cover"
      />
    </div>
  );
};

export default UserInfo;
