import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'hover' | 'click' | 'disabled';
  isLoading?: boolean;
}

export default function Button({
  children,
  type = 'button',
  variant = 'default',
  isLoading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  // 지금은 기능만 구분할 수 있도록 최소한의 테두리와 여백만 부여해둠.
  const baseStyle = 'border p-2 rounded disabled:opacity-50';

  const variantStyles = {
    default: 'bg-transparent text-black',
    hover: 'bg-transparent text-gray-500',
    click: 'bg-transparent text-blue-500',
    disabled: 'bg-transparent text-gray-300',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? '로딩 중...' : children}
    </button>
  );
}
