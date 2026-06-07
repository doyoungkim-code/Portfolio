# 포트폴리오 작성 양식

아래 항목을 채워주시면, 포트폴리오에 반영하겠습니다.
`(삭제)` 표시된 항목은 해당사항이 없으면 지워주세요.

---

## 1. 기본 정보 (Cover / About Me)

```
이름         : 김도영
희망 직군     : Backend Developer (예: Frontend Developer, Backend Developer, Fullstack Developer 등)
생년월일      : 1999.09.29 (예: 1998.01.01)
거주지        : Daegu, Korea (예: Seoul, Korea)
이메일        : ehehkwat1@naver.com
GitHub 주소   : https://github.com/doyoungkim-code (예: github.com/username)
블로그 주소   : https://dyomyo.tistory.com (예: https://dyomyo.tistory.com)
```

### 자기소개 (2~3문장)
```

기술 블로그를 가꾸고 기록하는 것을 즐기며, 새로운 인사이트를 도출해낼수 있는 창의적인 예비 백엔드 개발자입니다.

(예: 사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다.
클린 코드와 효율적인 아키텍처를 추구하며, 새로운 기술을 배우는 것을 즐깁니다.)


```

---

## 2. 경력 사항 (Career Summary)

경력이 여러 개면 복사해서 추가해주세요. 없으면 이 섹션 전체를 삭제해도 됩니다.

### 경력 1 (없음)
```
기간    : (없음) (예: 2024.01 - Present)
회사명  : (없음)
직무    : (없음) (예: Frontend Developer)
설명    : (없음) (예: React 기반 웹 애플리케이션 개발 및 유지보수)
```

---

## 3. 기술 스택 (Tech Stack)

해당하는 기술만 남기고, 추가할 것이 있으면 자유롭게 추가해주세요.

### Frontend
```
JavaScript, CSS, Vue.js
(예: HTML5, CSS3, JavaScript, TypeScript, React, Vue.js)

```

### Backend
```

Java, C/C++, Spring Boot 
(예: Java, Spring Boot, Node.js, Python)

```

### Database
```

MySQL, PostgreSQL, Redis, JPA
(예: MySQL, MongoDB, Redis, PostgreSQL)

```

### DevOps & Tools
```

Git, Docker
(예: Git, Docker, AWS, Figma, Jenkins, Nginx)

```

### 주력 기술 숙련도 (참고)
```
Java (Advanced, ~90%) · Spring Boot (Advanced, ~85%) · Spring Data JPA (Intermediate+, ~80%) · PostgreSQL (Intermediate, ~70%)
```

---

## 4. 프로젝트 (Projects)

최소 1개, 최대 3개까지 작성 가능합니다.

### 프로젝트 1
```
프로젝트명   : SSABREE TIME
기간         : 26.01.06 ~ 26.02.09 (예: 2024.03 - 2024.06)
팀 인원      : 6명 (예: 4명)
한줄 설명    : SSAFY(삼성 청년 SW AI 아카데미) 교육생들을 위한 커뮤니티 플랫폼
기술 스택    : Java, Spring Boot, PostgreSQL, Redis (예: React, TypeScript, Spring Boot, MySQL, Redis)
스크린샷     : (모바일1) https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FwDcMf%2FdJMcaiXPQch%2FAAAAAAAAAAAAAAAAAAAAAD8xFfwru_qfE0X0a-AbkOJVOOKuHFh-J7Iq4HSyz1cm%2Fimg.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1782831599%26allow_ip%3D%26allow_referer%3D%26signature%3DYVWCnwyJOuJb%252FGfoM4XXNOvrUao%253D  /  (모바일2) https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbJxdes%2FdJMcafmBBZa%2FAAAAAAAAAAAAAAAAAAAAAH20T5j06boFKjO8MD6iMtVMdGOO3Z3tlvLK4Ne2Ic5z%2Fimg.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1782831599%26allow_ip%3D%26allow_referer%3D%26signature%3D1u1WQPNeUUCGZ%252BuMqVxw8TiF1Xk%253D
```

#### 프로젝트 상세 설명 (2~3문장)
```
이 프로젝트는 SSAFY(삼성 청년 SW AI 아카데미) 교육생을 위한 커뮤니티 및 협업 플랫폼 SSABREE TIME으로,
대학생 커뮤니티인 '에브리 타임'을 벤치마킹하여 제작했습니다. 게시판·팀/스터디 그룹 관리·실시간 채팅·포트폴리오·프로젝트 관리 등 다양한 기능을 제공하였습니다. 안드로이드 원스토어 및 애플 앱스토어에 실제로 출시하여 약 100여명의 유저를 확보하고, 현재도 꾸준한 유지보수와 운영을 이어가고 있습니다.

회고 링크 : https://dyomyo.tistory.com/118

```

