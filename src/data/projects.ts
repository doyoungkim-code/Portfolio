import type { TechKey } from '../components/TechIcon'

export interface RowItem {
  no: string
  title: string
  desc: string
}

export interface Trouble {
  title: string
  problem: string
  solution: string
}

export interface Shot {
  src: string
  alt: string
}

export const project1 = {
  id: 'p1',
  coverId: 'cv-p1',
  detailId: 'dt-p1',
  coverPage: '04',
  detailPage: '05',
  overline: 'PROJECT 01 — SHIPPED, OPERATED, 150+ USERS',
  title: 'SSABREE TIME',
  sub: 'SSAFY 교육생 전용 폐쇄형 커뮤니티 + 팀 매칭 서비스 — 출시 후 150명 이상이 실제로 사용했습니다.',
  meta: '2026.01 – 2026.02 (6주) · 6인 · Backend',
  stack: ['java', 'spring', 'postgres', 'redis', 'aws', 'nginx'] as TechKey[],
  repoUrl: 'https://github.com/doyoungkim-code/SSABREE_TIME',
  demo: { path: 'demo/ssabree/index.html#autoplay+dual', title: 'SSABREE TIME 데모 — 갤럭시 폰 2대 실시간 동기화' },
  bg: { src: 'images/ssabree-1.jpg', blur: true },
  vitals: [
    { value: '150+', label: '누적 실사용자' },
    { value: '2', label: '스토어 출시' },
    { value: '~158', label: '본인 커밋 / 761' },
    { value: '44', label: 'Repository' },
  ],
  lead: {
    before: '에브리타임을 벤치마킹해 기획하고, ',
    strong: '원스토어 · 앱스토어에 실제 출시해 150명 이상의 유저',
    after: '가 사용했습니다. AWS EC2에 배포해 SSAFY 수료(2026.07)까지 운영했습니다.',
  },
  shots: [
    { src: 'images/ssabree-1.jpg', alt: 'SSABREE TIME 모바일 화면 1' },
    { src: 'images/ssabree-2.jpg', alt: 'SSABREE TIME 모바일 화면 2' },
  ] as Shot[],
  retroUrl: 'https://dyomyo.tistory.com/118',
  roles: [
    { no: '01', title: '인증/인가', desc: 'JWT Access(30분)+Refresh(1년) 이중 토큰, SSAFY Mattermost 연동 본인 인증, Spring Security 필터 체인.' },
    { no: '02', title: '게시판 + 캐싱', desc: 'CRUD · 좋아요 · 스크랩 · 투표, 커서 기반 페이지네이션, HOT 게시판(Redis 3분 TTL), 인기 검색어(Sorted Set).' },
    { no: '03', title: '실시간 채팅', desc: 'WebSocket STOMP 채팅 서버, 핸들러 레벨 JWT 검증, Nginx WebSocket 프록시.' },
    { no: '04', title: '팀/스터디 매칭', desc: '생성→모집→운영→종료 생명주기 API, 지원/수락/거절, Task 관리.' },
    { no: '05', title: 'FCM 푸시', desc: 'Firebase Admin SDK 연동, 이벤트별 푸시, @Async 비동기 전송.' },
    { no: '06', title: 'DB 설계 (공동)', desc: 'ERD 1~3차 반복(15+ 엔티티), 댓글 Soft Delete(트리 보존), 포트폴리오 CRUD · solved.ac 연동.' },
  ] as RowItem[],
  tech: [
    { no: '—', title: 'PostgreSQL', desc: '게시글-댓글-좋아요-투표의 복잡한 JOIN 최적화, 대댓글 CTE 재귀 쿼리, JSON 타입 확장성.' },
    { no: '—', title: 'Redis', desc: '매 요청 집계가 부담인 HOT 게시판을 3분 TTL 캐시로, 인기 검색어를 Sorted Set으로.' },
    { no: '—', title: 'WebSocket STOMP', desc: 'Polling 대비 서버 부하 감소, 토픽 기반 구독/발행, SockJS 폴백.' },
  ] as RowItem[],
  troubles: [
    {
      title: '엔드포인트만 적힌 명세서 — API를 5차까지 고친 이유',
      problem: '처음 명세서에 엔드포인트만 적어 두자 웹 · Android · iOS 팀의 요청에 맞춰 API를 5차까지 수정해야 했음.',
      solution: 'Request · Response body를 필드 단위로 채워 넣고 Swagger로 문서화한 뒤로는 재요청이 사라짐. "문서는 개발 앞에 쓰는 것"을 배움.',
    },
    {
      title: '회원탈퇴 Side Effect — 4일의 추적',
      problem: '탈퇴를 Hard Delete로 바꾸자 "팀 리더가 탈퇴하면 팀은?" 같은 연쇄 문제가 4일간 이어짐.',
      solution: 'Soft Delete(deletedAt) 전환, 리더 탈퇴 시 null 처리 + 경고, 게시물은 "탈퇴한 사용자"로 표시. 데이터 정합성은 기능이 아니라 설계의 문제임을 체득.',
    },
    {
      title: 'Jackson 3 + Redis 직렬화 연쇄 장애',
      problem: 'Spring Boot 4.0이 Jackson 3을 강제하면서 패키지 변경으로 Redis 직렬화 설정이 전부 깨짐.',
      solution: 'GenericJackson3JsonRedisSerializer로 전환, @class 필드로 타입 정보를 보존해 역직렬화 실패 제거.',
    },
  ] as Trouble[],
}

