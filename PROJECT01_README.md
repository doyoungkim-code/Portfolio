# SSABREE TIME - SSAFY 교육생 전용 커뮤니티 플랫폼

> 에브리타임을 벤치마킹하여 SSAFY 교육생만을 위한 익명 커뮤니티, 팀/스터디 매칭, 포트폴리오 관리, 실시간 채팅을 제공하는 크로스 플랫폼 서비스

---

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | SSABREE TIME (싸브리 타임) |
| **개발 기간** | 2026.01.06 ~ 02.09 (약 6주, 35일) |
| **팀 구성** | 6인 (Backend 2, Frontend 1, Android 3, iOS 1) |
| **서비스 유형** | 모바일 우선 커뮤니티 + 웹 플랫폼 |
| **총 커밋** | 761개, 100+ 브랜치 |
| **배포** | 원스토어 + iOS 앱스토어 출시 |

### 핵심 가치
- **SSAFY 교육생 인증 기반** 신뢰할 수 있는 폐쇄형 커뮤니티
- **익명성 보장** 자유로운 의견 교환 환경
- **AI 기반 콘텐츠 검열** 건전한 커뮤니티 문화 유지
- **실시간 소통** WebSocket 기반 채팅 및 FCM 푸시 알림

---

## 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                             │
│  ┌──────────┐   ┌──────────┐   ┌──────────────────────────┐    │
│  │ Android  │   │   iOS    │   │   React Web (SPA)        │    │
│  │ Kotlin   │   │ SwiftUI  │   │   TypeScript + Vite      │    │
│  │ Compose  │   │          │   │                          │    │
│  └────┬─────┘   └────┬─────┘   └────────────┬─────────────┘    │
│       │              │                       │                  │
│       └──────────────┼───────────────────────┘                  │
│                      │ REST API / WebSocket (STOMP)             │
└──────────────────────┼──────────────────────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────────────────────┐
│                  Nginx Reverse Proxy (:80)                      │
│   /api/ → Backend  |  /ws-stomp → WebSocket  |  / → Frontend   │
│   /uploads/ → Static Files  |  /grafana/ → Monitoring           │
└──────────────────────┼──────────────────────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────────────────────┐
│              Application Layer (Spring Boot 4.0)                │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐     │
│  │ REST API    │  │  WebSocket   │  │  Async Workers     │     │
│  │ Controllers │  │  STOMP Chat  │  │  FCM / AI / Event  │     │
│  └──────┬──────┘  └──────┬───────┘  └────────┬───────────┘     │
│         └────────────────┼────────────────────┘                 │
│                     Service Layer                               │
│                     Repository Layer (Spring Data JPA)           │
└──────────────────────┼──────────────────────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────────────────────┐
│                   Data & External Layer                          │
│  ┌────────────┐  ┌─────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ PostgreSQL │  │  Redis  │  │ Firebase │  │  Gemini AI   │  │
│  │  15-alpine │  │ 7-alpine│  │   FCM    │  │  Censorship  │  │
│  └────────────┘  └─────────┘  └──────────┘  └──────────────┘  │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Monitoring: Prometheus + Loki + Grafana + NetData          │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 기술 스택

### Backend
| 기술 | 버전 | 용도 |
|------|------|------|
| **Java** | 21 | 서버 언어 |
| **Spring Boot** | 4.0.1 | 핵심 프레임워크 |
| **Spring Security** | - | JWT 인증/인가 |
| **Spring Data JPA** | - | ORM, 데이터 접근 계층 |
| **Spring WebSocket** | - | STOMP 프로토콜 실시간 채팅 |
| **PostgreSQL** | 15 | 관계형 데이터베이스 |
| **Redis** | 7 | 캐싱, FCM 설정 저장 |
| **Firebase Admin SDK** | 9.2.0 | FCM 푸시 알림 |
| **Gemini API** | - | AI 콘텐츠 검열 |
| **SpringDoc OpenAPI** | 2.8.5 | Swagger API 문서화 |
| **Micrometer + Actuator** | - | 메트릭 수집 및 모니터링 |

