import axios from "axios";
import { showError } from "./AlertUtil";
import type { RepoTreeResponse, BlobResponse } from "../types/RepoTree";

const BASE_URL = import.meta.env.VITE_BASE_URL + "/api/v1/github";

export async function fetchRepoTree(
  owner: string,
  repo: string
): Promise<RepoTreeResponse | null> {
  try {
    const res = await axios.get(`${BASE_URL}/repos/${owner}/${repo}/tree`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: unknown) {
    console.error("An error occurred while fetching repo tree:", error);
    showError("Failed to fetch repo tree");
    return null;
  }
}

export async function fetchBlob(
  owner: string,
  repo: string,
  sha: string
): Promise<BlobResponse | null> {
  console.log('Base URL:', BASE_URL);
  console.log(`Fetching blob for ${owner}/${repo} with sha: ${sha}`);
  
  try {
    const res = await axios.get(`${BASE_URL}/repos/${owner}/${repo}/blob`, {
      params: { sha },
      withCredentials: true,
    });
    return res.data;
  } catch (error: unknown) {
    console.error("An error occurred while fetching file blob:", error);
    showError("Failed to fetch file blob");
    return null;
  }
}
