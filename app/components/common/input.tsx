import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, ...props }, ref) => {
    const uniqueId = useId();

    return (
      <div
        className={`flex flex-col gap-1.5 w-full max-w-sm ${className || ''}`}
      >
        <label htmlFor={uniqueId} className="text-sm font-medium text-gray-700">
          {label}
        </label>

        <input
          ref={ref}
          id={uniqueId}
          className={`w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 transition-all
            ${errorMessage ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
          {...props}
        />

        {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
