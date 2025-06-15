import { RefreshCw, Code } from "lucide-react";
import type RepoType from "../types/RepoType";
import { useEffect, useState, useCallback } from "react";
import AOS from 'aos';
import { Toaster } from "react-hot-toast";
import { showError, showSuccess } from "../util/ui";
import { fetchRepos, getSuggestions, searchAndMoveRepo } from "../util/repo";
import RepoCard from "./RepoCard";
import { useCombobox } from 'downshift';
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";

export default function DashBoard() {
  useEffect(() => { AOS.init(); }, []);
  const [repos, setRepos] = useState<RepoType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllRepos = useCallback(() => {
    const URL = import.meta.env.VITE_BASE_URL + "/api/v1/github/user/repos";
    setLoading(true);
    fetchRepos(URL)
      .then(data => setRepos(data))
      .catch(() => {
        showError("Error fetching repositories")
        window.location.href = "/";

      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchAllRepos(); }, [fetchAllRepos]);

  const [inputValue, setInputValue] = useState("");
  const suggestions = getSuggestions(repos, inputValue);

  const combobox = useCombobox<RepoType>({
    items: suggestions,
    inputValue: typeof inputValue === 'string' ? inputValue : '',
    onInputValueChange: ({ inputValue }) => setInputValue(inputValue ?? ""),
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setInputValue(selectedItem.name || "");
        handleSearch(selectedItem.name);
      }
    },
    itemToString: item => (item ? item.name : ""),
  });
  const { isOpen, getMenuProps, getInputProps, getItemProps, highlightedIndex } = combobox;

  const handleSearch = (query?: string) => {
    const value = (query ?? inputValue).trim();
    if (!value) return;
    const newRepos = searchAndMoveRepo(repos, value);
    if (newRepos) {
      setRepos(newRepos);
      showSuccess("Repository found!.");
    } else {
      showError("No repository found with that name.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Toaster position="top-right" />
      <AppHeader />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Your Repositories</h1>
            <p className="text-gray-600 mt-1">Manage and review your code repositories</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search repositories..."
                className="pl-4 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                style={{ minWidth: 220 }}
                {...getInputProps()}
              />
              <ul
                {...getMenuProps()}
                className={`absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto ${isOpen && suggestions.length > 0 ? '' : 'hidden'}`}
              >
                {isOpen && suggestions.map((repo, idx) => (
                  <li
                    key={repo.full_name}
                    {...getItemProps({ item: repo, index: idx })}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${idx === highlightedIndex ? 'bg-gray-100' : ''}`}
                  >
                    {repo.name}
                  </li>
                ))}
              </ul>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={fetchAllRepos}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>
        <div className="grid gap-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
              <p className="text-gray-600 text-sm">Fetching repositories...</p>
            </div>
          ) : (
            repos.map((repo) => (
              <RepoCard key={repo.full_name} repo={repo} />
            ))
          )}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
