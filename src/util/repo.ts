import axios from "axios";
import type RepoType from "../types/RepoType";

export async function fetchRepos(url: string): Promise<RepoType[]> {
  const response = await axios.get(url, { withCredentials: true });
  if (response.status === 200) {
    return response.data.data;
  }
  throw new Error("Failed to fetch repositories!");
}

export function searchAndMoveRepo(repos: RepoType[], query: string): RepoType[] | null {
  const q = query.trim().toLowerCase();
  const idx = repos.findIndex(repo => repo.name.toLowerCase() === q);
  if (idx !== -1) {
    const matched = repos[idx];
    return [matched, ...repos.filter((_, i) => i !== idx)];
  }
  return null;
}

export function getSuggestions(repos: RepoType[], query: string): RepoType[] {
  if (!query.trim()) return [];
  return repos.filter(repo => repo.name.toLowerCase().includes(query.trim().toLowerCase()));
}
