'use client';

import { useEffect, useState, use } from 'react';
import Header from '@/components/layout/Header';
import instance from '@/apis/instance'; // 💡 기존 Axios 인스턴스 사용
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
  // 💡 실제 로그인한 유저 정보를 담을 상태 (비로그인이면 null)
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

        // 💡 1. 에피그램 상세 정보와 내 정보를 병렬(Promise.all)로 동시 요청합니다.
        // 비로그인 상태일 때는 /users/me가 401 에러를 던지므로 .catch()로 방어하여 null 처리합니다.
        const [epigram, userResponse] = await Promise.all([
          getEpigramDetailApi(epigramId),
          instance.get('/users/me').catch(() => null),
        ]);

        setEpigramData(epigram);

        if (userResponse && userResponse.data) {
          setUserData(userResponse.data); // 로그인 성공 시 실제 유저 데이터 바인딩
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

  // 💡 실서버 기반 권한 변수화
  const currentUserId = userData ? userData.id : null;
  const isLoggedIn = userData !== null;

  return (
    <>
      {/* 💡 실서버 정보 전송: 로그인 상태와 유저 정보가 동적으로 반영됩니다. */}
      <Header isLoggedIn={isLoggedIn} user={userData} />

      <main>
        {/* 본인 글/댓글 판단 로직에 실제 서버 유저 ID(로그아웃 시 null)가 대입됩니다. */}
        <EpigramDetailContainer epigram={epigramData} currentUserId={currentUserId} />
        <CommentSection epigramId={epigramId} currentUserId={currentUserId} />
      </main>
    </>
  );
}
