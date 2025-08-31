import React from 'react';

interface EmptyContentProps {
  message?: string;
}

const EmptyContent: React.FC<EmptyContentProps> = ({ message = 'File content is empty or not available.' }) => (
  <div className="flex-1 flex flex-col items-center justify-center">
    <div className="text-gray-500">{message}</div>
  </div>
);

export default EmptyContent;
