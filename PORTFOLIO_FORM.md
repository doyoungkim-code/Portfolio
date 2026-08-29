# 포트폴리오 콘텐츠 원본 (검증본)

> 2026-08-28 인터뷰로 사실 검증을 마친 내용만 담는다.
> `TODO` 표시는 사용자 입력 대기 항목 — 채워지면 src/data/ 에 반영할 것.

---

## 1. 기본 정보

```
이름         : 김도영
직군         : Backend Developer
생년월일     : 1999.09.29
거주지       : Daegu, Korea
이메일       : ehehkwat1@naver.com
GitHub       : https://github.com/doyoungkim-code
블로그       : https://dyomyo.tistory.com
```

### 핵심 내러티브 (Hero)

정보통신공학과(CS 기초) → 42경산(C/C++ 저수준·자기주도) → SSAFY(Java/Spring 실전)를
차례로 거치며 **탄탄한 개발 지식을 쌓았고**, 로컬 AI 추론 서비스를 직접 패키징·배포한 경험과
AI 도구를 활용하는 개발 습관으로 **AI 활용 능력까지 갖춘** 백엔드 개발자.

- 자기소개 한 줄: 기술 블로그를 가꾸고 기록하는 것을 즐기는 예비 백엔드 개발자.

---

## 2. 여정 (Journey) — 전부 사실

| 기간 | 소속 | 내용 |
|---|---|---|
| 2018.03 ~ 2024.02 | 영남대학교 정보통신공학과 | 자료구조·알고리즘·네트워크·운영체제 등 CS 기초 |
| 2024.02 ~ 2025.06 | 42경산 1기 본과정 | C/C++ 시스템 프로그래밍, 피어 리뷰 기반 자기주도 학습 |
| 2025.07 ~ 2026.06 | SSAFY 14기 전공 Java 과정 | Java/Spring Boot 심화, 실서비스 기획~운영 전 과정 (교육 이수 중) |

### 자격 & 수상
- SQLD — 2024.04
- SSAFY 14기 프로젝트 전시발표회 **전시부문 전국 3위** (번역의 민족) — 2026.06

---

## 3. 스킬 (경험 근거 서술형 — %게이지·레벨 라벨 금지)

### 메인 (면접 방어 가능 확인됨)
- **Java + Spring Boot** — SSABREE TIME에서 인증·게시판·실시간 채팅·FCM 등 20+ 도메인 모듈을 실서비스 수준으로 구현·출시·운영.
- **JPA + PostgreSQL** — ERD 3차 반복 설계(15+ 엔티티, 44 Repository), 댓글 Soft Delete(트리 보존), 커서 기반 페이지네이션.
- **Redis** — HOT 게시판 3분 TTL 캐시, 인기 검색어 Sorted Set 트렌딩 등 캐싱 전략 설계·운영.
- **C / C++ (42경산)** — Unix 프로세스·메모리 관리 등 시스템 프로그래밍으로 다진 CS 저변.

### 보조
- AWS EC2·Nginx (SSABREE 배포·운영), Python·FastAPI (번역의 민족 백엔드 일부),
  Electron·패키징(PyInstaller/electron-builder/Inno Setup), Docker, Git, MySQL, HTML5·JavaScript, Vue.js

### 모집요강 매핑 — 방송·미디어 기업 서버 개발 직군 기준 (2026-08-28 사실 확인 완료)

| 요강 항목 | 구분 | 본인 경험 | 반영 |
|---|---|---|---|
| Java 등 웹 서버 개발 + MVC 아키텍처 | 필수 | Spring MVC 기반 SSABREE 백엔드 | ✅ 스킬 카드에 "Spring MVC 아키텍처" 명시 |
| RDBMS(MySQL 등) 설계 개발 | 필수 | ERD 3차 반복, 15+ 엔티티 스키마 설계, MySQL·PostgreSQL | ✅ 스킬 카드 "RDBMS 설계" 명시 |
| HTML5, JavaScript & jQuery | 필수 | HTML5·JavaScript·Vue.js ○ / **jQuery는 미경험 → 언급 금지** | ✅ 태그에 HTML5·JS |
| 포트폴리오 제출 | 필수 | 이 포트폴리오 (URL) | ✅ |
| AI 모델 연동·활용 (PyTorch 등) | 우대 | Whisper·NLLB 등 PyTorch 계열 로컬 모델 패키징·운용 / OpenAI API·MCP는 **미경험** | ✅ 스킬 하단 리스트 |
| 클라우드 서비스 개발·운영 (AWS 등) | 우대 | SSABREE를 AWS EC2에 배포, 출시~SSAFY 수료(2026.07)까지 운영 후 종료 | ✅ 스킬·프로젝트에 반영 |
| MLOps/DevOps 자동화 | 우대 | Docker + 3단계 빌드 파이프라인(번역의 민족) / CI/CD 구축은 팀원 담당 → **본인 경험으로 쓰지 않음** | ✅ "빌드 자동화"로 표현 |
| SW 개발 전공 | 우대 | 정보통신공학과 | ✅ Journey |
| SQLD 등 자격증 | 우대 | SQLD (2024.04) | ✅ Journey |

