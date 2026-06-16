'use client';

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div>
      <section>
        <h1>일상을 기록하는 한 줄, Epigrams</h1>
        <p>감명 깊은 문장과 생각을 사람들과 자유롭게 공유해 보세요.</p>
      </section>

      <section>
        <Link href="/login">에피그램 시작하기</Link>
      </section>
    </div>
  );
}