#### 담당 역할
```
- Backend (핵심 비즈니스 로직 / API 설계 / 실시간 채팅 / FCM, 약 158커밋)
- 인증/인가: JWT Access(30분)+Refresh(1년) 이중 토큰, SSAFY Mattermost 연동 본인 인증, Spring Security 필터 체인
- 게시판: RESTful CRUD·좋아요·스크랩·투표, 커서 기반 페이지네이션, HOT 게시판(Redis 3분 캐시), 인기 검색어(Redis Sorted Set)
- 실시간 채팅: WebSocket STOMP, 핸들러 레벨 JWT 검증, 온라인 프레즌스 추적, Nginx WebSocket 프록시
- 팀/스터디 매칭: 전체 생명주기 API(생성→모집→운영→종료), 지원/수락/거절, Task 관리
- FCM 푸시: Firebase Admin SDK 연동, @Async 비동기 전송
- DB 설계(공동): ERD 1~3차(15+ 엔티티, 44 Repository), 댓글 Soft Delete(트리 보존)
```

#### 팀 구성
```
- BE 김도영(본인) — 핵심 로직/API/채팅/FCM (~158커밋)
- BE + Infra 1명 — 초기 설정/AI 검열/모니터링/React 웹/CI·CD (~237커밋)
- Android 3명 — Kotlin/Jetpack Compose
- iOS 1명(겸임) — SwiftUI
```

#### 기술 선택 이유
```
- PostgreSQL (vs MySQL): 복잡한 JOIN 최적화, CTE 재귀 쿼리(대댓글), JSON 타입 확장성
- Redis: HOT 게시판 캐시(3분 TTL), FCM 설정 캐시, 인기 검색어 Sorted Set(O(log N))
- WebSocket STOMP (vs HTTP Polling): 서버 부하 감소, 토픽 기반 구독/발행, SockJS 폴백
```

#### 트러블슈팅
```
- Jackson3 + Redis 직렬화 연쇄 장애 → GenericJackson3JsonRedisSerializer로 타입 정보(@class) 보존
- 회원탈퇴 Side Effect (4일 추적) → Hard Delete → Soft Delete(deletedAt) 전환, 리더 null 처리
- API 스펙 반복 수정(3~5차) → Req/Res body 상세 명세 + Swagger 문서화로 1차 80%+ 통과
```

#### 주요 성과
```
- 출시 1주 내 100+ 유저 확보
- 안드로이드 원스토어 + iOS 앱스토어 2개 출시
- 전체 761커밋 중 ~158커밋(20.8%), 20+ 도메인 모듈 / 44 Repository
```

---

### 프로젝트 2
```
프로젝트명   : 번역의 민족  (🏆 SSAFY 전국 3위 · 전시부문)
기간         : 2026.04.06 ~ 2026.06.02 (약 8주)
팀 인원      : 6명 (팀장 / Backend / Infra)
한줄 설명    : 대학 강의 실시간 번역 서비스 — 강사의 한국어 발화를 즉시 영어 음성·자막·번역 슬라이드로 변환 (완전 로컬 추론)
기술 스택    : Python, FastAPI, Electron, Whisper(CT2), NLLB-200, Qwen3-VL, WebRTC/TURN, onnxruntime-web
스크린샷     : (PC1) https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fddu2rt%2FdJMcaijiaMl%2FAAAAAAAAAAAAAAAAAAAAADaGGtWBdpuq_VBV1rAJjnwZfNyMjrFymgQ4Wm6nSPtS%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1782831599%26allow_ip%3D%26allow_referer%3D%26signature%3Dhbx7QOElgQ803tkIy9MXqomUdL8%253D  /  (PC2) https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FcrnlDm%2FdJMcaijiaMk%2FAAAAAAAAAAAAAAAAAAAAAHZxijVuIlOK-0Uo2eT_1OztdZPtfNH6IF9qzZnvLyjF%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1782831599%26allow_ip%3D%26allow_referer%3D%26signature%3Dg0yTnlyU%252FoFNAFNx38h1XiuD9Jo%253D  /  (수상) https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2F0dtwY%2FdJMcacciY8e%2FAAAAAAAAAAAAAAAAAAAAAOy09Y7U5r8B2FzaMvgyXglSzPzZE38N7S2rmNyfJeZZ%2Fimg.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1782831599%26allow_ip%3D%26allow_referer%3D%26signature%3DiMQxD6YsWlar91kjF3suARId5%252BE%253D
```