---

## 4. 프로젝트 1 · SSABREE TIME

```
기간      : 2026.01.06 ~ 2026.02.09 (약 6주)
팀 인원   : 6명 (BE 2, Android 3, iOS 1 겸임)
역할      : Backend
기술 스택 : Java, Spring Boot, PostgreSQL, Redis
회고 링크 : https://dyomyo.tistory.com/118
```

**한 줄**: SSAFY 교육생 전용 폐쇄형 커뮤니티 + 팀 매칭 서비스 (에브리타임 벤치마킹).
앱스토어·원스토어에 실제 출시, **150명 이상 실사용** (자소서 기준, 2026-08-29 확인), **AWS EC2에 배포해 SSAFY 수료(2026.07)까지 운영 후 종료** (2026-08-29 확인 — "현재 운영 중"으로 쓰지 말 것).

### 성과 수치 (전부 사실 확인)
- 출시 1주 내 100+ 유저, 누적 150명 이상 실사용
- 원스토어 + 애플 앱스토어 출시
- 전체 761커밋 중 본인 ~158커밋
- 20+ 도메인 모듈, 44 Repository

### 담당 영역 (전부 본인 구현 확인 — 단, 세부 기억 흐릿 → INTERVIEW_PREP.md 참조)
1. **인증/인가** — JWT Access(30분)+Refresh(1년) 이중 토큰, SSAFY Mattermost 연동 본인 인증, Spring Security 필터 체인
2. **게시판 + 캐싱** — CRUD·좋아요·스크랩·투표, 커서 기반 페이지네이션, HOT 게시판(Redis 3분 TTL), 인기 검색어(Redis Sorted Set)
3. **실시간 채팅** — WebSocket STOMP, 핸들러 레벨 JWT 검증, Nginx WebSocket 프록시
4. **팀/스터디 매칭** — 생성→모집→운영→종료 생명주기 API, 지원/수락/거절, Task 관리
5. **FCM 푸시** — Firebase Admin SDK, 이벤트별 푸시, @Async 비동기 전송
6. **DB 설계(공동) & 기타** — ERD 1~3차, 댓글 Soft Delete, 포트폴리오 CRUD·solved.ac 연동

### 기술 선택 이유
- PostgreSQL (vs MySQL): 복잡한 JOIN 최적화, CTE 재귀 쿼리(대댓글), JSON 타입 확장성
- Redis: 집계 부하가 큰 HOT 게시판 캐시, 인기 검색어 Sorted Set
- WebSocket STOMP (vs Polling): 서버 부하 감소, 토픽 기반 구독/발행, SockJS 폴백

### 트러블슈팅 (3건 모두 실제 경험 확인 — 세부는 INTERVIEW_PREP.md로 보강)
1. **Jackson 3 + Redis 직렬화 연쇄 장애** — Spring Boot 4.0의 Jackson 3 강제로 Redis 직렬화 설정 전체 파손 → GenericJackson3JsonRedisSerializer로 @class 타입 정보 보존
2. **회원탈퇴 Side Effect (4일 추적)** — Hard Delete의 FK 연쇄 오류 → Soft Delete(deletedAt) 전환, 리더 탈퇴 null 처리, 게시물 "탈퇴한 사용자" 표시
3. **API 스펙 반복 수정** — 엔드포인트만 적힌 명세로 웹·Android·iOS 요청에 5차까지 수정 → Req/Res body 필드 단위 명세 + Swagger 이후 재요청 소멸

