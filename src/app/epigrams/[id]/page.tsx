'use client';

import { useEffect, useState, use } from 'react';
import Header from '@/components/layout/Header';
import { getEpigramDetailApi } from '@/apis/epigram/epigram';
import { EpigramDetail } from '@/apis/epigram/type';
import EpigramDetailContainer from './_components/EpigramDetailContainer';
import CommentSection from './_components/CommentSection';

interface EpigramDetailPageProps {
  params:
    | Promise<{
        id: string;
      }>
    | { id: string };
}

export default function EpigramDetailPage({ params }: EpigramDetailPageProps) {
  const resolvedParams = 'then' in params ? use(params) : params;
  const { id: epigramId } = resolvedParams;

  const [epigramData, setEpigramData] = useState<EpigramDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const currentUserId = 1;
  const mockUser = { id: 1, nickname: '개발학생', image: null };

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        setIsLoading(true);
        const data = await getEpigramDetailApi(epigramId);
        setEpigramData(data);
      } catch (error) {
        console.error('에피그램 상세 정보를 불러오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailData();
  }, [epigramId]);

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (!epigramData) {
    return <p>존재하지 않는 에피그램입니다.</p>;
  }

  return (
    <>
      <Header isLoggedIn={true} user={mockUser} />

      <main>
        <EpigramDetailContainer epigram={epigramData} currentUserId={currentUserId} />

        <CommentSection epigramId={epigramId} currentUserId={currentUserId} />
      </main>
    </>
  );
}
