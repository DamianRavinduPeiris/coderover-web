import React from 'react';

interface FileContentProps {
  isClassFile: boolean;
  isPng: boolean;
  content: string;
  fileName?: string;
  language: string;
}

import CodeBlock from './CodeBlock';

const FileContent: React.FC<FileContentProps> = ({ isClassFile, isPng, content, fileName, language }) => {
  if (isClassFile) {
    return (
      <div className="flex flex-col items-center justify-center bg-black border border-gray-200 rounded-lg p-8 animate-fade-in-up">
        <span className="text-white font-semibold text-lg mb-2">Cannot render .class files</span>
        <span className="text-white/80 text-sm">Binary .class files cannot be displayed. Please view the source code instead.</span>
      </div>
    );
  } else if (isPng) {
    return (
      <div className="flex justify-center items-center bg-black rounded-lg border border-gray-200 p-6 animate-fade-in-up">
        <img
          src={`data:image/png;base64,${content}`}
          alt={fileName}
          className="max-w-full max-h-[600px] rounded shadow"
          style={{ background: '#fff' }}
        />
      </div>
    );
  } else {
    return <CodeBlock code={content} language={language} />;
  }
};

export default FileContent;
