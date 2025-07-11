import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchBlob } from '../util/FetchRepoTrees';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { FileIcon } from 'lucide-react';
import AOS from 'aos';
import CodeBlock from './CodeBlock';

const decodeBase64 = (str: string) => {
  try {
    const binary = window.atob(str);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
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
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => { AOS.init(); }, []);
  useEffect(() => {
    if (!owner || !repo || !sha) return;
    setLoading(true);
    fetchBlob(owner, repo, sha)
      .then(res => {
        if (res?.data?.content) {
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
  const isPng = fileName?.toLowerCase().endsWith('.png');
  const isClassFile = fileName?.toLowerCase().endsWith('.class');
  const isJavaFile = fileName?.toLowerCase().endsWith('.java');
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
  let fileContent: React.ReactNode;
  if (isClassFile) {
    fileContent = (
      <div className="flex flex-col items-center justify-center bg-black border border-gray-200 rounded-lg p-8 animate-fade-in-up">
        <span className="text-white font-semibold text-lg mb-2">Cannot render .class files</span>
        <span className="text-white/80 text-sm">Binary .class files cannot be displayed. Please view the source code instead.</span>
      </div>
    );
  } else if (isPng) {
    fileContent = (
      <div className="flex justify-center items-center bg-black rounded-lg border border-gray-200 p-6 animate-fade-in-up">
        <img
          src={`data:image/png;base64,${content}`}
          alt={fileName}
          className="max-w-full max-h-[600px] rounded shadow"
          style={{ background: '#fff' }}
        />
      </div>
    );
  } else if (!isJavaFile || !analyzing) {
    fileContent = <CodeBlock code={content} language={language} />;
  } else {
    fileContent = null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AppHeader />
      <main className="flex-1 w-full px-2 sm:px-4 md:px-8 py-6" style={{maxWidth:'100vw'}}>
        <button
          className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition flex items-center gap-2"
          onClick={() => navigate(`/repos/${owner}/${repo}/tree`)}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Repo Tree
        </button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4 border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2 text-lg font-semibold text-black">
            <FileIcon className="h-5 w-5 text-black" />
            <span>{repo}</span>
            <span className="text-gray-400">/</span>
            <span className="text-black font-mono text-base">{fileName ?? 'File'}</span>
          </div>
          <div className="text-xs text-black/60 font-mono break-all">SHA: {sha}</div>
        </div>
        {/* Analyze button for .java files */}
        {isJavaFile && !analyzing && (
          <div className="flex items-center gap-2 mb-2">
            <button
              className="px-4 py-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full shadow hover:from-blue-600 hover:to-indigo-600 transition-all text-xs font-semibold border border-indigo-200 animate-pulse"
              onClick={() => setAnalyzing(true)}
            >
              Analyze
            </button>
          </div>
        )}
        {/* Scanning animation overlay for .java files */}
        {isJavaFile && analyzing && (
          <div className="relative mb-2">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md rounded z-10 animate-fade-in" style={{ minHeight: 200 }}>
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex flex-row items-center justify-center mt-4 mb-2">
                  <span className="bounce-dot"></span>
                  <span className="bounce-dot"></span>
                  <span className="bounce-dot"></span>
                </div>
                <span className="text-gray-700 font-bold text-base tracking-wide animate-pulse">Analyzing file...</span>
              </div>
            </div>
            <div style={{ opacity: 0.3 }}>
              <CodeBlock code={content} language={language} />
            </div>
            {/* End overlay */}
            {/* Auto-hide animation after 2s */}
            {analyzing && setTimeout(() => setAnalyzing(false), 2000) && null}
          </div>
        )}
        {/* File content rendering */}
        {fileContent}
      </main>
      <AppFooter />
    </div>
  );
};
export default FileViewer;
