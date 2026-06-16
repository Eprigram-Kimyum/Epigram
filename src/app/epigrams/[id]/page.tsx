'use client';

import { useEffect, useState, use } from 'react';
import Header from '@/components/layout/Header';
import instance from '@/app/apis/instance'; // 💡 기존 Axios 인스턴스 사용
import { getEpigramDetailApi } from '@/app/apis/epigram/epigram';
import { EpigramDetail } from '@/app/apis/epigram/type';
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
  const [userData, setUserData] = useState<{
    id: number;
    nickname: string;
    image: string | null;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);

        const [epigram, userResponse] = await Promise.all([
          getEpigramDetailApi(epigramId),
          instance.get('/users/me').catch(() => null),
        ]);

        setEpigramData(epigram);

        if (userResponse && userResponse.data) {
          setUserData(userResponse.data);
        }
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [epigramId]);

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (!epigramData) {
    return <p>존재하지 않는 에피그램입니다.</p>;
  }

  const currentUserId = userData ? userData.id : null;
  const isLoggedIn = userData !== null;

  return (
    <>
      <Header isLoggedIn={isLoggedIn} user={userData} />

      <main>
        <EpigramDetailContainer epigram={epigramData} currentUserId={currentUserId} />
        <CommentSection epigramId={epigramId} currentUserId={currentUserId} />
      </main>
    </>
  );
}
