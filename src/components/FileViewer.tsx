import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBlob } from '../util/repoTreeApi';

const decodeBase64 = (str: string) => {
  try {
    return decodeURIComponent(escape(window.atob(str)));
  } catch {
    return atob(str);
  }
};

const FileViewer: React.FC = () => {
  const { owner, repo, '*': path } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!owner || !repo || !path) return;
    setLoading(true);
    fetchBlob(owner, repo, path)
      .then(res => {
        setContent(decodeBase64(res.data.content));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load file');
        setLoading(false);
      });
  }, [owner, repo, path]);

  if (loading) return <div className="animate-pulse">Loading file...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // Simple code viewer, can be improved with syntax highlighting
  return (
    <pre className="bg-gray-900 text-green-200 rounded p-4 overflow-x-auto text-sm">
      {content}
    </pre>
  );
};

export default FileViewer;