---

## 5. 프로젝트 2 · 번역의 민족 🏆 본선 기업연계반 1위 · 전국 전시발표회 3위

```
기간      : 2026.04.06 ~ 2026.06.02 (약 8주)
팀 인원   : 6명 (팀장)
역할      : 팀장 / Electron 배포 인프라 / 설치·다운로드 플로우 / FastAPI 일부
기술 스택 : Python, FastAPI, Electron, PyInstaller, electron-builder, Inno Setup
```

**한 줄**: 기업연계 프로젝트. 기업 요구 목표 "2초 이내 AI 실시간 강의 번역". 명세서가 전제한 고사양 서버 지원이 무산되자
팀과 3주간 검증 끝에 **노트북 한 대에서 모든 AI를 처리하는 온디바이스 앱**으로 방향 전환 (자소서 기준, 2026-08-29 확인).

### 성과 수치 (전부 사실 확인)
- SSAFY 본선 발표회 **기업연계반 1위**
- 전국 캠퍼스 전시발표회 전시부문 **전국 3위**
- 본인 ~132커밋
- 8주 · 6인 · 팀장
- 17GB 단일 setup.exe 패키징

### 담당 영역 (본인 작업으로 확인된 것만 — 이전 문서의 생명주기·TURN·로컬추론 항목은 폐기)
1. **팀장 리딩** — AI·Frontend·Backend 통합 지점(배포·일정·역할) 조율과 책임
2. **Electron 배포 파이프라인** — PyInstaller → electron-builder → Inno Setup 3단계 패키징, 관리자 권한 없는 per-user 설치, 디스크 사전 체크
3. **설치/다운로드 플로우** — AI 모델 다운로드 및 설치 과정 사용자 플로우 구현
4. **FastAPI 백엔드 일부** — 서버 측 API 일부 구현

### 트러블슈팅 (자소서에서 확보, 2026-08-29)
1. **고사양 서버 미지원 → 온디바이스 피벗** — 2초 이내 목표는 유지한 채 3주간 검증 후 노트북 단일 구동으로 전환, 명세·일정 재편
2. **개발 환경에선 되던 AI 기능이 설치본에서 멈춤** — 개발 PC vs 설치 PC 차이를 대조하며 수정, "다른 PC에서도 되는지" 검증을 배포 절차에 포함
3. **관리자 권한 없는 강의실 PC 설치 실패** — per-user 설치 전환 + 디스크 사전 체크, 17GB 단일 setup.exe
- `TODO`: 2번의 구체적 원인(경로/리소스/권한 등)은 기억나면 보강

### 회고 (본인 경험 기반으로 유지)
- 배포가 곧 제품 — 비개발자가 설치하지 못하면 의미가 없다. 설치·용량·권한까지가 엔지니어의 책임 범위.
- 팀 리딩 — 파트 간 통합 지점을 팀장으로서 조율·책임.

---

## 6. Contact

```
Email  : ehehkwat1@naver.com
GitHub : github.com/doyoungkim-code
Blog   : dyomyo.tistory.com
마무리 : 감사합니다. 함께 일하고 싶은 동료가 될 개발자 김도영입니다.
```

---

## 7. 이미지 목록 (TODO — 원본 파일 대기)

`public/images/` 폴더에 아래 파일을 넣고 push하면 자동 배포된다.

| 파일명 | 용도 | 권장 |
|---|---|---|
| `hero-bg.jpg` | 첫 화면(ABOUT 커버) 반투명 배경 사진 | 가로 1920px+ |
| `profile.jpg` | 프로필 사진 (현재 미사용, 추후 About에 배치 가능) | 정방형 600px+ |
| `ssabree-1.jpg` | SSABREE 모바일 스크린샷 1 (P1 커버 배경 겸용) | 세로 |
| `ssabree-2.jpg` | SSABREE 모바일 스크린샷 2 | 세로 |
| `translate-1.png` | 번역의 민족 PC 화면 1 (P2 커버 배경 겸용) | 가로 |
| `translate-2.png` | 번역의 민족 PC 화면 2 | 가로 |
| `award.jpg` | 수상 단체사진 | 가로 |

파일이 없으면 컴포넌트가 자동으로 플레이스홀더를 보여준다 (onError 처리).
