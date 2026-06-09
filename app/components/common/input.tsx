import React, { ComponentProps, useId } from 'react';

interface InputProps extends ComponentProps<'input'> {
  label: string;
  error?: string;
}

export function Input({
  label,
  error,
  type = 'text',
  ref,
  id,
  className,
  ...props
}: InputProps) {
  const uniqueId = useId();
  const inputId = id || uniqueId;
  const errorId = `${inputId}-error`;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className || ''}`}>
      <label htmlFor={inputId} className="text-sm font-semibold text-black-700">
        {label}
      </label>

      <input
        id={inputId}
        ref={ref}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`px-4 py-2.5 rounded-lg border text-base transition-all duration-200
          focus:outline-none focus:ring-2
          ${
            error
              ? 'border-state focus:border-state focus:ring-state/20'
              : 'border-gray-200 focus:border-blue-700 focus:ring-blue-500/20'
          }`}
        {...props}
      />

      {error && (
        <p className="text-xs text-state font-medium mt-0.5" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
