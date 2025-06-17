import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchBlob } from '../util/FetchRepoTrees';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { FileIcon } from 'lucide-react';
import AOS from 'aos';
import { useEffect as useAosEffect } from 'react';

const decodeBase64 = (str: string) => {
  try {
    return decodeURIComponent(escape(window.atob(str)));
  } catch {
    return atob(str);
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

  // Modern, minimal, animated code viewer
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
          <div className="vs-code-mockup rounded-lg border border-gray-900/10 shadow-lg overflow-hidden animate-fade-in-up bg-[#1e1e1e]">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#23272e] border-b border-[#222]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
              <span className="ml-4 text-xs text-white/60 font-mono">{fileName}</span>
            </div>
            <pre className="text-sm leading-relaxed font-mono text-white p-6 overflow-x-auto whitespace-pre min-h-[300px] bg-[#1e1e1e]">
              {content}
            </pre>
          </div>
        )}
      </main>
      <AppFooter />
    </div>
  );
};
export default FileViewer;
