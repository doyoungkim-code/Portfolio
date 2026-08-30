export interface JourneyAward {
  title: string
  date: string
}

export interface JourneyRow {
  /** 시작 연월 (타임라인 좌표용) */
  start: string
  date: string
  name: string
  desc: string
  /** 그 과정에서 받은 상 — 공식 명칭 그대로 */
  awards?: JourneyAward[]
  /** 수상 기관 (awards 위에 작게) */
  awardsBy?: string
}

/* 간단하게 — 한 줄씩. 수상은 해당 과정 열에 붙는다 */
export const journeyRows: JourneyRow[] = [
  {
    start: '2018.03',
    date: '2018.03 — 2024.02',
    name: '영남대학교 · 정보통신공학과',
    desc: 'CS 기초 전공 — 자료구조 · 알고리즘 · 네트워크 · OS',
  },
  {
    start: '2024.02',
    date: '2024.02 — 2025.06',
    name: '42경산 · 1기 본과정',
    desc: 'C/C++ 시스템 프로그래밍 · 피어 리뷰',
  },
  {
    start: '2025.07',
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

/** 타임라인 끝(현재) */
export const journeyEnd = '2026.06'

export interface Cert {
  name: string
  en: string
  issuer: string
  /** 취득일 — 타임라인 위 핀 위치는 이 날짜로 계산 */
  date: string
  /** 자격 종류 — 국가기술자격 / 국가공인 민간자격 */
  kind: string
}

/** 자격증 — 특정 기관의 과정과 무관하게 취득 시점에 타임라인 위에 핀으로 표시 */
export const journeyCerts: Cert[] = [
  { name: 'SQL 개발자', en: 'SQLD', issuer: '한국데이터산업진흥원', date: '2024.04.05', kind: '국가공인' },
  { name: '정보처리기사', en: '', issuer: '한국산업인력공단', date: '2026.06.12', kind: '국가기술자격' },
]

export const journeyMeta = 'SSAFY 14기 수료 · 2026.06'
