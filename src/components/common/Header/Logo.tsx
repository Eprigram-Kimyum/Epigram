'use client';

import React from 'react';
import { Icons } from '../Icons';
import Link from 'next/link';

interface LogoProps {
  href?: string;
  isLoggedIn?: boolean;
  isLanding?: boolean;
}

export function Logo({ href = '/' }: LogoProps) {
  return (
    <Link
      href={href}
      className="flex items-center focus-visible:outline-none"
      aria-label="Epigrams 홈"
    >
      <Icons name="logo" className="h-9 w-32.75" />
    </Link>
  );
}
