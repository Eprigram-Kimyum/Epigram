import React from 'react';
import Header from '@/components/common/Header/Header';

export const metadata = {
  title: 'Epigrams',
  description: '나만의 에피그램을 공유하는 공간',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <Header />

        <main>{children}</main>
      </body>
    </html>
  );
}
