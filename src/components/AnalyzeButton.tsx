import React from 'react';

interface AnalyzeButtonProps {
  analyzing: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const AnalyzeButton: React.FC<AnalyzeButtonProps> = ({ analyzing, onClick, disabled }) => (
  <button
    className="px-4 py-1 bg-black text-white rounded-full transition-colors text-xs font-semibold border border-black flex items-center gap-2"
    onClick={onClick}
    disabled={disabled || analyzing}
    style={{ minWidth: 90 }}
  >
    {analyzing && (
      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
    )}
    {analyzing ? 'Analyzing...' : 'Analyze'}
  </button>
);

export default AnalyzeButton;
