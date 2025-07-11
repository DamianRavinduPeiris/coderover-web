import axios from "axios";

export interface UserInfo {
  name: string;
  profilePic: string;
}

export async function fetchUserInfo(): Promise<UserInfo> {
  const URL = import.meta.env.VITE_BASE_URL + "/api/v1/github/user";
  const response = await axios.get(URL, { withCredentials: true });
  console.log('User info response:', response.data);
  const { data } = response.data;
  return {
    name: data.name,
    profilePic: data.profilePic,
  };
}