### Frontend (Web)
| 기술 | 버전 | 용도 |
|------|------|------|
| **React** | 19.2 | UI 프레임워크 |
| **TypeScript** | 5.9 | 정적 타입 시스템 |
| **Vite** | 7.2 | 빌드 도구 및 개발 서버 |
| **Axios** | 1.13 | HTTP 클라이언트 |
| **STOMP.js** | 7.3 | WebSocket 실시간 통신 |
| **Firebase** | 12.9 | 웹 푸시 알림 |

### Android
| 기술 | 버전 | 용도 |
|------|------|------|
| **Kotlin** | - | 개발 언어 |
| **Jetpack Compose** | - | 선언형 UI |
| **Material 3** | - | 디자인 시스템 |
| **Retrofit** | 3.0 | HTTP 클라이언트 |
| **Room** | 2.6 | 로컬 데이터베이스 (이미지 캐시) |
| **Coil** | 2.5 | 이미지 로딩 |
| **Coroutines** | 1.8 | 비동기 처리 |
| **Firebase Messaging** | - | FCM 푸시 알림 |
| **Security Crypto** | - | 안전한 토큰 저장 |

### iOS
| 기술 | 버전 | 용도 |
|------|------|------|
| **SwiftUI** | - | 선언형 UI |
| **URLSession** | - | 네트워크 통신 |
| **Keychain** | - | 안전한 인증 토큰 저장 |
| **Firebase Messaging** | - | FCM 푸시 알림 |
| **WebSocket + STOMP** | - | 실시간 채팅 |

### DevOps & Infra
| 기술 | 용도 |
|------|------|
| **Docker Compose** | 10개 서비스 컨테이너 오케스트레이션 |
| **Nginx** | 리버스 프록시, 정적 파일 서빙, WebSocket 프록시 |
| **GitLab CI/CD** | 자동 빌드/배포 파이프라인 |
| **Prometheus** | 메트릭 수집 (15초 간격) |
| **Grafana** | 대시보드 시각화 |
| **Loki + Promtail** | 중앙 집중 로그 수집/조회 |
| **NetData** | 실시간 인프라 모니터링 |
| **AWS EC2** | 단일 인스턴스 배포 |

---

## 주요 기능

### 1. 인증 및 사용자 관리
- **Mattermost 연동 교육생 인증**: SSAFY Mattermost를 통한 인증 코드 발송 및 본인 확인
- **JWT 기반 인증**: Access Token(30분) + Refresh Token(1년) 이중 토큰 구조
- **토큰 자동 갱신**: 모바일/웹 클라이언트의 401 응답 시 자동 리프레시 로직
- **안전한 토큰 저장**: Android(EncryptedSharedPreferences), iOS(Keychain), Web(localStorage)

### 2. 익명 게시판 커뮤니티
- **다중 게시판 지원**: 게시판별 게시글 분류 및 조회
- **커서 기반 페이지네이션**: 무한 스크롤 방식의 효율적 데이터 로딩
- **좋아요 / 스크랩 시스템**: 게시글 및 댓글 좋아요, 게시글 스크랩
- **대댓글 지원**: parentId 기반 중첩 댓글 구조
- **투표(Poll) 기능**: 게시글 내 투표 생성 및 참여
- **HOT 게시판**: 좋아요 10개 이상 인기 게시글 자동 선별 (Redis 3분 캐시)
- **인기 검색어**: Redis 기반 실시간 트렌딩 키워드
- **AI 콘텐츠 검열**: Gemini API 연동, 혐오/욕설/선정 콘텐츠 자동 블라인드 처리
- **신고 시스템**: 부적절 게시글/댓글 신고 및 관리자 검토

### 3. 팀 & 스터디 매칭
- **팀 유형 분류**: 싸피 프로젝트, 공모전, 자유 프로젝트
- **스터디 유형 분류**: CS, 알고리즘, SW 역량 테스트 A/B형, 자격증, 기타
- **지원/수락 시스템**: 리더가 지원자를 검토하고 수락/거절
- **작업(Task) 관리**: TODO / IN_PROGRESS / DONE 상태 기반 팀 내 작업 추적
- **멤버 역할 관리**: LEADER / MEMBER 권한 구분
- **캠퍼스별 필터링**: 지역 캠퍼스 기반 그룹 탐색

