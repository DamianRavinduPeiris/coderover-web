import React from "react";
import { Code } from "lucide-react";

const AppFooter: React.FC = () => (
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
);

export default AppFooter;
