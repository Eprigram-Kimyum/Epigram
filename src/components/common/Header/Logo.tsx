'use client';

import React from 'react';
import { Icons } from '../Icons';
import Link from 'next/link';

interface LogoProps {
  isLoggedIn: boolean;
  isLanding?: boolean;
}

export default function Logo({ isLoggedIn, isLanding = false }: LogoProps) {
  const href = '/';

  return (
    <Link href={href} className="flex items-center focus-visible:outline-none">
      {isLanding ? (
        <Icons name="logo" className="h-9 w-32.75" aria-label="Epigrams 홈" />
      ) : (
        <Icons name="symbol" className="h-9 w-32.75" aria-label="Epigrams 홈" />
      )}
    </Link>
  );
}