### 4. 실시간 채팅
- **STOMP over WebSocket**: SockJS 폴백 지원 실시간 메시징
- **게시글 연동 채팅방**: 게시글당 1:1 채팅방 자동 생성
- **읽음 확인**: 메시지 읽음 상태 추적
- **온라인 프레즌스**: ChatPresenceService를 통한 실시간 접속 상태 관리
- **WebSocket 인증**: STOMP 핸들러 레벨 JWT 토큰 검증

### 5. 알림 시스템
- **FCM 푸시 알림**: 댓글, 대댓글, 쪽지, 팀 지원 수락/거절 시 푸시 발송
- **토픽 기반 구독**: 그룹별 FCM 토픽 구독/해제
- **알림 유형별 설정**: COMMENT, REPLY, MESSAGE, NOTICE, APPLICATION 등 세분화
- **Redis 캐싱**: FCM 설정을 Redis에 캐시하여 성능 최적화
- **비동기 전송**: @Async 기반 논블로킹 푸시 전송

### 6. 포트폴리오 관리
- **기술 스택 관리**: HIGH / MID / LOW 숙련도 분류
- **백준(BOJ) 연동**: solved.ac API로 알고리즘 티어 자동 연동
- **SW 역량 테스트 등급**: SSAFY SW 테스트 등급 기록
- **프로젝트 쇼케이스**: 프로젝트별 기술 스택, GitHub 링크, 이미지 관리
- **공개/비공개 설정**: 포트폴리오 가시성 제어

### 7. 홈 & 캠퍼스 기능
- **D-Day 카운트다운**: 개인 일정 D-Day 관리 및 홈 표시
- **캠퍼스 식단 조회**: 캠퍼스별 식단 정보 및 이미지 제공
- **최신 게시글 미리보기**: 블라인드 미처리 최신 글 제목 노출
- **팀/스터디 모집 현황**: 홈 화면 내 모집 중인 그룹 썸네일

---

## 기술적 특장점

### 1. AI 기반 콘텐츠 검열 시스템
```
사용자 게시글 작성 → AiCensorshipManager (Strategy Pattern)
                         ↓
              GeminiCensorshipService (기본)
              OllamaCensorshipService (대체)
              OpenAiCensorshipService (대체)
                         ↓
              안전 판정 → 게시  |  위험 판정 → 블라인드(isBlinded)
```
- **전략 패턴** 적용으로 AI 제공자를 유연하게 교체 가능
- 혐오 발언, 인신공격, 선정적 표현 자동 감지
- 일상적 비속어, 강조 표현 등은 허용하는 세밀한 프롬프트 설계
- 판정 불확실 시 안전 기본값 적용 (false positive 최소화)

### 2. WebSocket 실시간 채팅 아키텍처
```
Client → /ws-stomp (SockJS) → StompHandler (JWT 인증)
  ↓
/app/chat/{roomId}/send → ChatWebSocketController
  ↓
MessageBroker → /topic/user/{memberId}/chat/{roomId} (구독자에게 전달)
             → /topic/user/{memberId}/chat-list (채팅 목록 갱신)
  ↓
비동기 FCM 발송 (미접속 사용자 대상)
```
- STOMP 프로토콜 기반 구조화된 메시징
- 채팅방 프레즌스 추적으로 불필요한 푸시 알림 방지
- 이벤트 리스너 패턴으로 채팅/알림 느슨한 결합

### 3. Redis 활용 전략
| 캐시 키 | TTL | 용도 |
|---------|-----|------|
| `hotPosts` | 3분 | HOT 게시판 인기글 캐시 |
| `boards` | 1일 | 게시판 목록 캐시 |
| `campuses` / `classes` | 1일 | 캠퍼스/반 정보 캐시 |
| `fcm:setting:{memberId}` | - | 사용자별 FCM 알림 설정 |
| 검색 키워드 | - | 인기 검색어 트렌딩 집계 |

