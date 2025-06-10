import { Github, Code, Search, CheckCircle } from "lucide-react";
import axios from "axios";


export default function LandingPage() {
    const REDIRECT__URL = import.meta.env.VITE_BASE_URL + "/oauth2/authorization/github";

    return (
        <div className="min-h-screen bg-white text-black">
            <header className="border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Code className="h-6 w-6" />
                        <span className="text-xl font-bold">CodeRover</span>
                    </div>
                </div>
            </header>

            <main>
                <section className="max-w-6xl mx-auto px-6 py-20">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl font-bold mb-6">AI-Driven Code Reviews</h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Instantly catch bugs, security issues, and code smells as you
                            commit. Connect to GitHub for real-time, actionable feedback.
                        </p>
                        <div className="flex justify-center">
                            <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                                onClick={() => {
                                    window.location.href = REDIRECT__URL;
                                }}>
                                <Github className="h-5 w-5" />
                                Continue with GitHub
                            </button>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-50 py-20">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                            <p className="text-xl text-gray-600">
                                Simple integration, powerful results
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Github className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">
                                    1. Connect Repository
                                </h3>
                                <p className="text-gray-600">
                                    Login via Github OAuth and connect your repository to
                                    CodeRover.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">2. AI Analyzes Code</h3>
                                <p className="text-gray-600">
                                    Our AI engine scans your codebase for bugs, security
                                    vulnerabilities, and best practices.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">3. Get Insights</h3>
                                <p className="text-gray-600">
                                    Receive detailed reports with actionable suggestions to
                                    improve your code quality.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to improve your code?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Join developers who are shipping better code with CodeRover
                        </p>
                    </div>
                </section>
            </main>
            <footer className="border-t border-gray-200 py-8">
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        <span className="font-semibold">CodeRover</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        © 2025 CodeRover. Made With 💖 by Damian.
                    </p>
                </div>
            </footer>
        </div>
    );
}
