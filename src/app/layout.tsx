import React from 'react';
import '@/styles/globals.css';

export const metadata = {
  title: 'Epigrams',
  description: '나만의 에피그램을 공유하는 공간',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