### 4. Soft Delete 및 데이터 무결성
- 전 엔티티 `BaseEntity` 상속으로 `createdAt` / `updatedAt` 자동 관리
- `deletedAt` 필드 기반 논리 삭제 (Soft Delete)
- 댓글 Soft Delete로 대댓글 트리 구조 보존
- 회원 탈퇴 시 팀/스터디 소속 여부 확인 후 탈퇴 처리

### 5. 크로스 플랫폼 일관성
```
Android (MVVM)          iOS (MVVM)              Web (React)
─────────────          ──────────              ───────────
AppContainer    ←→     AppContainer    ←→     Service Layer
  ├ Repository           ├ Repository           ├ api.ts
  ├ ViewModel            ├ ViewModel            ├ hooks
  └ Compose UI           └ SwiftUI              └ Components
```
- 3개 플랫폼 모두 **동일한 Repository 패턴** 적용 (20+ Repository)
- **동일한 기능 세트**: 게시판, 채팅, 팀/스터디, 포트폴리오, 알림
- **동일한 인증 흐름**: JWT + 자동 토큰 갱신 + 안전한 저장소
- Android: EncryptedSharedPreferences / iOS: Keychain / Web: localStorage

### 6. 모니터링 & 옵저버빌리티
- **Prometheus**: Spring Actuator 메트릭 15초 간격 수집
- **Grafana**: Loki + Prometheus 데이터소스 통합 대시보드
- **Loki + Promtail**: Docker 컨테이너 로그 자동 수집, JSON 구조화 파싱
- **NetData**: 서버 CPU/메모리/디스크/네트워크 실시간 모니터링
- **Spring Actuator**: `/actuator/health`, `/actuator/prometheus` 엔드포인트 노출

---

## CI/CD 파이프라인

```
GitLab Push (dev-backend / dev-frontend 브랜치)
        ↓
GitLab CI Runner
  ├─ Docker 이미지 빌드
  ├─ SSH로 EC2 서버 접속
  ├─ docker-compose.yml, nginx.conf, 모니터링 설정 전송
  ├─ .env 환경변수 주입
  ├─ docker compose up -d (무중단 서비스 배포)
  └─ Mattermost Webhook 배포 알림 발송
```

- **Backend 배포**: backend, nginx, 모니터링 스택 일괄 업데이트
- **Frontend 배포**: frontend, nginx만 선택적 업데이트
- **자동화 스크립트**: backup-db.sh, restore-db.sh, deploy.sh 제공
- **DB 백업**: 30일 보관 정책의 자동 PostgreSQL 덤프

---

## 데이터 모델 (주요 엔티티)

```
Member ──┬── Post ──── Comment (대댓글: parentId)
         │    ├── PostLike / Scrap
         │    ├── PostImage
         │    ├── Poll ── Vote ── VoteRecord
         │    └── ChatRoom ── ChatMessage
         │
         ├── Team ──── TeamMember
         │    ├── TeamApplication
         │    └── TeamTask
         │
         ├── Study ──── StudyMember
         │    ├── StudyApplication
         │    └── StudyTask
         │
         ├── Portfolio ──── Project
         │    ├── PortfolioStack
         │    └── PortfolioUrl
         │
         ├── Notification / NotificationSetting
         ├── DDay
         ├── BlockedMember
         └── MemberSettings

Campus ── Classes ── Enrollment
Board ── Notice
Report / Inquiry / SearchHistory
```

---

## API 설계

- **RESTful API**: Spring Boot 기반 44개 Repository, 20+ Controller
- **Swagger UI**: SpringDoc OpenAPI 3.0 자동 문서화 (`/swagger-ui/`)
- **JWT Bearer 인증**: 전 API 대상 인증 헤더 적용
- **커서 기반 페이지네이션**: 무한 스크롤 최적화
- **비동기 처리**: 게시글 조회수, FCM 전송 등 @Async 활용
- **글로벌 예외 처리**: GlobalExceptionHandler + 커스텀 에러 코드 체계
- **CORS 설정**: localhost:3000, localhost:5173 개발 환경 허용

---

## 프로젝트 구조

