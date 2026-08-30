import type { TechKey } from '../components/TechIcon'

export interface SkillRow {
  icon: TechKey
  name: string
  desc: string
}

export const skillRows: SkillRow[] = [
  {
    icon: 'spring',
    name: 'Java · Spring Boot',
    desc: 'Spring MVC 아키텍처 기반으로 인증 · 게시판 · 실시간 채팅 · FCM 등 20+ 도메인 모듈을 구현, 앱스토어 출시와 운영까지.',
  },
  {
    icon: 'postgres',
    name: 'RDBMS · JPA + PostgreSQL',
    desc: 'ERD 3차 반복으로 15+ 엔티티 관계형 스키마 설계(44 Repository). 댓글 Soft Delete, 커서 기반 페이지네이션 실적용.',
  },
  {
    icon: 'redis',
    name: 'Redis',
    desc: '집계 부하가 큰 HOT 게시판에 3분 TTL 캐시, 인기 검색어에 Sorted Set 트렌딩 설계 · 운영.',
  },
  {
    icon: 'cpp',
    name: 'C / C++',
    desc: '42경산에서 Unix 프로세스 · IPC · 메모리 관리를 밑바닥부터 구현 — 프레임워크 아래층을 이해하는 눈.',
  },
]

/** 보조 스택 — 아이콘 스트립으로 표시 */
export const alsoKeys: TechKey[] = [
  'aws', 'nginx', 'python', 'fastapi', 'electron', 'docker',
  'git', 'mysql', 'html', 'js', 'react', 'vue',
]

export interface Cert {
  name: string
  issuer: string
  date: string
}

/** 자격증 — 최신순 */
export const certs: Cert[] = [
  { name: '정보처리기사', issuer: '한국산업인력공단', date: '2026.06' },
  { name: 'SQL 개발자 (SQLD)', issuer: '한국데이터산업진흥원', date: '2024.04' },
]

export const highlightLine =
  '로컬 AI 모델 운용(Whisper · NLLB, PyTorch 계열) — 클라우드 운영(AWS EC2, 출시~2026.06) — 빌드 자동화(3단계 패키징 파이프라인)'
