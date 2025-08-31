import React, { useEffect, useState } from "react";
import { fetchRepoBranches } from "../util/FetchRepoBranches";

interface BranchDropdownProps {
  owner: string;
  repo: string;
  selectedBranch: string;
  onBranchChange: (branch: string) => void;
}

const BranchDropdown: React.FC<BranchDropdownProps> = ({ owner, repo, selectedBranch, onBranchChange }) => {
  const [branches, setBranches] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchRepoBranches(owner, repo)
      .then(setBranches)
      .catch(() => setError("Failed to load branches"))
      .finally(() => setLoading(false));
  }, [owner, repo]);

  let options: React.ReactNode;
  if (loading) {
    options = <option>Loading...</option>;
  } else if (error) {
    options = <option>{error}</option>;
  } else {
    options = branches.map(branch => (
      <option key={branch} value={branch}>{branch}</option>
    ));
  }

  return (
    <div className="relative inline-block w-56">
      <select
        className="block w-full px-4 py-2 pr-8 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
        value={selectedBranch}
        onChange={e => onBranchChange(e.target.value)}
        disabled={loading}
      >
        {options}
      </select>
      <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </span>
    </div>
  );
};

export default BranchDropdown;
