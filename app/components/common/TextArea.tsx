import React, { ComponentProps, useId } from 'react';

interface TextAreaProps extends ComponentProps<'textarea'> {
  label?: string;
  error?: string;
  showCount?: boolean;
}

export function TextArea({
  label,
  error,
  showCount = false,
  maxLength,
  value = '',
  ref,
  id,
  ...props
}: TextAreaProps) {
  const uniqueId = useId();
  const textareaId = id || uniqueId;
  const errorId = `${textareaId}-error`;
  const displayValue = String(value);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {label && <label htmlFor={textareaId}>{label}</label>}
        {showCount && maxLength && (
          <span>
            {displayValue.length}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        id={textareaId}
        ref={ref}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && <p id={errorId}>{error}</p>}
    </div>
  );
}
