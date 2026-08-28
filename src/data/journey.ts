export interface JourneyRow {
  date: string
  name: string
  desc: string
}

export const journeyRows: JourneyRow[] = [
  {
    date: '2018.03 — 2024.02',
    name: '영남대학교 · 정보통신공학과',
    desc: '자료구조 · 알고리즘 · 네트워크 · 운영체제 — 소프트웨어의 바닥을 이루는 CS 기초를 전공으로.',
  },
  {
    date: '2024.02 — 2025.06',
    name: '42경산 · 1기 본과정',
    desc: '교재도 강의도 없는 피어 리뷰 환경에서 C/C++ 시스템 프로그래밍 수련. Unix 프로세스와 메모리를 코드로 직접.',
  },
  {
    date: '2025.07 — 2026.06',
    name: 'SSAFY 14기 · 전공 Java 과정',
    desc: 'Java/Spring Boot 심화. 두 번의 팀 프로젝트에서 기획부터 출시 · 운영까지 실서비스 전 과정 통과.',
  },
]

export const journeyMeta =
  'SQLD · 2024.04 / SSAFY 프로젝트 전시발표회 전시부문 전국 3위 · 2026.06'
