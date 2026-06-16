'use client';

import React from 'react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/epigrams" style={{ textDecoration: 'none', color: '#333' }}>
        피드
      </Link>
    </nav>
  );
}
