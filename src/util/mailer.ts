import axios from 'axios';

export interface ReportEmailDTO {
  defects: string[];
  performance: string[];
  vulnerabilities: string[];
}

export async function sendReportEmail(report: ReportEmailDTO) {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';
  const url = `${baseUrl}/email/send-report`;
  const response = await axios.post(url, report, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return response;
}
