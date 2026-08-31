export interface JourneyRow {
  /** 시작 연월 (타임라인 좌표용) */
  start: string
  date: string
  name: string
  desc: string
}

/* 간단하게 — 한 줄씩. 수상은 PROJECT 02 커버의 배너에서 강조하므로 여기엔 넣지 않는다 */
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
