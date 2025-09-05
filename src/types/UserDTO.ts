export interface UserDTO {
  id: string;
  name: string;
  email: string;
  login: string;
  profilePicURL: string;
  company?: string;
  blog?: string;
  location?: string;
  bio?: string;
  publicRepos?: number;
  privateRepos?: number;
  publicGists?: number;
  followers?: number;
  following?: number;
  siteAdmin?: boolean;
  twoFactorAuth?: boolean;
  accountType?: string;
  planName?: string;
  planSpace?: number;
}