export const project2 = {
  id: 'p2',
  coverId: 'cv-p2',
  detailId: 'dt-p2',
  coverPage: '06',
  detailPage: '07',
  overline: 'PROJECT 02 — CORPORATE-LINKED · NATIONAL TOP 3',
  title: '번역의 민족',
  titleKr: true,
  sub: '강의실의 한국어를 2초 안에 영어 음성 · 자막으로 — 서버 없이 노트북 한 대에서 도는 온디바이스 AI 번역.',
  meta: '2026.04 – 2026.06 (8주) · 6인 · 팀장 / 배포 인프라 / FastAPI · 기업연계 프로젝트',
  stack: ['python', 'fastapi', 'electron'] as TechKey[],
  repoUrl: 'https://github.com/doyoungkim-code/Bunmin',
  demo: { path: 'demo/bunmin/index.html#autoplay', title: '번역의 민족 데모 — 강의자 화면 자동 시연' },
  bg: { src: 'images/translate-1.png', blur: false },
  vitals: [
    { value: 'TOP 3', label: '전국 전시발표회 · 117팀' },
    { value: '1위', label: '본선 자율 프로젝트 · 11팀' },
    { value: '~132', label: '본인 커밋' },
    { value: '17GB', label: '단일 setup.exe' },
  ],
  lead: {
    before: '팀장으로서 요구사항 명세와 일정을 관리하며 6인 팀을 이끌고, ',
    strong: '17GB AI 모델을 품은 데스크톱 앱을 "비개발자가 설치할 수 있는 물건"으로 만드는 일',
    after: '을 맡았습니다.',
  },
  shots: [
    { src: 'images/translate-1.png', alt: '번역의 민족 화면 1' },
    { src: 'images/translate-2.png', alt: '번역의 민족 화면 2' },
  ] as Shot[],
  roles: [
    { no: '01', title: '팀장 리딩', desc: '기업 요구사항 명세 · 일정 관리. AI · Frontend · Backend가 만나는 통합 지점(배포 · 역할 분담)을 조율하고 최종 책임.' },
    { no: '02', title: 'Electron 배포 파이프라인', desc: 'PyInstaller → electron-builder → Inno Setup 3단계 패키징. 강의실 PC를 고려한 관리자 권한 없는 per-user 설치, 디스크 용량 사전 체크.' },
    { no: '03', title: '설치 · 모델 다운로드 플로우', desc: '대용량 AI 모델의 다운로드 · 설치 과정을 비개발자도 통과할 수 있는 사용자 플로우로 설계 · 구현.' },
    { no: '04', title: 'FastAPI 백엔드', desc: 'Python FastAPI 기반 서버 API 일부 구현.' },
  ] as RowItem[],
  troubles: [
    {
      title: '고사양 서버 없이 "2초 이내 번역"을 지켜야 했던 3주',
      problem: '명세서가 전제한 고사양 서버 지원이 무산됨. 기업이 요구한 목표(2초 이내 실시간 번역)는 그대로.',
      solution: '팀과 3주간 검증한 끝에 노트북 한 대에서 모든 AI를 처리하는 온디바이스 앱으로 방향 전환. 요구사항 명세를 다시 쓰고 일정을 재편.',
    },
    {
      title: '개발 환경에선 되던 AI 기능이 설치본에서 멈춤',
      problem: '개발 PC에서 정상 동작하던 AI 기능이 패키징된 설치본에서만 동작하지 않음.',
      solution: '개발 환경과 설치 대상 PC의 차이를 하나씩 대조하며 수정. "내 PC에서 되는 것이 다른 PC에서도 되는지" 확인하는 검증을 배포 절차에 포함.',
    },
    {
      title: '관리자 권한 없는 강의실 PC에서 설치 실패',
      problem: '실제 강의실 PC는 관리자 권한이 없어 설치조차 되지 않음.',
      solution: 'per-user 설치(관리자 권한 불필요)로 전환하고 설치 전 디스크 용량 사전 체크를 추가. 17GB 모델을 포함한 단일 setup.exe로 완성 — "배포까지가 제품".',
    },
  ] as Trouble[],
  award: {
    src: 'images/award.jpg',
    alt: 'SSAFY 전시발표회 수상 단체사진',
    caption: 'SSAFY 본선 자율 프로젝트 1위 (11팀) · 전국 전시발표회 3위 (117팀)',
  },
}
