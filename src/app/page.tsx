import React from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { Icons } from '@/components/common/Icons';
import { IMAGES } from '@/assets/images/images';

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden font-main">
      <main className="w-full mx-auto">
        <section className="relative flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center bg-white text-center bg-[linear-gradient(to_bottom,transparent_97%,#F2f2F2_97%)] bg-size-[100%_3.33%]">
          <div className="flex flex-col items-center space-y-4 mb-8 z-10">
            <h1 className="text-sub-4xl leading-relaxed text-black-500 font-sub">
              나만 알고 있기엔 <br className="hidden md:inline" />
              아까운 글이 있지 않나요?
            </h1>
            <p className="text-sub-xl text-black-300 font-sub ">
              다른 사람들과 감정을 공유해 보세요.
            </p>
          </div>
          <Button variant="main" href="/login">
            시작하기
          </Button>

          <a
            href="#content"
            className="absolute bottom-12 w-18.5 h-13.5 flex flex-col items-center space-y-1 group cursor-pointer no-underline z-10"
          >
            <span className="text-blue-400 text-main-lg-semibold">더 알아보기</span>
            <div className="text-blue-400 h-6 w-6 animate-bounce">
              <Icons name="chevron-up" />
            </div>
          </a>
        </section>

        <div
          id="content"
          className="w-full bg-background py-52.5 relative scroll-mt-20"
          style={{
            backgroundImage: `
              linear-gradient(160deg, white 45%, transparent 45%), 
              linear-gradient(200deg, white 45%, transparent 45%),
              linear-gradient(20deg, white 45%, transparent 45%), 
              linear-gradient(340deg, white 45%, transparent 45%)
      `,
            backgroundPosition: 'top center, top center, bottom center, bottom center',
            backgroundSize: '60px 20px',
            backgroundRepeat: 'repeat-x',
          }}
        >
          <div className="w-full max-w-max mx-auto px-4 space-y-95">
            <section className="flex flex-col md:flex-row items-end justify-center gap-20 w-full">
              <div className="w-full md:w-186 shrink-0 overflow-hidden">
                <Image
                  src={IMAGES.CARD_MOCKUP.src}
                  alt={IMAGES.CARD_MOCKUP.alt}
                  width={744}
                  height={388}
                  className="object-contain w-full h-auto"
                  priority
                />
              </div>
              <div className="flex-1 text-left space-y-4 md:space-y-6">
                <h2 className="text-main-3xl-bold text-black-950 leading-tight">
                  명언이나 글귀, <br className="hidden md:block" />
                  토막 상식들을 공유해 보세요.
                </h2>
                <p className="text-blue-600 text-main-2xl-medium leading-relaxed">
                  나만 알던 소중한 글들을 <br className="hidden md:block" />
                  다른 사람들에게 전파하세요
                </p>
              </div>
            </section>

            <section className="flex flex-col md:flex-row-reverse items-end justify-center w-full gap-20">
              <div className="w-full md:w-186 shrink-0 overflow-hidden">
                <Image
                  src={IMAGES.STATISTIC_LIST.src}
                  alt={IMAGES.STATISTIC_LIST.alt}
                  width={744}
                  height={388}
                  className="object-contain w-full h-auto"
                />
              </div>
              <div className="flex-1 text-right space-y-4 md:space-y-6">
                <h2 className="text-main-3xl-bold text-black-950 leading-tight">
                  감정 상태에 따라, <br className="hidden md:block" />
                  알맞은 위로를 받을 수 있어요.
                </h2>
                <p className="text-blue-600 text-main-2xl-medium leading-relaxed">
                  태그를 통해 글을 모아 볼 수 있어요
                </p>
              </div>
            </section>

            <section className="flex flex-col md:flex-row items-end justify-center gap-20 w-full">
              <div className="w-full md:w-186 shrink-0 overflow-hidden">
                <Image
                  src={IMAGES.STATISTICS_CHART.src}
                  alt={IMAGES.STATISTICS_CHART.alt}
                  width={744}
                  height={388}
                  className="object-contain w-full h-auto"
                />
              </div>
              <div className="flex-1 text-left space-y-4 md:space-y-6">
                <h2 className="text-main-3xl-bold text-black-950 leading-tight">
                  내가 요즘 어떤 감정 상태인지 <br className="hidden md:block" />
                  통계로 한눈에 볼 수 있어요.
                </h2>
                <p className="text-blue-600 text-main-2xl-medium leading-relaxed">
                  감정 달력으로 <br className="hidden md:block" />내 마음에 담긴 감정을 확인해보세요
                </p>
              </div>
            </section>
          </div>

          <div className="w-full max-w-max mx-auto px-4 mt-67.5">
            <section className="flex flex-col w-full text-center">
              <h2 className="text-main-3xl-bold text-black-950 mb-25">
                사용자들이 직접 <br className="hidden md:block" />
                인용한 에피그램들
              </h2>
              <div className="w-full max-w-160 mx-auto flex justify-center overflow-hidden">
                <Image
                  src={IMAGES.EXAMPLES.src}
                  alt="사용자들이 작성한 에피그램 카드 목록 이미지"
                  width={640}
                  height={960}
                  className="object-contain w-full h-auto"
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer
        className="w-full h-screen mx-auto text-center flex flex-col items-center justify-center space-y-8 bg-white"
        style={{
          backgroundImage: `
            linear-gradient(160deg, transparent 45%), 
            linear-gradient(200deg, transparent 45%),
            linear-gradient(20deg, transparent 45%), 
            linear-gradient(340deg, transparent 45%),
            
            linear-gradient(to bottom, transparent 97%, #F2F2F2 97%) 
    `,
          backgroundPosition: 'top center, top center, bottom center, bottom center, to bottom',
          backgroundSize: '60px 20px, 60px 20px, 60px 20px, 60px 20px, 100% 3.33%',
          backgroundRepeat: 'repeat-x, repeat-x, repeat-x, repeat-x, repeat',
        }}
      >
        <div className="flex justify-center" aria-label="날마다 에피그램">
          <Icons name="slogon" className="w-46 h-26.25" />
        </div>
        <Button variant="main" href="/login">
          시작하기
        </Button>
      </footer>
    </div>
  );
}
