import axios from "axios";


import type { UserDTO } from "../types/UserDTO";

export async function fetchUserInfo(): Promise<UserDTO> {
  const URL = import.meta.env.VITE_BASE_URL + "/api/v1/github/user";
  const response = await axios.get(URL, { withCredentials: true });
  const { data } = response.data;
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    login: data.login,
    profilePicURL: data.profilePicURL,
    company: data.company,
    blog: data.blog,
    location: data.location,
    bio: data.bio,
    publicRepos: data.publicRepos,
    privateRepos: data.privateRepos,
    publicGists: data.publicGists,
    followers: data.followers,
    following: data.following,
    siteAdmin: data.siteAdmin,
    twoFactorAuth: data.twoFactorAuth,
    accountType: data.accountType,
    planName: data.planName,
    planSpace: data.planSpace,
  };
}
