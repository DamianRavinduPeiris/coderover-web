import { Github, Code, Search, CheckCircle } from "lucide-react";
import { useEffect, useMemo, type ReactElement } from "react";
import AOS from 'aos';

function GithubLoginButton({ redirectUrl }: Readonly<{ redirectUrl: string }>) {
    return (
        <div className="flex justify-center">
            <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => { window.location.href = redirectUrl; }}>
                <Github className="h-5 w-5" />
                Continue with GitHub
            </button>
        </div>
    );
}

function FeatureCard({ icon, title, description }: Readonly<{ icon: ReactElement; title: string; description: string }>) {
    return (
        <div className="text-center">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

export default function LandingPage() {
    useEffect(() => { AOS.init(); }, []);
    const REDIRECT__URL = useMemo(() => import.meta.env.VITE_BASE_URL + "/oauth2/authorization/github", []);

    return (
        <div data-aos="fade-left" className="min-h-screen bg-white text-black">
            <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
                    <span className="text-2xl font-semibold tracking-tight text-black">CodeRover</span>
                </div>
            </header>
            <main>
                <section className="max-w-4xl mx-auto px-6 py-20" >
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-6xl font-bold mb-6">
                            CodeRover - Your AI Code Review Companion
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Instantly catch bugs, security issues, and code smells as you
                            commit. Connect to GitHub for real-time, actionable feedback.
                        </p>
                        <GithubLoginButton redirectUrl={REDIRECT__URL} />
                    </div>
                </section>

                <section className="bg-gray-50 py-20" data-aos="flip-up">
                    <div data-aos="fade-right" className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                            <p className="text-xl text-gray-600">
                                Simple integration, powerful results
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Github className="h-8 w-8 text-white" />}
                                title="1. Connect Repository"
                                description="Login via Github OAuth and connect your repository to CodeRover."
                            />
                            <FeatureCard
                                icon={<Search className="h-8 w-8 text-white" />}
                                title="2. AI Analyzes Code"
                                description="Our AI engine scans your codebase for bugs, security vulnerabilities, and best practices."
                            />
                            <FeatureCard
                                icon={<CheckCircle className="h-8 w-8 text-white" />}
                                title="3. Get Insights"
                                description="Receive detailed reports with actionable suggestions to improve your code quality."
                            />
                        </div>
                    </div>
                </section>

                <section data-aos="flip-up" className="py-20">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to improve your code?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Join developers who are shipping better code with CodeRover
                        </p>
                        <GithubLoginButton redirectUrl={REDIRECT__URL} />
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
