'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getEpigramsApi } from '../../apis/epigram/epigram';
import { Epigram } from '../../apis/epigram/type';
import EpigramCard from './_components/epigramCard';

export default function EpigramsPage() {
  const [epigrams, setEpigrams] = useState<Epigram[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const observerRef = useRef<IntersectionObserver | null>(null);
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
      console.error('에피그램을 불러오는 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  };

  useEffect(() => {
    fetchEpigrams(null);
  }, []);

  const bottomTriggerRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (node) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const {
            nextCursor: latestCursor,
            isLoading: latestLoading,
            isInitialLoad: latestInitial,
          } = stateRef.current;

          if (entries[0].isIntersecting && !latestLoading && !latestInitial) {
            if (latestCursor !== null) {
              fetchEpigrams(latestCursor);
            }
          }
        },
        { threshold: 0.1 },
      );
      observerRef.current.observe(node);
    }
  }, []);

  return (
    <main>
      {isInitialLoad && isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <section>
          {epigrams.map((epigram) => (
            <EpigramCard key={epigram.id} epigram={epigram} />
          ))}
        </section>
      )}

      {nextCursor !== null && (
        <div ref={bottomTriggerRef}>{isLoading && <p>추가 데이터 로딩 중...</p>}</div>
      )}
    </main>
  );
}
