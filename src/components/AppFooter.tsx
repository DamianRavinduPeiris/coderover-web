import React from "react";
import { Code } from "lucide-react";

const AppFooter: React.FC = () => (
  <footer className="border-t border-indigo-200 py-8 bg-white/80 backdrop-blur-md shadow-inner rounded-t-2xl">
    <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Code className="h-6 w-6 text-indigo-500" />
        <span className="font-bold text-black text-lg">CodeRover</span>
      </div>
      <p className="text-sm text-gray-500">
        © 2025 CodeRover. Crafted With{" "}
        <span className="text-pink-500">♥</span> by Damian.
      </p>
    </div>
  </footer>
);

export default AppFooter;
