// src/app/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/common/Header/Header';
import Button from '@/components/common/Button';
import { Icons } from '@/components/common/Icons';
import { IMAGES } from '@/assets/images/images';

export default function LandingPage() {
  return (
    /* eslint-disable tailwindcss/no-custom-classname */
    <div className="w-full min-h-screen bg-white overflow-x-hidden font-main scroll-smooth">
      <Header />

      <main className="w-full max-w-[1920px] mx-auto py-16">
        <section className="flex flex-col items-center justify-center text-center bg-white min-h-[85vh] relative pt-20 pb-32">
          <div className="space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-normal leading-relaxed text-black-900 font-sub">
              나만 알고 있기엔 아까운 글이 있지 않나요?
            </h1>
            <p className="text-black-200 text-sm md:text-base">나만의 에피그램을 기록해 보세요.</p>
          </div>

          <Link href="/login" passHref>
            <Button variant="main">시작하기</Button>
          </Link>

          <a
            href="#content"
            className="absolute bottom-12 flex flex-col items-center space-y-2 group cursor-pointer no-underline"
            aria-label="본문 콘텐츠로 스크롤하여 더 알아보기"
          >
            <span className="text-blue-500 text-xs md:text-sm font-medium tracking-wide transition-colors group-hover:text-blue-600">
              더 알아보기
            </span>
            <div className="text-blue-300 animate-bounce group-hover:text-blue-400">
              <Icons name="chevron-up" className="w-4 h-4" />
            </div>
          </a>
        </section>

        <div
          id="content"
          className="w-full bg-background py-32 relative scroll-mt-20"
          style={{
            backgroundImage: `
              linear-gradient(135deg, white 25%, transparent 25%), 
              linear-gradient(225deg, white 25%, transparent 25%),
              linear-gradient(45deg, white 25%, transparent 25%), 
              linear-gradient(315deg, white 25%, transparent 25%)
            `,
            backgroundPosition: 'top center, top center, bottom center, bottom center',
            backgroundSize: '20px 20px',
            backgroundRepeat: 'repeat-x',
          }}
        >
          <div className="w-full max-w-[1188px] mx-auto px-4 space-y-40">
            <section className="flex flex-col md:flex-row items-center justify-between w-full gap-12 mx-auto">
              <div className="flex-shrink-0 overflow-hidden">
                <Image
                  src={IMAGES.CARD_MOCKUP.src}
                  alt={IMAGES.CARD_MOCKUP.alt}
                  width={744}
                  height={388}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="w-full md:w-[380px] space-y-4 text-left">
                <h2 className="text-2xl font-bold text-black-900 leading-snug md:text-[28px]">
                  명언이나 글귀, 토막 상식들을 공유해 보세요.
                </h2>
                <p className="text-black-200 text-sm md:text-base leading-relaxed">
                  나만 알던 소중한 글들을 다른 사람들에게 전파하세요
                </p>
              </div>
            </section>

            <section className="flex flex-col md:flex-row-reverse items-center justify-between w-full gap-12 mx-auto">
              <div className="flex-shrink-0 overflow-hidden">
                <Image
                  src={IMAGES.STATISTIC_LIST.src}
                  alt={IMAGES.STATISTIC_LIST.alt}
                  width={744}
                  height={388}
                  className="object-contain"
                />
              </div>
              <div className="w-full md:w-[380px] space-y-4 text-left">
                <h2 className="text-2xl font-bold text-black-900 leading-snug md:text-[28px]">
                  감정 상태에 따라, 알맞은 위로를 받을 수 있어요.
                </h2>
                <p className="text-black-200 text-sm md:text-base leading-relaxed">
                  태그를 통해 글을 모아 볼 수 있어요
                </p>
              </div>
            </section>

            <section className="flex flex-col md:flex-row items-center justify-between w-full gap-12 mx-auto">
              <div className="flex-shrink-0 overflow-hidden">
                <Image
                  src={IMAGES.STATISTICS_CHART.src}
                  alt={IMAGES.STATISTICS_CHART.alt}
                  width={744}
                  height={388}
                  className="object-contain"
                />
              </div>
              <div className="w-full md:w-[380px] space-y-4 text-left">
                <h2 className="text-2xl font-bold text-black-900 leading-snug md:text-[28px]">
                  내가 요즘 어떤 감정 상태인지 통계로 한눈에 볼 수 있어요.
                </h2>
                <p className="text-black-200 text-sm md:text-base leading-relaxed">
                  감정 달력으로 내 마음에 담긴 감정을 확인해보세요
                </p>
              </div>
            </section>

            <section className="w-full text-center space-y-12 pt-12 pb-12">
              <h2 className="text-2xl font-bold md:text-[28px] text-black-900">
                사용자들이 직접 인용한 에피그램들
              </h2>
              <div className="w-full max-w-[640px] mx-auto flex justify-center overflow-hidden">
                <Image
                  src={IMAGES.EXAMPLES.src}
                  alt="사용자들이 작성한 에피그램 카드 목록 이미지"
                  width={640}
                  height={960}
                  className="w-full h-auto object-contain"
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-[1920px] mx-auto py-24 text-center flex flex-col items-center justify-center space-y-8 bg-white">
        <div className="flex justify-center" aria-label="날마다 에피그램">
          <Icons name="slogon" className="w-[184px] h-[105px]" />
        </div>
        <Link href="/login" passHref>
          <Button variant="main">에피그램 시작하기</Button>
        </Link>
      </footer>
    </div>
  );
}
