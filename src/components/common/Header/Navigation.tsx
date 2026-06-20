'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  href?: string;
  isLoggedIn?: boolean;
}

export default function Navigation() {
  return (
    <nav>
      <Link href="/epigrams" className="text-main-lg-semibold text-black-600">
        피드
      </Link>
    </nav>
  );
}
