'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { getEpigramsApi } from '../../apis/epigram/epigram';
import { Epigram } from '../../apis/epigram/type';
import { toast } from 'react-hot-toast';

export default function EpigramsPage() {
  const router = useRouter();

  const [epigrams, setEpigrams] = useState<Epigram[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const bottomTriggerRef = useRef<HTMLDivElement | null>(null);

  const fetchEpigrams = async (cursorValue: number | null) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const currentLimit = cursorValue === null ? 6 : 4;

      const data = await getEpigramsApi(cursorValue, currentLimit);

      setEpigrams((prev) => [...prev, ...data.list]);
      setNextCursor(data.nextCursor);
    } catch (error) {
      toast.error('데이터를 불러오는 중 에러가 발생했습니다.');
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  };

  useEffect(() => {
    fetchEpigrams(null);
  }, []);

  useEffect(() => {
    if (isInitialLoad || nextCursor === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          fetchEpigrams(nextCursor);
        }
      },
      { threshold: 0.1 },
    );

    if (bottomTriggerRef.current) {
      observer.observe(bottomTriggerRef.current);
    }

    return () => {
      if (bottomTriggerRef.current) {
        observer.unobserve(bottomTriggerRef.current);
      }
    };
  }, [nextCursor, isLoading, isInitialLoad]);

  return (
    <main>
      {epigrams.length === 0 && !isLoading ? (
        <div>등록된 에피그램이 없습니다.</div>
      ) : (
        <section>
          {epigrams.map((epigram) => (
            <Link href={`/epigrams/${epigram.id}`} key={epigram.id}>
              <blockquote>
                <p>"{epigram.content}"</p>
              </blockquote>
              <cite>— {epigram.author || '익명'}</cite>

              {epigram.tags && epigram.tags.length > 0 && (
                <div>
                  {epigram.tags.map((tag) => (
                    <span key={tag.id}>#{tag.name} </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </section>
      )}

      {nextCursor !== null && <div ref={bottomTriggerRef}>{isLoading && <p>로딩 중...</p>}</div>}
    </main>
  );
}