#### 프로젝트 상세 설명 (2~3문장)
```
"강의자는 평소대로 말하고, 수강자는 모국어로 듣는다" — ASR→NMT→TTS 추론 파이프라인을 강사 PC에서 완전 로컬로 구동하는 FastAPI 백엔드 + Electron 설치형 배포 인프라를 설계·구현했습니다.
음성·슬라이드 원문을 외부 서버로 보내지 않는 완전 로컬 추론이 핵심 차별점입니다.
로컬 AI 스택: Whisper turbo(ASR) · NLLB-200(한→영 NMT) · Qwen3-VL-4B(슬라이드 VLM 번역) · 내장 TURN(node-turn, P2P 차단망 우회).

회고 링크 : (있으면 추가)
```

#### 담당 역할
```
- 팀장 / Backend / Infra (약 132커밋)
- Electron 데스크톱 배포 인프라: PyInstaller→electron-builder→Inno Setup 3단계 패키징, 관리자 권한 없는 per-user 설치, 디스크 사전 체크(~17GB)
- AI 모델 다운로드/관리 UX: ThreadPoolExecutor 병렬 다운로드, safetensors 무결성 검증, 사용자 동의 마법사
- 백엔드 생명주기: GIL 독립 Health 서버, ctypes 부모 프로세스 Watchdog, 5분 Grace Shutdown
- 네트워크/실시간: 내장 TURN(포트 47878, UDP→TCP fallback), LAN IP 자동 탐지, 강의자 loopback 전용
- 로컬 추론 운영: VRAM 용량별 VLM 4/8bit 자동 양자화(6GB GPU 지원), COOP/COEP 헤더(SharedArrayBuffer)
- 강의 자막 저장/다운로드 API, 번역 용어집(glossary) 동적 관리
```

#### 트러블슈팅
```
- HF Hub 다운로드 진행률 튐(7GB→2GB) → blobs/·snapshots/ 양쪽 재귀 측정 후 MAX + 단조 증가 clamp
- 강의실 보안망 P2P 차단 → 포트 47878 node-turn 내장 TURN(UDP 차단 시 TCP fallback)로 relay 우회
- Electron frozen 번들에서 마이크·화면공유·AI 미동작 → frozen 경로 헬퍼 + .mjs/.wasm MIME 등록
- 강사 앱 종료 시 학생 자막 소실 → 부모 프로세스 watchdog + 5분 grace shutdown
```

#### 주요 성과 / 회고
```
- SSAFY 결선 전시 전국 3위 🏆 / 약 132커밋(Backend·Infra) / 17GB 로컬 AI 모델을 단일 setup.exe로 패키징
- 회고: 배포가 곧 제품 · 실행 환경 제약 우선 고려 · 로컬 추론 운영 난이도 · 팀 리딩
```

---

### 프로젝트 3 (삭제)
```
프로젝트명   :
기간         :
팀 인원      :
한줄 설명    :
기술 스택    :
스크린샷     :
```

#### 프로젝트 상세 설명
```


```

#### 담당 역할
```
-
-
-
```

---

## 5. 학력 (Education)

### 학력 1
```
학교명   : 영남대학교 (예: OO대학교)
전공     : 정보통신공학과 (예: 컴퓨터공학과)
기간     : 2018.03 ~ 2024.02 (예: 2017.03 - 2023.02)

```

### 학력 2
```
기관명   : 42경산 (예: SSAFY 삼성 청년 SW 아카데미)
과정     : 1기 본과정 (예: Web 풀스택 과정)
기간     : 2024.02 ~ 2025.06 (예: 2022.07 - 2023.06)
비고     : (예: 우수 교육생 수료)
```

### 학력 3
```
기관명   : SSAFY (삼성 청년 SW AI 아카데미) (예: SSAFY 삼성 청년 SW 아카데미)
과정     : 14기 전공 Java 과정 (예: Web 풀스택 과정)
기간     : 2025.07 ~ 2026.06 (예: 2022.07 - 2023.06)
비고     : 현재 교육 이수중 (예: 우수 교육생 수료)
```

---

## 6. 자격증 & 수상 (Certifications & Awards)

해당하는 것만 남기고, 추가/삭제 자유롭게 해주세요.
`종류`는 **자격증** 또는 **수상** 중 선택해주세요.

```
종류  | 이름                                              | 취득/수상일
------|--------------------------------------------------|------------
자격증 | SQLD                                             | 2024.04
수상   | SSAFY 14기 프로젝트 전시발표회 전시부문 전국 3위 (번역의 민족) | 2026.06
기타   |                                                  |
```

---

## 7. Thank You 슬라이드

```
마무리 메시지 : 감사합니다. (예: 감사합니다)
부제          : 함께 일하고 싶은 동료가 될 개발자 김도영입니다. (예: 함께 일하고 싶습니다)
```

---
