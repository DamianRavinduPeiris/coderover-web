import axios from "axios";

export interface Branch {
  name: string;
  [key: string]: any;
}

export async function fetchRepoBranches(owner: string, repo: string): Promise<string[]> {
  const URL = `${import.meta.env.VITE_BASE_URL}/api/v1/github/repos/${owner}/${repo}`;
  try {
    const response = await axios.get(URL, { withCredentials: true });
    const branches = response.data.data || [];
    return branches.map((b: Branch) => b.name);
  } catch (error) {
    console.error("Failed to fetch branches:", error);
    throw error;
  }
}
