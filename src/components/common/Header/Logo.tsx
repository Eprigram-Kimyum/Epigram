'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  isLoggedIn: boolean;
}

export default function Logo({ isLoggedIn }: LogoProps) {
  return (
    <Link
      href={isLoggedIn ? '/epigrams' : '/'}
      style={{ fontWeight: 'bold', fontSize: '20px', textDecoration: 'none', color: '#000' }}
    >
      Epigrams
    </Link>
  );
}
