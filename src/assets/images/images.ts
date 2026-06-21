import cardMockup from './img_Desktop_landing01.png';
import statisticList from './img_Desktop_landing02.png';
import statisticsChart from './img_Desktop_landing03.png';
import examples from './img_Desktop_landing04.png';

export const IMAGES = {
  CARD_MOCKUP: {
    src: cardMockup,
    alt: '에피그램 글귀 및 명언 카드 작성 예시 화면',
  },
  STATISTIC_LIST: {
    src: statisticList,
    alt: '사용자가 지정한 감정 상태 예시 화면',
  },
  STATISTICS_CHART: {
    src: statisticsChart,
    alt: '사용자의 월간 감정 상태 분석 통계 도넛 차트 그래픽',
  },
  EXAMPLES: {
    src: examples,
    alt: '에피그램 예시 글귀들',
  },
} as const;

export type ImageKey = keyof typeof IMAGES;
