import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const isButtonDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isButtonDisabled}
      aria-busy={isLoading}
      aria-live={isLoading ? 'polite' : 'off'}
      data-variant={variant}
      {...props}
    >
      {isLoading ? '로딩 중...' : children}
    </button>
  );
}
