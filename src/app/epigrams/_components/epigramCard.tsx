'use client';

import Link from 'next/link';
import { Epigram } from '../../../apis/epigram/type';

interface EpigramCardProps {
  epigram: Epigram;
}

export default function EpigramCard({ epigram }: EpigramCardProps) {
  const authorName = epigram.author || '익명';

  return (
    <Link
      href={`/epigrams/${epigram.id}`}
      aria-label={`${authorName}의 명언 상세보기: "${epigram.content}"`}
    >
      <figure>
        <blockquote>
          <p>"{epigram.content}"</p>
        </blockquote>
        <figcaption>
          — <cite>{authorName}</cite>
        </figcaption>
      </figure>
    </Link>
  );
}
