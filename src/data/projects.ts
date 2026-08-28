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
  overline: 'PROJECT 01 — LIVE SERVICE, STILL RUNNING',
  title: 'SSABREE TIME',
  sub: 'SSAFY 교육생 전용 폐쇄형 커뮤니티 + 팀 매칭 서비스 — 출시 1주 만에 100명이 모였습니다.',
  meta: '2026.01 – 2026.02 (6주) · 6인 · Backend · Java / Spring Boot / PostgreSQL / Redis / AWS EC2',
  bg: { src: 'images/ssabree-1.jpg', blur: true },
  vitals: [
    { value: '100+', label: '출시 1주 유저' },
    { value: '2', label: '스토어 출시' },
    { value: '~158', label: '본인 커밋 / 761' },
    { value: '44', label: 'Repository' },
  ],
  lead: {
    before: '에브리타임을 벤치마킹해 기획하고, ',
    strong: '원스토어 · 앱스토어에 실제 출시해 1주 만에 100명 이상의 유저',
    after: '를 확보했습니다. AWS EC2에 배포해 지금도 운영 중입니다.',
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
      title: 'Jackson 3 + Redis 직렬화 연쇄 장애',
      problem: 'Spring Boot 4.0이 Jackson 3을 강제하면서 패키지 변경으로 Redis 직렬화 설정이 전부 깨짐.',
      solution: 'GenericJackson3JsonRedisSerializer로 전환, @class 필드로 타입 정보를 보존해 역직렬화 실패 제거.',
    },
    {
      title: '회원탈퇴 Side Effect — 4일의 추적',
      problem: 'Hard Delete 후 FK 제약조건의 연쇄 오류가 서비스 곳곳에서 발생.',
      solution: 'Soft Delete(deletedAt) 전환, 리더 탈퇴 시 null 처리 + 경고, 게시물은 "탈퇴한 사용자"로 표시. 삭제 정책은 UX와 무결성 양면의 설계임을 체득.',
    },
    {
      title: '클라이언트 3팀과의 스펙 협업',
      problem: 'Android · iOS 클라이언트와의 API 스펙이 3~5차례 반복 수정됨.',
      solution: 'Req/Res body 상세 명세 + Swagger 문서화 체계를 잡아 1차 리뷰 80% 이상 통과로 개선.',
    },
  ] as Trouble[],
}

export const project2 = {
  id: 'p2',
  coverId: 'cv-p2',
  detailId: 'dt-p2',
  coverPage: '06',
  detailPage: '07',
  overline: 'PROJECT 02 — NATIONAL TOP 3',
  title: '번역의 민족',
  titleKr: true,
  sub: '강의실의 한국어를 즉시 영어 음성 · 자막으로 — 원문이 밖으로 나가지 않는 완전 로컬 AI 번역.',
  meta: '2026.04 – 2026.06 (8주) · 6인 · 팀장 / 배포 인프라 / FastAPI · Python / Electron',
  bg: { src: 'images/translate-1.png', blur: false },
  vitals: [
    { value: 'TOP 3', label: 'SSAFY 결선 전시부문' },
    { value: '~132', label: '본인 커밋' },
    { value: '17GB', label: '단일 setup.exe' },
    { value: '8주', label: '6인 · 팀장' },
  ],
  lead: {
    before: '팀장으로서 6인 팀을 이끌며, ',
    strong: '17GB AI 모델을 품은 데스크톱 앱을 "비개발자가 설치할 수 있는 물건"으로 만드는 일',
    after: '을 맡았습니다.',
  },
  shots: [
    { src: 'images/translate-1.png', alt: '번역의 민족 화면 1' },
    { src: 'images/translate-2.png', alt: '번역의 민족 화면 2' },
  ] as Shot[],
  roles: [
    { no: '01', title: '팀장 리딩', desc: 'AI · Frontend · Backend가 만나는 통합 지점(배포 · 일정 · 역할 분담)을 조율하고 최종 책임.' },
    { no: '02', title: 'Electron 배포 파이프라인', desc: 'PyInstaller → electron-builder → Inno Setup 3단계 패키징. 강의실 PC를 고려한 관리자 권한 없는 per-user 설치, 디스크 용량 사전 체크.' },
    { no: '03', title: '설치 · 모델 다운로드 플로우', desc: '대용량 AI 모델의 다운로드 · 설치 과정을 비개발자도 통과할 수 있는 사용자 플로우로 설계 · 구현.' },
    { no: '04', title: 'FastAPI 백엔드', desc: 'Python FastAPI 기반 서버 API 일부 구현.' },
  ] as RowItem[],
  troubles: [
    {
      title: '17GB짜리 설치 파일이라는 문제',
      problem: 'AI 모델을 포함한 앱을 강사(비개발자)가 스스로 설치할 수 있어야 함. 거대한 빌드 용량과 설치 대상 PC의 권한 · 디스크 제약이 겹침.',
      solution: '3단계 패키징 파이프라인으로 빌드를 구조화하고, per-user 설치로 관리자 권한 의존을 제거, 설치 전 디스크 용량을 사전 체크해 실패를 예방. "배포까지가 제품"임을 배웠습니다.',
    },
  ] as Trouble[],
  award: {
    src: 'images/award.jpg',
    alt: 'SSAFY 전시발표회 수상 단체사진',
    caption: 'SSAFY 프로젝트 전시발표회 · 전시부문 전국 3위',
  },
}
