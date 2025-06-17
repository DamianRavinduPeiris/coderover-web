import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript' }) => (
  <div className="vs-code-mockup rounded-lg border border-gray-900/10 shadow-lg overflow-hidden animate-fade-in-up bg-[#1e1e1e]">
    <div className="flex items-center gap-2 px-4 py-2 bg-[#23272e] border-b border-[#222]">
      <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
      <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
      <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
      <span className="ml-4 text-xs text-white/60 font-mono">{language}</span>
    </div>
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{ margin: 0, background: '#1e1e1e', fontSize: 14, padding: 24 }}
      showLineNumbers
      wrapLongLines
    >
      {code}
    </SyntaxHighlighter>
  </div>
);

export default CodeBlock;
