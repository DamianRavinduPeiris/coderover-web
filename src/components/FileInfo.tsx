import React from 'react';

interface FileInfoProps {
  repo: string;
  fileName?: string;
  sha?: string;
}

const FileInfo: React.FC<FileInfoProps> = ({ repo, fileName, sha }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4 border-b border-gray-200 pb-3">
    <div className="flex items-center gap-2 text-lg font-semibold text-black">
      <span className="h-5 w-5 text-black">📄</span>
      <span>{repo}</span>
      <span className="text-gray-400">/</span>
      <span className="text-black font-mono text-base">{fileName ?? 'File'}</span>
    </div>
    <div className="text-xs text-black/60 font-mono break-all">SHA: {sha}</div>
  </div>
);

export default FileInfo;
