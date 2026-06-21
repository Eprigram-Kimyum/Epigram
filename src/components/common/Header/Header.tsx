'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getUserMeApi } from '@/app/apis/user/user';
import { UserResponse } from '@/app/apis/user/type';
import { Logo } from './Logo';
import Navigation from './Navigation';
import UserProfile from './UserProfile';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserResponse | null>(null);

  const isLandingPage = pathname === '/';

  const isAuthPage = pathname === '/login' || pathname === '/signup';

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
    <header className="flex justify-between items-center max-w-screen max-h-20 border-b border-gray-100 py-6.5 px-30 bg-white">
      <div className="flex items-center gap-8">
        <Logo isLoggedIn={isLoggedIn} isLanding={isLandingPage} />
        {isLoggedIn && <Navigation />}
      </div>

      <div className="flex items-center">
        {isLoggedIn && user ? (
          <UserProfile
            user={{ nickname: user.nickname, profileImageUrl: user.image || '' }}
            onLogout={handleLogout}
          />
        ) : (
          !isAuthPage && (
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="text-main-md-medium"
            >
              로그인
            </button>
          )
        )}
      </div>
    </header>
  );
}
