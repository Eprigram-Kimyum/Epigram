import React, { ComponentProps, useId } from 'react';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  type = 'text',
  ref,
  id,
  ...props
}: InputProps) {
  const uniqueId = useId();
  const inputId = id || uniqueId;
  const errorId = `${inputId}-error`;

  return (
    <div>
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        id={inputId}
        ref={ref}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && <p id={errorId}>{error}</p>}
    </div>
  );
}
