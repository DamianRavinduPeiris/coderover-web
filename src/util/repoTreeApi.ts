import axios from 'axios';
import type { RepoTreeResponse, BlobResponse } from '../types/RepoTree';

const BASE_URL = import.meta.env.VITE_BASE_URL + '/api/v1/github';
console.log(`Base URL: ${BASE_URL}`);

export async function fetchRepoTree(owner: string, repo: string): Promise<RepoTreeResponse> {
    console.log(`Fetching repo tree for ${owner}/${repo}`);
  const res = await axios.get(`${BASE_URL}/repos/${owner}/${repo}/tree`, { withCredentials: true });
  console.log(`url: ${BASE_URL}/repos/${owner}/${repo}/tree`);
  return res.data;
}

export async function fetchBlob(owner: string, repo: string, path: string): Promise<BlobResponse> {
  const res = await axios.get(`${BASE_URL}/repos/${owner}/${repo}/blob`, {
    params: { path },
    withCredentials: true
  });
  return res.data;
}
