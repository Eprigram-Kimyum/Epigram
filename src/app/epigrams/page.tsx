'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { getEpigramsApi } from '../../apis/epigram/epigram';
import { Epigram } from '../../apis/epigram/type';
import { toast } from 'react-hot-toast';

export default function EpigramsPage() {
  const [epigrams, setEpigrams] = useState<Epigram[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const bottomTriggerRef = useRef<HTMLDivElement | null>(null);

  const stateRef = useRef({ nextCursor, isLoading, isInitialLoad });

  stateRef.current = { nextCursor, isLoading, isInitialLoad };

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

  // 💡 2-① 리뷰 반영: 의존성 배열을 비워 Observer 재생성 방지 최적화
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Ref에서 언제나 '가장 최신의' 상태값을 꺼내와서 확인
        const { nextCursor, isLoading, isInitialLoad } = stateRef.current;

        if (entries[0].isIntersecting && !isLoading && !isInitialLoad && nextCursor !== null) {
          fetchEpigrams(nextCursor);
        }
      },
      { threshold: 0.1 },
    );

    const currentTrigger = bottomTriggerRef.current;
    if (currentTrigger) {
      observer.observe(currentTrigger);
    }

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
    };
  }, []);

  return (
    <main>
      {epigrams.length === 0 && !isLoading ? (
        <div>등록된 에피그램이 없습니다.</div>
      ) : (
        <section>
          {epigrams.map((epigram) => (
            <Link href={`/epigrams/${epigram.id}`} key={epigram.id}>
              <figure>
                <blockquote>
                  <p>"{epigram.content}"</p>
                </blockquote>
                <figcaption>
                  — <cite>{epigram.author || '익명'}</cite>
                </figcaption>
              </figure>

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
