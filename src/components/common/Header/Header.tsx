// components/common/Header/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserMeApi } from '@/apis/user/user';
import { UserResponse } from '@/apis/user/type';
import Logo from './Logo';
import Navigation from './Navigation';
import UserProfile from './UserProfile';

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window === 'undefined') return;

      try {
        const data = await getUserMeApi();
        if (data && data.nickname) {
          setUser(data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.warn('초기 세션 인증 정보가 없거나 비로그인 상태입니다.');
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);
  const handleLogout = async () => {
    try {
      alert('로그아웃 되었습니다.');
      setIsLoggedIn(false);
      setUser(null);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <header>
      <Logo isLoggedIn={isLoggedIn} />
      {isLoggedIn && <Navigation />}
      <div>
        {isLoggedIn && user ? (
          <UserProfile
            user={{ nickname: user.nickname, profileImageUrl: user.image || '' }}
            onLogout={handleLogout}
          />
        ) : (
          <button type="button" onClick={() => router.push('/login')}>
            로그인
          </button>
        )}
      </div>
    </header>
  );
}
