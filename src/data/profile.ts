export const profile = {
  nameKr: '김도영',
  nameEn: 'KIM DOYOUNG',
  role: 'Backend Developer',
  slogan: 'Solid Backend & AI-Ready Engineer',
  email: 'ehehkwat1@naver.com',
  github: 'doyoungkim-code',
  githubUrl: 'https://github.com/doyoungkim-code',
  blog: 'dyomyo.tistory.com',
  blogUrl: 'https://dyomyo.tistory.com/',
} as const

export interface Vital {
  /** 숫자면 카운트업, 문자열이면 그대로 표시 */
  value: number | string
  prefix?: string
  suffix?: string
  label: string
}

export const heroVitals: Vital[] = [
  { value: 150, suffix: '+', label: '누적 실사용자' },
  { value: 3, prefix: 'TOP ', label: 'SSAFY 전국 · 전시부문' },
  { value: 2, label: '앱스토어 출시' },
  { value: 290, suffix: '+', label: '프로젝트 커밋' },
]
