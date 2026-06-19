import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

export type ButtonVariant = 'main' | 'wide';

interface BaseProps {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface ButtonAsButtonProps
  extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: never;
}

interface ButtonAsLinkProps
  extends BaseProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'> {
  href: string;
  disabled?: boolean;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

function isLinkProps(props: ButtonProps): props is ButtonAsLinkProps {
  return 'href' in props;
}

export default function Button(props: ButtonProps) {
  const { children, variant = 'main', isLoading = false, className = '' } = props;

  const isButtonDisabled = ('disabled' in props && props.disabled) || isLoading;

  const baseStyle =
    'inline-flex items-center justify-center font-main text-main-xl-semibold h-[64px] px-4 gap-2 rounded-xl border';

  const variantStyles = {
    main: 'w-[286px]',
    wide: 'w-full max-w-[640px]',
  };

  const colorStyles = isButtonDisabled
    ? 'bg-blue-400 border-blue-300 text-white cursor-not-allowed'
    : 'bg-black-500 border-black-500 text-white hover:bg-black-600 hover:border-black-600 active:bg-black-700 active:border-black-700';

  const combinedClassName = cn(baseStyle, variantStyles[variant], colorStyles, className);
  const content = isLoading ? '로딩 중...' : children;

  if (isLinkProps(props)) {
    const { href, disabled, ...linkProps } = props;

    const isLinkDisabled = isButtonDisabled;

    return (
      <Link
        href={isLinkDisabled ? '#' : href}
        className={cn(combinedClassName, isLinkDisabled && 'pointer-events-none opacity-50')}
        aria-disabled={isLinkDisabled}
        tabIndex={isLinkDisabled ? -1 : undefined}
        aria-busy={isLoading}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }

  const { type = 'button', ...buttonProps } = props;

  return (
    <button
      type={type}
      disabled={isButtonDisabled}
      aria-busy={isLoading}
      aria-live={isLoading ? 'polite' : 'off'}
      data-variant={variant}
      className={combinedClassName}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