```
S14P11D103/
├── backend/                    # Spring Boot 4.0 API 서버
│   └── ssabre/
│       └── src/main/java/com/ssafy/ssabre/
│           ├── auth/           # JWT 인증, Mattermost 연동
│           ├── board/          # 게시판 관리
│           ├── chat/           # WebSocket 실시간 채팅
│           ├── comment/        # 댓글/대댓글
│           ├── global/         # 공통 설정, AI 검열, 에러 핸들링
│           ├── member/         # 회원 관리
│           ├── notification/   # FCM 푸시 알림
│           ├── portfolio/      # 포트폴리오
│           ├── post/           # 게시글, 좋아요, 스크랩, 투표
│           ├── study/          # 스터디 그룹
│           ├── team/           # 프로젝트 팀
│           └── ...             # campus, dday, report 등
│
├── frontend/                   # React 19 + TypeScript SPA
│   └── src/
│       ├── pages/              # 14+ 페이지 컴포넌트
│       ├── components/         # 공통 레이아웃 (Header, Sidebar)
│       ├── services/api.ts     # 15+ API 서비스 모듈
│       └── hooks/useStomp.ts   # WebSocket 커스텀 훅
│
├── android/                    # Kotlin + Jetpack Compose
│   └── ssabree/app/src/main/java/com/ssafy/ssabree/
│       ├── core/               # DI, 네트워크, 저장소
│       └── features/           # 기능별 ViewModel + UI
│
├── iOS/                        # SwiftUI
│   └── ssabree/ssabree/
│       ├── Core/               # 네트워크, 저장소, DI
│       └── Features/           # 기능별 ViewModel + View
│
├── nginx/                      # Nginx 리버스 프록시 설정
├── monitoring/                 # Prometheus, Loki, Grafana 설정
├── docker-compose.yml          # 10개 서비스 오케스트레이션
├── .gitlab-ci.yml              # CI/CD 파이프라인
└── exec/scripts/               # 배포, 백업, 복원 자동화 스크립트
```

---

## 팀 구성

| 이름 | 포지션 | 주요 담당 | 커밋 |
|------|--------|-----------|------|
| **김*재** | Backend / Frontend / Infra | Spring Boot 초기 설정, AI 검열, 모니터링, React 웹, CI/CD | ~237 |
| **김도영** | Backend | 핵심 비즈니스 로직, API 설계, 실시간 채팅, FCM | ~158 |
| **김*규** | Android | Android 앱 주요 기능 구현 및 QA | ~116 |
| **김*호** | iOS / Android | iOS 앱 전체 개발, Android 일부 기능 | ~80 |
| **이*영** | Android | Android UI/기능 개발 | ~65 |
| **이*주** | Android | Android 설정/알림 화면 개발 | ~56 |

---

## 개발 타임라인

### 1~2주차: 기획 (01.06 ~ 01.18)
- 15개 후보 주제 브레인스토밍 및 투표
- 유기견 디지털 펫 아이디어 → 법적 제약으로 폐기
- **최종 선정**: SSAFY 커뮤니티 플랫폼 (에브리타임 벤치마킹)

### 3주차: 설계 (01.19 ~ 01.25) — 52커밋
- ERD 1~3차 설계 및 수정 (4일간 반복 리뷰)
- Spring Boot 초기 프로젝트 생성
- Mattermost API 연동 교육생 인증 로직 설계
- 회원가입 기능 백엔드 완성

### 4주차: 개발 가속 (01.26 ~ 02.01) — 242커밋 (본인 27커밋)
- Backend-Android 첫 연결 및 CI/CD 파이프라인 구축
- 하루 4~8커밋씩 핵심 기능 집중 개발
- 게시판/게시글, 검색, 투표, 쪽지, 채팅(WebSocket/STOMP) 구현
- Hot 게시판, 조회수, 커서 기반 페이지네이션 추가
- Solved.ac 백준 티어 연동
- **교훈**: API 수정이 3~5차까지 반복 → Request/Response body를 포함한 상세 API 명세 작성의 중요성 체감

