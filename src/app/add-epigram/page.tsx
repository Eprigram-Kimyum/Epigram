'use client';

import React from 'react';
import { PostForm } from '../../components/common/PostForm';

export default function AddEpigramPage() {
  return (
    <div>
      <header>
        <p>에피그램 만들기</p>
      </header>

      <main>
        <PostForm />
      </main>
    </div>
  );
}
