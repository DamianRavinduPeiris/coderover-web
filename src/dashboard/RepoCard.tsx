import { Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type RepoType from "../types/RepoType";

export default function RepoCard({ repo }: { readonly repo: RepoType }) {
    const navigate = useNavigate();
    const handleCardClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const [owner, repoName] = repo.full_name.split('/');
        navigate(`/repos/${owner}/${repoName}/tree`, {
            state: {
                repoMeta: {
                    name: repo.name,
                    updated_at: repo.updated_at,
                    stargazers_count: repo.stargazers_count,
                    private: repo.private,
                    language: repo.language,
                    description: repo.description,
                }
            }
        });
    };
    return (
        <button
            type="button"
            onClick={handleCardClick}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick({
                        ...e,
                        preventDefault: () => {},
                        stopPropagation: () => {},
                        nativeEvent: {} as Event,
                        currentTarget: e.currentTarget,
                        target: e.target,
                        bubbles: false,
                        cancelable: false,
                        defaultPrevented: false,
                        eventPhase: 0,
                        isTrusted: true,
                        timeStamp: Date.now(),
                        type: 'click',
                    } as unknown as React.MouseEvent);
                }
            }}
            tabIndex={0}
            className="w-full text-left"
            style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
        >
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
        </button>
    );
}
