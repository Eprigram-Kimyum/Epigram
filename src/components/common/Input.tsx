import React, { ComponentProps, useId } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  error?: string;
  suffix?: React.ReactNode;
}

export function Input({
  label,
  error,
  suffix,
  type = 'text',
  className,
  ref,
  id,
  ...props
}: InputProps) {
  const uniqueId = useId();
  const inputId = id || uniqueId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={inputId} className="text-blue-400 text-main-xl-regular">
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          id={inputId}
          ref={ref}
          type={type}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'text-black-950 text-main-xl-regular px-4 w-full h-16 bg-background rounded-xl focus:outline-none focus:border-blue-500 placeholder:text-blue-400',
            suffix && 'pr-12',
            className,
          )}
          {...props}
        />

        {suffix && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
            {suffix}
          </div>
        )}
      </div>

      {error && (
        <p id={errorId} className="mt-1 text-sm text-state-error">
          {error}
        </p>
      )}
    </div>
  );
}
