export interface JourneyRow {
  date: string
  name: string
  desc: string
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
  },
]

export const journeyMeta = 'SSAFY 프로젝트 전시발표회 전시부문 전국 3위 · 2026.06  /  SSAFY 14기 수료 · 2026.06'