### 5주차: 기능 완성 및 QA (02.02 ~ 02.08) — 277커밋 (본인 45커밋, 가장 고된 주간)
- 팀/스터디 API 전면 재설계 및 동기화
- FCM 알림 고도화 (댓글/지원/수락 이벤트별 연동)
- Redis 캐시 도입 및 Jackson 3 마이그레이션 대응 (5번 연속 redis 재수정)
- 익명성 보장 처리, 회원탈퇴 Hard Delete 전환 및 4일간 Side Effect 추적
- AI 검열 시스템 (Ollama → OpenAI → Gemini로 3번 변경)
- iOS 프로젝트 시작 → 5일 만에 주요 기능 구현

### 6주차: 최종 배포 (02.09) — 8커밋
- 원스토어 및 iOS 앱스토어 출시
- 시나리오 문서 및 실행 가이드 작성

---

## 담당 역할 및 기여 (김도영 - Backend Developer)

> **포지션**: Backend 개발 (총 ~158 커밋)

### DB 설계
- [x] ERD 1차 ~ 3차 설계, 수정 및 검토
- [x] 초기 설정 데이터 JPA 기반 데이터 시딩 (캠퍼스, 반, 게시판 등)
- [x] 15기 반 정보 추가 및 데이터 관리

### 인증 및 회원 관리
- [x] JWT 기반 회원가입/로그인 인증 시스템 구현 (Access Token + Refresh Token)
- [x] SSAFY Mattermost 연동 교육생 본인 인증 기능 개발
- [x] Mattermost 메시지 템플릿 커스터마이징 및 데이터 매칭 검증
- [x] 회원탈퇴 Hard Delete 전환 및 Side Effect 처리 (팀/스터디 소속 검증, 리더 null 처리)
- [x] 익명성 보장 백엔드 처리 로직 구현

### 게시판 / 게시글 시스템
- [x] 게시판별 게시글 목록 조회 기능 구현
- [x] 커서 기반 페이지네이션 (무한 스크롤) 적용
- [x] 게시글 검색 기능 및 인기 검색어 트렌딩 구현
- [x] 투표(Poll) 기능 개발
- [x] 조회수 기능 추가
- [x] HOT 게시판 기능 구현 (좋아요 10+ 기준, Redis 3분 캐시)
- [x] 블라인드 미처리 최신 글 홈 화면 노출 기능
- [x] 관리자 공지 게시판 API 구현

### 댓글 시스템
- [x] 댓글/대댓글 CRUD 및 좋아요 기능
- [x] 댓글 Soft Delete 전환 (대댓글 트리 구조 보존)
- [x] 댓글 페이지네이션 구현
- [x] 댓글 개수 미집계 버그 수정

### 실시간 채팅
- [x] WebSocket STOMP 기반 실시간 채팅 서버 구현
- [x] 채팅 기능 전반적 수정 및 Nginx WebSocket 프록시 설정

### 쪽지 기능
- [x] 쪽지(DM) 기능 전체 구현
- [x] 쪽지 관련 버그 수정

### 팀 / 스터디 매칭
- [x] 팀/스터디 API 전면 설계 및 구현
- [x] 지원/수락/거절 시스템 구현
- [x] 팀/스터디원 자진 탈퇴 기능
- [x] Task CRUD (팀원도 작업 관리 가능하도록 변경)
- [x] Hibernate LazyInitializationException 전면 수정
- [x] 팀/스터디 Soft Delete 및 상태 관리 버그 수정 (다수 이터레이션)

### FCM 푸시 알림
- [x] FCM 연결 및 푸시 알림 시스템 구현
- [x] FCM 얕은 재동기화 도입 (토큰 갱신 최적화)
- [x] 댓글/대댓글 알림, 팀 지원자 알림 등 이벤트별 FCM 연동
- [x] 새소식(알림) 시스템에 댓글 알림 통합

### Redis 캐싱
- [x] Redis 캐시 직렬화/역직렬화 시 타입 정보 손실 문제 해결
- [x] HOT 게시판, 게시판 목록, 캠퍼스 정보 캐시 적용

### 포트폴리오
- [x] 포트폴리오 CRUD 및 프로젝트 관리 API 구현
- [x] 백준(BOJ) 아이디 연동 solved.ac 티어 자동 조회 기능
- [x] 포트폴리오 URL 타입 필드 구조 수정

