import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

export type ButtonVariant = 'main' | 'wide';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  href?: string;
}

export default function Button({
  children,
  type = 'button',
  variant = 'main',
  isLoading = false,
  disabled,
  className = '',
  href,
  ...props
}: ButtonProps) {
  const isButtonDisabled = disabled || isLoading;

  const baseStyle =
    'inline-flex items-center justify-center font-main font-medium rounded-xl transition-colors duration-200';

  const variantStyles = {
    main: 'px-6 py-3 text-sm min-w-[80px]',
    wide: 'w-full py-4 text-base tracking-wide',
  };

  const colorStyles = isButtonDisabled
    ? 'bg-illustration-sub-gray1 text-white cursor-not-allowed'
    : 'bg-black-800 text-white hover:bg-black-700 active:bg-black-900';

  const combinedClassName = cn(baseStyle, variantStyles[variant], colorStyles, className);

  if (href) {
    return (
      <Link
        href={isButtonDisabled ? '#' : href}
        className={combinedClassName}
        aria-busy={isLoading}
        {...(props as any)}
      >
        {isLoading ? '로딩 중...' : children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={isButtonDisabled}
      aria-busy={isLoading}
      aria-live={isLoading ? 'polite' : 'off'}
      data-variant={variant}
      className={combinedClassName}
      {...props}
    >
      {isLoading ? '로딩 중...' : children}
    </button>
  );
}
