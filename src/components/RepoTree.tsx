import React, { useEffect, useState } from 'react';
import { fetchRepoTree } from '../util/FetchRepoTrees';
import type { RepoTreeNode } from '../types/RepoTree';
import TreeNode from './TreeNode';
import { Star } from 'lucide-react';
import AOS from 'aos';
import { useEffect as useAosEffect } from 'react';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { useNavigate, useLocation } from 'react-router-dom';
import BranchDropdown from './BranchDropdown';

interface RepoTreeProps {
  owner: string;
  repo: string;
  repoMeta?: {
    name: string;
    updated_at: string;
    stargazers_count: number;
    private?: boolean;
    language?: string;
    description?: string;
  };
}

const RepoTree: React.FC<RepoTreeProps> = ({ owner, repo, repoMeta }) => {
  const [tree, setTree] = useState<RepoTreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>('master');
  const navigate = useNavigate();
  const location = useLocation();

  const fetchTree = async (branch: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchRepoTree(owner, repo, branch);
      if (res && res.data && res.data.tree) {
        setTree(res.data.tree);
      } else {
        setError('Failed to load repo tree');
      }
    } catch (err) {
      setError('Failed to load repo tree');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTree(selectedBranch);
    // eslint-disable-next-line
  }, [owner, repo, selectedBranch]);

  // Use repoMeta from location.state if not provided as prop
  const meta = repoMeta || location.state?.repoMeta;

  useAosEffect(() => { AOS.init(); }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      <p className="text-gray-600 text-sm">Fetching repository structure...</p>
    </div>
  );

  if (error) return <div className="text-red-500">{error}</div>;

  // Only show top-level nodes
  const topLevelNodes = tree.filter(node => !node.path.includes('/'));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AppHeader />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="flex flex-row gap-2 mb-6">
          <button
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded text-xs flex items-center gap-2 shadow-sm border border-gray-200"
            onClick={() => window.history.length > 1 ? window.history.back() : navigate('/dashboard')}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back
          </button>
          <button
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded text-xs flex items-center gap-2 shadow-sm border border-gray-200"
            onClick={() => navigate('/dashboard')}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M3 12h18M3 12l6-6M3 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Dashboard
          </button>
        </div>
        <div className="mb-6 flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <svg aria-label="Directory" viewBox="0 0 16 16" width="24" height="24" className="text-yellow-500"><path fill="currentColor" d="M1.75 2A1.75 1.75 0 0 0 0 3.75v8.5A1.75 1.75 0 0 0 1.75 14h12.5A1.75 1.75 0 0 0 16 12.25V5.5A1.5 1.5 0 0 0 14.5 4h-6.086a.5.5 0 0 1-.354-.146L6.207 2.854A1.5 1.5 0 0 0 5.146 2.5H1.75ZM1.5 3.75A.25.25 0 0 1 1.75 3.5h3.396a.5.5 0 0 1 .354.146l1.853 1.853A1.5 1.5 0 0 0 8.914 6H14.5a.5.5 0 0 1 .5.5v6.25a.25.25 0 0 1-.25.25H1.75a.25.25 0 0 1-.25-.25v-9.5Z"></path></svg>
            <h2 className="text-2xl font-bold tracking-tight" data-aos="fade-right">Repo Structure</h2>
            <BranchDropdown
              owner={owner}
              repo={repo}
              selectedBranch={selectedBranch}
              onBranchChange={setSelectedBranch}
            />
          </div>
          {meta && (
            <div className="flex flex-col md:items-end md:w-full gap-1 text-gray-700 text-sm bg-white rounded px-0 py-2 border-b border-gray-200 mb-2">
              <span className="font-semibold text-xl text-blue-900">{meta.name}</span>
              {meta.description && <span className="text-xs text-gray-500 italic max-w-2xl whitespace-pre-line">{meta.description}</span>}
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {meta.private && <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded border border-gray-200">Private</span>}
                {meta.language && <span className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-400 rounded-full"></div><span className="font-medium text-xs text-gray-700">{meta.language}</span></span>}
                <span className="flex items-center gap-1 text-xs text-gray-600"><Star className="h-4 w-4 text-yellow-500" />{meta.stargazers_count}</span>
                <span className="text-xs text-gray-500">Updated <span className="font-mono">{meta.updated_at ? new Date(meta.updated_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : ''}</span></span>
              </div>
            </div>
          )}
        </div>
        <div className="repo-tree bg-white rounded shadow p-4 space-y-2" data-aos="fade-up" data-aos-delay="100">
          {topLevelNodes.map(node => (
            <TreeNode
              key={node.sha}
              node={node}
              fullTree={tree}
              owner={owner}
              repo={repo}
              level={0}
            />
          ))}
        </div>
      </main>
      <AppFooter />
    </div>
  );
};

export default RepoTree;
