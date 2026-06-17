import React from 'react';

// 피그마 디자인 시스템에 맞춰 variant 타입을 main과 wide로 재정의합니다.
export type ButtonVariant = 'main' | 'wide';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export default function Button({
  children,
  type = 'button',
  variant = 'main',
  isLoading = false,
  disabled,
  className = '',
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
    ? 'bg-illustration-sub-gray1 text-white cursor-not-allowed' // disabled / isLoading 상태
    : 'bg-black-800 text-white hover:bg-black-700 active:bg-black-900'; // default, hover, click(active)

  return (
    <button
      type={type}
      disabled={isButtonDisabled}
      aria-busy={isLoading}
      aria-live={isLoading ? 'polite' : 'off'}
      data-variant={variant}
      className={`${baseStyle} ${variantStyles[variant]} ${colorStyles} ${className}`}
      {...props}
    >
      {isLoading ? '로딩 중...' : children}
    </button>
  );
}
