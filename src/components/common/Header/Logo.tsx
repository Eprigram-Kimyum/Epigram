'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '../Icons';

interface LogoProps {
  isLoggedIn: boolean;
  isLanding?: boolean;
}

export default function Logo({ isLoggedIn, isLanding = false }: LogoProps) {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <div
      onClick={handleLogoClick}
      role="button"
      tabIndex={0}
      className="flex cursor-pointer items-center focus-visible:outline-none"
      onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
    >
      {isLanding ? (
        <Icons name="logo" className="h-9 w-32.75" />
      ) : (
        <Icons name="symbol" className="h-9 w-32.75" />
      )}
    </div>
  );
}
