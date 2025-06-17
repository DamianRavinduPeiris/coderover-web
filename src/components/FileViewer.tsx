import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchBlob } from '../util/FetchRepoTrees';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { FileIcon } from 'lucide-react';
import AOS from 'aos';
import { useEffect as useAosEffect } from 'react';
import CodeBlock from './CodeBlock';

const decodeBase64 = (str: string) => {
  try {
    return decodeURIComponent(escape(window.atob(str)));
  } catch {
    return atob(str);
  }
};

const detectLanguage = (fileName?: string): string => {
  if (!fileName) return 'text';
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'js': return 'javascript';
    case 'ts': return 'typescript';
    case 'tsx': return 'tsx';
    case 'jsx': return 'jsx';
    case 'json': return 'json';
    case 'css': return 'css';
    case 'html': return 'html';
    case 'md': return 'markdown';
    case 'py': return 'python';
    case 'java': return 'java';
    case 'c': return 'c';
    case 'cpp': return 'cpp';
    case 'cs': return 'csharp';
    case 'go': return 'go';
    case 'rb': return 'ruby';
    case 'php': return 'php';
    case 'sh': return 'bash';
    case 'xml': return 'xml';
    case 'yml':
    case 'yaml': return 'yaml';
    default: return 'text';
  }
};

const FileViewer: React.FC = () => {
  const { owner, repo, '*': sha } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const fileName = location.state?.fileName as string | undefined;
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useAosEffect(() => { AOS.init(); }, []);
  useEffect(() => {
    if (!owner || !repo || !sha) return;
    setLoading(true);
    fetchBlob(owner, repo, sha)
      .then(res => {
        if (res && res.data && res.data.content) {
          setContent(decodeBase64(res.data.content));
        } else {
          setContent('');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load file');
        setLoading(false);
      });
  }, [owner, repo, sha]);

  // Detect if the file is a PNG image
  const isPng = fileName && fileName.toLowerCase().endsWith('.png');
  const isClassFile = fileName && fileName.toLowerCase().endsWith('.class');
  const language = detectLanguage(fileName);

  if (loading) return (
    <div className="min-h-screen flex flex-col bg-white">
      <AppHeader />
      <div className="flex-1 flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mt-20" />
        <p className="text-gray-600 text-sm">Loading file...</p>
      </div>
      <AppFooter />
    </div>
  );
  if (error) return (
    <div className="flex flex-col min-h-screen bg-white">
      <AppHeader />
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
      <AppFooter />
    </div>
  );
  if (!content) return (
    <div className="flex flex-col min-h-screen bg-white">
      <AppHeader />
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-gray-500">File content is empty or not available.</div>
      </div>
      <AppFooter />
    </div>
  );
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AppHeader />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10 animate-fade-in">
        <button
          className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition flex items-center gap-2"
          onClick={() => navigate(`/repos/${owner}/${repo}/tree`)}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Repo Tree
        </button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-black">
            <FileIcon className="h-5 w-5 text-black" />
            <span>{repo}</span>
            <span className="text-gray-400">/</span>
            <span className="text-black font-mono text-base">{fileName || 'File'}</span>
          </div>
          <div className="text-xs text-black/60 font-mono break-all">SHA: {sha}</div>
        </div>
        {isClassFile ? (
          <div className="flex flex-col items-center justify-center bg-black border border-gray-200 rounded-lg p-8 animate-fade-in-up">
            <span className="text-white font-semibold text-lg mb-2">Cannot render .class files</span>
            <span className="text-white/80 text-sm">Binary .class files cannot be displayed. Please view the source code instead.</span>
          </div>
        ) : isPng ? (
          <div className="flex justify-center items-center bg-black rounded-lg border border-gray-200 p-6 animate-fade-in-up">
            <img
              src={`data:image/png;base64,${content}`}
              alt={fileName}
              className="max-w-full max-h-[600px] rounded shadow"
              style={{ background: '#fff' }}
            />
          </div>
        ) : (
          <CodeBlock code={content} language={language} />
        )}
      </main>
      <AppFooter />
    </div>
  );
};
export default FileViewer;