### 캠퍼스 / 식단
- [x] 캠퍼스별 식단 조회 기능 수정
- [x] 캠퍼스별 식단 이미지 업로드 및 조회 기능 수정

### 코드 품질 및 안정화
- [x] Backend 전반적인 코드 정리 및 리팩토링
- [x] API 수정 및 추가사항 5차에 걸친 반복 반영 (프론트/모바일 팀 협업)

---

## 성과 및 회고

### 기술적 성과
- 6주간 761개 커밋, 100+ 브랜치를 통한 Web + Android + iOS 멀티 플랫폼 서비스 완성
- 원스토어 및 iOS 앱스토어 정식 출시
- Backend 핵심 비즈니스 로직 설계/개발 (~158 커밋, 20+ 도메인 모듈)
- WebSocket + FCM 이중 실시간 통신 체계 구축
- 팀/스터디 매칭 시스템 전체 생명주기(생성 → 모집 → 운영 → 종료) 설계 및 구현

### 트러블슈팅 경험

**1. Jackson 3 마이그레이션 + Redis 직렬화 연쇄 장애**
- Spring Boot 4.0이 Jackson 3을 요구하면서 기존 코드와 호환성 문제 발생 (패키지명 변경 등)
- Jackson 3 전환과 맞물려 Redis 캐시 직렬화가 연쇄적으로 실패 → 5번 연속 "redis 재수정" 커밋
- GenericJackson3JsonRedisSerializer 적용 및 타입 정보 보존 설정으로 해결
- **교훈**: Spring 4.0이 너무 최신이라 AI도 학습되어 있지 않았음. 향후 안정적인 1~2년 된 버전을 기본으로 사용할 것

**2. Hibernate LazyInitializationException**
- 팀/스터디 조회에서 세션 밖 Lazy 엔티티 접근 시 다발적 발생
- @Transactional 범위 조정 및 Fetch Join 적용으로 전면 수정

**3. 회원탈퇴 Side Effect 연쇄 문제 (4일간 추적)**
- Hard Delete 전환 후 리더 null 참조, 게시물/댓글 참조, 팀 소속 처리 등 연쇄 문제 발생
- 리더 null 처리, soft delete 게시물 cascade 정리, 팀/스터디 소속 검증 후 탈퇴 처리
- **교훈**: 회원탈퇴 하나에서 4일간 Side Effect를 추적한 경험은 데이터 무결성의 중요성을 체감하게 해준 사건. Soft Delete vs Hard Delete 선택에서 사용자 관점과 기술적 구현의 균형이 중요

**4. FCM 토큰 동기화**
- 얕은 재동기화 전략 도입으로 불필요한 토큰 갱신 방지 및 성능 개선

**5. API 스펙 반복 수정**
- 초기 API 명세가 Request/Response body 없이 URL만 기재되어 프론트/모바일 팀과 3~5차 수정 반복
- **교훈**: 상세한 API 명세(Request/Response body 포함)를 초기에 작성하면 재작업을 크게 줄일 수 있음

### 배운 점
- **버전 선택의 중요성**: 최신 프레임워크(Spring Boot 4.0, Jackson 3) 도입 시 레퍼런스 부족으로 인한 리스크 경험
- **초기 설계의 가치**: ERD 3차 반복 수정, API 스펙 5차 수정을 통해 설계 단계 투자의 중요성 체감
- **데이터 무결성 고려**: Soft Delete vs Hard Delete 트레이드오프, 연관 엔티티 cascade 처리의 복잡성
- **실시간 통신 구현**: WebSocket STOMP 프로토콜의 인증 및 프레즌스 관리
- **팀 협업**: 6인 규모 첫 프로젝트에서 4개 플랫폼(Backend, Web, Android, iOS) 동시 개발 경험

### 성공 요인
- **팀 결속력**: 끈끈한 유대감으로 기술적 위기 상황 극복
- **빠른 API 연동**: Backend-Android 조기 연결로 시각적 진행감 확보, 개발 속도 가속
- **상세한 API 명세**: 반복 수정 경험을 바탕으로 Request/Response body 포함 명세 작성, 프론트엔드 재요청 최소화
- **역할 분담**: 팀원별 담당 영역 명확화로 병렬 개발 극대화
