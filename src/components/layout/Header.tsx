'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: number;
  nickname: string;
  image: string | null;
}

interface HeaderProps {
  isLoggedIn: boolean;
  user: UserProfile | null;
  onLogout?: () => void;
}

export default function Header({ isLoggedIn, user, onLogout }: HeaderProps) {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <header>
      <div onClick={handleLogoClick} role="button" tabIndex={0}>
        <h1>EPIGRAM</h1>
      </div>

      <nav>
        {isLoggedIn && user ? (
          <ul>
            <li>
              <Link href="/epigrams">피드</Link>
            </li>
            <li>
              <div>
                {user.image ? (
                  <img src={user.image} alt={`${user.nickname}의 프로필`} />
                ) : (
                  <div>{user.nickname[0]}</div>
                )}
                <span>{user.nickname}</span>
              </div>
            </li>
            {onLogout && (
              <li>
                <button type="button" onClick={onLogout}>
                  로그아웃
                </button>
              </li>
            )}
          </ul>
        ) : (
          <ul>
            <li>
              <Link href="/login">로그인</Link>
            </li>
            <li>
              <Link href="/signup">회원가입</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
