import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="flex-1 flex flex-col items-center justify-center">
    <div className="text-red-500">{message}</div>
  </div>
);

export default ErrorMessage;
