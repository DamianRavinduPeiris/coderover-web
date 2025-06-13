import { Github, Search, RefreshCw, Code } from "lucide-react"
import type RepoType from "../types/RepoType"
import { useEffect, useState } from "react"
import AOS from 'aos';
import { Toaster } from "react-hot-toast";
import { showError, showSuccess } from "../util/ui";
import { fetchRepos, searchAndMoveRepo, getSuggestions } from "../util/repo";


export default function DashBoard() {
    AOS.init();
    const [repos, setRepos] = useState<RepoType[]>([]);
    const [ui, setUI] = useState({
        searchQuery: "",
        showSuggestions: false,
        highlightedIndex: -1,
        loading: true
    });

    const suggestions = getSuggestions(repos, ui.searchQuery);

    function fetchAllRepos() {
        const URL = import.meta.env.VITE_BASE_URL + "/api/v1/github/user/repos";
        setUI(u => ({ ...u, loading: true }));
        fetchRepos(URL)
            .then(data => setRepos(data))
            .catch(() => showError("Error fetching repositories"))
            .finally(() => setUI(u => ({ ...u, loading: false })));
    }

    useEffect(() => {
        fetchAllRepos();
    }, []);

    function handleSearch(query?: string) {
        const searchValue = (query !== undefined ? query : ui.searchQuery).trim();
        if (!searchValue) return;
        const newRepos = searchAndMoveRepo(repos, searchValue);
        if (newRepos) {
            setRepos(newRepos);
            showSuccess("Repository found!.");
        } else {
            showError("No repository found with that name.");
        }
    }

    function handleSuggestionClick(name: string) {
        setUI(u => ({ ...u, searchQuery: name, showSuggestions: false, highlightedIndex: -1 }));
        handleSearch(name);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setUI(u => ({ ...u, searchQuery: value, showSuggestions: true, highlightedIndex: -1 }));
        if (repos.some(repo => repo.name.toLowerCase() === value.trim().toLowerCase())) {
            handleSearch(value);
        }
    }

    function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (ui.showSuggestions && suggestions.length > 0) {
            switch (e.key) {
                case "ArrowDown":
                    setUI(u => ({ ...u, highlightedIndex: (u.highlightedIndex + 1) % suggestions.length }));
                    e.preventDefault();
                    break;
                case "ArrowUp":
                    setUI(u => ({ ...u, highlightedIndex: (u.highlightedIndex - 1 + suggestions.length) % suggestions.length }));
                    e.preventDefault();
                    break;
                case "Enter":
                    if (ui.highlightedIndex >= 0) {
                        handleSuggestionClick(suggestions[ui.highlightedIndex].name);
                        e.preventDefault();
                    }
                    break;
                case "Escape":
                    setUI(u => ({ ...u, showSuggestions: false, highlightedIndex: -1 }));
                    break;
                default:
                    break;
            }
        } else if (e.key === "Enter") {
            handleSearch();
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <Toaster position="top-right" />
            <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
                    <span className="text-2xl font-semibold tracking-tight text-black">CodeRover</span>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Your Repositories</h1>
                        <p className="text-gray-600 mt-1">Manage and review your code repositories</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={fetchAllRepos}>
                            <RefreshCw className="h-4 w-4" />
                            Refresh
                        </button>
                    </div>
                </div>

                <div className="grid gap-4">
                    {ui.loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                            <p className="text-gray-600 text-sm">Fetching repositories...</p>
                        </div>
                    ) : (
                        repos.map((repo) => (
                            <a key={repo.full_name} href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                <div data-aos="flip-up" className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors cursor-pointer">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Github className="h-5 w-5 text-gray-600" />
                                                <h3 className="text-lg font-semibold">{repo.name}</h3>
                                                {repo.private && (
                                                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">Private</span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 mb-3">{repo.name}</p>
                                            <p className="text-gray-500 mb-4">{repo.description || "No description provided."}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                                    {repo.language}
                                                </span>
                                                <span>★ {repo.stargazers_count}</span>
                                                <span>
                                                    Updated {new Date(repo.updated_at).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))
                    )}
                </div>
            </main>

            <footer className="border-t border-gray-200 py-8 bg-white/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        <span className="font-semibold">CodeRover</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        © 2025 CodeRover. Crafted With 💖 by Damian.
                    </p>
                </div>
            </footer>
        </div>
    )
}
