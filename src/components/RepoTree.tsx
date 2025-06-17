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
    <div className="flex flex-col items-center justify-center py-32 min-h-screen bg-gradient-to-br from-white to-gray-100">
      <div className="w-14 h-14 border-4 border-black border-t-white rounded-full animate-spin shadow-lg"></div>
      <p className="text-black text-lg font-semibold mt-4 animate-pulse">Fetching repository structure...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center py-32 min-h-screen bg-gradient-to-br from-red-50 to-white">
      <span className="text-3xl mb-2">😢</span>
      <div className="text-red-600 font-semibold text-lg">{error}</div>
    </div>
  );

  // Only show top-level nodes
  const topLevelNodes = tree.filter(node => !node.path.includes('/'));

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col">
      <AppHeader />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full">
        <div className="flex flex-row gap-8 items-start">
          <div className="flex-1 min-w-0">
            <div className="flex flex-row gap-3 mb-8">
              <button
                className="px-4 py-2 bg-white hover:bg-black text-black rounded-lg text-sm flex items-center gap-2 shadow border border-gray-200 transition-all hover:text-white"
                onClick={() => window.history.length > 1 ? window.history.back() : navigate('/dashboard')}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Back
              </button>
              <button
                className="px-4 py-2 bg-white hover:bg-black text-black rounded-lg text-sm flex items-center gap-2 shadow border border-gray-200 transition-all hover:text-white"
                onClick={() => navigate('/dashboard')}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M3 12h18M3 12l6-6M3 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Dashboard
              </button>
            </div>
            <div className="mb-8 flex flex-col gap-3">
              <div className="flex items-center gap-5">
                <svg aria-label="Directory" viewBox="0 0 16 16" width="28" height="28" className="text-black drop-shadow"><path fill="currentColor" d="M1.75 2A1.75 1.75 0 0 0 0 3.75v8.5A1.75 1.75 0 0 0 1.75 14h12.5A1.75 1.75 0 0 0 16 12.25V5.5A1.5 1.5 0 0 0 14.5 4h-6.086a.5.5 0 0 1-.354-.146L6.207 2.854A1.5 1.5 0 0 0 5.146 2.5H1.75ZM1.5 3.75A.25.25 0 0 1 1.75 3.5h3.396a.5.5 0 0 1 .354.146l1.853 1.853A1.5 1.5 0 0 0 8.914 6H14.5a.5.5 0 0 1 .5.5v6.25a.25.25 0 0 1-.25.25H1.75a.25.25 0 0 1-.25-.25v-9.5Z"></path></svg>
                <h2 className="text-3xl font-extrabold tracking-tight text-black" data-aos="fade-right">Repo Structure</h2>
                <BranchDropdown
                  owner={owner}
                  repo={repo}
                  selectedBranch={selectedBranch}
                  onBranchChange={setSelectedBranch}
                />
              </div>
            </div>
            <div className="repo-tree bg-white/90 rounded-2xl shadow-lg p-6 space-y-3 border border-gray-200" data-aos="fade-up" data-aos-delay="100">
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
          </div>
          {meta && (
            <aside className="w-full max-w-xs ml-auto sticky top-32">
              <div className="flex flex-col gap-3 bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <span className="font-extrabold text-2xl text-black mb-2">{meta.name}</span>
                {meta.description && <span className="text-lg text-black/80 italic max-w-2xl whitespace-pre-line mb-2">{meta.description}</span>}
                <div className="flex flex-wrap gap-4 mt-2">
                  {meta.private && <span className="px-3 py-1 text-sm bg-black text-white rounded-full border border-gray-300 font-semibold">Private</span>}
                  {meta.language && <span className="flex items-center gap-2 text-black text-base font-medium"><div className="w-4 h-4 bg-black rounded-full"></div>{meta.language}</span>}
                  <span className="flex items-center gap-2 text-black text-base font-medium"><Star className="h-5 w-5 text-black" />{meta.stargazers_count}</span>
                  <span className="text-base text-black/60">Updated <span className="font-mono">{meta.updated_at ? new Date(meta.updated_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : ''}</span></span>
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>
      <AppFooter />
    </div>
  );
};

export default RepoTree;
