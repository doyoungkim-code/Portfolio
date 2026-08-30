export interface JourneyAward {
  title: string
  date: string
}

export interface JourneyRow {
  date: string
  name: string
  desc: string
  /** 그 과정에서 받은 상 — 공식 명칭 그대로 */
  awards?: JourneyAward[]
  /** 수상 기관 (awards 위에 작게) */
  awardsBy?: string
}

/* 간단하게 — 한 줄씩 */
export const journeyRows: JourneyRow[] = [
  {
    date: '2018.03 — 2024.02',
    name: '영남대학교 · 정보통신공학과',
    desc: 'CS 기초 전공 — 자료구조 · 알고리즘 · 네트워크 · OS',
  },
  {
    date: '2024.02 — 2025.06',
    name: '42경산 · 1기 본과정',
    desc: 'C/C++ 시스템 프로그래밍 · 피어 리뷰',
  },
  {
    date: '2025.07 — 2026.06',
    name: 'SSAFY 14기 · 전공 Java 과정',
    desc: 'Java/Spring Boot · 기획부터 출시 · 운영까지',
    awardsBy: '삼성청년SW·AI아카데미',
    awards: [
      { title: '자율프로젝트 우수상 (1위)', date: '2026.05.21' },
      { title: '전시발표회 우수상 (3위)', date: '2026.06.02' },
    ],
  },
]

export const journeyMeta = 'SSAFY 14기 수료 · 2026.06'
