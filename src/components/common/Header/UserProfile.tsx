'use client';

import React from 'react';

interface UserProfileProps {
  user: {
    nickname: string;
    profileImageUrl: string;
  };
  onLogout: () => void;
}

export default function UserProfile({ user, onLogout }: UserProfileProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img
        src={user.profileImageUrl || 'https://via.placeholder.com/32'}
        alt={`${user.nickname}님의 프로필`}
        style={{ width: '32px', height: '32px', borderRadius: '50%' }}
      />
      <span>{user.nickname}</span>
      <button onClick={onLogout} style={{ marginLeft: '8px' }}>
        로그아웃
      </button>
    </div>
  );
}
