import axios from "axios"
import { Github, Search, Plus, RefreshCw, Code } from "lucide-react"
import type RepoType from "../types/RepoType"
import { useEffect, useState } from "react"
import AOS from 'aos';


export default function DashBoard() {
      AOS.init();
    const [repos, setRepos] = useState<RepoType[]>([]);
    useEffect(() => {
        const URL = import.meta.env.VITE_BASE_URL + "/api/v1/github/user/repos";

        async function fetchRepos() {
            try {
                const response = await axios.get(URL, { withCredentials: true });
                console.log(response.data);
                if (response.status === 200) {
                    setRepos(response.data.data);
                } else {
                    console.log("Failed to fetch repositories:", response.statusText);
                }

            } catch (error) {
                console.log("Error fetching repositories:", error.message);

            }


        }
        fetchRepos();






    }, [])

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Code className="h-6 w-6" />
                        <span className="text-xl font-bold">CodeRover</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search repositories..."
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                        </div>
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">U</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Your Repositories</h1>
                        <p className="text-gray-600 mt-1">Manage and review your code repositories</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <RefreshCw className="h-4 w-4" />
                            Refresh
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                            <Plus className="h-4 w-4" />
                            Add Repository
                        </button>
                    </div>
                </div>

                <div className="grid gap-4">
                    {repos.map((repo) => (
                        <a key={repo.full_name} href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            <div  data-aos="flip-up" className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors cursor-pointer">
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
                                            <span>★{repo.stargazers_count}</span>
                                            {/* <span>Updated {repo.lastCommit}</span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </main>
        </div>
    )
}
