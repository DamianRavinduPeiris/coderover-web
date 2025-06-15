import axios from "axios";
import type RepoType from "../types/RepoType";
import { showError } from './AlertUtil';

// Fetch repositories from the given URL
export async function fetchRepos(url: string): Promise<RepoType[]> {
  try {
    const response = await axios.get(url, { withCredentials: true });
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("Failed to fetch repositories!");
  } catch (error) {
    console.error(error);
    showError("Failed to fetch repositories!");
    return [];
  }
}

// Move the repo matching the query to the top of the list
export function searchAndMoveRepo(repos: RepoType[], query: string): RepoType[] | null {
  const name = query.trim().toLowerCase();
  const found = repos.find(repo => repo.name.toLowerCase() === name);
  if (found) {
    return [found, ...repos.filter(r => r !== found)];
  }
  return null;
}

// Get suggestions for repos matching the query
export function getSuggestions(repos: RepoType[], query: string): RepoType[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return repos.filter(repo => repo.name.toLowerCase().includes(q));
}
