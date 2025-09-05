export async function analyzeCodeT5(code: string): Promise<{ prediction: string }> {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';
  const response = await axios.post(
    `${baseUrl}/api/v1/review/codeT5/v1`,
    { code },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  return { prediction: response.data?.data?.prediction ?? '' };
}
import axios from 'axios';
import type { ReviewResponse } from '../types/ReviewResponse';

export async function analyzeCode({ code, model }: { code: string; model: string }) {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';
  const response = await axios.post(
    `${baseUrl}/api/v1/review`,
    { code, model },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  return response.data as ReviewResponse;
}
