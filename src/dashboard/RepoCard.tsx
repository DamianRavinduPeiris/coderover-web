import { Github } from "lucide-react";
import type RepoType from "../types/RepoType";

export default function RepoCard({ repo, onClick }: { repo: RepoType, onClick?: () => void }) {
    return (
        <a key={repo.full_name} href={repo.html_url} target="_blank" rel="noopener noreferrer" onClick={onClick}>
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
    );
}
